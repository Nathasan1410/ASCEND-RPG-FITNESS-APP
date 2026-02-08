"use server";

import { createClient } from "@/lib/supabase/server";
import { 
  ExperimentConfigSchema, 
  ExperimentSchema, 
  VariantMetricsSchema,
  ExperimentStatsSchema,
  type ExperimentConfig,
  type Experiment,
  type ExperimentStats,
  type VariantMetrics
} from "@/types/schemas";
import { sendTraceToOpik } from "@/lib/ai/opik-helper";

export async function createExperiment(config: ExperimentConfig): Promise<Experiment> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("Not authenticated");
  
  const validated = ExperimentConfigSchema.parse(config);
  
  const experiment: Experiment = {
    id: crypto.randomUUID(),
    name: validated.name,
    type: validated.type,
    status: "running",
    description: validated.description,
    config: validated,
    variants: validated.variants.map(v => ({
      id: v.id,
      sample_size: 0,
      success_rate: 0,
      avg_score: 0,
      avg_time_ms: 0,
    })),
    metrics: {
      total_runs: 0,
      z_score: 0,
      p_value: 1,
      is_significant: false,
      confidence_interval: "±0.00",
      improvement_delta: 0,
      winner_id: null,
    },
    created_at: new Date().toISOString(),
    completed_at: null,
    created_by: user.id,
  };
  
  const { data: profile } = await supabase
    .from("profiles")
    .select("ab_testing_data")
    .eq("id", user.id)
    .single();
  
  const currentData = (profile as any)?.ab_testing_data || { experiments: [] };
  currentData.experiments.push(experiment);
  
  await (supabase.from("profiles") as any)
    .update({ ab_testing_data: currentData })
    .eq("id", user.id);
  
  await sendTraceToOpik("experiment_created", {
    input: { experiment_id: experiment.id, experiment_name: experiment.name },
    output: { status: experiment.status, variants_count: experiment.variants.length },
    tags: ["ab_test", "created", experiment.type],
  });
  
  return experiment;
}

export async function assignUserToVariant(
  experimentId: string,
  userId: string
): Promise<string> {
  const supabase = await createClient();
  
  const { data: profile } = await supabase
    .from("profiles")
    .select("ab_testing_data")
    .single();
  
  const experiments = (profile as any)?.ab_testing_data?.experiments || [];
  const experiment = experiments.find((e: Experiment) => e.id === experimentId);
  
  if (!experiment || experiment.status !== "running") {
    throw new Error("Experiment not found or not running");
  }
  
  const { data: userProfile } = await supabase
    .from("profiles")
    .select("variant_assignments")
    .eq("id", userId)
    .single();
  
  const assignments = (userProfile as any)?.variant_assignments || {};
  
  if (assignments[experimentId]) {
    return assignments[experimentId];
  }
  
  const hash = hashCode(`${userId}-${experimentId}`);
  const variantIndex = hash % experiment.variants.length;
  const variantId = experiment.config.variants[variantIndex].id;
  
  assignments[experimentId] = variantId;
  
  await (supabase.from("profiles") as any)
    .update({ variant_assignments: assignments })
    .eq("id", userId);
  
  return variantId;
}

export async function trackExperimentMetric(
  experimentId: string,
  variantId: string,
  success: boolean,
  score: number,
  durationMs: number
): Promise<void> {
  const supabase = await createClient();
  
  const { data: profile } = await supabase
    .from("profiles")
    .select("ab_testing_data")
    .single();
  
  const experiments = (profile as any)?.ab_testing_data?.experiments || [];
  const experiment = experiments.find((e: Experiment) => e.id === experimentId);
  
  if (!experiment) throw new Error("Experiment not found");
  
  const variant = experiment.variants.find((v: VariantMetrics) => v.id === variantId);
  if (!variant) throw new Error("Variant not found");
  
  const newSampleSize = variant.sample_size + 1;
  const newSuccessRate = ((variant.success_rate * variant.sample_size) + (success ? 1 : 0)) / newSampleSize;
  const newAvgScore = ((variant.avg_score * variant.sample_size) + score) / newSampleSize;
  const newAvgTime = ((variant.avg_time_ms * variant.sample_size) + durationMs) / newSampleSize;
  
  variant.sample_size = newSampleSize;
  variant.success_rate = newSuccessRate;
  variant.avg_score = newAvgScore;
  variant.avg_time_ms = newAvgTime;
  
  experiment.metrics.total_runs = experiment.variants.reduce((sum: number, v: VariantMetrics) => sum + v.sample_size, 0);
  
  await (supabase.from("profiles") as any)
    .update({ ab_testing_data: (profile as any)?.ab_testing_data })
    .single();
  
  if (experiment.variants.every((v: VariantMetrics) => v.sample_size >= experiment.config.min_sample_size)) {
    await calculateExperimentStats(experimentId);
  }
}

export async function calculateExperimentStats(experimentId: string): Promise<ExperimentStats> {
  const supabase = await createClient();
  
  const { data: profile } = await supabase
    .from("profiles")
    .select("ab_testing_data")
    .single();
  
  const experiments = (profile as any)?.ab_testing_data?.experiments || [];
  const experiment = experiments.find((e: Experiment) => e.id === experimentId);
  
  if (!experiment || experiment.variants.length < 2) {
    throw new Error("Experiment not found or invalid");
  }
  
  const variantA = experiment.variants[0];
  const variantB = experiment.variants[1];
  
  const metric = experiment.config.target_metric === "success_rate" 
    ? "success_rate" 
    : "avg_score";
  
  const p1 = variantA[metric as keyof typeof variantA] as number;
  const p2 = variantB[metric as keyof typeof variantB] as number;
  const n1 = variantA.sample_size;
  const n2 = variantB.sample_size;
  
  const pooledP = (p1 * n1 + p2 * n2) / (n1 + n2);
  const se = Math.sqrt(pooledP * (1 - pooledP) * (1/n1 + 1/n2));
  const z = se > 0 ? (p1 - p2) / se : 0;
  
  const pValue = 2 * (1 - normalCDF(Math.abs(z)));
  
  const confidenceInterval = se > 0 ? `±${(1.96 * se).toFixed(3)}` : "±0.00";
  const improvementDelta = Math.abs(p1 - p2);
  const isSignificant = pValue < 0.05;
  
  let winnerId: string | null = null;
  if (isSignificant) {
    winnerId = p1 > p2 ? variantA.id : variantB.id;
  }
  
  experiment.metrics = {
    total_runs: experiment.metrics.total_runs,
    z_score: z,
    p_value: pValue,
    is_significant: isSignificant,
    confidence_interval: confidenceInterval,
    improvement_delta: improvementDelta,
    winner_id: winnerId,
  };
  
  await (supabase.from("profiles") as any)
    .update({ ab_testing_data: (profile as any)?.ab_testing_data })
    .single();
  
  if (isSignificant) {
    await endExperiment(experimentId, winnerId);
  }
  
  return experiment.metrics;
}

export async function endExperiment(
  experimentId: string,
  winnerId: string | null = null
): Promise<void> {
  const supabase = await createClient();
  
  const { data: profile } = await supabase
    .from("profiles")
    .select("ab_testing_data")
    .single();
  
  const experiments = (profile as any)?.ab_testing_data?.experiments || [];
  const experiment = experiments.find((e: Experiment) => e.id === experimentId);
  
  if (!experiment) throw new Error("Experiment not found");
  
  experiment.status = "completed";
  experiment.completed_at = new Date().toISOString();
  
  if (winnerId) {
    experiment.metrics.winner_id = winnerId;
  }
  
  await (supabase.from("profiles") as any)
    .update({ ab_testing_data: (profile as any)?.ab_testing_data })
    .single();
  
  await sendTraceToOpik("experiment_completed", {
    input: {
      experiment_id: experimentId,
      experiment_name: experiment.name,
      variants_count: experiment.variants.length,
      total_runs: experiment.metrics.total_runs,
    },
    output: {
      winner_id: experiment.metrics.winner_id,
      winner_name: experiment.variants.find((v: VariantMetrics) => v.id === experiment.metrics.winner_id)?.id,
      improvement_delta: experiment.metrics.improvement_delta,
      statistical_significance: experiment.metrics.is_significant,
      confidence_interval: experiment.metrics.confidence_interval,
      p_value: experiment.metrics.p_value,
      variant_metrics: experiment.variants,
    },
    tags: ["ab_test", "completed", experiment.type],
  });
}

export async function getExperiments(): Promise<Experiment[]> {
  const supabase = await createClient();
  
  const { data: profile } = await supabase
    .from("profiles")
    .select("ab_testing_data")
    .single();
  
  return (profile as any)?.ab_testing_data?.experiments || [];
}

function normalCDF(x: number): number {
  const a1 =  0.254829592;
  const a2 = -0.284496736;
  const a3 =  1.421413741;
  const a4 = -1.453152027;
  const a5 =  1.061405429;
  const p  =  0.3275911;
  
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x) / Math.sqrt(2);
  
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  
  return 0.5 * (1.0 + sign * y);
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}
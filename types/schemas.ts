import { z } from "zod";

// User Classes
export const UserClassSchema = z.enum(["Novice", "Striker", "Tank", "Assassin"]);
export type UserClass = z.infer<typeof UserClassSchema>;

// Rank Tiers
export const RankTierSchema = z.enum([
  "E-Rank",
  "D-Rank",
  "C-Rank",
  "B-Rank",
  "A-Rank",
  "S-Rank",
]);
export type RankTier = z.infer<typeof RankTierSchema>;

// Hunter Status
export const HunterStatusSchema = z.enum(["Normal", "Verified", "Flagged", "Corrupted"]);
export type HunterStatus = z.infer<typeof HunterStatusSchema>;

// Exercise Schema (from Groq)
export const ExerciseSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(["Warmup", "Skill", "Compound", "Isolation", "Cooldown"]),
  sets: z.number(),
  reps: z.string(),
  rest_sec: z.number(),
  rpe_target: z.number().min(1).max(10),
  target_muscle: z.string(),
  tips: z.string(),
  video_query: z.string().optional(),
});
export type Exercise = z.infer<typeof ExerciseSchema>;

const OpikReviewSchema = z.object({
  reasoning: z.string().describe("2-3 sentences explaining why this specific workout was assigned to the user, considering their rank, class, and current capabilities"),
  completion_probability: z.number().min(0).max(100).describe("Estimated probability (0-100%) that the user will complete this workout, based on difficulty calibration"),
  key_factors: z.array(z.string()).describe("3-5 short tags or factors that influenced this workout choice (e.g., 'Form Focus', 'Low Impact', 'Upper Body Dominant')")
});

// Workout Plan Schema (Groq Output)
export const WorkoutPlanSchema = z.object({
  quest_name: z.string(),
  quest_rank: RankTierSchema,
  quest_type: z.enum(["Daily", "Penalty", "RankUp", "Special"]).default("Daily"),
  narrative_intro: z.string(),
  base_xp: z.number(),
  stat_gain: z.object({
    strength: z.number().optional(),
    agility: z.number().optional(),
    stamina: z.number().optional(),
  }),
  estimated_duration_min: z.number(),
  target_class: UserClassSchema,
  requires_proof: z.boolean().default(false),
  proof_type: z.enum(["None", "Photo", "Video", "Timelapse"]).optional(),
  hand_sign: z.string().optional(),
  exercises: z.array(ExerciseSchema),
  ai_review: OpikReviewSchema,
});
export type WorkoutPlan = z.infer<typeof WorkoutPlanSchema>;

// Proof Type
export const ProofTypeSchema = z.enum(["None", "Photo", "Video", "Timelapse"]);
export type ProofType = z.infer<typeof ProofTypeSchema>;

// Quest Log Input (User Submission)
export const QuestLogInputSchema = z.object({
  quest_id: z.string().uuid(),
  duration_actual: z.number().min(1),
  rpe_actual: z.number().min(1).max(10),
  user_feedback: z.string().optional(),
  exercises_completed: z.array(
    z.object({
      exercise_id: z.string(),
      sets_done: z.number(),
      reps_done: z.string(),
      skipped: z.boolean().optional(),
    })
  ),
  proof_media_url: z.string().url().optional(),
  proof_type: ProofTypeSchema.default("None"),
  is_public: z.boolean().default(true),
});
export type QuestLogInput = z.infer<typeof QuestLogInputSchema>;

// Judge Verdict (Opik Output)
export const JudgeVerdictSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED", "FLAGGED", "PENDING_VERIFICATION"]),
  integrity_score: z.number().min(0).max(1),
  effort_score: z.number().min(0).max(1),
  safety_score: z.number().min(0).max(1),
  final_xp: z.number(),
  system_message: z.string(),
  proof_required: z.boolean().default(false),
  proof_provided: z.boolean().default(false),
  verification_status: z.enum(["Auto_Approved", "Pending", "Verified", "Rejected"]).default("Auto_Approved"),
  stat_updates: z.object({
    strength_add: z.number(),
    agility_add: z.number(),
    stamina_add: z.number(),
  }),
  cv_analysis: z.object({
    form_score: z.number().min(0).max(1),
    technique_score: z.number().min(0).max(1),
    range_of_motion: z.number().min(0).max(1),
    safety_issues: z.array(z.string()),
    confidence: z.number().min(0).max(1),
    confidence_message: z.string(),
  }).optional(),
});
export type JudgeVerdict = z.infer<typeof JudgeVerdictSchema>;

// Onboarding Form
export const OnboardingSchema = z.object({
  username: z.string().min(3).max(20),
  height_cm: z.number().min(100).max(250),
  weight_kg: z.number().min(30).max(300),
  max_pushups: z.number().min(0).max(500),
  run_capability_km: z.number().min(0).max(100),
  selected_class: UserClassSchema,
  equipment: z.array(z.string()),
});
export type OnboardingData = z.infer<typeof OnboardingSchema>;

// Report Schema
export const ReportSchema = z.object({
  target_user_id: z.string().uuid(),
  target_log_id: z.string().uuid().optional(),
  reason: z.enum(["Impossible_Stats", "Fake_Media", "Suspicious_Pattern", "Other"]),
  description: z.string().max(500).optional(),
});
export type ReportInput = z.infer<typeof ReportSchema>;

// A/B Testing Schemas
export const ExperimentStatusSchema = z.enum(["draft", "running", "completed", "failed"]);
export type ExperimentStatus = z.infer<typeof ExperimentStatusSchema>;

export const ExperimentTypeSchema = z.enum(["prompt_ab_test", "weight_optimization", "model_comparison"]);
export type ExperimentType = z.infer<typeof ExperimentTypeSchema>;

export const VariantConfigSchema = z.object({
  id: z.string(),
  name: z.string(),
  config: z.record(z.string(), z.any()),
});

export type VariantConfig = z.infer<typeof VariantConfigSchema>;

export const VariantMetricsSchema = z.object({
  id: z.string(),
  sample_size: z.number(),
  success_rate: z.number().min(0).max(1),
  avg_score: z.number(),
  avg_time_ms: z.number(),
});

export type VariantMetrics = z.infer<typeof VariantMetricsSchema>;

export const ExperimentConfigSchema = z.object({
  name: z.string().min(1),
  type: ExperimentTypeSchema,
  description: z.string(),
  variants: z.array(VariantConfigSchema).min(2).max(4),
  min_sample_size: z.number().default(50),
  target_metric: z.enum(["success_rate", "avg_score"]).default("avg_score"),
});

export type ExperimentConfig = z.infer<typeof ExperimentConfigSchema>;

export const ExperimentStatsSchema = z.object({
  total_runs: z.number(),
  z_score: z.number(),
  p_value: z.number(),
  is_significant: z.boolean(),
  confidence_interval: z.string(),
  improvement_delta: z.number(),
  winner_id: z.string().nullable(),
});

export type ExperimentStats = z.infer<typeof ExperimentStatsSchema>;

export const ExperimentSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: ExperimentTypeSchema,
  status: ExperimentStatusSchema,
  description: z.string(),
  config: ExperimentConfigSchema,
  variants: z.array(VariantMetricsSchema),
  metrics: ExperimentStatsSchema,
  created_at: z.string(),
  completed_at: z.string().nullable(),
  created_by: z.string(),
});

export type Experiment = z.infer<typeof ExperimentSchema>;

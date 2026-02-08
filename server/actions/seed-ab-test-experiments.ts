"use server";

import { createClient } from "@/lib/supabase/server";
import { createExperiment } from "@/server/actions/ab-testing-actions";
import { ExperimentConfigSchema, type ExperimentConfig } from "@/types/schemas";

const EXPERIMENTS_DATA = {
  "experiments": [
    {
      "name": "Granular Effort Scoring v1 vs v2",
      "type": "prompt_ab_test",
      "description": "Tests whether specific RPE difference thresholds produce more consistent and fair effort evaluations. Variant A uses vague comparison; Variant B uses quantified RPE difference formula.",
      "target_metric": "avg_score",
      "min_sample_size": 200,
      "variants": [
        {
          "id": "var_a",
          "name": "Baseline Effort Check",
          "config": {
            "prompt_version": "v1",
            "effort_criteria": "Compare target_rpe vs actual_rpe. If user RPE << target, effort is LOW.",
            "rpe_thresholds": null
          }
        },
        {
          "id": "var_b",
          "name": "Quantified RPE Thresholds",
          "config": {
            "prompt_version": "v2",
            "effort_criteria": "Calculate RPE difference: diff = target_rpe - actual_rpe. Effort score = max(0, 1 - (diff / 4)). If diff >= 3 across all exercises, FLAG as low effort. If user consistently overestimates (actual_rpe > target_rpe by 2+), recognize as honest effort.",
            "rpe_thresholds": {
              "minor_effort_gap": 1.0,
              "moderate_effort_gap": 2.0,
              "major_effort_gap": 3.0,
              "effort_penalty_factor": 0.25,
              "overperformance_bonus": 0.1
            },
            "effort_formula": "score = max(0, 1 - (diff / 4)) where diff = target_rpe - actual_rpe"
          }
        }
      ]
    },
    {
      "name": "Context-Aware Safety Evaluation v1 vs v2",
      "type": "prompt_ab_test",
      "description": "Tests whether considering user's rank, class, and previous performance leads to better safety assessments. Variant A uses single soreness check; Variant B uses multi-dimensional safety context.",
      "target_metric": "avg_score",
      "min_sample_size": 200,
      "variants": [
        {
          "id": "var_a",
          "name": "Baseline Safety Check",
          "config": {
            "prompt_version": "v1",
            "safety_criteria": "Did user perform high intensity while reporting soreness? If yes, UNSAFE.",
            "safety_context": null
          }
        },
        {
          "id": "var_b",
          "name": "Multi-Dimensional Safety Context",
          "config": {
            "prompt_version": "v2",
            "safety_criteria": "Calculate safety score based on: 1) Intensity vs rank capability (E-Rank < RPE 7, S-Rank can do RPE 9), 2) Class-specific risks (Striker: overtraining, Tank: overloading), 3) Soreness overlap (if sore area matches exercise, lower safety), 4) Streak fatigue (7+ day streak requires deload). Safety formula: base = 1.0; -0.2 if soreness overlap; -0.15 if intensity > rank_max; -0.1 if streak > 7; -0.05 if class mismatch.",
            "safety_context": {
              "rank_max_rpe": {
                "E-Rank": 6,
                "D-Rank": 7,
                "C-Rank": 8,
                "B-Rank": 8,
                "A-Rank": 9,
                "S-Rank": 9
              },
              "class_risks": {
                "Novice": "overexertion",
                "Striker": "overtraining",
                "Tank": "overloading",
                "Assassin": "injury_from_explosive_movement"
              },
              "soreness_overlap_penalty": 0.2,
              "streak_fatigue_threshold": 7,
              "streak_fatigue_penalty": 0.1
            },
            "safety_formula": "score = max(0, base - soreness_overlap_penalty - intensity_penalty - streak_penalty - class_penalty)"
          }
        }
      ]
    },
    {
      "name": "Weighted Scoring by Quest Type v1 vs v2",
      "type": "prompt_ab_test",
      "description": "Tests whether adjusting score weights based on quest type (Daily vs RankUp) produces better user outcomes. Variant A uses equal weights; Variant B uses type-specific weighting.",
      "target_metric": "avg_score",
      "min_sample_size": 200,
      "variants": [
        {
          "id": "var_a",
          "name": "Equal Weighting",
          "config": {
            "prompt_version": "v1",
            "scoring_weights": {
              "integrity": 0.33,
              "effort": 0.33,
              "safety": 0.34
            },
            "weight_by_quest_type": false
          }
        },
        {
          "id": "var_b",
          "name": "Quest-Type Weighting",
          "config": {
            "prompt_version": "v2",
            "scoring_weights": {
              "Daily": {
                "integrity": 0.30,
                "effort": 0.40,
                "safety": 0.30
              },
              "RankUp": {
                "integrity": 0.50,
                "effort": 0.25,
                "safety": 0.25
              }
            },
            "weight_by_quest_type": true,
            "weighting_rationale": "Daily quests emphasize effort (building habits), RankUp exams emphasize integrity (no cheating on exams)"
          }
        }
      ]
    }
  ]
};

export async function seedABTestExperiments() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("Not authenticated");
  
  console.log("[SeedABTest] Starting seed process for user:", user.id);
  
  const results = [];
  
  for (const experimentData of EXPERIMENTS_DATA.experiments) {
    try {
      console.log("[SeedABTest] Creating experiment:", experimentData.name);
      
      const validated = ExperimentConfigSchema.parse(experimentData as any);
      
      const experiment = await createExperiment(validated);
      
      console.log("[SeedABTest] Experiment created successfully:", experiment.id);
      results.push({
        name: experimentData.name,
        status: "success",
        id: experiment.id
      });
    } catch (error: any) {
      console.error("[SeedABTest] Failed to create experiment:", experimentData.name, error);
      results.push({
        name: experimentData.name,
        status: "failed",
        error: error?.message || "Unknown error"
      });
    }
  }
  
  return {
    success: results.every(r => r.status === "success"),
    total: results.length,
    succeeded: results.filter(r => r.status === "success").length,
    failed: results.filter(r => r.status === "failed").length,
    results
  };
}

export async function clearABTestExperiments() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("Not authenticated");
  
  console.log("[ClearABTest] Clearing experiments for user:", user.id);
  
  await (supabase.from("profiles") as any)
    .update({ ab_testing_data: { experiments: [] }, variant_assignments: {} })
    .eq("id", user.id);
  
  return { success: true, message: "All experiments cleared" };
}

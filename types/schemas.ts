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

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

// Subscription Tiers
export const SubscriptionTierSchema = z.enum(["free", "pro", "max"]);
export type SubscriptionTier = z.infer<typeof SubscriptionTierSchema>;

// Subscription Status
export const SubscriptionStatusSchema = z.enum([
  "active",
  "past_due",
  "canceled",
  "unpaid",
  "incomplete",
  "incomplete_expired",
  "trialing",
]);
export type SubscriptionStatus = z.infer<typeof SubscriptionStatusSchema>;

// Billing History Status
export const BillingStatusSchema = z.enum(["paid", "open", "void", "uncollectible"]);
export type BillingStatus = z.infer<typeof BillingStatusSchema>;

// Feature Types for Usage Tracking
export const FeatureTypeSchema = z.enum([
  "daily_quests",
  "ai_judge_evaluations",
  "ai_chatbot_questions",
  "video_uploads",
  "posts_created",
]);
export type FeatureType = z.infer<typeof FeatureTypeSchema>;

// Subscription Schema
export const SubscriptionSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  stripe_subscription_id: z.string(),
  stripe_customer_id: z.string(),
  stripe_price_id: z.string(),
  status: SubscriptionStatusSchema,
  cancel_at_period_end: z.boolean().default(false),
  current_period_start: z.string().datetime().nullable(),
  current_period_end: z.string().datetime().nullable(),
  cancel_at: z.string().datetime().nullable(),
  canceled_at: z.string().datetime().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});
export type Subscription = z.infer<typeof SubscriptionSchema>;

// Billing History Schema
export const BillingHistorySchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  stripe_invoice_id: z.string().nullable(),
  stripe_payment_intent_id: z.string().nullable(),
  amount_cents: z.number(),
  currency: z.string().length(3),
  status: BillingStatusSchema,
  description: z.string().nullable(),
  invoice_url: z.string().url().nullable(),
  receipt_url: z.string().url().nullable(),
  created_at: z.string().datetime(),
});
export type BillingHistory = z.infer<typeof BillingHistorySchema>;

// Usage Tracking Schema
export const UsageTrackingSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  feature_type: FeatureTypeSchema,
  period_start: z.string().datetime(),
  period_end: z.string().datetime(),
  usage_count: z.number().default(0),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});
export type UsageTracking = z.infer<typeof UsageTrackingSchema>;

// Tier Limits Schema
export const TierLimitsSchema = z.object({
  daily_quests: z.number(),
  ai_judge_evaluations: z.number(),
  ai_chatbot_questions: z.number(),
  video_uploads: z.number(),
  posts_created: z.number(),
  video_quality: z.string(),
});
export type TierLimits = z.infer<typeof TierLimitsSchema>;

// Feature Check Result Schema
export const FeatureCheckResultSchema = z.object({
  allowed: z.boolean(),
  limit: z.number(),
  current_usage: z.number(),
  remaining: z.number(),
  tier: SubscriptionTierSchema,
});
export type FeatureCheckResult = z.infer<typeof FeatureCheckResultSchema>;

// Create Checkout Session Input
export const CreateCheckoutSessionSchema = z.object({
  priceId: z.string(),
  tier: SubscriptionTierSchema,
});
export type CreateCheckoutSessionInput = z.infer<typeof CreateCheckoutSessionSchema>;

// Create Customer Portal Session Input
export const CreateCustomerPortalSessionSchema = z.object({
  returnUrl: z.string().url(),
});
export type CreateCustomerPortalSessionInput = z.infer<typeof CreateCustomerPortalSessionSchema>;

// Subscription Plans Configuration
export const SUBSCRIPTION_PLANS = {
  free: {
    id: "free",
    name: "Free Hunter",
    price: 0,
    period: "forever",
    features: {
      daily_quests: 1,
      ai_judge_evaluations: 3,
      ai_chatbot_questions: 10,
      video_uploads: 2,
      posts_created: 3,
      video_quality: "360p",
      ads: true,
      bluetooth_devices: 0,
      smart_scale_sync: false,
      nutrition_tracking: false,
      advanced_analytics: false,
      guild_access: false,
      live_streaming: false,
      video_monetization: false,
    },
  },
  pro: {
    id: "pro",
    name: "Pro Hunter",
    price: 9.99,
    period: "month",
    stripePriceId: process.env.STRIPE_PRICE_ID_PRO,
    features: {
      daily_quests: -1,
      ai_judge_evaluations: -1,
      ai_chatbot_questions: 300,
      video_uploads: 10,
      posts_created: 20,
      video_quality: "1080p",
      ads: false,
      bluetooth_devices: 2,
      smart_scale_sync: true,
      nutrition_tracking: true,
      advanced_analytics: true,
      guild_access: "basic",
      live_streaming: false,
      video_monetization: false,
    },
  },
  max: {
    id: "max",
    name: "Max Hunter",
    price: 19.99,
    period: "month",
    stripePriceId: process.env.STRIPE_PRICE_ID_MAX,
    features: {
      daily_quests: -1,
      ai_judge_evaluations: -1,
      ai_chatbot_questions: -1,
      video_uploads: -1,
      posts_created: -1,
      video_quality: "4k",
      ads: false,
      bluetooth_devices: -1,
      smart_scale_sync: true,
      nutrition_tracking: true,
      advanced_analytics: true,
      guild_access: "full",
      live_streaming: true,
      video_monetization: true,
    },
  },
} as const;

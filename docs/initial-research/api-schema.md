# 📡 API Contract & Data Types
> **Version:** 2.0  
> **Last Updated:** Feb 1, 2026  
> **Changelog:** Added proof media fields, rank-up exam types, report system types

This document defines the strict communication protocols between **The Architect (Groq)**, **The Frontend (Next.js)**, and **The Judge (Opik)**.

## 1. The Architect Output (Groq)

**Role:** Workout Generator
**Strict Constraint:** Output MUST be pure JSON. No markdown formatting.

### TypeScript Interface

```typescript
type QuestRank = "E-Rank" | "D-Rank" | "C-Rank" | "B-Rank" | "A-Rank" | "S-Rank";
type QuestType = "Daily" | "Penalty" | "RankUp" | "Special";  // ← UPDATED
type MuscleGroup = "Chest" | "Back" | "Legs" | "Shoulders" | "Arms" | "Core" | "Cardio" | "Full Body";
type ExerciseType = "Warmup" | "Skill" | "Compound" | "Isolation" | "Cooldown";

interface WorkoutPlan {
  // Gamification Data
  quest_name: string;        // e.g., "Survival Protocol: Leg Day"
  quest_rank: QuestRank;     // Difficulty tier
  quest_type: QuestType;     // ← NEW
  narrative_intro: string;   // System persona text: "The System detects weakness..."
  
  // RPG Rewards
  base_xp: number;           // The XP promised if completed perfectly
  stat_gain: {               // The "Buffs" gained from this quest
    strength?: number;
    agility?: number;
    stamina?: number;
  };
  
  // Workout Meta
  estimated_duration_min: number;
  target_class: "Novice" | "Striker" | "Tank" | "Assassin";
  
  // Proof Requirements ← NEW
  requires_proof: boolean;   // True for RankUp quests
  proof_type?: "Photo" | "Video" | "Timelapse";
  hand_sign?: string;        // e.g., "Show peace sign at start"
  
  // The Drill
  exercises: Exercise[];
}

interface Exercise {
  id: string;                // Unique ID for tracking (e.g., "ex_1")
  name: string;
  type: ExerciseType;        
  
  // Prescriptions
  sets: number;
  reps: string;              // "12-15", "Failure", "AMRAP", "30s"
  rest_sec: number;
  rpe_target: number;        // Rate of Perceived Exertion (1-10)
  
  // Metadata
  target_muscle: MuscleGroup;
  tips: string;              // Short, imperative cue: "Keep back straight."
  video_query: string;       // Optimized query for YouTube search
}
```

### Zod Schema (For Runtime Validation)

```typescript
import { z } from "zod";

export const WorkoutPlanSchema = z.object({
  quest_name: z.string(),
  quest_rank: z.enum(["E-Rank", "D-Rank", "C-Rank", "B-Rank", "A-Rank", "S-Rank"]),
  quest_type: z.enum(["Daily", "Penalty", "RankUp", "Special"]),
  narrative_intro: z.string(),
  base_xp: z.number(),
  stat_gain: z.object({
    strength: z.number().optional(),
    agility: z.number().optional(),
    stamina: z.number().optional(),
  }),
  estimated_duration_min: z.number(),
  target_class: z.enum(["Novice", "Striker", "Tank", "Assassin"]),
  requires_proof: z.boolean().default(false),
  proof_type: z.enum(["Photo", "Video", "Timelapse"]).optional(),
  hand_sign: z.string().optional(),
  exercises: z.array(z.object({
    id: z.string(),
    name: z.string(),
    type: z.enum(["Warmup", "Skill", "Compound", "Isolation", "Cooldown"]),
    sets: z.number(),
    reps: z.string(),
    rest_sec: z.number(),
    rpe_target: z.number().min(1).max(10),
    target_muscle: z.string(),
    tips: z.string(),
    video_query: z.string(),
  })),
});
```

---

## 2. The User Log Input (Frontend → Opik)

**Role:** What the user submits after finishing the workout.

```typescript
type ProofType = "None" | "Photo" | "Video" | "Timelapse";

interface UserQuestLog {
  quest_id: string;
  user_id: string;
  user_class: string;        // e.g., "Tank"
  
  // The Reality
  duration_actual_min: number;
  perceived_difficulty: number; // 1-10 (RPE)
  user_feedback: string;     // e.g., "Too easy, I added 10kg."
  
  // Modifications
  skipped_exercises: string[]; // List of IDs
  modified_exercises: {
    exercise_id: string;
    note: string;            // "Used dumbbells instead of barbell"
  }[];
  
  // Exercise Completion Details ← NEW
  exercises_completed: {
    exercise_id: string;
    sets_done: number;
    reps_done: string;
    skipped: boolean;
  }[];
  
  // Proof Media ← NEW
  proof_media_url?: string;  // Supabase Storage URL
  proof_type: ProofType;
  is_public: boolean;        // Default true (Match History)
}
```

### Zod Schema for User Log

```typescript
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
  proof_type: z.enum(["None", "Photo", "Video", "Timelapse"]).default("None"),
  is_public: z.boolean().default(true),
});
```

---

## 3. The Judge Output (Opik → DB)

**Role:** The result of the Opik Evaluation Script.

```typescript
type VerificationStatus = "Auto_Approved" | "Pending" | "Verified" | "Rejected";
type VerdictStatus = "APPROVED" | "REJECTED" | "FLAGGED" | "PENDING_VERIFICATION";

interface JudgeVerdict {
  // The Verdict
  status: VerdictStatus;
  final_xp_awarded: number;  // Can be higher or lower than base_xp
  
  // Analysis Metrics
  integrity_score: number;   // 0.0 - 1.0 (Anti-cheat score)
  safety_score: number;      // 0.0 - 1.0
  effort_score: number;      // 0.0 - 1.0
  cheat_probability: number; // 0.0 - 1.0
  
  // Multipliers Applied
  multipliers: {
    integrity: number;
    effort: number;
    synergy: number;
    safety: number;
    streak: number;
    hunter_status: number;   // ← NEW
    proof_bonus: number;     // ← NEW
  };
  
  // Proof Verification ← NEW
  proof_required: boolean;
  proof_provided: boolean;
  verification_status: VerificationStatus;
  
  // Feedback to User
  system_message: string;
  
  // Stat Updates
  stat_updates: {
    strength_add: number;
    agility_add: number;
    stamina_add: number;
  };
}
```

---

## 4. Rank-Up Exam Types ← NEW

```typescript
interface RankUpExam {
  id: string;
  user_id: string;
  from_rank: QuestRank;
  to_rank: QuestRank;
  
  // The Exam Quest
  exam_quest: WorkoutPlan;   // Generated specifically for exam
  
  // Proof Requirements (Mandatory)
  proof_type: "Video" | "Timelapse";
  hand_sign_required: string; // e.g., "Thumbs down", "Peace sign"
  
  // Status
  status: "Pending" | "Approved" | "Rejected";
  proof_media_url?: string;
  submitted_at?: string;
  reviewed_at?: string;
}

interface RankUpResult {
  passed: boolean;
  new_rank: QuestRank | null;
  reason: string;
  xp_bonus: number;          // Bonus XP for rank up
}
```

### Rank-Up Exam Templates

```typescript
const RANK_UP_EXAMS: Record<string, Partial<RankUpExam>> = {
  "E_to_D": {
    proof_type: "Timelapse",
    hand_sign_required: "Show 'D' with fingers at start",
    exam_quest: {
      quest_name: "Awakening Trial: First Steps",
      exercises: [
        { name: "Push-ups", sets: 1, reps: "30", continuous: true },
        { name: "Squats", sets: 1, reps: "40", continuous: true },
      ]
    }
  },
  "D_to_C": {
    proof_type: "Video",
    hand_sign_required: "Peace sign at start",
    // More challenging exam...
  },
  // ... other rank transitions
};
```

---

## 5. Community Report Types ← NEW

```typescript
type ReportReason = 
  | "Impossible_Stats"    // e.g., 100 pushups in 10 seconds
  | "Fake_Media"          // Obvious fake/old photo
  | "Suspicious_Pattern"  // Always perfect stats, no variation
  | "Other";

type ReportStatus = "Pending" | "Reviewed" | "Confirmed" | "Dismissed";

interface UserReport {
  id: string;
  reporter_id: string;
  target_user_id: string;
  target_log_id?: string;    // Optional: specific log being reported
  
  reason: ReportReason;
  description: string;
  
  status: ReportStatus;
  created_at: string;
}

interface ReportOutcome {
  target_status_change: HunterStatus | null;
  log_flagged: boolean;
  reporter_notification: string;
  target_notification: string;
}
```

---

## 6. Hunter Status Types ← NEW

```typescript
type HunterStatus = "Normal" | "Verified" | "Flagged" | "Corrupted";

interface HunterStatusEffects {
  Normal: {
    xp_multiplier: 1.0,
    leaderboard_access: true,
    badge_color: "gray"
  },
  Verified: {
    xp_multiplier: 1.1,      // 10% XP bonus
    leaderboard_access: true,
    badge_color: "cyan",     // Blue checkmark
    benefits: ["Priority in social feed", "Trusted reporter status"]
  },
  Flagged: {
    xp_multiplier: 0.8,      // 20% XP penalty
    leaderboard_access: true, // Can still appear, with warning
    badge_color: "yellow",
    restrictions: ["Logs require proof for full XP"]
  },
  Corrupted: {
    xp_multiplier: 0.0,      // No XP gains
    leaderboard_access: false, // BANNED from leaderboard
    badge_color: "red",
    restrictions: ["Cannot participate in rankings", "All logs flagged"]
  }
}
```

---

## 7. Match History (Public Activity Feed) ← NEW

```typescript
interface MatchHistoryEntry {
  // Log Data
  log_id: string;
  quest_name: string;
  quest_rank: QuestRank;
  completed_at: string;
  
  // Performance
  duration_min: number;
  xp_awarded: number;
  exercises_count: number;
  
  // Verification
  has_proof: boolean;
  proof_thumbnail_url?: string;
  verification_status: VerificationStatus;
  integrity_score: number;
  
  // User
  user_id: string;
  username: string;
  hunter_status: HunterStatus;
}

interface ProfileMatchHistory {
  user: {
    username: string;
    rank_tier: QuestRank;
    level: number;
    hunter_status: HunterStatus;
    total_quests: number;
    verified_quests: number;  // Quests with proof
  };
  
  recent_activity: MatchHistoryEntry[];
  
  stats: {
    total_xp_earned: number;
    avg_integrity_score: number;
    proof_rate: number;       // % of quests with proof
    streak_current: number;
    streak_best: number;
  };
}
```

---

## 📝 Notes for Implementation

1. **Proof Media Handling:**
   - Upload to Supabase Storage before submitting log
   - Use pre-signed URLs for security
   - Compress videos to < 50MB (use client-side compression)
   - Timelapse = 15-30 second compressed video of workout

2. **Match History Privacy:**
   - `is_public = true` by default (social pressure)
   - Users CAN set to private, but get 10% XP penalty
   - Rank-up exams are ALWAYS public

3. **Report System:**
   - Rate limit: Max 5 reports per user per day
   - Self-reports blocked
   - False reporting penalty: If 3+ reports dismissed, reporter gets flagged

4. **Verified Hunter:**
   - Auto-granted after 5 proofs uploaded
   - Can be manually granted by admin
   - Revoked if status changes to Flagged/Corrupted

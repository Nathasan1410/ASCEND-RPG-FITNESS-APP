# ⚖️ The Judge: Evaluation & XP Logic Schema
> **Version:** 2.0  
> **Last Updated:** Feb 1, 2026  
> **Changelog:** Added Social Audit System, Gatekeeper Logic, Match History verification

## 1. Agent Profile
- **Role:** "The Game Master" / Anti-Cheat System
- **Tooling:** Opik (LLM-as-a-Judge) + Custom TypeScript Logic
- **Goal:** Validate user integrity, calculate "Relative Effort" XP, and ensure safety compliance

---

## 2. The Three-Layer Anti-Cheat System ← NEW

### Layer 1: Opik Logic Filter (Automated)
*First line of defense - instant, cheap, always active*

**Mechanism:** Statistical analysis of claimed performance vs physical limits

**Thresholds (Human Limits):**
| Exercise | Max Rate | Flag Type |
|----------|----------|-----------|
| Pushups | > 80 reps/min | `SUSPICIOUS` |
| Squats | > 60 reps/min | `SUSPICIOUS` |
| Plank | > 10 mins (E-Rank) | `FLAGGED` |
| Running | < 2:30/km pace | `REJECTED` |
| Any exercise | Claimed in < 50% expected time | `REQUIRES_PROOF` |

**Action on Detection:**
```typescript
if (integrity_score < 0.3) {
  return { 
    status: "REJECTED", 
    message: "ANOMALY DETECTED. Human physical limits exceeded. Log rejected.",
    xp_awarded: 0 
  };
}

if (integrity_score < 0.7) {
  return { 
    status: "FLAGGED", 
    message: "Unusual performance detected. Proof recommended for full XP.",
    xp_awarded: calculated_xp * 0.5  // Half XP until verified
  };
}
```

### Layer 2: Social Audit (Community Pressure) ← NEW
*The "Valorant Match History" approach*

**Mechanism:** All workout logs are PUBLIC by default

**Features:**
- Profile shows complete workout history (like match history)
- Other users can view anyone's stats + logs
- "Report Suspicious Activity" button on each log
- Visual indicators for proof-backed vs unverified logs

**Psychology:** 
- "The Shame Factor" - If profile photo shows skinny user but history claims "Bench 150kg x 10", friends will know
- Social pressure encourages honesty
- Flexing culture encourages voluntary proof uploads

**Report Consequences:**
| Report Count | Status | Effect |
|--------------|--------|--------|
| 0-2 | Normal | No effect |
| 3-4 | Flagged | Yellow badge, warning shown |
| 5+ | Corrupted | Red badge, BANNED from leaderboard |

### Layer 3: Gatekeeper System (Rank-Up Exams) ← NEW
*The "Proof Required" checkpoint*

**Concept:** Daily quests use honor system, but RANK PROMOTIONS require video proof

**When Triggered:**
- E-Rank → D-Rank (First promotion)
- D-Rank → C-Rank
- C-Rank → B-Rank
- B-Rank → A-Rank
- A-Rank → S-Rank (Most rigorous)

**Exam Requirements:**
```typescript
interface RankUpExam {
  exam_type: "Strength" | "Endurance" | "Skill";
  required_exercises: Exercise[];
  proof_type: "Video" | "Timelapse";  // NOT just photo
  hand_sign: string;  // e.g., "Thumbs down" - proves it's fresh recording
  time_limit_hours: 24;  // Must complete within 24h of accepting
}

// Example: E → D Rank Exam
const eToDExam: RankUpExam = {
  exam_type: "Strength",
  required_exercises: [
    { name: "Push-ups", reps: 30, continuous: true },
    { name: "Squats", reps: 40, continuous: true }
  ],
  proof_type: "Timelapse",  // 15-30 second compressed video
  hand_sign: "Show 'D' with fingers at start",
  time_limit_hours: 24
};
```

**Verification Flow:**
```
User triggers Rank Up → System assigns Exam Quest → 
User records proof video → Upload to Supabase Storage →
Status = "Pending_Verification" → 
[MVP: Auto-approve after 24h if no reports] →
[Future: Admin/AI review] →
Rank Up confirmed
```

---

## 3. Evaluation Metrics (The Rubric)

### A. Integrity Score (Anti-Cheat)
*Detects statistical anomalies in user reports.*

**Formula:**
```typescript
function calculateIntegrityScore(plan: WorkoutPlan, log: QuestLog): number {
  let score = 1.0;
  
  // Time-to-volume check
  const totalReps = log.exercises.reduce((sum, ex) => 
    sum + (ex.sets_done * parseInt(ex.reps_done)), 0);
  const minPossibleTime = totalReps * 1.0; // 1 second per rep minimum
  
  if (log.duration_seconds < minPossibleTime) {
    score = 0.0; // Physically impossible
  }
  
  // Completion rate
  const completionRate = log.exercises.filter(e => !e.skipped).length / plan.exercises.length;
  if (completionRate < 0.5) {
    score *= 0.5;
  }
  
  // Proof bonus
  if (log.proof_media_url) {
    score = Math.min(1.0, score + 0.2); // Proof adds credibility
  }
  
  return score;
}
```

### B. Effort Score (RPE Delta)
*Measures if the user actually tried hard enough.*

**Formula:** `Delta = Target_RPE - Actual_RPE`

**Scoring:**
| Delta | Interpretation | Multiplier |
|-------|----------------|------------|
| ≤ 0 | High Effort (pushed harder) | 1.2x |
| 1-2 | Normal Effort | 1.0x |
| 3-4 | Slacking | 0.8x |
| > 4 | Sandbagging | 0.5x |

### C. Class Synergy (Role-Playing Bonus)
*Rewards users for acting according to their selected Class.*

| Class | Bonus Condition | Multiplier |
|-------|-----------------|------------|
| Tank | Heavy loads / time under tension | 1.1x |
| Striker | High volume / speed | 1.1x |
| Assassin | Cardio / HIIT completion | 1.1x |
| Novice | Perfect streak (7+ days) | 1.15x |

### D. Safety Adherence
*Penalizes dangerous behavior.*

- If `Condition = "Sore"` AND `Workout_Intensity = "High"` → **Safety Violation**
- **Penalty:** XP × 0.5 + Warning Message

### E. Verified Hunter Bonus ← NEW
*Rewards users who provide proof*

| Hunter Status | XP Multiplier |
|---------------|---------------|
| Normal | 1.0x |
| Verified | 1.1x |
| Flagged | 0.8x |
| Corrupted | 0.0x (No XP) |

---

## 4. XP Calculation Formula (The Algorithm)

```typescript
Final_XP = (Base_XP + Volume_Bonus) 
  × Integrity_Mod 
  × Effort_Mod 
  × Synergy_Mod 
  × Safety_Mod 
  × Streak_Mod
  × Hunter_Status_Mod  // ← NEW
  × (hasProof ? 1.05 : 1.0)  // ← NEW: 5% bonus for proof
```

**Variables:**

1. **Base_XP:** `Estimated_Duration_Min × 10` (e.g., 30 mins = 300 XP)

2. **Integrity_Mod:**
   - `1.0` (Clean)
   - `0.5` (Flagged - awaiting proof)
   - `0.0` (Cheating Detected)

3. **Effort_Mod:** `0.5` to `1.2` based on RPE delta

4. **Synergy_Mod:** `1.0` to `1.1` based on class match

5. **Safety_Mod:** `0.5` (Ignored injury) or `1.0` (Safe)

6. **Streak_Mod:** `1.0 + min(streak × 0.02, 0.2)` (Max 20% bonus)

7. **Hunter_Status_Mod:** ← NEW
   - Normal: `1.0`
   - Verified: `1.1`
   - Flagged: `0.8`
   - Corrupted: `0.0`

---

## 5. Judge System Prompt (Opik)

```text
SYSTEM: You are THE JUDGE. An impartial, all-seeing system auditor.
TASK: Evaluate the Hunter's performance log against the assigned Quest.

INPUT DATA:
- Assigned Quest: {{quest_json}}
- User Log: {{log_json}}
- User Profile: {{profile_json}}
- Quest Type: {{quest_type}}  // Daily, Penalty, or RankUp

STEPS:
1. CHECK INTEGRITY: Compare reps vs duration. If physically impossible, flag as CHEAT.
2. CHECK PROOF: If quest_type is "RankUp" and no proof_media_url, REJECT immediately.
3. CHECK SENTIMENT: Analyze 'user_feedback' text. Does the user sound exhausted, easy, or in pain?
4. CHECK SAFETY: Did the user perform forbidden moves while 'Sore'?
5. CALCULATE SCORES:
   - Assign 'IntegrityScore' (0.0 - 1.0).
   - Assign 'SafetyScore' (0.0 - 1.0).
   - Assign 'EffortScore' (Based on RPE comparison).

RANK UP EXAM SPECIAL RULES:
- If quest_type === "RankUp":
  - proof_media_url is REQUIRED
  - If missing: status = "REJECTED", message = "Visual proof required for Rank Promotion."
  - If present: status = "PENDING_VERIFICATION" (awaiting review)

OUTPUT:
Strict JSON matching the 'JudgeVerdict' schema.

'system_message' templates:
- If Cheating: "ANOMALY DETECTED. STATS REJECTED. Your deception has been logged."
- If Good: "EFFORT ACKNOWLEDGED. REWARDS DISPENSED."
- If Unsafe: "WARNING. SELF-PRESERVATION PROTOCOLS IGNORED."
- If RankUp Success: "PROMOTION PENDING. Visual confirmation required."
- If RankUp Missing Proof: "PROOF REQUIRED. Record your exam and submit."
```

---

## 6. Output Data Structure (JudgeVerdict)

*This is the data written back to the Database.*

```typescript
interface JudgeVerdict {
  // The Verdict
  status: "APPROVED" | "REJECTED" | "FLAGGED" | "PENDING_VERIFICATION";
  
  // The Numbers
  base_xp: number;
  multipliers: {
    integrity: number;   // 0.0 - 1.0
    effort: number;      // 0.5 - 1.2
    synergy: number;     // 1.0 - 1.1
    safety: number;      // 0.5 - 1.0
    streak: number;      // 1.0 - 1.2
    hunter_status: number; // 0.0 - 1.1 ← NEW
    proof_bonus: number;   // 1.0 or 1.05 ← NEW
  };
  final_xp: number;    // Calculated result
  
  // The Analysis
  integrity_score: number;  // 0.0 - 1.0
  safety_score: number;     // 0.0 - 1.0
  cheat_probability: number; // 0.0 - 1.0
  
  // Proof Status ← NEW
  proof_required: boolean;
  proof_provided: boolean;
  verification_status: "Auto_Approved" | "Pending" | "Verified" | "Rejected";
  
  // The Feedback
  system_message: string;
  stat_updates: {
    strength_add: number;
    agility_add: number;
    stamina_add: number;
  };
}
```

---

## 7. Rank-Up Exam Logic ← NEW

```typescript
interface RankUpExamResult {
  passed: boolean;
  reason: string;
  new_rank: RankTier | null;
}

function evaluateRankUpExam(
  exam: RankUpExam, 
  log: QuestLog,
  profile: Profile
): RankUpExamResult {
  
  // Rule 1: Proof is MANDATORY
  if (!log.proof_media_url) {
    return {
      passed: false,
      reason: "Visual proof required. Record your exam and resubmit.",
      new_rank: null
    };
  }
  
  // Rule 2: Check proof type
  if (exam.proof_type === "Video" && log.proof_type !== "Video") {
    return {
      passed: false,
      reason: "Video proof required for this rank. Photo is insufficient.",
      new_rank: null
    };
  }
  
  // Rule 3: Integrity check still applies
  const integrityScore = calculateIntegrityScore(exam.plan, log);
  if (integrityScore < 0.7) {
    return {
      passed: false,
      reason: "Performance data inconsistent. Exam failed.",
      new_rank: null
    };
  }
  
  // Rule 4: For MVP, auto-approve with proof
  // Future: AI video analysis or admin review
  return {
    passed: true,
    reason: "Exam completed. Rank promotion granted.",
    new_rank: exam.to_rank
  };
}
```

---

## 8. Community Report Handling ← NEW

```typescript
interface ReportAction {
  user_status_change: HunterStatus | null;
  log_action: "None" | "Flag" | "Remove";
  notification: string;
}

function handleReport(
  report: Report,
  targetProfile: Profile
): ReportAction {
  const newReportCount = targetProfile.report_count + 1;
  
  if (newReportCount >= 5) {
    return {
      user_status_change: "Corrupted",
      log_action: "Flag",
      notification: "Multiple violations detected. Leaderboard access revoked."
    };
  }
  
  if (newReportCount >= 3) {
    return {
      user_status_change: "Flagged",
      log_action: "Flag",
      notification: "Warning: Your activity is under review."
    };
  }
  
  return {
    user_status_change: null,
    log_action: "None",
    notification: null
  };
}
```

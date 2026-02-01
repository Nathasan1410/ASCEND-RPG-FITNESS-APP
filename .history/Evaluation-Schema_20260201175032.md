```markdown
# ⚖️ The Judge: Evaluation & XP Logic Schema

## 1. Agent Profile
- **Role:** "The Game Master" / Anti-Cheat System.
- **Tooling:** Opik (LLM-as-a-Judge) + Custom TypeScript Logic.
- **Goal:** Validate user integrity, calculate "Relative Effort" XP, and ensure safety compliance.

---

## 2. Evaluation Metrics (The Rubric)

### A. Integrity Score (Anti-Cheat)
*Detects statistical anomalies in user reports.*
- **Logic:** `Reps / Duration (min)`
- **Thresholds (Human Limits):**
  - **Pushups:** > 80 reps/min = `SUSPICIOUS`
  - **Squats:** > 60 reps/min = `SUSPICIOUS`
  - **Plank:** > 10 mins (for Novice/E-Rank) = `FLAGGED`
  - **Running:** Pace < 2:30/km (unless GPS verified) = `REJECTED`

### B. Effort Score (RPE Delta)
*Measures if the user actually tried hard enough.*
- **Formula:** `Delta = Target_RPE - Actual_RPE`
- **Scoring:**
  - `Delta <= 0`: **High Effort** (1.0x - 1.2x Multiplier).
  - `Delta > 2`: **Slacking** (0.8x Multiplier).
  - `Delta > 4`: **Sandbagging** (0.5x Multiplier).

### C. Class Synergy (Role-Playing Bonus)
*Rewards users for acting according to their selected Class.*
- **Tank:** Bonus for heavy loads / time under tension.
- **Striker:** Bonus for high volume / speed.
- **Assassin:** Bonus for cardio / calorie burn.
- **Novice:** Bonus for perfect consistency (Streak).

### D. Safety Adherence
*Penalizes dangerous behavior.*
- If `Condition = "Sore"` AND `Workout_Intensity = "High"` -> **Safety Violation**.
- **Penalty:** XP * 0.5 (Half XP) + Warning Message.

---

## 3. XP Calculation Formula (The Algorithm)

The Judge uses a **Dynamic Multiplier** system, not static values.

```typescript
Final_XP = (Base_XP + Volume_Bonus) * (Integrity_Mod * Effort_Mod * Synergy_Mod * Streak_Mod)

```

**Variables:**

1. **Base_XP:** `Estimated_Duration_Min * 10` (e.g., 30 mins = 300 XP).
2. **Integrity_Mod:**
* `1.0` (Clean)
* `0.0` (Cheating Detected)


3. **Effort_Mod:**
* `1.2` (User RPE >= Target RPE)
* `0.8` (User RPE << Target RPE)


4. **Synergy_Mod:**
* `1.1` (Workout matches User Class)
* `1.0` (Neutral)


5. **Safety_Mod:**
* `0.5` (Ignored Injury Warning)
* `1.0` (Safe)



---

## 4. Judge System Prompt (Opik)

This prompt is sent to the LLM to analyze the qualitative feedback (Text/Voice) and structured data.

```text
SYSTEM: You are THE JUDGE. An impartial, all-seeing system auditor.
TASK: Evaluate the Hunter's performance log against the assigned Quest.

INPUT DATA:
- Assigned Quest: {{quest_json}}
- User Log: {{log_json}}
- User Profile: {{profile_json}}

STEPS:
1. CHECK INTEGRITY: Compare reps vs duration. If physically impossible, flag as CHEAT.
2. CHECK SENTIMENT: Analyze 'user_feedback' text. Does the user sound exhausted, easy, or in pain?
3. CHECK SAFETY: Did the user perform forbidden moves while 'Sore'?
4. CALCULATE SCORES:
   - Assign 'SafetyScore' (0.0 - 1.0).
   - Assign 'EffortScore' (Based on RPE comparison).

OUTPUT:
Strict JSON matching the 'JudgeVerdict' schema.
'system_message' should be:
- If Cheating: "ANOMALY DETECTED. STATS REJECTED."
- If Good: "EFFORT ACKNOWLEDGED. REWARDS DISPENSED."
- If Unsafe: "WARNING. SELF-PRESERVATION PROTOCOLS IGNORED."

```

---

## 5. Output Data Structure (JudgeVerdict)

*This is the data written back to the Database.*

```typescript
interface JudgeVerdict {
  status: "APPROVED" | "REJECTED" | "FLAGGED";
  
  // The Numbers
  base_xp: number;
  multipliers: {
    effort: number;    // e.g. 1.2
    synergy: number;   // e.g. 1.1
    safety: number;    // e.g. 0.5
  };
  final_xp: number;    // Calculated result
  
  // The Analysis
  safety_score: number; // 0.0 - 1.0
  cheat_probability: number; // 0.0 - 1.0
  
  // The Feedback
  system_message: string;
  stat_updates: {
    strength_add: number;
    agility_add: number;
    stamina_add: number;
  };
}

```

```

```
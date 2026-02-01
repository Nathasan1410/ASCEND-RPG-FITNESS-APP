import { type WorkoutPlan, type QuestLogInput } from "@/types/schemas";

interface EvaluationInput {
  plan: WorkoutPlan;
  log: QuestLogInput;
  userClass: string;
  streakCurrent: number;
}

interface EvaluationResult {
  integrityScore: number;
  effortScore: number;
  safetyScore: number;
  synergyBonus: number;
  streakBonus: number;
  finalXp: number;
  status: "APPROVED" | "REJECTED" | "FLAGGED";
  message: string;
}

export function evaluateWorkout(input: EvaluationInput): EvaluationResult {
  const { plan, log, userClass, streakCurrent } = input;

  // 1. Integrity Check (Cheat Detection)
  const integrityScore = checkIntegrity(plan, log);

  // 2. Effort Score (RPE Comparison)
  const effortScore = checkEffort(plan, log);

  // 3. Safety Score
  const safetyScore = 1.0; // Simplified for MVP

  // 4. Class Synergy
  const synergyBonus = plan.target_class === userClass ? 1.1 : 1.0;

  // 5. Streak Bonus
  const streakBonus = 1 + Math.min(streakCurrent * 0.02, 0.2); // Max 20% bonus

  // Calculate Final XP
  let finalXp = plan.base_xp;
  finalXp *= integrityScore;
  finalXp *= effortScore;
  finalXp *= safetyScore;
  finalXp *= synergyBonus;
  finalXp *= streakBonus;
  finalXp = Math.floor(finalXp);

  // Determine Status
  let status: "APPROVED" | "REJECTED" | "FLAGGED";
  let message: string;

  if (integrityScore === 0) {
    status = "REJECTED";
    message = "ANOMALY DETECTED. Stats rejected. The System does not tolerate deception.";
  } else if (integrityScore < 0.5) {
    status = "FLAGGED";
    message = "Suspicious activity logged. XP reduced. You are being monitored.";
  } else {
    status = "APPROVED";
    message = effortScore >= 1.0
      ? "Exceptional effort acknowledged. The System rewards those who push beyond limits."
      : "Protocol completed. Continue to prove your worth.";
  }

  return {
    integrityScore,
    effortScore,
    safetyScore,
    synergyBonus,
    streakBonus,
    finalXp,
    status,
    message,
  };
}

function checkIntegrity(plan: WorkoutPlan, log: QuestLogInput): number {
  // Calculate total claimed volume
  let totalReps = 0;
  log.exercises_completed.forEach((ex) => {
    if (!ex.skipped) {
      const reps = parseInt(ex.reps_done) || 0;
      totalReps += ex.sets_done * reps;
    }
  });

  // Physics check: Max ~80 reps/min for simple exercises
  const durationMin = log.duration_actual;
  const maxPossibleReps = durationMin * 80;

  if (totalReps > maxPossibleReps) {
    return 0; // Cheating detected
  }

  // Check completion rate
  const planExercises = plan.exercises.length;
  const completedExercises = log.exercises_completed.filter((e) => !e.skipped).length;
  const completionRate = completedExercises / planExercises;

  if (completionRate < 0.5) {
    return 0.5; // Partial completion
  }

  return 1.0;
}

function checkEffort(plan: WorkoutPlan, log: QuestLogInput): number {
  // Average target RPE from plan
  const avgTargetRpe = plan.exercises.reduce((sum, ex) => sum + ex.rpe_target, 0) / plan.exercises.length;
  const actualRpe = log.rpe_actual;

  const delta = avgTargetRpe - actualRpe;

  if (delta <= 0) {
    return 1.2; // User worked harder than expected
  } else if (delta <= 2) {
    return 1.0; // Normal
  } else if (delta <= 4) {
    return 0.8; // Slacking
  } else {
    return 0.5; // Sandbagging
  }
}

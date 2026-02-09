import Groq from "groq-sdk";
import { type WorkoutPlan, type QuestLogInput, type UserClass } from "@/types/schemas";
import { sendTraceToOpik } from "./opik-helper";

const apiKey = process.env.GROQ_API_KEY;

const groq = apiKey ? new Groq({
  apiKey: apiKey,
}) : null;

const JUDGE_PROMPT = `You are an AI Fitness Judge. Evaluate the completed workout fairly and detect blatant cheating.

Evaluate based on:
- Integrity: Did the user complete what was assigned?
- Effort: Did they push themselves (RPE)?
- Safety: Was the workout safe for their condition?
- Duration & Completion: Is the workout duration reasonable for what was completed?

CRITICAL CHEATING DETECTION RULES (Apply REJECTED status automatically):
1. BLATANT CHEATING: Duration < 3 minutes AND marked as complete = IMPOSSIBLE to complete in < 3 min
2. BLATANT CHEATING: Duration < 2 minutes = IMPOSSIBLE to complete in < 2 min
3. BLATANT CHEATING: Duration < 30 seconds (0.5 min) = IMPOSSIBLE, instant rejection
4. HIGH SUSPICION: Duration < 5 minutes AND incomplete exercises = INTEGRITY ISSUE (integrity 0.3-0.6)
5. OBVIOUS DISHONESTY: Claimed completion but proof not provided = INTEGRITY ISSUE

Return a JSON verdict:
{
  "status": "APPROVED" or "REJECTED",
  "integrity_score": 0.0-1.0,
  "effort_score": 0.0-1.0,
  "safety_score": 0.0-1.0,
  "final_xp": number,
  "message": "Brief explanation of your decision"
}`;

interface JudgeInput {
  plan: WorkoutPlan;
  log: QuestLogInput;
  user_class: UserClass;
  user_rank: string;
}

interface JudgeVerdict {
  status: "APPROVED" | "REJECTED";
  integrity_score: number;
  effort_score: number;
  safety_score: number;
  final_xp: number;
  message: string;
}

interface CheatingDetection {
  isBlatant: boolean;
  isHighSuspicion: boolean;
  isImpossible: boolean;
  reason: string | null;
}

export async function evaluateWorkoutAsAI(input: JudgeInput): Promise<JudgeVerdict> {
  const evaluationStartTime = Date.now();

  if (!groq) {
    throw new Error("GROQ_API_KEY not found");
  }

  const { plan, log } = input;
  const durationActual = log.duration_actual || 0;
  const exercisesCompleted = log.exercises_completed?.length || 0;
  const exercisesAssigned = plan.exercises?.length || 0;
  const proofProvided = !!log.proof_media_url;

  const cheatingDetection: CheatingDetection = {
    isBlatant: false,
    isHighSuspicion: false,
    isImpossible: false,
    reason: null,
  };

  if (log.is_public && durationActual < 3) {
    cheatingDetection.isBlatant = true;
    cheatingDetection.reason = "Completed a full workout in under 3 minutes - physically impossible to complete all exercises properly";
  } else if (durationActual < 2) {
    cheatingDetection.isBlatant = true;
    cheatingDetection.reason = "Completed in under 2 minutes - impossible to complete exercises correctly";
  } else if (durationActual < 0.5) {
    cheatingDetection.isImpossible = true;
    cheatingDetection.isBlatant = true;
    cheatingDetection.reason = "Completed in under 30 seconds - instant rejection, impossible to be legitimate";
  } else if (durationActual < 5 && exercisesCompleted < exercisesAssigned) {
    cheatingDetection.isHighSuspicion = true;
    cheatingDetection.reason = `Duration < 5min (${durationActual}min) but didn't complete all exercises (${exercisesCompleted}/${exercisesAssigned})`;
  } else if (!proofProvided && exercisesCompleted === exercisesAssigned) {
    cheatingDetection.isBlatant = true;
    cheatingDetection.reason = "Marked complete without any proof - obvious attempt to skip verification";
  }

  const cheatingStatus = cheatingDetection.isBlatant || cheatingDetection.isHighSuspicion;

  const userMessage = `
ASSIGNED QUEST:
${JSON.stringify(plan, null, 2)}

USER LOG:
${JSON.stringify(log, null, 2)}

USER PROFILE:
- Class: ${input.user_class}
- Rank: ${input.user_rank}

CHEATING DETECTION STATUS: ${cheatingStatus ? "BLATANT CHEATING DETECTED" : "No cheating detected"}

${cheatingDetection.reason ? `SUSPICION REASON: ${cheatingDetection.reason}` : ""}

Evaluate this workout fairly. Apply strict cheating detection rules:

Return a JSON verdict:
{
  "status": "APPROVED" or "REJECTED",
  "integrity_score": 0.0-1.0 (did they complete what was assigned?)
  "effort_score": 0.0-1.0 (did they push themselves based on RPE?)
  "safety_score": 0.0-1.0 (was it safe for their condition?)
  "final_xp": number (calculated from base_xp multiplied by scores)
  "message": "Brief explanation of your decision"
}
`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: JUDGE_PROMPT },
        { role: "user", content: userMessage },
      ],
      temperature: 0.5,
      max_tokens: 1500,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("No response from Groq");

    const parsed = JSON.parse(content);

    let integrityScore = 0.5;
    let effortScore = 0.5;
    let safetyScore = 0.5;
    let finalStatus: "APPROVED" | "REJECTED";
    let message = "";

    if (cheatingStatus) {
      integrityScore = 0.0;
      effortScore = 0.0;
      safetyScore = 0.0;
      finalStatus = "REJECTED";
      message = cheatingDetection.isImpossible
        ? "IMPOSSIBLE - Workout completed in under 30 seconds"
        : cheatingDetection.isHighSuspicion
        ? "HIGH SUSPICION - Suspicious completion pattern detected"
        : "BLATANT CHEATING - Unreasonably fast completion detected";
    } else {
      integrityScore = 0.5;
      effortScore = 0.5;
      safetyScore = 0.5;
      finalStatus = "APPROVED";
      message = "Workout completed fairly with reasonable effort and duration";
    }

    const verdict: JudgeVerdict = {
      status: finalStatus,
      integrity_score,
      effort_score,
      safetyScore,
      final_xp: plan.base_xp * ((integrityScore + effortScore + safetyScore) / 3),
      message,
      cheating_detected: cheatingStatus,
      cheating_reason: cheatingDetection.reason,
    } as any;

    console.log("[AI Judge] AI verdict:", JSON.stringify(verdict, null, 2));

    await sendTraceToOpik("ai_judge_evaluation", {
      startTime: evaluationStartTime,
      input: {
        quest_name: input.plan.quest_name,
        quest_rank: input.plan.quest_rank,
        quest_type: input.plan.quest_type,
        user_class: input.user_class,
        user_rank: input.user_rank,
        duration_actual: durationActual,
        rpe_actual: log.rpe_actual,
        has_proof: !!log.proof_media_url,
        proof_type: log.proof_type || "None",
        cheating_detected: cheatingStatus,
        cheating_reason: cheatingDetection.reason || null,
      },
      output: {
        status: verdict.status,
        integrity_score: verdict.integrity_score,
        effort_score: verdict.effort_score,
        safety_score: verdict.safety_score,
        final_xp: verdict.final_xp,
        message: verdict.message,
      },
      tags: [
        verdict.status,
        input.user_class,
        input.user_rank,
        input.plan.quest_type,
        verdict.status === "REJECTED" ? "cheating_detected" : "ai_approved",
      ],
    });

    return verdict;

  } catch (error: any) {
    console.error("[AI Judge] Evaluation failed:", error);

    await sendTraceToOpik("ai_judge_error", {
      startTime: evaluationStartTime,
      input: {
        quest_name: input.plan.quest_name,
        quest_rank: input.plan.quest_rank,
        quest_type: input.plan.quest_type,
        user_class: input.user_class,
        user_rank: input.user_rank,
      },
      output: {
        status: "ERROR",
        message: "AI judge failed to evaluate workout",
      },
      tags: ["error", "ai_judge_failure"],
    });

    return {
      status: "REJECTED",
      integrity_score: 0,
      effort_score: 0,
      safety_score: 0,
      final_xp: 0,
      message: `Error: ${error?.message || "Unknown error"}`,
    };
  }
}

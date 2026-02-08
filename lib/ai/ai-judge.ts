import Groq from "groq-sdk";
import { type WorkoutPlan, type QuestLogInput, type UserClass } from "@/types/schemas";
import { sendTraceToOpik } from "./opik-helper";

const apiKey = process.env.GROQ_API_KEY;

const groq = apiKey ? new Groq({
  apiKey: apiKey,
}) : null;

const JUDGE_PROMPT = `You are an AI Fitness Judge. Evaluate the completed workout fairly.

Evaluate based on:
- Integrity: Did the user complete what was assigned?
- Effort: Did they push themselves (RPE)?
- Safety: Was the workout safe for their condition?
- Overall: Combine all factors to make a fair decision

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
  status: "APPROVED" | "REJECTED" | "FLAGGED";
  integrity_score: number;
  effort_score: number;
  safety_score: number;
  final_xp: number;
  message: string;
}

export async function evaluateWorkoutAsAI(input: JudgeInput): Promise<JudgeVerdict> {
  const evaluationStartTime = Date.now();

  if (!groq) {
    throw new Error("GROQ_API_KEY not found");
  }

  const userMessage = `
ASSIGNED QUEST:
${JSON.stringify(input.plan, null, 2)}

USER LOG:
${JSON.stringify(input.log, null, 2)}

USER PROFILE:
- Class: ${input.user_class}
- Rank: ${input.user_rank}

Evaluate this workout fairly and return a JSON verdict with:
- status: "APPROVED" or "REJECTED"
- integrity_score: 0.0-1.0 (did they complete the assignment?)
- effort_score: 0.0-1.0 (did they push themselves based on RPE?)
- safety_score: 0.0-1.0 (was it safe for their condition?)
- final_xp: number (calculated from base_xp multiplied by scores)
- message: brief explanation of your decision

Only return JSON. No other text.
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
    const verdict: JudgeVerdict = parsed;

    console.log("[AI Judge] AI verdict:", JSON.stringify(verdict, null, 2));

    await sendTraceToOpik("ai_judge_evaluation", {
      startTime: evaluationStartTime,
      input: {
        quest_name: input.plan.quest_name,
        quest_rank: input.plan.quest_rank,
        quest_type: input.plan.quest_type,
        user_class: input.user_class,
        user_rank: input.user_rank,
        duration_actual: input.log.duration_actual,
        rpe_actual: input.log.rpe_actual,
        has_proof: !!input.log.proof_media_url,
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
        verdict.status === "REJECTED" ? "ai_rejected" : "ai_approved",
      ],
    });

    return verdict;

  } catch (error: any) {
    console.error("[AI Judge] Evaluation failed:", error);

    await sendTraceToOpik("ai_judge_error", {
      startTime: evaluationStartTime,
      input: {
        quest_name: input.plan.quest_name,
        user_class: input.user_class,
        user_rank: input.user_rank,
        error: error?.message,
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

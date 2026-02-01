import Groq from "groq-sdk";
import { JudgeVerdictSchema, type JudgeVerdict, type WorkoutPlan, type QuestLogInput, type UserClass } from "@/types/schemas";
import { JUDGE_PROMPT } from "./prompts";
import { opikClient } from "./opik";

const apiKey = process.env.GROQ_API_KEY;

const groq = apiKey ? new Groq({
  apiKey: apiKey,
}) : null;

interface JudgeInput {
  quest: WorkoutPlan;
  log: QuestLogInput;
  user_class: UserClass;
  user_rank: string;
}

export async function evaluateQuestLog(input: JudgeInput): Promise<JudgeVerdict> {
  // Fallback if no API key
  if (!groq) {
    console.warn("GROQ_API_KEY not found. Returning local evaluation.");
    return getLocalVerdict(input);
  }

  const userMessage = `
ASSIGNED QUEST:
${JSON.stringify(input.quest, null, 2)}

USER LOG:
${JSON.stringify(input.log, null, 2)}

USER PROFILE:
Class: ${input.user_class}
Rank: ${input.user_rank}

Evaluate now.
`;

  // Start Opik Trace
  const trace = opikClient.trace({
    name: "System_Judge_Evaluation",
    input: { system: JUDGE_PROMPT, user: userMessage },
  });

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: JUDGE_PROMPT },
        { role: "user", content: userMessage },
      ],
      temperature: 0.3, // Low temp for consistent judging
      max_tokens: 1000,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("No response from Judge");

    const parsed = JSON.parse(content);
    const validated = JudgeVerdictSchema.parse(parsed);

    // Log success
    await trace.update({
      output: validated,
      tags: ["judge", validated.status]
    });
    await trace.end();

    return validated;
  } catch (error: any) {
    console.error("Judge evaluation failed:", error);
    
    await trace.update({
      tags: ["judge_failure"]
    });
    await trace.end();

    return getLocalVerdict(input);
  }
}

// Fallback to local logic (xp-calculator.ts logic moved here or imported)
import { evaluateWorkout as localEvaluate } from "@/lib/gamification/xp-calculator";

function getLocalVerdict(input: JudgeInput): JudgeVerdict {
  // Reuse the local logic we wrote in Milestone 3
  const localResult = localEvaluate({
    plan: input.quest,
    log: input.log,
    userClass: input.user_class,
    streakCurrent: 0, // We don't have streak here easily, defaulting
  });

  // Map local result to JudgeVerdict schema
  return {
    status: localResult.status === "APPROVED" ? "APPROVED" : 
            localResult.status === "REJECTED" ? "REJECTED" : "FLAGGED",
    integrity_score: localResult.integrityScore,
    effort_score: localResult.effortScore,
    safety_score: localResult.safetyScore,
    final_xp: localResult.finalXp,
    system_message: localResult.message,
    proof_required: false,
    proof_provided: false,
    verification_status: "Auto_Approved",
    stat_updates: {
      strength_add: 0, // Local logic didn't return this in previous step
      agility_add: 0,
      stamina_add: 0
    }
  };
}

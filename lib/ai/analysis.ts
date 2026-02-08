import Groq from "groq-sdk";
import { type WorkoutPlan, type QuestLogInput, type UserClass } from "@/types/schemas";
import { LOG_ANALYSIS_PROMPT } from "./prompts";
import { getOpikClient } from "./opik";

const apiKey = process.env.GROQ_API_KEY;

const groq = apiKey ? new Groq({
  apiKey: apiKey,
}) : null;

interface LogAnalysisInput {
  quest: WorkoutPlan;
  log: QuestLogInput;
  integrity_score: number;
  effort_score: number;
  safety_score: number;
  xp_awarded: number;
  user_class: UserClass;
  user_rank: string;
}

interface LogAnalysisOutput {
  summary: string;
  integrity_explanation: string;
  effort_explanation: string;
  safety_explanation: string;
  suggestions: string[];
}

export async function generateLogAnalysis(input: LogAnalysisInput): Promise<LogAnalysisOutput> {
  if (!groq) {
    return getFallbackAnalysis(input);
  }

  const userMessage = `
ASSIGNED QUEST:
${JSON.stringify(input.quest, null, 2)}

USER LOG:
${JSON.stringify(input.log, null, 2)}

PERFORMANCE METRICS:
- Integrity Score: ${(input.integrity_score * 100).toFixed(0)}%
- Effort Score: ${(input.effort_score * 100).toFixed(0)}%
- Safety Score: ${(input.safety_score * 100).toFixed(0)}%
- XP Awarded: ${input.xp_awarded}

USER PROFILE:
- Class: ${input.user_class}
- Rank: ${input.user_rank}

  Provide a detailed analysis of this workout performance.
`;

  const client = await getOpikClient();
  const trace = client?.trace({
    name: "Log_Analysis_Generation",
    input: { logId: input.log.quest_id, user_rank: input.user_rank },
  });

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: LOG_ANALYSIS_PROMPT },
        { role: "user", content: userMessage },
      ],
      temperature: 0.5,
      max_tokens: 1500,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("No response from AI");

    const parsed = JSON.parse(content);

    if (trace) {
      trace.update({
        output: parsed,
        tags: ["analysis_success"],
      });
      trace.end();
    }

    return {
      summary: parsed.summary || "",
      integrity_explanation: parsed.integrity_explanation || "",
      effort_explanation: parsed.effort_explanation || "",
      safety_explanation: parsed.safety_explanation || "",
      suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
    };
  } catch (error: any) {
    console.error("Log analysis failed:", error);

    if (trace) {
      trace.update({
        tags: ["analysis_failure"],
      });
      trace.end();
    }

    return getFallbackAnalysis(input);
  }
}

function getFallbackAnalysis(input: LogAnalysisInput): LogAnalysisOutput {
  const integrity = (input.integrity_score * 100).toFixed(0);
  const effort = (input.effort_score * 100).toFixed(0);
  const safety = (input.safety_score * 100).toFixed(0);

  let summary = `You completed a ${input.quest.quest_rank} ${input.quest.quest_type} quest: "${input.quest.quest_name}".`;

  if (input.integrity_score >= 0.9) {
    summary += " Your performance was outstanding.";
  } else if (input.integrity_score >= 0.7) {
    summary += " Your performance was satisfactory.";
  } else {
    summary += " Your performance needs improvement.";
  }

  const integrityExplanation = `Your integrity score of ${integrity}% reflects consistency between your reported workout and expected duration. ${input.integrity_score >= 0.9 ? "Your workout timing aligned perfectly with quest requirements." : "Consider adjusting your pace to better match the target duration."}`;

  const effortExplanation = `Your effort score of ${effort}% indicates how hard you pushed relative to quest difficulty. ${input.effort_score >= 0.8 ? "Great effort shown throughout the workout." : "Try to push closer to your target RPE for maximum effectiveness."}`;

  const safetyExplanation = `Your safety score of ${safety}% assesses whether you trained appropriately given your condition. ${input.safety_score >= 0.8 ? "You trained safely within reasonable limits." : "Be more mindful of your physical state and adjust intensity accordingly."}`;

  const suggestions: string[] = [];

  if (input.integrity_score < 0.8) {
    suggestions.push("Focus on maintaining consistent timing throughout your workout sessions.");
  }
  if (input.effort_score < 0.8) {
    suggestions.push("Aim to push closer to your target RPE for better training stimulus.");
  }
  if (input.safety_score < 0.8) {
    suggestions.push("Listen to your body and adjust intensity based on fatigue and soreness.");
  }
  if (suggestions.length === 0) {
    suggestions.push("Keep up the excellent work! Your consistency will lead to continued progress.");
  }

  return {
    summary,
    integrity_explanation: integrityExplanation,
    effort_explanation: effortExplanation,
    safety_explanation: safetyExplanation,
    suggestions,
  };
}

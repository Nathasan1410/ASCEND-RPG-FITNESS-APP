import Groq from "groq-sdk";
import { type FeedbackAdjustment } from "@/types/schemas";
import { sendTraceToOpik } from "./opik-helper";

const apiKey = process.env.GROQ_API_KEY;

const groq = apiKey ? new Groq({
  apiKey: apiKey,
}) : null;

const FEEDBACK_ANALYZER_PROMPT = `You are a Human Feedback Analyzer. Analyze user's self-reported feedback and calculate score adjustments.

Input:
- Perceived Exertion (0-10): User's subjective difficulty rating
- Anomalies/Injuries: Free-text log of issues experienced
- RPE Actual (1-10): Reported effort level during workout

Adjustment Rules:
1. Effort Score Adjustment:
   - If perceived_exertion is 8-10 and RPE is also high (7-10): +0.1 to +0.3 adjustment
   - If perceived_exertion is 1-3 but RPE is high (7-10): -0.2 adjustment (possible dishonesty)
   - If perceived_exertion matches RPE within 2 points: +0.05 adjustment (honest reporting)

2. Safety Score Adjustment:
   - Pain/Discomfort: -0.1 to -0.3 based on severity
   - Dizziness/Nausea: -0.2 to -0.4 (serious safety concern)
   - Cardiovascular issues: -0.2 to -0.4 (serious safety concern)
   - Joint Issues: -0.1 to -0.2
   - Difficulty Mismatch: -0.05 to -0.15 (calibration issue, not safety)

3. Integrity Score Adjustment:
   - If anomalies indicate serious issues but RPE is extremely high: -0.1 to -0.3 (pushing through unsafe conditions)
   - If difficulty mismatch reported without completion issues: -0.05 to -0.1 (possible overreporting)

Return JSON:
{
  "integrity_adjustment": -0.5 to 0.5,
  "effort_adjustment": -0.5 to 0.5,
  "safety_adjustment": -0.5 to 0.5,
  "adjustment_reasoning": "Brief explanation of decisions"
}`;

interface FeedbackAnalyzerInput {
  aiScores: {
    integrity: number;
    effort: number;
    safety: number;
  };
  humanFeedback: {
    perceived_exertion: number;
    anomalies_injuries: string;
    rpe_actual: number;
  };
}

export async function analyzeHumanFeedback(
  input: FeedbackAnalyzerInput
): Promise<FeedbackAdjustment> {
  const analysisStartTime = Date.now();

  if (!groq) {
    throw new Error("GROQ_API_KEY not found");
  }

  const userMessage = `
AI SCORES (Initial):
- Integrity: ${input.aiScores.integrity}
- Effort: ${input.aiScores.effort}
- Safety: ${input.aiScores.safety}

HUMAN FEEDBACK:
- Perceived Exertion: ${input.humanFeedback.perceived_exertion}/10
- RPE Actual: ${input.humanFeedback.rpe_actual}/10
- Anomalies/Injuries: ${input.humanFeedback.anomalies_injuries || "None reported"}

Analyze this feedback and return adjustment values.
Only return JSON. No other text.
`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: FEEDBACK_ANALYZER_PROMPT },
        { role: "user", content: userMessage },
      ],
      temperature: 0.3,
      max_tokens: 1000,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("No response from Groq");

    const parsed = JSON.parse(content);
    const adjustment = parsed as any;

    const finalIntegrity = Math.max(0, Math.min(1, input.aiScores.integrity + adjustment.integrity_adjustment));
    const finalEffort = Math.max(0, Math.min(1, input.aiScores.effort + adjustment.effort_adjustment));
    const finalSafety = Math.max(0, Math.min(1, input.aiScores.safety + adjustment.safety_adjustment));

    const result: FeedbackAdjustment = {
      integrity_adjustment: adjustment.integrity_adjustment,
      effort_adjustment: adjustment.effort_adjustment,
      safety_adjustment: adjustment.safety_adjustment,
      final_integrity: finalIntegrity,
      final_effort: finalEffort,
      final_safety: finalSafety,
      adjustment_reasoning: adjustment.adjustment_reasoning,
    };

    console.log("[Feedback Analyzer] Human feedback analysis:", JSON.stringify(result, null, 2));

    await sendTraceToOpik("human_feedback_analysis", {
      startTime: analysisStartTime,
      input: {
        ai_integrity: input.aiScores.integrity,
        ai_effort: input.aiScores.effort,
        ai_safety: input.aiScores.safety,
        perceived_exertion: input.humanFeedback.perceived_exertion,
        rpe_actual: input.humanFeedback.rpe_actual,
        has_anomalies: !!input.humanFeedback.anomalies_injuries,
        anomalies_length: input.humanFeedback.anomalies_injuries?.length || 0,
      },
      output: {
        integrity_adjustment: result.integrity_adjustment,
        effort_adjustment: result.effort_adjustment,
        safety_adjustment: result.safety_adjustment,
        final_integrity: result.final_integrity,
        final_effort: result.final_effort,
        final_safety: result.final_safety,
        reasoning: result.adjustment_reasoning,
      },
      tags: [
        "human_feedback",
        "feedback_analysis",
        result.integrity_adjustment > 0 ? "integrity_boost" : result.integrity_adjustment < 0 ? "integrity_penalty" : "integrity_neutral",
        result.safety_adjustment < 0 ? "safety_concern" : "safety_ok",
      ],
    });

    return result;

  } catch (error: any) {
    console.error("[Feedback Analyzer] Analysis failed:", error);

    await sendTraceToOpik("feedback_analysis_error", {
      startTime: analysisStartTime,
      input: {
        error: error?.message,
        perceived_exertion: input.humanFeedback.perceived_exertion,
      },
      output: {
        status: "ERROR",
        message: "Human feedback analysis failed",
      },
      tags: ["error", "feedback_analysis_failed"],
    });

    return {
      integrity_adjustment: 0,
      effort_adjustment: 0,
      safety_adjustment: 0,
      final_integrity: input.aiScores.integrity,
      final_effort: input.aiScores.effort,
      final_safety: input.aiScores.safety,
      adjustment_reasoning: `Analysis failed: ${error?.message || "Unknown error"}`,
    };
  }
}

export function calculateAdjustedXP(
  baseXP: number,
  integrity: number,
  effort: number,
  safety: number
): number {
  const avgScore = (integrity + effort + safety) / 3;
  return Math.floor(baseXP * avgScore);
}

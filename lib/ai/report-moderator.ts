import Groq from "groq-sdk";
import { type ReportModeration } from "@/types/schemas";
import { sendTraceToOpik } from "./opik-helper";

const apiKey = process.env.GROQ_API_KEY;

const groq = apiKey ? new Groq({
  apiKey: apiKey,
}) : null;

const REPORT_MODERATOR_PROMPT = `You are an AI Report Moderator. Analyze reports submitted by users about other users' workout logs.

Analyze:
- Report reason and description
- Target user's workout log data (if available)
- Target user's historical patterns
- Reporter's reliability (if available)

Evaluation criteria:
1. Credibility: Does the report seem legitimate or malicious?
   - High credibility: Specific details, consistent evidence, reasonable claim
   - Low credibility: Vague, malicious, personal attack, no evidence

2. Severity: How serious is the alleged issue?
   - High severity: Impossible stats, fake media, clear cheating
   - Medium severity: Suspicious patterns, inconsistencies
   - Low severity: Minor issues, possible misunderstanding

3. Evidence: Is there supporting evidence?
   - Strong evidence: Proof media, documented inconsistencies
   - Weak evidence: No proof, subjective claims only

4. Pattern: Does this fit a pattern of behavior?
   - Repeated reports from multiple sources: Higher concern
   - Single report from new user: Lower concern

Actions:
- DISMISS: Low credibility, false claim, malicious report
- WARNING: Medium credibility, needs monitoring, not severe enough for penalty
- PENALTY: High credibility + high severity, apply immediate XP reduction
- ESCALATE: High severity but uncertain, requires human admin review

 Return JSON:
{
  "credibility_score": 0.0-1.0,
  "severity_score": 0.0-1.0,
  "action": "DISMISS" or "WARNING" or "PENALTY" or "ESCALATE",
  "confidence": 0.0-1.0,
  "reasoning": "Brief explanation of decision (1-2 sentences)",
  "recommended_penalty": {
    "xp_reduction": number (0-500) or null,
    "quest_status_change": null or "Failed",
    "hunter_status_change": null or "Flagged" or "Corrupted"
  }
}

CRITICAL: Always return a complete recommended_penalty object. If no penalty is needed, set xp_reduction to null, quest_status_change to null, and hunter_status_change to null. Never return recommended_penalty as null or undefined.`;

interface ReportModerationInput {
  reportId: string;
  reason: string;
  description: string;
  targetUserId: string;
  targetLogId?: string;
  logData?: any;
}

export async function moderateReport(
  input: ReportModerationInput
): Promise<ReportModeration> {
  const moderationStartTime = Date.now();

  if (!groq) {
    throw new Error("GROQ_API_KEY not found");
  }

  const userMessage = `
REPORT DETAILS:
- Reason: ${input.reason}
- Description: ${input.description || "No description provided"}
- Target Log ID: ${input.targetLogId || "N/A"}
- Target User ID: ${input.targetUserId}

TARGET LOG DATA:
${input.logData ? JSON.stringify(input.logData, null, 2) : "No log data available"}

Analyze this report and return your moderation decision.
Only return JSON. No other text.
`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: REPORT_MODERATOR_PROMPT },
        { role: "user", content: userMessage },
      ],
      temperature: 0.3,
      max_tokens: 1000,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("No response from Groq");

    const result = JSON.parse(content) as ReportModeration;

    console.log("[Report Moderator] AI moderation result:", JSON.stringify(result, null, 2));

    await sendTraceToOpik("report_moderation_analysis", {
      startTime: moderationStartTime,
      input: {
        report_id: input.reportId,
        reason: input.reason,
        target_user_id: input.targetUserId,
        target_log_id: input.targetLogId,
        has_log_data: !!input.logData,
      },
      output: {
        credibility_score: result.credibility_score,
        severity_score: result.severity_score,
        action: result.action,
        confidence: result.confidence,
        reasoning: result.reasoning,
        xp_reduction: result.recommended_penalty.xp_reduction,
        status_change: result.recommended_penalty.quest_status_change,
        hunter_status_change: result.recommended_penalty.hunter_status_change,
      },
      tags: [
        "report_moderation",
        result.action,
        result.confidence > 0.8 ? "high_confidence" : "low_confidence",
        input.reason,
      ],
    });

    return result;

  } catch (error: any) {
    console.error("[Report Moderator] Failed:", error);

    await sendTraceToOpik("report_moderation_error", {
      startTime: moderationStartTime,
      input: {
        report_id: input.reportId,
        reason: input.reason,
        error: error?.message,
      },
      output: {
        status: "ERROR",
        message: "AI moderation failed",
      },
      tags: ["error", "report_moderation_failed"],
    });

    return {
      credibility_score: 0.5,
      severity_score: 0.5,
      action: "WARNING",
      confidence: 0.3,
      reasoning: "AI moderation failed. Manual review recommended.",
      recommended_penalty: {
        xp_reduction: null,
        quest_status_change: null,
        hunter_status_change: null,
      },
    };
  }
}

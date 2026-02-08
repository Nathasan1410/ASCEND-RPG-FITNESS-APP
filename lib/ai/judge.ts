import Groq from "groq-sdk";
import { JudgeVerdictSchema, type JudgeVerdict, type WorkoutPlan, type QuestLogInput, type UserClass } from "@/types/schemas";
import { JUDGE_PROMPT } from "./prompts";
import { analyzeProof, calculateFormScoreFromCV, detectSafetyIssues, getCVConfidenceMessage } from "./computer-vision";
import { sendTraceToOpik } from "./opik-helper";

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
  const evaluationStartTime = Date.now();

  // Fallback if no API key
  if (!groq) {
    console.warn("GROQ_API_KEY not found. Returning local evaluation.");
    const verdict = getLocalVerdict(input, null);
    
    // Send trace to Opik for fallback evaluation
    await sendTraceToOpik("judge_evaluation_no_api_key", {
      startTime: evaluationStartTime,
      input: {
        quest_id: input.quest.quest_name,
        user_class: input.user_class,
        user_rank: input.user_rank,
        has_proof: !!input.log.proof_media_url,
        duration_actual: input.log.duration_actual,
        rpe_actual: input.log.rpe_actual,
      },
      output: {
        status: verdict.status,
        integrity_score: verdict.integrity_score,
        effort_score: verdict.effort_score,
        safety_score: verdict.safety_score,
        overall_score: (verdict.integrity_score + verdict.effort_score + verdict.safety_score) / 3,
        xp_awarded: verdict.final_xp,
        evaluation_time_ms: Date.now() - evaluationStartTime,
      },
      tags: ["fallback", "no_api_key", verdict.status],
    });

    return verdict;
  }

  let cvAnalysis = null;
  
  // Perform CV analysis if proof media is provided (Phase 2 fix: Skip CV when no proof)
  if (input.log.proof_media_url && input.log.proof_type && typeof input.log.proof_media_url === 'string' && input.log.proof_media_url.length > 0) {
    console.log(`[Judge] Analyzing ${input.log.proof_type} proof:`, input.log.proof_media_url);
    
    try {
      cvAnalysis = await analyzeProof(
        input.log.proof_media_url,
        input.log.proof_type as "photo" | "video"
      );

      console.log("[Judge] CV analysis complete:", cvAnalysis);

      // Calculate form score from CV
      const formScore = calculateFormScoreFromCV(cvAnalysis);
      const safetyIssues = detectSafetyIssues(cvAnalysis);
      const confidenceMsg = getCVConfidenceMessage(cvAnalysis.confidence);

      console.log("[Judge] Form Score:", formScore, "Safety Issues:", safetyIssues);
    } catch (cvError: any) {
      console.error("[Judge] CV analysis failed:", cvError);
      console.log("[Judge] Proceeding without CV analysis due to:", cvError.message);
      cvAnalysis = null;
    }
  } else {
    console.log("[Judge] No proof provided, skipping CV analysis (Phase 2 fix)");
  }

  const userMessage = `
ASSIGNED QUEST:
${JSON.stringify(input.quest, null, 2)}

USER LOG:
${JSON.stringify(input.log, null, 2)}

USER PROFILE:
Class: ${input.user_class}
Rank: ${input.user_rank}

${cvAnalysis ? `
COMPUTER VISION ANALYSIS:
${JSON.stringify(cvAnalysis, null, 2)}
` : ''}

Evaluate now.
`;

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

    // Add CV data to the output if available
    if (cvAnalysis) {
      validated.cv_analysis = {
        form_score: cvAnalysis.formScore,
        technique_score: cvAnalysis.techniqueScore,
        range_of_motion: cvAnalysis.rangeOfMotion,
        safety_issues: detectSafetyIssues(cvAnalysis),
        confidence: cvAnalysis.confidence,
        confidence_message: getCVConfidenceMessage(cvAnalysis.confidence),
      };
    }

    const evaluationTime = Date.now() - evaluationStartTime;

    // Send trace to Opik using helper function
    await sendTraceToOpik("judge_evaluation_success", {
      startTime: evaluationStartTime,
      input: {
        quest_id: input.quest.quest_name,
        user_class: input.user_class,
        user_rank: input.user_rank,
        has_proof: !!input.log.proof_media_url,
        proof_type: input.log.proof_type,
        has_cv_analysis: !!cvAnalysis,
        duration_actual: input.log.duration_actual,
        rpe_actual: input.log.rpe_actual,
      },
      output: {
        status: validated.status,
        integrity_score: validated.integrity_score,
        effort_score: validated.effort_score,
        safety_score: validated.safety_score,
        overall_score: (validated.integrity_score + validated.effort_score + validated.safety_score) / 3,
        xp_awarded: validated.final_xp,
        cv_enabled: !!cvAnalysis,
        cv_form_score: cvAnalysis?.formScore,
        cv_safety_issues: cvAnalysis ? detectSafetyIssues(cvAnalysis).length : 0,
        evaluation_time_ms: evaluationTime,
      },
      tags: ["success", "judge", validated.status, cvAnalysis ? "cv_enabled" : "no_cv"],
    });

    return validated;
  } catch (error: any) {
    console.error("Judge evaluation failed:", error);

    const verdict = getLocalVerdict(input, cvAnalysis);

    // Send failure trace to Opik using helper function
    await sendTraceToOpik("judge_evaluation_failure", {
      startTime: evaluationStartTime,
      input: {
        quest_id: input.quest.quest_name,
        user_class: input.user_class,
        user_rank: input.user_rank,
        has_proof: !!input.log.proof_media_url,
        proof_type: input.log.proof_type,
        error: error?.message || "Unknown error",
      },
      output: {
        status: verdict.status,
        integrity_score: verdict.integrity_score,
        effort_score: verdict.effort_score,
        safety_score: verdict.safety_score,
        overall_score: (verdict.integrity_score + verdict.effort_score + verdict.safety_score) / 3,
        xp_awarded: verdict.final_xp,
        error_type: error?.name || "UnknownError",
        error_message: error?.message || "Unknown error",
        evaluation_time_ms: Date.now() - evaluationStartTime,
      },
      tags: ["failure", "judge", verdict.status],
    });

    return verdict;
  }
}

// Fallback to local logic (xp-calculator.ts logic moved here or imported)
import { evaluateWorkout as localEvaluate } from "@/lib/gamification/xp-calculator";

function getLocalVerdict(input: JudgeInput, cvAnalysis: any): JudgeVerdict {
  // Reuse local logic we wrote in Milestone 3
  const localResult = localEvaluate({
    plan: input.quest,
    log: input.log,
    userClass: input.user_class,
    streakCurrent: 0, // We don't have streak here easily, defaulting
  });

  console.log("[Judge] Local evaluation result:", JSON.stringify(localResult, null, 2));

  // Build verdict with all required fields
  const verdict: any = {
    status: localResult.status === "APPROVED" ? "APPROVED" : 
            localResult.status === "REJECTED" ? "REJECTED" : "FLAGGED",
    integrity_score: localResult.integrityScore,
    effort_score: localResult.effortScore,
    safety_score: localResult.safetyScore,
    final_xp: localResult.finalXp || 0, // Default to 0 if undefined
    system_message: localResult.message || "Evaluation completed",
    proof_required: false,
    proof_provided: false,
    verification_status: "Auto_Approved",
    stat_updates: {
      strength_add: 0, // Local logic didn't return this in previous step
      agility_add: 0,
      stamina_add: 0
    }
  };

  // Add CV analysis if available
  if (cvAnalysis) {
    verdict.cv_analysis = {
      form_score: cvAnalysis.formScore,
      technique_score: cvAnalysis.techniqueScore,
      range_of_motion: cvAnalysis.rangeOfMotion,
      safety_issues: detectSafetyIssues(cvAnalysis),
      confidence: cvAnalysis.confidence,
      confidence_message: getCVConfidenceMessage(cvAnalysis.confidence),
    };
  }

  // Validate verdict against schema before returning
  try {
    const validated = JudgeVerdictSchema.parse(verdict);
    console.log("[Judge] Local verdict validated successfully");
    return validated;
  } catch (error) {
    console.error("[Judge] Local verdict validation failed:", error);
    console.error("[Judge] Verdict data:", JSON.stringify(verdict, null, 2));
    throw error;
  }
}

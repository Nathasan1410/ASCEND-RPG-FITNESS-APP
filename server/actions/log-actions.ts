"use server";

import { createClient } from "@/lib/supabase/server";
import { ExperimentRunner } from "@/lib/ab-testing/experiment-runner";
import { QuestLogInputSchema, type WorkoutPlan } from "@/types/schemas";
import { levelFromXp, rankFromLevel } from "@/lib/gamification/leveling";
import { revalidatePath } from "next/cache";
import { sendTraceToOpik, logErrorToOpik } from "@/lib/ai/opik-helper";
import { analyzeHumanFeedback, calculateAdjustedXP } from "@/lib/ai/feedback-analyzer";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    if (error.message.includes("violates foreign key")) {
      return "Referenced data not found. Please refresh and try again.";
    }
    if (error.message.includes("violates check constraint")) {
      return "Invalid data provided. Please check your inputs.";
    }
    if (error.message.includes("permission denied")) {
      return "Access denied. Please log in again.";
    }
    if (error.message.includes("Database error")) {
      return error.message.replace("Database error: ", "");
    }
    return error.message;
  }
  return "An unexpected error occurred. Please try again.";
}

export async function abortQuest(questId: string, baseXp: number) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  
  // Get quest
  const { data: questData } = await supabase
    .from("quests")
    .select("plan_json, user_id, xp_potential")
    .eq("id", questId)
    .single();
 
  const quest = questData as any;
  
  if (!quest) throw new Error("Quest not found");
  
  // Ensure user owns quest
  if (quest.user_id !== user.id) throw new Error("Unauthorized");
  
  // Award partial XP (20% of base)
  const partialXp = Math.floor(baseXp * 0.2);
  
  // Get profile
  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();
  
  const profile = profileData as any;
  
  if (!profile) throw new Error("Profile not found");
  
  // Update quest status
  await (supabase.from("quests") as any)
    .update({ status: "Failed" })
    .eq("id", questId);
  
  // Update profile with partial XP
  const newTotalXp = (profile.total_xp || 0) + partialXp;
  const newCurrentXp = (profile.current_xp || 0) + partialXp;
  const newLevel = levelFromXp(newTotalXp);
  const newRank = rankFromLevel(newLevel);
  
  await (supabase.from("profiles") as any)
    .update({
      total_xp: newTotalXp,
      current_xp: newCurrentXp,
      level: newLevel,
      rank_tier: newRank,
      last_activity_at: new Date().toISOString(),
    })
    .eq("id", user.id);
  
  revalidatePath("/dashboard");
  
  const leveledUp = newLevel > (profile.level || 1);
  const rankedUp = newRank !== (profile.rank_tier || "E-Rank");
  
  return {
    xp_awarded: partialXp,
    new_level: newLevel,
    new_rank: newRank,
    leveled_up: leveledUp,
    ranked_up: rankedUp,
  };
}

export async function submitQuestLog(input: unknown) {
  const operationStartTime = Date.now();
  let validated: any = null;
  let supabase: any = null;
  let user: any = null;
  let quest: any = null;
  let profile: any = null;
  let evaluation: any = null;

  try {
    // STEP 1: Validate Input
    console.log("[QuestLog] Step 1: Validating input");
    validated = QuestLogInputSchema.parse(input);
    console.log("[QuestLog] Input validated successfully");
  } catch (error: any) {
    console.error("[QuestLog] Validation failed:", error);
    await logErrorToOpik("quest_log_validation_failed", error, {
      input_data: input,
      error_type: "validation_error",
    });
    throw new Error(`Invalid input: ${error.message}`);
  }

  try {
    // STEP 2: Get Auth User
    console.log("[QuestLog] Step 2: Getting auth user");
    supabase = await createClient();
    const { data: { user: userData } } = await supabase.auth.getUser();
    if (!userData) throw new Error("Not authenticated");
    user = userData;
    console.log("[QuestLog] Auth user found:", user.id);
  } catch (error: any) {
    console.error("[QuestLog] Auth failed:", error);
    await logErrorToOpik("quest_log_auth_failed", error, {
      step: "get_auth_user",
      operation_start: operationStartTime,
    });
    throw new Error("Authentication failed: " + error.message);
  }

  try {
    // STEP 3: Get Quest
    console.log("[QuestLog] Step 3: Getting quest:", validated.quest_id);
    const { data: questData } = await supabase
      .from("quests")
      .select("*")
      .eq("id", validated.quest_id)
      .single();
    
    if (!questData) {
      throw new Error("Quest not found");
    }
    
    quest = questData as any;
    console.log("[QuestLog] Quest found:", quest.id, quest.quest_name);
  } catch (error: any) {
    console.error("[QuestLog] Quest fetch failed:", error);
    await logErrorToOpik("quest_log_fetch_failed", error, {
      quest_id: validated.quest_id,
      user_id: user?.id,
      step: "fetch_quest",
    });
    throw new Error("Failed to fetch quest: " + error.message);
  }

  try {
    // STEP 4: Get Profile
    console.log("[QuestLog] Step 4: Getting profile for user:", user.id);
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    
    if (!profileData) {
      throw new Error("Profile not found");
    }
    
    profile = profileData as any;
    console.log("[QuestLog] Profile found:", profile.id, profile.username);
  } catch (error: any) {
    console.error("[QuestLog] Profile fetch failed:", error);
    await logErrorToOpik("quest_log_profile_fetch_failed", error, {
      user_id: user?.id,
      step: "fetch_profile",
    });
    throw new Error("Failed to fetch profile: " + error.message);
  }

  try {
    // STEP 5: Evaluate Workout (AI Judge with A/B Testing)
    console.log("[QuestLog] Step 5: Evaluating workout");
    const plan = quest.plan_json as WorkoutPlan;
    const variantId = (plan as any)._variantId;
    const experimentId = (plan as any)._experimentId;
    const planGenerationTime = (plan as any)._generationTime;
    
    console.log("[QuestLog] Quest evaluation input:", {
      quest_id: validated.quest_id,
      user_id: user.id,
      duration_actual: validated.duration_actual,
      has_proof: !!validated.proof_media_url,
      variant_id: variantId,
      experiment_id: experimentId,
    });
    
    const evaluationStartTime = Date.now();
    evaluation = await ExperimentRunner.runQuestEvaluation(
      user.id,
      {
        quest: plan,
        log: validated,
        user_class: profile.class || "Novice",
        user_rank: profile.rank_tier || "E-Rank",
      },
      experimentId,
      variantId,
      planGenerationTime
    );
    
    const evaluationTime = Date.now() - evaluationStartTime;
    
    console.log("[QuestLog] Evaluation result:", {
      status: evaluation.status,
      xp: evaluation.final_xp,
      integrity: evaluation.integrity_score,
      time_ms: evaluationTime,
    });

    // STEP 5.5: Analyze Human Feedback (if provided)
    if (validated.perceived_exertion !== undefined || validated.anomalies_injuries) {
      console.log("[QuestLog] Human feedback detected, analyzing...");
      try {
        const humanFeedbackAnalysis = await analyzeHumanFeedback({
          aiScores: {
            integrity: evaluation.integrity_score,
            effort: evaluation.effort_score,
            safety: evaluation.safety_score,
          },
          humanFeedback: {
            perceived_exertion: validated.perceived_exertion || 5,
            anomalies_injuries: validated.anomalies_injuries || "",
            rpe_actual: validated.rpe_actual,
          },
        });

        evaluation.integrity_score = humanFeedbackAnalysis.final_integrity;
        evaluation.effort_score = humanFeedbackAnalysis.final_effort;
        evaluation.safety_score = humanFeedbackAnalysis.final_safety;
        evaluation.final_xp = calculateAdjustedXP(
          plan.base_xp,
          evaluation.integrity_score,
          evaluation.effort_score,
          evaluation.safety_score
        );

        console.log("[QuestLog] Human feedback adjustments applied:", {
          integrity_adjustment: humanFeedbackAnalysis.integrity_adjustment,
          effort_adjustment: humanFeedbackAnalysis.effort_adjustment,
          safety_adjustment: humanFeedbackAnalysis.safety_adjustment,
          final_xp: evaluation.final_xp,
        });
      } catch (feedbackError: any) {
        console.error("[QuestLog] Human feedback analysis failed:", feedbackError);
        await logErrorToOpik("human_feedback_analysis_failed", feedbackError, {
          quest_id: validated.quest_id,
          user_id: user.id,
          perceived_exertion: validated.perceived_exertion,
        });
      }
    }

    // Track human feedback impact
    let humanFeedbackData: any = null;
    if (validated.perceived_exertion !== undefined || validated.anomalies_injuries !== undefined) {
      humanFeedbackData = {
        perceived_exertion: validated.perceived_exertion,
        anomalies_injuries: validated.anomalies_injuries,
        had_human_feedback: true,
      };
    }

    
    // Send trace to Opik
    await sendTraceToOpik("quest_evaluation_complete", {
      startTime: evaluationStartTime,
      input: {
        quest_id: validated.quest_id,
        quest_name: plan.quest_name,
        user_id: user.id,
        user_rank: profile.rank_tier,
        user_class: profile.class,
        has_proof: !!validated.proof_media_url,
        proof_type: validated.proof_type,
        duration_actual: validated.duration_actual,
        rpe_actual: validated.rpe_actual,
        variant_id: variantId,
        experiment_id: experimentId,
        human_feedback: humanFeedbackData,
      },
      output: {
        status: evaluation.status,
        integrity_score: evaluation.integrity_score,
        effort_score: evaluation.effort_score,
        safety_score: evaluation.safety_score,
        overall_score: (evaluation.integrity_score + evaluation.effort_score + evaluation.safety_score) / 3,
        final_xp: evaluation.final_xp,
        xp_multiplier: evaluation.final_xp / plan.base_xp,
        verification_status: evaluation.verification_status,
        evaluation_time_ms: evaluationTime,
        ai_integrity_score: evaluation.integrity_score || 0,
        ai_effort_score: evaluation.effort_score || 0,
        ai_safety_score: evaluation.safety_score || 0,
        ai_final_xp: evaluation.final_xp || 0,
        ai_feedback: evaluation.message || "",
        had_human_feedback: !!humanFeedbackData,
        human_impact_applied: !!humanFeedbackData,
      },
      tags: [
        "success",
        evaluation.status,
        profile.rank_tier,
        profile.class,
        plan.quest_type,
        variantId ? `variant_${variantId}` : undefined,
        experimentId ? `ab_test` : undefined,
        humanFeedbackData ? "human_feedback_submitted" : undefined,
      ].filter(Boolean),
    });
  } catch (error: any) {
    console.error("[QuestLog] Evaluation failed:", error);
    await logErrorToOpik("quest_log_evaluation_failed", error, {
      quest_id: validated.quest_id,
      user_id: user.id,
      profile_data: profile,
      validation_input: validated,
      step: "evaluate_workout",
      operation_time_ms: Date.now() - operationStartTime,
    });
    throw new Error("Workout evaluation failed: " + error.message);
  }

  try {
    // STEP 6: Insert Log
    console.log("[QuestLog] Step 6: Inserting log into database");
    
    // Handle null proof_media_url properly
    const logPayload: any = {
      quest_id: validated.quest_id,
      user_id: user.id,
      duration_actual: validated.duration_actual,
      user_feedback: validated.user_feedback || "",
      rpe_actual: validated.rpe_actual,
      exercises_completed: validated.exercises_completed,
      xp_awarded: evaluation.final_xp,
      safety_score: evaluation.safety_score,
      integrity_score: evaluation.integrity_score,
      verification_status: evaluation.verification_status,
      is_public: validated.is_public,
    };

    // Add human feedback fields if provided
    if (validated.perceived_exertion !== undefined) {
      logPayload.perceived_exertion = validated.perceived_exertion;
    }
    if (validated.anomalies_injuries !== undefined) {
      logPayload.anomalies_injuries = validated.anomalies_injuries;
    }
    if (validated.perceived_exertion !== undefined || validated.anomalies_injuries !== undefined) {
      logPayload.feedback_impact_calculated = true;
      logPayload.human_integrity_score = evaluation.integrity_score;
      logPayload.human_effort_score = evaluation.effort_score;
      logPayload.human_safety_score = evaluation.safety_score;
    }

    // Only add proof fields if they're valid
    if (validated.proof_media_url && typeof validated.proof_media_url === 'string') {
      logPayload.proof_media_url = validated.proof_media_url;
      logPayload.proof_type = validated.proof_type || "None";
    } else {
      logPayload.proof_media_url = null;
      logPayload.proof_type = "None";
    }
    
    console.log("[QuestLog] Log payload:", JSON.stringify(logPayload, null, 2));
    
    const { data: logData, error: logError } = await supabase
      .from("logs")
      .insert(logPayload as any)
      .select()
      .single();
    
    if (logError) {
      console.error("[QuestLog] Log insert failed:", logError);
      await logErrorToOpik("quest_log_insert_failed", new Error(logError.message), {
        payload: logPayload,
        error_details: logError,
        quest_id: validated.quest_id,
        user_id: user.id,
      });
      throw new Error(`Failed to save workout log: ${getErrorMessage(logError)}`);
    }
    
    if (!logData) {
      console.error("[QuestLog] Log insert returned no data");
      await logErrorToOpik("quest_log_insert_no_data", new Error("No data returned"), {
        payload: logPayload,
        quest_id: validated.quest_id,
        user_id: user.id,
      });
      throw new Error("Failed to save workout log - no data returned");
    }
    
    console.log("[QuestLog] Log inserted successfully:", logData.id);
  } catch (error: any) {
    console.error("[QuestLog] Log insertion error:", error);
    await logErrorToOpik("quest_log_insert_error", error, {
      quest_id: validated.quest_id,
      user_id: user.id,
      step: "insert_log",
      operation_time_ms: Date.now() - operationStartTime,
    });
    throw new Error("Failed to save workout log: " + error.message);
  }

  try {
    // STEP 7: Update Quest Status
    console.log("[QuestLog] Step 7: Updating quest status");
    
    await (supabase.from("quests") as any)
      .update({ status: evaluation.status === "REJECTED" ? "Failed" : "Completed" })
      .eq("id", validated.quest_id);
    
    console.log("[QuestLog] Quest status updated to:", evaluation.status);
  } catch (error: any) {
    console.error("[QuestLog] Quest status update failed:", error);
    await logErrorToOpik("quest_log_status_update_failed", error, {
      quest_id: validated.quest_id,
      step: "update_quest_status",
    });
    throw new Error("Failed to update quest: " + error.message);
  }

  try {
    // STEP 8: Update Profile
    console.log("[QuestLog] Step 8: Updating profile");
    
    const newTotalXp = (profile.total_xp || 0) + evaluation.final_xp;
    const newCurrentXp = (profile.current_xp || 0) + evaluation.final_xp;
    const newLevel = levelFromXp(newTotalXp);
    
    let newRank = profile.rank_tier;
    const questType = (quest.plan_json as any).quest_type;

    if (questType === "RankUp" && evaluation.status === "APPROVED") {
      // If they passed the exam, calculate the true rank based on level
      newRank = rankFromLevel(newLevel);
    } else {
      // Standard leveling: Cap rank at current tier if they hit a threshold
      // Actually, simply DON'T update rank unless it's a RankUp quest (or they are still within their tier's level range)
      // But we need to handle the initial E->E case.
      // Simplified: Only change rank if RankUp quest passed.
      // Edge case: If they drop levels? (Unlikely)
    }
    
    const newStreak = evaluation.status !== "REJECTED" ? (profile.streak_current || 0) + 1 : 0;
    
    const profileUpdateData: any = {
      total_xp: newTotalXp,
      current_xp: newCurrentXp,
      level: newLevel,
      rank_tier: newRank,
      streak_current: newStreak,
      streak_best: Math.max(newStreak, profile.streak_best || 0),
      stats_strength: (profile.stats_strength || 10) + (evaluation.stat_updates?.strength_add || 0),
      stats_agility: (profile.stats_agility || 10) + (evaluation.stat_updates?.agility_add || 0),
      stats_stamina: (profile.stats_stamina || 10) + (evaluation.stat_updates?.stamina_add || 0),
      last_activity_at: new Date().toISOString(),
    };
    
    await (supabase.from("profiles") as any)
      .update(profileUpdateData)
      .eq("id", user.id);
    
    console.log("[QuestLog] Profile updated successfully");
    
    revalidatePath("/dashboard");
    
    const leveledUp = newLevel > (profile.level || 1);
    const rankedUp = newRank !== (profile.rank_tier || "E-Rank");
    
    // Log success trace
    await sendTraceToOpik("quest_log_complete", {
      startTime: operationStartTime,
      input: {
        quest_id: validated.quest_id,
        user_id: user.id,
        has_proof: !!validated.proof_media_url,
      },
      output: {
        xp_awarded: evaluation.final_xp,
        new_level: newLevel,
        new_rank: newRank,
        leveled_up: leveledUp,
        ranked_up: rankedUp,
        total_operation_time_ms: Date.now() - operationStartTime,
      },
      tags: ["success", "quest_completion", leveledUp ? "level_up" : "", rankedUp ? "rank_up" : ""].filter(Boolean),
    });
    
    return {
      status: evaluation.status,
      xp_awarded: evaluation.final_xp,
      message: evaluation.system_message,
      new_level: newLevel,
      new_rank: newRank,
      leveled_up: leveledUp,
      ranked_up: rankedUp,
    };
  } catch (error: any) {
    console.error("[QuestLog] Profile update failed:", error);
    await logErrorToOpik("quest_log_profile_update_failed", error, {
      user_id: user.id,
      step: "update_profile",
      operation_time_ms: Date.now() - operationStartTime,
    });
    throw new Error("Failed to update profile: " + error.message);
  }
}

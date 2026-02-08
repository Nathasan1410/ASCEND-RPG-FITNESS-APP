"use server";

import { createClient } from "@/lib/supabase/server";
import { QuestLogInputSchema, type WorkoutPlan } from "@/types/schemas";
import { evaluateQuestLog } from "@/lib/ai/judge";
import { levelFromXp, rankFromLevel } from "@/lib/gamification/leveling";
import { revalidatePath } from "next/cache";
import { getOpikClient } from "@/lib/ai/opik";

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

  // Ensure user owns the quest
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
  const validated = QuestLogInputSchema.parse(input);
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Get quest
  const { data: questData } = await supabase
    .from("quests")
    .select("*")
    .eq("id", validated.quest_id)
    .single();

  const quest = questData as any;

  if (!quest) throw new Error("Quest not found");

  // Get profile
  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const profile = profileData as any;

  if (!profile) throw new Error("Profile not found");

  // Evaluate workout (AI Judge)
  console.log("Evaluating quest log:", {
    quest_id: validated.quest_id,
    user_id: user.id,
    duration_actual: validated.duration_actual,
    has_proof: !!validated.proof_media_url,
  });

  const evaluationStartTime = Date.now();
  const evaluation = await evaluateQuestLog({
    quest: quest.plan_json as WorkoutPlan,
    log: validated,
    user_class: profile.class || "Novice",
    user_rank: profile.rank_tier || "E-Rank",
  });
  const evaluationTime = Date.now() - evaluationStartTime;

  // Opik: Track evaluation metrics
  try {
    const opikClient = await getOpikClient();
    const trace = opikClient.trace({
      name: "quest_evaluation_complete",
      input: {
        quest_id: validated.quest_id,
        user_rank: profile.rank_tier,
        user_class: profile.class,
        has_proof: !!validated.proof_media_url,
        duration_actual: validated.duration_actual,
        rpe_actual: validated.rpe_actual,
      },
    });

    await trace.update({
      output: {
        status: evaluation.status,
        integrity_score: evaluation.integrity_score,
        effort_score: evaluation.effort_score,
        safety_score: evaluation.safety_score,
        overall_score: (evaluation.integrity_score + evaluation.effort_score + evaluation.safety_score) / 3,
        xp_awarded: evaluation.final_xp,
        xp_multiplier: evaluation.final_xp / (quest.plan_json as any).base_xp,
        verification_status: evaluation.verification_status,
        evaluation_time_ms: evaluationTime,
        graded_at: new Date().toISOString(),
      },
      tags: [
        evaluation.status,
        profile.rank_tier,
        profile.class,
        (quest.plan_json as any).quest_type,
      ],
    });

    await trace.end();
  } catch (traceError) {
    console.warn("Failed to trace evaluation:", traceError);
  }

  console.log("Evaluation result:", {
    status: evaluation.status,
    xp: evaluation.final_xp,
    integrity: evaluation.integrity_score,
  });

  // Insert log
  try {
    const { data: logData, error: logError } = await (supabase
      .from("logs")
      .insert({
        quest_id: validated.quest_id,
        user_id: user.id,
        duration_actual: validated.duration_actual,
        user_feedback: validated.user_feedback,
        rpe_actual: validated.rpe_actual,
        exercises_completed: validated.exercises_completed,
        xp_awarded: evaluation.final_xp,
        safety_score: evaluation.safety_score,
        integrity_score: evaluation.integrity_score,
        verification_status: evaluation.verification_status,
        proof_media_url: validated.proof_media_url,
        proof_type: validated.proof_type,
        is_public: validated.is_public,
      } as any)
      .select()
      .single());

    if (logError) {
      console.error("Failed to insert log:", logError);
      throw new Error(getErrorMessage(logError));
    }
  } catch (error) {
    console.error("Error inserting log:", error);
    throw new Error(getErrorMessage(error));
  }

  // Update quest status
  await (supabase.from("quests") as any)
    .update({ status: evaluation.status === "REJECTED" ? "Failed" : "Completed" })
    .eq("id", validated.quest_id);

  // Update profile
  const newTotalXp = (profile.total_xp || 0) + evaluation.final_xp;
  const newCurrentXp = (profile.current_xp || 0) + evaluation.final_xp;
  const newLevel = levelFromXp(newTotalXp);

  // Rank Up Logic (Gatekeeper)
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

  await (supabase.from("profiles") as any)
    .update({
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
    })
    .eq("id", user.id);

  revalidatePath("/dashboard");

  const leveledUp = newLevel > (profile.level || 1);
  const rankedUp = newRank !== (profile.rank_tier || "E-Rank");

  return {
    status: evaluation.status,
    xp_awarded: evaluation.final_xp,
    message: evaluation.system_message,
    new_level: newLevel,
    new_rank: newRank,
    leveled_up: leveledUp,
    ranked_up: rankedUp,
  };
}

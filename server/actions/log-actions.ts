"use server";

import { createClient } from "@/lib/supabase/server";
import { QuestLogInputSchema, type WorkoutPlan } from "@/types/schemas";
import { evaluateQuestLog } from "@/lib/ai/judge";
import { levelFromXp, rankFromLevel } from "@/lib/gamification/leveling";
import { revalidatePath } from "next/cache";

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
  const evaluation = await evaluateQuestLog({
    quest: quest.plan_json as WorkoutPlan,
    log: validated,
    user_class: profile.class || "Novice",
    user_rank: profile.rank_tier || "E-Rank",
  });

  // Insert log
  const { error: logError } = await supabase.from("logs").insert({
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
  } as any);

  if (logError) throw logError;

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

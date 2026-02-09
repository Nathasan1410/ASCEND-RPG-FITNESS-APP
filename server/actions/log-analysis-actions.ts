"use server";

import { createClient } from "@/lib/supabase/server";
import { generateLogAnalysis } from "@/lib/ai/analysis";

export async function getLogAnalysis(logId: string) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: logData } = await supabase
    .from("logs")
    .select(`
      *,
      quests (
        plan_json,
        rank_difficulty
      )
    `)
    .eq("id", logId)
    .single();

  const log = logData as any;

  if (!log) throw new Error("Log not found");

  const quest = log.quests?.plan_json as any;
  const questData = log.quests as any;

  if (!quest) {
    return {
      log_id: log.id,
      quest_name: "Unknown Protocol",
      quest_rank: questData?.rank_difficulty || "E-Rank",
      quest_type: "Unknown",
      completed_at: log.completed_at,
      xp_awarded: log.xp_awarded,
      integrity_score: log.integrity_score,
      effort_score: log.effort_score,
      safety_score: log.safety_score,
      duration_actual: log.duration_actual,
      analysis: "Quest data is not available for this log entry. This may happen if the quest was deleted or archived.",
      error: "Quest not found",
    };
  }

  const { data: profileData } = await supabase
    .from("profiles")
    .select("class, rank_tier")
    .eq("id", log.user_id)
    .single();

  const profile = profileData as any;

  if (!profile) throw new Error("Profile not found");

  const analysis = await generateLogAnalysis({
    quest,
    log: {
      quest_id: log.quest_id,
      duration_actual: log.duration_actual,
      rpe_actual: log.rpe_actual,
      user_feedback: log.user_feedback,
      exercises_completed: log.exercises_completed || [],
      proof_type: log.proof_type || "None",
      is_public: log.is_public ?? true,
    },
    integrity_score: log.integrity_score || 0,
    effort_score: log.effort_score || 0,
    safety_score: log.safety_score || 0,
    xp_awarded: log.xp_awarded || 0,
    user_class: profile.class || "Novice",
    user_rank: profile.rank_tier || "E-Rank",
  });

  return {
    log_id: log.id,
    quest_name: quest.quest_name,
    quest_rank: quest.quest_rank,
    quest_type: quest.quest_type,
    completed_at: log.completed_at,
    xp_awarded: log.xp_awarded,
    integrity_score: log.integrity_score,
    effort_score: log.effort_score,
    safety_score: log.safety_score,
    duration_actual: log.duration_actual,
    analysis,
  };
}

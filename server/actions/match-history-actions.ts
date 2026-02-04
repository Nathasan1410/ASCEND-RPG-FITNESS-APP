// @ts-nocheck
"use server";

import { createClient } from "@/lib/supabase/server";

export async function getPublicProfile(username: string, filters?: {
  questType?: string;
  startDate?: string;
  endDate?: string;
}) {
  const supabase = await createClient();

  const { data: profileData } = await supabase
    .from("profiles")
    .select("id, username, rank_tier, level, total_xp, class, hunter_status, streak_current, streak_best, stats_strength, stats_agility, stats_stamina, created_at")
    .eq("username", username)
    .single();

  const profile = profileData as any;

  if (!profile) return null;

  let query = supabase
    .from("logs")
    .select(`
      id,
      xp_awarded,
      duration_actual,
      integrity_score,
      proof_media_url,
      proof_type,
      verification_status,
      completed_at,
      quests (
        plan_json,
        rank_difficulty
      )
    `)
    .eq("user_id", profile.id)
    .eq("is_public", true);

  if (filters?.questType && filters.questType !== "all") {
    query = query.eq("quest_type", filters.questType);
  }

  if (filters?.startDate) {
    query = query.gte("completed_at", filters.startDate);
  }

  if (filters?.endDate) {
    query = query.lte("completed_at", filters.endDate);
  }

  const { data: logsData } = await query
    .order("completed_at", { ascending: false })
    .limit(20);

  const transformedLogs = (logsData || []).map((log: any) => {
    const questName = log.quests?.plan_json?.quest_name || 'Unknown Quest';
    const rankDifficulty = log.quests?.rank_difficulty || 'E-Rank';
    
    return {
      id: log.id,
      quest_id: log.quest_id,
      xp_awarded: log.xp_awarded,
      duration_actual: log.duration_actual,
      integrity_score: log.integrity_score,
      proof_media_url: log.proof_media_url,
      proof_type: log.proof_type,
      verification_status: log.verification_status || 'Auto_Approved',
      completed_at: log.completed_at,
      quest_name: questName,
      rank_difficulty: rankDifficulty,
    };
  });

  return buildProfileResponse(profile, transformedLogs);
}

function buildProfileResponse(profile: any, logsData: any[]) {
  const totalProofs = logsData.filter((l: any) => l.proof_media_url).length;
  const avgIntegrity = logsData.reduce((sum: number, l: any) => sum + (l.integrity_score || 0), 0) / (logsData.length || 1);

  return {
    profile,
    match_history: logsData,
    stats: {
      total_quests: logsData.length,
      verified_quests: totalProofs,
      proof_rate: logsData.length ? (totalProofs / logsData.length) * 100 : 0,
      avg_integrity: avgIntegrity,
    }
  };
}

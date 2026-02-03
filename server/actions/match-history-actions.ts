// @ts-nocheck
"use server";

import { createClient } from "@/lib/supabase/server";

export async function getPublicProfile(username: string) {
  const supabase = await createClient();

  const { data: profileData } = await supabase
    .from("profiles")
    .select("id, username, rank_tier, level, total_xp, class, hunter_status, streak_current, streak_best, stats_strength, stats_agility, stats_stamina, created_at")
    .eq("username", username)
    .single();

  const profile = profileData as any;

  if (!profile) return null;

  const { data: logsData, error: rpcError } = await supabase.rpc("get_match_history_optimized", {
    p_user_id: profile.id,
    p_limit: 20,
    p_offset: 0,
  } as any);

  if (rpcError || !logsData) {
    console.warn("Match history RPC failed, falling back to direct query:", rpcError?.message);
    const { data: logs } = await supabase
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
      .eq("is_public", true)
      .order("completed_at", { ascending: false })
      .limit(20);

    return buildProfileResponse(profile, logs || []);
  }

  const transformedLogs = (logsData || []).map((log: any) => ({
    id: log.log_id,
    quest_id: log.quest_id,
    xp_awarded: log.xp_awarded,
    duration_actual: log.duration_actual,
    integrity_score: log.integrity_score,
    proof_media_url: log.proof_media_url,
    proof_type: log.proof_type,
    verification_status: 'Verified',
    completed_at: log.completed_at,
    quests: {
      plan_json: { quest_name: log.quest_name },
      rank_difficulty: log.rank_difficulty,
    },
  }));

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

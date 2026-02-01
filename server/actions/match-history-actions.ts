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
  
  // Get match history (public logs)
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
  
  // Calculate stats
  const logsData = (logs || []) as any[];
  const totalProofs = logsData.filter(l => l.proof_media_url).length;
  const avgIntegrity = logsData.reduce((sum, l) => sum + (l.integrity_score || 0), 0) / (logsData.length || 1);
  
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

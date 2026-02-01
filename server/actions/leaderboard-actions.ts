"use server";

import { createClient } from "@/lib/supabase/server";

export async function getLeaderboard(limit: number = 50) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_leaderboard", {
    limit_count: limit,
  } as any);

  if (error) {
    console.warn("Leaderboard RPC failed, falling back to direct query:", error.message);
    // Fallback to direct query if RPC fails
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, username, total_xp, level, rank_tier, class, hunter_status, streak_current")
      .eq("onboarding_done", true)
      .neq("hunter_status", "Corrupted")  // Exclude cheaters
      .order("total_xp", { ascending: false })
      .limit(limit);

    return profiles?.map((p, i) => ({ ...(p as any), global_rank: i + 1 })) || [];
  }

  return data || [];
}

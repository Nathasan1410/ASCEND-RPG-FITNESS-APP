"use server";

import { createClient } from "@/lib/supabase/server";

export async function getLeaderboard(limit: number = 50, rankFilter: string = "all", classFilter: string = "all") {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("get_leaderboard_optimized", {
    p_limit: limit,
    p_rank_filter: rankFilter,
    p_class_filter: classFilter,
  } as any);

  if (error) {
    console.warn("Leaderboard RPC failed, falling back to direct query:", error.message);
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, username, total_xp, level, rank_tier, class, hunter_status, streak_current")
      .eq("onboarding_done", true)
      .neq("hunter_status", "Corrupted")
      .order("total_xp", { ascending: false, nullsFirst: false })
      .limit(limit);

    return profiles?.map((p, i) => ({ ...(p as any), global_rank: i + 1 })) || [];
  }

  return data || [];
}

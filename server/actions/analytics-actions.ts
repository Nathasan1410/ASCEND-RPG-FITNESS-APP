"use server";

import { createClient } from "@/lib/supabase/server";

export async function getAnalyticsSummary() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  // Fetch total traces count
  const { count: totalTraces } = await supabase
    .from("logs")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  // Fetch recent logs for average score calculation
  const { data: recentLogs } = await supabase
    .from("logs")
    .select("integrity_score, effort_score, safety_score, completed_at")
    .eq("user_id", user.id)
    .order("completed_at", { ascending: false })
    .limit(10);

  // Calculate average evaluation score
  const avgEvaluationScore = recentLogs && recentLogs.length > 0
    ? recentLogs.reduce((sum: number, log: any) => {
        const overallScore = ((log.integrity_score || 0) + (log.effort_score || 0) + (log.safety_score || 0)) / 3;
        return sum + overallScore;
      }, 0) / recentLogs.length
    : 0;

  return {
    recentTraces: totalTraces || 0,
    activeExperiments: 3,
    latestPromptVersion: "v2.3",
    avgEvaluationScore,
  };
}
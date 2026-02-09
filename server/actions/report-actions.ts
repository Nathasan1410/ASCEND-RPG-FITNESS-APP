"use server";

import { createClient } from "@/lib/supabase/server";
import { ReportSchema } from "@/types/schemas";
import { revalidatePath } from "next/cache";
import { moderateReport } from "@/lib/ai/report-moderator";

export async function submitReport(input: unknown) {
  const validated = ReportSchema.parse(input);
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  if (user.id === validated.target_user_id) {
    throw new Error("Cannot report yourself");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { count } = await supabase
    .from("reports")
    .select("*", { count: "exact", head: true })
    .eq("reporter_id", user.id)
    .gte("created_at", today.toISOString());

  if ((count || 0) >= 5) {
    throw new Error("Daily report limit reached");
  }

  let logData = null;
  if (validated.target_log_id) {
    const { data: log } = await supabase
      .from("logs")
      .select("*")
      .eq("id", validated.target_log_id)
      .single();
    logData = log;
  }

  const { data: report, error } = await (supabase.from("reports") as any)
    .insert({
      reporter_id: user.id,
      target_user_id: validated.target_user_id,
      target_log_id: validated.target_log_id,
      reason: validated.reason,
      description: validated.description,
    })
    .select()
    .single();

  if (error) throw error;

  const moderation = await moderateReport({
    reportId: report.id,
    reason: validated.reason,
    description: validated.description || "",
    targetUserId: validated.target_user_id,
    targetLogId: validated.target_log_id,
    logData: logData,
  });

  await (supabase.from("reports") as any)
    .update({
      ai_analysis: moderation,
      ai_confidence: moderation.confidence,
      ai_action_taken: moderation.action,
      processed_at: new Date().toISOString(),
    })
    .eq("id", report.id);

  if (moderation.confidence > 0.8 && moderation.action !== "DISMISS") {
    const penalty = moderation.recommended_penalty;
    if (penalty && (penalty.xp_reduction || penalty.hunter_status_change)) {
      const updateData: any = {};

      if (penalty.xp_reduction) {
        const { data: profile } = await (supabase
          .from("profiles")
          .select("total_xp, current_xp")
          .eq("id", validated.target_user_id)
          .single() as any);

        if (profile) {
          updateData.total_xp = Math.max(0, (profile.total_xp || 0) - penalty.xp_reduction);
          updateData.current_xp = Math.max(0, (profile.current_xp || 0) - penalty.xp_reduction);
        }
      }

      if (penalty.hunter_status_change) {
        updateData.hunter_status = penalty.hunter_status_change;
      }

      if (Object.keys(updateData).length > 0) {
        await (supabase.from("profiles") as any)
          .update(updateData)
          .eq("id", validated.target_user_id);
      }

      await (supabase.from("reports") as any)
        .update({ impact_applied: true })
        .eq("id", report.id);
    }
  }

  revalidatePath(`/profile/${validated.target_user_id}`);

  return {
    success: true,
    message: "Report submitted. AI moderation complete.",
    moderation_action: moderation.action,
    confidence: moderation.confidence,
  };
}

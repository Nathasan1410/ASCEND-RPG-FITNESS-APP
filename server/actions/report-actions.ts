"use server";

import { createClient } from "@/lib/supabase/server";
import { ReportSchema } from "@/types/schemas";
import { revalidatePath } from "next/cache";

export async function submitReport(input: unknown) {
  const validated = ReportSchema.parse(input);
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  
  // Cannot report yourself
  if (user.id === validated.target_user_id) {
    throw new Error("Cannot report yourself");
  }
  
  // Check rate limit (max 5 reports per day)
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
  
  // Submit report
  const { error } = await (supabase.from("reports") as any).insert({
    reporter_id: user.id,
    target_user_id: validated.target_user_id,
    target_log_id: validated.target_log_id,
    reason: validated.reason,
    description: validated.description,
  });
  
  if (error) throw error;
  
  revalidatePath(`/profile/${validated.target_user_id}`);
  
  return { success: true, message: "Report submitted. The System will investigate." };
}

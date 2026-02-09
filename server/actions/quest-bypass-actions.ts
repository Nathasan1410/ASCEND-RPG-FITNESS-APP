"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { QuestBypassInputSchema, type QuestBypassInput } from "@/types/quest-bypass-schemas";
import { sendTraceToOpik } from "@/lib/ai/opik-helper";

export async function bypassQuestAIJudge(input: unknown) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const validated = QuestBypassInputSchema.parse(input);

  const { data: quest } = await supabase
    .from("quests")
    .select("id, user_id, status, xp_potential")
    .eq("id", validated.quest_id)
    .single();

  if (!quest) throw new Error("Quest not found");

  if (quest.user_id !== user.id) {
    throw new Error("You can only bypass your own submitted quests");
  }

  const bypassStartTime = Date.now();

  try {
    const { data: existingBypass } = await supabase
      .from("quest_bypasses")
      .select("*")
      .eq("quest_id", validated.quest_id)
      .order("created_at", { ascending: false })
      .limit(1);

    const hasRecentBypass = existingBypass && (
      Date.parse(existingBypass.created_at).getTime() > Date.now() - 60000
    );

    if (hasRecentBypass) {
      throw new Error("This quest has already been bypassed recently. Please wait 10 minutes before bypassing again.");
    }

    const { data: bypass } = await supabase
      .from("quest_bypasses")
      .insert({
        quest_id: validated.quest_id,
        judge_id: user.id,
        bypass_reason: validated.bypass_reason,
        bypass_type: validated.bypass_type,
        notes: validated.notes,
      })
      .select()
      .single();

    if (!bypass) throw new Error("Failed to record bypass");

    await supabase
      .from("quests")
      .update({ status: "QUEST_BYPASSED" })
      .eq("id", validated.quest_id);

    await sendTraceToOpik("quest_ai_judge_bypass", {
      startTime: bypassStartTime,
      input: {
        quest_id: validated.quest_id,
        quest_name: quest.quest_name,
        judge_id: user.id,
        bypass_reason: validated.bypass_reason,
        bypass_type: validated.bypass_type,
        notes: validated.notes,
      },
      output: {
        status: "QUEST_BYPASSED",
        bypass_recorded: true,
      },
      tags: ["quest_bypass", validated.bypass_reason, validated.bypass_type],
    });

    revalidatePath(`/dashboard`);

    return {
      success: true,
      message: "Quest bypassed successfully. Quest will be marked as complete.",
    };

  } catch (error: any) {
    console.error("[Quest Bypass] Error:", error);

    await sendTraceToOpik("quest_ai_judge_bypass_error", {
      startTime: bypassStartTime,
      input: {
        quest_id: validated.quest_id,
        judge_id: user.id,
        bypass_reason: validated.bypass_reason,
      },
      output: {
        status: "ERROR",
        message: error.message,
      },
      tags: ["error", "quest_bypass_failed"],
    });

    throw new Error(`Failed to bypass quest: ${error.message}`);
  }
}

"use server";

import { createClient } from "@/lib/supabase/server";
import { generateWorkoutPlan } from "@/lib/ai/groq";
import { revalidatePath } from "next/cache";

interface GenerateQuestInput {
  time_window_min: number;
  muscle_soreness: string[];
}

export async function generateDailyQuest(input: GenerateQuestInput) {
  console.log("[QuestAction] Starting generation for input:", input);
  
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    console.error("[QuestAction] No user found");
    throw new Error("Not authenticated");
  }

  // Get user profile
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError || !profileData) {
    console.error("[QuestAction] Profile error:", profileError);
    throw new Error("Profile not found");
  }

  const profile = profileData as any;

  // Check if active daily quest already exists
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const { data: existingQuest } = await supabase
    .from("quests")
    .select("*")
    .eq("user_id", user.id)
    .eq("quest_type", "Daily")
    .gte("created_at", today.toISOString())
    .limit(1)
    .single();

  if (existingQuest) {
    console.log("[QuestAction] Existing quest found:", existingQuest.id);
    return existingQuest;
  }

  // Generate workout plan
  console.log("[QuestAction] Calling Groq Architect...");
  let plan;
  try {
    // Add a timeout race to prevent infinite hanging
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Groq Timeout")), 15000)
    );
    
    plan = await Promise.race([
      generateWorkoutPlan({
        user_class: profile.class || "Novice",
        user_rank: profile.rank_tier || "E-Rank",
        time_window_min: input.time_window_min,
        equipment: profile.equipment || [],
        muscle_soreness: input.muscle_soreness,
      }),
      timeoutPromise
    ]) as any;
    
    console.log("[QuestAction] Plan generated successfully");
  } catch (err) {
    console.error("[QuestAction] AI Generation Failed:", err);
    throw new Error("AI Generation Failed: " + (err as Error).message);
  }

  // Save to database
  const expiresAt = new Date();
  expiresAt.setHours(23, 59, 59, 999); // Expires at midnight

  console.log("[QuestAction] Saving to DB...");
  const { data: quest, error } = await (supabase.from("quests") as any)
    .insert({
      user_id: user.id,
      quest_type: plan.quest_type,
      rank_difficulty: plan.quest_rank,
      plan_json: plan,
      xp_potential: plan.base_xp,
      status: "Active",
      requires_proof: plan.requires_proof,
      expires_at: expiresAt.toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error("[QuestAction] DB Insert Failed:", error);
    throw error;
  }

  console.log("[QuestAction] Success. Quest ID:", quest.id);
  revalidatePath("/dashboard");
  return quest;
}

export async function getActiveQuest() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  const { data: quest } = await supabase
    .from("quests")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "Active")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  return quest;
}

export async function getTodayQuest() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { data: quest } = await supabase
    .from("quests")
    .select("*")
    .eq("user_id", user.id)
    .eq("quest_type", "Daily")
    .gte("created_at", today.toISOString())
    .limit(1)
    .single();

  return quest;
}

export async function getQuestById(id: string) {
  const supabase = await createClient();
  
  const { data: quest } = await supabase
    .from("quests")
    .select("*")
    .eq("id", id)
    .single();

  return quest;
}

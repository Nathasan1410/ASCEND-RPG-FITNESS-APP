"use server";

import { createClient } from "@/lib/supabase/server";
import { generateWorkoutPlan } from "@/lib/ai/groq";
import { revalidatePath } from "next/cache";

interface GenerateQuestInput {
  time_window_min: number;
  muscle_soreness: string[];
}

export async function generateDailyQuest(input: GenerateQuestInput) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("Not authenticated");

  // Get user profile
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError || !profileData) throw new Error("Profile not found");

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
    return existingQuest;
  }

  // Generate workout plan
  const plan = await generateWorkoutPlan({
    user_class: profile.class || "Novice",
    user_rank: profile.rank_tier || "E-Rank",
    time_window_min: input.time_window_min,
    equipment: profile.equipment || [],
    muscle_soreness: input.muscle_soreness,
  });

  // Save to database
  const expiresAt = new Date();
  expiresAt.setHours(23, 59, 59, 999); // Expires at midnight

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

  if (error) throw error;

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

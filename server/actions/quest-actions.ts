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

  // Check if active or completed daily quest already exists (Ignore Failed/Skipped)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const { data: existingQuest } = await supabase
    .from("quests")
    .select("*")
    .eq("user_id", user.id)
    .eq("quest_type", "Daily")
    .gte("created_at", today.toISOString())
    .neq("status", "Failed") // Allow regenerating if previous failed
    .neq("status", "Skipped")
    .limit(1)
    .single();

  if (existingQuest) {
    const existing = existingQuest as any;
    console.log("[QuestAction] Existing valid quest found:", existing.id);
    return existingQuest;
  }

  // Generate workout plan
  console.log("[QuestAction] Calling Groq Architect...");
  let plan;
  try {
    // Add a timeout race to prevent infinite hanging
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Groq Timeout")), 60000)
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
    console.log("[QuestAction] Raw plan data:", JSON.stringify(plan, null, 2));
  } catch (err: any) {
    console.error("[QuestAction] AI Generation Failed:", err);
    console.error("[QuestAction] Error details:", JSON.stringify(err, null, 2));
    console.error("[QuestAction] Error message:", err?.message || "Unknown error");
    console.error("[QuestAction] Error stack:", err?.stack || "No stack trace");
    console.error("[QuestAction] Profile data:", JSON.stringify(profile, null, 2));
    // FALLBACK QUEST LOGIC - Use user's actual rank and class
    console.log("[QuestAction] Falling back to smart protocol due to:", err?.message || "Unknown error");
    console.log("[QuestAction] User rank:", profile.rank_tier, "| Class:", profile.class, "| Level:", profile.level);
    
    // Calculate appropriate difficulty based on user rank
    const rankMultiplier: Record<string, number> = {
      "S-Rank": 2500,
      "A-Rank": 2000,
      "B-Rank": 1500,
      "C-Rank": 1000,
      "D-Rank": 600,
      "E-Rank": 300,
    };
    
    const baseXP = rankMultiplier[profile.rank_tier] || 300;
    const sets = profile.level >= 70 ? 5 : profile.level >= 40 ? 4 : 3;
    const reps = profile.level >= 70 ? "15" : profile.level >= 40 ? "12" : "10";
    
    plan = {
      quest_name: `${profile.rank_tier} Recovery Protocol (Offline)`,
      quest_rank: profile.rank_tier,
      quest_type: "Daily",
      narrative_intro: `The System is experiencing interference. Execute this ${profile.rank_tier} recovery protocol for ${profile.class} class.`,
      base_xp: baseXP,
      stat_gain: { strength: 2, stamina: 2, agility: 2 },
      estimated_duration_min: input.time_window_min || 30,
      target_class: profile.class,
      requires_proof: false,
      exercises: [
        {
          id: "ex_fallback_1",
          name: "Push-ups",
          type: "Compound",
          sets,
          reps,
          rest_sec: 60,
          rpe_target: profile.level >= 70 ? 7 : 6,
          target_muscle: "Chest",
          tips: `System offline. Maintain ${profile.rank_tier} form standards.`,
        },
        {
          id: "ex_fallback_2",
          name: "Squats",
          type: "Compound",
          sets,
          reps,
          rest_sec: 60,
          rpe_target: profile.level >= 70 ? 7 : 6,
          target_muscle: "Legs",
          tips: "Knees over toes. Focus on depth.",
        },
        {
          id: "ex_fallback_3",
          name: "Plank",
          type: "Isolation",
          sets,
          reps: profile.level >= 70 ? "45s" : profile.level >= 40 ? "35s" : "30s",
          rest_sec: 30,
          rpe_target: profile.level >= 70 ? 6 : 5,
          target_muscle: "Core",
          tips: "Straight line from head to heels.",
        },
      ],
      ai_review: {
        reasoning: `Emergency ${profile.rank_tier} protocol activated for ${profile.class} class. Adjusted intensity based on your level ${profile.level} capabilities to maintain training continuity during system instability.`,
        completion_probability: profile.level >= 70 ? 75 : 85,
        key_factors: ["Emergency Protocol", profile.rank_tier, profile.class, "Adjusted Difficulty"]
      }
    };
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

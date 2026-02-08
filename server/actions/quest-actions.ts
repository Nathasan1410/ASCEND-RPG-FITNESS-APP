"use server";

import { createClient } from "@/lib/supabase/server";
import { ExperimentRunner } from "@/lib/ab-testing/experiment-runner";
import { getExperiments } from "@/server/actions/ab-testing-actions";
import { revalidatePath } from "next/cache";
import { sendTraceToOpik, getOpikTags } from "@/lib/ai/opik-helper";

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
  
  console.log("[QuestAction] Checking for existing quest for user:", user.id);
  
  const { data: existingQuest, error: existingError } = await (supabase
    .from("quests")
    .select("*")
    .eq("user_id", user.id)
    .eq("quest_type", "Daily")
    .gte("created_at", today.toISOString())
    .neq("status", "Failed") // Allow regenerating if previous failed
    .neq("status", "Skipped")
    .limit(1)
    .maybeSingle() as any); // Use maybeSingle() instead of single() to avoid throwing when no data

  if (existingError) {
    console.error("[QuestAction] Error checking existing quest:", existingError);
    // Continue to generate new quest if there's an error checking for existing one
  }

  if (existingQuest && (existingQuest as any).id) {
    const existing = existingQuest as any;
    console.log("[QuestAction] Existing valid quest found:", existing.id, existing.status);
    return existingQuest;
  }
  
  console.log("[QuestAction] No existing valid quest found, will generate new one");

  // Check for running A/B experiments
  let runningExperimentId: string | undefined;
  try {
    const experiments = await getExperiments();
    const runningQuestGenExp = experiments.find(
      (e: any) => e.status === "running" && e.type === "prompt_ab_test"
    );
    if (runningQuestGenExp) {
      runningExperimentId = runningQuestGenExp.id;
      console.log("[QuestAction] Running A/B test experiment:", runningExperimentId);
    }
  } catch (error) {
    console.error("[QuestAction] Error checking A/B experiments:", error);
  }

  // Generate workout plan with A/B testing
  console.log("[QuestAction] Calling ExperimentRunner...");
  const generationStartTime = Date.now();
  let plan;
  let variantId: string | undefined;
  let generationTime: number;
  
  try {
    const result = await ExperimentRunner.runQuestGeneration(
      user.id,
      {
        user_class: profile.class || "Novice",
        user_rank: profile.rank_tier || "E-Rank",
        time_window_min: input.time_window_min,
        equipment: profile.equipment || [],
        muscle_soreness: input.muscle_soreness,
      },
      runningExperimentId
    );
    
    plan = result.plan;
    variantId = result.variantId;
    generationTime = Date.now() - generationStartTime;
    
    console.log("[QuestAction] Plan generated successfully");
    console.log("[QuestAction] Raw plan data:", JSON.stringify(plan, null, 2));
    console.log("[QuestAction] Variant ID:", variantId);

    // Add variant info to plan for tracking
    if (variantId) {
      (plan as any)._variantId = variantId;
      (plan as any)._experimentId = runningExperimentId;
      (plan as any)._generationTime = generationTime;
    }

    // Send trace to Opik
    await sendTraceToOpik("quest_generation_success", {
      startTime: generationStartTime,
      input: {
        user_id: user.id,
        user_rank: profile.rank_tier,
        user_class: profile.class,
        time_window_min: input.time_window_min,
        equipment_count: (profile.equipment || []).length,
        muscle_soreness_count: input.muscle_soreness.length,
        variant_id: variantId,
        experiment_id: runningExperimentId,
      },
      output: {
        quest_name: plan.quest_name,
        quest_rank: plan.quest_rank,
        quest_type: plan.quest_type,
        exercise_count: plan.exercises.length,
        xp_reward: plan.base_xp,
        estimated_duration_min: plan.estimated_duration_min,
        completion_probability: plan.ai_review?.completion_probability,
        generation_time_ms: generationTime,
      },
      tags: [
        "success",
        profile.rank_tier,
        profile.class,
        plan.quest_rank,
        plan.quest_type,
        variantId ? `variant_${variantId}` : undefined,
        runningExperimentId ? `ab_test` : undefined,
      ].filter(Boolean),
    });
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
    const sets = profile.level >= 70 ?5 : profile.level >= 40 ?4 :3;
    const reps = profile.level >= 70 ? "15" : profile.level >= 40 ? "12" : "10";
    
    const fallbackPlan = {
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
          rpe_target: profile.level >= 70 ?7 : 6,
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
          rpe_target: profile.level >= 70 ?7 : 6,
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
          rpe_target: profile.level >= 70 ?6 :5,
          target_muscle: "Core",
          tips: "Straight line from head to heels.",
        },
      ],
      ai_review: {
        reasoning: `Emergency ${profile.rank_tier} protocol activated for ${profile.class} class. Adjusted intensity based on your level ${profile.level} capabilities to maintain training continuity during system instability.`,
        completion_probability: profile.level >= 70 ?75 : 85,
        key_factors: ["Emergency Protocol", profile.rank_tier, profile.class, "Adjusted Difficulty"]
      }
    };
    
    console.log("[QuestAction] Fallback plan created:", JSON.stringify(fallbackPlan, null, 2));
    
    // Send fallback trace to Opik
    await sendTraceToOpik("quest_generation_fallback", {
      startTime: generationStartTime,
      input: {
        user_id: user.id,
        user_rank: profile.rank_tier,
        user_class: profile.class,
        time_window_min: input.time_window_min,
        error: err?.message || "Unknown error",
      },
      output: {
        quest_name: fallbackPlan.quest_name,
        quest_rank: fallbackPlan.quest_rank,
        quest_type: fallbackPlan.quest_type,
        exercise_count: fallbackPlan.exercises.length,
        xp_reward: fallbackPlan.base_xp,
        fallback_reason: err?.message || "Unknown error",
      },
      tags: [
        "fallback",
        profile.rank_tier,
        profile.class,
      ],
    });
    
    // Assign fallbackPlan to plan variable
    plan = fallbackPlan;
  }

  // Save to database
  const expiresAt = new Date();
  expiresAt.setHours(23, 59, 59, 999); // Expires at midnight

  console.log("[QuestAction] Saving to DB...");
  console.log("[QuestAction] Plan to save:", JSON.stringify({
    quest_name: plan.quest_name,
    quest_rank: plan.quest_rank,
    quest_type: plan.quest_type,
    base_xp: plan.base_xp,
    exercises_count: plan.exercises?.length || 0,
  }));

  try {
    const { data: quest, error }: any = await (supabase.from("quests") as any)
      .insert({
        user_id: user.id,
        quest_type: plan.quest_type,
        rank_difficulty: plan.quest_rank,
        plan_json: plan,
        xp_potential: plan.base_xp,
        status: "Active",
        requires_proof: plan.requires_proof || false,
        expires_at: expiresAt.toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("[QuestAction] DB Insert Failed:", error);
      console.error("[QuestAction] DB Error Details:", JSON.stringify(error, null, 2));
      throw new Error(`Database error: ${error.message}`);
    }

    if (!quest) {
      console.error("[QuestAction] DB Insert succeeded but returned no data");
      throw new Error("Failed to create quest - no data returned from database");
    }

    console.log("[QuestAction] Success. Quest ID:", quest.id, "Quest Name:", quest.plan_json?.quest_name);
    revalidatePath("/dashboard");
    return quest;
  } catch (dbError: any) {
    console.error("[QuestAction] DB Insert Exception:", dbError);
    console.error("[QuestAction] Exception details:", {
      message: dbError?.message,
      stack: dbError?.stack,
      name: dbError?.name,
    });
    throw new Error(`Failed to create quest: ${dbError?.message || "Unknown error"}`);
  }
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

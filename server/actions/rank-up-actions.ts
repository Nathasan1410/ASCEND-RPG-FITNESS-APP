"use server";

import { createClient } from "@/lib/supabase/server";
import { generateWorkoutPlan } from "@/lib/ai/groq";
import { revalidatePath } from "next/cache";

export async function checkRankUpEligibility(userId: string) {
  const supabase = await createClient();
  
  const { data: profileData } = await supabase
    .from("profiles")
    .select("level, rank_tier, class")
    .eq("id", userId)
    .single();

  const profile = profileData as any;

  if (!profile) return { eligible: false, nextRank: "", currentClass: "Novice" };

  const level = profile.level || 1;
  const rank = profile.rank_tier;

  // Thresholds: E->10->D->20->C->30->B->40->A->50->S
  let eligible = false;
  let nextRank = "";

  if (rank === "E-Rank" && level >= 10) { eligible = true; nextRank = "D-Rank"; }
  else if (rank === "D-Rank" && level >= 20) { eligible = true; nextRank = "C-Rank"; }
  else if (rank === "C-Rank" && level >= 30) { eligible = true; nextRank = "B-Rank"; }
  else if (rank === "B-Rank" && level >= 40) { eligible = true; nextRank = "A-Rank"; }
  else if (rank === "A-Rank" && level >= 50) { eligible = true; nextRank = "S-Rank"; }

  return { eligible, nextRank, currentClass: profile.class };
}

export async function startRankUpExam() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { eligible, nextRank, currentClass } = await checkRankUpEligibility(user.id);
  
  if (!eligible || !nextRank) throw new Error("Not eligible for Rank Up Exam");

  // Generate BOSS QUEST
  const plan = await generateWorkoutPlan({
    user_class: (currentClass || "Novice") as any,
    user_rank: nextRank as any, // Target rank difficulty
    time_window_min: 45, // Longer duration
    equipment: ["Bodyweight"], // Assume minimal for fairness, or fetch real equipment
    muscle_soreness: [], // Ignore soreness for exams
  });

  // Override for Exam
  plan.quest_type = "RankUp";
  plan.quest_name = `GATEKEEPER EXAM: ${nextRank.toUpperCase()}`;
  plan.narrative_intro = "You stand before the Gate. Prove your strength to ascend. ASCEND demands absolute perfection.";
  plan.requires_proof = true;
  plan.proof_type = "Video";
  plan.base_xp = 500; // Big bonus

  // Save as special quest
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24); // 24h to complete

  const { data: quest, error } = await (supabase.from("quests") as any)
    .insert({
      user_id: user.id,
      quest_type: "RankUp",
      rank_difficulty: nextRank,
      plan_json: plan,
      xp_potential: plan.base_xp,
      status: "Active",
      requires_proof: true,
      expires_at: expiresAt.toISOString(),
    })
    .select()
    .single();

  if (error) throw error;

  revalidatePath("/dashboard");
  return quest;
}

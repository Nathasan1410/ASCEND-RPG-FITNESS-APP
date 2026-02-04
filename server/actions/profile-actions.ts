"use server";

import { createClient } from "@/lib/supabase/server";
import { OnboardingSchema, type OnboardingData } from "@/types/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { RankTier } from "@/types/schemas";

function calculateInitialRank(pushups: number): RankTier {
  if (pushups >= 100) return "S-Rank";
  if (pushups >= 75) return "A-Rank";
  if (pushups >= 50) return "B-Rank";
  if (pushups >= 25) return "C-Rank";
  if (pushups >= 10) return "D-Rank";
  return "E-Rank";
}

export async function completeOnboarding(data: OnboardingData) {
  const validated = OnboardingSchema.safeParse(data);
  
  if (!validated.success) {
    throw new Error("Invalid data format");
  }

  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const initialRank = calculateInitialRank(validated.data.max_pushups);
  
  const { error } = await (supabase.from("profiles") as any)
    .update({
      username: validated.data.username,
      class: validated.data.selected_class,
      rank_tier: initialRank,
      height_cm: validated.data.height_cm,
      weight_kg: validated.data.weight_kg,
      equipment: validated.data.equipment,
      onboarding_done: true,
      stats_strength: 10 + Math.floor(validated.data.max_pushups / 10),
      stats_stamina: 10 + Math.floor(validated.data.run_capability_km * 2),
      stats_agility: 10,
    })
    .eq("id", user.id);

  if (error) {
    console.error("Profile update error:", error);
    throw new Error("Failed to save profile");
  }
  
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function getUserAchievements(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_achievements")
    .select(`
      unlocked_at,
      achievements (
        id,
        name,
        description,
        icon,
        rarity
      )
    `)
    .eq("user_id", userId)
    .order("unlocked_at", { ascending: false });

  if (error) {
    console.error("Error fetching achievements:", error);
    return [];
  }

  return data || [];
}

export async function getFriendPreviews(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("friends")
    .select(`
      friend_id,
      profiles!friend_id (
        id,
        username,
        display_name,
        rank_tier,
        class
      )
    `)
    .or(`user_id.eq.${userId},friend_id.eq.${userId}`)
    .limit(6)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching friends:", error);
    return [];
  }

  return data || [];
}

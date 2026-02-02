"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

type AchievementRarity = "common" | "rare" | "epic" | "legendary";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xp_reward: number;
  rarity: AchievementRarity;
  requirements: {
    type: "quests_completed" | "total_reps" | "streak_days" | "level_reached" | "rank_reached" | "friends_count" | "xp_earned";
    target: number;
  };
}

export async function unlockAchievement(userId: string, achievementId: string) {
  const supabase = await createClient();

  const { data: existing } = await (supabase.from("user_achievements") as any)
    .select("*")
    .eq("user_id", userId)
    .eq("achievement_id", achievementId)
    .maybeSingle();

  if (existing) {
    return { success: true, alreadyUnlocked: true };
  }

  const { error: insertError } = await (supabase.from("user_achievements") as any)
    .insert({
      user_id: userId,
      achievement_id: achievementId,
      unlocked_at: new Date().toISOString(),
    });

  if (insertError) {
    return { error: "Failed to unlock achievement" };
  }

  revalidatePath("/achievements");
  revalidatePath("/profile/[username]");
  return { success: true, alreadyUnlocked: false };
}

export async function getUserAchievements(userId: string) {
  const supabase = await createClient();

  const { data: userAchievements } = await (supabase.from("user_achievements") as any)
    .select(`
      *,
      achievements!inner (
        name,
        description,
        icon,
        xp_reward,
        rarity
      )
    `)
    .eq("user_id", userId)
    .order("unlocked_at", { ascending: false });

  return userAchievements || [];
}

export async function checkAchievements(userId: string, userStats: any) {
  const supabase = await createClient();

  const { data: achievements } = await supabase
    .from("achievements")
    .select("*")
    .order("rarity", { ascending: false });

  const unlockedIds: string[] = [];
  const unlockedAchievements: any[] = [];

  for (const achievement of achievements || []) {
    const a = achievement as Achievement;
    const isMet = isRequirementMet(a.requirements, userStats);

    if (isMet) {
      const result = await unlockAchievement(userId, a.id);
      if (result.success && !result.alreadyUnlocked) {
        unlockedIds.push(a.id);
        unlockedAchievements.push(a);
      }
    }
  }

  return { unlockedIds, unlockedAchievements };
}

function isRequirementMet(requirement: any, stats: any): boolean {
  switch (requirement.type) {
    case "quests_completed":
      return stats.totalQuests >= requirement.target;
    case "total_reps":
      return stats.totalReps >= requirement.target;
    case "streak_days":
      return stats.currentStreak >= requirement.target;
    case "level_reached":
      return stats.level >= requirement.target;
    case "rank_reached":
      const rankOrder = ["E-Rank", "D-Rank", "C-Rank", "B-Rank", "A-Rank", "S-Rank"];
      return rankOrder.indexOf(stats.rank) >= rankOrder.indexOf(requirement.target);
    case "friends_count":
      return stats.friendCount >= requirement.target;
    case "xp_earned":
      return stats.totalXp >= requirement.target;
    default:
      return false;
  }
}

export async function getAchievementProgress(userId: string) {
  const supabase = await createClient();

  const { data: stats } = await supabase
    .from("profiles")
    .select("*, quest_count, total_reps")
    .eq("id", userId)
    .single();

  return stats || null;
}

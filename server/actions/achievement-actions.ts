// @ts-nocheck
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

// Type-safe user stats for achievement checking
interface UserAchievementStats {
  totalQuests: number;
  totalReps: number;
  currentStreak: number;
  level: number;
  rank: string;
  friendCount: number;
  totalXp: number;
}


export async function unlockAchievement(userId: string, achievementId: string) {
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("user_achievements")
    .select("*")
    .eq("user_id", userId)
    .eq("achievement_id", achievementId)
    .maybeSingle();

  if (existing) {
    return { success: true, alreadyUnlocked: true };
  }

  const { error: insertError } = await supabase
    .from("user_achievements")
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

  const { data: userAchievements } = await supabase
    .from("user_achievements")
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

export async function checkAchievements(userId: string, userStats: UserAchievementStats) {
  const supabase = await createClient();

  const { data: achievements } = await supabase
    .from("achievements")
    .select("*")
    .order("rarity", { ascending: false });

  const unlockedIds: string[] = [];
  const unlockedAchievements: Achievement[] = [];

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

function isRequirementMet(requirement: Achievement['requirements'], stats: UserAchievementStats): boolean {
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

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, total_xp, level, rank_tier, streak_current, stats_strength, stats_agility, stats_stamina")
    .eq("id", userId)
    .single();

  if (!profile) return null;

  // Calculate derived stats
  const { data: quests } = await supabase
    .from("logs")
    .select("id, exercises_completed")
    .eq("user_id", userId);

  let totalReps = 0;
  quests?.forEach((log) => {
    const exercises = log.exercises_completed as unknown;
    if (Array.isArray(exercises)) {
      exercises.forEach((ex) => {
        if (ex && typeof ex === 'object' && 'sets_done' in ex && 'reps_done' in ex) {
          const sets = (ex as { sets_done: number }).sets_done || 0;
          const repsStr = (ex as { reps_done: string }).reps_done || '0';
          const reps = parseInt(repsStr) || 0;
          totalReps += reps * sets;
        }
      });
    }
  });

  return {
    totalQuests: quests?.length || 0,
    totalReps,
    currentStreak: profile.streak_current || 0,
    level: profile.level || 1,
    rank: profile.rank_tier || 'E-Rank',
    friendCount: 0, // TODO: Query friends count
    totalXp: profile.total_xp || 0,
  };
}

import { RankTier } from "@/types/schemas";

const BASE_XP = 100;
const EXPONENT = 1.588;

/**
 * XP required to reach a specific level.
 * Formula: XP = 100 * (Level ^ 1.588)
 */
export function xpForLevel(level: number): number {
  if (level <= 1) return 0;
  return Math.floor(BASE_XP * Math.pow(level, EXPONENT));
}

/**
 * Calculate current level from total XP.
 * Inverse: Level = (XP / 100) ^ (1 / 1.588)
 */
export function levelFromXp(xp: number): number {
  if (xp < BASE_XP) return 1;
  return Math.floor(Math.pow(xp / BASE_XP, 1 / EXPONENT));
}

/**
 * Progress percentage to next level (0-100).
 */
export function levelProgress(xp: number): number {
  const currentLevel = levelFromXp(xp);
  const currentLevelXp = xpForLevel(currentLevel);
  const nextLevelXp = xpForLevel(currentLevel + 1);
  
  const needed = nextLevelXp - currentLevelXp;
  const earned = xp - currentLevelXp;
  
  return Math.min(100, Math.max(0, (earned / needed) * 100));
}

/**
 * Determine rank tier based on level.
 */
export function rankFromLevel(level: number): RankTier {
  if (level >= 50) return "S-Rank";
  if (level >= 40) return "A-Rank";
  if (level >= 30) return "B-Rank";
  if (level >= 20) return "C-Rank";
  if (level >= 10) return "D-Rank";
  return "E-Rank";
}

/**
 * XP to next level.
 */
export function xpToNextLevel(xp: number): number {
  const currentLevel = levelFromXp(xp);
  const nextLevelXp = xpForLevel(currentLevel + 1);
  return nextLevelXp - xp;
}

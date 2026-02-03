// @ts-nocheck
import { createClient } from "@/lib/supabase/server";

// ============================================
// BATCHED QUERIES - Reduce DB round trips
// ============================================

// Get user dashboard data in ONE query
export async function getDashboardData(userId: string) {
  const supabase = await createClient();

  // Using RPC for best performance
  const { data, error } = await supabase.rpc('get_user_dashboard_v2', {
    p_user_id: userId,
  });

  if (error) {
    console.error('Dashboard query error:', error);
    return null;
  }

  return data as {
    profile: any;
    activeQuest: any;
    recentQuests: any[];
    stats: {
      totalQuests: number;
      totalXP: number;
      currentStreak: number;
    };
  } | null;
}

// Get leaderboard with single query using materialized view
export async function getLeaderboardOptimized(limit: number = 50, rankFilter?: string, classFilter?: string) {
  const supabase = await createClient();

  let query = supabase
    .from('leaderboard_mv')
    .select('*')
    .order('total_xp', { ascending: false })
    .limit(limit);

  // Apply filters if provided
  if (rankFilter && rankFilter !== 'all') {
    query = query.eq('rank_tier', rankFilter);
  }

  if (classFilter && classFilter !== 'all') {
    query = query.eq('class', classFilter);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Leaderboard query error:', error);
    return [];
  }

  return data || [];
}

// Get profile with related data in batch
export async function getProfileWithStats(userId: string) {
  const supabase = await createClient();

  // Single query with relations
  const { data, error } = await supabase
    .from('profiles')
    .select(`
      id,
      username,
      display_name,
      bio,
      total_xp,
      level,
      rank_tier,
      class,
      stats_strength,
      stats_agility,
      stats_stamina,
      streak_current,
      streak_best,
      hunter_status,
      created_at,
      quests!inner (
        id,
        status,
        xp_potential,
        created_at
      ) (
        select: 10
      )
    `)
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Profile query error:', error);
    return null;
  }

  return data;
}

// Get match history with optimized join
export async function getMatchHistoryOptimized(userId: string, limit: number = 20, offset: number = 0) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('logs')
    .select(`
      id,
      xp_awarded,
      duration_actual,
      integrity_score,
      proof_media_url,
      proof_type,
      completed_at,
      quests!inner (
        id,
        plan_json,
        rank_difficulty,
        status
      )
    `)
    .eq('user_id', userId)
    .is('public', true)
    .order('completed_at', { ascending: false })
    .range(offset, limit);

  if (error) {
    console.error('Match history query error:', error);
    return [];
  }

  return data || [];
}

// Get achievement progress with optimized queries
export async function getAchievementProgressOptimized(userId: string) {
  const supabase = await createClient();

  // Parallel queries for better performance
  const [profile, logsResult] = await Promise.all([
    supabase
      .from('profiles')
      .select('id, total_xp, level, rank_tier, stats_strength, stats_agility, stats_stamina, streak_current')
      .eq('id', userId)
      .single(),
    supabase
      .from('logs')
      .select('id, exercises_completed, xp_awarded')
      .eq('user_id', userId)
      .gte('completed_at', new Date(Date.now() - 30 * 24 * 60 * 1000).toISOString()) // Last 30 days
  ]);

  if (!profile) return null;

  // Calculate total reps from logs
  let totalReps = 0;
  logsResult.data?.forEach((log: any) => {
    const exercises = log.exercises_completed;
    if (Array.isArray(exercises)) {
      exercises.forEach((ex: any) => {
        if (ex.sets_done && ex.reps_done) {
          const reps = parseInt(ex.reps_done) || 0;
          totalReps += reps * ex.sets_done;
        }
      });
    }
  });

  return {
    totalQuests: logsResult.data?.length || 0,
    totalReps,
    totalXp: profile.total_xp || 0,
    level: profile.level || 1,
    rank: profile.rank_tier || 'E-Rank',
    currentStreak: profile.streak_current || 0,
    statsStrength: profile.stats_strength || 10,
    statsAgility: profile.stats_agility || 10,
    statsStamina: profile.stats_stamina || 10,
  };
}

// ============================================
// CACHE HELPERS
// ============================================

// Simple in-memory cache for server-side
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 60 * 1000; // 60 seconds

function getCacheKey(prefix: string, params: any): string {
  return `${prefix}:${JSON.stringify(params)}`;
}

export function getCached<T>(
  prefix: string,
  params: any,
  fetchFn: () => Promise<T>
): Promise<T> {
  const key = getCacheKey(prefix, params);
  const cached = cache.get(key);

  // Return cached if fresh
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    console.log('Cache HIT:', key);
    return cached.data as T;
  }

  // Fetch fresh data
  console.log('Cache MISS:', key);
  const data = await fetchFn();

  // Store in cache
  cache.set(key, { data, timestamp: Date.now() });

  return data;
}

// Invalidate cache by prefix
export function invalidateCache(prefix: string) {
  const keysToDelete: string[] = [];
  for (const [key] of cache.keys()) {
    if (key.startsWith(prefix)) {
      keysToDelete.push(key);
    }
  }
  keysToDelete.forEach(key => cache.delete(key));
  console.log('Cache invalidated:', prefix, 'keys deleted:', keysToDelete.length);
}

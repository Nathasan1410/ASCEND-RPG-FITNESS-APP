"use client";

import { useCallback, useMemo, useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/types/supabase';

// Type-safe profile data
interface UserProfile {
  id: string;
  username: string;
  display_name: string | null;
  bio: string | null;
  total_xp: number;
  level: number;
  rank_tier: 'E-Rank' | 'D-Rank' | 'C-Rank' | 'B-Rank' | 'A-Rank' | 'S-Rank';
  class: 'Novice' | 'Striker' | 'Tank' | 'Assassin';
  stats_strength: number;
  stats_agility: number;
  stats_stamina: number;
}

export function useProfile(userId: string) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Memoize the Supabase client creation
  const supabase = useMemo(() => createClient(), []);

  // Memoize derived values from profile
  const xpProgress = useMemo(() => {
    if (!profile) return 0;
    const baseXP = 100 * Math.pow(profile.level, 1.588);
    const nextXP = 100 * Math.pow(profile.level + 1, 1.588);
    return ((profile.total_xp - baseXP) / (nextXP - baseXP)) * 100;
  }, [profile]);

  const rankColor = useMemo(() => {
    const colors = {
      'E-Rank': 'text-gray-400',
      'D-Rank': 'text-white',
      'C-Rank': 'text-cyan-400',
      'B-Rank': 'text-blue-400',
      'A-Rank': 'text-purple-400',
      'S-Rank': 'text-yellow-400',
    };
    return colors[profile?.rank_tier] || 'text-gray-400';
  }, [profile]);

  // Memoize stats display data
  const statsDisplay = useMemo(() => {
    if (!profile) return null;
    return [
      { label: 'Strength', value: profile.stats_strength, color: 'text-red-400' },
      { label: 'Agility', value: profile.stats_agility, color: 'text-green-400' },
      { label: 'Stamina', value: profile.stats_stamina, color: 'text-blue-400' },
    ];
  }, [profile]);

  // Memoize fetch function to prevent recreation on re-renders
  const fetchProfile = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (data) {
      setProfile(data as UserProfile);
    }
    setLoading(false);
  }, [userId, supabase]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    loading,
    xpProgress,
    rankColor,
    statsDisplay,
    refetch: fetchProfile,
  };
}

// Optimized quest list hook
interface QuestData {
  id: string;
  name: string;
  xp_potential: number;
  status: 'Active' | 'Completed' | 'Failed' | 'Skipped';
  created_at: string;
}

export function useQuests(userId: string) {
  const [quests, setQuests] = useState<QuestData[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = useMemo(() => createClient(), []);

  // Memoize filtered quests
  const activeQuests = useMemo(() =>
    quests.filter(q => q.status === 'Active'),
    [quests]
  );

  const completedQuests = useMemo(() =>
    quests.filter(q => q.status === 'Completed')
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    [quests]
  );

  const totalXP = useMemo(() =>
    completedQuests.reduce((sum, q) => sum + q.xp_potential, 0),
    [completedQuests]
  );

  const fetchQuests = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('quests')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (data) {
      setQuests(data as QuestData[]);
    }
    setLoading(false);
  }, [userId, supabase]);

  useEffect(() => {
    fetchQuests();
  }, [fetchQuests]);

  return {
    quests,
    loading,
    activeQuests,
    completedQuests,
    totalXP,
    refetch: fetchQuests,
  };
}

// Optimized achievement stats hook
interface AchievementStats {
  unlockedCount: number;
  totalCount: number;
  completionRate: number;
}

export function useAchievementStats(unlockedCount: number, totalCount: number) {
  return useMemo(() => {
    const completionRate = totalCount > 0
      ? Math.round((unlockedCount / totalCount) * 100)
      : 0;

    return {
      unlockedCount,
      totalCount,
      completionRate,
    };
  }, [unlockedCount, totalCount]);
}

// Optimized leaderboard filtering
interface LeaderboardFilters {
  classFilter: 'all' | 'Novice' | 'Striker' | 'Tank' | 'Assassin';
  rankFilter: 'all' | 'E-Rank' | 'D-Rank' | 'C-Rank' | 'B-Rank' | 'A-Rank' | 'S-Rank';
}

export function useLeaderboardFilter(users: UserProfile[], filters: LeaderboardFilters) {
  return useMemo(() => {
    let filtered = users;

    if (filters.classFilter !== 'all') {
      filtered = filtered.filter(u => u.class === filters.classFilter);
    }

    if (filters.rankFilter !== 'all') {
      filtered = filtered.filter(u => u.rank_tier === filters.rankFilter);
    }

    // Sort by XP descending
    return filtered.sort((a, b) => b.total_xp - a.total_xp);
  }, [users, filters]);
}

// Memoized form change handler
export function useFormChange<T>(
  initialValues: T,
  onSubmit: (values: T) => void | Promise<void>
) {
  const [values, setValues] = useState(initialValues);

  const handleChange = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setValues(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(values);
  }, [values, onSubmit]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

  return {
    values,
    handleChange,
    handleSubmit,
    resetForm,
  };
}

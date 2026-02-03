// @ts-nocheck
"use client";

import dynamic from 'next/dynamic';
import { Skeleton, CardSkeleton } from '@/components/loading/EnhancedSkeleton';

export const StatusWindow = dynamic(
  () => import('@/components/gamification/StatusWindow'),
  {
    ssr: false,
    loading: () => <div className="h-64 bg-system-panel/50 rounded-xl animate-pulse" />,
  },
);

export const LeaderboardTable = dynamic(
  () => import('@/components/leaderboard/LeaderboardTable'),
  {
    loading: () => <CardSkeleton />,
  },
);

export const MatchHistory = dynamic(
  () => import('@/components/profile/MatchHistory'),
  {
    loading: () => (
      <div className="space-y-4 animate-pulse">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    ),
  },
);

export const QuestExecution = dynamic(
  () => import('@/components/quest/QuestExecution'),
  {
    loading: () => <CardSkeleton />,
  },
);

export const ProofUpload = dynamic(
  () => import('@/components/quest/ProofUpload'),
  {
    loading: () => <div className="h-48 bg-system-panel/50 rounded-xl animate-pulse" />,
  },
);

export const AchievementGrid = dynamic(
  () => import('@/app/achievements/page'),
  {
    loading: () => (
      <div className="space-y-6 animate-pulse">
        <Skeleton width="40%" height="h-8" />
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-3">
            <Skeleton width="24%" height="h-6" />
            <Skeleton width="60%" height="h-6" />
          </div>
        </div>
      </div>
    ),
  },
);

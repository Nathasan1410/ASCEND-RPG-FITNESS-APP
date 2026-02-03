import { cn } from "@/lib/utils/cn";

interface DashboardSkeletonProps {
  className?: string;
}

// Dashboard Skeleton with Status Window, XP Bar, Quest Card
export function DashboardSkeleton({ className }: DashboardSkeletonProps) {
  return (
    <div className={cn("space-y-6 animate-pulse", className)}>
      {/* Status Window Skeleton */}
      <div className="h-64 bg-system-panel/50 border border-white/10 rounded-xl p-6">
        <div className="flex gap-6">
          {/* Stats Chart Area */}
          <div className="flex-1">
            <div className="h-8 w-32 bg-white/10 rounded mb-4" />
            <div className="w-full h-40 bg-white/5 rounded" />
          </div>
          {/* Stats Area */}
          <div className="w-40 space-y-3">
            <div className="h-10 bg-white/10 rounded" />
            <div className="h-10 bg-white/10 rounded" />
            <div className="h-10 bg-white/10 rounded" />
          </div>
        </div>
      </div>

      {/* XP Bar Skeleton */}
      <div className="bg-system-panel/50 border border-white/10 rounded-xl p-6">
        <div className="flex justify-between items-center mb-3">
          <div className="h-6 w-20 bg-white/10 rounded" />
          <div className="h-6 w-24 bg-system-accent/20 rounded" />
        </div>
        <div className="h-4 w-full bg-white/5 rounded" />
      </div>

      {/* Quest Card Skeleton */}
      <div className="bg-system-panel/50 border border-white/10 rounded-xl p-6">
        <div className="h-6 w-48 bg-white/10 rounded mb-4" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="h-6 w-6 bg-white/10 rounded" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-3/4 bg-white/10 rounded" />
                <div className="h-5 w-1/2 bg-white/10 rounded" />
              </div>
              <div className="h-8 w-8 bg-white/10 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Quest List Skeleton
interface QuestListSkeletonProps {
  count?: number;
}

export function QuestListSkeleton({ count = 5 }: QuestListSkeletonProps) {
  return (
    <div className="space-y-4 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-system-panel/50 border border-white/10 rounded-xl p-6"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="h-6 w-48 bg-white/10 rounded" />
            <div className="h-8 w-16 bg-white/10 rounded" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-white/10 rounded" />
            <div className="h-4 w-2/3 bg-white/10 rounded" />
            <div className="h-4 w-1/2 bg-white/10 rounded" />
          </div>
          <div className="flex gap-2 mt-4">
            <div className="h-8 w-8 bg-white/10 rounded" />
            <div className="h-8 w-8 bg-white/10 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Profile Page Skeleton
export function ProfileSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Profile Header */}
      <div className="bg-system-panel/50 border border-white/10 rounded-xl p-6">
        <div className="flex gap-6">
          <div className="h-24 w-24 bg-white/10 rounded-full" />
          <div className="flex-1 space-y-3">
            <div className="h-8 w-48 bg-white/10 rounded" />
            <div className="h-4 w-32 bg-white/10 rounded" />
            <div className="h-4 w-24 bg-white/10 rounded" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-system-panel/50 border border-white/10 rounded-xl p-4">
            <div className="h-4 w-16 bg-white/10 rounded mb-2" />
            <div className="h-8 w-12 bg-system-accent/20 rounded" />
          </div>
        ))}
      </div>

      {/* Match History Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-system-panel/50 border border-white/10 rounded-xl p-4"
          >
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <div className="h-5 w-40 bg-white/10 rounded" />
                <div className="h-4 w-24 bg-white/10 rounded" />
              </div>
              <div className="h-6 w-16 bg-white/10 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Leaderboard Skeleton
export function LeaderboardSkeleton({ count = 10 }: QuestListSkeletonProps) {
  return (
    <div className="bg-system-panel/50 border border-white/10 rounded-xl overflow-hidden animate-pulse">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 bg-white/5">
        <div className="col-span-1 h-6 bg-white/10 rounded" />
        <div className="col-span-5 h-6 bg-white/10 rounded" />
        <div className="col-span-2 h-6 bg-white/10 rounded" />
        <div className="col-span-2 h-6 bg-white/10 rounded" />
        <div className="col-span-2 h-6 bg-white/10 rounded" />
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-white/10">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="grid grid-cols-12 gap-4 p-4 items-center">
            <div className="col-span-1 h-6 w-8 bg-white/10 rounded" />
            <div className="col-span-5 h-6 w-32 bg-white/10 rounded" />
            <div className="col-span-2 h-6 w-12 bg-white/10 rounded" />
            <div className="col-span-2 h-6 w-12 bg-white/10 rounded" />
            <div className="col-span-2 h-6 w-16 bg-white/10 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Achievements Page Skeleton
export function AchievementsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="h-8 w-40 bg-white/10 rounded" />
        <div className="h-10 w-32 bg-system-accent/20 rounded" />
      </div>

      {/* Achievement Categories */}
      {['Legendary', 'Epic', 'Rare', 'Common'].map((rarity) => (
        <div key={rarity} className="space-y-3">
          <div className="h-6 w-24 bg-white/10 rounded" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={`${rarity}-${i}`}
                className="bg-system-panel/50 border border-white/10 rounded-xl p-4 aspect-square"
              >
                <div className="flex flex-col items-center justify-center h-full space-y-2">
                  <div className="h-12 w-12 bg-white/10 rounded" />
                  <div className="h-4 w-20 bg-white/10 rounded" />
                  <div className="h-3 w-16 bg-white/10 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Friends Page Skeleton
export function FriendsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="h-8 w-40 bg-white/10 rounded mb-4" />

      {/* Friends Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-system-panel/50 border border-white/10 rounded-xl p-4"
          >
            <div className="flex gap-4">
              <div className="h-12 w-12 bg-white/10 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-32 bg-white/10 rounded" />
                <div className="h-4 w-20 bg-white/10 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Notifications Skeleton
export function NotificationsSkeleton({ count = 10 }: QuestListSkeletonProps) {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-system-panel/50 border border-white/10 rounded-xl p-4"
        >
          <div className="flex gap-4">
            <div className="h-10 w-10 bg-white/10 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-40 bg-white/10 rounded" />
              <div className="h-4 w-64 bg-white/10 rounded" />
            </div>
            <div className="h-6 w-6 bg-white/10 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

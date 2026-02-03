"use client";

import { Radio, Users, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function FeedSkeletonLoader() {
  return (
    <div className="space-y-0">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-void-panel border-b border-white/10 animate-pulse">
          {/* User Header Skeleton */}
          <div className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {/* Avatar Skeleton */}
                <div className="w-12 h-12 rounded-full bg-white/10 flex-shrink-0" />
                <div className="flex-1 min-w-0 space-y-2">
                  {/* Username & Badges Skeleton */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="h-4 w-24 bg-white/10 rounded" />
                    <div className="h-4 w-16 bg-white/10 rounded" />
                    <div className="h-4 w-20 bg-white/10 rounded" />
                  </div>
                  {/* Metadata Skeleton */}
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-20 bg-white/10 rounded" />
                    <div className="h-3 w-16 bg-white/10 rounded" />
                    <div className="h-3 w-12 bg-white/10 rounded" />
                  </div>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0" />
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="px-4 pb-4">
            {/* Text Lines */}
            <div className="space-y-2 mb-3">
              <div className="h-4 w-full bg-white/10 rounded" />
              <div className="h-4 w-5/6 bg-white/10 rounded" />
              <div className="h-4 w-4/6 bg-white/10 rounded" />
            </div>

            {/* Activity Data Skeleton */}
            <div className="bg-white/5 rounded-lg p-3 border border-white/10 space-y-2">
              <div className="h-4 w-3/4 bg-white/10 rounded" />
              <div className="h-4 w-1/2 bg-white/10 rounded" />
            </div>
          </div>

          {/* Action Bar Skeleton */}
          <div className="flex items-center gap-1 px-4 py-3 border-t border-white/10">
            {[1, 2, 3].map((j) => (
              <div key={j} className="flex items-center gap-2 px-3 py-2 rounded-lg">
                <div className="w-5 h-5 rounded bg-white/10" />
                <div className="h-4 w-4 bg-white/10 rounded" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

interface EmptyFeedStateProps {
  type?: "no_posts" | "network_down" | "error";
}

export function EmptyFeedState({ type = "no_posts" }: EmptyFeedStateProps) {
  const content = {
    no_posts: {
      icon: Radio,
      title: "Hunter Network Silent",
      message: "No broadcasts found. Be the first to share your journey!",
      action: null,
    },
    network_down: {
      icon: Users,
      title: "Network Disconnected",
      message: "Unable to connect to Hunter Network. Please check your connection.",
      action: "Retry",
    },
    error: {
      icon: CheckCircle2,
      title: "Something Went Wrong",
      message: "Failed to load broadcasts. Please try again later.",
      action: "Try Again",
    },
  };

  const current = content[type];

  return (
    <div className="bg-void-panel border-b border-white/10 p-8">
      <div className="text-center py-12">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-system-cyan/10 flex items-center justify-center">
          <current.icon className="w-10 h-10 text-system-cyan" />
        </div>

        <h3 className="text-xl font-display font-bold text-white mb-3">
          {current.title}
        </h3>

        <p className="text-sm text-white/60 mb-6 max-w-xs mx-auto">
          {current.message}
        </p>

        {current.action && (
          <button className="px-6 py-3 bg-system-cyan text-void-deep rounded-lg font-bold hover:bg-system-cyan/90 transition-all shadow-[0_0_15px_rgba(0,255,255,0.3)]">
            {current.action}
          </button>
        )}
      </div>
    </div>
  );
}

interface LoadingPostCardProps {
  isLoading?: boolean;
  children: React.ReactNode;
}

export function LoadingPostCard({ isLoading, children }: LoadingPostCardProps) {
  if (isLoading) {
    return <FeedSkeletonLoader />;
  }

  return <>{children}</>;
}

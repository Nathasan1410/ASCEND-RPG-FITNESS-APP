"use client";

import { Heart, MessageCircle, Share2, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";

// Rank Colors
const rankColors: Record<string, { bg: string; text: string; border: string }> = {
  "E-Rank": { bg: "bg-gray-500/20", text: "text-gray-400", border: "border-gray-500/30" },
  "D-Rank": { bg: "bg-white/20", text: "text-white", border: "border-white/30" },
  "C-Rank": { bg: "bg-cyan-400/20", text: "text-cyan-400", border: "border-cyan-400/30" },
  "B-Rank": { bg: "bg-blue-400/20", text: "text-blue-400", border: "border-blue-400/30" },
  "A-Rank": { bg: "bg-purple-400/20", text: "text-purple-400", border: "border-purple-400/30" },
  "S-Rank": { bg: "bg-yellow-400/20", text: "text-yellow-400", border: "border-yellow-400/30" },
};

// Verification Status Config
const verificationConfig: Record<string, { icon: string; color: string; label: string }> = {
  "Normal": { icon: "👤", color: "text-white/60", label: "Hunter" },
  "Verified": { icon: "✓", color: "text-status-success", label: "Verified Hunter" },
  "Flagged": { icon: "⚠", color: "text-status-warning", label: "Under Review" },
  "Corrupted": { icon: "✖", color: "text-status-danger", label: "Corrupted" },
};

// Post Type Config
const postTypeConfig: Record<string, { label: string; color: string; bg: string }> = {
  "quest_completion": { label: "Quest Complete", color: "text-system-cyan", bg: "bg-system-cyan/10" },
  "rank_up": { label: "Rank Up", color: "text-rank-s", bg: "bg-rank-s/10" },
  "level_up": { label: "Level Up", color: "text-status-warning", bg: "bg-status-warning/10" },
  "achievement": { label: "Achievement", color: "text-purple-400", bg: "bg-purple-400/10" },
  "tip": { label: "Hunter Tip", color: "text-green-400", bg: "bg-green-400/10" },
};

// Class Icons
const classIcons: Record<string, string> = {
  "Novice": "🎯",
  "Striker": "⚡",
  "Tank": "🛡",
  "Assassin": "🗡",
};

interface HunterFeedCardProps {
  post: {
    id: string;
    username: string;
    rank_tier: string;
    hunter_status: string;
    class: string;
    post_type: string;
    content: string;
    activity_data?: {
      quest_name?: string;
      xp_gained?: number;
      duration?: string;
    };
    created_at: string;
    likes_count: number;
    comments_count: number;
  };
}

export function HunterFeedCard({ post }: HunterFeedCardProps) {
  const rankColor = rankColors[post.rank_tier] || rankColors["E-Rank"];
  const verification = verificationConfig[post.hunter_status] || verificationConfig["Normal"];
  const postType = postTypeConfig[post.post_type] || postTypeConfig["quest_completion"];
  const classIcon = classIcons[post.class] || classIcons["Novice"];

  const timeAgo = getTimeAgo(new Date(post.created_at));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="bg-void-panel border-b border-white/10"
    >
      {/* User Header - Strava Style */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          {/* Left: User Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Avatar with Rank Ring */}
            <div className={`relative flex-shrink-0`}>
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center",
                rankColor.bg,
                `ring-2 ${rankColor.border}`
              )}>
                <span className="text-lg font-bold text-white">
                  {post.username[0]?.toUpperCase()}
                </span>
              </div>
              {/* Verification Badge */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-void-deep border-2 border-white/20 flex items-center justify-center">
                <span className="text-[10px]">{verification.icon}</span>
              </div>
            </div>

            {/* User Name + Badges */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                {/* Username */}
                <span className="font-bold text-white truncate">
                  {post.username}
                </span>

                {/* Rank Badge */}
                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide",
                  rankColor.bg,
                  rankColor.text,
                  rankColor.border
                )}>
                  {post.rank_tier.replace("-Rank", "")}
                </span>

                {/* Class Badge */}
                <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-medium text-white/60 border border-white/10">
                  {classIcon} {post.class}
                </span>
              </div>

              {/* Metadata Row */}
              <div className="flex items-center gap-2 mt-1">
                {/* Post Type */}
                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-medium",
                  postType.bg,
                  postType.color
                )}>
                  {postType.label}
                </span>

                {/* Verification Status */}
                <span className={cn("text-[10px] font-medium", verification.color)}>
                  {verification.label}
                </span>

                {/* Timestamp */}
                <span className="text-[10px] text-white/40">
                  {timeAgo}
                </span>
              </div>
            </div>
          </div>

          {/* Right: More Options */}
          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors flex-shrink-0">
            <MoreVertical className="w-4 h-4 text-white/60" />
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-4">
        {/* Text Content */}
        <p className="text-white/90 text-sm leading-relaxed mb-3">
          {post.content}
        </p>

        {/* Activity Data - If quest completion */}
        {post.activity_data && (
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-white">
                {post.activity_data.quest_name || "Unknown Quest"}
              </span>
              {post.activity_data.xp_gained && (
                <span className="px-2 py-0.5 rounded bg-system-cyan/20 text-system-cyan text-xs font-bold">
                  +{post.activity_data.xp_gained} XP
                </span>
              )}
            </div>
            {post.activity_data.duration && (
              <div className="flex items-center gap-2 text-xs text-white/60">
                <span>Duration:</span>
                <span className="text-white font-mono">{post.activity_data.duration}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Bar - Strava Style */}
      <div className="flex items-center gap-1 px-4 py-3 border-t border-white/10">
        <ActionButton icon={Heart} count={post.likes_count} label="Like" active={false} />
        <ActionButton icon={MessageCircle} count={post.comments_count} label="Comment" active={false} />
        <ActionButton icon={Share2} count={0} label="Share" active={false} />
      </div>
    </motion.div>
  );
}

function ActionButton({
  icon: Icon,
  count,
  label,
  active
}: {
  icon: any;
  count?: number;
  label: string;
  active: boolean;
}) {
  return (
    <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors group">
      <Icon className={cn(
        "w-5 h-5 transition-colors",
        active ? "text-system-cyan" : "text-white/60 group-hover:text-white/80"
      )} />
      {count !== undefined && count > 0 && (
        <span className="text-sm font-medium text-white/60">
          {count}
        </span>
      )}
    </button>
  );
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return date.toLocaleDateString();
}

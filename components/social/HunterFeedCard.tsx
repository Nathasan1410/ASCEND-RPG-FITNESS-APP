"use client";

import { motion } from "framer-motion";
import { ThumbsUp, Repeat, MessageCircle, Bookmark, MoreHorizontal, Share2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { HunterPost } from "@/types/social";

interface HunterFeedCardProps {
  post: HunterPost;
}

export function HunterFeedCard({ post }: HunterFeedCardProps) {
  const handleKudos = async () => {
    const { toggleKudos } = await import("@/server/actions/social-actions");
    await toggleKudos(post.id);
  };

  const handleRespect = async () => {
    const { toggleRespect } = await import("@/server/actions/social-actions");
    await toggleRespect(post.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-system-panel border border-white/10 rounded-xl overflow-hidden hover:border-system-cyan/30 transition-all"
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={post.author.avatar_url || "/placeholder-avatar.png"}
              alt={post.author.username}
              className="w-12 h-12 rounded-full border-2 border-white/20"
            />
            {post.author.hunter_status === "Verified" && (
              <div className="absolute -bottom-1 -right-1 bg-rank-a rounded-full p-0.5">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-2m-4 4m0 6 4-2" />
                </svg>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">
                {post.author.username}
              </span>
              <div className={cn(
                "px-2 py-0.5 text-xs font-bold",
                post.author.rank === "S" && "text-rank-s bg-rank-s/20",
                post.author.rank === "A" && "text-rank-a bg-rank-a/20",
                post.author.rank === "B" && "text-rank-b bg-rank-b/20",
                post.author.rank === "C" && "text-rank-c bg-rank-c/20",
                post.author.rank === "D" && "text-rank-d bg-rank-d/20",
                post.author.rank === "E" && "text-rank-e bg-rank-e/20"
              )}>
                {post.author.rank}-RANK
              </div>
            </div>
            <span className="text-sm text-white/40">
              {formatTimeAgo(post.created_at)}
            </span>
          </div>
        </div>

        <button className="text-white/40 hover:text-white">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="px-4 pb-4 space-y-3">
        {post.body && (
          <p className="text-white/90 leading-relaxed">
            {post.body}
          </p>
        )}

        {post.post_type === "quest_completion" && post.quest_data && (
          <div className="bg-void-deep border border-white/10 rounded-lg p-3 space-y-2">
            <h4 className="font-bold text-system-cyan">
              {post.quest_data.name}
            </h4>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-2xl font-bold text-rank-b">
                  +{post.quest_data.xp_earned}
                </div>
                <div className="text-xs text-white/40">XP Earned</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {post.quest_data.duration_min}
                </div>
                <div className="text-xs text-white/40">Minutes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {post.quest_data.exercises_count}
                </div>
                <div className="text-xs text-white/40">Exercises</div>
              </div>
            </div>
          </div>
        )}

        {post.proof_media_url && (
          <div className="rounded-lg overflow-hidden">
            {post.proof_type === "Video" ? (
              <video
                src={post.proof_media_url}
                controls
                className="w-full h-64 object-cover"
              />
            ) : (
              <img
                src={post.proof_media_url}
                alt="Quest proof"
                className="w-full h-64 object-cover"
              />
            )}
          </div>
        )}

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm text-system-cyan/80 hover:text-system-cyan cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="px-4 pb-4 border-t border-white/10 pt-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={handleKudos}
            className={cn(
              "flex items-center gap-2 transition-colors",
              post.user_kudos ? "text-system-cyan" : "text-white/40 hover:text-white/70"
            )}
          >
            <ThumbsUp className={cn("w-5 h-5", post.user_kudos && "fill-current")} />
            <span className="text-sm font-medium">
              {post.kudos_count}
            </span>
          </button>

          <button
            onClick={handleRespect}
            className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
          >
            <Repeat className="w-5 h-5" />
            <span className="text-sm font-medium">
              {post.respects_count}
            </span>
          </button>

          <button className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">
              {post.analysis_count}
            </span>
          </button>
        </div>

        <button className="text-white/40 hover:text-white transition-colors">
          <Bookmark className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: "now", seconds: 0 },
    { label: "1m", seconds: 60 },
    { label: "1h", seconds: 3600 },
    { label: "1d", seconds: 86400 },
    { label: "1w", seconds: 604800 },
    { label: "1mo", seconds: 2592000 },
    { label: "1y", seconds: 31536000 },
  ];

  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];
    if (seconds >= interval.seconds) {
      return interval.label;
    }
  }

  return intervals[intervals.length - 1].label;
}

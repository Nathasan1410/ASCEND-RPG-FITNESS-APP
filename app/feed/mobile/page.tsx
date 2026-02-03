"use client";

import { useState, useEffect } from "react";
import { Radio, Plus, Home, Search, Bell } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { HunterFeedCard } from "@/components/social/HunterFeedCard-Mobile";
import { CreatePostSection } from "@/components/social/CreatePostSection-Mobile";
import { MobileSystemNavbar } from "@/components/layout/MobileSystemNavbar";
import { FeedSkeletonLoader, EmptyFeedState } from "@/components/loading/FeedSkeletonLoader";

export default function MobileFeedPage() {
  const pathname = usePathname();
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Sample posts for demonstration
  const [posts] = useState([
    {
      id: "1",
      username: "ShadowHunter",
      rank_tier: "S-Rank",
      hunter_status: "Verified",
      class: "Assassin",
      post_type: "quest_completion",
      content: "Just completed the Elite S-Rank Survival Protocol! 45 minutes of pure intensity. The System truly knows how to push limits. 💪",
      activity_data: {
        quest_name: "Elite S-Rank Survival Protocol",
        xp_gained: 4200,
        duration: "45 min"
      },
      created_at: new Date(Date.now() - 3600000).toISOString(),
      likes_count: 42,
      comments_count: 7
    },
    {
      id: "2",
      username: "ThunderStrike",
      rank_tier: "A-Rank",
      hunter_status: "Normal",
      class: "Striker",
      post_type: "rank_up",
      content: "Finally achieved A-Rank! 🎉 The grind was real, but totally worth it. Thanks to everyone who supported the journey!",
      created_at: new Date(Date.now() - 7200000).toISOString(),
      likes_count: 128,
      comments_count: 23
    },
    {
      id: "3",
      username: "IronTank",
      rank_tier: "B-Rank",
      hunter_status: "Verified",
      class: "Tank",
      post_type: "tip",
      content: "PRO TIP: For tank builds, focus on form over weight. Slow controlled reps = better strength gains. Don't ego lift! 💡",
      created_at: new Date(Date.now() - 14400000).toISOString(),
      likes_count: 89,
      comments_count: 15
    },
    {
      id: "4",
      username: "SwiftNinja",
      rank_tier: "C-Rank",
      hunter_status: "Normal",
      class: "Assassin",
      post_type: "quest_completion",
      content: "C-Rank Agility Training complete! The speed drills were brutal but my reflexes are definitely improving.",
      activity_data: {
        quest_name: "C-Rank Agility Training",
        xp_gained: 750,
        duration: "30 min"
      },
      created_at: new Date(Date.now() - 28800000).toISOString(),
      likes_count: 34,
      comments_count: 5
    },
  ]);

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => {
      setUsername(data.user?.user_metadata?.username || "");
    });

    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Mobile Navigation Bar with Hamburger Menu */}
      <MobileSystemNavbar />

      {/* Main Content - Strava Layout */}
      <main className="max-w-xl mx-auto">
        {/* Create Post Section - Collapsible */}
        <CreatePostSection username={username} />

        {/* Feed Posts */}
        <div className="space-y-0">
          {loading ? (
            <FeedSkeletonLoader />
          ) : error ? (
            <EmptyFeedState type="error" />
          ) : posts.length === 0 ? (
            <EmptyFeedState type="no_posts" />
          ) : (
            posts.map((post) => (
              <HunterFeedCard key={post.id} post={post} />
            ))
          )}
        </div>
      </main>

      {/* Bottom Navigation - Strava Style */}
      <nav className="fixed bottom-0 left-0 right-0 bg-void-deep/95 backdrop-blur-xl border-t border-white/10 z-50 md:hidden">
        <div className="flex items-center justify-around py-2">
          <Link
            href="/dashboard"
            className="flex flex-col items-center gap-1 px-4 py-2 transition-colors"
          >
            <Home className={cn("w-6 h-6", pathname === "/dashboard" ? "text-system-cyan" : "text-white/50")} />
            <span className={cn("text-[10px] font-medium", pathname === "/dashboard" ? "text-system-cyan" : "text-white/50")}>
              Home
            </span>
          </Link>

          <Link
            href="/feed"
            className="flex flex-col items-center gap-1 px-4 py-2 transition-colors relative"
          >
            <div className="absolute -top-2 bg-system-cyan text-void-deep rounded-full px-3 py-0.5 text-[10px] font-bold">
              NEW
            </div>
            <Radio className={cn("w-6 h-6", pathname === "/feed" ? "text-system-cyan" : "text-white/50")} />
            <span className={cn("text-[10px] font-medium", pathname === "/feed" ? "text-system-cyan" : "text-white/50")}>
              Feed
            </span>
          </Link>

          <Link
            href={`/profile/${username}`}
            className="flex flex-col items-center gap-1 px-4 py-2 transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-system-cyan/20 flex items-center justify-center">
              <span className="text-xs font-bold text-system-cyan">
                {username[0]?.toUpperCase() || "H"}
              </span>
            </div>
            <span className={cn("text-[10px] font-medium", pathname?.includes("/profile") ? "text-system-cyan" : "text-white/50")}>
              You
            </span>
          </Link>

          <Link
            href="/settings"
            className="flex flex-col items-center gap-1 px-4 py-2 transition-colors"
          >
            <Plus className={cn("w-6 h-6", pathname === "/settings" ? "text-system-cyan" : "text-white/50")} />
            <span className={cn("text-[10px] font-medium", pathname === "/settings" ? "text-system-cyan" : "text-white/50")}>
              More
            </span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

import Link from "next/link";

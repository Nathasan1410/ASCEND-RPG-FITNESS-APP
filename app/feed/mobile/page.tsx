"use client";

import { useState, useEffect } from "react";
import { Home, Radio, User, Plus, ArrowRight, Users, Shield, Zap, Clock, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HunterFeedCard } from "@/components/social/HunterFeedCard-Mobile";
import { CreatePostSection } from "@/components/social/CreatePostSection-Mobile";
import { MobileSystemNavbar } from "@/components/layout/MobileSystemNavbar";
import { MobileFilterBar } from "@/components/social/MobileFilterBar";
import { FeedSkeletonLoader, EmptyFeedState } from "@/components/loading/FeedSkeletonLoader";
import { StravaMobileNav } from "@/components/layout/StravaMobileNav";
import { createClient } from "@/lib/supabase/client";
import type { FeedFilters } from "@/types/social";

export default function MobileFeedPage() {
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState<FeedFilters>({
    postType: 'all',
    rankFilter: 'all',
    verifiedOnly: false,
    friendsOnly: false,
    timeRange: 'all',
    guildFilter: null,
  });

  const navItems = [
    {
      id: "home",
      href: "/dashboard",
      label: "Home",
      icon: Home,
    },
    {
      id: "feed",
      href: "/feed/mobile",
      label: "Feed",
      icon: Radio,
      badge: "NEW",
    },
    {
      id: "profile",
      href: `/profile/${username}`,
      label: "You",
      icon: User,
      showAvatar: true,
    },
    {
      id: "settings",
      href: "/settings",
      label: "More",
      icon: Plus,
    },
    {
      id: "help",
      href: "/help",
      label: "Help",
      icon: HelpCircle,
    },
  ];

  // Sample posts for demonstration
  const [posts] = useState([
    {
      id: "1",
      username: "ShadowHunter",
      rank_tier: "S-Rank",
      hunter_status: "Verified",
      class: "Assassin",
      post_type: "quest_completion",
      content: "Just completed Elite S-Rank Survival Protocol! 45 minutes of pure intensity. The System truly knows how to push limits. 💪",
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
      content: "Finally achieved A-Rank! 🎉 The grind was real, but totally worth it. Thanks to everyone who supported my journey!",
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
    {
      id: "5",
      username: "CyberWolf",
      rank_tier: "S-Rank",
      hunter_status: "Verified",
      class: "Striker",
      post_type: "achievement",
      content: "Unlocked 'Speed Demon' achievement! 100 consecutive days of training. The grind never stops!",
      created_at: new Date(Date.now() - 43200000).toISOString(),
      likes_count: 256,
      comments_count: 42
    },
    {
      id: "6",
      username: "FlameKnight",
      rank_tier: "A-Rank",
      hunter_status: "Verified",
      class: "Tank",
      post_type: "quest_completion",
      content: "Tank protocol complete! Heavy lifting day hit PRs on all compounds. 5 plates on deadlift! 🏋️",
      activity_data: {
        quest_name: "Heavy Tank Protocol",
        xp_gained: 3200,
        duration: "60 min"
      },
      created_at: new Date(Date.now() - 54000000).toISOString(),
      likes_count: 167,
      comments_count: 28
    },
    {
      id: "7",
      username: "BladeRunner",
      rank_tier: "B-Rank",
      hunter_status: "Normal",
      class: "Assassin",
      post_type: "level_up",
      content: "Just hit Level 50! Halfway to S-Rank. The grind continues! 🔥",
      created_at: new Date(Date.now() - 64800000).toISOString(),
      likes_count: 95,
      comments_count: 19
    },
    {
      id: "8",
      username: "StormRider",
      rank_tier: "S-Rank",
      hunter_status: "Verified",
      class: "Striker",
      post_type: "tip",
      content: "HIIT TIP: Never skip warm-up. 5 minutes of dynamic stretching prevents injuries and improves performance. Learn from my mistakes! 🚀",
      created_at: new Date(Date.now() - 75600000).toISOString(),
      likes_count: 312,
      comments_count: 45
    },
    {
      id: "9",
      username: "VoidWalker",
      rank_tier: "A-Rank",
      hunter_status: "Normal",
      class: "Assassin",
      post_type: "quest_completion",
      content: "Stealth agility training complete. 200 burpees + 100 pull-ups + 50 pistol squats. My body is broken but my soul is stronger. 😤",
      activity_data: {
        quest_name: "Stealth Agility Protocol",
        xp_gained: 2800,
        duration: "45 min"
      },
      created_at: new Date(Date.now() - 86400000).toISOString(),
      likes_count: 143,
      comments_count: 31
    },
    {
      id: "10",
      username: "IronHeart",
      rank_tier: "B-Rank",
      hunter_status: "Verified",
      class: "Tank",
      post_type: "achievement",
      content: "Earned 'Iron Will' badge! Completed 30-day consistency challenge without missing a single quest. Discipline equals freedom! 💪",
      created_at: new Date(Date.now() - 97200000).toISOString(),
      likes_count: 187,
      comments_count: 38
    },
    {
      id: "11",
      username: "ThunderBolt",
      rank_tier: "S-Rank",
      hunter_status: "Verified",
      class: "Striker",
      post_type: "rank_up",
      content: "S-Rank Achieved! After 2 years of grinding, I made it to the top tier. This is just the beginning! ⚡",
      created_at: new Date(Date.now() - 108000000).toISOString(),
      likes_count: 524,
      comments_count: 89
    },
    {
      id: "12",
      username: "FrostMage",
      rank_tier: "C-Rank",
      hunter_status: "Normal",
      class: "Assassin",
      post_type: "quest_completion",
      content: "Morning cardio session done! 5km run + 30 min HIIT. Starting the day right. Morning warriors rise together! 🌅",
      activity_data: {
        quest_name: "Morning Cardio Blast",
        xp_gained: 1200,
        duration: "40 min"
      },
      created_at: new Date(Date.now() - 118800000).toISOString(),
      likes_count: 67,
      comments_count: 12
    },
    {
      id: "13",
      username: "ShadowBlade",
      rank_tier: "A-Rank",
      hunter_status: "Verified",
      class: "Assassin",
      post_type: "tip",
      content: "STRETCHING TIP: Spend 10 minutes post-workout on static stretching. Recovery is as important as training. Future you will thank you! 🙏",
      created_at: new Date(Date.now() - 130000000).toISOString(),
      likes_count: 234,
      comments_count: 41
    },
    {
      id: "14",
      username: "TitanPunch",
      rank_tier: "B-Rank",
      hunter_status: "Normal",
      class: "Tank",
      post_type: "level_up",
      content: "Level 45 unlocked! New abilities acquired. The quest for S-Rank continues! 🎯",
      created_at: new Date(Date.now() - 141000000).toISOString(),
      likes_count: 78,
      comments_count: 16
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
    <div className="min-h-screen pb-20">
      <div className="md:hidden">
        <MobileSystemNavbar />
      </div>

      {/* Main Content - Strava Layout */}
      <main className="max-w-xl mx-auto md:pt-20">
        {/* Create Post Section - Collapsible */}
        <CreatePostSection username={username} />

        {/* Mobile Filter Bar */}
        <MobileFilterBar
          filters={filters}
          onFiltersChange={setFilters}
        />

        {/* Feed Posts */}
        <div className="space-y-0">
          {loading ? (
            <FeedSkeletonLoader />
          ) : error ? (
            <EmptyFeedState type="error" />
          ) : posts.length === 0 ? (
            <EmptyFeedState type="no_posts" />
          ) : (
            <>
              {posts.map((post) => (
                <HunterFeedCard key={post.id} post={post} />
              ))}

              {/* Development Progress Card - Mobile Version */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-system-panel border border-white/10 rounded-xl p-6 mt-8 mb-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-white text-lg">Development Progress</h3>
                  <span className="bg-system-cyan/10 text-system-cyan text-xs px-3 py-1 rounded-full font-bold">
                    PHASE 7/8
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/60">Analysis & Planning</span>
                      <span className="text-xs font-bold text-green-400">COMPLETE</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/60">Component Updates</span>
                      <span className="text-xs font-bold text-green-400">COMPLETE</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/60">Web Feed Layout</span>
                      <span className="text-xs font-bold text-green-400">COMPLETE</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/60">Feed Card Enhancement</span>
                      <span className="text-xs font-bold text-green-400">COMPLETE</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/60">Sidebar Components</span>
                      <span className="text-xs font-bold text-green-400">COMPLETE</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/60">Interactive Features</span>
                      <span className="text-xs font-bold text-system-cyan">IN PROGRESS</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-system-cyan rounded-full animate-pulse" style={{ width: '30%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/60">Final Polish</span>
                      <span className="text-xs font-bold text-white/50">PENDING</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-white/30 rounded-full" style={{ width: '0%' }} />
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <Link
                    href="/feed/web"
                    className="flex items-center justify-center gap-2 text-sm text-system-cyan hover:text-system-cyan/80 transition-colors"
                  >
                    <span>Try Web Version</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </main>

      <StravaMobileNav navItems={navItems} username={username} />
    </div>
  );
}

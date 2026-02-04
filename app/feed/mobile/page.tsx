"use client";

import { useState, useEffect } from "react";
import { Home, Radio, User, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { HunterFeedCard } from "@/components/social/HunterFeedCard-Mobile";
import { CreatePostSection } from "@/components/social/CreatePostSection-Mobile";
import { MobileSystemNavbar } from "@/components/layout/MobileSystemNavbar";
import { FeedSkeletonLoader, EmptyFeedState } from "@/components/loading/FeedSkeletonLoader";
import { StravaMobileNav } from "@/components/layout/StravaMobileNav";
import { createClient } from "@/lib/supabase/client";

export default function MobileFeedPage() {
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const navItems = [
    {
      id: "home",
      href: "/dashboard",
      label: "Home",
      icon: Home,
    },
    {
      id: "feed",
      href: "/feed",
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

      <StravaMobileNav navItems={navItems} username={username} />
    </div>
  );
}

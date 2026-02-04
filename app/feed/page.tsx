"use client";

import { useState } from "react";
import type { HunterPost } from "@/types/social";
import { HunterFeedCard } from "@/components/social/HunterFeedCard-Mobile";
import { CreatePostSection } from "@/components/social/CreatePostSection-Mobile";

export default function FeedPage() {
  // Sample posts for demonstration (same as mobile)
  const [posts, setPosts] = useState<HunterPost[]>([
    {
      id: "1",
      author: {
        username: "ShadowHunter",
        rank: "S-Rank",
        hunter_status: "Verified",
        avatar_url: null,
      },
      post_type: "quest_completion",
      title: "Elite S-Rank Protocol Complete",
      body: "Just completed Elite S-Rank Survival Protocol! 45 minutes of pure intensity. The System truly knows how to push limits.",
      quest_id: "1",
      quest_data: {
        name: "Elite S-Rank Survival Protocol",
        xp_earned: 4200,
        duration_min: 45,
        exercises_count: 8,
      },
      created_at: new Date(Date.now() - 3600000).toISOString(),
      kudos_count: 42,
      respects_count: 7,
      analysis_count: 0,
      user_kudos: false,
      user_respect: false,
      proof_media_url: null,
      proof_type: "None",
      updated_at: new Date(Date.now() - 3600000).toISOString(),
      tags: [],
    },
    {
      id: "2",
      author: {
        username: "ThunderStrike",
        rank_tier: "A-Rank",
        hunter_status: "Normal",
        avatar_url: null,
      },
      post_type: "rank_up",
      title: "A-Rank Achieved!",
      body: "Finally achieved A-Rank! The grind was real, but totally worth it. Thanks to everyone who supported my journey!",
      quest_id: null,
      quest_data: null,
      created_at: new Date(Date.now() - 7200000).toISOString(),
      kudos_count: 128,
      respects_count: 23,
      analysis_count: 0,
      user_kudos: false,
      user_respect: false,
      proof_media_url: null,
      proof_type: "None",
      updated_at: new Date(Date.now() - 7200000).toISOString(),
      tags: [],
    },
    {
      id: "3",
      author: {
        username: "IronTank",
        rank_tier: "B-Rank",
        hunter_status: "Verified",
        avatar_url: null,
      },
      post_type: "tip",
      title: "Tank Build Tip",
      body: "PRO TIP: For tank builds, focus on form over weight. Slow controlled reps = better strength gains. Don't ego lift!",
      quest_id: null,
      quest_data: null,
      created_at: new Date(Date.now() - 14400000).toISOString(),
      kudos_count: 89,
      respects_count: 15,
      analysis_count: 0,
      user_kudos: false,
      user_respect: false,
      proof_media_url: null,
      proof_type: "None",
      updated_at: new Date(Date.now() - 14400000).toISOString(),
      tags: [],
    },
    {
      id: "4",
      author: {
        username: "SwiftNinja",
        rank_tier: "C-Rank",
        hunter_status: "Normal",
        avatar_url: null,
      },
      post_type: "quest_completion",
      title: "Agility Training Complete",
      body: "C-Rank Agility Training complete! The speed drills were brutal but my reflexes are definitely improving.",
      quest_id: "2",
      quest_data: {
        name: "C-Rank Agility Training",
        xp_earned: 750,
        duration_min: 30,
        exercises_count: 6,
      },
      created_at: new Date(Date.now() - 28800000).toISOString(),
      kudos_count: 34,
      respects_count: 5,
      analysis_count: 0,
      user_kudos: false,
      user_respect: false,
      proof_media_url: null,
      proof_type: "None",
      updated_at: new Date(Date.now() - 28800000).toISOString(),
      tags: [],
    },
    {
      id: "5",
      author: {
        username: "CyberWolf",
        rank_tier: "S-Rank",
        hunter_status: "Verified",
        avatar_url: null,
      },
      post_type: "achievement",
      title: "Speed Demon Achievement",
      body: "Unlocked the 'Speed Demon' achievement! 100 consecutive days of training. The grind never stops!",
      quest_id: null,
      quest_data: null,
      created_at: new Date(Date.now() - 43200000).toISOString(),
      kudos_count: 256,
      respects_count: 42,
      analysis_count: 0,
      user_kudos: false,
      user_respect: false,
      proof_media_url: null,
      proof_type: "None",
      updated_at: new Date(Date.now() - 43200000).toISOString(),
      tags: [],
    },
  ]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        <CreatePostSection username="Hunter" onPostCreated={() => {}} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-4 lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">Hunter Network</h2>
            <div className="space-y-4">
              {posts.map((post) => (
                <HunterFeedCard key={post.id} post={post} />
              ))}
            </div>
          </div>
          
          <div className="hidden lg:block space-y-4">
            <div className="bg-system-panel border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Trending</h3>
              <div className="space-y-3">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-sm text-white/80 mb-1">#RankUpGoals</div>
                  <div className="text-xs text-white/60">128 posts</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-sm text-white/80 mb-1">#ProgressMonday</div>
                  <div className="text-xs text-white/60">256 posts</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-sm text-white/80 mb-1">#StrengthChallenge</div>
                  <div className="text-xs text-white/60">89 posts</div>
                </div>
              </div>
            </div>
            
            <div className="bg-system-panel border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-system-cyan">1,234</div>
                  <div className="text-xs text-white/60">Active Hunters</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-system-cyan">5,678</div>
                  <div className="text-xs text-white/60">Posts Today</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-system-cyan">42</div>
                  <div className="text-xs text-white/60">S-Rank Hunters</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-system-cyan">8,901</div>
                  <div className="text-xs text-white/60">Verified Hunters</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

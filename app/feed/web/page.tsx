"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Radio, Home, Users, Zap, Shield, ArrowRight, Wrench, Clock, ThumbsUp, MessageCircle, Bookmark } from "lucide-react";
import Link from "next/link";
import { HunterFeedCard } from "@/components/social/HunterFeedCard";
import type { HunterPost } from "@/types/social";
import { SystemNavbar } from "@/components/layout/SystemNavbar";

export default function WebFeedPlaceholderPage() {
  const [posts] = useState<HunterPost[]>([
    {
      id: "1",
      author: {
        username: "ShadowHunter",
        rank: "S",
        hunter_status: "Verified",
        avatar_url: null,
      },
      post_type: "quest_completion",
      title: "Elite S-Rank Protocol Complete",
      body: "Just completed Elite S-Rank Survival Protocol! 45 minutes of pure intensity. The System truly knows how to push limits. 💪",
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
        rank: "A",
        hunter_status: "Normal",
        avatar_url: null,
      },
      post_type: "rank_up",
      title: "A-Rank Achieved!",
      body: "Finally achieved A-Rank! 🎉 The grind was real, but totally worth it. Thanks to everyone who supported my journey!",
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
        rank: "B",
        hunter_status: "Verified",
        avatar_url: null,
      },
      post_type: "tip",
      title: "Tank Build Tip",
      body: "PRO TIP: For tank builds, focus on form over weight. Slow controlled reps = better strength gains. Don't ego lift! 💡",
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
        rank: "C",
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
        rank: "S",
        hunter_status: "Verified",
        avatar_url: null,
      },
      post_type: "achievement",
      title: "Speed Demon Achievement",
      body: "Unlocked 'Speed Demon' achievement! 100 consecutive days of training. The grind never stops!",
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
      <SystemNavbar />

      {/* Main Content - 3 Column Strava Layout */}
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Navigation */}
            <aside className="hidden lg:block space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass-card p-6"
              >
                <h3 className="font-display font-bold text-white text-lg mb-4">Navigation</h3>
                <nav className="space-y-3">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <Home className="w-5 h-5 text-gray-400 group-hover:text-system-cyan transition-colors" />
                    <span className="text-sm text-white/70 group-hover:text-white">Dashboard</span>
                  </Link>
                  <Link
                    href="/feed/mobile"
                    className="flex items-center gap-3 p-3 rounded-lg bg-system-cyan/5 border border-system-cyan/20"
                  >
                    <Radio className="w-5 h-5 text-system-cyan" />
                    <span className="text-sm text-system-cyan font-medium">Mobile Feed</span>
                    <span className="ml-auto bg-green-500/20 text-green-400 text-[10px] px-2 py-0.5 rounded-full font-bold">
                      LIVE
                    </span>
                  </Link>
                  <div className="flex items-center gap-3 p-3 rounded-lg text-gray-400 cursor-not-allowed">
                    <Radio className="w-5 h-5" />
                    <span className="text-sm font-medium">Hunter Network</span>
                    <span className="ml-auto bg-yellow-500/20 text-yellow-400 text-[10px] px-2 py-0.5 rounded-full font-bold">
                      SOON
                    </span>
                  </div>
                  <Link
                    href="/dashboard/leaderboard"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <Shield className="w-5 h-5 text-gray-400 group-hover:text-system-cyan transition-colors" />
                    <span className="text-sm text-white/70 group-hover:text-white">Leaderboard</span>
                  </Link>
                </nav>
              </motion.div>

              {/* User Stats Preview */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-card p-6"
              >
                <h3 className="font-display font-bold text-white text-lg mb-4">Your Progress</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Current Rank</span>
                    <span className="text-sm font-bold text-yellow-400">C-Rank</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Total XP</span>
                    <span className="text-sm font-bold text-system-cyan">12,450</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Level</span>
                    <span className="text-sm font-bold text-white">24</span>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <Link
                      href="/dashboard"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-gradient-to-r from-system-cyan/20 to-system-cyan/10 hover:from-system-cyan/30 hover:to-system-cyan/20 border border-system-cyan/30 transition-all"
                    >
                      <Wrench className="w-4 h-4 text-system-cyan" />
                      <span className="text-sm font-medium text-system-cyan">View Full Stats</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </aside>

            {/* Center Column - Feed Preview + Coming Soon */}
            <main className="lg:col-span-2 space-y-6">
              {/* Feed Preview Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4"
              >
                <div className="glass-card p-4 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Radio className="w-5 h-5 text-system-cyan" />
                      <h2 className="font-display font-bold text-white text-lg">
                        Feed Preview
                      </h2>
                    </div>
                    <div className="flex items-center gap-2 bg-system-cyan/10 border border-system-cyan/30 rounded-full px-3 py-1">
                      <Clock className="w-4 h-4 text-system-cyan" />
                      <span className="text-xs font-bold text-system-cyan">SAMPLE DATA</span>
                    </div>
                  </div>
                  <p className="text-sm text-white/60 mb-4">
                    This is a preview of what the Hunter Network feed will look like. Posts below are sample/demo data for UI demonstration purposes.
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-white/50">{posts.reduce((acc, post) => acc + post.kudos_count, 0)} total Kudos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-system-cyan" />
                      <span className="text-xs text-white/50">{posts.reduce((acc, post) => acc + post.respects_count, 0)} total Comments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bookmark className="w-4 h-4 text-purple-400" />
                      <span className="text-xs text-white/50">{posts.length} Posts</span>
                    </div>
                  </div>
                </div>

                {posts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                  >
                    <HunterFeedCard post={post} />
                  </motion.div>
                ))}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="glass-card p-12 text-center"
              >
                {/* Icon */}
                <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-system-cyan/10 to-blue-600/10 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-system-cyan/20 to-blue-600/20 flex items-center justify-center">
                    <Radio className="w-8 h-8 text-system-cyan" />
                  </div>
                </div>

                {/* Title */}
                <h1 className="font-display font-bold text-white text-3xl mb-4">
                  Hunter Network
                </h1>

                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-2 mb-6">
                  <Clock className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-bold text-yellow-400">Under Development</span>
                </div>

                {/* Description */}
                <p className="text-lg text-white/70 mb-6 max-w-md mx-auto">
                  The Hunter Network social feed is being built to connect hunters across all ranks. Share your training journey, celebrate achievements, and build your reputation in the community.
                </p>

                {/* Features List */}
                <div className="max-w-md mx-auto mb-8 text-left">
                  <h3 className="font-display font-bold text-white text-base mb-4">Coming Soon:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-system-cyan/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Radio className="w-3 h-3 text-system-cyan" />
                      </div>
                      <span className="text-sm text-white/70">Social feed with Strava-inspired design</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-system-cyan/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Users className="w-3 h-3 text-system-cyan" />
                      </div>
                      <span className="text-sm text-white/70">Follow and connect with other hunters</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-system-cyan/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Shield className="w-3 h-3 text-system-cyan" />
                      </div>
                      <span className="text-sm text-white/70">Hunter reputation and verification system</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-system-cyan/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Zap className="w-3 h-3 text-system-cyan" />
                      </div>
                      <span className="text-sm text-white/70">Share achievements and rank-up moments</span>
                    </li>
                  </ul>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <Link
                    href="/feed/mobile"
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-gradient-to-r from-system-cyan to-blue-600 hover:from-system-cyan/90 hover:to-blue-600/90 shadow-neon-blue transition-all"
                  >
                    <Radio className="w-5 h-5" />
                    <span className="font-bold text-white">Try Mobile Feed</span>
                  </Link>
                  <Link
                    href="/dashboard"
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                  >
                    <Home className="w-5 h-5 text-gray-300" />
                    <span className="font-medium text-white/80">Return to Dashboard</span>
                  </Link>
                </div>
              </motion.div>

              {/* Progress Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-white text-lg">Development Progress</h3>
                  <span className="bg-system-cyan/10 text-system-cyan text-xs px-3 py-1 rounded-full font-bold">
                    PHASE 1/8
                  </span>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Analysis & Planning</span>
                      <span className="text-xs font-bold text-green-400">COMPLETE</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Component Updates</span>
                      <span className="text-xs font-bold text-system-cyan">IN PROGRESS</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-system-cyan rounded-full animate-pulse" style={{ width: '40%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Web Feed Layout</span>
                      <span className="text-xs font-bold text-gray-500">PENDING</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gray-500 rounded-full" style={{ width: '0%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Feed Card Enhancement</span>
                      <span className="text-xs font-bold text-gray-500">PENDING</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gray-500 rounded-full" style={{ width: '0%' }} />
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 text-center">
                  <Link
                    href="/feed/mobile"
                    className="inline-flex items-center gap-2 text-sm text-system-cyan hover:text-system-cyan/80 transition-colors"
                  >
                    <span>View detailed development plan</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </main>

            {/* Right Sidebar - Placeholder */}
            <aside className="hidden lg:block space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass-card p-6"
              >
                <h3 className="font-display font-bold text-white text-lg mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="bg-system-panel/50 rounded-lg p-4">
                    <p className="text-xs text-gray-400 mb-1">Total Hunters</p>
                    <p className="text-2xl font-bold text-white">1,247</p>
                  </div>
                  <div className="bg-system-panel/50 rounded-lg p-4">
                    <p className="text-xs text-gray-400 mb-1">Active Today</p>
                    <p className="text-2xl font-bold text-green-400">847</p>
                  </div>
                  <div className="bg-system-panel/50 rounded-lg p-4">
                    <p className="text-xs text-gray-400 mb-1">Posts This Week</p>
                    <p className="text-2xl font-bold text-system-cyan">2,391</p>
                  </div>
                </div>
              </motion.div>

              {/* Beta Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="font-display font-bold text-white text-base mb-2">Beta Phase</h3>
                <p className="text-sm text-white/60 mb-4">
                  Hunter Network is currently in development. Features and design may change based on hunter feedback.
                </p>
                <Link
                  href="/feed/mobile"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 transition-all"
                >
                  <span className="text-sm font-medium text-purple-400">Join Beta Testing</span>
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                </Link>
              </motion.div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

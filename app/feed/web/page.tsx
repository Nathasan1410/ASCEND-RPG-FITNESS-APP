"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Radio, Home, Users, Zap, Shield, ArrowRight, Wrench, Clock, ThumbsUp, MessageCircle, Bookmark, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { HunterFeedCard } from "@/components/social/HunterFeedCard";
import type { HunterPost } from "@/types/social";
import { SystemNavbar } from "@/components/layout/SystemNavbar";
import { LeftSidebar } from "@/components/layout/LeftSidebar";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { cn } from "@/lib/utils/cn";

export default function WebFeedPlaceholderPage() {
  const [leftSidebarVisible, setLeftSidebarVisible] = useState(true);
  const [rightSidebarVisible, setRightSidebarVisible] = useState(true);
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
    {
      id: "6",
      author: {
        username: "FlameKnight",
        rank: "A",
        hunter_status: "Verified",
        avatar_url: null,
      },
      post_type: "quest_completion",
      title: "Heavy Tank Protocol Complete",
      body: "Tank protocol complete! Heavy lifting day hit PRs on all compounds. 5 plates on deadlift! 🏋️",
      quest_id: "6",
      quest_data: {
        name: "Heavy Tank Protocol",
        xp_earned: 3200,
        duration_min: 60,
        exercises_count: 6,
      },
      created_at: new Date(Date.now() - 54000000).toISOString(),
      kudos_count: 167,
      respects_count: 28,
      analysis_count: 0,
      user_kudos: false,
      user_respect: false,
      proof_media_url: null,
      proof_type: "None",
      updated_at: new Date(Date.now() - 54000000).toISOString(),
      tags: [],
    },
    {
      id: "7",
      author: {
        username: "BladeRunner",
        rank: "B",
        hunter_status: "Normal",
        avatar_url: null,
      },
      post_type: "level_up",
      title: "Level 50 Achieved!",
      body: "Just hit Level 50! Halfway to S-Rank. The grind continues! 🔥",
      quest_id: null,
      quest_data: null,
      created_at: new Date(Date.now() - 64800000).toISOString(),
      kudos_count: 95,
      respects_count: 19,
      analysis_count: 0,
      user_kudos: false,
      user_respect: false,
      proof_media_url: null,
      proof_type: "None",
      updated_at: new Date(Date.now() - 64800000).toISOString(),
      tags: [],
    },
    {
      id: "8",
      author: {
        username: "StormRider",
        rank: "S",
        hunter_status: "Verified",
        avatar_url: null,
      },
      post_type: "tip",
      title: "HIIT Training Tips",
      body: "HIIT TIP: Never skip warm-up. 5 minutes of dynamic stretching prevents injuries and improves performance. Learn from my mistakes! 🚀",
      quest_id: null,
      quest_data: null,
      created_at: new Date(Date.now() - 75600000).toISOString(),
      kudos_count: 312,
      respects_count: 45,
      analysis_count: 0,
      user_kudos: false,
      user_respect: false,
      proof_media_url: null,
      proof_type: "None",
      updated_at: new Date(Date.now() - 75600000).toISOString(),
      tags: [],
    },
    {
      id: "9",
      author: {
        username: "VoidWalker",
        rank: "A",
        hunter_status: "Normal",
        avatar_url: null,
      },
      post_type: "quest_completion",
      title: "Stealth Agility Complete",
      body: "Stealth agility training complete. 200 burpees + 100 pull-ups + 50 pistol squats. My body is broken but my soul is stronger. 😤",
      quest_id: "9",
      quest_data: {
        name: "Stealth Agility Protocol",
        xp_earned: 2800,
        duration_min: 45,
        exercises_count: 5,
      },
      created_at: new Date(Date.now() - 86400000).toISOString(),
      kudos_count: 143,
      respects_count: 31,
      analysis_count: 0,
      user_kudos: false,
      user_respect: false,
      proof_media_url: null,
      proof_type: "None",
      updated_at: new Date(Date.now() - 86400000).toISOString(),
      tags: [],
    },
    {
      id: "10",
      author: {
        username: "IronHeart",
        rank: "B",
        hunter_status: "Verified",
        avatar_url: null,
      },
      post_type: "achievement",
      title: "Iron Will Badge Earned",
      body: "Earned 'Iron Will' badge! Completed 30-day consistency challenge without missing a single quest. Discipline equals freedom! 💪",
      quest_id: null,
      quest_data: null,
      created_at: new Date(Date.now() - 97200000).toISOString(),
      kudos_count: 187,
      respects_count: 38,
      analysis_count: 0,
      user_kudos: false,
      user_respect: false,
      proof_media_url: null,
      proof_type: "None",
      updated_at: new Date(Date.now() - 97200000).toISOString(),
      tags: [],
    },
    {
      id: "11",
      author: {
        username: "ThunderBolt",
        rank: "S",
        hunter_status: "Verified",
        avatar_url: null,
      },
      post_type: "rank_up",
      title: "S-Rank Achieved!",
      body: "S-Rank Achieved! After 2 years of grinding, I made it to the top tier. This is just the beginning! ⚡",
      quest_id: null,
      quest_data: null,
      created_at: new Date(Date.now() - 108000000).toISOString(),
      kudos_count: 524,
      respects_count: 89,
      analysis_count: 0,
      user_kudos: false,
      user_respect: false,
      proof_media_url: null,
      proof_type: "None",
      updated_at: new Date(Date.now() - 108000000).toISOString(),
      tags: [],
    },
    {
      id: "12",
      author: {
        username: "FrostMage",
        rank: "C",
        hunter_status: "Normal",
        avatar_url: null,
      },
      post_type: "quest_completion",
      title: "Morning Cardio Blast",
      body: "Morning cardio session done! 5km run + 30 min HIIT. Starting the day right. Morning warriors rise together! 🌅",
      quest_id: "12",
      quest_data: {
        name: "Morning Cardio Blast",
        xp_earned: 1200,
        duration_min: 40,
        exercises_count: 3,
      },
      created_at: new Date(Date.now() - 118800000).toISOString(),
      kudos_count: 67,
      respects_count: 12,
      analysis_count: 0,
      user_kudos: false,
      user_respect: false,
      proof_media_url: null,
      proof_type: "None",
      updated_at: new Date(Date.now() - 118800000).toISOString(),
      tags: [],
    },
    {
      id: "13",
      author: {
        username: "ShadowBlade",
        rank: "A",
        hunter_status: "Verified",
        avatar_url: null,
      },
      post_type: "tip",
      title: "Stretching Recovery Tip",
      body: "STRETCHING TIP: Spend 10 minutes post-workout on static stretching. Recovery is as important as training. Future you will thank you! 🙏",
      quest_id: null,
      quest_data: null,
      created_at: new Date(Date.now() - 130000000).toISOString(),
      kudos_count: 234,
      respects_count: 41,
      analysis_count: 0,
      user_kudos: false,
      user_respect: false,
      proof_media_url: null,
      proof_type: "None",
      updated_at: new Date(Date.now() - 130000000).toISOString(),
      tags: [],
    },
    {
      id: "14",
      author: {
        username: "TitanPunch",
        rank: "B",
        hunter_status: "Normal",
        avatar_url: null,
      },
      post_type: "level_up",
      title: "Level 45 Unlocked",
      body: "Level 45 unlocked! New abilities acquired. The quest for S-Rank continues! 🎯",
      quest_id: null,
      quest_data: null,
      created_at: new Date(Date.now() - 141000000).toISOString(),
      kudos_count: 78,
      respects_count: 16,
      analysis_count: 0,
      user_kudos: false,
      user_respect: false,
      proof_media_url: null,
      proof_type: "None",
      updated_at: new Date(Date.now() - 141000000).toISOString(),
      tags: [],
    },
  ]);

  return (
    <div className="min-h-screen">
      <SystemNavbar />

      {/* Fixed Toggle Buttons - Persistent on Scroll */}
      <div className="fixed left-1 top-24 z-50 flex flex-col items-center gap-1">
        <div className="flex flex-col items-center gap-1">
          <button
            onClick={() => setLeftSidebarVisible(!leftSidebarVisible)}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-1.5 rounded-r-lg text-sm font-medium transition-all shadow-lg",
              leftSidebarVisible
                ? "bg-system-cyan/10 text-system-cyan hover:bg-system-cyan/20"
                : "bg-void-deep/95 backdrop-blur-xl border-r border-white/10 text-white hover:bg-white/10"
            )}
          >
            <span className="text-xs font-bold tracking-wider whitespace-nowrap">
              {leftSidebarVisible ? '<' : '>'}
            </span>
            <span className="text-xs font-bold tracking-wider whitespace-nowrap">
              {leftSidebarVisible ? 'H' : 'S'}
            </span>
            <span className="text-xs font-bold tracking-wider whitespace-nowrap">
              {leftSidebarVisible ? 'I' : 'H'}
            </span>
            <span className="text-xs font-bold tracking-wider whitespace-nowrap">
              {leftSidebarVisible ? 'D' : 'O'}
            </span>
            <span className="text-xs font-bold tracking-wider whitespace-nowrap">
              {leftSidebarVisible ? 'E' : 'W'}
            </span>
          </button>
          <div className="flex gap-0.5 text-[6px] text-white/20 font-mono">RIGHT</div>
          <div className="flex gap-0.5 text-[6px] text-white/20 font-mono">SIDEBAR</div>
        </div>
      </div>

      <div className="fixed right-1 top-24 z-50 flex flex-col items-center gap-1">
        <div className="flex flex-col items-center gap-1">
          <div className="flex gap-0.5 text-[6px] text-white/20 font-mono">RIGHT</div>
          <div className="flex gap-0.5 text-[6px] text-white/20 font-mono">SIDEBAR</div>
          <button
            onClick={() => setRightSidebarVisible(!rightSidebarVisible)}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-1.5 rounded-l-lg text-sm font-medium transition-all shadow-lg",
              rightSidebarVisible
                ? "bg-system-cyan/10 text-system-cyan hover:bg-system-cyan/20"
                : "bg-void-deep/95 backdrop-blur-xl border-l border-white/10 text-white hover:bg-white/10"
            )}
          >
            <span className="text-xs font-bold tracking-wider whitespace-nowrap">
              {rightSidebarVisible ? '>' : '<'}
            </span>
            <span className="text-xs font-bold tracking-wider whitespace-nowrap">
              {rightSidebarVisible ? 'H' : 'S'}
            </span>
            <span className="text-xs font-bold tracking-wider whitespace-nowrap">
              {rightSidebarVisible ? 'I' : 'H'}
            </span>
            <span className="text-xs font-bold tracking-wider whitespace-nowrap">
              {rightSidebarVisible ? 'D' : 'O'}
            </span>
            <span className="text-xs font-bold tracking-wider whitespace-nowrap">
              {rightSidebarVisible ? 'E' : 'W'}
            </span>
          </button>
        </div>
      </div>

      {/* Main Content - 3 Column Strava Layout */}
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 relative">
            {/* Left Sidebar - Phase VII Components */}
            <div className={cn(
              "lg:w-80 lg:shrink-0 relative",
              !leftSidebarVisible && "hidden lg:block lg:w-0 lg:p-0"
            )}>
              <LeftSidebar collapsed={!leftSidebarVisible} />
            </div>

            {/* Center Column - Feed Preview + Coming Soon */}
            <main className="space-y-6 max-w-2xl mx-auto w-full flex-1">
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
                    className="w-full max-w-2xl mx-auto"
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
                    PHASE 7/8
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
                      <span className="text-xs font-bold text-green-400">COMPLETE</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Web Feed Layout</span>
                      <span className="text-xs font-bold text-green-400">COMPLETE</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Feed Card Enhancement</span>
                      <span className="text-xs font-bold text-green-400">COMPLETE</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Sidebar Components</span>
                      <span className="text-xs font-bold text-green-400">COMPLETE</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Interactive Features</span>
                      <span className="text-xs font-bold text-system-cyan">IN PROGRESS</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-system-cyan rounded-full animate-pulse" style={{ width: '30%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Final Polish</span>
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

            {/* Right Sidebar - Phase VII Components */}
            <div className={cn(
              "lg:w-80 lg:shrink-0 relative",
              !rightSidebarVisible && "hidden lg:block lg:w-0 lg:p-0"
            )}>
              {/* Toggle Button - Stacked with Sidebar */}
              <RightSidebar collapsed={!rightSidebarVisible} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

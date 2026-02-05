"use client";

import { useState } from "react";
import { Search, HelpCircle, BookOpen, Layout, Zap, Users, MessageCircle, Play, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const helpCategories = [
    {
      id: "getting-started",
      title: "Getting Started",
      description: "New to ASCEND? Start here to learn the basics.",
      icon: BookOpen,
      color: "text-system-cyan",
      bgColor: "bg-system-cyan/10",
      link: "/help/getting-started",
    },
    {
      id: "ui-ux",
      title: "UI/UX Guide",
      description: "Learn how to navigate and use the app effectively.",
      icon: Layout,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      link: "/help/ui-ux",
    },
    {
      id: "features",
      title: "Features",
      description: "Explore all features and how they work.",
      icon: Zap,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      link: "/help/features",
    },
    {
      id: "opik",
      title: "Opik Monitoring",
      description: "Learn how we use Opik to improve your experience.",
      icon: MessageCircle,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      link: "/help/opik",
    },
    {
      id: "demo-accounts",
      title: "Demo Accounts",
      description: "Try ASCEND with pre-configured hunter accounts.",
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      link: "/help/demo-accounts",
    },
    {
      id: "faq",
      title: "FAQ",
      description: "Find answers to frequently asked questions.",
      icon: HelpCircle,
      color: "text-pink-400",
      bgColor: "bg-pink-400/10",
      link: "/help/faq",
    },
  ];

  const featuredGuides = [
    {
      id: 1,
      title: "How to Complete Your First Quest",
      category: "Getting Started",
      readTime: "5 min",
    },
    {
      id: 2,
      title: "Understanding the Hunter Ranking System",
      category: "Features",
      readTime: "3 min",
    },
    {
      id: 3,
      title: "Opik: How We Monitor and Improve",
      category: "Opik Monitoring",
      readTime: "4 min",
    },
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-void-deep/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="mb-4">
            <Link href="/" className="text-white/60 hover:text-white transition-colors">
              ← Back to Dashboard
            </Link>
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            Help Center
          </h1>
          <p className="text-white/60">
            Find guides, tutorials, and answers to your questions.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-void-panel/50 backdrop-blur-xl border border-white/10 rounded-2xl px-12 py-4 text-white placeholder:text-white/40 focus:border-system-cyan focus:outline-none transition-all"
            />
          </div>
        </motion.div>

        {/* Video Section - Pitch & Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pitch Video */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                    <Play className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      Why ASCEND Matters
                    </h3>
                    <p className="text-sm text-white/60">
                      Our vision for transforming fitness into an epic adventure
                    </p>
                  </div>
                </div>

                {/* YouTube Embed Placeholder */}
                <div className="relative w-full aspect-video bg-void-deep/80 rounded-xl overflow-hidden mb-4 group cursor-pointer">
                  {/* Thumbnail placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border-2 border-white/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-white fill-white" />
                      </div>
                      <p className="text-sm text-white/80 font-medium">
                        Watch Pitch Video
                      </p>
                      <p className="text-xs text-white/50 mt-1">
                        2 min • English
                      </p>
                    </div>
                  </div>
                  {/* YouTube embed will replace this */}
                  {/* <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/[VIDEO_ID]"
                    title="ASCEND Pitch Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  /> */}
                </div>

                <p className="text-sm text-white/70 leading-relaxed">
                  Discover how ASCEND gamifies your fitness journey with AI-powered quests, social competition, and real-time feedback. Turn your workouts into epic adventures!
                </p>
              </div>
            </motion.div>

            {/* Demo Video */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-system-cyan/10 to-blue-600/10 border border-system-cyan/30 rounded-2xl overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-system-cyan/20 to-blue-600/20 border border-system-cyan/30 flex items-center justify-center flex-shrink-0">
                    <Play className="w-6 h-6 text-system-cyan" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      See ASCEND in Action
                    </h3>
                    <p className="text-sm text-white/60">
                      Quick walkthrough of all features and how to use them
                    </p>
                  </div>
                </div>

                {/* YouTube Embed Placeholder */}
                <div className="relative w-full aspect-video bg-void-deep/80 rounded-xl overflow-hidden mb-4 group cursor-pointer">
                  {/* Thumbnail placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/50 to-blue-900/50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border-2 border-white/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-white fill-white" />
                      </div>
                      <p className="text-sm text-white/80 font-medium">
                        Watch Demo
                      </p>
                      <p className="text-xs text-white/50 mt-1">
                        5 min • Complete walkthrough
                      </p>
                    </div>
                  </div>
                  {/* YouTube embed will replace this */}
                  {/* <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/[VIDEO_ID]"
                    title="ASCEND Demo Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  /> */}
                </div>

                <p className="text-sm text-white/70 leading-relaxed mb-4">
                  From generating AI quests to climbing the leaderboard, see everything ASCEND has to offer. Perfect for new users!
                </p>

                <Link
                  href="/help/demo-accounts"
                  className="inline-flex items-center gap-2 text-sm font-bold text-system-cyan hover:text-white transition-colors"
                >
                  Try Demo Accounts
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Help Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-xl font-bold text-white mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Link key={category.id} href={category.link}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    className="bg-void-deep/50 border border-white/10 rounded-2xl p-6 hover:border-system-cyan/30 hover:bg-white/5 transition-all group cursor-pointer"
                  >
                    <div className={cn(
                      "w-14 h-14 rounded-xl flex items-center justify-center mb-4",
                      category.bgColor
                    )}>
                      <Icon className={cn("w-7 h-7", category.color)} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-system-cyan transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-sm text-white/60">
                      {category.description}
                    </p>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* Featured Guides */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-bold text-white mb-6">Featured Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredGuides.map((guide, index) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-void-deep/50 border border-white/10 rounded-xl p-6 hover:border-system-cyan/20 hover:bg-white/5 transition-all cursor-pointer"
              >
                <div className="text-xs font-bold text-system-cyan mb-2">
                  {guide.category}
                </div>
                <h3 className="text-base font-bold text-white mb-3">
                  {guide.title}
                </h3>
                <div className="text-sm text-white/40">
                  {guide.readTime} read
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-gradient-to-br from-system-cyan/5 to-blue-600/5 border border-system-cyan/20 rounded-2xl p-8">
            <h3 className="text-lg font-bold text-white mb-3">
              Need Help with Your Account?
            </h3>
            <p className="text-sm text-white/60 mb-4">
              Having trouble logging in or managing your profile? Check our account guides for help.
            </p>
            <Link
              href="/help/features#account"
              className="inline-flex items-center gap-2 text-sm font-bold text-system-cyan hover:text-white transition-colors"
            >
              View Account Guides
              <HelpCircle className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20 rounded-2xl p-8">
            <h3 className="text-lg font-bold text-white mb-3">
              Explore Development Progress
            </h3>
            <p className="text-sm text-white/60 mb-4">
              See what features are available and what's coming next for ASCEND.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/roadmap"
                className="inline-flex items-center gap-2 text-sm font-bold text-purple-400 hover:text-white transition-colors"
              >
                View Roadmap
              </Link>
              <Link
                href="/tracker"
                className="inline-flex items-center gap-2 text-sm font-bold text-purple-400 hover:text-white transition-colors"
              >
                View Tracker
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20 rounded-2xl p-8">
            <h3 className="text-lg font-bold text-white mb-3">
              New to ASCEND?
            </h3>
            <p className="text-sm text-white/60 mb-4">
              Start your fitness RPG journey with our getting started guide.
            </p>
            <Link
              href="/help/getting-started"
              className="inline-flex items-center gap-2 text-sm font-bold text-purple-400 hover:text-white transition-colors"
            >
              Start Learning
              <BookOpen className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-white/60 mb-4">
            Can't find what you're looking for?
          </p>
          <a
            href="mailto:support@ascend.fitness"
            className="inline-flex items-center gap-2 px-6 py-3 bg-system-cyan hover:bg-system-cyan/90 text-void-deep rounded-lg font-bold transition-all"
          >
            Contact Support
            <MessageCircle className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}

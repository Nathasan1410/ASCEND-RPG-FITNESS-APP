"use client";

import { useState } from "react";
import { Sparkles, Crown, Lock, Zap, Shield, MessageCircle, BarChart3, Apple, Scale, Users, TrendingUp, Check, X, Star, Target, ArrowRight, Info, Trophy, Video, DollarSign, PieChart, LineChart, ChevronRight, Calendar, CheckCircle2, Clock, Code } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { getFeatureById } from "@/components/roadmap/feature-utils";
import { FeatureTimeline } from "@/components/roadmap/FeatureTimeline";
import { FeatureMilestones } from "@/components/roadmap/FeatureMilestones";
import { FeatureImplementationTracker } from "@/components/roadmap/FeatureImplementationTracker";

export default function MonetizationSystemPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const feature = getFeatureById('monetization-system');

  const plans = [
    {
      id: "free",
      name: "Free Hunter",
      tagline: "Start Your Journey",
      icon: Target,
      color: "text-gray-400",
      bgColor: "bg-gray-400/10",
      borderColor: "border-gray-400/30",
      price: "$0",
      period: "forever",
      popular: false,
      features: [
        { title: "Daily Quests", description: "1 quest/day, AI-powered", included: true },
        { title: "AI Judge Evaluation", description: "3/day fair XP scoring", included: true },
        { title: "XP & Leveling System", description: "Full progression E-S rank", included: true },
        { title: "Leaderboard", description: "Global rankings with filters", included: true },
        { title: "Hunter Network Feed", description: "Social feed & community", included: true },
        { title: "Social Features", description: "Kudos, follows, comments", included: true },
        { title: "AI Chatbot", description: "10 questions/month", included: true },
        { title: "Video Uploads", description: "2 videos/month, 360p quality", included: true },
        { title: "Video Analytics", description: "Basic view tracking", included: true },
        { title: "Basic Stats", description: "7-day history, top 10 PRs", included: true },
        { title: "Posts Creation", description: "3 posts/day, 1 video/day", included: true },
        { title: "Bluetooth Devices", description: "No device sync", included: false },
        { title: "Smart Scale Sync", description: "No sync", included: false },
        { title: "Ads", description: "See ads (20% of feed)", included: true },
        { title: "Support", description: "48-72h response time", included: true },
      ],
    },
    {
      id: "pro",
      name: "Pro Hunter",
      tagline: "Unlock Full Potential",
      icon: Crown,
      color: "text-system-cyan",
      bgColor: "bg-system-cyan/10",
      borderColor: "border-system-cyan/50",
      price: "$9.99",
      period: "/month",
      popular: true,
      features: [
        { title: "Daily Quests", description: "Unlimited quest generation", included: true },
        { title: "AI Judge Evaluation", description: "Unlimited fair XP scoring", included: true },
        { title: "XP & Leveling System", description: "Full progression E-S rank", included: true },
        { title: "Leaderboard", description: "Global rankings with filters", included: true },
        { title: "Hunter Network Feed", description: "Social feed & community", included: true },
        { title: "Social Features", description: "Kudos, follows, comments", included: true },
        { title: "AI Chatbot", description: "300 questions/month", included: true },
        { title: "Nutrition Tracking", description: "Basic AI-powered tracking", included: true },
        { title: "GitHub-style Graphs", description: "Graphs, heatmaps, trends", included: true },
        { title: "Progress Tracking", description: "90-day history, unlimited PRs", included: true },
        { title: "Video Uploads", description: "10 videos/month, 720p/1080p", included: true },
        { title: "Video Analytics", description: "Advanced analytics", included: true },
        { title: "Posts Creation", description: "20 posts/day, 5 videos/day", included: true },
        { title: "Guild Features", description: "Basic guild access", included: true },
        { title: "Bluetooth Devices", description: "Sync 2 devices", included: true },
        { title: "Smart Scale Sync", description: "Full sync with AI insights", included: true },
        { title: "Wearable Integration", description: "Apple Watch, Garmin, Fitbit", included: true },
        { title: "Ads", description: "Ad-free experience", included: true },
        { title: "Support", description: "24-48h response time", included: true },
        { title: "Early Access", description: "1 week early access", included: true },
        { title: "Affiliate Program", description: "Basic affiliate access", included: true },
        { title: "Premium Badges", description: "Pro-only badges", included: true },
      ],
    },
    {
      id: "max",
      name: "Max Hunter",
      tagline: "Ultimate Power & Creator Tools",
      icon: Sparkles,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      borderColor: "border-purple-400/50",
      price: "$19.99",
      period: "/month",
      popular: false,
      features: [
        { title: "All Pro Features", description: "Everything in Pro tier", included: true },
        { title: "AI Coach", description: "Personal AI coach & workout analysis", included: true },
        { title: "Nutrition Planning", description: "Advanced AI meal planning", included: true },
        { title: "Live Streaming", description: "Stream workouts live", included: true },
        { title: "Video Uploads", description: "Unlimited, 1080p/4K quality", included: true },
        { title: "Video Analytics", description: "Advanced + revenue tracking", included: true },
        { title: "Posts Creation", description: "Unlimited posts & videos", included: true },
        { title: "Guild Features", description: "Full guild access (raids & dungeons)", included: true },
        { title: "Bluetooth Devices", description: "Unlimited device sync", included: true },
        { title: "Progress Tracking", description: "1-year history, full analytics", included: true },
        { title: "Monetize Videos", description: "Earn 70% ad revenue", included: true },
        { title: "Creator Dashboard", description: "Full creator tools & analytics", included: true },
        { title: "Revenue Sharing", description: "70% share, payout at $50 minimum", included: true },
        { title: "Affiliate Program", description: "Pro affiliate access", included: true },
        { title: "Ads", description: "Ad-free experience", included: true },
        { title: "Support", description: "4-24h VIP support", included: true },
        { title: "Priority Queue", description: "VIP queue priority", included: true },
        { title: "Early Access", description: "2 weeks early access", included: true },
        { title: "Premium Badges", description: "Exclusive Max-only badges", included: true },
      ],
    },
  ];

  const featureDetails = [
    {
      id: "daily-quests",
      icon: Zap,
      title: "Daily Quests",
      description: "AI-powered personalized workouts",
      color: "text-system-cyan",
      bgColor: "bg-system-cyan/10",
      borderColor: "border-system-cyan/30",
      details: [
        {
          plan: "free",
          title: "1 Quest Per Day",
          points: [
            "Generate 1 personalized quest daily",
            "Based on your rank and equipment",
            "Perfect for beginners",
            "Builds consistent habits",
          ],
        },
        {
          plan: "pro",
          title: "Unlimited Quests",
          points: [
            "Generate unlimited quests anytime",
            "Multiple quest types (Daily, Penalties, Special)",
            "Rank-up quests available",
            "Custom workout builder support",
          ],
        },
        {
          plan: "max",
          title: "Unlimited + Premium",
          points: [
            "All Pro features",
            "Priority quest generation",
            "Exclusive quest types",
            "Creator quest templates",
          ],
        },
      ],
    },
    {
      id: "stats-tracker",
      icon: BarChart3,
      title: "Stats Tracker",
      description: "Track your fitness journey",
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      borderColor: "border-purple-400/30",
      details: [
        {
          plan: "free",
          title: "Basic Stats",
          points: [
            "Total XP and level display",
            "Current rank badge",
            "Quest completion count",
            "Limited historical data (last 7 days)",
            "Top 10 personal records",
          ],
        },
        {
          plan: "pro",
          title: "Advanced Analytics",
          points: [
            "GitHub-style contribution heatmap",
            "XP over time graphs",
            "Personal best tracking (PRs)",
            "Potential analysis and trends",
            "90-day historical data",
            "Comparative stats vs other hunters",
          ],
        },
        {
          plan: "max",
          title: "Full Analytics Suite",
          points: [
            "All Pro features",
            "1-year historical data",
            "Advanced AI predictions",
            "Creator analytics dashboard",
            "Revenue tracking (for creators)",
          ],
        },
      ],
    },
    {
      id: "ai-chatbot",
      icon: MessageCircle,
      title: "AI Coach",
      description: "Your 24/7 fitness assistant",
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/30",
      details: [
        {
          plan: "free",
          title: "Limited Access",
          points: [
            "10 questions per month",
            "Basic exercise explanations",
            "Form coaching tips",
            "Limited context awareness",
          ],
        },
        {
          plan: "pro",
          title: "Extended Access",
          points: [
            "300 questions per month",
            "Personalized workout advice",
            "Nutrition guidance",
            "Deep fitness science explanations",
            "Recovery recommendations",
          ],
        },
        {
          plan: "max",
          title: "Personal AI Coach",
          points: [
            "Unlimited questions",
            "Dedicated AI coach",
            "Workout analysis & optimization",
            "Real-time form corrections",
            "Adaptive learning from your data",
            "24/7 motivation & accountability",
          ],
        },
      ],
    },
    {
      id: "nutrition",
      icon: Apple,
      title: "Nutrition Tracking",
      description: "AI-powered meal logging",
      color: "text-pink-400",
      bgColor: "bg-pink-400/10",
      borderColor: "border-pink-400/30",
      details: [
        {
          plan: "free",
          title: "No Tracking",
          points: [
            "No nutrition features included",
            "Upgrade to Pro or Max for access",
          ],
        },
        {
          plan: "pro",
          title: "Basic Tracking",
          points: [
            "AI estimates macros from descriptions",
            "Basic nutrition plans",
            "Meal suggestions based on goals",
            "Hydration reminders",
            "Supplement tracking",
          ],
        },
        {
          plan: "max",
          title: "Advanced Nutrition Planning",
          points: [
            "All Pro features",
            "Personalized meal planning",
            "Macro & micro-nutrient optimization",
            "Meal timing for workouts",
            "Integration with grocery delivery",
          ],
        },
      ],
    },
    {
      id: "video",
      icon: Trophy,
      title: "Video Features",
      description: "Upload, stream & monetize content",
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      borderColor: "border-yellow-400/30",
      details: [
        {
          plan: "free",
          title: "Basic Uploads",
          points: [
            "2 videos per month",
            "360p quality only",
            "Basic view tracking",
            "No monetization",
          ],
        },
        {
          plan: "pro",
          title: "Enhanced Uploads",
          points: [
            "10 videos per month",
            "720p/1080p quality",
            "Advanced analytics",
            "No monetization",
          ],
        },
        {
          plan: "max",
          title: "Creator Platform",
          points: [
            "Unlimited video uploads",
            "1080p/4K quality",
            "Live streaming",
            "Advanced analytics + revenue tracking",
            "Monetize videos (70% ad revenue)",
            "Creator dashboard & tools",
          ],
        },
      ],
    },
    {
      id: "smart-scale",
      icon: Scale,
      title: "Smart Scale & IoT",
      description: "Bluetooth device integration",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      borderColor: "border-blue-400/30",
      details: [
        {
          plan: "free",
          title: "No Integration",
          points: [
            "No device sync included",
            "Upgrade to Pro or Max for access",
          ],
        },
        {
          plan: "pro",
          title: "Basic Integration",
          points: [
            "Sync 2 Bluetooth devices",
            "Smart scale sync with AI insights",
            "Apple Watch, Garmin, Fitbit support",
            "Automatic weight logging",
          ],
        },
        {
          plan: "max",
          title: "Full Integration",
          points: [
            "Unlimited device sync",
            "All wearable devices supported",
            "Advanced IoT analytics",
            "Workout data integration",
            "Real-time performance tracking",
          ],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen pb-20">
      <div className="sticky top-0 z-40 bg-void-deep/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/roadmap" className="text-white/60 hover:text-white transition-colors mb-4 inline-block">
            ← Back to Roadmap
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-system-cyan/10 to-purple-500/10 border border-system-cyan/30 flex items-center justify-center">
              <Crown className="w-6 h-6 text-system-cyan" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-white">
                Monetization System
              </h1>
              <p className="text-sm text-white/60">
                {feature?.description?.userFacing || "Comprehensive subscription and advertising revenue model"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Feature Description */}
          <section>
            <div className="bg-gradient-to-br from-system-cyan/5 to-purple-500/5 border border-system-cyan/20 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-3">
                <Info className="w-6 h-6 text-system-cyan flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-lg font-bold text-white mb-2">
                    Advanced Hybrid Monetization Model
                  </h2>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {feature?.description?.technical || "ASCEND employs a hybrid monetization model combining freemium subscriptions with strategic advertising. This approach maximizes revenue potential while maintaining user experience and growth."}
                  </p>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="text-2xl font-bold text-system-cyan mb-1">60%</div>
                      <div className="text-xs text-white/60">Subscription Revenue</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="text-2xl font-bold text-purple-400 mb-1">35%</div>
                      <div className="text-xs text-white/60">Advertising Revenue</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="text-2xl font-bold text-green-400 mb-1">5%</div>
                      <div className="text-xs text-white/60">Creator Economy</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Plans */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Hunter Tiers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan, index) => {
                const Icon = plan.icon;
                return (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "bg-void-deep/50 border-2 rounded-2xl p-6 relative overflow-hidden",
                      plan.popular ? "border-system-cyan/50 shadow-lg shadow-system-cyan/10" : "border-white/10"
                    )}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-system-cyan to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                        MOST POPULAR
                      </div>
                    )}

                    <div className="flex items-center gap-3 mb-4">
                      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", plan.bgColor, "border", plan.borderColor)}>
                        <Icon className={cn("w-6 h-6", plan.color)} />
                      </div>
                      <div>
                        <h3 className={cn("text-xl font-bold text-white", plan.color)}>
                          {plan.name}
                        </h3>
                        <p className="text-xs text-white/60">
                          {plan.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-display font-bold text-white">
                          {plan.price}
                        </span>
                        <span className="text-sm text-white/60">
                          {plan.period}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6 max-h-80 overflow-y-auto">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-2">
                          {feature.included ? (
                            <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-4 h-4 text-white/30 flex-shrink-0 mt-0.5" />
                          )}
                          <div>
                            <p className={cn(
                              "text-xs font-medium",
                              feature.included ? "text-white" : "text-white/40"
                            )}>
                              {feature.title}
                            </p>
                            <p className={cn(
                              "text-[10px]",
                              feature.included ? "text-white/60" : "text-white/30"
                            )}>
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      className={cn(
                        "w-full py-3 rounded-lg font-bold transition-all text-sm",
                        plan.popular
                          ? "bg-gradient-to-r from-system-cyan to-purple-500 hover:from-system-cyan/90 hover:to-purple-500/90 text-white"
                          : "bg-white/10 hover:bg-white/20 text-white"
                      )}
                    >
                      {plan.id === "free" ? "Get Started Free" : plan.id === "pro" ? "Upgrade to Pro" : "Upgrade to Max"}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Feature Details */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Feature Breakdown
            </h2>
            <div className="space-y-4">
              {featureDetails.map((feature, index) => {
                const Icon = feature.icon;
                const isExpanded = expandedSection === feature.id;

                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-void-deep/50 border border-white/10 rounded-2xl overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedSection(isExpanded ? null : feature.id)}
                      className="w-full p-6 hover:bg-white/5 transition-all flex items-center justify-between"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", feature.bgColor, "border", feature.borderColor)}>
                          <Icon className={cn("w-6 h-6", feature.color)} />
                        </div>
                        <div className="flex-1">
                          <h3 className={cn("text-xl font-bold text-white mb-1", feature.color)}>
                            {feature.title}
                          </h3>
                          <p className="text-sm text-white/60">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                      <Info className="w-5 h-5 text-white/60 flex-shrink-0" />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t border-white/10 bg-black/20"
                        >
                          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                            {feature.details.map((detail, detailIndex) => (
                              <div key={detailIndex} className="bg-white/5 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-3">
                                  {detail.plan === "free" ? (
                                    <Target className="w-4 h-4 text-gray-400" />
                                  ) : detail.plan === "max" ? (
                                    <Sparkles className="w-4 h-4 text-purple-400" />
                                  ) : (
                                    <Crown className="w-4 h-4 text-system-cyan" />
                                  )}
                                  <h4 className={cn(
                                    "font-bold text-white text-sm",
                                    detail.plan === "free" ? "text-gray-400" : detail.plan === "max" ? "text-purple-400" : "text-system-cyan"
                                  )}>
                                    {detail.plan === "free" ? "Free Hunter" : detail.plan === "max" ? "Max Hunter" : "Pro Hunter"}
                                  </h4>
                                </div>
                                <p className="text-xs font-bold text-white mb-2">
                                  {detail.title}
                                </p>
                                <ul className="space-y-1">
                                  {detail.points.map((point, pointIndex) => (
                                    <li key={pointIndex} className="flex items-start gap-2 text-xs text-white/70">
                                      <Check className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                                      {point}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Hardware Section */}
          <section>
            <div className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-3">
                <Scale className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-lg font-bold text-white mb-2">
                    ASCEND Smart Scale & IoT (Coming Soon)
                  </h2>
                  <p className="text-sm text-white/70 mb-4">
                    Connect your workouts to the real world with our Bluetooth smart scale and IoT device integration. Pro and Max tiers include full device sync.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-gray-400" />
                        <h4 className="font-bold text-gray-400">Free Tier</h4>
                      </div>
                      <ul className="space-y-1">
                        <li className="flex items-start gap-2 text-xs text-white/70">
                          <X className="w-3 h-3 text-white/30 flex-shrink-0 mt-0.5" />
                          No device sync
                        </li>
                        <li className="flex items-start gap-2 text-xs text-white/70">
                          <X className="w-3 h-3 text-white/30 flex-shrink-0 mt-0.5" />
                          Manual weight entry only
                        </li>
                        <li className="flex items-start gap-2 text-xs text-white/70">
                          <Check className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                          Upgrade to access features
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-system-cyan/5 to-purple-500/5 rounded-xl p-4 border border-system-cyan/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Crown className="w-4 h-4 text-system-cyan" />
                        <h4 className="font-bold text-system-cyan">Pro Tier</h4>
                      </div>
                      <ul className="space-y-1">
                        <li className="flex items-start gap-2 text-xs text-white/70">
                          <Check className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                          Sync 2 Bluetooth devices
                        </li>
                        <li className="flex items-start gap-2 text-xs text-white/70">
                          <Check className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                          Smart scale with AI insights
                        </li>
                        <li className="flex items-start gap-2 text-xs text-white/70">
                          <Check className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                          Apple Watch, Garmin, Fitbit
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-xl p-4 border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <h4 className="font-bold text-purple-400">Max Tier</h4>
                      </div>
                      <ul className="space-y-1">
                        <li className="flex items-start gap-2 text-xs text-white/70">
                          <Check className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                          Unlimited device sync
                        </li>
                        <li className="flex items-start gap-2 text-xs text-white/70">
                          <Check className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                          Advanced IoT analytics
                        </li>
                        <li className="flex items-start gap-2 text-xs text-white/70">
                          <Check className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                          All wearables supported
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Revenue Model Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Revenue Model Breakdown
            </h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <DollarSign className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      Advertising Revenue (35% of Total)
                    </h3>
                    <p className="text-sm text-white/70">
                      Non-intrusive, relevant ads that enhance fitness experience while generating significant revenue.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="font-bold text-green-400 mb-2">Native Feed Ads</h4>
                    <p className="text-xs text-white/60 mb-2">Blended with Hunter Network content</p>
                    <p className="text-sm text-white">1 ad every 4 posts (20% of feed)</p>
                    <p className="text-xs text-green-300 mt-1">$10 CPM expected</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="font-bold text-green-400 mb-2">Sponsored Quests</h4>
                    <p className="text-xs text-white/60 mb-2">Featured workouts from brands</p>
                    <p className="text-sm text-white">$0.50-2.00 per quest start</p>
                    <p className="text-xs text-green-300 mt-1">Primary revenue driver</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="font-bold text-green-400 mb-2">Video Pre-Rolls</h4>
                    <p className="text-xs text-white/60 mb-2">Before workout videos</p>
                    <p className="text-sm text-white">$15 CPM average</p>
                    <p className="text-xs text-green-300 mt-1">15-30s skippable</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="font-bold text-green-400 mb-2">Interstitials</h4>
                    <p className="text-xs text-white/60 mb-2">Between quest completions</p>
                    <p className="text-sm text-white">Max 1 ad/hour</p>
                    <p className="text-xs text-green-300 mt-1">$20 CPM expected</p>
                  </div>
                </div>
                <div className="mt-4 bg-black/20 rounded-xl p-4">
                  <h4 className="font-bold text-white mb-2">Expected Ad Revenue at Scale</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-green-400 font-bold">1,000 Users</div>
                      <div className="text-white/70">$2,840/month</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-green-400 font-bold">5,000 Users</div>
                      <div className="text-white/70">$14,200/month</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-green-400 font-bold">10,000 Users</div>
                      <div className="text-white/70">$28,400/month</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Video className="w-6 h-6 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      Creator Economy (5% of Total)
                    </h3>
                    <p className="text-sm text-white/70">
                      Max tier users can monetize their videos with a 70/30 revenue split.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="font-bold text-purple-400 mb-2">Eligibility</h4>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li>✓ Max Tier subscription ($19.99/mo)</li>
                      <li>✓ Minimum 1,000 followers</li>
                      <li>✓ Minimum 10,000 total views</li>
                      <li>✓ 30+ days account age</li>
                    </ul>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="font-bold text-purple-400 mb-2">Revenue Split</h4>
                    <p className="text-sm text-white mb-2">Creators keep 70% of ad revenue</p>
                    <div className="bg-black/20 rounded-lg p-3">
                      <p className="text-xs text-white/70">Example Earnings:</p>
                      <p className="text-sm text-white">5,000 views/month × $15 CPM = $75</p>
                      <p className="text-xs text-green-300">Creator share: $52.50/month (after Max fee: $32.51 profit)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-system-cyan/10 to-blue-500/10 border border-system-cyan/20 rounded-2xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <PieChart className="w-6 h-6 text-system-cyan flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      Total Revenue Projections
                    </h3>
                    <p className="text-sm text-white/70">
                      Combined revenue from subscriptions, advertising, and creator economy.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="font-bold text-system-cyan mb-3">Conservative (Year 1)</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-white/70">1,000 Users:</span>
                        <span className="text-white font-bold">$4,838/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">ARPU:</span>
                        <span className="text-white font-bold">$4.84/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Subs:</span>
                        <span className="text-white">41%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Ads:</span>
                        <span className="text-white">59%</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="font-bold text-system-cyan mb-3">Aggressive (Year 2)</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-white/70">10,000 Users:</span>
                        <span className="text-white font-bold">$112,540/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">ARPU:</span>
                        <span className="text-white font-bold">$11.25/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Pro Conv:</span>
                        <span className="text-white">30%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Max Conv:</span>
                        <span className="text-white">5%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cost Planning Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Cost Planning & Optimization
            </h2>
            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-3 mb-4">
                <LineChart className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Proactive Cost Management
                  </h3>
                  <p className="text-sm text-white/70">
                    Our comprehensive cost planning system ensures ASCEND scales profitably from 100 to 50,000+ users while maintaining excellent margins (80%+).
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="font-bold text-orange-400 mb-2">Cost Categories</h4>
                  <ul className="text-xs text-white/70 space-y-1">
                    <li>• Infrastructure (servers, DB, CDN)</li>
                    <li>• API costs (Groq AI, Stripe)</li>
                    <li>• Video (storage, transcoding, streaming)</li>
                    <li>• Support & operations</li>
                    <li>• Marketing & partnerships</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <h4 className="font-bold text-orange-400 mb-2">Target Metrics</h4>
                  <ul className="text-xs text-white/70 space-y-1">
                    <li>• 30-50% cost reduction via optimization</li>
                    <li>• 80%+ profit margins at all scales</li>
                    <li>• $100K+ annual savings at 10K users</li>
                    <li>• 77% reduction in break-even point</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 bg-black/20 rounded-xl p-4">
                <h4 className="font-bold text-white mb-3">Break-Even Analysis</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-xs text-white/70">Fixed Costs</p>
                    <p className="text-sm text-white font-bold">$90-900/month</p>
                    <p className="text-xs text-white/50">Infrastructure, DB, Redis</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-xs text-white/70">Variable Costs</p>
                    <p className="text-sm text-white font-bold">$0.50-0.70/user/month</p>
                    <p className="text-xs text-white/50">Scales with users</p>
                  </div>
                </div>
                <div className="mt-3 bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <p className="text-xs text-green-300 font-bold">Break-Even: 45 users with ads (vs 200 without ads)</p>
                  <p className="text-xs text-white/70">77% reduction in break-even with advertising</p>
                </div>
              </div>
            </div>
          </section>

          {/* Implementation Details (from feature data) */}
          {feature && (
            <>
              <section>
                <h2 className="text-2xl font-bold text-white mb-6">
                  Implementation Progress
                </h2>
                <div className="bg-void-deep/50 border border-white/10 rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-system-cyan/10 border border-system-cyan/30 flex items-center justify-center">
                        <Code className="w-6 h-6 text-system-cyan" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Overall Progress</h3>
                        <p className="text-sm text-white/60">{feature.progress}% Complete</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-system-cyan">{feature.progress}%</p>
                      <p className="text-xs text-white/60">{feature.status}</p>
                    </div>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-system-cyan to-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${feature.progress}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-system-cyan" />
                      <h4 className="font-bold text-white text-sm">Target Date</h4>
                    </div>
                    <p className="text-lg font-bold text-white">{feature.timeline.targetDate}</p>
                    <p className="text-xs text-white/60">{feature.timeline.quarter}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <h4 className="font-bold text-white text-sm">Milestones</h4>
                    </div>
                    <p className="text-lg font-bold text-white">{feature.milestones.completedCount} / {feature.milestones.total}</p>
                    <p className="text-xs text-white/60">{feature.milestones.percentage}% Complete</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-yellow-400" />
                      <h4 className="font-bold text-white text-sm">Estimated</h4>
                    </div>
                    <p className="text-lg font-bold text-white">{feature.implementation.estimatedCompletion}</p>
                    <p className="text-xs text-white/60">{feature.implementation.status}</p>
                  </div>
                </div>

                <FeatureTimeline feature={feature} />
                <FeatureMilestones feature={feature} />
                <FeatureImplementationTracker feature={feature} />
              </section>
            </>
          )}

          {/* FAQ Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  question: "Is Free tier really free forever?",
                  answer: "Yes! The Free tier is completely free with no time limit. You'll have access to core features, but will see ads. Upgrade to Pro for an ad-free experience and unlimited features.",
                },
                {
                  question: "What's the difference between Pro and Max tiers?",
                  answer: "Pro ($9.99/mo) includes unlimited quests, advanced analytics, 10 video uploads, and ad-free experience. Max ($19.99/mo) adds video monetization (70% revenue share), unlimited uploads, live streaming, personal AI coach, and creator tools.",
                },
                {
                  question: "Can I monetize my videos on Free or Pro?",
                  answer: "No, video monetization is exclusive to Max tier. You need Max subscription ($19.99/mo), minimum 1,000 followers, and 10,000 total views to start earning 70% of ad revenue from your videos.",
                },
                {
                  question: "How many ads will I see on Free tier?",
                  answer: "Free users see approximately 20% of their feed content as sponsored posts, plus video pre-rolls before watching workout videos. That's roughly 3-4 ads per hour maximum - much less than other social platforms.",
                },
                {
                  question: "Can I switch between plans?",
                  answer: "Yes! Upgrade anytime and unlock features immediately. Downgrade takes effect at end of your billing cycle. You'll keep all your data, progress, and achievements.",
                },
                {
                  question: "When will the monetization system be live?",
                  answer: "The monetization system is currently planned for Q4 2026. We're working on Stripe integration, payment processing, and tier access control. Keep an eye on our roadmap for updates!",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-void-deep/50 border border-white/10 rounded-xl p-5"
                >
                  <h3 className="font-bold text-white mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-white/70">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section>
            <div className="bg-gradient-to-r from-system-cyan/10 to-purple-500/10 border border-system-cyan/30 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-3">
                Choose Your Hunter Tier
              </h2>
              <p className="text-white/70 mb-6">
                Start free, upgrade to Pro for power features, or go Max for creator tools and personal AI coaching
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-2xl font-bold text-gray-400 mb-1">Free</div>
                  <div className="text-xs text-white/60 mb-2">Get started today</div>
                  <div className="text-sm text-white">1 quest/day, ads included</div>
                </div>
                <div className="bg-gradient-to-br from-system-cyan/5 to-purple-500/5 border border-system-cyan/20 rounded-xl p-4">
                  <div className="text-2xl font-bold text-system-cyan mb-1">$9.99/mo</div>
                  <div className="text-xs text-white/60 mb-2">Pro - Most Popular</div>
                  <div className="text-sm text-white">Unlimited features, ad-free</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20 rounded-xl p-4">
                  <div className="text-2xl font-bold text-purple-400 mb-1">$19.99/mo</div>
                  <div className="text-xs text-white/60 mb-2">Max - For Creators</div>
                  <div className="text-sm text-white">Video monetization, AI coach</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-gradient-to-r from-system-cyan to-purple-500 hover:from-system-cyan/90 hover:to-purple-500/90 text-white rounded-lg font-bold transition-all">
                  Start Free
                </button>
                <Link href="/roadmap" className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold transition-all flex items-center justify-center gap-2">
                  Back to Roadmap
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* Continue Learning */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Continue Learning
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/help/features"
                className="bg-void-deep/50 border border-white/10 rounded-xl p-6 hover:border-system-cyan/30 hover:bg-white/5 transition-all group"
              >
                <Zap className="w-6 h-6 text-yellow-400 mb-3" />
                <h3 className="font-bold text-white mb-2">Features</h3>
                <p className="text-sm text-white/60 mb-3">Explore all features.</p>
                <div className="flex items-center gap-2 text-sm text-yellow-400 group-hover:text-white transition-colors">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>

              <Link
                href="/help/faq"
                className="bg-void-deep/50 border border-white/10 rounded-xl p-6 hover:border-system-cyan/30 hover:bg-white/5 transition-all group"
              >
                <MessageCircle className="w-6 h-6 text-blue-400 mb-3" />
                <h3 className="font-bold text-white mb-2">FAQ</h3>
                <p className="text-sm text-white/60 mb-3">Find answers to questions.</p>
                <div className="flex items-center gap-2 text-sm text-blue-400 group-hover:text-white transition-colors">
                  View FAQs
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>

              <Link
                href="/help/getting-started"
                className="bg-void-deep/50 border border-white/10 rounded-xl p-6 hover:border-system-cyan/30 hover:bg-white/5 transition-all group"
              >
                <Target className="w-6 h-6 text-purple-400 mb-3" />
                <h3 className="font-bold text-white mb-2">Getting Started</h3>
                <p className="text-sm text-white/60 mb-3">Start your journey.</p>
                <div className="flex items-center gap-2 text-sm text-purple-400 group-hover:text-white transition-colors">
                  Start Learning
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}

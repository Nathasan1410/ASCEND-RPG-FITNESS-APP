"use client";

import { useState } from "react";
import { Sparkles, Crown, Lock, Zap, Shield, MessageCircle, BarChart3, Apple, Scale, Users, TrendingUp, Check, X, Star, Target, ArrowRight, Info, Trophy } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { motion, AnimatePresence } from "framer-motion";

export default function MonetizationPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

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
        { title: "Daily Quests", description: "Generate 1 quest per day", included: true },
        { title: "Hunter Feed", description: "Access social feed from all hunters", included: true },
        { title: "Basic Stats", description: "Limited stats tracker (like Chess.com)", included: true },
        { title: "AI Chatbot", description: "2-3 questions per day", included: true },
        { title: "Nutrition Tracking", description: "Basic logging only", included: false },
        { title: "Advanced Analytics", description: "GitHub-style graphs & heatmaps", included: false },
        { title: "Boss Raids", description: "Exclusive co-op boss battles", included: false },
        { title: "Weekly Challenges", description: "Compete for weekly glory", included: false },
        { title: "Monthly Events", description: "Major monthly competitions", included: false },
        { title: "Smart Scale AI", description: "Limited AI access with scale", included: false },
        { title: "Exclusive Community", description: "Pro-only hunter guilds", included: false },
        { title: "Enhanced Profile", description: "Custom badges & titles", included: false },
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
        { title: "Hunter Feed", description: "Access social feed from all hunters", included: true },
        { title: "Advanced Stats", description: "GitHub-style graphs, heatmaps, potential tracking", included: true },
        { title: "AI Chatbot", description: "24/7 access, unlimited questions", included: true },
        { title: "Nutrition Tracking", description: "AI-powered macro estimation & personalization", included: true },
        { title: "Advanced Analytics", description: "GitHub-style graphs & heatmaps", included: true },
        { title: "Boss Raids", description: "Exclusive co-op boss battles", included: true },
        { title: "Weekly Challenges", description: "Compete for weekly glory", included: true },
        { title: "Monthly Events", description: "Major monthly competitions", included: true },
        { title: "Smart Scale AI", description: "Full AI access with scale", included: true },
        { title: "Exclusive Community", description: "Pro-only hunter guilds", included: true },
        { title: "Enhanced Profile", description: "Custom badges, titles, profile themes", included: true },
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
            "Full historical data access",
            "Comparative stats vs other hunters",
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
            "2-3 questions per day",
            "Basic exercise explanations",
            "Form coaching tips",
            "Limited context awareness",
          ],
        },
        {
          plan: "pro",
          title: "Full Access",
          points: [
            "24/7 unlimited questions",
            "Personalized workout advice",
            "Nutrition and recovery guidance",
            "Deep fitness science explanations",
            "Adaptive learning from your habits",
            "Real-time motivation",
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
          title: "Basic Logging",
          points: [
            "Simple meal descriptions",
            "No AI estimation",
            "Manual macro entry",
            "Daily calorie tracking",
          ],
        },
        {
          plan: "pro",
          title: "AI-Powered",
          points: [
            "AI estimates macros from descriptions",
            "Personalized nutrition plans",
            "Meal suggestions based on goals",
            "Hydration reminders",
            "Supplement tracking",
            "Learn your eating patterns",
          ],
        },
      ],
    },
    {
      id: "events",
      icon: Trophy,
      title: "Special Events",
      description: "Compete for glory and rewards",
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      borderColor: "border-yellow-400/30",
      details: [
        {
          plan: "free",
          title: "View Only",
          points: [
            "See leaderboards for events",
            "Watch event progress",
            "No participation access",
          ],
        },
        {
          plan: "pro",
          title: "Full Participation",
          points: [
            "Join Boss Raids (co-op battles)",
            "Compete in Weekly Challenges",
            "Participate in Monthly Events",
            "Earn exclusive rewards",
            "Unlock special achievements",
            "Pro-only tournament access",
          ],
        },
      ],
    },
    {
      id: "smart-scale",
      icon: Scale,
      title: "Smart Scale",
      description: "Bluetooth scale integration",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      borderColor: "border-blue-400/30",
      details: [
        {
          plan: "free",
          title: "Limited AI",
          points: [
            "Track weight automatically",
            "Basic weight history",
            "Limited AI insights",
            "No nutrition analysis",
          ],
        },
        {
          plan: "pro",
          title: "Full Integration",
          points: [
            "Automatic weight logging",
            "AI-powered weight trend analysis",
            "Body composition insights",
            "Nutrition recommendations",
            "Personalized workout adjustments",
            "Integration with all Pro features",
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
                Monetization
              </h1>
              <p className="text-sm text-white/60">
                Choose your hunter tier and unlock powerful features
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
          {/* Hero Section */}
          <section>
            <div className="bg-gradient-to-br from-system-cyan/5 to-purple-500/5 border border-system-cyan/20 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-system-cyan flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-lg font-bold text-white mb-2">
                    Why ASCEND Needs Your Support
                  </h2>
                  <p className="text-sm text-white/70 leading-relaxed">
                    ASCEND is free to start because we believe fitness should be accessible to everyone. However, building and maintaining an AI-powered platform with advanced features requires significant resources. Your support through Pro tier helps us:
                  </p>
                  <ul className="mt-3 space-y-2">
                    {[
                      "Keep the platform running 24/7",
                      "Improve AI quality and response times",
                      "Add new features faster",
                      "Provide better support",
                      "Build exclusive content and events",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-white/70">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Plans */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Hunter Tiers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                    <div className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-5 h-5 text-white/30 flex-shrink-0 mt-0.5" />
                          )}
                          <div>
                            <p className={cn(
                              "text-sm font-medium",
                              feature.included ? "text-white" : "text-white/40"
                            )}>
                              {feature.title}
                            </p>
                            <p className={cn(
                              "text-xs",
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
                        "w-full py-3 rounded-lg font-bold transition-all",
                        plan.popular
                          ? "bg-gradient-to-r from-system-cyan to-purple-500 hover:from-system-cyan/90 hover:to-purple-500/90 text-white"
                          : "bg-white/10 hover:bg-white/20 text-white"
                      )}
                    >
                      {plan.id === "free" ? "Get Started Free" : "Upgrade to Pro"}
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
                          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {feature.details.map((detail, detailIndex) => (
                              <div key={detailIndex} className="bg-white/5 rounded-xl p-5">
                                <div className="flex items-center gap-2 mb-4">
                                  {detail.plan === "free" ? (
                                    <Target className="w-5 h-5 text-gray-400" />
                                  ) : (
                                    <Crown className="w-5 h-5 text-system-cyan" />
                                  )}
                                  <h4 className={cn(
                                    "font-bold text-white",
                                    detail.plan === "free" ? "text-gray-400" : "text-system-cyan"
                                  )}>
                                    {detail.plan === "free" ? "Free Hunter" : "Pro Hunter"}
                                  </h4>
                                </div>
                                <p className="text-sm font-bold text-white mb-3">
                                  {detail.title}
                                </p>
                                <ul className="space-y-2">
                                  {detail.points.map((point, pointIndex) => (
                                    <li key={pointIndex} className="flex items-start gap-2 text-sm text-white/70">
                                      <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
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
                    ASCEND Smart Scale (Coming Soon)
                  </h2>
                  <p className="text-sm text-white/70 mb-4">
                    Connect your workouts to the real world with our Bluetooth smart scale. Automatically track your weight and get AI-powered insights.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-gray-400" />
                        <h4 className="font-bold text-gray-400">Free Hunter + Scale</h4>
                      </div>
                      <ul className="space-y-1">
                        <li className="flex items-start gap-2 text-xs text-white/70">
                          <Check className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                          Automatic weight logging
                        </li>
                        <li className="flex items-start gap-2 text-xs text-white/70">
                          <Check className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                          Basic weight history
                        </li>
                        <li className="flex items-start gap-2 text-xs text-white/70">
                          <X className="w-3 h-3 text-white/30 flex-shrink-0 mt-0.5" />
                          Limited AI insights
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-system-cyan/5 to-purple-500/5 rounded-xl p-4 border border-system-cyan/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Crown className="w-4 h-4 text-system-cyan" />
                        <h4 className="font-bold text-system-cyan">Pro Hunter + Scale</h4>
                      </div>
                      <ul className="space-y-1">
                        <li className="flex items-start gap-2 text-xs text-white/70">
                          <Check className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                          Automatic weight logging
                        </li>
                        <li className="flex items-start gap-2 text-xs text-white/70">
                          <Check className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                          AI-powered trend analysis
                        </li>
                        <li className="flex items-start gap-2 text-xs text-white/70">
                          <Check className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                          Nutrition recommendations
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  question: "Is Free tier really free forever?",
                  answer: "Yes! The Free tier is completely free with no time limit. You'll always have access to 1 daily quest, Hunter Feed, and basic stats tracking. Upgrade to Pro only if you want unlimited features.",
                },
                {
                  question: "Can I switch between plans?",
                  answer: "Yes! You can upgrade to Pro anytime and unlock all features immediately. You can also downgrade back to Free if you no longer need Pro features. Downgrading takes effect at the end of your current billing cycle.",
                },
                {
                  question: "What happens to my data if I downgrade?",
                  answer: "Your quest history, XP, and profile data are always saved. You'll keep all your progress and achievements. You just won't have access to Pro features like advanced analytics and unlimited AI chatbot questions.",
                },
                {
                  question: "Do I need a smart scale to use ASCEND?",
                  answer: "No! ASCEND works perfectly without a smart scale. The smart scale is optional hardware that adds automatic weight tracking and AI-powered insights. Many hunters use ASCEND successfully without it.",
                },
                {
                  question: "Is my payment information secure?",
                  answer: "Yes! We use Stripe for all payments, which is PCI-DSS Level 1 compliant. We never store your payment details directly. Your subscription is managed securely through Stripe's platform.",
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
                Ready to Level Up Your Fitness?
              </h2>
              <p className="text-white/70 mb-6">
                Join thousands of hunters turning workouts into epic quests
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-gradient-to-r from-system-cyan to-purple-500 hover:from-system-cyan/90 hover:to-purple-500/90 text-white rounded-lg font-bold transition-all">
                  Start Free
                </button>
                <button className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold transition-all">
                  Learn More
                </button>
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

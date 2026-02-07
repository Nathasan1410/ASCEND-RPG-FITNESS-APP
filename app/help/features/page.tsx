"use client";

import { useState } from "react";
import { Zap, Trophy, Users, Shield, MessageCircle, BarChart3, CheckCircle, ChevronDown, ChevronUp, ArrowRight, Target, Award, TrendingUp, Lock, Star } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { motion, AnimatePresence } from "framer-motion";

export default function FeaturesPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const featureCategories = [
    {
      id: "quest-system",
      title: "Quest System",
      icon: Zap,
      color: "text-system-cyan",
      bgColor: "bg-system-cyan/10",
      borderColor: "border-system-cyan/30",
      description: "AI-powered personalized workout quests that adapt to your fitness level",
      items: [
        {
          title: "AI Quest Generation",
          description: "Groq LLM generates unlimited personalized workout variations based on your rank, equipment, and goals",
          points: ["Adapts to your current rank (E-S)", "Matches your available equipment", "Aligns with your fitness goals", "Generates unique quests each time"],
        },
        {
          title: "Dynamic Difficulty",
          description: "Quest difficulty scales with your progress to ensure appropriate challenges",
          points: ["E-Rank: Beginner bodyweight quests", "D-Rank: Basic equipment quests", "C-Rank: Intermediate exercises", "B-Rank: Complex multi-exercise workouts", "A-Rank: Advanced high-intensity", "S-Rank: Elite performance quests"],
        },
        {
          title: "Class Specialization",
          description: "Three unique classes with specialized quest types",
          points: ["Tank: Strength and hypertrophy focus", "Striker: Speed and cardio emphasis", "Assassin: Agility and HIIT specialization"],
        },
        {
          title: "Quest Tracking",
          description: "Track your progress through exercises in real-time",
          points: ["See exercises, sets, reps, and weights", "Track completion time", "Rest timers between sets", "Progress indicators"],
        },
      ],
    },
    {
      id: "gamification",
      title: "Gamification",
      icon: Trophy,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      borderColor: "border-purple-400/30",
      description: "Earn XP, level up, and achieve hunter ranks",
      items: [
        {
          title: "XP and Levels",
          description: "Experience points earned from completing quests and achievements",
          points: ["XP scales with quest difficulty (E: 50-100, S: 2500-4000)", "Level up by accumulating XP", "Each level requires more XP than the last", "Track total XP and current level"],
        },
        {
          title: "Hunter Ranks",
          description: "Progress from E to S rank as you improve",
          points: ["E-Rank: Level 1-30", "D-Rank: Level 31-60", "C-Rank: Level 61-90", "B-Rank: Level 91-120", "A-Rank: Level 121-150", "S-Rank: Level 151+"],
        },
        {
          title: "Achievements",
          description: "Unlock badges and titles for milestones",
          points: ["First quest completion", "10 quests completed", "Rank-up achievements", "Class milestones", "Streak badges (7, 30, 100 days)"],
        },
        {
          title: "Streak Tracking",
          description: "Maintain consistent quest completion for bonuses",
          points: ["Daily quest completion streak", "Weekly streak bonuses", "Monthly streak rewards", "View your longest streak"],
        },
      ],
    },
    {
      id: "social-features",
      title: "Social Features",
      icon: Users,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      borderColor: "border-yellow-400/30",
      description: "Connect with hunters worldwide through Hunter Network",
      items: [
        {
          title: "Hunter Network Feed",
          description: "Social feed showing quest completions from other hunters",
          points: ["See posts from hunters you follow", "Discover trending completions", "Global feed of all activities", "View quest details and proof"],
        },
        {
          title: "Kudos and Respects",
          description: "Give and receive recognition for achievements",
          points: ["Kudos (Blue): For encouragement and support", "Respects (Orange): For impressive achievements", "View who gave you recognition", "Track kudos/respect counts"],
        },
        {
          title: "Following System",
          description: "Connect with other hunters and track their progress",
          points: ["Follow hunters to see their posts", "View followers and following counts", "Discover hunters in your class/rank", "Build your hunter network"],
        },
        {
          title: "Comments and Tags",
          description: "Interact with posts through comments and mentions",
          points: ["Comment on quest completions", "Tag hunters in posts", "Receive notifications for mentions", "Engage with the community"],
        },
      ],
    },
    {
      id: "leaderboard",
      title: "Leaderboard",
      icon: BarChart3,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/30",
      description: "Compete with hunters globally and by category",
      items: [
        {
          title: "Global Rankings",
          description: "See where you rank among all hunters",
          points: ["XP-based global ranking", "View your position", "See top 100 hunters", "Weekly and monthly leaderboards"],
        },
        {
          title: "Rank-Specific Leaderboards",
          description: "Compare with hunters at your current rank",
          points: ["E-Rank leaderboard", "D-Rank leaderboard", "C-Rank leaderboard", "B-Rank leaderboard", "A-Rank leaderboard", "S-Rank leaderboard"],
        },
        {
          title: "Class-Specific Rankings",
          description: "Compete with hunters in your class",
          points: ["Tank leaderboard", "Striker leaderboard", "Assassin leaderboard", "See top performers by class"],
        },
        {
          title: "Time Period Filters",
          description: "View rankings for different time frames",
          points: ["Daily leaderboard", "Weekly leaderboard", "Monthly leaderboard", "All-time rankings"],
        },
      ],
    },
    {
      id: "anti-cheat",
      title: "Anti-Cheat System",
      icon: Shield,
      color: "text-pink-400",
      bgColor: "bg-pink-400/10",
      borderColor: "border-pink-400/30",
      description: "Multi-layer verification ensures fair competition",
      items: [
        {
          title: "Proof Uploads",
          description: "Required photo or video evidence for quest completion",
          points: ["Upload proof after each quest", "Supports JPEG, PNG, MP4, WebM formats", "Max file size: 10MB", "Proof visible to other hunters"],
        },
        {
          title: "AI Judge Evaluation",
          description: "AI evaluates quest completions for quality",
          points: ["Form score: 0.0 - 1.0", "Effort score: 0.0 - 1.0", "Consistency score: 0.0 - 1.0", "Overall score determines XP multiplier"],
        },
        {
          title: "Time Anomaly Detection",
          description: "Database triggers flag suspicious completion times",
          points: ["Detects quests completed too fast", "Flags completions < 30% of expected time", "Automatic investigation triggers", "Prevents XP abuse"],
        },
        {
          title: "XP Limit Enforcement",
          description: "Maximum XP limits prevent impossible gains",
          points: ["Quest-specific XP caps", "Difficulty-based limits", "Rejects invalid XP amounts", "RLS policies prevent database manipulation"],
        },
        {
          title: "Community Reports",
          description: "Report suspicious activities for review",
          points: ["Report suspicious posts", "Flag impossible achievements", "Community moderation", "Ban system for repeat offenders"],
        },
      ],
    },
    {
      id: "ai-integration",
      title: "AI Integration",
      icon: MessageCircle,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      borderColor: "border-blue-400/30",
      description: "Advanced AI features powered by Groq and Opik",
      items: [
        {
          title: "Groq Quest Generation",
          description: "Llama 3.3 70B model generates personalized quests",
          points: ["Fast inference speed", "Personalized workout plans", "Adapts to user preferences", "Fallback to template on failure"],
        },
        {
          title: "Opik AI Judge",
          description: "Multi-factor evaluation with transparency",
          points: ["Form evaluation from proof", "Effort level assessment", "Consistency tracking", "Full Opik tracing of all evaluations"],
        },
        {
          title: "Performance Monitoring",
          description: "Track and optimize AI performance",
          points: ["Quest generation metrics", "API response times", "Error tracking and alerting", "Goal alignment monitoring"],
        },
        {
          title: "Feedback Loop",
          description: "Continuous improvement based on data",
          points: ["Track quest success rates", "Monitor judge accuracy", "Optimize prompts based on feedback", "User satisfaction tracking"],
        },
      ],
    },
    {
      id: "progress-tracking",
      title: "Progress Tracking",
      icon: TrendingUp,
      color: "text-indigo-400",
      bgColor: "bg-indigo-400/10",
      borderColor: "border-indigo-400/30",
      description: "Comprehensive stats and analytics",
      items: [
        {
          title: "Stats Overview",
          description: "Quick view of your fitness RPG progress",
          points: ["Total XP earned", "Current level", "Current rank", "Quests completed", "Completion rate"],
        },
        {
          title: "Progress Graphs",
          description: "Visualize your fitness journey over time",
          points: ["XP over time chart", "Level progression graph", "Quest completion history", "Streak visualization"],
        },
        {
          title: "Performance Metrics",
          description: "Detailed breakdown of your workout performance",
          points: ["Average quest completion time", "Typical difficulty completed", "Class specialization stats", "Peak performance indicators"],
        },
        {
          title: "Comparison Tools",
          description: "Compare your progress with others",
          points: ["Rank percentile", "Class comparison", "Quest success rate vs average", "Global position tracking"],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen pb-20">
      <div className="sticky top-0 z-40 bg-void-deep/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/help" className="text-white/60 hover:text-white transition-colors mb-4 inline-block">
            ← Back to Help
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-system-cyan/10 to-blue-600/10 border border-system-cyan/30 flex items-center justify-center">
              <Zap className="w-6 h-6 text-system-cyan" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-white">
                Features
              </h1>
              <p className="text-sm text-white/60">
                Explore all features and how they work
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <section>
            <div className="bg-gradient-to-br from-system-cyan/5 to-blue-600/5 border border-system-cyan/20 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-3">
                <Target className="w-6 h-6 text-system-cyan flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-lg font-bold text-white mb-2">
                    Feature Overview
                  </h2>
                  <p className="text-sm text-white/70">
                    ASCEND combines AI-powered workouts with gamification to create an engaging fitness experience. Complete quests, earn XP, level up, and compete with hunters worldwide.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Feature Categories
            </h2>
            <div className="space-y-4">
              {featureCategories.map((category, index) => {
                const Icon = category.icon;
                const isExpanded = expandedSection === category.id;

                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-void-deep/50 border border-white/10 rounded-2xl overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedSection(isExpanded ? null : category.id)}
                      className="w-full p-6 hover:bg-white/5 transition-all flex items-center justify-between"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", category.bgColor, category.borderColor, "border")}>
                          <Icon className={cn("w-6 h-6", category.color)} />
                        </div>
                        <div>
                          <h3 className={cn("text-xl font-bold text-white mb-1", category.color)}>
                            {category.title}
                          </h3>
                          <p className="text-sm text-white/60">
                            {category.description}
                          </p>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-white/60 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-white/60 flex-shrink-0" />
                      )}
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t border-white/10 bg-black/20"
                        >
                          <div className="p-6 space-y-6">
                            {category.items.map((item, itemIndex) => (
                              <div key={itemIndex} className="bg-white/5 rounded-xl p-5">
                                <h4 className="text-lg font-bold text-white mb-3">
                                  {item.title}
                                </h4>
                                <p className="text-sm text-white/70 mb-4">
                                  {item.description}
                                </p>
                                <ul className="space-y-2">
                                  {item.points.map((point, pointIndex) => (
                                    <li key={pointIndex} className="flex items-start gap-2 text-sm text-white/80">
                                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
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

          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Quick Stats
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Quest System", value: "AI-Powered", icon: Zap },
                { label: "Hunter Ranks", value: "E to S", icon: Award },
                { label: "Hunter Classes", value: "3 Types", icon: Shield },
                { label: "Anti-Cheat", value: "Multi-Layer", icon: Lock },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="bg-void-deep/50 border border-white/10 rounded-xl p-4 text-center"
                >
                  <stat.icon className="w-5 h-5 text-system-cyan mx-auto mb-2" />
                  <p className="text-xs text-white/60 mb-1">{stat.label}</p>
                  <p className="text-sm font-bold text-white">{stat.value}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Feature Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: "AI-Powered",
                  description: "Groq LLM generates unlimited personalized quest variations",
                  icon: Star,
                },
                {
                  title: "Fair Competition",
                  description: "Multi-layer anti-cheat system ensures everyone plays fairly",
                  icon: Shield,
                },
                {
                  title: "Transparent AI",
                  description: "Opik provides full transparency for all AI operations",
                  icon: MessageCircle,
                },
              ].map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="bg-gradient-to-br from-system-cyan/5 to-blue-600/5 border border-system-cyan/20 rounded-xl p-5"
                >
                  <highlight.icon className="w-6 h-6 text-system-cyan mb-3" />
                  <h3 className="font-bold text-white mb-2">{highlight.title}</h3>
                  <p className="text-sm text-white/70">{highlight.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Continue Learning
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/help/ui-ux"
                className="bg-void-deep/50 border border-white/10 rounded-xl p-6 hover:border-system-cyan/30 hover:bg-white/5 transition-all group"
              >
                <BarChart3 className="w-6 h-6 text-purple-400 mb-3" />
                <h3 className="font-bold text-white mb-2">UI/UX Guide</h3>
                <p className="text-sm text-white/60 mb-3">Learn how to navigate and use the app.</p>
                <div className="flex items-center gap-2 text-sm text-purple-400 group-hover:text-white transition-colors">
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
                <p className="text-sm text-white/60 mb-3">Find answers to common questions.</p>
                <div className="flex items-center gap-2 text-sm text-blue-400 group-hover:text-white transition-colors">
                  View FAQs
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>

              <Link
                href="/domain/best-of-OPIK"
                className="bg-void-deep/50 border border-white/10 rounded-xl p-6 hover:border-system-cyan/30 hover:bg-white/5 transition-all group"
              >
                <Shield className="w-6 h-6 text-green-400 mb-3" />
                <h3 className="font-bold text-white mb-2">Opik Monitoring</h3>
                <p className="text-sm text-white/60 mb-3">Learn how we track AI operations.</p>
                <div className="flex items-center gap-2 text-sm text-green-400 group-hover:text-white transition-colors">
                  Learn More
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

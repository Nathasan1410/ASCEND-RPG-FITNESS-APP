"use client";

import { BookOpen, Zap, Award, MessageCircle, Users, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";

export default function GettingStartedPage() {
  const steps = [
    {
      id: 1,
      title: "Create Your Account",
      description: "Sign up with email or social auth. Choose your hunter username and select your starting class.",
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      id: 2,
      title: "Choose Your Hunter Class",
      description: "Select Tank (strength), Striker (speed), or Assassin (agility) class that fits your training style.",
      icon: Zap,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
    },
    {
      id: 3,
      title: "Generate Your First Quest",
      description: "AI will create a personalized workout based on your goals, equipment, and class.",
      icon: Award,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
    },
    {
      id: 4,
      title: "Complete the Quest",
      description: "Follow the exercises, track your sets and reps, and complete the workout.",
      icon: CheckCircle,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
    {
      id: 5,
      title: "Upload Proof & Get Ranked",
      description: "Upload photo or video proof for verification. Earn XP and climb to E, D, C, B, A, or S rank.",
      icon: MessageCircle,
      color: "text-system-cyan",
      bgColor: "bg-system-cyan/10",
    },
  ];

  const tips = [
    {
      title: "Start Slow",
      description: "Begin with easier quests (D or C rank) to learn proper form before advancing.",
    },
    {
      title: "Upload Proof",
      description: "Always upload proof after completing quests. Without proof, you won't earn XP.",
    },
    {
      title: "Join the Community",
      description: "Follow other hunters, engage with posts, and climb the leaderboard together.",
    },
    {
      title: "Read the Opik Guide",
      description: "Learn how we monitor and improve your experience at /help/opik",
    },
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-void-deep/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/help" className="text-white/60 hover:text-white transition-colors mb-4 inline-block">
            ← Back to Help
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-system-cyan/10 to-blue-600/10 border border-system-cyan/30 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-system-cyan" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-white">
                Getting Started Guide
              </h1>
              <p className="text-sm text-white/60">
                Start your fitness RPG journey in 5 simple steps
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Introduction */}
          <section className="bg-gradient-to-br from-system-cyan/5 to-blue-600/5 border border-system-cyan/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Welcome to ASCEND
            </h2>
            <p className="text-white/70 leading-relaxed mb-4">
              ASCEND transforms your fitness journey into an epic RPG adventure. Complete quests, earn XP, level up, and climb from E-Rank to S-Rank. Train solo or compete with hunters worldwide in the Hunter Network.
            </p>
            <p className="text-white/70 leading-relaxed">
              This guide will walk you through your first 5 steps. Let's begin your journey!
            </p>
          </section>

          {/* Steps */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Your Journey Starts Here
            </h2>
            <div className="space-y-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-void-deep/50 border border-white/10 rounded-2xl p-6 hover:border-system-cyan/20 hover:bg-white/5 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", step.bgColor)}>
                        <Icon className={cn("w-6 h-6", step.color)} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-white">
                            {step.title}
                          </h3>
                          <span className="text-xs font-bold text-system-cyan bg-system-cyan/10 px-2 py-1 rounded">
                            Step {step.id}
                          </span>
                        </div>
                        <p className="text-white/70">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Pro Tips */}
          <section className="bg-void-deep/50 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Pro Tips for New Hunters
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-5"
                >
                  <h3 className="font-bold text-white mb-2">{tip.title}</h3>
                  <p className="text-sm text-white/60">{tip.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Quick Links */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              Continue Learning
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/help/ui-ux"
                className="bg-void-deep/50 border border-white/10 rounded-xl p-6 hover:border-system-cyan/30 hover:bg-white/5 transition-all group"
              >
                <BookOpen className="w-6 h-6 text-system-cyan mb-3" />
                <h3 className="font-bold text-white mb-2">UI/UX Guide</h3>
                <p className="text-sm text-white/60 mb-3">Learn how to navigate and use the app effectively.</p>
                <div className="flex items-center gap-2 text-sm text-system-cyan group-hover:text-white transition-colors">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>

              <Link
                href="/help/features"
                className="bg-void-deep/50 border border-white/10 rounded-xl p-6 hover:border-system-cyan/30 hover:bg-white/5 transition-all group"
              >
                <Zap className="w-6 h-6 text-purple-400 mb-3" />
                <h3 className="font-bold text-white mb-2">Features</h3>
                <p className="text-sm text-white/60 mb-3">Explore all features and how they work.</p>
                <div className="flex items-center gap-2 text-sm text-purple-400 group-hover:text-white transition-colors">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>

              <Link
                href="/help/demo-accounts"
                className="bg-void-deep/50 border border-white/10 rounded-xl p-6 hover:border-system-cyan/30 hover:bg-white/5 transition-all group"
              >
                <Users className="w-6 h-6 text-green-400 mb-3" />
                <h3 className="font-bold text-white mb-2">Demo Accounts</h3>
                <p className="text-sm text-white/60 mb-3">Try ASCEND with pre-configured accounts.</p>
                <div className="flex items-center gap-2 text-sm text-green-400 group-hover:text-white transition-colors">
                  View Accounts
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </section>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-system-cyan/10 to-blue-600/10 border border-system-cyan/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-3">
                Ready to Start Your Journey?
              </h3>
              <p className="text-white/70 mb-6">
                Join thousands of hunters leveling up their fitness one quest at a time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-system-cyan hover:bg-system-cyan/90 text-void-deep rounded-lg font-bold transition-all min-h-[44px]"
                >
                  Create Account
                  <Users className="w-5 h-5" />
                </Link>
                <Link
                  href="/help/demo-accounts"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg font-bold transition-all min-h-[44px]"
                >
                  Try Demo Accounts
                  <Award className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

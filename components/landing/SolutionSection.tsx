"use client";

import { motion } from 'framer-motion';
import { Target, Zap, Trophy, Users, Shield, Sword } from 'lucide-react';
import { SolutionCard } from '@/types/landing';

const iosSpring = {
  type: "spring" as const,
  stiffness: 350,
  damping: 0.8,
  mass: 0.8,
};

const triggerHaptic = () => {
  if ('vibrate' in navigator) {
    navigator.vibrate(5);
  }
};

export default function SolutionSection() {
  const solutions: SolutionCard[] = [
    {
      icon: Target,
      title: "AI-Powered Quests",
      description: "Personalized workouts by Groq Llama 3.3 70B - sub-second generation",
      color: "cyan"
    },
    {
      icon: Zap,
      title: "Instant Generation",
      description: "Get your personalized quest in under 2 seconds",
      color: "yellow"
    },
    {
      icon: Trophy,
      title: "RPG Progression",
      description: "Earn XP, level up, and unlock E→S hunter ranks",
      color: "purple"
    },
    {
      icon: Users,
      title: "Hunter Network",
      description: "Social feed with community verification and leaderboards",
      color: "blue"
    },
    {
      icon: Shield,
      title: "Anti-Cheat System",
      description: "Three-layer verification with Opik traces ensures integrity",
      color: "cyan"
    },
    {
      icon: Sword,
      title: "Multi-Class System",
      description: "Specialize as Tank, Striker, or Assassin hunter",
      color: "yellow"
    },
  ];

  const colorClasses: Record<string, string> = {
    cyan: 'from-cyan-500/20 to-blue-600/20 border-cyan-400/30',
    yellow: 'from-yellow-500/20 to-orange-600/20 border-yellow-400/30',
    purple: 'from-purple-500/20 to-pink-600/20 border-purple-400/30',
    blue: 'from-blue-500/20 to-cyan-600/20 border-blue-400/30',
  };

  const iconColorClasses: Record<string, string> = {
    cyan: 'text-cyan-400',
    yellow: 'text-yellow-400',
    purple: 'text-purple-400',
    blue: 'text-blue-400',
  };

  return (
    <section className="py-8 md:py-20 lg:py-24 px-4 md:px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 md:mb-16"
      >
        <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-3 md:mb-6">
          Enter System: Become a Hunter
        </h2>
        <p className="text-base md:text-xl text-white/60 max-w-3xl mx-auto">
          ASCEND transforms fitness with AI-powered personalization, immersive gamification, and a thriving hunter community.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
        {solutions.map((solution, index) => {
          const Icon = solution.icon;
          const color = solution.color || 'cyan';
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              onTouchStart={triggerHaptic}
              className="bg-ios-bg-secondary/80 backdrop-blur-xl border border-ios-border rounded-2xl p-4 md:p-4 lg:p-5 xl:p-6 hover:bg-ios-bg-secondary/90 transition-all shadow-lg group"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-7 h-7 ${iconColorClasses[color]}`} />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                {solution.title}
              </h3>
              <p className="text-sm md:text-base text-white/60 leading-relaxed">
                {solution.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-10 md:mt-16 p-5 md:p-8 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-xl border-2 border-cyan-400/20 rounded-2xl text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-2xl md:text-3xl">⭐</span>
          <p className="text-base md:text-lg font-bold text-white">
            Powered by OPIK AI - Observability for AI Excellence
          </p>
        </div>
        <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto">
          Real-time AI tracing, quality monitoring, and intelligent evaluation ensure every quest is perfectly tailored to your fitness journey.
        </p>
      </motion.div>
    </section>
  );
}

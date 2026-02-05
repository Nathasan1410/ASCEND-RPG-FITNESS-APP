"use client";

import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown, BarChart2, Users2, Gamepad2, Zap } from 'lucide-react';

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

export default function ProblemSection() {
  const problems = [
    {
      icon: AlertTriangle,
      title: "Motivation Crisis",
      statistic: "72% quit",
      description: "quit fitness goals within 3 months",
      color: "red" as const
    },
    {
      icon: TrendingDown,
      title: "Monotonous Workouts",
      statistic: "Boring routines",
      description: "lead to burnout and abandonment",
      color: "orange" as const
    },
    {
      icon: BarChart2,
      title: "Lack of Progress",
      statistic: "No metrics",
      description: "hard to see improvement without clear tracking",
      color: "yellow" as const
    },
    {
      icon: Users2,
      title: "Social Pressure",
      statistic: "No community",
      description: "no accountability or support network",
      color: "blue" as const
    },
    {
      icon: Gamepad2,
      title: "Gamification Gap",
      statistic: "$3.2B market",
      description: "underserved with superficial solutions",
      color: "purple" as const
    },
    {
      icon: Zap,
      title: "Low Engagement",
      statistic: "73% YoY",
      description: "AI adoption in fitness shows demand for innovation",
      color: "cyan" as const
    },
  ];

  const colorClasses = {
    red: 'from-red-500/20 to-orange-600/20 border-red-400/30',
    orange: 'from-orange-500/20 to-red-600/20 border-orange-400/30',
    yellow: 'from-yellow-500/20 to-orange-600/20 border-yellow-400/30',
    blue: 'from-blue-500/20 to-cyan-600/20 border-blue-400/30',
    purple: 'from-purple-500/20 to-pink-600/20 border-purple-400/30',
    cyan: 'from-cyan-500/20 to-blue-600/20 border-cyan-400/30',
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
          The Challenge: Staying Motivated in Fitness
        </h2>
        <p className="text-base md:text-xl text-white/60 max-w-3xl mx-auto">
          Traditional fitness apps fail because they don't address the fundamental human need for engagement, progression, and community.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
        {problems.map((problem, index) => {
          const Icon = problem.icon;
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
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorClasses[problem.color]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                {problem.title}
              </h3>
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                {problem.statistic}
              </div>
              <p className="text-sm md:text-base text-white/60 leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

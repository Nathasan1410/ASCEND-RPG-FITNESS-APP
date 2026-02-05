"use client";

import { motion } from 'framer-motion';
import { TrendingUp, Globe, Gamepad2, BarChart3, Sparkles, ArrowUpRight } from 'lucide-react';

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

export default function MarketSection() {
  const stats = [
    {
      icon: Globe,
      title: "Global Enthusiasts",
      value: "120M+",
      description: "anime/weeb enthusiasts worldwide",
    },
    {
      icon: Gamepad2,
      title: "Gaming Community",
      value: "750M+",
      description: "gamers across all platforms",
    },
    {
      icon: TrendingUp,
      title: "Market Size",
      value: "$3.2B",
      description: "fitness gamification market (28% CAGR)",
    },
    {
      icon: BarChart3,
      title: "Retention Issue",
      value: "72%",
      description: "quit fitness goals in 3 months",
    },
    {
      icon: Sparkles,
      title: "AI Adoption",
      value: "73%",
      description: "year-over-year growth in fitness AI",
    },
    {
      icon: ArrowUpRight,
      title: "Self-Improvement",
      value: "Rising",
      description: "growing trend across demographics",
    },
  ];

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
          A $3.2B Market Opportunity
        </h2>
        <p className="text-base md:text-xl text-white/60 max-w-3xl mx-auto">
          Positioned at the intersection of gaming, fitness, and AI - a rapidly growing market ripe for disruption
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
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
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base md:text-lg font-bold text-white mb-2">
                    {stat.title}
                  </h3>
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-10 md:mt-16 p-5 md:p-8 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 backdrop-blur-xl border-2 border-purple-400/20 rounded-2xl text-center"
      >
        <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto">
          The intersection of these massive markets creates a unique opportunity for ASCEND to capture significant market share through innovative AI-powered gamification.
        </p>
      </motion.div>
    </section>
  );
}

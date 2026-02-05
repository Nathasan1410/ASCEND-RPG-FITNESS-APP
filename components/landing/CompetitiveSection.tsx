"use client";

import { motion } from 'framer-motion';
import { Swords, Zap, ShieldCheck, Trophy, Users, Star } from 'lucide-react';
import { CompetitiveFeature } from '@/types/landing';

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

export default function CompetitiveSection() {
  const features: CompetitiveFeature[] = [
    {
      title: "Solo Leveling-Inspired",
      description: "Immersive RPG narrative with hunter system, ranks, and quest mechanics that resonate with anime/gaming enthusiasts",
    },
    {
      title: "True Gamification",
      description: "Complete progression system with XP, levels, E→S ranks, unlockable abilities, and meaningful rewards",
    },
    {
      title: "AI-Powered Personalization",
      description: "Groq generates tailored workouts instantly based on your fitness level, goals, and preferences",
    },
    {
      title: "OPIK Observability",
      description: "Real-time AI tracing and quality monitoring ensure every quest meets high standards",
    },
    {
      title: "Anti-Cheat Verification",
      description: "Three-layer verification system unique in fitness ensures authenticity and builds trust",
    },
    {
      title: "Multi-Class System",
      description: "Tank, Striker, Assassin specializations allow players to customize their hunter experience",
    },
  ];

  const icons = [Swords, Zap, ShieldCheck, Trophy, Users, Star];

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
          What Sets ASCEND Apart
        </h2>
        <p className="text-base md:text-xl text-white/60 max-w-3xl mx-auto">
          Six competitive advantages that make ASCEND the ultimate fitness RPG experience
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
        {features.map((feature, index) => {
          const Icon = icons[index % icons.length];
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
              className="bg-ios-bg-secondary/80 backdrop-blur-xl border-2 border-cyan-400/20 rounded-2xl p-4 md:p-4 lg:p-5 xl:p-6 hover:border-cyan-400/40 hover:bg-ios-bg-secondary/90 transition-all shadow-lg group"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-2 border-cyan-400/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-white/60 leading-relaxed">
                {feature.description}
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
        className="mt-10 md:mt-16 text-center"
      >
        <p className="text-base md:text-lg text-white/70">
          These advantages create a moat that competitors cannot easily replicate, positioning ASCEND as market leader in fitness gamification.
        </p>
      </motion.div>
    </section>
  );
}

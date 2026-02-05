"use client";

import { motion } from 'framer-motion';
import { Server, Cpu, Database, Code, Zap, Activity } from 'lucide-react';
import { TechStackItem } from '@/types/landing';

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

export default function TechStackSection() {
  const techStack: TechStackItem[] = [
    {
      name: "Next.js 14",
      description: "Modern React framework with App Router and Server Components",
      icon: Server,
    },
    {
      name: "Groq Llama 3.3 70B",
      description: "Sub-second AI inference for instant quest generation",
      icon: Cpu,
    },
    {
      name: "OPIK AI",
      description: "Real-time observability for AI quality and performance",
      icon: Activity,
    },
    {
      name: "Supabase",
      description: "Backend, database, and real-time subscriptions",
      icon: Database,
    },
    {
      name: "TypeScript",
      description: "Type-safe development with explicit interfaces",
      icon: Code,
    },
    {
      name: "Framer Motion",
      description: "Smooth animations with iOS spring physics",
      icon: Zap,
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
          Built on Cutting-Edge Technology
        </h2>
        <p className="text-base md:text-xl text-white/60 max-w-3xl mx-auto">
          Powered by industry-leading technologies for performance, scalability, and user experience
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
        {techStack.map((tech, index) => {
          const Icon = tech.icon;
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
              className="bg-ios-bg-secondary/80 backdrop-blur-xl border-2 border-purple-400/20 rounded-2xl p-4 md:p-4 lg:p-5 xl:p-6 hover:border-purple-400/40 hover:bg-ios-bg-secondary/90 transition-all shadow-lg group"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-400/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {Icon && <Icon className="w-7 h-7 text-purple-400" />}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                {tech.name}
              </h3>
              <p className="text-sm md:text-base text-white/60 leading-relaxed">
                {tech.description}
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
        <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto">
          This modern tech stack ensures ASCEND delivers fast, responsive, and secure fitness RPG experience across all devices.
        </p>
      </motion.div>
    </section>
  );
}

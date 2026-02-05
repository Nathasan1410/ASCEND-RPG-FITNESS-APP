"use client";

import { motion } from 'framer-motion';
import { ArrowRight, UserPlus, ScrollText, Dumbbell, Upload, Award, TrendingUp } from 'lucide-react';

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

export default function WorkflowSection() {
  const steps = [
    {
      step: 1,
      title: "Enter the System",
      description: "Create your hunter profile and choose your class",
      icon: UserPlus,
    },
    {
      step: 2,
      title: "Receive Quest",
      description: "AI generates personalized workout in under 2 seconds",
      icon: ScrollText,
    },
    {
      step: 3,
      title: "Complete Quest",
      description: "Execute exercises with built-in timer and guidance",
      icon: Dumbbell,
    },
    {
      step: 4,
      title: "Submit Proof",
      description: "Upload completion with three-layer verification",
      icon: Upload,
    },
    {
      step: 5,
      title: "Earn Rewards",
      description: "XP calculation with multipliers for streaks and difficulty",
      icon: Award,
    },
    {
      step: 6,
      title: "Level Up",
      description: "Unlock new ranks, abilities, and climb hunter rankings",
      icon: TrendingUp,
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
          The Hunter Workflow
        </h2>
        <p className="text-base md:text-xl text-white/60 max-w-3xl mx-auto">
          Six simple steps to transform your fitness journey into an epic adventure
        </p>
      </motion.div>

      <div className="relative">
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-400 to-cyan-400 transform -translate-x-1/2 opacity-30" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className={`relative flex items-start gap-4 ${isLeft ? 'lg:pr-16' : 'lg:pl-16'}`}
              >
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-2 border-cyan-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                    <Icon className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>

                <div className="flex-1 bg-ios-bg-secondary/80 backdrop-blur-xl border border-ios-border rounded-2xl p-4 md:p-4 lg:p-5 xl:p-6 hover:bg-ios-bg-secondary/90 transition-all shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                    >
                      {String(step.step).padStart(2, '0')}
                    </motion.div>
                    <ArrowRight className={`w-5 h-5 text-white/40 hidden lg:block ${isLeft ? 'rotate-0' : 'rotate-180'}`} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-white/60 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8">
                    <motion.div
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      className="w-8 h-8 rounded-full bg-cyan-400/20 border-2 border-cyan-400/50 flex items-center justify-center"
                    >
                      <ArrowRight className="w-5 h-5 text-cyan-400" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mt-10 md:mt-16 text-center"
      >
        <p className="text-sm md:text-base text-white/50">
          Each step is designed to keep you engaged, motivated, and progressing toward your fitness goals.
        </p>
      </motion.div>
    </section>
  );
}

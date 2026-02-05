"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Award, Trophy, Users } from 'lucide-react';
import { CTAProps } from '@/types/landing';

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

export default function HeroSection({ onStartJourney, onTryDemo }: CTAProps) {
  const [timeRemaining, setTimeRemaining] = useState(86400);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 86400));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const objectives = [
    "Transform fitness into immersive RPG experience",
    "Earn XP and level up your hunter",
    "Climb from E-rank to S-rank",
    "Join community of 10K+ hunters",
  ];

  const rewards = [
    { icon: Zap, name: "AI Quests", color: "cyan" },
    { icon: Award, name: "XP System", color: "yellow" },
    { icon: Trophy, name: "Ranks E→S", color: "purple" },
    { icon: Users, name: "Hunter Net", color: "blue" },
  ];

  return (
    <section className="relative min-h-screen md:min-h-screen flex flex-col items-center justify-center px-4 md:px-6 py-4 md:py-0">
      <div className="max-w-full md:max-w-6xl lg:max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="relative bg-[linear-gradient(135deg,rgba(10,10,21,0.95)_0%,rgba(5,5,10,0.98)_100%)] backdrop-blur-[20px] rounded-2xl border-2 border-cyan-400/50 p-5 md:p-4 lg:p-6 xl:p-10 shadow-[0_0_0_2px_rgba(6,182,212,0.3),0_0_40px_rgba(6,182,212,0.2),inset_0_0_40px_rgba(6,182,212,0.05)]"
          style={{
            animation: 'glow-pulse 3s ease-in-out infinite',
          }}
        >
          <style jsx global>{`
            @keyframes glow-pulse {
              0%, 100% {
                box-shadow: 0 0 0 2px rgba(6, 182, 212, 0.3), 0 0 40px rgba(6, 182, 212, 0.2), inset 0 0 40px rgba(6, 182, 212, 0.05);
              }
              50% {
                box-shadow: 0 0 0 2px rgba(6, 182, 212, 0.6), 0 0 60px rgba(6, 182, 212, 0.4), inset 0 0 40px rgba(6, 182, 212, 0.1);
              }
            }
          `}</style>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <div className="flex items-center gap-3 md:gap-3">
                <div className="w-14 h-14 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 border-2 border-yellow-300 shadow-[0_0_30px_rgba(250,204,21,0.6)] flex items-center justify-center">
                  <span className="text-2xl md:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg">S</span>
                </div>
                <div>
                  <div className="text-cyan-400 text-xs md:text-xs font-mono tracking-wider">RANK</div>
                  <div className="text-white text-xl md:text-xl lg:text-2xl font-bold tracking-tight">Daily Quest</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-cyan-400 text-xs md:text-xs font-mono">TIME REMAINING</div>
                <div className="text-white text-lg md:text-lg lg:text-xl font-mono tabular-nums">{formatTime(timeRemaining)}</div>
              </div>
            </div>

            <div className="mb-6 md:mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Turn Workouts
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  into Epic Quests
                </span>
              </h1>
              <p className="text-base md:text-base lg:text-lg text-white/70 leading-relaxed">
                AI-powered fitness RPG that transforms your workouts into an epic adventure. 
                Earn XP, level up, and climb hunter rankings.
              </p>
            </div>

            <div className="mb-6 md:mb-8">
              <div className="text-cyan-400 text-sm md:text-sm font-mono mb-3 md:mb-4 tracking-wider">OBJECTIVES</div>
              <div className="space-y-2 md:space-y-3">
                {objectives.map((objective, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-3 md:gap-3 p-3 md:p-3 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="w-6 h-6 md:w-6 md:h-6 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 md:w-4 md:h-4 text-cyan-400" />
                    </div>
                    <span className="text-base md:text-base text-white/80">{objective}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mb-6 md:mb-8">
              <div className="text-purple-400 text-sm md:text-sm font-mono mb-3 md:mb-4 tracking-wider">REWARDS</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-3 lg:gap-4">
                {rewards.map((reward, index) => {
                  const Icon = reward.icon;
                  const colorClass = {
                    cyan: 'text-cyan-400 bg-cyan-500/20',
                    yellow: 'text-yellow-400 bg-yellow-500/20',
                    purple: 'text-purple-400 bg-purple-500/20',
                    blue: 'text-blue-400 bg-blue-500/20',
                  }[reward.color] || 'text-cyan-400 bg-cyan-500/20';

                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-3 md:p-3 lg:p-4 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/10 flex flex-col items-center gap-2"
                      onTouchStart={triggerHaptic}
                    >
                      <div className={`w-10 h-10 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-lg ${colorClass} flex items-center justify-center`}>
                        <Icon className="w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                      </div>
                      <span className="text-xs md:text-[10px] lg:text-xs text-white/60 text-center leading-tight">{reward.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <motion.button
                onClick={onStartJourney}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onTouchStart={triggerHaptic}
                transition={iosSpring}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 md:py-4 px-6 md:px-6 lg:px-8 rounded-xl border-2 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] transition-all text-sm md:text-sm lg:text-base"
              >
                START YOUR JOURNEY
              </motion.button>
              <motion.button
                onClick={onTryDemo}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onTouchStart={triggerHaptic}
                transition={iosSpring}
                className="flex-1 bg-white/10 backdrop-blur-xl text-white font-bold py-4 md:py-4 px-6 md:px-6 lg:px-8 rounded-xl border-2 border-white/20 hover:bg-white/20 transition-all text-sm md:text-sm lg:text-base"
              >
                TRY DEMO ACCOUNTS
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

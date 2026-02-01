"use client";

import { motion } from "framer-motion";
import { xpForLevel, xpToNextLevel, levelProgress } from "@/lib/gamification/leveling";

interface XPBarProps {
  currentXp: number;
  level: number;
}

export function XPBar({ currentXp, level }: XPBarProps) {
  const progress = levelProgress(currentXp);
  const xpNeeded = xpToNextLevel(currentXp);

  return (
    <div className="w-full space-y-1">
      <div className="flex justify-between items-end text-xs font-mono">
        <span className="text-white font-bold">LVL {level}</span>
        <span className="text-white/60">
          {new Intl.NumberFormat().format(currentXp)} XP 
          <span className="text-white/30 ml-2">({new Intl.NumberFormat().format(xpNeeded)} to next)</span>
        </span>
      </div>
      
      <div className="h-2 w-full bg-void-surface border border-void-border rounded-full overflow-hidden relative">
        <motion.div
          className="h-full bg-gradient-to-r from-system-blue to-system-cyan shadow-[0_0_10px_rgba(0,255,255,0.5)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

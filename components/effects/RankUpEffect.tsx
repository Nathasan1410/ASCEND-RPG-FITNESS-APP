"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { RankTier } from "@/types/schemas";

interface RankUpEffectProps {
  show: boolean;
  rank: RankTier;
  onComplete: () => void;
}

export function RankUpEffect({ show, rank, onComplete }: RankUpEffectProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onComplete, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="w-64 h-64 border-4 border-system-cyan rounded-full flex items-center justify-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-system-cyan/20 animate-pulse" />
              <span className="text-8xl font-display font-bold text-white z-10">{rank.split("-")[0]}</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-8"
            >
              <h2 className="text-4xl font-display font-bold text-system-cyan uppercase tracking-widest">
                Rank Up
              </h2>
              <p className="text-white/60 font-mono mt-2">Authority Level Increased</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

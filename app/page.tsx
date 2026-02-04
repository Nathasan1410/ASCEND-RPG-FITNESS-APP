"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { AuthModal } from "@/components/auth/AuthModal";
import { motion, AnimatePresence } from "framer-motion";
import LightPillar from "@/components/effects/LightPillar";

export default function LandingPage() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* LightPillar Background */}
      <div className="absolute inset-0 w-full h-full bg-void-deep">
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <LightPillar
            topColor="#00b8ff"
            bottomColor="#bd00ff"
            intensity={1}
            rotationSpeed={0.3}
            glowAmount={0.002}
            pillarWidth={3}
            pillarHeight={0.4}
            noiseIntensity={0.5}
            pillarRotation={25}
            interactive={false}
            mixBlendMode="screen"
            quality="high"
          />
        </div>
      </div>

      <div className="z-10 text-center p-4">
        {/* Glass Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-12 space-y-8 inline-block"
        >
          {/* Title */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter mb-4">
              <span className="text-system-cyan/50 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">ASCEND</span>
            </h1>
            <p className="text-lg md:text-xl text-white/40 font-mono uppercase tracking-[0.3em]">
              Fitness RPG
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/60 max-w-md font-sans"
          >
            Your Daily Mandate to Become <span className="text-rank-s font-bold">S-Rank</span>.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
          >
            <button
              onClick={() => setShowAuth(true)}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-system-cyan/20 backdrop-blur-xl border border-system-cyan/40 text-white font-bold text-lg rounded-lg hover:bg-system-cyan/30 hover:border-system-cyan/60 transition-all shadow-[0_0_20px_rgba(0,184,255,0.3)] hover:shadow-[0_0_40px_rgba(0,184,255,0.5)] uppercase tracking-widest"
            >
              Begin Ascension
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Auth Modal Overlay */}
      <AnimatePresence>
        {showAuth && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <AuthModal onClose={() => setShowAuth(false)} />
              <button 
                onClick={() => setShowAuth(false)}
                className="absolute top-4 right-4 text-white/40 hover:text-white"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

"use client";

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
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

export default function CTASection({ onStartJourney, onTryDemo }: CTAProps) {
  return (
    <section className="py-10 md:py-32 px-4 md:px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-xl border-2 border-cyan-400/30 rounded-3xl p-6 md:p-16 text-center overflow-hidden"
      >
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
              Ready to Begin Your Hunter Journey?
            </h2>
            <p className="text-base md:text-xl lg:text-2xl text-white/80 mb-6 md:mb-12 max-w-3xl mx-auto">
              Join thousands of hunters transforming their fitness into an epic adventure
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 lg:gap-6 justify-center items-center"
          >
            <motion.button
              onClick={onStartJourney}
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(6,182,212,0.6)' }}
              whileTap={{ scale: 0.95 }}
              onTouchStart={triggerHaptic}
              transition={iosSpring}
              className="group w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 md:py-6 px-8 md:px-12 rounded-2xl border-2 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all text-base md:text-lg flex items-center justify-center gap-3"
            >
              <span>START YOUR JOURNEY</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              onClick={onTryDemo}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onTouchStart={triggerHaptic}
              transition={iosSpring}
              className="w-full sm:w-auto bg-white/10 backdrop-blur-xl text-white font-bold py-4 md:py-6 px-8 md:px-12 rounded-2xl border-2 border-white/30 hover:bg-white/20 transition-all text-base md:text-lg"
            >
              TRY DEMO
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-6 md:mt-12 flex items-center justify-center gap-3"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl md:text-2xl">⭐</span>
              <span className="text-sm md:text-base text-white/70">
                Powered by OPIK AI - Observability for AI Excellence
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

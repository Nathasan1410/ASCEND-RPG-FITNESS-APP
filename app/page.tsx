"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Github, Twitter, Instagram, Linkedin, BookOpen, Zap, Award, Shield, MessageCircle, User, Users, Clock, Play, Camera } from "lucide-react";
import { AuthModal } from "@/components/auth/AuthModal";
import { motion, AnimatePresence } from "framer-motion";
import LaserFlow from "@/components/LaserFlow";
import { useSnapCarousel } from 'react-snap-carousel';

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

export default function LandingPage() {
  const [showAuth, setShowAuth] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollRef, next, prev, goTo, pages, activePageIndex } = useSnapCarousel();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <main className="min-h-screen flex flex-col relative bg-void-deep safe-area-padded">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <LaserFlow
          color="#00b8ff"
          wispDensity={isMobile ? 1.0 : 2.0}
          flowSpeed={1.4}
          verticalSizing={4.5}
          horizontalSizing={3.5}
          fogIntensity={isMobile ? 0.7 : 1.5}
          fogScale={0.25}
          wispSpeed={30}
          wispIntensity={isMobile ? 4.0 : 8.0}
          flowStrength={0.3}
          decay={1.5}
          horizontalBeamOffset={0.0}
          verticalBeamOffset={-0.48}
          dpr={typeof window !== 'undefined' ? (isMobile ? 1 : window.devicePixelRatio) : 1}
          className={`w-full h-full ${isMobile ? 'opacity-60' : ''}`}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <header className="relative z-30 px-4 py-3 md:px-6 md:py-4">
        <Link href="/" className="inline-flex items-center gap-3 group hover:opacity-90 transition-opacity">
          <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,184,255,0.4)] group-hover:shadow-[0_0_30px_rgba(0,184,255,0.6)] transition-all">
            <img
              src="/img/logo.jpg"
              alt="ASCEND Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight">ASCEND</h1>
            <p className="text-xs md:text-sm text-white/60 font-mono">Fitness RPG</p>
          </div>
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center relative overflow-hidden z-10 px-4 py-8 md:py-0">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="fixed left-4 top-1/2 -translate-y-1/2 w-72 bg-ios-bg-secondary/90 backdrop-blur-xl border border-ios-border rounded-2xl p-5 hidden lg:block z-20"
        >
          <div className="mb-5 pb-4 border-b border-ios-divider">
            <h3 className="text-base font-bold text-white mb-1">
              Quick Links
            </h3>
            <p className="text-xs text-ios-text-secondary">
              Connect and explore ASCEND
            </p>
          </div>

          <a
            href="https://github.com/Nathasan1410/ASCEND-RPG-FITNESS-APP"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all mb-3 group"
            onTouchStart={triggerHaptic}
          >
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
              <Github className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white truncate">Github</div>
              <div className="text-xs text-ios-text-secondary truncate">View source code</div>
            </div>
            <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors flex-shrink-0" />
          </a>

          <a
            href="https://nathasan1410.gitbook.io/ascend-fitness-rpg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all mb-3 group"
            onTouchStart={triggerHaptic}
          >
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white truncate">Documentation</div>
              <div className="text-xs text-ios-text-secondary truncate">Technical GitBook</div>
            </div>
            <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors flex-shrink-0" />
          </a>

          <div className="space-y-2 mb-5">
            <a
              href="https://x.com/NthnaelSan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all group"
              onTouchStart={triggerHaptic}
            >
              <Twitter className="w-4 h-4 text-white/60 group-hover:text-white transition-colors flex-shrink-0" />
              <span className="text-sm text-white/80 group-hover:text-white transition-colors truncate flex-1">Twitter/X</span>
            </a>
            <a
              href="https://www.instagram.com/nthnael.san/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all group"
              onTouchStart={triggerHaptic}
            >
              <Instagram className="w-4 h-4 text-white/60 group-hover:text-white transition-colors flex-shrink-0" />
              <span className="text-sm text-white/80 group-hover:text-white transition-colors truncate flex-1">Instagram</span>
            </a>
            <a
              href="https://www.linkedin.com/in/nathanaelsantoso/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all group"
              onTouchStart={triggerHaptic}
            >
              <Linkedin className="w-4 h-4 text-white/60 group-hover:text-white transition-colors flex-shrink-0" />
              <span className="text-sm text-white/80 group-hover:text-white transition-colors truncate flex-1">LinkedIn</span>
            </a>
          </div>

          <div className="border-t border-ios-divider pt-4">
            <h4 className="text-xs font-bold text-white mb-2.5">
              Quick Stats
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-ios-text-secondary">Active Hunters</span>
                <span className="text-xs font-bold text-ios-accent">10K+</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-ios-text-secondary">Quests Completed</span>
                <span className="text-xs font-bold text-ios-accent">50K+</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-ios-text-secondary">XP Earned</span>
                <span className="text-xs font-bold text-ios-accent">500K+</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="w-full max-w-md mx-auto z-10 relative"
        >
          <div className="relative bg-ios-bg-secondary/90 backdrop-blur-xl border border-ios-border rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg">
            <div className="relative z-10 text-center">
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                <h1 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight mb-2">
                  ASCEND
                </h1>
                <p className="text-xl md:text-2xl text-ios-text-secondary font-medium mb-6">
                  Fitness RPG
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-base md:text-xl text-white/80 leading-relaxed mb-8">
                Turn Workouts into Epic Quests. Earn XP, level up, and climb the hunter rankings.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, ...iosSpring }}
                className="flex flex-col gap-3 w-full"
              >
                <motion.button
                  onClick={() => {
                    triggerHaptic();
                    setShowAuth(true);
                  }}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 0.8 }}
                  className="w-full bg-ios-accent text-white font-semibold py-4 rounded-full shadow-lg touch-target"
                >
                  Start Your Journey
                </motion.button>
                <motion.button
                  onClick={() => triggerHaptic()}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 0.8 }}
                  className="w-full bg-white/10 backdrop-blur-xl text-white font-semibold py-4 rounded-full border border-ios-border touch-target"
                >
                  Try Demo Accounts
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto relative z-10"
      >
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-3 md:mb-4">
            Level Up Your Fitness
          </h2>
          <p className="text-base md:text-xl text-ios-text-secondary max-w-3xl mx-auto">
            ASCEND transforms your fitness journey into an RPG adventure. Earn XP, level up, and climb hunter rankings.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[
            { icon: Zap, title: "AI-Powered Quests", desc: "Personalized workouts by Groq AI" },
            { icon: Award, title: "Gamification", desc: "Earn XP, level up, unlock ranks" },
            { icon: Users, title: "Social Community", desc: "Hunter Network feed and leaderboards" },
            { icon: Shield, title: "Verification System", desc: "Anti-cheat proof upload system" },
            { icon: MessageCircle, title: "Real-time Feedback", desc: "Opik AI judge evaluation" },
            { icon: User, title: "Multi-Class System", desc: "Tank, Striker, Assassin classes" },
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileTap={{ scale: 0.98 }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="bg-ios-bg-secondary/80 backdrop-blur-xl border border-ios-border rounded-2xl p-5 md:p-6 hover:bg-ios-bg-secondary/90 transition-all group shadow-lg"
                onTouchStart={triggerHaptic}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ios-accent/20 to-blue-600/20 border border-ios-accent/30 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-ios-accent group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-base text-ios-text-secondary leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="py-16 md:py-24 px-0 max-w-full mx-auto relative z-10 overflow-hidden"
      >
        <div className="text-center mb-8 md:mb-12 px-4">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-3 md:mb-4">
            See ASCEND in Action
          </h2>
          <p className="text-base md:text-xl text-ios-text-secondary max-w-3xl mx-auto">
            Explore the interface and features
          </p>
        </div>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth scrollbar-hide px-4 md:px-[15vw]"
          style={{
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth'
          }}
        >
          {[
            { id: 1, title: "Dashboard", desc: "Your fitness command center" },
            { id: 2, title: "AI Quest Generation", desc: "Personalized workout quests" },
            { id: 3, title: "Quest Completion", desc: "Track your progress" },
            { id: 4, title: "Hunter Network", desc: "Social feed with community" },
            { id: 5, title: "Leaderboard", desc: "Climb the rankings" },
            { id: 6, title: "Mobile Experience", desc: "Fitness on the go" },
          ].map((screenshot, index) => (
            <motion.div
              key={screenshot.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              whileTap={{ scale: 0.98 }}
              className="flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[50vw] aspect-video bg-ios-bg-secondary/80 backdrop-blur-xl border border-ios-border overflow-hidden group shadow-lg md:shadow-xl mx-3 md:mx-3"
              style={{ scrollSnapAlign: 'center' }}
              onTouchStart={triggerHaptic}
            >
              <div className="relative w-full h-full bg-gradient-to-br from-ios-accent/20 to-blue-600/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-xl border-2 border-white/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Camera className="w-8 h-8 text-white/40" />
                  </div>
                  <p className="text-sm font-bold text-white/80">
                    {screenshot.title}
                  </p>
                  <p className="text-xs text-white/50 mt-1">
                    Screenshot Coming Soon
                  </p>
                </div>
              </div>

              <div className="p-4 md:p-6 pb-6 md:pb-8 absolute bottom-0 left-0 right-0">
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                  {screenshot.title}
                </h3>
                <p className="text-base text-ios-text-secondary">
                  {screenshot.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-6 md:mt-8 px-4">
          <button
            onClick={(e) => { e.preventDefault(); prev(); }}
            disabled={activePageIndex === 0}
            onTouchStart={triggerHaptic}
            className="p-3 bg-ios-bg-secondary/80 backdrop-blur-xl border border-ios-border rounded-lg hover:border-ios-accent/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg touch-target"
          >
            <ArrowRight className="w-6 h-6 text-white rotate-180" />
          </button>
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={(e) => { e.preventDefault(); goTo(index); }}
              onTouchStart={triggerHaptic}
              className={`w-3 h-3 rounded-full transition-all ${
                activePageIndex === index 
                  ? 'bg-ios-accent w-8' 
                  : 'bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
          <button
            onClick={(e) => { e.preventDefault(); next(); }}
            disabled={activePageIndex === pages.length - 1}
            onTouchStart={triggerHaptic}
            className="p-3 bg-ios-bg-secondary/80 backdrop-blur-xl border border-ios-border rounded-lg hover:border-ios-accent/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg touch-target"
          >
            <ArrowRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto relative z-10"
      >
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-3 md:mb-4">
            Featured Guides
          </h2>
          <p className="text-base md:text-xl text-ios-text-secondary max-w-3xl mx-auto">
            Quick access to our most popular documentation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {[
            {
              id: 1,
              title: "Getting Started",
              desc: "Complete beginner's guide to start your journey",
              readTime: "5 min",
              link: "/help/getting-started",
              icon: BookOpen,
            },
            {
              id: 2,
              title: "AI Quest System",
              desc: "How AI generates personalized workouts for you",
              readTime: "3 min",
              link: "/help/features#ai-quests",
              icon: Zap,
            },
            {
              id: 3,
              title: "Hunter Ranking",
              desc: "Understanding E to S rank system and progression",
              readTime: "4 min",
              link: "/help/features#ranking",
              icon: Award,
            },
          ].map((guide, index) => {
            const Icon = guide.icon;
            return (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                <Link href={guide.link}>
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 0.8 }}
                    className="bg-ios-bg-secondary/80 backdrop-blur-xl border border-ios-border rounded-2xl p-5 md:p-6 hover:bg-ios-bg-secondary/90 transition-all group h-full shadow-lg"
                    onTouchStart={triggerHaptic}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ios-accent/20 to-blue-600/20 border border-ios-accent/30 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-ios-accent group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {guide.title}
                    </h3>
                    <p className="text-base text-ios-text-secondary leading-relaxed mb-4">
                      {guide.desc}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-white/50">
                      <Clock className="w-4 h-4" />
                      <span>{guide.readTime} read</span>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto relative z-10"
      >
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-3 md:mb-4">
            Watch ASCEND in Action
          </h2>
          <p className="text-base md:text-xl text-ios-text-secondary max-w-3xl mx-auto">
            From concept to implementation, see everything ASCEND has to offer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {[
            {
              id: 'intro',
              title: 'ASCEND Introduction',
              desc: 'Quick overview of ASCEND and what makes it unique',
              youtubeId: '',
              duration: '2:00',
            },
            {
              id: 'pitch',
              title: 'Why ASCEND Matters',
              desc: 'Energetic vlog explaining our vision and mission',
              youtubeId: '',
              duration: '3:00',
            },
            {
              id: 'demo',
              title: 'Full App Demo',
              desc: 'Complete walkthrough of all features',
              youtubeId: '',
              duration: '5:00',
            },
          ].map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
              className="bg-ios-bg-secondary/80 backdrop-blur-xl border border-ios-border overflow-hidden group shadow-lg cursor-pointer"
              onTouchStart={triggerHaptic}
            >
              <div className="relative w-full aspect-video bg-gradient-to-br from-ios-accent/20 to-blue-600/20">
                {video.youtubeId ? (
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-ios-accent/90 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,184,255,0.5)] group-hover:scale-110 group-hover:shadow-[0_0_50px_rgba(0,184,255,0.7)] transition-all duration-300">
                        <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded text-xs font-bold text-white">
                      {video.duration}
                    </div>
                  </>
                )}
              </div>

              <div className="p-4 md:p-5">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {video.title}
                </h3>
                <p className="text-base text-ios-text-secondary">
                  {video.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <footer className="border-t border-ios-divider bg-ios-bg-secondary/80 backdrop-blur-xl relative z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
                ASCEND
              </h3>
              <p className="text-base text-ios-text-secondary mb-4">
                Turn Workouts into Epic Quests
              </p>
              <div className="flex gap-3 md:gap-4">
                <a href="https://github.com/Nathasan1410/ASCEND-RPG-FITNESS-APP" target="_blank" className="text-white/60 hover:text-white transition-colors" onTouchStart={triggerHaptic}>
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://x.com/NthnaelSan" target="_blank" className="text-white/60 hover:text-white transition-colors" onTouchStart={triggerHaptic}>
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/nthnael.san/" target="_blank" className="text-white/60 hover:text-white transition-colors" onTouchStart={triggerHaptic}>
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/nathanaelsantoso/" target="_blank" className="text-white/60 hover:text-white transition-colors" onTouchStart={triggerHaptic}>
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-3">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li><Link href="/tracker" className="text-sm text-ios-text-secondary hover:text-white transition-colors">Implementation Tracker</Link></li>
                <li><Link href="/roadmap" className="text-sm text-ios-text-secondary hover:text-white transition-colors">Roadmap</Link></li>
                <li><Link href="/help" className="text-sm text-ios-text-secondary hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/help/demo-accounts" className="text-sm text-ios-text-secondary hover:text-white transition-colors">Demo Accounts</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-3">
                Documentation
              </h4>
              <ul className="space-y-2">
                <li><a href="https://nathasan1410.gitbook.io/ascend-fitness-rpg" target="_blank" className="text-sm text-ios-text-secondary hover:text-white transition-colors">GitBook Docs</a></li>
                <li><Link href="/help/features" className="text-sm text-ios-text-secondary hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/help/opik" className="text-sm text-ios-text-secondary hover:text-white transition-colors">Opik Integration</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-3">
                Contact
              </h4>
              <ul className="space-y-2">
                <li><a href="mailto:nthnael.san1410@gmail.com" className="text-sm text-ios-text-secondary hover:text-white transition-colors">nthnael.san1410@gmail.com</a></li>
                <li><Link href="/help/faq" className="text-sm text-ios-text-secondary hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-ios-divider pt-6 md:pt-8 text-center">
            <p className="text-sm text-white/40">
              © 2026 ASCEND: Fitness RPG. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showAuth && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              transition={{ ...iosSpring }}
            >
              <AuthModal onClose={() => setShowAuth(false)} />
              <button 
                onClick={() => setShowAuth(false)}
                onTouchStart={triggerHaptic}
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

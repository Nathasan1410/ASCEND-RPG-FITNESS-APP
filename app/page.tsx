"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Github, Twitter, Instagram, Linkedin, BookOpen, Zap, Award, Shield, MessageCircle, User, Users, Clock, Play, Camera } from "lucide-react";
import { AuthModal } from "@/components/auth/AuthModal";
import { motion, AnimatePresence } from "framer-motion";
import LaserFlow from "@/components/LaserFlow";
import { useSnapCarousel } from 'react-snap-carousel';

export default function LandingPage() {
  const [showAuth, setShowAuth] = useState(false);
  const { scrollRef, next, prev, goTo, pages, activePageIndex } = useSnapCarousel();

  return (
    <main className="min-h-screen flex flex-col relative bg-void-deep">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <LaserFlow
          color="#00b8ff"
          wispDensity={2.0}
          flowSpeed={1.4}
          verticalSizing={4.5}
          horizontalSizing={3.5}
          fogIntensity={1.5}
          fogScale={0.25}
          wispSpeed={30}
          wispIntensity={8.0}
          flowStrength={0.3}
          decay={1.5}
          horizontalBeamOffset={0.0}
          verticalBeamOffset={-0.48}
          dpr={typeof window !== 'undefined' ? window.devicePixelRatio : 1}
          className="w-full h-full"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <header className="relative z-30 p-6">
        <Link href="/" className="inline-flex items-center gap-3 group hover:opacity-90 transition-opacity">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,184,255,0.4)] group-hover:shadow-[0_0_30px_rgba(0,184,255,0.6)] transition-all">
            <img
              src="/img/logo.jpg"
              alt="ASCEND Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-white tracking-tight">ASCEND</h1>
            <p className="text-xs text-white/60 font-mono">Fitness RPG</p>
          </div>
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center relative overflow-hidden z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="fixed left-4 top-1/2 -translate-y-1/2 w-72 bg-void-deep/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hidden lg:block z-20"
        >
          <div className="mb-5 pb-4 border-b border-white/10">
            <h3 className="text-base font-bold text-white mb-1">
              Quick Links
            </h3>
            <p className="text-xs text-white/60">
              Connect and explore ASCEND
            </p>
          </div>

          <a
            href="https://github.com/Nathasan1410/ASCEND-RPG-FITNESS-APP"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all mb-3 group"
          >
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
              <Github className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white truncate">Github</div>
              <div className="text-xs text-white/60 truncate">View source code</div>
            </div>
            <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors flex-shrink-0" />
          </a>

          <a
            href="https://nathasan1410.gitbook.io/ascend-fitness-rpg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all mb-3 group"
          >
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white truncate">Documentation</div>
              <div className="text-xs text-white/60 truncate">Technical GitBook</div>
            </div>
            <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors flex-shrink-0" />
          </a>

          <div className="space-y-2 mb-5">
            <a
              href="https://x.com/NthnaelSan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all group"
            >
              <Twitter className="w-4 h-4 text-white/60 group-hover:text-white transition-colors flex-shrink-0" />
              <span className="text-sm text-white/80 group-hover:text-white transition-colors truncate flex-1">Twitter/X</span>
            </a>
            <a
              href="https://www.instagram.com/nthnael.san/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all group"
            >
              <Instagram className="w-4 h-4 text-white/60 group-hover:text-white transition-colors flex-shrink-0" />
              <span className="text-sm text-white/80 group-hover:text-white transition-colors truncate flex-1">Instagram</span>
            </a>
            <a
              href="https://www.linkedin.com/in/nathanaelsantoso/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all group"
            >
              <Linkedin className="w-4 h-4 text-white/60 group-hover:text-white transition-colors flex-shrink-0" />
              <span className="text-sm text-white/80 group-hover:text-white transition-colors truncate flex-1">LinkedIn</span>
            </a>
          </div>

          <div className="border-t border-white/10 pt-4">
            <h4 className="text-xs font-bold text-white mb-2.5">
              Quick Stats
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60">Active Hunters</span>
                <span className="text-xs font-bold text-system-cyan">10K+</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60">Quests Completed</span>
                <span className="text-xs font-bold text-system-cyan">50K+</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60">XP Earned</span>
                <span className="text-xs font-bold text-system-cyan">500K+</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-[85vw] max-w-[75vw] mx-auto z-10 p-4 relative"
        >
          <div className="relative bg-gradient-to-br from-void-deep/90 via-void-deep/95 to-void-deep/90 backdrop-blur-2xl border-4 border-white/20 rounded-2xl py-[120px] px-[20px] shadow-[0_0_60px_rgba(0,184,255,0.3)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-system-cyan/5 via-transparent to-blue-600/5 pointer-events-none" />
            
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-system-cyan/50 rounded-tl-2xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-system-cyan/50 rounded-tr-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-system-cyan/50 rounded-bl-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-system-cyan/50 rounded-br-2xl pointer-events-none" />
            
            <div className="absolute inset-0 border-2 border-white/5 rounded-xl pointer-events-none" />
            
            <div className="relative z-10 text-center">
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="text-7xl md:text-9xl font-display font-bold tracking-tighter mb-4 relative inline-block">
                  <span className="text-system-cyan drop-shadow-[0_0_40px_rgba(0,184,255,0.9)] animate-pulse hover:drop-shadow-[0_0_60px_rgba(0,184,255,1)] transition-all duration-300">ASCEND</span>
                </h1>
                <p className="text-2xl md:text-3xl text-white/50 font-mono uppercase tracking-[0.3em] mb-8">
                  Fitness RPG
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-system-cyan/20 backdrop-blur-xl border-2 border-system-cyan/50 flex items-center justify-center shadow-[0_0_20px_rgba(0,184,255,0.4)]"
              >
                <span className="text-system-cyan font-bold text-xl">!</span>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed"
            >
              Turn Workouts into Epic Quests. Earn XP, level up, and climb the hunter rankings.
            </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
            className="flex flex-col md:flex-row items-center gap-4 justify-center"
          >
            <button
              onClick={() => setShowAuth(true)}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-system-cyan/20 backdrop-blur-xl border border-system-cyan/40 text-white font-bold text-xl rounded-xl hover:bg-system-cyan/30 hover:border-system-cyan/60 transition-all shadow-[0_0_20px_rgba(0,184,255,0.3)] hover:shadow-[0_0_40px_rgba(0,184,255,0.5)] uppercase tracking-widest min-h-[56px]"
            >
              Start Your Journey
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link
              href="/help/demo-accounts"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-white/10 hover:bg-white/20 text-white font-bold text-xl rounded-xl transition-all min-h-[56px]"
            >
              Try Demo Accounts
            </Link>
          </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="py-24 px-4 max-w-7xl mx-auto relative z-10"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Level Up Your Fitness
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            ASCEND transforms your fitness journey into an RPG adventure. Earn XP, level up, and climb hunter rankings.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                className="bg-void-deep/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 hover:border-system-cyan/30 hover:bg-void-deep/90 transition-all group shadow-2xl"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-system-cyan/20 to-blue-600/20 border border-system-cyan/30 flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-system-cyan group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-system-cyan transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/60">
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
        transition={{ delay: 0.3, duration: 0.8 }}
        className="py-24 px-0 max-w-full mx-auto relative z-10 overflow-hidden"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            See ASCEND in Action
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Explore the interface and features
          </p>
        </div>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto scroll-smooth scrollbar-hide px-[15vw] md:px-[20vw]"
          style={{
            scrollSnapType: 'x mandatory'
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
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="flex-shrink-0 w-[70vw] md:w-[60vw] lg:w-[50vw] aspect-video bg-void-deep/80 backdrop-blur-2xl border border-white/10 overflow-hidden group shadow-2xl hover:shadow-[0_0_30px_rgba(0,184,255,0.4)] mx-3"
              style={{ scrollSnapAlign: 'center' }}
            >
              <div className="relative w-full h-full bg-gradient-to-br from-system-cyan/20 to-blue-600/20 flex items-center justify-center group-hover:shadow-[0_0_50px_rgba(0,184,255,0.6)] transition-all duration-300">
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

              <div className="p-6 pb-8 absolute bottom-0 left-0 right-0">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-system-cyan transition-colors">
                  {screenshot.title}
                </h3>
                <p className="text-base text-white/60">
                  {screenshot.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={(e) => { e.preventDefault(); prev(); }}
            disabled={activePageIndex === 0}
            className="p-3 bg-void-deep/80 backdrop-blur-2xl border border-white/10 rounded-lg hover:border-system-cyan/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-2xl"
          >
            <ArrowRight className="w-6 h-6 text-white rotate-180" />
          </button>
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={(e) => { e.preventDefault(); goTo(index); }}
              className={`w-3 h-3 rounded-full transition-all ${
                activePageIndex === index 
                  ? 'bg-system-cyan w-8' 
                  : 'bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
          <button
            onClick={(e) => { e.preventDefault(); next(); }}
            disabled={activePageIndex === pages.length - 1}
            className="p-3 bg-void-deep/80 backdrop-blur-2xl border border-white/10 rounded-lg hover:border-system-cyan/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-2xl"
          >
            <ArrowRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="py-24 px-4 max-w-7xl mx-auto relative z-10"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Featured Guides
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Quick access to our most popular documentation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
              >
                <Link href={guide.link}>
                  <div className="bg-void-deep/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 hover:border-system-cyan/30 hover:bg-void-deep/90 transition-all group h-full shadow-2xl">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-system-cyan/20 to-blue-600/20 border border-system-cyan/30 flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-system-cyan group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-system-cyan transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-white/60 mb-4">
                      {guide.desc}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-white/40">
                      <Clock className="w-3 h-3" />
                      <span>{guide.readTime} read</span>
                    </div>
                  </div>
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
        transition={{ delay: 0.5, duration: 0.8 }}
        className="py-24 px-4 max-w-7xl mx-auto relative z-10"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Watch ASCEND in Action
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            From concept to implementation, see everything ASCEND has to offer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="bg-void-deep/80 backdrop-blur-2xl border border-white/10 overflow-hidden group shadow-2xl cursor-pointer"
            >
              <div className="relative w-full aspect-video bg-gradient-to-br from-system-cyan/20 to-blue-600/20">
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
                      <div className="w-20 h-20 bg-system-cyan/90 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,184,255,0.5)] group-hover:scale-110 group-hover:shadow-[0_0_50px_rgba(0,184,255,0.7)] transition-all duration-300">
                        <Play className="w-10 h-10 text-white fill-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded text-xs font-bold text-white">
                      {video.duration}
                    </div>
                  </>
                )}
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-system-cyan transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-white/60">
                  {video.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <footer className="border-t border-white/10 bg-void-deep/80 backdrop-blur-2xl relative z-20">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-1">
              <h3 className="text-xl font-bold text-white mb-3">
                ASCEND
              </h3>
              <p className="text-sm text-white/60 mb-4">
                Turn Workouts into Epic Quests
              </p>
              <div className="flex gap-3">
                <a href="https://github.com/Nathasan1410/ASCEND-RPG-FITNESS-APP" target="_blank" className="text-white/60 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://x.com/NthnaelSan" target="_blank" className="text-white/60 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/nthnael.san/" target="_blank" className="text-white/60 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/nathanaelsantoso/" target="_blank" className="text-white/60 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white mb-3">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li><Link href="/tracker" className="text-sm text-white/60 hover:text-white transition-colors">Implementation Tracker</Link></li>
                <li><Link href="/roadmap" className="text-sm text-white/60 hover:text-white transition-colors">Roadmap</Link></li>
                <li><Link href="/help" className="text-sm text-white/60 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/help/demo-accounts" className="text-sm text-white/60 hover:text-white transition-colors">Demo Accounts</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white mb-3">
                Documentation
              </h4>
              <ul className="space-y-2">
                <li><a href="https://nathasan1410.gitbook.io/ascend-fitness-rpg" target="_blank" className="text-sm text-white/60 hover:text-white transition-colors">GitBook Docs</a></li>
                <li><Link href="/help/features" className="text-sm text-white/60 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/help/opik" className="text-sm text-white/60 hover:text-white transition-colors">Opik Integration</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white mb-3">
                Contact
              </h4>
              <ul className="space-y-2">
                <li><a href="mailto:nthnael.san1410@gmail.com" className="text-sm text-white/60 hover:text-white transition-colors">nthnael.san1410@gmail.com</a></li>
                <li><Link href="/help/faq" className="text-sm text-white/60 hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center">
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

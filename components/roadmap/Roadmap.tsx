"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Star, ChevronDown, ChevronUp, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { roadmapFeatures, innovationFeatures, type Feature } from "./roadmap-data";
import { RoadmapFeatureCard } from "./RoadmapFeatureCard";

export function Roadmap() {
  const [expandedSections, setExpandedSections] = useState<string[]>(['q2-2026', 'q3-2026', 'q4-2026', 'innovation']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const totalFeatures = roadmapFeatures.length;
  const totalInnovationFeatures = innovationFeatures.length;
  const averageInnovationRating = innovationFeatures.reduce((sum, f) => sum + (f.starRating || 0), 0) / totalInnovationFeatures;

  const q2Features = roadmapFeatures.filter(f => f.timeline.includes('Q2'));
  const q3Features = roadmapFeatures.filter(f => f.timeline.includes('Q3'));
  const q4Features = roadmapFeatures.filter(f => f.timeline.includes('Q4'));

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-void-deep/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/" className="text-white/60 hover:text-white transition-colors mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-display font-bold text-white mb-2">
            Development Roadmap
          </h1>
          <p className="text-white/60">
            What's coming next for ASCEND
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-br from-system-cyan/5 to-blue-600/5 border border-system-cyan/20 rounded-2xl p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-system-cyan/20 to-blue-600/20 border border-system-cyan/30 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-8 h-8 text-system-cyan" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">
                  ASCEND Development Roadmap
                </h2>
                <p className="text-white/70">
                  We're constantly improving ASCEND with new features and enhancements. Here's what we're working on.
                </p>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-void-deep/50 border border-white/10 rounded-xl p-4">
                <div className="text-sm text-white/60 mb-1">Total Planned Features</div>
                <div className="text-2xl font-bold text-white">{totalFeatures}</div>
              </div>
              <div className="bg-void-deep/50 border border-white/10 rounded-xl p-4">
                <div className="text-sm text-white/60 mb-1">Innovation Features</div>
                <div className="text-2xl font-bold text-white">{totalInnovationFeatures}</div>
              </div>
              <div className="bg-void-deep/50 border border-white/10 rounded-xl p-4">
                <div className="text-sm text-white/60 mb-1">Avg Innovation Rating</div>
                <div className="text-2xl font-bold text-system-cyan flex items-center gap-2">
                  <Star className="w-5 h-5 fill-current" />
                  {averageInnovationRating.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Q2 2026 Section */}
        <RoadmapSection
          id="q2-2026"
          title="Q2 2026"
          subtitle="April - June"
          features={q2Features}
          expanded={expandedSections.includes('q2-2026')}
          onToggle={() => toggleSection('q2-2026')}
          delay={0.1}
        />

        {/* Q3 2026 Section */}
        <RoadmapSection
          id="q3-2026"
          title="Q3 2026"
          subtitle="July - September"
          features={q3Features}
          expanded={expandedSections.includes('q3-2026')}
          onToggle={() => toggleSection('q3-2026')}
          delay={0.2}
        />

        {/* Q4 2026 Section */}
        <RoadmapSection
          id="q4-2026"
          title="Q4 2026"
          subtitle="October - December"
          features={q4Features}
          expanded={expandedSections.includes('q4-2026')}
          onToggle={() => toggleSection('q4-2026')}
          delay={0.3}
        />

        {/* Innovation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-400 fill-current" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Innovation Features</h2>
                <p className="text-sm text-white/60">High-impact features with exceptional innovation scores</p>
              </div>
            </div>
            <button
              onClick={() => toggleSection('innovation')}
              className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              {expandedSections.includes('innovation') ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
            </button>
          </div>

          {expandedSections.includes('innovation') && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {innovationFeatures.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  <RoadmapFeatureCard feature={feature} showInnovationRating />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Try It Now */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20 rounded-2xl p-8"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
              <Zap className="w-7 h-7 text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">
                Try Existing Features
              </h3>
              <p className="text-sm text-white/70 mb-4">
                Want to see what's already available? Check out our demo accounts or explore the current feature set.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/help/demo-accounts"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-system-cyan hover:bg-system-cyan/90 text-void-deep rounded-lg font-bold transition-all min-h-[44px]"
                >
                  Try Demo Accounts
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/tracker"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold transition-all min-h-[44px]"
                >
                  View Implementation Tracker
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-4 py-8 border-t border-white/10 mt-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            Last updated: February 5, 2026
          </p>
          <div className="flex items-center gap-6 text-sm text-white/40">
            <span>{totalFeatures} features planned</span>
            <span>{totalInnovationFeatures} innovation features</span>
            <span>Q2-Q4 2026 roadmap</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface RoadmapSectionProps {
  id: string;
  title: string;
  subtitle: string;
  features: Feature[];
  expanded: boolean;
  onToggle: () => void;
  delay: number;
}

function RoadmapSection({ id, title, subtitle, features, expanded, onToggle, delay }: RoadmapSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="mb-12"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-system-cyan/20 to-blue-600/20 border border-system-cyan/30 flex items-center justify-center">
            <Clock className="w-6 h-6 text-system-cyan" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <p className="text-sm text-white/60">{subtitle}</p>
          </div>
        </div>
        <button
          onClick={onToggle}
          className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
        >
          {expanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
        </button>
      </div>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: delay + 0.1 + index * 0.05 }}
            >
              <RoadmapFeatureCard feature={feature} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

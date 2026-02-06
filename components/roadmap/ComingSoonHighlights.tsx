"use client";

import { motion } from "framer-motion";
import { Sparkles, Crown, Zap, Apple, Scale, Users, MessageCircle, ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";

interface ComingSoonFeature {
  id: string;
  name: string;
  description: string;
  icon: typeof Sparkles;
  color: string;
  bgColor: string;
  borderColor: string;
  comingSoonText: string;
  status: "Planned" | "In Progress";
}

const comingSoonFeatures: ComingSoonFeature[] = [
  {
    id: "ai-chatbot",
    name: "AI Chatbot",
    description: "Interactive chatbot for exercise explanations, form corrections, and 24/7 workout guidance",
    icon: MessageCircle,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    borderColor: "border-purple-400/30",
    comingSoonText: "Q3 2026",
    status: "Planned"
  },
  {
    id: "nutrition-tracking",
    name: "Nutrition Tracking",
    description: "Track meals, macros, and calories with AI macro estimation from food photos",
    icon: Apple,
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
    borderColor: "border-pink-400/30",
    comingSoonText: "Q3 2026",
    status: "Planned"
  },
  {
    id: "iot-scale-tracking",
    name: "Smart Scale Integration",
    description: "Bluetooth scale integration, body composition monitoring, AI-powered weight insights",
    icon: Scale,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/30",
    comingSoonText: "Q3 2026",
    status: "Planned"
  },
  {
    id: "gym-tools-integration",
    name: "Gym Tools Integration",
    description: "Connect with Technogym, Peloton, iFit, and other gym equipment for seamless tracking",
    icon: Zap,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    borderColor: "border-yellow-400/30",
    comingSoonText: "Q3 2026",
    status: "Planned"
  },
  {
    id: "guild-features",
    name: "Guild Features",
    description: "Guilds, dungeons, raids, boss battles, territory wars, and team competitions",
    icon: Crown,
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    borderColor: "border-orange-400/30",
    comingSoonText: "Q4 2026",
    status: "Planned"
  },
  {
    id: "monetization-system",
    name: "Monetization System",
    description: "Free/Pro tiers with different features, pricing plans, and exclusive Pro benefits",
    icon: Crown,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    borderColor: "border-green-400/30",
    comingSoonText: "Q4 2026",
    status: "Planned"
  },
  {
    id: "hunter-network",
    name: "Hunter Network",
    description: "Social feed with workout posts, kudos, respects, following, and community building",
    icon: Users,
    color: "text-system-cyan",
    bgColor: "bg-system-cyan/10",
    borderColor: "border-system-cyan/30",
    comingSoonText: "Launching Soon",
    status: "In Progress"
  }
];

export function ComingSoonHighlights() {
  const inProgressFeatures = comingSoonFeatures.filter(f => f.status === "In Progress");
  const plannedFeatures = comingSoonFeatures.filter(f => f.status === "Planned");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="bg-gradient-to-br from-system-cyan/10 via-purple-500/5 to-blue-600/5 border border-system-cyan/30 rounded-3xl p-8 backdrop-blur-sm">
        <div className="flex items-start gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-system-cyan/20 to-purple-500/20 border border-system-cyan/40 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-7 h-7 text-system-cyan" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-display font-bold text-white mb-2">
              Exciting Features Coming Soon
            </h2>
            <p className="text-sm text-white/70 leading-relaxed">
              We're building powerful new features to transform your fitness journey. From AI-powered chatbots and nutrition tracking to guild systems and smart scale integration — the future of ASCEND is bright.
            </p>
          </div>
        </div>

        {inProgressFeatures.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-system-cyan animate-pulse" />
              <h3 className="text-lg font-bold text-white">Now In Development</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inProgressFeatures.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link href={`/roadmap/${feature.id}`} className="block">
                    <div className="bg-void-deep/50 border-2 border-system-cyan/40 rounded-2xl p-5 relative overflow-hidden group hover:border-system-cyan/60 transition-all h-full cursor-pointer">
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-system-cyan to-purple-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                        In Progress
                      </div>
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", feature.bgColor, "border", feature.borderColor)}>
                        <feature.icon className={cn("w-5 h-5", feature.color)} />
                      </div>
                      <h4 className={cn("text-base font-bold text-white mb-2", feature.color)}>
                        {feature.name}
                      </h4>
                      <p className="text-xs text-white/60 leading-relaxed mb-3">
                        {feature.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-system-cyan to-purple-500 rounded-full animate-pulse" style={{ width: '65%' }} />
                        </div>
                        <span className="text-xs text-system-cyan font-medium">{feature.comingSoonText}</span>
                      </div>
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="w-4 h-4 text-system-cyan" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-yellow-400" />
            <h3 className="text-lg font-bold text-white">Coming Soon</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plannedFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <Link href={`/roadmap/${feature.id}`} className="block">
                  <div className={cn(
                    "bg-void-deep/30 border border-white/10 rounded-2xl p-5 relative overflow-hidden group h-full cursor-pointer",
                    "hover:border-white/20 transition-all"
                  )}>
                    <div className="absolute top-0 right-0 bg-white/10 text-white/80 text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                      {feature.comingSoonText}
                    </div>
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", feature.bgColor, "border", feature.borderColor)}>
                      <feature.icon className={cn("w-5 h-5", feature.color)} />
                    </div>
                    <h4 className={cn("text-base font-bold text-white mb-2", feature.color)}>
                      {feature.name}
                    </h4>
                    <p className="text-xs text-white/60 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="w-4 h-4 text-white/60" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 pt-6 border-t border-white/10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/70">
              Want to help shape these features? Join our community and share your feedback.
            </p>
            <Link
              href="/help/demo-accounts"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-system-cyan to-purple-500 hover:from-system-cyan/90 hover:to-purple-500/90 text-white rounded-xl font-bold transition-all group"
            >
              Try Current Features
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

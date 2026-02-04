"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  User, Settings, Trophy, Target, Star, 
  Flame, Zap, Crown, ChevronDown, ChevronUp, TrendingUp, CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { 
  mockUserProfile, 
  mockQuickActions, 
  type UserProfile 
} from "@/lib/mock/sidebar-data";

export function LeftSidebar() {
  const [sectionsExpanded, setSectionsExpanded] = useState({
    profile: true,
    quickActions: true,
    stats: true,
  });

  return (
    <aside className={cn(
      "hidden lg:flex lg:w-80 lg:flex-col lg:fixed lg:left-0 lg:top-16 lg:bottom-0",
      "bg-void-panel/50 backdrop-blur-xl border-r border-white/10",
      "overflow-y-auto overflow-x-hidden"
    )}>
      <div className="p-6 space-y-6">
        <UserProfileCard 
          profile={mockUserProfile}
          isExpanded={sectionsExpanded.profile}
          onToggle={() => setSectionsExpanded(prev => ({ ...prev, profile: !prev.profile }))}
        />
        
        <QuickActions 
          actions={mockQuickActions}
          isExpanded={sectionsExpanded.quickActions}
          onToggle={() => setSectionsExpanded(prev => ({ ...prev, quickActions: !prev.quickActions }))}
        />
        
        <StatsSummary 
          profile={mockUserProfile}
          isExpanded={sectionsExpanded.stats}
          onToggle={() => setSectionsExpanded(prev => ({ ...prev, stats: !prev.stats }))}
        />
      </div>
    </aside>
  );
}

function UserProfileCard({ 
  profile, 
  isExpanded, 
  onToggle 
}: { 
  profile: UserProfile;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const xpProgress = ((profile.xp / profile.xpToNextLevel) * 100).toFixed(1);

  return (
    <div className="bg-void-deep/50 rounded-2xl border border-white/10 overflow-hidden">
      <CollapsibleHeader 
        title="Hunter Profile"
        icon={User}
        isExpanded={isExpanded}
        onToggle={onToggle}
      />
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="p-6 flex flex-col items-center text-center">
              <div className="w-20 h-20 mb-4 rounded-full border-2 border-system-cyan/50 bg-gradient-to-br from-system-cyan/20 to-blue-600/20 flex items-center justify-center">
                <User className="w-10 h-10 text-system-cyan" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-1">{profile.displayName}</h3>
              <p className="text-sm text-white/60 mb-3">@{profile.username}</p>
              
              <div className="flex items-center gap-2 mb-4">
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded font-bold uppercase",
                  profile.rank === "S" 
                    ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    : profile.rank === "A"
                    ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                    : profile.rank === "B"
                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    : profile.rank === "C"
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    : "bg-white/10 text-white/60 border border-white/20"
                )}>
                  {profile.rank}-Rank
                </span>
                {profile.hunterStatus === "Verified" && (
                  <div className="flex items-center gap-1 bg-green-500/10 border border-green-500/30 px-2 py-0.5 rounded">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span className="text-[10px] font-bold text-green-400">VERIFIED</span>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-3 gap-4 w-full mb-4">
                <StatItem icon={Crown} label="Rank" value={profile.rank} />
                <StatItem icon={Star} label="Level" value={profile.level.toString()} />
                <StatItem icon={Zap} label="XP" value={formatNumber(profile.xp)} />
              </div>
              
              <div className="w-full">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-white/60">Level {profile.level}</span>
                  <span className="text-system-cyan">Level {profile.level + 1}</span>
                </div>
                <ProgressBar value={parseFloat(xpProgress)} />
                <p className="text-xs text-white/50 mt-2">{xpProgress}% to Level {profile.level + 1}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function QuickActions({ 
  actions, 
  isExpanded, 
  onToggle 
}: { 
  actions: any[];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const iconMap: Record<string, any> = {
    User,
    Settings,
    Trophy,
    Target,
    Star,
  };

  return (
    <div className="bg-void-deep/50 rounded-2xl border border-white/10 overflow-hidden">
      <CollapsibleHeader 
        title="Quick Actions"
        icon={Target}
        isExpanded={isExpanded}
        onToggle={onToggle}
      />
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="p-4">
              <nav className="space-y-1">
                {actions.map((action, index) => {
                  const Icon = iconMap[action.icon] || Target;
                  return (
                    <Link
                      key={index}
                      href={action.href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:bg-white/10 hover:text-white hover:border-system-cyan/30 border border-transparent transition-all duration-300 group"
                    >
                      <Icon className="w-4 h-4 group-hover:text-system-cyan transition-colors" />
                      <span className="text-sm">{action.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatsSummary({ 
  profile, 
  isExpanded, 
  onToggle 
}: { 
  profile: UserProfile;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-void-deep/50 rounded-2xl border border-white/10 overflow-hidden">
      <CollapsibleHeader 
        title="This Week"
        icon={TrendingUp}
        isExpanded={isExpanded}
        onToggle={onToggle}
      />
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-3">
              <StatCard>
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-5 h-5 text-system-cyan" />
                  <span className="text-sm text-white/60">Weekly XP</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-bold text-white">{formatNumber(profile.stats.weeklyXP)}</span>
                  <span className="text-xs text-green-400 font-medium flex items-center gap-1">
                    +15%
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </span>
                </div>
              </StatCard>
              
              <StatCard>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-white/60">Quests Completed</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-bold text-white">{profile.stats.questsCompleted}</span>
                  <span className="text-xs text-green-400 font-medium flex items-center gap-1">
                    +3
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </span>
                </div>
              </StatCard>
              
              <StatCard>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-purple-400" />
                  <span className="text-sm text-white/60">Day Streak</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-bold text-white">{profile.stats.dayStreak}</span>
                  <span className="text-xs text-green-400 font-medium flex items-center gap-1">
                    +2
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </span>
                </div>
              </StatCard>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="text-center">
      <Icon className="w-5 h-5 mx-auto mb-1 text-system-cyan" />
      <p className="text-sm font-bold text-white">{value}</p>
      <p className="text-xs text-white/50">{label}</p>
    </div>
  );
}

function StatCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-system-cyan/20">
      {children}
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 bg-void-deep rounded-full overflow-hidden border border-white/10">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full bg-gradient-to-r from-system-cyan to-blue-600 rounded-full"
      />
    </div>
  );
}

function CollapsibleHeader({ 
  title, 
  icon: Icon, 
  isExpanded, 
  onToggle 
}: { 
  title: string;
  icon: any;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors"
    >
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-system-cyan" />
        <span className="text-sm font-bold text-white uppercase tracking-wide">{title}</span>
      </div>
      {isExpanded ? (
        <ChevronUp className="w-4 h-4 text-white/60" />
      ) : (
        <ChevronDown className="w-4 h-4 text-white/60" />
      )}
    </button>
  );
}

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
  return num.toString();
}

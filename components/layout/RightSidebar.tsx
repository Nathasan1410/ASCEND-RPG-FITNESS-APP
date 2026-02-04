"use client";

import { useState } from "react";
import { Hash, TrendingUp, Users, RefreshCw, Target, UserPlus, Trophy } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { 
  mockTrendingTags, 
  mockSuggestedHunters, 
  mockActiveChallenges,
  type TrendingTag,
  type SuggestedHunter,
  type ActiveChallenge
} from "@/lib/mock/sidebar-data";

export function RightSidebar() {
  const [sectionsExpanded, setSectionsExpanded] = useState({
    trending: true,
    suggestions: true,
    challenges: true,
  });
  const [following, setFollowing] = useState<Set<number>>(new Set());
  const [refreshing, setRefreshing] = useState(false);

  const handleFollow = (hunterId: number) => {
    setFollowing(prev => {
      const newSet = new Set(prev);
      if (newSet.has(hunterId)) {
        newSet.delete(hunterId);
      } else {
        newSet.add(hunterId);
      }
      return newSet;
    });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <aside className={cn(
      "hidden lg:flex lg:w-80 lg:flex-col lg:fixed lg:right-0 lg:top-16 lg:bottom-0",
      "bg-void-panel/50 backdrop-blur-xl border-l border-white/10",
      "overflow-y-auto overflow-x-hidden"
    )}>
      <div className="p-6 space-y-6">
        <TrendingSection 
          tags={mockTrendingTags}
          isExpanded={sectionsExpanded.trending}
          onToggle={() => setSectionsExpanded(prev => ({ ...prev, trending: !prev.trending }))}
        />
        
        <SuggestionsSection 
          hunters={mockSuggestedHunters}
          following={following}
          onFollow={handleFollow}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          isExpanded={sectionsExpanded.suggestions}
          onToggle={() => setSectionsExpanded(prev => ({ ...prev, suggestions: !prev.suggestions }))}
        />
        
        <ChallengesSection 
          challenges={mockActiveChallenges}
          isExpanded={sectionsExpanded.challenges}
          onToggle={() => setSectionsExpanded(prev => ({ ...prev, challenges: !prev.challenges }))}
        />
      </div>
    </aside>
  );
}

function TrendingSection({ 
  tags, 
  isExpanded, 
  onToggle 
}: { 
  tags: TrendingTag[];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-void-deep/50 rounded-2xl border border-white/10 overflow-hidden">
      <CollapsibleHeader 
        title="Trending Tags"
        icon={TrendingUp}
        isExpanded={isExpanded}
        onToggle={onToggle}
        actionButton={
          <button className="text-xs text-system-cyan hover:text-white transition-colors">
            View All
          </button>
        }
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
            <div className="p-4 space-y-2">
              {tags.slice(0, 6).map((tag, index) => (
                <TrendingTag key={tag.id} tag={tag} rank={index + 1} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TrendingTag({ tag, rank }: { tag: TrendingTag; rank: number }) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: rank * 0.05 }}
      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-white/5 hover:bg-system-cyan/10 hover:border-system-cyan/30 border border-transparent transition-all duration-300 group"
    >
      <div className="flex items-center gap-3">
        <span className={cn(
          "text-xs font-bold w-5 h-5 flex items-center justify-center rounded",
          rank <= 3 
            ? "bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 text-yellow-400 border border-yellow-400/30"
            : "bg-white/10 text-white/60"
        )}>
          {rank}
        </span>
        <span className="flex items-center gap-1.5 text-sm text-white/70 group-hover:text-white transition-colors">
          <Hash className="w-3 h-3" />
          <span className="font-medium">{tag.name.replace("#", "")}</span>
        </span>
      </div>
      <span className="text-xs text-white/50 group-hover:text-white/70 transition-colors">
        {formatNumber(tag.count)} posts
      </span>
    </motion.button>
  );
}

function SuggestionsSection({ 
  hunters, 
  following, 
  onFollow,
  refreshing,
  onRefresh,
  isExpanded,
  onToggle
}: { 
  hunters: SuggestedHunter[];
  following: Set<number>;
  onFollow: (id: number) => void;
  refreshing: boolean;
  onRefresh: () => void;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-void-deep/50 rounded-2xl border border-white/10 overflow-hidden">
      <CollapsibleHeader 
        title="Hunters to Follow"
        icon={Users}
        isExpanded={isExpanded}
        onToggle={onToggle}
        actionButton={
          <button 
            onClick={onRefresh}
            disabled={refreshing}
            className={cn(
              "flex items-center gap-1.5 text-xs text-system-cyan hover:text-white transition-colors",
              refreshing && "opacity-50 cursor-not-allowed"
            )}
          >
            <RefreshCw className={cn("w-3 h-3", refreshing && "animate-spin")} />
            Refresh
          </button>
        }
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
              {hunters.map(hunter => (
                <HunterCard 
                  key={hunter.id} 
                  hunter={hunter} 
                  isFollowing={following.has(hunter.id)}
                  onFollow={() => onFollow(hunter.id)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HunterCard({ 
  hunter, 
  isFollowing, 
  onFollow 
}: { 
  hunter: SuggestedHunter;
  isFollowing: boolean;
  onFollow: () => void;
}) {
  const getRankColor = (rank: string) => {
    switch(rank) {
      case "S": return "text-yellow-400 border-yellow-400/30 bg-yellow-400/10";
      case "A": return "text-purple-400 border-purple-400/30 bg-purple-400/10";
      case "B": return "text-blue-400 border-blue-400/30 bg-blue-400/10";
      case "C": return "text-cyan-400 border-cyan-400/30 bg-cyan-400/10";
      default: return "text-white/60 border-white/20 bg-white/10";
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 hover:border-system-cyan/20 transition-all duration-300 border border-transparent">
      <div className="w-10 h-10 rounded-full border-2 border-white/20 bg-gradient-to-br from-system-cyan/20 to-blue-600/20 flex items-center justify-center flex-shrink-0">
        <UserPlus className="w-5 h-5 text-system-cyan" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-white truncate">{hunter.username}</p>
          <span className={cn(
            "text-[10px] px-1.5 py-0.5 rounded border font-bold uppercase",
            getRankColor(hunter.rank)
          )}>
            {hunter.rank}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xs text-white/50">{hunter.class}</p>
          {hunter.hunterStatus === "Verified" && (
            <div className="flex items-center gap-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            </div>
          )}
        </div>
      </div>
      <button
        onClick={onFollow}
        className={cn(
          "px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 flex-shrink-0",
          isFollowing
            ? "bg-white/10 text-white/70 hover:bg-white/20 border border-white/20"
            : "bg-system-cyan text-void-deep hover:bg-system-cyan/90 shadow-[0_0_10px_rgba(0,255,255,0.2)] hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]"
        )}
      >
        {isFollowing ? "Following" : "Follow"}
      </button>
    </div>
  );
}

function ChallengesSection({ 
  challenges, 
  isExpanded, 
  onToggle 
}: { 
  challenges: ActiveChallenge[];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-void-deep/50 rounded-2xl border border-white/10 overflow-hidden">
      <CollapsibleHeader 
        title="Active Challenges"
        icon={Trophy}
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
              {challenges.map(challenge => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ChallengeCard({ challenge }: { challenge: ActiveChallenge }) {
  return (
    <div className="p-4 rounded-lg bg-gradient-to-br from-system-cyan/5 to-blue-600/5 border border-system-cyan/20 hover:border-system-cyan/30 transition-all duration-300">
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm font-bold text-white">{challenge.name}</h4>
        {challenge.joined && (
          <span className="text-[10px] px-2 py-0.5 rounded bg-green-500/20 text-green-400 font-bold uppercase">
            Joined
          </span>
        )}
      </div>
      <p className="text-xs text-white/60 mb-3 line-clamp-2">{challenge.description}</p>
      
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-1">
          <Users className="w-3 h-3 text-system-cyan" />
          <span className="text-xs text-white/70">{formatNumber(challenge.participants)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Target className="w-3 h-3 text-purple-400" />
          <span className="text-xs text-white/70">{challenge.timeLeft}</span>
        </div>
      </div>
      
      <button
        className={cn(
          "w-full py-2 rounded-lg text-xs font-bold transition-all duration-300",
          challenge.joined
            ? "bg-white/10 text-white/70 cursor-default"
            : "bg-gradient-to-r from-system-cyan/20 to-blue-600/20 hover:from-system-cyan/30 hover:to-blue-600/30 text-system-cyan border border-system-cyan/30 hover:border-system-cyan/50"
        )}
      >
        {challenge.joined ? "Joined" : "Join Challenge"}
      </button>
    </div>
  );
}

function CollapsibleHeader({ 
  title, 
  icon: Icon, 
  isExpanded, 
  onToggle,
  actionButton
}: { 
  title: string;
  icon: any;
  isExpanded: boolean;
  onToggle: () => void;
  actionButton?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 hover:text-white transition-colors"
      >
        <Icon className="w-5 h-5 text-system-cyan" />
        <span className="text-sm font-bold text-white uppercase tracking-wide">{title}</span>
      </button>
      <div className="flex items-center gap-2">
        {actionButton}
        <button
          onClick={onToggle}
          className="text-white/60 hover:text-white transition-colors"
        >
          {isExpanded ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
  return num.toString();
}

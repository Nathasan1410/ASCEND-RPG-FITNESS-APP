"use client";

import { Trophy, Lock } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useState } from "react";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
}

interface UserAchievement {
  unlocked_at: string;
  achievements: Achievement;
}

interface AchievementBadgesProps {
  achievements: UserAchievement[];
}

export function AchievementBadges({ achievements }: AchievementBadgesProps) {
  const [hoveredAchievement, setHoveredAchievement] = useState<UserAchievement | null>(null);

  if (!achievements || achievements.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-white/20 rounded-xl">
        <Trophy className="w-12 h-12 text-white/20 mx-auto mb-4" />
        <p className="text-white/40 font-mono mb-2">No achievements yet</p>
        <p className="text-white/30 text-sm">Complete quests to earn achievements!</p>
      </div>
    );
  }

  const rarityColors: Record<Achievement["rarity"], string> = {
    Common: "bg-gray-400/20 border-gray-400/50",
    Rare: "bg-blue-400/20 border-blue-400/50",
    Epic: "bg-purple-400/20 border-purple-400/50 shadow-[0_0_15px_rgba(192,132,252,0.2)]",
    Legendary: "bg-yellow-400/20 border-yellow-400/50 shadow-[0_0_20px_rgba(250,204,21,0.3)]",
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {achievements.map((item) => {
        const achievement = item.achievements;
        const isHovered = hoveredAchievement?.achievements.id === achievement.id;

        return (
          <div
            key={item.unlocked_at}
            className="relative group"
            onMouseEnter={() => setHoveredAchievement(item)}
            onMouseLeave={() => setHoveredAchievement(null)}
          >
            {/* Achievement Badge */}
            <div
              className={cn(
                "aspect-square rounded-lg border-2 p-3 flex items-center justify-center transition-all duration-300 cursor-pointer",
                "hover:scale-110 hover:shadow-2xl",
                rarityColors[achievement.rarity]
              )}
            >
              <div className="text-4xl">{achievement.icon}</div>
            </div>

            {/* Tooltip */}
            {isHovered && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 bg-void-panel/95 backdrop-blur-xl border border-white/20 rounded-lg p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-2">
                <h4 className="font-bold text-white text-sm mb-1">{achievement.name}</h4>
                <p className="text-xs text-white/60 mb-2">{achievement.description}</p>
                <div className="flex items-center gap-1 text-[10px] text-white/40 font-mono">
                  <span className={cn(
                    "px-1.5 py-0.5 rounded border",
                    achievement.rarity === "Legendary" ? "text-yellow-400 border-yellow-400/30 bg-yellow-400/10" :
                    achievement.rarity === "Epic" ? "text-purple-400 border-purple-400/30 bg-purple-400/10" :
                    achievement.rarity === "Rare" ? "text-blue-400 border-blue-400/30 bg-blue-400/10" :
                    "text-gray-400 border-gray-400/30 bg-gray-400/10"
                  )}>
                    {achievement.rarity}
                  </span>
                  <span>• Unlocked {new Date(item.unlocked_at).toLocaleDateString()}</span>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-void-panel/95 border-r border-b border-white/20" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

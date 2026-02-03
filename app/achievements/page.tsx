"use client";

import { useState, useEffect } from "react";
import { Trophy, TrendingUp, Lock, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils/cn";
import { getUserAchievements, getAchievementProgress, checkAchievements } from "@/server/actions/achievement-actions";

type AchievementRarity = "common" | "rare" | "epic" | "legendary";

const rarityConfig: Record<AchievementRarity, { color: string; label: string; bg: string }> = {
  common: { color: "text-white/80", label: "Common", bg: "bg-white/10" },
  rare: { color: "text-system-cyan", label: "Rare", bg: "bg-system-cyan/20" },
  epic: { color: "text-rank-a", label: "Epic", bg: "bg-rank-a/20" },
  legendary: { color: "text-rank-s", label: "Legendary", bg: "bg-rank-s/20" },
};

export default function AchievementsPage() {
  const supabase = createClient();
  const [userAchievements, setUserAchievements] = useState<any[]>([]);
  const [allAchievements, setAllAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const [unlocked, all] = await Promise.all([
      getUserAchievements(user.id),
      (supabase.from("achievements") as any).select("*").order("rarity", { ascending: false })
    ]);

    setUserAchievements(unlocked);
    setAllAchievements(all || []);
    setLoading(false);
  };

  const handleCheckAchievements = async () => {
    setChecking(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profileData } = await supabase
      .from("profiles")
      .select("total_xp, level, rank_tier, streak_current, stats_strength, stats_agility, stats_stamina")
      .eq("id", user.id)
      .single();

    if (!profileData) return;

    const { data: logsData } = await supabase
      .from("logs")
      .select("id")
      .eq("user_id", user.id);

    const { data: friendsData } = await supabase
      .from("friends")
      .select("id")
      .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`);

    const profile = profileData as any;
    const userStats = {
      totalQuests: logsData?.length || 0,
      totalReps: (profile.stats_strength || 10) + (profile.stats_agility || 10) + (profile.stats_stamina || 10),
      currentStreak: profile.streak_current || 0,
      level: profile.level || 1,
      rank: profile.rank_tier || "E-Rank",
      friendCount: friendsData?.length || 0,
      totalXp: profile.total_xp || 0,
    };

    const result = await checkAchievements(user.id, userStats);
    if (result.unlockedIds.length > 0) {
      toast.success(`Unlocked ${result.unlockedIds.length} new achievement${result.unlockedIds.length > 1 ? 's' : ''}!`);
      loadAchievements();
    } else {
      toast.info("No new achievements unlocked");
    }
    setChecking(false);
  };

  const getUnlockedAchievementIds = () => {
    return new Set(userAchievements.map(ua => ua.achievement_id));
  };

  const unlockedIds = getUnlockedAchievementIds();

  const groupedAchievements = allAchievements.reduce((acc, achievement: any) => {
    const rarity = achievement.rarity as AchievementRarity;
    if (!acc[rarity]) {
      acc[rarity] = [];
    }
    acc[rarity].push(achievement);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white uppercase tracking-wider">
            Achievements
          </h1>
          <p className="text-white/60">
            Track your milestones and accomplishments
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold font-mono text-system-cyan">
            {userAchievements.length}
          </div>
          <div className="text-xs text-white/40 uppercase tracking-wider">Unlocked</div>
        </div>
      </div>

      <button
        onClick={handleCheckAchievements}
        disabled={checking}
        className="flex items-center gap-2 px-6 py-3 bg-system-cyan text-void-deep rounded-lg font-bold hover:bg-system-cyan/90 transition-colors mb-6"
      >
        {checking ? (
          <TrendingUp className="w-5 h-5 animate-spin" />
        ) : (
          <Trophy className="w-5 h-5" />
        )}
        Check for New Achievements
      </button>

      {loading ? (
        <div className="text-center py-12 text-white/60">Loading achievements...</div>
      ) : (
        <div className="space-y-8">
          {(["legendary", "epic", "rare", "common"] as AchievementRarity[]).map(rarity => {
            const config = rarityConfig[rarity];
            const achievements = groupedAchievements[rarity] || [];
            
            if (achievements.length === 0) return null;

            return (
              <section key={rarity} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${config.bg} ${config.color.replace('text-', 'bg-')}`} />
                  <h2 className="text-xl font-display font-bold uppercase tracking-wider">
                    {config.label} Achievements
                    <span className={`text-sm ${config.color}`}>
                      ({achievements.length})
                    </span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement: any) => {
                    const isUnlocked = unlockedIds.has(achievement.id);
                    return (
                      <div
                        key={achievement.id}
                        className={cn(
                          "p-4 rounded-xl border transition-all",
                          isUnlocked
                            ? `${config.bg} border-white/20`
                            : "bg-void-deep border-white/5 opacity-60"
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <div className={cn(
                                "text-4xl",
                                isUnlocked ? config.color : "text-white/30"
                              )}>
                                {achievement.icon}
                              </div>
                              {!isUnlocked && (
                                <Lock className="w-5 h-5 text-white/40" />
                              )}
                              {isUnlocked && (
                                <Check className="w-5 h-5 text-status-success" />
                              )}
                            </div>
                            <h3 className={cn(
                              "text-lg font-bold mb-1",
                              isUnlocked ? "text-white" : "text-white/60"
                            )}>
                              {achievement.name}
                            </h3>
                            <p className={cn(
                              "text-sm mb-2",
                              isUnlocked ? "text-white/80" : "text-white/40"
                            )}>
                              {achievement.description}
                            </p>
                            <div className="flex items-center gap-2 text-xs">
                              <span className={cn(
                                "font-medium uppercase tracking-wider",
                                config.color
                              )}>
                                +{achievement.xp_reward} XP
                              </span>
                              {!isUnlocked && (
                                <span className="text-white/40">• Locked</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

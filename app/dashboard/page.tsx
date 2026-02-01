import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { StatusWindow } from "@/components/gamification/StatusWindow";
import { XPBar } from "@/components/gamification/XPBar";
import { RankBadge } from "@/components/gamification/RankBadge";
import { QuestCard } from "@/components/quest/QuestCard";
import { GenerateQuestButton } from "@/components/dashboard/GenerateQuestButton";
import { getActiveQuest, getTodayQuest } from "@/server/actions/quest-actions";
import { checkRankUpEligibility } from "@/server/actions/rank-up-actions";
import { RankUpBanner } from "@/components/rankup/RankUpBanner";
import { WorkoutPlan } from "@/types/schemas";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const profile = profileData as any; // Bypass inference issue

  if (!profile) {
    redirect("/onboarding");
  }

  if (!profile.onboarding_done) {
    redirect("/onboarding");
  }

  const activeQuest = await getActiveQuest();
  const todayQuest = await getTodayQuest();
  const { eligible, nextRank } = await checkRankUpEligibility(user.id);

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Rank Up Notification */}
      {eligible && nextRank && !activeQuest && (
        <RankUpBanner nextRank={nextRank} />
      )}

      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Status Window */}
        <div className="md:col-span-4 lg:col-span-3 bg-system-panel border border-white/10 rounded-xl p-4 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <RankBadge rank={profile.rank_tier || "E-Rank"} size="lg" />
            <div className="text-right">
              <p className="text-xs text-white/40 font-mono uppercase">Class</p>
              <p className="text-sm font-bold text-system-cyan uppercase">{profile.class}</p>
            </div>
          </div>
          
          <StatusWindow stats={{
            strength: profile.stats_strength || 10,
            agility: profile.stats_agility || 10,
            stamina: profile.stats_stamina || 10,
            // Add other stats if in DB schema later, currently schema has 3 core
          }} />
        </div>

        {/* Right Column: Quest & Progress */}
        <div className="md:col-span-8 lg:col-span-9 space-y-6">
          {/* XP & Level */}
          <div className="bg-system-panel/50 border border-white/5 rounded-xl p-4">
            <XPBar currentXp={profile.current_xp || 0} level={profile.level || 1} />
          </div>

          {/* Active Quest Area */}
          <div>
            <h2 className="text-xl font-display font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-system-cyan rounded-full animate-pulse" />
              CURRENT MANDATE
            </h2>
            
            {activeQuest ? (
              <QuestCard quest={{
                id: (activeQuest as any).id,
                xp_potential: (activeQuest as any).xp_potential,
                rank_difficulty: (activeQuest as any).rank_difficulty,
                plan_json: (activeQuest as any).plan_json as unknown as WorkoutPlan,
                status: (activeQuest as any).status || "Active"
              }} />
            ) : todayQuest && (todayQuest as any).status === "Completed" ? (
              <div className="text-center py-12 border border-dashed border-system-cyan/30 rounded-xl bg-system-cyan/5">
                <p className="text-white font-display text-xl mb-2 uppercase tracking-widest">Daily Mandate Complete</p>
                <p className="text-white/60 font-mono text-sm">Rest, Hunter. The System awaits your return tomorrow.</p>
              </div>
            ) : (
              <GenerateQuestButton />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

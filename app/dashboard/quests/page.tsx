import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { QuestCard } from "@/components/quest/QuestCard";
import { WorkoutPlan } from "@/types/schemas";
import { getActiveQuest } from "@/server/actions/quest-actions";
import { StatusWindow } from "@/components/gamification/StatusWindow";
import { RankBadge } from "@/components/gamification/RankBadge";
import { XPBar } from "@/components/gamification/XPBar";

export default async function QuestsPage() {
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

  const profile = profileData as any;

  if (!profile) {
    redirect("/onboarding");
  }

  const activeQuest = await getActiveQuest();

  const { data: questsHistory } = await supabase
    .from("quests")
    .select("*")
    .eq("user_id", user.id)
    .neq("status", "Active")
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold text-white uppercase tracking-wider">
          Quest Archive
        </h1>
        <RankBadge rank={profile.rank_tier || "E-Rank"} size="md" />
      </div>

      <div className="bg-system-panel border border-white/10 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 bg-system-cyan rounded-full animate-pulse" />
          <h2 className="text-lg font-bold text-white uppercase tracking-wider">
            Hunter Status
          </h2>
        </div>
        <StatusWindow stats={{
          strength: profile.stats_strength || 10,
          agility: profile.stats_agility || 10,
          stamina: profile.stats_stamina || 10,
        }} />
        <div className="mt-4">
          <XPBar currentXp={profile.current_xp || 0} level={profile.level || 1} />
        </div>
      </div>

      {activeQuest && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-system-cyan rounded-full animate-pulse" />
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-wider">
              Active Mandate
            </h2>
          </div>
          <QuestCard quest={{
            id: (activeQuest as any).id,
            xp_potential: (activeQuest as any).xp_potential,
            rank_difficulty: (activeQuest as any).rank_difficulty,
            plan_json: (activeQuest as any).plan_json as unknown as WorkoutPlan,
            status: (activeQuest as any).status || "Active"
          }} />
        </section>
      )}

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-bold text-white uppercase tracking-wider">
            Quest History
          </h2>
          <span className="text-sm text-white/40 font-mono">
            {questsHistory?.length || 0} Records
          </span>
        </div>

        <div className="grid gap-4">
          {questsHistory && questsHistory.length > 0 ? (
            questsHistory.map((quest: any) => {
              const plan = quest.plan_json as WorkoutPlan;
              return (
                <div
                  key={quest.id}
                  className={`bg-system-panel border rounded-xl overflow-hidden ${
                    quest.status === "Completed"
                      ? "border-status-success/20"
                      : quest.status === "Failed"
                      ? "border-status-danger/20"
                      : "border-white/10"
                  }`}
                >
                  <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">
                          {plan.quest_name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-white/60">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            quest.status === "Completed"
                              ? "bg-status-success/20 text-status-success"
                              : quest.status === "Failed"
                              ? "bg-status-danger/20 text-status-danger"
                              : "bg-white/10 text-white/80"
                          }`}>
                            {quest.status}
                          </span>
                          <span className="text-white/40">•</span>
                          <span className="text-white/40">{quest.rank_difficulty}</span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className={`text-2xl font-bold font-mono ${
                          quest.status === "Completed"
                            ? "text-status-success"
                            : quest.status === "Failed"
                            ? "text-status-danger"
                            : "text-white/60"
                        }`}>
                          +{quest.xp_potential}
                        </div>
                        <div className="text-xs text-white/40 uppercase tracking-wider">XP</div>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-3">
                      <div className="text-sm text-white/60 mb-2">
                        <span className="text-white/80 font-medium">Target:</span> {plan.estimated_duration_min} min
                        <span className="mx-2">•</span>
                        <span className="text-white/80 font-medium">Exercises:</span> {plan.exercises?.length || 0}
                      </div>
                      <div className="text-xs text-white/40 font-mono">
                        {new Date(quest.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
              <p className="text-white/60 font-display text-lg mb-2">No quest records found</p>
              <p className="text-white/40 text-sm">Complete your first mandate to begin tracking history.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

import { getPublicProfile } from "@/server/actions/match-history-actions";
import { notFound } from "next/navigation";
import { StatusWindow } from "@/components/gamification/StatusWindow";
import { RankBadge } from "@/components/gamification/RankBadge";
import { MatchHistory } from "@/components/profile/MatchHistory";
import { HunterStatusBadge } from "@/components/profile/HunterStatusBadge";
import { ReportButton } from "@/components/profile/ReportButton";
import { HunterStatus } from "@/types/schemas";

interface ProfilePageProps {
  params: { username: string };
}

export default async function PublicProfilePage({ params }: ProfilePageProps) {
  const decodedUsername = decodeURIComponent(params.username);
  const data = await getPublicProfile(decodedUsername);

  if (!data) {
    notFound();
  }

  const { profile, match_history, stats } = data;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Profile Header */}
      <div className="bg-system-panel border border-white/10 rounded-xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <ReportButton targetUserId={profile.id} targetUsername={profile.username || "Unknown"} />
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* Avatar/Rank Area */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-void-deep border-2 border-system-cyan flex items-center justify-center text-3xl font-display font-bold text-white relative">
              {profile.username?.[0]?.toUpperCase()}
              {/* Level Badge */}
              <div className="absolute -bottom-2 -right-2 bg-void-panel border border-white/20 px-2 py-0.5 rounded text-xs font-mono text-white">
                LVL {profile.level}
              </div>
            </div>
            <RankBadge rank={profile.rank_tier as any} size="lg" />
            <HunterStatusBadge status={profile.hunter_status as HunterStatus} />
          </div>

          {/* Stats Summary */}
          <div className="flex-1 w-full grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <StatBox label="Total XP" value={new Intl.NumberFormat().format(profile.total_xp || 0)} />
            <StatBox label="Missions" value={stats.total_quests} />
            <StatBox label="Verified" value={stats.verified_quests} highlight />
            <StatBox label="Streak" value={profile.streak_current || 0} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left: Radar Chart */}
        <div className="md:col-span-5 bg-system-panel/50 border border-white/10 rounded-xl p-4 h-[350px]">
          <h3 className="text-sm font-mono text-white/40 uppercase mb-4 tracking-widest">
            Physique Analysis
          </h3>
          <StatusWindow stats={{
            strength: profile.stats_strength || 10,
            agility: profile.stats_agility || 10,
            stamina: profile.stats_stamina || 10,
          }} />
        </div>

        {/* Right: Match History */}
        <div className="md:col-span-7 space-y-4">
          <h3 className="text-sm font-mono text-white/40 uppercase tracking-widest flex justify-between items-center">
            <span>Operation Log</span>
            <span className="text-xs text-system-cyan">Last 20 Operations</span>
          </h3>
          <MatchHistory logs={match_history as any} />
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, highlight = false }: { label: string; value: string | number; highlight?: boolean }) {
  return (
    <div className="bg-white/5 rounded p-3 border border-white/5">
      <p className="text-[10px] text-white/40 font-mono uppercase mb-1">{label}</p>
      <p className={cn("text-xl font-bold font-display", highlight ? "text-system-cyan" : "text-white")}>
        {value}
      </p>
    </div>
  );
}

import { cn } from "@/lib/utils/cn";

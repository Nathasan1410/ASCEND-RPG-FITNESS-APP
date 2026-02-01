import { createClient } from "@/lib/supabase/server";
import { getLeaderboard } from "@/server/actions/leaderboard-actions";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";

export default async function LeaderboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const leaderboard = await getLeaderboard(50);

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-display font-bold text-white uppercase tracking-wider">
            Global Rankings
          </h1>
          <p className="text-white/40 font-mono text-sm mt-2">
            Top 50 Active Hunters (Corrupted Excluded)
          </p>
        </div>
      </div>

      <LeaderboardTable 
        entries={leaderboard as any} 
        currentUserId={user?.id} 
      />
    </div>
  );
}

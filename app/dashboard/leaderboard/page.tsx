import { createClient } from "@/lib/supabase/server";
import { getLeaderboard } from "@/server/actions/leaderboard-actions";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import { LeaderboardMobileFilters } from "@/components/leaderboard/LeaderboardMobileFilters";
import { LeaderboardDesktopFilters } from "@/components/leaderboard/LeaderboardDesktopFilters";

export default async function LeaderboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const leaderboard = await getLeaderboard(50);

  return (
    <div className="animate-in fade-in duration-700">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white uppercase tracking-wider">
            Global Rankings
          </h1>
          <p className="text-white/40 font-mono text-sm mt-2">
            Top 50 Active Hunters (Corrupted Excluded)
          </p>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="hidden md:block w-64 flex-shrink-0">
          <LeaderboardDesktopFilters />
        </div>
        <div className="flex-1 min-w-0">
          <div className="mb-4 md:hidden">
            <LeaderboardMobileFilters />
          </div>
          <div>
            <LeaderboardTable
              entries={leaderboard as any}
              currentUserId={user?.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

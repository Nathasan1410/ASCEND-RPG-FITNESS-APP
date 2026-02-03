import Link from "next/link";
import { RankBadge } from "@/components/gamification/RankBadge";
import { HunterStatusBadge } from "@/components/profile/HunterStatusBadge";
import { cn } from "@/lib/utils/cn";
import { RankTier, HunterStatus } from "@/types/schemas";

interface LeaderboardEntry {
  user_id: string;
  username: string;
  total_xp: number;
  level: number;
  rank_tier: RankTier;
  class: string;
  hunter_status: HunterStatus;
  global_rank: number;
}

export function LeaderboardTable({ entries, currentUserId }: { entries: LeaderboardEntry[]; currentUserId?: string }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-system-panel/50">
      <table className="w-full text-left text-sm">
        <thead className="bg-white/5 text-sm uppercase text-white/40 font-mono">
          <tr>
            <th className="px-6 py-6 font-normal tracking-wider">Rank</th>
            <th className="px-6 py-6 font-normal tracking-wider">Hunter</th>
            <th className="px-6 py-6 font-normal tracking-wider text-right">Level</th>
            <th className="px-6 py-6 font-normal tracking-wider text-right">XP</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {entries.map((entry) => (
            <tr
              key={entry.user_id}
              className={cn(
                "hover:bg-white/5 transition-colors",
                entry.user_id === currentUserId && "bg-system-cyan/5"
              )}
            >
              <td className="px-6 py-6 font-mono font-bold text-white/60">
                #{entry.global_rank}
              </td>
              <td className="px-6 py-6">
                <Link href={`/profile/${entry.username}`} className="flex items-center gap-3 group">
                  <div className="flex flex-col">
                    <span className="font-bold text-white group-hover:text-system-cyan transition-colors">
                      {entry.username}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <RankBadge rank={entry.rank_tier} size="sm" />
                      {entry.hunter_status !== "Normal" && (
                        <HunterStatusBadge status={entry.hunter_status} size="sm" showLabel={false} />
                      )}
                    </div>
                  </div>
                </Link>
              </td>
              <td className="px-6 py-6 text-right font-mono text-white">
                {entry.level}
              </td>
              <td className="px-6 py-6 text-right font-mono text-system-cyan">
                {new Intl.NumberFormat().format(entry.total_xp)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

"use client";

import { useState, useTransition } from "react";
import { getPublicProfile } from "@/server/actions/match-history-actions";
import { getUserAchievements, getFriendPreviews } from "@/server/actions/profile-actions";
import { StatusWindow } from "@/components/gamification/StatusWindow";
import { RankBadge } from "@/components/gamification/RankBadge";
import { MatchHistory } from "@/components/profile/MatchHistory";
import { HunterStatusBadge } from "@/components/profile/HunterStatusBadge";
import { ReportButton } from "@/components/profile/ReportButton";
import { ProfileBanner } from "@/components/profile/ProfileBanner";
import { ProfileBio } from "@/components/profile/ProfileBio";
import { SocialLinks } from "@/components/profile/SocialLinks";
import { ShareProfileButton } from "@/components/profile/ShareProfileButton";
import { AchievementBadges } from "@/components/profile/AchievementBadges";
import { FriendsPreview } from "@/components/profile/FriendsPreview";
import { MatchHistoryFilters } from "@/components/profile/MatchHistoryFilters";
import { Trophy, Users, Filter } from "lucide-react";
import { HunterStatus } from "@/types/schemas";
import { cn } from "@/lib/utils/cn";
import { Edit3 } from "lucide-react";
import { EditProfileModal } from "@/components/profile/EditProfileModal";

interface ProfileClientProps {
  initialData: {
    profile: any;
    match_history: any[];
    stats: any;
  };
  achievements: any[];
  friends: any[];
  isOwnProfile: boolean;
}

export default function ProfileClient({
  initialData,
  achievements,
  friends,
  isOwnProfile,
}: ProfileClientProps) {
  const [isPending, startTransition] = useTransition();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [matchHistory, setMatchHistory] = useState(initialData.match_history);
  const [filters, setFilters] = useState({
    type: "all",
    startDate: "",
    endDate: "",
  });

  const handleFilterChange = async (newFilters: typeof filters) => {
    setFilters(newFilters);
    startTransition(async () => {
      const data = await getPublicProfile(
        initialData.profile.username,
        {
          questType: newFilters.type !== "all" ? newFilters.type : undefined,
          startDate: newFilters.startDate || undefined,
          endDate: newFilters.endDate || undefined,
        }
      );
      if (data) {
        setMatchHistory(data.match_history);
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Profile Header with Banner */}
      <div className="bg-system-panel border border-white/10 rounded-xl shadow-2xl relative overflow-hidden">
        <ProfileBanner bannerUrl={initialData.profile.banner_url} />

        <div className="p-6 md:p-8">
          {/* Top Row: Action Buttons */}
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            {isOwnProfile && (
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-system-cyan/20 border border-system-cyan/30 rounded-lg hover:bg-system-cyan/30 transition-colors text-system-cyan"
                aria-label="Edit Profile"
              >
                <Edit3 className="w-4 h-4" />
                <span className="text-sm font-medium">Edit Profile</span>
              </button>
            )}
            <ShareProfileButton />
            <ReportButton targetUserId={initialData.profile.id} targetUsername={initialData.profile.username || "Unknown"} />
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Avatar/Rank Area - Overlapping Banner */}
            <div className="flex flex-col items-center gap-4 -mt-16 md:-mt-20">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-void-deep border-4 border-system-panel flex items-center justify-center text-3xl md:text-4xl font-display font-bold text-white relative shadow-2xl">
                {initialData.profile.username?.[0]?.toUpperCase()}
                {/* Level Badge */}
                <div className="absolute -bottom-2 -right-2 bg-void-panel border border-white/20 px-2 py-0.5 rounded text-xs font-mono text-white">
                  LVL {initialData.profile.level}
                </div>
              </div>
              <RankBadge rank={initialData.profile.rank_tier as any} size="lg" />
              <HunterStatusBadge status={initialData.profile.hunter_status as HunterStatus} />
            </div>

            {/* Profile Info */}
            <div className="flex-1 w-full space-y-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-white uppercase tracking-wider">
                  {initialData.profile.display_name || initialData.profile.username || "Hunter"}
                </h1>
                <p className="text-system-cyan font-mono text-sm">@{initialData.profile.username}</p>
              </div>

              <ProfileBio bio={initialData.profile.bio} showEditHint={false} />

              <SocialLinks
                discord={initialData.profile.social_links?.discord as string | null}
                twitter={initialData.profile.social_links?.twitter as string | null}
                steam={initialData.profile.social_links?.steam as string | null}
              />

              {/* Stats Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center pt-4 border-t border-white/10">
                <StatBox label="Total XP" value={new Intl.NumberFormat().format(initialData.profile.total_xp || 0)} />
                <StatBox label="Missions" value={initialData.stats.total_quests} />
                <StatBox label="Verified" value={initialData.stats.verified_quests} highlight />
                <StatBox label="Streak" value={initialData.profile.streak_current || 0} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={initialData.profile}
      />

      {/* Achievements Section */}
      <div className="bg-system-panel/50 border border-white/10 rounded-xl p-6">
        <h3 className="text-sm font-mono text-white/40 uppercase mb-4 tracking-widest flex items-center gap-2">
          <Trophy className="w-4 h-4" />
          Achievements
        </h3>
        <AchievementBadges achievements={achievements} />
      </div>

      {/* Friends Preview Section */}
      <div className="bg-system-panel/50 border border-white/10 rounded-xl p-6">
        <h3 className="text-sm font-mono text-white/40 uppercase mb-4 tracking-widest flex items-center gap-2">
          <Users className="w-4 h-4" />
          Friends
        </h3>
        <FriendsPreview friends={friends} />
      </div>

      {/* Match History Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Operation Log
          </h3>
          <span className="text-xs text-system-cyan font-mono">
            Showing {matchHistory.length} operations
          </span>
        </div>

        <MatchHistoryFilters onFilterChange={handleFilterChange} />
        {isPending ? (
          <div className="bg-system-panel/50 border border-white/10 rounded-xl p-8 text-center">
            <p className="text-white/40 font-mono">Loading filtered results...</p>
          </div>
        ) : (
          <MatchHistory logs={matchHistory} />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left: Radar Chart */}
        <div className="md:col-span-5 bg-system-panel/50 border border-white/10 rounded-xl p-4 h-[350px]">
          <h3 className="text-sm font-mono text-white/40 uppercase mb-4 tracking-widest">
            Physique Analysis
          </h3>
          <StatusWindow stats={{
            strength: initialData.profile.stats_strength || 10,
            agility: initialData.profile.stats_agility || 10,
            stamina: initialData.profile.stats_stamina || 10,
          }} />
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

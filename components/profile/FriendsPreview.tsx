"use client";

import Link from "next/link";
import { UserPlus, Users } from "lucide-react";
import { RankBadge } from "@/components/gamification/RankBadge";
import { cn } from "@/lib/utils/cn";

interface Friend {
  friend_id: string;
  profiles: {
    id: string;
    username: string | null;
    display_name: string | null;
    rank_tier: string | null;
    class: string | null;
  };
}

interface FriendsPreviewProps {
  friends: Friend[];
}

export function FriendsPreview({ friends }: FriendsPreviewProps) {
  if (!friends || friends.length === 0) {
    return (
      <div className="text-center py-8 border border-dashed border-white/20 rounded-xl">
        <Users className="w-10 h-10 text-white/20 mx-auto mb-3" />
        <p className="text-white/40 font-mono mb-1">No friends yet</p>
        <Link
          href="/friends"
          className="text-system-cyan text-sm hover:underline flex items-center justify-center gap-1"
        >
          <UserPlus className="w-3 h-3" />
          Add friends to see them here!
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      {friends.map((friend) => {
        const profile = friend.profiles;
        const displayName = profile.display_name || profile.username || "Hunter";
        const initial = displayName[0]?.toUpperCase() || "H";

        return (
          <Link
            key={friend.friend_id}
            href={`/profile/${profile.username}`}
            className="relative group"
          >
            {/* Avatar */}
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-void-deep border-2 border-white/20 flex items-center justify-center text-lg md:text-2xl font-display font-bold text-white transition-all duration-300 hover:scale-110 hover:border-system-cyan">
              {initial}
            </div>

            {/* Rank Badge Overlay */}
            <div className="absolute -bottom-1 -right-1 transform scale-50 md:scale-75">
              <RankBadge rank={profile.rank_tier as any} size="sm" />
            </div>

            {/* Username Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap bg-void-panel/95 backdrop-blur-xl border border-white/20 rounded-lg px-2 py-1 text-xs text-white font-mono z-10">
              @{profile.username}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

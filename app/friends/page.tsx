"use client";

import { useState, useEffect } from "react";
import { Search, UserPlus, MoreHorizontal, User as UserIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils/cn";
import { sendFriendRequest, removeFriend, searchUsers, getFriends } from "@/server/actions/friend-actions";
import { RankBadge } from "@/components/gamification/RankBadge";
import { CardSkeleton } from "@/components/loading/EnhancedSkeleton";

export default function FriendsPage() {
  const supabase = createClient();
  const [friends, setFriends] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadFriends();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      handleSearch(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const loadFriends = async () => {
    const result = await getFriends();
    setFriends(result);
  };

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    const results = await searchUsers(query);
    setSearchResults(results);
    setIsLoading(false);
  };

  const handleAddFriend = async (username: string) => {
    const result = await sendFriendRequest(username);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(`Friend request sent to ${username}`);
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  const handleRemoveFriend = async (friendId: string) => {
    if (!confirm("Are you sure you want to remove this friend?")) return;

    const result = await removeFriend(friendId);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Friend removed");
      loadFriends();
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white uppercase tracking-wider">
            Friends
          </h1>
          <p className="text-white/60">
            Manage your hunter network
          </p>
        </div>
        <div className="text-sm text-white/40 font-mono">
          {friends.length} Friends
        </div>
      </div>

      <section className="bg-system-panel border border-white/10 rounded-xl p-6">
        <h2 className="text-xl font-display font-bold text-white uppercase tracking-wider mb-4">
          Add Friend
        </h2>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Search by username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-void-deep border border-white/20 rounded-lg pl-10 pr-4 py-4 text-base text-white placeholder:text-white/30 focus:border-system-cyan focus:outline-none transition-colors"
          />
        </div>

        {searchResults.length > 0 && (
          <div className="space-y-2">
            {searchResults.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-system-cyan/20 flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-system-cyan" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{user.username}</div>
                    <div className="text-xs text-white/60 flex items-center gap-2">
                      <RankBadge rank={user.rank_tier} size="sm" />
                      <span>Lv. {user.level}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleAddFriend(user.username)}
                  className="flex items-center gap-2 px-4 py-3 min-h-[44px] bg-system-cyan text-void-deep rounded-lg font-medium hover:bg-system-cyan/90 transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  Add
                </button>
              </div>
            ))}
          </div>
        )}

        {searchQuery.length > 0 && searchResults.length === 0 && !isLoading && (
          <div className="text-center py-8 text-white/60">
            No users found matching "{searchQuery}"
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-bold text-white uppercase tracking-wider">
            My Friends
          </h2>
        </div>

        {friends.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
            <UserPlus className="w-12 h-12 text-white/40 mx-auto mb-4" />
            <p className="text-white/60 font-display text-lg mb-2">No friends yet</p>
            <p className="text-white/40 text-sm">
              Search for hunters above to start building your network
            </p>
          </div>
        ) : isLoading ? (
          <div className="grid gap-3">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : (
          <div className="grid gap-3">
            {friends.map((friend: any) => {
              const profile = friend.profiles_friend_id || friend.profiles_user_id;
              const isSender = friend.user_id === (friend.profiles_user_id?.id);

              return (
                <div key={friend.id} className="flex items-center justify-between p-4 bg-system-panel border border-white/10 rounded-xl hover:border-white/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-system-cyan/20 flex items-center justify-center">
                      <UserIcon className="w-6 h-6 text-system-cyan" />
                    </div>
                    <div>
                      <div className="text-white font-bold">{profile.username}</div>
                      <div className="text-sm text-white/60 flex items-center gap-2">
                        <RankBadge rank={profile.rank_tier} size="sm" />
                        <span>Lv. {profile.level}</span>
                        <span className="text-white/40">•</span>
                        <span className="text-white/40">{profile.class}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveFriend(profile.id)}
                    className="w-11 h-11 flex items-center justify-center text-white/40 hover:text-status-danger hover:bg-status-danger/10 rounded-lg transition-colors"
                    title="Remove friend"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

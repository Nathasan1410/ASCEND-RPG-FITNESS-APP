"use client";

import { useState, useEffect } from "react";
import { Check, X, User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { acceptFriendRequest, declineFriendRequest, getFriendRequests } from "@/server/actions/friend-actions";
import { RankBadge } from "@/components/gamification/RankBadge";
import { CardSkeleton } from "@/components/loading/EnhancedSkeleton";

export default function FriendRequestsPage() {
  const supabase = createClient();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    const result = await getFriendRequests();
    setRequests(result);
    setLoading(false);
  };

  const handleAccept = async (requestId: string, username: string) => {
    const result = await acceptFriendRequest(requestId);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(`Friend request from ${username} accepted`);
      loadRequests();
    }
  };

  const handleDecline = async (requestId: string, username: string) => {
    const result = await declineFriendRequest(requestId);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(`Friend request from ${username} declined`);
      loadRequests();
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div>
        <h1 className="text-3xl font-display font-bold text-white uppercase tracking-wider">
          Friend Requests
        </h1>
        <p className="text-white/60">
          Manage incoming friend requests
        </p>
      </div>

      {loading ? (
        <div className="grid gap-3">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
          <User className="w-12 h-12 text-white/40 mx-auto mb-4" />
          <p className="text-white/60 font-display text-lg mb-2">No pending requests</p>
          <p className="text-white/40 text-sm">
            When hunters send you requests, they'll appear here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((request: any) => {
            const sender = request.profiles_user_id;
            return (
              <div key={request.id} className="flex items-center justify-between p-4 bg-system-panel border border-system-cyan/30 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-system-cyan/20 flex items-center justify-center">
                    <User className="w-6 h-6 text-system-cyan" />
                  </div>
                  <div>
                    <div className="text-white font-bold">{sender.username}</div>
                    <div className="text-sm text-white/60 flex items-center gap-2">
                      <RankBadge rank={sender.rank_tier} size="sm" />
                      <span>Lv. {sender.level}</span>
                      <span className="text-white/40">•</span>
                      <span className="text-white/40">{sender.class}</span>
                    </div>
                    <div className="text-xs text-white/40 mt-1">
                      Sent {new Date(request.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAccept(request.id, sender.username)}
                    className="flex items-center gap-2 px-4 py-3 min-h-[44px] bg-status-success text-white rounded-lg font-medium hover:bg-status-success/90 transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    Accept
                  </button>
                  <button
                    onClick={() => handleDecline(request.id, sender.username)}
                    className="flex items-center gap-2 px-4 py-3 min-h-[44px] bg-status-danger text-white rounded-lg font-medium hover:bg-status-danger/90 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Decline
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

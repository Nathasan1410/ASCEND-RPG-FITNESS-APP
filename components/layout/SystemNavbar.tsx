"use client";

import Link from "next/link";
import { User, Trophy, Settings, LogOut, Users, Bell, Radio } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { getUnreadCount } from "@/server/actions/notification-actions";

export function SystemNavbar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [unreadCount, setUnreadCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    createClient().auth.getUser().then(async ({ data }) => {
      setUsername(data.user?.user_metadata?.username || "");
      const count = await getUnreadCount();
      setUnreadCount(count);
    });
  }, []);

  const handleLogout = async () => {
    await createClient().auth.signOut();
    router.push("/");
  };

  return (
    <nav className="h-16 border-b border-white/10 bg-system-panel/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex-1 items-center">
        <Link href="/dashboard" className="text-xl font-display font-bold tracking-tighter text-system-cyan">
          ASCEND
        </Link>
        
         <div className="hidden md:flex items-center gap-6">
          <Link href="/feed" className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2">
            <Radio className="w-4 h-4 text-white/60" />
            HUNTER NETWORK
          </Link>
          <Link href="/dashboard/leaderboard" className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2">
            <Trophy className="w-4 h-4 text-white/60" />
            LEADERBOARD
          </Link>
          <Link href="/friends" className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2">
            <Users className="w-4 h-4 text-white/60" />
            FRIENDS
          </Link>
          <Link href="/notifications" className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2 relative">
            <Bell className="w-4 h-4 text-white/60" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-status-danger text-[10px] text-white flex items-center justify-center font-bold">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
            NOTIFICATIONS
          </Link>
        </div>
      </div>

      <div className="relative">
        <button 
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className="w-8 h-8 rounded border border-white/20 flex items-center justify-center bg-void-deep hover:border-white/40 transition-colors"
        >
          <User className="w-4 h-4 text-white/60" />
        </button>
        
         {userMenuOpen && (
          <div className="absolute right-0 top-12 w-48 bg-void-panel border border-white/10 rounded-lg shadow-xl overflow-hidden">
            <div className="p-2 space-y-1">
              <Link
                href={`/profile/${username}`}
                className="block px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white rounded transition-colors"
              >
                <User className="w-4 h-4 text-white/60" />
                My Profile
              </Link>
              
              <Link
                href="/friends"
                className="block px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white rounded transition-colors"
              >
                <Users className="w-4 h-4 text-white/60" />
                Friends
              </Link>
              
              <Link
                href="/notifications"
                className="block px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white rounded transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-white/60" />
                  Notifications
                </div>
                {unreadCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-status-danger text-[10px] text-white flex items-center justify-center font-bold">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Link>
              
              <Link
                href="/settings"
                className="block px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white rounded transition-colors"
              >
                <Settings className="w-4 h-4 text-white/60" />
                Settings
              </Link>
              
              <button
                onClick={handleLogout}
                className="w-full px-3 py-2 text-sm text-status-danger hover:bg-white/10 hover:text-status-danger rounded transition-colors"
              >
                <LogOut className="w-4 h-4 text-white/60" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

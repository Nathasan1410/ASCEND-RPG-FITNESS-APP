"use client";

import Link from "next/link";
import { User, Trophy, Settings, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/cn";

export function SystemNavbar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [username, setUsername] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => {
      setUsername(data.user?.user_metadata?.username || "");
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
          <Link href="/dashboard/leaderboard" className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-2">
            <Trophy className="w-4 h-4 text-white/60" />
            LEADERBOARD
          </Link>
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
          )}
        </div>
      </div>
    </nav>
  );
}

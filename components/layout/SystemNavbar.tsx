"use client";

import Link from "next/link";
import { User, Trophy, Settings, LogOut, Users, Bell, Radio, Home, Zap, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

export function SystemNavbar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

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
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-system-cyan to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-2xl">🧪</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-white text-lg tracking-wider">ASCEND</h1>
            <p className="text-xs text-gray-400">Fitness RPG</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <Home className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-white/80 hover:text-white">Dashboard</span>
          </Link>
          <Link
            href="/feed/mobile"
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <Radio className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-white/80 hover:text-white">Mobile Feed</span>
          </Link>
          <Link
            href="/feed"
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg",
              pathname?.includes("/feed") 
                ? "bg-system-cyan/5 border border-system-cyan/20"
                : "hover:bg-white/5"
            )}
          >
            <Radio className={cn("w-4 h-4", pathname?.includes("/feed") ? "text-system-cyan" : "text-gray-400")} />
            <span className={cn("text-sm font-medium", pathname?.includes("/feed") ? "text-system-cyan" : "text-white/80 hover:text-white")}>
              Hunter Network
            </span>
            {pathname?.includes("/feed") && (
              <span className="ml-auto bg-yellow-500/20 text-yellow-400 text-[10px] px-2 py-0.5 rounded-full font-bold">
                PREVIEW
              </span>
            )}
          </Link>
          <Link
            href="/dashboard/leaderboard"
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <Shield className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-white/80 hover:text-white">Leaderboard</span>
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <Settings className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-white/80 hover:text-white">Settings</span>
          </Link>
        </nav>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
            <Users className="w-5 h-5 text-gray-400" />
          </button>
          <button className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
            <Zap className="w-5 h-5 text-gray-400" />
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center cursor-pointer" onClick={() => setUserMenuOpen(!userMenuOpen)}>
            <span className="text-sm font-bold text-white">{username?.charAt(0)?.toUpperCase() || "H"}</span>
          </div>
        </div>
      </div>

      {/* User Dropdown Menu */}
      {userMenuOpen && (
        <div className="fixed right-6 top-16 z-40 w-56 bg-[#0a0a0f] border border-white/10 rounded-xl shadow-2xl overflow-hidden backdrop-blur-md">
          <div className="p-2 space-y-1">
            <Link
              href={`/profile/me`}
              className="block px-3 py-2 text-sm text-white/80 hover:bg-white/15 hover:text-white rounded transition-colors"
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-white/60" />
                <span>My Profile</span>
              </div>
            </Link>

            <Link
              href="/friends"
              className="block px-3 py-2 text-sm text-white/80 hover:bg-white/15 hover:text-white rounded transition-colors"
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-white/60" />
                <span>Friends</span>
              </div>
            </Link>

            <Link
              href="/notifications"
              className="block px-3 py-2 text-sm text-white/80 hover:bg-white/15 hover:text-white rounded transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-white/60" />
                <span>Notifications</span>
              </div>
              {unreadCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center font-bold">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Link>

            <Link
              href="/settings"
              className="block px-3 py-2 text-sm text-white/80 hover:bg-white/15 hover:text-white rounded transition-colors"
            >
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-white/60" />
                <span>Settings</span>
              </div>
            </Link>

            <button
              onClick={handleLogout}
              className="w-full px-3 py-2 text-sm text-red-400 hover:bg-red-500/20 hover:text-red-400 rounded transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4 text-white/60" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

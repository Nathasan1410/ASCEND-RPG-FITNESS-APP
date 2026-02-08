"use client";

import Link from "next/link";
import { User, Trophy, Settings, LogOut, Users, Bell, Radio, Home, Zap, Shield, HelpCircle, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

export function SystemNavbar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => {
      setUsername(data.user?.user_metadata?.username || "");
      setIsAuthenticated(!!data.user);
    });
  }, []);

  const handleLogout = async () => {
    await createClient().auth.signOut();
    router.push("/");
  };

  const handleDashboardClick = () => {
    // Navigate to dashboard if logged in, otherwise show login
    if (!isAuthenticated) {
      router.push("/auth/login");
    } else {
      router.push("/dashboard");
    }
  };

  const handleHomeClick = () => {
    // Always navigate to home regardless of auth status
    router.push("/");
  };

  return (
    <header className="hidden md:flex fixed top-0 left-0 right-0 z-50 h-16 bg-void-deep/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between w-full">
         {/* Logo */}
         <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity group">
           <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,184,255,0.4)] group-hover:shadow-[0_0_30px_rgba(0,184,255,0.6)] transition-all">
             <img
               src="/img/logo.jpg"
               alt="ASCEND Logo"
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-br from-system-cyan/20 to-transparent" />
           </div>
           <div>
             <h1 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight">ASCEND</h1>
             <p className="text-xs md:text-sm text-white/60 font-mono">Fitness RPG</p>
           </div>
         </Link>
 
         {/* Home Button */}
         <button
           onClick={handleHomeClick}
           className={cn(
             "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 relative border-none bg-transparent cursor-pointer",
             pathname === "/"
               ? "text-white bg-white/5 -mb-[1px] pb-[1px]"
               : "text-white/70 hover:text-white hover:bg-white/5"
           )}
         >
           <Home className={cn(
             "w-5 h-5 transition-all",
             pathname === "/"
               ? "text-system-cyan"
               : "text-white/60"
           )} />
           <span className="text-sm font-medium">Home</span>
         </button>
 
         {/* Navigation */}
        <nav className="flex items-center gap-1">
          <button
            onClick={handleDashboardClick}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 relative border-none bg-transparent cursor-pointer",
              pathname === "/dashboard"
                ? "text-white bg-system-cyan/10 border-b-2 border-system-cyan -mb-[1px] pb-[1px]"
                : "text-white/70 hover:text-white hover:bg-white/5"
            )}
          >
            <Home className={cn(
              "w-5 h-5 transition-all",
              pathname === "/dashboard"
                ? "text-system-cyan drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]"
                : "text-white/60"
            )} />
            <span className="text-sm font-medium">Dashboard</span>
          </button>
          {/* <Link
            href="/feed/mobile"
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 relative",
              pathname?.includes("/feed")
                ? "text-white bg-system-cyan/10 border-b-2 border-system-cyan -mb-[1px] pb-[1px]"
                : "text-white/70 hover:text-white hover:bg-white/5"
            )}
          >
            <Radio className={cn(
              "w-5 h-5 transition-all",
              pathname?.includes("/feed") 
                ? "text-system-cyan drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]" 
                : "text-white/60"
            )} />
            <span className="text-sm font-medium">Hunter Networ (Mobile)</span>
          </Link> */}
          <Link
            href="/feed/web"
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 relative",
              pathname?.includes("/feed")
                ? "text-white bg-system-cyan/10 border-b-2 border-system-cyan -mb-[1px] pb-[1px]"
                : "text-white/70 hover:text-white hover:bg-white/5"
            )}
          >
            <Radio className={cn(
              "w-5 h-5 transition-all",
              pathname?.includes("/feed")
                ? "text-system-cyan drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]"
                : "text-white/60"
            )} />
            <span className="text-sm font-medium">Hunter Network</span>
            {(pathname === "/feed/web" || pathname === "/feed/mobile") && (
              <span className="ml-auto bg-yellow-500/20 text-yellow-400 text-[10px] px-2 py-0.5 rounded-full font-bold">
                PREVIEW
              </span>
            )}
          </Link>
          <Link
            href="/dashboard/leaderboard"
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 relative",
              pathname === "/dashboard/leaderboard"
                ? "text-white bg-system-cyan/10 border-b-2 border-system-cyan -mb-[1px] pb-[1px]"
                : "text-white/70 hover:text-white hover:bg-white/5"
            )}
          >
            <Shield className={cn(
              "w-5 h-5 transition-all",
              pathname === "/dashboard/leaderboard" 
                ? "text-system-cyan drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]" 
                : "text-white/60"
            )} />
            <span className="text-sm font-medium">Leaderboard</span>
          </Link>
          <button
            onClick={() => {
              if (isAuthenticated) {
                router.push("/settings");
              } else {
                router.push("/auth/login");
              }
            }}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 relative border-none bg-transparent cursor-pointer",
              pathname === "/settings"
                ? "text-white bg-system-cyan/10 border-b-2 border-system-cyan -mb-[1px] pb-[1px]"
                : "text-white/70 hover:text-white hover:bg-white/5"
            )}
          >
            <Settings className={cn(
              "w-5 h-5 transition-all",
              pathname === "/settings"
                ? "text-system-cyan drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]"
                : "text-white/60"
            )} />
            <span className="text-sm font-medium">Settings</span>
          </button>
          <Link
            href="/roadmap"
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 relative",
              pathname === "/roadmap"
                ? "text-white bg-system-cyan/10 border-b-2 border-system-cyan -mb-[1px] pb-[1px]"
                : "text-white/70 hover:text-white hover:bg-white/5"
            )}
          >
            <MapPin className={cn(
              "w-5 h-5 transition-all",
              pathname === "/roadmap"
                ? "text-system-cyan drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]"
                : "text-white/60"
            )} />
            <span className="text-sm font-medium">Roadmap</span>
          </Link>
          <Link
            href="/help"
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 relative",
              pathname?.includes("/help")
                ? "text-white bg-system-cyan/10 border-b-2 border-system-cyan -mb-[1px] pb-[1px]"
                : "text-white/70 hover:text-white hover:bg-white/5"
            )}
          >
            <HelpCircle className={cn(
              "w-5 h-5 transition-all",
              pathname?.includes("/help")
                ? "text-system-cyan drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]"
                : "text-white/60"
            )} />
            <span className="text-sm font-medium">Help</span>
          </Link>
        </nav>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <button className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                <Users className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                <Zap className="w-5 h-5 text-gray-400" />
              </button>
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-system-cyan hover:ring-offset-2 hover:ring-offset-void-deep transition-all" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                  <span className="text-sm font-bold text-white">{username?.charAt(0)?.toUpperCase() || "H"}</span>
                </div>
              </div>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-system-cyan to-blue-600 hover:from-system-cyan/90 hover:to-blue-600/90 text-white text-sm font-medium transition-all shadow-[0_0_20px_rgba(0,184,255,0.3)] hover:shadow-[0_0_30px_rgba(0,184,255,0.5)]"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* User Dropdown Menu */}
      {userMenuOpen && (
        <>
          <div 
            className="fixed inset-0 z-[55]" 
            onClick={() => setUserMenuOpen(false)}
          />
          <div className="fixed right-6 top-16 z-[60] w-56 bg-[#0a0a0f]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden">
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

            <div className="border-t border-white/10 my-1"></div>

            <button
              onClick={handleLogout}
              className="block w-full px-3 py-2 text-sm text-status-danger hover:bg-status-danger/10 hover:text-status-danger rounded transition-colors"
            >
              <div className="flex items-center gap-2">
                <LogOut className="w-4 h-4 text-status-danger/60" />
                <span>Sign Out</span>
              </div>
            </button>
          </div>
        </div>
        </>
      )}
    </header>
  );
}

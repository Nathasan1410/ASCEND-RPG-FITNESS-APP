"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Home, Radio, Trophy, Users, Bell, Settings, HelpCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { createClient } from "@/lib/supabase/client";

export function StravaMobileNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    createClient().auth.getUser().then(async ({ data }) => {
      setUsername(data.user?.user_metadata?.username || "");
    });
  }, []);

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/feed/mobile", icon: Radio, label: "Hunter Network" },
    { href: "/dashboard/leaderboard", icon: Trophy, label: "Leaderboard" },
    { href: "/friends", icon: Users, label: "Friends" },
    { href: "/notifications", icon: Bell, label: "Notifications", hasBadge: false },
    { href: "/settings", icon: Settings, label: "Settings" },
    { href: "/help", icon: HelpCircle, label: "Help" },
  ];

  return (
    <div className="md:hidden">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 glass-panel border-b border-white/10 px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-system-cyan to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-lg">🧪</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-white text-base">ASCEND</h1>
            </div>
          </div>

          {/* Navigation Links - Full Strava Style */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 relative",
                    isActive
                      ? "bg-system-cyan text-black shadow-[0_0_15px_rgba(0,184,255,0.3)]"
                      : "hover:bg-white/10 text-white/80"
                  )}
                >
                  <Icon className={cn("w-5 h-5 transition-all", isActive ? "text-black" : "text-gray-400")} />
                  <span className={cn("text-sm font-medium", isActive ? "text-black" : "text-white/80")}>
                    {item.label}
                  </span>
                  {item.hasBadge && (
                    <span className="ml-1 bg-status-danger text-[10px] px-2 py-0.5 rounded-full font-bold text-white">
                      5
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}

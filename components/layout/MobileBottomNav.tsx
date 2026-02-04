"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Home, Users, Trophy, User, Radio } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Activity" },
  { href: "/feed", icon: Radio, label: "Feed" },
  { href: "/dashboard/leaderboard", icon: Trophy, label: "Rankings" },
  { href: "/profile/me", icon: User, label: "You" },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const [username, setUsername] = useState("");

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => {
      setUsername(data.user?.user_metadata?.username || "");
    });
  }, []);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      {/* Strava-style Glassmorphism Bottom Navbar */}
      <div className="bg-black/60 backdrop-blur-xl border-t border-white/5 shadow-[0_-4px_30px_rgba(0,0,0,0.3)]">
        <div className="max-w-lg mx-auto px-2 py-2">
          <div className="flex items-center justify-between gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-300 relative",
                    isActive
                      ? "bg-black/80 border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5 transition-all",
                      isActive ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" : "text-black/60"
                    )}
                  />
                  <span className={cn(
                    "text-[9px] font-semibold uppercase tracking-wide",
                    isActive ? "text-white" : "text-black/70"
                  )}>
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="absolute -top-0.5 left-1/2 right-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_4px_rgba(255,255,255,0.4)]" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

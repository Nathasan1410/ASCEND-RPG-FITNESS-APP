"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Home, ScrollText, Trophy, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { createClient } from "@/lib/supabase/client";

export function MobileBottomNav() {
  const pathname = usePathname();
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => {
      setUsername(data.user?.user_metadata?.username || "");
    });
  }, []);

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/dashboard/quests", icon: ScrollText, label: "Archive" },
    { href: "/dashboard/leaderboard", icon: Trophy, label: "Rankings" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 w-full h-16 bg-system-panel/95 backdrop-blur-xl border-t border-white/10 flex items-center justify-around px-2 z-50">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            href={item.href}
            className={cn(
              "flex-col items-center gap-1 px-2 py-2 rounded-lg transition-all duration-300",
              isActive ? "text-system-cyan drop-shadow-[0_0_10px_rgba(0,255,255,0.2)]" : "text-white/40"
            )}
          >
            <Icon className={cn("w-5", isActive && "drop-shadow-[0_0_10px_rgba(0,255,255,0.2)]")} />
            <span className="text-[10px] font-medium uppercase tracking-wider">
              {item.label}
            </span>
          </Link>
        );
      })}

      {/* Profile Button - Always Right-Aligned */}
      <Link
        href={`/profile/${username}`}
        className="flex items-center gap-1 px-2 py-2 rounded-lg transition-all duration-300"
      >
        <User className="w-5" />
        <span className="text-[10px] font-medium uppercase tracking-wider">
          Profile
        </span>
      </Link>
    </nav>
  );
}

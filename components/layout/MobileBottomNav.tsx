"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Home, User, Radio, Settings, Trophy, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/feed/mobile", icon: Radio, label: "Feed" },
  { href: "/profile/me", icon: User, label: "Profile" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => {
      setUsername(data.user?.user_metadata?.username || "");
    });
  }, []);

  return (
    <nav className="md:hidden fixed bottom-4 left-4 right-4 z-50">
      <div className="bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-around px-1 py-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative group flex flex-col items-center gap-1 px-4 py-2.5 rounded-full transition-all duration-300",
                  isActive
                    ? "text-system-cyan"
                    : "text-white/60 hover:text-white"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 transition-all",
                    isActive && "drop-shadow-[0_0_10px_rgba(0,255,255,0.4)]"
                  )}
                />
                <span className="text-[10px] font-medium uppercase tracking-wider">
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute inset-0 bg-system-cyan/10 rounded-full -z-10" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { createClient } from "@/lib/supabase/client";

export interface NavItem {
  id: string;
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
  showAvatar?: boolean;
}

export interface StravaMobileNavProps {
  navItems: NavItem[];
  username?: string;
}

export const StravaMobileNav = ({ navItems, username: initialUsername }: StravaMobileNavProps) => {
  const pathname = usePathname();
  const [username, setUsername] = useState<string>(initialUsername || "");

  useEffect(() => {
    if (initialUsername) return;
    
    createClient().auth.getUser().then(({ data }) => {
      setUsername(data.user?.user_metadata?.username || "");
    });
  }, [initialUsername]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-void-deep/95 backdrop-blur-xl border-t border-white/10 z-50 md:hidden">
      <div className="flex items-center justify-around py-2 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.id}
              href={item.href}
              className="flex flex-col items-center gap-1 px-3 py-2 min-w-[60px] min-h-[56px] transition-colors relative active:opacity-70"
            >
              {item.badge && (
                <div className="absolute -top-1 bg-system-cyan text-void-deep rounded-full px-2 py-0.5 text-[10px] font-bold">
                  {item.badge}
                </div>
              )}

              {item.showAvatar ? (
                <div className="w-6 h-6 rounded-full bg-system-cyan/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-system-cyan">
                    {username[0]?.toUpperCase() || "H"}
                  </span>
                </div>
              ) : (
                <Icon className={cn(
                  "w-6 h-6 transition-colors",
                  isActive ? "text-system-cyan" : "text-white/50"
                )} />
              )}

              <span className={cn(
                "text-[10px] font-medium transition-colors",
                isActive ? "text-system-cyan" : "text-white/50"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

StravaMobileNav.displayName = "StravaMobileNav";

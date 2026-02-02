"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutGrid, ScrollText, Trophy, User, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  {
    href: "/dashboard",
    icon: LayoutGrid,
    label: "Dashboard",
  },
  {
    href: "/dashboard/leaderboard",
    icon: Trophy,
    label: "Leaderboard",
  },
  {
    href: "/settings",
    icon: Settings,
    label: "Settings",
  },
];

export function FloatingNavDock() {
  const pathname = usePathname();
  const [tooltip, setTooltip] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
      }}
      className="fixed left-1/2 top-1/2 -translate-x-1/2 md:hidden z-50"
    >
      <div
        className={cn(
          "flex items-center gap-2 px-2 py-2",
          "bg-zinc-900/50 backdrop-blur-md",
          "border border-white/10 rounded-full",
          "shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
        )}
        onMouseLeave={() => setTooltip(null)}
      >
        <AnimatePresence>
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <motion.div
                key={item.href}
                layoutId={item.href}
                initial={{ opacity: 0, x: -20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "relative group",
                    "flex items-center justify-center",
                    "w-12 h-12 rounded-full transition-all duration-300",
                    isActive
                      ? "bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                      : "hover:bg-white/10"
                  )}
                  onMouseEnter={() => setTooltip(item.label)}
                  aria-label={item.label}
                >
                  <Icon
                    className={cn(
                      "w-6 h-6 text-white transition-colors",
                      isActive && "drop-shadow-[0_0_5px_rgba(37,99,235,0.8)]"
                    )}
                  />
                  {isActive && (
                    <motion.div
                      layoutId="active-glow"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-0 rounded-full bg-blue-600 -z-10"
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed left-1/2 bottom-20 -translate-x-1/2 md:hidden px-3 py-2 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl whitespace-nowrap z-[60]"
          >
            <p className="text-xs font-medium uppercase tracking-widest text-blue-400">
              {tooltip}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

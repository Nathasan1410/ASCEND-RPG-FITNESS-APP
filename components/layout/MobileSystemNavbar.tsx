"use client";

import { useState, useEffect } from "react";
import { Home, ScrollText, Trophy, User, Settings, Menu, X, Radio, Bell, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/feed/mobile", icon: Radio, label: "Hunter Network" },
  { href: "/dashboard/leaderboard", icon: Trophy, label: "Leaderboard" },
  { href: "/friends", icon: Users, label: "Friends" },
  { href: "/notifications", icon: Bell, label: "Notifications", hasBadge: true },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export function MobileSystemNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [unreadCount, setUnreadCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    createClient().auth.getUser().then(async ({ data }) => {
      setUsername(data.user?.user_metadata?.username || "");
      // Would call getUnreadCount() in production
      setUnreadCount(3); // Demo count
    });
  }, []);

  const handleLogout = async () => {
    await createClient().auth.signOut();
    router.push("/");
  };

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    router.push(href);
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-void-deep/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/dashboard" className="text-xl font-display font-bold tracking-tighter text-system-cyan">
            ASCEND
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="fixed inset-y-0 right-0 w-80 max-w-full bg-void-deep border-l border-white/10 z-[70] md:hidden overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-void-deep/95 backdrop-blur-xl border-b border-white/10 p-4 z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* User Avatar */}
                    <div className="w-12 h-12 rounded-full bg-system-cyan/20 flex items-center justify-center">
                      <span className="text-lg font-bold text-system-cyan">
                        {username[0]?.toUpperCase() || "H"}
                      </span>
                    </div>
                    <div>
                      <div className="text-white font-bold">{username || "Hunter"}</div>
                      <div className="text-xs text-white/60">View Profile</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Navigation Items */}
              <div className="p-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  const hasNotification = item.hasBadge && unreadCount > 0;

                  return (
                    <button
                      key={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className={cn(
                        "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all",
                        isActive
                          ? "bg-system-cyan text-void-deep shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                          : "hover:bg-white/10 text-white/80"
                      )}
                    >
                      <Icon className="w-6 h-6 flex-shrink-0" />
                      <span className="flex-1 text-left font-medium text-base">
                        {item.label}
                      </span>
                      {hasNotification && (
                        <span className="w-6 h-6 rounded-full bg-status-danger flex items-center justify-center text-xs font-bold text-white">
                          {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Quick Actions */}
              <div className="p-4 border-t border-white/10">
                <button
                  onClick={() => {
                    handleNavClick(`/profile/${username}`);
                  }}
                  className="w-full flex items-center gap-4 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white/80"
                >
                  <User className="w-6 h-6 flex-shrink-0" />
                  <span className="flex-1 text-left font-medium text-base">
                    My Profile
                  </span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-status-danger/10 transition-colors text-status-danger mt-2"
                >
                  <X className="w-6 h-6 flex-shrink-0" />
                  <span className="flex-1 text-left font-medium text-base">
                    Sign Out
                  </span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
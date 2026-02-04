"use client";

import { useState, useEffect } from "react";
import { Home, Radio, User, Plus } from "lucide-react";
import { MobileSystemNavbar } from "@/components/layout/MobileSystemNavbar";
import { StravaMobileNav } from "@/components/layout/StravaMobileNav";
import { createClient } from "@/lib/supabase/client";

export default function FriendsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [username, setUsername] = useState<string>("");

  const navItems = [
    {
      id: "home",
      href: "/dashboard",
      label: "Home",
      icon: Home,
    },
    {
      id: "feed",
      href: "/feed/mobile",
      label: "Feed",
      icon: Radio,
      badge: "NEW",
    },
    {
      id: "profile",
      href: `/profile/${username}`,
      label: "You",
      icon: User,
      showAvatar: true,
    },
    {
      id: "settings",
      href: "/settings",
      label: "More",
      icon: Plus,
    },
  ];

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => {
      setUsername(data.user?.user_metadata?.username || "");
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <MobileSystemNavbar />

      <main className="flex-1 p-4 md:p-6 max-w-4xl mx-auto w-full pb-20 md:pb-6">
        {children}
      </main>

      <StravaMobileNav navItems={navItems} username={username} />
    </div>
  );
}

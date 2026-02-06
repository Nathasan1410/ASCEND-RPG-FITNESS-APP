"use client";

import { useState } from "react";
import { Shield, Trophy, User, CheckCircle, Copy, Check, Filter, Search, Zap, Target } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";

export default function DemoAccountsPage() {
  const [filterRank, setFilterRank] = useState<string>("all");
  const [filterClass, setFilterClass] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const demoAccounts = [
    // S-Rank
    { id: 1, username: "ShadowHunter", email: "shadowhunter@test.com", password: "Test123!", rank: "S", class: "Assassin", level: 95, xp: 245000 },
    { id: 2, username: "PhantomBlade", email: "phantomblade@test.com", password: "Test123!", rank: "S", class: "Striker", level: 92, xp: 238000 },
    // A-Rank
    { id: 3, username: "ThunderStrike", email: "thunderstrike@test.com", password: "Test123!", rank: "A", class: "Tank", level: 78, xp: 156000 },
    { id: 4, username: "FrostWarrior", email: "frostwarrior@test.com", password: "Test123!", rank: "A", class: "Striker", level: 75, xp: 150000 },
    { id: 5, username: "IronTank", email: "irontank@test.com", password: "Test123!", rank: "A", class: "Tank", level: 72, xp: 144000 },
    { id: 6, username: "FlameKnight", email: "flameknight@test.com", password: "Test123!", rank: "A", class: "Assassin", level: 71, xp: 142000 },
    { id: 7, username: "StormRider", email: "stormrider@test.com", password: "Test123!", rank: "A", class: "Striker", level: 69, xp: 138000 },
    { id: 8, username: "VoidWalker", email: "voidwalker@test.com", password: "Test123!", rank: "A", class: "Assassin", level: 68, xp: 136000 },
    // B-Rank
    { id: 9, username: "SwiftWolf", email: "swiftwolf@test.com", password: "Test123!", rank: "B", class: "Assassin", level: 52, xp: 104000 },
    { id: 10, username: "CyberDragon", email: "cyberdragon@test.com", password: "Test123!", rank: "B", class: "Tank", level: 48, xp: 96000 },
    { id: 11, username: "BlazingFist", email: "blazingfist@test.com", password: "Test123!", rank: "B", class: "Striker", level: 45, xp: 90000 },
    { id: 12, username: "ThunderClaw", email: "thunderclaw@test.com", password: "Test123!", rank: "B", class: "Striker", level: 42, xp: 84000 },
    { id: 13, username: "ShadowStrike", email: "shadowstrike@test.com", password: "Test123!", rank: "B", class: "Assassin", level: 40, xp: 80000 },
    { id: 14, username: "FrozenSoul", email: "frozensoul@test.com", password: "Test123!", rank: "B", class: "Tank", level: 38, xp: 76000 },
    { id: 15, username: "IronShield", email: "ironshield@test.com", password: "Test123!", rank: "B", class: "Tank", level: 35, xp: 70000 },
    { id: 16, username: "BladeRunner", email: "bladerunner@test.com", password: "Test123!", rank: "B", class: "Striker", level: 32, xp: 64000 },
    // C-Rank
    { id: 17, username: "SwiftNinja", email: "swiftninja@test.com", password: "Test123!", rank: "C", class: "Assassin", level: 22, xp: 44000 },
    { id: 18, username: "CyberWolf", email: "cyberwolf@test.com", password: "Test123!", rank: "C", class: "Striker", level: 20, xp: 40000 },
    { id: 19, username: "DreadKnight", email: "dreadknight@test.com", password: "Test123!", rank: "C", class: "Tank", level: 18, xp: 36000 },
    { id: 20, username: "SilverFang", email: "silverfang@test.com", password: "Test123!", rank: "C", class: "Assassin", level: 15, xp: 30000 },
    { id: 21, username: "ThunderBolt", email: "thunderbolt@test.com", password: "Test123!", rank: "C", class: "Striker", level: 12, xp: 24000 },
    { id: 22, username: "IronHeart", email: "ironheart@test.com", password: "Test123!", rank: "C", class: "Tank", level: 10, xp: 20000 },
    { id: 23, username: "FrostStrike", email: "froststrike@test.com", password: "Test123!", rank: "C", class: "Striker", level: 8, xp: 16000 },
    { id: 24, username: "ShadowPaw", email: "shadowpaw@test.com", password: "Test123!", rank: "C", class: "Assassin", level: 5, xp: 10000 },
  ];

  const filteredAccounts = demoAccounts.filter(account => {
    const matchesRank = filterRank === "all" || account.rank === filterRank;
    const matchesClass = filterClass === "all" || account.class === filterClass;
    const matchesSearch = searchQuery === "" ||
      account.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRank && matchesClass && matchesSearch;
  });

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case "S": return "text-yellow-400 border-yellow-400/30 bg-yellow-400/10";
      case "A": return "text-purple-400 border-purple-400/30 bg-purple-400/10";
      case "B": return "text-blue-400 border-blue-400/30 bg-blue-400/10";
      case "C": return "text-cyan-400 border-cyan-400/30 bg-cyan-400/10";
      default: return "text-white/60 border-white/20 bg-white/10";
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-void-deep/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Link href="/help" className="text-white/60 hover:text-white transition-colors mb-4 inline-block">
            ← Back to Help
          </Link>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-system-cyan/10 to-blue-600/10 border border-system-cyan/30 flex items-center justify-center flex-shrink-0">
              <Shield className="w-7 h-7 text-system-cyan" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-display font-bold text-white mb-2">
                Demo Accounts
              </h1>
              <p className="text-sm text-white/60">
                Try ASCEND with pre-configured hunter accounts at different rank levels. All accounts use the same password for easy testing.
              </p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search by username or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-void-panel/50 backdrop-blur-xl border border-white/10 rounded-xl px-12 py-3 text-white placeholder:text-white/40 focus:border-system-cyan focus:outline-none transition-all"
              />
            </div>

            {/* Rank Filter */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilterRank("all")}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all min-h-[44px]",
                  filterRank === "all" ? "bg-system-cyan text-void-deep" : "bg-void-panel/50 text-white/70 border border-white/10 hover:border-system-cyan/30"
                )}
              >
                All Ranks
              </button>
              {["S", "A", "B", "C"].map(rank => (
                <button
                  key={rank}
                  onClick={() => setFilterRank(rank)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-bold transition-all min-h-[44px]",
                    filterRank === rank ? "bg-system-cyan text-void-deep" : "bg-void-panel/50 text-white/70 border border-white/10 hover:border-system-cyan/30"
                  )}
                >
                  {rank}-Rank
                </button>
              ))}
            </div>

            {/* Class Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilterClass("all")}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all min-h-[44px]",
                  filterClass === "all" ? "bg-system-cyan text-void-deep" : "bg-void-panel/50 text-white/70 border border-white/10 hover:border-system-cyan/30"
                )}
              >
                All Classes
              </button>
              {["Assassin", "Striker", "Tank"].map(cls => (
                <button
                  key={cls}
                  onClick={() => setFilterClass(cls)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all min-h-[44px]",
                    filterClass === cls ? "bg-system-cyan text-void-deep" : "bg-void-panel/50 text-white/70 border border-white/10 hover:border-system-cyan/30"
                  )}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-system-cyan/5 to-blue-600/5 border border-system-cyan/20 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-system-cyan flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white mb-2">
                Quick Start Guide
              </h3>
              <ul className="space-y-1 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Choose an account based on the rank you want to explore</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Copy the email or use the provided credentials</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Log in and explore features available at that rank</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>All demo accounts use password: <span className="font-mono bg-white/10 px-2 py-1 rounded font-bold text-system-cyan">Test123!</span></span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Account Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">
              Available Accounts ({filteredAccounts.length})
            </h2>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <Filter className="w-4 h-4" />
              <span>Filtered</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAccounts.map((account, index) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="bg-void-deep/50 border border-white/10 rounded-2xl p-6 hover:border-system-cyan/30 hover:bg-white/5 transition-all"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-system-cyan/20 to-blue-600/20 flex items-center justify-center">
                    <User className="w-6 h-6 text-system-cyan" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{account.username}</h3>
                    <div className="flex items-center gap-2">
                      <span className={cn("text-xs px-2 py-0.5 rounded font-bold uppercase border", getRankColor(account.rank))}>
                        {account.rank}-Rank
                      </span>
                      <span className="text-xs text-white/50">{account.class}</span>
                    </div>
                  </div>
                </div>
                <Trophy className="w-5 h-5 text-yellow-400" />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-4 h-4 text-system-cyan" />
                    <span className="text-xs text-white/60">Level</span>
                  </div>
                  <p className="text-lg font-bold text-white">{account.level}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-purple-400" />
                    <span className="text-xs text-white/60">XP</span>
                  </div>
                  <p className="text-lg font-bold text-white">{(account.xp / 1000).toFixed(1)}k</p>
                </div>
              </div>

              {/* Credentials */}
              <div className="space-y-3 mb-4">
                <div>
                  <div className="text-xs text-white/40 mb-1">Email</div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-mono text-white/80 truncate flex-1">{account.email}</p>
                    <button
                      onClick={() => handleCopyEmail(account.email)}
                      className={cn(
                        "p-2 rounded-lg transition-all min-w-[44px] min-h-[44px] flex items-center justify-center",
                        copiedEmail === account.email ? "bg-green-500/20 text-green-400" : "bg-white/10 text-white/60 hover:bg-white/20"
                      )}
                    >
                      {copiedEmail === account.email ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-white/40 mb-1">Password</div>
                  <p className="text-sm font-mono text-system-cyan">{account.password}</p>
                </div>
              </div>

              {/* Login Button */}
              <Link
                href="/auth/login"
                className="block w-full py-3 text-center bg-system-cyan hover:bg-system-cyan/90 text-void-deep rounded-lg font-bold transition-all min-h-[44px] flex items-center justify-center"
              >
                Login as {account.username}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredAccounts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Shield className="w-16 h-16 mx-auto mb-4 text-white/20" />
            <h3 className="text-xl font-bold text-white mb-2">No Accounts Found</h3>
            <p className="text-white/60">
              Try adjusting your filters or search terms.
            </p>
          </motion.div>
        )}

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-void-deep/50 border border-red-500/20 rounded-2xl p-6"
        >
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-white mb-2">Security Notice</h3>
              <p className="text-sm text-white/70">
                Demo accounts are for testing purposes only. Do not store personal data in these accounts. All demo accounts can be reset at any time. These accounts are publicly accessible.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

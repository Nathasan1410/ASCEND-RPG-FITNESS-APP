"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, CheckCircle, Clock, Lock, Star, ChevronRight, BarChart3, Users, Zap, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { trackedFeatures, calculateStats, type TrackedFeature } from "./tracker-data";
import { TrackerFeatureCard } from "./TrackerFeatureCard";

interface Filters {
  status: string;
  category: string;
  userAvailable: string;
}

export function ImplementationTracker() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Filters>({
    status: 'All',
    category: 'All',
    userAvailable: 'All',
  });

  const stats = calculateStats();

  const filteredFeatures = trackedFeatures.filter(feature => {
    const matchesSearch = searchTerm === '' ||
      feature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filters.status === 'All' || feature.status === filters.status;
    const matchesCategory = filters.category === 'All' || feature.category === filters.category;
    const matchesUserAvailable = filters.userAvailable === 'All' ||
      (filters.userAvailable === 'Available' && feature.userAvailable) ||
      (filters.userAvailable === 'Not Available' && !feature.userAvailable);

    return matchesSearch && matchesStatus && matchesCategory && matchesUserAvailable;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setFilters({ status: 'All', category: 'All', userAvailable: 'All' });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Core': return 'text-system-cyan';
      case 'Social': return 'text-blue-400';
      case 'AI': return 'text-purple-400';
      case 'Monetization': return 'text-green-400';
      case 'Innovation': return 'text-yellow-400';
      default: return 'text-white/60';
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-void-deep/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/" className="text-white/60 hover:text-white transition-colors mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-system-cyan/10 to-blue-600/10 border border-system-cyan/30 flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-7 h-7 text-system-cyan" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-display font-bold text-white mb-2">
                Implementation Tracker
              </h1>
              <p className="text-sm text-white/60">
                Track what's built and what's coming
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 border border-green-500/20 rounded-xl p-4"
            >
              <div className="text-xs text-green-400 mb-1">Implemented</div>
              <div className="text-2xl font-bold text-white">{stats.implemented}</div>
              <div className="text-xs text-white/40 mt-1">{Math.round((stats.implemented / stats.total) * 100)}%</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-gradient-to-br from-yellow-500/5 to-orange-500/5 border border-yellow-500/20 rounded-xl p-4"
            >
              <div className="text-xs text-yellow-400 mb-1">In Progress</div>
              <div className="text-2xl font-bold text-white">{stats.inProgress}</div>
              <div className="text-xs text-white/40 mt-1">{Math.round((stats.inProgress / stats.total) * 100)}%</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-500/5 to-indigo-500/5 border border-blue-500/20 rounded-xl p-4"
            >
              <div className="text-xs text-blue-400 mb-1">Planned</div>
              <div className="text-2xl font-bold text-white">{stats.planned}</div>
              <div className="text-xs text-white/40 mt-1">{Math.round((stats.planned / stats.total) * 100)}%</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-gradient-to-br from-system-cyan/5 to-purple-500/5 border border-system-cyan/20 rounded-xl p-4"
            >
              <div className="text-xs text-system-cyan mb-1">Overall Progress</div>
              <div className="text-2xl font-bold text-white">{stats.overallProgress}%</div>
              <div className="text-xs text-white/40 mt-1">{stats.total} total</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-void-deep/50 border border-white/10 rounded-2xl p-6">
            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search features..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-void-panel/50 backdrop-blur-xl border border-white/10 rounded-xl px-12 py-3 text-white placeholder:text-white/40 focus:border-system-cyan focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Status Filter */}
              <div className="flex-1">
                <label className="block text-xs text-white/60 mb-2">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="w-full bg-void-panel/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-system-cyan focus:outline-none transition-all"
                >
                  <option value="All">All Statuses</option>
                  <option value="Implemented">Implemented</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Planned">Planned</option>
                </select>
              </div>

              {/* Category Filter */}
              <div className="flex-1">
                <label className="block text-xs text-white/60 mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="w-full bg-void-panel/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-system-cyan focus:outline-none transition-all"
                >
                  <option value="All">All Categories</option>
                  <option value="Core">Core</option>
                  <option value="Social">Social</option>
                  <option value="AI">AI</option>
                  <option value="Monetization">Monetization</option>
                  <option value="Innovation">Innovation</option>
                </select>
              </div>

              {/* User Availability Filter */}
              <div className="flex-1">
                <label className="block text-xs text-white/60 mb-2">User Availability</label>
                <select
                  value={filters.userAvailable}
                  onChange={(e) => setFilters({ ...filters, userAvailable: e.target.value })}
                  className="w-full bg-void-panel/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-system-cyan focus:outline-none transition-all"
                >
                  <option value="All">All</option>
                  <option value="Available">Available to Try</option>
                  <option value="Not Available">Not Available</option>
                </select>
              </div>

              {/* Reset Button */}
              <div className="flex items-end">
                <button
                  onClick={resetFilters}
                  className="w-full md:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all min-h-[48px] flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Reset
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">
              Features ({filteredFeatures.length})
            </h2>
            <div className="text-sm text-white/60">
              Showing {filteredFeatures.length} of {stats.total} features
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.03 }}
            >
              <TrackerFeatureCard feature={feature} />
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredFeatures.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Search className="w-16 h-16 mx-auto mb-4 text-white/20" />
            <h3 className="text-xl font-bold text-white mb-2">No Features Found</h3>
            <p className="text-white/60">
              Try adjusting your filters or search terms.
            </p>
          </motion.div>
        )}

        {/* Additional Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-void-deep/50 border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">User Availability</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/60">Available to Try</span>
                  <span className="text-sm font-bold text-green-400">{stats.userAvailable} features</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-400 rounded-full transition-all"
                    style={{ width: `${(stats.userAvailable / stats.total) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/60">Demo Accounts Available</span>
                  <span className="text-sm font-bold text-blue-400">{stats.demoAvailable} features</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-400 rounded-full transition-all"
                    style={{ width: `${(stats.demoAvailable / stats.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-void-deep/50 border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Category Breakdown</h3>
            <div className="space-y-3">
              {['Core', 'Social', 'AI', 'Monetization', 'Innovation'].map(category => {
                const count = trackedFeatures.filter(f => f.category === category).length;
                const percentage = Math.round((count / stats.total) * 100);
                return (
                  <div key={category} className="flex items-center gap-3">
                    <div className={cn("text-sm font-bold", getCategoryColor(category))}>
                      {category}
                    </div>
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={cn("h-full rounded-full transition-all", {
                          'bg-system-cyan': category === 'Core',
                          'bg-blue-400': category === 'Social',
                          'bg-purple-400': category === 'AI',
                          'bg-green-400': category === 'Monetization',
                          'bg-yellow-400': category === 'Innovation',
                        })}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-white/60 w-12 text-right">{percentage}%</div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-4 py-8 border-t border-white/10 mt-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            Last updated: February 5, 2026
          </p>
          <div className="flex items-center gap-6 text-sm text-white/40">
            <Link href="/roadmap" className="hover:text-white transition-colors">
              View Roadmap
            </Link>
            <Link href="/help/demo-accounts" className="hover:text-white transition-colors">
              Try Demo Accounts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

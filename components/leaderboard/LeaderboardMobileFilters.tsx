"use client";

import { useState } from "react";
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { mockLeaderboardFilterChips } from "@/lib/mock/filter-data";

export function LeaderboardMobileFilters() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    rank: 'all',
    class: 'all',
    status: 'all',
    timeRange: 'week',
  });

  const activeCount = [
    filters.rank !== 'all',
    filters.class !== 'all',
    filters.status !== 'all',
    filters.timeRange !== 'all',
  ].filter(Boolean).length;

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="md:hidden">
      {/* Filter Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full h-12 min-h-[44px] flex items-center justify-between px-4 bg-void-panel/90 backdrop-blur-xl rounded-2xl border border-white/10 active:scale-95 transition-transform"
      >
        <div className="flex items-center gap-3">
          <Filter className={cn(
            "w-5 h-5 transition-colors",
            activeCount > 0 ? "text-system-cyan" : "text-white/60"
          )} />
          <span className="text-sm font-medium text-white">
            Filter Rankings
          </span>
          {activeCount > 0 && (
            <span className="px-2 py-0.5 bg-system-cyan text-void-deep rounded-full text-xs font-bold">
              {activeCount}
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronDown className="w-5 h-5 text-white/60" />
        ) : (
          <ChevronUp className="w-5 h-5 text-white/60" />
        )}
      </button>

      {/* Collapsible Filter Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="overflow-hidden mt-2"
          >
            <div className="bg-void-panel/95 backdrop-blur-xl rounded-2xl border border-white/10 p-4 space-y-4 max-h-[70vh] overflow-y-auto">
              {/* Horizontal Scroll for Categories */}
              <FilterChipsSection
                label="Rank"
                options={mockLeaderboardFilterChips.rank}
                selected={filters.rank}
                onChange={(value) => handleFilterChange('rank', value)}
              />

              <FilterChipsSection
                label="Class"
                options={mockLeaderboardFilterChips.class}
                selected={filters.class}
                onChange={(value) => handleFilterChange('class', value)}
              />

              <FilterChipsSection
                label="Status"
                options={mockLeaderboardFilterChips.status}
                selected={filters.status}
                onChange={(value) => handleFilterChange('status', value)}
              />

              <FilterChipsSection
                label="Time Range"
                options={mockLeaderboardFilterChips.timeRange}
                selected={filters.timeRange}
                onChange={(value) => handleFilterChange('timeRange', value)}
              />

              {/* Reset Button */}
              <button
                onClick={() => setFilters({
                  rank: 'all',
                  class: 'all',
                  status: 'all',
                  timeRange: 'all',
                })}
                className="w-full h-12 min-h-[44px] flex items-center justify-center text-sm font-medium text-system-cyan bg-white/5 rounded-xl active:bg-white/10 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface FilterChipsSectionProps {
  label: string;
  options: { value: string; label: string }[];
  selected: string;
  onChange: (value: string) => void;
}

function FilterChipsSection({ label, options, selected, onChange }: FilterChipsSectionProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs text-white/60 uppercase tracking-wide font-medium">
        {label}
      </label>
      <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar -mx-1 px-1">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex-shrink-0 h-11 min-w-[44px] min-h-[44px] px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-300 active:scale-95 whitespace-nowrap",
              selected === option.value
                ? "bg-system-cyan text-void-deep border-system-cyan shadow-[0_0_10px_rgba(0,255,255,0.3)]"
                : "bg-void-deep border-white/20 text-white/70 active:bg-white/10"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

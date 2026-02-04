"use client";

import { useState } from "react";
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import type { FeedFilters } from "@/types/social";

interface MobileFilterBarProps {
  filters: FeedFilters;
  onFiltersChange: (filters: FeedFilters) => void;
}

export function MobileFilterBar({ filters, onFiltersChange }: MobileFilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const activeCount = [
    filters.postType !== 'all',
    filters.rankFilter !== 'all',
    filters.timeRange !== 'all',
    filters.verifiedOnly,
    filters.friendsOnly,
  ].filter(Boolean).length;

  const handleFilterChange = (key: keyof FeedFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="md:hidden fixed bottom-20 left-4 right-4 z-40">
      {/* Filter Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full h-12 min-h-[44px] flex items-center justify-between px-4 bg-void-panel/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl active:scale-95 transition-transform"
      >
        <div className="flex items-center gap-3">
          <Filter className={cn(
            "w-5 h-5 transition-colors",
            activeCount > 0 ? "text-system-cyan" : "text-white/60"
          )} />
          <span className="text-sm font-medium text-white">
            Filters
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
              {/* Post Type Filter */}
              <FilterSection
                label="Post Type"
                options={[
                  { value: "all", label: "All Broadcasts" },
                  { value: "quest_completion", label: "Quest Completions" },
                  { value: "rank_up", label: "Rank Ups" },
                  { value: "level_up", label: "Level Ups" },
                  { value: "achievement", label: "Achievements" },
                ]}
                selected={filters.postType}
                onChange={(value) => handleFilterChange('postType', value)}
              />

              {/* Rank Filter */}
              <FilterSection
                label="Rank"
                options={[
                  { value: "all", label: "All Ranks" },
                  { value: "S", label: "S-Rank" },
                  { value: "A", label: "A-Rank+" },
                  { value: "B", label: "B-Rank+" },
                  { value: "C", label: "C-Rank+" },
                ]}
                selected={filters.rankFilter}
                onChange={(value) => handleFilterChange('rankFilter', value)}
              />

              {/* Time Range Filter */}
              <FilterSection
                label="Time Range"
                options={[
                  { value: "today", label: "Today" },
                  { value: "week", label: "This Week" },
                  { value: "month", label: "This Month" },
                  { value: "all", label: "All Time" },
                ]}
                selected={filters.timeRange}
                onChange={(value) => handleFilterChange('timeRange', value)}
              />

              {/* Toggle Filters */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <ToggleFilter
                  label="Verified Only"
                  checked={filters.verifiedOnly}
                  onChange={(checked) => handleFilterChange('verifiedOnly', checked)}
                />
                <ToggleFilter
                  label="Friends Only"
                  checked={filters.friendsOnly}
                  onChange={(checked) => handleFilterChange('friendsOnly', checked)}
                />
              </div>

              {/* Reset Button */}
              <button
                onClick={() => onFiltersChange({
                  postType: 'all',
                  rankFilter: 'all',
                  verifiedOnly: false,
                  friendsOnly: false,
                  timeRange: 'all',
                  guildFilter: null,
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

interface FilterSectionProps {
  label: string;
  options: { value: string; label: string }[];
  selected: string;
  onChange: (value: string) => void;
}

function FilterSection({ label, options, selected, onChange }: FilterSectionProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs text-white/60 uppercase tracking-wide font-medium">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "h-11 min-w-[44px] min-h-[44px] px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-300 active:scale-95",
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

interface ToggleFilterProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function ToggleFilter({ label, checked, onChange }: ToggleFilterProps) {
  return (
    <label className="flex items-center justify-between py-2 cursor-pointer active:opacity-80 transition-opacity">
      <span className="text-sm text-white/70">{label}</span>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div className={cn(
          "w-11 h-6 min-w-[44px] min-h-[44px] rounded-full transition-all duration-300 relative",
          checked ? 'bg-system-cyan shadow-[0_0_10px_rgba(0,255,255,0.4)]' : 'bg-void-deep border-2 border-white/20'
        )}>
          <motion.div
            animate={{ x: checked ? 20 : 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={cn(
              "absolute top-0.5 w-5 h-5 rounded-full transition-colors",
              checked ? 'bg-void-deep' : 'bg-white/40'
            )}
          />
        </div>
      </div>
    </label>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { FeedFilters } from "@/types/social";
import { cn } from "@/lib/utils/cn";
import { ActiveFilterChips } from "@/components/ui/ActiveFilterChips";
import { X } from "lucide-react";

interface FeedFilterBarProps {
  filters: FeedFilters;
  onFiltersChange: (filters: FeedFilters) => void;
}

export function FeedFilterBar({ filters, onFiltersChange }: FeedFilterBarProps) {
  return (
    <div className="bg-void-panel border border-white/10 rounded-xl p-4 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-white uppercase tracking-wider">
          Filter Posts
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        <FilterSection
          label="Post Type"
          options={[
            { value: "all", label: "All Broadcasts" },
            { value: "quest_completion", label: "Quest Completions" },
            { value: "rank_up", label: "Rank Ups" },
            { value: "level_up", label: "Level Ups" },
            { value: "achievement", label: "Achievements" },
            { value: "tip", label: "Hunter Tips" },
          ]}
          selected={filters.postType}
          onChange={(value) => onFiltersChange({ ...filters, postType: value as any })}
        />

        <FilterSection
          label="Rank"
          options={[
            { value: "all", label: "All Ranks" },
            { value: "S", label: "S-Rank Only" },
            { value: "A", label: "A-Rank+" },
            { value: "B", label: "B-Rank+" },
            { value: "C", label: "C-Rank+" },
            { value: "D", label: "D-Rank+" },
            { value: "E", label: "E-Rank+" },
          ]}
          selected={filters.rankFilter}
          onChange={(value) => onFiltersChange({ ...filters, rankFilter: value as any })}
        />

        <FilterSection
          label="Time Range"
          options={[
            { value: "today", label: "Today" },
            { value: "week", label: "This Week" },
            { value: "month", label: "This Month" },
            { value: "all", label: "All Time" },
          ]}
          selected={filters.timeRange}
          onChange={(value) => onFiltersChange({ ...filters, timeRange: value as any })}
        />
      </div>

      {/* Active Filters Chips */}
      <ActiveFilterChips
        filters={filters}
        onRemoveFilter={(key) => {
          if (key === 'postType') onFiltersChange({ ...filters, postType: 'all' });
          else if (key === 'rankFilter') onFiltersChange({ ...filters, rankFilter: 'all' });
          else if (key === 'timeRange') onFiltersChange({ ...filters, timeRange: 'all' });
          else if (key === 'verifiedOnly') onFiltersChange({ ...filters, verifiedOnly: false });
          else if (key === 'friendsOnly') onFiltersChange({ ...filters, friendsOnly: false });
        }}
        onClearAll={() => onFiltersChange({
          postType: 'all',
          rankFilter: 'all',
          verifiedOnly: false,
          friendsOnly: false,
          timeRange: 'all',
          guildFilter: null,
        })}
      />

      <div className="border-t border-white/10 pt-4 space-y-3">
        <div className="flex flex-wrap items-center gap-4">
          <ToggleSwitch
            label="Verified Hunters Only"
            checked={filters.verifiedOnly}
            onChange={(checked) => onFiltersChange({ ...filters, verifiedOnly: checked })}
          />

          <ToggleSwitch
            label="Friends Only"
            checked={filters.friendsOnly}
            onChange={(checked) => onFiltersChange({ ...filters, friendsOnly: checked })}
          />
        </div>

        <button
          onClick={() => onFiltersChange({
            postType: 'all',
            rankFilter: 'all',
            verifiedOnly: false,
            friendsOnly: false,
            timeRange: 'all',
            guildFilter: null,
          })}
          className="text-sm text-system-cyan hover:text-white/80 transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}

function FilterSection({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  selected: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-white/60 uppercase tracking-wide">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <motion.button
            key={option.value}
            onClick={() => onChange(option.value)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-300",
              selected === option.value
                ? "bg-system-cyan text-void-deep border-system-cyan shadow-[0_0_10px_rgba(0,255,255,0.3)] scale-105"
                : "bg-void-deep border-white/20 text-white/70 hover:border-white/40 hover:bg-white/5"
            )}
          >
            {option.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function ToggleSwitch({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div className={cn(
          "w-12 h-7 rounded-full transition-all duration-300 relative",
          checked 
            ? "bg-system-cyan shadow-[0_0_10px_rgba(0,255,255,0.4)]"
            : "bg-void-deep border-2 border-white/20"
        )}>
          <motion.div
            animate={{ x: checked ? 20 : 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={cn(
              "absolute top-0.5 w-6 h-6 rounded-full transition-colors",
              checked ? "bg-void-deep" : "bg-white/40"
            )}
          />
        </div>
      </div>
      <span className={cn(
        "text-sm font-medium transition-colors",
        checked ? "text-white" : "text-white/60 group-hover:text-white/80"
      )}>
        {label}
      </span>
    </label>
  );
}

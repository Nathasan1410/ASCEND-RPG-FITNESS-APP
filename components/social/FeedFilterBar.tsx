"use client";

import { useState } from "react";
import type { FeedFilters } from "@/types/social";
import { cn } from "@/lib/utils/cn";

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

      <div className="border-t border-white/10 pt-4 space-y-3">
        <div className="flex items-center gap-3">
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
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`
              px-3 py-2 rounded-lg text-sm font-medium transition-all
              ${selected === option.value
                ? 'bg-system-cyan text-void-deep border-system-cyan'
                : 'bg-void-deep border-white/20 text-white/70 hover:border-white/40'
              }
            `}
          >
            {option.label}
          </button>
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
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <div className={`
        relative w-10 h-6 rounded-full transition-all
        ${checked ? 'bg-system-cyan' : 'bg-void-deep border-2'}
      `}>
        <div
          className={`absolute left-0.5 top-0.5 w-5 h-5 rounded-full transition-all ${
            checked ? 'left-5 opacity-100' : 'opacity-0'
          }`}
        />
      </div>
      <span className="text-sm text-white/70">
        {label}
      </span>
    </label>
  );
}

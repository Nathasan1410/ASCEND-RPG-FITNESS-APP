"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { FeedFilters } from "@/types/social";

interface ActiveFilterChipsProps {
  filters: FeedFilters;
  onRemoveFilter: (key: string) => void;
  onClearAll: () => void;
}

export function ActiveFilterChips({ filters, onRemoveFilter, onClearAll }: ActiveFilterChipsProps) {
  const activeFilters = [
    filters.postType !== 'all' && { key: 'postType', label: `Type: ${filters.postType}` },
    filters.rankFilter !== 'all' && { key: 'rankFilter', label: `Rank: ${filters.rankFilter}` },
    filters.timeRange !== 'all' && { key: 'timeRange', label: `Time: ${filters.timeRange}` },
    filters.verifiedOnly && { key: 'verifiedOnly', label: 'Verified Only' },
    filters.friendsOnly && { key: 'friendsOnly', label: 'Friends Only' },
  ].filter(Boolean) as { key: string; label: string }[];

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-white/5 rounded-lg border border-white/10">
      <span className="text-xs text-white/60 font-medium uppercase tracking-wide mr-2">
        Active Filters:
      </span>
      {activeFilters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onRemoveFilter(filter.key)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-system-cyan/20 text-system-cyan rounded-full text-xs font-medium hover:bg-system-cyan/30 transition-colors"
        >
          {filter.label}
          <X className="w-3 h-3" />
        </button>
      ))}
      <button
        onClick={onClearAll}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 text-white/70 rounded-full text-xs font-medium hover:bg-white/20 transition-colors"
      >
        Clear All
      </button>
    </div>
  );
}

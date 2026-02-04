"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { mockLeaderboardFilterChips } from "@/lib/mock/filter-data";

export function LeaderboardDesktopFilters() {
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
    <div className="hidden md:flex flex-col gap-4">
      <div className="flex items-center gap-3 mb-2">
        <Filter className={cn(
          "w-5 h-5 transition-colors",
          activeCount > 0 ? "text-system-cyan" : "text-white/60"
        )} />
        <h3 className="text-sm font-medium text-white">
          Filter Rankings
          {activeCount > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-system-cyan text-void-deep rounded-full text-xs font-bold">
              {activeCount}
            </span>
          )}
        </h3>
      </div>

      <div className="space-y-3">
        <FilterSection
          label="Rank"
          options={mockLeaderboardFilterChips.rank}
          selected={filters.rank}
          onChange={(value) => handleFilterChange('rank', value)}
        />

        <FilterSection
          label="Class"
          options={mockLeaderboardFilterChips.class}
          selected={filters.class}
          onChange={(value) => handleFilterChange('class', value)}
        />

        <FilterSection
          label="Status"
          options={mockLeaderboardFilterChips.status}
          selected={filters.status}
          onChange={(value) => handleFilterChange('status', value)}
        />

        <FilterSection
          label="Time Range"
          options={mockLeaderboardFilterChips.timeRange}
          selected={filters.timeRange}
          onChange={(value) => handleFilterChange('timeRange', value)}
        />

        <button
          onClick={() => setFilters({
            rank: 'all',
            class: 'all',
            status: 'all',
            timeRange: 'all',
          })}
          className="w-full h-10 min-h-[44px] flex items-center justify-center text-sm font-medium text-system-cyan bg-white/5 rounded-xl active:bg-white/10 transition-colors hover:bg-white/10"
        >
          Reset Filters
        </button>
      </div>
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
              "h-9 min-h-[44px] px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-300 active:scale-95",
              selected === option.value
                ? "bg-system-cyan text-void-deep border-system-cyan shadow-[0_0_10px_rgba(0,255,255,0.3)]"
                : "bg-void-deep border-white/20 text-white/70 active:bg-white/10 hover:bg-white/5"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

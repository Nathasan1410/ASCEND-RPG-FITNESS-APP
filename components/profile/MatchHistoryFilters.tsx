"use client";

import { useState } from "react";
import { Filter, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface MatchHistoryFiltersProps {
  onFilterChange: (filters: {
    type: string;
    startDate: string;
    endDate: string;
  }) => void;
}

export function MatchHistoryFilters({ onFilterChange }: MatchHistoryFiltersProps) {
  const [filters, setFilters] = useState({
    type: "all",
    startDate: "",
    endDate: "",
  });

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      type: "all",
      startDate: "",
      endDate: "",
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const hasActiveFilters = filters.type !== "all" || filters.startDate || filters.endDate;

  return (
    <div className="bg-system-panel/50 border border-white/10 rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-system-cyan" />
          <span className="text-sm font-mono text-white/40 uppercase tracking-widest">
            Filters
          </span>
          {hasActiveFilters && (
            <span className="text-xs bg-system-cyan/20 text-system-cyan px-2 py-0.5 rounded font-mono">
              Active
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-white/60 hover:text-white transition-colors"
          >
            <X className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Quest Type Filter */}
        <div>
          <label htmlFor="questType" className="text-xs text-white/60 block mb-2">
            Quest Type
          </label>
          <select
            id="questType"
            value={filters.type}
            onChange={(e) => handleFilterChange("type", e.target.value)}
            className="w-full bg-void-deep border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:border-system-cyan focus:outline-none transition-colors h-[44px]"
          >
            <option value="all">All Types</option>
            <option value="Daily">Daily</option>
            <option value="Penalty">Penalty</option>
            <option value="RankUp">Rank Up</option>
            <option value="Special">Special</option>
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label htmlFor="startDate" className="text-xs text-white/60 block mb-2">
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            value={filters.startDate}
            onChange={(e) => handleFilterChange("startDate", e.target.value)}
            className="w-full bg-void-deep border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:border-system-cyan focus:outline-none transition-colors h-[44px]"
          />
        </div>

        {/* End Date */}
        <div>
          <label htmlFor="endDate" className="text-xs text-white/60 block mb-2">
            End Date
          </label>
          <input
            id="endDate"
            type="date"
            value={filters.endDate}
            onChange={(e) => handleFilterChange("endDate", e.target.value)}
            className="w-full bg-void-deep border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:border-system-cyan focus:outline-none transition-colors h-[44px]"
          />
        </div>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils/cn";
import { RankTier } from "@/types/schemas";

interface RankBadgeProps {
  rank: RankTier;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function RankBadge({ rank, size = "md", className }: RankBadgeProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-lg px-4 py-1.5",
  };

  const rankColors: Record<RankTier, string> = {
    "E-Rank": "text-rank-e border-rank-e/30 bg-rank-e/10",
    "D-Rank": "text-rank-d border-rank-d/30 bg-rank-d/10",
    "C-Rank": "text-rank-c border-rank-c/30 bg-rank-c/10 shadow-[0_0_10px_rgba(85,234,212,0.2)]",
    "B-Rank": "text-rank-b border-rank-b/30 bg-rank-b/10 shadow-[0_0_10px_rgba(0,184,255,0.2)]",
    "A-Rank": "text-rank-a border-rank-a/30 bg-rank-a/10 shadow-[0_0_15px_rgba(189,0,255,0.3)]",
    "S-Rank": "text-rank-s border-rank-s/50 bg-rank-s/20 shadow-[0_0_20px_rgba(243,230,0,0.4)] animate-pulse-system",
  };

  return (
    <span
      className={cn(
        "font-display font-bold border rounded uppercase tracking-wider inline-flex items-center justify-center",
        sizeClasses[size],
        rankColors[rank],
        className
      )}
    >
      {rank}
    </span>
  );
}

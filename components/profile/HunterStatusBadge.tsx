import { cn } from "@/lib/utils/cn";
import { HunterStatus } from "@/types/schemas";
import { CheckCircle, AlertTriangle, Skull, Shield } from "lucide-react";

interface HunterStatusBadgeProps {
  status: HunterStatus;
  size?: "sm" | "md";
  showLabel?: boolean;
}

export function HunterStatusBadge({ status, size = "md", showLabel = true }: HunterStatusBadgeProps) {
  const config = {
    Normal: { color: "text-white/60", icon: Shield, bg: "bg-white/5 border-white/20" },
    Verified: { color: "text-system-cyan", icon: CheckCircle, bg: "bg-system-cyan/10 border-system-cyan/40" },
    Flagged: { color: "text-status-warning", icon: AlertTriangle, bg: "bg-status-warning/10 border-status-warning/40" },
    Corrupted: { color: "text-status-danger", icon: Skull, bg: "bg-status-danger/10 border-status-danger/40" },
  };

  const { color, icon: Icon, bg } = config[status || "Normal"];

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 rounded-full border",
      bg,
      size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"
    )}>
      <Icon className={cn(color, size === "sm" ? "w-3 h-3" : "w-4 h-4")} />
      {showLabel && <span className={cn("font-mono uppercase tracking-wider", color)}>{status}</span>}
    </div>
  );
}

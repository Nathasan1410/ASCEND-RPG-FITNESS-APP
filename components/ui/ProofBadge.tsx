import { BadgeCheck } from "lucide-react";

export function ProofBadge() {
  return (
    <div className="inline-flex items-center gap-1 bg-system-cyan/10 border border-system-cyan/30 px-2 py-0.5 rounded text-[10px] font-bold text-system-cyan uppercase tracking-wider">
      <BadgeCheck className="w-3 h-3" />
      <span>Verified</span>
    </div>
  );
}

"use client";

import { SystemButton } from "@/components/ui/SystemButton";
import { startRankUpExam } from "@/server/actions/rank-up-actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { AlertTriangle, Lock } from "lucide-react";

export function RankUpBanner({ nextRank }: { nextRank: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleStartExam = async () => {
    setLoading(true);
    try {
      const quest = await startRankUpExam();
      toast.success("Gatekeeper Protocol Initiated.");
      router.push(`/dashboard/quest/${(quest as any).id}`);
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-status-flagged/10 border border-status-flagged rounded-xl p-6 relative overflow-hidden animate-in fade-in slide-in-from-top-4">
      {/* Background Pulse */}
      <div className="absolute inset-0 bg-status-flagged/5 animate-pulse pointer-events-none" />
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-status-flagged/20 flex items-center justify-center border border-status-flagged">
            <Lock className="w-6 h-6 text-status-flagged" />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider">
              Limit Reached
            </h3>
            <p className="text-sm text-status-flagged font-mono">
              Ascension to {nextRank} requires verification.
            </p>
          </div>
        </div>

        <SystemButton 
          variant="danger" 
          onClick={handleStartExam} 
          disabled={loading}
          glow
        >
          {loading ? "Initializing..." : "Challenge the Gatekeeper"}
        </SystemButton>
      </div>
    </div>
  );
}

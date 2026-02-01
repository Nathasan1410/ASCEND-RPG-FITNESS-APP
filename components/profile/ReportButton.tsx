"use client";

import { useState } from "react";
import { SystemButton } from "@/components/ui/SystemButton";
import { submitReport } from "@/server/actions/report-actions";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";

interface ReportButtonProps {
  targetUserId: string;
  targetUsername: string;
}

export function ReportButton({ targetUserId, targetUsername }: ReportButtonProps) {
  const [isReporting, setIsReporting] = useState(false);

  const handleReport = async () => {
    if (!confirm(`Report hunter ${targetUsername} for suspicious activity? This cannot be undone.`)) return;
    
    setIsReporting(true);
    try {
      await submitReport({
        target_user_id: targetUserId,
        reason: "Suspicious_Pattern", // Default for button
        description: "Community flag via profile",
      });
      toast.success("Report logged. The System is watching.");
    } catch (error: any) {
      toast.error(error.message || "Failed to submit report.");
    } finally {
      setIsReporting(false);
    }
  };

  return (
    <button
      onClick={handleReport}
      disabled={isReporting}
      className="text-status-danger/60 hover:text-status-danger transition-colors p-2 rounded hover:bg-status-danger/10"
      title="Report Suspicious Activity"
    >
      <AlertTriangle className="w-5 h-5" />
    </button>
  );
}

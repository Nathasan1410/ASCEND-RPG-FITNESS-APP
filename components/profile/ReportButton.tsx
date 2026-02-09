"use client";

import { useState } from "react";
import { submitReport } from "@/server/actions/report-actions";
import { toast } from "sonner";
import { AlertTriangle, X } from "lucide-react";

interface ReportButtonProps {
  targetUserId: string;
  targetLogId?: string;
  targetUsername: string;
}

export function ReportButton({ targetUserId, targetLogId, targetUsername }: ReportButtonProps) {
  if (!targetUserId) {
    return null;
  }

  const [isReporting, setIsReporting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState("Suspicious_Pattern");
  const [description, setDescription] = useState("");

  const handleReport = async () => {
    if (!description.trim()) {
      toast.error("Please provide a description for your report.");
      return;
    }

    if (!targetUserId) {
      toast.error("Target user not found. Please refresh and try again.");
      return;
    }

    setIsReporting(true);
    try {
      await submitReport({
        target_user_id: targetUserId,
        target_log_id: targetLogId || undefined,
        reason: reason as any,
        description: description,
      });
      toast.success("Report logged. AI moderation in progress.");
      setShowModal(false);
      setDescription("");
    } catch (error: any) {
      toast.error(error.message || "Failed to submit report.");
    } finally {
      setIsReporting(false);
    }
  };

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowModal(true);
        }}
        className="text-status-danger/60 hover:text-status-danger transition-colors p-2 rounded hover:bg-status-danger/10"
        title="Report Suspicious Activity"
      >
        <AlertTriangle className="w-5 h-5" />
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-void-surface border border-void-border rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-white">
                Report Hunter: {targetUsername}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/40 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-mono text-system-cyan uppercase mb-2">
                  Report Reason
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-void-deep border border-void-border p-3 rounded text-white"
                >
                  <option value="Impossible_Stats">Impossible Stats</option>
                  <option value="Fake_Media">Fake or Misleading Media</option>
                  <option value="Suspicious_Pattern">Suspicious Activity Pattern</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-mono text-system-cyan uppercase mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-void-deep border border-void-border p-3 rounded text-white"
                  rows={4}
                  placeholder="Describe why you're reporting this hunter. Be specific and provide evidence..."
                  maxLength={500}
                />
                <p className="text-xs text-white/40 font-mono mt-1">
                  {description.length}/500
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-white/20 rounded text-white/60 hover:text-white hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReport}
                  disabled={isReporting || !description.trim()}
                  className="flex-1 px-4 py-2 bg-status-danger/20 border border-status-danger/40 rounded text-status-danger hover:bg-status-danger/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isReporting ? "Submitting..." : "Submit Report"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

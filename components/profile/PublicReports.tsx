import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { formatQuestDate } from "@/lib/utils/date-helpers";
import { cn } from "@/lib/utils/cn";

type PublicReport = {
  id: string;
  reporter_username: string;
  target_username: string;
  reason: string;
  description: string;
  created_at: string;
  ai_confidence: number | null;
  ai_action_taken: string | null;
  impact_applied: boolean;
  report_count: number;
};

interface PublicReportsProps {
  targetUserId: string;
}

export function PublicReports({ targetUserId }: PublicReportsProps) {
  const [reports, setReports] = useState<PublicReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      const supabase = createClient();
      const { data } = await supabase
        .from("public_reports_view")
        .select("*")
        .eq("target_user_id", targetUserId)
        .order("created_at", { ascending: false })
        .limit(20);

      setReports(data || []);
      setLoading(false);
    }

    fetchReports();
  }, [targetUserId]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-white/40 font-mono">Loading reports...</p>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="text-center py-8 border border-dashed border-white/10 rounded-xl">
        <p className="text-white/40 font-mono">No community reports</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-status-warning" />
        <h3 className="text-sm font-mono text-white/90 uppercase tracking-widest">
          Community Reports
        </h3>
        <span className="text-xs text-white/40 font-mono">({reports.length})</span>
      </div>

      {reports.map((report) => (
        <div key={report.id} className="bg-system-panel/30 border border-white/10 rounded-lg p-3">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono text-status-danger bg-status-danger/10 px-2 py-0.5 rounded">
                {report.reason.replace(/_/g, ' ')}
              </span>
              {report.ai_action_taken && (
                <span className={cn(
                  "text-xs font-mono px-2 py-0.5 rounded",
                  report.ai_action_taken === "DISMISS" ? "text-system-green bg-system-green/10" :
                  report.ai_action_taken === "PENALTY" ? "text-status-danger bg-status-danger/10" :
                  "text-status-warning bg-status-warning/10"
                )}>
                  AI: {report.ai_action_taken}
                </span>
              )}
              {report.report_count > 1 && (
                <span className="text-xs font-mono text-status-warning bg-status-warning/10 px-2 py-0.5 rounded">
                  {report.report_count} reports
                </span>
              )}
            </div>
            <span className="text-xs text-white/40 font-mono">
              {formatQuestDate(report.created_at)}
            </span>
          </div>

          <p className="text-sm text-white/70 mb-2">{report.description}</p>

          <div className="flex items-center gap-4 text-xs text-white/40 font-mono">
            <span>Reported by: {report.reporter_username}</span>
            {report.ai_confidence !== null && (
              <span className={cn(
                "font-bold",
                report.ai_confidence > 0.8 ? "text-system-green" :
                report.ai_confidence > 0.5 ? "text-status-warning" : "text-status-danger"
              )}>
                AI Confidence: {(report.ai_confidence * 100).toFixed(0)}%
              </span>
            )}
          </div>

          {report.impact_applied && (
            <div className="mt-2 flex items-center gap-1 text-xs text-status-warning font-mono bg-status-warning/10 px-2 py-1 rounded">
              <CheckCircle2 className="w-3 h-3" />
              <span>Impact applied</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

import { WorkoutPlan } from "@/types/schemas";
import { formatQuestDate } from "@/lib/utils/date-helpers";
import { cn } from "@/lib/utils/cn";
import { Camera, Clock, Trophy, AlertCircle, AlertTriangle } from "lucide-react";
import { ReportButton } from "./ReportButton";

type MatchHistoryEntry = {
  id: string;
  user_id: string;
  profiles?: {
    username: string;
  } | null;
  xp_awarded: number | null;
  duration_actual: number;
  integrity_score: number | null;
  proof_media_url: string | null;
  verification_status: string | null;
  completed_at: string | null;
  report_count?: number;
  quests: {
    plan_json: unknown;
    rank_difficulty: string;
  } | null;
};

interface MatchHistoryProps {
  logs: MatchHistoryEntry[];
  onLogClick?: (logId: string) => void;
  isOwnProfile?: boolean;
  currentUserId?: string;
}

export function MatchHistory({ logs, onLogClick, isOwnProfile = false, currentUserId }: MatchHistoryProps) {
  if (logs.length === 0) {
    return (
      <div className="text-center py-8 border border-dashed border-white/20 rounded-xl">
        <p className="text-white/40 font-mono">No operations logged.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {logs.map((log) => {
        const plan = log.quests?.plan_json as WorkoutPlan;
        const integrity = (log.integrity_score || 0) * 100;
        const isVerified = log.verification_status === "Verified" || log.verification_status === "Auto_Approved";

        return (
          <div
            key={log.id}
            onClick={() => onLogClick?.(log.id)}
            className={cn(
              "bg-system-panel/50 border border-white/10 rounded-lg p-4 flex flex-col md:flex-row justify-between md:items-start gap-4 transition-all",
              onLogClick && "cursor-pointer hover:border-system-cyan/30 hover:bg-white/5"
            )}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={cn(
                  "text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border",
                  isVerified ? "text-system-cyan border-system-cyan/30" : "text-white/40 border-white/10"
                )}>
                  {log.quests?.rank_difficulty}
                </span>
                <h4 className="font-bold text-white text-sm">{plan?.quest_name || "Unknown Protocol"}</h4>
                {(log.report_count || 0) > 0 && (
                  <div className="flex items-center gap-1 text-xs font-mono text-status-warning bg-status-warning/10 px-2 py-0.5 rounded border border-status-warning/20">
                    <AlertTriangle className="w-3 h-3" />
                    <span>{log.report_count} report{(log.report_count || 0) > 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 text-xs text-white/40 font-mono">
                <span>{formatQuestDate(log.completed_at || "")}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {log.duration_actual}m
                </span>
                {log.proof_media_url && (
                  <a
                    href={log.proof_media_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-system-cyan hover:underline px-2 py-2 -ml-2"
                  >
                    <Camera className="w-4 h-4" /> Proof
                  </a>
                )}
              </div>
            </div>

            <div className="flex items-center gap-6 md:ml-4">
              <div className="text-right">
                <p className="text-[10px] text-white/40 font-mono uppercase">Integrity</p>
                <p className={cn(
                  "text-sm font-bold font-mono",
                  integrity < 70 ? "text-status-warning" : "text-system-cyan"
                )}>
                  {integrity.toFixed(0)}%
                </p>
              </div>

              <div className="text-right min-w-[60px]">
                <p className="text-[10px] text-white/40 font-mono uppercase">Reward</p>
                <div className="flex items-center justify-end gap-1 text-system-cyan font-bold">
                  <Trophy className="w-3 h-3" />
                  +{log.xp_awarded}
                </div>
              </div>

              {!isOwnProfile && currentUserId && (
                <ReportButton
                  targetUserId={log.user_id}
                  targetLogId={log.id}
                  targetUsername={log.profiles?.username || "Unknown"}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

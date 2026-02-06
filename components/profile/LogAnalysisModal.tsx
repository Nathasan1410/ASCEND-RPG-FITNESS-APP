"use client";

import { useState, useEffect } from "react";
import { X, Brain, Activity, Shield, Target, Clock, Trophy } from "lucide-react";
import { getLogAnalysis } from "@/server/actions/log-analysis-actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils/cn";

interface LogAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  logId: string;
}

interface AnalysisData {
  log_id: string;
  quest_name: string;
  quest_rank: string;
  quest_type: string;
  completed_at: string | null;
  xp_awarded: number;
  integrity_score: number;
  effort_score: number;
  safety_score: number;
  duration_actual: number;
  analysis: {
    summary: string;
    integrity_explanation: string;
    effort_explanation: string;
    safety_explanation: string;
    suggestions: string[];
  };
}

export function LogAnalysisModal({ isOpen, onClose, logId }: LogAnalysisModalProps) {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && logId) {
      fetchAnalysis();
    }
  }, [isOpen, logId]);

  const fetchAnalysis = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getLogAnalysis(logId);
      setAnalysisData(data);
    } catch (err: any) {
      console.error("Failed to fetch analysis:", err);
      setError(err.message || "Failed to load analysis");
      toast.error("Failed to load workout analysis");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-xl"
      onClick={onClose}
    >
      <div
        className={cn(
          "bg-system-panel border border-white/10 rounded-t-xl md:rounded-xl w-full md:w-[700px] max-h-[90vh] overflow-y-auto",
          "transform transition-all duration-300 animate-in slide-in-from-bottom md:fade-in md:zoom-in-95"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-system-panel/95 backdrop-blur-xl border-b border-white/10 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="w-5 h-5 text-system-cyan" />
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-wider">
              Opik Analysis
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-11 h-11 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 border-3 border-system-cyan border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-white/60 font-mono">Analyzing workout data...</p>
            </div>
          ) : error ? (
            <div className="bg-status-danger/10 border border-status-danger/30 rounded-lg p-6 text-center">
              <p className="text-status-danger">{error}</p>
              <button
                onClick={fetchAnalysis}
                className="mt-4 px-4 py-2 bg-status-danger/20 hover:bg-status-danger/30 text-status-danger rounded-lg transition-colors"
              >
                Retry
              </button>
            </div>
          ) : analysisData ? (
            <>
              {/* Quest Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-mono uppercase px-2 py-1 rounded border border-system-cyan/30 text-system-cyan bg-system-cyan/10">
                    {analysisData.quest_rank}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-1 rounded border border-white/10 text-white/60">
                    {analysisData.quest_type}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">{analysisData.quest_name}</h3>
              </div>

              {/* Score Cards */}
              <div className="grid grid-cols-3 gap-3">
                <ScoreCard
                  icon={Shield}
                  label="Integrity"
                  value={analysisData.integrity_score}
                  color="system-cyan"
                />
                <ScoreCard
                  icon={Activity}
                  label="Effort"
                  value={analysisData.effort_score}
                  color="system-cyan"
                />
                <ScoreCard
                  icon={Target}
                  label="Safety"
                  value={analysisData.safety_score}
                  color="system-cyan"
                />
              </div>

              {/* Quick Stats */}
              <div className="flex gap-4 text-xs text-white/40 font-mono">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{analysisData.duration_actual}min duration</span>
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="w-3 h-3" />
                  <span>+{analysisData.xp_awarded} XP awarded</span>
                </div>
              </div>

              {/* AI Analysis */}
              <div className="space-y-4">
                <h4 className="text-sm font-display font-bold text-white uppercase tracking-wider">
                  Opik Assessment
                </h4>

                {/* Summary */}
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-white/80 text-sm leading-relaxed">{analysisData.analysis.summary}</p>
                </div>

                {/* Detailed Breakdown */}
                <div className="space-y-3">
                  <AnalysisSection
                    icon={Shield}
                    title="Integrity Analysis"
                    content={analysisData.analysis.integrity_explanation}
                  />
                  <AnalysisSection
                    icon={Activity}
                    title="Effort Analysis"
                    content={analysisData.analysis.effort_explanation}
                  />
                  <AnalysisSection
                    icon={Target}
                    title="Safety Assessment"
                    content={analysisData.analysis.safety_explanation}
                  />
                </div>

                {/* Suggestions */}
                {analysisData.analysis.suggestions.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono text-white/40 uppercase tracking-wider">
                      Recommendations
                    </h4>
                    <ul className="space-y-2">
                      {analysisData.analysis.suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-white/70 bg-system-cyan/5 border border-system-cyan/10 rounded-lg p-3"
                        >
                          <span className="text-system-cyan font-mono mt-0.5">{index + 1}.</span>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ScoreCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: any;
  label: string;
  value: number;
  color: string;
}) {
  const percentage = Math.round(value * 100);
  const colorClass = percentage >= 80 ? "text-system-cyan" : percentage >= 60 ? "text-status-warning" : "text-status-danger";

  return (
    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
      <Icon className={`w-4 h-4 ${colorClass} mb-2`} />
      <p className="text-[10px] text-white/40 font-mono uppercase mb-1">{label}</p>
      <p className={`text-2xl font-bold font-display ${colorClass}`}>
        {percentage}%
      </p>
    </div>
  );
}

function AnalysisSection({
  icon: Icon,
  title,
  content,
}: {
  icon: any;
  title: string;
  content: string;
}) {
  return (
    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-system-cyan" />
        <h5 className="text-sm font-bold text-white">{title}</h5>
      </div>
      <p className="text-white/70 text-sm leading-relaxed">{content}</p>
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils/cn";
import { Shield, Zap, Target, Award, BarChart3, TrendingUp } from "lucide-react";

interface EvaluationMetricsProps {
  integrityScore: number;
  effortScore: number;
  safetyScore: number;
  overallScore: number;
  xpAwarded: number;
  verificationStatus?: string;
  evaluationTime?: number;
}

export function EvaluationMetrics({
  integrityScore,
  effortScore,
  safetyScore,
  overallScore,
  xpAwarded,
  verificationStatus,
  evaluationTime,
}: EvaluationMetricsProps) {
  const grade = overallScore >= 0.9 ? "S" : overallScore >= 0.8 ? "A" : overallScore >= 0.7 ? "B" : overallScore >= 0.6 ? "C" : "D";
  const gradeColor = overallScore >= 0.9 ? "text-green-400" : overallScore >= 0.8 ? "text-blue-400" : overallScore >= 0.7 ? "text-yellow-400" : overallScore >= 0.6 ? "text-orange-400" : "text-red-400";
  const gradeBg = overallScore >= 0.9 ? "bg-green-500/20 border-green-500/40" : overallScore >= 0.8 ? "bg-blue-500/20 border-blue-500/40" : overallScore >= 0.7 ? "bg-yellow-500/20 border-yellow-500/40" : overallScore >= 0.6 ? "bg-orange-500/20 border-orange-500/40" : "bg-red-500/20 border-red-500/40";

  const factors = [
    {
      name: "Integrity",
      score: integrityScore,
      icon: Shield,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      description: "Consistency between reported and expected performance",
    },
    {
      name: "Effort",
      score: effortScore,
      icon: Zap,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      description: "Intensity level compared to quest requirements",
    },
    {
      name: "Safety",
      score: safetyScore,
      icon: Target,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      description: "Training appropriateness based on condition",
    },
  ];

  return (
    <div className="bg-void-deep/50 border border-white/10 rounded-2xl p-6 space-y-6">
      {/* Header with Overall Score */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-system-cyan" />
            AI Judge Evaluation
          </h3>
          <p className="text-sm text-white/60">
            Traced to Opik for transparency
          </p>
        </div>
        <div className={cn("px-4 py-2 rounded-xl border-2", gradeBg)}>
          <div className={cn("text-4xl font-bold font-display", gradeColor)}>{grade}</div>
          <div className="text-xs text-white/60 text-center">Grade</div>
        </div>
      </div>

      {/* Overall Score & XP */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-void-surface/50 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-system-cyan" />
            <span className="text-sm text-white/60">Overall Score</span>
          </div>
          <div className="text-2xl font-bold text-white">{(overallScore * 100).toFixed(0)}%</div>
        </div>
        <div className="bg-void-surface/50 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-system-cyan" />
            <span className="text-sm text-white/60">XP Awarded</span>
          </div>
          <div className="text-2xl font-bold text-system-cyan">{xpAwarded}</div>
        </div>
      </div>

      {/* Factor Breakdown */}
      <div className="space-y-4">
        <div className="text-sm font-medium text-white/80">Evaluation Factors</div>
        {factors.map((factor) => (
          <div key={factor.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={cn("p-1.5 rounded-lg", factor.bgColor)}>
                  <factor.icon className={cn("w-4 h-4", factor.color)} />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{factor.name}</div>
                  <div className="text-xs text-white/60">{factor.description}</div>
                </div>
              </div>
              <div className={cn("text-lg font-bold", factor.color)}>
                {(factor.score * 100).toFixed(0)}%
              </div>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className={cn("h-full transition-all duration-500", factor.color.replace("text-", "bg-"))}
                style={{ width: `${factor.score * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Verification Status */}
      {verificationStatus && (
        <div className={cn(
          "px-4 py-3 rounded-xl border",
          verificationStatus === "Auto_Approved" || verificationStatus === "Verified"
            ? "bg-green-500/10 border-green-500/30"
            : "bg-yellow-500/10 border-yellow-500/30"
        )}>
          <div className="flex items-center gap-2">
            <Shield className={cn(
              "w-4 h-4",
              verificationStatus === "Auto_Approved" || verificationStatus === "Verified"
                ? "text-green-400"
                : "text-yellow-400"
            )} />
            <div className="flex-1">
              <div className="text-sm font-medium text-white">{verificationStatus}</div>
              <div className="text-xs text-white/60">
                {verificationStatus === "Auto_Approved"
                  ? "Evaluated by AI Judge"
                  : "Pending manual review"}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Evaluation Time */}
      {evaluationTime && (
        <div className="text-xs text-white/40 text-center">
          Evaluation completed in {evaluationTime}ms • Logged to Opik
        </div>
      )}
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { FileText, Activity, Clock, TrendingUp } from "lucide-react";
import { FlaskConical, GitCommit } from "lucide-react";

interface RecentActivityProps {
  recentTraces?: number;
  activeExperiments?: number;
  latestPromptVersion?: string;
  avgEvaluationScore?: number;
}

export function RecentActivitySummary({
  recentTraces = 0,
  activeExperiments = 0,
  latestPromptVersion = "v1.0",
  avgEvaluationScore = 0.82,
}: RecentActivityProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-gradient-to-br from-purple-500/5 to-blue-500/5 border border-purple-500/20 rounded-xl p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-system-cyan" />
        <h3 className="text-lg font-bold text-white">Recent Activity</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-white/60">
            <FileText className="w-4 h-4" />
            <span className="text-xs">Traces</span>
          </div>
          <div className="text-2xl font-bold text-white">{recentTraces}</div>
          <div className="text-xs text-green-400">+12 today</div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-white/60">
            <FlaskConical className="w-4 h-4" />
            <span className="text-xs">Experiments</span>
          </div>
          <div className="text-2xl font-bold text-white">{activeExperiments}</div>
          <div className="text-xs text-purple-400">{activeExperiments > 0 ? "Running" : "None"}</div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-white/60">
            <GitCommit className="w-4 h-4" />
            <span className="text-xs">Prompt Version</span>
          </div>
          <div className="text-lg font-bold text-white">{latestPromptVersion}</div>
          <div className="text-xs text-blue-400">Latest</div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-white/60">
            <Activity className="w-4 h-4" />
            <span className="text-xs">Avg Score</span>
          </div>
          <div className="text-2xl font-bold text-white">{(avgEvaluationScore * 100).toFixed(0)}%</div>
          <div className="text-xs text-green-400">Good</div>
        </div>
      </div>
    </motion.div>
  );
}
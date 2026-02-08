"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Activity, TrendingUp, AlertCircle, Target, Zap, Shield, Clock, Award } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface AnalyticsDashboardProps {
  profile: any;
  quests: any[];
  logs: any[];
}

export function AnalyticsDashboard({ profile, quests, logs }: AnalyticsDashboardProps) {
  // Calculate metrics
  const totalQuests = quests.length;
  const completedQuests = quests.filter(q => q.status === "Completed").length;
  const completionRate = totalQuests > 0 ? (completedQuests / totalQuests) * 100 : 0;
  
  const totalLogs = logs.length;
  const avgIntegrityScore = logs.length > 0 
    ? logs.reduce((sum, log) => sum + (log.integrity_score || 0), 0) / logs.length 
    : 0;
  const avgEffortScore = logs.length > 0 
    ? logs.reduce((sum, log) => sum + (log.effort_score || 0), 0) / logs.length 
    : 0;
  const avgSafetyScore = logs.length > 0 
    ? logs.reduce((sum, log) => sum + (log.safety_score || 0), 0) / logs.length 
    : 0;
  const avgOverallScore = logs.length > 0 
    ? logs.reduce((sum, log) => sum + ((log.integrity_score || 0) + (log.effort_score || 0) + (log.safety_score || 0)) / 3, 0) / logs.length 
    : 0;

  // Score distribution data
  const scoreDistribution = [
    { name: "S (0.9-1.0)", value: logs.filter(l => {
      const score = ((l.integrity_score || 0) + (l.effort_score || 0) + (l.safety_score || 0)) / 3;
      return score >= 0.9;
    }).length, color: "#00D1B2" },
    { name: "A (0.8-0.89)", value: logs.filter(l => {
      const score = ((l.integrity_score || 0) + (l.effort_score || 0) + (l.safety_score || 0)) / 3;
      return score >= 0.8 && score < 0.9;
    }).length, color: "#48C774" },
    { name: "B (0.7-0.79)", value: logs.filter(l => {
      const score = ((l.integrity_score || 0) + (l.effort_score || 0) + (l.safety_score || 0)) / 3;
      return score >= 0.7 && score < 0.8;
    }).length, color: "#FFDD57" },
    { name: "C (0.6-0.69)", value: logs.filter(l => {
      const score = ((l.integrity_score || 0) + (l.effort_score || 0) + (l.safety_score || 0)) / 3;
      return score >= 0.6 && score < 0.7;
    }).length, color: "#FF3860" },
    { name: "D/E (0-0.59)", value: logs.filter(l => {
      const score = ((l.integrity_score || 0) + (l.effort_score || 0) + (l.safety_score || 0)) / 3;
      return score < 0.6;
    }).length, color: "#6B7280" },
  ].filter(d => d.value > 0);

  // Weekly XP data
  const weeklyXP = logs.slice(0, 7).reverse().map(log => ({
    day: new Date(log.completed_at).toLocaleDateString("en-US", { weekday: "short" }),
    xp: log.xp_awarded || 0,
  }));

  // Factor breakdown
  const factorBreakdown = [
    { name: "Integrity", value: avgIntegrityScore * 100, icon: Shield, color: "text-blue-400" },
    { name: "Effort", value: avgEffortScore * 100, icon: Zap, color: "text-yellow-400" },
    { name: "Safety", value: avgSafetyScore * 100, icon: Target, color: "text-green-400" },
  ];

  // Recent evaluations
  const recentEvaluations = logs.slice(0, 5);

  const [activeTab, setActiveTab] = useState<"overview" | "evaluations" | "trends">("overview");

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab("overview")}
          className={cn(
            "px-4 py-2 rounded-lg font-medium transition-all",
            activeTab === "overview"
              ? "bg-system-cyan/20 text-system-cyan"
              : "text-white/60 hover:text-white hover:bg-white/5"
          )}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("evaluations")}
          className={cn(
            "px-4 py-2 rounded-lg font-medium transition-all",
            activeTab === "evaluations"
              ? "bg-system-cyan/20 text-system-cyan"
              : "text-white/60 hover:text-white hover:bg-white/5"
          )}
        >
          AI Evaluations
        </button>
        <button
          onClick={() => setActiveTab("trends")}
          className={cn(
            "px-4 py-2 rounded-lg font-medium transition-all",
            activeTab === "trends"
              ? "bg-system-cyan/20 text-system-cyan"
              : "text-white/60 hover:text-white hover:bg-white/5"
          )}
        >
          Performance Trends
        </button>
      </div>

      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Total Quests"
              value={totalQuests}
              icon={Activity}
              trend={"+12% this week"}
              positive
            />
            <MetricCard
              title="Completion Rate"
              value={`${completionRate.toFixed(0)}%`}
              icon={TrendingUp}
              trend="+5% vs avg"
              positive
            />
            <MetricCard
              title="Avg Overall Score"
              value={(avgOverallScore * 100).toFixed(0)}
              icon={Award}
              suffix="%"
              trend={avgOverallScore >= 0.8 ? "Excellent" : avgOverallScore >= 0.6 ? "Good" : "Needs Work"}
              positive={avgOverallScore >= 0.6}
            />
            <MetricCard
              title="Total XP Earned"
              value={profile?.total_xp || 0}
              icon={Zap}
              trend="+500 this week"
              positive
            />
          </div>

          {/* Score Distribution & Factor Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-void-surface border border-void-border rounded-2xl p-6">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-system-cyan" />
                  <h3 className="text-xl font-bold text-white">Score Distribution</h3>
                </div>
                <p className="text-white/60 text-sm">
                  AI Judge grade distribution across all completed quests
                </p>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={scoreDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {scoreDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
                      itemStyle={{ color: "#fff" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-5 gap-2 text-center">
                {scoreDistribution.map((d, i) => (
                  <div key={i} className="text-xs">
                    <div className="font-bold" style={{ color: d.color }}>{d.value}</div>
                    <div className="text-white/60">{d.name.split(" ")[0]}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-void-surface border border-void-border rounded-2xl p-6">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-system-cyan" />
                  <h3 className="text-xl font-bold text-white">Factor Breakdown</h3>
                </div>
                <p className="text-white/60 text-sm">
                  Average scores across AI Judge evaluation factors
                </p>
              </div>
              <div className="space-y-6">
                {factorBreakdown.map((factor) => (
                  <div key={factor.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <factor.icon className={cn("w-4 h-4", factor.color)} />
                        <span className="text-white font-medium">{factor.name}</span>
                      </div>
                      <span className="text-white font-bold">{factor.value.toFixed(0)}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={cn("h-full transition-all", factor.color.replace("text-", "bg-"))}
                        style={{ width: `${factor.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "evaluations" && (
        <div className="space-y-6">
          <div className="bg-void-surface border border-void-border rounded-2xl p-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-5 h-5 text-system-cyan" />
                <h3 className="text-xl font-bold text-white">Recent AI Judge Evaluations</h3>
              </div>
              <p className="text-white/60 text-sm">
                Latest quest completions evaluated by the AI Judge
              </p>
            </div>
            <div className="space-y-4">
              {recentEvaluations.length === 0 ? (
                <div className="text-center py-12 text-white/60">
                  No evaluations yet. Complete a quest to see AI analysis!
                </div>
              ) : (
                recentEvaluations.map((log) => {
                  const overallScore = ((log.integrity_score || 0) + (log.effort_score || 0) + (log.safety_score || 0)) / 3;
                  const grade = overallScore >= 0.9 ? "S" : overallScore >= 0.8 ? "A" : overallScore >= 0.7 ? "B" : overallScore >= 0.6 ? "C" : "D";
                  const gradeColor = overallScore >= 0.9 ? "bg-green-500" : overallScore >= 0.8 ? "bg-blue-500" : overallScore >= 0.7 ? "bg-yellow-500" : overallScore >= 0.6 ? "bg-orange-500" : "bg-red-500";

                  return (
                    <div
                      key={log.id}
                      className="bg-void-deep border border-white/10 rounded-lg p-4 hover:border-system-cyan/30 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={cn("px-2 py-1 rounded text-xs font-bold text-white", gradeColor)}>
                              {grade}
                            </span>
                            <span className="text-white font-medium">
                              {log.xp_awarded || 0} XP Earned
                            </span>
                          </div>
                          <div className="text-sm text-white/60">
                            {new Date(log.completed_at).toLocaleDateString()} at {new Date(log.completed_at).toLocaleTimeString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-white">
                            {(overallScore * 100).toFixed(0)}
                          </div>
                          <div className="text-xs text-white/60">Overall Score</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div>
                          <div className="text-xs text-white/60 mb-1">Integrity</div>
                          <div className="text-lg font-bold text-blue-400">
                            {((log.integrity_score || 0) * 100).toFixed(0)}%
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-white/60 mb-1">Effort</div>
                          <div className="text-lg font-bold text-yellow-400">
                            {((log.effort_score || 0) * 100).toFixed(0)}%
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-white/60 mb-1">Safety</div>
                          <div className="text-lg font-bold text-green-400">
                            {((log.safety_score || 0) * 100).toFixed(0)}%
                          </div>
                        </div>
                      </div>
                      {log.verification_status && (
                        <div className="mt-3 pt-3 border-t border-white/10">
                          <div className="flex items-center gap-2 text-sm text-white/60">
                            <Shield className="w-4 h-4" />
                            {log.verification_status}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "trends" && (
        <div className="space-y-6">
          <div className="bg-void-surface border border-void-border rounded-2xl p-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-system-cyan" />
                <h3 className="text-xl font-bold text-white">XP Trends (Last 7 Quests)</h3>
              </div>
              <p className="text-white/60 text-sm">
                XP earned on recent completed quests
              </p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyXP}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="day" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="xp" 
                    stroke="#00D1B2" 
                    strokeWidth={2}
                    dot={{ fill: "#00D1B2", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: any;
  trend?: string;
  positive?: boolean;
  suffix?: string;
}

function MetricCard({ title, value, icon: Icon, trend, positive, suffix }: MetricCardProps) {
  return (
    <div className="bg-void-surface border border-void-border rounded-xl p-6 hover:border-system-cyan/20 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-lg bg-system-cyan/10 border border-system-cyan/20">
          <Icon className="w-5 h-5 text-system-cyan" />
        </div>
        {trend && (
          <span className={cn(
            "px-2 py-1 rounded text-xs font-bold",
            positive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
          )}>
            {trend}
          </span>
        )}
      </div>
      <div className="text-3xl font-display font-bold text-white mb-1">
        {typeof value === "number" ? value.toLocaleString() : value}
        {suffix}
      </div>
      <div className="text-sm text-white/60">{title}</div>
    </div>
  );
}

function BarChart3({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

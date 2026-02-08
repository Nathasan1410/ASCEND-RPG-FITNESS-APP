"use client";

import { useState } from "react";
import { FlaskConical, TrendingUp, Download, Share2, Filter, ChevronDown, ChevronUp, GitBranch, Clock, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface Experiment {
  id: string;
  name: string;
  type: "prompt_ab_test" | "weight_optimization" | "model_comparison";
  status: "running" | "completed" | "failed";
  createdAt: string;
  completedAt?: string;
  winner?: "A" | "B" | "draw" | null;
  variants: {
    id: string;
    name: string;
    success_rate: number;
    avg_score: number;
    avg_time_ms: number;
    sample_size: number;
  }[];
  metrics: {
    total_runs: number;
    statistical_significance: number;
    confidence_interval: string;
    improvement_delta: number;
  };
}

// Mock experiments data
const mockExperiments: Experiment[] = [
  {
    id: "exp_001",
    name: "Judge Prompt v2 vs v3",
    type: "prompt_ab_test",
    status: "completed",
    createdAt: "2026-02-05T10:00:00Z",
    completedAt: "2026-02-06T10:00:00Z",
    winner: "B",
    variants: [
      {
        id: "var_a",
        name: "Judge Prompt v2",
        success_rate: 87.5,
        avg_score: 0.82,
        avg_time_ms: 1420,
        sample_size: 120,
      },
      {
        id: "var_b",
        name: "Judge Prompt v3",
        success_rate: 92.3,
        avg_score: 0.88,
        avg_time_ms: 1380,
        sample_size: 120,
      },
    ],
    metrics: {
      total_runs: 240,
      statistical_significance: 95.4,
      confidence_interval: "±2.3%",
      improvement_delta: 5.4,
    },
  },
  {
    id: "exp_002",
    name: "Architect Prompt v1 vs v2",
    type: "prompt_ab_test",
    status: "running",
    createdAt: "2026-02-07T14:00:00Z",
    winner: null,
    variants: [
      {
        id: "var_a",
        name: "Architect Prompt v1",
        success_rate: 91.2,
        avg_score: 0.85,
        avg_time_ms: 1850,
        sample_size: 85,
      },
      {
        id: "var_b",
        name: "Architect Prompt v2",
        success_rate: 93.1,
        avg_score: 0.87,
        avg_time_ms: 1780,
        sample_size: 85,
      },
    ],
    metrics: {
      total_runs: 170,
      statistical_significance: 78.2,
      confidence_interval: "±3.1%",
      improvement_delta: 2.1,
    },
  },
  {
    id: "exp_003",
    name: "Factor Weight Optimization",
    type: "weight_optimization",
    status: "completed",
    createdAt: "2026-02-04T09:00:00Z",
    completedAt: "2026-02-05T09:00:00Z",
    winner: "B",
    variants: [
      {
        id: "var_a",
        name: "Current Weights",
        success_rate: 88.0,
        avg_score: 0.83,
        avg_time_ms: 1250,
        sample_size: 150,
      },
      {
        id: "var_b",
        name: "Optimized Weights",
        success_rate: 90.5,
        avg_score: 0.86,
        avg_time_ms: 1280,
        sample_size: 150,
      },
    ],
    metrics: {
      total_runs: 300,
      statistical_significance: 97.8,
      confidence_interval: "±1.8%",
      improvement_delta: 3.0,
    },
  },
];

export function ExperimentDashboard() {
  const [experiments, setExperiments] = useState<Experiment[]>(mockExperiments);
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);
  const [filterStatus, setFilterStatus] = useState<"all" | "running" | "completed" | "failed">("all");
  const [filterType, setFilterType] = useState<"all" | "prompt_ab_test" | "weight_optimization" | "model_comparison">("all");
  const [expandedExperiments, setExpandedExperiments] = useState<Set<string>>(new Set());

  const filteredExperiments = experiments.filter(exp => {
    const statusMatch = filterStatus === "all" || exp.status === filterStatus;
    const typeMatch = filterType === "all" || exp.type === filterType;
    return statusMatch && typeMatch;
  });

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedExperiments);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedExperiments(newExpanded);
  };

  const handleExportCSV = (experiment: Experiment) => {
    const csvContent = generateCSV(experiment);
    downloadCSV(csvContent, `${experiment.name.replace(/\s+/g, '_')}_export.csv`);
  };

  const handleExportAllCSV = () => {
    const allCSV = filteredExperiments.map(exp => generateCSV(exp)).join('\n\n');
    const blob = new Blob([allCSV], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'all_experiments_export.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = (experiment: Experiment) => {
    const shareUrl = `${window.location.origin}/dashboard/analytics/experiments/${experiment.id}`;
    if (navigator.share) {
      navigator.share({
        title: experiment.name,
        text: `Check out this experiment: ${experiment.name}`,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Experiment link copied to clipboard!");
    }
  };

  const generateCSV = (experiment: Experiment) => {
    const headers = [
      'Experiment ID',
      'Name',
      'Type',
      'Status',
      'Created At',
      'Completed At',
      'Winner',
      'Total Runs',
      'Statistical Significance',
      'Confidence Interval',
      'Improvement Delta',
      'Variant ID',
      'Variant Name',
      'Success Rate',
      'Average Score',
      'Average Time (ms)',
      'Sample Size',
    ];

    const rows = experiment.variants.map(variant => [
      experiment.id,
      experiment.name,
      experiment.type,
      experiment.status,
      experiment.createdAt,
      experiment.completedAt || '',
      experiment.winner || '',
      experiment.metrics.total_runs,
      `${experiment.metrics.statistical_significance}%`,
      experiment.metrics.confidence_interval,
      `${experiment.metrics.improvement_delta}%`,
      variant.id,
      variant.name,
      `${variant.success_rate}%`,
      variant.avg_score,
      variant.avg_time_ms,
      variant.sample_size,
    ]);

    return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  };

  const downloadCSV = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Experiments</h2>
          <p className="text-white/60 text-sm">A/B testing, prompt optimization, and model comparisons</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExportAllCSV}
            className="flex items-center gap-2 px-4 py-2 bg-void-surface border border-white/10 rounded-lg text-white/70 hover:text-white hover:border-system-cyan/30 transition-all"
          >
            <Download className="w-4 h-4" />
            Export All
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 bg-void-surface/50 border border-white/10 rounded-lg p-1">
        <FilterButton
          active={filterStatus === "all"}
          onClick={() => setFilterStatus("all")}
        >
          All
        </FilterButton>
        <FilterButton
          active={filterStatus === "running"}
          onClick={() => setFilterStatus("running")}
        >
          Running
        </FilterButton>
        <FilterButton
          active={filterStatus === "completed"}
          onClick={() => setFilterStatus("completed")}
        >
          Completed
        </FilterButton>
        <FilterButton
          active={filterStatus === "failed"}
          onClick={() => setFilterStatus("failed")}
        >
          Failed
        </FilterButton>
      </div>

      {/* Experiment List */}
      <div className="space-y-4">
        {filteredExperiments.length === 0 ? (
          <div className="text-center py-12 text-white/60">
            No experiments found. Create your first experiment!
          </div>
        ) : (
          filteredExperiments.map((experiment) => (
            <ExperimentCard
              key={experiment.id}
              experiment={experiment}
              isExpanded={expandedExperiments.has(experiment.id)}
              onToggle={() => toggleExpand(experiment.id)}
              onSelect={() => setSelectedExperiment(experiment)}
              onExport={handleExportCSV}
              onShare={handleShare}
            />
          ))
        )}
      </div>

      {/* Experiment Detail Modal */}
      {selectedExperiment && (
        <ExperimentDetailModal
          experiment={selectedExperiment}
          onClose={() => setSelectedExperiment(null)}
        />
      )}
    </div>
  );
}

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function FilterButton({ active, onClick, children }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-lg text-sm font-medium transition-all",
        active
          ? "bg-system-cyan text-void-deep"
          : "text-white/60 hover:text-white hover:bg-white/5"
      )}
    >
      {children}
    </button>
  );
}

interface ExperimentCardProps {
  experiment: Experiment;
  isExpanded: boolean;
  onToggle: () => void;
  onSelect: () => void;
  onExport: (exp: Experiment) => void;
  onShare: (exp: Experiment) => void;
}

function ExperimentCard({ experiment, isExpanded, onToggle, onSelect, onExport, onShare }: ExperimentCardProps) {
  const typeColors = {
    prompt_ab_test: "bg-blue-500/20 text-blue-400",
    weight_optimization: "bg-purple-500/20 text-purple-400",
    model_comparison: "bg-green-500/20 text-green-400",
  };

  const statusColors = {
    running: "bg-yellow-500/20 text-yellow-400",
    completed: "bg-green-500/20 text-green-400",
    failed: "bg-red-500/20 text-red-400",
  };

  const statusIcons = {
    running: Clock,
    completed: CheckCircle,
    failed: XCircle,
  };

  const StatusIcon = statusIcons[experiment.status];

  return (
    <div className="bg-void-surface border border-white/10 rounded-2xl overflow-hidden">
      {/* Card Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-bold text-white">{experiment.name}</h3>
              <span className={cn("px-2 py-1 rounded text-xs font-bold uppercase", typeColors[experiment.type])}>
                {experiment.type.replace('_', ' ')}
              </span>
              <span className={cn("px-2 py-1 rounded text-xs font-bold uppercase flex items-center gap-1", statusColors[experiment.status])}>
                <StatusIcon className="w-3 h-3" />
                {experiment.status}
              </span>
            </div>
            <div className="text-sm text-white/60">
              Created {new Date(experiment.createdAt).toLocaleDateString()} • {experiment.metrics.total_runs} total runs
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onExport(experiment)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
              title="Export CSV"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => onShare(experiment)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onToggle}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Winner Badge */}
        {experiment.status === "completed" && experiment.winner && (
          <div className={cn(
            "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium",
            experiment.winner === "A" ? "bg-blue-500/20 text-blue-400" : "bg-green-500/20 text-green-400"
          )}>
            <TrendingUp className="w-4 h-4" />
            Variant {experiment.winner} wins by {experiment.metrics.improvement_delta}%
          </div>
        )}
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-6 space-y-6">
          {/* Variants Comparison */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-system-cyan" />
              Variants Comparison
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {experiment.variants.map((variant) => (
                <VariantCard
                  key={variant.id}
                  variant={variant}
                  isWinner={experiment.winner === variant.id.replace('var_', '').toUpperCase()}
                />
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard
              label="Total Runs"
              value={experiment.metrics.total_runs}
              icon={FlaskConical}
            />
            <MetricCard
              label="Statistical Significance"
              value={`${experiment.metrics.statistical_significance}%`}
              icon={TrendingUp}
            />
            <MetricCard
              label="Confidence Interval"
              value={experiment.metrics.confidence_interval}
              icon={Filter}
            />
            <MetricCard
              label="Improvement Delta"
              value={`+${experiment.metrics.improvement_delta}%`}
              icon={TrendingUp}
              positive
            />
          </div>

          {/* View Details Button */}
          <div className="flex justify-center">
            <button
              onClick={onSelect}
              className="flex items-center gap-2 px-6 py-3 bg-system-cyan hover:bg-system-cyan/90 text-void-deep rounded-lg font-bold transition-all"
            >
              View Full Details
              <TrendingUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

interface VariantCardProps {
  variant: Experiment["variants"][0];
  isWinner: boolean;
}

function VariantCard({ variant, isWinner }: VariantCardProps) {
  return (
    <div className={cn(
      "bg-void-deep border rounded-xl p-4 space-y-3",
      isWinner ? "border-green-500/30" : "border-white/10"
    )}>
      <div className="flex items-center justify-between">
        <h5 className="font-bold text-white">{variant.name}</h5>
        {isWinner && (
          <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded">WINNER</span>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Success Rate</span>
          <span className="font-bold text-white">{variant.success_rate}%</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-system-cyan transition-all"
            style={{ width: `${variant.success_rate}%` }}
          />
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Avg Score</span>
          <span className="font-bold text-white">{variant.avg_score}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Avg Time</span>
          <span className="font-bold text-white">{variant.avg_time_ms}ms</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Sample Size</span>
          <span className="font-bold text-white">{variant.sample_size}</span>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: any;
  positive?: boolean;
}

function MetricCard({ label, value, icon: Icon, positive }: MetricCardProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon className={cn("w-4 h-4", positive ? "text-green-400" : "text-system-cyan")} />
        <span className="text-xs text-white/60">{label}</span>
      </div>
      <div className={cn("text-lg font-bold", positive ? "text-green-400" : "text-white")}>
        {value}
      </div>
    </div>
  );
}

interface ExperimentDetailModalProps {
  experiment: Experiment;
  onClose: () => void;
}

function ExperimentDetailModal({ experiment, onClose }: ExperimentDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-void-deep border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-void-deep border-b border-white/10 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">{experiment.name}</h2>
            <p className="text-white/60 text-sm">Detailed experiment results</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          {/* Experiment Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-xs text-white/60 mb-1">Type</div>
              <div className="font-bold text-white capitalize">{experiment.type.replace('_', ' ')}</div>
            </div>
            <div>
              <div className="text-xs text-white/60 mb-1">Status</div>
              <div className="font-bold capitalize text-white">{experiment.status}</div>
            </div>
            <div>
              <div className="text-xs text-white/60 mb-1">Created</div>
              <div className="font-bold text-white">{new Date(experiment.createdAt).toLocaleDateString()}</div>
            </div>
            <div>
              <div className="text-xs text-white/60 mb-1">Completed</div>
              <div className="font-bold text-white">{experiment.completedAt ? new Date(experiment.completedAt).toLocaleDateString() : 'In Progress'}</div>
            </div>
          </div>

          {/* Detailed Metrics */}
          <div className="bg-void-surface border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Detailed Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <MetricCard
                label="Total Runs"
                value={experiment.metrics.total_runs}
                icon={FlaskConical}
              />
              <MetricCard
                label="Statistical Significance"
                value={`${experiment.metrics.statistical_significance}%`}
                icon={TrendingUp}
              />
              <MetricCard
                label="Confidence Interval"
                value={experiment.metrics.confidence_interval}
                icon={Filter}
              />
              <MetricCard
                label="Improvement Delta"
                value={`+${experiment.metrics.improvement_delta}%`}
                icon={TrendingUp}
                positive
              />
            </div>
          </div>

          {/* Variants Detail */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Variants</h3>
            <div className="space-y-4">
              {experiment.variants.map((variant) => (
                <div
                  key={variant.id}
                  className={cn(
                    "bg-void-surface border rounded-xl p-6",
                    experiment.winner === variant.id.replace('var_', '').toUpperCase()
                      ? "border-green-500/30"
                      : "border-white/10"
                  )}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-white">{variant.name}</h4>
                      {experiment.winner === variant.id.replace('var_', '').toUpperCase() && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded mt-2">
                          <CheckCircle className="w-3 h-3" />
                          WINNING VARIANT
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-xs text-white/60 mb-1">Success Rate</div>
                      <div className="text-xl font-bold text-system-cyan">{variant.success_rate}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/60 mb-1">Average Score</div>
                      <div className="text-xl font-bold text-white">{variant.avg_score}</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/60 mb-1">Average Time</div>
                      <div className="text-xl font-bold text-white">{variant.avg_time_ms}ms</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/60 mb-1">Sample Size</div>
                      <div className="text-xl font-bold text-white">{variant.sample_size}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <div className="flex gap-4">
            <button
              onClick={() => {
                const csv = generateCSV(experiment);
                const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', `${experiment.name.replace(/\s+/g, '_')}_detailed.csv`);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-system-cyan hover:bg-system-cyan/90 text-void-deep rounded-lg font-bold transition-all"
            >
              <Download className="w-5 h-5" />
              Export to CSV
            </button>
            <button
              onClick={() => {
                const shareUrl = `${window.location.origin}/dashboard/analytics/experiments/${experiment.id}`;
                navigator.clipboard.writeText(shareUrl);
                alert("Experiment link copied to clipboard!");
              }}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg font-bold transition-all"
            >
              <Share2 className="w-5 h-5" />
              Share with Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function generateCSV(experiment: Experiment) {
  const headers = [
    'Experiment ID',
    'Name',
    'Type',
    'Status',
    'Created At',
    'Completed At',
    'Winner',
    'Total Runs',
    'Statistical Significance',
    'Confidence Interval',
    'Improvement Delta',
    'Variant ID',
    'Variant Name',
    'Success Rate',
    'Average Score',
    'Average Time (ms)',
    'Sample Size',
  ];

  const rows = experiment.variants.map(variant => [
    experiment.id,
    experiment.name,
    experiment.type,
    experiment.status,
    experiment.createdAt,
    experiment.completedAt || '',
    experiment.winner || '',
    experiment.metrics.total_runs,
    `${experiment.metrics.statistical_significance}%`,
    experiment.metrics.confidence_interval,
    `${experiment.metrics.improvement_delta}%`,
    variant.id,
    variant.name,
    `${variant.success_rate}%`,
    variant.avg_score,
    variant.avg_time_ms,
    variant.sample_size,
  ]);

  return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
}

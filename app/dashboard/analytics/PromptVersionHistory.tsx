"use client";

import { useState } from "react";
import { GitCommit, Calendar, Clock, FileText, CheckCircle, XCircle, TrendingUp, Eye, EyeOff, Copy } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface PromptVersion {
  id: string;
  name: string;
  type: "architect" | "judge" | "analysis";
  version: string;
  createdAt: string;
  createdBy: string;
  status: "active" | "deprecated" | "experimental";
  changes: string[];
  performanceMetrics: {
    success_rate: number;
    avg_score: number;
    avg_time_ms: number;
    sample_size: number;
  };
  previousVersion?: string;
  nextVersion?: string;
}

// Mock prompt versions
const mockPromptVersions: PromptVersion[] = [
  {
    id: "prompt_v3",
    name: "Judge Prompt v3",
    type: "judge",
    version: "3.0.0",
    createdAt: "2026-02-06T10:00:00Z",
    createdBy: "System (A/B Test)",
    status: "active",
    changes: [
      "Updated integrity scoring logic to weigh recent performance more heavily",
      "Added new safety check for reported injuries",
      "Improved error messages for clearer user feedback",
      "Optimized prompt length for faster response time",
    ],
    performanceMetrics: {
      success_rate: 92.3,
      avg_score: 0.88,
      avg_time_ms: 1380,
      sample_size: 120,
    },
    previousVersion: "prompt_v2",
  },
  {
    id: "prompt_v2",
    name: "Judge Prompt v2",
    type: "judge",
    version: "2.0.0",
    createdAt: "2026-02-04T10:00:00Z",
    createdBy: "AI Team",
    status: "deprecated",
    changes: [
      "Enhanced effort score calculation based on RPE consistency",
      "Added consistency factor comparing to historical data",
      "Improved safety scoring for novice users",
      "Fixed edge cases in integrity detection",
    ],
    performanceMetrics: {
      success_rate: 87.5,
      avg_score: 0.82,
      avg_time_ms: 1420,
      sample_size: 150,
    },
    previousVersion: "prompt_v1",
    nextVersion: "prompt_v3",
  },
  {
    id: "prompt_v1",
    name: "Judge Prompt v1",
    type: "judge",
    version: "1.0.0",
    createdAt: "2026-02-01T10:00:00Z",
    createdBy: "AI Team",
    status: "deprecated",
    changes: [
      "Initial judge prompt implementation",
      "Basic integrity, effort, and safety scoring",
      "Standard XP multiplier calculation",
    ],
    performanceMetrics: {
      success_rate: 82.0,
      avg_score: 0.78,
      avg_time_ms: 1550,
      sample_size: 100,
    },
    nextVersion: "prompt_v2",
  },
  {
    id: "architect_v2",
    name: "Architect Prompt v2",
    type: "architect",
    version: "2.0.0",
    createdAt: "2026-02-07T14:00:00Z",
    createdBy: "System (A/B Test)",
    status: "active",
    changes: [
      "Improved exercise selection based on equipment",
      "Better difficulty scaling for intermediate ranks",
      "Enhanced completion probability calculation",
      "Added support for custom time windows",
    ],
    performanceMetrics: {
      success_rate: 93.1,
      avg_score: 0.87,
      avg_time_ms: 1780,
      sample_size: 85,
    },
    previousVersion: "architect_v1",
  },
  {
    id: "architect_v1",
    name: "Architect Prompt v1",
    type: "architect",
    version: "1.0.0",
    createdAt: "2026-02-02T10:00:00Z",
    createdBy: "AI Team",
    status: "deprecated",
    changes: [
      "Initial quest generation prompt",
      "Rank-based difficulty scaling",
      "Class-specific exercise selection",
      "Equipment-aware workout generation",
    ],
    performanceMetrics: {
      success_rate: 91.2,
      avg_score: 0.85,
      avg_time_ms: 1850,
      sample_size: 85,
    },
    nextVersion: "architect_v2",
  },
];

export function PromptVersionHistory() {
  const [versions, setVersions] = useState<PromptVersion[]>(mockPromptVersions);
  const [filterType, setFilterType] = useState<"all" | "architect" | "judge" | "analysis">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "deprecated" | "experimental">("all");
  const [selectedVersion, setSelectedVersion] = useState<PromptVersion | null>(null);
  const [showDiff, setShowDiff] = useState(false);
  const [expandedVersions, setExpandedVersions] = useState<Set<string>>(new Set());

  const filteredVersions = versions.filter(v => {
    const typeMatch = filterType === "all" || v.type === filterType;
    const statusMatch = filterStatus === "all" || v.status === filterStatus;
    return typeMatch && statusMatch;
  });

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedVersions);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedVersions(newExpanded);
  };

  const handleCompare = (version: PromptVersion) => {
    if (version.previousVersion) {
      const prevVersion = versions.find(v => v.id === version.previousVersion);
      if (prevVersion) {
        setSelectedVersion(prevVersion);
        setShowDiff(true);
      }
    }
  };

  const handleCompareVersion = (version: PromptVersion) => {
    handleCompare(version);
  };

  const handleCopyPrompt = (version: PromptVersion) => {
    const promptText = generatePromptText(version);
    navigator.clipboard.writeText(promptText);
    alert("Prompt copied to clipboard!");
  };

  const generatePromptText = (version: PromptVersion) => {
    return `[${version.type.toUpperCase()} PROMPT v${version.version}]
Created: ${new Date(version.createdAt).toLocaleDateString()}
Status: ${version.status}

Changes:
${version.changes.map((c, i) => `${i + 1}. ${c}`).join('\n')}

Performance Metrics:
- Success Rate: ${version.performanceMetrics.success_rate}%
- Average Score: ${version.performanceMetrics.avg_score}
- Average Time: ${version.performanceMetrics.avg_time_ms}ms
- Sample Size: ${version.performanceMetrics.sample_size}
`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Prompt Version History</h2>
          <p className="text-white/60 text-sm">Track changes and improvements to AI prompts</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              const allCSV = filteredVersions.map(v => generateCSV(v)).join('\n\n');
              downloadCSV(allCSV, 'prompt_history_export.csv');
            }}
            className="flex items-center gap-2 px-4 py-2 bg-void-surface border border-white/10 rounded-lg text-white/70 hover:text-white hover:border-system-cyan/30 transition-all"
          >
            <Copy className="w-4 h-4" />
            Export All
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="flex-1 flex gap-2 bg-void-surface/50 border border-white/10 rounded-lg p-1">
          <FilterButton
            active={filterType === "all"}
            onClick={() => setFilterType("all")}
          >
            All Types
          </FilterButton>
          <FilterButton
            active={filterType === "judge"}
            onClick={() => setFilterType("judge")}
          >
            Judge
          </FilterButton>
          <FilterButton
            active={filterType === "architect"}
            onClick={() => setFilterType("architect")}
          >
            Architect
          </FilterButton>
          <FilterButton
            active={filterType === "analysis"}
            onClick={() => setFilterType("analysis")}
          >
            Analysis
          </FilterButton>
        </div>
        <div className="flex gap-2 bg-void-surface/50 border border-white/10 rounded-lg p-1">
          <FilterButton
            active={filterStatus === "all"}
            onClick={() => setFilterStatus("all")}
          >
            All Status
          </FilterButton>
          <FilterButton
            active={filterStatus === "active"}
            onClick={() => setFilterStatus("active")}
          >
            Active
          </FilterButton>
          <FilterButton
            active={filterStatus === "deprecated"}
            onClick={() => setFilterStatus("deprecated")}
          >
            Deprecated
          </FilterButton>
        </div>
      </div>

      {/* Version List */}
      <div className="space-y-4">
        {filteredVersions.length === 0 ? (
          <div className="text-center py-12 text-white/60">
            No prompt versions found.
          </div>
        ) : (
          filteredVersions.map((version) => (
            <VersionCard
              key={version.id}
              version={version}
              isExpanded={expandedVersions.has(version.id)}
              onToggle={() => toggleExpand(version.id)}
              onSelect={() => setSelectedVersion(version)}
              onCompare={() => handleCompareVersion(version)}
              onCopy={() => handleCopyPrompt(version)}
            />
          ))
        )}
      </div>

      {/* Version Detail Modal */}
      {selectedVersion && (
        <VersionDetailModal
          version={selectedVersion}
          onClose={() => setSelectedVersion(null)}
          onCompare={selectedVersion.previousVersion ? () => handleCompare(selectedVersion) : undefined}
        />
      )}

      {/* Diff Modal */}
      {showDiff && selectedVersion && (
        <DiffModal
          version={selectedVersion}
          onClose={() => setShowDiff(false)}
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
        "px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1",
        active
          ? "bg-system-cyan text-void-deep"
          : "text-white/60 hover:text-white hover:bg-white/5"
      )}
    >
      {children}
    </button>
  );
}

interface VersionCardProps {
  version: PromptVersion;
  isExpanded: boolean;
  onToggle: () => void;
  onSelect: () => void;
  onCompare: () => void;
  onCopy: () => void;
}

function VersionCard({ version, isExpanded, onToggle, onSelect, onCompare, onCopy }: VersionCardProps) {
  const typeColors = {
    architect: "bg-purple-500/20 text-purple-400",
    judge: "bg-blue-500/20 text-blue-400",
    analysis: "bg-green-500/20 text-green-400",
  };

  const statusColors = {
    active: "bg-green-500/20 text-green-400",
    deprecated: "bg-gray-500/20 text-gray-400",
    experimental: "bg-yellow-500/20 text-yellow-400",
  };

  return (
    <div className="bg-void-surface border border-white/10 rounded-2xl overflow-hidden">
      {/* Card Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-bold text-white">{version.name}</h3>
              <span className={cn("px-2 py-1 rounded text-xs font-bold uppercase", typeColors[version.type])}>
                {version.type}
              </span>
              <span className={cn("px-2 py-1 rounded text-xs font-bold uppercase", statusColors[version.status])}>
                {version.status}
              </span>
            </div>
            <div className="text-sm text-white/60">
              {version.version} • Created by {version.createdBy}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onCopy}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
              title="Copy Prompt"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={onToggle}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
              title="Expand Details"
            >
              {isExpanded ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-4 gap-4">
          <MetricCard
            label="Success Rate"
            value={`${version.performanceMetrics.success_rate}%`}
            icon={CheckCircle}
          />
          <MetricCard
            label="Avg Score"
            value={version.performanceMetrics.avg_score}
            icon={TrendingUp}
          />
          <MetricCard
            label="Avg Time"
            value={`${version.performanceMetrics.avg_time_ms}ms`}
            icon={Clock}
          />
          <MetricCard
            label="Sample Size"
            value={version.performanceMetrics.sample_size}
            icon={FileText}
          />
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-6 space-y-6">
          {/* Changes */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-system-cyan" />
              Changes
            </h4>
            <ul className="space-y-2">
              {version.changes.map((change, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                  <span className="text-system-cyan font-bold">{i + 1}.</span>
                  <span>{change}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Version Navigation */}
          <div className="flex gap-3">
            {version.previousVersion && (
              <button
                onClick={onCompare}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 rounded-lg text-blue-400 font-medium transition-all"
              >
                <TrendingUp className="w-4 h-4" />
                Compare to Previous
              </button>
            )}
            {version.nextVersion && (
              <button
                onClick={() => {/* Navigate to next version */}}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 rounded-lg text-purple-400 font-medium transition-all"
              >
                <Calendar className="w-4 h-4" />
                View Next Version
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: any;
}

function MetricCard({ label, value, icon: Icon }: MetricCardProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-3">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-3 h-3 text-system-cyan" />
        <span className="text-xs text-white/60">{label}</span>
      </div>
      <div className="text-base font-bold text-white">{value}</div>
    </div>
  );
}

interface VersionDetailModalProps {
  version: PromptVersion;
  onClose: () => void;
  onCompare?: () => void;
}

function VersionDetailModal({ version, onClose, onCompare }: VersionDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-void-deep border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-void-deep border-b border-white/10 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">{version.name}</h2>
            <p className="text-white/60 text-sm">Version {version.version}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          {/* Version Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-xs text-white/60 mb-1">Type</div>
              <div className="font-bold text-white capitalize">{version.type}</div>
            </div>
            <div>
              <div className="text-xs text-white/60 mb-1">Status</div>
              <div className="font-bold capitalize text-white">{version.status}</div>
            </div>
            <div>
              <div className="text-xs text-white/60 mb-1">Created</div>
              <div className="font-bold text-white">{new Date(version.createdAt).toLocaleDateString()}</div>
            </div>
            <div>
              <div className="text-xs text-white/60 mb-1">Created By</div>
              <div className="font-bold text-white">{version.createdBy}</div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-void-surface border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Performance Metrics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <MetricCard
                label="Success Rate"
                value={`${version.performanceMetrics.success_rate}%`}
                icon={CheckCircle}
              />
              <MetricCard
                label="Avg Score"
                value={version.performanceMetrics.avg_score}
                icon={TrendingUp}
              />
              <MetricCard
                label="Avg Time"
                value={`${version.performanceMetrics.avg_time_ms}ms`}
                icon={Clock}
              />
              <MetricCard
                label="Sample Size"
                value={version.performanceMetrics.sample_size}
                icon={FileText}
              />
            </div>
          </div>

          {/* Changes */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Changes</h3>
            <ul className="space-y-3">
              {version.changes.map((change, i) => (
                <li key={i} className="flex items-start gap-3 bg-void-surface/50 border border-white/10 rounded-lg p-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-system-cyan/20 flex items-center justify-center">
                    <GitCommit className="w-4 h-4 text-system-cyan" />
                  </div>
                  <span className="text-white/80">{change}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {onCompare && (
              <button
                onClick={onCompare}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-500/90 text-white rounded-lg font-bold transition-all"
              >
                <TrendingUp className="w-5 h-5" />
                Compare to Previous
              </button>
            )}
            <button
              onClick={() => {
                const prompt = generatePromptText(version);
                navigator.clipboard.writeText(prompt);
                alert("Prompt copied!");
              }}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg font-bold transition-all"
            >
              <Copy className="w-5 h-5" />
              Copy Prompt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DiffModal({ version, onClose }: { version: PromptVersion; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-void-deep border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-void-deep border-b border-white/10 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Prompt Comparison</h2>
            <p className="text-white/60 text-sm">Compare versions</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <div className="text-center text-white/60 py-12">
            Comparison view coming soon! For now, use the detail views to compare versions.
          </div>
        </div>
      </div>
    </div>
  );
}

function generatePromptText(version: PromptVersion) {
  return `[${version.type.toUpperCase()} PROMPT v${version.version}]
Created: ${new Date(version.createdAt).toLocaleDateString()}
Status: ${version.status}

Changes:
${version.changes.map((c, i) => `${i + 1}. ${c}`).join('\n')}

Performance Metrics:
- Success Rate: ${version.performanceMetrics.success_rate}%
- Average Score: ${version.performanceMetrics.avg_score}
- Average Time: ${version.performanceMetrics.avg_time_ms}ms
- Sample Size: ${version.performanceMetrics.sample_size}
`;
}

function generateCSV(version: PromptVersion) {
  const headers = [
    'ID',
    'Name',
    'Type',
    'Version',
    'Status',
    'Created At',
    'Created By',
    'Success Rate',
    'Average Score',
    'Average Time (ms)',
    'Sample Size',
    'Changes',
  ];

  const rows = [
    version.id,
    version.name,
    version.type,
    version.version,
    version.status,
    version.createdAt,
    version.createdBy,
    `${version.performanceMetrics.success_rate}%`,
    version.performanceMetrics.avg_score,
    version.performanceMetrics.avg_time_ms,
    version.performanceMetrics.sample_size,
    version.changes.join('; '),
  ];

  return [headers.join(','), rows.join(',')].join('\n');
}

function downloadCSV(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

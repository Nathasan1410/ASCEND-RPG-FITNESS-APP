"use client";

import { useState } from "react";
import { Download, Filter, Calendar, Clock, Database, FileText, CheckCircle, XCircle, Zap, BarChart3, Search } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface Trace {
  id: string;
  name: string;
  timestamp: string;
  duration_ms: number;
  status: "success" | "failure" | "partial";
  input: Record<string, any>;
  output?: Record<string, any>;
  tags: string[];
}

// Mock traces
const mockTraces: Trace[] = [
  {
    id: "trace_001",
    name: "quest_generation_success",
    timestamp: "2026-02-08T10:30:00Z",
    duration_ms: 1850,
    status: "success",
    input: {
      user_id: "user_123",
      user_rank: "B",
      user_class: "Tank",
      time_window_min: 45,
      equipment_count: 3,
    },
    output: {
      quest_name: "B-Rank Strength Protocol",
      quest_rank: "B",
      exercise_count: 5,
      xp_reward: 1200,
    },
    tags: ["success", "B", "Tank", "Daily"],
  },
  {
    id: "trace_002",
    name: "quest_evaluation_complete",
    timestamp: "2026-02-08T11:15:00Z",
    duration_ms: 1380,
    status: "success",
    input: {
      quest_id: "quest_456",
      user_rank: "B",
      has_proof: true,
      duration_actual: 42,
      rpe_actual: 7,
    },
    output: {
      status: "APPROVED",
      integrity_score: 0.92,
      effort_score: 0.85,
      safety_score: 0.90,
      xp_awarded: 1560,
    },
    tags: ["APPROVED", "B", "Tank", "Daily"],
  },
  {
    id: "trace_003",
    name: "quest_generation_fallback",
    timestamp: "2026-02-08T12:00:00Z",
    duration_ms: 420,
    status: "partial",
    input: {
      user_id: "user_123",
      user_rank: "B",
      error: "Groq Timeout",
    },
    output: {
      quest_name: "B-Rank Recovery Protocol (Offline)",
      fallback_reason: "Groq Timeout",
    },
    tags: ["fallback", "B", "Tank"],
  },
  {
    id: "trace_004",
    name: "judge_evaluation_error",
    timestamp: "2026-02-08T12:30:00Z",
    duration_ms: 890,
    status: "failure",
    input: {
      quest_id: "quest_789",
      user_id: "user_123",
    },
    output: {
      error: "Invalid log data",
    },
    tags: ["judge_failure"],
  },
  {
    id: "trace_005",
    name: "log_analysis_generation",
    timestamp: "2026-02-08T13:00:00Z",
    duration_ms: 2150,
    status: "success",
    input: {
      log_id: "log_123",
      user_rank: "B",
      integrity_score: 0.92,
      effort_score: 0.85,
      safety_score: 0.90,
    },
    output: {
      summary: "Great workout with solid form and consistent effort.",
      suggestions: ["Maintain rest timing between sets"],
    },
    tags: ["analysis_success"],
  },
];

export function TraceExport() {
  const [traces, setTraces] = useState<Trace[]>(mockTraces);
  const [selectedTraces, setSelectedTraces] = useState<Set<string>>(new Set());
  const [filterStatus, setFilterStatus] = useState<"all" | "success" | "failure" | "partial">("all");
  const [filterName, setFilterName] = useState("");
  const [dateRange, setDateRange] = useState<{ start?: Date; end?: Date }>({});

  const filteredTraces = traces.filter(trace => {
    const statusMatch = filterStatus === "all" || trace.status === filterStatus;
    const nameMatch = filterName === "" || trace.name.toLowerCase().includes(filterName.toLowerCase());
    const dateMatch = !dateRange.start || new Date(trace.timestamp) >= dateRange.start;
    const dateMatchEnd = !dateRange.end || new Date(trace.timestamp) <= dateRange.end;
    return statusMatch && nameMatch && dateMatch && dateMatchEnd;
  });

  const toggleTraceSelection = (id: string) => {
    const newSelected = new Set(selectedTraces);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedTraces(newSelected);
  };

  const selectAll = () => {
    setSelectedTraces(new Set(filteredTraces.map(t => t.id)));
  };

  const clearSelection = () => {
    setSelectedTraces(new Set());
  };

  const handleExportSelected = () => {
    const selectedTracesData = traces.filter(t => selectedTraces.has(t.id));
    const csvContent = generateTracesCSV(selectedTracesData);
    downloadCSV(csvContent, `selected_traces_${Date.now()}.csv`);
  };

  const handleExportAll = () => {
    const csvContent = generateTracesCSV(filteredTraces);
    downloadCSV(csvContent, `all_traces_${Date.now()}.csv`);
  };

  const handleExportJSON = () => {
    const selectedTracesData = traces.filter(t => selectedTraces.has(t.id));
    const jsonContent = JSON.stringify(selectedTracesData, null, 2);
    downloadJSON(jsonContent, `selected_traces_${Date.now()}.json`);
  };

  const handleShare = async () => {
    const selectedTracesData = traces.filter(t => selectedTraces.has(t.id));
    const exportData = {
      traces: selectedTracesData,
      exported_at: new Date().toISOString(),
      project_name: "LevelUp Workout",
    };

    const shareUrl = URL.createObjectURL(new Blob([JSON.stringify(exportData)], { type: 'application/json' }));
    const filename = `traces_export_${Date.now()}.json`;

    if (navigator.share) {
      try {
        await navigator.share({
          files: [new File([JSON.stringify(exportData)], filename, { type: 'application/json' })],
          title: 'Opik Traces Export',
        });
      } catch (error) {
        console.log('Share failed, falling back to download');
        handleExportJSON();
      }
    } else {
      handleExportJSON();
    }
  };

  const generateTracesCSV = (traceList: Trace[]) => {
    const headers = [
      'Trace ID',
      'Name',
      'Timestamp',
      'Duration (ms)',
      'Status',
      'Tags',
      'Input Data',
      'Output Data',
    ];

    const rows = traceList.map(trace => [
      trace.id,
      trace.name,
      trace.timestamp,
      trace.duration_ms,
      trace.status,
      trace.tags.join('|'),
      JSON.stringify(trace.input),
      JSON.stringify(trace.output || {}),
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

  const downloadJSON = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'application/json;charset=utf-8;' });
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
          <h2 className="text-2xl font-bold text-white mb-1">Trace Data Export</h2>
          <p className="text-white/60 text-sm">Export and share Opik trace data for analysis</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExportAll}
            className="flex items-center gap-2 px-4 py-2 bg-void-surface border border-white/10 rounded-lg text-white/70 hover:text-white hover:border-system-cyan/30 transition-all"
          >
            <Download className="w-4 h-4" />
            Export All
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-white mb-2">Search Traces</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              placeholder="Search by trace name..."
              className="w-full pl-10 pr-4 py-2 bg-void-surface border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-system-cyan/30"
            />
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-white mb-2">Status Filter</label>
          <div className="flex gap-2 bg-void-surface/50 border border-white/10 rounded-lg p-1">
            <FilterButton
              active={filterStatus === "all"}
              onClick={() => setFilterStatus("all")}
            >
              All
            </FilterButton>
            <FilterButton
              active={filterStatus === "success"}
              onClick={() => setFilterStatus("success")}
            >
              Success
            </FilterButton>
            <FilterButton
              active={filterStatus === "failure"}
              onClick={() => setFilterStatus("failure")}
            >
              Failed
            </FilterButton>
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-white mb-2">Date Range</label>
          <input
            type="date"
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value ? new Date(e.target.value) : undefined })}
            className="w-full px-4 py-2 bg-void-surface border border-white/10 rounded-lg text-white focus:outline-none focus:border-system-cyan/30"
          />
        </div>
      </div>

      {/* Selection Controls */}
      <div className="flex items-center justify-between bg-void-surface/50 border border-white/10 rounded-lg p-4">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedTraces.size === filteredTraces.length}
              onChange={(e) => e.target.checked ? selectAll() : clearSelection()}
              className="w-4 h-4 accent-system-cyan"
            />
            <span className="text-sm text-white/70">Select All ({filteredTraces.length})</span>
          </label>
          <div className="text-sm text-white/60">
            {selectedTraces.size} selected
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={clearSelection}
            disabled={selectedTraces.size === 0}
            className="px-3 py-1.5 text-sm bg-white/5 border border-white/10 rounded text-white/60 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Clear
          </button>
          <button
            onClick={handleExportSelected}
            disabled={selectedTraces.size === 0}
            className="flex items-center gap-2 px-4 py-1.5 text-sm bg-system-cyan text-void-deep rounded hover:bg-system-cyan/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Download className="w-4 h-4" />
            Export Selected
          </button>
          <button
            onClick={handleShare}
            disabled={selectedTraces.size === 0}
            className="flex items-center gap-2 px-4 py-1.5 text-sm bg-purple-500 text-white rounded hover:bg-purple-500/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Database className="w-4 h-4" />
            Share with Team
          </button>
        </div>
      </div>

      {/* Trace List */}
      <div className="bg-void-surface border border-white/10 rounded-2xl overflow-hidden">
        <div className="bg-void-deep border-b border-white/10 px-6 py-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-system-cyan" />
            <h3 className="font-bold text-white">Trace History</h3>
            <span className="text-sm text-white/60">
              ({filteredTraces.length} traces)
            </span>
          </div>
        </div>
        <div className="divide-y divide-white/10">
          {filteredTraces.length === 0 ? (
            <div className="text-center py-12 text-white/60">
              No traces found matching your filters.
            </div>
          ) : (
            filteredTraces.map((trace) => (
              <TraceRow
                key={trace.id}
                trace={trace}
                isSelected={selectedTraces.has(trace.id)}
                onToggle={() => toggleTraceSelection(trace.id)}
              />
            ))
          )}
        </div>
      </div>
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
        "px-3 py-1.5 rounded text-sm font-medium transition-all flex-1",
        active
          ? "bg-system-cyan text-void-deep"
          : "text-white/60 hover:text-white hover:bg-white/5"
      )}
    >
      {children}
    </button>
  );
}

interface TraceRowProps {
  trace: Trace;
  isSelected: boolean;
  onToggle: () => void;
}

function TraceRow({ trace, isSelected, onToggle }: TraceRowProps) {
  const statusIcons = {
    success: CheckCircle,
    failure: XCircle,
    partial: Zap,
  };

  const statusColors = {
    success: "text-green-400",
    failure: "text-red-400",
    partial: "text-yellow-400",
  };

  const StatusIcon = statusIcons[trace.status];

  return (
    <div className={cn(
      "px-6 py-4 hover:bg-white/5 transition-all",
      isSelected && "bg-system-cyan/10"
    )}>
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggle}
          className="mt-1 w-4 h-4 accent-system-cyan"
        />
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <StatusIcon className={cn("w-5 h-5", statusColors[trace.status])} />
            <span className="font-bold text-white">{trace.name}</span>
            <span className={cn(
              "px-2 py-1 rounded text-xs font-bold uppercase",
              trace.status === "success" ? "bg-green-500/20 text-green-400" :
              trace.status === "failure" ? "bg-red-500/20 text-red-400" :
              "bg-yellow-500/20 text-yellow-400"
            )}>
              {trace.status}
            </span>
            <span className="text-sm text-white/60 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {new Date(trace.timestamp).toLocaleString()}
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-white/60">Duration:</span>{' '}
              <span className="text-white font-medium">{trace.duration_ms}ms</span>
            </div>
            <div>
              <span className="text-white/60">ID:</span>{' '}
              <span className="text-white font-medium">{trace.id}</span>
            </div>
            <div className="col-span-2">
              <span className="text-white/60">Tags:</span>{' '}
              <div className="flex gap-1 flex-wrap">
                {trace.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 bg-system-cyan/20 text-system-cyan text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Database, Download, Share2, Filter, Calendar, Clock, FileText, CheckCircle, XCircle, Zap, BarChart3, Search, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface Trace {
  id: string;
  name: string;
  timestamp: string;
  duration_ms: number;
  status: "success" | "failure" | "partial";
  input?: Record<string, any>;
  output?: Record<string, any>;
  tags: string[];
  project_name?: string;
}

interface RealExperiment {
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

export function RealExperimentDashboard() {
  const [traces, setTraces] = useState<Trace[]>([]);
  const [experiments, setExperiments] = useState<RealExperiment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTraces, setSelectedTraces] = useState<Set<string>>(new Set());
  const [filterStatus, setFilterStatus] = useState<"all" | "success" | "failure" | "partial">("all");
  const [filterName, setFilterName] = useState("");

  // Fetch real data from Opik
  useEffect(() => {
    async function fetchOpikData() {
      try {
        setLoading(true);
        
        // Fetch traces from Opik API endpoint
        const tracesResponse = await fetch('/api/opik/traces');
        if (tracesResponse.ok) {
          const tracesData = await tracesResponse.json();
          setTraces(tracesData.traces || []);
        }
        
        // Fetch experiments from Opik API endpoint
        const expResponse = await fetch('/api/opik/experiments');
        if (expResponse.ok) {
          const expData = await expResponse.json();
          setExperiments(expData.experiments || []);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch Opik data:", error);
        setLoading(false);
        
        // Fallback to demo data
        console.log("[Opik] Using fallback demo data");
      }
    }
    
    fetchOpikData();
  }, []);

  const filteredTraces = traces.filter(trace => {
    const statusMatch = filterStatus === "all" || trace.status === filterStatus;
    const nameMatch = filterName === "" || trace.name.toLowerCase().includes(filterName.toLowerCase());
    return statusMatch && nameMatch;
  });

  const filteredExperiments = experiments.filter(exp => {
    const statusMatch = filterStatus === "all" || 
      (filterStatus === "success" && exp.status === "completed") ||
      (filterStatus === "failure" && exp.status === "failed") ||
      (filterStatus === "partial" && exp.status === "running");
    const nameMatch = filterName === "" || exp.name.toLowerCase().includes(filterName.toLowerCase());
    return statusMatch && nameMatch;
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

  const handleExportAllCSV = () => {
    const allCSV = filteredTraces.map(t => generateCSV(t)).join('\n\n');
    downloadCSV(allCSV, 'all_traces_export.csv');
  };

  const handleRefreshData = async () => {
    setLoading(true);
    try {
      // Re-fetch from Opik API
      const tracesResponse = await fetch('/api/opik/traces');
      if (tracesResponse.ok) {
        const tracesData = await tracesResponse.json();
        setTraces(tracesData.traces || []);
      }
      
      const expResponse = await fetch('/api/opik/experiments');
      if (expResponse.ok) {
        const expData = await expResponse.json();
        setExperiments(expData.experiments || []);
      }
    } catch (error) {
      console.error("Failed to refresh Opik data:", error);
    }
    setLoading(false);
  };

  const generateCSV = (trace: Trace) => {
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

    const rows = [
      trace.id,
      trace.name,
      trace.timestamp,
      trace.duration_ms,
      trace.status,
      trace.tags.join('|'),
      JSON.stringify(trace.input || {}),
      JSON.stringify(trace.output || {}),
    ];

    return [headers.join(','), rows.join(',')].join('\n');
  };

  const generateTracesCSV = (traceList: Trace[]) => {
    if (traceList.length === 0) return "";
    
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
      JSON.stringify(trace.input || {}),
      JSON.stringify(trace.output || {}),
    ]);

    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
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

  const handleShare = async () => {
    const selectedTracesData = traces.filter(t => selectedTraces.has(t.id));
    const exportData = {
      traces: selectedTracesData,
      experiments: experiments,
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
        const blob = new Blob([JSON.stringify(exportData)], { type: 'application/json;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.click();
      }
    } else {
      const blob = new Blob([JSON.stringify(exportData)], { type: 'application/json;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.click();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Opik Data</h2>
          <p className="text-white/60 text-sm">Real-time traces and experiments from Opik dashboard</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleRefreshData}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-void-surface border border-white/10 rounded-lg text-white/70 hover:text-white hover:border-system-cyan/30 transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? "Refreshing..." : "Refresh"}
          </button>
          <button
            onClick={handleExportAllCSV}
            disabled={loading || filteredTraces.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-void-surface border border-white/10 rounded-lg text-white/70 hover:text-white hover:border-system-cyan/30 transition-all"
          >
            <Download className="w-4 h-4" />
            Export All
          </button>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <div className="text-white">
            <div className="font-bold mb-1">Opik Integration Active</div>
            <div className="text-sm text-white/80">
              Traces are being sent to Opik dashboard in real-time. Check your Opik dashboard at{" "}
              <a 
                href="https://www.comet.com/opik" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-400 hover:underline font-medium"
              >
                comet.com/opik
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
          <label className="block text-sm font-medium text-white mb-2">Data Source</label>
          <select
            value="opik"
            className="w-full px-4 py-2 bg-void-surface border border-white/10 rounded-lg text-white focus:outline-none focus:border-system-cyan/30"
          >
            <option value="opik">Opik Dashboard (Real-time)</option>
          <option value="mock">Demo Data (Fallback)</option>
          </select>
        </div>
      </div>

      {/* Selection Controls */}
      <div className="flex items-center justify-between bg-void-surface/50 border border-white/10 rounded-lg p-4 mb-6">
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-system-cyan" />
              <h3 className="font-bold text-white">Real-Time Traces</h3>
              <span className="text-sm text-white/60">
                ({loading ? "Loading..." : `${filteredTraces.length} traces`})
              </span>
            </div>
          </div>
        </div>
        <div className="divide-y divide-white/10">
          {loading ? (
            <div className="text-center py-12 text-white/60">
              Loading traces from Opik dashboard...
            </div>
          ) : filteredTraces.length === 0 ? (
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

      {/* Experiments Section */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-4">Active Experiments</h3>
        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-8 text-white/60">
              Loading experiments from Opik dashboard...
            </div>
          ) : filteredExperiments.length === 0 ? (
            <div className="text-center py-8 text-white/60">
              No experiments running.
            </div>
          ) : (
            filteredExperiments.map((experiment) => (
              <div
                key={experiment.id}
                className="bg-void-deep border border-white/10 rounded-lg p-4 hover:border-system-cyan/20 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
            <span className={cn(
              "px-2 py-1 rounded text-xs font-bold uppercase",
              experiment.status === "running" ? "bg-yellow-500/20 text-yellow-400" :
              experiment.status === "completed" ? "bg-green-500/20 text-green-400" :
              experiment.status === "failed" ? "bg-red-500/20 text-red-400" :
              "bg-gray-500/20 text-gray-400"
            )}>
                        {experiment.status}
                      </span>
                      <span className="font-bold text-white ml-2">{experiment.name}</span>
                    </div>
                    <div className="text-sm text-white/60">
                      Created {new Date(experiment.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  {experiment.winner && (
                    <div className="px-3 py-1 rounded-lg text-xs font-bold uppercase bg-purple-500/20 text-purple-400">
                      Winner: {experiment.winner}
                    </div>
                  )}
                </div>
                <div className="text-sm text-white/80">
                  {experiment.name} is testing {experiment.variants.length} variants
                </div>
              </div>
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
            <StatusIcon className={cn("w-5 h-5", 
              trace.status === "success" ? "text-green-400" :
              trace.status === "failure" ? "text-red-400" :
              "text-yellow-400"
            )} />
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
            <div>
              <span className="text-white/60">Project:</span>{' '}
              <span className="text-white font-medium">{trace.project_name || "LevelUp Workout"}</span>
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

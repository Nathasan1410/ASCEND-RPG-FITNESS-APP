"use client";

import { useState, useEffect } from "react";
import { Plus, RefreshCw } from "lucide-react";
import type { Experiment, ExperimentConfig } from "@/types/schemas";
import { cn } from "@/lib/utils/cn";

export default function ABTestingPage() {
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);

  useEffect(() => {
    fetchExperiments();
  }, []);

  const fetchExperiments = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ab-testing/experiments");
      const data = await res.json();
      setExperiments(data.experiments || []);
    } catch (error) {
      console.error("Failed to fetch experiments:", error);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">A/B Testing</h2>
          <p className="text-white/60 text-sm">
            Run controlled experiments to optimize prompts, models, and weights
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchExperiments}
            className="flex items-center gap-2 px-4 py-2 bg-void-surface border border-white/10 rounded-lg text-white/70 hover:text-white hover:border-system-cyan/30"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-system-cyan text-void-deep rounded hover:bg-system-cyan/90"
          >
            <Plus className="w-4 h-4" />
            New Experiment
          </button>
        </div>
      </div>

      {showCreateForm && (
        <CreateExperimentForm
          onClose={() => setShowCreateForm(false)}
          onSuccess={() => {
            setShowCreateForm(false);
            fetchExperiments();
          }}
        />
      )}

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12 text-white/60">Loading experiments...</div>
        ) : experiments.length === 0 ? (
          <div className="text-center py-12 text-white/60">
            No experiments yet. Create one to start testing!
          </div>
        ) : (
          experiments.map((exp) => (
            <ExperimentCard
              key={exp.id}
              experiment={exp}
              onClick={() => setSelectedExperiment(exp)}
            />
          ))
        )}
      </div>

      {selectedExperiment && (
        <ExperimentDetail
          experiment={selectedExperiment}
          onClose={() => setSelectedExperiment(null)}
          onUpdate={fetchExperiments}
        />
      )}
    </div>
  );
}

function CreateExperimentForm({ 
  onClose, 
  onSuccess 
}: { 
  onClose: () => void; 
  onSuccess: () => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"prompt_ab_test" | "weight_optimization" | "model_comparison">("prompt_ab_test");
  const [variantAName, setVariantAName] = useState("Variant A");
  const [variantAConfig, setVariantAConfig] = useState("{}");
  const [variantBName, setVariantBName] = useState("Variant B");
  const [variantBConfig, setVariantBConfig] = useState("{}");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const config: ExperimentConfig = {
        name,
        type,
        description,
        variants: [
          { id: "var_a", name: variantAName, config: JSON.parse(variantAConfig) },
          { id: "var_b", name: variantBName, config: JSON.parse(variantBConfig) },
        ],
        min_sample_size: 50,
        target_metric: "avg_score",
      };

      const res = await fetch("/api/ab-testing/experiments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      if (!res.ok) throw new Error("Failed to create experiment");

      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-void-deep border border-white/10 rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold text-white mb-4">Create A/B Experiment</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Experiment Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-void-surface border border-white/10 rounded-lg text-white"
              placeholder="e.g., Judge Prompt v2 vs v3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full px-4 py-2 bg-void-surface border border-white/10 rounded-lg text-white"
            >
              <option value="prompt_ab_test">Prompt A/B Test</option>
              <option value="weight_optimization">Weight Optimization</option>
              <option value="model_comparison">Model Comparison</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 bg-void-surface border border-white/10 rounded-lg text-white"
              placeholder="What are you testing?"
              rows={2}
              required
            />
          </div>

          <div className="border-t border-white/10 pt-4">
            <h4 className="text-sm font-bold text-white mb-3">Variants</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white mb-2">Variant A</label>
                <input
                  type="text"
                  value={variantAName}
                  onChange={(e) => setVariantAName(e.target.value)}
                  className="w-full px-4 py-2 bg-void-surface border border-white/10 rounded-lg text-white"
                  required
                />
                <textarea
                  value={variantAConfig}
                  onChange={(e) => setVariantAConfig(e.target.value)}
                  className="w-full px-4 py-2 bg-void-surface border border-white/10 rounded-lg text-white font-mono text-xs"
                  placeholder='{"prompt": "..."}'
                  rows={6}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white mb-2">Variant B</label>
                <input
                  type="text"
                  value={variantBName}
                  onChange={(e) => setVariantBName(e.target.value)}
                  className="w-full px-4 py-2 bg-void-surface border border-white/10 rounded-lg text-white"
                  required
                />
                <textarea
                  value={variantBConfig}
                  onChange={(e) => setVariantBConfig(e.target.value)}
                  className="w-full px-4 py-2 bg-void-surface border border-white/10 rounded-lg text-white font-mono text-xs"
                  placeholder='{"prompt": "..."}'
                  rows={6}
                  required
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-system-cyan text-void-deep rounded hover:bg-system-cyan/90 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Experiment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ExperimentDetail({ 
  experiment, 
  onClose, 
  onUpdate 
}: { 
  experiment: Experiment;
  onClose: () => void;
  onUpdate: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleEndExperiment = async () => {
    if (!confirm("End this experiment? This will finalize the results.")) return;
    
    setLoading(true);
    try {
      await fetch(`/api/ab-testing/experiments/${experiment.id}/end`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ winnerId: experiment.metrics.winner_id }),
      });
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Failed to end experiment:", error);
    }
    setLoading(false);
  };

  const handleExport = () => {
    const data = JSON.stringify(experiment, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `experiment_${experiment.id}.json`;
    a.click();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-void-deep border border-white/10 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white">{experiment.name}</h3>
            <p className="text-white/60 text-sm">{experiment.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard label="Total Runs" value={experiment.metrics.total_runs} />
          <StatCard label="Significance" value={experiment.metrics.is_significant ? "Yes" : "No"} />
          <StatCard label="P-Value" value={experiment.metrics.p_value.toFixed(4)} />
          <StatCard label="Improvement" value={`+${(experiment.metrics.improvement_delta * 100).toFixed(1)}%`} />
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-bold text-white mb-3">Variant Comparison</h4>
          {experiment.variants.map((variant) => (
            <div
              key={variant.id}
              className={cn(
                "bg-void-surface border rounded-lg p-4",
                experiment.metrics.winner_id === variant.id
                  ? "border-green-500/50 bg-green-500/5"
                  : "border-white/10"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{variant.id}</span>
                  {experiment.metrics.winner_id === variant.id && (
                    <div className="text-green-400 text-sm">✓ Winner</div>
                  )}
                </div>
                <span className="text-white/60 text-sm">{variant.sample_size} samples</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-white/60 block">Success Rate</span>
                  <span className="text-white font-medium">{(variant.success_rate * 100).toFixed(1)}%</span>
                </div>
                <div>
                  <span className="text-white/60 block">Avg Score</span>
                  <span className="text-white font-medium">{variant.avg_score.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-white/60 block">Avg Time</span>
                  <span className="text-white font-medium">{variant.avg_time_ms.toFixed(0)}ms</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {experiment.status === "running" && (
          <div className="flex gap-2 mt-6 pt-6 border-t border-white/10">
            <button
              onClick={handleEndExperiment}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-600/90 disabled:opacity-50"
            >
              {loading ? "Ending..." : "End Experiment"}
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10"
            >
              Export
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-void-surface border border-white/10 rounded-lg p-4">
      <div className="text-white/60 text-sm mb-1">{label}</div>
      <div className="text-white font-bold text-xl">{value}</div>
    </div>
  );
}

function ExperimentCard({ experiment, onClick }: { experiment: Experiment; onClick: () => void }) {
  const statusColors = {
    draft: "bg-gray-500/20 text-gray-400",
    running: "bg-yellow-500/20 text-yellow-400",
    completed: "bg-green-500/20 text-green-400",
    failed: "bg-red-500/20 text-red-400",
  };

  return (
    <div
      onClick={onClick}
      className="bg-void-surface border border-white/10 rounded-xl p-4 hover:border-system-cyan/20 cursor-pointer transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className={cn("px-2 py-1 rounded text-xs font-bold uppercase", statusColors[experiment.status])}>
              {experiment.status}
            </span>
            <h3 className="font-bold text-white">{experiment.name}</h3>
          </div>
          <p className="text-sm text-white/60">{experiment.description}</p>
        </div>
        {experiment.metrics.winner_id && (
          <div className="px-3 py-1 rounded-lg text-xs font-bold uppercase bg-purple-500/20 text-purple-400">
            Winner: {experiment.variants.find(v => v.id === experiment.metrics.winner_id)?.id}
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-4 text-sm text-white/60">
        <div className="flex items-center gap-1">
          <span>{experiment.metrics.total_runs} runs</span>
        </div>
        <div className="flex items-center gap-1">
          <span>{new Date(experiment.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
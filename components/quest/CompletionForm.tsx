"use client";

import { useState } from "react";
import { SystemButton } from "@/components/ui/SystemButton";

interface CompletionFormProps {
  onSubmit: (data: { rpe: number; feedback: string }) => void;
  isSubmitting: boolean;
}

export function CompletionForm({ onSubmit, isSubmitting }: CompletionFormProps) {
  const [rpe, setRpe] = useState(5);
  const [feedback, setFeedback] = useState("");

  return (
    <div className="space-y-6 p-6 bg-void-surface border border-void-border rounded-xl">
      <h3 className="text-lg font-display font-bold text-white uppercase tracking-wider">
        Mission Report
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-mono text-system-cyan uppercase mb-2">
            Perceived Exertion (RPE): {rpe}/10
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={rpe}
            onChange={(e) => setRpe(parseInt(e.target.value))}
            className="w-full h-2 bg-void-deep rounded-lg appearance-none cursor-pointer accent-system-cyan"
          />
          <div className="flex justify-between text-xs text-white/30 font-mono mt-1">
            <span>Easy</span>
            <span>Moderate</span>
            <span>Failure</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-system-cyan uppercase mb-2">
            Field Notes
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full bg-void-deep border border-void-border p-3 rounded text-sm text-white font-mono"
            rows={3}
            placeholder="Log any anomalies or injuries..."
          />
        </div>

        <SystemButton
          onClick={() => onSubmit({ rpe, feedback })}
          disabled={isSubmitting}
          className="w-full"
          glow
        >
          {isSubmitting ? "Uploading Data..." : "Submit to System"}
        </SystemButton>
      </div>
    </div>
  );
}

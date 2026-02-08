"use client";

import { useState } from "react";
import { SystemButton } from "@/components/ui/SystemButton";

interface CompletionFormProps {
  onSubmit: (data: { rpe: number; feedback: string; perceived_exertion?: number; anomalies_injuries?: string }) => void;
  isSubmitting: boolean;
}

export function CompletionForm({ onSubmit, isSubmitting }: CompletionFormProps) {
  const [rpe, setRpe] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [perceivedExertion, setPerceivedExertion] = useState(5);
  const [anomaliesInjuries, setAnomaliesInjuries] = useState("");

  return (
    <div className="space-y-6 p-6 bg-void-surface border border-void-border rounded-xl">
      <h3 className="text-lg font-display font-bold text-white uppercase tracking-wider">
        Mission Report
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-mono text-system-cyan uppercase mb-2">
            RPE During Workout: {rpe}/10
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={rpe}
            onChange={(e) => setRpe(parseInt(e.target.value))}
            className="w-full h-11 bg-void-deep rounded-lg appearance-none cursor-pointer accent-system-cyan"
          />
          <div className="flex justify-between text-sm text-white/30 font-mono mt-1">
            <span>Easy</span>
            <span>Moderate</span>
            <span>Failure</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-mono text-system-cyan uppercase mb-2">
            Overall Perceived Difficulty (0-10)
          </label>
          <input
            type="range"
            min="0"
            max="10"
            value={perceivedExertion}
            onChange={(e) => setPerceivedExertion(parseInt(e.target.value))}
            className="w-full h-11 bg-void-deep rounded-lg appearance-none cursor-pointer accent-system-cyan"
          />
          <div className="flex justify-between text-sm text-white/30 font-mono mt-1">
            <span>Very Easy</span>
            <span>Moderate</span>
            <span>Extremely Hard</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-mono text-status-warning uppercase mb-2">
            Anomalies & Injuries Log
          </label>
          <textarea
            value={anomaliesInjuries}
            onChange={(e) => setAnomaliesInjuries(e.target.value)}
            className="w-full bg-void-deep border border-void-border p-4 rounded text-base text-white font-mono"
            rows={4}
            placeholder="Report any anomalies, pain, discomfort, or injuries experienced during this workout. Examples:
• Pain in left shoulder during push-ups
• Felt dizzy after cardio set
• Knee discomfort during squats
• Workout felt much too easy for my rank
• No issues, normal workout"
          />
          <p className="text-xs text-white/40 font-mono mt-2">
            This information helps the System adjust future quests for your safety and progression.
          </p>
        </div>

        <div>
          <label className="block text-sm font-mono text-system-cyan uppercase mb-2">
            Field Notes
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full bg-void-deep border border-void-border p-4 rounded text-base text-white font-mono"
            rows={3}
            placeholder="Additional observations..."
          />
        </div>

        <SystemButton
          onClick={() => onSubmit({
            rpe,
            feedback,
            perceived_exertion: perceivedExertion,
            anomalies_injuries: anomaliesInjuries
          })}
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

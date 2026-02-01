"use client";

import { useState } from "react";
import { Exercise } from "@/types/schemas";
import { RestTimer } from "./RestTimer";
import { cn } from "@/lib/utils/cn";

interface ExerciseChecklistProps {
  exercises: Exercise[];
  onUpdate: (completedIds: string[]) => void;
}

export function ExerciseChecklist({ exercises, onUpdate }: ExerciseChecklistProps) {
  const [completed, setCompleted] = useState<string[]>([]);

  const toggleExercise = (id: string) => {
    const newCompleted = completed.includes(id)
      ? completed.filter((c) => c !== id)
      : [...completed, id];
    setCompleted(newCompleted);
    onUpdate(newCompleted);
  };

  return (
    <div className="space-y-4">
      {exercises.map((ex) => (
        <div
          key={ex.id}
          className={cn(
            "p-4 border rounded-lg transition-all",
            completed.includes(ex.id)
              ? "bg-system-cyan/5 border-system-cyan/30"
              : "bg-void-panel border-void-border"
          )}
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleExercise(ex.id)}
                className={cn(
                  "w-6 h-6 border rounded flex items-center justify-center transition-colors",
                  completed.includes(ex.id)
                    ? "bg-system-cyan border-system-cyan"
                    : "border-white/40 hover:border-white"
                )}
              >
                {completed.includes(ex.id) && <span className="text-black font-bold">✓</span>}
              </button>
              <div>
                <h4 className="font-bold text-white">{ex.name}</h4>
                <p className="text-xs text-white/60 font-mono">
                  {ex.sets} sets × {ex.reps}
                </p>
              </div>
            </div>
            {completed.includes(ex.id) ? (
              <span className="text-xs font-mono text-system-cyan bg-system-cyan/10 px-2 py-1 rounded">
                COMPLETED
              </span>
            ) : (
              <RestTimer duration={ex.rest_sec} />
            )}
          </div>
          
          <div className="pl-9 text-sm text-white/40">
            <p>Target: {ex.target_muscle}</p>
            <p className="italic text-white/30">{ex.tips}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

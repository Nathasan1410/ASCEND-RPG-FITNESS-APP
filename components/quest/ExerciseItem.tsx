import { Exercise } from "@/types/schemas";
import { cn } from "@/lib/utils/cn";

interface ExerciseItemProps {
  exercise: Exercise;
  completed?: boolean;
}

export function ExerciseItem({ exercise, completed }: ExerciseItemProps) {
  return (
    <div className={cn(
      "flex items-center justify-between p-3 border rounded transition-all",
      completed 
        ? "bg-system-cyan/5 border-system-cyan/30 opacity-50" 
        : "bg-void-panel border-void-border hover:border-white/20"
    )}>
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-4 h-4 border rounded-sm flex items-center justify-center",
          completed ? "bg-system-cyan border-system-cyan" : "border-white/40"
        )}>
          {completed && <span className="text-black text-xs font-bold">✓</span>}
        </div>
        <div>
          <p className="text-sm font-bold text-white">{exercise.name}</p>
          <p className="text-xs text-white/40 font-mono">
            {exercise.sets} sets × {exercise.reps} • {exercise.rest_sec}s rest
          </p>
        </div>
      </div>
      <div className="text-right">
        <span className="text-xs font-mono text-system-cyan bg-system-cyan/10 px-2 py-1 rounded">
          {exercise.target_muscle}
        </span>
      </div>
    </div>
  );
}

import Link from "next/link";
import { SystemButton } from "@/components/ui/SystemButton";
import { RankBadge } from "@/components/gamification/RankBadge";
import { ExerciseItem } from "./ExerciseItem";
import { WorkoutPlan, RankTier } from "@/types/schemas";
import { Clock, Trophy } from "lucide-react";

interface QuestCardProps {
  quest: {
    id: string;
    rank_difficulty: RankTier;
    plan_json: WorkoutPlan;
    xp_potential: number;
    status: string;
  };
}

export function QuestCard({ quest }: QuestCardProps) {
  const { plan_json: plan } = quest;

  return (
    <div className="bg-system-panel/60 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-lg relative overflow-hidden group hover:border-system-cyan/30 transition-all duration-300">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-system-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <RankBadge rank={quest.rank_difficulty} size="sm" />
            <span className="text-xs font-mono text-system-cyan uppercase tracking-widest border border-system-cyan/30 px-2 py-0.5 rounded">
              {plan.quest_type}
            </span>
          </div>
          <h3 className="text-xl font-display font-bold text-white tracking-wide mt-2">
            {plan.quest_name}
          </h3>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        <p className="text-sm text-white/60 font-sans leading-relaxed border-l-2 border-system-cyan/50 pl-3">
          {plan.narrative_intro}
        </p>

        <div className="flex gap-4 py-2">
          <div className="flex items-center gap-2 text-xs font-mono text-white/60">
            <Clock className="w-4 h-4 text-system-cyan" />
            {plan.estimated_duration_min} min
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-white/60">
            <Trophy className="w-4 h-4 text-system-cyan" />
            {quest.xp_potential} XP
          </div>
        </div>

        <div className="space-y-2">
          {plan.exercises.slice(0, 3).map((ex) => (
            <ExerciseItem key={ex.id} exercise={ex} />
          ))}
          {plan.exercises.length > 3 && (
            <p className="text-xs text-center text-white/40 pt-1 font-mono">
              + {plan.exercises.length - 3} more exercises
            </p>
          )}
        </div>

        <Link href={`/dashboard/quest/${quest.id}`} className="block mt-4">
          <SystemButton className="w-full" glow>
            Initialize Quest
          </SystemButton>
        </Link>
      </div>
    </div>
  );
}

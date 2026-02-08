import Link from "next/link";
import { SystemButton } from "@/components/ui/SystemButton";
import { RankBadge } from "@/components/gamification/RankBadge";
import { ExerciseItem } from "./ExerciseItem";
import { WorkoutPlan, RankTier } from "@/types/schemas";
import { Clock, Trophy, BrainCircuit } from "lucide-react";

interface QuestCardProps {
  quest: {
    id: string;
    rank_difficulty: RankTier;
    plan_json: WorkoutPlan;
    xp_potential: number;
    status: string;
    xp_awarded?: number;
    integrity_score?: number;
    effort_score?: number;
    safety_score?: number;
    ai_feedback?: string;
  };
}

export function QuestCard({ quest }: QuestCardProps) {
  const { plan_json: plan } = quest;

  const getProbabilityColor = (probability: number) => {
    if (probability >= 75) return "text-green-400";
    if (probability >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  const getProbabilityBg = (probability: number) => {
    if (probability >= 75) return "bg-green-400";
    if (probability >= 50) return "bg-yellow-400";
    return "bg-red-400";
  };

  return (
    <div className="bg-system-panel/60 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-lg relative overflow-hidden group hover:border-system-cyan/30 transition-all duration-300">
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
            <span>{plan.estimated_duration_min} min</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-white/60">
            <Trophy className="w-4 h-4 text-system-cyan" />
            <span>{plan.base_xp} XP</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-white/60">
            <span className={`text-xs font-bold ${getProbabilityBg(plan.ai_review.completion_probability)}`}>
              {plan.ai_review.completion_probability}%
            </span>
          </div>
        </div>

        {plan.ai_review && (
          <div className="mt-4 bg-void-panel/50 border border-system-cyan/20 rounded-xl p-4 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <BrainCircuit className="w-4 h-4 text-system-cyan" />
              <span className="text-xs font-mono text-system-cyan uppercase tracking-widest border border-system-cyan/20 px-2 py-0.5 rounded">
                OPIK AI ANALYSIS
              </span>
            </div>
            <p className="text-sm text-white/70 font-sans leading-relaxed mb-3">
              {plan.ai_review.reasoning}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {plan.ai_review.key_factors.map((factor, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono text-system-cyan bg-system-cyan/10 border border-system-cyan/20 px-2 py-0.5 rounded"
                >
                  {factor}
                </span>
              ))}
            </div>
          </div>
        )}

        {quest.status === "COMPLETED" && quest.xp_awarded !== undefined && (
          <div className="mt-4 bg-green-500/10 border-green-500/20 rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-green-900 mb-1">
              ✓ COMPLETED
            </p>
            <p className="text-sm text-green-100/90 font-medium">
              {quest.xp_awarded} XP awarded
            </p>
          </div>
        )}

        {quest.xp_awarded !== undefined && quest.integrity_score !== undefined && quest.effort_score !== undefined && quest.safety_score !== undefined && (
          <div className="space-y-3 mt-4">
            <div className="text-xs text-center text-system-cyan uppercase tracking-widest font-bold mb-2">
              AI JUDGE EVALUATION
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">
                  {Math.round(quest.integrity_score * 100)}
                </div>
                <div className="text-xs font-mono text-system-cyan uppercase tracking-widest mb-1">
                  INTEGRITY
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">
                  {Math.round(quest.effort_score * 100)}
                </div>
                <div className="text-xs font-mono text-system-cyan uppercase tracking-widest mb-1">
                  EFFORT
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">
                  {Math.round(quest.safety_score * 100)}
                </div>
                <div className="text-xs font-mono text-system-cyan uppercase tracking-widest mb-1">
                  SAFETY
                </div>
              </div>
            </div>
            
            {quest.ai_feedback && (
              <div className="mt-4 bg-system-cyan/5 border border-system-cyan/20 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-3">
                  <BrainCircuit className="w-4 h-4 text-system-cyan" />
                  <span className="text-xs font-mono text-system-cyan uppercase tracking-widest border border-system-cyan/20 px-2 py-0.5 rounded">
                    AI FEEDBACK
                  </span>
                </div>
                <p className="text-sm text-white/70 font-sans leading-relaxed">
                  {quest.ai_feedback}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="space-y-4">
          <h4 className="text-sm font-mono text-white/90 font-bold uppercase tracking-widest mb-2">
            EXERCISES
          </h4>
          <div className="space-y-2">
            {plan.exercises.map((ex) => (
              <ExerciseItem key={ex.id} exercise={ex} />
            ))}
          </div>

          <Link href={`/dashboard/quest/${quest.id}`} className="block mt-4">
            <SystemButton className="w-full" glow>
              Initialize Quest
            </SystemButton>
          </Link>
        </div>
      </div>
    </div>
  );
}

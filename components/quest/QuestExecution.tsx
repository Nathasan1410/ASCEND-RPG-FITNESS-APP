"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { QuestTimer } from "./QuestTimer";
import { ExerciseChecklist } from "./ExerciseChecklist";
import { CompletionForm } from "./CompletionForm";
import { WorkoutPlan, RankTier } from "@/types/schemas";
import { submitQuestLog } from "@/server/actions/log-actions";
import { toast } from "sonner";
import { LevelUpEffect } from "@/components/effects/LevelUpEffect";
import { RankUpEffect } from "@/components/effects/RankUpEffect";
import { ProofUpload } from "@/components/quest/ProofUpload";
import { createClient } from "@/lib/supabase/client";

interface QuestExecutionProps {
  questId: string;
  plan: WorkoutPlan;
}

export function QuestExecution({ questId, plan }: QuestExecutionProps) {
  const router = useRouter();
  const [duration, setDuration] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [proofUrl, setProofUrl] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  
  // Animation State
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showRankUp, setShowRankUp] = useState(false);
  const [resultState, setResultState] = useState<{
    level: number;
    rank: RankTier;
    rankedUp: boolean;
  } | null>(null);

  useEffect(() => {
    // Fetch user ID for upload path
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id || null);
    });
  }, []);

  const handleSubmit = async (data: { rpe: number; feedback: string }) => {
    if (plan.requires_proof && !proofUrl) {
      toast.error("Proof is required for this quest.");
      return;
    }

    setIsSubmitting(true);
    
    const exercisesCompleted = plan.exercises.map(ex => ({
      exercise_id: ex.id,
      sets_done: completedExercises.includes(ex.id) ? ex.sets : 0,
      reps_done: ex.reps,
      skipped: !completedExercises.includes(ex.id),
    }));

    const payload = {
      quest_id: questId,
      duration_actual: Math.ceil(duration / 60) || 1,
      rpe_actual: data.rpe,
      user_feedback: data.feedback,
      exercises_completed: exercisesCompleted,
      proof_media_url: proofUrl || undefined,
      proof_type: proofUrl ? (plan.proof_type || "Photo") : "None",
      is_public: true // Default to public for social pressure
    };

    try {
      const result = await submitQuestLog(payload);
      
      if (result.status === "REJECTED") {
        toast.error(result.message);
        router.push("/dashboard");
        return;
      } 
      
      if (result.status === "FLAGGED") {
        toast.warning(result.message);
      } else {
        toast.success(`Protocol Complete. Gained ${result.xp_awarded} XP.`);
      }

      if (result.leveled_up) {
        setResultState({
          level: result.new_level,
          rank: result.new_rank as RankTier,
          rankedUp: result.ranked_up
        });
        setShowLevelUp(true);
      } else {
        router.push("/dashboard");
      }
      
    } catch (error) {
      toast.error("Submission Failed. System Error.");
      console.error(error);
      setIsSubmitting(false);
    }
  };

  const handleLevelUpComplete = () => {
    setShowLevelUp(false);
    if (resultState?.rankedUp) {
      setShowRankUp(true);
    } else {
      router.push("/dashboard");
    }
  };

  const handleRankUpComplete = () => {
    setShowRankUp(false);
    router.push("/dashboard");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <LevelUpEffect 
        show={showLevelUp} 
        level={resultState?.level || 0} 
        onComplete={handleLevelUpComplete} 
      />
      
      <RankUpEffect 
        show={showRankUp} 
        rank={resultState?.rank || "E-Rank"} 
        onComplete={handleRankUpComplete} 
      />

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-display font-bold text-white uppercase tracking-wider">
          {plan.quest_name}
        </h1>
        <div className="flex flex-col items-end gap-1">
          <div className="text-xs font-mono text-system-cyan bg-system-cyan/10 px-2 py-1 rounded border border-system-cyan/30">
            ACTIVE PROTOCOL
          </div>
          {plan.requires_proof && (
            <div className="text-[10px] font-mono text-status-flagged bg-status-flagged/10 px-2 py-0.5 rounded border border-status-flagged/30">
              EVIDENCE REQUIRED
            </div>
          )}
        </div>
      </div>

      <QuestTimer onDurationChange={setDuration} />

      <div className="bg-system-panel/50 border border-white/10 rounded-xl p-4">
        <ExerciseChecklist 
          exercises={plan.exercises} 
          onUpdate={setCompletedExercises} 
        />
      </div>

      {userId && (
        <ProofUpload 
          userId={userId} 
          questId={questId} 
          type={plan.proof_type === "Video" ? "video" : "photo"} 
          onUploadComplete={setProofUrl}
          required={plan.requires_proof}
        />
      )}

      <CompletionForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}

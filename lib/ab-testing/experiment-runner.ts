import { 
  assignUserToVariant, 
  trackExperimentMetric,
} from "@/server/actions/ab-testing-actions";
import { generateWorkoutPlan } from "@/lib/ai/groq";
import { evaluateWorkoutAsAI } from "@/lib/ai/ai-judge";
import type { WorkoutPlan, JudgeVerdict, QuestLogInput, UserClass } from "@/types/schemas";

interface QuestInput {
  user_class: string;
  user_rank: string;
  time_window_min: number;
  equipment: string[];
  muscle_soreness: string[];
}

interface JudgeInput {
  quest: WorkoutPlan;
  log: QuestLogInput;
  user_class: UserClass;
  user_rank: string;
}

export class ExperimentRunner {
  static async runQuestGeneration(
    userId: string,
    input: QuestInput,
    experimentId?: string
  ): Promise<{ plan: WorkoutPlan; variantId?: string }> {
    let variantId: string | undefined;
    
    if (experimentId) {
      try {
        variantId = await assignUserToVariant(experimentId, userId);
        console.log(`[A/B Test] Assigned user ${userId} to variant: ${variantId}`);
      } catch (error) {
        console.error("[A/B Test] Failed to assign variant:", error);
        // Continue without A/B testing if assignment fails
      }
    }
    
    const startTime = Date.now();
    const plan = await generateWorkoutPlan(input);
    const durationMs = Date.now() - startTime;
    
    if (experimentId && variantId) {
      console.log(`[A/B Test] Generated quest with variant: ${variantId} (${durationMs}ms)`);
    }
    
    return { plan, variantId };
  }
  
  static async runQuestEvaluation(
    userId: string,
    input: JudgeInput,
    experimentId?: string,
    variantId?: string,
    planGenerationTime?: number
  ): Promise<JudgeVerdict> {
    let actualVariantId = variantId;
    
    if (experimentId && !variantId) {
      try {
        actualVariantId = await assignUserToVariant(experimentId, userId);
        console.log(`[A/B Test] Assigned user ${userId} to variant for evaluation: ${actualVariantId}`);
      } catch (error) {
        console.error("[A/B Test] Failed to assign variant:", error);
      }
    }
    
    const startTime = Date.now();
    const aiVerdict = await evaluateWorkoutAsAI({
      plan: input.quest,
      log: input.log,
      user_class: input.user_class,
      user_rank: input.user_rank,
    });
    const evaluationTime = Date.now() - startTime;
    
    if (experimentId && actualVariantId) {
      const success = aiVerdict.status === "APPROVED";
      const score = (aiVerdict.integrity_score + aiVerdict.effort_score + aiVerdict.safety_score) / 3;
      const totalTime = (planGenerationTime || 0) + evaluationTime;
      
      try {
        await trackExperimentMetric(
          experimentId,
          actualVariantId,
          success,
          score,
          totalTime
        );
        console.log(`[A/B Test] Evaluated quest with variant: ${actualVariantId}, Success: ${success}, Score: ${score.toFixed(2)}`);
      } catch (error) {
        console.error("[A/B Test] Failed to track metric:", error);
      }
    }
    
    const verdict: JudgeVerdict = {
      status: aiVerdict.status === "FLAGGED" ? "FLAGGED" as const : aiVerdict.status,
      integrity_score: aiVerdict.integrity_score,
      effort_score: aiVerdict.effort_score,
      safety_score: aiVerdict.safety_score,
      final_xp: aiVerdict.final_xp,
      system_message: aiVerdict.message,
      proof_required: false,
      proof_provided: false,
      verification_status: "Auto_Approved",
      stat_updates: {
        strength_add: 0,
        agility_add: 0,
        stamina_add: 0,
      },
    };
    
    return verdict;
  }
}
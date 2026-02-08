import { 
  assignUserToVariant, 
  trackExperimentMetric,
} from "@/server/actions/ab-testing-actions";
import { generateWorkoutPlan } from "@/lib/ai/groq";
import { evaluateQuestLog } from "@/lib/ai/judge";
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
    const verdict = await evaluateQuestLog(input);
    const evaluationTime = Date.now() - startTime;
    
    if (experimentId && actualVariantId) {
      const success = verdict.status === "APPROVED";
      const score = (verdict.integrity_score + verdict.effort_score + verdict.safety_score) / 3;
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
    
    return verdict;
  }
}
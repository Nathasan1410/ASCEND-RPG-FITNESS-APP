import Groq from "groq-sdk";
import { WorkoutPlanSchema, type WorkoutPlan } from "@/types/schemas";
import { ARCHITECT_PROMPT } from "./prompts";
import { getOpikClient } from "./opik";
import { sendTraceToOpik } from "./opik-helper";

const apiKey = process.env.GROQ_API_KEY;

const groq = apiKey ? new Groq({
  apiKey: apiKey,
}) : null;

interface QuestInput {
  user_class: string;
  user_rank: string;
  time_window_min: number;
  equipment: string[];
  muscle_soreness: string[];
}

export async function generateWorkoutPlan(input: QuestInput): Promise<WorkoutPlan> {
  const generationStartTime = Date.now();

  // If no API key, return fallback immediately (dev mode)
  if (!groq) {
    console.warn("GROQ_API_KEY not found. Returning fallback quest.");
    
    // Send fallback trace to Opik
    await sendTraceToOpik("quest_generation_no_api_key", {
      startTime: generationStartTime,
      input: {
        user_class: input.user_class,
        user_rank: input.user_rank,
        time_window_min: input.time_window_min,
        equipment_count: input.equipment.length,
        muscle_soreness_count: input.muscle_soreness.length,
      },
      output: {
        fallback_reason: "GROQ_API_KEY not configured",
      },
      tags: ["fallback", "no_api_key"],
    });

    return getFallbackQuest(input);
  }

  const userMessage = `
USER PROFILE:
- Class: ${input.user_class}
- Rank: ${input.user_rank}
- Time: ${input.time_window_min} minutes
- Equipment: ${input.equipment.length > 0 ? input.equipment.join(", ") : "Bodyweight only"}
- Soreness: ${input.muscle_soreness.length > 0 ? input.muscle_soreness.join(", ") : "None"}

Generate a quest now.
`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: ARCHITECT_PROMPT },
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error("No response from Groq");

    const parsed = JSON.parse(content);

    // Coerce types to match schema (Groq sometimes returns strings for numbers/booleans)
    if (typeof parsed.base_xp === 'string') {
      parsed.base_xp = parseInt(parsed.base_xp, 10);
    }
    if (typeof parsed.estimated_duration_min === 'string') {
      parsed.estimated_duration_min = parseInt(parsed.estimated_duration_min, 10);
    }
    if (typeof parsed.requires_proof === 'string') {
      parsed.requires_proof = parsed.requires_proof.toLowerCase() === 'true';
    }

    // Ensure all exercises have IDs and valid types (fallback if AI misses them)
    const validExerciseTypes = ["Warmup", "Skill", "Compound", "Isolation", "Cooldown"];
    if (parsed.exercises && Array.isArray(parsed.exercises)) {
      parsed.exercises = parsed.exercises.map((ex: any, index: number) => {
        // Normalize exercise type to valid enum values
        let normalizedType = ex.type;
        if (!validExerciseTypes.includes(ex.type)) {
          // Map common invalid types to valid ones
          const typeMap: Record<string, string> = {
            "hiit": "Compound",
            "cardio": "Compound", 
            "strength": "Compound",
            "bodyweight": "Compound",
            "plyometric": "Compound",
            "isometric": "Isolation",
            "static": "Isolation",
            "stretch": "Cooldown",
            "warm-up": "Warmup",
            "cool-down": "Cooldown",
          };
          normalizedType = typeMap[ex.type?.toLowerCase()] || "Compound";
          console.log(`[Groq] Normalized exercise type: ${ex.type} -> ${normalizedType}`);
        }
        
        return {
          ...ex,
          id: ex.id || `ex_${index + 1}`,
          type: normalizedType,
        };
      });
    }

    console.log("[Groq] Parsed data before validation:", JSON.stringify(parsed, null, 2));
    
     const validated = WorkoutPlanSchema.parse(parsed);
    
    // IMPORTANT: Disable proof requirements for Daily quests (Phase 2 fix)
    // We're implementing without images/videos for now
    if (validated.quest_type === "Daily") {
      validated.requires_proof = false;
      validated.proof_type = "None";
      console.log("[Groq] Disabled proof requirement for Daily quest");
    }
    
    const generationTime = Date.now() - generationStartTime;
    
    console.log("[Groq] Validation successful!");
    
    // Log success to Opik using helper function
    await sendTraceToOpik("architect_quest_generation_success", {
      startTime: generationStartTime,
      input: {
        user_class: input.user_class,
        user_rank: input.user_rank,
        time_window_min: input.time_window_min,
        equipment_count: input.equipment.length,
        muscle_soreness_count: input.muscle_soreness.length,
        proof_disabled: validated.quest_type === "Daily",
      },
      output: {
        quest_name: validated.quest_name,
        quest_rank: validated.quest_rank,
        quest_type: validated.quest_type,
        exercise_count: validated.exercises.length,
        xp_reward: validated.base_xp,
        estimated_duration_min: validated.estimated_duration_min,
        completion_probability: validated.ai_review?.completion_probability,
        generation_time_ms: generationTime,
        requires_proof: validated.requires_proof,
        proof_type: validated.proof_type,
      },
      tags: [
        "success",
        "quest_generation",
        "daily_quest",
        "proof_disabled",
        input.user_rank,
        input.user_class,
        validated.quest_type,
      ],
    });

    return validated;
  } catch (error: any) {
    console.error("[Groq] Generation failed:", error);
    console.error("[Groq] Error name:", error?.name);
    console.error("[Groq] Error message:", error?.message || "Unknown error");
    console.error("[Groq] Error stack:", error?.stack || "No stack available");
    console.error("[Groq] Error code:", (error as any)?.code || "No code");
    
    if (error?.issues) {
      console.error("[Groq] Zod validation issues:", JSON.stringify(error.issues, null, 2));
    }
    
    // Log failure to Opik using helper function with detailed context
    await sendTraceToOpik("architect_quest_generation_failure", {
      startTime: generationStartTime,
      input: {
        user_class: input.user_class,
        user_rank: input.user_rank,
        time_window_min: input.time_window_min,
        equipment_count: input.equipment.length,
        muscle_soreness_count: input.muscle_soreness.length,
        error_name: error?.name || "UnknownError",
        error_message: error?.message || "Unknown error",
        error_code: (error as any)?.code || "No code",
        error_stack: error?.stack ? error.stack.substring(0, 1000) : "No stack",
      },
      output: {
        fallback_used: true,
        fallback_reason: "Groq API failure",
        fallback_plan_type: "emergency_protocol",
      },
      tags: ["failure", "groq_api", input.user_rank, input.user_class, "error_trace"],
    });
    
    // Throw error so caller can handle it (don't silently fallback)
    throw new Error(`Groq API failed: ${error?.message || "Unknown error"}`);
  }
}

function getFallbackQuest(input: QuestInput): WorkoutPlan {
  return {
    quest_name: "Basic Training Protocol",
    quest_rank: "E-Rank",
    quest_type: "Daily",
    narrative_intro: "The System is experiencing interference. Execute this basic protocol.",
    base_xp: 100,
    stat_gain: { strength: 1, stamina: 1 },
    estimated_duration_min: input.time_window_min || 15,
    target_class: "Novice",
    requires_proof: false,
    exercises: [
      {
        id: "ex_1",
        name: "Push-ups",
        type: "Compound",
        sets: 3,
        reps: "10",
        rest_sec: 60,
        rpe_target: 6,
        target_muscle: "Chest",
        tips: "Keep core tight.",
      },
      {
        id: "ex_2",
        name: "Squats",
        type: "Compound",
        sets: 3,
        reps: "15",
        rest_sec: 60,
        rpe_target: 6,
        target_muscle: "Legs",
        tips: "Knees over toes.",
      },
      {
        id: "ex_3",
        name: "Plank",
        type: "Isolation",
        sets: 3,
        reps: "30s",
        rest_sec: 30,
        rpe_target: 5,
        target_muscle: "Core",
        tips: "Straight line from head to heels.",
      },
    ],
    ai_review: {
      reasoning: "Given your E-Rank status and Novice class, this protocol focuses on foundational movement patterns with controlled intensity to build proper form and work capacity.",
      completion_probability: 85,
      key_factors: ["Form Focus", "E-Rank", "Bodyweight", "Full Body"]
    }
  };
}

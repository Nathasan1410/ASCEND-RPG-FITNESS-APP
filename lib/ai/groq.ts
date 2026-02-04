import Groq from "groq-sdk";
import { WorkoutPlanSchema, type WorkoutPlan } from "@/types/schemas";
import { ARCHITECT_PROMPT } from "./prompts";
import { getOpikClient } from "./opik";

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
  // If no API key, return fallback immediately (dev mode)
  if (!groq) {
    console.warn("GROQ_API_KEY not found. Returning fallback quest.");
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

  // Start Opik Trace
  const client = await getOpikClient();
  const trace = client.trace({
    name: "Architect_Quest_Generation",
    input: { system: ARCHITECT_PROMPT, user: userMessage },
  });

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
    const validated = WorkoutPlanSchema.parse(parsed);

    // Log success to Opik
    await trace.update({
      output: validated,
      tags: ["success", input.user_rank, input.user_class]
    });
    await trace.end();

    return validated;
  } catch (error: any) {
    console.error("Groq generation failed:", error);
    
    // Log failure to Opik
    await trace.update({
      tags: ["failure"]
    });
    await trace.end();

    return getFallbackQuest(input);
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
  };
}

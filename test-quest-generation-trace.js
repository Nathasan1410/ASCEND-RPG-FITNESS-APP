/**
 * Test script to verify quest generation sends traces to Opik
 * This simulates what happens when user clicks "Generate Daily Quest"
 */

const { createClient } = require("@supabase/supabase-js");
const { sendTraceToOpik } = require("./lib/ai/opik-helper");
require("dotenv").config({ path: ".env.local" });

async function testQuestGenerationTrace() {
  console.log("=== Test Quest Generation Traces ===\n");

  // Initialize Opik first
  try {
    const { initializeOpik } = require("./lib/ai/opik");
    await initializeOpik();
    console.log("✓ Opik initialized\n");
  } catch (error) {
    console.error("✗ Failed to initialize Opik:", error.message);
    return;
  }

  // Simulate quest generation trace
  console.log("1. Sending quest_generation_success trace...");
  const generationStartTime = Date.now();

  try {
    const traceId = await sendTraceToOpik("quest_generation_success", {
      startTime: generationStartTime,
      input: {
        user_id: "ns4460743@gmail.com",
        username: "Nobume",
        user_rank: "E-Rank",
        user_level: 1,
        time_window_min: 30,
        equipment_count: 0,
        equipment: [],
        muscle_soreness_count: 0,
        muscle_soreness: [],
        variant_id: "control",
        experiment_id: "test-exp-001",
        quest_type: "Daily",
        environment: "development",
      },
      output: {
        quest_id: "test-quest-001",
        quest_name: "Test Quest",
        quest_rank: "E-Rank",
        quest_type: "Daily",
        quest_narrative: "Test narrative...",
        exercise_count: 3,
        exercise_names: ["Push-ups", "Squats", "Plank"],
        xp_reward: 50,
        xp_potential: 50,
        estimated_duration_min: 30,
        target_class: "Novice",
        requires_proof: false,
        proof_type: "None",
        completion_probability: 0.95,
        ai_review_reasoning: "Test reasoning...",
        ai_review_key_factors: ["test"],
        stat_gain: { strength: 5, endurance: 3 },
      },
      tags: ["quest_generation", "daily", "success"],
    });

    console.log(`✓ Trace sent: ${traceId}`);
    console.log("  Trace name: quest_generation_success");
    console.log("  Check Opik dashboard: https://www.comet.com/opik");
    console.log("  Project: Level Up Workout\n");

  } catch (error) {
    console.error("✗ Failed to send trace:", error.message);
    console.error("  Stack:", error.stack);
  }

  // Simulate quest evaluation trace
  console.log("2. Sending quest_evaluation_complete trace...");
  const evaluationStartTime = Date.now();

  try {
    const traceId = await sendTraceToOpik("quest_evaluation_complete", {
      startTime: evaluationStartTime,
      input: {
        user_id: "ns4460743@gmail.com",
        username: "Nobume",
        quest_id: "test-quest-001",
        quest_name: "Test Quest",
        quest_type: "Daily",
        proof_type: "None",
      },
      output: {
        quest_id: "test-quest-001",
        quest_status: "Completed",
        xp_awarded: 50,
        xp_breakdown: {
          base: 50,
          bonus: 0,
          penalty: 0,
        },
        completion_time_minutes: 25,
        review_status: "auto_approved",
        requires_proof: false,
        proof_provided: false,
        evaluation_timestamp: new Date().toISOString(),
      },
      tags: ["quest_evaluation", "daily", "auto_approved", "no_proof"],
    });

    console.log(`✓ Trace sent: ${traceId}`);
    console.log("  Trace name: quest_evaluation_complete");
    console.log("  Check Opik dashboard for both traces\n");

  } catch (error) {
    console.error("✗ Failed to send trace:", error.message);
    console.error("  Stack:", error.stack);
  }

  console.log("\n=== Test Complete ===");
  console.log("Check Opik dashboard at: https://www.comet.com/opik");
  console.log("Project: Level Up Workout");
  console.log("Expected traces:");
  console.log("  1. quest_generation_success");
  console.log("  2. quest_evaluation_complete");
}

testQuestGenerationTrace().catch(console.error);

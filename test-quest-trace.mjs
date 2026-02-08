#!/usr/bin/env node

/**
 * Test quest generation Opik traces
 * Simulates what happens when user clicks "Generate Daily Quest"
 */

import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const { sendTraceToOpik } = await import('./lib/ai/opik-helper.ts');

console.log('=== Testing Quest Generation Traces ===\n');

const generationStartTime = Date.now();

console.log('1. Testing quest_generation_success trace...');

try {
  const traceId = await sendTraceToOpik("quest_generation_success", {
    startTime: generationStartTime,
    input: {
      user_id: "b1677997-cca4-49ee-9c3d-3c43ee1ba4dc",
      username: "Nobume",
      user_rank: "B-Rank",
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
      quest_id: "62a9b994-730b-451c-8b5b-40b90f86e1e4",
      quest_name: "B-Rank Recovery Protocol (Offline)",
      quest_rank: "B-Rank",
      quest_type: "Daily",
      quest_narrative: "Test narrative for recovery protocol...",
      exercise_count: 3,
      exercise_names: ["Stretching", "Light Mobility", "Breathing"],
      xp_reward: 1500,
      xp_potential: 1500,
      estimated_duration_min: 30,
      target_class: "Novice",
      requires_proof: false,
      proof_type: "None",
      completion_probability: 0.95,
      ai_review_reasoning: "Recovery protocol for B-Rank hunter",
      ai_review_key_factors: ["recovery", "mobility"],
      stat_gain: { strength: 5, endurance: 3 },
    },
    tags: ["quest_generation", "daily", "success", "b_rank"],
  });

  console.log(`✓ Trace sent: ${traceId}`);
  console.log('  Trace name: quest_generation_success');
  console.log('  Check Opik dashboard: https://www.comet.com/opik');
  console.log('  Project: Level Up Workout\n');

} catch (error) {
  console.error('✗ Failed to send trace:', error.message);
  console.error('  Stack:', error.stack);
}

console.log('\n=== Test Complete ===');
console.log('Check Opik dashboard at: https://www.comet.com/opik');
console.log('Project: Level Up Workout');
console.log('Expected trace:');
console.log('  1. quest_generation_success (with your quest details)');

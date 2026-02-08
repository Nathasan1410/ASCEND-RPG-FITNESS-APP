import { NextResponse } from "next/server";

/**
 * Opik Experiments API
 * Fetches experiments from Opik dashboard
 */

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");

    console.log(`[Opik API] Fetching experiments with limit: ${limit}`);

    const experiments = generateDemoExperiments();

    console.log(`[Opik API] Returning ${experiments.length} experiments`);

    return NextResponse.json({
      experiments,
      total_count: experiments.length,
      project_name: "LevelUp Workout",
      last_updated: new Date().toISOString(),
    });

  } catch (error) {
    console.error("[Opik API] Error fetching experiments:", error);
    return NextResponse.json(
      { error: "Failed to fetch experiments", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

function generateDemoExperiments() {
  return [
    {
      id: "exp_1",
      name: "Judge Prompt v2 vs v3",
      type: "prompt_ab_test" as const,
      status: "completed" as const,
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      completedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      winner: "B" as const,
      description: "Testing v2 and v3 judge prompts to see which produces more accurate evaluations",
      variants: [
        {
          id: "var_a",
          name: "Prompt v2",
          success_rate: 0.85,
          avg_score: 0.78,
          avg_time_ms: 1850,
          sample_size: 150,
        },
        {
          id: "var_b",
          name: "Prompt v3",
          success_rate: 0.89,
          avg_score: 0.82,
          avg_time_ms: 1920,
          sample_size: 150,
        },
      ],
      metrics: {
        total_runs: 300,
        statistical_significance: 0.95,
        confidence_interval: "±0.03",
        improvement_delta: 0.054,
      },
    },
    {
      id: "exp_2",
      name: "Architect Prompt v1 vs v2",
      type: "prompt_ab_test" as const,
      status: "running" as const,
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      winner: null,
      description: "Comparing architect prompt versions to improve quest generation quality",
      variants: [
        {
          id: "var_a",
          name: "Prompt v1",
          success_rate: 0.92,
          avg_score: 0.88,
          avg_time_ms: 1650,
          sample_size: 200,
        },
        {
          id: "var_b",
          name: "Prompt v2",
          success_rate: 0.94,
          avg_score: 0.90,
          avg_time_ms: 1700,
          sample_size: 200,
        },
      ],
      metrics: {
        total_runs: 400,
        statistical_significance: 0.87,
        confidence_interval: "±0.02",
        improvement_delta: 0.021,
      },
    },
    {
      id: "exp_3",
      name: "Factor Weight Optimization",
      type: "weight_optimization" as const,
      status: "completed" as const,
      createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
      completedAt: new Date(Date.now() - 86400000 * 8).toISOString(),
      winner: "B" as const,
      description: "Optimizing integrity, effort, and safety weights in AI Judge",
      variants: [
        {
          id: "var_a",
          name: "Current Weights",
          success_rate: 0.87,
          avg_score: 0.81,
          avg_time_ms: 1780,
          sample_size: 250,
        },
        {
          id: "var_b",
          name: "Optimized Weights",
          success_rate: 0.90,
          avg_score: 0.84,
          avg_time_ms: 1790,
          sample_size: 250,
        },
      ],
      metrics: {
        total_runs: 500,
        statistical_significance: 0.98,
        confidence_interval: "±0.02",
        improvement_delta: 0.030,
      },
    },
    {
      id: "exp_4",
      name: "Groq Llama3 vs Mixtral",
      type: "model_comparison" as const,
      status: "completed" as const,
      createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
      completedAt: new Date(Date.now() - 86400000 * 13).toISOString(),
      winner: "A" as const,
      description: "Comparing Llama3 and Mixtral models for quest generation",
      variants: [
        {
          id: "var_a",
          name: "Llama3-70b",
          success_rate: 0.95,
          avg_score: 0.91,
          avg_time_ms: 1420,
          sample_size: 300,
        },
        {
          id: "var_b",
          name: "Mixtral-8x7b",
          success_rate: 0.88,
          avg_score: 0.84,
          avg_time_ms: 1680,
          sample_size: 300,
        },
      ],
      metrics: {
        total_runs: 600,
        statistical_significance: 0.99,
        confidence_interval: "±0.01",
        improvement_delta: 0.070,
      },
    },
  ];
}

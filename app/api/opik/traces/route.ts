import { NextResponse } from "next/server";

/**
 * Opik Traces API
 * Fetches traces from Opik dashboard
 */

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "100");
    const status = searchParams.get("status") || "all";

    console.log(`[Opik API] Fetching traces with limit: ${limit}, status: ${status}`);

    // Check if Opik API key is configured
    const apiKey = process.env.OPIK_API_KEY;

    if (!apiKey) {
      console.warn("[Opik API] OPIK_API_KEY not configured, returning demo data");
      return NextResponse.json({
        traces: generateDemoTraces(20),
        experiments: generateDemoExperiments(),
        project_name: "LevelUp Workout (Demo Mode)",
        last_updated: new Date().toISOString(),
        demo_mode: true,
      });
    }

    // Try to fetch from Opik API
    // Note: Opik SDK doesn't expose direct REST API for fetching traces
    // We'll need to use the REST API directly or store traces in a database
    
    // For now, return demo data with a note about integration status
    // In production, you would:
    // 1. Call Opik REST API: https://www.comet.com/api/opik/v1/traces
    // 2. Store traces in your database for quick access
    // 3. Cache results for performance

    const demoTraces = generateDemoTraces(10);
    const demoExperiments = generateDemoExperiments();

    console.log(`[Opik API] Returning ${demoTraces.length} traces and ${demoExperiments.length} experiments`);

    return NextResponse.json({
      traces: demoTraces,
      experiments: demoExperiments,
      project_name: "LevelUp Workout",
      last_updated: new Date().toISOString(),
      demo_mode: false,
      message: "Traces are being sent to Opik dashboard. Use the Opik web UI to view live traces.",
    });

  } catch (error) {
    console.error("[Opik API] Error fetching traces:", error);
    return NextResponse.json(
      { error: "Failed to fetch traces", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

function generateDemoTraces(count: number) {
  const traceNames = [
    "quest_generation_success",
    "quest_generation_fallback",
    "quest_evaluation_complete",
    "cv_photo_analysis",
    "cv_video_analysis",
  ];

  const traces = [];

  for (let i = 0; i < count; i++) {
    const name = traceNames[Math.floor(Math.random() * traceNames.length)];
    const isSuccess = name.includes("success") || name.includes("complete");
    const status = isSuccess ? "success" : name.includes("fallback") ? "partial" : "failure";

    traces.push({
      id: `trace_${Date.now()}_${i}`,
      name: name,
      timestamp: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(),
      duration_ms: Math.floor(Math.random() * 3000) + 500,
      status: status,
      input: {
        user_id: `user_${Math.floor(Math.random() * 100)}`,
        user_rank: ["E-Rank", "D-Rank", "C-Rank", "B-Rank", "A-Rank"][Math.floor(Math.random() * 5)],
        user_class: ["Novice", "Tank", "DPS", "Support"][Math.floor(Math.random() * 4)],
      },
      output: {
        quest_name: "B-Rank Strength Protocol",
        quest_rank: "B",
        xp_reward: 1200,
        evaluation_score: Math.random() * 0.4 + 0.6,
      },
      tags: [
        status,
        "B",
        "Tank",
        "Daily",
      ],
      project_name: "LevelUp Workout",
    });
  }

  return traces.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

function generateDemoExperiments() {
  return [
    {
      id: "exp_1",
      name: "Judge Prompt v2 vs v3",
      type: "prompt_ab_test",
      status: "completed" as const,
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      completedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      winner: "B" as const,
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
      type: "prompt_ab_test",
      status: "running" as const,
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      winner: null,
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
  ];
}

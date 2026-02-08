import { NextResponse } from "next/server";
import { createExperiment, getExperiments } from "@/server/actions/ab-testing-actions";
import { ExperimentConfigSchema } from "@/types/schemas";

export async function GET() {
  try {
    const experiments = await getExperiments();
    return NextResponse.json({ experiments });
  } catch (error) {
    console.error("[API] Error fetching experiments:", error);
    return NextResponse.json(
      { error: "Failed to fetch experiments" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = ExperimentConfigSchema.parse(body);
    
    const experiment = await createExperiment(validated);
    
    return NextResponse.json({ experiment }, { status: 201 });
  } catch (error: any) {
    console.error("[API] Error creating experiment:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create experiment" },
      { status: 400 }
    );
  }
}
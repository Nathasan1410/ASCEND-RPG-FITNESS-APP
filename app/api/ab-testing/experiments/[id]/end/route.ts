import { NextResponse } from "next/server";
import { endExperiment } from "@/server/actions/ab-testing-actions";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { winnerId } = await request.json();
    await endExperiment(params.id, winnerId);
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[API] Error ending experiment:", error);
    return NextResponse.json(
      { error: error.message || "Failed to end experiment" },
      { status: 400 }
    );
  }
}
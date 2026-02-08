import { seedABTestExperiments, clearABTestExperiments } from "@/server/actions/seed-ab-test-experiments";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;
    
    if (action === "seed") {
      const result = await seedABTestExperiments();
      return NextResponse.json(result);
    } else if (action === "clear") {
      const result = await clearABTestExperiments();
      return NextResponse.json(result);
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error: any) {
    console.error("[SeedAPI] Error:", error);
    return NextResponse.json({ error: error?.message || "Unknown error" }, { status: 500 });
  }
}

// Opik SDK Client for AI Observability & Tracing
// Based on AlterEgo's proven working implementation

import { Opik } from "opik";

// Singleton instance
let opikInstance: Opik | null = null;

export function getOpikClient(): Opik | null {
  if (!opikInstance) {
    if (!process.env.OPIK_API_KEY) {
      console.warn("[Opik] OPIK_API_KEY not set - Opik disabled");
      return null;
    }

    console.log("[Opik] Initializing Opik client...");
    opikInstance = new Opik({
      apiKey: process.env.OPIK_API_KEY,
      projectName: "ascend-fitness-rpg",
    });
    console.log("[Opik] ✓ Opik client initialized");
  }
  return opikInstance;
}

// Flush all pending traces
export async function flushOpik(): Promise<void> {
  if (opikInstance) {
    await opikInstance.flush();
    console.log("[Opik] ✓ Traces flushed");
  }
}

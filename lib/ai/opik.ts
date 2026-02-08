import { Opik } from "opik";

const apiKey = process.env.OPIK_API_KEY;

// Cache the client to avoid repeated initialization
let opikClient: any = null;

function getOpikClient() {
  if (opikClient) return opikClient;

  if (!apiKey) {
    console.warn("[Opik] OPIK_API_KEY not set");
    return null;
  }

  try {
    console.log("[Opik] Initializing Opik client...");
    
    opikClient = new Opik({ 
      apiKey,
      projectName: "Level Up Workout",
      workspaceName: "default",
    });
    
    console.log("[Opik] ✓ Opik client initialized successfully");
    console.log("[Opik] Project: Level Up Workout");
    
    return opikClient;
  } catch (error: any) {
    console.error("[Opik] ✗ Failed to initialize Opik client:", error);
    console.error("[Opik] Error code:", error?.code);
    console.error("[Opik] Error message:", error?.message);
    
    // Log the full stack for debugging
    if (error.stack) {
      console.error("[Opik] Stack trace:", error.stack);
    }
    
    throw error;
  }
}

export { getOpikClient };

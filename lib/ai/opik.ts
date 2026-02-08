const apiKey = process.env.OPIK_API_KEY;

// Cache the client to avoid repeated initialization
let opikClient: any = null;

async function getOpikClient() {
  if (opikClient) return opikClient;

  if (!apiKey) {
    console.warn("OPIK_API_KEY not set");
    return null;
  }

  try {
    console.log("[Opik] Initializing Opik client...");
    
    // Dynamic import of Opik SDK
    const opikModule: any = await import("opik");
    
    // Try to get the Opik constructor from various possible exports
    const Opik = opikModule.Opik || opikModule.default?.Opik || opikModule.default;
    
    if (!Opik) {
      console.error("[Opik] Could not find Opik constructor in module");
      console.error("[Opik] Available exports:", Object.keys(opikModule));
      throw new Error("Opik SDK not available");
    }
    
    opikClient = new Opik({ 
      apiKey,
      projectName: "Level Up Workout",
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

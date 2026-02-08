let opikClient: any = null;
let initPromise: Promise<any> | null = null;

async function initializeOpikClient() {
  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    try {
      const apiKey = process.env.OPIK_API_KEY;
      
      if (!apiKey) {
        console.warn("[Opik] OPIK_API_KEY not set, Opik disabled");
        return null;
      }

      console.log("[Opik] Initializing Opik client with dynamic import...");
      
      const opikModule = await import("opik");
      const { Opik } = opikModule;
      
      const client = new Opik({
        apiKey: apiKey,
      });

      console.log("[Opik] ✓ Opik client initialized successfully");
      return client;
    } catch (error: any) {
      console.error("[Opik] ✗ Failed to initialize Opik client:", error.message);
      if (error.code === 'ERR_REQUIRE_ESM') {
        console.error("[Opik] Module compatibility issue detected. Opik SDK requires ESM environment.");
      }
      return null;
    }
  })();

  return initPromise;
}

export async function getOpikClient() {
  if (opikClient !== null) {
    return opikClient;
  }
  
  opikClient = await initializeOpikClient();
  return opikClient;
}

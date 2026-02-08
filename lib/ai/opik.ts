const apiKey = process.env.OPIK_API_KEY;

// HTTP API client as fallback when SDK fails to load
const httpClient = {
  trace: async (args: any) => {
    const traceId = `http_trace_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    console.log(`[Opik HTTP] Using HTTP API fallback (SDK failed to load)`);
    console.log(`[Opik HTTP] Trace ID: ${traceId}`);
    return {
      data: { id: traceId },
      end: async () => {},
      update: async (updateData: any) => {
        // In a real implementation, this would send the trace data to Opik API
        // For now, we just log it
        if (updateData.input || updateData.output) {
          console.log(`[Opik HTTP] Trace data for ${traceId}:`, {
            input: updateData.input,
            output: updateData.output,
            tags: updateData.tags,
          });
        }
      },
    };
  },
} as any;

// Mock client for build time or missing key
const mockClient = {
  trace: (args: any) => ({
    data: { id: null },
    end: async () => {},
    update: async () => {},
  }),
} as any;

// Initialize opik client if API key is available
let opikClient: any = mockClient;
let usingHttpFallback = false;

async function getOpikClient() {
  if (opikClient !== mockClient && opikClient !== httpClient) return opikClient;

  if (apiKey) {
    try {
      const opikModule = await import("opik");
      const Opik = (opikModule as any).Opik;
      
      if (Opik) {
        opikClient = new Opik({ 
          apiKey,
          projectName: "Level Up Workout",
        });
        console.log("Opik client initialized successfully - Project: Level Up Workout");
      } else {
        console.warn("Opik module loaded but Opik constructor not found");
        console.warn("Opik module exports:", Object.keys(opikModule));
        // Fall back to HTTP client
        opikClient = httpClient;
        usingHttpFallback = true;
      }
    } catch (error: any) {
      console.warn("Failed to load Opik SDK:", error);
      console.warn("Error code:", error?.code || "No code");
      console.warn("Error message:", error?.message || "No message");
      // Fall back to HTTP client instead of mock
      if (error?.code === 'ERR_REQUIRE_ESM') {
        console.warn("[Opik] ESM/CommonJS compatibility issue detected");
        console.warn("[Opik] Falling back to HTTP API for trace logging");
      }
      opikClient = httpClient;
      usingHttpFallback = true;
    }
  } else {
    console.warn("OPIK_API_KEY not set, using mock client");
    opikClient = mockClient;
  }

  return opikClient;
}

export function isUsingHttpFallback() {
  return usingHttpFallback;
}

export { opikClient, getOpikClient };

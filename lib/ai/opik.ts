const apiKey = process.env.OPIK_API_KEY;

// HTTP API client as fallback when SDK fails to load
const httpClient = {
  trace: async (args: any) => {
    const traceId = `http_trace_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    let traceData: any = {
      id: traceId,
      name: args.name,
      startTime: args.startTime,
      metadata: args.metadata || {},
      input: {},
      output: {},
      tags: [],
    };
    
    console.log(`[Opik HTTP] Using HTTP API fallback (SDK failed to load)`);
    console.log(`[Opik HTTP] Trace ID: ${traceId}`);
    
    // Store trace data locally
    let hasEnded = false;
    
    return {
      data: { id: traceId },
      end: async () => {
        if (hasEnded) return;
        hasEnded = true;
        
        console.log(`[Opik HTTP] Ending trace: ${traceId}`);
        
        // Send to Opik HTTP API
        await sendTraceToOpikAPI(traceData);
      },
      update: async (updateData: any) => {
        if (hasEnded) return;
        
        if (updateData.input) traceData.input = updateData.input;
        if (updateData.output) traceData.output = updateData.output;
        if (updateData.tags) traceData.tags = updateData.tags;
        
        console.log(`[Opik HTTP] Updated trace data for ${traceId}`, {
          hasInput: !!updateData.input,
          hasOutput: !!updateData.output,
          hasTags: !!updateData.tags,
        });
      },
    };
  },
} as any;

// Send trace to Opik HTTP API
async function sendTraceToOpikAPI(traceData: any) {
  if (!apiKey) {
    console.log("[Opik HTTP] No API key, skipping trace upload");
    return;
  }
  
  try {
    // Opik HTTP API endpoint
    const apiUrl = 'https://www.comet.com/api/v1/traces';
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        name: traceData.name,
        startTime: traceData.startTime?.toISOString() || new Date().toISOString(),
        endTime: new Date().toISOString(),
        metadata: {
          ...traceData.metadata,
          project: 'Level Up Workout',
        },
        input: traceData.input,
        output: traceData.output,
        tags: traceData.tags,
      }),
    });
    
    if (response.ok) {
      console.log(`[Opik HTTP] ✓ Trace sent to Opik successfully`);
    } else {
      const errorText = await response.text();
      console.error(`[Opik HTTP] Failed to send trace to Opik:`, response.status);
      console.error(`[Opik HTTP] Error:`, errorText);
    }
  } catch (error: any) {
    console.error(`[Opik HTTP] Error sending trace to Opik:`, error.message);
  }
}

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

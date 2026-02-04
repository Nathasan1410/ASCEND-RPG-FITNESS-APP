const apiKey = process.env.OPIK_API_KEY;

// Mock client for build time or missing key
const mockClient = {
  trace: (args: any) => ({
    end: async () => {},
    update: async () => {},
  }),
} as any;

// Initialize opik client if API key is available
let opikClient: any = mockClient;

async function getOpikClient() {
  if (opikClient !== mockClient) return opikClient;
  
  if (apiKey) {
    try {
      const { Opik } = await import("opik");
      opikClient = new Opik({ apiKey });
    } catch (error) {
      console.warn("Failed to load Opik:", error);
    }
  }
  
  return opikClient;
}

export { opikClient, getOpikClient };

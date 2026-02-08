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
      if (Opik) {
        opikClient = new Opik({ 
          apiKey,
          projectName: "LevelUp Workout",
        });
        console.log("Opik client initialized successfully - Project: LevelUp Workout");
      } else {
        console.warn("Opik module loaded but Opik constructor not found");
      }
    } catch (error) {
      console.warn("Failed to load Opik:", error);
    }
  } else {
    console.warn("OPIK_API_KEY not set, using mock client");
  }

  return opikClient;
}

export { opikClient, getOpikClient };

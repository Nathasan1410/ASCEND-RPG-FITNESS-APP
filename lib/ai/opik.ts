import { Opik } from "opik";

const apiKey = process.env.OPIK_API_KEY;

// Mock client for build time or missing key
const mockClient = {
  trace: (args: any) => ({
    end: async () => {},
    update: async () => {},
  }),
} as any;

const opikClient = apiKey ? new Opik({
  apiKey: apiKey,
}) : mockClient;

export { opikClient };

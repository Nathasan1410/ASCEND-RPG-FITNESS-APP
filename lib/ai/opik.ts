// Opik SDK removed due to module compatibility issues with Next.js
// All traces now go to console logs only
// TODO: Re-enable when opik package fixes ESM/CommonJS compatibility

const apiKey = process.env.OPIK_API_KEY;

function getOpikClient() {
  if (apiKey) {
    console.warn("[Opik] OPIK_API_KEY is set but Opik SDK is disabled due to module compatibility issues");
  }
  return null;
}

export { getOpikClient };

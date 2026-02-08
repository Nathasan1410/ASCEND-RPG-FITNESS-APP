// Opik SDK disabled due to CommonJS/ESM compatibility issues
// TODO: Re-enable when opik package fixes module system compatibility

// const apiKey = process.env.OPIK_API_KEY;

// Cache the client to avoid repeated initialization
let opikClient: any = null;

function getOpikClient() {
  console.warn("[Opik] Opik SDK disabled due to module compatibility issues");
  return null;
}

export { getOpikClient };

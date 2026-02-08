// Opik SDK removed due to module compatibility issues with Next.js
// All traces now go to console logs only
// TODO: Re-enable when opik package fixes ESM/CommonJS compatibility

export async function sendTraceToOpik(traceName: string, data: {
  input?: any;
  output?: any;
  tags?: string[];
  startTime?: number;
}) {
  console.log(`[Opik] Trace: ${traceName}`, {
    input: data.input,
    output: data.output,
    tags: data.tags,
    timestamp: new Date().toISOString(),
  });
  return null;
}

export async function sendSpanToOpik(spanName: string, parentTrace: any, data: {
  output?: any;
  input?: any;
}) {
  console.log(`[Opik] Span: ${spanName}`, data);
  return null;
}

export function getOpikTags(data: any): string[] {
  const tags: string[] = [];  
  if (data.user_rank && data.user_rank !== 'undefined' && data.user_rank !== 'null') {
    tags.push(data.user_rank);
  }
  if (data.user_class && data.user_class !== 'undefined' && data.user_class !== 'null') {
    tags.push(data.user_class);
  }
  if (data.quest_type && data.quest_type !== 'undefined' && data.quest_type !== 'null') {
    tags.push(data.quest_type);
  }
  if (data.status && data.status !== 'undefined' && data.status !== 'null') {
    tags.push(data.status);
  }
  if (data.winner && data.winner !== 'undefined' && data.winner !== 'null') {
    tags.push(`winner_${data.winner}`);
  }
  
  return tags;
}

export async function sendMetricToOpik(metricName: string, value: number, metadata?: any) {
  console.log(`[Opik] Metric: ${metricName} = ${value}`, metadata);
}

export async function logErrorToOpik(errorName: string, inputError: any, inputContext?: any) {
  console.error(`[Opik] Error: ${errorName}`, {
    message: (inputError as any)?.message || "Unknown error",
    name: (inputError as any)?.name || "UnknownError",
    stack: (inputError as any)?.stack || "No stack trace available",
    context: inputContext,
    timestamp: new Date().toISOString(),
  });
}

export async function isOpikAvailable(): Promise<boolean> {
  return false;
}

export async function getOpikStatus(): Promise<{
  available: boolean;
  projectName: string | null;
  apiKeyPresent: boolean;
}> {
  return {
    available: false,
    projectName: null,
    apiKeyPresent: !!process.env.OPIK_API_KEY,
  };
}

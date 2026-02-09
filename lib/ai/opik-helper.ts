import { getOpikClient } from "./opik";

export async function sendTraceToOpik(traceName: string, data: {
  input?: any;
  output?: any;
  tags?: string[];
  startTime?: number;
}): Promise<{ traceId: string | null; trace: any | null }> {
  const client = getOpikClient();
  
  const filteredTags = (data.tags || []).filter((tag): tag is string => tag !== undefined && tag !== null);
  
  console.log(`[Opik] Trace: ${traceName}`, {
    input: data.input,
    output: data.output,
    tags: data.tags,
    timestamp: new Date().toISOString(),
  });

  if (!client) {
    console.log(`[Opik] Trace not sent: Opik client not available`);
    return { traceId: null, trace: null };
  }

  try {
    const trace = client.trace({
      name: traceName,
      input: data.input,
      output: data.output,
      tags: filteredTags,
    });
    
    console.log(`[Opik] ✓ Trace sent: ${traceName}`);
    return { traceId: (trace as any).id || null, trace: trace };
  } catch (error: any) {
    console.error(`[Opik] ✗ Failed to send trace ${traceName}:`, error.message);
    return { traceId: null, trace: null };
  }
}

export async function sendSpanToOpik(spanName: string, parentTrace: any, data: {
  output?: any;
  input?: any;
}) {
  const client = getOpikClient();
  
  console.log(`[Opik] Span: ${spanName}`, data);

  if (!client) {
    console.log(`[Opik] Span not sent: Opik client not available`);
    return null;
  }

  try {
    if (!parentTrace) {
      console.log(`[Opik] Span not sent: No parent trace`);
      return null;
    }
    
    const span = parentTrace.span({
      name: spanName,
      input: data.input,
      output: data.output,
    });
    
    console.log(`[Opik] ✓ Span sent: ${spanName}`);
    return span;
  } catch (error: any) {
    console.error(`[Opik] ✗ Failed to send span ${spanName}:`, error.message);
    return null;
  }
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
  const client = getOpikClient();
  
  console.log(`[Opik] Metric: ${metricName} = ${value}`, metadata);

  if (!client) {
    console.log(`[Opik] Metric not sent: Opik client not available`);
    return;
  }

  try {
    const trace = client.trace({
      name: `metric_${metricName}`,
      input: { metricName, value, metadata },
      output: { value },
      tags: ['metric'],
    });
    console.log(`[Opik] ✓ Metric sent: ${metricName}`);
  } catch (error: any) {
    console.error(`[Opik] ✗ Failed to send metric ${metricName}:`, error.message);
  }
}

export async function logErrorToOpik(errorName: string, inputError: any, inputContext?: any) {
  const client = getOpikClient();
  
  console.error(`[Opik] Error: ${errorName}`, {
    message: inputError?.message || "Unknown error",
    name: inputError?.name || "UnknownError",
    stack: inputError?.stack || "No stack trace available",
    context: inputContext,
    timestamp: new Date().toISOString(),
  });

  if (!client) {
    console.log(`[Opik] Error not logged: Opik client not available`);
    return;
  }

  try {
    const trace = client.trace({
      name: `error_${errorName}`,
      input: {
        errorName,
        errorMessage: inputError?.message || "Unknown error",
        errorStack: inputError?.stack || "No stack trace available",
        context: inputContext,
      },
      tags: ['error', 'failure'],
    });
    console.log(`[Opik] ✓ Error logged: ${errorName}`);
  } catch (error: any) {
    console.error(`[Opik] ✗ Failed to log error ${errorName}:`, error.message);
  }
}

export async function isOpikAvailable(): Promise<boolean> {
  const client = getOpikClient();
  return client !== null;
}

export async function logFeedbackScores(traceId: string, scores: Array<{
  name: string;
  value: number;
  reason?: string;
}>): Promise<boolean> {
  const client = getOpikClient();
  
  console.log(`[Opik] Feedback scores for trace ${traceId}:`, scores);

  if (!client) {
    console.log(`[Opik] Feedback scores not sent: Opik client not available`);
    return false;
  }

  try {
    client.logTracesFeedbackScores(scores.map(score => ({
      id: traceId,
      name: score.name,
      value: score.value,
      reason: score.reason || undefined,
    })));
    
    await client.flush();
    console.log(`[Opik] ✓ Feedback scores sent for trace ${traceId}`);
    return true;
  } catch (error: any) {
    console.error(`[Opik] ✗ Failed to log feedback scores for trace ${traceId}:`, error.message);
    return false;
  }
}

export async function getOpikStatus(): Promise<{
  available: boolean;
  projectName: string | null;
  apiKeyPresent: boolean;
}> {
  const client = getOpikClient();
  return {
    available: client !== null,
    projectName: client ? "ascend-fitness-rpg" : null,
    apiKeyPresent: !!process.env.OPIK_API_KEY,
  };
}

import { getOpikClient } from "./opik";

export async function sendTraceToOpik(traceName: string, data: {
  input?: any;
  output?: any;
  tags?: string[];
  startTime?: number;
}) {
  const client = await getOpikClient();
  
  console.log(`[Opik] Trace: ${traceName}`, {
    input: data.input,
    output: data.output,
    tags: data.tags,
    timestamp: new Date().toISOString(),
  });

  if (!client || typeof client.trace !== 'function') {
    console.log(`[Opik] Trace not sent: Opik client not available`);
    return null;
  }

  try {
    const trace = client.trace({
      name: traceName,
      input: data.input,
      output: data.output,
      tags: data.tags,
    });
    
    if (data.startTime) {
      trace.update({ startTime: data.startTime });
    }
    
    trace.end();
    console.log(`[Opik] ✓ Trace sent: ${traceName}`);
    return trace;
  } catch (error: any) {
    console.error(`[Opik] ✗ Failed to send trace ${traceName}:`, error.message);
    return null;
  }
}

export async function sendSpanToOpik(spanName: string, parentTrace: any, data: {
  output?: any;
  input?: any;
}) {
  const client = await getOpikClient();
  
  console.log(`[Opik] Span: ${spanName}`, data);

  if (!client) {
    console.log(`[Opik] Span not sent: Opik client not available`);
    return null;
  }

  try {
    if (!parentTrace || typeof parentTrace.span !== 'function') {
      console.log(`[Opik] Span not sent: No valid parent trace`);
      return null;
    }
    
    const span = parentTrace.span({
      name: spanName,
      input: data.input,
      output: data.output,
    });
    
    span.end();
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
  const client = await getOpikClient();
  
  console.log(`[Opik] Metric: ${metricName} = ${value}`, metadata);

  if (!client) {
    console.log(`[Opik] Metric not sent: Opik client not available`);
    return;
  }

  try {
    if (typeof client.trace === 'function') {
      const trace = client.trace({
        name: `metric_${metricName}`,
        input: { metricName, value, metadata },
        output: { value },
        tags: ['metric'],
      });
      trace.end();
    }
  } catch (error: any) {
    console.error(`[Opik] ✗ Failed to send metric ${metricName}:`, error.message);
  }
}

export async function logErrorToOpik(errorName: string, inputError: any, inputContext?: any) {
  const client = await getOpikClient();
  
  console.error(`[Opik] Error: ${errorName}`, {
    message: (inputError as any)?.message || "Unknown error",
    name: (inputError as any)?.name || "UnknownError",
    stack: (inputError as any)?.stack || "No stack trace available",
    context: inputContext,
    timestamp: new Date().toISOString(),
  });

  if (!client) {
    console.log(`[Opik] Error not logged: Opik client not available`);
    return;
  }

  try {
    if (typeof client.trace === 'function') {
      const trace = client.trace({
        name: `error_${errorName}`,
        input: {
          errorName,
          errorMessage: (inputError as any)?.message || "Unknown error",
          errorStack: (inputError as any)?.stack || "No stack trace available",
          context: inputContext,
        },
        tags: ['error', 'failure'],
      });
      trace.end();
    }
  } catch (error: any) {
    console.error(`[Opik] ✗ Failed to log error ${errorName}:`, error.message);
  }
}

export async function isOpikAvailable(): Promise<boolean> {
  const client = await getOpikClient();
  return client !== null;
}

export async function getOpikStatus(): Promise<{
  available: boolean;
  projectName: string | null;
  apiKeyPresent: boolean;
}> {
  const client = await getOpikClient();
  return {
    available: client !== null,
    projectName: null,
    apiKeyPresent: !!process.env.OPIK_API_KEY,
  };
}

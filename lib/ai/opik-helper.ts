import { getOpikClient } from "./opik";

/**
 * Opik Helper Functions
 * Ensures traces are properly sent to Opik dashboard
 */

export async function sendTraceToOpik(traceName: string, data: {
  input?: any;
  output?: any;
  tags?: string[];
  startTime?: number;
}) {
  try {
    const client = await getOpikClient();
    
    // Create trace with start time if provided
    // IMPORTANT: startTime must be a Date object, not a timestamp number
    const trace = await client.trace({
      name: traceName,
      startTime: data.startTime ? new Date(data.startTime) : undefined,
      metadata: {
        project: "LevelUp Workout",
        environment: process.env.NODE_ENV || "development",
      }
    });

    // Update with input/output
    if (data.input || data.output) {
      await trace.update({
        input: data.input,
        output: data.output,
        tags: data.tags || [],
      });
    }

    // End the trace to send it to Opik
    await trace.end();

    console.log(`[Opik] ✓ Successfully sent trace: ${traceName}`);
    console.log(`[Opik] Trace ID: ${trace.data?.id || 'N/A'}`);
    
    return trace;
  } catch (error) {
    console.error(`[Opik] ✗ Failed to send trace: ${traceName}`, error);
    console.log(`[Opik Fallback] Trace data:`, data);
    
    // Fallback: Log to console for debugging
    console.log(`[Opik Trace] ${traceName}:`, {
      name: traceName,
      input: data.input,
      output: data.output,
      tags: data.tags,
      timestamp: new Date().toISOString(),
    });
    
    return null;
  }
}

export async function sendSpanToOpik(spanName: string, parentTrace: any, data: {
  output?: any;
  metadata?: any;
}) {
  try {
    if (!parentTrace) {
      console.warn(`[Opik] Cannot send span ${spanName} without parent trace`);
      return null;
    }

    // IMPORTANT: startTime must be a Date object
    const span = await parentTrace.span({
      name: spanName,
      startTime: new Date(),
    });

    if (data.output || data.metadata) {
      await span.update({
        output: data.output,
        metadata: data.metadata,
      });
    }

    await span.end();

    console.log(`[Opik] ✓ Successfully sent span: ${spanName}`);
    
    return span;
  } catch (error) {
    console.error(`[Opik] ✗ Failed to send span: ${spanName}`, error);
    return null;
  }
}

export function getOpikTags(data: any): string[] {
  const tags: string[] = [];
  
  if (data.user_rank) tags.push(data.user_rank);
  if (data.user_class) tags.push(data.user_class);
  if (data.quest_type) tags.push(data.quest_type);
  if (data.status) tags.push(data.status);
  if (data.winner) tags.push(`winner_${data.winner}`);
  
  return tags;
}

export async function sendMetricToOpik(metricName: string, value: number, metadata?: any) {
  try {
    const client = await getOpikClient();
    
    await client.metric(metricName, value, {
      metadata: {
        ...metadata,
        project: "LevelUp Workout",
        environment: process.env.NODE_ENV || "development",
      }
    });

    console.log(`[Opik] ✓ Successfully sent metric: ${metricName} = ${value}`);
  } catch (error) {
    console.error(`[Opik] ✗ Failed to send metric: ${metricName}`, error);
  }
}

export async function logErrorToOpik(errorName: string, error: Error, context?: any) {
  try {
    const client = await getOpikClient();
    
    await client.trace({
      name: `error_${errorName}`,
      input: {
        error_message: error.message,
        error_stack: error.stack,
        context: context,
        timestamp: new Date().toISOString(),
      },
      tags: ["error", errorName],
    });

    console.log(`[Opik] ✓ Successfully logged error: ${errorName}`);
  } catch (traceError) {
    console.error(`[Opik] ✗ Failed to log error: ${errorName}`, traceError);
  }
}

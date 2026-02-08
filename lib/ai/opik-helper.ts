import { getOpikClient } from "./opik";

/**
 * Opik Helper Functions
 * Ensures traces are properly sent to Opik dashboard with improved error handling
 */

// Track trace creation attempts
const traceAttempts = new Map<string, number>();

// Max retry attempts for failed traces
const MAX_RETRY_ATTEMPTS = 2;

/**
 * Send trace to Opik with retry logic and better error handling
 */
export async function sendTraceToOpik(traceName: string, data: {
  input?: any;
  output?: any;
  tags?: string[];
  startTime?: number;
}) {
  const attemptKey = `${traceName}_${Date.now()}`;
  let attempt = (traceAttempts.get(attemptKey) || 0) + 1;
  traceAttempts.set(attemptKey, attempt);
  
  console.log(`[Opik] Attempt ${attempt}/${MAX_RETRY_ATTEMPTS} to send trace: ${traceName}`);
  
  try {
    const client = await getOpikClient();
    
    if (!client || typeof client.trace !== 'function') {
      console.error("[Opik] Client not properly initialized");
      throw new Error("Opik client not initialized properly");
    }
    
    // Create trace with input/output directly
    const trace = client.trace({
      name: traceName,
      input: data.input,
      output: data.output,
    });
    
    console.log(`[Opik] ✓ Successfully sent trace: ${traceName}`);
    
    // End trace to send it to Opik
    trace.end();
    
    // Clear attempt tracking on success
    traceAttempts.delete(attemptKey);
    
    return trace;
  } catch (error: any) {
    console.error(`[Opik] ✗ Failed to send trace: ${traceName}`, error);
    
    // Retry if we haven't hit max attempts and it's a retryable error
    if (attempt < MAX_RETRY_ATTEMPTS && isRetryableError(error)) {
      console.log(`[Opik] Retrying trace send (attempt ${attempt + 1}/${MAX_RETRY_ATTEMPTS})`);
      await new Promise(resolve => setTimeout(resolve, 500 * attempt));
      return sendTraceToOpik(traceName, data);
    }
    
    // Fallback: Log to console for debugging
    console.log(`[Opik Fallback] Trace data:`, {
      name: traceName,
      input: data.input,
      output: data.output,
      tags: data.tags,
      timestamp: new Date().toISOString(),
      attempt: attempt,
      error: error.message,
    });
    
    // Clear attempt tracking
    traceAttempts.delete(attemptKey);
    
    return null;
  }
}

export async function sendSpanToOpik(spanName: string, parentTrace: any, data: {
  output?: any;
  input?: any;
}) {
  try {
    if (!parentTrace) {
      console.warn(`[Opik] Cannot send span ${spanName} without parent trace`);
      return null;
    }
    
    const span = parentTrace.span({
      name: spanName,
      type: "general",
      input: data.input,
      output: data.output,
    });
    
    span.end();
    
    console.log(`[Opik] ✓ Successfully sent span: ${spanName}`);
    
    return span;
  } catch (error: any) {
    console.error(`[Opik] ✗ Failed to send span: ${spanName}`, error);
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
  try {
    const client = await getOpikClient();
    
    if (!client) {
      console.error("[Opik] Client not properly initialized for metric");
      return;
    }
    
    const trace = client.trace({
      name: `metric_${metricName}`,
      input: {
        metric_name: metricName,
        value,
        ...metadata,
      },
    });
    
    trace.end();
    
    console.log(`[Opik] ✓ Successfully sent metric: ${metricName} = ${value}`);
  } catch (error: any) {
    console.error(`[Opik] ✗ Failed to send metric: ${metricName}`, error);
  }
}

export async function logErrorToOpik(errorName: string, inputError: any, inputContext?: any) {
  try {
    const client = await getOpikClient();
    
    if (!client) {
      console.error("[Opik] Client not properly initialized for error logging");
      console.error(`[Error] ${errorName}:`, inputError.message);
      return;
    }
    
    const errorContext = {
      error_message: (inputError as any)?.message || "Unknown error",
      error_name: (inputError as any)?.name || "UnknownError",
      error_stack: (inputError as any)?.stack ? (inputError as any).stack.substring(0, 2000) : "No stack trace available",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
      ...inputContext,
    };
    
    const trace = client.trace({
      name: `error_${errorName}`,
      input: errorContext,
    });
    
    trace.end();
    
    console.log(`[Opik] ✓ Successfully logged error: ${errorName}`);
  } catch (traceError: any) {
    console.error(`[Opik] ✗ Failed to log error: ${errorName}`, traceError);
    console.error("[Opik] Original error:", (inputError as any)?.message);
    
    console.error(`[ERROR] ${errorName}:`, {
      message: (inputError as any)?.message || "Unknown error",
      name: (inputError as any)?.name || "UnknownError",
      stack: (inputError as any)?.stack || "No stack trace available",
      context: inputContext,
      timestamp: new Date().toISOString(),
    });
  }
}

function isRetryableError(error: any): boolean {
  if (!error) return false;
  
  const message = error.message || '';
  const lowerMessage = message.toLowerCase();
  
  return (
    lowerMessage.includes('network') ||
    lowerMessage.includes('timeout') ||
    lowerMessage.includes('econnrefused') ||
    lowerMessage.includes('etimedout') ||
    lowerMessage.includes('fetch failed') ||
    error.code === 'ECONNRESET' ||
    error.code === 'ETIMEDOUT' ||
    error.code === 'ENETUNREACH'
  );
}

export async function isOpikAvailable(): Promise<boolean> {
  try {
    const client = await getOpikClient();
    return client !== null && typeof client.trace === 'function';
  } catch (error: any) {
    console.error("[Opik] Failed to check availability:", error);
    return false;
  }
}

export async function getOpikStatus(): Promise<{
  available: boolean;
  projectName: string | null;
  apiKeyPresent: boolean;
}> {
  try {
    const apiKey = process.env.OPIK_API_KEY;
    const available = await isOpikAvailable();
    
    return {
      available,
      projectName: available ? "Level Up Workout" : null,
      apiKeyPresent: !!apiKey,
    };
  } catch (error: any) {
    console.error("[Opik] Failed to get status:", error);
    return {
      available: false,
      projectName: null,
      apiKeyPresent: !!process.env.OPIK_API_KEY,
    };
  }
}

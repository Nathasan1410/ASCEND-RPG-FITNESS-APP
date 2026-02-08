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
    
    // Check if client is initialized properly
    if (!client || typeof client.trace !== 'function') {
      console.error("[Opik] Client not properly initialized");
      console.error("[Opik] Client type:", typeof client);
      console.error("[Opik] Has trace function:", typeof client?.trace);
      throw new Error("Opik client not initialized properly");
    }
    
    // Create trace with start time if provided
    // IMPORTANT: startTime must be a Date object, not a timestamp number
    const traceStart = data.startTime ? new Date(data.startTime) : undefined;
    console.log("[Opik] Creating trace with start time:", traceStart);
    
    const trace = await client.trace({
      name: traceName,
      startTime: traceStart,
      metadata: {
        project: "LevelUp Workout",
        environment: process.env.NODE_ENV || "development",
        build_version: process.env.npm_package_version || "unknown",
        attempt: attempt.toString(),
      }
    });
    
    console.log("[Opik] Trace created with ID:", trace.data?.id || 'N/A');
    
    // Update with input/output if provided
    if (data.input || data.output) {
      console.log("[Opik] Updating trace with input/output");
      await trace.update({
        input: data.input,
        output: data.output,
        tags: data.tags || [],
      });
      console.log("[Opik] Trace updated successfully");
    }
    
    // End trace to send it to Opik
    console.log("[Opik] Ending trace to send to Opik dashboard");
    await trace.end();
    
    console.log(`[Opik] ✓ Successfully sent trace: ${traceName}`);
    console.log(`[Opik] ✓ Trace ID: ${trace.data?.id || 'N/A'}`);
    
    // Clear attempt tracking on success
    traceAttempts.delete(attemptKey);
    
    return trace;
  } catch (error: any) {
    console.error(`[Opik] ✗ Failed to send trace: ${traceName}`, error);
    console.error("[Opik] Error name:", error.name);
    console.error("[Opik] Error message:", error.message);
    
    // Retry if we haven't hit max attempts and it's a retryable error
    if (attempt < MAX_RETRY_ATTEMPTS && isRetryableError(error)) {
      console.log(`[Opik] Retrying trace send (attempt ${attempt + 1}/${MAX_RETRY_ATTEMPTS})`);
      await new Promise(resolve => setTimeout(resolve, 500 * attempt)); // Exponential backoff
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

/**
 * Check if an error is retryable (network, timeout, etc.)
 */
function isRetryableError(error: any): boolean {
  if (!error) return false;
  
  const message = error.message || '';
  const lowerMessage = message.toLowerCase();
  
  // Retryable errors
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
    console.log(`[Opik] ✓ Span parent trace ID: ${parentTrace.data?.id || 'N/A'}`);
    
    return span;
  } catch (error: any) {
    console.error(`[Opik] ✗ Failed to send span: ${spanName}`, error);
    return null;
  }
}

/**
 * Get Opik tags from data with better filtering
 */
export function getOpikTags(data: any): string[] {
  const tags: string[] = [];
  
  // Only add tags that have non-empty values
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

/**
 * Send metric to Opik with improved error handling
 */
export async function sendMetricToOpik(metricName: string, value: number, metadata?: any) {
  try {
    const client = await getOpikClient();
    
    // Check if client is initialized properly
    if (!client || typeof client.metric !== 'function') {
      console.error("[Opik] Client not properly initialized for metric");
      throw new Error("Opik client not initialized properly");
    }
    
    await client.metric(metricName, value, {
      metadata: {
        ...metadata,
        project: "LevelUp Workout",
        environment: process.env.NODE_ENV || "development",
        timestamp: new Date().toISOString(),
      }
    });
    
    console.log(`[Opik] ✓ Successfully sent metric: ${metricName} = ${value}`);
  } catch (error: any) {
    console.error(`[Opik] ✗ Failed to send metric: ${metricName}`, error);
    console.error("[Opik] Error details:", error.message);
  }
}

/**
 * Log error to Opik with better error handling and context
 */
export async function logErrorToOpik(errorName: string, inputError: Error, inputContext?: any) {
  try {
    const client = await getOpikClient();
    
    // Check if client is initialized properly
    if (!client || typeof client.trace !== 'function') {
      console.error("[Opik] Client not properly initialized for error logging");
      console.error(`[Error] ${errorName}:`, inputError.message);
      return;
    }
    
    // Build error context
    const errorContext = {
      error_message: inputError.message,
      error_name: inputError.name,
      error_stack: inputError.stack ? inputError.stack.substring(0, 2000) : 'No stack trace available',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
      ...inputContext,
    };
    
    await client.trace({
      name: `error_${errorName}`,
      startTime: new Date(),
      input: errorContext,
      tags: ["error", errorName, "production_error"],
    });
    
    console.log(`[Opik] ✓ Successfully logged error: ${errorName}`);
    console.log(`[Opik] ✓ Error trace ID will be available in dashboard`);
  } catch (traceError: any) {
    console.error(`[Opik] ✗ Failed to log error: ${errorName}`, traceError);
    console.error("[Opik] Original error:", inputError.message);
    
    // Fallback: Log to console
    console.error(`[ERROR] ${errorName}:`, {
      message: inputError.message,
      name: inputError.name,
      stack: inputError.stack,
      context: inputContext,
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * Utility function to check if Opik is available
 */
export async function isOpikAvailable(): Promise<boolean> {
  try {
    const client = await getOpikClient();
    return client !== null && typeof client.trace === 'function';
  } catch (error: any) {
    console.error("[Opik] Failed to check availability:", error);
    return false;
  }
}

/**
 * Utility function to get Opik client status
 */
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
      projectName: available ? "LevelUp Workout" : null,
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

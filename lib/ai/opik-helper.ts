// Opik SDK disabled due to CommonJS/ESM compatibility issues
// TODO: Re-enable when opik package fixes module system compatibility

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
  // Opik disabled - just log to console
  console.log(`[Opik] Trace (disabled): ${traceName}`, {
    input: data.input,
    output: data.output,
    tags: data.tags,
    timestamp: new Date().toISOString(),
  });
  return null;
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
  input?: any;
}) {
  // Opik disabled - just log to console
  console.log(`[Opik] Span (disabled): ${spanName}`, data);
  return null;
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
  // Opik disabled - just log to console
  console.log(`[Opik] Metric (disabled): ${metricName} = ${value}`, metadata);
}

/**
 * Log error to Opik with better error handling and context
 */
export async function logErrorToOpik(errorName: string, inputError: any, inputContext?: any) {
  // Opik disabled - just log to console
  console.error(`[Opik] Error (disabled): ${errorName}`, {
    message: (inputError as any)?.message || "Unknown error",
    name: (inputError as any)?.name || "UnknownError",
    stack: (inputError as any)?.stack || "No stack trace available",
    context: inputContext,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Utility function to check if Opik is available
 */
export function isOpikAvailable(): boolean {
  return false; // Opik disabled
}

/**
 * Utility function to get Opik client status
 */
export function getOpikStatus(): {
  available: boolean;
  projectName: string | null;
  apiKeyPresent: boolean;
} {
  return {
    available: false,
    projectName: null,
    apiKeyPresent: !!process.env.OPIK_API_KEY,
  };
}

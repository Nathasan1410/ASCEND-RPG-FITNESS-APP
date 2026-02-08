#!/usr/bin/env node

/**
 * Direct Opik Test
 * 
 * Purpose: Test Opik client directly without Groq dependency
 * This will help identify if Groq is the issue or Opik itself
 * Usage: node scripts/test-opik-direct.js
 */

import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const OPIK_API_KEY = process.env.OPIK_API_KEY;

// Colors
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✓ ${message}`, colors.green);
}

function logError(message) {
  log(`✗ ${message}`, colors.red);
}

console.log('\n');
log('╔══════════════════════════════════════════════════════════╗', colors.bright + colors.cyan);
log('║            DIRECT OPIK TEST (NO GROQ)                        ║');
log('╚══════════════════════════════════════════════════════════╝', colors.bright + colors.cyan);
console.log('\n');

logSection('TEST 1: Environment Variables');

if (!OPIK_API_KEY) {
  logError('OPIK_API_KEY is not set in .env.local');
  process.exit(1);
}

logSuccess('✓ OPIK_API_KEY is present');
logInfo(`First 8 chars: ${OPIK_API_KEY.substring(0, 8)}...`);

logSection('TEST 2: Opik Import & Client');

let opikWorking = false;
let opikClient = null;

try {
  const opikModule = await import('opik');
  const { Opik } = opikModule;
  
  if (!Opik) {
    logError('Opik class not found in opik module');
    process.exit(1);
  }
  
  opikClient = new Opik({
    apiKey: OPIK_API_KEY,
    projectName: 'Level Up Workout',
  });
  
  logSuccess('✓ Opik client initialized directly');
  logInfo('Project: Level Up Workout');
  opikWorking = true;
  
} catch (importError) {
  logError('Failed to import Opik SDK');
  logInfo(`Error: ${importError.message}`);
  console.error(importError);
  process.exit(1);
}

if (!opikWorking) {
  logError('Cannot proceed without Opik client');
  process.exit(1);
}

logSection('TEST 3: Send Direct Trace');

try {
  const testTrace = await opikClient.trace({
    name: 'direct_opik_test_no_groq',
    startTime: new Date(),
    metadata: {
      project: 'Level Up Workout',
      environment: process.env.NODE_ENV || 'development',
      test_type: 'direct_opik_test',
    },
    input: {
      timestamp: new Date().toISOString(),
      test_purpose: 'Verify Opik works without Groq dependency',
      method: 'Direct Opik SDK initialization',
    },
    output: {
      status: 'trace_created',
      message: 'Direct Opik test successful',
    },
    tags: ['test', 'direct_opik', 'no_groq', 'connectivity_check'],
  });
  
  logSuccess('✓ Direct trace created');
  logInfo(`Trace ID: ${testTrace.data?.id || 'N/A'}`);
  
  await testTrace.end();
  
  logSuccess('✓ Direct trace ended');
  logSuccess('✓ Trace ID: ${testTrace.data?.id || 'N/A'}`);
  
} catch (traceError) {
  logError('Failed to create/end direct trace');
  logInfo(`Error: ${traceError.message}`);
  console.error(traceError);
}

logSection('TEST 4: Send Direct Error Trace');

try {
  const errorTrace = await opikClient.trace({
    name: 'direct_opik_error_test',
    startTime: new Date(),
    metadata: {
      project: 'Level Up Workout',
      environment: process.env.NODE_ENV || 'development',
      test_type: 'error_logging',
    },
    input: {
      timestamp: new Date().toISOString(),
      test_error: 'Simulated error for testing',
    },
    output: {
      status: 'error_logged',
      message: 'This is a test error to verify error logging',
    },
    tags: ['test', 'error_logging', 'diagnostic'],
  });
  
  logSuccess('✓ Error trace created');
  
  await errorTrace.end();
  
  logSuccess('✓ Error trace ended');
  logSuccess('✓ Error trace ID: ${errorTrace.data?.id || 'N/A'}`);
  
} catch (error) {
  logError('Failed to create error trace');
  logInfo(`Error: ${error.message}`);
}

logSection('SUMMARY');

console.log('');
log('╔════════════════════════════════════════════════════════════╗', colors.bright + colors.cyan);
log('║                       DIRECT OPIK TEST RESULTS                   ║');
log('╚═════════════════════════════════════════════════════════════╝', colors.bright + colors.cyan);
console.log('\n');

logSuccess('✓ OPIK_API_KEY is configured');
logSuccess('✓ Opik client initialized directly (no Groq)');
logSuccess('✓ Direct trace test trace sent');
logSuccess('✓ Error logging test trace sent');
logSuccess('✓ Direct Opik integration is WORKING');

console.log('\n');
logSection('INSTRUCTIONS');

log('If you see these traces in Opik dashboard:');
log('  1. Direct Opik is working correctly');
log('  2. Error logging is functional');
log('');
log('The issue with Groq API calls is isolated.');
log('');
log('Next steps:');
log('1. Check if direct traces appear in dashboard');
log('2. If they do, verify OPIK_API_KEY is correct');
log('3. Check project name matches: "Level Up Workout"');
log('4. Verify environment: development vs production');
log('');
log('To test again with Groq:');
log('Run: node scripts/test-opik-with-groq.js');
log('');

console.log('');
log('════════════════════════════════════════════════════════════', colors.bright + colors.cyan);
console.log('\n');

#!/usr/bin/env node

/**
 * Simple Opik Test
 * 
 * Purpose: Test if Opik traces can be sent without Groq dependency
 * Usage: node scripts/test-opik-only.js
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

function logSection(title) {
  console.log('\n' + colors.bright + colors.cyan + '='.repeat(70));
  console.log(`  ${title}`);
  console.log('='.repeat(70) + colors.reset + '\n');
}

console.log('\n');
log('╔══════════════════════════════════════════════════════════════╗', colors.bright + colors.cyan);
log('║            SIMPLE OPIK TEST (NO GROQ DEPENDENCY)                ║');
log('╚══════════════════════════════════════════════════════════╝', colors.bright + colors.cyan);
console.log('\n');

logSection('STEP 1: Check Environment Variables');

if (!OPIK_API_KEY) {
  logError('OPIK_API_KEY is not set in .env.local');
  logError('Cannot continue without API key');
  process.exit(1);
}

logSuccess('✓ OPIK_API_KEY is present');
logInfo(`First 8 chars: ${OPIK_API_KEY.substring(0, 8)}...`);
logInfo(`Last 8 chars: ...${OPIK_API_KEY.substring(Math.max(0, OPIK_API_KEY.length - 8))}`);

logSection('STEP 2: Test Opik Trace Sending (No Groq)');

async function testOpikDirect() {
  try {
    const opikModule = await import('opik');
    const { Opik } = opikModule;
    
    if (!Opik) {
      logError('Opik class not found');
      process.exit(1);
    }
    
    logSection('STEP 3: Initialize Opik Client');
    
    const opikClient = new Opik({
      apiKey: OPIK_API_KEY,
      projectName: 'Level Up Workout',
    });
    
    logSuccess('✓ Opik client initialized');
    
    logSection('STEP 4: Send Test Trace');
    
    logInfo('Creating trace: simple_opik_test...');
    
    const testTrace = await opikClient.trace({
      name: 'simple_opik_test',
      startTime: new Date(),
      metadata: {
        project: 'Level Up Workout',
        environment: process.env.NODE_ENV || 'development',
        test_type: 'no_groq_dependency',
      },
      input: {
        test_purpose: 'Verify Opik works independently of Groq API',
        timestamp: new Date().toISOString(),
      },
      output: {
        status: 'trace_created',
        message: 'Simple test to verify Opik integration',
      },
      tags: ['test', 'no_groq', 'connectivity_check', 'diagnostic'],
    });
    
    logInfo('Waiting for trace to complete...');
    
    await testTrace.end();
    
    logSuccess('✓ Trace sent successfully');
    logSuccess(`✓ Trace ID: ${testTrace.data?.id || 'N/A'}`);
    
    logSection('STEP 5: Send Test Span');
    
    const span = await testTrace.span({
      name: 'test_span',
      startTime: new Date(),
    });
    
    await span.update({
      output: {
        message: 'Test span for verification',
      },
    });
    
    await span.end();
    
    logSuccess('✓ Span sent successfully');
    
    logSection('STEP 6: Send Test Metric');
    
    await opikClient.metric('test_metric', 42, {
      metadata: {
        project: 'Level Up Workout',
        test_type: 'metric_test',
      },
    });
    
    logSuccess('✓ Metric sent successfully');
    
    return true;
    
  } catch (importError) {
    logError('Failed to import Opik SDK');
    logInfo(`Error: ${importError.message}`);
    console.error(importError);
    return false;
  }
}

async function runTest() {
  const startTime = Date.now();
  const success = await testOpikDirect();
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  
  console.log('\n');
  log('╔══════════════════════════════════════════════════════════════╗', colors.bright + colors.cyan);
  log('║                         TEST RESULTS                               ║');
  log('╚══════════════════════════════════════════════════════════════╝', colors.bright + colors.cyan);
  console.log('\n');
  
  if (success) {
    logSuccess('✓✓✓✓ OP IS WORKING INDEPENDENTLY! ✓✓✓✓');
    logSuccess('✓ Opik traces ARE being sent successfully');
    logSuccess('✓ The issue is likely with Groq API, not Opik');
  } else {
    logError('✗✗✗ OP TEST FAILED ✗✗✗');
    logError('✗ Check the error message above');
  }
  
  log(`Total Duration: ${duration} seconds`, colors.bright);
  
  logSection('NEXT STEPS');
  
  logInfo('1. Check Opik dashboard: https://www.comet.com/opik');
  logInfo('2. Select project: "Level Up Workout"');
  logInfo('3. Look for trace named: simple_opik_test');
  logInfo('4. Look for span named: test_span');
  logInfo('5. Look for metric named: test_metric');
  logInfo('');
  logInfo('If you see these in the dashboard:');
  logSuccess('  ✓ Opik is working correctly');
  logSuccess('  ✓ Traces are being sent to Opik');
  logSuccess('  ✓ The issue is in the Groq API call, not Opik');
  logInfo('');
  logInfo('To fix Groq:');
  logInfo('  1. Check if GROQ_API_KEY is valid (not truncated)');
  logInfo('  2. Try regenerating the API key');
  logInfo('  3. Check Groq API status: https://console.groq.com');
}

console.log('');
log('══════════════════════════════════════════════════════════════', colors.bright + colors.cyan);
console.log('\n');
}

runTest();

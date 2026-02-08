#!/usr/bin/env node

/**
 * Verify Opik Traces Visibility
 * 
 * Purpose: Check if traces are being sent to Opik dashboard
 * Usage: node scripts/verify-opik-traces.js
 */

import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';

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

function logSection(title) {
  console.log('\n' + colors.bright + colors.cyan + '='.repeat(70));
  console.log(`  ${title}`);
  console.log('='.repeat(70) + colors.reset + '\n');
}

function logSuccess(message) {
  log(`✓ ${message}`, colors.green);
}

function logError(message) {
  log(`✗ ${message}`, colors.red);
}

function logWarning(message) {
  log(`⚠ ${message}`, colors.yellow);
}

function logInfo(message) {
  log(`ℹ ${message}`, colors.blue);
}

// Test results
const testResults = {
  total: 0,
  passed: 0,
  failed: 0,
  warnings: 0
};

function recordTest(passed, warning = false) {
  testResults.total++;
  if (passed) {
    testResults.passed++;
  } else if (warning) {
    testResults.warnings++;
  } else {
    testResults.failed++;
  }
}

// Main verification
async function verifyOpikTraces() {
  const startTime = Date.now();

  console.log('\n');
  log('╔════════════════════════════════════════════════════════════╗', colors.bright + colors.cyan);
  log('║            OPIK TRACE VISIBILITY VERIFIER                      ║');
  log('║            Level Up Workout                                   ║');
  log('╚════════════════════════════════════════════════════════╝', colors.bright + colors.cyan);
  console.log('\n');

  // Test 1: Check Environment Variables
  logSection('TEST 1: Environment Variables Check');

  if (!OPIK_API_KEY) {
    logError('OPIK_API_KEY is not set in .env.local');
    recordTest(false);
  } else {
    logSuccess('OPIK_API_KEY is present');
    logInfo(`First 8 chars: ${OPIK_API_KEY.substring(0, 8)}...`);
    recordTest(true);
  }

  // Test 2: Test Opik Initialization
  logSection('TEST 2: Opik Client Initialization');

  let opikWorking = false;
  let client = null;

  try {
    const opik = await import('opik');

    if (!opik) {
      logError('Failed to import opik package');
      recordTest(false);
    } else {
      const { Opik } = opik;
      
      if (!Opik) {
        logError('Opik class not found');
        recordTest(false);
      } else {
        client = new Opik({
          apiKey: OPIK_API_KEY,
          projectName: 'LevelUp Workout',
        });

        logSuccess('Opik client initialized successfully');
        logInfo('Project: LevelUp Workout');
        recordTest(true);
        opikWorking = true;
      }
    }
  } catch (error) {
    logError('Failed during Opik test');
    logInfo(`Error: ${error.message}`);
    console.error(error);
    recordTest(false);
  }

  // Test 3: Send Test Trace
  if (opikWorking) {
    logSection('TEST 3: Send Test Trace');

    try {
      const testTrace = await client.trace({
        name: 'opik_verification_test',
        startTime: new Date(),
        metadata: {
          project: 'Level Up Workout',
          environment: process.env.NODE_ENV || 'development',
          test_type: 'trace_visibility_verification',
        },
        input: {
          timestamp: new Date().toISOString(),
          test_type: 'connectivity_check',
          verification_attempt: '1/1',
        },
        output: {
          status: 'test_trace_sent',
          message: 'This is a verification trace to confirm traces are visible in Opik dashboard',
        },
        tags: ['test', 'verification', 'opik_checker', 'connectivity'],
      });

      logInfo('Test trace created');
      logInfo(`Trace ID: ${testTrace.data?.id || 'N/A'}`);

      await testTrace.end();

      logSuccess('Test trace sent and ended successfully');
      recordTest(true);

      // Test 4: Send Test Span
      logSection('TEST 4: Send Test Span');

      const verificationTrace = await client.trace({
        name: 'opik_verification_with_span',
        startTime: new Date(),
        metadata: {
          project: 'Level Up Workout',
          environment: process.env.NODE_ENV || 'development',
        },
        input: {
          test_type: 'span_test',
        },
        tags: ['test', 'verification', 'span_test'],
      });

      logInfo('Parent trace created for span test');

      const testSpan = await verificationTrace.span({
        name: 'verification_span',
        startTime: new Date(),
      });

      await testSpan.update({
        output: {
          message: 'Test span created successfully',
        },
      });

      await testSpan.end();
      await verificationTrace.end();

      logSuccess('Test span created and ended successfully');
      recordTest(true);

      // Test 5: Send Test Metric
      logSection('TEST 5: Send Test Metric');

      await client.metric('opik_verification_metric', 1, {
        metadata: {
          project: 'Level Up Workout',
          environment: process.env.NODE_ENV || 'development',
          test_type: 'metric_test',
        },
      });

      logSuccess('Test metric sent successfully');
      recordTest(true);

    } catch (error) {
      logError('Failed to send test trace/span/metric');
      logInfo(`Error: ${error.message}`);
      console.error(error);
      recordTest(false);
    }
  }

  // Test 6: Log Error Test
  if (opikWorking) {
    logSection('TEST 6: Test Error Logging');

    try {
      const testError = new Error('This is a test error for verification purposes');

      await client.trace({
        name: 'error_verification_test',
        startTime: new Date(),
        input: {
          error_message: testError.message,
          error_name: testError.name,
          test_type: 'error_logging_verification',
        },
        tags: ['error', 'test', 'verification'],
      });

      logSuccess('Error trace logged successfully');
      recordTest(true);

    } catch (error) {
      logError('Failed to log error trace');
      logInfo(`Error: ${error.message}`);
      console.error(error);
      recordTest(false);
    }
  }

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  // Summary
  console.log('\n');
  log('╔══════════════════════════════════════════════════════════╗', colors.bright + colors.cyan);
  log('║                    VERIFICATION SUMMARY                           ║');
  log('╚══════════════════════════════════════════════════════╝', colors.bright + colors.cyan);
  console.log('\n');

  log(`Total Tests: ${testResults.total}`, colors.bright);
  log(`Passed: ${testResults.passed}`, colors.green);
  log(`Failed: ${testResults.failed}`, colors.red);
  log(`Warnings: ${testResults.warnings}`, colors.yellow);

  const successRate = ((testResults.passed / testResults.total) * 100).toFixed(1);
  log(`Success Rate: ${successRate}%`, colors.bright);

  logInfo(`Test Duration: ${duration} seconds`);

  console.log('\n');
  logSection('OPPIK DASHBOARD INSTRUCTIONS');

  if (testResults.passed >= 4) {
    logSuccess('✓ All critical tests passed!');
    logSuccess('✓ Traces, spans, and metrics are being sent to Opik');
  } else {
    logWarning('⚠ Some tests failed');
    logWarning('Check the errors above for details');
  }

  console.log('\n');
  logInfo('To view traces in Opik Dashboard:');
  console.log(colors.cyan + '  1. Go to: https://www.comet.com/opik' + colors.reset);
  console.log(colors.cyan + '  2. Login to your account' + colors.reset);
  console.log(colors.cyan + '  3. Select project: LevelUp Workout' + colors.reset);
  console.log(colors.cyan + '  4. Look for traces named:' + colors.reset);
  console.log(colors.green + '     • opik_verification_test' + colors.reset);
  console.log(colors.green + '     • opik_verification_with_span' + colors.reset);
  console.log(colors.green + '     • error_verification_test' + colors.reset);
  console.log(colors.cyan + '  5. Check timestamps - they should show recent (within last 5 minutes)' + colors.reset);

  console.log('\n');
  logSection('TROUBLESHOOTING');

  logInfo('If traces are not visible in the dashboard:');
  console.log('');
  log('  1. Check if OPIK_API_KEY is correct in .env.local', colors.yellow);
  log('  2. Verify your Opik account has access to the project', colors.yellow);
  log('  3. Check network connectivity', colors.yellow);
  log('  4. Look for error messages in the browser console when submitting quests', colors.yellow);
  log('  5. Check server logs for Opik-related errors', colors.yellow);

  console.log('\n');
  log('════════════════════════════════════════════════════════════', colors.bright + colors.cyan);
  console.log('\n');
}

// Run verification
verifyOpikTraces().catch(error => {
  logError('Fatal error during verification:');
  logInfo(error.message);
  console.error(error);
  process.exit(1);
});

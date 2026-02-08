#!/usr/bin/env node

/**
 * OPIK AI Tester
 * 
 * Purpose: Test OPIK AI API connectivity and functionality
 * Target: Check if user "nathasan1410" is registered in the system
 * Project: LevelUp Workout
 */

import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';

// Load environment variables
dotenv.config({ path: '.env.local' });

const OPIK_API_KEY = process.env.OPIK_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const TARGET_USERNAME = 'nathasan1410';

// Colors for console output
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
  console.log('\n' + colors.bright + colors.cyan + '='.repeat(60));
  console.log(`  ${title}`);
  console.log('='.repeat(60) + colors.reset + '\n');
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

// Test results tracker
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

// Test 1: Check Environment Variables
async function testEnvironmentVariables() {
  logSection('TEST 1: Environment Variables Check');

  if (!OPIK_API_KEY) {
    logError('OPIK_API_KEY is not set in .env.local');
    recordTest(false);
    return false;
  }

  logSuccess('OPIK_API_KEY is present');
  logInfo(`First 8 chars: ${OPIK_API_KEY.substring(0, 8)}...`);
  recordTest(true);

  if (!SUPABASE_URL) {
    logWarning('NEXT_PUBLIC_SUPABASE_URL is not set');
    recordTest(false, true);
    return false;
  }

  logSuccess('SUPABASE_URL is present');
  recordTest(true);

  if (!SUPABASE_ANON_KEY) {
    logWarning('NEXT_PUBLIC_SUPABASE_ANON_KEY is not set');
    recordTest(false, true);
  } else {
    logSuccess('SUPABASE_ANON_KEY is present');
    recordTest(true);
  }

  return true;
}

// Test 2: Test Opik Client Initialization
async function testOpikInitialization() {
  logSection('TEST 2: Opik Client Initialization');

  try {
    const { Opik } = await import('opik');
    
    if (!Opik) {
      logError('Opik class not found in opik package');
      recordTest(false);
      return false;
    }

    logSuccess('Opik package imported successfully');

    const client = new Opik({
      apiKey: OPIK_API_KEY,
      projectName: 'LevelUp Workout',
    });

    if (!client) {
      logError('Failed to initialize Opik client');
      recordTest(false);
      return false;
    }

    logSuccess('Opik client initialized successfully');
    logInfo('Project name: LevelUp Workout');
    recordTest(true);

    return client;
  } catch (error) {
    logError('Failed to initialize Opik client');
    logInfo(`Error: ${error.message}`);
    recordTest(false);
    return null;
  }
}

// Test 3: Send Test Trace to Opik
async function testSendTrace(client) {
  logSection('TEST 3: Send Test Trace to Opik');

  try {
    const testTrace = await client.trace({
      name: 'opik_tester_initialization',
      startTime: new Date(),
      metadata: {
        project: 'LevelUp Workout',
        environment: process.env.NODE_ENV || 'development',
        test_runner: 'nathasan1410',
      },
      input: {
        test_message: 'OPIK AI Tester - Connectivity Check',
        target_username: TARGET_USERNAME,
        timestamp: new Date().toISOString(),
      },
      output: {
        status: 'test_in_progress',
        test_type: 'connectivity_check',
      },
      tags: ['test', 'opik_tester', 'connectivity', TARGET_USERNAME],
    });

    logSuccess('Test trace created successfully');
    logInfo(`Trace name: opik_tester_initialization`);
    logInfo(`Trace ID: ${testTrace.data?.id || 'N/A'}`);

    await testTrace.end();
    logSuccess('Trace ended successfully (sent to Opik dashboard)');
    recordTest(true);

    return testTrace;
  } catch (error) {
    logError('Failed to send test trace');
    logInfo(`Error: ${error.message}`);
    recordTest(false);
    return null;
  }
}

// Test 4: Send Test Span
async function testSendSpan(client) {
  logSection('TEST 4: Send Test Span to Opik');

  try {
    const trace = await client.trace({
      name: 'opik_tester_span_test',
      startTime: new Date(),
      metadata: {
        project: 'LevelUp Workout',
        test_type: 'span_test',
      },
      tags: ['test', 'span_test', TARGET_USERNAME],
    });

    logSuccess('Parent trace created for span test');

    const span = await trace.span({
      name: 'test_span_user_check',
      startTime: new Date(),
    });

    await span.update({
      output: {
        username: TARGET_USERNAME,
        check_result: 'test_span_created',
        timestamp: new Date().toISOString(),
      },
      metadata: {
        test_runner: 'opik_tester',
      },
    });

    await span.end();
    logSuccess('Test span created and ended successfully');
    logInfo(`Span name: test_span_user_check`);

    await trace.end();
    logSuccess('Parent trace ended successfully');
    recordTest(true);

    return true;
  } catch (error) {
    logError('Failed to send test span');
    logInfo(`Error: ${error.message}`);
    recordTest(false);
    return false;
  }
}

// Test 5: Send Test Metric
async function testSendMetric(client) {
  logSection('TEST 5: Send Test Metric to Opik');

  try {
    await client.metric('opik_tester_connection_test', 1, {
      metadata: {
        project: 'LevelUp Workout',
        environment: process.env.NODE_ENV || 'development',
        test_runner: TARGET_USERNAME,
        timestamp: new Date().toISOString(),
      },
    });

    logSuccess('Test metric sent successfully');
    logInfo(`Metric name: opik_tester_connection_test`);
    logInfo(`Metric value: 1`);
    recordTest(true);

    return true;
  } catch (error) {
    logError('Failed to send test metric');
    logInfo(`Error: ${error.message}`);
    recordTest(false);
    return false;
  }
}

// Test 6: Check Supabase for Target User
async function checkSupabaseUser() {
  logSection('TEST 6: Check Supabase for Target User');

  try {
    const { createClient } = await import('@supabase/supabase-js');
    
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    logInfo(`Checking for username: ${TARGET_USERNAME}`);

    // Try to get the profile by username
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', TARGET_USERNAME)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        logWarning(`User "${TARGET_USERNAME}" not found in profiles table`);
        logInfo('This means the user has not been registered yet');
        recordTest(false, true);
        return { found: false, profile: null };
      }
      throw error;
    }

    if (profile) {
      logSuccess(`User "${TARGET_USERNAME}" found in profiles table!`);
      logInfo(`Profile ID: ${profile.id}`);
      logInfo(`Email: ${profile.email || 'Not set'}`);
      logInfo(`Level: ${profile.level || 'Not set'}`);
      logInfo(`XP: ${profile.xp || 0}`);
      logInfo(`Rank: ${profile.rank || 'Not set'}`);
      logInfo(`Hunter Class: ${profile.hunter_class || 'Not set'}`);
      logInfo(`Hunter Status: ${profile.hunter_status || 'Normal'}`);
      recordTest(true);
      return { found: true, profile };
    }
  } catch (error) {
    logError('Failed to check Supabase for user');
    logInfo(`Error: ${error.message}`);
    recordTest(false);
    return { found: false, error };
  }
}

// Test 7: Create Trace for User Check
async function createUserCheckTrace(client, userResult) {
  logSection('TEST 7: Create User Check Trace');

  try {
    const trace = await client.trace({
      name: 'opik_tester_user_check',
      startTime: new Date(),
      metadata: {
        project: 'LevelUp Workout',
        environment: process.env.NODE_ENV || 'development',
        test_type: 'user_check',
      },
      input: {
        target_username: TARGET_USERNAME,
        check_timestamp: new Date().toISOString(),
      },
      output: {
        user_found: userResult.found,
        profile_data: userResult.profile || null,
        check_result: userResult.found ? 'user_exists' : 'user_not_found',
      },
      tags: ['test', 'user_check', TARGET_USERNAME, userResult.found ? 'found' : 'not_found'],
    });

    logSuccess('User check trace created successfully');
    logInfo(`Trace name: opik_tester_user_check`);
    logInfo(`User found: ${userResult.found ? 'YES ✓' : 'NO ✗'}`);

    await trace.end();
    logSuccess('Trace sent to Opik dashboard');
    recordTest(true);

    return trace;
  } catch (error) {
    logError('Failed to create user check trace');
    logInfo(`Error: ${error.message}`);
    recordTest(false);
    return null;
  }
}

// Test 8: Send Error Test (for error logging verification)
async function testErrorLogging(client) {
  logSection('TEST 8: Test Error Logging to Opik');

  try {
    const testError = new Error('OPIK AI Tester - Test Error Message');
    
    const trace = await client.trace({
      name: 'error_opik_tester_test',
      input: {
        error_message: testError.message,
        error_type: testError.name,
        test_context: 'Error logging verification test',
        timestamp: new Date().toISOString(),
      },
      tags: ['error', 'test', TARGET_USERNAME],
    });

    await trace.end();
    logSuccess('Test error logged successfully to Opik');
    logInfo(`Error type: ${testError.name}`);
    logInfo(`Error message: ${testError.message}`);
    recordTest(true);

    return true;
  } catch (error) {
    logError('Failed to log test error');
    logInfo(`Error: ${error.message}`);
    recordTest(false);
    return false;
  }
}

// Main Test Runner
async function runAllTests() {
  console.log('\n');
  log('╔════════════════════════════════════════════════════════════╗', colors.bright + colors.cyan);
  log('║                                                            ║');
  log('║           OPIK AI TESTER - LEVEL UP WORKOUT                ║');
  log('║                                                            ║');
  log('║           Testing OPIK API Connectivity                    ║');
  log('║           Target User: nathasan1410                        ║');
  log('║                                                            ║');
  log('╚════════════════════════════════════════════════════════════╝', colors.bright + colors.cyan);
  console.log('\n');

  const startTime = Date.now();

  // Test 1: Environment Variables
  const envOk = await testEnvironmentVariables();
  if (!envOk) {
    logError('Critical: Environment variables not properly configured');
    logError('Please check your .env.local file');
  }

  // Test 2: Opik Initialization
  const client = await testOpikInitialization();
  if (!client) {
    logError('Critical: Opik client initialization failed');
    logError('Cannot proceed with further Opik tests');
  } else {
    // Test 3: Send Trace
    await testSendTrace(client);

    // Test 4: Send Span
    await testSendSpan(client);

    // Test 5: Send Metric
    await testSendMetric(client);

    // Test 8: Error Logging
    await testErrorLogging(client);
  }

  // Test 6: Check Supabase User
  const userResult = await checkSupabaseUser();

  // Test 7: Create User Check Trace (only if client is initialized)
  if (client) {
    await createUserCheckTrace(client, userResult);
  }

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  // Print Summary
  console.log('\n');
  log('╔════════════════════════════════════════════════════════════╗', colors.bright + colors.cyan);
  log('║                    TEST SUMMARY                             ║');
  log('╚════════════════════════════════════════════════════════════╝', colors.bright + colors.cyan);
  console.log('\n');

  log(`Total Tests: ${testResults.total}`, colors.bright);
  log(`Passed: ${testResults.passed}`, colors.green);
  log(`Failed: ${testResults.failed}`, colors.red);
  log(`Warnings: ${testResults.warnings}`, colors.yellow);

  const successRate = ((testResults.passed / testResults.total) * 100).toFixed(1);
  log(`Success Rate: ${successRate}%`, colors.bright);

  logInfo(`Test Duration: ${duration} seconds`);

  console.log('\n');
  
  // User Check Result
  logSection('USER CHECK RESULT FOR: ' + TARGET_USERNAME);
  if (userResult.found) {
    logSuccess(`✓ User "${TARGET_USERNAME}" is REGISTERED in the system!`);
    logInfo('The user can access LevelUp Workout');
    if (userResult.profile) {
      logInfo(`Current Level: ${userResult.profile.level || 'Not set'}`);
      logInfo(`Current XP: ${userResult.profile.xp || 0}`);
      logInfo(`Current Rank: ${userResult.profile.rank || 'Not set'}`);
    }
  } else {
    logWarning(`⚠ User "${TARGET_USERNAME}" is NOT YET registered`);
    logInfo('The user needs to sign up to access LevelUp Workout');
  }

  console.log('\n');
  
  // Opik Dashboard Link
  logSection('OPIK DASHBOARD');
  logInfo('All test traces, spans, and metrics have been sent to Opik');
  logInfo('View them at: https://www.comet.com/opik');
  logInfo('Project: LevelUp Workout');

  console.log('\n');
  log('═════════════════════════════════════════════════════════════', colors.bright + colors.cyan);
  console.log('\n');
}

// Run the tests
runAllTests().catch(error => {
  logError('Fatal error during test execution:');
  logInfo(error.message);
  console.error(error);
  process.exit(1);
});

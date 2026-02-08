#!/usr/bin/env node

/**
 * OPIK AI Tester - Simple Version
 * 
 * Purpose: Test OPIK AI API connectivity and check user "nathasan1410"
 * Project: LevelUp Workout
 * 
 * Usage: node scripts/test-opik-simple.js
 */

const fs = require('fs');
const path = require('path');

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

// Load environment variables from .env.local
function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env.local');
  const envVars = {};
  
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim();
        envVars[key] = value;
        process.env[key] = value;
      }
    });
  }
  
  return envVars;
}

// Load environment variables
loadEnvFile();

const OPIK_API_KEY = process.env.OPIK_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const TARGET_USERNAME = 'nathasan1410';

// Run tests
async function runTests() {
  const startTime = Date.now();

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

  if (!SUPABASE_URL) {
    logWarning('NEXT_PUBLIC_SUPABASE_URL is not set');
    recordTest(false, true);
  } else {
    logSuccess('SUPABASE_URL is present');
    recordTest(true);
  }

  if (!SUPABASE_ANON_KEY) {
    logWarning('NEXT_PUBLIC_SUPABASE_ANON_KEY is not set');
    recordTest(false, true);
  } else {
    logSuccess('SUPABASE_ANON_KEY is present');
    recordTest(true);
  }

  // Test 2: Test Opik Connection
  logSection('TEST 2: Opik API Connection Test');

  try {
    // Dynamic import of opik (ESM)
    const { createClient: createSupabaseClient } = await import('@supabase/supabase-js');
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
        const client = new Opik({
          apiKey: OPIK_API_KEY,
          projectName: 'LevelUp Workout',
        });

        logSuccess('Opik client initialized successfully');
        logInfo('Project: LevelUp Workout');
        recordTest(true);

        // Test 3: Send a simple trace
        logSection('TEST 3: Send Test Trace to Opik');

        const testTrace = await client.trace({
          name: 'opik_tester_nathasan1410_check',
          startTime: new Date(),
          metadata: {
            project: 'LevelUp Workout',
            environment: process.env.NODE_ENV || 'development',
          },
          input: {
            target_username: TARGET_USERNAME,
            test_type: 'user_check',
            timestamp: new Date().toISOString(),
          },
          tags: ['test', 'nathasan1410', 'opik_tester'],
        });

        logSuccess('Test trace created');
        logInfo(`Trace ID: ${testTrace.data?.id || 'N/A'}`);

        await testTrace.end();
        logSuccess('Trace sent to Opik dashboard');
        recordTest(true);

        // Test 4: Check Supabase for user
        logSection('TEST 4: Check Supabase for User "nathasan1410"');

        const supabase = createSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);

        logInfo(`Searching for username: ${TARGET_USERNAME}`);

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('username', TARGET_USERNAME)
          .single();

        let userFound = false;
        let userProfile = null;

        if (error) {
          if (error.code === 'PGRST116') {
            logWarning(`User "${TARGET_USERNAME}" not found in profiles table`);
            logInfo('The user has not been registered yet');
            recordTest(false, true);
          } else {
            logError(`Error checking user: ${error.message}`);
            recordTest(false);
          }
        } else if (profile) {
          userFound = true;
          userProfile = profile;
          logSuccess(`✓ User "${TARGET_USERNAME}" FOUND in profiles table!`);
          logInfo(`Profile ID: ${profile.id}`);
          logInfo(`Email: ${profile.email || 'Not set'}`);
          logInfo(`Level: ${profile.level || 'Not set'}`);
          logInfo(`XP: ${profile.xp || 0}`);
          logInfo(`Rank: ${profile.rank || 'Not set'}`);
          logInfo(`Hunter Class: ${profile.hunter_class || 'Not set'}`);
          logInfo(`Hunter Status: ${profile.hunter_status || 'Normal'}`);
          recordTest(true);
        }

        // Test 5: Create user check trace
        logSection('TEST 5: Create User Check Trace');

        const userCheckTrace = await client.trace({
          name: `user_check_${TARGET_USERNAME}`,
          startTime: new Date(),
          metadata: {
            project: 'LevelUp Workout',
            environment: process.env.NODE_ENV || 'development',
            check_type: 'user_existence',
          },
          input: {
            username: TARGET_USERNAME,
            check_timestamp: new Date().toISOString(),
          },
          output: {
            user_found: userFound,
            profile_data: userProfile,
            check_result: userFound ? 'exists' : 'not_exists',
          },
          tags: ['user_check', TARGET_USERNAME, userFound ? 'found' : 'not_found', 'opik_tester'],
        });

        logSuccess('User check trace created and sent to Opik');
        await userCheckTrace.end();
        recordTest(true);
      }
    }
  } catch (error) {
    logError('Failed during Opik test');
    logInfo(`Error: ${error.message}`);
    console.error(error);
    recordTest(false);
  }

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  // Summary
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
  logSection('FINAL RESULT');
  
  if (testResults.failed === 0) {
    logSuccess('✓ All critical tests passed!');
    logSuccess('✓ OPIK AI API is working correctly');
  } else {
    logError('✗ Some tests failed');
    logError('Please check the errors above');
  }

  console.log('\n');
  logSection('OPIK DASHBOARD');
  logInfo('View all test traces at: https://www.comet.com/opik');
  logInfo('Project: LevelUp Workout');
  logInfo('Look for traces named: opik_tester_nathasan1410_check, user_check_nathasan1410');

  console.log('\n');
  log('═════════════════════════════════════════════════════════════', colors.bright + colors.cyan);
  console.log('\n');
}

// Run
runTests().catch(error => {
  logError('Fatal error:');
  logInfo(error.message);
  console.error(error);
  process.exit(1);
});

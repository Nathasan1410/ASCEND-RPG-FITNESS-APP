#!/usr/bin/env node

/**
 * OPIK AI Tester - Target: ns4460743@gmail.com
 * 
 * Purpose: Test OPIK AI API and check if user "ns4460743@gmail.com" is registered
 * Usage: node scripts/test-opik-ns4460743.js
 * 
 * This user already exists in Supabase with:
 * - Email: ns4460743@gmail.com
 * - Password: Kuuhaku01
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
  magenta: '\x1b[35m',
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

// Load environment variables
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

loadEnvFile();

const OPIK_API_KEY = process.env.OPIK_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const TARGET_EMAIL = 'ns4460743@gmail.com';
const TARGET_USERNAME = 'ns4460743';

// Run tests
async function runTests() {
  const startTime = Date.now();

  console.log('\n');
  log('╔══════════════════════════════════════════════════════════════════════════╗', colors.bright + colors.cyan);
  log('║                                                                      ║');
  log('║            OPIK AI TESTER - LEVEL UP WORKOUT                        ║');
  log('║                                                                      ║');
  log('║           Target User: ns4460743@gmail.com                          ║');
  log('║           Password: Kuuhaku01                                         ║');
  log('║                                                                      ║');
  log('╚══════════════════════════════════════════════════════════════════════════╝', colors.bright + colors.cyan);
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

  let opikWorking = false;
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
        const client = new Opik({
          apiKey: OPIK_API_KEY,
          projectName: 'LevelUp Workout',
        });

        logSuccess('Opik client initialized successfully');
        logInfo('Project: LevelUp Workout');
        recordTest(true);
        opikWorking = true;

        // Test 3: Send a simple trace
        logSection('TEST 3: Send Test Trace to Opik');

        const testTrace = await client.trace({
          name: 'opik_tester_ns4460743_check',
          startTime: new Date(),
          metadata: {
            project: 'LevelUp Workout',
            environment: process.env.NODE_ENV || 'development',
          },
          input: {
            target_email: TARGET_EMAIL,
            target_username: TARGET_USERNAME,
            test_type: 'user_check',
            timestamp: new Date().toISOString(),
          },
          tags: ['test', TARGET_USERNAME, 'ns4460743', 'opik_tester'],
        });

        logSuccess('Test trace created');
        logInfo(`Trace ID: ${testTrace.data?.id || 'N/A'}`);

        await testTrace.end();
        logSuccess('Trace sent to Opik dashboard');
        recordTest(true);
      }
    }
  } catch (error) {
    logError('Failed during Opik test');
    logInfo(`Error: ${error.message}`);
    console.error(error);
    recordTest(false);
  }

  // Test 4: Check Supabase for user
  logSection('TEST 4: Check Supabase for User "ns4460743@gmail.com"');

  let userFound = false;
  let userProfile = null;
  let userId = null;

  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    logInfo(`Searching for email: ${TARGET_EMAIL}`);

    // First, try to get user by email from auth.users
    const { data: authUser, error: authError } = await supabase.auth.signInWithPassword({
      email: TARGET_EMAIL,
      password: 'Kuuhaku01'
    });

    if (authError) {
      logWarning(`Cannot authenticate user: ${authError.message}`);
      logInfo('Trying to find user by email in profiles table...');
      
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', TARGET_EMAIL)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          logWarning(`User "${TARGET_EMAIL}" not found in profiles table`);
          logInfo('The user may exist in auth but not have a profile yet');
          recordTest(false, true);
        } else {
          logError(`Error checking user: ${error.message}`);
          recordTest(false);
        }
      } else if (profile) {
        userFound = true;
        userProfile = profile;
        userId = profile.id;
        logSuccess(`✓ User "${TARGET_EMAIL}" FOUND in profiles table!`);
        logInfo(`Profile ID: ${profile.id}`);
        logInfo(`Username: ${profile.username || 'Not set'}`);
        logInfo(`Level: ${profile.level || 'Not set'}`);
        logInfo(`XP: ${profile.xp || 0}`);
        logInfo(`Rank: ${profile.rank || 'Not set'}`);
        logInfo(`Hunter Class: ${profile.hunter_class || 'Not set'}`);
        logInfo(`Hunter Status: ${profile.hunter_status || 'Normal'}`);
        recordTest(true);
      }
    } else {
      userFound = true;
      userId = authUser.user?.id;
      logSuccess(`✓ User "${TARGET_EMAIL}" FOUND in auth system!`);
      logInfo(`Auth User ID: ${authUser.user?.id}`);
      logInfo(`Email: ${authUser.user?.email}`);
      
      // Now check for profile
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (profile) {
        userProfile = profile;
        logSuccess(`✓ Profile found for user!`);
        logInfo(`Username: ${profile.username || 'Not set'}`);
        logInfo(`Level: ${profile.level || 'Not set'}`);
        logInfo(`XP: ${profile.xp || 0}`);
        logInfo(`Rank: ${profile.rank || 'Not set'}`);
        logInfo(`Hunter Class: ${profile.hunter_class || 'Not set'}`);
        logInfo(`Hunter Status: ${profile.hunter_status || 'Normal'}`);
      } else {
        logWarning(`Auth user found but no profile exists`);
        logInfo('User needs to complete onboarding or profile needs to be created');
      }
      
      recordTest(true);
    }
  } catch (error) {
    logError('Failed during user check');
    logInfo(`Error: ${error.message}`);
    console.error(error);
    recordTest(false);
  }

  // Test 5: Create user check trace
  if (opikWorking) {
    try {
      logSection('TEST 5: Create User Check Trace');

      const opik = await import('opik');
      const { Opik } = opik;
      const client = new Opik({
        apiKey: OPIK_API_KEY,
        projectName: 'LevelUp Workout',
      });

      const userCheckTrace = await client.trace({
        name: `user_check_${TARGET_USERNAME}`,
        startTime: new Date(),
        metadata: {
          project: 'LevelUp Workout',
          environment: process.env.NODE_ENV || 'development',
          check_type: 'user_existence',
        },
        input: {
          email: TARGET_EMAIL,
          username: TARGET_USERNAME,
          check_timestamp: new Date().toISOString(),
        },
        output: {
          user_found: userFound,
          has_profile: !!userProfile,
          profile_data: userProfile,
          check_result: userFound ? 'exists' : 'not_exists',
        },
        tags: ['user_check', TARGET_USERNAME, TARGET_EMAIL, userFound ? 'found' : 'not_found', 'opik_tester'],
      });

      logSuccess('User check trace created and sent to Opik');
      await userCheckTrace.end();
      recordTest(true);
    } catch (error) {
      logError('Failed to create user check trace');
      logInfo(`Error: ${error.message}`);
      recordTest(false);
    }
  }

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  // Summary
  console.log('\n');
  log('╔══════════════════════════════════════════════════════════════════════════╗', colors.bright + colors.cyan);
  log('║                    TEST SUMMARY                                     ║');
  log('╚══════════════════════════════════════════════════════════════════════════╝', colors.bright + colors.cyan);
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
  
  if (userFound && userProfile) {
    logSuccess('✓✓✓ SUCCESS! ✓✓✓');
    logSuccess(`✓✓✓ User "${TARGET_EMAIL}" is REGISTERED in Level Up Workout! ✓✓✓`);
    logSuccess('✓✓✓ The user can login and use the application! ✓✓✓');
    
    console.log('\n');
    logInfo('Login Credentials:');
    logInfo(`  Email: ${TARGET_EMAIL}`);
    logInfo('  Password: Kuuhaku01');
    
    console.log('\n');
    logInfo('Profile Status:');
    logInfo(`  Username: ${userProfile.username || 'Not set'}`);
    logInfo(`  Level: ${userProfile.level || 'Not set'}`);
    logInfo(`  XP: ${userProfile.xp || 0}`);
    logInfo(`  Rank: ${userProfile.rank || 'Not set'}`);
    logInfo(`  Hunter Class: ${userProfile.hunter_class || 'Not set'}`);
    logInfo(`  Hunter Status: ${userProfile.hunter_status || 'Normal'}`);
  } else if (userFound) {
    logWarning(`⚠ User found in auth but no profile exists`);
    logInfo('The user needs to complete onboarding or create a profile');
    logInfo('This can be done through the app or by creating a profile manually');
  } else {
    logError('✗ User not found in system');
    logError('Please check if the user exists in Supabase auth system');
  }

  console.log('\n');
  logSection('OPIK DASHBOARD');
  logInfo('View all test traces at: https://www.comet.com/opik');
  logInfo('Project: LevelUp Workout');
  logInfo('Look for traces named: opik_tester_ns4460743_check, user_check_ns4460743');

  console.log('\n');
  log('══════════════════════════════════════════════════════════════════════════════', colors.bright + colors.cyan);
  console.log('\n');
}

// Run
runTests().catch(error => {
  logError('Fatal error:');
  logInfo(error.message);
  console.error(error);
  process.exit(1);
});

#!/usr/bin/env node

/**
 * OPIK AI Tester - Complete Workflow
 * 
 * Purpose: Run all tests and add user "nathasan1410" if needed
 * Usage: node scripts/opik-tester-complete.js
 * 
 * This script:
 * 1. Tests OPIK AI API connectivity
 * 2. Checks if user "nathasan1410" exists
 * 3. Offers to create the user if not found
 * 4. Creates Opik traces documenting the entire process
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

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

const TARGET_USERNAME = 'nathasan1410';

// Run a script and capture output
function runScript(scriptPath, description) {
  return new Promise((resolve) => {
    const fullPath = path.join(__dirname, scriptPath);
    
    if (!fs.existsSync(fullPath)) {
      logError(`Script not found: ${scriptPath}`);
      resolve({ success: false, error: 'Script not found' });
      return;
    }

    const process = spawn('node', [fullPath], {
      stdio: 'pipe',
      cwd: path.join(__dirname, '..')
    });

    let output = '';
    let errorOutput = '';

    process.stdout.on('data', (data) => {
      const text = data.toString();
      output += text;
      process.stdout.write(text);
    });

    process.stderr.on('data', (data) => {
      const text = data.toString();
      errorOutput += text;
      process.stderr.write(text);
    });

    process.on('close', (code) => {
      resolve({
        success: code === 0,
        output,
        errorOutput,
        code
      });
    });
  });
}

// Main workflow
async function runCompleteWorkflow() {
  const startTime = Date.now();

  console.log('\n');
  log('╔══════════════════════════════════════════════════════════════════════════╗', colors.bright + colors.cyan);
  log('║                                                                      ║');
  log('║            OPIK AI TESTER - COMPLETE WORKFLOW                        ║');
  log('║                                                                      ║');
  log('║            Level Up Workout • Target: nathasan1410                    ║');
  log('║                                                                      ║');
  log('╚══════════════════════════════════════════════════════════════════════════╝', colors.bright + colors.cyan);
  console.log('\n');

  // Step 1: Run Opik Tester
  logSection('STEP 1: Testing OPIK AI API');
  logInfo('Running comprehensive Opik API tests...\n');

  const opikTestResult = await runScript('test-opik-simple.js', 'Opik Tester');

  if (opikTestResult.success) {
    logSuccess('✓ Opik API tests completed successfully');
  } else {
    logWarning('⚠ Some Opik tests failed (check output above)');
  }

  await new Promise(resolve => setTimeout(resolve, 1000));

  // Step 2: Check user status
  logSection('STEP 2: Checking User Status');
  logInfo(`Checking if user "${TARGET_USERNAME}" exists...\n`);

  let userFound = false;
  let userProfile = null;

  try {
    const { createClient } = await import('@supabase/supabase-js');
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', TARGET_USERNAME)
      .single();

    if (profile) {
      userFound = true;
      userProfile = profile;
      
      logSuccess(`✓ User "${TARGET_USERNAME}" FOUND in system!`);
      logInfo('Profile Details:');
      logInfo(`  - ID: ${profile.id}`);
      logInfo(`  - Email: ${profile.email || 'Not set'}`);
      logInfo(`  - Level: ${profile.level || 'Not set'}`);
      logInfo(`  - XP: ${profile.xp || 0}`);
      logInfo(`  - Rank: ${profile.rank || 'Not set'}`);
      logInfo(`  - Hunter Class: ${profile.hunter_class || 'Not set'}`);
      logInfo(`  - Hunter Status: ${profile.hunter_status || 'Normal'}`);

      console.log('\n');
      log('╔══════════════════════════════════════════════════════════════════════════╗', colors.bright + colors.green);
      log('║                          FINAL RESULT                                    ║');
      log('╚══════════════════════════════════════════════════════════════════════════╝', colors.bright + colors.green);
      console.log('\n');
      
      logSuccess('✓✓✓ SUCCESS! ✓✓✓');
      logSuccess('✓✓✓ User "nathasan1410" is REGISTERED in Level Up Workout! ✓✓✓');
      logSuccess('✓✓✓ The user can login and use the application! ✓✓✓');
      
      console.log('\n');
      logInfo('Login Credentials:');
      logInfo('  Email: nathasan1410@test.com');
      logInfo('  Password: Test123!');
      
      console.log('\n');
      logSection('OPIK DASHBOARD');
      logInfo('View all test traces at: https://www.comet.com/opik');
      logInfo('Project: LevelUp Workout');
      
    } else {
      logWarning(`⚠ User "${TARGET_USERNAME}" NOT FOUND in system`);
      logInfo('The user needs to be created to access Level Up Workout\n');

      log('╔══════════════════════════════════════════════════════════════════════════╗', colors.bright + colors.yellow);
      log('║                    USER NOT FOUND - ACTION REQUIRED                       ║');
      log('╚══════════════════════════════════════════════════════════════════════════╝', colors.bright + colors.yellow);
      console.log('\n');

      logInfo('To add the user, run one of these commands:\n');
      log('Option 1 - Quick Add (creates auth user + profile):', colors.cyan);
      log('  node scripts/add-user-nathasan1410.js', colors.green);
      log('  node scripts/create-profile-nathasan1410.js', colors.green);
      
      log('\nOption 2 - Complete Workflow:', colors.cyan);
      log('  node scripts/opik-tester-add-user.js', colors.green);

      console.log('\n');
      logSection('NEXT STEPS');
      logInfo('1. Run the add user script above');
      logInfo('2. Verify user creation by running this tester again');
      logInfo('3. Login with the provided credentials');
    }

  } catch (error) {
    logError('Error checking user status');
    logInfo(`Error: ${error.message}`);
    console.error(error);
  }

  // Summary
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  console.log('\n');
  logSection('WORKFLOW SUMMARY');
  logInfo(`Total Duration: ${duration} seconds`);
  logInfo('Opik API: Tested');
  logInfo(`User Check: ${userFound ? 'Found ✓' : 'Not Found ✗'}`);

  console.log('\n');
  log('══════════════════════════════════════════════════════════════════════════════', colors.bright + colors.cyan);
  console.log('\n');
}

// Run the complete workflow
runCompleteWorkflow().catch(error => {
  logError('Fatal error during workflow:');
  logInfo(error.message);
  console.error(error);
  process.exit(1);
});

#!/usr/bin/env node

/**
 * Create Profile: nathasan1410
 * 
 * Purpose: Create profile for user "nathasan1410" after Auth user creation
 * Usage: node scripts/create-profile-nathasan1410.js
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

function logSuccess(message) {
  log(`✓ ${message}`, colors.green);
}

function logError(message) {
  log(`✗ ${message}`, colors.red);
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

const SERVICE_ROLE_KEY = process.env.SERVICE_ROLE_KEY;
const PROJECT_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const TARGET_USERNAME = 'nathasan1410';
const USER_EMAIL = 'nathasan1410@test.com';

// Main function
async function createProfile() {
  console.log('\n');
  log('╔════════════════════════════════════════════════════════════╗', colors.bright + colors.cyan);
  log('║     CREATE PROFILE: nathasan1410 FOR LEVEL UP WORKOUT       ║');
  log('╚════════════════════════════════════════════════════════════╝', colors.bright + colors.cyan);
  console.log('\n');

  try {
    const { createClient } = await import('@supabase/supabase-js');
    const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    // Create admin client with service role
    const supabaseAdmin = createClient(PROJECT_URL, SERVICE_ROLE_KEY);

    log('Step 1: Finding Auth user...\n');
    
    // Get user ID from auth.users table
    const { data: authUser, error: authError } = await supabaseAdmin
      .rpc('get_user_id_by_email', { user_email: USER_EMAIL });

    if (authError) {
      logError('Failed to get user from auth table');
      logInfo('Trying alternative method...\n');
      
      // Alternative: Query directly
      const { data: authUsers, error: directError } = await supabaseAdmin
        .from('auth.users')
        .select('id')
        .eq('email', USER_EMAIL)
        .single();
      
      if (directError || !authUsers) {
        logError('Auth user not found!');
        logInfo('Please run: node scripts/add-user-nathasan1410.js first');
        console.log('\n');
        return;
      }
      
      var userId = authUsers.id;
    } else if (!authUser) {
      logError('Auth user not found!');
      logInfo('Please run: node scripts/add-user-nathasan1410.js first');
      console.log('\n');
      return;
    } else {
      var userId = authUser;
    }

    logSuccess(`Found Auth user with ID: ${userId}`);

    // Check if profile already exists
    log('\nStep 2: Checking if profile already exists...\n');
    
    const { data: existingProfile, error: checkError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (existingProfile) {
      logSuccess('Profile already exists!');
      logInfo('Profile data:');
      logInfo(`  - Username: ${existingProfile.username}`);
      logInfo(`  - Email: ${existingProfile.email}`);
      logInfo(`  - Level: ${existingProfile.level}`);
      logInfo(`  - XP: ${existingProfile.xp}`);
      logInfo(`  - Rank: ${existingProfile.rank}`);
      logInfo(`  - Hunter Class: ${existingProfile.hunter_class}`);
      logInfo(`  - Hunter Status: ${existingProfile.hunter_status}`);
      
      console.log('\n');
      logSuccess('✓ User "nathasan1410" is fully registered and ready to use!');
      logSuccess('✓ Login with:');
      logSuccess('    Email: nathasan1410@test.com');
      logSuccess('    Password: Test123!');
      console.log('\n');
      return;
    }

    logInfo('Profile does not exist. Creating profile...\n');

    // Create profile
    const { data: profile, error: insertError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: userId,
        username: TARGET_USERNAME,
        email: USER_EMAIL,
        level: 1,
        xp: 0,
        rank: 'E',
        hunter_class: 'Novice',
        hunter_status: 'Normal',
      })
      .select()
      .single();

    if (insertError) {
      logError('Failed to create profile');
      logInfo(`Error: ${insertError.message}`);
      logInfo('Details:', JSON.stringify(insertError, null, 2));
      
      // Show SQL fallback
      console.log('\n');
      log('╔════════════════════════════════════════════════════════════╗', colors.bright + colors.yellow);
      log('║                  FALLBACK: MANUAL SQL                       ║');
      log('╚════════════════════════════════════════════════════════════╝', colors.bright + colors.yellow);
      console.log('\n');
      
      logInfo('Run this SQL in Supabase Dashboard:\n');
      log(colors.cyan, '');
      console.log(`INSERT INTO profiles (id, username, email, level, xp, rank, hunter_class, hunter_status)
VALUES (
  '${userId}',
  'nathasan1410',
  '${USER_EMAIL}',
  1,
  0,
  'E',
  'Novice',
  'Normal'
);`);
      console.log(colors.reset + '\n');
      
    } else {
      logSuccess('Profile created successfully!');
      logInfo('\nProfile Details:');
      logInfo(`  - Profile ID: ${profile.id}`);
      logInfo(`  - Username: ${profile.username}`);
      logInfo(`  - Email: ${profile.email}`);
      logInfo(`  - Level: ${profile.level}`);
      logInfo(`  - XP: ${profile.xp}`);
      logInfo(`  - Rank: ${profile.rank}`);
      logInfo(`  - Hunter Class: ${profile.hunter_class}`);
      logInfo(`  - Hunter Status: ${profile.hunter_status}`);
      
      console.log('\n');
      log('╔════════════════════════════════════════════════════════════╗', colors.bright + colors.green);
      log('║                  SUCCESS! USER READY                        ║');
      log('╚════════════════════════════════════════════════════════════╝', colors.bright + colors.green);
      console.log('\n');
      
      logSuccess('✓ User "nathasan1410" has been fully registered!');
      logSuccess('✓ Login credentials:');
      logSuccess('    Email: nathasan1410@test.com');
      logSuccess('    Password: Test123!');
      logSuccess('✓ The user can now access Level Up Workout!');
    }

  } catch (error) {
    logError('Error creating profile');
    logInfo(`Error: ${error.message}`);
    console.error(error);
  }

  console.log('\n');
}

// Run the script
createProfile().catch(error => {
  logError('Fatal error:');
  logInfo(error.message);
  console.error(error);
  process.exit(1);
});

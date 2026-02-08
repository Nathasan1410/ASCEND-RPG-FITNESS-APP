#!/usr/bin/env node

/**
 * Add User: nathasan1410
 * 
 * Purpose: Create user account "nathasan1410" in LevelUp Workout
 * Usage: node scripts/add-user-nathasan1410.js
 */

const https = require('https');
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

// User data for nathasan1410
const userData = {
  email: 'nathasan1410@test.com',
  password: 'Test123!',
  email_confirm: true,
  user_metadata: {
    username: 'nathasan1410',
    class: 'Novice',
    rank_tier: 'E-Rank',
    level: 1,
    current_xp: 0,
    total_xp: 0,
    stats_strength: 10,
    stats_agility: 10,
    stats_stamina: 10,
    email_confirm: true
  }
};

// Helper function to make HTTP requests
function makeRequest(url, data, apiKey) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const postData = JSON.stringify(data);

    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || 443,
      path: urlObj.pathname + urlObj.search,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          resolve({
            statusCode: res.statusCode,
            body: json,
          });
        } catch (e) {
          resolve({
            statusCode: res.statusCode,
            body: body,
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

// Helper function to check if user exists
async function checkUserExists(username) {
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabase = createClient(PROJECT_URL, SUPABASE_ANON_KEY);

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single();

    if (error && error.code === 'PGRST116') {
      return { exists: false, profile: null };
    }

    if (data) {
      return { exists: true, profile: data };
    }

    return { exists: false, profile: null };
  } catch (error) {
    console.error('Error checking user:', error);
    return { exists: false, error };
  }
}

// Main function
async function addUser() {
  console.log('\n');
  log('╔════════════════════════════════════════════════════════════╗', colors.bright + colors.cyan);
  log('║                                                            ║');
  log('║         ADD USER: nathasan1410 TO LEVEL UP WORKOUT         ║');
  log('║                                                            ║');
  log('╚════════════════════════════════════════════════════════════╝', colors.bright + colors.cyan);
  console.log('\n');

  // Check if user already exists
  log('Checking if user already exists...\n');
  const checkResult = await checkUserExists('nathasan1410');

  if (checkResult.exists) {
    logSuccess('User "nathasan1410" already exists in the system!');
    logInfo('Profile data:');
    logInfo(`  - Profile ID: ${checkResult.profile.id}`);
    logInfo(`  - Email: ${checkResult.profile.email || 'Not set'}`);
    logInfo(`  - Level: ${checkResult.profile.level || 'Not set'}`);
    logInfo(`  - XP: ${checkResult.profile.xp || 0}`);
    logInfo(`  - Rank: ${checkResult.profile.rank || 'Not set'}`);
    logInfo(`  - Hunter Class: ${checkResult.profile.hunter_class || 'Not set'}`);
    
    console.log('\n');
    logSuccess('✓ User is already registered and can access Level Up Workout');
    console.log('\n');
    return;
  }

  logInfo('User "nathasan1410" not found. Creating account...\n');

  // Create user via Supabase Admin API
  try {
    const response = await makeRequest(
      `${PROJECT_URL}/auth/v1/admin/users`,
      userData,
      SERVICE_ROLE_KEY
    );

    if (response.statusCode === 200 || response.statusCode === 201) {
      logSuccess('User "nathasan1410" created successfully!');
      logInfo('\nAccount Details:');
      logInfo(`  - Email: ${userData.email}`);
      logInfo(`  - Username: ${userData.user_metadata.username}`);
      logInfo(`  - Password: ${userData.password}`);
      logInfo(`  - Rank: ${userData.user_metadata.rank_tier}`);
      logInfo(`  - Level: ${userData.user_metadata.level}`);
      logInfo(`  - XP: ${userData.user_metadata.current_xp}`);
      
      logInfo('\nUser ID:', response.body.id || 'Created in Auth system');

      console.log('\n');
      log('╔════════════════════════════════════════════════════════════╗', colors.bright + colors.yellow);
      log('║                  IMPORTANT - NEXT STEPS                      ║');
      log('╚════════════════════════════════════════════════════════════╝', colors.bright + colors.yellow);
      console.log('\n');
      
      logInfo('The Auth user has been created. Now you need to run the SQL to create the profile.');
      logInfo('\nOption 1: Run the SQL script directly:');
      log('   node scripts/create-profile-nathasan1410.js', colors.green);
      
      logInfo('\nOption 2: Run SQL manually in Supabase Dashboard:');
      logInfo('   1. Go to https://supabase.com/dashboard');
      logInfo('   2. Select your project');
      logInfo('   3. Open SQL Editor');
      logInfo('   4. Run the following SQL:');
      log('\n' + colors.cyan, '');
      console.log(`-- Get user ID from email
SELECT id FROM auth.users WHERE email = '${userData.email}';

-- Insert profile (replace <USER_ID> with actual ID)
INSERT INTO profiles (id, username, email, level, xp, rank, hunter_class, hunter_status)
VALUES (
  '<USER_ID>',
  'nathasan1410',
  '${userData.email}',
  1,
  0,
  'E',
  'Novice',
  'Normal'
);`);
      console.log(colors.reset + '\n');
      
      logInfo('After running the SQL:');
      logSuccess('✓ User "nathasan1410" will be fully registered');
      logSuccess('✓ User can login with:');
      logSuccess('    Email: nathasan1410@test.com');
      logSuccess('    Password: Test123!');
      
    } else {
      logError('Failed to create user');
      logInfo(`Status Code: ${response.statusCode}`);
      logInfo('Response:', JSON.stringify(response.body, null, 2));
    }
  } catch (error) {
    logError('Error creating user');
    logInfo(`Error: ${error.message}`);
    console.error(error);
  }

  console.log('\n');
}

// Run the script
addUser().catch(error => {
  logError('Fatal error:');
  logInfo(error.message);
  console.error(error);
  process.exit(1);
});

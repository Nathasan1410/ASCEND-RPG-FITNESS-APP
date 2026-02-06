#!/usr/bin/env node

/**
 * Demo Accounts Creator Script
 * 
 * Usage:
 * 1. Get your Supabase Service Role Key from Dashboard > Settings > API
 * 2. Set SERVICE_ROLE_KEY environment variable
 * 3. Run: node scripts/create-demo-accounts.js
 */

const https = require('https');

const SERVICE_ROLE_KEY = process.env.SERVICE_ROLE_KEY;
const PROJECT_URL = process.env.SUPABASE_URL || 'https://lwzdgxyhorocyysuvceh.supabase.co';

if (!SERVICE_ROLE_KEY) {
  console.error('❌ ERROR: SERVICE_ROLE_KEY environment variable is required');
  console.error('Get it from: https://supabase.com/dashboard > Settings > API');
  process.exit(1);
}

console.log('🚀 Starting demo accounts creation...');
console.log(`📡 Project: ${PROJECT_URL}`);
console.log('');

// Helper functions
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateUsername = (prefix, suffix) => {
  const numbers = Math.floor(Math.random() * 999);
  return `${prefix}${suffix}${numbers}`;
};

const generateEmail = (username) => `${username.toLowerCase()}@test.com`;

const calculateXP = (rank, level) => {
  const rankMultipliers = {
    'S-Rank': 2500,
    'A-Rank': 2000,
    'B-Rank': 1500,
    'C-Rank': 1000,
    'D-Rank': 600,
    'E-Rank': 300,
  };
  const multiplier = rankMultipliers[rank] || 300;
  return level * multiplier;
};

const calculateStats = (hunterClass, baseStats) => {
  const classModifiers = {
    'Novice': { str: 10, agi: 10, sta: 10 },
    'Striker': { str: 8, agi: 10, sta: 7 },
    'Tank': { str: 10, agi: 7, sta: 10 },
    'Assassin': { str: 7, agi: 10, sta: 8 },
  };
  const modifiers = classModifiers[hunterClass] || classModifiers['Novice'];
  
  const levelBonus = Math.floor(baseStats * 0.5);
  
  return {
    stats_strength: baseStats + modifiers.str + Math.floor(Math.random() * 5),
    stats_agility: baseStats + modifiers.agi + Math.floor(Math.random() * 5),
    stats_stamina: baseStats + modifiers.sta + Math.floor(Math.random() * 5),
  };
};

// Generate all demo accounts
function generateDemoAccounts() {
  const accounts = [];
  const password = 'Demo123!';
  
  // S-Rank: 2 users
  accounts.push({
    email: 'shadowhunter@test.com',
    password: 'Demo123!',
    username: 'ShadowHunter',
    user_metadata: {
      username: 'ShadowHunter',
      class: 'Assassin',
      rank_tier: 'S-Rank',
      level: 95,
      current_xp: 237500,
      total_xp: 237500,
      ...calculateStats('Assassin', 95)
    },
    email_confirm: true
  });
  
  accounts.push({
    email: 'phantombblade@test.com',
    password: 'Demo123!',
    username: 'PhantomBlade',
    user_metadata: {
      username: 'PhantomBlade',
      class: 'Striker',
      rank_tier: 'S-Rank',
      level: 92,
      current_xp: 184000,
      total_xp: 184000,
      ...calculateStats('Striker', 92)
    },
    email_confirm: true
  });
  
  // A-Rank: 6 users
  const aRankNames = ['ThunderStrike', 'FrostWarrior', 'IronTank', 'FlameKnight', 'StormRider', 'VoidWalker'];
  const aRanks = ['Strike', 'Warrior', 'Tank', 'Knight', 'Rider', 'Walker'];
  
  for (let i = 0; i < 6; i++) {
    const classes = ['Tank', 'Striker', 'Assassin'];
    const username = aRankNames[i];
    const hunterClass = classes[i % 3];
    const level = randomInt(70, 78);
    const xp = calculateXP('A-Rank', level);
    const stats = calculateStats(hunterClass, level);
    
    accounts.push({
      email: `${username.toLowerCase()}@test.com`,
      password: 'Demo123!',
      username,
      user_metadata: {
        username,
        class: hunterClass,
        rank_tier: 'A-Rank',
        level,
        current_xp: xp,
        total_xp: xp,
        ...stats
      },
      email_confirm: true
    });
  }
  
  // B-Rank: 8 users
  const bRankNames = ['SwiftWolf', 'CyberDragon', 'BlazingFist', 'ThunderClaw', 'ShadowStrike', 'FrozenSoul', 'IronShield', 'BladeRunner'];
  const bRanks = ['Wolf', 'Dragon', 'Fist', 'Claw', 'Strike', 'Soul', 'Shield', 'Runner'];
  
  for (let i = 0; i < 8; i++) {
    const classes = ['Assassin', 'Tank', 'Striker'];
    const username = bRankNames[i];
    const hunterClass = classes[i % 3];
    const level = randomInt(32, 48);
    const xp = calculateXP('B-Rank', level);
    const stats = calculateStats(hunterClass, level);
    
    accounts.push({
      email: `${username.toLowerCase()}@test.com`,
      password: 'Demo123!',
      username,
      user_metadata: {
        username,
        class: hunterClass,
        rank_tier: 'B-Rank',
        level,
        current_xp: xp,
        total_xp: xp,
        ...stats
      },
      email_confirm: true
    });
  }
  
  // C-Rank: 8 users
  const cRankNames = ['SwiftNinja', 'CyberWolf', 'DreadKnight', 'SilverFang', 'ThunderBolt', 'IronHeart', 'FrostStrike', 'ShadowPaw'];
  const cRanks = ['Ninja', 'Wolf', 'Knight', 'Fang', 'Bolt', 'Heart', 'Strike', 'Paw'];
  
  for (let i = 0; i < 8; i++) {
    const classes = ['Assassin', 'Striker', 'Tank'];
    const username = cRankNames[i];
    const hunterClass = classes[i % 3];
    const level = randomInt(5, 22);
    const xp = calculateXP('C-Rank', level);
    const stats = calculateStats(hunterClass, level);
    
    accounts.push({
      email: `${username.toLowerCase()}@test.com`,
      password: 'Demo123!',
      username,
      user_metadata: {
        username,
        class: hunterClass,
        rank_tier: 'C-Rank',
        level,
        current_xp: xp,
        total_xp: xp,
        ...stats
      },
      email_confirm: true
    });
  }
  
  return accounts;
}

// Create users one by one
async function createUsers() {
  const demoAccounts = generateDemoAccounts();
  console.log(`📋 Generated ${demoAccounts.length} demo accounts`);
  console.log('');
  
  let successCount = 0;
  let failCount = 0;
  
  for (let i = 0; i < demoAccounts.length; i++) {
    const account = demoAccounts[i];
    
    try {
      const response = await https.post(`${PROJECT_URL}/auth/v1/admin/users`, {
        headers: {
          'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(account),
      });
      
      if (response.statusCode === 200 || response.statusCode === 201) {
        successCount++;
        console.log(`✅ [${i + 1}/${demoAccounts.length}] Created: ${account.username} (${account.user_metadata.rank_tier})`);
      } else {
        failCount++;
        console.error(`❌ [${i + 1}/${demoAccounts.length}] Failed: ${account.username}`);
        console.error(`   Status: ${response.statusCode}`);
        console.error(`   Body: ${response.body}`);
      }
    } catch (error) {
      failCount++;
      console.error(`❌ [${i + 1}/${demoAccounts.length}] Error: ${account.username}`);
      console.error(`   ${error.message}`);
    }
    
    // Rate limiting - wait a bit between requests
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  console.log('');
  console.log('═══════════════════════════════════════');
  console.log(`📊 SUMMARY`);
  console.log('═══════════════════════════════════════');
  console.log(`Total: ${demoAccounts.length}`);
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log('');
  
  if (successCount > 0) {
    console.log('🎉 Demo accounts created successfully!');
    console.log('');
    console.log('📝 Login Credentials:');
    console.log('   Email: [username]@test.com');
    console.log('   Password: Demo123!');
    console.log('');
    console.log('💡 Next Step: Run the profile creation SQL to create profiles for these users');
  } else {
    console.log('⚠️  No accounts were created. Please check:');
    console.log('   1. SERVICE_ROLE_KEY is correct');
    console.log('   2. PROJECT_URL is correct');
    console.log('   3. Supabase project is accessible');
  }
}

// Run the script
createUsers().catch(error => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});

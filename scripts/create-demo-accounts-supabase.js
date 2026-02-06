#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SERVICE_ROLE_KEY;

if (!supabaseKey) {
  console.error('❌ SERVICE_ROLE_KEY not found in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const existingAccounts = [
  {
    email: 'shadowhunter@test.com',
    password: 'Test123!',
    username: 'ShadowHunter',
    user_metadata: {
      username: 'ShadowHunter',
      class: 'Assassin',
      rank_tier: 'S-Rank',
      level: 95,
      current_xp: 237500,
      total_xp: 237500,
      stats_strength: 95,
      stats_agility: 88,
      stats_stamina: 92,
      email_confirm: true
    }
  },
  {
    email: 'phantombblade@test.com',
    password: 'Test123!',
    username: 'PhantomBlade',
    user_metadata: {
      username: 'PhantomBlade',
      class: 'Striker',
      rank_tier: 'S-Rank',
      level: 92,
      current_xp: 184000,
      total_xp: 184000,
      stats_strength: 92,
      stats_agility: 90,
      stats_stamina: 88,
      email_confirm: true
    }
  },
  {
    email: 'thunderstrike@test.com',
    password: 'Test123!',
    username: 'ThunderStrike',
    user_metadata: {
      username: 'ThunderStrike',
      class: 'Tank',
      rank_tier: 'A-Rank',
      level: 78,
      current_xp: 156000,
      total_xp: 156000,
      stats_strength: 78,
      stats_agility: 70,
      stats_stamina: 86,
      email_confirm: true
    }
  },
  {
    email: 'frostwarrior@test.com',
    password: 'Test123!',
    username: 'FrostWarrior',
    user_metadata: {
      username: 'FrostWarrior',
      class: 'Striker',
      rank_tier: 'A-Rank',
      level: 75,
      current_xp: 150000,
      total_xp: 150000,
      stats_strength: 75,
      stats_agility: 85,
      stats_stamina: 70,
      email_confirm: true
    }
  },
  {
    email: 'irontank@test.com',
    password: 'Test123!',
    username: 'IronTank',
    user_metadata: {
      username: 'IronTank',
      class: 'Tank',
      rank_tier: 'A-Rank',
      level: 72,
      current_xp: 144000,
      total_xp: 144000,
      stats_strength: 88,
      stats_agility: 65,
      stats_stamina: 78,
      email_confirm: true
    }
  },
  {
    email: 'flameknight@test.com',
    password: 'Test123!',
    username: 'FlameKnight',
    user_metadata: {
      username: 'FlameKnight',
      class: 'Assassin',
      rank_tier: 'A-Rank',
      level: 71,
      current_xp: 142000,
      total_xp: 142000,
      stats_strength: 85,
      stats_agility: 68,
      stats_stamina: 80,
      email_confirm: true
    }
  },
  {
    email: 'stormrider@test.com',
    password: 'Test123!',
    username: 'StormRider',
    user_metadata: {
      username: 'StormRider',
      class: 'Striker',
      rank_tier: 'A-Rank',
      level: 69,
      current_xp: 138000,
      total_xp: 138000,
      stats_strength: 90,
      stats_agility: 82,
      stats_stamina: 72,
      email_confirm: true
    }
  },
  {
    email: 'voidwalker@test.com',
    password: 'Test123!',
    username: 'VoidWalker',
    user_metadata: {
      username: 'VoidWalker',
      class: 'Assassin',
      rank_tier: 'A-Rank',
      level: 68,
      current_xp: 136000,
      total_xp: 136000,
      stats_strength: 88,
      stats_agility: 90,
      stats_stamina: 78,
      email_confirm: true
    }
  },
  {
    email: 'swiftwolf@test.com',
    password: 'Test123!',
    username: 'SwiftWolf',
    user_metadata: {
      username: 'SwiftWolf',
      class: 'Assassin',
      rank_tier: 'B-Rank',
      level: 52,
      current_xp: 104000,
      total_xp: 104000,
      stats_strength: 70,
      stats_agility: 82,
      stats_stamina: 70,
      email_confirm: true
    }
  },
  {
    email: 'cyberdragon@test.com',
    password: 'Test123!',
    username: 'CyberDragon',
    user_metadata: {
      username: 'CyberDragon',
      class: 'Tank',
      rank_tier: 'B-Rank',
      level: 48,
      current_xp: 96000,
      total_xp: 96000,
      stats_strength: 82,
      stats_agility: 65,
      stats_stamina: 75,
      email_confirm: true
    }
  },
  {
    email: 'blazingfist@test.com',
    password: 'Test123!',
    username: 'BlazingFist',
    user_metadata: {
      username: 'BlazingFist',
      class: 'Striker',
      rank_tier: 'B-Rank',
      level: 45,
      current_xp: 90000,
      total_xp: 90000,
      stats_strength: 88,
      stats_agility: 75,
      stats_stamina: 78,
      email_confirm: true
    }
  },
  {
    email: 'thunderclaw@test.com',
    password: 'Test123!',
    username: 'ThunderClaw',
    user_metadata: {
      username: 'ThunderClaw',
      class: 'Striker',
      rank_tier: 'B-Rank',
      level: 42,
      current_xp: 84000,
      total_xp: 84000,
      stats_strength: 78,
      stats_agility: 82,
      stats_stamina: 70,
      email_confirm: true
    }
  },
  {
    email: 'shadowstrike@test.com',
    password: 'Test123!',
    username: 'ShadowStrike',
    user_metadata: {
      username: 'ShadowStrike',
      class: 'Assassin',
      rank_tier: 'B-Rank',
      level: 40,
      current_xp: 80000,
      total_xp: 80000,
      stats_strength: 75,
      stats_agility: 85,
      stats_stamina: 70,
      email_confirm: true
    }
  },
  {
    email: 'frozensoul@test.com',
    password: 'Test123!',
    username: 'FrozenSoul',
    user_metadata: {
      username: 'FrozenSoul',
      class: 'Tank',
      rank_tier: 'B-Rank',
      level: 38,
      current_xp: 76000,
      total_xp: 76000,
      stats_strength: 85,
      stats_agility: 68,
      stats_stamina: 82,
      email_confirm: true
    }
  },
  {
    email: 'ironshield@test.com',
    password: 'Test123!',
    username: 'IronShield',
    user_metadata: {
      username: 'IronShield',
      class: 'Tank',
      rank_tier: 'B-Rank',
      level: 35,
      current_xp: 70000,
      total_xp: 70000,
      stats_strength: 88,
      stats_agility: 65,
      stats_stamina: 82,
      email_confirm: true
    }
  },
  {
    email: 'bladerunner@test.com',
    password: 'Test123!',
    username: 'BladeRunner',
    user_metadata: {
      username: 'BladeRunner',
      class: 'Striker',
      rank_tier: 'B-Rank',
      level: 32,
      current_xp: 64000,
      total_xp: 64000,
      stats_strength: 80,
      stats_agility: 78,
      stats_stamina: 75,
      email_confirm: true
    }
  },
  {
    email: 'swiftninja@test.com',
    password: 'Test123!',
    username: 'SwiftNinja',
    user_metadata: {
      username: 'SwiftNinja',
      class: 'Assassin',
      rank_tier: 'C-Rank',
      level: 22,
      current_xp: 44000,
      total_xp: 44000,
      stats_strength: 65,
      stats_agility: 78,
      stats_stamina: 65,
      email_confirm: true
    }
  },
  {
    email: 'cyberwolf@test.com',
    password: 'Test123!',
    username: 'CyberWolf',
    user_metadata: {
      username: 'CyberWolf',
      class: 'Striker',
      rank_tier: 'C-Rank',
      level: 20,
      current_xp: 40000,
      total_xp: 40000,
      stats_strength: 68,
      stats_agility: 75,
      stats_stamina: 65,
      email_confirm: true
    }
  },
  {
    email: 'dreadknight@test.com',
    password: 'Test123!',
    username: 'DreadKnight',
    user_metadata: {
      username: 'DreadKnight',
      class: 'Tank',
      rank_tier: 'C-Rank',
      level: 18,
      current_xp: 36000,
      total_xp: 36000,
      stats_strength: 75,
      stats_agility: 65,
      stats_stamina: 82,
      email_confirm: true
    }
  },
  {
    email: 'silverfang@test.com',
    password: 'Test123!',
    username: 'SilverFang',
    user_metadata: {
      username: 'SilverFang',
      class: 'Assassin',
      rank_tier: 'C-Rank',
      level: 15,
      current_xp: 30000,
      total_xp: 30000,
      stats_strength: 70,
      stats_agility: 80,
      stats_stamina: 65,
      email_confirm: true
    }
  },
  {
    email: 'thunderbolt@test.com',
    password: 'Test123!',
    username: 'ThunderBolt',
    user_metadata: {
      username: 'ThunderBolt',
      class: 'Striker',
      rank_tier: 'C-Rank',
      level: 12,
      current_xp: 24000,
      total_xp: 24000,
      stats_strength: 72,
      stats_agility: 75,
      stats_stamina: 68,
      email_confirm: true
    }
  },
  {
    email: 'ironheart@test.com',
    password: 'Test123!',
    username: 'IronHeart',
    user_metadata: {
      username: 'IronHeart',
      class: 'Tank',
      rank_tier: 'C-Rank',
      level: 10,
      current_xp: 20000,
      total_xp: 20000,
      stats_strength: 68,
      stats_agility: 65,
      stats_stamina: 78,
      email_confirm: true
    }
  },
  {
    email: 'froststrike@test.com',
    password: 'Test123!',
    username: 'FrostStrike',
    user_metadata: {
      username: 'FrostStrike',
      class: 'Striker',
      rank_tier: 'C-Rank',
      level: 8,
      current_xp: 16000,
      total_xp: 16000,
      stats_strength: 65,
      stats_agility: 82,
      stats_stamina: 68,
      email_confirm: true
    }
  },
  {
    email: 'shadowpaw@test.com',
    password: 'Test123!',
    username: 'ShadowPaw',
    user_metadata: {
      username: 'ShadowPaw',
      class: 'Assassin',
      rank_tier: 'C-Rank',
      level: 5,
      current_xp: 10000,
      total_xp: 10000,
      stats_strength: 62,
      stats_agility: 75,
      stats_stamina: 65,
      email_confirm: true
    }
  }
];

async function createUsers() {
  let successCount = 0;
  let failCount = 0;
  const total = existingAccounts.length;

  console.log('🚀 Starting demo accounts creation...');
  console.log(`📊 Project: ${supabaseUrl}`);
  console.log(`📋 Creating ${total} accounts...`);
  console.log('');

  for (let i = 0; i < total; i++) {
    const account = existingAccounts[i];

    try {
      const { data, error } = await supabase.auth.admin.createUser({
        email: account.email,
        password: account.password,
        email_confirm: account.email_confirm,
        user_metadata: account.user_metadata,
      });

      if (error) {
        throw error;
      }

      successCount++;
      console.log(`✅ [${i + 1}/${total}] Created: ${account.username} (${account.user_metadata.rank_tier})`);
    } catch (error) {
      failCount++;
      console.error(`❌ [${i + 1}/${total}] Failed: ${account.username}`);
      console.error(`   Error: ${error.message}`);
    }

    await new Promise(resolve => setTimeout(resolve, 200));
  }

  console.log('');
  console.log('═══════════════════════════════════════════════════════');
  console.log('📊 SUMMARY');
  console.log('═══════════════════════════════════════════');
  console.log(`Total: ${total}`);
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);

  if (successCount > 0) {
    console.log('');
    console.log('🎉 Demo accounts created successfully!');
    console.log('');
    console.log('📝 Login Credentials:');
    console.log('   Email: [username]@test.com');
    console.log('   Password: Test123!');
    console.log('');
    console.log('💡 Next Steps:');
    console.log('   1. Run profile creation SQL:');
    console.log('      - Copy SQL from: supabase/migrations/012_fix_demo_accounts.sql');
    console.log('      - Buka Supabase SQL Editor');
    console.log('      - Paste and execute');
    console.log('   2. Test login:');
    console.log('      - Email: shadowhunter@test.com');
    console.log('      Password: Test123!');
    console.log('   3. Verify profile data');
  } else {
    console.log('');
    console.log('⚠️  No accounts were created!');
    console.log('   Please check:');
    console.log('   1. SERVICE_ROLE_KEY is correct');
    console.log('   2. NEXT_PUBLIC_SUPABASE_URL is correct');
    console.log('   3. Network connection is working');
  }
}

createUsers().catch(error => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});

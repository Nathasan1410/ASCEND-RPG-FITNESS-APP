#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const demoAccounts = [
  { email: 'shadowhunter@test.com', username: 'ShadowHunter' },
  { email: 'phantombblade@test.com', username: 'PhantomBlade' },
  { email: 'thunderstrike@test.com', username: 'ThunderStrike' },
  { email: 'frostwarrior@test.com', username: 'FrostWarrior' },
  { email: 'irontank@test.com', username: 'IronTank' },
  { email: 'flameknight@test.com', username: 'FlameKnight' },
  { email: 'stormrider@test.com', username: 'StormRider' },
  { email: 'voidwalker@test.com', username: 'VoidWalker' },
  { email: 'swiftwolf@test.com', username: 'SwiftWolf' },
  { email: 'cyberdragon@test.com', username: 'CyberDragon' },
  { email: 'blazingfist@test.com', username: 'BlazingFist' },
  { email: 'thunderclaw@test.com', username: 'ThunderClaw' },
  { email: 'shadowstrike@test.com', username: 'ShadowStrike' },
  { email: 'frozensoul@test.com', username: 'FrozenSoul' },
  { email: 'ironshield@test.com', username: 'IronShield' },
  { email: 'bladerunner@test.com', username: 'BladeRunner' },
  { email: 'swiftninja@test.com', username: 'SwiftNinja' },
  { email: 'cyberwolf@test.com', username: 'CyberWolf' },
  { email: 'dreadknight@test.com', username: 'DreadKnight' },
  { email: 'silverfang@test.com', username: 'SilverFang' },
  { email: 'thunderbolt@test.com', username: 'ThunderBolt' },
  { email: 'ironheart@test.com', username: 'IronHeart' },
  { email: 'froststrike@test.com', username: 'FrostStrike' },
  { email: 'shadowpaw@test.com', username: 'ShadowPaw' }
];

async function enableLeaderboardForDemoAccounts() {
  let successCount = 0;
  let failCount = 0;
  const total = demoAccounts.length;

  console.log('🚀 Enabling demo accounts for leaderboard...');
  console.log(`📊 Project: ${supabaseUrl}`);
  console.log(`📋 Updating ${total} accounts...`);
  console.log('');

  for (let i = 0; i < total; i++) {
    const account = demoAccounts[i];

    try {
      const { data: userData, error: userError } = await supabase
        .auth.admin.listUsers();

      if (userError) throw userError;

      const user = userData.users.find(u => u.email === account.email);

      if (!user) {
        throw new Error(`User not found: ${account.email}`);
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          onboarding_done: true,
          hunter_status: 'Verified',
          verified_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      successCount++;
      console.log(`✅ [${i + 1}/${total}] Updated: ${account.username} - Added to leaderboard`);
    } catch (error) {
      failCount++;
      console.error(`❌ [${i + 1}/${total}] Failed: ${account.username}`);
      console.error(`   Error: ${error.message}`);
    }

    await new Promise(resolve => setTimeout(resolve, 100));
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
    console.log('🎉 Demo accounts enabled for leaderboard!');
    console.log('');
    console.log('💡 What was done:');
    console.log('   1. Set onboarding_done = true for all demo accounts');
    console.log('   2. Set hunter_status = "Verified" for all demo accounts');
    console.log('   3. Set verified_at timestamp');
    console.log('');
    console.log('💡 Next Steps:');
    console.log('   1. Refresh the leaderboard page');
    console.log('   2. All 24 demo accounts should now appear');
  } else {
    console.log('');
    console.log('⚠️  No accounts were updated!');
  }
}

enableLeaderboardForDemoAccounts().catch(error => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});

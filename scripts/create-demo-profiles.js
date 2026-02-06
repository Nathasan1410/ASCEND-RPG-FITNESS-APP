#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const demoAccounts = [
  { email: 'shadowhunter@test.com', username: 'ShadowHunter', class: 'Assassin', rank_tier: 'S-Rank', level: 95, current_xp: 237500, total_xp: 237500, stats_strength: 95, stats_agility: 88, stats_stamina: 92 },
  { email: 'phantombblade@test.com', username: 'PhantomBlade', class: 'Striker', rank_tier: 'S-Rank', level: 92, current_xp: 184000, total_xp: 184000, stats_strength: 92, stats_agility: 90, stats_stamina: 88 },
  { email: 'thunderstrike@test.com', username: 'ThunderStrike', class: 'Tank', rank_tier: 'A-Rank', level: 78, current_xp: 156000, total_xp: 156000, stats_strength: 78, stats_agility: 70, stats_stamina: 86 },
  { email: 'frostwarrior@test.com', username: 'FrostWarrior', class: 'Striker', rank_tier: 'A-Rank', level: 75, current_xp: 150000, total_xp: 150000, stats_strength: 75, stats_agility: 85, stats_stamina: 70 },
  { email: 'irontank@test.com', username: 'IronTank', class: 'Tank', rank_tier: 'A-Rank', level: 72, current_xp: 144000, total_xp: 144000, stats_strength: 88, stats_agility: 65, stats_stamina: 78 },
  { email: 'flameknight@test.com', username: 'FlameKnight', class: 'Assassin', rank_tier: 'A-Rank', level: 71, current_xp: 142000, total_xp: 142000, stats_strength: 85, stats_agility: 68, stats_stamina: 80 },
  { email: 'stormrider@test.com', username: 'StormRider', class: 'Striker', rank_tier: 'A-Rank', level: 69, current_xp: 138000, total_xp: 138000, stats_strength: 90, stats_agility: 82, stats_stamina: 72 },
  { email: 'voidwalker@test.com', username: 'VoidWalker', class: 'Assassin', rank_tier: 'A-Rank', level: 68, current_xp: 136000, total_xp: 136000, stats_strength: 88, stats_agility: 90, stats_stamina: 78 },
  { email: 'swiftwolf@test.com', username: 'SwiftWolf', class: 'Assassin', rank_tier: 'B-Rank', level: 52, current_xp: 104000, total_xp: 104000, stats_strength: 70, stats_agility: 82, stats_stamina: 70 },
  { email: 'cyberdragon@test.com', username: 'CyberDragon', class: 'Tank', rank_tier: 'B-Rank', level: 48, current_xp: 96000, total_xp: 96000, stats_strength: 82, stats_agility: 65, stats_stamina: 75 },
  { email: 'blazingfist@test.com', username: 'BlazingFist', class: 'Striker', rank_tier: 'B-Rank', level: 45, current_xp: 90000, total_xp: 90000, stats_strength: 88, stats_agility: 75, stats_stamina: 78 },
  { email: 'thunderclaw@test.com', username: 'ThunderClaw', class: 'Striker', rank_tier: 'B-Rank', level: 42, current_xp: 84000, total_xp: 84000, stats_strength: 78, stats_agility: 82, stats_stamina: 70 },
  { email: 'shadowstrike@test.com', username: 'ShadowStrike', class: 'Assassin', rank_tier: 'B-Rank', level: 40, current_xp: 80000, total_xp: 80000, stats_strength: 75, stats_agility: 85, stats_stamina: 70 },
  { email: 'frozensoul@test.com', username: 'FrozenSoul', class: 'Tank', rank_tier: 'B-Rank', level: 38, current_xp: 76000, total_xp: 76000, stats_strength: 85, stats_agility: 68, stats_stamina: 82 },
  { email: 'ironshield@test.com', username: 'IronShield', class: 'Tank', rank_tier: 'B-Rank', level: 35, current_xp: 70000, total_xp: 70000, stats_strength: 88, stats_agility: 65, stats_stamina: 82 },
  { email: 'bladerunner@test.com', username: 'BladeRunner', class: 'Striker', rank_tier: 'B-Rank', level: 32, current_xp: 64000, total_xp: 64000, stats_strength: 80, stats_agility: 78, stats_stamina: 75 },
  { email: 'swiftninja@test.com', username: 'SwiftNinja', class: 'Assassin', rank_tier: 'C-Rank', level: 22, current_xp: 44000, total_xp: 44000, stats_strength: 65, stats_agility: 78, stats_stamina: 65 },
  { email: 'cyberwolf@test.com', username: 'CyberWolf', class: 'Striker', rank_tier: 'C-Rank', level: 20, current_xp: 40000, total_xp: 40000, stats_strength: 68, stats_agility: 75, stats_stamina: 65 },
  { email: 'dreadknight@test.com', username: 'DreadKnight', class: 'Tank', rank_tier: 'C-Rank', level: 18, current_xp: 36000, total_xp: 36000, stats_strength: 75, stats_agility: 65, stats_stamina: 82 },
  { email: 'silverfang@test.com', username: 'SilverFang', class: 'Assassin', rank_tier: 'C-Rank', level: 15, current_xp: 30000, total_xp: 30000, stats_strength: 70, stats_agility: 80, stats_stamina: 65 },
  { email: 'thunderbolt@test.com', username: 'ThunderBolt', class: 'Striker', rank_tier: 'C-Rank', level: 12, current_xp: 24000, total_xp: 24000, stats_strength: 72, stats_agility: 75, stats_stamina: 68 },
  { email: 'ironheart@test.com', username: 'IronHeart', class: 'Tank', rank_tier: 'C-Rank', level: 10, current_xp: 20000, total_xp: 20000, stats_strength: 68, stats_agility: 65, stats_stamina: 78 },
  { email: 'froststrike@test.com', username: 'FrostStrike', class: 'Striker', rank_tier: 'C-Rank', level: 8, current_xp: 16000, total_xp: 16000, stats_strength: 65, stats_agility: 82, stats_stamina: 68 },
  { email: 'shadowpaw@test.com', username: 'ShadowPaw', class: 'Assassin', rank_tier: 'C-Rank', level: 5, current_xp: 10000, total_xp: 10000, stats_strength: 62, stats_agility: 75, stats_stamina: 65 }
];

async function createProfiles() {
  let successCount = 0;
  let failCount = 0;
  const total = demoAccounts.length;

  console.log('🚀 Starting demo profiles creation...');
  console.log(`📊 Project: ${supabaseUrl}`);
  console.log(`📋 Creating ${total} profiles...`);
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

      const userId = user.id;

      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', userId)
        .single();

      if (existingProfile) {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            username: account.username,
            class: account.class,
            rank_tier: account.rank_tier,
            level: account.level,
            current_xp: account.current_xp,
            total_xp: account.total_xp,
            stats_strength: account.stats_strength,
            stats_agility: account.stats_agility,
            stats_stamina: account.stats_stamina,
          })
          .eq('id', userId);

        if (updateError) throw updateError;

        successCount++;
        console.log(`✅ [${i + 1}/${total}] Updated: ${account.username} (${account.rank_tier})`);
      } else {
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: userId,
            username: account.username,
            class: account.class,
            rank_tier: account.rank_tier,
            level: account.level,
            current_xp: account.current_xp,
            total_xp: account.total_xp,
            stats_strength: account.stats_strength,
            stats_agility: account.stats_agility,
            stats_stamina: account.stats_stamina,
          });

        if (insertError) throw insertError;

        successCount++;
        console.log(`✅ [${i + 1}/${total}] Created: ${account.username} (${account.rank_tier})`);
      }
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
    console.log('🎉 Demo profiles created successfully!');
    console.log('');
    console.log('💡 Next Steps:');
    console.log('   1. Test login:');
    console.log('      - Email: shadowhunter@test.com');
    console.log('      - Password: Test123!');
    console.log('   2. Verify profile data (rank, level, XP, stats)');
  } else {
    console.log('');
    console.log('⚠️  No profiles were created!');
    console.log('   Please check:');
    console.log('   1. Users exist in auth.users table');
    console.log('   2. Profiles table exists');
    console.log('   3. Service role key is valid');
  }
}

createProfiles().catch(error => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});

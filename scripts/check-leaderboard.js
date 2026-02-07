#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkLeaderboardData() {
  console.log('🔍 Checking leaderboard data...');
  console.log('');

  try {
    // Check all profiles ordered by XP
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('id, username, total_xp, level, rank_tier, class, hunter_status, onboarding_done')
      .eq('onboarding_done', true)
      .neq('hunter_status', 'Corrupted')
      .order('total_xp', { ascending: false })
      .limit(10);

    if (error) {
      console.error('❌ Error:', error.message);
      return;
    }

    console.log('✅ Top 10 profiles by XP:');
    console.log('');
    profiles.forEach((p, i) => {
      console.log(`#${i + 1} ${p.username}`);
      console.log(`   Rank: ${p.rank_tier} | Level: ${p.level} | XP: ${p.total_xp}`);
      console.log(`   Status: ${p.hunter_status} | Onboarding: ${p.onboarding_done}`);
      console.log('');
    });

    // Check specifically for Nobume
    const { data: nobume, error: nobumeError } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', 'Nobume')
      .single();

    if (nobumeError) {
      console.error('❌ Nobume not found:', nobumeError.message);
    } else {
      console.log('📊 Nobume profile:');
      console.log(JSON.stringify(nobume, null, 2));
    }

  } catch (error) {
    console.error('💥 Fatal error:', error);
  }
}

checkLeaderboardData();

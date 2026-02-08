#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkUserById() {
  const userId = '1988e762-7754-4da7-9e8f-bc7a9bc1421d';
  
  console.log('🔍 Checking user with ID:', userId);
  console.log('');

  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('❌ Error:', error.message);
      return;
    }

    if (!profile) {
      console.error('❌ Profile not found');
      return;
    }

    console.log('✅ Profile found:');
    console.log(`   Username: ${profile.username}`);
    console.log(`   Class: ${profile.class}`);
    console.log(`   Rank: ${profile.rank_tier}`);
    console.log(`   Level: ${profile.level}`);
    console.log(`   Total XP: ${profile.total_xp}`);
    console.log(`   Hunter Status: ${profile.hunter_status}`);
    console.log(`   Onboarding Done: ${profile.onboarding_done}`);

  } catch (error) {
    console.error('💥 Fatal error:', error);
  }
}

checkUserById();

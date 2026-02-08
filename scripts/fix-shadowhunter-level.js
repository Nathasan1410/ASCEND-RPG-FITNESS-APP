#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixShadowHunterLevel() {
  console.log('🔧 Fixing ShadowHunter level...');
  console.log('');

  try {
    const { data: userData, error: userError } = await supabase.auth.admin.listUsers();
    if (userError) throw userError;

    const shadowHunter = userData.users.find(u => u.email === 'shadowhunter@test.com');
    if (!shadowHunter) throw new Error('ShadowHunter user not found');

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ level: 95, current_xp: 237500, total_xp: 237500 })
      .eq('id', shadowHunter.id);

    if (updateError) throw updateError;

    console.log('✅ ShadowHunter level updated to 95');
    console.log('✅ ShadowHunter XP updated to 237,500');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

fixShadowHunterLevel();

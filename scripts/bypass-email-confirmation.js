#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const demoEmails = [
  'shadowhunter@test.com',
  'phantombblade@test.com',
  'thunderstrike@test.com',
  'frostwarrior@test.com',
  'irontank@test.com',
  'flameknight@test.com',
  'stormrider@test.com',
  'voidwalker@test.com',
  'swiftwolf@test.com',
  'cyberdragon@test.com',
  'blazingfist@test.com',
  'thunderclaw@test.com',
  'shadowstrike@test.com',
  'frozensoul@test.com',
  'ironshield@test.com',
  'bladerunner@test.com',
  'swiftninja@test.com',
  'cyberwolf@test.com',
  'dreadknight@test.com',
  'silverfang@test.com',
  'thunderbolt@test.com',
  'ironheart@test.com',
  'froststrike@test.com',
  'shadowpaw@test.com'
];

async function bypassEmailConfirmation() {
  let successCount = 0;
  let failCount = 0;
  const total = demoEmails.length;

  console.log('🚀 Starting email confirmation bypass...');
  console.log(`📊 Project: ${supabaseUrl}`);
  console.log(`📋 Bypassing ${total} accounts...`);
  console.log('');

  for (let i = 0; i < total; i++) {
    const email = demoEmails[i];

    try {
      const { data: userData, error: userError } = await supabase
        .auth.admin.listUsers();

      if (userError) throw userError;

      const user = userData.users.find(u => u.email === email);

      if (!user) {
        throw new Error(`User not found: ${email}`);
      }

      const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
        email_confirm: true,
        email_confirmed_at: new Date().toISOString()
      });

      if (updateError) throw updateError;

      successCount++;
      console.log(`✅ [${i + 1}/${total}] Bypassed: ${email}`);
    } catch (error) {
      failCount++;
      console.error(`❌ [${i + 1}/${total}] Failed: ${email}`);
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
    console.log('🎉 Email confirmation bypassed successfully!');
    console.log('');
    console.log('💡 Next Steps:');
    console.log('   1. Test login:');
    console.log('      - Email: shadowhunter@test.com');
    console.log('      - Password: Test123!');
    console.log('   2. No email confirmation required anymore!');
  } else {
    console.log('');
    console.log('⚠️  No accounts were bypassed!');
  }
}

bypassEmailConfirmation().catch(error => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});

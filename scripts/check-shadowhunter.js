#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkShadowHunterData() {
  console.log('🔍 Checking ShadowHunter data in Supabase...');
  console.log('');

  try {
    const { data: userData, error: userError } = await supabase.auth.admin.listUsers();

    if (userError) {
      console.error('❌ Error fetching users:', userError.message);
      return;
    }

    const shadowHunter = userData.users.find(u => u.email === 'shadowhunter@test.com');

    if (!shadowHunter) {
      console.error('❌ ShadowHunter user not found in auth.users');
      return;
    }

    console.log('✅ User found in auth.users');
    console.log(`   Email: ${shadowHunter.email}`);
    console.log(`   User ID: ${shadowHunter.id}`);
    console.log('');

    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', shadowHunter.id)
      .single();

    if (profileError) {
      console.error('❌ Error fetching profile:', profileError.message);
      return;
    }

    console.log('✅ Profile found in profiles table');
    console.log(`   Username: ${profileData.username}`);
    console.log(`   Class: ${profileData.class}`);
    console.log(`   Rank: ${profileData.rank_tier}`);
    console.log(`   Level: ${profileData.level}`);
    console.log(`   Total XP: ${profileData.total_xp}`);
    console.log(`   Current XP: ${profileData.current_xp}`);
    console.log(`   Hunter Status: ${profileData.hunter_status}`);
    console.log(`   Onboarding Done: ${profileData.onboarding_done}`);
    console.log('');

    const { data: questData, error: questError } = await supabase
      .from('quests')
      .select('*')
      .eq('user_id', shadowHunter.id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (questError) {
      console.error('❌ Error fetching quests:', questError.message);
      return;
    }

    console.log('✅ Quest history found');
    console.log(`   Total Quests: ${questData.length}`);
    if (questData.length > 0) {
      console.log('');
      console.log('   Recent Quests:');
      questData.forEach((quest, i) => {
        console.log(`   ${i + 1}. ${quest.title} (${quest.quest_type}) - ${quest.status} - ${quest.xp_potential} XP`);
      });
    }

    const { data: achievementData, error: achievementError } = await supabase
      .from('user_achievements')
      .select('achievement_id, unlocked_at')
      .eq('user_id', shadowHunter.id)
      .order('unlocked_at', { ascending: false })
      .limit(10);

    if (achievementError) {
      console.error('❌ Error fetching achievements:', achievementError.message);
      return;
    }

    console.log('');
    console.log('✅ Achievements found');
    console.log(`   Total Unlocked: ${achievementData.length}`);
    if (achievementData.length > 0) {
      console.log('');
      console.log('   Recent Achievements:');
      achievementData.forEach((ach, i) => {
        console.log(`   ${i + 1}. ${ach.achievement_id}`);
      });
    }

    const { data: postData, error: postError } = await supabase
      .from('hunter_feed')
      .select('*')
      .eq('user_id', shadowHunter.id)
      .order('created_at', { ascending: false })
      .limit(5);

    if (postError) {
      console.error('❌ Error fetching posts:', postError.message);
      return;
    }

    console.log('');
    console.log('✅ Feed posts found');
    console.log(`   Total Posts: ${postData.length}`);
    if (postData.length > 0) {
      console.log('');
      console.log('   Recent Posts:');
      postData.forEach((post, i) => {
        console.log(`   ${i + 1}. ${post.title} (${post.post_type}) - ${post.kudos_count} kudos, ${post.respects_count} respects`);
      });
    }

    const { data: streakData, error: streakError } = await supabase
      .from('profiles')
      .select('streak_current, streak_best')
      .eq('id', shadowHunter.id)
      .single();

    if (streakError) {
      console.error('❌ Error fetching streak:', streakError.message);
      return;
    }

    console.log('');
    console.log('✅ Streak data found');
    console.log(`   Current Streak: ${streakData.streak_current}`);
    console.log(`   Best Streak: ${streakData.streak_best}`);

    console.log('');
    console.log('═════════════════════════════════════════════════════');
    console.log('📊 DATA VERIFICATION SUMMARY');
    console.log('═════════════════════════════════════════════');
    console.log('');
    console.log('📋 Expected Data:');
    console.log('   Username: ShadowHunter');
    console.log('   Class: Assassin');
    console.log('   Rank: S-Rank (not E-Rank!)');
    console.log('   Level: 95');
    console.log('   Total XP: 237,500');
    console.log('   Current XP: 237,500');
    console.log('   Hunter Status: Verified');
    console.log('   Onboarding Done: true');
    console.log('');
    console.log('📋 Actual Data in Supabase:');
    console.log(`   Username: ${profileData.username}`);
    console.log(`   Class: ${profileData.class}`);
    console.log(`   Rank: ${profileData.rank_tier}`);
    console.log(`   Level: ${profileData.level}`);
    console.log(`   Total XP: ${profileData.total_xp}`);
    console.log(`   Current XP: ${profileData.current_xp}`);
    console.log(`   Hunter Status: ${profileData.hunter_status}`);
    console.log(`   Onboarding Done: ${profileData.onboarding_done}`);
    console.log('');

    if (profileData.rank_tier === 'S-Rank' && profileData.level === 95) {
      console.log('✅ DATA IS CORRECT!');
      console.log('');
      console.log('💡 The issue is likely in the FRONTEND:');
      console.log('   1. Frontend might be caching old data');
      console.log('   2. Check if you need to refresh the page');
      console.log('   3. Clear browser cache if needed');
    } else {
      console.log('❌ DATA MISMATCH!');
      console.log('');
      console.log('💡 Possible causes:');
      console.log('   1. Profile data was not updated correctly');
      console.log('   2. Script failed to update profile');
      console.log('   3. Multiple profiles exist for this user');
      console.log('');
      console.log('💡 Suggestion:');
      console.log('   Check the logs from earlier scripts to see if profile update succeeded');
    }

  } catch (error) {
    console.error('💥 Fatal error:', error);
  }
}

checkShadowHunterData();

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

const demoPosts = [
  { email: 'shadowhunter@test.com', title: 'Level 95 Milestone!', body: 'Just hit level 95! 💪 Grinding has never felt better. #ascend #fitness', post_type: 'achievement' },
  { email: 'phantombblade@test.com', title: 'Morning Workout Done', body: 'Morning workout done. 5km run + strength training. Ready to tackle the day! 🏃‍♂️', post_type: 'quest_completion' },
  { email: 'thunderstrike@test.com', title: 'S-Rank Achievement!', body: 'Finally unlocked the S-Rank tier badge! The grind was real but worth it 🔥', post_type: 'achievement' },
  { email: 'frostwarrior@test.com', title: 'Motivation Check', body: 'Anyone else struggling with motivation today? Push through! You got this! 💪', post_type: 'tip' },
  { email: 'irontank@test.com', title: 'Personal Record!', body: 'New personal record on bench press: 120kg! Never thought I\'d make it this far.', post_type: 'quest_completion' },
  { email: 'flameknight@test.com', title: '30-Day Challenge Week 2', body: 'Week 2 of my 30-day challenge is complete. 18 more days to go! 💪', post_type: 'quest_completion' },
  { email: 'stormrider@test.com', title: 'Guild Raid Complete', body: 'Just completed a raid workout with my guild. Team effort pays off! 🤝', post_type: 'quest_completion' },
  { email: 'voidwalker@test.com', title: 'Assassin Training', body: 'Assassin training focus today: agility drills and HIIT. Feeling the burn! 🔥', post_type: 'quest_completion' },
  { email: 'swiftwolf@test.com', title: '50 Day Streak!', body: 'Hit my 50th day streak today! Consistency is key! 🎯', post_type: 'achievement' },
  { email: 'cyberdragon@test.com', title: 'Strength Progress', body: 'Tank build paying off. Increased my strength stats significantly! 💪', post_type: 'level_up' }
];

const achievementsData = [
  'first_login', 'first_workout', 'streak_7', 'streak_30', 'level_10', 'level_25',
  'level_50', 'xp_100k', 'xp_250k', 'total_workouts_10', 'total_workouts_50', 'total_workouts_100',
  'rank_c', 'rank_b', 'rank_a', 'rank_s', 'perfect_day', 'early_bird', 'night_owl'
];

const questTemplates = [
  { title: 'Morning Cardio', xp: 500, type: 'Daily', description: 'Complete morning cardio workout session' },
  { title: 'Strength Training', xp: 750, type: 'Daily', description: 'Complete strength training workout' },
  { title: 'HIIT Session', xp: 1000, type: 'Daily', description: 'Complete high-intensity interval training' },
  { title: 'Endurance Run', xp: 600, type: 'Daily', description: 'Complete endurance running session' },
  { title: 'Core Workout', xp: 400, type: 'Daily', description: 'Complete core workout session' },
  { title: 'Flexibility Training', xp: 300, type: 'Daily', description: 'Complete flexibility and mobility training' }
];

async function addDemoData() {
  let postSuccess = 0;
  let questSuccess = 0;
  let achievementSuccess = 0;
  let streakSuccess = 0;
  let failCount = 0;

  console.log('🚀 Adding demo data (posts, quests, achievements, streaks)...');
  console.log(`📊 Project: ${supabaseUrl}`);
  console.log('');

  const { data: userData, error: userError } = await supabase.auth.admin.listUsers();
  if (userError) throw userError;

  const userMap = new Map();
  userData.users.forEach(u => {
    userMap.set(u.email, u.id);
  });

  console.log('📝 Adding hunter feed posts...');
  for (let i = 0; i < demoPosts.length; i++) {
    const post = demoPosts[i];
    const userId = userMap.get(post.email);

    if (!userId) {
      console.error(`⚠️  User not found: ${post.email}`);
      continue;
    }

    try {
      const { error: postError } = await supabase
        .from('hunter_feed')
        .insert({
          user_id: userId,
          post_type: post.post_type,
          title: post.title,
          body: post.body,
          kudos_count: Math.floor(Math.random() * 20),
          respects_count: Math.floor(Math.random() * 15)
        });

      if (postError) throw postError;

      postSuccess++;
      console.log(`✅ Post created for: ${post.email}`);
    } catch (error) {
      failCount++;
      console.error(`❌ Failed to create post for ${post.email}: ${error.message}`);
    }

    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('');
  console.log('🎯 Adding quest history...');
  for (let i = 0; i < demoAccounts.length; i++) {
    const account = demoAccounts[i];
    const userId = userMap.get(account.email);

    if (!userId) {
      console.error(`⚠️  User not found: ${account.username}`);
      continue;
    }

    const numQuests = Math.floor(Math.random() * 5) + 3;

    for (let j = 0; j < numQuests; j++) {
      const template = questTemplates[Math.floor(Math.random() * questTemplates.length)];

      try {
        const { error: questError } = await supabase
          .from('quests')
          .insert({
            user_id: userId,
            title: template.title,
            description: template.description,
            quest_type: template.type,
            xp_potential: template.xp,
            status: 'Completed',
            expires_at: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)).toISOString()
          });

        if (questError) throw questError;

        questSuccess++;
      } catch (error) {
      }
    }

    console.log(`✅ ${numQuests} quests created for ${account.username}`);
    await new Promise(resolve => setTimeout(resolve, 50));
  }

  console.log('');
  console.log('🏆 Adding achievements...');
  for (let i = 0; i < demoAccounts.length; i++) {
    const account = demoAccounts[i];
    const userId = userMap.get(account.email);

    if (!userId) {
      console.error(`⚠️  User not found: ${account.username}`);
      continue;
    }

    const numAchievements = Math.floor(Math.random() * 8) + 5;
    const shuffledAchievements = [...achievementsData].sort(() => Math.random() - 0.5);

    for (let j = 0; j < numAchievements; j++) {
      const achievementId = shuffledAchievements[j];

      try {
        const { error: achievementError } = await supabase
          .from('user_achievements')
          .insert({
            user_id: userId,
            achievement_id: achievementId,
            unlocked_at: new Date(Date.now() - (j * 86400000 * Math.random())).toISOString()
          });

        if (achievementError) throw achievementError;

        achievementSuccess++;
      } catch (error) {
      }
    }

    console.log(`✅ ${numAchievements} achievements unlocked for ${account.username}`);
    await new Promise(resolve => setTimeout(resolve, 50));
  }

  console.log('');
  console.log('🔥 Adding streak data...');
  for (let i = 0; i < demoAccounts.length; i++) {
    const account = demoAccounts[i];
    const userId = userMap.get(account.email);

    if (!userId) {
      console.error(`⚠️  User not found: ${account.username}`);
      continue;
    }

    const currentStreak = Math.floor(Math.random() * 50) + 1;
    const bestStreak = currentStreak + Math.floor(Math.random() * 20);

    try {
      const { error: streakError } = await supabase
        .from('profiles')
        .update({
          streak_current: currentStreak,
          streak_best: bestStreak
        })
        .eq('id', userId);

      if (streakError) throw streakError;

      streakSuccess++;
      console.log(`✅ Streak ${currentStreak} days (best: ${bestStreak}) for ${account.username}`);
    } catch (error) {
      console.error(`❌ Failed to update streak for ${account.username}: ${error.message}`);
    }

    await new Promise(resolve => setTimeout(resolve, 50));
  }

  console.log('');
  console.log('═══════════════════════════════════════════════════════');
  console.log('📊 SUMMARY');
  console.log('═══════════════════════════════════════════');
  console.log(`Posts Created: ${postSuccess}`);
  console.log(`Quests Created: ${questSuccess}`);
  console.log(`Achievements Unlocked: ${achievementSuccess}`);
  console.log(`Streaks Updated: ${streakSuccess}`);
  console.log(`Failed: ${failCount}`);

  if (postSuccess > 0 || questSuccess > 0 || achievementSuccess > 0 || streakSuccess > 0) {
    console.log('');
    console.log('🎉 Demo data added successfully!');
    console.log('');
    console.log('💡 What was added:');
    console.log('   1. Hunter feed posts (10 posts)');
    console.log('   2. Quest history for all 24 users');
    console.log('   3. Achievements unlocked for all 24 users');
    console.log('   4. Streak data for all 24 users');
    console.log('');
    console.log('💡 Next Steps:');
    console.log('   1. Refresh social feed page');
    console.log('   2. Check profile achievements');
    console.log('   3. View quest history');
    console.log('   4. Check leaderboard with streaks');
  } else {
    console.log('');
    console.log('⚠️  No demo data was added!');
  }
}

addDemoData().catch(error => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});

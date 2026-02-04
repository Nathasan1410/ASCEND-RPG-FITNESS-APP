-- ============================================
-- 40 RANDOMIZED DUMMY USERS (E-Rank to S-Rank) - SAFE VERSION
-- ============================================
-- Run this in Supabase SQL Editor

-- ============================================
-- DELETE EXISTING DUMMY DATA (Only specific test users)
-- ============================================

DO $$
BEGIN
  -- Delete existing test users to prevent conflicts
  DELETE FROM auth.users WHERE email LIKE '%@test.com';
END $$;

-- ============================================
-- INSERT 40 USERS
-- ============================================

DO $$
DECLARE
  new_id UUID;
BEGIN
  -- S-Rank (2 users)
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'shadowhunter@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "ShadowHunter"}');
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'phantomblade@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "PhantomBlade"}');

  -- A-Rank (6 users)
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'thunderstrike@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "ThunderStrike"}');
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'frostwarrior@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "FrostWarrior"}');
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'irontank@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "IronTank"}');
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'flameknight@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "FlameKnight"}');
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'stormrider@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "StormRider"}');
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'voidwalker@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "VoidWalker"}');

  -- B-Rank (8 users)
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'swiftwolf@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "SwiftWolf"}');
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'cyberdragon@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "CyberDragon"}');
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'blazingfist@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "BlazingFist"}');
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'thunderclaw@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "ThunderClaw"}');
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'shadowstrike@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "ShadowStrike"}');
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'frozensoul@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "FrozenSoul"}');
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'ironshield@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "IronShield"}');
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'bladerunner@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "BladeRunner"}');

  -- C-Rank (8 users)
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'swiftninja@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "SwiftNinja"}');
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'cyberwolf@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "CyberWolf"}');
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'dreadknight@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "DreadKnight"}');
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'silverfang@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "SilverFang"}');
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'thunderbolt@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "ThunderBolt"}');
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'ironheart@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "IronHeart"}');
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'froststrike@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "FrostStrike"}');
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'shadowpaw@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "ShadowPaw"}');

  -- D-Rank (8 users)
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'emberclaw@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "EmberClaw"}');
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'stormfang@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "StormFang"}');
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'ironclaw@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "IronClaw"}');
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'frostbite@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "FrostBite"}');
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'shadowflame@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "ShadowFlame"}');
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'thunderwing@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "ThunderWing"}');
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'ironpaw@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "IronPaw"}');
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'frosthowl@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "FrostHowl"}');

  -- E-Rank (8 users)
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'emberwing@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "EmberWing"}');
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'stormclaw@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "StormClaw"}');
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'ironfang@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "IronFang"}');
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'frosteye@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "FrostEye"}');
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'shadowtail@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "ShadowTail"}');
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'thunderpaw@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "ThunderPaw"}');
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'ironblade@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "IronBlade"}');
  
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
  VALUES (gen_random_uuid(), 'frostclaw@test.com', crypt('Test123!', gen_salt('bf')), NOW(), '{"username": "FrostClaw"}');
END $$;

-- ============================================
-- UPDATE PROFILES (Profiles created automatically by trigger)
-- ============================================

DO $$
BEGIN
  -- Update S-Rank profiles
  UPDATE profiles SET 
    class = 'Assassin', rank_tier = 'S-Rank', level = 50, current_xp = 2500, total_xp = 185000,
    stats_strength = 95, stats_agility = 98, stats_stamina = 88, streak_current = 45, streak_best = 100,
    hunter_status = 'Verified', onboarding_done = TRUE, height_cm = 175, weight_kg = 70
  WHERE username = 'ShadowHunter';

  UPDATE profiles SET 
    class = 'Assassin', rank_tier = 'S-Rank', level = 48, current_xp = 1800, total_xp = 195000,
    stats_strength = 92, stats_agility = 96, stats_stamina = 90, streak_current = 42, streak_best = 95,
    hunter_status = 'Verified', onboarding_done = TRUE, height_cm = 170, weight_kg = 68
  WHERE username = 'PhantomBlade';

  -- Update A-Rank profiles
  UPDATE profiles SET 
    class = 'Striker', rank_tier = 'A-Rank', level = 45, current_xp = 2200, total_xp = 138000,
    stats_strength = 90, stats_agility = 88, stats_stamina = 85, streak_current = 38, streak_best = 72,
    hunter_status = 'Verified', onboarding_done = TRUE
  WHERE username = 'ThunderStrike';

  UPDATE profiles SET 
    class = 'Tank', rank_tier = 'A-Rank', level = 43, current_xp = 1900, total_xp = 132000,
    stats_strength = 96, stats_agility = 70, stats_stamina = 88, streak_current = 35, streak_best = 68,
    hunter_status = 'Verified', onboarding_done = TRUE
  WHERE username = 'FrostWarrior';

  UPDATE profiles SET 
    class = 'Tank', rank_tier = 'A-Rank', level = 44, current_xp = 2100, total_xp = 126000,
    stats_strength = 98, stats_agility = 65, stats_stamina = 95, streak_current = 33, streak_best = 65,
    hunter_status = 'Verified', onboarding_done = TRUE
  WHERE username = 'IronTank';

  UPDATE profiles SET 
    class = 'Tank', rank_tier = 'A-Rank', level = 42, current_xp = 1700, total_xp = 120000,
    stats_strength = 94, stats_agility = 62, stats_stamina = 90, streak_current = 30, streak_best = 60,
    hunter_status = 'Verified', onboarding_done = TRUE
  WHERE username = 'FlameKnight';

  UPDATE profiles SET 
    class = 'Striker', rank_tier = 'A-Rank', level = 46, current_xp = 2400, total_xp = 134000,
    stats_strength = 89, stats_agility = 90, stats_stamina = 84, streak_current = 40, streak_best = 75,
    hunter_status = 'Verified', onboarding_done = TRUE
  WHERE username = 'StormRider';

  UPDATE profiles SET 
    class = 'Assassin', rank_tier = 'A-Rank', level = 43, current_xp = 2000, total_xp = 116000,
    stats_strength = 88, stats_agility = 94, stats_stamina = 82, streak_current = 36, streak_best = 70,
    hunter_status = 'Normal', onboarding_done = TRUE
  WHERE username = 'VoidWalker';

  -- Update B-Rank profiles (batch update for others)
  UPDATE profiles SET 
    class = 'Striker', rank_tier = 'B-Rank', level = 38, total_xp = 98000,
    stats_strength = 85, stats_agility = 92, stats_stamina = 80, hunter_status = 'Verified', onboarding_done = TRUE
  WHERE username IN ('SwiftWolf', 'CyberDragon', 'BlazingFist');

  UPDATE profiles SET 
    class = 'Tank', rank_tier = 'B-Rank', level = 39, total_xp = 85000,
    stats_strength = 95, stats_agility = 70, stats_stamina = 88, hunter_status = 'Verified', onboarding_done = TRUE
  WHERE username IN ('ThunderClaw', 'FrozenSoul', 'IronShield');

  UPDATE profiles SET 
    class = 'Assassin', rank_tier = 'B-Rank', level = 35, total_xp = 76000,
    stats_strength = 82, stats_agility = 90, stats_stamina = 80, hunter_status = 'Normal', onboarding_done = TRUE
  WHERE username IN ('ShadowStrike', 'BladeRunner');

  -- Update C-Rank profiles
  UPDATE profiles SET 
    class = 'Assassin', rank_tier = 'C-Rank', level = 32, total_xp = 68000,
    stats_strength = 80, stats_agility = 95, stats_stamina = 78, hunter_status = 'Normal', onboarding_done = TRUE
  WHERE username IN ('SwiftNinja', 'SilverFang', 'FrostStrike');

  UPDATE profiles SET 
    class = 'Striker', rank_tier = 'C-Rank', level = 30, total_xp = 62000,
    stats_strength = 86, stats_agility = 82, stats_stamina = 80, hunter_status = 'Normal', onboarding_done = TRUE
  WHERE username IN ('CyberWolf', 'ThunderBolt');

  UPDATE profiles SET 
    class = 'Tank', rank_tier = 'C-Rank', level = 33, total_xp = 65000,
    stats_strength = 93, stats_agility = 68, stats_stamina = 85, hunter_status = 'Normal', onboarding_done = TRUE
  WHERE username IN ('DreadKnight', 'IronHeart', 'ShadowPaw');

  -- Update D-Rank and E-Rank (generic)
  UPDATE profiles SET 
    class = 'Striker', rank_tier = 'D-Rank', level = 25, total_xp = 35000,
    hunter_status = 'Normal', onboarding_done = TRUE
  WHERE username IN ('EmberClaw', 'StormFang', 'ShadowFlame', 'ThunderWing');

  UPDATE profiles SET 
    class = 'Tank', rank_tier = 'D-Rank', level = 25, total_xp = 35000,
    hunter_status = 'Normal', onboarding_done = TRUE
  WHERE username IN ('IronClaw', 'IronPaw');

  UPDATE profiles SET 
    class = 'Assassin', rank_tier = 'D-Rank', level = 22, total_xp = 30000,
    hunter_status = 'Normal', onboarding_done = TRUE
  WHERE username IN ('FrostBite', 'FrostHowl');

  UPDATE profiles SET 
    class = 'Novice', rank_tier = 'E-Rank', level = 10, total_xp = 10000,
    hunter_status = 'Normal', onboarding_done = TRUE
  WHERE username IN ('EmberWing', 'StormClaw', 'IronFang', 'FrostEye', 'ShadowTail', 'ThunderPaw', 'IronBlade', 'FrostClaw');
END $$;

-- ============================================
-- INSERT QUESTS (2 per user)
-- ============================================

DO $$
DECLARE
  user_rec RECORD;
  xp_val INT;
  rank_val TEXT;
BEGIN
  FOR user_rec IN
    SELECT id, username, rank_tier, total_xp FROM profiles 
    WHERE username NOT LIKE 'Operative_%'
    ORDER BY total_xp DESC
  LOOP
    -- Determine base XP by rank
    rank_val := user_rec.rank_tier::TEXT;
    IF rank_val = 'S-Rank' THEN xp_val := 3000;
    ELSIF rank_val = 'A-Rank' THEN xp_val := 2500;
    ELSIF rank_val = 'B-Rank' THEN xp_val := 2000;
    ELSIF rank_val = 'C-Rank' THEN xp_val := 1500;
    ELSIF rank_val = 'D-Rank' THEN xp_val := 1200;
    ELSE xp_val := 1000;
    END IF;
    
    -- Insert 2 quests per user
    INSERT INTO quests (user_id, quest_type, rank_difficulty, plan_json, xp_potential, status, expires_at)
    VALUES
      (user_rec.id, 'Daily', user_rec.rank_tier::rank_tier,
        jsonb_build_object(
          'quest_name', user_rec.username || ' Protocol',
          'exercises', jsonb_build_array(
            jsonb_build_object('name', 'Main Exercise', 'sets', 5, 'reps', 15),
            jsonb_build_object('name', 'Secondary Exercise', 'sets', 4, 'reps', 20),
            jsonb_build_object('name', 'Core Exercise', 'sets', 3, 'reps', 25)
          )
        ),
        xp_val, 'Active', NOW() + INTERVAL '24 hours'),
      (user_rec.id, 'Daily', user_rec.rank_tier::rank_tier,
        jsonb_build_object(
          'quest_name', user_rec.username || ' Training',
          'exercises', jsonb_build_array(
            jsonb_build_object('name', 'Primary Exercise', 'sets', 4, 'reps', 20),
            jsonb_build_object('name', 'Secondary Exercise', 'sets', 5, 'reps', 15),
            jsonb_build_object('name', 'Conditioning', 'sets', 3, 'reps', 10)
          )
        ),
        (xp_val * 0.9)::INT, 'Completed', NOW() - INTERVAL '24 hours');
  END LOOP;
END $$;

-- ============================================
-- INSERT LOGS (1 per user)
-- ============================================

DO $$
DECLARE
  user_rec RECORD;
  completed_quest_id UUID;
  v_duration INT;
  v_feedback TEXT;
  v_rpe INT;
  v_xp INT;
  rank_val TEXT;
BEGIN
  FOR user_rec IN
    SELECT id, username, rank_tier, total_xp FROM profiles 
    WHERE username NOT LIKE 'Operative_%'
    ORDER BY total_xp DESC
  LOOP
    -- Get completed quest ID
    SELECT id INTO completed_quest_id FROM quests
    WHERE user_id = user_rec.id AND status = 'Completed'
    ORDER BY created_at DESC
    LIMIT 1;
    
    -- Randomize workout data
    rank_val := user_rec.rank_tier::TEXT;
    v_duration := CASE 
      WHEN rank_val = 'S-Rank' THEN 45 + (random() * 15)::INT
      WHEN rank_val = 'A-Rank' THEN 40 + (random() * 12)::INT
      WHEN rank_val = 'B-Rank' THEN 35 + (random() * 10)::INT
      WHEN rank_val = 'C-Rank' THEN 30 + (random() * 10)::INT
      WHEN rank_val = 'D-Rank' THEN 25 + (random() * 8)::INT
      ELSE 20 + (random() * 8)::INT
    END;
    
    v_feedback := (ARRAY['Great workout!', 'Pushed my limits!', 'Feeling stronger', 'New PR today!', 'Solid session', 'Good intensity'])[1 + (random() * 5)::INT];
    v_rpe := 7 + (random() * 2)::INT;
    
    v_xp := CASE 
      WHEN rank_val = 'S-Rank' THEN 2700 + (random() * 300)::INT
      WHEN rank_val = 'A-Rank' THEN 2250 + (random() * 250)::INT
      WHEN rank_val = 'B-Rank' THEN 1800 + (random() * 200)::INT
      WHEN rank_val = 'C-Rank' THEN 1350 + (random() * 150)::INT
      WHEN rank_val = 'D-Rank' THEN 1080 + (random() * 120)::INT
      ELSE 900 + (random() * 100)::INT
    END;
    
    -- Insert log
    INSERT INTO logs (quest_id, user_id, duration_actual, user_feedback, rpe_actual, exercises_completed, xp_awarded, safety_score, integrity_score, is_public, proof_type, completed_at)
    VALUES (
      completed_quest_id, user_rec.id, v_duration, v_feedback, v_rpe,
      jsonb_build_array(
        jsonb_build_object('name', 'Main Exercise', 'sets', 5, 'reps_done', 15 + (random() * 10)::INT),
        jsonb_build_object('name', 'Secondary Exercise', 'sets', 4, 'reps_done', 20 + (random() * 8)::INT),
        jsonb_build_object('name', 'Core Exercise', 'sets', 3, 'reps_done', 25 + (random() * 10)::INT)
      ),
      v_xp, 1.0, 1.0, TRUE, 'None',
      NOW() - (INTERVAL '1 day' * (1 + (random() * 7)::INT)));
  END LOOP;
END $$;

-- ============================================
-- INSERT ACHIEVEMENTS (for top tier users)
-- ============================================

DO $$
BEGIN
  -- S-Rank users get legendary achievements
  INSERT INTO user_achievements (user_id, achievement_id, unlocked_at)
  SELECT 
    p.id, (SELECT id FROM achievements WHERE name = 'Legendary Hunter'), NOW() - INTERVAL '30 days'
  FROM profiles p
  WHERE p.rank_tier = 'S-Rank';
  
  INSERT INTO user_achievements (user_id, achievement_id, unlocked_at)
  SELECT 
    p.id, (SELECT id FROM achievements WHERE name = 'Eternal Flame'), NOW() - INTERVAL '25 days'
  FROM profiles p
  WHERE p.rank_tier = 'S-Rank';
  
  INSERT INTO user_achievements (user_id, achievement_id, unlocked_at)
  SELECT 
    p.id, (SELECT id FROM achievements WHERE name = 'S-Rank Hunter'), NOW() - INTERVAL '20 days'
  FROM profiles p
  WHERE p.rank_tier = 'S-Rank';
  
  -- A-Rank users get epic achievements
  INSERT INTO user_achievements (user_id, achievement_id, unlocked_at)
  SELECT 
    p.id, (SELECT id FROM achievements WHERE name = 'Elite Hunter'), NOW() - INTERVAL '25 days'
  FROM profiles p
  WHERE p.rank_tier = 'A-Rank';
  
  INSERT INTO user_achievements (user_id, achievement_id, unlocked_at)
  SELECT 
    p.id, (SELECT id FROM achievements WHERE name = 'A-Rank Hunter'), NOW() - INTERVAL '20 days'
  FROM profiles p
  WHERE p.rank_tier = 'A-Rank';
END $$;

-- ============================================
-- REFRESH LEADERBOARD
-- ============================================

REFRESH MATERIALIZED VIEW CONCURRENTLY leaderboard_mv;

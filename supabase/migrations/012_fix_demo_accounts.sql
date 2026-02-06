-- ============================================
-- FIX DEMO ACCOUNTS - REMOVAL & INSTRUCTIONS
-- ============================================
-- Run this in Supabase SQL Editor to remove broken demo accounts
-- ============================================

-- REMOVE BROKEN DEMO DATA
-- The old demo accounts used deprecated crypt() function
-- which caused login failures with "Test123!" password
-- ============================================

DO $$
BEGIN
  -- Delete all test users to prevent conflicts
  -- These accounts cannot login because their passwords
  -- were hashed with deprecated crypt() function
  DELETE FROM auth.users WHERE email LIKE '%@test.com';
  
  -- Also delete associated profiles
  DELETE FROM profiles WHERE id IN (
    SELECT id FROM profiles WHERE id NOT IN (SELECT id FROM auth.users)
  );
END $$;

-- ============================================
-- HOW TO CREATE WORKING DEMO ACCOUNTS
-- ============================================
-- DO NOT use SQL to create auth users anymore!
-- Use one of these methods instead:

-- METHOD 1: Supabase Dashboard (RECOMMENDED)
-- 1. Go to https://supabase.com/dashboard
-- 2. Select your project
-- 3. Go to Authentication > Users
-- 4. Click "Add user" and create these accounts:

-- S-Rank Users:
-- Email: shadowhunter@test.com | Password: Test123!
-- Email: phantombblade@test.com | Password: Test123!

-- A-Rank Users:
-- Email: thunderstrike@test.com | Password: Test123!
-- Email: frostwarrior@test.com | Password: Test123!
-- Email: irontank@test.com | Password: Test123!
-- Email: flameknight@test.com | Password: Test123!
-- Email: stormrider@test.com | Password: Test123!
-- Email: voidwalker@test.com | Password: Test123!

-- B-Rank Users:
-- Email: swiftwolf@test.com | Password: Test123!
-- Email: cyberdragon@test.com | Password: Test123!
-- Email: blazingfist@test.com | Password: Test123!
-- Email: thunderclaw@test.com | Password: Test123!
-- Email: shadowstrike@test.com | Password: Test123!
-- Email: frozensoul@test.com | Password: Test123!
-- Email: ironshield@test.com | Password: Test123!
-- Email: bladerunner@test.com | Password: Test123!

-- C-Rank Users:
-- Email: swiftninja@test.com | Password: Test123!
-- Email: cyberwolf@test.com | Password: Test123!
-- Email: dreadknight@test.com | Password: Test123!
-- Email: silverfang@test.com | Password: Test123!
-- Email: thunderbolt@test.com | Password: Test123!
-- Email: ironheart@test.com | Password: Test123!
-- Email: froststrike@test.com | Password: Test123!
-- Email: shadowpaw@test.com | Password: Test123!

-- For each user, add these metadata in the dashboard:
-- {
--   "username": "HunterName",
--   "class": "Novice" | "Striker" | "Tank" | "Assassin",
--   "rank_tier": "E-Rank" | "D-Rank" | "C-Rank" | "B-Rank" | "A-Rank" | "S-Rank",
--   "level": <number>,
--   "xp": <number>
-- }

-- METHOD 2: Supabase CLI
-- Run these commands:
-- supabase auth signup --email shadowhunter@test.com --password Test123!
-- supabase auth signup --email phantombblade@test.com --password Test123!
-- (repeat for all demo accounts)

-- Then update profiles with appropriate rank/level/xp data

-- METHOD 3: Create API Endpoint (BEST FOR DEV)
-- Create app/api/create-demo-account/route.ts with:
-- POST /api/create-demo-account
-- Body: { username, email, password, class, rank, level, xp }
-- This creates user via Supabase Client SDK automatically

-- ============================================
-- AFTER CREATING USERS IN DASHBOARD
-- ============================================
-- Run this SQL to create profiles for the users:

DO $$
DECLARE
  user_record RECORD;
  class_type user_class;
  rank_type rank_tier;
BEGIN
  -- S-Rank Profiles
  INSERT INTO profiles (id, username, class, rank_tier, level, current_xp, total_xp, stats_strength, stats_agility, stats_stamina)
  SELECT 
    id, 
    'ShadowHunter', 
    'Assassin'::user_class, 
    'S-Rank'::rank_tier, 
    95, 245000, 245000, 95, 88, 92
  FROM auth.users WHERE email = 'shadowhunter@test.com';
  
  INSERT INTO profiles (id, username, class, rank_tier, level, current_xp, total_xp, stats_strength, stats_agility, stats_stamina)
  SELECT 
    id, 
    'PhantomBlade', 
    'Striker'::user_class, 
    'S-Rank'::rank_tier, 
    92, 238000, 238000, 92, 90, 88
  FROM auth.users WHERE email = 'phantombblade@test.com';

  -- A-Rank Profiles
  INSERT INTO profiles (id, username, class, rank_tier, level, current_xp, total_xp, stats_strength, stats_agility, stats_stamina)
  SELECT 
    id, 
    'ThunderStrike', 
    'Tank'::user_class, 
    'A-Rank'::rank_tier, 
    78, 156000, 156000, 78, 70, 86
  FROM auth.users WHERE email = 'thunderstrike@test.com';
  
  INSERT INTO profiles (id, username, class, rank_tier, level, current_xp, total_xp, stats_strength, stats_agility, stats_stamina)
  SELECT 
    id, 
    'FrostWarrior', 
    'Striker'::user_class, 
    'A-Rank'::rank_tier, 
    75, 150000, 150000, 75, 85, 70
  FROM auth.users WHERE email = 'frostwarrior@test.com';
  
  INSERT INTO profiles (id, username, class, rank_tier, level, current_xp, total_xp, stats_strength, stats_agility, stats_stamina)
  SELECT 
    id, 
    'IronTank', 
    'Tank'::user_class, 
    'A-Rank'::rank_tier, 
    72, 144000, 144000, 88, 65, 78
  FROM auth.users WHERE email = 'irontank@test.com';
  
  INSERT INTO profiles (id, username, class, rank_tier, level, current_xp, total_xp, stats_strength, stats_agility, stats_stamina)
  SELECT 
    id, 
    'FlameKnight', 
    'Tank'::user_class, 
    'A-Rank'::rank_tier, 
    71, 142000, 142000, 85, 68, 80
  FROM auth.users WHERE email = 'flameknight@test.com';
  
  INSERT INTO profiles (id, username, class, rank_tier, level, current_xp, total_xp, stats_strength, stats_agility, stats_stamina)
  SELECT 
    id, 
    'StormRider', 
    'Striker'::user_class, 
    'A-Rank'::rank_tier, 
    69, 138000, 138000, 90, 82, 72
  FROM auth.users WHERE email = 'stormrider@test.com';
  
  INSERT INTO profiles (id, username, class, rank_tier, level, current_xp, total_xp, stats_strength, stats_agility, stats_stamina)
  SELECT 
    id, 
    'VoidWalker', 
    'Assassin'::user_class, 
    'A-Rank'::rank_tier, 
    68, 136000, 136000, 88, 90, 78
  FROM auth.users WHERE email = 'voidwalker@test.com';

  -- B-Rank Profiles
  INSERT INTO profiles (id, username, class, rank_tier, level, current_xp, total_xp, stats_strength, stats_agility, stats_stamina)
  SELECT 
    id, 
    'SwiftWolf', 
    'Assassin'::user_class, 
    'B-Rank'::rank_tier, 
    52, 104000, 104000, 70, 82, 70
  FROM auth.users WHERE email = 'swiftwolf@test.com';
  
  INSERT INTO profiles (id, username, class, rank_tier, level, current_xp, total_xp, stats_strength, stats_agility, stats_stamina)
  SELECT 
    id, 
    'CyberDragon', 
    'Tank'::user_class, 
    'B-Rank'::rank_tier, 
    48, 96000, 96000, 82, 65, 75
  FROM auth.users WHERE email = 'cyberdragon@test.com';
  
  INSERT INTO profiles (id, username, class, rank_tier, level, current_xp, total_xp, stats_strength, stats_agility, stats_stamina)
  SELECT 
    id, 
    'BlazingFist', 
    'Striker'::user_class, 
    'B-Rank'::rank_tier, 
    45, 90000, 90000, 88, 75, 78
  FROM auth.users WHERE email = 'blazingfist@test.com';
  
  INSERT INTO profiles (id, username, class, rank_tier, level, current_xp, total_xp, stats_strength, stats_agility, stats_stamina)
  SELECT 
    id, 
    'ThunderClaw', 
    'Striker'::user_class, 
    'B-Rank'::rank_tier, 
    42, 84000, 84000, 78, 82, 70
  FROM auth.users WHERE email = 'thunderclaw@test.com';
  
  INSERT INTO profiles (id, username, class, rank_tier, level, current_xp, total_xp, stats_strength, stats_agility, stats_stamina)
  SELECT 
    id, 
    'ShadowStrike', 
    'Assassin'::user_class, 
    'B-Rank'::rank_tier, 
    40, 80000, 80000, 75, 85, 70
  FROM auth.users WHERE email = 'shadowstrike@test.com';
  
  INSERT INTO profiles (id, username, class, rank_tier, level, current_xp, total_xp, stats_strength, stats_agility, stats_stamina)
  SELECT 
    id, 
    'FrozenSoul', 
    'Tank'::user_class, 
    'B-Rank'::rank_tier, 
    38, 76000, 76000, 85, 68, 82
  FROM auth.users WHERE email = 'frozensoul@test.com';
  
  INSERT INTO profiles (id, username, class, rank_tier, level, current_xp, total_xp, stats_strength, stats_agility, stats_stamina)
  SELECT 
    id, 
    'IronShield', 
    'Tank'::user_class, 
    'B-Rank'::rank_tier, 
    35, 70000, 70000, 88, 65, 82
  FROM auth.users WHERE email = 'ironshield@test.com';
  
  INSERT INTO profiles (id, username, class, rank_tier, level, current_xp, total_xp, stats_strength, stats_agility, stats_stamina)
  SELECT 
    id, 
    'BladeRunner', 
    'Striker'::user_class, 
    'B-Rank'::rank_tier, 
    32, 64000, 64000, 80, 78, 75
  FROM auth.users WHERE email = 'bladerunner@test.com';

  -- C-Rank Profiles
  INSERT INTO profiles (id, username, class, rank_tier, level, current_xp, total_xp, stats_strength, stats_agility, stats_stamina)
  SELECT 
    id, 
    'SwiftNinja', 
    'Assassin'::user_class, 
    'C-Rank'::rank_tier, 
    22, 44000, 44000, 65, 78, 65
  FROM auth.users WHERE email = 'swiftninja@test.com';
  
  INSERT INTO profiles (id, username, class, rank_tier, level, current_xp, total_xp, stats_strength, stats_agility, stats_stamina)
  SELECT 
    id, 
    'CyberWolf', 
    'Striker'::user_class, 
    'C-Rank'::rank_tier, 
    20, 40000, 40000, 68, 75, 65
  FROM auth.users WHERE email = 'cyberwolf@test.com';
  
  INSERT INTO profiles (id, username, class, rank_tier, level, current_xp, total_xp, stats_strength, stats_agility, stats_stamina)
  SELECT 
    id, 
    'DreadKnight', 
    'Tank'::user_class, 
    'C-Rank'::rank_tier, 
    18, 36000, 36000, 75, 65, 82
  FROM auth.users WHERE email = 'dreadknight@test.com';
  
  INSERT INTO profiles (id, username, class, rank_tier, level, current_xp, total_xp, stats_strength, stats_agility, stats_stamina)
  SELECT 
    id, 
    'SilverFang', 
    'Assassin'::user_class, 
    'C-Rank'::rank_tier, 
    15, 30000, 30000, 70, 80, 65
  FROM auth.users WHERE email = 'silverfang@test.com';
  
  INSERT INTO profiles (id, username, class, rank_tier, level, current_xp, total_xp, stats_strength, stats_agility, stats_stamina)
  SELECT 
    id, 
    'ThunderBolt', 
    'Striker'::user_class, 
    'C-Rank'::rank_tier, 
    12, 24000, 24000, 72, 75, 68
  FROM auth.users WHERE email = 'thunderbolt@test.com';
  
  INSERT INTO profiles (id, username, class, rank_tier, level, current_xp, total_xp, stats_strength, stats_agility, stats_stamina)
  SELECT 
    id, 
    'IronHeart', 
    'Tank'::user_class, 
    'C-Rank'::rank_tier, 
    10, 20000, 20000, 68, 65, 78
  FROM auth.users WHERE email = 'ironheart@test.com';
  
  INSERT INTO profiles (id, username, class, rank_tier, level, current_xp, total_xp, stats_strength, stats_agility, stats_stamina)
  SELECT 
    id, 
    'FrostStrike', 
    'Striker'::user_class, 
    'C-Rank'::rank_tier, 
    8, 16000, 16000, 65, 82, 68
  FROM auth.users WHERE email = 'froststrike@test.com';
  
  INSERT INTO profiles (id, username, class, rank_tier, level, current_xp, total_xp, stats_strength, stats_agility, stats_stamina)
  SELECT 
    id, 
    'ShadowPaw', 
    'Assassin'::user_class, 
    'C-Rank'::rank_tier, 
    5, 10000, 10000, 62, 75, 65
  FROM auth.users WHERE email = 'shadowpaw@test.com';
  
  RAISE NOTICE 'Demo profiles created successfully!';
END $$;

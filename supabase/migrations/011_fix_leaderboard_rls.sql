-- ============================================
-- SIMPLIFIED LEADERBOARD FIX
-- ============================================

-- 1. Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_leaderboard_optimized TO authenticated;

-- 2. Fix RLS policies on profiles
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

CREATE POLICY "Profiles are viewable by everyone" ON profiles
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 3. Refresh materialized view
REFRESH MATERIALIZED VIEW CONCURRENTLY leaderboard_mv;

-- 4. Verify data exists
SELECT 
  COUNT(*) as total_users,
  AVG(total_xp)::BIGINT as avg_xp,
  MIN(total_xp) as min_xp,
  MAX(total_xp) as max_xp
FROM profiles
WHERE onboarding_done = true;

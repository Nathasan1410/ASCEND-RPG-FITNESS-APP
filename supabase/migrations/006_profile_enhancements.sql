-- Parts VI & VII: Database Enhancements
-- Run this in Supabase SQL Editor

-- Add missing fields to profiles table
ALTER TABLE profiles 
  ADD COLUMN IF NOT EXISTS bio TEXT,
  ADD COLUMN IF NOT EXISTS display_name TEXT,
  ADD COLUMN IF NOT EXISTS banner_url TEXT,
  ADD COLUMN IF NOT EXISTS allow_friend_requests BOOLEAN DEFAULT TRUE;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_public ON profiles(public_profile, total_xp DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_rank ON profiles(rank_tier, level DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_class ON profiles(class, total_xp DESC);

-- Materialized view for leaderboard (faster queries)
CREATE MATERIALIZED VIEW IF NOT EXISTS leaderboard_mv AS
SELECT 
  p.id as user_id,
  p.username,
  p.rank_tier,
  p.level,
  p.total_xp,
  p.class,
  p.stats_strength,
  p.stats_agility,
  p.stats_stamina,
  ROW_NUMBER() OVER (PARTITION BY p.rank_tier ORDER BY p.total_xp DESC) as rank_in_tier
FROM profiles p
WHERE p.hunter_status != 'Corrupted'
WITH DATA;

-- Unique index for concurrent refresh
CREATE UNIQUE INDEX IF NOT EXISTS idx_leaderboard_mv_user_id ON leaderboard_mv(user_id);

-- Function to refresh materialized view
CREATE OR REPLACE FUNCTION refresh_leaderboard()
RETURNS VOID AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY leaderboard_mv;
END;
$$ LANGUAGE plpgsql;

-- Comments for documentation
COMMENT ON COLUMN profiles.bio IS 'User self-description (max 150 chars)';
COMMENT ON COLUMN profiles.display_name IS 'Display name (max 50 chars)';
COMMENT ON COLUMN profiles.banner_url IS 'URL to custom banner image (1920x480)';
COMMENT ON COLUMN profiles.allow_friend_requests IS 'Whether user accepts friend requests';
COMMENT ON MATERIALIZED VIEW leaderboard_mv IS 'Materialized leaderboard view for fast queries';
COMMENT ON FUNCTION refresh_leaderboard() IS 'Refresh materialized leaderboard view';

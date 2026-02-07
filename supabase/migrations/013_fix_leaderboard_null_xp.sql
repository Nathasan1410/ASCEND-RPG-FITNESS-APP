-- Fix leaderboard to handle null XP values
-- This ensures users with null XP appear at the bottom, not top

-- Option 1: Update RPC function to use COALESCE
CREATE OR REPLACE FUNCTION get_leaderboard_optimized(
  p_limit INT DEFAULT 50,
  p_rank_filter VARCHAR(10) DEFAULT 'all',
  p_class_filter VARCHAR(10) DEFAULT 'all'
)
RETURNS TABLE (
  user_id UUID,
  username TEXT,
  total_xp BIGINT,
  level INT,
  rank_tier TEXT,
  class TEXT,
  stats_strength INT,
  stats_agility INT,
  stats_stamina INT,
  streak_current INT,
  global_rank BIGINT
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    p.id as user_id,
    p.username,
    COALESCE(p.total_xp, 0) as total_xp,
    p.level,
    p.rank_tier::TEXT,
    p.class,
    p.stats_strength,
    p.stats_agility,
    p.stats_stamina,
    p.streak_current,
    ROW_NUMBER() OVER (ORDER BY COALESCE(p.total_xp, 0) DESC) as global_rank
  FROM profiles p
  WHERE p.hunter_status != 'Corrupted'
    AND p.onboarding_done = true
    AND (p_rank_filter = 'all' OR p.rank_tier::TEXT = p_rank_filter)
    AND (p_class_filter = 'all' OR p.class::TEXT = p_class_filter)
  ORDER BY COALESCE(p.total_xp, 0) DESC
  LIMIT p_limit;
$$;

COMMENT ON FUNCTION get_leaderboard_optimized IS 'Fixed: Uses COALESCE to handle null XP values, ensuring proper ranking order';

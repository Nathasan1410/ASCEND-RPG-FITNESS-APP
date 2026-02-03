-- ============================================
-- PART I: OPTIMIZATION - QUICK WINS
-- Database Performance Indexes
-- ============================================
-- Priority: P0 - CRITICAL
-- Expected Impact: -70% query latency
-- Estimated Time: 1 hour

-- ============================================
-- 1. PRIMARY INDEXES (Most Queried Columns)
-- ============================================

-- Index for profile lookups by user + rank
-- Used in: Dashboard, Leaderboard, Profile pages
CREATE INDEX IF NOT EXISTS idx_profiles_user_rank
ON profiles(id, rank_tier DESC);

-- Composite index for quest queries
-- Used in: Dashboard (active quest), Quest History
-- Pattern: user's quests ordered by status and date
CREATE INDEX IF NOT EXISTS idx_quests_user_status_created
ON quests(user_id, status, created_at DESC);

-- Index for user logs (history)
-- Used in: Profile pages, Match History, XP calculations
-- Pattern: Get user's workout history ordered by date
CREATE INDEX IF NOT EXISTS idx_logs_user_created
ON logs(user_id, completed_at DESC);

-- Partial index for leaderboard (exclude Corrupted users)
-- Used in: Leaderboard page, Global rankings
-- Pattern: Rank users, exclude cheaters
CREATE INDEX IF NOT EXISTS idx_leaderboard_xp_partial
ON profiles(total_xp DESC, rank_tier)
WHERE hunter_status != 'Corrupted';

-- Partial index for public profiles (activity feed)
-- Used in: Public profile feed, Discovery
-- Pattern: Show only onboarding-completed profiles, ordered by total XP
CREATE INDEX IF NOT EXISTS idx_profiles_public_partial
ON profiles(onboarding_done, total_xp DESC, created_at DESC)
WHERE onboarding_done = true;

-- ============================================
-- 2. SECONDARY INDEXES (Frequent Query Patterns)
-- ============================================

-- Index for active quests (dashboard optimization)
CREATE INDEX IF NOT EXISTS idx_quests_active_user
ON quests(user_id, status)
WHERE status = 'Active';

-- Index for completed logs (stats calculation)
CREATE INDEX IF NOT EXISTS idx_logs_completed
ON logs(user_id, completed_at DESC, xp_awarded DESC);

-- Index for hunter status queries (anti-cheat checks)
CREATE INDEX IF NOT EXISTS idx_profiles_hunter_status
ON profiles(hunter_status, report_count DESC);

-- Index for quest expiration (cleanup jobs)
CREATE INDEX IF NOT EXISTS idx_quests_expires
ON quests(expires_at)
WHERE status = 'Active';

-- ============================================
-- 3. OPTIMIZATION QUERIES (Materialized View Refresh)
-- ============================================

-- Function to periodically refresh materialized views
-- Called by: Cron job or scheduled task
CREATE OR REPLACE FUNCTION optimize_refresh_leaderboard()
RETURNS VOID AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY leaderboard_mv;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 4. QUERY PERFORMANCE HINTS
-- ============================================

-- Add comments to indexes for documentation
COMMENT ON INDEX idx_profiles_user_rank IS 'Primary lookup index for profile queries by user + rank tier';
COMMENT ON INDEX idx_quests_user_status_created IS 'Composite index for quest filtering by user, status, date';
COMMENT ON INDEX idx_logs_user_created IS 'Index for workout history queries, ordered by completion date';
COMMENT ON INDEX idx_leaderboard_xp_partial IS 'Partial index excluding corrupted users from rankings';
COMMENT ON INDEX idx_profiles_public_partial IS 'Partial index for onboarding-completed profile discovery feed';

-- ============================================
-- VERIFICATION QUERIES (Run to verify indexes)
-- ============================================

-- Check if indexes exist and are being used:
-- SELECT indexname, indexdef FROM pg_indexes WHERE schemaname = 'public';
-- ANALYZE profiles;
-- ANALYZE quests;
-- ANALYZE logs;

-- Explain query plans to verify index usage:
-- EXPLAIN ANALYZE SELECT * FROM profiles WHERE id = $1;
-- EXPLAIN ANALYZE SELECT * FROM quests WHERE user_id = $1 AND status = 'Active';

-- ============================================
-- END OF PART I OPTIMIZATION MIGRATION
-- ============================================

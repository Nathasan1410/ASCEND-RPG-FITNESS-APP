-- Social Media Feed - Hunter Network Database Schema
-- Version: 1.0
-- Created: February 3, 2026

-- ============================================
-- HUNTER FEED POSTS
-- ============================================

CREATE TABLE IF NOT EXISTS hunter_feed (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,

  -- Post Content
  post_type TEXT NOT NULL CHECK (post_type IN (
    'quest_completion', 'rank_up', 'level_up',
    'achievement', 'tip', 'guild_announcement'
  )),
  title TEXT NOT NULL,
  body TEXT,
  quest_id UUID REFERENCES quests(id) ON DELETE CASCADE,

  -- Quest Data (for quest_completion posts)
  quest_data JSONB,

  -- Engagement Metrics
  kudos_count INT DEFAULT 0,
  respects_count INT DEFAULT 0,
  analysis_count INT DEFAULT 0,

  -- Media
  proof_media_url TEXT,
  proof_type TEXT CHECK (proof_type IN ('Photo', 'Video', 'None')),

  -- Tags & Metadata
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- FEED ENGAGEMENT (Kudos, Respects, Analysis/Comments)
-- ============================================

CREATE TABLE IF NOT EXISTS feed_engagement (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feed_post_id UUID REFERENCES hunter_feed(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  engagement_type TEXT NOT NULL CHECK (engagement_type IN ('kudos', 'respect', 'analysis')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(feed_post_id, user_id, engagement_type)
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_feed_created ON hunter_feed(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feed_user ON hunter_feed(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feed_type ON hunter_feed(post_type);
CREATE INDEX IF NOT EXISTS idx_feed_engagement_post ON feed_engagement(feed_post_id);
CREATE INDEX IF NOT EXISTS idx_feed_engagement_user ON feed_engagement(user_id);

-- ============================================
-- RPC FUNCTIONS FOR ENGAGEMENT COUNTERS
-- ============================================

-- Increment kudos count atomically
CREATE OR REPLACE FUNCTION increment_kudos_count(post_id UUID)
RETURNS INT AS $$
BEGIN
  UPDATE hunter_feed
  SET kudos_count = kudos_count + 1
  WHERE id = post_id;
  RETURN kudos_count;
END;
$$ LANGUAGE plpgsql;

-- Decrement kudos count atomically
CREATE OR REPLACE FUNCTION decrement_kudos_count(post_id UUID)
RETURNS INT AS $$
BEGIN
  UPDATE hunter_feed
  SET kudos_count = GREATEST(0, kudos_count - 1)
  WHERE id = post_id;
  RETURN kudos_count;
END;
$$ LANGUAGE plpgsql;

-- Increment respects count atomically
CREATE OR REPLACE FUNCTION increment_respects_count(post_id UUID)
RETURNS INT AS $$
BEGIN
  UPDATE hunter_feed
  SET respects_count = respects_count + 1
  WHERE id = post_id;
  RETURN respects_count;
END;
$$ LANGUAGE plpgsql;

-- Decrement respects count atomically
CREATE OR REPLACE FUNCTION decrement_respects_count(post_id UUID)
RETURNS INT AS $$
BEGIN
  UPDATE hunter_feed
  SET respects_count = GREATEST(0, respects_count - 1)
  WHERE id = post_id;
  RETURN respects_count;
END;
$$ LANGUAGE plpgsql;

-- Increment analysis count atomically
CREATE OR REPLACE FUNCTION increment_analysis_count(post_id UUID)
RETURNS INT AS $$
BEGIN
  UPDATE hunter_feed
  SET analysis_count = analysis_count + 1
  WHERE id = post_id;
  RETURN analysis_count;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

ALTER TABLE hunter_feed ENABLE ROW LEVEL SECURITY;
ALTER TABLE feed_engagement ENABLE ROW LEVEL SECURITY;

-- Feed: Public read, users can create their own posts
CREATE POLICY "Feed is publicly readable" ON hunter_feed
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create posts" ON hunter_feed
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts" ON hunter_feed
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts" ON hunter_feed
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Engagement: Users can engage with posts
CREATE POLICY "Users can view engagements" ON feed_engagement
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create engagements" ON feed_engagement
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own engagements" ON feed_engagement
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

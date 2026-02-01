-- ============================================
-- ENUMS
-- ============================================
CREATE TYPE user_class AS ENUM ('Novice', 'Striker', 'Tank', 'Assassin');
CREATE TYPE rank_tier AS ENUM ('E-Rank', 'D-Rank', 'C-Rank', 'B-Rank', 'A-Rank', 'S-Rank');
CREATE TYPE quest_status AS ENUM ('Active', 'Completed', 'Failed', 'Skipped', 'Pending_Verification');
CREATE TYPE quest_type AS ENUM ('Daily', 'Special', 'Penalty', 'RankUp');
CREATE TYPE hunter_status AS ENUM ('Normal', 'Verified', 'Flagged', 'Corrupted');
CREATE TYPE proof_type AS ENUM ('None', 'Photo', 'Video', 'Timelapse');
CREATE TYPE verification_status AS ENUM ('Auto_Approved', 'Pending', 'Verified', 'Rejected');
CREATE TYPE report_reason AS ENUM ('Impossible_Stats', 'Fake_Media', 'Suspicious_Pattern', 'Other');
CREATE TYPE report_status AS ENUM ('Pending', 'Reviewed', 'Confirmed', 'Dismissed');

-- ============================================
-- PROFILES TABLE
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  class user_class DEFAULT 'Novice',
  rank_tier rank_tier DEFAULT 'E-Rank',
  level INT DEFAULT 1,
  current_xp BIGINT DEFAULT 0,
  total_xp BIGINT DEFAULT 0,
  stats_strength INT DEFAULT 10,
  stats_agility INT DEFAULT 10,
  stats_stamina INT DEFAULT 10,
  streak_current INT DEFAULT 0,
  streak_best INT DEFAULT 0,
  -- Anti-Cheat Fields
  hunter_status hunter_status DEFAULT 'Normal',
  verified_at TIMESTAMPTZ,
  report_count INT DEFAULT 0,
  -- Profile Data
  last_activity_at TIMESTAMPTZ,
  onboarding_done BOOLEAN DEFAULT FALSE,
  height_cm INT,
  weight_kg INT,
  equipment TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- QUESTS TABLE
-- ============================================
CREATE TABLE quests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  quest_type quest_type DEFAULT 'Daily',
  rank_difficulty rank_tier NOT NULL,
  plan_json JSONB NOT NULL,
  xp_potential INT NOT NULL,
  status quest_status DEFAULT 'Active',
  requires_proof BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- LOGS TABLE
-- ============================================
CREATE TABLE logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quest_id UUID REFERENCES quests(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  duration_actual INT NOT NULL,
  user_feedback TEXT,
  rpe_actual INT CHECK (rpe_actual >= 1 AND rpe_actual <= 10),
  exercises_completed JSONB,
  xp_awarded INT DEFAULT 0,
  safety_score FLOAT DEFAULT 1.0,
  integrity_score FLOAT DEFAULT 1.0,
  opik_trace_id TEXT,
  -- Proof & Verification (Anti-Cheat)
  proof_media_url TEXT,
  proof_type proof_type DEFAULT 'None',
  is_public BOOLEAN DEFAULT TRUE,
  verification_status verification_status DEFAULT 'Auto_Approved',
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- REPORTS TABLE
-- ============================================
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  target_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  target_log_id UUID REFERENCES logs(id) ON DELETE SET NULL,
  reason report_reason NOT NULL,
  description TEXT,
  status report_status DEFAULT 'Pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- RANK UP EXAMS TABLE
-- ============================================
CREATE TABLE rank_up_exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  from_rank rank_tier NOT NULL,
  to_rank rank_tier NOT NULL,
  exam_quest_id UUID REFERENCES quests(id) ON DELETE SET NULL,
  proof_media_url TEXT NOT NULL,
  hand_sign_required TEXT,
  status report_status DEFAULT 'Pending',
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TRIGGERS & FUNCTIONS
-- ============================================

-- Auto-Create Profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'Operative_' || LEFT(NEW.id::TEXT, 8))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-Flag on Report Threshold
CREATE OR REPLACE FUNCTION check_report_threshold()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles 
  SET 
    report_count = report_count + 1,
    hunter_status = CASE 
      WHEN report_count + 1 >= 5 THEN 'Corrupted'
      WHEN report_count + 1 >= 3 THEN 'Flagged'
      ELSE hunter_status
    END
  WHERE id = NEW.target_user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_new_report
  AFTER INSERT ON reports
  FOR EACH ROW EXECUTE FUNCTION check_report_threshold();

-- Auto-Verify Hunter on Proof Uploads
CREATE OR REPLACE FUNCTION grant_verified_status()
RETURNS TRIGGER AS $$
BEGIN
  IF (
    SELECT COUNT(*) FROM logs 
    WHERE user_id = NEW.user_id 
    AND proof_media_url IS NOT NULL
  ) >= 5 THEN
    UPDATE profiles 
    SET hunter_status = 'Verified', verified_at = NOW()
    WHERE id = NEW.user_id AND hunter_status = 'Normal';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_proof_upload
  AFTER INSERT ON logs
  FOR EACH ROW 
  WHEN (NEW.proof_media_url IS NOT NULL)
  EXECUTE FUNCTION grant_verified_status();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE rank_up_exams ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "Profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Quests
CREATE POLICY "Users can view own quests" ON quests
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quests" ON quests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own quests" ON quests
  FOR UPDATE USING (auth.uid() = user_id);

-- Logs
CREATE POLICY "Everyone can view public logs" ON logs
  FOR SELECT USING (is_public = true);

CREATE POLICY "Users can view own private logs" ON logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own logs" ON logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Reports
CREATE POLICY "Users can report others" ON reports
  FOR INSERT WITH CHECK (auth.uid() = reporter_id AND auth.uid() != target_user_id);

CREATE POLICY "Users can view own reports" ON reports
  FOR SELECT USING (auth.uid() = reporter_id);

-- Rank Up Exams
CREATE POLICY "Users can view own exams" ON rank_up_exams
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own exams" ON rank_up_exams
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================
-- VIEWS
-- ============================================

-- Leaderboard
CREATE MATERIALIZED VIEW leaderboard_ranks AS
SELECT
  id as user_id,
  username,
  total_xp,
  level,
  rank_tier,
  class,
  hunter_status,
  streak_current,
  RANK() OVER (ORDER BY total_xp DESC) as global_rank
FROM profiles
WHERE onboarding_done = true
AND hunter_status != 'Corrupted'
WITH DATA;

CREATE UNIQUE INDEX idx_leaderboard_user_id ON leaderboard_ranks(user_id);
CREATE INDEX idx_leaderboard_xp ON leaderboard_ranks(total_xp DESC);
CREATE INDEX idx_leaderboard_status ON leaderboard_ranks(hunter_status);

-- Public Activity Feed
CREATE OR REPLACE VIEW public_activity_feed AS
SELECT 
  l.id as log_id,
  l.user_id,
  p.username,
  p.hunter_status,
  q.plan_json->>'quest_name' as quest_name,
  q.rank_difficulty as quest_rank,
  l.xp_awarded,
  l.duration_actual,
  l.integrity_score,
  l.proof_media_url,
  l.proof_type,
  l.verification_status,
  l.completed_at
FROM logs l
JOIN profiles p ON l.user_id = p.id
JOIN quests q ON l.quest_id = q.id
WHERE l.is_public = true
ORDER BY l.completed_at DESC;

-- RPC for Leaderboard
CREATE OR REPLACE FUNCTION get_leaderboard(limit_count int DEFAULT 50)
RETURNS TABLE (
  user_id uuid,
  username text,
  total_xp bigint,
  level int,
  rank_tier rank_tier,
  class user_class,
  hunter_status hunter_status,
  streak_current int,
  global_rank bigint
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT * FROM leaderboard_ranks
  ORDER BY total_xp DESC
  LIMIT limit_count;
$$;

-- Part V: Advanced Gamification - Database Schema
-- Run this in Supabase SQL Editor

-- Achievements Table
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  xp_reward INT DEFAULT 0,
  rarity TEXT NOT NULL CHECK (rarity IN ('common', 'rare', 'epic', 'legendary'))
);

-- User Achievements Table (junction table)
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  progress JSONB,
  UNIQUE(user_id, achievement_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_achievements_rarity ON achievements(rarity);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user ON user_achievements(user_id, unlocked_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_achievements_achievement ON user_achievements(achievement_id);

-- RLS
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "public_view_achievements" ON achievements
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "users_view_own_achievements" ON user_achievements
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "users_create_own_achievements" ON user_achievements
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Seed Achievements Data
INSERT INTO achievements (name, description, icon, xp_reward, rarity) VALUES
-- Milestones
('First Steps', 'Complete your first quest', '🎯', 50, 'common'),
('Rookie Hunter', 'Reach Level 5', '⭐', 100, 'common'),
('Rising Star', 'Reach Level 10', '⭐⭐', 200, 'common'),
('Elite Hunter', 'Reach Level 25', '⭐⭐⭐', 500, 'rare'),
('Legendary Hunter', 'Reach Level 50', '👑', 1000, 'epic'),

-- Streaks
('Week Warrior', 'Maintain a 7-day streak', '🔥', 150, 'common'),
('Month Master', 'Maintain a 30-day streak', '🏆', 300, 'rare'),
('Century Champion', 'Maintain a 100-day streak', '🏅', 750, 'epic'),
('Eternal Flame', 'Maintain a 365-day streak', '🌟', 2000, 'legendary'),

-- Volume
('100 Club', 'Complete 100 total quest reps', '💪', 75, 'common'),
('1000 Club', 'Complete 1000 total quest reps', '💪💪', 150, 'common'),
('10K Club', 'Complete 10,000 total quest reps', '💪💪💪', 300, 'rare'),
('100K Club', 'Complete 100,000 total quest reps', '💪💪💪💪', 750, 'epic'),
('Million Club', 'Complete 1,000,000 total quest reps', '💎', 2000, 'legendary'),

-- Rank Progression
('D-Rank Hunter', 'Reach D-Rank', '🔵', 100, 'common'),
('C-Rank Hunter', 'Reach C-Rank', '🔵', 200, 'rare'),
('B-Rank Hunter', 'Reach B-Rank', '🔵', 400, 'rare'),
('A-Rank Hunter', 'Reach A-Rank', '🔵', 750, 'epic'),
('S-Rank Hunter', 'Reach S-Rank', '🔵', 1500, 'legendary'),

-- Social
('First Friend', 'Add your first friend', '🤝', 100, 'common'),
('Social Butterfly', 'Have 10 friends', '🦋', 200, 'rare'),
('Network Builder', 'Have 50 friends', '🌐', 500, 'epic'),
('Social Icon', 'Have 100 friends', '👑', 1000, 'legendary'),

-- XP Milestones
('Novice XP', 'Earn 1,000 total XP', '✨', 100, 'common'),
('Apprentice XP', 'Earn 5,000 total XP', '✨✨', 200, 'common'),
('Expert XP', 'Earn 10,000 total XP', '✨✨✨', 300, 'rare'),
('Master XP', 'Earn 25,000 total XP', '✨✨✨✨', 500, 'rare'),
('Grandmaster XP', 'Earn 50,000 total XP', '✨✨✨✨✨', 1000, 'epic'),

-- Class-Specific
('Novice Builder', 'Complete 20 quests as Novice', '🎓', 150, 'common'),
('Striker Sprinter', 'Complete 20 quests as Striker', '⚡', 150, 'common'),
('Tank Builder', 'Complete 20 quests as Tank', '🏋️', 150, 'common'),
('Assassin Shadow', 'Complete 20 quests as Assassin', '🗡️', 150, 'common'),

-- Anti-Cheat / Trust
('Verified Hunter', 'Upload first proof media', '📸', 75, 'common'),
('Trustworthy Hunter', 'Upload 10 proof media', '📸📸', 150, 'rare'),
('Legendary Prover', 'Upload 50 proof media', '📸📸📸', 500, 'epic'),

-- Time-Based
('One Week Survivor', 'Complete at least one quest in first 7 days', '📅', 75, 'common'),
('Month Hunter', 'Complete at least one quest in first 30 days', '📅📅', 150, 'common'),
('Season Veteran', 'Complete at least one quest in first 100 days', '📅📅📅', 400, 'rare')
ON CONFLICT (name) DO NOTHING;

-- Trigger to create notification on achievement unlock
CREATE OR REPLACE FUNCTION notify_achievement_unlock()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO notifications (user_id, type, title, message, link, xp_reward)
  VALUES (
    NEW.user_id,
    'achievement_unlocked',
    (SELECT name FROM achievements WHERE id = NEW.achievement_id),
    'Achievement Unlocked: ' || (SELECT name FROM achievements WHERE id = NEW.achievement_id),
    '/achievements',
    (SELECT xp_reward FROM achievements WHERE id = NEW.achievement_id)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_achievement_notification
AFTER INSERT ON user_achievements
FOR EACH ROW
EXECUTE FUNCTION notify_achievement_unlock();

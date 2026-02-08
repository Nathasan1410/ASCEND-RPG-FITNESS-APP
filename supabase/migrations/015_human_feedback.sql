-- ============================================
-- HUMAN-IN-THE-LOOP FEEDBACK & REPORT MODERATION
-- Migration 015
-- ============================================

-- Add human feedback columns to logs table
ALTER TABLE logs ADD COLUMN IF NOT EXISTS perceived_exertion INT CHECK (perceived_exertion >= 0 AND perceived_exertion <= 10);
ALTER TABLE logs ADD COLUMN IF NOT EXISTS anomalies_injuries TEXT;
ALTER TABLE logs ADD COLUMN IF NOT EXISTS human_integrity_score FLOAT DEFAULT NULL;
ALTER TABLE logs ADD COLUMN IF NOT EXISTS human_effort_score FLOAT DEFAULT NULL;
ALTER TABLE logs ADD COLUMN IF NOT EXISTS human_safety_score FLOAT DEFAULT NULL;
ALTER TABLE logs ADD COLUMN IF NOT EXISTS feedback_impact_calculated BOOLEAN DEFAULT FALSE;

-- Create user feedback patterns table
CREATE TABLE IF NOT EXISTS user_feedback_patterns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  anomaly_type TEXT NOT NULL,
  frequency INT DEFAULT 1,
  last_reported_at TIMESTAMPTZ DEFAULT NOW(),
  severity_score FLOAT DEFAULT 1.0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_feedback_patterns_user ON user_feedback_patterns(user_id);
CREATE INDEX IF NOT EXISTS idx_feedback_patterns_type ON user_feedback_patterns(anomaly_type);

-- Update reports table with AI moderation fields
ALTER TABLE reports ADD COLUMN IF NOT EXISTS ai_analysis JSONB;
ALTER TABLE reports ADD COLUMN IF NOT EXISTS ai_confidence FLOAT;
ALTER TABLE reports ADD COLUMN IF NOT EXISTS ai_action_taken VARCHAR(50);
ALTER TABLE reports ADD COLUMN IF NOT EXISTS processed_at TIMESTAMPTZ;
ALTER TABLE reports ADD COLUMN IF NOT EXISTS impact_applied BOOLEAN DEFAULT FALSE;

-- Create view for public report display (full transparency)
CREATE OR REPLACE VIEW public_reports_view AS
SELECT 
  r.id,
  r.reporter_id,
  p1.username as reporter_username,
  r.target_user_id,
  p2.username as target_username,
  r.target_log_id,
  r.reason,
  r.description,
  r.status,
  r.created_at,
  r.ai_confidence,
  r.ai_action_taken,
  r.impact_applied,
  r.ai_analysis,
  (
    SELECT COUNT(*) 
    FROM reports r2 
    WHERE r2.target_log_id = r.target_log_id 
    AND r2.status != 'Dismissed'
  ) as report_count
FROM reports r
JOIN profiles p1 ON r.reporter_id = p1.id
JOIN profiles p2 ON r.target_user_id = p2.id
WHERE r.status != 'Dismissed'
ORDER BY r.created_at DESC;

-- Enable RLS on user_feedback_patterns
ALTER TABLE user_feedback_patterns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own feedback patterns" ON user_feedback_patterns
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert feedback patterns" ON user_feedback_patterns
  FOR INSERT WITH CHECK (true);

CREATE POLICY "System can update feedback patterns" ON user_feedback_patterns
  FOR UPDATE USING (true);

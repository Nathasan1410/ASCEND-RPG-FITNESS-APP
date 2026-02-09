-- ============================================
-- QUEST AI JUDGE BYPASS SYSTEM
-- Migration 016
-- ============================================

-- Create quest_bypasses table to track when judges bypass the AI evaluation
CREATE TABLE IF NOT EXISTS quest_bypasses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quest_id UUID NOT NULL REFERENCES quests(id) ON DELETE CASCADE,
  judge_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  bypass_reason VARCHAR(255) NOT NULL,
  bypass_type VARCHAR(50) NOT NULL DEFAULT 'judge_manual_override',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_bypass_quest ON quest_bypasses(quest_id);
CREATE INDEX IF NOT EXISTS idx_bypass_judge ON quest_bypasses(judge_id);
CREATE INDEX IF NOT EXISTS idx_bypass_created ON quest_bypasses(created_at);

-- Add bypass_reason enum for quest status (if not already exists)
ALTER TYPE IF NOT EXISTS ADD VALUE 'quest_bypassed' TO quest_status_enum;
ALTER TABLE quests ALTER COLUMN status TYPE quest_status_enum USING quest_status_enum;

-- Enable RLS on quest_bypasses
ALTER TABLE quest_bypasses ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view all bypasses
CREATE POLICY "Users can view quest bypasses" ON quest_bypasses
  FOR SELECT
  USING (true);

-- Policy: Users can insert their own bypasses
CREATE POLICY "Users can create quest bypasses" ON quest_bypasses
  FOR INSERT
  WITH CHECK (judge_id = auth.uid());

-- Policy: Users can update their own bypasses
CREATE POLICY "Users can update quest bypasses" ON quest_bypasses
  FOR UPDATE
  USING (judge_id = auth.uid());

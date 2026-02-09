# 🗄️ Database Schema Draft (Supabase)
> **Version:** 2.0  
> **Last Updated:** Feb 1, 2026  
> **Changelog:** Added Anti-Cheat & Social Verification system (proof_media_url, hunter_status, reports table)

## Tables

### 1. **profiles** (Extends Auth)
   - id (uuid, PK, ref auth.users)
   - username (text, unique)
   - class (enum: 'Novice', 'Striker', 'Tank', 'Assassin')
   - level (int, default 1)
   - current_xp (int, default 0)
   - total_xp (bigint, default 0)
   - rank_tier (enum: 'E-Rank' to 'S-Rank')
   - stats_strength (int, default 10)
   - stats_agility (int, default 10)
   - stats_stamina (int, default 10)
   - streak_current (int, default 0)
   - streak_best (int, default 0)
   - **hunter_status** (enum: 'Normal', 'Verified', 'Flagged', 'Corrupted') ← NEW
   - **verified_at** (timestamp, nullable) ← NEW
   - **report_count** (int, default 0) ← NEW
   - onboarding_done (boolean, default false)
   - height_cm (int)
   - weight_kg (int)
   - equipment (text[])
   - last_activity_at (timestamp)
   - created_at (timestamp)

### 2. **quests** (Generated Workouts)
   - id (uuid, PK)
   - user_id (uuid, FK → profiles)
   - **quest_type** (enum: 'Daily', 'Penalty', 'RankUp', 'Special') ← UPDATED
   - rank_difficulty (enum: E-S)
   - plan_json (jsonb) -- Stores the full Groq output
   - xp_potential (int)
   - status (enum: 'Active', 'Completed', 'Failed', 'Pending_Verification') ← UPDATED
   - **requires_proof** (boolean, default false) ← NEW
   - expires_at (timestamp)
   - created_at (timestamp)

### 3. **logs** (Workout History - PUBLIC Match History)
   - id (uuid, PK)
   - quest_id (uuid, FK → quests)
   - user_id (uuid, FK → profiles)
   - duration_actual (int) -- in minutes
   - user_feedback (text) -- "Sakit banget bang"
   - rpe_actual (int, 1-10)
   - exercises_completed (jsonb)
   - xp_awarded (int) -- Calculated by Opik Judge
   - **integrity_score** (float, 0.0-1.0) ← NEW
   - safety_score (float, 0.0-1.0)
   - opik_trace_id (text) -- Link to Opik dashboard
   - **proof_media_url** (text, nullable) ← NEW (Supabase Storage URL)
   - **proof_type** (enum: 'None', 'Photo', 'Video', 'Timelapse') ← NEW
   - **is_public** (boolean, default true) ← NEW
   - **verification_status** (enum: 'Auto_Approved', 'Pending', 'Verified', 'Rejected') ← NEW
   - completed_at (timestamp)

### 4. **reports** (Community Anti-Cheat) ← NEW TABLE
   - id (uuid, PK)
   - reporter_id (uuid, FK → profiles) -- Who reported
   - target_user_id (uuid, FK → profiles) -- Who is being reported
   - target_log_id (uuid, FK → logs, nullable) -- Specific log being reported
   - reason (enum: 'Impossible_Stats', 'Fake_Media', 'Suspicious_Pattern', 'Other')
   - description (text)
   - status (enum: 'Pending', 'Reviewed', 'Confirmed', 'Dismissed')
   - created_at (timestamp)

### 5. **rank_up_exams** (Gatekeeper System) ← NEW TABLE
   - id (uuid, PK)
   - user_id (uuid, FK → profiles)
   - from_rank (enum: E-S)
   - to_rank (enum: E-S)
   - exam_quest_id (uuid, FK → quests)
   - proof_media_url (text, NOT NULL) -- Required for rank up
   - **hand_sign_required** (text) -- e.g., "Thumbs down", "Peace sign"
   - status (enum: 'Pending', 'Approved', 'Rejected')
   - reviewed_at (timestamp, nullable)
   - created_at (timestamp)

---

## Enums

```sql
-- Hunter Status (Anti-Cheat Reputation)
CREATE TYPE hunter_status AS ENUM ('Normal', 'Verified', 'Flagged', 'Corrupted');

-- Quest Types (Updated)
CREATE TYPE quest_type AS ENUM ('Daily', 'Penalty', 'RankUp', 'Special');

-- Quest Status (Updated)  
CREATE TYPE quest_status AS ENUM ('Active', 'Completed', 'Failed', 'Pending_Verification');

-- Proof Types
CREATE TYPE proof_type AS ENUM ('None', 'Photo', 'Video', 'Timelapse');

-- Verification Status
CREATE TYPE verification_status AS ENUM ('Auto_Approved', 'Pending', 'Verified', 'Rejected');

-- Report Reasons
CREATE TYPE report_reason AS ENUM ('Impossible_Stats', 'Fake_Media', 'Suspicious_Pattern', 'Other');

-- Report Status
CREATE TYPE report_status AS ENUM ('Pending', 'Reviewed', 'Confirmed', 'Dismissed');

-- Rank Up Exam Status
CREATE TYPE exam_status AS ENUM ('Pending', 'Approved', 'Rejected');
```

---

## Views

### 1. **leaderboard_season_1**
   - Selects username, level, xp, rank_tier, hunter_status from profiles
   - **WHERE hunter_status != 'Corrupted'** ← Cheaters excluded
   - Ordered by Level DESC, XP DESC

### 2. **public_activity_feed** ← NEW
   - Joins logs + profiles + quests
   - Shows recent completions (last 24h)
   - Displays: username, quest_name, xp_awarded, proof_media_url
   - Used for social "Match History" feature

### 3. **flagged_users** ← NEW (Admin View)
   - Profiles with report_count > 3
   - Or hunter_status = 'Flagged'
   - For manual review

---

## RLS Policies (Updated)

```sql
-- Profiles: Public read, self update
-- NEW: Cannot update hunter_status (admin only)
CREATE POLICY "Users can update own profile (except status)" ON profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id 
    AND hunter_status = OLD.hunter_status  -- Prevent self-modification
  );

-- Logs: Public READ (Match History), Self INSERT
CREATE POLICY "Everyone can view public logs" ON logs
  FOR SELECT USING (is_public = true);

CREATE POLICY "Users can insert own logs" ON logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Reports: Users can create, cannot see others' reports
CREATE POLICY "Users can report others" ON reports
  FOR INSERT WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Users can view own reports" ON reports
  FOR SELECT USING (auth.uid() = reporter_id);

-- Rank Up Exams: Self only
CREATE POLICY "Users can view own exams" ON rank_up_exams
  FOR SELECT USING (auth.uid() = user_id);
```

---

## Storage Buckets (Supabase Storage)

```
proof-media/
├── photos/
│   └── {user_id}/{log_id}.jpg
├── videos/
│   └── {user_id}/{log_id}.mp4
└── rank-exams/
    └── {user_id}/{exam_id}.mp4
```

**Storage Policies:**
- Users can upload to their own folder only
- Public read access for verification
- Max file size: 10MB (photos), 50MB (videos)

---

## Trigger Functions

### Auto-Flag on Report Threshold
```sql
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
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_new_report
  AFTER INSERT ON reports
  FOR EACH ROW EXECUTE FUNCTION check_report_threshold();
```

### Auto-Verify on Proof Upload
```sql
CREATE OR REPLACE FUNCTION grant_verified_status()
RETURNS TRIGGER AS $$
BEGIN
  -- If user uploads 5+ proofs, grant Verified status
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
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_proof_upload
  AFTER INSERT ON logs
  FOR EACH ROW 
  WHEN (NEW.proof_media_url IS NOT NULL)
  EXECUTE FUNCTION grant_verified_status();
```

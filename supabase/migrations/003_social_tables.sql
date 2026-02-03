-- Part III: Social Features - Database Schema
-- Run this in Supabase SQL Editor

-- Friends Table
CREATE TABLE IF NOT EXISTS friends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  friend_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('pending', 'accepted', 'blocked', 'removed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, friend_id)
);

-- Indexes for friends
CREATE INDEX IF NOT EXISTS idx_friends_user ON friends(user_id, status);
CREATE INDEX IF NOT EXISTS idx_friends_friend ON friends(friend_id, status);
CREATE INDEX IF NOT EXISTS idx_friends_created ON friends(created_at DESC);

-- Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('friend_request', 'friend_accepted', 'friend_declined', 'level_up', 'rank_up', 'quest_reminder', 'guild_invite', 'achievement_unlocked', 'report_received')),
  title TEXT NOT NULL,
  message TEXT,
  link TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for notifications
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, read, created_at DESC);

-- Enable Row Level Security
ALTER TABLE friends ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Friends
CREATE POLICY "users_view_own_friends" ON friends
  FOR SELECT
  USING (auth.uid() = user_id OR auth.uid() = friend_id);

CREATE POLICY "users_create_friend_requests" ON friends
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_update_own_friends" ON friends
  FOR UPDATE
  USING (auth.uid() = user_id OR auth.uid() = friend_id)
  WITH CHECK (auth.uid() = user_id OR auth.uid() = friend_id);

CREATE POLICY "users_delete_own_friends" ON friends
  FOR DELETE
  USING (auth.uid() = user_id OR auth.uid() = friend_id);

-- RLS Policies for Notifications
CREATE POLICY "users_view_own_notifications" ON notifications
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "users_create_notifications" ON notifications
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_update_own_notifications" ON notifications
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_delete_own_notifications" ON notifications
  FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger to create notification when friend request is sent
CREATE OR REPLACE FUNCTION notify_friend_request()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO notifications (user_id, type, title, message, link)
  VALUES (
    NEW.friend_id,
    'friend_request',
    'New Friend Request',
    (SELECT username FROM profiles WHERE id = NEW.user_id) || ' sent you a friend request.',
    '/friends/requests'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_friend_request_notification
AFTER INSERT ON friends
FOR EACH ROW
WHEN (NEW.status = 'pending')
EXECUTE FUNCTION notify_friend_request();

-- Trigger to create notification when friend request is accepted
CREATE OR REPLACE FUNCTION notify_friend_accepted()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status = 'pending' AND NEW.status = 'accepted' THEN
    INSERT INTO notifications (user_id, type, title, message, link)
    VALUES (
      NEW.user_id,
      'friend_accepted',
      'Friend Request Accepted',
      (SELECT username FROM profiles WHERE id = NEW.friend_id) || ' accepted your friend request!',
      '/friends'
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_friend_accepted_notification
AFTER UPDATE ON friends
FOR EACH ROW
EXECUTE FUNCTION notify_friend_accepted();

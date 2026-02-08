-- Add subscription_tier column to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS subscription_tier TEXT DEFAULT 'free'
CHECK (subscription_tier IN ('free', 'pro', 'max'));

-- Add stripe_customer_id column to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT NOT NULL UNIQUE,
  stripe_customer_id TEXT NOT NULL,
  stripe_price_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN (
    'active',
    'past_due',
    'canceled',
    'unpaid',
    'incomplete',
    'incomplete_expired',
    'trialing'
  )),
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at TIMESTAMP WITH TIME ZONE,
  canceled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);

-- Create index on stripe_customer_id
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer_id ON subscriptions(stripe_customer_id);

-- Create index on status
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);

-- Create index on subscription_tier in profiles
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_tier ON profiles(subscription_tier);

-- Create billing_history table
CREATE TABLE IF NOT EXISTS billing_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  stripe_invoice_id TEXT UNIQUE,
  stripe_payment_intent_id TEXT,
  amount_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'usd' CHECK (length(currency) = 3),
  status TEXT NOT NULL CHECK (status IN ('paid', 'open', 'void', 'uncollectible')),
  description TEXT,
  invoice_url TEXT,
  receipt_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id for billing_history
CREATE INDEX IF NOT EXISTS idx_billing_history_user_id ON billing_history(user_id);

-- Create index on created_at for billing_history
CREATE INDEX IF NOT EXISTS idx_billing_history_created_at ON billing_history(created_at DESC);

-- Create usage_tracking table for feature limits
CREATE TABLE IF NOT EXISTS usage_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  feature_type TEXT NOT NULL CHECK (feature_type IN (
    'daily_quests',
    'ai_judge_evaluations',
    'ai_chatbot_questions',
    'video_uploads',
    'posts_created'
  )),
  period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, feature_type, period_start)
);

-- Create index on user_id and feature_type for usage_tracking
CREATE INDEX IF NOT EXISTS idx_usage_tracking_user_feature ON usage_tracking(user_id, feature_type);

-- Create index on period_start and period_end for usage_tracking
CREATE INDEX IF NOT EXISTS idx_usage_tracking_period ON usage_tracking(period_start, period_end);

-- Enable Row Level Security
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_tracking ENABLE ROW LEVEL SECURITY;

-- RLS Policies for subscriptions
CREATE POLICY "Users can view their own subscriptions"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all subscriptions"
  ON subscriptions FOR ALL
  TO service_role
  USING (true);

-- RLS Policies for billing_history
CREATE POLICY "Users can view their own billing history"
  ON billing_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all billing history"
  ON billing_history FOR ALL
  TO service_role
  USING (true);

-- RLS Policies for usage_tracking
CREATE POLICY "Users can view their own usage tracking"
  ON usage_tracking FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all usage tracking"
  ON usage_tracking FOR ALL
  TO service_role
  USING (true);

-- Create function to update subscription tier in profiles
CREATE OR REPLACE FUNCTION update_profile_subscription_tier()
RETURNS TRIGGER AS $$
BEGIN
  -- Determine tier based on price_id
  IF NEW.status = 'active' AND NEW.cancel_at_period_end = FALSE THEN
    IF NEW.stripe_price_id = (SELECT STRIPE_PRICE_ID_PRO FROM settings WHERE id = 1) OR
       NEW.stripe_price_id LIKE '%pro%' THEN
      UPDATE profiles SET subscription_tier = 'pro' WHERE id = NEW.user_id;
    ELSIF NEW.stripe_price_id = (SELECT STRIPE_PRICE_ID_MAX FROM settings WHERE id = 1) OR
       NEW.stripe_price_id LIKE '%max%' THEN
      UPDATE profiles SET subscription_tier = 'max' WHERE id = NEW.user_id;
    END IF;
  ELSIF NEW.status = 'canceled' OR (NEW.status = 'active' AND NEW.cancel_at_period_end = TRUE) THEN
    -- Check if user has any other active subscriptions
    IF NOT EXISTS (
      SELECT 1 FROM subscriptions
      WHERE user_id = NEW.user_id
      AND status = 'active'
      AND cancel_at_period_end = FALSE
      AND id != NEW.id
    ) THEN
      UPDATE profiles SET subscription_tier = 'free' WHERE id = NEW.user_id;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update subscription tier
CREATE TRIGGER on_subscription_change
  AFTER INSERT OR UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_profile_subscription_tier();

-- Create function to get current usage
CREATE OR REPLACE FUNCTION get_current_usage(
  p_user_id UUID,
  p_feature_type TEXT,
  p_period_start TIMESTAMP WITH TIME ZONE,
  p_period_end TIMESTAMP WITH TIME ZONE
)
RETURNS INTEGER AS $$
DECLARE
  v_usage_count INTEGER;
BEGIN
  SELECT COALESCE(usage_count, 0)
  INTO v_usage_count
  FROM usage_tracking
  WHERE user_id = p_user_id
    AND feature_type = p_feature_type
    AND period_start = p_period_start
    AND period_end = p_period_end;
  
  RETURN v_usage_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to increment usage
CREATE OR REPLACE FUNCTION increment_usage(
  p_user_id UUID,
  p_feature_type TEXT,
  p_period_start TIMESTAMP WITH TIME ZONE,
  p_period_end TIMESTAMP WITH TIME ZONE
)
RETURNS INTEGER AS $$
DECLARE
  v_usage_count INTEGER;
BEGIN
  INSERT INTO usage_tracking (user_id, feature_type, period_start, period_end, usage_count)
  VALUES (p_user_id, p_feature_type, p_period_start, p_period_end, 1)
  ON CONFLICT (user_id, feature_type, period_start)
  DO UPDATE SET
    usage_count = usage_tracking.usage_count + 1,
    updated_at = NOW()
  RETURNING usage_count INTO v_usage_count;
  
  RETURN v_usage_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get user limits based on tier
CREATE OR REPLACE FUNCTION get_tier_limits(p_tier TEXT)
RETURNS JSONB AS $$
BEGIN
  RETURN CASE p_tier
    WHEN 'free' THEN '{
      "daily_quests": 1,
      "ai_judge_evaluations": 3,
      "ai_chatbot_questions": 10,
      "video_uploads": 2,
      "posts_created": 3,
      "video_quality": "360p"
    }'::jsonb
    WHEN 'pro' THEN '{
      "daily_quests": -1,
      "ai_judge_evaluations": -1,
      "ai_chatbot_questions": 300,
      "video_uploads": 10,
      "posts_created": 20,
      "video_quality": "1080p"
    }'::jsonb
    WHEN 'max' THEN '{
      "daily_quests": -1,
      "ai_judge_evaluations": -1,
      "ai_chatbot_questions": -1,
      "video_uploads": -1,
      "posts_created": -1,
      "video_quality": "4k"
    }'::jsonb
    ELSE '{"daily_quests": 0, "ai_judge_evaluations": 0, "ai_chatbot_questions": 0, "video_uploads": 0, "posts_created": 0, "video_quality": "none"}'::jsonb
  END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check if user can use feature
CREATE OR REPLACE FUNCTION can_use_feature(
  p_user_id UUID,
  p_feature_type TEXT
)
RETURNS JSONB AS $$
DECLARE
  v_tier TEXT;
  v_limits JSONB;
  v_limit_value INTEGER;
  v_current_usage INTEGER;
  v_period_start TIMESTAMP WITH TIME ZONE;
  v_period_end TIMESTAMP WITH TIME ZONE;
  v_result JSONB;
BEGIN
  -- Get user's subscription tier
  SELECT COALESCE(subscription_tier, 'free')
  INTO v_tier
  FROM profiles
  WHERE id = p_user_id;
  
  -- Get limits for tier
  SELECT get_tier_limits(v_tier)
  INTO v_limits;
  
  -- Get limit for specific feature
  v_limit_value := (v_limits->>p_feature_type)::INTEGER;
  
  -- Check if unlimited (-1)
  IF v_limit_value = -1 THEN
    v_result := jsonb_build_object(
      'allowed', true,
      'limit', -1,
      'current_usage', 0,
      'remaining', -1,
      'tier', v_tier
    );
    RETURN v_result;
  END IF;
  
  -- Calculate period (daily)
  v_period_start := date_trunc('day', NOW());
  v_period_end := v_period_start + INTERVAL '1 day';
  
  -- Get current usage
  SELECT get_current_usage(p_user_id, p_feature_type, v_period_start, v_period_end)
  INTO v_current_usage;
  
  -- Check if user can use feature
  IF v_current_usage < v_limit_value THEN
    v_result := jsonb_build_object(
      'allowed', true,
      'limit', v_limit_value,
      'current_usage', v_current_usage,
      'remaining', v_limit_value - v_current_usage,
      'tier', v_tier
    );
  ELSE
    v_result := jsonb_build_object(
      'allowed', false,
      'limit', v_limit_value,
      'current_usage', v_current_usage,
      'remaining', 0,
      'tier', v_tier
    );
  END IF;
  
  RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add comments
COMMENT ON TABLE subscriptions IS 'Stripe subscription data linked to user profiles';
COMMENT ON TABLE billing_history IS 'Invoice and payment history for billing purposes';
COMMENT ON TABLE usage_tracking IS 'Tracks feature usage for enforcing tier limits';
COMMENT ON COLUMN profiles.subscription_tier IS 'User subscription tier: free, pro, or max';
COMMENT ON COLUMN profiles.stripe_customer_id IS 'Stripe customer ID for the user';
COMMENT ON FUNCTION can_use_feature IS 'Check if user can use a feature based on their subscription tier';
COMMENT ON FUNCTION get_tier_limits IS 'Get feature limits for a specific subscription tier';

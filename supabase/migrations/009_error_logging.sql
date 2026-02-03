-- Error Logging Table for Production Monitoring
-- Priority: HIGH
-- Purpose: Track runtime errors for debugging

-- Create error_logs table
CREATE TABLE IF NOT EXISTS error_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  error_name TEXT NOT NULL,
  error_message TEXT NOT NULL,
  error_stack TEXT,
  component_stack TEXT,
  url TEXT,
  user_agent TEXT,
  environment TEXT NOT NULL DEFAULT 'production',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for error tracking
CREATE INDEX IF NOT EXISTS idx_error_logs_created ON error_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_error_logs_user ON error_logs(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_error_logs_name ON error_logs(error_name, created_at DESC);

-- Enable Row Level Security
ALTER TABLE error_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "users_view_own_errors" ON error_logs
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "users_create_errors" ON error_logs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id OR auth.uid() IS NULL);

-- Function to create error log
CREATE OR REPLACE FUNCTION log_error(
  p_error_name TEXT,
  p_error_message TEXT,
  p_error_stack TEXT DEFAULT NULL,
  p_component_stack TEXT DEFAULT NULL,
  p_url TEXT DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO error_logs (
    user_id,
    error_name,
    error_message,
    error_stack,
    component_stack,
    url,
    user_agent
  ) VALUES (
    auth.uid(),
    p_error_name,
    p_error_message,
    p_error_stack,
    p_component_stack,
    p_url,
    p_user_agent
  )
  RETURNING id;
END;
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION log_error TO authenticated;
GRANT SELECT, INSERT ON error_logs TO authenticated;

-- Comment for documentation
COMMENT ON TABLE error_logs IS 'Production error logging for debugging and monitoring';
COMMENT ON FUNCTION log_error IS 'Helper function to log errors from the application';

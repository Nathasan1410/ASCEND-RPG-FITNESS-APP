-- Function to check report count and update status
CREATE OR REPLACE FUNCTION check_report_count()
RETURNS TRIGGER AS $$
DECLARE
  report_count INT;
BEGIN
  -- Count reports for the target user in the last 30 days
  SELECT COUNT(*) INTO report_count
  FROM reports
  WHERE target_user_id = NEW.target_user_id
  AND created_at > (now() - interval '30 days');

  -- Update status based on count
  IF report_count >= 5 THEN
    UPDATE profiles 
    SET hunter_status = 'Corrupted'
    WHERE id = NEW.target_user_id;
  ELSIF report_count >= 3 THEN
    UPDATE profiles 
    SET hunter_status = 'Flagged'
    WHERE id = NEW.target_user_id
    AND hunter_status != 'Corrupted'; -- Don't downgrade if already corrupted
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger definition
DROP TRIGGER IF EXISTS on_report_created ON reports;
CREATE TRIGGER on_report_created
  AFTER INSERT ON reports
  FOR EACH ROW
  EXECUTE FUNCTION check_report_count();

-- Function to auto-verify after 5 proofs
CREATE OR REPLACE FUNCTION check_proof_count()
RETURNS TRIGGER AS $$
DECLARE
  proof_count INT;
BEGIN
  -- Count verified proofs
  SELECT COUNT(*) INTO proof_count
  FROM logs
  WHERE user_id = NEW.user_id
  AND proof_media_url IS NOT NULL
  AND verification_status = 'Verified';

  -- Auto-upgrade to Verified Hunter if not already
  IF proof_count >= 5 THEN
    UPDATE profiles
    SET hunter_status = 'Verified'
    WHERE id = NEW.user_id
    AND hunter_status = 'Normal';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger definition for proofs
DROP TRIGGER IF EXISTS on_log_verified ON logs;
CREATE TRIGGER on_log_verified
  AFTER UPDATE OF verification_status ON logs
  FOR EACH ROW
  WHEN (NEW.verification_status = 'Verified')
  EXECUTE FUNCTION check_proof_count();

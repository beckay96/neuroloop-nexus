-- ============================================================================
-- ADD PREGNANCY AND BREASTFEEDING COLUMNS TO MENSTRUAL_CYCLE_LOGS
-- ============================================================================
-- These hormonal states are crucial for seizure pattern tracking
-- ============================================================================

-- Add columns if they don't exist
ALTER TABLE private_health_info.menstrual_cycle_logs
ADD COLUMN IF NOT EXISTS is_pregnant BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS is_breastfeeding BOOLEAN DEFAULT FALSE;

-- Add comments
COMMENT ON COLUMN private_health_info.menstrual_cycle_logs.is_pregnant IS 'Whether the user is pregnant during this cycle (affects hormones and seizure patterns)';
COMMENT ON COLUMN private_health_info.menstrual_cycle_logs.is_breastfeeding IS 'Whether the user is breastfeeding during this cycle (affects hormones and seizure patterns)';

-- Create index for research queries
CREATE INDEX IF NOT EXISTS idx_menstrual_logs_pregnancy ON private_health_info.menstrual_cycle_logs(user_id, is_pregnant) WHERE is_pregnant = TRUE;
CREATE INDEX IF NOT EXISTS idx_menstrual_logs_breastfeeding ON private_health_info.menstrual_cycle_logs(user_id, is_breastfeeding) WHERE is_breastfeeding = TRUE;

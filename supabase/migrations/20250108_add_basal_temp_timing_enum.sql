-- ============================================================================
-- ADD TIME AFTER WAKING ENUM FOR BASAL TEMPERATURE
-- ============================================================================
-- Critical for determining if basal temp reading is accurate
-- Must be taken within 10 minutes of waking for research-grade data
-- ============================================================================

-- Create enum for time after waking
CREATE TYPE IF NOT EXISTS time_after_waking_enum AS ENUM (
  'under_10_min',
  '10_20_min',
  '20_30_min',
  '30_60_min',
  '1_2_hours',
  '2_3_hours',
  'over_3_hours',
  'unknown'
);

-- Add column to basal_temperature_logs
ALTER TABLE private_health_info.basal_temperature_logs
ADD COLUMN IF NOT EXISTS time_after_waking time_after_waking_enum DEFAULT 'unknown';

-- Add comment
COMMENT ON COLUMN private_health_info.basal_temperature_logs.time_after_waking IS 'How long after waking was temperature taken - critical for accuracy and cycle phase detection';

-- Create index for research queries on accurate readings
CREATE INDEX IF NOT EXISTS idx_basal_temp_accurate_timing 
ON private_health_info.basal_temperature_logs(user_id, log_date) 
WHERE time_after_waking IN ('under_10_min', '10_20_min');

-- ============================================================================
-- HOTFIX: Add 'emergency' to tracking_feature_enum
-- ============================================================================
-- Run this immediately to fix the enum error
-- ============================================================================

-- Add 'emergency' value to the enum
ALTER TYPE tracking_feature_enum ADD VALUE IF NOT EXISTS 'emergency';

-- Verify it was added
SELECT enumlabel 
FROM pg_enum 
WHERE enumtypid = 'tracking_feature_enum'::regtype
ORDER BY enumsortorder;

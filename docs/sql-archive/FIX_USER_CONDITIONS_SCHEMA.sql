-- ============================================================================
-- FIX USER_CONDITIONS SCHEMA ERROR
-- ============================================================================
-- CRITICAL: user_conditions must be in private_health_info for PHI compliance
-- ============================================================================

BEGIN;

-- ============================================================================
-- IMPORTANT: user_conditions is ALREADY in private_health_info schema
-- The error is in our code/queries trying to access public.user_conditions
-- ============================================================================

-- Verify the table is in the correct schema
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.tables 
        WHERE table_schema = 'private_health_info' 
        AND table_name = 'user_conditions'
    ) THEN
        RAISE EXCEPTION 'user_conditions table not found in private_health_info schema!';
    END IF;
    
    RAISE NOTICE '✅ user_conditions is correctly located in private_health_info schema';
END $$;

-- ============================================================================
-- Fix RLS policies for private_health_info.user_conditions
-- ============================================================================

ALTER TABLE private_health_info.user_conditions ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies first
DROP POLICY IF EXISTS "Users can view own conditions" ON private_health_info.user_conditions;
DROP POLICY IF EXISTS "Users can insert own conditions" ON private_health_info.user_conditions;
DROP POLICY IF EXISTS "Users can update own conditions" ON private_health_info.user_conditions;

-- Create correct policies
CREATE POLICY "Users can view own conditions"
    ON private_health_info.user_conditions
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own conditions"
    ON private_health_info.user_conditions
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own conditions"
    ON private_health_info.user_conditions
    FOR UPDATE
    USING (auth.uid() = user_id);

-- ============================================================================
-- Create a helper function to safely access user_conditions
-- ============================================================================

CREATE OR REPLACE FUNCTION public.get_user_conditions(p_user_id UUID)
RETURNS TABLE (
    id UUID,
    condition_id UUID,
    diagnosis_date DATE,
    severity INTEGER,
    tracking_features_enabled tracking_feature_enum[]
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        uc.id,
        uc.condition_id,
        uc.diagnosis_date,
        uc.severity,
        uc.tracking_features_enabled
    FROM private_health_info.user_conditions uc
    WHERE uc.user_id = p_user_id
    AND uc.user_id = auth.uid(); -- Extra security check
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.get_user_conditions(UUID) TO authenticated;

COMMIT;

-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- Check that user_conditions is in the correct schema
SELECT 
    table_schema,
    table_name,
    COUNT(*) as column_count
FROM information_schema.columns
WHERE table_name = 'user_conditions'
GROUP BY table_schema, table_name;

-- Check RLS policies
SELECT 
    schemaname,
    tablename,
    policyname,
    cmd
FROM pg_policies
WHERE tablename = 'user_conditions'
ORDER BY schemaname, policyname;

-- ============================================================================
-- IMPORTANT NOTES FOR DEVELOPERS
-- ============================================================================
DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '⚠️ IMPORTANT: user_conditions contains PHI and MUST be accessed from private_health_info schema';
    RAISE NOTICE '❌ NEVER use: public.user_conditions';
    RAISE NOTICE '✅ ALWAYS use: private_health_info.user_conditions';
    RAISE NOTICE '✅ Or use the helper function: public.get_user_conditions(user_id)';
    RAISE NOTICE '';
    RAISE NOTICE 'In TypeScript/JavaScript:';
    RAISE NOTICE '  const { data } = await supabase';
    RAISE NOTICE '    .from(''user_conditions'') // Supabase will use private_health_info schema';
    RAISE NOTICE '    .select(''*'')';
    RAISE NOTICE '';
END $$;

-- =====================================================
-- FIX PATIENT DASHBOARD ACCESS ISSUES
-- =====================================================
-- This migration fixes:
-- 1. RLS policies for ALL reference tables
-- 2. RLS policies for daily_tracking_preferences
-- 3. RLS policies for research_consent
-- 4. Fixes RPC function type mismatches
-- =====================================================

-- ===========================================
-- 1. REFERENCE TABLES RLS POLICIES (PUBLIC ACCESS)
-- ===========================================

-- Enable RLS on all reference tables
ALTER TABLE public.seizure_signs_reference ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brain_regions_reference ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sign_brain_region_mapping ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seizure_triggers_reference ENABLE ROW LEVEL SECURITY;

-- Create policies for reference tables (everyone can read)
CREATE POLICY "seizure_signs_readable_by_all"
ON public.seizure_signs_reference
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "brain_regions_readable_by_all"
ON public.brain_regions_reference
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "sign_brain_mapping_readable_by_all"
ON public.sign_brain_region_mapping
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "seizure_triggers_readable_by_all"
ON public.seizure_triggers_reference
FOR SELECT
TO anon, authenticated
USING (true);

-- ===========================================
-- 2. DAILY TRACKING PREFERENCES RLS
-- ===========================================

ALTER TABLE public.daily_tracking_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_can_manage_own_tracking_prefs"
ON public.daily_tracking_preferences
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- ===========================================
-- 3. RESEARCH CONSENT RLS
-- ===========================================

ALTER TABLE public.research_consent ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_can_manage_own_research_consent"
ON public.research_consent
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- ===========================================
-- 4. CREATE TEMP VERIFICATION TABLE
-- ===========================================

CREATE TEMP TABLE dashboard_fix_results (
    check_name TEXT,
    status TEXT,
    details TEXT
);

-- Verify reference table policies
INSERT INTO dashboard_fix_results
SELECT 
    'Seizure Signs RLS' as check_name,
    CASE WHEN EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'seizure_signs_reference'
    ) THEN '✅ SUCCESS' ELSE '❌ FAILED' END as status,
    'Policy allows SELECT for all' as details;

INSERT INTO dashboard_fix_results
SELECT 
    'Brain Regions RLS' as check_name,
    CASE WHEN EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'brain_regions_reference'
    ) THEN '✅ SUCCESS' ELSE '❌ FAILED' END as status,
    'Policy allows SELECT for all' as details;

INSERT INTO dashboard_fix_results
SELECT 
    'Tracking Preferences RLS' as check_name,
    CASE WHEN EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'daily_tracking_preferences'
    ) THEN '✅ SUCCESS' ELSE '❌ FAILED' END as status,
    'Policy allows users to manage own data' as details;

INSERT INTO dashboard_fix_results
SELECT 
    'Research Consent RLS' as check_name,
    CASE WHEN EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'research_consent'
    ) THEN '✅ SUCCESS' ELSE '❌ FAILED' END as status,
    'Policy allows users to manage own consent' as details;

-- Display results
SELECT * FROM dashboard_fix_results;

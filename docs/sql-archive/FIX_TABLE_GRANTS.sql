-- =====================================================
-- GRANT TABLE PERMISSIONS + RELOAD SCHEMA (CORRECTED)
-- =====================================================
-- RLS policies need underlying table permissions to work
-- CORRECTED: table_name instead of tablename
-- CORRECTED: PostgREST NOTIFY syntax
-- =====================================================

BEGIN;

-- 1. GRANT SELECT on all reference tables to authenticated role
GRANT SELECT ON public.seizure_signs_reference TO authenticated;
GRANT SELECT ON public.brain_regions_reference TO authenticated;
GRANT SELECT ON public.seizure_triggers_reference TO authenticated;
GRANT SELECT ON public.sign_brain_region_mapping TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.daily_tracking_preferences TO authenticated;

-- 2. Verify grants (CORRECTED: table_name with underscore)
SELECT 
  table_name,
  array_agg(DISTINCT privilege_type ORDER BY privilege_type) AS granted_privileges
FROM information_schema.role_table_grants
WHERE grantee = 'authenticated'
  AND table_schema = 'public'
  AND table_name IN (
    'seizure_signs_reference',
    'brain_regions_reference',
    'seizure_triggers_reference',
    'sign_brain_region_mapping',
    'daily_tracking_preferences'
  )
GROUP BY table_name
ORDER BY table_name;

COMMIT;

-- 3. Force PostgREST to reload schema cache (CORRECTED: proper NOTIFY syntax)
NOTIFY pgrst, 'reload schema';

-- Alternative: JSON payload for structured reload (if your PostgREST version requires it)
-- NOTIFY pgrst, '{"db-schema":"public","role":"authenticated","action":"reload"}';

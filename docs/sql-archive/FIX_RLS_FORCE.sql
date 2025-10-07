-- =====================================================
-- FORCE FIX - Disable RLS first, then re-enable with policies
-- =====================================================
-- This fixes the issue if RLS was enabled without policies
-- =====================================================

BEGIN;

-- 1. DISABLE RLS on all tables first
ALTER TABLE IF EXISTS public.seizure_signs_reference DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.brain_regions_reference DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.seizure_triggers_reference DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.sign_brain_region_mapping DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.daily_tracking_preferences DISABLE ROW LEVEL SECURITY;

-- 2. Drop any existing policies (in case they exist but are wrong)
DROP POLICY IF EXISTS "Anyone authenticated can read seizure signs" ON public.seizure_signs_reference;
DROP POLICY IF EXISTS "Anyone authenticated can read brain regions" ON public.brain_regions_reference;
DROP POLICY IF EXISTS "Anyone authenticated can read seizure triggers" ON public.seizure_triggers_reference;
DROP POLICY IF EXISTS "Anyone authenticated can read sign-brain mappings" ON public.sign_brain_region_mapping;
DROP POLICY IF EXISTS "Users can view own tracking preferences" ON public.daily_tracking_preferences;
DROP POLICY IF EXISTS "Users can insert own tracking preferences" ON public.daily_tracking_preferences;
DROP POLICY IF EXISTS "Users can update own tracking preferences" ON public.daily_tracking_preferences;

-- 3. RE-ENABLE RLS with correct policies
-- SEIZURE SIGNS REFERENCE
ALTER TABLE public.seizure_signs_reference ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone authenticated can read seizure signs"
  ON public.seizure_signs_reference
  FOR SELECT
  TO authenticated
  USING (true);

-- BRAIN REGIONS REFERENCE
ALTER TABLE public.brain_regions_reference ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone authenticated can read brain regions"
  ON public.brain_regions_reference
  FOR SELECT
  TO authenticated
  USING (true);

-- SEIZURE TRIGGERS REFERENCE
ALTER TABLE public.seizure_triggers_reference ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone authenticated can read seizure triggers"
  ON public.seizure_triggers_reference
  FOR SELECT
  TO authenticated
  USING (true);

-- SIGN-BRAIN REGION MAPPING
ALTER TABLE public.sign_brain_region_mapping ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone authenticated can read sign-brain mappings"
  ON public.sign_brain_region_mapping
  FOR SELECT
  TO authenticated
  USING (true);

-- DAILY TRACKING PREFERENCES (user-specific)
ALTER TABLE public.daily_tracking_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tracking preferences"
  ON public.daily_tracking_preferences
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own tracking preferences"
  ON public.daily_tracking_preferences
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own tracking preferences"
  ON public.daily_tracking_preferences
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

COMMIT;

-- Verification
SELECT 
    tablename,
    'RLS NOW ENABLED' as status,
    (SELECT string_agg(policyname, ', ') 
     FROM pg_policies 
     WHERE pg_policies.tablename = pg_tables.tablename) as policies
FROM pg_tables 
WHERE schemaname = 'public'
AND tablename IN (
    'seizure_signs_reference',
    'brain_regions_reference',
    'seizure_triggers_reference',
    'sign_brain_region_mapping',
    'daily_tracking_preferences'
)
ORDER BY tablename;

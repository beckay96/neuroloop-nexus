-- =====================================================
-- FIX REFERENCE TABLES - ADD RLS POLICIES
-- =====================================================
-- These are public lookup/reference tables that should be
-- readable by all authenticated users (no PHI)
-- =====================================================

-- ============================================================================
-- 1. SEIZURE SIGNS REFERENCE (Read-only lookup)
-- ============================================================================
ALTER TABLE public.seizure_signs_reference ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone authenticated can read seizure signs" ON public.seizure_signs_reference;
CREATE POLICY "Anyone authenticated can read seizure signs"
  ON public.seizure_signs_reference
  FOR SELECT
  TO authenticated
  USING (true);

-- ============================================================================
-- 2. BRAIN REGIONS REFERENCE (Read-only lookup)
-- ============================================================================
ALTER TABLE public.brain_regions_reference ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone authenticated can read brain regions" ON public.brain_regions_reference;
CREATE POLICY "Anyone authenticated can read brain regions"
  ON public.brain_regions_reference
  FOR SELECT
  TO authenticated
  USING (true);

-- ============================================================================
-- 3. SEIZURE TRIGGERS REFERENCE (Read-only lookup)
-- ============================================================================
ALTER TABLE public.seizure_triggers_reference ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone authenticated can read seizure triggers" ON public.seizure_triggers_reference;
CREATE POLICY "Anyone authenticated can read seizure triggers"
  ON public.seizure_triggers_reference
  FOR SELECT
  TO authenticated
  USING (true);

-- ============================================================================
-- 4. SIGN-BRAIN REGION MAPPING (Read-only lookup)
-- ============================================================================
ALTER TABLE public.sign_brain_region_mapping ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone authenticated can read sign-brain mappings" ON public.sign_brain_region_mapping;
CREATE POLICY "Anyone authenticated can read sign-brain mappings"
  ON public.sign_brain_region_mapping
  FOR SELECT
  TO authenticated
  USING (true);

-- ============================================================================
-- 5. DAILY TRACKING PREFERENCES (User-specific, but in public schema)
-- ============================================================================
ALTER TABLE public.daily_tracking_preferences ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own tracking preferences" ON public.daily_tracking_preferences;
CREATE POLICY "Users can view own tracking preferences"
  ON public.daily_tracking_preferences
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can insert own tracking preferences" ON public.daily_tracking_preferences;
CREATE POLICY "Users can insert own tracking preferences"
  ON public.daily_tracking_preferences
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own tracking preferences" ON public.daily_tracking_preferences;
CREATE POLICY "Users can update own tracking preferences"
  ON public.daily_tracking_preferences
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ============================================================================
-- 6. PATIENT ONBOARDING DATA RPC (private_health_info schema access)
-- ============================================================================
CREATE OR REPLACE FUNCTION get_patient_onboarding_data(p_user_id UUID)
RETURNS TABLE (
  user_id UUID,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  emergency_contact_relationship TEXT,
  primary_diagnosis TEXT,
  diagnosis_date DATE,
  other_conditions TEXT[],
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private_health_info, public
AS $$
BEGIN
  -- Security check: user can only access own data
  IF p_user_id != auth.uid() THEN
    RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
  END IF;
  
  RETURN QUERY
  SELECT 
    pod.user_id,
    pod.emergency_contact_name,
    pod.emergency_contact_phone,
    pod.emergency_contact_relationship,
    pod.primary_diagnosis,
    pod.diagnosis_date,
    pod.other_conditions,
    pod.created_at,
    pod.updated_at
  FROM private_health_info.patient_onboarding_data pod
  WHERE pod.user_id = p_user_id;
END;
$$;

GRANT EXECUTE ON FUNCTION get_patient_onboarding_data(UUID) TO authenticated;
REVOKE EXECUTE ON FUNCTION get_patient_onboarding_data(UUID) FROM anon;

-- ============================================================================
-- VERIFICATION
-- ============================================================================
CREATE TEMP TABLE tmp_reference_tables_verification (
  message TEXT
);

INSERT INTO tmp_reference_tables_verification (message) VALUES
  ('✅ REFERENCE TABLES RLS ENABLED:'),
  ('  - seizure_signs_reference: Read access for authenticated'),
  ('  - brain_regions_reference: Read access for authenticated'),
  ('  - seizure_triggers_reference: Read access for authenticated'),
  ('  - sign_brain_region_mapping: Read access for authenticated'),
  ('  - daily_tracking_preferences: User-specific access'),
  ('✅ RPC FUNCTION CREATED:'),
  ('  - get_patient_onboarding_data: Secure access to private_health_info');

SELECT * FROM tmp_reference_tables_verification;

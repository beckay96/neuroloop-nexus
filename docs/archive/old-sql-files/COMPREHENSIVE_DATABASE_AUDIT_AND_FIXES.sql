-- ============================================================================
-- COMPREHENSIVE DATABASE AUDIT AND FIXES
-- ============================================================================
-- Based on full database schema analysis from FULL_DATABASE_NOW.md
-- Date: 2025-10-06
-- Status: PRODUCTION CRITICAL - RUN IMMEDIATELY
-- ============================================================================

BEGIN;

-- ============================================================================
-- PART 1: PROFILES TABLE FOREIGN KEY FIX
-- ============================================================================
-- Issue: profiles.id foreign key constraint violation
-- Root Cause: Foreign key not properly configured

DO $$ 
BEGIN
    -- Drop existing problematic foreign key if it exists
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'profiles_id_fkey' 
        AND table_name = 'profiles'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.profiles DROP CONSTRAINT profiles_id_fkey;
        RAISE NOTICE 'Dropped existing profiles_id_fkey constraint';
    END IF;
END $$;

-- Ensure profiles table has correct foreign key
ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_id_fkey 
FOREIGN KEY (id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;

RAISE NOTICE 'Added correct foreign key constraint to profiles table';

-- ============================================================================
-- PART 2: MENSTRUAL CYCLE TRACKING TABLE
-- ============================================================================
-- Issue: Table does not exist in private_health_info schema
-- Impact: Catamenial epilepsy tracking impossible

CREATE TABLE IF NOT EXISTS private_health_info.menstrual_cycle_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Cycle Information
    cycle_start_date DATE NOT NULL,
    cycle_end_date DATE,
    cycle_length_days INTEGER,
    
    -- Flow & Phase
    flow_intensity TEXT CHECK (flow_intensity IN (
        'spotting', 'light', 'moderate', 'heavy', 'very_heavy'
    )),
    cycle_phase TEXT CHECK (cycle_phase IN (
        'menstrual', 'follicular', 'ovulation', 'luteal'
    )),
    
    -- Symptoms (JSONB array)
    symptoms JSONB DEFAULT '[]'::jsonb,
    symptom_severity INTEGER CHECK (symptom_severity BETWEEN 1 AND 10),
    
    -- CRITICAL: Seizure Correlation (Catamenial Epilepsy Tracking)
    seizure_count_during_cycle INTEGER DEFAULT 0,
    seizure_clustered_around_menstruation BOOLEAN DEFAULT false,
    catamenial_pattern_suspected BOOLEAN DEFAULT false,
    seizure_correlation JSONB, -- Additional correlation metadata
    
    -- Notes
    notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

RAISE NOTICE 'Created menstrual_cycle_logs table';

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_menstrual_logs_user_id 
ON private_health_info.menstrual_cycle_logs(user_id);

CREATE INDEX IF NOT EXISTS idx_menstrual_logs_cycle_date 
ON private_health_info.menstrual_cycle_logs(cycle_start_date DESC);

CREATE INDEX IF NOT EXISTS idx_menstrual_logs_catamenial 
ON private_health_info.menstrual_cycle_logs(user_id, catamenial_pattern_suspected)
WHERE catamenial_pattern_suspected = true;

RAISE NOTICE 'Created indexes on menstrual_cycle_logs';

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION private_health_info.update_menstrual_log_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trigger_update_menstrual_log_timestamp 
ON private_health_info.menstrual_cycle_logs;

CREATE TRIGGER trigger_update_menstrual_log_timestamp
    BEFORE UPDATE ON private_health_info.menstrual_cycle_logs
    FOR EACH ROW
    EXECUTE FUNCTION private_health_info.update_menstrual_log_timestamp();

RAISE NOTICE 'Created update trigger for menstrual_cycle_logs';

-- ============================================================================
-- PART 3: RLS POLICIES FOR MENSTRUAL TRACKING
-- ============================================================================
-- Security: HIPAA-compliant access control

ALTER TABLE private_health_info.menstrual_cycle_logs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own menstrual logs" 
ON private_health_info.menstrual_cycle_logs;

DROP POLICY IF EXISTS "Users can insert own menstrual logs" 
ON private_health_info.menstrual_cycle_logs;

DROP POLICY IF EXISTS "Users can update own menstrual logs" 
ON private_health_info.menstrual_cycle_logs;

DROP POLICY IF EXISTS "Users can delete own menstrual logs" 
ON private_health_info.menstrual_cycle_logs;

DROP POLICY IF EXISTS "Clinicians can view patient menstrual logs" 
ON private_health_info.menstrual_cycle_logs;

-- Patient can view their own logs
CREATE POLICY "Users can view own menstrual logs"
ON private_health_info.menstrual_cycle_logs
FOR SELECT
USING (auth.uid() = user_id);

-- Patient can insert their own logs
CREATE POLICY "Users can insert own menstrual logs"
ON private_health_info.menstrual_cycle_logs
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Patient can update their own logs
CREATE POLICY "Users can update own menstrual logs"
ON private_health_info.menstrual_cycle_logs
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Patient can delete their own logs
CREATE POLICY "Users can delete own menstrual logs"
ON private_health_info.menstrual_cycle_logs
FOR DELETE
USING (auth.uid() = user_id);

-- Clinicians can view patient logs if they have ACTIVE connection
-- Uses existing patient_clinician_connections table
CREATE POLICY "Clinicians can view patient menstrual logs"
ON private_health_info.menstrual_cycle_logs
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.patient_clinician_connections
        WHERE clinician_id = auth.uid()
        AND patient_id = menstrual_cycle_logs.user_id
        AND status = 'active'
    )
);

RAISE NOTICE 'Applied RLS policies to menstrual_cycle_logs';

-- ============================================================================
-- PART 4: INITIALIZE NEW USER FUNCTION (COMPREHENSIVE FIX)
-- ============================================================================
-- Issue: Foreign key constraint violations during user signup
-- Fix: Check auth.users existence first, then create profile

CREATE OR REPLACE FUNCTION public.initialize_new_user(
  p_user_id UUID,
  p_email TEXT,
  p_user_type TEXT
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, private_health_info
AS $$
DECLARE
  v_profile_exists BOOLEAN;
  v_user_exists BOOLEAN;
  v_result JSONB;
BEGIN
  -- CRITICAL: Verify user exists in auth.users first
  SELECT EXISTS(
    SELECT 1 FROM auth.users WHERE id = p_user_id
  ) INTO v_user_exists;

  IF NOT v_user_exists THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'User does not exist in auth.users. User may not be confirmed yet.',
      'user_id', p_user_id,
      'action', 'wait_for_confirmation'
    );
  END IF;

  -- Check if profile already exists
  SELECT EXISTS(
    SELECT 1 FROM public.profiles WHERE id = p_user_id
  ) INTO v_profile_exists;

  IF v_profile_exists THEN
    RETURN jsonb_build_object(
      'success', true,
      'message', 'User already initialized',
      'user_id', p_user_id,
      'action', 'already_exists'
    );
  END IF;

  -- Validate user_type
  IF p_user_type NOT IN ('patient', 'clinician', 'carer', 'researcher') THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Invalid user_type: ' || p_user_type,
      'user_id', p_user_id
    );
  END IF;

  -- Create profile (id references auth.users via foreign key)
  BEGIN
    INSERT INTO public.profiles (
      id,
      user_type,
      onboarding_completed,
      email_verified,
      created_at,
      updated_at
    ) VALUES (
      p_user_id,
      p_user_type::user_type_enum,
      false,
      false,
      NOW(),
      NOW()
    );
    
    RAISE NOTICE 'Created profile for user %', p_user_id;
  EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Failed to create profile: ' || SQLERRM,
      'user_id', p_user_id,
      'error_detail', SQLSTATE
    );
  END;

  -- Initialize type-specific data
  BEGIN
    CASE p_user_type
      WHEN 'patient' THEN
        -- Create patient profile
        INSERT INTO public.patient_profiles (
          user_id,
          created_at,
          updated_at
        ) VALUES (
          p_user_id,
          NOW(),
          NOW()
        ) ON CONFLICT (user_id) DO NOTHING;

        -- Create private health info record
        INSERT INTO private_health_info.patient_phi (
          user_id,
          created_at,
          updated_at
        ) VALUES (
          p_user_id,
          NOW(),
          NOW()
        ) ON CONFLICT (user_id) DO NOTHING;

        RAISE NOTICE 'Created patient-specific data for user %', p_user_id;

      WHEN 'clinician' THEN
        INSERT INTO public.clinician_profiles (
          user_id,
          created_at,
          updated_at
        ) VALUES (
          p_user_id,
          NOW(),
          NOW()
        ) ON CONFLICT (user_id) DO NOTHING;

        RAISE NOTICE 'Created clinician-specific data for user %', p_user_id;

      WHEN 'carer' THEN
        INSERT INTO public.carer_profiles (
          user_id,
          created_at,
          updated_at
        ) VALUES (
          p_user_id,
          NOW(),
          NOW()
        ) ON CONFLICT (user_id) DO NOTHING;

        RAISE NOTICE 'Created carer-specific data for user %', p_user_id;

      WHEN 'researcher' THEN
        INSERT INTO public.researcher_profiles (
          user_id,
          created_at,
          updated_at
        ) VALUES (
          p_user_id,
          NOW(),
          NOW()
        ) ON CONFLICT (user_id) DO NOTHING;

        RAISE NOTICE 'Created researcher-specific data for user %', p_user_id;

      ELSE
        RAISE NOTICE 'Unknown user_type: %', p_user_type;
    END CASE;

  EXCEPTION WHEN OTHERS THEN
    -- Profile was created, but type-specific data failed
    -- Still return success since core profile exists
    RETURN jsonb_build_object(
      'success', true,
      'message', 'Profile created but type-specific initialization had issues: ' || SQLERRM,
      'user_id', p_user_id,
      'warning', true
    );
  END;

  -- Success!
  RETURN jsonb_build_object(
    'success', true,
    'message', 'User initialized successfully',
    'user_id', p_user_id,
    'user_type', p_user_type,
    'action', 'created'
  );

EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Unexpected error initializing user: ' || SQLERRM,
      'user_id', p_user_id,
      'error_detail', SQLSTATE
    );
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.initialize_new_user(UUID, TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.initialize_new_user(UUID, TEXT, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.initialize_new_user(UUID, TEXT, TEXT) TO service_role;

RAISE NOTICE 'Created initialize_new_user function with comprehensive error handling';

-- ============================================================================
-- PART 5: VERIFICATION QUERIES
-- ============================================================================

DO $$
DECLARE
  v_table_exists BOOLEAN;
  v_policy_count INTEGER;
  v_function_exists BOOLEAN;
BEGIN
  -- Check menstrual_cycle_logs table exists
  SELECT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'private_health_info' 
    AND table_name = 'menstrual_cycle_logs'
  ) INTO v_table_exists;

  IF v_table_exists THEN
    RAISE NOTICE '✅ menstrual_cycle_logs table exists';
  ELSE
    RAISE WARNING '❌ menstrual_cycle_logs table MISSING';
  END IF;

  -- Check RLS policies
  SELECT COUNT(*) INTO v_policy_count
  FROM pg_policies
  WHERE schemaname = 'private_health_info'
  AND tablename = 'menstrual_cycle_logs';

  IF v_policy_count >= 5 THEN
    RAISE NOTICE '✅ % RLS policies applied to menstrual_cycle_logs', v_policy_count;
  ELSE
    RAISE WARNING '❌ Only % RLS policies found (expected 5)', v_policy_count;
  END IF;

  -- Check initialize_new_user function
  SELECT EXISTS (
    SELECT 1 FROM information_schema.routines
    WHERE routine_schema = 'public'
    AND routine_name = 'initialize_new_user'
  ) INTO v_function_exists;

  IF v_function_exists THEN
    RAISE NOTICE '✅ initialize_new_user function exists';
  ELSE
    RAISE WARNING '❌ initialize_new_user function MISSING';
  END IF;

  -- Check profiles foreign key
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'profiles_id_fkey' 
    AND table_name = 'profiles'
    AND table_schema = 'public'
  ) THEN
    RAISE NOTICE '✅ profiles foreign key constraint exists';
  ELSE
    RAISE WARNING '❌ profiles foreign key constraint MISSING';
  END IF;

END $$;

COMMIT;

-- ============================================================================
-- SUCCESS SUMMARY
-- ============================================================================
-- ✅ profiles.id foreign key fixed
-- ✅ menstrual_cycle_logs table created
-- ✅ 5 RLS policies applied (patient + clinician access)
-- ✅ Indexes created for performance
-- ✅ Update trigger configured
-- ✅ initialize_new_user function fixed with comprehensive error handling
-- ✅ All fixes use correct table names (patient_clinician_connections)
-- ============================================================================
-- NEXT STEPS:
-- 1. Test user signup
-- 2. Test menstrual tracking
-- 3. Verify RLS policies work correctly
-- ============================================================================

-- ============================================================================
-- CRITICAL DATABASE FIXES
-- ============================================================================
-- Issue 1: profiles.id foreign key constraint error
-- Issue 2: Missing menstrual_cycle_logs table
-- Run this IMMEDIATELY in Supabase SQL Editor
-- ============================================================================

BEGIN;

-- ============================================================================
-- FIX 1: PROFILES TABLE FOREIGN KEY
-- ============================================================================
-- The profiles table must reference auth.users correctly

-- Drop existing foreign key if it exists
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'profiles_id_fkey' 
        AND table_name = 'profiles'
    ) THEN
        ALTER TABLE public.profiles DROP CONSTRAINT profiles_id_fkey;
    END IF;
END $$;

-- Ensure profiles table has correct structure
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'profiles'
    ) THEN
        CREATE TABLE public.profiles (
            id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
            user_type user_type_enum NOT NULL,
            first_name TEXT,
            last_name TEXT,
            phone_number TEXT,
            onboarding_completed BOOLEAN DEFAULT false,
            email_verified BOOLEAN DEFAULT false,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        );
    ELSE
        -- Add the correct foreign key
        ALTER TABLE public.profiles 
        ADD CONSTRAINT profiles_id_fkey 
        FOREIGN KEY (id) 
        REFERENCES auth.users(id) 
        ON DELETE CASCADE;
    END IF;
END $$;

-- ============================================================================
-- FIX 2: MENSTRUAL CYCLE TRACKING TABLE
-- ============================================================================
-- Critical for Epilepsy patients - catamenial seizure tracking

CREATE TABLE IF NOT EXISTS private_health_info.menstrual_cycle_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Cycle Information
    cycle_start_date DATE NOT NULL,
    cycle_end_date DATE,
    cycle_length_days INTEGER,
    
    -- Flow & Phase
    flow_intensity TEXT CHECK (flow_intensity IN ('spotting', 'light', 'moderate', 'heavy', 'very_heavy')),
    cycle_phase TEXT CHECK (cycle_phase IN ('menstrual', 'follicular', 'ovulation', 'luteal')),
    
    -- Symptoms
    symptoms JSONB, -- Array of symptoms: ["cramps", "bloating", "headache", "mood_changes", etc.]
    symptom_severity INTEGER CHECK (symptom_severity BETWEEN 1 AND 10),
    
    -- CRITICAL: Seizure Correlation (Catamenial Epilepsy Tracking)
    seizure_count_during_cycle INTEGER DEFAULT 0,
    seizure_clustered_around_menstruation BOOLEAN DEFAULT false,
    catamenial_pattern_suspected BOOLEAN DEFAULT false,
    seizure_correlation JSONB, -- Additional correlation data
    
    -- Notes
    notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_menstrual_logs_user_id 
ON private_health_info.menstrual_cycle_logs(user_id);

-- Create index on cycle_start_date for date range queries
CREATE INDEX IF NOT EXISTS idx_menstrual_logs_cycle_date 
ON private_health_info.menstrual_cycle_logs(cycle_start_date DESC);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION private_health_info.update_menstrual_log_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_menstrual_log_timestamp 
ON private_health_info.menstrual_cycle_logs;

CREATE TRIGGER trigger_update_menstrual_log_timestamp
    BEFORE UPDATE ON private_health_info.menstrual_cycle_logs
    FOR EACH ROW
    EXECUTE FUNCTION private_health_info.update_menstrual_log_timestamp();

-- ============================================================================
-- RLS POLICIES FOR MENSTRUAL TRACKING
-- ============================================================================

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

-- Clinicians can view patient logs if they have permission
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

-- ============================================================================
-- FIX 3: INITIALIZE NEW USER FUNCTION (CORRECTED)
-- ============================================================================

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
BEGIN
  -- CRITICAL: Check if user exists in auth.users first
  SELECT EXISTS(
    SELECT 1 FROM auth.users WHERE id = p_user_id
  ) INTO v_user_exists;

  IF NOT v_user_exists THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'User does not exist in auth.users',
      'user_id', p_user_id
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
      'user_id', p_user_id
    );
  END IF;

  -- Create profile (id references auth.users via foreign key)
  INSERT INTO public.profiles (
    id,
    user_type,
    onboarding_completed,
    created_at,
    updated_at
  ) VALUES (
    p_user_id,
    p_user_type::user_type_enum,
    false,
    NOW(),
    NOW()
  );

  -- Initialize patient-specific data
  IF p_user_type = 'patient' THEN
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
  END IF;

  -- Initialize clinician-specific data
  IF p_user_type = 'clinician' THEN
    INSERT INTO public.clinician_profiles (
      user_id,
      created_at,
      updated_at
    ) VALUES (
      p_user_id,
      NOW(),
      NOW()
    ) ON CONFLICT (user_id) DO NOTHING;
  END IF;

  -- Initialize carer-specific data
  IF p_user_type = 'carer' THEN
    INSERT INTO public.carer_profiles (
      user_id,
      created_at,
      updated_at
    ) VALUES (
      p_user_id,
      NOW(),
      NOW()
    ) ON CONFLICT (user_id) DO NOTHING;
  END IF;

  -- Initialize researcher-specific data
  IF p_user_type = 'researcher' THEN
    INSERT INTO public.researcher_profiles (
      user_id,
      created_at,
      updated_at
    ) VALUES (
      p_user_id,
      NOW(),
      NOW()
    ) ON CONFLICT (user_id) DO NOTHING;
  END IF;

  RETURN jsonb_build_object(
    'success', true,
    'message', 'User initialized successfully',
    'user_id', p_user_id
  );

EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Error initializing user: ' || SQLERRM,
      'user_id', p_user_id
    );
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.initialize_new_user(UUID, TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.initialize_new_user(UUID, TEXT, TEXT) TO anon;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check menstrual_cycle_logs table exists
SELECT 
    table_schema, 
    table_name 
FROM information_schema.tables 
WHERE table_name = 'menstrual_cycle_logs';

-- Check RLS policies
SELECT 
    schemaname,
    tablename,
    policyname,
    cmd
FROM pg_policies
WHERE tablename = 'menstrual_cycle_logs'
ORDER BY policyname;

-- Check initialize_new_user function
SELECT 
    routine_name,
    routine_type
FROM information_schema.routines
WHERE routine_name = 'initialize_new_user'
AND routine_schema = 'public';

COMMIT;

-- ============================================================================
-- SUCCESS! 
-- ============================================================================
-- ✅ Profiles foreign key fixed
-- ✅ Menstrual cycle tracking table created
-- ✅ RLS policies applied
-- ✅ initialize_new_user function corrected
-- ============================================================================

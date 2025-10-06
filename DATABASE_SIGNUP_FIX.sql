-- ============================================================================
-- DATABASE SIGNUP FIX - Critical RLS Policies & Schema Fixes
-- ============================================================================
-- Date: 2025-01-06
-- Purpose: Fix signup errors and RLS permission issues
-- ============================================================================

-- ============================================================================
-- 1. FIX PROFILES TABLE RLS POLICIES
-- ============================================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Service role has full access" ON public.profiles;

-- Enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy 1: Users can read their own profile
CREATE POLICY "Users can read own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Policy 2: Users can update their own profile
CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Policy 3: Users can insert their own profile (for signup)
CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Policy 4: Service role has full access
CREATE POLICY "Service role has full access"
ON public.profiles
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================================================
-- 2. DROP ONBOARDING_PROGRESS TABLE (NOT USED)
-- ============================================================================

-- This table is causing errors but isn't used in the codebase
DROP TABLE IF EXISTS public.onboarding_progress CASCADE;

-- ============================================================================
-- 3. ENSURE PROFILES TABLE HAS CORRECT SCHEMA
-- ============================================================================

-- Make sure profiles table has all required columns
DO $$ 
BEGIN
    -- Add onboarding_completed if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'profiles' 
        AND column_name = 'onboarding_completed'
    ) THEN
        ALTER TABLE public.profiles 
        ADD COLUMN onboarding_completed BOOLEAN DEFAULT FALSE;
    END IF;

    -- Add user_type if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'profiles' 
        AND column_name = 'user_type'
    ) THEN
        ALTER TABLE public.profiles 
        ADD COLUMN user_type user_type_enum;
    END IF;

    -- Add email if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'profiles' 
        AND column_name = 'email'
    ) THEN
        ALTER TABLE public.profiles 
        ADD COLUMN email TEXT;
    END IF;
END $$;

-- ============================================================================
-- 4. CREATE TRIGGER TO AUTO-CREATE PROFILE ON SIGNUP
-- ============================================================================

-- Drop existing trigger/function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
    -- Insert new profile for the user
    INSERT INTO public.profiles (id, email, user_type, onboarding_completed, created_at, updated_at)
    VALUES (
        NEW.id,
        NEW.email,
        NULL, -- Will be set during onboarding
        FALSE,
        NOW(),
        NOW()
    )
    ON CONFLICT (id) DO NOTHING;
    
    RETURN NEW;
END;
$$;

-- Create trigger to run function on user signup
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- 5. FIX PATIENT_PROFILES TABLE RLS
-- ============================================================================

-- Enable RLS
ALTER TABLE public.patient_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own patient_profile" ON public.patient_profiles;
DROP POLICY IF EXISTS "Users can update own patient_profile" ON public.patient_profiles;
DROP POLICY IF EXISTS "Users can insert own patient_profile" ON public.patient_profiles;
DROP POLICY IF EXISTS "Clinicians can view patient_profiles" ON public.patient_profiles;

-- Policy: Users can manage their own patient profile
CREATE POLICY "Users can read own patient_profile"
ON public.patient_profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own patient_profile"
ON public.patient_profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own patient_profile"
ON public.patient_profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Policy: Clinicians can view connected patients
CREATE POLICY "Clinicians can view patient_profiles"
ON public.patient_profiles
FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.patient_clinician_connections
        WHERE patient_clinician_connections.patient_id = patient_profiles.user_id
        AND patient_clinician_connections.clinician_id = auth.uid()
        AND patient_clinician_connections.status = 'active'
    )
);

-- ============================================================================
-- 6. FIX CLINICIAN_PROFILES TABLE RLS  
-- ============================================================================

-- Enable RLS
ALTER TABLE public.clinician_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own clinician_profile" ON public.clinician_profiles;
DROP POLICY IF EXISTS "Users can update own clinician_profile" ON public.clinician_profiles;
DROP POLICY IF EXISTS "Users can insert own clinician_profile" ON public.clinician_profiles;

-- Policy: Users can manage their own clinician profile
CREATE POLICY "Users can read own clinician_profile"
ON public.clinician_profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own clinician_profile"
ON public.clinician_profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own clinician_profile"
ON public.clinician_profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- 7. GRANT NECESSARY PERMISSIONS
-- ============================================================================

-- Grant usage on schemas
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO anon;

-- Grant permissions on profiles table
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT SELECT ON public.profiles TO anon;

-- Grant permissions on patient_profiles table
GRANT SELECT, INSERT, UPDATE ON public.patient_profiles TO authenticated;

-- Grant permissions on clinician_profiles table
GRANT SELECT, INSERT, UPDATE ON public.clinician_profiles TO authenticated;

-- ============================================================================
-- 8. VERIFY SETUP
-- ============================================================================

-- Show all RLS policies on profiles table
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'profiles';

-- Show table structure
\d public.profiles

COMMENT ON TABLE public.profiles IS 'User profiles with RLS enabled - Fixed 2025-01-06';

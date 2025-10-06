-- ============================================================================
-- FIX USER SIGNUP RLS ISSUES - COMPREHENSIVE SOLUTION
-- ============================================================================
-- Date: 2025-01-07
-- Issue: Users cannot sign up due to RLS policies blocking initial data creation
-- Solution: Fix auth trigger, RLS policies, and initialization function
-- ============================================================================

BEGIN;

-- ============================================================================
-- STEP 1: Create Security Definer Functions for Initial Setup
-- ============================================================================
-- These functions run with elevated privileges to bypass RLS during signup

-- Drop existing function to recreate with proper permissions
DROP FUNCTION IF EXISTS public.initialize_new_user CASCADE;

-- Create the function with SECURITY DEFINER to bypass RLS
CREATE OR REPLACE FUNCTION public.initialize_new_user(
    p_user_id UUID,
    p_email TEXT,
    p_user_type TEXT DEFAULT 'patient'
) RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER -- This allows the function to bypass RLS
SET search_path = public
AS $$
DECLARE
    v_user_type public.user_type_enum;
    v_user_exists BOOLEAN;
    v_profile_exists BOOLEAN;
    v_result JSONB;
BEGIN
    -- Validate user_type
    BEGIN
        v_user_type := p_user_type::public.user_type_enum;
    EXCEPTION
        WHEN OTHERS THEN
            RETURN jsonb_build_object(
                'success', false, 
                'message', 'Invalid user_type: ' || p_user_type,
                'error', SQLERRM
            );
    END;
    
    -- Check if user exists in auth.users
    SELECT EXISTS (SELECT 1 FROM auth.users WHERE id = p_user_id) INTO v_user_exists;
    
    IF NOT v_user_exists THEN
        RETURN jsonb_build_object(
            'success', false, 
            'message', 'User does not exist in auth.users'
        );
    END IF;
    
    -- Check if profile already exists
    SELECT EXISTS (SELECT 1 FROM public.profiles WHERE id = p_user_id) INTO v_profile_exists;
    
    IF v_profile_exists THEN
        -- Update user_type if profile exists but type is NULL
        UPDATE public.profiles 
        SET 
            user_type = v_user_type,
            updated_at = NOW()
        WHERE id = p_user_id AND user_type IS NULL;
        
        RETURN jsonb_build_object(
            'success', true, 
            'message', 'Profile already exists',
            'user_id', p_user_id,
            'user_type', v_user_type
        );
    END IF;
    
    -- Create profile
    INSERT INTO public.profiles (
        id, 
        email, 
        user_type, 
        created_at, 
        updated_at,
        onboarding_completed
    ) VALUES (
        p_user_id, 
        p_email, 
        v_user_type, 
        NOW(), 
        NOW(),
        false
    );
    
    -- Create user type specific profiles
    CASE v_user_type
        WHEN 'patient' THEN
            -- Create patient profile
            INSERT INTO public.patient_profiles (
                id, 
                user_id, 
                created_at, 
                updated_at
            ) VALUES (
                gen_random_uuid(), 
                p_user_id, 
                NOW(), 
                NOW()
            );
            
            -- Create data sharing preferences with defaults
            INSERT INTO public.data_sharing_preferences (
                id,
                patient_id,
                default_share_with_clinicians,
                default_share_with_carers,
                default_share_with_researchers,
                seizure_events_visibility,
                tremor_episodes_visibility,
                gait_episodes_visibility,
                daily_logs_visibility,
                medications_visibility,
                media_visibility,
                created_at,
                updated_at
            ) VALUES (
                gen_random_uuid(),
                p_user_id,
                true,  -- Default: share with clinicians
                true,  -- Default: share with carers
                false, -- Default: don't share with researchers
                'connected_clinicians',
                'connected_clinicians',
                'connected_clinicians',
                'connected_clinicians',
                'connected_clinicians',
                'connected_clinicians',
                NOW(),
                NOW()
            );
            
            -- Create notification preferences
            INSERT INTO public.notification_preferences (
                id,
                user_id,
                email_enabled,
                push_enabled,
                medication_reminders,
                appointment_reminders,
                critical_alerts,
                created_at,
                updated_at
            ) VALUES (
                gen_random_uuid(),
                p_user_id,
                true,  -- Email enabled
                true,  -- Push enabled
                true,  -- Medication reminders
                true,  -- Appointment reminders
                true,  -- Critical alerts
                NOW(),
                NOW()
            );
            
            -- Create user points entry
            INSERT INTO public.user_points (
                id,
                user_id,
                points,
                level,
                streak_days,
                created_at,
                updated_at
            ) VALUES (
                gen_random_uuid(),
                p_user_id,
                0,     -- Starting points
                1,     -- Starting level
                0,     -- Starting streak
                NOW(),
                NOW()
            );
            
        WHEN 'clinician' THEN
            -- Create clinician profile
            INSERT INTO public.clinician_profiles (
                id,
                user_id,
                accepting_new_patients,
                created_at,
                updated_at
            ) VALUES (
                gen_random_uuid(),
                p_user_id,
                true,
                NOW(),
                NOW()
            );
            
            -- Create notification preferences
            INSERT INTO public.notification_preferences (
                id,
                user_id,
                email_enabled,
                push_enabled,
                critical_alerts,
                created_at,
                updated_at
            ) VALUES (
                gen_random_uuid(),
                p_user_id,
                true,
                true,
                true,
                NOW(),
                NOW()
            );
            
        WHEN 'carer' THEN
            -- Create carer profile
            INSERT INTO public.carer_profiles (
                id,
                user_id,
                created_at,
                updated_at
            ) VALUES (
                gen_random_uuid(),
                p_user_id,
                NOW(),
                NOW()
            );
            
            -- Create notification preferences
            INSERT INTO public.notification_preferences (
                id,
                user_id,
                email_enabled,
                push_enabled,
                critical_alerts,
                created_at,
                updated_at
            ) VALUES (
                gen_random_uuid(),
                p_user_id,
                true,
                true,
                true,
                NOW(),
                NOW()
            );
            
        WHEN 'researcher' THEN
            -- Create researcher profile
            INSERT INTO public.researcher_profiles (
                id,
                user_id,
                access_level,
                created_at,
                updated_at
            ) VALUES (
                gen_random_uuid(),
                p_user_id,
                'basic', -- Start with basic access
                NOW(),
                NOW()
            );
            
        ELSE
            -- Admin or other type - just basic profile created
            NULL;
    END CASE;
    
    -- Log successful initialization
    PERFORM public.log_system_event(
        'INFO', 
        'auth', 
        'user_initialization_complete', 
        'User successfully initialized',
        p_user_id,
        'initialize_new_user',
        NULL,
        jsonb_build_object(
            'user_type', v_user_type,
            'email', p_email
        )
    );
    
    RETURN jsonb_build_object(
        'success', true,
        'message', 'User initialized successfully',
        'user_id', p_user_id,
        'user_type', v_user_type
    );
    
EXCEPTION
    WHEN OTHERS THEN
        -- Log the error
        PERFORM public.log_system_event(
            'ERROR', 
            'auth', 
            'user_initialization_failed', 
            'Failed to initialize user: ' || SQLERRM,
            p_user_id,
            'initialize_new_user',
            SQLSTATE,
            jsonb_build_object(
                'user_type', p_user_type,
                'email', p_email,
                'error', SQLERRM,
                'detail', SQLSTATE
            )
        );
        
        RETURN jsonb_build_object(
            'success', false,
            'message', 'Failed to initialize user',
            'error', SQLERRM,
            'detail', SQLSTATE
        );
END;
$$;

-- Grant execute permission to authenticated users and service role
GRANT EXECUTE ON FUNCTION public.initialize_new_user TO authenticated;
GRANT EXECUTE ON FUNCTION public.initialize_new_user TO service_role;

-- ============================================================================
-- STEP 2: Fix the Auth Trigger to Properly Initialize Users
-- ============================================================================

-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Create improved auth trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_type TEXT;
    v_result JSONB;
BEGIN
    -- Extract user_type from metadata (set during signup)
    v_user_type := COALESCE(
        NEW.raw_user_meta_data->>'user_type',
        NEW.raw_user_meta_data->>'userType',
        'patient' -- Default to patient if not specified
    );
    
    -- Call initialize_new_user with proper parameters
    v_result := public.initialize_new_user(
        NEW.id,
        NEW.email,
        v_user_type
    );
    
    -- Check if initialization was successful
    IF NOT (v_result->>'success')::boolean THEN
        -- Log the failure but don't block user creation
        RAISE WARNING 'Failed to initialize user profile: %', v_result->>'message';
    END IF;
    
    RETURN NEW;
END;
$$;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- STEP 3: Fix RLS Policies for Initial Setup Tables
-- ============================================================================

-- Fix profiles table RLS to allow initial insert
DROP POLICY IF EXISTS "profiles_insert" ON public.profiles;
CREATE POLICY "profiles_insert"
    ON public.profiles
    FOR INSERT
    WITH CHECK (
        auth.uid() = id OR 
        current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
    );

-- Fix notification_preferences RLS
DROP POLICY IF EXISTS "notification_preferences_insert" ON public.notification_preferences;
CREATE POLICY "notification_preferences_insert"
    ON public.notification_preferences
    FOR INSERT
    WITH CHECK (
        auth.uid() = user_id OR
        current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
    );

-- Fix data_sharing_preferences RLS
DROP POLICY IF EXISTS "data_sharing_preferences_insert" ON public.data_sharing_preferences;
CREATE POLICY "data_sharing_preferences_insert"
    ON public.data_sharing_preferences
    FOR INSERT
    WITH CHECK (
        auth.uid() = patient_id OR
        current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
    );

-- Fix user_points RLS
DROP POLICY IF EXISTS "user_points_insert" ON public.user_points;
CREATE POLICY "user_points_insert"
    ON public.user_points
    FOR INSERT
    WITH CHECK (
        auth.uid() = user_id OR
        current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
    );

-- Fix patient_profiles RLS
DROP POLICY IF EXISTS "patient_profiles_insert" ON public.patient_profiles;
CREATE POLICY "patient_profiles_insert"
    ON public.patient_profiles
    FOR INSERT
    WITH CHECK (
        auth.uid() = user_id OR
        current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
    );

-- Fix clinician_profiles RLS
DROP POLICY IF EXISTS "clinician_profiles_insert" ON public.clinician_profiles;
CREATE POLICY "clinician_profiles_insert"
    ON public.clinician_profiles
    FOR INSERT
    WITH CHECK (
        auth.uid() = user_id OR
        current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
    );

-- Fix carer_profiles RLS
DROP POLICY IF EXISTS "carer_profiles_insert" ON public.carer_profiles;
CREATE POLICY "carer_profiles_insert"
    ON public.carer_profiles
    FOR INSERT
    WITH CHECK (
        auth.uid() = user_id OR
        current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
    );

-- Fix researcher_profiles RLS
DROP POLICY IF EXISTS "researcher_profiles_insert" ON public.researcher_profiles;
CREATE POLICY "researcher_profiles_insert"
    ON public.researcher_profiles
    FOR INSERT
    WITH CHECK (
        auth.uid() = user_id OR
        current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
    );

-- ============================================================================
-- STEP 4: Grant Necessary Permissions
-- ============================================================================

-- Grant usage on schemas
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO anon;

-- Grant execute on key functions
GRANT EXECUTE ON FUNCTION public.get_user_type TO authenticated, anon;
GRANT EXECUTE ON FUNCTION public.log_system_event TO authenticated, service_role;

-- ============================================================================
-- FINAL VERIFICATION
-- ============================================================================

DO $$
DECLARE
    v_count INTEGER;
BEGIN
    -- Check if policies exist
    SELECT COUNT(*) INTO v_count
    FROM pg_policies
    WHERE schemaname = 'public' 
    AND tablename IN ('profiles', 'notification_preferences', 'data_sharing_preferences');
    
    RAISE NOTICE '✅ Found % RLS policies on key tables', v_count;
    
    -- Check if functions exist
    SELECT COUNT(*) INTO v_count
    FROM pg_proc
    WHERE proname = 'initialize_new_user'
    AND pronamespace = 'public'::regnamespace;
    
    IF v_count > 0 THEN
        RAISE NOTICE '✅ initialize_new_user function exists';
    ELSE
        RAISE WARNING '❌ initialize_new_user function not found!';
    END IF;
    
    -- Check if trigger exists
    SELECT COUNT(*) INTO v_count
    FROM pg_trigger
    WHERE tgname = 'on_auth_user_created';
    
    IF v_count > 0 THEN
        RAISE NOTICE '✅ Auth trigger exists';
    ELSE
        RAISE WARNING '❌ Auth trigger not found!';
    END IF;
    
    RAISE NOTICE '';
    RAISE NOTICE '🎉 USER SIGNUP FIX COMPLETE!';
    RAISE NOTICE '';
    RAISE NOTICE 'Next steps:';
    RAISE NOTICE '1. Test signup with a new account';
    RAISE NOTICE '2. Check function_execution_logs for any errors';
    RAISE NOTICE '3. Verify all initial tables are populated';
END;
$$;

COMMIT;

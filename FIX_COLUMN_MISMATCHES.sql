-- ============================================================================
-- FIX: Column name mismatches in initialize_new_user
-- ============================================================================
-- Issue 1: user_points.points vs total_points
-- Issue 2: data_sharing_preferences.patient_id vs user_id
-- ============================================================================

BEGIN;

-- Fix the initialize_new_user function with correct column names
CREATE OR REPLACE FUNCTION public.initialize_new_user(
    p_user_id UUID,
    p_email TEXT,
    p_user_type TEXT DEFAULT 'patient'
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, private_health_info
AS $$
DECLARE
    v_user_type user_type_enum;
    v_user_exists BOOLEAN;
    v_profile_exists BOOLEAN;
    v_execution_id UUID;
    v_step TEXT;
BEGIN
    v_execution_id := public.start_function_execution('initialize_new_user', p_user_id, p_user_type, 'api');
    PERFORM public.log_system_event('INFO', 'auth', 'user_initialization_started', 'Starting user initialization', p_user_id, 'initialize_new_user', NULL, jsonb_build_object('user_type', p_user_type));
    
    -- Step 1: Validate user_type
    v_step := 'validate_user_type';
    BEGIN
        v_user_type := p_user_type::user_type_enum;
        PERFORM public.log_system_event('DEBUG', 'auth', 'user_type_validated', 'User type validated successfully', p_user_id, 'initialize_new_user', NULL, jsonb_build_object('user_type', p_user_type, 'step', v_step));
    EXCEPTION
        WHEN OTHERS THEN
            PERFORM public.log_system_event('ERROR', 'auth', 'validation_failed', 'Invalid user_type: ' || p_user_type, p_user_id, 'initialize_new_user', SQLSTATE, jsonb_build_object('user_type', p_user_type, 'step', v_step, 'error', SQLERRM));
            PERFORM public.complete_function_execution(v_execution_id, false, jsonb_build_object('success', false, 'message', 'Invalid user_type: ' || p_user_type));
            RETURN jsonb_build_object('success', false, 'message', 'Invalid user_type: ' || p_user_type);
    END;

    -- Step 2: Check if user exists in auth.users
    v_step := 'check_auth_user';
    SELECT EXISTS (SELECT 1 FROM auth.users WHERE id = p_user_id) INTO v_user_exists;
    
    IF NOT v_user_exists THEN
        PERFORM public.log_system_event('ERROR', 'auth', 'user_not_found', 'User does not exist in auth.users', p_user_id, 'initialize_new_user', 'USER_NOT_FOUND', jsonb_build_object('step', v_step));
        PERFORM public.complete_function_execution(v_execution_id, false, jsonb_build_object('success', false, 'message', 'User does not exist in auth.users'));
        RETURN jsonb_build_object('success', false, 'message', 'User does not exist in auth.users');
    END IF;

    -- Step 3: Check if profile already exists
    v_step := 'check_existing_profile';
    SELECT EXISTS (SELECT 1 FROM public.profiles WHERE id = p_user_id) INTO v_profile_exists;
    
    IF v_profile_exists THEN
        PERFORM public.log_system_event('WARNING', 'auth', 'profile_already_exists', 'Profile already exists, skipping initialization', p_user_id, 'initialize_new_user', 'PROFILE_EXISTS', jsonb_build_object('step', v_step));
        PERFORM public.complete_function_execution(v_execution_id, true, jsonb_build_object('success', true, 'message', 'Profile already exists'));
        RETURN jsonb_build_object('success', true, 'message', 'Profile already exists');
    END IF;

    -- Step 4: Create profile
    v_step := 'create_profile';
    BEGIN
        INSERT INTO public.profiles (id, user_type, email, onboarding_completed)
        VALUES (p_user_id, v_user_type, p_email, false);
        PERFORM public.log_system_event('INFO', 'auth', 'profile_created', 'Profile created successfully', p_user_id, 'initialize_new_user', NULL, jsonb_build_object('step', v_step, 'user_type', p_user_type));
    EXCEPTION
        WHEN OTHERS THEN
            PERFORM public.log_system_event('ERROR', 'auth', 'profile_creation_failed', 'Failed to create profile', p_user_id, 'initialize_new_user', SQLSTATE, jsonb_build_object('step', v_step, 'error', SQLERRM, 'detail', SQLSTATE));
            PERFORM public.complete_function_execution(v_execution_id, false, jsonb_build_object('success', false, 'message', 'Profile creation failed: ' || SQLERRM));
            RETURN jsonb_build_object('success', false, 'message', 'Profile creation failed: ' || SQLERRM);
    END;

    -- Step 5: Initialize user points (FIX: use 'points' not 'total_points')
    v_step := 'initialize_points';
    BEGIN
        INSERT INTO public.user_points (user_id, points, level)
        VALUES (p_user_id, 0, 1);
        PERFORM public.log_system_event('DEBUG', 'gamification', 'points_initialized', 'User points initialized', p_user_id, 'initialize_new_user', NULL, jsonb_build_object('step', v_step));
    EXCEPTION
        WHEN OTHERS THEN
            PERFORM public.log_system_event('WARNING', 'gamification', 'points_init_failed', 'Failed to initialize points (non-critical)', p_user_id, 'initialize_new_user', SQLSTATE, jsonb_build_object('step', v_step, 'error', SQLERRM));
    END;

    -- Step 6: Create type-specific profile
    v_step := 'create_type_specific_profile';
    BEGIN
        CASE v_user_type
            WHEN 'patient' THEN
                INSERT INTO public.patient_profiles (user_id) VALUES (p_user_id);
                INSERT INTO private_health_info.patient_phi (user_id) VALUES (p_user_id);
            WHEN 'clinician' THEN
                INSERT INTO public.clinician_profiles (user_id) VALUES (p_user_id);
                INSERT INTO private_health_info.clinician_phi (user_id) VALUES (p_user_id);
            WHEN 'carer' THEN
                INSERT INTO public.carer_profiles (user_id) VALUES (p_user_id);
            WHEN 'researcher' THEN
                INSERT INTO public.researcher_profiles (user_id) VALUES (p_user_id);
        END CASE;
        PERFORM public.log_system_event('INFO', 'auth', 'type_profile_created', 'Type-specific profile created', p_user_id, 'initialize_new_user', NULL, jsonb_build_object('step', v_step, 'user_type', p_user_type));
    EXCEPTION
        WHEN OTHERS THEN
            PERFORM public.log_system_event('ERROR', 'auth', 'type_profile_failed', 'Failed to create type-specific profile', p_user_id, 'initialize_new_user', SQLSTATE, jsonb_build_object('step', v_step, 'user_type', p_user_type, 'error', SQLERRM));
            PERFORM public.complete_function_execution(v_execution_id, false, jsonb_build_object('success', false, 'message', 'Type-specific profile failed: ' || SQLERRM));
            RETURN jsonb_build_object('success', false, 'message', 'Type-specific profile creation failed: ' || SQLERRM);
    END;

    -- Step 7: Create data sharing preferences (FIX: use 'patient_id' not 'user_id')
    v_step := 'create_sharing_preferences';
    BEGIN
        IF v_user_type = 'patient' THEN
            INSERT INTO public.data_sharing_preferences (patient_id) VALUES (p_user_id);
        END IF;
        PERFORM public.log_system_event('DEBUG', 'privacy', 'sharing_prefs_created', 'Data sharing preferences created', p_user_id, 'initialize_new_user', NULL, jsonb_build_object('step', v_step));
    EXCEPTION
        WHEN OTHERS THEN
            PERFORM public.log_system_event('WARNING', 'privacy', 'sharing_prefs_failed', 'Failed to create sharing preferences (non-critical)', p_user_id, 'initialize_new_user', SQLSTATE, jsonb_build_object('step', v_step, 'error', SQLERRM));
    END;

    -- Success!
    PERFORM public.log_system_event('INFO', 'auth', 'user_initialization_completed', 'User initialization completed successfully', p_user_id, 'initialize_new_user', NULL, jsonb_build_object('user_type', p_user_type));
    PERFORM public.complete_function_execution(v_execution_id, true, jsonb_build_object('success', true, 'message', 'User initialized successfully', 'user_type', v_user_type));
    RETURN jsonb_build_object('success', true, 'message', 'User initialized successfully', 'user_type', v_user_type);

EXCEPTION
    WHEN OTHERS THEN
        PERFORM public.log_system_event('CRITICAL', 'auth', 'initialization_catastrophic_failure', 'Unexpected error during user initialization', p_user_id, 'initialize_new_user', SQLSTATE, jsonb_build_object('step', v_step, 'error', SQLERRM, 'detail', SQLSTATE));
        PERFORM public.complete_function_execution(v_execution_id, false, jsonb_build_object('success', false, 'message', 'Error: ' || SQLERRM, 'detail', SQLSTATE));
        RETURN jsonb_build_object('success', false, 'message', 'Error: ' || SQLERRM, 'detail', SQLSTATE);
END;
$$;

GRANT EXECUTE ON FUNCTION public.initialize_new_user(UUID, TEXT, TEXT) TO authenticated, anon, service_role;

COMMIT;

-- ============================================================================
-- VERIFICATION
-- ============================================================================
DO $$
BEGIN
    RAISE NOTICE '✅ Fixed initialize_new_user function';
    RAISE NOTICE '  • user_points: total_points → points';
    RAISE NOTICE '  • data_sharing_preferences: user_id → patient_id (patients only)';
    RAISE NOTICE '';
    RAISE NOTICE '🧪 Test by creating a new user via signup!';
END $$;

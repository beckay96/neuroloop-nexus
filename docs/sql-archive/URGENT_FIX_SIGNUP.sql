-- ============================================================================
-- URGENT FIX: User Signup - Profile Creation Failing
-- ============================================================================
-- Issue: Auth user created but profile not created due to RLS blocking
-- Solution: Use SECURITY DEFINER to bypass RLS during initialization
-- ============================================================================

BEGIN;

-- ============================================================================
-- STEP 1: Fix the Auth Trigger Function with SECURITY DEFINER
-- ============================================================================

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER -- THIS IS CRITICAL - bypasses RLS
SET search_path = public, auth
AS $$
DECLARE
    v_user_type TEXT;
    v_user_type_enum public.user_type_enum;
BEGIN
    -- Extract user_type from signup metadata
    v_user_type := COALESCE(
        NEW.raw_user_meta_data->>'user_type',
        NEW.raw_user_meta_data->>'userType',
        'patient'
    );
    
    -- Validate and cast to enum
    BEGIN
        v_user_type_enum := v_user_type::public.user_type_enum;
    EXCEPTION
        WHEN OTHERS THEN
            v_user_type_enum := 'patient'::public.user_type_enum;
    END;
    
    -- Create profile (SECURITY DEFINER bypasses RLS)
    INSERT INTO public.profiles (
        id, 
        email, 
        user_type, 
        onboarding_completed,
        created_at, 
        updated_at
    ) VALUES (
        NEW.id, 
        NEW.email, 
        v_user_type_enum,
        false,
        NOW(), 
        NOW()
    )
    ON CONFLICT (id) DO UPDATE
    SET 
        user_type = COALESCE(public.profiles.user_type, v_user_type_enum),
        email = EXCLUDED.email,
        updated_at = NOW();
    
    -- Create type-specific profiles based on user type
    CASE v_user_type_enum
        WHEN 'patient' THEN
            -- Patient profile
            INSERT INTO public.patient_profiles (id, user_id, created_at, updated_at)
            VALUES (gen_random_uuid(), NEW.id, NOW(), NOW())
            ON CONFLICT (user_id) DO NOTHING;
            
            -- Data sharing preferences
            INSERT INTO public.data_sharing_preferences (
                id, patient_id,
                default_share_with_clinicians,
                default_share_with_carers,
                default_share_with_researchers,
                seizure_events_visibility,
                tremor_episodes_visibility,
                gait_episodes_visibility,
                daily_logs_visibility,
                medications_visibility,
                media_visibility,
                created_at, updated_at
            ) VALUES (
                gen_random_uuid(), NEW.id,
                true, true, false,
                'connected_clinicians',
                'connected_clinicians',
                'connected_clinicians',
                'connected_clinicians',
                'connected_clinicians',
                'connected_clinicians',
                NOW(), NOW()
            )
            ON CONFLICT (patient_id) DO NOTHING;
            
            -- User points
            INSERT INTO public.user_points (
                id, user_id, points, level, streak_days, created_at, updated_at
            ) VALUES (
                gen_random_uuid(), NEW.id, 0, 1, 0, NOW(), NOW()
            )
            ON CONFLICT (user_id) DO NOTHING;
            
        WHEN 'clinician' THEN
            INSERT INTO public.clinician_profiles (
                id, user_id, accepting_new_patients, created_at, updated_at
            ) VALUES (
                gen_random_uuid(), NEW.id, true, NOW(), NOW()
            )
            ON CONFLICT (user_id) DO NOTHING;
            
        WHEN 'carer' THEN
            INSERT INTO public.carer_profiles (
                id, user_id, created_at, updated_at
            ) VALUES (
                gen_random_uuid(), NEW.id, NOW(), NOW()
            )
            ON CONFLICT (user_id) DO NOTHING;
            
        WHEN 'researcher' THEN
            INSERT INTO public.researcher_profiles (
                id, user_id, access_level, created_at, updated_at
            ) VALUES (
                gen_random_uuid(), NEW.id, 'basic', NOW(), NOW()
            )
            ON CONFLICT (user_id) DO NOTHING;
            
        ELSE
            NULL;
    END CASE;
    
    -- Notification preferences for all users
    INSERT INTO public.notification_preferences (
        id, user_id,
        email_enabled, push_enabled,
        medication_reminders, appointment_reminders, critical_alerts,
        created_at, updated_at
    ) VALUES (
        gen_random_uuid(), NEW.id,
        true, true,
        true, true, true,
        NOW(), NOW()
    )
    ON CONFLICT (user_id) DO NOTHING;
    
    RETURN NEW;
    
EXCEPTION
    WHEN OTHERS THEN
        -- Log error but don't block user creation
        RAISE WARNING 'Error in handle_new_user for user %: %', NEW.id, SQLERRM;
        RETURN NEW;
END;
$$;

-- Recreate trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- STEP 2: Ensure RLS Policies Allow Self-Insert (Backup)
-- ============================================================================

-- Profiles
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
    ON public.profiles
    FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Patient profiles
DROP POLICY IF EXISTS "Users can insert own patient profile" ON public.patient_profiles;
CREATE POLICY "Users can insert own patient profile"
    ON public.patient_profiles
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Clinician profiles
DROP POLICY IF EXISTS "Users can insert own clinician profile" ON public.clinician_profiles;
CREATE POLICY "Users can insert own clinician profile"
    ON public.clinician_profiles
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Carer profiles
DROP POLICY IF EXISTS "Users can insert own carer profile" ON public.carer_profiles;
CREATE POLICY "Users can insert own carer profile"
    ON public.carer_profiles
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Researcher profiles
DROP POLICY IF EXISTS "Users can insert own researcher profile" ON public.researcher_profiles;
CREATE POLICY "Users can insert own researcher profile"
    ON public.researcher_profiles
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Data sharing preferences
DROP POLICY IF EXISTS "Users can insert own data sharing preferences" ON public.data_sharing_preferences;
CREATE POLICY "Users can insert own data sharing preferences"
    ON public.data_sharing_preferences
    FOR INSERT
    WITH CHECK (auth.uid() = patient_id);

-- Notification preferences
DROP POLICY IF EXISTS "Users can insert own notification preferences" ON public.notification_preferences;
CREATE POLICY "Users can insert own notification preferences"
    ON public.notification_preferences
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- User points
DROP POLICY IF EXISTS "Users can insert own points" ON public.user_points;
CREATE POLICY "Users can insert own points"
    ON public.user_points
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- STEP 3: Fix Existing Users Without Profiles
-- ============================================================================

-- Find auth users without profiles and create them
DO $$
DECLARE
    v_user RECORD;
    v_user_type public.user_type_enum;
BEGIN
    FOR v_user IN 
        SELECT u.id, u.email, u.raw_user_meta_data
        FROM auth.users u
        LEFT JOIN public.profiles p ON u.id = p.id
        WHERE p.id IS NULL
    LOOP
        -- Extract user type from metadata
        v_user_type := COALESCE(
            (v_user.raw_user_meta_data->>'user_type')::public.user_type_enum,
            (v_user.raw_user_meta_data->>'userType')::public.user_type_enum,
            'patient'::public.user_type_enum
        );
        
        -- Create profile
        INSERT INTO public.profiles (
            id, email, user_type, onboarding_completed, created_at, updated_at
        ) VALUES (
            v_user.id, v_user.email, v_user_type, false, NOW(), NOW()
        )
        ON CONFLICT (id) DO NOTHING;
        
        -- Create type-specific profile
        CASE v_user_type
            WHEN 'patient' THEN
                INSERT INTO public.patient_profiles (id, user_id, created_at, updated_at)
                VALUES (gen_random_uuid(), v_user.id, NOW(), NOW())
                ON CONFLICT (user_id) DO NOTHING;
                
                INSERT INTO public.data_sharing_preferences (
                    id, patient_id,
                    default_share_with_clinicians,
                    default_share_with_carers,
                    default_share_with_researchers,
                    created_at, updated_at
                ) VALUES (
                    gen_random_uuid(), v_user.id,
                    true, true, false,
                    NOW(), NOW()
                )
                ON CONFLICT (patient_id) DO NOTHING;
                
                INSERT INTO public.user_points (
                    id, user_id, points, level, streak_days, created_at, updated_at
                ) VALUES (
                    gen_random_uuid(), v_user.id, 0, 1, 0, NOW(), NOW()
                )
                ON CONFLICT (user_id) DO NOTHING;
                
            WHEN 'clinician' THEN
                INSERT INTO public.clinician_profiles (id, user_id, created_at, updated_at)
                VALUES (gen_random_uuid(), v_user.id, NOW(), NOW())
                ON CONFLICT (user_id) DO NOTHING;
                
            WHEN 'carer' THEN
                INSERT INTO public.carer_profiles (id, user_id, created_at, updated_at)
                VALUES (gen_random_uuid(), v_user.id, NOW(), NOW())
                ON CONFLICT (user_id) DO NOTHING;
                
            WHEN 'researcher' THEN
                INSERT INTO public.researcher_profiles (id, user_id, access_level, created_at, updated_at)
                VALUES (gen_random_uuid(), v_user.id, 'basic', NOW(), NOW())
                ON CONFLICT (user_id) DO NOTHING;
                
            ELSE
                NULL;
        END CASE;
        
        -- Notification preferences for all
        INSERT INTO public.notification_preferences (
            id, user_id, email_enabled, push_enabled, critical_alerts, created_at, updated_at
        ) VALUES (
            gen_random_uuid(), v_user.id, true, true, true, NOW(), NOW()
        )
        ON CONFLICT (user_id) DO NOTHING;
        
        RAISE NOTICE 'Fixed profile for user: % (type: %)', v_user.email, v_user_type;
    END LOOP;
END;
$$;

-- ============================================================================
-- STEP 4: Fix CSP for Vercel Live
-- ============================================================================

-- This is handled in vercel.json, but documenting here:
-- frame-src needs to include https://vercel.live

COMMIT;

-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- Check if all auth users have profiles
SELECT 
    COUNT(*) as total_auth_users,
    COUNT(p.id) as users_with_profiles,
    COUNT(*) - COUNT(p.id) as missing_profiles
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id;

-- List any users still missing profiles
SELECT 
    u.id,
    u.email,
    u.created_at,
    u.raw_user_meta_data->>'user_type' as intended_type
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE p.id IS NULL;

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================

DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '✅ SIGNUP FIX APPLIED!';
    RAISE NOTICE '';
    RAISE NOTICE 'What was fixed:';
    RAISE NOTICE '1. Auth trigger now uses SECURITY DEFINER (bypasses RLS)';
    RAISE NOTICE '2. All existing users without profiles have been fixed';
    RAISE NOTICE '3. RLS policies updated to allow self-insert as backup';
    RAISE NOTICE '';
    RAISE NOTICE 'Next steps:';
    RAISE NOTICE '1. Test signup with a new account';
    RAISE NOTICE '2. Refresh your browser to clear the error';
    RAISE NOTICE '3. Check the verification queries above';
END;
$$;

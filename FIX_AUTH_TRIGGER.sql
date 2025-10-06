-- ============================================================================
-- FIX: Auth trigger that conflicts with initialize_new_user
-- ============================================================================
-- Problem: handle_new_user() creates profiles with NULL user_type
-- Solution: Make the trigger call initialize_new_user properly
-- ============================================================================

BEGIN;

-- Replace the conflicting trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, private_health_info
AS $$
DECLARE
    v_user_type TEXT;
    v_result JSONB;
BEGIN
    -- Extract user_type from metadata (set during signup)
    v_user_type := COALESCE(NEW.raw_user_meta_data->>'user_type', 'patient');
    
    -- Call initialize_new_user with the metadata
    v_result := public.initialize_new_user(
        NEW.id,
        NEW.email,
        v_user_type
    );
    
    -- Log if initialization failed
    IF NOT (v_result->>'success')::BOOLEAN THEN
        PERFORM public.log_system_event(
            'ERROR',
            'auth',
            'trigger_initialization_failed',
            'Trigger failed to initialize user: ' || (v_result->>'message'),
            NEW.id,
            'handle_new_user',
            NULL,
            jsonb_build_object('user_type', v_user_type, 'result', v_result)
        );
    END IF;
    
    RETURN NEW;
END;
$$;

COMMIT;

-- ============================================================================
-- VERIFICATION
-- ============================================================================
DO $$
BEGIN
    RAISE NOTICE '✅ Fixed handle_new_user() trigger function';
    RAISE NOTICE '  • Now calls initialize_new_user properly';
    RAISE NOTICE '  • Extracts user_type from signup metadata';
    RAISE NOTICE '  • Logs initialization failures';
    RAISE NOTICE '';
    RAISE NOTICE '🧪 Try signup again - it should work now!';
END $$;

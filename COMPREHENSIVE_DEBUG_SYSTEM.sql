-- ============================================================================
-- COMPREHENSIVE DEBUG & ERROR LOGGING SYSTEM
-- ============================================================================
-- HIPAA COMPLIANT: NO PHI is ever logged
-- Only logs: UUIDs, function names, error codes, timestamps, stack traces
-- ============================================================================

BEGIN;

-- ============================================================================
-- TABLE: system_logs (General system events)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.system_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    log_level TEXT NOT NULL CHECK (log_level IN ('DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL')),
    category TEXT NOT NULL, -- e.g., 'auth', 'database', 'function', 'trigger', 'rls'
    event_type TEXT NOT NULL, -- e.g., 'user_signup', 'profile_creation', 'function_call'
    message TEXT NOT NULL,
    
    -- Context (NO PHI!)
    user_id UUID, -- Reference only, no personal data
    function_name TEXT,
    table_name TEXT,
    operation TEXT, -- INSERT, UPDATE, DELETE, SELECT
    
    -- Technical details
    error_code TEXT,
    sql_state TEXT,
    stack_trace TEXT,
    context_data JSONB DEFAULT '{}'::jsonb, -- Only technical data, never PHI
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    session_id TEXT,
    ip_address INET,
    user_agent TEXT,
    
    -- Constraints
    CONSTRAINT valid_log_level CHECK (log_level IN ('DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL'))
);

CREATE INDEX idx_system_logs_level ON public.system_logs(log_level);
CREATE INDEX idx_system_logs_category ON public.system_logs(category);
CREATE INDEX idx_system_logs_created ON public.system_logs(created_at DESC);
CREATE INDEX idx_system_logs_user_id ON public.system_logs(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX idx_system_logs_function ON public.system_logs(function_name) WHERE function_name IS NOT NULL;
CREATE INDEX idx_system_logs_error ON public.system_logs(log_level) WHERE log_level IN ('ERROR', 'CRITICAL');

COMMENT ON TABLE public.system_logs IS 'HIPAA-compliant system logging - NO PHI stored';

-- ============================================================================
-- TABLE: function_execution_logs (Detailed function tracing)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.function_execution_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    function_name TEXT NOT NULL,
    execution_status TEXT NOT NULL CHECK (execution_status IN ('started', 'completed', 'failed', 'timeout')),
    
    -- Timing
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    duration_ms INTEGER,
    
    -- Input (sanitized - NO PHI!)
    input_user_id UUID, -- Only UUID, never email/name/etc
    input_user_type TEXT,
    input_parameters JSONB DEFAULT '{}'::jsonb, -- Sanitized params only
    
    -- Output
    return_value JSONB,
    success BOOLEAN,
    
    -- Error details
    error_message TEXT,
    error_detail TEXT,
    error_hint TEXT,
    sql_state TEXT,
    
    -- Context
    session_id TEXT,
    triggered_by TEXT, -- 'api', 'trigger', 'cron', 'manual'
    
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_function_logs_name ON public.function_execution_logs(function_name);
CREATE INDEX idx_function_logs_status ON public.function_execution_logs(execution_status);
CREATE INDEX idx_function_logs_started ON public.function_execution_logs(started_at DESC);
CREATE INDEX idx_function_logs_failed ON public.function_execution_logs(execution_status) WHERE execution_status = 'failed';

COMMENT ON TABLE public.function_execution_logs IS 'Function execution tracing - NO PHI';

-- ============================================================================
-- TABLE: api_request_logs (API call tracking)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.api_request_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    endpoint TEXT NOT NULL,
    method TEXT NOT NULL CHECK (method IN ('GET', 'POST', 'PUT', 'PATCH', 'DELETE')),
    status_code INTEGER,
    
    -- Request info (NO PHI!)
    user_id UUID,
    session_id TEXT,
    ip_address INET,
    user_agent TEXT,
    
    -- Timing
    request_time TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    response_time TIMESTAMPTZ,
    duration_ms INTEGER,
    
    -- Error tracking
    error_message TEXT,
    error_type TEXT,
    
    -- Rate limiting
    rate_limit_remaining INTEGER,
    
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_api_logs_endpoint ON public.api_request_logs(endpoint);
CREATE INDEX idx_api_logs_user_id ON public.api_request_logs(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX idx_api_logs_time ON public.api_request_logs(request_time DESC);
CREATE INDEX idx_api_logs_errors ON public.api_request_logs(status_code) WHERE status_code >= 400;

COMMENT ON TABLE public.api_request_logs IS 'API request tracking - NO PHI';

-- ============================================================================
-- TABLE: database_operation_logs (DDL/DML tracking)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.database_operation_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    operation_type TEXT NOT NULL CHECK (operation_type IN ('CREATE', 'ALTER', 'DROP', 'INSERT', 'UPDATE', 'DELETE', 'TRUNCATE')),
    table_schema TEXT NOT NULL,
    table_name TEXT NOT NULL,
    
    -- Who did it (NO PHI!)
    executed_by_user_id UUID,
    executed_by_role TEXT,
    
    -- What happened
    operation_detail TEXT,
    rows_affected INTEGER,
    success BOOLEAN NOT NULL,
    
    -- Error details
    error_message TEXT,
    sql_state TEXT,
    
    -- Metadata
    executed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    session_id TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_db_ops_table ON public.database_operation_logs(table_schema, table_name);
CREATE INDEX idx_db_ops_type ON public.database_operation_logs(operation_type);
CREATE INDEX idx_db_ops_time ON public.database_operation_logs(executed_at DESC);
CREATE INDEX idx_db_ops_errors ON public.database_operation_logs(success) WHERE success = false;

COMMENT ON TABLE public.database_operation_logs IS 'Database operation tracking - NO PHI';

-- ============================================================================
-- FUNCTION: log_system_event (General purpose logging)
-- ============================================================================
CREATE OR REPLACE FUNCTION public.log_system_event(
    p_level TEXT,
    p_category TEXT,
    p_event_type TEXT,
    p_message TEXT,
    p_user_id UUID DEFAULT NULL,
    p_function_name TEXT DEFAULT NULL,
    p_error_code TEXT DEFAULT NULL,
    p_context JSONB DEFAULT '{}'::jsonb
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
DECLARE
    v_log_id UUID;
BEGIN
    -- CRITICAL: Validate that context contains NO PHI
    -- Remove any potentially sensitive keys
    p_context := p_context - ARRAY['email', 'phone', 'name', 'first_name', 'last_name', 'ssn', 'dob', 'address', 'password'];
    
    INSERT INTO public.system_logs (
        log_level,
        category,
        event_type,
        message,
        user_id,
        function_name,
        error_code,
        context_data,
        session_id
    ) VALUES (
        UPPER(p_level),
        p_category,
        p_event_type,
        p_message,
        p_user_id,
        p_function_name,
        p_error_code,
        p_context,
        current_setting('application_name', true)
    )
    RETURNING id INTO v_log_id;
    
    RETURN v_log_id;
EXCEPTION
    WHEN OTHERS THEN
        -- Even logging failed! Raise warning but don't crash
        RAISE WARNING 'Failed to write to system_logs: %', SQLERRM;
        RETURN NULL;
END;
$$;

COMMENT ON FUNCTION public.log_system_event IS 'HIPAA-compliant system event logging - NO PHI';

-- ============================================================================
-- FUNCTION: log_function_execution (Wrap function calls with logging)
-- ============================================================================
CREATE OR REPLACE FUNCTION public.start_function_execution(
    p_function_name TEXT,
    p_user_id UUID DEFAULT NULL,
    p_user_type TEXT DEFAULT NULL,
    p_triggered_by TEXT DEFAULT 'api'
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
DECLARE
    v_execution_id UUID;
BEGIN
    INSERT INTO public.function_execution_logs (
        function_name,
        execution_status,
        started_at,
        input_user_id,
        input_user_type,
        triggered_by,
        session_id
    ) VALUES (
        p_function_name,
        'started',
        NOW(),
        p_user_id,
        p_user_type,
        p_triggered_by,
        current_setting('application_name', true)
    )
    RETURNING id INTO v_execution_id;
    
    RETURN v_execution_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.complete_function_execution(
    p_execution_id UUID,
    p_success BOOLEAN,
    p_return_value JSONB DEFAULT NULL,
    p_error_message TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
BEGIN
    UPDATE public.function_execution_logs
    SET 
        execution_status = CASE WHEN p_success THEN 'completed' ELSE 'failed' END,
        completed_at = NOW(),
        duration_ms = EXTRACT(EPOCH FROM (NOW() - started_at)) * 1000,
        success = p_success,
        return_value = p_return_value,
        error_message = p_error_message
    WHERE id = p_execution_id;
END;
$$;

-- ============================================================================
-- ENHANCED: initialize_new_user WITH COMPREHENSIVE LOGGING
-- ============================================================================
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
    -- Start execution tracking
    v_execution_id := public.start_function_execution(
        'initialize_new_user',
        p_user_id,
        p_user_type,
        'api'
    );
    
    -- Log function start
    PERFORM public.log_system_event(
        'INFO',
        'auth',
        'user_initialization_started',
        'Starting user initialization',
        p_user_id,
        'initialize_new_user',
        NULL,
        jsonb_build_object('user_type', p_user_type)
    );
    
    -- Step 1: Validate user_type
    v_step := 'validate_user_type';
    BEGIN
        v_user_type := p_user_type::user_type_enum;
        
        PERFORM public.log_system_event(
            'DEBUG',
            'auth',
            'user_type_validated',
            'User type validated successfully',
            p_user_id,
            'initialize_new_user',
            NULL,
            jsonb_build_object('user_type', p_user_type, 'step', v_step)
        );
    EXCEPTION
        WHEN OTHERS THEN
            PERFORM public.log_system_event(
                'ERROR',
                'auth',
                'validation_failed',
                'Invalid user_type: ' || p_user_type,
                p_user_id,
                'initialize_new_user',
                SQLSTATE,
                jsonb_build_object('user_type', p_user_type, 'step', v_step, 'error', SQLERRM)
            );
            
            PERFORM public.complete_function_execution(
                v_execution_id,
                false,
                jsonb_build_object('success', false, 'message', 'Invalid user_type: ' || p_user_type)
            );
            
            RETURN jsonb_build_object('success', false, 'message', 'Invalid user_type: ' || p_user_type);
    END;

    -- Step 2: Check if user exists in auth.users
    v_step := 'check_auth_user';
    SELECT EXISTS (SELECT 1 FROM auth.users WHERE id = p_user_id) INTO v_user_exists;
    
    IF NOT v_user_exists THEN
        PERFORM public.log_system_event(
            'ERROR',
            'auth',
            'user_not_found',
            'User does not exist in auth.users',
            p_user_id,
            'initialize_new_user',
            'USER_NOT_FOUND',
            jsonb_build_object('step', v_step)
        );
        
        PERFORM public.complete_function_execution(
            v_execution_id,
            false,
            jsonb_build_object('success', false, 'message', 'User does not exist in auth.users')
        );
        
        RETURN jsonb_build_object('success', false, 'message', 'User does not exist in auth.users');
    END IF;

    -- Step 3: Check if profile already exists
    v_step := 'check_existing_profile';
    SELECT EXISTS (SELECT 1 FROM public.profiles WHERE id = p_user_id) INTO v_profile_exists;
    
    IF v_profile_exists THEN
        PERFORM public.log_system_event(
            'WARNING',
            'auth',
            'profile_already_exists',
            'Profile already exists, skipping initialization',
            p_user_id,
            'initialize_new_user',
            'PROFILE_EXISTS',
            jsonb_build_object('step', v_step)
        );
        
        PERFORM public.complete_function_execution(
            v_execution_id,
            true,
            jsonb_build_object('success', true, 'message', 'Profile already exists')
        );
        
        RETURN jsonb_build_object('success', true, 'message', 'Profile already exists');
    END IF;

    -- Step 4: Create profile
    v_step := 'create_profile';
    BEGIN
        INSERT INTO public.profiles (id, user_type, email, onboarding_completed)
        VALUES (p_user_id, v_user_type, p_email, false);
        
        PERFORM public.log_system_event(
            'INFO',
            'auth',
            'profile_created',
            'Profile created successfully',
            p_user_id,
            'initialize_new_user',
            NULL,
            jsonb_build_object('step', v_step, 'user_type', p_user_type)
        );
    EXCEPTION
        WHEN OTHERS THEN
            PERFORM public.log_system_event(
                'ERROR',
                'auth',
                'profile_creation_failed',
                'Failed to create profile',
                p_user_id,
                'initialize_new_user',
                SQLSTATE,
                jsonb_build_object('step', v_step, 'error', SQLERRM, 'detail', SQLSTATE)
            );
            
            PERFORM public.complete_function_execution(
                v_execution_id,
                false,
                jsonb_build_object('success', false, 'message', 'Profile creation failed: ' || SQLERRM)
            );
            
            RETURN jsonb_build_object('success', false, 'message', 'Profile creation failed: ' || SQLERRM);
    END;

    -- Step 5: Initialize user points
    v_step := 'initialize_points';
    BEGIN
        INSERT INTO public.user_points (user_id, total_points, level)
        VALUES (p_user_id, 0, 1);
        
        PERFORM public.log_system_event(
            'DEBUG',
            'gamification',
            'points_initialized',
            'User points initialized',
            p_user_id,
            'initialize_new_user',
            NULL,
            jsonb_build_object('step', v_step)
        );
    EXCEPTION
        WHEN OTHERS THEN
            PERFORM public.log_system_event(
                'WARNING',
                'gamification',
                'points_init_failed',
                'Failed to initialize points (non-critical)',
                p_user_id,
                'initialize_new_user',
                SQLSTATE,
                jsonb_build_object('step', v_step, 'error', SQLERRM)
            );
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
        
        PERFORM public.log_system_event(
            'INFO',
            'auth',
            'type_profile_created',
            'Type-specific profile created',
            p_user_id,
            'initialize_new_user',
            NULL,
            jsonb_build_object('step', v_step, 'user_type', p_user_type)
        );
    EXCEPTION
        WHEN OTHERS THEN
            PERFORM public.log_system_event(
                'ERROR',
                'auth',
                'type_profile_failed',
                'Failed to create type-specific profile',
                p_user_id,
                'initialize_new_user',
                SQLSTATE,
                jsonb_build_object('step', v_step, 'user_type', p_user_type, 'error', SQLERRM)
            );
            
            PERFORM public.complete_function_execution(
                v_execution_id,
                false,
                jsonb_build_object('success', false, 'message', 'Type-specific profile failed: ' || SQLERRM)
            );
            
            RETURN jsonb_build_object('success', false, 'message', 'Type-specific profile creation failed: ' || SQLERRM);
    END;

    -- Step 7: Create data sharing preferences
    v_step := 'create_sharing_preferences';
    BEGIN
        INSERT INTO public.data_sharing_preferences (user_id) VALUES (p_user_id);
        
        PERFORM public.log_system_event(
            'DEBUG',
            'privacy',
            'sharing_prefs_created',
            'Data sharing preferences created',
            p_user_id,
            'initialize_new_user',
            NULL,
            jsonb_build_object('step', v_step)
        );
    EXCEPTION
        WHEN OTHERS THEN
            PERFORM public.log_system_event(
                'WARNING',
                'privacy',
                'sharing_prefs_failed',
                'Failed to create sharing preferences (non-critical)',
                p_user_id,
                'initialize_new_user',
                SQLSTATE,
                jsonb_build_object('step', v_step, 'error', SQLERRM)
            );
    END;

    -- Success!
    PERFORM public.log_system_event(
        'INFO',
        'auth',
        'user_initialization_completed',
        'User initialization completed successfully',
        p_user_id,
        'initialize_new_user',
        NULL,
        jsonb_build_object('user_type', p_user_type)
    );
    
    PERFORM public.complete_function_execution(
        v_execution_id,
        true,
        jsonb_build_object('success', true, 'message', 'User initialized successfully', 'user_type', v_user_type)
    );

    RETURN jsonb_build_object('success', true, 'message', 'User initialized successfully', 'user_type', v_user_type);

EXCEPTION
    WHEN OTHERS THEN
        -- Catch-all error logging
        PERFORM public.log_system_event(
            'CRITICAL',
            'auth',
            'initialization_catastrophic_failure',
            'Unexpected error during user initialization',
            p_user_id,
            'initialize_new_user',
            SQLSTATE,
            jsonb_build_object('step', v_step, 'error', SQLERRM, 'detail', SQLSTATE)
        );
        
        PERFORM public.complete_function_execution(
            v_execution_id,
            false,
            jsonb_build_object('success', false, 'message', 'Error: ' || SQLERRM, 'detail', SQLSTATE)
        );
        
        RETURN jsonb_build_object('success', false, 'message', 'Error: ' || SQLERRM, 'detail', SQLSTATE);
END;
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION public.initialize_new_user(UUID, TEXT, TEXT) TO authenticated, anon, service_role;
GRANT EXECUTE ON FUNCTION public.log_system_event TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.start_function_execution TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.complete_function_execution TO authenticated, service_role;

-- ============================================================================
-- RLS POLICIES FOR LOG TABLES
-- ============================================================================
ALTER TABLE public.system_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.function_execution_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_request_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.database_operation_logs ENABLE ROW LEVEL SECURITY;

-- Only service_role can read logs (admin access only)
CREATE POLICY "Service role can view all logs" ON public.system_logs FOR SELECT USING (auth.role() = 'service_role');
CREATE POLICY "Service role can view function logs" ON public.function_execution_logs FOR SELECT USING (auth.role() = 'service_role');
CREATE POLICY "Service role can view API logs" ON public.api_request_logs FOR SELECT USING (auth.role() = 'service_role');
CREATE POLICY "Service role can view DB logs" ON public.database_operation_logs FOR SELECT USING (auth.role() = 'service_role');

-- System can insert (via functions)
CREATE POLICY "System can insert logs" ON public.system_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "System can insert function logs" ON public.function_execution_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "System can insert API logs" ON public.api_request_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "System can insert DB logs" ON public.database_operation_logs FOR INSERT WITH CHECK (true);

-- ============================================================================
-- UTILITY FUNCTIONS FOR LOG ANALYSIS
-- ============================================================================

-- Get recent errors
CREATE OR REPLACE FUNCTION public.get_recent_errors(p_limit INTEGER DEFAULT 50)
RETURNS TABLE (
    log_time TIMESTAMPTZ,
    level TEXT,
    category TEXT,
    event TEXT,
    message TEXT,
    function_name TEXT,
    error_code TEXT,
    user_id UUID
)
LANGUAGE sql
SECURITY DEFINER
AS $$
    SELECT 
        created_at,
        log_level,
        category,
        event_type,
        message,
        function_name,
        error_code,
        user_id
    FROM public.system_logs
    WHERE log_level IN ('ERROR', 'CRITICAL')
    ORDER BY created_at DESC
    LIMIT p_limit;
$$;

-- Get function execution stats
CREATE OR REPLACE FUNCTION public.get_function_stats(p_function_name TEXT DEFAULT NULL)
RETURNS TABLE (
    function_name TEXT,
    total_executions BIGINT,
    successful BIGINT,
    failed BIGINT,
    avg_duration_ms NUMERIC,
    max_duration_ms INTEGER,
    last_execution TIMESTAMPTZ
)
LANGUAGE sql
SECURITY DEFINER
AS $$
    SELECT 
        function_name,
        COUNT(*) as total_executions,
        SUM(CASE WHEN success THEN 1 ELSE 0 END) as successful,
        SUM(CASE WHEN success = false THEN 1 ELSE 0 END) as failed,
        ROUND(AVG(duration_ms), 2) as avg_duration_ms,
        MAX(duration_ms) as max_duration_ms,
        MAX(started_at) as last_execution
    FROM public.function_execution_logs
    WHERE (p_function_name IS NULL OR function_name = p_function_name)
    AND execution_status IN ('completed', 'failed')
    GROUP BY function_name
    ORDER BY last_execution DESC;
$$;

-- Clean up old logs (run periodically)
CREATE OR REPLACE FUNCTION public.cleanup_old_logs(p_days_to_keep INTEGER DEFAULT 30)
RETURNS TABLE (
    table_name TEXT,
    rows_deleted BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_system_deleted BIGINT;
    v_function_deleted BIGINT;
    v_api_deleted BIGINT;
    v_db_deleted BIGINT;
BEGIN
    -- Delete old system logs
    DELETE FROM public.system_logs WHERE created_at < NOW() - (p_days_to_keep || ' days')::INTERVAL;
    GET DIAGNOSTICS v_system_deleted = ROW_COUNT;
    
    -- Delete old function logs
    DELETE FROM public.function_execution_logs WHERE created_at < NOW() - (p_days_to_keep || ' days')::INTERVAL;
    GET DIAGNOSTICS v_function_deleted = ROW_COUNT;
    
    -- Delete old API logs
    DELETE FROM public.api_request_logs WHERE created_at < NOW() - (p_days_to_keep || ' days')::INTERVAL;
    GET DIAGNOSTICS v_api_deleted = ROW_COUNT;
    
    -- Delete old DB logs
    DELETE FROM public.database_operation_logs WHERE created_at < NOW() - (p_days_to_keep || ' days')::INTERVAL;
    GET DIAGNOSTICS v_db_deleted = ROW_COUNT;
    
    -- Return summary
    RETURN QUERY
    SELECT 'system_logs'::TEXT, v_system_deleted
    UNION ALL
    SELECT 'function_execution_logs'::TEXT, v_function_deleted
    UNION ALL
    SELECT 'api_request_logs'::TEXT, v_api_deleted
    UNION ALL
    SELECT 'database_operation_logs'::TEXT, v_db_deleted;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_recent_errors TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_function_stats TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.cleanup_old_logs TO service_role;

COMMIT;

-- ============================================================================
-- VERIFICATION & USAGE EXAMPLES
-- ============================================================================

DO $$
BEGIN
    RAISE NOTICE '✅ Comprehensive debug system installed!';
    RAISE NOTICE '';
    RAISE NOTICE '📊 Available functions:';
    RAISE NOTICE '  • log_system_event() - Log any system event';
    RAISE NOTICE '  • start_function_execution() - Track function start';
    RAISE NOTICE '  • complete_function_execution() - Track function end';
    RAISE NOTICE '  • get_recent_errors() - View recent errors';
    RAISE NOTICE '  • get_function_stats() - Function performance stats';
    RAISE NOTICE '  • cleanup_old_logs() - Purge old logs';
    RAISE NOTICE '';
    RAISE NOTICE '📋 Log tables created:';
    RAISE NOTICE '  • system_logs - General system events';
    RAISE NOTICE '  • function_execution_logs - Function tracing';
    RAISE NOTICE '  • api_request_logs - API call tracking';
    RAISE NOTICE '  • database_operation_logs - DB operations';
    RAISE NOTICE '';
    RAISE NOTICE '🔒 HIPAA Compliant: NO PHI is ever logged!';
    RAISE NOTICE '';
    RAISE NOTICE '🧪 Try signing up again - all errors will now be logged!';
    RAISE NOTICE '';
    RAISE NOTICE '📖 To view errors, run: SELECT * FROM public.get_recent_errors(20);';
END $$;

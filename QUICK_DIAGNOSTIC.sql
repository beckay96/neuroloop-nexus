-- ============================================================================
-- QUICK DIAGNOSTIC: Why are logs empty?
-- ============================================================================

-- 1. Check if ANY logs exist at all
SELECT 'system_logs' as table_name, COUNT(*) as row_count FROM public.system_logs
UNION ALL
SELECT 'function_execution_logs', COUNT(*) FROM public.function_execution_logs
UNION ALL
SELECT 'api_request_logs', COUNT(*) FROM public.api_request_logs
UNION ALL
SELECT 'database_operation_logs', COUNT(*) FROM public.database_operation_logs;

-- 2. Check if enhanced function is actually deployed (should contain 'log_system_event')
SELECT 
    routine_name,
    CASE 
        WHEN routine_definition LIKE '%log_system_event%' THEN '✅ Enhanced (with logging)'
        ELSE '❌ Old version (no logging)'
    END as version_status,
    data_type as return_type
FROM information_schema.routines
WHERE routine_name = 'initialize_new_user'
AND routine_schema = 'public';

-- 3. Test if logging functions work
SELECT public.log_system_event(
    'INFO',
    'test',
    'diagnostic_test',
    'Testing if logging works',
    NULL,
    'test_function',
    NULL,
    '{}'::jsonb
) as test_log_id;

-- 4. Check if test log was created
SELECT * FROM public.system_logs WHERE category = 'test' ORDER BY created_at DESC LIMIT 1;

-- 5. Check recent function executions (if any)
SELECT 
    function_name,
    execution_status,
    started_at,
    success,
    error_message
FROM public.function_execution_logs
ORDER BY started_at DESC
LIMIT 5;

-- 6. Check if the function is being called at ALL during signup
-- Look at auth.users table to see if users are being created
SELECT 
    id,
    email,
    created_at,
    confirmed_at,
    last_sign_in_at
FROM auth.users
ORDER BY created_at DESC
LIMIT 3;

-- 7. If users ARE being created but profiles aren't, check profiles
SELECT 
    u.id as user_id,
    u.email,
    u.created_at as user_created,
    p.id as profile_id,
    p.user_type,
    p.created_at as profile_created
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
ORDER BY u.created_at DESC
LIMIT 5;

-- Show the exact policies on these 4 tables
SELECT 
    schemaname,
    tablename,
    policyname,
    cmd,
    qual as using_clause,
    with_check,
    CASE 
        WHEN with_check IS NULL THEN '❌ NULL'
        WHEN with_check = 'true' THEN '❌ TRUE (allows anything)'
        ELSE '✅ ' || left(with_check, 100)
    END as check_status
FROM pg_policies
WHERE schemaname = 'private_health_info'
AND tablename IN ('clinician_phi', 'patient_phi', 'tracking_entries', 'user_conditions')
AND cmd = 'INSERT'
ORDER BY tablename, policyname;

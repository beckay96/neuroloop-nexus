-- Get the exact policy names that are failing the audit
-- This will show us what needs to be fixed

-- Missing WITH CHECK policies
SELECT 
    '🔴 MISSING WITH CHECK' as issue,
    schemaname,
    tablename,
    policyname,
    cmd,
    qual,
    with_check,
    'DROP POLICY IF EXISTS "' || policyname || '" ON ' || schemaname || '.' || tablename || ';' as drop_statement
FROM pg_policies
WHERE schemaname IN ('private_health_info', 'clinical')
AND cmd IN ('INSERT', 'ALL')
AND (with_check IS NULL OR with_check = 'true')
AND policyname NOT LIKE '%System%'
AND policyname NOT LIKE '%Service%'
AND policyname NOT LIKE '%Admins%'
ORDER BY schemaname, tablename, policyname;

-- Missing relationship checks
SELECT 
    '🔴 MISSING RELATIONSHIP CHECK' as issue,
    schemaname,
    tablename,
    policyname,
    qual
FROM pg_policies
WHERE schemaname IN ('private_health_info', 'clinical')
AND policyname ILIKE '%clinician%'
AND policyname NOT LIKE '%own%'
AND cmd = 'SELECT'
AND qual NOT LIKE '%patient_clinician_connections%'
AND qual NOT LIKE '%can_clinician_see%'
ORDER BY schemaname, tablename, policyname;

-- Wrong column references
SELECT 
    '🔴 WRONG COLUMN' as issue,
    schemaname,
    tablename,
    policyname,
    CASE 
        WHEN tablename IN ('daily_symptom_logs', 'seizure_events', 'tremor_episodes', 'gait_episodes', 'clinical_media')
             AND (qual LIKE '%user_id%' OR with_check LIKE '%user_id%')
        THEN 'Uses user_id but should use patient_id'
        WHEN tablename IN ('user_conditions', 'user_medications', 'patient_phi', 'clinician_phi', 'medication_logs')
             AND (qual LIKE '%patient_id%' OR with_check LIKE '%patient_id%')
        THEN 'Uses patient_id but should use user_id'
        ELSE 'Unknown issue'
    END as problem,
    qual,
    with_check
FROM pg_policies
WHERE schemaname IN ('private_health_info', 'clinical')
AND (
    (tablename IN ('daily_symptom_logs', 'seizure_events', 'tremor_episodes', 'gait_episodes', 'clinical_media')
     AND (qual LIKE '%user_id%' OR with_check LIKE '%user_id%'))
    OR
    (tablename IN ('user_conditions', 'user_medications', 'patient_phi', 'clinician_phi', 'medication_logs')
     AND (qual LIKE '%patient_id%' OR with_check LIKE '%patient_id%'))
)
ORDER BY schemaname, tablename, policyname;

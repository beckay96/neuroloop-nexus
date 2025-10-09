-- =====================================================
-- DIAGNOSE RLS POLICY ERROR
-- =====================================================

-- Step 1: Check if table exists and its columns
DO $$
BEGIN
  RAISE NOTICE '=== CHECKING TABLE STRUCTURE ===';
END $$;

SELECT 
  column_name,
  data_type,
  ordinal_position
FROM information_schema.columns
WHERE table_schema = 'private_health_info'
AND table_name = 'patient_diagnoses'
ORDER BY ordinal_position;

-- Step 2: Check existing RLS policies
DO $$
BEGIN
  RAISE NOTICE '=== EXISTING RLS POLICIES ===';
END $$;

SELECT 
  policyname,
  cmd,
  qual::text as using_clause,
  with_check::text as with_check_clause
FROM pg_policies
WHERE schemaname = 'private_health_info'
AND tablename = 'patient_diagnoses';

-- Step 3: Try to create ONE policy to see exact error
DO $$
BEGIN
  RAISE NOTICE '=== TESTING POLICY CREATION ===';
  
  -- Drop if exists
  EXECUTE 'DROP POLICY IF EXISTS "test_policy" ON private_health_info.patient_diagnoses';
  
  -- Try with patient_id
  BEGIN
    EXECUTE 'CREATE POLICY "test_policy" ON private_health_info.patient_diagnoses
             FOR SELECT USING (patient_id = (select auth.uid()))';
    RAISE NOTICE '✅ SUCCESS: patient_id works!';
    EXECUTE 'DROP POLICY "test_policy" ON private_health_info.patient_diagnoses';
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '❌ FAILED with patient_id: %', SQLERRM;
  END;
  
  -- Try with user_id
  BEGIN
    EXECUTE 'CREATE POLICY "test_policy" ON private_health_info.patient_diagnoses
             FOR SELECT USING (user_id = (select auth.uid()))';
    RAISE NOTICE '✅ SUCCESS: user_id works!';
    EXECUTE 'DROP POLICY "test_policy" ON private_health_info.patient_diagnoses';
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '❌ FAILED with user_id: %', SQLERRM;
  END;
  
  -- Try with id
  BEGIN
    EXECUTE 'CREATE POLICY "test_policy" ON private_health_info.patient_diagnoses
             FOR SELECT USING (id = (select auth.uid()))';
    RAISE NOTICE '✅ SUCCESS: id works!';
    EXECUTE 'DROP POLICY "test_policy" ON private_health_info.patient_diagnoses';
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '❌ FAILED with id: %', SQLERRM;
  END;
  
  -- Try with diagnosis_id
  BEGIN
    EXECUTE 'CREATE POLICY "test_policy" ON private_health_info.patient_diagnoses
             FOR SELECT USING (diagnosis_id = (select auth.uid()))';
    RAISE NOTICE '✅ SUCCESS: diagnosis_id works!';
    EXECUTE 'DROP POLICY "test_policy" ON private_health_info.patient_diagnoses';
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '❌ FAILED with diagnosis_id: %', SQLERRM;
  END;
  
END $$;

-- Step 4: Show table definition
DO $$
BEGIN
  RAISE NOTICE '=== TABLE DEFINITION ===';
END $$;

SELECT 
  a.attname AS column_name,
  format_type(a.atttypid, a.atttypmod) AS data_type,
  a.attnum AS position
FROM pg_attribute a
JOIN pg_class c ON a.attrelid = c.oid
JOIN pg_namespace n ON c.relnamespace = n.oid
WHERE n.nspname = 'private_health_info'
AND c.relname = 'patient_diagnoses'
AND a.attnum > 0
AND NOT a.attisdropped
ORDER BY a.attnum;

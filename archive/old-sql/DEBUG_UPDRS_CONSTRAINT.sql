-- =====================================================
-- DEBUG: UPDRS Scale Constraint Issue
-- =====================================================
-- Test Error: "check constraint clinical_scale_results_scale_type_check"
-- This script investigates and fixes the issue
-- =====================================================

-- =====================================================
-- STEP 1: Check if table exists and its structure
-- =====================================================

DO $$
BEGIN
  RAISE NOTICE '=== CHECKING TABLE STRUCTURE ===';
END $$;

SELECT 
  table_schema,
  table_name,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'clinical'
AND table_name = 'clinical_scale_results'
ORDER BY ordinal_position;

-- =====================================================
-- STEP 2: Check all constraints on the table
-- =====================================================

DO $$
BEGIN
  RAISE NOTICE '=== CHECKING CONSTRAINTS ===';
END $$;

SELECT 
  conname AS constraint_name,
  contype AS constraint_type,
  pg_get_constraintdef(oid) AS constraint_definition
FROM pg_constraint
WHERE conrelid = 'clinical.clinical_scale_results'::regclass
ORDER BY conname;

-- =====================================================
-- STEP 3: Check if scale_type_enum exists
-- =====================================================

DO $$
BEGIN
  RAISE NOTICE '=== CHECKING ENUM TYPE ===';
END $$;

SELECT 
  n.nspname AS schema_name,
  t.typname AS enum_name,
  e.enumlabel AS enum_value,
  e.enumsortorder AS sort_order
FROM pg_type t
JOIN pg_enum e ON t.oid = e.enumtypid
JOIN pg_namespace n ON t.typnamespace = n.oid
WHERE t.typname = 'scale_type_enum'
ORDER BY e.enumsortorder;

-- =====================================================
-- STEP 4: Check if column uses the enum
-- =====================================================

DO $$
DECLARE
  v_column_type TEXT;
BEGIN
  RAISE NOTICE '=== CHECKING COLUMN TYPE ===';
  
  SELECT data_type INTO v_column_type
  FROM information_schema.columns
  WHERE table_schema = 'clinical'
  AND table_name = 'clinical_scale_results'
  AND column_name = 'scale_type';
  
  RAISE NOTICE 'Column scale_type data type: %', v_column_type;
  
  -- Check actual PostgreSQL type
  SELECT 
    a.attname AS column_name,
    format_type(a.atttypid, a.atttypmod) AS data_type
  FROM pg_attribute a
  JOIN pg_class c ON a.attrelid = c.oid
  JOIN pg_namespace n ON c.relnamespace = n.oid
  WHERE n.nspname = 'clinical'
  AND c.relname = 'clinical_scale_results'
  AND a.attname = 'scale_type'
  AND a.attnum > 0
  AND NOT a.attisdropped;
END $$;

-- =====================================================
-- STEP 5: Try to find the problematic check constraint
-- =====================================================

DO $$
DECLARE
  v_constraint_def TEXT;
BEGIN
  RAISE NOTICE '=== CHECKING FOR SCALE_TYPE CHECK CONSTRAINT ===';
  
  SELECT pg_get_constraintdef(oid) INTO v_constraint_def
  FROM pg_constraint
  WHERE conrelid = 'clinical.clinical_scale_results'::regclass
  AND conname LIKE '%scale_type%';
  
  IF v_constraint_def IS NOT NULL THEN
    RAISE NOTICE 'Found constraint: %', v_constraint_def;
  ELSE
    RAISE NOTICE 'No scale_type constraint found';
  END IF;
END $$;

-- =====================================================
-- STEP 6: Check if there's a mismatch between enum and constraint
-- =====================================================

DO $$
BEGIN
  RAISE NOTICE '=== ANALYZING POTENTIAL ISSUES ===';
  
  -- Check if scale_type column exists but is TEXT with CHECK constraint
  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns
    WHERE table_schema = 'clinical'
    AND table_name = 'clinical_scale_results'
    AND column_name = 'scale_type'
    AND data_type = 'text'
  ) THEN
    RAISE NOTICE '⚠️  ISSUE: scale_type is TEXT, not ENUM!';
  END IF;
  
  -- Check if there's a CHECK constraint instead of using the enum
  IF EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conrelid = 'clinical.clinical_scale_results'::regclass
    AND contype = 'c'
    AND conname LIKE '%scale_type%'
  ) THEN
    RAISE NOTICE '⚠️  ISSUE: CHECK constraint exists on scale_type!';
  END IF;
END $$;

-- =====================================================
-- STEP 7: THE FIX - Drop constraint and use enum properly
-- =====================================================

DO $$
BEGIN
  RAISE NOTICE '=== APPLYING FIX ===';
  
  -- Drop any CHECK constraint on scale_type
  IF EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conrelid = 'clinical.clinical_scale_results'::regclass
    AND contype = 'c'
    AND conname LIKE '%scale_type%'
  ) THEN
    EXECUTE 'ALTER TABLE clinical.clinical_scale_results DROP CONSTRAINT IF EXISTS clinical_scale_results_scale_type_check';
    RAISE NOTICE '✅ Dropped CHECK constraint';
  END IF;
  
  -- Check if column is TEXT
  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns
    WHERE table_schema = 'clinical'
    AND table_name = 'clinical_scale_results'
    AND column_name = 'scale_type'
    AND data_type = 'text'
  ) THEN
    -- Convert column to use enum
    EXECUTE 'ALTER TABLE clinical.clinical_scale_results 
             ALTER COLUMN scale_type TYPE clinical.scale_type_enum 
             USING scale_type::clinical.scale_type_enum';
    RAISE NOTICE '✅ Converted scale_type to use enum';
  ELSE
    RAISE NOTICE '✅ scale_type already uses enum type';
  END IF;
  
END $$;

-- =====================================================
-- STEP 8: Verify the fix
-- =====================================================

DO $$
DECLARE
  v_column_type TEXT;
  v_has_check_constraint BOOLEAN;
BEGIN
  RAISE NOTICE '=== VERIFICATION ===';
  
  -- Check column type
  SELECT format_type(a.atttypid, a.atttypmod) INTO v_column_type
  FROM pg_attribute a
  JOIN pg_class c ON a.attrelid = c.oid
  JOIN pg_namespace n ON c.relnamespace = n.oid
  WHERE n.nspname = 'clinical'
  AND c.relname = 'clinical_scale_results'
  AND a.attname = 'scale_type';
  
  RAISE NOTICE 'Column type: %', v_column_type;
  
  -- Check for CHECK constraints
  SELECT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conrelid = 'clinical.clinical_scale_results'::regclass
    AND contype = 'c'
    AND conname LIKE '%scale_type%'
  ) INTO v_has_check_constraint;
  
  IF v_has_check_constraint THEN
    RAISE NOTICE '⚠️  Still has CHECK constraint!';
  ELSE
    RAISE NOTICE '✅ No CHECK constraint found';
  END IF;
  
  -- Final status
  IF v_column_type LIKE '%scale_type_enum%' AND NOT v_has_check_constraint THEN
    RAISE NOTICE '✅ SUCCESS: scale_type properly configured as enum!';
  ELSE
    RAISE NOTICE '⚠️  ISSUE: Manual intervention may be needed';
  END IF;
END $$;

-- =====================================================
-- STEP 9: Test with sample data
-- =====================================================

DO $$
DECLARE
  v_test_id UUID;
  v_patient_id UUID;
BEGIN
  RAISE NOTICE '=== TESTING INSERT ===';
  
  -- Get a test patient
  SELECT id INTO v_patient_id FROM auth.users LIMIT 1;
  
  IF v_patient_id IS NULL THEN
    RAISE NOTICE 'No test user available, skipping insert test';
    RETURN;
  END IF;
  
  -- Try to insert UPDRS scale
  BEGIN
    INSERT INTO clinical.clinical_scale_results (
      patient_id,
      scale_type,
      total_score,
      assessed_at
    ) VALUES (
      v_patient_id,
      'UPDRS'::clinical.scale_type_enum,
      45.5,
      NOW()
    ) RETURNING scale_id INTO v_test_id;
    
    RAISE NOTICE '✅ Successfully inserted UPDRS scale with ID: %', v_test_id;
    
    -- Clean up test data
    DELETE FROM clinical.clinical_scale_results WHERE scale_id = v_test_id;
    RAISE NOTICE '✅ Test data cleaned up';
    
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '❌ Insert failed: %', SQLERRM;
  END;
END $$;

-- =====================================================
-- SUMMARY
-- =====================================================

DO $$
BEGIN
  RAISE NOTICE '=== DEBUG COMPLETE ===';
  RAISE NOTICE 'If issues persist, check:';
  RAISE NOTICE '1. Enum values match exactly (case-sensitive)';
  RAISE NOTICE '2. No residual CHECK constraints';
  RAISE NOTICE '3. Column is properly typed as clinical.scale_type_enum';
END $$;

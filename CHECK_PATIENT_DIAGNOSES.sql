-- Check what columns exist on patient_diagnoses
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'private_health_info'
AND table_name = 'patient_diagnoses'
ORDER BY ordinal_position;

-- Check existing RLS policies
SELECT 
  schemaname,
  tablename,
  policyname,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'private_health_info'
AND tablename = 'patient_diagnoses';

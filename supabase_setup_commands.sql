-- SQL commands to run in Supabase SQL Editor for Edge Function setup

-- 1. First, verify your tables exist:
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('patient_invites', 'patient_clinician_connections');

-- 2. Check if any data exists in patient_invites table:
SELECT COUNT(*) as invite_count FROM public.patient_invites;

-- 3. Test the RLS policies (run this after you're logged in as a clinician):
SELECT * FROM public.patient_invites WHERE clinician_id = auth.uid();

-- 4. Grant necessary permissions for Edge Functions (if needed):
GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- 5. Enable the necessary extensions for Edge Functions:
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 6. Test insert to verify everything works:
-- (Replace 'your-user-id' with an actual user ID from auth.users)
/*
INSERT INTO public.patient_invites (
  email, 
  clinician_id, 
  status
) VALUES (
  'test@example.com',
  'your-user-id',
  'sent'
);
*/

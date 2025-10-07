-- Fix public.medications access - BOTH RLS AND GRANT permissions needed!
-- Issue: Users are authenticated but still getting "permission denied"
-- Root Cause: authenticated role lacks SELECT grant on the table

-- Step 1: Grant SELECT permission to PostgreSQL roles
GRANT SELECT ON public.medications TO anon;
GRANT SELECT ON public.medications TO authenticated;
GRANT SELECT ON public.medications TO service_role;

-- Step 2: Enable RLS on medications table
ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;

-- Step 3: Drop existing policies
DROP POLICY IF EXISTS "Allow public read access to medications" ON public.medications;
DROP POLICY IF EXISTS "Authenticated users can view medications" ON public.medications;
DROP POLICY IF EXISTS "Medications are publicly readable" ON public.medications;
DROP POLICY IF EXISTS "medications_public_read" ON public.medications;

-- Step 4: Create RLS policy for both anon and authenticated users
CREATE POLICY "medications_readable_by_all"
    ON public.medications
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Verify everything is set up correctly
DO $$
BEGIN
    -- Check if policy exists
    IF EXISTS (
        SELECT 1 
        FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'medications'
        AND policyname = 'medications_readable_by_all'
    ) THEN
        RAISE NOTICE '✅ RLS policy created successfully';
    ELSE
        RAISE WARNING '❌ Failed to create RLS policy';
    END IF;
    
    -- Check if grants exist
    IF EXISTS (
        SELECT 1 
        FROM information_schema.role_table_grants 
        WHERE table_name = 'medications' 
        AND table_schema = 'public'
        AND grantee IN ('anon', 'authenticated')
        AND privilege_type = 'SELECT'
    ) THEN
        RAISE NOTICE '✅ SELECT grants applied successfully';
    ELSE
        RAISE WARNING '❌ SELECT grants may not be applied';
    END IF;
END $$;

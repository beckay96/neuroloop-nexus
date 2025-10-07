-- Fix public.medications RLS to allow read access during onboarding
-- This ensures medications are visible to all users (including during signup)

-- Enable RLS on medications table
ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public read access to medications" ON public.medications;
DROP POLICY IF EXISTS "Authenticated users can view medications" ON public.medications;
DROP POLICY IF EXISTS "Medications are publicly readable" ON public.medications;

-- Create a single, clear policy for public read access
CREATE POLICY "medications_public_read"
    ON public.medications
    FOR SELECT
    USING (true);

-- Verify the policy
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'medications'
        AND policyname = 'medications_public_read'
    ) THEN
        RAISE NOTICE '✅ medications_public_read policy created successfully';
    ELSE
        RAISE WARNING '❌ Failed to create medications_public_read policy';
    END IF;
END $$;

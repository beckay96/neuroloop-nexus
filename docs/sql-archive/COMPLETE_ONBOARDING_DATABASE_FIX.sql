-- ============================================================================
-- COMPLETE ONBOARDING DATABASE FIX
-- ============================================================================
-- This fixes ALL database issues for proper onboarding of all user types
-- ============================================================================

BEGIN;

-- ============================================================================
-- PART 1: Fix Missing Columns in Existing Tables
-- ============================================================================

-- Add missing columns to user_medications for storing times
ALTER TABLE private_health_info.user_medications 
ADD COLUMN IF NOT EXISTS medication_name TEXT,
ADD COLUMN IF NOT EXISTS times TIME[] DEFAULT ARRAY[]::TIME[];

COMMENT ON COLUMN private_health_info.user_medications.medication_name IS 'For custom medications not in medications table';
COMMENT ON COLUMN private_health_info.user_medications.times IS 'Array of times for medication reminders';

-- Add missing columns to carer_profiles
ALTER TABLE public.carer_profiles
ADD COLUMN IF NOT EXISTS first_name TEXT,
ADD COLUMN IF NOT EXISTS middle_name TEXT,
ADD COLUMN IF NOT EXISTS last_name TEXT,
ADD COLUMN IF NOT EXISTS date_of_birth DATE,
ADD COLUMN IF NOT EXISTS phone_number TEXT,
ADD COLUMN IF NOT EXISTS relationship_to_patient TEXT,
ADD COLUMN IF NOT EXISTS patient_dob_verification DATE;

-- Add missing columns to clinician_profiles
ALTER TABLE public.clinician_profiles
ADD COLUMN IF NOT EXISTS first_name TEXT,
ADD COLUMN IF NOT EXISTS middle_name TEXT,
ADD COLUMN IF NOT EXISTS last_name TEXT,
ADD COLUMN IF NOT EXISTS clinician_title TEXT,
ADD COLUMN IF NOT EXISTS license_number TEXT;

-- ============================================================================
-- PART 2: Create Missing Tables
-- ============================================================================

-- Create daily_tracking_preferences if not exists
CREATE TABLE IF NOT EXISTS public.daily_tracking_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    tracking_times TIME[] DEFAULT ARRAY[]::TIME[],
    basal_temp_time TIME,
    medication_times TIME[] DEFAULT ARRAY[]::TIME[],
    custom_tracking_items JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create basal_temperature_logs if not exists
CREATE TABLE IF NOT EXISTS private_health_info.basal_temperature_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    log_date DATE NOT NULL,
    log_time TIME NOT NULL,
    temperature_celsius NUMERIC(4,2),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, log_date)
);

-- Create medication_logs if not exists
CREATE TABLE IF NOT EXISTS private_health_info.medication_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    user_medication_id UUID REFERENCES private_health_info.user_medications(id) ON DELETE CASCADE,
    log_date DATE NOT NULL,
    log_time TIME NOT NULL,
    taken BOOLEAN DEFAULT false,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create research_consent table (was missing!)
CREATE TABLE IF NOT EXISTS public.research_consent (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    consent_given BOOLEAN DEFAULT false,
    data_type TEXT NOT NULL,
    consent_date TIMESTAMPTZ NOT NULL,
    withdrawal_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, data_type)
);

-- Create research_data_sharing_details for granular consent
CREATE TABLE IF NOT EXISTS public.research_data_sharing_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    seizure_data BOOLEAN DEFAULT false,
    parkinsons_data BOOLEAN DEFAULT false,
    medication_data BOOLEAN DEFAULT false,
    menstrual_data BOOLEAN DEFAULT false,
    symptom_data BOOLEAN DEFAULT false,
    demographic_data BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

-- ============================================================================
-- PART 3: Enable RLS on New Tables
-- ============================================================================

-- Enable RLS on all new tables
ALTER TABLE public.daily_tracking_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE private_health_info.basal_temperature_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE private_health_info.medication_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_consent ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_data_sharing_details ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- PART 4: Create RLS Policies for New Tables
-- ============================================================================

-- daily_tracking_preferences policies
CREATE POLICY "Users can view own tracking preferences"
    ON public.daily_tracking_preferences
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tracking preferences"
    ON public.daily_tracking_preferences
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tracking preferences"
    ON public.daily_tracking_preferences
    FOR UPDATE
    USING (auth.uid() = user_id);

-- basal_temperature_logs policies
CREATE POLICY "Users can view own temperature logs"
    ON private_health_info.basal_temperature_logs
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own temperature logs"
    ON private_health_info.basal_temperature_logs
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- medication_logs policies
CREATE POLICY "Users can view own medication logs"
    ON private_health_info.medication_logs
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own medication logs"
    ON private_health_info.medication_logs
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- research_consent policies
CREATE POLICY "Users can view own research consent"
    ON public.research_consent
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own research consent"
    ON public.research_consent
    FOR ALL
    USING (auth.uid() = user_id);

-- research_data_sharing_details policies
CREATE POLICY "Users can view own sharing details"
    ON public.research_data_sharing_details
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own sharing details"
    ON public.research_data_sharing_details
    FOR ALL
    USING (auth.uid() = user_id);

-- ============================================================================
-- PART 5: Fix Existing RLS Policies
-- ============================================================================

-- Fix carer_profiles policies
DROP POLICY IF EXISTS "Users can view own carer profile" ON public.carer_profiles;
CREATE POLICY "Users can view own carer profile"
    ON public.carer_profiles
    FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own carer profile" ON public.carer_profiles;
CREATE POLICY "Users can update own carer profile"
    ON public.carer_profiles
    FOR ALL
    USING (auth.uid() = user_id);

-- Fix clinician_profiles policies
DROP POLICY IF EXISTS "Users can view own clinician profile" ON public.clinician_profiles;
CREATE POLICY "Users can view own clinician profile"
    ON public.clinician_profiles
    FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own clinician profile" ON public.clinician_profiles;
CREATE POLICY "Users can update own clinician profile"
    ON public.clinician_profiles
    FOR ALL
    USING (auth.uid() = user_id);

-- ============================================================================
-- PART 6: Create Helper Functions
-- ============================================================================

-- Function to properly save patient onboarding data
CREATE OR REPLACE FUNCTION public.save_patient_onboarding(
    p_user_id UUID,
    p_data JSONB
) RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_result JSONB := '{"success": false}'::jsonb;
BEGIN
    -- Update profiles table
    UPDATE public.profiles
    SET 
        first_name = p_data->>'firstName',
        middle_name = p_data->>'middleName',
        last_name = p_data->>'lastName',
        phone_number = p_data->>'phoneNumber',
        onboarding_completed = true,
        updated_at = NOW()
    WHERE id = p_user_id;

    -- Update patient_profiles
    INSERT INTO public.patient_profiles (
        user_id,
        first_name,
        last_name,
        date_of_birth,
        gender
    ) VALUES (
        p_user_id,
        p_data->>'firstName',
        p_data->>'lastName',
        (p_data->>'dateOfBirth')::date,
        (p_data->>'gender')::gender_enum
    )
    ON CONFLICT (user_id) DO UPDATE
    SET 
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        date_of_birth = EXCLUDED.date_of_birth,
        gender = EXCLUDED.gender,
        updated_at = NOW();

    -- Save to patient_onboarding_data
    INSERT INTO private_health_info.patient_onboarding_data (
        user_id,
        first_name,
        middle_name,
        last_name,
        date_of_birth,
        gender,
        phone_number,
        emergency_contact_name,
        emergency_contact_phone,
        emergency_contact_relationship,
        selected_conditions,
        track_menstrual_cycle,
        share_research_data,
        completed_at
    ) VALUES (
        p_user_id,
        p_data->>'firstName',
        p_data->>'middleName',
        p_data->>'lastName',
        (p_data->>'dateOfBirth')::date,
        (p_data->>'gender')::gender_enum,
        p_data->>'phoneNumber',
        p_data->>'emergencyContactName',
        p_data->>'emergencyContactPhone',
        p_data->>'emergencyContactRelationship',
        ARRAY(SELECT jsonb_array_elements_text(p_data->'selectedConditions'))::uuid[],
        (p_data->>'trackMenstrual')::boolean,
        (p_data->>'shareResearch')::boolean,
        NOW()
    )
    ON CONFLICT (user_id) DO UPDATE
    SET 
        first_name = EXCLUDED.first_name,
        middle_name = EXCLUDED.middle_name,
        last_name = EXCLUDED.last_name,
        date_of_birth = EXCLUDED.date_of_birth,
        gender = EXCLUDED.gender,
        phone_number = EXCLUDED.phone_number,
        emergency_contact_name = EXCLUDED.emergency_contact_name,
        emergency_contact_phone = EXCLUDED.emergency_contact_phone,
        emergency_contact_relationship = EXCLUDED.emergency_contact_relationship,
        selected_conditions = EXCLUDED.selected_conditions,
        track_menstrual_cycle = EXCLUDED.track_menstrual_cycle,
        share_research_data = EXCLUDED.share_research_data,
        completed_at = EXCLUDED.completed_at,
        updated_at = NOW();

    v_result := '{"success": true}'::jsonb;
    RETURN v_result;
EXCEPTION
    WHEN OTHERS THEN
        v_result := jsonb_build_object(
            'success', false,
            'error', SQLERRM
        );
        RETURN v_result;
END;
$$;

COMMIT;

-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- Check if all tables exist
SELECT 
    schemaname,
    tablename
FROM pg_tables
WHERE tablename IN (
    'daily_tracking_preferences',
    'basal_temperature_logs',
    'medication_logs',
    'research_consent',
    'research_data_sharing_details'
)
ORDER BY schemaname, tablename;

-- Check if columns were added
SELECT 
    table_schema,
    table_name,
    column_name,
    data_type
FROM information_schema.columns
WHERE 
    (table_name = 'user_medications' AND column_name IN ('medication_name', 'times'))
    OR (table_name = 'carer_profiles' AND column_name IN ('first_name', 'last_name', 'phone_number'))
    OR (table_name = 'clinician_profiles' AND column_name IN ('first_name', 'last_name', 'clinician_title'))
ORDER BY table_name, column_name;

-- Success message
DO $$
BEGIN
    RAISE NOTICE '✅ COMPLETE ONBOARDING DATABASE FIX APPLIED!';
    RAISE NOTICE '- Added missing columns to existing tables';
    RAISE NOTICE '- Created missing tables (research_consent, daily_tracking_preferences, etc.)';
    RAISE NOTICE '- Set up proper RLS policies';
    RAISE NOTICE '- Created helper function for patient onboarding';
    RAISE NOTICE 'Ready for comprehensive onboarding!';
END $$;

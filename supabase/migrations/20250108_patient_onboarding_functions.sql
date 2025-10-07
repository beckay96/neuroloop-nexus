-- Create RPC functions for patient onboarding to access private_health_info schema
-- Supabase JS client cannot directly access non-public schemas, so we need functions

-- Function 1: Save patient onboarding data
CREATE OR REPLACE FUNCTION save_patient_onboarding_data(
    p_user_id UUID,
    p_first_name TEXT,
    p_middle_name TEXT,
    p_last_name TEXT,
    p_date_of_birth DATE,
    p_gender TEXT,
    p_selected_conditions UUID[],
    p_track_menstrual_cycle BOOLEAN,
    p_basal_temp_time TIME,
    p_tracking_times TEXT[],
    p_emergency_contact_name TEXT,
    p_emergency_contact_phone TEXT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private_health_info, public
AS $$
DECLARE
    v_result JSON;
BEGIN
    -- Insert/update patient onboarding data
    INSERT INTO private_health_info.patient_onboarding_data (
        user_id,
        first_name,
        middle_name,
        last_name,
        date_of_birth,
        gender,
        selected_conditions,
        track_menstrual_cycle,
        basal_temp_time,
        tracking_times,
        emergency_contact_name,
        emergency_contact_phone,
        completed_at
    ) VALUES (
        p_user_id,
        p_first_name,
        p_middle_name,
        p_last_name,
        p_date_of_birth,
        p_gender::private_health_info.gender_enum,
        p_selected_conditions,
        p_track_menstrual_cycle,
        p_basal_temp_time,
        p_tracking_times,
        p_emergency_contact_name,
        p_emergency_contact_phone,
        NOW()
    )
    ON CONFLICT (user_id) DO UPDATE SET
        first_name = EXCLUDED.first_name,
        middle_name = EXCLUDED.middle_name,
        last_name = EXCLUDED.last_name,
        date_of_birth = EXCLUDED.date_of_birth,
        gender = EXCLUDED.gender,
        selected_conditions = EXCLUDED.selected_conditions,
        track_menstrual_cycle = EXCLUDED.track_menstrual_cycle,
        basal_temp_time = EXCLUDED.basal_temp_time,
        tracking_times = EXCLUDED.tracking_times,
        emergency_contact_name = EXCLUDED.emergency_contact_name,
        emergency_contact_phone = EXCLUDED.emergency_contact_phone,
        completed_at = NOW();

    v_result := json_build_object(
        'success', true,
        'message', 'Patient onboarding data saved successfully'
    );
    
    RETURN v_result;
EXCEPTION WHEN OTHERS THEN
    RETURN json_build_object(
        'success', false,
        'error', SQLERRM
    );
END;
$$;

-- Function 2: Save user condition
CREATE OR REPLACE FUNCTION save_user_condition(
    p_user_id UUID,
    p_condition_id UUID,
    p_diagnosis_date DATE DEFAULT CURRENT_DATE
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private_health_info, public
AS $$
DECLARE
    v_result JSON;
BEGIN
    INSERT INTO private_health_info.user_conditions (
        user_id,
        condition_id,
        diagnosis_date,
        is_active
    ) VALUES (
        p_user_id,
        p_condition_id,
        p_diagnosis_date,
        true
    )
    ON CONFLICT (user_id, condition_id) DO UPDATE SET
        is_active = true,
        diagnosis_date = EXCLUDED.diagnosis_date;

    v_result := json_build_object(
        'success', true,
        'message', 'User condition saved successfully'
    );
    
    RETURN v_result;
EXCEPTION WHEN OTHERS THEN
    RETURN json_build_object(
        'success', false,
        'error', SQLERRM
    );
END;
$$;

-- Function 3: Save user medication
CREATE OR REPLACE FUNCTION save_user_medication(
    p_user_id UUID,
    p_medication_id UUID,
    p_medication_name TEXT,
    p_dosage_amount NUMERIC,
    p_dosage_unit TEXT,
    p_times TEXT[]
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = private_health_info, public
AS $$
DECLARE
    v_result JSON;
BEGIN
    INSERT INTO private_health_info.user_medications (
        user_id,
        medication_id,
        medication_name,
        dosage_amount,
        dosage_unit,
        times,
        is_active
    ) VALUES (
        p_user_id,
        p_medication_id,
        p_medication_name,
        p_dosage_amount,
        p_dosage_unit,
        p_times,
        true
    )
    ON CONFLICT (user_id, medication_id) DO UPDATE SET
        medication_name = EXCLUDED.medication_name,
        dosage_amount = EXCLUDED.dosage_amount,
        dosage_unit = EXCLUDED.dosage_unit,
        times = EXCLUDED.times,
        is_active = true;

    v_result := json_build_object(
        'success', true,
        'message', 'User medication saved successfully'
    );
    
    RETURN v_result;
EXCEPTION WHEN OTHERS THEN
    RETURN json_build_object(
        'success', false,
        'error', SQLERRM
    );
END;
$$;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION save_patient_onboarding_data TO authenticated;
GRANT EXECUTE ON FUNCTION save_user_condition TO authenticated;
GRANT EXECUTE ON FUNCTION save_user_medication TO authenticated;

-- Create verification temp table
CREATE TEMP TABLE function_verification (
    function_name TEXT,
    status TEXT,
    details TEXT
);

-- Verify functions exist
INSERT INTO function_verification
SELECT 
    'save_patient_onboarding_data' as function_name,
    CASE WHEN EXISTS (
        SELECT 1 FROM pg_proc p
        JOIN pg_namespace n ON p.pronamespace = n.oid
        WHERE p.proname = 'save_patient_onboarding_data'
    ) THEN '✅ CREATED' ELSE '❌ FAILED' END as status,
    'Saves patient onboarding data to private_health_info schema' as details;

INSERT INTO function_verification
SELECT 
    'save_user_condition' as function_name,
    CASE WHEN EXISTS (
        SELECT 1 FROM pg_proc p
        JOIN pg_namespace n ON p.pronamespace = n.oid
        WHERE p.proname = 'save_user_condition'
    ) THEN '✅ CREATED' ELSE '❌ FAILED' END as status,
    'Saves user condition to private_health_info schema' as details;

INSERT INTO function_verification
SELECT 
    'save_user_medication' as function_name,
    CASE WHEN EXISTS (
        SELECT 1 FROM pg_proc p
        JOIN pg_namespace n ON p.pronamespace = n.oid
        WHERE p.proname = 'save_user_medication'
    ) THEN '✅ CREATED' ELSE '❌ FAILED' END as status,
    'Saves user medication to private_health_info schema' as details;

-- Display verification results
SELECT * FROM function_verification;

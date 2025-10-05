-- Fix all database functions to have proper search_path setting
-- This prevents SQL injection and privilege escalation attacks

-- 1. Fix audit_trigger_function
CREATE OR REPLACE FUNCTION public.audit_trigger_function()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
    jwt_claims JSONB := nullif(current_setting('request.jwt.claims', true), '')::JSONB;
    acting_user TEXT := COALESCE(nullif(current_setting('app.current_user_id', true), ''), jwt_claims ->> 'sub');
BEGIN
    INSERT INTO public.audit_log (user_id, action, table_name, record_id, ip_address, user_agent, created_at)
    VALUES (
        CASE WHEN acting_user IS NOT NULL THEN acting_user::UUID ELSE NULL END,
        TG_OP,
        TG_TABLE_NAME,
        COALESCE((NEW).id::TEXT, (OLD).id::TEXT),
        inet_client_addr(),
        jwt_claims ->> 'user_agent',
        NOW()
    );
    RETURN COALESCE(NEW, OLD);
END;
$function$;

-- 2. Fix anonymize_to_research_seizure
CREATE OR REPLACE FUNCTION public.anonymize_to_research_seizure()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
    has_consent BOOLEAN;
    research_id UUID;
    user_age INT;
    user_gender gender_enum;
    age_bucket age_range_enum;
BEGIN
    -- Check if user consented to seizure data research
    SELECT consent_status = 'active' INTO has_consent
    FROM public.research_consent
    WHERE user_id = NEW.user_id AND data_type = 'seizure_data';
    
    IF NOT has_consent THEN
        RETURN NEW;
    END IF;
    
    -- Get research_user_id
    SELECT research_user_id INTO research_id FROM public.profiles WHERE id = NEW.user_id;
    
    -- Get demographics
    SELECT 
        EXTRACT(YEAR FROM AGE(date_of_birth))::INT,
        gender 
    INTO user_age, user_gender
    FROM public.patient_profiles WHERE user_id = NEW.user_id;
    
    -- Calculate age bucket
    age_bucket := CASE
        WHEN user_age < 5 THEN '0_4'::age_range_enum
        WHEN user_age < 10 THEN '5_9'::age_range_enum
        WHEN user_age < 15 THEN '10_14'::age_range_enum
        WHEN user_age < 20 THEN '15_19'::age_range_enum
        WHEN user_age < 25 THEN '20_24'::age_range_enum
        WHEN user_age < 30 THEN '25_29'::age_range_enum
        WHEN user_age < 35 THEN '30_34'::age_range_enum
        WHEN user_age < 40 THEN '35_39'::age_range_enum
        WHEN user_age < 45 THEN '40_44'::age_range_enum
        WHEN user_age < 50 THEN '45_49'::age_range_enum
        WHEN user_age < 55 THEN '50_54'::age_range_enum
        WHEN user_age < 60 THEN '55_59'::age_range_enum
        WHEN user_age < 65 THEN '60_64'::age_range_enum
        WHEN user_age < 70 THEN '65_69'::age_range_enum
        WHEN user_age < 75 THEN '70_74'::age_range_enum
        WHEN user_age < 80 THEN '75_79'::age_range_enum
        ELSE '80_plus'::age_range_enum
    END;
    
    -- Insert anonymized data
    INSERT INTO public.research_seizure_events (
        research_user_id, age_range, gender, geographic_region,
        seizure_type, duration_seconds, consciousness_level,
        aura_present, witnessed, post_ictal_confusion_minutes,
        identified_triggers, sleep_hours_prior, medication_adherence_prior,
        emergency_services_called, rescue_medication_used, hospitalized
    ) VALUES (
        research_id, age_bucket, user_gender, 'unknown'::geographic_region_enum,
        NEW.seizure_type, NEW.duration_seconds, NEW.consciousness_level,
        NEW.aura_present, NEW.witnessed, NEW.post_ictal_confusion_minutes,
        NEW.identified_triggers, NEW.sleep_hours_prior, NEW.medication_adherence_prior,
        NEW.emergency_services_called, NEW.rescue_medication_used, NEW.hospitalized
    );
    
    RETURN NEW;
END;
$function$;

-- 3. Fix setup_user_on_onboarding
CREATE OR REPLACE FUNCTION public.setup_user_on_onboarding()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
    condition_id UUID;
    condition_features tracking_feature_enum[];
    all_features tracking_feature_enum[] := ARRAY[]::tracking_feature_enum[];
BEGIN
    IF NEW.completed_at IS NOT NULL THEN
        -- Create user conditions
        FOREACH condition_id IN ARRAY NEW.selected_conditions
        LOOP
            SELECT tracking_features_array INTO condition_features
            FROM public.conditions WHERE id = condition_id;
            
            INSERT INTO public.user_conditions (user_id, condition_id, tracking_features_enabled)
            VALUES (NEW.user_id, condition_id, condition_features)
            ON CONFLICT (user_id, condition_id) DO NOTHING;
            
            all_features := array_cat(all_features, condition_features);
        END LOOP;
        
        -- Add menstrual tracking
        IF NEW.track_menstrual_cycle THEN
            all_features := array_append(all_features, 'menstruation'::tracking_feature_enum);
        END IF;
        
        -- Remove duplicates
        all_features := ARRAY(SELECT DISTINCT unnest(all_features));
        
        -- Set tracking preferences
        INSERT INTO public.daily_tracking_preferences (user_id, tracking_types)
        VALUES (NEW.user_id, all_features)
        ON CONFLICT (user_id) DO UPDATE SET tracking_types = all_features;
        
        -- Setup research consents
        IF NEW.share_research_data AND NEW.research_data_types IS NOT NULL THEN
            INSERT INTO public.research_consent (user_id, data_type, consent_status, consent_given_at)
            SELECT NEW.user_id, unnest(NEW.research_data_types), 'active'::consent_status_enum, NOW()
            ON CONFLICT (user_id, data_type) DO UPDATE 
            SET consent_status = 'active', consent_given_at = NOW();
        END IF;
    END IF;
    
    RETURN NEW;
END;
$function$;

-- 4. Fix cleanup_old_audit_logs
CREATE OR REPLACE FUNCTION public.cleanup_old_audit_logs()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
    DELETE FROM public.audit_log WHERE created_at < NOW() - INTERVAL '7 years';
END;
$function$;

-- 5. Fix anonymize_deleted_user
CREATE OR REPLACE FUNCTION public.anonymize_deleted_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
    UPDATE public.audit_log SET user_id = NULL WHERE user_id = OLD.id;
    DELETE FROM public.research_user_mapping WHERE user_id = OLD.id;
    RETURN OLD;
END;
$function$;

-- 6. Fix hash_ip (already has search_path but recreating for consistency)
CREATE OR REPLACE FUNCTION public.hash_ip(ip inet)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
    salt_value TEXT;
BEGIN
    -- Get salt from protected table
    SELECT value INTO salt_value 
    FROM protected.system_settings 
    WHERE key = 'ip_salt';
    
    -- If no salt found, use a default (should never happen in production)
    IF salt_value IS NULL THEN
        salt_value := 'default_salt_please_change';
    END IF;
    
    -- Hash IP with salt
    RETURN encode(digest(ip::text || salt_value, 'sha256'), 'hex');
END;
$function$;
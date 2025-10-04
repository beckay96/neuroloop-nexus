-- ============================================================================
-- ONBOARDING TRACKING FEATURES AUTOMATION
-- ============================================================================
-- Purpose: Automatically assign tracking features to users based on conditions
-- Trigger: When patient completes onboarding
-- Date: 2025-10-05
-- ============================================================================

-- ============================================================================
-- STEP 1: CREATE TRACKING_FEATURES ENUM
-- ============================================================================

DO $$ BEGIN
    CREATE TYPE public.tracking_feature AS ENUM (
        'seizure',
        'tremor', 
        'gait',
        'menstruation',
        'temperature',
        'mood',
        'energy',
        'sleep',
        'symptoms'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ============================================================================
-- STEP 2: UPDATE CONDITIONS TABLE
-- ============================================================================

-- Add tracking_features_array column if doesn't exist
ALTER TABLE public.conditions 
ADD COLUMN IF NOT EXISTS tracking_features_array public.tracking_feature[];

-- Populate conditions with appropriate tracking features
-- You'll need to customize these based on your actual condition IDs

-- Example: Epilepsy
UPDATE public.conditions 
SET tracking_features_array = ARRAY['seizure', 'mood', 'energy', 'sleep', 'symptoms']::public.tracking_feature[]
WHERE name ILIKE '%epilepsy%' OR category ILIKE '%epilepsy%';

-- Example: Parkinson's
UPDATE public.conditions 
SET tracking_features_array = ARRAY['tremor', 'gait', 'mood', 'energy', 'sleep', 'symptoms']::public.tracking_feature[]
WHERE name ILIKE '%parkinson%' OR category ILIKE '%parkinson%';

-- Example: General neurological conditions
UPDATE public.conditions
SET tracking_features_array = ARRAY['mood', 'energy', 'sleep', 'symptoms', 'temperature']::public.tracking_feature[]
WHERE tracking_features_array IS NULL;

-- ============================================================================
-- STEP 3: ADD TRACKING_FEATURES TO USER_CONDITIONS TABLE
-- ============================================================================

ALTER TABLE public.user_conditions
ADD COLUMN IF NOT EXISTS tracking_features_enabled public.tracking_feature[];

-- ============================================================================
-- STEP 4: CREATE FUNCTION TO AUTO-ASSIGN TRACKING FEATURES
-- ============================================================================

CREATE OR REPLACE FUNCTION public.assign_tracking_features_on_onboarding()
RETURNS TRIGGER AS $$
DECLARE
    selected_condition TEXT;
    condition_tracking_features public.tracking_feature[];
    all_tracking_features public.tracking_feature[] := ARRAY[]::public.tracking_feature[];
    user_uuid UUID;
BEGIN
    -- Only proceed if onboarding is being completed
    IF NEW.completed = TRUE AND (OLD.completed IS NULL OR OLD.completed = FALSE) THEN
        
        user_uuid := NEW.user_id;
        
        -- Loop through selected conditions from onboarding data
        IF NEW.step_data ? 'selected_conditions' THEN
            FOR selected_condition IN 
                SELECT jsonb_array_elements_text(NEW.step_data->'selected_conditions')
            LOOP
                -- Get tracking features for this condition
                SELECT tracking_features_array INTO condition_tracking_features
                FROM public.conditions
                WHERE id = selected_condition OR name = selected_condition;
                
                -- If condition found, create user_conditions entry
                IF condition_tracking_features IS NOT NULL THEN
                    INSERT INTO public.user_conditions (
                        id,
                        user_id,
                        condition_id,
                        tracking_features_enabled,
                        created_at
                    ) VALUES (
                        gen_random_uuid()::text,
                        user_uuid::text,
                        selected_condition,
                        condition_tracking_features,
                        NOW()
                    )
                    ON CONFLICT (user_id, condition_id) DO UPDATE
                    SET tracking_features_enabled = condition_tracking_features;
                    
                    -- Accumulate all tracking features
                    all_tracking_features := array_cat(all_tracking_features, condition_tracking_features);
                END IF;
            END LOOP;
        END IF;
        
        -- Add menstruation tracking if patient selected it
        IF NEW.step_data ? 'track_menstrual_cycle' AND 
           (NEW.step_data->>'track_menstrual_cycle')::boolean = TRUE THEN
            all_tracking_features := array_append(all_tracking_features, 'menstruation'::public.tracking_feature);
        END IF;
        
        -- Remove duplicates and update daily_tracking_preferences
        all_tracking_features := ARRAY(SELECT DISTINCT unnest(all_tracking_features));
        
        -- Insert or update daily_tracking_preferences
        INSERT INTO public.daily_tracking_preferences (
            id,
            user_id,
            tracking_types,
            notification_enabled,
            created_at,
            updated_at
        ) VALUES (
            gen_random_uuid()::text,
            user_uuid::text,
            to_jsonb(all_tracking_features),
            TRUE,
            NOW(),
            NOW()
        )
        ON CONFLICT (user_id) DO UPDATE
        SET tracking_types = to_jsonb(all_tracking_features),
            updated_at = NOW();
            
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- STEP 5: CREATE TRIGGER ON ONBOARDING_PROGRESS
-- ============================================================================

DROP TRIGGER IF EXISTS assign_tracking_on_complete ON public.onboarding_progress;
CREATE TRIGGER assign_tracking_on_complete
    AFTER INSERT OR UPDATE ON public.onboarding_progress
    FOR EACH ROW
    EXECUTE FUNCTION public.assign_tracking_features_on_onboarding();

-- ============================================================================
-- STEP 6: MIGRATION FOR PATIENT_ONBOARDING_DATA (ALTERNATIVE)
-- ============================================================================

-- If you're using patient_onboarding_data instead of onboarding_progress:

CREATE OR REPLACE FUNCTION public.assign_tracking_from_patient_onboarding()
RETURNS TRIGGER AS $$
DECLARE
    selected_condition TEXT;
    condition_tracking_features public.tracking_feature[];
    all_tracking_features public.tracking_feature[] := ARRAY[]::public.tracking_feature[];
    user_uuid UUID;
BEGIN
    user_uuid := NEW.user_id;
    
    -- Loop through selected conditions
    IF NEW.selected_conditions IS NOT NULL THEN
        FOREACH selected_condition IN ARRAY NEW.selected_conditions
        LOOP
            -- Get tracking features for this condition
            SELECT tracking_features_array INTO condition_tracking_features
            FROM public.conditions
            WHERE id = selected_condition OR name = selected_condition;
            
            -- Create user_conditions entry
            IF condition_tracking_features IS NOT NULL THEN
                INSERT INTO public.user_conditions (
                    id,
                    user_id,
                    condition_id,
                    tracking_features_enabled,
                    created_at
                ) VALUES (
                    gen_random_uuid()::text,
                    user_uuid::text,
                    selected_condition,
                    condition_tracking_features,
                    NOW()
                )
                ON CONFLICT (user_id, condition_id) DO UPDATE
                SET tracking_features_enabled = condition_tracking_features;
                
                -- Accumulate all tracking features
                all_tracking_features := array_cat(all_tracking_features, condition_tracking_features);
            END IF;
        END LOOP;
    END IF;
    
    -- Add menstruation tracking if selected
    IF NEW.track_menstrual_cycle = TRUE THEN
        all_tracking_features := array_append(all_tracking_features, 'menstruation'::public.tracking_feature);
    END IF;
    
    -- Remove duplicates
    all_tracking_features := ARRAY(SELECT DISTINCT unnest(all_tracking_features));
    
    -- Update daily_tracking_preferences
    INSERT INTO public.daily_tracking_preferences (
        id,
        user_id,
        tracking_types,
        notification_enabled,
        created_at,
        updated_at
    ) VALUES (
        gen_random_uuid()::text,
        user_uuid::text,
        to_jsonb(all_tracking_features),
        TRUE,
        NOW(),
        NOW()
    )
    ON CONFLICT (user_id) DO UPDATE
    SET tracking_types = to_jsonb(all_tracking_features),
        updated_at = NOW();
        
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS assign_tracking_patient_onboarding ON public.patient_onboarding_data;
CREATE TRIGGER assign_tracking_patient_onboarding
    AFTER INSERT OR UPDATE ON public.patient_onboarding_data
    FOR EACH ROW
    EXECUTE FUNCTION public.assign_tracking_from_patient_onboarding();

-- ============================================================================
-- STEP 7: ADD UNIQUE CONSTRAINT TO USER_CONDITIONS
-- ============================================================================

ALTER TABLE public.user_conditions
ADD CONSTRAINT IF NOT EXISTS user_conditions_user_condition_unique 
UNIQUE (user_id, condition_id);

-- ============================================================================
-- STEP 8: ADD UNIQUE CONSTRAINT TO DAILY_TRACKING_PREFERENCES
-- ============================================================================

ALTER TABLE public.daily_tracking_preferences
ADD CONSTRAINT IF NOT EXISTS daily_tracking_preferences_user_unique 
UNIQUE (user_id);

-- ============================================================================
-- STEP 9: VERIFICATION QUERIES
-- ============================================================================

-- Check conditions have tracking features assigned
SELECT 
    id,
    name,
    category,
    tracking_features_array
FROM public.conditions
ORDER BY name;

-- Check user_conditions with tracking features
SELECT 
    uc.user_id,
    uc.condition_id,
    c.name as condition_name,
    uc.tracking_features_enabled
FROM public.user_conditions uc
LEFT JOIN public.conditions c ON c.id = uc.condition_id
ORDER BY uc.created_at DESC
LIMIT 10;

-- Check daily_tracking_preferences
SELECT 
    user_id,
    tracking_types,
    notification_enabled
FROM public.daily_tracking_preferences
ORDER BY created_at DESC
LIMIT 10;

-- ============================================================================
-- DEPLOYMENT COMPLETE
-- ============================================================================
-- ✅ tracking_feature enum created
-- ✅ conditions.tracking_features_array populated
-- ✅ user_conditions.tracking_features_enabled added
-- ✅ Auto-assignment triggers created
-- ✅ daily_tracking_preferences auto-populated
-- ============================================================================

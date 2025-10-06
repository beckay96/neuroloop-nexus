-- ==========================================
-- COMPLETE RLS OVERHAUL - ALL OPERATIONS
-- ==========================================
-- This will clean up ALL RLS policies and create proper ones
-- for SELECT, INSERT, UPDATE, DELETE on ALL tables
-- ==========================================

BEGIN;

-- Create comprehensive log
CREATE TEMP TABLE overhaul_log (
    id SERIAL,
    schema_name TEXT,
    table_name TEXT,
    operation TEXT,
    action TEXT,
    details TEXT
);

-- ==========================================
-- STEP 1: DROP ALL EXISTING NON-SYSTEM POLICIES
-- ==========================================

DO $$
DECLARE
    v_policy RECORD;
    v_drop_count INTEGER := 0;
BEGIN
    -- Drop ALL user-created policies to start fresh
    FOR v_policy IN
        SELECT DISTINCT schemaname, tablename, policyname
        FROM pg_policies
        WHERE schemaname IN ('private_health_info', 'clinical', 'public')
        AND policyname NOT LIKE '%System%'
        AND policyname NOT LIKE '%Service%'
        AND policyname NOT LIKE '%Supabase%'
        AND policyname NOT LIKE '%authenticated can%'
    LOOP
        BEGIN
            EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I',
                v_policy.policyname, v_policy.schemaname, v_policy.tablename);
            v_drop_count := v_drop_count + 1;
        EXCEPTION WHEN OTHERS THEN
            -- Log but continue
            INSERT INTO overhaul_log VALUES (DEFAULT, v_policy.schemaname, v_policy.tablename, 
                'DROP', 'FAILED', 'Error dropping ' || v_policy.policyname || ': ' || SQLERRM);
        END;
    END LOOP;
    
    INSERT INTO overhaul_log VALUES (DEFAULT, 'ALL', 'ALL', 'DROP', 'SUCCESS', 
        'Dropped ' || v_drop_count || ' existing policies');
END $$;

-- ==========================================
-- STEP 2: CREATE POLICIES FOR private_health_info SCHEMA
-- ==========================================

-- Tables with patient_id
DO $$
DECLARE
    v_table TEXT;
    v_tables TEXT[] := ARRAY[
        'daily_symptom_logs', 'seizure_events', 'tremor_episodes', 
        'gait_episodes', 'clinical_media'
    ];
BEGIN
    FOREACH v_table IN ARRAY v_tables
    LOOP
        IF EXISTS (SELECT 1 FROM information_schema.tables 
                   WHERE table_schema = 'private_health_info' AND table_name = v_table) THEN
            
            -- SELECT: Users see own, clinicians see connected patients
            EXECUTE format('CREATE POLICY "Users view own %I" ON private_health_info.%I 
                           FOR SELECT USING (auth.uid() = patient_id)', v_table, v_table);
            
            EXECUTE format('CREATE POLICY "Clinicians view patient %I" ON private_health_info.%I 
                           FOR SELECT USING (
                               EXISTS (
                                   SELECT 1 FROM public.patient_clinician_connections 
                                   WHERE patient_id = %I.patient_id 
                                   AND clinician_id = auth.uid() 
                                   AND status = ''active''
                               )
                           )', v_table, v_table, v_table);
            
            -- INSERT: Only users can insert their own
            EXECUTE format('CREATE POLICY "Users insert own %I" ON private_health_info.%I 
                           FOR INSERT WITH CHECK (auth.uid() = patient_id)', v_table, v_table);
            
            -- UPDATE: Users update own
            EXECUTE format('CREATE POLICY "Users update own %I" ON private_health_info.%I 
                           FOR UPDATE USING (auth.uid() = patient_id) 
                           WITH CHECK (auth.uid() = patient_id)', v_table, v_table);
            
            -- DELETE: Users delete own
            EXECUTE format('CREATE POLICY "Users delete own %I" ON private_health_info.%I 
                           FOR DELETE USING (auth.uid() = patient_id)', v_table, v_table);
            
            INSERT INTO overhaul_log VALUES 
                (DEFAULT, 'private_health_info', v_table, 'ALL_OPS', 'SUCCESS', 'Created SELECT/INSERT/UPDATE/DELETE policies');
        END IF;
    END LOOP;
END $$;

-- Tables with user_id
DO $$
DECLARE
    v_table TEXT;
    v_tables TEXT[] := ARRAY[
        'user_conditions', 'user_medications', 'patient_phi', 'clinician_phi',
        'medication_logs', 'basal_temperature_logs', 'patient_onboarding_data',
        'clinician_onboarding_data', 'tracking_entries', 'menstrual_cycle_logs',
        'seizure_logs_research'
    ];
BEGIN
    FOREACH v_table IN ARRAY v_tables
    LOOP
        IF EXISTS (SELECT 1 FROM information_schema.tables 
                   WHERE table_schema = 'private_health_info' AND table_name = v_table) THEN
            
            -- SELECT: Users see own
            EXECUTE format('CREATE POLICY "Users view own %I" ON private_health_info.%I 
                           FOR SELECT USING (auth.uid() = user_id)', v_table, v_table);
            
            -- INSERT: Users insert own
            EXECUTE format('CREATE POLICY "Users insert own %I" ON private_health_info.%I 
                           FOR INSERT WITH CHECK (auth.uid() = user_id)', v_table, v_table);
            
            -- UPDATE: Users update own
            EXECUTE format('CREATE POLICY "Users update own %I" ON private_health_info.%I 
                           FOR UPDATE USING (auth.uid() = user_id) 
                           WITH CHECK (auth.uid() = user_id)', v_table, v_table);
            
            -- DELETE: Users delete own
            EXECUTE format('CREATE POLICY "Users delete own %I" ON private_health_info.%I 
                           FOR DELETE USING (auth.uid() = user_id)', v_table, v_table);
            
            INSERT INTO overhaul_log VALUES 
                (DEFAULT, 'private_health_info', v_table, 'ALL_OPS', 'SUCCESS', 'Created SELECT/INSERT/UPDATE/DELETE policies');
        END IF;
    END LOOP;
END $$;

-- Special case: menstrual_log_symptoms (junction table)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables 
               WHERE table_schema = 'private_health_info' AND table_name = 'menstrual_log_symptoms') THEN
        
        -- Users can manage symptoms for their own logs
        EXECUTE 'CREATE POLICY "Users manage own symptoms" ON private_health_info.menstrual_log_symptoms 
                 FOR ALL USING (
                     EXISTS (
                         SELECT 1 FROM private_health_info.menstrual_cycle_logs 
                         WHERE id = menstrual_log_symptoms.log_id 
                         AND user_id = auth.uid()
                     )
                 ) WITH CHECK (
                     EXISTS (
                         SELECT 1 FROM private_health_info.menstrual_cycle_logs 
                         WHERE id = menstrual_log_symptoms.log_id 
                         AND user_id = auth.uid()
                     )
                 )';
        
        INSERT INTO overhaul_log VALUES 
            (DEFAULT, 'private_health_info', 'menstrual_log_symptoms', 'ALL', 'SUCCESS', 'Created ALL policy for junction table');
    END IF;
END $$;

-- ==========================================
-- STEP 3: CREATE POLICIES FOR clinical SCHEMA
-- ==========================================

-- Tables with patient_id (clinical data)
DO $$
DECLARE
    v_table TEXT;
    v_tables TEXT[] := ARRAY[
        'patient_risk_alerts', 'patient_snapshots', 'case_data_panels',
        'clinical_notes_exports', 'clinical_scale_results', 
        'neuro_imaging_results', 'patient_pro_timeline'
    ];
BEGIN
    FOREACH v_table IN ARRAY v_tables
    LOOP
        IF EXISTS (SELECT 1 FROM information_schema.tables 
                   WHERE table_schema = 'clinical' AND table_name = v_table) THEN
            
            -- SELECT: Patients see own, clinicians see connected patients
            EXECUTE format('CREATE POLICY "Patients view own %I" ON clinical.%I 
                           FOR SELECT USING (auth.uid() = patient_id)', v_table, v_table);
            
            EXECUTE format('CREATE POLICY "Clinicians view patient %I" ON clinical.%I 
                           FOR SELECT USING (
                               EXISTS (
                                   SELECT 1 FROM public.patient_clinician_connections 
                                   WHERE patient_id = %I.patient_id 
                                   AND clinician_id = auth.uid() 
                                   AND status = ''active''
                               )
                           )', v_table, v_table, v_table);
            
            -- INSERT: Only clinicians can insert for their patients
            EXECUTE format('CREATE POLICY "Clinicians insert for patients" ON clinical.%I 
                           FOR INSERT WITH CHECK (
                               EXISTS (
                                   SELECT 1 FROM public.patient_clinician_connections 
                                   WHERE patient_id = %I.patient_id 
                                   AND clinician_id = auth.uid() 
                                   AND status = ''active''
                               )
                           )', v_table, v_table);
            
            -- UPDATE: Clinicians update for their patients
            EXECUTE format('CREATE POLICY "Clinicians update patient data" ON clinical.%I 
                           FOR UPDATE USING (
                               EXISTS (
                                   SELECT 1 FROM public.patient_clinician_connections 
                                   WHERE patient_id = %I.patient_id 
                                   AND clinician_id = auth.uid() 
                                   AND status = ''active''
                               )
                           ) WITH CHECK (
                               EXISTS (
                                   SELECT 1 FROM public.patient_clinician_connections 
                                   WHERE patient_id = %I.patient_id 
                                   AND clinician_id = auth.uid() 
                                   AND status = ''active''
                               )
                           )', v_table, v_table, v_table);
            
            -- DELETE: Clinicians can delete (with caution)
            EXECUTE format('CREATE POLICY "Clinicians delete patient data" ON clinical.%I 
                           FOR DELETE USING (
                               EXISTS (
                                   SELECT 1 FROM public.patient_clinician_connections 
                                   WHERE patient_id = %I.patient_id 
                                   AND clinician_id = auth.uid() 
                                   AND status = ''active''
                               )
                           )', v_table, v_table);
            
            INSERT INTO overhaul_log VALUES 
                (DEFAULT, 'clinical', v_table, 'ALL_OPS', 'SUCCESS', 'Created SELECT/INSERT/UPDATE/DELETE policies');
        END IF;
    END LOOP;
END $$;

-- Tables with clinician_id
DO $$
DECLARE
    v_table TEXT;
    v_tables TEXT[] := ARRAY['ai_insights_cards', 'clinician_today_view'];
BEGIN
    FOREACH v_table IN ARRAY v_tables
    LOOP
        IF EXISTS (SELECT 1 FROM information_schema.tables 
                   WHERE table_schema = 'clinical' AND table_name = v_table) THEN
            
            -- Clinicians manage their own data
            EXECUTE format('CREATE POLICY "Clinicians manage own %I" ON clinical.%I 
                           FOR ALL USING (auth.uid() = clinician_id) 
                           WITH CHECK (auth.uid() = clinician_id)', v_table, v_table);
            
            INSERT INTO overhaul_log VALUES 
                (DEFAULT, 'clinical', v_table, 'ALL', 'SUCCESS', 'Created ALL policy for clinician-owned table');
        END IF;
    END LOOP;
END $$;

-- Special case: patient_collab_chat
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables 
               WHERE table_schema = 'clinical' AND table_name = 'patient_collab_chat') THEN
        
        -- SELECT: Participants can view
        EXECUTE 'CREATE POLICY "Participants view chat" ON clinical.patient_collab_chat 
                 FOR SELECT USING (
                     auth.uid() = patient_id OR
                     auth.uid() = sender_id OR
                     EXISTS (
                         SELECT 1 FROM public.patient_clinician_connections 
                         WHERE patient_id = patient_collab_chat.patient_id 
                         AND clinician_id = auth.uid() 
                         AND status = ''active''
                     )
                 )';
        
        -- INSERT: Participants can send messages
        EXECUTE 'CREATE POLICY "Participants send messages" ON clinical.patient_collab_chat 
                 FOR INSERT WITH CHECK (
                     auth.uid() = sender_id AND (
                         auth.uid() = patient_id OR
                         EXISTS (
                             SELECT 1 FROM public.patient_clinician_connections 
                             WHERE patient_id = patient_collab_chat.patient_id 
                             AND clinician_id = auth.uid() 
                             AND status = ''active''
                         )
                     )
                 )';
        
        -- UPDATE: Senders can update their messages
        EXECUTE 'CREATE POLICY "Senders update messages" ON clinical.patient_collab_chat 
                 FOR UPDATE USING (auth.uid() = sender_id) 
                 WITH CHECK (auth.uid() = sender_id)';
        
        -- DELETE: Senders can delete their messages
        EXECUTE 'CREATE POLICY "Senders delete messages" ON clinical.patient_collab_chat 
                 FOR DELETE USING (auth.uid() = sender_id)';
        
        INSERT INTO overhaul_log VALUES 
            (DEFAULT, 'clinical', 'patient_collab_chat', 'ALL_OPS', 'SUCCESS', 'Created specialized chat policies');
    END IF;
END $$;

-- ==========================================
-- STEP 4: CREATE POLICIES FOR public SCHEMA
-- ==========================================

-- Profiles tables
DO $$
DECLARE
    v_table TEXT;
    v_tables TEXT[] := ARRAY[
        'patient_profiles', 'clinician_profiles', 'carer_profiles',
        'notification_preferences', 'user_points', 'user_achievements', 
        'research_consent'
    ];
BEGIN
    FOREACH v_table IN ARRAY v_tables
    LOOP
        IF EXISTS (SELECT 1 FROM information_schema.tables 
                   WHERE table_schema = 'public' AND table_name = v_table) THEN
            
            -- Users manage their own profiles
            EXECUTE format('CREATE POLICY "Users manage own %I" ON public.%I 
                           FOR ALL USING (auth.uid() = user_id) 
                           WITH CHECK (auth.uid() = user_id)', v_table, v_table);
            
            INSERT INTO overhaul_log VALUES 
                (DEFAULT, 'public', v_table, 'ALL', 'SUCCESS', 'Created ALL policy for user-owned table');
        END IF;
    END LOOP;
END $$;

-- Special: profiles table (uses 'id' instead of 'user_id')
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables 
               WHERE table_schema = 'public' AND table_name = 'profiles') THEN
        
        EXECUTE 'CREATE POLICY "Users manage own profile" ON public.profiles 
                 FOR ALL USING (auth.uid() = id) 
                 WITH CHECK (auth.uid() = id)';
        
        INSERT INTO overhaul_log VALUES 
            (DEFAULT, 'public', 'profiles', 'ALL', 'SUCCESS', 'Created ALL policy for profiles table');
    END IF;
END $$;

-- Connection tables (read-only for participants)
DO $$
DECLARE
    v_table TEXT;
    v_tables TEXT[] := ARRAY['patient_clinician_connections', 'carer_relationships'];
BEGIN
    FOREACH v_table IN ARRAY v_tables
    LOOP
        IF EXISTS (SELECT 1 FROM information_schema.tables 
                   WHERE table_schema = 'public' AND table_name = v_table) THEN
            
            IF v_table = 'patient_clinician_connections' THEN
                -- Both parties can view their connections
                EXECUTE 'CREATE POLICY "Participants view connections" ON public.patient_clinician_connections 
                         FOR SELECT USING (
                             auth.uid() = patient_id OR 
                             auth.uid() = clinician_id
                         )';
                
                -- Only system/admin can modify (handled elsewhere)
                
            ELSIF v_table = 'carer_relationships' THEN
                -- Participants can view
                EXECUTE 'CREATE POLICY "Participants view relationships" ON public.carer_relationships 
                         FOR SELECT USING (
                             auth.uid() = patient_id OR 
                             auth.uid() = carer_id
                         )';
            END IF;
            
            INSERT INTO overhaul_log VALUES 
                (DEFAULT, 'public', v_table, 'SELECT', 'SUCCESS', 'Created SELECT policy for connection table');
        END IF;
    END LOOP;
END $$;

COMMIT;

-- ==========================================
-- VERIFICATION & RESULTS
-- ==========================================

-- 1. Summary of actions
SELECT 
    '📊 OVERHAUL SUMMARY' as report,
    schema_name,
    COUNT(DISTINCT table_name) as tables_processed,
    COUNT(*) as policies_created,
    STRING_AGG(DISTINCT operation, ', ') as operations
FROM overhaul_log
WHERE action = 'SUCCESS'
GROUP BY schema_name
ORDER BY schema_name;

-- 2. Check for duplicates
WITH policy_counts AS (
    SELECT 
        schemaname,
        tablename,
        cmd,
        COUNT(*) as policy_count
    FROM pg_policies
    WHERE schemaname IN ('private_health_info', 'clinical', 'public')
    AND policyname NOT LIKE '%System%'
    AND policyname NOT LIKE '%Service%'
    GROUP BY schemaname, tablename, cmd
)
SELECT 
    '🔍 DUPLICATE CHECK' as report,
    schemaname,
    tablename,
    cmd,
    policy_count,
    CASE 
        WHEN policy_count > 2 THEN '⚠️ Multiple policies'
        WHEN policy_count = 2 THEN '✅ Expected (user + clinician)'
        ELSE '✅ Single policy'
    END as status
FROM policy_counts
WHERE policy_count > 2
ORDER BY policy_count DESC, schemaname, tablename;

-- 3. Verify no missing WITH CHECK
SELECT 
    '✅ WITH CHECK VERIFICATION' as report,
    COUNT(*) as policies_without_check
FROM pg_policies
WHERE schemaname IN ('private_health_info', 'clinical', 'public')
AND cmd IN ('INSERT', 'UPDATE', 'ALL')
AND (with_check IS NULL OR with_check = 'true')
AND policyname NOT LIKE '%System%'
AND policyname NOT LIKE '%Service%';

-- 4. Final status
SELECT 
    '🎯 FINAL STATUS' as report,
    CASE 
        WHEN (SELECT COUNT(*) FROM overhaul_log WHERE action = 'FAILED') > 0 
        THEN '⚠️ Some operations failed - check log'
        WHEN (SELECT COUNT(*) FROM policy_counts WHERE policy_count > 2) > 0
        THEN '⚠️ Some duplicates remain - review above'
        WHEN (SELECT COUNT(*) FROM pg_policies 
              WHERE schemaname IN ('private_health_info', 'clinical', 'public')
              AND cmd IN ('INSERT', 'UPDATE', 'ALL')
              AND (with_check IS NULL OR with_check = 'true')
              AND policyname NOT LIKE '%System%') > 0
        THEN '⚠️ Some policies missing WITH CHECK'
        ELSE '✅✅✅ COMPLETE SUCCESS! All RLS policies properly configured!'
    END as status,
    (SELECT COUNT(*) FROM overhaul_log WHERE action = 'SUCCESS') as successful_operations,
    (SELECT COUNT(*) FROM overhaul_log WHERE action = 'FAILED') as failed_operations,
    (SELECT COUNT(DISTINCT schemaname || '.' || tablename) 
     FROM pg_policies 
     WHERE schemaname IN ('private_health_info', 'clinical', 'public')) as total_tables_with_policies;

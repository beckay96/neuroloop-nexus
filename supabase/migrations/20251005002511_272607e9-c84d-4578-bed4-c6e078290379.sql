-- ============================================================================
-- CRITICAL RLS POLICIES FOR ONBOARDING AND CORE FUNCTIONALITY
-- ============================================================================

-- 1. PROFILES TABLE - Users must be able to update their own profile
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- 2. PATIENT_PROFILES TABLE - Already has correct RLS, but ensure it works
-- (Policies already exist: "Users manage own data")

-- 3. PATIENT_ONBOARDING_DATA - Critical for onboarding completion
CREATE POLICY "Users can view own onboarding data"
ON public.patient_onboarding_data FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own onboarding data"
ON public.patient_onboarding_data FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own onboarding data"
ON public.patient_onboarding_data FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- 4. CARER_PROFILES - For carer onboarding
CREATE POLICY "Users can view own carer profile"
ON public.carer_profiles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own carer profile"
ON public.carer_profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own carer profile"
ON public.carer_profiles FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- 5. CARER_RELATIONSHIPS - For carer-patient connections
CREATE POLICY "Users can view their carer relationships"
ON public.carer_relationships FOR SELECT
TO authenticated
USING (auth.uid() = patient_user_id OR auth.uid() = carer_user_id);

CREATE POLICY "Patients can create carer relationships"
ON public.carer_relationships FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = patient_user_id);

CREATE POLICY "Users can update their carer relationships"
ON public.carer_relationships FOR UPDATE
TO authenticated
USING (auth.uid() = patient_user_id OR auth.uid() = carer_user_id);

-- 6. PATIENT_CLINICIAN_CONNECTIONS - For clinician-patient connections
CREATE POLICY "Users can view their clinician connections"
ON public.patient_clinician_connections FOR SELECT
TO authenticated
USING (auth.uid() = patient_id OR auth.uid() = clinician_id);

CREATE POLICY "Clinicians can create connections"
ON public.patient_clinician_connections FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = clinician_id);

CREATE POLICY "Users can update their connections"
ON public.patient_clinician_connections FOR UPDATE
TO authenticated
USING (auth.uid() = patient_id OR auth.uid() = clinician_id);

-- 7. USER_ACHIEVEMENTS - For gamification
CREATE POLICY "Users can view own achievements"
ON public.user_achievements FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own achievements"
ON public.user_achievements FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 8. RESEARCH_USER_MAPPING - Protect research anonymization
CREATE POLICY "No direct access to research mapping"
ON public.research_user_mapping FOR SELECT
TO authenticated
USING (false);

-- Only allow system (via security definer functions) to write
CREATE POLICY "System only can insert research mapping"
ON public.research_user_mapping FOR INSERT
TO authenticated
WITH CHECK (false);
# 🔍 FULL APPLICATION AUDIT CHECKLIST

**Date:** 2025-01-06 02:27 AM  
**Purpose:** Complete audit of all pages, components, and database references after PHI schema migration  
**Status:** 🚨 REQUIRES COMPREHENSIVE REVIEW

---

## ⚠️ CRITICAL ISSUE FOUND

### Database State
```
✅ Schemas Created:
- linkage (1 table: research_id_map)
- private_health_info (2 tables: patient_phi, clinician_phi)
- clinical (10 tables: all premium features)
- public (2 tables: patient_clinician_connections, carer_relationships)

❌ MISSING from public schema:
- profiles
- patient_profiles
- carer_profiles
- clinician_profiles (moved to PHI schema as clinician_phi)
- onboarding_progress
- patient_onboarding_data
- clinician_onboarding_data
- carer_onboarding_data
- conditions
- medications
- user_conditions
- user_medications
- tracking_entries
- user_points
- achievements
- user_achievements
- security_incidents
- audit_log
- patient_invitations
- carer_invitations
```

**ACTION REQUIRED:** Need to create/migrate all missing public tables OR update frontend to use new schema structure.

---

## 📋 AUDIT CHECKLIST

### ✅ = Verified & Working  
### ⏳ = Needs Review  
### ❌ = Broken / Needs Fix  
### 🔄 = Needs Migration to New Schema

---

## 1. AUTHENTICATION & AUTH FLOW

### Pages
- [ ] ⏳ `/src/pages/Login.tsx`
  - Check: Supabase auth calls
  - Check: Profile creation on signup
  - Check: Role-based redirection
  - **Action:** Verify creates profile in public.profiles

- [ ] ⏳ `/src/pages/Signup.tsx`
  - Check: User registration flow
  - Check: user_type metadata
  - Check: Trigger for auto-profile creation
  - **Action:** Verify handle_new_user() trigger works

- [ ] ⏳ `/src/components/ProtectedRoute.tsx`
  - Check: Auth state checks
  - Check: Profile queries
  - Check: Role-based access
  - **Action:** Verify queries correct schema

### Hooks
- [ ] ⏳ `/src/hooks/useAuth.tsx`
  - Check: Profile queries
  - Check: User type detection
  - Check: Onboarding status
  - **Action:** Update to query public.profiles

### Database Dependencies
```sql
Required Tables:
- auth.users (Supabase native) ✅
- public.profiles (MISSING ❌)
- public.onboarding_progress (MISSING ❌)
```

---

## 2. ONBOARDING FLOWS

### Patient Onboarding
- [ ] 🔄 `/src/pages/PatientOnboarding.tsx`
  - **Current:** Saves to `patient_onboarding_data`
  - **Issue:** Table missing from public schema
  - **Action:** 
    - Create public.patient_onboarding_data table
    - Verify references to patient_profiles
    - Update to save PHI to private_health_info.patient_phi

- [ ] 🔄 `/src/components/onboarding/PatientOnboarding.tsx`
  - Check: Form fields vs database columns
  - Check: Condition selection
  - Check: Research consent
  - **Action:** Map PHI fields to private_health_info.patient_phi

- [ ] 🔄 `/src/hooks/usePatientOnboarding.tsx`
  - Check: Database mutations
  - Check: Complete onboarding function call
  - **Action:** Update to use complete_onboarding() RPC

### Clinician Onboarding
- [ ] 🔄 `/src/pages/ClinicianOnboarding.tsx`
  - **Current:** Saves to `clinician_onboarding_data`
  - **Issue:** Table missing
  - **Action:** Create table, update PHI saves

- [ ] 🔄 `/src/components/onboarding/ClinicianOnboarding.tsx`
  - Check: Professional info fields
  - Check: License/credential fields
  - **Action:** Map to private_health_info.clinician_phi

- [ ] 🔄 `/src/hooks/useClinicianOnboarding.tsx`
  - Check: Mutations
  - **Action:** Update schema references

### Carer Onboarding
- [ ] 🔄 `/src/pages/CarerOnboarding.tsx`
  - **Current:** Saves to `carer_onboarding_data`
  - **Issue:** Table missing
  - **Action:** Create table

- [ ] 🔄 `/src/components/onboarding/CarerOnboarding.tsx`
  - Check: Form fields
  - **Action:** Verify schema

- [ ] 🔄 `/src/hooks/useCarerOnboarding.tsx`
  - Check: Mutations
  - **Action:** Update references

### Researcher Onboarding
- [ ] 🔄 `/src/pages/ResearcherOnboarding.tsx`
  - **Action:** Create researcher_onboarding_data table

- [ ] 🔄 `/src/components/onboarding/ResearcherOnboarding.tsx`
  - **Action:** Verify schema

- [ ] 🔄 `/src/hooks/useResearcherOnboarding.tsx`
  - **Action:** Update references

### Database Dependencies
```sql
Required Tables (ALL MISSING ❌):
- public.profiles
- public.patient_profiles
- public.carer_profiles
- public.patient_onboarding_data
- public.clinician_onboarding_data
- public.carer_onboarding_data
- public.researcher_onboarding_data
- public.onboarding_progress
- public.conditions (for selection)
- private_health_info.patient_phi (EXISTS ✅)
- private_health_info.clinician_phi (EXISTS ✅)
```

---

## 3. DASHBOARD PAGES

### Patient Dashboard
- [ ] ⏳ `/src/pages/PatientDashboard.tsx`
  - Check: Profile queries
  - Check: Tracking data queries
  - Check: Medication/condition displays
  - **Action:** Update to query correct schemas

- [ ] ⏳ `/src/components/patient/ManageCarers.tsx`
  - Check: carer_relationships queries
  - Check: carer_invitations queries
  - **Action:** Verify relationship table exists (EXISTS ✅)

### Clinician Dashboard
- [ ] ❌ `/src/pages/ClinicianDashboard.tsx`
  - **Issue:** No clinical schema tables queried yet
  - **Action:** Implement 10 premium features:
    1. patient_risk_alerts (Live Radar)
    2. clinician_today_view (Today View)
    3. clinical_scale_results
    4. neuro_imaging_results
    5. patient_snapshots
    6. clinical_notes_exports
    7. patient_collab_chat
    8. patient_pro_timeline
    9. case_data_panels
    10. ai_insights_cards

- [ ] ⏳ `/src/components/clinician/InvitePatientDialog.tsx`
  - Check: patient_invitations table reference
  - **Action:** Verify table exists (MISSING ❌)

### Carer Dashboard
- [ ] ⏳ `/src/pages/CarerDashboard.tsx`
  - Check: carer_relationships queries
  - Check: Patient data access (via relationship)
  - **Action:** Verify RLS policies allow access

### Researcher Dashboard
- [ ] ❌ `/src/pages/ResearcherDashboard.tsx`
  - **Issue:** No research data queries implemented
  - **Action:** 
    - Use get_research_id() function
    - Query only de-identified data
    - Never expose linkage table

### Database Dependencies
```sql
Patient Dashboard:
- public.profiles (MISSING ❌)
- public.patient_profiles (MISSING ❌)
- public.tracking_entries (MISSING ❌)
- public.user_medications (MISSING ❌)
- public.user_conditions (MISSING ❌)
- public.user_points (MISSING ❌)
- public.carer_relationships (EXISTS ✅)

Clinician Dashboard:
- clinical.* (ALL 10 tables) (EXISTS ✅)
- public.patient_clinician_connections (EXISTS ✅)
- private_health_info.patient_phi (for DOB, etc.) (EXISTS ✅)

Carer Dashboard:
- public.carer_relationships (EXISTS ✅)
- Via relationship: patient data

Researcher Dashboard:
- public.get_research_id() function (EXISTS ✅)
- linkage.research_id_map (EXISTS ✅ - BUT NO API ACCESS)
```

---

## 4. INVITE SYSTEM

### Patient Invite Pages
- [ ] ⏳ `/src/pages/invite/PatientInvite.tsx`
  - Check: patient_invitations query
  - Check: accept_invitation() function call
  - **Action:** Verify table & function exist (MISSING ❌)

### Carer Invite Pages
- [ ] ⏳ `/src/pages/invite/CarerInvite.tsx`
  - Check: carer_invitations query
  - Check: verify_carer_dob_and_accept() function
  - **Action:** Verify table & function exist (MISSING ❌)

### Hooks
- [ ] ⏳ `/src/hooks/useInvitePatient.tsx`
  - Check: Edge Function call
  - **Action:** Deploy Edge Function

- [ ] ⏳ `/src/hooks/useInviteCarer.tsx`
  - Check: Edge Function call
  - **Action:** Deploy Edge Function

- [ ] ⏳ `/src/hooks/useVerifyCarerDOB.tsx`
  - Check: Edge Function call
  - **Action:** Deploy Edge Function

### Database Dependencies
```sql
Required (ALL MISSING ❌):
- public.patient_invitations
- public.carer_invitations
- public.accept_invitation() function
- public.verify_carer_dob_and_accept() function
- public.hash_email() function

Edge Functions (NOT DEPLOYED ⏳):
- invite_patient
- invite_carer
- verify_carer_dob
```

---

## 5. TRACKING & WELLNESS

### Components
- [ ] ⏳ `/src/components/tracking/*`
  - Check: tracking_entries queries
  - Check: Daily tracking preferences
  - **Action:** Verify tables exist (MISSING ❌)

### Hooks
- [ ] ⏳ `/src/hooks/useTracking.tsx`
  - Check: Mutations to tracking_entries
  - **Action:** Verify schema

### Database Dependencies
```sql
Required (ALL MISSING ❌):
- public.tracking_entries
- public.user_conditions
- public.conditions
- public.tracking_features (enum/table)
```

---

## 6. GAMIFICATION

### Components
- [ ] ⏳ `/src/components/gamification/*`
  - Check: user_points queries
  - Check: achievements queries
  - Check: user_achievements queries
  - **Action:** Verify tables exist (MISSING ❌)

### Database Dependencies
```sql
Required (ALL MISSING ❌):
- public.user_points
- public.achievements
- public.user_achievements
- public.streaks (if exists)
```

---

## 7. MEDICATIONS & CONDITIONS

### Components
- [ ] ⏳ `/src/components/medications/*`
  - Check: user_medications queries
  - Check: medications reference table
  - **Action:** Verify tables (MISSING ❌)

- [ ] ⏳ `/src/components/conditions/*`
  - Check: user_conditions queries
  - Check: conditions reference table
  - **Action:** Verify tables (MISSING ❌)

### Database Dependencies
```sql
Required (ALL MISSING ❌):
- public.medications
- public.user_medications
- public.conditions
- public.user_conditions
```

---

## 8. SECURITY & AUDIT

### Components
- [ ] ⏳ Security incident logging
  - Check: security_incidents table writes
  - **Action:** Verify table (MISSING ❌)

- [ ] ⏳ Audit logging
  - Check: audit_log table writes
  - **Action:** Verify table (MISSING ❌)

### Database Dependencies
```sql
Required (ALL MISSING ❌):
- public.security_incidents
- public.audit_log
```

---

## 9. RESEARCH & EXPORTS

### Components
- [ ] ❌ Research data export (NOT IMPLEMENTED)
  - **Action:** Build research export pipeline
  - **Action:** Use get_research_id() for all exports
  - **Action:** Never expose linkage table

### Database Dependencies
```sql
Required (EXISTS ✅):
- public.get_research_id() function
- linkage.research_id_map (NO API ACCESS)
- public.research_consent
```

---

## 10. PREMIUM CLINICAL FEATURES (NOT IMPLEMENTED YET)

### Features to Build
- [ ] ❌ **Live Patient Radar** - `clinical.patient_risk_alerts`
- [ ] ❌ **Smart Summaries** - `clinical.patient_snapshots`
- [ ] ❌ **Clinical Scales** - `clinical.clinical_scale_results`
- [ ] ❌ **Neuroimaging** - `clinical.neuro_imaging_results`
- [ ] ❌ **1-Click Notes** - `clinical.clinical_notes_exports`
- [ ] ❌ **Secure Chat** - `clinical.patient_collab_chat`
- [ ] ❌ **Patient PROs** - `clinical.patient_pro_timeline`
- [ ] ❌ **Case Panels** - `clinical.case_data_panels`
- [ ] ❌ **Today View** - `clinical.clinician_today_view`
- [ ] ❌ **AI Insights** - `clinical.ai_insights_cards`

**Action:** All tables exist in clinical schema ✅, need frontend implementation

---

## 11. EDGE FUNCTIONS

### Functions to Deploy
- [ ] ⏳ `invite_patient` - Create patient invitations
- [ ] ⏳ `invite_carer` - Create carer invitations
- [ ] ⏳ `verify_carer_dob` - DOB verification

**Location:** `/supabase/functions/`  
**Action:** Deploy all 3 functions to Supabase

---

## 🚨 CRITICAL ACTIONS REQUIRED

### 1. Create Missing Public Schema Tables ❌ URGENT
```sql
Tables to create in PUBLIC schema:
- profiles (first_name, last_name, user_type, onboarding_completed, research_user_id)
- patient_profiles (references PHI in private_health_info.patient_phi)
- carer_profiles
- clinician_profiles (references PHI in private_health_info.clinician_phi)
- researcher_profiles
- onboarding_progress
- patient_onboarding_data
- clinician_onboarding_data
- carer_onboarding_data
- researcher_onboarding_data
- conditions (reference table)
- medications (reference table)
- user_conditions
- user_medications
- tracking_entries
- user_points
- achievements
- user_achievements
- security_incidents
- audit_log
- patient_invitations
- carer_invitations
```

### 2. Create Missing Functions ❌ URGENT
```sql
Functions to create:
- public.complete_onboarding(user_id, user_type)
- public.accept_invitation(invitation_token, patient_id)
- public.verify_carer_dob_and_accept(invitation_token, carer_user_id, provided_dob)
- public.hash_email(email)
```

### 3. Update Frontend References ⏳
- Search all `.tsx` and `.ts` files for table references
- Update to use correct schema (public vs private_health_info vs clinical)
- Update PHI queries to use private_health_info schema

### 4. Deploy Edge Functions ⏳
- Deploy 3 invite system Edge Functions
- Set APP_URL environment variable

### 5. Build Premium Features ⏳
- Implement 10 clinical features (UI + backend integration)
- All tables exist, need frontend

---

## 📊 AUDIT SUMMARY

### Database Status
- ✅ **Schemas Created:** 4/4 (linkage, private_health_info, clinical, public)
- ✅ **PHI Tables:** 2/2 (patient_phi, clinician_phi)
- ✅ **Clinical Tables:** 10/10 (all premium features)
- ✅ **Relationship Tables:** 2/2 (patient_clinician_connections, carer_relationships)
- ❌ **Public Tables:** 2/30+ (MOST MISSING)
- ❌ **Functions:** 1/5 (only get_research_id exists)

### Frontend Status
- ⏳ **Auth Flow:** Needs verification
- ⏳ **Onboarding:** Needs schema updates
- ⏳ **Dashboards:** Needs table verification
- ❌ **Invite System:** Tables/functions missing
- ❌ **Premium Features:** Not implemented
- ⏳ **Tracking:** Tables missing
- ⏳ **Gamification:** Tables missing

### Edge Functions
- ❌ **Not Deployed:** 0/3

---

## 🎯 RECOMMENDED ACTION PLAN

### Phase 1: Fix Critical Database Issues (URGENT)
1. Create all missing public schema tables
2. Create all missing database functions
3. Verify trigger for auto-profile creation
4. Test onboarding flow end-to-end

### Phase 2: Update Frontend (HIGH PRIORITY)
1. Audit all database queries in components/hooks
2. Update schema references (public vs private_health_info)
3. Map PHI fields to private_health_info schema
4. Test each page/component

### Phase 3: Deploy Edge Functions (HIGH PRIORITY)
1. Deploy 3 invite functions
2. Set environment variables
3. Test invite flows

### Phase 4: Build Premium Features (MEDIUM PRIORITY)
1. Implement 10 clinical features one by one
2. Tables exist, build UI
3. Test with real data

### Phase 5: Research Pipeline (LOW PRIORITY)
1. Build research export functionality
2. Create IRB procedures document
3. Implement consent management

---

## ✅ NEXT IMMEDIATE STEPS

1. **Create comprehensive migration** for all missing public tables
2. **Create migration** for all missing functions
3. **Update frontend** to reference correct schemas
4. **Deploy Edge Functions**
5. **Test onboarding flow** end-to-end

---

**STATUS:** 🚨 SIGNIFICANT WORK REQUIRED

The architecture is solid, but we need to:
1. Fill in missing public schema tables
2. Update all frontend references
3. Deploy Edge Functions
4. Build premium feature UIs

**Estimated Time:**
- Phase 1: 2-3 hours
- Phase 2: 4-6 hours
- Phase 3: 1 hour
- Phase 4: 20-30 hours
- Phase 5: 10-15 hours

**Total:** ~40-55 hours of development work

---

**This audit reveals we're about 30% complete on the full system.**  
**Priority: Fix database tables and functions FIRST, then update frontend.** 🚀

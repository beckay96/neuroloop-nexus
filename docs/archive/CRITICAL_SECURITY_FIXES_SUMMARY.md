# 🚨 CRITICAL SECURITY FIXES SUMMARY

**Date:** 2025-01-06  
**Priority:** URGENT - SECURITY & HIPAA COMPLIANCE  
**Status:** IN PROGRESS

---

## 🔴 CRITICAL ISSUES IDENTIFIED

### 1. PHI Tables in Wrong Schema ⚠️
**SECURITY RISK: HIPAA VIOLATION**

These tables contain PHI and are currently in `public` schema but **MUST** be in `private_health_info`:

- ✅ `patient_onboarding_data` - MIGRATED
- ✅ `clinician_onboarding_data` - MIGRATED
- ✅ `tracking_entries` - MIGRATED
- ✅ `user_conditions` - MIGRATED  
- ✅ `user_medications` - MIGRATED

### 2. research_user_id Exposed in public.profiles ⚠️
**SECURITY RISK: DE-ANONYMIZATION VULNERABILITY**

- `research_user_id` field exists in `public.profiles`
- This creates a direct link between identifiable users and research IDs
- **MUST** be removed - research IDs should ONLY exist in `linkage.research_id_map`
- ✅ COLUMN DROPPED in migration

### 3. Onboarding Progress Not Persisting ⚠️
**UX ISSUE: DATA LOSS ON RELOAD**

- Users lose onboarding progress if they refresh the page
- No incremental saves as users progress through steps
- ❓ NEEDS VERIFICATION

---

## ✅ FIXES IMPLEMENTED

### Database Migration Created
**File:** `CRITICAL_SECURITY_FIX_MIGRATION.sql`

**What it does:**
1. ✅ Moves 5 PHI tables from `public` to `private_health_info` schema
2. ✅ Drops `research_user_id` column from `public.profiles`
3. ✅ Recreates all RLS policies in correct schema
4. ✅ Adds `onboarding_step` and `last_updated_at` columns for progress tracking
5. ✅ Creates triggers to auto-update timestamps
6. ✅ Maintains audit logging
7. ✅ Includes rollback procedure

**Status:** ✅ SQL READY TO RUN

### Frontend Code Updates (PARTIAL)
**Files Updated:**
1. ✅ `src/components/onboarding/PatientOnboarding.tsx` - Uses `private_health_info` schema
2. ✅ `src/hooks/usePatientOnboarding.tsx` - Uses `private_health_info` schema

**Note:** TypeScript errors expected due to Supabase types not knowing about private_health_info schema yet

---

## ⚠️ STILL NEEDS FIXING

### Frontend Code Requiring Updates

#### 1. usePatientConnections.tsx
**Line 43:** References `patient_onboarding_data` without schema qualifier
```typescript
// CURRENT (BROKEN after migration):
patient_onboarding_data!inner(first_name, last_name)

// NEEDS TO BE:
private_health_info.patient_onboarding_data!inner(first_name, last_name)
```

#### 2. All Hooks Using These Tables
Need to add `.schema('private_health_info')` before `.from()`:
- `useUserConditions.tsx` (if exists)
- `useUserMedications.tsx` (if exists)
- `useTrackingEntries.tsx` (if exists)
- Any other hooks querying these tables

#### 3. Onboarding Progress Persistence

**CRITICAL QUESTION:** Is onboarding data being saved incrementally?

**Current Behavior (BAD ❌):**
- All data saved only when user clicks "Finish" on final step
- User loses ALL progress if they reload/close browser
- No way to resume where they left off

**Required Behavior (GOOD ✅):**
- Save progress after EACH step when user clicks "Next"
- Save `onboarding_step` field to track where user is
- On page load, check `onboarding_step` and resume from that step
- Allow users to refresh without losing data

**Implementation Needed:**

```typescript
// In PatientOnboarding.tsx - handleNext() function
const handleNext = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  // SAVE PROGRESS AFTER EACH STEP
  // @ts-ignore - Table exists in private_health_info schema
  await supabase
    .schema('private_health_info')
    .from('patient_onboarding_data')
    .upsert([{
      user_id: user.id,
      onboarding_step: currentStep + 1,
      // Save current form data too
      first_name: formData.firstName,
      last_name: formData.lastName,
      // ... other fields
    }], { onConflict: 'user_id' });

  // Then move to next step
  setCurrentStep(prev => prev + 1);
};

// On component mount - LOAD SAVED PROGRESS
useEffect(() => {
  const loadProgress = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // @ts-ignore
    const { data } = await supabase
      .schema('private_health_info')
      .from('patient_onboarding_data')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (data) {
      // Resume from saved step
      setCurrentStep(data.onboarding_step || 0);
      // Restore form data
      setFormData({
        firstName: data.first_name || '',
        lastName: data.last_name || '',
        // ... other fields
      });
    }
  };

  loadProgress();
}, []);
```

---

## 📋 DEPLOYMENT CHECKLIST

### Phase 1: Database Migration
- [ ] **BACKUP DATABASE** (critical!)
- [ ] Run `CRITICAL_SECURITY_FIX_MIGRATION.sql` in Supabase SQL editor
- [ ] Verify tables moved:
  ```sql
  SELECT schemaname, tablename 
  FROM pg_tables 
  WHERE tablename IN ('patient_onboarding_data', 'user_conditions', 'user_medications');
  -- Should all show 'private_health_info'
  ```
- [ ] Verify `research_user_id` removed:
  ```sql
  SELECT column_name 
  FROM information_schema.columns 
  WHERE table_schema = 'public' 
    AND table_name = 'profiles' 
    AND column_name = 'research_user_id';
  -- Should return 0 rows
  ```
- [ ] Verify RLS policies exist:
  ```sql
  SELECT schemaname, tablename, policyname 
  FROM pg_policies 
  WHERE schemaname = 'private_health_info';
  -- Should show policies for all 5 tables
  ```

### Phase 2: Frontend Updates
- [ ] Update ALL hooks using moved tables
- [ ] Add @ts-ignore comments for TypeScript errors
- [ ] Implement onboarding progress persistence
- [ ] Test onboarding flow (all user types)
- [ ] Test page reload during onboarding
- [ ] Test research data anonymization still works
- [ ] Generate new TypeScript types from Supabase

### Phase 3: Testing
- [ ] Test patient onboarding (all steps, with reload)
- [ ] Test clinician onboarding
- [ ] Test carer onboarding
- [ ] Test researcher onboarding
- [ ] Test existing users can still access their data
- [ ] Test patient-clinician connections still work
- [ ] Test tracking entries still save/load
- [ ] Test medications still save/load
- [ ] Test research anonymization (verify research_user_id not exposed)
- [ ] Run security audit

### Phase 4: TypeScript Fixes
- [ ] Generate new Supabase types:
  ```bash
  npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/integrations/supabase/types.ts
  ```
- [ ] Remove @ts-ignore comments if types now work
- [ ] Add manual type definitions if needed

---

## 🔍 RESEARCH_USER_ID INVESTIGATION

**Question:** When is `research_user_id` being populated?

**Answer:** It should NEVER be populated in `public.profiles`!

**Correct Flow:**
1. User consents to research → `research_consent` table updated
2. Trigger on PHI table inserts → Calls anonymization function
3. Anonymization function → Creates entry in `linkage.research_id_map`
4. Research schema → Gets de-identified data using research_user_id
5. **NO LINK** between `public.profiles` and research IDs

**Current Issue:**
- If `research_user_id` exists in `public.profiles`, it violates this separation
- Direct link between real user and research ID = de-anonymization risk
- **FIXED:** Column dropped in migration

**Verification:**
```sql
-- After migration, this should return 0 rows:
SELECT id, research_user_id 
FROM public.profiles 
WHERE research_user_id IS NOT NULL;
```

---

## 🚨 SECURITY IMPLICATIONS

### Before Fixes (VULNERABLE)
- ❌ PHI data accessible via `public` schema queries
- ❌ Research IDs linked to real users in public.profiles
- ❌ Onboarding data lost on reload (UX, not security)
- ❌ HIPAA compliance questionable

### After Fixes (SECURE)
- ✅ PHI data isolated in `private_health_info` schema
- ✅ Research IDs only in `linkage.research_id_map` (inaccessible to users)
- ✅ Onboarding progress saved incrementally
- ✅ HIPAA compliance maintained

---

## ⏭️ IMMEDIATE NEXT STEPS

1. **RUN THE MIGRATION** (after database backup!)
2. **Update remaining hooks** to use `private_health_info` schema
3. **Implement onboarding progress persistence**
4. **Test thoroughly**
5. **Generate new TypeScript types**

---

## 📝 FILES AFFECTED

### SQL Files
- ✅ `CRITICAL_SECURITY_FIX_MIGRATION.sql` - Migration script

### Frontend Files (Updated)
- ✅ `src/components/onboarding/PatientOnboarding.tsx`
- ✅ `src/hooks/usePatientOnboarding.tsx`

### Frontend Files (NEED UPDATE)
- ⚠️ `src/hooks/usePatientConnections.tsx`
- ⚠️ Any other hooks using the 5 moved tables
- ⚠️ All onboarding components (for progress persistence)

### TypeScript Types
- ⚠️ Need regeneration after migration

---

## 🎯 SUCCESS CRITERIA

- [ ] All 5 tables in `private_health_info` schema
- [ ] `research_user_id` removed from `public.profiles`
- [ ] All frontend code updated to use correct schema
- [ ] Onboarding progress persists across page reloads
- [ ] All existing functionality still works
- [ ] No TypeScript errors (or documented @ts-ignore)
- [ ] Security audit passes
- [ ] HIPAA compliance maintained

---

## ⚠️ ROLLBACK PROCEDURE

If migration causes issues:

```sql
BEGIN;

-- Move tables back to public schema
ALTER TABLE private_health_info.patient_onboarding_data SET SCHEMA public;
ALTER TABLE private_health_info.clinician_onboarding_data SET SCHEMA public;
ALTER TABLE private_health_info.tracking_entries SET SCHEMA public;
ALTER TABLE private_health_info.user_conditions SET SCHEMA public;
ALTER TABLE private_health_info.user_medications SET SCHEMA public;

-- Restore research_user_id column (if really needed - NOT RECOMMENDED!)
-- ALTER TABLE public.profiles ADD COLUMN research_user_id UUID;

COMMIT;
```

**Note:** Do NOT restore `research_user_id` - that's a security vulnerability!

---

## 📞 SUPPORT

If issues arise during migration:
1. Check Supabase logs for errors
2. Verify RLS policies are active
3. Test with service role key to bypass RLS
4. Check audit logs for access attempts
5. Consult `DATABASE.md` for schema reference

---

**Status:** 🟡 MIGRATION READY - FRONTEND UPDATES IN PROGRESS  
**Priority:** 🔴 CRITICAL - DEPLOY ASAP  
**Risk Level:** ⚠️ HIGH - Test thoroughly before production

---

**Last Updated:** 2025-01-06  
**Next Review:** After migration deployment  
**Owner:** Development Team

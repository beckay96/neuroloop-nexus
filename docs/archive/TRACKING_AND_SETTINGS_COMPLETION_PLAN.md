# 🔧 TRACKING & SETTINGS COMPLETION PLAN

**Date:** 2025-01-06  
**Status:** 📋 ACTION PLAN  
**Priority:** HIGH - Core functionality needed

---

## 🚨 CRITICAL ISSUES FOUND

### 1. Tracking Hooks Using Wrong Table Names ❌

**Problem:** Hooks reference old table names that don't exist

**Current (WRONG):**
```typescript
.from('seizure_logs')      // ❌ Table doesn't exist
.from('tremor_logs')       // ❌ Table doesn't exist  
.from('gait_logs')         // ❌ Table doesn't exist
```

**Should Be:**
```typescript
.from('seizure_events')         // ✅ Correct - in private_health_info schema
.from('tremor_episodes')        // ✅ Correct - in private_health_info schema
.from('gait_episodes')          // ✅ Correct - in private_health_info schema
.from('daily_symptom_logs')     // ✅ Correct - in private_health_info schema
.from('clinical_media')         // ✅ Correct - in private_health_info schema
```

**Affected Files:**
- ❌ `src/hooks/useSeizureLogs.tsx` - Uses `seizure_logs` (wrong)
- ❌ `src/hooks/useGaitLogs.tsx` - Uses `gait_logs` (wrong)
- ❌ `src/hooks/useMedicationLogs.tsx` - Needs review
- ❌ `src/hooks/useMenstrualLogs.tsx` - Needs review
- ❌ `src/hooks/useSymptomLogs.tsx` - Uses `symptom_logs` (wrong)

### 2. Hook Interfaces Don't Match Database Schema ❌

**Problem:** TypeScript interfaces don't match actual table columns

**Example - Seizure Events:**

**Current Interface (WRONG):**
```typescript
interface SeizureLog {
  user_id: string;          // ❌ Column is 'patient_id'
  log_date: string;         // ❌ Column is 'occurred_at'
  // Missing many fields
}
```

**Correct Interface:**
```typescript
interface SeizureEvent {
  patient_id: string;                 // ✅
  occurred_at: string;                // ✅
  seizure_type: string;               // ✅
  duration_seconds: number;           // ✅
  severity: string;                   // ✅
  consciousness_level: string;        // ✅
  location_type?: string;             // ✅
  aura_present?: boolean;             // ✅
  triggers?: string[];                // ✅
  symptoms_before?: string[];         // ✅
  symptoms_during?: string[];         // ✅
  symptoms_after?: string[];          // ✅
  recovery_time_minutes?: number;     // ✅
  injury_occurred?: boolean;          // ✅
  hospital_visit_required?: boolean;  // ✅
  shared_with_clinician?: boolean;    // ✅
  shared_with_carers?: boolean;       // ✅
  // ... and more
}
```

---

## ✅ WHAT EXISTS AND WORKS

### Tracking Components (UI) ✅
- ✅ `SeizureLogModal.tsx` - Complete UI component
- ✅ `DailyTrackingModal.tsx` - Complete UI component
- ✅ `MedicationLogModal.tsx` - Complete UI component
- ✅ `MenstrualCycleLogModal.tsx` - Complete UI component
- ✅ `SymptomLogModal.tsx` - Complete UI component
- ✅ `VideoLogModal.tsx` - Complete UI component
- ✅ `TemperatureModal.tsx` - Complete UI component

### Settings Pages ✅
- ✅ `ProfileSettings.tsx` - Complete
- ✅ `PrivacySettings.tsx` - Complete
- ✅ `NotificationSettings.tsx` - Complete

### Database Tables ✅
All tables exist with proper structure:
- ✅ `private_health_info.seizure_events`
- ✅ `private_health_info.tremor_episodes`
- ✅ `private_health_info.gait_episodes`
- ✅ `private_health_info.daily_symptom_logs`
- ✅ `private_health_info.clinical_media`
- ✅ All RLS policies in place

---

## 🔧 WHAT NEEDS TO BE FIXED

### Priority 1: Fix Tracking Hooks (CRITICAL)

#### File: `src/hooks/useSeizureLogs.tsx`
**Changes Needed:**
1. ✅ Update table name: `seizure_logs` → `seizure_events`
2. ✅ Update interface to match database schema
3. ✅ Change `user_id` → `patient_id`
4. ✅ Change `log_date` → `occurred_at`
5. ✅ Add all missing fields
6. ⏳ Add `@ts-ignore` for TypeScript type issues (temporary)

#### File: `src/hooks/useGaitLogs.tsx`
**Changes Needed:**
1. Update table name: `gait_logs` → `gait_episodes`
2. Update interface to match database schema
3. Change `user_id` → `patient_id`
4. Change `log_date` → `occurred_at`
5. Add fields: `episode_type`, `severity`, `injury_occurred`, etc.

#### File: `src/hooks/useSymptomLogs.tsx`
**Changes Needed:**
1. Update table name: `symptom_logs` → `daily_symptom_logs`
2. Update interface to match database schema
3. Change `user_id` → `patient_id`
4. Change `log_date` → `log_date` (this one might be correct)
5. Add fields: `mood_rating`, `energy_level`, `sleep_quality`, etc.

#### File: `src/hooks/useMedicationLogs.tsx`
**Review Needed:**
- Check if this should use `user_medications` table or separate medication_logs
- Verify table structure matches
- Update if needed

#### File: `src/hooks/useMenstrualLogs.tsx`
**Review Needed:**
- Check table name (might need to be `menstrual_cycles` or similar)
- Verify against database structure
- Update if needed

### Priority 2: Create Missing Hooks

#### File: `src/hooks/useTremorLogs.tsx` (MISSING)
**Need to Create:**
```typescript
// Hook for tremor_episodes table
export const useTremorLogs = (userId?: string) => {
  // Fetch from private_health_info.tremor_episodes
  // Interface should match tremor_episodes columns
}
```

#### File: `src/hooks/useClinicalMedia.tsx` (MISSING)
**Need to Create:**
```typescript
// Hook for clinical_media table (photos, videos)
export const useClinicalMedia = (userId?: string) => {
  // Fetch from private_health_info.clinical_media
  // Support upload, list, delete
}
```

### Priority 3: Connect Components to Fixed Hooks

**Files to Update:**
- `src/components/tracking/SeizureLogModal.tsx` - Use corrected `useSeizureLogs`
- `src/components/tracking/DailyTrackingModal.tsx` - Use corrected `useSymptomLogs`
- Other tracking modals - Connect to proper hooks

### Priority 4: Settings Integration

**Verify Settings Work:**
- ✅ ProfileSettings - Check database integration
- ✅ PrivacySettings - Verify data_sharing_preferences table
- ✅ NotificationSettings - Verify notification_preferences table

---

## 📋 STEP-BY-STEP COMPLETION PLAN

### Phase 1: Fix Core Tracking Hooks (2-3 hours)

1. **Update useSeizureLogs.tsx** ✅ STARTED
   - [x] Update table name
   - [x] Update interface
   - [ ] Add @ts-ignore comments
   - [ ] Test with real data

2. **Update useGaitLogs.tsx**
   - [ ] Update table name to `gait_episodes`
   - [ ] Match interface to database
   - [ ] Test

3. **Update useSymptomLogs.tsx**
   - [ ] Update table name to `daily_symptom_logs`
   - [ ] Match interface to database
   - [ ] Test

4. **Review and Fix useMedicationLogs.tsx**
   - [ ] Verify correct table
   - [ ] Match interface
   - [ ] Test

5. **Review and Fix useMenstrualLogs.tsx**
   - [ ] Verify correct table
   - [ ] Match interface
   - [ ] Test

### Phase 2: Create Missing Hooks (1-2 hours)

6. **Create useTremorLogs.tsx**
   - [ ] New file for tremor_episodes
   - [ ] Full CRUD operations
   - [ ] Test

7. **Create useClinicalMedia.tsx**
   - [ ] New file for clinical_media
   - [ ] Upload/download support
   - [ ] Test

### Phase 3: Connect UI Components (1 hour)

8. **Update Tracking Modals**
   - [ ] Verify SeizureLogModal uses corrected hook
   - [ ] Verify DailyTrackingModal uses corrected hook
   - [ ] Verify all other modals
   - [ ] Test each modal

### Phase 4: Test Settings Pages (30 mins)

9. **Test Settings Integration**
   - [ ] ProfileSettings - Can update profile
   - [ ] PrivacySettings - Can update sharing preferences
   - [ ] NotificationSettings - Can update preferences

### Phase 5: Integration Testing (1 hour)

10. **E2E Testing**
    - [ ] Log seizure event → verify in database
    - [ ] Log daily symptoms → verify in database
    - [ ] Upload media → verify in storage + database
    - [ ] Update privacy settings → verify restrictions work
    - [ ] Test RLS policies enforce sharing preferences

---

## 🗺️ DATABASE SCHEMA REFERENCE

### Table: private_health_info.seizure_events

```sql
CREATE TABLE private_health_info.seizure_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES auth.users(id),
    occurred_at TIMESTAMPTZ NOT NULL,
    seizure_type TEXT NOT NULL,
    duration_seconds INTEGER,
    severity TEXT,
    consciousness_level TEXT,
    location_type TEXT,
    location_details TEXT,
    aura_present BOOLEAN,
    aura_type TEXT,
    aura_duration_seconds INTEGER,
    triggers TEXT[],
    symptoms_before TEXT[],
    symptoms_during TEXT[],
    symptoms_after TEXT[],
    recovery_time_minutes INTEGER,
    injury_occurred BOOLEAN,
    injury_details TEXT,
    hospital_visit_required BOOLEAN,
    medication_taken TEXT,
    witnessed_by TEXT,
    notes TEXT,
    shared_with_clinician BOOLEAN DEFAULT true,
    shared_with_carers BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Table: private_health_info.tremor_episodes

```sql
CREATE TABLE private_health_info.tremor_episodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES auth.users(id),
    occurred_at TIMESTAMPTZ NOT NULL,
    tremor_type TEXT,
    severity INTEGER, -- 1-10 scale
    duration_seconds INTEGER,
    body_parts_affected TEXT[],
    triggers TEXT[],
    medication_taken TEXT,
    activity_during_tremor TEXT,
    notes TEXT,
    video_url TEXT,
    shared_with_clinician BOOLEAN DEFAULT true,
    shared_with_carers BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Table: private_health_info.gait_episodes

```sql
CREATE TABLE private_health_info.gait_episodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES auth.users(id),
    occurred_at TIMESTAMPTZ NOT NULL,
    episode_type TEXT, -- 'fall', 'freezing', 'near_fall'
    severity TEXT,
    duration_seconds INTEGER,
    location_type TEXT,
    injury_occurred BOOLEAN,
    injury_details TEXT,
    assistance_needed BOOLEAN,
    triggers TEXT[],
    notes TEXT,
    video_url TEXT,
    shared_with_clinician BOOLEAN DEFAULT true,
    shared_with_carers BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Table: private_health_info.daily_symptom_logs

```sql
CREATE TABLE private_health_info.daily_symptom_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES auth.users(id),
    log_date DATE NOT NULL,
    mood_rating INTEGER, -- 1-10
    energy_level INTEGER, -- 1-10
    sleep_quality INTEGER, -- 1-10
    sleep_hours DECIMAL,
    pain_level INTEGER, -- 1-10
    pain_location TEXT,
    symptoms TEXT[],
    triggers TEXT[],
    medications_taken TEXT[],
    notes TEXT,
    shared_with_clinician BOOLEAN DEFAULT true,
    shared_with_carers BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## ⚠️ CRITICAL NOTES

### TypeScript Type Issues
The generated Supabase types don't include `private_health_info` schema tables. We need to:
1. Use `@ts-ignore` comments temporarily
2. OR regenerate full types with all schemas
3. OR create manual type definitions

### RLS Policy Testing
After fixing hooks, MUST test:
- ✅ Patient can insert own data
- ✅ Patient can read own data
- ✅ Clinician can read if shared and connected
- ✅ Carer can read if shared and related
- ✅ No one else can access

### Research Anonymization
After inserting to `private_health_info` tables:
- ✅ Triggers should fire
- ✅ Data copied to `research` schema (if consent given)
- ✅ Research data is anonymized (uses research_id, not user_id)

---

## 🎯 COMPLETION CHECKLIST

### Hooks Fixed
- [ ] useSeizureLogs
- [ ] useGaitLogs
- [ ] useSymptomLogs
- [ ] useMedicationLogs
- [ ] useMenstrualLogs

### Hooks Created
- [ ] useTremorLogs
- [ ] useClinicalMedia

### Components Connected
- [ ] SeizureLogModal
- [ ] DailyTrackingModal
- [ ] All other tracking modals

### Settings Verified
- [ ] ProfileSettings works
- [ ] PrivacySettings works
- [ ] NotificationSettings works

### Testing Complete
- [ ] Can log seizure
- [ ] Can log daily symptoms
- [ ] Can upload media
- [ ] Privacy settings work
- [ ] RLS policies enforced
- [ ] Research anonymization works

---

## 🚀 ESTIMATED TIME TO COMPLETE

- **Phase 1 (Fix Hooks):** 2-3 hours
- **Phase 2 (New Hooks):** 1-2 hours
- **Phase 3 (Connect UI):** 1 hour
- **Phase 4 (Test Settings):** 30 minutes
- **Phase 5 (E2E Testing):** 1 hour

**TOTAL:** 5.5 - 7.5 hours of focused work

---

## 📝 NEXT IMMEDIATE STEP

**START HERE:**
1. Finish fixing `src/hooks/useSeizureLogs.tsx` (in progress)
2. Move to `src/hooks/useGaitLogs.tsx`
3. Then `src/hooks/useSymptomLogs.tsx`
4. Continue down the list

**This is systematic, careful work to match hooks with actual database schema!**

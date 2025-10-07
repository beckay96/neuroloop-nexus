# 🔒 COMPLETE RPC MIGRATION GUIDE

**Priority:** CRITICAL - Required for HIPAA Compliance  
**Impact:** 50+ direct schema accesses need conversion  
**Time Estimate:** 2-3 hours

---

## 🚨 CURRENT SECURITY ISSUE

**50+ locations** in the codebase directly access non-public schemas:
```typescript
// ❌ HIPAA VIOLATION - Exposes schema structure
.schema('private_health_info')
.from('table_name')
```

This violates HIPAA because:
1. Exposes database structure publicly
2. Bypasses server-side validation
3. Harder to audit access
4. More attack surface

---

## ✅ THE SOLUTION: RPC Functions

**Every table access must use RPC:**
```typescript
// ✅ HIPAA COMPLIANT - Server-side validated
.rpc('get_table_data', { p_user_id: userId })
```

---

## 📋 FILES REQUIRING MIGRATION

### 1. useTrackingEntries.tsx
```typescript
// ❌ BEFORE (4 locations)
const { data, error } = await supabase
  .schema('private_health_info')
  .from('tracking_entries')
  .select('*')
  .eq('user_id', userId);

// ✅ AFTER
const { data, error } = await supabase
  .rpc('get_tracking_entries', { p_user_id: userId });
```

### 2. useSeizureLogs.tsx / useSeizureResearch.tsx
```typescript
// ❌ BEFORE (7+ locations)
const { data, error } = await supabase
  .schema('private_health_info')
  .from('seizure_logs_research')
  .select('*')
  .eq('user_id', userId);

// ✅ AFTER
const { data, error } = await supabase
  .rpc('get_seizure_logs', { p_user_id: userId });
```

### 3. useSymptomLogs.tsx
```typescript
// ❌ BEFORE (4 locations)
const { data, error } = await supabase
  .schema('private_health_info')
  .from('daily_symptom_logs')
  .select('*')
  .eq('patient_id', userId);

// ✅ AFTER
const { data, error } = await supabase
  .rpc('get_symptom_logs', { p_patient_id: userId });
```

### 4. useTremorLogs.tsx
```typescript
// ❌ BEFORE (4 locations)
const { data, error } = await supabase
  .schema('private_health_info')
  .from('tremor_episodes')
  .select('*')
  .eq('patient_id', userId);

// ✅ AFTER
const { data, error } = await supabase
  .rpc('get_tremor_episodes', { p_patient_id: userId });
```

### 5. useGaitLogs.tsx
```typescript
// ❌ BEFORE (4 locations)
const { data, error } = await supabase
  .schema('private_health_info')
  .from('gait_episodes')
  .select('*')
  .eq('patient_id', userId);

// ✅ AFTER
const { data, error } = await supabase
  .rpc('get_gait_episodes', { p_patient_id: userId });
```

### 6. useMenstrualLogs.tsx
```typescript
// ❌ BEFORE (4 locations)
const { data, error } = await supabase
  .schema('private_health_info')
  .from('menstrual_cycle_logs')
  .select('*')
  .eq('user_id', userId);

// ✅ AFTER
const { data, error } = await supabase
  .rpc('get_menstrual_logs', { p_user_id: userId });
```

### 7. useTemperatureLogs.tsx
```typescript
// ❌ BEFORE (4 locations)
const { data, error } = await supabase
  .schema('private_health_info')
  .from('basal_temperature_logs')
  .select('*')
  .eq('user_id', userId);

// ✅ AFTER
const { data, error } = await supabase
  .rpc('get_temperature_logs', { p_user_id: userId });
```

### 8. useMedicationLogs.tsx
```typescript
// ❌ BEFORE (4 locations)
const { data, error } = await supabase
  .schema('private_health_info')
  .from('medication_logs')
  .select('*')
  .eq('user_id', userId);

// ✅ AFTER
const { data, error } = await supabase
  .rpc('get_medication_logs', { p_user_id: userId });
```

### 9. useConditions.tsx
```typescript
// ❌ BEFORE (3 locations)
const { data, error } = await supabase
  .schema('private_health_info')
  .from('user_conditions')
  .select('*')
  .eq('user_id', userId);

// ✅ AFTER
const { data, error } = await supabase
  .rpc('get_user_conditions', { p_user_id: userId });
```

### 10. usePatientConnections.tsx
```typescript
// ❌ BEFORE
const { data: onboardingData } = await supabase
  .schema('private_health_info')
  .from('patient_onboarding_data')
  .select('first_name, last_name')
  .eq('user_id', conn.patient_id);

// ✅ AFTER
const { data: onboardingData } = await supabase
  .rpc('get_patient_onboarding', { p_user_id: conn.patient_id });
```

---

## 📊 COMPLETE FILE LIST

| File | Direct Schema Calls | Priority |
|------|---------------------|----------|
| useSeizureResearch.tsx | 7 | HIGH |
| useTrackingEntries.tsx | 4 | HIGH |
| useSymptomLogs.tsx | 4 | HIGH |
| useTremorLogs.tsx | 4 | HIGH |
| useGaitLogs.tsx | 4 | HIGH |
| useMenstrualLogs.tsx | 4 | HIGH |
| useTemperatureLogs.tsx | 4 | HIGH |
| useMedicationLogs.tsx | 4 | HIGH |
| useSeizureLogs.tsx | 4 | HIGH |
| useConditions.tsx | 3 | HIGH |
| usePatientConnections.tsx | 1 | MEDIUM |

**TOTAL: 43+ locations need updating**

---

## 🔄 MIGRATION STEPS

### Step 1: Apply SQL Migration
```bash
# Run in Supabase SQL Editor:
/supabase/migrations/COMPLETE_HIPAA_RPC_FUNCTIONS.sql
```

### Step 2: Update TypeScript Types
Add to `src/integrations/supabase/types.ts`:
```typescript
Functions: {
  // ... existing functions
  get_tracking_entries: {
    Args: { p_user_id: string }
    Returns: {
      id: string
      user_id: string
      entry_date: string
      mood_level: string | null
      energy_level: string | null
      sleep_quality: string | null
      sleep_hours: number | null
      symptoms: string[] | null
      notes: string | null
      created_at: string | null
    }[]
  }
  // ... add all other functions
}
```

### Step 3: Update Each Hook File
For each file listed above:
1. Remove ALL `.schema('private_health_info')`
2. Replace with appropriate `.rpc()` call
3. Update parameter names (e.g., `user_id` → `p_user_id`)
4. Remove `.select()`, `.eq()`, `.order()` (handled server-side)
5. Test thoroughly

### Step 4: Test Each Component
1. Login as patient
2. Test each tracking modal
3. Verify data loads correctly
4. Check create/update/delete operations
5. Verify no console errors

---

## ⚠️ IMPORTANT NOTES

### About Realtime Schema
The `realtime` schema is Supabase's internal infrastructure:
- Used for websocket connections
- Handles real-time subscriptions
- NOT for direct access
- NOT included in types.ts (intentionally)
- Managed entirely by Supabase

### Column Name Differences
**CRITICAL:** Some tables use different ID columns:
- `user_id`: tracking_entries, medication_logs, etc.
- `patient_id`: tremor_episodes, gait_episodes, daily_symptom_logs
- The RPC functions handle this correctly

### Insert/Update Operations
For INSERT/UPDATE, create save functions:
```sql
CREATE OR REPLACE FUNCTION save_tracking_entry(
  p_user_id UUID,
  p_entry_date DATE,
  -- other fields
) RETURNS UUID
```

### Delete Operations
For DELETE, create delete functions:
```sql
CREATE OR REPLACE FUNCTION delete_tracking_entry(
  p_user_id UUID,
  p_entry_id UUID
) RETURNS BOOLEAN
```

---

## 🚀 DEPLOYMENT CHECKLIST

- [ ] Run COMPLETE_HIPAA_RPC_FUNCTIONS.sql migration
- [ ] Update types.ts with new RPC signatures
- [ ] Update useTrackingEntries.tsx
- [ ] Update useSeizureLogs.tsx
- [ ] Update useSeizureResearch.tsx
- [ ] Update useSymptomLogs.tsx
- [ ] Update useTremorLogs.tsx
- [ ] Update useGaitLogs.tsx
- [ ] Update useMenstrualLogs.tsx
- [ ] Update useTemperatureLogs.tsx
- [ ] Update useMedicationLogs.tsx
- [ ] Update useConditions.tsx
- [ ] Update usePatientConnections.tsx
- [ ] Test all tracking modals
- [ ] Test all CRUD operations
- [ ] Verify no console errors
- [ ] Build and deploy

---

## 🎯 EXPECTED OUTCOME

After migration:
- ✅ NO direct schema access in frontend
- ✅ ALL data access via RPC functions
- ✅ Server-side validation on every request
- ✅ Audit logging capability
- ✅ HIPAA compliant architecture
- ✅ Reduced attack surface
- ✅ Hidden database structure

---

## 📈 TRACKING PROGRESS

Use this to track completion:
```
[ ] SQL Migration Applied
[ ] Types Updated
Files Updated:
[ ] useTrackingEntries.tsx (0/4)
[ ] useSeizureLogs.tsx (0/4)
[ ] useSeizureResearch.tsx (0/7)
[ ] useSymptomLogs.tsx (0/4)
[ ] useTremorLogs.tsx (0/4)
[ ] useGaitLogs.tsx (0/4)
[ ] useMenstrualLogs.tsx (0/4)
[ ] useTemperatureLogs.tsx (0/4)
[ ] useMedicationLogs.tsx (0/4)
[ ] useConditions.tsx (0/3)
[ ] usePatientConnections.tsx (0/1)
TOTAL: 0/43 conversions complete
```

---

**This is a CRITICAL security update required for HIPAA compliance!**  
**Estimated time: 2-3 hours for complete migration**

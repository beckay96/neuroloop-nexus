# 🚨 APPLY THESE MIGRATIONS NOW TO FIX DASHBOARD

## ⚠️ CRITICAL: Run in Supabase SQL Editor (IN THIS ORDER)

**Location:** Go to your Supabase Project → SQL Editor → New Query

---

### **1. Medications & Conditions RLS**
**File:** `supabase/migrations/20250107_medications_rls_fix.sql`

```sql
-- Copy entire content and run
```

**Expected Result:**
```
✅ SUCCESS | Medications RLS Policy
✅ SUCCESS | Conditions RLS Policy
```

---

### **2. Patient Onboarding Functions**
**File:** `supabase/migrations/20250108_patient_onboarding_functions.sql`

```sql
-- Copy entire content and run
```

**What it does:** Fixes `gender_enum` type reference

---

### **3. Dashboard Access (Reference Tables RLS)**
**File:** `supabase/migrations/20250108_fix_dashboard_access.sql`

```sql
-- Copy entire content and run
```

**Expected Result:**
```
✅ SUCCESS | Seizure Signs RLS
✅ SUCCESS | Brain Regions RLS
✅ SUCCESS | Tracking Preferences RLS
✅ SUCCESS | Research Consent RLS
```

**Fixes:**
- ❌ 403 Forbidden → ✅ `seizure_signs_reference`
- ❌ 403 Forbidden → ✅ `brain_regions_reference`
- ❌ 403 Forbidden → ✅ `sign_brain_region_mapping`
- ❌ 403 Forbidden → ✅ `seizure_triggers_reference`
- ❌ 403 Forbidden → ✅ `daily_tracking_preferences`
- ❌ 403 Forbidden → ✅ `research_consent`

---

### **4. RPC Function Type Fixes**
**File:** `supabase/migrations/20250108_fix_all_rpc_functions.sql`

```sql
-- Copy entire content and run
```

**Expected Result:**
```
✅ FIXED | get_user_medications (times: TIME[])
✅ FIXED | get_user_conditions (tracking_feature_enum[])
✅ FIXED | get_tremor_episodes (tremor_id primary key)
✅ FIXED | get_tracking_entries (correct columns)
```

**Fixes:**
- ❌ `time[] ≠ text[]` → ✅ Fixed
- ❌ `tracking_feature_enum[] ≠ text[]` → ✅ Fixed
- ❌ `column te.id does not exist` → ✅ Fixed to `tremor_id`
- ❌ `column te.mood_level does not exist` → ✅ Complete restructure

---

### **5. ⭐ FIX ALL RPC Functions (Complete Column Name Corrections)**
**File:** `supabase/migrations/20250108_fix_all_rpc_column_names.sql`

```sql
-- Copy entire content and run
```

**Expected Result:**
```
✅ FIXED | get_seizure_logs (seizure_logs_research, log_id, user_id)
✅ FIXED | get_symptom_logs (daily_symptom_logs, log_id, patient_id)
✅ FIXED | get_menstrual_logs (cycle_start_date instead of log_date)
✅ FIXED | get_temperature_logs (temperature_celsius)
✅ FIXED | get_medication_logs (removed non-existent columns)
```

**What it does:**
- **COMPLETELY REWRITES** all RPC functions to match actual database schema
- Based on `database-preview-uptodate/the-tables-that-matter.md`
- Fixes ALL column name mismatches

**Fixes:**
1. `get_seizure_logs`: Uses `seizure_logs_research` table, `log_id` primary key, `user_id` foreign key
2. `get_symptom_logs`: Uses `daily_symptom_logs` table, `log_id` primary key (not `id`)
3. `get_menstrual_logs`: Uses `cycle_start_date`, `cycle_end_date` (NO `log_date` column!)
4. `get_temperature_logs`: Uses `temperature_celsius` (not `temperature`)
5. `get_medication_logs`: Removed `dosage_taken` and `side_effects` columns (don't exist)

---

### **6. ⭐ FIX Reference Tables & Patient Onboarding**
**File:** `supabase/migrations/20250108_fix_reference_tables_rls.sql`

```sql
-- Copy entire content and run
```

**Expected Result:**
```
✅ REFERENCE TABLES RLS ENABLED:
  - seizure_signs_reference: Read access for authenticated
  - brain_regions_reference: Read access for authenticated
  - seizure_triggers_reference: Read access for authenticated
  - sign_brain_region_mapping: Read access for authenticated
  - daily_tracking_preferences: User-specific access
✅ RPC FUNCTION CREATED:
  - get_patient_onboarding_data: Secure access to private_health_info
```

**What it does:**
- Adds **RLS policies** to public reference/lookup tables
- Creates `get_patient_onboarding_data()` RPC function
- Reference tables are read-only for all authenticated users (no PHI)
- Patient onboarding data uses RPC for secure access

**Fixes:**
- ❌ `403 Forbidden: seizure_signs_reference` → ✅ Readable by authenticated
- ❌ `403 Forbidden: brain_regions_reference` → ✅ Readable by authenticated
- ❌ `403 Forbidden: seizure_triggers_reference` → ✅ Readable by authenticated
- ❌ `403 Forbidden: sign_brain_region_mapping` → ✅ Readable by authenticated
- ❌ `403 Forbidden: daily_tracking_preferences` → ✅ User-specific RLS
- ❌ `404 Not Found: patient_onboarding_data` → ✅ RPC function created

---

## ✅ AFTER RUNNING ALL MIGRATIONS:

1. **Hard refresh browser:** `Cmd + Shift + R` (Mac)
2. **Check console** - All errors should be gone
3. **Regenerate types** (optional but recommended):
   ```bash
   npx supabase gen types typescript --project-id evcdikzpnjjpotbkkshs > src/integrations/supabase/types.ts
   ```
4. **Remove @ts-ignore comments** from hooks (after types regenerate)

---

## 🐛 IF ERRORS PERSIST:

Check for these specific errors:
- `403 Forbidden` = RLS policy missing (check migration #3)
- `406 Not Acceptable` = Need RPC function (check migration #5)
- `42804 type mismatch` = Wrong return type (check migration #4)
- `PGRST106 schema error` = Trying to access non-public schema directly (need RPC)

---

## 📋 WHY THIS WAS NEEDED:

**PostgREST (Supabase's API layer) ONLY allows:**
- Direct access to `public` schema
- Access to other schemas ONLY via RPC functions with `SECURITY DEFINER`

**The Error:** `The schema must be one of the following: public, graphql_public`

**The Solution:** Created RPC functions for `private_health_info` tables

---

## 🎯 EXPECTED RESULT:

**Before:**
```
❌ Error fetching seizure events: PGRST106
❌ Error fetching symptom logs: PGRST106
❌ Error fetching gait logs: PGRST106
❌ GET .../seizure_signs_reference 403 Forbidden
❌ GET .../brain_regions_reference 403 Forbidden
❌ GET .../daily_tracking_preferences 403 Forbidden
```

**After:**
```
✅ Dashboard loads successfully
✅ All data fetches correctly
✅ No 403 or 406 errors
✅ All reference tables accessible
✅ All tracking data loads
```

---

## 🚀 READY TO TEST!

Run all 5 migrations → Hard refresh → Dashboard should work perfectly!

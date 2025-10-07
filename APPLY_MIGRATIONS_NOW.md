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

### **5. ⭐ FIX Existing RPC Functions (Column Errors)**
**File:** `supabase/migrations/20250108_fix_existing_rpc_functions.sql`

```sql
-- Copy entire content and run
```

**Expected Result:**
```
✅ FIXED | get_gait_episodes (gait_id primary key)
✅ FIXED | get_medication_logs (removed non-existent column)
```

**What it does:**
- Fixes column mismatches in existing RPC functions
- `get_gait_episodes`: Changes `ge.id` to `ge.gait_id` (correct primary key)
- `get_medication_logs`: Removes `ml.missed_reason` column (doesn't exist)

**Fixes:**
- ❌ `column ge.id does not exist` → ✅ Uses `gait_id`
- ❌ `column ml.missed_reason does not exist` → ✅ Removed from query

**Note:** The other functions (`get_seizure_logs`, `get_symptom_logs`, `get_menstrual_logs`, `get_temperature_logs`) already exist and work correctly!

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

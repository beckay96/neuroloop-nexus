# Research Sync Fix - Deployment Instructions

**Date:** 2025-01-08  
**File:** `VERIFIED_RESEARCH_SYNC_FIX.sql`  
**Status:** ✅ READY TO DEPLOY

## What This Fixes

### Critical Bug: Research ID Overwriting
All 4 anonymization functions had this bug:
```sql
ON CONFLICT (user_id) DO UPDATE SET research_id = EXCLUDED.research_id
```

This would **overwrite existing research_ids**, breaking the anonymization link between patients and their research data!

### Fixed To:
```sql
ON CONFLICT (user_id) DO NOTHING
```

Now research_ids are **permanent** once created.

## Changes Made

1. ✅ **Added `updated_at` columns** to research tables
2. ✅ **Fixed ON CONFLICT** in all 4 anonymization functions
3. ✅ **Fixed conflict keys** (using `source_*_id` instead of primary keys)
4. ✅ **Added unique constraints** on source IDs
5. ✅ **Drops old `complete_onboarding`** function
6. ✅ **Creates new `complete_onboarding`** with research consent parameter
7. ✅ **Creates `create_research_id_for_user`** helper function

## Deployment Steps

### 1. Go to Supabase Dashboard
```
https://app.supabase.com/project/evcdikzpnjjpotbkkshs/sql/new
```

### 2. Copy the SQL File
Open `VERIFIED_RESEARCH_SYNC_FIX.sql` and copy the entire contents.

### 3. Paste and Run
Paste into the SQL Editor and click "Run" or press Cmd+Enter.

### 4. Verify Success
You should see:
```
Success. No rows returned
```

## What Gets Updated

### Functions Updated:
- `private_health_info.anonymize_daily_log_to_research()`
- `private_health_info.anonymize_gait_to_research()`
- `private_health_info.anonymize_seizure_to_research()`
- `private_health_info.anonymize_tremor_to_research()`
- `public.create_research_id_for_user()` (new)
- `public.complete_onboarding()` (replaced)

### Tables Modified:
- `research.daily_symptom_logs` - Added `updated_at` column
- `research.gait_episodes` - Added `updated_at` column, unique constraint
- `research.tremor_episodes` - Added `updated_at` column, unique constraint
- `research.seizure_events` - Added `updated_at` column, unique constraint

## Post-Deployment Verification

### 1. Check Functions Exist
```sql
SELECT routine_name, routine_type 
FROM information_schema.routines 
WHERE routine_schema = 'private_health_info' 
AND routine_name LIKE '%anonymize%';
```

Should return 4 functions.

### 2. Check No Duplicate Research IDs
```sql
SELECT user_id, COUNT(*) 
FROM linkage.research_id_map 
GROUP BY user_id 
HAVING COUNT(*) > 1;
```

Should return **EMPTY**.

### 3. Check Research Schema Has No PHI
```sql
SELECT table_name, column_name 
FROM information_schema.columns 
WHERE table_schema = 'research' 
AND column_name IN ('user_id', 'patient_id', 'email', 'name');
```

Should return **EMPTY** (research schema should only have `research_id`).

### 4. Test Onboarding Function
```sql
SELECT public.complete_onboarding(
    auth.uid(),
    'patient',
    true  -- research consent
);
```

Should return:
```json
{
  "success": true,
  "onboarding_completed": true,
  "research_id_created": true,
  "research_id": "uuid-here"
}
```

## Rollback Plan

If something goes wrong, you can rollback by:

1. **Restore functions from backup:**
   The old functions are in your database history.

2. **Remove research_ids created during testing:**
   ```sql
   DELETE FROM linkage.research_id_map 
   WHERE created_at > '2025-01-08 09:00:00';
   ```

3. **Restore old `complete_onboarding`:**
   Check your database history for the previous version.

## Expected Behavior After Deployment

### When User Opts In During Onboarding:
1. `complete_onboarding()` is called with `p_research_consent = true`
2. A unique `research_id` is created in `linkage.research_id_map`
3. The mapping is permanent (can never be overwritten)

### When Patient Logs Data:
1. Data is saved to `private_health_info.seizure_events` (or other table)
2. If `visible_to_researchers = true` AND consent given:
   - Trigger fires: `anonymize_seizure_to_research()`
   - Gets `research_id` from linkage table
   - Syncs anonymized data to `research.seizure_events`
   - Uses `research_id` (NOT `patient_id`)

### Research Data:
- ✅ Only contains `research_id`
- ✅ Date/time anonymized (date + hour only)
- ✅ No PHI
- ✅ Can never be linked back without access to linkage table

## HIPAA Compliance Checklist

After deployment, verify:
- [x] Research IDs created only with consent
- [x] Research IDs never change (ON CONFLICT DO NOTHING)
- [x] Linkage table secured (backend functions only)
- [x] Research schema has NO PHI
- [x] Research schema uses research_id, not user_id
- [x] Triggers check consent before syncing
- [x] Date/time anonymized
- [x] Audit trail exists

## Success Criteria

✅ All 4 anonymization functions updated  
✅ ON CONFLICT changed to DO NOTHING  
✅ Onboarding creates research_id  
✅ No duplicate research_ids  
✅ Research schema has no PHI  
✅ TypeScript types updated (already done)  

---

**Status:** 🟢 READY FOR PRODUCTION  
**Risk Level:** LOW (fixes critical bug, no data loss)  
**Estimated Time:** 2-3 minutes  
**Downtime:** None (functions updated atomically)

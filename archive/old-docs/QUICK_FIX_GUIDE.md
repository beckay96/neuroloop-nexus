# 🚨 RLS Performance Fix - Troubleshooting Guide

**Issue:** Column name errors when applying RLS policies  
**Status:** Need to diagnose actual table structure

---

## 🔍 Step 1: Diagnose the Issue

**Run this first in Supabase SQL Editor:**

```sql
-- File: DIAGNOSE_RLS_ERROR.sql
```

This will:
1. ✅ Show actual table columns
2. ✅ Show existing RLS policies
3. ✅ Test which column name works
4. ✅ Reveal the correct column to use

---

## 📊 Expected Findings

### Scenario A: Table uses `patient_id`
```
✅ SUCCESS: patient_id works!
```
→ Use `FIX_RLS_PERFORMANCE_NOW.sql` as-is

### Scenario B: Table uses `user_id`
```
✅ SUCCESS: user_id works!
```
→ Need to change policies back to `user_id`

### Scenario C: Table uses different column
```
✅ SUCCESS: [other_column] works!
```
→ Need to update policies with correct column

---

## 🐛 Known Issues Found

### Tables Corrected So Far:
1. ✅ `seizure_logs` - Changed from `user_id` to `patient_id`
2. ✅ `patient_diagnoses` - Changed from `user_id` to `patient_id`

### Error Pattern:
- Schema file shows `patient_id` exists
- But RLS policy creation fails
- Possible causes:
  - Column doesn't actually exist in live database
  - Column has different name
  - Table structure changed

---

## ⚡ Quick Fix Steps

### Step 1: Run Diagnostic
```bash
# In Supabase SQL Editor
1. Open: DIAGNOSE_RLS_ERROR.sql
2. Run entire script
3. Note which column works
```

### Step 2: Update Policy File
Based on diagnostic results:

```sql
-- If patient_id works:
CREATE POLICY "..." USING (patient_id = (select auth.uid()));

-- If user_id works:
CREATE POLICY "..." USING (user_id = (select auth.uid()));

-- If other column works:
CREATE POLICY "..." USING ([column_name] = (select auth.uid()));
```

### Step 3: Apply Fix
```bash
# Run corrected file
FIX_RLS_PERFORMANCE_NOW.sql
```

---

## 📝 Files to Run in Order

1. **DIAGNOSE_RLS_ERROR.sql** ← Run this FIRST
2. Review output, identify correct column
3. Update **FIX_RLS_PERFORMANCE_NOW.sql** if needed
4. Run **FIX_RLS_PERFORMANCE_NOW.sql**
5. Run **DEBUG_UPDRS_CONSTRAINT.sql**
6. Run **TEST_NEW_RPCS.sql**

---

## 🎯 Root Cause Analysis

**Problem:** Schema documentation doesn't match live database

**Possible Reasons:**
- Migration not applied
- Table structure changed
- Different environment
- Schema file outdated

**Solution:** Always verify with diagnostic script first

---

## ✅ Success Criteria

After running diagnostic:
- [ ] See actual table columns
- [ ] Identify which column works
- [ ] Update RLS policies accordingly
- [ ] All policies apply without errors
- [ ] Performance optimized (auth.uid wrapped in subquery)

---

**Run DIAGNOSE_RLS_ERROR.sql now to identify the exact issue!**

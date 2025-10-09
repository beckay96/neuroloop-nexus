# 🔧 RLS Still Not Working - Troubleshooting

## ❌ Issue

Even after running the RLS migration, still getting:
```
Error: permission denied for table patient_clinician_connections
Error: permission denied for table patient_invitations
```

## 🔍 Root Cause

**RLS policies alone are not enough!**

You need TWO things for RLS to work:
1. ✅ **RLS Policies** - Control which rows users can see (DONE)
2. ❌ **Table Grants** - Grant base table access to the role (MISSING)

### What's Happening:
- RLS policies say: "Clinicians can see rows where clinician_id = their ID"
- But the `authenticated` role doesn't have SELECT permission on the table
- So Postgres blocks the query before RLS even runs

## ✅ Solution

Run this additional migration: `20250109_grant_table_access.sql`

### What It Does:
```sql
-- Grant table-level permissions
GRANT SELECT, INSERT, UPDATE ON patient_clinician_connections TO authenticated;
GRANT SELECT, INSERT, UPDATE ON patient_invitations TO authenticated;

-- Remove access from anonymous users
REVOKE ALL ON patient_clinician_connections FROM anon;
REVOKE ALL ON patient_invitations FROM anon;
```

---

## 🚀 Quick Fix Steps

### Step 1: Run the Grant Migration
```sql
-- In Supabase SQL Editor:
-- Copy contents of: supabase/migrations/20250109_grant_table_access.sql
```

### Step 2: Verify It Worked
```sql
-- Check grants
SELECT grantee, privilege_type
FROM information_schema.role_table_grants
WHERE table_name = 'patient_clinician_connections'
AND grantee = 'authenticated';

-- Should show: SELECT, INSERT, UPDATE
```

### Step 3: Test in Browser
1. Refresh the page (hard refresh: Cmd+Shift+R)
2. Check console - errors should be gone
3. Clinician dashboard should load

---

## 📋 Understanding RLS vs Grants

### Table Grants (Base Permission):
```
Can the role access the table at all?
├─ YES → Check RLS policies
└─ NO → Permission denied (403)
```

### RLS Policies (Row-Level Filtering):
```
Which rows can the user see?
├─ clinician_id = auth.uid() → Show these rows
└─ Other rows → Hide them
```

### Both Are Required:
```
Query → Check Grants → Check RLS → Return Rows
         ↓              ↓
      GRANT SELECT    USING (clinician_id = auth.uid())
```

---

## 🔐 Security Layers

### Layer 1: Table Grants
- **authenticated**: Can SELECT, INSERT, UPDATE
- **anon**: No access
- **service_role**: Full access (bypass RLS)

### Layer 2: RLS Policies
- Clinicians see only their connections
- Patients see only their connections
- No cross-access between users

### Layer 3: Application Logic
- Additional validation in app code
- Business rules enforcement
- Audit logging

---

## 🧪 Testing Commands

### Check if RLS is enabled:
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('patient_clinician_connections', 'patient_invitations');
```

### Check if grants exist:
```sql
SELECT grantee, table_name, privilege_type
FROM information_schema.role_table_grants
WHERE table_name IN ('patient_clinician_connections', 'patient_invitations')
AND grantee = 'authenticated';
```

### Check policies:
```sql
SELECT tablename, policyname, cmd
FROM pg_policies
WHERE tablename IN ('patient_clinician_connections', 'patient_invitations');
```

---

## ✨ Expected Results After Fix

### Before:
```
❌ GET /patient_clinician_connections → 403 Forbidden
❌ Error: permission denied for table
```

### After:
```
✅ GET /patient_clinician_connections → 200 OK
✅ Returns: [] (empty array if no connections yet)
✅ No permission errors
```

---

## 📝 Files to Run

1. **Already ran**: `20250109_enable_rls_patient_connections.sql`
2. **Run now**: `20250109_grant_table_access.sql`
3. **Optional**: `VERIFY_RLS_POLICIES.sql` (to check status)

---

## 🎯 Why This Happens

Supabase tables created via migrations don't automatically grant permissions to the `authenticated` role. You must explicitly grant them.

This is actually **good security** - tables are locked down by default!

---

## ✅ Status: FIX READY

Run `20250109_grant_table_access.sql` and the errors will disappear! 🔓

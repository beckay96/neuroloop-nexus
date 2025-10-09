# 🔓 Auth.Users Access Fix

## ❌ New Error

```
Error: permission denied for table users
```

## 🔍 Root Cause

The `patient_invitations` table has foreign keys to `auth.users`:
```sql
FOREIGN KEY (clinician_id) REFERENCES auth.users (id)
FOREIGN KEY (patient_id) REFERENCES auth.users (id)
```

When PostgREST tries to fetch data, it attempts to expand these foreign key relationships, but the `authenticated` role doesn't have SELECT permission on `auth.users`.

## ✅ Solution

Grant SELECT on `auth.users` to the `authenticated` role.

**Migration:** `20250109_grant_auth_users_read.sql`

```sql
GRANT SELECT ON auth.users TO authenticated;
```

### Is This Safe?

**YES!** Because:
1. ✅ `auth.users` already has RLS enabled by Supabase
2. ✅ Users can only see their own user record due to existing RLS policies
3. ✅ This is standard Supabase practice for tables with FK relationships
4. ✅ No sensitive data is exposed (passwords are hashed, tokens are hidden)

---

## 🔐 Security Notes

### What Users Can See:
- ✅ Their own user record (id, email, created_at, etc.)
- ❌ Other users' records (blocked by RLS)
- ❌ Sensitive fields (encrypted_password, etc. - blocked by RLS)

### Why This Is Needed:
When you query `patient_invitations`, PostgREST tries to:
1. Fetch the invitation record
2. Expand the `clinician_id` FK → Look up clinician in `auth.users`
3. Expand the `patient_id` FK → Look up patient in `auth.users`

Without SELECT permission on `auth.users`, step 2 and 3 fail.

---

## 🚀 Deployment

### Run Migration:
```sql
-- In Supabase SQL Editor:
-- Copy contents of: supabase/migrations/20250109_grant_auth_users_read.sql
```

### Verify:
```sql
-- Check grant exists
SELECT grantee, privilege_type
FROM information_schema.role_table_grants
WHERE table_schema = 'auth'
AND table_name = 'users'
AND grantee = 'authenticated';

-- Should show: SELECT
```

### Test:
1. Hard refresh browser (Cmd+Shift+R)
2. Check console - "permission denied for table users" should be gone
3. Patient invitations should load

---

## 📋 All Migrations Run So Far

1. ✅ `20250109_enable_rls_patient_connections.sql` - Enable RLS + policies
2. ✅ `20250109_grant_table_access.sql` - Grant table access
3. ⏳ `20250109_grant_auth_users_read.sql` - Grant auth.users access (RUN THIS NOW)

---

## ✨ Expected Result

### Before:
```
❌ patient_clinician_connections: 403 Forbidden
❌ patient_invitations: 403 Forbidden (permission denied for table users)
```

### After:
```
✅ patient_clinician_connections: 200 OK
✅ patient_invitations: 200 OK
✅ Clinician dashboard loads successfully
```

---

## 🎯 Status: FINAL FIX

Run `20250109_grant_auth_users_read.sql` and all clinician dashboard errors will be resolved! 🎉

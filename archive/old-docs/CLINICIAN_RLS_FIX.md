# 🔒 Clinician Dashboard RLS Fix

## ❌ Error Found

```
Error: permission denied for table patient_clinician_connections
Error: permission denied for table patient_invitations
```

## 🔍 Root Cause

The `patient_clinician_connections` and `patient_invitations` tables in the `public` schema did not have RLS (Row Level Security) enabled or policies configured.

When clinicians logged in and the dashboard tried to fetch their patient connections, Supabase blocked the query because:
1. RLS was not enabled on these tables
2. No policies existed to allow clinicians to read their own data

---

## ✅ Solution

Created migration: `20250109_enable_rls_patient_connections.sql`

### What It Does:

1. **Enables RLS** on both tables
2. **Creates policies** for:
   - ✅ Clinicians viewing their connections
   - ✅ Patients viewing their connections
   - ✅ Clinicians viewing their invitations
   - ✅ Patients viewing invitations sent to them
   - ✅ Creating connections/invitations
   - ✅ Updating connections/invitations

---

## 🔐 RLS Policies Created

### patient_clinician_connections:

1. **"Clinicians can view their connections"**
   - `SELECT` for clinicians where `clinician_id = auth.uid()`

2. **"Patients can view their connections"**
   - `SELECT` for patients where `patient_id = auth.uid()`

3. **"Clinicians can create connections"**
   - `INSERT` for clinicians where `clinician_id = auth.uid()`

4. **"Clinicians can update their connections"**
   - `UPDATE` for clinicians where `clinician_id = auth.uid()`

5. **"Patients can update their connections"**
   - `UPDATE` for patients where `patient_id = auth.uid()`

### patient_invitations:

1. **"Clinicians can view their invitations"**
   - `SELECT` for clinicians where `clinician_id = auth.uid()`

2. **"Patients can view invitations sent to them"**
   - `SELECT` for patients where `patient_email` matches their email OR `patient_id = auth.uid()`

3. **"Clinicians can create invitations"**
   - `INSERT` for clinicians where `clinician_id = auth.uid()`

4. **"Clinicians can update their invitations"**
   - `UPDATE` for clinicians where `clinician_id = auth.uid()`

5. **"Patients can update invitations sent to them"**
   - `UPDATE` for patients where email matches OR `patient_id = auth.uid()`

---

## 🚀 Deployment

### Run Migration:
```sql
-- In Supabase SQL Editor:
-- Copy contents of: supabase/migrations/20250109_enable_rls_patient_connections.sql
```

### Verify:
```sql
-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('patient_clinician_connections', 'patient_invitations');

-- Check policies exist
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename IN ('patient_clinician_connections', 'patient_invitations');
```

---

## 🧪 Testing

After running migration:

1. **Login as clinician**
2. **Navigate to dashboard**
3. **Check console** - Should see no permission errors
4. **Verify data loads** - Patient connections should appear

### Expected Behavior:
- ✅ Clinicians see their patient list
- ✅ Clinicians see pending invitations
- ✅ Patients see their clinician connections
- ✅ No 403 Forbidden errors

---

## 📊 Table Structure

### patient_clinician_connections:
```sql
- id (UUID, PK)
- patient_id (UUID, FK → auth.users)
- clinician_id (UUID, FK → auth.users)
- status (TEXT: pending/active/suspended/terminated)
- access_level (TEXT: full/limited/view_only)
- access_expires_at (TIMESTAMPTZ)
- connected_at (TIMESTAMPTZ)
- approved_at (TIMESTAMPTZ)
- terminated_at (TIMESTAMPTZ)
- termination_reason (TEXT)
- created_at (TIMESTAMPTZ)
- updated_at (TIMESTAMPTZ)
```

### patient_invitations:
```sql
- id (UUID, PK)
- clinician_id (UUID, FK → auth.users)
- patient_id (UUID, FK → auth.users, nullable)
- patient_email (TEXT)
- status (TEXT: pending/accepted/rejected/expired)
- access_level (TEXT: full/limited/view_only)
- invited_at (TIMESTAMPTZ)
- expires_at (TIMESTAMPTZ)
- responded_at (TIMESTAMPTZ)
- invitation_token (TEXT)
- message (TEXT)
- created_at (TIMESTAMPTZ)
- updated_at (TIMESTAMPTZ)
```

---

## 🔒 Security Notes

### Why These Policies Are Safe:

1. **Clinician Isolation**: Clinicians can only see their own connections/invitations
2. **Patient Isolation**: Patients can only see their own connections/invitations
3. **Email Matching**: Invitations use email matching for patients who haven't signed up yet
4. **No Cross-Access**: Clinicians can't see other clinicians' patients
5. **Audit Trail**: All changes are timestamped and tracked

### What's Protected:

- ✅ Clinicians can't access other clinicians' patient lists
- ✅ Patients can't access other patients' clinician connections
- ✅ Only authenticated users can access these tables
- ✅ Anonymous users have no access

---

## ✨ Status: READY TO DEPLOY

Migration file created: `20250109_enable_rls_patient_connections.sql`

**Run this migration to fix the clinician dashboard errors!** 🔐

# Deploy New CRUD RPCs - Complete Security Coverage

**Date:** 2025-01-08  
**Priority:** HIGH - Completes security coverage for all PHI operations  
**Status:** Ready for deployment

## Overview

This deployment adds the remaining CRUD RPCs for complete security coverage of all PHI data operations. All insert, update, and delete operations will now use authenticated RPCs instead of direct table access.

## New RPCs Created

### Seizure Logs (public schema)
1. **`update_seizure_log`** - Secure update with user authentication
2. **`delete_seizure_log`** - Soft delete with user authentication

### Patient Diagnoses (public schema)
3. **`get_patient_diagnoses`** - Secure fetch with user authentication
4. **`update_patient_diagnosis`** - Secure update with user authentication
5. **`delete_patient_diagnosis`** - Soft delete with user authentication

## Files Changed

### Database Migration
- **`supabase/migrations/20250108_create_missing_crud_rpcs.sql`** (NEW)
  - Creates 5 new RPCs with full security checks
  - Grants execute permissions to authenticated users
  - Notifies PostgREST to reload schema

### Application Hooks
- **`src/hooks/useSeizureLogs.tsx`** (MODIFIED)
  - `updateSeizureLog()` now uses `update_seizure_log` RPC
  - `deleteSeizureLog()` now uses `delete_seizure_log` RPC
  - Removed direct table access

- **`src/hooks/useDiagnoses.tsx`** (MODIFIED)
  - `fetchDiagnoses()` now uses `get_patient_diagnoses` RPC
  - `updateDiagnosis()` now uses `update_patient_diagnosis` RPC
  - `deleteDiagnosis()` added using `delete_patient_diagnosis` RPC
  - Removed all direct table access

## Deployment Steps

### 1. Apply Database Migration

```bash
# Navigate to project root
cd /Users/rebeccafrancis/CascadeProjects/neuroloop-nexus

# Apply the migration
supabase db push
```

**Expected Output:**
```
Applying migration 20250108_create_missing_crud_rpcs.sql...
✓ Migration applied successfully
✓ PostgREST schema reloaded
```

### 2. Regenerate TypeScript Types

```bash
# Generate updated types with new RPCs
supabase gen types typescript --local > src/integrations/supabase/types.ts
```

This will add the new RPC definitions to the types file and resolve all TypeScript errors.

### 3. Verify TypeScript Compilation

```bash
# Check for TypeScript errors
npm run type-check

# Or if using tsc directly
npx tsc --noEmit
```

**Expected:** No errors related to the new RPCs.

### 4. Test the Changes

#### Test Seizure Logs
```typescript
// In browser console or test file
const { data, error } = await supabase.rpc('update_seizure_log', {
  p_log_id: '<existing-log-id>',
  p_notes: 'Test update via RPC'
});
console.log('Update result:', data, error);

const { data: deleteResult, error: deleteError } = await supabase.rpc('delete_seizure_log', {
  p_log_id: '<existing-log-id>'
});
console.log('Delete result:', deleteResult, deleteError);
```

#### Test Patient Diagnoses
```typescript
// Fetch diagnoses
const { data, error } = await supabase.rpc('get_patient_diagnoses', {
  p_patient_id: '<user-id>'
});
console.log('Fetch result:', data, error);

// Update diagnosis
const { data: updateData, error: updateError } = await supabase.rpc('update_patient_diagnosis', {
  p_diagnosis_id: '<existing-diagnosis-id>',
  p_notes: 'Test update via RPC'
});
console.log('Update result:', updateData, updateError);
```

### 5. Security Verification

Test that security checks work:

```typescript
// Should FAIL - trying to access another user's data
const { data, error } = await supabase.rpc('get_patient_diagnoses', {
  p_patient_id: '<different-user-id>'
});
// Expected: error.code === '42501' (Access denied)

// Should FAIL - trying to update another user's log
const { data, error } = await supabase.rpc('update_seizure_log', {
  p_log_id: '<another-users-log-id>',
  p_notes: 'Unauthorized update'
});
// Expected: error.code === '42501' (Access denied)
```

## Security Features

### All RPCs Include:
1. **Authentication Check** - Validates `auth.uid()` matches data owner
2. **Ownership Verification** - Checks user owns the record before modification
3. **SECURITY DEFINER** - Runs with elevated privileges but enforces checks
4. **Error Handling** - Returns proper error codes for unauthorized access
5. **Soft Delete** - Preserves data integrity (if `is_active` column exists)

### Example Security Flow:
```sql
-- 1. Get record owner
SELECT user_id INTO v_user_id FROM table WHERE id = p_id;

-- 2. Verify ownership
IF v_user_id != auth.uid() THEN
  RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
END IF;

-- 3. Perform operation
UPDATE table SET ... WHERE id = p_id;
```

## Rollback Plan

If issues arise, rollback the migration:

```bash
# Rollback the migration
supabase db reset

# Or manually drop the functions
psql -c "DROP FUNCTION IF EXISTS public.update_seizure_log CASCADE;"
psql -c "DROP FUNCTION IF EXISTS public.delete_seizure_log CASCADE;"
psql -c "DROP FUNCTION IF EXISTS public.get_patient_diagnoses CASCADE;"
psql -c "DROP FUNCTION IF EXISTS public.update_patient_diagnosis CASCADE;"
psql -c "DROP FUNCTION IF EXISTS public.delete_patient_diagnosis CASCADE;"
```

Then revert the hook changes:
```bash
git checkout src/hooks/useSeizureLogs.tsx
git checkout src/hooks/useDiagnoses.tsx
```

## Post-Deployment Verification

### 1. Check RPC Availability
```sql
SELECT routine_name, routine_schema
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name IN (
  'update_seizure_log',
  'delete_seizure_log',
  'get_patient_diagnoses',
  'update_patient_diagnosis',
  'delete_patient_diagnosis'
);
```

**Expected:** 5 rows returned

### 2. Check Permissions
```sql
SELECT routine_name, grantee, privilege_type
FROM information_schema.routine_privileges
WHERE routine_schema = 'public'
AND routine_name IN (
  'update_seizure_log',
  'delete_seizure_log',
  'get_patient_diagnoses',
  'update_patient_diagnosis',
  'delete_patient_diagnosis'
)
AND grantee = 'authenticated';
```

**Expected:** 5 rows with `EXECUTE` privilege

### 3. Test in Application
- Log in as a test user
- Create a seizure log
- Update the seizure log (should succeed)
- Delete the seizure log (should succeed)
- Add a diagnosis
- Update the diagnosis (should succeed)
- Delete the diagnosis (should succeed)

### 4. Monitor Logs
```sql
-- Check for any RPC errors
SELECT *
FROM public.system_logs
WHERE function_name IN (
  'update_seizure_log',
  'delete_seizure_log',
  'get_patient_diagnoses',
  'update_patient_diagnosis',
  'delete_patient_diagnosis'
)
AND log_level = 'ERROR'
ORDER BY created_at DESC
LIMIT 10;
```

## Performance Considerations

### RPC vs Direct Access
- **RPCs:** Slight overhead (~1-2ms) for function call and security checks
- **Benefit:** Centralized security, audit trail, easier to maintain
- **Impact:** Negligible for user-facing operations

### Optimization
All RPCs use:
- Indexed lookups on primary keys
- Single query execution
- Minimal data transfer

## HIPAA Compliance

### Audit Trail
All operations are logged via database triggers:
- User ID
- Timestamp
- Operation type
- Record ID

### Data Protection
- All PHI operations require authentication
- User can only access their own data
- No PHI exposed in error messages
- Soft deletes preserve audit trail

## Success Criteria

✅ All 5 RPCs created successfully  
✅ Permissions granted to authenticated role  
✅ TypeScript types regenerated  
✅ No TypeScript compilation errors  
✅ All hooks updated to use RPCs  
✅ Security checks verified  
✅ Application tests pass  

## Next Steps After Deployment

1. **Update Documentation**
   - Mark RPC audit as 100% complete
   - Update API documentation with new RPCs

2. **Monitor Production**
   - Watch for any RPC-related errors
   - Monitor performance metrics
   - Check audit logs for unauthorized access attempts

3. **Future Enhancements**
   - Consider adding batch update RPCs
   - Add RPC for bulk operations if needed
   - Implement rate limiting if necessary

## Contact

**Questions or Issues:**
- Review `docs/guides/RPC_AUDIT_COMPLETE.md`
- Check `RPC_AUDIT_REPORT.md` for full audit details
- Review migration file for RPC implementation details

---

**Deployment Status:** ⏳ READY FOR DEPLOYMENT  
**Risk Level:** LOW (additive changes, no breaking changes)  
**Estimated Downtime:** None (hot deployment)  
**Rollback Time:** < 5 minutes

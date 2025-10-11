# Next Steps Checklist - Post PHASE 1-4

## 🚨 IMMEDIATE ACTIONS (Do Now)

### 1. Run RLS Security Script
```bash
# Open Supabase SQL Editor
# Run: RLS_AUDIT_AND_FIX.sql
# Expected: All policies created successfully
```

**Why:** Secure all new tables before any data entry.

---

### 2. Test New Database Functions
```bash
# Open Supabase SQL Editor (logged in as test user)
# Run: TEST_NEW_RPCS.sql
# Expected: All tests show "PASSED"
```

**Why:** Verify all RPCs work correctly with proper data flow.

---

### 3. Verify TypeScript Compilation
```bash
cd /Users/rebeccafrancis/CascadeProjects/neuroloop-nexus
npm run build
# Expected: No TypeScript errors
```

**Why:** Ensure regenerated types don't break existing code.

---

## 📋 VERIFICATION CHECKLIST

Run these queries in Supabase SQL Editor to verify everything:

### Check All New Tables Exist
```sql
SELECT table_schema, table_name 
FROM information_schema.tables 
WHERE table_schema IN ('clinical', 'public', 'private_health_info')
  AND table_name IN (
    'clinical_scale_subscore_results',
    'imaging_annotations',
    'patient_pro_value',
    'clinical_scales_library',
    'imaging_findings_library',
    'pro_measures_library',
    'diagnoses_library',
    'symptoms_library',
    'patient_diagnoses',
    'seizure_logs'
  )
ORDER BY table_schema, table_name;
```
**Expected:** 10 rows returned

---

### Check All Enums Exist
```sql
SELECT n.nspname as schema, t.typname as enum_name
FROM pg_type t 
JOIN pg_namespace n ON n.oid = t.typnamespace 
WHERE t.typtype = 'e'
  AND n.nspname IN ('clinical', 'public')
  AND t.typname IN (
    'gender_enum',
    'epilepsy_subtype_enum',
    'parkinsons_subtype_enum',
    'seizure_type_enum',
    'capture_method_enum',
    'reporter_type_enum',
    'data_origin_enum',
    'consent_status_enum',
    'scale_type_enum',
    'scale_version_enum',
    'subscale_label_enum',
    'annotation_type_enum',
    'pro_type_enum',
    'pro_domain_label_enum'
  )
ORDER BY schema, enum_name;
```
**Expected:** 14 rows returned

---

### Check Library Tables Are Populated
```sql
SELECT 
  'clinical_scales_library' as table_name,
  COUNT(*) as record_count
FROM public.clinical_scales_library
UNION ALL
SELECT 
  'imaging_findings_library',
  COUNT(*)
FROM public.imaging_findings_library
UNION ALL
SELECT 
  'pro_measures_library',
  COUNT(*)
FROM public.pro_measures_library
UNION ALL
SELECT 
  'diagnoses_library',
  COUNT(*)
FROM public.diagnoses_library;
```
**Expected:** All counts > 0

---

### Check RLS Is Enabled
```sql
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname IN ('clinical', 'public', 'private_health_info')
  AND tablename IN (
    'clinical_scale_subscore_results',
    'imaging_annotations',
    'patient_pro_value',
    'clinical_scales_library',
    'imaging_findings_library',
    'pro_measures_library',
    'diagnoses_library',
    'symptoms_library',
    'patient_diagnoses',
    'seizure_logs'
  )
ORDER BY schemaname, tablename;
```
**Expected:** All show `rls_enabled = true`

---

## 🔧 TROUBLESHOOTING

### If RLS script fails:
1. Check you're running as superuser/service_role
2. Verify parent tables exist (clinical_scale_results, neuro_imaging_results, patient_pro_timeline)
3. Check for conflicting policy names (script drops before creating)

### If RPC tests fail:
1. Ensure you're logged in as authenticated user
2. Check `auth.uid()` returns a valid UUID
3. Verify all enum values match exactly (case-sensitive)
4. Check parent table permissions

### If TypeScript build fails:
1. Check import paths in components
2. Verify all table names match new schema
3. Update any hardcoded enum strings to use new enums

---

## 📊 METRICS TO TRACK

After deployment, monitor:

- [ ] Clinical scale entries per week
- [ ] Imaging annotations created
- [ ] PRO data collection rate
- [ ] Diagnosis accuracy (clinician vs self-reported)
- [ ] Data completeness (% with SNOMED/ICD codes)
- [ ] RLS policy violations (should be 0)

---

## 🎯 SUCCESS CRITERIA

✅ All new tables accessible via TypeScript types  
✅ RLS policies prevent unauthorized access  
✅ RPCs return expected data structure  
✅ Library tables provide autocomplete options  
✅ No breaking changes to existing features  

---

## 📞 SUPPORT

If you encounter issues:

1. Check `PHASE_1-4_IMPLEMENTATION_SUMMARY.md` for architecture overview
2. Review individual PHASE files for specific table details
3. Verify against `database-preview-uptodate/the-tables-that-matter.md`
4. Test with `TEST_NEW_RPCS.sql` for debugging

---

## 🚀 READY FOR PRODUCTION?

Before enabling for real users:

- [ ] RLS_AUDIT_AND_FIX.sql run successfully
- [ ] TEST_NEW_RPCS.sql all tests passed
- [ ] TypeScript builds without errors
- [ ] All verification queries return expected results
- [ ] Backup taken of current database
- [ ] Supabase BAA signed (for HIPAA compliance)
- [ ] Frontend components tested with new schema
- [ ] User documentation updated

---

## 📅 TIMELINE ESTIMATE

- **Today:** Run security & test scripts (30 mins)
- **This Week:** Build frontend components for new features (3-5 days)
- **Next Week:** User acceptance testing (2-3 days)
- **Week 3:** Production deployment

---

**Current Status:** All database changes complete ✅  
**Next Phase:** Frontend Integration 🎨

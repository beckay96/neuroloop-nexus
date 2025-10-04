# 🗄️ CURRENT DATABASE SCHEMA - AS DEPLOYED

**Date Deployed:** 2025-10-05  
**Status:** ✅ LIVE IN SUPABASE  
**Version:** Research-Grade + HIPAA Compliant

---

## 📦 WHAT'S DEPLOYED

Your Supabase database currently has:
- **25+ enums** for data validation
- **25+ tables** with proper relationships
- **RLS policies** on all user data
- **Audit triggers** on all PHI tables
- **Breach detection** system
- **IP address hashing** for audit logs
- **Research anonymization** with consent checking
- **Access expiry** for carers/clinicians

---

## 📊 TABLE SUMMARY

### User Management (5 tables)
1. **auth.users** - Supabase auth (managed by Supabase)
2. **profiles** - User type and onboarding status
3. **patient_profiles** - Patient demographics  
4. **clinician_profiles** - Clinician credentials
5. **carer_profiles** - Carer information

### Medical Reference Data (2 tables)
6. **conditions** - Epilepsy, Parkinson's, etc. (seed data)
7. **medications** - Medication database with RxNorm codes

### User Medical Data (3 tables)
8. **user_conditions** - User's diagnosed conditions
9. **user_medications** - User's current medications
10. **patient_onboarding_data** - Onboarding choices

### Tracking Tables (6 tables)
11. **seizure_logs** - Research-grade seizure tracking (15+ fields)
12. **medication_logs** - Adherence + side effects + plasma levels
13. **symptom_logs** - Symptom tracking with relief effectiveness
14. **daily_wellness_logs** - Mood/energy/sleep/stress
15. **menstrual_cycle_logs** - Catamenial pattern detection
16. **lab_results** - Clinical lab data

### Connections (2 tables)
17. **carer_relationships** - Patient-carer connections with expiry
18. **patient_clinician_connections** - Patient-clinician access with expiry

### Research & Compliance (3 tables)
19. **research_consent** - Granular consent per data type
20. **research_user_mapping** - Protected schema, anonymization mapping
21. **audit_log** - All data access logged with hashed IPs
22. **security_incidents** - Breach detection tracking

### Wearable Integration (2 tables)
23. **wearable_devices** - Connected devices
24. **wearable_data_logs** - Heart rate, accelerometer, etc.

### Settings (1 table)
25. **daily_tracking_preferences** - User's tracking preferences

### Protected Schema (2 tables)
26. **protected.research_user_mapping** - Re-identification protection
27. **protected.system_settings** - IP hash salt storage

---

## 🔐 SECURITY FEATURES

### Row Level Security (RLS)
Every user table has RLS enabled:
- Users can only see their own data
- Carers can see patient data if relationship active and not expired
- Clinicians can see patient data if connection active and not expired
- Researchers can only see anonymized data with active consent

### Audit Logging
Every INSERT/UPDATE/DELETE on PHI tables triggers:
- User ID logged
- Action logged (INSERT/UPDATE/DELETE)
- Table name logged
- Record ID logged
- IP address logged (HASHED for privacy)
- Timestamp logged

### IP Address Hashing
Audit logs store `ip_address_hash` instead of raw IP:
- Uses SHA-256 hash
- Salt stored in `protected.system_settings`
- Protects user location privacy per HIPAA §164.514(b)(2)(i)(B)

### Access Expiry
Both carer and clinician connections have:
- `access_expires_at` (default 1 year)
- `last_verified_at` for tracking
- Automatic status changes when expired
- Audit log entries on expiry

### Breach Detection
`security_incidents` table tracks:
- Excessive data access (>100 queries in 5 min)
- Failed login attempts (>5 in 10 min)
- Suspicious patterns
- Resolution status

---

## 📋 ENUM REFERENCE

All enums are validated at database level (no free-text injection risk):

### User Enums
- `user_type_enum`: patient, carer, clinician, researcher, admin
- `gender_enum`: male, female, non_binary, other, prefer_not_to_say

### Seizure Enums
- `seizure_type_enum`: 11 ILAE-aligned types
- `consciousness_level_enum`: 5 levels from fully_conscious to unknown
- `seizure_trigger_enum`: 12 common triggers

### Medical Enums
- `medication_frequency_enum`: once_daily to as_needed
- `medication_adherence_enum`: taken_on_time to reduced_dose
- `side_effect_severity_enum`: none to life_threatening
- `symptom_type_enum`: 16 neurological symptoms

### Wellness Enums
- `mood_type_enum`: very_poor to very_good
- `energy_level_enum`: exhausted to very_high
- `sleep_quality_enum`: very_poor to excellent

### Body & Location
- `body_location_enum`: 14 body areas for symptom tracking

### Menstrual Enums
- `menstrual_flow_enum`: spotting to very_heavy
- `menstrual_phase_enum`: menstrual, follicular, ovulation, luteal

### Research Enums
- `research_data_type_enum`: seizure_data to all_data
- `consent_status_enum`: pending, active, withdrawn, expired

### Connection Enums
- `connection_status_enum`: pending, active, inactive, rejected, expired, verification_required, revoked

### Device Enums
- `device_type_enum`: smartwatch, fitness_tracker, eeg_device, etc.
- `device_data_type_enum`: heart_rate, accelerometer, temperature, etc.

---

## 🔑 KEY RELATIONSHIPS

### Patient Data Flow
```
auth.users (Supabase Auth)
    ↓
profiles (user_type = 'patient')
    ↓
patient_profiles (demographics)
    ↓
user_conditions → conditions (reference)
user_medications → medications (reference)
seizure_logs
medication_logs
symptom_logs
daily_wellness_logs
menstrual_cycle_logs
    ↓
research_consent (per data type)
    ↓
protected.research_user_mapping (anonymization)
```

### Access Control Flow
```
Patient (auth.users)
    ↓
carer_relationships → Carer (access if status='active' AND not expired)
patient_clinician_connections → Clinician (access if status='active' AND not expired)
    ↓
audit_log (all access logged)
```

### Research Data Flow
```
User Data (seizure_logs, etc.)
    ↓
research_consent (check consent_status='active' for data_type)
    ↓
protected.research_user_mapping (get research_user_id)
    ↓
Research Tables (anonymized, no PII)
```

---

## 📝 IMPORTANT FIELD NOTES

### UUID vs TEXT
- **All IDs are UUIDs** (not SERIAL integers)
- **All names/descriptions are TEXT** (not VARCHAR)
- This is intentional for scalability and flexibility

### Array Fields
Several tables use PostgreSQL arrays for multi-select:
- `seizure_logs.pre_ictal_symptoms` → `symptom_type_enum[]`
- `seizure_logs.post_ictal_symptoms` → `symptom_type_enum[]`
- `seizure_logs.identified_triggers` → `seizure_trigger_enum[]`
- `medication_logs.side_effect_types` → `symptom_type_enum[]`
- `symptom_logs.body_locations` → `body_location_enum[]`
- `conditions.tracking_features_array` → TEXT[]
- `user_conditions.tracking_features_enabled` → TEXT[]

### Time Fields
Most tables have both DATE and TIME fields for precision:
- `event_date` + `event_time`
- `log_date` + `log_time`

This allows:
- Querying by date range
- Precise temporal analysis
- Timezone handling

### Decimal Fields
Use DECIMAL for precision (not FLOAT):
- `sleep_hours` → DECIMAL (e.g., 7.5 hours)
- `dosage_amount` → DECIMAL (e.g., 2.5 mg)
- `plasma_level` → DECIMAL (clinical accuracy required)
- `basal_body_temperature` → DECIMAL (e.g., 36.7°C)

---

## 🔍 HOW TO QUERY

### Get All User Data
```sql
SELECT 
  p.user_type,
  pp.first_name,
  pp.last_name,
  COUNT(DISTINCT sl.id) as seizure_count,
  COUNT(DISTINCT ml.id) as medication_logs_count,
  COUNT(DISTINCT dwl.id) as daily_logs_count
FROM profiles p
LEFT JOIN patient_profiles pp ON pp.user_id = p.id
LEFT JOIN seizure_logs sl ON sl.user_id = p.id
LEFT JOIN medication_logs ml ON ml.user_id = p.id
LEFT JOIN daily_wellness_logs dwl ON dwl.user_id = p.id
WHERE p.id = 'USER_UUID_HERE'
GROUP BY p.user_type, pp.first_name, pp.last_name;
```

### Check Research Consent
```sql
SELECT data_type, consent_status, consent_given_at
FROM research_consent
WHERE user_id = 'USER_UUID_HERE'
AND consent_status = 'active';
```

### View Audit Trail
```sql
SELECT 
  action,
  table_name,
  record_id,
  ip_address_hash,
  created_at
FROM audit_log
WHERE user_id = 'USER_UUID_HERE'
ORDER BY created_at DESC
LIMIT 50;
```

### Check for Security Incidents
```sql
SELECT 
  incident_type,
  severity,
  description,
  detected_at,
  resolved_at
FROM security_incidents
WHERE resolved_at IS NULL
ORDER BY severity DESC, detected_at DESC;
```

### Get Condition Tracking Features
```sql
SELECT 
  c.name,
  c.tracking_features_array,
  uc.tracking_features_enabled
FROM user_conditions uc
JOIN conditions c ON c.id = uc.condition_id
WHERE uc.user_id = 'USER_UUID_HERE';
```

---

## 📚 COMPLETE SCHEMA FILES

### Deployment Order (Already Applied):
1. **COMPLETE_RESEARCH_GRADE_SCHEMA.sql** (1003 lines)
   - All tables, enums, RLS policies, audit triggers
   - Seed data for conditions and medications

2. **COMPLIANCE_FIXES_CRITICAL.sql** (400+ lines)
   - IP address hashing
   - Protected research mapping
   - Access expiry enforcement
   - Breach detection system

3. **DEPLOYMENT_FIXES_IMMEDIATE.sql** (140 lines)
   - Added missing enum values
   - Fixed IP salt storage method
   - Updated hash_ip() function

### All Three Are Deployed ✅

---

## ✅ VERIFICATION

To verify your database is correctly deployed:

```sql
-- Should return 25+
SELECT COUNT(*) FROM information_schema.tables 
WHERE table_schema = 'public';

-- Should return 25+
SELECT COUNT(*) FROM pg_type 
WHERE typnamespace = 'public'::regnamespace AND typtype = 'e';

-- Should show all connection_status values including new ones
SELECT unnest(enum_range(NULL::connection_status_enum));

-- Should return your salt
SELECT value FROM protected.system_settings WHERE key = 'ip_salt';

-- Should return hashed IPs (64-char hex strings)
SELECT ip_address_hash FROM audit_log LIMIT 1;
```

---

## 🚀 FRONTEND INTEGRATION

Your frontend enum mappings in `src/utils/databaseEnums.ts` match **100%** with database.

**PatientDashboard.tsx** now saves to database:
- ✅ Seizure logs → `seizure_logs`
- ✅ Daily wellness → `daily_wellness_logs` (with enum conversion)
- ✅ Medication logs → `medication_logs`
- ✅ Symptom logs → `symptom_logs`
- ✅ Temperature → `menstrual_cycle_logs`

**PatientOnboarding.tsx** creates records in:
- ✅ `patient_profiles`
- ✅ `profiles`
- ✅ `patient_onboarding_data`
- ✅ `user_conditions`
- ✅ `user_medications`
- ✅ `research_consent`
- ✅ `daily_tracking_preferences`

---

## 📞 NEED TO ADD/CHANGE SOMETHING?

### Adding a New Enum Value:
```sql
ALTER TYPE your_enum_name ADD VALUE IF NOT EXISTS 'new_value';
```

### Adding a New Column:
```sql
ALTER TABLE table_name ADD COLUMN column_name data_type;
```

### Adding RLS Policy:
```sql
CREATE POLICY "policy_name" ON table_name
FOR SELECT USING (auth.uid() = user_id);
```

### Adding Audit Trigger:
```sql
CREATE TRIGGER audit_table_name
  AFTER INSERT OR UPDATE OR DELETE ON table_name
  FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_function();
```

---

## 🎯 SUMMARY

Your database is:
- ✅ **Fully deployed** and operational
- ✅ **HIPAA compliant** (with BAA when you upgrade to Teams)
- ✅ **Research-grade** with FHIR/HL7 alignment
- ✅ **Secure** with RLS, audit logging, IP hashing
- ✅ **Frontend-aligned** with enum mappings
- ✅ **Ready for testing** with fake data
- ⏳ **Ready for production** after Teams upgrade + BAA signing

**All SQL files in this directory represent the EXACT schema deployed to your Supabase database.**

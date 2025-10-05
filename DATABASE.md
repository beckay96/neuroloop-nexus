# Database Documentation - NeuroLoop Nexus

Complete PostgreSQL database schema documentation.

**Database:** PostgreSQL 15+ (Supabase)  
**Total Tables:** 34  
**RLS Enabled:** 29/34 (85%)  
**Last Updated:** 2025-10-05

---

## 📊 Database Overview

### Architecture
- **Type:** PostgreSQL with Supabase extensions
- **Security:** Row Level Security (RLS) on all user data
- **Audit:** Complete audit trail via triggers
- **Encryption:** At rest and in transit
- **Compliance:** HIPAA-ready architecture

### Key Statistics
- **Tables:** 34 base tables
- **Functions:** 13 custom functions
- **Triggers:** 28 active triggers
- **Indexes:** 85+ for performance
- **Constraints:** 198 (PKs, FKs, UNIQUEs, CHECKs)

---

## 🗂 Table Categories

### User Management (8 tables)
- `profiles` - Base user profiles
- `patient_profiles` - Patient-specific data
- `carer_profiles` - Carer-specific data
- `patient_onboarding_data` - Patient onboarding info
- `clinician_onboarding_data` - Clinician onboarding info
- `carer_onboarding_data` - Carer onboarding info
- `researcher_access_requests` - Researcher access workflow
- `onboarding_progress` - Tracks onboarding completion

### Health Data (10 tables)
- `conditions` - Master list of neurological conditions
- `user_conditions` - User's diagnosed conditions
- `medications` - Master medication list
- `user_medications` - User's current medications
- `seizure_logs` - Seizure tracking
- `medication_logs` - Medication adherence
- `symptom_logs` - Symptom tracking
- `daily_wellness_logs` - Overall wellness
- `menstrual_cycle_logs` - Menstrual tracking
- `tracking_entries` - Unified tracking table

### Relationships (3 tables)
- `patient_clinician_connections` - Patient-clinician relationships
- `carer_relationships` - Carer-patient relationships
- `patient_invitations` - Invitation system

### Preferences (1 table)
- `daily_tracking_preferences` - User tracking preferences

### Research (6 tables)
- `research_consent` - User consent for research
- `research_user_mapping` - De-identified user mapping
- `research_seizure_data` - De-identified seizure data
- `research_medication_adherence` - De-identified medication data
- `research_symptom_patterns` - De-identified symptom data
- `research_menstrual_seizure_correlation` - Research correlations

### System (6 tables)
- `audit_log` - Complete audit trail
- `security_incidents` - Security incident tracking
- `user_achievements` - Gamification achievements
- `user_points` - Gamification points/levels

---

## 📋 Core Table Schemas

### profiles
**Purpose:** Base user profile for all user types

```sql
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    user_type TEXT NOT NULL CHECK (user_type IN ('patient', 'clinician', 'researcher', 'carer')),
    onboarding_completed BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**RLS:** ✅ Users can only see/edit their own profile  
**Indexes:** `id` (primary key)  
**Triggers:** `handle_updated_at`, `audit_trigger_function`

---

### patient_onboarding_data
**Purpose:** Stores patient onboarding responses

```sql
CREATE TABLE patient_onboarding_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name TEXT,
    last_name TEXT,
    date_of_birth DATE,
    gender TEXT,
    selected_conditions UUID[],  -- Array of condition IDs
    track_menstrual_cycle BOOLEAN DEFAULT false,
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**RLS:** ✅ Users can only access their own data  
**Triggers:** 
- `assign_tracking_from_onboarding` - Auto-assigns tracking features
- `setup_user_tracking` - Creates initial tracking preferences
- `audit_trigger_function`

---

### conditions
**Purpose:** Master list of supported neurological conditions

```sql
CREATE TABLE conditions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    tracking_features_array tracking_feature_enum[],  -- Auto-assigned features
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Pre-populated Data:**
- Epilepsy → `[seizure, mood, energy, sleep, symptoms]`
- Parkinson's Disease → `[tremor, gait, mood, energy, sleep, symptoms]`
- Migraine → `[symptoms, mood, sleep]`
- Multiple Sclerosis → `[gait, tremor, energy, mood, temperature, symptoms]`

**RLS:** ✅ Read-only for all users

---

### user_conditions
**Purpose:** Links users to their diagnosed conditions

```sql
CREATE TABLE user_conditions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    condition_id UUID NOT NULL REFERENCES conditions(id) ON DELETE CASCADE,
    tracking_features_enabled tracking_feature_enum[],  -- Auto-populated
    diagnosis_date DATE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, condition_id)
);
```

**RLS:** ✅ Users can only access their own conditions  
**Triggers:** 
- `assign_tracking_on_condition` - **CRITICAL** Auto-assigns tracking features from condition
- `audit_trigger_function`

---

### daily_tracking_preferences
**Purpose:** User's daily tracking preferences (auto-populated)

```sql
CREATE TABLE daily_tracking_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    tracking_types tracking_feature_enum[],  -- Auto-populated from conditions
    notification_enabled BOOLEAN DEFAULT true,
    reminder_time TIME,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**RLS:** ✅ Users can only access their own preferences  
**Auto-populated by:** `assign_tracking_from_onboarding` trigger

---

### patient_invitations
**Purpose:** HIPAA-compliant patient invitation system

```sql
CREATE TABLE patient_invitations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinician_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    patient_email TEXT NOT NULL,
    patient_email_hash TEXT NOT NULL,  -- SHA-256 for privacy
    invitation_token TEXT NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
    invitation_message TEXT,
    status TEXT NOT NULL CHECK (status IN ('pending', 'accepted', 'expired', 'cancelled')),
    invited_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days'),
    accepted_at TIMESTAMPTZ,
    patient_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(clinician_id, patient_email_hash)
);
```

**RLS:** ✅ Clinicians see own invitations; public can view by token  
**Triggers:**
- `invitation_expiry_check` - Auto-expires old invitations
- `audit_trigger_function`

**Functions:**
- `hash_email(email)` - SHA-256 email hashing
- `accept_invitation(token, patient_id)` - Invitation acceptance
- `expire_old_invitations()` - Batch expiration

---

### tracking_entries
**Purpose:** Unified daily tracking for all metrics

```sql
CREATE TABLE tracking_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    tracking_type tracking_feature_enum NOT NULL,
    entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
    value NUMERIC,
    severity INTEGER CHECK (severity >= 1 AND severity <= 10),
    notes TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**RLS:** ✅ Users can only access their own entries  
**Indexes:** 
- `user_id` 
- `entry_date`
- `tracking_type`
- `(user_id, entry_date)` composite

---

### audit_log
**Purpose:** HIPAA-required audit trail

```sql
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    action TEXT NOT NULL,  -- 'INSERT', 'UPDATE', 'DELETE', custom actions
    table_name TEXT NOT NULL,
    record_id TEXT,
    ip_address INET,  -- Client IP
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**RLS:** ❌ No RLS (system-level logging)  
**Retention:** 7 years (HIPAA requirement)  
**Indexes:** `user_id`, `table_name`, `created_at`

---

## 🔧 Custom Functions

### assign_tracking_features_on_condition()
**Purpose:** Auto-assigns tracking features when user adds condition  
**Type:** TRIGGER (BEFORE INSERT/UPDATE on user_conditions)  
**Security:** SECURITY DEFINER, fixed search_path

```sql
-- When user adds "Epilepsy":
-- 1. Gets tracking_features_array from conditions table
-- 2. Sets user_conditions.tracking_features_enabled
-- 3. Updates daily_tracking_preferences
```

---

### assign_tracking_from_patient_onboarding()
**Purpose:** Auto-assigns tracking on onboarding completion  
**Type:** TRIGGER (AFTER INSERT/UPDATE on patient_onboarding_data)  
**Security:** SECURITY DEFINER, fixed search_path

```sql
-- When patient completes onboarding:
-- 1. Collects tracking features from all selected conditions
-- 2. Adds menstruation tracking if opted in
-- 3. Creates daily_tracking_preferences record
```

---

### hash_email(email TEXT)
**Purpose:** Consistent SHA-256 email hashing  
**Type:** FUNCTION  
**Security:** IMMUTABLE, fixed search_path

```sql
-- Example:
SELECT hash_email('test@example.com');
-- Returns: 973dfe463ec85785f5f95af5ba3906eedb2d931c24e69824a89ea65dba4e813b
```

---

### accept_invitation(token TEXT, patient_id UUID)
**Purpose:** Accept patient invitation and create connection  
**Type:** FUNCTION  
**Security:** SECURITY DEFINER, fixed search_path

```sql
-- Called after patient signs up:
-- 1. Validates token and expiry
-- 2. Updates invitation status to 'accepted'
-- 3. Creates patient_clinician_connections record
-- 4. Logs in audit_log
```

---

## 🔐 Security Features

### Row Level Security (RLS)
**Enabled on 29/34 tables (85%)**

**Example Policy:**
```sql
-- Users can only access their own tracking entries
CREATE POLICY "Users can manage own tracking entries" 
    ON tracking_entries
    FOR ALL 
    USING (auth.uid() = user_id);
```

**No RLS on:**
- `audit_log` - System logging
- `conditions` - Read-only reference data
- `medications` - Read-only reference data
- `research_*` tables - Protected schema
- `security_incidents` - Admin-only

---

### Audit Triggers
**Applied to 20+ tables**

All tables with Protected Health Information (PHI) have audit triggers:
```sql
CREATE TRIGGER audit_table_name
    AFTER INSERT OR UPDATE OR DELETE ON table_name
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();
```

**Logs include:**
- User ID
- Action (INSERT/UPDATE/DELETE)
- Table name
- Record ID
- IP address
- User agent
- Timestamp

---

### Data Encryption
- **At Rest:** Supabase automatic encryption
- **In Transit:** TLS 1.2+
- **Hashed Fields:** 
  - `patient_email_hash` (SHA-256)
  - `ip_address_hash` (SHA-256, if compliance fixes applied)

---

## 📈 Performance Optimization

### Indexes Created: 85+

**Critical Indexes:**
- All primary keys (automatic)
- All foreign keys
- User ID on all user tables
- Date fields on time-series tables
- Composite indexes for common queries
- Partial indexes for filtered queries

**Example:**
```sql
-- Fast lookup of user's tracking on specific date
CREATE INDEX idx_tracking_entries_user_date 
    ON tracking_entries(user_id, entry_date);

-- Fast lookup of pending invitations
CREATE INDEX idx_patient_invitations_expires 
    ON patient_invitations(expires_at) 
    WHERE status = 'pending';
```

---

## 🧪 Verification Queries

### Check Database Health
```sql
-- Total tables
SELECT COUNT(*) FROM information_schema.tables 
WHERE table_schema = 'public';
-- Expected: 34

-- RLS enabled
SELECT COUNT(*) FROM pg_tables 
WHERE schemaname = 'public' AND rowsecurity = true;
-- Expected: 29

-- Active triggers
SELECT COUNT(DISTINCT trigger_name) 
FROM information_schema.triggers 
WHERE event_object_schema = 'public';
-- Expected: 28
```

### Check Tracking Features
```sql
-- Verify conditions have features
SELECT name, tracking_features_array 
FROM conditions 
ORDER BY name;

-- Check user's tracking preferences
SELECT u.email, dtp.tracking_types
FROM daily_tracking_preferences dtp
JOIN auth.users u ON u.id = dtp.user_id;
```

### Check Audit Logging
```sql
-- Recent audit entries
SELECT 
    u.email,
    al.action,
    al.table_name,
    al.created_at
FROM audit_log al
LEFT JOIN auth.users u ON u.id = al.user_id
ORDER BY al.created_at DESC
LIMIT 10;
```

---

## 🔄 Migrations Applied

### Core Schema
- ✅ `COMPLETE_RESEARCH_GRADE_SCHEMA.sql` - Base tables
- ✅ `PATIENT_INVITATIONS_SCHEMA.sql` - Invitation system
- ✅ `ONBOARDING_TRACKING_FEATURES_MIGRATION.sql` - Tracking features
- ✅ `fix_function_search_path_security` - Security hardening

### Recent Fixes (2025-10-05)
- ✅ Created 8 missing tables (onboarding, tracking, security)
- ✅ Added tracking feature auto-assignment triggers
- ✅ Fixed function search_path vulnerability
- ✅ Applied unique constraints
- ✅ Added security incident tracking

---

## 📚 Best Practices

### When Adding New Tables
1. Always enable RLS
2. Add audit trigger for PHI data
3. Add `updated_at` trigger
4. Create necessary indexes
5. Document in this file

### When Modifying Schema
1. Create migration file
2. Test in development first
3. Never delete data without backup
4. Update RLS policies as needed
5. Update documentation

### When Querying Data
1. Always use RLS-protected queries
2. Never bypass RLS in application code
3. Use indexes for performance
4. Limit result sets appropriately
5. Log all PHI access

---

## 🆘 Common Issues

### "Permission denied for table X"
**Cause:** RLS policy blocking access  
**Fix:** Ensure user is authenticated and accessing own data

### "Trigger did not fire"
**Cause:** Trigger condition not met  
**Fix:** Check trigger WHEN clause and event type

### "Slow queries"
**Cause:** Missing indexes  
**Fix:** Add indexes on frequently queried columns

### "Constraint violation"
**Cause:** Duplicate data or invalid references  
**Fix:** Check UNIQUE constraints and foreign keys

---

**For schema changes, always test thoroughly and update this documentation!**

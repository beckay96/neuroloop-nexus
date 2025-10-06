# 🔍 DATABASE STRUCTURE ANALYSIS

## Current Profile Structure (CONFUSING ❌)

### What Exists:

```
auth.users (Supabase)
    ↓
┌─────────────────────────────────────────────────────────┐
│ profiles                                                │
│ - id (PK, = auth.users.id)                            │
│ - user_type (patient/carer/clinician/researcher/admin)│
│ - onboarding_completed                                 │
│ - research_user_id                                     │
│ - NO first_name, last_name                            │
└─────────────────────────────────────────────────────────┘
         ↓
    ┌────────────────────────────────────────────────────┐
    │ patient_profiles                                   │
    │ - id (PK, separate UUID)                          │
    │ - user_id (FK to auth.users, UNIQUE)             │
    │ - first_name, last_name ⚠️                       │
    │ - date_of_birth, gender, timezone                │
    └────────────────────────────────────────────────────┘

    ┌────────────────────────────────────────────────────┐
    │ carer_profiles                                     │
    │ - id (PK, separate UUID)                          │
    │ - user_id (FK to auth.users, UNIQUE)             │
    │ - first_name, last_name ⚠️                       │
    │ - relationship                                     │
    └────────────────────────────────────────────────────┘
```

## 🚨 PROBLEMS WITH CURRENT STRUCTURE

### 1. **Redundant/Missing Data**
❌ `first_name` and `last_name` are in role-specific tables  
❌ But NOT in base `profiles` table  
❌ What about clinicians? Where's `clinician_profiles`?  
❌ What about researchers?  

### 2. **Inconsistent Primary Keys**
❌ `profiles.id` = `auth.users.id` (same value)  
❌ `patient_profiles.id` = separate UUID  
❌ `carer_profiles.id` = separate UUID  
⚠️ **Why the inconsistency?**

### 3. **Query Confusion**
To get a patient's name, you need:
```sql
-- Option 1: Query patient_profiles
SELECT first_name FROM patient_profiles WHERE user_id = ?

-- Option 2: Should it be in profiles?
SELECT ??? FROM profiles WHERE id = ?  -- NO NAME COLUMNS!
```

### 4. **Missing Clinician Table**
❌ `clinician_profiles` table doesn't exist!  
❌ But `profiles.user_type` includes 'clinician'  
❌ Where do clinician names go?  

---

## ✅ RECOMMENDED STRUCTURE (CLEAN)

### Option A: Single Source of Truth (BEST)

```
auth.users (Supabase Auth)
    ↓
┌──────────────────────────────────────────────────────────┐
│ profiles (BASE TABLE - ALL USERS)                       │
│ - id (PK, = auth.users.id)                             │
│ - user_type (patient/carer/clinician/researcher/admin) │
│ - first_name ✅                                         │
│ - last_name ✅                                          │
│ - email (from auth.users)                               │
│ - onboarding_completed                                  │
│ - created_at, updated_at                                │
└──────────────────────────────────────────────────────────┘
         ↓
    ┌────────────────────────────────────────────────────┐
    │ patient_profiles (PATIENT-SPECIFIC DATA)           │
    │ - id (PK, separate UUID)                          │
    │ - user_id (FK to profiles.id, UNIQUE)             │
    │ - date_of_birth ✅ (PHI)                          │
    │ - gender                                           │
    │ - timezone                                         │
    │ - phone_number                                     │
    │ - emergency_contact                                │
    └────────────────────────────────────────────────────┘

    ┌────────────────────────────────────────────────────┐
    │ clinician_profiles (CLINICIAN-SPECIFIC DATA)       │
    │ - id (PK, separate UUID)                          │
    │ - user_id (FK to profiles.id, UNIQUE)             │
    │ - specialty                                        │
    │ - license_number                                   │
    │ - institution                                      │
    │ - phone_number                                     │
    └────────────────────────────────────────────────────┘

    ┌────────────────────────────────────────────────────┐
    │ carer_profiles (CARER-SPECIFIC DATA)               │
    │ - id (PK, separate UUID)                          │
    │ - user_id (FK to profiles.id, UNIQUE)             │
    │ - phone_number                                     │
    │ - preferred_contact_method                         │
    └────────────────────────────────────────────────────┘
```

**Benefits:**
✅ `first_name`, `last_name` in ONE place (profiles)  
✅ Consistent structure for ALL user types  
✅ Role-specific tables only have ROLE-SPECIFIC data  
✅ Easy to query: `SELECT first_name FROM profiles WHERE id = ?`  
✅ No duplication  

---

## 🔧 WHAT NEEDS TO BE FIXED

### 1. Add Columns to `profiles` Table
```sql
ALTER TABLE profiles 
ADD COLUMN first_name TEXT,
ADD COLUMN last_name TEXT,
ADD COLUMN email TEXT,
ADD COLUMN phone_number TEXT;
```

### 2. Migrate Data from Role-Specific Tables
```sql
-- Move patient names to profiles
UPDATE profiles p
SET 
    first_name = pp.first_name,
    last_name = pp.last_name
FROM patient_profiles pp
WHERE p.id = pp.user_id AND p.user_type = 'patient';

-- Move carer names to profiles
UPDATE profiles p
SET 
    first_name = cp.first_name,
    last_name = cp.last_name
FROM carer_profiles cp
WHERE p.id = cp.user_id AND p.user_type = 'carer';
```

### 3. Remove Redundant Columns
```sql
ALTER TABLE patient_profiles 
DROP COLUMN first_name,
DROP COLUMN last_name;

ALTER TABLE carer_profiles 
DROP COLUMN first_name,
DROP COLUMN last_name,
DROP COLUMN relationship; -- This belongs in carer_relationships table
```

### 4. Create Missing `clinician_profiles` Table
```sql
CREATE TABLE clinician_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    specialty TEXT,
    license_number TEXT,
    institution TEXT,
    phone_number TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 📊 CURRENT VS RECOMMENDED

| Aspect | Current ❌ | Recommended ✅ |
|--------|-----------|----------------|
| Name storage | In role-specific tables | In base `profiles` table |
| Clinician data | No table exists | `clinician_profiles` table |
| Query complexity | Need to know user_type first | Query `profiles` for everyone |
| Data duplication | Names duplicated per role | Names in one place |
| Consistency | Inconsistent PKs | Consistent structure |

---

## 🎯 WHAT THE FRONTEND EXPECTS

Looking at your components:

### PatientOnboarding.tsx
Saves to: `patient_profiles` ✅ (exists)  
Needs: first_name, last_name, date_of_birth, gender

### ClinicianOnboarding.tsx (if exists)
Saves to: `clinician_profiles` ❌ (MISSING!)  
Needs: first_name, last_name, specialty, institution

### ManageCarers.tsx
Queries: `carer_profiles` for first_name, last_name ✅ (exists)

### Current Problem
- Frontend tries to save to `profiles` (base table)
- But `profiles` has NO `first_name` or `last_name` columns!
- That's why onboarding fails with 403

---

## 💡 RECOMMENDED FIX

### Quick Fix (Minimal Changes)
1. ✅ Add `first_name`, `last_name` to `profiles` table
2. ✅ Update onboarding to save to `profiles` instead of role-specific tables
3. ✅ Create `clinician_profiles` table
4. ✅ Update auto-create trigger

### Long-term Fix (Proper Structure)
1. Refactor to have names ONLY in `profiles`
2. Remove names from role-specific tables
3. Migrate existing data
4. Update all queries

---

## 🚀 IMMEDIATE ACTION NEEDED

**To fix the 403 error:**
```sql
-- Add missing columns to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS first_name TEXT,
ADD COLUMN IF NOT EXISTS last_name TEXT,
ADD COLUMN IF NOT EXISTS email TEXT;

-- Create clinician_profiles table
CREATE TABLE IF NOT EXISTS clinician_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    specialty TEXT,
    license_number TEXT,
    institution TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Update trigger to handle all user types
-- (Already done above)
```

---

## ❓ QUESTIONS FOR YOU

1. **Do you want names in `profiles` (base table) or keep them in role-specific tables?**
   - Recommendation: Base table ✅

2. **Do clinicians need their own profile table?**
   - Recommendation: Yes ✅

3. **Should we migrate existing data or start fresh?**
   - Recommendation: Add columns, then migrate ✅

4. **Are you okay with me making these structural changes?**
   - I can apply them right now if approved

---

**VERDICT:** Your structure is confusing and incomplete. We should fix it properly.

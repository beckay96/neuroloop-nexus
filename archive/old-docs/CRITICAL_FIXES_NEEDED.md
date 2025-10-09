# Critical Fixes Needed - HIPAA Compliance Issue

**Date:** 2025-01-08  
**Priority:** 🚨 CRITICAL - HIPAA Violation Risk

## CRITICAL ISSUE: Wrong Seizure Table Used

### Problem
The dashboard is currently using `seizure_logs_research` table which is meant for **research purposes only** and requires explicit consent. The patient dashboard should use the clinical `seizure_logs` table from `private_health_info` schema.

### Two Separate Tables

#### 1. Clinical Table: `private_health_info.seizure_logs`
**Purpose:** Clinical tracking for patient care  
**Access:** Direct patient access, shared with clinicians  
**Fields:**
- `patient_id` (not `user_id`)
- `log_date`, `log_time`
- `seizure_type`, `epilepsy_subtype`
- `severity`, `duration_seconds`
- `snomed_ct_code`, `icd10_code`
- `shared_with_clinician`, `visible_to_researchers`
- `consent_status`

#### 2. Research Table: `private_health_info.seizure_logs_research`
**Purpose:** Research-grade data collection  
**Access:** Only with explicit consent, anonymized  
**Fields:**
- `user_id` (not `patient_id`)
- Detailed research fields
- `research_grade` flag
- More granular tracking

### RPCs Available

```sql
-- Clinical seizure log (use this for dashboard)
private_health_info.save_seizure_log(
  p_patient_id uuid,
  p_seizure_type seizure_type_enum,
  p_occurred_at timestamp,
  p_duration_seconds integer,
  p_triggers text,
  p_notes text,
  p_snomed_ct_code text,
  p_icd10_code text,
  p_metadata jsonb
)

-- Research seizure log (separate, requires consent)
public.save_seizure_log(
  p_user_id uuid,
  p_occurred_at timestamp,
  ... research fields ...
)

-- Get seizure logs (need to check which table this queries)
public.get_seizure_logs(p_user_id uuid)
```

## Files That Need Fixing

### 1. `.env` File - FIXED ✅
**Problem:** Line 2 had JWT token without variable name  
**Fix Applied:** Added `EXPO_PUBLIC_SUPABASE_ANON_KEY=` prefix

### 2. `src/hooks/useSeizureLogs.tsx` - NEEDS FIX
**Problem:** Using `seizure_logs_research` table  
**Fix Needed:** Create separate hooks or update to use clinical table

**Options:**
- Option A: Update existing hook to use clinical `seizure_logs`
- Option B: Create `useSeizureLogsResearch.tsx` for research data
- Option C: Add parameter to switch between tables

**Recommendation:** Option B - Keep them separate for HIPAA compliance

### 3. `src/components/dashboard/PatientDashboard.tsx` - NEEDS FIX
**Problems:**
1. Using research table data (Line 200)
2. Mock data for achievements and reminders
3. Calling wrong `addSeizureLog` function

**Fixes Needed:**
```typescript
// WRONG - Currently using research table
const daysSeizureFree = useMemo(() => {
  if (!seizureLogs || seizureLogs.length === 0) return 0;
  const lastSeizure = new Date(seizureLogs[0].log_date); // Research table field
  ...
}, [seizureLogs]);

// RIGHT - Should use clinical table
const daysSeizureFree = useMemo(() => {
  if (!clinicalSeizureLogs || clinicalSeizureLogs.length === 0) return 0;
  const lastSeizure = new Date(clinicalSeizureLogs[0].log_date); // Clinical table field
  ...
}, [clinicalSeizureLogs]);
```

## Mock Data Replacement Strategy

### Achievements Section
**Current:** Hardcoded mock achievements  
**Fix Options:**
1. Query `user_achievements` table
2. Show empty state: "Complete tracking to earn achievements"
3. Show grayed out with "Not earned yet" overlay

**Recommendation:** Option 3 - Show potential achievements grayed out

### Reminders Section
**Current:** Hardcoded mock reminders  
**Fix Options:**
1. Query medication schedules + tracking preferences
2. Show empty state: "No upcoming reminders"
3. Calculate from user's tracking times

**Recommendation:** Option 3 - Calculate from actual data

### Recent Activity Section
**Current:** Mock data  
**Fix Options:**
1. Query actual tracking_entries, medication_logs, symptom_logs
2. Show empty state: "Start tracking to see activity"
3. Show last 5 real entries

**Recommendation:** Option 3 - Show real data

## Alternative Migration Approach

Since `supabase db push` is failing, you can apply migrations directly via Supabase Dashboard:

### Method 1: Supabase Dashboard SQL Editor
1. Go to https://app.supabase.com/project/evcdikzpnjjpotbkkshs/sql
2. Open SQL Editor
3. Copy contents of `supabase/migrations/20250108_create_missing_crud_rpcs.sql`
4. Paste and run in SQL Editor
5. Manually run: `NOTIFY pgrst, 'reload schema';`

### Method 2: Direct Database Connection
```bash
# Get connection string from Supabase Dashboard
psql "postgresql://postgres:[PASSWORD]@db.evcdikzpnjjpotbkkshs.supabase.co:5432/postgres"

# Then run migration
\i supabase/migrations/20250108_create_missing_crud_rpcs.sql
```

### Method 3: Fix .env and Retry
```bash
# .env is now fixed, try again
supabase db push

# If still fails, check supabase/config.toml
cat supabase/config.toml | grep project_id
```

## Immediate Action Plan

### Step 1: Apply Migration (Choose One Method)
- [ ] Method 1: Supabase Dashboard SQL Editor (EASIEST)
- [ ] Method 2: Direct psql connection
- [ ] Method 3: Fix .env and retry `supabase db push`

### Step 2: Create Separate Hooks
- [ ] Keep `useSeizureLogs.tsx` for research data
- [ ] Create `useClinicalSeizureLogs.tsx` for clinical data
- [ ] Update dashboard to use clinical hook

### Step 3: Replace Mock Data
- [ ] Achievements: Show grayed out with "Not earned" overlay
- [ ] Reminders: Calculate from medication schedules
- [ ] Activity: Query real tracking entries

### Step 4: Test HIPAA Compliance
- [ ] Verify research data requires consent
- [ ] Verify clinical data accessible to patient
- [ ] Verify no data leakage between tables

## Code Template: Clinical Seizure Logs Hook

```typescript
// src/hooks/useClinicalSeizureLogs.tsx
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ClinicalSeizureLog {
  id: string;
  patient_id: string;
  log_date: string;
  log_time?: string;
  seizure_type?: string;
  epilepsy_subtype?: string;
  severity?: number;
  duration_seconds?: number;
  notes?: string;
  shared_with_clinician: boolean;
  visible_to_researchers: boolean;
  created_at: string;
}

export const useClinicalSeizureLogs = (patientId?: string) => {
  const [logs, setLogs] = useState<ClinicalSeizureLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    if (!patientId) return;
    
    try {
      // Use RPC to access private_health_info schema
      const { data, error } = await supabase.rpc('get_clinical_seizure_logs', {
        p_patient_id: patientId
      });
      
      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching clinical seizure logs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [patientId]);

  return { logs, loading, refetch: fetchLogs };
};
```

## Success Criteria

- ✅ `.env` file fixed
- ⏳ Migration applied successfully
- ⏳ Dashboard uses clinical `seizure_logs` table
- ⏳ Research table only accessed with consent
- ⏳ Mock data replaced with real data or empty states
- ⏳ HIPAA compliance verified

## Risk Assessment

**Current Risk Level:** 🔴 HIGH

**Risks:**
1. Using research table without consent verification
2. Mixing clinical and research data
3. Potential HIPAA violation if research data shown without consent

**Mitigation:**
1. Immediately separate clinical and research data access
2. Add consent checks before showing research data
3. Audit all data access patterns

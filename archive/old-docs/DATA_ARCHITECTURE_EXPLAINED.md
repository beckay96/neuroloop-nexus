# NeuroLoop Data Architecture - Seizure Tracking

**Date:** 2025-01-08  
**Purpose:** Explain the three-tier seizure data architecture

## The Three Schemas

### 1. `private_health_info` Schema (Patient Data - PHI)
**Purpose:** Store all patient health information with HIPAA compliance  
**Access:** Patients and their authorized clinicians/carers  
**RLS:** Strict - users can only see their own data

### 2. `clinical` Schema (Clinical Analysis)
**Purpose:** Clinical decision support, risk assessment, care coordination  
**Access:** Clinicians viewing their patients  
**RLS:** Clinicians can only see their assigned patients

### 3. `research` Schema (De-identified Research Data)
**Purpose:** Anonymized data for research studies  
**Access:** Researchers with IRB approval  
**RLS:** No PHI, all data de-identified

## Seizure Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    PATIENT LOGS SEIZURE                      │
│                    (via Dashboard/App)                       │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│         private_health_info.seizure_events                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ • event_id (PK)                                       │   │
│  │ • patient_id (FK to auth.users)                      │   │
│  │ • occurred_at, duration_seconds                      │   │
│  │ • seizure_type, severity                             │   │
│  │ • consciousness_level, had_aura                      │   │
│  │ • triggers, symptoms (JSONB)                         │   │
│  │ • witness info, medication adherence                 │   │
│  │ • injuries, medical attention                        │   │
│  │ • shared_with_clinician (boolean)                    │   │
│  │ • visible_to_researchers (boolean)                   │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  PRIMARY TABLE - Full clinical detail for patient care       │
└───────────────┬───────────────────────────┬──────────────────┘
                │                           │
                │ IF shared_with_clinician  │ IF visible_to_researchers
                ▼                           ▼
┌───────────────────────────────┐  ┌────────────────────────────┐
│  private_health_info.         │  │  private_health_info.      │
│  seizure_logs                 │  │  seizure_logs_research     │
│  ┌─────────────────────────┐  │  │  ┌──────────────────────┐  │
│  │ • id (PK)               │  │  │  │ • log_id (PK)        │  │
│  │ • patient_id            │  │  │  │ • user_id            │  │
│  │ • log_date, log_time    │  │  │  │ • log_date, log_time │  │
│  │ • seizure_type          │  │  │  │ • consciousness_level│  │
│  │ • epilepsy_subtype      │  │  │  │ • duration_seconds   │  │
│  │ • snomed_ct_code        │  │  │  │ • aura_present       │  │
│  │ • icd10_code            │  │  │  │ • witnessed          │  │
│  │ • severity, duration    │  │  │  │ • location_type      │  │
│  │ • notes                 │  │  │  │ • recovery_time      │  │
│  │ • shared_with_clinician │  │  │  │ • stress_level       │  │
│  │ • visible_to_researchers│  │  │  │ • research_grade     │  │
│  │ • consent_status        │  │  │  │ • notes (limited)    │  │
│  └─────────────────────────┘  │  │  └──────────────────────┘  │
│                                │  │                            │
│  SIMPLIFIED for clinicians     │  │  RESEARCH-GRADE data       │
│  to quickly review patterns    │  │  More structured fields    │
└────────────┬───────────────────┘  └──────────┬─────────────────┘
             │                                  │
             │ Clinician views                  │ IF consent granted
             ▼                                  ▼
┌────────────────────────────┐      ┌──────────────────────────┐
│  clinical.seizure_*        │      │  research.seizure_events │
│  (aggregated views)        │      │  (de-identified)         │
│  ┌──────────────────────┐  │      │  ┌────────────────────┐  │
│  │ • Risk assessments   │  │      │  │ • No patient_id    │  │
│  │ • Pattern detection  │  │      │  │ • Anonymized       │  │
│  │ • Trend analysis     │  │      │  │ • Research codes   │  │
│  │ • Care alerts        │  │      │  │ • Statistical data │  │
│  └──────────────────────┘  │      │  └────────────────────┘  │
│                             │      │                          │
│  FOR CLINICIANS             │      │  FOR RESEARCHERS         │
└─────────────────────────────┘      └──────────────────────────┘
```

## Why Three Tables in `private_health_info`?

### 1. `seizure_events` (Master Table)
**Purpose:** Complete, detailed clinical record  
**Who uses it:** Patients logging seizures, clinicians reviewing  
**Data richness:** FULL - every detail captured  
**Use case:** "Tell me everything about this seizure"

**Example fields:**
- JSONB arrays for symptoms, triggers, injuries
- Witness descriptions
- Medication adherence details
- Full post-ictal assessment

### 2. `seizure_logs` (Simplified Clinical View)
**Purpose:** Quick reference for clinicians  
**Who uses it:** Clinicians doing rapid assessment  
**Data richness:** MEDIUM - key clinical indicators  
**Use case:** "Show me seizure frequency and patterns"

**Why separate?**
- Faster queries (fewer columns)
- Standardized codes (SNOMED-CT, ICD-10)
- Easier for clinical decision support
- Can be synced from `seizure_events` via trigger

### 3. `seizure_logs_research` (Research-Grade Data)
**Purpose:** Structured data for research studies  
**Who uses it:** Research team (with consent)  
**Data richness:** HIGH - but structured differently  
**Use case:** "Analyze seizure patterns across population"

**Why separate?**
- Consent-gated (requires `visible_to_researchers = true`)
- Research-specific fields (stress_level, sleep_hours_prior)
- Standardized enums for statistical analysis
- Can be synced from `seizure_events` via trigger

## Data Sync Strategy

### Likely Implementation:
```sql
-- Trigger on seizure_events INSERT/UPDATE
CREATE TRIGGER sync_to_clinical_and_research
AFTER INSERT OR UPDATE ON private_health_info.seizure_events
FOR EACH ROW
EXECUTE FUNCTION sync_seizure_data();

-- Function syncs to both tables based on flags
CREATE FUNCTION sync_seizure_data()
RETURNS TRIGGER AS $$
BEGIN
  -- Always sync to clinical logs if shared
  IF NEW.shared_with_clinician THEN
    INSERT INTO private_health_info.seizure_logs (...)
    VALUES (...)
    ON CONFLICT (patient_id, log_date, log_time) DO UPDATE ...;
  END IF;
  
  -- Only sync to research if consent given
  IF NEW.visible_to_researchers AND NEW.consent_status = 'granted' THEN
    INSERT INTO private_health_info.seizure_logs_research (...)
    VALUES (...)
    ON CONFLICT (user_id, log_date, log_time) DO UPDATE ...;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

## What Should the Dashboard Use?

### Patient Dashboard
**Use:** `private_health_info.seizure_events`  
**Why:** Full detail, patient owns this data  
**Access:** Direct via RPC `get_seizure_events(p_patient_id)`

```typescript
// Patient sees their own complete seizure history
const { seizureEvents } = useSeizureEvents(user.id);
```

### Clinician Dashboard
**Use:** `private_health_info.seizure_logs` OR `clinical` schema views  
**Why:** Simplified, standardized for clinical review  
**Access:** Via RPC with clinician-patient relationship check

```typescript
// Clinician sees simplified logs for their patients
const { clinicalLogs } = useClinicalSeizureLogs(patientId);
```

### Research Portal
**Use:** `research.seizure_events` (de-identified)  
**Why:** Anonymized, consent-verified  
**Access:** Via research-specific RPCs with IRB verification

```typescript
// Researcher sees anonymized data
const { researchData } = useResearchSeizureData(studyId);
```

## Current Problem in Dashboard

The dashboard is currently using `useSeizureLogs` which queries `seizure_logs_research`. This is wrong because:

1. ❌ Research table should only be accessed by research portal
2. ❌ Requires consent verification
3. ❌ Missing detailed clinical information
4. ❌ Uses `user_id` instead of `patient_id`

## Correct Fix

### Option 1: Use `seizure_events` (RECOMMENDED)
```typescript
// Create new hook
export const useSeizureEvents = (patientId?: string) => {
  // Query private_health_info.seizure_events
  // Full clinical detail for patient dashboard
};
```

### Option 2: Use existing `seizure_logs`
```typescript
// Use the simplified clinical logs
// Good for quick stats, but less detail
```

### Option 3: Keep both
```typescript
// Use seizure_events for detailed view
// Use seizure_logs for statistics/charts
```

## Recommendation

**For Patient Dashboard:**
- Use `private_health_info.seizure_events` as primary source
- This is the master table with full detail
- Patient should see everything they logged

**For Statistics/Charts:**
- Can use `seizure_logs` for faster aggregations
- Or calculate from `seizure_events`

**Never use `seizure_logs_research` in patient dashboard** - that's for research portal only!

## Next Steps

1. Check if `get_seizure_events` RPC exists
2. If not, create it
3. Update dashboard to use `seizure_events` instead of `seizure_logs_research`
4. Keep research table access separate and consent-gated

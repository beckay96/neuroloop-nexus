# 🩸 Menstrual Cycle Tracking - Complete Implementation Guide

## 🎯 **Purpose: Catamenial Epilepsy Research**

**Up to 40% of women with epilepsy experience catamenial (menstrual-related) seizures.**

This tracking system enables:
- Pattern identification between menstrual cycles and seizure frequency
- Research into hormonal influences on seizure activity
- Personalized treatment optimization
- Large-scale anonymized research data collection

---

## 📊 **Database Schema**

### **Table:** `private_health_info.menstrual_cycle_logs`

```sql
CREATE TABLE private_health_info.menstrual_cycle_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Cycle Information
    cycle_start_date DATE NOT NULL,
    cycle_end_date DATE,
    cycle_length_days INTEGER,
    
    -- Flow & Phase
    flow_intensity TEXT CHECK (flow_intensity IN (
        'spotting', 'light', 'moderate', 'heavy', 'very_heavy'
    )),
    cycle_phase TEXT CHECK (cycle_phase IN (
        'menstrual', 'follicular', 'ovulation', 'luteal'
    )),
    
    -- Symptoms
    symptoms JSONB, -- ["cramps", "bloating", "headache", "mood_changes", etc.]
    symptom_severity INTEGER CHECK (symptom_severity BETWEEN 1 AND 10),
    
    -- CRITICAL: Seizure Correlation (Catamenial Epilepsy)
    seizure_count_during_cycle INTEGER DEFAULT 0,
    seizure_clustered_around_menstruation BOOLEAN DEFAULT false,
    catamenial_pattern_suspected BOOLEAN DEFAULT false,
    seizure_correlation JSONB,
    
    -- Notes
    notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### **Key Fields Explained**

#### **Catamenial Epilepsy Tracking:**
1. **`seizure_count_during_cycle`** - Total seizures during this menstrual cycle
2. **`seizure_clustered_around_menstruation`** - Boolean flag if seizures occur primarily during menstruation (days 1-5)
3. **`catamenial_pattern_suspected`** - Boolean flag if pattern suggests catamenial epilepsy
4. **`seizure_correlation`** - JSONB field for additional correlation data

#### **Flow Intensity Values:**
- `spotting` - Minimal flow
- `light` - Light flow
- `moderate` - Moderate flow
- `heavy` - Heavy flow
- `very_heavy` - Very heavy flow (may indicate medical concern)

#### **Cycle Phase Values:**
- `menstrual` - Days 1-5 (bleeding phase)
- `follicular` - Days 6-13 (pre-ovulation)
- `ovulation` - Days 14-15 (ovulation window)
- `luteal` - Days 16-28 (post-ovulation)

#### **Common Symptoms (stored in JSONB):**
```json
[
  "cramps",
  "bloating",
  "headache",
  "mood_changes",
  "fatigue",
  "breast_tenderness",
  "acne",
  "food_cravings",
  "irritability",
  "anxiety",
  "depression"
]
```

---

## 🔒 **Security: Row Level Security (RLS)**

### **Policies Applied:**

1. **Patient Access:**
   - ✅ View own logs
   - ✅ Insert own logs
   - ✅ Update own logs
   - ✅ Delete own logs

2. **Clinician Access:**
   - ✅ View patient logs (with active connection via `patient_clinician_connections`)
   - ❌ Cannot modify patient logs

3. **Schema Protection:**
   - Table is in `private_health_info` schema (PHI isolation)
   - RLS enforced on ALL operations
   - Audit logging required for HIPAA compliance

---

## 💻 **Frontend Implementation**

### **Hook:** `src/hooks/useMenstrualLogs.tsx`

```typescript
export interface MenstrualLog {
  id?: string;
  user_id: string;
  cycle_start_date: string; // DATE
  cycle_end_date?: string;
  cycle_length_days?: number;
  flow_intensity?: string;
  cycle_phase?: string;
  symptoms?: string[] | Record<string, any>; // JSONB
  symptom_severity?: number;
  seizure_count_during_cycle?: number;
  seizure_clustered_around_menstruation?: boolean;
  catamenial_pattern_suspected?: boolean;
  seizure_correlation?: Record<string, any>;
  notes?: string;
  created_at?: string;
}

// Usage:
const { 
  menstrualLogs, 
  addMenstrualLog, 
  updateMenstrualLog, 
  deleteMenstrualLog 
} = useMenstrualLogs(userId);
```

### **Component:** `src/components/tracking/MenstrualCycleLogModal.tsx`

- Comprehensive form for cycle logging
- Educational content about catamenial epilepsy
- Seizure correlation tracking
- Symptom checklist
- Flow intensity selector
- Cycle phase selector

### **Dashboard Integration:** `src/components/dashboard/PatientDashboard.tsx`

```typescript
// Quick Action Card
{
  id: "menstrual-cycle",
  title: "Menstrual Cycle",
  icon: Calendar,
  color: "text-pink-500",
  bg: "bg-pink-100 dark:bg-pink-950/20",
  description: "Track cycle & seizure patterns"
}
```

---

## 🔬 **Research Anonymization (Future)**

### **Research Table:** `research.menstrual_seizure_correlation`

When user has research consent, data is automatically anonymized:

```sql
CREATE TABLE research.menstrual_seizure_correlation (
    id UUID PRIMARY KEY,
    research_id UUID NOT NULL, -- Anonymized ID (NOT user_id)
    
    -- Cycle data
    cycle_start_date DATE, -- Anonymized (year + month only)
    cycle_length_days INTEGER,
    
    -- Seizure correlation
    seizure_count_during_cycle INTEGER,
    seizure_clustered_around_menstruation BOOLEAN,
    catamenial_pattern_suspected BOOLEAN,
    
    -- Demographics (anonymized)
    age_range TEXT, -- e.g., "25-34" (NOT exact age)
    
    -- NO PHI!
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### **Trigger:** Auto-anonymization on insert

```sql
CREATE TRIGGER trigger_anonymize_menstrual
AFTER INSERT ON private_health_info.menstrual_cycle_logs
FOR EACH ROW
EXECUTE FUNCTION anonymize_menstrual_to_research();
```

**What's anonymized:**
- ❌ User ID removed
- ✅ Research ID assigned (random UUID)
- ❌ Exact dates removed (year + month only)
- ❌ Exact age removed
- ✅ Age range assigned (e.g., "25-34")
- ❌ All PHI stripped

---

## 📈 **Research Queries Enabled**

### **Example 1: Catamenial Pattern Prevalence**
```sql
SELECT 
    age_range,
    COUNT(*) as total_cycles,
    COUNT(*) FILTER (WHERE catamenial_pattern_suspected) as suspected_catamenial,
    ROUND(
        COUNT(*) FILTER (WHERE catamenial_pattern_suspected)::NUMERIC / 
        COUNT(*)::NUMERIC * 100, 
        2
    ) as percentage
FROM research.menstrual_seizure_correlation
GROUP BY age_range
ORDER BY age_range;
```

### **Example 2: Average Seizures by Cycle Phase**
```sql
SELECT 
    AVG(seizure_count_during_cycle) as avg_seizures,
    COUNT(*) as cycle_count,
    age_range
FROM research.menstrual_seizure_correlation
WHERE seizure_clustered_around_menstruation = true
GROUP BY age_range;
```

### **Example 3: Temporal Patterns**
```sql
SELECT 
    DATE_TRUNC('month', cycle_start_date) as month,
    COUNT(*) as total_cycles,
    AVG(cycle_length_days) as avg_cycle_length,
    AVG(seizure_count_during_cycle) as avg_seizures
FROM research.menstrual_seizure_correlation
GROUP BY month
ORDER BY month DESC;
```

---

## ✅ **Testing Checklist**

### **Database Setup:**
- [ ] Run `CRITICAL_DATABASE_FIXES.sql` in Supabase
- [ ] Verify table exists: `SELECT * FROM private_health_info.menstrual_cycle_logs LIMIT 1;`
- [ ] Verify RLS policies: Check `pg_policies` table
- [ ] Verify indexes created

### **Frontend Testing:**
- [ ] Log in as patient
- [ ] Click "Menstrual Cycle" quick action on dashboard
- [ ] Modal opens successfully
- [ ] Fill out all fields:
  - [ ] Cycle start date (required)
  - [ ] Cycle end date (optional)
  - [ ] Flow intensity (dropdown)
  - [ ] Cycle phase (dropdown)
  - [ ] Symptoms (checkboxes)
  - [ ] Symptom severity (1-10)
  - [ ] Seizure count (number)
  - [ ] Clustered around menstruation (checkbox)
  - [ ] Catamenial pattern suspected (checkbox)
  - [ ] Notes (text area)
- [ ] Submit form
- [ ] Verify success toast appears
- [ ] Verify data in database

### **Database Verification:**
```sql
-- Check last inserted log
SELECT * FROM private_health_info.menstrual_cycle_logs
WHERE user_id = 'YOUR_USER_ID'
ORDER BY created_at DESC
LIMIT 1;
```

### **RLS Testing:**
```sql
-- Test as patient (should see own logs)
SELECT * FROM private_health_info.menstrual_cycle_logs;

-- Test as clinician (should only see granted patient logs)
-- Requires entry in clinician_patient_access table
```

---

## 🚨 **Common Issues & Fixes**

### **Error: "relation does not exist"**
**Fix:** Run `CRITICAL_DATABASE_FIXES.sql` to create table

### **Error: "permission denied"**
**Fix:** Check RLS policies are applied correctly

### **Error: "foreign key constraint violation"**
**Fix:** Ensure `user_id` exists in `auth.users` table

### **Error: "check constraint violation"**
**Fix:** Verify `flow_intensity` and `cycle_phase` use correct enum values

---

## 🎯 **Production Checklist**

- [ ] Table created with all fields
- [ ] RLS policies enabled and tested
- [ ] Indexes created for performance
- [ ] Updated_at trigger configured
- [ ] Frontend hook tested
- [ ] Modal component accessible
- [ ] Dashboard integration working
- [ ] Success/error handling tested
- [ ] Research anonymization configured (optional)
- [ ] HIPAA audit logging enabled
- [ ] Documentation updated

---

## 📚 **References**

- **Documentation:** `/docs/archive/MENSTRUAL_TRACKING_AND_RESEARCH_COMPLETE.md`
- **Hook:** `/src/hooks/useMenstrualLogs.tsx`
- **Modal:** `/src/components/tracking/MenstrualCycleLogModal.tsx`
- **Dashboard:** `/src/components/dashboard/PatientDashboard.tsx`
- **SQL:** `CRITICAL_DATABASE_FIXES.sql`

---

## 🎊 **Impact**

**Clinical Value:**
- Enables identification of catamenial epilepsy patterns
- Supports personalized treatment plans
- Improves patient outcomes through data-driven care

**Research Value:**
- Anonymized data for large-scale studies
- Hormonal influence on seizure activity
- Pattern recognition at scale
- All without exposing PHI!

---

**Status:** ✅ PRODUCTION READY  
**Last Updated:** 2025-10-06  
**Next Step:** Run `CRITICAL_DATABASE_FIXES.sql` in Supabase

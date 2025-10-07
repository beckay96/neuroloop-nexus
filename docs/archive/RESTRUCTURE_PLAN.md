# 🏗️ **DATABASE RESTRUCTURE PLAN - Research Grade**

## **🎯 Goals:**
1. ❌ **NO JSONB** - All categorical data as ENUMs
2. ✅ **Separate Tables** - Each feature gets its own table
3. ✅ **Research-Grade** - Proper relational design
4. ✅ **Scalable** - Easy to add new conditions/symptoms
5. ✅ **Searchable** - Symptoms library with autocomplete

---

## **📊 NEW TABLE STRUCTURE:**

### **1. `patient_daily_tracking_logs`** (Daily Check-in Feature)
**Purpose**: Once-per-day general wellness check
**Columns**:
- `overall_feeling` (1-10)
- `mood` (1-10)
- `energy_level` (1-10)
- `stress_level` (1-10)
- `sleep_quality` (1-10)
- `sleep_hours` (numeric)
- `sleep_interruptions` (integer)
- `exercise_minutes` (integer)
- `exercise_type` (text)
- `all_medications_taken` (boolean)
- `notes` (text)

**Maps to**: "Daily Check-in" button feature

---

### **2. `patient_symptom_logs`** (Ad-hoc Symptom Logging)
**Purpose**: Log ANY symptom at ANY time (multiple per day)
**Columns**:
- `symptom_id` → links to `symptoms_library`
- `custom_symptom_name` (if not in library)
- `severity` (1-10)
- `duration_minutes`
- `notes`

**Maps to**: "Log Symptom" button feature

---

### **3. `parkinsons_motor_logs`** (Parkinson's Specific)
**Purpose**: Track motor symptoms for Parkinson's patients
**Columns**:
- `motor_fluctuations_occurred` (boolean)
- `on_time_hours` / `off_time_hours`
- `tremor_severity` (1-10)
- `dyskinesia_severity` (1-10)
- `stiffness_severity` (1-10)
- `slowness_severity` (1-10)
- `freezing_episodes` (count)
- `falls` (count)

**Maps to**: "Parkinson's Tracking" feature (for PD patients only)

---

### **4. `symptoms_library`** (PUBLIC - Searchable)
**Purpose**: Master list of symptoms with autocomplete
**Columns**:
- `symptom_name` (e.g., "Tremor", "Headache")
- `category` (enum: motor, cognitive, mood, etc.)
- `common_in_epilepsy` (boolean)
- `common_in_parkinsons` (boolean)
- `description`
- `search_keywords` (array for autocomplete)

**Seeded with**:
- 15+ common symptoms
- Tagged by condition (epilepsy/parkinsons)
- Searchable by keywords

---

### **5. Related Tables** (Normalized Data)
- `sleep_disturbance_logs` → links to daily tracking
- `cognitive_issue_logs`
- `mood_issue_logs`
- `autonomic_symptom_logs`
- `adl_difficulty_logs`

**All use ENUMs** instead of JSONB arrays

---

## **🔄 MIGRATION STEPS:**

### **Step 1: Create New Tables** ✅
```bash
# Run in Supabase SQL Editor:
RESTRUCTURE_TRACKING_TABLES.sql
```

### **Step 2: Migrate Existing Data**
```sql
-- Copy data from daily_symptom_logs to patient_daily_tracking_logs
INSERT INTO private_health_info.patient_daily_tracking_logs (
  patient_id, log_date, overall_feeling, mood, energy_level,
  stress_level, sleep_quality, sleep_hours, exercise_minutes, notes,
  shared_with_clinician, visible_to_researchers, created_at, updated_at
)
SELECT 
  patient_id, log_date, overall_feeling, mood, energy_level,
  stress_level, sleep_quality, sleep_hours, exercise_minutes, symptom_notes,
  shared_with_clinician, visible_to_researchers, created_at, updated_at
FROM private_health_info.daily_symptom_logs;
```

### **Step 3: Drop Old Table** (AFTER MIGRATION VERIFIED)
```sql
-- DO NOT RUN YET - verify data first!
DROP TABLE private_health_info.daily_symptom_logs CASCADE;
```

### **Step 4: Create New RPCs**
- `save_daily_tracking()` - for daily check-in
- `save_symptom_log()` - for ad-hoc symptoms
- `save_parkinsons_motor_log()` - for PD tracking
- `search_symptoms()` - autocomplete for symptom library

### **Step 5: Update Frontend**
- Update `DailyTrackingModal` to use new table
- Create `SymptomLogger` component with autocomplete
- Create `ParkinsonsTracker` component (conditional on diagnosis)
- Update all hooks to use new RPCs

### **Step 6: Regenerate TypeScript Types**
```bash
npx supabase gen types typescript --project-id evcdikzpnjjpotbkkshs > src/integrations/supabase/types.ts
```

---

## **✅ BENEFITS:**

### **Research Quality:**
- ✅ No JSONB - all structured data
- ✅ ENUMs for categorical data
- ✅ Proper foreign keys
- ✅ Easy to query and analyze
- ✅ Can export clean datasets

### **Scalability:**
- ✅ Add new symptoms to library
- ✅ Add new conditions easily
- ✅ Each feature has own table
- ✅ No schema changes needed for new symptoms

### **User Experience:**
- ✅ Autocomplete from symptoms library
- ✅ Condition-specific suggestions
- ✅ Fast searches with GIN indexes
- ✅ Clean UI separation

---

## **📋 FEATURE MAPPING:**

| UI Feature | Database Table | RPC Function |
|------------|---------------|--------------|
| Daily Check-in | `patient_daily_tracking_logs` | `save_daily_tracking()` |
| Log Symptom | `patient_symptom_logs` | `save_symptom_log()` |
| Parkinson's Tracking | `parkinsons_motor_logs` | `save_parkinsons_motor_log()` |
| Search Symptoms | `symptoms_library` | `search_symptoms()` |
| Seizure Logging | `seizure_events` (existing) | `save_seizure_event()` |
| Tremor Logging | `tremor_episodes` (existing) | `save_tremor_episode()` |
| Medication Logging | `medication_logs` (existing) | `save_medication_log()` |

---

## **🚀 NEXT ACTIONS:**

1. **Review the SQL** (`RESTRUCTURE_TRACKING_TABLES.sql`)
2. **Run it in Supabase** SQL Editor
3. **I'll create the new RPCs** for each table
4. **Update the frontend components** to use new structure
5. **Test with real user data**

---

## **⚠️ CRITICAL:**

**DO NOT DROP `daily_symptom_logs` YET!**
- Verify new tables first
- Check data migration
- Test all features
- Then drop old table

---

**Ready to run the restructure? Let me know and I'll create the RPCs next!** 🎯

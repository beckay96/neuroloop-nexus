# ✅ CORRECTED Column Mapping for RLS Policies

**Source:** `/database-preview-uptodate/the-tables-that-matter.md`  
**Date:** 2025-01-08  
**Status:** VERIFIED

---

## 🔴 Tables Using `patient_id` Column

### private_health_info schema:
- ✅ daily_symptom_logs
- ✅ seizure_events
- ✅ tremor_episodes
- ✅ gait_episodes
- ✅ clinical_media
- ✅ **seizure_logs** ← CORRECTED (was wrong in memory)
- ✅ **patient_diagnoses** ← CORRECTED (was wrong in memory)

### clinical schema:
- ✅ patient_risk_alerts
- ✅ patient_snapshots
- ✅ case_data_panels
- ✅ clinical_notes_exports
- ✅ clinical_scale_results
- ✅ neuro_imaging_results
- ✅ patient_collab_chat (also has sender_id)
- ✅ patient_pro_timeline

---

## 🔵 Tables Using `user_id` Column

### private_health_info schema:
- ✅ user_conditions
- ✅ user_medications
- ✅ patient_phi
- ✅ clinician_phi
- ✅ patient_onboarding_data
- ✅ clinician_onboarding_data
- ✅ tracking_entries
- ✅ menstrual_cycle_logs
- ✅ basal_temperature_logs
- ✅ medication_logs
- ✅ seizure_logs_research

### public schema:
- ✅ patient_profiles
- ✅ clinician_profiles
- ✅ carer_profiles
- ✅ notification_preferences
- ✅ user_points
- ✅ user_achievements
- ✅ research_consent
- ✅ custom_tracking_items
- ✅ custom_tracking_values

---

## 🟢 Tables Using `clinician_id` Column

### clinical schema:
- ✅ ai_insights_cards
- ✅ clinician_today_view

---

## 🟡 Tables Using `id` Column

### public schema:
- ✅ profiles

---

## ⚠️ CRITICAL CORRECTIONS

### Previously WRONG (from memory):
```
❌ patient_diagnoses uses user_id
❌ seizure_logs uses user_id
```

### Actually CORRECT (from schema):
```
✅ patient_diagnoses uses patient_id
✅ seizure_logs uses patient_id
```

---

## 📊 Summary

**Total Tables with patient_id:** 15  
**Total Tables with user_id:** 20  
**Total Tables with clinician_id:** 2  
**Total Tables with id:** 1

**Key Insight:** Most `private_health_info` tables that track patient health data use `patient_id`, while user preference/profile tables use `user_id`.

---

## ✅ Files Updated

1. ✅ `FIX_RLS_PERFORMANCE_NOW.sql` - Corrected both tables
2. ✅ `CORRECTED_COLUMN_MAPPING.md` - This file
3. ✅ Memory updated with correct information

---

**Always verify against `/database-preview-uptodate/the-tables-that-matter.md`!**

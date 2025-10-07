# 🎯 **ACTION PLAN - Patient Dashboard Complete**

## ✅ **COMPLETED:**
1. ✅ Fixed all 403 Forbidden errors on reference tables
2. ✅ Fixed RLS policies with table grants
3. ✅ Fixed `get_patient_onboarding_data` RPC with correct schema
4. ✅ Created symptom log RPC functions
5. ✅ Updated `useSymptomLogs` hook to use RPCs
6. ✅ Fixed Dialog accessibility warning

---

## 🚀 **IMMEDIATE ACTION REQUIRED:**

### **Step 1: Run SQL in Supabase**
In **Supabase SQL Editor**, run:
```sql
-- This file: CREATE_SYMPTOM_LOG_RPC.sql
```

**Expected Result:**
```
function_name        | arguments
---------------------|----------------------------------
delete_symptom_log   | p_log_id uuid
save_symptom_log     | p_patient_id uuid, p_log_date date, ...
update_symptom_log   | p_log_id uuid, p_overall_feeling integer, ...
```

### **Step 2: Regenerate TypeScript Types**
```bash
npx supabase gen types typescript --project-id evcdikzpnjjpotbkkshs > src/integrations/supabase/types.ts
```

This will eliminate the TypeScript errors about unknown RPC functions.

### **Step 3: Test Daily Check-in**
1. Hard refresh: `Cmd + Shift + R`
2. Click "Daily Check-in"
3. Complete the tracking flow
4. **Expected**: No 406 errors, data saves successfully ✨

---

## 📋 **REMAINING MOCK DATA COMPONENTS:**

These components in **Patient Dashboard** are showing mock data and need to be wired up:

### **1. Recent Activity**
**File**: Likely in `src/components/patient/RecentActivity.tsx` or similar
**Needs**: Query `private_health_info.daily_symptom_logs` via `get_symptom_logs` RPC

### **2. Reminders**
**File**: Check for `Reminders.tsx` or `ReminderCard.tsx`
**Needs**: Query medication reminders from:
- `private_health_info.user_medications` (via `get_user_medications` RPC)
- `private_health_info.daily_tracking_preferences` (for basal temp times)

### **3. Care Team**
**File**: `CareTeam.tsx` or similar
**Needs**: Query `linkage` schema tables:
- `linkage.patient_clinician_links`
- `linkage.patient_carer_links`
Then fetch profiles from `public.clinician_profiles` and `public.carer_profiles`

### **4. Health Insights**
**File**: `HealthInsights.tsx` or similar
**Needs**: 
- AI-generated insights (if implemented)
- OR pattern detection from symptom logs
- OR clinical alerts from `clinical.patient_risk_alerts`

### **5. Health Metrics**
**File**: `HealthMetrics.tsx` or similar
**Needs**: Aggregate data from:
- `get_symptom_logs` - for mood/energy trends
- `get_seizure_logs` - for seizure frequency
- `get_medication_logs` - for adherence rates

---

## 🔍 **HOW TO FIND THESE COMPONENTS:**

Run these searches:

```bash
# Find Recent Activity
find src -name "*Activity*.tsx" -o -name "*Recent*.tsx"

# Find Reminders
find src -name "*Reminder*.tsx"

# Find Care Team
find src -name "*CareTeam*.tsx" -o -name "*Team*.tsx"

# Find Health Insights
find src -name "*Insight*.tsx" -o -name "*Health*.tsx"

# Find Health Metrics
find src -name "*Metric*.tsx" -o -name "*Stats*.tsx"
```

OR search for mock data patterns:
```bash
# Search for hardcoded mock data
grep -r "const mockData" src/components/patient/
grep -r "const sampleData" src/components/patient/
grep -r "// TODO: Replace with real data" src/components/patient/
```

---

## 📊 **EXAMPLE: How to Wire Up Recent Activity**

Once you find the component, here's the pattern:

```typescript
import { useSymptomLogs } from "@/hooks/useSymptomLogs";
import { useAuth } from "@/hooks/useAuth";

export function RecentActivity() {
  const { user } = useAuth();
  const { symptomLogs, loading } = useSymptomLogs(user?.id);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {symptomLogs.map(log => (
        <div key={log.id}>
          {log.log_date}: Mood {log.mood}, Energy {log.energy_level}
        </div>
      ))}
    </div>
  );
}
```

---

## ✅ **VERIFICATION CHECKLIST:**

After wiring up components:

- [ ] No console errors on dashboard load
- [ ] Daily Check-in saves successfully
- [ ] Recent Activity shows real user data
- [ ] Reminders pull from user medications
- [ ] Care Team shows linked clinicians/carers
- [ ] Health Insights display (even if placeholder)
- [ ] Health Metrics calculate from real logs

---

## 🎉 **NEXT PRIORITIES:**

1. **Run Step 1-3 above** to fix Daily Check-in
2. **Find and wire up mock components** using searches above
3. **Test each component** with real user data
4. **Optional**: Add loading states, empty states, error handling

---

**Once Daily Check-in works, share the component names showing mock data and I'll help wire them up!** 🚀

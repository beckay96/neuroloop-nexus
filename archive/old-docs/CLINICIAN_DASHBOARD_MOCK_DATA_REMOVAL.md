# 🔧 Clinician Dashboard - Remove ALL Mock Data

## 🎯 Objective
Remove all mock/fake data from clinician dashboard and connect to real patient data only. Add empty states with prompts to invite patients when no data exists.

---

## 📋 Components to Fix

### 1. **Clinician Name Display** ✅ PRIORITY
**Current:** Shows "Dr. rebeccadoctest" (email/username)
**Fix:** Show "Dr. [Last Name]" from `clinician_profiles` table

**Location:** `ClinicianHeader.tsx` line 85
**Data Source:** `public.clinician_profiles.last_name`

---

### 2. **Today's Appointments**
**Current:** Mock data (Sarah Johnson, Michael Chen, Emily Rodriguez)
**Fix:** Query real appointments from database
**Empty State:** "No appointments today. Schedule consultations with your patients."

**Mock Data Location:** Lines 39-150+ in ClinicianDashboard.tsx
**Real Data Source:** TBD - need appointments table

---

### 3. **High Priority Alerts**
**Current:** Mock patients (Sarah Johnson - Seizure cluster, Robert Kim - Fall risk)
**Fix:** Query real alerts from `clinical.patient_risk_alerts`
**Empty State:** "No high priority alerts. All patients stable."

**Mock Data:** `patientAlerts` array
**Real Data:** `clinical.patient_risk_alerts` WHERE `clinician_id = auth.uid()` AND `severity IN ('critical', 'high')`

---

### 4. **AI-Powered Insights**
**Current:** Mock insights about adherence, medication timing, fall risk
**Fix:** Query real insights from `clinical.ai_insights_cards`
**Empty State:** "AI insights will appear as patient data accumulates."

**Mock Data:** Hardcoded insight cards
**Real Data:** `clinical.ai_insights_cards` WHERE `clinician_id = auth.uid()`

---

### 5. **Live Patient Radar**
**Current:** Mock radar with 4 patients in different risk zones
**Fix:** Calculate real risk scores from connected patients
**Empty State:** "Patient radar will activate when you have connected patients."

**Mock Data:** Hardcoded patient positions
**Real Data:** Calculate from `clinical.patient_snapshots` + `clinical.patient_risk_alerts`

---

### 6. **Smart Patient Snapshots**
**Current:** Mock snapshots (Sarah Johnson 87% adherence, Michael Chen 72%, etc.)
**Fix:** Query real snapshots from `clinical.patient_snapshots`
**Empty State:** "Patient snapshots will appear here. Invite patients to get started."

**Mock Data:** Hardcoded snapshot cards
**Real Data:** `clinical.patient_snapshots` WHERE connected patients only

---

### 7. **Key Metrics**
**Current:** Mock numbers (287 Total Patients, 5 Active Alerts, 89.7% Adherence, 34 Appointments)
**Fix:** Calculate from real connected patients
**Empty State:** Show "0" with message "Connect with patients to see metrics"

**Mock Data:** Hardcoded numbers
**Real Data:** 
- Total Patients: COUNT from `patient_clinician_connections` WHERE `status = 'active'`
- Active Alerts: COUNT from `clinical.patient_risk_alerts` WHERE `severity IN ('critical', 'high')`
- Adherence: AVG from connected patients' medication logs
- Appointments: COUNT from appointments table

---

### 8. **Critical Patient Alerts**
**Current:** Mock alerts (Sarah Johnson seizure cluster, Michael Chen missed doses, Emily Rodriguez tremor)
**Fix:** Query from `clinical.patient_risk_alerts`
**Empty State:** "No critical alerts. All patients are stable."

**Mock Data:** `patientAlerts` array filtered by severity
**Real Data:** `clinical.patient_risk_alerts` WHERE `clinician_id` connected AND `severity = 'critical'`

---

### 9. **Patient Case Analysis**
**Current:** Mock "Why Urgent Today" and "Key Trends"
**Fix:** Calculate from real patient data
**Empty State:** "Case analysis will appear when patients log symptoms and events."

**Mock Data:** Hardcoded analysis
**Real Data:** Aggregate from patient tracking logs

---

### 10. **Recent Patient Activity**
**Current:** Mock activity (Sarah Johnson - Temporal Lobe Epilepsy, Michael Chen - Parkinson's, etc.)
**Fix:** Query real activity from tracking logs
**Empty State:** "Recent patient activity will appear here."

**Mock Data:** Hardcoded activity cards
**Real Data:** Latest entries from `private_health_info.tracking_entries` for connected patients

---

### 11. **Risk Stratification & Predictions**
**Current:** Mock risk scores (Sarah Johnson 87/100, Robert Kim 76/100, Michael Chen 58/100)
**Fix:** Query from `clinical.patient_snapshots` with real risk calculations
**Empty State:** "Risk stratification requires patient data. Invite patients to begin."

**Mock Data:** Hardcoded risk cards with fake predictions
**Real Data:** `clinical.patient_snapshots` + AI predictions from `clinical.ai_insights_cards`

---

### 12. **Connection Requests**
**Current:** Shows mock pending requests (Sarah Johnson, Michael Chen)
**Fix:** Query from `patient_invitations` table
**Empty State:** "No pending connection requests."

**Mock Data:** Hardcoded in ConnectionRequests component
**Real Data:** `public.patient_invitations` WHERE `clinician_id = auth.uid()` AND `status = 'pending'`

---

### 13. **Today's Interview (TodayView)**
**Current:** Mock interview data
**Fix:** Query real scheduled interviews
**Empty State:** "No interviews scheduled for today."

**Mock Data:** In PremiumClinicalFeatures component
**Real Data:** From appointments/scheduling system

---

## 🔧 Implementation Strategy

### Phase 1: Data Fetching (PRIORITY)
1. ✅ Fix clinician name display
2. Create hooks for each data source:
   - `useClinicianProfile()` - Get clinician details
   - `useConnectedPatients()` - Get active patient connections
   - `usePatientAlerts()` - Get risk alerts
   - `usePatientSnapshots()` - Get patient summaries
   - `useAIInsights()` - Get AI insights
   - `usePatientActivity()` - Get recent activity

### Phase 2: Component Updates
1. Replace mock data with real data from hooks
2. Add loading states
3. Add empty states with CTAs

### Phase 3: Empty State CTAs
All empty states should prompt:
- "Invite patients to get started"
- Button: "Invite Patient" → Navigate to invite page
- Show helpful onboarding tips

---

## 📊 Database Tables Needed

### Already Exist:
- ✅ `public.patient_clinician_connections` - Patient-clinician relationships
- ✅ `public.patient_invitations` - Pending invitations
- ✅ `public.clinician_profiles` - Clinician details
- ✅ `clinical.patient_risk_alerts` - Risk alerts
- ✅ `clinical.patient_snapshots` - Patient summaries
- ✅ `clinical.ai_insights_cards` - AI insights
- ✅ `private_health_info.tracking_entries` - Patient activity

### May Need:
- ❓ Appointments/scheduling table
- ❓ Interview/consultation table

---

## 🎨 Empty State Design

### Standard Empty State:
```tsx
<Card className="p-8 text-center">
  <div className="flex flex-col items-center gap-4">
    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
      <Icon className="h-8 w-8 text-muted-foreground" />
    </div>
    <div>
      <h3 className="font-semibold text-lg">No [Data Type] Yet</h3>
      <p className="text-sm text-muted-foreground mt-1">
        [Helpful message about what this shows]
      </p>
    </div>
    <Button onClick={() => navigate('/invite')}>
      <UserPlus className="h-4 w-4 mr-2" />
      Invite Patients
    </Button>
  </div>
</Card>
```

---

## ✅ Success Criteria

- [ ] No hardcoded patient names anywhere
- [ ] All data comes from database queries
- [ ] Empty states show when no data exists
- [ ] Empty states have clear CTAs to invite patients
- [ ] Clinician name shows "Dr. [Last Name]"
- [ ] All metrics calculate from real data
- [ ] Loading states show while fetching
- [ ] Error states handle failures gracefully

---

## 🚀 Priority Order

1. **HIGH**: Fix clinician name (quick win)
2. **HIGH**: Remove mock data from Connection Requests (already has real data hook)
3. **HIGH**: Remove mock data from Key Metrics
4. **MEDIUM**: Remove mock data from Patient Alerts
5. **MEDIUM**: Remove mock data from Patient Snapshots
6. **MEDIUM**: Remove mock data from Risk Stratification
7. **LOW**: Remove mock data from AI Insights (may need algorithm)
8. **LOW**: Remove mock data from Today's Appointments (needs appointments system)

---

## 📝 Files to Modify

1. `src/components/navigation/ClinicianHeader.tsx` - Fix name display
2. `src/components/dashboard/ClinicianDashboard.tsx` - Remove all mock data arrays
3. `src/components/dashboard/ConnectionRequests.tsx` - Already uses real data ✅
4. `src/components/dashboard/LivePatientRadar.tsx` - Connect to real data
5. `src/components/dashboard/SmartSnapshotSummaries.tsx` - Connect to real data
6. `src/components/dashboard/RiskStratification.tsx` - Connect to real data
7. `src/components/dashboard/PremiumClinicalFeatures.tsx` - Remove mock data

---

## 🎯 Status: READY TO IMPLEMENT

This is a large refactor but critical for HIPAA compliance and production readiness!

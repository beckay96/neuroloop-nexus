# 🎯 Next Steps - Clinician Dashboard Mock Data Removal

## ✅ COMPLETED

### 1. Fixed Clinician Onboarding
**File:** `src/hooks/useClinicianOnboarding.tsx`

**Problem:** Onboarding was saving to `private_health_info.clinician_onboarding_data` but NOT creating a record in `public.clinician_profiles`.

**Fix:** Added step to create `clinician_profiles` record during onboarding:
```typescript
const { error: clinicianProfileError } = await supabase
  .from('clinician_profiles')
  .upsert([{
    user_id: userId,
    first_name: data.firstName,
    last_name: data.lastName,
    title: data.title,
    specialty: data.specialty,
    license_number: data.licenseNumber,
    institution: data.institution
  }]);
```

### 2. Created Clinician Profile Hook
**File:** `src/hooks/useClinicianProfile.tsx` (NEW)

Fetches clinician data from `public.clinician_profiles` and provides:
- `getDisplayName()` - Returns "Dr. LastName"
- `getFullName()` - Returns "FirstName LastName"

### 3. Updated Dashboard to Use Real Name
**File:** `src/components/dashboard/ClinicianDashboard.tsx`

Changed from using email to using real name from database.

---

## 🚧 TODO - Remove ALL Mock Data

### Files That Need Complete Overhaul:

#### 1. `src/components/dashboard/ClinicianDashboard.tsx` (900+ lines)
**Mock Data to Remove:**
- Lines 39-150+: `patientAlerts` array (6 fake patients)
- Lines 150+: `recentPatients` array
- Hardcoded `keyMetrics`
- Hardcoded `aiInsights`
- Hardcoded `riskPredictions`
- Hardcoded `todayAppointments`
- Hardcoded `pendingTasks`

**Action:** Delete all mock data arrays, replace with empty arrays `[]`

#### 2. `src/components/dashboard/LivePatientRadar.tsx`
**Mock Data:** Hardcoded patient positions on radar
**Action:** Pass empty array, show empty state

#### 3. `src/components/dashboard/SmartSnapshotSummaries.tsx`
**Mock Data:** Hardcoded patient snapshots
**Action:** Pass empty array, show empty state

#### 4. `src/components/dashboard/RiskStratification.tsx`
**Mock Data:** Hardcoded risk scores
**Action:** Pass empty array, show empty state

#### 5. `src/components/dashboard/PremiumClinicalFeatures.tsx`
**Mock Data:** All premium features have mock data
**Action:** Remove mock data from all sub-components

---

## 📋 Step-by-Step Removal Plan

### Phase 1: Delete Mock Data Arrays (30 min)
1. Open `ClinicianDashboard.tsx`
2. Find and DELETE these arrays:
   ```typescript
   const patientAlerts = [...]  // DELETE
   const recentPatients = [...]  // DELETE
   const keyMetrics = [...]  // DELETE
   const aiInsights = [...]  // DELETE
   ```
3. Replace with empty arrays:
   ```typescript
   const patientAlerts = [];
   const recentPatients = [];
   const keyMetrics = { totalPatients: 0, activeAlerts: 0, adherence: 0, appointments: 0 };
   ```

### Phase 2: Add Empty States (1-2 hours)
For each section, add empty state component:
```typescript
{data.length === 0 ? (
  <Card className="p-8 text-center">
    <UserPlus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
    <h3 className="font-semibold text-lg">No Patients Connected</h3>
    <p className="text-sm text-muted-foreground mt-2">
      Invite patients to start seeing their data here
    </p>
    <Button onClick={() => navigate('/invite')} className="mt-4">
      <UserPlus className="h-4 w-4 mr-2" />
      Invite Patients
    </Button>
  </Card>
) : (
  // Existing component
)}
```

### Phase 3: Connect Real Data (Later)
Create RPC functions and hooks for:
- Patient alerts
- Patient snapshots
- Risk calculations
- Activity logs
- AI insights

---

## 🔧 Quick Commands

### Find All Mock Data:
```bash
grep -n "const.*=.*\[{" src/components/dashboard/ClinicianDashboard.tsx
```

### Find Hardcoded Patient Names:
```bash
grep -rn "Sarah Johnson\|Michael Chen\|Emily Rodriguez" src/components/dashboard/
```

---

## ⚠️ Critical for HIPAA Compliance

**ALL mock patient data MUST be removed before production!**

Mock patient names found:
- Sarah Johnson
- Michael Chen
- Emily Rodriguez
- Lisa Parker
- Robert Kim
- David Thompson

These appear in:
- ClinicianDashboard.tsx
- LivePatientRadar.tsx
- SmartSnapshotSummaries.tsx
- RiskStratification.tsx
- PremiumClinicalFeatures.tsx

---

## 🎯 Immediate Action Items

1. **Test Onboarding Fix:**
   - Create a new clinician account
   - Complete onboarding
   - Verify name shows as "Dr. LastName" in dashboard

2. **Remove Mock Data:**
   - Delete all mock data arrays
   - Add empty states everywhere
   - Test dashboard with no patients

3. **Create RPC Functions:**
   - For patient connections
   - For patient alerts
   - For patient snapshots

---

## 📝 Status

- ✅ Clinician onboarding fixed
- ✅ Clinician profile hook created
- ✅ Dashboard uses real name
- ⏳ Mock data removal (NEXT)
- ⏳ Empty states (NEXT)
- ⏳ Real data connections (LATER)

**Next session: Start with Phase 1 - Delete all mock data arrays**

# Onboarding Integration Plan

## Current Status

### ✅ What's Done:
1. **RLS Security** - HIPAA compliant with 45 secure policies
2. **Beautiful Step Components Created**:
   - `MedicationStep.tsx` - Database search, multiple times per med
   - `MenstrualTrackingStep.tsx` - Catamenial epilepsy education
   - `DailyTrackingStep.tsx` - Smart schedule generation
   - `ResearchConsentStep.tsx` - Granular data sharing options

### ⚠️ What's NOT Done:
The step components are **created but NOT integrated** into PatientOnboarding.tsx

## Integration Steps Needed

### 1. Update FormData Structure
Current PatientOnboarding has old medication structure:
```typescript
medications: { name, dosage, frequency }[]
```

Needs to be:
```typescript
medications: { id, name, dosage, times[] }[]
basalTempTime: string
trackingTimes: string[]
researchDataTypes: { seizureData, parkinsonData, medicationData, menstrualData }
```

### 2. Replace Case Statements

**Case 4 (Medications)**: Replace inline form with `<MedicationStep />`
**Case 5 (Menstrual)**: Replace inline form with `<MenstrualTrackingStep />`
**Case 6 (Daily Tracking)**: Replace inline form with `<DailyTrackingStep />`
**Case 7 (Research)**: Replace inline form with `<ResearchConsentStep />`

### 3. Update usePatientOnboarding Hook
The hook needs to handle the new data structure and save to correct database tables:
- `private_health_info.user_medications` (with times array)
- `private_health_info.menstrual_cycle_logs`
- `private_health_info.basal_temperature_logs`
- `public.research_consent` (with granular data types)

### 4. Database Schema Alignment

**user_medications table** has:
- `medication_id` (uuid)
- `dosage_amount` (numeric)
- `dosage_unit` (text)
- `frequency` (text)
- `times` (time without time zone[])

The component needs to map to this structure.

## Files That Need Updates

1. **PatientOnboarding.tsx**
   - Import step components ✅ DONE
   - Update formData structure ✅ DONE
   - Replace case 4-7 with components ⚠️ IN PROGRESS
   - Update helper functions ⚠️ IN PROGRESS

2. **usePatientOnboarding.tsx**
   - Update to handle new medication structure
   - Save to correct database tables
   - Handle research data types

3. **Step Components**
   - May need minor adjustments to match database exactly

## Next Actions

1. Finish replacing all 4 case statements
2. Update usePatientOnboarding hook
3. Test complete flow
4. Delete old unused code
5. Verify database writes

## Why This Matters

The beautiful components have:
- Better UX (search, time pickers, education)
- Proper data structure (matches database)
- Research-grade data collection
- Mobile-responsive design
- Dark/light mode support

Without integration, users see the old basic forms instead of the upgraded experience.

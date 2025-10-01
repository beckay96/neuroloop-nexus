# 🧠 Seizure Tracking System - Implementation Plan

**Status:** Ready to implement  
**Components:** Patient & Carer versions + 3 shared components

---

## 📋 Files to Create

### Main Components
1. `src/components/tracking/SeizureTrackingPatient.tsx` - Full patient-side form (7 steps)
2. `src/components/tracking/SeizureTrackingCarer.tsx` - Carer-side form (same but different witnessing)

### Shared Components
3. `src/components/tracking/DurationPicker.tsx` - Minutes + Seconds selector
4. `src/components/tracking/ConsciousnessTimeline.tsx` - Timeline segment editor
5. `src/components/tracking/OtherDropdown.tsx` - "Other" → dropdown + free text pattern

### Integration Files (to modify)
6. Patient dashboard - Add "New seizure" entry point
7. Carer dashboard - Add "Log seizure" entry point

---

## ✅ Specification Summary

### Key Features Implemented:
- ✅ Late medication flow with med picker
- ✅ "Other" → dropdown + free text (4 places: triggers, warning signs, post-ictal, injuries)
- ✅ Duration: minutes + seconds pickers (no more single input)
- ✅ Severity removed entirely
- ✅ Ambulance/hospital questions with validation
- ✅ Consciousness timeline with quick picks
- ✅ Location enums with sublocations
- ✅ Expanded seizure types with plain language descriptions
- ✅ Different witnessing logic for patient vs carer
- ✅ Validation & safety warnings

---

## 🎯 Next Steps

Given the large size of these components (~1500+ lines total), I recommend:

**Option 1:** Create them as separate smaller focused files
**Option 2:** Create a simplified working version first, then enhance

**Which would you prefer?**

I can create:
1. All 5 components now (will take multiple messages due to size)
2. A working MVP first with core features, then add enhancements
3. Just the shared components first (DurationPicker, ConsciousnessTimeline, OtherDropdown)

Let me know how you'd like to proceed!

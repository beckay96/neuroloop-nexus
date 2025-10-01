# 🔗 Seizure Tracking Integration Spec

**Status:** Ready to implement with timer/video integration  
**Target:** Replace existing `SeizureLogModal.tsx` with comprehensive wizard

---

## 🎯 Integration Strategy

### **Existing Components:**
- ✅ `VideoLogModal.tsx` - Records/uploads seizure videos
- ✅ `SeizureLogModal.tsx` - Basic seizure logging (to be replaced)
- ⏳ Timer component (need to create or find)

### **New Comprehensive System:**
Replace `SeizureLogModal.tsx` with:
- `SeizureTrackingWizard.tsx` - 7-step comprehensive wizard
- Accepts pre-populated data from timers/video
- Role-aware (patient vs carer mode)

---

## 📥 Data Flow - Timer Integration

###When User Uses In-App Timer:

```typescript
// Timer tracks:
{
  startTime: Date,
  endTime: Date,
  duration: { minutes: number, seconds: number },
  isActive: boolean
}

// On timer stop → Auto-open wizard with:
- Date: auto-filled from timer
- Start time: auto-filled from timer
- Duration: auto-filled (minutes + seconds)
- Jump to Step 2 (Phases) since basics are pre-filled
```

---

## 📹 Data Flow - Video Integration

### When User Records/Uploads Video:

```typescript
// VideoLogModal captures:
{
  date: string,
  time: string,
  video_type: "Seizure event",
  duration_seconds: number,
  symptoms_captured: string[],
  videoFile: File | Blob
}

// If video_type === "Seizure event":
- Show button: "Complete seizure details"
- Opens SeizureTrackingWizard with:
  - Date: from video
  - Time: from video
  - Duration: convert seconds to min:sec
  - Video attached: true
  - Jump to Step 2 (Phases)
```

---

## 🔄 Modified VideoLogModal Flow

### Enhancement to VideoLogModal.tsx:

```typescript
// After user saves video with type "Seizure event":
if (videoData.video_type === "Seizure event") {
  // Show option dialog:
  "Would you like to complete detailed seizure information?"
  [Yes - Open Full Details] [No - Save Video Only]
  
  if (Yes):
    - Close VideoLogModal
    - Open SeizureTrackingWizard with prePopulatedData:
      {
        date: videoData.date,
        startTime: videoData.time,
        durationSeconds: videoData.duration_seconds,
        videoAttached: true,
        videoData: videoData,
        autoJumpToStep: 2  // Skip basics
      }
}
```

---

## ⏱️ Timer Component Specification

### Need to Create: SeizureTimer.tsx

**Features:**
- Start/stop button
- Real-time duration display (MM:SS)
- Pause/resume capability
- On stop: prompt to log seizure details
- Auto-transfers time data to wizard

**Integration Points:**
1. Patient dashboard → Quick actions → "Time seizure"
2. Carer dashboard → Quick actions → "Time seizure"
3. During active seizure → floating timer widget

---

## 🎯 SeizureTrackingWizard Props

```typescript
interface SeizureTrackingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  mode: "patient" | "carer";  // Role-specific differences
  
  // Pre-populated data from timers/video
  prePopulatedData?: {
    date?: string;
    startTime?: string;
    duration?: { minutes: number; seconds: number };
    videoAttached?: boolean;
    videoData?: any;
    autoJumpToStep?: number;  // Skip pre-filled steps
    timerData?: {
      startTime: Date;
      endTime: Date;
      duration: { minutes: number; seconds: number };
    };
  };
}
```

---

## 📋 Implementation Steps

1. ✅ Create shared components (DurationPicker, ConsciousnessTimeline, OtherDropdown) - DONE
2. ✅ Create seizure-types.ts data - DONE
3. ⏳ Create SeizureTimer.tsx component
4. ⏳ Create SeizureTrackingWizard.tsx (replaces SeizureLogModal)
5. ⏳ Enhance VideoLogModal with "Complete details" option
6. ⏳ Wire up integrations in dashboards

---

## 🎨 UX Flow Examples

### Scenario 1: Timer → Full Details
1. User starts timer during seizure
2. Seizure ends, user stops timer
3. Prompt: "Log seizure details?"
4. Opens wizard with time pre-filled
5. User completes remaining 6 steps

### Scenario 2: Video → Full Details
1. User records seizure video
2. Selects type: "Seizure event"
3. Prompt: "Add detailed seizure information?"
4. Opens wizard with video + time pre-filled
5. User completes remaining steps

### Scenario 3: Manual Entry
1. User clicks "Log seizure" (no timer/video)
2. Opens wizard at Step 1
3. User fills all 7 steps manually

---

## 🚀 Ready to Build

**Next Actions:**
1. Create SeizureTimer.tsx
2. Create SeizureTrackingWizard.tsx (comprehensive 7-step form)
3. Modify VideoLogModal to add integration button
4. Wire everything together

**Shall I proceed with implementation?**

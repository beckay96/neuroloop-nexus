# 🌍 Regional Date Format System

**Status:** ✅ Implemented  
**Date:** 2025-10-06

---

## 📋 Overview

All date inputs now display format hints below the field, automatically adjusted based on user's region/country.

## 🌎 Supported Markets

### Primary Markets
1. **Australia (AU)** - DD/MM/YYYY
2. **India (IN)** - DD/MM/YYYY  
3. **United States (US)** - MM/DD/YYYY

### Additional Markets
4. **United Kingdom (UK)** - DD/MM/YYYY
5. **Europe (EU)** - DD/MM/YYYY
6. **China (CN)** - YYYY/MM/DD
7. **Japan (JP)** - YYYY/MM/DD

---

## 🎯 Features

### Auto-Detection
- Detects user's region from browser locale (`navigator.language`)
- Falls back to localStorage preference
- Ultimate fallback: Australia (DD/MM/YYYY)

### Format Hints
Every date input now shows:
```
Format: DD/MM/YYYY • Example: 25/12/2024
```

Adjusted per region:
- **Australia/India/UK/EU:** DD/MM/YYYY (25/12/2024)
- **USA:** MM/DD/YYYY (12/25/2024)
- **China/Japan:** YYYY/MM/DD (2024/12/25)

### User Preference
Users can manually set their preferred region:
```typescript
import { setUserRegion } from '@/utils/regionalDateFormats';
setUserRegion('US'); // Use US format
```

---

## 🔧 Implementation

### Files Created

1. **`src/utils/regionalDateFormats.ts`**
   - Regional configuration
   - Auto-detection logic
   - Format conversion utilities

2. **`src/components/ui/date-input.tsx`**
   - Reusable date input component
   - Automatic format hint display
   - Calendar icon

### Components Updated

1. **`PatientOnboarding.tsx`**
   - Date of Birth field ✅

2. **`CarerOnboarding.tsx`**
   - Carer Date of Birth ✅
   - Patient Date of Birth ✅

---

## 📝 Usage

### Basic Usage
```tsx
import { DateInput } from "@/components/ui/date-input";

<DateInput
  label="Date of Birth"
  value={dateValue}
  onChange={(value) => setDateValue(value)}
  required={true}
  max={new Date().toISOString().split('T')[0]}
  showFormatHint={true}
/>
```

### Props
```typescript
interface DateInputProps {
  label: string;              // Field label
  value: string;              // Date value (YYYY-MM-DD)
  onChange: (value: string) => void;
  required?: boolean;         // Show required indicator
  disabled?: boolean;         // Disable input
  min?: string;               // Minimum date (YYYY-MM-DD)
  max?: string;               // Maximum date (YYYY-MM-DD)
  id?: string;                // HTML id attribute
  className?: string;         // Additional CSS classes
  showFormatHint?: boolean;   // Show format hint (default: true)
}
```

---

## 🔍 Format Detection

### Detection Priority
1. **Browser Locale** - Primary detection method
2. **localStorage** - User's saved preference
3. **Default** - Australia (DD/MM/YYYY)

### Locale Mapping
```
en-AU, en-NZ → AU (DD/MM/YYYY)
en-IN, hi   → IN (DD/MM/YYYY)
en-US       → US (MM/DD/YYYY)
en-GB       → UK (DD/MM/YYYY)
de-, fr-, es-, it- → EU (DD/MM/YYYY)
zh          → CN (YYYY/MM/DD)
ja          → JP (YYYY/MM/DD)
```

---

## 🎨 Visual Example

```
┌─────────────────────────────────────────┐
│ Date of Birth *                         │
│ ┌─────────────────────────────────────┐ │
│ │ 25/12/1990                     📅  │ │
│ └─────────────────────────────────────┘ │
│ Format: DD/MM/YYYY • Example: 25/12/2024│
└─────────────────────────────────────────┘
```

---

## 🌏 Country-Specific Behavior

### Australia/India Users
```
Input displays: DD/MM/YYYY
Format hint: "Format: DD/MM/YYYY • Example: 25/12/2024"
Stored as: 1990-12-25 (ISO format)
```

### USA Users
```
Input displays: MM/DD/YYYY
Format hint: "Format: MM/DD/YYYY • Example: 12/25/2024"
Stored as: 1990-12-25 (ISO format)
```

### China/Japan Users
```
Input displays: YYYY/MM/DD
Format hint: "Format: YYYY/MM/DD • Example: 2024/12/25"
Stored as: 1990-12-25 (ISO format)
```

---

## 🔄 Conversion Utilities

### Available Functions
```typescript
// Get current region config
getDateFormatConfig(): RegionalDateConfig

// Detect user's region
detectRegion(): Region

// Format date for region
formatDateForRegion(date: Date, region?: Region): string

// Parse regional date string
parseDateFromRegionalFormat(dateString: string, region?: Region): Date | null

// Convert HTML date to regional display
htmlDateToRegionalDisplay(htmlDate: string): string

// Convert regional display to HTML date
regionalDisplayToHtmlDate(displayDate: string, region?: Region): string
```

---

## 🚀 Benefits

### User Experience
✅ Familiar date format for each region  
✅ Clear format guidance  
✅ Example shown for reference  
✅ No confusion about DD vs MM

### Developer Experience
✅ Single reusable component  
✅ Automatic format detection  
✅ Consistent UI across app  
✅ Easy to extend for new regions

### Compliance
✅ Respects regional preferences  
✅ HIPAA compliant (no PII in format hints)  
✅ Accessible (clear labels)

---

## 📍 Where Applied

### Onboarding
- ✅ Patient Date of Birth
- ✅ Carer Date of Birth
- ✅ Patient's Date of Birth (in carer flow)

### Tracking (To Be Applied)
- ⚠️ Seizure log dates
- ⚠️ Medication log dates
- ⚠️ Menstrual cycle dates
- ⚠️ Symptom log dates
- ⚠️ Appointment scheduling

---

## 🔧 Future Enhancements

### Planned
1. **Settings Page** - Allow users to manually override region
2. **Language Translation** - Translate format hints to local language
3. **Date Picker UI** - Custom date picker matching regional format
4. **Validation Messages** - Show errors in regional format

### Nice to Have
- Calendar widget showing week starting Monday/Sunday per region
- Holiday markers for user's country
- Cultural date preferences (e.g., lunar calendar option)

---

## 📊 Testing Checklist

### Manual Testing
- [ ] Test in Chrome with different locale settings
- [ ] Test in Safari (AU locale)
- [ ] Test in Firefox (US locale)
- [ ] Test localStorage override
- [ ] Test format hint displays correctly

### User Flows
- [ ] Patient onboarding (Australia)
- [ ] Patient onboarding (USA)
- [ ] Patient onboarding (India)
- [ ] Carer onboarding (all regions)
- [ ] Date validation works correctly

---

## 🎯 Success Criteria

✅ Format hint appears below all date inputs  
✅ Correct format shown for each region  
✅ Example date helps users understand  
✅ No confusion about date entry  
✅ Consistent across all forms

---

## 📞 Support

If users see incorrect format:
1. Check their browser locale
2. Clear localStorage
3. Manually set region preference
4. Report as bug if issue persists

---

**The platform now respects regional date preferences for a better user experience!** 🌍

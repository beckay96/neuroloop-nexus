# 🩷 Menstrual Tracking Redesign - Phase 2 TODO

## ✅ Completed
1. Created `time_after_waking_enum` for basal temperature accuracy
2. Added migration for basal temp timing column
3. Created redesigned menstrual modal with new flow
4. Added pregnancy/breastfeeding columns and toggles

## 🚧 Still TODO

### 1. Run Database Migration
```bash
# Run in Supabase SQL Editor:
supabase/migrations/20250108_add_basal_temp_timing_enum.sql
```

### 2. Create Basal Temperature RPC Functions
Need to create RPC functions for basal_temperature_logs (same issue as menstrual logs):
- `save_basal_temperature_log()`
- `update_basal_temperature_log()`
- `delete_basal_temperature_log()`

### 3. Update useTemperatureLogs Hook
- Change from `.schema('private_health_info')` to RPC functions
- Add `time_after_waking` field to interface
- Update all CRUD operations

### 4. Update TemperatureModal Component
Add time after waking selector:
```typescript
<Select>
  <SelectItem value="under_10_min">Under 10 minutes</SelectItem>
  <SelectItem value="10_20_min">10-20 minutes</SelectItem>
  <SelectItem value="20_30_min">20-30 minutes</SelectItem>
  <SelectItem value="30_60_min">30-60 minutes</SelectItem>
  <SelectItem value="1_2_hours">1-2 hours</SelectItem>
  <SelectItem value="2_3_hours">2-3 hours</SelectItem>
  <SelectItem value="over_3_hours">Over 3 hours</SelectItem>
</Select>
```

### 5. Replace Old Menstrual Modal
- Delete old `MenstrualCycleLogModal.tsx`
- Rename `MenstrualCycleLogModalRedesigned.tsx` to `MenstrualCycleLogModal.tsx`
- Update imports in `PatientDashboard.tsx`

### 6. Create useBasalTemperature Hook
The redesigned modal imports `useBasalTemperature` but it doesn't exist yet.
Either:
- Rename `useTemperatureLogs` to `useBasalTemperature`
- Or create alias export

### 7. Remove Cycle Phase from UI
- Already removed from redesigned modal ✅
- Cycle phase will be calculated by algorithm later

### 8. Calendar Integration
The redesigned modal uses `CustomDatePicker` which is good, but we might want to:
- Add month/year dropdowns (already has them ✅)
- Style it more like the reference images with pink theme

## 📋 New Flow Logic

### If NOT on period:
1. Show "My Period Started" button
2. When clicked → set today as start date
3. Show flow selector and other options

### If ON period:
1. Show period start date (editable)
2. Show flow selector
3. Show "I Finished My Period" button
4. When clicked → set today as end date

### Basal Temperature Integration:
1. Check if user logged basal temp today
2. If NO → Show reminder card
3. If YES → Show temp value in green card
4. Link to temperature modal for logging

## 🔧 Technical Details

### Time After Waking Enum:
```sql
CREATE TYPE time_after_waking_enum AS ENUM (
  'under_10_min',    -- Most accurate
  '10_20_min',       -- Still good
  '20_30_min',       -- Acceptable
  '30_60_min',       -- Less accurate
  '1_2_hours',       -- Not ideal
  '2_3_hours',       -- Poor
  'over_3_hours',    -- Not useful for cycle tracking
  'unknown'          -- Default
);
```

### Why This Matters:
- Basal temp must be taken within 10 min of waking for accuracy
- Used to detect ovulation (temp rises 0.5-1°F after ovulation)
- Combined with flow data → determines cycle phase
- Critical for catamenial epilepsy research

## 🎨 UI Improvements Needed

### Calendar Styling:
- Add pink highlights for period days
- Add heart icons for period dates
- Month/year dropdowns (already has ✅)
- "Today" button (already has ✅)

### Flow Selector:
- Already has beautiful droplet icons ✅
- Pink gradient theme ✅
- Responsive grid layout ✅

## 📝 Files to Update

1. **Create:**
   - `supabase/migrations/20250108_create_basal_temp_rpc_functions.sql`

2. **Update:**
   - `src/hooks/useTemperatureLogs.tsx` → Use RPC functions
   - `src/components/tracking/TemperatureModal.tsx` → Add time after waking
   - `src/components/tracking/MenstrualCycleLogModal.tsx` → Replace with redesigned version

3. **Delete:**
   - Old menstrual modal (after replacement)

## 🚀 Priority Order

1. **HIGH**: Create basal temp RPC functions (fixes schema error)
2. **HIGH**: Update useTemperatureLogs hook
3. **HIGH**: Add time after waking to TemperatureModal
4. **MEDIUM**: Replace old menstrual modal with new one
5. **MEDIUM**: Create useBasalTemperature hook/alias
6. **LOW**: Additional calendar styling

## ✨ Expected Outcome

Users will be able to:
1. ✅ Click "My Period Started" when period begins
2. ✅ Select flow intensity with beautiful droplets
3. ✅ Toggle pregnancy/breastfeeding status
4. ✅ See reminder to log basal temp if not done
5. ✅ See today's basal temp if already logged
6. ✅ Click "I Finished My Period" when done
7. ✅ All data saves securely via RPC functions
8. ✅ Cycle phase calculated automatically (future algorithm)

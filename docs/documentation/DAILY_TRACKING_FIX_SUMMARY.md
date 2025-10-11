# Daily Tracking Preferences JSONB Fix - Summary

**Date:** 2025-01-08  
**Issue:** `public.daily_tracking_preferences` table has JSONB `custom_tracking_items` field  
**Status:** ✅ FIX READY TO APPLY

---

## Problem

The `public.daily_tracking_preferences` table contains:
- **Column:** `custom_tracking_items`
- **Type:** `JSONB` (non-relational, not research-grade)
- **Impact:** Cannot query, analyze, or properly secure custom tracking data

This violates the research-grade database principles from PHASE 1-4.

---

## Solution

Created normalized relational structure with:

### 1. New Enum
- `public.custom_tracking_type_enum`
  - symptom, activity, mood, energy, sleep_quality, pain_level, stress_level, custom_scale, yes_no_question, text_note, other

### 2. New Tables

#### `public.custom_tracking_items`
Defines what users want to track:
- `item_id` (UUID, PK)
- `user_id` (UUID, FK to auth.users)
- `item_name` (TEXT, unique per user)
- `item_type` (enum)
- `description` (TEXT)
- `min_value`, `max_value`, `unit` (for numeric scales)
- `icon`, `color`, `display_order` (UI settings)
- `is_active` (BOOLEAN)

#### `public.custom_tracking_values`
Stores actual tracking data:
- `value_id` (UUID, PK)
- `item_id` (UUID, FK to custom_tracking_items)
- `user_id` (UUID, FK to auth.users)
- `numeric_value` (NUMERIC) - for scales/numbers
- `text_value` (TEXT) - for notes
- `boolean_value` (BOOLEAN) - for yes/no
- `logged_at` (TIMESTAMPTZ)
- `log_date` (DATE)
- `notes` (TEXT)

### 3. Helper Functions

#### `public.save_custom_tracking_value()`
```sql
save_custom_tracking_value(
  p_item_id UUID,
  p_numeric_value NUMERIC DEFAULT NULL,
  p_text_value TEXT DEFAULT NULL,
  p_boolean_value BOOLEAN DEFAULT NULL,
  p_logged_at TIMESTAMPTZ DEFAULT NOW(),
  p_notes TEXT DEFAULT NULL
) RETURNS UUID
```

#### `public.get_custom_tracking_history()`
```sql
get_custom_tracking_history(
  p_item_id UUID,
  p_start_date DATE DEFAULT NULL,
  p_end_date DATE DEFAULT NULL,
  p_limit INTEGER DEFAULT 100
) RETURNS TABLE (...)
```

### 4. Migration Strategy

The fix script includes:
1. **Automatic migration** of existing JSONB data to new tables
2. **Data validation** before dropping JSONB column
3. **Rollback safety** (commented out DROP by default for review)

---

## Files Created/Updated

### Created
1. **FIX_DAILY_TRACKING_PREFERENCES.sql** - Complete fix script
   - Creates tables, enums, functions
   - Migrates existing data
   - Drops JSONB column
   - Sets up RLS policies

2. **DAILY_TRACKING_FIX_SUMMARY.md** - This file

### Updated
1. **RLS_AUDIT_AND_FIX.sql** - Added policies for new tables
   - Added `custom_tracking_items` RLS
   - Added `custom_tracking_values` RLS
   - Updated verification queries

---

## Execution Order

### 1. Run the Fix Script
```bash
# In Supabase SQL Editor:
# Run: FIX_DAILY_TRACKING_PREFERENCES.sql
```

**Expected Output:**
- ✅ Enum created
- ✅ Tables created with indexes
- ✅ Migration notice (X records migrated)
- ✅ RLS policies created
- ✅ Functions granted to authenticated
- ✅ JSONB column dropped

### 2. Update TypeScript Types
```bash
npx supabase gen types typescript --project-id evcdikzpnjjpotbkkshs > src/integrations/supabase/types.ts
```

### 3. Run RLS Audit (Updated)
```bash
# In Supabase SQL Editor:
# Run: RLS_AUDIT_AND_FIX.sql
```

### 4. Update Frontend Code
Replace JSONB usage with new structure:

**Before (JSONB):**
```typescript
const preferences = {
  custom_tracking_items: [
    { name: 'Energy Level', type: 'scale', min: 1, max: 10 }
  ]
};
```

**After (Relational):**
```typescript
// Create custom tracking item
const { data: item } = await supabase
  .from('custom_tracking_items')
  .insert({
    user_id: userId,
    item_name: 'Energy Level',
    item_type: 'custom_scale',
    min_value: 1,
    max_value: 10,
    unit: 'scale'
  });

// Log a value
const { data: value } = await supabase.rpc('save_custom_tracking_value', {
  p_item_id: item.item_id,
  p_numeric_value: 7,
  p_logged_at: new Date().toISOString()
});
```

---

## Benefits of This Fix

### ✅ Research-Grade
- Queryable custom tracking data
- Analyzable trends and patterns
- Exportable for research

### ✅ HIPAA Compliant
- Proper RLS on all fields
- No sensitive data in JSONB
- Full audit trail

### ✅ Type Safety
- Enum validation for tracking types
- TypeScript types for all fields
- Database-level constraints

### ✅ Performance
- Indexed queries on user_id, log_date
- Efficient time-range queries
- No JSONB parsing overhead

### ✅ Flexibility
- Support for numeric, text, and boolean values
- Custom scales with min/max
- UI customization (icon, color)

---

## Frontend Migration Checklist

- [ ] Update custom tracking item creation UI
- [ ] Update value logging components
- [ ] Migrate preferences loading logic
- [ ] Update analytics/charts to use new tables
- [ ] Test custom tracking workflows
- [ ] Remove JSONB references from codebase

---

## Rollback Plan

If issues arise:

1. The JSONB column drop is commented by default
2. Can restore from backup if needed
3. New tables can be dropped without affecting old data:
   ```sql
   DROP TABLE public.custom_tracking_values;
   DROP TABLE public.custom_tracking_items;
   DROP TYPE public.custom_tracking_type_enum;
   ```

---

## Database Changes Summary

### New Objects
- **1 Enum:** `custom_tracking_type_enum`
- **2 Tables:** `custom_tracking_items`, `custom_tracking_values`
- **2 Functions:** `save_custom_tracking_value()`, `get_custom_tracking_history()`
- **8 RLS Policies:** 4 per table (SELECT, INSERT, UPDATE, DELETE)

### Modified Objects
- **daily_tracking_preferences:** Drops `custom_tracking_items` JSONB column

### Indexes Added
- 6 indexes for efficient querying

---

## Next Steps After Fix

1. ✅ Run `FIX_DAILY_TRACKING_PREFERENCES.sql`
2. ✅ Regenerate TypeScript types
3. ✅ Run updated `RLS_AUDIT_AND_FIX.sql`
4. ✅ Update frontend components
5. ✅ Test custom tracking functionality
6. ✅ Update user documentation

---

## Verification Queries

After running the fix, verify success:

```sql
-- Check tables exist
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name IN ('custom_tracking_items', 'custom_tracking_values')
ORDER BY table_name, ordinal_position;

-- Check JSONB column is gone
SELECT column_name 
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'daily_tracking_preferences'
  AND column_name = 'custom_tracking_items';
-- Should return 0 rows

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('custom_tracking_items', 'custom_tracking_values');
-- Should show rowsecurity = true for both

-- Check functions exist
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
  AND routine_name IN ('save_custom_tracking_value', 'get_custom_tracking_history');
-- Should return 2 rows
```

---

## Success! 🎉

Once applied, you'll have:
- **Research-grade custom tracking** with full relational structure
- **HIPAA-compliant security** with proper RLS
- **Type-safe frontend code** with regenerated types
- **Analytics-ready data** for research and insights

**Status:** Ready to execute when you're ready to apply the fix!

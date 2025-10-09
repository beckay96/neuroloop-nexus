-- =====================================================
-- FIX: Normalize daily_tracking_preferences JSONB field
-- =====================================================
-- Created: 2025-01-08
-- Purpose: Remove custom_tracking_items JSONB and normalize to relational structure
-- =====================================================

-- =====================================================
-- STEP 1: Create custom tracking item type enum
-- =====================================================

CREATE TYPE public.custom_tracking_type_enum AS ENUM (
  'symptom',
  'activity',
  'mood',
  'energy',
  'sleep_quality',
  'pain_level',
  'stress_level',
  'custom_scale',
  'yes_no_question',
  'text_note',
  'other'
);

-- =====================================================
-- STEP 2: Create normalized custom tracking items table
-- =====================================================

CREATE TABLE public.custom_tracking_items (
  item_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Item definition
  item_name TEXT NOT NULL,
  item_type public.custom_tracking_type_enum NOT NULL,
  description TEXT,
  
  -- Scale/range settings (for numeric items)
  min_value NUMERIC(10,2),
  max_value NUMERIC(10,2),
  unit TEXT, -- e.g., 'hours', 'steps', 'mg', 'score'
  
  -- Display settings
  icon TEXT, -- Icon name or emoji
  color TEXT, -- Hex color code
  display_order INTEGER DEFAULT 0,
  
  -- Active status
  is_active BOOLEAN DEFAULT true,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure unique item names per user
  CONSTRAINT unique_user_item_name UNIQUE (user_id, item_name)
);

-- Add indexes
CREATE INDEX idx_custom_tracking_items_user ON public.custom_tracking_items(user_id);
CREATE INDEX idx_custom_tracking_items_active ON public.custom_tracking_items(user_id, is_active) WHERE is_active = true;

-- =====================================================
-- STEP 3: Create table for tracking item values
-- =====================================================

CREATE TABLE public.custom_tracking_values (
  value_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID NOT NULL REFERENCES public.custom_tracking_items(item_id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Value (flexible for different types)
  numeric_value NUMERIC(10,2), -- For scales, numbers
  text_value TEXT, -- For text notes, yes/no answers
  boolean_value BOOLEAN, -- For yes/no questions
  
  -- Timestamp
  logged_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  log_date DATE NOT NULL DEFAULT CURRENT_DATE,
  
  -- Notes
  notes TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure at least one value type is set
  CONSTRAINT at_least_one_value CHECK (
    numeric_value IS NOT NULL OR 
    text_value IS NOT NULL OR 
    boolean_value IS NOT NULL
  )
);

-- Add indexes
CREATE INDEX idx_custom_tracking_values_item ON public.custom_tracking_values(item_id);
CREATE INDEX idx_custom_tracking_values_user ON public.custom_tracking_values(user_id);
CREATE INDEX idx_custom_tracking_values_date ON public.custom_tracking_values(log_date DESC);
CREATE INDEX idx_custom_tracking_values_user_date ON public.custom_tracking_values(user_id, log_date DESC);

-- =====================================================
-- STEP 4: Migrate existing JSONB data (if any)
-- =====================================================

CREATE TEMP TABLE IF NOT EXISTS migration_results (
  step_name TEXT,
  status TEXT,
  details TEXT
);

DO $$
DECLARE
  v_pref RECORD;
  v_item JSONB;
  v_item_id UUID;
  v_migrated_count INTEGER := 0;
BEGIN
  FOR v_pref IN 
    SELECT user_id, custom_tracking_items 
    FROM public.daily_tracking_preferences 
    WHERE custom_tracking_items IS NOT NULL 
      AND jsonb_typeof(custom_tracking_items) = 'array'
  LOOP
    FOR v_item IN SELECT * FROM jsonb_array_elements(v_pref.custom_tracking_items)
    LOOP
      INSERT INTO public.custom_tracking_items (
        user_id,
        item_name,
        item_type,
        description,
        min_value,
        max_value,
        unit,
        icon,
        color,
        is_active
      ) VALUES (
        v_pref.user_id,
        COALESCE(v_item->>'name', v_item->>'label', 'Unknown Item'),
        COALESCE((v_item->>'type')::public.custom_tracking_type_enum, 'other'),
        v_item->>'description',
        (v_item->>'min_value')::NUMERIC,
        (v_item->>'max_value')::NUMERIC,
        v_item->>'unit',
        v_item->>'icon',
        v_item->>'color',
        COALESCE((v_item->>'is_active')::BOOLEAN, true)
      )
      ON CONFLICT (user_id, item_name) DO NOTHING;
      v_migrated_count := v_migrated_count + 1;
    END LOOP;
  END LOOP;
  
  INSERT INTO migration_results VALUES ('JSONB Migration', 'SUCCESS', 'Migrated ' || v_migrated_count || ' items');
EXCEPTION WHEN OTHERS THEN
  INSERT INTO migration_results VALUES ('JSONB Migration', 'WARNING', 'Error: ' || SQLERRM);
END $$;

-- =====================================================
-- STEP 5: Drop the JSONB column
-- =====================================================

DO $$
DECLARE
  v_jsonb_count INTEGER;
  v_new_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO v_jsonb_count
  FROM public.daily_tracking_preferences
  WHERE custom_tracking_items IS NOT NULL;
  
  SELECT COUNT(DISTINCT user_id) INTO v_new_count
  FROM public.custom_tracking_items;
  
  INSERT INTO migration_results VALUES (
    'Verification',
    'INFO',
    'JSONB records: ' || v_jsonb_count || ', Migrated users: ' || v_new_count
  );
  
  IF v_jsonb_count > 0 AND v_new_count = 0 THEN
    RAISE EXCEPTION 'Migration may have failed. Manual review needed.';
  END IF;
END $$;

-- Drop the JSONB column
ALTER TABLE public.daily_tracking_preferences 
  DROP COLUMN custom_tracking_items;

INSERT INTO migration_results VALUES ('Drop JSONB Column', 'SUCCESS', 'Dropped custom_tracking_items column');

-- =====================================================
-- STEP 6: Enable RLS on new tables
-- =====================================================

ALTER TABLE public.custom_tracking_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_tracking_values ENABLE ROW LEVEL SECURITY;

-- Custom tracking items - users manage their own
CREATE POLICY "Users can view own custom tracking items"
  ON public.custom_tracking_items
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own custom tracking items"
  ON public.custom_tracking_items
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own custom tracking items"
  ON public.custom_tracking_items
  FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own custom tracking items"
  ON public.custom_tracking_items
  FOR DELETE
  USING (user_id = auth.uid());

-- Custom tracking values - users manage their own
CREATE POLICY "Users can view own custom tracking values"
  ON public.custom_tracking_values
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own custom tracking values"
  ON public.custom_tracking_values
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own custom tracking values"
  ON public.custom_tracking_values
  FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own custom tracking values"
  ON public.custom_tracking_values
  FOR DELETE
  USING (user_id = auth.uid());

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.custom_tracking_items TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.custom_tracking_values TO authenticated;

-- =====================================================
-- STEP 7: Create helper RPCs
-- =====================================================

-- Function to save a custom tracking value
CREATE OR REPLACE FUNCTION public.save_custom_tracking_value(
  p_item_id UUID,
  p_numeric_value NUMERIC DEFAULT NULL,
  p_text_value TEXT DEFAULT NULL,
  p_boolean_value BOOLEAN DEFAULT NULL,
  p_logged_at TIMESTAMPTZ DEFAULT NOW(),
  p_notes TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_value_id UUID;
  v_user_id UUID;
BEGIN
  -- Get the user_id from the item
  SELECT user_id INTO v_user_id
  FROM public.custom_tracking_items
  WHERE item_id = p_item_id;
  
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Custom tracking item not found';
  END IF;
  
  -- Verify user owns this item
  IF v_user_id != auth.uid() THEN
    RAISE EXCEPTION 'Unauthorized access to custom tracking item';
  END IF;
  
  -- Insert the value
  INSERT INTO public.custom_tracking_values (
    item_id,
    user_id,
    numeric_value,
    text_value,
    boolean_value,
    logged_at,
    log_date,
    notes
  ) VALUES (
    p_item_id,
    v_user_id,
    p_numeric_value,
    p_text_value,
    p_boolean_value,
    p_logged_at,
    p_logged_at::DATE,
    p_notes
  ) RETURNING value_id INTO v_value_id;
  
  RETURN v_value_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.save_custom_tracking_value(UUID, NUMERIC, TEXT, BOOLEAN, TIMESTAMPTZ, TEXT) TO authenticated;

-- Function to get custom tracking history
CREATE OR REPLACE FUNCTION public.get_custom_tracking_history(
  p_item_id UUID,
  p_start_date DATE DEFAULT NULL,
  p_end_date DATE DEFAULT NULL,
  p_limit INTEGER DEFAULT 100
)
RETURNS TABLE (
  value_id UUID,
  item_id UUID,
  item_name TEXT,
  item_type TEXT,
  numeric_value NUMERIC,
  text_value TEXT,
  boolean_value BOOLEAN,
  logged_at TIMESTAMPTZ,
  log_date DATE,
  notes TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Get the user_id from the item
  SELECT user_id INTO v_user_id
  FROM public.custom_tracking_items
  WHERE item_id = p_item_id;
  
  -- Verify user owns this item
  IF v_user_id != auth.uid() THEN
    RAISE EXCEPTION 'Unauthorized access to custom tracking item';
  END IF;
  
  RETURN QUERY
  SELECT 
    v.value_id,
    v.item_id,
    i.item_name,
    i.item_type::TEXT,
    v.numeric_value,
    v.text_value,
    v.boolean_value,
    v.logged_at,
    v.log_date,
    v.notes
  FROM public.custom_tracking_values v
  JOIN public.custom_tracking_items i ON i.item_id = v.item_id
  WHERE v.item_id = p_item_id
    AND (p_start_date IS NULL OR v.log_date >= p_start_date)
    AND (p_end_date IS NULL OR v.log_date <= p_end_date)
  ORDER BY v.logged_at DESC
  LIMIT p_limit;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_custom_tracking_history(UUID, DATE, DATE, INTEGER) TO authenticated;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check new tables exist
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name IN ('custom_tracking_items', 'custom_tracking_values')
ORDER BY table_name, ordinal_position;

| table_name             | column_name   | data_type                |
| ---------------------- | ------------- | ------------------------ |
| custom_tracking_items  | item_id       | uuid                     |
| custom_tracking_items  | user_id       | uuid                     |
| custom_tracking_items  | item_name     | text                     |
| custom_tracking_items  | item_type     | USER-DEFINED             |
| custom_tracking_items  | description   | text                     |
| custom_tracking_items  | min_value     | numeric                  |
| custom_tracking_items  | max_value     | numeric                  |
| custom_tracking_items  | unit          | text                     |
| custom_tracking_items  | icon          | text                     |
| custom_tracking_items  | color         | text                     |
| custom_tracking_items  | display_order | integer                  |
| custom_tracking_items  | is_active     | boolean                  |
| custom_tracking_items  | created_at    | timestamp with time zone |
| custom_tracking_items  | updated_at    | timestamp with time zone |
| custom_tracking_values | value_id      | uuid                     |
| custom_tracking_values | item_id       | uuid                     |
| custom_tracking_values | user_id       | uuid                     |
| custom_tracking_values | numeric_value | numeric                  |
| custom_tracking_values | text_value    | text                     |
| custom_tracking_values | boolean_value | boolean                  |
| custom_tracking_values | logged_at     | timestamp with time zone |
| custom_tracking_values | log_date      | date                     |
| custom_tracking_values | notes         | text                     |
| custom_tracking_values | created_at    | timestamp with time zone |


-- Check enum created
SELECT enumlabel 
FROM pg_enum e
JOIN pg_type t ON e.enumtypid = t.oid
WHERE t.typname = 'custom_tracking_type_enum'
ORDER BY e.enumsortorder;


| enumlabel       |
| --------------- |
| symptom         |
| activity        |
| mood            |
| energy          |
| sleep_quality   |
| pain_level      |
| stress_level    |
| custom_scale    |
| yes_no_question |
| text_note       |
| other           |

-- Check RLS enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('custom_tracking_items', 'custom_tracking_values');

| tablename         | rowsecurity |
| ----------------- | ----------- |
| custom_tracking_items | ON        |
| custom_tracking_values | ON        |

-- =====================================================
-- DONE - JSONB NORMALIZED!
-- =====================================================

SELECT * FROM migration_results;

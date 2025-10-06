-- ============================================================================
-- AUTH SIGNUP FIX: Make profiles.user_type nullable + robust trigger
-- ============================================================================

-- 1) Allow NULL during onboarding to prevent signup 500s
DO $$ BEGIN
  ALTER TABLE public.profiles ALTER COLUMN user_type DROP NOT NULL;
EXCEPTION WHEN undefined_column THEN NULL; END $$;

-- 2) Recreate safe handle_new_user() trigger function (PHI-safe, minimal fields)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert skeleton profile; user_type intentionally NULL until onboarding
  INSERT INTO public.profiles (id, email, user_type, onboarding_completed, created_at, updated_at)
  VALUES (NEW.id, NEW.email, NULL, FALSE, NOW(), NOW())
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

COMMENT ON FUNCTION public.handle_new_user() IS 'Inserts minimal profile with NULL user_type to avoid PHI leakage and allow onboarding.';
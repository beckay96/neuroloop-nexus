-- Ensure the handle_new_user function exists and is up to date
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, user_type)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    'patient'  -- Default to patient, can be updated during onboarding
  );
  RETURN NEW;
END;
$$;

-- Drop existing trigger if it exists and recreate it
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger to automatically create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Ensure RLS is enabled on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for profiles if it doesn't exist
DROP POLICY IF EXISTS "Users can manage their own profiles" ON public.profiles;
CREATE POLICY "Users can manage their own profiles"
ON public.profiles
FOR ALL
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);
-- Create waitlist table for collecting emails before official launch
-- This is for public access, separate from authenticated user data

CREATE TABLE IF NOT EXISTS public.waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  name text,
  user_type text NOT NULL CHECK (user_type IN ('patient', 'clinician', 'carer', 'researcher', 'investor', 'other')),
  country text,
  condition text,
  organization text,
  why_interested text,
  consent_updates boolean DEFAULT true,
  join_pilot boolean DEFAULT false,
  subscribed_at timestamptz NOT NULL DEFAULT NOW(),
  unsubscribed_at timestamptz,
  notified_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_subscribed_at ON public.waitlist(subscribed_at);

-- Enable RLS
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for signup form)
CREATE POLICY "Allow public to join waitlist" ON public.waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only admins can view/update/delete (we'll add admin role later)
CREATE POLICY "Only service role can read waitlist" ON public.waitlist
  FOR SELECT
  USING (auth.role() = 'service_role');

CREATE POLICY "Only service role can update waitlist" ON public.waitlist
  FOR UPDATE
  USING (auth.role() = 'service_role');

CREATE POLICY "Only service role can delete waitlist" ON public.waitlist
  FOR DELETE
  USING (auth.role() = 'service_role');

-- Grant permissions
GRANT INSERT ON public.waitlist TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.waitlist TO service_role;

-- Comment
COMMENT ON TABLE public.waitlist IS 'Pre-launch waitlist for email notifications. Public can insert, only service role can read/update.';

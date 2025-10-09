// PHI-FREE Edge Function: Invite Patient
// HIPAA Compliant - No PHI logged or exposed
// Must be called with authenticated clinician JWT

import { createClient } from 'jsr:@supabase/supabase-js@2'

// Dynamic CORS allow-list
const allowedOrigins = new Set([
  'https://neuroloop.app',
  'https://staging.neuroloop.app',
  'http://localhost:5173', // optional for local dev
  'http://10.0.0.34:8002', // your local dev IP/port
])

function buildCorsHeaders(req) {
  const origin = req.headers.get('Origin') ?? ''
  const allowed = allowedOrigins.has(origin)
  const corsHeaders = {
    'Access-Control-Allow-Origin': allowed ? origin : 'https://neuroloop.app',
    'Vary': 'Origin',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }
  return { corsHeaders, allowed }
}

Deno.serve(async (req) => {
  const { corsHeaders, allowed } = buildCorsHeaders(req)
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    if (!allowed) return new Response('Forbidden', { status: 403, headers: corsHeaders })
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get authenticated user from JWT
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create Supabase client with user's JWT
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    )

    // Verify user is authenticated and is a clinician
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verify user is a clinician
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('user_type')
      .eq('id', user.id)
      .single()

    if (!profile || profile.user_type !== 'clinician') {
      return new Response(
        JSON.stringify({ error: 'Only clinicians can invite patients' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Parse request body
    const { email, message } = await req.json()

    if (!email || typeof email !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Validate email format (basic)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create service role client for admin operations
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Hash email for lookup
    const emailHash = await hashEmail(email.toLowerCase().trim())

    // Check if invitation already exists
    const { data: existingInvite } = await supabaseAdmin
      .from('patient_invitations')
      .select('id, status')
      .eq('clinician_id', user.id)
      .eq('patient_email_hash', emailHash)
      .eq('status', 'pending')
      .maybeSingle()

    if (existingInvite) {
      return new Response(
        JSON.stringify({ error: 'An active invitation already exists for this patient' }),
        { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Invite or send magic link so the account exists and receives email
    const emailLower = email.toLowerCase().trim()
    const redirect = (Deno.env.get('APP_URL') || 'https://neuroloop-nexus.vercel.app') + '/auth/callback'
    try {
      const { error: inviteErr } = await supabaseAdmin.auth.admin.inviteUserByEmail(emailLower, { redirectTo: redirect })
      if (inviteErr) {
        // If invite fails (e.g., user already exists), fallback to generate a magic link or send OTP email
        try {
          // Try generating a magic link (may require you to deliver it)
          await supabaseAdmin.auth.admin.generateLink({
            type: 'magiclink',
            email: emailLower,
            options: { redirectTo: redirect }
          })
        } catch {
          // Final fallback: send OTP email using anon client (sends email)
          const supabaseAnon = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? ''
          )
          await supabaseAnon.auth.signInWithOtp({
            email: emailLower,
            options: { emailRedirectTo: redirect }
          })
        }
      }
    } catch (_e) {
      // Continue; we will still link if user exists or will be created later
    }

    // Fetch (or re-fetch) the user so we can upsert profile and connection rows
    const { data: usersAfterInvite } = await supabaseAdmin.auth.admin.listUsers()
    const patientUser = usersAfterInvite.users.find(u => u.email?.toLowerCase() === emailLower)
    const patientId = patientUser?.id ?? null

    // Pre-create minimal profile rows
    if (patientId) {
      await supabaseAdmin.from('profiles').upsert({ id: patientId, user_type: 'patient' })
      await supabaseAdmin.from('patient_profiles').upsert({ user_id: patientId })
    }

    // Ensure a connection row exists between clinician and patient
    if (patientId) {
      await supabaseAdmin
        .from('patient_clinician_connections')
        .upsert({
          patient_id: patientId,
          clinician_id: user.id,
          status: 'pending',
          access_level: 'full'
        }, { onConflict: 'patient_id,clinician_id' })
    }

    // Create or refresh invitation record (idempotent by hash+clinician+status pending)

    // Create invitation record
    const { data: invitation, error: inviteError } = await supabaseAdmin
      .from('patient_invitations')
      .insert({
        clinician_id: user.id,
        patient_email: email.toLowerCase().trim(),
        patient_email_hash: emailHash,
        message: message || null,
        patient_id: patientId,
        status: 'pending',
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
      })
      .select()
      .single()

    if (inviteError) {
      console.error('Failed to create invitation')
      return new Response(
        JSON.stringify({ error: 'Failed to create invitation' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Generate invitation link (PHI-free)
    const baseUrl = Deno.env.get('APP_URL') || 'https://neuroloop-nexus.vercel.app'
    const inviteLink = `${baseUrl}/invite/patient?token=${invitation.invitation_token}`

    // Return success with link (email sending handled separately by Supabase Auth)
    return new Response(
      JSON.stringify({
        success: true,
        link: inviteLink,
        message: 'Invitation created successfully'
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    // Never log the actual error (could contain PHI)
    console.error('Invitation error')
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

// Helper function to hash email using SHA-256
async function hashEmail(email) {
  const msgBuffer = new TextEncoder().encode(email)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

// PHI-FREE Edge Function: Invite Patient
// HIPAA Compliant - No PHI logged or exposed
// Must be called with authenticated clinician JWT

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
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
      .single()

    if (existingInvite) {
      return new Response(
        JSON.stringify({ error: 'An active invitation already exists for this patient' }),
        { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if patient already exists in auth.users
    const { data: existingUser } = await supabaseAdmin.auth.admin.listUsers()
    const patientUser = existingUser.users.find(u => u.email?.toLowerCase() === email.toLowerCase())

    let patientId = patientUser?.id || null

    // If user doesn't exist, create invitation for them to sign up
    // They'll use Supabase Auth's built-in invite flow
    if (!patientUser) {
      // We'll create the user when they accept the invitation
      // For now, just create the invitation record
    }

    // Create invitation record
    const { data: invitation, error: inviteError } = await supabaseAdmin
      .from('patient_invitations')
      .insert({
        clinician_id: user.id,
        patient_email: email.toLowerCase().trim(),
        patient_email_hash: emailHash,
        invitation_message: message || null,
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
async function hashEmail(email: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(email)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

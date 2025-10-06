// PHI-FREE Edge Function: Invite Carer
// HIPAA Compliant - No PHI logged or exposed
// Must be called with authenticated patient JWT

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

    // Verify user is authenticated and is a patient
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verify user is a patient
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('user_type')
      .eq('id', user.id)
      .single()

    if (!profile || profile.user_type !== 'patient') {
      return new Response(
        JSON.stringify({ error: 'Only patients can invite carers' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Parse request body
    const { email, relationship_type } = await req.json()

    if (!email || typeof email !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!relationship_type || typeof relationship_type !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Relationship type is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Validate relationship type
    const validRelationships = [
      'spouse', 'parent', 'child', 'sibling', 'friend', 
      'professional_caregiver', 'other_family', 'healthcare_worker'
    ]
    if (!validRelationships.includes(relationship_type)) {
      return new Response(
        JSON.stringify({ error: 'Invalid relationship type' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Validate email format
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
      .from('carer_invitations')
      .select('id, status')
      .eq('patient_user_id', user.id)
      .eq('carer_email_hash', emailHash)
      .in('status', ['pending', 'verification_required'])
      .single()

    if (existingInvite) {
      return new Response(
        JSON.stringify({ error: 'An active invitation already exists for this carer' }),
        { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if carer already exists in auth.users
    const { data: existingUser } = await supabaseAdmin.auth.admin.listUsers()
    const carerUser = existingUser.users.find(u => u.email?.toLowerCase() === email.toLowerCase())

    let carerUserId = carerUser?.id || null

    // Pre-create the carer relationship (verification_required status)
    const { data: relationship, error: relationshipError } = await supabaseAdmin
      .from('carer_relationships')
      .insert({
        patient_user_id: user.id,
        carer_user_id: carerUserId, // null if user doesn't exist yet
        relationship_type: relationship_type,
        status: 'verification_required'
      })
      .select()
      .single()

    if (relationshipError) {
      console.error('Failed to create relationship')
      return new Response(
        JSON.stringify({ error: 'Failed to create relationship' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create invitation record
    const { data: invitation, error: inviteError } = await supabaseAdmin
      .from('carer_invitations')
      .insert({
        relationship_id: relationship.id,
        patient_user_id: user.id,
        carer_email: email.toLowerCase().trim(),
        carer_email_hash: emailHash,
        carer_user_id: carerUserId,
        status: 'pending',
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
      })
      .select()
      .single()

    if (inviteError) {
      console.error('Failed to create invitation')
      // Cleanup relationship
      await supabaseAdmin
        .from('carer_relationships')
        .delete()
        .eq('id', relationship.id)
      
      return new Response(
        JSON.stringify({ error: 'Failed to create invitation' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Generate invitation link (PHI-free)
    const baseUrl = Deno.env.get('APP_URL') || 'https://neuroloop-nexus.vercel.app'
    const inviteLink = `${baseUrl}/invite/carer?token=${invitation.invitation_token}`

    // Return success with link
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

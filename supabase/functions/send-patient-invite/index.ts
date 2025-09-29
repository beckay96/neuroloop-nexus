import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create admin client with service role key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { email, clinicianId, clinicianName, inviteMessage } = await req.json()

    if (!email || !clinicianId) {
      return new Response(
        JSON.stringify({ error: 'Email and clinician ID are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if user already exists
    const { data: existingUser, error: getUserError } = await supabaseAdmin.auth.admin.getUserByEmail(email)
    
    if (getUserError && !getUserError.message.includes('User not found')) {
      throw getUserError
    }

    if (existingUser?.user) {
      // User exists, create a connection request instead
      const { error: connectionError } = await supabaseAdmin
        .from('patient_clinician_connections')
        .insert({
          patient_id: existingUser.user.id,
          clinician_id: clinicianId,
          status: 'pending',
          invited_by: clinicianId
        })

      if (connectionError) {
        throw connectionError
      }
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Connection request sent to existing user',
          userId: existingUser.user.id 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create new user invitation
    const { data: inviteData, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
      data: {
        invited_by_clinician: clinicianId,
        clinician_name: clinicianName,
        user_type: 'patient',
        invite_message: inviteMessage
      },
      redirectTo: `${Deno.env.get('SITE_URL')}/onboarding?type=patient&invited_by=${clinicianId}`
    })

    if (inviteError) {
      throw inviteError
    }

    // Track the invite in our database
    const { error: trackingError } = await supabaseAdmin
      .from('patient_invites')
      .insert({
        email,
        clinician_id: clinicianId,
        invite_id: inviteData.user?.id,
        status: 'sent',
        invited_at: new Date().toISOString()
      })

    if (trackingError) {
      console.error('Error tracking invite:', trackingError)
      // Don't fail the request if tracking fails
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Patient invite sent successfully',
        inviteId: inviteData.user?.id 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error sending patient invite:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
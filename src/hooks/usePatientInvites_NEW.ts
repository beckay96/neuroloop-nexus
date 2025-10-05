import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

interface InvitePatientData {
  email: string
  clinicianName: string
  inviteMessage?: string
}

interface InviteResult {
  success: boolean
  message: string
  inviteId?: string
  invitationToken?: string
}

interface PatientInvitation {
  id: string
  patient_email: string
  status: 'pending' | 'accepted' | 'expired' | 'cancelled'
  invited_at: string
  expires_at: string
  accepted_at?: string
  invitation_token: string
}

export const usePatientInvites = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  /**
   * HIPAA-COMPLIANT PATIENT INVITATION FLOW
   * 
   * This creates an invitation record in the database and returns
   * a secure invitation link. Email sending must be done separately
   * through a HIPAA-compliant email service.
   */
  const sendPatientInvite = async (data: InvitePatientData): Promise<InviteResult> => {
    setIsLoading(true)
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        throw new Error('User not authenticated')
      }

      // Hash the email for privacy
      const emailHash = await hashEmail(data.email)

      // Create invitation record
      const { data: invitation, error } = await supabase
        .from('patient_invitations')
        .insert({
          clinician_id: user.id,
          patient_email: data.email,
          patient_email_hash: emailHash,
          invitation_message: data.inviteMessage,
          status: 'pending',
          invited_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
        })
        .select()
        .single()

      if (error) {
        // Check for duplicate invitation
        if (error.code === '23505') { // Unique constraint violation
          throw new Error('An invitation has already been sent to this email')
        }
        throw error
      }

      if (!invitation) {
        throw new Error('Failed to create invitation')
      }

      // Generate invitation URL
      const invitationUrl = `${window.location.origin}/signup?invite=${invitation.invitation_token}`

      /**
       * IMPORTANT: Email sending happens here
       * 
       * OPTIONS FOR HIPAA-COMPLIANT EMAIL:
       * 1. Use Supabase Auth's built-in email (if BAA signed)
       * 2. Use a HIPAA-compliant email service like:
       *    - SendGrid (Enterprise with BAA)
       *    - AWS SES (with BAA)
       *    - Postmark (with BAA)
       * 
       * For now, we log the URL. In production, integrate with your email service.
       */
      console.log('='.repeat(80))
      console.log('PATIENT INVITATION CREATED')
      console.log('='.repeat(80))
      console.log('Email:', data.email)
      console.log('Invitation URL:', invitationUrl)
      console.log('Expires:', invitation.expires_at)
      console.log('='.repeat(80))
      console.log('⚠️  EMAIL MUST BE SENT VIA HIPAA-COMPLIANT SERVICE')
      console.log('See PATIENT_INVITATION_EMAIL_GUIDE.md for setup')
      console.log('='.repeat(80))

      // TODO: Send email via HIPAA-compliant service
      // await sendHIPAACompliantEmail({
      //   to: data.email,
      //   subject: `${data.clinicianName} has invited you to NeuroLoop`,
      //   body: generateInvitationEmail(data.clinicianName, invitationUrl, data.inviteMessage)
      // })

      toast({
        title: "Invitation created",
        description: `Invitation for ${data.email} is ready. Check console for invitation link.`,
      })

      return {
        success: true,
        message: 'Invitation created successfully',
        inviteId: invitation.id,
        invitationToken: invitation.invitation_token
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send invite'
      
      toast({
        title: "Failed to create invite",
        description: errorMessage,
        variant: "destructive",
      })

      return {
        success: false,
        message: errorMessage
      }
    } finally {
      setIsLoading(false)
    }
  }

  const sendMultipleInvites = async (
    emails: string[], 
    clinicianName: string, 
    inviteMessage?: string
  ): Promise<InviteResult[]> => {
    setIsLoading(true)
    
    try {
      const results = await Promise.allSettled(
        emails.map(email => 
          sendPatientInvite({ email, clinicianName, inviteMessage })
        )
      )

      const inviteResults = results.map((result, index) => {
        if (result.status === 'fulfilled') {
          return result.value
        } else {
          return {
            success: false,
            message: `Failed to invite ${emails[index]}: ${result.reason}`
          }
        }
      })

      const successCount = inviteResults.filter(r => r.success).length
      const failCount = inviteResults.length - successCount

      toast({
        title: "Batch invite completed",
        description: `${successCount} invites created${failCount > 0 ? `, ${failCount} failed` : ''}`,
        variant: failCount > 0 ? "destructive" : "default"
      })

      return inviteResults
    } finally {
      setIsLoading(false)
    }
  }

  const getPatientInvites = async (): Promise<PatientInvitation[]> => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return []

      // Expire old invitations first
      await supabase.rpc('expire_old_invitations')

      // Get all invitations for this clinician
      const { data: invitations, error } = await supabase
        .from('patient_invitations')
        .select('*')
        .eq('clinician_id', user.id)
        .order('invited_at', { ascending: false })

      if (error) {
        throw error
      }

      return invitations || []
    } catch (error) {
      console.error('Error fetching invites:', error)
      return []
    }
  }

  const cancelInvite = async (inviteId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('patient_invitations')
        .update({ 
          status: 'cancelled',
          cancelled_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', inviteId)

      if (error) {
        throw error
      }

      toast({
        title: "Invite cancelled",
        description: "Patient invite has been cancelled",
      })
      return true
    } catch (error) {
      console.error('Error cancelling invite:', error)
      toast({
        title: "Error",
        description: "Failed to cancel invite",
        variant: "destructive"
      })
      return false
    }
  }

  const getInvitationByToken = async (token: string): Promise<PatientInvitation | null> => {
    try {
      const { data: invitation, error } = await supabase
        .from('patient_invitations')
        .select('*')
        .eq('invitation_token', token)
        .eq('status', 'pending')
        .single()

      if (error) {
        throw error
      }

      // Check if expired
      if (new Date(invitation.expires_at) < new Date()) {
        await supabase
          .from('patient_invitations')
          .update({ status: 'expired' })
          .eq('id', invitation.id)
        
        return null
      }

      return invitation
    } catch (error) {
      console.error('Error fetching invitation:', error)
      return null
    }
  }

  const acceptInvitation = async (token: string): Promise<boolean> => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        throw new Error('User must be logged in to accept invitation')
      }

      // Call the database function to accept invitation
      const { data, error } = await supabase.rpc('accept_invitation', {
        invitation_token_param: token,
        patient_id_param: user.id
      })

      if (error) {
        throw error
      }

      if (!data) {
        throw new Error('Invitation not found or expired')
      }

      toast({
        title: "Invitation accepted",
        description: "You've been connected with your clinician",
      })

      return true
    } catch (error) {
      console.error('Error accepting invitation:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to accept invitation",
        variant: "destructive"
      })
      return false
    }
  }

  return {
    sendPatientInvite,
    sendMultipleInvites,
    getPatientInvites,
    cancelInvite,
    getInvitationByToken,
    acceptInvitation,
    isLoading
  }
}

// Helper function to hash emails
async function hashEmail(email: string): Promise<string> {
  const normalized = email.toLowerCase().trim()
  const encoder = new TextEncoder()
  const data = encoder.encode(normalized)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

// Helper function to generate email template (no PHI)
export function generateInvitationEmail(
  clinicianName: string,
  invitationUrl: string,
  customMessage?: string
): string {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NeuroLoop Invitation</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0;">NeuroLoop</h1>
        <p style="color: white; margin: 10px 0 0 0;">Advanced Neurological Health Tracking</p>
    </div>
    
    <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #667eea; margin-top: 0;">You've Been Invited!</h2>
        
        <p><strong>${clinicianName}</strong> has invited you to join NeuroLoop, a secure platform for tracking your neurological health and connecting with your care team.</p>
        
        ${customMessage ? `<div style="background: white; padding: 20px; border-left: 4px solid #667eea; margin: 20px 0;">
            <p style="margin: 0; font-style: italic;">"${customMessage}"</p>
        </div>` : ''}
        
        <div style="margin: 30px 0;">
            <a href="${invitationUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; font-weight: bold;">Accept Invitation</a>
        </div>
        
        <p><strong>Why NeuroLoop?</strong></p>
        <ul>
            <li>Track symptoms, medications, and triggers</li>
            <li>Share data securely with your care team</li>
            <li>Contribute to research (optional)</li>
            <li>HIPAA-compliant and secure</li>
        </ul>
        
        <p style="color: #666; font-size: 14px; margin-top: 30px;">
            This invitation will expire in 7 days. If you have any questions, please contact your healthcare provider.
        </p>
        
        <p style="color: #999; font-size: 12px; border-top: 1px solid #ddd; padding-top: 20px; margin-top: 30px;">
            This email contains no protected health information (PHI). It is simply an invitation to join a secure health tracking platform.
        </p>
    </div>
</body>
</html>
  `
}

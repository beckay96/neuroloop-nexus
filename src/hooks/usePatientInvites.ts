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
  userId?: string
}

export const usePatientInvites = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const sendPatientInvite = async (data: InvitePatientData): Promise<InviteResult> => {
    setIsLoading(true)
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        throw new Error('User not authenticated')
      }

      const { data: result, error } = await supabase.functions.invoke('send-patient-invite', {
        body: {
          email: data.email,
          clinicianId: user.id,
          clinicianName: data.clinicianName,
          inviteMessage: data.inviteMessage
        }
      })

      if (error) {
        throw error
      }

      if (result.success) {
        toast({
          title: "Invite sent successfully",
          description: `Patient invite sent to ${data.email}`,
        })
      }

      return result
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send invite'
      
      toast({
        title: "Failed to send invite",
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
        description: `${successCount} invites sent successfully${failCount > 0 ? `, ${failCount} failed` : ''}`,
        variant: failCount > 0 ? "destructive" : "default"
      })

      return inviteResults
    } finally {
      setIsLoading(false)
    }
  }

  const getPatientInvites = async () => {
    try {
      const { data, error } = await supabase
        .from('patient_invites')
        .select('id, email, status, invited_at, accepted_at, expires_at')
        .order('created_at', { ascending: false })

      if (error) {
        // If table doesn't exist yet, return empty array
        if (error.message.includes('does not exist')) {
          return []
        }
        
        toast({
          title: "Failed to load invites",
          description: error.message,
          variant: "destructive",
        })
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error fetching invites:', error)
      return []
    }
  }

  const cancelInvite = async (inviteId: string) => {
    const { error } = await supabase
      .from('patient_invites')
      .update({ status: 'cancelled' })
      .eq('id', inviteId)

    if (error) {
      toast({
        title: "Failed to cancel invite",
        description: error.message,
        variant: "destructive",
      })
      return false
    }

    toast({
      title: "Invite cancelled",
      description: "Patient invite has been cancelled",
    })
    return true
  }

  return {
    sendPatientInvite,
    sendMultipleInvites,
    getPatientInvites,
    cancelInvite,
    isLoading
  }
}

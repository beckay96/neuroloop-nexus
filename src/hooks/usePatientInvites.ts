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

      const { data: result, error } = await supabase.functions.invoke('invite_patient', {
        body: {
          email: data.email,
          message: data.inviteMessage ?? undefined
        }
      })

      if (error) {
        throw error
      }

      if ((result as any)?.success) {
        toast({
          title: "Invite sent successfully",
          description: `Patient invite created for ${data.email}`,
        })
      }

      return result
    } catch (error) {
      const errorMessage = (error as any)?.message || (error instanceof Error ? error.message : 'Failed to send invite')
      
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

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
    const delayMsEnv = (import.meta as any)?.env?.VITE_INVITE_BATCH_DELAY_MS
    const delayMs = Number(delayMsEnv) > 0 ? Number(delayMsEnv) : 30000 // default 30s

    try {
      const inviteResults: InviteResult[] = []

      for (let i = 0; i < emails.length; i++) {
        const email = emails[i]
        const result = await sendPatientInvite({ email, clinicianName, inviteMessage })
        inviteResults.push(result)

        // Delay between invites (except after the last one)
        if (i < emails.length - 1) {
          await sleep(delayMs)
        }
      }

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

  const getPatientInvites = async (): Promise<any[]> => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return []

      // Use RPC to fetch clinician's invites (RLS-safe)
      const { data, error } = await supabase.rpc('get_clinician_connection_requests', {
        p_clinician_id: user.id
      })
      if (error) throw error

      const invites = (Array.isArray(data) ? data : (data ? [data] : [])).map((row: any) => ({
        id: row.id,
        email: row.patient_email,
        status: row.status === 'pending' ? 'sent' : row.status,
        invited_at: row.invited_at,
        accepted_at: row.accepted_at,
        expires_at: row.expires_at
      }))

      return invites
    } catch (error) {
      console.error('Error fetching invites:', error)
      return []
    }
  }

  const cancelInvite = async (inviteId: string): Promise<boolean> => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const now = new Date().toISOString()
      const { error } = await supabase
        .from('patient_invitations')
        .update({ status: 'cancelled', cancelled_at: now })
        .eq('id', inviteId)
        .eq('clinician_id', user.id)
        .eq('status', 'pending')

      if (error) throw error

      toast({ title: 'Invite cancelled', description: 'Patient invite has been cancelled' })
      return true
    } catch (error) {
      console.error('Error cancelling invite:', error)
      toast({ title: 'Cancel failed', description: 'Unable to cancel invite', variant: 'destructive' })
      return false
    }
  }

  return {
    sendPatientInvite,
    sendMultipleInvites,
    getPatientInvites,
    cancelInvite,
    isLoading
  }
}

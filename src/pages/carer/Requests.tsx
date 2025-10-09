import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import { useVerifyCarerDOB } from '@/hooks/useVerifyCarerDOB'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'

interface CarerInviteRow {
  id: string
  invitation_token: string
  status: 'pending' | 'verification_required' | 'accepted' | 'expired' | 'cancelled' | 'verification_failed'
  invited_at: string
  expires_at: string | null
}

export default function CarerRequests() {
  const { user } = useAuth()
  const { toast } = useToast()
  const { verifyDOB, loading: verifying } = useVerifyCarerDOB()
  const [loading, setLoading] = useState(true)
  const [invites, setInvites] = useState<CarerInviteRow[]>([])
  const [dobInputs, setDobInputs] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!user?.id) return
    loadInvites()
  }, [user?.id])

  async function loadInvites() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('carer_invitations')
        .select('id, invitation_token, status, invited_at, expires_at')
        .eq('carer_user_id', user!.id)
        .in('status', ['pending', 'verification_required'])
        .gt('expires_at', new Date().toISOString())
        .order('invited_at', { ascending: false })

      if (error) throw error
      setInvites(data || [])
    } catch (e) {
      toast({ title: 'Error', description: 'Failed to load requests', variant: 'destructive' })
      setInvites([])
    } finally {
      setLoading(false)
    }
  }

  async function handleVerify(invite: CarerInviteRow) {
    const dob = dobInputs[invite.id]
    if (!dob) {
      toast({ title: 'Enter DOB', description: 'Please enter the patient DOB (YYYY-MM-DD)', variant: 'destructive' })
      return
    }

    const res = await verifyDOB({ token: invite.invitation_token, dateOfBirth: dob })
    if (res.success) {
      toast({ title: 'Verified', description: 'Access granted' })
      await loadInvites()
    } else {
      toast({ title: 'Verification failed', description: res.message || res.error || 'Try again', variant: 'destructive' })
      await loadInvites()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading requests...</div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Care Requests</h1>
      {invites.length === 0 ? (
        <Card className="p-6 text-muted-foreground">No pending requests.</Card>
      ) : (
        invites.map((inv) => (
          <Card key={inv.id} className="p-4 space-y-3">
            <div className="text-sm text-muted-foreground">
              Invited: {new Date(inv.invited_at).toLocaleString()}
              {inv.expires_at ? ` • Expires: ${new Date(inv.expires_at).toLocaleString()}` : ''}
            </div>
            <div className="space-y-2">
              <Label htmlFor={`dob-${inv.id}`}>Enter patient's DOB (YYYY-MM-DD)</Label>
              <Input
                id={`dob-${inv.id}`}
                placeholder="YYYY-MM-DD"
                value={dobInputs[inv.id] || ''}
                onChange={(e) => setDobInputs((prev) => ({ ...prev, [inv.id]: e.target.value }))}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleVerify(inv)} disabled={verifying}>
                Verify & Accept
              </Button>
              <Button variant="outline" onClick={loadInvites}>
                Refresh
              </Button>
            </div>
          </Card>
        ))
      )}
    </div>
  )
}

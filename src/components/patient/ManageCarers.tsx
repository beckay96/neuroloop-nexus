import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useInviteCarer } from '@/hooks/useInviteCarer';
import {
  Heart,
  UserPlus,
  Loader2,
  Send,
  CheckCircle,
  Copy,
  Shield,
  Mail,
  Clock,
  XCircle,
  AlertCircle,
} from 'lucide-react';

interface CarerRelationship {
  id: string;
  carer_user_id: string | null;
  relationship_type: string;
  status: string;
  created_at: string;
  carer_profile?: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

interface CarerInvitation {
  id: string;
  carer_email: string;
  status: string;
  invited_at: string;
  expires_at: string;
  relationship_id: string;
  dob_verification_attempts: number;
  max_dob_attempts: number;
}

export function ManageCarers() {
  const [relationships, setRelationships] = useState<CarerRelationship[]>([]);
  const [invitations, setInvitations] = useState<CarerInvitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [inviteLink, setInviteLink] = useState('');
  const { toast } = useToast();
  const { inviteCarer, loading: inviting } = useInviteCarer();

  const [inviteForm, setInviteForm] = useState({
    email: '',
    relationship_type: 'spouse'
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Load relationships
      const { data: relsData } = await supabase
        .from('carer_relationships')
        .select(`
          id,
          carer_user_id,
          relationship_type,
          status,
          created_at,
          carer_profile:carer_user_id(first_name, last_name, email)
        `)
        .eq('patient_user_id', user.id)
        .order('created_at', { ascending: false });

      if (relsData) setRelationships(relsData as any);

      // Load pending invitations
      const { data: invitesData } = await supabase
        .from('carer_invitations')
        .select('*')
        .eq('patient_user_id', user.id)
        .in('status', ['pending', 'verification_required'])
        .order('invited_at', { ascending: false });

      if (invitesData) setInvitations(invitesData);
    } catch (err) {
      console.error('Failed to load carers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inviteForm.email) {
      toast({
        title: 'Email Required',
        description: 'Please enter a carer email address',
        variant: 'destructive'
      });
      return;
    }

    const result = await inviteCarer({
      email: inviteForm.email,
      relationship_type: inviteForm.relationship_type
    });

    if (result.success && result.link) {
      setInviteLink(result.link);
      toast({
        title: 'Invitation Sent!',
        description: `Carer invite sent to ${inviteForm.email}`,
      });
      loadData(); // Refresh the list
    } else {
      toast({
        title: 'Failed to Send Invitation',
        description: result.error || 'Please try again',
        variant: 'destructive'
      });
    }
  };

  const handleCopyLink = () => {
    if (inviteLink) {
      navigator.clipboard.writeText(inviteLink);
      toast({
        title: 'Link Copied!',
        description: 'Invitation link copied to clipboard',
      });
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setTimeout(() => {
      setInviteForm({ email: '', relationship_type: 'spouse' });
      setInviteLink('');
    }, 300);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Active</Badge>;
      case 'verification_required':
        return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100">Pending Verification</Badge>;
      case 'pending':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">Invited</Badge>;
      case 'verification_failed':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">Verification Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRelationshipLabel = (type: string) => {
    const labels: Record<string, string> = {
      spouse: 'Spouse/Partner',
      parent: 'Parent',
      child: 'Child',
      sibling: 'Sibling',
      friend: 'Friend',
      professional_caregiver: 'Professional Caregiver',
      other_family: 'Other Family',
      healthcare_worker: 'Healthcare Worker'
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <Card className="p-8">
        <div className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            My Carers
          </h2>
          <p className="text-muted-foreground">
            Manage people who help with your care
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Invite Carer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Invite a Carer
              </DialogTitle>
              <DialogDescription>
                Send a secure invitation to someone who helps with your care. They'll need to verify your date of birth.
              </DialogDescription>
            </DialogHeader>

            {!inviteLink ? (
              <form onSubmit={handleInvite} className="space-y-4">
                {/* Security Badge */}
                <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <p className="text-xs text-blue-900 dark:text-blue-100">
                    DOB verification required • HIPAA Compliant
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="carer-email">Carer Email Address *</Label>
                  <Input
                    id="carer-email"
                    type="email"
                    placeholder="carer@example.com"
                    value={inviteForm.email}
                    onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="relationship">Relationship *</Label>
                  <Select
                    value={inviteForm.relationship_type}
                    onValueChange={(value) => setInviteForm({ ...inviteForm, relationship_type: value })}
                  >
                    <SelectTrigger id="relationship">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spouse">Spouse/Partner</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="sibling">Sibling</SelectItem>
                      <SelectItem value="friend">Friend</SelectItem>
                      <SelectItem value="professional_caregiver">Professional Caregiver</SelectItem>
                      <SelectItem value="other_family">Other Family</SelectItem>
                      <SelectItem value="healthcare_worker">Healthcare Worker</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                  <p className="text-xs text-amber-900 dark:text-amber-100">
                    <strong>Security Note:</strong> The carer will need to enter your date of birth to verify their identity (max 3 attempts).
                  </p>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={handleCloseDialog}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={inviting}>
                    {inviting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Invitation
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center py-6 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold">Invitation Sent!</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    An email has been sent to <span className="font-medium">{inviteForm.email}</span>
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Invitation Link</Label>
                  <div className="flex gap-2">
                    <Input value={inviteLink} readOnly className="font-mono text-xs" />
                    <Button type="button" variant="outline" size="icon" onClick={handleCopyLink}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    You can share this link directly. It expires in 30 days.
                  </p>
                </div>

                <DialogFooter>
                  <Button onClick={handleCloseDialog} className="w-full">
                    Done
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Active Carers */}
      {relationships.filter(r => r.status === 'active').length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Active Carers</h3>
          <div className="grid gap-3">
            {relationships.filter(r => r.status === 'active').map((rel) => (
              <Card key={rel.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Heart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">
                        {rel.carer_profile?.first_name} {rel.carer_profile?.last_name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {getRelationshipLabel(rel.relationship_type)}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(rel.status)}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Pending Invitations */}
      {invitations.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Pending Invitations</h3>
          <div className="grid gap-3">
            {invitations.map((invite) => (
              <Card key={invite.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-semibold">{invite.carer_email}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Invited {new Date(invite.invited_at).toLocaleDateString()}</span>
                      </div>
                      {invite.status === 'verification_required' && invite.dob_verification_attempts > 0 && (
                        <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                          {invite.max_dob_attempts - invite.dob_verification_attempts} verification attempts remaining
                        </p>
                      )}
                    </div>
                  </div>
                  {getStatusBadge(invite.status)}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {relationships.length === 0 && invitations.length === 0 && (
        <Card className="p-12">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <Heart className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">No Carers Yet</h3>
              <p className="text-muted-foreground max-w-sm">
                Invite someone who helps with your care to access the carer portal
              </p>
            </div>
            <Button onClick={() => setDialogOpen(true)} className="gap-2">
              <UserPlus className="h-4 w-4" />
              Invite Your First Carer
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}

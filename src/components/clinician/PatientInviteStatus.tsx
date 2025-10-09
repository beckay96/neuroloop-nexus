import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Mail, 
  UserPlus, 
  Clock, 
  CheckCircle, 
  XCircle, 
  RefreshCw,
  Plus,
  Upload,
  FileText
} from 'lucide-react';
import { usePatientInvites } from '@/hooks/usePatientInvites';
import { useToast } from '@/hooks/use-toast';

interface PatientInvite {
  id: string;
  email: string;
  status: 'sent' | 'accepted' | 'expired' | 'cancelled';
  invited_at: string;
  accepted_at?: string;
  expires_at: string;
}

export default function PatientInviteStatus() {
  const [invites, setInvites] = useState<PatientInvite[]>([]);
  const [newEmail, setNewEmail] = useState('');
  const [bulkEmails, setBulkEmails] = useState('');
  const [showBulkInvite, setShowBulkInvite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { sendPatientInvite, sendMultipleInvites, getPatientInvites, cancelInvite } = usePatientInvites();
  const { toast } = useToast();

  const loadInvites = async () => {
    setIsLoading(true);
    try {
      const data = await getPatientInvites();
      // Ensure data matches our interface
      const validInvites: PatientInvite[] = (data || []).map((item: any) => ({
        id: item.id || '',
        email: item.email || '',
        status: item.status || 'sent',
        invited_at: item.invited_at || new Date().toISOString(),
        accepted_at: item.accepted_at,
        expires_at: item.expires_at || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      }));
      setInvites(validInvites);
    } catch (error) {
      console.error('Error loading invites:', error);
      setInvites([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInvites();
  }, []);

  const handleSendInvite = async () => {
    if (!newEmail || !newEmail.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    const result = await sendPatientInvite({
      email: newEmail,
      clinicianName: 'Dr. [Your Name]', // This should come from user profile
      inviteMessage: 'You have been invited to join NeuroLoop to track your neurological health.'
    });

    if (result.success) {
      setNewEmail('');
      loadInvites(); // Refresh the list
    }
  };

  const handleBulkInvite = async () => {
    if (!bulkEmails.trim()) {
      toast({
        title: "No emails provided",
        description: "Please enter email addresses to send invites",
        variant: "destructive",
      });
      return;
    }

    // Parse emails from text area (comma, semicolon, or newline separated)
    const emailList = bulkEmails
      .split(/[,;\n]/)
      .map(email => email.trim())
      .filter(email => email && email.includes('@'));

    if (emailList.length === 0) {
      toast({
        title: "No valid emails found",
        description: "Please enter valid email addresses",
        variant: "destructive",
      });
      return;
    }

    const results = await sendMultipleInvites(
      emailList,
      'Dr. [Your Name]', // This should come from user profile
      'You have been invited to join NeuroLoop to track your neurological health.'
    );

    setBulkEmails('');
    setShowBulkInvite(false);
    loadInvites(); // Refresh the list
  };

  const handleCancelInvite = async (inviteId: string) => {
    const success = await cancelInvite(inviteId);
    if (success) {
      loadInvites(); // Refresh the list
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge variant="outline" className="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'accepted':
        return <Badge variant="default" className="bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-600"><CheckCircle className="h-3 w-3 mr-1" />Accepted</Badge>;
      case 'expired':
        return <Badge variant="secondary" className="bg-muted text-muted-foreground"><XCircle className="h-3 w-3 mr-1" />Expired</Badge>;
      case 'cancelled':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Patient Invitations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Send New Invite */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="newInviteEmail">Send Patient Invites</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowBulkInvite(!showBulkInvite)}
            >
              <Upload className="h-4 w-4 mr-1" />
              Bulk Invite
            </Button>
          </div>
          
          {!showBulkInvite ? (
            <div className="flex gap-2">
              <Input
                id="newInviteEmail"
                type="email"
                placeholder="patient@example.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendInvite()}
              />
              <Button onClick={handleSendInvite} size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Invite
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <Label htmlFor="bulkEmails">Multiple Email Addresses</Label>
                <textarea
                  id="bulkEmails"
                  className="w-full mt-1 p-3 border rounded-md resize-none"
                  rows={4}
                  placeholder="Enter email addresses separated by commas, semicolons, or new lines:&#10;patient1@example.com&#10;patient2@example.com, patient3@example.com"
                  value={bulkEmails}
                  onChange={(e) => setBulkEmails(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Separate multiple emails with commas, semicolons, or new lines
                </p>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleBulkInvite} size="sm">
                  <Mail className="h-4 w-4 mr-1" />
                  Send All Invites
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setShowBulkInvite(false);
                    setBulkEmails('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Refresh Button */}
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">Recent Invitations</h3>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={loadInvites}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Invite List */}
        {isLoading ? (
          <div className="text-center py-8">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-3 text-primary" />
            <p className="text-sm text-muted-foreground">Loading invitations...</p>
          </div>
        ) : invites.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Mail className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-semibold mb-2 text-foreground">No invitations sent yet</p>
            <p className="text-sm">Send your first patient invitation above to get started.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {invites.map((invite) => (
              <div key={invite.id} className="bg-card border border-border/50 rounded-lg p-4 hover:shadow-md hover:border-border transition-all duration-200">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                      <p className="font-semibold text-base text-foreground truncate">{invite.email}</p>
                      {getStatusBadge(invite.status)}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-muted-foreground">
                      <div>
                        <span className="font-medium">Sent:</span> {formatDate(invite.invited_at)}
                      </div>
                      {invite.accepted_at && (
                        <div>
                          <span className="font-medium">Accepted:</span> {formatDate(invite.accepted_at)}
                        </div>
                      )}
                      <div>
                        <span className="font-medium">Expires:</span> {formatDate(invite.expires_at)}
                      </div>
                    </div>
                  </div>
                  
                  {invite.status === 'sent' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCancelInvite(invite.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

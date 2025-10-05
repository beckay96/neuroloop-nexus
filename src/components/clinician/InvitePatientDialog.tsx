import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useInvitePatient } from '@/hooks/useInvitePatient';
import { UserPlus, Loader2, Send, CheckCircle, Copy, Shield } from 'lucide-react';

export function InvitePatientDialog() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [inviteLink, setInviteLink] = useState('');
  const { toast } = useToast();
  const { invitePatient, loading } = useInvitePatient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: 'Email Required',
        description: 'Please enter a patient email address',
        variant: 'destructive'
      });
      return;
    }

    const result = await invitePatient({ email, message });

    if (result.success && result.link) {
      setInviteLink(result.link);
      toast({
        title: 'Invitation Sent!',
        description: `Patient invite sent to ${email}`,
      });
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

  const handleClose = () => {
    setOpen(false);
    // Reset form after closing
    setTimeout(() => {
      setEmail('');
      setMessage('');
      setInviteLink('');
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Invite Patient
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Invite Patient to NeuroLoop
          </DialogTitle>
          <DialogDescription>
            Send a secure invitation to connect with a patient. They'll be able to accept via email.
          </DialogDescription>
        </DialogHeader>

        {!inviteLink ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Security Badge */}
            <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <p className="text-xs text-blue-900 dark:text-blue-100">
                HIPAA Compliant • No PHI in email
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="patient-email">Patient Email Address *</Label>
              <Input
                id="patient-email"
                type="email"
                placeholder="patient@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                They'll receive a secure invitation link
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="invite-message">Custom Message (Optional)</Label>
              <Textarea
                id="invite-message"
                placeholder="Add a personal message (no PHI)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground">
                ⚠️ Do not include any protected health information
              </p>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
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
            {/* Success State */}
            <div className="flex flex-col items-center justify-center py-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold">Invitation Sent!</h3>
              <p className="text-sm text-muted-foreground text-center">
                An email has been sent to <span className="font-medium">{email}</span>
              </p>
            </div>

            {/* Invite Link */}
            <div className="space-y-2">
              <Label>Invitation Link</Label>
              <div className="flex gap-2">
                <Input
                  value={inviteLink}
                  readOnly
                  className="font-mono text-xs"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleCopyLink}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                You can also share this link directly. It expires in 7 days.
              </p>
            </div>

            <DialogFooter>
              <Button onClick={handleClose} className="w-full">
                Done
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

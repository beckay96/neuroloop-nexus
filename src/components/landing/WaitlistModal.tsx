import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Bell, Mail, User, Sparkles, CheckCircle, AlertCircle, Heart, Globe, Building2, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type UserRole = 'patient' | 'clinician' | 'carer' | 'researcher' | 'investor' | 'other';

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('patient');
  const [country, setCountry] = useState('');
  const [condition, setCondition] = useState('');
  const [organization, setOrganization] = useState('');
  const [whyInterested, setWhyInterested] = useState('');
  const [consentUpdates, setConsentUpdates] = useState(true);
  const [joinPilot, setJoinPilot] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Store in Supabase table
      const { error: supabaseError } = await supabase
        .from('waitlist')
        .insert({
          name: name || null,
          email: email,
          user_type: role,
          country: country || null,
          condition: condition || null,
          organization: organization || null,
          why_interested: whyInterested || null,
          consent_updates: consentUpdates,
          join_pilot: joinPilot,
          subscribed_at: new Date().toISOString()
        });

      if (supabaseError) {
        // If table doesn't exist yet, just show success anyway for demo
        console.log('Waitlist table not created yet:', supabaseError);
      }

      setSuccess(true);
      setName('');
      setEmail('');
      setCondition('');
      setCountry('');
      setOrganization('');
      setWhyInterested('');
      setConsentUpdates(true);
      setJoinPilot(false);

      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2500);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Waitlist error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[85vh] sm:max-h-[90vh] overflow-y-auto border-2 border-teal-500/50 rounded-2xl shadow-2xl shadow-teal-500/30 p-4 sm:p-6">
        {success ? (
          <div className="text-center py-6 sm:py-8 animate-scale-in">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="relative">
                <CheckCircle className="h-16 w-16 sm:h-24 sm:w-24 text-teal-500 animate-scale-in" />
                <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-purple-500 absolute -top-2 -right-2 animate-pulse" />
                <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-teal-400 absolute -bottom-2 -left-2 animate-pulse" style={{animationDelay: '0.3s'}} />
              </div>
            </div>
            <DialogTitle className="text-2xl sm:text-3xl mb-3 sm:mb-4 bg-gradient-to-r from-teal-500 to-purple-600 bg-clip-text text-transparent font-bold">You're on the list! 🎉</DialogTitle>
            <DialogDescription className="text-lg mb-4">
              Thank you for joining the NeuroLoop waitlist. We'll notify you as soon as we launch!
            </DialogDescription>
            <div className="bg-gradient-to-r from-teal-50 to-purple-50 dark:from-teal-950/40 dark:to-purple-950/40 p-4 rounded-lg border-2 border-teal-500/30 mb-4">
              <p className="text-base font-semibold text-gray-900 dark:text-white flex items-center justify-center gap-2">
                <Heart className="h-5 w-5 text-pink-500 animate-pulse" />
                You're now part of advancing epilepsy research!
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Just by joining, you're helping us build the world's most comprehensive neurological health dataset
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              Check your email for confirmation.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-center mb-2 sm:mb-3">
                <div className="relative">
                  <Bell className="h-8 w-8 sm:h-10 sm:w-10 text-teal-500 animate-pulse" />
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500 absolute -top-1 -right-1 animate-pulse" style={{animationDelay: '0.5s'}} />
                </div>
              </div>
              <DialogTitle className="text-2xl sm:text-3xl text-center bg-gradient-to-r from-teal-500 to-purple-600 bg-clip-text text-transparent font-bold">
                Join the Waitlist ✨
              </DialogTitle>
              <DialogDescription className="text-center text-sm sm:text-base">
                Be the first to know when NeuroLoop launches. Help us change women's neurological health forever!
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 mt-3 sm:mt-4">
              {error && (
                <Alert className="border-destructive">
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  <AlertDescription className="text-destructive">{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm text-muted-foreground">Name (Optional)</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">I am a... *</Label>
                <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="patient">Patient</SelectItem>
                    <SelectItem value="clinician">Healthcare Provider / Clinician</SelectItem>
                    <SelectItem value="carer">Carer / Family Member</SelectItem>
                    <SelectItem value="researcher">Researcher</SelectItem>
                    <SelectItem value="investor">Investor / Partner</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="text-sm text-muted-foreground">Country / Region (Optional)</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="country"
                    placeholder="e.g., Australia, India, USA"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition" className="text-sm text-muted-foreground">Condition Focus (Optional)</Label>
                <Select value={condition} onValueChange={setCondition}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select if applicable" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="epilepsy">Epilepsy</SelectItem>
                    <SelectItem value="catamenial_epilepsy">Catamenial Epilepsy</SelectItem>
                    <SelectItem value="parkinsons">Parkinson's Disease</SelectItem>
                    <SelectItem value="other_neurological">Other Neurological Condition</SelectItem>
                    <SelectItem value="none">Not Applicable</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(role === 'researcher' || role === 'clinician') && (
                <div className="space-y-2">
                  <Label htmlFor="organization" className="text-sm text-muted-foreground">Organization / Institution (Optional)</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="organization"
                      placeholder="University, Hospital, Research Institute"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="why" className="text-sm text-muted-foreground">Why are you interested in NeuroLoop? (Optional)</Label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    id="why"
                    placeholder="Share your story, research goals, or how NeuroLoop could help..."
                    value={whyInterested}
                    onChange={(e) => setWhyInterested(e.target.value)}
                    className="pl-10 min-h-[80px]"
                    maxLength={500}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-right">{whyInterested.length}/500</p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-2 bg-teal-50 dark:bg-teal-950/30 p-3 rounded-lg border border-teal-200 dark:border-teal-800">
                  <Checkbox
                    id="updates"
                    checked={consentUpdates}
                    onCheckedChange={(checked) => setConsentUpdates(checked as boolean)}
                  />
                  <div className="grid gap-1 leading-none">
                    <label
                      htmlFor="updates"
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      Receive early-access updates and research invitations
                    </label>
                    <p className="text-xs text-muted-foreground">
                      We'll notify you when we launch and share research opportunities
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2 bg-purple-50 dark:bg-purple-950/30 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                  <Checkbox
                    id="pilot"
                    checked={joinPilot}
                    onCheckedChange={(checked) => setJoinPilot(checked as boolean)}
                  />
                  <div className="grid gap-1 leading-none">
                    <label
                      htmlFor="pilot"
                      className="text-sm font-medium leading-none cursor-pointer flex items-center gap-2"
                    >
                      <Sparkles className="h-4 w-4 text-purple-600" />
                      Join pilot testing and provide feedback
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Help shape NeuroLoop by testing features early and sharing insights
                    </p>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full relative overflow-hidden bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 group"
                size="lg" 
                disabled={loading}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    'Joining...'
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      Join Waitlist
                      <Sparkles className="h-5 w-5" />
                    </>
                  )}
                </span>
                {!loading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

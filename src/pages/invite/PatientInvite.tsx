import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  UserPlus,
  Mail,
  Lock,
  Shield
} from 'lucide-react';

export default function PatientInvite() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [invitationData, setInvitationData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'signup' | 'signin'>('signup');
  const [processing, setProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const token = searchParams.get('token');

  // Load invitation details
  useEffect(() => {
    if (!token) {
      setError('Invalid invitation link');
      setLoading(false);
      return;
    }

    loadInvitation();
  }, [token]);

  const loadInvitation = async () => {
    try {
      const { data, error } = await supabase
        .from('patient_invitations')
        .select('*, clinician:clinician_id(profiles(first_name, last_name))')
        .eq('invitation_token', token)
        .eq('status', 'pending')
        .gt('expires_at', new Date().toISOString())
        .single();

      if (error || !data) {
        setError('Invitation not found or has expired');
        return;
      }

      setInvitationData(data);
      setFormData(prev => ({ ...prev, email: data.patient_email }));
    } catch (err) {
      setError('Failed to load invitation');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive'
      });
      return;
    }

    if (formData.password.length < 8) {
      toast({
        title: 'Error',
        description: 'Password must be at least 8 characters',
        variant: 'destructive'
      });
      return;
    }

    setProcessing(true);

    try {
      // Sign up the user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            user_type: 'patient'
          }
        }
      });

      if (signUpError) throw signUpError;
      if (!authData.user) throw new Error('Failed to create account');

      // Accept the invitation
      const { error: acceptError } = await supabase.rpc('accept_invitation', {
        invitation_token_param: token,
        patient_id_param: authData.user.id
      });

      if (acceptError) throw acceptError;

      toast({
        title: 'Success!',
        description: 'Your account has been created and connected to your clinician',
      });

      // Redirect to patient onboarding
      navigate('/onboarding/patient');
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to accept invitation',
        variant: 'destructive'
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // Sign in the user
      const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (signInError) throw signInError;
      if (!authData.user) throw new Error('Failed to sign in');

      // Accept the invitation
      const { error: acceptError } = await supabase.rpc('accept_invitation', {
        invitation_token_param: token,
        patient_id_param: authData.user.id
      });

      if (acceptError) throw acceptError;

      toast({
        title: 'Success!',
        description: 'You have been connected to your clinician',
      });

      // Redirect to patient dashboard
      navigate('/patient/dashboard');
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to accept invitation',
        variant: 'destructive'
      });
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <Card className="p-8 max-w-md w-full">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading invitation...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <Card className="p-8 max-w-md w-full">
          <div className="flex flex-col items-center space-y-4">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <h2 className="text-2xl font-bold">Invalid Invitation</h2>
            <p className="text-muted-foreground text-center">{error}</p>
            <Button onClick={() => navigate('/')} className="mt-4">
              Go to Home
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <UserPlus className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">You're Invited!</h1>
          <p className="text-muted-foreground">
            {invitationData?.clinician?.profiles?.first_name} {invitationData?.clinician?.profiles?.last_name} has invited you to join NeuroLoop
          </p>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 mb-6 text-sm text-muted-foreground">
          <Shield className="h-4 w-4" />
          <span>HIPAA Compliant • Secure • Encrypted</span>
        </div>

        {/* Toggle Mode */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={mode === 'signup' ? 'default' : 'outline'}
            onClick={() => setMode('signup')}
            className="flex-1"
          >
            Create Account
          </Button>
          <Button
            variant={mode === 'signin' ? 'default' : 'outline'}
            onClick={() => setMode('signin')}
            className="flex-1"
          >
            Sign In
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={mode === 'signup' ? handleSignUp : handleSignIn} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-10"
                autoComplete="email"
                required
                disabled
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder={mode === 'signup' ? 'Create a password (min 8 characters)' : 'Enter your password'}
                className="pl-10"
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                required
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Confirm your password"
                  className="pl-10"
                  autoComplete="new-password"
                  required
                />
              </div>
            </div>
          )}

          {invitationData?.invitation_message && (
            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <span className="font-semibold">Message from your clinician:</span>
                <br />
                {invitationData.invitation_message}
              </p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={processing}
          >
            {processing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                {mode === 'signup' ? 'Create Account & Accept' : 'Sign In & Accept'}
              </>
            )}
          </Button>
        </form>

        {/* Footer */}
        <p className="text-xs text-center text-muted-foreground mt-6">
          By accepting this invitation, you agree to connect with your clinician
          and allow them to access your health data through NeuroLoop.
        </p>
      </Card>
    </div>
  );
}

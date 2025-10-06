import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DateInput } from '@/components/ui/date-input';
import { useToast } from '@/hooks/use-toast';
import { useVerifyCarerDOB } from '@/hooks/useVerifyCarerDOB';
import { 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  Heart,
  Mail,
  Lock,
  Shield,
  Calendar,
  AlertTriangle
} from 'lucide-react';

export default function CarerInvite() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { verifyDOB, loading: verifying } = useVerifyCarerDOB();
  
  const [loading, setLoading] = useState(true);
  const [invitationData, setInvitationData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'auth' | 'verify'>('auth');
  const [mode, setMode] = useState<'signup' | 'signin'>('signup');
  const [processing, setProcessing] = useState(false);
  const [attemptsRemaining, setAttemptsRemaining] = useState(3);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    patientDOB: ''
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
        .from('carer_invitations')
        .select('*, patient:patient_user_id(profiles(first_name, last_name))')
        .eq('invitation_token', token)
        .in('status', ['pending', 'verification_required'])
        .gt('expires_at', new Date().toISOString())
        .single();

      if (error || !data) {
        setError('Invitation not found or has expired');
        return;
      }

      setInvitationData(data);
      setFormData(prev => ({ ...prev, email: data.carer_email }));
      setAttemptsRemaining(data.max_dob_attempts - data.dob_verification_attempts);
      
      // If already signed in and just needs verification
      if (data.status === 'verification_required') {
        setStep('verify');
      }
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
            user_type: 'carer'
          }
        }
      });

      if (signUpError) throw signUpError;
      if (!authData.user) throw new Error('Failed to create account');

      toast({
        title: 'Account Created!',
        description: 'Now verify the patient\'s date of birth to complete the connection',
      });

      // Move to DOB verification step
      setStep('verify');
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to create account',
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

      toast({
        title: 'Signed In!',
        description: 'Now verify the patient\'s date of birth to complete the connection',
      });

      // Move to DOB verification step
      setStep('verify');
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to sign in',
        variant: 'destructive'
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleVerifyDOB = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.patientDOB) {
      toast({
        title: 'Error',
        description: 'Please enter the patient\'s date of birth',
        variant: 'destructive'
      });
      return;
    }

    const result = await verifyDOB({
      token: token!,
      dateOfBirth: formData.patientDOB
    });

    if (result.success) {
      toast({
        title: 'Verification Successful!',
        description: 'You are now connected as a carer',
      });
      
      // Redirect to carer dashboard
      navigate('/carer/dashboard');
    } else {
      if (result.error === 'dob_mismatch') {
        setAttemptsRemaining(result.attempts_remaining || 0);
        toast({
          title: 'Date of Birth Mismatch',
          description: `Incorrect date. ${result.attempts_remaining} attempts remaining.`,
          variant: 'destructive'
        });
      } else if (result.error === 'max_attempts_exceeded') {
        toast({
          title: 'Account Locked',
          description: 'Maximum verification attempts exceeded. Please contact the patient.',
          variant: 'destructive'
        });
        setError('Maximum verification attempts exceeded');
      } else {
        toast({
          title: 'Verification Failed',
          description: result.message || 'Failed to verify date of birth',
          variant: 'destructive'
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">You're Invited to Care!</h1>
          <p className="text-muted-foreground">
            {invitationData?.patient?.profiles?.first_name} {invitationData?.patient?.profiles?.last_name} has invited you to be their carer on NeuroLoop
          </p>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 mb-6 text-sm text-muted-foreground">
          <Shield className="h-4 w-4" />
          <span>HIPAA Compliant • Secure • Encrypted</span>
        </div>

        {step === 'auth' ? (
          <>
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

            {/* Auth Form */}
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
                    Continue to Verification
                  </>
                )}
              </Button>
            </form>
          </>
        ) : (
          <>
            {/* DOB Verification Form */}
            <div className="mb-6">
              <div className="flex items-center gap-2 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800 mb-6">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-semibold text-amber-900 dark:text-amber-100">Security Verification Required</p>
                  <p className="text-amber-700 dark:text-amber-300">
                    Enter the patient's date of birth to verify your identity
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4 text-sm">
                <span className="text-muted-foreground">Attempts remaining:</span>
                <span className={`font-bold ${attemptsRemaining <= 1 ? 'text-destructive' : 'text-primary'}`}>
                  {attemptsRemaining} / 3
                </span>
              </div>
            </div>

            <form onSubmit={handleVerifyDOB} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="patientDOB">Patient's Date of Birth</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
                  <DateInput
                    id="patientDOB"
                    label=""
                    value={formData.patientDOB}
                    onChange={(value) => setFormData({ ...formData, patientDOB: value })}
                    required
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  This verifies you are authorized to care for this patient
                </p>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={verifying || attemptsRemaining === 0}
              >
                {verifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Verify & Complete Setup
                  </>
                )}
              </Button>
            </form>

            {attemptsRemaining === 0 && (
              <div className="mt-4 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                <p className="text-sm text-destructive font-medium">
                  Maximum attempts exceeded. Please contact the patient for a new invitation.
                </p>
              </div>
            )}
          </>
        )}

        {/* Footer */}
        <p className="text-xs text-center text-muted-foreground mt-6">
          By accepting this invitation, you agree to provide care and support
          for the patient through NeuroLoop.
        </p>
      </Card>
    </div>
  );
}

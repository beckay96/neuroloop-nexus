import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { Brain, Mail, Lock, User, AlertCircle, CheckCircle, Stethoscope, Heart, FlaskConical, KeyRound, Sparkles } from 'lucide-react';
import { z } from 'zod';

type UserType = 'patient' | 'clinician' | 'carer' | 'researcher';

const signupSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  userType: z.enum(['patient', 'clinician', 'carer', 'researcher'])
});

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required')
});

const USER_TYPE_OPTIONS: { value: UserType; label: string; icon: any; description: string }[] = [
  { 
    value: 'patient', 
    label: 'Patient', 
    icon: User,
    description: 'Track your neurological health and symptoms'
  },
  { 
    value: 'clinician', 
    label: 'Clinician', 
    icon: Stethoscope,
    description: 'Manage and monitor your patients'
  },
  { 
    value: 'carer', 
    label: 'Carer', 
    icon: Heart,
    description: 'Support and care for your loved ones'
  },
  { 
    value: 'researcher', 
    label: 'Researcher', 
    icon: FlaskConical,
    description: 'Access anonymized data for research'
  }
];

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    userType: 'patient' as UserType
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  // Coming Soon lock state
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [accessPassword, setAccessPassword] = useState('');
  const [accessError, setAccessError] = useState('');
  const UNLOCK_PASSWORD = 'NeuroLoopy96';
  
  // Determine default tab based on route
  const defaultTab = location.pathname === '/signup' ? 'signup' : 'login';
  
  // Check localStorage for unlock status on mount
  useEffect(() => {
    const unlocked = localStorage.getItem('neuroloop_dev_access') === 'true';
    setIsUnlocked(unlocked);
  }, []);

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    };
    checkUser();
  }, [navigate]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Validate input
      const validatedData = signupSchema.parse(signupData);
      
      const redirectUrl = `${window.location.origin}/`;
      
      // Step 1: Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: validatedData.email,
        password: validatedData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            user_type: validatedData.userType
          }
        }
      });

      if (authError) {
        if (authError.message.includes('already registered')) {
          setMessage({ type: 'error', text: 'An account with this email already exists. Please try logging in instead.' });
        } else {
          setMessage({ type: 'error', text: authError.message });
        }
        return;
      }

      if (!authData.user) {
        setMessage({ type: 'error', text: 'Failed to create user account' });
        return;
      }

      // The auth trigger will automatically initialize the user profile
      // No need to manually call initialize_new_user anymore
      
      // Navigate to onboarding based on user type
      setMessage({ type: 'success', text: 'Account created successfully! Redirecting to onboarding...' });
      
      setTimeout(() => {
        navigate(`/onboarding/${validatedData.userType}`);
      }, 1000);
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        setMessage({ type: 'error', text: error.errors[0].message });
      } else {
        console.error('Signup error:', error);
        setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setAccessError('');
    
    if (accessPassword === UNLOCK_PASSWORD) {
      setIsUnlocked(true);
      localStorage.setItem('neuroloop_dev_access', 'true');
      setAccessPassword('');
    } else {
      setAccessError('Incorrect password. Please try again.');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Validate input
      const validatedData = loginSchema.parse(loginData);
      
      const { error } = await supabase.auth.signInWithPassword({
        email: validatedData.email,
        password: validatedData.password
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setMessage({ type: 'error', text: 'Invalid email or password. Please check your credentials and try again.' });
        } else if (error.message.includes('Email not confirmed')) {
          setMessage({ type: 'error', text: 'Please check your email and click the verification link before logging in.' });
        } else {
          setMessage({ type: 'error', text: error.message });
        }
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setMessage({ type: 'error', text: error.errors[0].message });
      } else {
        setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  // Show Coming Soon lock if not unlocked
  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Brain className="h-16 w-16 text-primary animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold text-primary">NeuroLoop</h1>
            <p className="text-muted-foreground mt-2">
              Advanced neurological health tracking and research platform
            </p>
          </div>

          {/* Coming Soon Lock */}
          <Card className="medical-card p-8 border-2 border-primary/20 shadow-xl">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <Sparkles className="h-20 w-20 text-primary" />
                  <KeyRound className="h-10 w-10 text-primary absolute -bottom-2 -right-2 bg-background rounded-full p-1" />
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
                <p className="text-muted-foreground">
                  We're working hard to bring you the most advanced neurological health platform.
                </p>
              </div>

              <div className="bg-primary/5 rounded-lg p-4 space-y-2">
                <p className="text-sm font-semibold text-primary">What to expect:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ Comprehensive symptom tracking</li>
                  <li>✓ AI-powered insights</li>
                  <li>✓ Secure clinician collaboration</li>
                  <li>✓ Research-grade data collection</li>
                </ul>
              </div>

              {/* Developer Access */}
              <form onSubmit={handleUnlock} className="pt-4 border-t border-border">
                <Label htmlFor="access-password" className="text-xs text-muted-foreground block mb-2">
                  Developer Access
                </Label>
                <div className="space-y-3">
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="access-password"
                      type="password"
                      placeholder="Enter development password"
                      value={accessPassword}
                      onChange={(e) => setAccessPassword(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {accessError && (
                    <p className="text-xs text-destructive">{accessError}</p>
                  )}
                  <Button type="submit" variant="outline" size="sm" className="w-full">
                    <KeyRound className="h-4 w-4 mr-2" />
                    Unlock Access
                  </Button>
                </div>
              </form>
            </div>
          </Card>

          <div className="text-center mt-6 text-sm text-muted-foreground">
            <Button
              variant="link"
              onClick={() => navigate('/')}
              className="mt-2"
            >
              ← Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-primary">NeuroLoop</h1>
          <p className="text-muted-foreground mt-2">
            Advanced neurological health tracking and research platform
          </p>
        </div>

        {/* Alert Messages */}
        {message && (
          <Alert className={`mb-6 ${message.type === 'error' ? 'border-destructive' : 'border-success'}`}>
            {message.type === 'error' ? (
              <AlertCircle className="h-4 w-4 text-destructive" />
            ) : (
              <CheckCircle className="h-4 w-4 text-success" />
            )}
            <AlertDescription className={message.type === 'error' ? 'text-destructive' : 'text-success'}>
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        {/* Auth Tabs */}
        <Card className="medical-card p-6">
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold">Welcome Back</h2>
                <p className="text-muted-foreground">Sign in to your NeuroLoop account</p>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                      className="pl-10"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                      className="pl-10"
                      autoComplete="current-password"
                      required
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  variant="hero"
                  disabled={loading}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold">Create Account</h2>
                <p className="text-muted-foreground">Join NeuroLoop to start tracking your health</p>
              </div>
              
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="user-type">I am a...</Label>
                  <Select
                    value={signupData.userType}
                    onValueChange={(value: UserType) => setSignupData(prev => ({ ...prev, userType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {USER_TYPE_OPTIONS.map((option) => {
                        const Icon = option.icon;
                        return (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4" />
                              <div>
                                <div className="font-medium">{option.label}</div>
                                <div className="text-xs text-muted-foreground">{option.description}</div>
                              </div>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signupData.email}
                      onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
                      className="pl-10"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password (min. 6 characters)"
                      value={signupData.password}
                      onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
                      className="pl-10"
                      autoComplete="new-password"
                      required
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  variant="hero"
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
        
        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
          <Button
            variant="link"
            onClick={() => navigate('/')}
            className="mt-2"
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import PatientOnboarding from '@/components/onboarding/PatientOnboarding';

export default function PatientOnboardingPage() {
  const { user, userType, loading, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login');
      } else if (userType && userType !== 'patient') {
        navigate(`/onboarding/${userType}`);
      }
    }
  }, [user, userType, loading, navigate]);

  const handleComplete = async (data: any) => {
    if (!user) return;

    try {
      // Call complete_onboarding RPC function
      // @ts-ignore - Type definitions incomplete
      const { data: result, error } = await supabase.rpc('complete_onboarding', {
        p_user_id: user.id,
        p_user_type: 'patient'
      });

      if (error) {
        console.error('Error completing onboarding:', error);
        toast({
          title: 'Error',
          description: 'Failed to complete onboarding. Please try again.',
          variant: 'destructive'
        });
        return;
      }

      // Refresh profile to update onboarding_completed status
      await refreshProfile();

      toast({
        title: 'Welcome to NeuroLoop!',
        description: 'Your account setup is complete.',
      });

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error in handleComplete:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive'
      });
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || userType !== 'patient') {
    return null;
  }

  return <PatientOnboarding onComplete={handleComplete} onBack={handleBack} />;
}

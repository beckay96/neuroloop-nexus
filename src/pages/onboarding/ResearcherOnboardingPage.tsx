import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ResearcherOnboarding from '@/components/onboarding/ResearcherOnboarding';

export default function ResearcherOnboardingPage() {
  const { user, userType, loading, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login');
      } else if (userType && userType !== 'researcher') {
        navigate(`/onboarding/${userType}`);
      }
    }
  }, [user, userType, loading, navigate]);

  const handleComplete = async (data: any) => {
    if (!user) return;

    try {
      // @ts-ignore - Type definitions incomplete
      const { data: result, error } = await supabase.rpc('complete_onboarding', {
        p_user_id: user.id,
        p_user_type: 'researcher'
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

      await refreshProfile();

      toast({
        title: 'Welcome to NeuroLoop!',
        description: 'Your researcher account is ready.',
      });

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

  if (!user || userType !== 'researcher') {
    return null;
  }

  return <ResearcherOnboarding onComplete={handleComplete} onBack={handleBack} />;
}

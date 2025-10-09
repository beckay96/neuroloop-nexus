import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import PatientDashboard from '@/components/patient/PatientDashboard';
import ClinicianDashboard from '@/components/dashboard/ClinicianDashboard';

/**
 * DashboardRouter - Routes users to appropriate dashboard or onboarding
 * 
 * Logic:
 * 1. If not authenticated → redirect to /login
 * 2. If no profile loaded yet → show loading
 * 3. If onboarding not complete → redirect to /onboarding/{userType}
 * 4. If onboarding complete → show appropriate dashboard
 */
export default function DashboardRouter() {
  const { user, profile, userType, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    // Not authenticated - redirect to login
    if (!user) {
      navigate('/login');
      return;
    }

    // No profile yet - wait for it to load
    if (!profile) {
      return;
    }

    // Onboarding not complete - redirect to onboarding
    if (!profile.onboarding_completed && userType) {
      navigate(`/onboarding/${userType}`);
      return;
    }

    // If we don't have a user type yet, wait
    if (!userType) {
      return;
    }

  }, [user, profile, userType, loading, navigate]);

  // Show loading state
  if (loading || !user || !profile || !userType) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Show appropriate dashboard based on user type
  switch (userType) {
    case 'patient':
      return <PatientDashboard />;
    
    case 'clinician':
      return <ClinicianDashboard />;
    
    case 'carer':
      // TODO: Create CarerDashboard component
      return <PatientDashboard />; // Fallback to patient dashboard for now
    
    case 'researcher':
      // TODO: Create ResearcherDashboard component
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold mb-2">Researcher Dashboard</h2>
            <p className="text-muted-foreground">
              Researcher dashboard coming soon. You'll be able to access anonymized research data here.
            </p>
          </div>
        </div>
      );
    
    case 'admin':
      // TODO: Create AdminDashboard component
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold mb-2">Admin Dashboard</h2>
            <p className="text-muted-foreground">
              Admin dashboard coming soon.
            </p>
          </div>
        </div>
      );
    
    default:
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold mb-2 text-destructive">Unknown User Type</h2>
            <p className="text-muted-foreground">
              Your account has an unrecognized user type: {userType}. Please contact support.
            </p>
          </div>
        </div>
      );
  }
}

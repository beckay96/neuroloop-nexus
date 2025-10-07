import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import LandingPage from "@/components/landing/LandingPage";
import DashboardRouter from "./pages/DashboardRouter";
import Auth from "./pages/Auth";
import PatientView from "./pages/PatientView";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "@/components/ErrorBoundary";
import ProfileSettings from "@/components/settings/ProfileSettings";
import PrivacySettings from "@/pages/settings/PrivacySettings";
import NotificationSettings from "@/pages/settings/NotificationSettings";
import AllNotifications from "@/pages/AllNotifications";
import PatientInvite from "@/pages/invite/PatientInvite";
import CarerInvite from "@/pages/invite/CarerInvite";
import PatientOnboardingPage from "@/pages/onboarding/PatientOnboardingPage";
import ClinicianOnboardingPage from "@/pages/onboarding/ClinicianOnboardingPage";
import CarerOnboardingPage from "@/pages/onboarding/CarerOnboardingPage";
import ResearcherOnboardingPage from "@/pages/onboarding/ResearcherOnboardingPage";
import BrainSeizureAnalysis from "@/pages/BrainSeizureAnalysis";
import PrivacyPolicy from "@/pages/legal/PrivacyPolicy";
import TermsOfService from "@/pages/legal/TermsOfService";
import HIPAACompliance from "@/pages/legal/HIPAACompliance";
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"
import { MedicationReminderService } from "@/services/medicationReminders";

const queryClient = new QueryClient();

const App = () => {
  // Initialize critical services on app start
  useEffect(() => {
    // DON'T initialize medication reminder service here - it will be initialized after login
    // MedicationReminderService should only run for authenticated users
    
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('Service Worker registered:', reg))
        .catch(err => console.error('Service Worker registration failed:', err));
    }
    
    // Request notification permission if not already granted
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="neuroloop-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <SpeedInsights />
        <Analytics />
        <AuthProvider>
          <ErrorBoundary>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/signup" element={<Auth />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardRouter />
                  </ProtectedRoute>
                } />
                <Route path="/patient/:patientId" element={
                  <ProtectedRoute>
                    <PatientView />
                  </ProtectedRoute>
                } />
                <Route path="/settings/profile" element={
                  <ProtectedRoute>
                    <ProfileSettings />
                  </ProtectedRoute>
                } />
                <Route path="/settings/privacy" element={
                  <ProtectedRoute>
                    <PrivacySettings />
                  </ProtectedRoute>
                } />
                <Route path="/settings/notifications" element={
                  <ProtectedRoute>
                    <NotificationSettings />
                  </ProtectedRoute>
                } />
                <Route path="/notifications" element={
                  <ProtectedRoute>
                    <AllNotifications />
                  </ProtectedRoute>
                } />
                {/* Onboarding Pages - Protected */}
                <Route path="/onboarding/patient" element={
                  <ProtectedRoute>
                    <PatientOnboardingPage />
                  </ProtectedRoute>
                } />
                <Route path="/onboarding/clinician" element={
                  <ProtectedRoute>
                    <ClinicianOnboardingPage />
                  </ProtectedRoute>
                } />
                <Route path="/onboarding/carer" element={
                  <ProtectedRoute>
                    <CarerOnboardingPage />
                  </ProtectedRoute>
                } />
                <Route path="/onboarding/researcher" element={
                  <ProtectedRoute>
                    <ResearcherOnboardingPage />
                  </ProtectedRoute>
                } />
                {/* Invite Pages - Public (no auth required) */}
                <Route path="/invite/patient" element={<PatientInvite />} />
                <Route path="/invite/carer" element={<CarerInvite />} />
                {/* Brain Seizure Analysis Tool */}
                <Route path="/brain-analysis" element={
                  <ProtectedRoute>
                    <BrainSeizureAnalysis />
                  </ProtectedRoute>
                } />
                {/* Legal & Compliance Pages - Public */}
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/hipaa" element={<HIPAACompliance />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </ErrorBoundary>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
  );
};

export default App;

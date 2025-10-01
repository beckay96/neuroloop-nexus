import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/components/ThemeProvider";
import {
  Brain,
  Shield,
  Users,
  Activity,
  Calendar,
  MessageSquare,
  Video,
  AlertTriangle,
  Clock,
  FileText,
  Heart,
  Zap,
  CheckCircle,
  ArrowRight,
  Lock,
  Stethoscope,
  Database,
  Moon,
  Sun
} from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [showFullWarning, setShowFullWarning] = useState(false);

  const features = [
    {
      icon: Brain,
      title: "Comprehensive Seizure Tracking",
      description: "ILAE-compliant seizure logging with timer integration, video recording, and consciousness timeline tracking",
      color: "text-purple-600"
    },
    {
      icon: Activity,
      title: "Daily Health Monitoring",
      description: "Track symptoms, medications, temperature, and vital signs with intuitive interfaces",
      color: "text-blue-600"
    },
    {
      icon: Users,
      title: "Care Team Collaboration",
      description: "Connect patients with carers, share health data securely, and coordinate care seamlessly",
      color: "text-green-600"
    },
    {
      icon: MessageSquare,
      title: "HIPAA-Ready Messaging",
      description: "Secure encrypted messaging between patients and care team members",
      color: "text-indigo-600"
    },
    {
      icon: Video,
      title: "Video Symptom Logs",
      description: "Record and upload videos to document seizures, tremors, and other neurological symptoms",
      color: "text-red-600"
    },
    {
      icon: Calendar,
      title: "Appointment Management",
      description: "Schedule and track medical appointments, with reminders and care team coordination",
      color: "text-orange-600"
    },
    {
      icon: FileText,
      title: "Comprehensive Records",
      description: "Maintain detailed health records, medication logs, and historical data for better care",
      color: "text-cyan-600"
    },
    {
      icon: Stethoscope,
      title: "Clinical-Grade Data",
      description: "Research-ready data capture following medical best practices and standards",
      color: "text-pink-600"
    }
  ];

  const benefits = [
    { icon: Clock, text: "Save time with automated tracking" },
    { icon: Shield, text: "Secure, encrypted data storage" },
    { icon: Heart, text: "Better health outcomes" },
    { icon: Zap, text: "Real-time care coordination" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Theme Toggle - Top Right */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="bg-background/80 backdrop-blur-sm border-2"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      {/* Demo Warning Banner - Always Visible */}
      <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <AlertTriangle className="h-6 w-6" />
            <p className="font-bold text-lg">⚠️ DEMO MODE - NOT FOR REAL HEALTH DATA</p>
            <AlertTriangle className="h-6 w-6" />
          </div>
          <p className="text-center text-sm mt-2 font-medium">
            This is a demonstration environment. Data will be deleted regularly. Not compliant for private health information.
          </p>
          <div className="flex justify-center mt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFullWarning(!showFullWarning)}
              className="text-white hover:bg-white/20"
            >
              {showFullWarning ? "Hide Details" : "Read Full Warning"}
            </Button>
          </div>
        </div>
      </div>

      {/* Expanded Warning */}
      {showFullWarning && (
        <div className="bg-orange-100 dark:bg-orange-950 border-b border-orange-300 dark:border-orange-800">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-orange-600 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-orange-900 dark:text-orange-100 mb-2">
                    Important Privacy & Security Notice
                  </h3>
                  <ul className="space-y-2 text-sm text-orange-800 dark:text-orange-200">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span><strong>Demo Environment:</strong> This is a testing platform for exploring features and functionality</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span><strong>No Real Health Data:</strong> Do NOT enter real personal health information, names, or identifying details</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span><strong>Data Deletion:</strong> All data will be regularly deleted to maintain security and prevent misuse</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span><strong>Not HIPAA Compliant:</strong> This demo server is not configured for HIPAA compliance or PHI storage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span><strong>Testing Welcome:</strong> Feel free to explore all features with sample/dummy data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Database className="h-4 w-4 shrink-0 mt-0.5" />
                      <span><strong>Production Version:</strong> A HIPAA-compliant, secure production version will be available soon</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center space-y-6">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            <Brain className="h-5 w-5 mr-2 inline" />
            Neurological Health Management Platform
          </Badge>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            NeuroLoop Nexus
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive health tracking and care coordination for patients with neurological conditions and their care teams
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => navigate("/signup")}
            >
              Try Demo (Test Data Only)
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6"
              onClick={() => navigate("/login")}
            >
              Sign In to Demo
            </Button>
          </div>

          <p className="text-sm text-muted-foreground italic">
            No credit card required • Demo data only • Explore all features
          </p>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-2 hover:border-primary transition-colors">
              <CardContent className="pt-6 text-center">
                <benefit.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                <p className="font-medium text-sm">{benefit.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-muted-foreground">
            Everything you need for comprehensive neurological health management
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-2 hover:border-primary">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Who It's For */}
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Built For Everyone in the Care Journey</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="pt-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-600 flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Patients</h3>
                <p className="text-muted-foreground">
                  Track your health, manage medications, record seizures, and communicate with your care team
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-600 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Carers</h3>
                <p className="text-muted-foreground">
                  Monitor loved ones, log observations, coordinate care, and stay connected with the care team
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-600 flex items-center justify-center">
                  <Stethoscope className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Healthcare Providers</h3>
                <p className="text-muted-foreground">
                  Access comprehensive patient data, track outcomes, and provide better coordinated care
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <Card className="border-4 border-primary bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
          <CardContent className="pt-12 pb-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Try out all features with demo data. No commitment required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => navigate("/signup")}
              >
                Create Demo Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6 italic">
              Remember: Demo mode only • Use sample data • Data deleted regularly
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 dark:border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">NeuroLoop Nexus</span>
              <Badge variant="destructive" className="ml-2">DEMO</Badge>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Demo Environment • Not for Real Health Data • HIPAA-Compliant Version Coming Soon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

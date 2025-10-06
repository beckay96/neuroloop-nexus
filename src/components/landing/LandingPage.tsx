import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/components/ThemeProvider";
import { Brain, Shield, Users, Activity, Calendar, MessageSquare, Video, AlertTriangle, Clock, FileText, Heart, Zap, CheckCircle, ArrowRight, Lock, Stethoscope, Database, Moon, Sun } from "lucide-react";
import PublicBrainAnalysis from "@/components/brain-analysis/PublicBrainAnalysis";

export default function LandingPage() {
  const navigate = useNavigate();
  const {
    theme,
    setTheme
  } = useTheme();
  const [showFullWarning, setShowFullWarning] = useState(false);
  const [showBrainAnalysis, setShowBrainAnalysis] = useState(false);
  const features = [{
    icon: Brain,
    title: "Comprehensive Seizure Tracking",
    description: "ILAE-compliant seizure logging with timer integration, video recording, and consciousness timeline tracking",
    color: "text-purple-500 dark:text-purple-400"
  }, {
    icon: Activity,
    title: "Daily Health Monitoring",
    description: "Track symptoms, medications, temperature, and vital signs with intuitive interfaces",
    color: "text-blue-500 dark:text-blue-400"
  }, {
    icon: Users,
    title: "Care Team Collaboration",
    description: "Connect patients with carers, share health data securely, and coordinate care seamlessly",
    color: "text-green-500 dark:text-green-400"
  }, {
    icon: MessageSquare,
    title: "HIPAA-Ready Messaging",
    description: "Secure encrypted messaging between patients and care team members",
    color: "text-indigo-500 dark:text-indigo-400"
  }, {
    icon: Video,
    title: "Video Symptom Logs",
    description: "Record and upload videos to document seizures, tremors, and other neurological symptoms",
    color: "text-red-500 dark:text-red-400"
  }, {
    icon: Calendar,
    title: "Appointment Management",
    description: "Schedule and track medical appointments, with reminders and care team coordination",
    color: "text-orange-500 dark:text-orange-400"
  }, {
    icon: FileText,
    title: "Comprehensive Records",
    description: "Maintain detailed health records, medication logs, and historical data for better care",
    color: "text-cyan-500 dark:text-cyan-400"
  }, {
    icon: Stethoscope,
    title: "Clinical-Grade Data",
    description: "Research-ready data capture following medical best practices and standards",
    color: "text-pink-500 dark:text-pink-400"
  }];
  const benefits = [{
    icon: Clock,
    text: "Save time with automated tracking",
    color: "text-blue-600 dark:text-blue-400"
  }, {
    icon: Shield,
    text: "Secure, encrypted data storage",
    color: "text-purple-600 dark:text-purple-400"
  }, {
    icon: Heart,
    text: "Better health outcomes",
    color: "text-pink-600 dark:text-pink-400"
  }, {
    icon: Zap,
    text: "Real-time care coordination",
    color: "text-teal-600 dark:text-teal-400"
  }];
  return <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Theme Toggle - Top Right */}
      <div className="fixed top-4 right-4 z-50">
        <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-2 hover:shadow-lg hover:scale-105 transition-all duration-300" aria-label="Toggle theme">
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      {/* Demo Warning Banner - Always Visible */}
      <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <AlertTriangle className="h-6 w-6 animate-bounce" />
            <p className="font-bold text-lg text-center">⚠️ DEMO MODE - NOT FOR REAL HEALTH DATA</p>
            <AlertTriangle className="h-6 w-6 animate-bounce" />
          </div>
          <p className="text-center text-sm mt-2 font-medium">
            This is a demonstration environment. Data will be deleted regularly. Not compliant for private health information.
          </p>
          <div className="flex justify-center mt-2">
            <Button variant="ghost" size="sm" onClick={() => setShowFullWarning(!showFullWarning)} className="text-white hover:bg-white/20">
              {showFullWarning ? "Hide Details" : "Read Full Warning"}
            </Button>
          </div>
        </div>
      </div>

      {/* Expanded Warning */}
      {showFullWarning && <div className="bg-orange-100 dark:bg-orange-950/80 border-b-4 border-orange-400 dark:border-orange-700">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-orange-600 dark:text-orange-400 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-orange-900 dark:text-orange-100 mb-2">
                    Important Privacy & Security Notice
                  </h3>
                  <ul className="space-y-2 text-sm text-orange-900 dark:text-orange-100">
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
        </div>}

      {/* Hero Section - Enhanced */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center space-y-8">
          <Badge variant="secondary" className="text-lg px-6 py-3 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Brain className="h-5 w-5 mr-2 inline" />
            Neurological Health Management Platform
          </Badge>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-fade-in">
            NeuroLoop
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Research-grade health tracking for epilepsy, Parkinson's, and neurological conditions
          </p>

          {/* Value Props - Gradient Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/40 border-2 border-blue-300 dark:border-blue-700 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6 text-center">
                <Shield className="h-12 w-12 mx-auto mb-3 text-blue-600 dark:text-blue-400" />
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">HIPAA-Ready Security</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">End-to-end encryption, secure data storage, and privacy-first design</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/40 border-2 border-purple-300 dark:border-purple-700 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6 text-center">
                <Database className="h-12 w-12 mx-auto mb-3 text-purple-600 dark:text-purple-400" />
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">Clinical-Grade Data</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">ILAE-compliant seizure logging, research-ready tracking, structured records</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/40 dark:to-pink-900/40 border-2 border-pink-300 dark:border-pink-700 hover:shadow-xl hover:shadow-pink-500/20 transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6 text-center">
                <Users className="h-12 w-12 mx-auto mb-3 text-pink-600 dark:text-pink-400" />
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">Care Team Connected</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">Patients, carers, and clinicians collaborate in one secure platform</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300" onClick={() => navigate("/signup")}>
              Create Demo Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 hover:bg-gray-100 dark:hover:bg-gray-800 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300" onClick={() => navigate("/login")}>
              Sign In to Demo
            </Button>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            No credit card required • Demo data only • Explore all features
          </p>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {benefits.map((benefit, index) => <Card key={index} className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 bg-white dark:bg-gray-900">
              <CardContent className="pt-6 text-center">
                <benefit.icon className={`h-8 w-8 mx-auto mb-3 ${benefit.color}`} />
                <p className="font-medium text-sm text-gray-900 dark:text-gray-100">{benefit.text}</p>
              </CardContent>
            </Card>)}
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Everything you need for comprehensive neurological health management
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => <Card key={index} className="hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 border-2 hover:border-primary/50 hover:-translate-y-1 bg-white dark:bg-gray-900 group">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-700 group-hover:border-primary/50 transition-all duration-300 group-hover:shadow-lg">
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>
      </div>

      {/* Research Statistics */}
      <div className="bg-white dark:bg-gray-950 py-16 border-y-4 border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">The Global Impact</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Why better neurological health tracking matters
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Card className="text-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-2 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">3.4B+</p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">People with Neurological Conditions</p>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-2 hover:border-purple-500 dark:hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <p className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">65M+</p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">People with Epilepsy Worldwide</p>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-gradient-to-br from-pink-50 to-red-50 dark:from-pink-950/30 dark:to-red-950/30 border-2 hover:border-pink-500 dark:hover:border-pink-400 hover:shadow-xl hover:shadow-pink-500/20 transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <p className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-2">11M+</p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">People with Parkinson's Disease</p>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 border-2 hover:border-red-500 dark:hover:border-red-400 hover:shadow-xl hover:shadow-red-500/20 transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <p className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">$1.7T</p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Global Annual Spending on Brain Disorders</p>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/30 border-2 hover:border-orange-500 dark:hover:border-orange-400 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <p className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">50%+</p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Epilepsy Cases with No Clear Cause</p>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-gradient-to-br from-yellow-50 to-green-50 dark:from-yellow-950/30 dark:to-green-950/30 border-2 hover:border-yellow-500 dark:hover:border-yellow-400 hover:shadow-xl hover:shadow-yellow-500/20 transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <p className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">30%</p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Don't Respond to First Medication</p>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30 border-2 hover:border-green-500 dark:hover:border-green-400 hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <p className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">1 in 4</p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Parkinson's Patients Misdiagnosed</p>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-950/30 dark:to-blue-950/30 border-2 hover:border-teal-500 dark:hover:border-teal-400 hover:shadow-xl hover:shadow-teal-500/20 transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <p className="text-4xl font-bold text-teal-600 dark:text-teal-400 mb-2">#1</p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Leading Cause of Disability Worldwide</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Card className="bg-red-50 dark:bg-red-950/40 border-2 border-red-300 dark:border-red-800 hover:shadow-xl hover:shadow-red-500/20 transition-all duration-300">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-4 text-red-900 dark:text-red-100">Epilepsy Deaths (Yearly)</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-red-900 dark:text-red-100">
                    <span>Globally:</span>
                    <span className="font-bold">~140,000</span>
                  </div>
                  <div className="flex justify-between text-red-900 dark:text-red-100">
                    <span>India:</span>
                    <span className="font-bold">~31,176</span>
                  </div>
                  <div className="flex justify-between text-red-900 dark:text-red-100">
                    <span>Australia:</span>
                    <span className="font-bold">~285</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-50 dark:bg-purple-950/40 border-2 border-purple-300 dark:border-purple-800 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-4 text-purple-900 dark:text-purple-100">Parkinson's Deaths (Yearly)</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-purple-900 dark:text-purple-100">
                    <span>Globally:</span>
                    <span className="font-bold">~420,000</span>
                  </div>
                  <div className="flex justify-between text-purple-900 dark:text-purple-100">
                    <span>India:</span>
                    <span className="font-bold">~43,400</span>
                  </div>
                  <div className="flex justify-between text-purple-900 dark:text-purple-100">
                    <span>Australia:</span>
                    <span className="font-bold">~1,392</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-100 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 hover:shadow-xl hover:shadow-gray-500/20 transition-all duration-300">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">All Neurological Deaths (Yearly)</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-900 dark:text-gray-100">
                    <span>Globally:</span>
                    <span className="font-bold">~9 Million</span>
                  </div>
                  <div className="flex justify-between text-gray-900 dark:text-gray-100">
                    <span>India:</span>
                    <span className="font-bold">~1 Million</span>
                  </div>
                  <div className="flex justify-between text-gray-900 dark:text-gray-100">
                    <span>Australia:</span>
                    <span className="font-bold">~5,400</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white dark:bg-gray-950 py-16 border-y-4 border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">How NeuroLoop Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Four simple steps to better neurological health management
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-2 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-blue-600 dark:bg-blue-500 text-white font-bold text-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">1</div>
                <h3 className="font-bold text-lg mb-2 text-center text-gray-900 dark:text-gray-100">Sign Up & Profile</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 text-center">Create your secure account, complete onboarding, and set up your health profile with medical history and preferences</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-2 hover:border-purple-500 dark:hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-purple-600 dark:bg-purple-500 text-white font-bold text-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">2</div>
                <h3 className="font-bold text-lg mb-2 text-center text-gray-900 dark:text-gray-100">Track Daily Health</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 text-center">Log seizures with ILAE compliance, record symptoms, track medications, monitor vitals, and upload video evidence</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-pink-50 to-red-50 dark:from-pink-950/30 dark:to-red-950/30 border-2 hover:border-pink-500 dark:hover:border-pink-400 hover:shadow-xl hover:shadow-pink-500/20 transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-pink-600 dark:bg-pink-500 text-white font-bold text-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">3</div>
                <h3 className="font-bold text-lg mb-2 text-center text-gray-900 dark:text-gray-100">Connect Care Team</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 text-center">Invite carers and clinicians, share data securely, communicate via HIPAA-ready messaging, and coordinate appointments</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30 border-2 hover:border-green-500 dark:hover:border-green-400 hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-green-600 dark:bg-green-500 text-white font-bold text-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">4</div>
                <h3 className="font-bold text-lg mb-2 text-center text-gray-900 dark:text-gray-100">Analyze & Improve</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 text-center">View insights, identify patterns, generate reports for appointments, and use brain analysis tools for education</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Technical Details */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-2 border-gray-300 dark:border-gray-700">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Security & Privacy
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-green-600 dark:text-green-400" />
                    <span><strong>End-to-end encryption</strong> for all data in transit and at rest (AES-256)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-green-600 dark:text-green-400" />
                    <span><strong>Row-level security</strong> ensures users only access their own data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-green-600 dark:text-green-400" />
                    <span><strong>Audit logs</strong> track all access and modifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-green-600 dark:text-green-400" />
                    <span><strong>Multi-factor authentication</strong> for enhanced account security</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-2 border-blue-300 dark:border-blue-700">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data Standards
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" />
                    <span><strong>ILAE 2017-2025</strong> seizure classification compliance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" />
                    <span><strong>Structured data capture</strong> for research-ready records</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" />
                    <span><strong>Clinical-grade tracking</strong> following medical best practices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" />
                    <span><strong>Export capabilities</strong> for appointments and research</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Who It's For - Enhanced */}
      <div className="bg-white dark:bg-gray-950 py-16 border-y-4 border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Built For Everyone in the Care Journey</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Patients, carers, and healthcare providers united in one platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 border-2 border-blue-300 dark:border-blue-700 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-2">
              <CardContent className="pt-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/50">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 text-center">Patients</h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" />
                    <span>Track seizures, symptoms, and medications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" />
                    <span>Record videos and document health events</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" />
                    <span>Generate reports for doctor appointments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" />
                    <span>Use brain analysis tools for education</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 border-2 border-purple-300 dark:border-purple-700 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-2">
              <CardContent className="pt-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 text-center">Carers</h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-purple-600 dark:text-purple-400" />
                    <span>Monitor loved ones' health remotely</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-purple-600 dark:text-purple-400" />
                    <span>Log observations and witness accounts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-purple-600 dark:text-purple-400" />
                    <span>Coordinate care with clinicians</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-purple-600 dark:text-purple-400" />
                    <span>Receive alerts and stay connected</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/30 dark:to-pink-900/30 border-2 border-pink-300 dark:border-pink-700 hover:shadow-xl hover:shadow-pink-500/20 transition-all duration-300 hover:-translate-y-2">
              <CardContent className="pt-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-600 to-pink-500 flex items-center justify-center shadow-lg shadow-pink-500/50">
                  <Stethoscope className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 text-center">Healthcare Providers</h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-pink-600 dark:text-pink-400" />
                    <span>Access comprehensive patient histories</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-pink-600 dark:text-pink-400" />
                    <span>Review clinical-grade structured data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-pink-600 dark:text-pink-400" />
                    <span>Track outcomes and treatment efficacy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-pink-600 dark:text-pink-400" />
                    <span>Communicate securely with patients</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <Card className="border-4 border-primary bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 shadow-2xl hover:shadow-3xl transition-shadow duration-300">
          <CardContent className="pt-12 pb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Ready to Explore?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Try out all features with demo data. No commitment required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300" onClick={() => navigate("/signup")}>
                Create Demo Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2 hover:bg-gray-100 dark:hover:bg-gray-800 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300" onClick={() => navigate("/login")}>
                Sign In
              </Button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-6 italic">
              Remember: Demo mode only • Use sample data • Data deleted regularly
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Floating Brain Analysis Button - STUNNING! */}
      <div 
        className="fixed bottom-8 right-8 z-[9999] bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 h-20 w-20 rounded-full shadow-2xl cursor-pointer hover:scale-110 transition-all duration-300 flex items-center justify-center"
        onClick={() => {
          console.log("Button clicked!");
          setShowBrainAnalysis(true);
        }}
        style={{ 
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 99999
        }}
      >
        <Brain className="h-10 w-10 text-white" />
        <div className="absolute -top-2 -right-2 h-7 w-7 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white animate-bounce shadow-lg">
          NEW
        </div>
      </div>

      {/* Brain Analysis Modal */}
      {showBrainAnalysis && (
        <PublicBrainAnalysis 
          isOpen={showBrainAnalysis}
          onClose={() => setShowBrainAnalysis(false)}
        />
      )}

      {/* Footer */}
      <div className="border-t-4 border-gray-200 dark:border-gray-800 mt-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg text-gray-900 dark:text-white">NeuroLoop</span>
                <Badge variant="destructive">DEMO</Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Research-grade neurological health tracking for patients and care teams
              </p>
            </div>

            {/* Compliance */}
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Legal & Compliance</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="/security" className="hover:text-primary transition-colors">Security Practices</a></li>
                <li><a href="/hipaa" className="hover:text-primary transition-colors">HIPAA Compliance</a></li>
              </ul>
            </div>

            {/* Data Rights */}
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Your Rights</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="/data-rights" className="hover:text-primary transition-colors">Data Access & Rights</a></li>
                <li><a href="/cookie-policy" className="hover:text-primary transition-colors">Cookie Policy</a></li>
                <li><a href="/accessibility" className="hover:text-primary transition-colors">Accessibility</a></li>
                <li><a href="/contact" className="hover:text-primary transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="/help" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="/safety" className="hover:text-primary transition-colors">Safety Guidelines</a></li>
                <li><a href="/research" className="hover:text-primary transition-colors">Research & Citations</a></li>
                <li><a href="/clinical-trials" className="hover:text-primary transition-colors">Clinical Trial Info</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                © 2025 NeuroLoop. Demo Environment • Not for Real Health Data
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                <span>ILAE-Compliant</span>
                <span>•</span>
                <span>Research-Grade</span>
                <span>•</span>
                <span>HIPAA-Ready Architecture</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}
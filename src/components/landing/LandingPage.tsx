import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/components/ThemeProvider";
import { Brain, Shield, Users, Activity, Calendar, MessageSquare, Video, AlertTriangle, Clock, FileText, Heart, Zap, CheckCircle, ArrowRight, Lock, Stethoscope, Database, Moon, Sun, Bell, TrendingDown, AlertOctagon, AlertCircle, Sparkles } from "lucide-react";
import PublicBrainAnalysis from "@/components/brain-analysis/PublicBrainAnalysis";
import WaitlistModal from "./WaitlistModal";

export default function LandingPage() {
  const navigate = useNavigate();
  const {
    theme,
    setTheme
  } = useTheme();
  const [showFullWarning, setShowFullWarning] = useState(false);
  const [showBrainAnalysis, setShowBrainAnalysis] = useState(false);
  const [showWaitlist, setShowWaitlist] = useState(false);

  // Auto-open waitlist after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWaitlist(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  const features = [{
    icon: Brain,
    title: "Comprehensive Seizure Tracking",
    description: "ILAE-compliant seizure logging with timer integration, video recording, and consciousness timeline tracking",
    color: "text-purple-500 dark:text-purple-400"
  }, {
    icon: Activity,
    title: "Parkinson's Movement Tracking",
    description: "Track tremors, rigidity, bradykinesia, gait patterns, and dyskinesia with specialized tools for motor symptom monitoring",
    color: "text-blue-500 dark:text-blue-400"
  }, {
    icon: Activity,
    title: "Daily Health Monitoring",
    description: "Track symptoms, medications, temperature, and vital signs with intuitive interfaces",
    color: "text-teal-500 dark:text-teal-400"
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
  
  return <div className="min-h-screen bg-white dark:bg-black">
      {/* Top Right Buttons */}
      <div className="fixed top-4 right-4 z-50 flex gap-2 animate-slide-in-right">
        <Button 
          variant="default" 
          size="sm" 
          onClick={() => setShowWaitlist(true)} 
          className="relative overflow-hidden bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 text-white shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-500 group"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Join Waitlist
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="bg-white/90 dark:bg-black/90 backdrop-blur-lg border-2 border-teal-500/30 hover:border-teal-500 hover:shadow-lg hover:shadow-teal-500/30 hover:scale-105 transition-all duration-300" aria-label="Toggle theme">
          {theme === "dark" ? <Sun className="h-5 w-5 text-teal-500" /> : <Moon className="h-5 w-5 text-purple-600" />}
        </Button>
      </div>


      {/* Hero Section - Enhanced */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center space-y-8 animate-fade-in">
          <Badge className="text-lg px-6 py-3 shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-500 bg-gradient-to-r from-teal-500 to-purple-600 text-white border-0 animate-scale-in">
            <Brain className="h-5 w-5 mr-2 inline" />
            Neurological Health Management Platform
          </Badge>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-teal-500 via-purple-600 to-purple-800 bg-clip-text text-transparent animate-slide-up">
            NeuroLoop
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{animationDelay: '0.1s'}}>
            Research-grade health tracking for epilepsy, Parkinson's, and neurological conditions
          </p>

          {/* Value Props - Gradient Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
            <Card className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-950/40 dark:to-teal-900/40 border-2 border-teal-400 dark:border-teal-600 hover:shadow-2xl hover:shadow-teal-500/30 transition-all duration-500 hover:-translate-y-2 animate-slide-up" style={{animationDelay: '0.2s'}}>
              <CardContent className="pt-6 text-center">
                <Shield className="h-12 w-12 mx-auto mb-3 text-teal-600 dark:text-teal-400" />
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">HIPAA-Ready Security</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">End-to-end encryption, secure data storage, and privacy-first design</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/40 border-2 border-purple-400 dark:border-purple-600 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 hover:-translate-y-2 animate-glow-pulse animate-slide-up" style={{animationDelay: '0.3s'}}>
              <CardContent className="pt-6 text-center">
                <Database className="h-12 w-12 mx-auto mb-3 text-purple-600 dark:text-purple-400" />
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Clinical-Grade Data</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">ILAE-compliant seizure logging, research-ready tracking, structured records</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-teal-50 to-purple-100 dark:from-teal-950/40 dark:to-purple-950/40 border-2 border-purple-400 dark:border-purple-600 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 hover:-translate-y-2 animate-slide-up" style={{animationDelay: '0.4s'}}>
              <CardContent className="pt-6 text-center">
                <Users className="h-12 w-12 mx-auto mb-3 text-purple-600 dark:text-purple-400" />
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Care Team Connected</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">Patients, carers, and clinicians collaborate in one secure platform</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center items-center pt-6 animate-slide-up" style={{animationDelay: '0.5s'}}>
            <Button 
              size="lg" 
              className="relative overflow-hidden text-lg px-10 py-7 bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 shadow-xl shadow-teal-500/30 hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-110 transition-all duration-500 group" 
              onClick={() => setShowWaitlist(true)}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                <Bell className="h-5 w-5" />
                Join Waitlist - Get Notified
                <Sparkles className="h-5 w-5" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Button>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            Join thousands advancing neurological health research • Coming very soon!
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

      {/* CRITICAL: Women's Health Research Gap */}
      <div className="bg-gradient-to-br from-pink-100 via-red-50 to-orange-100 dark:from-pink-950/40 dark:via-red-950/40 dark:to-orange-950/40 py-16 border-y-4 border-pink-300 dark:border-pink-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="text-lg px-6 py-3 mb-4 bg-gradient-to-r from-red-600 to-pink-600 text-white border-0">
              <AlertOctagon className="h-5 w-5 mr-2 inline" />
              CRITICAL RESEARCH GAP
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Women's Neurological Health is Being Ignored
            </h2>
            <p className="text-2xl font-semibold text-pink-800 dark:text-pink-200 max-w-4xl mx-auto leading-relaxed">
              40% of women with epilepsy have catamenial epilepsy, yet it represents only 0.19% of all epilepsy research. 
              <span className="block mt-4 text-red-700 dark:text-red-300">No standardized tracking exists. No specific treatments available.</span>
            </p>
          </div>

          {/* Research Gaps Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="bg-red-50 dark:bg-red-950/60 border-4 border-red-400 dark:border-red-700 shadow-xl">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3 mb-4">
                  <TrendingDown className="h-8 w-8 text-red-600 dark:text-red-400 shrink-0" />
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-red-900 dark:text-red-100">Appalling Research Scarcity</h3>
                    <p className="text-sm text-red-900 dark:text-red-100 italic mb-3">
                      "Only 0.19% [440/229,521] of all publications on epilepsy" focus on catamenial epilepsy despite affecting 40%+ of women
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-red-900 dark:text-red-100">
                  <p className="flex items-start gap-2">
                    <AlertOctagon className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>"Publications remain scarce, particularly on practice guidelines, risk assessment, and medication-related research"</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <AlertOctagon className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>"Practice guidelines from countries worldwide... are only found from Hong Kong"</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <AlertOctagon className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>"Publications on the Asian continent remain extremely scarce... underlines the need for increased engagement"</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 dark:bg-orange-950/60 border-4 border-orange-400 dark:border-orange-700 shadow-xl">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3 mb-4">
                  <AlertTriangle className="h-8 w-8 text-orange-600 dark:text-orange-400 shrink-0" />
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-orange-900 dark:text-orange-100">Unknown Causes & No Treatments</h3>
                    <p className="text-sm text-orange-900 dark:text-orange-100 italic mb-3">
                      "No specific treatment is available yet" for catamenial epilepsy
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-orange-900 dark:text-orange-100">
                  <p className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>"The etiology and risk factors of catamenial epilepsy have not been entirely understood"</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>"Research about the efficacy of hormonal and non-hormonal treatments... is scarce"</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>"The literature lacks high-quality randomized controlled studies"</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 dark:bg-yellow-950/60 border-4 border-yellow-400 dark:border-yellow-700 shadow-xl">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3 mb-4">
                  <AlertCircle className="h-8 w-8 text-yellow-600 dark:text-yellow-400 shrink-0" />
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-yellow-900 dark:text-yellow-100">Existing Apps Fail Women</h3>
                    <p className="text-sm text-yellow-900 dark:text-yellow-100 italic mb-3">
                      Current epilepsy apps don't track menstrual cycles or hormonal factors
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-yellow-900 dark:text-yellow-100">
                  <p className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>"Few apps meet prespecified criteria for quality, content, and functionality for epilepsy self-management"</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>"Some of these programs are not based on scientific evidence and the confidentiality... is not guaranteed"</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>"Most programs allow users to manually enter prescription drugs" but fail comprehensive tracking</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-pink-50 dark:bg-pink-950/60 border-4 border-pink-400 dark:border-pink-700 shadow-xl">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3 mb-4">
                  <Heart className="h-8 w-8 text-pink-600 dark:text-pink-400 shrink-0" />
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-pink-900 dark:text-pink-100">The NeuroLoop Solution</h3>
                    <p className="text-sm text-pink-900 dark:text-pink-100 italic mb-3">
                      The world's first comprehensive catamenial epilepsy tracking platform
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-pink-900 dark:text-pink-100">
                  <p className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-pink-600 dark:text-pink-400" />
                    <span><strong>Integrated menstrual cycle tracking</strong> with seizure pattern correlation</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-pink-600 dark:text-pink-400" />
                    <span><strong>Hormonal medication tracking</strong> and comprehensive symptom logs</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-pink-600 dark:text-pink-400" />
                    <span><strong>Research-grade data</strong> to fill critical knowledge gaps</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-pink-600 dark:text-pink-400" />
                    <span><strong>Building the dataset</strong> that will change women's neurological health forever</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action for Research */}
          <Card className="bg-gradient-to-br from-pink-600 to-purple-700 text-white border-0 shadow-2xl">
            <CardContent className="pt-8 pb-8 text-center">
              <h3 className="text-3xl font-bold mb-4">Be Part of the Solution</h3>
              <p className="text-xl mb-6 max-w-3xl mx-auto">
                "These underexplored areas provide opportunities for researchers to contribute to the growing body of knowledge 
                in catamenial epilepsy and address critical gaps in understanding and treatment."
              </p>
              <div className="flex justify-center items-center">
                <Button 
                  size="lg" 
                  className="relative overflow-hidden text-lg px-10 py-7 bg-white text-pink-700 hover:bg-gray-50 shadow-xl hover:shadow-2xl hover:shadow-pink-500/50 hover:scale-110 transition-all duration-500 group"
                  onClick={() => setShowWaitlist(true)}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    <Bell className="h-5 w-5" />
                    Join Waitlist - Change Women's Health
                    <Sparkles className="h-5 w-5 text-purple-600" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-100/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Button>
              </div>
            </CardContent>
          </Card>
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
                <p className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">65M</p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">People with Epilepsy Worldwide</p>
                <a href="https://www.frontiersin.org/journals/neurology/articles/10.3389/fneur.2025.1526984/full" target="_blank" rel="noopener noreferrer" className="text-xs text-purple-600 dark:text-purple-400 hover:underline mt-1 block">Source: Frontiers in Neurology 2025</a>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-gradient-to-br from-pink-50 to-red-50 dark:from-pink-950/30 dark:to-red-950/30 border-2 hover:border-pink-500 dark:hover:border-pink-400 hover:shadow-xl hover:shadow-pink-500/20 transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6">
                <p className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-2">12M</p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">People with Parkinson's Disease (2021)</p>
                <a href="https://www.bmj.com/content/388/bmj-2024-080952" target="_blank" rel="noopener noreferrer" className="text-xs text-pink-600 dark:text-pink-400 hover:underline mt-1 block">Source: BMJ 2025</a>
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

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/60 dark:to-orange-950/60 border-4 border-red-400 dark:border-red-600 shadow-2xl shadow-red-500/40 hover:shadow-red-500/60 transition-all duration-500 hover:scale-105">
              <CardContent className="pt-8 pb-8">
                <div className="text-center mb-6">
                  <AlertTriangle className="h-12 w-12 mx-auto mb-3 text-red-600 dark:text-red-400" />
                  <h3 className="font-bold text-2xl mb-2 text-red-900 dark:text-red-100">Epilepsy Deaths (Yearly)</h3>
                  <p className="text-sm text-red-800 dark:text-red-200">Age-standardized death rate: 1.74 per 100,000</p>
                </div>
                <div className="space-y-3 text-base">
                  <div className="flex justify-between items-center text-red-900 dark:text-red-100 bg-red-100 dark:bg-red-900/30 p-3 rounded-lg">
                    <span className="font-semibold">Global Deaths (2021):</span>
                    <span className="font-bold text-2xl">~140,000</span>
                  </div>
                  <div className="flex justify-between text-red-900 dark:text-red-100">
                    <span>U.S. (2011-2021):</span>
                    <span className="font-bold">43,231 deaths</span>
                  </div>
                  <div className="text-xs text-red-800 dark:text-red-200 mt-4 pt-3 border-t border-red-300 dark:border-red-700">
                    <p className="mb-2">U.S. mortality rate increased <strong>84%</strong> for underlying cause and <strong>144%</strong> for contributing cause (2011-2021)</p>
                    <a href="https://www.frontiersin.org/journals/neurology/articles/10.3389/fneur.2025.1526984/full" target="_blank" rel="noopener noreferrer" className="text-red-600 dark:text-red-400 hover:underline">Source: Frontiers in Neurology 2025</a>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/60 dark:to-pink-950/60 border-4 border-purple-400 dark:border-purple-600 shadow-2xl shadow-purple-500/40 hover:shadow-purple-500/60 transition-all duration-500 hover:scale-105">
              <CardContent className="pt-8 pb-8">
                <div className="text-center mb-6">
                  <AlertTriangle className="h-12 w-12 mx-auto mb-3 text-purple-600 dark:text-purple-400" />
                  <h3 className="font-bold text-2xl mb-2 text-purple-900 dark:text-purple-100">Parkinson's Deaths</h3>
                  <p className="text-sm text-purple-800 dark:text-purple-200">Fastest-growing neurological disorder globally</p>
                </div>
                <div className="space-y-3 text-base">
                  <div className="flex justify-between items-center text-purple-900 dark:text-purple-100 bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                    <span className="font-semibold">Global (1994-2019):</span>
                    <span className="font-bold text-2xl">1M+ deaths</span>
                  </div>
                  <div className="flex justify-between text-purple-900 dark:text-purple-100">
                    <span>U.S. (1999-2022):</span>
                    <span className="font-bold">947,272 deaths</span>
                  </div>
                  <div className="flex justify-between text-purple-900 dark:text-purple-100">
                    <span>Mortality Rate (2019):</span>
                    <span className="font-bold">5.67 per 100,000</span>
                  </div>
                  <div className="text-xs text-purple-800 dark:text-purple-200 mt-4 pt-3 border-t border-purple-300 dark:border-purple-700">
                    <p className="mb-2">Annual mortality rate increased from <strong>1.76</strong> (1994) to <strong>5.67 per 100,000</strong> (2019). Projected to reach <strong>25.2M cases by 2050</strong> (+112%)</p>
                    <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11755521/" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">Source: NIH/PMC 2025</a>
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
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Ready to Join?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Be part of the revolution in neurological health tracking. No commitment required.
            </p>
            <div className="flex justify-center">
              <Button 
                size="lg" 
                className="relative overflow-hidden text-lg px-10 py-7 bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-600 hover:to-purple-700 shadow-xl shadow-teal-500/30 hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-110 transition-all duration-500 group" 
                onClick={() => setShowWaitlist(true)}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  <Bell className="h-5 w-5" />
                  Join Waitlist Now
                  <Sparkles className="h-5 w-5" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-6 italic">
              Be notified when we officially launch • Coming very soon!
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

      {/* Waitlist Modal */}
      <WaitlistModal 
        isOpen={showWaitlist}
        onClose={() => setShowWaitlist(false)}
      />

      {/* Footer */}
      <div className="border-t-4 border-gray-200 dark:border-gray-800 mt-16 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg text-gray-900 dark:text-white">NeuroLoop</span>
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
                <li>
                  <button onClick={() => setShowWaitlist(true)} className="hover:text-primary transition-colors font-semibold flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    Join Waitlist
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                © 2025 Elevita AI. NeuroLoop™ • Advancing Neurological Health Research
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
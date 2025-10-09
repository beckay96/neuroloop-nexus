import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Brain,
  Activity,
  Zap,
  Moon,
  Thermometer,
  Target,
  ChevronRight,
  ChevronDown,
  Eye
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock pattern data
const epilepsyPatterns = [
  {
    id: '1',
    patientId: 'P001',
    patientName: 'Sarah Johnson',
    patternType: 'Catamenial Pattern',
    confidence: 92,
    description: 'Seizures consistently occur 2-3 days before menstruation onset',
    trigger: 'Hormonal fluctuations',
    frequency: '3x higher during pre-menstrual phase',
    recommendation: 'Consider hormonal therapy or dose adjustment during luteal phase',
    severity: 'high',
    dataPoints: 45,
    timeframe: '6 months',
    icon: Calendar,
    details: {
      correlations: ['Menstrual cycle', 'Hormone levels', 'Sleep quality'],
      seizureTypes: ['Focal aware', 'Focal impaired awareness'],
      timing: 'Days -3 to -1 relative to menstruation',
      medications: 'Current: Levetiracetam 1000mg BID'
    }
  },
  {
    id: '2',
    patientId: 'P004',
    patientName: 'Lisa Parker',
    patternType: 'Sleep Deprivation Trigger',
    confidence: 87,
    description: 'Myoclonic jerks occur within 24 hours of getting <5 hours sleep',
    trigger: 'Sleep deprivation (<5 hours)',
    frequency: '85% correlation with insufficient sleep',
    recommendation: 'Sleep hygiene education and possible sleep aid consideration',
    severity: 'moderate',
    dataPoints: 32,
    timeframe: '4 months',
    icon: Moon,
    details: {
      correlations: ['Sleep duration', 'Sleep quality', 'Stress levels'],
      seizureTypes: ['Myoclonic jerks', 'Generalized tonic-clonic'],
      timing: '8-24 hours post sleep deprivation',
      medications: 'Current: Lamotrigine 200mg BID'
    }
  },
  {
    id: '3',
    patientId: 'P001',
    patientName: 'Sarah Johnson',
    patternType: 'Stress-Temperature Correlation',
    confidence: 79,
    description: 'Seizure likelihood increases 3x when stress levels are high AND body temperature >37.2°C',
    trigger: 'Combined stress + elevated temperature',
    frequency: 'Occurs in 78% of high-stress + fever episodes',
    recommendation: 'Fever management protocol and stress reduction techniques',
    severity: 'moderate',
    dataPoints: 28,
    timeframe: '8 months',
    icon: Thermometer,
    details: {
      correlations: ['Stress levels', 'Body temperature', 'Medication timing'],
      seizureTypes: ['Tonic-clonic', 'Focal with secondary generalization'],
      timing: 'Within 4-8 hours of combined triggers',
      medications: 'Current: Levetiracetam 1000mg BID'
    }
  }
];

const parkinsonPatterns = [
  {
    id: '4',
    patientId: 'P002',
    patientName: 'Michael Chen',
    patternType: 'Medication Timing Pattern',
    confidence: 94,
    description: 'Tremor intensity increases 40 minutes before scheduled levodopa doses',
    trigger: 'End-of-dose wearing off',
    frequency: 'Occurs before 90% of scheduled doses',
    recommendation: 'Consider dose frequency adjustment or extended-release formulation',
    severity: 'high',
    dataPoints: 156,
    timeframe: '3 months',
    icon: Target,
    details: {
      correlations: ['Medication timing', 'Tremor intensity', 'Motor function'],
      symptoms: ['Tremor', 'Bradykinesia', 'Rigidity'],
      timing: '30-50 minutes pre-dose',
      medications: 'Current: Levodopa/Carbidopa 25/100mg TID'
    }
  },
  {
    id: '5',
    patientId: 'P006',
    patientName: 'Robert Kim',
    patternType: 'Weather-Mobility Correlation',
    confidence: 81,
    description: 'Fall risk increases 2.5x on days with barometric pressure drop >10 hPa',
    trigger: 'Barometric pressure changes',
    frequency: 'Affects mobility in 67% of pressure drop days',
    recommendation: 'Weather-based mobility precautions and physiotherapy adjustments',
    severity: 'high',
    dataPoints: 89,
    timeframe: '12 months',
    icon: Activity,
    details: {
      correlations: ['Barometric pressure', 'Mobility scores', 'Fall incidents'],
      symptoms: ['Balance issues', 'Gait freezing', 'Postural instability'],
      timing: '12-24 hours after pressure drop',
      medications: 'Current: Levodopa/Carbidopa 25/250mg QID'
    }
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high': return 'destructive';
    case 'moderate': return 'secondary';
    case 'low': return 'outline';
    default: return 'outline';
  }
};

const getConfidenceColor = (confidence: number) => {
  if (confidence >= 85) return 'text-status-stable';
  if (confidence >= 70) return 'text-warning';
  return 'text-status-critical';
};

export default function PatternsIdentified() {
  const { toast } = useToast();
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("epilepsy");

  const currentPatterns = activeTab === "epilepsy" ? epilepsyPatterns : parkinsonPatterns;

  const handleViewAllInsights = () => {
    toast({
      title: "All Insights",
      description: "Opening comprehensive pattern analysis dashboard",
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            Patterns Identified
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm mt-1">
            AI-powered analysis of patient data patterns
          </p>
        </div>
        <Button variant="outline" size="sm" className="w-fit" onClick={handleViewAllInsights}>
          <Eye className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">View All Insights</span>
          <span className="sm:hidden">All</span>
        </Button>
      </div>

      {/* Condition Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="epilepsy" className="text-xs sm:text-sm">Epilepsy</TabsTrigger>
          <TabsTrigger value="parkinsons" className="text-xs sm:text-sm">Parkinson's</TabsTrigger>
        </TabsList>

        <TabsContent value="epilepsy" className="space-y-3 sm:space-y-4">
          <div className="grid gap-3 sm:gap-4">
            {epilepsyPatterns.map((pattern) => (
              <Card key={pattern.id} className="medical-card">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2 sm:gap-3 min-w-0 flex-1">
                      <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg flex-shrink-0">
                        <pattern.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-sm sm:text-lg leading-tight">{pattern.patternType}</CardTitle>
                        <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1">
                          <span className="text-xs sm:text-sm truncate">{pattern.patientName}</span>
                          <Badge variant="outline" className="text-xs w-fit">
                            {pattern.patientId}
                          </Badge>
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-2 flex-shrink-0">
                      <Badge variant={getSeverityColor(pattern.severity)} className="text-xs">
                        {pattern.severity.toUpperCase()}
                      </Badge>
                      <div className="text-right text-xs sm:text-sm">
                        <p className={`font-semibold ${getConfidenceColor(pattern.confidence)}`}>
                          {pattern.confidence}%
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {pattern.dataPoints} pts
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3 sm:space-y-4">
                  {/* Basic Info - Always Visible */}
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm text-muted-foreground leading-tight">{pattern.description}</p>
                  </div>
                  
                  {/* Collapsible Details */}
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-full justify-between p-2 h-auto">
                        <span className="text-xs sm:text-sm font-medium">View Details</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-3 pt-2">
                      {/* Trigger Info */}
                      <div className="bg-accent/30 p-2 sm:p-3 rounded-lg">
                        <h4 className="font-semibold text-xs sm:text-sm mb-1">Key Trigger</h4>
                        <p className="text-xs sm:text-sm">{pattern.trigger}</p>
                        <p className="text-xs text-muted-foreground mt-1">{pattern.frequency}</p>
                      </div>
                      
                      {/* Clinical Recommendation */}
                      <div className="bg-primary/5 p-2 sm:p-3 rounded-lg">
                        <h4 className="font-semibold text-xs sm:text-sm mb-1 flex items-center gap-2">
                          <Target className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                          Clinical Recommendation
                        </h4>
                        <p className="text-xs sm:text-sm">{pattern.recommendation}</p>
                      </div>

                      {/* Detailed Analysis */}
                      <div className="grid grid-cols-1 gap-3 text-xs sm:text-sm">
                        <div className="space-y-2">
                          <h5 className="font-semibold">Correlations Found</h5>
                          <ul className="text-muted-foreground space-y-1 ml-2">
                            {pattern.details.correlations.map((correlation, idx) => (
                              <li key={idx} className="flex items-start gap-1">
                                <span className="text-primary mt-1">•</span>
                                <span>{correlation}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <h5 className="font-semibold mb-1">Seizure Types</h5>
                            <ul className="text-muted-foreground space-y-1">
                              {pattern.details.seizureTypes.map((type, idx) => (
                                <li key={idx}>• {type}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold mb-1">Timing</h5>
                            <p className="text-muted-foreground">{pattern.details.timing}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold mb-1">Current Treatment</h5>
                          <p className="text-muted-foreground">{pattern.details.medications}</p>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  <div className="flex justify-between items-center pt-2 border-t text-xs text-muted-foreground">
                    <span>Analysis: {pattern.timeframe}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="parkinsons" className="space-y-3 sm:space-y-4">
          <div className="grid gap-3 sm:gap-4">
            {parkinsonPatterns.map((pattern) => (
              <Card key={pattern.id} className="medical-card">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2 sm:gap-3 min-w-0 flex-1">
                      <div className="p-1.5 sm:p-2 bg-secondary/10 rounded-lg flex-shrink-0">
                        <pattern.icon className="h-4 w-4 sm:h-5 sm:w-5 text-secondary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-sm sm:text-lg leading-tight">{pattern.patternType}</CardTitle>
                        <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1">
                          <span className="text-xs sm:text-sm truncate">{pattern.patientName}</span>
                          <Badge variant="outline" className="text-xs w-fit">
                            {pattern.patientId}
                          </Badge>
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-2 flex-shrink-0">
                      <Badge variant={getSeverityColor(pattern.severity)} className="text-xs">
                        {pattern.severity.toUpperCase()}
                      </Badge>
                      <div className="text-right text-xs sm:text-sm">
                        <p className={`font-semibold ${getConfidenceColor(pattern.confidence)}`}>
                          {pattern.confidence}%
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {pattern.dataPoints} pts
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3 sm:space-y-4">
                  {/* Basic Info - Always Visible */}
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm text-muted-foreground leading-tight">{pattern.description}</p>
                  </div>
                  
                  {/* Collapsible Details */}
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-full justify-between p-2 h-auto">
                        <span className="text-xs sm:text-sm font-medium">View Details</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-3 pt-2">
                      {/* Trigger Info */}
                      <div className="bg-accent/30 p-2 sm:p-3 rounded-lg">
                        <h4 className="font-semibold text-xs sm:text-sm mb-1">Key Trigger</h4>
                        <p className="text-xs sm:text-sm">{pattern.trigger}</p>
                        <p className="text-xs text-muted-foreground mt-1">{pattern.frequency}</p>
                      </div>
                      
                      {/* Clinical Recommendation */}
                      <div className="bg-secondary/10 p-2 sm:p-3 rounded-lg">
                        <h4 className="font-semibold text-xs sm:text-sm mb-1 flex items-center gap-2">
                          <Target className="h-3 w-3 sm:h-4 sm:w-4 text-secondary" />
                          Clinical Recommendation
                        </h4>
                        <p className="text-xs sm:text-sm">{pattern.recommendation}</p>
                      </div>

                      {/* Detailed Analysis */}
                      <div className="grid grid-cols-1 gap-3 text-xs sm:text-sm">
                        <div className="space-y-2">
                          <h5 className="font-semibold">Correlations Found</h5>
                          <ul className="text-muted-foreground space-y-1 ml-2">
                            {pattern.details.correlations.map((correlation, idx) => (
                              <li key={idx} className="flex items-start gap-1">
                                <span className="text-secondary mt-1">•</span>
                                <span>{correlation}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <h5 className="font-semibold mb-1">Affected Symptoms</h5>
                            <ul className="text-muted-foreground space-y-1">
                              {pattern.details.symptoms.map((symptom, idx) => (
                                <li key={idx}>• {symptom}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold mb-1">Timing</h5>
                            <p className="text-muted-foreground">{pattern.details.timing}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold mb-1">Current Treatment</h5>
                          <p className="text-muted-foreground">{pattern.details.medications}</p>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  <div className="flex justify-between items-center pt-2 border-t text-xs text-muted-foreground">
                    <span>Analysis: {pattern.timeframe}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
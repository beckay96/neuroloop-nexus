import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("epilepsy");

  const currentPatterns = activeTab === "epilepsy" ? epilepsyPatterns : parkinsonPatterns;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            Patterns Identified
          </h2>
          <p className="text-muted-foreground text-sm">
            AI-powered analysis of patient data to identify behavioral and physiological patterns
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-2" />
          View All Insights
        </Button>
      </div>

      {/* Condition Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="epilepsy">Epilepsy Patterns</TabsTrigger>
          <TabsTrigger value="parkinsons">Parkinson's Patterns</TabsTrigger>
        </TabsList>

        <TabsContent value="epilepsy" className="space-y-4">
          <div className="grid gap-4">
            {epilepsyPatterns.map((pattern) => (
              <Card key={pattern.id} className="medical-card">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <pattern.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{pattern.patternType}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <span>{pattern.patientName}</span>
                          <Badge variant="outline" className="text-xs">
                            {pattern.patientId}
                          </Badge>
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getSeverityColor(pattern.severity)}>
                        {pattern.severity.toUpperCase()}
                      </Badge>
                      <div className="text-right text-sm">
                        <p className={`font-semibold ${getConfidenceColor(pattern.confidence)}`}>
                          {pattern.confidence}% confidence
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {pattern.dataPoints} data points
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Pattern Description</h4>
                      <p className="text-sm text-muted-foreground">{pattern.description}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Key Trigger</h4>
                      <p className="text-sm">{pattern.trigger}</p>
                      <p className="text-xs text-muted-foreground mt-1">{pattern.frequency}</p>
                    </div>
                  </div>
                  
                  <div className="bg-accent/50 p-3 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Target className="h-4 w-4 text-primary" />
                      Clinical Recommendation
                    </h4>
                    <p className="text-sm">{pattern.recommendation}</p>
                  </div>

                  {selectedPattern === pattern.id && (
                    <div className="border-t pt-4 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h5 className="font-semibold mb-1">Correlations Found</h5>
                          <ul className="text-muted-foreground space-y-1">
                            {pattern.details.correlations.map((correlation, idx) => (
                              <li key={idx}>• {correlation}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-1">Seizure Types</h5>
                          <ul className="text-muted-foreground space-y-1">
                            {pattern.details.seizureTypes.map((type, idx) => (
                              <li key={idx}>• {type}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-1">Timing Pattern</h5>
                          <p className="text-muted-foreground">{pattern.details.timing}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-1">Current Treatment</h5>
                          <p className="text-muted-foreground">{pattern.details.medications}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-2">
                    <div className="text-xs text-muted-foreground">
                      Analysis period: {pattern.timeframe}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedPattern(
                        selectedPattern === pattern.id ? null : pattern.id
                      )}
                    >
                      {selectedPattern === pattern.id ? 'Hide Details' : 'View Details'}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="parkinsons" className="space-y-4">
          <div className="grid gap-4">
            {parkinsonPatterns.map((pattern) => (
              <Card key={pattern.id} className="medical-card">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-secondary/10 rounded-lg">
                        <pattern.icon className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{pattern.patternType}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <span>{pattern.patientName}</span>
                          <Badge variant="outline" className="text-xs">
                            {pattern.patientId}
                          </Badge>
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getSeverityColor(pattern.severity)}>
                        {pattern.severity.toUpperCase()}
                      </Badge>
                      <div className="text-right text-sm">
                        <p className={`font-semibold ${getConfidenceColor(pattern.confidence)}`}>
                          {pattern.confidence}% confidence
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {pattern.dataPoints} data points
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Pattern Description</h4>
                      <p className="text-sm text-muted-foreground">{pattern.description}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Key Trigger</h4>
                      <p className="text-sm">{pattern.trigger}</p>
                      <p className="text-xs text-muted-foreground mt-1">{pattern.frequency}</p>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/10 p-3 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Target className="h-4 w-4 text-secondary" />
                      Clinical Recommendation
                    </h4>
                    <p className="text-sm">{pattern.recommendation}</p>
                  </div>

                  {selectedPattern === pattern.id && (
                    <div className="border-t pt-4 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h5 className="font-semibold mb-1">Correlations Found</h5>
                          <ul className="text-muted-foreground space-y-1">
                            {pattern.details.correlations.map((correlation, idx) => (
                              <li key={idx}>• {correlation}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-1">Affected Symptoms</h5>
                          <ul className="text-muted-foreground space-y-1">
                            {pattern.details.symptoms.map((symptom, idx) => (
                              <li key={idx}>• {symptom}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-1">Timing Pattern</h5>
                          <p className="text-muted-foreground">{pattern.details.timing}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-1">Current Treatment</h5>
                          <p className="text-muted-foreground">{pattern.details.medications}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-2">
                    <div className="text-xs text-muted-foreground">
                      Analysis period: {pattern.timeframe}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedPattern(
                        selectedPattern === pattern.id ? null : pattern.id
                      )}
                    >
                      {selectedPattern === pattern.id ? 'Hide Details' : 'View Details'}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
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
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  AlertTriangle, 
  Shield, 
  TrendingUp, 
  TrendingDown,
  Brain,
  Heart,
  Activity,
  Clock,
  Target,
  Zap
} from 'lucide-react';

interface RiskFactor {
  category: string;
  risk: 'low' | 'moderate' | 'high' | 'critical';
  score: number;
  maxScore: number;
  factors: string[];
  trend: 'improving' | 'stable' | 'worsening';
}

interface PatientRisk {
  id: string;
  patientName: string;
  patientId: string;
  condition: string;
  overallRisk: 'low' | 'moderate' | 'high' | 'critical';
  riskScore: number;
  maxRiskScore: number;
  lastUpdated: string;
  riskFactors: RiskFactor[];
  predictions: {
    seizureRisk: number;
    fallRisk: number;
    hospitalizationRisk: number;
    medicationFailure: number;
  };
  interventions: string[];
}

interface RiskStratificationProps {
  showAll?: boolean;
  maxItems?: number;
}

export default function RiskStratification({ showAll = false, maxItems = 3 }: RiskStratificationProps) {
  const navigate = useNavigate();
  // Mock data for risk stratification
  const patientRisks: PatientRisk[] = [
    {
      id: '1',
      patientName: 'Sarah Johnson',
      patientId: 'P001',
      condition: 'Temporal Lobe Epilepsy',
      overallRisk: 'critical',
      riskScore: 87,
      maxRiskScore: 100,
      lastUpdated: '2 hours ago',
      riskFactors: [
        {
          category: 'Seizure Control',
          risk: 'critical',
          score: 9,
          maxScore: 10,
          factors: ['Cluster seizures', 'Breakthrough seizures', 'Medication resistance'],
          trend: 'worsening'
        },
        {
          category: 'Medication Adherence',
          risk: 'moderate',
          score: 6,
          maxScore: 10,
          factors: ['Missed doses', 'Side effects reported'],
          trend: 'stable'
        },
        {
          category: 'Lifestyle Factors',
          risk: 'high',
          score: 8,
          maxScore: 10,
          factors: ['Sleep deprivation', 'High stress', 'Irregular schedule'],
          trend: 'worsening'
        }
      ],
      predictions: {
        seizureRisk: 85,
        fallRisk: 45,
        hospitalizationRisk: 72,
        medicationFailure: 38
      },
      interventions: ['Emergency protocol review', 'Medication adjustment', 'Sleep hygiene counseling']
    },
    {
      id: '2',
      patientName: 'Robert Kim',
      patientId: 'P005',
      condition: "Parkinson's Disease",
      overallRisk: 'high',
      riskScore: 76,
      maxRiskScore: 100,
      lastUpdated: '30 minutes ago',
      riskFactors: [
        {
          category: 'Fall Risk',
          risk: 'critical',
          score: 9,
          maxScore: 10,
          factors: ['Recent fall with injury', 'Balance issues', 'Freezing episodes'],
          trend: 'worsening'
        },
        {
          category: 'Motor Symptoms',
          risk: 'high',
          score: 7,
          maxScore: 10,
          factors: ['Increased OFF time', 'Dyskinesia', 'Rigidity'],
          trend: 'stable'
        },
        {
          category: 'Cognitive Function',
          risk: 'moderate',
          score: 5,
          maxScore: 10,
          factors: ['Mild cognitive impairment', 'Executive dysfunction'],
          trend: 'improving'
        }
      ],
      predictions: {
        seizureRisk: 5,
        fallRisk: 89,
        hospitalizationRisk: 65,
        medicationFailure: 42
      },
      interventions: ['Physical therapy referral', 'Home safety assessment', 'Medication timing optimization']
    },
    {
      id: '3',
      patientName: 'Michael Chen',
      patientId: 'P002',
      condition: "Parkinson's Disease",
      overallRisk: 'moderate',
      riskScore: 58,
      maxRiskScore: 100,
      lastUpdated: '4 hours ago',
      riskFactors: [
        {
          category: 'Medication Management',
          risk: 'high',
          score: 7,
          maxScore: 10,
          factors: ['Poor adherence', 'Complex regimen', 'Side effects'],
          trend: 'worsening'
        },
        {
          category: 'Disease Progression',
          risk: 'moderate',
          score: 5,
          maxScore: 10,
          factors: ['Gradual symptom worsening', 'New symptoms emerging'],
          trend: 'stable'
        },
        {
          category: 'Social Support',
          risk: 'low',
          score: 2,
          maxScore: 10,
          factors: ['Strong family support', 'Active in community'],
          trend: 'improving'
        }
      ],
      predictions: {
        seizureRisk: 8,
        fallRisk: 35,
        hospitalizationRisk: 28,
        medicationFailure: 67
      },
      interventions: ['Medication simplification', 'Adherence monitoring', 'Caregiver education']
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return <Shield className="h-4 w-4" />;
      case 'moderate': return <Clock className="h-4 w-4" />;
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'critical': return <Zap className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-3 w-3 text-green-600 dark:text-green-400" />;
      case 'worsening': return <TrendingDown className="h-3 w-3 text-red-600 dark:text-red-400" />;
      case 'stable': return <Activity className="h-3 w-3 text-blue-600 dark:text-blue-400" />;
      default: return null;
    }
  };

  const getPredictionIcon = (type: string) => {
    switch (type) {
      case 'seizureRisk': return <Zap className="h-3 w-3" />;
      case 'fallRisk': return <AlertTriangle className="h-3 w-3" />;
      case 'hospitalizationRisk': return <Heart className="h-3 w-3" />;
      case 'medicationFailure': return <Target className="h-3 w-3" />;
      default: return <Activity className="h-3 w-3" />;
    }
  };

  const formatPredictionName = (key: string) => {
    switch (key) {
      case 'seizureRisk': return 'Seizure Risk';
      case 'fallRisk': return 'Fall Risk';
      case 'hospitalizationRisk': return 'Hospitalization Risk';
      case 'medicationFailure': return 'Medication Failure';
      default: return key;
    }
  };

  const displayRisks = showAll ? patientRisks : patientRisks.slice(0, maxItems);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Risk Stratification & Predictions
          </span>
          {!showAll && patientRisks.length > maxItems && (
            <Button variant="outline" size="sm" className="text-xs">
              View All ({patientRisks.length})
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayRisks.map((patient) => (
            <Card key={patient.id} className="border border-border/50 hover:shadow-md hover:border-border transition-all duration-200 bg-card">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <button 
                        onClick={() => navigate(`/patient/${patient.patientId}`)}
                        className="font-semibold text-base text-primary hover:text-primary/80 hover:underline transition-colors text-left"
                      >
                        {patient.patientName}
                      </button>
                      <Badge className={`${getRiskColor(patient.overallRisk)} font-medium`}>
                        {getRiskIcon(patient.overallRisk)}
                        <span className="ml-1">{patient.overallRisk.toUpperCase()} RISK</span>
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">{patient.condition}</span> • Updated {patient.lastUpdated}
                    </div>
                  </div>
                  
                  <div className="text-right sm:text-center shrink-0">
                    <div className="text-2xl font-bold text-foreground">
                      {patient.riskScore}<span className="text-muted-foreground">/{patient.maxRiskScore}</span>
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      Risk Score
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <Progress 
                    value={patient.riskScore} 
                    className="h-2"
                  />
                </div>

                {/* Risk Factors */}
                <div className="mb-6">
                  <h5 className="font-semibold text-sm text-foreground mb-3">Risk Factors</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {patient.riskFactors.map((factor, index) => (
                      <div key={index} className="bg-muted/30 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm text-foreground">{factor.category}</span>
                          <div className="flex items-center gap-1">
                            {getTrendIcon(factor.trend)}
                            <Badge variant="outline" className={`${getRiskColor(factor.risk)} text-xs`}>
                              {factor.risk}
                            </Badge>
                          </div>
                        </div>
                        <div className="mb-2">
                          <Progress 
                            value={(factor.score / factor.maxScore) * 100} 
                            className="h-2"
                          />
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Score: {factor.score}/{factor.maxScore} ({Math.round((factor.score / factor.maxScore) * 100)}%)
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Predictions */}
                <div className="mb-6">
                  <h5 className="font-semibold text-sm text-foreground mb-3">AI Predictions (30-day)</h5>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {Object.entries(patient.predictions).map(([key, value]) => (
                      <div key={key} className="bg-muted/30 rounded-lg p-3 text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          {getPredictionIcon(key)}
                          <span className="text-lg font-bold text-foreground">{value}%</span>
                        </div>
                        <div className="text-xs text-muted-foreground font-medium mb-2">
                          {formatPredictionName(key)}
                        </div>
                        <Progress value={value} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interventions */}
                <div className="mb-4">
                  <h5 className="font-semibold text-sm text-foreground mb-3">Recommended Interventions</h5>
                  <div className="flex flex-wrap gap-2">
                    {patient.interventions.map((intervention, index) => (
                      <Badge key={index} variant="outline" className="text-sm px-3 py-1 bg-primary/5 hover:bg-primary/10 transition-colors">
                        {intervention}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <Button variant="outline" size="sm" className="text-sm">
                    <Target className="h-4 w-4 mr-2" />
                    Create Care Plan
                  </Button>
                  <Button variant="outline" size="sm" className="text-sm">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Set Alerts
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

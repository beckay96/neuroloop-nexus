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
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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
      case 'improving': return <TrendingUp className="h-3 w-3 text-green-600" />;
      case 'worsening': return <TrendingDown className="h-3 w-3 text-red-600" />;
      case 'stable': return <Activity className="h-3 w-3 text-blue-600" />;
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
            <Card key={patient.id} className="border border-border/50 hover:shadow-md transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm">{patient.patientName}</h4>
                      <Badge className={getRiskColor(patient.overallRisk)}>
                        {getRiskIcon(patient.overallRisk)}
                        <span className="ml-1">{patient.overallRisk.toUpperCase()}</span>
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {patient.condition} • Updated {patient.lastUpdated}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold">
                      {patient.riskScore}/{patient.maxRiskScore}
                    </div>
                    <div className="text-xs text-muted-foreground">
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
                <div className="mb-4">
                  <h5 className="font-medium text-xs mb-2">Risk Factors:</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {patient.riskFactors.map((factor, index) => (
                      <div key={index} className="text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{factor.category}</span>
                          <div className="flex items-center gap-1">
                            {getTrendIcon(factor.trend)}
                            <Badge variant="outline" className={getRiskColor(factor.risk)}>
                              {factor.risk}
                            </Badge>
                          </div>
                        </div>
                        <Progress 
                          value={(factor.score / factor.maxScore) * 100} 
                          className="h-1"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Predictions */}
                <div className="mb-4">
                  <h5 className="font-medium text-xs mb-2">AI Predictions (30-day):</h5>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {Object.entries(patient.predictions).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          {getPredictionIcon(key)}
                          <span className="text-xs font-medium">{value}%</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatPredictionName(key)}
                        </div>
                        <Progress value={value} className="h-1 mt-1" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interventions */}
                <div>
                  <h5 className="font-medium text-xs mb-2">Recommended Interventions:</h5>
                  <div className="flex flex-wrap gap-1">
                    {patient.interventions.map((intervention, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {intervention}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm" className="text-xs">
                    <Target className="h-3 w-3 mr-1" />
                    Create Care Plan
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    <AlertTriangle className="h-3 w-3 mr-1" />
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

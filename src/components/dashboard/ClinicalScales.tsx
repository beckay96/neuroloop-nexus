import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  FileText,
  AlertTriangle,
  CheckCircle,
  Calendar
} from 'lucide-react';

interface ClinicalScale {
  id: string;
  patientId: string;
  patientName: string;
  scaleType: 'MDS-UPDRS' | 'NINDS-CSC' | 'Seizure-Severity' | 'Tremor-Rating' | 'PDSS';
  totalScore: number;
  maxScore: number;
  subscores: {
    category: string;
    score: number;
    maxScore: number;
    severity: 'normal' | 'mild' | 'moderate' | 'severe';
  }[];
  assessmentDate: string;
  nextDue: string;
  trend: 'improving' | 'stable' | 'worsening';
  changeFromLast: number;
  clinicalSignificance: 'significant' | 'minimal' | 'none';
}

interface ClinicalScalesProps {
  showAll?: boolean;
  maxItems?: number;
}

export default function ClinicalScales({ showAll = false, maxItems = 4 }: ClinicalScalesProps) {
  const [selectedScale, setSelectedScale] = useState<string | null>(null);

  // Mock data for clinical scales
  const clinicalScales: ClinicalScale[] = [
    {
      id: '1',
      patientId: 'P002',
      patientName: 'Michael Chen',
      scaleType: 'MDS-UPDRS',
      totalScore: 47,
      maxScore: 132,
      subscores: [
        { category: 'Non-Motor Experiences', score: 8, maxScore: 52, severity: 'mild' },
        { category: 'Motor Experiences', score: 12, maxScore: 52, severity: 'mild' },
        { category: 'Motor Examination', score: 18, maxScore: 132, severity: 'moderate' },
        { category: 'Motor Complications', score: 9, maxScore: 24, severity: 'moderate' }
      ],
      assessmentDate: '2024-01-15',
      nextDue: '2024-04-15',
      trend: 'worsening',
      changeFromLast: +5,
      clinicalSignificance: 'significant'
    },
    {
      id: '2',
      patientId: 'P001',
      patientName: 'Sarah Johnson',
      scaleType: 'NINDS-CSC',
      totalScore: 6,
      maxScore: 10,
      subscores: [
        { category: 'Seizure Frequency', score: 2, maxScore: 3, severity: 'moderate' },
        { category: 'Seizure Severity', score: 2, maxScore: 3, severity: 'moderate' },
        { category: 'Seizure Duration', score: 1, maxScore: 2, severity: 'mild' },
        { category: 'Post-ictal State', score: 1, maxScore: 2, severity: 'mild' }
      ],
      assessmentDate: '2024-01-10',
      nextDue: '2024-02-10',
      trend: 'stable',
      changeFromLast: 0,
      clinicalSignificance: 'none'
    },
    {
      id: '3',
      patientId: 'P003',
      patientName: 'Emily Rodriguez',
      scaleType: 'Tremor-Rating',
      totalScore: 28,
      maxScore: 64,
      subscores: [
        { category: 'Rest Tremor', score: 4, maxScore: 16, severity: 'mild' },
        { category: 'Action Tremor', score: 12, maxScore: 16, severity: 'moderate' },
        { category: 'Postural Tremor', score: 8, maxScore: 16, severity: 'moderate' },
        { category: 'Functional Impact', score: 4, maxScore: 16, severity: 'mild' }
      ],
      assessmentDate: '2024-01-12',
      nextDue: '2024-03-12',
      trend: 'improving',
      changeFromLast: -3,
      clinicalSignificance: 'minimal'
    },
    {
      id: '4',
      patientId: 'P005',
      patientName: 'Robert Kim',
      scaleType: 'PDSS',
      totalScore: 82,
      maxScore: 150,
      subscores: [
        { category: 'Overall Sleep Quality', score: 18, maxScore: 30, severity: 'moderate' },
        { category: 'Sleep Initiation', score: 22, maxScore: 30, severity: 'mild' },
        { category: 'Sleep Maintenance', score: 20, maxScore: 30, severity: 'moderate' },
        { category: 'Early Morning Dystonia', score: 12, maxScore: 30, severity: 'severe' },
        { category: 'Sleep Refreshment', score: 10, maxScore: 30, severity: 'severe' }
      ],
      assessmentDate: '2024-01-08',
      nextDue: '2024-02-08',
      trend: 'worsening',
      changeFromLast: +8,
      clinicalSignificance: 'significant'
    }
  ];

  const getScaleColor = (scaleType: string) => {
    switch (scaleType) {
      case 'MDS-UPDRS': return 'text-blue-600';
      case 'NINDS-CSC': return 'text-red-600';
      case 'Tremor-Rating': return 'text-green-600';
      case 'PDSS': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'normal': return 'bg-green-100 text-green-800';
      case 'mild': return 'bg-yellow-100 text-yellow-800';
      case 'moderate': return 'bg-orange-100 text-orange-800';
      case 'severe': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'worsening': return <TrendingDown className="h-4 w-4 text-red-600" />;
      case 'stable': return <Activity className="h-4 w-4 text-blue-600" />;
      default: return null;
    }
  };

  const getSignificanceIcon = (significance: string) => {
    switch (significance) {
      case 'significant': return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'minimal': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'none': return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculatePercentage = (score: number, maxScore: number) => {
    return Math.round((score / maxScore) * 100);
  };

  const displayScales = showAll ? clinicalScales : clinicalScales.slice(0, maxItems);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Clinical Scales & Assessments
          </span>
          {!showAll && clinicalScales.length > maxItems && (
            <Button variant="outline" size="sm" className="text-xs">
              View All ({clinicalScales.length})
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayScales.map((scale) => (
            <Card key={scale.id} className="border border-border/50 hover:shadow-md transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm">{scale.patientName}</h4>
                      <Badge variant="outline" className={getScaleColor(scale.scaleType)}>
                        {scale.scaleType}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(scale.assessmentDate)}
                      </span>
                      <span className="flex items-center gap-1">
                        {getTrendIcon(scale.trend)}
                        {scale.trend} ({scale.changeFromLast > 0 ? '+' : ''}{scale.changeFromLast})
                      </span>
                      <span className="flex items-center gap-1">
                        {getSignificanceIcon(scale.clinicalSignificance)}
                        {scale.clinicalSignificance} change
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold">
                      {scale.totalScore}/{scale.maxScore}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {calculatePercentage(scale.totalScore, scale.maxScore)}%
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <Progress 
                    value={calculatePercentage(scale.totalScore, scale.maxScore)} 
                    className="h-2"
                  />
                </div>

                {selectedScale === scale.id ? (
                  <div className="space-y-2 mt-3 pt-3 border-t">
                    <h5 className="font-medium text-sm mb-2">Subscale Breakdown:</h5>
                    {scale.subscores.map((subscore, index) => (
                      <div key={index} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{subscore.category}</span>
                          <Badge variant="outline" className={getSeverityColor(subscore.severity)}>
                            {subscore.severity}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={calculatePercentage(subscore.score, subscore.maxScore)} 
                            className="h-1 w-16"
                          />
                          <span className="font-mono">
                            {subscore.score}/{subscore.maxScore}
                          </span>
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm" className="text-xs">
                        <FileText className="h-3 w-3 mr-1" />
                        View Full Report
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        <Calendar className="h-3 w-3 mr-1" />
                        Schedule Follow-up
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-xs text-muted-foreground">
                      Next due: {formatDate(scale.nextDue)}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs"
                      onClick={() => setSelectedScale(scale.id)}
                    >
                      View Details
                    </Button>
                  </div>
                )}
                
                {selectedScale === scale.id && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs mt-2"
                    onClick={() => setSelectedScale(null)}
                  >
                    Hide Details
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

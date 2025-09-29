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
      case 'MDS-UPDRS': return 'text-blue-600 dark:text-blue-400';
      case 'NINDS-CSC': return 'text-red-600 dark:text-red-400';
      case 'Tremor-Rating': return 'text-green-600 dark:text-green-400';
      case 'PDSS': return 'text-purple-600 dark:text-purple-400';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'normal': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800';
      case 'mild': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
      case 'moderate': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800';
      case 'severe': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />;
      case 'worsening': return <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />;
      case 'stable': return <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      default: return null;
    }
  };

  const getSignificanceIcon = (significance: string) => {
    switch (significance) {
      case 'significant': return <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />;
      case 'minimal': return <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />;
      case 'none': return <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />;
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
            <Card key={scale.id} className="border border-border/50 hover:shadow-md hover:border-border transition-all duration-200 bg-card">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <h4 className="font-semibold text-base text-foreground">{scale.patientName}</h4>
                      <Badge variant="outline" className={`${getScaleColor(scale.scaleType)} font-medium`}>
                        {scale.scaleType}
                      </Badge>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 shrink-0" />
                        <span className="font-medium">Assessed:</span> {formatDate(scale.assessmentDate)}
                      </span>
                      <span className="flex items-center gap-1">
                        {getTrendIcon(scale.trend)}
                        <span className="font-medium">Trend:</span> {scale.trend} ({scale.changeFromLast > 0 ? '+' : ''}{scale.changeFromLast})
                      </span>
                      <span className="flex items-center gap-1">
                        {getSignificanceIcon(scale.clinicalSignificance)}
                        <span className="font-medium">Change:</span> {scale.clinicalSignificance}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right sm:text-center shrink-0">
                    <div className="text-2xl font-bold text-foreground">
                      {scale.totalScore}<span className="text-muted-foreground">/{scale.maxScore}</span>
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {calculatePercentage(scale.totalScore, scale.maxScore)}% Score
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
                  <div className="space-y-4 mt-4 pt-4 border-t border-border">
                    <h5 className="font-semibold text-sm text-foreground mb-3">Subscale Breakdown</h5>
                    <div className="space-y-3">
                      {scale.subscores.map((subscore, index) => (
                        <div key={index} className="bg-muted/30 rounded-lg p-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm text-foreground">{subscore.category}</span>
                              <Badge variant="outline" className={`${getSeverityColor(subscore.severity)} text-xs`}>
                                {subscore.severity}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-sm font-medium text-foreground">
                                {subscore.score}/{subscore.maxScore}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                ({calculatePercentage(subscore.score, subscore.maxScore)}%)
                              </span>
                            </div>
                          </div>
                          <Progress 
                            value={calculatePercentage(subscore.score, subscore.maxScore)} 
                            className="h-2"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 mt-4">
                      <Button variant="outline" size="sm" className="text-sm">
                        <FileText className="h-4 w-4 mr-2" />
                        View Full Report
                      </Button>
                      <Button variant="outline" size="sm" className="text-sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Follow-up
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mt-3">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Next due:</span> {formatDate(scale.nextDue)}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-sm hover:bg-muted"
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

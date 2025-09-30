import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, Upload, TestTube, Image as ImageIcon, FileText, 
  Check, X, Brain, Activity, File, Paperclip
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface TestResult {
  result_id: string;
  result_type: 'lab' | 'imaging' | 'clinical_scale';
  result_name: string;
  result_date: string;
  is_abnormal: boolean;
  summary: string;
}

interface AttachmentManagerProps {
  conversationId: string;
  patientId: string;
  attachmentType: 'photo' | 'file' | 'test_result' | null;
  onClose: () => void;
  onAttached: () => void;
}

export default function AttachmentManager({ 
  conversationId, 
  patientId, 
  attachmentType,
  onClose, 
  onAttached 
}: AttachmentManagerProps) {
  const { toast } = useToast();
  const [selectedResults, setSelectedResults] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Mock test results - replace with real API
  const mockTestResults: TestResult[] = [
    {
      result_id: '1',
      result_type: 'lab',
      result_name: 'Levetiracetam Blood Level',
      result_date: '2025-09-28',
      is_abnormal: true,
      summary: 'Level: 18 μg/mL (therapeutic range: 12-46). Subtherapeutic for breakthrough seizures.'
    },
    {
      result_id: '2',
      result_type: 'imaging',
      result_name: 'MRI Brain',
      result_date: '2025-09-15',
      is_abnormal: false,
      summary: 'Stable mesial temporal sclerosis, left hippocampus. No acute changes.'
    },
    {
      result_id: '3',
      result_type: 'lab',
      result_name: 'Complete Blood Count',
      result_date: '2025-09-20',
      is_abnormal: false,
      summary: 'All values within normal limits. WBC 6.8, Hemoglobin 14.2.'
    },
    {
      result_id: '4',
      result_type: 'clinical_scale',
      result_name: 'MDS-UPDRS Part III',
      result_date: '2025-09-25',
      is_abnormal: false,
      summary: 'Score: 28/132. Mild motor symptoms, stable from previous assessment.'
    },
    {
      result_id: '5',
      result_type: 'imaging',
      result_name: 'EEG',
      result_date: '2025-09-22',
      is_abnormal: true,
      summary: 'Interictal epileptiform discharges in left temporal region. Increased from baseline.'
    }
  ];

  const toggleResult = (id: string) => {
    const newSelected = new Set(selectedResults);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedResults(newSelected);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleSend = () => {
    if (attachmentType === 'test_result' && selectedResults.size === 0) {
      toast({
        title: "No Results Selected",
        description: "Please select at least one test result to share.",
        variant: "destructive"
      });
      return;
    }

    if ((attachmentType === 'photo' || attachmentType === 'file') && !uploadedFile) {
      toast({
        title: "No File Uploaded",
        description: `Please upload a ${attachmentType === 'photo' ? 'photo' : 'file'} to share.`,
        variant: "destructive"
      });
      return;
    }

    // In production, upload file to Supabase Storage here
    toast({
      title: "File Attached",
      description: `${uploadedFile?.name} will be sent with your message.`,
    });

    onAttached();
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'lab': return <TestTube className="h-4 w-4" />;
      case 'imaging': return <Brain className="h-4 w-4" />;
      case 'clinical_scale': return <Activity className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <Card className="medical-card h-full flex flex-col">
      <CardHeader className="border-b">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <CardTitle>
              {attachmentType === 'photo' ? 'Attach Photo' : attachmentType === 'file' ? 'Attach File' : 'Share Test Results'}
            </CardTitle>
            <CardDescription>
              {attachmentType === 'photo' 
                ? 'Upload and share images with your patient'
                : attachmentType === 'file'
                ? 'Upload and share any file type with your patient'
                : 'Select recent test results to share with your patient'
              }
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-6">
        {(attachmentType === 'photo' || attachmentType === 'file') ? (
          <div className="space-y-6">
            {/* File Upload */}
            <div className="border-2 border-dashed rounded-lg p-12 text-center hover:border-primary/50 transition-colors">
              <input
                type="file"
                id="file-upload"
                accept={attachmentType === 'photo' ? 'image/*' : '*'}
                onChange={handleFileUpload}
                className="hidden"
              />
              {uploadedFile ? (
                <div className="space-y-4">
                  {attachmentType === 'photo' ? (
                    <ImageIcon className="h-12 w-12 mx-auto text-green-600" />
                  ) : (
                    <File className="h-12 w-12 mx-auto text-green-600" />
                  )}
                  <div>
                    <p className="font-semibold">{uploadedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • {uploadedFile.type || 'Unknown type'}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setUploadedFile(null)}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>
              ) : (
                <label htmlFor="file-upload" className="cursor-pointer">
                  {attachmentType === 'photo' ? (
                    <>
                      <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-lg font-semibold mb-2">Upload Photo</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Click to browse or drag and drop
                      </p>
                      <Badge variant="outline">JPG, PNG, GIF up to 10MB</Badge>
                    </>
                  ) : (
                    <>
                      <Paperclip className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-lg font-semibold mb-2">Upload File</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Click to browse or drag and drop any file
                      </p>
                      <Badge variant="outline">All file types • PDFs, Documents, Scripts, etc.</Badge>
                    </>
                  )}
                </label>
              )}
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Add Message (Optional)</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add context or explanation..."
                className="min-h-[100px]"
              />
            </div>

            {/* Actions */}
            <Button 
              className="w-full" 
              onClick={handleSend}
              disabled={!uploadedFile}
            >
              <Paperclip className="h-4 w-4 mr-2" />
              Send {attachmentType === 'photo' ? 'Photo' : 'File'}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Test Results List */}
            <div className="space-y-3">
              <h3 className="font-semibold">Recent Test Results</h3>
              {mockTestResults.map((result) => (
                <Card
                  key={result.result_id}
                  className={`cursor-pointer transition-all ${
                    selectedResults.has(result.result_id)
                      ? 'ring-2 ring-primary bg-primary/5'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => toggleResult(result.result_id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {selectedResults.has(result.result_id) ? (
                          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <Check className="h-3 w-3 text-primary-foreground" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getResultIcon(result.result_type)}
                          <span className="font-semibold text-sm">{result.result_name}</span>
                          {result.is_abnormal && (
                            <Badge variant="destructive" className="text-xs">Abnormal</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {result.result_date}
                        </p>
                        <p className="text-sm">{result.summary}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Add Message (Optional)</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Explain the results or provide context..."
                className="min-h-[100px]"
              />
            </div>

            {/* Selected Count */}
            {selectedResults.size > 0 && (
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-sm">
                <strong>{selectedResults.size}</strong> result{selectedResults.size > 1 ? 's' : ''} selected
              </div>
            )}

            {/* Actions */}
            <Button 
              className="w-full" 
              onClick={handleSend}
              disabled={selectedResults.size === 0}
            >
              Share {selectedResults.size} Result{selectedResults.size !== 1 ? 's' : ''}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CustomDatePicker } from "@/components/ui/custom-date-picker";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Video, 
  StopCircle, 
  Play, 
  Upload, 
  FileVideo,
  AlertTriangle,
  Shield
} from "lucide-react";

interface VideoLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: any) => void;
}

export default function VideoLogModal({ isOpen, onClose, onComplete }: VideoLogModalProps) {
  const [videoData, setVideoData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    video_type: "",
    description: "",
    symptoms_captured: [] as string[],
    notes: "",
    duration_seconds: 0,
    file_name: ""
  });

  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const videoTypes = [
    "Seizure event",
    "Movement symptoms (Parkinson's)",
    "Tremor documentation",
    "Gait analysis",
    "Speech assessment",
    "Medication effects",
    "Daily functioning",
    "Other symptoms"
  ];

  const symptomTypes = [
    "Tremor",
    "Rigidity",
    "Bradykinesia",
    "Dystonia",
    "Chorea",
    "Ataxia",
    "Speech difficulties",
    "Swallowing issues",
    "Facial expressions",
    "Gait problems",
    "Balance issues",
    "Other"
  ];

  const updateVideoData = (key: string, value: any) => {
    setVideoData(prev => ({ ...prev, [key]: value }));
  };

  const toggleSymptom = (symptom: string) => {
    const updated = videoData.symptoms_captured.includes(symptom)
      ? videoData.symptoms_captured.filter(s => s !== symptom)
      : [...videoData.symptoms_captured, symptom];
    updateVideoData("symptoms_captured", updated);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedVideo(url);
        updateVideoData("duration_seconds", Math.floor((Date.now() - recordingStartTime) / 1000));
      };

      const recordingStartTime = Date.now();
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      updateVideoData("file_name", file.name);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setRecordedVideo(url);
      
      // Get video duration
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        updateVideoData("duration_seconds", Math.floor(video.duration));
      };
      video.src = url;
    }
  };

  const handleComplete = () => {
    const finalData = {
      ...videoData,
      has_video: !!(recordedVideo || uploadedFile),
      logged_at: new Date().toISOString()
    };
    
    onComplete(finalData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border border-border z-50 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2">
            <Camera className="h-5 w-5 text-warning" />
            Video Symptom Log
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Privacy Notice */}
          <Card className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-2">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
                  Privacy & Security
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Videos are stored securely and encrypted. Only you and your care team (if shared) can access them.
                </p>
              </div>
            </div>
          </Card>

          {/* Date and Time */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">When was this recorded?</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <CustomDatePicker
                  label="Date"
                  value={videoData.date}
                  onChange={(value) => updateVideoData("date", value)}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <Label>Time</Label>
                <Input
                  type="time"
                  value={videoData.time}
                  onChange={(e) => updateVideoData("time", e.target.value)}
                />
              </div>
            </div>
          </Card>

          {/* Video Recording/Upload */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Video Recording</h3>
            
            {!recordedVideo && !isRecording && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={startRecording}
                    className="h-16 flex flex-col items-center gap-2"
                    variant="outline"
                  >
                    <Video className="h-6 w-6" />
                    <span>Record New Video</span>
                  </Button>
                  
                  <div>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="video-upload"
                    />
                    <Label
                      htmlFor="video-upload"
                      className="h-16 flex flex-col items-center gap-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-gray-400 justify-center"
                    >
                      <Upload className="h-6 w-6" />
                      <span>Upload Video</span>
                    </Label>
                  </div>
                </div>
              </div>
            )}

            {isRecording && (
              <div className="space-y-4">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full max-w-sm mx-auto rounded-lg"
                />
                <div className="text-center">
                  <Button
                    onClick={stopRecording}
                    variant="destructive"
                    className="flex items-center gap-2"
                  >
                    <StopCircle className="h-4 w-4" />
                    Stop Recording
                  </Button>
                </div>
              </div>
            )}

            {recordedVideo && (
              <div className="space-y-4">
                <video
                  src={recordedVideo}
                  controls
                  className="w-full max-w-sm mx-auto rounded-lg"
                />
                <div className="text-center space-x-2">
                  <Button
                    onClick={() => {
                      setRecordedVideo(null);
                      setUploadedFile(null);
                      updateVideoData("file_name", "");
                      updateVideoData("duration_seconds", 0);
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Remove Video
                  </Button>
                  <Badge variant="secondary">
                    Duration: {videoData.duration_seconds}s
                  </Badge>
                </div>
              </div>
            )}
          </Card>

          {/* Video Details */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Video Details</h3>
            <div className="space-y-4">
              <div>
                <Label>Video Type</Label>
                <Select 
                  value={videoData.video_type} 
                  onValueChange={(value) => updateVideoData("video_type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="What does this video show?" />
                  </SelectTrigger>
                  <SelectContent>
                    {videoTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={videoData.description}
                  onChange={(e) => updateVideoData("description", e.target.value)}
                  placeholder="Describe what's happening in the video..."
                  rows={3}
                />
              </div>
            </div>
          </Card>

          {/* Symptoms Captured */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Symptoms Captured</h3>
            <div className="grid grid-cols-2 gap-2">
              {symptomTypes.map(symptom => (
                <div key={symptom} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={videoData.symptoms_captured.includes(symptom)}
                    onChange={() => toggleSymptom(symptom)}
                    className="rounded"
                  />
                  <label className="text-sm">{symptom}</label>
                </div>
              ))}
            </div>
            
            {videoData.symptoms_captured.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {videoData.symptoms_captured.map(symptom => (
                  <Badge key={symptom} variant="secondary" className="text-xs">
                    {symptom}
                  </Badge>
                ))}
              </div>
            )}
          </Card>

          {/* Additional Notes */}
          <Card className="p-4">
            <Label>Additional Notes</Label>
            <Textarea
              value={videoData.notes}
              onChange={(e) => updateVideoData("notes", e.target.value)}
              placeholder="Any additional context about this video..."
              rows={3}
              className="mt-2"
            />
          </Card>

          {/* Warning for seizure videos */}
          {videoData.video_type === "Seizure event" && (
            <Card className="p-4 bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-1">
                    Important: Seizure Safety
                  </h4>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    If this was a prolonged seizure (&gt;5 minutes) or you're concerned, contact your doctor immediately.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              variant="hero" 
              onClick={handleComplete}
              disabled={!videoData.video_type}
            >
              Save Video Log
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
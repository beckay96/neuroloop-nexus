import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  ArrowLeft, Send, Paperclip, FileText, Image as ImageIcon, 
  TestTube, Sparkles, MoreVertical, Phone, Video, Archive
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import MessageComposer from "./MessageComposer";
import FormBuilder from "./FormBuilder";
import AttachmentManager from "./AttachmentManager";

interface Message {
  message_id: string;
  sender_type: 'clinician' | 'patient' | 'system' | 'ai';
  sender_name: string;
  content: string;
  sent_at: string;
  is_read: boolean;
  is_urgent: boolean;
  message_type: 'text' | 'form' | 'form_response' | 'system' | 'attachment';
  ai_summary?: string;
  ai_sentiment?: string;
  ai_requires_action?: boolean;
  ai_action_items?: string[];
  attachments?: any[];
  form_data?: any;
}

interface ConversationThreadProps {
  conversation: {
    conversation_id: string;
    patient_name: string;
    patient_avatar: string;
    patient_id: string;
    subject: string;
    ai_summary?: string;
  };
  onBack: () => void;
}

export default function ConversationThread({ conversation, onBack }: ConversationThreadProps) {
  const { toast } = useToast();
  const [messageText, setMessageText] = useState("");
  const [showFormBuilder, setShowFormBuilder] = useState(false);
  const [showAttachmentManager, setShowAttachmentManager] = useState(false);
  const [attachmentType, setAttachmentType] = useState<'photo' | 'test_result' | null>(null);

  // Mock messages - replace with real API
  const mockMessages: Message[] = [
    {
      message_id: '1',
      sender_type: 'system',
      sender_name: 'System',
      content: 'Conversation started',
      sent_at: '2025-09-28 10:00 AM',
      is_read: true,
      is_urgent: false,
      message_type: 'system'
    },
    {
      message_id: '2',
      sender_type: 'clinician',
      sender_name: 'Dr. Wilson',
      content: 'Hi Sarah, how have you been feeling since your last visit? Any changes in your symptoms?',
      sent_at: '2025-09-28 10:05 AM',
      is_read: true,
      is_urgent: false,
      message_type: 'text'
    },
    {
      message_id: '3',
      sender_type: 'patient',
      sender_name: conversation.patient_name,
      content: 'Hi Doctor, I\'ve been mostly okay but had a seizure yesterday morning. It was shorter than usual though.',
      sent_at: '2025-09-28 2:30 PM',
      is_read: true,
      is_urgent: false,
      message_type: 'text',
      ai_summary: 'Patient reports breakthrough seizure, shorter duration than baseline',
      ai_sentiment: 'concerning',
      ai_requires_action: true,
      ai_action_items: ['Review medication adherence', 'Check blood levels', 'Consider dose adjustment']
    },
    {
      message_id: '4',
      sender_type: 'ai',
      sender_name: 'AI Assistant',
      content: '🤖 AI Analysis: Patient reported a breakthrough seizure. Consider reviewing recent medication adherence and blood levels. Recommended actions have been flagged.',
      sent_at: '2025-09-28 2:31 PM',
      is_read: true,
      is_urgent: false,
      message_type: 'system'
    },
    {
      message_id: '5',
      sender_type: 'clinician',
      sender_name: 'Dr. Wilson',
      content: 'Thank you for letting me know. I see from your tracking that you\'ve been very consistent with your medication. Let\'s check your recent blood levels and I may need to adjust your dosage.',
      sent_at: '2025-09-28 4:15 PM',
      is_read: true,
      is_urgent: false,
      message_type: 'text'
    },
    {
      message_id: '6',
      sender_type: 'patient',
      sender_name: conversation.patient_name,
      content: 'I had another seizure this morning. Should I increase my medication?',
      sent_at: '5 min ago',
      is_read: false,
      is_urgent: true,
      message_type: 'text',
      ai_summary: 'URGENT: Second seizure in short timeframe. Patient asking about medication adjustment.',
      ai_sentiment: 'concerning',
      ai_requires_action: true,
      ai_action_items: ['Immediate response required', 'Assess seizure cluster risk', 'Emergency protocol if needed']
    }
  ];

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    toast({
      title: "Message Sent",
      description: "Your message has been delivered to the patient.",
    });
    setMessageText("");
  };

  const handleSendForm = () => {
    setShowFormBuilder(true);
  };

  const handleAttachPhoto = () => {
    setAttachmentType('photo');
    setShowAttachmentManager(true);
  };

  const handleAttachTestResult = () => {
    setAttachmentType('test_result');
    setShowAttachmentManager(true);
  };

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case 'concerning': return 'text-red-600 dark:text-red-400';
      case 'negative': return 'text-yellow-600 dark:text-yellow-400';
      case 'positive': return 'text-green-600 dark:text-green-400';
      default: return 'text-muted-foreground';
    }
  };

  if (showFormBuilder) {
    return (
      <FormBuilder
        conversationId={conversation.conversation_id}
        patientId={conversation.patient_id}
        onClose={() => setShowFormBuilder(false)}
        onSent={() => {
          setShowFormBuilder(false);
          toast({
            title: "Form Sent",
            description: "Custom form has been sent to the patient.",
          });
        }}
      />
    );
  }

  if (showAttachmentManager) {
    return (
      <AttachmentManager
        conversationId={conversation.conversation_id}
        patientId={conversation.patient_id}
        attachmentType={attachmentType}
        onClose={() => {
          setShowAttachmentManager(false);
          setAttachmentType(null);
        }}
        onAttached={() => {
          setShowAttachmentManager(false);
          setAttachmentType(null);
          toast({
            title: "Attachment Sent",
            description: "File has been attached to the conversation.",
          });
        }}
      />
    );
  }

  return (
    <div className="h-full flex flex-col">
      <Card className="medical-card flex-1 flex flex-col">
        {/* Header */}
        <CardHeader className="border-b">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary/10 text-primary">
                {conversation.patient_avatar}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <CardTitle className="text-base">{conversation.patient_name}</CardTitle>
              <p className="text-sm text-muted-foreground">{conversation.subject}</p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Video className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Archive className="h-4 w-4 mr-2" />
                    Archive Conversation
                  </DropdownMenuItem>
                  <DropdownMenuItem>View Patient Record</DropdownMenuItem>
                  <DropdownMenuItem>Export Conversation</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* AI Conversation Summary */}
          {conversation.ai_summary && (
            <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-blue-600 dark:text-blue-400 mb-1">
                    AI Conversation Summary
                  </h4>
                  <p className="text-xs text-muted-foreground">{conversation.ai_summary}</p>
                </div>
              </div>
            </div>
          )}
        </CardHeader>

        {/* Messages */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {mockMessages.map((message) => (
            <div key={message.message_id}>
              {/* Regular Message */}
              <div
                className={`flex ${
                  message.sender_type === 'clinician' ? 'justify-end' : 'justify-start'
                } ${message.sender_type === 'system' || message.sender_type === 'ai' ? 'justify-center' : ''}`}
              >
                {message.sender_type === 'system' || message.sender_type === 'ai' ? (
                  <div className="max-w-md text-center">
                    <Badge variant="outline" className="text-xs">
                      {message.content}
                    </Badge>
                  </div>
                ) : (
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.sender_type === 'clinician'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    } ${message.is_urgent ? 'ring-2 ring-red-500' : ''}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold">{message.sender_name}</span>
                      {message.is_urgent && (
                        <Badge variant="destructive" className="text-xs">Urgent</Badge>
                      )}
                    </div>
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs opacity-70 mt-2 block">{message.sent_at}</span>
                  </div>
                )}
              </div>

              {/* AI Analysis for Patient Messages */}
              {message.sender_type === 'patient' && message.ai_requires_action && (
                <div className="mt-2 ml-12 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg max-w-[70%]">
                  <div className="flex items-start gap-2">
                    <Sparkles className="h-4 w-4 text-yellow-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-semibold text-yellow-600 dark:text-yellow-400 mb-1">
                        AI Analysis
                      </h5>
                      {message.ai_summary && (
                        <p className="text-xs mb-2">{message.ai_summary}</p>
                      )}
                      {message.ai_action_items && message.ai_action_items.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold mb-1">Suggested Actions:</p>
                          <ul className="text-xs space-y-1">
                            {message.ai_action_items.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-1">
                                <span>•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>

        {/* Message Composer */}
        <div className="border-t p-4">
          <div className="flex gap-2 mb-3">
            <Button variant="outline" size="sm" onClick={handleSendForm}>
              <FileText className="h-4 w-4 mr-2" />
              Send Form
            </Button>
            <Button variant="outline" size="sm" onClick={handleAttachTestResult}>
              <TestTube className="h-4 w-4 mr-2" />
              Share Results
            </Button>
            <Button variant="outline" size="sm" onClick={handleAttachPhoto}>
              <ImageIcon className="h-4 w-4 mr-2" />
              Attach Photo
            </Button>
          </div>

          <div className="flex gap-2">
            <Textarea
              placeholder="Type your message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="min-h-[80px] resize-none"
            />
            <Button onClick={handleSendMessage} size="icon" className="shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </Card>
    </div>
  );
}

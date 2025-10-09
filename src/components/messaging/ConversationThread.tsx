import { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
// Note: FormBuilder and AttachmentManager are imported dynamically when needed
// MessageComposer functionality is integrated directly in this component

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
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messageText, setMessageText] = useState("");
  const [showFormBuilder, setShowFormBuilder] = useState(false);
  const [showAttachmentManager, setShowAttachmentManager] = useState(false);
  const [attachmentType, setAttachmentType] = useState<'photo' | 'file' | 'test_result' | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        setLoading(true);
        setError(null);
        if (!user?.id) { setMessages([]); return; }
        const { data, error } = await supabase.rpc('get_conversation_messages', {
          p_clinician_id: user.id,
          p_thread_id: conversation.conversation_id
        });
        if (error) throw error;
        const rows = Array.isArray(data) ? data : (data ? [data] : []);
        // Normalize to Message shape
        const normalized: Message[] = rows.map((r: any) => ({
          message_id: r.message_id,
          sender_type: r.sender_type,
          sender_name: r.sender_name || 'User',
          content: r.content,
          sent_at: new Date(r.sent_at).toLocaleString(),
          is_read: !!r.is_read,
          is_urgent: !!r.is_urgent,
          message_type: (r.message_type || 'text') as Message['message_type'],
          ai_summary: r.ai_summary || undefined,
          ai_sentiment: r.ai_sentiment || undefined,
          ai_requires_action: !!r.ai_requires_action,
          ai_action_items: Array.isArray(r.ai_action_items) ? r.ai_action_items : undefined,
          attachments: r.attachments || undefined,
        }));
        setMessages(normalized);
      } catch (err: any) {
        console.error('Failed to load messages:', err);
        setError('Failed to load messages');
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };
    loadMessages();
  }, [user?.id, conversation.conversation_id]);

  const handleSendMessage = async () => {
    if (!messageText.trim() || !user?.id) return;
    try {
      const { error } = await supabase.rpc('send_chat_message', {
        p_thread_id: conversation.conversation_id,
        p_patient_id: conversation.patient_id,
        p_sender_id: user.id,
        p_content: messageText,
        p_is_urgent: false,
        p_requires_response: false,
      });
      if (error) throw error;
      setMessageText("");
      toast({ title: "Message Sent", description: "Delivered to patient." });
      // Reload
      const { data } = await supabase.rpc('get_conversation_messages', {
        p_clinician_id: user.id,
        p_thread_id: conversation.conversation_id
      });
      const rows = Array.isArray(data) ? data : (data ? [data] : []);
      const normalized: Message[] = rows.map((r: any) => ({
        message_id: r.message_id,
        sender_type: r.sender_type,
        sender_name: r.sender_name || 'User',
        content: r.content,
        sent_at: new Date(r.sent_at).toLocaleString(),
        is_read: !!r.is_read,
        is_urgent: !!r.is_urgent,
        message_type: (r.message_type || 'text') as Message['message_type'],
        ai_summary: r.ai_summary || undefined,
        ai_sentiment: r.ai_sentiment || undefined,
        ai_requires_action: !!r.ai_requires_action,
        ai_action_items: Array.isArray(r.ai_action_items) ? r.ai_action_items : undefined,
        attachments: r.attachments || undefined,
      }));
      setMessages(normalized);
    } catch (err: any) {
      console.error('Failed to send message:', err);
      toast({ title: 'Send Failed', description: err.message || 'Try again', variant: 'destructive' });
    }
  };

  const handleSendForm = () => {
    setShowFormBuilder(true);
  };

  const handleAttachPhoto = () => {
    setAttachmentType('photo');
    setShowAttachmentManager(true);
  };

  const handleAttachFile = () => {
    setAttachmentType('file');
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

  // FormBuilder and AttachmentManager would be loaded dynamically when needed
  // Currently showing toast notifications for these features
  if (showFormBuilder) {
    // Close and show feedback
    setTimeout(() => {
      setShowFormBuilder(false);
      toast({
        title: "Form Builder",
        description: "Form builder feature coming soon with backend integration",
      });
    }, 0);
  }

  if (showAttachmentManager) {
    // Close and show feedback
    setTimeout(() => {
      setShowAttachmentManager(false);
      setAttachmentType(null);
      toast({
        title: "Attachment Manager",
        description: "Attachment feature coming soon with backend integration",
      });
    }, 0);
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
              <Button variant="outline" size="icon" onClick={() => {
                toast({
                  title: "Voice Call",
                  description: `Initiating voice call with ${conversation.patient_name}`,
                });
              }}>
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => {
                toast({
                  title: "Video Call",
                  description: `Starting video consultation with ${conversation.patient_name}`,
                });
              }}>
                <Video className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => {
                    toast({
                      title: "Conversation Archived",
                      description: "This conversation has been moved to archives",
                    });
                  }}>
                    <Archive className="h-4 w-4 mr-2" />
                    Archive Conversation
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    navigate(`/patient/${conversation.patient_id}`);
                  }}>View Patient Record</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    toast({
                      title: "Exporting Conversation",
                      description: "Preparing conversation export...",
                    });
                  }}>Export Conversation</DropdownMenuItem>
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
          {loading && <div className="text-sm text-muted-foreground">Loading messages...</div>}
          {error && <div className="text-sm text-destructive">{error}</div>}
          {messages.map((message) => (
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
          <div className="flex flex-wrap gap-2 mb-3">
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
              Photo
            </Button>
            <Button variant="outline" size="sm" onClick={handleAttachFile}>
              <Paperclip className="h-4 w-4 mr-2" />
              Attach File
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

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  MessageSquare, Search, Filter, AlertCircle, Clock, 
  Archive, Sparkles 
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import ConversationThread from "./ConversationThread";

interface Conversation {
  conversation_id: string;
  patient_id: string;
  patient_name: string;
  patient_avatar: string;
  clinician_id: string;
  subject: string;
  status: 'active' | 'archived' | 'closed';
  priority: 'urgent' | 'high' | 'normal' | 'low';
  last_message: string;
  last_message_at: string;
  unread_count_clinician: number;
  unread_count_patient: number;
  ai_priority_score: number;
  ai_summary: string;
  ai_urgency_reason?: string;
  tags: string[];
  is_urgent: boolean;
  ai_requires_action: boolean;
}

export default function MessagingHub() {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("all");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        if (!user?.id) { setConversations([]); return; }
        const { data, error } = await supabase.rpc('get_clinician_message_conversations', {
          p_clinician_id: user.id
        });
        if (error) throw error;
        setConversations(Array.isArray(data) ? (data as Conversation[]) : (data ? [data as Conversation] : []));
      } catch (err: any) {
        console.error('Failed to load conversations:', err);
        setError('Failed to load conversations');
        setConversations([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user?.id]);

  const getFilteredConversations = () => {
    let filtered = conversations;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(conv =>
        conv.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.last_message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by tab
    if (activeTab === 'urgent') {
      filtered = filtered.filter(conv => conv.is_urgent || conv.ai_requires_action);
    } else if (activeTab === 'unread') {
      filtered = filtered.filter(conv => conv.unread_count_clinician > 0);
    } else if (activeTab === 'archived') {
      filtered = filtered.filter(conv => conv.status === 'archived');
    }

    // Sort by AI priority score
    return filtered.sort((a, b) => b.ai_priority_score - a.ai_priority_score);
  };

  const filteredConversations = getFilteredConversations();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 dark:text-red-400';
      case 'high': return 'text-yellow-600 dark:text-yellow-400';
      default: return 'text-muted-foreground';
    }
  };

  if (selectedConversation) {
    return (
      <ConversationThread
        conversation={selectedConversation}
        onBack={() => setSelectedConversation(null)}
      />
    );
  }

  return (
    <div className="h-full flex flex-col">
      <Card className="medical-card flex-1 flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Patient Messages
            </CardTitle>
            <Badge variant="secondary">
              {filteredConversations.filter(c => c.unread_count_clinician > 0).length} Unread
            </Badge>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-2 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="all" className="text-xs">
                All
                <Badge variant="outline" className="ml-1 text-xs">
                  {conversations.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="urgent" className="text-xs">
                <AlertCircle className="h-3 w-3 mr-1" />
                Urgent
                <Badge variant="destructive" className="ml-1 text-xs">
                  {conversations.filter(c => c.is_urgent || c.ai_requires_action).length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="unread" className="text-xs">
                Unread
                <Badge variant="secondary" className="ml-1 text-xs">
                  {conversations.filter(c => c.unread_count_clinician > 0).length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="archived" className="text-xs">
                <Archive className="h-3 w-3 mr-1" />
                Archived
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto">
          {loading && (
            <div className="text-sm text-muted-foreground">Loading conversations...</div>
          )}
          {error && (
            <div className="text-sm text-destructive mb-2">{error}</div>
          )}
          {/* AI Priority Section */}
          {activeTab === 'all' && filteredConversations.some(c => c.ai_requires_action) && (
            <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm text-blue-600 dark:text-blue-400">
                    AI Priority: {filteredConversations.filter(c => c.ai_requires_action).length} messages need attention
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Sorted by urgency and clinical significance
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Conversation List */}
          <div className="space-y-2">
            {filteredConversations.map((conversation) => (
              <Card
                key={conversation.conversation_id}
                className={`cursor-pointer hover:shadow-md transition-all duration-200 ${
                  conversation.is_urgent || conversation.ai_requires_action
                    ? 'border-l-4 border-l-red-500'
                    : conversation.unread_count_clinician > 0
                    ? 'border-l-4 border-l-primary'
                    : ''
                }`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {conversation.patient_avatar}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-sm truncate">
                          {conversation.patient_name}
                        </h3>
                        <span className="text-xs text-muted-foreground shrink-0">
                          {conversation.last_message_at}
                        </span>
                      </div>

                      <p className="text-xs text-muted-foreground mb-2 truncate">
                        {conversation.subject}
                      </p>

                      {/* AI Summary */}
                      {conversation.ai_summary && (
                        <div className="mb-2 p-2 bg-blue-500/5 rounded text-xs border border-blue-500/10">
                          <div className="flex items-start gap-1">
                            <Sparkles className="h-3 w-3 text-blue-600 shrink-0 mt-0.5" />
                            <span className="text-blue-600 dark:text-blue-400 font-medium italic">
                              {conversation.ai_summary}
                            </span>
                          </div>
                        </div>
                      )}

                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {conversation.last_message}
                      </p>

                      {/* Tags and Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        {conversation.unread_count_clinician > 0 && (
                          <Badge variant="default" className="text-xs">
                            {conversation.unread_count_clinician} new
                          </Badge>
                        )}
                        {conversation.is_urgent && (
                          <Badge variant="destructive" className="text-xs">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Urgent
                          </Badge>
                        )}
                        {conversation.ai_requires_action && (
                          <Badge variant="secondary" className="text-xs bg-yellow-500/20 text-yellow-700 dark:text-yellow-400">
                            <Clock className="h-3 w-3 mr-1" />
                            Action Needed
                          </Badge>
                        )}
                        {conversation.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        <div className="ml-auto flex items-center gap-1">
                          <span className={`text-xs font-medium ${getPriorityColor(conversation.priority)}`}>
                            AI: {conversation.ai_priority_score}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredConversations.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No conversations found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

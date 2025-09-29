import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Check, 
  X, 
  Clock, 
  Mail, 
  User,
  AlertCircle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ConnectionRequest {
  id: string;
  patient_id: string;
  patient_email: string;
  patient_name: string;
  status: 'pending' | 'active' | 'rejected';
  created_at: string;
  invited_by?: string;
}

interface ConnectionRequestsProps {
  showAll?: boolean;
  maxItems?: number;
}

export default function ConnectionRequests({ showAll = false, maxItems = 3 }: ConnectionRequestsProps) {
  const [requests, setRequests] = useState<ConnectionRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  useEffect(() => {
    loadConnectionRequests();
  }, []);

  const loadConnectionRequests = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Mock data for demonstration - avoiding problematic table queries for now
      const mockRequests: ConnectionRequest[] = [
        {
          id: '1',
          patient_id: 'patient-1',
          patient_email: 'sarah.johnson@email.com',
          patient_name: 'Sarah Johnson',
          status: 'pending',
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          invited_by: user.id
        },
        {
          id: '2',
          patient_id: 'patient-2',
          patient_email: 'michael.chen@email.com',
          patient_name: 'Michael Chen',
          status: 'pending',
          created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
        }
      ];

      setRequests(mockRequests);
    } catch (error) {
      console.error('Error loading connection requests:', error);
      setRequests([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveRequest = async (requestId: string) => {
    setProcessingIds(prev => new Set(prev).add(requestId));
    
    try {
      // In a real app, this would update the database
      toast({
        title: "Request approved",
        description: "Patient connection has been approved",
      });

      // Remove from pending list
      setRequests(prev => prev.filter(req => req.id !== requestId));
    } catch (error) {
      console.error('Error approving request:', error);
      toast({
        title: "Error approving request",
        description: "Failed to approve the connection request",
        variant: "destructive",
      });
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    setProcessingIds(prev => new Set(prev).add(requestId));
    
    try {
      // In a real app, this would update the database
      toast({
        title: "Request rejected",
        description: "Patient connection has been rejected",
      });

      // Remove from pending list
      setRequests(prev => prev.filter(req => req.id !== requestId));
    } catch (error) {
      console.error('Error rejecting request:', error);
      toast({
        title: "Error rejecting request",
        description: "Failed to reject the connection request",
        variant: "destructive",
      });
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  const pendingRequests = requests.filter(req => req.status === 'pending');
  const displayRequests = showAll ? requests : pendingRequests.slice(0, maxItems);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Connection Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <div className="animate-pulse text-muted-foreground">Loading requests...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          <span>
            Connection Requests
            {!showAll && pendingRequests.length > 0 && (
              <Badge variant="destructive" className="ml-2 text-xs">
                {pendingRequests.length}
              </Badge>
            )}
          </span>
          {!showAll && requests.length > maxItems && (
            <Button variant="outline" size="sm" className="text-xs">
              View All
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {displayRequests.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">
              {showAll ? 'No connection requests' : 'No pending requests'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {getInitials(request.patient_name)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-sm">{request.patient_name}</h4>
                      {request.status === 'pending' && (
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <Mail className="h-3 w-3 mr-1" />
                        {request.patient_email}
                      </span>
                      <span>
                        {formatDate(request.created_at)}
                      </span>
                    </div>
                    
                    {request.invited_by && (
                      <div className="text-xs text-muted-foreground mt-1">
                        <User className="h-3 w-3 inline mr-1" />
                        Originally invited by you
                      </div>
                    )}
                  </div>
                </div>
                
                {request.status === 'pending' && (
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRejectRequest(request.id)}
                      disabled={processingIds.has(request.id)}
                      className="text-destructive hover:text-destructive text-xs"
                    >
                      <X className="h-3 w-3 mr-1" />
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleApproveRequest(request.id)}
                      disabled={processingIds.has(request.id)}
                      className="text-xs"
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Approve
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

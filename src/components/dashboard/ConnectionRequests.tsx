import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AlertCircle, Clock, Mail, User, X, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { PostgrestError } from "@supabase/supabase-js";

interface ConnectionRequest {
  id: string;
  clinician_id: string;
  patient_email: string;
  patient_user_id?: string;
  patient_name?: string;
  status: 'pending' | 'accepted' | 'expired' | 'cancelled';
  invited_at: string;
  expires_at?: string;
  accepted_at?: string;
  cancelled_at?: string;
}

interface ConnectionRequestsProps {
  showAll?: boolean;
  maxItems?: number;
}

export default function ConnectionRequests({ showAll = false, maxItems = 5 }: ConnectionRequestsProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [requests, setRequests] = useState<ConnectionRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
  const [showAllState, setShowAllState] = useState(showAll);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      loadConnectionRequests(user.id);
    } else {
      setRequests([]);
      setIsLoading(false);
    }
  }, [user?.id]);

  const loadConnectionRequests = async (clinicianId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: rpcError } = await supabase.rpc('get_clinician_connection_requests', {
        p_clinician_id: clinicianId
      });

      if (rpcError) throw rpcError;

      const fetchedRequests: ConnectionRequest[] = Array.isArray(data)
        ? data.map((row: any) => {
            const status = (row.status ?? 'pending') as ConnectionRequest['status'];

            return {
              id: row.id,
              clinician_id: row.clinician_id,
              patient_email: row.patient_email,
              patient_user_id: row.patient_user_id ?? undefined,
              patient_name: row.patient_name ?? row.patient_email,
              status,
              invited_at: row.invited_at,
              expires_at: row.expires_at ?? undefined,
              accepted_at: row.accepted_at ?? undefined,
              cancelled_at: row.cancelled_at ?? undefined
            } satisfies ConnectionRequest;
          })
        : [];

      setRequests(fetchedRequests);
    } catch (err: any) {
      console.error('Error loading connection requests:', err);
      const message = (err as PostgrestError)?.message || err?.message || 'Failed to load connection requests';
      setError(message);
      setRequests([]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateRequestStatus = async (requestId: string, nextStatus: 'accepted' | 'cancelled') => {
    setProcessingIds(prev => new Set(prev).add(requestId));

    try {
      const now = new Date().toISOString();

      const updates = nextStatus === 'accepted'
        ? { status: 'accepted' as const, accepted_at: now }
        : { status: 'cancelled' as const, cancelled_at: now };

      const { error } = await supabase
        .from('patient_invitations')
        .update(updates)
        .eq('id', requestId)
        .eq('status', 'pending');

      if (error) throw error;

      setRequests(prev => prev.map(req => (
        req.id === requestId
          ? { ...req, ...updates }
          : req
      )));

      toast({
        title: nextStatus === 'accepted' ? "Request Approved" : "Request Cancelled",
        description: nextStatus === 'accepted'
          ? "Patient connection approved successfully."
          : "Patient invitation cancelled.",
      });
    } catch (err: any) {
      console.error('Error updating connection request:', err);
      toast({
        title: "Update Failed",
        description: err.message || 'Please try again',
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

  const pendingRequests = useMemo(() => requests.filter(req => req.status === 'pending'), [requests]);
  const displayRequests = showAllState ? requests : pendingRequests.slice(0, maxItems);

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
    if (!name) return "?";
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Connection Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-muted-foreground">
            Loading connection requests...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Connection Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-muted-foreground">
            <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">{error}</p>
            {user?.id && (
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => loadConnectionRequests(user.id)}
              >
                Retry
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Connection Requests</CardTitle>
      </CardHeader>
      <CardContent>
        {displayRequests.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">
              {pendingRequests.length === 0
                ? 'No pending requests. Invite patients to build your cohort.'
                : 'No connection requests to display.'}
            </p>
            <Button variant="outline" size="sm" className="mt-4" onClick={() => setShowAllState(false)}>
              Back to Pending
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {displayRequests.map((request) => {
              const displayStatus = request.status === 'pending' ? 'Pending Review' : request.status.charAt(0).toUpperCase() + request.status.slice(1);
              const statusBadgeVariant = request.status === 'pending'
                ? 'outline'
                : request.status === 'accepted'
                ? 'default'
                : 'destructive';

              return (
                <div
                  key={request.id}
                  className="bg-card border border-border/50 rounded-lg p-4 hover:shadow-md hover:border-border transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                      <Avatar className="h-10 w-10 shrink-0">
                        <AvatarFallback className="text-sm font-medium bg-primary/10 text-primary">
                          {getInitials(request.patient_name || request.patient_email)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <h4 className="font-semibold text-base text-foreground truncate">
                            {request.patient_name || request.patient_email}
                          </h4>
                          <Badge variant={statusBadgeVariant} className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {displayStatus}
                          </Badge>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground mb-2">
                          <span className="flex items-center">
                            <Mail className="h-3 w-3 mr-1 shrink-0" />
                            <span className="truncate">{request.patient_email}</span>
                          </span>
                          <span className="flex items-center">
                            <span className="font-medium">Invited:</span> {formatDate(request.invited_at)}
                          </span>
                          {request.expires_at && (
                            <span className="flex items-center">
                              <span className="font-medium">Expires:</span> {formatDate(request.expires_at)}
                            </span>
                          )}
                        </div>

                        {request.accepted_at && (
                          <div className="text-sm text-muted-foreground">
                            <User className="h-3 w-3 inline mr-1" />
                            Accepted on {formatDate(request.accepted_at)}
                          </div>
                        )}
                        {/* cancelled/expired don't show timestamps beyond invited_at; UI keeps simple */}
                      </div>
                    </div>

                    {request.status === 'pending' && (
                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateRequestStatus(request.id, 'cancelled')}
                          disabled={processingIds.has(request.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 text-sm"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => updateRequestStatus(request.id, 'accepted')}
                          disabled={processingIds.has(request.id)}
                          className="text-sm bg-primary hover:bg-primary/90"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

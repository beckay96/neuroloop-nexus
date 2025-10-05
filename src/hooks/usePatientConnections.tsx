import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface PatientConnection {
  id: string;
  patient_id: string;
  clinician_id: string;
  status: string;
  access_expires_at?: string;
  connected_at?: string;
  patient_profile?: {
    first_name?: string;
    last_name?: string;
  };
}

export interface PatientInvitation {
  id: string;
  clinician_id: string;
  patient_email: string;
  invitation_token: string;
  status: string;
  invited_at: string;
  expires_at: string;
  accepted_at?: string;
}

export const usePatientConnections = (clinicianId?: string) => {
  const [connections, setConnections] = useState<PatientConnection[]>([]);
  const [invitations, setInvitations] = useState<PatientInvitation[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchConnections = async () => {
    if (!clinicianId) return;

    try {
      const { data, error } = await supabase
        .from('patient_clinician_connections')
        .select(`
          *,
          patient_onboarding_data!inner(first_name, last_name)
        `)
        .eq('clinician_id', clinicianId)
        .order('connected_at', { ascending: false });

      if (error) throw error;
      
      // Map the data to include patient_profile
      const mappedData = (data || []).map(conn => ({
        ...conn,
        patient_profile: {
          first_name: (conn as any).patient_onboarding_data?.first_name,
          last_name: (conn as any).patient_onboarding_data?.last_name
        }
      }));
      
      setConnections(mappedData);
    } catch (error) {
      console.error('Error fetching connections:', error);
    }
  };

  const fetchInvitations = async () => {
    if (!clinicianId) return;

    try {
      const { data, error } = await supabase
        .from('patient_invitations')
        .select('*')
        .eq('clinician_id', clinicianId)
        .order('invited_at', { ascending: false });

      if (error) throw error;
      setInvitations(data || []);
    } catch (error) {
      console.error('Error fetching invitations:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPatientData = async (patientId: string, dataType: 'seizures' | 'medications' | 'symptoms') => {
    try {
      let tableName = '';
      if (dataType === 'seizures') tableName = 'seizure_logs';
      else if (dataType === 'medications') tableName = 'medication_logs';
      else if (dataType === 'symptoms') tableName = 'symptom_logs';

      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('user_id', patientId)
        .order('log_date', { ascending: false })
        .limit(10);

      if (error) throw error;
      return { success: true, data };
    } catch (error: any) {
      console.error(`Error fetching patient ${dataType}:`, error);
      return { success: false, error };
    }
  };

  const cancelInvitation = async (invitationId: string) => {
    try {
      const { error } = await supabase
        .from('patient_invitations')
        .update({ status: 'cancelled', cancelled_at: new Date().toISOString() })
        .eq('id', invitationId);

      if (error) throw error;

      setInvitations(invitations.map(inv => 
        inv.id === invitationId 
          ? { ...inv, status: 'cancelled' } 
          : inv
      ));
      
      toast({
        title: "Invitation Cancelled",
        description: "The patient invitation has been cancelled.",
      });

      return { success: true };
    } catch (error: any) {
      console.error('Error cancelling invitation:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to cancel invitation",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const removeConnection = async (connectionId: string) => {
    try {
      const { error } = await supabase
        .from('patient_clinician_connections')
        .update({ status: 'inactive' })
        .eq('id', connectionId);

      if (error) throw error;

      setConnections(connections.filter(conn => conn.id !== connectionId));
      
      toast({
        title: "Connection Removed",
        description: "Patient connection has been removed.",
      });

      return { success: true };
    } catch (error: any) {
      console.error('Error removing connection:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to remove connection",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  useEffect(() => {
    if (clinicianId) {
      fetchConnections();
      fetchInvitations();
    }
  }, [clinicianId]);

  return {
    connections,
    invitations,
    loading,
    getPatientData,
    cancelInvitation,
    removeConnection,
    refetchConnections: fetchConnections,
    refetchInvitations: fetchInvitations
  };
};

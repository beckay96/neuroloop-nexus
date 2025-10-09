import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ClinicianProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  title?: string;
  specialty?: string;
  license_number?: string;
  institution?: string;
  phone?: string;
  created_at?: string;
  updated_at?: string;
}

export const useClinicianProfile = (userId?: string) => {
  const [profile, setProfile] = useState<ClinicianProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProfile = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('clinician_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      console.error('Error fetching clinician profile:', error);
      if (error.code !== 'PGRST116') { // Ignore "no rows" error
        toast({
          title: "Error",
          description: "Failed to load clinician profile",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  // Format display name as "Dr. LastName"
  const getDisplayName = (): string => {
    if (!profile) return "Dr. User";
    
    const title = profile.title || "Dr.";
    const lastName = profile.last_name || profile.first_name || "User";
    
    return `${title} ${lastName}`;
  };

  // Get full name
  const getFullName = (): string => {
    if (!profile) return "";
    return `${profile.first_name || ""} ${profile.last_name || ""}`.trim();
  };

  return {
    profile,
    loading,
    getDisplayName,
    getFullName,
    refetch: fetchProfile
  };
};

import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface InvitePatientParams {
  email: string;
  message?: string;
}

interface InviteResponse {
  success: boolean;
  link?: string;
  message?: string;
  error?: string;
}

export function useInvitePatient() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const invitePatient = async ({ email, message }: InvitePatientParams): Promise<InviteResponse> => {
    setLoading(true);
    setError(null);

    try {
      // Get current session
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !sessionData.session) {
        throw new Error('Not authenticated');
      }

      const accessToken = sessionData.session.access_token;

      // Call Edge Function
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/invite_patient`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, message }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send invitation');
      }

      return {
        success: true,
        link: data.link,
        message: data.message
      };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send invitation';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    invitePatient,
    loading,
    error
  };
}

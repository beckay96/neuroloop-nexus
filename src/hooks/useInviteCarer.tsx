import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface InviteCarerParams {
  email: string;
  relationship_type: string;
}

interface InviteResponse {
  success: boolean;
  link?: string;
  message?: string;
  error?: string;
}

export function useInviteCarer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inviteCarer = async ({ email, relationship_type }: InviteCarerParams): Promise<InviteResponse> => {
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
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/invite_carer`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, relationship_type }),
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
    inviteCarer,
    loading,
    error
  };
}

import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface VerifyDOBParams {
  token: string;
  dateOfBirth: string; // YYYY-MM-DD format
}

interface VerifyResponse {
  success: boolean;
  message?: string;
  error?: string;
  attempts_remaining?: number;
  relationship_id?: string;
}

export function useVerifyCarerDOB() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verifyDOB = async ({ token, dateOfBirth }: VerifyDOBParams): Promise<VerifyResponse> => {
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
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify_carer_dob`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            token, 
            date_of_birth: dateOfBirth 
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        return {
          success: false,
          error: data.error || 'Verification failed',
          message: data.message,
          attempts_remaining: data.attempts_remaining
        };
      }

      return {
        success: true,
        message: data.message,
        relationship_id: data.relationship_id
      };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to verify date of birth';
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
    verifyDOB,
    loading,
    error
  };
}

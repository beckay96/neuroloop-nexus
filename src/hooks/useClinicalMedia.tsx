import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Clinical media (photos, videos, documents) - matches clinical_media table
export interface ClinicalMedia {
  id?: string;
  patient_id: string;
  media_type: string; // 'video', 'photo', 'document'
  storage_path: string;
  file_name: string;
  file_size?: number;
  uploaded_at: string;
  related_event_type?: string; // 'seizure', 'tremor', 'gait'
  related_event_id?: string;
  description?: string;
  shared_with_clinician?: boolean;
  shared_with_carers?: boolean;
  created_at?: string;
  updated_at?: string;
}

export const useClinicalMedia = (userId?: string) => {
  const [mediaFiles, setMediaFiles] = useState<ClinicalMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const fetchMedia = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('clinical_media')
        .select('*')
        .eq('patient_id', userId)
        .order('uploaded_at', { ascending: false });

      if (error) throw error;
      setMediaFiles(data || []);
    } catch (error) {
      console.error('Error fetching clinical media:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadMedia = async (
    file: File,
    mediaData: Omit<ClinicalMedia, 'id' | 'storage_path' | 'file_name' | 'file_size' | 'created_at' | 'updated_at'>
  ) => {
    setUploading(true);
    try {
      // Generate unique file path
      const timestamp = Date.now();
      const fileExt = file.name.split('.').pop();
      const fileName = `${timestamp}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${userId}/${fileName}`;

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('clinical-media')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Create database record
      // @ts-ignore - Table exists in private_health_info schema
      const { data, error } = await supabase
        .from('clinical_media')
        .insert({
          ...mediaData,
          storage_path: uploadData.path,
          file_name: file.name,
          file_size: file.size
        })
        .select()
        .single();

      if (error) throw error;

      setMediaFiles([data, ...mediaFiles]);
      
      toast({
        title: "Media Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });

      return { success: true, data };
    } catch (error: any) {
      console.error('Error uploading media:', error);
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload media file",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setUploading(false);
    }
  };

  const getMediaUrl = async (storagePath: string) => {
    try {
      const { data } = await supabase.storage
        .from('clinical-media')
        .createSignedUrl(storagePath, 3600); // 1 hour expiry

      return data?.signedUrl || null;
    } catch (error) {
      console.error('Error getting media URL:', error);
      return null;
    }
  };

  const updateMedia = async (id: string, updates: Partial<ClinicalMedia>) => {
    try {
      // @ts-ignore - Table exists in private_health_info schema
      const { data, error } = await supabase
        .from('clinical_media')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setMediaFiles(mediaFiles.map(media => media.id === id ? data : media));
      
      toast({
        title: "Media Updated",
        description: "Media information has been updated.",
      });

      return { success: true, data };
    } catch (error: any) {
      console.error('Error updating media:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update media",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const deleteMedia = async (id: string, storagePath: string) => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('clinical-media')
        .remove([storagePath]);

      if (storageError) throw storageError;

      // Delete database record
      // @ts-ignore - Table exists in private_health_info schema
      const { error } = await supabase
        .from('clinical_media')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMediaFiles(mediaFiles.filter(media => media.id !== id));
      
      toast({
        title: "Media Deleted",
        description: "Media file has been deleted.",
      });

      return { success: true };
    } catch (error: any) {
      console.error('Error deleting media:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete media",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  // Get media stats
  const getMediaStats = () => {
    if (mediaFiles.length === 0) return null;

    const videoCount = mediaFiles.filter(m => m.media_type === 'video').length;
    const photoCount = mediaFiles.filter(m => m.media_type === 'photo').length;
    const documentCount = mediaFiles.filter(m => m.media_type === 'document').length;
    const totalSize = mediaFiles.reduce((sum, m) => sum + (m.file_size || 0), 0);

    return {
      totalFiles: mediaFiles.length,
      videoCount,
      photoCount,
      documentCount,
      totalSizeMB: Math.round(totalSize / (1024 * 1024) * 10) / 10
    };
  };

  useEffect(() => {
    if (userId) {
      fetchMedia();
    }
  }, [userId]);

  return {
    mediaFiles,
    loading,
    uploading,
    uploadMedia,
    getMediaUrl,
    updateMedia,
    deleteMedia,
    getMediaStats,
    refetch: fetchMedia
  };
};

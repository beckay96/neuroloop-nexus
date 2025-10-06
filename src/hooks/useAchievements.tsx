import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// HIPAA COMPLIANT: Gamification data stored separately from PHI
export interface UserAchievement {
  id?: string;
  user_id: string;
  achievement_name: string;
  earned_at?: string;
  created_at?: string;
}

export interface AchievementTemplate {
  id?: string;
  name: string;
  description?: string;
  icon?: string;
  criteria?: Record<string, any>;
  points?: number;
  category?: string;
  created_at?: string;
}

export const useAchievements = (userId?: string) => {
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);
  const [availableAchievements, setAvailableAchievements] = useState<AchievementTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch user's earned achievements
  const fetchUserAchievements = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', userId)
        .order('earned_at', { ascending: false });

      if (error) throw error;
      setUserAchievements(data || []);
    } catch (error) {
      console.error('Error fetching user achievements:', error);
    }
  };

  // Fetch all available achievements
  const fetchAvailableAchievements = async () => {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('name');

      if (error) throw error;
      setAvailableAchievements(data || []);
    } catch (error) {
      console.error('Error fetching available achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  // Award achievement to user
  const awardAchievement = async (achievementName: string) => {
    if (!userId) return { success: false };

    try {
      // Check if already earned
      const existing = userAchievements.find(a => a.achievement_name === achievementName);
      if (existing) {
        return { success: false, message: 'Achievement already earned' };
      }

      const { data, error } = await supabase
        .from('user_achievements')
        .insert({
          user_id: userId,
          achievement_name: achievementName,
          earned_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      setUserAchievements([data, ...userAchievements]);
      
      // Find achievement details for toast
      const achievement = availableAchievements.find(a => a.name === achievementName);
      
      toast({
        title: "🎉 Achievement Unlocked!",
        description: achievement?.description || achievementName,
      });

      return { success: true, data };
    } catch (error: any) {
      console.error('Error awarding achievement:', error);
      return { success: false, error };
    }
  };

  // Check if user has earned achievement
  const hasAchievement = (achievementName: string): boolean => {
    return userAchievements.some(a => a.achievement_name === achievementName);
  };

  // Get achievement progress (for multi-level achievements)
  const getAchievementProgress = (achievementName: string) => {
    const earned = userAchievements.filter(a => 
      a.achievement_name.startsWith(achievementName)
    );
    return earned.length;
  };

  // Calculate total points
  const getTotalPoints = (): number => {
    return userAchievements.reduce((total, userAch) => {
      const achievement = availableAchievements.find(a => a.name === userAch.achievement_name);
      return total + (achievement?.points || 0);
    }, 0);
  };

  useEffect(() => {
    fetchAvailableAchievements();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserAchievements();
    }
  }, [userId]);

  return {
    userAchievements,
    availableAchievements,
    loading,
    awardAchievement,
    hasAchievement,
    getAchievementProgress,
    getTotalPoints,
    refetch: fetchUserAchievements
  };
};

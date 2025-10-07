import { supabase } from "@/integrations/supabase/client";

interface MedicationReminder {
  userId: string;
  medicationId: string;
  medicationName: string;
  dosage: string;
  time: string;
  isRescue: boolean;
}

export class MedicationReminderService {
  private static instance: MedicationReminderService;
  private reminders: Map<string, NodeJS.Timeout> = new Map();
  private criticalMedications = [
    'Levetiracetam',
    'Lamotrigine', 
    'Valproate',
    'Carbamazepine',
    'Phenytoin',
    'Diazepam',
    'Midazolam'
  ];

  private constructor() {
    this.initializeService();
  }

  static getInstance(): MedicationReminderService {
    if (!MedicationReminderService.instance) {
      MedicationReminderService.instance = new MedicationReminderService();
    }
    return MedicationReminderService.instance;
  }

  private async initializeService() {
    // Request notification permission on startup
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }

    // Load and schedule all reminders
    await this.loadAndScheduleReminders();

    // Check for missed medications every 5 minutes
    setInterval(() => this.checkMissedMedications(), 5 * 60 * 1000);
  }

  async loadAndScheduleReminders() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      // Get user's medications with times
      const { data: medications, error } = await supabase
        .schema('private_health_info')
        .from('user_medications')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true);

      if (error) throw error;

      // Clear existing reminders
      this.clearAllReminders();

      // Schedule new reminders
      medications?.forEach(med => {
        if (med.times && Array.isArray(med.times)) {
          med.times.forEach(time => {
            this.scheduleReminder({
              userId: user.id,
              medicationId: med.id,
              medicationName: med.medication_name || 'Medication',
              dosage: `${med.dosage_amount || ''} ${med.dosage_unit || ''}`.trim(),
              time: time,
              isRescue: this.isRescueMedication(med.medication_name)
            });
          });
        }
      });
    } catch (error) {
      console.error('Error loading medication reminders:', error);
    }
  }

  private isRescueMedication(name: string): boolean {
    const rescueMeds = ['Diazepam', 'Midazolam', 'Lorazepam', 'Clonazepam'];
    return rescueMeds.some(med => name?.toLowerCase().includes(med.toLowerCase()));
  }

  private isCriticalMedication(name: string): boolean {
    return this.criticalMedications.some(med => 
      name?.toLowerCase().includes(med.toLowerCase())
    );
  }

  private scheduleReminder(reminder: MedicationReminder) {
    const now = new Date();
    const [hours, minutes] = reminder.time.split(':').map(Number);
    
    const reminderTime = new Date();
    reminderTime.setHours(hours, minutes, 0, 0);
    
    // If time has passed today, schedule for tomorrow
    if (reminderTime <= now) {
      reminderTime.setDate(reminderTime.getDate() + 1);
    }
    
    const timeUntilReminder = reminderTime.getTime() - now.getTime();
    
    const timeoutId = setTimeout(() => {
      this.triggerReminder(reminder);
      // Reschedule for next day
      this.scheduleReminder(reminder);
    }, timeUntilReminder);
    
    // Store timeout ID for cleanup
    const key = `${reminder.medicationId}-${reminder.time}`;
    this.reminders.set(key, timeoutId);
  }

  private async triggerReminder(reminder: MedicationReminder) {
    const isCritical = this.isCriticalMedication(reminder.medicationName);
    
    // Show browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(
        isCritical ? '🚨 CRITICAL Medication Reminder' : '💊 Medication Reminder',
        {
          body: `Time to take ${reminder.medicationName} ${reminder.dosage}`,
          icon: '/icon-192x192.png',
          badge: '/badge-72x72.png',
          tag: `med-${reminder.medicationId}`,
          requireInteraction: isCritical, // Critical meds require interaction
          vibrate: isCritical ? [200, 100, 200, 100, 200] : [200, 100, 200],
          data: { medicationId: reminder.medicationId }
        }
      );

      notification.onclick = () => {
        // Mark as taken
        this.markMedicationTaken(reminder.medicationId);
        notification.close();
      };

      // Auto-close non-critical after 30 seconds
      if (!isCritical) {
        setTimeout(() => notification.close(), 30000);
      }
    }

    // Log reminder in database
    await this.logReminder(reminder);

    // If critical and not taken within 15 minutes, escalate
    if (isCritical) {
      setTimeout(() => this.escalateReminder(reminder), 15 * 60 * 1000);
    }
  }

  private async escalateReminder(reminder: MedicationReminder) {
    // Check if medication was taken
    const taken = await this.checkIfTaken(reminder.medicationId, reminder.time);
    
    if (!taken) {
      // Send alert to emergency contact
      await this.alertEmergencyContact(reminder);
      
      // Show urgent notification
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('⚠️ URGENT: Missed Critical Medication', {
          body: `${reminder.medicationName} was not taken at ${reminder.time}. Please take immediately or contact your doctor.`,
          requireInteraction: true,
          vibrate: [1000, 500, 1000, 500, 1000]
        });
      }
    }
  }

  private async checkIfTaken(medicationId: string, time: string): Promise<boolean> {
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('medication_logs')
      .select('taken')
      .eq('user_medication_id', medicationId)
      .eq('log_date', today)
      .eq('log_time', time)
      .single();
    
    return data?.taken || false;
  }

  private async markMedicationTaken(medicationId: string) {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const time = now.toTimeString().slice(0, 5);
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
      await supabase
        .from('medication_logs')
        .insert({
          user_id: user.id,
          user_medication_id: medicationId,
          log_date: today,
          log_time: time,
          taken: true
        });
    } catch (error) {
      console.error('Error marking medication as taken:', error);
    }
  }

  private async logReminder(reminder: MedicationReminder) {
    try {
      await supabase
        .from('notification_queue')
        .insert({
          user_id: reminder.userId,
          notification_type: 'medication_reminder',
          title: `Medication: ${reminder.medicationName}`,
          body: `Time to take ${reminder.dosage}`,
          priority: this.isCriticalMedication(reminder.medicationName) ? 'critical' : 'normal',
          scheduled_for: new Date().toISOString(),
          status: 'sent'
        });
    } catch (error) {
      console.error('Error logging reminder:', error);
    }
  }

  private async alertEmergencyContact(reminder: MedicationReminder) {
    try {
      // Get emergency contact
      const { data: contactData } = await supabase
        .from('patient_onboarding_data')
        .select('emergency_contact_name, emergency_contact_phone')
        .eq('user_id', reminder.userId)
        .single();

      if (contactData) {
        // In production, this would send SMS via Twilio
        console.error(`ALERT: Patient missed critical medication ${reminder.medicationName}`);
        
        // Log the alert
        await supabase
          .from('tracking_entries')
          .insert({
            user_id: reminder.userId,
            entry_date: new Date().toISOString().split('T')[0],
            entry_time: new Date().toTimeString().slice(0, 5),
            notes: `CRITICAL: Missed ${reminder.medicationName} - Emergency contact alerted`,
            mood: 'emergency'
          });
      }
    } catch (error) {
      console.error('Error alerting emergency contact:', error);
    }
  }

  async checkMissedMedications() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);
    const today = now.toISOString().split('T')[0];

    try {
      // Get all medications that should have been taken
      const { data: medications } = await supabase
        .schema('private_health_info')
        .from('user_medications')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true);

      for (const med of medications || []) {
        if (med.times && Array.isArray(med.times)) {
          for (const time of med.times) {
            if (time < currentTime) {
              // Check if taken
              const taken = await this.checkIfTaken(med.id, time);
              
              if (!taken && this.isCriticalMedication(med.medication_name)) {
                // Show missed medication alert
                if ('Notification' in window && Notification.permission === 'granted') {
                  new Notification('⚠️ Missed Medication', {
                    body: `You missed ${med.medication_name} at ${time}`,
                    requireInteraction: true
                  });
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error checking missed medications:', error);
    }
  }

  private clearAllReminders() {
    this.reminders.forEach(timeoutId => clearTimeout(timeoutId));
    this.reminders.clear();
  }

  destroy() {
    this.clearAllReminders();
  }
}

// Initialize service when module loads
if (typeof window !== 'undefined') {
  MedicationReminderService.getInstance();
}

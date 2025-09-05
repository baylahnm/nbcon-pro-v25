import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export interface NotificationData {
  id: string;
  title: string;
  body: string;
  type: 'job_invite' | 'job_update' | 'payment' | 'message' | 'system';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  data?: any;
  scheduledTime?: Date;
}

export interface NotificationSettings {
  jobInvites: boolean;
  jobUpdates: boolean;
  payments: boolean;
  messages: boolean;
  system: boolean;
  sound: boolean;
  vibration: boolean;
}

class NotificationService {
  private static instance: NotificationService;
  private notificationSettings: NotificationSettings = {
    jobInvites: true,
    jobUpdates: true,
    payments: true,
    messages: true,
    system: true,
    sound: true,
    vibration: true,
  };

  private constructor() {
    this.setupNotificationHandlers();
  }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  /**
   * Setup notification handlers and permissions
   */
  private async setupNotificationHandlers() {
    // Configure notification behavior
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: this.notificationSettings.sound,
        shouldSetBadge: true,
      }),
    });

    // Request permissions
    await this.requestPermissions();
  }

  /**
   * Request notification permissions
   */
  public async requestPermissions(): Promise<boolean> {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('Notification permission denied');
        return false;
      }

      // Configure notification channel for Android
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'NBCON Pro Notifications',
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#1B7A3E',
        });

        // Job invites channel
        await Notifications.setNotificationChannelAsync('job_invites', {
          name: 'Job Invites',
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#1B7A3E',
        });

        // Payment notifications channel
        await Notifications.setNotificationChannelAsync('payments', {
          name: 'Payment Notifications',
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF6B35',
        });

        // Message notifications channel
        await Notifications.setNotificationChannelAsync('messages', {
          name: 'Messages',
          importance: Notifications.AndroidImportance.DEFAULT,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#4A90E2',
        });
      }

      return true;
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
      return false;
    }
  }

  /**
   * Send immediate notification
   */
  public async sendNotification(notification: NotificationData): Promise<string | null> {
    try {
      const hasPermission = await this.checkPermissions();
      if (!hasPermission) {
        console.log('Notification permission not granted');
        return null;
      }

      const channelId = this.getChannelId(notification.type);
      
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: notification.title,
          body: notification.body,
          data: notification.data || {},
          sound: this.notificationSettings.sound,
          priority: this.getPriority(notification.priority),
        },
        trigger: notification.scheduledTime || null,
        ...(Platform.OS === 'android' && { channelId }),
      });

      return notificationId;
    } catch (error) {
      console.error('Error sending notification:', error);
      return null;
    }
  }

  /**
   * Send job invite notification
   */
  public async sendJobInviteNotification(
    jobTitle: string,
    clientName: string,
    budget: number,
    location: string
  ): Promise<string | null> {
    if (!this.notificationSettings.jobInvites) return null;

    return this.sendNotification({
      id: `job_invite_${Date.now()}`,
      title: 'New Job Invite',
      body: `${clientName} invited you to work on "${jobTitle}" for ${budget.toLocaleString()} SAR in ${location}`,
      type: 'job_invite',
      priority: 'high',
      data: {
        jobTitle,
        clientName,
        budget,
        location,
      },
    });
  }

  /**
   * Send job update notification
   */
  public async sendJobUpdateNotification(
    jobTitle: string,
    updateType: 'accepted' | 'rejected' | 'completed' | 'cancelled',
    engineerName?: string
  ): Promise<string | null> {
    if (!this.notificationSettings.jobUpdates) return null;

    const messages = {
      accepted: `Your job "${jobTitle}" has been accepted by ${engineerName}`,
      rejected: `Your job "${jobTitle}" has been rejected`,
      completed: `Your job "${jobTitle}" has been completed by ${engineerName}`,
      cancelled: `Your job "${jobTitle}" has been cancelled`,
    };

    return this.sendNotification({
      id: `job_update_${Date.now()}`,
      title: 'Job Update',
      body: messages[updateType],
      type: 'job_update',
      priority: 'normal',
      data: {
        jobTitle,
        updateType,
        engineerName,
      },
    });
  }

  /**
   * Send payment notification
   */
  public async sendPaymentNotification(
    type: 'received' | 'sent' | 'escrow_released' | 'refund',
    amount: number,
    description: string
  ): Promise<string | null> {
    if (!this.notificationSettings.payments) return null;

    const titles = {
      received: 'Payment Received',
      sent: 'Payment Sent',
      escrow_released: 'Escrow Released',
      refund: 'Refund Processed',
    };

    return this.sendNotification({
      id: `payment_${Date.now()}`,
      title: titles[type],
      body: `${description} - ${amount.toLocaleString()} SAR`,
      type: 'payment',
      priority: 'high',
      data: {
        type,
        amount,
        description,
      },
    });
  }

  /**
   * Send message notification
   */
  public async sendMessageNotification(
    senderName: string,
    message: string,
    jobTitle: string
  ): Promise<string | null> {
    if (!this.notificationSettings.messages) return null;

    return this.sendNotification({
      id: `message_${Date.now()}`,
      title: `New message from ${senderName}`,
      body: message.length > 50 ? `${message.substring(0, 50)}...` : message,
      type: 'message',
      priority: 'normal',
      data: {
        senderName,
        message,
        jobTitle,
      },
    });
  }

  /**
   * Send system notification
   */
  public async sendSystemNotification(
    title: string,
    body: string,
    priority: 'low' | 'normal' | 'high' | 'urgent' = 'normal'
  ): Promise<string | null> {
    if (!this.notificationSettings.system) return null;

    return this.sendNotification({
      id: `system_${Date.now()}`,
      title,
      body,
      type: 'system',
      priority,
      data: {},
    });
  }

  /**
   * Schedule notification for later
   */
  public async scheduleNotification(
    notification: NotificationData,
    triggerDate: Date
  ): Promise<string | null> {
    const scheduledNotification = {
      ...notification,
      scheduledTime: triggerDate,
    };

    return this.sendNotification(scheduledNotification);
  }

  /**
   * Cancel scheduled notification
   */
  public async cancelNotification(notificationId: string): Promise<void> {
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
    } catch (error) {
      console.error('Error cancelling notification:', error);
    }
  }

  /**
   * Cancel all notifications
   */
  public async cancelAllNotifications(): Promise<void> {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Error cancelling all notifications:', error);
    }
  }

  /**
   * Get notification settings
   */
  public getNotificationSettings(): NotificationSettings {
    return { ...this.notificationSettings };
  }

  /**
   * Update notification settings
   */
  public updateNotificationSettings(settings: Partial<NotificationSettings>): void {
    this.notificationSettings = {
      ...this.notificationSettings,
      ...settings,
    };
  }

  /**
   * Check if notifications are enabled
   */
  public async checkPermissions(): Promise<boolean> {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error checking notification permissions:', error);
      return false;
    }
  }

  /**
   * Get notification history
   */
  public async getNotificationHistory(): Promise<Notifications.Notification[]> {
    try {
      return await Notifications.getPresentedNotificationsAsync();
    } catch (error) {
      console.error('Error getting notification history:', error);
      return [];
    }
  }

  /**
   * Clear notification history
   */
  public async clearNotificationHistory(): Promise<void> {
    try {
      await Notifications.dismissAllNotificationsAsync();
    } catch (error) {
      console.error('Error clearing notification history:', error);
    }
  }

  /**
   * Get channel ID for notification type
   */
  private getChannelId(type: string): string {
    switch (type) {
      case 'job_invite':
        return 'job_invites';
      case 'payment':
        return 'payments';
      case 'message':
        return 'messages';
      default:
        return 'default';
    }
  }

  /**
   * Get priority level
   */
  private getPriority(priority: string): Notifications.AndroidNotificationPriority {
    switch (priority) {
      case 'urgent':
        return Notifications.AndroidNotificationPriority.MAX;
      case 'high':
        return Notifications.AndroidNotificationPriority.HIGH;
      case 'normal':
        return Notifications.AndroidNotificationPriority.DEFAULT;
      case 'low':
        return Notifications.AndroidNotificationPriority.LOW;
      default:
        return Notifications.AndroidNotificationPriority.DEFAULT;
    }
  }

  /**
   * Setup notification listeners
   */
  public setupNotificationListeners(
    onNotificationReceived: (notification: Notifications.Notification) => void,
    onNotificationResponse: (response: Notifications.NotificationResponse) => void
  ): void {
    // Listen for notifications received while app is running
    const subscription = Notifications.addNotificationReceivedListener(onNotificationReceived);

    // Listen for user interactions with notifications
    const responseSubscription = Notifications.addNotificationResponseReceivedListener(
      onNotificationResponse
    );

    // Return cleanup function
    return () => {
      subscription.remove();
      responseSubscription.remove();
    };
  }
}

export default NotificationService.getInstance();

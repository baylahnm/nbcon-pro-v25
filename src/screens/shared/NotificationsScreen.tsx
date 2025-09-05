import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Switch,
  Alert,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../constants';
import NotificationService, { NotificationSettings } from '../../services/notificationService';

interface NotificationItem {
  id: string;
  title: string;
  body: string;
  type: 'job_invite' | 'job_update' | 'payment' | 'message' | 'system';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  timestamp: Date;
  isRead: boolean;
  data?: any;
}

const NotificationsScreen: React.FC = () => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [settings, setSettings] = useState<NotificationSettings>({
    jobInvites: true,
    jobUpdates: true,
    payments: true,
    messages: true,
    system: true,
    sound: true,
    vibration: true,
  });
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'settings'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  useEffect(() => {
    loadNotifications();
    loadSettings();
  }, []);

  const loadNotifications = async () => {
    try {
      // Mock data - in real app, this would come from API
      const mockNotifications: NotificationItem[] = [
        {
          id: '1',
          title: 'New Job Invite',
          body: 'Ahmed Al-Rashid invited you to work on "Site Survey for NEOM Project" for 15,000 SAR',
          type: 'job_invite',
          priority: 'high',
          timestamp: new Date('2024-01-20T14:30:00'),
          isRead: false,
          data: {
            jobId: 'job_1',
            clientName: 'Ahmed Al-Rashid',
            budget: 15000,
          },
        },
        {
          id: '2',
          title: 'Payment Received',
          body: 'You received 8,000 SAR for MEP Design Review project',
          type: 'payment',
          priority: 'high',
          timestamp: new Date('2024-01-20T10:15:00'),
          isRead: true,
          data: {
            amount: 8000,
            projectTitle: 'MEP Design Review',
          },
        },
        {
          id: '3',
          title: 'Job Update',
          body: 'Your job "Safety Inspection" has been completed by Mohammed Al-Zahrani',
          type: 'job_update',
          priority: 'normal',
          timestamp: new Date('2024-01-19T16:45:00'),
          isRead: true,
          data: {
            jobId: 'job_3',
            status: 'completed',
            engineerName: 'Mohammed Al-Zahrani',
          },
        },
        {
          id: '4',
          title: 'New Message',
          body: 'Sarah Al-Mansouri sent you a message about Site Survey project',
          type: 'message',
          priority: 'normal',
          timestamp: new Date('2024-01-19T14:20:00'),
          isRead: false,
          data: {
            senderName: 'Sarah Al-Mansouri',
            jobTitle: 'Site Survey for NEOM Project',
          },
        },
        {
          id: '5',
          title: 'System Maintenance',
          body: 'Scheduled maintenance will occur tonight from 2 AM to 4 AM',
          type: 'system',
          priority: 'low',
          timestamp: new Date('2024-01-18T09:00:00'),
          isRead: true,
          data: {
            maintenanceType: 'scheduled',
            duration: '2 hours',
          },
        },
      ];

      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const loadSettings = () => {
    const currentSettings = NotificationService.getNotificationSettings();
    setSettings(currentSettings);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadNotifications();
    setIsRefreshing(false);
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  };

  const updateSettings = (key: keyof NotificationSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    NotificationService.updateNotificationSettings(newSettings);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'job_invite':
        return 'briefcase';
      case 'job_update':
        return 'refresh';
      case 'payment':
        return 'cash';
      case 'message':
        return 'chatbubble';
      case 'system':
        return 'settings';
      default:
        return 'notifications';
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'urgent') return COLORS.error;
    if (priority === 'high') return COLORS.warning;
    
    switch (type) {
      case 'job_invite':
        return COLORS.primary;
      case 'job_update':
        return COLORS.secondary;
      case 'payment':
        return COLORS.success;
      case 'message':
        return COLORS.accent;
      case 'system':
        return COLORS.light.textSecondary;
      default:
        return COLORS.light.textSecondary;
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return isArabic ? 'الآن' : 'Now';
    if (minutes < 60) return `${minutes}${isArabic ? 'د' : 'm'}`;
    if (hours < 24) return `${hours}${isArabic ? 'س' : 'h'}`;
    return `${days}${isArabic ? 'يوم' : 'd'}`;
  };

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case 'unread':
        return notifications.filter(notif => !notif.isRead);
      case 'all':
      default:
        return notifications;
    }
  };

  const renderNotification = ({ item }: { item: NotificationItem }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        { 
          backgroundColor: item.isRead ? theme.surface : COLORS.primary + '10',
          borderLeftColor: getNotificationColor(item.type, item.priority),
        }
      ]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <View style={[
            styles.notificationIcon,
            { backgroundColor: getNotificationColor(item.type, item.priority) + '20' }
          ]}>
            <Ionicons 
              name={getNotificationIcon(item.type) as any} 
              size={20} 
              color={getNotificationColor(item.type, item.priority)} 
            />
          </View>
          
          <View style={styles.notificationText}>
            <Text style={[styles.notificationTitle, { color: theme.text }]}>
              {item.title}
            </Text>
            <Text style={[styles.notificationBody, { color: theme.textSecondary }]}>
              {item.body}
            </Text>
          </View>
        </View>

        <View style={styles.notificationFooter}>
          <Text style={[styles.notificationTime, { color: theme.textSecondary }]}>
            {formatTime(item.timestamp)}
          </Text>
          
          {!item.isRead && (
            <View style={styles.unreadDot} />
          )}
        </View>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteNotification(item.id)}
      >
        <Ionicons name="close" size={16} color={theme.textSecondary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderSettings = () => (
    <View style={styles.settingsContainer}>
      <Text style={[styles.settingsTitle, { color: theme.text }]}>
        {isArabic ? 'إعدادات الإشعارات' : 'Notification Settings'}
      </Text>

      {Object.entries(settings).map(([key, value]) => (
        <View key={key} style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: theme.text }]}>
              {getText({
                en: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
                ar: getArabicSettingLabel(key),
              })}
            </Text>
            <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
              {getText(getSettingDescription(key))}
            </Text>
          </View>
          
          <Switch
            value={value}
            onValueChange={(newValue) => updateSettings(key as keyof NotificationSettings, newValue)}
            trackColor={{ false: theme.border, true: COLORS.primary + '40' }}
            thumbColor={value ? COLORS.primary : theme.textSecondary}
          />
        </View>
      ))}
    </View>
  );

  const getArabicSettingLabel = (key: string) => {
    const labels: { [key: string]: string } = {
      jobInvites: 'دعوات العمل',
      jobUpdates: 'تحديثات الوظائف',
      payments: 'المدفوعات',
      messages: 'الرسائل',
      system: 'النظام',
      sound: 'الصوت',
      vibration: 'الاهتزاز',
    };
    return labels[key] || key;
  };

  const getSettingDescription = (key: string) => {
    const descriptions: { [key: string]: { en: string; ar: string } } = {
      jobInvites: { en: 'Receive notifications for new job invites', ar: 'تلقي إشعارات لدعوات العمل الجديدة' },
      jobUpdates: { en: 'Get notified about job status changes', ar: 'تلقي إشعارات حول تغييرات حالة الوظائف' },
      payments: { en: 'Notifications for payment activities', ar: 'إشعارات لأنشطة المدفوعات' },
      messages: { en: 'Chat and message notifications', ar: 'إشعارات المحادثات والرسائل' },
      system: { en: 'System updates and maintenance alerts', ar: 'تحديثات النظام وتنبيهات الصيانة' },
      sound: { en: 'Play sound for notifications', ar: 'تشغيل الصوت للإشعارات' },
      vibration: { en: 'Vibrate for notifications', ar: 'الاهتزاز للإشعارات' },
    };
    return descriptions[key] || { en: '', ar: '' };
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'settings':
        return renderSettings();
      case 'all':
      case 'unread':
      default:
        const filteredNotifications = getFilteredNotifications();
        
        if (filteredNotifications.length === 0) {
          return (
            <View style={styles.emptyState}>
              <Ionicons 
                name={activeTab === 'unread' ? 'checkmark-circle' : 'notifications-off'} 
                size={64} 
                color={theme.textSecondary} 
              />
              <Text style={[styles.emptyTitle, { color: theme.text }]}>
                {isArabic 
                  ? (activeTab === 'unread' ? 'لا توجد إشعارات غير مقروءة' : 'لا توجد إشعارات')
                  : (activeTab === 'unread' ? 'No Unread Notifications' : 'No Notifications')
                }
              </Text>
              <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
                {isArabic 
                  ? 'ستظهر إشعاراتك هنا عند وصولها'
                  : 'Your notifications will appear here when they arrive'
                }
              </Text>
            </View>
          );
        }

        return (
          <FlatList
            data={filteredNotifications}
            renderItem={renderNotification}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.notificationsList}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                colors={[COLORS.primary]}
                tintColor={COLORS.primary}
              />
            }
          />
        );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          {isArabic ? 'الإشعارات' : 'Notifications'}
        </Text>
        {activeTab !== 'settings' && (
          <TouchableOpacity onPress={markAllAsRead}>
            <Text style={[styles.markAllText, { color: COLORS.primary }]}>
              {isArabic ? 'تعيين الكل كمقروء' : 'Mark All Read'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {[
          { id: 'all', title: { en: 'All', ar: 'الكل' }, count: notifications.length },
          { id: 'unread', title: { en: 'Unread', ar: 'غير مقروء' }, count: notifications.filter(n => !n.isRead).length },
          { id: 'settings', title: { en: 'Settings', ar: 'الإعدادات' }, count: 0 },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              {
                borderBottomColor: activeTab === tab.id ? COLORS.primary : 'transparent',
              },
            ]}
            onPress={() => setActiveTab(tab.id as any)}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: activeTab === tab.id ? COLORS.primary : theme.textSecondary,
                },
              ]}
            >
              {getText(tab.title)}
            </Text>
            {tab.count > 0 && (
              <View style={styles.tabBadge}>
                <Text style={styles.tabBadgeText}>
                  {tab.count > 99 ? '99+' : tab.count}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {renderTabContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.h2,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  markAllText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light.border,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 2,
    gap: SPACING.xs,
  },
  tabText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  tabBadge: {
    backgroundColor: COLORS.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.xs,
  },
  tabBadgeText: {
    color: 'white',
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  content: {
    flex: 1,
  },
  notificationsList: {
    padding: SPACING.lg,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderLeftWidth: 4,
    marginBottom: SPACING.sm,
    position: 'relative',
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  notificationBody: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 18,
  },
  notificationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationTime: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  deleteButton: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    padding: SPACING.xs,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  emptyTitle: {
    fontSize: TYPOGRAPHY.sizes.h4,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  emptySubtitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    textAlign: 'center',
    lineHeight: 20,
  },
  settingsContainer: {
    padding: SPACING.lg,
  },
  settingsTitle: {
    fontSize: TYPOGRAPHY.sizes.h4,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.lg,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light.border,
  },
  settingInfo: {
    flex: 1,
    marginRight: SPACING.md,
  },
  settingLabel: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: SPACING.xs,
  },
  settingDescription: {
    fontSize: TYPOGRAPHY.sizes.caption,
    lineHeight: 16,
  },
});

export default NotificationsScreen;

import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import CustomButton from '../../components/CustomButton';

interface NotificationItem {
  id: string;
  type: 'message' | 'project' | 'payment' | 'system' | 'marketing';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionRequired?: boolean;
  avatar?: string;
  priority: 'high' | 'medium' | 'low';
}

interface NotificationSetting {
  id: string;
  category: string;
  title: string;
  description: string;
  enabled: boolean;
  pushEnabled: boolean;
  emailEnabled: boolean;
  smsEnabled: boolean;
}

const NotificationsScreen = ({ navigation }: any) => {
  const { isDarkMode } = useTheme();
  const { language, getText } = useLanguage();
  const [activeTab, setActiveTab] = useState<'notifications' | 'settings'>('notifications');
  const [filter, setFilter] = useState<'all' | 'unread' | 'important'>('all');

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      type: 'message',
      title: 'New Message from Ahmed Al-Mahmoud',
      message: 'The structural plans are ready for review',
      timestamp: '2 minutes ago',
      read: false,
      avatar: '👨‍💼',
      priority: 'high',
    },
    {
      id: '2',
      type: 'project',
      title: 'Project Milestone Completed',
      message: 'Riyadh Tower Project - Foundation phase completed',
      timestamp: '1 hour ago',
      read: false,
      actionRequired: true,
      priority: 'high',
    },
    {
      id: '3',
      type: 'payment',
      title: 'Payment Received',
      message: 'You received 15,000 SAR for project completion',
      timestamp: '3 hours ago',
      read: true,
      priority: 'medium',
    },
    {
      id: '4',
      type: 'system',
      title: 'Profile Verification Complete',
      message: 'Your professional credentials have been verified',
      timestamp: '1 day ago',
      read: true,
      priority: 'medium',
    },
    {
      id: '5',
      type: 'project',
      title: 'New Job Opportunity',
      message: 'A client is requesting your expertise for a mall renovation project',
      timestamp: '2 days ago',
      read: false,
      actionRequired: true,
      priority: 'high',
    },
    {
      id: '6',
      type: 'marketing',
      title: 'Weekly Newsletter',
      message: 'Check out this week\'s engineering trends and market insights',
      timestamp: '3 days ago',
      read: true,
      priority: 'low',
    },
  ]);

  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([
    {
      id: '1',
      category: 'messages',
      title: 'New Messages',
      description: 'Notifications for new direct messages and group chats',
      enabled: true,
      pushEnabled: true,
      emailEnabled: false,
      smsEnabled: false,
    },
    {
      id: '2',
      category: 'projects',
      title: 'Project Updates',
      description: 'Milestones, deadlines, and project status changes',
      enabled: true,
      pushEnabled: true,
      emailEnabled: true,
      smsEnabled: false,
    },
    {
      id: '3',
      category: 'payments',
      title: 'Payment Notifications',
      description: 'Payment received, invoices, and billing updates',
      enabled: true,
      pushEnabled: true,
      emailEnabled: true,
      smsEnabled: true,
    },
    {
      id: '4',
      category: 'jobs',
      title: 'Job Opportunities',
      description: 'New job postings matching your skills and preferences',
      enabled: true,
      pushEnabled: true,
      emailEnabled: false,
      smsEnabled: false,
    },
    {
      id: '5',
      category: 'system',
      title: 'System Notifications',
      description: 'Account updates, security alerts, and platform news',
      enabled: true,
      pushEnabled: true,
      emailEnabled: true,
      smsEnabled: false,
    },
    {
      id: '6',
      category: 'marketing',
      title: 'Marketing & Promotions',
      description: 'Newsletter, feature updates, and promotional content',
      enabled: false,
      pushEnabled: false,
      emailEnabled: true,
      smsEnabled: false,
    },
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message': return 'chatbubble';
      case 'project': return 'briefcase';
      case 'payment': return 'card';
      case 'system': return 'settings';
      case 'marketing': return 'megaphone';
      default: return 'notifications';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'message': return '#6366F1';
      case 'project': return '#10B981';
      case 'payment': return '#F59E0B';
      case 'system': return '#8B5CF6';
      case 'marketing': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getFilteredNotifications = () => {
    let filtered = notifications;

    if (filter === 'unread') {
      filtered = filtered.filter(notif => !notif.read);
    } else if (filter === 'important') {
      filtered = filtered.filter(notif => notif.priority === 'high' || notif.actionRequired);
    }

    return filtered.sort((a, b) => {
      if (a.priority === 'high' && b.priority !== 'high') return -1;
      if (b.priority === 'high' && a.priority !== 'high') return 1;
      return 0;
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const updateNotificationSetting = (id: string, field: keyof NotificationSetting, value: any) => {
    setNotificationSettings(prev =>
      prev.map(setting =>
        setting.id === id ? { ...setting, [field]: value } : setting
      )
    );
  };

  const getUnreadCount = () => {
    return notifications.filter(notif => !notif.read).length;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#111827' : '#F9FAFB',
    },
    header: {
      padding: 20,
      paddingTop: 10,
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 8,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    headerSubtitle: {
      fontSize: 16,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    tabsContainer: {
      flexDirection: 'row',
      padding: 20,
      gap: 12,
    },
    tab: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: isDarkMode ? '#374151' : '#E5E7EB',
      borderRadius: 12,
      alignItems: 'center',
    },
    activeTab: {
      backgroundColor: '#6366F1',
    },
    tabText: {
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
    },
    activeTabText: {
      color: '#FFFFFF',
    },
    filterContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginBottom: 16,
      gap: 8,
    },
    filterButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      backgroundColor: isDarkMode ? '#374151' : '#E5E7EB',
      position: 'relative',
    },
    activeFilter: {
      backgroundColor: '#6366F1',
    },
    filterText: {
      fontSize: 12,
      fontWeight: '600',
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
    },
    activeFilterText: {
      color: '#FFFFFF',
    },
    unreadBadge: {
      position: 'absolute',
      top: -4,
      right: -4,
      backgroundColor: '#EF4444',
      borderRadius: 8,
      paddingHorizontal: 4,
      paddingVertical: 1,
      minWidth: 16,
      alignItems: 'center',
    },
    badgeText: {
      fontSize: 9,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    actionBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    actionBarText: {
      fontSize: 14,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
    },
    markAllButton: {
      fontSize: 14,
      color: '#6366F1',
      fontWeight: '600',
    },
    content: {
      flex: 1,
    },
    notificationsList: {
      paddingHorizontal: 20,
    },
    notificationCard: {
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderRadius: 12,
      padding: 16,
      marginBottom: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    unreadCard: {
      backgroundColor: isDarkMode ? '#1E1B4B' : '#F8FAFF',
      borderLeftWidth: 4,
      borderLeftColor: '#6366F1',
    },
    urgentCard: {
      borderLeftColor: '#EF4444',
    },
    notificationIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: language === 'ar' ? 0 : 12,
      marginLeft: language === 'ar' ? 12 : 0,
    },
    avatarIcon: {
      fontSize: 20,
    },
    notificationContent: {
      flex: 1,
    },
    notificationHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 4,
    },
    notificationTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      flex: 1,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    priorityDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginLeft: language === 'ar' ? 0 : 8,
      marginRight: language === 'ar' ? 8 : 0,
      marginTop: 4,
    },
    notificationMessage: {
      fontSize: 13,
      color: isDarkMode ? '#D1D5DB' : '#4B5563',
      marginBottom: 8,
      lineHeight: 18,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    notificationFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    timestamp: {
      fontSize: 11,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
    },
    actionButton: {
      backgroundColor: '#6366F1',
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
    },
    actionButtonText: {
      fontSize: 11,
      color: '#FFFFFF',
      fontWeight: '600',
    },
    notificationActions: {
      flexDirection: 'row',
      marginTop: 8,
      gap: 8,
    },
    settingsList: {
      paddingHorizontal: 20,
    },
    settingCategory: {
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderRadius: 12,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    settingHeader: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#374151' : '#F3F4F6',
    },
    settingTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 4,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    settingDescription: {
      fontSize: 13,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    settingOptions: {
      padding: 16,
    },
    settingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
    },
    settingLabel: {
      fontSize: 14,
      color: isDarkMode ? '#D1D5DB' : '#4B5563',
      flex: 1,
    },
    settingSwitch: {
      marginLeft: language === 'ar' ? 0 : 12,
      marginRight: language === 'ar' ? 12 : 0,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 60,
    },
    emptyStateIcon: {
      marginBottom: 16,
    },
    emptyStateTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 8,
      textAlign: 'center',
    },
    emptyStateDescription: {
      fontSize: 14,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: 'center',
      lineHeight: 20,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
        <Text style={styles.headerTitle}>
          {getText('notifications', 'Notifications')}
        </Text>
        <Text style={styles.headerSubtitle}>
          {activeTab === 'notifications' 
            ? `${notifications.length} ${getText('total', 'total')}, ${getUnreadCount()} ${getText('unread', 'unread')}`
            : getText('manageSettings', 'Manage your notification preferences')
          }
        </Text>
      </Animated.View>

      <View style={styles.tabsContainer}>
        <Pressable
          style={[styles.tab, activeTab === 'notifications' && styles.activeTab]}
          onPress={() => setActiveTab('notifications')}
        >
          <Text style={[styles.tabText, activeTab === 'notifications' && styles.activeTabText]}>
            {getText('notifications', 'Notifications')}
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'settings' && styles.activeTab]}
          onPress={() => setActiveTab('settings')}
        >
          <Text style={[styles.tabText, activeTab === 'settings' && styles.activeTabText]}>
            {getText('settings', 'Settings')}
          </Text>
        </Pressable>
      </View>

      {activeTab === 'notifications' && (
        <>
          <View style={styles.filterContainer}>
            <Pressable
              style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
              onPress={() => setFilter('all')}
            >
              <Text style={[styles.filterText, filter === 'all' && styles.activeFilterText]}>
                {getText('all', 'All')}
              </Text>
            </Pressable>
            <Pressable
              style={[styles.filterButton, filter === 'unread' && styles.activeFilter]}
              onPress={() => setFilter('unread')}
            >
              <Text style={[styles.filterText, filter === 'unread' && styles.activeFilterText]}>
                {getText('unread', 'Unread')}
              </Text>
              {getUnreadCount() > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.badgeText}>{getUnreadCount()}</Text>
                </View>
              )}
            </Pressable>
            <Pressable
              style={[styles.filterButton, filter === 'important' && styles.activeFilter]}
              onPress={() => setFilter('important')}
            >
              <Text style={[styles.filterText, filter === 'important' && styles.activeFilterText]}>
                {getText('important', 'Important')}
              </Text>
            </Pressable>
          </View>

          <View style={styles.actionBar}>
            <Text style={styles.actionBarText}>
              {getFilteredNotifications().length} {getText('notifications', 'notifications')}
            </Text>
            {getUnreadCount() > 0 && (
              <Pressable onPress={markAllAsRead}>
                <Text style={styles.markAllButton}>
                  {getText('markAllRead', 'Mark all as read')}
                </Text>
              </Pressable>
            )}
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.notificationsList}>
              {getFilteredNotifications().map((notification, index) => (
                <Animated.View
                  key={notification.id}
                  entering={SlideInUp.delay(index * 50)}
                >
                  <Pressable
                    style={[
                      styles.notificationCard,
                      !notification.read && styles.unreadCard,
                      notification.priority === 'high' && styles.urgentCard,
                    ]}
                    onPress={() => markAsRead(notification.id)}
                    onLongPress={() => deleteNotification(notification.id)}
                  >
                    <View style={[
                      styles.notificationIcon,
                      { backgroundColor: getNotificationColor(notification.type) + '20' }
                    ]}>
                      {notification.avatar ? (
                        <Text style={styles.avatarIcon}>{notification.avatar}</Text>
                      ) : (
                        <Ionicons
                          name={getNotificationIcon(notification.type) as any}
                          size={20}
                          color={getNotificationColor(notification.type)}
                        />
                      )}
                    </View>

                    <View style={styles.notificationContent}>
                      <View style={styles.notificationHeader}>
                        <Text style={styles.notificationTitle}>
                          {notification.title}
                        </Text>
                        <View style={[
                          styles.priorityDot,
                          { backgroundColor: getPriorityColor(notification.priority) }
                        ]} />
                      </View>

                      <Text style={styles.notificationMessage}>
                        {notification.message}
                      </Text>

                      <View style={styles.notificationFooter}>
                        <Text style={styles.timestamp}>
                          {notification.timestamp}
                        </Text>
                        {notification.actionRequired && (
                          <Pressable style={styles.actionButton}>
                            <Text style={styles.actionButtonText}>
                              {getText('viewDetails', 'View Details')}
                            </Text>
                          </Pressable>
                        )}
                      </View>
                    </View>
                  </Pressable>
                </Animated.View>
              ))}

              {getFilteredNotifications().length === 0 && (
                <View style={styles.emptyState}>
                  <Ionicons
                    name="notifications-outline"
                    size={64}
                    color={isDarkMode ? '#4B5563' : '#D1D5DB'}
                    style={styles.emptyStateIcon}
                  />
                  <Text style={styles.emptyStateTitle}>
                    {filter === 'unread' 
                      ? getText('allCaughtUp', 'All caught up!')
                      : getText('noNotifications', 'No notifications')
                    }
                  </Text>
                  <Text style={styles.emptyStateDescription}>
                    {filter === 'unread'
                      ? getText('noUnreadNotifications', 'You have no unread notifications')
                      : getText('notificationsWillAppear', 'Your notifications will appear here')
                    }
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </>
      )}

      {activeTab === 'settings' && (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.settingsList}>
            {notificationSettings.map((setting, index) => (
              <Animated.View
                key={setting.id}
                entering={SlideInUp.delay(index * 50)}
                style={styles.settingCategory}
              >
                <View style={styles.settingHeader}>
                  <Text style={styles.settingTitle}>{setting.title}</Text>
                  <Text style={styles.settingDescription}>{setting.description}</Text>
                </View>

                <View style={styles.settingOptions}>
                  <View style={styles.settingRow}>
                    <Text style={styles.settingLabel}>
                      {getText('enableNotifications', 'Enable notifications')}
                    </Text>
                    <Switch
                      style={styles.settingSwitch}
                      value={setting.enabled}
                      onValueChange={(value) => updateNotificationSetting(setting.id, 'enabled', value)}
                      trackColor={{ false: isDarkMode ? '#374151' : '#E5E7EB', true: '#6366F1' }}
                      thumbColor={setting.enabled ? '#FFFFFF' : isDarkMode ? '#9CA3AF' : '#FFFFFF'}
                    />
                  </View>

                  {setting.enabled && (
                    <>
                      <View style={styles.settingRow}>
                        <Text style={styles.settingLabel}>
                          {getText('pushNotifications', 'Push notifications')}
                        </Text>
                        <Switch
                          style={styles.settingSwitch}
                          value={setting.pushEnabled}
                          onValueChange={(value) => updateNotificationSetting(setting.id, 'pushEnabled', value)}
                          trackColor={{ false: isDarkMode ? '#374151' : '#E5E7EB', true: '#6366F1' }}
                          thumbColor={setting.pushEnabled ? '#FFFFFF' : isDarkMode ? '#9CA3AF' : '#FFFFFF'}
                        />
                      </View>

                      <View style={styles.settingRow}>
                        <Text style={styles.settingLabel}>
                          {getText('emailNotifications', 'Email notifications')}
                        </Text>
                        <Switch
                          style={styles.settingSwitch}
                          value={setting.emailEnabled}
                          onValueChange={(value) => updateNotificationSetting(setting.id, 'emailEnabled', value)}
                          trackColor={{ false: isDarkMode ? '#374151' : '#E5E7EB', true: '#6366F1' }}
                          thumbColor={setting.emailEnabled ? '#FFFFFF' : isDarkMode ? '#9CA3AF' : '#FFFFFF'}
                        />
                      </View>

                      <View style={styles.settingRow}>
                        <Text style={styles.settingLabel}>
                          {getText('smsNotifications', 'SMS notifications')}
                        </Text>
                        <Switch
                          style={styles.settingSwitch}
                          value={setting.smsEnabled}
                          onValueChange={(value) => updateNotificationSetting(setting.id, 'smsEnabled', value)}
                          trackColor={{ false: isDarkMode ? '#374151' : '#E5E7EB', true: '#6366F1' }}
                          thumbColor={setting.smsEnabled ? '#FFFFFF' : isDarkMode ? '#9CA3AF' : '#FFFFFF'}
                        />
                      </View>
                    </>
                  )}
                </View>
              </Animated.View>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default NotificationsScreen;
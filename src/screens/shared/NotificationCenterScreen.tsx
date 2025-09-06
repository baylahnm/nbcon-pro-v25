import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Dimensions,
  Alert,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { RootState } from '../../store';
import { Language, UserRole, NotificationType } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

const { width } = Dimensions.get('window');

interface Notification {
  id: string;
  title: { en: string; ar: string };
  message: { en: string; ar: string };
  type: NotificationType;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
  actionText?: { en: string; ar: string };
  sender?: {
    id: string;
    name: { en: string; ar: string };
    role: UserRole;
    avatar?: string;
  };
  relatedEntity?: {
    type: 'job' | 'payment' | 'project' | 'message';
    id: string;
    title: { en: string; ar: string };
  };
  metadata?: {
    amount?: number;
    currency?: string;
    jobId?: string;
    projectId?: string;
    messageId?: string;
  };
}

interface NotificationCenterScreenProps {
  route?: {
    params: {
      filter?: NotificationType;
    };
  };
}

const NotificationCenterScreen: React.FC<NotificationCenterScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const { language, isDarkMode, user } = useSelector((state: RootState) => state.app);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<NotificationType | 'all'>('all');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: 'notif_1',
        title: { 
          en: 'New Job Match Found', 
          ar: 'تم العثور على وظيفة جديدة مناسبة' 
        },
        message: { 
          en: 'A new MEP design job in Riyadh matches your skills and availability.',
          ar: 'وظيفة تصميم MEP جديدة في الرياض تناسب مهاراتك وتوفرك.'
        },
        type: NotificationType.JOB,
        priority: 'high',
        isRead: false,
        createdAt: '2024-02-15T10:30:00Z',
        actionUrl: '/jobs/job_123',
        actionText: { en: 'View Job', ar: 'عرض الوظيفة' },
        relatedEntity: {
          type: 'job',
          id: 'job_123',
          title: { en: 'MEP Design for Office Building', ar: 'تصميم MEP للمبنى المكتبي' },
        },
        metadata: {
          jobId: 'job_123',
        },
      },
      {
        id: 'notif_2',
        title: { 
          en: 'Payment Received', 
          ar: 'تم استلام الدفع' 
        },
        message: { 
          en: 'You received SAR 2,500 for completing the HVAC design project.',
          ar: 'استلمت 2,500 ريال سعودي لإكمال مشروع تصميم HVAC.'
        },
        type: NotificationType.PAYMENT,
        priority: 'high',
        isRead: false,
        createdAt: '2024-02-15T09:15:00Z',
        actionUrl: '/payments/payment_456',
        actionText: { en: 'View Payment', ar: 'عرض الدفع' },
        metadata: {
          amount: 2500,
          currency: 'SAR',
        },
      },
      {
        id: 'notif_3',
        title: { 
          en: 'New Message from Client', 
          ar: 'رسالة جديدة من العميل' 
        },
        message: { 
          en: 'Ahmed Al-Rajhi sent you a message about the project timeline.',
          ar: 'أرسل لك أحمد الراجحي رسالة حول الجدول الزمني للمشروع.'
        },
        type: NotificationType.MESSAGE,
        priority: 'medium',
        isRead: true,
        createdAt: '2024-02-15T08:45:00Z',
        actionUrl: '/messages/conversation_789',
        actionText: { en: 'Reply', ar: 'رد' },
        sender: {
          id: 'client_1',
          name: { en: 'Ahmed Al-Rajhi', ar: 'أحمد الراجحي' },
          role: UserRole.CLIENT,
        },
        metadata: {
          messageId: 'msg_789',
        },
      },
      {
        id: 'notif_4',
        title: { 
          en: 'System Maintenance', 
          ar: 'صيانة النظام' 
        },
        message: { 
          en: 'Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM.',
          ar: 'ستتم الصيانة المجدولة الليلة من الساعة 2:00 صباحاً إلى 4:00 صباحاً.'
        },
        type: NotificationType.SYSTEM,
        priority: 'low',
        isRead: true,
        createdAt: '2024-02-14T16:30:00Z',
      },
      {
        id: 'notif_5',
        title: { 
          en: 'Project Deadline Reminder', 
          ar: 'تذكير بموعد تسليم المشروع' 
        },
        message: { 
          en: 'The MEP design project deadline is approaching in 2 days.',
          ar: 'موعد تسليم مشروع تصميم MEP يقترب خلال يومين.'
        },
        type: NotificationType.PROJECT,
        priority: 'urgent',
        isRead: false,
        createdAt: '2024-02-14T14:20:00Z',
        actionUrl: '/projects/project_101',
        actionText: { en: 'View Project', ar: 'عرض المشروع' },
        relatedEntity: {
          type: 'project',
          id: 'project_101',
          title: { en: 'Office Building MEP Design', ar: 'تصميم MEP للمبنى المكتبي' },
        },
        metadata: {
          projectId: 'project_101',
        },
      },
      {
        id: 'notif_6',
        title: { 
          en: 'Profile Verification Complete', 
          ar: 'تم إكمال التحقق من الملف الشخصي' 
        },
        message: { 
          en: 'Your engineer profile has been verified and is now live.',
          ar: 'تم التحقق من ملفك الشخصي كمهندس وهو الآن متاح.'
        },
        type: NotificationType.SYSTEM,
        priority: 'medium',
        isRead: true,
        createdAt: '2024-02-13T11:00:00Z',
        actionUrl: '/profile',
        actionText: { en: 'View Profile', ar: 'عرض الملف الشخصي' },
      },
    ];
    setNotifications(mockNotifications);
    
    // Calculate unread count
    const unread = mockNotifications.filter(n => !n.isRead).length;
    setUnreadCount(unread);
  }, []);

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return isArabic ? 'الآن' : 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ${isArabic ? 'مضت' : 'ago'}`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ${isArabic ? 'مضت' : 'ago'}`;
    }
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.JOB:
        return 'briefcase-outline';
      case NotificationType.PAYMENT:
        return 'card-outline';
      case NotificationType.MESSAGE:
        return 'chatbubble-outline';
      case NotificationType.PROJECT:
        return 'folder-outline';
      case NotificationType.SYSTEM:
        return 'settings-outline';
      default:
        return 'notifications-outline';
    }
  };

  const getNotificationColor = (type: NotificationType) => {
    switch (type) {
      case NotificationType.JOB:
        return COLORS.primary;
      case NotificationType.PAYMENT:
        return COLORS.success;
      case NotificationType.MESSAGE:
        return COLORS.accent;
      case NotificationType.PROJECT:
        return COLORS.warning;
      case NotificationType.SYSTEM:
        return COLORS.textSecondary;
      default:
        return COLORS.primary;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return COLORS.error;
      case 'high':
        return COLORS.warning;
      case 'medium':
        return COLORS.accent;
      case 'low':
        return COLORS.textSecondary;
      default:
        return COLORS.textSecondary;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    return selectedFilter === 'all' || notification.type === selectedFilter;
  }).sort((a, b) => {
    // Sort by unread first, then by date
    if (a.isRead !== b.isRead) {
      return a.isRead ? 1 : -1;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleNotificationPress = (notification: Notification) => {
    // Mark as read
    setNotifications(prev => 
      prev.map(n => 
        n.id === notification.id 
          ? { ...n, isRead: true }
          : n
      )
    );

    // Update unread count
    if (!notification.isRead) {
      setUnreadCount(prev => prev - 1);
    }

    // Show notification details
    setSelectedNotification(notification);
    setShowNotificationModal(true);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    );
    setUnreadCount(0);
  };

  const handleDeleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    
    // Update unread count if needed
    const notification = notifications.find(n => n.id === notificationId);
    if (notification && !notification.isRead) {
      setUnreadCount(prev => prev - 1);
    }
  };

  const handleActionPress = (notification: Notification) => {
    if (notification.actionUrl) {
      // Navigate to action URL
      Alert.alert(
        isArabic ? 'انتقال' : 'Navigate',
        isArabic ? 'سيتم الانتقال إلى الصفحة المطلوبة' : 'Will navigate to the requested page'
      );
    }
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[
        styles.notificationCard,
        { 
          backgroundColor: theme.card,
          borderLeftColor: getNotificationColor(item.type),
          borderLeftWidth: 4,
        },
        !item.isRead && { backgroundColor: theme.surface }
      ]}
      onPress={() => handleNotificationPress(item)}
    >
      <View style={styles.notificationHeader}>
        <View style={styles.notificationIconContainer}>
          <View style={[
            styles.notificationIcon,
            { backgroundColor: getNotificationColor(item.type) }
          ]}>
            <Ionicons 
              name={getNotificationIcon(item.type) as any} 
              size={20} 
              color={COLORS.white} 
            />
          </View>
          {!item.isRead && <View style={styles.unreadDot} />}
        </View>
        
        <View style={styles.notificationContent}>
          <View style={styles.notificationTitleRow}>
            <Text style={[styles.notificationTitle, { color: theme.text }]}>
              {getText(item.title)}
            </Text>
            <View style={[
              styles.priorityBadge,
              { backgroundColor: getPriorityColor(item.priority) }
            ]}>
              <Text style={styles.priorityText}>
                {item.priority.toUpperCase()}
              </Text>
            </View>
          </View>
          
          <Text style={[styles.notificationMessage, { color: theme.textSecondary }]} numberOfLines={2}>
            {getText(item.message)}
          </Text>
          
          <View style={styles.notificationFooter}>
            <Text style={[styles.notificationTime, { color: theme.textSecondary }]}>
              {formatDate(item.createdAt)}
            </Text>
            {item.sender && (
              <Text style={[styles.notificationSender, { color: theme.textSecondary }]}>
                {getText(item.sender.name)}
              </Text>
            )}
          </View>
        </View>
        
        <View style={styles.notificationActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleDeleteNotification(item.id)}
          >
            <Ionicons name="trash-outline" size={16} color={theme.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryDark]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>
              {isArabic ? 'مركز الإشعارات' : 'Notification Center'}
            </Text>
            <Text style={styles.headerSubtitle}>
              {unreadCount > 0 
                ? `${unreadCount} ${isArabic ? 'غير مقروء' : 'unread'}`
                : (isArabic ? 'جميع الإشعارات مقروءة' : 'All notifications read')
              }
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setShowFilterModal(true)}
          >
            <Ionicons name="filter" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Action Bar */}
      {unreadCount > 0 && (
        <View style={[styles.actionBar, { backgroundColor: theme.surface }]}>
          <Text style={[styles.actionText, { color: theme.text }]}>
            {unreadCount} {isArabic ? 'إشعار غير مقروء' : 'unread notifications'}
          </Text>
          <TouchableOpacity 
            style={styles.markAllButton}
            onPress={handleMarkAllAsRead}
          >
            <Text style={[styles.markAllText, { color: COLORS.primary }]}>
              {isArabic ? 'تحديد الكل كمقروء' : 'Mark All as Read'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Notifications List */}
      <FlatList
        data={filteredNotifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.notificationsList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="notifications-off-outline" size={64} color={theme.textSecondary} />
            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              {isArabic ? 'لا توجد إشعارات' : 'No notifications found'}
            </Text>
            <Text style={[styles.emptyDescription, { color: theme.textSecondary }]}>
              {isArabic 
                ? 'ستظهر الإشعارات الجديدة هنا'
                : 'New notifications will appear here'
              }
            </Text>
          </View>
        }
      />

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              {isArabic ? 'تصفية الإشعارات' : 'Filter Notifications'}
            </Text>
            
            <View style={styles.filterOptions}>
              {[
                { key: 'all', label: { en: 'All Notifications', ar: 'جميع الإشعارات' }, icon: 'notifications-outline' },
                { key: NotificationType.JOB, label: { en: 'Jobs', ar: 'الوظائف' }, icon: 'briefcase-outline' },
                { key: NotificationType.PAYMENT, label: { en: 'Payments', ar: 'المدفوعات' }, icon: 'card-outline' },
                { key: NotificationType.MESSAGE, label: { en: 'Messages', ar: 'الرسائل' }, icon: 'chatbubble-outline' },
                { key: NotificationType.PROJECT, label: { en: 'Projects', ar: 'المشاريع' }, icon: 'folder-outline' },
                { key: NotificationType.SYSTEM, label: { en: 'System', ar: 'النظام' }, icon: 'settings-outline' },
              ].map((filter) => (
                <TouchableOpacity
                  key={filter.key}
                  style={[
                    styles.filterOption,
                    selectedFilter === filter.key && { backgroundColor: COLORS.primary }
                  ]}
                  onPress={() => {
                    setSelectedFilter(filter.key as any);
                    setShowFilterModal(false);
                  }}
                >
                  <Ionicons 
                    name={filter.icon as any} 
                    size={20} 
                    color={selectedFilter === filter.key ? COLORS.white : theme.textSecondary} 
                  />
                  <Text style={[
                    styles.filterOptionText,
                    { color: selectedFilter === filter.key ? COLORS.white : theme.text }
                  ]}>
                    {getText(filter.label)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalActions}>
              <CustomButton
                title={isArabic ? 'إلغاء' : 'Cancel'}
                onPress={() => setShowFilterModal(false)}
                variant="outline"
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Notification Detail Modal */}
      <Modal
        visible={showNotificationModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowNotificationModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.notificationModalContent, { backgroundColor: theme.card }]}>
            <View style={styles.notificationModalHeader}>
              <Text style={[styles.notificationModalTitle, { color: theme.text }]}>
                {selectedNotification ? getText(selectedNotification.title) : ''}
              </Text>
              <TouchableOpacity onPress={() => setShowNotificationModal(false)}>
                <Ionicons name="close" size={24} color={theme.textSecondary} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.notificationModalBody}>
              <Text style={[styles.notificationModalMessage, { color: theme.textSecondary }]}>
                {selectedNotification ? getText(selectedNotification.message) : ''}
              </Text>
              
              {selectedNotification?.relatedEntity && (
                <View style={[styles.relatedEntity, { backgroundColor: theme.surface }]}>
                  <Text style={[styles.relatedEntityTitle, { color: theme.text }]}>
                    {isArabic ? 'متعلق بـ:' : 'Related to:'}
                  </Text>
                  <Text style={[styles.relatedEntityName, { color: theme.textSecondary }]}>
                    {getText(selectedNotification.relatedEntity.title)}
                  </Text>
                </View>
              )}
              
              {selectedNotification?.metadata?.amount && (
                <View style={[styles.metadataContainer, { backgroundColor: theme.surface }]}>
                  <Text style={[styles.metadataTitle, { color: theme.text }]}>
                    {isArabic ? 'المبلغ:' : 'Amount:'}
                  </Text>
                  <Text style={[styles.metadataValue, { color: COLORS.success }]}>
                    {selectedNotification.metadata.amount} {selectedNotification.metadata.currency}
                  </Text>
                </View>
              )}
            </ScrollView>

            {selectedNotification?.actionText && (
              <View style={styles.modalActions}>
                <CustomButton
                  title={isArabic ? 'إلغاء' : 'Cancel'}
                  onPress={() => setShowNotificationModal(false)}
                  variant="outline"
                  style={styles.modalButton}
                />
                <CustomButton
                  title={getText(selectedNotification.actionText)}
                  onPress={() => {
                    handleActionPress(selectedNotification);
                    setShowNotificationModal(false);
                  }}
                  style={styles.modalButton}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: TYPOGRAPHY.sizes.body2,
    color: COLORS.white,
    opacity: 0.9,
  },
  filterButton: {
    padding: 4,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  actionText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  markAllButton: {
    padding: 8,
  },
  markAllText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  notificationsList: {
    padding: 20,
  },
  notificationCard: {
    borderRadius: BORDER_RADIUS.md,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notificationIconContainer: {
    position: 'relative',
    marginRight: 12,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.error,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  notificationTitle: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.bold,
    flex: 1,
    marginRight: 8,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
  },
  priorityText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.white,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  notificationMessage: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationTime: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  notificationSender: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  notificationActions: {
    marginLeft: 8,
  },
  actionButton: {
    padding: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: TYPOGRAPHY.sizes.body2,
    textAlign: 'center',
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    borderRadius: BORDER_RADIUS.md,
    padding: 24,
  },
  modalTitle: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: 20,
  },
  filterOptions: {
    marginBottom: 20,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: 8,
  },
  filterOptionText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    marginLeft: 12,
  },
  notificationModalContent: {
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
    borderRadius: BORDER_RADIUS.md,
  },
  notificationModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  notificationModalTitle: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.bold,
    flex: 1,
    marginRight: 12,
  },
  notificationModalBody: {
    padding: 20,
  },
  notificationModalMessage: {
    fontSize: TYPOGRAPHY.sizes.body1,
    lineHeight: 24,
    marginBottom: 20,
  },
  relatedEntity: {
    padding: 16,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: 16,
  },
  relatedEntityTitle: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: 4,
  },
  relatedEntityName: {
    fontSize: TYPOGRAPHY.sizes.body1,
  },
  metadataContainer: {
    padding: 16,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: 16,
  },
  metadataTitle: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: 4,
  },
  metadataValue: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    padding: 20,
  },
  modalButton: {
    paddingHorizontal: 24,
  },
});

export default NotificationCenterScreen;

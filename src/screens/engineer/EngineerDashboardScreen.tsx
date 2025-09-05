import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

interface JobInvite {
  id: string;
  title: string;
  client: string;
  location: string;
  budget: number;
  urgency: 'standard' | 'priority' | 'emergency';
  postedTime: string;
  description: string;
  category: string;
}

interface EarningsData {
  today: number;
  thisWeek: number;
  thisMonth: number;
  total: number;
}

const EngineerDashboardScreen: React.FC = () => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [isAvailable, setIsAvailable] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'earnings' | 'profile'>('overview');

  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  // Mock data - in real app, this would come from Redux store
  const mockJobInvites: JobInvite[] = [
    {
      id: '1',
      title: 'Site Survey for NEOM Project',
      client: 'Ahmed Al-Rashid',
      location: 'Riyadh, Saudi Arabia',
      budget: 15000,
      urgency: 'priority',
      postedTime: '2 hours ago',
      description: 'Comprehensive site survey for new construction project in NEOM',
      category: 'Surveying',
    },
    {
      id: '2',
      title: 'MEP Design Review',
      client: 'Sarah Al-Mansouri',
      location: 'Jeddah, Saudi Arabia',
      budget: 8000,
      urgency: 'standard',
      postedTime: '5 hours ago',
      description: 'Review MEP designs for commercial building',
      category: 'MEP',
    },
    {
      id: '3',
      title: 'Safety Inspection',
      client: 'Mohammed Al-Zahrani',
      location: 'Dammam, Saudi Arabia',
      budget: 5000,
      urgency: 'emergency',
      postedTime: '1 hour ago',
      description: 'Urgent safety inspection required for industrial site',
      category: 'HSE',
    },
  ];

  const earningsData: EarningsData = {
    today: 2500,
    thisWeek: 12000,
    thisMonth: 45000,
    total: 180000,
  };

  const todaySchedule = [
    {
      id: '1',
      time: '09:00',
      client: 'NEOM Project',
      type: 'Site Visit',
      status: 'upcoming',
    },
    {
      id: '2',
      time: '14:00',
      client: 'MEP Review',
      type: 'Consultation',
      status: 'completed',
    },
  ];

  const quickActions = [
    {
      id: 'update_availability',
      title: { en: 'Update Availability', ar: 'تحديث التوفر' },
      icon: 'calendar',
      color: COLORS.primary,
      onPress: () => console.log('Update availability'),
    },
    {
      id: 'view_earnings',
      title: { en: 'View Earnings', ar: 'عرض الأرباح' },
      icon: 'cash',
      color: COLORS.success,
      onPress: () => setActiveTab('earnings'),
    },
    {
      id: 'update_profile',
      title: { en: 'Update Profile', ar: 'تحديث الملف الشخصي' },
      icon: 'person',
      color: COLORS.secondary,
      onPress: () => setActiveTab('profile'),
    },
    {
      id: 'messages',
      title: { en: 'Messages', ar: 'الرسائل' },
      icon: 'chatbubbles',
      color: COLORS.accent,
      onPress: () => console.log('Open messages'),
    },
  ];

  const renderAvailabilityToggle = () => (
    <View style={[styles.availabilityCard, { backgroundColor: theme.surface }]}>
      <View style={styles.availabilityHeader}>
        <View style={styles.availabilityInfo}>
          <View style={[styles.statusIndicator, { backgroundColor: isAvailable ? COLORS.success : COLORS.error }]} />
          <Text style={[styles.availabilityText, { color: theme.text }]}>
            {isAvailable 
              ? (isArabic ? 'متاح للعمل' : 'Available for Work')
              : (isArabic ? 'غير متاح' : 'Not Available')
            }
          </Text>
        </View>
        <Switch
          value={isAvailable}
          onValueChange={setIsAvailable}
          trackColor={{ false: COLORS.light.border, true: COLORS.primary + '40' }}
          thumbColor={isAvailable ? COLORS.primary : COLORS.light.textSecondary}
        />
      </View>
      <Text style={[styles.availabilitySubtext, { color: theme.textSecondary }]}>
        {isAvailable 
          ? (isArabic ? 'ستتلقى إشعارات بفرص العمل الجديدة' : 'You will receive notifications for new job opportunities')
          : (isArabic ? 'لن تتلقى إشعارات بفرص العمل' : 'You will not receive job notifications')
        }
      </Text>
    </View>
  );

  const renderEarningsCard = () => (
    <View style={[styles.earningsCard, { backgroundColor: theme.surface }]}>
      <Text style={[styles.earningsTitle, { color: theme.text }]}>
        {isArabic ? 'أرباحك' : 'Your Earnings'}
      </Text>
      
      <View style={styles.earningsGrid}>
        <View style={styles.earningsItem}>
          <Text style={[styles.earningsValue, { color: COLORS.primary }]}>
            {earningsData.today.toLocaleString()} SAR
          </Text>
          <Text style={[styles.earningsLabel, { color: theme.textSecondary }]}>
            {isArabic ? 'اليوم' : 'Today'}
          </Text>
        </View>
        
        <View style={styles.earningsItem}>
          <Text style={[styles.earningsValue, { color: COLORS.secondary }]}>
            {earningsData.thisWeek.toLocaleString()} SAR
          </Text>
          <Text style={[styles.earningsLabel, { color: theme.textSecondary }]}>
            {isArabic ? 'هذا الأسبوع' : 'This Week'}
          </Text>
        </View>
        
        <View style={styles.earningsItem}>
          <Text style={[styles.earningsValue, { color: COLORS.success }]}>
            {earningsData.thisMonth.toLocaleString()} SAR
          </Text>
          <Text style={[styles.earningsLabel, { color: theme.textSecondary }]}>
            {isArabic ? 'هذا الشهر' : 'This Month'}
          </Text>
        </View>
        
        <View style={styles.earningsItem}>
          <Text style={[styles.earningsValue, { color: COLORS.warning }]}>
            {earningsData.total.toLocaleString()} SAR
          </Text>
          <Text style={[styles.earningsLabel, { color: theme.textSecondary }]}>
            {isArabic ? 'الإجمالي' : 'Total'}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderJobInvite = ({ item }: { item: JobInvite }) => (
    <TouchableOpacity
      style={[styles.jobCard, { backgroundColor: theme.surface }]}
      onPress={() => console.log('View job:', item.id)}
    >
      <View style={styles.jobHeader}>
        <Text style={[styles.jobTitle, { color: theme.text }]}>
          {item.title}
        </Text>
        <View style={[
          styles.urgencyBadge,
          { backgroundColor: getUrgencyColor(item.urgency) }
        ]}>
          <Text style={styles.urgencyText}>
            {getUrgencyText(item.urgency)}
          </Text>
        </View>
      </View>
      
      <View style={styles.jobDetails}>
        <View style={styles.jobRow}>
          <Ionicons name="person" size={16} color={theme.textSecondary} />
          <Text style={[styles.jobText, { color: theme.textSecondary }]}>
            {item.client}
          </Text>
        </View>
        
        <View style={styles.jobRow}>
          <Ionicons name="location" size={16} color={theme.textSecondary} />
          <Text style={[styles.jobText, { color: theme.textSecondary }]}>
            {item.location}
          </Text>
        </View>
        
        <View style={styles.jobRow}>
          <Ionicons name="cash" size={16} color={theme.textSecondary} />
          <Text style={[styles.jobText, { color: theme.textSecondary }]}>
            {item.budget.toLocaleString()} SAR
          </Text>
        </View>
        
        <View style={styles.jobRow}>
          <Ionicons name="time" size={16} color={theme.textSecondary} />
          <Text style={[styles.jobText, { color: theme.textSecondary }]}>
            {item.postedTime}
          </Text>
        </View>
      </View>
      
      <Text style={[styles.jobDescription, { color: theme.textSecondary }]}>
        {item.description}
      </Text>
      
      <View style={styles.jobActions}>
        <CustomButton
          title={{ en: 'Decline', ar: 'رفض' }}
          variant="outline"
          size="small"
          onPress={() => console.log('Decline job:', item.id)}
          style={styles.jobActionButton}
        />
        <CustomButton
          title={{ en: 'Accept', ar: 'قبول' }}
          size="small"
          onPress={() => console.log('Accept job:', item.id)}
          style={styles.jobActionButton}
        />
      </View>
    </TouchableOpacity>
  );

  const renderScheduleItem = ({ item }: { item: any }) => (
    <View style={[styles.scheduleItem, { backgroundColor: theme.surface }]}>
      <View style={styles.scheduleTime}>
        <Text style={[styles.timeText, { color: theme.text }]}>
          {item.time}
        </Text>
      </View>
      
      <View style={styles.scheduleContent}>
        <Text style={[styles.scheduleTitle, { color: theme.text }]}>
          {item.client}
        </Text>
        <Text style={[styles.scheduleType, { color: theme.textSecondary }]}>
          {item.type}
        </Text>
      </View>
      
      <View style={[
        styles.scheduleStatus,
        { backgroundColor: getScheduleStatusColor(item.status) }
      ]}>
        <Text style={styles.scheduleStatusText}>
          {getScheduleStatusText(item.status)}
        </Text>
      </View>
    </View>
  );

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'standard':
        return COLORS.success;
      case 'priority':
        return COLORS.warning;
      case 'emergency':
        return COLORS.error;
      default:
        return COLORS.light.border;
    }
  };

  const getUrgencyText = (urgency: string) => {
    switch (urgency) {
      case 'standard':
        return isArabic ? 'عادي' : 'Standard';
      case 'priority':
        return isArabic ? 'أولوية' : 'Priority';
      case 'emergency':
        return isArabic ? 'طوارئ' : 'Emergency';
      default:
        return urgency;
    }
  };

  const getScheduleStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return COLORS.primary;
      case 'completed':
        return COLORS.success;
      case 'cancelled':
        return COLORS.error;
      default:
        return COLORS.light.border;
    }
  };

  const getScheduleStatusText = (status: string) => {
    switch (status) {
      case 'upcoming':
        return isArabic ? 'قادم' : 'Upcoming';
      case 'completed':
        return isArabic ? 'مكتمل' : 'Completed';
      case 'cancelled':
        return isArabic ? 'ملغي' : 'Cancelled';
      default:
        return status;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <ScrollView showsVerticalScrollIndicator={false}>
            {renderAvailabilityToggle()}
            {renderEarningsCard()}
            
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                {isArabic ? 'جدول اليوم' : "Today's Schedule"}
              </Text>
              <FlatList
                data={todaySchedule}
                renderItem={renderScheduleItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
            </View>
            
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>
                  {isArabic ? 'دعوات العمل الجديدة' : 'New Job Invites'}
                </Text>
                <TouchableOpacity onPress={() => setActiveTab('jobs')}>
                  <Text style={[styles.seeAllText, { color: COLORS.primary }]}>
                    {isArabic ? 'عرض الكل' : 'See All'}
                  </Text>
                </TouchableOpacity>
              </View>
              
              <FlatList
                data={mockJobInvites.slice(0, 2)}
                renderItem={renderJobInvite}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
            </View>
          </ScrollView>
        );
      
      case 'jobs':
        return (
          <FlatList
            data={mockJobInvites}
            renderItem={renderJobInvite}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.jobsList}
          />
        );
      
      case 'earnings':
        return (
          <ScrollView showsVerticalScrollIndicator={false}>
            {renderEarningsCard()}
            
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                {isArabic ? 'إجراءات سريعة' : 'Quick Actions'}
              </Text>
              
              <View style={styles.quickActionsGrid}>
                {quickActions.map((action) => (
                  <TouchableOpacity
                    key={action.id}
                    style={[styles.quickActionCard, { backgroundColor: theme.surface }]}
                    onPress={action.onPress}
                  >
                    <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                      <Ionicons name={action.icon as any} size={24} color="white" />
                    </View>
                    <Text style={[styles.actionTitle, { color: theme.text }]}>
                      {getText(action.title)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        );
      
      case 'profile':
        return (
          <View style={styles.emptyState}>
            <Ionicons name="person-outline" size={64} color={theme.textSecondary} />
            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              {isArabic ? 'الملف الشخصي' : 'Profile'}
            </Text>
            <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
              {isArabic 
                ? 'إدارة ملفك الشخصي وإعداداتك'
                : 'Manage your profile and settings'
              }
            </Text>
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: theme.textSecondary }]}>
            {isArabic ? 'مرحباً' : 'Welcome back'}
          </Text>
          <Text style={[styles.userName, { color: theme.text }]}>
            {isArabic ? 'أحمد المهندس' : 'Ahmed Al-Engineer'}
          </Text>
        </View>
        
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications" size={24} color={theme.text} />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {[
          { id: 'overview', title: { en: 'Overview', ar: 'نظرة عامة' } },
          { id: 'jobs', title: { en: 'Jobs', ar: 'الوظائف' } },
          { id: 'earnings', title: { en: 'Earnings', ar: 'الأرباح' } },
          { id: 'profile', title: { en: 'Profile', ar: 'الملف الشخصي' } },
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
  greeting: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.regular,
  },
  userName: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginTop: SPACING.xs,
  },
  notificationButton: {
    position: 'relative',
    padding: SPACING.sm,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.error,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light.border,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderBottomWidth: 2,
    alignItems: 'center',
  },
  tabText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  content: {
    flex: 1,
  },
  availabilityCard: {
    margin: SPACING.lg,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.light.border,
  },
  availabilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  availabilityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: SPACING.sm,
  },
  availabilityText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  availabilitySubtext: {
    fontSize: TYPOGRAPHY.sizes.caption,
    lineHeight: 16,
  },
  earningsCard: {
    margin: SPACING.lg,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.light.border,
  },
  earningsTitle: {
    fontSize: TYPOGRAPHY.sizes.h4,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.md,
  },
  earningsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  earningsItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  earningsValue: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  earningsLabel: {
    fontSize: TYPOGRAPHY.sizes.caption,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.h4,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  seeAllText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  jobsList: {
    padding: SPACING.lg,
  },
  jobCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.light.border,
    marginBottom: SPACING.md,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  jobTitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
    flex: 1,
    marginRight: SPACING.sm,
  },
  urgencyBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  urgencyText: {
    color: 'white',
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  jobDetails: {
    gap: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  jobRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: SPACING.sm,
  },
  jobDescription: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 18,
    marginBottom: SPACING.md,
  },
  jobActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  jobActionButton: {
    flex: 1,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.light.border,
    marginBottom: SPACING.sm,
  },
  scheduleTime: {
    width: 60,
    alignItems: 'center',
  },
  timeText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  scheduleContent: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  scheduleTitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: SPACING.xs,
  },
  scheduleType: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  scheduleStatus: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  scheduleStatusText: {
    color: 'white',
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.light.border,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  actionTitle: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
    textAlign: 'center',
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
});

export default EngineerDashboardScreen;

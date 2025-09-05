import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

const { width } = Dimensions.get('window');

interface Project {
  id: string;
  title: string;
  engineer: string;
  status: 'active' | 'pending' | 'completed';
  progress: number;
  budget: number;
  dueDate: string;
  category: string;
}

const ClientDashboardScreen: React.FC = () => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'messages'>('overview');

  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  // Mock data - in real app, this would come from Redux store
  const mockProjects: Project[] = [
    {
      id: '1',
      title: 'Site Survey for NEOM Project',
      engineer: 'Ahmed Al-Rashid',
      status: 'active',
      progress: 75,
      budget: 15000,
      dueDate: '2024-02-15',
      category: 'Surveying',
    },
    {
      id: '2',
      title: 'MEP Design Review',
      engineer: 'Sarah Al-Mansouri',
      status: 'pending',
      progress: 0,
      budget: 8000,
      dueDate: '2024-02-20',
      category: 'MEP',
    },
    {
      id: '3',
      title: 'Safety Inspection',
      engineer: 'Mohammed Al-Zahrani',
      status: 'completed',
      progress: 100,
      budget: 5000,
      dueDate: '2024-01-30',
      category: 'HSE',
    },
  ];

  const stats = {
    totalSpent: 28000,
    activeProjects: 2,
    completedProjects: 1,
    averageRating: 4.8,
  };

  const quickActions = [
    {
      id: 'post_job',
      title: { en: 'Post New Job', ar: 'نشر وظيفة جديدة' },
      icon: 'add-circle',
      color: COLORS.primary,
      onPress: () => console.log('Post new job'),
    },
    {
      id: 'browse_engineers',
      title: { en: 'Browse Engineers', ar: 'تصفح المهندسين' },
      icon: 'people',
      color: COLORS.secondary,
      onPress: () => console.log('Browse engineers'),
    },
    {
      id: 'messages',
      title: { en: 'Messages', ar: 'الرسائل' },
      icon: 'chatbubbles',
      color: COLORS.accent,
      onPress: () => console.log('Open messages'),
    },
    {
      id: 'payments',
      title: { en: 'Payments', ar: 'المدفوعات' },
      icon: 'card',
      color: COLORS.success,
      onPress: () => console.log('Open payments'),
    },
  ];

  const renderStatsCard = () => (
    <View style={[styles.statsCard, { backgroundColor: theme.surface }]}>
      <Text style={[styles.statsTitle, { color: theme.text }]}>
        {isArabic ? 'إحصائياتك' : 'Your Stats'}
      </Text>
      
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: COLORS.primary }]}>
            {stats.totalSpent.toLocaleString()} SAR
          </Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
            {isArabic ? 'إجمالي الإنفاق' : 'Total Spent'}
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: COLORS.secondary }]}>
            {stats.activeProjects}
          </Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
            {isArabic ? 'مشاريع نشطة' : 'Active Projects'}
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: COLORS.success }]}>
            {stats.completedProjects}
          </Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
            {isArabic ? 'مشاريع مكتملة' : 'Completed'}
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: COLORS.warning }]}>
            {stats.averageRating} ⭐
          </Text>
          <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
            {isArabic ? 'التقييم المتوسط' : 'Avg Rating'}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.quickActionsSection}>
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
  );

  const renderProjectCard = ({ item }: { item: Project }) => (
    <TouchableOpacity
      style={[styles.projectCard, { backgroundColor: theme.surface }]}
      onPress={() => console.log('Open project:', item.id)}
    >
      <View style={styles.projectHeader}>
        <Text style={[styles.projectTitle, { color: theme.text }]}>
          {item.title}
        </Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(item.status) }
        ]}>
          <Text style={styles.statusText}>
            {getStatusText(item.status)}
          </Text>
        </View>
      </View>
      
      <View style={styles.projectDetails}>
        <View style={styles.projectRow}>
          <Ionicons name="person" size={16} color={theme.textSecondary} />
          <Text style={[styles.projectText, { color: theme.textSecondary }]}>
            {item.engineer}
          </Text>
        </View>
        
        <View style={styles.projectRow}>
          <Ionicons name="cash" size={16} color={theme.textSecondary} />
          <Text style={[styles.projectText, { color: theme.textSecondary }]}>
            {item.budget.toLocaleString()} SAR
          </Text>
        </View>
        
        <View style={styles.projectRow}>
          <Ionicons name="calendar" size={16} color={theme.textSecondary} />
          <Text style={[styles.projectText, { color: theme.textSecondary }]}>
            {item.dueDate}
          </Text>
        </View>
      </View>
      
      {item.status === 'active' && (
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={[styles.progressLabel, { color: theme.textSecondary }]}>
              {isArabic ? 'التقدم' : 'Progress'}
            </Text>
            <Text style={[styles.progressPercent, { color: theme.text }]}>
              {item.progress}%
            </Text>
          </View>
          <View style={[styles.progressBar, { backgroundColor: theme.border }]}>
            <View
              style={[
                styles.progressFill,
                { 
                  width: `${item.progress}%`,
                  backgroundColor: COLORS.primary,
                }
              ]}
            />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return COLORS.primary;
      case 'pending':
        return COLORS.warning;
      case 'completed':
        return COLORS.success;
      default:
        return COLORS.light.border;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return isArabic ? 'نشط' : 'Active';
      case 'pending':
        return isArabic ? 'في الانتظار' : 'Pending';
      case 'completed':
        return isArabic ? 'مكتمل' : 'Completed';
      default:
        return status;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <ScrollView showsVerticalScrollIndicator={false}>
            {renderStatsCard()}
            {renderQuickActions()}
            
            <View style={styles.projectsSection}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>
                  {isArabic ? 'مشاريعك الأخيرة' : 'Recent Projects'}
                </Text>
                <TouchableOpacity onPress={() => setActiveTab('projects')}>
                  <Text style={[styles.seeAllText, { color: COLORS.primary }]}>
                    {isArabic ? 'عرض الكل' : 'See All'}
                  </Text>
                </TouchableOpacity>
              </View>
              
              <FlatList
                data={mockProjects.slice(0, 2)}
                renderItem={renderProjectCard}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
            </View>
          </ScrollView>
        );
      
      case 'projects':
        return (
          <FlatList
            data={mockProjects}
            renderItem={renderProjectCard}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.projectsList}
          />
        );
      
      case 'messages':
        return (
          <View style={styles.emptyState}>
            <Ionicons name="chatbubbles-outline" size={64} color={theme.textSecondary} />
            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              {isArabic ? 'لا توجد رسائل' : 'No Messages'}
            </Text>
            <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
              {isArabic 
                ? 'ستظهر رسائلك مع المهندسين هنا'
                : 'Your messages with engineers will appear here'
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
            {isArabic ? 'أحمد العلي' : 'Ahmed Al-Ali'}
          </Text>
        </View>
        
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications" size={24} color={theme.text} />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      {/* Quick Post Button */}
      <View style={styles.quickPostContainer}>
        <CustomButton
          title={{ en: '+ Post New Job', ar: '+ نشر وظيفة جديدة' }}
          onPress={() => console.log('Post new job')}
          icon="add"
          fullWidth
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {[
          { id: 'overview', title: { en: 'Overview', ar: 'نظرة عامة' } },
          { id: 'projects', title: { en: 'Projects', ar: 'المشاريع' } },
          { id: 'messages', title: { en: 'Messages', ar: 'الرسائل' } },
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
  quickPostContainer: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
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
  statsCard: {
    margin: SPACING.lg,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.light.border,
  },
  statsTitle: {
    fontSize: TYPOGRAPHY.sizes.h4,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  statValue: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.sizes.caption,
    textAlign: 'center',
  },
  quickActionsSection: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.h4,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.md,
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
  projectsSection: {
    paddingHorizontal: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  seeAllText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  projectsList: {
    padding: SPACING.lg,
  },
  projectCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.light.border,
    marginBottom: SPACING.md,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  projectTitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
    flex: 1,
    marginRight: SPACING.sm,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  statusText: {
    color: 'white',
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  projectDetails: {
    gap: SPACING.xs,
  },
  projectRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  projectText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: SPACING.sm,
  },
  progressSection: {
    marginTop: SPACING.md,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  progressLabel: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  progressPercent: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
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

export default ClientDashboardScreen;

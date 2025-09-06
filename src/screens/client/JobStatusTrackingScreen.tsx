import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { RootState } from '../../store';
import { Language, JobStatus, MilestoneStatus } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

const { width } = Dimensions.get('window');

interface Milestone {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  percentage: number;
  amount: number;
  status: MilestoneStatus;
  dueDate: string;
  completedAt?: string;
  deliverables: string[];
}

interface ProjectUpdate {
  id: string;
  type: 'milestone' | 'message' | 'document' | 'payment';
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  timestamp: string;
  author: string;
  isRead: boolean;
}

interface JobStatusTrackingScreenProps {
  route?: {
    params: {
      jobId: string;
    };
  };
}

const JobStatusTrackingScreen: React.FC<JobStatusTrackingScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'milestones' | 'updates' | 'documents'>('overview');

  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  // Mock data - replace with actual API calls
  const jobData = {
    id: route?.params?.jobId || '1',
    title: { en: 'Office Building MEP Design', ar: 'تصميم الأنظمة الكهروميكانيكية لمبنى مكتبي' },
    client: { en: 'Al-Rajhi Construction', ar: 'شركة الراجحي للإنشاءات' },
    engineer: { en: 'Ahmed Al-Sheikh', ar: 'أحمد الشيخ' },
    status: JobStatus.IN_PROGRESS,
    progress: 65,
    budget: 45000,
    spent: 29250,
    startDate: '2024-01-15',
    expectedEndDate: '2024-03-15',
    actualEndDate: null,
    location: { en: 'Riyadh, Saudi Arabia', ar: 'الرياض، المملكة العربية السعودية' },
  };

  const milestones: Milestone[] = [
    {
      id: '1',
      title: { en: 'Site Survey & Analysis', ar: 'مسح الموقع والتحليل' },
      description: { en: 'Complete site survey and initial analysis', ar: 'إكمال مسح الموقع والتحليل الأولي' },
      percentage: 20,
      amount: 9000,
      status: MilestoneStatus.COMPLETED,
      dueDate: '2024-01-25',
      completedAt: '2024-01-23',
      deliverables: ['Site photos', 'Measurements', 'Analysis report'],
    },
    {
      id: '2',
      title: { en: 'Conceptual Design', ar: 'التصميم المفاهيمي' },
      description: { en: 'Develop initial design concepts', ar: 'تطوير المفاهيم التصميمية الأولية' },
      percentage: 30,
      amount: 13500,
      status: MilestoneStatus.COMPLETED,
      dueDate: '2024-02-10',
      completedAt: '2024-02-08',
      deliverables: ['Design sketches', '3D models', 'Concept presentation'],
    },
    {
      id: '3',
      title: { en: 'Detailed Engineering', ar: 'الهندسة التفصيلية' },
      description: { en: 'Complete detailed engineering drawings', ar: 'إكمال الرسومات الهندسية التفصيلية' },
      percentage: 40,
      amount: 18000,
      status: MilestoneStatus.IN_PROGRESS,
      dueDate: '2024-02-28',
      deliverables: ['MEP drawings', 'Specifications', 'Bill of quantities'],
    },
    {
      id: '4',
      title: { en: 'Final Review & Approval', ar: 'المراجعة النهائية والموافقة' },
      description: { en: 'Final review and client approval', ar: 'المراجعة النهائية وموافقة العميل' },
      percentage: 10,
      amount: 4500,
      status: MilestoneStatus.PENDING,
      dueDate: '2024-03-15',
      deliverables: ['Final drawings', 'As-built documentation', 'Handover package'],
    },
  ];

  const projectUpdates: ProjectUpdate[] = [
    {
      id: '1',
      type: 'milestone',
      title: { en: 'Milestone 2 Completed', ar: 'تم إكمال المرحلة الثانية' },
      description: { en: 'Conceptual design phase completed ahead of schedule', ar: 'تم إكمال مرحلة التصميم المفاهيمي قبل الموعد المحدد' },
      timestamp: '2024-02-08T14:30:00Z',
      author: 'Ahmed Al-Sheikh',
      isRead: true,
    },
    {
      id: '2',
      type: 'document',
      title: { en: 'New Documents Uploaded', ar: 'تم رفع مستندات جديدة' },
      description: { en: 'Updated MEP drawings and specifications uploaded', ar: 'تم رفع الرسومات والمواصفات المحدثة للأنظمة الكهروميكانيكية' },
      timestamp: '2024-02-10T09:15:00Z',
      author: 'Ahmed Al-Sheikh',
      isRead: false,
    },
    {
      id: '3',
      type: 'message',
      title: { en: 'Site Visit Scheduled', ar: 'تم جدولة زيارة الموقع' },
      description: { en: 'Site visit scheduled for next week to verify measurements', ar: 'تم جدولة زيارة الموقع الأسبوع القادم للتحقق من القياسات' },
      timestamp: '2024-02-12T16:45:00Z',
      author: 'Al-Rajhi Construction',
      isRead: true,
    },
  ];

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case JobStatus.DRAFT:
        return COLORS.warning;
      case JobStatus.POSTED:
        return COLORS.info;
      case JobStatus.MATCHED:
        return COLORS.primary;
      case JobStatus.IN_PROGRESS:
        return COLORS.accent;
      case JobStatus.COMPLETED:
        return COLORS.success;
      case JobStatus.CANCELLED:
        return COLORS.error;
      default:
        return COLORS.textSecondary;
    }
  };

  const getMilestoneStatusColor = (status: MilestoneStatus) => {
    switch (status) {
      case MilestoneStatus.COMPLETED:
        return COLORS.success;
      case MilestoneStatus.IN_PROGRESS:
        return COLORS.accent;
      case MilestoneStatus.PENDING:
        return COLORS.textSecondary;
      case MilestoneStatus.APPROVED:
        return COLORS.primary;
      case MilestoneStatus.REJECTED:
        return COLORS.error;
      default:
        return COLORS.textSecondary;
    }
  };

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const formatCurrency = (amount: number) => {
    return `SAR ${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US');
  };

  const renderOverview = () => (
    <View style={styles.tabContent}>
      {/* Progress Overview */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>
          {isArabic ? 'نظرة عامة على التقدم' : 'Progress Overview'}
        </Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={[styles.progressLabel, { color: theme.text }]}>
              {isArabic ? 'التقدم الإجمالي' : 'Overall Progress'}
            </Text>
            <Text style={[styles.progressPercentage, { color: COLORS.primary }]}>
              {jobData.progress}%
            </Text>
          </View>
          
          <View style={[styles.progressBar, { backgroundColor: theme.border }]}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${jobData.progress}%`,
                  backgroundColor: COLORS.primary 
                }
              ]} 
            />
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: COLORS.primary }]}>
              {formatCurrency(jobData.budget)}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              {isArabic ? 'الميزانية الإجمالية' : 'Total Budget'}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: COLORS.accent }]}>
              {formatCurrency(jobData.spent)}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              {isArabic ? 'المصروف حتى الآن' : 'Spent So Far'}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: COLORS.success }]}>
              {formatCurrency(jobData.budget - jobData.spent)}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              {isArabic ? 'المتبقي' : 'Remaining'}
            </Text>
          </View>
        </View>
      </View>

      {/* Project Timeline */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>
          {isArabic ? 'الجدول الزمني للمشروع' : 'Project Timeline'}
        </Text>
        
        <View style={styles.timelineItem}>
          <View style={[styles.timelineDot, { backgroundColor: COLORS.success }]} />
          <View style={styles.timelineContent}>
            <Text style={[styles.timelineTitle, { color: theme.text }]}>
              {isArabic ? 'بداية المشروع' : 'Project Start'}
            </Text>
            <Text style={[styles.timelineDate, { color: theme.textSecondary }]}>
              {formatDate(jobData.startDate)}
            </Text>
          </View>
        </View>

        <View style={styles.timelineItem}>
          <View style={[styles.timelineDot, { backgroundColor: COLORS.accent }]} />
          <View style={styles.timelineContent}>
            <Text style={[styles.timelineTitle, { color: theme.text }]}>
              {isArabic ? 'في التقدم' : 'In Progress'}
            </Text>
            <Text style={[styles.timelineDate, { color: theme.textSecondary }]}>
              {isArabic ? '65% مكتمل' : '65% Complete'}
            </Text>
          </View>
        </View>

        <View style={styles.timelineItem}>
          <View style={[styles.timelineDot, { backgroundColor: theme.border }]} />
          <View style={styles.timelineContent}>
            <Text style={[styles.timelineTitle, { color: theme.text }]}>
              {isArabic ? 'التسليم المتوقع' : 'Expected Delivery'}
            </Text>
            <Text style={[styles.timelineDate, { color: theme.textSecondary }]}>
              {formatDate(jobData.expectedEndDate)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderMilestones = () => (
    <View style={styles.tabContent}>
      {milestones.map((milestone, index) => (
        <View key={milestone.id} style={[styles.milestoneCard, { backgroundColor: theme.card }]}>
          <View style={styles.milestoneHeader}>
            <View style={styles.milestoneInfo}>
              <Text style={[styles.milestoneTitle, { color: theme.text }]}>
                {getText(milestone.title)}
              </Text>
              <Text style={[styles.milestoneDescription, { color: theme.textSecondary }]}>
                {getText(milestone.description)}
              </Text>
            </View>
            <View style={[styles.milestoneStatus, { backgroundColor: getMilestoneStatusColor(milestone.status) }]}>
              <Text style={styles.milestoneStatusText}>
                {isArabic ? 
                  (milestone.status === MilestoneStatus.COMPLETED ? 'مكتمل' :
                   milestone.status === MilestoneStatus.IN_PROGRESS ? 'قيد التنفيذ' : 'معلق') :
                  (milestone.status === MilestoneStatus.COMPLETED ? 'Completed' :
                   milestone.status === MilestoneStatus.IN_PROGRESS ? 'In Progress' : 'Pending')
                }
              </Text>
            </View>
          </View>

          <View style={styles.milestoneProgress}>
            <View style={styles.milestoneProgressHeader}>
              <Text style={[styles.milestoneProgressLabel, { color: theme.text }]}>
                {isArabic ? 'التقدم' : 'Progress'}
              </Text>
              <Text style={[styles.milestoneProgressValue, { color: COLORS.primary }]}>
                {milestone.percentage}%
              </Text>
            </View>
            <View style={[styles.milestoneProgressBar, { backgroundColor: theme.border }]}>
              <View 
                style={[
                  styles.milestoneProgressFill, 
                  { 
                    width: `${milestone.percentage}%`,
                    backgroundColor: getMilestoneStatusColor(milestone.status)
                  }
                ]} 
              />
            </View>
          </View>

          <View style={styles.milestoneDetails}>
            <View style={styles.milestoneDetailItem}>
              <Ionicons name="cash-outline" size={16} color={theme.textSecondary} />
              <Text style={[styles.milestoneDetailText, { color: theme.textSecondary }]}>
                {formatCurrency(milestone.amount)}
              </Text>
            </View>
            <View style={styles.milestoneDetailItem}>
              <Ionicons name="calendar-outline" size={16} color={theme.textSecondary} />
              <Text style={[styles.milestoneDetailText, { color: theme.textSecondary }]}>
                {isArabic ? 'الموعد النهائي' : 'Due'}: {formatDate(milestone.dueDate)}
              </Text>
            </View>
            {milestone.completedAt && (
              <View style={styles.milestoneDetailItem}>
                <Ionicons name="checkmark-circle-outline" size={16} color={COLORS.success} />
                <Text style={[styles.milestoneDetailText, { color: COLORS.success }]}>
                  {isArabic ? 'مكتمل في' : 'Completed on'}: {formatDate(milestone.completedAt)}
                </Text>
              </View>
            )}
          </View>

          {milestone.deliverables.length > 0 && (
            <View style={styles.deliverablesContainer}>
              <Text style={[styles.deliverablesTitle, { color: theme.text }]}>
                {isArabic ? 'المخرجات' : 'Deliverables'}:
              </Text>
              {milestone.deliverables.map((deliverable, idx) => (
                <View key={idx} style={styles.deliverableItem}>
                  <Ionicons name="document-text-outline" size={14} color={theme.textSecondary} />
                  <Text style={[styles.deliverableText, { color: theme.textSecondary }]}>
                    {deliverable}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  );

  const renderUpdates = () => (
    <View style={styles.tabContent}>
      {projectUpdates.map((update) => (
        <View key={update.id} style={[styles.updateCard, { backgroundColor: theme.card }]}>
          <View style={styles.updateHeader}>
            <View style={styles.updateIconContainer}>
              <Ionicons 
                name={
                  update.type === 'milestone' ? 'flag-outline' :
                  update.type === 'document' ? 'document-text-outline' :
                  update.type === 'message' ? 'chatbubble-outline' : 'card-outline'
                } 
                size={20} 
                color={COLORS.primary} 
              />
            </View>
            <View style={styles.updateContent}>
              <Text style={[styles.updateTitle, { color: theme.text }]}>
                {getText(update.title)}
              </Text>
              <Text style={[styles.updateDescription, { color: theme.textSecondary }]}>
                {getText(update.description)}
              </Text>
              <View style={styles.updateMeta}>
                <Text style={[styles.updateAuthor, { color: theme.textSecondary }]}>
                  {update.author}
                </Text>
                <Text style={[styles.updateTime, { color: theme.textSecondary }]}>
                  {formatDate(update.timestamp)}
                </Text>
              </View>
            </View>
            {!update.isRead && (
              <View style={styles.unreadIndicator} />
            )}
          </View>
        </View>
      ))}
    </View>
  );

  const renderDocuments = () => (
    <View style={styles.tabContent}>
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>
          {isArabic ? 'مستندات المشروع' : 'Project Documents'}
        </Text>
        <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
          {isArabic ? 'سيتم إضافة المستندات قريباً' : 'Documents will be added soon'}
        </Text>
      </View>
    </View>
  );

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'overview':
        return renderOverview();
      case 'milestones':
        return renderMilestones();
      case 'updates':
        return renderUpdates();
      case 'documents':
        return renderDocuments();
      default:
        return renderOverview();
    }
  };

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
              {getText(jobData.title)}
            </Text>
            <Text style={styles.headerSubtitle}>
              {getText(jobData.client)} • {getText(jobData.location)}
            </Text>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="ellipsis-vertical" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Status Bar */}
      <View style={[styles.statusBar, { backgroundColor: theme.surface }]}>
        <View style={styles.statusItem}>
          <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(jobData.status) }]} />
          <Text style={[styles.statusText, { color: theme.text }]}>
            {isArabic ? 
              (jobData.status === JobStatus.IN_PROGRESS ? 'قيد التنفيذ' : 'In Progress') :
              (jobData.status === JobStatus.IN_PROGRESS ? 'In Progress' : 'In Progress')
            }
          </Text>
        </View>
        <View style={styles.statusItem}>
          <Ionicons name="person-outline" size={16} color={theme.textSecondary} />
          <Text style={[styles.statusText, { color: theme.textSecondary }]}>
            {jobData.engineer.en}
          </Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={[styles.tabContainer, { backgroundColor: theme.surface }]}>
        {[
          { key: 'overview', label: { en: 'Overview', ar: 'نظرة عامة' }, icon: 'grid-outline' },
          { key: 'milestones', label: { en: 'Milestones', ar: 'المراحل' }, icon: 'flag-outline' },
          { key: 'updates', label: { en: 'Updates', ar: 'التحديثات' }, icon: 'notifications-outline' },
          { key: 'documents', label: { en: 'Documents', ar: 'المستندات' }, icon: 'document-text-outline' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tab,
              selectedTab === tab.key && styles.activeTab,
              selectedTab === tab.key && { backgroundColor: COLORS.primary }
            ]}
            onPress={() => setSelectedTab(tab.key as any)}
          >
            <Ionicons 
              name={tab.icon as any} 
              size={20} 
              color={selectedTab === tab.key ? COLORS.white : theme.textSecondary} 
            />
            <Text style={[
              styles.tabText,
              { color: selectedTab === tab.key ? COLORS.white : theme.textSecondary }
            ]}>
              {getText(tab.label)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {renderTabContent()}
      </ScrollView>

      {/* Action Buttons */}
      <View style={[styles.actionContainer, { backgroundColor: theme.surface }]}>
        <CustomButton
          title={isArabic ? 'إرسال رسالة' : 'Send Message'}
          onPress={() => {}}
          variant="outline"
          style={styles.actionButton}
        />
        <CustomButton
          title={isArabic ? 'طلب تحديث' : 'Request Update'}
          onPress={() => {}}
          style={styles.actionButton}
        />
      </View>
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
  moreButton: {
    padding: 4,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: BORDER_RADIUS.sm,
    marginHorizontal: 2,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginLeft: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  tabContent: {
    flex: 1,
  },
  card: {
    borderRadius: BORDER_RADIUS.md,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  progressPercentage: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.sizes.caption,
    textAlign: 'center',
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 16,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: 4,
  },
  timelineDate: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  milestoneCard: {
    borderRadius: BORDER_RADIUS.md,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  milestoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  milestoneInfo: {
    flex: 1,
    marginRight: 12,
  },
  milestoneTitle: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: 4,
  },
  milestoneDescription: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 20,
  },
  milestoneStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.sm,
  },
  milestoneStatusText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.white,
  },
  milestoneProgress: {
    marginBottom: 16,
  },
  milestoneProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  milestoneProgressLabel: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  milestoneProgressValue: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  milestoneProgressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  milestoneProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  milestoneDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  milestoneDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  milestoneDetailText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: 6,
  },
  deliverablesContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 16,
  },
  deliverablesTitle: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: 8,
  },
  deliverableItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  deliverableText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: 8,
  },
  updateCard: {
    borderRadius: BORDER_RADIUS.md,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  updateHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  updateIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  updateContent: {
    flex: 1,
  },
  updateTitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: 4,
  },
  updateDescription: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 20,
    marginBottom: 8,
  },
  updateMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  updateAuthor: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  updateTime: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginLeft: 8,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  actionContainer: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default JobStatusTrackingScreen;
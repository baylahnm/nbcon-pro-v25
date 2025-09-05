import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../constants';
import JobService, { Job } from '../../services/jobService';
import CustomButton from '../../components/forms/CustomButton';

const JobManagementScreen: React.FC = () => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'draft' | 'posted' | 'active' | 'completed'>('all');

  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [jobs, activeTab]);

  const loadJobs = async () => {
    try {
      setIsLoading(true);
      // In real app, get client ID from auth state
      const clientJobs = JobService.getJobsForClient('current_client_id');
      setJobs(clientJobs);
    } catch (error) {
      console.error('Error loading jobs:', error);
      Alert.alert(
        isArabic ? 'خطأ' : 'Error',
        isArabic ? 'فشل في تحميل الوظائف' : 'Failed to load jobs'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadJobs();
    setIsRefreshing(false);
  };

  const applyFilters = () => {
    let filtered = [...jobs];

    switch (activeTab) {
      case 'draft':
        filtered = filtered.filter(job => job.status === 'draft');
        break;
      case 'posted':
        filtered = filtered.filter(job => job.status === 'posted');
        break;
      case 'active':
        filtered = filtered.filter(job => job.status === 'active');
        break;
      case 'completed':
        filtered = filtered.filter(job => job.status === 'completed');
        break;
      case 'all':
      default:
        // Show all jobs
        break;
    }

    setFilteredJobs(filtered);
  };

  const handlePostJob = async (job: Job) => {
    try {
      await JobService.postJob(job.id);
      await loadJobs();
      Alert.alert(
        isArabic ? 'تم النشر' : 'Job Posted',
        isArabic ? 'تم نشر الوظيفة بنجاح' : 'Job posted successfully'
      );
    } catch (error) {
      console.error('Error posting job:', error);
      Alert.alert(
        isArabic ? 'خطأ' : 'Error',
        isArabic ? 'فشل في نشر الوظيفة' : 'Failed to post job'
      );
    }
  };

  const handleAcceptProposal = async (job: Job, proposalId: string) => {
    try {
      await JobService.acceptProposal(job.id, proposalId);
      await loadJobs();
      Alert.alert(
        isArabic ? 'تم القبول' : 'Proposal Accepted',
        isArabic ? 'تم قبول الطلب بنجاح' : 'Proposal accepted successfully'
      );
    } catch (error) {
      console.error('Error accepting proposal:', error);
      Alert.alert(
        isArabic ? 'خطأ' : 'Error',
        isArabic ? 'فشل في قبول الطلب' : 'Failed to accept proposal'
      );
    }
  };

  const handleCompleteJob = async (job: Job) => {
    try {
      await JobService.completeJob(job.id);
      await loadJobs();
      Alert.alert(
        isArabic ? 'تم الإكمال' : 'Job Completed',
        isArabic ? 'تم إكمال الوظيفة بنجاح' : 'Job completed successfully'
      );
    } catch (error) {
      console.error('Error completing job:', error);
      Alert.alert(
        isArabic ? 'خطأ' : 'Error',
        isArabic ? 'فشل في إكمال الوظيفة' : 'Failed to complete job'
      );
    }
  };

  const handleCancelJob = async (job: Job) => {
    Alert.alert(
      isArabic ? 'إلغاء الوظيفة' : 'Cancel Job',
      isArabic ? 'هل أنت متأكد من إلغاء هذه الوظيفة؟' : 'Are you sure you want to cancel this job?',
      [
        { text: isArabic ? 'لا' : 'No', style: 'cancel' },
        {
          text: isArabic ? 'نعم' : 'Yes',
          style: 'destructive',
          onPress: async () => {
            try {
              await JobService.cancelJob(job.id);
              await loadJobs();
            } catch (error) {
              console.error('Error cancelling job:', error);
              Alert.alert(
                isArabic ? 'خطأ' : 'Error',
                isArabic ? 'فشل في إلغاء الوظيفة' : 'Failed to cancel job'
              );
            }
          },
        },
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return COLORS.light.textSecondary;
      case 'posted':
        return COLORS.primary;
      case 'active':
        return COLORS.success;
      case 'completed':
        return COLORS.accent;
      case 'cancelled':
        return COLORS.error;
      default:
        return COLORS.light.textSecondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'draft':
        return isArabic ? 'مسودة' : 'Draft';
      case 'posted':
        return isArabic ? 'منشور' : 'Posted';
      case 'active':
        return isArabic ? 'نشط' : 'Active';
      case 'completed':
        return isArabic ? 'مكتمل' : 'Completed';
      case 'cancelled':
        return isArabic ? 'ملغي' : 'Cancelled';
      default:
        return status;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (days > 0) return `${days}${isArabic ? ' يوم' : 'd'}`;
    if (hours > 0) return `${hours}${isArabic ? ' ساعة' : 'h'}`;
    if (minutes > 0) return `${minutes}${isArabic ? ' دقيقة' : 'm'}`;
    return isArabic ? 'الآن' : 'Now';
  };

  const renderJobCard = ({ item }: { item: Job }) => (
    <TouchableOpacity
      style={[styles.jobCard, { backgroundColor: theme.surface }]}
      onPress={() => {
        setSelectedJob(item);
        setShowJobDetails(true);
      }}
    >
      <View style={styles.jobHeader}>
        <Text style={[styles.jobTitle, { color: theme.text }]}>
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

      <Text style={[styles.jobDescription, { color: theme.textSecondary }]}>
        {item.description.length > 100 
          ? `${item.description.substring(0, 100)}...` 
          : item.description
        }
      </Text>

      <View style={styles.jobDetails}>
        <View style={styles.jobDetailRow}>
          <Ionicons name="location" size={16} color={theme.textSecondary} />
          <Text style={[styles.jobDetailText, { color: theme.textSecondary }]}>
            {item.location.city}
          </Text>
        </View>

        <View style={styles.jobDetailRow}>
          <Ionicons name="cash" size={16} color={theme.textSecondary} />
          <Text style={[styles.jobDetailText, { color: theme.textSecondary }]}>
            {item.budget.min.toLocaleString()} - {item.budget.max.toLocaleString()} SAR
          </Text>
        </View>

        <View style={styles.jobDetailRow}>
          <Ionicons name="time" size={16} color={theme.textSecondary} />
          <Text style={[styles.jobDetailText, { color: theme.textSecondary }]}>
            {item.timeline.estimatedDuration} {isArabic ? 'يوم' : 'days'}
          </Text>
        </View>

        {item.engineerName && (
          <View style={styles.jobDetailRow}>
            <Ionicons name="person" size={16} color={theme.textSecondary} />
            <Text style={[styles.jobDetailText, { color: theme.textSecondary }]}>
              {item.engineerName}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.jobFooter}>
        <Text style={[styles.jobTime, { color: theme.textSecondary }]}>
          {formatTimeAgo(item.createdAt)}
        </Text>
        
        <View style={styles.jobActions}>
          {item.status === 'draft' && (
            <CustomButton
              title={{ en: 'Post', ar: 'نشر' }}
              size="small"
              onPress={() => handlePostJob(item)}
            />
          )}
          
          {item.status === 'posted' && item.proposals.length > 0 && (
            <Text style={[styles.proposalCount, { color: COLORS.primary }]}>
              {item.proposals.length} {isArabic ? 'طلب' : 'proposals'}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderJobDetails = () => {
    if (!selectedJob) return null;

    return (
      <Modal
        visible={showJobDetails}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={[styles.detailsModal, { backgroundColor: theme.background }]}>
          <View style={styles.detailsHeader}>
            <Text style={[styles.detailsTitle, { color: theme.text }]}>
              {selectedJob.title}
            </Text>
            <TouchableOpacity onPress={() => setShowJobDetails(false)}>
              <Ionicons name="close" size={24} color={theme.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.detailsContent}>
            <View style={styles.detailsSection}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                {isArabic ? 'التفاصيل' : 'Details'}
              </Text>
              <Text style={[styles.detailsText, { color: theme.textSecondary }]}>
                {selectedJob.description}
              </Text>
            </View>

            <View style={styles.detailsSection}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                {isArabic ? 'المعلومات الأساسية' : 'Basic Information'}
              </Text>
              
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
                  {isArabic ? 'الحالة' : 'Status'}
                </Text>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(selectedJob.status) }
                ]}>
                  <Text style={styles.statusText}>
                    {getStatusText(selectedJob.status)}
                  </Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
                  {isArabic ? 'الموقع' : 'Location'}
                </Text>
                <Text style={[styles.infoValue, { color: theme.text }]}>
                  {selectedJob.location.city}, {selectedJob.location.region}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
                  {isArabic ? 'الميزانية' : 'Budget'}
                </Text>
                <Text style={[styles.infoValue, { color: theme.text }]}>
                  {selectedJob.budget.min.toLocaleString()} - {selectedJob.budget.max.toLocaleString()} SAR
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
                  {isArabic ? 'المدة المتوقعة' : 'Estimated Duration'}
                </Text>
                <Text style={[styles.infoValue, { color: theme.text }]}>
                  {selectedJob.timeline.estimatedDuration} {isArabic ? 'يوم' : 'days'}
                </Text>
              </View>

              {selectedJob.engineerName && (
                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
                    {isArabic ? 'المهندس' : 'Engineer'}
                  </Text>
                  <Text style={[styles.infoValue, { color: theme.text }]}>
                    {selectedJob.engineerName}
                  </Text>
                </View>
              )}
            </View>

            {selectedJob.proposals.length > 0 && (
              <View style={styles.detailsSection}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>
                  {isArabic ? 'الطلبات المقدمة' : 'Proposals'} ({selectedJob.proposals.length})
                </Text>
                
                {selectedJob.proposals.map((proposal) => (
                  <View key={proposal.id} style={[styles.proposalCard, { backgroundColor: theme.surface }]}>
                    <View style={styles.proposalHeader}>
                      <Text style={[styles.proposalEngineer, { color: theme.text }]}>
                        {proposal.engineerName}
                      </Text>
                      <Text style={[styles.proposalAmount, { color: COLORS.primary }]}>
                        {proposal.proposedAmount.toLocaleString()} SAR
                      </Text>
                    </View>
                    
                    <Text style={[styles.proposalTimeline, { color: theme.textSecondary }]}>
                      {isArabic ? 'المدة المقترحة' : 'Proposed Timeline'}: {proposal.proposedTimeline} {isArabic ? 'يوم' : 'days'}
                    </Text>
                    
                    <Text style={[styles.proposalLetter, { color: theme.textSecondary }]}>
                      {proposal.coverLetter}
                    </Text>
                    
                    {proposal.status === 'pending' && (
                      <View style={styles.proposalActions}>
                        <CustomButton
                          title={{ en: 'Reject', ar: 'رفض' }}
                          variant="outline"
                          size="small"
                          onPress={() => console.log('Reject proposal')}
                          style={styles.proposalButton}
                        />
                        <CustomButton
                          title={{ en: 'Accept', ar: 'قبول' }}
                          size="small"
                          onPress={() => handleAcceptProposal(selectedJob, proposal.id)}
                          style={styles.proposalButton}
                        />
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}

            <View style={styles.detailsActions}>
              {selectedJob.status === 'active' && (
                <CustomButton
                  title={{ en: 'Complete Job', ar: 'إكمال الوظيفة' }}
                  onPress={() => handleCompleteJob(selectedJob)}
                  style={styles.actionButton}
                />
              )}
              
              {(selectedJob.status === 'draft' || selectedJob.status === 'posted') && (
                <CustomButton
                  title={{ en: 'Cancel Job', ar: 'إلغاء الوظيفة' }}
                  variant="outline"
                  onPress={() => handleCancelJob(selectedJob)}
                  style={styles.actionButton}
                />
              )}
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="briefcase-outline" size={64} color={theme.textSecondary} />
      <Text style={[styles.emptyTitle, { color: theme.text }]}>
        {isArabic ? 'لا توجد وظائف' : 'No Jobs Found'}
      </Text>
      <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
        {isArabic 
          ? 'لم تقم بإنشاء أي وظائف بعد. ابدأ بإنشاء وظيفة جديدة.'
          : 'You haven\'t created any jobs yet. Start by creating a new job.'
        }
      </Text>
      <CustomButton
        title={{ en: 'Create Job', ar: 'إنشاء وظيفة' }}
        onPress={() => console.log('Create job')}
        style={styles.emptyAction}
      />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          {isArabic ? 'إدارة الوظائف' : 'Job Management'}
        </Text>
        <TouchableOpacity
          style={[styles.createButton, { backgroundColor: COLORS.primary }]}
          onPress={() => console.log('Create job')}
        >
          <Ionicons name="add" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {[
          { id: 'all', title: { en: 'All', ar: 'الكل' }, count: jobs.length },
          { id: 'draft', title: { en: 'Draft', ar: 'مسودة' }, count: jobs.filter(j => j.status === 'draft').length },
          { id: 'posted', title: { en: 'Posted', ar: 'منشور' }, count: jobs.filter(j => j.status === 'posted').length },
          { id: 'active', title: { en: 'Active', ar: 'نشط' }, count: jobs.filter(j => j.status === 'active').length },
          { id: 'completed', title: { en: 'Completed', ar: 'مكتمل' }, count: jobs.filter(j => j.status === 'completed').length },
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
                  {tab.count}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Jobs List */}
      <FlatList
        data={filteredJobs}
        renderItem={renderJobCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.jobsList}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        ListEmptyComponent={renderEmptyState}
      />

      {/* Job Details Modal */}
      {renderJobDetails()}
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
  createButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
    position: 'relative',
  },
  tabText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  tabBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: COLORS.error,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBadgeText: {
    color: 'white',
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.bold,
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
  jobDescription: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 18,
    marginBottom: SPACING.md,
  },
  jobDetails: {
    gap: SPACING.xs,
    marginBottom: SPACING.md,
  },
  jobDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobDetailText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: SPACING.sm,
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobTime: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  jobActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  proposalCount: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
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
    marginBottom: SPACING.lg,
  },
  emptyAction: {
    marginTop: SPACING.md,
  },
  detailsModal: {
    flex: 1,
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light.border,
  },
  detailsTitle: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
    flex: 1,
    marginRight: SPACING.sm,
  },
  detailsContent: {
    flex: 1,
    padding: SPACING.lg,
  },
  detailsSection: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.h4,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.md,
  },
  detailsText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  infoLabel: {
    fontSize: TYPOGRAPHY.sizes.body2,
    flex: 1,
  },
  infoValue: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    flex: 1,
    textAlign: 'right',
  },
  proposalCard: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.light.border,
    marginBottom: SPACING.sm,
  },
  proposalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  proposalEngineer: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  proposalAmount: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  proposalTimeline: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginBottom: SPACING.sm,
  },
  proposalLetter: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 18,
    marginBottom: SPACING.sm,
  },
  proposalActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  proposalButton: {
    flex: 1,
  },
  detailsActions: {
    marginTop: SPACING.lg,
    gap: SPACING.sm,
  },
  actionButton: {
    marginBottom: SPACING.sm,
  },
});

export default JobManagementScreen;

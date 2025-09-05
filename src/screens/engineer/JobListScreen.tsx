import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  Alert,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../constants';
import JobService, { Job, JobFilter, JobSearchParams } from '../../services/jobService';
import CustomButton from '../../components/forms/CustomButton';
import CustomInput from '../../components/forms/CustomInput';

const JobListScreen: React.FC = () => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'applied' | 'saved'>('all');
  const [filters, setFilters] = useState<JobFilter>({});
  const [proposalData, setProposalData] = useState({
    proposedAmount: '',
    proposedTimeline: '',
    coverLetter: '',
  });

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
  }, [jobs, searchQuery, filters, activeTab]);

  const loadJobs = async () => {
    try {
      setIsLoading(true);
      const result = await JobService.getJobs({
        filters: { status: 'posted' },
        sortBy: 'date',
        sortOrder: 'desc',
      });
      setJobs(result.jobs);
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

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.location.city.toLowerCase().includes(query) ||
        job.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(job => job.category === filters.category);
    }

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(job =>
        job.location.city.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    // Apply budget filter
    if (filters.budgetMin) {
      filtered = filtered.filter(job => job.budget.max >= filters.budgetMin!);
    }
    if (filters.budgetMax) {
      filtered = filtered.filter(job => job.budget.min <= filters.budgetMax!);
    }

    // Apply urgency filter
    if (filters.urgency) {
      filtered = filtered.filter(job => job.timeline.urgency === filters.urgency);
    }

    setFilteredJobs(filtered);
  };

  const handleApplyForJob = async (job: Job) => {
    setSelectedJob(job);
    setShowProposalModal(true);
  };

  const submitProposal = async () => {
    if (!selectedJob || !proposalData.proposedAmount || !proposalData.coverLetter) {
      Alert.alert(
        isArabic ? 'خطأ' : 'Error',
        isArabic ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields'
      );
      return;
    }

    try {
      await JobService.applyForJob(selectedJob.id, 'current_engineer_id', 'Current Engineer', {
        proposedAmount: parseFloat(proposalData.proposedAmount),
        proposedTimeline: parseInt(proposalData.proposedTimeline),
        coverLetter: proposalData.coverLetter,
      });

      Alert.alert(
        isArabic ? 'تم التقديم' : 'Application Submitted',
        isArabic ? 'تم تقديم طلبك بنجاح' : 'Your application has been submitted successfully'
      );

      setShowProposalModal(false);
      setProposalData({ proposedAmount: '', proposedTimeline: '', coverLetter: '' });
      setSelectedJob(null);
    } catch (error) {
      console.error('Error submitting proposal:', error);
      Alert.alert(
        isArabic ? 'خطأ' : 'Error',
        isArabic ? 'فشل في تقديم الطلب' : 'Failed to submit application'
      );
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency':
        return COLORS.error;
      case 'priority':
        return COLORS.warning;
      case 'standard':
        return COLORS.success;
      default:
        return COLORS.light.textSecondary;
    }
  };

  const getUrgencyText = (urgency: string) => {
    switch (urgency) {
      case 'emergency':
        return isArabic ? 'طوارئ' : 'Emergency';
      case 'priority':
        return isArabic ? 'أولوية' : 'Priority';
      case 'standard':
        return isArabic ? 'عادي' : 'Standard';
      default:
        return urgency;
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
      onPress={() => setSelectedJob(item)}
    >
      <View style={styles.jobHeader}>
        <Text style={[styles.jobTitle, { color: theme.text }]}>
          {item.title}
        </Text>
        <View style={[
          styles.urgencyBadge,
          { backgroundColor: getUrgencyColor(item.timeline.urgency) }
        ]}>
          <Text style={styles.urgencyText}>
            {getUrgencyText(item.timeline.urgency)}
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

        <View style={styles.jobDetailRow}>
          <Ionicons name="person" size={16} color={theme.textSecondary} />
          <Text style={[styles.jobDetailText, { color: theme.textSecondary }]}>
            {item.clientName}
          </Text>
        </View>
      </View>

      <View style={styles.jobFooter}>
        <Text style={[styles.jobTime, { color: theme.textSecondary }]}>
          {formatTimeAgo(item.createdAt)}
        </Text>
        
        <View style={styles.jobActions}>
          <TouchableOpacity style={styles.saveButton}>
            <Ionicons name="bookmark-outline" size={20} color={theme.textSecondary} />
          </TouchableOpacity>
          
          <CustomButton
            title={{ en: 'Apply', ar: 'تقدم' }}
            size="small"
            onPress={() => handleApplyForJob(item)}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFilters = () => (
    <Modal
      visible={showFilters}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={[styles.filterModal, { backgroundColor: theme.background }]}>
        <View style={styles.filterHeader}>
          <Text style={[styles.filterTitle, { color: theme.text }]}>
            {isArabic ? 'تصفية الوظائف' : 'Filter Jobs'}
          </Text>
          <TouchableOpacity onPress={() => setShowFilters(false)}>
            <Ionicons name="close" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.filterContent}>
          <CustomInput
            label={{ en: 'Category', ar: 'الفئة' }}
            value={filters.category || ''}
            onChangeText={(text) => setFilters({ ...filters, category: text })}
            placeholder={isArabic ? 'اختر الفئة' : 'Select category'}
          />

          <CustomInput
            label={{ en: 'Location', ar: 'الموقع' }}
            value={filters.location || ''}
            onChangeText={(text) => setFilters({ ...filters, location: text })}
            placeholder={isArabic ? 'المدينة أو المنطقة' : 'City or region'}
          />

          <CustomInput
            label={{ en: 'Min Budget (SAR)', ar: 'الحد الأدنى للميزانية (ريال)' }}
            value={filters.budgetMin?.toString() || ''}
            onChangeText={(text) => setFilters({ ...filters, budgetMin: text ? parseInt(text) : undefined })}
            placeholder="0"
            keyboardType="numeric"
          />

          <CustomInput
            label={{ en: 'Max Budget (SAR)', ar: 'الحد الأقصى للميزانية (ريال)' }}
            value={filters.budgetMax?.toString() || ''}
            onChangeText={(text) => setFilters({ ...filters, budgetMax: text ? parseInt(text) : undefined })}
            placeholder="100000"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.filterActions}>
          <CustomButton
            title={{ en: 'Clear', ar: 'مسح' }}
            variant="outline"
            onPress={() => setFilters({})}
            style={styles.filterActionButton}
          />
          <CustomButton
            title={{ en: 'Apply', ar: 'تطبيق' }}
            onPress={() => setShowFilters(false)}
            style={styles.filterActionButton}
          />
        </View>
      </View>
    </Modal>
  );

  const renderProposalModal = () => (
    <Modal
      visible={showProposalModal}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={[styles.proposalModal, { backgroundColor: theme.background }]}>
        <View style={styles.proposalHeader}>
          <Text style={[styles.proposalTitle, { color: theme.text }]}>
            {isArabic ? 'تقديم طلب' : 'Submit Proposal'}
          </Text>
          <TouchableOpacity onPress={() => setShowProposalModal(false)}>
            <Ionicons name="close" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>

        {selectedJob && (
          <View style={styles.jobInfo}>
            <Text style={[styles.jobInfoTitle, { color: theme.text }]}>
              {selectedJob.title}
            </Text>
            <Text style={[styles.jobInfoClient, { color: theme.textSecondary }]}>
              {isArabic ? 'العميل' : 'Client'}: {selectedJob.clientName}
            </Text>
            <Text style={[styles.jobInfoBudget, { color: theme.textSecondary }]}>
              {isArabic ? 'الميزانية' : 'Budget'}: {selectedJob.budget.min.toLocaleString()} - {selectedJob.budget.max.toLocaleString()} SAR
            </Text>
          </View>
        )}

        <View style={styles.proposalContent}>
          <CustomInput
            label={{ en: 'Proposed Amount (SAR)', ar: 'المبلغ المقترح (ريال)' }}
            value={proposalData.proposedAmount}
            onChangeText={(text) => setProposalData({ ...proposalData, proposedAmount: text })}
            placeholder="15000"
            keyboardType="numeric"
            required
          />

          <CustomInput
            label={{ en: 'Proposed Timeline (Days)', ar: 'الجدول الزمني المقترح (أيام)' }}
            value={proposalData.proposedTimeline}
            onChangeText={(text) => setProposalData({ ...proposalData, proposedTimeline: text })}
            placeholder="30"
            keyboardType="numeric"
            required
          />

          <CustomInput
            label={{ en: 'Cover Letter', ar: 'خطاب التغطية' }}
            value={proposalData.coverLetter}
            onChangeText={(text) => setProposalData({ ...proposalData, coverLetter: text })}
            placeholder={isArabic ? 'اكتب رسالة تقديمك...' : 'Write your cover letter...'}
            multiline
            numberOfLines={4}
            required
          />
        </View>

        <View style={styles.proposalActions}>
          <CustomButton
            title={{ en: 'Cancel', ar: 'إلغاء' }}
            variant="outline"
            onPress={() => setShowProposalModal(false)}
            style={styles.proposalButton}
          />
          <CustomButton
            title={{ en: 'Submit', ar: 'تقديم' }}
            onPress={submitProposal}
            style={styles.proposalButton}
          />
        </View>
      </View>
    </Modal>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="briefcase-outline" size={64} color={theme.textSecondary} />
      <Text style={[styles.emptyTitle, { color: theme.text }]}>
        {isArabic ? 'لا توجد وظائف' : 'No Jobs Found'}
      </Text>
      <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
        {isArabic 
          ? 'لا توجد وظائف متاحة حالياً. تحقق مرة أخرى لاحقاً.'
          : 'No jobs are currently available. Check back later.'
        }
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          {isArabic ? 'الوظائف المتاحة' : 'Available Jobs'}
        </Text>
        <TouchableOpacity
          style={[styles.filterButton, { backgroundColor: theme.surface }]}
          onPress={() => setShowFilters(true)}
        >
          <Ionicons name="filter" size={20} color={theme.text} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: theme.surface }]}>
        <Ionicons name="search" size={20} color={theme.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder={isArabic ? 'البحث عن وظائف...' : 'Search for jobs...'}
          placeholderTextColor={theme.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={theme.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {[
          { id: 'all', title: { en: 'All Jobs', ar: 'جميع الوظائف' } },
          { id: 'applied', title: { en: 'Applied', ar: 'المتقدمة' } },
          { id: 'saved', title: { en: 'Saved', ar: 'المحفوظة' } },
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

      {/* Modals */}
      {renderFilters()}
      {renderProposalModal()}
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
  filterButton: {
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.light.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: SPACING.sm,
    fontSize: TYPOGRAPHY.sizes.body1,
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
  saveButton: {
    padding: SPACING.sm,
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
  filterModal: {
    flex: 1,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light.border,
  },
  filterTitle: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  filterContent: {
    flex: 1,
    padding: SPACING.lg,
  },
  filterActions: {
    flexDirection: 'row',
    padding: SPACING.lg,
    gap: SPACING.sm,
  },
  filterActionButton: {
    flex: 1,
  },
  proposalModal: {
    flex: 1,
  },
  proposalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light.border,
  },
  proposalTitle: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  jobInfo: {
    padding: SPACING.lg,
    backgroundColor: COLORS.light.surface,
    margin: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
  },
  jobInfoTitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  jobInfoClient: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginBottom: SPACING.xs,
  },
  jobInfoBudget: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  proposalContent: {
    flex: 1,
    padding: SPACING.lg,
  },
  proposalActions: {
    flexDirection: 'row',
    padding: SPACING.lg,
    gap: SPACING.sm,
  },
  proposalButton: {
    flex: 1,
  },
});

export default JobListScreen;
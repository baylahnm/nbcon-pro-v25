import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

interface Props {
  onJobSelect?: (jobId: string) => void;
  onSaveJob?: (jobId: string) => void;
  onApplyJob?: (jobId: string) => void;
  onFilterChange?: (filters: any) => void;
}

const FILTER_CATEGORIES = [
  { id: 'all', name: { en: 'All Jobs', ar: 'جميع الوظائف' } },
  { id: 'structural', name: { en: 'Structural', ar: 'إنشائية' } },
  { id: 'electrical', name: { en: 'Electrical', ar: 'كهربائية' } },
  { id: 'mechanical', name: { en: 'Mechanical', ar: 'ميكانيكية' } },
  { id: 'civil', name: { en: 'Civil', ar: 'مدنية' } },
  { id: 'architecture', name: { en: 'Architecture', ar: 'عمارة' } },
];

const BUDGET_RANGES = [
  { id: 'all', name: { en: 'Any Budget', ar: 'أي ميزانية' } },
  { id: 'low', name: { en: '< 25k SAR', ar: '< 25 ألف ريال' } },
  { id: 'mid', name: { en: '25k - 100k SAR', ar: '25-100 ألف ريال' } },
  { id: 'high', name: { en: '> 100k SAR', ar: '> 100 ألف ريال' } },
];

const SAMPLE_JOBS = [
  {
    id: '1',
    title: { en: 'Structural Analysis for High-Rise Building', ar: 'تحليل إنشائي لمبنى عالي' },
    description: { en: 'Need experienced structural engineer for 40-floor residential tower analysis and design verification.', ar: 'مطلوب مهندس إنشائي ذو خبرة لتحليل وتحقق تصميم برج سكني من 40 طابق.' },
    budget: '75,000 - 120,000 SAR',
    duration: '2-3 months',
    location: { en: 'Riyadh', ar: 'الرياض' },
    postedDate: '2024-01-20',
    category: 'structural',
    urgency: 'normal',
    clientRating: 4.8,
    applicants: 12,
    saved: false,
    skills: ['AutoCAD', 'ETABS', 'SAP2000', 'Structural Analysis'],
    experienceLevel: 'senior',
    isRemote: false,
    clientName: { en: 'Al-Rajhi Construction', ar: 'مؤسسة الراجحي للإنشاء' },
  },
  {
    id: '2',
    title: { en: 'Smart Building Electrical Design', ar: 'تصميم كهربائي للمباني الذكية' },
    description: { en: 'Design complete electrical system for smart office building with IoT integration and energy management.', ar: 'تصميم نظام كهربائي متكامل لمبنى مكاتب ذكي مع تكامل إنترنت الأشياء وإدارة الطاقة.' },
    budget: '45,000 - 80,000 SAR',
    duration: '6-8 weeks',
    location: { en: 'Jeddah', ar: 'جدة' },
    postedDate: '2024-01-19',
    category: 'electrical',
    urgency: 'urgent',
    clientRating: 4.9,
    applicants: 8,
    saved: true,
    skills: ['Electrical Design', 'AutoCAD Electrical', 'Smart Systems', 'BIM'],
    experienceLevel: 'mid',
    isRemote: true,
    clientName: { en: 'Jeddah Smart City', ar: 'مدينة جدة الذكية' },
  },
  {
    id: '3',
    title: { en: 'HVAC System for Shopping Mall', ar: 'نظام تكييف لمجمع تجاري' },
    description: { en: 'Design and specify HVAC system for 3-level shopping mall with restaurants and entertainment areas.', ar: 'تصميم وتحديد نظام التكييف لمجمع تجاري من 3 مستويات مع مطاعم ومناطق ترفيه.' },
    budget: '90,000 - 150,000 SAR',
    duration: '3-4 months',
    location: { en: 'Dammam', ar: 'الدمام' },
    postedDate: '2024-01-18',
    category: 'mechanical',
    urgency: 'normal',
    clientRating: 4.7,
    applicants: 15,
    saved: false,
    skills: ['HVAC Design', 'HAP Software', 'Energy Analysis', 'MEP Coordination'],
    experienceLevel: 'senior',
    isRemote: false,
    clientName: { en: 'Eastern Province Developments', ar: 'تطوير المنطقة الشرقية' },
  },
];

const JobBrowsingScreen: React.FC<Props> = ({
  onJobSelect,
  onSaveJob,
  onApplyJob,
  onFilterChange,
}) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [jobs, setJobs] = useState(SAMPLE_JOBS);
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const formatBudget = (budget: string) => {
    return budget.replace('SAR', getText({ en: 'SAR', ar: 'ريال' }));
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return COLORS.error;
      case 'high': return COLORS.warning;
      default: return COLORS.success;
    }
  };

  const handleSaveJob = (jobId: string) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, saved: !job.saved } : job
    ));
    onSaveJob?.(jobId);
  };

  const renderJobCard = ({ item: job }) => (
    <TouchableOpacity
      style={[styles.jobCard, { backgroundColor: theme.surface }]}
      onPress={() => onJobSelect?.(job.id)}
    >
      {/* Job Header */}
      <View style={styles.jobHeader}>
        <View style={styles.jobTitleContainer}>
          <Text style={[styles.jobTitle, { color: theme.text }]} numberOfLines={2}>
            {getText(job.title)}
          </Text>
          {job.urgency === 'urgent' && (
            <View style={[styles.urgentBadge, { backgroundColor: COLORS.error }]}>
              <Ionicons name="flash" size={12} color={COLORS.white} />
              <Text style={styles.urgentText}>
                {getText({ en: 'URGENT', ar: 'عاجل' })}
              </Text>
            </View>
          )}
        </View>
        
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => handleSaveJob(job.id)}
        >
          <Ionicons 
            name={job.saved ? 'bookmark' : 'bookmark-outline'} 
            size={24} 
            color={job.saved ? COLORS.primary : theme.textSecondary} 
          />
        </TouchableOpacity>
      </View>

      {/* Client Info */}
      <View style={styles.clientInfo}>
        <View style={styles.clientDetails}>
          <Text style={[styles.clientName, { color: theme.text }]}>
            {getText(job.clientName)}
          </Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color={COLORS.warning} />
            <Text style={[styles.rating, { color: theme.text }]}>
              {job.clientRating}
            </Text>
          </View>
        </View>
      </View>

      {/* Job Description */}
      <Text style={[styles.jobDescription, { color: theme.textSecondary }]} numberOfLines={3}>
        {getText(job.description)}
      </Text>

      {/* Job Details */}
      <View style={styles.jobDetails}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Ionicons name="cash" size={16} color={COLORS.success} />
            <Text style={[styles.detailText, { color: theme.text }]}>
              {formatBudget(job.budget)}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Ionicons name="time" size={16} color={COLORS.info} />
            <Text style={[styles.detailText, { color: theme.text }]}>
              {job.duration}
            </Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Ionicons name="location" size={16} color={COLORS.primary} />
            <Text style={[styles.detailText, { color: theme.text }]}>
              {getText(job.location)}
              {job.isRemote && ` • ${getText({ en: 'Remote OK', ar: 'عن بُعد' })}`}
            </Text>
          </View>
        </View>
      </View>

      {/* Skills */}
      <View style={styles.skillsContainer}>
        {job.skills.slice(0, 3).map((skill, index) => (
          <View key={index} style={[styles.skillChip, { backgroundColor: COLORS.primary + '15' }]}>
            <Text style={[styles.skillText, { color: COLORS.primary }]}>
              {skill}
            </Text>
          </View>
        ))}
        {job.skills.length > 3 && (
          <Text style={[styles.moreSkills, { color: theme.textSecondary }]}>
            +{job.skills.length - 3} {getText({ en: 'more', ar: 'أكثر' })}
          </Text>
        )}
      </View>

      {/* Job Footer */}
      <View style={styles.jobFooter}>
        <View style={styles.footerInfo}>
          <Text style={[styles.applicantsText, { color: theme.textSecondary }]}>
            {job.applicants} {getText({ en: 'applicants', ar: 'متقدم' })}
          </Text>
          <Text style={[styles.postedDate, { color: theme.textSecondary }]}>
            {getText({ en: 'Posted', ar: 'نُشر' })} {job.postedDate}
          </Text>
        </View>
        
        <CustomButton
          title={getText({ en: 'Apply Now', ar: 'تقدم الآن' })}
          onPress={() => onApplyJob?.(job.id)}
          size="small"
          icon="send"
          customStyle={styles.applyButton}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1a1a1a', '#2d2d2d'] : ['#f8f9fa', '#ffffff']}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          {getText({
            en: 'Browse Jobs',
            ar: 'تصفح الوظائف'
          })}
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
          {getText({
            en: 'Find engineering opportunities that match your skills',
            ar: 'اعثر على الفرص الهندسية التي تناسب مهاراتك'
          })}
        </Text>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: theme.surface }]}>
        <Ionicons name="search" size={20} color={theme.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder={getText({
            en: 'Search jobs by title, skills, or location...',
            ar: 'ابحث بالعنوان، المهارات، أو الموقع...'
          })}
          placeholderTextColor={theme.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          textAlign={isArabic ? 'right' : 'left'}
        />
        <TouchableOpacity 
          style={styles.filterToggle}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Ionicons name="options" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Quick Filters */}
      {showFilters && (
        <View style={[styles.filtersContainer, { backgroundColor: theme.surface }]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filterSection}>
              <Text style={[styles.filterLabel, { color: theme.text }]}>
                {getText({ en: 'Category', ar: 'الفئة' })}
              </Text>
              <View style={styles.filterChips}>
                {FILTER_CATEGORIES.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.filterChip,
                      { backgroundColor: theme.inputBackground },
                      selectedCategory === category.id && { 
                        backgroundColor: COLORS.primary + '20',
                        borderColor: COLORS.primary 
                      }
                    ]}
                    onPress={() => setSelectedCategory(category.id)}
                  >
                    <Text style={[
                      styles.filterChipText, 
                      { color: theme.text },
                      selectedCategory === category.id && { color: COLORS.primary }
                    ]}>
                      {getText(category.name)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={[styles.filterLabel, { color: theme.text }]}>
                {getText({ en: 'Budget', ar: 'الميزانية' })}
              </Text>
              <View style={styles.filterChips}>
                {BUDGET_RANGES.map((budget) => (
                  <TouchableOpacity
                    key={budget.id}
                    style={[
                      styles.filterChip,
                      { backgroundColor: theme.inputBackground },
                      selectedBudget === budget.id && { 
                        backgroundColor: COLORS.success + '20',
                        borderColor: COLORS.success 
                      }
                    ]}
                    onPress={() => setSelectedBudget(budget.id)}
                  >
                    <Text style={[
                      styles.filterChipText, 
                      { color: theme.text },
                      selectedBudget === budget.id && { color: COLORS.success }
                    ]}>
                      {getText(budget.name)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      )}

      {/* Results Summary */}
      <View style={styles.resultsContainer}>
        <Text style={[styles.resultsText, { color: theme.text }]}>
          {getText({
            en: `${jobs.length} jobs found`,
            ar: `تم العثور على ${jobs.length} وظيفة`
          })}
        </Text>
        <TouchableOpacity style={styles.sortButton}>
          <Text style={[styles.sortText, { color: COLORS.primary }]}>
            {getText({ en: 'Sort by: Newest', ar: 'ترتيب: الأحدث' })}
          </Text>
          <Ionicons name="chevron-down" size={16} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Jobs List */}
      <FlatList
        data={jobs}
        renderItem={renderJobCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.jobsList}
        ItemSeparatorComponent={() => <View style={styles.jobSeparator} />}
      />

      {/* Floating Action Button */}
      <TouchableOpacity style={[styles.fab, { backgroundColor: COLORS.primary }]}>
        <Ionicons name="notifications" size={24} color={COLORS.white} />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.sizes.h1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.sm,
  },
  headerSubtitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    lineHeight: 22,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: SPACING.sm,
    fontSize: TYPOGRAPHY.sizes.body1,
  },
  filterToggle: {
    padding: SPACING.xs,
  },
  filtersContainer: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  filterSection: {
    marginRight: SPACING.lg,
  },
  filterLabel: {
    fontSize: TYPOGRAPHY.sizes.subtitle2,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: SPACING.sm,
  },
  filterChips: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  filterChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  filterChipText: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  resultsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  resultsText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  sortText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  jobsList: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  jobSeparator: {
    height: SPACING.md,
  },
  jobCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  jobTitleContainer: {
    flex: 1,
    marginRight: SPACING.md,
  },
  jobTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  urgentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    gap: SPACING.xs,
    alignSelf: 'flex-start',
  },
  urgentText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  saveButton: {
    padding: SPACING.xs,
  },
  clientInfo: {
    marginBottom: SPACING.md,
  },
  clientDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clientName: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  rating: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  jobDescription: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  jobDetails: {
    marginBottom: SPACING.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    flex: 1,
  },
  detailText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    flex: 1,
  },
  skillsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  skillChip: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  skillText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  moreSkills: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontStyle: 'italic',
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerInfo: {},
  applicantsText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginBottom: SPACING.xs,
  },
  postedDate: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  applyButton: {
    minWidth: 100,
  },
  fab: {
    position: 'absolute',
    bottom: SPACING.xl,
    right: SPACING.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});

export default JobBrowsingScreen;
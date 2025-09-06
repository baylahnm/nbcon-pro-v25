import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  RefreshControl,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { RootState } from '../../store';
import { Language, JobStatus, ServiceCategory } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

const { width } = Dimensions.get('window');

interface ArchivedJob {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  engineer: { en: string; ar: string };
  status: JobStatus;
  category: ServiceCategory;
  budget: number;
  finalCost: number;
  startDate: string;
  endDate: string;
  duration: number; // in days
  rating: number;
  location: { en: string; ar: string };
  tags: string[];
  isFavorite: boolean;
  completionNotes?: { en: string; ar: string };
}

interface FilterOption {
  id: string;
  label: { en: string; ar: string };
  count: number;
  isSelected: boolean;
}

const JobArchiveScreen = () => {
  const navigation = useNavigation();
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'completed' | 'cancelled' | 'disputed'>('all');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'cost' | 'rating' | 'duration'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);

  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  // Mock data - replace with actual API calls
  const archivedJobs: ArchivedJob[] = [
    {
      id: '1',
      title: { en: 'Office Building MEP Design', ar: 'تصميم الأنظمة الكهروميكانيكية لمبنى مكتبي' },
      description: { en: 'Complete MEP design for 5-story office building', ar: 'تصميم كامل للأنظمة الكهروميكانيكية لمبنى مكتبي من 5 طوابق' },
      engineer: { en: 'Ahmed Al-Sheikh', ar: 'أحمد الشيخ' },
      status: JobStatus.COMPLETED,
      category: ServiceCategory.MEP,
      budget: 45000,
      finalCost: 42000,
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      duration: 60,
      rating: 4.8,
      location: { en: 'Riyadh, Saudi Arabia', ar: 'الرياض، المملكة العربية السعودية' },
      tags: ['MEP', 'Office Building', 'Design'],
      isFavorite: true,
      completionNotes: { 
        en: 'Project completed successfully with excellent quality', 
        ar: 'تم إكمال المشروع بنجاح مع جودة ممتازة' 
      },
    },
    {
      id: '2',
      title: { en: 'Residential Complex Survey', ar: 'مسح مجمع سكني' },
      description: { en: 'Topographic survey for residential development', ar: 'مسح طوبوغرافي للتطوير السكني' },
      engineer: { en: 'Sara Al-Mansouri', ar: 'سارة المنصوري' },
      status: JobStatus.COMPLETED,
      category: ServiceCategory.SURVEYING,
      budget: 15000,
      finalCost: 14500,
      startDate: '2024-02-01',
      endDate: '2024-02-28',
      duration: 28,
      rating: 4.6,
      location: { en: 'Jeddah, Saudi Arabia', ar: 'جدة، المملكة العربية السعودية' },
      tags: ['Survey', 'Residential', 'Topographic'],
      isFavorite: false,
    },
    {
      id: '3',
      title: { en: 'Industrial Plant Safety Audit', ar: 'مراجعة السلامة للمصنع الصناعي' },
      description: { en: 'Comprehensive HSE audit and compliance review', ar: 'مراجعة شاملة للصحة والسلامة والبيئة والامتثال' },
      engineer: { en: 'Mohammed Al-Rashid', ar: 'محمد الراشد' },
      status: JobStatus.CANCELLED,
      category: ServiceCategory.HSE,
      budget: 25000,
      finalCost: 0,
      startDate: '2024-01-20',
      endDate: '2024-01-25',
      duration: 5,
      rating: 0,
      location: { en: 'Dammam, Saudi Arabia', ar: 'الدمام، المملكة العربية السعودية' },
      tags: ['HSE', 'Audit', 'Industrial'],
      isFavorite: false,
    },
    {
      id: '4',
      title: { en: 'BIM Modeling for Hospital', ar: 'نمذجة معلومات البناء للمستشفى' },
      description: { en: '3D BIM modeling for new hospital construction', ar: 'نمذجة ثلاثية الأبعاد لمعلومات البناء لبناء مستشفى جديد' },
      engineer: { en: 'Fatima Al-Zahra', ar: 'فاطمة الزهراء' },
      status: JobStatus.COMPLETED,
      category: ServiceCategory.BIM,
      budget: 35000,
      finalCost: 38000,
      startDate: '2023-11-01',
      endDate: '2024-01-31',
      duration: 92,
      rating: 4.9,
      location: { en: 'Medina, Saudi Arabia', ar: 'المدينة المنورة، المملكة العربية السعودية' },
      tags: ['BIM', 'Hospital', '3D Modeling'],
      isFavorite: true,
    },
    {
      id: '5',
      title: { en: 'Highway Bridge Inspection', ar: 'فحص جسر الطريق السريع' },
      description: { en: 'Structural inspection and assessment of highway bridge', ar: 'فحص وتقييم هيكلي لجسر الطريق السريع' },
      engineer: { en: 'Khalid Al-Mutairi', ar: 'خالد المطيري' },
      status: JobStatus.DISPUTED,
      category: ServiceCategory.CIVIL,
      budget: 20000,
      finalCost: 18000,
      startDate: '2023-12-01',
      endDate: '2023-12-20',
      duration: 20,
      rating: 3.2,
      location: { en: 'Tabuk, Saudi Arabia', ar: 'تبوك، المملكة العربية السعودية' },
      tags: ['Civil', 'Bridge', 'Inspection'],
      isFavorite: false,
    },
  ];

  const statusFilters: FilterOption[] = [
    { id: 'all', label: { en: 'All Jobs', ar: 'جميع الوظائف' }, count: archivedJobs.length, isSelected: selectedFilter === 'all' },
    { id: 'completed', label: { en: 'Completed', ar: 'مكتملة' }, count: archivedJobs.filter(job => job.status === JobStatus.COMPLETED).length, isSelected: selectedFilter === 'completed' },
    { id: 'cancelled', label: { en: 'Cancelled', ar: 'ملغية' }, count: archivedJobs.filter(job => job.status === JobStatus.CANCELLED).length, isSelected: selectedFilter === 'cancelled' },
    { id: 'disputed', label: { en: 'Disputed', ar: 'متنازع عليها' }, count: archivedJobs.filter(job => job.status === JobStatus.DISPUTED).length, isSelected: selectedFilter === 'disputed' },
  ];

  const categoryFilters: FilterOption[] = [
    { id: 'all', label: { en: 'All Categories', ar: 'جميع الفئات' }, count: archivedJobs.length, isSelected: selectedCategory === 'all' },
    { id: ServiceCategory.CIVIL, label: { en: 'Civil Engineering', ar: 'هندسة مدنية' }, count: archivedJobs.filter(job => job.category === ServiceCategory.CIVIL).length, isSelected: selectedCategory === ServiceCategory.CIVIL },
    { id: ServiceCategory.MEP, label: { en: 'MEP Engineering', ar: 'الهندسة الكهروميكانيكية' }, count: archivedJobs.filter(job => job.category === ServiceCategory.MEP).length, isSelected: selectedCategory === ServiceCategory.MEP },
    { id: ServiceCategory.SURVEYING, label: { en: 'Surveying', ar: 'المساحة' }, count: archivedJobs.filter(job => job.category === ServiceCategory.SURVEYING).length, isSelected: selectedCategory === ServiceCategory.SURVEYING },
    { id: ServiceCategory.BIM, label: { en: 'BIM Modeling', ar: 'نمذجة معلومات البناء' }, count: archivedJobs.filter(job => job.category === ServiceCategory.BIM).length, isSelected: selectedCategory === ServiceCategory.BIM },
    { id: ServiceCategory.HSE, label: { en: 'HSE', ar: 'الصحة والسلامة والبيئة' }, count: archivedJobs.filter(job => job.category === ServiceCategory.HSE).length, isSelected: selectedCategory === ServiceCategory.HSE },
  ];

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case JobStatus.COMPLETED:
        return COLORS.success;
      case JobStatus.CANCELLED:
        return COLORS.error;
      case JobStatus.DISPUTED:
        return COLORS.warning;
      default:
        return COLORS.textSecondary;
    }
  };

  const getStatusLabel = (status: JobStatus) => {
    switch (status) {
      case JobStatus.COMPLETED:
        return isArabic ? 'مكتملة' : 'Completed';
      case JobStatus.CANCELLED:
        return isArabic ? 'ملغية' : 'Cancelled';
      case JobStatus.DISPUTED:
        return isArabic ? 'متنازع عليها' : 'Disputed';
      default:
        return status;
    }
  };

  const formatCurrency = (amount: number) => {
    return `SAR ${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US');
  };

  const formatDuration = (days: number) => {
    if (days < 30) {
      return `${days} ${isArabic ? 'يوم' : 'days'}`;
    } else {
      const months = Math.floor(days / 30);
      const remainingDays = days % 30;
      return `${months} ${isArabic ? 'شهر' : 'month'}${remainingDays > 0 ? ` ${remainingDays} ${isArabic ? 'يوم' : 'days'}` : ''}`;
    }
  };

  const filteredJobs = archivedJobs.filter(job => {
    const matchesSearch = searchQuery === '' || 
      getText(job.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
      getText(job.description).toLowerCase().includes(searchQuery.toLowerCase()) ||
      getText(job.engineer).toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedFilter === 'all' || job.status === selectedFilter;
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  }).sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'date':
        comparison = new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
        break;
      case 'cost':
        comparison = a.finalCost - b.finalCost;
        break;
      case 'rating':
        comparison = a.rating - b.rating;
        break;
      case 'duration':
        comparison = a.duration - b.duration;
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleJobPress = (job: ArchivedJob) => {
    // Navigate to job details
    Alert.alert(
      getText(job.title),
      isArabic ? 'سيتم فتح تفاصيل الوظيفة قريباً' : 'Job details will open soon'
    );
  };

  const handleFavoriteToggle = (jobId: string) => {
    // Toggle favorite status
    Alert.alert(
      isArabic ? 'تم التحديث' : 'Updated',
      isArabic ? 'تم تحديث حالة المفضلة' : 'Favorite status updated'
    );
  };

  const handleFilterPress = (filterId: string) => {
    setSelectedFilter(filterId as any);
  };

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(categoryId as any);
  };

  const handleSortPress = (sortType: string) => {
    if (sortBy === sortType) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(sortType as any);
      setSortOrder('desc');
    }
  };

  const renderJobCard = ({ item: job }: { item: ArchivedJob }) => (
    <TouchableOpacity
      style={[styles.jobCard, { backgroundColor: theme.card }]}
      onPress={() => handleJobPress(job)}
    >
      <View style={styles.jobHeader}>
        <View style={styles.jobTitleContainer}>
          <Text style={[styles.jobTitle, { color: theme.text }]}>
            {getText(job.title)}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(job.status) }]}>
            <Text style={styles.statusText}>
              {getStatusLabel(job.status)}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => handleFavoriteToggle(job.id)}
        >
          <Ionicons 
            name={job.isFavorite ? "heart" : "heart-outline"} 
            size={20} 
            color={job.isFavorite ? COLORS.error : theme.textSecondary} 
          />
        </TouchableOpacity>
      </View>

      <Text style={[styles.jobDescription, { color: theme.textSecondary }]}>
        {getText(job.description)}
      </Text>

      <View style={styles.jobDetails}>
        <View style={styles.jobDetailItem}>
          <Ionicons name="person-outline" size={16} color={theme.textSecondary} />
          <Text style={[styles.jobDetailText, { color: theme.textSecondary }]}>
            {getText(job.engineer)}
          </Text>
        </View>
        <View style={styles.jobDetailItem}>
          <Ionicons name="location-outline" size={16} color={theme.textSecondary} />
          <Text style={[styles.jobDetailText, { color: theme.textSecondary }]}>
            {getText(job.location)}
          </Text>
        </View>
      </View>

      <View style={styles.jobStats}>
        <View style={styles.jobStatItem}>
          <Text style={[styles.jobStatLabel, { color: theme.textSecondary }]}>
            {isArabic ? 'الميزانية' : 'Budget'}
          </Text>
          <Text style={[styles.jobStatValue, { color: theme.text }]}>
            {formatCurrency(job.budget)}
          </Text>
        </View>
        <View style={styles.jobStatItem}>
          <Text style={[styles.jobStatLabel, { color: theme.textSecondary }]}>
            {isArabic ? 'التكلفة النهائية' : 'Final Cost'}
          </Text>
          <Text style={[styles.jobStatValue, { color: theme.text }]}>
            {formatCurrency(job.finalCost)}
          </Text>
        </View>
        <View style={styles.jobStatItem}>
          <Text style={[styles.jobStatLabel, { color: theme.textSecondary }]}>
            {isArabic ? 'المدة' : 'Duration'}
          </Text>
          <Text style={[styles.jobStatValue, { color: theme.text }]}>
            {formatDuration(job.duration)}
          </Text>
        </View>
        {job.rating > 0 && (
          <View style={styles.jobStatItem}>
            <Text style={[styles.jobStatLabel, { color: theme.textSecondary }]}>
              {isArabic ? 'التقييم' : 'Rating'}
            </Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={14} color={COLORS.accent} />
              <Text style={[styles.jobStatValue, { color: theme.text }]}>
                {job.rating.toFixed(1)}
              </Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.jobFooter}>
        <View style={styles.jobTags}>
          {job.tags.slice(0, 3).map((tag, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: theme.surface }]}>
              <Text style={[styles.tagText, { color: theme.textSecondary }]}>
                {tag}
              </Text>
            </View>
          ))}
        </View>
        <Text style={[styles.jobDate, { color: theme.textSecondary }]}>
          {formatDate(job.endDate)}
        </Text>
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
              {isArabic ? 'أرشيف الوظائف' : 'Job Archive'}
            </Text>
            <Text style={styles.headerSubtitle}>
              {isArabic 
                ? `${filteredJobs.length} وظيفة من ${archivedJobs.length}`
                : `${filteredJobs.length} of ${archivedJobs.length} jobs`
              }
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Ionicons name="filter" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: theme.surface }]}>
        <View style={[styles.searchBar, { backgroundColor: theme.background }]}>
          <Ionicons name="search" size={20} color={theme.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={isArabic ? 'البحث في الوظائف...' : 'Search jobs...'}
            placeholderTextColor={theme.textSecondary}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={theme.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filters */}
      {showFilters && (
        <View style={[styles.filtersContainer, { backgroundColor: theme.surface }]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filtersContent}>
              {/* Status Filters */}
              <View style={styles.filterSection}>
                <Text style={[styles.filterSectionTitle, { color: theme.text }]}>
                  {isArabic ? 'الحالة' : 'Status'}
                </Text>
                <View style={styles.filterChips}>
                  {statusFilters.map((filter) => (
                    <TouchableOpacity
                      key={filter.id}
                      style={[
                        styles.filterChip,
                        filter.isSelected && { backgroundColor: COLORS.primary }
                      ]}
                      onPress={() => handleFilterPress(filter.id)}
                    >
                      <Text style={[
                        styles.filterChipText,
                        { color: filter.isSelected ? COLORS.white : theme.text }
                      ]}>
                        {getText(filter.label)} ({filter.count})
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Category Filters */}
              <View style={styles.filterSection}>
                <Text style={[styles.filterSectionTitle, { color: theme.text }]}>
                  {isArabic ? 'الفئة' : 'Category'}
                </Text>
                <View style={styles.filterChips}>
                  {categoryFilters.map((filter) => (
                    <TouchableOpacity
                      key={filter.id}
                      style={[
                        styles.filterChip,
                        filter.isSelected && { backgroundColor: COLORS.primary }
                      ]}
                      onPress={() => handleCategoryPress(filter.id)}
                    >
                      <Text style={[
                        styles.filterChipText,
                        { color: filter.isSelected ? COLORS.white : theme.text }
                      ]}>
                        {getText(filter.label)} ({filter.count})
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Sort Options */}
              <View style={styles.filterSection}>
                <Text style={[styles.filterSectionTitle, { color: theme.text }]}>
                  {isArabic ? 'ترتيب حسب' : 'Sort By'}
                </Text>
                <View style={styles.filterChips}>
                  {[
                    { key: 'date', label: { en: 'Date', ar: 'التاريخ' } },
                    { key: 'cost', label: { en: 'Cost', ar: 'التكلفة' } },
                    { key: 'rating', label: { en: 'Rating', ar: 'التقييم' } },
                    { key: 'duration', label: { en: 'Duration', ar: 'المدة' } },
                  ].map((option) => (
                    <TouchableOpacity
                      key={option.key}
                      style={[
                        styles.filterChip,
                        sortBy === option.key && { backgroundColor: COLORS.primary }
                      ]}
                      onPress={() => handleSortPress(option.key)}
                    >
                      <Text style={[
                        styles.filterChipText,
                        { color: sortBy === option.key ? COLORS.white : theme.text }
                      ]}>
                        {getText(option.label)}
                        {sortBy === option.key && (
                          <Ionicons 
                            name={sortOrder === 'asc' ? 'arrow-up' : 'arrow-down'} 
                            size={12} 
                            color={COLORS.white} 
                          />
                        )}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      )}

      {/* Jobs List */}
      <FlatList
        data={filteredJobs}
        renderItem={renderJobCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.jobsList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="archive-outline" size={64} color={theme.textSecondary} />
            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              {isArabic ? 'لا توجد وظائف في الأرشيف' : 'No jobs in archive'}
            </Text>
            <Text style={[styles.emptyDescription, { color: theme.textSecondary }]}>
              {isArabic 
                ? 'ستظهر الوظائف المكتملة والملغية هنا'
                : 'Completed and cancelled jobs will appear here'
              }
            </Text>
          </View>
        }
      />
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
  searchContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: BORDER_RADIUS.sm,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: TYPOGRAPHY.sizes.body1,
  },
  filtersContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filtersContent: {
    padding: 20,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterSectionTitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: 8,
  },
  filterChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  jobsList: {
    padding: 20,
  },
  jobCard: {
    borderRadius: BORDER_RADIUS.md,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  jobTitleContainer: {
    flex: 1,
    marginRight: 12,
  },
  jobTitle: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.white,
  },
  favoriteButton: {
    padding: 4,
  },
  jobDescription: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 20,
    marginBottom: 12,
  },
  jobDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  jobDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  jobDetailText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: 4,
  },
  jobStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  jobStatItem: {
    alignItems: 'center',
  },
  jobStatLabel: {
    fontSize: TYPOGRAPHY.sizes.caption,
    marginBottom: 4,
  },
  jobStatValue: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  jobDate: {
    fontSize: TYPOGRAPHY.sizes.caption,
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
});

export default JobArchiveScreen;
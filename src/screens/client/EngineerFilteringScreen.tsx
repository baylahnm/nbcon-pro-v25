import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { RootState } from '../../store';
import { Language, ServiceCategory, EngineerStatus } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

const { width } = Dimensions.get('window');

interface Engineer {
  id: string;
  name: string;
  title: { en: string; ar: string };
  specializations: ServiceCategory[];
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  location: { en: string; ar: string };
  distance: number; // in km
  experience: number; // in years
  status: EngineerStatus;
  isVerified: boolean;
  isOnline: boolean;
  responseTime: string;
  completionRate: number;
  languages: string[];
  certifications: string[];
  portfolioImages: string[];
  bio: { en: string; ar: string };
  availability: {
    today: boolean;
    thisWeek: boolean;
    nextWeek: boolean;
  };
}

const SAMPLE_ENGINEERS: Engineer[] = [
  {
    id: '1',
    name: 'أحمد محمد العتيبي',
    title: { en: 'Senior Civil Engineer', ar: 'مهندس مدني أول' },
    specializations: [ServiceCategory.CIVIL, ServiceCategory.SURVEYING],
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 180,
    location: { en: 'Riyadh', ar: 'الرياض' },
    distance: 2.5,
    experience: 8,
    status: EngineerStatus.AVAILABLE,
    isVerified: true,
    isOnline: true,
    responseTime: '< 1 hour',
    completionRate: 98,
    languages: ['Arabic', 'English'],
    certifications: ['SCE License', 'PMP', 'BIM Certified'],
    portfolioImages: ['project1.jpg', 'project2.jpg', 'project3.jpg'],
    bio: {
      en: 'Experienced civil engineer specializing in infrastructure projects and structural design.',
      ar: 'مهندس مدني ذو خبرة متخصص في مشاريع البنية التحتية والتصميم الإنشائي.'
    },
    availability: {
      today: true,
      thisWeek: true,
      nextWeek: false,
    },
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    title: { en: 'MEP Design Engineer', ar: 'مهندسة تصميم MEP' },
    specializations: [ServiceCategory.MEP, ServiceCategory.BIM],
    rating: 4.8,
    reviewCount: 89,
    hourlyRate: 220,
    location: { en: 'Jeddah', ar: 'جدة' },
    distance: 15.2,
    experience: 6,
    status: EngineerStatus.AVAILABLE,
    isVerified: true,
    isOnline: false,
    responseTime: '2-4 hours',
    completionRate: 95,
    languages: ['English', 'Arabic'],
    certifications: ['SCE License', 'LEED Certified', 'AutoCAD Expert'],
    portfolioImages: ['mep1.jpg', 'mep2.jpg'],
    bio: {
      en: 'MEP specialist with expertise in sustainable building systems and energy efficiency.',
      ar: 'متخصصة في MEP مع خبرة في أنظمة المباني المستدامة وكفاءة الطاقة.'
    },
    availability: {
      today: false,
      thisWeek: true,
      nextWeek: true,
    },
  },
  {
    id: '3',
    name: 'محمد عبدالله الشمري',
    title: { en: 'HSE Consultant', ar: 'استشاري الصحة والسلامة' },
    specializations: [ServiceCategory.HSE, ServiceCategory.CIVIL],
    rating: 4.7,
    reviewCount: 156,
    hourlyRate: 150,
    location: { en: 'Dammam', ar: 'الدمام' },
    distance: 8.7,
    experience: 10,
    status: EngineerStatus.BUSY,
    isVerified: true,
    isOnline: true,
    responseTime: '4-6 hours',
    completionRate: 97,
    languages: ['Arabic', 'English'],
    certifications: ['SCE License', 'NEBOSH', 'OSHA Certified'],
    portfolioImages: ['hse1.jpg', 'hse2.jpg', 'hse3.jpg'],
    bio: {
      en: 'HSE expert with extensive experience in construction safety and compliance.',
      ar: 'خبير الصحة والسلامة مع خبرة واسعة في سلامة البناء والامتثال.'
    },
    availability: {
      today: false,
      thisWeek: false,
      nextWeek: true,
    },
  },
  {
    id: '4',
    name: 'David Wilson',
    title: { en: 'BIM Specialist', ar: 'متخصص BIM' },
    specializations: [ServiceCategory.BIM, ServiceCategory.CIVIL],
    rating: 4.9,
    reviewCount: 73,
    hourlyRate: 250,
    location: { en: 'Riyadh', ar: 'الرياض' },
    distance: 5.1,
    experience: 7,
    status: EngineerStatus.AVAILABLE,
    isVerified: true,
    isOnline: true,
    responseTime: '< 1 hour',
    completionRate: 99,
    languages: ['English', 'Arabic'],
    certifications: ['SCE License', 'Revit Expert', 'Navisworks Certified'],
    portfolioImages: ['bim1.jpg', 'bim2.jpg', 'bim3.jpg'],
    bio: {
      en: 'BIM specialist focused on 3D modeling, clash detection, and project coordination.',
      ar: 'متخصص BIM يركز على النمذجة ثلاثية الأبعاد وكشف التضارب وتنسيق المشاريع.'
    },
    availability: {
      today: true,
      thisWeek: true,
      nextWeek: true,
    },
  },
  {
    id: '5',
    name: 'فاطمة أحمد القحطاني',
    title: { en: 'GIS Analyst', ar: 'محللة نظم المعلومات الجغرافية' },
    specializations: [ServiceCategory.GIS, ServiceCategory.SURVEYING],
    rating: 4.6,
    reviewCount: 45,
    hourlyRate: 200,
    location: { en: 'Riyadh', ar: 'الرياض' },
    distance: 12.3,
    experience: 5,
    status: EngineerStatus.AVAILABLE,
    isVerified: true,
    isOnline: false,
    responseTime: '1-2 hours',
    completionRate: 94,
    languages: ['Arabic', 'English'],
    certifications: ['SCE License', 'GIS Professional', 'Remote Sensing'],
    portfolioImages: ['gis1.jpg', 'gis2.jpg'],
    bio: {
      en: 'GIS expert specializing in spatial analysis and mapping for engineering projects.',
      ar: 'خبيرة نظم المعلومات الجغرافية متخصصة في التحليل المكاني ورسم الخرائط للمشاريع الهندسية.'
    },
    availability: {
      today: true,
      thisWeek: true,
      nextWeek: false,
    },
  },
];

const EngineerFilteringScreen = () => {
  const navigation = useNavigation();
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecializations, setSelectedSpecializations] = useState<ServiceCategory[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<EngineerStatus | 'All'>('All');
  const [minRating, setMinRating] = useState(0);
  const [maxHourlyRate, setMaxHourlyRate] = useState(500);
  const [maxDistance, setMaxDistance] = useState(50);
  const [sortBy, setSortBy] = useState<'rating' | 'distance' | 'rate' | 'experience'>('rating');
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const filteredEngineers = SAMPLE_ENGINEERS.filter(engineer => {
    const matchesSearch = engineer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         getText(engineer.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
                         getText(engineer.bio).toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecializations = selectedSpecializations.length === 0 || 
      selectedSpecializations.some(spec => engineer.specializations.includes(spec));
    
    const matchesStatus = selectedStatus === 'All' || engineer.status === selectedStatus;
    const matchesRating = engineer.rating >= minRating;
    const matchesRate = engineer.hourlyRate <= maxHourlyRate;
    const matchesDistance = engineer.distance <= maxDistance;
    const matchesVerified = !showVerifiedOnly || engineer.isVerified;
    const matchesOnline = !showOnlineOnly || engineer.isOnline;
    
    return matchesSearch && matchesSpecializations && matchesStatus && 
           matchesRating && matchesRate && matchesDistance && 
           matchesVerified && matchesOnline;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'distance':
        return a.distance - b.distance;
      case 'rate':
        return a.hourlyRate - b.hourlyRate;
      case 'experience':
        return b.experience - a.experience;
      default:
        return 0;
    }
  });

  const handleSpecializationToggle = (specialization: ServiceCategory) => {
    setSelectedSpecializations(prev => 
      prev.includes(specialization)
        ? prev.filter(s => s !== specialization)
        : [...prev, specialization]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSpecializations([]);
    setSelectedStatus('All');
    setMinRating(0);
    setMaxHourlyRate(500);
    setMaxDistance(50);
    setShowVerifiedOnly(false);
    setShowOnlineOnly(false);
  };

  const handleSelectEngineer = (engineer: Engineer) => {
    Alert.alert(
      isArabic ? 'اختيار المهندس' : 'Select Engineer',
      isArabic 
        ? `هل تريد اختيار ${engineer.name} لهذه الوظيفة؟`
        : `Do you want to select ${engineer.name} for this job?`,
      [
        { text: isArabic ? 'إلغاء' : 'Cancel', style: 'cancel' },
        {
          text: isArabic ? 'اختيار' : 'Select',
          onPress: () => {
            // Navigate to engineer profile or job assignment
            navigation.navigate('EngineerPortfolioViewer' as never, { engineerId: engineer.id });
          }
        }
      ]
    );
  };

  const renderEngineerCard = ({ item: engineer }: { item: Engineer }) => (
    <TouchableOpacity
      style={[styles.engineerCard, { backgroundColor: theme.surface }]}
      onPress={() => handleSelectEngineer(engineer)}
    >
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.engineerInfo}>
          <View style={styles.nameContainer}>
            <Text style={[styles.engineerName, { color: theme.text }]} numberOfLines={1}>
              {engineer.name}
            </Text>
            {engineer.isVerified && (
              <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
            )}
            {engineer.isOnline && (
              <View style={[styles.onlineIndicator, { backgroundColor: COLORS.success }]} />
            )}
          </View>
          <Text style={[styles.engineerTitle, { color: theme.textSecondary }]} numberOfLines={1}>
            {getText(engineer.title)}
          </Text>
        </View>

        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color={COLORS.warning} />
          <Text style={[styles.rating, { color: theme.text }]}>
            {engineer.rating}
          </Text>
          <Text style={[styles.reviewCount, { color: theme.textSecondary }]}>
            ({engineer.reviewCount})
          </Text>
        </View>
      </View>

      {/* Specializations */}
      <View style={styles.specializationsContainer}>
        {engineer.specializations.slice(0, 3).map((spec, index) => (
          <View key={index} style={[styles.specializationTag, { backgroundColor: COLORS.primary + '15' }]}>
            <Text style={[styles.specializationText, { color: COLORS.primary }]}>
              {spec}
            </Text>
          </View>
        ))}
        {engineer.specializations.length > 3 && (
          <Text style={[styles.moreSpecs, { color: theme.textSecondary }]}>
            +{engineer.specializations.length - 3}
          </Text>
        )}
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Ionicons name="cash" size={14} color={theme.textSecondary} />
          <Text style={[styles.statText, { color: theme.textSecondary }]}>
            {engineer.hourlyRate} SAR/h
          </Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="location" size={14} color={theme.textSecondary} />
          <Text style={[styles.statText, { color: theme.textSecondary }]}>
            {engineer.distance} km
          </Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="time" size={14} color={theme.textSecondary} />
          <Text style={[styles.statText, { color: theme.textSecondary }]}>
            {engineer.experience}y exp
          </Text>
        </View>
      </View>

      {/* Availability */}
      <View style={styles.availabilityContainer}>
        <Text style={[styles.availabilityLabel, { color: theme.textSecondary }]}>
          {isArabic ? 'التوفر:' : 'Availability:'}
        </Text>
        <View style={styles.availabilityChips}>
          {engineer.availability.today && (
            <View style={[styles.availabilityChip, { backgroundColor: COLORS.success + '15' }]}>
              <Text style={[styles.availabilityText, { color: COLORS.success }]}>
                {isArabic ? 'اليوم' : 'Today'}
              </Text>
            </View>
          )}
          {engineer.availability.thisWeek && (
            <View style={[styles.availabilityChip, { backgroundColor: COLORS.warning + '15' }]}>
              <Text style={[styles.availabilityText, { color: COLORS.warning }]}>
                {isArabic ? 'هذا الأسبوع' : 'This Week'}
              </Text>
            </View>
          )}
          {engineer.availability.nextWeek && (
            <View style={[styles.availabilityChip, { backgroundColor: COLORS.primary + '15' }]}>
              <Text style={[styles.availabilityText, { color: COLORS.primary }]}>
                {isArabic ? 'الأسبوع القادم' : 'Next Week'}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Response Time & Completion Rate */}
      <View style={styles.metricsContainer}>
        <View style={styles.metricItem}>
          <Ionicons name="flash" size={14} color={COLORS.primary} />
          <Text style={[styles.metricText, { color: theme.textSecondary }]}>
            {isArabic ? 'وقت الاستجابة:' : 'Response:'} {engineer.responseTime}
          </Text>
        </View>
        <View style={styles.metricItem}>
          <Ionicons name="checkmark-circle" size={14} color={COLORS.success} />
          <Text style={[styles.metricText, { color: theme.textSecondary }]}>
            {isArabic ? 'معدل الإنجاز:' : 'Completion:'} {engineer.completionRate}%
          </Text>
        </View>
      </View>

      {/* Select Button */}
      <CustomButton
        title={isArabic ? 'اختيار' : 'Select'}
        onPress={() => handleSelectEngineer(engineer)}
        style={styles.selectButton}
        size="small"
        icon="arrow-forward"
      />
    </TouchableOpacity>
  );

  const renderFilterSection = () => (
    <View style={styles.filtersContainer}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Ionicons name="search" size={20} color={theme.textSecondary} />
          <TextInput
            style={[
              styles.searchInput,
              { color: theme.text, textAlign: isArabic ? 'right' : 'left' }
            ]}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={isArabic ? 'البحث عن المهندسين...' : 'Search engineers...'}
            placeholderTextColor={theme.textSecondary}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={theme.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Specializations Filter */}
      <View style={styles.filterGroup}>
        <Text style={[styles.filterLabel, { color: theme.text }]}>
          {isArabic ? 'التخصصات:' : 'Specializations:'}
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterChips}>
          {Object.values(ServiceCategory).map((specialization) => (
            <TouchableOpacity
              key={specialization}
              style={[
                styles.filterChip,
                {
                  backgroundColor: selectedSpecializations.includes(specialization) 
                    ? COLORS.primary 
                    : theme.surface,
                  borderColor: selectedSpecializations.includes(specialization) 
                    ? COLORS.primary 
                    : theme.border,
                }
              ]}
              onPress={() => handleSpecializationToggle(specialization)}
            >
              <Text style={[
                styles.filterChipText,
                { color: selectedSpecializations.includes(specialization) ? COLORS.white : theme.text }
              ]}>
                {specialization}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Status Filter */}
      <View style={styles.filterGroup}>
        <Text style={[styles.filterLabel, { color: theme.text }]}>
          {isArabic ? 'الحالة:' : 'Status:'}
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterChips}>
          {['All', ...Object.values(EngineerStatus)].map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.filterChip,
                {
                  backgroundColor: selectedStatus === status ? COLORS.primary : theme.surface,
                  borderColor: selectedStatus === status ? COLORS.primary : theme.border,
                }
              ]}
              onPress={() => setSelectedStatus(status as any)}
            >
              <Text style={[
                styles.filterChipText,
                { color: selectedStatus === status ? COLORS.white : theme.text }
              ]}>
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Quick Filters */}
      <View style={styles.quickFilters}>
        <TouchableOpacity
          style={[
            styles.quickFilterButton,
            {
              backgroundColor: showVerifiedOnly ? COLORS.primary + '15' : theme.surface,
              borderColor: showVerifiedOnly ? COLORS.primary : theme.border,
            }
          ]}
          onPress={() => setShowVerifiedOnly(!showVerifiedOnly)}
        >
          <Ionicons 
            name={showVerifiedOnly ? 'checkmark-circle' : 'ellipse-outline'} 
            size={16} 
            color={showVerifiedOnly ? COLORS.primary : theme.textSecondary} 
          />
          <Text style={[
            styles.quickFilterText,
            { color: showVerifiedOnly ? COLORS.primary : theme.textSecondary }
          ]}>
            {isArabic ? 'معتمد فقط' : 'Verified Only'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.quickFilterButton,
            {
              backgroundColor: showOnlineOnly ? COLORS.primary + '15' : theme.surface,
              borderColor: showOnlineOnly ? COLORS.primary : theme.border,
            }
          ]}
          onPress={() => setShowOnlineOnly(!showOnlineOnly)}
        >
          <Ionicons 
            name={showOnlineOnly ? 'checkmark-circle' : 'ellipse-outline'} 
            size={16} 
            color={showOnlineOnly ? COLORS.primary : theme.textSecondary} 
          />
          <Text style={[
            styles.quickFilterText,
            { color: showOnlineOnly ? COLORS.primary : theme.textSecondary }
          ]}>
            {isArabic ? 'متصل الآن' : 'Online Now'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <Text style={[styles.sortLabel, { color: theme.text }]}>
          {isArabic ? 'ترتيب حسب:' : 'Sort by:'}
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sortOptions}>
          {[
            { key: 'rating', label: { en: 'Rating', ar: 'التقييم' } },
            { key: 'distance', label: { en: 'Distance', ar: 'المسافة' } },
            { key: 'rate', label: { en: 'Rate', ar: 'السعر' } },
            { key: 'experience', label: { en: 'Experience', ar: 'الخبرة' } },
          ].map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.sortOption,
                {
                  backgroundColor: sortBy === option.key ? COLORS.primary : theme.surface,
                  borderColor: sortBy === option.key ? COLORS.primary : theme.border,
                }
              ]}
              onPress={() => setSortBy(option.key as any)}
            >
              <Text style={[
                styles.sortOptionText,
                { color: sortBy === option.key ? COLORS.white : theme.text }
              ]}>
                {getText(option.label)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Clear Filters */}
      <TouchableOpacity style={styles.clearFiltersButton} onPress={clearFilters}>
        <Ionicons name="refresh" size={16} color={COLORS.primary} />
        <Text style={[styles.clearFiltersText, { color: COLORS.primary }]}>
          {isArabic ? 'مسح الفلاتر' : 'Clear Filters'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1a1a1a', '#2d2d2d'] : ['#f8f9fa', '#ffffff']}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons 
              name={isArabic ? 'chevron-forward' : 'chevron-back'} 
              size={24} 
              color={theme.text} 
            />
          </TouchableOpacity>

          <View style={styles.headerContent}>
            <Text style={[styles.title, { color: theme.text }]}>
              {isArabic ? 'البحث عن المهندسين' : 'Find Engineers'}
            </Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              {isArabic ? 'ابحث وفلتر المهندسين المؤهلين' : 'Search and filter qualified engineers'}
            </Text>
          </View>
        </View>

        {/* Filters */}
        {renderFilterSection()}

        {/* Results */}
        <View style={styles.resultsContainer}>
          <View style={styles.resultsHeader}>
            <Text style={[styles.resultsCount, { color: theme.text }]}>
              {isArabic 
                ? `${filteredEngineers.length} مهندس متاح`
                : `${filteredEngineers.length} engineers available`
              }
            </Text>
          </View>

          <FlatList
            data={filteredEngineers}
            renderItem={renderEngineerCard}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  backButton: {
    padding: SPACING.sm,
    marginRight: SPACING.md,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.h2,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 20,
  },
  filtersContainer: {
    marginBottom: SPACING.xl,
  },
  searchContainer: {
    marginBottom: SPACING.lg,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: TYPOGRAPHY.sizes.body1,
    marginLeft: SPACING.sm,
  },
  filterGroup: {
    marginBottom: SPACING.lg,
  },
  filterLabel: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: SPACING.sm,
  },
  filterChips: {
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    marginRight: SPACING.sm,
  },
  filterChipText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  quickFilters: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  quickFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    flex: 1,
  },
  quickFilterText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginLeft: SPACING.xs,
  },
  sortContainer: {
    marginBottom: SPACING.lg,
  },
  sortLabel: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: SPACING.sm,
  },
  sortOptions: {
    flexDirection: 'row',
  },
  sortOption: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    marginRight: SPACING.sm,
  },
  sortOptionText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  clearFiltersButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
  },
  clearFiltersText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginLeft: SPACING.xs,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsHeader: {
    marginBottom: SPACING.md,
  },
  resultsCount: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  engineerCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  engineerInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  engineerName: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginRight: SPACING.xs,
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: SPACING.xs,
  },
  engineerTitle: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginLeft: SPACING.xs,
  },
  reviewCount: {
    fontSize: TYPOGRAPHY.sizes.caption,
    marginLeft: SPACING.xs,
  },
  specializationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.sm,
  },
  specializationTag: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
    marginRight: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  specializationText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  moreSpecs: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontStyle: 'italic',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    marginLeft: 2,
  },
  availabilityContainer: {
    marginBottom: SPACING.sm,
  },
  availabilityLabel: {
    fontSize: TYPOGRAPHY.sizes.caption,
    marginBottom: SPACING.xs,
  },
  availabilityChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  availabilityChip: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
    marginRight: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  availabilityText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    marginLeft: 2,
  },
  selectButton: {
    marginTop: SPACING.xs,
  },
});

export default EngineerFilteringScreen;

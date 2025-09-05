import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
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
  onServiceSelect?: (serviceId: string) => void;
  onCategoryFilter?: (categoryId: string) => void;
  onLocationFilter?: (locationId: string) => void;
  onSearch?: (query: string) => void;
}

const SERVICE_CATEGORIES = [
  { 
    id: 'structural', 
    name: { en: 'Structural Engineering', ar: 'الهندسة الإنشائية' },
    icon: 'construct',
    color: COLORS.primary,
    count: 1247
  },
  { 
    id: 'electrical', 
    name: { en: 'Electrical Engineering', ar: 'الهندسة الكهربائية' },
    icon: 'flash',
    color: COLORS.warning,
    count: 892
  },
  { 
    id: 'mechanical', 
    name: { en: 'Mechanical Engineering', ar: 'الهندسة الميكانيكية' },
    icon: 'settings',
    color: COLORS.secondary,
    count: 756
  },
  { 
    id: 'civil', 
    name: { en: 'Civil Engineering', ar: 'الهندسة المدنية' },
    icon: 'business',
    color: COLORS.success,
    count: 1103
  },
  { 
    id: 'architecture', 
    name: { en: 'Architecture', ar: 'العمارة' },
    icon: 'library',
    color: COLORS.info,
    count: 634
  },
  { 
    id: 'environmental', 
    name: { en: 'Environmental Engineering', ar: 'الهندسة البيئية' },
    icon: 'leaf',
    color: COLORS.success,
    count: 298
  },
];

const FEATURED_SERVICES = [
  {
    id: '1',
    title: { en: 'Building Structural Analysis', ar: 'تحليل إنشائي للمباني' },
    category: 'structural',
    price: { min: 5000, max: 25000 },
    rating: 4.8,
    reviews: 124,
    engineer: { en: 'Ahmed Al-Rashid', ar: 'أحمد الراشد' },
    location: { en: 'Riyadh', ar: 'الرياض' },
    image: 'construct',
    urgent: false,
  },
  {
    id: '2',
    title: { en: 'Smart Home Automation', ar: 'أتمتة المنازل الذكية' },
    category: 'electrical',
    price: { min: 8000, max: 40000 },
    rating: 4.9,
    reviews: 87,
    engineer: { en: 'Sara Al-Mahmoud', ar: 'سارة المحمود' },
    location: { en: 'Jeddah', ar: 'جدة' },
    image: 'flash',
    urgent: true,
  },
  {
    id: '3',
    title: { en: 'HVAC System Design', ar: 'تصميم نظام التهوية والتكييف' },
    category: 'mechanical',
    price: { min: 12000, max: 60000 },
    rating: 4.7,
    reviews: 156,
    engineer: { en: 'Mohammed Al-Otaibi', ar: 'محمد العتيبي' },
    location: { en: 'Dammam', ar: 'الدمام' },
    image: 'settings',
    urgent: false,
  },
];

const LOCATIONS = [
  { id: 'riyadh', name: { en: 'Riyadh', ar: 'الرياض' }, count: 2341 },
  { id: 'jeddah', name: { en: 'Jeddah', ar: 'جدة' }, count: 1876 },
  { id: 'dammam', name: { en: 'Dammam', ar: 'الدمام' }, count: 1234 },
  { id: 'mecca', name: { en: 'Mecca', ar: 'مكة' }, count: 987 },
  { id: 'medina', name: { en: 'Medina', ar: 'المدينة' }, count: 654 },
];

const ServiceDiscoveryScreen: React.FC<Props> = ({
  onServiceSelect,
  onCategoryFilter,
  onLocationFilter,
  onSearch,
}) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;
  const scrollViewRef = useRef<ScrollView>(null);
  const filterAnimation = useRef(new Animated.Value(0)).current;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const formatPrice = (min: number, max: number) => {
    return isArabic ? `${max.toLocaleString()} - ${min.toLocaleString()} ريال` : `${min.toLocaleString()} - ${max.toLocaleString()} SAR`;
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? '' : categoryId);
    onCategoryFilter?.(categoryId);
  };

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocation(locationId === selectedLocation ? '' : locationId);
    onLocationFilter?.(locationId);
  };

  const toggleFilters = () => {
    const toValue = showFilters ? 0 : 1;
    setShowFilters(!showFilters);
    
    Animated.spring(filterAnimation, {
      toValue,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start();
  };

  const filterHeight = filterAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  const renderCategoryCard = ({ item: category }) => (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        { backgroundColor: theme.surface },
        selectedCategory === category.id && { 
          backgroundColor: category.color + '15',
          borderColor: category.color,
          borderWidth: 2,
        }
      ]}
      onPress={() => handleCategorySelect(category.id)}
    >
      <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
        <Ionicons name={category.icon as any} size={32} color={category.color} />
      </View>
      <Text style={[styles.categoryName, { color: theme.text }]} numberOfLines={2}>
        {getText(category.name)}
      </Text>
      <Text style={[styles.categoryCount, { color: theme.textSecondary }]}>
        {category.count.toLocaleString()} {getText({ en: 'services', ar: 'خدمة' })}
      </Text>
    </TouchableOpacity>
  );

  const renderServiceCard = ({ item: service }) => (
    <TouchableOpacity
      style={[styles.serviceCard, { backgroundColor: theme.surface }]}
      onPress={() => onServiceSelect?.(service.id)}
    >
      {service.urgent && (
        <View style={styles.urgentBadge}>
          <Ionicons name="time" size={12} color={COLORS.white} />
          <Text style={styles.urgentText}>
            {getText({ en: 'Urgent', ar: 'عاجل' })}
          </Text>
        </View>
      )}
      
      <View style={styles.serviceHeader}>
        <View style={[styles.serviceIcon, { backgroundColor: COLORS.primary + '20' }]}>
          <Ionicons name={service.image as any} size={24} color={COLORS.primary} />
        </View>
        <View style={styles.serviceInfo}>
          <Text style={[styles.serviceTitle, { color: theme.text }]} numberOfLines={2}>
            {getText(service.title)}
          </Text>
          <Text style={[styles.serviceEngineer, { color: theme.textSecondary }]}>
            {getText(service.engineer)}
          </Text>
        </View>
      </View>
      
      <View style={styles.serviceDetails}>
        <View style={styles.serviceRow}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color={COLORS.warning} />
            <Text style={[styles.ratingText, { color: theme.text }]}>
              {service.rating}
            </Text>
            <Text style={[styles.reviewCount, { color: theme.textSecondary }]}>
              ({service.reviews})
            </Text>
          </View>
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={14} color={theme.textSecondary} />
            <Text style={[styles.locationText, { color: theme.textSecondary }]}>
              {getText(service.location)}
            </Text>
          </View>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={[styles.priceText, { color: COLORS.primary }]}>
            {formatPrice(service.price.min, service.price.max)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1a1a1a', '#2d2d2d'] : ['#f8f9fa', '#ffffff']}
      style={styles.container}
    >
      <ScrollView 
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            {getText({
              en: 'Discover Engineering Services',
              ar: 'اكتشف الخدمات الهندسية'
            })}
          </Text>
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
            {getText({
              en: 'Connect with certified engineers across Saudi Arabia',
              ar: 'تواصل مع المهندسين المعتمدين في جميع أنحاء المملكة'
            })}
          </Text>
        </View>

        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: theme.surface }]}>
          <Ionicons name="search" size={20} color={theme.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder={getText({
              en: 'Search for engineering services...',
              ar: 'البحث عن الخدمات الهندسية...'
            })}
            placeholderTextColor={theme.textSecondary}
            value={searchQuery}
            onChangeText={handleSearch}
            textAlign={isArabic ? 'right' : 'left'}
          />
          <TouchableOpacity style={styles.filterButton} onPress={toggleFilters}>
            <Ionicons name="options" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <Animated.View style={[styles.filtersContainer, { height: filterHeight }]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filterSection}>
              <Text style={[styles.filterTitle, { color: theme.text }]}>
                {getText({ en: 'Location', ar: 'الموقع' })}
              </Text>
              <View style={styles.filterChips}>
                {LOCATIONS.map((location) => (
                  <TouchableOpacity
                    key={location.id}
                    style={[
                      styles.filterChip,
                      { backgroundColor: theme.inputBackground },
                      selectedLocation === location.id && { backgroundColor: COLORS.primary + '20' }
                    ]}
                    onPress={() => handleLocationSelect(location.id)}
                  >
                    <Text style={[
                      styles.filterChipText, 
                      { color: theme.text },
                      selectedLocation === location.id && { color: COLORS.primary }
                    ]}>
                      {getText(location.name)} ({location.count})
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </Animated.View>

        {/* Service Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {getText({
                en: 'Engineering Categories',
                ar: 'التخصصات الهندسية'
              })}
            </Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: COLORS.primary }]}>
                {getText({ en: 'See All', ar: 'عرض الكل' })}
              </Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={SERVICE_CATEGORIES}
            renderItem={renderCategoryCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          />
        </View>

        {/* Featured Services */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {getText({
                en: 'Featured Services',
                ar: 'الخدمات المميزة'
              })}
            </Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: COLORS.primary }]}>
                {getText({ en: 'See All', ar: 'عرض الكل' })}
              </Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={FEATURED_SERVICES}
            renderItem={renderServiceCard}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.servicesContainer}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <CustomButton
            title={getText({
              en: 'Post a Job',
              ar: 'نشر وظيفة'
            })}
            onPress={() => {}}
            icon="add"
            size="large"
            fullWidth
            customStyle={styles.postJobButton}
          />
          
          <View style={styles.secondaryActions}>
            <CustomButton
              title={getText({
                en: 'Browse All',
                ar: 'تصفح الكل'
              })}
              onPress={() => {}}
              variant="outline"
              icon="grid"
              size="medium"
              customStyle={styles.browseButton}
            />
            
            <CustomButton
              title={getText({
                en: 'My Projects',
                ar: 'مشاريعي'
              })}
              onPress={() => {}}
              variant="outline"
              icon="briefcase"
              size="medium"
              customStyle={styles.projectsButton}
            />
          </View>
        </View>

        {/* Stats Section */}
        <View style={[styles.statsSection, { backgroundColor: theme.surface }]}>
          <Text style={[styles.statsTitle, { color: theme.text }]}>
            {getText({
              en: 'Platform Statistics',
              ar: 'إحصائيات المنصة'
            })}
          </Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: COLORS.primary }]}>15,847</Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                {getText({ en: 'Engineers', ar: 'مهندس' })}
              </Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: COLORS.success }]}>8,239</Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                {getText({ en: 'Projects', ar: 'مشروع' })}
              </Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: COLORS.warning }]}>4.8</Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                {getText({ en: 'Rating', ar: 'تقييم' })}
              </Text>
            </View>
          </View>
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
    marginBottom: SPACING.xl,
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
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: SPACING.sm,
    marginRight: SPACING.sm,
    fontSize: TYPOGRAPHY.sizes.body1,
  },
  filterButton: {
    padding: SPACING.xs,
  },
  filtersContainer: {
    overflow: 'hidden',
    marginBottom: SPACING.lg,
  },
  filterSection: {
    paddingHorizontal: SPACING.sm,
  },
  filterTitle: {
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
  },
  filterChipText: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.h2,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  seeAllText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  categoriesContainer: {
    paddingHorizontal: SPACING.xs,
  },
  categoryCard: {
    width: 140,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    marginHorizontal: SPACING.sm,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  categoryName: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  categoryCount: {
    fontSize: TYPOGRAPHY.sizes.caption,
    textAlign: 'center',
  },
  servicesContainer: {
    gap: SPACING.md,
  },
  serviceCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  urgentBadge: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.error,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    gap: SPACING.xs,
  },
  urgentText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  serviceEngineer: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  serviceDetails: {
    gap: SPACING.sm,
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  ratingText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  reviewCount: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  locationText: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  quickActions: {
    marginBottom: SPACING.xl,
  },
  postJobButton: {
    marginBottom: SPACING.md,
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  secondaryActions: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  browseButton: {
    flex: 1,
  },
  projectsButton: {
    flex: 1,
  },
  statsSection: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statsTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: TYPOGRAPHY.sizes.h1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
});

export default ServiceDiscoveryScreen;
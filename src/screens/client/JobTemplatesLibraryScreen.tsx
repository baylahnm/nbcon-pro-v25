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
import { Language, ServiceCategory } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - SPACING.lg * 3) / 2;

interface JobTemplate {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  category: ServiceCategory;
  icon: string;
  color: string;
  estimatedDuration: number; // in hours
  basePrice: number; // in SAR
  complexity: 'Basic' | 'Intermediate' | 'Advanced';
  requirements: string[];
  features: string[];
  popularity: number; // 1-5 stars
  usageCount: number;
  isPremium: boolean;
  isCustomizable: boolean;
}

const JOB_TEMPLATES: JobTemplate[] = [
  {
    id: 'site_inspection_basic',
    title: { en: 'Basic Site Inspection', ar: 'معاينة موقع أساسية' },
    description: {
      en: 'Standard site inspection and assessment for small projects',
      ar: 'معاينة وتقييم موقع معياري للمشاريع الصغيرة'
    },
    category: ServiceCategory.CIVIL,
    icon: 'search',
    color: '#FF9800',
    estimatedDuration: 2,
    basePrice: 400,
    complexity: 'Basic',
    requirements: ['Site access', 'Basic safety equipment'],
    features: ['Visual inspection', 'Basic measurements', 'Photo documentation'],
    popularity: 4,
    usageCount: 1250,
    isPremium: false,
    isCustomizable: true,
  },
  {
    id: 'site_inspection_advanced',
    title: { en: 'Advanced Site Inspection', ar: 'معاينة موقع متقدمة' },
    description: {
      en: 'Comprehensive site inspection with detailed analysis and reporting',
      ar: 'معاينة موقع شاملة مع تحليل مفصل وإعداد التقارير'
    },
    category: ServiceCategory.CIVIL,
    icon: 'search',
    color: '#FF9800',
    estimatedDuration: 6,
    basePrice: 1200,
    complexity: 'Advanced',
    requirements: ['Site access', 'Advanced equipment', 'Safety gear'],
    features: ['Detailed analysis', '3D mapping', 'Compliance check', 'Report generation'],
    popularity: 5,
    usageCount: 890,
    isPremium: true,
    isCustomizable: true,
  },
  {
    id: 'mep_systems_review',
    title: { en: 'MEP Systems Review', ar: 'مراجعة أنظمة MEP' },
    description: {
      en: 'Comprehensive MEP systems analysis and compliance verification',
      ar: 'تحليل شامل لأنظمة MEP والتحقق من الامتثال'
    },
    category: ServiceCategory.MEP,
    icon: 'construct',
    color: '#2196F3',
    estimatedDuration: 8,
    basePrice: 1800,
    complexity: 'Advanced',
    requirements: ['System drawings', 'Access to utilities', 'Testing equipment'],
    features: ['System analysis', 'Compliance check', 'Performance testing', 'Report generation'],
    popularity: 4,
    usageCount: 650,
    isPremium: true,
    isCustomizable: true,
  },
  {
    id: 'land_surveying_standard',
    title: { en: 'Standard Land Surveying', ar: 'مساحة أرضية معيارية' },
    description: {
      en: 'Precise land surveying and mapping for construction projects',
      ar: 'مساحة أرضية دقيقة ورسم خرائط لمشاريع البناء'
    },
    category: ServiceCategory.SURVEYING,
    icon: 'location',
    color: '#4CAF50',
    estimatedDuration: 4,
    basePrice: 800,
    complexity: 'Intermediate',
    requirements: ['Clear site access', 'Survey markers', 'GPS equipment'],
    features: ['Boundary marking', 'Topographic mapping', 'Elevation survey'],
    popularity: 4,
    usageCount: 980,
    isPremium: false,
    isCustomizable: true,
  },
  {
    id: 'bim_modeling_basic',
    title: { en: 'Basic BIM Modeling', ar: 'نمذجة BIM أساسية' },
    description: {
      en: 'Simple 3D modeling and visualization for small projects',
      ar: 'نمذجة ثلاثية الأبعاد بسيطة وتصور للمشاريع الصغيرة'
    },
    category: ServiceCategory.BIM,
    icon: 'cube',
    color: '#9C27B0',
    estimatedDuration: 16,
    basePrice: 2400,
    complexity: 'Basic',
    requirements: ['CAD files', 'Project specifications'],
    features: ['3D modeling', 'Basic visualization', 'Export options'],
    popularity: 3,
    usageCount: 420,
    isPremium: false,
    isCustomizable: true,
  },
  {
    id: 'bim_modeling_advanced',
    title: { en: 'Advanced BIM Modeling', ar: 'نمذجة BIM متقدمة' },
    description: {
      en: 'Comprehensive BIM modeling with clash detection and coordination',
      ar: 'نمذجة BIM شاملة مع كشف التضارب والتنسيق'
    },
    category: ServiceCategory.BIM,
    icon: 'cube',
    color: '#9C27B0',
    estimatedDuration: 32,
    basePrice: 4800,
    complexity: 'Advanced',
    requirements: ['CAD files', 'Project specifications', 'Software access'],
    features: ['Advanced modeling', 'Clash detection', '4D scheduling', 'Coordination'],
    popularity: 5,
    usageCount: 320,
    isPremium: true,
    isCustomizable: true,
  },
  {
    id: 'hse_assessment',
    title: { en: 'HSE Compliance Assessment', ar: 'تقييم امتثال الصحة والسلامة' },
    description: {
      en: 'Health, Safety, and Environment compliance assessment and reporting',
      ar: 'تقييم وإعداد تقارير امتثال الصحة والسلامة والبيئة'
    },
    category: ServiceCategory.HSE,
    icon: 'shield-checkmark',
    color: '#F44336',
    estimatedDuration: 4,
    basePrice: 600,
    complexity: 'Intermediate',
    requirements: ['Safety documentation', 'Site access', 'Compliance checklist'],
    features: ['Compliance check', 'Risk assessment', 'Report generation', 'Recommendations'],
    popularity: 4,
    usageCount: 750,
    isPremium: false,
    isCustomizable: true,
  },
  {
    id: 'gis_analysis',
    title: { en: 'GIS Analysis & Mapping', ar: 'تحليل ورسم خرائط GIS' },
    description: {
      en: 'Geographic Information Systems analysis and spatial mapping',
      ar: 'تحليل نظم المعلومات الجغرافية ورسم الخرائط المكانية'
    },
    category: ServiceCategory.GIS,
    icon: 'map',
    color: '#00BCD4',
    estimatedDuration: 12,
    basePrice: 1800,
    complexity: 'Advanced',
    requirements: ['Geographic data', 'Satellite imagery', 'Analysis software'],
    features: ['Spatial analysis', 'Data visualization', 'Mapping', 'Report generation'],
    popularity: 3,
    usageCount: 280,
    isPremium: true,
    isCustomizable: true,
  },
  {
    id: 'structural_analysis',
    title: { en: 'Structural Analysis', ar: 'التحليل الإنشائي' },
    description: {
      en: 'Structural engineering analysis and load calculations',
      ar: 'تحليل هندسي إنشائي وحسابات الأحمال'
    },
    category: ServiceCategory.CIVIL,
    icon: 'business',
    color: '#795548',
    estimatedDuration: 20,
    basePrice: 3000,
    complexity: 'Advanced',
    requirements: ['Structural drawings', 'Load data', 'Analysis software'],
    features: ['Load analysis', 'Safety calculations', 'Design recommendations', 'Report generation'],
    popularity: 4,
    usageCount: 450,
    isPremium: true,
    isCustomizable: true,
  },
  {
    id: 'electrical_design',
    title: { en: 'Electrical System Design', ar: 'تصميم النظام الكهربائي' },
    description: {
      en: 'Electrical system design and load calculations for buildings',
      ar: 'تصميم النظام الكهربائي وحسابات الأحمال للمباني'
    },
    category: ServiceCategory.MEP,
    icon: 'flash',
    color: '#FFC107',
    estimatedDuration: 24,
    basePrice: 3600,
    complexity: 'Advanced',
    requirements: ['Electrical drawings', 'Load data', 'Design software'],
    features: ['Load calculations', 'Circuit design', 'Safety analysis', 'Code compliance'],
    popularity: 4,
    usageCount: 380,
    isPremium: true,
    isCustomizable: true,
  },
];

const JobTemplatesLibraryScreen = () => {
  const navigation = useNavigation();
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'All'>('All');
  const [selectedComplexity, setSelectedComplexity] = useState<'All' | 'Basic' | 'Intermediate' | 'Advanced'>('All');
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'popularity' | 'price' | 'duration' | 'usage'>('popularity');
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const filteredTemplates = JOB_TEMPLATES.filter(template => {
    const matchesSearch = getText(template.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
                         getText(template.description).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesComplexity = selectedComplexity === 'All' || template.complexity === selectedComplexity;
    const matchesPremium = !showPremiumOnly || template.isPremium;
    
    return matchesSearch && matchesCategory && matchesComplexity && matchesPremium;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'popularity':
        return b.popularity - a.popularity;
      case 'price':
        return a.basePrice - b.basePrice;
      case 'duration':
        return a.estimatedDuration - b.estimatedDuration;
      case 'usage':
        return b.usageCount - a.usageCount;
      default:
        return 0;
    }
  });

  const handleUseTemplate = (template: JobTemplate) => {
    Alert.alert(
      isArabic ? 'استخدام القالب' : 'Use Template',
      isArabic 
        ? `هل تريد استخدام قالب "${getText(template.title)}"؟`
        : `Do you want to use template "${getText(template.title)}"?`,
      [
        { text: isArabic ? 'إلغاء' : 'Cancel', style: 'cancel' },
        {
          text: isArabic ? 'استخدام' : 'Use',
          onPress: () => {
            // Navigate to job creation with template data
            navigation.navigate('AdvancedJobBuilder' as never, { template });
          }
        }
      ]
    );
  };

  const renderTemplateCard = ({ item: template }: { item: JobTemplate }) => (
    <TouchableOpacity
      style={[styles.templateCard, { backgroundColor: theme.surface }]}
      onPress={() => handleUseTemplate(template)}
    >
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={[styles.templateIcon, { backgroundColor: template.color + '15' }]}>
          <Ionicons name={template.icon as any} size={24} color={template.color} />
        </View>
        
        <View style={styles.templateInfo}>
          <Text style={[styles.templateTitle, { color: theme.text }]} numberOfLines={2}>
            {getText(template.title)}
          </Text>
          <Text style={[styles.templateCategory, { color: template.color }]}>
            {template.category}
          </Text>
        </View>

        {template.isPremium && (
          <View style={[styles.premiumBadge, { backgroundColor: COLORS.accent }]}>
            <Ionicons name="star" size={12} color={COLORS.white} />
          </View>
        )}
      </View>

      {/* Description */}
      <Text style={[styles.templateDescription, { color: theme.textSecondary }]} numberOfLines={2}>
        {getText(template.description)}
      </Text>

      {/* Features */}
      <View style={styles.featuresContainer}>
        {template.features.slice(0, 2).map((feature, index) => (
          <View key={index} style={styles.featureTag}>
            <Text style={[styles.featureText, { color: theme.textSecondary }]}>
              {feature}
            </Text>
          </View>
        ))}
        {template.features.length > 2 && (
          <Text style={[styles.moreFeatures, { color: theme.textSecondary }]}>
            +{template.features.length - 2} {isArabic ? 'أكثر' : 'more'}
          </Text>
        )}
      </View>

      {/* Stats */}
      <View style={styles.templateStats}>
        <View style={styles.statItem}>
          <Ionicons name="time" size={14} color={theme.textSecondary} />
          <Text style={[styles.statText, { color: theme.textSecondary }]}>
            {template.estimatedDuration}h
          </Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="cash" size={14} color={theme.textSecondary} />
          <Text style={[styles.statText, { color: theme.textSecondary }]}>
            {template.basePrice} SAR
          </Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="people" size={14} color={theme.textSecondary} />
          <Text style={[styles.statText, { color: theme.textSecondary }]}>
            {template.usageCount}
          </Text>
        </View>
      </View>

      {/* Complexity Badge */}
      <View style={[
        styles.complexityBadge,
        {
          backgroundColor: template.complexity === 'Basic' ? COLORS.success + '15' :
                           template.complexity === 'Intermediate' ? COLORS.warning + '15' :
                           COLORS.error + '15'
        }
      ]}>
        <Text style={[
          styles.complexityText,
          {
            color: template.complexity === 'Basic' ? COLORS.success :
                   template.complexity === 'Intermediate' ? COLORS.warning :
                   COLORS.error
          }
        ]}>
          {template.complexity}
        </Text>
      </View>

      {/* Use Button */}
      <CustomButton
        title={isArabic ? 'استخدام' : 'Use'}
        onPress={() => handleUseTemplate(template)}
        style={styles.useButton}
        size="small"
        icon="arrow-forward"
      />
    </TouchableOpacity>
  );

  const renderFilterChips = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
      {/* Category Filter */}
      <View style={styles.filterGroup}>
        <Text style={[styles.filterLabel, { color: theme.text }]}>
          {isArabic ? 'الفئة:' : 'Category:'}
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterChips}>
          <TouchableOpacity
            style={[
              styles.filterChip,
              {
                backgroundColor: selectedCategory === 'All' ? COLORS.primary : theme.surface,
                borderColor: selectedCategory === 'All' ? COLORS.primary : theme.border,
              }
            ]}
            onPress={() => setSelectedCategory('All')}
          >
            <Text style={[
              styles.filterChipText,
              { color: selectedCategory === 'All' ? COLORS.white : theme.text }
            ]}>
              {isArabic ? 'الكل' : 'All'}
            </Text>
          </TouchableOpacity>
          {Object.values(ServiceCategory).map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterChip,
                {
                  backgroundColor: selectedCategory === category ? COLORS.primary : theme.surface,
                  borderColor: selectedCategory === category ? COLORS.primary : theme.border,
                }
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.filterChipText,
                { color: selectedCategory === category ? COLORS.white : theme.text }
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Complexity Filter */}
      <View style={styles.filterGroup}>
        <Text style={[styles.filterLabel, { color: theme.text }]}>
          {isArabic ? 'التعقيد:' : 'Complexity:'}
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterChips}>
          {['All', 'Basic', 'Intermediate', 'Advanced'].map((complexity) => (
            <TouchableOpacity
              key={complexity}
              style={[
                styles.filterChip,
                {
                  backgroundColor: selectedComplexity === complexity ? COLORS.primary : theme.surface,
                  borderColor: selectedComplexity === complexity ? COLORS.primary : theme.border,
                }
              ]}
              onPress={() => setSelectedComplexity(complexity as any)}
            >
              <Text style={[
                styles.filterChipText,
                { color: selectedComplexity === complexity ? COLORS.white : theme.text }
              ]}>
                {complexity}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
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
              {isArabic ? 'مكتبة قوالب الوظائف' : 'Job Templates Library'}
            </Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              {isArabic ? 'اختر من قوالب الوظائف الجاهزة' : 'Choose from ready-made job templates'}
            </Text>
          </View>
        </View>

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
              placeholder={isArabic ? 'البحث في القوالب...' : 'Search templates...'}
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
        {renderFilterChips()}

        {/* Sort Options */}
        <View style={styles.sortContainer}>
          <Text style={[styles.sortLabel, { color: theme.text }]}>
            {isArabic ? 'ترتيب حسب:' : 'Sort by:'}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sortOptions}>
            {[
              { key: 'popularity', label: { en: 'Popularity', ar: 'الشعبية' } },
              { key: 'price', label: { en: 'Price', ar: 'السعر' } },
              { key: 'duration', label: { en: 'Duration', ar: 'المدة' } },
              { key: 'usage', label: { en: 'Usage', ar: 'الاستخدام' } },
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

        {/* Premium Toggle */}
        <View style={styles.premiumToggle}>
          <TouchableOpacity
            style={[
              styles.premiumToggleButton,
              {
                backgroundColor: showPremiumOnly ? COLORS.accent + '15' : theme.surface,
                borderColor: showPremiumOnly ? COLORS.accent : theme.border,
              }
            ]}
            onPress={() => setShowPremiumOnly(!showPremiumOnly)}
          >
            <Ionicons 
              name={showPremiumOnly ? 'star' : 'star-outline'} 
              size={20} 
              color={showPremiumOnly ? COLORS.accent : theme.textSecondary} 
            />
            <Text style={[
              styles.premiumToggleText,
              { color: showPremiumOnly ? COLORS.accent : theme.textSecondary }
            ]}>
              {isArabic ? 'القوالب المميزة فقط' : 'Premium Templates Only'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Templates Grid */}
        <View style={styles.templatesContainer}>
          <Text style={[styles.resultsCount, { color: theme.textSecondary }]}>
            {isArabic 
              ? `${filteredTemplates.length} قالب متاح`
              : `${filteredTemplates.length} templates available`
            }
          </Text>
          
          <FlatList
            data={filteredTemplates}
            renderItem={renderTemplateCard}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
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
  filtersContainer: {
    marginBottom: SPACING.lg,
  },
  filterGroup: {
    marginBottom: SPACING.md,
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
  premiumToggle: {
    marginBottom: SPACING.lg,
  },
  premiumToggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 2,
  },
  premiumToggleText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginLeft: SPACING.sm,
  },
  templatesContainer: {
    flex: 1,
  },
  resultsCount: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginBottom: SPACING.md,
  },
  row: {
    justifyContent: 'space-between',
  },
  templateCard: {
    width: CARD_WIDTH,
    padding: SPACING.md,
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
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  templateIcon: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  templateInfo: {
    flex: 1,
  },
  templateTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle2,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  templateCategory: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  premiumBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  templateDescription: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 16,
    marginBottom: SPACING.sm,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.sm,
  },
  featureTag: {
    backgroundColor: COLORS.primary + '10',
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
    marginRight: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  featureText: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  moreFeatures: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontStyle: 'italic',
  },
  templateStats: {
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
  complexityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: SPACING.sm,
  },
  complexityText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  useButton: {
    marginTop: SPACING.xs,
  },
});

export default JobTemplatesLibraryScreen;

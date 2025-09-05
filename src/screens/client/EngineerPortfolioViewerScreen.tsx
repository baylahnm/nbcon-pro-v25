import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
  Alert,
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

interface Project {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  category: ServiceCategory;
  images: string[];
  completedDate: string;
  clientName: string;
  budget: number;
  duration: number; // in days
  rating: number;
  testimonial?: { en: string; ar: string };
}

interface Review {
  id: string;
  clientName: string;
  rating: number;
  comment: { en: string; ar: string };
  date: string;
  projectTitle: { en: string; ar: string };
}

interface Engineer {
  id: string;
  name: string;
  title: { en: string; ar: string };
  specializations: ServiceCategory[];
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  location: { en: string; ar: string };
  distance: number;
  experience: number;
  status: EngineerStatus;
  isVerified: boolean;
  isOnline: boolean;
  responseTime: string;
  completionRate: number;
  languages: string[];
  certifications: string[];
  bio: { en: string; ar: string };
  profileImage: string;
  coverImage: string;
  portfolioImages: string[];
  projects: Project[];
  reviews: Review[];
  availability: {
    today: boolean;
    thisWeek: boolean;
    nextWeek: boolean;
  };
}

const SAMPLE_ENGINEER: Engineer = {
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
  profileImage: 'https://via.placeholder.com/150',
  coverImage: 'https://via.placeholder.com/400x200',
  portfolioImages: [
    'https://via.placeholder.com/300x200',
    'https://via.placeholder.com/300x200',
    'https://via.placeholder.com/300x200',
    'https://via.placeholder.com/300x200',
  ],
  bio: {
    en: 'Experienced civil engineer with 8+ years of expertise in infrastructure projects, structural design, and construction management. Specialized in large-scale commercial and residential developments across Saudi Arabia.',
    ar: 'مهندس مدني ذو خبرة تزيد عن 8 سنوات متخصص في مشاريع البنية التحتية والتصميم الإنشائي وإدارة البناء. متخصص في التطويرات التجارية والسكنية واسعة النطاق في جميع أنحاء المملكة العربية السعودية.'
  },
  projects: [
    {
      id: '1',
      title: { en: 'King Abdullah Financial District', ar: 'الحي المالي الملك عبدالله' },
      description: {
        en: 'Structural design and supervision for 50-story commercial tower',
        ar: 'التصميم الإنشائي والإشراف على برج تجاري من 50 طابق'
      },
      category: ServiceCategory.CIVIL,
      images: ['https://via.placeholder.com/300x200', 'https://via.placeholder.com/300x200'],
      completedDate: '2023-08-15',
      clientName: 'Riyadh Development Authority',
      budget: 2500000,
      duration: 180,
      rating: 5.0,
      testimonial: {
        en: 'Excellent work and professional approach throughout the project.',
        ar: 'عمل ممتاز ونهج مهني طوال المشروع.'
      }
    },
    {
      id: '2',
      title: { en: 'NEOM City Infrastructure', ar: 'بنية تحتية لمدينة نيوم' },
      description: {
        en: 'Infrastructure planning and design for smart city development',
        ar: 'تخطيط وتصميم البنية التحتية لتطوير المدينة الذكية'
      },
      category: ServiceCategory.CIVIL,
      images: ['https://via.placeholder.com/300x200', 'https://via.placeholder.com/300x200'],
      completedDate: '2023-05-20',
      clientName: 'NEOM Company',
      budget: 5000000,
      duration: 365,
      rating: 4.8,
    },
    {
      id: '3',
      title: { en: 'Jeddah Waterfront Development', ar: 'تطوير الواجهة البحرية بجدة' },
      description: {
        en: 'Coastal engineering and flood protection systems',
        ar: 'الهندسة الساحلية وأنظمة الحماية من الفيضانات'
      },
      category: ServiceCategory.CIVIL,
      images: ['https://via.placeholder.com/300x200'],
      completedDate: '2023-02-10',
      clientName: 'Jeddah Municipality',
      budget: 1800000,
      duration: 120,
      rating: 4.9,
    }
  ],
  reviews: [
    {
      id: '1',
      clientName: 'محمد السعد',
      rating: 5,
      comment: {
        en: 'Outstanding engineer with great attention to detail and excellent communication.',
        ar: 'مهندس متميز مع اهتمام كبير بالتفاصيل وتواصل ممتاز.'
      },
      date: '2023-09-15',
      projectTitle: { en: 'Residential Complex Design', ar: 'تصميم مجمع سكني' }
    },
    {
      id: '2',
      clientName: 'Sarah Johnson',
      rating: 5,
      comment: {
        en: 'Professional, reliable, and delivered beyond expectations. Highly recommended!',
        ar: 'مهني وموثوق وتجاوز التوقعات. أنصح به بشدة!'
      },
      date: '2023-08-22',
      projectTitle: { en: 'Office Building Project', ar: 'مشروع مبنى مكتبي' }
    },
    {
      id: '3',
      clientName: 'عبدالله القحطاني',
      rating: 4,
      comment: {
        en: 'Good work quality and timely delivery. Would work with again.',
        ar: 'جودة عمل جيدة وتسليم في الوقت المحدد. سأعمل معه مرة أخرى.'
      },
      date: '2023-07-30',
      projectTitle: { en: 'Shopping Mall Structure', ar: 'هيكل مجمع تجاري' }
    }
  ]
};

const EngineerPortfolioViewerScreen = () => {
  const navigation = useNavigation();
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'reviews'>('overview');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const engineer = SAMPLE_ENGINEER; // In real app, this would come from route params
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const handleContact = () => {
    Alert.alert(
      isArabic ? 'تواصل مع المهندس' : 'Contact Engineer',
      isArabic 
        ? 'اختر طريقة التواصل مع المهندس'
        : 'Choose how to contact the engineer',
      [
        { text: isArabic ? 'إلغاء' : 'Cancel', style: 'cancel' },
        {
          text: isArabic ? 'رسالة' : 'Message',
          onPress: () => navigation.navigate('InAppMessagingHub' as never)
        },
        {
          text: isArabic ? 'مكالمة فيديو' : 'Video Call',
          onPress: () => navigation.navigate('VideoCallIntegration' as never)
        }
      ]
    );
  };

  const handleHire = () => {
    Alert.alert(
      isArabic ? 'توظيف المهندس' : 'Hire Engineer',
      isArabic 
        ? 'هل تريد توظيف هذا المهندس للمشروع؟'
        : 'Do you want to hire this engineer for the project?',
      [
        { text: isArabic ? 'إلغاء' : 'Cancel', style: 'cancel' },
        {
          text: isArabic ? 'توظيف' : 'Hire',
          onPress: () => {
            setIsLoading(true);
            // Simulate API call
            setTimeout(() => {
              setIsLoading(false);
              Alert.alert(
                isArabic ? 'تم الإرسال!' : 'Sent!',
                isArabic 
                  ? 'تم إرسال طلب التوظيف للمهندس'
                  : 'Hire request sent to engineer',
                [{ text: isArabic ? 'موافق' : 'OK' }]
              );
            }, 2000);
          }
        }
      ]
    );
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // In real app, this would update the backend
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Ionicons
        key={index}
        name={index < Math.floor(rating) ? 'star' : 'star-outline'}
        size={16}
        color={COLORS.warning}
      />
    ));
  };

  const renderOverview = () => (
    <View style={styles.tabContent}>
      {/* Bio Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {isArabic ? 'نبذة عن المهندس' : 'About Engineer'}
        </Text>
        <Text style={[styles.bioText, { color: theme.textSecondary }]}>
          {getText(engineer.bio)}
        </Text>
      </View>

      {/* Specializations */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {isArabic ? 'التخصصات' : 'Specializations'}
        </Text>
        <View style={styles.specializationsContainer}>
          {engineer.specializations.map((spec, index) => (
            <View key={index} style={[styles.specializationTag, { backgroundColor: COLORS.primary + '15' }]}>
              <Text style={[styles.specializationText, { color: COLORS.primary }]}>
                {spec}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Certifications */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {isArabic ? 'الشهادات والتراخيص' : 'Certifications & Licenses'}
        </Text>
        <View style={styles.certificationsContainer}>
          {engineer.certifications.map((cert, index) => (
            <View key={index} style={[styles.certificationItem, { backgroundColor: theme.surface }]}>
              <Ionicons name="ribbon" size={20} color={COLORS.accent} />
              <Text style={[styles.certificationText, { color: theme.text }]}>
                {cert}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Languages */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {isArabic ? 'اللغات' : 'Languages'}
        </Text>
        <View style={styles.languagesContainer}>
          {engineer.languages.map((lang, index) => (
            <View key={index} style={[styles.languageTag, { backgroundColor: COLORS.success + '15' }]}>
              <Text style={[styles.languageText, { color: COLORS.success }]}>
                {lang}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Stats */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {isArabic ? 'الإحصائيات' : 'Statistics'}
        </Text>
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
            <Ionicons name="star" size={24} color={COLORS.warning} />
            <Text style={[styles.statValue, { color: theme.text }]}>
              {engineer.rating}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              {isArabic ? 'التقييم' : 'Rating'}
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
            <Ionicons name="people" size={24} color={COLORS.primary} />
            <Text style={[styles.statValue, { color: theme.text }]}>
              {engineer.reviewCount}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              {isArabic ? 'التقييمات' : 'Reviews'}
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
            <Ionicons name="checkmark-circle" size={24} color={COLORS.success} />
            <Text style={[styles.statValue, { color: theme.text }]}>
              {engineer.completionRate}%
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              {isArabic ? 'معدل الإنجاز' : 'Completion'}
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
            <Ionicons name="time" size={24} color={COLORS.accent} />
            <Text style={[styles.statValue, { color: theme.text }]}>
              {engineer.experience}y
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              {isArabic ? 'الخبرة' : 'Experience'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderProjects = () => (
    <View style={styles.tabContent}>
      <FlatList
        data={engineer.projects}
        renderItem={({ item: project }) => (
          <View style={[styles.projectCard, { backgroundColor: theme.surface }]}>
            <View style={styles.projectHeader}>
              <Text style={[styles.projectTitle, { color: theme.text }]} numberOfLines={2}>
                {getText(project.title)}
              </Text>
              <View style={styles.projectRating}>
                {renderStars(project.rating)}
                <Text style={[styles.ratingText, { color: theme.textSecondary }]}>
                  {project.rating}
                </Text>
              </View>
            </View>

            <Text style={[styles.projectDescription, { color: theme.textSecondary }]} numberOfLines={2}>
              {getText(project.description)}
            </Text>

            <View style={styles.projectImages}>
              {project.images.slice(0, 3).map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  style={styles.projectImage}
                  resizeMode="cover"
                />
              ))}
              {project.images.length > 3 && (
                <View style={[styles.moreImagesOverlay, { backgroundColor: COLORS.primary + '80' }]}>
                  <Text style={styles.moreImagesText}>
                    +{project.images.length - 3}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.projectDetails}>
              <View style={styles.projectDetail}>
                <Ionicons name="business" size={16} color={theme.textSecondary} />
                <Text style={[styles.projectDetailText, { color: theme.textSecondary }]}>
                  {project.clientName}
                </Text>
              </View>
              <View style={styles.projectDetail}>
                <Ionicons name="cash" size={16} color={theme.textSecondary} />
                <Text style={[styles.projectDetailText, { color: theme.textSecondary }]}>
                  {project.budget.toLocaleString()} SAR
                </Text>
              </View>
              <View style={styles.projectDetail}>
                <Ionicons name="calendar" size={16} color={theme.textSecondary} />
                <Text style={[styles.projectDetailText, { color: theme.textSecondary }]}>
                  {project.duration} {isArabic ? 'يوم' : 'days'}
                </Text>
              </View>
            </View>

            {project.testimonial && (
              <View style={[styles.testimonialCard, { backgroundColor: COLORS.primary + '10' }]}>
                <Ionicons name="quote" size={20} color={COLORS.primary} />
                <Text style={[styles.testimonialText, { color: theme.text }]}>
                  "{getText(project.testimonial)}"
                </Text>
              </View>
            )}
          </View>
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
  );

  const renderReviews = () => (
    <View style={styles.tabContent}>
      <FlatList
        data={engineer.reviews}
        renderItem={({ item: review }) => (
          <View style={[styles.reviewCard, { backgroundColor: theme.surface }]}>
            <View style={styles.reviewHeader}>
              <View style={styles.reviewerInfo}>
                <View style={[styles.reviewerAvatar, { backgroundColor: COLORS.primary }]}>
                  <Text style={styles.reviewerInitial}>
                    {review.clientName.charAt(0)}
                  </Text>
                </View>
                <View>
                  <Text style={[styles.reviewerName, { color: theme.text }]}>
                    {review.clientName}
                  </Text>
                  <Text style={[styles.reviewProject, { color: theme.textSecondary }]}>
                    {getText(review.projectTitle)}
                  </Text>
                </View>
              </View>
              <View style={styles.reviewRating}>
                {renderStars(review.rating)}
                <Text style={[styles.reviewDate, { color: theme.textSecondary }]}>
                  {new Date(review.date).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
                </Text>
              </View>
            </View>

            <Text style={[styles.reviewComment, { color: theme.textSecondary }]}>
              {getText(review.comment)}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'projects': return renderProjects();
      case 'reviews': return renderReviews();
      default: return null;
    }
  };

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

          <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
            <Ionicons 
              name={isFavorite ? 'heart' : 'heart-outline'} 
              size={24} 
              color={isFavorite ? COLORS.error : theme.text} 
            />
          </TouchableOpacity>
        </View>

        {/* Cover Image */}
        <View style={styles.coverImageContainer}>
          <Image
            source={{ uri: engineer.coverImage }}
            style={styles.coverImage}
            resizeMode="cover"
          />
          <View style={styles.coverOverlay} />
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: engineer.profileImage }}
              style={styles.profileImage}
              resizeMode="cover"
            />
            {engineer.isOnline && (
              <View style={[styles.onlineIndicator, { backgroundColor: COLORS.success }]} />
            )}
          </View>

          <View style={styles.profileInfo}>
            <View style={styles.nameContainer}>
              <Text style={[styles.engineerName, { color: theme.text }]}>
                {engineer.name}
              </Text>
              {engineer.isVerified && (
                <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
              )}
            </View>

            <Text style={[styles.engineerTitle, { color: theme.textSecondary }]}>
              {getText(engineer.title)}
            </Text>

            <View style={styles.ratingContainer}>
              {renderStars(engineer.rating)}
              <Text style={[styles.ratingText, { color: theme.text }]}>
                {engineer.rating} ({engineer.reviewCount} {isArabic ? 'تقييم' : 'reviews'})
              </Text>
            </View>

            <View style={styles.locationContainer}>
              <Ionicons name="location" size={16} color={theme.textSecondary} />
              <Text style={[styles.locationText, { color: theme.textSecondary }]}>
                {getText(engineer.location)} • {engineer.distance} km
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <CustomButton
            title={isArabic ? 'تواصل' : 'Contact'}
            onPress={handleContact}
            style={[styles.actionButton, { backgroundColor: theme.surface }]}
            textColor={theme.text}
            icon="chatbubble"
          />
          <CustomButton
            title={isArabic ? 'توظيف' : 'Hire'}
            onPress={handleHire}
            loading={isLoading}
            style={styles.actionButton}
            icon="person-add"
          />
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              {
                backgroundColor: activeTab === 'overview' ? COLORS.primary : theme.surface,
                borderColor: activeTab === 'overview' ? COLORS.primary : theme.border,
              }
            ]}
            onPress={() => setActiveTab('overview')}
          >
            <Text style={[
              styles.tabText,
              { color: activeTab === 'overview' ? COLORS.white : theme.text }
            ]}>
              {isArabic ? 'نظرة عامة' : 'Overview'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              {
                backgroundColor: activeTab === 'projects' ? COLORS.primary : theme.surface,
                borderColor: activeTab === 'projects' ? COLORS.primary : theme.border,
              }
            ]}
            onPress={() => setActiveTab('projects')}
          >
            <Text style={[
              styles.tabText,
              { color: activeTab === 'projects' ? COLORS.white : theme.text }
            ]}>
              {isArabic ? 'المشاريع' : 'Projects'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              {
                backgroundColor: activeTab === 'reviews' ? COLORS.primary : theme.surface,
                borderColor: activeTab === 'reviews' ? COLORS.primary : theme.border,
              }
            ]}
            onPress={() => setActiveTab('reviews')}
          >
            <Text style={[
              styles.tabText,
              { color: activeTab === 'reviews' ? COLORS.white : theme.text }
            ]}>
              {isArabic ? 'التقييمات' : 'Reviews'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {renderTabContent()}
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    padding: SPACING.sm,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: BORDER_RADIUS.full,
  },
  favoriteButton: {
    padding: SPACING.sm,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: BORDER_RADIUS.full,
  },
  coverImageContainer: {
    height: 200,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  profileSection: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    marginTop: -50,
    zIndex: 5,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: COLORS.white,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  profileInfo: {
    flex: 1,
    marginLeft: SPACING.lg,
    justifyContent: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  engineerName: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginRight: SPACING.sm,
  },
  engineerTitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    marginBottom: SPACING.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  ratingText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: SPACING.sm,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: SPACING.xs,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    gap: SPACING.md,
  },
  actionButton: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  tabText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  tabContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.h4,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.md,
  },
  bioText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    lineHeight: 24,
  },
  specializationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  specializationTag: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
  },
  specializationText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  certificationsContainer: {
    gap: SPACING.sm,
  },
  certificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  certificationText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: SPACING.sm,
  },
  languagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  languageTag: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
  },
  languageText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  statCard: {
    width: (width - SPACING.lg * 2 - SPACING.sm) / 2,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
  },
  statValue: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginTop: SPACING.xs,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.sizes.caption,
    marginTop: SPACING.xs,
  },
  projectCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  projectTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    flex: 1,
    marginRight: SPACING.sm,
  },
  projectRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  projectDescription: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  projectImages: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  projectImage: {
    width: 80,
    height: 60,
    borderRadius: BORDER_RADIUS.sm,
  },
  moreImagesOverlay: {
    width: 80,
    height: 60,
    borderRadius: BORDER_RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreImagesText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  projectDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  projectDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  projectDetailText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    marginLeft: SPACING.xs,
  },
  testimonialCard: {
    flexDirection: 'row',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginTop: SPACING.sm,
  },
  testimonialText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontStyle: 'italic',
    marginLeft: SPACING.sm,
    flex: 1,
  },
  reviewCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  reviewerInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  reviewerInitial: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  reviewerName: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  reviewProject: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  reviewRating: {
    alignItems: 'flex-end',
  },
  reviewDate: {
    fontSize: TYPOGRAPHY.sizes.caption,
    marginTop: SPACING.xs,
  },
  reviewComment: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 20,
  },
});

export default EngineerPortfolioViewerScreen;

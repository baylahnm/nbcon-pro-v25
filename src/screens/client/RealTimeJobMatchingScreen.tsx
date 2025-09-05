import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  Animated,
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
  hourlyRate: number;
  location: { en: string; ar: string };
  distance: number;
  experience: number;
  status: EngineerStatus;
  isVerified: boolean;
  isOnline: boolean;
  responseTime: string;
  completionRate: number;
  profileImage: string;
  bio: { en: string; ar: string };
  availability: {
    today: boolean;
    thisWeek: boolean;
    nextWeek: boolean;
  };
}

interface JobMatch {
  id: string;
  engineer: Engineer;
  matchScore: number; // 0-100
  estimatedPrice: number;
  estimatedDuration: number; // in hours
  proposedStartDate: string;
  status: 'viewing' | 'interested' | 'declined' | 'accepted' | 'expired';
  viewedAt?: string;
  respondedAt?: string;
  message?: string;
  isNew: boolean;
}

interface JobDetails {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  category: ServiceCategory;
  location: { en: string; ar: string };
  budget: number;
  urgency: 'normal' | 'urgent' | 'emergency';
  postedAt: string;
  expiresAt: string;
}

const SAMPLE_JOB: JobDetails = {
  id: 'job_001',
  title: { en: 'Structural Inspection - Office Building', ar: 'فحص إنشائي - مبنى مكتبي' },
  description: {
    en: 'Comprehensive structural inspection and safety assessment for 15-story office building in downtown Riyadh.',
    ar: 'فحص إنشائي شامل وتقييم السلامة لمبنى مكتبي من 15 طابق في وسط الرياض.'
  },
  category: ServiceCategory.CIVIL,
  location: { en: 'Riyadh, Saudi Arabia', ar: 'الرياض، المملكة العربية السعودية' },
  budget: 5000,
  urgency: 'normal',
  postedAt: '2024-01-15T10:00:00Z',
  expiresAt: '2024-01-22T10:00:00Z',
};

const SAMPLE_MATCHES: JobMatch[] = [
  {
    id: 'match_001',
    engineer: {
      id: 'eng_001',
      name: 'أحمد محمد العتيبي',
      title: { en: 'Senior Civil Engineer', ar: 'مهندس مدني أول' },
      specializations: [ServiceCategory.CIVIL, ServiceCategory.SURVEYING],
      rating: 4.9,
      hourlyRate: 180,
      location: { en: 'Riyadh', ar: 'الرياض' },
      distance: 2.5,
      experience: 8,
      status: EngineerStatus.AVAILABLE,
      isVerified: true,
      isOnline: true,
      responseTime: '< 1 hour',
      completionRate: 98,
      profileImage: 'https://via.placeholder.com/150',
      bio: {
        en: 'Experienced civil engineer specializing in structural inspections and safety assessments.',
        ar: 'مهندس مدني ذو خبرة متخصص في الفحوصات الإنشائية وتقييمات السلامة.'
      },
      availability: {
        today: true,
        thisWeek: true,
        nextWeek: false,
      },
    },
    matchScore: 95,
    estimatedPrice: 4500,
    estimatedDuration: 8,
    proposedStartDate: '2024-01-16T09:00:00Z',
    status: 'viewing',
    viewedAt: '2024-01-15T10:15:00Z',
    isNew: true,
  },
  {
    id: 'match_002',
    engineer: {
      id: 'eng_002',
      name: 'Sarah Johnson',
      title: { en: 'Structural Engineer', ar: 'مهندسة إنشائية' },
      specializations: [ServiceCategory.CIVIL, ServiceCategory.BIM],
      rating: 4.8,
      hourlyRate: 220,
      location: { en: 'Riyadh', ar: 'الرياض' },
      distance: 5.2,
      experience: 6,
      status: EngineerStatus.AVAILABLE,
      isVerified: true,
      isOnline: false,
      responseTime: '2-4 hours',
      completionRate: 95,
      profileImage: 'https://via.placeholder.com/150',
      bio: {
        en: 'Structural engineer with expertise in building inspections and safety compliance.',
        ar: 'مهندسة إنشائية متخصصة في فحوصات المباني وامتثال السلامة.'
      },
      availability: {
        today: false,
        thisWeek: true,
        nextWeek: true,
      },
    },
    matchScore: 88,
    estimatedPrice: 5200,
    estimatedDuration: 10,
    proposedStartDate: '2024-01-17T14:00:00Z',
    status: 'interested',
    viewedAt: '2024-01-15T10:20:00Z',
    respondedAt: '2024-01-15T10:25:00Z',
    message: 'I am very interested in this project. I have extensive experience with similar buildings in Riyadh.',
    isNew: false,
  },
  {
    id: 'match_003',
    engineer: {
      id: 'eng_003',
      name: 'محمد عبدالله الشمري',
      title: { en: 'Civil Engineer', ar: 'مهندس مدني' },
      specializations: [ServiceCategory.CIVIL, ServiceCategory.HSE],
      rating: 4.7,
      hourlyRate: 150,
      location: { en: 'Riyadh', ar: 'الرياض' },
      distance: 8.7,
      experience: 5,
      status: EngineerStatus.BUSY,
      isVerified: true,
      isOnline: true,
      responseTime: '4-6 hours',
      completionRate: 97,
      profileImage: 'https://via.placeholder.com/150',
      bio: {
        en: 'Civil engineer with HSE certification and experience in building safety inspections.',
        ar: 'مهندس مدني مع شهادة الصحة والسلامة وخبرة في فحوصات سلامة المباني.'
      },
      availability: {
        today: false,
        thisWeek: false,
        nextWeek: true,
      },
    },
    matchScore: 82,
    estimatedPrice: 3800,
    estimatedDuration: 6,
    proposedStartDate: '2024-01-20T08:00:00Z',
    status: 'viewing',
    viewedAt: '2024-01-15T10:30:00Z',
    isNew: true,
  },
  {
    id: 'match_004',
    engineer: {
      id: 'eng_004',
      name: 'David Wilson',
      title: { en: 'Senior Structural Engineer', ar: 'مهندس إنشائي أول' },
      specializations: [ServiceCategory.CIVIL, ServiceCategory.BIM],
      rating: 4.9,
      hourlyRate: 250,
      location: { en: 'Riyadh', ar: 'الرياض' },
      distance: 3.1,
      experience: 10,
      status: EngineerStatus.AVAILABLE,
      isVerified: true,
      isOnline: true,
      responseTime: '< 1 hour',
      completionRate: 99,
      profileImage: 'https://via.placeholder.com/150',
      bio: {
        en: 'Senior structural engineer with 10+ years experience in high-rise building inspections.',
        ar: 'مهندس إنشائي أول مع خبرة تزيد عن 10 سنوات في فحوصات المباني الشاهقة.'
      },
      availability: {
        today: true,
        thisWeek: true,
        nextWeek: true,
      },
    },
    matchScore: 92,
    estimatedPrice: 6000,
    estimatedDuration: 12,
    proposedStartDate: '2024-01-16T08:00:00Z',
    status: 'declined',
    viewedAt: '2024-01-15T10:35:00Z',
    respondedAt: '2024-01-15T10:40:00Z',
    message: 'Thank you for considering me, but I am not available for this timeframe.',
    isNew: false,
  },
];

const RealTimeJobMatchingScreen = () => {
  const navigation = useNavigation();
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  
  const [matches, setMatches] = useState<JobMatch[]>(SAMPLE_MATCHES);
  const [selectedMatch, setSelectedMatch] = useState<JobMatch | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pulseAnim] = useState(new Animated.Value(1));
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      // Simulate new matches or status updates
      setMatches(prevMatches => 
        prevMatches.map(match => {
          if (Math.random() > 0.8) {
            return {
              ...match,
              status: match.status === 'viewing' ? 'interested' : match.status,
              respondedAt: match.status === 'viewing' ? new Date().toISOString() : match.respondedAt,
            };
          }
          return match;
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Pulse animation for new matches
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    return () => pulse.stop();
  }, [pulseAnim]);

  const handleMatchAction = (matchId: string, action: 'accept' | 'decline' | 'message') => {
    setMatches(prevMatches =>
      prevMatches.map(match =>
        match.id === matchId
          ? {
              ...match,
              status: action === 'accept' ? 'accepted' : action === 'decline' ? 'declined' : match.status,
              respondedAt: new Date().toISOString(),
            }
          : match
      )
    );

    if (action === 'accept') {
      Alert.alert(
        isArabic ? 'تم القبول!' : 'Accepted!',
        isArabic 
          ? 'تم قبول المهندس للمشروع. سيتم إشعاره قريباً.'
          : 'Engineer accepted for the project. They will be notified soon.',
        [{ text: isArabic ? 'موافق' : 'OK' }]
      );
    }
  };

  const handleContact = (match: JobMatch) => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'viewing': return COLORS.warning;
      case 'interested': return COLORS.primary;
      case 'accepted': return COLORS.success;
      case 'declined': return COLORS.error;
      case 'expired': return COLORS.textSecondary;
      default: return COLORS.textSecondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'viewing': return isArabic ? 'يشاهد' : 'Viewing';
      case 'interested': return isArabic ? 'مهتم' : 'Interested';
      case 'accepted': return isArabic ? 'مقبول' : 'Accepted';
      case 'declined': return isArabic ? 'مرفوض' : 'Declined';
      case 'expired': return isArabic ? 'منتهي الصلاحية' : 'Expired';
      default: return status;
    }
  };

  const renderMatchCard = (match: JobMatch) => (
    <TouchableOpacity
      key={match.id}
      style={[
        styles.matchCard,
        {
          backgroundColor: theme.surface,
          borderColor: match.isNew ? COLORS.primary : theme.border,
          borderWidth: match.isNew ? 2 : 1,
        }
      ]}
      onPress={() => setSelectedMatch(match)}
    >
      {match.isNew && (
        <Animated.View
          style={[
            styles.newBadge,
            {
              backgroundColor: COLORS.primary,
              transform: [{ scale: pulseAnim }],
            }
          ]}
        >
          <Text style={styles.newBadgeText}>
            {isArabic ? 'جديد' : 'NEW'}
          </Text>
        </Animated.View>
      )}

      <View style={styles.matchHeader}>
        <View style={styles.engineerInfo}>
          <View style={styles.profileImageContainer}>
            <View style={[styles.profileImage, { backgroundColor: COLORS.primary }]}>
              <Text style={styles.profileInitial}>
                {match.engineer.name.charAt(0)}
              </Text>
            </View>
            {match.engineer.isOnline && (
              <View style={[styles.onlineIndicator, { backgroundColor: COLORS.success }]} />
            )}
          </View>

          <View style={styles.engineerDetails}>
            <View style={styles.nameContainer}>
              <Text style={[styles.engineerName, { color: theme.text }]} numberOfLines={1}>
                {match.engineer.name}
              </Text>
              {match.engineer.isVerified && (
                <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
              )}
            </View>
            <Text style={[styles.engineerTitle, { color: theme.textSecondary }]} numberOfLines={1}>
              {getText(match.engineer.title)}
            </Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={14} color={COLORS.warning} />
              <Text style={[styles.rating, { color: theme.text }]}>
                {match.engineer.rating}
              </Text>
              <Text style={[styles.distance, { color: theme.textSecondary }]}>
                • {match.engineer.distance} km
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.matchScoreContainer}>
          <Text style={[styles.matchScore, { color: COLORS.primary }]}>
            {match.matchScore}%
          </Text>
          <Text style={[styles.matchLabel, { color: theme.textSecondary }]}>
            {isArabic ? 'تطابق' : 'Match'}
          </Text>
        </View>
      </View>

      <View style={styles.matchDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="cash" size={16} color={theme.textSecondary} />
          <Text style={[styles.detailText, { color: theme.textSecondary }]}>
            {match.estimatedPrice.toLocaleString()} SAR
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="time" size={16} color={theme.textSecondary} />
          <Text style={[styles.detailText, { color: theme.textSecondary }]}>
            {match.estimatedDuration}h
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="calendar" size={16} color={theme.textSecondary} />
          <Text style={[styles.detailText, { color: theme.textSecondary }]}>
            {new Date(match.proposedStartDate).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
          </Text>
        </View>
      </View>

      <View style={styles.statusContainer}>
        <View style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(match.status) + '15' }
        ]}>
          <Text style={[
            styles.statusText,
            { color: getStatusColor(match.status) }
          ]}>
            {getStatusText(match.status)}
          </Text>
        </View>

        {match.message && (
          <Text style={[styles.messageText, { color: theme.textSecondary }]} numberOfLines={2}>
            "{match.message}"
          </Text>
        )}
      </View>

      {match.status === 'viewing' && (
        <View style={styles.actionButtons}>
          <CustomButton
            title={isArabic ? 'تواصل' : 'Contact'}
            onPress={() => handleContact(match)}
            style={[styles.actionButton, { backgroundColor: theme.surface }]}
            textColor={theme.text}
            size="small"
            icon="chatbubble"
          />
          <CustomButton
            title={isArabic ? 'قبول' : 'Accept'}
            onPress={() => handleMatchAction(match.id, 'accept')}
            style={styles.actionButton}
            size="small"
            icon="checkmark"
          />
        </View>
      )}

      {match.status === 'interested' && (
        <View style={styles.actionButtons}>
          <CustomButton
            title={isArabic ? 'تواصل' : 'Contact'}
            onPress={() => handleContact(match)}
            style={[styles.actionButton, { backgroundColor: theme.surface }]}
            textColor={theme.text}
            size="small"
            icon="chatbubble"
          />
          <CustomButton
            title={isArabic ? 'قبول' : 'Accept'}
            onPress={() => handleMatchAction(match.id, 'accept')}
            style={styles.actionButton}
            size="small"
            icon="checkmark"
          />
        </View>
      )}

      {match.status === 'accepted' && (
        <View style={styles.acceptedContainer}>
          <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
          <Text style={[styles.acceptedText, { color: COLORS.success }]}>
            {isArabic ? 'تم قبول المهندس' : 'Engineer Accepted'}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderJobSummary = () => (
    <View style={[styles.jobSummary, { backgroundColor: theme.surface }]}>
      <Text style={[styles.jobTitle, { color: theme.text }]}>
        {getText(SAMPLE_JOB.title)}
      </Text>
      <Text style={[styles.jobDescription, { color: theme.textSecondary }]} numberOfLines={2}>
        {getText(SAMPLE_JOB.description)}
      </Text>
      <View style={styles.jobDetails}>
        <View style={styles.jobDetail}>
          <Ionicons name="location" size={16} color={theme.textSecondary} />
          <Text style={[styles.jobDetailText, { color: theme.textSecondary }]}>
            {getText(SAMPLE_JOB.location)}
          </Text>
        </View>
        <View style={styles.jobDetail}>
          <Ionicons name="cash" size={16} color={theme.textSecondary} />
          <Text style={[styles.jobDetailText, { color: theme.textSecondary }]}>
            {SAMPLE_JOB.budget.toLocaleString()} SAR
          </Text>
        </View>
        <View style={styles.jobDetail}>
          <Ionicons name="time" size={16} color={theme.textSecondary} />
          <Text style={[styles.jobDetailText, { color: theme.textSecondary }]}>
            {isArabic ? 'ينتهي في' : 'Expires'} {new Date(SAMPLE_JOB.expiresAt).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
          </Text>
        </View>
      </View>
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
              {isArabic ? 'المطابقة المباشرة' : 'Live Matching'}
            </Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              {isArabic ? 'شاهد المهندسين المؤهلين في الوقت الفعلي' : 'Watch qualified engineers in real-time'}
            </Text>
          </View>

          <TouchableOpacity style={styles.refreshButton}>
            <Ionicons name="refresh" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>

        {/* Job Summary */}
        {renderJobSummary()}

        {/* Live Status */}
        <View style={styles.liveStatusContainer}>
          <View style={styles.liveIndicator}>
            <View style={[styles.liveDot, { backgroundColor: COLORS.success }]} />
            <Text style={[styles.liveText, { color: COLORS.success }]}>
              {isArabic ? 'مباشر' : 'LIVE'}
            </Text>
          </View>
          <Text style={[styles.liveDescription, { color: theme.textSecondary }]}>
            {isArabic 
              ? `${matches.length} مهندس مؤهل يشاهد الوظيفة الآن`
              : `${matches.length} qualified engineers viewing this job now`
            }
          </Text>
        </View>

        {/* Matches List */}
        <View style={styles.matchesContainer}>
          <Text style={[styles.matchesTitle, { color: theme.text }]}>
            {isArabic ? 'المهندسين المطابقين' : 'Matching Engineers'}
          </Text>
          
          {matches.map(renderMatchCard)}
        </View>

        {/* Summary Stats */}
        <View style={[styles.statsContainer, { backgroundColor: theme.surface }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: COLORS.primary }]}>
              {matches.filter(m => m.status === 'viewing').length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              {isArabic ? 'يشاهدون' : 'Viewing'}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: COLORS.warning }]}>
              {matches.filter(m => m.status === 'interested').length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              {isArabic ? 'مهتمون' : 'Interested'}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: COLORS.success }]}>
              {matches.filter(m => m.status === 'accepted').length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              {isArabic ? 'مقبولون' : 'Accepted'}
            </Text>
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
  refreshButton: {
    padding: SPACING.sm,
  },
  jobSummary: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.xl,
  },
  jobTitle: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.sm,
  },
  jobDescription: {
    fontSize: TYPOGRAPHY.sizes.body1,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  jobDetails: {
    gap: SPACING.sm,
  },
  jobDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobDetailText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: SPACING.sm,
  },
  liveStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: SPACING.xs,
  },
  liveText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  liveDescription: {
    fontSize: TYPOGRAPHY.sizes.body2,
    flex: 1,
  },
  matchesContainer: {
    marginBottom: SPACING.xl,
  },
  matchesTitle: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.lg,
  },
  matchCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    position: 'relative',
  },
  newBadge: {
    position: 'absolute',
    top: -8,
    right: 16,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
    zIndex: 1,
  },
  newBadgeText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  engineerInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  profileImageContainer: {
    position: 'relative',
    marginRight: SPACING.md,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.sizes.h4,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  engineerDetails: {
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
  engineerTitle: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginBottom: SPACING.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: SPACING.xs,
  },
  distance: {
    fontSize: TYPOGRAPHY.sizes.caption,
    marginLeft: SPACING.xs,
  },
  matchScoreContainer: {
    alignItems: 'center',
  },
  matchScore: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  matchLabel: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  matchDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: SPACING.xs,
  },
  statusContainer: {
    marginBottom: SPACING.md,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: SPACING.xs,
  },
  statusText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  messageText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontStyle: 'italic',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  actionButton: {
    flex: 1,
  },
  acceptedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
  },
  acceptedText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginLeft: SPACING.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: TYPOGRAPHY.sizes.h2,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.sizes.caption,
    marginTop: SPACING.xs,
  },
});

export default RealTimeJobMatchingScreen;

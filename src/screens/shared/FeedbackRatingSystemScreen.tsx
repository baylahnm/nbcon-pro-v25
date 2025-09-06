import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert,
  Modal,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { RootState } from '../../store';
import { Language, UserRole } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

const { width } = Dimensions.get('window');

interface Rating {
  id: string;
  jobId: string;
  jobTitle: { en: string; ar: string };
  fromUser: {
    id: string;
    name: { en: string; ar: string };
    role: UserRole;
    avatar?: string;
  };
  toUser: {
    id: string;
    name: { en: string; ar: string };
    role: UserRole;
    avatar?: string;
  };
  overallRating: number; // 1-5 stars
  categoryRatings: {
    quality: number;
    communication: number;
    timeliness: number;
    professionalism: number;
  };
  comment: string;
  isAnonymous: boolean;
  createdAt: string;
  isVerified: boolean;
  helpfulCount: number;
  response?: {
    comment: string;
    createdAt: string;
  };
  tags: string[];
}

interface FeedbackRatingSystemScreenProps {
  route?: {
    params: {
      jobId?: string;
      userId?: string;
      mode?: 'give' | 'view' | 'manage';
    };
  };
}

const FeedbackRatingSystemScreen: React.FC<FeedbackRatingSystemScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const { language, isDarkMode, user } = useSelector((state: RootState) => state.app);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [selectedTab, setSelectedTab] = useState<'give' | 'received' | 'given'>('give');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [newRating, setNewRating] = useState({
    overallRating: 0,
    categoryRatings: {
      quality: 0,
      communication: 0,
      timeliness: 0,
      professionalism: 0,
    },
    comment: '',
    isAnonymous: false,
  });
  const [filterBy, setFilterBy] = useState<'all' | '5' | '4' | '3' | '2' | '1'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'rating' | 'helpful'>('recent');

  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockRatings: Rating[] = [
      {
        id: 'rating_1',
        jobId: 'job_123',
        jobTitle: { en: 'MEP Design for Office Building', ar: 'تصميم MEP للمبنى المكتبي' },
        fromUser: {
          id: 'client_1',
          name: { en: 'Ahmed Al-Rajhi', ar: 'أحمد الراجحي' },
          role: UserRole.CLIENT,
        },
        toUser: {
          id: 'eng_1',
          name: { en: 'Sara Al-Mansouri', ar: 'سارة المنصوري' },
          role: UserRole.ENGINEER,
        },
        overallRating: 5,
        categoryRatings: {
          quality: 5,
          communication: 5,
          timeliness: 4,
          professionalism: 5,
        },
        comment: 'Excellent work! Sara delivered high-quality MEP designs on time and was very professional throughout the project.',
        isAnonymous: false,
        createdAt: '2024-02-15T10:30:00Z',
        isVerified: true,
        helpfulCount: 3,
        response: {
          comment: 'Thank you for the kind words! It was a pleasure working with you.',
          createdAt: '2024-02-15T11:00:00Z',
        },
        tags: ['MEP', 'Design', 'Professional'],
      },
      {
        id: 'rating_2',
        jobId: 'job_124',
        jobTitle: { en: 'HVAC System Inspection', ar: 'فحص نظام HVAC' },
        fromUser: {
          id: 'eng_2',
          name: { en: 'Mohammed Al-Shehri', ar: 'محمد الشهري' },
          role: UserRole.ENGINEER,
        },
        toUser: {
          id: 'client_2',
          name: { en: 'Fatima Al-Zahra', ar: 'فاطمة الزهراء' },
          role: UserRole.CLIENT,
        },
        overallRating: 4,
        categoryRatings: {
          quality: 4,
          communication: 5,
          timeliness: 4,
          professionalism: 4,
        },
        comment: 'Good client to work with. Clear requirements and timely payments.',
        isAnonymous: false,
        createdAt: '2024-02-14T16:45:00Z',
        isVerified: true,
        helpfulCount: 1,
        tags: ['HVAC', 'Inspection', 'Client'],
      },
      {
        id: 'rating_3',
        jobId: 'job_125',
        jobTitle: { en: 'Structural Analysis', ar: 'التحليل الإنشائي' },
        fromUser: {
          id: 'client_3',
          name: { en: 'Anonymous', ar: 'مجهول' },
          role: UserRole.CLIENT,
        },
        toUser: {
          id: 'eng_3',
          name: { en: 'Omar Al-Rashid', ar: 'عمر الراشد' },
          role: UserRole.ENGINEER,
        },
        overallRating: 3,
        categoryRatings: {
          quality: 3,
          communication: 2,
          timeliness: 3,
          professionalism: 3,
        },
        comment: 'Work was completed but communication could have been better.',
        isAnonymous: true,
        createdAt: '2024-02-13T14:20:00Z',
        isVerified: false,
        helpfulCount: 0,
        tags: ['Structural', 'Analysis'],
      },
    ];
    setRatings(mockRatings);
  }, []);

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US');
  };

  const renderStars = (rating: number, size: number = 20, onPress?: (rating: number) => void) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => onPress?.(star)}
            disabled={!onPress}
          >
            <Ionicons
              name={star <= rating ? 'star' : 'star-outline'}
              size={size}
              color={star <= rating ? COLORS.warning : COLORS.textSecondary}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const getAverageRating = (ratings: Rating[]) => {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + rating.overallRating, 0);
    return sum / ratings.length;
  };

  const getRatingDistribution = (ratings: Rating[]) => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    ratings.forEach(rating => {
      distribution[rating.overallRating as keyof typeof distribution]++;
    });
    return distribution;
  };

  const filteredRatings = ratings.filter(rating => {
    const matchesFilter = filterBy === 'all' || rating.overallRating.toString() === filterBy;
    
    switch (selectedTab) {
      case 'give':
        return false; // No ratings to show in give mode
      case 'received':
        return matchesFilter && rating.toUser.id === user?.id;
      case 'given':
        return matchesFilter && rating.fromUser.id === user?.id;
      default:
        return matchesFilter;
    }
  }).sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'rating':
        return b.overallRating - a.overallRating;
      case 'helpful':
        return b.helpfulCount - a.helpfulCount;
      default:
        return 0;
    }
  });

  const handleGiveRating = (job: any) => {
    setSelectedJob(job);
    setNewRating({
      overallRating: 0,
      categoryRatings: {
        quality: 0,
        communication: 0,
        timeliness: 0,
        professionalism: 0,
      },
      comment: '',
      isAnonymous: false,
    });
    setShowRatingModal(true);
  };

  const handleSubmitRating = () => {
    if (newRating.overallRating === 0) {
      Alert.alert(
        isArabic ? 'خطأ' : 'Error',
        isArabic ? 'يرجى إعطاء تقييم عام' : 'Please provide an overall rating'
      );
      return;
    }

    const rating: Rating = {
      id: `rating_${Date.now()}`,
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      fromUser: {
        id: user?.id || 'current_user',
        name: user?.name || { en: 'You', ar: 'أنت' },
        role: user?.role || UserRole.CLIENT,
      },
      toUser: selectedJob.engineer,
      overallRating: newRating.overallRating,
      categoryRatings: newRating.categoryRatings,
      comment: newRating.comment,
      isAnonymous: newRating.isAnonymous,
      createdAt: new Date().toISOString(),
      isVerified: false,
      helpfulCount: 0,
      tags: [],
    };

    setRatings(prev => [rating, ...prev]);
    setShowRatingModal(false);
    
    Alert.alert(
      isArabic ? 'تم الإرسال' : 'Submitted',
      isArabic ? 'تم إرسال التقييم بنجاح' : 'Rating submitted successfully'
    );
  };

  const handleHelpful = (ratingId: string) => {
    setRatings(prev => 
      prev.map(rating => 
        rating.id === ratingId 
          ? { ...rating, helpfulCount: rating.helpfulCount + 1 }
          : rating
      )
    );
  };

  const renderRatingCard = ({ item }: { item: Rating }) => (
    <View style={[styles.ratingCard, { backgroundColor: theme.card }]}>
      <View style={styles.ratingHeader}>
        <View style={styles.ratingUser}>
          <View style={[styles.userAvatar, { backgroundColor: COLORS.primary }]}>
            <Text style={styles.userInitial}>
              {getText(item.fromUser.name).charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: theme.text }]}>
              {item.isAnonymous ? (isArabic ? 'مجهول' : 'Anonymous') : getText(item.fromUser.name)}
            </Text>
            <Text style={[styles.userRole, { color: theme.textSecondary }]}>
              {item.fromUser.role === UserRole.ENGINEER 
                ? (isArabic ? 'مهندس' : 'Engineer')
                : (isArabic ? 'عميل' : 'Client')
              }
            </Text>
          </View>
        </View>
        <View style={styles.ratingMeta}>
          {renderStars(item.overallRating)}
          <Text style={[styles.ratingDate, { color: theme.textSecondary }]}>
            {formatDate(item.createdAt)}
          </Text>
        </View>
      </View>

      <Text style={[styles.jobTitle, { color: theme.text }]}>
        {getText(item.jobTitle)}
      </Text>

      <View style={styles.categoryRatings}>
        <View style={styles.categoryRating}>
          <Text style={[styles.categoryLabel, { color: theme.textSecondary }]}>
            {isArabic ? 'الجودة' : 'Quality'}
          </Text>
          {renderStars(item.categoryRatings.quality, 16)}
        </View>
        <View style={styles.categoryRating}>
          <Text style={[styles.categoryLabel, { color: theme.textSecondary }]}>
            {isArabic ? 'التواصل' : 'Communication'}
          </Text>
          {renderStars(item.categoryRatings.communication, 16)}
        </View>
        <View style={styles.categoryRating}>
          <Text style={[styles.categoryLabel, { color: theme.textSecondary }]}>
            {isArabic ? 'الوقت' : 'Timeliness'}
          </Text>
          {renderStars(item.categoryRatings.timeliness, 16)}
        </View>
        <View style={styles.categoryRating}>
          <Text style={[styles.categoryLabel, { color: theme.textSecondary }]}>
            {isArabic ? 'المهنية' : 'Professionalism'}
          </Text>
          {renderStars(item.categoryRatings.professionalism, 16)}
        </View>
      </View>

      {item.comment && (
        <Text style={[styles.ratingComment, { color: theme.text }]}>
          {item.comment}
        </Text>
      )}

      {item.response && (
        <View style={[styles.responseContainer, { backgroundColor: theme.surface }]}>
          <Text style={[styles.responseLabel, { color: theme.textSecondary }]}>
            {isArabic ? 'رد المهندس:' : 'Engineer Response:'}
          </Text>
          <Text style={[styles.responseText, { color: theme.text }]}>
            {item.response.comment}
          </Text>
        </View>
      )}

      <View style={styles.ratingFooter}>
        <TouchableOpacity 
          style={styles.helpfulButton}
          onPress={() => handleHelpful(item.id)}
        >
          <Ionicons name="thumbs-up-outline" size={16} color={theme.textSecondary} />
          <Text style={[styles.helpfulText, { color: theme.textSecondary }]}>
            {isArabic ? 'مفيد' : 'Helpful'} ({item.helpfulCount})
          </Text>
        </TouchableOpacity>
        {item.isVerified && (
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
            <Text style={[styles.verifiedText, { color: COLORS.success }]}>
              {isArabic ? 'متحقق' : 'Verified'}
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderStatsCard = () => {
    const receivedRatings = ratings.filter(r => r.toUser.id === user?.id);
    const averageRating = getAverageRating(receivedRatings);
    const distribution = getRatingDistribution(receivedRatings);
    const totalRatings = receivedRatings.length;

    return (
      <View style={[styles.statsCard, { backgroundColor: theme.card }]}>
        <Text style={[styles.statsTitle, { color: theme.text }]}>
          {isArabic ? 'إحصائيات التقييم' : 'Rating Statistics'}
        </Text>
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.text }]}>
              {averageRating.toFixed(1)}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              {isArabic ? 'متوسط التقييم' : 'Average Rating'}
            </Text>
            {renderStars(Math.round(averageRating), 16)}
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.text }]}>
              {totalRatings}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              {isArabic ? 'إجمالي التقييمات' : 'Total Ratings'}
            </Text>
          </View>
        </View>

        <View style={styles.distributionContainer}>
          {[5, 4, 3, 2, 1].map((star) => (
            <View key={star} style={styles.distributionRow}>
              <Text style={[styles.distributionLabel, { color: theme.textSecondary }]}>
                {star} {isArabic ? 'نجمة' : 'star'}
              </Text>
              <View style={[styles.distributionBar, { backgroundColor: theme.surface }]}>
                <View 
                  style={[
                    styles.distributionFill,
                    { 
                      backgroundColor: COLORS.warning,
                      width: totalRatings > 0 ? `${(distribution[star as keyof typeof distribution] / totalRatings) * 100}%` : '0%'
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.distributionCount, { color: theme.textSecondary }]}>
                {distribution[star as keyof typeof distribution]}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
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
              {isArabic ? 'نظام التقييم والمراجعة' : 'Rating & Review System'}
            </Text>
            <Text style={styles.headerSubtitle}>
              {isArabic ? 'شارك تجربتك وساعد الآخرين' : 'Share your experience and help others'}
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Tabs */}
      <View style={[styles.tabsContainer, { backgroundColor: theme.surface }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tabsContent}>
            {[
              { key: 'give', label: { en: 'Give Rating', ar: 'إعطاء تقييم' }, icon: 'star-outline' },
              { key: 'received', label: { en: 'Received', ar: 'المستلمة' }, icon: 'star' },
              { key: 'given', label: { en: 'Given', ar: 'المعطاة' }, icon: 'star-half' },
            ].map((tab) => (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.tab,
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
        </ScrollView>
      </View>

      {/* Stats Card */}
      {selectedTab === 'received' && renderStatsCard()}

      {/* Filters */}
      <View style={[styles.filtersContainer, { backgroundColor: theme.surface }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filtersContent}>
            {[
              { key: 'all', label: { en: 'All', ar: 'الكل' } },
              { key: '5', label: { en: '5 Stars', ar: '5 نجوم' } },
              { key: '4', label: { en: '4 Stars', ar: '4 نجوم' } },
              { key: '3', label: { en: '3 Stars', ar: '3 نجوم' } },
              { key: '2', label: { en: '2 Stars', ar: '2 نجوم' } },
              { key: '1', label: { en: '1 Star', ar: 'نجمة واحدة' } },
            ].map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterChip,
                  filterBy === filter.key && { backgroundColor: COLORS.primary }
                ]}
                onPress={() => setFilterBy(filter.key as any)}
              >
                <Text style={[
                  styles.filterChipText,
                  { color: filterBy === filter.key ? COLORS.white : theme.textSecondary }
                ]}>
                  {getText(filter.label)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Content */}
      {selectedTab === 'give' ? (
        <View style={styles.giveRatingContainer}>
          <Ionicons name="star-outline" size={64} color={theme.textSecondary} />
          <Text style={[styles.giveRatingTitle, { color: theme.text }]}>
            {isArabic ? 'لا توجد وظائف للتقييم' : 'No jobs to rate'}
          </Text>
          <Text style={[styles.giveRatingDescription, { color: theme.textSecondary }]}>
            {isArabic 
              ? 'ستظهر الوظائف المكتملة هنا للتقييم'
              : 'Completed jobs will appear here for rating'
            }
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredRatings}
          renderItem={renderRatingCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.ratingsList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="star-outline" size={64} color={theme.textSecondary} />
              <Text style={[styles.emptyTitle, { color: theme.text }]}>
                {isArabic ? 'لا توجد تقييمات' : 'No ratings found'}
              </Text>
              <Text style={[styles.emptyDescription, { color: theme.textSecondary }]}>
                {isArabic 
                  ? 'ستظهر التقييمات هنا عند توفرها'
                  : 'Ratings will appear here when available'
                }
              </Text>
            </View>
          }
        />
      )}

      {/* Rating Modal */}
      <Modal
        visible={showRatingModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowRatingModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.ratingModalContent, { backgroundColor: theme.card }]}>
            <View style={styles.ratingModalHeader}>
              <Text style={[styles.ratingModalTitle, { color: theme.text }]}>
                {isArabic ? 'إعطاء تقييم' : 'Give Rating'}
              </Text>
              <TouchableOpacity onPress={() => setShowRatingModal(false)}>
                <Ionicons name="close" size={24} color={theme.textSecondary} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.ratingModalBody}>
              <Text style={[styles.jobTitle, { color: theme.text }]}>
                {selectedJob ? getText(selectedJob.title) : ''}
              </Text>

              <View style={styles.ratingSection}>
                <Text style={[styles.ratingSectionTitle, { color: theme.text }]}>
                  {isArabic ? 'التقييم العام' : 'Overall Rating'}
                </Text>
                {renderStars(newRating.overallRating, 32, (rating) => 
                  setNewRating(prev => ({ ...prev, overallRating: rating }))
                )}
              </View>

              <View style={styles.ratingSection}>
                <Text style={[styles.ratingSectionTitle, { color: theme.text }]}>
                  {isArabic ? 'التقييمات التفصيلية' : 'Detailed Ratings'}
                </Text>
                {[
                  { key: 'quality', label: { en: 'Quality', ar: 'الجودة' } },
                  { key: 'communication', label: { en: 'Communication', ar: 'التواصل' } },
                  { key: 'timeliness', label: { en: 'Timeliness', ar: 'الوقت' } },
                  { key: 'professionalism', label: { en: 'Professionalism', ar: 'المهنية' } },
                ].map((category) => (
                  <View key={category.key} style={styles.categoryRatingRow}>
                    <Text style={[styles.categoryLabel, { color: theme.textSecondary }]}>
                      {getText(category.label)}
                    </Text>
                    {renderStars(
                      newRating.categoryRatings[category.key as keyof typeof newRating.categoryRatings], 
                      24, 
                      (rating) => setNewRating(prev => ({
                        ...prev,
                        categoryRatings: {
                          ...prev.categoryRatings,
                          [category.key]: rating
                        }
                      }))
                    )}
                  </View>
                ))}
              </View>

              <View style={styles.ratingSection}>
                <Text style={[styles.ratingSectionTitle, { color: theme.text }]}>
                  {isArabic ? 'تعليق (اختياري)' : 'Comment (Optional)'}
                </Text>
                <TextInput
                  style={[styles.commentInput, { 
                    backgroundColor: theme.surface,
                    color: theme.text,
                    borderColor: theme.border 
                  }]}
                  value={newRating.comment}
                  onChangeText={(text) => setNewRating(prev => ({ ...prev, comment: text }))}
                  placeholder={isArabic ? 'شارك تجربتك...' : 'Share your experience...'}
                  placeholderTextColor={theme.textSecondary}
                  multiline
                  numberOfLines={4}
                />
              </View>

              <TouchableOpacity
                style={styles.anonymousToggle}
                onPress={() => setNewRating(prev => ({ ...prev, isAnonymous: !prev.isAnonymous }))}
              >
                <Ionicons 
                  name={newRating.isAnonymous ? 'checkmark-circle' : 'ellipse-outline'} 
                  size={24} 
                  color={newRating.isAnonymous ? COLORS.primary : theme.textSecondary} 
                />
                <Text style={[styles.anonymousText, { color: theme.text }]}>
                  {isArabic ? 'تقييم مجهول' : 'Anonymous rating'}
                </Text>
              </TouchableOpacity>
            </ScrollView>

            <View style={styles.modalActions}>
              <CustomButton
                title={isArabic ? 'إلغاء' : 'Cancel'}
                onPress={() => setShowRatingModal(false)}
                variant="outline"
                style={styles.modalButton}
              />
              <CustomButton
                title={isArabic ? 'إرسال' : 'Submit'}
                onPress={handleSubmitRating}
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
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
  tabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tabsContent: {
    flexDirection: 'row',
    padding: 20,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: BORDER_RADIUS.sm,
    marginRight: 8,
  },
  tabText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginLeft: 8,
  },
  statsCard: {
    margin: 20,
    padding: 20,
    borderRadius: BORDER_RADIUS.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsTitle: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: TYPOGRAPHY.sizes.h4,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginBottom: 8,
  },
  distributionContainer: {
    marginTop: 8,
  },
  distributionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  distributionLabel: {
    fontSize: TYPOGRAPHY.sizes.body2,
    width: 60,
  },
  distributionBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  distributionFill: {
    height: '100%',
    borderRadius: 4,
  },
  distributionCount: {
    fontSize: TYPOGRAPHY.sizes.body2,
    width: 30,
    textAlign: 'right',
  },
  filtersContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filtersContent: {
    flexDirection: 'row',
    padding: 20,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 8,
  },
  filterChipText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  giveRatingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  giveRatingTitle: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginTop: 16,
    marginBottom: 8,
  },
  giveRatingDescription: {
    fontSize: TYPOGRAPHY.sizes.body2,
    textAlign: 'center',
    lineHeight: 20,
  },
  ratingsList: {
    padding: 20,
  },
  ratingCard: {
    borderRadius: BORDER_RADIUS.md,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ratingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  ratingUser: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userInitial: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.white,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: 2,
  },
  userRole: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  ratingMeta: {
    alignItems: 'flex-end',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  ratingDate: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  jobTitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: 12,
  },
  categoryRatings: {
    marginBottom: 12,
  },
  categoryRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: TYPOGRAPHY.sizes.body2,
    flex: 1,
  },
  ratingComment: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 20,
    marginBottom: 12,
  },
  responseContainer: {
    padding: 12,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: 12,
  },
  responseLabel: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: 4,
  },
  responseText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 18,
  },
  ratingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpfulText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: 4,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: 4,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  ratingModalContent: {
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
    borderRadius: BORDER_RADIUS.md,
  },
  ratingModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  ratingModalTitle: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  ratingModalBody: {
    padding: 20,
  },
  ratingSection: {
    marginBottom: 24,
  },
  ratingSectionTitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: 12,
  },
  categoryRatingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  commentInput: {
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: TYPOGRAPHY.sizes.body1,
    textAlignVertical: 'top',
    minHeight: 80,
  },
  anonymousToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  anonymousText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: 8,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    padding: 20,
  },
  modalButton: {
    paddingHorizontal: 24,
  },
});

export default FeedbackRatingSystemScreen;

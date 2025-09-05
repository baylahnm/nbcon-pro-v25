import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
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

interface Quote {
  id: string;
  engineerId: string;
  engineerName: string;
  engineerTitle: { en: string; ar: string };
  engineerRating: number;
  engineerImage: string;
  price: number;
  timeline: number; // in days
  startDate: string;
  deliverables: string[];
  warranty: number; // in months
  paymentTerms: string;
  specialNotes: { en: string; ar: string };
  isRecommended: boolean;
  isVerified: boolean;
  responseTime: string;
  experience: number;
  completionRate: number;
}

const SAMPLE_QUOTES: Quote[] = [
  {
    id: 'quote_001',
    engineerId: 'eng_001',
    engineerName: 'أحمد محمد العتيبي',
    engineerTitle: { en: 'Senior Civil Engineer', ar: 'مهندس مدني أول' },
    engineerRating: 4.9,
    engineerImage: 'https://via.placeholder.com/150',
    price: 4500,
    timeline: 5,
    startDate: '2024-01-16',
    deliverables: ['Structural Report', 'Safety Assessment', 'Recommendations'],
    warranty: 12,
    paymentTerms: '50% upfront, 50% on completion',
    specialNotes: {
      en: 'Includes 3D modeling and detailed analysis',
      ar: 'يشمل النمذجة ثلاثية الأبعاد والتحليل المفصل'
    },
    isRecommended: true,
    isVerified: true,
    responseTime: '< 1 hour',
    experience: 8,
    completionRate: 98,
  },
  {
    id: 'quote_002',
    engineerId: 'eng_002',
    engineerName: 'Sarah Johnson',
    engineerTitle: { en: 'Structural Engineer', ar: 'مهندسة إنشائية' },
    engineerRating: 4.8,
    engineerImage: 'https://via.placeholder.com/150',
    price: 5200,
    timeline: 7,
    startDate: '2024-01-17',
    deliverables: ['Detailed Report', 'CAD Drawings', 'Compliance Check'],
    warranty: 6,
    paymentTerms: '30% upfront, 70% on completion',
    specialNotes: {
      en: 'Specialized in high-rise buildings',
      ar: 'متخصصة في المباني الشاهقة'
    },
    isRecommended: false,
    isVerified: true,
    responseTime: '2-4 hours',
    experience: 6,
    completionRate: 95,
  },
  {
    id: 'quote_003',
    engineerId: 'eng_003',
    engineerName: 'محمد عبدالله الشمري',
    engineerTitle: { en: 'Civil Engineer', ar: 'مهندس مدني' },
    engineerRating: 4.7,
    engineerImage: 'https://via.placeholder.com/150',
    price: 3800,
    timeline: 4,
    startDate: '2024-01-20',
    deliverables: ['Basic Report', 'Safety Checklist'],
    warranty: 3,
    paymentTerms: 'Full payment on completion',
    specialNotes: {
      en: 'Budget-friendly option with quick delivery',
      ar: 'خيار اقتصادي مع تسليم سريع'
    },
    isRecommended: false,
    isVerified: true,
    responseTime: '4-6 hours',
    experience: 5,
    completionRate: 97,
  },
];

const QuoteComparisonMatrixScreen = () => {
  const navigation = useNavigation();
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  
  const [quotes, setQuotes] = useState<Quote[]>(SAMPLE_QUOTES);
  const [selectedQuotes, setSelectedQuotes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'price' | 'timeline' | 'rating' | 'recommended'>('recommended');
  const [isLoading, setIsLoading] = useState(false);
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const sortedQuotes = [...quotes].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'timeline':
        return a.timeline - b.timeline;
      case 'rating':
        return b.engineerRating - a.engineerRating;
      case 'recommended':
        return b.isRecommended ? 1 : -1;
      default:
        return 0;
    }
  });

  const handleQuoteSelect = (quoteId: string) => {
    setSelectedQuotes(prev => 
      prev.includes(quoteId) 
        ? prev.filter(id => id !== quoteId)
        : [...prev, quoteId]
    );
  };

  const handleAcceptQuote = (quote: Quote) => {
    Alert.alert(
      isArabic ? 'قبول العرض' : 'Accept Quote',
      isArabic 
        ? `هل تريد قبول عرض ${quote.engineerName}؟`
        : `Do you want to accept ${quote.engineerName}'s quote?`,
      [
        { text: isArabic ? 'إلغاء' : 'Cancel', style: 'cancel' },
        {
          text: isArabic ? 'قبول' : 'Accept',
          onPress: () => {
            setIsLoading(true);
            // Simulate API call
            setTimeout(() => {
              setIsLoading(false);
              Alert.alert(
                isArabic ? 'تم القبول!' : 'Accepted!',
                isArabic 
                  ? 'تم قبول العرض بنجاح'
                  : 'Quote accepted successfully',
                [{ text: isArabic ? 'موافق' : 'OK' }]
              );
            }, 2000);
          }
        }
      ]
    );
  };

  const handleContactEngineer = (quote: Quote) => {
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Ionicons
        key={index}
        name={index < Math.floor(rating) ? 'star' : 'star-outline'}
        size={14}
        color={COLORS.warning}
      />
    ));
  };

  const renderQuoteCard = (quote: Quote) => (
    <View
      key={quote.id}
      style={[
        styles.quoteCard,
        {
          backgroundColor: theme.surface,
          borderColor: selectedQuotes.includes(quote.id) ? COLORS.primary : theme.border,
          borderWidth: selectedQuotes.includes(quote.id) ? 2 : 1,
        }
      ]}
    >
      {quote.isRecommended && (
        <View style={[styles.recommendedBadge, { backgroundColor: COLORS.accent }]}>
          <Ionicons name="star" size={12} color={COLORS.white} />
          <Text style={styles.recommendedText}>
            {isArabic ? 'موصى به' : 'RECOMMENDED'}
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.quoteHeader}
        onPress={() => handleQuoteSelect(quote.id)}
      >
        <View style={styles.engineerInfo}>
          <View style={[styles.profileImage, { backgroundColor: COLORS.primary }]}>
            <Text style={styles.profileInitial}>
              {quote.engineerName.charAt(0)}
            </Text>
          </View>
          <View style={styles.engineerDetails}>
            <View style={styles.nameContainer}>
              <Text style={[styles.engineerName, { color: theme.text }]} numberOfLines={1}>
                {quote.engineerName}
              </Text>
              {quote.isVerified && (
                <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
              )}
            </View>
            <Text style={[styles.engineerTitle, { color: theme.textSecondary }]} numberOfLines={1}>
              {getText(quote.engineerTitle)}
            </Text>
            <View style={styles.ratingContainer}>
              {renderStars(quote.engineerRating)}
              <Text style={[styles.rating, { color: theme.text }]}>
                {quote.engineerRating}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.selectionIndicator}>
          <Ionicons
            name={selectedQuotes.includes(quote.id) ? 'checkmark-circle' : 'ellipse-outline'}
            size={24}
            color={selectedQuotes.includes(quote.id) ? COLORS.primary : theme.textSecondary}
          />
        </View>
      </TouchableOpacity>

      <View style={styles.quoteDetails}>
        <View style={styles.priceContainer}>
          <Text style={[styles.price, { color: COLORS.primary }]}>
            {quote.price.toLocaleString()} SAR
          </Text>
          <Text style={[styles.priceLabel, { color: theme.textSecondary }]}>
            {isArabic ? 'السعر' : 'Price'}
          </Text>
        </View>

        <View style={styles.timelineContainer}>
          <Ionicons name="time" size={16} color={theme.textSecondary} />
          <Text style={[styles.timeline, { color: theme.text }]}>
            {quote.timeline} {isArabic ? 'أيام' : 'days'}
          </Text>
        </View>

        <View style={styles.startDateContainer}>
          <Ionicons name="calendar" size={16} color={theme.textSecondary} />
          <Text style={[styles.startDate, { color: theme.text }]}>
            {new Date(quote.startDate).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
          </Text>
        </View>
      </View>

      <View style={styles.deliverablesContainer}>
        <Text style={[styles.deliverablesTitle, { color: theme.text }]}>
          {isArabic ? 'المخرجات:' : 'Deliverables:'}
        </Text>
        {quote.deliverables.map((deliverable, index) => (
          <View key={index} style={styles.deliverableItem}>
            <Ionicons name="checkmark" size={14} color={COLORS.success} />
            <Text style={[styles.deliverableText, { color: theme.textSecondary }]}>
              {deliverable}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.additionalInfo}>
        <View style={styles.infoRow}>
          <Ionicons name="shield" size={14} color={theme.textSecondary} />
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            {isArabic ? 'ضمان' : 'Warranty'}: {quote.warranty} {isArabic ? 'شهر' : 'months'}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="card" size={14} color={theme.textSecondary} />
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            {quote.paymentTerms}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="flash" size={14} color={theme.textSecondary} />
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            {isArabic ? 'وقت الاستجابة' : 'Response'}: {quote.responseTime}
          </Text>
        </View>
      </View>

      {quote.specialNotes && (
        <View style={[styles.specialNotes, { backgroundColor: COLORS.primary + '10' }]}>
          <Ionicons name="information-circle" size={16} color={COLORS.primary} />
          <Text style={[styles.specialNotesText, { color: theme.text }]}>
            {getText(quote.specialNotes)}
          </Text>
        </View>
      )}

      <View style={styles.actionButtons}>
        <CustomButton
          title={isArabic ? 'تواصل' : 'Contact'}
          onPress={() => handleContactEngineer(quote)}
          style={[styles.actionButton, { backgroundColor: theme.surface }]}
          textColor={theme.text}
          size="small"
          icon="chatbubble"
        />
        <CustomButton
          title={isArabic ? 'قبول' : 'Accept'}
          onPress={() => handleAcceptQuote(quote)}
          loading={isLoading}
          style={styles.actionButton}
          size="small"
          icon="checkmark"
        />
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
              {isArabic ? 'مقارنة العروض' : 'Compare Quotes'}
            </Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              {isArabic ? 'قارن العروض واختر الأفضل' : 'Compare quotes and choose the best'}
            </Text>
          </View>
        </View>

        {/* Sort Options */}
        <View style={styles.sortContainer}>
          <Text style={[styles.sortLabel, { color: theme.text }]}>
            {isArabic ? 'ترتيب حسب:' : 'Sort by:'}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sortOptions}>
            {[
              { key: 'recommended', label: { en: 'Recommended', ar: 'موصى به' } },
              { key: 'price', label: { en: 'Price', ar: 'السعر' } },
              { key: 'timeline', label: { en: 'Timeline', ar: 'الجدول الزمني' } },
              { key: 'rating', label: { en: 'Rating', ar: 'التقييم' } },
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

        {/* Selected Quotes Counter */}
        {selectedQuotes.length > 0 && (
          <View style={[styles.selectedCounter, { backgroundColor: COLORS.primary + '15' }]}>
            <Ionicons name="checkmark-circle" size={16} color={COLORS.primary} />
            <Text style={[styles.selectedText, { color: COLORS.primary }]}>
              {selectedQuotes.length} {isArabic ? 'عرض محدد' : 'quotes selected'}
            </Text>
          </View>
        )}

        {/* Quotes List */}
        <View style={styles.quotesContainer}>
          {sortedQuotes.map(renderQuoteCard)}
        </View>

        {/* Summary Actions */}
        {selectedQuotes.length > 0 && (
          <View style={styles.summaryActions}>
            <CustomButton
              title={isArabic ? 'مقارنة مفصلة' : 'Detailed Comparison'}
              onPress={() => {
                // Navigate to detailed comparison
                Alert.alert(
                  isArabic ? 'مقارنة مفصلة' : 'Detailed Comparison',
                  isArabic ? 'عرض المقارنة التفصيلية' : 'Show detailed comparison',
                  [{ text: isArabic ? 'موافق' : 'OK' }]
                );
              }}
              style={[styles.summaryButton, { backgroundColor: theme.surface }]}
              textColor={theme.text}
              icon="analytics"
            />
            <CustomButton
              title={isArabic ? 'إرسال للجميع' : 'Send to All'}
              onPress={() => {
                Alert.alert(
                  isArabic ? 'إرسال للجميع' : 'Send to All',
                  isArabic ? 'إرسال رسالة للمهندسين المحددين' : 'Send message to selected engineers',
                  [{ text: isArabic ? 'موافق' : 'OK' }]
                );
              }}
              style={styles.summaryButton}
              icon="send"
            />
          </View>
        )}
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
  selectedCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.lg,
  },
  selectedText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginLeft: SPACING.sm,
  },
  quotesContainer: {
    flex: 1,
  },
  quoteCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    position: 'relative',
  },
  recommendedBadge: {
    position: 'absolute',
    top: -8,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
    zIndex: 1,
  },
  recommendedText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginLeft: 4,
  },
  quoteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  engineerInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  profileInitial: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.sizes.h4,
    fontWeight: TYPOGRAPHY.weights.bold,
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
  selectionIndicator: {
    marginLeft: SPACING.sm,
  },
  quoteDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  priceContainer: {
    alignItems: 'center',
    flex: 1,
  },
  price: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  priceLabel: {
    fontSize: TYPOGRAPHY.sizes.caption,
    marginTop: SPACING.xs,
  },
  timelineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  timeline: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginLeft: SPACING.xs,
  },
  startDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  startDate: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginLeft: SPACING.xs,
  },
  deliverablesContainer: {
    marginBottom: SPACING.md,
  },
  deliverablesTitle: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: SPACING.sm,
  },
  deliverableItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  deliverableText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: SPACING.sm,
  },
  additionalInfo: {
    marginBottom: SPACING.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  infoText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: SPACING.sm,
  },
  specialNotes: {
    flexDirection: 'row',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
  },
  specialNotesText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: SPACING.sm,
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  actionButton: {
    flex: 1,
  },
  summaryActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.lg,
  },
  summaryButton: {
    flex: 1,
  },
});

export default QuoteComparisonMatrixScreen;

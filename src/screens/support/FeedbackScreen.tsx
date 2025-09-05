import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import CustomButton from '../../../components/CustomButton';

interface FeedbackType {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface RatingAspect {
  id: string;
  label: string;
  rating: number;
}

const FeedbackScreen = ({ navigation }: any) => {
  const { isDarkMode } = useTheme();
  const { language, getText } = useLanguage();
  const [selectedType, setSelectedType] = useState<string>('');
  const [overallRating, setOverallRating] = useState<number>(0);
  const [ratingAspects, setRatingAspects] = useState<RatingAspect[]>([
    { id: 'usability', label: getText('usability', 'Ease of Use'), rating: 0 },
    { id: 'performance', label: getText('performance', 'Performance'), rating: 0 },
    { id: 'features', label: getText('features', 'Features'), rating: 0 },
    { id: 'support', label: getText('support', 'Customer Support'), rating: 0 },
  ]);
  const [feedbackText, setFeedbackText] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allowContact, setAllowContact] = useState(true);

  const feedbackTypes: FeedbackType[] = [
    {
      id: 'general',
      title: getText('generalFeedback', 'General Feedback'),
      description: getText('generalFeedbackDesc', 'Share your overall experience with the app'),
      icon: 'chatbubble-ellipses-outline',
      color: '#6366F1',
    },
    {
      id: 'bug-report',
      title: getText('bugReport', 'Bug Report'),
      description: getText('bugReportDesc', 'Report a problem or issue you encountered'),
      icon: 'bug-outline',
      color: '#EF4444',
    },
    {
      id: 'feature-request',
      title: getText('featureRequest', 'Feature Request'),
      description: getText('featureRequestDesc', 'Suggest new features or improvements'),
      icon: 'bulb-outline',
      color: '#F59E0B',
    },
    {
      id: 'ui-feedback',
      title: getText('uiFeedback', 'UI/UX Feedback'),
      description: getText('uiFeedbackDesc', 'Comments on design and user experience'),
      icon: 'color-palette-outline',
      color: '#10B981',
    },
    {
      id: 'performance',
      title: getText('performanceFeedback', 'Performance'),
      description: getText('performanceFeedbackDesc', 'App speed and responsiveness issues'),
      icon: 'speedometer-outline',
      color: '#8B5CF6',
    },
    {
      id: 'compliment',
      title: getText('compliment', 'Compliment'),
      description: getText('complimentDesc', 'Tell us what you love about the app'),
      icon: 'heart-outline',
      color: '#EC4899',
    },
  ];

  const updateRatingAspect = (aspectId: string, rating: number) => {
    setRatingAspects(prev =>
      prev.map(aspect =>
        aspect.id === aspectId ? { ...aspect, rating } : aspect
      )
    );
  };

  const handleSubmitFeedback = async () => {
    if (!selectedType) {
      Alert.alert(
        getText('missingInfo', 'Missing Information'),
        getText('selectFeedbackType', 'Please select a feedback type.')
      );
      return;
    }

    if (overallRating === 0) {
      Alert.alert(
        getText('missingInfo', 'Missing Information'),
        getText('provideRating', 'Please provide an overall rating.')
      );
      return;
    }

    if (!feedbackText.trim()) {
      Alert.alert(
        getText('missingInfo', 'Missing Information'),
        getText('provideFeedback', 'Please share your detailed feedback.')
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      Alert.alert(
        getText('feedbackSubmitted', 'Feedback Submitted'),
        getText('feedbackThankYou', 'Thank you for your valuable feedback! We appreciate your input and will use it to improve NBCON Pro.'),
        [
          {
            text: getText('ok', 'OK'),
            onPress: () => {
              // Reset form
              setSelectedType('');
              setOverallRating(0);
              setRatingAspects(prev => prev.map(aspect => ({ ...aspect, rating: 0 })));
              setFeedbackText('');
              setSuggestions('');
              setAllowContact(true);
              navigation.goBack();
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert(
        getText('error', 'Error'),
        getText('submitError', 'Failed to submit feedback. Please try again.')
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStarRating = (rating: number, onPress: (rating: number) => void, size: number = 24) => {
    return (
      <View style={{ flexDirection: 'row', gap: 4 }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Pressable key={star} onPress={() => onPress(star)}>
            <Ionicons
              name={star <= rating ? 'star' : 'star-outline'}
              size={size}
              color={star <= rating ? '#F59E0B' : (isDarkMode ? '#6B7280' : '#D1D5DB')}
            />
          </Pressable>
        ))}
      </View>
    );
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1: return getText('veryPoor', 'Very Poor');
      case 2: return getText('poor', 'Poor');
      case 3: return getText('average', 'Average');
      case 4: return getText('good', 'Good');
      case 5: return getText('excellent', 'Excellent');
      default: return '';
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#111827' : '#F9FAFB',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      paddingTop: 10,
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    backButton: {
      marginRight: language === 'ar' ? 0 : 12,
      marginLeft: language === 'ar' ? 12 : 0,
      padding: 8,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
    },
    content: {
      flex: 1,
    },
    feedbackCard: {
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      margin: 20,
      borderRadius: 16,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 16,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    formGroup: {
      marginBottom: 24,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? '#D1D5DB' : '#374151',
      marginBottom: 12,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    requiredLabel: {
      color: '#EF4444',
    },
    feedbackTypesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    feedbackTypeCard: {
      width: '47%',
      backgroundColor: isDarkMode ? '#374151' : '#F9FAFB',
      borderWidth: 2,
      borderColor: 'transparent',
      borderRadius: 12,
      padding: 12,
    },
    selectedType: {
      borderColor: '#6366F1',
      backgroundColor: isDarkMode ? '#1E1B4B' : '#F8FAFF',
    },
    typeIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
    },
    typeTitle: {
      fontSize: 12,
      fontWeight: '600',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 4,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    typeDescription: {
      fontSize: 10,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    overallRatingSection: {
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#374151' : '#F9FAFB',
      borderRadius: 12,
      padding: 20,
      marginBottom: 12,
    },
    overallRatingTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 8,
    },
    ratingText: {
      fontSize: 14,
      color: '#F59E0B',
      fontWeight: '600',
      marginTop: 8,
    },
    aspectsRating: {
      gap: 16,
    },
    aspectRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    aspectLabel: {
      fontSize: 14,
      color: isDarkMode ? '#D1D5DB' : '#4B5563',
      flex: 1,
    },
    textInput: {
      backgroundColor: isDarkMode ? '#374151' : '#F9FAFB',
      borderWidth: 1,
      borderColor: isDarkMode ? '#4B5563' : '#D1D5DB',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
      color: isDarkMode ? '#FFFFFF' : '#111827',
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    textArea: {
      minHeight: 100,
      textAlignVertical: 'top',
    },
    characterCount: {
      fontSize: 12,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: 'right',
      marginTop: 4,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: isDarkMode ? '#4B5563' : '#D1D5DB',
      marginRight: language === 'ar' ? 0 : 12,
      marginLeft: language === 'ar' ? 12 : 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkedCheckbox: {
      backgroundColor: '#6366F1',
      borderColor: '#6366F1',
    },
    checkboxLabel: {
      fontSize: 14,
      color: isDarkMode ? '#D1D5DB' : '#4B5563',
      flex: 1,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    submitSection: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    submitButton: {
      marginBottom: 12,
    },
    footerText: {
      fontSize: 12,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: 'center',
      lineHeight: 16,
    },
    encouragementSection: {
      backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
      marginHorizontal: 20,
      marginBottom: 20,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
    },
    encouragementIcon: {
      marginBottom: 8,
    },
    encouragementTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 4,
      textAlign: 'center',
    },
    encouragementText: {
      fontSize: 14,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: 'center',
      lineHeight: 18,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons
            name={language === 'ar' ? 'chevron-forward' : 'chevron-back'}
            size={24}
            color={isDarkMode ? '#FFFFFF' : '#111827'}
          />
        </Pressable>
        <Text style={styles.headerTitle}>
          {getText('sendFeedback', 'Send Feedback')}
        </Text>
      </Animated.View>

      <KeyboardAvoidingView 
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Animated.View entering={SlideInUp.delay(100)} style={styles.encouragementSection}>
            <Ionicons
              name="heart"
              size={32}
              color="#EC4899"
              style={styles.encouragementIcon}
            />
            <Text style={styles.encouragementTitle}>
              {getText('yourOpinionMatters', 'Your Opinion Matters')}
            </Text>
            <Text style={styles.encouragementText}>
              {getText('feedbackHelps', 'Your feedback helps us improve NBCON Pro and create a better experience for all engineers and professionals.')}
            </Text>
          </Animated.View>

          <Animated.View entering={SlideInUp.delay(200)} style={styles.feedbackCard}>
            <Text style={styles.sectionTitle}>
              {getText('shareFeedback', 'Share Your Feedback')}
            </Text>

            <View style={styles.formGroup}>
              <Text style={[styles.label, styles.requiredLabel]}>
                {getText('feedbackType', 'What type of feedback is this?')} *
              </Text>
              <View style={styles.feedbackTypesGrid}>
                {feedbackTypes.map((type) => (
                  <Pressable
                    key={type.id}
                    style={[
                      styles.feedbackTypeCard,
                      selectedType === type.id && styles.selectedType
                    ]}
                    onPress={() => setSelectedType(type.id)}
                  >
                    <View style={[styles.typeIcon, { backgroundColor: type.color + '20' }]}>
                      <Ionicons
                        name={type.icon as any}
                        size={16}
                        color={type.color}
                      />
                    </View>
                    <Text style={styles.typeTitle}>{type.title}</Text>
                    <Text style={styles.typeDescription}>{type.description}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, styles.requiredLabel]}>
                {getText('overallRating', 'Overall Rating')} *
              </Text>
              <View style={styles.overallRatingSection}>
                <Text style={styles.overallRatingTitle}>
                  {getText('rateExperience', 'How would you rate your overall experience?')}
                </Text>
                {renderStarRating(overallRating, setOverallRating, 32)}
                {overallRating > 0 && (
                  <Text style={styles.ratingText}>
                    {getRatingText(overallRating)}
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>
                {getText('rateAspects', 'Rate Specific Aspects')}
              </Text>
              <View style={styles.aspectsRating}>
                {ratingAspects.map((aspect) => (
                  <View key={aspect.id} style={styles.aspectRow}>
                    <Text style={styles.aspectLabel}>{aspect.label}</Text>
                    {renderStarRating(aspect.rating, (rating) => updateRatingAspect(aspect.id, rating), 20)}
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, styles.requiredLabel]}>
                {getText('detailedFeedback', 'Detailed Feedback')} *
              </Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={feedbackText}
                onChangeText={setFeedbackText}
                placeholder={getText('feedbackPlaceholder', 'Please share your detailed thoughts, experiences, or issues you\'d like us to know about...')}
                placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
                multiline
                numberOfLines={6}
                maxLength={1000}
              />
              <Text style={styles.characterCount}>{feedbackText.length}/1000</Text>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>
                {getText('suggestions', 'Suggestions for Improvement')}
              </Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={suggestions}
                onChangeText={setSuggestions}
                placeholder={getText('suggestionsPlaceholder', 'What specific improvements or new features would you like to see?')}
                placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
                multiline
                numberOfLines={4}
                maxLength={500}
              />
              <Text style={styles.characterCount}>{suggestions.length}/500</Text>
            </View>

            <Pressable
              style={styles.checkboxContainer}
              onPress={() => setAllowContact(!allowContact)}
            >
              <View style={[styles.checkbox, allowContact && styles.checkedCheckbox]}>
                {allowContact && (
                  <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.checkboxLabel}>
                {getText('allowContact', 'Allow NBCON Pro team to contact me about this feedback')}
              </Text>
            </Pressable>
          </Animated.View>

          <View style={styles.submitSection}>
            <View style={styles.submitButton}>
              <CustomButton
                title={getText('submitFeedback', 'Submit Feedback')}
                onPress={handleSubmitFeedback}
                variant="primary"
                fullWidth
                loading={isSubmitting}
              />
            </View>
            <Text style={styles.footerText}>
              {getText('feedbackFooter', 'Your feedback is anonymous unless you choose to allow contact. We read every submission and use it to improve our platform.')}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default FeedbackScreen;
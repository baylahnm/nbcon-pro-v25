import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import CustomButton from '../../../components/CustomButton';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
  notHelpful: number;
}

interface HelpCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  itemCount: number;
  onPress: () => void;
}

const HelpCenterScreen = ({ navigation }: any) => {
  const { isDarkMode } = useTheme();
  const { language, getText } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'How do I verify my professional credentials?',
      answer: 'To verify your credentials, go to Profile > Verification and upload your license documents, educational certificates, and professional certifications. Our team will review and verify them within 24-48 hours.',
      category: 'verification',
      helpful: 45,
      notHelpful: 3,
    },
    {
      id: '2',
      question: 'How does the payment system work?',
      answer: 'NBCON Pro supports multiple payment methods including mada, STC Pay, Visa, and Mastercard. Payments are processed securely through our Saudi-compliant payment gateway. You can set up auto-pay for subscriptions and receive instant payment confirmations.',
      category: 'payments',
      helpful: 62,
      notHelpful: 5,
    },
    {
      id: '3',
      question: 'What subscription plans are available?',
      answer: 'We offer three plans: Basic (99 SAR/month), Professional (299 SAR/month), and Enterprise (599 SAR/month). Each plan includes different features like project limits, storage, support levels, and advanced analytics. Annual subscriptions receive up to 25% discount.',
      category: 'subscription',
      helpful: 38,
      notHelpful: 2,
    },
    {
      id: '4',
      question: 'How do I find projects that match my expertise?',
      answer: 'Use our advanced search and filtering system on the Jobs page. You can filter by location, project type, budget range, and required skills. Enable notifications to get alerts for new projects matching your criteria.',
      category: 'projects',
      helpful: 51,
      notHelpful: 4,
    },
    {
      id: '5',
      question: 'Can I work on projects outside Saudi Arabia?',
      answer: 'Yes, NBCON Pro connects professionals with projects across the Gulf region and internationally. Make sure to specify your availability for remote work or travel in your profile settings.',
      category: 'projects',
      helpful: 29,
      notHelpful: 1,
    },
    {
      id: '6',
      question: 'How do I update my profile information?',
      answer: 'Navigate to Profile > Edit Profile to update your personal information, skills, experience, portfolio, and availability. Changes are saved automatically and reflected immediately on your public profile.',
      category: 'profile',
      helpful: 41,
      notHelpful: 2,
    },
    {
      id: '7',
      question: 'What should I do if I forgot my password?',
      answer: 'Click on "Forgot Password" on the login screen, enter your email address, and we\'ll send you a password reset link. If you don\'t receive the email within 5 minutes, check your spam folder or contact support.',
      category: 'account',
      helpful: 33,
      notHelpful: 1,
    },
    {
      id: '8',
      question: 'How do I contact project clients?',
      answer: 'Once you apply for a project and get accepted, you can communicate with clients through our built-in messaging system. This keeps all project communications secure and organized in one place.',
      category: 'communication',
      helpful: 47,
      notHelpful: 3,
    },
  ];

  const helpCategories: HelpCategory[] = [
    {
      id: 'getting-started',
      title: getText('gettingStarted', 'Getting Started'),
      icon: 'rocket-outline',
      color: '#6366F1',
      itemCount: 8,
      onPress: () => navigation.navigate('GettingStarted'),
    },
    {
      id: 'account-settings',
      title: getText('accountSettings', 'Account Settings'),
      icon: 'person-outline',
      color: '#10B981',
      itemCount: 12,
      onPress: () => setActiveCategory('account'),
    },
    {
      id: 'project-management',
      title: getText('projectManagement', 'Project Management'),
      icon: 'briefcase-outline',
      color: '#F59E0B',
      itemCount: 15,
      onPress: () => setActiveCategory('projects'),
    },
    {
      id: 'payments-billing',
      title: getText('paymentsBilling', 'Payments & Billing'),
      icon: 'card-outline',
      color: '#EF4444',
      itemCount: 10,
      onPress: () => setActiveCategory('payments'),
    },
    {
      id: 'verification',
      title: getText('verification', 'Verification'),
      icon: 'shield-checkmark-outline',
      color: '#8B5CF6',
      itemCount: 6,
      onPress: () => setActiveCategory('verification'),
    },
    {
      id: 'technical-support',
      title: getText('technicalSupport', 'Technical Support'),
      icon: 'construct-outline',
      color: '#06B6D4',
      itemCount: 9,
      onPress: () => navigation.navigate('TechnicalSupport'),
    },
  ];

  const getFilteredFAQs = () => {
    let filtered = faqItems;

    if (activeCategory !== 'all') {
      filtered = filtered.filter(item => item.category === activeCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const handleFAQPress = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const handleFeedback = (id: string, helpful: boolean) => {
    Alert.alert(
      getText('thankYou', 'Thank You'),
      getText('feedbackReceived', 'Your feedback helps us improve our help content.')
    );
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
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#374151' : '#F3F4F6',
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      margin: 20,
      marginBottom: 10,
    },
    searchIcon: {
      marginRight: language === 'ar' ? 0 : 12,
      marginLeft: language === 'ar' ? 12 : 0,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: isDarkMode ? '#FFFFFF' : '#111827',
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    categoriesSection: {
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 16,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    categoriesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    categoryCard: {
      width: '47%',
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderRadius: 12,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    categoryIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    categoryTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 4,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    categoryCount: {
      fontSize: 12,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    quickActions: {
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    quickActionsGrid: {
      flexDirection: 'row',
      gap: 12,
    },
    quickActionCard: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    quickActionIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
    },
    quickActionTitle: {
      fontSize: 12,
      fontWeight: '600',
      color: isDarkMode ? '#D1D5DB' : '#4B5563',
      textAlign: 'center',
    },
    faqSection: {
      paddingHorizontal: 20,
    },
    faqItem: {
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderRadius: 12,
      marginBottom: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
      overflow: 'hidden',
    },
    faqQuestion: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
    },
    questionText: {
      fontSize: 15,
      fontWeight: '600',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      flex: 1,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    expandIcon: {
      marginLeft: language === 'ar' ? 0 : 12,
      marginRight: language === 'ar' ? 12 : 0,
    },
    faqAnswer: {
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    answerText: {
      fontSize: 14,
      color: isDarkMode ? '#D1D5DB' : '#4B5563',
      lineHeight: 20,
      marginBottom: 16,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    feedbackSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    feedbackText: {
      fontSize: 12,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
    },
    feedbackButtons: {
      flexDirection: 'row',
      gap: 8,
    },
    feedbackButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 16,
      backgroundColor: isDarkMode ? '#374151' : '#F3F4F6',
      gap: 4,
    },
    feedbackButtonText: {
      fontSize: 11,
      color: isDarkMode ? '#D1D5DB' : '#4B5563',
    },
    contactSupport: {
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
    contactTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 8,
      textAlign: 'center',
    },
    contactDescription: {
      fontSize: 14,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: 'center',
      marginBottom: 16,
      lineHeight: 20,
    },
    contactButtons: {
      flexDirection: 'row',
      gap: 12,
    },
    contactButton: {
      flex: 1,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 60,
    },
    emptyStateIcon: {
      marginBottom: 16,
    },
    emptyStateTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 8,
      textAlign: 'center',
    },
    emptyStateDescription: {
      fontSize: 14,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: 'center',
      lineHeight: 20,
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
          {getText('helpCenter', 'Help Center')}
        </Text>
      </Animated.View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={SlideInUp.delay(100)} style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color={isDarkMode ? '#9CA3AF' : '#6B7280'}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder={getText('searchHelp', 'Search help articles...')}
            placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </Animated.View>

        {!searchQuery && (
          <>
            <Animated.View entering={SlideInUp.delay(200)} style={styles.categoriesSection}>
              <Text style={styles.sectionTitle}>
                {getText('browseCategories', 'Browse Categories')}
              </Text>
              <View style={styles.categoriesGrid}>
                {helpCategories.map((category, index) => (
                  <Pressable
                    key={category.id}
                    style={styles.categoryCard}
                    onPress={category.onPress}
                  >
                    <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                      <Ionicons
                        name={category.icon as any}
                        size={20}
                        color={category.color}
                      />
                    </View>
                    <Text style={styles.categoryTitle}>{category.title}</Text>
                    <Text style={styles.categoryCount}>
                      {category.itemCount} {getText('articles', 'articles')}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </Animated.View>

            <Animated.View entering={SlideInUp.delay(300)} style={styles.quickActions}>
              <Text style={styles.sectionTitle}>
                {getText('quickActions', 'Quick Actions')}
              </Text>
              <View style={styles.quickActionsGrid}>
                <Pressable
                  style={styles.quickActionCard}
                  onPress={() => navigation.navigate('ContactSupport')}
                >
                  <View style={[styles.quickActionIcon, { backgroundColor: '#6366F1' + '20' }]}>
                    <Ionicons
                      name="headset-outline"
                      size={20}
                      color="#6366F1"
                    />
                  </View>
                  <Text style={styles.quickActionTitle}>
                    {getText('contactSupport', 'Contact Support')}
                  </Text>
                </Pressable>

                <Pressable
                  style={styles.quickActionCard}
                  onPress={() => navigation.navigate('LiveChat')}
                >
                  <View style={[styles.quickActionIcon, { backgroundColor: '#10B981' + '20' }]}>
                    <Ionicons
                      name="chatbubble-ellipses-outline"
                      size={20}
                      color="#10B981"
                    />
                  </View>
                  <Text style={styles.quickActionTitle}>
                    {getText('liveChat', 'Live Chat')}
                  </Text>
                </Pressable>

                <Pressable
                  style={styles.quickActionCard}
                  onPress={() => navigation.navigate('UserGuide')}
                >
                  <View style={[styles.quickActionIcon, { backgroundColor: '#F59E0B' + '20' }]}>
                    <Ionicons
                      name="book-outline"
                      size={20}
                      color="#F59E0B"
                    />
                  </View>
                  <Text style={styles.quickActionTitle}>
                    {getText('userGuide', 'User Guide')}
                  </Text>
                </Pressable>
              </View>
            </Animated.View>
          </>
        )}

        <Animated.View entering={SlideInUp.delay(400)} style={styles.faqSection}>
          <Text style={styles.sectionTitle}>
            {searchQuery 
              ? getText('searchResults', 'Search Results')
              : getText('frequentlyAsked', 'Frequently Asked Questions')
            }
          </Text>

          {getFilteredFAQs().map((faq, index) => (
            <Animated.View
              key={faq.id}
              entering={SlideInUp.delay(500 + index * 50)}
              style={styles.faqItem}
            >
              <Pressable
                style={styles.faqQuestion}
                onPress={() => handleFAQPress(faq.id)}
              >
                <Text style={styles.questionText}>{faq.question}</Text>
                <Ionicons
                  name={expandedFAQ === faq.id ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={isDarkMode ? '#9CA3AF' : '#6B7280'}
                  style={styles.expandIcon}
                />
              </Pressable>

              {expandedFAQ === faq.id && (
                <Animated.View entering={SlideInUp} style={styles.faqAnswer}>
                  <Text style={styles.answerText}>{faq.answer}</Text>
                  
                  <View style={styles.feedbackSection}>
                    <Text style={styles.feedbackText}>
                      {getText('wasHelpful', 'Was this helpful?')}
                    </Text>
                    <View style={styles.feedbackButtons}>
                      <Pressable
                        style={styles.feedbackButton}
                        onPress={() => handleFeedback(faq.id, true)}
                      >
                        <Ionicons name="thumbs-up" size={12} color="#10B981" />
                        <Text style={styles.feedbackButtonText}>{faq.helpful}</Text>
                      </Pressable>
                      <Pressable
                        style={styles.feedbackButton}
                        onPress={() => handleFeedback(faq.id, false)}
                      >
                        <Ionicons name="thumbs-down" size={12} color="#EF4444" />
                        <Text style={styles.feedbackButtonText}>{faq.notHelpful}</Text>
                      </Pressable>
                    </View>
                  </View>
                </Animated.View>
              )}
            </Animated.View>
          ))}

          {getFilteredFAQs().length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons
                name="search-outline"
                size={64}
                color={isDarkMode ? '#4B5563' : '#D1D5DB'}
                style={styles.emptyStateIcon}
              />
              <Text style={styles.emptyStateTitle}>
                {getText('noResults', 'No Results Found')}
              </Text>
              <Text style={styles.emptyStateDescription}>
                {getText('tryDifferentSearch', 'Try searching with different keywords or browse our categories above')}
              </Text>
            </View>
          )}
        </Animated.View>

        <Animated.View entering={SlideInUp.delay(600)} style={styles.contactSupport}>
          <Text style={styles.contactTitle}>
            {getText('stillNeedHelp', 'Still Need Help?')}
          </Text>
          <Text style={styles.contactDescription}>
            {getText('contactDescription', 'Can\'t find what you\'re looking for? Our support team is here to help you 24/7.')}
          </Text>
          <View style={styles.contactButtons}>
            <View style={styles.contactButton}>
              <CustomButton
                title={getText('contactSupport', 'Contact Support')}
                onPress={() => navigation.navigate('ContactSupport')}
                variant="secondary"
                fullWidth
              />
            </View>
            <View style={styles.contactButton}>
              <CustomButton
                title={getText('liveChat', 'Live Chat')}
                onPress={() => navigation.navigate('LiveChat')}
                variant="primary"
                fullWidth
              />
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpCenterScreen;
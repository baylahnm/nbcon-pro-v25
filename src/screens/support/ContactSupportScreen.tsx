import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import CustomButton from '../../components/CustomButton';

interface SupportCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
}

interface ContactMethod {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  available: boolean;
  responseTime: string;
  onPress: () => void;
}

const ContactSupportScreen = ({ navigation }: any) => {
  const { isDarkMode } = useTheme();
  const { language, getText } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const supportCategories: SupportCategory[] = [
    {
      id: 'account',
      title: getText('accountIssues', 'Account Issues'),
      icon: 'person-circle-outline',
      color: '#6366F1',
      description: getText('accountDesc', 'Login, profile, or account settings problems'),
    },
    {
      id: 'technical',
      title: getText('technicalSupport', 'Technical Support'),
      icon: 'construct-outline',
      color: '#10B981',
      description: getText('technicalDesc', 'App crashes, bugs, or performance issues'),
    },
    {
      id: 'payments',
      title: getText('paymentIssues', 'Payment Issues'),
      icon: 'card-outline',
      color: '#F59E0B',
      description: getText('paymentsDesc', 'Billing, subscriptions, or payment problems'),
    },
    {
      id: 'projects',
      title: getText('projectSupport', 'Project Support'),
      icon: 'briefcase-outline',
      color: '#EF4444',
      description: getText('projectsDesc', 'Job posting, applications, or project management'),
    },
    {
      id: 'verification',
      title: getText('verification', 'Verification'),
      icon: 'shield-checkmark-outline',
      color: '#8B5CF6',
      description: getText('verificationDesc', 'Professional credential verification issues'),
    },
    {
      id: 'other',
      title: getText('other', 'Other'),
      icon: 'help-circle-outline',
      color: '#06B6D4',
      description: getText('otherDesc', 'General questions or feedback'),
    },
  ];

  const contactMethods: ContactMethod[] = [
    {
      id: 'live-chat',
      title: getText('liveChat', 'Live Chat'),
      description: getText('liveChatDesc', 'Chat with our support team in real-time'),
      icon: 'chatbubble-ellipses',
      color: '#10B981',
      available: true,
      responseTime: getText('immediate', 'Immediate'),
      onPress: () => navigation.navigate('LiveChat'),
    },
    {
      id: 'phone',
      title: getText('phoneSupport', 'Phone Support'),
      description: getText('phoneSupportDesc', 'Call our support hotline for urgent issues'),
      icon: 'call',
      color: '#6366F1',
      available: true,
      responseTime: getText('immediate', 'Immediate'),
      onPress: () => Alert.alert(
        getText('phoneSupport', 'Phone Support'),
        getText('phoneNumber', 'Support Hotline: +966 11 123 4567\nAvailable 24/7')
      ),
    },
    {
      id: 'email',
      title: getText('emailSupport', 'Email Support'),
      description: getText('emailSupportDesc', 'Send detailed questions via email'),
      icon: 'mail',
      color: '#F59E0B',
      available: true,
      responseTime: getText('within24h', 'Within 24 hours'),
      onPress: () => Alert.alert(
        getText('emailSupport', 'Email Support'),
        getText('supportEmail', 'Send your questions to: support@nbconpro.com')
      ),
    },
    {
      id: 'whatsapp',
      title: getText('whatsappSupport', 'WhatsApp Support'),
      description: getText('whatsappDesc', 'Get help via WhatsApp messaging'),
      icon: 'logo-whatsapp',
      color: '#25D366',
      available: true,
      responseTime: getText('within1h', 'Within 1 hour'),
      onPress: () => Alert.alert(
        getText('whatsappSupport', 'WhatsApp Support'),
        getText('whatsappNumber', 'Message us at: +966 50 123 4567')
      ),
    },
  ];

  const handleSubmitTicket = async () => {
    if (!selectedCategory) {
      Alert.alert(
        getText('missingInfo', 'Missing Information'),
        getText('selectCategory', 'Please select a support category.')
      );
      return;
    }

    if (!subject.trim()) {
      Alert.alert(
        getText('missingInfo', 'Missing Information'),
        getText('enterSubject', 'Please enter a subject for your request.')
      );
      return;
    }

    if (!message.trim()) {
      Alert.alert(
        getText('missingInfo', 'Missing Information'),
        getText('enterMessage', 'Please describe your issue in detail.')
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      Alert.alert(
        getText('ticketSubmitted', 'Ticket Submitted'),
        getText('ticketSubmittedDesc', 'Your support ticket has been submitted successfully. You\'ll receive a confirmation email with your ticket number.'),
        [
          {
            text: getText('ok', 'OK'),
            onPress: () => {
              setSelectedCategory('');
              setSubject('');
              setMessage('');
              setPriority('medium');
              navigation.goBack();
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert(
        getText('error', 'Error'),
        getText('submitError', 'Failed to submit support ticket. Please try again.')
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPriorityColor = (priorityLevel: string) => {
    switch (priorityLevel) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getPriorityText = (priorityLevel: string) => {
    switch (priorityLevel) {
      case 'high': return getText('highPriority', 'High Priority');
      case 'medium': return getText('mediumPriority', 'Medium Priority');
      case 'low': return getText('lowPriority', 'Low Priority');
      default: return priorityLevel;
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
    contactMethodsSection: {
      paddingHorizontal: 20,
      paddingTop: 20,
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 16,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    contactMethodsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    contactMethodCard: {
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
    methodIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    methodTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 4,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    methodDescription: {
      fontSize: 12,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      marginBottom: 8,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    responseTime: {
      fontSize: 11,
      fontWeight: '600',
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    ticketForm: {
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
    formTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 16,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    formGroup: {
      marginBottom: 20,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? '#D1D5DB' : '#374151',
      marginBottom: 8,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    requiredLabel: {
      color: '#EF4444',
    },
    categoriesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    categoryCard: {
      width: '47%',
      backgroundColor: isDarkMode ? '#374151' : '#F9FAFB',
      borderWidth: 2,
      borderColor: 'transparent',
      borderRadius: 12,
      padding: 12,
    },
    selectedCategory: {
      borderColor: '#6366F1',
      backgroundColor: isDarkMode ? '#1E1B4B' : '#F8FAFF',
    },
    categoryIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
    },
    categoryTitle: {
      fontSize: 12,
      fontWeight: '600',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 4,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    categoryDescription: {
      fontSize: 10,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: language === 'ar' ? 'right' : 'left',
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
    priorityContainer: {
      flexDirection: 'row',
      gap: 8,
    },
    priorityButton: {
      flex: 1,
      backgroundColor: isDarkMode ? '#374151' : '#F9FAFB',
      borderWidth: 2,
      borderColor: 'transparent',
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
      alignItems: 'center',
    },
    selectedPriority: {
      borderColor: '#6366F1',
      backgroundColor: isDarkMode ? '#1E1B4B' : '#F8FAFF',
    },
    priorityText: {
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? '#D1D5DB' : '#4B5563',
    },
    selectedPriorityText: {
      color: '#6366F1',
    },
    priorityDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginBottom: 4,
    },
    characterCount: {
      fontSize: 12,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: 'right',
      marginTop: 4,
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
          {getText('contactSupport', 'Contact Support')}
        </Text>
      </Animated.View>

      <KeyboardAvoidingView 
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Animated.View entering={SlideInUp.delay(100)} style={styles.contactMethodsSection}>
            <Text style={styles.sectionTitle}>
              {getText('getImmediateHelp', 'Get Immediate Help')}
            </Text>
            <View style={styles.contactMethodsGrid}>
              {contactMethods.map((method) => (
                <Pressable
                  key={method.id}
                  style={styles.contactMethodCard}
                  onPress={method.onPress}
                >
                  <View style={[styles.methodIcon, { backgroundColor: method.color + '20' }]}>
                    <Ionicons
                      name={method.icon as any}
                      size={20}
                      color={method.color}
                    />
                  </View>
                  <Text style={styles.methodTitle}>{method.title}</Text>
                  <Text style={styles.methodDescription}>{method.description}</Text>
                  <Text style={[styles.responseTime, { color: method.color }]}>
                    {method.responseTime}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Animated.View>

          <Animated.View entering={SlideInUp.delay(200)} style={styles.ticketForm}>
            <Text style={styles.formTitle}>
              {getText('submitSupportTicket', 'Submit Support Ticket')}
            </Text>

            <View style={styles.formGroup}>
              <Text style={[styles.label, styles.requiredLabel]}>
                {getText('category', 'Category')} *
              </Text>
              <View style={styles.categoriesGrid}>
                {supportCategories.map((category) => (
                  <Pressable
                    key={category.id}
                    style={[
                      styles.categoryCard,
                      selectedCategory === category.id && styles.selectedCategory
                    ]}
                    onPress={() => setSelectedCategory(category.id)}
                  >
                    <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                      <Ionicons
                        name={category.icon as any}
                        size={16}
                        color={category.color}
                      />
                    </View>
                    <Text style={styles.categoryTitle}>{category.title}</Text>
                    <Text style={styles.categoryDescription}>{category.description}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, styles.requiredLabel]}>
                {getText('subject', 'Subject')} *
              </Text>
              <TextInput
                style={styles.textInput}
                value={subject}
                onChangeText={setSubject}
                placeholder={getText('enterSubject', 'Enter a brief subject for your request')}
                placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
                maxLength={100}
              />
              <Text style={styles.characterCount}>{subject.length}/100</Text>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>
                {getText('priority', 'Priority')}
              </Text>
              <View style={styles.priorityContainer}>
                {(['low', 'medium', 'high'] as const).map((priorityLevel) => (
                  <Pressable
                    key={priorityLevel}
                    style={[
                      styles.priorityButton,
                      priority === priorityLevel && styles.selectedPriority
                    ]}
                    onPress={() => setPriority(priorityLevel)}
                  >
                    <View style={[
                      styles.priorityDot,
                      { backgroundColor: getPriorityColor(priorityLevel) }
                    ]} />
                    <Text style={[
                      styles.priorityText,
                      priority === priorityLevel && styles.selectedPriorityText
                    ]}>
                      {getPriorityText(priorityLevel)}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.label, styles.requiredLabel]}>
                {getText('description', 'Description')} *
              </Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={message}
                onChangeText={setMessage}
                placeholder={getText('describeIssue', 'Please describe your issue in detail. Include any error messages, steps you\'ve taken, and what you expected to happen.')}
                placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
                multiline
                numberOfLines={6}
                maxLength={1000}
              />
              <Text style={styles.characterCount}>{message.length}/1000</Text>
            </View>
          </Animated.View>

          <View style={styles.submitSection}>
            <View style={styles.submitButton}>
              <CustomButton
                title={getText('submitTicket', 'Submit Ticket')}
                onPress={handleSubmitTicket}
                variant="primary"
                fullWidth
                loading={isSubmitting}
              />
            </View>
            <Text style={styles.footerText}>
              {getText('supportFooter', 'Our support team typically responds within 24 hours. For urgent issues, please use our live chat or phone support options above.')}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ContactSupportScreen;
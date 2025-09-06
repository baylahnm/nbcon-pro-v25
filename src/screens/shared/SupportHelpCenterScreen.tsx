import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
  Alert,
  Modal,
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

interface FAQ {
  id: string;
  question: { en: string; ar: string };
  answer: { en: string; ar: string };
  category: string;
  tags: string[];
  helpfulCount: number;
  lastUpdated: string;
}

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  createdAt: string;
  updatedAt: string;
  assignedTo?: {
    id: string;
    name: { en: string; ar: string };
  };
  messages: {
    id: string;
    content: string;
    sender: {
      id: string;
      name: { en: string; ar: string };
      role: 'user' | 'support';
    };
    createdAt: string;
    attachments?: {
      id: string;
      name: string;
      url: string;
    }[];
  }[];
}

interface SupportHelpCenterScreenProps {
  route?: {
    params: {
      initialTab?: 'faq' | 'tickets' | 'chat';
    };
  };
}

const SupportHelpCenterScreen: React.FC<SupportHelpCenterScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const { language, isDarkMode, user } = useSelector((state: RootState) => state.app);
  const [activeTab, setActiveTab] = useState<'faq' | 'tickets' | 'chat'>(route?.params?.initialTab || 'faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    category: 'general',
    priority: 'medium' as const,
  });
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<any[]>([]);

  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockFAQs: FAQ[] = [
      {
        id: 'faq_1',
        question: { 
          en: 'How do I create a new job posting?', 
          ar: 'كيف يمكنني إنشاء إعلان وظيفة جديد؟' 
        },
        answer: { 
          en: 'To create a new job posting, go to the Jobs tab and tap the "+" button. Fill in the job details, requirements, and budget, then publish your posting.',
          ar: 'لإنشاء إعلان وظيفة جديد، اذهب إلى تبويب الوظائف واضغط على زر "+". املأ تفاصيل الوظيفة والمتطلبات والميزانية، ثم انشر إعلانك.'
        },
        category: 'jobs',
        tags: ['job', 'posting', 'create'],
        helpfulCount: 15,
        lastUpdated: '2024-02-15T10:30:00Z',
      },
      {
        id: 'faq_2',
        question: { 
          en: 'How do I receive payments?', 
          ar: 'كيف يمكنني استلام المدفوعات؟' 
        },
        answer: { 
          en: 'Payments are automatically processed through our secure payment system. You can set up your payment methods in the Settings > Payment section.',
          ar: 'يتم معالجة المدفوعات تلقائياً من خلال نظام الدفع الآمن لدينا. يمكنك إعداد طرق الدفع في الإعدادات > قسم الدفع.'
        },
        category: 'payments',
        tags: ['payment', 'money', 'payout'],
        helpfulCount: 23,
        lastUpdated: '2024-02-14T16:45:00Z',
      },
      {
        id: 'faq_3',
        question: { 
          en: 'How do I verify my engineer profile?', 
          ar: 'كيف يمكنني التحقق من ملفي الشخصي كمهندس؟' 
        },
        answer: { 
          en: 'Upload your SCE license and professional certificates in the Profile section. Our team will review and verify your credentials within 24-48 hours.',
          ar: 'قم بتحميل رخصة SCE والشهادات المهنية في قسم الملف الشخصي. سيقوم فريقنا بمراجعة والتحقق من أوراق اعتمادك خلال 24-48 ساعة.'
        },
        category: 'profile',
        tags: ['verification', 'profile', 'license'],
        helpfulCount: 8,
        lastUpdated: '2024-02-13T14:20:00Z',
      },
      {
        id: 'faq_4',
        question: { 
          en: 'How do I contact support?', 
          ar: 'كيف يمكنني الاتصال بالدعم الفني؟' 
        },
        answer: { 
          en: 'You can contact support through this help center, create a support ticket, or use the live chat feature. We respond within 2 hours during business hours.',
          ar: 'يمكنك الاتصال بالدعم الفني من خلال مركز المساعدة هذا، أو إنشاء تذكرة دعم، أو استخدام ميزة الدردشة المباشرة. نرد خلال ساعتين خلال ساعات العمل.'
        },
        category: 'support',
        tags: ['support', 'contact', 'help'],
        helpfulCount: 12,
        lastUpdated: '2024-02-12T11:00:00Z',
      },
    ];

    const mockTickets: SupportTicket[] = [
      {
        id: 'ticket_1',
        title: 'Payment not received',
        description: 'I completed a job but haven\'t received payment yet.',
        status: 'open',
        priority: 'high',
        category: 'payments',
        createdAt: '2024-02-15T10:30:00Z',
        updatedAt: '2024-02-15T10:30:00Z',
        messages: [
          {
            id: 'msg_1',
            content: 'I completed the MEP design job for Ahmed Al-Rajhi but haven\'t received the payment of SAR 2,500 yet. It\'s been 3 days since completion.',
            sender: {
              id: 'eng_1',
              name: { en: 'Sara Al-Mansouri', ar: 'سارة المنصوري' },
              role: 'user',
            },
            createdAt: '2024-02-15T10:30:00Z',
          },
        ],
      },
      {
        id: 'ticket_2',
        title: 'Profile verification issue',
        description: 'My engineer profile verification is taking longer than expected.',
        status: 'in_progress',
        priority: 'medium',
        category: 'profile',
        createdAt: '2024-02-14T16:45:00Z',
        updatedAt: '2024-02-15T09:15:00Z',
        assignedTo: {
          id: 'support_1',
          name: { en: 'Support Team', ar: 'فريق الدعم' },
        },
        messages: [
          {
            id: 'msg_2',
            content: 'I uploaded my SCE license 5 days ago but my profile is still not verified. Can you please check?',
            sender: {
              id: 'eng_2',
              name: { en: 'Mohammed Al-Shehri', ar: 'محمد الشهري' },
              role: 'user',
            },
            createdAt: '2024-02-14T16:45:00Z',
          },
          {
            id: 'msg_3',
            content: 'We\'re reviewing your documents. The verification process usually takes 24-48 hours, but we\'re experiencing higher than usual volume. We\'ll update you soon.',
            sender: {
              id: 'support_1',
              name: { en: 'Support Team', ar: 'فريق الدعم' },
              role: 'support',
            },
            createdAt: '2024-02-15T09:15:00Z',
          },
        ],
      },
    ];

    setFaqs(mockFAQs);
    setTickets(mockTickets);
  }, []);

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return COLORS.error;
      case 'in_progress':
        return COLORS.warning;
      case 'resolved':
        return COLORS.success;
      case 'closed':
        return COLORS.textSecondary;
      default:
        return COLORS.textSecondary;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return COLORS.error;
      case 'high':
        return COLORS.warning;
      case 'medium':
        return COLORS.accent;
      case 'low':
        return COLORS.textSecondary;
      default:
        return COLORS.textSecondary;
    }
  };

  const categories = [
    { key: 'all', label: { en: 'All', ar: 'الكل' } },
    { key: 'jobs', label: { en: 'Jobs', ar: 'الوظائف' } },
    { key: 'payments', label: { en: 'Payments', ar: 'المدفوعات' } },
    { key: 'profile', label: { en: 'Profile', ar: 'الملف الشخصي' } },
    { key: 'support', label: { en: 'Support', ar: 'الدعم' } },
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      getText(faq.question).toLowerCase().includes(searchQuery.toLowerCase()) ||
      getText(faq.answer).toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = searchQuery === '' || 
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  const handleCreateTicket = () => {
    if (!newTicket.title.trim() || !newTicket.description.trim()) {
      Alert.alert(
        isArabic ? 'خطأ' : 'Error',
        isArabic ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields'
      );
      return;
    }

    const ticket: SupportTicket = {
      id: `ticket_${Date.now()}`,
      title: newTicket.title,
      description: newTicket.description,
      status: 'open',
      priority: newTicket.priority,
      category: newTicket.category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: `msg_${Date.now()}`,
          content: newTicket.description,
          sender: {
            id: user?.id || 'current_user',
            name: user?.name || { en: 'You', ar: 'أنت' },
            role: 'user',
          },
          createdAt: new Date().toISOString(),
        },
      ],
    };

    setTickets(prev => [ticket, ...prev]);
    setNewTicket({ title: '', description: '', category: 'general', priority: 'medium' });
    setShowNewTicketModal(false);
    
    Alert.alert(
      isArabic ? 'تم الإنشاء' : 'Created',
      isArabic ? 'تم إنشاء تذكرة الدعم بنجاح' : 'Support ticket created successfully'
    );
  };

  const handleSendChatMessage = () => {
    if (!chatMessage.trim()) return;

    const message = {
      id: `chat_${Date.now()}`,
      content: chatMessage,
      sender: {
        id: user?.id || 'current_user',
        name: user?.name || { en: 'You', ar: 'أنت' },
        role: 'user',
      },
      createdAt: new Date().toISOString(),
    };

    setChatMessages(prev => [...prev, message]);
    setChatMessage('');

    // Simulate support response
    setTimeout(() => {
      const response = {
        id: `chat_${Date.now()}`,
        content: isArabic 
          ? 'شكراً لك على رسالتك. سيقوم أحد أعضاء فريق الدعم بالرد عليك قريباً.'
          : 'Thank you for your message. A support team member will respond to you shortly.',
        sender: {
          id: 'support_1',
          name: { en: 'Support Team', ar: 'فريق الدعم' },
          role: 'support',
        },
        createdAt: new Date().toISOString(),
      };
      setChatMessages(prev => [...prev, response]);
    }, 2000);
  };

  const renderFAQ = ({ item }: { item: FAQ }) => (
    <TouchableOpacity style={[styles.faqCard, { backgroundColor: theme.card }]}>
      <Text style={[styles.faqQuestion, { color: theme.text }]}>
        {getText(item.question)}
      </Text>
      <Text style={[styles.faqAnswer, { color: theme.textSecondary }]} numberOfLines={3}>
        {getText(item.answer)}
      </Text>
      <View style={styles.faqFooter}>
        <View style={styles.faqTags}>
          {item.tags.slice(0, 2).map((tag, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: theme.surface }]}>
              <Text style={[styles.tagText, { color: theme.textSecondary }]}>
                {tag}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.faqMeta}>
          <TouchableOpacity style={styles.helpfulButton}>
            <Ionicons name="thumbs-up-outline" size={16} color={theme.textSecondary} />
            <Text style={[styles.helpfulText, { color: theme.textSecondary }]}>
              {item.helpfulCount}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderTicket = ({ item }: { item: SupportTicket }) => (
    <TouchableOpacity style={[styles.ticketCard, { backgroundColor: theme.card }]}>
      <View style={styles.ticketHeader}>
        <Text style={[styles.ticketTitle, { color: theme.text }]}>
          {item.title}
        </Text>
        <View style={styles.ticketBadges}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.badgeText}>
              {item.status.toUpperCase()}
            </Text>
          </View>
          <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) }]}>
            <Text style={styles.badgeText}>
              {item.priority.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
      
      <Text style={[styles.ticketDescription, { color: theme.textSecondary }]} numberOfLines={2}>
        {item.description}
      </Text>
      
      <View style={styles.ticketFooter}>
        <Text style={[styles.ticketDate, { color: theme.textSecondary }]}>
          {formatDate(item.createdAt)}
        </Text>
        {item.assignedTo && (
          <Text style={[styles.assignedTo, { color: theme.textSecondary }]}>
            {isArabic ? 'مُعيّن لـ:' : 'Assigned to:'} {getText(item.assignedTo.name)}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderChatMessage = ({ item }: { item: any }) => (
    <View style={[
      styles.chatMessage,
      item.sender.role === 'user' ? styles.userMessage : styles.supportMessage
    ]}>
      <Text style={[styles.chatMessageText, { color: theme.text }]}>
        {item.content}
      </Text>
      <Text style={[styles.chatMessageTime, { color: theme.textSecondary }]}>
        {formatDate(item.createdAt)}
      </Text>
    </View>
  );

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
              {isArabic ? 'مركز المساعدة' : 'Help Center'}
            </Text>
            <Text style={styles.headerSubtitle}>
              {isArabic ? 'الدعم والمساعدة' : 'Support & Help'}
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Tabs */}
      <View style={[styles.tabsContainer, { backgroundColor: theme.surface }]}>
        <View style={styles.tabsContent}>
          {[
            { key: 'faq', label: { en: 'FAQ', ar: 'الأسئلة الشائعة' }, icon: 'help-circle-outline' },
            { key: 'tickets', label: { en: 'Tickets', ar: 'التذاكر' }, icon: 'ticket-outline' },
            { key: 'chat', label: { en: 'Live Chat', ar: 'دردشة مباشرة' }, icon: 'chatbubbles-outline' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tab,
                activeTab === tab.key && { backgroundColor: COLORS.primary }
              ]}
              onPress={() => setActiveTab(tab.key as any)}
            >
              <Ionicons 
                name={tab.icon as any} 
                size={20} 
                color={activeTab === tab.key ? COLORS.white : theme.textSecondary} 
              />
              <Text style={[
                styles.tabText,
                { color: activeTab === tab.key ? COLORS.white : theme.textSecondary }
              ]}>
                {getText(tab.label)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Search */}
      <View style={[styles.searchContainer, { backgroundColor: theme.surface }]}>
        <View style={[styles.searchBar, { backgroundColor: theme.background }]}>
          <Ionicons name="search" size={20} color={theme.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={isArabic ? 'البحث...' : 'Search...'}
            placeholderTextColor={theme.textSecondary}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={theme.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Categories (for FAQ tab) */}
      {activeTab === 'faq' && (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={[styles.categoriesContainer, { backgroundColor: theme.surface }]}
        >
          <View style={styles.categoriesContent}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.key}
                style={[
                  styles.categoryChip,
                  selectedCategory === category.key && { backgroundColor: COLORS.primary }
                ]}
                onPress={() => setSelectedCategory(category.key)}
              >
                <Text style={[
                  styles.categoryChipText,
                  { color: selectedCategory === category.key ? COLORS.white : theme.textSecondary }
                ]}>
                  {getText(category.label)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}

      {/* Content */}
      {activeTab === 'faq' && (
        <FlatList
          data={filteredFAQs}
          renderItem={renderFAQ}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.contentList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="help-circle-outline" size={64} color={theme.textSecondary} />
              <Text style={[styles.emptyTitle, { color: theme.text }]}>
                {isArabic ? 'لا توجد نتائج' : 'No results found'}
              </Text>
              <Text style={[styles.emptyDescription, { color: theme.textSecondary }]}>
                {isArabic 
                  ? 'جرب البحث بكلمات مختلفة'
                  : 'Try searching with different keywords'
                }
              </Text>
            </View>
          }
        />
      )}

      {activeTab === 'tickets' && (
        <View style={styles.ticketsContainer}>
          <View style={styles.ticketsHeader}>
            <Text style={[styles.ticketsTitle, { color: theme.text }]}>
              {isArabic ? 'تذاكر الدعم' : 'Support Tickets'}
            </Text>
            <TouchableOpacity 
              style={styles.newTicketButton}
              onPress={() => setShowNewTicketModal(true)}
            >
              <Ionicons name="add" size={20} color={COLORS.white} />
              <Text style={styles.newTicketButtonText}>
                {isArabic ? 'تذكرة جديدة' : 'New Ticket'}
              </Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={filteredTickets}
            renderItem={renderTicket}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.contentList}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="ticket-outline" size={64} color={theme.textSecondary} />
                <Text style={[styles.emptyTitle, { color: theme.text }]}>
                  {isArabic ? 'لا توجد تذاكر' : 'No tickets found'}
                </Text>
                <Text style={[styles.emptyDescription, { color: theme.textSecondary }]}>
                  {isArabic 
                    ? 'قم بإنشاء تذكرة دعم جديدة'
                    : 'Create a new support ticket'
                  }
                </Text>
              </View>
            }
          />
        </View>
      )}

      {activeTab === 'chat' && (
        <View style={styles.chatContainer}>
          <View style={styles.chatHeader}>
            <Text style={[styles.chatTitle, { color: theme.text }]}>
              {isArabic ? 'الدردشة المباشرة' : 'Live Chat'}
            </Text>
            <TouchableOpacity 
              style={styles.startChatButton}
              onPress={() => setShowChatModal(true)}
            >
              <Ionicons name="chatbubbles" size={20} color={COLORS.white} />
              <Text style={styles.startChatButtonText}>
                {isArabic ? 'بدء الدردشة' : 'Start Chat'}
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.chatInfo}>
            <Ionicons name="information-circle-outline" size={24} color={COLORS.primary} />
            <Text style={[styles.chatInfoText, { color: theme.textSecondary }]}>
              {isArabic 
                ? 'متاح من السبت إلى الخميس، 9 صباحاً - 6 مساءً'
                : 'Available Saturday to Thursday, 9 AM - 6 PM'
              }
            </Text>
          </View>
        </View>
      )}

      {/* New Ticket Modal */}
      <Modal
        visible={showNewTicketModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowNewTicketModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              {isArabic ? 'تذكرة دعم جديدة' : 'New Support Ticket'}
            </Text>
            
            <TextInput
              style={[styles.input, { 
                backgroundColor: theme.surface,
                color: theme.text,
                borderColor: theme.border 
              }]}
              value={newTicket.title}
              onChangeText={(text) => setNewTicket(prev => ({ ...prev, title: text }))}
              placeholder={isArabic ? 'عنوان التذكرة' : 'Ticket title'}
              placeholderTextColor={theme.textSecondary}
            />
            
            <TextInput
              style={[styles.textArea, { 
                backgroundColor: theme.surface,
                color: theme.text,
                borderColor: theme.border 
              }]}
              value={newTicket.description}
              onChangeText={(text) => setNewTicket(prev => ({ ...prev, description: text }))}
              placeholder={isArabic ? 'وصف المشكلة' : 'Describe the issue'}
              placeholderTextColor={theme.textSecondary}
              multiline
              numberOfLines={4}
            />

            <View style={styles.modalActions}>
              <CustomButton
                title={isArabic ? 'إلغاء' : 'Cancel'}
                onPress={() => setShowNewTicketModal(false)}
                variant="outline"
                style={styles.modalButton}
              />
              <CustomButton
                title={isArabic ? 'إنشاء' : 'Create'}
                onPress={handleCreateTicket}
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Chat Modal */}
      <Modal
        visible={showChatModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowChatModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.chatModalContent, { backgroundColor: theme.card }]}>
            <View style={styles.chatModalHeader}>
              <Text style={[styles.chatModalTitle, { color: theme.text }]}>
                {isArabic ? 'الدردشة المباشرة' : 'Live Chat'}
              </Text>
              <TouchableOpacity onPress={() => setShowChatModal(false)}>
                <Ionicons name="close" size={24} color={theme.textSecondary} />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={chatMessages}
              renderItem={renderChatMessage}
              keyExtractor={(item) => item.id}
              style={styles.chatMessages}
              contentContainerStyle={styles.chatMessagesContent}
            />
            
            <View style={[styles.chatInput, { backgroundColor: theme.surface }]}>
              <TextInput
                style={[styles.chatInputField, { 
                  backgroundColor: theme.background,
                  color: theme.text 
                }]}
                value={chatMessage}
                onChangeText={setChatMessage}
                placeholder={isArabic ? 'اكتب رسالتك...' : 'Type your message...'}
                placeholderTextColor={theme.textSecondary}
                multiline
              />
              <TouchableOpacity 
                style={styles.sendButton}
                onPress={handleSendChatMessage}
              >
                <Ionicons name="send" size={20} color={COLORS.white} />
              </TouchableOpacity>
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
  searchContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: BORDER_RADIUS.sm,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: TYPOGRAPHY.sizes.body1,
  },
  categoriesContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  categoriesContent: {
    flexDirection: 'row',
    padding: 20,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 8,
  },
  categoryChipText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  contentList: {
    padding: 20,
  },
  faqCard: {
    borderRadius: BORDER_RADIUS.md,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  faqQuestion: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 20,
    marginBottom: 12,
  },
  faqFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqTags: {
    flexDirection: 'row',
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
    marginRight: 6,
  },
  tagText: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  faqMeta: {
    flexDirection: 'row',
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
  ticketsContainer: {
    flex: 1,
  },
  ticketsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  ticketsTitle: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  newTicketButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: BORDER_RADIUS.sm,
  },
  newTicketButtonText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginLeft: 4,
  },
  ticketCard: {
    borderRadius: BORDER_RADIUS.md,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  ticketTitle: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.bold,
    flex: 1,
    marginRight: 8,
  },
  ticketBadges: {
    flexDirection: 'row',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
    marginRight: 4,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
  },
  badgeText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.white,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  ticketDescription: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 20,
    marginBottom: 8,
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketDate: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  assignedTo: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  chatContainer: {
    flex: 1,
    padding: 20,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chatTitle: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  startChatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: BORDER_RADIUS.sm,
  },
  startChatButtonText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginLeft: 4,
  },
  chatInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.primary + '20',
    borderRadius: BORDER_RADIUS.sm,
  },
  chatInfoText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: 8,
    flex: 1,
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
  modalContent: {
    width: '100%',
    maxWidth: 400,
    borderRadius: BORDER_RADIUS.md,
    padding: 24,
  },
  modalTitle: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: TYPOGRAPHY.sizes.body1,
    marginBottom: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: TYPOGRAPHY.sizes.body1,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  modalButton: {
    paddingHorizontal: 24,
  },
  chatModalContent: {
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
    borderRadius: BORDER_RADIUS.md,
  },
  chatModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  chatModalTitle: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  chatMessages: {
    flex: 1,
    maxHeight: 300,
  },
  chatMessagesContent: {
    padding: 20,
  },
  chatMessage: {
    marginBottom: 12,
    padding: 12,
    borderRadius: BORDER_RADIUS.sm,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-end',
  },
  supportMessage: {
    backgroundColor: COLORS.surface,
    alignSelf: 'flex-start',
  },
  chatMessageText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 20,
  },
  chatMessageTime: {
    fontSize: TYPOGRAPHY.sizes.caption,
    marginTop: 4,
  },
  chatInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  chatInputField: {
    flex: 1,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: TYPOGRAPHY.sizes.body1,
    marginRight: 8,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SupportHelpCenterScreen;

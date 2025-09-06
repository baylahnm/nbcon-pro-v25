import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  RefreshControl,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { RootState } from '../../store';
import { Language, MessageStatus, UserRole } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

const { width } = Dimensions.get('window');

interface Message {
  id: string;
  content: { en: string; ar: string };
  senderId: string;
  senderName: { en: string; ar: string };
  senderRole: UserRole;
  timestamp: string;
  status: MessageStatus;
  isRead: boolean;
  attachments?: {
    id: string;
    name: string;
    type: 'image' | 'document' | 'voice' | 'video';
    url: string;
  }[];
}

interface Conversation {
  id: string;
  projectId: string;
  projectTitle: { en: string; ar: string };
  participants: {
    id: string;
    name: { en: string; ar: string };
    role: UserRole;
    avatar?: string;
    isOnline: boolean;
  }[];
  lastMessage: Message;
  unreadCount: number;
  isArchived: boolean;
  isPinned: boolean;
  isMuted: boolean;
  lastActivity: string;
  messageCount: number;
}

const InAppMessagingHubScreen = () => {
  const navigation = useNavigation();
  const { language, isDarkMode, user } = useSelector((state: RootState) => state.app);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unread' | 'archived' | 'pinned'>('all');
  const [showArchived, setShowArchived] = useState(false);

  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  // Mock data - replace with actual API calls
  const conversations: Conversation[] = [
    {
      id: '1',
      projectId: 'proj_1',
      projectTitle: { en: 'Office Building MEP Design', ar: 'تصميم الأنظمة الكهروميكانيكية لمبنى مكتبي' },
      participants: [
        {
          id: 'client_1',
          name: { en: 'Ahmed Al-Rajhi', ar: 'أحمد الراجحي' },
          role: UserRole.CLIENT,
          isOnline: true,
        },
        {
          id: 'eng_1',
          name: { en: 'Sara Al-Mansouri', ar: 'سارة المنصوري' },
          role: UserRole.ENGINEER,
          isOnline: false,
        },
      ],
      lastMessage: {
        id: 'msg_1',
        content: { en: 'The MEP drawings are ready for review', ar: 'رسومات الأنظمة الكهروميكانيكية جاهزة للمراجعة' },
        senderId: 'eng_1',
        senderName: { en: 'Sara Al-Mansouri', ar: 'سارة المنصوري' },
        senderRole: UserRole.ENGINEER,
        timestamp: '2024-02-15T14:30:00Z',
        status: MessageStatus.DELIVERED,
        isRead: true,
        attachments: [
          {
            id: 'att_1',
            name: 'MEP_Drawings_v2.pdf',
            type: 'document',
            url: 'https://example.com/files/mep_drawings.pdf',
          },
        ],
      },
      unreadCount: 0,
      isArchived: false,
      isPinned: true,
      isMuted: false,
      lastActivity: '2024-02-15T14:30:00Z',
      messageCount: 45,
    },
    {
      id: '2',
      projectId: 'proj_2',
      projectTitle: { en: 'Residential Complex Survey', ar: 'مسح مجمع سكني' },
      participants: [
        {
          id: 'client_2',
          name: { en: 'Mohammed Al-Sheikh', ar: 'محمد الشيخ' },
          role: UserRole.CLIENT,
          isOnline: false,
        },
        {
          id: 'eng_2',
          name: { en: 'Khalid Al-Mutairi', ar: 'خالد المطيري' },
          role: UserRole.ENGINEER,
          isOnline: true,
        },
      ],
      lastMessage: {
        id: 'msg_2',
        content: { en: 'When can we schedule the site visit?', ar: 'متى يمكننا جدولة زيارة الموقع؟' },
        senderId: 'client_2',
        senderName: { en: 'Mohammed Al-Sheikh', ar: 'محمد الشيخ' },
        senderRole: UserRole.CLIENT,
        timestamp: '2024-02-15T12:15:00Z',
        status: MessageStatus.SENT,
        isRead: false,
      },
      unreadCount: 3,
      isArchived: false,
      isPinned: false,
      isMuted: false,
      lastActivity: '2024-02-15T12:15:00Z',
      messageCount: 12,
    },
    {
      id: '3',
      projectId: 'proj_3',
      projectTitle: { en: 'Industrial Plant Safety Audit', ar: 'مراجعة السلامة للمصنع الصناعي' },
      participants: [
        {
          id: 'client_3',
          name: { en: 'Fatima Al-Zahra', ar: 'فاطمة الزهراء' },
          role: UserRole.CLIENT,
          isOnline: true,
        },
        {
          id: 'eng_3',
          name: { en: 'Omar Al-Rashid', ar: 'عمر الراشد' },
          role: UserRole.ENGINEER,
          isOnline: true,
        },
      ],
      lastMessage: {
        id: 'msg_3',
        content: { en: 'Thanks for the quick response!', ar: 'شكراً على الرد السريع!' },
        senderId: 'client_3',
        senderName: { en: 'Fatima Al-Zahra', ar: 'فاطمة الزهراء' },
        senderRole: UserRole.CLIENT,
        timestamp: '2024-02-15T10:45:00Z',
        status: MessageStatus.DELIVERED,
        isRead: true,
      },
      unreadCount: 0,
      isArchived: false,
      isPinned: false,
      isMuted: false,
      lastActivity: '2024-02-15T10:45:00Z',
      messageCount: 28,
    },
    {
      id: '4',
      projectId: 'proj_4',
      projectTitle: { en: 'BIM Modeling for Hospital', ar: 'نمذجة معلومات البناء للمستشفى' },
      participants: [
        {
          id: 'client_4',
          name: { en: 'Abdullah Al-Mansouri', ar: 'عبدالله المنصوري' },
          role: UserRole.CLIENT,
          isOnline: false,
        },
        {
          id: 'eng_4',
          name: { en: 'Noura Al-Sheikh', ar: 'نورا الشيخ' },
          role: UserRole.ENGINEER,
          isOnline: false,
        },
      ],
      lastMessage: {
        id: 'msg_4',
        content: { en: 'Project completed successfully', ar: 'تم إكمال المشروع بنجاح' },
        senderId: 'eng_4',
        senderName: { en: 'Noura Al-Sheikh', ar: 'نورا الشيخ' },
        senderRole: UserRole.ENGINEER,
        timestamp: '2024-02-10T16:20:00Z',
        status: MessageStatus.DELIVERED,
        isRead: true,
      },
      unreadCount: 0,
      isArchived: true,
      isPinned: false,
      isMuted: false,
      lastActivity: '2024-02-10T16:20:00Z',
      messageCount: 67,
    },
  ];

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString(isArabic ? 'ar-SA' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
        weekday: 'short',
      });
    } else {
      return date.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const getMessageStatusIcon = (status: MessageStatus) => {
    switch (status) {
      case MessageStatus.SENT:
        return 'checkmark';
      case MessageStatus.DELIVERED:
        return 'checkmark-done';
      case MessageStatus.READ:
        return 'checkmark-done';
      case MessageStatus.FAILED:
        return 'close-circle';
      default:
        return 'time';
    }
  };

  const getMessageStatusColor = (status: MessageStatus) => {
    switch (status) {
      case MessageStatus.SENT:
        return COLORS.textSecondary;
      case MessageStatus.DELIVERED:
        return COLORS.textSecondary;
      case MessageStatus.READ:
        return COLORS.primary;
      case MessageStatus.FAILED:
        return COLORS.error;
      default:
        return COLORS.textSecondary;
    }
  };

  const filteredConversations = conversations.filter(conversation => {
    const matchesSearch = searchQuery === '' || 
      getText(conversation.projectTitle).toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.participants.some(p => 
        getText(p.name).toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      getText(conversation.lastMessage.content).toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = (() => {
      switch (selectedFilter) {
        case 'unread':
          return conversation.unreadCount > 0;
        case 'archived':
          return conversation.isArchived;
        case 'pinned':
          return conversation.isPinned;
        default:
          return !conversation.isArchived;
      }
    })();

    const matchesArchive = showArchived ? conversation.isArchived : !conversation.isArchived;
    
    return matchesSearch && matchesFilter && matchesArchive;
  }).sort((a, b) => {
    // Pinned conversations first, then by last activity
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
  });

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleConversationPress = (conversation: Conversation) => {
    // Navigate to conversation detail
    Alert.alert(
      getText(conversation.projectTitle),
      isArabic ? 'سيتم فتح المحادثة قريباً' : 'Conversation will open soon'
    );
  };

  const handleArchiveConversation = (conversationId: string) => {
    Alert.alert(
      isArabic ? 'تم الأرشفة' : 'Archived',
      isArabic ? 'تم أرشفة المحادثة' : 'Conversation archived'
    );
  };

  const handlePinConversation = (conversationId: string) => {
    Alert.alert(
      isArabic ? 'تم التثبيت' : 'Pinned',
      isArabic ? 'تم تثبيت المحادثة' : 'Conversation pinned'
    );
  };

  const handleMuteConversation = (conversationId: string) => {
    Alert.alert(
      isArabic ? 'تم كتم الصوت' : 'Muted',
      isArabic ? 'تم كتم إشعارات المحادثة' : 'Conversation notifications muted'
    );
  };

  const renderConversationCard = ({ item: conversation }: { item: Conversation }) => (
    <TouchableOpacity
      style={[styles.conversationCard, { backgroundColor: theme.card }]}
      onPress={() => handleConversationPress(conversation)}
    >
      <View style={styles.conversationHeader}>
        <View style={styles.conversationInfo}>
          <View style={styles.projectTitleRow}>
            <Text style={[styles.projectTitle, { color: theme.text }]}>
              {getText(conversation.projectTitle)}
            </Text>
            {conversation.isPinned && (
              <Ionicons name="pin" size={16} color={COLORS.primary} />
            )}
          </View>
          <Text style={[styles.participantsText, { color: theme.textSecondary }]}>
            {conversation.participants
              .filter(p => p.id !== user?.id)
              .map(p => getText(p.name))
              .join(', ')}
          </Text>
        </View>
        <View style={styles.conversationMeta}>
          <Text style={[styles.timestamp, { color: theme.textSecondary }]}>
            {formatTime(conversation.lastActivity)}
          </Text>
          <View style={styles.conversationActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handlePinConversation(conversation.id)}
            >
              <Ionicons 
                name={conversation.isPinned ? "pin" : "pin-outline"} 
                size={16} 
                color={theme.textSecondary} 
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleMuteConversation(conversation.id)}
            >
              <Ionicons 
                name={conversation.isMuted ? "volume-mute" : "volume-high"} 
                size={16} 
                color={theme.textSecondary} 
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleArchiveConversation(conversation.id)}
            >
              <Ionicons name="archive-outline" size={16} color={theme.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.messagePreview}>
        <View style={styles.messageContent}>
          <Text style={[styles.senderName, { color: theme.textSecondary }]}>
            {getText(conversation.lastMessage.senderName)}:
          </Text>
          <Text 
            style={[
              styles.messageText, 
              { 
                color: conversation.unreadCount > 0 ? theme.text : theme.textSecondary,
                fontWeight: conversation.unreadCount > 0 ? TYPOGRAPHY.weights.medium : TYPOGRAPHY.weights.normal
              }
            ]}
            numberOfLines={2}
          >
            {getText(conversation.lastMessage.content)}
          </Text>
        </View>
        <View style={styles.messageMeta}>
          {conversation.lastMessage.attachments && conversation.lastMessage.attachments.length > 0 && (
            <Ionicons name="attach" size={14} color={theme.textSecondary} />
          )}
          <Ionicons 
            name={getMessageStatusIcon(conversation.lastMessage.status)} 
            size={14} 
            color={getMessageStatusColor(conversation.lastMessage.status)} 
          />
        </View>
      </View>

      <View style={styles.conversationFooter}>
        <View style={styles.messageCount}>
          <Text style={[styles.messageCountText, { color: theme.textSecondary }]}>
            {conversation.messageCount} {isArabic ? 'رسالة' : 'messages'}
          </Text>
        </View>
        {conversation.unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadCount}>
              {conversation.unreadCount}
            </Text>
          </View>
        )}
        <View style={styles.participantAvatars}>
          {conversation.participants
            .filter(p => p.id !== user?.id)
            .slice(0, 3)
            .map((participant, index) => (
              <View 
                key={participant.id} 
                style={[
                  styles.avatar, 
                  { 
                    backgroundColor: COLORS.primary,
                    marginLeft: index > 0 ? -8 : 0,
                    zIndex: 3 - index
                  }
                ]}
              >
                <Text style={styles.avatarText}>
                  {getText(participant.name).charAt(0).toUpperCase()}
                </Text>
                {participant.isOnline && (
                  <View style={styles.onlineIndicator} />
                )}
              </View>
            ))}
        </View>
      </View>
    </TouchableOpacity>
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
              {isArabic ? 'الرسائل' : 'Messages'}
            </Text>
            <Text style={styles.headerSubtitle}>
              {isArabic 
                ? `${filteredConversations.length} محادثة`
                : `${filteredConversations.length} conversations`
              }
            </Text>
          </View>
          <TouchableOpacity style={styles.newMessageButton}>
            <Ionicons name="create-outline" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: theme.surface }]}>
        <View style={[styles.searchBar, { backgroundColor: theme.background }]}>
          <Ionicons name="search" size={20} color={theme.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={isArabic ? 'البحث في المحادثات...' : 'Search conversations...'}
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
      <View style={[styles.filtersContainer, { backgroundColor: theme.surface }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filtersContent}>
            {[
              { key: 'all', label: { en: 'All', ar: 'الكل' }, icon: 'chatbubbles-outline' },
              { key: 'unread', label: { en: 'Unread', ar: 'غير مقروء' }, icon: 'mail-unread-outline' },
              { key: 'pinned', label: { en: 'Pinned', ar: 'مثبت' }, icon: 'pin-outline' },
              { key: 'archived', label: { en: 'Archived', ar: 'مؤرشف' }, icon: 'archive-outline' },
            ].map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterChip,
                  selectedFilter === filter.key && { backgroundColor: COLORS.primary }
                ]}
                onPress={() => setSelectedFilter(filter.key as any)}
              >
                <Ionicons 
                  name={filter.icon as any} 
                  size={16} 
                  color={selectedFilter === filter.key ? COLORS.white : theme.textSecondary} 
                />
                <Text style={[
                  styles.filterChipText,
                  { color: selectedFilter === filter.key ? COLORS.white : theme.textSecondary }
                ]}>
                  {getText(filter.label)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Archive Toggle */}
      <View style={[styles.archiveToggleContainer, { backgroundColor: theme.surface }]}>
        <TouchableOpacity
          style={[styles.archiveToggle, { backgroundColor: theme.background }]}
          onPress={() => setShowArchived(!showArchived)}
        >
          <Ionicons 
            name={showArchived ? "archive" : "archive-outline"} 
            size={20} 
            color={theme.textSecondary} 
          />
          <Text style={[styles.archiveToggleText, { color: theme.textSecondary }]}>
            {isArabic 
              ? (showArchived ? 'إخفاء المؤرشف' : 'عرض المؤرشف')
              : (showArchived ? 'Hide Archived' : 'Show Archived')
            }
          </Text>
        </TouchableOpacity>
      </View>

      {/* Conversations List */}
      <FlatList
        data={filteredConversations}
        renderItem={renderConversationCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.conversationsList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="chatbubbles-outline" size={64} color={theme.textSecondary} />
            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              {isArabic ? 'لا توجد محادثات' : 'No conversations'}
            </Text>
            <Text style={[styles.emptyDescription, { color: theme.textSecondary }]}>
              {isArabic 
                ? 'ستظهر المحادثات هنا عند بدء مشروع جديد'
                : 'Conversations will appear here when you start a new project'
              }
            </Text>
            <CustomButton
              title={isArabic ? 'بدء محادثة جديدة' : 'Start New Conversation'}
              onPress={() => {}}
              style={styles.emptyButton}
            />
          </View>
        }
      />
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
  newMessageButton: {
    padding: 4,
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
  filtersContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filtersContent: {
    padding: 20,
    flexDirection: 'row',
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginLeft: 4,
  },
  archiveToggleContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  archiveToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: BORDER_RADIUS.sm,
    alignSelf: 'flex-start',
  },
  archiveToggleText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: 8,
  },
  conversationsList: {
    padding: 20,
  },
  conversationCard: {
    borderRadius: BORDER_RADIUS.md,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  conversationInfo: {
    flex: 1,
    marginRight: 12,
  },
  projectTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  projectTitle: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginRight: 8,
  },
  participantsText: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  conversationMeta: {
    alignItems: 'flex-end',
  },
  timestamp: {
    fontSize: TYPOGRAPHY.sizes.caption,
    marginBottom: 8,
  },
  conversationActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 4,
    marginLeft: 4,
  },
  messagePreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  messageContent: {
    flex: 1,
    marginRight: 12,
  },
  senderName: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: 2,
  },
  messageText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 18,
  },
  messageMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  conversationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageCount: {
    flex: 1,
  },
  messageCountText: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  unreadBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 8,
  },
  unreadCount: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.white,
  },
  participantAvatars: {
    flexDirection: 'row',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.white,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.success,
    borderWidth: 2,
    borderColor: COLORS.white,
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
    marginBottom: 24,
  },
  emptyButton: {
    paddingHorizontal: 24,
  },
});

export default InAppMessagingHubScreen;

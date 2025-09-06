import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import CustomButton from '../../components/CustomButton';

interface Conversation {
  id: string;
  recipientName: string;
  recipientAvatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  type: 'direct' | 'group' | 'support';
  projectRelated?: string;
}

interface QuickAction {
  id: string;
  title: string;
  icon: string;
  color: string;
  onPress: () => void;
}

const MessagingDashboardScreen = ({ navigation }: any) => {
  const { isDarkMode } = useTheme();
  const { language, getText } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'groups'>('all');

  const conversations: Conversation[] = [
    {
      id: '1',
      recipientName: 'Ahmed Al-Mahmoud',
      recipientAvatar: '👨‍💼',
      lastMessage: 'The structural plans are ready for review',
      timestamp: '2 min ago',
      unreadCount: 3,
      isOnline: true,
      type: 'direct',
      projectRelated: 'Riyadh Tower Project',
    },
    {
      id: '2',
      recipientName: 'Engineering Team',
      recipientAvatar: '👥',
      lastMessage: 'Sarah: Meeting scheduled for tomorrow',
      timestamp: '15 min ago',
      unreadCount: 0,
      isOnline: false,
      type: 'group',
    },
    {
      id: '3',
      recipientName: 'NBCON Support',
      recipientAvatar: '🛠️',
      lastMessage: 'Your verification has been completed',
      timestamp: '1 hour ago',
      unreadCount: 1,
      isOnline: true,
      type: 'support',
    },
    {
      id: '4',
      recipientName: 'Fatima Al-Zahra',
      recipientAvatar: '👩‍💼',
      lastMessage: 'Can we discuss the budget revisions?',
      timestamp: '2 hours ago',
      unreadCount: 0,
      isOnline: false,
      type: 'direct',
      projectRelated: 'Jeddah Mall Renovation',
    },
    {
      id: '5',
      recipientName: 'Project Managers',
      recipientAvatar: '📋',
      lastMessage: 'Omar: Updated project timeline attached',
      timestamp: '3 hours ago',
      unreadCount: 5,
      isOnline: false,
      type: 'group',
    },
  ];

  const quickActions: QuickAction[] = [
    {
      id: '1',
      title: getText('newMessage', 'New Message'),
      icon: 'create-outline',
      color: '#6366F1',
      onPress: () => navigation.navigate('NewMessage'),
    },
    {
      id: '2',
      title: getText('groupChat', 'Group Chat'),
      icon: 'people-outline',
      color: '#10B981',
      onPress: () => navigation.navigate('GroupChatCreate'),
    },
    {
      id: '3',
      title: getText('supportChat', 'Support'),
      icon: 'help-circle-outline',
      color: '#F59E0B',
      onPress: () => navigation.navigate('SupportChat'),
    },
    {
      id: '4',
      title: getText('notifications', 'Notifications'),
      icon: 'notifications-outline',
      color: '#EF4444',
      onPress: () => navigation.navigate('NotificationSettings'),
    },
  ];

  const getFilteredConversations = () => {
    let filtered = conversations;

    if (activeTab === 'unread') {
      filtered = filtered.filter(conv => conv.unreadCount > 0);
    } else if (activeTab === 'groups') {
      filtered = filtered.filter(conv => conv.type === 'group');
    }

    if (searchQuery) {
      filtered = filtered.filter(conv => 
        conv.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const getTotalUnreadCount = () => {
    return conversations.reduce((total, conv) => total + conv.unreadCount, 0);
  };

  const getConversationIcon = (type: string) => {
    switch (type) {
      case 'group': return 'people';
      case 'support': return 'help-circle';
      default: return 'person';
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#111827' : '#F9FAFB',
    },
    header: {
      padding: 20,
      paddingTop: 10,
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 8,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    headerSubtitle: {
      fontSize: 16,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: language === 'ar' ? 'right' : 'left',
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
    quickActions: {
      paddingHorizontal: 20,
      marginBottom: 10,
    },
    quickActionsGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    quickActionCard: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderRadius: 12,
      padding: 16,
      marginHorizontal: 4,
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
    tabsContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    tab: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      marginRight: language === 'ar' ? 0 : 8,
      marginLeft: language === 'ar' ? 8 : 0,
      backgroundColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    activeTab: {
      backgroundColor: '#6366F1',
    },
    tabText: {
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
    },
    activeTabText: {
      color: '#FFFFFF',
    },
    unreadBadge: {
      position: 'absolute',
      top: -4,
      right: language === 'ar' ? -8 : -4,
      left: language === 'ar' ? -4 : undefined,
      backgroundColor: '#EF4444',
      borderRadius: 8,
      paddingHorizontal: 6,
      paddingVertical: 2,
      minWidth: 16,
      alignItems: 'center',
    },
    badgeText: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    conversationsList: {
      flex: 1,
      paddingHorizontal: 20,
    },
    conversationCard: {
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    unreadConversation: {
      backgroundColor: isDarkMode ? '#1E1B4B' : '#F8FAFF',
      borderLeftWidth: 4,
      borderLeftColor: '#6366F1',
    },
    avatarContainer: {
      position: 'relative',
      marginRight: language === 'ar' ? 0 : 12,
      marginLeft: language === 'ar' ? 12 : 0,
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: isDarkMode ? '#4B5563' : '#E5E7EB',
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarText: {
      fontSize: 20,
    },
    onlineIndicator: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: '#10B981',
      borderWidth: 2,
      borderColor: isDarkMode ? '#1F2937' : '#FFFFFF',
    },
    conversationInfo: {
      flex: 1,
    },
    conversationHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    recipientName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      flex: 1,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    timestamp: {
      fontSize: 12,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
    },
    conversationMeta: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    lastMessage: {
      fontSize: 14,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      flex: 1,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    unreadMessage: {
      color: isDarkMode ? '#D1D5DB' : '#4B5563',
      fontWeight: '600',
    },
    conversationActions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    typeIcon: {
      marginRight: language === 'ar' ? 0 : 8,
      marginLeft: language === 'ar' ? 8 : 0,
    },
    projectTag: {
      backgroundColor: isDarkMode ? '#374151' : '#F3F4F6',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 4,
      marginTop: 4,
    },
    projectTagText: {
      fontSize: 10,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
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
        <Text style={styles.headerTitle}>
          {getText('messages', 'Messages')}
        </Text>
        <Text style={styles.headerSubtitle}>
          {conversations.length} {getText('conversations', 'conversations')}, {getTotalUnreadCount()} {getText('unread', 'unread')}
        </Text>
      </Animated.View>

      <Animated.View entering={SlideInUp.delay(100)} style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={isDarkMode ? '#9CA3AF' : '#6B7280'}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder={getText('searchMessages', 'Search messages or contacts...')}
          placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </Animated.View>

      <Animated.View entering={SlideInUp.delay(200)} style={styles.quickActions}>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action) => (
            <Pressable
              key={action.id}
              style={styles.quickActionCard}
              onPress={action.onPress}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: action.color + '20' }]}>
                <Ionicons
                  name={action.icon as any}
                  size={20}
                  color={action.color}
                />
              </View>
              <Text style={styles.quickActionTitle}>{action.title}</Text>
            </Pressable>
          ))}
        </View>
      </Animated.View>

      <View style={styles.tabsContainer}>
        <Pressable
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
            {getText('all', 'All')}
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'unread' && styles.activeTab]}
          onPress={() => setActiveTab('unread')}
        >
          <View style={{ position: 'relative' }}>
            <Text style={[styles.tabText, activeTab === 'unread' && styles.activeTabText]}>
              {getText('unread', 'Unread')}
            </Text>
            {getTotalUnreadCount() > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.badgeText}>{getTotalUnreadCount()}</Text>
              </View>
            )}
          </View>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'groups' && styles.activeTab]}
          onPress={() => setActiveTab('groups')}
        >
          <Text style={[styles.tabText, activeTab === 'groups' && styles.activeTabText]}>
            {getText('groups', 'Groups')}
          </Text>
        </Pressable>
      </View>

      <ScrollView style={styles.conversationsList} showsVerticalScrollIndicator={false}>
        {getFilteredConversations().map((conversation, index) => (
          <Animated.View
            key={conversation.id}
            entering={SlideInUp.delay(300 + index * 50)}
          >
            <Pressable
              style={[
                styles.conversationCard,
                conversation.unreadCount > 0 && styles.unreadConversation
              ]}
              onPress={() => navigation.navigate('ChatScreen', { conversationId: conversation.id })}
            >
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{conversation.recipientAvatar}</Text>
                </View>
                {conversation.isOnline && <View style={styles.onlineIndicator} />}
              </View>

              <View style={styles.conversationInfo}>
                <View style={styles.conversationHeader}>
                  <Text style={styles.recipientName}>{conversation.recipientName}</Text>
                  <Text style={styles.timestamp}>{conversation.timestamp}</Text>
                </View>

                <View style={styles.conversationMeta}>
                  <Text style={[
                    styles.lastMessage,
                    conversation.unreadCount > 0 && styles.unreadMessage
                  ]}>
                    {conversation.lastMessage}
                  </Text>
                  <View style={styles.conversationActions}>
                    <Ionicons
                      name={getConversationIcon(conversation.type) as any}
                      size={14}
                      color={isDarkMode ? '#6B7280' : '#9CA3AF'}
                      style={styles.typeIcon}
                    />
                    {conversation.unreadCount > 0 && (
                      <View style={styles.unreadBadge}>
                        <Text style={styles.badgeText}>{conversation.unreadCount}</Text>
                      </View>
                    )}
                  </View>
                </View>

                {conversation.projectRelated && (
                  <View style={styles.projectTag}>
                    <Text style={styles.projectTagText}>{conversation.projectRelated}</Text>
                  </View>
                )}
              </View>
            </Pressable>
          </Animated.View>
        ))}

        {getFilteredConversations().length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons
              name="chatbubble-outline"
              size={64}
              color={isDarkMode ? '#4B5563' : '#D1D5DB'}
              style={styles.emptyStateIcon}
            />
            <Text style={styles.emptyStateTitle}>
              {searchQuery 
                ? getText('noSearchResults', 'No messages found')
                : getText('noMessages', 'No messages yet')
              }
            </Text>
            <Text style={styles.emptyStateDescription}>
              {searchQuery
                ? getText('tryDifferentSearch', 'Try searching with different keywords')
                : getText('startConversation', 'Start a conversation by sending your first message')
              }
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MessagingDashboardScreen;
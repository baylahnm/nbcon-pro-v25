import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../constants';
import ChatService, { Message, ChatRoom } from '../../services/chatService';
import NotificationService from '../../services/notificationService';

const MessagesScreen: React.FC = () => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  useEffect(() => {
    initializeChat();
    loadChatRooms();
  }, []);

  useEffect(() => {
    if (selectedRoom) {
      loadMessages(selectedRoom.id);
    }
  }, [selectedRoom]);

  const initializeChat = async () => {
    try {
      const connected = await ChatService.connect();
      setIsConnected(connected);

      if (connected) {
        // Setup chat event listeners
        ChatService.on('chatRoomCreated', handleChatRoomCreated);
        ChatService.on('messageSent', handleMessageSent);
        ChatService.on('messageDelivered', handleMessageDelivered);
        ChatService.on('typingIndicator', handleTypingIndicator);
        ChatService.on('connected', () => setIsConnected(true));
        ChatService.on('disconnected', () => setIsConnected(false));
      }
    } catch (error) {
      console.error('Error initializing chat:', error);
    }
  };

  const loadChatRooms = () => {
    // Mock data - in real app, this would come from API
    const mockChatRooms: ChatRoom[] = [
      {
        id: 'chat_1',
        jobId: 'job_1',
        jobTitle: 'Site Survey for NEOM Project',
        participants: {
          clientId: 'client_1',
          clientName: 'Ahmed Al-Rashid',
          engineerId: 'engineer_1',
          engineerName: 'Sarah Al-Mansouri',
        },
        unreadCount: 2,
        isActive: true,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-20'),
        lastMessage: {
          id: 'msg_1',
          senderId: 'engineer_1',
          senderName: 'Sarah Al-Mansouri',
          senderType: 'engineer',
          content: 'I\'ll be on-site tomorrow at 9 AM',
          timestamp: new Date('2024-01-20T14:30:00'),
          type: 'text',
          status: 'read',
          jobId: 'job_1',
        },
      },
      {
        id: 'chat_2',
        jobId: 'job_2',
        jobTitle: 'MEP Design Review',
        participants: {
          clientId: 'client_2',
          clientName: 'Sarah Al-Mansouri',
          engineerId: 'engineer_2',
          engineerName: 'Ahmed Al-Rashid',
        },
        unreadCount: 0,
        isActive: true,
        createdAt: new Date('2024-01-18'),
        updatedAt: new Date('2024-01-19'),
        lastMessage: {
          id: 'msg_2',
          senderId: 'client_2',
          senderName: 'Sarah Al-Mansouri',
          senderType: 'client',
          content: 'Thank you for the quick response!',
          timestamp: new Date('2024-01-19T16:45:00'),
          type: 'text',
          status: 'read',
          jobId: 'job_2',
        },
      },
    ];

    setChatRooms(mockChatRooms);
  };

  const loadMessages = (chatRoomId: string) => {
    const roomMessages = ChatService.getMessages(chatRoomId);
    setMessages(roomMessages);
  };

  const handleChatRoomCreated = (chatRoom: ChatRoom) => {
    setChatRooms(prev => [...prev, chatRoom]);
  };

  const handleMessageSent = (message: Message, chatRoomId: string) => {
    if (selectedRoom?.id === chatRoomId) {
      setMessages(prev => [...prev, message]);
      scrollToBottom();
    }
  };

  const handleMessageDelivered = (message: Message, chatRoomId: string) => {
    if (selectedRoom?.id === chatRoomId) {
      setMessages(prev => 
        prev.map(msg => msg.id === message.id ? message : msg)
      );
    }
  };

  const handleTypingIndicator = (chatRoomId: string, indicator: any) => {
    if (selectedRoom?.id === chatRoomId) {
      if (indicator.isTyping) {
        setTypingUsers(prev => [...prev.filter(u => u !== indicator.userName), indicator.userName]);
      } else {
        setTypingUsers(prev => prev.filter(u => u !== indicator.userName));
      }
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedRoom) return;

    try {
      const message = await ChatService.sendMessage(
        selectedRoom.id,
        'current_user_id', // In real app, get from auth state
        'Current User', // In real app, get from auth state
        'client', // In real app, get from user role
        newMessage.trim()
      );

      setNewMessage('');
      
      // Send notification to other participant
      const otherParticipant = selectedRoom.participants.engineerId;
      await NotificationService.sendMessageNotification(
        'Current User',
        newMessage.trim(),
        selectedRoom.jobTitle
      );
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert(
        isArabic ? 'خطأ' : 'Error',
        isArabic ? 'فشل في إرسال الرسالة' : 'Failed to send message'
      );
    }
  };

  const handleTyping = (text: string) => {
    setNewMessage(text);
    
    if (selectedRoom) {
      ChatService.sendTypingIndicator(
        selectedRoom.id,
        'current_user_id',
        'Current User',
        text.length > 0
      );
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isCurrentUser = item.senderId === 'current_user_id';
    
    return (
      <View style={[
        styles.messageContainer,
        isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage
      ]}>
        <View style={[
          styles.messageBubble,
          {
            backgroundColor: isCurrentUser ? COLORS.primary : theme.surface,
            alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
          }
        ]}>
          <Text style={[
            styles.messageText,
            { color: isCurrentUser ? 'white' : theme.text }
          ]}>
            {item.content}
          </Text>
          <Text style={[
            styles.messageTime,
            { color: isCurrentUser ? 'rgba(255,255,255,0.7)' : theme.textSecondary }
          ]}>
            {formatTime(item.timestamp)}
          </Text>
        </View>
      </View>
    );
  };

  const renderChatRoom = ({ item }: { item: ChatRoom }) => (
    <TouchableOpacity
      style={[
        styles.chatRoomItem,
        { 
          backgroundColor: selectedRoom?.id === item.id ? COLORS.primary + '20' : theme.surface,
          borderColor: selectedRoom?.id === item.id ? COLORS.primary : theme.border,
        }
      ]}
      onPress={() => setSelectedRoom(item)}
    >
      <View style={styles.chatRoomInfo}>
        <Text style={[styles.chatRoomTitle, { color: theme.text }]}>
          {item.jobTitle}
        </Text>
        <Text style={[styles.chatRoomParticipant, { color: theme.textSecondary }]}>
          {item.participants.engineerName}
        </Text>
        {item.lastMessage && (
          <Text style={[styles.lastMessage, { color: theme.textSecondary }]}>
            {item.lastMessage.content}
          </Text>
        )}
      </View>
      
      <View style={styles.chatRoomMeta}>
        {item.lastMessage && (
          <Text style={[styles.lastMessageTime, { color: theme.textSecondary }]}>
            {formatTime(item.lastMessage.timestamp)}
          </Text>
        )}
        {item.unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadCount}>
              {item.unreadCount > 99 ? '99+' : item.unreadCount}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderTypingIndicator = () => {
    if (typingUsers.length === 0) return null;

    return (
      <View style={styles.typingIndicator}>
        <Text style={[styles.typingText, { color: theme.textSecondary }]}>
          {typingUsers.join(', ')} {isArabic ? 'يكتب...' : 'typing...'}
        </Text>
      </View>
    );
  };

  if (!selectedRoom) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            {isArabic ? 'المحادثات' : 'Messages'}
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {isArabic ? 'اختر محادثة للبدء' : 'Select a conversation to start'}
          </Text>
        </View>

        <FlatList
          data={chatRooms}
          renderItem={renderChatRoom}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.chatRoomsList}
        />

        {!isConnected && (
          <View style={styles.connectionStatus}>
            <Ionicons name="warning" size={20} color={COLORS.warning} />
            <Text style={[styles.connectionText, { color: COLORS.warning }]}>
              {isArabic ? 'غير متصل' : 'Not Connected'}
            </Text>
          </View>
        )}
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Chat Header */}
      <View style={[styles.chatHeader, { backgroundColor: theme.surface }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setSelectedRoom(null)}
        >
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        
        <View style={styles.chatHeaderInfo}>
          <Text style={[styles.chatTitle, { color: theme.text }]}>
            {selectedRoom.jobTitle}
          </Text>
          <Text style={[styles.chatSubtitle, { color: theme.textSecondary }]}>
            {selectedRoom.participants.engineerName}
          </Text>
        </View>
        
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-vertical" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      {/* Messages List */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={scrollToBottom}
      />

      {/* Typing Indicator */}
      {renderTypingIndicator()}

      {/* Message Input */}
      <View style={[styles.messageInput, { backgroundColor: theme.surface }]}>
        <TouchableOpacity style={styles.attachButton}>
          <Ionicons name="attach" size={24} color={theme.textSecondary} />
        </TouchableOpacity>
        
        <TextInput
          style={[
            styles.textInput,
            { 
              backgroundColor: theme.background,
              color: theme.text,
              borderColor: theme.border,
            }
          ]}
          value={newMessage}
          onChangeText={handleTyping}
          placeholder={isArabic ? 'اكتب رسالة...' : 'Type a message...'}
          placeholderTextColor={theme.textSecondary}
          multiline
          maxLength={1000}
        />
        
        <TouchableOpacity 
          style={[
            styles.sendButton,
            { 
              backgroundColor: newMessage.trim() ? COLORS.primary : theme.border,
              opacity: newMessage.trim() ? 1 : 0.5,
            }
          ]}
          onPress={sendMessage}
          disabled={!newMessage.trim()}
        >
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.h2,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.regular,
  },
  chatRoomsList: {
    padding: SPACING.lg,
  },
  chatRoomItem: {
    flexDirection: 'row',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    marginBottom: SPACING.sm,
  },
  chatRoomInfo: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  chatRoomTitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  chatRoomParticipant: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginBottom: SPACING.xs,
  },
  lastMessage: {
    fontSize: TYPOGRAPHY.sizes.caption,
    lineHeight: 16,
  },
  chatRoomMeta: {
    alignItems: 'flex-end',
  },
  lastMessageTime: {
    fontSize: TYPOGRAPHY.sizes.caption,
    marginBottom: SPACING.xs,
  },
  unreadBadge: {
    backgroundColor: COLORS.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadCount: {
    color: 'white',
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
  },
  connectionText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: SPACING.sm,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light.border,
  },
  backButton: {
    marginRight: SPACING.sm,
  },
  chatHeaderInfo: {
    flex: 1,
  },
  chatTitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  chatSubtitle: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  moreButton: {
    marginLeft: SPACING.sm,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    padding: SPACING.md,
  },
  messageContainer: {
    marginBottom: SPACING.sm,
  },
  currentUserMessage: {
    alignItems: 'flex-end',
  },
  otherUserMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
  },
  messageText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 18,
    marginBottom: SPACING.xs,
  },
  messageTime: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  typingIndicator: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  typingText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontStyle: 'italic',
  },
  messageInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.light.border,
  },
  attachButton: {
    marginRight: SPACING.sm,
    padding: SPACING.sm,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: TYPOGRAPHY.sizes.body2,
    maxHeight: 100,
    marginRight: SPACING.sm,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MessagesScreen;

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, SlideInUp, SlideInRight } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  senderId: string;
  senderName: string;
  type: 'text' | 'image' | 'file' | 'system';
  status: 'sending' | 'sent' | 'delivered' | 'read';
  replyTo?: string;
  attachments?: any[];
}

interface ChatParticipant {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: string;
}

const ChatScreen = ({ route, navigation }: any) => {
  const { isDarkMode } = useTheme();
  const { language, getText } = useLanguage();
  const { conversationId } = route.params;
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const currentUserId = 'user1';

  const participant: ChatParticipant = {
    id: 'user2',
    name: 'Ahmed Al-Mahmoud',
    avatar: '👨‍💼',
    isOnline: true,
    lastSeen: '2 minutes ago',
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I wanted to discuss the structural plans for the Riyadh Tower project.',
      timestamp: '10:30 AM',
      senderId: 'user2',
      senderName: 'Ahmed Al-Mahmoud',
      type: 'text',
      status: 'read',
    },
    {
      id: '2',
      text: 'Sure! I\'ve reviewed the initial drawings. They look great overall.',
      timestamp: '10:32 AM',
      senderId: currentUserId,
      senderName: 'You',
      type: 'text',
      status: 'read',
    },
    {
      id: '3',
      text: 'I have a few suggestions regarding the foundation design. Can we schedule a meeting?',
      timestamp: '10:35 AM',
      senderId: 'user2',
      senderName: 'Ahmed Al-Mahmoud',
      type: 'text',
      status: 'read',
    },
    {
      id: '4',
      text: 'Absolutely! How about tomorrow at 2 PM? I can share my screen to go through the details.',
      timestamp: '10:37 AM',
      senderId: currentUserId,
      senderName: 'You',
      type: 'text',
      status: 'read',
    },
    {
      id: '5',
      text: 'Perfect! I\'ll send you the updated plans by end of day.',
      timestamp: '10:40 AM',
      senderId: 'user2',
      senderName: 'Ahmed Al-Mahmoud',
      type: 'text',
      status: 'delivered',
    },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        senderId: currentUserId,
        senderName: 'You',
        type: 'text',
        status: 'sending',
      };

      setMessages(prev => [...prev, newMessage]);
      setMessage('');

      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
          )
        );
      }, 1000);

      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
          )
        );
      }, 2000);

      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case 'sending': return 'time-outline';
      case 'sent': return 'checkmark-outline';
      case 'delivered': return 'checkmark-done-outline';
      case 'read': return 'checkmark-done-outline';
      default: return 'time-outline';
    }
  };

  const getMessageStatusColor = (status: string) => {
    switch (status) {
      case 'sending': return '#9CA3AF';
      case 'sent': return '#9CA3AF';
      case 'delivered': return '#6366F1';
      case 'read': return '#10B981';
      default: return '#9CA3AF';
    }
  };

  const handleAttachment = () => {
    Alert.alert(
      getText('attachments', 'Attachments'),
      getText('selectAttachment', 'Select attachment type'),
      [
        { text: getText('camera', 'Camera'), onPress: () => console.log('Camera') },
        { text: getText('gallery', 'Gallery'), onPress: () => console.log('Gallery') },
        { text: getText('document', 'Document'), onPress: () => console.log('Document') },
        { text: getText('cancel', 'Cancel'), style: 'cancel' },
      ]
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
      padding: 16,
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    backButton: {
      marginRight: language === 'ar' ? 0 : 12,
      marginLeft: language === 'ar' ? 12 : 0,
      padding: 8,
    },
    participantInfo: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: isDarkMode ? '#4B5563' : '#E5E7EB',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: language === 'ar' ? 0 : 12,
      marginLeft: language === 'ar' ? 12 : 0,
      position: 'relative',
    },
    avatarText: {
      fontSize: 16,
    },
    onlineIndicator: {
      position: 'absolute',
      bottom: -2,
      right: -2,
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: '#10B981',
      borderWidth: 2,
      borderColor: isDarkMode ? '#1F2937' : '#FFFFFF',
    },
    participantDetails: {
      flex: 1,
    },
    participantName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    participantStatus: {
      fontSize: 12,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    headerActions: {
      flexDirection: 'row',
      gap: 8,
    },
    headerButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: isDarkMode ? '#374151' : '#F3F4F6',
      justifyContent: 'center',
      alignItems: 'center',
    },
    messagesContainer: {
      flex: 1,
    },
    messagesList: {
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    messageWrapper: {
      marginVertical: 4,
    },
    sentMessageWrapper: {
      alignItems: 'flex-end',
    },
    receivedMessageWrapper: {
      alignItems: 'flex-start',
    },
    messageBubble: {
      maxWidth: '80%',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    sentMessage: {
      backgroundColor: '#6366F1',
      borderBottomRightRadius: 4,
    },
    receivedMessage: {
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderBottomLeftRadius: 4,
    },
    messageText: {
      fontSize: 16,
      lineHeight: 22,
    },
    sentMessageText: {
      color: '#FFFFFF',
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    receivedMessageText: {
      color: isDarkMode ? '#FFFFFF' : '#111827',
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    messageFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginTop: 4,
      paddingHorizontal: 4,
    },
    timestamp: {
      fontSize: 11,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      marginRight: language === 'ar' ? 0 : 4,
      marginLeft: language === 'ar' ? 4 : 0,
    },
    statusIcon: {
      marginLeft: language === 'ar' ? 0 : 2,
      marginRight: language === 'ar' ? 2 : 0,
    },
    typingIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    typingBubble: {
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 16,
      borderBottomLeftRadius: 4,
      maxWidth: '60%',
    },
    typingText: {
      fontSize: 14,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      fontStyle: 'italic',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      padding: 16,
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    attachmentButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: isDarkMode ? '#374151' : '#F3F4F6',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: language === 'ar' ? 0 : 8,
      marginLeft: language === 'ar' ? 8 : 0,
    },
    textInputContainer: {
      flex: 1,
      maxHeight: 100,
      backgroundColor: isDarkMode ? '#374151' : '#F3F4F6',
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginRight: language === 'ar' ? 0 : 8,
      marginLeft: language === 'ar' ? 8 : 0,
    },
    textInput: {
      fontSize: 16,
      color: isDarkMode ? '#FFFFFF' : '#111827',
      textAlign: language === 'ar' ? 'right' : 'left',
      minHeight: 20,
    },
    sendButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: '#6366F1',
      justifyContent: 'center',
      alignItems: 'center',
    },
    sendButtonDisabled: {
      backgroundColor: isDarkMode ? '#4B5563' : '#D1D5DB',
    },
    dateHeader: {
      alignItems: 'center',
      marginVertical: 16,
    },
    dateText: {
      fontSize: 12,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      backgroundColor: isDarkMode ? '#374151' : '#E5E7EB',
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
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

        <View style={styles.participantInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{participant.avatar}</Text>
            {participant.isOnline && <View style={styles.onlineIndicator} />}
          </View>
          <View style={styles.participantDetails}>
            <Text style={styles.participantName}>{participant.name}</Text>
            <Text style={styles.participantStatus}>
              {participant.isOnline 
                ? getText('online', 'Online')
                : `${getText('lastSeen', 'Last seen')} ${participant.lastSeen}`
              }
            </Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <Pressable style={styles.headerButton}>
            <Ionicons
              name="videocam-outline"
              size={18}
              color={isDarkMode ? '#9CA3AF' : '#6B7280'}
            />
          </Pressable>
          <Pressable style={styles.headerButton}>
            <Ionicons
              name="call-outline"
              size={18}
              color={isDarkMode ? '#9CA3AF' : '#6B7280'}
            />
          </Pressable>
          <Pressable style={styles.headerButton}>
            <Ionicons
              name="ellipsis-vertical"
              size={18}
              color={isDarkMode ? '#9CA3AF' : '#6B7280'}
            />
          </Pressable>
        </View>
      </Animated.View>

      <KeyboardAvoidingView 
        style={styles.messagesContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          <View style={styles.dateHeader}>
            <Text style={styles.dateText}>Today</Text>
          </View>

          {messages.map((msg, index) => (
            <Animated.View
              key={msg.id}
              entering={SlideInRight.delay(index * 50)}
              style={[
                styles.messageWrapper,
                msg.senderId === currentUserId ? styles.sentMessageWrapper : styles.receivedMessageWrapper
              ]}
            >
              <View style={[
                styles.messageBubble,
                msg.senderId === currentUserId ? styles.sentMessage : styles.receivedMessage
              ]}>
                <Text style={[
                  styles.messageText,
                  msg.senderId === currentUserId ? styles.sentMessageText : styles.receivedMessageText
                ]}>
                  {msg.text}
                </Text>
              </View>
              
              {msg.senderId === currentUserId && (
                <View style={styles.messageFooter}>
                  <Text style={styles.timestamp}>{msg.timestamp}</Text>
                  <Ionicons
                    name={getMessageStatusIcon(msg.status) as any}
                    size={12}
                    color={getMessageStatusColor(msg.status)}
                    style={styles.statusIcon}
                  />
                </View>
              )}
            </Animated.View>
          ))}

          {isTyping && (
            <Animated.View entering={FadeIn} style={styles.typingIndicator}>
              <View style={styles.typingBubble}>
                <Text style={styles.typingText}>
                  {participant.name} {getText('isTyping', 'is typing...')}
                </Text>
              </View>
            </Animated.View>
          )}
        </ScrollView>

        <Animated.View entering={SlideInUp.delay(100)} style={styles.inputContainer}>
          <Pressable style={styles.attachmentButton} onPress={handleAttachment}>
            <Ionicons
              name="add"
              size={20}
              color={isDarkMode ? '#9CA3AF' : '#6B7280'}
            />
          </Pressable>

          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder={getText('typeMessage', 'Type a message...')}
              placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
              value={message}
              onChangeText={setMessage}
              multiline
              textAlign={language === 'ar' ? 'right' : 'left'}
            />
          </View>

          <Pressable
            style={[
              styles.sendButton,
              !message.trim() && styles.sendButtonDisabled
            ]}
            onPress={handleSendMessage}
            disabled={!message.trim()}
          >
            <Ionicons
              name="send"
              size={16}
              color="#FFFFFF"
            />
          </Pressable>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
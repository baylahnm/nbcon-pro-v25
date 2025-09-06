import React, { useState, useEffect, useRef } from 'react';
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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { RootState } from '../../store';
import { Language, UserRole } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

const { width, height } = Dimensions.get('window');

interface ChatMessage {
  id: string;
  content: {
    original: string;
    translated: string;
    originalLanguage: Language;
  };
  sender: {
    id: string;
    name: { en: string; ar: string };
    role: UserRole;
    avatar?: string;
  };
  timestamp: string;
  isTranslated: boolean;
  translationConfidence: number;
  isRead: boolean;
  messageType: 'text' | 'image' | 'file' | 'voice';
  attachments?: {
    id: string;
    name: string;
    type: string;
    url: string;
    size: number;
  }[];
}

interface LiveChatTranslationScreenProps {
  route?: {
    params: {
      projectId: string;
      conversationId: string;
      participantId: string;
    };
  };
}

const LiveChatTranslationScreen: React.FC<LiveChatTranslationScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const { language, isDarkMode, user } = useSelector((state: RootState) => state.app);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [showTranslationSettings, setShowTranslationSettings] = useState(false);
  const [autoTranslate, setAutoTranslate] = useState(true);
  const [translationLanguage, setTranslationLanguage] = useState<Language>(Language.ARABIC);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockMessages: ChatMessage[] = [
      {
        id: 'msg_1',
        content: {
          original: 'Hello, I have some questions about the MEP design.',
          translated: 'مرحباً، لدي بعض الأسئلة حول تصميم MEP.',
          originalLanguage: Language.ENGLISH,
        },
        sender: {
          id: 'client_1',
          name: { en: 'Ahmed Al-Rajhi', ar: 'أحمد الراجحي' },
          role: UserRole.CLIENT,
        },
        timestamp: '2024-02-15T10:30:00Z',
        isTranslated: true,
        translationConfidence: 0.95,
        isRead: true,
        messageType: 'text',
      },
      {
        id: 'msg_2',
        content: {
          original: 'أهلاً وسهلاً، أنا جاهز للإجابة على أسئلتك.',
          translated: 'Welcome, I\'m ready to answer your questions.',
          originalLanguage: Language.ARABIC,
        },
        sender: {
          id: 'eng_1',
          name: { en: 'Sara Al-Mansouri', ar: 'سارة المنصوري' },
          role: UserRole.ENGINEER,
        },
        timestamp: '2024-02-15T10:32:00Z',
        isTranslated: true,
        translationConfidence: 0.92,
        isRead: true,
        messageType: 'text',
      },
      {
        id: 'msg_3',
        content: {
          original: 'Can you please review the HVAC layout I sent?',
          translated: 'هل يمكنك مراجعة تخطيط HVAC الذي أرسلته؟',
          originalLanguage: Language.ENGLISH,
        },
        sender: {
          id: 'client_1',
          name: { en: 'Ahmed Al-Rajhi', ar: 'أحمد الراجحي' },
          role: UserRole.CLIENT,
        },
        timestamp: '2024-02-15T10:35:00Z',
        isTranslated: true,
        translationConfidence: 0.88,
        isRead: true,
        messageType: 'text',
        attachments: [
          {
            id: 'att_1',
            name: 'HVAC_Layout.dwg',
            type: 'CAD',
            url: '#',
            size: 12500000,
          },
        ],
      },
      {
        id: 'msg_4',
        content: {
          original: 'نعم، لقد راجعت التخطيط وهو ممتاز. سأرسل لك ملاحظاتي قريباً.',
          translated: 'Yes, I\'ve reviewed the layout and it\'s excellent. I\'ll send you my notes soon.',
          originalLanguage: Language.ARABIC,
        },
        sender: {
          id: 'eng_1',
          name: { en: 'Sara Al-Mansouri', ar: 'سارة المنصوري' },
          role: UserRole.ENGINEER,
        },
        timestamp: '2024-02-15T10:38:00Z',
        isTranslated: true,
        translationConfidence: 0.94,
        isRead: false,
        messageType: 'text',
      },
    ];
    setMessages(mockMessages);
  }, []);

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(isArabic ? 'ar-SA' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: `msg_${Date.now()}`,
        content: {
          original: newMessage,
          translated: '', // Will be filled by translation service
          originalLanguage: language,
        },
        sender: {
          id: user?.id || 'current_user',
          name: user?.name || { en: 'You', ar: 'أنت' },
          role: user?.role || UserRole.CLIENT,
        },
        timestamp: new Date().toISOString(),
        isTranslated: false,
        translationConfidence: 0,
        isRead: false,
        messageType: 'text',
      };

      setMessages(prev => [...prev, message]);
      setNewMessage('');

      // Simulate translation
      if (autoTranslate) {
        setIsTranslating(true);
        setTimeout(() => {
          setMessages(prev => 
            prev.map(msg => 
              msg.id === message.id 
                ? {
                    ...msg,
                    content: {
                      ...msg.content,
                      translated: msg.content.originalLanguage === Language.ENGLISH 
                        ? 'مرحباً، لدي بعض الأسئلة حول تصميم MEP.' // Mock translation
                        : 'Hello, I have some questions about the MEP design.',
                    },
                    isTranslated: true,
                    translationConfidence: 0.9,
                  }
                : msg
            )
          );
          setIsTranslating(false);
        }, 1000);
      }
    }
  };

  const handleTranslateMessage = async (messageId: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, isTranslated: !msg.isTranslated }
          : msg
      )
    );
  };

  const handleAttachmentPress = () => {
    setShowAttachmentModal(true);
  };

  const handleEmojiPress = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const renderMessage = (message: ChatMessage) => {
    const isCurrentUser = message.sender.id === user?.id;
    const displayContent = message.isTranslated && message.content.translated 
      ? message.content.translated 
      : message.content.original;

    return (
      <View
        key={message.id}
        style={[
          styles.messageContainer,
          isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage,
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            {
              backgroundColor: isCurrentUser ? COLORS.primary : theme.surface,
            },
          ]}
        >
          <Text style={[
            styles.messageText,
            { color: isCurrentUser ? COLORS.white : theme.text }
          ]}>
            {displayContent}
          </Text>
          
          {message.isTranslated && message.content.translated && (
            <View style={styles.translationContainer}>
              <View style={styles.translationDivider} />
              <Text style={[styles.translatedText, { color: theme.textSecondary }]}>
                {message.content.original}
              </Text>
              <View style={styles.translationFooter}>
                <Ionicons 
                  name="language" 
                  size={12} 
                  color={theme.textSecondary} 
                />
                <Text style={[styles.confidenceText, { color: theme.textSecondary }]}>
                  {Math.round(message.translationConfidence * 100)}%
                </Text>
              </View>
            </View>
          )}

          {message.attachments && message.attachments.length > 0 && (
            <View style={styles.attachmentsContainer}>
              {message.attachments.map((attachment) => (
                <TouchableOpacity key={attachment.id} style={styles.attachmentItem}>
                  <Ionicons name="document-outline" size={16} color={theme.textSecondary} />
                  <Text style={[styles.attachmentName, { color: theme.textSecondary }]}>
                    {attachment.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.messageFooter}>
          <Text style={[styles.messageTime, { color: theme.textSecondary }]}>
            {formatTime(message.timestamp)}
          </Text>
          {message.isTranslated && (
            <TouchableOpacity
              style={styles.translateButton}
              onPress={() => handleTranslateMessage(message.id)}
            >
              <Ionicons 
                name={message.isTranslated ? "eye-off" : "eye"} 
                size={14} 
                color={theme.textSecondary} 
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const emojis = ['😊', '👍', '👎', '❤️', '🎉', '😢', '😮', '😡', '🤔', '👏'];

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
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
              {isArabic ? 'محادثة مباشرة' : 'Live Chat'}
            </Text>
            <Text style={styles.headerSubtitle}>
              {isArabic ? 'مع ترجمة فورية' : 'with Instant Translation'}
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.settingsButton}
            onPress={() => setShowTranslationSettings(true)}
          >
            <Ionicons name="settings-outline" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Translation Status */}
      {isTranslating && (
        <View style={[styles.translatingStatus, { backgroundColor: theme.surface }]}>
          <Ionicons name="sync" size={16} color={COLORS.primary} />
          <Text style={[styles.translatingText, { color: theme.text }]}>
            {isArabic ? 'جاري الترجمة...' : 'Translating...'}
          </Text>
        </View>
      )}

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map(renderMessage)}
      </ScrollView>

      {/* Input Area */}
      <View style={[styles.inputContainer, { backgroundColor: theme.surface }]}>
        <View style={styles.inputRow}>
          <TouchableOpacity 
            style={styles.attachmentButton}
            onPress={handleAttachmentPress}
          >
            <Ionicons name="attach" size={24} color={theme.textSecondary} />
          </TouchableOpacity>
          
          <View style={[styles.textInputContainer, { backgroundColor: theme.background }]}>
            <TextInput
              style={[styles.textInput, { color: theme.text }]}
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder={isArabic ? 'اكتب رسالتك...' : 'Type your message...'}
              placeholderTextColor={theme.textSecondary}
              multiline
              maxLength={1000}
            />
            <TouchableOpacity 
              style={styles.emojiButton}
              onPress={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Ionicons name="happy-outline" size={20} color={theme.textSecondary} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.sendButton, { backgroundColor: COLORS.primary }]}
            onPress={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Ionicons name="send" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <View style={[styles.emojiPicker, { backgroundColor: theme.background }]}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.emojiRow}>
                {emojis.map((emoji, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.emojiItem}
                    onPress={() => handleEmojiPress(emoji)}
                  >
                    <Text style={styles.emojiText}>{emoji}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        )}
      </View>

      {/* Translation Settings Modal */}
      <Modal
        visible={showTranslationSettings}
        transparent
        animationType="slide"
        onRequestClose={() => setShowTranslationSettings(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              {isArabic ? 'إعدادات الترجمة' : 'Translation Settings'}
            </Text>
            
            <View style={styles.settingItem}>
              <Text style={[styles.settingLabel, { color: theme.text }]}>
                {isArabic ? 'الترجمة التلقائية' : 'Auto Translation'}
              </Text>
              <TouchableOpacity
                style={[
                  styles.toggle,
                  autoTranslate && { backgroundColor: COLORS.primary }
                ]}
                onPress={() => setAutoTranslate(!autoTranslate)}
              >
                <View style={[
                  styles.toggleThumb,
                  autoTranslate && styles.toggleThumbActive
                ]} />
              </TouchableOpacity>
            </View>

            <View style={styles.settingItem}>
              <Text style={[styles.settingLabel, { color: theme.text }]}>
                {isArabic ? 'لغة الترجمة' : 'Translation Language'}
              </Text>
              <View style={styles.languageOptions}>
                <TouchableOpacity
                  style={[
                    styles.languageOption,
                    translationLanguage === Language.ENGLISH && { backgroundColor: COLORS.primary }
                  ]}
                  onPress={() => setTranslationLanguage(Language.ENGLISH)}
                >
                  <Text style={[
                    styles.languageOptionText,
                    { color: translationLanguage === Language.ENGLISH ? COLORS.white : theme.text }
                  ]}>
                    English
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.languageOption,
                    translationLanguage === Language.ARABIC && { backgroundColor: COLORS.primary }
                  ]}
                  onPress={() => setTranslationLanguage(Language.ARABIC)}
                >
                  <Text style={[
                    styles.languageOptionText,
                    { color: translationLanguage === Language.ARABIC ? COLORS.white : theme.text }
                  ]}>
                    العربية
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.modalActions}>
              <CustomButton
                title={isArabic ? 'إلغاء' : 'Cancel'}
                onPress={() => setShowTranslationSettings(false)}
                variant="outline"
                style={styles.modalButton}
              />
              <CustomButton
                title={isArabic ? 'حفظ' : 'Save'}
                onPress={() => setShowTranslationSettings(false)}
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Attachment Modal */}
      <Modal
        visible={showAttachmentModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAttachmentModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              {isArabic ? 'إرفاق ملف' : 'Attach File'}
            </Text>
            
            <View style={styles.attachmentOptions}>
              <TouchableOpacity style={styles.attachmentOption}>
                <Ionicons name="camera-outline" size={32} color={COLORS.primary} />
                <Text style={[styles.attachmentOptionText, { color: theme.text }]}>
                  {isArabic ? 'كاميرا' : 'Camera'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.attachmentOption}>
                <Ionicons name="image-outline" size={32} color={COLORS.primary} />
                <Text style={[styles.attachmentOptionText, { color: theme.text }]}>
                  {isArabic ? 'معرض الصور' : 'Gallery'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.attachmentOption}>
                <Ionicons name="document-outline" size={32} color={COLORS.primary} />
                <Text style={[styles.attachmentOptionText, { color: theme.text }]}>
                  {isArabic ? 'ملف' : 'File'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.attachmentOption}>
                <Ionicons name="mic-outline" size={32} color={COLORS.primary} />
                <Text style={[styles.attachmentOptionText, { color: theme.text }]}>
                  {isArabic ? 'تسجيل صوتي' : 'Voice Note'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalActions}>
              <CustomButton
                title={isArabic ? 'إلغاء' : 'Cancel'}
                onPress={() => setShowAttachmentModal(false)}
                variant="outline"
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
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
  settingsButton: {
    padding: 4,
  },
  translatingStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  translatingText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: 8,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
  },
  messageContainer: {
    marginBottom: 16,
  },
  currentUserMessage: {
    alignItems: 'flex-end',
  },
  otherUserMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: width * 0.75,
    padding: 12,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: 4,
  },
  messageText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    lineHeight: 20,
  },
  translationContainer: {
    marginTop: 8,
    paddingTop: 8,
  },
  translationDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 8,
  },
  translatedText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontStyle: 'italic',
    lineHeight: 18,
  },
  translationFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  confidenceText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    marginLeft: 4,
  },
  attachmentsContainer: {
    marginTop: 8,
  },
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  attachmentName: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: 8,
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageTime: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  translateButton: {
    marginLeft: 8,
    padding: 4,
  },
  inputContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  attachmentButton: {
    padding: 8,
    marginRight: 8,
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  textInput: {
    flex: 1,
    fontSize: TYPOGRAPHY.sizes.body1,
    maxHeight: 100,
  },
  emojiButton: {
    padding: 4,
    marginLeft: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  emojiPicker: {
    marginTop: 12,
    paddingVertical: 8,
  },
  emojiRow: {
    flexDirection: 'row',
  },
  emojiItem: {
    padding: 8,
    marginRight: 4,
  },
  emojiText: {
    fontSize: 24,
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.white,
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  languageOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  languageOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  languageOptionText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  attachmentOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  attachmentOption: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  attachmentOptionText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginTop: 8,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  modalButton: {
    paddingHorizontal: 24,
  },
});

export default LiveChatTranslationScreen;

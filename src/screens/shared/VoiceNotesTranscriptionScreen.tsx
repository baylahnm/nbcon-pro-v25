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
  Animated,
  Vibration,
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

interface VoiceNote {
  id: string;
  title: string;
  content: {
    original: string;
    transcribed: string;
    language: Language;
  };
  audioUrl: string;
  duration: number; // in seconds
  fileSize: number; // in bytes
  createdAt: string;
  isTranscribed: boolean;
  transcriptionConfidence: number;
  isProcessing: boolean;
  tags: string[];
  projectId?: string;
  jobId?: string;
}

interface VoiceNotesTranscriptionScreenProps {
  route?: {
    params: {
      projectId?: string;
      jobId?: string;
    };
  };
}

const VoiceNotesTranscriptionScreen: React.FC<VoiceNotesTranscriptionScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const { language, isDarkMode, user } = useSelector((state: RootState) => state.app);
  const [voiceNotes, setVoiceNotes] = useState<VoiceNote[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(language);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNote, setSelectedNote] = useState<VoiceNote | null>(null);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [recordingPermission, setRecordingPermission] = useState(false);
  const [recordingTimer, setRecordingTimer] = useState<NodeJS.Timeout | null>(null);
  const [recordingAnimation] = useState(new Animated.Value(0));

  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockVoiceNotes: VoiceNote[] = [
      {
        id: 'note_1',
        title: 'MEP Design Discussion',
        content: {
          original: 'We need to discuss the HVAC layout for the office building. The current design shows...',
          transcribed: 'نحتاج لمناقشة تخطيط HVAC للمبنى المكتبي. التصميم الحالي يظهر...',
          language: Language.ENGLISH,
        },
        audioUrl: '#',
        duration: 120,
        fileSize: 2400000, // 2.4 MB
        createdAt: '2024-02-15T10:30:00Z',
        isTranscribed: true,
        transcriptionConfidence: 0.92,
        isProcessing: false,
        tags: ['MEP', 'HVAC', 'Design'],
        projectId: 'project_1',
      },
      {
        id: 'note_2',
        title: 'Site Visit Notes',
        content: {
          original: 'During today\'s site visit, I noticed several issues with the foundation work...',
          transcribed: 'خلال زيارة الموقع اليوم، لاحظت عدة مشاكل في أعمال الأساس...',
          language: Language.ENGLISH,
        },
        audioUrl: '#',
        duration: 180,
        fileSize: 3600000, // 3.6 MB
        createdAt: '2024-02-14T16:45:00Z',
        isTranscribed: true,
        transcriptionConfidence: 0.88,
        isProcessing: false,
        tags: ['Site Visit', 'Foundation', 'Issues'],
        projectId: 'project_1',
      },
      {
        id: 'note_3',
        title: 'Client Meeting',
        content: {
          original: '',
          transcribed: '',
          language: Language.ARABIC,
        },
        audioUrl: '#',
        duration: 0,
        fileSize: 0,
        createdAt: '2024-02-13T14:20:00Z',
        isTranscribed: false,
        transcriptionConfidence: 0,
        isProcessing: true,
        tags: ['Client', 'Meeting'],
        projectId: 'project_1',
      },
    ];
    setVoiceNotes(mockVoiceNotes);
  }, []);

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US');
  };

  const startRecording = async () => {
    try {
      // Request microphone permission
      // In a real app, you would use expo-av or react-native-audio-recorder-player
      setRecordingPermission(true);
      setIsRecording(true);
      setRecordingDuration(0);
      
      // Start recording animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(recordingAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(recordingAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Start timer
      const timer = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
      setRecordingTimer(timer);

      // Vibrate to indicate recording started
      Vibration.vibrate(100);

    } catch (error) {
      Alert.alert(
        isArabic ? 'خطأ في التسجيل' : 'Recording Error',
        isArabic ? 'لا يمكن بدء التسجيل. تحقق من أذونات الميكروفون.' : 'Cannot start recording. Check microphone permissions.'
      );
    }
  };

  const stopRecording = async () => {
    try {
      setIsRecording(false);
      setIsTranscribing(true);
      
      // Stop recording animation
      recordingAnimation.stopAnimation();
      recordingAnimation.setValue(0);

      // Stop timer
      if (recordingTimer) {
        clearInterval(recordingTimer);
        setRecordingTimer(null);
      }

      // Vibrate to indicate recording stopped
      Vibration.vibrate([100, 50, 100]);

      // Simulate transcription process
      setTimeout(() => {
        const newNote: VoiceNote = {
          id: `note_${Date.now()}`,
          title: `Voice Note ${voiceNotes.length + 1}`,
          content: {
            original: 'This is a sample transcription of the recorded voice note.',
            transcribed: 'هذا نص عينة لنسخ الملاحظة الصوتية المسجلة.',
            language: selectedLanguage,
          },
          audioUrl: '#',
          duration: recordingDuration,
          fileSize: recordingDuration * 20000, // Approximate file size
          createdAt: new Date().toISOString(),
          isTranscribed: true,
          transcriptionConfidence: 0.85,
          isProcessing: false,
          tags: [],
          projectId: route?.params?.projectId,
          jobId: route?.params?.jobId,
        };

        setVoiceNotes(prev => [newNote, ...prev]);
        setIsTranscribing(false);
        setRecordingDuration(0);

        Alert.alert(
          isArabic ? 'تم النسخ' : 'Transcribed',
          isArabic ? 'تم نسخ الملاحظة الصوتية بنجاح' : 'Voice note transcribed successfully'
        );
      }, 2000);

    } catch (error) {
      Alert.alert(
        isArabic ? 'خطأ في التوقف' : 'Stop Error',
        isArabic ? 'لا يمكن إيقاف التسجيل' : 'Cannot stop recording'
      );
    }
  };

  const handlePlayNote = (note: VoiceNote) => {
    Alert.alert(
      isArabic ? 'تشغيل الملاحظة' : 'Play Note',
      isArabic ? 'سيتم تشغيل الملاحظة الصوتية قريباً' : 'Voice note will play soon'
    );
  };

  const handleEditNote = (note: VoiceNote) => {
    setSelectedNote(note);
    setShowNoteModal(true);
  };

  const handleDeleteNote = (noteId: string) => {
    Alert.alert(
      isArabic ? 'حذف الملاحظة' : 'Delete Note',
      isArabic ? 'هل أنت متأكد من حذف هذه الملاحظة؟' : 'Are you sure you want to delete this note?',
      [
        {
          text: isArabic ? 'إلغاء' : 'Cancel',
          style: 'cancel',
        },
        {
          text: isArabic ? 'حذف' : 'Delete',
          style: 'destructive',
          onPress: () => {
            setVoiceNotes(prev => prev.filter(note => note.id !== noteId));
          },
        },
      ]
    );
  };

  const handleRetranscribe = (noteId: string) => {
    setVoiceNotes(prev => 
      prev.map(note => 
        note.id === noteId 
          ? { ...note, isProcessing: true, isTranscribed: false }
          : note
      )
    );

    // Simulate retranscription
    setTimeout(() => {
      setVoiceNotes(prev => 
        prev.map(note => 
          note.id === noteId 
            ? { 
                ...note, 
                isProcessing: false, 
                isTranscribed: true,
                transcriptionConfidence: 0.9,
                content: {
                  ...note.content,
                  transcribed: note.content.language === Language.ENGLISH 
                    ? 'This is a retranscribed version of the voice note.'
                    : 'هذا إصدار معاد نسخه من الملاحظة الصوتية.'
                }
              }
            : note
        )
      );
    }, 3000);
  };

  const filteredNotes = voiceNotes.filter(note => {
    const matchesSearch = searchQuery === '' || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.original.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.transcribed.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  const renderVoiceNote = (note: VoiceNote) => (
    <View key={note.id} style={[styles.noteCard, { backgroundColor: theme.card }]}>
      <View style={styles.noteHeader}>
        <View style={styles.noteTitleContainer}>
          <Text style={[styles.noteTitle, { color: theme.text }]}>
            {note.title}
          </Text>
          <View style={styles.noteMeta}>
            <Text style={[styles.noteDate, { color: theme.textSecondary }]}>
              {formatDate(note.createdAt)}
            </Text>
            <Text style={[styles.noteDuration, { color: theme.textSecondary }]}>
              {formatDuration(note.duration)}
            </Text>
          </View>
        </View>
        <View style={styles.noteActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handlePlayNote(note)}
          >
            <Ionicons name="play" size={20} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleEditNote(note)}
          >
            <Ionicons name="create-outline" size={20} color={COLORS.accent} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleDeleteNote(note.id)}
          >
            <Ionicons name="trash-outline" size={20} color={COLORS.error} />
          </TouchableOpacity>
        </View>
      </View>

      {note.isProcessing ? (
        <View style={styles.processingContainer}>
          <Ionicons name="sync" size={20} color={COLORS.primary} />
          <Text style={[styles.processingText, { color: theme.text }]}>
            {isArabic ? 'جاري النسخ...' : 'Transcribing...'}
          </Text>
        </View>
      ) : note.isTranscribed ? (
        <View style={styles.transcriptionContainer}>
          <Text style={[styles.transcriptionText, { color: theme.text }]}>
            {note.content.language === language ? note.content.original : note.content.transcribed}
          </Text>
          {note.content.original !== note.content.transcribed && (
            <View style={styles.translationContainer}>
              <View style={styles.translationDivider} />
              <Text style={[styles.translatedText, { color: theme.textSecondary }]}>
                {note.content.language === language ? note.content.transcribed : note.content.original}
              </Text>
            </View>
          )}
          <View style={styles.transcriptionFooter}>
            <View style={styles.confidenceContainer}>
              <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
              <Text style={[styles.confidenceText, { color: theme.textSecondary }]}>
                {Math.round(note.transcriptionConfidence * 100)}% {isArabic ? 'دقة' : 'accuracy'}
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.retranscribeButton}
              onPress={() => handleRetranscribe(note.id)}
            >
              <Ionicons name="refresh" size={16} color={COLORS.primary} />
              <Text style={[styles.retranscribeText, { color: COLORS.primary }]}>
                {isArabic ? 'إعادة نسخ' : 'Retranscribe'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.noTranscriptionContainer}>
          <Ionicons name="mic-off" size={24} color={theme.textSecondary} />
          <Text style={[styles.noTranscriptionText, { color: theme.textSecondary }]}>
            {isArabic ? 'لم يتم النسخ بعد' : 'Not transcribed yet'}
          </Text>
        </View>
      )}

      {note.tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {note.tags.map((tag, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: theme.surface }]}>
              <Text style={[styles.tagText, { color: theme.textSecondary }]}>
                {tag}
              </Text>
            </View>
          ))}
        </View>
      )}
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
              {isArabic ? 'الملاحظات الصوتية' : 'Voice Notes'}
            </Text>
            <Text style={styles.headerSubtitle}>
              {isArabic ? 'تسجيل ونسخ تلقائي' : 'Record & Auto Transcribe'}
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.languageButton}
            onPress={() => setShowLanguageModal(true)}
          >
            <Ionicons name="language" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Search */}
      <View style={[styles.searchContainer, { backgroundColor: theme.surface }]}>
        <View style={[styles.searchBar, { backgroundColor: theme.background }]}>
          <Ionicons name="search" size={20} color={theme.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={isArabic ? 'البحث في الملاحظات...' : 'Search notes...'}
            placeholderTextColor={theme.textSecondary}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={theme.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Recording Controls */}
      <View style={[styles.recordingContainer, { backgroundColor: theme.surface }]}>
        <View style={styles.recordingControls}>
          {!isRecording ? (
            <TouchableOpacity
              style={[styles.recordButton, { backgroundColor: COLORS.error }]}
              onPress={startRecording}
            >
              <Ionicons name="mic" size={32} color={COLORS.white} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.stopButton, { backgroundColor: COLORS.error }]}
              onPress={stopRecording}
            >
              <Ionicons name="stop" size={32} color={COLORS.white} />
            </TouchableOpacity>
          )}
          
          <View style={styles.recordingInfo}>
            <Text style={[styles.recordingStatus, { color: theme.text }]}>
              {isRecording 
                ? (isArabic ? 'جاري التسجيل...' : 'Recording...')
                : (isTranscribing 
                  ? (isArabic ? 'جاري النسخ...' : 'Transcribing...')
                  : (isArabic ? 'اضغط للتسجيل' : 'Tap to Record')
                )
              }
            </Text>
            {isRecording && (
              <Animated.View style={[
                styles.recordingIndicator,
                {
                  opacity: recordingAnimation,
                  transform: [{
                    scale: recordingAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.2],
                    }),
                  }],
                }
              ]}>
                <View style={styles.recordingPulse} />
              </Animated.View>
            )}
            <Text style={[styles.recordingDuration, { color: theme.textSecondary }]}>
              {formatDuration(recordingDuration)}
            </Text>
          </View>
        </View>
      </View>

      {/* Voice Notes List */}
      <ScrollView
        style={styles.notesContainer}
        contentContainerStyle={styles.notesContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredNotes.map(renderVoiceNote)}
        
        {filteredNotes.length === 0 && (
          <View style={styles.emptyContainer}>
            <Ionicons name="mic-outline" size={64} color={theme.textSecondary} />
            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              {isArabic ? 'لا توجد ملاحظات صوتية' : 'No voice notes found'}
            </Text>
            <Text style={[styles.emptyDescription, { color: theme.textSecondary }]}>
              {isArabic 
                ? 'ابدأ بتسجيل ملاحظة صوتية جديدة'
                : 'Start by recording a new voice note'
              }
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Language Selection Modal */}
      <Modal
        visible={showLanguageModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              {isArabic ? 'اختر لغة التسجيل' : 'Select Recording Language'}
            </Text>
            
            <View style={styles.languageOptions}>
              <TouchableOpacity
                style={[
                  styles.languageOption,
                  selectedLanguage === Language.ENGLISH && { backgroundColor: COLORS.primary }
                ]}
                onPress={() => setSelectedLanguage(Language.ENGLISH)}
              >
                <Text style={[
                  styles.languageOptionText,
                  { color: selectedLanguage === Language.ENGLISH ? COLORS.white : theme.text }
                ]}>
                  English
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.languageOption,
                  selectedLanguage === Language.ARABIC && { backgroundColor: COLORS.primary }
                ]}
                onPress={() => setSelectedLanguage(Language.ARABIC)}
              >
                <Text style={[
                  styles.languageOptionText,
                  { color: selectedLanguage === Language.ARABIC ? COLORS.white : theme.text }
                ]}>
                  العربية
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalActions}>
              <CustomButton
                title={isArabic ? 'إلغاء' : 'Cancel'}
                onPress={() => setShowLanguageModal(false)}
                variant="outline"
                style={styles.modalButton}
              />
              <CustomButton
                title={isArabic ? 'حفظ' : 'Save'}
                onPress={() => setShowLanguageModal(false)}
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Note Edit Modal */}
      <Modal
        visible={showNoteModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowNoteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.noteModalContent, { backgroundColor: theme.card }]}>
            <View style={styles.noteModalHeader}>
              <Text style={[styles.noteModalTitle, { color: theme.text }]}>
                {isArabic ? 'تحرير الملاحظة' : 'Edit Note'}
              </Text>
              <TouchableOpacity onPress={() => setShowNoteModal(false)}>
                <Ionicons name="close" size={24} color={theme.textSecondary} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.noteModalBody}>
              <TextInput
                style={[styles.noteTitleInput, { 
                  backgroundColor: theme.surface,
                  color: theme.text,
                  borderColor: theme.border 
                }]}
                value={selectedNote?.title || ''}
                placeholder={isArabic ? 'عنوان الملاحظة' : 'Note title'}
                placeholderTextColor={theme.textSecondary}
              />
              <TextInput
                style={[styles.noteContentInput, { 
                  backgroundColor: theme.surface,
                  color: theme.text,
                  borderColor: theme.border 
                }]}
                value={selectedNote?.content.transcribed || ''}
                placeholder={isArabic ? 'محتوى الملاحظة' : 'Note content'}
                placeholderTextColor={theme.textSecondary}
                multiline
                numberOfLines={6}
              />
            </ScrollView>

            <View style={styles.modalActions}>
              <CustomButton
                title={isArabic ? 'إلغاء' : 'Cancel'}
                onPress={() => setShowNoteModal(false)}
                variant="outline"
                style={styles.modalButton}
              />
              <CustomButton
                title={isArabic ? 'حفظ' : 'Save'}
                onPress={() => {
                  setShowNoteModal(false);
                  Alert.alert(
                    isArabic ? 'تم الحفظ' : 'Saved',
                    isArabic ? 'تم حفظ التغييرات' : 'Changes saved'
                  );
                }}
                style={styles.modalButton}
              />
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
  languageButton: {
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
  recordingContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  recordingControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  stopButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  recordingInfo: {
    flex: 1,
  },
  recordingStatus: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: 4,
  },
  recordingIndicator: {
    position: 'absolute',
    top: -10,
    left: -10,
  },
  recordingPulse: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.error,
    opacity: 0.3,
  },
  recordingDuration: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  notesContainer: {
    flex: 1,
  },
  notesContent: {
    padding: 20,
  },
  noteCard: {
    borderRadius: BORDER_RADIUS.md,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  noteTitleContainer: {
    flex: 1,
  },
  noteTitle: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: 4,
  },
  noteMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  noteDate: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  noteDuration: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  noteActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  processingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  processingText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: 8,
  },
  transcriptionContainer: {
    marginBottom: 12,
  },
  transcriptionText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    lineHeight: 22,
    marginBottom: 8,
  },
  translationContainer: {
    marginTop: 8,
    paddingTop: 8,
  },
  translationDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 8,
  },
  translatedText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  transcriptionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  confidenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  confidenceText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: 4,
  },
  retranscribeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  retranscribeText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: 4,
  },
  noTranscriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  noTranscriptionText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.sm,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: TYPOGRAPHY.sizes.caption,
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
  languageOptions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  languageOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  languageOptionText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  noteModalContent: {
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
    borderRadius: BORDER_RADIUS.md,
  },
  noteModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  noteModalTitle: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  noteModalBody: {
    padding: 20,
  },
  noteTitleInput: {
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: TYPOGRAPHY.sizes.body1,
    marginBottom: 16,
  },
  noteContentInput: {
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: TYPOGRAPHY.sizes.body1,
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    padding: 20,
  },
  modalButton: {
    paddingHorizontal: 24,
  },
});

export default VoiceNotesTranscriptionScreen;

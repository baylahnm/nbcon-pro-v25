import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { RootState } from '../../store';
import { Language, UserRole } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';

const { width, height } = Dimensions.get('window');

interface VideoCallParticipant {
  id: string;
  name: { en: string; ar: string };
  role: UserRole;
  avatar?: string;
  isMuted: boolean;
  isVideoOn: boolean;
  isSpeaking: boolean;
  connectionQuality: 'excellent' | 'good' | 'poor' | 'disconnected';
}

interface VideoCallIntegrationScreenProps {
  route?: {
    params: {
      callId: string;
      participants: VideoCallParticipant[];
      projectTitle: { en: string; ar: string };
    };
  };
}

const VideoCallIntegrationScreen: React.FC<VideoCallIntegrationScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const { language, isDarkMode, user } = useSelector((state: RootState) => state.app);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);

  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  // Mock data - replace with actual video call data
  const callData = {
    id: route?.params?.callId || 'call_1',
    projectTitle: route?.params?.projectTitle || { 
      en: 'Office Building MEP Design', 
      ar: 'تصميم الأنظمة الكهروميكانيكية لمبنى مكتبي' 
    },
    participants: route?.params?.participants || [
      {
        id: 'client_1',
        name: { en: 'Ahmed Al-Rajhi', ar: 'أحمد الراجحي' },
        role: UserRole.CLIENT,
        isMuted: false,
        isVideoOn: true,
        isSpeaking: true,
        connectionQuality: 'excellent' as const,
      },
      {
        id: 'eng_1',
        name: { en: 'Sara Al-Mansouri', ar: 'سارة المنصوري' },
        role: UserRole.ENGINEER,
        isMuted: false,
        isVideoOn: true,
        isSpeaking: false,
        connectionQuality: 'good' as const,
      },
    ],
  };

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getConnectionQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent':
        return COLORS.success;
      case 'good':
        return COLORS.accent;
      case 'poor':
        return COLORS.warning;
      case 'disconnected':
        return COLORS.error;
      default:
        return COLORS.textSecondary;
    }
  };

  const getConnectionQualityIcon = (quality: string) => {
    switch (quality) {
      case 'excellent':
        return 'wifi';
      case 'good':
        return 'wifi-outline';
      case 'poor':
        return 'warning';
      case 'disconnected':
        return 'close-circle';
      default:
        return 'wifi-outline';
    }
  };

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-hide controls
  useEffect(() => {
    if (showControls) {
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showControls]);

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    // Implement actual mute functionality
  };

  const handleVideoToggle = () => {
    setIsVideoOn(!isVideoOn);
    // Implement actual video toggle functionality
  };

  const handleSpeakerToggle = () => {
    setIsSpeakerOn(!isSpeakerOn);
    // Implement actual speaker toggle functionality
  };

  const handleRecordingToggle = () => {
    setIsRecording(!isRecording);
    // Implement actual recording functionality
  };

  const handleEndCall = () => {
    Alert.alert(
      isArabic ? 'إنهاء المكالمة' : 'End Call',
      isArabic ? 'هل أنت متأكد من إنهاء المكالمة؟' : 'Are you sure you want to end the call?',
      [
        {
          text: isArabic ? 'إلغاء' : 'Cancel',
          style: 'cancel',
        },
        {
          text: isArabic ? 'إنهاء' : 'End Call',
          style: 'destructive',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const handleFullScreenToggle = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleScreenTap = () => {
    setShowControls(!showControls);
  };

  const renderParticipantVideo = (participant: VideoCallParticipant, index: number) => {
    const isMainVideo = index === 0;
    const videoSize = isMainVideo ? 'main' : 'thumbnail';
    
    return (
      <TouchableOpacity
        key={participant.id}
        style={[
          styles.videoContainer,
          isMainVideo ? styles.mainVideoContainer : styles.thumbnailVideoContainer,
          isFullScreen && isMainVideo && styles.fullScreenVideoContainer,
        ]}
        onPress={isMainVideo ? handleScreenTap : () => {}}
      >
        {/* Video Placeholder */}
        <View style={[styles.videoPlaceholder, { backgroundColor: theme.surface }]}>
          {participant.isVideoOn ? (
            <View style={styles.videoContent}>
              <Text style={[styles.videoText, { color: theme.text }]}>
                {isArabic ? 'فيديو' : 'Video'}
              </Text>
              {participant.isSpeaking && (
                <View style={styles.speakingIndicator} />
              )}
            </View>
          ) : (
            <View style={styles.noVideoContent}>
              <View style={[styles.avatarPlaceholder, { backgroundColor: COLORS.primary }]}>
                <Text style={styles.avatarText}>
                  {getText(participant.name).charAt(0).toUpperCase()}
                </Text>
              </View>
              <Text style={[styles.participantName, { color: theme.text }]}>
                {getText(participant.name)}
              </Text>
            </View>
          )}
        </View>

        {/* Participant Info Overlay */}
        <View style={styles.participantInfo}>
          <Text style={[styles.participantNameOverlay, { color: COLORS.white }]}>
            {getText(participant.name)}
          </Text>
          <View style={styles.participantStatus}>
            {participant.isMuted && (
              <Ionicons name="mic-off" size={16} color={COLORS.white} />
            )}
            <Ionicons 
              name={getConnectionQualityIcon(participant.connectionQuality)} 
              size={16} 
              color={getConnectionQualityColor(participant.connectionQuality)} 
            />
          </View>
        </View>

        {/* Speaking Indicator */}
        {participant.isSpeaking && (
          <View style={styles.speakingBorder} />
        )}
      </TouchableOpacity>
    );
  };

  const renderControls = () => {
    if (!showControls) return null;

    return (
      <View style={styles.controlsContainer}>
        {/* Top Controls */}
        <View style={styles.topControls}>
          <View style={styles.callInfo}>
            <Text style={[styles.projectTitle, { color: COLORS.white }]}>
              {getText(callData.projectTitle)}
            </Text>
            <Text style={[styles.callDuration, { color: COLORS.white }]}>
              {formatDuration(callDuration)}
            </Text>
          </View>
          <View style={styles.topActions}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => setShowParticipants(!showParticipants)}
            >
              <Ionicons name="people" size={24} color={COLORS.white} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={handleFullScreenToggle}
            >
              <Ionicons 
                name={isFullScreen ? "contract" : "expand"} 
                size={24} 
                color={COLORS.white} 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Controls */}
        <View style={styles.bottomControls}>
          <TouchableOpacity
            style={[styles.controlButton, styles.secondaryButton]}
            onPress={handleRecordingToggle}
          >
            <Ionicons 
              name={isRecording ? "stop" : "videocam"} 
              size={24} 
              color={isRecording ? COLORS.error : COLORS.white} 
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlButton, styles.secondaryButton]}
            onPress={handleSpeakerToggle}
          >
            <Ionicons 
              name={isSpeakerOn ? "volume-high" : "volume-mute"} 
              size={24} 
              color={COLORS.white} 
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlButton, styles.secondaryButton]}
            onPress={handleVideoToggle}
          >
            <Ionicons 
              name={isVideoOn ? "videocam" : "videocam-off"} 
              size={24} 
              color={COLORS.white} 
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlButton, styles.secondaryButton]}
            onPress={handleMuteToggle}
          >
            <Ionicons 
              name={isMuted ? "mic-off" : "mic"} 
              size={24} 
              color={COLORS.white} 
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlButton, styles.endCallButton]}
            onPress={handleEndCall}
          >
            <Ionicons name="call" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderParticipantsList = () => {
    if (!showParticipants) return null;

    return (
      <View style={[styles.participantsList, { backgroundColor: theme.card }]}>
        <View style={styles.participantsHeader}>
          <Text style={[styles.participantsTitle, { color: theme.text }]}>
            {isArabic ? 'المشاركون' : 'Participants'}
          </Text>
          <TouchableOpacity onPress={() => setShowParticipants(false)}>
            <Ionicons name="close" size={24} color={theme.textSecondary} />
          </TouchableOpacity>
        </View>
        {callData.participants.map((participant) => (
          <View key={participant.id} style={styles.participantItem}>
            <View style={styles.participantAvatar}>
              <Text style={styles.participantAvatarText}>
                {getText(participant.name).charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.participantDetails}>
              <Text style={[styles.participantItemName, { color: theme.text }]}>
                {getText(participant.name)}
              </Text>
              <Text style={[styles.participantRole, { color: theme.textSecondary }]}>
                {participant.role === UserRole.CLIENT 
                  ? (isArabic ? 'عميل' : 'Client')
                  : (isArabic ? 'مهندس' : 'Engineer')
                }
              </Text>
            </View>
            <View style={styles.participantStatus}>
              {participant.isMuted && (
                <Ionicons name="mic-off" size={16} color={theme.textSecondary} />
              )}
              <Ionicons 
                name={getConnectionQualityIcon(participant.connectionQuality)} 
                size={16} 
                color={getConnectionQualityColor(participant.connectionQuality)} 
              />
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar hidden={isFullScreen} />
      
      {/* Main Video Area */}
      <View style={styles.videoArea}>
        {callData.participants.map((participant, index) => 
          renderParticipantVideo(participant, index)
        )}
      </View>

      {/* Controls Overlay */}
      {renderControls()}

      {/* Participants List */}
      {renderParticipantsList()}

      {/* Recording Indicator */}
      {isRecording && (
        <View style={styles.recordingIndicator}>
          <View style={styles.recordingDot} />
          <Text style={[styles.recordingText, { color: COLORS.white }]}>
            {isArabic ? 'جاري التسجيل' : 'Recording'}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  videoArea: {
    flex: 1,
    position: 'relative',
  },
  videoContainer: {
    position: 'absolute',
    backgroundColor: COLORS.black,
  },
  mainVideoContainer: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  thumbnailVideoContainer: {
    top: 20,
    right: 20,
    width: 120,
    height: 90,
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
  },
  fullScreenVideoContainer: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  videoPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  videoText: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  noVideoContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarText: {
    fontSize: TYPOGRAPHY.sizes.h5,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.white,
  },
  participantName: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    textAlign: 'center',
  },
  participantInfo: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  participantNameOverlay: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  participantStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  speakingIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: COLORS.accent,
    borderRadius: BORDER_RADIUS.sm,
  },
  speakingBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: COLORS.accent,
    borderRadius: BORDER_RADIUS.sm,
  },
  controlsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  callInfo: {
    flex: 1,
  },
  projectTitle: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: 4,
  },
  callDuration: {
    fontSize: TYPOGRAPHY.sizes.body2,
    opacity: 0.9,
  },
  topActions: {
    flexDirection: 'row',
    gap: 12,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: 20,
    gap: 20,
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  endCallButton: {
    backgroundColor: COLORS.error,
  },
  participantsList: {
    position: 'absolute',
    top: 100,
    right: 20,
    width: 280,
    borderRadius: BORDER_RADIUS.md,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  participantsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  participantsTitle: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  participantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  participantAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  participantAvatarText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.white,
  },
  participantDetails: {
    flex: 1,
  },
  participantItemName: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: 2,
  },
  participantRole: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  participantStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  recordingIndicator: {
    position: 'absolute',
    top: 100,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.sm,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.error,
    marginRight: 8,
  },
  recordingText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
});

export default VideoCallIntegrationScreen;

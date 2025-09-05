import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

interface Props {
  onUpdate?: () => void;
  onLater?: () => void;
  currentVersion?: string;
  latestVersion?: string;
  updateSize?: string;
  isForced?: boolean;
  releaseNotes?: string[];
  criticalSecurity?: boolean;
}

const ForceUpdateScreen: React.FC<Props> = ({
  onUpdate,
  onLater,
  currentVersion = '1.2.3',
  latestVersion = '1.3.0',
  updateSize = '25.4 MB',
  isForced = true,
  releaseNotes = [
    'Enhanced security and privacy features',
    'Improved performance and stability',
    'New messaging and notification system',
    'Better search and filter options',
    'Bug fixes and optimizations'
  ],
  criticalSecurity = false,
}) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const appAnimation = new Animated.Value(0);
  const arrowAnimation = new Animated.Value(0);
  const pulseAnimation = new Animated.Value(0);
  const securityAnimation = new Animated.Value(0);

  useEffect(() => {
    const animateApp = () => {
      Animated.sequence([
        Animated.timing(appAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(appAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]).start(() => animateApp());
    };

    const animateArrow = () => {
      Animated.sequence([
        Animated.timing(arrowAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(arrowAnimation, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]).start(() => animateArrow());
    };

    const animatePulse = () => {
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => animatePulse());
    };

    const animateSecurity = () => {
      if (criticalSecurity) {
        Animated.sequence([
          Animated.timing(securityAnimation, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(securityAnimation, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ]).start(() => animateSecurity());
      }
    };

    animateApp();
    animateArrow();
    animatePulse();
    animateSecurity();
  }, [criticalSecurity]);

  const handleUpdate = () => {
    setIsDownloading(true);
    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          onUpdate?.();
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const appScale = appAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.05],
  });

  const arrowTranslate = arrowAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  const pulseScale = pulseAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  const securityScale = securityAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1],
  });

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1a1a1a', '#2d2d2d'] : ['#f8f9fa', '#ffffff']}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
      >
        {/* Critical Security Alert */}
        {criticalSecurity && (
          <Animated.View 
            style={[
              styles.securityAlert,
              { 
                backgroundColor: COLORS.error + '15',
                transform: [{ scale: securityScale }]
              }
            ]}
          >
            <Ionicons name="warning" size={20} color={COLORS.error} />
            <Text style={[styles.securityText, { color: COLORS.error }]}>
              {getText({
                en: 'Critical Security Update Required',
                ar: 'تحديث أمني مهم مطلوب'
              })}
            </Text>
          </Animated.View>
        )}

        {/* Update Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.updateIllustration}>
            {/* Current App Version */}
            <Animated.View 
              style={[
                styles.appIcon,
                styles.currentApp,
                { 
                  backgroundColor: theme.surface,
                  transform: [{ scale: appScale }]
                }
              ]}
            >
              <Ionicons name="construct" size={40} color={COLORS.secondary} />
              <Text style={[styles.versionText, { color: theme.textSecondary }]}>
                v{currentVersion}
              </Text>
            </Animated.View>

            {/* Update Arrow */}
            <Animated.View 
              style={[
                styles.updateArrow,
                { transform: [{ translateX: arrowTranslate }] }
              ]}
            >
              <Ionicons name="arrow-forward" size={32} color={COLORS.primary} />
            </Animated.View>

            {/* New App Version */}
            <Animated.View 
              style={[
                styles.appIcon,
                styles.newApp,
                { 
                  backgroundColor: COLORS.primary + '15',
                  transform: [{ scale: pulseScale }]
                }
              ]}
            >
              <Ionicons name="construct" size={40} color={COLORS.primary} />
              <Text style={[styles.versionText, { color: COLORS.primary }]}>
                v{latestVersion}
              </Text>
              
              {/* New badge */}
              <View style={styles.newBadge}>
                <Text style={styles.newBadgeText}>
                  {getText({ en: 'NEW', ar: 'جديد' })}
                </Text>
              </View>
            </Animated.View>
          </View>
        </View>

        {/* Update Message */}
        <View style={styles.messageContainer}>
          <Text style={[styles.updateTitle, { color: theme.text }]}>
            {isForced ? 
              getText({
                en: 'Update Required',
                ar: 'تحديث مطلوب'
              }) :
              getText({
                en: 'Update Available',
                ar: 'تحديث متاح'
              })
            }
          </Text>
          
          <Text style={[styles.updateDescription, { color: theme.textSecondary }]}>
            {isForced ?
              getText({
                en: 'A new version is required to continue using the app. Please update now to access all features.',
                ar: 'مطلوب إصدار جديد لمواصلة استخدام التطبيق. يرجى التحديث الآن للوصول إلى جميع الميزات.'
              }) :
              getText({
                en: 'A new version is available with exciting improvements and fixes. Update now for the best experience.',
                ar: 'يتوفر إصدار جديد مع تحسينات وإصلاحات مثيرة. حدّث الآن للحصول على أفضل تجربة.'
              })
            }
          </Text>
        </View>

        {/* Version Info */}
        <View style={[styles.versionCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            {getText({
              en: 'Version Information',
              ar: 'معلومات الإصدار'
            })}
          </Text>
          
          <View style={styles.versionInfo}>
            <View style={styles.versionRow}>
              <Ionicons name="phone-portrait" size={16} color={theme.textSecondary} />
              <Text style={[styles.versionLabel, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Current Version:',
                  ar: 'الإصدار الحالي:'
                })}
              </Text>
              <Text style={[styles.versionValue, { color: theme.text }]}>
                {currentVersion}
              </Text>
            </View>
            
            <View style={styles.versionRow}>
              <Ionicons name="download" size={16} color={COLORS.primary} />
              <Text style={[styles.versionLabel, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Latest Version:',
                  ar: 'أحدث إصدار:'
                })}
              </Text>
              <Text style={[styles.versionValue, { color: COLORS.primary }]}>
                {latestVersion}
              </Text>
            </View>
            
            <View style={styles.versionRow}>
              <Ionicons name="cloud-download" size={16} color={theme.textSecondary} />
              <Text style={[styles.versionLabel, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Download Size:',
                  ar: 'حجم التحميل:'
                })}
              </Text>
              <Text style={[styles.versionValue, { color: theme.text }]}>
                {updateSize}
              </Text>
            </View>
          </View>
        </View>

        {/* Release Notes */}
        <View style={[styles.notesCard, { backgroundColor: theme.surface }]}>
          <View style={styles.notesHeader}>
            <Ionicons name="document-text" size={24} color={COLORS.info} />
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              {getText({
                en: 'What\'s New',
                ar: 'ما الجديد'
              })}
            </Text>
          </View>
          
          <View style={styles.notesList}>
            {releaseNotes.map((note, index) => (
              <View key={index} style={styles.noteItem}>
                <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
                <Text style={[styles.noteText, { color: theme.textSecondary }]}>
                  {note}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Download Progress */}
        {isDownloading && (
          <View style={[styles.progressCard, { backgroundColor: theme.surface }]}>
            <Text style={[styles.progressTitle, { color: theme.text }]}>
              {getText({
                en: 'Downloading Update...',
                ar: 'تحميل التحديث...'
              })}
            </Text>
            
            <View style={[styles.progressBarContainer, { backgroundColor: theme.inputBackground }]}>
              <View 
                style={[
                  styles.progressBar,
                  { 
                    backgroundColor: COLORS.primary,
                    width: `${downloadProgress}%`
                  }
                ]}
              />
            </View>
            
            <Text style={[styles.progressText, { color: theme.textSecondary }]}>
              {downloadProgress}% {getText({ en: 'Complete', ar: 'مكتمل' })}
            </Text>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <CustomButton
            title={isDownloading ? 
              getText({
                en: 'Downloading...',
                ar: 'جاري التحميل...'
              }) :
              getText({
                en: 'Update Now',
                ar: 'تحديث الآن'
              })
            }
            onPress={handleUpdate}
            icon={isDownloading ? 'cloud-download' : 'download'}
            size="large"
            fullWidth
            disabled={isDownloading}
            customStyle={[
              styles.updateButton,
              criticalSecurity && { backgroundColor: COLORS.error }
            ]}
          />

          {!isForced && !isDownloading && (
            <CustomButton
              title={getText({
                en: 'Later',
                ar: 'لاحقاً'
              })}
              onPress={onLater}
              variant="outline"
              icon="time"
              size="medium"
              fullWidth
              customStyle={styles.laterButton}
            />
          )}
        </View>

        {/* Store Links */}
        <View style={styles.storeLinksContainer}>
          <Text style={[styles.storeLinksTitle, { color: theme.textSecondary }]}>
            {getText({
              en: 'You can also update from:',
              ar: 'يمكنك أيضاً التحديث من:'
            })}
          </Text>
          
          <View style={styles.storeLinks}>
            {Platform.OS === 'ios' && (
              <View style={[styles.storeLink, { backgroundColor: theme.surface }]}>
                <Ionicons name="logo-apple" size={20} color={theme.text} />
                <Text style={[styles.storeLinkText, { color: theme.text }]}>
                  App Store
                </Text>
              </View>
            )}
            
            {Platform.OS === 'android' && (
              <View style={[styles.storeLink, { backgroundColor: theme.surface }]}>
                <Ionicons name="logo-google-playstore" size={20} color={theme.text} />
                <Text style={[styles.storeLinkText, { color: theme.text }]}>
                  Google Play
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Auto-update Notice */}
        {!isForced && (
          <View style={[styles.autoUpdateNotice, { backgroundColor: COLORS.info + '10' }]}>
            <Ionicons name="information-circle" size={16} color={COLORS.info} />
            <Text style={[styles.autoUpdateText, { color: theme.textSecondary }]}>
              {getText({
                en: 'Future updates can be set to download automatically in settings.',
                ar: 'يمكن ضبط التحديثات المستقبلية للتحميل تلقائياً في الإعدادات.'
              })}
            </Text>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xxl,
    maxWidth: 400,
    alignSelf: 'center',
  },
  securityAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
    elevation: 3,
  },
  securityText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.bold,
    flex: 1,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  updateIllustration: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.lg,
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  currentApp: {},
  newApp: {},
  versionText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginTop: SPACING.xs,
  },
  newBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: COLORS.error,
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  newBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  updateArrow: {
    alignItems: 'center',
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  updateTitle: {
    fontSize: TYPOGRAPHY.sizes.h1,
    fontWeight: TYPOGRAPHY.weights.bold,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  updateDescription: {
    fontSize: TYPOGRAPHY.sizes.body1,
    textAlign: 'center',
    lineHeight: 24,
  },
  versionCard: {
    width: '100%',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.md,
  },
  versionInfo: {
    gap: SPACING.sm,
  },
  versionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  versionLabel: {
    fontSize: TYPOGRAPHY.sizes.body2,
    flex: 1,
  },
  versionValue: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  notesCard: {
    width: '100%',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  notesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  notesList: {
    gap: SPACING.sm,
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
  },
  noteText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    flex: 1,
    lineHeight: 18,
  },
  progressCard: {
    width: '100%',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  progressTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle2,
    fontWeight: TYPOGRAPHY.weights.bold,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  progressBarContainer: {
    height: 8,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: SPACING.sm,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: BORDER_RADIUS.sm,
  },
  progressText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    textAlign: 'center',
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  actionContainer: {
    width: '100%',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  updateButton: {
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  laterButton: {},
  storeLinksContainer: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  storeLinksTitle: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginBottom: SPACING.sm,
  },
  storeLinks: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  storeLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.sm,
    elevation: 1,
  },
  storeLinkText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  autoUpdateNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.sm,
  },
  autoUpdateText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    flex: 1,
    textAlign: 'center',
  },
});

export default ForceUpdateScreen;
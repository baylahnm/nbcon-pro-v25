import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

interface Props {
  onContactSupport?: () => void;
  onRequestUnlock?: () => void;
  onBackToLogin?: () => void;
  lockReason?: string;
  lockDuration?: string;
  unlockDate?: string;
  attemptsRemaining?: number;
}

const AccountLockedScreen: React.FC<Props> = ({
  onContactSupport,
  onRequestUnlock,
  onBackToLogin,
  lockReason = 'Multiple failed login attempts',
  lockDuration = '24 hours',
  unlockDate = 'Tomorrow at 2:30 PM',
  attemptsRemaining = 0,
}) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [timeLeft, setTimeLeft] = useState('23:45:32');
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const lockAnimation = new Animated.Value(0);
  const chainAnimation = new Animated.Value(0);
  const warningAnimation = new Animated.Value(0);

  useEffect(() => {
    const animateLock = () => {
      Animated.sequence([
        Animated.timing(lockAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(lockAnimation, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]).start(() => animateLock());
    };

    const animateChain = () => {
      Animated.sequence([
        Animated.timing(chainAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(chainAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]).start(() => animateChain());
    };

    const animateWarning = () => {
      Animated.sequence([
        Animated.timing(warningAnimation, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(warningAnimation, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(() => animateWarning());
    };

    animateLock();
    setTimeout(() => animateChain(), 200);
    setTimeout(() => animateWarning(), 400);

    // Update countdown timer
    const timer = setInterval(() => {
      const now = new Date();
      const unlock = new Date(now.getTime() + 23 * 60 * 60 * 1000 + 45 * 60 * 1000 + 32 * 1000);
      const diff = unlock.getTime() - now.getTime();
      
      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const lockScale = lockAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1],
  });

  const chainOpacity = chainAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });

  const warningScale = warningAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.3],
  });

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1a1a1a', '#2d2d2d'] : ['#f8f9fa', '#ffffff']}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Locked Account Illustration */}
        <View style={styles.iconContainer}>
          <View style={[styles.lockBackground, { backgroundColor: COLORS.error + '15' }]}>
            <Animated.View style={{ transform: [{ scale: lockScale }] }}>
              <Ionicons name="lock-closed" size={80} color={COLORS.error} />
            </Animated.View>
            
            {/* Chain overlay */}
            <Animated.View 
              style={[
                styles.chainOverlay,
                { opacity: chainOpacity }
              ]}
            >
              <View style={[styles.chain, styles.chain1]} />
              <View style={[styles.chain, styles.chain2]} />
              <View style={[styles.chain, styles.chain3]} />
            </Animated.View>
            
            {/* Warning indicators */}
            <Animated.View 
              style={[
                styles.warningIndicator,
                styles.warning1,
                { transform: [{ scale: warningScale }] }
              ]}
            >
              <Ionicons name="warning" size={16} color={COLORS.white} />
            </Animated.View>
            
            <Animated.View 
              style={[
                styles.warningIndicator,
                styles.warning2,
                { transform: [{ scale: warningScale }] }
              ]}
            >
              <Ionicons name="warning" size={16} color={COLORS.white} />
            </Animated.View>
          </View>
        </View>

        {/* Lock Message */}
        <View style={styles.messageContainer}>
          <Text style={[styles.lockedTitle, { color: theme.text }]}>
            {getText({
              en: 'Account Locked',
              ar: 'تم قفل الحساب'
            })}
          </Text>
          
          <Text style={[styles.lockedDescription, { color: theme.textSecondary }]}>
            {getText({
              en: 'Your account has been temporarily locked for security reasons. Please wait for the lock period to expire or contact support.',
              ar: 'تم قفل حسابك مؤقتاً لأسباب أمنية. يرجى الانتظار حتى انتهاء فترة القفل أو الاتصال بالدعم.'
            })}
          </Text>
        </View>

        {/* Countdown Timer */}
        <View style={[styles.timerCard, { backgroundColor: COLORS.error + '10' }]}>
          <View style={styles.timerHeader}>
            <Ionicons name="time" size={24} color={COLORS.error} />
            <Text style={[styles.timerTitle, { color: theme.text }]}>
              {getText({
                en: 'Time Remaining',
                ar: 'الوقت المتبقي'
              })}
            </Text>
          </View>
          
          <Text style={[styles.timerDisplay, { color: COLORS.error }]}>
            {timeLeft}
          </Text>
          
          <Text style={[styles.unlockDate, { color: theme.textSecondary }]}>
            {getText({
              en: `Unlocks on ${unlockDate}`,
              ar: `يفتح في ${unlockDate}`
            })}
          </Text>
        </View>

        {/* Lock Details */}
        <View style={[styles.detailsCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            {getText({
              en: 'Lock Information',
              ar: 'معلومات القفل'
            })}
          </Text>
          
          <View style={styles.detailsInfo}>
            <View style={styles.detailRow}>
              <Ionicons name="warning" size={16} color={COLORS.error} />
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Reason:',
                  ar: 'السبب:'
                })}
              </Text>
              <Text style={[styles.detailValue, { color: theme.text }]}>
                {lockReason}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Ionicons name="hourglass" size={16} color={theme.textSecondary} />
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Duration:',
                  ar: 'المدة:'
                })}
              </Text>
              <Text style={[styles.detailValue, { color: theme.text }]}>
                {lockDuration}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Ionicons name="shield-checkmark" size={16} color={COLORS.warning} />
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Attempts Left:',
                  ar: 'المحاولات المتبقية:'
                })}
              </Text>
              <Text style={[styles.detailValue, { color: COLORS.error }]}>
                {attemptsRemaining}
              </Text>
            </View>
          </View>
        </View>

        {/* Security Tips */}
        <View style={[styles.tipsCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            {getText({
              en: 'Security Recommendations',
              ar: 'توصيات الأمان'
            })}
          </Text>
          
          <View style={styles.tipsList}>
            <View style={styles.tipItem}>
              <Ionicons name="key" size={16} color={COLORS.primary} />
              <Text style={[styles.tipText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Use a strong, unique password',
                  ar: 'استخدم كلمة مرور قوية وفريدة'
                })}
              </Text>
            </View>
            
            <View style={styles.tipItem}>
              <Ionicons name="shield-checkmark" size={16} color={COLORS.success} />
              <Text style={[styles.tipText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Enable two-factor authentication',
                  ar: 'فعّل المصادقة الثنائية'
                })}
              </Text>
            </View>
            
            <View style={styles.tipItem}>
              <Ionicons name="eye-off" size={16} color={COLORS.warning} />
              <Text style={[styles.tipText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Avoid using public Wi-Fi for login',
                  ar: 'تجنب استخدام الواي فاي العام للدخول'
                })}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <CustomButton
            title={getText({
              en: 'Request Account Unlock',
              ar: 'طلب فتح الحساب'
            })}
            onPress={onRequestUnlock}
            icon="mail"
            size="large"
            fullWidth
            customStyle={styles.unlockButton}
          />

          <View style={styles.secondaryActions}>
            <CustomButton
              title={getText({
                en: 'Contact Support',
                ar: 'اتصل بالدعم'
              })}
              onPress={onContactSupport}
              variant="outline"
              icon="headset"
              size="medium"
              customStyle={styles.supportButton}
            />

            <CustomButton
              title={getText({
                en: 'Back to Login',
                ar: 'العودة للدخول'
              })}
              onPress={onBackToLogin}
              variant="outline"
              icon="arrow-back"
              size="medium"
              customStyle={styles.backButton}
            />
          </View>
        </View>

        {/* Emergency Contact */}
        <View style={[styles.emergencyContainer, { backgroundColor: COLORS.warning + '10' }]}>
          <Ionicons name="call" size={20} color={COLORS.warning} />
          <View style={styles.emergencyText}>
            <Text style={[styles.emergencyTitle, { color: theme.text }]}>
              {getText({
                en: 'Emergency Access',
                ar: 'الوصول الطارئ'
              })}
            </Text>
            <Text style={[styles.emergencyDescription, { color: theme.textSecondary }]}>
              {getText({
                en: 'Call +966-11-SUPPORT for urgent access requests',
                ar: 'اتصل على +966-11-SUPPORT لطلبات الوصول العاجلة'
              })}
            </Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xxl,
    maxWidth: 400,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  lockBackground: {
    width: 180,
    height: 180,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    elevation: 5,
    shadowColor: COLORS.error,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  chainOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  chain: {
    position: 'absolute',
    backgroundColor: COLORS.dark.text,
    borderRadius: 2,
  },
  chain1: {
    width: 4,
    height: 40,
    top: 10,
    left: 30,
    transform: [{ rotate: '15deg' }],
  },
  chain2: {
    width: 4,
    height: 35,
    bottom: 15,
    right: 25,
    transform: [{ rotate: '-20deg' }],
  },
  chain3: {
    width: 4,
    height: 30,
    top: 50,
    right: 40,
    transform: [{ rotate: '30deg' }],
  },
  warningIndicator: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.error,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  warning1: {
    top: 15,
    right: 15,
  },
  warning2: {
    bottom: 20,
    left: 20,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  lockedTitle: {
    fontSize: TYPOGRAPHY.sizes.h1,
    fontWeight: TYPOGRAPHY.weights.bold,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  lockedDescription: {
    fontSize: TYPOGRAPHY.sizes.body1,
    textAlign: 'center',
    lineHeight: 24,
  },
  timerCard: {
    width: '100%',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    elevation: 3,
    shadowColor: COLORS.error,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  timerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  timerTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  timerDisplay: {
    fontSize: 36,
    fontWeight: TYPOGRAPHY.weights.bold,
    fontFamily: 'monospace',
    marginBottom: SPACING.sm,
  },
  unlockDate: {
    fontSize: TYPOGRAPHY.sizes.body2,
    textAlign: 'center',
  },
  detailsCard: {
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
  detailsInfo: {
    gap: SPACING.sm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  detailLabel: {
    fontSize: TYPOGRAPHY.sizes.body2,
    flex: 1,
  },
  detailValue: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  tipsCard: {
    width: '100%',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.xl,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tipsList: {
    gap: SPACING.sm,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
  },
  tipText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    flex: 1,
    lineHeight: 18,
  },
  actionContainer: {
    width: '100%',
    marginBottom: SPACING.lg,
  },
  unlockButton: {
    marginBottom: SPACING.md,
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  secondaryActions: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  supportButton: {
    flex: 1,
  },
  backButton: {
    flex: 1,
  },
  emergencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.sm,
  },
  emergencyText: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  emergencyDescription: {
    fontSize: TYPOGRAPHY.sizes.caption,
    lineHeight: 16,
  },
});

export default AccountLockedScreen;
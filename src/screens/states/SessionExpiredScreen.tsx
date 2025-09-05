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
  onLogin?: () => void;
  onGuestContinue?: () => void;
  sessionDuration?: string;
  lastActivity?: string;
}

const SessionExpiredScreen: React.FC<Props> = ({
  onLogin,
  onGuestContinue,
  sessionDuration = '2 hours',
  lastActivity = '5 minutes ago',
}) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [countdown, setCountdown] = useState(30);
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const clockAnimation = new Animated.Value(0);
  const fadeAnimation = new Animated.Value(0);

  useEffect(() => {
    const animateClock = () => {
      Animated.sequence([
        Animated.timing(clockAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(clockAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => animateClock());
    };

    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    animateClock();

    const timer = setInterval(() => {
      setCountdown(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const clockRotation = clockAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1a1a1a', '#2d2d2d'] : ['#f8f9fa', '#ffffff']}
      style={styles.container}
    >
      <Animated.View style={[styles.content, { opacity: fadeAnimation }]}>
        {/* Session Icon */}
        <View style={styles.iconContainer}>
          <View style={[styles.iconBackground, { backgroundColor: COLORS.warning + '15' }]}>
            <Animated.View style={{ transform: [{ rotate: clockRotation }] }}>
              <Ionicons name="time" size={80} color={COLORS.warning} />
            </Animated.View>
            
            {/* Security Shield */}
            <View style={[styles.securityBadge, { backgroundColor: COLORS.error }]}>
              <Ionicons name="shield" size={20} color={COLORS.white} />
            </View>
          </View>
        </View>

        {/* Session Message */}
        <View style={styles.messageContainer}>
          <Text style={[styles.expiredTitle, { color: theme.text }]}>
            {getText({
              en: 'Session Expired',
              ar: 'انتهت صلاحية الجلسة'
            })}
          </Text>
          
          <Text style={[styles.expiredDescription, { color: theme.textSecondary }]}>
            {getText({
              en: 'Your session has expired for security reasons. Please log in again to continue using the app.',
              ar: 'انتهت صلاحية جلستك لأسباب أمنية. يرجى تسجيل الدخول مرة أخرى لمواصلة استخدام التطبيق.'
            })}
          </Text>
        </View>

        {/* Session Details */}
        <View style={[styles.detailsCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            {getText({
              en: 'Session Information',
              ar: 'معلومات الجلسة'
            })}
          </Text>
          
          <View style={styles.detailsInfo}>
            <View style={styles.detailRow}>
              <Ionicons name="time-outline" size={16} color={theme.textSecondary} />
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Session Duration:',
                  ar: 'مدة الجلسة:'
                })}
              </Text>
              <Text style={[styles.detailValue, { color: theme.text }]}>
                {sessionDuration}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Ionicons name="pulse" size={16} color={theme.textSecondary} />
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Last Activity:',
                  ar: 'آخر نشاط:'
                })}
              </Text>
              <Text style={[styles.detailValue, { color: theme.text }]}>
                {lastActivity}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Ionicons name="shield-checkmark" size={16} color={COLORS.success} />
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Security Status:',
                  ar: 'حالة الأمان:'
                })}
              </Text>
              <Text style={[styles.detailValue, { color: COLORS.success }]}>
                {getText({
                  en: 'Secure',
                  ar: 'آمن'
                })}
              </Text>
            </View>
          </View>
        </View>

        {/* Auto-redirect Notice */}
        {countdown > 0 && (
          <View style={[styles.countdownContainer, { backgroundColor: COLORS.info + '10' }]}>
            <Ionicons name="information-circle" size={20} color={COLORS.info} />
            <Text style={[styles.countdownText, { color: theme.text }]}>
              {getText({
                en: `Auto-redirecting to login in ${countdown}s`,
                ar: `إعادة التوجيه التلقائي لتسجيل الدخول خلال ${countdown} ثانية`
              })}
            </Text>
          </View>
        )}

        {/* Security Tips */}
        <View style={[styles.tipsCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            {getText({
              en: 'Security Tips',
              ar: 'نصائح الأمان'
            })}
          </Text>
          
          <View style={styles.tipsList}>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
              <Text style={[styles.tipText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Always log out when using shared devices',
                  ar: 'قم بتسجيل الخروج دائماً عند استخدام الأجهزة المشتركة'
                })}
              </Text>
            </View>
            
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
              <Text style={[styles.tipText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Keep your account secure with strong passwords',
                  ar: 'حافظ على أمان حسابك بكلمات مرور قوية'
                })}
              </Text>
            </View>
            
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
              <Text style={[styles.tipText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Enable two-factor authentication for extra security',
                  ar: 'فعل المصادقة الثنائية لمزيد من الأمان'
                })}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <CustomButton
            title={getText({
              en: 'Login Again',
              ar: 'تسجيل الدخول مرة أخرى'
            })}
            onPress={onLogin}
            icon="log-in"
            size="large"
            fullWidth
            customStyle={styles.loginButton}
          />

          <CustomButton
            title={getText({
              en: 'Continue as Guest',
              ar: 'متابعة كضيف'
            })}
            onPress={onGuestContinue}
            variant="outline"
            icon="person"
            size="medium"
            fullWidth
            customStyle={styles.guestButton}
          />
        </View>

        {/* Support Link */}
        <View style={styles.supportContainer}>
          <Ionicons name="headset" size={16} color={theme.textSecondary} />
          <Text style={[styles.supportText, { color: theme.textSecondary }]}>
            {getText({
              en: 'Having trouble? Contact our support team',
              ar: 'تواجه مشكلة؟ اتصل بفريق الدعم'
            })}
          </Text>
        </View>
      </Animated.View>
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
  iconBackground: {
    width: 160,
    height: 160,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    elevation: 5,
    shadowColor: COLORS.warning,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  securityBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  expiredTitle: {
    fontSize: TYPOGRAPHY.sizes.h1,
    fontWeight: TYPOGRAPHY.weights.bold,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  expiredDescription: {
    fontSize: TYPOGRAPHY.sizes.body1,
    textAlign: 'center',
    lineHeight: 24,
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
  countdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  countdownText: {
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
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  loginButton: {
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  guestButton: {},
  supportContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  supportText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    textAlign: 'center',
  },
});

export default SessionExpiredScreen;
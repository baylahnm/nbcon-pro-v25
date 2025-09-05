import React, { useState } from 'react';
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
  onRetry?: () => void;
  onReportIssue?: () => void;
  errorMessage?: string;
  errorCode?: string;
}

const Error500Screen: React.FC<Props> = ({
  onRetry,
  onReportIssue,
  errorMessage,
  errorCode = 'SRV_500',
}) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [retryCount, setRetryCount] = useState(0);
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const shakeAnimation = new Animated.Value(0);
  const pulseAnimation = new Animated.Value(1);

  React.useEffect(() => {
    // Server error shake animation
    const shake = () => {
      Animated.sequence([
        Animated.timing(shakeAnimation, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: -10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    };

    // Warning pulse animation
    const pulse = () => {
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };

    shake();
    pulse();
  }, []);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    onRetry?.();
  };

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1a1a1a', '#2d2d2d'] : ['#f8f9fa', '#ffffff']}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Server Error Illustration */}
        <View style={styles.illustrationContainer}>
          <Animated.View
            style={[
              styles.serverContainer,
              { transform: [{ translateX: shakeAnimation }] }
            ]}
          >
            <View style={[styles.serverBackground, { backgroundColor: theme.surface }]}>
              <Ionicons name="server" size={80} color={theme.text} />
              
              {/* Warning indicator */}
              <Animated.View
                style={[
                  styles.warningIndicator,
                  {
                    backgroundColor: COLORS.error,
                    transform: [{ scale: pulseAnimation }]
                  }
                ]}
              >
                <Ionicons name="warning" size={20} color={COLORS.white} />
              </Animated.View>
              
              {/* Error sparks */}
              <View style={[styles.errorSpark, styles.spark1]} />
              <View style={[styles.errorSpark, styles.spark2]} />
              <View style={[styles.errorSpark, styles.spark3]} />
            </View>
          </Animated.View>
        </View>

        {/* Error Message */}
        <View style={styles.messageContainer}>
          <Text style={[styles.errorTitle, { color: theme.text }]}>
            {getText({
              en: 'Server Error',
              ar: 'خطأ في الخادم'
            })}
          </Text>
          
          <Text style={[styles.errorDescription, { color: theme.textSecondary }]}>
            {errorMessage || getText({
              en: 'Something went wrong on our side. Our team has been notified and is working to fix this issue.',
              ar: 'حدث خطأ من جانبنا. تم إشعار فريقنا ونعمل على حل هذه المشكلة.'
            })}
          </Text>

          {/* Error Code */}
          <View style={[styles.errorCodeContainer, { backgroundColor: COLORS.error + '15' }]}>
            <Text style={[styles.errorCodeLabel, { color: COLORS.error }]}>
              {getText({
                en: 'Error Code:',
                ar: 'رمز الخطأ:'
              })}
            </Text>
            <Text style={[styles.errorCodeText, { color: COLORS.error }]}>
              {errorCode}
            </Text>
          </View>
        </View>

        {/* Status Information */}
        <View style={[styles.statusSection, { backgroundColor: theme.surface }]}>
          <View style={styles.statusHeader}>
            <Ionicons name="information-circle" size={24} color={COLORS.primary} />
            <Text style={[styles.statusTitle, { color: theme.text }]}>
              {getText({
                en: 'What\'s happening?',
                ar: 'ماذا يحدث؟'
              })}
            </Text>
          </View>
          
          <View style={styles.statusList}>
            <View style={styles.statusItem}>
              <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
              <Text style={[styles.statusText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Your data is safe and secure',
                  ar: 'بياناتك آمنة ومحمية'
                })}
              </Text>
            </View>
            
            <View style={styles.statusItem}>
              <Ionicons name="time" size={16} color={COLORS.warning} />
              <Text style={[styles.statusText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Our team is working on a fix',
                  ar: 'فريقنا يعمل على الإصلاح'
                })}
              </Text>
            </View>
            
            <View style={styles.statusItem}>
              <Ionicons name="refresh" size={16} color={COLORS.primary} />
              <Text style={[styles.statusText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'You can try again in a few minutes',
                  ar: 'يمكنك المحاولة مرة أخرى خلال دقائق'
                })}
              </Text>
            </View>
          </View>
          
          {retryCount > 0 && (
            <View style={[styles.retryInfo, { backgroundColor: COLORS.warning + '10' }]}>
              <Text style={[styles.retryText, { color: COLORS.warning }]}>
                {getText({
                  en: `Retry attempts: ${retryCount}`,
                  ar: `محاولات إعادة المحاولة: ${retryCount}`
                })}
              </Text>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <CustomButton
            title={getText({
              en: 'Try Again',
              ar: 'إعادة المحاولة'
            })}
            onPress={handleRetry}
            icon="refresh"
            size="large"
            fullWidth
            customStyle={styles.retryButton}
          />

          <CustomButton
            title={getText({
              en: 'Report Issue',
              ar: 'الإبلاغ عن المشكلة'
            })}
            onPress={onReportIssue}
            variant="outline"
            icon="bug"
            size="medium"
            fullWidth
            customStyle={styles.reportButton}
          />
        </View>

        {/* Support Information */}
        <View style={styles.supportContainer}>
          <Ionicons name="headset" size={20} color={theme.textSecondary} />
          <Text style={[styles.supportText, { color: theme.textSecondary }]}>
            {getText({
              en: 'Need immediate help? Contact our 24/7 support team',
              ar: 'تحتاج مساعدة فورية؟ اتصل بفريق الدعم على مدار الساعة'
            })}
          </Text>
        </View>

        {/* System Status Link */}
        <View style={[styles.statusLinkContainer, { borderTopColor: theme.border }]}>
          <Text style={[styles.statusLinkText, { color: theme.textSecondary }]}>
            {getText({
              en: 'Check system status at',
              ar: 'تحقق من حالة النظام في'
            })} 
          </Text>
          <Text style={[styles.statusLink, { color: COLORS.primary }]}>
            status.nbcon.pro
          </Text>
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
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  serverContainer: {
    position: 'relative',
  },
  serverBackground: {
    width: 160,
    height: 160,
    borderRadius: BORDER_RADIUS.xl,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  warningIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  errorSpark: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.warning,
  },
  spark1: {
    top: 30,
    left: 20,
  },
  spark2: {
    bottom: 40,
    right: 25,
  },
  spark3: {
    top: 80,
    left: 15,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  errorTitle: {
    fontSize: TYPOGRAPHY.sizes.h1,
    fontWeight: TYPOGRAPHY.weights.bold,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  errorDescription: {
    fontSize: TYPOGRAPHY.sizes.body1,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SPACING.lg,
  },
  errorCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.sm,
  },
  errorCodeLabel: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  errorCodeText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.bold,
    fontFamily: 'monospace',
  },
  statusSection: {
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
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  statusTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  statusList: {
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  statusText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    flex: 1,
  },
  retryInfo: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    alignItems: 'center',
  },
  retryText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  actionContainer: {
    width: '100%',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  retryButton: {
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  reportButton: {},
  supportContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.sm,
  },
  supportText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    flex: 1,
    textAlign: 'center',
  },
  statusLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    gap: SPACING.xs,
  },
  statusLinkText: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  statusLink: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
    textDecorationLine: 'underline',
  },
});

export default Error500Screen;
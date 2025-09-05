import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

interface Props {
  onAppeal?: () => void;
  onContactSupport?: () => void;
  onCreateNewAccount?: () => void;
  suspensionReason?: string;
  suspensionDate?: string;
  appealDeadline?: string;
  violationType?: 'minor' | 'major' | 'severe';
  canAppeal?: boolean;
}

const UserSuspendedScreen: React.FC<Props> = ({
  onAppeal,
  onContactSupport,
  onCreateNewAccount,
  suspensionReason = 'Violation of Community Guidelines',
  suspensionDate = '2024-01-15',
  appealDeadline = '2024-02-14',
  violationType = 'major',
  canAppeal = true,
}) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [daysRemaining, setDaysRemaining] = useState(30);
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const banAnimation = new Animated.Value(0);
  const warningAnimation = new Animated.Value(0);
  const timeAnimation = new Animated.Value(0);

  useEffect(() => {
    const animateBan = () => {
      Animated.sequence([
        Animated.timing(banAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(banAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]).start(() => animateBan());
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

    const animateTime = () => {
      Animated.timing(timeAnimation, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }).start(() => {
        timeAnimation.setValue(0);
        animateTime();
      });
    };

    animateBan();
    animateWarning();
    animateTime();

    // Calculate days remaining for appeal
    const today = new Date();
    const deadline = new Date(appealDeadline);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysRemaining(Math.max(0, diffDays));
  }, [appealDeadline]);

  const banScale = banAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.05],
  });

  const warningScale = warningAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.3],
  });

  const timeOpacity = timeAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.5, 1, 0.5],
  });

  const getViolationColor = () => {
    switch (violationType) {
      case 'minor': return COLORS.warning;
      case 'major': return COLORS.error;
      case 'severe': return '#8B0000';
      default: return COLORS.error;
    }
  };

  const getViolationIcon = () => {
    switch (violationType) {
      case 'minor': return 'warning';
      case 'major': return 'ban';
      case 'severe': return 'skull';
      default: return 'ban';
    }
  };

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1a1a1a', '#2d2d2d'] : ['#f8f9fa', '#ffffff']}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
      >
        {/* Suspension Illustration */}
        <View style={styles.illustrationContainer}>
          <Animated.View 
            style={[
              styles.banBackground,
              { 
                backgroundColor: getViolationColor() + '15',
                transform: [{ scale: banScale }]
              }
            ]}
          >
            <Ionicons 
              name={getViolationIcon() as any} 
              size={80} 
              color={getViolationColor()} 
            />
            
            {/* Warning indicators */}
            <Animated.View 
              style={[
                styles.warningIndicator,
                styles.warning1,
                { 
                  backgroundColor: getViolationColor(),
                  transform: [{ scale: warningScale }]
                }
              ]}
            >
              <Ionicons name="close" size={16} color={COLORS.white} />
            </Animated.View>
            
            <Animated.View 
              style={[
                styles.warningIndicator,
                styles.warning2,
                { 
                  backgroundColor: getViolationColor(),
                  transform: [{ scale: warningScale }]
                }
              ]}
            >
              <Ionicons name="close" size={16} color={COLORS.white} />
            </Animated.View>
            
            {/* Time indicator */}
            <Animated.View 
              style={[
                styles.timeIndicator,
                { opacity: timeOpacity }
              ]}
            >
              <Ionicons name="time" size={24} color={COLORS.warning} />
            </Animated.View>
          </Animated.View>
        </View>

        {/* Suspension Message */}
        <View style={styles.messageContainer}>
          <Text style={[styles.suspensionTitle, { color: theme.text }]}>
            {getText({
              en: 'Account Suspended',
              ar: 'تم تعليق الحساب'
            })}
          </Text>
          
          <Text style={[styles.suspensionDescription, { color: theme.textSecondary }]}>
            {getText({
              en: 'Your account has been suspended due to a violation of our terms of service. Review the details below.',
              ar: 'تم تعليق حسابك بسبب انتهاك شروط الخدمة الخاصة بنا. راجع التفاصيل أدناه.'
            })}
          </Text>
        </View>

        {/* Suspension Details */}
        <View style={[styles.detailsCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            {getText({
              en: 'Suspension Details',
              ar: 'تفاصيل التعليق'
            })}
          </Text>
          
          <View style={styles.detailsInfo}>
            <View style={styles.detailRow}>
              <Ionicons name="warning" size={16} color={getViolationColor()} />
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Reason:',
                  ar: 'السبب:'
                })}
              </Text>
              <Text style={[styles.detailValue, { color: theme.text }]}>
                {suspensionReason}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Ionicons name="calendar" size={16} color={theme.textSecondary} />
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Date:',
                  ar: 'التاريخ:'
                })}
              </Text>
              <Text style={[styles.detailValue, { color: theme.text }]}>
                {suspensionDate}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Ionicons name="flash" size={16} color={getViolationColor()} />
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Severity:',
                  ar: 'الخطورة:'
                })}
              </Text>
              <Text style={[styles.detailValue, { color: getViolationColor() }]}>
                {violationType.charAt(0).toUpperCase() + violationType.slice(1)}
              </Text>
            </View>
          </View>
        </View>

        {/* Appeal Information */}
        {canAppeal && (
          <View style={[styles.appealCard, { backgroundColor: COLORS.info + '10' }]}>
            <View style={styles.appealHeader}>
              <Ionicons name="document-text" size={24} color={COLORS.info} />
              <Text style={[styles.cardTitle, { color: theme.text }]}>
                {getText({
                  en: 'Appeal This Decision',
                  ar: 'استئناف هذا القرار'
                })}
              </Text>
            </View>
            
            <Text style={[styles.appealDescription, { color: theme.textSecondary }]}>
              {getText({
                en: 'You have the right to appeal this suspension. Submit your appeal with supporting evidence.',
                ar: 'لديك الحق في استئناف هذا التعليق. قدم استئنافك مع الأدلة الداعمة.'
              })}
            </Text>
            
            <View style={[styles.appealDeadline, { backgroundColor: COLORS.warning + '15' }]}>
              <Ionicons name="time" size={16} color={COLORS.warning} />
              <Text style={[styles.appealDeadlineText, { color: theme.text }]}>
                {getText({
                  en: `Appeal deadline: ${daysRemaining} days remaining`,
                  ar: `موعد الاستئناف: ${daysRemaining} يوم متبقي`
                })}
              </Text>
            </View>
          </View>
        )}

        {/* Community Guidelines */}
        <View style={[styles.guidelinesCard, { backgroundColor: theme.surface }]}>
          <View style={styles.guidelinesHeader}>
            <Ionicons name="shield-checkmark" size={24} color={COLORS.primary} />
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              {getText({
                en: 'Community Guidelines',
                ar: 'إرشادات المجتمع'
              })}
            </Text>
          </View>
          
          <View style={styles.guidelinesList}>
            <View style={styles.guidelineItem}>
              <Ionicons name="people" size={16} color={COLORS.success} />
              <Text style={[styles.guidelineText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Respect all community members',
                  ar: 'احترام جميع أعضاء المجتمع'
                })}
              </Text>
            </View>
            
            <View style={styles.guidelineItem}>
              <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
              <Text style={[styles.guidelineText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Provide accurate and honest information',
                  ar: 'تقديم معلومات دقيقة وصادقة'
                })}
              </Text>
            </View>
            
            <View style={styles.guidelineItem}>
              <Ionicons name="shield" size={16} color={COLORS.success} />
              <Text style={[styles.guidelineText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Maintain professional conduct',
                  ar: 'الحفاظ على السلوك المهني'
                })}
              </Text>
            </View>
            
            <View style={styles.guidelineItem}>
              <Ionicons name="ban" size={16} color={COLORS.error} />
              <Text style={[styles.guidelineText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'No harassment, spam, or fraudulent activity',
                  ar: 'لا للمضايقات أو البريد المزعج أو النشاط الاحتيالي'
                })}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          {canAppeal && (
            <CustomButton
              title={getText({
                en: 'Submit Appeal',
                ar: 'تقديم استئناف'
              })}
              onPress={onAppeal}
              icon="document-text"
              size="large"
              fullWidth
              customStyle={styles.appealButton}
            />
          )}

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
                en: 'New Account',
                ar: 'حساب جديد'
              })}
              onPress={onCreateNewAccount}
              variant="outline"
              icon="person-add"
              size="medium"
              customStyle={styles.newAccountButton}
            />
          </View>
        </View>

        {/* Legal Notice */}
        <View style={[styles.legalNotice, { backgroundColor: theme.surface }]}>
          <Ionicons name="document" size={16} color={theme.textSecondary} />
          <Text style={[styles.legalText, { color: theme.textSecondary }]}>
            {getText({
              en: 'By using NBCON Pro, you agree to our Terms of Service and Community Guidelines.',
              ar: 'باستخدام NBCON Pro، فإنك توافق على شروط الخدمة وإرشادات المجتمع الخاصة بنا.'
            })}
          </Text>
        </View>
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
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  banBackground: {
    width: 180,
    height: 180,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  warningIndicator: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  warning1: {
    top: 20,
    right: 20,
  },
  warning2: {
    bottom: 25,
    left: 25,
  },
  timeIndicator: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  suspensionTitle: {
    fontSize: TYPOGRAPHY.sizes.h1,
    fontWeight: TYPOGRAPHY.weights.bold,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  suspensionDescription: {
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
  appealCard: {
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
  appealHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  appealDescription: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  appealDeadline: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.sm,
  },
  appealDeadlineText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  guidelinesCard: {
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
  guidelinesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  guidelinesList: {
    gap: SPACING.sm,
  },
  guidelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
  },
  guidelineText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    flex: 1,
    lineHeight: 18,
  },
  actionContainer: {
    width: '100%',
    marginBottom: SPACING.lg,
  },
  appealButton: {
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
  newAccountButton: {
    flex: 1,
  },
  legalNotice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.sm,
    elevation: 1,
  },
  legalText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    flex: 1,
    lineHeight: 16,
  },
});

export default UserSuspendedScreen;
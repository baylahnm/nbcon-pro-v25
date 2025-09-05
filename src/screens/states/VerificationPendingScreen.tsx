import React, { useEffect } from 'react';
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
  onCheckStatus?: () => void;
  onContactSupport?: () => void;
  onUpdateInfo?: () => void;
  verificationType?: 'identity' | 'professional' | 'business' | 'all';
  submissionDate?: string;
  estimatedTime?: string;
  documentsSubmitted?: string[];
}

const VerificationPendingScreen: React.FC<Props> = ({
  onCheckStatus,
  onContactSupport,
  onUpdateInfo,
  verificationType = 'all',
  submissionDate = '2024-01-15',
  estimatedTime = '3-5 business days',
  documentsSubmitted = [
    'National ID',
    'Professional License',
    'CV/Resume',
    'Portfolio'
  ],
}) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const clockAnimation = new Animated.Value(0);
  const checkmarkAnimation = new Animated.Value(0);
  const pulseAnimation = new Animated.Value(0);

  useEffect(() => {
    const animateClock = () => {
      Animated.timing(clockAnimation, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      }).start(() => {
        clockAnimation.setValue(0);
        animateClock();
      });
    };

    const animateCheckmarks = () => {
      Animated.sequence([
        Animated.timing(checkmarkAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(checkmarkAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => animateCheckmarks());
    };

    const animatePulse = () => {
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]).start(() => animatePulse());
    };

    animateClock();
    animateCheckmarks();
    animatePulse();
  }, []);

  const clockRotation = clockAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const checkmarkScale = checkmarkAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1.2],
  });

  const pulseScale = pulseAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1],
  });

  const getVerificationSteps = () => {
    const allSteps = [
      {
        id: 'identity',
        icon: 'person',
        title: getText({ en: 'Identity Verification', ar: 'التحقق من الهوية' }),
        status: 'reviewing'
      },
      {
        id: 'professional',
        icon: 'school',
        title: getText({ en: 'Professional Credentials', ar: 'الشهادات المهنية' }),
        status: 'reviewing'
      },
      {
        id: 'business',
        icon: 'business',
        title: getText({ en: 'Business Registration', ar: 'تسجيل الأعمال' }),
        status: 'pending'
      },
      {
        id: 'background',
        icon: 'shield-checkmark',
        title: getText({ en: 'Background Check', ar: 'فحص الخلفية' }),
        status: 'pending'
      }
    ];

    if (verificationType === 'identity') {
      return allSteps.slice(0, 1);
    } else if (verificationType === 'professional') {
      return allSteps.slice(0, 2);
    } else if (verificationType === 'business') {
      return allSteps.slice(0, 3);
    }
    return allSteps;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return COLORS.success;
      case 'reviewing': return COLORS.warning;
      case 'pending': return COLORS.info;
      default: return theme.textSecondary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return 'checkmark-circle';
      case 'reviewing': return 'time';
      case 'pending': return 'ellipse-outline';
      default: return 'help-circle';
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
        {/* Verification Illustration */}
        <View style={styles.illustrationContainer}>
          <Animated.View 
            style={[
              styles.verificationBackground,
              { 
                backgroundColor: theme.surface,
                transform: [{ scale: pulseScale }]
              }
            ]}
          >
            <Animated.View style={{ transform: [{ rotate: clockRotation }] }}>
              <Ionicons name="time" size={60} color={COLORS.warning} />
            </Animated.View>
            
            {/* Floating checkmarks */}
            <Animated.View 
              style={[
                styles.floatingCheck,
                styles.check1,
                { transform: [{ scale: checkmarkScale }] }
              ]}
            >
              <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
            </Animated.View>
            
            <Animated.View 
              style={[
                styles.floatingCheck,
                styles.check2,
                { transform: [{ scale: checkmarkScale }] }
              ]}
            >
              <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
            </Animated.View>
            
            <Animated.View 
              style={[
                styles.floatingCheck,
                styles.check3,
                { transform: [{ scale: checkmarkScale }] }
              ]}
            >
              <Ionicons name="checkmark-circle" size={18} color={COLORS.success} />
            </Animated.View>

            {/* Progress ring */}
            <View style={[styles.progressRing, { borderColor: COLORS.warning + '30' }]}>
              <View style={[styles.progressSegment, { borderColor: COLORS.warning }]} />
            </View>
          </Animated.View>
        </View>

        {/* Verification Message */}
        <View style={styles.messageContainer}>
          <Text style={[styles.verificationTitle, { color: theme.text }]}>
            {getText({
              en: 'Verification in Progress',
              ar: 'التحقق قيد المعالجة'
            })}
          </Text>
          
          <Text style={[styles.verificationDescription, { color: theme.textSecondary }]}>
            {getText({
              en: 'Thank you for submitting your verification documents. Our team is currently reviewing your information.',
              ar: 'شكراً لك على تقديم مستندات التحقق. فريقنا يراجع معلوماتك حالياً.'
            })}
          </Text>
        </View>

        {/* Timeline Estimate */}
        <View style={[styles.timelineCard, { backgroundColor: COLORS.info + '10' }]}>
          <View style={styles.timelineHeader}>
            <Ionicons name="hourglass" size={24} color={COLORS.info} />
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              {getText({
                en: 'Estimated Timeline',
                ar: 'الجدول الزمني المقدر'
              })}
            </Text>
          </View>
          
          <Text style={[styles.timelineText, { color: theme.text }]}>
            {estimatedTime}
          </Text>
          
          <Text style={[styles.timelineSubtext, { color: theme.textSecondary }]}>
            {getText({
              en: `Submitted on ${submissionDate}`,
              ar: `تم التقديم في ${submissionDate}`
            })}
          </Text>
        </View>

        {/* Verification Steps */}
        <View style={[styles.stepsCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            {getText({
              en: 'Verification Steps',
              ar: 'خطوات التحقق'
            })}
          </Text>
          
          <View style={styles.stepsList}>
            {getVerificationSteps().map((step, index) => (
              <View key={step.id} style={styles.stepItem}>
                <View style={styles.stepIconContainer}>
                  <Ionicons 
                    name={getStatusIcon(step.status) as any} 
                    size={20} 
                    color={getStatusColor(step.status)} 
                  />
                  {index < getVerificationSteps().length - 1 && (
                    <View style={[styles.stepConnector, { backgroundColor: theme.border }]} />
                  )}
                </View>
                
                <View style={styles.stepContent}>
                  <Text style={[styles.stepTitle, { color: theme.text }]}>
                    {step.title}
                  </Text>
                  <Text style={[styles.stepStatus, { color: getStatusColor(step.status) }]}>
                    {getText({
                      en: step.status === 'reviewing' ? 'Under Review' : 
                          step.status === 'pending' ? 'Pending' : 'Completed',
                      ar: step.status === 'reviewing' ? 'قيد المراجعة' : 
                          step.status === 'pending' ? 'معلق' : 'مكتمل'
                    })}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Documents Submitted */}
        <View style={[styles.documentsCard, { backgroundColor: theme.surface }]}>
          <View style={styles.documentsHeader}>
            <Ionicons name="document-text" size={24} color={COLORS.success} />
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              {getText({
                en: 'Documents Submitted',
                ar: 'المستندات المقدمة'
              })}
            </Text>
          </View>
          
          <View style={styles.documentsList}>
            {documentsSubmitted.map((doc, index) => (
              <View key={index} style={styles.documentItem}>
                <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
                <Text style={[styles.documentText, { color: theme.textSecondary }]}>
                  {doc}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* What Happens Next */}
        <View style={[styles.nextStepsCard, { backgroundColor: theme.surface }]}>
          <View style={styles.nextStepsHeader}>
            <Ionicons name="arrow-forward-circle" size={24} color={COLORS.primary} />
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              {getText({
                en: 'What Happens Next?',
                ar: 'ما الذي سيحدث بعد ذلك؟'
              })}
            </Text>
          </View>
          
          <View style={styles.nextStepsList}>
            <View style={styles.nextStepItem}>
              <Text style={[styles.nextStepNumber, { color: COLORS.primary }]}>1</Text>
              <Text style={[styles.nextStepText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Our verification team reviews your documents',
                  ar: 'فريق التحقق يراجع مستنداتك'
                })}
              </Text>
            </View>
            
            <View style={styles.nextStepItem}>
              <Text style={[styles.nextStepNumber, { color: COLORS.primary }]}>2</Text>
              <Text style={[styles.nextStepText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'You\'ll receive an email with the verification result',
                  ar: 'ستتلقى بريداً إلكترونياً بنتيجة التحقق'
                })}
              </Text>
            </View>
            
            <View style={styles.nextStepItem}>
              <Text style={[styles.nextStepNumber, { color: COLORS.primary }]}>3</Text>
              <Text style={[styles.nextStepText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Upon approval, you\'ll have full access to all features',
                  ar: 'عند الموافقة، ستحصل على وصول كامل لجميع الميزات'
                })}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <CustomButton
            title={getText({
              en: 'Check Status',
              ar: 'تحقق من الحالة'
            })}
            onPress={onCheckStatus}
            icon="refresh"
            size="large"
            fullWidth
            customStyle={styles.statusButton}
          />

          <View style={styles.secondaryActions}>
            <CustomButton
              title={getText({
                en: 'Update Info',
                ar: 'تحديث المعلومات'
              })}
              onPress={onUpdateInfo}
              variant="outline"
              icon="create"
              size="medium"
              customStyle={styles.updateButton}
            />

            <CustomButton
              title={getText({
                en: 'Get Help',
                ar: 'احصل على مساعدة'
              })}
              onPress={onContactSupport}
              variant="outline"
              icon="headset"
              size="medium"
              customStyle={styles.helpButton}
            />
          </View>
        </View>

        {/* Support Notice */}
        <View style={[styles.supportNotice, { backgroundColor: COLORS.primary + '10' }]}>
          <Ionicons name="information-circle" size={20} color={COLORS.primary} />
          <Text style={[styles.supportText, { color: theme.textSecondary }]}>
            {getText({
              en: 'Need help with verification? Our support team is available 24/7 to assist you.',
              ar: 'تحتاج مساعدة في التحقق؟ فريق الدعم متاح على مدار الساعة لمساعدتك.'
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
  verificationBackground: {
    width: 160,
    height: 160,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  floatingCheck: {
    position: 'absolute',
  },
  check1: {
    top: 20,
    right: 30,
  },
  check2: {
    bottom: 30,
    left: 25,
  },
  check3: {
    top: 50,
    left: 20,
  },
  progressRing: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 2,
  },
  progressSegment: {
    position: 'absolute',
    top: -2,
    left: 45,
    width: 90,
    height: 2,
    borderTopWidth: 4,
    borderRadius: 2,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  verificationTitle: {
    fontSize: TYPOGRAPHY.sizes.h1,
    fontWeight: TYPOGRAPHY.weights.bold,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  verificationDescription: {
    fontSize: TYPOGRAPHY.sizes.body1,
    textAlign: 'center',
    lineHeight: 24,
  },
  timelineCard: {
    width: '100%',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  timelineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  cardTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  timelineText: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  timelineSubtext: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  stepsCard: {
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
  stepsList: {
    gap: SPACING.lg,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.md,
  },
  stepIconContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  stepConnector: {
    position: 'absolute',
    top: 24,
    width: 2,
    height: 32,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: SPACING.xs,
  },
  stepStatus: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  documentsCard: {
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
  documentsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  documentsList: {
    gap: SPACING.sm,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  documentText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    flex: 1,
  },
  nextStepsCard: {
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
  nextStepsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  nextStepsList: {
    gap: SPACING.md,
  },
  nextStepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.md,
  },
  nextStepNumber: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
    width: 24,
    height: 24,
    textAlign: 'center',
    lineHeight: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary + '20',
  },
  nextStepText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    flex: 1,
    lineHeight: 20,
  },
  actionContainer: {
    width: '100%',
    marginBottom: SPACING.lg,
  },
  statusButton: {
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
  updateButton: {
    flex: 1,
  },
  helpButton: {
    flex: 1,
  },
  supportNotice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.sm,
  },
  supportText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    flex: 1,
    lineHeight: 20,
  },
});

export default VerificationPendingScreen;
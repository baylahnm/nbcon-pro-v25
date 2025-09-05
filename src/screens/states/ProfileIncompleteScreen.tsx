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
  onCompleteProfile?: () => void;
  onSkipForNow?: () => void;
  onViewProfile?: () => void;
  completionPercentage?: number;
  missingFields?: string[];
  userType?: 'engineer' | 'client' | 'business';
}

const ProfileIncompleteScreen: React.FC<Props> = ({
  onCompleteProfile,
  onSkipForNow,
  onViewProfile,
  completionPercentage = 45,
  missingFields = [
    'Professional Photo',
    'Work Experience',
    'Portfolio Projects',
    'Certifications',
    'Skills & Specializations'
  ],
  userType = 'engineer',
}) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const profileAnimation = new Animated.Value(0);
  const progressAnimation = new Animated.Value(0);
  const fieldAnimation = new Animated.Value(0);
  const bounceAnimation = new Animated.Value(0);

  useEffect(() => {
    const animateProfile = () => {
      Animated.sequence([
        Animated.timing(profileAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(profileAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]).start(() => animateProfile());
    };

    const animateProgress = () => {
      Animated.timing(progressAnimation, {
        toValue: completionPercentage / 100,
        duration: 2000,
        useNativeDriver: false,
      }).start();
      
      // Animate percentage counter
      const timer = setInterval(() => {
        setAnimatedPercentage(prev => {
          if (prev >= completionPercentage) {
            clearInterval(timer);
            return completionPercentage;
          }
          return prev + 1;
        });
      }, 2000 / completionPercentage);
    };

    const animateFields = () => {
      Animated.sequence([
        Animated.timing(fieldAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fieldAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => animateFields());
    };

    const animateBounce = () => {
      Animated.sequence([
        Animated.timing(bounceAnimation, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnimation, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(() => animateBounce());
    };

    animateProfile();
    animateProgress();
    animateFields();
    animateBounce();
  }, [completionPercentage]);

  const profileScale = profileAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.05],
  });

  const progressWidth = progressAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const fieldScale = fieldAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.02],
  });

  const bounceTranslate = bounceAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -5],
  });

  const getProfileIcon = () => {
    switch (userType) {
      case 'engineer': return 'construct';
      case 'client': return 'person';
      case 'business': return 'business';
      default: return 'person';
    }
  };

  const getCompletionColor = () => {
    if (completionPercentage < 30) return COLORS.error;
    if (completionPercentage < 70) return COLORS.warning;
    return COLORS.success;
  };

  const getBenefits = () => {
    const common = [
      getText({ en: 'Increased visibility to potential clients', ar: 'زيادة الظهور للعملاء المحتملين' }),
      getText({ en: 'Higher chances of project invitations', ar: 'فرص أكبر لدعوات المشاريع' }),
      getText({ en: 'Build trust with verified credentials', ar: 'بناء الثقة بالبيانات المعتمدة' })
    ];

    if (userType === 'engineer') {
      return [
        ...common,
        getText({ en: 'Access to premium project opportunities', ar: 'الوصول لفرص المشاريع المميزة' }),
        getText({ en: 'Professional badge and verification', ar: 'شارة الاحترافية والتحقق' })
      ];
    } else if (userType === 'client') {
      return [
        getText({ en: 'Find the best engineers for your projects', ar: 'العثور على أفضل المهندسين لمشاريعك' }),
        getText({ en: 'Access to verified professionals', ar: 'الوصول للمهنيين المعتمدين' }),
        getText({ en: 'Priority support and assistance', ar: 'دعم ومساعدة ذات أولوية' })
      ];
    }
    return common;
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
        {/* Profile Completion Illustration */}
        <View style={styles.illustrationContainer}>
          <Animated.View 
            style={[
              styles.profileBackground,
              { 
                backgroundColor: theme.surface,
                transform: [{ scale: profileScale }]
              }
            ]}
          >
            <View style={styles.profileIconContainer}>
              <Ionicons name={getProfileIcon() as any} size={60} color={COLORS.primary} />
              
              {/* Progress overlay */}
              <View style={[styles.progressOverlay, { backgroundColor: getCompletionColor() + '20' }]}>
                <Text style={[styles.percentageText, { color: getCompletionColor() }]}>
                  {animatedPercentage}%
                </Text>
              </View>
            </View>
            
            {/* Missing field indicators */}
            <Animated.View 
              style={[
                styles.missingIndicator,
                styles.indicator1,
                { transform: [{ scale: fieldScale }] }
              ]}
            >
              <Ionicons name="alert-circle" size={16} color={COLORS.warning} />
            </Animated.View>
            
            <Animated.View 
              style={[
                styles.missingIndicator,
                styles.indicator2,
                { transform: [{ scale: fieldScale }] }
              ]}
            >
              <Ionicons name="alert-circle" size={16} color={COLORS.warning} />
            </Animated.View>
            
            <Animated.View 
              style={[
                styles.missingIndicator,
                styles.indicator3,
                { transform: [{ scale: fieldScale }] }
              ]}
            >
              <Ionicons name="alert-circle" size={16} color={COLORS.warning} />
            </Animated.View>
          </Animated.View>
        </View>

        {/* Completion Message */}
        <View style={styles.messageContainer}>
          <Text style={[styles.completionTitle, { color: theme.text }]}>
            {getText({
              en: 'Complete Your Profile',
              ar: 'أكمل ملفك الشخصي'
            })}
          </Text>
          
          <Text style={[styles.completionDescription, { color: theme.textSecondary }]}>
            {getText({
              en: 'Your profile is the key to success on NBCON Pro. Complete it to unlock all features and opportunities.',
              ar: 'ملفك الشخصي هو مفتاح النجاح في NBCON Pro. أكمله لتفتح جميع الميزات والفرص.'
            })}
          </Text>
        </View>

        {/* Progress Card */}
        <View style={[styles.progressCard, { backgroundColor: theme.surface }]}>
          <View style={styles.progressHeader}>
            <Text style={[styles.progressTitle, { color: theme.text }]}>
              {getText({
                en: 'Profile Completion',
                ar: 'اكتمال الملف الشخصي'
              })}
            </Text>
            <Text style={[styles.progressPercentage, { color: getCompletionColor() }]}>
              {animatedPercentage}%
            </Text>
          </View>
          
          <View style={[styles.progressBarContainer, { backgroundColor: theme.inputBackground }]}>
            <Animated.View 
              style={[
                styles.progressBar,
                { 
                  backgroundColor: getCompletionColor(),
                  width: progressWidth
                }
              ]}
            />
          </View>
          
          <Text style={[styles.progressSubtext, { color: theme.textSecondary }]}>
            {getText({
              en: `${missingFields.length} fields remaining`,
              ar: `${missingFields.length} حقول متبقية`
            })}
          </Text>
        </View>

        {/* Missing Fields */}
        <View style={[styles.fieldsCard, { backgroundColor: theme.surface }]}>
          <View style={styles.fieldsHeader}>
            <Ionicons name="clipboard" size={24} color={COLORS.warning} />
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              {getText({
                en: 'Complete These Fields',
                ar: 'أكمل هذه الحقول'
              })}
            </Text>
          </View>
          
          <View style={styles.fieldsList}>
            {missingFields.map((field, index) => (
              <Animated.View 
                key={index}
                style={[
                  styles.fieldItem,
                  { transform: [{ translateY: bounceTranslate }] }
                ]}
              >
                <Ionicons name="radio-button-off" size={16} color={COLORS.warning} />
                <Text style={[styles.fieldText, { color: theme.textSecondary }]}>
                  {field}
                </Text>
                <Ionicons name="chevron-forward" size={16} color={theme.textSecondary} />
              </Animated.View>
            ))}
          </View>
        </View>

        {/* Benefits */}
        <View style={[styles.benefitsCard, { backgroundColor: COLORS.success + '10' }]}>
          <View style={styles.benefitsHeader}>
            <Ionicons name="trophy" size={24} color={COLORS.success} />
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              {getText({
                en: 'Why Complete Your Profile?',
                ar: 'لماذا تكمل ملفك الشخصي؟'
              })}
            </Text>
          </View>
          
          <View style={styles.benefitsList}>
            {getBenefits().map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
                <Text style={[styles.benefitText, { color: theme.textSecondary }]}>
                  {benefit}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Stats */}
        <View style={[styles.statsCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.statsTitle, { color: theme.text }]}>
            {getText({
              en: 'Profile Impact Statistics',
              ar: 'إحصائيات تأثير الملف الشخصي'
            })}
          </Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: COLORS.primary }]}>3.2x</Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                {getText({ en: 'More Views', ar: 'مشاهدات أكثر' })}
              </Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: COLORS.success }]}>85%</Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                {getText({ en: 'Higher Response', ar: 'استجابة أعلى' })}
              </Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: COLORS.warning }]}>5x</Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                {getText({ en: 'More Invitations', ar: 'دعوات أكثر' })}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <CustomButton
            title={getText({
              en: 'Complete Profile Now',
              ar: 'أكمل الملف الآن'
            })}
            onPress={onCompleteProfile}
            icon="create"
            size="large"
            fullWidth
            customStyle={styles.completeButton}
          />

          <View style={styles.secondaryActions}>
            <CustomButton
              title={getText({
                en: 'View Profile',
                ar: 'عرض الملف'
              })}
              onPress={onViewProfile}
              variant="outline"
              icon="eye"
              size="medium"
              customStyle={styles.viewButton}
            />

            <CustomButton
              title={getText({
                en: 'Skip for Now',
                ar: 'تخطي الآن'
              })}
              onPress={onSkipForNow}
              variant="outline"
              icon="time"
              size="medium"
              customStyle={styles.skipButton}
            />
          </View>
        </View>

        {/* Completion Timeline */}
        <View style={[styles.timelineCard, { backgroundColor: COLORS.info + '10' }]}>
          <View style={styles.timelineHeader}>
            <Ionicons name="time" size={20} color={COLORS.info} />
            <Text style={[styles.timelineTitle, { color: theme.text }]}>
              {getText({
                en: 'Estimated Completion Time',
                ar: 'الوقت المقدر للإكمال'
              })}
            </Text>
          </View>
          
          <Text style={[styles.timelineText, { color: theme.textSecondary }]}>
            {getText({
              en: '10-15 minutes to complete all remaining fields',
              ar: '10-15 دقيقة لإكمال جميع الحقول المتبقية'
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
  profileBackground: {
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
  profileIconContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  progressOverlay: {
    position: 'absolute',
    bottom: -10,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  percentageText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  missingIndicator: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  indicator1: {
    top: 20,
    right: 20,
  },
  indicator2: {
    bottom: 30,
    left: 25,
  },
  indicator3: {
    top: 60,
    left: 15,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  completionTitle: {
    fontSize: TYPOGRAPHY.sizes.h1,
    fontWeight: TYPOGRAPHY.weights.bold,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  completionDescription: {
    fontSize: TYPOGRAPHY.sizes.body1,
    textAlign: 'center',
    lineHeight: 24,
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
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  progressTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  progressPercentage: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
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
  progressSubtext: {
    fontSize: TYPOGRAPHY.sizes.body2,
    textAlign: 'center',
  },
  fieldsCard: {
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
  fieldsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  cardTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  fieldsList: {
    gap: SPACING.sm,
  },
  fieldItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    gap: SPACING.sm,
  },
  fieldText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    flex: 1,
  },
  benefitsCard: {
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
  benefitsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  benefitsList: {
    gap: SPACING.sm,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
  },
  benefitText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    flex: 1,
    lineHeight: 18,
  },
  statsCard: {
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
  statsTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle2,
    fontWeight: TYPOGRAPHY.weights.bold,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: TYPOGRAPHY.sizes.h2,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.sizes.caption,
    textAlign: 'center',
  },
  actionContainer: {
    width: '100%',
    marginBottom: SPACING.lg,
  },
  completeButton: {
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
  viewButton: {
    flex: 1,
  },
  skipButton: {
    flex: 1,
  },
  timelineCard: {
    width: '100%',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  timelineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
    gap: SPACING.sm,
  },
  timelineTitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  timelineText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    textAlign: 'center',
  },
});

export default ProfileIncompleteScreen;
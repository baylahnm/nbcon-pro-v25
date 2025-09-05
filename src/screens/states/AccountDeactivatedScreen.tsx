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
  onReactivate?: () => void;
  onDeleteAccount?: () => void;
  onContactSupport?: () => void;
  deactivationDate?: string;
  deactivationReason?: string;
  dataRetentionPeriod?: string;
  canReactivate?: boolean;
}

const AccountDeactivatedScreen: React.FC<Props> = ({
  onReactivate,
  onDeleteAccount,
  onContactSupport,
  deactivationDate = '2024-01-15',
  deactivationReason = 'User requested deactivation',
  dataRetentionPeriod = '30 days',
  canReactivate = true,
}) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [daysRemaining, setDaysRemaining] = useState(25);
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const pauseAnimation = new Animated.Value(0);
  const dataAnimation = new Animated.Value(0);
  const clockAnimation = new Animated.Value(0);

  useEffect(() => {
    const animatePause = () => {
      Animated.sequence([
        Animated.timing(pauseAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pauseAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]).start(() => animatePause());
    };

    const animateData = () => {
      Animated.sequence([
        Animated.timing(dataAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(dataAnimation, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]).start(() => animateData());
    };

    const animateClock = () => {
      Animated.timing(clockAnimation, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }).start(() => {
        clockAnimation.setValue(0);
        animateClock();
      });
    };

    animatePause();
    animateData();
    animateClock();

    // Calculate days remaining
    const today = new Date();
    const deactivation = new Date(deactivationDate);
    const retentionEnd = new Date(deactivation.getTime() + 30 * 24 * 60 * 60 * 1000);
    const diffTime = retentionEnd.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysRemaining(Math.max(0, diffDays));
  }, [deactivationDate]);

  const pauseScale = pauseAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1],
  });

  const dataOpacity = dataAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  const clockRotation = clockAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
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
        {/* Deactivation Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={[styles.accountBackground, { backgroundColor: theme.surface }]}>
            <Animated.View 
              style={[
                styles.pauseIcon,
                { transform: [{ scale: pauseScale }] }
              ]}
            >
              <Ionicons name="pause-circle" size={80} color={COLORS.warning} />
            </Animated.View>
            
            {/* Data boxes */}
            <Animated.View 
              style={[
                styles.dataBox,
                styles.dataBox1,
                { opacity: dataOpacity }
              ]}
            >
              <Ionicons name="folder" size={20} color={COLORS.info} />
            </Animated.View>
            
            <Animated.View 
              style={[
                styles.dataBox,
                styles.dataBox2,
                { opacity: dataOpacity }
              ]}
            >
              <Ionicons name="document-text" size={16} color={COLORS.success} />
            </Animated.View>
            
            <Animated.View 
              style={[
                styles.dataBox,
                styles.dataBox3,
                { opacity: dataOpacity }
              ]}
            >
              <Ionicons name="image" size={18} color={COLORS.secondary} />
            </Animated.View>
            
            {/* Clock indicator */}
            <Animated.View 
              style={[
                styles.clockIndicator,
                { transform: [{ rotate: clockRotation }] }
              ]}
            >
              <Ionicons name="time" size={24} color={COLORS.error} />
            </Animated.View>
          </View>
        </View>

        {/* Deactivation Message */}
        <View style={styles.messageContainer}>
          <Text style={[styles.deactivationTitle, { color: theme.text }]}>
            {getText({
              en: 'Account Deactivated',
              ar: 'تم إلغاء تفعيل الحساب'
            })}
          </Text>
          
          <Text style={[styles.deactivationDescription, { color: theme.textSecondary }]}>
            {getText({
              en: 'Your account has been temporarily deactivated. Your data is safely stored and you can reactivate anytime.',
              ar: 'تم إلغاء تفعيل حسابك مؤقتاً. بياناتك محفوظة بأمان ويمكنك إعادة التفعيل في أي وقت.'
            })}
          </Text>
        </View>

        {/* Data Retention Notice */}
        <View style={[styles.retentionCard, { backgroundColor: COLORS.warning + '10' }]}>
          <View style={styles.retentionHeader}>
            <Ionicons name="shield-checkmark" size={24} color={COLORS.warning} />
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              {getText({
                en: 'Data Protection',
                ar: 'حماية البيانات'
              })}
            </Text>
          </View>
          
          <Text style={[styles.retentionText, { color: theme.textSecondary }]}>
            {getText({
              en: `Your data will be safely stored for ${dataRetentionPeriod}. After this period, it will be permanently deleted unless you reactivate your account.`,
              ar: `سيتم حفظ بياناتك بأمان لمدة ${dataRetentionPeriod}. بعد هذه الفترة، ستحذف نهائياً إلا إذا أعدت تفعيل حسابك.`
            })}
          </Text>
          
          <View style={[styles.countdownContainer, { backgroundColor: COLORS.error + '15' }]}>
            <Ionicons name="hourglass" size={16} color={COLORS.error} />
            <Text style={[styles.countdownText, { color: COLORS.error }]}>
              {getText({
                en: `${daysRemaining} days remaining`,
                ar: `${daysRemaining} يوم متبقي`
              })}
            </Text>
          </View>
        </View>

        {/* Deactivation Details */}
        <View style={[styles.detailsCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            {getText({
              en: 'Deactivation Details',
              ar: 'تفاصيل إلغاء التفعيل'
            })}
          </Text>
          
          <View style={styles.detailsInfo}>
            <View style={styles.detailRow}>
              <Ionicons name="calendar" size={16} color={theme.textSecondary} />
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Deactivated On:',
                  ar: 'ألغي التفعيل في:'
                })}
              </Text>
              <Text style={[styles.detailValue, { color: theme.text }]}>
                {deactivationDate}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Ionicons name="information-circle" size={16} color={theme.textSecondary} />
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Reason:',
                  ar: 'السبب:'
                })}
              </Text>
              <Text style={[styles.detailValue, { color: theme.text }]}>
                {deactivationReason}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Ionicons name="database" size={16} color={COLORS.success} />
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Data Status:',
                  ar: 'حالة البيانات:'
                })}
              </Text>
              <Text style={[styles.detailValue, { color: COLORS.success }]}>
                {getText({
                  en: 'Safely Stored',
                  ar: 'محفوظة بأمان'
                })}
              </Text>
            </View>
          </View>
        </View>

        {/* What's Preserved */}
        <View style={[styles.preservedCard, { backgroundColor: theme.surface }]}>
          <View style={styles.preservedHeader}>
            <Ionicons name="archive" size={24} color={COLORS.info} />
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              {getText({
                en: 'What\'s Preserved',
                ar: 'ما تم حفظه'
              })}
            </Text>
          </View>
          
          <View style={styles.preservedList}>
            <View style={styles.preservedItem}>
              <Ionicons name="person" size={16} color={COLORS.success} />
              <Text style={[styles.preservedText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Profile information and settings',
                  ar: 'معلومات الملف الشخصي والإعدادات'
                })}
              </Text>
            </View>
            
            <View style={styles.preservedItem}>
              <Ionicons name="briefcase" size={16} color={COLORS.success} />
              <Text style={[styles.preservedText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Project history and portfolio',
                  ar: 'سجل المشاريع والمحفظة'
                })}
              </Text>
            </View>
            
            <View style={styles.preservedItem}>
              <Ionicons name="star" size={16} color={COLORS.success} />
              <Text style={[styles.preservedText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Reviews and ratings received',
                  ar: 'المراجعات والتقييمات المستلمة'
                })}
              </Text>
            </View>
            
            <View style={styles.preservedItem}>
              <Ionicons name="card" size={16} color={COLORS.success} />
              <Text style={[styles.preservedText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Payment methods and transaction history',
                  ar: 'طرق الدفع وسجل المعاملات'
                })}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          {canReactivate && (
            <CustomButton
              title={getText({
                en: 'Reactivate Account',
                ar: 'إعادة تفعيل الحساب'
              })}
              onPress={onReactivate}
              icon="play-circle"
              size="large"
              fullWidth
              customStyle={styles.reactivateButton}
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
                en: 'Delete Account',
                ar: 'حذف الحساب'
              })}
              onPress={onDeleteAccount}
              variant="outline"
              icon="trash"
              size="medium"
              customStyle={[styles.deleteButton, { borderColor: COLORS.error, backgroundColor: COLORS.error + '10' }]}
            />
          </View>
        </View>

        {/* Reactivation Benefits */}
        <View style={[styles.benefitsCard, { backgroundColor: COLORS.success + '10' }]}>
          <View style={styles.benefitsHeader}>
            <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
            <Text style={[styles.benefitsTitle, { color: theme.text }]}>
              {getText({
                en: 'Reactivation Benefits',
                ar: 'فوائد إعادة التفعيل'
              })}
            </Text>
          </View>
          
          <Text style={[styles.benefitsText, { color: theme.textSecondary }]}>
            {getText({
              en: 'When you reactivate your account, all your data, projects, and connections will be restored exactly as you left them.',
              ar: 'عند إعادة تفعيل حسابك، ستتم استعادة جميع بياناتك ومشاريعك واتصالاتك كما تركتها تماماً.'
            })}
          </Text>
        </View>

        {/* Security Notice */}
        <View style={[styles.securityNotice, { backgroundColor: theme.surface }]}>
          <Ionicons name="lock-closed" size={16} color={COLORS.info} />
          <Text style={[styles.securityText, { color: theme.textSecondary }]}>
            {getText({
              en: 'Your account security settings remain unchanged. You can reactivate using your existing credentials.',
              ar: 'تبقى إعدادات أمان حسابك دون تغيير. يمكنك إعادة التفعيل باستخدام بيانات الاعتماد الحالية.'
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
  accountBackground: {
    width: 180,
    height: 180,
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
  pauseIcon: {
    zIndex: 1,
  },
  dataBox: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.light.surface,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  dataBox1: {
    top: 30,
    left: 20,
  },
  dataBox2: {
    top: 40,
    right: 25,
  },
  dataBox3: {
    bottom: 35,
    left: 30,
  },
  clockIndicator: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  deactivationTitle: {
    fontSize: TYPOGRAPHY.sizes.h1,
    fontWeight: TYPOGRAPHY.weights.bold,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  deactivationDescription: {
    fontSize: TYPOGRAPHY.sizes.body1,
    textAlign: 'center',
    lineHeight: 24,
  },
  retentionCard: {
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
  retentionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  cardTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  retentionText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  countdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.sm,
  },
  countdownText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.bold,
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
  preservedCard: {
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
  preservedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  preservedList: {
    gap: SPACING.sm,
  },
  preservedItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
  },
  preservedText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    flex: 1,
    lineHeight: 18,
  },
  actionContainer: {
    width: '100%',
    marginBottom: SPACING.lg,
  },
  reactivateButton: {
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
  deleteButton: {
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
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  benefitsTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle2,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  benefitsText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 20,
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.sm,
    elevation: 1,
  },
  securityText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    flex: 1,
    lineHeight: 16,
  },
});

export default AccountDeactivatedScreen;
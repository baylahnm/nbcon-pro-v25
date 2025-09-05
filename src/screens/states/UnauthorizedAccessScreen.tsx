import React, { useEffect } from 'react';
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
  onGoBack?: () => void;
  onContactSupport?: () => void;
  restrictedResource?: string;
  requiredPermission?: string;
  userRole?: string;
}

const UnauthorizedAccessScreen: React.FC<Props> = ({
  onLogin,
  onGoBack,
  onContactSupport,
  restrictedResource = 'Premium Features',
  requiredPermission = 'Premium Membership',
  userRole = 'Basic User',
}) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const shieldAnimation = new Animated.Value(0);
  const lockAnimation = new Animated.Value(0);
  const alertAnimation = new Animated.Value(0);

  useEffect(() => {
    const animateShield = () => {
      Animated.sequence([
        Animated.timing(shieldAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(shieldAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]).start(() => animateShield());
    };

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

    const animateAlert = () => {
      Animated.sequence([
        Animated.timing(alertAnimation, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(alertAnimation, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(() => animateAlert());
    };

    animateShield();
    setTimeout(() => animateLock(), 300);
    setTimeout(() => animateAlert(), 600);
  }, []);

  const shieldScale = shieldAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1],
  });

  const lockOpacity = lockAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  const alertScale = alertAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1a1a1a', '#2d2d2d'] : ['#f8f9fa', '#ffffff']}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Access Denied Illustration */}
        <View style={styles.iconContainer}>
          <Animated.View 
            style={[
              styles.shieldBackground, 
              { 
                backgroundColor: COLORS.error + '15',
                transform: [{ scale: shieldScale }]
              }
            ]}
          >
            <Ionicons name="shield" size={80} color={COLORS.error} />
            
            {/* Lock overlay */}
            <Animated.View 
              style={[
                styles.lockOverlay,
                { opacity: lockOpacity }
              ]}
            >
              <Ionicons name="lock-closed" size={40} color={COLORS.error} />
            </Animated.View>
            
            {/* Alert indicators */}
            <Animated.View 
              style={[
                styles.alertIndicator,
                styles.alert1,
                { transform: [{ scale: alertScale }] }
              ]}
            >
              <Ionicons name="warning" size={12} color={COLORS.white} />
            </Animated.View>
            
            <Animated.View 
              style={[
                styles.alertIndicator,
                styles.alert2,
                { transform: [{ scale: alertScale }] }
              ]}
            >
              <Ionicons name="warning" size={12} color={COLORS.white} />
            </Animated.View>
          </Animated.View>
        </View>

        {/* Error Message */}
        <View style={styles.messageContainer}>
          <Text style={[styles.accessTitle, { color: theme.text }]}>
            {getText({
              en: 'Access Denied',
              ar: 'تم رفض الوصول'
            })}
          </Text>
          
          <Text style={[styles.accessDescription, { color: theme.textSecondary }]}>
            {getText({
              en: 'You don\'t have permission to access this resource. Please check your account permissions or contact support.',
              ar: 'ليس لديك الإذن للوصول إلى هذا المورد. يرجى التحقق من أذونات حسابك أو الاتصال بالدعم.'
            })}
          </Text>
        </View>

        {/* Access Details */}
        <View style={[styles.detailsCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            {getText({
              en: 'Access Information',
              ar: 'معلومات الوصول'
            })}
          </Text>
          
          <View style={styles.detailsInfo}>
            <View style={styles.detailRow}>
              <Ionicons name="document-text" size={16} color={theme.textSecondary} />
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Resource:',
                  ar: 'المورد:'
                })}
              </Text>
              <Text style={[styles.detailValue, { color: theme.text }]}>
                {restrictedResource}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Ionicons name="key" size={16} color={theme.textSecondary} />
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Required:',
                  ar: 'المطلوب:'
                })}
              </Text>
              <Text style={[styles.detailValue, { color: COLORS.warning }]}>
                {requiredPermission}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Ionicons name="person" size={16} color={theme.textSecondary} />
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Your Role:',
                  ar: 'دورك:'
                })}
              </Text>
              <Text style={[styles.detailValue, { color: theme.text }]}>
                {userRole}
              </Text>
            </View>
          </View>
        </View>

        {/* Upgrade Options */}
        <View style={[styles.upgradeCard, { backgroundColor: COLORS.primary + '10' }]}>
          <View style={styles.upgradeHeader}>
            <Ionicons name="diamond" size={24} color={COLORS.primary} />
            <Text style={[styles.upgradeTitle, { color: theme.text }]}>
              {getText({
                en: 'Upgrade Your Account',
                ar: 'ترقية حسابك'
              })}
            </Text>
          </View>
          
          <Text style={[styles.upgradeDescription, { color: theme.textSecondary }]}>
            {getText({
              en: 'Get access to premium features and unlock your full potential with NBCON Pro.',
              ar: 'احصل على إمكانية الوصول إلى الميزات المميزة واطلق إمكاناتك الكاملة مع NBCON Pro.'
            })}
          </Text>
          
          <View style={styles.benefitsList}>
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
              <Text style={[styles.benefitText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Access to all premium features',
                  ar: 'الوصول لجميع الميزات المميزة'
                })}
              </Text>
            </View>
            
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
              <Text style={[styles.benefitText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Priority customer support',
                  ar: 'دعم عملاء ذو أولوية'
                })}
              </Text>
            </View>
            
            <View style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
              <Text style={[styles.benefitText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Advanced analytics and reporting',
                  ar: 'التحليلات والتقارير المتقدمة'
                })}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <CustomButton
            title={getText({
              en: 'Upgrade Now',
              ar: 'ترقية الآن'
            })}
            onPress={onLogin}
            icon="diamond"
            size="large"
            fullWidth
            customStyle={styles.upgradeButton}
          />

          <View style={styles.secondaryActions}>
            <CustomButton
              title={getText({
                en: 'Go Back',
                ar: 'العودة'
              })}
              onPress={onGoBack}
              variant="outline"
              icon="arrow-back"
              size="medium"
              customStyle={styles.backButton}
            />

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
          </View>
        </View>

        {/* Security Notice */}
        <View style={[styles.securityNotice, { backgroundColor: theme.surface }]}>
          <Ionicons name="information-circle" size={16} color={COLORS.info} />
          <Text style={[styles.securityText, { color: theme.textSecondary }]}>
            {getText({
              en: 'This access attempt has been logged for security purposes.',
              ar: 'تم تسجيل محاولة الوصول هذه لأغراض أمنية.'
            })}
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
  iconContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  shieldBackground: {
    width: 160,
    height: 160,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    elevation: 5,
    shadowColor: COLORS.error,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  lockOverlay: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  alertIndicator: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.error,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  alert1: {
    top: 20,
    left: 20,
  },
  alert2: {
    top: 40,
    right: 15,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  accessTitle: {
    fontSize: TYPOGRAPHY.sizes.h1,
    fontWeight: TYPOGRAPHY.weights.bold,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  accessDescription: {
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
  upgradeCard: {
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
  upgradeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  upgradeTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  upgradeDescription: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  benefitsList: {
    gap: SPACING.sm,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  benefitText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    flex: 1,
  },
  actionContainer: {
    width: '100%',
    marginBottom: SPACING.lg,
  },
  upgradeButton: {
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
  backButton: {
    flex: 1,
  },
  supportButton: {
    flex: 1,
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.sm,
  },
  securityText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    flex: 1,
    textAlign: 'center',
  },
});

export default UnauthorizedAccessScreen;
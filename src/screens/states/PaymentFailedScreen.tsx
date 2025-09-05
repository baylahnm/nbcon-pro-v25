import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

interface Props {
  onRetryPayment?: () => void;
  onChangePaymentMethod?: () => void;
  onContactSupport?: () => void;
  errorMessage?: string;
  amount?: string;
  paymentMethod?: string;
}

const PAYMENT_METHODS = [
  { id: 'mada', name: 'mada', icon: 'card', color: COLORS.primary },
  { id: 'stc_pay', name: 'STC Pay', icon: 'phone-portrait', color: COLORS.success },
  { id: 'apple_pay', name: 'Apple Pay', icon: 'logo-apple', color: COLORS.dark.text },
  { id: 'visa', name: 'Visa/Mastercard', icon: 'card', color: COLORS.secondary },
];

const PaymentFailedScreen: React.FC<Props> = ({
  onRetryPayment,
  onChangePaymentMethod,
  onContactSupport,
  errorMessage,
  amount = '250.00 SAR',
  paymentMethod = 'mada',
}) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const getErrorReason = () => {
    const reasons = [
      getText({
        en: 'Insufficient funds in account',
        ar: 'رصيد غير كافٍ في الحساب'
      }),
      getText({
        en: 'Card expired or blocked',
        ar: 'البطاقة منتهية الصلاحية أو محجوبة'
      }),
      getText({
        en: 'Network connection issue',
        ar: 'مشكلة في اتصال الشبكة'
      }),
      getText({
        en: 'Bank declined the transaction',
        ar: 'البنك رفض المعاملة'
      }),
    ];
    return reasons;
  };

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1a1a1a', '#2d2d2d'] : ['#f8f9fa', '#ffffff']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Error Icon */}
        <View style={styles.iconContainer}>
          <View style={[styles.iconBackground, { backgroundColor: COLORS.error + '15' }]}>
            <Ionicons name="close-circle" size={80} color={COLORS.error} />
          </View>
        </View>

        {/* Error Message */}
        <View style={styles.messageContainer}>
          <Text style={[styles.errorTitle, { color: theme.text }]}>
            {getText({
              en: 'Payment Failed',
              ar: 'فشل الدفع'
            })}
          </Text>
          
          <Text style={[styles.errorDescription, { color: theme.textSecondary }]}>
            {errorMessage || getText({
              en: 'We couldn\'t process your payment. Please check your payment method and try again.',
              ar: 'لم نتمكن من معالجة دفعتك. يرجى التحقق من وسيلة الدفع والمحاولة مرة أخرى.'
            })}
          </Text>
        </View>

        {/* Payment Details */}
        <View style={[styles.paymentDetailsCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            {getText({
              en: 'Payment Details',
              ar: 'تفاصيل الدفع'
            })}
          </Text>
          
          <View style={styles.paymentInfo}>
            <View style={styles.paymentRow}>
              <Text style={[styles.paymentLabel, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Amount:',
                  ar: 'المبلغ:'
                })}
              </Text>
              <Text style={[styles.paymentValue, { color: theme.text }]}>
                {amount}
              </Text>
            </View>
            
            <View style={styles.paymentRow}>
              <Text style={[styles.paymentLabel, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Method:',
                  ar: 'الوسيلة:'
                })}
              </Text>
              <Text style={[styles.paymentValue, { color: theme.text }]}>
                {paymentMethod}
              </Text>
            </View>
            
            <View style={styles.paymentRow}>
              <Text style={[styles.paymentLabel, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Status:',
                  ar: 'الحالة:'
                })}
              </Text>
              <View style={[styles.statusBadge, { backgroundColor: COLORS.error + '15' }]}>
                <Text style={[styles.statusText, { color: COLORS.error }]}>
                  {getText({
                    en: 'Failed',
                    ar: 'فشل'
                  })}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Possible Reasons */}
        <View style={[styles.reasonsCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            {getText({
              en: 'Possible Reasons:',
              ar: 'الأسباب المحتملة:'
            })}
          </Text>
          
          <View style={styles.reasonsList}>
            {getErrorReason().map((reason, index) => (
              <View key={index} style={styles.reasonItem}>
                <Ionicons name="information-circle" size={16} color={COLORS.warning} />
                <Text style={[styles.reasonText, { color: theme.textSecondary }]}>
                  {reason}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Alternative Payment Methods */}
        <View style={[styles.methodsCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            {getText({
              en: 'Try Another Payment Method:',
              ar: 'جرب وسيلة دفع أخرى:'
            })}
          </Text>
          
          <View style={styles.methodsGrid}>
            {PAYMENT_METHODS.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[styles.methodCard, { backgroundColor: theme.inputBackground }]}
                onPress={() => onChangePaymentMethod?.()}
              >
                <Ionicons name={method.icon as any} size={24} color={method.color} />
                <Text style={[styles.methodName, { color: theme.text }]}>
                  {method.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <CustomButton
            title={getText({
              en: 'Retry Payment',
              ar: 'إعادة المحاولة'
            })}
            onPress={onRetryPayment}
            icon="refresh"
            size="large"
            fullWidth
            customStyle={styles.retryButton}
          />

          <View style={styles.secondaryActions}>
            <CustomButton
              title={getText({
                en: 'Change Method',
                ar: 'تغيير الوسيلة'
              })}
              onPress={onChangePaymentMethod}
              variant="outline"
              icon="card"
              size="medium"
              customStyle={styles.changeMethodButton}
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

        {/* Security Notice */}
        <View style={[styles.securityNotice, { backgroundColor: COLORS.primary + '10' }]}>
          <Ionicons name="shield-checkmark" size={20} color={COLORS.primary} />
          <Text style={[styles.securityText, { color: theme.textSecondary }]}>
            {getText({
              en: 'Your payment information is encrypted and secure. No charges were made to your account.',
              ar: 'معلومات دفعك مشفرة وآمنة. لم يتم خصم أي مبلغ من حسابك.'
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
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: COLORS.error,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
    paddingHorizontal: SPACING.md,
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
  },
  paymentDetailsCard: {
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
  paymentInfo: {
    gap: SPACING.md,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentLabel: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  paymentValue: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  statusText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  reasonsCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  reasonsList: {
    gap: SPACING.sm,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  reasonText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    flex: 1,
  },
  methodsCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.xl,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  methodsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  methodCard: {
    width: '48%',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  methodName: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  actionContainer: {
    marginBottom: SPACING.lg,
  },
  retryButton: {
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
  changeMethodButton: {
    flex: 1,
  },
  helpButton: {
    flex: 1,
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.sm,
  },
  securityText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    flex: 1,
    lineHeight: 20,
  },
});

export default PaymentFailedScreen;
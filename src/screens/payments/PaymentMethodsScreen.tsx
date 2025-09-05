import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

interface Props {
  onAddPaymentMethod?: () => void;
  onEditPaymentMethod?: (methodId: string) => void;
  onDeletePaymentMethod?: (methodId: string) => void;
  onSetDefaultMethod?: (methodId: string) => void;
  onBack?: () => void;
}

const PAYMENT_METHODS = [
  {
    id: 'mada_1',
    type: 'mada',
    name: { en: 'mada Card', ar: 'بطاقة مدى' },
    icon: 'card',
    color: COLORS.primary,
    lastFour: '4521',
    expiryDate: '12/26',
    bank: { en: 'Al Rajhi Bank', ar: 'مصرف الراجحي' },
    isDefault: true,
    isVerified: true,
    addedDate: '2023-08-15',
  },
  {
    id: 'stc_pay_1',
    type: 'stc_pay',
    name: { en: 'STC Pay', ar: 'STC Pay' },
    icon: 'phone-portrait',
    color: COLORS.success,
    phoneNumber: '+966 55 123 4567',
    isDefault: false,
    isVerified: true,
    addedDate: '2023-09-20',
  },
  {
    id: 'apple_pay_1',
    type: 'apple_pay',
    name: { en: 'Apple Pay', ar: 'Apple Pay' },
    icon: 'logo-apple',
    color: COLORS.dark.text,
    deviceName: 'iPhone 14 Pro',
    isDefault: false,
    isVerified: true,
    addedDate: '2023-10-05',
  },
  {
    id: 'visa_1',
    type: 'visa',
    name: { en: 'Visa Card', ar: 'بطاقة فيزا' },
    icon: 'card',
    color: COLORS.info,
    lastFour: '8943',
    expiryDate: '08/27',
    bank: { en: 'SABB Bank', ar: 'البنك السعودي البريطاني' },
    isDefault: false,
    isVerified: false,
    addedDate: '2024-01-10',
  },
];

const PaymentMethodsScreen: React.FC<Props> = ({
  onAddPaymentMethod,
  onEditPaymentMethod,
  onDeletePaymentMethod,
  onSetDefaultMethod,
  onBack,
}) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [methods, setMethods] = useState(PAYMENT_METHODS);
  const [autoPayEnabled, setAutoPayEnabled] = useState(true);
  const [securePayEnabled, setSecurePayEnabled] = useState(true);
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const handleSetDefault = (methodId: string) => {
    setMethods(prev => prev.map(method => ({
      ...method,
      isDefault: method.id === methodId
    })));
    onSetDefaultMethod?.(methodId);
  };

  const handleDelete = (methodId: string, methodName: string) => {
    Alert.alert(
      getText({ en: 'Delete Payment Method', ar: 'حذف وسيلة الدفع' }),
      getText({ 
        en: `Are you sure you want to delete ${methodName}?`, 
        ar: `هل أنت متأكد من حذف ${methodName}؟` 
      }),
      [
        { text: getText({ en: 'Cancel', ar: 'إلغاء' }), style: 'cancel' },
        { 
          text: getText({ en: 'Delete', ar: 'حذف' }), 
          style: 'destructive',
          onPress: () => {
            setMethods(prev => prev.filter(m => m.id !== methodId));
            onDeletePaymentMethod?.(methodId);
          }
        }
      ]
    );
  };

  const renderPaymentMethodCard = (method) => {
    const isCard = method.type === 'mada' || method.type === 'visa';
    
    return (
      <View key={method.id} style={[styles.methodCard, { backgroundColor: theme.surface }]}>
        {/* Method Header */}
        <View style={styles.methodHeader}>
          <View style={styles.methodIcon}>
            <View style={[styles.iconBackground, { backgroundColor: method.color + '20' }]}>
              <Ionicons name={method.icon as any} size={24} color={method.color} />
            </View>
            <View style={styles.methodInfo}>
              <Text style={[styles.methodName, { color: theme.text }]}>
                {getText(method.name)}
              </Text>
              {isCard ? (
                <Text style={[styles.methodDetails, { color: theme.textSecondary }]}>
                  •••• •••• •••• {method.lastFour}
                </Text>
              ) : method.type === 'stc_pay' ? (
                <Text style={[styles.methodDetails, { color: theme.textSecondary }]}>
                  {method.phoneNumber}
                </Text>
              ) : (
                <Text style={[styles.methodDetails, { color: theme.textSecondary }]}>
                  {method.deviceName}
                </Text>
              )}
            </View>
          </View>

          <View style={styles.methodActions}>
            {method.isDefault && (
              <View style={[styles.defaultBadge, { backgroundColor: COLORS.success + '20' }]}>
                <Text style={[styles.defaultText, { color: COLORS.success }]}>
                  {getText({ en: 'Default', ar: 'افتراضي' })}
                </Text>
              </View>
            )}
            
            {!method.isVerified && (
              <View style={[styles.unverifiedBadge, { backgroundColor: COLORS.warning + '20' }]}>
                <Ionicons name="warning" size={12} color={COLORS.warning} />
                <Text style={[styles.unverifiedText, { color: COLORS.warning }]}>
                  {getText({ en: 'Verify', ar: 'تحقق' })}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Method Details */}
        {isCard && (
          <View style={styles.methodMeta}>
            <View style={styles.metaItem}>
              <Text style={[styles.metaLabel, { color: theme.textSecondary }]}>
                {getText({ en: 'Bank:', ar: 'البنك:' })}
              </Text>
              <Text style={[styles.metaValue, { color: theme.text }]}>
                {getText(method.bank)}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={[styles.metaLabel, { color: theme.textSecondary }]}>
                {getText({ en: 'Expires:', ar: 'تنتهي:' })}
              </Text>
              <Text style={[styles.metaValue, { color: theme.text }]}>
                {method.expiryDate}
              </Text>
            </View>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.methodButtonsContainer}>
          <View style={styles.methodButtons}>
            {!method.isDefault && (
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: COLORS.primary + '15' }]}
                onPress={() => handleSetDefault(method.id)}
              >
                <Ionicons name="checkmark-circle" size={16} color={COLORS.primary} />
                <Text style={[styles.actionButtonText, { color: COLORS.primary }]}>
                  {getText({ en: 'Set Default', ar: 'تعيين كافتراضي' })}
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: theme.inputBackground }]}
              onPress={() => onEditPaymentMethod?.(method.id)}
            >
              <Ionicons name="create" size={16} color={theme.text} />
              <Text style={[styles.actionButtonText, { color: theme.text }]}>
                {getText({ en: 'Edit', ar: 'تعديل' })}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: COLORS.error + '15' }]}
              onPress={() => handleDelete(method.id, getText(method.name))}
            >
              <Ionicons name="trash" size={16} color={COLORS.error} />
              <Text style={[styles.actionButtonText, { color: COLORS.error }]}>
                {getText({ en: 'Delete', ar: 'حذف' })}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Verification Status */}
        <View style={styles.verificationStatus}>
          <View style={styles.statusIndicator}>
            <Ionicons 
              name={method.isVerified ? 'checkmark-circle' : 'time'} 
              size={14} 
              color={method.isVerified ? COLORS.success : COLORS.warning} 
            />
            <Text style={[
              styles.statusText, 
              { color: method.isVerified ? COLORS.success : COLORS.warning }
            ]}>
              {method.isVerified 
                ? getText({ en: 'Verified', ar: 'محقق' })
                : getText({ en: 'Pending Verification', ar: 'في انتظار التحقق' })
              }
            </Text>
          </View>
          <Text style={[styles.addedDate, { color: theme.textSecondary }]}>
            {getText({ en: 'Added', ar: 'أُضيف' })} {method.addedDate}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1a1a1a', '#2d2d2d'] : ['#f8f9fa', '#ffffff']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={theme.text} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: theme.text }]}>
              {getText({ en: 'Payment Methods', ar: 'وسائل الدفع' })}
            </Text>
            <View style={styles.headerSpacer} />
          </View>
          
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
            {getText({
              en: 'Manage your payment methods and billing preferences',
              ar: 'إدارة وسائل الدفع وتفضيلات الفوترة'
            })}
          </Text>
        </View>

        {/* Payment Settings */}
        <View style={[styles.settingsCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.settingsTitle, { color: theme.text }]}>
            {getText({ en: 'Payment Settings', ar: 'إعدادات الدفع' })}
          </Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="sync" size={20} color={COLORS.primary} />
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingName, { color: theme.text }]}>
                  {getText({ en: 'Auto-Pay', ar: 'الدفع التلقائي' })}
                </Text>
                <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
                  {getText({ 
                    en: 'Automatically pay for services using default method', 
                    ar: 'دفع تلقائي للخدمات باستخدام الوسيلة الافتراضية' 
                  })}
                </Text>
              </View>
            </View>
            <Switch
              value={autoPayEnabled}
              onValueChange={setAutoPayEnabled}
              trackColor={{ false: theme.border, true: COLORS.primary + '40' }}
              thumbColor={autoPayEnabled ? COLORS.primary : theme.textSecondary}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="shield-checkmark" size={20} color={COLORS.success} />
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingName, { color: theme.text }]}>
                  {getText({ en: 'Secure Payments', ar: 'الدفع الآمن' })}
                </Text>
                <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
                  {getText({ 
                    en: 'Require authentication for all payments', 
                    ar: 'طلب التحقق لجميع عمليات الدفع' 
                  })}
                </Text>
              </View>
            </View>
            <Switch
              value={securePayEnabled}
              onValueChange={setSecurePayEnabled}
              trackColor={{ false: theme.border, true: COLORS.success + '40' }}
              thumbColor={securePayEnabled ? COLORS.success : theme.textSecondary}
            />
          </View>
        </View>

        {/* Add New Payment Method */}
        <View style={styles.addMethodSection}>
          <CustomButton
            title={getText({ en: 'Add New Payment Method', ar: 'إضافة وسيلة دفع جديدة' })}
            onPress={onAddPaymentMethod}
            icon="add-circle"
            size="large"
            fullWidth
            customStyle={styles.addButton}
          />
        </View>

        {/* Available Payment Methods */}
        <View style={styles.availableMethodsSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {getText({ en: 'Available Payment Methods', ar: 'وسائل الدفع المتاحة' })}
          </Text>
          
          <View style={styles.availableMethods}>
            {[
              { type: 'mada', name: { en: 'mada', ar: 'مدى' }, icon: 'card', color: COLORS.primary },
              { type: 'stc_pay', name: { en: 'STC Pay', ar: 'STC Pay' }, icon: 'phone-portrait', color: COLORS.success },
              { type: 'apple_pay', name: { en: 'Apple Pay', ar: 'Apple Pay' }, icon: 'logo-apple', color: COLORS.dark.text },
              { type: 'visa', name: { en: 'Visa/Mastercard', ar: 'فيزا/ماستركارد' }, icon: 'card', color: COLORS.info },
            ].map((method) => (
              <View key={method.type} style={[styles.availableMethod, { backgroundColor: theme.inputBackground }]}>
                <Ionicons name={method.icon as any} size={24} color={method.color} />
                <Text style={[styles.availableMethodText, { color: theme.text }]}>
                  {getText(method.name)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Current Payment Methods */}
        <View style={styles.methodsSection}>
          <View style={styles.methodsHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {getText({ en: 'Your Payment Methods', ar: 'وسائل الدفع الخاصة بك' })}
            </Text>
            <Text style={[styles.methodsCount, { color: theme.textSecondary }]}>
              {methods.length} {getText({ en: 'methods', ar: 'وسيلة' })}
            </Text>
          </View>

          <View style={styles.methodsList}>
            {methods.map(renderPaymentMethodCard)}
          </View>
        </View>

        {/* Payment Security Notice */}
        <View style={[styles.securityNotice, { backgroundColor: COLORS.primary + '10' }]}>
          <Ionicons name="shield-checkmark" size={24} color={COLORS.primary} />
          <View style={styles.securityTextContainer}>
            <Text style={[styles.securityTitle, { color: theme.text }]}>
              {getText({ en: 'Secure & Encrypted', ar: 'آمن ومشفر' })}
            </Text>
            <Text style={[styles.securityDescription, { color: theme.textSecondary }]}>
              {getText({
                en: 'All payment information is encrypted using bank-level security standards and compliant with Saudi banking regulations.',
                ar: 'جميع معلومات الدفع مشفرة باستخدام معايير الأمان المصرفية ومتوافقة مع الأنظمة المصرفية السعودية.'
              })}
            </Text>
          </View>
        </View>

        {/* Help Section */}
        <View style={[styles.helpSection, { backgroundColor: theme.surface }]}>
          <Text style={[styles.helpTitle, { color: theme.text }]}>
            {getText({ en: 'Need Help?', ar: 'تحتاج مساعدة؟' })}
          </Text>
          
          <View style={styles.helpOptions}>
            <TouchableOpacity style={styles.helpOption}>
              <Ionicons name="call" size={20} color={COLORS.primary} />
              <Text style={[styles.helpText, { color: theme.text }]}>
                {getText({ en: 'Contact Support', ar: 'اتصل بالدعم' })}
              </Text>
              <Ionicons name="chevron-forward" size={16} color={theme.textSecondary} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.helpOption}>
              <Ionicons name="help-circle" size={20} color={COLORS.info} />
              <Text style={[styles.helpText, { color: theme.text }]}>
                {getText({ en: 'Payment FAQ', ar: 'الأسئلة الشائعة عن الدفع' })}
              </Text>
              <Ionicons name="chevron-forward" size={16} color={theme.textSecondary} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.helpOption}>
              <Ionicons name="document-text" size={20} color={COLORS.success} />
              <Text style={[styles.helpText, { color: theme.text }]}>
                {getText({ en: 'Payment History', ar: 'سجل المدفوعات' })}
              </Text>
              <Ionicons name="chevron-forward" size={16} color={theme.textSecondary} />
            </TouchableOpacity>
          </View>
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
  header: {
    marginBottom: SPACING.xl,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  backButton: {
    padding: SPACING.sm,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.sizes.h1,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  headerSpacer: {
    width: 40,
  },
  headerSubtitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    textAlign: 'center',
    lineHeight: 22,
  },
  settingsCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.xl,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  settingsTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.lg,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light.border,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: SPACING.md,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingName: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: SPACING.xs,
  },
  settingDescription: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 18,
  },
  addMethodSection: {
    marginBottom: SPACING.xl,
  },
  addButton: {
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  availableMethodsSection: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.h2,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.lg,
  },
  availableMethods: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  availableMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    gap: SPACING.sm,
  },
  availableMethodText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  methodsSection: {
    marginBottom: SPACING.xl,
  },
  methodsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  methodsCount: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  methodsList: {
    gap: SPACING.md,
  },
  methodCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  methodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  methodIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBackground: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  methodDetails: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  methodActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  defaultBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  defaultText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  unverifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    gap: SPACING.xs,
  },
  unverifiedText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  methodMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.light.border,
  },
  metaItem: {
    flex: 1,
  },
  metaLabel: {
    fontSize: TYPOGRAPHY.sizes.caption,
    marginBottom: SPACING.xs,
  },
  metaValue: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  methodButtonsContainer: {
    marginBottom: SPACING.sm,
  },
  methodButtons: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.xs,
  },
  actionButtonText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  verificationStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.light.border,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  statusText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  addedDate: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.xl,
    gap: SPACING.md,
  },
  securityTextContainer: {
    flex: 1,
  },
  securityTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle2,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.sm,
  },
  securityDescription: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 20,
  },
  helpSection: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  helpTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.md,
  },
  helpOptions: {
    gap: SPACING.xs,
  },
  helpOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    gap: SPACING.md,
  },
  helpText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    flex: 1,
  },
});

export default PaymentMethodsScreen;
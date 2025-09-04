import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { RootState } from '../../store';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { Language } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import { validateField, ValidationUtils } from '../../utils/validation';
import CustomInput from '../../components/forms/CustomInput';
import CustomButton from '../../components/forms/CustomButton';

type PhoneVerificationNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'PhoneVerification'>;
type PhoneVerificationRouteProp = RouteProp<AuthStackParamList, 'PhoneVerification'>;

interface Props {
  navigation: PhoneVerificationNavigationProp;
  route: PhoneVerificationRouteProp;
}

const PhoneVerificationScreen: React.FC<Props> = ({ navigation, route }) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const { role } = route.params;

  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;
  const validator = new ValidationUtils(language);

  const validatePhone = (phoneNumber: string) => {
    const result = validator.validateSaudiPhone(phoneNumber);
    setPhoneError(result.isValid ? '' : result.error || '');
    return result.isValid;
  };

  const handlePhoneChange = (text: string) => {
    setPhone(text);
    if (phoneError) {
      validatePhone(text);
    }
  };

  const handleSendCode = async () => {
    if (!validatePhone(phone)) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call to send SMS
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Format phone number for display
      const formattedPhone = validator.formatSaudiPhone(phone);
      
      navigation.navigate('SMSCode', { 
        phone: formattedPhone, 
        role 
      });
    } catch (error) {
      Alert.alert(
        isArabic ? 'خطأ' : 'Error',
        isArabic 
          ? 'حدث خطأ أثناء إرسال الرمز. يرجى المحاولة مرة أخرى.'
          : 'Failed to send verification code. Please try again.',
        [{ text: isArabic ? 'موافق' : 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1a1a1a', '#2d2d2d'] : ['#f8f9fa', '#ffffff']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={[styles.iconContainer, { backgroundColor: COLORS.primary }]}>
              <Ionicons name="phone-portrait" size={40} color={COLORS.white} />
            </View>
            
            <Text style={[styles.title, { color: theme.text }]}>
              {isArabic ? 'تحقق من رقم الهاتف' : 'Verify Your Phone'}
            </Text>
            
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              {isArabic 
                ? 'سنرسل لك رمز التحقق عبر الرسائل النصية'
                : 'We\'ll send you a verification code via SMS'
              }
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <CustomInput
              label={{ 
                en: 'Saudi Phone Number', 
                ar: 'رقم الهاتف السعودي' 
              }}
              value={phone}
              onChangeText={handlePhoneChange}
              placeholder={isArabic ? '05xxxxxxxx' : '05xxxxxxxx'}
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              leftIcon="call"
              error={phoneError}
              required
              helpText={{
                en: 'Enter your Saudi phone number starting with 05',
                ar: 'أدخل رقم هاتفك السعودي الذي يبدأ بـ 05'
              }}
            />

            <CustomButton
              title={{ 
                en: 'Send Verification Code', 
                ar: 'إرسال رمز التحقق' 
              }}
              onPress={handleSendCode}
              loading={isLoading}
              disabled={!phone || !!phoneError}
              icon="paper-plane"
              fullWidth
              size="large"
              customStyle={styles.sendButton}
            />
          </View>

          {/* Info Section */}
          <View style={[styles.infoContainer, { backgroundColor: theme.surface }]}>
            <Ionicons 
              name="information-circle" 
              size={24} 
              color={COLORS.info} 
              style={styles.infoIcon}
            />
            <View style={styles.infoTextContainer}>
              <Text style={[styles.infoTitle, { color: theme.text }]}>
                {isArabic ? 'لماذا نحتاج رقم هاتفك؟' : 'Why do we need your phone number?'}
              </Text>
              <Text style={[styles.infoText, { color: theme.textSecondary }]}>
                {isArabic 
                  ? 'نستخدم رقم هاتفك للتحقق من هويتك وضمان أمان حسابك. لن نشارك معلوماتك مع أي طرف ثالث.'
                  : 'We use your phone number to verify your identity and secure your account. We won\'t share your information with third parties.'
                }
              </Text>
            </View>
          </View>

          {/* Saudi Flag Decoration */}
          <View style={styles.saudiFlagContainer}>
            <View style={styles.saudiFlag}>
              <View style={[styles.flagStripe, { backgroundColor: COLORS.primary }]} />
              <Text style={styles.flagText}>🇸🇦</Text>
            </View>
            <Text style={[styles.flagLabel, { color: theme.textSecondary }]}>
              {isArabic ? 'للمقيمين والمواطنين السعوديين' : 'For Saudi residents and citizens'}
            </Text>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: theme.textSecondary }]}>
              {isArabic 
                ? 'بالمتابعة، أنت توافق على شروط الخدمة وسياسة الخصوصية'
                : 'By continuing, you agree to our Terms of Service and Privacy Policy'
              }
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
    marginTop: SPACING.xl,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.h5,
    fontWeight: TYPOGRAPHY.weights.bold,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.regular,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: SPACING.md,
  },
  form: {
    marginBottom: SPACING.xl,
  },
  sendButton: {
    marginTop: SPACING.lg,
  },
  infoContainer: {
    flexDirection: 'row',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.xl,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.info,
  },
  infoIcon: {
    marginRight: SPACING.md,
    marginTop: SPACING.xs,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle2,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  infoText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 20,
  },
  saudiFlagContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  saudiFlag: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  flagStripe: {
    width: 4,
    height: 24,
    marginRight: SPACING.sm,
  },
  flagText: {
    fontSize: TYPOGRAPHY.sizes.h6,
  },
  flagLabel: {
    fontSize: TYPOGRAPHY.sizes.caption,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  footerText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default PhoneVerificationScreen;
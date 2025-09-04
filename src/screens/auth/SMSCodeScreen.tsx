import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
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
import { ValidationUtils } from '../../utils/validation';
import CustomButton from '../../components/forms/CustomButton';

type SMSCodeNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'SMSCode'>;
type SMSCodeRouteProp = RouteProp<AuthStackParamList, 'SMSCode'>;

interface Props {
  navigation: SMSCodeNavigationProp;
  route: SMSCodeRouteProp;
}

const SMSCodeScreen: React.FC<Props> = ({ navigation, route }) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const { phone, role } = route.params;

  const [code, setCode] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [error, setError] = useState('');

  const inputRefs = useRef<(TextInput | null)[]>([]);

  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;
  const validator = new ValidationUtils(language);

  // Countdown timer for resend
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleCodeChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    setError('');

    // Auto focus next input
    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto submit when all digits are entered
    const fullCode = newCode.join('');
    if (fullCode.length === 4) {
      handleVerifyCode(fullCode);
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyCode = async (verificationCode?: string) => {
    const codeToVerify = verificationCode || code.join('');
    
    const validation = validator.validateSMSCode(codeToVerify, 4);
    if (!validation.isValid) {
      setError(validation.error || '');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call to verify SMS code
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, accept any 4-digit code
      if (codeToVerify.length === 4) {
        navigation.navigate('PersonalInfo', { 
          phone, 
          role,
        });
      } else {
        throw new Error('Invalid code');
      }
    } catch (error) {
      setError(
        isArabic 
          ? 'رمز التحقق غير صحيح. يرجى المحاولة مرة أخرى.'
          : 'Invalid verification code. Please try again.'
      );
      // Clear the code inputs
      setCode(['', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;

    setIsResending(true);
    try {
      // Simulate API call to resend SMS
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCountdown(60);
      setError('');
      
      Alert.alert(
        isArabic ? 'تم الإرسال' : 'Code Sent',
        isArabic 
          ? 'تم إرسال رمز تحقق جديد إلى رقمك'
          : 'A new verification code has been sent to your phone',
        [{ text: isArabic ? 'موافق' : 'OK' }]
      );
    } catch (error) {
      Alert.alert(
        isArabic ? 'خطأ' : 'Error',
        isArabic 
          ? 'فشل في إعادة إرسال الرمز. يرجى المحاولة لاحقاً.'
          : 'Failed to resend code. Please try again later.',
        [{ text: isArabic ? 'موافق' : 'OK' }]
      );
    } finally {
      setIsResending(false);
    }
  };

  const formatPhoneNumber = (phoneNum: string) => {
    // Format phone number for display (hide middle digits)
    if (phoneNum.startsWith('+966')) {
      const number = phoneNum.substring(4);
      return `+966 ${number.substring(0, 2)}***${number.substring(number.length - 2)}`;
    }
    return phoneNum;
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
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: COLORS.primary }]}>
            <Ionicons name="chatbubble-ellipses" size={40} color={COLORS.white} />
          </View>
          
          <Text style={[styles.title, { color: theme.text }]}>
            {isArabic ? 'أدخل رمز التحقق' : 'Enter Verification Code'}
          </Text>
          
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {isArabic 
              ? `أرسلنا رمز التحقق إلى ${formatPhoneNumber(phone)}`
              : `We sent a verification code to ${formatPhoneNumber(phone)}`
            }
          </Text>
        </View>

        {/* Code Input */}
        <View style={styles.codeContainer}>
          <View style={styles.codeInputs}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={[
                  styles.codeInput,
                  { 
                    backgroundColor: theme.surface,
                    borderColor: error 
                      ? COLORS.error 
                      : digit 
                        ? COLORS.primary 
                        : theme.border,
                    color: theme.text,
                  },
                ]}
                value={digit}
                onChangeText={(text) => handleCodeChange(text.replace(/[^0-9]/g, ''), index)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
                selectTextOnFocus
                autoFocus={index === 0}
              />
            ))}
          </View>

          {error && (
            <Text style={styles.errorText}>{error}</Text>
          )}
        </View>

        {/* Verify Button */}
        <CustomButton
          title={{ 
            en: 'Verify Code', 
            ar: 'تحقق من الرمز' 
          }}
          onPress={() => handleVerifyCode()}
          loading={isLoading}
          disabled={code.join('').length !== 4}
          icon="checkmark-circle"
          fullWidth
          size="large"
          customStyle={styles.verifyButton}
        />

        {/* Resend Section */}
        <View style={styles.resendSection}>
          <Text style={[styles.resendText, { color: theme.textSecondary }]}>
            {isArabic ? 'لم تستلم الرمز؟' : 'Didn\'t receive the code?'}
          </Text>
          
          {countdown > 0 ? (
            <Text style={[styles.countdownText, { color: COLORS.primary }]}>
              {isArabic 
                ? `إعادة الإرسال خلال ${countdown} ثانية`
                : `Resend in ${countdown} seconds`
              }
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResendCode} disabled={isResending}>
              <Text style={[styles.resendButton, { color: COLORS.primary }]}>
                {isResending 
                  ? (isArabic ? 'جاري الإرسال...' : 'Sending...') 
                  : (isArabic ? 'إعادة الإرسال' : 'Resend Code')
                }
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Change Phone Number */}
        <TouchableOpacity 
          style={styles.changePhoneButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={16} color={theme.textSecondary} />
          <Text style={[styles.changePhoneText, { color: theme.textSecondary }]}>
            {isArabic ? 'تغيير رقم الهاتف' : 'Change phone number'}
          </Text>
        </TouchableOpacity>

        {/* Security Notice */}
        <View style={[styles.securityNotice, { backgroundColor: theme.surface }]}>
          <Ionicons 
            name="shield-checkmark" 
            size={20} 
            color={COLORS.success} 
            style={styles.securityIcon}
          />
          <Text style={[styles.securityText, { color: theme.textSecondary }]}>
            {isArabic 
              ? 'رمز التحقق صالح لـ 10 دقائق فقط'
              : 'Verification code expires in 10 minutes'
            }
          </Text>
        </View>
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
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
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
  codeContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  codeInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    maxWidth: 250,
  },
  codeInput: {
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 2,
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.bold,
    textAlign: 'center',
  },
  errorText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    color: COLORS.error,
    marginTop: SPACING.md,
    textAlign: 'center',
  },
  verifyButton: {
    marginBottom: SPACING.xl,
  },
  resendSection: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  resendText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginBottom: SPACING.xs,
  },
  countdownText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  resendButton: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.bold,
    textDecorationLine: 'underline',
  },
  changePhoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  changePhoneText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: SPACING.xs,
  },
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginTop: 'auto',
  },
  securityIcon: {
    marginRight: SPACING.sm,
  },
  securityText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    flex: 1,
  },
});

export default SMSCodeScreen;
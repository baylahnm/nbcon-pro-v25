import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
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
import DocumentUpload, { UploadedDocument } from '../../components/forms/DocumentUpload';
import CustomButton from '../../components/forms/CustomButton';

type ProfessionalCredentialsNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'ProfessionalCredentials'>;
type ProfessionalCredentialsRouteProp = RouteProp<AuthStackParamList, 'ProfessionalCredentials'>;

interface Props {
  navigation: ProfessionalCredentialsNavigationProp;
  route: ProfessionalCredentialsRouteProp;
}

interface CredentialData {
  sceNumber: string;
  sceLicense: UploadedDocument | null;
  degree: UploadedDocument | null;
  additionalCertificates: UploadedDocument[];
}

interface CredentialErrors {
  sceNumber: string;
  sceLicense: string;
  degree: string;
}

const ProfessionalCredentialsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const { userInfo } = route.params;

  const [credentials, setCredentials] = useState<CredentialData>({
    sceNumber: '',
    sceLicense: null,
    degree: null,
    additionalCertificates: [],
  });

  const [errors, setErrors] = useState<CredentialErrors>({
    sceNumber: '',
    sceLicense: '',
    degree: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const validateSCENumber = (number: string) => {
    if (!number.trim()) {
      return isArabic ? 'رقم رخصة المجلس السعودي للمهندسين مطلوب' : 'SCE license number is required';
    }
    if (number.length < 6) {
      return isArabic ? 'رقم الرخصة يجب أن يكون 6 أرقام على الأقل' : 'License number must be at least 6 digits';
    }
    return '';
  };

  const validateRequiredDocument = (doc: UploadedDocument | null, fieldName: string) => {
    if (!doc) {
      return isArabic 
        ? `${fieldName} مطلوب`
        : `${fieldName} is required`;
    }
    return '';
  };

  const handleInputChange = (field: keyof CredentialData, value: any) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing/selecting
    if (errors[field as keyof CredentialErrors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: CredentialErrors = {
      sceNumber: validateSCENumber(credentials.sceNumber),
      sceLicense: validateRequiredDocument(credentials.sceLicense, isArabic ? 'رخصة المجلس السعودي للمهندسين' : 'SCE License'),
      degree: validateRequiredDocument(credentials.degree, isArabic ? 'الدرجة العلمية' : 'Degree Certificate'),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleContinue = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call to upload documents and save credentials
      await new Promise(resolve => setTimeout(resolve, 2000));

      const updatedUserInfo = {
        ...userInfo,
        credentials,
      };

      navigation.navigate('ServiceSpecialization', { userInfo: updatedUserInfo });
    } catch (error) {
      Alert.alert(
        isArabic ? 'خطأ' : 'Error',
        isArabic 
          ? 'حدث خطأ أثناء حفظ المؤهلات. يرجى المحاولة مرة أخرى.'
          : 'Failed to save credentials. Please try again.',
        [{ text: isArabic ? 'موافق' : 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const addAdditionalCertificate = (document: UploadedDocument) => {
    setCredentials(prev => ({
      ...prev,
      additionalCertificates: [...prev.additionalCertificates, document],
    }));
  };

  const removeAdditionalCertificate = (index: number) => {
    setCredentials(prev => ({
      ...prev,
      additionalCertificates: prev.additionalCertificates.filter((_, i) => i !== index),
    }));
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
              <Ionicons name="school" size={40} color={COLORS.white} />
            </View>
            
            <Text style={[styles.title, { color: theme.text }]}>
              {isArabic ? 'المؤهلات المهنية' : 'Professional Credentials'}
            </Text>
            
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              {isArabic 
                ? 'ارفع مؤهلاتك المهنية للتحقق من خبرتك الهندسية'
                : 'Upload your professional credentials to verify your engineering expertise'
              }
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* SCE License Number */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.text }]}>
                {isArabic ? 'رقم رخصة المجلس السعودي للمهندسين' : 'SCE License Number'} *
              </Text>
              <View style={[styles.inputContainer, { backgroundColor: theme.surface, borderColor: errors.sceNumber ? COLORS.error : theme.border }]}>
                <Ionicons name="card" size={20} color={credentials.sceNumber ? COLORS.primary : theme.textSecondary} />
                <Text
                  style={[styles.textInput, { color: credentials.sceNumber ? theme.text : theme.textSecondary }]}
                  onPress={() => {
                    Alert.prompt(
                      isArabic ? 'رقم رخصة المجلس السعودي للمهندسين' : 'SCE License Number',
                      isArabic ? 'أدخل رقم رخصتك' : 'Enter your license number',
                      [
                        { text: isArabic ? 'إلغاء' : 'Cancel', style: 'cancel' },
                        { 
                          text: isArabic ? 'موافق' : 'OK', 
                          onPress: (text) => handleInputChange('sceNumber', text || '')
                        },
                      ],
                      'plain-text',
                      credentials.sceNumber
                    );
                  }}
                >
                  {credentials.sceNumber || (isArabic ? 'أدخل رقم رخصة المجلس السعودي للمهندسين' : 'Enter SCE License Number')}
                </Text>
              </View>
              {errors.sceNumber && (
                <Text style={styles.errorText}>{errors.sceNumber}</Text>
              )}
            </View>

            {/* SCE License Document */}
            <DocumentUpload
              label={{ 
                en: 'SCE License Certificate', 
                ar: 'شهادة رخصة المجلس السعودي للمهندسين' 
              }}
              value={credentials.sceLicense}
              onDocumentSelect={(doc) => handleInputChange('sceLicense', doc)}
              required
              documentType="any"
              error={errors.sceLicense}
              helpText={{
                en: 'Upload your official SCE license certificate (PDF or image)',
                ar: 'ارفع شهادة رخصة المجلس السعودي للمهندسين الرسمية (PDF أو صورة)'
              }}
            />

            {/* Degree Certificate */}
            <DocumentUpload
              label={{ 
                en: 'Engineering Degree Certificate', 
                ar: 'شهادة الدرجة العلمية الهندسية' 
              }}
              value={credentials.degree}
              onDocumentSelect={(doc) => handleInputChange('degree', doc)}
              required
              documentType="any"
              error={errors.degree}
              helpText={{
                en: 'Upload your engineering degree certificate (Bachelor\'s, Master\'s, or PhD)',
                ar: 'ارفع شهادة درجتك العلمية الهندسية (بكالوريوس، ماجستير، أو دكتوراه)'
              }}
            />

            {/* Additional Certificates */}
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                {isArabic ? 'شهادات إضافية (اختيارية)' : 'Additional Certificates (Optional)'}
              </Text>
              <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>
                {isArabic 
                  ? 'أضف أي شهادات مهنية إضافية لتعزيز ملفك الشخصي'
                  : 'Add any additional professional certificates to strengthen your profile'
                }
              </Text>
            </View>

            {/* Display Additional Certificates */}
            {credentials.additionalCertificates.map((cert, index) => (
              <View key={index} style={[styles.certificateItem, { backgroundColor: theme.surface }]}>
                <View style={styles.certificateInfo}>
                  <Ionicons name="ribbon" size={20} color={COLORS.accent} />
                  <Text style={[styles.certificateName, { color: theme.text }]} numberOfLines={1}>
                    {cert.name}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => removeAdditionalCertificate(index)}>
                  <Ionicons name="close-circle" size={24} color={COLORS.error} />
                </TouchableOpacity>
              </View>
            ))}

            {/* Add Certificate Button */}
            <DocumentUpload
              label={{ 
                en: 'Add Certificate', 
                ar: 'إضافة شهادة' 
              }}
              value={null}
              onDocumentSelect={(doc) => doc && addAdditionalCertificate(doc)}
              documentType="any"
              helpText={{
                en: 'PMP, LEED, Professional certifications, etc.',
                ar: 'PMP، LEED، الشهادات المهنية، إلخ.'
              }}
            />

            <CustomButton
              title={{ 
                en: 'Continue', 
                ar: 'متابعة' 
              }}
              onPress={handleContinue}
              loading={isLoading}
              icon="arrow-forward"
              fullWidth
              size="large"
              customStyle={styles.continueButton}
            />
          </View>

          {/* Info Box */}
          <View style={[styles.infoContainer, { backgroundColor: theme.surface }]}>
            <Ionicons 
              name="shield-checkmark" 
              size={24} 
              color={COLORS.success} 
              style={styles.infoIcon}
            />
            <View style={styles.infoTextContainer}>
              <Text style={[styles.infoTitle, { color: theme.text }]}>
                {isArabic ? 'التحقق الآمن' : 'Secure Verification'}
              </Text>
              <Text style={[styles.infoText, { color: theme.textSecondary }]}>
                {isArabic 
                  ? 'جميع المؤهلات ستتم مراجعتها من قبل فريق التحقق المختص خلال 24-48 ساعة'
                  : 'All credentials will be reviewed by our verification team within 24-48 hours'
                }
              </Text>
            </View>
          </View>

          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '60%', backgroundColor: COLORS.primary }]} />
            </View>
            <Text style={[styles.progressText, { color: theme.textSecondary }]}>
              {isArabic ? '3 من 5' : '3 of 5'}
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
    marginTop: SPACING.lg,
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
    flex: 1,
  },
  inputGroup: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: SPACING.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
  },
  textInput: {
    flex: 1,
    fontSize: TYPOGRAPHY.sizes.body1,
    marginLeft: SPACING.sm,
  },
  sectionHeader: {
    marginVertical: SPACING.lg,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  sectionSubtitle: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 20,
  },
  certificateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
  },
  certificateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  certificateName: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: SPACING.sm,
    flex: 1,
  },
  continueButton: {
    marginTop: SPACING.xl,
  },
  infoContainer: {
    flexDirection: 'row',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginVertical: SPACING.lg,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.success,
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
  progressContainer: {
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: COLORS.light.border,
    borderRadius: 2,
    marginBottom: SPACING.sm,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  errorText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.error,
    marginTop: SPACING.xs,
    marginLeft: SPACING.xs,
  },
});

export default ProfessionalCredentialsScreen;

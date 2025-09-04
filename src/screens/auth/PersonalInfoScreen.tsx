import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
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
import DateTimePicker from '@react-native-community/datetimepicker';

import { RootState } from '../../store';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { Language, UserRole } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import { ValidationUtils } from '../../utils/validation';
import CustomInput from '../../components/forms/CustomInput';
import CustomButton from '../../components/forms/CustomButton';

type PersonalInfoNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'PersonalInfo'>;
type PersonalInfoRouteProp = RouteProp<AuthStackParamList, 'PersonalInfo'>;

interface Props {
  navigation: PersonalInfoNavigationProp;
  route: PersonalInfoRouteProp;
}

interface FormData {
  firstName: string;
  lastName: string;
  nationalId: string;
  dateOfBirth: Date | null;
  gender: 'male' | 'female' | '';
  nationality: string;
}

interface FormErrors {
  firstName: string;
  lastName: string;
  nationalId: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
}

const PersonalInfoScreen: React.FC<Props> = ({ navigation, route }) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const { phone, role } = route.params;

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    nationalId: '',
    dateOfBirth: null,
    gender: '',
    nationality: 'Saudi',
  });

  const [errors, setErrors] = useState<FormErrors>({
    firstName: '',
    lastName: '',
    nationalId: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;
  const validator = new ValidationUtils(language);

  const validateField = (field: keyof FormData, value: any) => {
    let error = '';

    switch (field) {
      case 'firstName':
      case 'lastName':
        const nameValidation = validator.validateName(value, 2);
        error = nameValidation.isValid ? '' : nameValidation.error || '';
        break;
      case 'nationalId':
        const idValidation = validator.validateSaudiNationalId(value);
        error = idValidation.isValid ? '' : idValidation.error || '';
        break;
      case 'dateOfBirth':
        if (!value) {
          error = isArabic ? 'تاريخ الميلاد مطلوب' : 'Date of birth is required';
        } else {
          const ageValidation = validator.validateAge(value.toISOString(), 18);
          error = ageValidation.isValid ? '' : ageValidation.error || '';
        }
        break;
      case 'gender':
        if (!value) {
          error = isArabic ? 'الجنس مطلوب' : 'Gender is required';
        }
        break;
      case 'nationality':
        if (!value) {
          error = isArabic ? 'الجنسية مطلوبة' : 'Nationality is required';
        }
        break;
    }

    setErrors(prev => ({ ...prev, [field]: error }));
    return error === '';
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      validateField(field, value);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleInputChange('dateOfBirth', selectedDate);
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const fields: (keyof FormData)[] = ['firstName', 'lastName', 'nationalId', 'dateOfBirth', 'gender', 'nationality'];

    fields.forEach(field => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });

    return isValid;
  };

  const handleContinue = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call to save personal information
      await new Promise(resolve => setTimeout(resolve, 1500));

      const userInfo = {
        phone,
        role,
        ...formData,
        dateOfBirth: formData.dateOfBirth?.toISOString(),
      };

      if (role === UserRole.ENGINEER) {
        navigation.navigate('ProfessionalCredentials', { userInfo });
      } else {
        // For clients, skip professional credentials and go to account confirmation
        navigation.navigate('PersonalInfo', { userInfo }); // This would be replaced with actual next screen
      }
    } catch (error) {
      Alert.alert(
        isArabic ? 'خطأ' : 'Error',
        isArabic 
          ? 'حدث خطأ أثناء حفظ المعلومات. يرجى المحاولة مرة أخرى.'
          : 'Failed to save information. Please try again.',
        [{ text: isArabic ? 'موافق' : 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const genderOptions = [
    { value: 'male', label: { en: 'Male', ar: 'ذكر' } },
    { value: 'female', label: { en: 'Female', ar: 'أنثى' } },
  ];

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
              <Ionicons name="person-add" size={40} color={COLORS.white} />
            </View>
            
            <Text style={[styles.title, { color: theme.text }]}>
              {isArabic ? 'المعلومات الشخصية' : 'Personal Information'}
            </Text>
            
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              {isArabic 
                ? 'أدخل معلوماتك الشخصية لإكمال إنشاء الحساب'
                : 'Enter your personal details to complete account setup'
              }
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Name Fields */}
            <View style={styles.row}>
              <View style={[styles.halfWidth, { marginRight: isArabic ? 0 : SPACING.sm, marginLeft: isArabic ? SPACING.sm : 0 }]}>
                <CustomInput
                  label={{ en: 'First Name', ar: 'الاسم الأول' }}
                  value={formData.firstName}
                  onChangeText={(text) => handleInputChange('firstName', text)}
                  placeholder={isArabic ? 'الاسم الأول' : 'First Name'}
                  leftIcon="person"
                  error={errors.firstName}
                  required
                />
              </View>
              
              <View style={[styles.halfWidth, { marginLeft: isArabic ? 0 : SPACING.sm, marginRight: isArabic ? SPACING.sm : 0 }]}>
                <CustomInput
                  label={{ en: 'Last Name', ar: 'اسم العائلة' }}
                  value={formData.lastName}
                  onChangeText={(text) => handleInputChange('lastName', text)}
                  placeholder={isArabic ? 'اسم العائلة' : 'Last Name'}
                  leftIcon="person"
                  error={errors.lastName}
                  required
                />
              </View>
            </View>

            {/* National ID */}
            <CustomInput
              label={{ en: 'National ID / Iqama', ar: 'رقم الهوية / الإقامة' }}
              value={formData.nationalId}
              onChangeText={(text) => handleInputChange('nationalId', text)}
              placeholder={isArabic ? '1234567890' : '1234567890'}
              keyboardType="number-pad"
              leftIcon="card"
              error={errors.nationalId}
              required
              helpText={{
                en: 'Enter your 10-digit Saudi National ID or Iqama number',
                ar: 'أدخل رقم هويتك أو إقامتك السعودية المكون من 10 أرقام'
              }}
            />

            {/* Date of Birth */}
            <TouchableOpacity
              style={[styles.dateButton, { backgroundColor: theme.surface, borderColor: errors.dateOfBirth ? COLORS.error : theme.border }]}
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons name="calendar" size={20} color={formData.dateOfBirth ? COLORS.primary : theme.textSecondary} />
              <Text style={[styles.dateButtonText, { color: formData.dateOfBirth ? theme.text : theme.textSecondary }]}>
                {formData.dateOfBirth 
                  ? formatDate(formData.dateOfBirth) 
                  : (isArabic ? 'تاريخ الميلاد *' : 'Date of Birth *')
                }
              </Text>
              <Ionicons name="chevron-down" size={20} color={theme.textSecondary} />
            </TouchableOpacity>
            {errors.dateOfBirth && (
              <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
            )}

            {/* Gender Selection */}
            <View style={styles.genderSection}>
              <Text style={[styles.label, { color: theme.text }]}>
                {isArabic ? 'الجنس' : 'Gender'} *
              </Text>
              <View style={styles.genderOptions}>
                {genderOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.genderOption,
                      { 
                        backgroundColor: theme.surface,
                        borderColor: formData.gender === option.value ? COLORS.primary : theme.border,
                      },
                      formData.gender === option.value && { borderWidth: 2 },
                    ]}
                    onPress={() => handleInputChange('gender', option.value)}
                  >
                    <Ionicons 
                      name={formData.gender === option.value ? 'radio-button-on' : 'radio-button-off'} 
                      size={20} 
                      color={formData.gender === option.value ? COLORS.primary : theme.textSecondary} 
                    />
                    <Text style={[styles.genderOptionText, { color: theme.text }]}>
                      {isArabic ? option.label.ar : option.label.en}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {errors.gender && (
                <Text style={styles.errorText}>{errors.gender}</Text>
              )}
            </View>

            {/* Nationality */}
            <CustomInput
              label={{ en: 'Nationality', ar: 'الجنسية' }}
              value={formData.nationality}
              onChangeText={(text) => handleInputChange('nationality', text)}
              placeholder={isArabic ? 'السعودية' : 'Saudi'}
              leftIcon="flag"
              error={errors.nationality}
              required
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

          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '40%', backgroundColor: COLORS.primary }]} />
            </View>
            <Text style={[styles.progressText, { color: theme.textSecondary }]}>
              {isArabic ? '2 من 5' : '2 of 5'}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={formData.dateOfBirth || new Date(2000, 0, 1)}
          mode="date"
          display="default"
          maximumDate={new Date()}
          minimumDate={new Date(1950, 0, 1)}
          onChange={handleDateChange}
        />
      )}
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
  row: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  halfWidth: {
    flex: 1,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    marginBottom: SPACING.md,
  },
  dateButtonText: {
    flex: 1,
    fontSize: TYPOGRAPHY.sizes.body1,
    marginLeft: SPACING.sm,
  },
  label: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: SPACING.xs,
  },
  genderSection: {
    marginBottom: SPACING.md,
  },
  genderOptions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  genderOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
  },
  genderOptionText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    marginLeft: SPACING.sm,
    flex: 1,
  },
  errorText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.error,
    marginTop: SPACING.xs,
    marginLeft: SPACING.xs,
  },
  continueButton: {
    marginTop: SPACING.xl,
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
});

export default PersonalInfoScreen;

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../constants';
import CustomInput from '../../components/forms/CustomInput';
import CustomButton from '../../components/forms/CustomButton';

interface JobRequestData {
  title: string;
  description: string;
  location: string;
  budget: string;
  urgency: 'standard' | 'priority' | 'emergency';
  estimatedDuration: string;
  specialRequirements: string;
}

const JobRequestWizardScreen: React.FC = () => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [currentStep, setCurrentStep] = useState(1);
  const [jobData, setJobData] = useState<JobRequestData>({
    title: '',
    description: '',
    location: '',
    budget: '',
    urgency: 'standard',
    estimatedDuration: '',
    specialRequirements: '',
  });

  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const steps = [
    { id: 1, title: { en: 'Basic Details', ar: 'التفاصيل الأساسية' } },
    { id: 2, title: { en: 'Location', ar: 'الموقع' } },
    { id: 3, title: { en: 'Budget & Timeline', ar: 'الميزانية والجدول الزمني' } },
    { id: 4, title: { en: 'Review & Post', ar: 'مراجعة ونشر' } },
  ];

  const urgencyOptions = [
    {
      id: 'standard',
      title: { en: 'Standard', ar: 'عادي' },
      description: { en: 'Within 1-2 weeks', ar: 'خلال 1-2 أسبوع' },
      color: COLORS.success,
    },
    {
      id: 'priority',
      title: { en: 'Priority', ar: 'أولوية' },
      description: { en: 'Within 3-5 days', ar: 'خلال 3-5 أيام' },
      color: COLORS.warning,
    },
    {
      id: 'emergency',
      title: { en: 'Emergency', ar: 'طوارئ' },
      description: { en: 'Within 24 hours', ar: 'خلال 24 ساعة' },
      color: COLORS.error,
    },
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!jobData.title || !jobData.description || !jobData.location || !jobData.budget) {
      Alert.alert(
        isArabic ? 'خطأ' : 'Error',
        isArabic ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields'
      );
      return;
    }

    // Submit job request
    console.log('Submitting job request:', jobData);
    Alert.alert(
      isArabic ? 'تم النشر' : 'Job Posted',
      isArabic ? 'تم نشر طلب العمل بنجاح' : 'Job request posted successfully'
    );
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {steps.map((step, index) => (
        <View key={step.id} style={styles.stepContainer}>
          <View
            style={[
              styles.stepCircle,
              {
                backgroundColor: currentStep >= step.id ? COLORS.primary : theme.border,
              },
            ]}
          >
            <Text
              style={[
                styles.stepNumber,
                {
                  color: currentStep >= step.id ? 'white' : theme.textSecondary,
                },
              ]}
            >
              {step.id}
            </Text>
          </View>
          <Text
            style={[
              styles.stepTitle,
              {
                color: currentStep >= step.id ? COLORS.primary : theme.textSecondary,
              },
            ]}
          >
            {getText(step.title)}
          </Text>
          {index < steps.length - 1 && (
            <View
              style={[
                styles.stepLine,
                {
                  backgroundColor: currentStep > step.id ? COLORS.primary : theme.border,
                },
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.stepContent}>
      <Text style={[styles.stepHeader, { color: theme.text }]}>
        {isArabic ? 'أخبرنا عن مشروعك' : 'Tell us about your project'}
      </Text>
      
      <CustomInput
        label={{ en: 'Project Title', ar: 'عنوان المشروع' }}
        value={jobData.title}
        onChangeText={(text) => setJobData({ ...jobData, title: text })}
        placeholder={isArabic ? 'مثال: مسح موقع بناء' : 'e.g., Site Survey for Construction'}
        required
      />

      <CustomInput
        label={{ en: 'Project Description', ar: 'وصف المشروع' }}
        value={jobData.description}
        onChangeText={(text) => setJobData({ ...jobData, description: text })}
        placeholder={isArabic ? 'وصف تفصيلي للمشروع...' : 'Detailed description of the project...'}
        multiline
        numberOfLines={4}
        required
      />

      <CustomInput
        label={{ en: 'Special Requirements', ar: 'متطلبات خاصة' }}
        value={jobData.specialRequirements}
        onChangeText={(text) => setJobData({ ...jobData, specialRequirements: text })}
        placeholder={isArabic ? 'أي متطلبات خاصة أو ملاحظات...' : 'Any special requirements or notes...'}
        multiline
        numberOfLines={3}
      />
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContent}>
      <Text style={[styles.stepHeader, { color: theme.text }]}>
        {isArabic ? 'أين يقع مشروعك؟' : 'Where is your project located?'}
      </Text>
      
      <CustomInput
        label={{ en: 'Project Location', ar: 'موقع المشروع' }}
        value={jobData.location}
        onChangeText={(text) => setJobData({ ...jobData, location: text })}
        placeholder={isArabic ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}
        leftIcon="location"
        required
      />

      <View style={styles.locationNote}>
        <Ionicons name="information-circle" size={20} color={COLORS.primary} />
        <Text style={[styles.noteText, { color: theme.textSecondary }]}>
          {isArabic 
            ? 'سيتم استخدام الموقع لمطابقة المهندسين القريبين منك'
            : 'Location will be used to match engineers near you'
          }
        </Text>
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContent}>
      <Text style={[styles.stepHeader, { color: theme.text }]}>
        {isArabic ? 'الميزانية والجدول الزمني' : 'Budget & Timeline'}
      </Text>
      
      <CustomInput
        label={{ en: 'Budget (SAR)', ar: 'الميزانية (ريال سعودي)' }}
        value={jobData.budget}
        onChangeText={(text) => setJobData({ ...jobData, budget: text })}
        placeholder="5000"
        keyboardType="numeric"
        leftIcon="cash"
        required
      />

      <CustomInput
        label={{ en: 'Estimated Duration', ar: 'المدة المتوقعة' }}
        value={jobData.estimatedDuration}
        onChangeText={(text) => setJobData({ ...jobData, estimatedDuration: text })}
        placeholder={isArabic ? 'مثال: 2-3 أيام' : 'e.g., 2-3 days'}
        leftIcon="time"
      />

      <View style={styles.urgencySection}>
        <Text style={[styles.urgencyLabel, { color: theme.text }]}>
          {isArabic ? 'مستوى الأولوية' : 'Priority Level'}
        </Text>
        {urgencyOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.urgencyOption,
              {
                backgroundColor: theme.surface,
                borderColor: jobData.urgency === option.id ? option.color : theme.border,
              },
            ]}
            onPress={() => setJobData({ ...jobData, urgency: option.id as any })}
          >
            <View style={[styles.urgencyIndicator, { backgroundColor: option.color }]} />
            <View style={styles.urgencyContent}>
              <Text style={[styles.urgencyTitle, { color: theme.text }]}>
                {getText(option.title)}
              </Text>
              <Text style={[styles.urgencyDescription, { color: theme.textSecondary }]}>
                {getText(option.description)}
              </Text>
            </View>
            {jobData.urgency === option.id && (
              <Ionicons name="checkmark-circle" size={24} color={option.color} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContent}>
      <Text style={[styles.stepHeader, { color: theme.text }]}>
        {isArabic ? 'مراجعة طلب العمل' : 'Review Job Request'}
      </Text>
      
      <View style={[styles.reviewCard, { backgroundColor: theme.surface }]}>
        <Text style={[styles.reviewTitle, { color: theme.text }]}>
          {jobData.title}
        </Text>
        <Text style={[styles.reviewDescription, { color: theme.textSecondary }]}>
          {jobData.description}
        </Text>
        
        <View style={styles.reviewDetails}>
          <View style={styles.reviewRow}>
            <Ionicons name="location" size={16} color={theme.textSecondary} />
            <Text style={[styles.reviewText, { color: theme.textSecondary }]}>
              {jobData.location}
            </Text>
          </View>
          
          <View style={styles.reviewRow}>
            <Ionicons name="cash" size={16} color={theme.textSecondary} />
            <Text style={[styles.reviewText, { color: theme.textSecondary }]}>
              {jobData.budget} SAR
            </Text>
          </View>
          
          <View style={styles.reviewRow}>
            <Ionicons name="time" size={16} color={theme.textSecondary} />
            <Text style={[styles.reviewText, { color: theme.textSecondary }]}>
              {jobData.estimatedDuration || (isArabic ? 'غير محدد' : 'Not specified')}
            </Text>
          </View>
          
          <View style={styles.reviewRow}>
            <Ionicons name="flag" size={16} color={theme.textSecondary} />
            <Text style={[styles.reviewText, { color: theme.textSecondary }]}>
              {getText(urgencyOptions.find(opt => opt.id === jobData.urgency)?.title || { en: '', ar: '' })}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          {isArabic ? 'طلب عمل جديد' : 'New Job Request'}
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          {isArabic ? 'الخطوة' : 'Step'} {currentStep} {isArabic ? 'من' : 'of'} {steps.length}
        </Text>
      </View>

      {/* Step Indicator */}
      {renderStepIndicator()}

      {/* Step Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderCurrentStep()}
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navigation}>
        {currentStep > 1 && (
          <CustomButton
            title={{ en: 'Previous', ar: 'السابق' }}
            variant="outline"
            onPress={handlePrevious}
            style={styles.navButton}
          />
        )}
        
        <CustomButton
          title={{
            en: currentStep === 4 ? 'Post Job' : 'Next',
            ar: currentStep === 4 ? 'نشر الوظيفة' : 'التالي'
          }}
          onPress={handleNext}
          style={[styles.navButton, { flex: currentStep === 1 ? 1 : 0.6 }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.h2,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.regular,
  },
  stepIndicator: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  stepContainer: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  stepNumber: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  stepTitle: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
    textAlign: 'center',
  },
  stepLine: {
    position: 'absolute',
    top: 16,
    left: '50%',
    width: '100%',
    height: 2,
    zIndex: -1,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  stepContent: {
    paddingBottom: SPACING.xl,
  },
  stepHeader: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.lg,
  },
  locationNote: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.sm,
    padding: SPACING.sm,
    backgroundColor: COLORS.primary + '10',
    borderRadius: BORDER_RADIUS.sm,
  },
  noteText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    marginLeft: SPACING.sm,
    flex: 1,
  },
  urgencySection: {
    marginTop: SPACING.lg,
  },
  urgencyLabel: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: SPACING.md,
  },
  urgencyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 2,
    marginBottom: SPACING.sm,
  },
  urgencyIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: SPACING.sm,
  },
  urgencyContent: {
    flex: 1,
  },
  urgencyTitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: SPACING.xs,
  },
  urgencyDescription: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  reviewCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.light.border,
  },
  reviewTitle: {
    fontSize: TYPOGRAPHY.sizes.h4,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.sm,
  },
  reviewDescription: {
    fontSize: TYPOGRAPHY.sizes.body1,
    marginBottom: SPACING.md,
    lineHeight: 20,
  },
  reviewDetails: {
    gap: SPACING.sm,
  },
  reviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: SPACING.sm,
  },
  navigation: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    gap: SPACING.md,
  },
  navButton: {
    flex: 0.4,
  },
});

export default JobRequestWizardScreen;

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

interface Props {
  onPostJob?: (jobData: any) => void;
  onSaveDraft?: (jobData: any) => void;
  onPreview?: (jobData: any) => void;
}

const JOB_CATEGORIES = [
  { id: 'structural', name: { en: 'Structural Engineering', ar: 'الهندسة الإنشائية' }, icon: 'construct' },
  { id: 'electrical', name: { en: 'Electrical Engineering', ar: 'الهندسة الكهربائية' }, icon: 'flash' },
  { id: 'mechanical', name: { en: 'Mechanical Engineering', ar: 'الهندسة الميكانيكية' }, icon: 'settings' },
  { id: 'civil', name: { en: 'Civil Engineering', ar: 'الهندسة المدنية' }, icon: 'business' },
  { id: 'architecture', name: { en: 'Architecture', ar: 'العمارة' }, icon: 'library' },
  { id: 'environmental', name: { en: 'Environmental Engineering', ar: 'الهندسة البيئية' }, icon: 'leaf' },
];

const PROJECT_SIZES = [
  { id: 'small', name: { en: 'Small (< 50k SAR)', ar: 'صغير (< 50 ألف ريال)' } },
  { id: 'medium', name: { en: 'Medium (50k - 200k SAR)', ar: 'متوسط (50-200 ألف ريال)' } },
  { id: 'large', name: { en: 'Large (200k - 500k SAR)', ar: 'كبير (200-500 ألف ريال)' } },
  { id: 'enterprise', name: { en: 'Enterprise (> 500k SAR)', ar: 'مؤسسي (> 500 ألف ريال)' } },
];

const DURATION_OPTIONS = [
  { id: 'urgent', name: { en: '< 1 Week', ar: '< أسبوع' } },
  { id: 'short', name: { en: '1-4 Weeks', ar: '1-4 أسابيع' } },
  { id: 'medium', name: { en: '1-3 Months', ar: '1-3 أشهر' } },
  { id: 'long', name: { en: '3+ Months', ar: '3+ أشهر' } },
];

const EXPERIENCE_LEVELS = [
  { id: 'entry', name: { en: 'Entry Level (0-2 years)', ar: 'مبتدئ (0-2 سنة)' } },
  { id: 'mid', name: { en: 'Mid Level (3-5 years)', ar: 'متوسط (3-5 سنوات)' } },
  { id: 'senior', name: { en: 'Senior (5+ years)', ar: 'خبير (5+ سنوات)' } },
  { id: 'expert', name: { en: 'Expert (10+ years)', ar: 'خبير متقدم (10+ سنوات)' } },
];

const JobPostingScreen: React.FC<Props> = ({
  onPostJob,
  onSaveDraft,
  onPreview,
}) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const scrollViewRef = useRef<ScrollView>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    budget: '',
    budgetType: 'fixed', // fixed, hourly, negotiable
    duration: '',
    location: '',
    isRemote: false,
    experienceLevel: '',
    skills: [],
    requirements: '',
    deliverables: '',
    attachments: [],
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.title && formData.description && formData.category;
      case 2:
        return formData.budget && formData.duration;
      case 3:
        return formData.location && formData.experienceLevel;
      case 4:
        return formData.requirements;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    } else {
      Alert.alert(
        getText({ en: 'Incomplete Information', ar: 'معلومات غير مكتملة' }),
        getText({ en: 'Please fill in all required fields', ar: 'يرجى ملء جميع الحقول المطلوبة' })
      );
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handlePost = () => {
    if (validateStep(currentStep)) {
      onPostJob?.(formData);
    }
  };

  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        {Array.from({ length: totalSteps }, (_, index) => (
          <View
            key={index}
            style={[
              styles.progressStep,
              {
                backgroundColor: index < currentStep ? COLORS.primary : theme.border,
              },
            ]}
          />
        ))}
      </View>
      <Text style={[styles.progressText, { color: theme.textSecondary }]}>
        {getText({ 
          en: `Step ${currentStep} of ${totalSteps}`, 
          ar: `الخطوة ${currentStep} من ${totalSteps}` 
        })}
      </Text>
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.stepTitle, { color: theme.text }]}>
        {getText({
          en: 'Job Details',
          ar: 'تفاصيل الوظيفة'
        })}
      </Text>

      {/* Job Title */}
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {getText({ en: 'Job Title *', ar: 'عنوان الوظيفة *' })}
        </Text>
        <TextInput
          style={[styles.textInput, { backgroundColor: theme.surface, color: theme.text }]}
          placeholder={getText({ en: 'e.g., Structural Engineer for Residential Building', ar: 'مثال: مهندس إنشائي لمبنى سكني' })}
          placeholderTextColor={theme.textSecondary}
          value={formData.title}
          onChangeText={(text) => updateFormData('title', text)}
          textAlign={isArabic ? 'right' : 'left'}
        />
      </View>

      {/* Category Selection */}
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {getText({ en: 'Category *', ar: 'الفئة *' })}
        </Text>
        <View style={styles.categoryGrid}>
          {JOB_CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryCard,
                { backgroundColor: theme.surface },
                formData.category === category.id && { 
                  backgroundColor: COLORS.primary + '20',
                  borderColor: COLORS.primary,
                  borderWidth: 2,
                }
              ]}
              onPress={() => updateFormData('category', category.id)}
            >
              <Ionicons name={category.icon as any} size={24} color={COLORS.primary} />
              <Text style={[styles.categoryText, { color: theme.text }]}>
                {getText(category.name)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Description */}
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {getText({ en: 'Description *', ar: 'الوصف *' })}
        </Text>
        <TextInput
          style={[styles.textArea, { backgroundColor: theme.surface, color: theme.text }]}
          placeholder={getText({ 
            en: 'Describe your project in detail. Include objectives, scope, and any specific requirements...', 
            ar: 'اوصف مشروعك بالتفصيل. اشمل الأهداف والنطاق وأي متطلبات محددة...' 
          })}
          placeholderTextColor={theme.textSecondary}
          value={formData.description}
          onChangeText={(text) => updateFormData('description', text)}
          multiline
          numberOfLines={6}
          textAlign={isArabic ? 'right' : 'left'}
          textAlignVertical="top"
        />
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.stepTitle, { color: theme.text }]}>
        {getText({
          en: 'Budget & Timeline',
          ar: 'الميزانية والجدول الزمني'
        })}
      </Text>

      {/* Budget Type */}
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {getText({ en: 'Budget Type *', ar: 'نوع الميزانية *' })}
        </Text>
        <View style={styles.budgetTypeContainer}>
          {['fixed', 'hourly', 'negotiable'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.budgetTypeButton,
                { backgroundColor: theme.surface },
                formData.budgetType === type && { 
                  backgroundColor: COLORS.primary + '20',
                  borderColor: COLORS.primary 
                }
              ]}
              onPress={() => updateFormData('budgetType', type)}
            >
              <Text style={[
                styles.budgetTypeText, 
                { color: theme.text },
                formData.budgetType === type && { color: COLORS.primary }
              ]}>
                {getText({
                  en: type === 'fixed' ? 'Fixed Price' : type === 'hourly' ? 'Hourly Rate' : 'Negotiable',
                  ar: type === 'fixed' ? 'سعر ثابت' : type === 'hourly' ? 'بالساعة' : 'قابل للتفاوض'
                })}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Budget Amount */}
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {getText({ 
            en: formData.budgetType === 'hourly' ? 'Hourly Rate (SAR) *' : 'Budget (SAR) *', 
            ar: formData.budgetType === 'hourly' ? 'الأجر بالساعة (ريال) *' : 'الميزانية (ريال) *' 
          })}
        </Text>
        <TextInput
          style={[styles.textInput, { backgroundColor: theme.surface, color: theme.text }]}
          placeholder={getText({ 
            en: formData.budgetType === 'hourly' ? '100-500 SAR/hour' : '10,000 - 50,000 SAR',
            ar: formData.budgetType === 'hourly' ? '100-500 ريال/ساعة' : '10,000 - 50,000 ريال'
          })}
          placeholderTextColor={theme.textSecondary}
          value={formData.budget}
          onChangeText={(text) => updateFormData('budget', text)}
          keyboardType="numeric"
          textAlign={isArabic ? 'right' : 'left'}
        />
      </View>

      {/* Project Size */}
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {getText({ en: 'Project Size', ar: 'حجم المشروع' })}
        </Text>
        <View style={styles.sizeGrid}>
          {PROJECT_SIZES.map((size) => (
            <TouchableOpacity
              key={size.id}
              style={[
                styles.sizeCard,
                { backgroundColor: theme.surface },
                formData.projectSize === size.id && { 
                  backgroundColor: COLORS.primary + '20',
                  borderColor: COLORS.primary 
                }
              ]}
              onPress={() => updateFormData('projectSize', size.id)}
            >
              <Text style={[styles.sizeText, { color: theme.text }]}>
                {getText(size.name)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Duration */}
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {getText({ en: 'Expected Duration *', ar: 'المدة المتوقعة *' })}
        </Text>
        <View style={styles.durationGrid}>
          {DURATION_OPTIONS.map((duration) => (
            <TouchableOpacity
              key={duration.id}
              style={[
                styles.durationCard,
                { backgroundColor: theme.surface },
                formData.duration === duration.id && { 
                  backgroundColor: COLORS.primary + '20',
                  borderColor: COLORS.primary 
                }
              ]}
              onPress={() => updateFormData('duration', duration.id)}
            >
              <Text style={[styles.durationText, { color: theme.text }]}>
                {getText(duration.name)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.stepTitle, { color: theme.text }]}>
        {getText({
          en: 'Location & Experience',
          ar: 'الموقع والخبرة'
        })}
      </Text>

      {/* Location */}
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {getText({ en: 'Project Location *', ar: 'موقع المشروع *' })}
        </Text>
        <TextInput
          style={[styles.textInput, { backgroundColor: theme.surface, color: theme.text }]}
          placeholder={getText({ en: 'City, Region, Saudi Arabia', ar: 'المدينة، المنطقة، المملكة العربية السعودية' })}
          placeholderTextColor={theme.textSecondary}
          value={formData.location}
          onChangeText={(text) => updateFormData('location', text)}
          textAlign={isArabic ? 'right' : 'left'}
        />
      </View>

      {/* Remote Work Option */}
      <View style={styles.inputGroup}>
        <TouchableOpacity
          style={[styles.checkboxContainer, { borderColor: theme.border }]}
          onPress={() => updateFormData('isRemote', !formData.isRemote)}
        >
          <Ionicons 
            name={formData.isRemote ? 'checkbox' : 'square-outline'} 
            size={24} 
            color={formData.isRemote ? COLORS.primary : theme.textSecondary} 
          />
          <Text style={[styles.checkboxText, { color: theme.text }]}>
            {getText({ en: 'Remote work possible', ar: 'إمكانية العمل عن بعد' })}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Experience Level */}
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {getText({ en: 'Required Experience Level *', ar: 'مستوى الخبرة المطلوب *' })}
        </Text>
        <View style={styles.experienceGrid}>
          {EXPERIENCE_LEVELS.map((level) => (
            <TouchableOpacity
              key={level.id}
              style={[
                styles.experienceCard,
                { backgroundColor: theme.surface },
                formData.experienceLevel === level.id && { 
                  backgroundColor: COLORS.primary + '20',
                  borderColor: COLORS.primary 
                }
              ]}
              onPress={() => updateFormData('experienceLevel', level.id)}
            >
              <Text style={[styles.experienceText, { color: theme.text }]}>
                {getText(level.name)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.stepTitle, { color: theme.text }]}>
        {getText({
          en: 'Requirements & Deliverables',
          ar: 'المتطلبات والمخرجات'
        })}
      </Text>

      {/* Requirements */}
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {getText({ en: 'Technical Requirements *', ar: 'المتطلبات التقنية *' })}
        </Text>
        <TextInput
          style={[styles.textArea, { backgroundColor: theme.surface, color: theme.text }]}
          placeholder={getText({ 
            en: 'List specific technical requirements, qualifications, certifications needed...', 
            ar: 'اذكر المتطلبات التقنية المحددة، المؤهلات، الشهادات المطلوبة...' 
          })}
          placeholderTextColor={theme.textSecondary}
          value={formData.requirements}
          onChangeText={(text) => updateFormData('requirements', text)}
          multiline
          numberOfLines={4}
          textAlign={isArabic ? 'right' : 'left'}
          textAlignVertical="top"
        />
      </View>

      {/* Deliverables */}
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {getText({ en: 'Expected Deliverables', ar: 'المخرجات المتوقعة' })}
        </Text>
        <TextInput
          style={[styles.textArea, { backgroundColor: theme.surface, color: theme.text }]}
          placeholder={getText({ 
            en: 'What should be delivered? (drawings, reports, calculations, etc.)', 
            ar: 'ما الذي يجب تسليمه؟ (رسومات، تقارير، حسابات، إلخ)' 
          })}
          placeholderTextColor={theme.textSecondary}
          value={formData.deliverables}
          onChangeText={(text) => updateFormData('deliverables', text)}
          multiline
          numberOfLines={4}
          textAlign={isArabic ? 'right' : 'left'}
          textAlignVertical="top"
        />
      </View>

      {/* Attachments */}
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {getText({ en: 'Project Files', ar: 'ملفات المشروع' })}
        </Text>
        <TouchableOpacity 
          style={[styles.attachmentButton, { backgroundColor: theme.surface, borderColor: theme.border }]}
        >
          <Ionicons name="cloud-upload" size={24} color={COLORS.primary} />
          <Text style={[styles.attachmentText, { color: theme.text }]}>
            {getText({ en: 'Upload files (drawings, specifications, etc.)', ar: 'رفع الملفات (رسومات، مواصفات، إلخ)' })}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1a1a1a', '#2d2d2d'] : ['#f8f9fa', '#ffffff']}
      style={styles.container}
    >
      <ScrollView 
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            {getText({
              en: 'Post a New Job',
              ar: 'نشر وظيفة جديدة'
            })}
          </Text>
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
            {getText({
              en: 'Find the perfect engineer for your project',
              ar: 'اعثر على المهندس المثالي لمشروعك'
            })}
          </Text>
        </View>

        {/* Progress Bar */}
        {renderProgressBar()}

        {/* Step Content */}
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}

        {/* Navigation Buttons */}
        <View style={styles.navigationContainer}>
          {currentStep > 1 && (
            <CustomButton
              title={getText({ en: 'Previous', ar: 'السابق' })}
              onPress={prevStep}
              variant="outline"
              icon="arrow-back"
              size="medium"
              customStyle={styles.prevButton}
            />
          )}

          <View style={styles.primaryActions}>
            {currentStep < totalSteps ? (
              <CustomButton
                title={getText({ en: 'Next', ar: 'التالي' })}
                onPress={nextStep}
                icon="arrow-forward"
                size="medium"
                customStyle={styles.nextButton}
              />
            ) : (
              <>
                <CustomButton
                  title={getText({ en: 'Save Draft', ar: 'حفظ كمسودة' })}
                  onPress={() => onSaveDraft?.(formData)}
                  variant="outline"
                  icon="bookmark"
                  size="medium"
                  customStyle={styles.draftButton}
                />
                <CustomButton
                  title={getText({ en: 'Post Job', ar: 'نشر الوظيفة' })}
                  onPress={handlePost}
                  icon="send"
                  size="medium"
                  customStyle={styles.postButton}
                />
              </>
            )}
          </View>
        </View>

        {/* Preview Button */}
        <View style={styles.previewContainer}>
          <CustomButton
            title={getText({ en: 'Preview Job Post', ar: 'معاينة الوظيفة' })}
            onPress={() => onPreview?.(formData)}
            variant="outline"
            icon="eye"
            size="small"
            customStyle={styles.previewButton}
          />
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
  headerTitle: {
    fontSize: TYPOGRAPHY.sizes.h1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.sm,
  },
  headerSubtitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    lineHeight: 22,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  progressBar: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  progressStep: {
    width: 60,
    height: 4,
    borderRadius: 2,
  },
  progressText: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  stepContainer: {
    marginBottom: SPACING.xl,
  },
  stepTitle: {
    fontSize: TYPOGRAPHY.sizes.h2,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: SPACING.lg,
  },
  inputLabel: {
    fontSize: TYPOGRAPHY.sizes.subtitle2,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: SPACING.sm,
  },
  textInput: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    fontSize: TYPOGRAPHY.sizes.body1,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  textArea: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    fontSize: TYPOGRAPHY.sizes.body1,
    minHeight: 120,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  categoryCard: {
    width: '48%',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
  budgetTypeContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  budgetTypeButton: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  budgetTypeText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  sizeGrid: {
    gap: SPACING.sm,
  },
  sizeCard: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  sizeText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    textAlign: 'center',
  },
  durationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  durationCard: {
    width: '48%',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  durationText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    gap: SPACING.sm,
  },
  checkboxText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    flex: 1,
  },
  experienceGrid: {
    gap: SPACING.sm,
  },
  experienceCard: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  experienceText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    textAlign: 'center',
  },
  attachmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 2,
    borderStyle: 'dashed',
    gap: SPACING.md,
  },
  attachmentText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    flex: 1,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  prevButton: {},
  primaryActions: {
    flexDirection: 'row',
    gap: SPACING.md,
    flex: 1,
    justifyContent: 'flex-end',
  },
  nextButton: {
    minWidth: 120,
  },
  draftButton: {
    minWidth: 120,
  },
  postButton: {
    minWidth: 120,
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  previewContainer: {
    alignItems: 'center',
    paddingTop: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.light.border,
  },
  previewButton: {
    width: '60%',
  },
});

export default JobPostingScreen;
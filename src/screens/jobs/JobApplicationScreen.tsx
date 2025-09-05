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
  jobId: string;
  jobTitle?: string;
  onSubmitApplication?: (applicationData: any) => void;
  onSaveDraft?: (applicationData: any) => void;
  onBack?: () => void;
}

const SAMPLE_JOB = {
  id: '1',
  title: { en: 'Senior Structural Engineer - High-Rise Development', ar: 'مهندس إنشائي أول - تطوير المباني العالية' },
  client: { en: 'Royal Development Group', ar: 'مجموعة التطوير الملكية' },
  budget: '150,000 - 250,000 SAR',
  deadline: '2024-02-20',
};

const JobApplicationScreen: React.FC<Props> = ({
  jobId,
  jobTitle,
  onSubmitApplication,
  onSaveDraft,
  onBack,
}) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const scrollViewRef = useRef<ScrollView>(null);
  
  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    proposedBudget: '',
    timeline: '',
    approach: '',
    experience: '',
    portfolio: [],
    attachments: [],
    availability: 'immediate',
    questions: '',
    agreedToTerms: false,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const updateApplicationData = (field: string, value: any) => {
    setApplicationData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return applicationData.coverLetter.length >= 100;
      case 2:
        return applicationData.proposedBudget && applicationData.timeline;
      case 3:
        return applicationData.approach && applicationData.experience;
      case 4:
        return applicationData.agreedToTerms;
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

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      Alert.alert(
        getText({ en: 'Submit Application', ar: 'إرسال الطلب' }),
        getText({ 
          en: 'Are you sure you want to submit your application?', 
          ar: 'هل أنت متأكد أنك تريد إرسال طلبك؟' 
        }),
        [
          { text: getText({ en: 'Cancel', ar: 'إلغاء' }), style: 'cancel' },
          { 
            text: getText({ en: 'Submit', ar: 'إرسال' }), 
            onPress: () => onSubmitApplication?.(applicationData) 
          }
        ]
      );
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
          en: 'Cover Letter & Introduction',
          ar: 'خطاب التقديم والتعريف'
        })}
      </Text>

      <Text style={[styles.stepDescription, { color: theme.textSecondary }]}>
        {getText({
          en: 'Introduce yourself and explain why you\'re the right fit for this project.',
          ar: 'عرّف بنفسك واشرح لماذا أنت المناسب لهذا المشروع.'
        })}
      </Text>

      {/* Cover Letter */}
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {getText({ en: 'Cover Letter *', ar: 'خطاب التقديم *' })}
        </Text>
        <Text style={[styles.inputHint, { color: theme.textSecondary }]}>
          {getText({ 
            en: 'Minimum 100 characters', 
            ar: 'الحد الأدنى 100 حرف' 
          })} ({applicationData.coverLetter.length}/100)
        </Text>
        <TextInput
          style={[styles.textArea, { backgroundColor: theme.surface, color: theme.text }]}
          placeholder={getText({ 
            en: 'Dear Client,\n\nI am excited to apply for this structural engineering position. With my extensive experience in high-rise design and expertise in Saudi building codes, I believe I am the ideal candidate for your project...\n\nKey qualifications:\n• 10+ years structural engineering experience\n• Expertise in ETABS and SAP2000\n• Previous high-rise projects in Riyadh\n• SBC compliance knowledge\n\nI look forward to discussing how I can contribute to the success of your landmark project.',
            ar: 'عزيزي العميل،\n\nيسعدني التقدم لهذا المنصب الهندسي الإنشائي. بخبرتي الواسعة في تصميم المباني العالية وخبرتي في الأكواد السعودية للبناء، أعتقد أنني المرشح الأمثل لمشروعك...\n\nالمؤهلات الأساسية:\n• خبرة أكثر من 10 سنوات في الهندسة الإنشائية\n• خبرة في ETABS و SAP2000\n• مشاريع مباني عالية سابقة في الرياض\n• معرفة بامتثال SBC\n\nأتطلع لمناقشة كيف يمكنني المساهمة في نجاح مشروعكم المعلم.'
          })}
          placeholderTextColor={theme.textSecondary}
          value={applicationData.coverLetter}
          onChangeText={(text) => updateApplicationData('coverLetter', text)}
          multiline
          numberOfLines={12}
          textAlign={isArabic ? 'right' : 'left'}
          textAlignVertical="top"
        />
      </View>

      {/* Relevant Experience Summary */}
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {getText({ en: 'Relevant Experience Summary', ar: 'ملخص الخبرة ذات الصلة' })}
        </Text>
        <TextInput
          style={[styles.textArea, { backgroundColor: theme.surface, color: theme.text, minHeight: 100 }]}
          placeholder={getText({ 
            en: 'Briefly highlight your most relevant experience for this specific project...', 
            ar: 'اذكر باختصار خبرتك الأكثر صلة بهذا المشروع المحدد...' 
          })}
          placeholderTextColor={theme.textSecondary}
          value={applicationData.experience}
          onChangeText={(text) => updateApplicationData('experience', text)}
          multiline
          numberOfLines={4}
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

      <Text style={[styles.stepDescription, { color: theme.textSecondary }]}>
        {getText({
          en: 'Provide your proposed budget and project timeline.',
          ar: 'قدم الميزانية المقترحة والجدول الزمني للمشروع.'
        })}
      </Text>

      {/* Proposed Budget */}
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {getText({ en: 'Proposed Budget (SAR) *', ar: 'الميزانية المقترحة (ريال) *' })}
        </Text>
        <Text style={[styles.budgetRange, { color: theme.textSecondary }]}>
          {getText({ en: 'Client budget range: ', ar: 'نطاق ميزانية العميل: ' })}
          {SAMPLE_JOB.budget}
        </Text>
        <TextInput
          style={[styles.textInput, { backgroundColor: theme.surface, color: theme.text }]}
          placeholder={getText({ en: 'e.g., 175,000 SAR', ar: 'مثال: 175,000 ريال' })}
          placeholderTextColor={theme.textSecondary}
          value={applicationData.proposedBudget}
          onChangeText={(text) => updateApplicationData('proposedBudget', text)}
          keyboardType="numeric"
          textAlign={isArabic ? 'right' : 'left'}
        />
      </View>

      {/* Timeline */}
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {getText({ en: 'Project Timeline *', ar: 'الجدول الزمني للمشروع *' })}
        </Text>
        <TextInput
          style={[styles.textInput, { backgroundColor: theme.surface, color: theme.text }]}
          placeholder={getText({ en: 'e.g., 10 months', ar: 'مثال: 10 أشهر' })}
          placeholderTextColor={theme.textSecondary}
          value={applicationData.timeline}
          onChangeText={(text) => updateApplicationData('timeline', text)}
          textAlign={isArabic ? 'right' : 'left'}
        />
      </View>

      {/* Availability */}
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {getText({ en: 'Availability', ar: 'التوفر' })}
        </Text>
        <View style={styles.availabilityOptions}>
          {[
            { id: 'immediate', label: { en: 'Immediate', ar: 'فوري' } },
            { id: 'week', label: { en: 'Within 1 week', ar: 'خلال أسبوع' } },
            { id: 'month', label: { en: 'Within 1 month', ar: 'خلال شهر' } },
            { id: 'custom', label: { en: 'Custom date', ar: 'تاريخ مخصص' } },
          ].map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.availabilityOption,
                { backgroundColor: theme.surface },
                applicationData.availability === option.id && { 
                  backgroundColor: COLORS.primary + '20',
                  borderColor: COLORS.primary 
                }
              ]}
              onPress={() => updateApplicationData('availability', option.id)}
            >
              <Text style={[
                styles.availabilityText, 
                { color: theme.text },
                applicationData.availability === option.id && { color: COLORS.primary }
              ]}>
                {getText(option.label)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Budget Justification */}
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {getText({ en: 'Budget Breakdown (Optional)', ar: 'تفصيل الميزانية (اختياري)' })}
        </Text>
        <TextInput
          style={[styles.textArea, { backgroundColor: theme.surface, color: theme.text }]}
          placeholder={getText({ 
            en: 'Provide a breakdown of your proposed budget:\n\n• Structural Analysis & Design: 60,000 SAR\n• Foundation Design: 40,000 SAR\n• Construction Documents: 35,000 SAR\n• Site Supervision: 40,000 SAR\n\nTotal: 175,000 SAR', 
            ar: 'قدم تفصيلاً للميزانية المقترحة:\n\n• التحليل والتصميم الإنشائي: 60,000 ريال\n• تصميم الأساسات: 40,000 ريال\n• وثائق البناء: 35,000 ريال\n• الإشراف على الموقع: 40,000 ريال\n\nالإجمالي: 175,000 ريال' 
          })}
          placeholderTextColor={theme.textSecondary}
          value={applicationData.budgetBreakdown}
          onChangeText={(text) => updateApplicationData('budgetBreakdown', text)}
          multiline
          numberOfLines={8}
          textAlign={isArabic ? 'right' : 'left'}
          textAlignVertical="top"
        />
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.stepTitle, { color: theme.text }]}>
        {getText({
          en: 'Technical Approach',
          ar: 'النهج الفني'
        })}
      </Text>

      <Text style={[styles.stepDescription, { color: theme.textSecondary }]}>
        {getText({
          en: 'Describe your technical approach and methodology for this project.',
          ar: 'اوصف نهجك الفني ومنهجيتك لهذا المشروع.'
        })}
      </Text>

      {/* Technical Approach */}
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {getText({ en: 'Project Approach & Methodology *', ar: 'نهج المشروع والمنهجية *' })}
        </Text>
        <TextInput
          style={[styles.textArea, { backgroundColor: theme.surface, color: theme.text }]}
          placeholder={getText({ 
            en: 'Outline your approach to this project:\n\n1. Initial Assessment\n   • Review architectural drawings and site conditions\n   • Analyze geotechnical reports\n   • Identify structural system requirements\n\n2. Structural Design\n   • Develop preliminary structural system\n   • Perform computer analysis using ETABS/SAP2000\n   • Design foundations based on soil conditions\n   • Check compliance with SBC requirements\n\n3. Documentation\n   • Prepare detailed structural drawings\n   • Develop technical specifications\n   • Provide construction support\n\n4. Quality Assurance\n   • Conduct design reviews\n   • Coordinate with other disciplines\n   • Ensure code compliance', 
            ar: 'اذكر نهجك في هذا المشروع:\n\n1. التقييم الأولي\n   • مراجعة الرسومات المعمارية وظروف الموقع\n   • تحليل التقارير الجيوتقنية\n   • تحديد متطلبات النظام الإنشائي\n\n2. التصميم الإنشائي\n   • تطوير النظام الإنشائي الأولي\n   • إجراء التحليل الحاسوبي باستخدام ETABS/SAP2000\n   • تصميم الأساسات بناء على ظروف التربة\n   • التحقق من الامتثال لمتطلبات SBC\n\n3. التوثيق\n   • إعداد رسومات إنشائية مفصلة\n   • تطوير المواصفات التقنية\n   • تقديم دعم البناء\n\n4. ضمان الجودة\n   • إجراء مراجعات التصميم\n   • التنسيق مع التخصصات الأخرى\n   • ضمان الامتثال للأكواد' 
          })}
          placeholderTextColor={theme.textSecondary}
          value={applicationData.approach}
          onChangeText={(text) => updateApplicationData('approach', text)}
          multiline
          numberOfLines={15}
          textAlign={isArabic ? 'right' : 'left'}
          textAlignVertical="top"
        />
      </View>

      {/* Software & Tools */}
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {getText({ en: 'Software & Tools', ar: 'البرامج والأدوات' })}
        </Text>
        <View style={styles.toolsContainer}>
          {[
            'ETABS', 'SAP2000', 'AutoCAD', 'Revit', 'SAFE', 'RAM Elements',
            'STAAD Pro', 'Robot', 'CSI Bridge', 'MATLAB'
          ].map((tool) => (
            <TouchableOpacity
              key={tool}
              style={[
                styles.toolChip,
                { backgroundColor: theme.surface },
                applicationData.tools?.includes(tool) && { 
                  backgroundColor: COLORS.primary + '20',
                  borderColor: COLORS.primary 
                }
              ]}
              onPress={() => {
                const currentTools = applicationData.tools || [];
                const updatedTools = currentTools.includes(tool)
                  ? currentTools.filter(t => t !== tool)
                  : [...currentTools, tool];
                updateApplicationData('tools', updatedTools);
              }}
            >
              <Text style={[
                styles.toolText, 
                { color: theme.text },
                applicationData.tools?.includes(tool) && { color: COLORS.primary }
              ]}>
                {tool}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Questions for Client */}
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {getText({ en: 'Questions for Client', ar: 'أسئلة للعميل' })}
        </Text>
        <TextInput
          style={[styles.textArea, { backgroundColor: theme.surface, color: theme.text }]}
          placeholder={getText({ 
            en: 'Any specific questions about the project requirements, site conditions, or expectations?', 
            ar: 'أي أسئلة محددة حول متطلبات المشروع أو ظروف الموقع أو التوقعات؟' 
          })}
          placeholderTextColor={theme.textSecondary}
          value={applicationData.questions}
          onChangeText={(text) => updateApplicationData('questions', text)}
          multiline
          numberOfLines={4}
          textAlign={isArabic ? 'right' : 'left'}
          textAlignVertical="top"
        />
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContainer}>
      <Text style={[styles.stepTitle, { color: theme.text }]}>
        {getText({
          en: 'Portfolio & Final Review',
          ar: 'المحفظة والمراجعة النهائية'
        })}
      </Text>

      <Text style={[styles.stepDescription, { color: theme.textSecondary }]}>
        {getText({
          en: 'Attach your portfolio and review your application before submission.',
          ar: 'أرفق محفظتك وراجع طلبك قبل الإرسال.'
        })}
      </Text>

      {/* Portfolio Upload */}
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {getText({ en: 'Portfolio & Work Samples', ar: 'المحفظة وعينات العمل' })}
        </Text>
        <TouchableOpacity 
          style={[styles.uploadButton, { backgroundColor: theme.surface, borderColor: theme.border }]}
        >
          <Ionicons name="cloud-upload" size={32} color={COLORS.primary} />
          <Text style={[styles.uploadText, { color: theme.text }]}>
            {getText({ 
              en: 'Upload portfolio files\n(PDF, Images, CAD files)', 
              ar: 'رفع ملفات المحفظة\n(PDF، صور، ملفات CAD)' 
            })}
          </Text>
          <Text style={[styles.uploadHint, { color: theme.textSecondary }]}>
            {getText({ en: 'Max 50MB per file', ar: 'حد أقصى 50 ميجا لكل ملف' })}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Certificates Upload */}
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {getText({ en: 'Certificates & Licenses', ar: 'الشهادات والتراخيص' })}
        </Text>
        <TouchableOpacity 
          style={[styles.uploadButton, { backgroundColor: theme.surface, borderColor: theme.border }]}
        >
          <Ionicons name="document-attach" size={32} color={COLORS.success} />
          <Text style={[styles.uploadText, { color: theme.text }]}>
            {getText({ 
              en: 'Upload certificates\n(Professional licenses, certifications)', 
              ar: 'رفع الشهادات\n(تراخيص مهنية، شهادات معتمدة)' 
            })}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Application Summary */}
      <View style={[styles.summaryCard, { backgroundColor: theme.surface }]}>
        <Text style={[styles.summaryTitle, { color: theme.text }]}>
          {getText({ en: 'Application Summary', ar: 'ملخص الطلب' })}
        </Text>
        
        <View style={styles.summaryItems}>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
              {getText({ en: 'Proposed Budget:', ar: 'الميزانية المقترحة:' })}
            </Text>
            <Text style={[styles.summaryValue, { color: theme.text }]}>
              {applicationData.proposedBudget || 'Not specified'}
            </Text>
          </View>
          
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
              {getText({ en: 'Timeline:', ar: 'الجدول الزمني:' })}
            </Text>
            <Text style={[styles.summaryValue, { color: theme.text }]}>
              {applicationData.timeline || 'Not specified'}
            </Text>
          </View>
          
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
              {getText({ en: 'Cover Letter Length:', ar: 'طول خطاب التقديم:' })}
            </Text>
            <Text style={[styles.summaryValue, { color: theme.text }]}>
              {applicationData.coverLetter.length} {getText({ en: 'characters', ar: 'حرف' })}
            </Text>
          </View>
        </View>
      </View>

      {/* Terms Agreement */}
      <View style={styles.inputGroup}>
        <TouchableOpacity
          style={[styles.checkboxContainer, { borderColor: theme.border }]}
          onPress={() => updateApplicationData('agreedToTerms', !applicationData.agreedToTerms)}
        >
          <Ionicons 
            name={applicationData.agreedToTerms ? 'checkbox' : 'square-outline'} 
            size={24} 
            color={applicationData.agreedToTerms ? COLORS.primary : theme.textSecondary} 
          />
          <Text style={[styles.checkboxText, { color: theme.text }]}>
            {getText({ 
              en: 'I agree to the terms and conditions and confirm that all information provided is accurate.', 
              ar: 'أوافق على الشروط والأحكام وأؤكد أن جميع المعلومات المقدمة دقيقة.' 
            })}
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
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            {getText({ en: 'Job Application', ar: 'طلب الوظيفة' })}
          </Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.jobInfo}>
          <Text style={[styles.jobTitle, { color: theme.text }]} numberOfLines={2}>
            {getText(SAMPLE_JOB.title)}
          </Text>
          <Text style={[styles.clientName, { color: theme.textSecondary }]}>
            {getText(SAMPLE_JOB.client)} • {SAMPLE_JOB.budget}
          </Text>
        </View>
      </View>

      <ScrollView 
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
      >
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
            <CustomButton
              title={getText({ en: 'Save Draft', ar: 'حفظ كمسودة' })}
              onPress={() => onSaveDraft?.(applicationData)}
              variant="outline"
              icon="bookmark"
              size="medium"
              customStyle={styles.draftButton}
            />

            {currentStep < totalSteps ? (
              <CustomButton
                title={getText({ en: 'Next', ar: 'التالي' })}
                onPress={nextStep}
                icon="arrow-forward"
                size="medium"
                customStyle={styles.nextButton}
              />
            ) : (
              <CustomButton
                title={getText({ en: 'Submit Application', ar: 'إرسال الطلب' })}
                onPress={handleSubmit}
                icon="send"
                size="medium"
                customStyle={styles.submitButton}
                disabled={!validateStep(currentStep)}
              />
            )}
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
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  backButton: {
    padding: SPACING.sm,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.sizes.h2,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  headerSpacer: {
    width: 40,
  },
  jobInfo: {
    paddingHorizontal: SPACING.sm,
  },
  jobTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  clientName: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
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
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  stepDescription: {
    fontSize: TYPOGRAPHY.sizes.body1,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    lineHeight: 22,
  },
  inputGroup: {
    marginBottom: SPACING.lg,
  },
  inputLabel: {
    fontSize: TYPOGRAPHY.sizes.subtitle2,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: SPACING.sm,
  },
  inputHint: {
    fontSize: TYPOGRAPHY.sizes.caption,
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
  budgetRange: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginBottom: SPACING.sm,
    fontStyle: 'italic',
  },
  availabilityOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  availabilityOption: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  availabilityText: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  toolsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  toolChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  toolText: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  uploadButton: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 2,
    borderStyle: 'dashed',
    gap: SPACING.md,
  },
  uploadText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    textAlign: 'center',
    lineHeight: 20,
  },
  uploadHint: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  summaryCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: SPACING.lg,
  },
  summaryTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.md,
  },
  summaryItems: {
    gap: SPACING.sm,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: TYPOGRAPHY.sizes.body2,
    flex: 1,
  },
  summaryValue: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    gap: SPACING.md,
  },
  checkboxText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    flex: 1,
    lineHeight: 20,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.xl,
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
  submitButton: {
    minWidth: 140,
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
});

export default JobApplicationScreen;
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';

import { RootState } from '../../store';
import { Language, ServiceCategory, JobPriority } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

const { width } = Dimensions.get('window');

interface JobStep {
  id: string;
  title: { en: string; ar: string };
  completed: boolean;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uri: string;
}

const JOB_STEPS: JobStep[] = [
  { id: 'details', title: { en: 'Job Details', ar: 'تفاصيل الوظيفة' }, completed: false },
  { id: 'specs', title: { en: 'Specifications', ar: 'المواصفات' }, completed: false },
  { id: 'timeline', title: { en: 'Timeline', ar: 'الجدول الزمني' }, completed: false },
  { id: 'budget', title: { en: 'Budget', ar: 'الميزانية' }, completed: false },
  { id: 'docs', title: { en: 'Documents', ar: 'المستندات' }, completed: false },
];

const AdvancedJobBuilderScreen = () => {
  const navigation = useNavigation();
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState(JOB_STEPS);
  
  // Job Details
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [serviceCategory, setServiceCategory] = useState<ServiceCategory | null>(null);
  const [location, setLocation] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  
  // Specifications
  const [projectScope, setProjectScope] = useState('');
  const [technicalRequirements, setTechnicalRequirements] = useState('');
  const [safetyRequirements, setSafetyRequirements] = useState('');
  const [complianceRequirements, setComplianceRequirements] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  // Timeline
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [isFlexible, setIsFlexible] = useState(false);
  const [priority, setPriority] = useState<JobPriority>(JobPriority.MEDIUM);
  
  // Budget
  const [budgetRange, setBudgetRange] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('');
  const [milestonePayments, setMilestonePayments] = useState(false);
  const [escrowRequired, setEscrowRequired] = useState(true);
  
  // Documents
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const updateStepCompletion = (stepIndex: number, completed: boolean) => {
    setSteps(prev => prev.map((step, index) => 
      index === stepIndex ? { ...step, completed } : step
    ));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      updateStepCompletion(currentStep, true);
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        const newFile: UploadedFile = {
          id: Date.now().toString(),
          name: file.name,
          size: file.size || 0,
          type: file.mimeType || 'unknown',
          uri: file.uri,
        };
        setUploadedFiles(prev => [...prev, newFile]);
      }
    } catch (error) {
      Alert.alert(
        isArabic ? 'خطأ في رفع الملف' : 'File Upload Error',
        isArabic ? 'فشل في رفع الملف. يرجى المحاولة مرة أخرى.' : 'Failed to upload file. Please try again.',
        [{ text: isArabic ? 'موافق' : 'OK' }]
      );
    }
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const handleSubmit = async () => {
    // Validate all steps
    const allStepsCompleted = steps.every(step => step.completed);
    if (!allStepsCompleted) {
      Alert.alert(
        isArabic ? 'خطوات غير مكتملة' : 'Incomplete Steps',
        isArabic ? 'يرجى إكمال جميع الخطوات قبل الإرسال' : 'Please complete all steps before submitting',
        [{ text: isArabic ? 'موافق' : 'OK' }]
      );
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));

      Alert.alert(
        isArabic ? 'تم إنشاء الوظيفة!' : 'Job Created!',
        isArabic 
          ? 'تم إنشاء وظيفتك بنجاح وسيتم إشعار المهندسين المؤهلين'
          : 'Your job has been created successfully and qualified engineers will be notified',
        [
          {
            text: isArabic ? 'متابعة' : 'Continue',
            onPress: () => navigation.navigate('ClientDashboard' as never)
          }
        ]
      );
    } catch (error) {
      Alert.alert(
        isArabic ? 'خطأ' : 'Error',
        isArabic ? 'فشل في إنشاء الوظيفة. يرجى المحاولة مرة أخرى.' : 'Failed to create job. Please try again.',
        [{ text: isArabic ? 'موافق' : 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {steps.map((step, index) => (
        <View key={step.id} style={styles.stepContainer}>
          <View style={[
            styles.stepCircle,
            {
              backgroundColor: index <= currentStep 
                ? COLORS.primary 
                : theme.border,
            }
          ]}>
            {index < currentStep ? (
              <Ionicons name="checkmark" size={16} color={COLORS.white} />
            ) : (
              <Text style={[
                styles.stepNumber,
                { color: index <= currentStep ? COLORS.white : theme.textSecondary }
              ]}>
                {index + 1}
              </Text>
            )}
          </View>
          <Text style={[
            styles.stepTitle,
            { color: index <= currentStep ? theme.text : theme.textSecondary }
          ]}>
            {getText(step.title)}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderJobDetails = () => (
    <View style={styles.stepContent}>
      <Text style={[styles.stepHeader, { color: theme.text }]}>
        {isArabic ? 'تفاصيل الوظيفة الأساسية' : 'Basic Job Details'}
      </Text>

      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {isArabic ? 'عنوان الوظيفة' : 'Job Title'} *
        </Text>
        <TextInput
          style={[
            styles.textInput,
            {
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
              color: theme.text,
              textAlign: isArabic ? 'right' : 'left',
            }
          ]}
          value={jobTitle}
          onChangeText={setJobTitle}
          placeholder={isArabic ? 'أدخل عنوان الوظيفة' : 'Enter job title'}
          placeholderTextColor={theme.textSecondary}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {isArabic ? 'وصف الوظيفة' : 'Job Description'} *
        </Text>
        <TextInput
          style={[
            styles.textArea,
            {
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
              color: theme.text,
              textAlign: isArabic ? 'right' : 'left',
            }
          ]}
          value={jobDescription}
          onChangeText={setJobDescription}
          placeholder={isArabic ? 'وصف تفصيلي للوظيفة والمتطلبات' : 'Detailed job description and requirements'}
          placeholderTextColor={theme.textSecondary}
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {isArabic ? 'فئة الخدمة' : 'Service Category'} *
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryList}>
          {Object.values(ServiceCategory).map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                {
                  backgroundColor: serviceCategory === category 
                    ? COLORS.primary 
                    : theme.surface,
                  borderColor: serviceCategory === category 
                    ? COLORS.primary 
                    : theme.border,
                }
              ]}
              onPress={() => setServiceCategory(category)}
            >
              <Text style={[
                styles.categoryChipText,
                { color: serviceCategory === category ? COLORS.white : theme.text }
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.row}>
        <View style={[styles.inputGroup, { flex: 1, marginRight: SPACING.sm }]}>
          <Text style={[styles.inputLabel, { color: theme.text }]}>
            {isArabic ? 'الموقع' : 'Location'} *
          </Text>
          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text,
                textAlign: isArabic ? 'right' : 'left',
              }
            ]}
            value={location}
            onChangeText={setLocation}
            placeholder={isArabic ? 'عنوان المشروع' : 'Project address'}
            placeholderTextColor={theme.textSecondary}
          />
        </View>

        <View style={[styles.inputGroup, { flex: 1, marginLeft: SPACING.sm }]}>
          <Text style={[styles.inputLabel, { color: theme.text }]}>
            {isArabic ? 'الشخص المسؤول' : 'Contact Person'} *
          </Text>
          <TextInput
            style={[
              styles.textInput,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
                color: theme.text,
                textAlign: isArabic ? 'right' : 'left',
              }
            ]}
            value={contactPerson}
            onChangeText={setContactPerson}
            placeholder={isArabic ? 'اسم المسؤول' : 'Contact name'}
            placeholderTextColor={theme.textSecondary}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {isArabic ? 'رقم الهاتف' : 'Phone Number'} *
        </Text>
        <TextInput
          style={[
            styles.textInput,
            {
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
              color: theme.text,
              textAlign: isArabic ? 'right' : 'left',
            }
          ]}
          value={contactPhone}
          onChangeText={setContactPhone}
          placeholder="+966 50 123 4567"
          placeholderTextColor={theme.textSecondary}
          keyboardType="phone-pad"
        />
      </View>
    </View>
  );

  const renderSpecifications = () => (
    <View style={styles.stepContent}>
      <Text style={[styles.stepHeader, { color: theme.text }]}>
        {isArabic ? 'المواصفات التقنية' : 'Technical Specifications'}
      </Text>

      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {isArabic ? 'نطاق المشروع' : 'Project Scope'} *
        </Text>
        <TextInput
          style={[
            styles.textArea,
            {
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
              color: theme.text,
              textAlign: isArabic ? 'right' : 'left',
            }
          ]}
          value={projectScope}
          onChangeText={setProjectScope}
          placeholder={isArabic ? 'وصف نطاق العمل المطلوب' : 'Describe the scope of work required'}
          placeholderTextColor={theme.textSecondary}
          multiline
          numberOfLines={3}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {isArabic ? 'المتطلبات التقنية' : 'Technical Requirements'}
        </Text>
        <TextInput
          style={[
            styles.textArea,
            {
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
              color: theme.text,
              textAlign: isArabic ? 'right' : 'left',
            }
          ]}
          value={technicalRequirements}
          onChangeText={setTechnicalRequirements}
          placeholder={isArabic ? 'المتطلبات التقنية والمواصفات' : 'Technical requirements and specifications'}
          placeholderTextColor={theme.textSecondary}
          multiline
          numberOfLines={3}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {isArabic ? 'متطلبات السلامة' : 'Safety Requirements'}
        </Text>
        <TextInput
          style={[
            styles.textArea,
            {
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
              color: theme.text,
              textAlign: isArabic ? 'right' : 'left',
            }
          ]}
          value={safetyRequirements}
          onChangeText={setSafetyRequirements}
          placeholder={isArabic ? 'متطلبات السلامة والوقاية' : 'Safety and protection requirements'}
          placeholderTextColor={theme.textSecondary}
          multiline
          numberOfLines={2}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {isArabic ? 'متطلبات الامتثال' : 'Compliance Requirements'}
        </Text>
        <TextInput
          style={[
            styles.textArea,
            {
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
              color: theme.text,
              textAlign: isArabic ? 'right' : 'left',
            }
          ]}
          value={complianceRequirements}
          onChangeText={setComplianceRequirements}
          placeholder={isArabic ? 'متطلبات الامتثال والتراخيص' : 'Compliance and licensing requirements'}
          placeholderTextColor={theme.textSecondary}
          multiline
          numberOfLines={2}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {isArabic ? 'تعليمات خاصة' : 'Special Instructions'}
        </Text>
        <TextInput
          style={[
            styles.textArea,
            {
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
              color: theme.text,
              textAlign: isArabic ? 'right' : 'left',
            }
          ]}
          value={specialInstructions}
          onChangeText={setSpecialInstructions}
          placeholder={isArabic ? 'أي تعليمات أو ملاحظات خاصة' : 'Any special instructions or notes'}
          placeholderTextColor={theme.textSecondary}
          multiline
          numberOfLines={2}
        />
      </View>
    </View>
  );

  const renderTimeline = () => (
    <View style={styles.stepContent}>
      <Text style={[styles.stepHeader, { color: theme.text }]}>
        {isArabic ? 'الجدول الزمني' : 'Project Timeline'}
      </Text>

      <View style={styles.row}>
        <View style={[styles.inputGroup, { flex: 1, marginRight: SPACING.sm }]}>
          <Text style={[styles.inputLabel, { color: theme.text }]}>
            {isArabic ? 'تاريخ البداية' : 'Start Date'} *
          </Text>
          <TouchableOpacity
            style={[
              styles.dateButton,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
              }
            ]}
            onPress={() => setShowStartDatePicker(true)}
          >
            <Text style={[styles.dateText, { color: theme.text }]}>
              {formatDate(startDate)}
            </Text>
            <Ionicons name="calendar" size={20} color={theme.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={[styles.inputGroup, { flex: 1, marginLeft: SPACING.sm }]}>
          <Text style={[styles.inputLabel, { color: theme.text }]}>
            {isArabic ? 'تاريخ الانتهاء' : 'End Date'} *
          </Text>
          <TouchableOpacity
            style={[
              styles.dateButton,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.border,
              }
            ]}
            onPress={() => setShowEndDatePicker(true)}
          >
            <Text style={[styles.dateText, { color: theme.text }]}>
              {formatDate(endDate)}
            </Text>
            <Ionicons name="calendar" size={20} color={theme.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {isArabic ? 'أولوية المشروع' : 'Project Priority'}
        </Text>
        <View style={styles.priorityContainer}>
          {Object.values(JobPriority).map((priorityOption) => (
            <TouchableOpacity
              key={priorityOption}
              style={[
                styles.priorityButton,
                {
                  backgroundColor: priority === priorityOption 
                    ? COLORS.primary 
                    : theme.surface,
                  borderColor: priority === priorityOption 
                    ? COLORS.primary 
                    : theme.border,
                }
              ]}
              onPress={() => setPriority(priorityOption)}
            >
              <Text style={[
                styles.priorityText,
                { color: priority === priorityOption ? COLORS.white : theme.text }
              ]}>
                {priorityOption}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.flexibleToggle,
          {
            backgroundColor: isFlexible ? COLORS.primary + '15' : theme.surface,
            borderColor: isFlexible ? COLORS.primary : theme.border,
          }
        ]}
        onPress={() => setIsFlexible(!isFlexible)}
      >
        <Ionicons 
          name={isFlexible ? 'checkmark-circle' : 'ellipse-outline'} 
          size={24} 
          color={isFlexible ? COLORS.primary : theme.textSecondary} 
        />
        <Text style={[
          styles.flexibleText,
          { color: isFlexible ? COLORS.primary : theme.textSecondary }
        ]}>
          {isArabic ? 'الجدول الزمني مرن' : 'Flexible Timeline'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderBudget = () => (
    <View style={styles.stepContent}>
      <Text style={[styles.stepHeader, { color: theme.text }]}>
        {isArabic ? 'الميزانية وشروط الدفع' : 'Budget & Payment Terms'}
      </Text>

      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {isArabic ? 'نطاق الميزانية' : 'Budget Range'} *
        </Text>
        <TextInput
          style={[
            styles.textInput,
            {
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
              color: theme.text,
              textAlign: isArabic ? 'right' : 'left',
            }
          ]}
          value={budgetRange}
          onChangeText={setBudgetRange}
          placeholder={isArabic ? 'مثال: 5000 - 10000 ريال' : 'e.g., 5000 - 10000 SAR'}
          placeholderTextColor={theme.textSecondary}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: theme.text }]}>
          {isArabic ? 'شروط الدفع' : 'Payment Terms'}
        </Text>
        <TextInput
          style={[
            styles.textArea,
            {
              backgroundColor: theme.inputBackground,
              borderColor: theme.border,
              color: theme.text,
              textAlign: isArabic ? 'right' : 'left',
            }
          ]}
          value={paymentTerms}
          onChangeText={setPaymentTerms}
          placeholder={isArabic ? 'شروط الدفع والدفعات' : 'Payment terms and installments'}
          placeholderTextColor={theme.textSecondary}
          multiline
          numberOfLines={2}
        />
      </View>

      <View style={styles.budgetOptions}>
        <TouchableOpacity
          style={[
            styles.budgetOption,
            {
              backgroundColor: milestonePayments ? COLORS.primary + '15' : theme.surface,
              borderColor: milestonePayments ? COLORS.primary : theme.border,
            }
          ]}
          onPress={() => setMilestonePayments(!milestonePayments)}
        >
          <Ionicons 
            name={milestonePayments ? 'checkmark-circle' : 'ellipse-outline'} 
            size={24} 
            color={milestonePayments ? COLORS.primary : theme.textSecondary} 
          />
          <Text style={[
            styles.budgetOptionText,
            { color: milestonePayments ? COLORS.primary : theme.textSecondary }
          ]}>
            {isArabic ? 'دفعات حسب المراحل' : 'Milestone Payments'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.budgetOption,
            {
              backgroundColor: escrowRequired ? COLORS.primary + '15' : theme.surface,
              borderColor: escrowRequired ? COLORS.primary : theme.border,
            }
          ]}
          onPress={() => setEscrowRequired(!escrowRequired)}
        >
          <Ionicons 
            name={escrowRequired ? 'checkmark-circle' : 'ellipse-outline'} 
            size={24} 
            color={escrowRequired ? COLORS.primary : theme.textSecondary} 
          />
          <Text style={[
            styles.budgetOptionText,
            { color: escrowRequired ? COLORS.primary : theme.textSecondary }
          ]}>
            {isArabic ? 'حساب ضمان مطلوب' : 'Escrow Account Required'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderDocuments = () => (
    <View style={styles.stepContent}>
      <Text style={[styles.stepHeader, { color: theme.text }]}>
        {isArabic ? 'المستندات والملفات' : 'Documents & Files'}
      </Text>

      <TouchableOpacity
        style={[styles.uploadButton, { backgroundColor: theme.surface, borderColor: theme.border }]}
        onPress={handleFileUpload}
      >
        <Ionicons name="cloud-upload" size={32} color={COLORS.primary} />
        <Text style={[styles.uploadText, { color: theme.text }]}>
          {isArabic ? 'رفع الملفات' : 'Upload Files'}
        </Text>
        <Text style={[styles.uploadSubtext, { color: theme.textSecondary }]}>
          {isArabic ? 'PDF, صور, مستندات Word' : 'PDF, Images, Word documents'}
        </Text>
      </TouchableOpacity>

      {uploadedFiles.length > 0 && (
        <View style={styles.filesList}>
          <Text style={[styles.filesTitle, { color: theme.text }]}>
            {isArabic ? 'الملفات المرفوعة:' : 'Uploaded Files:'}
          </Text>
          {uploadedFiles.map((file) => (
            <View key={file.id} style={[styles.fileItem, { backgroundColor: theme.surface }]}>
              <Ionicons name="document" size={24} color={COLORS.primary} />
              <View style={styles.fileInfo}>
                <Text style={[styles.fileName, { color: theme.text }]} numberOfLines={1}>
                  {file.name}
                </Text>
                <Text style={[styles.fileSize, { color: theme.textSecondary }]}>
                  {formatFileSize(file.size)}
                </Text>
              </View>
              <TouchableOpacity onPress={() => removeFile(file.id)}>
                <Ionicons name="close-circle" size={24} color={COLORS.error} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0: return renderJobDetails();
      case 1: return renderSpecifications();
      case 2: return renderTimeline();
      case 3: return renderBudget();
      case 4: return renderDocuments();
      default: return null;
    }
  };

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1a1a1a', '#2d2d2d'] : ['#f8f9fa', '#ffffff']}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons 
              name={isArabic ? 'chevron-forward' : 'chevron-back'} 
              size={24} 
              color={theme.text} 
            />
          </TouchableOpacity>

          <View style={styles.headerContent}>
            <Text style={[styles.title, { color: theme.text }]}>
              {isArabic ? 'منشئ الوظائف المتقدم' : 'Advanced Job Builder'}
            </Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              {isArabic ? 'إنشاء وظيفة مفصلة مع جميع المتطلبات' : 'Create detailed job with all requirements'}
            </Text>
          </View>
        </View>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Current Step Content */}
        {renderCurrentStep()}

        {/* Navigation Buttons */}
        <View style={styles.navigationContainer}>
          {currentStep > 0 && (
            <CustomButton
              title={isArabic ? 'السابق' : 'Previous'}
              onPress={prevStep}
              style={[styles.navButton, { backgroundColor: theme.surface }]}
              textColor={theme.text}
            />
          )}

          <View style={styles.spacer} />

          {currentStep < steps.length - 1 ? (
            <CustomButton
              title={isArabic ? 'التالي' : 'Next'}
              onPress={nextStep}
              style={styles.navButton}
              icon="arrow-forward"
            />
          ) : (
            <CustomButton
              title={isArabic ? 'إنشاء الوظيفة' : 'Create Job'}
              onPress={handleSubmit}
              loading={isLoading}
              style={styles.submitButton}
              icon="checkmark"
            />
          )}
        </View>

        {/* Date Pickers */}
        {showStartDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowStartDatePicker(false);
              if (selectedDate) {
                setStartDate(selectedDate);
              }
            }}
            minimumDate={new Date()}
          />
        )}

        {showEndDatePicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowEndDatePicker(false);
              if (selectedDate) {
                setEndDate(selectedDate);
              }
            }}
            minimumDate={startDate}
          />
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  backButton: {
    padding: SPACING.sm,
    marginRight: SPACING.md,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.h2,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 20,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
    paddingHorizontal: SPACING.sm,
  },
  stepContainer: {
    alignItems: 'center',
    flex: 1,
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
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  stepTitle: {
    fontSize: TYPOGRAPHY.sizes.caption,
    textAlign: 'center',
  },
  stepContent: {
    marginBottom: SPACING.xl,
  },
  stepHeader: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.lg,
  },
  inputGroup: {
    marginBottom: SPACING.lg,
  },
  inputLabel: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: SPACING.sm,
  },
  textInput: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.md,
    fontSize: TYPOGRAPHY.sizes.body1,
  },
  textArea: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.md,
    fontSize: TYPOGRAPHY.sizes.body1,
    height: 80,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
  },
  categoryList: {
    flexDirection: 'row',
  },
  categoryChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    marginRight: SPACING.sm,
  },
  categoryChipText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.md,
  },
  dateText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    flex: 1,
  },
  priorityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  priorityButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
  },
  priorityText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  flexibleToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 2,
  },
  flexibleText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginLeft: SPACING.sm,
  },
  budgetOptions: {
    gap: SPACING.md,
  },
  budgetOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 2,
  },
  budgetOptionText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginLeft: SPACING.sm,
  },
  uploadButton: {
    alignItems: 'center',
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 2,
    borderStyle: 'dashed',
    marginBottom: SPACING.lg,
  },
  uploadText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  uploadSubtext: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  filesList: {
    marginTop: SPACING.md,
  },
  filesTitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.sm,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
  },
  fileInfo: {
    flex: 1,
    marginLeft: SPACING.sm,
  },
  fileName: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  fileSize: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  navButton: {
    flex: 1,
    marginHorizontal: SPACING.xs,
  },
  spacer: {
    flex: 1,
  },
  submitButton: {
    flex: 1,
    marginHorizontal: SPACING.xs,
  },
});

export default AdvancedJobBuilderScreen;

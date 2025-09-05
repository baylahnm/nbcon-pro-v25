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

import { RootState } from '../../store';
import { Language, JobTemplate, ServiceCategory } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

const { width } = Dimensions.get('window');

interface ServiceTemplate {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  icon: string;
  color: string;
  category: ServiceCategory;
  estimatedDuration: number; // in hours
  basePrice: number; // in SAR
  requirements: string[];
}

const SERVICE_TEMPLATES: ServiceTemplate[] = [
  {
    id: 'inspection',
    title: { en: 'Site Inspection', ar: 'معاينة الموقع' },
    description: {
      en: 'Comprehensive site inspection and assessment',
      ar: 'معاينة وتقييم شامل للموقع'
    },
    icon: 'search',
    color: '#FF9800',
    category: ServiceCategory.CIVIL,
    estimatedDuration: 4,
    basePrice: 800,
    requirements: ['Site access', 'Safety equipment', 'Measurement tools']
  },
  {
    id: 'mep',
    title: { en: 'MEP Systems Review', ar: 'مراجعة أنظمة MEP' },
    description: {
      en: 'Mechanical, Electrical, and Plumbing systems review',
      ar: 'مراجعة الأنظمة الميكانيكية والكهربائية والسباكة'
    },
    icon: 'construct',
    color: '#2196F3',
    category: ServiceCategory.MEP,
    estimatedDuration: 6,
    basePrice: 1200,
    requirements: ['System drawings', 'Access to utilities', 'Testing equipment']
  },
  {
    id: 'survey',
    title: { en: 'Land Surveying', ar: 'المساحة الأرضية' },
    description: {
      en: 'Precise land surveying and mapping services',
      ar: 'خدمات المساحة الأرضية الدقيقة ورسم الخرائط'
    },
    icon: 'location',
    color: '#4CAF50',
    category: ServiceCategory.SURVEYING,
    estimatedDuration: 8,
    basePrice: 1500,
    requirements: ['Clear site access', 'Survey markers', 'GPS equipment']
  },
  {
    id: 'bim',
    title: { en: 'BIM Modeling', ar: 'نمذجة BIM' },
    description: {
      en: 'Building Information Modeling and 3D visualization',
      ar: 'نمذجة معلومات البناء والتصور ثلاثي الأبعاد'
    },
    icon: 'cube',
    color: '#9C27B0',
    category: ServiceCategory.BIM,
    estimatedDuration: 12,
    basePrice: 2000,
    requirements: ['CAD files', 'Project specifications', 'Software access']
  },
  {
    id: 'hse',
    title: { en: 'HSE Assessment', ar: 'تقييم الصحة والسلامة' },
    description: {
      en: 'Health, Safety, and Environment compliance assessment',
      ar: 'تقييم امتثال الصحة والسلامة والبيئة'
    },
    icon: 'shield-checkmark',
    color: '#F44336',
    category: ServiceCategory.HSE,
    estimatedDuration: 3,
    basePrice: 600,
    requirements: ['Safety documentation', 'Site access', 'Compliance checklist']
  },
  {
    id: 'gis',
    title: { en: 'GIS Analysis', ar: 'تحليل نظم المعلومات الجغرافية' },
    description: {
      en: 'Geographic Information Systems analysis and mapping',
      ar: 'تحليل نظم المعلومات الجغرافية ورسم الخرائط'
    },
    icon: 'map',
    color: '#00BCD4',
    category: ServiceCategory.GIS,
    estimatedDuration: 10,
    basePrice: 1800,
    requirements: ['Geographic data', 'Satellite imagery', 'Analysis software']
  }
];

const QuickJobPostScreen = () => {
  const navigation = useNavigation();
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  
  const [selectedTemplate, setSelectedTemplate] = useState<ServiceTemplate | null>(null);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [preferredDate, setPreferredDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const handleTemplateSelect = (template: ServiceTemplate) => {
    setSelectedTemplate(template);
    setJobTitle(getText(template.title));
    setJobDescription(getText(template.description));
    setBudget(template.basePrice.toString());
  };

  const handlePostJob = async () => {
    if (!selectedTemplate) {
      Alert.alert(
        isArabic ? 'اختر خدمة' : 'Select Service',
        isArabic ? 'يرجى اختيار نوع الخدمة المطلوبة' : 'Please select a service type',
        [{ text: isArabic ? 'موافق' : 'OK' }]
      );
      return;
    }

    if (!jobTitle.trim() || !jobDescription.trim() || !location.trim()) {
      Alert.alert(
        isArabic ? 'معلومات مطلوبة' : 'Required Information',
        isArabic ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields',
        [{ text: isArabic ? 'موافق' : 'OK' }]
      );
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call to post job
      await new Promise(resolve => setTimeout(resolve, 2000));

      Alert.alert(
        isArabic ? 'تم النشر بنجاح!' : 'Job Posted Successfully!',
        isArabic 
          ? 'تم نشر وظيفتك وسيتم إشعار المهندسين المؤهلين قريباً'
          : 'Your job has been posted and qualified engineers will be notified soon',
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
        isArabic ? 'فشل في نشر الوظيفة. يرجى المحاولة مرة أخرى.' : 'Failed to post job. Please try again.',
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
      day: 'numeric'
    });
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
              {isArabic ? 'نشر وظيفة سريع' : 'Quick Job Post'}
            </Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              {isArabic ? 'اختر قالب خدمة واملأ التفاصيل الأساسية' : 'Select a service template and fill basic details'}
            </Text>
          </View>
        </View>

        {/* Service Templates */}
        <View style={styles.templatesSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {isArabic ? 'اختر نوع الخدمة' : 'Select Service Type'}
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.templatesList}>
            {SERVICE_TEMPLATES.map((template) => (
              <TouchableOpacity
                key={template.id}
                style={[
                  styles.templateCard,
                  {
                    backgroundColor: selectedTemplate?.id === template.id 
                      ? template.color + '15' 
                      : theme.surface,
                    borderColor: selectedTemplate?.id === template.id 
                      ? template.color 
                      : theme.border,
                  }
                ]}
                onPress={() => handleTemplateSelect(template)}
              >
                <View style={[styles.templateIcon, { backgroundColor: template.color + '20' }]}>
                  <Ionicons name={template.icon as any} size={30} color={template.color} />
                </View>
                
                <Text style={[styles.templateTitle, { color: theme.text }]}>
                  {getText(template.title)}
                </Text>
                
                <Text style={[styles.templateDescription, { color: theme.textSecondary }]}>
                  {getText(template.description)}
                </Text>

                <View style={styles.templateInfo}>
                  <View style={styles.templateDetail}>
                    <Ionicons name="time" size={16} color={template.color} />
                    <Text style={[styles.templateDetailText, { color: template.color }]}>
                      {template.estimatedDuration}h
                    </Text>
                  </View>
                  <View style={styles.templateDetail}>
                    <Ionicons name="cash" size={16} color={template.color} />
                    <Text style={[styles.templateDetailText, { color: template.color }]}>
                      {template.basePrice} SAR
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Job Details Form */}
        {selectedTemplate && (
          <View style={styles.formSection}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {isArabic ? 'تفاصيل الوظيفة' : 'Job Details'}
            </Text>

            {/* Job Title */}
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

            {/* Job Description */}
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
                placeholder={isArabic ? 'وصف تفصيلي للوظيفة والمتطلبات' : 'Detailed description of the job and requirements'}
                placeholderTextColor={theme.textSecondary}
                multiline
                numberOfLines={4}
              />
            </View>

            {/* Location */}
            <View style={styles.inputGroup}>
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
                placeholder={isArabic ? 'عنوان المشروع أو الموقع' : 'Project address or location'}
                placeholderTextColor={theme.textSecondary}
              />
            </View>

            {/* Budget and Date Row */}
            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: SPACING.sm }]}>
                <Text style={[styles.inputLabel, { color: theme.text }]}>
                  {isArabic ? 'الميزانية (ريال)' : 'Budget (SAR)'}
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
                  value={budget}
                  onChangeText={setBudget}
                  placeholder="0"
                  placeholderTextColor={theme.textSecondary}
                  keyboardType="numeric"
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1, marginLeft: SPACING.sm }]}>
                <Text style={[styles.inputLabel, { color: theme.text }]}>
                  {isArabic ? 'التاريخ المفضل' : 'Preferred Date'}
                </Text>
                <TouchableOpacity
                  style={[
                    styles.dateButton,
                    {
                      backgroundColor: theme.inputBackground,
                      borderColor: theme.border,
                    }
                  ]}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text style={[styles.dateText, { color: theme.text }]}>
                    {formatDate(preferredDate)}
                  </Text>
                  <Ionicons name="calendar" size={20} color={theme.textSecondary} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Urgent Toggle */}
            <View style={styles.urgentToggle}>
              <TouchableOpacity
                style={[
                  styles.urgentButton,
                  {
                    backgroundColor: isUrgent ? COLORS.error + '15' : theme.surface,
                    borderColor: isUrgent ? COLORS.error : theme.border,
                  }
                ]}
                onPress={() => setIsUrgent(!isUrgent)}
              >
                <Ionicons 
                  name={isUrgent ? 'flash' : 'flash-outline'} 
                  size={20} 
                  color={isUrgent ? COLORS.error : theme.textSecondary} 
                />
                <Text style={[
                  styles.urgentText,
                  { color: isUrgent ? COLORS.error : theme.textSecondary }
                ]}>
                  {isArabic ? 'وظيفة عاجلة (+50% سعر)' : 'Urgent Job (+50% price)'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Requirements */}
            <View style={styles.requirementsSection}>
              <Text style={[styles.requirementsTitle, { color: theme.text }]}>
                {isArabic ? 'متطلبات الخدمة:' : 'Service Requirements:'}
              </Text>
              {selectedTemplate.requirements.map((requirement, index) => (
                <View key={index} style={styles.requirementItem}>
                  <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
                  <Text style={[styles.requirementText, { color: theme.textSecondary }]}>
                    {requirement}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Post Button */}
        {selectedTemplate && (
          <CustomButton
            title={isArabic ? 'نشر الوظيفة' : 'Post Job'}
            onPress={handlePostJob}
            loading={isLoading}
            disabled={!jobTitle.trim() || !jobDescription.trim() || !location.trim()}
            icon="send"
            fullWidth
            size="large"
            customStyle={styles.postButton}
          />
        )}

        {/* Date Picker Modal */}
        {showDatePicker && (
          <DateTimePicker
            value={preferredDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setPreferredDate(selectedDate);
              }
            }}
            minimumDate={new Date()}
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
  templatesSection: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.md,
  },
  templatesList: {
    flexDirection: 'row',
  },
  templateCard: {
    width: 200,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginRight: SPACING.md,
    borderWidth: 2,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  templateIcon: {
    width: 60,
    height: 60,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  templateTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  templateDescription: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 18,
    marginBottom: SPACING.md,
  },
  templateInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  templateDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  templateDetailText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginLeft: SPACING.xs,
  },
  formSection: {
    marginBottom: SPACING.xl,
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
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
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
  urgentToggle: {
    marginBottom: SPACING.lg,
  },
  urgentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 2,
  },
  urgentText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginLeft: SPACING.sm,
  },
  requirementsSection: {
    marginBottom: SPACING.lg,
  },
  requirementsTitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.sm,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  requirementText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: SPACING.sm,
  },
  postButton: {
    marginTop: SPACING.lg,
  },
});

export default QuickJobPostScreen;

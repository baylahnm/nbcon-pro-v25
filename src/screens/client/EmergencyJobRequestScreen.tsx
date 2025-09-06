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
import { Language, ServiceCategory, JobPriority } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

const { width } = Dimensions.get('window');

interface EmergencyService {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  icon: string;
  color: string;
  category: ServiceCategory;
  basePrice: number;
  emergencyMultiplier: number;
  estimatedResponseTime: number; // in minutes
  requirements: string[];
}

const EMERGENCY_SERVICES: EmergencyService[] = [
  {
    id: 'structural_emergency',
    title: { en: 'Structural Emergency', ar: 'طوارئ هيكلية' },
    description: {
      en: 'Critical structural issues requiring immediate attention',
      ar: 'مشاكل هيكلية حرجة تتطلب اهتماماً فورياً'
    },
    icon: 'warning',
    color: '#F44336',
    category: ServiceCategory.CIVIL,
    basePrice: 2000,
    emergencyMultiplier: 2.5,
    estimatedResponseTime: 30,
    requirements: ['Safety equipment', 'Emergency access', '24/7 availability'],
  },
  {
    id: 'mep_emergency',
    title: { en: 'MEP Emergency', ar: 'طوارئ الأنظمة الكهروميكانيكية' },
    description: {
      en: 'Critical MEP system failures requiring urgent repair',
      ar: 'أعطال حرجة في الأنظمة الكهروميكانيكية تتطلب إصلاحاً عاجلاً'
    },
    icon: 'flash',
    color: '#FF9800',
    category: ServiceCategory.MEP,
    basePrice: 1500,
    emergencyMultiplier: 2.0,
    estimatedResponseTime: 45,
    requirements: ['Specialized tools', 'Emergency permits', 'Backup systems'],
  },
  {
    id: 'safety_emergency',
    title: { en: 'Safety Emergency', ar: 'طوارئ السلامة' },
    description: {
      en: 'Immediate safety hazard assessment and mitigation',
      ar: 'تقييم ومكافحة المخاطر الأمنية الفورية'
    },
    icon: 'shield-checkmark',
    color: '#FF5722',
    category: ServiceCategory.HSE,
    basePrice: 1200,
    emergencyMultiplier: 2.0,
    estimatedResponseTime: 20,
    requirements: ['Safety certification', 'Emergency protocols', 'Risk assessment tools'],
  },
  {
    id: 'survey_emergency',
    title: { en: 'Emergency Survey', ar: 'مسح طارئ' },
    description: {
      en: 'Urgent site survey for emergency response planning',
      ar: 'مسح موقع عاجل لتخطيط الاستجابة للطوارئ'
    },
    icon: 'map',
    color: '#9C27B0',
    category: ServiceCategory.SURVEYING,
    basePrice: 1000,
    emergencyMultiplier: 1.8,
    estimatedResponseTime: 60,
    requirements: ['Survey equipment', 'Site access', 'Emergency clearance'],
  },
];

const EmergencyJobRequestScreen = () => {
  const navigation = useNavigation();
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [selectedService, setSelectedService] = useState<EmergencyService | null>(null);
  const [urgencyLevel, setUrgencyLevel] = useState<'critical' | 'urgent' | 'high'>('urgent');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    contactPhone: '',
    additionalNotes: '',
  });

  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const getUrgencyConfig = (level: string) => {
    switch (level) {
      case 'critical':
        return {
          color: '#D32F2F',
          label: { en: 'Critical', ar: 'حرج' },
          description: { en: 'Life-threatening situation', ar: 'حالة تهدد الحياة' },
          multiplier: 3.0,
          responseTime: 15,
        };
      case 'urgent':
        return {
          color: '#F57C00',
          label: { en: 'Urgent', ar: 'عاجل' },
          description: { en: 'Requires immediate attention', ar: 'يتطلب اهتماماً فورياً' },
          multiplier: 2.0,
          responseTime: 30,
        };
      case 'high':
        return {
          color: '#FFA000',
          label: { en: 'High Priority', ar: 'أولوية عالية' },
          description: { en: 'Needs attention within hours', ar: 'يحتاج اهتمام خلال ساعات' },
          multiplier: 1.5,
          responseTime: 60,
        };
      default:
        return {
          color: '#F57C00',
          label: { en: 'Urgent', ar: 'عاجل' },
          description: { en: 'Requires immediate attention', ar: 'يتطلب اهتماماً فورياً' },
          multiplier: 2.0,
          responseTime: 30,
        };
    }
  };

  const calculateEmergencyPrice = () => {
    if (!selectedService) return 0;
    const urgencyConfig = getUrgencyConfig(urgencyLevel);
    return Math.round(selectedService.basePrice * urgencyConfig.multiplier);
  };

  const calculateResponseTime = () => {
    if (!selectedService) return 0;
    const urgencyConfig = getUrgencyConfig(urgencyLevel);
    return Math.min(selectedService.estimatedResponseTime, urgencyConfig.responseTime);
  };

  const handleServiceSelect = (service: EmergencyService) => {
    setSelectedService(service);
  };

  const handleUrgencySelect = (level: 'critical' | 'urgent' | 'high') => {
    setUrgencyLevel(level);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitEmergencyRequest = () => {
    if (!selectedService) {
      Alert.alert(
        isArabic ? 'خطأ' : 'Error',
        isArabic ? 'يرجى اختيار نوع الخدمة الطارئة' : 'Please select an emergency service type'
      );
      return;
    }

    if (!formData.title.trim() || !formData.description.trim() || !formData.location.trim()) {
      Alert.alert(
        isArabic ? 'خطأ' : 'Error',
        isArabic ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields'
      );
      return;
    }

    // Simulate emergency request submission
    Alert.alert(
      isArabic ? 'تم إرسال الطلب الطارئ' : 'Emergency Request Submitted',
      isArabic 
        ? 'تم إرسال طلبك الطارئ بنجاح. سيتم إشعار المهندسين المتاحين فوراً.'
        : 'Your emergency request has been submitted successfully. Available engineers will be notified immediately.',
      [
        {
          text: isArabic ? 'موافق' : 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const urgencyConfig = getUrgencyConfig(urgencyLevel);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Emergency Header */}
      <LinearGradient
        colors={[urgencyConfig.color, urgencyConfig.color + 'CC']}
        style={styles.emergencyHeader}
      >
        <View style={styles.emergencyHeaderContent}>
          <View style={styles.emergencyIconContainer}>
            <Ionicons name="warning" size={32} color={COLORS.white} />
          </View>
          <View style={styles.emergencyHeaderInfo}>
            <Text style={styles.emergencyTitle}>
              {isArabic ? 'طلب خدمة طارئة' : 'Emergency Service Request'}
            </Text>
            <Text style={styles.emergencySubtitle}>
              {isArabic 
                ? 'احصل على مساعدة فورية من المهندسين المعتمدين'
                : 'Get immediate help from certified engineers'
              }
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Urgency Level Selection */}
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {isArabic ? 'مستوى الأولوية' : 'Priority Level'}
          </Text>
          <Text style={[styles.sectionDescription, { color: theme.textSecondary }]}>
            {isArabic 
              ? 'اختر مستوى الأولوية لطلبك الطارئ'
              : 'Select the priority level for your emergency request'
            }
          </Text>
          
          <View style={styles.urgencyOptions}>
            {[
              { key: 'critical', label: { en: 'Critical', ar: 'حرج' }, icon: 'alert-circle' },
              { key: 'urgent', label: { en: 'Urgent', ar: 'عاجل' }, icon: 'warning' },
              { key: 'high', label: { en: 'High Priority', ar: 'أولوية عالية' }, icon: 'flag' },
            ].map((option) => {
              const config = getUrgencyConfig(option.key);
              const isSelected = urgencyLevel === option.key;
              
              return (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.urgencyOption,
                    isSelected && { borderColor: config.color, backgroundColor: config.color + '20' }
                  ]}
                  onPress={() => handleUrgencySelect(option.key as any)}
                >
                  <View style={[styles.urgencyIcon, { backgroundColor: config.color }]}>
                    <Ionicons name={option.icon as any} size={20} color={COLORS.white} />
                  </View>
                  <View style={styles.urgencyInfo}>
                    <Text style={[styles.urgencyLabel, { color: theme.text }]}>
                      {getText(option.label)}
                    </Text>
                    <Text style={[styles.urgencyDescription, { color: theme.textSecondary }]}>
                      {getText(config.description)}
                    </Text>
                  </View>
                  {isSelected && (
                    <Ionicons name="checkmark-circle" size={24} color={config.color} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Emergency Service Selection */}
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {isArabic ? 'نوع الخدمة الطارئة' : 'Emergency Service Type'}
          </Text>
          <Text style={[styles.sectionDescription, { color: theme.textSecondary }]}>
            {isArabic 
              ? 'اختر نوع الخدمة التي تحتاجها بشكل عاجل'
              : 'Select the type of emergency service you need'
            }
          </Text>
          
          <View style={styles.serviceGrid}>
            {EMERGENCY_SERVICES.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={[
                  styles.serviceCard,
                  selectedService?.id === service.id && { borderColor: service.color }
                ]}
                onPress={() => handleServiceSelect(service)}
              >
                <View style={[styles.serviceIcon, { backgroundColor: service.color }]}>
                  <Ionicons name={service.icon as any} size={24} color={COLORS.white} />
                </View>
                <Text style={[styles.serviceTitle, { color: theme.text }]}>
                  {getText(service.title)}
                </Text>
                <Text style={[styles.serviceDescription, { color: theme.textSecondary }]}>
                  {getText(service.description)}
                </Text>
                <View style={styles.serviceDetails}>
                  <View style={styles.serviceDetailItem}>
                    <Ionicons name="time-outline" size={14} color={theme.textSecondary} />
                    <Text style={[styles.serviceDetailText, { color: theme.textSecondary }]}>
                      {service.estimatedResponseTime} {isArabic ? 'دقيقة' : 'min'}
                    </Text>
                  </View>
                  <View style={styles.serviceDetailItem}>
                    <Ionicons name="cash-outline" size={14} color={theme.textSecondary} />
                    <Text style={[styles.serviceDetailText, { color: theme.textSecondary }]}>
                      SAR {service.basePrice.toLocaleString()}
                    </Text>
                  </View>
                </View>
                {selectedService?.id === service.id && (
                  <View style={styles.selectedIndicator}>
                    <Ionicons name="checkmark-circle" size={20} color={service.color} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Emergency Details Form */}
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {isArabic ? 'تفاصيل الطلب الطارئ' : 'Emergency Request Details'}
          </Text>
          
          <View style={styles.formGroup}>
            <Text style={[styles.inputLabel, { color: theme.text }]}>
              {isArabic ? 'عنوان المشكلة *' : 'Problem Title *'}
            </Text>
            <TextInput
              style={[styles.textInput, { 
                backgroundColor: theme.surface,
                color: theme.text,
                borderColor: theme.border 
              }]}
              value={formData.title}
              onChangeText={(value) => handleInputChange('title', value)}
              placeholder={isArabic ? 'وصف مختصر للمشكلة' : 'Brief description of the problem'}
              placeholderTextColor={theme.textSecondary}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.inputLabel, { color: theme.text }]}>
              {isArabic ? 'وصف مفصل للمشكلة *' : 'Detailed Problem Description *'}
            </Text>
            <TextInput
              style={[styles.textArea, { 
                backgroundColor: theme.surface,
                color: theme.text,
                borderColor: theme.border 
              }]}
              value={formData.description}
              onChangeText={(value) => handleInputChange('description', value)}
              placeholder={isArabic 
                ? 'اشرح المشكلة بالتفصيل، متى بدأت، وما هي الأعراض'
                : 'Explain the problem in detail, when it started, and what symptoms you observe'
              }
              placeholderTextColor={theme.textSecondary}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.inputLabel, { color: theme.text }]}>
              {isArabic ? 'موقع المشكلة *' : 'Problem Location *'}
            </Text>
            <TextInput
              style={[styles.textInput, { 
                backgroundColor: theme.surface,
                color: theme.text,
                borderColor: theme.border 
              }]}
              value={formData.location}
              onChangeText={(value) => handleInputChange('location', value)}
              placeholder={isArabic ? 'العنوان الكامل للموقع' : 'Full address of the location'}
              placeholderTextColor={theme.textSecondary}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.inputLabel, { color: theme.text }]}>
              {isArabic ? 'رقم الهاتف للاتصال' : 'Contact Phone Number'}
            </Text>
            <TextInput
              style={[styles.textInput, { 
                backgroundColor: theme.surface,
                color: theme.text,
                borderColor: theme.border 
              }]}
              value={formData.contactPhone}
              onChangeText={(value) => handleInputChange('contactPhone', value)}
              placeholder={isArabic ? '+966 50 123 4567' : '+966 50 123 4567'}
              placeholderTextColor={theme.textSecondary}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={[styles.inputLabel, { color: theme.text }]}>
              {isArabic ? 'ملاحظات إضافية' : 'Additional Notes'}
            </Text>
            <TextInput
              style={[styles.textArea, { 
                backgroundColor: theme.surface,
                color: theme.text,
                borderColor: theme.border 
              }]}
              value={formData.additionalNotes}
              onChangeText={(value) => handleInputChange('additionalNotes', value)}
              placeholder={isArabic 
                ? 'أي معلومات إضافية قد تساعد المهندس'
                : 'Any additional information that might help the engineer'
              }
              placeholderTextColor={theme.textSecondary}
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        {/* Emergency Pricing & Response Time */}
        {selectedService && (
          <View style={[styles.section, { backgroundColor: theme.card }]}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {isArabic ? 'معلومات الطوارئ' : 'Emergency Information'}
            </Text>
            
            <View style={styles.emergencyInfoGrid}>
              <View style={styles.emergencyInfoItem}>
                <Ionicons name="time" size={24} color={urgencyConfig.color} />
                <View style={styles.emergencyInfoContent}>
                  <Text style={[styles.emergencyInfoLabel, { color: theme.text }]}>
                    {isArabic ? 'وقت الاستجابة المتوقع' : 'Expected Response Time'}
                  </Text>
                  <Text style={[styles.emergencyInfoValue, { color: urgencyConfig.color }]}>
                    {calculateResponseTime()} {isArabic ? 'دقيقة' : 'minutes'}
                  </Text>
                </View>
              </View>
              
              <View style={styles.emergencyInfoItem}>
                <Ionicons name="cash" size={24} color={urgencyConfig.color} />
                <View style={styles.emergencyInfoContent}>
                  <Text style={[styles.emergencyInfoLabel, { color: theme.text }]}>
                    {isArabic ? 'التكلفة الطارئة' : 'Emergency Cost'}
                  </Text>
                  <Text style={[styles.emergencyInfoValue, { color: urgencyConfig.color }]}>
                    SAR {calculateEmergencyPrice().toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.emergencyWarning}>
              <Ionicons name="information-circle" size={20} color={COLORS.warning} />
              <Text style={[styles.emergencyWarningText, { color: theme.text }]}>
                {isArabic 
                  ? 'الرسوم الطارئة تشمل استجابة سريعة وخدمة على مدار الساعة. قد تختلف التكلفة النهائية حسب تعقيد المشكلة.'
                  : 'Emergency fees include rapid response and 24/7 service. Final cost may vary based on problem complexity.'
                }
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Emergency Action Buttons */}
      <View style={[styles.actionContainer, { backgroundColor: theme.surface }]}>
        <CustomButton
          title={isArabic ? 'إلغاء' : 'Cancel'}
          onPress={() => navigation.goBack()}
          variant="outline"
          style={styles.cancelButton}
        />
        <CustomButton
          title={isArabic ? 'إرسال الطلب الطارئ' : 'Submit Emergency Request'}
          onPress={handleSubmitEmergencyRequest}
          style={[styles.emergencyButton, { backgroundColor: urgencyConfig.color }]}
          disabled={!selectedService}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emergencyHeader: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  emergencyHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emergencyIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  emergencyHeaderInfo: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: TYPOGRAPHY.sizes.h5,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.white,
    marginBottom: 4,
  },
  emergencySubtitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    color: COLORS.white,
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    borderRadius: BORDER_RADIUS.md,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginBottom: 16,
    lineHeight: 20,
  },
  urgencyOptions: {
    gap: 12,
  },
  urgencyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  urgencyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  urgencyInfo: {
    flex: 1,
  },
  urgencyLabel: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: 4,
  },
  urgencyDescription: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  serviceCard: {
    width: (width - 64) / 2,
    padding: 16,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    position: 'relative',
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    textAlign: 'center',
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: TYPOGRAPHY.sizes.caption,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 16,
  },
  serviceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  serviceDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceDetailText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    marginLeft: 4,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  formGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: TYPOGRAPHY.sizes.body1,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.sm,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: TYPOGRAPHY.sizes.body1,
    textAlignVertical: 'top',
  },
  emergencyInfoGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  emergencyInfoItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surface,
  },
  emergencyInfoContent: {
    marginLeft: 12,
  },
  emergencyInfoLabel: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: 4,
  },
  emergencyInfoValue: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  emergencyWarning: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.warning + '20',
  },
  emergencyWarningText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  actionContainer: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
  },
  emergencyButton: {
    flex: 2,
    marginLeft: 8,
  },
});

export default EmergencyJobRequestScreen;
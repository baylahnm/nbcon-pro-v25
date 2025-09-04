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

import { RootState } from '../../store';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { Language } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SERVICE_CATEGORIES } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

type ServiceSpecializationNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'ServiceSpecialization'>;
type ServiceSpecializationRouteProp = RouteProp<AuthStackParamList, 'ServiceSpecialization'>;

interface Props {
  navigation: ServiceSpecializationNavigationProp;
  route: ServiceSpecializationRouteProp;
}

interface Specialization {
  id: string;
  name: { en: string; ar: string };
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  subcategories: { en: string[]; ar: string[] };
}

const ServiceSpecializationScreen: React.FC<Props> = ({ navigation, route }) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const { userInfo } = route.params;

  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<{ [key: string]: string[] }>({});
  const [isLoading, setIsLoading] = useState(false);

  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const specializations: Specialization[] = [
    {
      id: 'civil',
      name: { en: 'Civil Engineering', ar: 'الهندسة المدنية' },
      icon: 'business',
      color: COLORS.primary,
      subcategories: {
        en: ['Structural Design', 'Road Design', 'Bridge Design', 'Geotechnical', 'Water Resources', 'Transportation'],
        ar: ['التصميم الإنشائي', 'تصميم الطرق', 'تصميم الجسور', 'الجيوتقنية', 'الموارد المائية', 'النقل'],
      },
    },
    {
      id: 'mep',
      name: { en: 'MEP Engineering', ar: 'الهندسة الكهروميكانيكية' },
      icon: 'settings',
      color: COLORS.secondary,
      subcategories: {
        en: ['HVAC Systems', 'Electrical Design', 'Plumbing', 'Fire Safety', 'Low Voltage', 'Energy Management'],
        ar: ['أنظمة التكييف', 'التصميم الكهربائي', 'السباكة', 'الحماية من الحريق', 'الجهد المنخفض', 'إدارة الطاقة'],
      },
    },
    {
      id: 'architectural',
      name: { en: 'Architectural Engineering', ar: 'الهندسة المعمارية' },
      icon: 'home',
      color: COLORS.accent,
      subcategories: {
        en: ['Building Design', 'Interior Design', 'Landscape Design', '3D Modeling', 'Sustainable Design', 'Heritage Restoration'],
        ar: ['تصميم المباني', 'التصميم الداخلي', 'تصميم المناظر الطبيعية', 'النمذجة ثلاثية الأبعاد', 'التصميم المستدام', 'ترميم التراث'],
      },
    },
    {
      id: 'surveying',
      name: { en: 'Surveying & GIS', ar: 'المساحة ونظم المعلومات الجغرافية' },
      icon: 'map',
      color: '#9C27B0',
      subcategories: {
        en: ['Land Surveying', 'Topographic Survey', 'GIS Mapping', 'GPS Surveying', 'Drone Surveying', 'Cadastral Survey'],
        ar: ['مساحة الأراضي', 'المسح الطوبوغرافي', 'رسم الخرائط الجغرافية', 'مساحة GPS', 'مساحة الطائرات بدون طيار', 'المسح العقاري'],
      },
    },
    {
      id: 'safety',
      name: { en: 'Safety Engineering', ar: 'هندسة السلامة' },
      icon: 'shield-checkmark',
      color: '#FF5722',
      subcategories: {
        en: ['HSE Management', 'Risk Assessment', 'Safety Auditing', 'Emergency Planning', 'Occupational Safety', 'Environmental Safety'],
        ar: ['إدارة الصحة والسلامة والبيئة', 'تقييم المخاطر', 'تدقيق السلامة', 'التخطيط للطوارئ', 'السلامة المهنية', 'السلامة البيئية'],
      },
    },
    {
      id: 'project',
      name: { en: 'Project Management', ar: 'إدارة المشاريع' },
      icon: 'briefcase',
      color: '#607D8B',
      subcategories: {
        en: ['Construction Management', 'Planning & Scheduling', 'Cost Control', 'Quality Management', 'Contract Management', 'Site Supervision'],
        ar: ['إدارة الإنشاءات', 'التخطيط والجدولة', 'مراقبة التكاليف', 'إدارة الجودة', 'إدارة العقود', 'الإشراف على الموقع'],
      },
    },
  ];

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const getArray = (arrayObj: { en: string[]; ar: string[] }) => {
    return isArabic ? arrayObj.ar : arrayObj.en;
  };

  const toggleSpecialization = (id: string) => {
    if (selectedSpecializations.includes(id)) {
      setSelectedSpecializations(prev => prev.filter(item => item !== id));
      setSelectedSubcategories(prev => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    } else {
      setSelectedSpecializations(prev => [...prev, id]);
    }
  };

  const toggleSubcategory = (specializationId: string, subcategory: string) => {
    setSelectedSubcategories(prev => {
      const current = prev[specializationId] || [];
      if (current.includes(subcategory)) {
        return {
          ...prev,
          [specializationId]: current.filter(item => item !== subcategory),
        };
      } else {
        return {
          ...prev,
          [specializationId]: [...current, subcategory],
        };
      }
    });
  };

  const handleContinue = async () => {
    if (selectedSpecializations.length === 0) {
      Alert.alert(
        isArabic ? 'تخصص مطلوب' : 'Specialization Required',
        isArabic 
          ? 'يرجى اختيار تخصص واحد على الأقل'
          : 'Please select at least one specialization',
        [{ text: isArabic ? 'موافق' : 'OK' }]
      );
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call to save specializations
      await new Promise(resolve => setTimeout(resolve, 1500));

      const updatedUserInfo = {
        ...userInfo,
        specializations: selectedSpecializations,
        subcategories: selectedSubcategories,
      };

      navigation.navigate('ServiceArea', { userInfo: updatedUserInfo });
    } catch (error) {
      Alert.alert(
        isArabic ? 'خطأ' : 'Error',
        isArabic 
          ? 'حدث خطأ أثناء حفظ التخصصات. يرجى المحاولة مرة أخرى.'
          : 'Failed to save specializations. Please try again.',
        [{ text: isArabic ? 'موافق' : 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderSpecializationCard = (specialization: Specialization) => {
    const isSelected = selectedSpecializations.includes(specialization.id);
    const selectedSubs = selectedSubcategories[specialization.id] || [];

    return (
      <View key={specialization.id} style={styles.specializationCard}>
        <TouchableOpacity
          style={[
            styles.specializationHeader,
            { 
              backgroundColor: theme.surface,
              borderColor: isSelected ? specialization.color : theme.border,
            },
            isSelected && { borderWidth: 2 },
          ]}
          onPress={() => toggleSpecialization(specialization.id)}
        >
          <View style={[styles.iconContainer, { backgroundColor: specialization.color }]}>
            <Ionicons name={specialization.icon} size={24} color={COLORS.white} />
          </View>
          
          <View style={styles.specializationInfo}>
            <Text style={[styles.specializationName, { color: theme.text }]}>
              {getText(specialization.name)}
            </Text>
            <Text style={[styles.subcategoryCount, { color: theme.textSecondary }]}>
              {getArray(specialization.subcategories).length} {isArabic ? 'تخصصات فرعية' : 'subcategories'}
            </Text>
          </View>

          <Ionicons 
            name={isSelected ? 'checkmark-circle' : 'radio-button-off'} 
            size={24} 
            color={isSelected ? specialization.color : theme.textSecondary} 
          />
        </TouchableOpacity>

        {/* Subcategories */}
        {isSelected && (
          <View style={styles.subcategoriesContainer}>
            <Text style={[styles.subcategoriesTitle, { color: theme.text }]}>
              {isArabic ? 'اختر التخصصات الفرعية:' : 'Select subcategories:'}
            </Text>
            <View style={styles.subcategoriesList}>
              {getArray(specialization.subcategories).map((subcategory, index) => {
                const isSubSelected = selectedSubs.includes(subcategory);
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.subcategoryChip,
                      { 
                        backgroundColor: isSubSelected ? specialization.color : theme.surface,
                        borderColor: isSubSelected ? specialization.color : theme.border,
                      },
                    ]}
                    onPress={() => toggleSubcategory(specialization.id, subcategory)}
                  >
                    <Text
                      style={[
                        styles.subcategoryText,
                        { color: isSubSelected ? COLORS.white : theme.text },
                      ]}
                    >
                      {subcategory}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </View>
    );
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
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={[styles.headerIconContainer, { backgroundColor: COLORS.primary }]}>
              <Ionicons name="construct" size={40} color={COLORS.white} />
            </View>
            
            <Text style={[styles.title, { color: theme.text }]}>
              {isArabic ? 'التخصصات الهندسية' : 'Engineering Specializations'}
            </Text>
            
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              {isArabic 
                ? 'اختر تخصصاتك الهندسية لتظهر للعملاء المناسبين'
                : 'Select your engineering specializations to show to relevant clients'
              }
            </Text>
          </View>

          {/* Specializations List */}
          <View style={styles.specializationsList}>
            {specializations.map(renderSpecializationCard)}
          </View>

          {/* Selected Summary */}
          {selectedSpecializations.length > 0 && (
            <View style={[styles.summaryContainer, { backgroundColor: theme.surface }]}>
              <Text style={[styles.summaryTitle, { color: theme.text }]}>
                {isArabic ? 'التخصصات المختارة:' : 'Selected Specializations:'}
              </Text>
              <View style={styles.summaryList}>
                {selectedSpecializations.map(id => {
                  const spec = specializations.find(s => s.id === id);
                  if (!spec) return null;
                  const subCount = selectedSubcategories[id]?.length || 0;
                  return (
                    <Text key={id} style={[styles.summaryItem, { color: theme.textSecondary }]}>
                      • {getText(spec.name)} ({subCount} {isArabic ? 'فرعي' : 'subs'})
                    </Text>
                  );
                })}
              </View>
            </View>
          )}

          <CustomButton
            title={{ 
              en: 'Continue', 
              ar: 'متابعة' 
            }}
            onPress={handleContinue}
            loading={isLoading}
            disabled={selectedSpecializations.length === 0}
            icon="arrow-forward"
            fullWidth
            size="large"
            customStyle={styles.continueButton}
          />

          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '80%', backgroundColor: COLORS.primary }]} />
            </View>
            <Text style={[styles.progressText, { color: theme.textSecondary }]}>
              {isArabic ? '4 من 5' : '4 of 5'}
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
  headerIconContainer: {
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
  specializationsList: {
    gap: SPACING.lg,
  },
  specializationCard: {
    marginBottom: SPACING.md,
  },
  specializationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  specializationInfo: {
    flex: 1,
  },
  specializationName: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  subcategoryCount: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  subcategoriesContainer: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  subcategoriesTitle: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: SPACING.sm,
  },
  subcategoriesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  subcategoryChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
  },
  subcategoryText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  summaryContainer: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginVertical: SPACING.lg,
  },
  summaryTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle2,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.sm,
  },
  summaryList: {
    gap: SPACING.xs,
  },
  summaryItem: {
    fontSize: TYPOGRAPHY.sizes.body2,
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

export default ServiceSpecializationScreen;

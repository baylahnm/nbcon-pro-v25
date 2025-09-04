import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

interface ServiceRate {
  id: string;
  name: { en: string; ar: string };
  rate: string;
  marketAvg: number;
}

const RateSettingScreen = () => {
  const navigation = useNavigation();
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const [serviceRates, setServiceRates] = useState<ServiceRate[]>([
    {
      id: '1',
      name: { en: 'Site Inspection', ar: 'معاينة الموقع' },
      rate: '',
      marketAvg: 150,
    },
    {
      id: '2',
      name: { en: 'Technical Consultation', ar: 'استشارة تقنية' },
      rate: '',
      marketAvg: 200,
    },
    {
      id: '3',
      name: { en: 'Design Review', ar: 'مراجعة التصميم' },
      rate: '',
      marketAvg: 180,
    },
    {
      id: '4',
      name: { en: 'Project Management', ar: 'إدارة المشاريع' },
      rate: '',
      marketAvg: 250,
    },
    {
      id: '5',
      name: { en: 'Quality Assessment', ar: 'تقييم الجودة' },
      rate: '',
      marketAvg: 170,
    },
    {
      id: '6',
      name: { en: 'Structural Analysis', ar: 'التحليل الإنشائي' },
      rate: '',
      marketAvg: 220,
    },
    {
      id: '7',
      name: { en: 'Safety Audit', ar: 'مراجعة السلامة' },
      rate: '',
      marketAvg: 160,
    },
    {
      id: '8',
      name: { en: 'CAD Drawing', ar: 'رسم هندسي' },
      rate: '',
      marketAvg: 120,
    },
  ]);

  const [emergencyRate, setEmergencyRate] = useState(false);
  const [weekendRate, setWeekendRate] = useState(false);

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const updateServiceRate = (serviceId: string, rate: string) => {
    setServiceRates(prev => 
      prev.map(service => 
        service.id === serviceId 
          ? { ...service, rate } 
          : service
      )
    );
  };

  const useMarketAvg = (serviceId: string) => {
    setServiceRates(prev => 
      prev.map(service => 
        service.id === serviceId 
          ? { ...service, rate: service.marketAvg.toString() } 
          : service
      )
    );
  };

  const handleContinue = () => {
    // Navigate to next screen (Welcome & Tutorial - Page 18)
    navigation.navigate('WelcomeTutorial' as never);
  };

  const getCompletedRatesCount = () => {
    return serviceRates.filter(service => service.rate.trim() !== '').length;
  };

  const progressPercentage = Math.round((getCompletedRatesCount() / serviceRates.length) * 100);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
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
            {isArabic ? 'تحديد الأسعار' : 'Set Your Rates'}
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {isArabic 
              ? 'حدد أسعارك للخدمات المختلفة'
              : 'Set your hourly rates for different services'
            }
          </Text>
        </View>
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressInfo}>
          <Text style={[styles.progressText, { color: theme.text }]}>
            {isArabic ? 'الخطوة 5 من 5' : 'Step 5 of 5'}
          </Text>
          <Text style={[styles.progressPercentage, { color: COLORS.primary }]}>
            95%
          </Text>
        </View>
        <View style={[styles.progressBar, { backgroundColor: theme.border }]}>
          <View 
            style={[
              styles.progressFill, 
              { width: '95%', backgroundColor: COLORS.primary }
            ]} 
          />
        </View>
      </View>

      {/* Rate Setting Form */}
      <View style={styles.content}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {isArabic ? 'أسعار الخدمات (ريال/ساعة)' : 'Service Rates (SAR/Hour)'}
        </Text>

        {serviceRates.map((service) => (
          <View key={service.id} style={[styles.serviceCard, { backgroundColor: theme.surface }]}>
            <View style={styles.serviceHeader}>
              <Text style={[styles.serviceName, { color: theme.text }]}>
                {getText(service.name)}
              </Text>
              <TouchableOpacity 
                onPress={() => useMarketAvg(service.id)}
                style={styles.marketAvgButton}
              >
                <Text style={[styles.marketAvgText, { color: COLORS.primary }]}>
                  {isArabic ? `متوسط السوق: ${service.marketAvg}` : `Market Avg: ${service.marketAvg}`}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.rateInputContainer}>
              <TextInput
                style={[
                  styles.rateInput,
                  {
                    backgroundColor: theme.inputBackground,
                    borderColor: theme.border,
                    color: theme.text,
                    textAlign: isArabic ? 'right' : 'left',
                  }
                ]}
                value={service.rate}
                onChangeText={(text) => updateServiceRate(service.id, text)}
                placeholder={isArabic ? 'أدخل السعر' : 'Enter rate'}
                placeholderTextColor={theme.textSecondary}
                keyboardType="numeric"
              />
              <View style={styles.currencyLabel}>
                <Text style={[styles.currencyText, { color: theme.textSecondary }]}>
                  {isArabic ? 'ريال/ساعة' : 'SAR/hr'}
                </Text>
              </View>
            </View>
          </View>
        ))}

        {/* Premium Rate Modifiers */}
        <View style={styles.modifiersSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {isArabic ? 'معدلات إضافية' : 'Premium Rate Modifiers'}
          </Text>

          <View style={[styles.modifierCard, { backgroundColor: theme.surface }]}>
            <View style={styles.modifierInfo}>
              <Text style={[styles.modifierTitle, { color: theme.text }]}>
                {isArabic ? 'الحالات الطارئة' : 'Emergency Services'}
              </Text>
              <Text style={[styles.modifierDescription, { color: theme.textSecondary }]}>
                {isArabic ? 'زيادة 50% للخدمات الطارئة' : '+50% for emergency services'}
              </Text>
            </View>
            <Switch
              value={emergencyRate}
              onValueChange={setEmergencyRate}
              trackColor={{ false: theme.border, true: COLORS.primary + '40' }}
              thumbColor={emergencyRate ? COLORS.primary : theme.textSecondary}
            />
          </View>

          <View style={[styles.modifierCard, { backgroundColor: theme.surface }]}>
            <View style={styles.modifierInfo}>
              <Text style={[styles.modifierTitle, { color: theme.text }]}>
                {isArabic ? 'خدمات نهاية الأسبوع' : 'Weekend Services'}
              </Text>
              <Text style={[styles.modifierDescription, { color: theme.textSecondary }]}>
                {isArabic ? 'زيادة 25% لخدمات نهاية الأسبوع' : '+25% for weekend services'}
              </Text>
            </View>
            <Switch
              value={weekendRate}
              onValueChange={setWeekendRate}
              trackColor={{ false: theme.border, true: COLORS.primary + '40' }}
              thumbColor={weekendRate ? COLORS.primary : theme.textSecondary}
            />
          </View>
        </View>

        {/* Completion Summary */}
        <View style={[styles.summaryCard, { backgroundColor: theme.surface }]}>
          <View style={styles.summaryHeader}>
            <Ionicons 
              name="checkmark-circle" 
              size={24} 
              color={COLORS.success} 
            />
            <Text style={[styles.summaryTitle, { color: theme.text }]}>
              {isArabic ? 'ملخص الإعداد' : 'Setup Summary'}
            </Text>
          </View>
          
          <Text style={[styles.summaryText, { color: theme.textSecondary }]}>
            {isArabic 
              ? `تم تحديد ${getCompletedRatesCount()} من ${serviceRates.length} خدمة`
              : `${getCompletedRatesCount()} of ${serviceRates.length} services configured`
            }
          </Text>
          
          {emergencyRate && (
            <Text style={[styles.modifierActive, { color: COLORS.warning }]}>
              ✓ {isArabic ? 'معدل طارئ مفعل (+50%)' : 'Emergency rate active (+50%)'}
            </Text>
          )}
          
          {weekendRate && (
            <Text style={[styles.modifierActive, { color: COLORS.warning }]}>
              ✓ {isArabic ? 'معدل نهاية الأسبوع مفعل (+25%)' : 'Weekend rate active (+25%)'}
            </Text>
          )}
        </View>

        {/* Continue Button */}
        <CustomButton
          title={isArabic ? 'إكمال الإعداد' : 'Complete Setup'}
          onPress={handleContinue}
          style={styles.continueButton}
          disabled={getCompletedRatesCount() === 0}
        />

        <View style={styles.bottomSpacing} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
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
  progressContainer: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  progressText: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  progressPercentage: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  content: {
    paddingHorizontal: SPACING.lg,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.md,
    marginTop: SPACING.lg,
  },
  serviceCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  serviceName: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    flex: 1,
  },
  marketAvgButton: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    backgroundColor: COLORS.primary + '10',
    borderRadius: BORDER_RADIUS.sm,
  },
  marketAvgText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  rateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rateInput: {
    flex: 1,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.sm,
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  currencyLabel: {
    marginLeft: SPACING.sm,
    paddingHorizontal: SPACING.sm,
  },
  currencyText: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  modifiersSection: {
    marginTop: SPACING.lg,
  },
  modifierCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  modifierInfo: {
    flex: 1,
  },
  modifierTitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: SPACING.xs,
  },
  modifierDescription: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  summaryCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    marginTop: SPACING.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  summaryTitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginLeft: SPACING.sm,
  },
  summaryText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginBottom: SPACING.sm,
  },
  modifierActive: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginBottom: SPACING.xs,
  },
  continueButton: {
    marginTop: SPACING.xl,
  },
  bottomSpacing: {
    height: SPACING.xxl,
  },
});

export default RateSettingScreen;

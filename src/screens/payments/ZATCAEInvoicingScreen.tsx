import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  Animated,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import { ANIMATIONS } from '../../constants/animations';
import { createFadeInUp, createStaggeredFadeIn } from '../../utils/animations';
import CustomButton from '../../components/forms/CustomButton';
import { AnimatedCard } from '../../components/animated/AnimatedCard';

const { width } = Dimensions.get('window');

interface ZATCAInvoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerVATNumber?: string;
  amount: number;
  vatAmount: number;
  totalAmount: number;
  issueDate: Date;
  dueDate: Date;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  zatcaReference?: string;
  qrCode?: string;
  digitalSignature?: string;
  submissionDate?: Date;
  rejectionReason?: string;
}

interface ZATCASettings {
  companyVATNumber: string;
  companyName: string;
  companyAddress: string;
  certificatePath: string;
  privateKeyPath: string;
  environment: 'sandbox' | 'production';
  apiEndpoint: string;
}

const ZATCAEInvoicingScreen = () => {
  const navigation = useNavigation();
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  
  const [activeTab, setActiveTab] = useState<'invoices' | 'settings' | 'compliance'>('invoices');
  const [selectedInvoice, setSelectedInvoice] = useState<ZATCAInvoice | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const invoiceAnimations = useRef([0, 1, 2, 3, 4].map(() => new Animated.Value(0))).current;
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  // Initialize animations
  useEffect(() => {
    const initAnimations = Animated.parallel([
      createFadeInUp(fadeAnim, slideAnim, ANIMATIONS.DURATION.normal),
      createStaggeredFadeIn(invoiceAnimations, ANIMATIONS.DURATION.fast, 100),
    ]);
    
    initAnimations.start();
  }, []);

  // Mock data
  const zatcaSettings: ZATCASettings = {
    companyVATNumber: '300001234567890',
    companyName: 'NBCON Engineering Solutions',
    companyAddress: 'Riyadh, Saudi Arabia',
    certificatePath: '/certificates/zatca-cert.pem',
    privateKeyPath: '/certificates/zatca-key.pem',
    environment: 'production',
    apiEndpoint: 'https://gw-fatoora.zatca.sa'
  };

  const mockInvoices: ZATCAInvoice[] = [
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      customerName: 'NEOM Development Company',
      customerVATNumber: '300001234567891',
      amount: 50000,
      vatAmount: 7500,
      totalAmount: 57500,
      issueDate: new Date(2024, 1, 15),
      dueDate: new Date(2024, 2, 15),
      status: 'approved',
      zatcaReference: 'ZATCA-2024-001-A7B8C9',
      qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
      digitalSignature: 'SHA256withRSA:3045022100...',
      submissionDate: new Date(2024, 1, 15, 14, 30),
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      customerName: 'Riyadh Development Authority',
      customerVATNumber: '300001234567892',
      amount: 75000,
      vatAmount: 11250,
      totalAmount: 86250,
      issueDate: new Date(2024, 1, 20),
      dueDate: new Date(2024, 2, 20),
      status: 'submitted',
      submissionDate: new Date(2024, 1, 20, 10, 15),
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-003',
      customerName: 'Saudi Green Initiative',
      amount: 30000,
      vatAmount: 4500,
      totalAmount: 34500,
      issueDate: new Date(2024, 1, 25),
      dueDate: new Date(2024, 2, 25),
      status: 'draft',
    },
    {
      id: '4',
      invoiceNumber: 'INV-2024-004',
      customerName: 'Red Sea Development',
      customerVATNumber: '300001234567893',
      amount: 100000,
      vatAmount: 15000,
      totalAmount: 115000,
      issueDate: new Date(2024, 1, 10),
      dueDate: new Date(2024, 2, 10),
      status: 'rejected',
      rejectionReason: 'Invalid customer VAT number format',
      submissionDate: new Date(2024, 1, 10, 16, 45),
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return COLORS.success;
      case 'submitted':
        return COLORS.warning;
      case 'rejected':
        return COLORS.error;
      case 'draft':
        return theme.border;
      default:
        return theme.border;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return getText({ en: 'Approved by ZATCA', ar: 'معتمد من الزكاة والضريبة' });
      case 'submitted':
        return getText({ en: 'Submitted to ZATCA', ar: 'مُرسل للزكاة والضريبة' });
      case 'rejected':
        return getText({ en: 'Rejected by ZATCA', ar: 'مرفوض من الزكاة والضريبة' });
      case 'draft':
        return getText({ en: 'Draft', ar: 'مسودة' });
      default:
        return status;
    }
  };

  const handleSubmitToZATCA = async (invoice: ZATCAInvoice) => {
    if (invoice.status !== 'draft') return;

    setIsSubmitting(true);
    try {
      // Simulate ZATCA submission
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      Alert.alert(
        getText({ en: 'Success', ar: 'نجح' }),
        getText({ 
          en: `Invoice ${invoice.invoiceNumber} submitted to ZATCA successfully`, 
          ar: `تم إرسال الفاتورة ${invoice.invoiceNumber} للزكاة والضريبة بنجاح` 
        }),
        [{ text: getText({ en: 'OK', ar: 'موافق' }) }]
      );
    } catch (error) {
      Alert.alert(
        getText({ en: 'Error', ar: 'خطأ' }),
        getText({ 
          en: 'Failed to submit invoice to ZATCA', 
          ar: 'فشل في إرسال الفاتورة للزكاة والضريبة' 
        }),
        [{ text: getText({ en: 'OK', ar: 'موافق' }) }]
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderComplianceStatus = () => (
    <AnimatedCard delay={100} style={[styles.complianceCard, { backgroundColor: theme.surface }]}>
      <LinearGradient
        colors={['#1B7A3E15', '#1B7A3E25']}
        style={styles.complianceGradient}
      >
        <View style={styles.complianceHeader}>
          <View style={styles.zatcaLogo}>
            <Ionicons name="shield-checkmark" size={32} color={COLORS.success} />
          </View>
          <View style={styles.complianceInfo}>
            <Text style={[styles.complianceTitle, { color: theme.text }]}>
              {getText({ en: 'ZATCA Compliance Status', ar: 'حالة الامتثال لهيئة الزكاة والضريبة' })}
            </Text>
            <Text style={[styles.complianceSubtitle, { color: COLORS.success }]}>
              {getText({ en: 'Fully Compliant', ar: 'متوافق بالكامل' })}
            </Text>
          </View>
          <View style={[styles.complianceBadge, { backgroundColor: COLORS.success }]}>
            <Ionicons name="checkmark" size={20} color={COLORS.white} />
          </View>
        </View>

        <View style={styles.complianceStats}>
          <View style={styles.complianceStat}>
            <Text style={[styles.statNumber, { color: COLORS.success }]}>98.5%</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              {getText({ en: 'Success Rate', ar: 'معدل النجاح' })}
            </Text>
          </View>
          
          <View style={styles.complianceStat}>
            <Text style={[styles.statNumber, { color: COLORS.primary }]}>1,247</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              {getText({ en: 'Invoices Submitted', ar: 'الفواتير المُرسلة' })}
            </Text>
          </View>
          
          <View style={styles.complianceStat}>
            <Text style={[styles.statNumber, { color: COLORS.warning }]}>< 2min</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              {getText({ en: 'Avg Response', ar: 'متوسط الاستجابة' })}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </AnimatedCard>
  );

  const renderInvoiceCard = ({ invoice, index }: { invoice: ZATCAInvoice; index: number }) => (
    <Animated.View
      key={invoice.id}
      style={{
        opacity: invoiceAnimations[index] || 1,
        transform: [
          {
            translateY: invoiceAnimations[index]?.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            }) || 0,
          },
        ],
      }}
    >
      <TouchableOpacity
        style={[styles.invoiceCard, { backgroundColor: theme.surface }]}
        onPress={() => setSelectedInvoice(invoice)}
        activeOpacity={0.9}
      >
        <View style={styles.invoiceHeader}>
          <View style={styles.invoiceInfo}>
            <Text style={[styles.invoiceNumber, { color: theme.text }]}>
              {invoice.invoiceNumber}
            </Text>
            <Text style={[styles.customerName, { color: theme.textSecondary }]}>
              {invoice.customerName}
            </Text>
          </View>
          
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(invoice.status) }]}>
            <Text style={styles.statusText}>
              {getStatusText(invoice.status)}
            </Text>
          </View>
        </View>

        <View style={styles.invoiceDetails}>
          <View style={styles.invoiceRow}>
            <Ionicons name="cash" size={16} color={theme.textSecondary} />
            <Text style={[styles.invoiceText, { color: theme.textSecondary }]}>
              {invoice.totalAmount.toLocaleString()} SAR
            </Text>
          </View>
          
          <View style={styles.invoiceRow}>
            <Ionicons name="calendar" size={16} color={theme.textSecondary} />
            <Text style={[styles.invoiceText, { color: theme.textSecondary }]}>
              {invoice.issueDate.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
            </Text>
          </View>
          
          {invoice.zatcaReference && (
            <View style={styles.invoiceRow}>
              <Ionicons name="shield-checkmark" size={16} color={COLORS.success} />
              <Text style={[styles.invoiceText, { color: COLORS.success }]}>
                {invoice.zatcaReference}
              </Text>
            </View>
          )}
        </View>

        {invoice.status === 'draft' && (
          <CustomButton
            title={getText({ en: 'Submit to ZATCA', ar: 'إرسال للزكاة والضريبة' })}
            onPress={() => handleSubmitToZATCA(invoice)}
            loading={isSubmitting}
            icon="send"
            size="small"
            animationType="scale"
            style={styles.submitButton}
          />
        )}

        {invoice.status === 'rejected' && invoice.rejectionReason && (
          <View style={[styles.rejectionReason, { backgroundColor: COLORS.error + '15' }]}>
            <Ionicons name="warning" size={16} color={COLORS.error} />
            <Text style={[styles.rejectionText, { color: COLORS.error }]}>
              {invoice.rejectionReason}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );

  const renderSettingsTab = () => (
    <AnimatedCard delay={200} style={styles.settingsContent}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        {getText({ en: 'ZATCA Integration Settings', ar: 'إعدادات التكامل مع الزكاة والضريبة' })}
      </Text>

      <View style={styles.settingGroup}>
        <Text style={[styles.settingLabel, { color: theme.text }]}>
          {getText({ en: 'Company VAT Number', ar: 'رقم ضريبة القيمة المضافة للشركة' })}
        </Text>
        <TextInput
          style={[styles.settingInput, { backgroundColor: theme.inputBackground, color: theme.text }]}
          value={zatcaSettings.companyVATNumber}
          placeholder="300001234567890"
          editable={false}
        />
      </View>

      <View style={styles.settingGroup}>
        <Text style={[styles.settingLabel, { color: theme.text }]}>
          {getText({ en: 'Environment', ar: 'البيئة' })}
        </Text>
        <View style={styles.environmentSelector}>
          <TouchableOpacity
            style={[
              styles.environmentOption,
              {
                backgroundColor: zatcaSettings.environment === 'sandbox' ? COLORS.primary : theme.border + '20',
              },
            ]}
          >
            <Text
              style={[
                styles.environmentText,
                { color: zatcaSettings.environment === 'sandbox' ? COLORS.white : theme.text },
              ]}
            >
              {getText({ en: 'Sandbox', ar: 'بيئة التجريب' })}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.environmentOption,
              {
                backgroundColor: zatcaSettings.environment === 'production' ? COLORS.success : theme.border + '20',
              },
            ]}
          >
            <Text
              style={[
                styles.environmentText,
                { color: zatcaSettings.environment === 'production' ? COLORS.white : theme.text },
              ]}
            >
              {getText({ en: 'Production', ar: 'بيئة الإنتاج' })}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.settingGroup}>
        <Text style={[styles.settingLabel, { color: theme.text }]}>
          {getText({ en: 'API Endpoint', ar: 'نقطة نهاية API' })}
        </Text>
        <TextInput
          style={[styles.settingInput, { backgroundColor: theme.inputBackground, color: theme.text }]}
          value={zatcaSettings.apiEndpoint}
          editable={false}
        />
      </View>

      <View style={styles.certificateSection}>
        <Text style={[styles.sectionSubtitle, { color: theme.text }]}>
          {getText({ en: 'Digital Certificates', ar: 'الشهادات الرقمية' })}
        </Text>
        
        <TouchableOpacity style={[styles.certificateCard, { backgroundColor: theme.border + '10' }]}>
          <Ionicons name="document" size={24} color={COLORS.primary} />
          <View style={styles.certificateInfo}>
            <Text style={[styles.certificateTitle, { color: theme.text }]}>
              {getText({ en: 'ZATCA Certificate', ar: 'شهادة الزكاة والضريبة' })}
            </Text>
            <Text style={[styles.certificateStatus, { color: COLORS.success }]}>
              {getText({ en: 'Valid until Dec 2025', ar: 'صالح حتى ديسمبر 2025' })}
            </Text>
          </View>
          <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
        </TouchableOpacity>
      </View>

      <CustomButton
        title={getText({ en: 'Test Connection', ar: 'اختبار الاتصال' })}
        onPress={() => Alert.alert('Test', 'Testing ZATCA connection...')}
        icon="flash"
        animationType="scale"
        style={styles.testButton}
      />
    </AnimatedCard>
  );

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1a1a1a', '#2d2d2d'] : ['#f8f9fa', '#ffffff']}
      style={styles.container}
    >
      {/* Header */}
      <Animated.View style={[
        styles.header,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}>
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
            {getText({ en: 'ZATCA E-Invoicing', ar: 'الفوترة الإلكترونية - الزكاة والضريبة' })}
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {getText({ 
              en: 'Saudi E-Invoicing Compliance System', 
              ar: 'نظام الامتثال للفوترة الإلكترونية السعودي' 
            })}
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.helpButton}
          onPress={() => Alert.alert('Help', 'ZATCA E-Invoicing help documentation')}
        >
          <Ionicons name="help-circle" size={24} color={theme.text} />
        </TouchableOpacity>
      </Animated.View>

      {/* Compliance Status */}
      {renderComplianceStatus()}

      {/* Tabs */}
      <AnimatedCard delay={150} style={styles.tabContainer}>
        <View style={styles.tabs}>
          {([
            { id: 'invoices', title: { en: 'Invoices', ar: 'الفواتير' }, icon: 'receipt' },
            { id: 'settings', title: { en: 'Settings', ar: 'الإعدادات' }, icon: 'settings' },
            { id: 'compliance', title: { en: 'Compliance', ar: 'الامتثال' }, icon: 'shield-checkmark' },
          ] as const).map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                {
                  backgroundColor: activeTab === tab.id ? COLORS.primary : 'transparent',
                },
              ]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Ionicons 
                name={tab.icon as any} 
                size={20} 
                color={activeTab === tab.id ? COLORS.white : theme.textSecondary} 
              />
              <Text
                style={[
                  styles.tabText,
                  {
                    color: activeTab === tab.id ? COLORS.white : theme.textSecondary,
                  },
                ]}
              >
                {getText(tab.title)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </AnimatedCard>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'invoices' && (
          <View style={styles.invoicesContent}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {getText({ en: 'E-Invoices Management', ar: 'إدارة الفواتير الإلكترونية' })}
            </Text>
            
            {mockInvoices.map((invoice, index) => renderInvoiceCard({ invoice, index }))}
          </View>
        )}

        {activeTab === 'settings' && renderSettingsTab()}

        {activeTab === 'compliance' && (
          <AnimatedCard delay={200} style={styles.complianceContent}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {getText({ en: 'Compliance Reports', ar: 'تقارير الامتثال' })}
            </Text>
            
            <View style={styles.complianceReports}>
              <TouchableOpacity style={[styles.reportCard, { backgroundColor: theme.surface }]}>
                <Ionicons name="document-text" size={24} color={COLORS.primary} />
                <Text style={[styles.reportTitle, { color: theme.text }]}>
                  {getText({ en: 'Monthly Report', ar: 'التقرير الشهري' })}
                </Text>
                <Text style={[styles.reportDate, { color: theme.textSecondary }]}>
                  {getText({ en: 'February 2024', ar: 'فبراير 2024' })}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.reportCard, { backgroundColor: theme.surface }]}>
                <Ionicons name="analytics" size={24} color={COLORS.secondary} />
                <Text style={[styles.reportTitle, { color: theme.text }]}>
                  {getText({ en: 'Audit Trail', ar: 'مسار التدقيق' })}
                </Text>
                <Text style={[styles.reportDate, { color: theme.textSecondary }]}>
                  {getText({ en: 'Last 30 days', ar: 'آخر 30 يوماً' })}
                </Text>
              </TouchableOpacity>
            </View>
          </AnimatedCard>
        )}
      </ScrollView>
    </LinearGradient>
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
    paddingBottom: SPACING.md,
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
  helpButton: {
    padding: SPACING.sm,
  },
  complianceCard: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
  },
  complianceGradient: {
    padding: SPACING.lg,
  },
  complianceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  zatcaLogo: {
    marginRight: SPACING.md,
  },
  complianceInfo: {
    flex: 1,
  },
  complianceTitle: {
    fontSize: TYPOGRAPHY.sizes.h4,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  complianceSubtitle: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  complianceBadge: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  complianceStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  complianceStat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.sizes.caption,
    textAlign: 'center',
  },
  tabContainer: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.xs,
  },
  tabText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  content: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.h4,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.lg,
  },
  invoicesContent: {
    flex: 1,
  },
  invoiceCard: {
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  invoiceInfo: {
    flex: 1,
  },
  invoiceNumber: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  customerName: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  statusText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  invoiceDetails: {
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  invoiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  invoiceText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: SPACING.sm,
  },
  submitButton: {
    marginTop: SPACING.sm,
  },
  rejectionReason: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    marginTop: SPACING.sm,
  },
  rejectionText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginLeft: SPACING.sm,
    flex: 1,
  },
  settingsContent: {
    flex: 1,
  },
  settingGroup: {
    marginBottom: SPACING.lg,
  },
  settingLabel: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: SPACING.sm,
  },
  settingInput: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    fontSize: TYPOGRAPHY.sizes.body1,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  environmentSelector: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  environmentOption: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
  },
  environmentText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  sectionSubtitle: {
    fontSize: TYPOGRAPHY.sizes.h5,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.md,
  },
  certificateSection: {
    marginVertical: SPACING.lg,
  },
  certificateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
  },
  certificateInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  certificateTitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: SPACING.xs,
  },
  certificateStatus: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  testButton: {
    marginTop: SPACING.lg,
  },
  complianceContent: {
    flex: 1,
  },
  complianceReports: {
    gap: SPACING.md,
  },
  reportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
  },
  reportTitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginLeft: SPACING.md,
    flex: 1,
  },
  reportDate: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
});

export default ZATCAEInvoicingScreen;
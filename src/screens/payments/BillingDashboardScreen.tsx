import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

interface Props {
  onViewPaymentHistory?: () => void;
  onManagePaymentMethods?: () => void;
  onViewInvoice?: (invoiceId: string) => void;
  onPayInvoice?: (invoiceId: string) => void;
  onDownloadReport?: () => void;
  onBack?: () => void;
}

const { width } = Dimensions.get('window');

const DASHBOARD_DATA = {
  currentBalance: 12500,
  pendingPayments: 8750,
  monthlySpending: 25000,
  totalEarnings: 185000,
  thisMonthTransactions: 23,
  lastMonthTransactions: 18,
  averageTransactionValue: 1087,
};

const RECENT_INVOICES = [
  {
    id: 'INV-2024-001',
    clientName: { en: 'Ahmed Al-Rashid', ar: 'أحمد الراشد' },
    projectName: { en: 'Structural Analysis - Tower A', ar: 'التحليل الإنشائي - البرج أ' },
    amount: 25000,
    status: 'paid',
    dueDate: '2024-01-20',
    paidDate: '2024-01-18',
    paymentMethod: 'mada Card',
  },
  {
    id: 'INV-2024-002',
    clientName: { en: 'Royal Development', ar: 'التطوير الملكي' },
    projectName: { en: 'Electrical Design - Phase 2', ar: 'التصميم الكهربائي - المرحلة 2' },
    amount: 18500,
    status: 'overdue',
    dueDate: '2024-01-15',
    daysPastDue: 8,
  },
  {
    id: 'INV-2024-003',
    clientName: { en: 'Saudi Construction Co.', ar: 'شركة البناء السعودية' },
    projectName: { en: 'HVAC System Design', ar: 'تصميم نظام التكييف' },
    amount: 32000,
    status: 'pending',
    dueDate: '2024-01-25',
    sentDate: '2024-01-10',
  },
];

const SPENDING_CATEGORIES = [
  { name: { en: 'Project Payments', ar: 'مدفوعات المشاريع' }, amount: 15000, color: COLORS.primary, percentage: 60 },
  { name: { en: 'Platform Fees', ar: 'رسوم المنصة' }, amount: 3750, color: COLORS.warning, percentage: 15 },
  { name: { en: 'Subscriptions', ar: 'الاشتراكات' }, amount: 2500, color: COLORS.info, percentage: 10 },
  { name: { en: 'Other', ar: 'أخرى' }, amount: 3750, color: COLORS.success, percentage: 15 },
];

const BillingDashboardScreen: React.FC<Props> = ({
  onViewPaymentHistory,
  onManagePaymentMethods,
  onViewInvoice,
  onPayInvoice,
  onDownloadReport,
  onBack,
}) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const formatAmount = (amount: number) => {
    return isArabic ? 
      `${amount.toLocaleString()} ريال` : 
      `${amount.toLocaleString()} SAR`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return COLORS.success;
      case 'pending': return COLORS.warning;
      case 'overdue': return COLORS.error;
      default: return theme.textSecondary;
    }
  };

  const renderStatCard = (title: string, value: string, icon: string, color: string, trend?: { value: number; isUp: boolean }) => (
    <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
      <View style={styles.statHeader}>
        <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
          <Ionicons name={icon as any} size={24} color={color} />
        </View>
        {trend && (
          <View style={styles.trendContainer}>
            <Ionicons 
              name={trend.isUp ? 'trending-up' : 'trending-down'} 
              size={16} 
              color={trend.isUp ? COLORS.success : COLORS.error} 
            />
            <Text style={[
              styles.trendText, 
              { color: trend.isUp ? COLORS.success : COLORS.error }
            ]}>
              {trend.value}%
            </Text>
          </View>
        )}
      </View>
      
      <Text style={[styles.statValue, { color: theme.text }]}>
        {value}
      </Text>
      
      <Text style={[styles.statTitle, { color: theme.textSecondary }]}>
        {title}
      </Text>
    </View>
  );

  const renderInvoiceCard = (invoice) => (
    <TouchableOpacity
      key={invoice.id}
      style={[styles.invoiceCard, { backgroundColor: theme.surface }]}
      onPress={() => onViewInvoice?.(invoice.id)}
    >
      <View style={styles.invoiceHeader}>
        <View style={styles.invoiceInfo}>
          <Text style={[styles.invoiceId, { color: theme.textSecondary }]}>
            {invoice.id}
          </Text>
          <Text style={[styles.invoiceClient, { color: theme.text }]}>
            {getText(invoice.clientName)}
          </Text>
          <Text style={[styles.invoiceProject, { color: theme.textSecondary }]} numberOfLines={1}>
            {getText(invoice.projectName)}
          </Text>
        </View>

        <View style={styles.invoiceAmount}>
          <Text style={[styles.amountText, { color: theme.text }]}>
            {formatAmount(invoice.amount)}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(invoice.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(invoice.status) }]}>
              {getText({
                en: invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1),
                ar: invoice.status === 'paid' ? 'مدفوع' : 
                    invoice.status === 'pending' ? 'معلق' : 
                    invoice.status === 'overdue' ? 'متأخر' : invoice.status
              })}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.invoiceFooter}>
        <View style={styles.invoiceDates}>
          {invoice.status === 'paid' && (
            <Text style={[styles.dateText, { color: COLORS.success }]}>
              {getText({ en: 'Paid:', ar: 'دُفع:' })} {invoice.paidDate}
            </Text>
          )}
          {invoice.status === 'overdue' && (
            <Text style={[styles.dateText, { color: COLORS.error }]}>
              {getText({ en: 'Overdue by', ar: 'متأخر بـ' })} {invoice.daysPastDue} {getText({ en: 'days', ar: 'يوم' })}
            </Text>
          )}
          {invoice.status === 'pending' && (
            <Text style={[styles.dateText, { color: COLORS.warning }]}>
              {getText({ en: 'Due:', ar: 'مستحق:' })} {invoice.dueDate}
            </Text>
          )}
        </View>

        {(invoice.status === 'pending' || invoice.status === 'overdue') && (
          <TouchableOpacity
            style={[styles.payButton, { backgroundColor: COLORS.primary + '20' }]}
            onPress={() => onPayInvoice?.(invoice.id)}
          >
            <Text style={[styles.payButtonText, { color: COLORS.primary }]}>
              {getText({ en: 'Pay Now', ar: 'ادفع الآن' })}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1a1a1a', '#2d2d2d'] : ['#f8f9fa', '#ffffff']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={theme.text} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: theme.text }]}>
              {getText({ en: 'Billing Dashboard', ar: 'لوحة الفوترة' })}
            </Text>
            <TouchableOpacity onPress={onDownloadReport} style={styles.reportButton}>
              <Ionicons name="document-text" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
            {getText({
              en: 'Manage your payments, invoices, and financial overview',
              ar: 'إدارة مدفوعاتك وفواتيرك ونظرتك المالية العامة'
            })}
          </Text>
        </View>

        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {['week', 'month', 'year'].map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                { backgroundColor: theme.surface },
                selectedPeriod === period && { 
                  backgroundColor: COLORS.primary + '20',
                  borderColor: COLORS.primary 
                }
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text style={[
                styles.periodButtonText, 
                { color: theme.text },
                selectedPeriod === period && { color: COLORS.primary }
              ]}>
                {getText({
                  en: period.charAt(0).toUpperCase() + period.slice(1),
                  ar: period === 'week' ? 'أسبوع' : period === 'month' ? 'شهر' : 'سنة'
                })}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {renderStatCard(
            getText({ en: 'Current Balance', ar: 'الرصيد الحالي' }),
            formatAmount(DASHBOARD_DATA.currentBalance),
            'wallet',
            COLORS.primary,
            { value: 8.5, isUp: true }
          )}
          
          {renderStatCard(
            getText({ en: 'Pending Payments', ar: 'المدفوعات المعلقة' }),
            formatAmount(DASHBOARD_DATA.pendingPayments),
            'time',
            COLORS.warning,
            { value: 12.3, isUp: false }
          )}

          {renderStatCard(
            getText({ en: 'Monthly Spending', ar: 'الإنفاق الشهري' }),
            formatAmount(DASHBOARD_DATA.monthlySpending),
            'card',
            COLORS.error,
            { value: 5.2, isUp: true }
          )}

          {renderStatCard(
            getText({ en: 'Total Earnings', ar: 'إجمالي الأرباح' }),
            formatAmount(DASHBOARD_DATA.totalEarnings),
            'trending-up',
            COLORS.success,
            { value: 15.7, isUp: true }
          )}
        </View>

        {/* Quick Actions */}
        <View style={[styles.quickActionsCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {getText({ en: 'Quick Actions', ar: 'إجراءات سريعة' })}
          </Text>
          
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.quickAction}
              onPress={onViewPaymentHistory}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: COLORS.info + '20' }]}>
                <Ionicons name="receipt" size={24} color={COLORS.info} />
              </View>
              <Text style={[styles.quickActionText, { color: theme.text }]}>
                {getText({ en: 'Payment History', ar: 'سجل المدفوعات' })}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickAction}
              onPress={onManagePaymentMethods}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: COLORS.primary + '20' }]}>
                <Ionicons name="card" size={24} color={COLORS.primary} />
              </View>
              <Text style={[styles.quickActionText, { color: theme.text }]}>
                {getText({ en: 'Payment Methods', ar: 'وسائل الدفع' })}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAction}>
              <View style={[styles.quickActionIcon, { backgroundColor: COLORS.success + '20' }]}>
                <Ionicons name="analytics" size={24} color={COLORS.success} />
              </View>
              <Text style={[styles.quickActionText, { color: theme.text }]}>
                {getText({ en: 'Reports', ar: 'التقارير' })}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAction}>
              <View style={[styles.quickActionIcon, { backgroundColor: COLORS.warning + '20' }]}>
                <Ionicons name="settings" size={24} color={COLORS.warning} />
              </View>
              <Text style={[styles.quickActionText, { color: theme.text }]}>
                {getText({ en: 'Billing Settings', ar: 'إعدادات الفوترة' })}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Spending Breakdown */}
        <View style={[styles.spendingCard, { backgroundColor: theme.surface }]}>
          <View style={styles.spendingHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {getText({ en: 'Spending Breakdown', ar: 'تفصيل الإنفاق' })}
            </Text>
            <Text style={[styles.spendingTotal, { color: COLORS.primary }]}>
              {formatAmount(25000)}
            </Text>
          </View>

          <View style={styles.spendingList}>
            {SPENDING_CATEGORIES.map((category, index) => (
              <View key={index} style={styles.spendingItem}>
                <View style={styles.spendingItemHeader}>
                  <View style={styles.spendingCategory}>
                    <View style={[styles.categoryDot, { backgroundColor: category.color }]} />
                    <Text style={[styles.categoryName, { color: theme.text }]}>
                      {getText(category.name)}
                    </Text>
                  </View>
                  <Text style={[styles.categoryAmount, { color: theme.text }]}>
                    {formatAmount(category.amount)}
                  </Text>
                </View>
                
                <View style={[styles.progressBar, { backgroundColor: theme.inputBackground }]}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        backgroundColor: category.color,
                        width: `${category.percentage}%`
                      }
                    ]} 
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Invoices */}
        <View style={styles.invoicesSection}>
          <View style={styles.invoicesHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {getText({ en: 'Recent Invoices', ar: 'الفواتير الأخيرة' })}
            </Text>
            <TouchableOpacity>
              <Text style={[styles.viewAllText, { color: COLORS.primary }]}>
                {getText({ en: 'View All', ar: 'عرض الكل' })}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.invoicesList}>
            {RECENT_INVOICES.map(renderInvoiceCard)}
          </View>
        </View>

        {/* Financial Summary */}
        <View style={[styles.summaryCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {getText({ en: 'Financial Summary', ar: 'الملخص المالي' })}
          </Text>
          
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
                {getText({ en: 'This Month', ar: 'هذا الشهر' })}
              </Text>
              <Text style={[styles.summaryValue, { color: COLORS.primary }]}>
                {DASHBOARD_DATA.thisMonthTransactions} {getText({ en: 'transactions', ar: 'معاملة' })}
              </Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
                {getText({ en: 'Last Month', ar: 'الشهر الماضي' })}
              </Text>
              <Text style={[styles.summaryValue, { color: theme.text }]}>
                {DASHBOARD_DATA.lastMonthTransactions} {getText({ en: 'transactions', ar: 'معاملة' })}
              </Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
                {getText({ en: 'Avg. Transaction', ar: 'متوسط المعاملة' })}
              </Text>
              <Text style={[styles.summaryValue, { color: COLORS.success }]}>
                {formatAmount(DASHBOARD_DATA.averageTransactionValue)}
              </Text>
            </View>
          </View>
        </View>

        {/* Export & Download */}
        <View style={styles.exportSection}>
          <CustomButton
            title={getText({ en: 'Download Monthly Report', ar: 'تحميل التقرير الشهري' })}
            onPress={onDownloadReport}
            icon="download"
            size="large"
            fullWidth
            customStyle={styles.downloadButton}
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
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  backButton: {
    padding: SPACING.sm,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.sizes.h1,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  reportButton: {
    padding: SPACING.sm,
  },
  headerSubtitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    textAlign: 'center',
    lineHeight: 22,
  },
  periodSelector: {
    flexDirection: 'row',
    marginBottom: SPACING.xl,
    gap: SPACING.sm,
  },
  periodButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  periodButtonText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  statCard: {
    width: (width - SPACING.lg * 2 - SPACING.md) / 2,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  trendText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  statValue: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  statTitle: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  quickActionsCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.xl,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.h2,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.lg,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  quickAction: {
    width: (width - SPACING.lg * 2 - SPACING.lg * 2 - SPACING.md) / 2,
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  quickActionText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    textAlign: 'center',
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  spendingCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.xl,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  spendingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  spendingTotal: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  spendingList: {
    gap: SPACING.lg,
  },
  spendingItem: {
    gap: SPACING.sm,
  },
  spendingItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spendingCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  categoryName: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  categoryAmount: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  invoicesSection: {
    marginBottom: SPACING.xl,
  },
  invoicesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  viewAllText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  invoicesList: {
    gap: SPACING.md,
  },
  invoiceCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  invoiceInfo: {
    flex: 1,
    marginRight: SPACING.md,
  },
  invoiceId: {
    fontSize: TYPOGRAPHY.sizes.caption,
    marginBottom: SPACING.xs,
    fontFamily: 'monospace',
  },
  invoiceClient: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  invoiceProject: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  invoiceAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.sm,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  statusText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  invoiceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.light.border,
  },
  invoiceDates: {
    flex: 1,
  },
  dateText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  payButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  },
  payButtonText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  summaryCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.xl,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginBottom: SPACING.xs,
  },
  summaryValue: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  exportSection: {
    marginBottom: SPACING.lg,
  },
  downloadButton: {
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
});

export default BillingDashboardScreen;
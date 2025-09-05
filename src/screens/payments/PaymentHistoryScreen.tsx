import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

interface Props {
  onViewTransaction?: (transactionId: string) => void;
  onDownloadReceipt?: (transactionId: string) => void;
  onRequestRefund?: (transactionId: string) => void;
  onBack?: () => void;
}

const SAMPLE_TRANSACTIONS = [
  {
    id: 'TXN-2024-001234',
    type: 'payment',
    status: 'completed',
    amount: 25000,
    currency: 'SAR',
    description: { en: 'Payment to Ahmed Al-Rashid - Structural Analysis', ar: 'دفعة لأحمد الراشد - تحليل إنشائي' },
    recipient: { en: 'Ahmed Al-Rashid', ar: 'أحمد الراشد' },
    paymentMethod: 'mada Card •••• 4521',
    date: '2024-01-20',
    time: '14:30',
    reference: 'REF-STR-2024-001',
    fees: 125,
    hasReceipt: true,
    canRefund: true,
  },
  {
    id: 'TXN-2024-001233',
    type: 'refund',
    status: 'completed',
    amount: 5000,
    currency: 'SAR',
    description: { en: 'Refund - Cancelled Project Consultation', ar: 'استرداد - إلغاء استشارة مشروع' },
    recipient: { en: 'Your Account', ar: 'حسابك' },
    paymentMethod: 'mada Card •••• 4521',
    date: '2024-01-18',
    time: '09:15',
    reference: 'REF-RFD-2024-002',
    fees: 0,
    hasReceipt: true,
    canRefund: false,
  },
  {
    id: 'TXN-2024-001232',
    type: 'payment',
    status: 'pending',
    amount: 15000,
    currency: 'SAR',
    description: { en: 'Payment to Sara Al-Mahmoud - Electrical Design', ar: 'دفعة لسارة المحمود - تصميم كهربائي' },
    recipient: { en: 'Sara Al-Mahmoud', ar: 'سارة المحمود' },
    paymentMethod: 'STC Pay +966 55 123 4567',
    date: '2024-01-19',
    time: '16:45',
    reference: 'REF-ELE-2024-003',
    fees: 75,
    hasReceipt: false,
    canRefund: true,
  },
  {
    id: 'TXN-2024-001231',
    type: 'payment',
    status: 'failed',
    amount: 8000,
    currency: 'SAR',
    description: { en: 'Payment to Mohammed Al-Otaibi - HVAC Consultation', ar: 'دفعة لمحمد العتيبي - استشارة تكييف' },
    recipient: { en: 'Mohammed Al-Otaibi', ar: 'محمد العتيبي' },
    paymentMethod: 'Visa Card •••• 8943',
    date: '2024-01-17',
    time: '11:20',
    reference: 'REF-HVC-2024-004',
    fees: 40,
    hasReceipt: false,
    canRefund: false,
  },
  {
    id: 'TXN-2024-001230',
    type: 'payment',
    status: 'completed',
    amount: 45000,
    currency: 'SAR',
    description: { en: 'Payment to Royal Design Studio - Architectural Plans', ar: 'دفعة لاستوديو التصميم الملكي - مخططات معمارية' },
    recipient: { en: 'Royal Design Studio', ar: 'استوديو التصميم الملكي' },
    paymentMethod: 'Apple Pay',
    date: '2024-01-15',
    time: '13:00',
    reference: 'REF-ARC-2024-005',
    fees: 225,
    hasReceipt: true,
    canRefund: false,
  },
];

const FILTER_OPTIONS = [
  { id: 'all', name: { en: 'All Transactions', ar: 'جميع المعاملات' } },
  { id: 'completed', name: { en: 'Completed', ar: 'مكتملة' } },
  { id: 'pending', name: { en: 'Pending', ar: 'معلقة' } },
  { id: 'failed', name: { en: 'Failed', ar: 'فاشلة' } },
  { id: 'refunds', name: { en: 'Refunds', ar: 'مستردة' } },
];

const PaymentHistoryScreen: React.FC<Props> = ({
  onViewTransaction,
  onDownloadReceipt,
  onRequestRefund,
  onBack,
}) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [transactions, setTransactions] = useState(SAMPLE_TRANSACTIONS);
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const formatAmount = (amount: number, currency: string) => {
    return isArabic ? 
      `${amount.toLocaleString()} ريال` : 
      `${amount.toLocaleString()} ${currency}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return COLORS.success;
      case 'pending': return COLORS.warning;
      case 'failed': return COLORS.error;
      default: return theme.textSecondary;
    }
  };

  const getStatusIcon = (status: string, type: string) => {
    if (type === 'refund') return 'arrow-down-circle';
    switch (status) {
      case 'completed': return 'checkmark-circle';
      case 'pending': return 'time';
      case 'failed': return 'close-circle';
      default: return 'help-circle';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'payment': return 'arrow-up-circle';
      case 'refund': return 'arrow-down-circle';
      default: return 'swap-horizontal';
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'refunds') return transaction.type === 'refund';
    return transaction.status === selectedFilter;
  });

  const totalSpent = transactions
    .filter(t => t.type === 'payment' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalRefunds = transactions
    .filter(t => t.type === 'refund' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const renderTransactionCard = ({ item: transaction }) => (
    <TouchableOpacity
      style={[styles.transactionCard, { backgroundColor: theme.surface }]}
      onPress={() => onViewTransaction?.(transaction.id)}
    >
      {/* Transaction Header */}
      <View style={styles.transactionHeader}>
        <View style={styles.transactionIcon}>
          <View style={[styles.iconBackground, { 
            backgroundColor: transaction.type === 'refund' ? COLORS.info + '20' : COLORS.primary + '20' 
          }]}>
            <Ionicons 
              name={getTypeIcon(transaction.type) as any} 
              size={24} 
              color={transaction.type === 'refund' ? COLORS.info : COLORS.primary} 
            />
          </View>
        </View>

        <View style={styles.transactionInfo}>
          <Text style={[styles.transactionDescription, { color: theme.text }]} numberOfLines={2}>
            {getText(transaction.description)}
          </Text>
          <Text style={[styles.transactionRecipient, { color: theme.textSecondary }]}>
            {getText({ en: 'To:', ar: 'إلى:' })} {getText(transaction.recipient)}
          </Text>
        </View>

        <View style={styles.transactionAmount}>
          <Text style={[
            styles.amountText, 
            { color: transaction.type === 'refund' ? COLORS.success : theme.text }
          ]}>
            {transaction.type === 'refund' ? '+' : '-'}{formatAmount(transaction.amount, transaction.currency)}
          </Text>
          <View style={styles.statusContainer}>
            <Ionicons 
              name={getStatusIcon(transaction.status, transaction.type) as any} 
              size={16} 
              color={getStatusColor(transaction.status)} 
            />
            <Text style={[styles.statusText, { color: getStatusColor(transaction.status) }]}>
              {getText({
                en: transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1),
                ar: transaction.status === 'completed' ? 'مكتملة' : 
                    transaction.status === 'pending' ? 'معلقة' : 
                    transaction.status === 'failed' ? 'فاشلة' : transaction.status
              })}
            </Text>
          </View>
        </View>
      </View>

      {/* Transaction Details */}
      <View style={styles.transactionDetails}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Ionicons name="calendar" size={14} color={theme.textSecondary} />
            <Text style={[styles.detailText, { color: theme.textSecondary }]}>
              {transaction.date} • {transaction.time}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Ionicons name="card" size={14} color={theme.textSecondary} />
            <Text style={[styles.detailText, { color: theme.textSecondary }]}>
              {transaction.paymentMethod}
            </Text>
          </View>
        </View>

        <View style={styles.referenceRow}>
          <Text style={[styles.referenceText, { color: theme.textSecondary }]}>
            {getText({ en: 'Ref:', ar: 'مرجع:' })} {transaction.reference}
          </Text>
          {transaction.fees > 0 && (
            <Text style={[styles.feesText, { color: theme.textSecondary }]}>
              {getText({ en: 'Fee:', ar: 'رسوم:' })} {formatAmount(transaction.fees, transaction.currency)}
            </Text>
          )}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        {transaction.hasReceipt && (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: COLORS.info + '15' }]}
            onPress={() => onDownloadReceipt?.(transaction.id)}
          >
            <Ionicons name="download" size={14} color={COLORS.info} />
            <Text style={[styles.actionButtonText, { color: COLORS.info }]}>
              {getText({ en: 'Receipt', ar: 'إيصال' })}
            </Text>
          </TouchableOpacity>
        )}

        {transaction.canRefund && transaction.status === 'completed' && transaction.type === 'payment' && (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: COLORS.warning + '15' }]}
            onPress={() => onRequestRefund?.(transaction.id)}
          >
            <Ionicons name="return-up-back" size={14} color={COLORS.warning} />
            <Text style={[styles.actionButtonText, { color: COLORS.warning }]}>
              {getText({ en: 'Refund', ar: 'استرداد' })}
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: theme.inputBackground }]}
          onPress={() => onViewTransaction?.(transaction.id)}
        >
          <Ionicons name="eye" size={14} color={theme.text} />
          <Text style={[styles.actionButtonText, { color: theme.text }]}>
            {getText({ en: 'Details', ar: 'التفاصيل' })}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
            {getText({ en: 'Payment History', ar: 'سجل المدفوعات' })}
          </Text>
          <TouchableOpacity style={styles.exportButton}>
            <Ionicons name="download-outline" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <View style={[styles.summaryCard, { backgroundColor: theme.surface }]}>
          <View style={styles.summaryIcon}>
            <Ionicons name="arrow-up-circle" size={24} color={COLORS.primary} />
          </View>
          <View style={styles.summaryInfo}>
            <Text style={[styles.summaryAmount, { color: theme.text }]}>
              {formatAmount(totalSpent, 'SAR')}
            </Text>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
              {getText({ en: 'Total Spent', ar: 'إجمالي الإنفاق' })}
            </Text>
          </View>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: theme.surface }]}>
          <View style={styles.summaryIcon}>
            <Ionicons name="arrow-down-circle" size={24} color={COLORS.success} />
          </View>
          <View style={styles.summaryInfo}>
            <Text style={[styles.summaryAmount, { color: theme.text }]}>
              {formatAmount(totalRefunds, 'SAR')}
            </Text>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
              {getText({ en: 'Total Refunds', ar: 'إجمالي المسترد' })}
            </Text>
          </View>
        </View>
      </View>

      {/* Filter Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
      >
        {FILTER_OPTIONS.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterTab,
              { backgroundColor: theme.surface },
              selectedFilter === filter.id && { 
                backgroundColor: COLORS.primary + '20',
                borderColor: COLORS.primary 
              }
            ]}
            onPress={() => setSelectedFilter(filter.id)}
          >
            <Text style={[
              styles.filterTabText, 
              { color: theme.text },
              selectedFilter === filter.id && { color: COLORS.primary }
            ]}>
              {getText(filter.name)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results Summary */}
      <View style={styles.resultsContainer}>
        <Text style={[styles.resultsText, { color: theme.text }]}>
          {getText({
            en: `${filteredTransactions.length} transactions`,
            ar: `${filteredTransactions.length} معاملة`
          })}
        </Text>
      </View>

      {/* Transactions List */}
      <FlatList
        data={filteredTransactions}
        renderItem={renderTransactionCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.transactionsList}
        ItemSeparatorComponent={() => <View style={styles.transactionSeparator} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={64} color={theme.textSecondary} />
            <Text style={[styles.emptyTitle, { color: theme.text }]}>
              {getText({ en: 'No Transactions Found', ar: 'لا توجد معاملات' })}
            </Text>
            <Text style={[styles.emptyDescription, { color: theme.textSecondary }]}>
              {getText({
                en: 'You haven\'t made any transactions yet.',
                ar: 'لم تقم بأي معاملات بعد.'
              })}
            </Text>
          </View>
        )}
      />

      {/* Export Options */}
      <View style={[styles.exportSection, { backgroundColor: theme.surface }]}>
        <Text style={[styles.exportTitle, { color: theme.text }]}>
          {getText({ en: 'Export Options', ar: 'خيارات التصدير' })}
        </Text>
        
        <View style={styles.exportButtons}>
          <CustomButton
            title={getText({ en: 'Export PDF', ar: 'تصدير PDF' })}
            onPress={() => {}}
            variant="outline"
            icon="document-text"
            size="small"
            customStyle={styles.exportButton}
          />
          
          <CustomButton
            title={getText({ en: 'Export Excel', ar: 'تصدير Excel' })}
            onPress={() => {}}
            variant="outline"
            icon="grid"
            size="small"
            customStyle={styles.exportButton}
          />
        </View>
      </View>
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
  },
  backButton: {
    padding: SPACING.sm,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.sizes.h1,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  exportButton: {
    padding: SPACING.sm,
  },
  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    gap: SPACING.md,
  },
  summaryCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryIcon: {
    marginRight: SPACING.md,
  },
  summaryInfo: {
    flex: 1,
  },
  summaryAmount: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  summaryLabel: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  filtersContainer: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  filterTab: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  filterTabText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  resultsContainer: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  resultsText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  transactionsList: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  transactionSeparator: {
    height: SPACING.md,
  },
  transactionCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  transactionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  transactionIcon: {
    marginRight: SPACING.md,
  },
  iconBackground: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionInfo: {
    flex: 1,
    marginRight: SPACING.md,
  },
  transactionDescription: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: SPACING.xs,
  },
  transactionRecipient: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  statusText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  transactionDetails: {
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.light.border,
    marginBottom: SPACING.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  detailText: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  referenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  referenceText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontFamily: 'monospace',
  },
  feesText: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.xs,
  },
  actionButtonText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
  },
  emptyTitle: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.sm,
    marginTop: SPACING.lg,
  },
  emptyDescription: {
    fontSize: TYPOGRAPHY.sizes.body1,
    textAlign: 'center',
  },
  exportSection: {
    margin: SPACING.lg,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  exportTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.md,
  },
  exportButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  exportButton: {
    flex: 1,
  },
});

export default PaymentHistoryScreen;
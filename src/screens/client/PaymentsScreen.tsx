import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

interface PaymentMethod {
  id: string;
  type: 'mada' | 'stc_pay' | 'apple_pay' | 'credit_card';
  name: string;
  lastFour: string;
  isDefault: boolean;
  icon: string;
}

interface Transaction {
  id: string;
  type: 'payment' | 'refund' | 'escrow_release';
  amount: number;
  description: string;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  projectTitle: string;
  engineer: string;
}

interface EscrowPayment {
  id: string;
  projectTitle: string;
  engineer: string;
  totalAmount: number;
  releasedAmount: number;
  remainingAmount: number;
  milestones: Milestone[];
}

interface Milestone {
  id: string;
  title: string;
  amount: number;
  status: 'pending' | 'completed' | 'released';
  dueDate: string;
}

const PaymentsScreen: React.FC = () => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [activeTab, setActiveTab] = useState<'overview' | 'methods' | 'history' | 'escrow'>('overview');

  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  // Mock data - in real app, this would come from Redux store
  const paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'mada',
      name: 'Mada Card',
      lastFour: '1234',
      isDefault: true,
      icon: 'card',
    },
    {
      id: '2',
      type: 'stc_pay',
      name: 'STC Pay',
      lastFour: '5678',
      isDefault: false,
      icon: 'phone-portrait',
    },
    {
      id: '3',
      type: 'credit_card',
      name: 'Visa Card',
      lastFour: '9012',
      isDefault: false,
      icon: 'card',
    },
  ];

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'payment',
      amount: 15000,
      description: 'Payment for Site Survey - NEOM Project',
      status: 'completed',
      date: '2024-01-15 14:30',
      projectTitle: 'Site Survey for NEOM Project',
      engineer: 'Sarah Al-Mansouri',
    },
    {
      id: '2',
      type: 'escrow_release',
      amount: 8000,
      description: 'Milestone payment released',
      status: 'completed',
      date: '2024-01-20 10:15',
      projectTitle: 'MEP Design Review',
      engineer: 'Ahmed Al-Rashid',
    },
    {
      id: '3',
      type: 'refund',
      amount: 5000,
      description: 'Refund for cancelled project',
      status: 'completed',
      date: '2024-01-25 16:45',
      projectTitle: 'Safety Inspection',
      engineer: 'Mohammed Al-Zahrani',
    },
  ];

  const escrowPayments: EscrowPayment[] = [
    {
      id: '1',
      projectTitle: 'Site Survey for NEOM Project',
      engineer: 'Sarah Al-Mansouri',
      totalAmount: 15000,
      releasedAmount: 7500,
      remainingAmount: 7500,
      milestones: [
        {
          id: '1',
          title: 'Initial Survey',
          amount: 5000,
          status: 'released',
          dueDate: '2024-01-15',
        },
        {
          id: '2',
          title: 'Data Analysis',
          amount: 5000,
          status: 'completed',
          dueDate: '2024-01-25',
        },
        {
          id: '3',
          title: 'Final Report',
          amount: 5000,
          status: 'pending',
          dueDate: '2024-02-05',
        },
      ],
    },
  ];

  const renderPaymentOverview = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Balance Card */}
      <View style={[styles.balanceCard, { backgroundColor: theme.surface }]}>
        <Text style={[styles.balanceLabel, { color: theme.textSecondary }]}>
          {isArabic ? 'الرصيد المتاح' : 'Available Balance'}
        </Text>
        <Text style={[styles.balanceAmount, { color: theme.text }]}>
          25,000 SAR
        </Text>
        <Text style={[styles.balanceSubtext, { color: theme.textSecondary }]}>
          {isArabic ? 'آخر تحديث: اليوم 10:30 ص' : 'Last updated: Today 10:30 AM'}
        </Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsSection}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {isArabic ? 'إجراءات سريعة' : 'Quick Actions'}
        </Text>
        
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: theme.surface }]}>
            <Ionicons name="add-circle" size={32} color={COLORS.primary} />
            <Text style={[styles.quickActionText, { color: theme.text }]}>
              {isArabic ? 'إضافة رصيد' : 'Add Funds'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: theme.surface }]}>
            <Ionicons name="card" size={32} color={COLORS.secondary} />
            <Text style={[styles.quickActionText, { color: theme.text }]}>
              {isArabic ? 'إدارة البطاقات' : 'Manage Cards'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: theme.surface }]}>
            <Ionicons name="receipt" size={32} color={COLORS.success} />
            <Text style={[styles.quickActionText, { color: theme.text }]}>
              {isArabic ? 'الفواتير' : 'Invoices'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.quickActionCard, { backgroundColor: theme.surface }]}>
            <Ionicons name="shield-checkmark" size={32} color={COLORS.warning} />
            <Text style={[styles.quickActionText, { color: theme.text }]}>
              {isArabic ? 'المدفوعات المضمونة' : 'Escrow'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Transactions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {isArabic ? 'المعاملات الأخيرة' : 'Recent Transactions'}
          </Text>
          <TouchableOpacity onPress={() => setActiveTab('history')}>
            <Text style={[styles.seeAllText, { color: COLORS.primary }]}>
              {isArabic ? 'عرض الكل' : 'See All'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={transactions.slice(0, 3)}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );

  const renderPaymentMethods = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {isArabic ? 'طرق الدفع' : 'Payment Methods'}
        </Text>
        
        <FlatList
          data={paymentMethods}
          renderItem={renderPaymentMethod}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
        
        <CustomButton
          title={{ en: '+ Add Payment Method', ar: '+ إضافة طريقة دفع' }}
          variant="outline"
          onPress={() => console.log('Add payment method')}
          style={styles.addMethodButton}
        />
      </View>
    </ScrollView>
  );

  const renderTransactionHistory = () => (
    <FlatList
      data={transactions}
      renderItem={renderTransaction}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.transactionsList}
    />
  );

  const renderEscrowPayments = () => (
    <FlatList
      data={escrowPayments}
      renderItem={renderEscrowPayment}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.escrowList}
    />
  );

  const renderPaymentMethod = ({ item }: { item: PaymentMethod }) => (
    <View style={[styles.paymentMethodCard, { backgroundColor: theme.surface }]}>
      <View style={styles.paymentMethodInfo}>
        <Ionicons name={item.icon as any} size={24} color={theme.textSecondary} />
        <View style={styles.paymentMethodDetails}>
          <Text style={[styles.paymentMethodName, { color: theme.text }]}>
            {item.name}
          </Text>
          <Text style={[styles.paymentMethodNumber, { color: theme.textSecondary }]}>
            **** **** **** {item.lastFour}
          </Text>
        </View>
      </View>
      
      <View style={styles.paymentMethodActions}>
        {item.isDefault && (
          <View style={styles.defaultBadge}>
            <Text style={styles.defaultText}>
              {isArabic ? 'افتراضي' : 'Default'}
            </Text>
          </View>
        )}
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color={theme.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View style={[styles.transactionCard, { backgroundColor: theme.surface }]}>
      <View style={styles.transactionHeader}>
        <View style={styles.transactionInfo}>
          <Ionicons 
            name={getTransactionIcon(item.type)} 
            size={20} 
            color={getTransactionColor(item.type)} 
          />
          <View style={styles.transactionDetails}>
            <Text style={[styles.transactionDescription, { color: theme.text }]}>
              {item.description}
            </Text>
            <Text style={[styles.transactionProject, { color: theme.textSecondary }]}>
              {item.projectTitle} • {item.engineer}
            </Text>
          </View>
        </View>
        
        <View style={styles.transactionAmount}>
          <Text style={[
            styles.transactionAmountText,
            { color: item.type === 'refund' ? COLORS.success : theme.text }
          ]}>
            {item.type === 'refund' ? '+' : '-'}{item.amount.toLocaleString()} SAR
          </Text>
          <Text style={[styles.transactionDate, { color: theme.textSecondary }]}>
            {item.date}
          </Text>
        </View>
      </View>
      
      <View style={[
        styles.transactionStatus,
        { backgroundColor: getStatusColor(item.status) }
      ]}>
        <Text style={styles.transactionStatusText}>
          {getStatusText(item.status)}
        </Text>
      </View>
    </View>
  );

  const renderEscrowPayment = ({ item }: { item: EscrowPayment }) => (
    <View style={[styles.escrowCard, { backgroundColor: theme.surface }]}>
      <View style={styles.escrowHeader}>
        <Text style={[styles.escrowTitle, { color: theme.text }]}>
          {item.projectTitle}
        </Text>
        <Text style={[styles.escrowEngineer, { color: theme.textSecondary }]}>
          {item.engineer}
        </Text>
      </View>
      
      <View style={styles.escrowAmounts}>
        <View style={styles.amountRow}>
          <Text style={[styles.amountLabel, { color: theme.textSecondary }]}>
            {isArabic ? 'المبلغ الإجمالي' : 'Total Amount'}
          </Text>
          <Text style={[styles.amountValue, { color: theme.text }]}>
            {item.totalAmount.toLocaleString()} SAR
          </Text>
        </View>
        
        <View style={styles.amountRow}>
          <Text style={[styles.amountLabel, { color: theme.textSecondary }]}>
            {isArabic ? 'تم الإفراج عنه' : 'Released'}
          </Text>
          <Text style={[styles.amountValue, { color: COLORS.success }]}>
            {item.releasedAmount.toLocaleString()} SAR
          </Text>
        </View>
        
        <View style={styles.amountRow}>
          <Text style={[styles.amountLabel, { color: theme.textSecondary }]}>
            {isArabic ? 'المتبقي' : 'Remaining'}
          </Text>
          <Text style={[styles.amountValue, { color: COLORS.warning }]}>
            {item.remainingAmount.toLocaleString()} SAR
          </Text>
        </View>
      </View>
      
      <View style={styles.milestonesSection}>
        <Text style={[styles.milestonesTitle, { color: theme.text }]}>
          {isArabic ? 'المراحل' : 'Milestones'}
        </Text>
        
        {item.milestones.map((milestone) => (
          <View key={milestone.id} style={styles.milestoneItem}>
            <View style={styles.milestoneInfo}>
              <Text style={[styles.milestoneTitle, { color: theme.text }]}>
                {milestone.title}
              </Text>
              <Text style={[styles.milestoneAmount, { color: theme.textSecondary }]}>
                {milestone.amount.toLocaleString()} SAR
              </Text>
            </View>
            
            <View style={[
              styles.milestoneStatus,
              { backgroundColor: getMilestoneStatusColor(milestone.status) }
            ]}>
              <Text style={styles.milestoneStatusText}>
                {getMilestoneStatusText(milestone.status)}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return 'arrow-down-circle';
      case 'refund':
        return 'arrow-up-circle';
      case 'escrow_release':
        return 'shield-checkmark';
      default:
        return 'card';
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'payment':
        return COLORS.error;
      case 'refund':
        return COLORS.success;
      case 'escrow_release':
        return COLORS.primary;
      default:
        return COLORS.light.textSecondary;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return COLORS.success;
      case 'pending':
        return COLORS.warning;
      case 'failed':
        return COLORS.error;
      default:
        return COLORS.light.border;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return isArabic ? 'مكتمل' : 'Completed';
      case 'pending':
        return isArabic ? 'في الانتظار' : 'Pending';
      case 'failed':
        return isArabic ? 'فشل' : 'Failed';
      default:
        return status;
    }
  };

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case 'released':
        return COLORS.success;
      case 'completed':
        return COLORS.primary;
      case 'pending':
        return COLORS.light.border;
      default:
        return COLORS.light.border;
    }
  };

  const getMilestoneStatusText = (status: string) => {
    switch (status) {
      case 'released':
        return isArabic ? 'تم الإفراج' : 'Released';
      case 'completed':
        return isArabic ? 'مكتمل' : 'Completed';
      case 'pending':
        return isArabic ? 'في الانتظار' : 'Pending';
      default:
        return status;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderPaymentOverview();
      case 'methods':
        return renderPaymentMethods();
      case 'history':
        return renderTransactionHistory();
      case 'escrow':
        return renderEscrowPayments();
      default:
        return renderPaymentOverview();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          {isArabic ? 'المدفوعات' : 'Payments'}
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          {isArabic ? 'إدارة مدفوعاتك وطرق الدفع' : 'Manage your payments and payment methods'}
        </Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {[
          { id: 'overview', title: { en: 'Overview', ar: 'نظرة عامة' }, icon: 'grid' },
          { id: 'methods', title: { en: 'Methods', ar: 'الطرق' }, icon: 'card' },
          { id: 'history', title: { en: 'History', ar: 'السجل' }, icon: 'time' },
          { id: 'escrow', title: { en: 'Escrow', ar: 'الضمان' }, icon: 'shield-checkmark' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              {
                borderBottomColor: activeTab === tab.id ? COLORS.primary : 'transparent',
              },
            ]}
            onPress={() => setActiveTab(tab.id as any)}
          >
            <Ionicons 
              name={tab.icon as any} 
              size={20} 
              color={activeTab === tab.id ? COLORS.primary : theme.textSecondary} 
            />
            <Text
              style={[
                styles.tabText,
                {
                  color: activeTab === tab.id ? COLORS.primary : theme.textSecondary,
                },
              ]}
            >
              {getText(tab.title)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {renderTabContent()}
      </View>
    </View>
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
  title: {
    fontSize: TYPOGRAPHY.sizes.h2,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.regular,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light.border,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 2,
    gap: SPACING.xs,
  },
  tabText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  content: {
    flex: 1,
  },
  balanceCard: {
    margin: SPACING.lg,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.light.border,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: TYPOGRAPHY.sizes.body1,
    marginBottom: SPACING.xs,
  },
  balanceAmount: {
    fontSize: TYPOGRAPHY.sizes.h1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  balanceSubtext: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  quickActionsSection: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.h4,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.md,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.light.border,
  },
  quickActionText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
    textAlign: 'center',
    marginTop: SPACING.xs,
  },
  section: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  seeAllText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  transactionsList: {
    padding: SPACING.lg,
  },
  transactionCard: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.light.border,
    marginBottom: SPACING.sm,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  transactionInfo: {
    flexDirection: 'row',
    flex: 1,
    marginRight: SPACING.sm,
  },
  transactionDetails: {
    marginLeft: SPACING.sm,
    flex: 1,
  },
  transactionDescription: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: SPACING.xs,
  },
  transactionProject: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  transactionAmountText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  transactionDate: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  transactionStatus: {
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  transactionStatusText: {
    color: 'white',
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  paymentMethodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.light.border,
    marginBottom: SPACING.sm,
  },
  paymentMethodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentMethodDetails: {
    marginLeft: SPACING.sm,
    flex: 1,
  },
  paymentMethodName: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: SPACING.xs,
  },
  paymentMethodNumber: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  paymentMethodActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  defaultBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    marginRight: SPACING.sm,
  },
  defaultText: {
    color: 'white',
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  actionButton: {
    padding: SPACING.sm,
  },
  addMethodButton: {
    marginTop: SPACING.md,
  },
  escrowList: {
    padding: SPACING.lg,
  },
  escrowCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.light.border,
    marginBottom: SPACING.md,
  },
  escrowHeader: {
    marginBottom: SPACING.md,
  },
  escrowTitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  escrowEngineer: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  escrowAmounts: {
    marginBottom: SPACING.lg,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  amountLabel: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  amountValue: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  milestonesSection: {
    borderTopWidth: 1,
    borderTopColor: COLORS.light.border,
    paddingTop: SPACING.md,
  },
  milestonesTitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.md,
  },
  milestoneItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  milestoneInfo: {
    flex: 1,
  },
  milestoneTitle: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: SPACING.xs,
  },
  milestoneAmount: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  milestoneStatus: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  milestoneStatusText: {
    color: 'white',
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
});

export default PaymentsScreen;

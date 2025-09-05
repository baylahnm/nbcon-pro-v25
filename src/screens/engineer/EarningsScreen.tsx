import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

interface Earning {
  id: string;
  projectTitle: string;
  client: string;
  amount: number;
  status: 'pending' | 'completed' | 'paid';
  date: string;
  type: 'job_payment' | 'milestone' | 'bonus';
}

interface Payout {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  requestedDate: string;
  processedDate?: string;
  method: 'bank_transfer' | 'stc_pay' | 'mada';
}

interface EarningsStats {
  totalEarnings: number;
  availableBalance: number;
  pendingAmount: number;
  thisMonth: number;
  lastMonth: number;
  averagePerJob: number;
}

const EarningsScreen: React.FC = () => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [activeTab, setActiveTab] = useState<'overview' | 'earnings' | 'payouts' | 'analytics'>('overview');

  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  // Mock data - in real app, this would come from Redux store
  const earningsStats: EarningsStats = {
    totalEarnings: 180000,
    availableBalance: 25000,
    pendingAmount: 15000,
    thisMonth: 45000,
    lastMonth: 38000,
    averagePerJob: 12000,
  };

  const earnings: Earning[] = [
    {
      id: '1',
      projectTitle: 'Site Survey for NEOM Project',
      client: 'Ahmed Al-Rashid',
      amount: 15000,
      status: 'paid',
      date: '2024-01-15',
      type: 'job_payment',
    },
    {
      id: '2',
      projectTitle: 'MEP Design Review',
      client: 'Sarah Al-Mansouri',
      amount: 8000,
      status: 'completed',
      date: '2024-01-20',
      type: 'milestone',
    },
    {
      id: '3',
      projectTitle: 'Safety Inspection',
      client: 'Mohammed Al-Zahrani',
      amount: 5000,
      status: 'pending',
      date: '2024-01-25',
      type: 'job_payment',
    },
    {
      id: '4',
      projectTitle: 'BIM Modeling',
      client: 'Fatima Al-Sheikh',
      amount: 12000,
      status: 'paid',
      date: '2024-01-28',
      type: 'job_payment',
    },
  ];

  const payouts: Payout[] = [
    {
      id: '1',
      amount: 25000,
      status: 'completed',
      requestedDate: '2024-01-20',
      processedDate: '2024-01-22',
      method: 'bank_transfer',
    },
    {
      id: '2',
      amount: 15000,
      status: 'processing',
      requestedDate: '2024-01-25',
      method: 'stc_pay',
    },
    {
      id: '3',
      amount: 8000,
      status: 'pending',
      requestedDate: '2024-01-30',
      method: 'mada',
    },
  ];

  const renderEarningsOverview = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Balance Cards */}
      <View style={styles.balanceSection}>
        <View style={[styles.balanceCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.balanceLabel, { color: theme.textSecondary }]}>
            {isArabic ? 'الرصيد المتاح' : 'Available Balance'}
          </Text>
          <Text style={[styles.balanceAmount, { color: COLORS.primary }]}>
            {earningsStats.availableBalance.toLocaleString()} SAR
          </Text>
          <CustomButton
            title={{ en: 'Request Payout', ar: 'طلب سحب' }}
            size="small"
            onPress={() => console.log('Request payout')}
            style={styles.payoutButton}
          />
        </View>
        
        <View style={[styles.balanceCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.balanceLabel, { color: theme.textSecondary }]}>
            {isArabic ? 'في الانتظار' : 'Pending'}
          </Text>
          <Text style={[styles.balanceAmount, { color: COLORS.warning }]}>
            {earningsStats.pendingAmount.toLocaleString()} SAR
          </Text>
          <Text style={[styles.balanceSubtext, { color: theme.textSecondary }]}>
            {isArabic ? 'من 2 مشاريع نشطة' : 'From 2 active projects'}
          </Text>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsSection}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {isArabic ? 'إحصائيات الأرباح' : 'Earnings Statistics'}
        </Text>
        
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
            <Ionicons name="trending-up" size={24} color={COLORS.success} />
            <Text style={[styles.statValue, { color: theme.text }]}>
              {earningsStats.thisMonth.toLocaleString()} SAR
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              {isArabic ? 'هذا الشهر' : 'This Month'}
            </Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
            <Ionicons name="calendar" size={24} color={COLORS.secondary} />
            <Text style={[styles.statValue, { color: theme.text }]}>
              {earningsStats.lastMonth.toLocaleString()} SAR
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              {isArabic ? 'الشهر الماضي' : 'Last Month'}
            </Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
            <Ionicons name="calculator" size={24} color={COLORS.accent} />
            <Text style={[styles.statValue, { color: theme.text }]}>
              {earningsStats.averagePerJob.toLocaleString()} SAR
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              {isArabic ? 'متوسط المشروع' : 'Avg per Job'}
            </Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
            <Ionicons name="trophy" size={24} color={COLORS.warning} />
            <Text style={[styles.statValue, { color: theme.text }]}>
              {earningsStats.totalEarnings.toLocaleString()} SAR
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              {isArabic ? 'إجمالي الأرباح' : 'Total Earnings'}
            </Text>
          </View>
        </View>
      </View>

      {/* Recent Earnings */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {isArabic ? 'الأرباح الأخيرة' : 'Recent Earnings'}
          </Text>
          <TouchableOpacity onPress={() => setActiveTab('earnings')}>
            <Text style={[styles.seeAllText, { color: COLORS.primary }]}>
              {isArabic ? 'عرض الكل' : 'See All'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={earnings.slice(0, 3)}
          renderItem={renderEarning}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );

  const renderEarningsList = () => (
    <FlatList
      data={earnings}
      renderItem={renderEarning}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.earningsList}
    />
  );

  const renderPayouts = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {isArabic ? 'طلبات السحب' : 'Payout Requests'}
        </Text>
        
        <FlatList
          data={payouts}
          renderItem={renderPayout}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
        
        <CustomButton
          title={{ en: '+ Request New Payout', ar: '+ طلب سحب جديد' }}
          onPress={() => console.log('Request new payout')}
          style={styles.newPayoutButton}
        />
      </View>
    </ScrollView>
  );

  const renderAnalytics = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          {isArabic ? 'تحليلات الأرباح' : 'Earnings Analytics'}
        </Text>
        
        <View style={[styles.analyticsCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.analyticsTitle, { color: theme.text }]}>
            {isArabic ? 'نمو الأرباح الشهري' : 'Monthly Earnings Growth'}
          </Text>
          <View style={styles.chartPlaceholder}>
            <Ionicons name="bar-chart" size={48} color={theme.textSecondary} />
            <Text style={[styles.chartText, { color: theme.textSecondary }]}>
              {isArabic ? 'رسم بياني للأرباح الشهرية' : 'Monthly earnings chart'}
            </Text>
          </View>
        </View>
        
        <View style={[styles.analyticsCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.analyticsTitle, { color: theme.text }]}>
            {isArabic ? 'أفضل أنواع المشاريع' : 'Top Project Types'}
          </Text>
          <View style={styles.projectTypesList}>
            <View style={styles.projectTypeItem}>
              <Text style={[styles.projectTypeName, { color: theme.text }]}>
                {isArabic ? 'المساحة' : 'Surveying'}
              </Text>
              <Text style={[styles.projectTypeAmount, { color: COLORS.primary }]}>
                45,000 SAR
              </Text>
            </View>
            <View style={styles.projectTypeItem}>
              <Text style={[styles.projectTypeName, { color: theme.text }]}>
                {isArabic ? 'الهندسة الكهروميكانيكية' : 'MEP'}
              </Text>
              <Text style={[styles.projectTypeAmount, { color: COLORS.secondary }]}>
                38,000 SAR
              </Text>
            </View>
            <View style={styles.projectTypeItem}>
              <Text style={[styles.projectTypeName, { color: theme.text }]}>
                {isArabic ? 'السلامة والبيئة' : 'HSE'}
              </Text>
              <Text style={[styles.projectTypeAmount, { color: COLORS.success }]}>
                25,000 SAR
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderEarning = ({ item }: { item: Earning }) => (
    <View style={[styles.earningCard, { backgroundColor: theme.surface }]}>
      <View style={styles.earningHeader}>
        <View style={styles.earningInfo}>
          <Text style={[styles.earningTitle, { color: theme.text }]}>
            {item.projectTitle}
          </Text>
          <Text style={[styles.earningClient, { color: theme.textSecondary }]}>
            {item.client}
          </Text>
        </View>
        
        <View style={styles.earningAmount}>
          <Text style={[styles.earningAmountText, { color: theme.text }]}>
            {item.amount.toLocaleString()} SAR
          </Text>
          <Text style={[styles.earningDate, { color: theme.textSecondary }]}>
            {item.date}
          </Text>
        </View>
      </View>
      
      <View style={styles.earningFooter}>
        <View style={[
          styles.earningStatus,
          { backgroundColor: getEarningStatusColor(item.status) }
        ]}>
          <Text style={styles.earningStatusText}>
            {getEarningStatusText(item.status)}
          </Text>
        </View>
        
        <View style={styles.earningType}>
          <Ionicons 
            name={getEarningTypeIcon(item.type)} 
            size={16} 
            color={theme.textSecondary} 
          />
          <Text style={[styles.earningTypeText, { color: theme.textSecondary }]}>
            {getEarningTypeText(item.type)}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderPayout = ({ item }: { item: Payout }) => (
    <View style={[styles.payoutCard, { backgroundColor: theme.surface }]}>
      <View style={styles.payoutHeader}>
        <View style={styles.payoutInfo}>
          <Text style={[styles.payoutAmount, { color: theme.text }]}>
            {item.amount.toLocaleString()} SAR
          </Text>
          <Text style={[styles.payoutDate, { color: theme.textSecondary }]}>
            {isArabic ? 'طلب في' : 'Requested on'} {item.requestedDate}
          </Text>
        </View>
        
        <View style={[
          styles.payoutStatus,
          { backgroundColor: getPayoutStatusColor(item.status) }
        ]}>
          <Text style={styles.payoutStatusText}>
            {getPayoutStatusText(item.status)}
          </Text>
        </View>
      </View>
      
      <View style={styles.payoutDetails}>
        <View style={styles.payoutMethod}>
          <Ionicons name={getPayoutMethodIcon(item.method)} size={16} color={theme.textSecondary} />
          <Text style={[styles.payoutMethodText, { color: theme.textSecondary }]}>
            {getPayoutMethodText(item.method)}
          </Text>
        </View>
        
        {item.processedDate && (
          <Text style={[styles.payoutProcessedDate, { color: theme.textSecondary }]}>
            {isArabic ? 'تم في' : 'Processed on'} {item.processedDate}
          </Text>
        )}
      </View>
    </View>
  );

  const getEarningStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return COLORS.success;
      case 'completed':
        return COLORS.primary;
      case 'pending':
        return COLORS.warning;
      default:
        return COLORS.light.border;
    }
  };

  const getEarningStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return isArabic ? 'مدفوع' : 'Paid';
      case 'completed':
        return isArabic ? 'مكتمل' : 'Completed';
      case 'pending':
        return isArabic ? 'في الانتظار' : 'Pending';
      default:
        return status;
    }
  };

  const getEarningTypeIcon = (type: string) => {
    switch (type) {
      case 'job_payment':
        return 'briefcase';
      case 'milestone':
        return 'flag';
      case 'bonus':
        return 'gift';
      default:
        return 'cash';
    }
  };

  const getEarningTypeText = (type: string) => {
    switch (type) {
      case 'job_payment':
        return isArabic ? 'دفعة مشروع' : 'Job Payment';
      case 'milestone':
        return isArabic ? 'مرحلة' : 'Milestone';
      case 'bonus':
        return isArabic ? 'مكافأة' : 'Bonus';
      default:
        return type;
    }
  };

  const getPayoutStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return COLORS.success;
      case 'processing':
        return COLORS.primary;
      case 'pending':
        return COLORS.warning;
      case 'failed':
        return COLORS.error;
      default:
        return COLORS.light.border;
    }
  };

  const getPayoutStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return isArabic ? 'مكتمل' : 'Completed';
      case 'processing':
        return isArabic ? 'قيد المعالجة' : 'Processing';
      case 'pending':
        return isArabic ? 'في الانتظار' : 'Pending';
      case 'failed':
        return isArabic ? 'فشل' : 'Failed';
      default:
        return status;
    }
  };

  const getPayoutMethodIcon = (method: string) => {
    switch (method) {
      case 'bank_transfer':
        return 'business';
      case 'stc_pay':
        return 'phone-portrait';
      case 'mada':
        return 'card';
      default:
        return 'cash';
    }
  };

  const getPayoutMethodText = (method: string) => {
    switch (method) {
      case 'bank_transfer':
        return isArabic ? 'تحويل بنكي' : 'Bank Transfer';
      case 'stc_pay':
        return isArabic ? 'STC Pay' : 'STC Pay';
      case 'mada':
        return isArabic ? 'مدى' : 'Mada';
      default:
        return method;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderEarningsOverview();
      case 'earnings':
        return renderEarningsList();
      case 'payouts':
        return renderPayouts();
      case 'analytics':
        return renderAnalytics();
      default:
        return renderEarningsOverview();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          {isArabic ? 'الأرباح' : 'Earnings'}
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          {isArabic ? 'تتبع أرباحك وطلبات السحب' : 'Track your earnings and payout requests'}
        </Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {[
          { id: 'overview', title: { en: 'Overview', ar: 'نظرة عامة' }, icon: 'grid' },
          { id: 'earnings', title: { en: 'Earnings', ar: 'الأرباح' }, icon: 'cash' },
          { id: 'payouts', title: { en: 'Payouts', ar: 'السحب' }, icon: 'arrow-up-circle' },
          { id: 'analytics', title: { en: 'Analytics', ar: 'التحليلات' }, icon: 'bar-chart' },
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
  balanceSection: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    gap: SPACING.sm,
  },
  balanceCard: {
    flex: 1,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.light.border,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginBottom: SPACING.xs,
  },
  balanceAmount: {
    fontSize: TYPOGRAPHY.sizes.h2,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.sm,
  },
  balanceSubtext: {
    fontSize: TYPOGRAPHY.sizes.caption,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  payoutButton: {
    marginTop: SPACING.sm,
  },
  statsSection: {
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.h4,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.light.border,
  },
  statValue: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.sizes.caption,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
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
  earningsList: {
    padding: SPACING.lg,
  },
  earningCard: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.light.border,
    marginBottom: SPACING.sm,
  },
  earningHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  earningInfo: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  earningTitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: SPACING.xs,
  },
  earningClient: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  earningAmount: {
    alignItems: 'flex-end',
  },
  earningAmountText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  earningDate: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  earningFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  earningStatus: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  earningStatusText: {
    color: 'white',
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  earningType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  earningTypeText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    marginLeft: SPACING.xs,
  },
  payoutCard: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.light.border,
    marginBottom: SPACING.sm,
  },
  payoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  payoutInfo: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  payoutAmount: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  payoutDate: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  payoutStatus: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
  },
  payoutStatusText: {
    color: 'white',
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  payoutDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  payoutMethod: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  payoutMethodText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    marginLeft: SPACING.xs,
  },
  payoutProcessedDate: {
    fontSize: TYPOGRAPHY.sizes.caption,
  },
  newPayoutButton: {
    marginTop: SPACING.md,
  },
  analyticsCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.light.border,
    marginBottom: SPACING.md,
  },
  analyticsTitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.md,
  },
  chartPlaceholder: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  chartText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginTop: SPACING.sm,
  },
  projectTypesList: {
    gap: SPACING.sm,
  },
  projectTypeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  projectTypeName: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  projectTypeAmount: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
});

export default EarningsScreen;

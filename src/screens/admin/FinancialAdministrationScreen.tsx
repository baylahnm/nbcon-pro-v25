import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FinancialAdministrationScreen: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const periods = [
    { label: '7 Days', value: '7days' },
    { label: '30 Days', value: '30days' },
    { label: '90 Days', value: '90days' },
    { label: '1 Year', value: '1year' },
  ];

  const categories = [
    { id: 'all', name: 'All Transactions' },
    { id: 'payments', name: 'Payments' },
    { id: 'disputes', name: 'Disputes' },
    { id: 'fraud', name: 'Fraud Cases' },
    { id: 'refunds', name: 'Refunds' },
  ];

  const financialMetrics = {
    totalRevenue: 2450000,
    totalTransactions: 3456,
    averageTransaction: 708,
    disputeRate: 0.8,
    fraudRate: 0.2,
    refundRate: 1.2,
    pendingPayments: 89,
    completedPayments: 3367,
  };

  const recentTransactions = [
    {
      id: 'TXN-001',
      user: 'Ahmed Al-Rashid',
      amount: 2500,
      type: 'Payment',
      status: 'Completed',
      method: 'STC Pay',
      date: '2024-01-25 14:30',
      project: 'Riyadh Tower Inspection',
    },
    {
      id: 'TXN-002',
      user: 'Sarah Al-Mansouri',
      amount: 1800,
      type: 'Refund',
      status: 'Processing',
      method: 'Bank Transfer',
      date: '2024-01-25 13:45',
      project: 'Jeddah Mall MEP',
    },
    {
      id: 'TXN-003',
      user: 'Mohammed Al-Zahrani',
      amount: 3200,
      type: 'Payment',
      status: 'Pending',
      method: 'mada',
      date: '2024-01-25 12:20',
      project: 'Dammam Port Survey',
    },
    {
      id: 'TXN-004',
      user: 'Fatima Al-Shehri',
      amount: 1500,
      type: 'Dispute',
      status: 'Under Review',
      method: 'STC Pay',
      date: '2024-01-25 11:15',
      project: 'Mecca Hospital BIM',
    },
  ];

  const disputes = [
    {
      id: 'DSP-001',
      user: 'Ahmed Al-Rashid',
      amount: 2500,
      reason: 'Service not as described',
      status: 'Open',
      priority: 'High',
      created: '2024-01-24',
      assignedTo: 'Admin Team',
    },
    {
      id: 'DSP-002',
      user: 'Sarah Al-Mansouri',
      amount: 1800,
      reason: 'Payment processing error',
      status: 'In Progress',
      priority: 'Medium',
      created: '2024-01-23',
      assignedTo: 'Finance Team',
    },
    {
      id: 'DSP-003',
      user: 'Mohammed Al-Zahrani',
      amount: 3200,
      reason: 'Quality issues',
      status: 'Resolved',
      priority: 'Low',
      created: '2024-01-22',
      assignedTo: 'Support Team',
    },
  ];

  const fraudCases = [
    {
      id: 'FRD-001',
      user: 'Suspicious Account',
      amount: 5000,
      type: 'Chargeback',
      status: 'Investigation',
      risk: 'High',
      detected: '2024-01-25',
      description: 'Multiple chargebacks from same IP',
    },
    {
      id: 'FRD-002',
      user: 'Fake Profile',
      amount: 1200,
      type: 'Identity Theft',
      status: 'Blocked',
      risk: 'Medium',
      detected: '2024-01-24',
      description: 'Fake identity documents detected',
    },
  ];

  const PeriodButton = ({ period }: { period: any }) => (
    <TouchableOpacity
      style={[
        styles.periodButton,
        selectedPeriod === period.value && styles.periodButtonSelected
      ]}
      onPress={() => setSelectedPeriod(period.value)}
    >
      <Text style={[
        styles.periodButtonText,
        selectedPeriod === period.value && styles.periodButtonTextSelected
      ]}>
        {period.label}
      </Text>
    </TouchableOpacity>
  );

  const CategoryButton = ({ category }: { category: any }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === category.id && styles.categoryButtonSelected
      ]}
      onPress={() => setSelectedCategory(category.id)}
    >
      <Text style={[
        styles.categoryButtonText,
        selectedCategory === category.id && styles.categoryButtonTextSelected
      ]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  const MetricCard = ({ title, value, change, trend, icon, color }: { title: string; value: string; change: string; trend: string; icon: string; color: string }) => (
    <View style={styles.metricCard}>
      <View style={styles.metricHeader}>
        <Ionicons name={icon as any} size={20} color={color} />
        <Text style={styles.metricTitle}>{title}</Text>
      </View>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={[
        styles.metricChange,
        { color: trend === 'up' ? '#28a745' : '#dc3545' }
      ]}>
        {change}
      </Text>
    </View>
  );

  const TransactionItem = ({ transaction }: { transaction: any }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionHeader}>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionId}>{transaction.id}</Text>
          <Text style={styles.transactionUser}>{transaction.user}</Text>
        </View>
        <View style={styles.transactionStatus}>
          <Text style={styles.transactionAmount}>{transaction.amount.toLocaleString()} SAR</Text>
          <View style={[
            styles.statusBadge,
            { 
              backgroundColor: transaction.status === 'Completed' ? '#28a745' : 
                             transaction.status === 'Processing' ? '#ffc107' : 
                             transaction.status === 'Pending' ? '#007bff' : '#dc3545'
            }
          ]}>
            <Text style={styles.statusText}>{transaction.status}</Text>
          </View>
        </View>
      </View>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionType}>{transaction.type} • {transaction.method}</Text>
        <Text style={styles.transactionProject}>{transaction.project}</Text>
        <Text style={styles.transactionDate}>{transaction.date}</Text>
      </View>
    </View>
  );

  const DisputeItem = ({ dispute }: { dispute: any }) => (
    <View style={styles.disputeItem}>
      <View style={styles.disputeHeader}>
        <View style={styles.disputeInfo}>
          <Text style={styles.disputeId}>{dispute.id}</Text>
          <Text style={styles.disputeUser}>{dispute.user}</Text>
        </View>
        <View style={styles.disputeStatus}>
          <Text style={styles.disputeAmount}>{dispute.amount.toLocaleString()} SAR</Text>
          <View style={[
            styles.priorityBadge,
            { 
              backgroundColor: dispute.priority === 'High' ? '#dc3545' : 
                             dispute.priority === 'Medium' ? '#ffc107' : '#28a745'
            }
          ]}>
            <Text style={styles.priorityText}>{dispute.priority}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.disputeReason}>{dispute.reason}</Text>
      <View style={styles.disputeMeta}>
        <Text style={styles.disputeStatus}>Status: {dispute.status}</Text>
        <Text style={styles.disputeAssigned}>Assigned: {dispute.assignedTo}</Text>
        <Text style={styles.disputeDate}>Created: {dispute.created}</Text>
      </View>
    </View>
  );

  const FraudItem = ({ fraud }: { fraud: any }) => (
    <View style={styles.fraudItem}>
      <View style={styles.fraudHeader}>
        <View style={styles.fraudInfo}>
          <Text style={styles.fraudId}>{fraud.id}</Text>
          <Text style={styles.fraudUser}>{fraud.user}</Text>
        </View>
        <View style={styles.fraudStatus}>
          <Text style={styles.fraudAmount}>{fraud.amount.toLocaleString()} SAR</Text>
          <View style={[
            styles.riskBadge,
            { 
              backgroundColor: fraud.risk === 'High' ? '#dc3545' : 
                             fraud.risk === 'Medium' ? '#ffc107' : '#28a745'
            }
          ]}>
            <Text style={styles.riskText}>{fraud.risk} Risk</Text>
          </View>
        </View>
      </View>
      <Text style={styles.fraudType}>{fraud.type}</Text>
      <Text style={styles.fraudDescription}>{fraud.description}</Text>
      <View style={styles.fraudMeta}>
        <Text style={styles.fraudStatus}>Status: {fraud.status}</Text>
        <Text style={styles.fraudDate}>Detected: {fraud.detected}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Financial Administration</Text>
      <Text style={styles.subtitle}>
        Payment, disputes, and fraud monitoring for admins
      </Text>

      <View style={styles.periodSelector}>
        <Text style={styles.selectorTitle}>Time Period</Text>
        <View style={styles.periodButtons}>
          {periods.map((period) => (
            <PeriodButton key={period.value} period={period} />
          ))}
        </View>
      </View>

      <View style={styles.categorySelector}>
        <Text style={styles.selectorTitle}>Category Filter</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoryButtons}>
            {categories.map((category) => (
              <CategoryButton key={category.id} category={category} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.metricsGrid}>
        <MetricCard 
          title="Total Revenue" 
          value={`${financialMetrics.totalRevenue.toLocaleString()} SAR`} 
          change="+12.5%" 
          trend="up" 
          icon="cash" 
          color="#28a745" 
        />
        <MetricCard 
          title="Transactions" 
          value={financialMetrics.totalTransactions.toLocaleString()} 
          change="+8.3%" 
          trend="up" 
          icon="swap-horizontal" 
          color="#007bff" 
        />
        <MetricCard 
          title="Avg Transaction" 
          value={`${financialMetrics.averageTransaction} SAR`} 
          change="+3.2%" 
          trend="up" 
          icon="trending-up" 
          color="#ffc107" 
        />
        <MetricCard 
          title="Dispute Rate" 
          value={`${financialMetrics.disputeRate}%`} 
          change="-0.3%" 
          trend="down" 
          icon="warning" 
          color="#dc3545" 
        />
      </View>

      <View style={styles.transactionsCard}>
        <Text style={styles.cardTitle}>Recent Transactions</Text>
        {recentTransactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </View>

      <View style={styles.disputesCard}>
        <Text style={styles.cardTitle}>Active Disputes</Text>
        {disputes.map((dispute) => (
          <DisputeItem key={dispute.id} dispute={dispute} />
        ))}
      </View>

      <View style={styles.fraudCard}>
        <Text style={styles.cardTitle}>Fraud Cases</Text>
        {fraudCases.map((fraud) => (
          <FraudItem key={fraud.id} fraud={fraud} />
        ))}
      </View>

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download" size={24} color="#007bff" />
            <Text style={styles.actionText}>Export Reports</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings" size={24} color="#28a745" />
            <Text style={styles.actionText}>Payment Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="shield-checkmark" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Fraud Detection</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="help-circle" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Help</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          Financial administration provides comprehensive monitoring of payments, disputes, 
          and fraud cases. Regular monitoring helps maintain financial integrity and user trust.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 24,
  },
  periodSelector: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  selectorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  periodButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  periodButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    width: '48%',
    alignItems: 'center',
  },
  periodButtonSelected: {
    backgroundColor: '#007bff',
  },
  periodButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  periodButtonTextSelected: {
    color: '#ffffff',
  },
  categorySelector: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  categoryButtons: {
    flexDirection: 'row',
  },
  categoryButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    minWidth: 120,
    alignItems: 'center',
  },
  categoryButtonSelected: {
    backgroundColor: '#28a745',
  },
  categoryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  categoryButtonTextSelected: {
    color: '#ffffff',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metricCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 15,
    width: '48%',
    marginBottom: 10,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  metricTitle: {
    fontSize: 12,
    color: '#cccccc',
    marginLeft: 8,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  metricChange: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  transactionsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  transactionItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 2,
  },
  transactionUser: {
    fontSize: 14,
    color: '#ffffff',
  },
  transactionStatus: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  transactionDetails: {
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  transactionType: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 2,
  },
  transactionProject: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: '#cccccc',
  },
  disputesCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  disputeItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  disputeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  disputeInfo: {
    flex: 1,
  },
  disputeId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffc107',
    marginBottom: 2,
  },
  disputeUser: {
    fontSize: 14,
    color: '#ffffff',
  },
  disputeStatus: {
    alignItems: 'flex-end',
  },
  disputeAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  disputeReason: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 10,
  },
  disputeMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  disputeAssigned: {
    fontSize: 12,
    color: '#cccccc',
  },
  disputeDate: {
    fontSize: 12,
    color: '#cccccc',
  },
  fraudCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  fraudItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  fraudHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  fraudInfo: {
    flex: 1,
  },
  fraudId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#dc3545',
    marginBottom: 2,
  },
  fraudUser: {
    fontSize: 14,
    color: '#ffffff',
  },
  fraudStatus: {
    alignItems: 'flex-end',
  },
  fraudAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  riskText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  fraudType: {
    fontSize: 14,
    color: '#ffc107',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  fraudDescription: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 10,
  },
  fraudMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  fraudDate: {
    fontSize: 12,
    color: '#cccccc',
  },
  quickActionsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  infoText: {
    color: '#cccccc',
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 10,
    flex: 1,
  },
});

export default FinancialAdministrationScreen;

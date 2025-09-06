import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EarningsDashboardScreen: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const earningsData = {
    daily: { amount: 2500, change: '+12%' },
    weekly: { amount: 17500, change: '+8%' },
    monthly: { amount: 70000, change: '+15%' },
  };

  const pendingPayouts = [
    { id: 1, amount: 15000, date: '2024-01-30', status: 'Processing' },
    { id: 2, amount: 8000, date: '2024-02-05', status: 'Scheduled' },
  ];

  const recentEarnings = [
    { project: 'Oil Refinery Inspection', amount: 15000, date: '2024-01-15' },
    { project: 'Smart City Infrastructure', amount: 25000, date: '2024-01-20' },
    { project: 'Resort Development', amount: 18000, date: '2024-01-10' },
  ];

  const PeriodButton = ({ period, label }: { period: string; label: string }) => (
    <TouchableOpacity
      style={[
        styles.periodButton,
        selectedPeriod === period && styles.periodButtonActive
      ]}
      onPress={() => setSelectedPeriod(period)}
    >
      <Text style={[
        styles.periodButtonText,
        selectedPeriod === period && styles.periodButtonTextActive
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Earnings Dashboard</Text>

      <View style={styles.periodSelector}>
        <PeriodButton period="daily" label="Daily" />
        <PeriodButton period="weekly" label="Weekly" />
        <PeriodButton period="monthly" label="Monthly" />
      </View>

      <View style={styles.earningsCard}>
        <Text style={styles.earningsLabel}>
          {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} Earnings
        </Text>
        <Text style={styles.earningsAmount}>
          {earningsData[selectedPeriod as keyof typeof earningsData].amount.toLocaleString()} SAR
        </Text>
        <View style={styles.earningsChange}>
          <Ionicons name="trending-up" size={16} color="#28a745" />
          <Text style={styles.changeText}>
            {earningsData[selectedPeriod as keyof typeof earningsData].change}
          </Text>
        </View>
      </View>

      <View style={styles.pendingPayoutsCard}>
        <Text style={styles.cardTitle}>Pending Payouts</Text>
        {pendingPayouts.map((payout) => (
          <View key={payout.id} style={styles.payoutItem}>
            <View style={styles.payoutInfo}>
              <Text style={styles.payoutAmount}>{payout.amount.toLocaleString()} SAR</Text>
              <Text style={styles.payoutDate}>Due: {payout.date}</Text>
            </View>
            <View style={styles.payoutStatus}>
              <Text style={styles.statusText}>{payout.status}</Text>
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All Payouts</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.recentEarningsCard}>
        <Text style={styles.cardTitle}>Recent Earnings</Text>
        {recentEarnings.map((earning, index) => (
          <View key={index} style={styles.earningItem}>
            <View style={styles.earningInfo}>
              <Text style={styles.projectName}>{earning.project}</Text>
              <Text style={styles.earningDate}>{earning.date}</Text>
            </View>
            <Text style={styles.earningAmount}>{earning.amount.toLocaleString()} SAR</Text>
          </View>
        ))}
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All Earnings</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="card" size={24} color="#007bff" />
            <Text style={styles.actionText}>Request Payout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="document-text" size={24} color="#28a745" />
            <Text style={styles.actionText}>Generate Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Payout Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="analytics" size={24} color="#dc3545" />
            <Text style={styles.actionText}>View Analytics</Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 20,
    textAlign: 'center',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  periodButtonActive: {
    backgroundColor: '#007bff',
  },
  periodButtonText: {
    color: '#cccccc',
    fontSize: 16,
    fontWeight: '500',
  },
  periodButtonTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  earningsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  earningsLabel: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 10,
  },
  earningsAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  earningsChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    color: '#28a745',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  pendingPayoutsCard: {
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
  payoutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  payoutInfo: {
    flex: 1,
  },
  payoutAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  payoutDate: {
    fontSize: 14,
    color: '#cccccc',
  },
  payoutStatus: {
    backgroundColor: '#ffc107',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  viewAllButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  viewAllText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recentEarningsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  earningItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  earningInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  earningDate: {
    fontSize: 14,
    color: '#cccccc',
  },
  earningAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
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
});

export default EarningsDashboardScreen;

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FinancialReportsScreen: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const reportTypes = [
    {
      id: 'income',
      title: 'Income Report',
      description: 'Revenue breakdown by project and client',
      icon: 'trending-up',
      color: '#28a745',
    },
    {
      id: 'tax',
      title: 'Tax Report',
      description: 'VAT compliance and tax calculations',
      icon: 'receipt',
      color: '#ffc107',
    },
    {
      id: 'expenses',
      title: 'Expenses Report',
      description: 'Operating costs and project expenses',
      icon: 'card',
      color: '#dc3545',
    },
    {
      id: 'profit',
      title: 'Profit & Loss',
      description: 'Comprehensive P&L statement',
      icon: 'analytics',
      color: '#007bff',
    },
  ];

  const recentReports = [
    {
      id: '1',
      type: 'Income Report',
      period: 'January 2024',
      amount: 150000,
      status: 'Generated',
      date: '2024-01-31',
    },
    {
      id: '2',
      type: 'Tax Report',
      period: 'Q4 2023',
      amount: 22500,
      status: 'Generated',
      date: '2024-01-15',
    },
    {
      id: '3',
      type: 'Expenses Report',
      period: 'December 2023',
      amount: 45000,
      status: 'Generated',
      date: '2024-01-01',
    },
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

  const ReportTypeCard = ({ report }: { report: any }) => (
    <TouchableOpacity style={styles.reportCard}>
      <View style={styles.reportHeader}>
        <View style={[styles.reportIcon, { backgroundColor: report.color }]}>
          <Ionicons name={report.icon as any} size={24} color="#ffffff" />
        </View>
        <View style={styles.reportInfo}>
          <Text style={styles.reportTitle}>{report.title}</Text>
          <Text style={styles.reportDescription}>{report.description}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.generateButton}>
        <Text style={styles.generateButtonText}>Generate</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const ReportItem = ({ report }: { report: any }) => (
    <View style={styles.reportItem}>
      <View style={styles.reportItemInfo}>
        <Text style={styles.reportItemTitle}>{report.type}</Text>
        <Text style={styles.reportItemPeriod}>{report.period}</Text>
        <Text style={styles.reportItemDate}>{report.date}</Text>
      </View>
      <View style={styles.reportItemActions}>
        <Text style={styles.reportItemAmount}>{report.amount.toLocaleString()} SAR</Text>
        <View style={styles.reportItemButtons}>
          <TouchableOpacity style={styles.downloadButton}>
            <Ionicons name="download" size={16} color="#28a745" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share" size={16} color="#007bff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Financial Reports</Text>
      <Text style={styles.subtitle}>
        Generate and download comprehensive financial reports
      </Text>

      <View style={styles.periodSelector}>
        <PeriodButton period="weekly" label="Weekly" />
        <PeriodButton period="monthly" label="Monthly" />
        <PeriodButton period="quarterly" label="Quarterly" />
        <PeriodButton period="yearly" label="Yearly" />
      </View>

      <View style={styles.reportTypesContainer}>
        <Text style={styles.sectionTitle}>Generate New Report</Text>
        {reportTypes.map((report) => (
          <ReportTypeCard key={report.id} report={report} />
        ))}
      </View>

      <View style={styles.recentReportsContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Reports</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        {recentReports.map((report) => (
          <ReportItem key={report.id} report={report} />
        ))}
      </View>

      <View style={styles.quickStatsContainer}>
        <Text style={styles.sectionTitle}>Quick Stats</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>150,000</Text>
            <Text style={styles.statLabel}>Total Revenue (SAR)</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>22,500</Text>
            <Text style={styles.statLabel}>VAT Collected (SAR)</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>45,000</Text>
            <Text style={styles.statLabel}>Total Expenses (SAR)</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>82,500</Text>
            <Text style={styles.statLabel}>Net Profit (SAR)</Text>
          </View>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          All reports are generated in PDF format and include ZATCA-compliant e-invoicing data 
          for Saudi Arabia tax requirements.
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
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 4,
    marginBottom: 30,
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
    fontSize: 14,
    fontWeight: '500',
  },
  periodButtonTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  reportTypesContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  reportCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  reportIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  reportInfo: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  reportDescription: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
  },
  generateButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
  generateButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  recentReportsContainer: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  viewAllButton: {
    paddingHorizontal: 10,
  },
  viewAllText: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  reportItem: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reportItemInfo: {
    flex: 1,
  },
  reportItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  reportItemPeriod: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 2,
  },
  reportItemDate: {
    fontSize: 12,
    color: '#888888',
  },
  reportItemActions: {
    alignItems: 'flex-end',
  },
  reportItemAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  reportItemButtons: {
    flexDirection: 'row',
  },
  downloadButton: {
    backgroundColor: '#28a745',
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  shareButton: {
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 6,
  },
  quickStatsContainer: {
    marginBottom: 30,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '48%',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#cccccc',
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

export default FinancialReportsScreen;

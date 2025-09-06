import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TaxComplianceScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const taxOverview = {
    vatNumber: '300123456789003',
    registrationDate: '2024-01-01',
    status: 'Active',
    nextFiling: '2024-02-28',
    totalVATCollected: 22500,
    totalVATPaid: 18000,
    netVAT: 4500,
  };

  const vatTransactions = [
    {
      id: '1',
      date: '2024-01-15',
      description: 'Oil Refinery Inspection',
      amount: 15000,
      vatRate: 15,
      vatAmount: 2250,
      type: 'Sale',
    },
    {
      id: '2',
      date: '2024-01-20',
      description: 'Smart City Infrastructure',
      amount: 25000,
      vatRate: 15,
      vatAmount: 3750,
      type: 'Sale',
    },
    {
      id: '3',
      date: '2024-01-25',
      description: 'Software License',
      amount: 5000,
      vatRate: 15,
      vatAmount: 750,
      type: 'Purchase',
    },
  ];

  const zatcaStatus = {
    connected: true,
    lastSync: '2024-01-25 14:30',
    invoicesSent: 45,
    invoicesAccepted: 42,
    invoicesRejected: 3,
  };

  const TabButton = ({ tab, label }: { tab: string; label: string }) => (
    <TouchableOpacity
      style={[
        styles.tabButton,
        selectedTab === tab && styles.tabButtonActive
      ]}
      onPress={() => setSelectedTab(tab)}
    >
      <Text style={[
        styles.tabButtonText,
        selectedTab === tab && styles.tabButtonTextActive
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const VatTransactionItem = ({ transaction }: { transaction: any }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionHeader}>
        <Text style={styles.transactionDate}>{transaction.date}</Text>
        <View style={[
          styles.transactionType,
          { backgroundColor: transaction.type === 'Sale' ? '#28a745' : '#dc3545' }
        ]}>
          <Text style={styles.transactionTypeText}>{transaction.type}</Text>
        </View>
      </View>
      <Text style={styles.transactionDescription}>{transaction.description}</Text>
      <View style={styles.transactionAmounts}>
        <Text style={styles.transactionAmount}>
          {transaction.amount.toLocaleString()} SAR
        </Text>
        <Text style={styles.vatAmount}>
          VAT ({transaction.vatRate}%): {transaction.vatAmount.toLocaleString()} SAR
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tax Compliance</Text>
      <Text style={styles.subtitle}>
        Manage your VAT compliance and ZATCA e-invoicing
      </Text>

      <View style={styles.tabContainer}>
        <TabButton tab="overview" label="Overview" />
        <TabButton tab="vat" label="VAT" />
        <TabButton tab="zatca" label="ZATCA" />
        <TabButton tab="certificates" label="Certificates" />
      </View>

      {selectedTab === 'overview' && (
        <View>
          <View style={styles.overviewCard}>
            <Text style={styles.cardTitle}>Tax Overview</Text>
            <View style={styles.overviewStats}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>VAT Number</Text>
                <Text style={styles.statValue}>{taxOverview.vatNumber}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Status</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{taxOverview.status}</Text>
                </View>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Next Filing</Text>
                <Text style={styles.statValue}>{taxOverview.nextFiling}</Text>
              </View>
            </View>
          </View>

          <View style={styles.vatSummaryCard}>
            <Text style={styles.cardTitle}>VAT Summary</Text>
            <View style={styles.vatSummary}>
              <View style={styles.vatItem}>
                <Text style={styles.vatLabel}>VAT Collected</Text>
                <Text style={styles.vatValue}>
                  +{taxOverview.totalVATCollected.toLocaleString()} SAR
                </Text>
              </View>
              <View style={styles.vatItem}>
                <Text style={styles.vatLabel}>VAT Paid</Text>
                <Text style={styles.vatValue}>
                  -{taxOverview.totalVATPaid.toLocaleString()} SAR
                </Text>
              </View>
              <View style={styles.vatItem}>
                <Text style={styles.vatLabel}>Net VAT</Text>
                <Text style={[styles.vatValue, { color: '#28a745' }]}>
                  {taxOverview.netVAT.toLocaleString()} SAR
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {selectedTab === 'vat' && (
        <View>
          <View style={styles.vatTransactionsCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>VAT Transactions</Text>
              <TouchableOpacity style={styles.addButton}>
                <Ionicons name="add" size={16} color="#007bff" />
                <Text style={styles.addButtonText}>Add Transaction</Text>
              </TouchableOpacity>
            </View>
            {vatTransactions.map((transaction) => (
              <VatTransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </View>

          <View style={styles.vatFilingCard}>
            <Text style={styles.cardTitle}>VAT Filing</Text>
            <View style={styles.filingInfo}>
              <Text style={styles.filingText}>
                Next VAT return is due on {taxOverview.nextFiling}
              </Text>
              <TouchableOpacity style={styles.fileButton}>
                <Text style={styles.fileButtonText}>File VAT Return</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {selectedTab === 'zatca' && (
        <View>
          <View style={styles.zatcaStatusCard}>
            <Text style={styles.cardTitle}>ZATCA E-Invoicing Status</Text>
            <View style={styles.zatcaStatus}>
              <View style={styles.statusItem}>
                <Ionicons 
                  name={zatcaStatus.connected ? "checkmark-circle" : "close-circle"} 
                  size={20} 
                  color={zatcaStatus.connected ? "#28a745" : "#dc3545"} 
                />
                <Text style={styles.statusLabel}>
                  {zatcaStatus.connected ? 'Connected' : 'Disconnected'}
                </Text>
              </View>
              <View style={styles.statusItem}>
                <Text style={styles.statusLabel}>Last Sync:</Text>
                <Text style={styles.statusValue}>{zatcaStatus.lastSync}</Text>
              </View>
            </View>
          </View>

          <View style={styles.zatcaStatsCard}>
            <Text style={styles.cardTitle}>Invoice Statistics</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{zatcaStatus.invoicesSent}</Text>
                <Text style={styles.statLabel}>Sent</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{zatcaStatus.invoicesAccepted}</Text>
                <Text style={styles.statLabel}>Accepted</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{zatcaStatus.invoicesRejected}</Text>
                <Text style={styles.statLabel}>Rejected</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.syncButton}>
            <Ionicons name="refresh" size={20} color="#ffffff" />
            <Text style={styles.syncButtonText}>Sync with ZATCA</Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedTab === 'certificates' && (
        <View>
          <View style={styles.certificatesCard}>
            <Text style={styles.cardTitle}>Tax Certificates</Text>
            <View style={styles.certificateItem}>
              <Ionicons name="document-text" size={24} color="#007bff" />
              <View style={styles.certificateInfo}>
                <Text style={styles.certificateName}>VAT Registration Certificate</Text>
                <Text style={styles.certificateDate}>Issued: 2024-01-01</Text>
              </View>
              <TouchableOpacity style={styles.downloadButton}>
                <Ionicons name="download" size={16} color="#28a745" />
              </TouchableOpacity>
            </View>
            <View style={styles.certificateItem}>
              <Ionicons name="document-text" size={24} color="#007bff" />
              <View style={styles.certificateInfo}>
                <Text style={styles.certificateName}>ZATCA E-Invoicing Certificate</Text>
                <Text style={styles.certificateDate}>Issued: 2024-01-15</Text>
              </View>
              <TouchableOpacity style={styles.downloadButton}>
                <Ionicons name="download" size={16} color="#28a745" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.uploadButton}>
            <Ionicons name="cloud-upload" size={20} color="#ffffff" />
            <Text style={styles.uploadButtonText}>Upload New Certificate</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          All tax calculations are automatically handled by the system. 
          Ensure your ZATCA e-invoicing is properly configured for compliance.
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  tabButtonActive: {
    backgroundColor: '#007bff',
  },
  tabButtonText: {
    color: '#cccccc',
    fontSize: 14,
    fontWeight: '500',
  },
  tabButtonTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  overviewCard: {
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
  overviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  statusBadge: {
    backgroundColor: '#28a745',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  vatSummaryCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  vatSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vatItem: {
    alignItems: 'center',
    flex: 1,
  },
  vatLabel: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 5,
  },
  vatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  vatTransactionsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
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
    marginBottom: 8,
  },
  transactionDate: {
    fontSize: 14,
    color: '#cccccc',
  },
  transactionType: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  transactionTypeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  transactionAmounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  vatAmount: {
    fontSize: 14,
    color: '#cccccc',
  },
  vatFilingCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  filingInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filingText: {
    fontSize: 16,
    color: '#ffffff',
    flex: 1,
  },
  fileButton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
  fileButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  zatcaStatusCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  zatcaStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 14,
    color: '#cccccc',
    marginLeft: 8,
  },
  statusValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 8,
  },
  zatcaStatsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#cccccc',
  },
  syncButton: {
    backgroundColor: '#007bff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  syncButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  certificatesCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  certificateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  certificateInfo: {
    flex: 1,
    marginLeft: 15,
  },
  certificateName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  certificateDate: {
    fontSize: 14,
    color: '#cccccc',
  },
  downloadButton: {
    backgroundColor: '#28a745',
    padding: 8,
    borderRadius: 6,
  },
  uploadButton: {
    backgroundColor: '#ffc107',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  uploadButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
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

export default TaxComplianceScreen;

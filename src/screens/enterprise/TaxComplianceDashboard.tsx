import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';

interface TaxSummary {
  id: string;
  period: string;
  totalRevenue: number;
  vatCollected: number;
  vatPaid: number;
  netVat: number;
  status: 'compliant' | 'pending' | 'overdue';
  dueDate: string;
}

interface TaxDocument {
  id: string;
  name: string;
  type: 'vat_return' | 'invoice' | 'receipt' | 'certificate';
  period: string;
  amount: number;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  dueDate: string;
  downloadUrl: string;
}

interface ComplianceAlert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  dueDate: string;
  actionRequired: string;
}

const TaxComplianceDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [selectedTab, setSelectedTab] = useState('overview');

  const periods = [
    { id: 'current', name: 'Current Quarter', active: true },
    { id: 'previous', name: 'Previous Quarter', active: false },
    { id: 'year', name: 'Current Year', active: false },
  ];

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'documents', name: 'Documents' },
    { id: 'alerts', name: 'Alerts' },
    { id: 'reports', name: 'Reports' },
  ];

  const taxSummaries: TaxSummary[] = [
    {
      id: '1',
      period: 'Q4 2024',
      totalRevenue: 1250000,
      vatCollected: 187500,
      vatPaid: 150000,
      netVat: 37500,
      status: 'compliant',
      dueDate: '2025-01-31',
    },
    {
      id: '2',
      period: 'Q3 2024',
      totalRevenue: 1100000,
      vatCollected: 165000,
      vatPaid: 165000,
      netVat: 0,
      status: 'compliant',
      dueDate: '2024-10-31',
    },
    {
      id: '3',
      period: 'Q2 2024',
      totalRevenue: 980000,
      vatCollected: 147000,
      vatPaid: 147000,
      netVat: 0,
      status: 'compliant',
      dueDate: '2024-07-31',
    },
  ];

  const taxDocuments: TaxDocument[] = [
    {
      id: '1',
      name: 'VAT Return Q4 2024',
      type: 'vat_return',
      period: 'Q4 2024',
      amount: 37500,
      status: 'draft',
      dueDate: '2025-01-31',
      downloadUrl: '/documents/vat-return-q4-2024.pdf',
    },
    {
      id: '2',
      name: 'VAT Certificate 2024',
      type: 'certificate',
      period: '2024',
      amount: 0,
      status: 'approved',
      dueDate: '2024-12-31',
      downloadUrl: '/documents/vat-certificate-2024.pdf',
    },
    {
      id: '3',
      name: 'Invoice Summary Q4',
      type: 'invoice',
      period: 'Q4 2024',
      amount: 1250000,
      status: 'submitted',
      dueDate: '2025-01-15',
      downloadUrl: '/documents/invoice-summary-q4.pdf',
    },
  ];

  const complianceAlerts: ComplianceAlert[] = [
    {
      id: '1',
      title: 'VAT Return Due Soon',
      description: 'Q4 2024 VAT return is due in 15 days',
      severity: 'medium',
      dueDate: '2025-01-31',
      actionRequired: 'Submit VAT return',
    },
    {
      id: '2',
      title: 'ZATCA E-Invoicing Update',
      description: 'New e-invoicing requirements effective March 2025',
      severity: 'high',
      dueDate: '2025-03-01',
      actionRequired: 'Update invoicing system',
    },
    {
      id: '3',
      title: 'Tax Certificate Renewal',
      description: 'Annual tax certificate needs renewal',
      severity: 'low',
      dueDate: '2025-06-30',
      actionRequired: 'Renew tax certificate',
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-SA', {
      style: 'currency',
      currency: 'SAR',
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return '#059669';
      case 'pending': return '#d97706';
      case 'overdue': return '#dc2626';
      case 'draft': return '#6b7280';
      case 'submitted': return '#1e3a8a';
      case 'approved': return '#059669';
      case 'rejected': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return '#059669';
      case 'medium': return '#d97706';
      case 'high': return '#dc2626';
      case 'critical': return '#991b1b';
      default: return '#6b7280';
    }
  };

  const renderTaxSummary = ({ item }: { item: TaxSummary }) => (
    <View style={styles.summaryCard}>
      <View style={styles.summaryHeader}>
        <Text style={styles.summaryPeriod}>{item.period}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
      
      <View style={styles.summaryMetrics}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Total Revenue</Text>
          <Text style={styles.metricValue}>{formatCurrency(item.totalRevenue)}</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>VAT Collected</Text>
          <Text style={styles.metricValue}>{formatCurrency(item.vatCollected)}</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>VAT Paid</Text>
          <Text style={styles.metricValue}>{formatCurrency(item.vatPaid)}</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Net VAT</Text>
          <Text style={[styles.metricValue, { color: item.netVat >= 0 ? '#059669' : '#dc2626' }]}>
            {formatCurrency(item.netVat)}
          </Text>
        </View>
      </View>
      
      <Text style={styles.dueDate}>Due: {new Date(item.dueDate).toLocaleDateString()}</Text>
    </View>
  );

  const renderTaxDocument = ({ item }: { item: TaxDocument }) => (
    <View style={styles.documentCard}>
      <View style={styles.documentHeader}>
        <Text style={styles.documentName}>{item.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
      
      <Text style={styles.documentPeriod}>{item.period}</Text>
      
      {item.amount > 0 && (
        <Text style={styles.documentAmount}>{formatCurrency(item.amount)}</Text>
      )}
      
      <View style={styles.documentActions}>
        <Text style={styles.documentDueDate}>Due: {new Date(item.dueDate).toLocaleDateString()}</Text>
        <TouchableOpacity style={styles.downloadButton}>
          <Text style={styles.downloadButtonText}>Download</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderComplianceAlert = ({ item }: { item: ComplianceAlert }) => (
    <View style={styles.alertCard}>
      <View style={styles.alertHeader}>
        <Text style={styles.alertTitle}>{item.title}</Text>
        <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(item.severity) }]}>
          <Text style={styles.severityText}>{item.severity.toUpperCase()}</Text>
        </View>
      </View>
      
      <Text style={styles.alertDescription}>{item.description}</Text>
      
      <View style={styles.alertDetails}>
        <Text style={styles.alertDueDate}>Due: {new Date(item.dueDate).toLocaleDateString()}</Text>
        <Text style={styles.alertAction}>Action: {item.actionRequired}</Text>
      </View>
    </View>
  );

  const renderOverviewTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.overviewSection}>
        <Text style={styles.sectionTitle}>Tax Summary</Text>
        <FlatList
          data={taxSummaries}
          renderItem={renderTaxSummary}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>

      <View style={styles.quickActionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity style={styles.quickActionCard}>
            <Text style={styles.quickActionIcon}>📊</Text>
            <Text style={styles.quickActionTitle}>Submit VAT Return</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionCard}>
            <Text style={styles.quickActionIcon}>📄</Text>
            <Text style={styles.quickActionTitle}>Generate Report</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionCard}>
            <Text style={styles.quickActionIcon}>🔍</Text>
            <Text style={styles.quickActionTitle}>Audit Trail</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionCard}>
            <Text style={styles.quickActionIcon}>⚙️</Text>
            <Text style={styles.quickActionTitle}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderDocumentsTab = () => (
    <View style={styles.tabContent}>
      <FlatList
        data={taxDocuments}
        renderItem={renderTaxDocument}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
  );

  const renderAlertsTab = () => (
    <View style={styles.tabContent}>
      <FlatList
        data={complianceAlerts}
        renderItem={renderComplianceAlert}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
  );

  const renderReportsTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Tax Reports</Text>
      <Text style={styles.comingSoonText}>Advanced reporting features coming soon.</Text>
    </View>
  );

  const renderCurrentTab = () => {
    switch (selectedTab) {
      case 'overview':
        return renderOverviewTab();
      case 'documents':
        return renderDocumentsTab();
      case 'alerts':
        return renderAlertsTab();
      case 'reports':
        return renderReportsTab();
      default:
        return renderOverviewTab();
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tax Compliance Dashboard</Text>
        <Text style={styles.headerSubtitle}>
          Manage your tax obligations and ensure compliance with Saudi regulations
        </Text>
      </View>

      {/* Period Selector */}
      <View style={styles.periodSection}>
        <Text style={styles.sectionTitle}>Reporting Period</Text>
        <View style={styles.periodSelector}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.id}
              style={[
                styles.periodButton,
                selectedPeriod === period.id && styles.selectedPeriodButton
              ]}
              onPress={() => setSelectedPeriod(period.id)}
            >
              <Text style={[
                styles.periodButtonText,
                selectedPeriod === period.id && styles.selectedPeriodButtonText
              ]}>
                {period.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tabButton,
                selectedTab === tab.id && styles.selectedTabButton
              ]}
              onPress={() => setSelectedTab(tab.id)}
            >
              <Text style={[
                styles.tabButtonText,
                selectedTab === tab.id && styles.selectedTabButtonText
              ]}>
                {tab.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Tab Content */}
      {renderCurrentTab()}

      {/* Compliance Status */}
      <View style={styles.complianceSection}>
        <Text style={styles.sectionTitle}>Compliance Status</Text>
        <View style={styles.complianceCard}>
          <View style={styles.complianceHeader}>
            <Text style={styles.complianceTitle}>Overall Compliance</Text>
            <View style={styles.complianceBadge}>
              <Text style={styles.complianceBadgeText}>EXCELLENT</Text>
            </View>
          </View>
          
          <Text style={styles.complianceDescription}>
            Your tax compliance is up to date. All required filings have been submitted 
            and payments are current.
          </Text>
          
          <View style={styles.complianceMetrics}>
            <View style={styles.complianceMetric}>
              <Text style={styles.complianceMetricValue}>100%</Text>
              <Text style={styles.complianceMetricLabel}>Filing Rate</Text>
            </View>
            <View style={styles.complianceMetric}>
              <Text style={styles.complianceMetricValue}>0</Text>
              <Text style={styles.complianceMetricLabel}>Overdue Items</Text>
            </View>
            <View style={styles.complianceMetric}>
              <Text style={styles.complianceMetricValue}>A+</Text>
              <Text style={styles.complianceMetricLabel}>Rating</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Contact Information */}
      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Need Tax Support?</Text>
        <Text style={styles.contactText}>
          Contact our tax compliance team for assistance with VAT returns, 
          e-invoicing, or regulatory questions.
        </Text>
        
        <View style={styles.contactInfo}>
          <Text style={styles.contactItem}>Email: tax@nbcon.pro</Text>
          <Text style={styles.contactItem}>Phone: +966 11 123 4567</Text>
          <Text style={styles.contactItem}>Hours: 9 AM - 6 PM (Saudi Time)</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#1e3a8a',
    padding: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e0e7ff',
    textAlign: 'center',
    lineHeight: 24,
  },
  periodSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 15,
  },
  periodSelector: {
    flexDirection: 'row',
    gap: 10,
  },
  periodButton: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedPeriodButton: {
    backgroundColor: '#1e3a8a',
    borderColor: '#1e3a8a',
  },
  periodButtonText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  selectedPeriodButtonText: {
    color: 'white',
  },
  tabSection: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
  },
  tabButton: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedTabButton: {
    backgroundColor: '#1e3a8a',
    borderColor: '#1e3a8a',
  },
  tabButtonText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  selectedTabButtonText: {
    color: 'white',
  },
  tabContent: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  overviewSection: {
    marginBottom: 30,
  },
  summaryCard: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  summaryPeriod: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  summaryMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  metric: {
    width: '48%',
    marginBottom: 10,
  },
  metricLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  dueDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  quickActionsSection: {
    marginBottom: 20,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  quickActionIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e3a8a',
    textAlign: 'center',
  },
  documentCard: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  documentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  documentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },
  documentPeriod: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 5,
  },
  documentAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 10,
  },
  documentActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  documentDueDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  downloadButton: {
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  downloadButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  alertCard: {
    backgroundColor: '#fef2f2',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  severityText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  alertDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  alertDetails: {
    gap: 4,
  },
  alertDueDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  alertAction: {
    fontSize: 12,
    color: '#dc2626',
    fontWeight: '500',
  },
  comingSoonText: {
    fontSize: 16,
    color: '#6b7280',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
  complianceSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  complianceCard: {
    backgroundColor: '#f0f9ff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bae6fd',
  },
  complianceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  complianceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  complianceBadge: {
    backgroundColor: '#059669',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  complianceBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  complianceDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 15,
    lineHeight: 20,
  },
  complianceMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  complianceMetric: {
    alignItems: 'center',
  },
  complianceMetricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 4,
  },
  complianceMetricLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  contactSection: {
    backgroundColor: '#1e3a8a',
    padding: 30,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  contactText: {
    fontSize: 16,
    color: '#e0e7ff',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  contactInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  contactItem: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
  },
});

export default TaxComplianceDashboard;

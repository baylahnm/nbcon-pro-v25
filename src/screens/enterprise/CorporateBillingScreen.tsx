import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CorporateBillingScreen: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const departments = [
    {
      id: '1',
      name: 'Civil Engineering',
      budget: 2000000,
      spent: 1500000,
      remaining: 500000,
      projects: 8,
      status: 'On Track',
    },
    {
      id: '2',
      name: 'MEP Systems',
      budget: 1500000,
      spent: 1200000,
      remaining: 300000,
      projects: 6,
      status: 'On Track',
    },
    {
      id: '3',
      name: 'BIM Services',
      budget: 1000000,
      spent: 800000,
      remaining: 200000,
      projects: 4,
      status: 'On Track',
    },
    {
      id: '4',
      name: 'Surveying',
      budget: 800000,
      spent: 750000,
      remaining: 50000,
      projects: 3,
      status: 'Over Budget',
    },
  ];

  const invoices = [
    {
      id: 'INV-2024-001',
      department: 'Civil Engineering',
      amount: 250000,
      status: 'Paid',
      dueDate: '2024-01-30',
      project: 'NEOM Smart City Phase 1',
    },
    {
      id: 'INV-2024-002',
      department: 'MEP Systems',
      amount: 180000,
      status: 'Pending',
      dueDate: '2024-02-05',
      project: 'Red Sea Resort Infrastructure',
    },
    {
      id: 'INV-2024-003',
      department: 'BIM Services',
      amount: 120000,
      status: 'Overdue',
      dueDate: '2024-01-25',
      project: 'Qiddiya Entertainment Complex',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Track': return '#28a745';
      case 'Over Budget': return '#dc3545';
      case 'Under Budget': return '#007bff';
      case 'Paid': return '#28a745';
      case 'Pending': return '#ffc107';
      case 'Overdue': return '#dc3545';
      default: return '#6c757d';
    }
  };

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

  const DepartmentCard = ({ department }: { department: any }) => (
    <View style={styles.departmentCard}>
      <View style={styles.departmentHeader}>
        <View style={styles.departmentInfo}>
          <Text style={styles.departmentName}>{department.name}</Text>
          <Text style={styles.departmentProjects}>{department.projects} projects</Text>
        </View>
        <View style={styles.departmentStatus}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(department.status) }]}>
            <Text style={styles.statusText}>{department.status}</Text>
          </View>
        </View>
      </View>

      <View style={styles.budgetInfo}>
        <View style={styles.budgetItem}>
          <Text style={styles.budgetLabel}>Budget</Text>
          <Text style={styles.budgetValue}>{department.budget.toLocaleString()} SAR</Text>
        </View>
        <View style={styles.budgetItem}>
          <Text style={styles.budgetLabel}>Spent</Text>
          <Text style={styles.budgetValue}>{department.spent.toLocaleString()} SAR</Text>
        </View>
        <View style={styles.budgetItem}>
          <Text style={styles.budgetLabel}>Remaining</Text>
          <Text style={[styles.budgetValue, { color: department.remaining > 0 ? '#28a745' : '#dc3545' }]}>
            {department.remaining.toLocaleString()} SAR
          </Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${(department.spent / department.budget) * 100}%`,
                backgroundColor: department.remaining > 0 ? '#007bff' : '#dc3545'
              }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {Math.round((department.spent / department.budget) * 100)}% used
        </Text>
      </View>

      <View style={styles.departmentActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="eye" size={16} color="#007bff" />
          <Text style={styles.actionText}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="document-text" size={16} color="#28a745" />
          <Text style={styles.actionText}>Generate Report</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const InvoiceItem = ({ invoice }: { invoice: any }) => (
    <View style={styles.invoiceItem}>
      <View style={styles.invoiceHeader}>
        <Text style={styles.invoiceId}>{invoice.id}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(invoice.status) }]}>
          <Text style={styles.statusText}>{invoice.status}</Text>
        </View>
      </View>
      <Text style={styles.invoiceDepartment}>{invoice.department}</Text>
      <Text style={styles.invoiceProject}>{invoice.project}</Text>
      <View style={styles.invoiceDetails}>
        <Text style={styles.invoiceAmount}>{invoice.amount.toLocaleString()} SAR</Text>
        <Text style={styles.invoiceDueDate}>Due: {invoice.dueDate}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Corporate Billing</Text>
      <Text style={styles.subtitle}>
        Consolidated billing and budget management across departments
      </Text>

      <View style={styles.periodSelector}>
        <PeriodButton period="weekly" label="Weekly" />
        <PeriodButton period="monthly" label="Monthly" />
        <PeriodButton period="quarterly" label="Quarterly" />
        <PeriodButton period="yearly" label="Yearly" />
      </View>

      <View style={styles.overviewCard}>
        <Text style={styles.cardTitle}>Corporate Overview</Text>
        <View style={styles.overviewStats}>
          <View style={styles.overviewStat}>
            <Text style={styles.statLabel}>Total Budget</Text>
            <Text style={styles.statValue}>
              {departments.reduce((sum, dept) => sum + dept.budget, 0).toLocaleString()} SAR
            </Text>
          </View>
          <View style={styles.overviewStat}>
            <Text style={styles.statLabel}>Total Spent</Text>
            <Text style={styles.statValue}>
              {departments.reduce((sum, dept) => sum + dept.spent, 0).toLocaleString()} SAR
            </Text>
          </View>
          <View style={styles.overviewStat}>
            <Text style={styles.statLabel}>Remaining</Text>
            <Text style={[styles.statValue, { color: '#28a745' }]}>
              {departments.reduce((sum, dept) => sum + dept.remaining, 0).toLocaleString()} SAR
            </Text>
          </View>
          <View style={styles.overviewStat}>
            <Text style={styles.statLabel}>Utilization</Text>
            <Text style={styles.statValue}>
              {Math.round((departments.reduce((sum, dept) => sum + dept.spent, 0) / departments.reduce((sum, dept) => sum + dept.budget, 0)) * 100)}%
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.departmentsContainer}>
        <Text style={styles.sectionTitle}>Department Budgets</Text>
        {departments.map((department) => (
          <DepartmentCard key={department.id} department={department} />
        ))}
      </View>

      <View style={styles.invoicesContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Invoices</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        {invoices.map((invoice) => (
          <InvoiceItem key={invoice.id} invoice={invoice} />
        ))}
      </View>

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="document-text" size={24} color="#007bff" />
            <Text style={styles.actionText}>Generate Invoice</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="analytics" size={24} color="#28a745" />
            <Text style={styles.actionText}>Budget Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Billing Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Export Data</Text>
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
    fontSize: 14,
    fontWeight: '500',
  },
  periodButtonTextActive: {
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
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  overviewStat: {
    width: '48%',
    marginBottom: 15,
  },
  statLabel: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  departmentsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  departmentCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  departmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  departmentInfo: {
    flex: 1,
  },
  departmentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  departmentProjects: {
    fontSize: 14,
    color: '#cccccc',
  },
  departmentStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  budgetInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  budgetItem: {
    alignItems: 'center',
    flex: 1,
  },
  budgetLabel: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 5,
  },
  budgetValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#3a3a3a',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#cccccc',
    textAlign: 'center',
  },
  departmentActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#3a3a3a',
  },
  actionText: {
    color: '#ffffff',
    fontSize: 12,
    marginLeft: 4,
  },
  invoicesContainer: {
    marginBottom: 20,
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
  invoiceItem: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  invoiceId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  invoiceDepartment: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 5,
  },
  invoiceProject: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  invoiceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  invoiceAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  invoiceDueDate: {
    fontSize: 14,
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
});

export default CorporateBillingScreen;

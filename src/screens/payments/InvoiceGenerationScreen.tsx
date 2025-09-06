import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const InvoiceGenerationScreen: React.FC = () => {
  const [invoices] = useState([
    {
      id: 'INV-2024-001',
      client: 'Saudi Aramco',
      amount: 15000,
      currency: 'SAR',
      status: 'Paid',
      date: '2024-01-15',
      dueDate: '2024-01-30',
      project: 'Oil Refinery Inspection',
    },
    {
      id: 'INV-2024-002',
      client: 'NEOM City',
      amount: 25000,
      currency: 'SAR',
      status: 'Pending',
      date: '2024-01-20',
      dueDate: '2024-02-05',
      project: 'Smart City Infrastructure',
    },
    {
      id: 'INV-2024-003',
      client: 'Red Sea Global',
      amount: 18000,
      currency: 'SAR',
      status: 'Overdue',
      date: '2024-01-10',
      dueDate: '2024-01-25',
      project: 'Resort Development',
    },
    {
      id: 'INV-2024-004',
      client: 'Qiddiya',
      amount: 12000,
      currency: 'SAR',
      status: 'Draft',
      date: '2024-01-25',
      dueDate: '2024-02-10',
      project: 'Entertainment Complex',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return '#28a745';
      case 'Pending': return '#ffc107';
      case 'Overdue': return '#dc3545';
      case 'Draft': return '#6c757d';
      default: return '#6c757d';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid': return 'checkmark-circle';
      case 'Pending': return 'time';
      case 'Overdue': return 'warning';
      case 'Draft': return 'document-text';
      default: return 'document-text';
    }
  };

  const InvoiceCard = ({ invoice }: { invoice: any }) => (
    <View style={styles.invoiceCard}>
      <View style={styles.invoiceHeader}>
        <View style={styles.invoiceInfo}>
          <Text style={styles.invoiceId}>{invoice.id}</Text>
          <Text style={styles.clientName}>{invoice.client}</Text>
          <Text style={styles.projectName}>{invoice.project}</Text>
        </View>
        <View style={styles.invoiceAmount}>
          <Text style={styles.amount}>{invoice.amount.toLocaleString()} {invoice.currency}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(invoice.status) }]}>
            <Ionicons 
              name={getStatusIcon(invoice.status) as any} 
              size={12} 
              color="#ffffff" 
            />
            <Text style={styles.statusText}>{invoice.status}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.invoiceDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date:</Text>
          <Text style={styles.detailValue}>{invoice.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Due Date:</Text>
          <Text style={styles.detailValue}>{invoice.dueDate}</Text>
        </View>
      </View>

      <View style={styles.invoiceActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="eye" size={16} color="#007bff" />
          <Text style={styles.actionText}>Preview</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="download" size={16} color="#28a745" />
          <Text style={styles.actionText}>Download</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="send" size={16} color="#ffc107" />
          <Text style={styles.actionText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Invoice Generation</Text>
        <TouchableOpacity style={styles.createButton}>
          <Ionicons name="add" size={20} color="#ffffff" />
          <Text style={styles.createButtonText}>Create Invoice</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>4</Text>
          <Text style={styles.statLabel}>Total Invoices</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>70,000</Text>
          <Text style={styles.statLabel}>Total Amount (SAR)</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>1</Text>
          <Text style={styles.statLabel}>Overdue</Text>
        </View>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>All Status</Text>
          <Ionicons name="chevron-down" size={16} color="#007bff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>This Month</Text>
          <Ionicons name="chevron-down" size={16} color="#007bff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={invoices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <InvoiceCard invoice={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.invoiceList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  createButton: {
    backgroundColor: '#007bff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#cccccc',
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: '#2a2a2a',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  filterText: {
    color: '#ffffff',
    fontSize: 14,
    marginRight: 5,
  },
  invoiceList: {
    paddingBottom: 20,
  },
  invoiceCard: {
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
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  invoiceInfo: {
    flex: 1,
  },
  invoiceId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  projectName: {
    fontSize: 14,
    color: '#cccccc',
  },
  invoiceAmount: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  invoiceDetails: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  detailLabel: {
    fontSize: 14,
    color: '#cccccc',
  },
  detailValue: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
  },
  invoiceActions: {
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
});

export default InvoiceGenerationScreen;

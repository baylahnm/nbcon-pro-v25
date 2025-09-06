import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RFPSystemScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('active');

  const rfps = [
    {
      id: 'RFP-2024-001',
      title: 'NEOM Smart City Infrastructure Development',
      client: 'NEOM City',
      budget: 50000000,
      status: 'Open',
      deadline: '2024-03-15',
      submissions: 12,
      category: 'Civil Engineering',
      priority: 'High',
    },
    {
      id: 'RFP-2024-002',
      title: 'Red Sea Resort MEP Systems',
      client: 'Red Sea Global',
      budget: 25000000,
      status: 'Under Review',
      deadline: '2024-02-28',
      submissions: 8,
      category: 'MEP Systems',
      priority: 'Medium',
    },
    {
      id: 'RFP-2024-003',
      title: 'Qiddiya Entertainment Complex Surveying',
      client: 'Qiddiya',
      budget: 15000000,
      status: 'Awarded',
      deadline: '2024-01-30',
      submissions: 15,
      category: 'Surveying',
      priority: 'High',
    },
    {
      id: 'RFP-2024-004',
      title: 'Riyadh Metro Extension BIM Services',
      client: 'Riyadh Metro',
      budget: 30000000,
      status: 'Closed',
      deadline: '2024-01-15',
      submissions: 20,
      category: 'BIM Services',
      priority: 'High',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return '#28a745';
      case 'Under Review': return '#007bff';
      case 'Awarded': return '#ffc107';
      case 'Closed': return '#6c757d';
      default: return '#6c757d';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return '#dc3545';
      case 'Medium': return '#ffc107';
      case 'Low': return '#28a745';
      default: return '#6c757d';
    }
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

  const RFPCard = ({ rfp }: { rfp: any }) => (
    <View style={styles.rfpCard}>
      <View style={styles.rfpHeader}>
        <View style={styles.rfpInfo}>
          <Text style={styles.rfpId}>{rfp.id}</Text>
          <Text style={styles.rfpTitle}>{rfp.title}</Text>
          <Text style={styles.rfpClient}>{rfp.client}</Text>
        </View>
        <View style={styles.rfpStatus}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(rfp.status) }]}>
            <Text style={styles.statusText}>{rfp.status}</Text>
          </View>
          <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(rfp.priority) }]}>
            <Text style={styles.priorityText}>{rfp.priority}</Text>
          </View>
        </View>
      </View>

      <View style={styles.rfpDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Budget:</Text>
          <Text style={styles.detailValue}>{rfp.budget.toLocaleString()} SAR</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Deadline:</Text>
          <Text style={styles.detailValue}>{rfp.deadline}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Submissions:</Text>
          <Text style={styles.detailValue}>{rfp.submissions}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Category:</Text>
          <Text style={styles.detailValue}>{rfp.category}</Text>
        </View>
      </View>

      <View style={styles.rfpActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="eye" size={16} color="#007bff" />
          <Text style={styles.actionText}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="document-text" size={16} color="#28a745" />
          <Text style={styles.actionText}>Submit Proposal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble" size={16} color="#ffc107" />
          <Text style={styles.actionText}>Ask Question</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const filteredRFPs = rfps.filter(rfp => {
    switch (selectedTab) {
      case 'active':
        return rfp.status === 'Open' || rfp.status === 'Under Review';
      case 'awarded':
        return rfp.status === 'Awarded';
      case 'closed':
        return rfp.status === 'Closed';
      case 'all':
        return true;
      default:
        return true;
    }
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>RFP System</Text>
      <Text style={styles.subtitle}>
        Formal bidding process for large enterprise projects
      </Text>

      <View style={styles.tabContainer}>
        <TabButton tab="active" label="Active" />
        <TabButton tab="awarded" label="Awarded" />
        <TabButton tab="closed" label="Closed" />
        <TabButton tab="all" label="All" />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{rfps.length}</Text>
          <Text style={styles.statLabel}>Total RFPs</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {rfps.filter(rfp => rfp.status === 'Open' || rfp.status === 'Under Review').length}
          </Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {rfps.reduce((sum, rfp) => sum + rfp.submissions, 0)}
          </Text>
          <Text style={styles.statLabel}>Total Submissions</Text>
        </View>
      </View>

      <View style={styles.rfpsContainer}>
        {filteredRFPs.length > 0 ? (
          filteredRFPs.map((rfp) => (
            <RFPCard key={rfp.id} rfp={rfp} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="document-text" size={60} color="#6c757d" />
            <Text style={styles.emptyStateTitle}>No RFPs Found</Text>
            <Text style={styles.emptyStateText}>
              No RFPs match the selected criteria
            </Text>
          </View>
        )}
      </View>

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add-circle" size={24} color="#007bff" />
            <Text style={styles.actionText}>Create RFP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="search" size={24} color="#28a745" />
            <Text style={styles.actionText}>Search RFPs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="analytics" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Analytics</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          RFPs are formal requests for proposals from enterprise clients. 
          Submit detailed proposals with technical specifications, timelines, and pricing.
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
  rfpsContainer: {
    marginBottom: 20,
  },
  rfpCard: {
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
  rfpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  rfpInfo: {
    flex: 1,
  },
  rfpId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  rfpTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
    lineHeight: 24,
  },
  rfpClient: {
    fontSize: 14,
    color: '#cccccc',
  },
  rfpStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 5,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  rfpDetails: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#cccccc',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  rfpActions: {
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
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 15,
    marginBottom: 10,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    lineHeight: 24,
  },
  quickActionsCard: {
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

export default RFPSystemScreen;

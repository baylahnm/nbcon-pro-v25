import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PaymentDisputesScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('active');

  const disputes = [
    {
      id: '1',
      project: 'Oil Refinery Inspection',
      client: 'Saudi Aramco',
      amount: 15000,
      reason: 'Quality of work not meeting standards',
      status: 'Under Review',
      date: '2024-01-20',
      priority: 'High',
    },
    {
      id: '2',
      project: 'Smart City Infrastructure',
      client: 'NEOM City',
      amount: 25000,
      reason: 'Delayed delivery',
      status: 'Mediation',
      date: '2024-01-15',
      priority: 'Medium',
    },
    {
      id: '3',
      project: 'Resort Development',
      client: 'Red Sea Global',
      amount: 18000,
      reason: 'Additional work not authorized',
      status: 'Resolved',
      date: '2024-01-10',
      priority: 'Low',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Under Review': return '#ffc107';
      case 'Mediation': return '#007bff';
      case 'Resolved': return '#28a745';
      case 'Escalated': return '#dc3545';
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

  const DisputeCard = ({ dispute }: { dispute: any }) => (
    <View style={styles.disputeCard}>
      <View style={styles.disputeHeader}>
        <View style={styles.disputeInfo}>
          <Text style={styles.projectName}>{dispute.project}</Text>
          <Text style={styles.clientName}>{dispute.client}</Text>
        </View>
        <View style={styles.disputeStatus}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(dispute.status) }]}>
            <Text style={styles.statusText}>{dispute.status}</Text>
          </View>
          <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(dispute.priority) }]}>
            <Text style={styles.priorityText}>{dispute.priority}</Text>
          </View>
        </View>
      </View>

      <View style={styles.disputeDetails}>
        <Text style={styles.disputeReason}>{dispute.reason}</Text>
        <View style={styles.disputeAmount}>
          <Text style={styles.amountLabel}>Disputed Amount:</Text>
          <Text style={styles.amountValue}>{dispute.amount.toLocaleString()} SAR</Text>
        </View>
        <Text style={styles.disputeDate}>Filed: {dispute.date}</Text>
      </View>

      <View style={styles.disputeActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="eye" size={16} color="#007bff" />
          <Text style={styles.actionText}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble" size={16} color="#28a745" />
          <Text style={styles.actionText}>Respond</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="document-text" size={16} color="#ffc107" />
          <Text style={styles.actionText}>Evidence</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const filteredDisputes = disputes.filter(dispute => {
    switch (selectedTab) {
      case 'active':
        return dispute.status === 'Under Review' || dispute.status === 'Mediation';
      case 'resolved':
        return dispute.status === 'Resolved';
      case 'all':
        return true;
      default:
        return true;
    }
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Payment Disputes</Text>
      <Text style={styles.subtitle}>
        Manage and resolve payment disputes with clients and engineers
      </Text>

      <View style={styles.tabContainer}>
        <TabButton tab="active" label="Active" />
        <TabButton tab="resolved" label="Resolved" />
        <TabButton tab="all" label="All" />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>2</Text>
          <Text style={styles.statLabel}>Active Disputes</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>40,000</Text>
          <Text style={styles.statLabel}>Disputed Amount (SAR)</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>1</Text>
          <Text style={styles.statLabel}>Resolved This Month</Text>
        </View>
      </View>

      <View style={styles.disputesContainer}>
        {filteredDisputes.length > 0 ? (
          filteredDisputes.map((dispute) => (
            <DisputeCard key={dispute.id} dispute={dispute} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="checkmark-circle" size={60} color="#28a745" />
            <Text style={styles.emptyStateTitle}>No Disputes</Text>
            <Text style={styles.emptyStateText}>
              {selectedTab === 'active' 
                ? 'No active disputes at the moment'
                : 'No resolved disputes to show'
              }
            </Text>
          </View>
        )}
      </View>

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.quickActionButton}>
            <Ionicons name="add-circle" size={24} color="#007bff" />
            <Text style={styles.quickActionText}>File Dispute</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Ionicons name="people" size={24} color="#28a745" />
            <Text style={styles.quickActionText}>Mediation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Ionicons name="document-text" size={24} color="#ffc107" />
            <Text style={styles.quickActionText}>Evidence</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Ionicons name="help-circle" size={24} color="#dc3545" />
            <Text style={styles.quickActionText}>Help</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.disputeProcessCard}>
        <Text style={styles.cardTitle}>Dispute Resolution Process</Text>
        <View style={styles.processSteps}>
          <View style={styles.processStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Dispute Filed</Text>
              <Text style={styles.stepDescription}>
                Either party files a dispute with evidence
              </Text>
            </View>
          </View>
          <View style={styles.processStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Review Period</Text>
              <Text style={styles.stepDescription}>
                Platform reviews the dispute and evidence
              </Text>
            </View>
          </View>
          <View style={styles.processStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Mediation</Text>
              <Text style={styles.stepDescription}>
                Neutral mediator facilitates resolution
              </Text>
            </View>
          </View>
          <View style={styles.processStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Resolution</Text>
              <Text style={styles.stepDescription}>
                Dispute resolved with final decision
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          Disputes are handled by neutral mediators. All evidence and communications 
          are securely stored and can be used in legal proceedings if needed.
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
  disputesContainer: {
    marginBottom: 20,
  },
  disputeCard: {
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
  disputeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  disputeInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  clientName: {
    fontSize: 14,
    color: '#cccccc',
  },
  disputeStatus: {
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
  disputeDetails: {
    marginBottom: 15,
  },
  disputeReason: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 10,
    lineHeight: 24,
  },
  disputeAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  amountLabel: {
    fontSize: 14,
    color: '#cccccc',
  },
  amountValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  disputeDate: {
    fontSize: 14,
    color: '#cccccc',
  },
  disputeActions: {
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
  quickActionButton: {
    width: '48%',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  quickActionText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  disputeProcessCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  processSteps: {
    marginTop: 15,
  },
  processStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  stepNumberText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  stepDescription: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
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

export default PaymentDisputesScreen;

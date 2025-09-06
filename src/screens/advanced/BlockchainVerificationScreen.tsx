import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BlockchainVerificationScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('projects');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const tabs = [
    { id: 'projects', name: 'Projects', icon: 'folder' },
    { id: 'transactions', name: 'Transactions', icon: 'swap-horizontal' },
    { id: 'certificates', name: 'Certificates', icon: 'ribbon' },
    { id: 'audit', name: 'Audit Trail', icon: 'search' },
  ];

  const statuses = [
    { id: 'all', name: 'All' },
    { id: 'verified', name: 'Verified' },
    { id: 'pending', name: 'Pending' },
    { id: 'failed', name: 'Failed' },
  ];

  const projects = [
    {
      id: '1',
      name: 'Riyadh Metro Station Design',
      hash: '0x1a2b3c4d5e6f7890abcdef1234567890',
      status: 'Verified',
      verifiedAt: '2024-01-25 14:30:15',
      blocks: 15,
      transactions: 8,
      certificates: 3,
      lastUpdate: '2024-01-25 16:45:22',
    },
    {
      id: '2',
      name: 'NEOM Smart City Infrastructure',
      hash: '0x2b3c4d5e6f7890abcdef1234567890ab',
      status: 'Verified',
      verifiedAt: '2024-01-20 10:15:30',
      blocks: 42,
      transactions: 25,
      certificates: 7,
      lastUpdate: '2024-01-24 09:30:45',
    },
    {
      id: '3',
      name: 'Jeddah Port Expansion',
      hash: '0x3c4d5e6f7890abcdef1234567890abcd',
      status: 'Pending',
      verifiedAt: null,
      blocks: 8,
      transactions: 5,
      certificates: 1,
      lastUpdate: '2024-01-25 12:20:10',
    },
    {
      id: '4',
      name: 'Solar Farm Layout Design',
      hash: '0x4d5e6f7890abcdef1234567890abcdef',
      status: 'Failed',
      verifiedAt: null,
      blocks: 3,
      transactions: 2,
      certificates: 0,
      lastUpdate: '2024-01-23 15:45:33',
    },
  ];

  const transactions = [
    {
      id: '1',
      projectId: '1',
      type: 'Document Upload',
      hash: '0x5e6f7890abcdef1234567890abcdef12',
      status: 'Confirmed',
      timestamp: '2024-01-25 14:30:15',
      gasUsed: 21000,
      blockNumber: 18543210,
      from: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
      to: '0x8ba1f109551bD432803012645Hac136c',
    },
    {
      id: '2',
      projectId: '1',
      type: 'Approval',
      hash: '0x6f7890abcdef1234567890abcdef1234',
      status: 'Confirmed',
      timestamp: '2024-01-25 15:45:22',
      gasUsed: 15000,
      blockNumber: 18543215,
      from: '0x8ba1f109551bD432803012645Hac136c',
      to: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    },
    {
      id: '3',
      projectId: '2',
      type: 'Certificate Issuance',
      hash: '0x7890abcdef1234567890abcdef123456',
      status: 'Pending',
      timestamp: '2024-01-24 09:30:45',
      gasUsed: 0,
      blockNumber: null,
      from: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
      to: '0x8ba1f109551bD432803012645Hac136c',
    },
  ];

  const certificates = [
    {
      id: '1',
      projectId: '1',
      type: 'Quality Assurance',
      hash: '0x890abcdef1234567890abcdef1234567',
      status: 'Issued',
      issuedAt: '2024-01-25 14:30:15',
      validUntil: '2025-01-25 14:30:15',
      issuer: 'NBCON Pro Platform',
      recipient: 'Engineer Ahmed Al-Rashid',
      verified: true,
    },
    {
      id: '2',
      projectId: '1',
      type: 'Compliance',
      hash: '0x90abcdef1234567890abcdef12345678',
      status: 'Issued',
      issuedAt: '2024-01-25 15:45:22',
      validUntil: '2025-01-25 15:45:22',
      issuer: 'Saudi Engineering Council',
      recipient: 'Project Manager Sarah Al-Mansouri',
      verified: true,
    },
    {
      id: '3',
      projectId: '2',
      type: 'Safety Certification',
      hash: '0x0abcdef1234567890abcdef123456789',
      status: 'Pending',
      issuedAt: null,
      validUntil: null,
      issuer: 'Ministry of Labor',
      recipient: 'Safety Engineer Omar Al-Zahrani',
      verified: false,
    },
  ];

  const auditTrail = [
    {
      id: '1',
      action: 'Project Created',
      timestamp: '2024-01-20 10:15:30',
      user: 'Engineer Ahmed Al-Rashid',
      hash: '0x1abcdef1234567890abcdef123456789',
      status: 'Verified',
    },
    {
      id: '2',
      action: 'Document Uploaded',
      timestamp: '2024-01-21 14:30:15',
      user: 'Engineer Ahmed Al-Rashid',
      hash: '0x2abcdef1234567890abcdef123456789',
      status: 'Verified',
    },
    {
      id: '3',
      action: 'Approval Given',
      timestamp: '2024-01-22 09:45:22',
      user: 'Project Manager Sarah Al-Mansouri',
      hash: '0x3abcdef1234567890abcdef123456789',
      status: 'Verified',
    },
    {
      id: '4',
      action: 'Certificate Issued',
      timestamp: '2024-01-23 16:20:10',
      user: 'System Admin',
      hash: '0x4abcdef1234567890abcdef123456789',
      status: 'Verified',
    },
  ];

  const TabButton = ({ tab }: { tab: any }) => (
    <TouchableOpacity
      style={[
        styles.tabButton,
        selectedTab === tab.id && styles.tabButtonSelected
      ]}
      onPress={() => setSelectedTab(tab.id)}
    >
      <Ionicons 
        name={tab.icon as any} 
        size={20} 
        color={selectedTab === tab.id ? '#ffffff' : '#007bff'} 
      />
      <Text style={[
        styles.tabButtonText,
        selectedTab === tab.id && styles.tabButtonTextSelected
      ]}>
        {tab.name}
      </Text>
    </TouchableOpacity>
  );

  const StatusButton = ({ status }: { status: any }) => (
    <TouchableOpacity
      style={[
        styles.statusButton,
        selectedStatus === status.id && styles.statusButtonSelected
      ]}
      onPress={() => setSelectedStatus(status.id)}
    >
      <Text style={[
        styles.statusButtonText,
        selectedStatus === status.id && styles.statusButtonTextSelected
      ]}>
        {status.name}
      </Text>
    </TouchableOpacity>
  );

  const ProjectItem = ({ project }: { project: any }) => (
    <View style={styles.projectItem}>
      <View style={styles.projectHeader}>
        <View style={styles.projectInfo}>
          <Text style={styles.projectName}>{project.name}</Text>
          <Text style={styles.projectHash}>{project.hash}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: project.status === 'Verified' ? '#28a745' : 
                           project.status === 'Pending' ? '#ffc107' : '#dc3545'
          }
        ]}>
          <Text style={styles.statusText}>{project.status}</Text>
        </View>
      </View>
      
      <View style={styles.projectStats}>
        <View style={styles.projectStat}>
          <Text style={styles.projectStatValue}>{project.blocks}</Text>
          <Text style={styles.projectStatLabel}>Blocks</Text>
        </View>
        <View style={styles.projectStat}>
          <Text style={styles.projectStatValue}>{project.transactions}</Text>
          <Text style={styles.projectStatLabel}>Transactions</Text>
        </View>
        <View style={styles.projectStat}>
          <Text style={styles.projectStatValue}>{project.certificates}</Text>
          <Text style={styles.projectStatLabel}>Certificates</Text>
        </View>
      </View>

      <View style={styles.projectMeta}>
        <Text style={styles.projectMetaText}>
          Verified: {project.verifiedAt || 'Not verified'}
        </Text>
        <Text style={styles.projectMetaText}>
          Last Update: {project.lastUpdate}
        </Text>
      </View>
    </View>
  );

  const TransactionItem = ({ transaction }: { transaction: any }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionHeader}>
        <Text style={styles.transactionType}>{transaction.type}</Text>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: transaction.status === 'Confirmed' ? '#28a745' : 
                           transaction.status === 'Pending' ? '#ffc107' : '#dc3545'
          }
        ]}>
          <Text style={styles.statusText}>{transaction.status}</Text>
        </View>
      </View>
      
      <Text style={styles.transactionHash}>{transaction.hash}</Text>
      
      <View style={styles.transactionDetails}>
        <View style={styles.transactionDetail}>
          <Text style={styles.transactionDetailLabel}>Block:</Text>
          <Text style={styles.transactionDetailValue}>
            {transaction.blockNumber || 'Pending'}
          </Text>
        </View>
        <View style={styles.transactionDetail}>
          <Text style={styles.transactionDetailLabel}>Gas Used:</Text>
          <Text style={styles.transactionDetailValue}>{transaction.gasUsed}</Text>
        </View>
        <View style={styles.transactionDetail}>
          <Text style={styles.transactionDetailLabel}>Time:</Text>
          <Text style={styles.transactionDetailValue}>{transaction.timestamp}</Text>
        </View>
      </View>

      <View style={styles.transactionAddresses}>
        <Text style={styles.addressLabel}>From: {transaction.from}</Text>
        <Text style={styles.addressLabel}>To: {transaction.to}</Text>
      </View>
    </View>
  );

  const CertificateItem = ({ certificate }: { certificate: any }) => (
    <View style={styles.certificateItem}>
      <View style={styles.certificateHeader}>
        <Text style={styles.certificateType}>{certificate.type}</Text>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: certificate.status === 'Issued' ? '#28a745' : '#ffc107'
          }
        ]}>
          <Text style={styles.statusText}>{certificate.status}</Text>
        </View>
      </View>
      
      <Text style={styles.certificateHash}>{certificate.hash}</Text>
      
      <View style={styles.certificateDetails}>
        <View style={styles.certificateDetail}>
          <Text style={styles.certificateDetailLabel}>Issuer:</Text>
          <Text style={styles.certificateDetailValue}>{certificate.issuer}</Text>
        </View>
        <View style={styles.certificateDetail}>
          <Text style={styles.certificateDetailLabel}>Recipient:</Text>
          <Text style={styles.certificateDetailValue}>{certificate.recipient}</Text>
        </View>
        <View style={styles.certificateDetail}>
          <Text style={styles.certificateDetailLabel}>Issued:</Text>
          <Text style={styles.certificateDetailValue}>
            {certificate.issuedAt || 'Not issued'}
          </Text>
        </View>
        <View style={styles.certificateDetail}>
          <Text style={styles.certificateDetailLabel}>Valid Until:</Text>
          <Text style={styles.certificateDetailValue}>
            {certificate.validUntil || 'Not set'}
          </Text>
        </View>
      </View>

      <View style={styles.certificateVerification}>
        <Ionicons 
          name={certificate.verified ? 'checkmark-circle' : 'close-circle'} 
          size={20} 
          color={certificate.verified ? '#28a745' : '#dc3545'} 
        />
        <Text style={[
          styles.verificationText,
          { color: certificate.verified ? '#28a745' : '#dc3545' }
        ]}>
          {certificate.verified ? 'Verified' : 'Not Verified'}
        </Text>
      </View>
    </View>
  );

  const AuditItem = ({ audit }: { audit: any }) => (
    <View style={styles.auditItem}>
      <View style={styles.auditHeader}>
        <Text style={styles.auditAction}>{audit.action}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: audit.status === 'Verified' ? '#28a745' : '#dc3545' }
        ]}>
          <Text style={styles.statusText}>{audit.status}</Text>
        </View>
      </View>
      
      <Text style={styles.auditHash}>{audit.hash}</Text>
      
      <View style={styles.auditDetails}>
        <Text style={styles.auditUser}>User: {audit.user}</Text>
        <Text style={styles.auditTimestamp}>Time: {audit.timestamp}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Blockchain Verification</Text>
      <Text style={styles.subtitle}>
        Immutable project logs using blockchain technology
      </Text>

      <View style={styles.tabsCard}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tabsContainer}>
            {tabs.map((tab) => (
              <TabButton key={tab.id} tab={tab} />
            ))}
          </View>
        </ScrollView>
      </View>

      {selectedTab === 'projects' && (
        <View style={styles.projectsCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Blockchain Projects</Text>
            <View style={styles.statusFilter}>
              {statuses.map((status) => (
                <StatusButton key={status.id} status={status} />
              ))}
            </View>
          </View>
          {projects.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </View>
      )}

      {selectedTab === 'transactions' && (
        <View style={styles.transactionsCard}>
          <Text style={styles.cardTitle}>Blockchain Transactions</Text>
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </View>
      )}

      {selectedTab === 'certificates' && (
        <View style={styles.certificatesCard}>
          <Text style={styles.cardTitle}>Digital Certificates</Text>
          {certificates.map((certificate) => (
            <CertificateItem key={certificate.id} certificate={certificate} />
          ))}
        </View>
      )}

      {selectedTab === 'audit' && (
        <View style={styles.auditCard}>
          <Text style={styles.cardTitle}>Audit Trail</Text>
          {auditTrail.map((audit) => (
            <AuditItem key={audit.id} audit={audit} />
          ))}
        </View>
      )}

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add" size={24} color="#007bff" />
            <Text style={styles.actionText}>New Project</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="search" size={24} color="#28a745" />
            <Text style={styles.actionText}>Verify Hash</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="ribbon" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Issue Certificate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Export Data</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          Blockchain verification ensures project integrity and provides immutable 
          records of all project activities, approvals, and certifications.
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
  tabsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
  },
  tabButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    minWidth: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonSelected: {
    backgroundColor: '#007bff',
  },
  tabButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  tabButtonTextSelected: {
    color: '#ffffff',
  },
  projectsCard: {
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
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statusFilter: {
    flexDirection: 'row',
  },
  statusButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 6,
    padding: 6,
    marginLeft: 5,
  },
  statusButtonSelected: {
    backgroundColor: '#007bff',
  },
  statusButtonText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  statusButtonTextSelected: {
    color: '#ffffff',
  },
  projectItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  projectHash: {
    fontSize: 12,
    color: '#007bff',
    fontFamily: 'monospace',
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
  projectStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  projectStat: {
    alignItems: 'center',
  },
  projectStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 2,
  },
  projectStatLabel: {
    fontSize: 10,
    color: '#cccccc',
  },
  projectMeta: {
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  projectMetaText: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 2,
  },
  transactionsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
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
  transactionType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  transactionHash: {
    fontSize: 12,
    color: '#007bff',
    fontFamily: 'monospace',
    marginBottom: 10,
  },
  transactionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  transactionDetail: {
    alignItems: 'center',
  },
  transactionDetailLabel: {
    fontSize: 10,
    color: '#cccccc',
    marginBottom: 2,
  },
  transactionDetailValue: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  transactionAddresses: {
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  addressLabel: {
    fontSize: 10,
    color: '#cccccc',
    marginBottom: 2,
  },
  certificatesCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  certificateItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  certificateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  certificateType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  certificateHash: {
    fontSize: 12,
    color: '#007bff',
    fontFamily: 'monospace',
    marginBottom: 10,
  },
  certificateDetails: {
    marginBottom: 10,
  },
  certificateDetail: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  certificateDetailLabel: {
    fontSize: 12,
    color: '#cccccc',
    width: 80,
  },
  certificateDetailValue: {
    fontSize: 12,
    color: '#ffffff',
    flex: 1,
  },
  certificateVerification: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  verificationText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  auditCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  auditItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  auditHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  auditAction: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  auditHash: {
    fontSize: 12,
    color: '#007bff',
    fontFamily: 'monospace',
    marginBottom: 10,
  },
  auditDetails: {
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  auditUser: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 2,
  },
  auditTimestamp: {
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

export default BlockchainVerificationScreen;

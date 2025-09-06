import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';

interface FraudCase {
  id: string;
  title: string;
  description: string;
  type: 'payment_fraud' | 'identity_theft' | 'fake_profile' | 'money_laundering' | 'account_takeover' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'reported' | 'under_investigation' | 'confirmed' | 'false_positive' | 'resolved' | 'escalated';
  reportedDate: string;
  lastUpdated: string;
  reporter: string;
  suspect: string;
  amount?: number;
  evidence: FraudEvidence[];
  investigation: InvestigationStep[];
  riskScore: number;
}

interface FraudEvidence {
  id: string;
  type: 'transaction' | 'document' | 'image' | 'video' | 'log' | 'communication';
  name: string;
  description: string;
  uploadedDate: string;
  uploadedBy: string;
  relevance: 'high' | 'medium' | 'low';
}

interface InvestigationStep {
  id: string;
  step: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  assignedTo: string;
  dueDate: string;
  completedDate?: string;
  notes?: string;
}

const FraudReviewConsole: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [investigationNotes, setInvestigationNotes] = useState('');

  const [fraudCases, setFraudCases] = useState<FraudCase[]>([
    {
      id: '1',
      title: 'Suspicious payment patterns detected',
      description: 'Multiple small payments from different accounts to same engineer account',
      type: 'payment_fraud',
      severity: 'high',
      status: 'under_investigation',
      reportedDate: '2024-12-14T10:30:00Z',
      lastUpdated: '2024-12-15T14:20:00Z',
      reporter: 'AI Fraud Detection System',
      suspect: 'User ID: 12345',
      amount: 5000,
      riskScore: 85,
      evidence: [
        {
          id: '1',
          type: 'transaction',
          name: 'Payment History Report',
          description: 'Detailed payment history showing suspicious patterns',
          uploadedDate: '2024-12-14T10:35:00Z',
          uploadedBy: 'System',
          relevance: 'high'
        },
        {
          id: '2',
          type: 'log',
          name: 'Account Activity Logs',
          description: 'Login patterns and account activity logs',
          uploadedDate: '2024-12-14T11:00:00Z',
          uploadedBy: 'System',
          relevance: 'medium'
        }
      ],
      investigation: [
        {
          id: '1',
          step: 'Verify account ownership',
          status: 'completed',
          assignedTo: 'Security Team',
          dueDate: '2024-12-15',
          completedDate: '2024-12-15T09:00:00Z',
          notes: 'Account ownership verified through KYC documents'
        },
        {
          id: '2',
          step: 'Analyze payment patterns',
          status: 'in_progress',
          assignedTo: 'Fraud Analyst',
          dueDate: '2024-12-16',
          notes: 'Analyzing payment flow and source accounts'
        },
        {
          id: '3',
          step: 'Contact financial institutions',
          status: 'pending',
          assignedTo: 'Legal Team',
          dueDate: '2024-12-17'
        }
      ]
    },
    {
      id: '2',
      title: 'Fake engineer profile detected',
      description: 'Profile using stolen credentials and fake certificates',
      type: 'fake_profile',
      severity: 'critical',
      status: 'confirmed',
      reportedDate: '2024-12-12T16:45:00Z',
      lastUpdated: '2024-12-13T11:30:00Z',
      reporter: 'Manual Review',
      suspect: 'Profile ID: 67890',
      riskScore: 95,
      evidence: [
        {
          id: '1',
          type: 'document',
          name: 'Certificate Verification Report',
          description: 'Certificates found to be forged',
          uploadedDate: '2024-12-12T17:00:00Z',
          uploadedBy: 'Verification Team',
          relevance: 'high'
        },
        {
          id: '2',
          type: 'image',
          name: 'Profile Photos',
          description: 'Profile photos appear to be stock images',
          uploadedDate: '2024-12-12T17:15:00Z',
          uploadedBy: 'Verification Team',
          relevance: 'high'
        }
      ],
      investigation: [
        {
          id: '1',
          step: 'Verify credentials',
          status: 'completed',
          assignedTo: 'Verification Team',
          dueDate: '2024-12-13',
          completedDate: '2024-12-13T10:00:00Z',
          notes: 'All credentials found to be fraudulent'
        },
        {
          id: '2',
          step: 'Suspend account',
          status: 'completed',
          assignedTo: 'Security Team',
          dueDate: '2024-12-13',
          completedDate: '2024-12-13T11:30:00Z',
          notes: 'Account suspended and flagged for permanent ban'
        }
      ]
    },
    {
      id: '3',
      title: 'Identity theft attempt',
      description: 'User attempting to create account with stolen identity',
      type: 'identity_theft',
      severity: 'high',
      status: 'resolved',
      reportedDate: '2024-12-08T09:15:00Z',
      lastUpdated: '2024-12-10T14:45:00Z',
      reporter: 'KYC Verification System',
      suspect: 'Registration ID: 11111',
      riskScore: 90,
      evidence: [
        {
          id: '1',
          type: 'document',
          name: 'ID Verification Report',
          description: 'National ID verification failed multiple checks',
          uploadedDate: '2024-12-08T09:30:00Z',
          uploadedBy: 'KYC System',
          relevance: 'high'
        }
      ],
      investigation: [
        {
          id: '1',
          step: 'Verify identity documents',
          status: 'completed',
          assignedTo: 'KYC Team',
          dueDate: '2024-12-09',
          completedDate: '2024-12-09T15:00:00Z',
          notes: 'Documents confirmed as stolen'
        },
        {
          id: '2',
          step: 'Block registration',
          status: 'completed',
          assignedTo: 'Security Team',
          dueDate: '2024-12-09',
          completedDate: '2024-12-09T16:00:00Z',
          notes: 'Registration blocked and IP flagged'
        },
        {
          id: '3',
          step: 'Report to authorities',
          status: 'completed',
          assignedTo: 'Legal Team',
          dueDate: '2024-12-10',
          completedDate: '2024-12-10T14:45:00Z',
          notes: 'Case reported to Saudi authorities'
        }
      ]
    }
  ]);

  const fraudTypes = [
    { id: 'all', name: 'All Types', icon: '🔍' },
    { id: 'payment_fraud', name: 'Payment Fraud', icon: '💰' },
    { id: 'identity_theft', name: 'Identity Theft', icon: '🆔' },
    { id: 'fake_profile', name: 'Fake Profile', icon: '👤' },
    { id: 'money_laundering', name: 'Money Laundering', icon: '💸' },
    { id: 'account_takeover', name: 'Account Takeover', icon: '🔐' },
    { id: 'other', name: 'Other', icon: '❓' },
  ];

  const severities = [
    { id: 'all', name: 'All Severities', color: '#6b7280' },
    { id: 'low', name: 'Low', color: '#059669' },
    { id: 'medium', name: 'Medium', color: '#d97706' },
    { id: 'high', name: 'High', color: '#dc2626' },
    { id: 'critical', name: 'Critical', color: '#991b1b' },
  ];

  const statuses = [
    { id: 'all', name: 'All Status', color: '#6b7280' },
    { id: 'reported', name: 'Reported', color: '#d97706' },
    { id: 'under_investigation', name: 'Under Investigation', color: '#1e3a8a' },
    { id: 'confirmed', name: 'Confirmed', color: '#dc2626' },
    { id: 'false_positive', name: 'False Positive', color: '#059669' },
    { id: 'resolved', name: 'Resolved', color: '#059669' },
    { id: 'escalated', name: 'Escalated', color: '#991b1b' },
  ];

  const handleCaseSelect = (caseId: string) => {
    setSelectedCase(caseId);
  };

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
  };

  const handleSeveritySelect = (severityId: string) => {
    setSelectedSeverity(severityId);
  };

  const handleStatusSelect = (statusId: string) => {
    setSelectedStatus(statusId);
  };

  const handleUpdateStatus = (caseId: string, newStatus: string) => {
    setFraudCases(prev =>
      prev.map(fraudCase =>
        fraudCase.id === caseId
          ? { ...fraudCase, status: newStatus as any, lastUpdated: new Date().toISOString() }
          : fraudCase
      )
    );
    Alert.alert('Status Updated', `Fraud case status updated to ${newStatus}.`);
  };

  const handleEscalateCase = (caseId: string) => {
    Alert.alert(
      'Escalate Case',
      'This case will be escalated to senior security team and authorities.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Escalate', 
          style: 'destructive',
          onPress: () => {
            handleUpdateStatus(caseId, 'escalated');
          }
        }
      ]
    );
  };

  const handleAddInvestigationNotes = () => {
    if (!investigationNotes.trim()) {
      Alert.alert('Error', 'Please enter investigation notes.');
      return;
    }

    if (!selectedCase) {
      Alert.alert('Error', 'Please select a case first.');
      return;
    }

    Alert.alert('Notes Added', 'Investigation notes have been added successfully.');
    setInvestigationNotes('');
  };

  const getSeverityColor = (severity: string) => {
    const severityObj = severities.find(s => s.id === severity);
    return severityObj?.color || '#6b7280';
  };

  const getStatusColor = (status: string) => {
    const statusObj = statuses.find(s => s.id === status);
    return statusObj?.color || '#6b7280';
  };

  const getTypeIcon = (type: string) => {
    const typeObj = fraudTypes.find(t => t.id === type);
    return typeObj?.icon || '🔍';
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return '#dc2626';
    if (score >= 60) return '#d97706';
    if (score >= 40) return '#d97706';
    return '#059669';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-SA', {
      style: 'currency',
      currency: 'SAR',
    }).format(amount);
  };

  const filteredCases = fraudCases.filter(fraudCase => {
    const matchesSearch = fraudCase.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         fraudCase.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || selectedType === 'all' || fraudCase.type === selectedType;
    const matchesSeverity = !selectedSeverity || selectedSeverity === 'all' || fraudCase.severity === selectedSeverity;
    const matchesStatus = !selectedStatus || selectedStatus === 'all' || fraudCase.status === selectedStatus;
    return matchesSearch && matchesType && matchesSeverity && matchesStatus;
  });

  const selectedCaseData = fraudCases.find(c => c.id === selectedCase);

  const renderFraudCase = (fraudCase: FraudCase) => (
    <TouchableOpacity
      key={fraudCase.id}
      style={[
        styles.caseCard,
        selectedCase === fraudCase.id && styles.selectedCaseCard
      ]}
      onPress={() => handleCaseSelect(fraudCase.id)}
    >
      <View style={styles.caseHeader}>
        <Text style={styles.caseIcon}>{getTypeIcon(fraudCase.type)}</Text>
        <View style={styles.caseInfo}>
          <Text style={styles.caseTitle}>{fraudCase.title}</Text>
          <Text style={styles.caseReporter}>Reported by: {fraudCase.reporter}</Text>
        </View>
        <View style={styles.caseBadges}>
          <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(fraudCase.severity) }]}>
            <Text style={styles.severityText}>{fraudCase.severity.toUpperCase()}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(fraudCase.status) }]}>
            <Text style={styles.statusText}>{fraudCase.status.toUpperCase()}</Text>
          </View>
        </View>
      </View>
      
      <Text style={styles.caseDescription}>{fraudCase.description}</Text>
      
      <View style={styles.caseDetails}>
        <Text style={styles.caseDetail}>Suspect: {fraudCase.suspect}</Text>
        <Text style={styles.caseDetail}>
          Risk Score: <Text style={[styles.riskScore, { color: getRiskScoreColor(fraudCase.riskScore) }]}>
            {fraudCase.riskScore}%
          </Text>
        </Text>
        {fraudCase.amount && (
          <Text style={styles.caseDetail}>Amount: {formatCurrency(fraudCase.amount)}</Text>
        )}
        <Text style={styles.caseDetail}>
          Reported: {new Date(fraudCase.reportedDate).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderFraudType = (type: any) => (
    <TouchableOpacity
      key={type.id}
      style={[
        styles.typeCard,
        selectedType === type.id && styles.selectedTypeCard
      ]}
      onPress={() => handleTypeSelect(type.id)}
    >
      <Text style={styles.typeIcon}>{type.icon}</Text>
      <Text style={styles.typeName}>{type.name}</Text>
    </TouchableOpacity>
  );

  const renderSeverity = (severity: any) => (
    <TouchableOpacity
      key={severity.id}
      style={[
        styles.severityCard,
        selectedSeverity === severity.id && styles.selectedSeverityCard
      ]}
      onPress={() => handleSeveritySelect(severity.id)}
    >
      <View style={[styles.severityIndicator, { backgroundColor: severity.color }]} />
      <Text style={styles.severityName}>{severity.name}</Text>
    </TouchableOpacity>
  );

  const renderStatus = (status: any) => (
    <TouchableOpacity
      key={status.id}
      style={[
        styles.statusCard,
        selectedStatus === status.id && styles.selectedStatusCard
      ]}
      onPress={() => handleStatusSelect(status.id)}
    >
      <View style={[styles.statusIndicator, { backgroundColor: status.color }]} />
      <Text style={styles.statusName}>{status.name}</Text>
    </TouchableOpacity>
  );

  const renderEvidence = (evidence: FraudEvidence) => (
    <View key={evidence.id} style={styles.evidenceCard}>
      <View style={styles.evidenceHeader}>
        <Text style={styles.evidenceName}>{evidence.name}</Text>
        <View style={[styles.relevanceBadge, { 
          backgroundColor: evidence.relevance === 'high' ? '#dc2626' : 
                          evidence.relevance === 'medium' ? '#d97706' : '#059669' 
        }]}>
          <Text style={styles.relevanceText}>{evidence.relevance.toUpperCase()}</Text>
        </View>
      </View>
      
      <Text style={styles.evidenceDescription}>{evidence.description}</Text>
      
      <View style={styles.evidenceDetails}>
        <Text style={styles.evidenceDetail}>Type: {evidence.type}</Text>
        <Text style={styles.evidenceDetail}>Uploaded by: {evidence.uploadedBy}</Text>
        <Text style={styles.evidenceDetail}>
          Date: {new Date(evidence.uploadedDate).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );

  const renderInvestigationStep = (step: InvestigationStep) => (
    <View key={step.id} style={styles.stepCard}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>{step.step}</Text>
        <View style={[styles.stepStatusBadge, { 
          backgroundColor: step.status === 'completed' ? '#059669' : 
                          step.status === 'in_progress' ? '#1e3a8a' : 
                          step.status === 'failed' ? '#dc2626' : '#6b7280' 
        }]}>
          <Text style={styles.stepStatusText}>{step.status.toUpperCase()}</Text>
        </View>
      </View>
      
      <View style={styles.stepDetails}>
        <Text style={styles.stepDetail}>Assigned to: {step.assignedTo}</Text>
        <Text style={styles.stepDetail}>Due: {new Date(step.dueDate).toLocaleDateString()}</Text>
        {step.completedDate && (
          <Text style={styles.stepDetail}>
            Completed: {new Date(step.completedDate).toLocaleDateString()}
          </Text>
        )}
      </View>
      
      {step.notes && (
        <Text style={styles.stepNotes}>{step.notes}</Text>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Fraud Review Console</Text>
        <Text style={styles.headerSubtitle}>
          Monitor and investigate fraud cases and security threats
        </Text>
      </View>

      {/* Filters */}
      <View style={styles.filtersSection}>
        <Text style={styles.sectionTitle}>Filters</Text>
        
        <View style={styles.searchSection}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search fraud cases..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
        </View>
        
        <View style={styles.typesSection}>
          <Text style={styles.filterTitle}>Fraud Types</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {fraudTypes.map(renderFraudType)}
          </ScrollView>
        </View>
        
        <View style={styles.severitiesSection}>
          <Text style={styles.filterTitle}>Severity</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {severities.map(renderSeverity)}
          </ScrollView>
        </View>
        
        <View style={styles.statusesSection}>
          <Text style={styles.filterTitle}>Status</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {statuses.map(renderStatus)}
          </ScrollView>
        </View>
      </View>

      {/* Fraud Cases List */}
      <View style={styles.casesSection}>
        <Text style={styles.sectionTitle}>Fraud Cases ({filteredCases.length})</Text>
        
        {filteredCases.map(renderFraudCase)}
      </View>

      {/* Case Details */}
      {selectedCaseData && (
        <View style={styles.caseDetailsSection}>
          <Text style={styles.sectionTitle}>Case Details</Text>
          
          <View style={styles.caseDetailsCard}>
            <View style={styles.caseDetailsHeader}>
              <Text style={styles.caseDetailsTitle}>{selectedCaseData.title}</Text>
              <View style={styles.caseDetailsBadges}>
                <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(selectedCaseData.severity) }]}>
                  <Text style={styles.severityText}>{selectedCaseData.severity.toUpperCase()}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(selectedCaseData.status) }]}>
                  <Text style={styles.statusText}>{selectedCaseData.status.toUpperCase()}</Text>
                </View>
              </View>
            </View>
            
            <Text style={styles.caseDetailsDescription}>{selectedCaseData.description}</Text>
            
            <View style={styles.caseDetailsInfo}>
              <Text style={styles.caseDetailsInfoItem}>Reporter: {selectedCaseData.reporter}</Text>
              <Text style={styles.caseDetailsInfoItem}>Suspect: {selectedCaseData.suspect}</Text>
              <Text style={styles.caseDetailsInfoItem}>Type: {selectedCaseData.type}</Text>
              <Text style={styles.caseDetailsInfoItem}>
                Risk Score: <Text style={[styles.riskScore, { color: getRiskScoreColor(selectedCaseData.riskScore) }]}>
                  {selectedCaseData.riskScore}%
                </Text>
              </Text>
              {selectedCaseData.amount && (
                <Text style={styles.caseDetailsInfoItem}>Amount: {formatCurrency(selectedCaseData.amount)}</Text>
              )}
            </View>
            
            <View style={styles.caseActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleUpdateStatus(selectedCaseData.id, 'under_investigation')}
              >
                <Text style={styles.actionButtonText}>Start Investigation</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleUpdateStatus(selectedCaseData.id, 'confirmed')}
              >
                <Text style={styles.actionButtonText}>Confirm Fraud</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.actionButton, styles.escalateButton]}
                onPress={() => handleEscalateCase(selectedCaseData.id)}
              >
                <Text style={styles.escalateButtonText}>Escalate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Evidence */}
      {selectedCaseData && selectedCaseData.evidence.length > 0 && (
        <View style={styles.evidenceSection}>
          <Text style={styles.sectionTitle}>Evidence</Text>
          
          {selectedCaseData.evidence.map(renderEvidence)}
        </View>
      )}

      {/* Investigation Steps */}
      {selectedCaseData && selectedCaseData.investigation.length > 0 && (
        <View style={styles.investigationSection}>
          <Text style={styles.sectionTitle}>Investigation Steps</Text>
          
          {selectedCaseData.investigation.map(renderInvestigationStep)}
        </View>
      )}

      {/* Investigation Notes */}
      {selectedCaseData && (
        <View style={styles.notesSection}>
          <Text style={styles.sectionTitle}>Investigation Notes</Text>
          
          <View style={styles.notesCard}>
            <TextInput
              style={styles.notesInput}
              placeholder="Add investigation notes..."
              value={investigationNotes}
              onChangeText={setInvestigationNotes}
              multiline
              numberOfLines={4}
              placeholderTextColor="#9ca3af"
            />
            
            <TouchableOpacity
              style={styles.addNotesButton}
              onPress={handleAddInvestigationNotes}
            >
              <Text style={styles.addNotesButtonText}>Add Notes</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Statistics */}
      <View style={styles.statisticsSection}>
        <Text style={styles.sectionTitle}>Fraud Statistics</Text>
        
        <View style={styles.statisticsGrid}>
          <View style={styles.statisticCard}>
            <Text style={styles.statisticValue}>{fraudCases.length}</Text>
            <Text style={styles.statisticLabel}>Total Cases</Text>
          </View>
          
          <View style={styles.statisticCard}>
            <Text style={styles.statisticValue}>
              {fraudCases.filter(c => c.status === 'under_investigation').length}
            </Text>
            <Text style={styles.statisticLabel}>Under Investigation</Text>
          </View>
          
          <View style={styles.statisticCard}>
            <Text style={styles.statisticValue}>
              {fraudCases.filter(c => c.status === 'confirmed').length}
            </Text>
            <Text style={styles.statisticLabel}>Confirmed</Text>
          </View>
          
          <View style={styles.statisticCard}>
            <Text style={styles.statisticValue}>
              {fraudCases.filter(c => c.severity === 'critical').length}
            </Text>
            <Text style={styles.statisticLabel}>Critical</Text>
          </View>
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
  filtersSection: {
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
  searchSection: {
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#374151',
  },
  typesSection: {
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  typeCard: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minWidth: 80,
  },
  selectedTypeCard: {
    borderColor: '#1e3a8a',
    borderWidth: 2,
    backgroundColor: '#f0f9ff',
  },
  typeIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  typeName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
  },
  severitiesSection: {
    marginBottom: 20,
  },
  severityCard: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minWidth: 80,
  },
  selectedSeverityCard: {
    borderColor: '#1e3a8a',
    borderWidth: 2,
    backgroundColor: '#f0f9ff',
  },
  severityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 5,
  },
  severityName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
  },
  statusesSection: {
    marginBottom: 10,
  },
  statusCard: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minWidth: 80,
  },
  selectedStatusCard: {
    borderColor: '#1e3a8a',
    borderWidth: 2,
    backgroundColor: '#f0f9ff',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 5,
  },
  statusName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
  },
  casesSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  caseCard: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  selectedCaseCard: {
    borderColor: '#1e3a8a',
    borderWidth: 2,
    backgroundColor: '#f0f9ff',
  },
  caseHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  caseIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  caseInfo: {
    flex: 1,
    marginRight: 10,
  },
  caseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  caseReporter: {
    fontSize: 14,
    color: '#6b7280',
  },
  caseBadges: {
    alignItems: 'flex-end',
  },
  severityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  severityText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  caseDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 10,
    lineHeight: 20,
  },
  caseDetails: {
    gap: 4,
  },
  caseDetail: {
    fontSize: 12,
    color: '#6b7280',
  },
  riskScore: {
    fontWeight: 'bold',
  },
  caseDetailsSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  caseDetailsCard: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  caseDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  caseDetailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
    marginRight: 10,
  },
  caseDetailsBadges: {
    alignItems: 'flex-end',
  },
  caseDetailsDescription: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 15,
    lineHeight: 24,
  },
  caseDetailsInfo: {
    marginBottom: 20,
  },
  caseDetailsInfoItem: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 5,
  },
  caseActions: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  actionButton: {
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  escalateButton: {
    backgroundColor: '#dc2626',
  },
  escalateButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  evidenceSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  evidenceCard: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  evidenceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  evidenceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },
  relevanceBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  relevanceText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  evidenceDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  evidenceDetails: {
    gap: 4,
  },
  evidenceDetail: {
    fontSize: 12,
    color: '#6b7280',
  },
  investigationSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  stepCard: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },
  stepStatusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  stepStatusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  stepDetails: {
    marginBottom: 8,
  },
  stepDetail: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  stepNotes: {
    fontSize: 14,
    color: '#374151',
    fontStyle: 'italic',
  },
  notesSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  notesCard: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  notesInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#374151',
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  addNotesButton: {
    backgroundColor: '#059669',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addNotesButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  statisticsSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  statisticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statisticCard: {
    width: '48%',
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  statisticValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 4,
  },
  statisticLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default FraudReviewConsole;

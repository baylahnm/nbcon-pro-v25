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

interface Dispute {
  id: string;
  title: string;
  description: string;
  type: 'payment' | 'quality' | 'timeline' | 'scope' | 'communication' | 'other';
  status: 'open' | 'under_review' | 'mediation' | 'resolved' | 'closed' | 'escalated';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdDate: string;
  lastUpdated: string;
  parties: {
    client: string;
    engineer: string;
  };
  amount: number;
  mediator?: string;
  resolution?: string;
  evidence: DisputeEvidence[];
  messages: DisputeMessage[];
}

interface DisputeEvidence {
  id: string;
  type: 'document' | 'image' | 'video' | 'audio' | 'message';
  name: string;
  uploadedBy: string;
  uploadedDate: string;
  description: string;
}

interface DisputeMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  isInternal: boolean;
  attachments?: string[];
}

const DisputeResolutionConsole: React.FC = () => {
  const [selectedDispute, setSelectedDispute] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [resolutionText, setResolutionText] = useState('');

  const [disputes, setDisputes] = useState<Dispute[]>([
    {
      id: '1',
      title: 'Payment dispute - Structural analysis project',
      description: 'Client disputes final payment due to quality concerns with structural calculations',
      type: 'payment',
      status: 'under_review',
      priority: 'high',
      createdDate: '2024-12-10T14:30:00Z',
      lastUpdated: '2024-12-15T09:15:00Z',
      parties: {
        client: 'ABC Construction Ltd.',
        engineer: 'John Smith, PE'
      },
      amount: 15000,
      mediator: 'Sarah Johnson',
      evidence: [
        {
          id: '1',
          type: 'document',
          name: 'Structural Analysis Report.pdf',
          uploadedBy: 'John Smith',
          uploadedDate: '2024-12-10T15:00:00Z',
          description: 'Original structural analysis report'
        },
        {
          id: '2',
          type: 'image',
          name: 'Site Photos.jpg',
          uploadedBy: 'ABC Construction',
          uploadedDate: '2024-12-11T10:30:00Z',
          description: 'Photos showing construction issues'
        }
      ],
      messages: [
        {
          id: '1',
          sender: 'ABC Construction Ltd.',
          message: 'The structural analysis provided does not meet our requirements. The calculations appear to be incorrect.',
          timestamp: '2024-12-10T14:30:00Z',
          isInternal: false,
        },
        {
          id: '2',
          sender: 'John Smith',
          message: 'I have reviewed the calculations and they are correct according to Saudi building codes. I can provide additional documentation.',
          timestamp: '2024-12-10T16:45:00Z',
          isInternal: false,
        },
        {
          id: '3',
          sender: 'Sarah Johnson',
          message: 'Internal note: Need to review calculations with senior engineer before making decision.',
          timestamp: '2024-12-11T09:00:00Z',
          isInternal: true,
        }
      ]
    },
    {
      id: '2',
      title: 'Timeline dispute - MEP design project',
      description: 'Engineer claims client delayed project with late document submissions',
      type: 'timeline',
      status: 'mediation',
      priority: 'medium',
      createdDate: '2024-12-08T11:20:00Z',
      lastUpdated: '2024-12-14T16:30:00Z',
      parties: {
        client: 'XYZ Industries',
        engineer: 'Mike Wilson, MEP'
      },
      amount: 25000,
      mediator: 'David Brown',
      evidence: [
        {
          id: '1',
          type: 'message',
          name: 'Email Correspondence',
          uploadedBy: 'Mike Wilson',
          uploadedDate: '2024-12-08T12:00:00Z',
          description: 'Email chain showing document delays'
        }
      ],
      messages: [
        {
          id: '1',
          sender: 'Mike Wilson',
          message: 'The project was delayed due to late submission of required documents by the client.',
          timestamp: '2024-12-08T11:20:00Z',
          isInternal: false,
        },
        {
          id: '2',
          sender: 'XYZ Industries',
          message: 'We provided all documents on time. The engineer should have planned better.',
          timestamp: '2024-12-09T14:15:00Z',
          isInternal: false,
        }
      ]
    },
    {
      id: '3',
      title: 'Quality dispute - Survey work',
      description: 'Client claims survey measurements are inaccurate',
      type: 'quality',
      status: 'resolved',
      priority: 'medium',
      createdDate: '2024-11-25T09:45:00Z',
      lastUpdated: '2024-12-05T13:20:00Z',
      parties: {
        client: 'DEF Properties',
        engineer: 'Lisa Chen, Surveyor'
      },
      amount: 8000,
      mediator: 'Sarah Johnson',
      resolution: 'Survey was re-conducted and found to be accurate. Client was provided with additional verification.',
      evidence: [
        {
          id: '1',
          type: 'document',
          name: 'Survey Report.pdf',
          uploadedBy: 'Lisa Chen',
          uploadedDate: '2024-11-25T10:00:00Z',
          description: 'Original survey report'
        },
        {
          id: '2',
          type: 'document',
          name: 'Re-survey Report.pdf',
          uploadedBy: 'Lisa Chen',
          uploadedDate: '2024-12-03T14:00:00Z',
          description: 'Re-survey verification report'
        }
      ],
      messages: [
        {
          id: '1',
          sender: 'DEF Properties',
          message: 'The survey measurements do not match our site measurements. We need this corrected.',
          timestamp: '2024-11-25T09:45:00Z',
          isInternal: false,
        },
        {
          id: '2',
          sender: 'Lisa Chen',
          message: 'I will re-conduct the survey to verify the measurements.',
          timestamp: '2024-11-26T08:30:00Z',
          isInternal: false,
        },
        {
          id: '3',
          sender: 'Sarah Johnson',
          message: 'Dispute resolved. Re-survey confirmed original measurements were accurate.',
          timestamp: '2024-12-05T13:20:00Z',
          isInternal: false,
        }
      ]
    }
  ]);

  const disputeTypes = [
    { id: 'all', name: 'All Types', icon: '📋' },
    { id: 'payment', name: 'Payment', icon: '💰' },
    { id: 'quality', name: 'Quality', icon: '⭐' },
    { id: 'timeline', name: 'Timeline', icon: '⏰' },
    { id: 'scope', name: 'Scope', icon: '🎯' },
    { id: 'communication', name: 'Communication', icon: '💬' },
    { id: 'other', name: 'Other', icon: '❓' },
  ];

  const disputeStatuses = [
    { id: 'all', name: 'All Status', color: '#6b7280' },
    { id: 'open', name: 'Open', color: '#d97706' },
    { id: 'under_review', name: 'Under Review', color: '#1e3a8a' },
    { id: 'mediation', name: 'Mediation', color: '#7c3aed' },
    { id: 'resolved', name: 'Resolved', color: '#059669' },
    { id: 'closed', name: 'Closed', color: '#6b7280' },
    { id: 'escalated', name: 'Escalated', color: '#dc2626' },
  ];

  const priorities = [
    { id: 'low', name: 'Low', color: '#059669' },
    { id: 'medium', name: 'Medium', color: '#d97706' },
    { id: 'high', name: 'High', color: '#dc2626' },
    { id: 'urgent', name: 'Urgent', color: '#991b1b' },
  ];

  const handleDisputeSelect = (disputeId: string) => {
    setSelectedDispute(disputeId);
  };

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
  };

  const handleStatusSelect = (statusId: string) => {
    setSelectedStatus(statusId);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) {
      Alert.alert('Error', 'Please enter a message.');
      return;
    }

    if (!selectedDispute) {
      Alert.alert('Error', 'Please select a dispute first.');
      return;
    }

    Alert.alert('Message Sent', 'Your message has been sent successfully.');
    setNewMessage('');
  };

  const handleUpdateStatus = (disputeId: string, newStatus: string) => {
    setDisputes(prev =>
      prev.map(dispute =>
        dispute.id === disputeId
          ? { ...dispute, status: newStatus as any, lastUpdated: new Date().toISOString() }
          : dispute
      )
    );
    Alert.alert('Status Updated', `Dispute status updated to ${newStatus}.`);
  };

  const handleAssignMediator = (disputeId: string) => {
    Alert.alert(
      'Assign Mediator',
      'Select a mediator for this dispute.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sarah Johnson', onPress: () => {
          setDisputes(prev =>
            prev.map(dispute =>
              dispute.id === disputeId
                ? { ...dispute, mediator: 'Sarah Johnson', lastUpdated: new Date().toISOString() }
                : dispute
            )
          );
        }},
        { text: 'David Brown', onPress: () => {
          setDisputes(prev =>
            prev.map(dispute =>
              dispute.id === disputeId
                ? { ...dispute, mediator: 'David Brown', lastUpdated: new Date().toISOString() }
                : dispute
            )
          );
        }},
      ]
    );
  };

  const handleResolveDispute = () => {
    if (!resolutionText.trim()) {
      Alert.alert('Error', 'Please enter a resolution description.');
      return;
    }

    if (!selectedDispute) {
      Alert.alert('Error', 'Please select a dispute first.');
      return;
    }

    setDisputes(prev =>
      prev.map(dispute =>
        dispute.id === selectedDispute
          ? { 
              ...dispute, 
              status: 'resolved' as any, 
              resolution: resolutionText,
              lastUpdated: new Date().toISOString() 
            }
          : dispute
      )
    );
    
    Alert.alert('Dispute Resolved', 'The dispute has been marked as resolved.');
    setResolutionText('');
  };

  const getPriorityColor = (priority: string) => {
    const priorityObj = priorities.find(p => p.id === priority);
    return priorityObj?.color || '#6b7280';
  };

  const getStatusColor = (status: string) => {
    const statusObj = disputeStatuses.find(s => s.id === status);
    return statusObj?.color || '#6b7280';
  };

  const getTypeIcon = (type: string) => {
    const typeObj = disputeTypes.find(t => t.id === type);
    return typeObj?.icon || '📋';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-SA', {
      style: 'currency',
      currency: 'SAR',
    }).format(amount);
  };

  const filteredDisputes = disputes.filter(dispute => {
    const matchesSearch = dispute.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dispute.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || selectedType === 'all' || dispute.type === selectedType;
    const matchesStatus = !selectedStatus || selectedStatus === 'all' || dispute.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const selectedDisputeData = disputes.find(d => d.id === selectedDispute);

  const renderDispute = (dispute: Dispute) => (
    <TouchableOpacity
      key={dispute.id}
      style={[
        styles.disputeCard,
        selectedDispute === dispute.id && styles.selectedDisputeCard
      ]}
      onPress={() => handleDisputeSelect(dispute.id)}
    >
      <View style={styles.disputeHeader}>
        <Text style={styles.disputeIcon}>{getTypeIcon(dispute.type)}</Text>
        <View style={styles.disputeInfo}>
          <Text style={styles.disputeTitle}>{dispute.title}</Text>
          <Text style={styles.disputeParties}>
            {dispute.parties.client} vs {dispute.parties.engineer}
          </Text>
        </View>
        <View style={styles.disputeBadges}>
          <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(dispute.priority) }]}>
            <Text style={styles.priorityText}>{dispute.priority.toUpperCase()}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(dispute.status) }]}>
            <Text style={styles.statusText}>{dispute.status.toUpperCase()}</Text>
          </View>
        </View>
      </View>
      
      <Text style={styles.disputeDescription}>{dispute.description}</Text>
      
      <View style={styles.disputeDetails}>
        <Text style={styles.disputeAmount}>Amount: {formatCurrency(dispute.amount)}</Text>
        <Text style={styles.disputeDate}>
          Created: {new Date(dispute.createdDate).toLocaleDateString()}
        </Text>
        {dispute.mediator && (
          <Text style={styles.disputeMediator}>Mediator: {dispute.mediator}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderDisputeType = (type: any) => (
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

  const renderDisputeStatus = (status: any) => (
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

  const renderEvidence = (evidence: DisputeEvidence) => (
    <View key={evidence.id} style={styles.evidenceCard}>
      <View style={styles.evidenceHeader}>
        <Text style={styles.evidenceName}>{evidence.name}</Text>
        <Text style={styles.evidenceType}>{evidence.type.toUpperCase()}</Text>
      </View>
      
      <Text style={styles.evidenceDescription}>{evidence.description}</Text>
      
      <View style={styles.evidenceDetails}>
        <Text style={styles.evidenceDetail}>Uploaded by: {evidence.uploadedBy}</Text>
        <Text style={styles.evidenceDetail}>
          Date: {new Date(evidence.uploadedDate).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );

  const renderMessage = (message: DisputeMessage) => (
    <View key={message.id} style={styles.messageCard}>
      <View style={styles.messageHeader}>
        <Text style={styles.messageSender}>{message.sender}</Text>
        <Text style={styles.messageTimestamp}>
          {new Date(message.timestamp).toLocaleString()}
        </Text>
      </View>
      
      <Text style={styles.messageText}>{message.message}</Text>
      
      {message.attachments && message.attachments.length > 0 && (
        <View style={styles.messageAttachments}>
          <Text style={styles.attachmentsTitle}>Attachments:</Text>
          {message.attachments.map((attachment, index) => (
            <Text key={index} style={styles.attachmentItem}>• {attachment}</Text>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dispute Resolution Console</Text>
        <Text style={styles.headerSubtitle}>
          Manage and resolve disputes between clients and engineers
        </Text>
      </View>

      {/* Filters */}
      <View style={styles.filtersSection}>
        <Text style={styles.sectionTitle}>Filters</Text>
        
        <View style={styles.searchSection}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search disputes..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
        </View>
        
        <View style={styles.typesSection}>
          <Text style={styles.filterTitle}>Dispute Types</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {disputeTypes.map(renderDisputeType)}
          </ScrollView>
        </View>
        
        <View style={styles.statusesSection}>
          <Text style={styles.filterTitle}>Status</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {disputeStatuses.map(renderDisputeStatus)}
          </ScrollView>
        </View>
      </View>

      {/* Disputes List */}
      <View style={styles.disputesSection}>
        <Text style={styles.sectionTitle}>Disputes ({filteredDisputes.length})</Text>
        
        {filteredDisputes.map(renderDispute)}
      </View>

      {/* Dispute Details */}
      {selectedDisputeData && (
        <View style={styles.disputeDetailsSection}>
          <Text style={styles.sectionTitle}>Dispute Details</Text>
          
          <View style={styles.disputeDetailsCard}>
            <View style={styles.disputeDetailsHeader}>
              <Text style={styles.disputeDetailsTitle}>{selectedDisputeData.title}</Text>
              <View style={styles.disputeDetailsBadges}>
                <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(selectedDisputeData.priority) }]}>
                  <Text style={styles.priorityText}>{selectedDisputeData.priority.toUpperCase()}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(selectedDisputeData.status) }]}>
                  <Text style={styles.statusText}>{selectedDisputeData.status.toUpperCase()}</Text>
                </View>
              </View>
            </View>
            
            <Text style={styles.disputeDetailsDescription}>{selectedDisputeData.description}</Text>
            
            <View style={styles.disputeDetailsInfo}>
              <Text style={styles.disputeDetailsInfoItem}>
                Client: {selectedDisputeData.parties.client}
              </Text>
              <Text style={styles.disputeDetailsInfoItem}>
                Engineer: {selectedDisputeData.parties.engineer}
              </Text>
              <Text style={styles.disputeDetailsInfoItem}>
                Amount: {formatCurrency(selectedDisputeData.amount)}
              </Text>
              <Text style={styles.disputeDetailsInfoItem}>
                Type: {selectedDisputeData.type}
              </Text>
              {selectedDisputeData.mediator && (
                <Text style={styles.disputeDetailsInfoItem}>
                  Mediator: {selectedDisputeData.mediator}
                </Text>
              )}
            </View>
            
            <View style={styles.disputeActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleAssignMediator(selectedDisputeData.id)}
              >
                <Text style={styles.actionButtonText}>Assign Mediator</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleUpdateStatus(selectedDisputeData.id, 'under_review')}
              >
                <Text style={styles.actionButtonText}>Start Review</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleUpdateStatus(selectedDisputeData.id, 'mediation')}
              >
                <Text style={styles.actionButtonText}>Start Mediation</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Evidence */}
      {selectedDisputeData && selectedDisputeData.evidence.length > 0 && (
        <View style={styles.evidenceSection}>
          <Text style={styles.sectionTitle}>Evidence</Text>
          
          {selectedDisputeData.evidence.map(renderEvidence)}
        </View>
      )}

      {/* Messages */}
      {selectedDisputeData && (
        <View style={styles.messagesSection}>
          <Text style={styles.sectionTitle}>Messages</Text>
          
          {selectedDisputeData.messages.map(renderMessage)}
          
          <View style={styles.newMessageSection}>
            <TextInput
              style={styles.messageInput}
              placeholder="Type your message..."
              value={newMessage}
              onChangeText={setNewMessage}
              multiline
              numberOfLines={3}
              placeholderTextColor="#9ca3af"
            />
            
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSendMessage}
            >
              <Text style={styles.sendButtonText}>Send Message</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Resolution */}
      {selectedDisputeData && selectedDisputeData.status !== 'resolved' && (
        <View style={styles.resolutionSection}>
          <Text style={styles.sectionTitle}>Resolution</Text>
          
          <View style={styles.resolutionCard}>
            <TextInput
              style={styles.resolutionInput}
              placeholder="Enter resolution details..."
              value={resolutionText}
              onChangeText={setResolutionText}
              multiline
              numberOfLines={4}
              placeholderTextColor="#9ca3af"
            />
            
            <TouchableOpacity
              style={styles.resolveButton}
              onPress={handleResolveDispute}
            >
              <Text style={styles.resolveButtonText}>Resolve Dispute</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Statistics */}
      <View style={styles.statisticsSection}>
        <Text style={styles.sectionTitle}>Dispute Statistics</Text>
        
        <View style={styles.statisticsGrid}>
          <View style={styles.statisticCard}>
            <Text style={styles.statisticValue}>{disputes.length}</Text>
            <Text style={styles.statisticLabel}>Total Disputes</Text>
          </View>
          
          <View style={styles.statisticCard}>
            <Text style={styles.statisticValue}>
              {disputes.filter(d => d.status === 'open').length}
            </Text>
            <Text style={styles.statisticLabel}>Open</Text>
          </View>
          
          <View style={styles.statisticCard}>
            <Text style={styles.statisticValue}>
              {disputes.filter(d => d.status === 'under_review').length}
            </Text>
            <Text style={styles.statisticLabel}>Under Review</Text>
          </View>
          
          <View style={styles.statisticCard}>
            <Text style={styles.statisticValue}>
              {disputes.filter(d => d.status === 'resolved').length}
            </Text>
            <Text style={styles.statisticLabel}>Resolved</Text>
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
  disputesSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  disputeCard: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  selectedDisputeCard: {
    borderColor: '#1e3a8a',
    borderWidth: 2,
    backgroundColor: '#f0f9ff',
  },
  disputeHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  disputeIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  disputeInfo: {
    flex: 1,
    marginRight: 10,
  },
  disputeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  disputeParties: {
    fontSize: 14,
    color: '#6b7280',
  },
  disputeBadges: {
    alignItems: 'flex-end',
  },
  priorityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  priorityText: {
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
  disputeDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 10,
    lineHeight: 20,
  },
  disputeDetails: {
    gap: 4,
  },
  disputeAmount: {
    fontSize: 14,
    color: '#059669',
    fontWeight: 'bold',
  },
  disputeDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  disputeMediator: {
    fontSize: 12,
    color: '#1e3a8a',
    fontWeight: '500',
  },
  disputeDetailsSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  disputeDetailsCard: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  disputeDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  disputeDetailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
    marginRight: 10,
  },
  disputeDetailsBadges: {
    alignItems: 'flex-end',
  },
  disputeDetailsDescription: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 15,
    lineHeight: 24,
  },
  disputeDetailsInfo: {
    marginBottom: 20,
  },
  disputeDetailsInfoItem: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 5,
  },
  disputeActions: {
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
  evidenceType: {
    fontSize: 12,
    color: '#6b7280',
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
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
  messagesSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  messageCard: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  messageSender: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  messageTimestamp: {
    fontSize: 12,
    color: '#6b7280',
  },
  messageText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  messageAttachments: {
    marginTop: 8,
  },
  attachmentsTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  attachmentItem: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  newMessageSection: {
    marginTop: 20,
  },
  messageInput: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#374151',
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  sendButton: {
    backgroundColor: '#059669',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resolutionSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  resolutionCard: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  resolutionInput: {
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
  resolveButton: {
    backgroundColor: '#059669',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  resolveButtonText: {
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

export default DisputeResolutionConsole;

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  category: 'technical' | 'billing' | 'account' | 'general' | 'bug_report' | 'feature_request';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed' | 'escalated';
  createdDate: string;
  lastUpdated: string;
  assignedTo?: string;
  requester: string;
  attachments: string[];
  messages: TicketMessage[];
}

interface TicketMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  isInternal: boolean;
  attachments?: string[];
}

const SupportTicketConsole: React.FC = () => {
  const [selectedTicket, setSelectedTicket] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: '1',
      title: 'Payment processing issue',
      description: 'Unable to process payment for job completion',
      category: 'billing',
      priority: 'high',
      status: 'in_progress',
      createdDate: '2024-12-15T10:30:00Z',
      lastUpdated: '2024-12-15T14:20:00Z',
      assignedTo: 'Support Team',
      requester: 'John Smith',
      attachments: ['payment_error.png'],
      messages: [
        {
          id: '1',
          sender: 'John Smith',
          message: 'I\'m unable to process payment for my completed job. The payment button is not responding.',
          timestamp: '2024-12-15T10:30:00Z',
          isInternal: false,
        },
        {
          id: '2',
          sender: 'Support Team',
          message: 'Thank you for reporting this issue. We are investigating the payment processing problem.',
          timestamp: '2024-12-15T11:15:00Z',
          isInternal: false,
        },
        {
          id: '3',
          sender: 'Support Team',
          message: 'Internal note: Payment gateway API is experiencing issues. Escalating to technical team.',
          timestamp: '2024-12-15T11:20:00Z',
          isInternal: true,
        },
      ],
    },
    {
      id: '2',
      title: 'Account verification pending',
      description: 'Account verification has been pending for 3 days',
      category: 'account',
      priority: 'medium',
      status: 'open',
      createdDate: '2024-12-12T09:15:00Z',
      lastUpdated: '2024-12-12T09:15:00Z',
      requester: 'Sarah Johnson',
      attachments: [],
      messages: [
        {
          id: '1',
          sender: 'Sarah Johnson',
          message: 'My account verification has been pending for 3 days. When will it be processed?',
          timestamp: '2024-12-12T09:15:00Z',
          isInternal: false,
        },
      ],
    },
    {
      id: '3',
      title: 'App crashing on iOS',
      description: 'App crashes when opening job details',
      category: 'bug_report',
      priority: 'urgent',
      status: 'escalated',
      createdDate: '2024-12-14T16:45:00Z',
      lastUpdated: '2024-12-15T08:30:00Z',
      assignedTo: 'Development Team',
      requester: 'Mike Wilson',
      attachments: ['crash_log.txt', 'screenshot.png'],
      messages: [
        {
          id: '1',
          sender: 'Mike Wilson',
          message: 'The app crashes every time I try to open job details. This is affecting my work.',
          timestamp: '2024-12-14T16:45:00Z',
          isInternal: false,
        },
        {
          id: '2',
          sender: 'Support Team',
          message: 'We have escalated this to our development team. A fix will be released soon.',
          timestamp: '2024-12-15T08:30:00Z',
          isInternal: false,
        },
      ],
    },
  ]);

  const categories = [
    { id: 'all', name: 'All Categories', icon: '📋' },
    { id: 'technical', name: 'Technical', icon: '🔧' },
    { id: 'billing', name: 'Billing', icon: '💰' },
    { id: 'account', name: 'Account', icon: '👤' },
    { id: 'general', name: 'General', icon: '💬' },
    { id: 'bug_report', name: 'Bug Report', icon: '🐛' },
    { id: 'feature_request', name: 'Feature Request', icon: '💡' },
  ];

  const statuses = [
    { id: 'all', name: 'All Status', color: '#6b7280' },
    { id: 'open', name: 'Open', color: '#d97706' },
    { id: 'in_progress', name: 'In Progress', color: '#1e3a8a' },
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

  const handleTicketSelect = (ticketId: string) => {
    setSelectedTicket(ticketId);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleStatusSelect = (statusId: string) => {
    setSelectedStatus(statusId);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) {
      Alert.alert('Error', 'Please enter a message.');
      return;
    }

    if (!selectedTicket) {
      Alert.alert('Error', 'Please select a ticket first.');
      return;
    }

    // Simulate sending message
    Alert.alert('Message Sent', 'Your message has been sent successfully.');
    setNewMessage('');
  };

  const handleUpdateStatus = (ticketId: string, newStatus: string) => {
    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === ticketId
          ? { ...ticket, status: newStatus as any, lastUpdated: new Date().toISOString() }
          : ticket
      )
    );
    Alert.alert('Status Updated', `Ticket status updated to ${newStatus}.`);
  };

  const handleAssignTicket = (ticketId: string) => {
    Alert.alert(
      'Assign Ticket',
      'Select team member to assign this ticket to.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Support Team', onPress: () => {
          setTickets(prev =>
            prev.map(ticket =>
              ticket.id === ticketId
                ? { ...ticket, assignedTo: 'Support Team', lastUpdated: new Date().toISOString() }
                : ticket
            )
          );
        }},
        { text: 'Development Team', onPress: () => {
          setTickets(prev =>
            prev.map(ticket =>
              ticket.id === ticketId
                ? { ...ticket, assignedTo: 'Development Team', lastUpdated: new Date().toISOString() }
                : ticket
            )
          );
        }},
      ]
    );
  };

  const getPriorityColor = (priority: string) => {
    const priorityObj = priorities.find(p => p.id === priority);
    return priorityObj?.color || '#6b7280';
  };

  const getStatusColor = (status: string) => {
    const statusObj = statuses.find(s => s.id === status);
    return statusObj?.color || '#6b7280';
  };

  const getCategoryIcon = (category: string) => {
    const categoryObj = categories.find(c => c.id === category);
    return categoryObj?.icon || '📋';
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'all' || ticket.category === selectedCategory;
    const matchesStatus = !selectedStatus || selectedStatus === 'all' || ticket.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const selectedTicketData = tickets.find(t => t.id === selectedTicket);

  const renderTicket = (ticket: SupportTicket) => (
    <TouchableOpacity
      key={ticket.id}
      style={[
        styles.ticketCard,
        selectedTicket === ticket.id && styles.selectedTicketCard
      ]}
      onPress={() => handleTicketSelect(ticket.id)}
    >
      <View style={styles.ticketHeader}>
        <Text style={styles.ticketIcon}>{getCategoryIcon(ticket.category)}</Text>
        <View style={styles.ticketInfo}>
          <Text style={styles.ticketTitle}>{ticket.title}</Text>
          <Text style={styles.ticketRequester}>By: {ticket.requester}</Text>
        </View>
        <View style={styles.ticketBadges}>
          <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(ticket.priority) }]}>
            <Text style={styles.priorityText}>{ticket.priority.toUpperCase()}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(ticket.status) }]}>
            <Text style={styles.statusText}>{ticket.status.toUpperCase()}</Text>
          </View>
        </View>
      </View>
      
      <Text style={styles.ticketDescription}>{ticket.description}</Text>
      
      <View style={styles.ticketDetails}>
        <Text style={styles.ticketDetail}>
          Created: {new Date(ticket.createdDate).toLocaleDateString()}
        </Text>
        <Text style={styles.ticketDetail}>
          Updated: {new Date(ticket.lastUpdated).toLocaleDateString()}
        </Text>
        {ticket.assignedTo && (
          <Text style={styles.ticketDetail}>Assigned: {ticket.assignedTo}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderCategory = (category: any) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryCard,
        selectedCategory === category.id && styles.selectedCategoryCard
      ]}
      onPress={() => handleCategorySelect(category.id)}
    >
      <Text style={styles.categoryIcon}>{category.icon}</Text>
      <Text style={styles.categoryName}>{category.name}</Text>
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

  const renderMessage = (message: TicketMessage) => (
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
        <Text style={styles.headerTitle}>Support Ticket Console</Text>
        <Text style={styles.headerSubtitle}>
          Manage and respond to customer support tickets
        </Text>
      </View>

      {/* Filters */}
      <View style={styles.filtersSection}>
        <Text style={styles.sectionTitle}>Filters</Text>
        
        <View style={styles.searchSection}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search tickets..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
        </View>
        
        <View style={styles.categoriesSection}>
          <Text style={styles.filterTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map(renderCategory)}
          </ScrollView>
        </View>
        
        <View style={styles.statusesSection}>
          <Text style={styles.filterTitle}>Status</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {statuses.map(renderStatus)}
          </ScrollView>
        </View>
      </View>

      {/* Tickets List */}
      <View style={styles.ticketsSection}>
        <Text style={styles.sectionTitle}>Support Tickets ({filteredTickets.length})</Text>
        
        {filteredTickets.map(renderTicket)}
      </View>

      {/* Ticket Details */}
      {selectedTicketData && (
        <View style={styles.ticketDetailsSection}>
          <Text style={styles.sectionTitle}>Ticket Details</Text>
          
          <View style={styles.ticketDetailsCard}>
            <View style={styles.ticketDetailsHeader}>
              <Text style={styles.ticketDetailsTitle}>{selectedTicketData.title}</Text>
              <View style={styles.ticketDetailsBadges}>
                <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(selectedTicketData.priority) }]}>
                  <Text style={styles.priorityText}>{selectedTicketData.priority.toUpperCase()}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(selectedTicketData.status) }]}>
                  <Text style={styles.statusText}>{selectedTicketData.status.toUpperCase()}</Text>
                </View>
              </View>
            </View>
            
            <Text style={styles.ticketDetailsDescription}>{selectedTicketData.description}</Text>
            
            <View style={styles.ticketDetailsInfo}>
              <Text style={styles.ticketDetailsInfoItem}>Requester: {selectedTicketData.requester}</Text>
              <Text style={styles.ticketDetailsInfoItem}>Category: {selectedTicketData.category}</Text>
              <Text style={styles.ticketDetailsInfoItem}>
                Created: {new Date(selectedTicketData.createdDate).toLocaleString()}
              </Text>
              {selectedTicketData.assignedTo && (
                <Text style={styles.ticketDetailsInfoItem}>Assigned: {selectedTicketData.assignedTo}</Text>
              )}
            </View>
            
            <View style={styles.ticketActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleAssignTicket(selectedTicketData.id)}
              >
                <Text style={styles.actionButtonText}>Assign</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleUpdateStatus(selectedTicketData.id, 'in_progress')}
              >
                <Text style={styles.actionButtonText}>Start</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleUpdateStatus(selectedTicketData.id, 'resolved')}
              >
                <Text style={styles.actionButtonText}>Resolve</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Messages */}
      {selectedTicketData && (
        <View style={styles.messagesSection}>
          <Text style={styles.sectionTitle}>Messages</Text>
          
          {selectedTicketData.messages.map(renderMessage)}
          
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

      {/* Statistics */}
      <View style={styles.statisticsSection}>
        <Text style={styles.sectionTitle}>Ticket Statistics</Text>
        
        <View style={styles.statisticsGrid}>
          <View style={styles.statisticCard}>
            <Text style={styles.statisticValue}>{tickets.length}</Text>
            <Text style={styles.statisticLabel}>Total Tickets</Text>
          </View>
          
          <View style={styles.statisticCard}>
            <Text style={styles.statisticValue}>
              {tickets.filter(t => t.status === 'open').length}
            </Text>
            <Text style={styles.statisticLabel}>Open</Text>
          </View>
          
          <View style={styles.statisticCard}>
            <Text style={styles.statisticValue}>
              {tickets.filter(t => t.status === 'in_progress').length}
            </Text>
            <Text style={styles.statisticLabel}>In Progress</Text>
          </View>
          
          <View style={styles.statisticCard}>
            <Text style={styles.statisticValue}>
              {tickets.filter(t => t.status === 'resolved').length}
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
  categoriesSection: {
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  categoryCard: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minWidth: 80,
  },
  selectedCategoryCard: {
    borderColor: '#1e3a8a',
    borderWidth: 2,
    backgroundColor: '#f0f9ff',
  },
  categoryIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  categoryName: {
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
  ticketsSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  ticketCard: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  selectedTicketCard: {
    borderColor: '#1e3a8a',
    borderWidth: 2,
    backgroundColor: '#f0f9ff',
  },
  ticketHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  ticketIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  ticketInfo: {
    flex: 1,
    marginRight: 10,
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  ticketRequester: {
    fontSize: 14,
    color: '#6b7280',
  },
  ticketBadges: {
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
  ticketDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 10,
    lineHeight: 20,
  },
  ticketDetails: {
    gap: 4,
  },
  ticketDetail: {
    fontSize: 12,
    color: '#6b7280',
  },
  ticketDetailsSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  ticketDetailsCard: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  ticketDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  ticketDetailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
    marginRight: 10,
  },
  ticketDetailsBadges: {
    alignItems: 'flex-end',
  },
  ticketDetailsDescription: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 15,
    lineHeight: 24,
  },
  ticketDetailsInfo: {
    marginBottom: 20,
  },
  ticketDetailsInfoItem: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 5,
  },
  ticketActions: {
    flexDirection: 'row',
    gap: 10,
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

export default SupportTicketConsole;

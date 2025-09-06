import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CommunicationManagementScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('announcements');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const tabs = [
    { id: 'announcements', name: 'Announcements', icon: 'megaphone' },
    { id: 'templates', name: 'Templates', icon: 'document-text' },
    { id: 'notifications', name: 'Notifications', icon: 'notifications' },
    { id: 'campaigns', name: 'Campaigns', icon: 'mail' },
  ];

  const statuses = [
    { id: 'all', name: 'All' },
    { id: 'active', name: 'Active' },
    { id: 'draft', name: 'Draft' },
    { id: 'scheduled', name: 'Scheduled' },
  ];

  const announcements = [
    {
      id: '1',
      title: 'System Maintenance Notice',
      content: 'Scheduled maintenance will occur on January 26th from 2:00 AM to 4:00 AM KSA time.',
      type: 'System',
      status: 'Active',
      priority: 'High',
      created: '2024-01-25 14:30',
      expires: '2024-01-26 04:00',
      views: 1247,
    },
    {
      id: '2',
      title: 'New Feature Release',
      content: 'We are excited to announce the release of our new AI matching feature!',
      type: 'Feature',
      status: 'Active',
      priority: 'Medium',
      created: '2024-01-24 10:15',
      expires: '2024-02-24 10:15',
      views: 892,
    },
    {
      id: '3',
      title: 'Payment System Update',
      content: 'New payment methods have been added including STC Pay and mada.',
      type: 'Update',
      status: 'Draft',
      priority: 'Low',
      created: '2024-01-25 16:20',
      expires: '2024-02-25 16:20',
      views: 0,
    },
  ];

  const templates = [
    {
      id: '1',
      name: 'Welcome Email',
      type: 'Email',
      status: 'Active',
      lastUsed: '2024-01-25 14:30',
      usage: 156,
      subject: 'Welcome to NBCON Pro!',
    },
    {
      id: '2',
      name: 'Job Match Notification',
      type: 'Push',
      status: 'Active',
      lastUsed: '2024-01-25 13:45',
      usage: 234,
      subject: 'New Job Match Found',
    },
    {
      id: '3',
      name: 'Payment Confirmation',
      type: 'SMS',
      status: 'Inactive',
      lastUsed: '2024-01-20 16:30',
      usage: 89,
      subject: 'Payment Confirmed',
    },
    {
      id: '4',
      name: 'System Alert',
      type: 'Email',
      status: 'Draft',
      lastUsed: 'Never',
      usage: 0,
      subject: 'System Alert',
    },
  ];

  const notificationSettings = {
    email: {
      enabled: true,
      frequency: 'Immediate',
      types: ['Job Matches', 'Payments', 'System Alerts'],
    },
    push: {
      enabled: true,
      frequency: 'Immediate',
      types: ['Job Matches', 'Messages', 'Updates'],
    },
    sms: {
      enabled: false,
      frequency: 'Daily',
      types: ['Payments', 'Security Alerts'],
    },
  };

  const campaigns = [
    {
      id: '1',
      name: 'New User Onboarding',
      type: 'Email',
      status: 'Active',
      recipients: 156,
      sent: 134,
      opened: 89,
      clicked: 45,
      created: '2024-01-20',
    },
    {
      id: '2',
      name: 'Feature Announcement',
      type: 'Push',
      status: 'Scheduled',
      recipients: 8934,
      sent: 0,
      opened: 0,
      clicked: 0,
      created: '2024-01-25',
    },
    {
      id: '3',
      name: 'Payment Reminder',
      type: 'SMS',
      status: 'Completed',
      recipients: 234,
      sent: 234,
      opened: 198,
      clicked: 67,
      created: '2024-01-22',
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

  const AnnouncementItem = ({ announcement }: { announcement: any }) => (
    <View style={styles.announcementItem}>
      <View style={styles.announcementHeader}>
        <View style={styles.announcementInfo}>
          <Text style={styles.announcementTitle}>{announcement.title}</Text>
          <Text style={styles.announcementType}>{announcement.type}</Text>
        </View>
        <View style={styles.announcementStatus}>
          <View style={[
            styles.priorityBadge,
            { 
              backgroundColor: announcement.priority === 'High' ? '#dc3545' : 
                             announcement.priority === 'Medium' ? '#ffc107' : '#28a745'
            }
          ]}>
            <Text style={styles.priorityText}>{announcement.priority}</Text>
          </View>
          <View style={[
            styles.statusBadge,
            { backgroundColor: announcement.status === 'Active' ? '#28a745' : '#ffc107' }
          ]}>
            <Text style={styles.statusText}>{announcement.status}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.announcementContent}>{announcement.content}</Text>
      <View style={styles.announcementMeta}>
        <Text style={styles.announcementViews}>{announcement.views} views</Text>
        <Text style={styles.announcementCreated}>Created: {announcement.created}</Text>
        <Text style={styles.announcementExpires}>Expires: {announcement.expires}</Text>
      </View>
    </View>
  );

  const TemplateItem = ({ template }: { template: any }) => (
    <View style={styles.templateItem}>
      <View style={styles.templateHeader}>
        <View style={styles.templateInfo}>
          <Text style={styles.templateName}>{template.name}</Text>
          <Text style={styles.templateType}>{template.type}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { backgroundColor: template.status === 'Active' ? '#28a745' : '#dc3545' }
        ]}>
          <Text style={styles.statusText}>{template.status}</Text>
        </View>
      </View>
      <Text style={styles.templateSubject}>{template.subject}</Text>
      <View style={styles.templateMeta}>
        <Text style={styles.templateUsage}>Used {template.usage} times</Text>
        <Text style={styles.templateLastUsed}>Last used: {template.lastUsed}</Text>
      </View>
    </View>
  );

  const CampaignItem = ({ campaign }: { campaign: any }) => (
    <View style={styles.campaignItem}>
      <View style={styles.campaignHeader}>
        <Text style={styles.campaignName}>{campaign.name}</Text>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: campaign.status === 'Active' ? '#28a745' : 
                           campaign.status === 'Scheduled' ? '#007bff' : '#ffc107'
          }
        ]}>
          <Text style={styles.statusText}>{campaign.status}</Text>
        </View>
      </View>
      <Text style={styles.campaignType}>{campaign.type}</Text>
      <View style={styles.campaignStats}>
        <View style={styles.campaignStat}>
          <Text style={styles.campaignStatValue}>{campaign.recipients}</Text>
          <Text style={styles.campaignStatLabel}>Recipients</Text>
        </View>
        <View style={styles.campaignStat}>
          <Text style={styles.campaignStatValue}>{campaign.sent}</Text>
          <Text style={styles.campaignStatLabel}>Sent</Text>
        </View>
        <View style={styles.campaignStat}>
          <Text style={styles.campaignStatValue}>{campaign.opened}</Text>
          <Text style={styles.campaignStatLabel}>Opened</Text>
        </View>
        <View style={styles.campaignStat}>
          <Text style={styles.campaignStatValue}>{campaign.clicked}</Text>
          <Text style={styles.campaignStatLabel}>Clicked</Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Communication Management</Text>
      <Text style={styles.subtitle}>
        Manage platform-wide announcements and notification templates
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

      {selectedTab === 'announcements' && (
        <View style={styles.announcementsCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Platform Announcements</Text>
            <View style={styles.statusFilter}>
              {statuses.map((status) => (
                <StatusButton key={status.id} status={status} />
              ))}
            </View>
          </View>
          {announcements.map((announcement) => (
            <AnnouncementItem key={announcement.id} announcement={announcement} />
          ))}
        </View>
      )}

      {selectedTab === 'templates' && (
        <View style={styles.templatesCard}>
          <Text style={styles.cardTitle}>Notification Templates</Text>
          {templates.map((template) => (
            <TemplateItem key={template.id} template={template} />
          ))}
        </View>
      )}

      {selectedTab === 'notifications' && (
        <View style={styles.notificationsCard}>
          <Text style={styles.cardTitle}>Notification Settings</Text>
          <View style={styles.notificationSettings}>
            <View style={styles.notificationType}>
              <Text style={styles.notificationTypeTitle}>Email Notifications</Text>
              <View style={styles.notificationSettings}>
                <Text style={styles.notificationSetting}>Enabled: {notificationSettings.email.enabled ? 'Yes' : 'No'}</Text>
                <Text style={styles.notificationSetting}>Frequency: {notificationSettings.email.frequency}</Text>
                <Text style={styles.notificationSetting}>Types: {notificationSettings.email.types.join(', ')}</Text>
              </View>
            </View>
            <View style={styles.notificationType}>
              <Text style={styles.notificationTypeTitle}>Push Notifications</Text>
              <View style={styles.notificationSettings}>
                <Text style={styles.notificationSetting}>Enabled: {notificationSettings.push.enabled ? 'Yes' : 'No'}</Text>
                <Text style={styles.notificationSetting}>Frequency: {notificationSettings.push.frequency}</Text>
                <Text style={styles.notificationSetting}>Types: {notificationSettings.push.types.join(', ')}</Text>
              </View>
            </View>
            <View style={styles.notificationType}>
              <Text style={styles.notificationTypeTitle}>SMS Notifications</Text>
              <View style={styles.notificationSettings}>
                <Text style={styles.notificationSetting}>Enabled: {notificationSettings.sms.enabled ? 'Yes' : 'No'}</Text>
                <Text style={styles.notificationSetting}>Frequency: {notificationSettings.sms.frequency}</Text>
                <Text style={styles.notificationSetting}>Types: {notificationSettings.sms.types.join(', ')}</Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {selectedTab === 'campaigns' && (
        <View style={styles.campaignsCard}>
          <Text style={styles.cardTitle}>Communication Campaigns</Text>
          {campaigns.map((campaign) => (
            <CampaignItem key={campaign.id} campaign={campaign} />
          ))}
        </View>
      )}

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add" size={24} color="#007bff" />
            <Text style={styles.actionText}>New Announcement</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="document-text" size={24} color="#28a745" />
            <Text style={styles.actionText}>Create Template</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="mail" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Send Campaign</Text>
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
          Communication management allows you to create announcements, manage notification templates, 
          and run communication campaigns to keep users informed and engaged.
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
  announcementsCard: {
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
  announcementItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  announcementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  announcementInfo: {
    flex: 1,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  announcementType: {
    fontSize: 14,
    color: '#cccccc',
  },
  announcementStatus: {
    alignItems: 'flex-end',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 5,
  },
  priorityText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
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
  announcementContent: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 10,
    lineHeight: 20,
  },
  announcementMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  announcementViews: {
    fontSize: 12,
    color: '#007bff',
  },
  announcementCreated: {
    fontSize: 12,
    color: '#cccccc',
  },
  announcementExpires: {
    fontSize: 12,
    color: '#cccccc',
  },
  templatesCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  templateItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  templateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  templateInfo: {
    flex: 1,
  },
  templateName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  templateType: {
    fontSize: 14,
    color: '#cccccc',
  },
  templateSubject: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 10,
  },
  templateMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  templateUsage: {
    fontSize: 12,
    color: '#007bff',
  },
  templateLastUsed: {
    fontSize: 12,
    color: '#cccccc',
  },
  notificationsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  notificationSettings: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
  },
  notificationType: {
    marginBottom: 20,
  },
  notificationTypeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  notificationSetting: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 5,
  },
  campaignsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  campaignItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  campaignHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  campaignName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  campaignType: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 10,
  },
  campaignStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  campaignStat: {
    alignItems: 'center',
  },
  campaignStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 2,
  },
  campaignStatLabel: {
    fontSize: 10,
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

export default CommunicationManagementScreen;

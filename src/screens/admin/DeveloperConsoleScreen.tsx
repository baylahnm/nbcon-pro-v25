import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DeveloperConsoleScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('api-keys');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const tabs = [
    { id: 'api-keys', name: 'API Keys', icon: 'key' },
    { id: 'integrations', name: 'Integrations', icon: 'link' },
    { id: 'webhooks', name: 'Webhooks', icon: 'git-network' },
    { id: 'logs', name: 'Logs', icon: 'document-text' },
  ];

  const statuses = [
    { id: 'all', name: 'All' },
    { id: 'active', name: 'Active' },
    { id: 'inactive', name: 'Inactive' },
    { id: 'expired', name: 'Expired' },
  ];

  const apiKeys = [
    {
      id: '1',
      name: 'Mobile App Production',
      key: 'nbcon_prod_sk_1234567890abcdef',
      status: 'Active',
      permissions: ['read:jobs', 'write:jobs', 'read:users'],
      created: '2024-01-20',
      lastUsed: '2024-01-25 14:30',
      usage: 1247,
    },
    {
      id: '2',
      name: 'Web Dashboard',
      key: 'nbcon_web_sk_abcdef1234567890',
      status: 'Active',
      permissions: ['read:jobs', 'write:jobs', 'read:users', 'write:users'],
      created: '2024-01-15',
      lastUsed: '2024-01-25 13:45',
      usage: 892,
    },
    {
      id: '3',
      name: 'Third Party Integration',
      key: 'nbcon_3rd_sk_9876543210fedcba',
      status: 'Inactive',
      permissions: ['read:jobs'],
      created: '2024-01-10',
      lastUsed: '2024-01-20 16:30',
      usage: 89,
    },
    {
      id: '4',
      name: 'Testing Environment',
      key: 'nbcon_test_sk_test123456789',
      status: 'Expired',
      permissions: ['read:jobs', 'write:jobs'],
      created: '2024-01-01',
      lastUsed: '2024-01-15 10:20',
      usage: 234,
    },
  ];

  const integrations = [
    {
      id: '1',
      name: 'SAP Integration',
      type: 'ERP',
      status: 'Connected',
      lastSync: '2024-01-25 14:30',
      records: 1234,
      errors: 0,
      endpoint: 'https://api.sap.com/nbcon',
    },
    {
      id: '2',
      name: 'Oracle Primavera',
      type: 'Project Management',
      status: 'Connected',
      lastSync: '2024-01-25 13:45',
      records: 567,
      errors: 2,
      endpoint: 'https://api.oracle.com/primavera',
    },
    {
      id: '3',
      name: 'Microsoft Teams',
      type: 'Communication',
      status: 'Disconnected',
      lastSync: '2024-01-20 16:30',
      records: 0,
      errors: 5,
      endpoint: 'https://graph.microsoft.com/v1.0',
    },
    {
      id: '4',
      name: 'Slack Bot',
      type: 'Communication',
      status: 'Connected',
      lastSync: '2024-01-25 12:15',
      records: 89,
      errors: 0,
      endpoint: 'https://hooks.slack.com/services/...',
    },
  ];

  const webhooks = [
    {
      id: '1',
      name: 'Job Status Updates',
      url: 'https://client-system.com/webhooks/job-status',
      events: ['job.created', 'job.updated', 'job.completed'],
      status: 'Active',
      lastTriggered: '2024-01-25 14:30',
      successRate: 98.5,
      failures: 2,
    },
    {
      id: '2',
      name: 'Payment Notifications',
      url: 'https://accounting-system.com/webhooks/payments',
      events: ['payment.completed', 'payment.failed'],
      status: 'Active',
      lastTriggered: '2024-01-25 13:45',
      successRate: 99.2,
      failures: 1,
    },
    {
      id: '3',
      name: 'User Registration',
      url: 'https://crm-system.com/webhooks/users',
      events: ['user.registered', 'user.verified'],
      status: 'Inactive',
      lastTriggered: '2024-01-20 16:30',
      successRate: 95.8,
      failures: 8,
    },
  ];

  const logs = [
    {
      id: '1',
      timestamp: '2024-01-25 14:30:15',
      level: 'INFO',
      service: 'API Gateway',
      message: 'API request processed successfully',
      requestId: 'req_123456789',
      duration: 45,
    },
    {
      id: '2',
      timestamp: '2024-01-25 14:29:32',
      level: 'WARN',
      service: 'Payment Service',
      message: 'Payment processing delayed due to high load',
      requestId: 'req_123456788',
      duration: 1200,
    },
    {
      id: '3',
      timestamp: '2024-01-25 14:28:45',
      level: 'ERROR',
      service: 'Notification Service',
      message: 'Failed to send push notification to user 12345',
      requestId: 'req_123456787',
      duration: 0,
    },
    {
      id: '4',
      timestamp: '2024-01-25 14:27:12',
      level: 'INFO',
      service: 'Job Matching',
      message: 'AI matching algorithm completed for job 67890',
      requestId: 'req_123456786',
      duration: 234,
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

  const ApiKeyItem = ({ apiKey }: { apiKey: any }) => (
    <View style={styles.apiKeyItem}>
      <View style={styles.apiKeyHeader}>
        <View style={styles.apiKeyInfo}>
          <Text style={styles.apiKeyName}>{apiKey.name}</Text>
          <Text style={styles.apiKeyKey}>{apiKey.key}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: apiKey.status === 'Active' ? '#28a745' : 
                           apiKey.status === 'Inactive' ? '#ffc107' : '#dc3545'
          }
        ]}>
          <Text style={styles.statusText}>{apiKey.status}</Text>
        </View>
      </View>
      <View style={styles.apiKeyPermissions}>
        <Text style={styles.permissionsTitle}>Permissions:</Text>
        <View style={styles.permissionsList}>
          {apiKey.permissions.map((permission: string, index: number) => (
            <View key={index} style={styles.permissionTag}>
              <Text style={styles.permissionText}>{permission}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.apiKeyMeta}>
        <Text style={styles.apiKeyUsage}>Used {apiKey.usage} times</Text>
        <Text style={styles.apiKeyCreated}>Created: {apiKey.created}</Text>
        <Text style={styles.apiKeyLastUsed}>Last used: {apiKey.lastUsed}</Text>
      </View>
    </View>
  );

  const IntegrationItem = ({ integration }: { integration: any }) => (
    <View style={styles.integrationItem}>
      <View style={styles.integrationHeader}>
        <View style={styles.integrationInfo}>
          <Text style={styles.integrationName}>{integration.name}</Text>
          <Text style={styles.integrationType}>{integration.type}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: integration.status === 'Connected' ? '#28a745' : '#dc3545'
          }
        ]}>
          <Text style={styles.statusText}>{integration.status}</Text>
        </View>
      </View>
      <Text style={styles.integrationEndpoint}>{integration.endpoint}</Text>
      <View style={styles.integrationStats}>
        <View style={styles.integrationStat}>
          <Text style={styles.integrationStatValue}>{integration.records}</Text>
          <Text style={styles.integrationStatLabel}>Records</Text>
        </View>
        <View style={styles.integrationStat}>
          <Text style={styles.integrationStatValue}>{integration.errors}</Text>
          <Text style={styles.integrationStatLabel}>Errors</Text>
        </View>
        <View style={styles.integrationStat}>
          <Text style={styles.integrationStatValue}>{integration.lastSync}</Text>
          <Text style={styles.integrationStatLabel}>Last Sync</Text>
        </View>
      </View>
    </View>
  );

  const WebhookItem = ({ webhook }: { webhook: any }) => (
    <View style={styles.webhookItem}>
      <View style={styles.webhookHeader}>
        <Text style={styles.webhookName}>{webhook.name}</Text>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: webhook.status === 'Active' ? '#28a745' : '#dc3545'
          }
        ]}>
          <Text style={styles.statusText}>{webhook.status}</Text>
        </View>
      </View>
      <Text style={styles.webhookUrl}>{webhook.url}</Text>
      <View style={styles.webhookEvents}>
        <Text style={styles.eventsTitle}>Events:</Text>
        <View style={styles.eventsList}>
          {webhook.events.map((event: string, index: number) => (
            <View key={index} style={styles.eventTag}>
              <Text style={styles.eventText}>{event}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.webhookStats}>
        <View style={styles.webhookStat}>
          <Text style={styles.webhookStatValue}>{webhook.successRate}%</Text>
          <Text style={styles.webhookStatLabel}>Success Rate</Text>
        </View>
        <View style={styles.webhookStat}>
          <Text style={styles.webhookStatValue}>{webhook.failures}</Text>
          <Text style={styles.webhookStatLabel}>Failures</Text>
        </View>
        <View style={styles.webhookStat}>
          <Text style={styles.webhookStatValue}>{webhook.lastTriggered}</Text>
          <Text style={styles.webhookStatLabel}>Last Triggered</Text>
        </View>
      </View>
    </View>
  );

  const LogItem = ({ log }: { log: any }) => (
    <View style={styles.logItem}>
      <View style={styles.logHeader}>
        <View style={styles.logInfo}>
          <Text style={styles.logTimestamp}>{log.timestamp}</Text>
          <Text style={styles.logService}>{log.service}</Text>
        </View>
        <View style={[
          styles.levelBadge,
          { 
            backgroundColor: log.level === 'ERROR' ? '#dc3545' : 
                           log.level === 'WARN' ? '#ffc107' : '#28a745'
          }
        ]}>
          <Text style={styles.levelText}>{log.level}</Text>
        </View>
      </View>
      <Text style={styles.logMessage}>{log.message}</Text>
      <View style={styles.logMeta}>
        <Text style={styles.logRequestId}>Request ID: {log.requestId}</Text>
        <Text style={styles.logDuration}>Duration: {log.duration}ms</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Developer Console</Text>
      <Text style={styles.subtitle}>
        Admin developer tools for integrations and API keys
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

      {selectedTab === 'api-keys' && (
        <View style={styles.apiKeysCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>API Keys Management</Text>
            <View style={styles.statusFilter}>
              {statuses.map((status) => (
                <StatusButton key={status.id} status={status} />
              ))}
            </View>
          </View>
          {apiKeys.map((apiKey) => (
            <ApiKeyItem key={apiKey.id} apiKey={apiKey} />
          ))}
        </View>
      )}

      {selectedTab === 'integrations' && (
        <View style={styles.integrationsCard}>
          <Text style={styles.cardTitle}>Third-Party Integrations</Text>
          {integrations.map((integration) => (
            <IntegrationItem key={integration.id} integration={integration} />
          ))}
        </View>
      )}

      {selectedTab === 'webhooks' && (
        <View style={styles.webhooksCard}>
          <Text style={styles.cardTitle}>Webhook Endpoints</Text>
          {webhooks.map((webhook) => (
            <WebhookItem key={webhook.id} webhook={webhook} />
          ))}
        </View>
      )}

      {selectedTab === 'logs' && (
        <View style={styles.logsCard}>
          <Text style={styles.cardTitle}>System Logs</Text>
          {logs.map((log) => (
            <LogItem key={log.id} log={log} />
          ))}
        </View>
      )}

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add" size={24} color="#007bff" />
            <Text style={styles.actionText}>New API Key</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="link" size={24} color="#28a745" />
            <Text style={styles.actionText}>Add Integration</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="git-network" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Create Webhook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="refresh" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Refresh Logs</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          The developer console provides tools for managing API keys, integrations, 
          webhooks, and monitoring system logs for debugging and maintenance.
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
  apiKeysCard: {
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
  apiKeyItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  apiKeyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  apiKeyInfo: {
    flex: 1,
  },
  apiKeyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  apiKeyKey: {
    fontSize: 12,
    color: '#cccccc',
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
  apiKeyPermissions: {
    marginBottom: 10,
  },
  permissionsTitle: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 5,
  },
  permissionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  permissionTag: {
    backgroundColor: '#007bff',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 5,
    marginBottom: 5,
  },
  permissionText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  apiKeyMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  apiKeyUsage: {
    fontSize: 12,
    color: '#007bff',
  },
  apiKeyCreated: {
    fontSize: 12,
    color: '#cccccc',
  },
  apiKeyLastUsed: {
    fontSize: 12,
    color: '#cccccc',
  },
  integrationsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  integrationItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  integrationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  integrationInfo: {
    flex: 1,
  },
  integrationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  integrationType: {
    fontSize: 14,
    color: '#cccccc',
  },
  integrationEndpoint: {
    fontSize: 12,
    color: '#007bff',
    marginBottom: 10,
    fontFamily: 'monospace',
  },
  integrationStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  integrationStat: {
    alignItems: 'center',
  },
  integrationStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 2,
  },
  integrationStatLabel: {
    fontSize: 10,
    color: '#cccccc',
  },
  webhooksCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  webhookItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  webhookHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  webhookName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  webhookUrl: {
    fontSize: 12,
    color: '#007bff',
    marginBottom: 10,
    fontFamily: 'monospace',
  },
  webhookEvents: {
    marginBottom: 10,
  },
  eventsTitle: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 5,
  },
  eventsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  eventTag: {
    backgroundColor: '#28a745',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 5,
    marginBottom: 5,
  },
  eventText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  webhookStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  webhookStat: {
    alignItems: 'center',
  },
  webhookStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 2,
  },
  webhookStatLabel: {
    fontSize: 10,
    color: '#cccccc',
  },
  logsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  logItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  logInfo: {
    flex: 1,
  },
  logTimestamp: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 2,
  },
  logService: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  logMessage: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 10,
    lineHeight: 20,
  },
  logMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  logRequestId: {
    fontSize: 12,
    color: '#007bff',
  },
  logDuration: {
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

export default DeveloperConsoleScreen;

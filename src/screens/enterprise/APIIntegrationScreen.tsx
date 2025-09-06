import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const APIIntegrationScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('integrations');

  const integrations = [
    {
      id: '1',
      name: 'SAP ERP',
      description: 'Enterprise resource planning integration',
      status: 'Connected',
      lastSync: '2024-01-25 14:30',
      apiCalls: 1250,
      successRate: 98.5,
      category: 'ERP',
    },
    {
      id: '2',
      name: 'Oracle Primavera',
      description: 'Project management and scheduling',
      status: 'Connected',
      lastSync: '2024-01-25 13:45',
      apiCalls: 890,
      successRate: 99.2,
      category: 'Project Management',
    },
    {
      id: '3',
      name: 'Microsoft Project',
      description: 'Project planning and tracking',
      status: 'Disconnected',
      lastSync: '2024-01-20 09:15',
      apiCalls: 0,
      successRate: 0,
      category: 'Project Management',
    },
    {
      id: '4',
      name: 'AutoCAD API',
      description: 'CAD file processing and analysis',
      status: 'Connected',
      lastSync: '2024-01-25 15:20',
      apiCalls: 2100,
      successRate: 97.8,
      category: 'CAD',
    },
  ];

  const apiKeys = [
    {
      id: '1',
      name: 'SAP Production Key',
      key: 'sk_live_...a1b2c3d4',
      permissions: ['Read', 'Write', 'Delete'],
      lastUsed: '2024-01-25 14:30',
      status: 'Active',
    },
    {
      id: '2',
      name: 'Oracle Test Key',
      key: 'sk_test_...e5f6g7h8',
      permissions: ['Read', 'Write'],
      lastUsed: '2024-01-24 16:45',
      status: 'Active',
    },
    {
      id: '3',
      name: 'AutoCAD API Key',
      key: 'ak_live_...i9j0k1l2',
      permissions: ['Read'],
      lastUsed: '2024-01-25 15:20',
      status: 'Active',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Connected': return '#28a745';
      case 'Disconnected': return '#dc3545';
      case 'Pending': return '#ffc107';
      case 'Active': return '#28a745';
      case 'Inactive': return '#6c757d';
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

  const IntegrationCard = ({ integration }: { integration: any }) => (
    <View style={styles.integrationCard}>
      <View style={styles.integrationHeader}>
        <View style={styles.integrationInfo}>
          <Text style={styles.integrationName}>{integration.name}</Text>
          <Text style={styles.integrationDescription}>{integration.description}</Text>
          <Text style={styles.integrationCategory}>{integration.category}</Text>
        </View>
        <View style={styles.integrationStatus}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(integration.status) }]}>
            <Text style={styles.statusText}>{integration.status}</Text>
          </View>
        </View>
      </View>

      <View style={styles.integrationStats}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>API Calls</Text>
          <Text style={styles.statValue}>{integration.apiCalls.toLocaleString()}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Success Rate</Text>
          <Text style={styles.statValue}>{integration.successRate}%</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Last Sync</Text>
          <Text style={styles.statValue}>{integration.lastSync}</Text>
        </View>
      </View>

      <View style={styles.integrationActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="settings" size={16} color="#007bff" />
          <Text style={styles.actionText}>Configure</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="refresh" size={16} color="#28a745" />
          <Text style={styles.actionText}>Sync Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="analytics" size={16} color="#ffc107" />
          <Text style={styles.actionText}>Logs</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const APIKeyCard = ({ apiKey }: { apiKey: any }) => (
    <View style={styles.apiKeyCard}>
      <View style={styles.apiKeyHeader}>
        <View style={styles.apiKeyInfo}>
          <Text style={styles.apiKeyName}>{apiKey.name}</Text>
          <Text style={styles.apiKeyValue}>{apiKey.key}</Text>
        </View>
        <View style={styles.apiKeyStatus}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(apiKey.status) }]}>
            <Text style={styles.statusText}>{apiKey.status}</Text>
          </View>
        </View>
      </View>

      <View style={styles.permissionsContainer}>
        <Text style={styles.permissionsTitle}>Permissions:</Text>
        <View style={styles.permissionsList}>
          {apiKey.permissions.map((permission: string, index: number) => (
            <View key={index} style={styles.permissionTag}>
              <Text style={styles.permissionText}>{permission}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.apiKeyDetails}>
        <Text style={styles.lastUsed}>Last Used: {apiKey.lastUsed}</Text>
      </View>

      <View style={styles.apiKeyActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="copy" size={16} color="#007bff" />
          <Text style={styles.actionText}>Copy Key</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="create" size={16} color="#28a745" />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="trash" size={16} color="#dc3545" />
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>API Integration</Text>
      <Text style={styles.subtitle}>
        Manage API keys and integrations with external systems
      </Text>

      <View style={styles.tabContainer}>
        <TabButton tab="integrations" label="Integrations" />
        <TabButton tab="keys" label="API Keys" />
        <TabButton tab="logs" label="Logs" />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {integrations.filter(i => i.status === 'Connected').length}
          </Text>
          <Text style={styles.statLabel}>Active Integrations</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {integrations.reduce((sum, i) => sum + i.apiCalls, 0).toLocaleString()}
          </Text>
          <Text style={styles.statLabel}>Total API Calls</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {Math.round(integrations.reduce((sum, i) => sum + i.successRate, 0) / integrations.length)}%
          </Text>
          <Text style={styles.statLabel}>Avg Success Rate</Text>
        </View>
      </View>

      {selectedTab === 'integrations' && (
        <View style={styles.integrationsContainer}>
          <Text style={styles.sectionTitle}>System Integrations</Text>
          {integrations.map((integration) => (
            <IntegrationCard key={integration.id} integration={integration} />
          ))}
        </View>
      )}

      {selectedTab === 'keys' && (
        <View style={styles.keysContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>API Keys</Text>
            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add" size={16} color="#ffffff" />
              <Text style={styles.addButtonText}>Add Key</Text>
            </TouchableOpacity>
          </View>
          {apiKeys.map((apiKey) => (
            <APIKeyCard key={apiKey.id} apiKey={apiKey} />
          ))}
        </View>
      )}

      {selectedTab === 'logs' && (
        <View style={styles.logsContainer}>
          <Text style={styles.sectionTitle}>API Logs</Text>
          <View style={styles.logsPlaceholder}>
            <Ionicons name="document-text" size={60} color="#6c757d" />
            <Text style={styles.logsText}>API Call Logs</Text>
            <Text style={styles.logsSubtext}>View detailed logs of API calls and responses</Text>
          </View>
        </View>
      )}

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add-circle" size={24} color="#007bff" />
            <Text style={styles.actionText}>Add Integration</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="key" size={24} color="#28a745" />
            <Text style={styles.actionText}>Generate Key</Text>
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
          API integrations enable seamless data flow between NBCON Pro and external systems. 
          Monitor performance and manage access through API keys.
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
  integrationsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  integrationCard: {
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
  integrationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  integrationInfo: {
    flex: 1,
  },
  integrationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  integrationDescription: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 5,
  },
  integrationCategory: {
    fontSize: 12,
    color: '#007bff',
  },
  integrationStatus: {
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
  integrationStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  integrationActions: {
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
  keysContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  apiKeyCard: {
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
  apiKeyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  apiKeyInfo: {
    flex: 1,
  },
  apiKeyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  apiKeyValue: {
    fontSize: 14,
    color: '#cccccc',
    fontFamily: 'monospace',
  },
  apiKeyStatus: {
    alignItems: 'flex-end',
  },
  permissionsContainer: {
    marginBottom: 15,
  },
  permissionsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  permissionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  permissionTag: {
    backgroundColor: '#3a3a3a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  permissionText: {
    fontSize: 12,
    color: '#ffffff',
  },
  apiKeyDetails: {
    marginBottom: 15,
  },
  lastUsed: {
    fontSize: 14,
    color: '#cccccc',
  },
  apiKeyActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  logsContainer: {
    marginBottom: 20,
  },
  logsPlaceholder: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
  },
  logsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 15,
    marginBottom: 10,
  },
  logsSubtext: {
    fontSize: 14,
    color: '#cccccc',
    textAlign: 'center',
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

export default APIIntegrationScreen;

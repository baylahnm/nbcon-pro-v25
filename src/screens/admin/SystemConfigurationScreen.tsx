import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SystemConfigurationScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('general');
  const [featureFlags, setFeatureFlags] = useState({
    aiMatching: true,
    videoCalls: true,
    offlineMode: false,
    betaFeatures: false,
    maintenanceMode: false,
  });

  const tabs = [
    { id: 'general', name: 'General', icon: 'settings' },
    { id: 'features', name: 'Features', icon: 'flag' },
    { id: 'api', name: 'API Keys', icon: 'key' },
    { id: 'security', name: 'Security', icon: 'shield' },
    { id: 'notifications', name: 'Notifications', icon: 'notifications' },
  ];

  const systemSettings = {
    appName: 'NBCON Pro',
    version: '1.0.0',
    environment: 'Production',
    maintenanceMode: false,
    maxUsers: 10000,
    maxProjects: 50000,
    dataRetention: 365,
    backupFrequency: 'Daily',
  };

  const apiKeys = [
    {
      id: '1',
      name: 'Payment Gateway',
      key: 'pk_live_****1234',
      status: 'Active',
      lastUsed: '2024-01-25 14:30',
      permissions: ['payments', 'refunds'],
    },
    {
      id: '2',
      name: 'SMS Service',
      key: 'sms_****5678',
      status: 'Active',
      lastUsed: '2024-01-25 13:45',
      permissions: ['notifications'],
    },
    {
      id: '3',
      name: 'Maps Integration',
      key: 'maps_****9012',
      status: 'Inactive',
      lastUsed: '2024-01-20 10:15',
      permissions: ['location'],
    },
  ];

  const securitySettings = {
    twoFactorAuth: true,
    passwordPolicy: 'Strong',
    sessionTimeout: 30,
    ipWhitelist: false,
    auditLogging: true,
    encryptionLevel: 'AES-256',
  };

  const notificationTemplates = [
    {
      id: '1',
      name: 'Welcome Email',
      type: 'Email',
      status: 'Active',
      lastModified: '2024-01-20',
    },
    {
      id: '2',
      name: 'Job Match Notification',
      type: 'Push',
      status: 'Active',
      lastModified: '2024-01-18',
    },
    {
      id: '3',
      name: 'Payment Confirmation',
      type: 'SMS',
      status: 'Inactive',
      lastModified: '2024-01-15',
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

  const SettingItem = ({ title, value, onPress, icon }: { title: string; value: string; onPress?: () => void; icon: string }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingInfo}>
        <Ionicons name={icon as any} size={20} color="#007bff" />
        <Text style={styles.settingTitle}>{title}</Text>
      </View>
      <View style={styles.settingValue}>
        <Text style={styles.settingValueText}>{value}</Text>
        <Ionicons name="chevron-forward" size={16} color="#cccccc" />
      </View>
    </TouchableOpacity>
  );

  const SwitchItem = ({ title, value, onValueChange, icon }: { title: string; value: boolean; onValueChange: (value: boolean) => void; icon: string }) => (
    <View style={styles.switchItem}>
      <View style={styles.switchInfo}>
        <Ionicons name={icon as any} size={20} color="#007bff" />
        <Text style={styles.switchTitle}>{title}</Text>
      </View>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={value ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onValueChange}
        value={value}
      />
    </View>
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
          { backgroundColor: apiKey.status === 'Active' ? '#28a745' : '#dc3545' }
        ]}>
          <Text style={styles.statusText}>{apiKey.status}</Text>
        </View>
      </View>
      <View style={styles.apiKeyDetails}>
        <Text style={styles.apiKeyLastUsed}>Last used: {apiKey.lastUsed}</Text>
        <Text style={styles.apiKeyPermissions}>
          Permissions: {apiKey.permissions.join(', ')}
        </Text>
      </View>
      <View style={styles.apiKeyActions}>
        <TouchableOpacity style={styles.apiKeyAction}>
          <Ionicons name="eye" size={16} color="#007bff" />
          <Text style={styles.apiKeyActionText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.apiKeyAction}>
          <Ionicons name="create" size={16} color="#28a745" />
          <Text style={styles.apiKeyActionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.apiKeyAction}>
          <Ionicons name="refresh" size={16} color="#ffc107" />
          <Text style={styles.apiKeyActionText}>Regenerate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.apiKeyAction}>
          <Ionicons name="trash" size={16} color="#dc3545" />
          <Text style={styles.apiKeyActionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const NotificationTemplateItem = ({ template }: { template: any }) => (
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
      <Text style={styles.templateLastModified}>
        Last modified: {template.lastModified}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>System Configuration</Text>
      <Text style={styles.subtitle}>
        Manage platform-level settings, feature flags, and API keys
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

      {selectedTab === 'general' && (
        <View style={styles.settingsCard}>
          <Text style={styles.cardTitle}>General Settings</Text>
          <SettingItem 
            title="App Name" 
            value={systemSettings.appName} 
            icon="business" 
          />
          <SettingItem 
            title="Version" 
            value={systemSettings.version} 
            icon="information-circle" 
          />
          <SettingItem 
            title="Environment" 
            value={systemSettings.environment} 
            icon="server" 
          />
          <SettingItem 
            title="Max Users" 
            value={systemSettings.maxUsers.toLocaleString()} 
            icon="people" 
          />
          <SettingItem 
            title="Max Projects" 
            value={systemSettings.maxProjects.toLocaleString()} 
            icon="briefcase" 
          />
          <SettingItem 
            title="Data Retention" 
            value={`${systemSettings.dataRetention} days`} 
            icon="time" 
          />
          <SettingItem 
            title="Backup Frequency" 
            value={systemSettings.backupFrequency} 
            icon="cloud-upload" 
          />
        </View>
      )}

      {selectedTab === 'features' && (
        <View style={styles.settingsCard}>
          <Text style={styles.cardTitle}>Feature Flags</Text>
          <SwitchItem 
            title="AI Matching" 
            value={featureFlags.aiMatching} 
            onValueChange={(value) => setFeatureFlags({...featureFlags, aiMatching: value})}
            icon="brain" 
          />
          <SwitchItem 
            title="Video Calls" 
            value={featureFlags.videoCalls} 
            onValueChange={(value) => setFeatureFlags({...featureFlags, videoCalls: value})}
            icon="videocam" 
          />
          <SwitchItem 
            title="Offline Mode" 
            value={featureFlags.offlineMode} 
            onValueChange={(value) => setFeatureFlags({...featureFlags, offlineMode: value})}
            icon="cloud-offline" 
          />
          <SwitchItem 
            title="Beta Features" 
            value={featureFlags.betaFeatures} 
            onValueChange={(value) => setFeatureFlags({...featureFlags, betaFeatures: value})}
            icon="flask" 
          />
          <SwitchItem 
            title="Maintenance Mode" 
            value={featureFlags.maintenanceMode} 
            onValueChange={(value) => setFeatureFlags({...featureFlags, maintenanceMode: value})}
            icon="construct" 
          />
        </View>
      )}

      {selectedTab === 'api' && (
        <View style={styles.settingsCard}>
          <Text style={styles.cardTitle}>API Keys</Text>
          {apiKeys.map((apiKey) => (
            <ApiKeyItem key={apiKey.id} apiKey={apiKey} />
          ))}
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={20} color="#007bff" />
            <Text style={styles.addButtonText}>Add New API Key</Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedTab === 'security' && (
        <View style={styles.settingsCard}>
          <Text style={styles.cardTitle}>Security Settings</Text>
          <SwitchItem 
            title="Two-Factor Authentication" 
            value={securitySettings.twoFactorAuth} 
            onValueChange={() => {}}
            icon="shield-checkmark" 
          />
          <SettingItem 
            title="Password Policy" 
            value={securitySettings.passwordPolicy} 
            icon="lock-closed" 
          />
          <SettingItem 
            title="Session Timeout" 
            value={`${securitySettings.sessionTimeout} minutes`} 
            icon="time" 
          />
          <SwitchItem 
            title="IP Whitelist" 
            value={securitySettings.ipWhitelist} 
            onValueChange={() => {}}
            icon="globe" 
          />
          <SwitchItem 
            title="Audit Logging" 
            value={securitySettings.auditLogging} 
            onValueChange={() => {}}
            icon="document-text" 
          />
          <SettingItem 
            title="Encryption Level" 
            value={securitySettings.encryptionLevel} 
            icon="key" 
          />
        </View>
      )}

      {selectedTab === 'notifications' && (
        <View style={styles.settingsCard}>
          <Text style={styles.cardTitle}>Notification Templates</Text>
          {notificationTemplates.map((template) => (
            <NotificationTemplateItem key={template.id} template={template} />
          ))}
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={20} color="#007bff" />
            <Text style={styles.addButtonText}>Add New Template</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="save" size={24} color="#007bff" />
            <Text style={styles.actionText}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="refresh" size={24} color="#28a745" />
            <Text style={styles.actionText}>Reset to Default</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Export Config</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="help-circle" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Help</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          System configuration allows you to manage platform settings, feature flags, 
          and API keys. Changes take effect immediately and may require app restart.
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
    minWidth: 100,
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
  settingsCard: {
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#ffffff',
    marginLeft: 10,
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValueText: {
    fontSize: 14,
    color: '#cccccc',
    marginRight: 5,
  },
  switchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  switchInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  switchTitle: {
    fontSize: 16,
    color: '#ffffff',
    marginLeft: 10,
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
    alignItems: 'center',
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
    fontSize: 14,
    color: '#cccccc',
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
  apiKeyDetails: {
    marginBottom: 10,
  },
  apiKeyLastUsed: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 2,
  },
  apiKeyPermissions: {
    fontSize: 12,
    color: '#cccccc',
  },
  apiKeyActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  apiKeyAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#555555',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginBottom: 5,
    width: '48%',
  },
  apiKeyActionText: {
    color: '#ffffff',
    fontSize: 10,
    marginLeft: 4,
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
    marginBottom: 5,
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
  templateLastModified: {
    fontSize: 12,
    color: '#cccccc',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginTop: 10,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
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

export default SystemConfigurationScreen;

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BackupRestoreScreen: React.FC = () => {
  const [autoBackup, setAutoBackup] = useState(true);
  const [wifiOnly, setWifiOnly] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState('daily');
  const [cloudStorage, setCloudStorage] = useState('iCloud');

  const backupHistory = [
    {
      id: '1',
      date: '2024-01-25 14:30',
      size: '24.1 MB',
      status: 'Success',
      type: 'Automatic',
    },
    {
      id: '2',
      date: '2024-01-24 09:15',
      size: '23.8 MB',
      status: 'Success',
      type: 'Manual',
    },
    {
      id: '3',
      date: '2024-01-23 14:30',
      size: '24.1 MB',
      status: 'Success',
      type: 'Automatic',
    },
    {
      id: '4',
      date: '2024-01-22 14:30',
      size: '23.5 MB',
      status: 'Failed',
      type: 'Automatic',
    },
  ];

  const cloudProviders = [
    { id: 'iCloud', name: 'iCloud', icon: 'cloud', available: true },
    { id: 'google', name: 'Google Drive', icon: 'logo-google', available: true },
    { id: 'dropbox', name: 'Dropbox', icon: 'logo-dropbox', available: false },
    { id: 'onedrive', name: 'OneDrive', icon: 'logo-microsoft', available: true },
  ];

  const backupFrequencies = [
    { label: 'Every 6 hours', value: '6hours' },
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success': return '#28a745';
      case 'Failed': return '#dc3545';
      case 'In Progress': return '#ffc107';
      default: return '#6c757d';
    }
  };

  const BackupHistoryItem = ({ item }: { item: any }) => (
    <View style={styles.historyItem}>
      <View style={styles.historyHeader}>
        <View style={styles.historyInfo}>
          <Text style={styles.historyDate}>{item.date}</Text>
          <Text style={styles.historyType}>{item.type} Backup</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.historySize}>Size: {item.size}</Text>
    </View>
  );

  const CloudProvider = ({ provider }: { provider: any }) => (
    <TouchableOpacity
      style={[
        styles.cloudProvider,
        cloudStorage === provider.id && styles.cloudProviderSelected
      ]}
      onPress={() => setCloudStorage(provider.id)}
    >
      <View style={styles.providerContent}>
        <Ionicons 
          name={provider.icon as any} 
          size={24} 
          color={provider.available ? '#007bff' : '#6c757d'} 
        />
        <Text style={[
          styles.providerName,
          !provider.available && styles.providerNameDisabled
        ]}>
          {provider.name}
        </Text>
        {!provider.available && (
          <Text style={styles.unavailableText}>Not available</Text>
        )}
      </View>
      {cloudStorage === provider.id && (
        <Ionicons name="checkmark-circle" size={24} color="#007bff" />
      )}
    </TouchableOpacity>
  );

  const FrequencyOption = ({ frequency }: { frequency: any }) => (
    <TouchableOpacity
      style={[
        styles.frequencyOption,
        backupFrequency === frequency.value && styles.frequencyOptionSelected
      ]}
      onPress={() => setBackupFrequency(frequency.value)}
    >
      <Text style={[
        styles.frequencyText,
        backupFrequency === frequency.value && styles.frequencyTextSelected
      ]}>
        {frequency.label}
      </Text>
      {backupFrequency === frequency.value && (
        <Ionicons name="checkmark-circle" size={20} color="#007bff" />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Backup & Restore</Text>
      <Text style={styles.subtitle}>
        Manage cloud backups and data restoration
      </Text>

      <View style={styles.autoBackupCard}>
        <Text style={styles.cardTitle}>Automatic Backup</Text>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Enable Auto Backup</Text>
            <Text style={styles.settingDescription}>
              Automatically backup your data to the cloud
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={autoBackup ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setAutoBackup}
            value={autoBackup}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>WiFi Only</Text>
            <Text style={styles.settingDescription}>
              Only backup when connected to WiFi
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={wifiOnly ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setWifiOnly}
            value={wifiOnly}
          />
        </View>
      </View>

      <View style={styles.cloudProviderCard}>
        <Text style={styles.cardTitle}>Cloud Storage Provider</Text>
        <Text style={styles.cardDescription}>
          Choose your preferred cloud storage service
        </Text>
        {cloudProviders.map((provider) => (
          <CloudProvider key={provider.id} provider={provider} />
        ))}
      </View>

      <View style={styles.frequencyCard}>
        <Text style={styles.cardTitle}>Backup Frequency</Text>
        <Text style={styles.cardDescription}>
          How often to create automatic backups
        </Text>
        <View style={styles.frequencyOptions}>
          {backupFrequencies.map((frequency) => (
            <FrequencyOption key={frequency.value} frequency={frequency} />
          ))}
        </View>
      </View>

      <View style={styles.backupStatusCard}>
        <Text style={styles.cardTitle}>Backup Status</Text>
        <View style={styles.statusContainer}>
          <View style={styles.statusItem}>
            <Ionicons name="checkmark-circle" size={20} color="#28a745" />
            <Text style={styles.statusText}>Last backup: 2 hours ago</Text>
          </View>
          <View style={styles.statusItem}>
            <Ionicons name="cloud" size={20} color="#007bff" />
            <Text style={styles.statusText}>Storage used: 24.1 MB</Text>
          </View>
          <View style={styles.statusItem}>
            <Ionicons name="shield-checkmark" size={20} color="#28a745" />
            <Text style={styles.statusText}>Data encrypted</Text>
          </View>
        </View>
      </View>

      <View style={styles.backupHistoryCard}>
        <Text style={styles.cardTitle}>Backup History</Text>
        {backupHistory.map((item) => (
          <BackupHistoryItem key={item.id} item={item} />
        ))}
      </View>

      <View style={styles.manualActionsCard}>
        <Text style={styles.cardTitle}>Manual Actions</Text>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="cloud-upload" size={24} color="#007bff" />
          <Text style={styles.actionText}>Create Backup Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="cloud-download" size={24} color="#28a745" />
          <Text style={styles.actionText}>Restore from Backup</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="trash" size={24} color="#dc3545" />
          <Text style={styles.actionText}>Delete Old Backups</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="refresh" size={24} color="#007bff" />
            <Text style={styles.actionText}>Sync Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings" size={24} color="#28a745" />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="help-circle" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="information-circle" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Info</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          Regular backups ensure your data is safe and can be restored if needed. 
          Backups are encrypted and stored securely in your chosen cloud service.
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
  autoBackupCard: {
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
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  settingDescription: {
    fontSize: 14,
    color: '#cccccc',
  },
  cloudProviderCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  cardDescription: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 15,
  },
  cloudProvider: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  cloudProviderSelected: {
    borderColor: '#007bff',
    backgroundColor: '#1a1a2e',
  },
  providerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  providerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 15,
  },
  providerNameDisabled: {
    color: '#6c757d',
  },
  unavailableText: {
    fontSize: 12,
    color: '#dc3545',
    marginLeft: 15,
  },
  frequencyCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  frequencyOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  frequencyOption: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    width: '48%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  frequencyOptionSelected: {
    borderColor: '#007bff',
    backgroundColor: '#1a1a2e',
  },
  frequencyText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  frequencyTextSelected: {
    color: '#007bff',
  },
  backupStatusCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  statusContainer: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 14,
    marginLeft: 10,
  },
  backupHistoryCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  historyItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyInfo: {
    flex: 1,
  },
  historyDate: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 2,
  },
  historyType: {
    fontSize: 12,
    color: '#cccccc',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  historySize: {
    fontSize: 12,
    color: '#cccccc',
  },
  manualActionsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  actionText: {
    color: '#ffffff',
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

export default BackupRestoreScreen;

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const OfflineModeScreen: React.FC = () => {
  const [offlineMode, setOfflineMode] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [wifiOnly, setWifiOnly] = useState(true);
  const [backgroundSync, setBackgroundSync] = useState(true);

  const offlineData = [
    {
      id: '1',
      name: 'Job Listings',
      size: '2.3 MB',
      lastSync: '2 hours ago',
      status: 'Synced',
      items: 45,
    },
    {
      id: '2',
      name: 'Engineer Profiles',
      size: '5.7 MB',
      lastSync: '1 hour ago',
      status: 'Synced',
      items: 120,
    },
    {
      id: '3',
      name: 'Project Files',
      size: '15.2 MB',
      lastSync: '30 minutes ago',
      status: 'Syncing',
      items: 23,
    },
    {
      id: '4',
      name: 'Messages',
      size: '890 KB',
      lastSync: '5 minutes ago',
      status: 'Synced',
      items: 156,
    },
    {
      id: '5',
      name: 'Settings',
      size: '45 KB',
      lastSync: '1 day ago',
      status: 'Synced',
      items: 12,
    },
  ];

  const syncHistory = [
    {
      id: '1',
      time: '14:30',
      type: 'Full Sync',
      status: 'Success',
      size: '24.1 MB',
    },
    {
      id: '2',
      time: '12:15',
      type: 'Incremental',
      status: 'Success',
      size: '2.3 MB',
    },
    {
      id: '3',
      time: '09:45',
      type: 'Full Sync',
      status: 'Failed',
      size: '0 MB',
    },
    {
      id: '4',
      time: '08:00',
      type: 'Incremental',
      status: 'Success',
      size: '1.8 MB',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Synced': return '#28a745';
      case 'Syncing': return '#ffc107';
      case 'Failed': return '#dc3545';
      case 'Success': return '#28a745';
      default: return '#6c757d';
    }
  };

  const DataItem = ({ item }: { item: any }) => (
    <View style={styles.dataItem}>
      <View style={styles.dataHeader}>
        <View style={styles.dataInfo}>
          <Text style={styles.dataName}>{item.name}</Text>
          <Text style={styles.dataSize}>{item.size} • {item.items} items</Text>
        </View>
        <View style={styles.dataStatus}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.lastSync}>Last sync: {item.lastSync}</Text>
      <View style={styles.dataActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="refresh" size={16} color="#007bff" />
          <Text style={styles.actionText}>Sync Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="eye" size={16} color="#28a745" />
          <Text style={styles.actionText}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const SyncHistoryItem = ({ item }: { item: any }) => (
    <View style={styles.historyItem}>
      <View style={styles.historyTime}>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      <View style={styles.historyInfo}>
        <Text style={styles.historyType}>{item.type}</Text>
        <Text style={styles.historySize}>{item.size}</Text>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Offline Mode</Text>
      <Text style={styles.subtitle}>
        Manage offline data and sync preferences
      </Text>

      <View style={styles.offlineStatusCard}>
        <View style={styles.statusHeader}>
          <Ionicons 
            name={offlineMode ? "cloud-offline" : "cloud"} 
            size={32} 
            color={offlineMode ? "#ffc107" : "#28a745"} 
          />
          <Text style={styles.statusTitle}>
            {offlineMode ? 'Offline Mode Active' : 'Online Mode'}
          </Text>
        </View>
        <Text style={styles.statusDescription}>
          {offlineMode 
            ? 'You can access cached data without internet connection'
            : 'All features require internet connection'
          }
        </Text>
        <TouchableOpacity 
          style={[styles.toggleButton, { backgroundColor: offlineMode ? '#ffc107' : '#007bff' }]}
          onPress={() => setOfflineMode(!offlineMode)}
        >
          <Text style={styles.toggleButtonText}>
            {offlineMode ? 'Go Online' : 'Enable Offline Mode'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.syncSettingsCard}>
        <Text style={styles.cardTitle}>Sync Settings</Text>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Auto Sync</Text>
            <Text style={styles.settingDescription}>
              Automatically sync data when online
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={autoSync ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setAutoSync}
            value={autoSync}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>WiFi Only</Text>
            <Text style={styles.settingDescription}>
              Only sync when connected to WiFi
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

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Background Sync</Text>
            <Text style={styles.settingDescription}>
              Sync data in the background
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={backgroundSync ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setBackgroundSync}
            value={backgroundSync}
          />
        </View>
      </View>

      <View style={styles.dataCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Offline Data</Text>
          <TouchableOpacity style={styles.syncAllButton}>
            <Ionicons name="refresh" size={16} color="#ffffff" />
            <Text style={styles.syncAllText}>Sync All</Text>
          </TouchableOpacity>
        </View>
        {offlineData.map((item) => (
          <DataItem key={item.id} item={item} />
        ))}
      </View>

      <View style={styles.storageCard}>
        <Text style={styles.cardTitle}>Storage Usage</Text>
        <View style={styles.storageInfo}>
          <View style={styles.storageItem}>
            <Text style={styles.storageLabel}>Total Used</Text>
            <Text style={styles.storageValue}>24.1 MB</Text>
          </View>
          <View style={styles.storageItem}>
            <Text style={styles.storageLabel}>Available</Text>
            <Text style={styles.storageValue}>975.9 MB</Text>
          </View>
        </View>
        <View style={styles.storageBar}>
          <View style={[styles.storageFill, { width: '2.4%' }]} />
        </View>
        <Text style={styles.storageText}>2.4% of 1 GB used</Text>
      </View>

      <View style={styles.historyCard}>
        <Text style={styles.cardTitle}>Sync History</Text>
        {syncHistory.map((item) => (
          <SyncHistoryItem key={item.id} item={item} />
        ))}
      </View>

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download" size={24} color="#007bff" />
            <Text style={styles.actionText}>Download All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="trash" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Clear Cache</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="help-circle" size={24} color="#28a745" />
            <Text style={styles.actionText}>Help</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          Offline mode allows you to access cached data without internet connection. 
          Data will automatically sync when you're back online.
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
  offlineStatusCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 10,
  },
  statusDescription: {
    fontSize: 14,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  toggleButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  toggleButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  syncSettingsCard: {
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
  dataCard: {
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
  syncAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  syncAllText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  dataItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  dataHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  dataInfo: {
    flex: 1,
  },
  dataName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  dataSize: {
    fontSize: 14,
    color: '#cccccc',
  },
  dataStatus: {
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
  lastSync: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 10,
  },
  dataActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#555555',
  },
  actionText: {
    color: '#ffffff',
    fontSize: 12,
    marginLeft: 4,
  },
  storageCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  storageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  storageItem: {
    alignItems: 'center',
  },
  storageLabel: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 5,
  },
  storageValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  storageBar: {
    height: 8,
    backgroundColor: '#3a3a3a',
    borderRadius: 4,
    marginBottom: 8,
  },
  storageFill: {
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: 4,
  },
  storageText: {
    fontSize: 12,
    color: '#cccccc',
    textAlign: 'center',
  },
  historyCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  historyTime: {
    width: 60,
  },
  timeText: {
    fontSize: 14,
    color: '#cccccc',
  },
  historyInfo: {
    flex: 1,
    marginLeft: 15,
  },
  historyType: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 2,
  },
  historySize: {
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

export default OfflineModeScreen;

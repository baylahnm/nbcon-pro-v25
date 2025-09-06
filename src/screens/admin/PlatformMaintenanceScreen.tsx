import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PlatformMaintenanceScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('updates');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const tabs = [
    { id: 'updates', name: 'Updates', icon: 'refresh' },
    { id: 'backups', name: 'Backups', icon: 'cloud-upload' },
    { id: 'diagnostics', name: 'Diagnostics', icon: 'medical' },
    { id: 'logs', name: 'Logs', icon: 'document-text' },
  ];

  const statuses = [
    { id: 'all', name: 'All' },
    { id: 'success', name: 'Success' },
    { id: 'warning', name: 'Warning' },
    { id: 'error', name: 'Error' },
  ];

  const systemStatus = {
    overall: 'Healthy',
    uptime: '99.8%',
    lastUpdate: '2024-01-25 14:30',
    nextUpdate: '2024-01-26 02:00',
    lastBackup: '2024-01-25 01:00',
    nextBackup: '2024-01-26 01:00',
  };

  const updates = [
    {
      id: '1',
      name: 'Security Patch v1.2.3',
      type: 'Security',
      status: 'Completed',
      date: '2024-01-25 14:30',
      description: 'Critical security vulnerabilities fixed',
      impact: 'Low',
    },
    {
      id: '2',
      name: 'Feature Update v1.3.0',
      type: 'Feature',
      status: 'Scheduled',
      date: '2024-01-26 02:00',
      description: 'New AI matching algorithms and UI improvements',
      impact: 'Medium',
    },
    {
      id: '3',
      name: 'Bug Fix v1.2.4',
      type: 'Bug Fix',
      status: 'Failed',
      date: '2024-01-24 16:45',
      description: 'Payment processing issue resolution',
      impact: 'High',
    },
    {
      id: '4',
      name: 'Database Optimization',
      type: 'Maintenance',
      status: 'In Progress',
      date: '2024-01-25 15:00',
      description: 'Database performance optimization',
      impact: 'Low',
    },
  ];

  const backups = [
    {
      id: '1',
      name: 'Full Database Backup',
      type: 'Full',
      status: 'Completed',
      size: '2.4 GB',
      date: '2024-01-25 01:00',
      location: 'AWS S3',
      retention: '30 days',
    },
    {
      id: '2',
      name: 'Incremental Backup',
      type: 'Incremental',
      status: 'Completed',
      size: '156 MB',
      date: '2024-01-25 13:00',
      location: 'AWS S3',
      retention: '7 days',
    },
    {
      id: '3',
      name: 'User Data Backup',
      type: 'User Data',
      status: 'Failed',
      size: 'N/A',
      date: '2024-01-24 20:00',
      location: 'AWS S3',
      retention: '90 days',
    },
  ];

  const diagnostics = [
    {
      id: '1',
      name: 'Database Performance',
      status: 'Healthy',
      score: 95,
      lastCheck: '2024-01-25 14:30',
      issues: 0,
    },
    {
      id: '2',
      name: 'API Response Time',
      status: 'Warning',
      score: 78,
      lastCheck: '2024-01-25 14:25',
      issues: 2,
    },
    {
      id: '3',
      name: 'Memory Usage',
      status: 'Healthy',
      score: 88,
      lastCheck: '2024-01-25 14:20',
      issues: 0,
    },
    {
      id: '4',
      name: 'Disk Space',
      status: 'Error',
      score: 45,
      lastCheck: '2024-01-25 14:15',
      issues: 3,
    },
  ];

  const systemLogs = [
    {
      id: '1',
      level: 'INFO',
      message: 'User authentication successful',
      timestamp: '2024-01-25 14:30:15',
      source: 'AuthService',
    },
    {
      id: '2',
      level: 'WARNING',
      message: 'High memory usage detected',
      timestamp: '2024-01-25 14:25:42',
      source: 'SystemMonitor',
    },
    {
      id: '3',
      level: 'ERROR',
      message: 'Database connection failed',
      timestamp: '2024-01-25 14:20:18',
      source: 'DatabaseService',
    },
    {
      id: '4',
      level: 'INFO',
      message: 'Backup completed successfully',
      timestamp: '2024-01-25 14:15:33',
      source: 'BackupService',
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

  const StatusCard = ({ title, value, status, icon, color }: { title: string; value: string; status: string; icon: string; color: string }) => (
    <View style={styles.statusCard}>
      <View style={styles.statusCardHeader}>
        <Ionicons name={icon as any} size={20} color={color} />
        <Text style={styles.statusCardTitle}>{title}</Text>
      </View>
      <Text style={styles.statusCardValue}>{value}</Text>
      <Text style={styles.statusCardStatus}>{status}</Text>
    </View>
  );

  const UpdateItem = ({ update }: { update: any }) => (
    <View style={styles.updateItem}>
      <View style={styles.updateHeader}>
        <View style={styles.updateInfo}>
          <Text style={styles.updateName}>{update.name}</Text>
          <Text style={styles.updateType}>{update.type}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: update.status === 'Completed' ? '#28a745' : 
                           update.status === 'Scheduled' ? '#007bff' : 
                           update.status === 'In Progress' ? '#ffc107' : '#dc3545'
          }
        ]}>
          <Text style={styles.statusText}>{update.status}</Text>
        </View>
      </View>
      <Text style={styles.updateDescription}>{update.description}</Text>
      <View style={styles.updateMeta}>
        <Text style={styles.updateDate}>{update.date}</Text>
        <Text style={styles.updateImpact}>Impact: {update.impact}</Text>
      </View>
    </View>
  );

  const BackupItem = ({ backup }: { backup: any }) => (
    <View style={styles.backupItem}>
      <View style={styles.backupHeader}>
        <View style={styles.backupInfo}>
          <Text style={styles.backupName}>{backup.name}</Text>
          <Text style={styles.backupType}>{backup.type}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { backgroundColor: backup.status === 'Completed' ? '#28a745' : '#dc3545' }
        ]}>
          <Text style={styles.statusText}>{backup.status}</Text>
        </View>
      </View>
      <View style={styles.backupDetails}>
        <Text style={styles.backupSize}>Size: {backup.size}</Text>
        <Text style={styles.backupLocation}>Location: {backup.location}</Text>
        <Text style={styles.backupRetention}>Retention: {backup.retention}</Text>
        <Text style={styles.backupDate}>Date: {backup.date}</Text>
      </View>
    </View>
  );

  const DiagnosticItem = ({ diagnostic }: { diagnostic: any }) => (
    <View style={styles.diagnosticItem}>
      <View style={styles.diagnosticHeader}>
        <Text style={styles.diagnosticName}>{diagnostic.name}</Text>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: diagnostic.status === 'Healthy' ? '#28a745' : 
                           diagnostic.status === 'Warning' ? '#ffc107' : '#dc3545'
          }
        ]}>
          <Text style={styles.statusText}>{diagnostic.status}</Text>
        </View>
      </View>
      <View style={styles.diagnosticDetails}>
        <Text style={styles.diagnosticScore}>Score: {diagnostic.score}%</Text>
        <Text style={styles.diagnosticIssues}>
          Issues: {diagnostic.issues} {diagnostic.issues === 1 ? 'issue' : 'issues'}
        </Text>
        <Text style={styles.diagnosticLastCheck}>
          Last check: {diagnostic.lastCheck}
        </Text>
      </View>
    </View>
  );

  const LogItem = ({ log }: { log: any }) => (
    <View style={styles.logItem}>
      <View style={styles.logHeader}>
        <View style={[
          styles.levelBadge,
          { 
            backgroundColor: log.level === 'ERROR' ? '#dc3545' : 
                           log.level === 'WARNING' ? '#ffc107' : '#28a745'
          }
        ]}>
          <Text style={styles.levelText}>{log.level}</Text>
        </View>
        <Text style={styles.logSource}>{log.source}</Text>
        <Text style={styles.logTimestamp}>{log.timestamp}</Text>
      </View>
      <Text style={styles.logMessage}>{log.message}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Platform Maintenance</Text>
      <Text style={styles.subtitle}>
        Manage updates, backups, and system diagnostics
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

      <View style={styles.statusCard}>
        <Text style={styles.cardTitle}>System Status</Text>
        <View style={styles.statusGrid}>
          <StatusCard 
            title="Overall Status" 
            value={systemStatus.overall} 
            status="All Systems Operational" 
            icon="checkmark-circle" 
            color="#28a745" 
          />
          <StatusCard 
            title="Uptime" 
            value={systemStatus.uptime} 
            status="Last 30 Days" 
            icon="server" 
            color="#007bff" 
          />
          <StatusCard 
            title="Last Update" 
            value={systemStatus.lastUpdate} 
            status="Successfully Applied" 
            icon="refresh" 
            color="#28a745" 
          />
          <StatusCard 
            title="Next Update" 
            value={systemStatus.nextUpdate} 
            status="Scheduled" 
            icon="time" 
            color="#ffc107" 
          />
        </View>
      </View>

      {selectedTab === 'updates' && (
        <View style={styles.updatesCard}>
          <Text style={styles.cardTitle}>System Updates</Text>
          {updates.map((update) => (
            <UpdateItem key={update.id} update={update} />
          ))}
        </View>
      )}

      {selectedTab === 'backups' && (
        <View style={styles.backupsCard}>
          <Text style={styles.cardTitle}>Backup Status</Text>
          {backups.map((backup) => (
            <BackupItem key={backup.id} backup={backup} />
          ))}
        </View>
      )}

      {selectedTab === 'diagnostics' && (
        <View style={styles.diagnosticsCard}>
          <Text style={styles.cardTitle}>System Diagnostics</Text>
          {diagnostics.map((diagnostic) => (
            <DiagnosticItem key={diagnostic.id} diagnostic={diagnostic} />
          ))}
        </View>
      )}

      {selectedTab === 'logs' && (
        <View style={styles.logsCard}>
          <View style={styles.logsHeader}>
            <Text style={styles.cardTitle}>System Logs</Text>
            <View style={styles.statusFilter}>
              {statuses.map((status) => (
                <StatusButton key={status.id} status={status} />
              ))}
            </View>
          </View>
          {systemLogs.map((log) => (
            <LogItem key={log.id} log={log} />
          ))}
        </View>
      )}

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="refresh" size={24} color="#007bff" />
            <Text style={styles.actionText}>Check Updates</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="cloud-upload" size={24} color="#28a745" />
            <Text style={styles.actionText}>Run Backup</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="medical" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Run Diagnostics</Text>
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
          Platform maintenance ensures optimal system performance and data security. 
          Regular updates, backups, and diagnostics help maintain system reliability.
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
  statusCard: {
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
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statusCard: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    width: '48%',
    marginBottom: 10,
  },
  statusCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusCardTitle: {
    fontSize: 12,
    color: '#cccccc',
    marginLeft: 8,
  },
  statusCardValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  statusCardStatus: {
    fontSize: 12,
    color: '#28a745',
  },
  updatesCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  updateItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  updateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  updateInfo: {
    flex: 1,
  },
  updateName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  updateType: {
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
  updateDescription: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 10,
  },
  updateMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  updateDate: {
    fontSize: 12,
    color: '#cccccc',
  },
  updateImpact: {
    fontSize: 12,
    color: '#ffc107',
  },
  backupsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  backupItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  backupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  backupInfo: {
    flex: 1,
  },
  backupName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  backupType: {
    fontSize: 14,
    color: '#cccccc',
  },
  backupDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  backupSize: {
    fontSize: 12,
    color: '#cccccc',
    width: '50%',
  },
  backupLocation: {
    fontSize: 12,
    color: '#cccccc',
    width: '50%',
  },
  backupRetention: {
    fontSize: 12,
    color: '#cccccc',
    width: '50%',
  },
  backupDate: {
    fontSize: 12,
    color: '#cccccc',
    width: '50%',
  },
  diagnosticsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  diagnosticItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  diagnosticHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  diagnosticName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  diagnosticDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  diagnosticScore: {
    fontSize: 12,
    color: '#007bff',
    width: '50%',
  },
  diagnosticIssues: {
    fontSize: 12,
    color: '#ffc107',
    width: '50%',
  },
  diagnosticLastCheck: {
    fontSize: 12,
    color: '#cccccc',
    width: '100%',
    marginTop: 5,
  },
  logsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  logsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
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
  logItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  logHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  levelBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 10,
  },
  levelText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  logSource: {
    fontSize: 12,
    color: '#007bff',
    marginRight: 10,
  },
  logTimestamp: {
    fontSize: 12,
    color: '#cccccc',
    flex: 1,
    textAlign: 'right',
  },
  logMessage: {
    fontSize: 14,
    color: '#ffffff',
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

export default PlatformMaintenanceScreen;

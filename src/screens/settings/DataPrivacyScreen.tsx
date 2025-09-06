import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DataPrivacyScreen: React.FC = () => {
  const [dataSharing, setDataSharing] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [locationTracking, setLocationTracking] = useState(true);
  const [cameraAccess, setCameraAccess] = useState(true);
  const [microphoneAccess, setMicrophoneAccess] = useState(false);

  const privacySettings = [
    {
      id: 'data-sharing',
      name: 'Data Sharing',
      description: 'Share anonymized data for app improvement',
      enabled: dataSharing,
      onToggle: setDataSharing,
      icon: 'share',
    },
    {
      id: 'analytics',
      name: 'Analytics',
      description: 'Collect usage analytics and crash reports',
      enabled: analyticsEnabled,
      onToggle: setAnalyticsEnabled,
      icon: 'analytics',
    },
    {
      id: 'marketing',
      name: 'Marketing Emails',
      description: 'Receive promotional emails and updates',
      enabled: marketingEmails,
      onToggle: setMarketingEmails,
      icon: 'mail',
    },
    {
      id: 'location',
      name: 'Location Tracking',
      description: 'Track location for job matching and services',
      enabled: locationTracking,
      onToggle: setLocationTracking,
      icon: 'location',
    },
    {
      id: 'camera',
      name: 'Camera Access',
      description: 'Access camera for document scanning and photos',
      enabled: cameraAccess,
      onToggle: setCameraAccess,
      icon: 'camera',
    },
    {
      id: 'microphone',
      name: 'Microphone Access',
      description: 'Access microphone for voice notes and calls',
      enabled: microphoneAccess,
      onToggle: setMicrophoneAccess,
      icon: 'mic',
    },
  ];

  const dataTypes = [
    {
      name: 'Personal Information',
      description: 'Name, email, phone number, profile data',
      size: '2.3 MB',
      canDelete: true,
    },
    {
      name: 'Job History',
      description: 'Completed jobs, ratings, and feedback',
      size: '5.7 MB',
      canDelete: false,
    },
    {
      name: 'Messages',
      description: 'Chat messages and project communications',
      size: '890 KB',
      canDelete: true,
    },
    {
      name: 'Files & Documents',
      description: 'Uploaded documents, drawings, and reports',
      size: '15.2 MB',
      canDelete: true,
    },
    {
      name: 'Location Data',
      description: 'Location history and service areas',
      size: '1.1 MB',
      canDelete: true,
    },
  ];

  const PrivacySetting = ({ setting }: { setting: any }) => (
    <View style={styles.privacySetting}>
      <View style={styles.settingHeader}>
        <View style={styles.settingInfo}>
          <Ionicons name={setting.icon as any} size={24} color="#007bff" />
          <View style={styles.settingDetails}>
            <Text style={styles.settingName}>{setting.name}</Text>
            <Text style={styles.settingDescription}>{setting.description}</Text>
          </View>
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={setting.enabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={setting.onToggle}
          value={setting.enabled}
        />
      </View>
    </View>
  );

  const DataType = ({ dataType }: { dataType: any }) => (
    <View style={styles.dataType}>
      <View style={styles.dataTypeHeader}>
        <View style={styles.dataTypeInfo}>
          <Text style={styles.dataTypeName}>{dataType.name}</Text>
          <Text style={styles.dataTypeDescription}>{dataType.description}</Text>
        </View>
        <Text style={styles.dataTypeSize}>{dataType.size}</Text>
      </View>
      <View style={styles.dataTypeActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="eye" size={16} color="#007bff" />
          <Text style={styles.actionText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="download" size={16} color="#28a745" />
          <Text style={styles.actionText}>Export</Text>
        </TouchableOpacity>
        {dataType.canDelete && (
          <TouchableOpacity style={[styles.actionButton, styles.deleteButton]}>
            <Ionicons name="trash" size={16} color="#dc3545" />
            <Text style={[styles.actionText, styles.deleteText]}>Delete</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Data Privacy</Text>
      <Text style={styles.subtitle}>
        Manage your data sharing preferences and privacy settings
      </Text>

      <View style={styles.privacyOverviewCard}>
        <View style={styles.overviewHeader}>
          <Ionicons name="shield-checkmark" size={32} color="#28a745" />
          <Text style={styles.overviewTitle}>Privacy Status</Text>
        </View>
        <Text style={styles.overviewDescription}>
          Your data is protected with industry-standard encryption and security measures.
        </Text>
        <View style={styles.privacyScore}>
          <Text style={styles.scoreLabel}>Privacy Score</Text>
          <Text style={styles.scoreValue}>85/100</Text>
        </View>
      </View>

      <View style={styles.privacySettingsCard}>
        <Text style={styles.cardTitle}>Privacy Settings</Text>
        {privacySettings.map((setting) => (
          <PrivacySetting key={setting.id} setting={setting} />
        ))}
      </View>

      <View style={styles.dataTypesCard}>
        <Text style={styles.cardTitle}>Your Data</Text>
        <Text style={styles.cardDescription}>
          Manage and control your personal data stored in the app
        </Text>
        {dataTypes.map((dataType, index) => (
          <DataType key={index} dataType={dataType} />
        ))}
      </View>

      <View style={styles.dataExportCard}>
        <Text style={styles.cardTitle}>Data Export</Text>
        <View style={styles.exportContainer}>
          <Ionicons name="download" size={40} color="#007bff" />
          <Text style={styles.exportTitle}>Download Your Data</Text>
          <Text style={styles.exportDescription}>
            Get a copy of all your data in a portable format
          </Text>
          <TouchableOpacity style={styles.exportButton}>
            <Text style={styles.exportButtonText}>Request Data Export</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.dataDeletionCard}>
        <Text style={styles.cardTitle}>Account Deletion</Text>
        <View style={styles.deletionContainer}>
          <Ionicons name="warning" size={40} color="#dc3545" />
          <Text style={styles.deletionTitle}>Delete Account</Text>
          <Text style={styles.deletionDescription}>
            Permanently delete your account and all associated data
          </Text>
          <TouchableOpacity style={styles.deletionButton}>
            <Text style={styles.deletionButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.complianceCard}>
        <Text style={styles.cardTitle}>Compliance & Legal</Text>
        <View style={styles.complianceItems}>
          <TouchableOpacity style={styles.complianceItem}>
            <Ionicons name="document-text" size={20} color="#007bff" />
            <Text style={styles.complianceText}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={16} color="#cccccc" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.complianceItem}>
            <Ionicons name="shield" size={20} color="#28a745" />
            <Text style={styles.complianceText}>Terms of Service</Text>
            <Ionicons name="chevron-forward" size={16} color="#cccccc" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.complianceItem}>
            <Ionicons name="lock-closed" size={20} color="#ffc107" />
            <Text style={styles.complianceText}>Data Processing Agreement</Text>
            <Ionicons name="chevron-forward" size={16} color="#cccccc" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="refresh" size={24} color="#007bff" />
            <Text style={styles.actionText}>Reset Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="help-circle" size={24} color="#28a745" />
            <Text style={styles.actionText}>Privacy Help</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="mail" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Contact Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Advanced</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          Your privacy is important to us. You have full control over your data and can 
          modify these settings at any time. Changes may take up to 24 hours to take effect.
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
  privacyOverviewCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  overviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  overviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 10,
  },
  overviewDescription: {
    fontSize: 14,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 20,
  },
  privacyScore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 14,
    color: '#cccccc',
    marginRight: 10,
  },
  scoreValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
  },
  privacySettingsCard: {
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
  privacySetting: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  settingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingDetails: {
    marginLeft: 15,
    flex: 1,
  },
  settingName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  settingDescription: {
    fontSize: 14,
    color: '#cccccc',
  },
  dataTypesCard: {
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
  dataType: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  dataTypeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  dataTypeInfo: {
    flex: 1,
  },
  dataTypeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  dataTypeDescription: {
    fontSize: 14,
    color: '#cccccc',
  },
  dataTypeSize: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: 'bold',
  },
  dataTypeActions: {
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
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  deleteText: {
    color: '#ffffff',
  },
  dataExportCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  exportContainer: {
    alignItems: 'center',
  },
  exportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 15,
    marginBottom: 10,
  },
  exportDescription: {
    fontSize: 14,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  exportButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  exportButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dataDeletionCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  deletionContainer: {
    alignItems: 'center',
  },
  deletionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dc3545',
    marginTop: 15,
    marginBottom: 10,
  },
  deletionDescription: {
    fontSize: 14,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  deletionButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  deletionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  complianceCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  complianceItems: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
  },
  complianceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#4a4a4a',
  },
  complianceText: {
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 15,
    flex: 1,
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

export default DataPrivacyScreen;

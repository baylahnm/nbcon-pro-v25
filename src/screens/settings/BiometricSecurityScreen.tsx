import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BiometricSecurityScreen: React.FC = () => {
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [faceIdEnabled, setFaceIdEnabled] = useState(true);
  const [touchIdEnabled, setTouchIdEnabled] = useState(false);
  const [pinEnabled, setPinEnabled] = useState(true);
  const [autoLock, setAutoLock] = useState(true);
  const [lockTimeout, setLockTimeout] = useState('5min');
  const [requireBiometric, setRequireBiometric] = useState(true);

  const biometricTypes = [
    {
      id: 'face',
      name: 'Face ID',
      description: 'Use Face ID for authentication',
      icon: 'scan',
      available: true,
      enabled: faceIdEnabled,
      onToggle: setFaceIdEnabled,
    },
    {
      id: 'touch',
      name: 'Touch ID',
      description: 'Use Touch ID for authentication',
      icon: 'finger-print',
      available: false,
      enabled: touchIdEnabled,
      onToggle: setTouchIdEnabled,
    },
    {
      id: 'pin',
      name: 'PIN Code',
      description: 'Use PIN as backup authentication',
      icon: 'keypad',
      available: true,
      enabled: pinEnabled,
      onToggle: setPinEnabled,
    },
  ];

  const lockTimeouts = [
    { label: 'Immediately', value: '0min' },
    { label: '1 minute', value: '1min' },
    { label: '5 minutes', value: '5min' },
    { label: '15 minutes', value: '15min' },
    { label: '30 minutes', value: '30min' },
    { label: '1 hour', value: '1hour' },
  ];

  const BiometricOption = ({ type }: { type: any }) => (
    <View style={styles.biometricOption}>
      <View style={styles.optionHeader}>
        <View style={styles.optionInfo}>
          <Ionicons 
            name={type.icon as any} 
            size={24} 
            color={type.available ? '#007bff' : '#6c757d'} 
          />
          <View style={styles.optionDetails}>
            <Text style={[
              styles.optionName,
              !type.available && styles.optionNameDisabled
            ]}>
              {type.name}
            </Text>
            <Text style={styles.optionDescription}>{type.description}</Text>
            {!type.available && (
              <Text style={styles.unavailableText}>Not available on this device</Text>
            )}
          </View>
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={type.enabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={type.onToggle}
          value={type.enabled}
          disabled={!type.available}
        />
      </View>
    </View>
  );

  const TimeoutOption = ({ timeout }: { timeout: any }) => (
    <TouchableOpacity
      style={[
        styles.timeoutOption,
        lockTimeout === timeout.value && styles.timeoutOptionSelected
      ]}
      onPress={() => setLockTimeout(timeout.value)}
    >
      <Text style={[
        styles.timeoutText,
        lockTimeout === timeout.value && styles.timeoutTextSelected
      ]}>
        {timeout.label}
      </Text>
      {lockTimeout === timeout.value && (
        <Ionicons name="checkmark-circle" size={20} color="#007bff" />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Biometric Security</Text>
      <Text style={styles.subtitle}>
        Configure Face ID, Touch ID, and PIN authentication
      </Text>

      <View style={styles.mainToggleCard}>
        <View style={styles.mainToggleHeader}>
          <View style={styles.mainToggleInfo}>
            <Ionicons name="shield-checkmark" size={32} color="#28a745" />
            <View style={styles.mainToggleDetails}>
              <Text style={styles.mainToggleTitle}>Biometric Security</Text>
              <Text style={styles.mainToggleDescription}>
                Master switch for biometric authentication
              </Text>
            </View>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={biometricEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setBiometricEnabled}
            value={biometricEnabled}
          />
        </View>
      </View>

      <View style={styles.biometricTypesCard}>
        <Text style={styles.cardTitle}>Authentication Methods</Text>
        {biometricTypes.map((type) => (
          <BiometricOption key={type.id} type={type} />
        ))}
      </View>

      <View style={styles.securitySettingsCard}>
        <Text style={styles.cardTitle}>Security Settings</Text>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Auto Lock</Text>
            <Text style={styles.settingDescription}>
              Automatically lock the app when inactive
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={autoLock ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setAutoLock}
            value={autoLock}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Require Biometric</Text>
            <Text style={styles.settingDescription}>
              Always require biometric authentication
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={requireBiometric ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setRequireBiometric}
            value={requireBiometric}
          />
        </View>
      </View>

      {autoLock && (
        <View style={styles.timeoutCard}>
          <Text style={styles.cardTitle}>Lock Timeout</Text>
          <Text style={styles.cardDescription}>
            Choose how long the app stays unlocked
          </Text>
          <View style={styles.timeoutOptions}>
            {lockTimeouts.map((timeout) => (
              <TimeoutOption key={timeout.value} timeout={timeout} />
            ))}
          </View>
        </View>
      )}

      <View style={styles.securityStatusCard}>
        <Text style={styles.cardTitle}>Security Status</Text>
        <View style={styles.statusContainer}>
          <View style={styles.statusItem}>
            <Ionicons name="checkmark-circle" size={20} color="#28a745" />
            <Text style={styles.statusText}>Biometric authentication enabled</Text>
          </View>
          <View style={styles.statusItem}>
            <Ionicons name="checkmark-circle" size={20} color="#28a745" />
            <Text style={styles.statusText}>PIN backup configured</Text>
          </View>
          <View style={styles.statusItem}>
            <Ionicons name="checkmark-circle" size={20} color="#28a745" />
            <Text style={styles.statusText}>Auto lock active</Text>
          </View>
        </View>
      </View>

      <View style={styles.testCard}>
        <Text style={styles.cardTitle}>Test Authentication</Text>
        <Text style={styles.cardDescription}>
          Test your biometric authentication setup
        </Text>
        <TouchableOpacity style={styles.testButton}>
          <Ionicons name="finger-print" size={24} color="#ffffff" />
          <Text style={styles.testButtonText}>Test Biometric</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="key" size={24} color="#007bff" />
            <Text style={styles.actionText}>Change PIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="refresh" size={24} color="#28a745" />
            <Text style={styles.actionText}>Reset Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="help-circle" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Help</Text>
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
          Biometric security provides secure access to your account. Face ID and Touch ID 
          are more secure than PIN codes and provide faster authentication.
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
  mainToggleCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  mainToggleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainToggleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  mainToggleDetails: {
    marginLeft: 15,
  },
  mainToggleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  mainToggleDescription: {
    fontSize: 14,
    color: '#cccccc',
  },
  biometricTypesCard: {
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
  biometricOption: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionDetails: {
    marginLeft: 15,
    flex: 1,
  },
  optionName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  optionNameDisabled: {
    color: '#6c757d',
  },
  optionDescription: {
    fontSize: 14,
    color: '#cccccc',
  },
  unavailableText: {
    fontSize: 12,
    color: '#dc3545',
    marginTop: 5,
  },
  securitySettingsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
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
  timeoutCard: {
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
  timeoutOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeoutOption: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    width: '48%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  timeoutOptionSelected: {
    borderColor: '#007bff',
    backgroundColor: '#1a1a2e',
  },
  timeoutText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  timeoutTextSelected: {
    color: '#007bff',
  },
  securityStatusCard: {
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
  testCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  testButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 15,
  },
  testButtonText: {
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

export default BiometricSecurityScreen;

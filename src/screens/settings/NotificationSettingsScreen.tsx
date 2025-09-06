import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NotificationSettingsScreen: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [jobAlerts, setJobAlerts] = useState(true);
  const [messageAlerts, setMessageAlerts] = useState(true);
  const [paymentAlerts, setPaymentAlerts] = useState(true);
  const [systemAlerts, setSystemAlerts] = useState(false);
  const [quietHours, setQuietHours] = useState(true);
  const [quietStart, setQuietStart] = useState('22:00');
  const [quietEnd, setQuietEnd] = useState('08:00');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  const notificationTypes = [
    {
      id: 'job',
      name: 'Job Alerts',
      description: 'New job matches, applications, and updates',
      icon: 'briefcase',
      enabled: jobAlerts,
      onToggle: setJobAlerts,
    },
    {
      id: 'message',
      name: 'Messages',
      description: 'Chat messages and project communications',
      icon: 'chatbubble',
      enabled: messageAlerts,
      onToggle: setMessageAlerts,
    },
    {
      id: 'payment',
      name: 'Payments',
      description: 'Payment confirmations and financial updates',
      icon: 'card',
      enabled: paymentAlerts,
      onToggle: setPaymentAlerts,
    },
    {
      id: 'system',
      name: 'System',
      description: 'App updates and maintenance notifications',
      icon: 'settings',
      enabled: systemAlerts,
      onToggle: setSystemAlerts,
    },
  ];

  const NotificationType = ({ type }: { type: any }) => (
    <View style={styles.notificationType}>
      <View style={styles.typeHeader}>
        <View style={styles.typeInfo}>
          <Ionicons name={type.icon as any} size={24} color="#007bff" />
          <View style={styles.typeDetails}>
            <Text style={styles.typeName}>{type.name}</Text>
            <Text style={styles.typeDescription}>{type.description}</Text>
          </View>
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={type.enabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={type.onToggle}
          value={type.enabled}
        />
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Notification Settings</Text>
      <Text style={styles.subtitle}>
        Customize your notification preferences and quiet hours
      </Text>

      <View style={styles.mainToggleCard}>
        <View style={styles.mainToggleHeader}>
          <View style={styles.mainToggleInfo}>
            <Ionicons name="notifications" size={32} color="#007bff" />
            <View style={styles.mainToggleDetails}>
              <Text style={styles.mainToggleTitle}>All Notifications</Text>
              <Text style={styles.mainToggleDescription}>
                Master switch for all app notifications
              </Text>
            </View>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={notificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setNotificationsEnabled}
            value={notificationsEnabled}
          />
        </View>
      </View>

      <View style={styles.typesCard}>
        <Text style={styles.cardTitle}>Notification Types</Text>
        {notificationTypes.map((type) => (
          <NotificationType key={type.id} type={type} />
        ))}
      </View>

      <View style={styles.quietHoursCard}>
        <Text style={styles.cardTitle}>Quiet Hours</Text>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Enable Quiet Hours</Text>
            <Text style={styles.settingDescription}>
              Pause notifications during specified hours
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={quietHours ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setQuietHours}
            value={quietHours}
          />
        </View>

        {quietHours && (
          <View style={styles.quietHoursSettings}>
            <View style={styles.timeSetting}>
              <Text style={styles.timeLabel}>Start Time</Text>
              <TouchableOpacity style={styles.timeButton}>
                <Text style={styles.timeText}>{quietStart}</Text>
                <Ionicons name="time" size={16} color="#007bff" />
              </TouchableOpacity>
            </View>
            <View style={styles.timeSetting}>
              <Text style={styles.timeLabel}>End Time</Text>
              <TouchableOpacity style={styles.timeButton}>
                <Text style={styles.timeText}>{quietEnd}</Text>
                <Ionicons name="time" size={16} color="#007bff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <View style={styles.soundCard}>
        <Text style={styles.cardTitle}>Sound & Vibration</Text>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Sound</Text>
            <Text style={styles.settingDescription}>
              Play sound for notifications
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={soundEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setSoundEnabled}
            value={soundEnabled}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Vibration</Text>
            <Text style={styles.settingDescription}>
              Vibrate for notifications
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={vibrationEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setVibrationEnabled}
            value={vibrationEnabled}
          />
        </View>
      </View>

      <View style={styles.previewCard}>
        <Text style={styles.cardTitle}>Notification Preview</Text>
        <View style={styles.previewContainer}>
          <View style={styles.previewNotification}>
            <Ionicons name="briefcase" size={20} color="#007bff" />
            <View style={styles.previewContent}>
              <Text style={styles.previewTitle}>New Job Match</Text>
              <Text style={styles.previewText}>Civil Engineering project in Riyadh</Text>
            </View>
            <Text style={styles.previewTime}>2m</Text>
          </View>
        </View>
      </View>

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="test-tube" size={24} color="#007bff" />
            <Text style={styles.actionText}>Test Notification</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="refresh" size={24} color="#28a745" />
            <Text style={styles.actionText}>Reset to Default</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="save" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Save Changes</Text>
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
          Notification settings help you stay informed without being overwhelmed. 
          Quiet hours ensure you won't be disturbed during rest periods.
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
  typesCard: {
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
  notificationType: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  typeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  typeDetails: {
    marginLeft: 15,
    flex: 1,
  },
  typeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  typeDescription: {
    fontSize: 14,
    color: '#cccccc',
  },
  quietHoursCard: {
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
  quietHoursSettings: {
    marginTop: 15,
  },
  timeSetting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  timeLabel: {
    fontSize: 14,
    color: '#ffffff',
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  timeText: {
    color: '#ffffff',
    fontSize: 14,
    marginRight: 8,
  },
  soundCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  previewCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  previewContainer: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
  },
  previewNotification: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4a4a4a',
    borderRadius: 8,
    padding: 12,
  },
  previewContent: {
    flex: 1,
    marginLeft: 12,
  },
  previewTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  previewText: {
    fontSize: 12,
    color: '#cccccc',
  },
  previewTime: {
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

export default NotificationSettingsScreen;

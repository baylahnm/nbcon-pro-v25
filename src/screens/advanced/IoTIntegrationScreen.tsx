import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const IoTIntegrationScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('devices');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const tabs = [
    { id: 'devices', name: 'Devices', icon: 'hardware-chip' },
    { id: 'sensors', name: 'Sensors', icon: 'thermometer' },
    { id: 'monitoring', name: 'Monitoring', icon: 'eye' },
    { id: 'alerts', name: 'Alerts', icon: 'warning' },
  ];

  const statuses = [
    { id: 'all', name: 'All' },
    { id: 'online', name: 'Online' },
    { id: 'offline', name: 'Offline' },
    { id: 'error', name: 'Error' },
  ];

  const devices = [
    {
      id: '1',
      name: 'Site Camera 001',
      type: 'Security Camera',
      location: 'Riyadh Metro Station - Entrance',
      status: 'Online',
      battery: 85,
      signal: 92,
      lastUpdate: '2024-01-25 14:30:15',
      temperature: 24.5,
      humidity: 45,
      pressure: 1013.2,
    },
    {
      id: '2',
      name: 'Environmental Sensor 002',
      type: 'Environmental Monitor',
      location: 'NEOM Smart City - Zone A',
      status: 'Online',
      battery: 67,
      signal: 78,
      lastUpdate: '2024-01-25 14:29:45',
      temperature: 26.8,
      humidity: 52,
      pressure: 1012.8,
    },
    {
      id: '3',
      name: 'Structural Monitor 003',
      type: 'Structural Sensor',
      location: 'Jeddah Port - Pier 5',
      status: 'Offline',
      battery: 23,
      signal: 0,
      lastUpdate: '2024-01-25 12:15:30',
      temperature: null,
      humidity: null,
      pressure: null,
    },
    {
      id: '4',
      name: 'Air Quality Station 004',
      type: 'Air Quality Monitor',
      location: 'Solar Farm - North Section',
      status: 'Error',
      battery: 45,
      signal: 34,
      lastUpdate: '2024-01-25 13:45:22',
      temperature: 28.2,
      humidity: 38,
      pressure: 1014.1,
    },
  ];

  const sensors = [
    {
      id: '1',
      name: 'Temperature Sensor',
      type: 'Temperature',
      unit: '°C',
      value: 24.5,
      min: 15.0,
      max: 35.0,
      status: 'Normal',
      lastReading: '2024-01-25 14:30:15',
      location: 'Riyadh Metro Station',
    },
    {
      id: '2',
      name: 'Humidity Sensor',
      type: 'Humidity',
      unit: '%',
      value: 45.2,
      min: 20.0,
      max: 80.0,
      status: 'Normal',
      lastReading: '2024-01-25 14:30:15',
      location: 'Riyadh Metro Station',
    },
    {
      id: '3',
      name: 'Pressure Sensor',
      type: 'Pressure',
      unit: 'hPa',
      value: 1013.2,
      min: 980.0,
      max: 1050.0,
      status: 'Normal',
      lastReading: '2024-01-25 14:30:15',
      location: 'Riyadh Metro Station',
    },
    {
      id: '4',
      name: 'Vibration Sensor',
      type: 'Vibration',
      unit: 'mm/s',
      value: 0.8,
      min: 0.0,
      max: 10.0,
      status: 'Warning',
      lastReading: '2024-01-25 14:30:15',
      location: 'Jeddah Port',
    },
    {
      id: '5',
      name: 'Air Quality Sensor',
      type: 'Air Quality',
      unit: 'AQI',
      value: 85,
      min: 0,
      max: 500,
      status: 'Moderate',
      lastReading: '2024-01-25 14:30:15',
      location: 'Solar Farm',
    },
  ];

  const monitoringData = [
    {
      id: '1',
      metric: 'Temperature',
      current: 24.5,
      average: 23.8,
      trend: 'up',
      change: '+0.7°C',
      status: 'Normal',
    },
    {
      id: '2',
      metric: 'Humidity',
      current: 45.2,
      average: 47.1,
      trend: 'down',
      change: '-1.9%',
      status: 'Normal',
    },
    {
      id: '3',
      metric: 'Pressure',
      current: 1013.2,
      average: 1012.5,
      trend: 'up',
      change: '+0.7hPa',
      status: 'Normal',
    },
    {
      id: '4',
      metric: 'Vibration',
      current: 0.8,
      average: 0.3,
      trend: 'up',
      change: '+0.5mm/s',
      status: 'Warning',
    },
    {
      id: '5',
      metric: 'Air Quality',
      current: 85,
      average: 72,
      trend: 'up',
      change: '+13 AQI',
      status: 'Moderate',
    },
  ];

  const alerts = [
    {
      id: '1',
      type: 'Warning',
      device: 'Structural Monitor 003',
      message: 'Device offline for more than 2 hours',
      timestamp: '2024-01-25 14:30:15',
      severity: 'High',
      acknowledged: false,
    },
    {
      id: '2',
      type: 'Alert',
      device: 'Vibration Sensor',
      message: 'Vibration levels exceeded threshold',
      timestamp: '2024-01-25 14:25:30',
      severity: 'Medium',
      acknowledged: true,
    },
    {
      id: '3',
      type: 'Info',
      device: 'Air Quality Station 004',
      message: 'Battery level below 50%',
      timestamp: '2024-01-25 14:20:45',
      severity: 'Low',
      acknowledged: false,
    },
    {
      id: '4',
      type: 'Error',
      device: 'Environmental Sensor 002',
      message: 'Communication error with device',
      timestamp: '2024-01-25 14:15:20',
      severity: 'High',
      acknowledged: true,
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

  const DeviceItem = ({ device }: { device: any }) => (
    <View style={styles.deviceItem}>
      <View style={styles.deviceHeader}>
        <View style={styles.deviceInfo}>
          <Text style={styles.deviceName}>{device.name}</Text>
          <Text style={styles.deviceType}>{device.type}</Text>
          <Text style={styles.deviceLocation}>{device.location}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: device.status === 'Online' ? '#28a745' : 
                           device.status === 'Offline' ? '#dc3545' : '#ffc107'
          }
        ]}>
          <Text style={styles.statusText}>{device.status}</Text>
        </View>
      </View>
      
      <View style={styles.deviceStats}>
        <View style={styles.deviceStat}>
          <Ionicons name="battery-half" size={16} color="#007bff" />
          <Text style={styles.deviceStatText}>{device.battery}%</Text>
        </View>
        <View style={styles.deviceStat}>
          <Ionicons name="wifi" size={16} color="#28a745" />
          <Text style={styles.deviceStatText}>{device.signal}%</Text>
        </View>
        <View style={styles.deviceStat}>
          <Ionicons name="time" size={16} color="#ffc107" />
          <Text style={styles.deviceStatText}>{device.lastUpdate}</Text>
        </View>
      </View>

      {device.temperature !== null && (
        <View style={styles.deviceReadings}>
          <Text style={styles.readingsTitle}>Current Readings:</Text>
          <View style={styles.readingsGrid}>
            <View style={styles.readingItem}>
              <Text style={styles.readingLabel}>Temperature:</Text>
              <Text style={styles.readingValue}>{device.temperature}°C</Text>
            </View>
            <View style={styles.readingItem}>
              <Text style={styles.readingLabel}>Humidity:</Text>
              <Text style={styles.readingValue}>{device.humidity}%</Text>
            </View>
            <View style={styles.readingItem}>
              <Text style={styles.readingLabel}>Pressure:</Text>
              <Text style={styles.readingValue}>{device.pressure} hPa</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );

  const SensorItem = ({ sensor }: { sensor: any }) => (
    <View style={styles.sensorItem}>
      <View style={styles.sensorHeader}>
        <Text style={styles.sensorName}>{sensor.name}</Text>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: sensor.status === 'Normal' ? '#28a745' : 
                           sensor.status === 'Warning' ? '#ffc107' : '#dc3545'
          }
        ]}>
          <Text style={styles.statusText}>{sensor.status}</Text>
        </View>
      </View>
      
      <View style={styles.sensorValue}>
        <Text style={styles.sensorValueText}>{sensor.value}</Text>
        <Text style={styles.sensorUnit}>{sensor.unit}</Text>
      </View>
      
      <View style={styles.sensorRange}>
        <Text style={styles.rangeLabel}>Range: {sensor.min} - {sensor.max} {sensor.unit}</Text>
        <Text style={styles.rangeLabel}>Location: {sensor.location}</Text>
        <Text style={styles.rangeLabel}>Last Reading: {sensor.lastReading}</Text>
      </View>
    </View>
  );

  const MonitoringItem = ({ metric }: { metric: any }) => (
    <View style={styles.monitoringItem}>
      <View style={styles.monitoringHeader}>
        <Text style={styles.metricName}>{metric.metric}</Text>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: metric.status === 'Normal' ? '#28a745' : 
                           metric.status === 'Warning' ? '#ffc107' : '#dc3545'
          }
        ]}>
          <Text style={styles.statusText}>{metric.status}</Text>
        </View>
      </View>
      
      <View style={styles.monitoringValues}>
        <View style={styles.monitoringValue}>
          <Text style={styles.monitoringLabel}>Current:</Text>
          <Text style={styles.monitoringValueText}>{metric.current}</Text>
        </View>
        <View style={styles.monitoringValue}>
          <Text style={styles.monitoringLabel}>Average:</Text>
          <Text style={styles.monitoringValueText}>{metric.average}</Text>
        </View>
        <View style={styles.monitoringValue}>
          <Text style={styles.monitoringLabel}>Change:</Text>
          <Text style={[
            styles.monitoringChangeText,
            { color: metric.trend === 'up' ? '#28a745' : '#dc3545' }
          ]}>
            {metric.change}
          </Text>
        </View>
      </View>
    </View>
  );

  const AlertItem = ({ alert }: { alert: any }) => (
    <View style={styles.alertItem}>
      <View style={styles.alertHeader}>
        <View style={styles.alertInfo}>
          <Text style={styles.alertType}>{alert.type}</Text>
          <Text style={styles.alertDevice}>{alert.device}</Text>
        </View>
        <View style={[
          styles.severityBadge,
          { 
            backgroundColor: alert.severity === 'High' ? '#dc3545' : 
                           alert.severity === 'Medium' ? '#ffc107' : '#007bff'
          }
        ]}>
          <Text style={styles.severityText}>{alert.severity}</Text>
        </View>
      </View>
      
      <Text style={styles.alertMessage}>{alert.message}</Text>
      
      <View style={styles.alertMeta}>
        <Text style={styles.alertTimestamp}>{alert.timestamp}</Text>
        <View style={[
          styles.acknowledgeBadge,
          { backgroundColor: alert.acknowledged ? '#28a745' : '#dc3545' }
        ]}>
          <Text style={styles.acknowledgeText}>
            {alert.acknowledged ? 'Acknowledged' : 'Pending'}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>IoT Integration</Text>
      <Text style={styles.subtitle}>
        Live IoT device feeds for site monitoring
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

      {selectedTab === 'devices' && (
        <View style={styles.devicesCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>IoT Devices</Text>
            <View style={styles.statusFilter}>
              {statuses.map((status) => (
                <StatusButton key={status.id} status={status} />
              ))}
            </View>
          </View>
          {devices.map((device) => (
            <DeviceItem key={device.id} device={device} />
          ))}
        </View>
      )}

      {selectedTab === 'sensors' && (
        <View style={styles.sensorsCard}>
          <Text style={styles.cardTitle}>Sensor Data</Text>
          {sensors.map((sensor) => (
            <SensorItem key={sensor.id} sensor={sensor} />
          ))}
        </View>
      )}

      {selectedTab === 'monitoring' && (
        <View style={styles.monitoringCard}>
          <Text style={styles.cardTitle}>Real-time Monitoring</Text>
          {monitoringData.map((metric) => (
            <MonitoringItem key={metric.id} metric={metric} />
          ))}
        </View>
      )}

      {selectedTab === 'alerts' && (
        <View style={styles.alertsCard}>
          <Text style={styles.cardTitle}>System Alerts</Text>
          {alerts.map((alert) => (
            <AlertItem key={alert.id} alert={alert} />
          ))}
        </View>
      )}

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add" size={24} color="#007bff" />
            <Text style={styles.actionText}>Add Device</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="refresh" size={24} color="#28a745" />
            <Text style={styles.actionText}>Refresh Data</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Configure</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Export Data</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          IoT integration provides real-time monitoring of construction sites, 
          environmental conditions, and equipment status through connected sensors and devices.
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
  devicesCard: {
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
  deviceItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  deviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  deviceType: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 2,
  },
  deviceLocation: {
    fontSize: 12,
    color: '#007bff',
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
  deviceStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  deviceStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceStatText: {
    color: '#ffffff',
    fontSize: 12,
    marginLeft: 4,
  },
  deviceReadings: {
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  readingsTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  readingsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  readingItem: {
    alignItems: 'center',
  },
  readingLabel: {
    fontSize: 10,
    color: '#cccccc',
    marginBottom: 2,
  },
  readingValue: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  sensorsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  sensorItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  sensorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sensorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  sensorValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  sensorValueText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
  },
  sensorUnit: {
    fontSize: 16,
    color: '#cccccc',
    marginLeft: 5,
  },
  sensorRange: {
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  rangeLabel: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 2,
  },
  monitoringCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  monitoringItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  monitoringHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  metricName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  monitoringValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  monitoringValue: {
    alignItems: 'center',
  },
  monitoringLabel: {
    fontSize: 10,
    color: '#cccccc',
    marginBottom: 2,
  },
  monitoringValueText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  monitoringChangeText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  alertsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  alertItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  alertInfo: {
    flex: 1,
  },
  alertType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  alertDevice: {
    fontSize: 14,
    color: '#cccccc',
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  severityText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  alertMessage: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 10,
    lineHeight: 20,
  },
  alertMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  alertTimestamp: {
    fontSize: 12,
    color: '#cccccc',
  },
  acknowledgeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  acknowledgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
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

export default IoTIntegrationScreen;

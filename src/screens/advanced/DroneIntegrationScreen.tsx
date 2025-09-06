import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DroneIntegrationScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('missions');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const tabs = [
    { id: 'missions', name: 'Missions', icon: 'airplane' },
    { id: 'drones', name: 'Drones', icon: 'hardware-chip' },
    { id: 'data', name: 'Data', icon: 'analytics' },
    { id: 'reports', name: 'Reports', icon: 'document-text' },
  ];

  const statuses = [
    { id: 'all', name: 'All' },
    { id: 'active', name: 'Active' },
    { id: 'completed', name: 'Completed' },
    { id: 'scheduled', name: 'Scheduled' },
  ];

  const missions = [
    {
      id: '1',
      name: 'Riyadh Metro Station - Aerial Survey',
      type: 'Topographic Survey',
      status: 'Completed',
      drone: 'DJI Phantom 4 RTK',
      pilot: 'Ahmed Al-Rashid',
      startTime: '2024-01-25 08:00:00',
      endTime: '2024-01-25 10:30:00',
      duration: '2h 30m',
      area: '2.5 km²',
      altitude: '120m',
      weather: 'Clear',
      windSpeed: '8 km/h',
      images: 156,
      videos: 12,
      dataSize: '4.2 GB',
    },
    {
      id: '2',
      name: 'NEOM Smart City - Progress Monitoring',
      type: 'Progress Monitoring',
      status: 'Active',
      drone: 'DJI Mavic 3 Enterprise',
      pilot: 'Sarah Al-Mansouri',
      startTime: '2024-01-25 14:00:00',
      endTime: null,
      duration: 'Ongoing',
      area: '5.8 km²',
      altitude: '100m',
      weather: 'Partly Cloudy',
      windSpeed: '12 km/h',
      images: 89,
      videos: 6,
      dataSize: '2.1 GB',
    },
    {
      id: '3',
      name: 'Jeddah Port - Structural Inspection',
      type: 'Structural Inspection',
      status: 'Scheduled',
      drone: 'DJI Matrice 300 RTK',
      pilot: 'Omar Al-Zahrani',
      startTime: '2024-01-26 09:00:00',
      endTime: null,
      duration: 'Planned',
      area: '1.2 km²',
      altitude: '80m',
      weather: 'Forecast: Clear',
      windSpeed: 'Forecast: 6 km/h',
      images: 0,
      videos: 0,
      dataSize: '0 GB',
    },
    {
      id: '4',
      name: 'Solar Farm - Thermal Analysis',
      type: 'Thermal Analysis',
      status: 'Completed',
      drone: 'DJI Mavic 2 Enterprise Advanced',
      pilot: 'Fatima Al-Sheikh',
      startTime: '2024-01-24 16:00:00',
      endTime: '2024-01-24 18:45:00',
      duration: '2h 45m',
      area: '3.2 km²',
      altitude: '150m',
      weather: 'Clear',
      windSpeed: '5 km/h',
      images: 203,
      videos: 8,
      dataSize: '6.8 GB',
    },
  ];

  const drones = [
    {
      id: '1',
      name: 'DJI Phantom 4 RTK',
      type: 'Survey Drone',
      status: 'Available',
      battery: 85,
      flightTime: '28 minutes',
      maxAltitude: '500m',
      maxSpeed: '72 km/h',
      camera: '20MP RGB + RTK GPS',
      lastMaintenance: '2024-01-20',
      totalFlights: 156,
      totalHours: '89.5h',
    },
    {
      id: '2',
      name: 'DJI Mavic 3 Enterprise',
      type: 'Commercial Drone',
      status: 'In Use',
      battery: 67,
      flightTime: '46 minutes',
      maxAltitude: '500m',
      maxSpeed: '75 km/h',
      camera: '20MP RGB + 12MP Zoom',
      lastMaintenance: '2024-01-18',
      totalFlights: 234,
      totalHours: '156.2h',
    },
    {
      id: '3',
      name: 'DJI Matrice 300 RTK',
      type: 'Industrial Drone',
      status: 'Maintenance',
      battery: 0,
      flightTime: '55 minutes',
      maxAltitude: '700m',
      maxSpeed: '82 km/h',
      camera: '20MP RGB + Thermal + LiDAR',
      lastMaintenance: '2024-01-25',
      totalFlights: 89,
      totalHours: '67.8h',
    },
    {
      id: '4',
      name: 'DJI Mavic 2 Enterprise Advanced',
      type: 'Thermal Drone',
      status: 'Available',
      battery: 92,
      flightTime: '31 minutes',
      maxAltitude: '500m',
      maxSpeed: '72 km/h',
      camera: '20MP RGB + Thermal',
      lastMaintenance: '2024-01-22',
      totalFlights: 178,
      totalHours: '112.4h',
    },
  ];

  const dataTypes = [
    {
      id: '1',
      name: 'RGB Orthomosaic',
      type: 'Image',
      size: '2.1 GB',
      resolution: '5cm/pixel',
      coverage: '2.5 km²',
      processed: true,
      quality: 'High',
      createdAt: '2024-01-25 10:30:00',
    },
    {
      id: '2',
      name: 'Digital Elevation Model',
      type: '3D Model',
      size: '1.8 GB',
      resolution: '10cm/pixel',
      coverage: '2.5 km²',
      processed: true,
      quality: 'High',
      createdAt: '2024-01-25 11:15:00',
    },
    {
      id: '3',
      name: 'Thermal Analysis',
      type: 'Thermal Data',
      size: '3.2 GB',
      resolution: '15cm/pixel',
      coverage: '3.2 km²',
      processed: true,
      quality: 'Medium',
      createdAt: '2024-01-24 19:00:00',
    },
    {
      id: '4',
      name: 'Point Cloud Data',
      type: 'LiDAR',
      size: '4.5 GB',
      resolution: '2cm/pixel',
      coverage: '1.2 km²',
      processed: false,
      quality: 'High',
      createdAt: '2024-01-25 14:20:00',
    },
  ];

  const reports = [
    {
      id: '1',
      name: 'Aerial Survey Report - Riyadh Metro',
      missionId: '1',
      generatedAt: '2024-01-25 12:00:00',
      type: 'Survey Report',
      status: 'Completed',
      pages: 24,
      findings: 8,
      recommendations: 5,
      accuracy: '±2cm',
    },
    {
      id: '2',
      name: 'Progress Monitoring - NEOM City',
      missionId: '2',
      generatedAt: '2024-01-25 16:30:00',
      type: 'Progress Report',
      status: 'Draft',
      pages: 18,
      findings: 12,
      recommendations: 7,
      accuracy: '±5cm',
    },
    {
      id: '3',
      name: 'Thermal Analysis - Solar Farm',
      missionId: '4',
      generatedAt: '2024-01-24 20:15:00',
      type: 'Thermal Report',
      status: 'Completed',
      pages: 16,
      findings: 6,
      recommendations: 3,
      accuracy: '±10cm',
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

  const MissionItem = ({ mission }: { mission: any }) => (
    <View style={styles.missionItem}>
      <View style={styles.missionHeader}>
        <View style={styles.missionInfo}>
          <Text style={styles.missionName}>{mission.name}</Text>
          <Text style={styles.missionType}>{mission.type}</Text>
          <Text style={styles.missionPilot}>Pilot: {mission.pilot}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: mission.status === 'Completed' ? '#28a745' : 
                           mission.status === 'Active' ? '#007bff' : '#ffc107'
          }
        ]}>
          <Text style={styles.statusText}>{mission.status}</Text>
        </View>
      </View>
      
      <View style={styles.missionDetails}>
        <View style={styles.missionDetail}>
          <Text style={styles.missionDetailLabel}>Drone:</Text>
          <Text style={styles.missionDetailValue}>{mission.drone}</Text>
        </View>
        <View style={styles.missionDetail}>
          <Text style={styles.missionDetailLabel}>Duration:</Text>
          <Text style={styles.missionDetailValue}>{mission.duration}</Text>
        </View>
        <View style={styles.missionDetail}>
          <Text style={styles.missionDetailLabel}>Area:</Text>
          <Text style={styles.missionDetailValue}>{mission.area}</Text>
        </View>
        <View style={styles.missionDetail}>
          <Text style={styles.missionDetailLabel}>Altitude:</Text>
          <Text style={styles.missionDetailValue}>{mission.altitude}</Text>
        </View>
      </View>

      <View style={styles.missionStats}>
        <View style={styles.missionStat}>
          <Text style={styles.missionStatValue}>{mission.images}</Text>
          <Text style={styles.missionStatLabel}>Images</Text>
        </View>
        <View style={styles.missionStat}>
          <Text style={styles.missionStatValue}>{mission.videos}</Text>
          <Text style={styles.missionStatLabel}>Videos</Text>
        </View>
        <View style={styles.missionStat}>
          <Text style={styles.missionStatValue}>{mission.dataSize}</Text>
          <Text style={styles.missionStatLabel}>Data Size</Text>
        </View>
      </View>

      <View style={styles.missionMeta}>
        <Text style={styles.missionMetaText}>
          Start: {mission.startTime}
        </Text>
        <Text style={styles.missionMetaText}>
          End: {mission.endTime || 'Ongoing'}
        </Text>
        <Text style={styles.missionMetaText}>
          Weather: {mission.weather} | Wind: {mission.windSpeed}
        </Text>
      </View>
    </View>
  );

  const DroneItem = ({ drone }: { drone: any }) => (
    <View style={styles.droneItem}>
      <View style={styles.droneHeader}>
        <Text style={styles.droneName}>{drone.name}</Text>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: drone.status === 'Available' ? '#28a745' : 
                           drone.status === 'In Use' ? '#007bff' : '#ffc107'
          }
        ]}>
          <Text style={styles.statusText}>{drone.status}</Text>
        </View>
      </View>
      
      <Text style={styles.droneType}>{drone.type}</Text>
      
      <View style={styles.droneSpecs}>
        <View style={styles.droneSpec}>
          <Text style={styles.droneSpecLabel}>Battery:</Text>
          <Text style={styles.droneSpecValue}>{drone.battery}%</Text>
        </View>
        <View style={styles.droneSpec}>
          <Text style={styles.droneSpecLabel}>Flight Time:</Text>
          <Text style={styles.droneSpecValue}>{drone.flightTime}</Text>
        </View>
        <View style={styles.droneSpec}>
          <Text style={styles.droneSpecLabel}>Max Altitude:</Text>
          <Text style={styles.droneSpecValue}>{drone.maxAltitude}</Text>
        </View>
        <View style={styles.droneSpec}>
          <Text style={styles.droneSpecLabel}>Max Speed:</Text>
          <Text style={styles.droneSpecValue}>{drone.maxSpeed}</Text>
        </View>
      </View>

      <View style={styles.droneStats}>
        <View style={styles.droneStat}>
          <Text style={styles.droneStatValue}>{drone.totalFlights}</Text>
          <Text style={styles.droneStatLabel}>Total Flights</Text>
        </View>
        <View style={styles.droneStat}>
          <Text style={styles.droneStatValue}>{drone.totalHours}</Text>
          <Text style={styles.droneStatLabel}>Flight Hours</Text>
        </View>
        <View style={styles.droneStat}>
          <Text style={styles.droneStatValue}>{drone.lastMaintenance}</Text>
          <Text style={styles.droneStatLabel}>Last Maintenance</Text>
        </View>
      </View>

      <Text style={styles.droneCamera}>Camera: {drone.camera}</Text>
    </View>
  );

  const DataItem = ({ data }: { data: any }) => (
    <View style={styles.dataItem}>
      <View style={styles.dataHeader}>
        <Text style={styles.dataName}>{data.name}</Text>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: data.processed ? '#28a745' : '#ffc107'
          }
        ]}>
          <Text style={styles.statusText}>
            {data.processed ? 'Processed' : 'Processing'}
          </Text>
        </View>
      </View>
      
      <Text style={styles.dataType}>{data.type}</Text>
      
      <View style={styles.dataSpecs}>
        <View style={styles.dataSpec}>
          <Text style={styles.dataSpecLabel}>Size:</Text>
          <Text style={styles.dataSpecValue}>{data.size}</Text>
        </View>
        <View style={styles.dataSpec}>
          <Text style={styles.dataSpecLabel}>Resolution:</Text>
          <Text style={styles.dataSpecValue}>{data.resolution}</Text>
        </View>
        <View style={styles.dataSpec}>
          <Text style={styles.dataSpecLabel}>Coverage:</Text>
          <Text style={styles.dataSpecValue}>{data.coverage}</Text>
        </View>
        <View style={styles.dataSpec}>
          <Text style={styles.dataSpecLabel}>Quality:</Text>
          <Text style={styles.dataSpecValue}>{data.quality}</Text>
        </View>
      </View>

      <Text style={styles.dataCreated}>
        Created: {data.createdAt}
      </Text>
    </View>
  );

  const ReportItem = ({ report }: { report: any }) => (
    <View style={styles.reportItem}>
      <View style={styles.reportHeader}>
        <Text style={styles.reportName}>{report.name}</Text>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: report.status === 'Completed' ? '#28a745' : '#ffc107'
          }
        ]}>
          <Text style={styles.statusText}>{report.status}</Text>
        </View>
      </View>
      
      <Text style={styles.reportType}>{report.type}</Text>
      
      <View style={styles.reportStats}>
        <View style={styles.reportStat}>
          <Text style={styles.reportStatValue}>{report.pages}</Text>
          <Text style={styles.reportStatLabel}>Pages</Text>
        </View>
        <View style={styles.reportStat}>
          <Text style={styles.reportStatValue}>{report.findings}</Text>
          <Text style={styles.reportStatLabel}>Findings</Text>
        </View>
        <View style={styles.reportStat}>
          <Text style={styles.reportStatValue}>{report.recommendations}</Text>
          <Text style={styles.reportStatLabel}>Recommendations</Text>
        </View>
        <View style={styles.reportStat}>
          <Text style={styles.reportStatValue}>{report.accuracy}</Text>
          <Text style={styles.reportStatLabel}>Accuracy</Text>
        </View>
      </View>

      <Text style={styles.reportGenerated}>
        Generated: {report.generatedAt}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Drone Integration</Text>
      <Text style={styles.subtitle}>
        Drone-based aerial survey data integration
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

      {selectedTab === 'missions' && (
        <View style={styles.missionsCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Drone Missions</Text>
            <View style={styles.statusFilter}>
              {statuses.map((status) => (
                <StatusButton key={status.id} status={status} />
              ))}
            </View>
          </View>
          {missions.map((mission) => (
            <MissionItem key={mission.id} mission={mission} />
          ))}
        </View>
      )}

      {selectedTab === 'drones' && (
        <View style={styles.dronesCard}>
          <Text style={styles.cardTitle}>Drone Fleet</Text>
          {drones.map((drone) => (
            <DroneItem key={drone.id} drone={drone} />
          ))}
        </View>
      )}

      {selectedTab === 'data' && (
        <View style={styles.dataCard}>
          <Text style={styles.cardTitle}>Survey Data</Text>
          {dataTypes.map((data) => (
            <DataItem key={data.id} data={data} />
          ))}
        </View>
      )}

      {selectedTab === 'reports' && (
        <View style={styles.reportsCard}>
          <Text style={styles.cardTitle}>Survey Reports</Text>
          {reports.map((report) => (
            <ReportItem key={report.id} report={report} />
          ))}
        </View>
      )}

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add" size={24} color="#007bff" />
            <Text style={styles.actionText}>New Mission</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="airplane" size={24} color="#28a745" />
            <Text style={styles.actionText}>Start Flight</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="analytics" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Process Data</Text>
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
          Drone integration provides aerial survey capabilities for construction sites, 
          progress monitoring, and data collection with high-precision mapping and analysis.
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
  missionsCard: {
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
  missionItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  missionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  missionInfo: {
    flex: 1,
  },
  missionName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  missionType: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 2,
  },
  missionPilot: {
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
  missionDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  missionDetail: {
    width: '50%',
    marginBottom: 5,
  },
  missionDetailLabel: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 2,
  },
  missionDetailValue: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  missionStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  missionStat: {
    alignItems: 'center',
  },
  missionStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 2,
  },
  missionStatLabel: {
    fontSize: 10,
    color: '#cccccc',
  },
  missionMeta: {
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  missionMetaText: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 2,
  },
  dronesCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  droneItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  droneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  droneName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  droneType: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 10,
  },
  droneSpecs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  droneSpec: {
    width: '50%',
    marginBottom: 5,
  },
  droneSpecLabel: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 2,
  },
  droneSpecValue: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  droneStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  droneStat: {
    alignItems: 'center',
  },
  droneStatValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 2,
  },
  droneStatLabel: {
    fontSize: 10,
    color: '#cccccc',
  },
  droneCamera: {
    fontSize: 12,
    color: '#cccccc',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  dataCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
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
    alignItems: 'center',
    marginBottom: 5,
  },
  dataName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  dataType: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 10,
  },
  dataSpecs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  dataSpec: {
    width: '50%',
    marginBottom: 5,
  },
  dataSpecLabel: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 2,
  },
  dataSpecValue: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  dataCreated: {
    fontSize: 12,
    color: '#cccccc',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  reportsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  reportItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  reportName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  reportType: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 10,
  },
  reportStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  reportStat: {
    alignItems: 'center',
  },
  reportStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 2,
  },
  reportStatLabel: {
    fontSize: 10,
    color: '#cccccc',
  },
  reportGenerated: {
    fontSize: 12,
    color: '#cccccc',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
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

export default DroneIntegrationScreen;

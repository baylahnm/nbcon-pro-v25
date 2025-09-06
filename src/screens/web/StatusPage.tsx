import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

interface ServiceStatus {
  id: string;
  name: string;
  status: 'operational' | 'degraded' | 'outage' | 'maintenance';
  uptime: string;
  responseTime: string;
  lastIncident?: string;
  description: string;
}

interface Incident {
  id: string;
  title: string;
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved';
  severity: 'minor' | 'major' | 'critical';
  description: string;
  startTime: string;
  endTime?: string;
  affectedServices: string[];
}

const StatusPage: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [overallStatus, setOverallStatus] = useState<'operational' | 'degraded' | 'outage'>('operational');

  const services: ServiceStatus[] = [
    {
      id: '1',
      name: 'API Services',
      status: 'operational',
      uptime: '99.9%',
      responseTime: '120ms',
      description: 'Core API endpoints for user authentication, job management, and payments',
    },
    {
      id: '2',
      name: 'Mobile App',
      status: 'operational',
      uptime: '99.8%',
      responseTime: '95ms',
      description: 'React Native mobile application for iOS and Android',
    },
    {
      id: '3',
      name: 'Web Platform',
      status: 'operational',
      uptime: '99.9%',
      responseTime: '180ms',
      description: 'Web-based platform for enterprise clients and admin users',
    },
    {
      id: '4',
      name: 'Payment Processing',
      status: 'operational',
      uptime: '99.95%',
      responseTime: '250ms',
      description: 'Payment gateway integration for mada, STC Pay, and bank transfers',
    },
    {
      id: '5',
      name: 'Real-time Messaging',
      status: 'degraded',
      uptime: '98.5%',
      responseTime: '350ms',
      lastIncident: 'Increased latency in message delivery',
      description: 'WebSocket connections for real-time chat and notifications',
    },
    {
      id: '6',
      name: 'File Storage',
      status: 'operational',
      uptime: '99.7%',
      responseTime: '200ms',
      description: 'Document and media file storage and retrieval',
    },
    {
      id: '7',
      name: 'Search Engine',
      status: 'operational',
      uptime: '99.6%',
      responseTime: '150ms',
      description: 'Elasticsearch-based search for jobs, engineers, and projects',
    },
    {
      id: '8',
      name: 'Analytics Dashboard',
      status: 'maintenance',
      uptime: '97.2%',
      responseTime: '400ms',
      lastIncident: 'Scheduled maintenance for performance improvements',
      description: 'Business intelligence and analytics reporting',
    },
  ];

  const incidents: Incident[] = [
    {
      id: '1',
      title: 'Real-time Messaging Latency',
      status: 'monitoring',
      severity: 'minor',
      description: 'Some users experiencing delayed message delivery. We are monitoring the situation and working on optimizations.',
      startTime: '2024-12-15T10:30:00Z',
      affectedServices: ['Real-time Messaging'],
    },
    {
      id: '2',
      title: 'Analytics Dashboard Maintenance',
      status: 'monitoring',
      severity: 'minor',
      description: 'Scheduled maintenance to improve dashboard performance and add new features.',
      startTime: '2024-12-15T08:00:00Z',
      endTime: '2024-12-15T12:00:00Z',
      affectedServices: ['Analytics Dashboard'],
    },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setLastUpdated(new Date());
      setRefreshing(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return '#059669';
      case 'degraded': return '#d97706';
      case 'outage': return '#dc2626';
      case 'maintenance': return '#7c3aed';
      case 'investigating': return '#dc2626';
      case 'identified': return '#d97706';
      case 'monitoring': return '#059669';
      case 'resolved': return '#059669';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'operational': return 'Operational';
      case 'degraded': return 'Degraded Performance';
      case 'outage': return 'Service Outage';
      case 'maintenance': return 'Under Maintenance';
      case 'investigating': return 'Investigating';
      case 'identified': return 'Issue Identified';
      case 'monitoring': return 'Monitoring';
      case 'resolved': return 'Resolved';
      default: return status;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#dc2626';
      case 'major': return '#d97706';
      case 'minor': return '#059669';
      default: return '#6b7280';
    }
  };

  const renderServiceCard = (service: ServiceStatus) => (
    <View key={service.id} style={styles.serviceCard}>
      <View style={styles.serviceHeader}>
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>{service.name}</Text>
          <Text style={styles.serviceDescription}>{service.description}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(service.status) }]}>
          <Text style={styles.statusText}>{getStatusText(service.status)}</Text>
        </View>
      </View>
      
      <View style={styles.serviceMetrics}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Uptime</Text>
          <Text style={styles.metricValue}>{service.uptime}</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Response Time</Text>
          <Text style={styles.metricValue}>{service.responseTime}</Text>
        </View>
      </View>
      
      {service.lastIncident && (
        <View style={styles.incidentNote}>
          <Text style={styles.incidentNoteText}>⚠️ {service.lastIncident}</Text>
        </View>
      )}
    </View>
  );

  const renderIncidentCard = (incident: Incident) => (
    <View key={incident.id} style={styles.incidentCard}>
      <View style={styles.incidentHeader}>
        <View style={styles.incidentInfo}>
          <Text style={styles.incidentTitle}>{incident.title}</Text>
          <Text style={styles.incidentDescription}>{incident.description}</Text>
        </View>
        <View style={styles.incidentStatus}>
          <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(incident.severity) }]}>
            <Text style={styles.severityText}>{incident.severity.toUpperCase()}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(incident.status) }]}>
            <Text style={styles.statusText}>{getStatusText(incident.status)}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.incidentDetails}>
        <Text style={styles.incidentTime}>
          Started: {new Date(incident.startTime).toLocaleString()}
        </Text>
        {incident.endTime && (
          <Text style={styles.incidentTime}>
            Ended: {new Date(incident.endTime).toLocaleString()}
          </Text>
        )}
        <Text style={styles.affectedServices}>
          Affected: {incident.affectedServices.join(', ')}
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>System Status</Text>
        <Text style={styles.headerSubtitle}>
          Real-time status of NBCON Pro services
        </Text>
        <Text style={styles.lastUpdated}>
          Last updated: {lastUpdated.toLocaleString()}
        </Text>
      </View>

      {/* Overall Status */}
      <View style={styles.overallStatus}>
        <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(overallStatus) }]} />
        <Text style={styles.overallStatusText}>
          All systems {getStatusText(overallStatus).toLowerCase()}
        </Text>
      </View>

      {/* Services Status */}
      <View style={styles.servicesSection}>
        <Text style={styles.sectionTitle}>Service Status</Text>
        <Text style={styles.sectionSubtitle}>
          Current status of all NBCON Pro services
        </Text>
        
        {services.map(renderServiceCard)}
      </View>

      {/* Active Incidents */}
      {incidents.length > 0 && (
        <View style={styles.incidentsSection}>
          <Text style={styles.sectionTitle}>Active Incidents</Text>
          <Text style={styles.sectionSubtitle}>
            Current issues and maintenance activities
          </Text>
          
          {incidents.map(renderIncidentCard)}
        </View>
      )}

      {/* Historical Data */}
      <View style={styles.historySection}>
        <Text style={styles.sectionTitle}>Historical Uptime</Text>
        <Text style={styles.sectionSubtitle}>
          Service uptime over the past 30 days
        </Text>
        
        <View style={styles.historyGrid}>
          <View style={styles.historyCard}>
            <Text style={styles.historyPeriod}>Last 24 hours</Text>
            <Text style={styles.historyUptime}>99.9%</Text>
          </View>
          <View style={styles.historyCard}>
            <Text style={styles.historyPeriod}>Last 7 days</Text>
            <Text style={styles.historyUptime}>99.8%</Text>
          </View>
          <View style={styles.historyCard}>
            <Text style={styles.historyPeriod}>Last 30 days</Text>
            <Text style={styles.historyUptime}>99.7%</Text>
          </View>
        </View>
      </View>

      {/* Subscribe to Updates */}
      <View style={styles.subscribeSection}>
        <Text style={styles.sectionTitle}>Stay Updated</Text>
        <Text style={styles.sectionSubtitle}>
          Get notified about service status changes
        </Text>
        
        <View style={styles.subscribeOptions}>
          <TouchableOpacity style={styles.subscribeButton}>
            <Text style={styles.subscribeButtonText}>Email Updates</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.subscribeButton}>
            <Text style={styles.subscribeButtonText}>RSS Feed</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.subscribeButton}>
            <Text style={styles.subscribeButtonText}>API Status</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Contact Information */}
      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Need Help?</Text>
        <Text style={styles.contactText}>
          If you're experiencing issues not reflected in our status page, 
          please contact our support team.
        </Text>
        
        <View style={styles.contactInfo}>
          <Text style={styles.contactItem}>Email: status@nbcon.pro</Text>
          <Text style={styles.contactItem}>Phone: +966 11 123 4567</Text>
          <Text style={styles.contactItem}>Twitter: @NBCONProStatus</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#1e3a8a',
    padding: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e0e7ff',
    textAlign: 'center',
    marginBottom: 10,
  },
  lastUpdated: {
    fontSize: 14,
    color: '#a5b4fc',
  },
  overallStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  overallStatusText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  servicesSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 20,
  },
  serviceCard: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  serviceInfo: {
    flex: 1,
    marginRight: 15,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  serviceMetrics: {
    flexDirection: 'row',
    gap: 30,
  },
  metric: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  incidentNote: {
    backgroundColor: '#fef3c7',
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
  },
  incidentNoteText: {
    fontSize: 12,
    color: '#92400e',
  },
  incidentsSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  incidentCard: {
    backgroundColor: '#fef2f2',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  incidentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  incidentInfo: {
    flex: 1,
    marginRight: 15,
  },
  incidentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  incidentDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  incidentStatus: {
    alignItems: 'flex-end',
    gap: 5,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  severityText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  incidentDetails: {
    marginTop: 10,
  },
  incidentTime: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  affectedServices: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 5,
  },
  historySection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  historyGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  historyCard: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  historyPeriod: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 5,
  },
  historyUptime: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#059669',
  },
  subscribeSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  subscribeOptions: {
    flexDirection: 'row',
    gap: 10,
  },
  subscribeButton: {
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  subscribeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  contactSection: {
    backgroundColor: '#1e3a8a',
    padding: 30,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  contactText: {
    fontSize: 16,
    color: '#e0e7ff',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  contactInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  contactItem: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
  },
});

export default StatusPage;

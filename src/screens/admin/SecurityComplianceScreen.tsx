import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SecurityComplianceScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('threats');
  const [selectedPeriod, setSelectedPeriod] = useState('30days');

  const categories = [
    { id: 'threats', name: 'Threats', icon: 'shield' },
    { id: 'compliance', name: 'Compliance', icon: 'checkmark-circle' },
    { id: 'audit', name: 'Audit', icon: 'document-text' },
    { id: 'incidents', name: 'Incidents', icon: 'warning' },
  ];

  const periods = [
    { label: '7 Days', value: '7days' },
    { label: '30 Days', value: '30days' },
    { label: '90 Days', value: '90days' },
    { id: '1year', label: '1 Year', value: '1year' },
  ];

  const securityMetrics = {
    threatLevel: 'Low',
    activeThreats: 3,
    blockedAttempts: 1247,
    complianceScore: 94,
    auditReadiness: 98,
    lastScan: '2024-01-25 14:30',
    nextAudit: '2024-02-15',
  };

  const threatDetections = [
    {
      id: '1',
      type: 'Suspicious Login',
      severity: 'Medium',
      source: 'Unknown IP',
      description: 'Multiple failed login attempts from new location',
      detected: '2024-01-25 14:30',
      status: 'Blocked',
      action: 'IP Blocked',
    },
    {
      id: '2',
      type: 'Data Breach Attempt',
      severity: 'High',
      source: 'External',
      description: 'Attempted unauthorized access to user data',
      detected: '2024-01-24 16:45',
      status: 'Investigation',
      action: 'Under Review',
    },
    {
      id: '3',
      type: 'Malware Detection',
      severity: 'Low',
      source: 'File Upload',
      description: 'Suspicious file uploaded by user',
      detected: '2024-01-23 10:20',
      status: 'Resolved',
      action: 'File Quarantined',
    },
  ];

  const complianceItems = [
    {
      category: 'Data Protection',
      status: 'Compliant',
      score: 98,
      lastCheck: '2024-01-25',
      requirements: ['GDPR', 'PDPL'],
      issues: 0,
    },
    {
      category: 'Security Standards',
      status: 'Compliant',
      score: 95,
      lastCheck: '2024-01-24',
      requirements: ['ISO 27001', 'SOC 2'],
      issues: 1,
    },
    {
      category: 'Payment Security',
      status: 'Compliant',
      score: 100,
      lastCheck: '2024-01-25',
      requirements: ['PCI DSS'],
      issues: 0,
    },
    {
      category: 'Saudi Regulations',
      status: 'Compliant',
      score: 92,
      lastCheck: '2024-01-23',
      requirements: ['SAMA', 'NCA'],
      issues: 2,
    },
  ];

  const auditLogs = [
    {
      id: '1',
      user: 'Admin User',
      action: 'Changed system configuration',
      timestamp: '2024-01-25 14:30',
      ip: '192.168.1.100',
      status: 'Success',
    },
    {
      id: '2',
      user: 'Finance Team',
      action: 'Accessed payment data',
      timestamp: '2024-01-25 13:45',
      ip: '192.168.1.101',
      status: 'Success',
    },
    {
      id: '3',
      user: 'Unknown',
      action: 'Failed login attempt',
      timestamp: '2024-01-25 12:20',
      ip: '203.0.113.1',
      status: 'Blocked',
    },
  ];

  const securityIncidents = [
    {
      id: '1',
      title: 'Suspicious Activity Detected',
      severity: 'Medium',
      status: 'Investigating',
      reported: '2024-01-25 14:30',
      assigned: 'Security Team',
      description: 'Unusual data access patterns detected',
    },
    {
      id: '2',
      title: 'Failed Authentication Attempts',
      severity: 'Low',
      status: 'Resolved',
      reported: '2024-01-24 16:45',
      assigned: 'IT Team',
      description: 'Multiple failed login attempts from same IP',
    },
    {
      id: '3',
      title: 'Data Export Request',
      severity: 'Low',
      status: 'Pending',
      reported: '2024-01-23 10:20',
      assigned: 'Compliance Team',
      description: 'User requested data export - verification needed',
    },
  ];

  const CategoryButton = ({ category }: { category: any }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === category.id && styles.categoryButtonSelected
      ]}
      onPress={() => setSelectedCategory(category.id)}
    >
      <Ionicons 
        name={category.icon as any} 
        size={20} 
        color={selectedCategory === category.id ? '#ffffff' : '#007bff'} 
      />
      <Text style={[
        styles.categoryButtonText,
        selectedCategory === category.id && styles.categoryButtonTextSelected
      ]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  const PeriodButton = ({ period }: { period: any }) => (
    <TouchableOpacity
      style={[
        styles.periodButton,
        selectedPeriod === period.value && styles.periodButtonSelected
      ]}
      onPress={() => setSelectedPeriod(period.value)}
    >
      <Text style={[
        styles.periodButtonText,
        selectedPeriod === period.value && styles.periodButtonTextSelected
      ]}>
        {period.label}
      </Text>
    </TouchableOpacity>
  );

  const MetricCard = ({ title, value, status, icon, color }: { title: string; value: string; status: string; icon: string; color: string }) => (
    <View style={styles.metricCard}>
      <View style={styles.metricHeader}>
        <Ionicons name={icon as any} size={20} color={color} />
        <Text style={styles.metricTitle}>{title}</Text>
      </View>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricStatus}>{status}</Text>
    </View>
  );

  const ThreatItem = ({ threat }: { threat: any }) => (
    <View style={styles.threatItem}>
      <View style={styles.threatHeader}>
        <View style={styles.threatInfo}>
          <Text style={styles.threatType}>{threat.type}</Text>
          <Text style={styles.threatSource}>{threat.source}</Text>
        </View>
        <View style={[
          styles.severityBadge,
          { 
            backgroundColor: threat.severity === 'High' ? '#dc3545' : 
                           threat.severity === 'Medium' ? '#ffc107' : '#28a745'
          }
        ]}>
          <Text style={styles.severityText}>{threat.severity}</Text>
        </View>
      </View>
      <Text style={styles.threatDescription}>{threat.description}</Text>
      <View style={styles.threatMeta}>
        <Text style={styles.threatDetected}>Detected: {threat.detected}</Text>
        <Text style={styles.threatStatus}>Status: {threat.status}</Text>
        <Text style={styles.threatAction}>Action: {threat.action}</Text>
      </View>
    </View>
  );

  const ComplianceItem = ({ item }: { item: any }) => (
    <View style={styles.complianceItem}>
      <View style={styles.complianceHeader}>
        <Text style={styles.complianceCategory}>{item.category}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: item.status === 'Compliant' ? '#28a745' : '#dc3545' }
        ]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.complianceDetails}>
        <Text style={styles.complianceScore}>Score: {item.score}%</Text>
        <Text style={styles.complianceRequirements}>
          Requirements: {item.requirements.join(', ')}
        </Text>
        <Text style={styles.complianceIssues}>
          Issues: {item.issues} {item.issues === 1 ? 'issue' : 'issues'}
        </Text>
        <Text style={styles.complianceLastCheck}>
          Last check: {item.lastCheck}
        </Text>
      </View>
    </View>
  );

  const AuditLogItem = ({ log }: { log: any }) => (
    <View style={styles.auditLogItem}>
      <View style={styles.auditLogHeader}>
        <Text style={styles.auditLogUser}>{log.user}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: log.status === 'Success' ? '#28a745' : '#dc3545' }
        ]}>
          <Text style={styles.statusText}>{log.status}</Text>
        </View>
      </View>
      <Text style={styles.auditLogAction}>{log.action}</Text>
      <View style={styles.auditLogMeta}>
        <Text style={styles.auditLogTimestamp}>{log.timestamp}</Text>
        <Text style={styles.auditLogIP}>IP: {log.ip}</Text>
      </View>
    </View>
  );

  const IncidentItem = ({ incident }: { incident: any }) => (
    <View style={styles.incidentItem}>
      <View style={styles.incidentHeader}>
        <Text style={styles.incidentTitle}>{incident.title}</Text>
        <View style={[
          styles.severityBadge,
          { 
            backgroundColor: incident.severity === 'High' ? '#dc3545' : 
                           incident.severity === 'Medium' ? '#ffc107' : '#28a745'
          }
        ]}>
          <Text style={styles.severityText}>{incident.severity}</Text>
        </View>
      </View>
      <Text style={styles.incidentDescription}>{incident.description}</Text>
      <View style={styles.incidentMeta}>
        <Text style={styles.incidentStatus}>Status: {incident.status}</Text>
        <Text style={styles.incidentAssigned}>Assigned: {incident.assigned}</Text>
        <Text style={styles.incidentReported}>Reported: {incident.reported}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Security & Compliance</Text>
      <Text style={styles.subtitle}>
        Threat detection, compliance tracking, and audit readiness
      </Text>

      <View style={styles.categorySelector}>
        <Text style={styles.selectorTitle}>Security Category</Text>
        <View style={styles.categoryButtons}>
          {categories.map((category) => (
            <CategoryButton key={category.id} category={category} />
          ))}
        </View>
      </View>

      <View style={styles.periodSelector}>
        <Text style={styles.selectorTitle}>Time Period</Text>
        <View style={styles.periodButtons}>
          {periods.map((period) => (
            <PeriodButton key={period.value} period={period} />
          ))}
        </View>
      </View>

      <View style={styles.metricsGrid}>
        <MetricCard 
          title="Threat Level" 
          value={securityMetrics.threatLevel} 
          status="Low Risk" 
          icon="shield-checkmark" 
          color="#28a745" 
        />
        <MetricCard 
          title="Active Threats" 
          value={securityMetrics.activeThreats.toString()} 
          status="Monitoring" 
          icon="warning" 
          color="#ffc107" 
        />
        <MetricCard 
          title="Blocked Attempts" 
          value={securityMetrics.blockedAttempts.toLocaleString()} 
          status="This Month" 
          icon="ban" 
          color="#dc3545" 
        />
        <MetricCard 
          title="Compliance Score" 
          value={`${securityMetrics.complianceScore}%`} 
          status="Excellent" 
          icon="checkmark-circle" 
          color="#28a745" 
        />
      </View>

      {selectedCategory === 'threats' && (
        <View style={styles.threatsCard}>
          <Text style={styles.cardTitle}>Threat Detections</Text>
          {threatDetections.map((threat) => (
            <ThreatItem key={threat.id} threat={threat} />
          ))}
        </View>
      )}

      {selectedCategory === 'compliance' && (
        <View style={styles.complianceCard}>
          <Text style={styles.cardTitle}>Compliance Status</Text>
          {complianceItems.map((item, index) => (
            <ComplianceItem key={index} item={item} />
          ))}
        </View>
      )}

      {selectedCategory === 'audit' && (
        <View style={styles.auditCard}>
          <Text style={styles.cardTitle}>Audit Logs</Text>
          {auditLogs.map((log) => (
            <AuditLogItem key={log.id} log={log} />
          ))}
        </View>
      )}

      {selectedCategory === 'incidents' && (
        <View style={styles.incidentsCard}>
          <Text style={styles.cardTitle}>Security Incidents</Text>
          {securityIncidents.map((incident) => (
            <IncidentItem key={incident.id} incident={incident} />
          ))}
        </View>
      )}

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="shield-checkmark" size={24} color="#007bff" />
            <Text style={styles.actionText}>Run Security Scan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="document-text" size={24} color="#28a745" />
            <Text style={styles.actionText}>Generate Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Security Settings</Text>
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
          Security and compliance monitoring helps maintain platform integrity and regulatory adherence. 
          Regular monitoring and audits ensure data protection and user trust.
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
  categorySelector: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  selectorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  categoryButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryButtonSelected: {
    backgroundColor: '#007bff',
  },
  categoryButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  categoryButtonTextSelected: {
    color: '#ffffff',
  },
  periodSelector: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  periodButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  periodButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    width: '48%',
    alignItems: 'center',
  },
  periodButtonSelected: {
    backgroundColor: '#28a745',
  },
  periodButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  periodButtonTextSelected: {
    color: '#ffffff',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metricCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 15,
    width: '48%',
    marginBottom: 10,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  metricTitle: {
    fontSize: 12,
    color: '#cccccc',
    marginLeft: 8,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  metricStatus: {
    fontSize: 12,
    color: '#28a745',
    fontWeight: 'bold',
  },
  threatsCard: {
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
  threatItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  threatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  threatInfo: {
    flex: 1,
  },
  threatType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  threatSource: {
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
  threatDescription: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 10,
  },
  threatMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  threatDetected: {
    fontSize: 12,
    color: '#cccccc',
  },
  threatStatus: {
    fontSize: 12,
    color: '#cccccc',
  },
  threatAction: {
    fontSize: 12,
    color: '#cccccc',
  },
  complianceCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  complianceItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  complianceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  complianceCategory: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
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
  complianceDetails: {
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  complianceScore: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  complianceRequirements: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 5,
  },
  complianceIssues: {
    fontSize: 12,
    color: '#ffc107',
    marginBottom: 5,
  },
  complianceLastCheck: {
    fontSize: 12,
    color: '#cccccc',
  },
  auditCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  auditLogItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  auditLogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  auditLogUser: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  auditLogAction: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 8,
  },
  auditLogMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 8,
  },
  auditLogTimestamp: {
    fontSize: 12,
    color: '#cccccc',
  },
  auditLogIP: {
    fontSize: 12,
    color: '#cccccc',
  },
  incidentsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  incidentItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  incidentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  incidentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  incidentDescription: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 10,
  },
  incidentMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  incidentStatus: {
    fontSize: 12,
    color: '#cccccc',
  },
  incidentAssigned: {
    fontSize: 12,
    color: '#cccccc',
  },
  incidentReported: {
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

export default SecurityComplianceScreen;

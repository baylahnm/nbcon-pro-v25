import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const IntegrationAnalyticsScreen: React.FC = () => {
  const [selectedIntegration, setSelectedIntegration] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('30days');

  const integrations = [
    { id: 'all', name: 'All Integrations' },
    { id: 'sap', name: 'SAP ERP' },
    { id: 'oracle', name: 'Oracle Primavera' },
    { id: 'autocad', name: 'AutoCAD' },
    { id: 'revit', name: 'Revit' },
    { id: 'bim360', name: 'BIM 360' },
  ];

  const periods = [
    { label: '7 Days', value: '7days' },
    { label: '30 Days', value: '30days' },
    { label: '90 Days', value: '90days' },
    { label: '1 Year', value: '1year' },
  ];

  const integrationData = {
    sap: {
      name: 'SAP ERP',
      status: 'Active',
      uptime: 99.8,
      apiCalls: 15420,
      dataSync: 98.5,
      lastSync: '2024-01-25 14:30',
      errors: 12,
      icon: 'business',
    },
    oracle: {
      name: 'Oracle Primavera',
      status: 'Active',
      uptime: 99.5,
      apiCalls: 8930,
      dataSync: 97.2,
      lastSync: '2024-01-25 14:25',
      errors: 8,
      icon: 'calendar',
    },
    autocad: {
      name: 'AutoCAD',
      status: 'Active',
      uptime: 98.9,
      apiCalls: 2340,
      dataSync: 95.8,
      lastSync: '2024-01-25 14:20',
      errors: 3,
      icon: 'construct',
    },
    revit: {
      name: 'Revit',
      status: 'Warning',
      uptime: 97.2,
      apiCalls: 1870,
      dataSync: 92.1,
      lastSync: '2024-01-25 13:45',
      errors: 15,
      icon: 'cube',
    },
    bim360: {
      name: 'BIM 360',
      status: 'Active',
      uptime: 99.1,
      apiCalls: 4560,
      dataSync: 96.7,
      lastSync: '2024-01-25 14:15',
      errors: 5,
      icon: 'layers',
    },
  };

  const apiMetrics = [
    {
      endpoint: '/api/projects/sync',
      calls: 5420,
      avgResponse: 245,
      successRate: 99.2,
      lastCall: '2024-01-25 14:30',
    },
    {
      endpoint: '/api/engineers/update',
      calls: 3890,
      avgResponse: 180,
      successRate: 98.8,
      lastCall: '2024-01-25 14:28',
    },
    {
      endpoint: '/api/documents/upload',
      calls: 2150,
      avgResponse: 320,
      successRate: 97.5,
      lastCall: '2024-01-25 14:25',
    },
    {
      endpoint: '/api/payments/process',
      calls: 890,
      avgResponse: 450,
      successRate: 99.8,
      lastCall: '2024-01-25 14:22',
    },
  ];

  const dataFlowInsights = [
    {
      title: 'SAP Integration Performance',
      description: 'SAP ERP shows excellent uptime and data sync rates',
      impact: 'High',
      trend: '+2%',
      icon: 'trending-up',
    },
    {
      title: 'Revit Sync Issues',
      description: 'Revit integration experiencing intermittent sync problems',
      impact: 'Medium',
      trend: '-5%',
      icon: 'warning',
    },
    {
      title: 'API Response Optimization',
      description: 'Average response times improved by 15% this month',
      impact: 'High',
      trend: '+15%',
      icon: 'speedometer',
    },
  ];

  const IntegrationButton = ({ integration }: { integration: any }) => (
    <TouchableOpacity
      style={[
        styles.integrationButton,
        selectedIntegration === integration.id && styles.integrationButtonSelected
      ]}
      onPress={() => setSelectedIntegration(integration.id)}
    >
      <Text style={[
        styles.integrationButtonText,
        selectedIntegration === integration.id && styles.integrationButtonTextSelected
      ]}>
        {integration.name}
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

  const IntegrationCard = ({ integration }: { integration: any }) => (
    <View style={styles.integrationCard}>
      <View style={styles.integrationHeader}>
        <View style={styles.integrationInfo}>
          <Ionicons name={integration.icon as any} size={24} color="#007bff" />
          <Text style={styles.integrationName}>{integration.name}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: integration.status === 'Active' ? '#28a745' : 
                           integration.status === 'Warning' ? '#ffc107' : '#dc3545'
          }
        ]}>
          <Text style={styles.statusText}>{integration.status}</Text>
        </View>
      </View>
      <View style={styles.integrationMetrics}>
        <View style={styles.metric}>
          <Text style={styles.metricValue}>{integration.uptime}%</Text>
          <Text style={styles.metricLabel}>Uptime</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricValue}>{integration.apiCalls.toLocaleString()}</Text>
          <Text style={styles.metricLabel}>API Calls</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricValue}>{integration.dataSync}%</Text>
          <Text style={styles.metricLabel}>Data Sync</Text>
        </View>
      </View>
      <View style={styles.integrationFooter}>
        <Text style={styles.lastSync}>Last sync: {integration.lastSync}</Text>
        <Text style={styles.errorCount}>{integration.errors} errors</Text>
      </View>
    </View>
  );

  const ApiMetricItem = ({ metric }: { metric: any }) => (
    <View style={styles.apiMetricItem}>
      <View style={styles.apiMetricHeader}>
        <Text style={styles.endpointName}>{metric.endpoint}</Text>
        <Text style={styles.successRate}>{metric.successRate}%</Text>
      </View>
      <View style={styles.apiMetricStats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{metric.calls.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Calls</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{metric.avgResponse}ms</Text>
          <Text style={styles.statLabel}>Avg Response</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{metric.lastCall}</Text>
          <Text style={styles.statLabel}>Last Call</Text>
        </View>
      </View>
    </View>
  );

  const InsightCard = ({ insight }: { insight: any }) => (
    <View style={styles.insightCard}>
      <View style={styles.insightHeader}>
        <Ionicons name={insight.icon as any} size={20} color="#007bff" />
        <Text style={styles.insightTitle}>{insight.title}</Text>
        <View style={[
          styles.impactBadge,
          { backgroundColor: insight.impact === 'High' ? '#28a745' : '#ffc107' }
        ]}>
          <Text style={styles.impactText}>{insight.impact}</Text>
        </View>
      </View>
      <Text style={styles.insightDescription}>{insight.description}</Text>
      <Text style={[
        styles.trendText,
        { color: insight.trend.startsWith('+') ? '#28a745' : '#dc3545' }
      ]}>
        {insight.trend}
      </Text>
    </View>
  );

  const currentIntegrations = selectedIntegration === 'all' 
    ? Object.values(integrationData) 
    : [integrationData[selectedIntegration as keyof typeof integrationData]];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Integration Analytics</Text>
      <Text style={styles.subtitle}>
        Monitor API usage and integrations
      </Text>

      <View style={styles.integrationSelector}>
        <Text style={styles.selectorTitle}>Integration Filter</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.integrationButtons}>
            {integrations.map((integration) => (
              <IntegrationButton key={integration.id} integration={integration} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.periodSelector}>
        <Text style={styles.selectorTitle}>Time Period</Text>
        <View style={styles.periodButtons}>
          {periods.map((period) => (
            <PeriodButton key={period.value} period={period} />
          ))}
        </View>
      </View>

      <View style={styles.overviewCard}>
        <Text style={styles.cardTitle}>Integration Overview</Text>
        <View style={styles.overviewMetrics}>
          <View style={styles.overviewMetric}>
            <Text style={styles.overviewValue}>5</Text>
            <Text style={styles.overviewLabel}>Active Integrations</Text>
          </View>
          <View style={styles.overviewMetric}>
            <Text style={styles.overviewValue}>99.1%</Text>
            <Text style={styles.overviewLabel}>Avg Uptime</Text>
          </View>
          <View style={styles.overviewMetric}>
            <Text style={styles.overviewValue}>32,120</Text>
            <Text style={styles.overviewLabel}>Total API Calls</Text>
          </View>
        </View>
      </View>

      <View style={styles.integrationsCard}>
        <Text style={styles.cardTitle}>Integration Status</Text>
        {currentIntegrations.map((integration, index) => (
          <IntegrationCard key={index} integration={integration} />
        ))}
      </View>

      <View style={styles.apiMetricsCard}>
        <Text style={styles.cardTitle}>API Performance</Text>
        <Text style={styles.cardDescription}>
          Detailed API endpoint performance metrics
        </Text>
        {apiMetrics.map((metric, index) => (
          <ApiMetricItem key={index} metric={metric} />
        ))}
      </View>

      <View style={styles.dataFlowCard}>
        <Text style={styles.cardTitle}>Data Flow Insights</Text>
        {dataFlowInsights.map((insight, index) => (
          <InsightCard key={index} insight={insight} />
        ))}
      </View>

      <View style={styles.healthCard}>
        <Text style={styles.cardTitle}>System Health</Text>
        <View style={styles.healthMetrics}>
          <View style={styles.healthMetric}>
            <Ionicons name="checkmark-circle" size={20} color="#28a745" />
            <Text style={styles.healthText}>All systems operational</Text>
          </View>
          <View style={styles.healthMetric}>
            <Ionicons name="warning" size={20} color="#ffc107" />
            <Text style={styles.healthText}>Revit sync issues detected</Text>
          </View>
          <View style={styles.healthMetric}>
            <Ionicons name="trending-up" size={20} color="#007bff" />
            <Text style={styles.healthText}>Performance improving</Text>
          </View>
        </View>
      </View>

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="refresh" size={24} color="#007bff" />
            <Text style={styles.actionText}>Sync All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings" size={24} color="#28a745" />
            <Text style={styles.actionText}>Configure</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Export Logs</Text>
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
          Integration analytics monitor API performance, data synchronization, and system health. 
          Regular monitoring helps ensure smooth operation of all connected systems.
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
  integrationSelector: {
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
  integrationButtons: {
    flexDirection: 'row',
  },
  integrationButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    minWidth: 120,
    alignItems: 'center',
  },
  integrationButtonSelected: {
    backgroundColor: '#007bff',
  },
  integrationButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  integrationButtonTextSelected: {
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
  overviewCard: {
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
  overviewMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overviewMetric: {
    alignItems: 'center',
    flex: 1,
  },
  overviewValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  overviewLabel: {
    fontSize: 12,
    color: '#cccccc',
    textAlign: 'center',
  },
  integrationsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  integrationCard: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  integrationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  integrationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  integrationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 10,
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
  integrationMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  metric: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 10,
    color: '#cccccc',
  },
  integrationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lastSync: {
    fontSize: 12,
    color: '#cccccc',
  },
  errorCount: {
    fontSize: 12,
    color: '#dc3545',
  },
  apiMetricsCard: {
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
  apiMetricItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  apiMetricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  endpointName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  successRate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#28a745',
  },
  apiMetricStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: '#cccccc',
  },
  dataFlowCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  insightCard: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 10,
    flex: 1,
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  impactText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  insightDescription: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 8,
    lineHeight: 16,
  },
  trendText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  healthCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  healthMetrics: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
  },
  healthMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  healthText: {
    fontSize: 14,
    color: '#ffffff',
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

export default IntegrationAnalyticsScreen;

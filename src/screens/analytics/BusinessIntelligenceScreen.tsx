import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BusinessIntelligenceScreen: React.FC = () => {
  const [selectedDashboard, setSelectedDashboard] = useState('executive');
  const [selectedPeriod, setSelectedPeriod] = useState('30days');

  const dashboards = [
    { id: 'executive', name: 'Executive', icon: 'briefcase' },
    { id: 'financial', name: 'Financial', icon: 'cash' },
    { id: 'operational', name: 'Operational', icon: 'construct' },
    { id: 'customer', name: 'Customer', icon: 'people' },
  ];

  const periods = [
    { label: '7 Days', value: '7days' },
    { label: '30 Days', value: '30days' },
    { label: '90 Days', value: '90days' },
    { label: '1 Year', value: '1year' },
  ];

  const kpiMetrics = {
    revenue: {
      current: 2450000,
      previous: 2100000,
      change: '+16.7%',
      trend: 'up',
    },
    projects: {
      current: 156,
      previous: 142,
      change: '+9.9%',
      trend: 'up',
    },
    engineers: {
      current: 89,
      previous: 76,
      change: '+17.1%',
      trend: 'up',
    },
    satisfaction: {
      current: 4.7,
      previous: 4.5,
      change: '+4.4%',
      trend: 'up',
    },
  };

  const executiveInsights = [
    {
      title: 'Revenue Growth',
      description: 'Strong 16.7% revenue growth driven by Vision 2030 projects',
      impact: 'High',
      value: '+16.7%',
      icon: 'trending-up',
    },
    {
      title: 'Market Expansion',
      description: 'Successfully expanded to 3 new cities in Q4',
      impact: 'High',
      value: '+3 cities',
      icon: 'location',
    },
    {
      title: 'Team Growth',
      description: 'Added 13 new engineers to support increased demand',
      impact: 'Medium',
      value: '+17.1%',
      icon: 'people',
    },
    {
      title: 'Quality Improvement',
      description: 'Client satisfaction scores improved across all categories',
      impact: 'High',
      value: '4.7/5.0',
      icon: 'star',
    },
  ];

  const financialMetrics = [
    {
      category: 'Revenue',
      current: 2450000,
      target: 2500000,
      variance: -50000,
      percentage: 98,
    },
    {
      category: 'Expenses',
      current: 1800000,
      target: 1900000,
      variance: 100000,
      percentage: 95,
    },
    {
      category: 'Profit',
      current: 650000,
      target: 600000,
      variance: 50000,
      percentage: 108,
    },
    {
      category: 'ROI',
      current: 36.1,
      target: 31.6,
      variance: 4.5,
      percentage: 114,
    },
  ];

  const operationalMetrics = [
    {
      metric: 'Project Completion Rate',
      value: 94,
      target: 90,
      status: 'exceeded',
    },
    {
      metric: 'Average Response Time',
      value: 2.3,
      target: 3.0,
      status: 'exceeded',
    },
    {
      metric: 'Resource Utilization',
      value: 78,
      target: 80,
      status: 'below',
    },
    {
      metric: 'Quality Score',
      value: 4.7,
      target: 4.5,
      status: 'exceeded',
    },
  ];

  const DashboardButton = ({ dashboard }: { dashboard: any }) => (
    <TouchableOpacity
      style={[
        styles.dashboardButton,
        selectedDashboard === dashboard.id && styles.dashboardButtonSelected
      ]}
      onPress={() => setSelectedDashboard(dashboard.id)}
    >
      <Ionicons 
        name={dashboard.icon as any} 
        size={20} 
        color={selectedDashboard === dashboard.id ? '#ffffff' : '#007bff'} 
      />
      <Text style={[
        styles.dashboardButtonText,
        selectedDashboard === dashboard.id && styles.dashboardButtonTextSelected
      ]}>
        {dashboard.name}
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

  const KpiCard = ({ title, value, change, trend, icon }: { title: string; value: number | string; change: string; trend: string; icon: string }) => (
    <View style={styles.kpiCard}>
      <View style={styles.kpiHeader}>
        <Ionicons name={icon as any} size={20} color="#007bff" />
        <Text style={styles.kpiTitle}>{title}</Text>
      </View>
      <Text style={styles.kpiValue}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </Text>
      <Text style={[
        styles.kpiChange,
        { color: trend === 'up' ? '#28a745' : '#dc3545' }
      ]}>
        {change}
      </Text>
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
      <Text style={styles.insightValue}>{insight.value}</Text>
    </View>
  );

  const FinancialMetric = ({ metric }: { metric: any }) => (
    <View style={styles.financialMetric}>
      <View style={styles.metricHeader}>
        <Text style={styles.metricName}>{metric.category}</Text>
        <Text style={styles.metricPercentage}>{metric.percentage}%</Text>
      </View>
      <View style={styles.metricValues}>
        <Text style={styles.currentValue}>
          {metric.current.toLocaleString()} SAR
        </Text>
        <Text style={styles.targetValue}>
          Target: {metric.target.toLocaleString()} SAR
        </Text>
      </View>
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { 
              width: `${Math.min(metric.percentage, 100)}%`,
              backgroundColor: metric.percentage >= 100 ? '#28a745' : '#007bff'
            }
          ]} 
        />
      </View>
    </View>
  );

  const OperationalMetric = ({ metric }: { metric: any }) => (
    <View style={styles.operationalMetric}>
      <View style={styles.operationalHeader}>
        <Text style={styles.operationalName}>{metric.metric}</Text>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: metric.status === 'exceeded' ? '#28a745' : 
                           metric.status === 'below' ? '#dc3545' : '#ffc107'
          }
        ]}>
          <Text style={styles.statusText}>{metric.status}</Text>
        </View>
      </View>
      <Text style={styles.operationalValue}>
        {metric.value}{metric.metric.includes('Rate') || metric.metric.includes('Utilization') ? '%' : ''}
      </Text>
      <Text style={styles.operationalTarget}>
        Target: {metric.target}{metric.metric.includes('Rate') || metric.metric.includes('Utilization') ? '%' : ''}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Business Intelligence</Text>
      <Text style={styles.subtitle}>
        Unified BI dashboard for executive insights
      </Text>

      <View style={styles.dashboardSelector}>
        <Text style={styles.selectorTitle}>Dashboard View</Text>
        <View style={styles.dashboardButtons}>
          {dashboards.map((dashboard) => (
            <DashboardButton key={dashboard.id} dashboard={dashboard} />
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

      <View style={styles.kpiGrid}>
        <KpiCard 
          title="Revenue" 
          value={kpiMetrics.revenue.current} 
          change={kpiMetrics.revenue.change} 
          trend={kpiMetrics.revenue.trend} 
          icon="cash" 
        />
        <KpiCard 
          title="Active Projects" 
          value={kpiMetrics.projects.current} 
          change={kpiMetrics.projects.change} 
          trend={kpiMetrics.projects.trend} 
          icon="briefcase" 
        />
        <KpiCard 
          title="Engineers" 
          value={kpiMetrics.engineers.current} 
          change={kpiMetrics.engineers.change} 
          trend={kpiMetrics.engineers.trend} 
          icon="people" 
        />
        <KpiCard 
          title="Satisfaction" 
          value={kpiMetrics.satisfaction.current} 
          change={kpiMetrics.satisfaction.change} 
          trend={kpiMetrics.satisfaction.trend} 
          icon="star" 
        />
      </View>

      {selectedDashboard === 'executive' && (
        <View style={styles.insightsCard}>
          <Text style={styles.cardTitle}>Executive Insights</Text>
          {executiveInsights.map((insight, index) => (
            <InsightCard key={index} insight={insight} />
          ))}
        </View>
      )}

      {selectedDashboard === 'financial' && (
        <View style={styles.financialCard}>
          <Text style={styles.cardTitle}>Financial Performance</Text>
          {financialMetrics.map((metric, index) => (
            <FinancialMetric key={index} metric={metric} />
          ))}
        </View>
      )}

      {selectedDashboard === 'operational' && (
        <View style={styles.operationalCard}>
          <Text style={styles.cardTitle}>Operational Metrics</Text>
          {operationalMetrics.map((metric, index) => (
            <OperationalMetric key={index} metric={metric} />
          ))}
        </View>
      )}

      {selectedDashboard === 'customer' && (
        <View style={styles.customerCard}>
          <Text style={styles.cardTitle}>Customer Analytics</Text>
          <View style={styles.customerMetrics}>
            <View style={styles.customerMetric}>
              <Text style={styles.customerValue}>4.7/5.0</Text>
              <Text style={styles.customerLabel}>Avg Rating</Text>
            </View>
            <View style={styles.customerMetric}>
              <Text style={styles.customerValue}>94%</Text>
              <Text style={styles.customerLabel}>Retention Rate</Text>
            </View>
            <View style={styles.customerMetric}>
              <Text style={styles.customerValue}>156</Text>
              <Text style={styles.customerLabel}>Active Clients</Text>
            </View>
            <View style={styles.customerMetric}>
              <Text style={styles.customerValue}>23%</Text>
              <Text style={styles.customerLabel}>Growth Rate</Text>
            </View>
          </View>
        </View>
      )}

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download" size={24} color="#007bff" />
            <Text style={styles.actionText}>Export Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share" size={24} color="#28a745" />
            <Text style={styles.actionText}>Share Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Customize</Text>
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
          Business Intelligence dashboard provides comprehensive insights across all business functions. 
          Data is updated in real-time and can be customized based on your role and preferences.
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
  dashboardSelector: {
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
  dashboardButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dashboardButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashboardButtonSelected: {
    backgroundColor: '#007bff',
  },
  dashboardButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  dashboardButtonTextSelected: {
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
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  kpiCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 15,
    width: '48%',
    marginBottom: 10,
  },
  kpiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  kpiTitle: {
    fontSize: 12,
    color: '#cccccc',
    marginLeft: 8,
  },
  kpiValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  kpiChange: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  insightsCard: {
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
  insightValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#28a745',
  },
  financialCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  financialMetric: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  metricName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  metricPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007bff',
  },
  metricValues: {
    marginBottom: 10,
  },
  currentValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  targetValue: {
    fontSize: 12,
    color: '#cccccc',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#555555',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  operationalCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  operationalMetric: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  operationalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  operationalName: {
    fontSize: 14,
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
  operationalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  operationalTarget: {
    fontSize: 12,
    color: '#cccccc',
  },
  customerCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  customerMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  customerMetric: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    width: '48%',
    alignItems: 'center',
    marginBottom: 10,
  },
  customerValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  customerLabel: {
    fontSize: 12,
    color: '#cccccc',
    textAlign: 'center',
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

export default BusinessIntelligenceScreen;

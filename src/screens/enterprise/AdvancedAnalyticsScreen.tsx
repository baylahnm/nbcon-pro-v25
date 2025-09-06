import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AdvancedAnalyticsScreen: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const analyticsData = {
    revenue: {
      current: 2500000,
      previous: 2200000,
      change: 13.6,
      trend: 'up',
    },
    projects: {
      current: 45,
      previous: 38,
      change: 18.4,
      trend: 'up',
    },
    efficiency: {
      current: 87,
      previous: 82,
      change: 6.1,
      trend: 'up',
    },
    satisfaction: {
      current: 4.6,
      previous: 4.4,
      change: 4.5,
      trend: 'up',
    },
  };

  const departmentPerformance = [
    { name: 'Civil Engineering', revenue: 800000, projects: 15, efficiency: 92 },
    { name: 'MEP Systems', revenue: 600000, projects: 12, efficiency: 88 },
    { name: 'BIM Services', revenue: 700000, projects: 10, efficiency: 85 },
    { name: 'Surveying', revenue: 400000, projects: 8, efficiency: 90 },
  ];

  const projectMetrics = [
    { name: 'On-Time Delivery', value: 92, target: 95 },
    { name: 'Budget Adherence', value: 88, target: 90 },
    { name: 'Quality Score', value: 94, target: 95 },
    { name: 'Client Satisfaction', value: 4.6, target: 4.5 },
  ];

  const MetricButton = ({ metric, label }: { metric: string; label: string }) => (
    <TouchableOpacity
      style={[
        styles.metricButton,
        selectedMetric === metric && styles.metricButtonActive
      ]}
      onPress={() => setSelectedMetric(metric)}
    >
      <Text style={[
        styles.metricButtonText,
        selectedMetric === metric && styles.metricButtonTextActive
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const MetricCard = ({ title, data }: { title: string; data: any }) => (
    <View style={styles.metricCard}>
      <Text style={styles.metricTitle}>{title}</Text>
      <View style={styles.metricValueContainer}>
        <Text style={styles.metricValue}>
          {typeof data.current === 'number' && data.current > 1000 
            ? data.current.toLocaleString() 
            : data.current}
        </Text>
        <View style={styles.metricChange}>
          <Ionicons 
            name={data.trend === 'up' ? 'trending-up' : 'trending-down'} 
            size={16} 
            color={data.trend === 'up' ? '#28a745' : '#dc3545'} 
          />
          <Text style={[
            styles.changeText,
            { color: data.trend === 'up' ? '#28a745' : '#dc3545' }
          ]}>
            {data.change}%
          </Text>
        </View>
      </View>
      <Text style={styles.metricPrevious}>
        Previous: {typeof data.previous === 'number' && data.previous > 1000 
          ? data.previous.toLocaleString() 
          : data.previous}
      </Text>
    </View>
  );

  const DepartmentCard = ({ department }: { department: any }) => (
    <View style={styles.departmentCard}>
      <Text style={styles.departmentName}>{department.name}</Text>
      <View style={styles.departmentMetrics}>
        <View style={styles.departmentMetric}>
          <Text style={styles.metricLabel}>Revenue</Text>
          <Text style={styles.metricValue}>{department.revenue.toLocaleString()} SAR</Text>
        </View>
        <View style={styles.departmentMetric}>
          <Text style={styles.metricLabel}>Projects</Text>
          <Text style={styles.metricValue}>{department.projects}</Text>
        </View>
        <View style={styles.departmentMetric}>
          <Text style={styles.metricLabel}>Efficiency</Text>
          <Text style={styles.metricValue}>{department.efficiency}%</Text>
        </View>
      </View>
    </View>
  );

  const ProjectMetricItem = ({ metric }: { metric: any }) => (
    <View style={styles.projectMetricItem}>
      <View style={styles.metricHeader}>
        <Text style={styles.metricName}>{metric.name}</Text>
        <Text style={styles.metricValue}>
          {typeof metric.value === 'number' && metric.value < 10 
            ? metric.value.toFixed(1) 
            : metric.value}
          {typeof metric.value === 'number' && metric.value < 10 ? '' : '%'}
        </Text>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${(metric.value / metric.target) * 100}%`,
                backgroundColor: metric.value >= metric.target ? '#28a745' : '#ffc107'
              }
            ]} 
          />
        </View>
        <Text style={styles.targetText}>Target: {metric.target}%</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Advanced Analytics</Text>
      <Text style={styles.subtitle}>
        BI dashboards with custom reports and insights
      </Text>

      <View style={styles.metricSelector}>
        <MetricButton metric="revenue" label="Revenue" />
        <MetricButton metric="projects" label="Projects" />
        <MetricButton metric="efficiency" label="Efficiency" />
        <MetricButton metric="satisfaction" label="Satisfaction" />
      </View>

      <View style={styles.overviewCard}>
        <Text style={styles.cardTitle}>Key Performance Indicators</Text>
        <View style={styles.metricsGrid}>
          <MetricCard title="Revenue" data={analyticsData.revenue} />
          <MetricCard title="Active Projects" data={analyticsData.projects} />
          <MetricCard title="Efficiency" data={analyticsData.efficiency} />
          <MetricCard title="Client Satisfaction" data={analyticsData.satisfaction} />
        </View>
      </View>

      <View style={styles.departmentsCard}>
        <Text style={styles.cardTitle}>Department Performance</Text>
        {departmentPerformance.map((department, index) => (
          <DepartmentCard key={index} department={department} />
        ))}
      </View>

      <View style={styles.projectMetricsCard}>
        <Text style={styles.cardTitle}>Project Metrics</Text>
        {projectMetrics.map((metric, index) => (
          <ProjectMetricItem key={index} metric={metric} />
        ))}
      </View>

      <View style={styles.chartsCard}>
        <Text style={styles.cardTitle}>Visual Analytics</Text>
        <View style={styles.chartPlaceholder}>
          <Ionicons name="bar-chart" size={60} color="#6c757d" />
          <Text style={styles.chartText}>Revenue Trend Chart</Text>
          <Text style={styles.chartSubtext}>Monthly revenue over the past 12 months</Text>
        </View>
        <View style={styles.chartPlaceholder}>
          <Ionicons name="pie-chart" size={60} color="#6c757d" />
          <Text style={styles.chartText}>Project Distribution</Text>
          <Text style={styles.chartSubtext}>Projects by department and status</Text>
        </View>
      </View>

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="document-text" size={24} color="#007bff" />
            <Text style={styles.actionText}>Generate Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download" size={24} color="#28a745" />
            <Text style={styles.actionText}>Export Data</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Customize</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          Advanced analytics provide deep insights into business performance. 
          Customize reports and dashboards to track the metrics that matter most to your organization.
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
  metricSelector: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  metricButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  metricButtonActive: {
    backgroundColor: '#007bff',
  },
  metricButtonText: {
    color: '#cccccc',
    fontSize: 14,
    fontWeight: '500',
  },
  metricButtonTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
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
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  metricTitle: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 10,
  },
  metricValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  metricPrevious: {
    fontSize: 12,
    color: '#cccccc',
  },
  departmentsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  departmentCard: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  departmentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  departmentMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  departmentMetric: {
    alignItems: 'center',
    flex: 1,
  },
  metricLabel: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 5,
  },
  projectMetricsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  projectMetricItem: {
    marginBottom: 15,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricName: {
    fontSize: 14,
    color: '#ffffff',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#3a3a3a',
    borderRadius: 3,
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  targetText: {
    fontSize: 12,
    color: '#cccccc',
  },
  chartsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  chartPlaceholder: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
  chartText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
    marginBottom: 5,
  },
  chartSubtext: {
    fontSize: 14,
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

export default AdvancedAnalyticsScreen;

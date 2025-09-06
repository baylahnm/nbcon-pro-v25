import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MLOptimizationScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('models');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const tabs = [
    { id: 'models', name: 'Models', icon: 'hardware-chip' },
    { id: 'performance', name: 'Performance', icon: 'speedometer' },
    { id: 'training', name: 'Training', icon: 'school' },
    { id: 'monitoring', name: 'Monitoring', icon: 'eye' },
  ];

  const statuses = [
    { id: 'all', name: 'All' },
    { id: 'active', name: 'Active' },
    { id: 'training', name: 'Training' },
    { id: 'deployed', name: 'Deployed' },
  ];

  const models = [
    {
      id: '1',
      name: 'Job Matching AI',
      type: 'Recommendation Engine',
      status: 'Deployed',
      version: 'v2.1.3',
      accuracy: 94.2,
      precision: 92.8,
      recall: 89.5,
      f1Score: 91.1,
      lastTrained: '2024-01-25 14:30:15',
      trainingData: '156,789 samples',
      modelSize: '245 MB',
      inferenceTime: '12ms',
      uptime: '99.8%',
    },
    {
      id: '2',
      name: 'Price Prediction AI',
      type: 'Regression Model',
      status: 'Training',
      version: 'v1.4.2',
      accuracy: 87.3,
      precision: 85.6,
      recall: 88.9,
      f1Score: 87.2,
      lastTrained: '2024-01-25 16:45:22',
      trainingData: '89,234 samples',
      modelSize: '189 MB',
      inferenceTime: '8ms',
      uptime: '99.5%',
    },
    {
      id: '3',
      name: 'Document Analysis AI',
      type: 'Computer Vision',
      status: 'Active',
      version: 'v3.0.1',
      accuracy: 96.7,
      precision: 95.2,
      recall: 94.8,
      f1Score: 95.0,
      lastTrained: '2024-01-24 10:15:30',
      trainingData: '234,567 samples',
      modelSize: '456 MB',
      inferenceTime: '25ms',
      uptime: '99.9%',
    },
    {
      id: '4',
      name: 'Fraud Detection AI',
      type: 'Anomaly Detection',
      status: 'Deployed',
      version: 'v1.8.5',
      accuracy: 98.1,
      precision: 97.3,
      recall: 96.8,
      f1Score: 97.0,
      lastTrained: '2024-01-23 18:20:45',
      trainingData: '67,890 samples',
      modelSize: '123 MB',
      inferenceTime: '6ms',
      uptime: '99.7%',
    },
  ];

  const performanceMetrics = [
    {
      id: '1',
      metric: 'Overall Accuracy',
      current: 94.2,
      target: 95.0,
      trend: 'up',
      change: +1.2,
      status: 'Good',
      lastUpdated: '2024-01-25 14:30:15',
    },
    {
      id: '2',
      metric: 'Response Time',
      current: 15.3,
      target: 20.0,
      trend: 'down',
      change: -2.1,
      status: 'Excellent',
      lastUpdated: '2024-01-25 14:30:15',
    },
    {
      id: '3',
      metric: 'Throughput',
      current: 1250,
      target: 1000,
      trend: 'up',
      change: +150,
      status: 'Excellent',
      lastUpdated: '2024-01-25 14:30:15',
    },
    {
      id: '4',
      metric: 'Error Rate',
      current: 0.8,
      target: 1.0,
      trend: 'down',
      change: -0.3,
      status: 'Good',
      lastUpdated: '2024-01-25 14:30:15',
    },
    {
      id: '5',
      metric: 'Model Drift',
      current: 2.3,
      target: 5.0,
      trend: 'stable',
      change: 0.0,
      status: 'Good',
      lastUpdated: '2024-01-25 14:30:15',
    },
  ];

  const trainingJobs = [
    {
      id: '1',
      modelName: 'Job Matching AI',
      status: 'Completed',
      startTime: '2024-01-25 12:00:00',
      endTime: '2024-01-25 14:30:15',
      duration: '2h 30m',
      epochs: 50,
      batchSize: 32,
      learningRate: 0.001,
      loss: 0.0234,
      accuracy: 94.2,
      dataSize: '156,789 samples',
    },
    {
      id: '2',
      modelName: 'Price Prediction AI',
      status: 'Running',
      startTime: '2024-01-25 16:45:22',
      endTime: null,
      duration: 'Ongoing',
      epochs: 25,
      batchSize: 64,
      learningRate: 0.0005,
      loss: 0.0456,
      accuracy: 87.3,
      dataSize: '89,234 samples',
    },
    {
      id: '3',
      modelName: 'Document Analysis AI',
      status: 'Scheduled',
      startTime: '2024-01-26 02:00:00',
      endTime: null,
      duration: 'Planned',
      epochs: 100,
      batchSize: 16,
      learningRate: 0.0001,
      loss: null,
      accuracy: null,
      dataSize: '234,567 samples',
    },
  ];

  const monitoringData = [
    {
      id: '1',
      modelName: 'Job Matching AI',
      requests: 1247,
      errors: 3,
      avgResponseTime: 12.5,
      p95ResponseTime: 18.2,
      p99ResponseTime: 25.8,
      cpuUsage: 45.2,
      memoryUsage: 67.8,
      gpuUsage: 23.4,
      lastUpdated: '2024-01-25 14:30:15',
    },
    {
      id: '2',
      modelName: 'Price Prediction AI',
      requests: 892,
      errors: 1,
      avgResponseTime: 8.3,
      p95ResponseTime: 12.1,
      p99ResponseTime: 16.7,
      cpuUsage: 38.7,
      memoryUsage: 54.2,
      gpuUsage: 18.9,
      lastUpdated: '2024-01-25 14:30:15',
    },
    {
      id: '3',
      modelName: 'Document Analysis AI',
      requests: 567,
      errors: 2,
      avgResponseTime: 25.1,
      p95ResponseTime: 35.6,
      p99ResponseTime: 48.2,
      cpuUsage: 72.3,
      memoryUsage: 89.1,
      gpuUsage: 45.7,
      lastUpdated: '2024-01-25 14:30:15',
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

  const ModelItem = ({ model }: { model: any }) => (
    <View style={styles.modelItem}>
      <View style={styles.modelHeader}>
        <View style={styles.modelInfo}>
          <Text style={styles.modelName}>{model.name}</Text>
          <Text style={styles.modelType}>{model.type}</Text>
          <Text style={styles.modelVersion}>Version: {model.version}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: model.status === 'Deployed' ? '#28a745' : 
                           model.status === 'Active' ? '#007bff' : '#ffc107'
          }
        ]}>
          <Text style={styles.statusText}>{model.status}</Text>
        </View>
      </View>
      
      <View style={styles.modelMetrics}>
        <View style={styles.modelMetric}>
          <Text style={styles.modelMetricValue}>{model.accuracy}%</Text>
          <Text style={styles.modelMetricLabel}>Accuracy</Text>
        </View>
        <View style={styles.modelMetric}>
          <Text style={styles.modelMetricValue}>{model.precision}%</Text>
          <Text style={styles.modelMetricLabel}>Precision</Text>
        </View>
        <View style={styles.modelMetric}>
          <Text style={styles.modelMetricValue}>{model.recall}%</Text>
          <Text style={styles.modelMetricLabel}>Recall</Text>
        </View>
        <View style={styles.modelMetric}>
          <Text style={styles.modelMetricValue}>{model.f1Score}%</Text>
          <Text style={styles.modelMetricLabel}>F1 Score</Text>
        </View>
      </View>

      <View style={styles.modelSpecs}>
        <View style={styles.modelSpec}>
          <Text style={styles.modelSpecLabel}>Model Size:</Text>
          <Text style={styles.modelSpecValue}>{model.modelSize}</Text>
        </View>
        <View style={styles.modelSpec}>
          <Text style={styles.modelSpecLabel}>Inference Time:</Text>
          <Text style={styles.modelSpecValue}>{model.inferenceTime}</Text>
        </View>
        <View style={styles.modelSpec}>
          <Text style={styles.modelSpecLabel}>Uptime:</Text>
          <Text style={styles.modelSpecValue}>{model.uptime}</Text>
        </View>
        <View style={styles.modelSpec}>
          <Text style={styles.modelSpecLabel}>Training Data:</Text>
          <Text style={styles.modelSpecValue}>{model.trainingData}</Text>
        </View>
      </View>

      <Text style={styles.modelLastTrained}>
        Last Trained: {model.lastTrained}
      </Text>
    </View>
  );

  const PerformanceItem = ({ metric }: { metric: any }) => (
    <View style={styles.performanceItem}>
      <View style={styles.performanceHeader}>
        <Text style={styles.metricName}>{metric.metric}</Text>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: metric.status === 'Excellent' ? '#28a745' : 
                           metric.status === 'Good' ? '#007bff' : '#ffc107'
          }
        ]}>
          <Text style={styles.statusText}>{metric.status}</Text>
        </View>
      </View>
      
      <View style={styles.performanceValues}>
        <View style={styles.performanceValue}>
          <Text style={styles.performanceValueText}>{metric.current}</Text>
          <Text style={styles.performanceValueLabel}>Current</Text>
        </View>
        <View style={styles.performanceValue}>
          <Text style={styles.performanceValueText}>{metric.target}</Text>
          <Text style={styles.performanceValueLabel}>Target</Text>
        </View>
        <View style={styles.performanceValue}>
          <Text style={[
            styles.performanceChangeText,
            { color: metric.trend === 'up' ? '#28a745' : metric.trend === 'down' ? '#dc3545' : '#ffc107' }
          ]}>
            {metric.change > 0 ? '+' : ''}{metric.change}
          </Text>
          <Text style={styles.performanceValueLabel}>Change</Text>
        </View>
      </View>

      <View style={styles.performanceMeta}>
        <Text style={styles.performanceMetaText}>
          Last Updated: {metric.lastUpdated}
        </Text>
        <View style={styles.trendIndicator}>
          <Ionicons 
            name={metric.trend === 'up' ? 'trending-up' : metric.trend === 'down' ? 'trending-down' : 'remove'} 
            size={16} 
            color={metric.trend === 'up' ? '#28a745' : metric.trend === 'down' ? '#dc3545' : '#ffc107'} 
          />
          <Text style={[
            styles.trendText,
            { color: metric.trend === 'up' ? '#28a745' : metric.trend === 'down' ? '#dc3545' : '#ffc107' }
          ]}>
            {metric.trend === 'up' ? 'Improving' : metric.trend === 'down' ? 'Declining' : 'Stable'}
          </Text>
        </View>
      </View>
    </View>
  );

  const TrainingItem = ({ job }: { job: any }) => (
    <View style={styles.trainingItem}>
      <View style={styles.trainingHeader}>
        <Text style={styles.trainingModelName}>{job.modelName}</Text>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: job.status === 'Completed' ? '#28a745' : 
                           job.status === 'Running' ? '#007bff' : '#ffc107'
          }
        ]}>
          <Text style={styles.statusText}>{job.status}</Text>
        </View>
      </View>
      
      <View style={styles.trainingStats}>
        <View style={styles.trainingStat}>
          <Text style={styles.trainingStatValue}>{job.epochs}</Text>
          <Text style={styles.trainingStatLabel}>Epochs</Text>
        </View>
        <View style={styles.trainingStat}>
          <Text style={styles.trainingStatValue}>{job.batchSize}</Text>
          <Text style={styles.trainingStatLabel}>Batch Size</Text>
        </View>
        <View style={styles.trainingStat}>
          <Text style={styles.trainingStatValue}>{job.learningRate}</Text>
          <Text style={styles.trainingStatLabel}>Learning Rate</Text>
        </View>
        <View style={styles.trainingStat}>
          <Text style={styles.trainingStatValue}>{job.duration}</Text>
          <Text style={styles.trainingStatLabel}>Duration</Text>
        </View>
      </View>

      {job.loss && (
        <View style={styles.trainingMetrics}>
          <View style={styles.trainingMetric}>
            <Text style={styles.trainingMetricLabel}>Loss:</Text>
            <Text style={styles.trainingMetricValue}>{job.loss}</Text>
          </View>
          <View style={styles.trainingMetric}>
            <Text style={styles.trainingMetricLabel}>Accuracy:</Text>
            <Text style={styles.trainingMetricValue}>{job.accuracy}%</Text>
          </View>
        </View>
      )}

      <View style={styles.trainingMeta}>
        <Text style={styles.trainingMetaText}>
          Start: {job.startTime}
        </Text>
        <Text style={styles.trainingMetaText}>
          End: {job.endTime || 'Ongoing'}
        </Text>
        <Text style={styles.trainingMetaText}>
          Data: {job.dataSize}
        </Text>
      </View>
    </View>
  );

  const MonitoringItem = ({ data }: { data: any }) => (
    <View style={styles.monitoringItem}>
      <View style={styles.monitoringHeader}>
        <Text style={styles.monitoringModelName}>{data.modelName}</Text>
        <Text style={styles.monitoringLastUpdated}>
          Last Updated: {data.lastUpdated}
        </Text>
      </View>
      
      <View style={styles.monitoringStats}>
        <View style={styles.monitoringStat}>
          <Text style={styles.monitoringStatValue}>{data.requests}</Text>
          <Text style={styles.monitoringStatLabel}>Requests</Text>
        </View>
        <View style={styles.monitoringStat}>
          <Text style={styles.monitoringStatValue}>{data.errors}</Text>
          <Text style={styles.monitoringStatLabel}>Errors</Text>
        </View>
        <View style={styles.monitoringStat}>
          <Text style={styles.monitoringStatValue}>{data.avgResponseTime}ms</Text>
          <Text style={styles.monitoringStatLabel}>Avg Response</Text>
        </View>
        <View style={styles.monitoringStat}>
          <Text style={styles.monitoringStatValue}>{data.p95ResponseTime}ms</Text>
          <Text style={styles.monitoringStatLabel}>P95 Response</Text>
        </View>
      </View>

      <View style={styles.monitoringResources}>
        <View style={styles.monitoringResource}>
          <Text style={styles.monitoringResourceLabel}>CPU Usage:</Text>
          <Text style={styles.monitoringResourceValue}>{data.cpuUsage}%</Text>
        </View>
        <View style={styles.monitoringResource}>
          <Text style={styles.monitoringResourceLabel}>Memory Usage:</Text>
          <Text style={styles.monitoringResourceValue}>{data.memoryUsage}%</Text>
        </View>
        <View style={styles.monitoringResource}>
          <Text style={styles.monitoringResourceLabel}>GPU Usage:</Text>
          <Text style={styles.monitoringResourceValue}>{data.gpuUsage}%</Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>ML Optimization</Text>
      <Text style={styles.subtitle}>
        Monitor AI models powering platform features
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

      {selectedTab === 'models' && (
        <View style={styles.modelsCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>AI Models</Text>
            <View style={styles.statusFilter}>
              {statuses.map((status) => (
                <StatusButton key={status.id} status={status} />
              ))}
            </View>
          </View>
          {models.map((model) => (
            <ModelItem key={model.id} model={model} />
          ))}
        </View>
      )}

      {selectedTab === 'performance' && (
        <View style={styles.performanceCard}>
          <Text style={styles.cardTitle}>Performance Metrics</Text>
          {performanceMetrics.map((metric) => (
            <PerformanceItem key={metric.id} metric={metric} />
          ))}
        </View>
      )}

      {selectedTab === 'training' && (
        <View style={styles.trainingCard}>
          <Text style={styles.cardTitle}>Training Jobs</Text>
          {trainingJobs.map((job) => (
            <TrainingItem key={job.id} job={job} />
          ))}
        </View>
      )}

      {selectedTab === 'monitoring' && (
        <View style={styles.monitoringCard}>
          <Text style={styles.cardTitle}>Real-time Monitoring</Text>
          {monitoringData.map((data) => (
            <MonitoringItem key={data.id} data={data} />
          ))}
        </View>
      )}

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add" size={24} color="#007bff" />
            <Text style={styles.actionText}>New Model</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="play" size={24} color="#28a745" />
            <Text style={styles.actionText}>Start Training</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="analytics" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Optimize</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Configure</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          ML optimization provides comprehensive monitoring and management of AI models, 
          including performance tracking, training management, and real-time monitoring.
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
  modelsCard: {
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
  modelItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  modelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  modelInfo: {
    flex: 1,
  },
  modelName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  modelType: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 2,
  },
  modelVersion: {
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
  modelMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  modelMetric: {
    alignItems: 'center',
  },
  modelMetricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 2,
  },
  modelMetricLabel: {
    fontSize: 10,
    color: '#cccccc',
  },
  modelSpecs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  modelSpec: {
    width: '50%',
    marginBottom: 5,
  },
  modelSpecLabel: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 2,
  },
  modelSpecValue: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  modelLastTrained: {
    fontSize: 12,
    color: '#cccccc',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  performanceCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  performanceItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  performanceHeader: {
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
  performanceValues: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  performanceValue: {
    alignItems: 'center',
  },
  performanceValueText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 2,
  },
  performanceValueLabel: {
    fontSize: 10,
    color: '#cccccc',
  },
  performanceChangeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  performanceMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  performanceMetaText: {
    fontSize: 12,
    color: '#cccccc',
  },
  trendIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  trainingCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  trainingItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  trainingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  trainingModelName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  trainingStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  trainingStat: {
    alignItems: 'center',
  },
  trainingStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 2,
  },
  trainingStatLabel: {
    fontSize: 10,
    color: '#cccccc',
  },
  trainingMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  trainingMetric: {
    alignItems: 'center',
  },
  trainingMetricLabel: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 2,
  },
  trainingMetricValue: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  trainingMeta: {
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  trainingMetaText: {
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
  monitoringModelName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  monitoringLastUpdated: {
    fontSize: 12,
    color: '#cccccc',
  },
  monitoringStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  monitoringStat: {
    alignItems: 'center',
  },
  monitoringStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 2,
  },
  monitoringStatLabel: {
    fontSize: 10,
    color: '#cccccc',
  },
  monitoringResources: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  monitoringResource: {
    alignItems: 'center',
  },
  monitoringResourceLabel: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 2,
  },
  monitoringResourceValue: {
    fontSize: 14,
    color: '#ffffff',
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

export default MLOptimizationScreen;

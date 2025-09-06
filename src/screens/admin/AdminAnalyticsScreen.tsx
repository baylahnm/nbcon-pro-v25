import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AdminAnalyticsScreen: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [selectedMetric, setSelectedMetric] = useState('growth');

  const periods = [
    { label: '7 Days', value: '7days' },
    { label: '30 Days', value: '30days' },
    { label: '90 Days', value: '90days' },
    { label: '1 Year', value: '1year' },
  ];

  const metrics = [
    { id: 'growth', name: 'Growth', icon: 'trending-up' },
    { id: 'performance', name: 'Performance', icon: 'speedometer' },
    { id: 'usage', name: 'Usage', icon: 'analytics' },
    { id: 'revenue', name: 'Revenue', icon: 'cash' },
  ];

  const growthMetrics = {
    newUsers: 156,
    activeUsers: 1247,
    userGrowth: 12.5,
    retentionRate: 78.3,
    churnRate: 2.1,
    engagementScore: 4.2,
  };

  const performanceMetrics = {
    responseTime: 245,
    uptime: 99.8,
    errorRate: 0.2,
    loadTime: 1.2,
    apiCalls: 45678,
    successRate: 99.5,
  };

  const usageMetrics = {
    dailyActiveUsers: 1247,
    weeklyActiveUsers: 3456,
    monthlyActiveUsers: 8934,
    averageSessionTime: 24.5,
    pageViews: 156789,
    featureUsage: 87.2,
  };

  const revenueMetrics = {
    totalRevenue: 2450000,
    monthlyRecurring: 180000,
    transactionVolume: 3456,
    averageTransaction: 708,
    revenueGrowth: 15.3,
    profitMargin: 32.1,
  };

  const userGrowthData = [
    { month: 'Jan', users: 1200, growth: 5.2 },
    { month: 'Feb', users: 1350, growth: 12.5 },
    { month: 'Mar', users: 1520, growth: 12.6 },
    { month: 'Apr', users: 1680, growth: 10.5 },
    { month: 'May', users: 1850, growth: 10.1 },
    { month: 'Jun', users: 2100, growth: 13.5 },
  ];

  const topFeatures = [
    { name: 'Job Posting', usage: 95, trend: '+5%' },
    { name: 'Engineer Search', usage: 87, trend: '+3%' },
    { name: 'Messaging', usage: 82, trend: '+8%' },
    { name: 'Payments', usage: 78, trend: '+2%' },
    { name: 'Analytics', usage: 65, trend: '+12%' },
  ];

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

  const MetricButton = ({ metric }: { metric: any }) => (
    <TouchableOpacity
      style={[
        styles.metricButton,
        selectedMetric === metric.id && styles.metricButtonSelected
      ]}
      onPress={() => setSelectedMetric(metric.id)}
    >
      <Ionicons 
        name={metric.icon as any} 
        size={20} 
        color={selectedMetric === metric.id ? '#ffffff' : '#007bff'} 
      />
      <Text style={[
        styles.metricButtonText,
        selectedMetric === metric.id && styles.metricButtonTextSelected
      ]}>
        {metric.name}
      </Text>
    </TouchableOpacity>
  );

  const MetricCard = ({ title, value, change, trend, icon, color }: { title: string; value: string; change: string; trend: string; icon: string; color: string }) => (
    <View style={styles.metricCard}>
      <View style={styles.metricHeader}>
        <Ionicons name={icon as any} size={20} color={color} />
        <Text style={styles.metricTitle}>{title}</Text>
      </View>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={[
        styles.metricChange,
        { color: trend === 'up' ? '#28a745' : '#dc3545' }
      ]}>
        {change}
      </Text>
    </View>
  );

  const GrowthChart = () => (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>User Growth Trend</Text>
      <View style={styles.chart}>
        {userGrowthData.map((data, index) => (
          <View key={index} style={styles.chartBar}>
            <View 
              style={[
                styles.barFill, 
                { height: (data.users / 2100) * 100 }
              ]} 
            />
            <Text style={styles.barLabel}>{data.month}</Text>
            <Text style={styles.barValue}>{data.users}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const FeatureUsageItem = ({ feature }: { feature: any }) => (
    <View style={styles.featureItem}>
      <View style={styles.featureHeader}>
        <Text style={styles.featureName}>{feature.name}</Text>
        <Text style={styles.featureUsage}>{feature.usage}%</Text>
      </View>
      <View style={styles.featureBar}>
        <View 
          style={[
            styles.featureBarFill, 
            { width: `${feature.usage}%` }
          ]} 
        />
      </View>
      <Text style={[
        styles.featureTrend,
        { color: feature.trend.startsWith('+') ? '#28a745' : '#dc3545' }
      ]}>
        {feature.trend}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Admin Analytics</Text>
      <Text style={styles.subtitle}>
        Admin analytics dashboard for growth, performance, and usage
      </Text>

      <View style={styles.periodSelector}>
        <Text style={styles.selectorTitle}>Time Period</Text>
        <View style={styles.periodButtons}>
          {periods.map((period) => (
            <PeriodButton key={period.value} period={period} />
          ))}
        </View>
      </View>

      <View style={styles.metricSelector}>
        <Text style={styles.selectorTitle}>Analytics Focus</Text>
        <View style={styles.metricButtons}>
          {metrics.map((metric) => (
            <MetricButton key={metric.id} metric={metric} />
          ))}
        </View>
      </View>

      {selectedMetric === 'growth' && (
        <View style={styles.metricsGrid}>
          <MetricCard 
            title="New Users" 
            value={growthMetrics.newUsers.toLocaleString()} 
            change="+12.5%" 
            trend="up" 
            icon="person-add" 
            color="#28a745" 
          />
          <MetricCard 
            title="Active Users" 
            value={growthMetrics.activeUsers.toLocaleString()} 
            change="+8.3%" 
            trend="up" 
            icon="people" 
            color="#007bff" 
          />
          <MetricCard 
            title="Retention Rate" 
            value={`${growthMetrics.retentionRate}%`} 
            change="+2.1%" 
            trend="up" 
            icon="trending-up" 
            color="#ffc107" 
          />
          <MetricCard 
            title="Churn Rate" 
            value={`${growthMetrics.churnRate}%`} 
            change="-0.5%" 
            trend="down" 
            icon="trending-down" 
            color="#dc3545" 
          />
        </View>
      )}

      {selectedMetric === 'performance' && (
        <View style={styles.metricsGrid}>
          <MetricCard 
            title="Response Time" 
            value={`${performanceMetrics.responseTime}ms`} 
            change="-15ms" 
            trend="down" 
            icon="speedometer" 
            color="#28a745" 
          />
          <MetricCard 
            title="Uptime" 
            value={`${performanceMetrics.uptime}%`} 
            change="+0.2%" 
            trend="up" 
            icon="server" 
            color="#007bff" 
          />
          <MetricCard 
            title="Error Rate" 
            value={`${performanceMetrics.errorRate}%`} 
            change="-0.1%" 
            trend="down" 
            icon="warning" 
            color="#dc3545" 
          />
          <MetricCard 
            title="Success Rate" 
            value={`${performanceMetrics.successRate}%`} 
            change="+0.3%" 
            trend="up" 
            icon="checkmark-circle" 
            color="#28a745" 
          />
        </View>
      )}

      {selectedMetric === 'usage' && (
        <View style={styles.metricsGrid}>
          <MetricCard 
            title="Daily Active" 
            value={usageMetrics.dailyActiveUsers.toLocaleString()} 
            change="+5.2%" 
            trend="up" 
            icon="calendar" 
            color="#007bff" 
          />
          <MetricCard 
            title="Session Time" 
            value={`${usageMetrics.averageSessionTime}m`} 
            change="+1.2m" 
            trend="up" 
            icon="time" 
            color="#28a745" 
          />
          <MetricCard 
            title="Page Views" 
            value={usageMetrics.pageViews.toLocaleString()} 
            change="+12.3%" 
            trend="up" 
            icon="eye" 
            color="#ffc107" 
          />
          <MetricCard 
            title="Feature Usage" 
            value={`${usageMetrics.featureUsage}%`} 
            change="+3.1%" 
            trend="up" 
            icon="analytics" 
            color="#28a745" 
          />
        </View>
      )}

      {selectedMetric === 'revenue' && (
        <View style={styles.metricsGrid}>
          <MetricCard 
            title="Total Revenue" 
            value={`${revenueMetrics.totalRevenue.toLocaleString()} SAR`} 
            change="+15.3%" 
            trend="up" 
            icon="cash" 
            color="#28a745" 
          />
          <MetricCard 
            title="MRR" 
            value={`${revenueMetrics.monthlyRecurring.toLocaleString()} SAR`} 
            change="+8.7%" 
            trend="up" 
            icon="trending-up" 
            color="#007bff" 
          />
          <MetricCard 
            title="Avg Transaction" 
            value={`${revenueMetrics.averageTransaction} SAR`} 
            change="+3.2%" 
            trend="up" 
            icon="swap-horizontal" 
            color="#ffc107" 
          />
          <MetricCard 
            title="Profit Margin" 
            value={`${revenueMetrics.profitMargin}%`} 
            change="+1.8%" 
            trend="up" 
            icon="pie-chart" 
            color="#28a745" 
          />
        </View>
      )}

      <View style={styles.chartCard}>
        <GrowthChart />
      </View>

      <View style={styles.featuresCard}>
        <Text style={styles.cardTitle}>Top Features by Usage</Text>
        {topFeatures.map((feature, index) => (
          <FeatureUsageItem key={index} feature={feature} />
        ))}
      </View>

      <View style={styles.insightsCard}>
        <Text style={styles.cardTitle}>Key Insights</Text>
        <View style={styles.insight}>
          <Ionicons name="trending-up" size={20} color="#28a745" />
          <Text style={styles.insightText}>
            User growth increased by 12.5% this month, driven by new features
          </Text>
        </View>
        <View style={styles.insight}>
          <Ionicons name="speedometer" size={20} color="#007bff" />
          <Text style={styles.insightText}>
            System performance improved with 99.8% uptime and faster response times
          </Text>
        </View>
        <View style={styles.insight}>
          <Ionicons name="analytics" size={20} color="#ffc107" />
          <Text style={styles.insightText}>
            Analytics feature usage increased 12% after recent improvements
          </Text>
        </View>
      </View>

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download" size={24} color="#007bff" />
            <Text style={styles.actionText}>Export Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="refresh" size={24} color="#28a745" />
            <Text style={styles.actionText}>Refresh Data</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Settings</Text>
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
          Admin analytics provide comprehensive insights into platform growth, 
          performance, and user behavior. Use this data to make informed decisions and optimize operations.
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
  periodSelector: {
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
    backgroundColor: '#007bff',
  },
  periodButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  periodButtonTextSelected: {
    color: '#ffffff',
  },
  metricSelector: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  metricButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricButtonSelected: {
    backgroundColor: '#28a745',
  },
  metricButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  metricButtonTextSelected: {
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
  metricChange: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  chartCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  chartContainer: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
    textAlign: 'center',
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  chartBar: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  barFill: {
    width: '100%',
    backgroundColor: '#007bff',
    borderRadius: 2,
    marginBottom: 5,
  },
  barLabel: {
    fontSize: 10,
    color: '#cccccc',
    marginBottom: 2,
  },
  barValue: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  featuresCard: {
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
  featureItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  featureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  featureUsage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007bff',
  },
  featureBar: {
    height: 4,
    backgroundColor: '#555555',
    borderRadius: 2,
    marginBottom: 5,
  },
  featureBarFill: {
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: 2,
  },
  featureTrend: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  insightsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  insight: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  insightText: {
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
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

export default AdminAnalyticsScreen;

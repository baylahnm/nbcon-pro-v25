import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AdminDashboardScreen: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [selectedView, setSelectedView] = useState('overview');

  const periods = [
    { label: '24 Hours', value: '24hours' },
    { label: '7 Days', value: '7days' },
    { label: '30 Days', value: '30days' },
    { label: '90 Days', value: '90days' },
  ];

  const views = [
    { label: 'Overview', value: 'overview' },
    { label: 'Users', value: 'users' },
    { label: 'Transactions', value: 'transactions' },
    { label: 'System', value: 'system' },
  ];

  const systemHealth = {
    uptime: 99.8,
    responseTime: 245,
    errorRate: 0.2,
    activeUsers: 1247,
    totalUsers: 8934,
    newUsers: 156,
    activeJobs: 89,
    completedJobs: 234,
    revenue: 2450000,
    disputes: 12,
    supportTickets: 23,
  };

  const userMetrics = [
    {
      category: 'Engineers',
      total: 4567,
      active: 1234,
      verified: 89,
      pending: 23,
      icon: 'construct',
    },
    {
      category: 'Clients',
      total: 3456,
      active: 987,
      verified: 94,
      pending: 12,
      icon: 'business',
    },
    {
      category: 'Enterprises',
      total: 89,
      active: 67,
      verified: 100,
      pending: 0,
      icon: 'briefcase',
    },
  ];

  const transactionMetrics = [
    {
      type: 'Total Revenue',
      amount: 2450000,
      change: '+12.5%',
      trend: 'up',
      icon: 'cash',
    },
    {
      type: 'Transaction Volume',
      amount: 3456,
      change: '+8.3%',
      trend: 'up',
      icon: 'swap-horizontal',
    },
    {
      type: 'Average Transaction',
      amount: 708,
      change: '+3.2%',
      trend: 'up',
      icon: 'trending-up',
    },
    {
      type: 'Dispute Rate',
      amount: 0.8,
      change: '-0.3%',
      trend: 'down',
      icon: 'warning',
    },
  ];

  const systemAlerts = [
    {
      id: '1',
      type: 'warning',
      title: 'High Server Load',
      description: 'Server CPU usage at 85%',
      time: '2 minutes ago',
      icon: 'warning',
    },
    {
      id: '2',
      type: 'info',
      title: 'Scheduled Maintenance',
      description: 'Database backup completed',
      time: '15 minutes ago',
      icon: 'checkmark-circle',
    },
    {
      id: '3',
      type: 'error',
      title: 'Payment Gateway Issue',
      description: 'STC Pay integration experiencing delays',
      time: '1 hour ago',
      icon: 'alert-circle',
    },
  ];

  const recentActivities = [
    {
      user: 'Ahmed Al-Rashid',
      action: 'Completed project verification',
      time: '5 minutes ago',
      type: 'verification',
    },
    {
      user: 'Sarah Al-Mansouri',
      action: 'Reported inappropriate content',
      time: '12 minutes ago',
      type: 'moderation',
    },
    {
      user: 'Mohammed Al-Zahrani',
      action: 'Submitted payment dispute',
      time: '25 minutes ago',
      type: 'dispute',
    },
    {
      user: 'Fatima Al-Shehri',
      action: 'Updated profile information',
      time: '1 hour ago',
      type: 'profile',
    },
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

  const ViewButton = ({ view }: { view: any }) => (
    <TouchableOpacity
      style={[
        styles.viewButton,
        selectedView === view.value && styles.viewButtonSelected
      ]}
      onPress={() => setSelectedView(view.value)}
    >
      <Text style={[
        styles.viewButtonText,
        selectedView === view.value && styles.viewButtonTextSelected
      ]}>
        {view.label}
      </Text>
    </TouchableOpacity>
  );

  const MetricCard = ({ title, value, change, trend, icon, color }: { title: string; value: string | number; change: string; trend: string; icon: string; color: string }) => (
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

  const UserMetricCard = ({ metric }: { metric: any }) => (
    <View style={styles.userMetricCard}>
      <View style={styles.userMetricHeader}>
        <Ionicons name={metric.icon as any} size={24} color="#007bff" />
        <Text style={styles.userMetricTitle}>{metric.category}</Text>
      </View>
      <View style={styles.userMetricStats}>
        <View style={styles.userStat}>
          <Text style={styles.userStatValue}>{metric.total.toLocaleString()}</Text>
          <Text style={styles.userStatLabel}>Total</Text>
        </View>
        <View style={styles.userStat}>
          <Text style={styles.userStatValue}>{metric.active.toLocaleString()}</Text>
          <Text style={styles.userStatLabel}>Active</Text>
        </View>
        <View style={styles.userStat}>
          <Text style={styles.userStatValue}>{metric.verified}%</Text>
          <Text style={styles.userStatLabel}>Verified</Text>
        </View>
        <View style={styles.userStat}>
          <Text style={styles.userStatValue}>{metric.pending}</Text>
          <Text style={styles.userStatLabel}>Pending</Text>
        </View>
      </View>
    </View>
  );

  const AlertItem = ({ alert }: { alert: any }) => (
    <View style={styles.alertItem}>
      <View style={styles.alertHeader}>
        <Ionicons 
          name={alert.icon as any} 
          size={20} 
          color={alert.type === 'error' ? '#dc3545' : alert.type === 'warning' ? '#ffc107' : '#28a745'} 
        />
        <Text style={styles.alertTitle}>{alert.title}</Text>
        <Text style={styles.alertTime}>{alert.time}</Text>
      </View>
      <Text style={styles.alertDescription}>{alert.description}</Text>
    </View>
  );

  const ActivityItem = ({ activity }: { activity: any }) => (
    <View style={styles.activityItem}>
      <View style={styles.activityHeader}>
        <Text style={styles.activityUser}>{activity.user}</Text>
        <Text style={styles.activityTime}>{activity.time}</Text>
      </View>
      <Text style={styles.activityAction}>{activity.action}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Text style={styles.subtitle}>
        Overview of system health, active users, and transactions
      </Text>

      <View style={styles.periodSelector}>
        <Text style={styles.selectorTitle}>Time Period</Text>
        <View style={styles.periodButtons}>
          {periods.map((period) => (
            <PeriodButton key={period.value} period={period} />
          ))}
        </View>
      </View>

      <View style={styles.viewSelector}>
        <Text style={styles.selectorTitle}>Dashboard View</Text>
        <View style={styles.viewButtons}>
          {views.map((view) => (
            <ViewButton key={view.value} view={view} />
          ))}
        </View>
      </View>

      <View style={styles.overviewGrid}>
        <MetricCard 
          title="System Uptime" 
          value={`${systemHealth.uptime}%`} 
          change="+0.2%" 
          trend="up" 
          icon="server" 
          color="#28a745" 
        />
        <MetricCard 
          title="Response Time" 
          value={`${systemHealth.responseTime}ms`} 
          change="-15ms" 
          trend="down" 
          icon="speedometer" 
          color="#007bff" 
        />
        <MetricCard 
          title="Error Rate" 
          value={`${systemHealth.errorRate}%`} 
          change="-0.1%" 
          trend="down" 
          icon="warning" 
          color="#dc3545" 
        />
        <MetricCard 
          title="Active Users" 
          value={systemHealth.activeUsers.toLocaleString()} 
          change="+5.2%" 
          trend="up" 
          icon="people" 
          color="#ffc107" 
        />
      </View>

      {selectedView === 'overview' && (
        <View style={styles.overviewCard}>
          <Text style={styles.cardTitle}>System Overview</Text>
          <View style={styles.overviewMetrics}>
            <View style={styles.overviewMetric}>
              <Text style={styles.overviewValue}>{systemHealth.totalUsers.toLocaleString()}</Text>
              <Text style={styles.overviewLabel}>Total Users</Text>
            </View>
            <View style={styles.overviewMetric}>
              <Text style={styles.overviewValue}>{systemHealth.activeJobs}</Text>
              <Text style={styles.overviewLabel}>Active Jobs</Text>
            </View>
            <View style={styles.overviewMetric}>
              <Text style={styles.overviewValue}>{systemHealth.completedJobs}</Text>
              <Text style={styles.overviewLabel}>Completed Jobs</Text>
            </View>
            <View style={styles.overviewMetric}>
              <Text style={styles.overviewValue}>{systemHealth.revenue.toLocaleString()}</Text>
              <Text style={styles.overviewLabel}>Revenue (SAR)</Text>
            </View>
          </View>
        </View>
      )}

      {selectedView === 'users' && (
        <View style={styles.usersCard}>
          <Text style={styles.cardTitle}>User Management</Text>
          {userMetrics.map((metric, index) => (
            <UserMetricCard key={index} metric={metric} />
          ))}
        </View>
      )}

      {selectedView === 'transactions' && (
        <View style={styles.transactionsCard}>
          <Text style={styles.cardTitle}>Transaction Metrics</Text>
          <View style={styles.transactionGrid}>
            {transactionMetrics.map((metric, index) => (
              <MetricCard 
                key={index}
                title={metric.type} 
                value={typeof metric.amount === 'number' ? metric.amount.toLocaleString() : metric.amount} 
                change={metric.change} 
                trend={metric.trend} 
                icon={metric.icon} 
                color="#007bff" 
              />
            ))}
          </View>
        </View>
      )}

      {selectedView === 'system' && (
        <View style={styles.systemCard}>
          <Text style={styles.cardTitle}>System Health</Text>
          <View style={styles.systemMetrics}>
            <View style={styles.systemMetric}>
              <Text style={styles.systemValue}>{systemHealth.uptime}%</Text>
              <Text style={styles.systemLabel}>Uptime</Text>
            </View>
            <View style={styles.systemMetric}>
              <Text style={styles.systemValue}>{systemHealth.responseTime}ms</Text>
              <Text style={styles.systemLabel}>Response Time</Text>
            </View>
            <View style={styles.systemMetric}>
              <Text style={styles.systemValue}>{systemHealth.errorRate}%</Text>
              <Text style={styles.systemLabel}>Error Rate</Text>
            </View>
          </View>
        </View>
      )}

      <View style={styles.alertsCard}>
        <Text style={styles.cardTitle}>System Alerts</Text>
        {systemAlerts.map((alert) => (
          <AlertItem key={alert.id} alert={alert} />
        ))}
      </View>

      <View style={styles.activitiesCard}>
        <Text style={styles.cardTitle}>Recent Activities</Text>
        {recentActivities.map((activity, index) => (
          <ActivityItem key={index} activity={activity} />
        ))}
      </View>

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="people" size={24} color="#007bff" />
            <Text style={styles.actionText}>Manage Users</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings" size={24} color="#28a745" />
            <Text style={styles.actionText}>System Config</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="shield-checkmark" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Security</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="analytics" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Analytics</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          Admin dashboard provides real-time monitoring of system health, user activity, 
          and platform performance. Use this data to make informed decisions and maintain optimal operations.
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
  viewSelector: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  viewButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  viewButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    width: '48%',
    alignItems: 'center',
  },
  viewButtonSelected: {
    backgroundColor: '#28a745',
  },
  viewButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  viewButtonTextSelected: {
    color: '#ffffff',
  },
  overviewGrid: {
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
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  overviewMetric: {
    width: '48%',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  overviewValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  overviewLabel: {
    fontSize: 12,
    color: '#cccccc',
    textAlign: 'center',
  },
  usersCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  userMetricCard: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  userMetricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  userMetricTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 10,
  },
  userMetricStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userStat: {
    alignItems: 'center',
  },
  userStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  userStatLabel: {
    fontSize: 10,
    color: '#cccccc',
  },
  transactionsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  transactionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  systemCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  systemMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  systemMetric: {
    alignItems: 'center',
    flex: 1,
  },
  systemValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  systemLabel: {
    fontSize: 12,
    color: '#cccccc',
    textAlign: 'center',
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
    alignItems: 'center',
    marginBottom: 8,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 10,
    flex: 1,
  },
  alertTime: {
    fontSize: 12,
    color: '#cccccc',
  },
  alertDescription: {
    fontSize: 12,
    color: '#cccccc',
    lineHeight: 16,
  },
  activitiesCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  activityItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  activityUser: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  activityTime: {
    fontSize: 12,
    color: '#cccccc',
  },
  activityAction: {
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

export default AdminDashboardScreen;

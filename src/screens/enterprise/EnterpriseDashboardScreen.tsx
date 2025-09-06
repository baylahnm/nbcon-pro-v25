import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EnterpriseDashboardScreen: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const financialOverview = {
    totalRevenue: 2500000,
    totalExpenses: 1800000,
    netProfit: 700000,
    profitMargin: 28,
    activeProjects: 45,
    completedProjects: 12,
  };

  const departmentStats = [
    { name: 'Civil Engineering', projects: 15, revenue: 800000, status: 'Active' },
    { name: 'MEP Systems', projects: 12, revenue: 600000, status: 'Active' },
    { name: 'Surveying', projects: 8, revenue: 400000, status: 'Active' },
    { name: 'BIM Services', projects: 10, revenue: 700000, status: 'Active' },
  ];

  const recentProjects = [
    { name: 'NEOM Smart City Phase 1', status: 'In Progress', progress: 75, budget: 500000 },
    { name: 'Red Sea Resort Infrastructure', status: 'Planning', progress: 25, budget: 300000 },
    { name: 'Qiddiya Entertainment Complex', status: 'In Progress', progress: 60, budget: 400000 },
    { name: 'Riyadh Metro Extension', status: 'Completed', progress: 100, budget: 800000 },
  ];

  const alerts = [
    { type: 'warning', message: 'Budget overrun on NEOM Smart City Phase 1', time: '2 hours ago' },
    { type: 'info', message: 'New RFP received from Saudi Aramco', time: '4 hours ago' },
    { type: 'success', message: 'Riyadh Metro Extension completed successfully', time: '1 day ago' },
  ];

  const PeriodButton = ({ period, label }: { period: string; label: string }) => (
    <TouchableOpacity
      style={[
        styles.periodButton,
        selectedPeriod === period && styles.periodButtonActive
      ]}
      onPress={() => setSelectedPeriod(period)}
    >
      <Text style={[
        styles.periodButtonText,
        selectedPeriod === period && styles.periodButtonTextActive
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return '#28a745';
      case 'In Progress': return '#007bff';
      case 'Planning': return '#ffc107';
      case 'Completed': return '#6c757d';
      default: return '#6c757d';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return 'warning';
      case 'info': return 'information-circle';
      case 'success': return 'checkmark-circle';
      default: return 'information-circle';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return '#ffc107';
      case 'info': return '#007bff';
      case 'success': return '#28a745';
      default: return '#007bff';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Enterprise Dashboard</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings" size={24} color="#007bff" />
        </TouchableOpacity>
      </View>

      <View style={styles.periodSelector}>
        <PeriodButton period="weekly" label="Weekly" />
        <PeriodButton period="monthly" label="Monthly" />
        <PeriodButton period="quarterly" label="Quarterly" />
        <PeriodButton period="yearly" label="Yearly" />
      </View>

      <View style={styles.financialOverviewCard}>
        <Text style={styles.cardTitle}>Financial Overview</Text>
        <View style={styles.financialStats}>
          <View style={styles.financialStat}>
            <Text style={styles.statLabel}>Total Revenue</Text>
            <Text style={styles.statValue}>
              {financialOverview.totalRevenue.toLocaleString()} SAR
            </Text>
          </View>
          <View style={styles.financialStat}>
            <Text style={styles.statLabel}>Total Expenses</Text>
            <Text style={styles.statValue}>
              {financialOverview.totalExpenses.toLocaleString()} SAR
            </Text>
          </View>
          <View style={styles.financialStat}>
            <Text style={styles.statLabel}>Net Profit</Text>
            <Text style={[styles.statValue, { color: '#28a745' }]}>
              {financialOverview.netProfit.toLocaleString()} SAR
            </Text>
          </View>
          <View style={styles.financialStat}>
            <Text style={styles.statLabel}>Profit Margin</Text>
            <Text style={[styles.statValue, { color: '#28a745' }]}>
              {financialOverview.profitMargin}%
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.projectsOverviewCard}>
        <Text style={styles.cardTitle}>Projects Overview</Text>
        <View style={styles.projectsStats}>
          <View style={styles.projectStat}>
            <Text style={styles.projectStatValue}>{financialOverview.activeProjects}</Text>
            <Text style={styles.projectStatLabel}>Active Projects</Text>
          </View>
          <View style={styles.projectStat}>
            <Text style={styles.projectStatValue}>{financialOverview.completedProjects}</Text>
            <Text style={styles.projectStatLabel}>Completed</Text>
          </View>
          <View style={styles.projectStat}>
            <Text style={styles.projectStatValue}>
              {Math.round((financialOverview.completedProjects / (financialOverview.activeProjects + financialOverview.completedProjects)) * 100)}%
            </Text>
            <Text style={styles.projectStatLabel}>Success Rate</Text>
          </View>
        </View>
      </View>

      <View style={styles.departmentsCard}>
        <Text style={styles.cardTitle}>Department Performance</Text>
        {departmentStats.map((dept, index) => (
          <View key={index} style={styles.departmentItem}>
            <View style={styles.departmentInfo}>
              <Text style={styles.departmentName}>{dept.name}</Text>
              <Text style={styles.departmentProjects}>{dept.projects} projects</Text>
            </View>
            <View style={styles.departmentStats}>
              <Text style={styles.departmentRevenue}>
                {dept.revenue.toLocaleString()} SAR
              </Text>
              <View style={[styles.departmentStatus, { backgroundColor: getStatusColor(dept.status) }]}>
                <Text style={styles.departmentStatusText}>{dept.status}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.recentProjectsCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Recent Projects</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        {recentProjects.map((project, index) => (
          <View key={index} style={styles.projectItem}>
            <View style={styles.projectInfo}>
              <Text style={styles.projectName}>{project.name}</Text>
              <Text style={styles.projectBudget}>{project.budget.toLocaleString()} SAR</Text>
            </View>
            <View style={styles.projectStatus}>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(project.status) }]}>
                <Text style={styles.statusText}>{project.status}</Text>
              </View>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${project.progress}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>{project.progress}%</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.alertsCard}>
        <Text style={styles.cardTitle}>Recent Alerts</Text>
        {alerts.map((alert, index) => (
          <View key={index} style={styles.alertItem}>
            <Ionicons 
              name={getAlertIcon(alert.type) as any} 
              size={20} 
              color={getAlertColor(alert.type)} 
            />
            <View style={styles.alertContent}>
              <Text style={styles.alertMessage}>{alert.message}</Text>
              <Text style={styles.alertTime}>{alert.time}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add-circle" size={24} color="#007bff" />
            <Text style={styles.actionText}>New Project</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="people" size={24} color="#28a745" />
            <Text style={styles.actionText}>Team Management</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="analytics" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Reports</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
        </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  settingsButton: {
    padding: 8,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  periodButtonActive: {
    backgroundColor: '#007bff',
  },
  periodButtonText: {
    color: '#cccccc',
    fontSize: 14,
    fontWeight: '500',
  },
  periodButtonTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  financialOverviewCard: {
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
  financialStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  financialStat: {
    width: '48%',
    marginBottom: 15,
  },
  statLabel: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  projectsOverviewCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  projectsStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  projectStat: {
    alignItems: 'center',
    flex: 1,
  },
  projectStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  projectStatLabel: {
    fontSize: 12,
    color: '#cccccc',
    textAlign: 'center',
  },
  departmentsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  departmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  departmentInfo: {
    flex: 1,
  },
  departmentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  departmentProjects: {
    fontSize: 14,
    color: '#cccccc',
  },
  departmentStats: {
    alignItems: 'flex-end',
  },
  departmentRevenue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  departmentStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  departmentStatusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  recentProjectsCard: {
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
  viewAllButton: {
    paddingHorizontal: 10,
  },
  viewAllText: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  projectItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  projectBudget: {
    fontSize: 14,
    color: '#cccccc',
  },
  projectStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressBar: {
    width: 80,
    height: 6,
    backgroundColor: '#3a3a3a',
    borderRadius: 3,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#cccccc',
  },
  alertsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  alertContent: {
    flex: 1,
    marginLeft: 10,
  },
  alertMessage: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 5,
  },
  alertTime: {
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
});

export default EnterpriseDashboardScreen;

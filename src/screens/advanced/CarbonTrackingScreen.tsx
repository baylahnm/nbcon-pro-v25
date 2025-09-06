import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CarbonTrackingScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'analytics' },
    { id: 'projects', name: 'Projects', icon: 'folder' },
    { id: 'sources', name: 'Sources', icon: 'flame' },
    { id: 'reports', name: 'Reports', icon: 'document-text' },
  ];

  const periods = [
    { id: 'daily', name: 'Daily' },
    { id: 'weekly', name: 'Weekly' },
    { id: 'monthly', name: 'Monthly' },
    { id: 'yearly', name: 'Yearly' },
  ];

  const overviewData = {
    totalEmissions: 1247.5,
    targetEmissions: 1000.0,
    reduction: 15.2,
    projects: 12,
    activeProjects: 8,
    completedProjects: 4,
    carbonCredits: 156.8,
    savings: 23450.0,
  };

  const projects = [
    {
      id: '1',
      name: 'Riyadh Metro Station - Phase 1',
      type: 'Transportation',
      status: 'Active',
      emissions: 245.3,
      target: 200.0,
      reduction: 18.5,
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      progress: 65,
      carbonCredits: 45.3,
      savings: 8920.0,
    },
    {
      id: '2',
      name: 'NEOM Smart City - Green Buildings',
      type: 'Construction',
      status: 'Active',
      emissions: 189.7,
      target: 150.0,
      reduction: 20.9,
      startDate: '2024-01-15',
      endDate: '2024-12-31',
      progress: 35,
      carbonCredits: 39.7,
      savings: 6780.0,
    },
    {
      id: '3',
      name: 'Solar Farm - Renewable Energy',
      type: 'Energy',
      status: 'Completed',
      emissions: 0.0,
      target: 0.0,
      reduction: 100.0,
      startDate: '2023-10-01',
      endDate: '2024-01-20',
      progress: 100,
      carbonCredits: 125.0,
      savings: 15600.0,
    },
    {
      id: '4',
      name: 'Jeddah Port - Efficiency Upgrade',
      type: 'Infrastructure',
      status: 'Planning',
      emissions: 0.0,
      target: 80.0,
      reduction: 0.0,
      startDate: '2024-03-01',
      endDate: '2024-08-31',
      progress: 0,
      carbonCredits: 0.0,
      savings: 0.0,
    },
  ];

  const emissionSources = [
    {
      id: '1',
      name: 'Construction Equipment',
      category: 'Direct Emissions',
      emissions: 456.2,
      percentage: 36.6,
      trend: 'down',
      change: -12.5,
      lastUpdated: '2024-01-25',
    },
    {
      id: '2',
      name: 'Transportation',
      category: 'Direct Emissions',
      emissions: 234.8,
      percentage: 18.8,
      trend: 'down',
      change: -8.2,
      lastUpdated: '2024-01-25',
    },
    {
      id: '3',
      name: 'Energy Consumption',
      category: 'Indirect Emissions',
      emissions: 345.6,
      percentage: 27.7,
      trend: 'up',
      change: +5.3,
      lastUpdated: '2024-01-25',
    },
    {
      id: '4',
      name: 'Material Production',
      category: 'Scope 3',
      emissions: 210.9,
      percentage: 16.9,
      trend: 'down',
      change: -15.7,
      lastUpdated: '2024-01-25',
    },
  ];

  const reports = [
    {
      id: '1',
      name: 'Monthly Carbon Footprint Report',
      period: 'January 2024',
      generatedAt: '2024-01-25 16:30:00',
      totalEmissions: 1247.5,
      reduction: 15.2,
      projects: 12,
      status: 'Completed',
      pages: 28,
    },
    {
      id: '2',
      name: 'Project Sustainability Assessment',
      period: 'Q4 2023',
      generatedAt: '2024-01-20 14:15:00',
      totalEmissions: 3890.2,
      reduction: 22.8,
      projects: 8,
      status: 'Completed',
      pages: 45,
    },
    {
      id: '3',
      name: 'Carbon Credit Analysis',
      period: '2023 Annual',
      generatedAt: '2024-01-15 10:45:00',
      totalEmissions: 15600.0,
      reduction: 18.5,
      projects: 15,
      status: 'Completed',
      pages: 32,
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

  const PeriodButton = ({ period }: { period: any }) => (
    <TouchableOpacity
      style={[
        styles.periodButton,
        selectedPeriod === period.id && styles.periodButtonSelected
      ]}
      onPress={() => setSelectedPeriod(period.id)}
    >
      <Text style={[
        styles.periodButtonText,
        selectedPeriod === period.id && styles.periodButtonTextSelected
      ]}>
        {period.name}
      </Text>
    </TouchableOpacity>
  );

  const ProjectItem = ({ project }: { project: any }) => (
    <View style={styles.projectItem}>
      <View style={styles.projectHeader}>
        <View style={styles.projectInfo}>
          <Text style={styles.projectName}>{project.name}</Text>
          <Text style={styles.projectType}>{project.type}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: project.status === 'Completed' ? '#28a745' : 
                           project.status === 'Active' ? '#007bff' : '#ffc107'
          }
        ]}>
          <Text style={styles.statusText}>{project.status}</Text>
        </View>
      </View>
      
      <View style={styles.projectStats}>
        <View style={styles.projectStat}>
          <Text style={styles.projectStatValue}>{project.emissions.toFixed(1)}</Text>
          <Text style={styles.projectStatLabel}>CO₂ (tons)</Text>
        </View>
        <View style={styles.projectStat}>
          <Text style={styles.projectStatValue}>{project.reduction.toFixed(1)}%</Text>
          <Text style={styles.projectStatLabel}>Reduction</Text>
        </View>
        <View style={styles.projectStat}>
          <Text style={styles.projectStatValue}>{project.progress}%</Text>
          <Text style={styles.projectStatLabel}>Progress</Text>
        </View>
        <View style={styles.projectStat}>
          <Text style={styles.projectStatValue}>{project.carbonCredits.toFixed(1)}</Text>
          <Text style={styles.projectStatLabel}>Credits</Text>
        </View>
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
        <Text style={styles.progressText}>{project.progress}% Complete</Text>
      </View>

      <View style={styles.projectMeta}>
        <Text style={styles.projectMetaText}>
          Period: {project.startDate} - {project.endDate}
        </Text>
        <Text style={styles.projectMetaText}>
          Savings: SAR {project.savings.toLocaleString()}
        </Text>
      </View>
    </View>
  );

  const SourceItem = ({ source }: { source: any }) => (
    <View style={styles.sourceItem}>
      <View style={styles.sourceHeader}>
        <Text style={styles.sourceName}>{source.name}</Text>
        <Text style={styles.sourceCategory}>{source.category}</Text>
      </View>
      
      <View style={styles.sourceStats}>
        <View style={styles.sourceStat}>
          <Text style={styles.sourceStatValue}>{source.emissions.toFixed(1)}</Text>
          <Text style={styles.sourceStatLabel}>CO₂ (tons)</Text>
        </View>
        <View style={styles.sourceStat}>
          <Text style={styles.sourceStatValue}>{source.percentage.toFixed(1)}%</Text>
          <Text style={styles.sourceStatLabel}>of Total</Text>
        </View>
        <View style={styles.sourceStat}>
          <Text style={[
            styles.sourceChangeText,
            { color: source.trend === 'down' ? '#28a745' : '#dc3545' }
          ]}>
            {source.change > 0 ? '+' : ''}{source.change.toFixed(1)}%
          </Text>
          <Text style={styles.sourceStatLabel}>Change</Text>
        </View>
      </View>

      <View style={styles.sourceMeta}>
        <Text style={styles.sourceMetaText}>
          Last Updated: {source.lastUpdated}
        </Text>
        <View style={styles.trendIndicator}>
          <Ionicons 
            name={source.trend === 'down' ? 'trending-down' : 'trending-up'} 
            size={16} 
            color={source.trend === 'down' ? '#28a745' : '#dc3545'} 
          />
          <Text style={[
            styles.trendText,
            { color: source.trend === 'down' ? '#28a745' : '#dc3545' }
          ]}>
            {source.trend === 'down' ? 'Decreasing' : 'Increasing'}
          </Text>
        </View>
      </View>
    </View>
  );

  const ReportItem = ({ report }: { report: any }) => (
    <View style={styles.reportItem}>
      <View style={styles.reportHeader}>
        <Text style={styles.reportName}>{report.name}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: report.status === 'Completed' ? '#28a745' : '#ffc107' }
        ]}>
          <Text style={styles.statusText}>{report.status}</Text>
        </View>
      </View>
      
      <Text style={styles.reportPeriod}>{report.period}</Text>
      
      <View style={styles.reportStats}>
        <View style={styles.reportStat}>
          <Text style={styles.reportStatValue}>{report.totalEmissions.toFixed(1)}</Text>
          <Text style={styles.reportStatLabel}>CO₂ (tons)</Text>
        </View>
        <View style={styles.reportStat}>
          <Text style={styles.reportStatValue}>{report.reduction.toFixed(1)}%</Text>
          <Text style={styles.reportStatLabel}>Reduction</Text>
        </View>
        <View style={styles.reportStat}>
          <Text style={styles.reportStatValue}>{report.projects}</Text>
          <Text style={styles.reportStatLabel}>Projects</Text>
        </View>
        <View style={styles.reportStat}>
          <Text style={styles.reportStatValue}>{report.pages}</Text>
          <Text style={styles.reportStatLabel}>Pages</Text>
        </View>
      </View>

      <Text style={styles.reportGenerated}>
        Generated: {report.generatedAt}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Carbon Tracking</Text>
      <Text style={styles.subtitle}>
        Track sustainability metrics and CO₂ impact
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

      {selectedTab === 'overview' && (
        <View style={styles.overviewCard}>
          <View style={styles.overviewHeader}>
            <Text style={styles.cardTitle}>Carbon Footprint Overview</Text>
            <View style={styles.periodFilter}>
              {periods.map((period) => (
                <PeriodButton key={period.id} period={period} />
              ))}
            </View>
          </View>
          
          <View style={styles.overviewStats}>
            <View style={styles.overviewStat}>
              <Text style={styles.overviewStatValue}>{overviewData.totalEmissions.toFixed(1)}</Text>
              <Text style={styles.overviewStatLabel}>Total CO₂ (tons)</Text>
            </View>
            <View style={styles.overviewStat}>
              <Text style={styles.overviewStatValue}>{overviewData.targetEmissions.toFixed(1)}</Text>
              <Text style={styles.overviewStatLabel}>Target (tons)</Text>
            </View>
            <View style={styles.overviewStat}>
              <Text style={styles.overviewStatValue}>{overviewData.reduction.toFixed(1)}%</Text>
              <Text style={styles.overviewStatLabel}>Reduction</Text>
            </View>
          </View>

          <View style={styles.overviewProgress}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${(overviewData.targetEmissions / overviewData.totalEmissions) * 100}%`,
                    backgroundColor: '#28a745'
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {((overviewData.targetEmissions / overviewData.totalEmissions) * 100).toFixed(1)}% of target achieved
            </Text>
          </View>

          <View style={styles.overviewDetails}>
            <View style={styles.overviewDetail}>
              <Text style={styles.overviewDetailLabel}>Active Projects:</Text>
              <Text style={styles.overviewDetailValue}>{overviewData.activeProjects}</Text>
            </View>
            <View style={styles.overviewDetail}>
              <Text style={styles.overviewDetailLabel}>Completed Projects:</Text>
              <Text style={styles.overviewDetailValue}>{overviewData.completedProjects}</Text>
            </View>
            <View style={styles.overviewDetail}>
              <Text style={styles.overviewDetailLabel}>Carbon Credits:</Text>
              <Text style={styles.overviewDetailValue}>{overviewData.carbonCredits.toFixed(1)}</Text>
            </View>
            <View style={styles.overviewDetail}>
              <Text style={styles.overviewDetailLabel}>Total Savings:</Text>
              <Text style={styles.overviewDetailValue}>SAR {overviewData.savings.toLocaleString()}</Text>
            </View>
          </View>
        </View>
      )}

      {selectedTab === 'projects' && (
        <View style={styles.projectsCard}>
          <Text style={styles.cardTitle}>Carbon Reduction Projects</Text>
          {projects.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </View>
      )}

      {selectedTab === 'sources' && (
        <View style={styles.sourcesCard}>
          <Text style={styles.cardTitle}>Emission Sources</Text>
          {emissionSources.map((source) => (
            <SourceItem key={source.id} source={source} />
          ))}
        </View>
      )}

      {selectedTab === 'reports' && (
        <View style={styles.reportsCard}>
          <Text style={styles.cardTitle}>Sustainability Reports</Text>
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
            <Text style={styles.actionText}>New Project</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="analytics" size={24} color="#28a745" />
            <Text style={styles.actionText}>Calculate CO₂</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="document-text" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Generate Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="leaf" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Carbon Credits</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          Carbon tracking helps monitor and reduce environmental impact through 
          comprehensive CO₂ emission monitoring, reduction strategies, and sustainability reporting.
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
  overviewCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  periodFilter: {
    flexDirection: 'row',
  },
  periodButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 6,
    padding: 6,
    marginLeft: 5,
  },
  periodButtonSelected: {
    backgroundColor: '#007bff',
  },
  periodButtonText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  periodButtonTextSelected: {
    color: '#ffffff',
  },
  overviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  overviewStat: {
    alignItems: 'center',
  },
  overviewStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  overviewStatLabel: {
    fontSize: 12,
    color: '#cccccc',
    textAlign: 'center',
  },
  overviewProgress: {
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#555555',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: 4,
  },
  progressText: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
  },
  overviewDetails: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
  },
  overviewDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  overviewDetailLabel: {
    fontSize: 14,
    color: '#cccccc',
  },
  overviewDetailValue: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  projectsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  projectItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  projectType: {
    fontSize: 14,
    color: '#cccccc',
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
  projectStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  projectStat: {
    alignItems: 'center',
  },
  projectStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 2,
  },
  projectStatLabel: {
    fontSize: 10,
    color: '#cccccc',
  },
  progressContainer: {
    marginBottom: 10,
  },
  projectMeta: {
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  projectMetaText: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 2,
  },
  sourcesCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  sourceItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  sourceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sourceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  sourceCategory: {
    fontSize: 14,
    color: '#007bff',
  },
  sourceStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  sourceStat: {
    alignItems: 'center',
  },
  sourceStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 2,
  },
  sourceStatLabel: {
    fontSize: 10,
    color: '#cccccc',
  },
  sourceChangeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sourceMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  sourceMetaText: {
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
  reportPeriod: {
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

export default CarbonTrackingScreen;

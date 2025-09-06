import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ResourceUtilizationScreen: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [selectedView, setSelectedView] = useState('overview');

  const periods = [
    { label: '7 Days', value: '7days' },
    { label: '30 Days', value: '30days' },
    { label: '90 Days', value: '90days' },
    { label: '1 Year', value: '1year' },
  ];

  const views = [
    { label: 'Overview', value: 'overview' },
    { label: 'By Engineer', value: 'engineer' },
    { label: 'By Project', value: 'project' },
    { label: 'By Category', value: 'category' },
  ];

  const utilizationData = {
    overall: 78,
    available: 22,
    capacity: 100,
    utilization: [
      { engineer: 'Ahmed Al-Rashid', utilization: 85, projects: 3, hours: 34 },
      { engineer: 'Sarah Al-Mansouri', utilization: 92, projects: 2, hours: 37 },
      { engineer: 'Mohammed Al-Zahrani', utilization: 76, projects: 4, hours: 30 },
      { engineer: 'Fatima Al-Shehri', utilization: 68, projects: 2, hours: 27 },
      { engineer: 'Khalid Al-Shehri', utilization: 88, projects: 3, hours: 35 },
    ],
  };

  const projectUtilization = [
    { project: 'Riyadh Tower', utilization: 95, engineers: 5, duration: '6 months' },
    { project: 'Jeddah Mall', utilization: 82, engineers: 3, duration: '4 months' },
    { project: 'Dammam Port', utilization: 76, engineers: 4, duration: '8 months' },
    { project: 'Mecca Hospital', utilization: 88, engineers: 6, duration: '12 months' },
  ];

  const categoryUtilization = [
    { category: 'Civil Engineering', utilization: 85, engineers: 12, demand: 'High' },
    { category: 'MEP Systems', utilization: 92, engineers: 8, demand: 'Very High' },
    { category: 'Surveying', utilization: 68, engineers: 6, demand: 'Medium' },
    { category: 'BIM Services', utilization: 78, engineers: 4, demand: 'High' },
  ];

  const capacityInsights = [
    {
      title: 'Peak Utilization',
      description: 'MEP engineers at 92% capacity - consider hiring',
      impact: 'High',
      icon: 'warning',
    },
    {
      title: 'Underutilized Resources',
      description: 'Surveying team at 68% - potential for more projects',
      impact: 'Medium',
      icon: 'trending-down',
    },
    {
      title: 'Optimal Balance',
      description: 'Civil engineering team well-balanced at 85%',
      impact: 'Low',
      icon: 'checkmark-circle',
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

  const UtilizationCard = ({ title, value, total, trend, icon }: { title: string; value: number; total: number; trend: string; icon: string }) => (
    <View style={styles.utilizationCard}>
      <View style={styles.cardHeader}>
        <Ionicons name={icon as any} size={20} color="#007bff" />
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardValue}>{value}%</Text>
        <Text style={styles.cardTotal}>of {total}% capacity</Text>
        <Text style={[
          styles.cardTrend,
          { color: trend.startsWith('+') ? '#28a745' : '#dc3545' }
        ]}>
          {trend}
        </Text>
      </View>
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${value}%` }
          ]} 
        />
      </View>
    </View>
  );

  const EngineerItem = ({ engineer }: { engineer: any }) => (
    <View style={styles.engineerItem}>
      <View style={styles.engineerHeader}>
        <Text style={styles.engineerName}>{engineer.engineer}</Text>
        <Text style={styles.utilizationValue}>{engineer.utilization}%</Text>
      </View>
      <View style={styles.engineerStats}>
        <View style={styles.stat}>
          <Ionicons name="briefcase" size={16} color="#007bff" />
          <Text style={styles.statText}>{engineer.projects} projects</Text>
        </View>
        <View style={styles.stat}>
          <Ionicons name="time" size={16} color="#28a745" />
          <Text style={styles.statText}>{engineer.hours}h/week</Text>
        </View>
      </View>
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { 
              width: `${engineer.utilization}%`,
              backgroundColor: engineer.utilization > 90 ? '#dc3545' : 
                             engineer.utilization > 75 ? '#ffc107' : '#28a745'
            }
          ]} 
        />
      </View>
    </View>
  );

  const ProjectItem = ({ project }: { project: any }) => (
    <View style={styles.projectItem}>
      <View style={styles.projectHeader}>
        <Text style={styles.projectName}>{project.project}</Text>
        <Text style={styles.utilizationValue}>{project.utilization}%</Text>
      </View>
      <View style={styles.projectStats}>
        <View style={styles.stat}>
          <Ionicons name="people" size={16} color="#007bff" />
          <Text style={styles.statText}>{project.engineers} engineers</Text>
        </View>
        <View style={styles.stat}>
          <Ionicons name="calendar" size={16} color="#28a745" />
          <Text style={styles.statText}>{project.duration}</Text>
        </View>
      </View>
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${project.utilization}%` }
          ]} 
        />
      </View>
    </View>
  );

  const CategoryItem = ({ category }: { category: any }) => (
    <View style={styles.categoryItem}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryName}>{category.category}</Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.utilizationValue}>{category.utilization}%</Text>
        </View>
      </View>
      <View style={styles.categoryStats}>
        <View style={styles.stat}>
          <Ionicons name="people" size={16} color="#007bff" />
          <Text style={styles.statText}>{category.engineers} engineers</Text>
        </View>
        <View style={[
          styles.demandBadge,
          { 
            backgroundColor: category.demand === 'Very High' ? '#dc3545' :
                           category.demand === 'High' ? '#ffc107' : '#28a745'
          }
        ]}>
          <Text style={styles.demandText}>{category.demand} Demand</Text>
        </View>
      </View>
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${category.utilization}%` }
          ]} 
        />
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Resource Utilization</Text>
      <Text style={styles.subtitle}>
        Engineer utilization and capacity charts
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
        <Text style={styles.selectorTitle}>View By</Text>
        <View style={styles.viewButtons}>
          {views.map((view) => (
            <ViewButton key={view.value} view={view} />
          ))}
        </View>
      </View>

      <View style={styles.overviewGrid}>
        <UtilizationCard 
          title="Overall Utilization" 
          value={utilizationData.overall} 
          total={utilizationData.capacity} 
          trend="+5%" 
          icon="trending-up" 
        />
        <UtilizationCard 
          title="Available Capacity" 
          value={utilizationData.available} 
          total={utilizationData.capacity} 
          trend="-2%" 
          icon="time" 
        />
      </View>

      {selectedView === 'overview' && (
        <View style={styles.overviewCard}>
          <Text style={styles.cardTitle}>Resource Overview</Text>
          <View style={styles.overviewChart}>
            <View style={styles.chartContainer}>
              <View style={styles.chartBar}>
                <View 
                  style={[
                    styles.chartFill, 
                    { height: `${utilizationData.overall}%` }
                  ]} 
                />
              </View>
              <Text style={styles.chartLabel}>Utilized</Text>
            </View>
            <View style={styles.chartContainer}>
              <View style={styles.chartBar}>
                <View 
                  style={[
                    styles.chartFill, 
                    { 
                      height: `${utilizationData.available}%`,
                      backgroundColor: '#28a745'
                    }
                  ]} 
                />
              </View>
              <Text style={styles.chartLabel}>Available</Text>
            </View>
          </View>
        </View>
      )}

      {selectedView === 'engineer' && (
        <View style={styles.engineersCard}>
          <Text style={styles.cardTitle}>Engineer Utilization</Text>
          {utilizationData.utilization.map((engineer, index) => (
            <EngineerItem key={index} engineer={engineer} />
          ))}
        </View>
      )}

      {selectedView === 'project' && (
        <View style={styles.projectsCard}>
          <Text style={styles.cardTitle}>Project Utilization</Text>
          {projectUtilization.map((project, index) => (
            <ProjectItem key={index} project={project} />
          ))}
        </View>
      )}

      {selectedView === 'category' && (
        <View style={styles.categoriesCard}>
          <Text style={styles.cardTitle}>Category Utilization</Text>
          {categoryUtilization.map((category, index) => (
            <CategoryItem key={index} category={category} />
          ))}
        </View>
      )}

      <View style={styles.insightsCard}>
        <Text style={styles.cardTitle}>Capacity Insights</Text>
        {capacityInsights.map((insight, index) => (
          <View key={index} style={styles.insightItem}>
            <View style={styles.insightHeader}>
              <Ionicons name={insight.icon as any} size={20} color="#007bff" />
              <Text style={styles.insightTitle}>{insight.title}</Text>
              <View style={[
                styles.impactBadge,
                { backgroundColor: insight.impact === 'High' ? '#dc3545' : 
                                 insight.impact === 'Medium' ? '#ffc107' : '#28a745' }
              ]}>
                <Text style={styles.impactText}>{insight.impact}</Text>
              </View>
            </View>
            <Text style={styles.insightDescription}>{insight.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add-circle" size={24} color="#007bff" />
            <Text style={styles.actionText}>Add Resource</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download" size={24} color="#28a745" />
            <Text style={styles.actionText}>Export Report</Text>
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
          Resource utilization helps optimize team capacity and identify bottlenecks. 
          Aim for 75-85% utilization for optimal productivity and work-life balance.
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
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  utilizationCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 15,
    width: '48%',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 12,
    color: '#cccccc',
    marginLeft: 8,
  },
  cardContent: {
    marginBottom: 10,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  cardTotal: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 5,
  },
  cardTrend: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#3a3a3a',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: 2,
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
  overviewChart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 120,
  },
  chartContainer: {
    alignItems: 'center',
  },
  chartBar: {
    width: 40,
    height: 100,
    backgroundColor: '#3a3a3a',
    borderRadius: 4,
    justifyContent: 'flex-end',
  },
  chartFill: {
    backgroundColor: '#007bff',
    borderRadius: 4,
  },
  chartLabel: {
    fontSize: 12,
    color: '#cccccc',
    marginTop: 8,
  },
  engineersCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  engineerItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  engineerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  engineerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  utilizationValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  engineerStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    color: '#cccccc',
    fontSize: 12,
    marginLeft: 5,
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
    alignItems: 'center',
    marginBottom: 10,
  },
  projectName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  projectStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  categoriesCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  categoryItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  categoryBadge: {
    backgroundColor: '#007bff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  demandBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  demandText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  insightsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  insightItem: {
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
    lineHeight: 16,
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

export default ResourceUtilizationScreen;

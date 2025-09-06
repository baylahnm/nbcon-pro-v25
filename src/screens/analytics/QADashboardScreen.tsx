import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const QADashboardScreen: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const periods = [
    { label: '7 Days', value: '7days' },
    { label: '30 Days', value: '30days' },
    { label: '90 Days', value: '90days' },
    { label: '1 Year', value: '1year' },
  ];

  const categories = [
    { label: 'All', value: 'all' },
    { label: 'Civil', value: 'civil' },
    { label: 'MEP', value: 'mep' },
    { label: 'Surveying', value: 'surveying' },
    { label: 'BIM', value: 'bim' },
  ];

  const qaMetrics = {
    overallScore: 94,
    complianceRate: 96,
    defectRate: 2.1,
    reworkRate: 3.5,
    clientSatisfaction: 4.7,
  };

  const qualityTrends = [
    { month: 'Jan', score: 89, compliance: 92, defects: 3.2 },
    { month: 'Feb', score: 91, compliance: 94, defects: 2.8 },
    { month: 'Mar', score: 93, compliance: 95, defects: 2.5 },
    { month: 'Apr', score: 94, compliance: 96, defects: 2.1 },
    { month: 'May', score: 95, compliance: 97, defects: 1.8 },
    { month: 'Jun', score: 94, compliance: 96, defects: 2.1 },
  ];

  const complianceItems = [
    {
      category: 'Safety Standards',
      status: 'Compliant',
      score: 98,
      lastCheck: '2024-01-20',
      icon: 'shield-checkmark',
    },
    {
      category: 'Code Compliance',
      status: 'Compliant',
      score: 95,
      lastCheck: '2024-01-18',
      icon: 'document-text',
    },
    {
      category: 'Environmental',
      status: 'Compliant',
      score: 92,
      lastCheck: '2024-01-15',
      icon: 'leaf',
    },
    {
      category: 'Quality Control',
      status: 'Minor Issues',
      score: 88,
      lastCheck: '2024-01-22',
      icon: 'construct',
    },
  ];

  const recentDefects = [
    {
      id: 'DEF-001',
      description: 'Incomplete structural calculations',
      severity: 'High',
      status: 'Fixed',
      date: '2024-01-22',
      category: 'Civil',
    },
    {
      id: 'DEF-002',
      description: 'MEP drawing inconsistencies',
      severity: 'Medium',
      status: 'In Progress',
      date: '2024-01-21',
      category: 'MEP',
    },
    {
      id: 'DEF-003',
      description: 'Survey data accuracy issues',
      severity: 'Low',
      status: 'Fixed',
      date: '2024-01-20',
      category: 'Surveying',
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

  const CategoryButton = ({ category }: { category: any }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === category.value && styles.categoryButtonSelected
      ]}
      onPress={() => setSelectedCategory(category.value)}
    >
      <Text style={[
        styles.categoryButtonText,
        selectedCategory === category.value && styles.categoryButtonTextSelected
      ]}>
        {category.label}
      </Text>
    </TouchableOpacity>
  );

  const MetricCard = ({ title, value, unit, trend, icon }: { title: string; value: number; unit: string; trend: string; icon: string }) => (
    <View style={styles.metricCard}>
      <View style={styles.metricHeader}>
        <Ionicons name={icon as any} size={20} color="#007bff" />
        <Text style={styles.metricTitle}>{title}</Text>
      </View>
      <Text style={styles.metricValue}>{value}{unit}</Text>
      <Text style={[
        styles.metricTrend,
        { color: trend.startsWith('+') ? '#28a745' : '#dc3545' }
      ]}>
        {trend}
      </Text>
    </View>
  );

  const ComplianceItem = ({ item }: { item: any }) => (
    <View style={styles.complianceItem}>
      <View style={styles.complianceHeader}>
        <View style={styles.complianceInfo}>
          <Ionicons name={item.icon as any} size={20} color="#007bff" />
          <Text style={styles.complianceCategory}>{item.category}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { backgroundColor: item.status === 'Compliant' ? '#28a745' : '#ffc107' }
        ]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.complianceStats}>
        <Text style={styles.complianceScore}>Score: {item.score}%</Text>
        <Text style={styles.complianceDate}>Last check: {item.lastCheck}</Text>
      </View>
    </View>
  );

  const DefectItem = ({ defect }: { defect: any }) => (
    <View style={styles.defectItem}>
      <View style={styles.defectHeader}>
        <Text style={styles.defectId}>{defect.id}</Text>
        <View style={[
          styles.severityBadge,
          { 
            backgroundColor: defect.severity === 'High' ? '#dc3545' : 
                           defect.severity === 'Medium' ? '#ffc107' : '#28a745'
          }
        ]}>
          <Text style={styles.severityText}>{defect.severity}</Text>
        </View>
      </View>
      <Text style={styles.defectDescription}>{defect.description}</Text>
      <View style={styles.defectFooter}>
        <Text style={styles.defectCategory}>{defect.category}</Text>
        <Text style={styles.defectDate}>{defect.date}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: defect.status === 'Fixed' ? '#28a745' : '#ffc107' }
        ]}>
          <Text style={styles.statusText}>{defect.status}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>QA Dashboard</Text>
      <Text style={styles.subtitle}>
        Monitor deliverables quality and compliance
      </Text>

      <View style={styles.periodSelector}>
        <Text style={styles.selectorTitle}>Time Period</Text>
        <View style={styles.periodButtons}>
          {periods.map((period) => (
            <PeriodButton key={period.value} period={period} />
          ))}
        </View>
      </View>

      <View style={styles.categorySelector}>
        <Text style={styles.selectorTitle}>Category Filter</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoryButtons}>
            {categories.map((category) => (
              <CategoryButton key={category.value} category={category} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.metricsGrid}>
        <MetricCard 
          title="Overall Score" 
          value={qaMetrics.overallScore} 
          unit="%" 
          trend="+2%" 
          icon="star" 
        />
        <MetricCard 
          title="Compliance Rate" 
          value={qaMetrics.complianceRate} 
          unit="%" 
          trend="+1%" 
          icon="shield-checkmark" 
        />
        <MetricCard 
          title="Defect Rate" 
          value={qaMetrics.defectRate} 
          unit="%" 
          trend="-0.5%" 
          icon="warning" 
        />
        <MetricCard 
          title="Rework Rate" 
          value={qaMetrics.reworkRate} 
          unit="%" 
          trend="-0.8%" 
          icon="refresh" 
        />
      </View>

      <View style={styles.trendsCard}>
        <Text style={styles.cardTitle}>Quality Trends</Text>
        <View style={styles.trendsChart}>
          {qualityTrends.map((trend, index) => (
            <View key={index} style={styles.trendBar}>
              <View style={styles.barContainer}>
                <View 
                  style={[
                    styles.scoreBar, 
                    { height: (trend.score / 100) * 60 }
                  ]} 
                />
                <View 
                  style={[
                    styles.complianceBar, 
                    { height: (trend.compliance / 100) * 60 }
                  ]} 
                />
              </View>
              <Text style={styles.monthLabel}>{trend.month}</Text>
            </View>
          ))}
        </View>
        <View style={styles.chartLegend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#007bff' }]} />
            <Text style={styles.legendText}>Quality Score</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#28a745' }]} />
            <Text style={styles.legendText}>Compliance</Text>
          </View>
        </View>
      </View>

      <View style={styles.complianceCard}>
        <Text style={styles.cardTitle}>Compliance Status</Text>
        {complianceItems.map((item, index) => (
          <ComplianceItem key={index} item={item} />
        ))}
      </View>

      <View style={styles.defectsCard}>
        <Text style={styles.cardTitle}>Recent Defects</Text>
        <Text style={styles.cardDescription}>
          Quality issues and their resolution status
        </Text>
        {recentDefects.map((defect) => (
          <DefectItem key={defect.id} defect={defect} />
        ))}
      </View>

      <View style={styles.insightsCard}>
        <Text style={styles.cardTitle}>Quality Insights</Text>
        <View style={styles.insight}>
          <Ionicons name="trending-up" size={20} color="#28a745" />
          <Text style={styles.insightText}>
            Quality score improved by 5% over the last 6 months
          </Text>
        </View>
        <View style={styles.insight}>
          <Ionicons name="shield-checkmark" size={20} color="#007bff" />
          <Text style={styles.insightText}>
            Compliance rate consistently above 95%
          </Text>
        </View>
        <View style={styles.insight}>
          <Ionicons name="warning" size={20} color="#ffc107" />
          <Text style={styles.insightText}>
            Focus on reducing MEP drawing inconsistencies
          </Text>
        </View>
      </View>

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add-circle" size={24} color="#007bff" />
            <Text style={styles.actionText}>New QA Check</Text>
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
          QA dashboard tracks quality metrics and compliance across all projects. 
          Regular monitoring helps maintain high standards and identify improvement areas.
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
  categorySelector: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  categoryButtons: {
    flexDirection: 'row',
  },
  categoryButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    minWidth: 80,
    alignItems: 'center',
  },
  categoryButtonSelected: {
    backgroundColor: '#28a745',
  },
  categoryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  categoryButtonTextSelected: {
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  metricTrend: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  trendsCard: {
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
  trendsChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    marginBottom: 15,
  },
  trendBar: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  barContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '100%',
  },
  scoreBar: {
    width: '45%',
    backgroundColor: '#007bff',
    marginRight: 2,
    borderRadius: 2,
  },
  complianceBar: {
    width: '45%',
    backgroundColor: '#28a745',
    marginLeft: 2,
    borderRadius: 2,
  },
  monthLabel: {
    fontSize: 10,
    color: '#cccccc',
    marginTop: 5,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginRight: 8,
  },
  legendText: {
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
  complianceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  complianceCategory: {
    fontSize: 14,
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
  complianceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  complianceScore: {
    fontSize: 12,
    color: '#007bff',
    fontWeight: 'bold',
  },
  complianceDate: {
    fontSize: 12,
    color: '#cccccc',
  },
  defectsCard: {
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
  defectItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  defectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  defectId: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#007bff',
  },
  severityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  severityText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  defectDescription: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 8,
  },
  defectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  defectCategory: {
    fontSize: 12,
    color: '#cccccc',
  },
  defectDate: {
    fontSize: 12,
    color: '#cccccc',
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

export default QADashboardScreen;

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomReportBuilderScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('financial');
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState('30days');

  const categories = [
    { id: 'financial', name: 'Financial', icon: 'cash' },
    { id: 'performance', name: 'Performance', icon: 'trending-up' },
    { id: 'quality', name: 'Quality', icon: 'star' },
    { id: 'utilization', name: 'Utilization', icon: 'people' },
    { id: 'market', name: 'Market', icon: 'business' },
  ];

  const availableMetrics = {
    financial: [
      { id: 'revenue', name: 'Total Revenue', type: 'currency' },
      { id: 'profit', name: 'Net Profit', type: 'currency' },
      { id: 'expenses', name: 'Total Expenses', type: 'currency' },
      { id: 'margins', name: 'Profit Margins', type: 'percentage' },
    ],
    performance: [
      { id: 'response_time', name: 'Response Time', type: 'time' },
      { id: 'completion_rate', name: 'Completion Rate', type: 'percentage' },
      { id: 'client_satisfaction', name: 'Client Satisfaction', type: 'rating' },
      { id: 'project_success', name: 'Project Success Rate', type: 'percentage' },
    ],
    quality: [
      { id: 'defect_rate', name: 'Defect Rate', type: 'percentage' },
      { id: 'rework_rate', name: 'Rework Rate', type: 'percentage' },
      { id: 'compliance_score', name: 'Compliance Score', type: 'score' },
      { id: 'quality_score', name: 'Overall Quality Score', type: 'score' },
    ],
    utilization: [
      { id: 'engineer_utilization', name: 'Engineer Utilization', type: 'percentage' },
      { id: 'capacity_utilization', name: 'Capacity Utilization', type: 'percentage' },
      { id: 'resource_efficiency', name: 'Resource Efficiency', type: 'percentage' },
      { id: 'workload_distribution', name: 'Workload Distribution', type: 'chart' },
    ],
    market: [
      { id: 'market_share', name: 'Market Share', type: 'percentage' },
      { id: 'competitor_analysis', name: 'Competitor Analysis', type: 'chart' },
      { id: 'pricing_analysis', name: 'Pricing Analysis', type: 'chart' },
      { id: 'growth_rate', name: 'Growth Rate', type: 'percentage' },
    ],
  };

  const periods = [
    { label: '7 Days', value: '7days' },
    { label: '30 Days', value: '30days' },
    { label: '90 Days', value: '90days' },
    { label: '1 Year', value: '1year' },
  ];

  const chartTypes = [
    { id: 'line', name: 'Line Chart', icon: 'trending-up' },
    { id: 'bar', name: 'Bar Chart', icon: 'bar-chart' },
    { id: 'pie', name: 'Pie Chart', icon: 'pie-chart' },
    { id: 'table', name: 'Data Table', icon: 'grid' },
  ];

  const savedReports = [
    {
      id: '1',
      name: 'Monthly Financial Summary',
      category: 'Financial',
      lastRun: '2024-01-20',
      metrics: ['revenue', 'profit', 'margins'],
    },
    {
      id: '2',
      name: 'Performance Dashboard',
      category: 'Performance',
      lastRun: '2024-01-22',
      metrics: ['response_time', 'completion_rate', 'client_satisfaction'],
    },
    {
      id: '3',
      name: 'Quality Metrics Report',
      category: 'Quality',
      lastRun: '2024-01-18',
      metrics: ['defect_rate', 'compliance_score', 'quality_score'],
    },
  ];

  const CategoryButton = ({ category }: { category: any }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === category.id && styles.categoryButtonSelected
      ]}
      onPress={() => setSelectedCategory(category.id)}
    >
      <Ionicons 
        name={category.icon as any} 
        size={20} 
        color={selectedCategory === category.id ? '#ffffff' : '#007bff'} 
      />
      <Text style={[
        styles.categoryButtonText,
        selectedCategory === category.id && styles.categoryButtonTextSelected
      ]}>
        {category.name}
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

  const MetricItem = ({ metric }: { metric: any }) => {
    const isSelected = selectedMetrics.includes(metric.id);
    
    return (
      <TouchableOpacity
        style={[
          styles.metricItem,
          isSelected && styles.metricItemSelected
        ]}
        onPress={() => {
          if (isSelected) {
            setSelectedMetrics(selectedMetrics.filter(id => id !== metric.id));
          } else {
            setSelectedMetrics([...selectedMetrics, metric.id]);
          }
        }}
      >
        <View style={styles.metricInfo}>
          <Text style={[
            styles.metricName,
            isSelected && styles.metricNameSelected
          ]}>
            {metric.name}
          </Text>
          <Text style={styles.metricType}>{metric.type}</Text>
        </View>
        {isSelected && (
          <Ionicons name="checkmark-circle" size={20} color="#28a745" />
        )}
      </TouchableOpacity>
    );
  };

  const ChartTypeButton = ({ chartType }: { chartType: any }) => (
    <TouchableOpacity style={styles.chartTypeButton}>
      <Ionicons name={chartType.icon as any} size={24} color="#007bff" />
      <Text style={styles.chartTypeText}>{chartType.name}</Text>
    </TouchableOpacity>
  );

  const SavedReportItem = ({ report }: { report: any }) => (
    <View style={styles.savedReportItem}>
      <View style={styles.reportHeader}>
        <Text style={styles.reportName}>{report.name}</Text>
        <Text style={styles.reportCategory}>{report.category}</Text>
      </View>
      <Text style={styles.reportLastRun}>Last run: {report.lastRun}</Text>
      <View style={styles.reportActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="play" size={16} color="#007bff" />
          <Text style={styles.actionText}>Run</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="create" size={16} color="#28a745" />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="trash" size={16} color="#dc3545" />
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const currentMetrics = availableMetrics[selectedCategory as keyof typeof availableMetrics];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Custom Report Builder</Text>
      <Text style={styles.subtitle}>
        Drag-and-drop report creation with customizable metrics
      </Text>

      <View style={styles.categorySelector}>
        <Text style={styles.selectorTitle}>Report Category</Text>
        <View style={styles.categoryButtons}>
          {categories.map((category) => (
            <CategoryButton key={category.id} category={category} />
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

      <View style={styles.metricsCard}>
        <Text style={styles.cardTitle}>Select Metrics</Text>
        <Text style={styles.cardDescription}>
          Choose the metrics you want to include in your report
        </Text>
        <View style={styles.metricsList}>
          {currentMetrics.map((metric) => (
            <MetricItem key={metric.id} metric={metric} />
          ))}
        </View>
        <Text style={styles.selectedCount}>
          {selectedMetrics.length} metrics selected
        </Text>
      </View>

      <View style={styles.chartTypesCard}>
        <Text style={styles.cardTitle}>Visualization Options</Text>
        <Text style={styles.cardDescription}>
          Choose how to display your data
        </Text>
        <View style={styles.chartTypesGrid}>
          {chartTypes.map((chartType) => (
            <ChartTypeButton key={chartType.id} chartType={chartType} />
          ))}
        </View>
      </View>

      <View style={styles.previewCard}>
        <Text style={styles.cardTitle}>Report Preview</Text>
        <View style={styles.previewContainer}>
          <Ionicons name="document-text" size={40} color="#007bff" />
          <Text style={styles.previewTitle}>Custom Report</Text>
          <Text style={styles.previewDescription}>
            {selectedMetrics.length} metrics • {selectedPeriod} • {categories.find(c => c.id === selectedCategory)?.name}
          </Text>
          <TouchableOpacity style={styles.generateButton}>
            <Text style={styles.generateButtonText}>Generate Report</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.savedReportsCard}>
        <Text style={styles.cardTitle}>Saved Reports</Text>
        <Text style={styles.cardDescription}>
          Your previously created reports
        </Text>
        {savedReports.map((report) => (
          <SavedReportItem key={report.id} report={report} />
        ))}
      </View>

      <View style={styles.templatesCard}>
        <Text style={styles.cardTitle}>Report Templates</Text>
        <View style={styles.templateGrid}>
          <TouchableOpacity style={styles.templateButton}>
            <Ionicons name="briefcase" size={24} color="#007bff" />
            <Text style={styles.templateText}>Executive Summary</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.templateButton}>
            <Ionicons name="trending-up" size={24} color="#28a745" />
            <Text style={styles.templateText}>Performance Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.templateButton}>
            <Ionicons name="cash" size={24} color="#ffc107" />
            <Text style={styles.templateText}>Financial Analysis</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.templateButton}>
            <Ionicons name="people" size={24} color="#dc3545" />
            <Text style={styles.templateText}>Team Utilization</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="save" size={24} color="#007bff" />
            <Text style={styles.actionText}>Save Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share" size={24} color="#28a745" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Export</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          Create custom reports by selecting metrics, time periods, and visualization types. 
          Reports can be saved, shared, and scheduled for automatic generation.
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
  categorySelector: {
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
  categoryButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryButtonSelected: {
    backgroundColor: '#007bff',
  },
  categoryButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  categoryButtonTextSelected: {
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
  metricsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 15,
  },
  metricsList: {
    marginBottom: 15,
  },
  metricItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  metricItemSelected: {
    borderColor: '#28a745',
    backgroundColor: '#1a1a2e',
  },
  metricInfo: {
    flex: 1,
  },
  metricName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  metricNameSelected: {
    color: '#28a745',
  },
  metricType: {
    fontSize: 12,
    color: '#cccccc',
  },
  selectedCount: {
    fontSize: 12,
    color: '#28a745',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  chartTypesCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  chartTypesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  chartTypeButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    width: '48%',
    alignItems: 'center',
    marginBottom: 10,
  },
  chartTypeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  previewCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  previewContainer: {
    alignItems: 'center',
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 15,
    marginBottom: 10,
  },
  previewDescription: {
    fontSize: 14,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  generateButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  generateButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  savedReportsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  savedReportItem: {
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
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  reportCategory: {
    fontSize: 12,
    color: '#007bff',
  },
  reportLastRun: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 10,
  },
  reportActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: '#555555',
  },
  actionText: {
    color: '#ffffff',
    fontSize: 12,
    marginLeft: 4,
  },
  templatesCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  templateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  templateButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    width: '48%',
    alignItems: 'center',
    marginBottom: 10,
  },
  templateText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
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

export default CustomReportBuilderScreen;

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PerformanceBenchmarkingScreen: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState('overall');
  const [selectedPeriod, setSelectedPeriod] = useState('3months');

  const metrics = [
    { id: 'overall', name: 'Overall Performance', icon: 'trending-up' },
    { id: 'response', name: 'Response Time', icon: 'time' },
    { id: 'quality', name: 'Quality Score', icon: 'star' },
    { id: 'completion', name: 'Completion Rate', icon: 'checkmark-circle' },
  ];

  const periods = [
    { label: '1 Month', value: '1month' },
    { label: '3 Months', value: '3months' },
    { label: '6 Months', value: '6months' },
    { label: '1 Year', value: '1year' },
  ];

  const performanceData = {
    overall: {
      yourScore: 87,
      industryAvg: 72,
      topPerformers: 94,
      percentile: 78,
    },
    response: {
      yourScore: 2.3,
      industryAvg: 4.1,
      topPerformers: 1.8,
      percentile: 85,
    },
    quality: {
      yourScore: 4.6,
      industryAvg: 4.2,
      topPerformers: 4.8,
      percentile: 82,
    },
    completion: {
      yourScore: 94,
      industryAvg: 87,
      topPerformers: 98,
      percentile: 79,
    },
  };

  const benchmarkCategories = [
    {
      category: 'Civil Engineering',
      yourRank: 15,
      totalEngineers: 120,
      percentile: 88,
      improvement: '+12%',
    },
    {
      category: 'MEP Systems',
      yourRank: 8,
      totalEngineers: 85,
      percentile: 91,
      improvement: '+8%',
    },
    {
      category: 'Surveying',
      yourRank: 22,
      totalEngineers: 95,
      percentile: 77,
      improvement: '+5%',
    },
    {
      category: 'BIM Services',
      yourRank: 5,
      totalEngineers: 60,
      percentile: 92,
      improvement: '+15%',
    },
  ];

  const industryInsights = [
    {
      title: 'Response Time Excellence',
      description: 'You respond 44% faster than industry average',
      impact: 'High',
      icon: 'time',
    },
    {
      title: 'Quality Leadership',
      description: 'Your quality scores exceed 90% of engineers',
      impact: 'High',
      icon: 'star',
    },
    {
      title: 'Completion Reliability',
      description: 'Consistently high project completion rates',
      impact: 'Medium',
      icon: 'checkmark-circle',
    },
    {
      title: 'BIM Specialization',
      description: 'Top 8% in BIM services category',
      impact: 'High',
      icon: 'construct',
    },
  ];

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

  const BenchmarkCard = ({ category }: { category: any }) => (
    <View style={styles.benchmarkCard}>
      <View style={styles.benchmarkHeader}>
        <Text style={styles.categoryName}>{category.category}</Text>
        <View style={styles.rankContainer}>
          <Text style={styles.rankText}>#{category.yourRank}</Text>
          <Text style={styles.totalText}>of {category.totalEngineers}</Text>
        </View>
      </View>
      <View style={styles.benchmarkStats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{category.percentile}%</Text>
          <Text style={styles.statLabel}>Percentile</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{category.improvement}</Text>
          <Text style={styles.statLabel}>Improvement</Text>
        </View>
      </View>
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${category.percentile}%` }
          ]} 
        />
      </View>
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
    </View>
  );

  const currentData = performanceData[selectedMetric as keyof typeof performanceData];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Performance Benchmarking</Text>
      <Text style={styles.subtitle}>
        Compare your performance with peers and industry standards
      </Text>

      <View style={styles.metricSelector}>
        <Text style={styles.selectorTitle}>Performance Metrics</Text>
        <View style={styles.metricButtons}>
          {metrics.map((metric) => (
            <MetricButton key={metric.id} metric={metric} />
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

      <View style={styles.performanceCard}>
        <Text style={styles.cardTitle}>Your Performance vs Industry</Text>
        <View style={styles.performanceComparison}>
          <View style={styles.comparisonItem}>
            <Text style={styles.comparisonLabel}>Your Score</Text>
            <Text style={styles.comparisonValue}>
              {selectedMetric === 'response' ? `${currentData.yourScore}s` : 
               selectedMetric === 'quality' ? `${currentData.yourScore}/5` : 
               `${currentData.yourScore}%`}
            </Text>
          </View>
          <View style={styles.comparisonItem}>
            <Text style={styles.comparisonLabel}>Industry Average</Text>
            <Text style={styles.comparisonValue}>
              {selectedMetric === 'response' ? `${currentData.industryAvg}s` : 
               selectedMetric === 'quality' ? `${currentData.industryAvg}/5` : 
               `${currentData.industryAvg}%`}
            </Text>
          </View>
          <View style={styles.comparisonItem}>
            <Text style={styles.comparisonLabel}>Top Performers</Text>
            <Text style={styles.comparisonValue}>
              {selectedMetric === 'response' ? `${currentData.topPerformers}s` : 
               selectedMetric === 'quality' ? `${currentData.topPerformers}/5` : 
               `${currentData.topPerformers}%`}
            </Text>
          </View>
        </View>
        <View style={styles.percentileContainer}>
          <Text style={styles.percentileText}>
            You're in the top {100 - currentData.percentile}% of engineers
          </Text>
          <View style={styles.percentileBar}>
            <View 
              style={[
                styles.percentileFill, 
                { width: `${currentData.percentile}%` }
              ]} 
            />
          </View>
        </View>
      </View>

      <View style={styles.categoriesCard}>
        <Text style={styles.cardTitle}>Category Rankings</Text>
        <Text style={styles.cardDescription}>
          Your performance across different engineering categories
        </Text>
        {benchmarkCategories.map((category, index) => (
          <BenchmarkCard key={index} category={category} />
        ))}
      </View>

      <View style={styles.insightsCard}>
        <Text style={styles.cardTitle}>Performance Insights</Text>
        {industryInsights.map((insight, index) => (
          <InsightCard key={index} insight={insight} />
        ))}
      </View>

      <View style={styles.recommendationsCard}>
        <Text style={styles.cardTitle}>Improvement Recommendations</Text>
        <View style={styles.recommendation}>
          <Ionicons name="trending-up" size={20} color="#28a745" />
          <Text style={styles.recommendationText}>
            Focus on Surveying skills to improve ranking from #22
          </Text>
        </View>
        <View style={styles.recommendation}>
          <Ionicons name="time" size={20} color="#007bff" />
          <Text style={styles.recommendationText}>
            Maintain current response time advantage
          </Text>
        </View>
        <View style={styles.recommendation}>
          <Ionicons name="construct" size={20} color="#ffc107" />
          <Text style={styles.recommendationText}>
            Leverage BIM expertise for premium projects
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
            <Ionicons name="trending-up" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Set Goals</Text>
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
          Benchmarking data is updated weekly and compares your performance with 
          engineers in similar categories and regions.
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
    backgroundColor: '#007bff',
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
  performanceCard: {
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
  performanceComparison: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  comparisonItem: {
    alignItems: 'center',
    flex: 1,
  },
  comparisonLabel: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 5,
  },
  comparisonValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  percentileContainer: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
  },
  percentileText: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  percentileBar: {
    height: 8,
    backgroundColor: '#555555',
    borderRadius: 4,
  },
  percentileFill: {
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: 4,
  },
  categoriesCard: {
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
  benchmarkCard: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  benchmarkHeader: {
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
  rankContainer: {
    alignItems: 'flex-end',
  },
  rankText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  totalText: {
    fontSize: 12,
    color: '#cccccc',
  },
  benchmarkStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: '#cccccc',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#555555',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: 2,
  },
  insightsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
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
    lineHeight: 16,
  },
  recommendationsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  recommendation: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  recommendationText: {
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

export default PerformanceBenchmarkingScreen;

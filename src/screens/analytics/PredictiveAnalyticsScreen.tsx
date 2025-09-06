import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PredictiveAnalyticsScreen: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('3months');
  const [selectedMetric, setSelectedMetric] = useState('demand');

  const periods = [
    { label: '1 Month', value: '1month' },
    { label: '3 Months', value: '3months' },
    { label: '6 Months', value: '6months' },
    { label: '1 Year', value: '1year' },
  ];

  const metrics = [
    { label: 'Demand', value: 'demand' },
    { label: 'Pricing', value: 'pricing' },
    { label: 'Seasonal', value: 'seasonal' },
    { label: 'Trends', value: 'trends' },
  ];

  const demandForecast = {
    current: 156,
    predicted: 189,
    change: '+21%',
    trend: 'up',
    confidence: 87,
  };

  const pricingForecast = {
    current: 450,
    predicted: 485,
    change: '+8%',
    trend: 'up',
    confidence: 92,
  };

  const seasonalData = [
    { month: 'Jan', demand: 120, price: 420 },
    { month: 'Feb', demand: 135, price: 430 },
    { month: 'Mar', demand: 150, price: 440 },
    { month: 'Apr', demand: 165, price: 450 },
    { month: 'May', demand: 180, price: 460 },
    { month: 'Jun', demand: 195, price: 470 },
    { month: 'Jul', demand: 210, price: 480 },
    { month: 'Aug', demand: 200, price: 475 },
    { month: 'Sep', demand: 185, price: 465 },
    { month: 'Oct', demand: 170, price: 455 },
    { month: 'Nov', demand: 155, price: 445 },
    { month: 'Dec', demand: 140, price: 435 },
  ];

  const trendInsights = [
    {
      title: 'Peak Demand Period',
      description: 'July-August shows highest demand for engineering services',
      impact: 'High',
      icon: 'trending-up',
    },
    {
      title: 'Price Optimization',
      description: 'Rates can be increased by 8-12% during peak months',
      impact: 'Medium',
      icon: 'cash',
    },
    {
      title: 'Market Expansion',
      description: 'Riyadh and Jeddah show 25% growth potential',
      impact: 'High',
      icon: 'location',
    },
    {
      title: 'Skill Demand',
      description: 'BIM and MEP specialists in high demand',
      impact: 'Medium',
      icon: 'construct',
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

  const MetricButton = ({ metric }: { metric: any }) => (
    <TouchableOpacity
      style={[
        styles.metricButton,
        selectedMetric === metric.value && styles.metricButtonSelected
      ]}
      onPress={() => setSelectedMetric(metric.value)}
    >
      <Text style={[
        styles.metricButtonText,
        selectedMetric === metric.value && styles.metricButtonTextSelected
      ]}>
        {metric.label}
      </Text>
    </TouchableOpacity>
  );

  const ForecastCard = ({ title, data, icon }: { title: string; data: any; icon: string }) => (
    <View style={styles.forecastCard}>
      <View style={styles.forecastHeader}>
        <Ionicons name={icon as any} size={24} color="#007bff" />
        <Text style={styles.forecastTitle}>{title}</Text>
      </View>
      <View style={styles.forecastContent}>
        <View style={styles.forecastValues}>
          <View style={styles.forecastValue}>
            <Text style={styles.forecastCurrent}>{data.current}</Text>
            <Text style={styles.forecastLabel}>Current</Text>
          </View>
          <View style={styles.forecastArrow}>
            <Ionicons 
              name={data.trend === 'up' ? 'arrow-up' : 'arrow-down'} 
              size={20} 
              color={data.trend === 'up' ? '#28a745' : '#dc3545'} 
            />
          </View>
          <View style={styles.forecastValue}>
            <Text style={styles.forecastPredicted}>{data.predicted}</Text>
            <Text style={styles.forecastLabel}>Predicted</Text>
          </View>
        </View>
        <View style={styles.forecastChange}>
          <Text style={[
            styles.changeText,
            { color: data.trend === 'up' ? '#28a745' : '#dc3545' }
          ]}>
            {data.change}
          </Text>
          <Text style={styles.confidenceText}>
            {data.confidence}% confidence
          </Text>
        </View>
      </View>
    </View>
  );

  const TrendInsight = ({ insight }: { insight: any }) => (
    <View style={styles.insightCard}>
      <View style={styles.insightHeader}>
        <Ionicons name={insight.icon as any} size={20} color="#007bff" />
        <Text style={styles.insightTitle}>{insight.title}</Text>
        <View style={[
          styles.impactBadge,
          { backgroundColor: insight.impact === 'High' ? '#dc3545' : '#ffc107' }
        ]}>
          <Text style={styles.impactText}>{insight.impact}</Text>
        </View>
      </View>
      <Text style={styles.insightDescription}>{insight.description}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Predictive Analytics</Text>
      <Text style={styles.subtitle}>
        Forecast demand, pricing, and seasonal patterns
      </Text>

      <View style={styles.periodSelector}>
        <Text style={styles.selectorTitle}>Forecast Period</Text>
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
            <MetricButton key={metric.value} metric={metric} />
          ))}
        </View>
      </View>

      <View style={styles.forecastSection}>
        <Text style={styles.sectionTitle}>Market Forecast</Text>
        <ForecastCard 
          title="Job Demand" 
          data={demandForecast} 
          icon="trending-up" 
        />
        <ForecastCard 
          title="Average Pricing" 
          data={pricingForecast} 
          icon="cash" 
        />
      </View>

      <View style={styles.seasonalCard}>
        <Text style={styles.cardTitle}>Seasonal Patterns</Text>
        <Text style={styles.cardDescription}>
          Monthly demand and pricing trends
        </Text>
        <View style={styles.seasonalChart}>
          {seasonalData.map((month, index) => (
            <View key={index} style={styles.seasonalBar}>
              <View style={styles.barContainer}>
                <View 
                  style={[
                    styles.demandBar, 
                    { height: (month.demand / 210) * 100 }
                  ]} 
                />
                <View 
                  style={[
                    styles.priceBar, 
                    { height: (month.price / 480) * 100 }
                  ]} 
                />
              </View>
              <Text style={styles.monthLabel}>{month.month}</Text>
            </View>
          ))}
        </View>
        <View style={styles.chartLegend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#007bff' }]} />
            <Text style={styles.legendText}>Demand</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#28a745' }]} />
            <Text style={styles.legendText}>Price (SAR)</Text>
          </View>
        </View>
      </View>

      <View style={styles.insightsCard}>
        <Text style={styles.cardTitle}>Market Insights</Text>
        {trendInsights.map((insight, index) => (
          <TrendInsight key={index} insight={insight} />
        ))}
      </View>

      <View style={styles.recommendationsCard}>
        <Text style={styles.cardTitle}>AI Recommendations</Text>
        <View style={styles.recommendation}>
          <Ionicons name="bulb" size={20} color="#ffc107" />
          <Text style={styles.recommendationText}>
            Increase rates by 10% during July-August peak season
          </Text>
        </View>
        <View style={styles.recommendation}>
          <Ionicons name="location" size={20} color="#28a745" />
          <Text style={styles.recommendationText}>
            Focus marketing efforts on Riyadh and Jeddah markets
          </Text>
        </View>
        <View style={styles.recommendation}>
          <Ionicons name="construct" size={20} color="#007bff" />
          <Text style={styles.recommendationText}>
            Consider specializing in BIM and MEP services
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
          Predictive analytics use machine learning to forecast market trends. 
          These insights help optimize pricing and identify growth opportunities.
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
    alignItems: 'center',
  },
  metricButtonSelected: {
    backgroundColor: '#28a745',
  },
  metricButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  metricButtonTextSelected: {
    color: '#ffffff',
  },
  forecastSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  forecastCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  forecastHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  forecastTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 10,
  },
  forecastContent: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
  },
  forecastValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  forecastValue: {
    alignItems: 'center',
  },
  forecastCurrent: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  forecastPredicted: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  forecastLabel: {
    fontSize: 12,
    color: '#cccccc',
  },
  forecastArrow: {
    marginHorizontal: 20,
  },
  forecastChange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  confidenceText: {
    fontSize: 12,
    color: '#cccccc',
  },
  seasonalCard: {
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
    marginBottom: 20,
  },
  seasonalChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
    marginBottom: 15,
  },
  seasonalBar: {
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
  demandBar: {
    width: '45%',
    backgroundColor: '#007bff',
    marginRight: 2,
    borderRadius: 2,
  },
  priceBar: {
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

export default PredictiveAnalyticsScreen;

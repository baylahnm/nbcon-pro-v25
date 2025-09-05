import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import CustomButton from '../../../components/CustomButton';

const { width } = Dimensions.get('window');

interface MetricCard {
  id: string;
  title: string;
  value: string;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: string;
  color: string;
}

interface ChartData {
  label: string;
  value: number;
  color: string;
}

const AnalyticsDashboardScreen = ({ navigation }: any) => {
  const { isDarkMode } = useTheme();
  const { language, getText } = useLanguage();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [activeCategory, setActiveCategory] = useState<'overview' | 'users' | 'revenue' | 'projects'>('overview');

  const metrics: MetricCard[] = [
    {
      id: 'total-users',
      title: getText('totalUsers', 'Total Users'),
      value: '12,847',
      change: 12.5,
      changeType: 'increase',
      icon: 'people',
      color: '#6366F1',
    },
    {
      id: 'active-projects',
      title: getText('activeProjects', 'Active Projects'),
      value: '1,234',
      change: 8.2,
      changeType: 'increase',
      icon: 'briefcase',
      color: '#10B981',
    },
    {
      id: 'total-revenue',
      title: getText('totalRevenue', 'Total Revenue'),
      value: '2.4M SAR',
      change: -3.1,
      changeType: 'decrease',
      icon: 'wallet',
      color: '#F59E0B',
    },
    {
      id: 'success-rate',
      title: getText('successRate', 'Success Rate'),
      value: '94.2%',
      change: 2.8,
      changeType: 'increase',
      icon: 'checkmark-circle',
      color: '#10B981',
    },
    {
      id: 'avg-response-time',
      title: getText('avgResponseTime', 'Avg Response Time'),
      value: '2.4h',
      change: -15.3,
      changeType: 'increase',
      icon: 'time',
      color: '#8B5CF6',
    },
    {
      id: 'customer-satisfaction',
      title: getText('customerSatisfaction', 'Customer Satisfaction'),
      value: '4.8/5',
      change: 0.2,
      changeType: 'increase',
      icon: 'star',
      color: '#EF4444',
    },
  ];

  const userGrowthData: ChartData[] = [
    { label: 'Jan', value: 8500, color: '#6366F1' },
    { label: 'Feb', value: 9200, color: '#6366F1' },
    { label: 'Mar', value: 10100, color: '#6366F1' },
    { label: 'Apr', value: 11300, color: '#6366F1' },
    { label: 'May', value: 12100, color: '#6366F1' },
    { label: 'Jun', value: 12847, color: '#6366F1' },
  ];

  const projectCategoryData: ChartData[] = [
    { label: getText('residential', 'Residential'), value: 35, color: '#6366F1' },
    { label: getText('commercial', 'Commercial'), value: 28, color: '#10B981' },
    { label: getText('infrastructure', 'Infrastructure'), value: 22, color: '#F59E0B' },
    { label: getText('industrial', 'Industrial'), value: 15, color: '#EF4444' },
  ];

  const revenueData: ChartData[] = [
    { label: 'Q1', value: 580000, color: '#10B981' },
    { label: 'Q2', value: 620000, color: '#10B981' },
    { label: 'Q3', value: 750000, color: '#10B981' },
    { label: 'Q4', value: 850000, color: '#10B981' },
  ];

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'increase': return 'trending-up';
      case 'decrease': return 'trending-down';
      default: return 'remove';
    }
  };

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'increase': return '#10B981';
      case 'decrease': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const renderSimpleChart = (data: ChartData[], type: 'bar' | 'line' = 'bar') => {
    const maxValue = Math.max(...data.map(d => d.value));
    const chartWidth = width - 80;
    const barWidth = (chartWidth - (data.length - 1) * 8) / data.length;

    return (
      <View style={styles.chartContainer}>
        <View style={styles.chart}>
          {data.map((item, index) => (
            <View key={index} style={styles.barContainer}>
              <View
                style={[
                  styles.bar,
                  {
                    height: (item.value / maxValue) * 100,
                    width: barWidth,
                    backgroundColor: item.color,
                  }
                ]}
              />
              <Text style={styles.barLabel}>{item.label}</Text>
              <Text style={styles.barValue}>
                {typeof item.value === 'number' && item.value > 1000
                  ? `${(item.value / 1000).toFixed(1)}K`
                  : item.value.toString()
                }
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderPieChart = (data: ChartData[]) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let startAngle = 0;

    return (
      <View style={styles.pieChartContainer}>
        <View style={styles.pieChart}>
          {/* Simplified representation - in real app, use proper chart library */}
          <View style={styles.pieChartCenter}>
            <Text style={styles.pieChartTotal}>{total}%</Text>
            <Text style={styles.pieChartLabel}>{getText('total', 'Total')}</Text>
          </View>
        </View>
        <View style={styles.pieChartLegend}>
          {data.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: item.color }]} />
              <Text style={styles.legendLabel}>{item.label}</Text>
              <Text style={styles.legendValue}>{item.value}%</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#111827' : '#F9FAFB',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      paddingTop: 10,
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton: {
      marginRight: language === 'ar' ? 0 : 12,
      marginLeft: language === 'ar' ? 12 : 0,
      padding: 8,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
    },
    headerActions: {
      flexDirection: 'row',
      gap: 12,
    },
    headerButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: isDarkMode ? '#374151' : '#F3F4F6',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      flex: 1,
    },
    timeRangeSelector: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 16,
      gap: 8,
    },
    timeRangeButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    activeTimeRange: {
      backgroundColor: '#6366F1',
    },
    timeRangeText: {
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
    },
    activeTimeRangeText: {
      color: '#FFFFFF',
    },
    categoryTabs: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    categoryTab: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: isDarkMode ? '#374151' : '#E5E7EB',
      marginRight: language === 'ar' ? 0 : 8,
      marginLeft: language === 'ar' ? 8 : 0,
      borderRadius: 12,
      alignItems: 'center',
    },
    activeCategoryTab: {
      backgroundColor: '#6366F1',
    },
    categoryTabText: {
      fontSize: 13,
      fontWeight: '600',
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
    },
    activeCategoryTabText: {
      color: '#FFFFFF',
    },
    metricsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 20,
      gap: 12,
      marginBottom: 20,
    },
    metricCard: {
      width: (width - 52) / 2,
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderRadius: 16,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    metricHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    metricIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    metricChange: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2,
    },
    metricChangeText: {
      fontSize: 12,
      fontWeight: '600',
    },
    metricValue: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 4,
    },
    metricTitle: {
      fontSize: 14,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
    },
    chartSection: {
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      marginHorizontal: 20,
      marginBottom: 20,
      borderRadius: 16,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    chartTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 16,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    chartContainer: {
      height: 200,
    },
    chart: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      paddingBottom: 40,
    },
    barContainer: {
      alignItems: 'center',
      flex: 1,
    },
    bar: {
      borderRadius: 4,
      marginBottom: 8,
    },
    barLabel: {
      fontSize: 12,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      marginBottom: 4,
    },
    barValue: {
      fontSize: 11,
      fontWeight: '600',
      color: isDarkMode ? '#FFFFFF' : '#111827',
    },
    pieChartContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 20,
    },
    pieChart: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: isDarkMode ? '#374151' : '#F3F4F6',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    pieChartCenter: {
      alignItems: 'center',
    },
    pieChartTotal: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
    },
    pieChartLabel: {
      fontSize: 12,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
    },
    pieChartLegend: {
      flex: 1,
      gap: 12,
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    legendColor: {
      width: 12,
      height: 12,
      borderRadius: 6,
    },
    legendLabel: {
      flex: 1,
      fontSize: 14,
      color: isDarkMode ? '#D1D5DB' : '#4B5563',
    },
    legendValue: {
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? '#FFFFFF' : '#111827',
    },
    insightsSection: {
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      marginHorizontal: 20,
      marginBottom: 20,
      borderRadius: 16,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    insightItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    insightItemLast: {
      borderBottomWidth: 0,
    },
    insightIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: language === 'ar' ? 0 : 12,
      marginLeft: language === 'ar' ? 12 : 0,
    },
    insightText: {
      flex: 1,
      fontSize: 14,
      color: isDarkMode ? '#D1D5DB' : '#4B5563',
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    exportButton: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons
              name={language === 'ar' ? 'chevron-forward' : 'chevron-back'}
              size={24}
              color={isDarkMode ? '#FFFFFF' : '#111827'}
            />
          </Pressable>
          <Text style={styles.headerTitle}>
            {getText('analytics', 'Analytics')}
          </Text>
        </View>
        <View style={styles.headerActions}>
          <Pressable style={styles.headerButton} onPress={() => navigation.navigate('ReportsScreen')}>
            <Ionicons
              name="document-text-outline"
              size={20}
              color={isDarkMode ? '#9CA3AF' : '#6B7280'}
            />
          </Pressable>
          <Pressable style={styles.headerButton} onPress={() => navigation.navigate('ExportData')}>
            <Ionicons
              name="download-outline"
              size={20}
              color={isDarkMode ? '#9CA3AF' : '#6B7280'}
            />
          </Pressable>
        </View>
      </Animated.View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={SlideInUp.delay(100)} style={styles.timeRangeSelector}>
          {(['7d', '30d', '90d', '1y'] as const).map((range) => (
            <Pressable
              key={range}
              style={[
                styles.timeRangeButton,
                timeRange === range && styles.activeTimeRange
              ]}
              onPress={() => setTimeRange(range)}
            >
              <Text style={[
                styles.timeRangeText,
                timeRange === range && styles.activeTimeRangeText
              ]}>
                {getText(range, range)}
              </Text>
            </Pressable>
          ))}
        </Animated.View>

        <View style={styles.categoryTabs}>
          {(['overview', 'users', 'revenue', 'projects'] as const).map((category) => (
            <Pressable
              key={category}
              style={[
                styles.categoryTab,
                activeCategory === category && styles.activeCategoryTab
              ]}
              onPress={() => setActiveCategory(category)}
            >
              <Text style={[
                styles.categoryTabText,
                activeCategory === category && styles.activeCategoryTabText
              ]}>
                {getText(category, category)}
              </Text>
            </Pressable>
          ))}
        </View>

        <Animated.View entering={SlideInUp.delay(200)} style={styles.metricsGrid}>
          {metrics.map((metric, index) => (
            <Animated.View
              key={metric.id}
              entering={SlideInUp.delay(250 + index * 50)}
              style={styles.metricCard}
            >
              <View style={styles.metricHeader}>
                <View style={[styles.metricIcon, { backgroundColor: metric.color + '20' }]}>
                  <Ionicons
                    name={metric.icon as any}
                    size={16}
                    color={metric.color}
                  />
                </View>
                <View style={styles.metricChange}>
                  <Ionicons
                    name={getChangeIcon(metric.changeType) as any}
                    size={12}
                    color={getChangeColor(metric.changeType)}
                  />
                  <Text style={[
                    styles.metricChangeText,
                    { color: getChangeColor(metric.changeType) }
                  ]}>
                    {Math.abs(metric.change)}%
                  </Text>
                </View>
              </View>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <Text style={styles.metricTitle}>{metric.title}</Text>
            </Animated.View>
          ))}
        </Animated.View>

        <Animated.View entering={SlideInUp.delay(400)} style={styles.chartSection}>
          <Text style={styles.chartTitle}>
            {getText('userGrowth', 'User Growth')}
          </Text>
          {renderSimpleChart(userGrowthData)}
        </Animated.View>

        <Animated.View entering={SlideInUp.delay(500)} style={styles.chartSection}>
          <Text style={styles.chartTitle}>
            {getText('projectCategories', 'Project Categories')}
          </Text>
          {renderPieChart(projectCategoryData)}
        </Animated.View>

        <Animated.View entering={SlideInUp.delay(600)} style={styles.chartSection}>
          <Text style={styles.chartTitle}>
            {getText('quarterlyRevenue', 'Quarterly Revenue')}
          </Text>
          {renderSimpleChart(revenueData)}
        </Animated.View>

        <Animated.View entering={SlideInUp.delay(700)} style={styles.insightsSection}>
          <Text style={styles.chartTitle}>
            {getText('keyInsights', 'Key Insights')}
          </Text>
          
          <View style={styles.insightItem}>
            <View style={[styles.insightIcon, { backgroundColor: '#10B981' + '20' }]}>
              <Ionicons name="trending-up" size={16} color="#10B981" />
            </View>
            <Text style={styles.insightText}>
              {getText('userGrowthInsight', 'User registrations increased 12.5% this month, with most growth in the engineering sector.')}
            </Text>
          </View>

          <View style={styles.insightItem}>
            <View style={[styles.insightIcon, { backgroundColor: '#6366F1' + '20' }]}>
              <Ionicons name="briefcase" size={16} color="#6366F1" />
            </View>
            <Text style={styles.insightText}>
              {getText('projectInsight', 'Residential projects make up 35% of all active projects, showing strong housing market demand.')}
            </Text>
          </View>

          <View style={[styles.insightItem, styles.insightItemLast]}>
            <View style={[styles.insightIcon, { backgroundColor: '#F59E0B' + '20' }]}>
              <Ionicons name="time" size={16} color="#F59E0B" />
            </View>
            <Text style={styles.insightText}>
              {getText('responseInsight', 'Average response time improved by 15.3%, enhancing customer satisfaction.')}
            </Text>
          </View>
        </Animated.View>

        <View style={styles.exportButton}>
          <CustomButton
            title={getText('exportReport', 'Export Full Report')}
            onPress={() => navigation.navigate('ExportData')}
            variant="primary"
            fullWidth
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnalyticsDashboardScreen;
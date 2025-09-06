import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import CustomButton from '../../components/CustomButton';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: 'users' | 'projects' | 'financial' | 'performance';
  icon: string;
  color: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  lastGenerated: string;
  size: string;
}

interface ReportHistory {
  id: string;
  name: string;
  type: string;
  generatedDate: string;
  size: string;
  status: 'completed' | 'processing' | 'failed';
  downloadUrl?: string;
}

const ReportsScreen = ({ navigation }: any) => {
  const { isDarkMode } = useTheme();
  const { language, getText } = useLanguage();
  const [activeTab, setActiveTab] = useState<'templates' | 'history' | 'custom'>('templates');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'users' | 'projects' | 'financial' | 'performance'>('all');

  const reportTemplates: ReportTemplate[] = [
    {
      id: '1',
      name: getText('userActivityReport', 'User Activity Report'),
      description: getText('userActivityDesc', 'Comprehensive analysis of user engagement and activity patterns'),
      category: 'users',
      icon: 'people-outline',
      color: '#6366F1',
      frequency: 'weekly',
      lastGenerated: '2024-01-14',
      size: '2.4 MB',
    },
    {
      id: '2',
      name: getText('projectPerformanceReport', 'Project Performance Report'),
      description: getText('projectPerformanceDesc', 'Success rates, completion times, and project outcomes analysis'),
      category: 'projects',
      icon: 'briefcase-outline',
      color: '#10B981',
      frequency: 'monthly',
      lastGenerated: '2024-01-12',
      size: '3.7 MB',
    },
    {
      id: '3',
      name: getText('financialSummaryReport', 'Financial Summary Report'),
      description: getText('financialSummaryDesc', 'Revenue, expenses, and financial health overview'),
      category: 'financial',
      icon: 'wallet-outline',
      color: '#F59E0B',
      frequency: 'monthly',
      lastGenerated: '2024-01-10',
      size: '1.8 MB',
    },
    {
      id: '4',
      name: getText('platformMetricsReport', 'Platform Metrics Report'),
      description: getText('platformMetricsDesc', 'System performance, uptime, and technical metrics'),
      category: 'performance',
      icon: 'analytics-outline',
      color: '#8B5CF6',
      frequency: 'daily',
      lastGenerated: '2024-01-15',
      size: '890 KB',
    },
    {
      id: '5',
      name: getText('engineerVerificationReport', 'Engineer Verification Report'),
      description: getText('engineerVerificationDesc', 'Status and progress of professional credential verifications'),
      category: 'users',
      icon: 'shield-checkmark-outline',
      color: '#10B981',
      frequency: 'weekly',
      lastGenerated: '2024-01-13',
      size: '1.2 MB',
    },
    {
      id: '6',
      name: getText('revenueAnalysisReport', 'Revenue Analysis Report'),
      description: getText('revenueAnalysisDesc', 'Detailed breakdown of revenue streams and growth trends'),
      category: 'financial',
      icon: 'trending-up-outline',
      color: '#EF4444',
      frequency: 'quarterly',
      lastGenerated: '2024-01-01',
      size: '4.1 MB',
    },
  ];

  const reportHistory: ReportHistory[] = [
    {
      id: '1',
      name: 'User Activity Report - Weekly',
      type: 'Users',
      generatedDate: '2024-01-14 15:30',
      size: '2.4 MB',
      status: 'completed',
      downloadUrl: '/reports/user-activity-2024-01-14.pdf',
    },
    {
      id: '2',
      name: 'Platform Metrics Report - Daily',
      type: 'Performance',
      generatedDate: '2024-01-15 09:00',
      size: '890 KB',
      status: 'completed',
      downloadUrl: '/reports/platform-metrics-2024-01-15.pdf',
    },
    {
      id: '3',
      name: 'Financial Summary Report - Monthly',
      type: 'Financial',
      generatedDate: '2024-01-12 14:20',
      size: '3.2 MB',
      status: 'processing',
    },
    {
      id: '4',
      name: 'Project Performance Report - Custom',
      type: 'Projects',
      generatedDate: '2024-01-11 11:45',
      size: '1.7 MB',
      status: 'failed',
    },
  ];

  const getFilteredTemplates = () => {
    let filtered = reportTemplates;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(template => template.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const handleGenerateReport = (template: ReportTemplate) => {
    Alert.alert(
      getText('generateReport', 'Generate Report'),
      getText('generateReportConfirm', `Generate ${template.name}? This may take a few minutes.`),
      [
        { text: getText('cancel', 'Cancel'), style: 'cancel' },
        {
          text: getText('generate', 'Generate'),
          onPress: () => {
            Alert.alert(
              getText('reportGenerating', 'Report Generating'),
              getText('reportGeneratingMessage', 'Your report is being generated. You\'ll be notified when it\'s ready.')
            );
          }
        }
      ]
    );
  };

  const handleDownloadReport = (report: ReportHistory) => {
    if (report.status === 'completed' && report.downloadUrl) {
      Alert.alert(
        getText('downloadReport', 'Download Report'),
        getText('downloadReportMessage', 'Your report download will begin shortly.')
      );
    } else {
      Alert.alert(
        getText('reportNotReady', 'Report Not Ready'),
        getText('reportNotReadyMessage', 'This report is not available for download.')
      );
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'processing': return '#F59E0B';
      case 'failed': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'daily': return '#EF4444';
      case 'weekly': return '#F59E0B';
      case 'monthly': return '#10B981';
      case 'quarterly': return '#6366F1';
      default: return '#6B7280';
    }
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
    tabsContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 16,
      gap: 8,
    },
    tab: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: isDarkMode ? '#374151' : '#E5E7EB',
      borderRadius: 12,
      alignItems: 'center',
    },
    activeTab: {
      backgroundColor: '#6366F1',
    },
    tabText: {
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
    },
    activeTabText: {
      color: '#FFFFFF',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#374151' : '#F3F4F6',
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginHorizontal: 20,
      marginBottom: 16,
    },
    searchIcon: {
      marginRight: language === 'ar' ? 0 : 12,
      marginLeft: language === 'ar' ? 12 : 0,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: isDarkMode ? '#FFFFFF' : '#111827',
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    categoryFilters: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginBottom: 20,
      gap: 8,
    },
    categoryFilter: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      backgroundColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    activeCategoryFilter: {
      backgroundColor: '#6366F1',
    },
    categoryFilterText: {
      fontSize: 12,
      fontWeight: '600',
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
    },
    activeCategoryFilterText: {
      color: '#FFFFFF',
    },
    templatesList: {
      paddingHorizontal: 20,
    },
    templateCard: {
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    templateHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    templateIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: language === 'ar' ? 0 : 12,
      marginLeft: language === 'ar' ? 12 : 0,
    },
    templateInfo: {
      flex: 1,
    },
    templateName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 4,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    templateDescription: {
      fontSize: 14,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    templateBadges: {
      flexDirection: 'row',
      gap: 8,
    },
    badge: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 12,
    },
    badgeText: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    templateMeta: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 12,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    metaItem: {
      alignItems: 'center',
    },
    metaLabel: {
      fontSize: 12,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      marginBottom: 2,
    },
    metaValue: {
      fontSize: 12,
      fontWeight: '600',
      color: isDarkMode ? '#FFFFFF' : '#111827',
    },
    templateActions: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 12,
    },
    templateActionButton: {
      flex: 1,
    },
    historyList: {
      paddingHorizontal: 20,
    },
    historyCard: {
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderRadius: 12,
      padding: 16,
      marginBottom: 8,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    historyInfo: {
      flex: 1,
    },
    historyName: {
      fontSize: 14,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 4,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    historyMeta: {
      fontSize: 12,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      marginBottom: 2,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    historyActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    statusBadge: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 12,
    },
    historyButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: isDarkMode ? '#374151' : '#F3F4F6',
      justifyContent: 'center',
      alignItems: 'center',
    },
    customReportSection: {
      paddingHorizontal: 20,
    },
    customReportCard: {
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderRadius: 16,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    customReportTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 16,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    formGroup: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? '#D1D5DB' : '#374151',
      marginBottom: 8,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    textInput: {
      backgroundColor: isDarkMode ? '#374151' : '#F9FAFB',
      borderWidth: 1,
      borderColor: isDarkMode ? '#4B5563' : '#D1D5DB',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
      color: isDarkMode ? '#FFFFFF' : '#111827',
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    optionsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    optionButton: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      backgroundColor: isDarkMode ? '#374151' : '#E5E7EB',
      borderWidth: 1,
      borderColor: 'transparent',
    },
    selectedOption: {
      backgroundColor: '#6366F1',
      borderColor: '#6366F1',
    },
    optionText: {
      fontSize: 14,
      color: isDarkMode ? '#D1D5DB' : '#4B5563',
    },
    selectedOptionText: {
      color: '#FFFFFF',
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 60,
    },
    emptyStateIcon: {
      marginBottom: 16,
    },
    emptyStateTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 8,
      textAlign: 'center',
    },
    emptyStateDescription: {
      fontSize: 14,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: 'center',
      lineHeight: 20,
    },
  });

  const renderTemplatesTab = () => (
    <View>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={isDarkMode ? '#9CA3AF' : '#6B7280'}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder={getText('searchReports', 'Search report templates...')}
          placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.categoryFilters}>
        {['all', 'users', 'projects', 'financial', 'performance'].map((category) => (
          <Pressable
            key={category}
            style={[
              styles.categoryFilter,
              selectedCategory === category && styles.activeCategoryFilter
            ]}
            onPress={() => setSelectedCategory(category as any)}
          >
            <Text style={[
              styles.categoryFilterText,
              selectedCategory === category && styles.activeCategoryFilterText
            ]}>
              {getText(category, category)}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.templatesList}>
        {getFilteredTemplates().map((template, index) => (
          <Animated.View
            key={template.id}
            entering={SlideInUp.delay(index * 50)}
            style={styles.templateCard}
          >
            <View style={styles.templateHeader}>
              <View style={[styles.templateIcon, { backgroundColor: template.color + '20' }]}>
                <Ionicons
                  name={template.icon as any}
                  size={20}
                  color={template.color}
                />
              </View>
              <View style={styles.templateInfo}>
                <Text style={styles.templateName}>{template.name}</Text>
                <Text style={styles.templateDescription}>{template.description}</Text>
              </View>
              <View style={styles.templateBadges}>
                <View style={[styles.badge, { backgroundColor: getFrequencyColor(template.frequency) }]}>
                  <Text style={styles.badgeText}>{getText(template.frequency, template.frequency)}</Text>
                </View>
              </View>
            </View>

            <View style={styles.templateMeta}>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>{getText('lastGenerated', 'Last Generated')}</Text>
                <Text style={styles.metaValue}>{template.lastGenerated}</Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>{getText('size', 'Size')}</Text>
                <Text style={styles.metaValue}>{template.size}</Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>{getText('category', 'Category')}</Text>
                <Text style={styles.metaValue}>{getText(template.category, template.category)}</Text>
              </View>
            </View>

            <View style={styles.templateActions}>
              <View style={styles.templateActionButton}>
                <CustomButton
                  title={getText('generate', 'Generate')}
                  onPress={() => handleGenerateReport(template)}
                  variant="primary"
                  fullWidth
                />
              </View>
              <View style={styles.templateActionButton}>
                <CustomButton
                  title={getText('schedule', 'Schedule')}
                  onPress={() => navigation.navigate('ScheduleReport', { templateId: template.id })}
                  variant="secondary"
                  fullWidth
                />
              </View>
            </View>
          </Animated.View>
        ))}

        {getFilteredTemplates().length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons
              name="document-outline"
              size={64}
              color={isDarkMode ? '#4B5563' : '#D1D5DB'}
              style={styles.emptyStateIcon}
            />
            <Text style={styles.emptyStateTitle}>
              {getText('noReportsFound', 'No Reports Found')}
            </Text>
            <Text style={styles.emptyStateDescription}>
              {searchQuery
                ? getText('tryDifferentSearch', 'Try adjusting your search criteria')
                : getText('noReportsDesc', 'No report templates match the selected filters')
              }
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderHistoryTab = () => (
    <View style={styles.historyList}>
      {reportHistory.map((report, index) => (
        <Animated.View
          key={report.id}
          entering={SlideInUp.delay(index * 50)}
          style={styles.historyCard}
        >
          <View style={styles.historyInfo}>
            <Text style={styles.historyName}>{report.name}</Text>
            <Text style={styles.historyMeta}>{report.generatedDate} • {report.size}</Text>
            <Text style={styles.historyMeta}>{getText('type', 'Type')}: {report.type}</Text>
          </View>
          <View style={styles.historyActions}>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(report.status) }]}>
              <Text style={styles.badgeText}>{getText(report.status, report.status)}</Text>
            </View>
            {report.status === 'completed' && (
              <Pressable
                style={styles.historyButton}
                onPress={() => handleDownloadReport(report)}
              >
                <Ionicons
                  name="download-outline"
                  size={16}
                  color={isDarkMode ? '#9CA3AF' : '#6B7280'}
                />
              </Pressable>
            )}
          </View>
        </Animated.View>
      ))}
    </View>
  );

  const renderCustomTab = () => (
    <View style={styles.customReportSection}>
      <View style={styles.customReportCard}>
        <Text style={styles.customReportTitle}>
          {getText('createCustomReport', 'Create Custom Report')}
        </Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>{getText('reportName', 'Report Name')}</Text>
          <TextInput
            style={styles.textInput}
            placeholder={getText('enterReportName', 'Enter report name')}
            placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>{getText('dataSource', 'Data Source')}</Text>
          <View style={styles.optionsGrid}>
            {['Users', 'Projects', 'Financial', 'Performance'].map((source) => (
              <Pressable key={source} style={styles.optionButton}>
                <Text style={styles.optionText}>{source}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>{getText('timeRange', 'Time Range')}</Text>
          <View style={styles.optionsGrid}>
            {['7 Days', '30 Days', '3 Months', '1 Year'].map((range) => (
              <Pressable key={range} style={styles.optionButton}>
                <Text style={styles.optionText}>{range}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <CustomButton
          title={getText('generateCustomReport', 'Generate Custom Report')}
          onPress={() => Alert.alert(getText('customReportGenerated', 'Custom Report Generated'))}
          variant="primary"
          fullWidth
        />
      </View>
    </View>
  );

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
            {getText('reports', 'Reports')}
          </Text>
        </View>
        <View style={styles.headerActions}>
          <Pressable style={styles.headerButton} onPress={() => navigation.navigate('ScheduledReports')}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color={isDarkMode ? '#9CA3AF' : '#6B7280'}
            />
          </Pressable>
          <Pressable style={styles.headerButton} onPress={() => navigation.navigate('ExportSettings')}>
            <Ionicons
              name="settings-outline"
              size={20}
              color={isDarkMode ? '#9CA3AF' : '#6B7280'}
            />
          </Pressable>
        </View>
      </Animated.View>

      <View style={styles.content}>
        <View style={styles.tabsContainer}>
          <Pressable
            style={[styles.tab, activeTab === 'templates' && styles.activeTab]}
            onPress={() => setActiveTab('templates')}
          >
            <Text style={[styles.tabText, activeTab === 'templates' && styles.activeTabText]}>
              {getText('templates', 'Templates')}
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === 'history' && styles.activeTab]}
            onPress={() => setActiveTab('history')}
          >
            <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
              {getText('history', 'History')}
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === 'custom' && styles.activeTab]}
            onPress={() => setActiveTab('custom')}
          >
            <Text style={[styles.tabText, activeTab === 'custom' && styles.activeTabText]}>
              {getText('custom', 'Custom')}
            </Text>
          </Pressable>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {activeTab === 'templates' && renderTemplatesTab()}
          {activeTab === 'history' && renderHistoryTab()}
          {activeTab === 'custom' && renderCustomTab()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ReportsScreen;
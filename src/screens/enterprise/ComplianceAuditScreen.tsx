import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ComplianceAuditScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const complianceData = {
    overallScore: 85,
    totalRequirements: 150,
    completedRequirements: 128,
    pendingRequirements: 22,
    criticalIssues: 3,
    warnings: 8,
  };

  const auditCategories = [
    {
      id: '1',
      name: 'Safety Standards',
      score: 92,
      requirements: 25,
      completed: 23,
      status: 'Compliant',
      lastAudit: '2024-01-15',
    },
    {
      id: '2',
      name: 'Environmental Regulations',
      score: 78,
      requirements: 30,
      completed: 24,
      status: 'At Risk',
      lastAudit: '2024-01-10',
    },
    {
      id: '3',
      name: 'Quality Management',
      score: 88,
      requirements: 35,
      completed: 31,
      status: 'Compliant',
      lastAudit: '2024-01-20',
    },
    {
      id: '4',
      name: 'Financial Compliance',
      score: 95,
      requirements: 20,
      completed: 19,
      status: 'Compliant',
      lastAudit: '2024-01-25',
    },
    {
      id: '5',
      name: 'Data Protection',
      score: 82,
      requirements: 25,
      completed: 21,
      status: 'Compliant',
      lastAudit: '2024-01-18',
    },
    {
      id: '6',
      name: 'Labor Standards',
      score: 75,
      requirements: 15,
      completed: 10,
      status: 'Non-Compliant',
      lastAudit: '2024-01-12',
    },
  ];

  const auditHistory = [
    {
      id: '1',
      date: '2024-01-25',
      type: 'Financial Compliance',
      auditor: 'Saudi Audit Bureau',
      score: 95,
      status: 'Passed',
      findings: 2,
    },
    {
      id: '2',
      date: '2024-01-20',
      type: 'Quality Management',
      auditor: 'Internal Audit Team',
      score: 88,
      status: 'Passed',
      findings: 5,
    },
    {
      id: '3',
      date: '2024-01-15',
      type: 'Safety Standards',
      auditor: 'Ministry of Labor',
      score: 92,
      status: 'Passed',
      findings: 1,
    },
    {
      id: '4',
      date: '2024-01-10',
      type: 'Environmental Regulations',
      auditor: 'Environmental Authority',
      score: 78,
      status: 'Failed',
      findings: 8,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Compliant': return '#28a745';
      case 'At Risk': return '#ffc107';
      case 'Non-Compliant': return '#dc3545';
      case 'Passed': return '#28a745';
      case 'Failed': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#28a745';
    if (score >= 80) return '#ffc107';
    if (score >= 70) return '#ff9800';
    return '#dc3545';
  };

  const TabButton = ({ tab, label }: { tab: string; label: string }) => (
    <TouchableOpacity
      style={[
        styles.tabButton,
        selectedTab === tab && styles.tabButtonActive
      ]}
      onPress={() => setSelectedTab(tab)}
    >
      <Text style={[
        styles.tabButtonText,
        selectedTab === tab && styles.tabButtonTextActive
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const CategoryCard = ({ category }: { category: any }) => (
    <View style={styles.categoryCard}>
      <View style={styles.categoryHeader}>
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryName}>{category.name}</Text>
          <Text style={styles.categoryRequirements}>
            {category.completed}/{category.requirements} requirements
          </Text>
        </View>
        <View style={styles.categoryScore}>
          <Text style={[styles.scoreValue, { color: getScoreColor(category.score) }]}>
            {category.score}%
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(category.status) }]}>
            <Text style={styles.statusText}>{category.status}</Text>
          </View>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${category.score}%`,
                backgroundColor: getScoreColor(category.score)
              }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {category.completed} of {category.requirements} completed
        </Text>
      </View>

      <View style={styles.categoryDetails}>
        <Text style={styles.lastAudit}>Last Audit: {category.lastAudit}</Text>
        <TouchableOpacity style={styles.viewDetailsButton}>
          <Text style={styles.viewDetailsText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const AuditItem = ({ audit }: { audit: any }) => (
    <View style={styles.auditItem}>
      <View style={styles.auditHeader}>
        <Text style={styles.auditDate}>{audit.date}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(audit.status) }]}>
          <Text style={styles.statusText}>{audit.status}</Text>
        </View>
      </View>
      <Text style={styles.auditType}>{audit.type}</Text>
      <Text style={styles.auditor}>Auditor: {audit.auditor}</Text>
      <View style={styles.auditStats}>
        <Text style={styles.auditScore}>Score: {audit.score}%</Text>
        <Text style={styles.auditFindings}>Findings: {audit.findings}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Compliance Audit</Text>
      <Text style={styles.subtitle}>
        Track regulatory compliance across all projects
      </Text>

      <View style={styles.tabContainer}>
        <TabButton tab="overview" label="Overview" />
        <TabButton tab="categories" label="Categories" />
        <TabButton tab="history" label="Audit History" />
      </View>

      {selectedTab === 'overview' && (
        <View>
          <View style={styles.overviewCard}>
            <Text style={styles.cardTitle}>Compliance Overview</Text>
            <View style={styles.overviewStats}>
              <View style={styles.overviewStat}>
                <Text style={styles.statValue}>{complianceData.overallScore}%</Text>
                <Text style={styles.statLabel}>Overall Score</Text>
              </View>
              <View style={styles.overviewStat}>
                <Text style={styles.statValue}>{complianceData.completedRequirements}</Text>
                <Text style={styles.statLabel}>Completed</Text>
              </View>
              <View style={styles.overviewStat}>
                <Text style={styles.statValue}>{complianceData.pendingRequirements}</Text>
                <Text style={styles.statLabel}>Pending</Text>
              </View>
              <View style={styles.overviewStat}>
                <Text style={styles.statValue}>{complianceData.criticalIssues}</Text>
                <Text style={styles.statLabel}>Critical Issues</Text>
              </View>
            </View>
          </View>

          <View style={styles.issuesCard}>
            <Text style={styles.cardTitle}>Critical Issues</Text>
            <View style={styles.issueItem}>
              <Ionicons name="warning" size={20} color="#dc3545" />
              <Text style={styles.issueText}>
                Environmental compliance gap in Project Alpha
              </Text>
            </View>
            <View style={styles.issueItem}>
              <Ionicons name="warning" size={20} color="#dc3545" />
              <Text style={styles.issueText}>
                Safety documentation incomplete for Site B
              </Text>
            </View>
            <View style={styles.issueItem}>
              <Ionicons name="warning" size={20} color="#dc3545" />
              <Text style={styles.issueText}>
                Labor standards violation in Department C
              </Text>
            </View>
          </View>
        </View>
      )}

      {selectedTab === 'categories' && (
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Compliance Categories</Text>
          {auditCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </View>
      )}

      {selectedTab === 'history' && (
        <View style={styles.historyContainer}>
          <Text style={styles.sectionTitle}>Audit History</Text>
          {auditHistory.map((audit) => (
            <AuditItem key={audit.id} audit={audit} />
          ))}
        </View>
      )}

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="document-text" size={24} color="#007bff" />
            <Text style={styles.actionText}>Generate Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="calendar" size={24} color="#28a745" />
            <Text style={styles.actionText}>Schedule Audit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="warning" size={24} color="#ffc107" />
            <Text style={styles.actionText}>View Issues</Text>
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
          Compliance tracking ensures adherence to Saudi regulations and international standards. 
          Regular audits help maintain certification and avoid penalties.
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  tabButtonActive: {
    backgroundColor: '#007bff',
  },
  tabButtonText: {
    color: '#cccccc',
    fontSize: 14,
    fontWeight: '500',
  },
  tabButtonTextActive: {
    color: '#ffffff',
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
  overviewStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  overviewStat: {
    width: '48%',
    marginBottom: 15,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#cccccc',
    textAlign: 'center',
  },
  issuesCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  issueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  issueText: {
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 10,
    flex: 1,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  categoryCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  categoryRequirements: {
    fontSize: 14,
    color: '#cccccc',
  },
  categoryScore: {
    alignItems: 'flex-end',
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#3a3a3a',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#cccccc',
    textAlign: 'center',
  },
  categoryDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastAudit: {
    fontSize: 14,
    color: '#cccccc',
  },
  viewDetailsButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  viewDetailsText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  historyContainer: {
    marginBottom: 20,
  },
  auditItem: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  auditHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  auditDate: {
    fontSize: 14,
    color: '#cccccc',
  },
  auditType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  auditor: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 8,
  },
  auditStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  auditScore: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  auditFindings: {
    fontSize: 14,
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

export default ComplianceAuditScreen;

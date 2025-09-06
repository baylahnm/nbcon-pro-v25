import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AIDocumentAnalysisScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('analysis');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const tabs = [
    { id: 'analysis', name: 'Analysis', icon: 'analytics' },
    { id: 'documents', name: 'Documents', icon: 'document' },
    { id: 'compliance', name: 'Compliance', icon: 'checkmark-circle' },
    { id: 'reports', name: 'Reports', icon: 'bar-chart' },
  ];

  const statuses = [
    { id: 'all', name: 'All' },
    { id: 'compliant', name: 'Compliant' },
    { id: 'non-compliant', name: 'Non-Compliant' },
    { id: 'pending', name: 'Pending' },
  ];

  const documents = [
    {
      id: '1',
      name: 'Riyadh Metro Station - Structural Drawings',
      type: 'CAD Drawing',
      status: 'Compliant',
      uploadedAt: '2024-01-25 14:30:15',
      analyzedAt: '2024-01-25 14:32:45',
      size: '2.4 MB',
      pages: 15,
      complianceScore: 95,
      issues: 2,
      criticalIssues: 0,
    },
    {
      id: '2',
      name: 'NEOM Smart City - MEP Specifications',
      type: 'PDF Document',
      status: 'Non-Compliant',
      uploadedAt: '2024-01-24 10:15:30',
      analyzedAt: '2024-01-24 10:18:22',
      size: '5.7 MB',
      pages: 32,
      complianceScore: 67,
      issues: 8,
      criticalIssues: 2,
    },
    {
      id: '3',
      name: 'Jeddah Port - Safety Protocols',
      type: 'Word Document',
      status: 'Pending',
      uploadedAt: '2024-01-25 12:20:10',
      analyzedAt: null,
      size: '1.2 MB',
      pages: 8,
      complianceScore: null,
      issues: null,
      criticalIssues: null,
    },
    {
      id: '4',
      name: 'Solar Farm - Environmental Impact Assessment',
      type: 'PDF Document',
      status: 'Compliant',
      uploadedAt: '2024-01-23 16:45:33',
      analyzedAt: '2024-01-23 16:48:15',
      size: '3.8 MB',
      pages: 24,
      complianceScore: 88,
      issues: 3,
      criticalIssues: 0,
    },
  ];

  const analysisResults = [
    {
      id: '1',
      documentId: '1',
      category: 'Structural Compliance',
      score: 95,
      status: 'Compliant',
      issues: [
        {
          id: '1',
          description: 'Minor dimension inconsistency in Section A',
          severity: 'Low',
          location: 'Page 5, Line 12',
          suggestion: 'Verify dimensions with original specifications',
        },
        {
          id: '2',
          description: 'Missing revision date on drawing title block',
          severity: 'Low',
          location: 'Page 1, Title Block',
          suggestion: 'Add current revision date',
        },
      ],
    },
    {
      id: '2',
      documentId: '2',
      category: 'MEP Standards',
      score: 67,
      status: 'Non-Compliant',
      issues: [
        {
          id: '1',
          description: 'Electrical load calculations exceed capacity',
          severity: 'Critical',
          location: 'Page 15, Table 3',
          suggestion: 'Recalculate electrical loads and update specifications',
        },
        {
          id: '2',
          description: 'Missing fire safety requirements',
          severity: 'High',
          location: 'Page 8, Section 2.1',
          suggestion: 'Add fire safety compliance section',
        },
        {
          id: '3',
          description: 'Inconsistent pipe sizing standards',
          severity: 'Medium',
          location: 'Page 22, Diagram 4',
          suggestion: 'Standardize pipe sizing according to local codes',
        },
      ],
    },
  ];

  const complianceStandards = [
    {
      id: '1',
      name: 'Saudi Building Code (SBC)',
      version: '2018',
      compliance: 92,
      documents: 15,
      lastUpdated: '2024-01-25',
    },
    {
      id: '2',
      name: 'International Building Code (IBC)',
      version: '2021',
      compliance: 88,
      documents: 12,
      lastUpdated: '2024-01-24',
    },
    {
      id: '3',
      name: 'ASHRAE Standards',
      version: '2022',
      compliance: 85,
      documents: 8,
      lastUpdated: '2024-01-23',
    },
    {
      id: '4',
      name: 'NFPA Fire Safety',
      version: '2023',
      compliance: 78,
      documents: 6,
      lastUpdated: '2024-01-22',
    },
  ];

  const reports = [
    {
      id: '1',
      name: 'Monthly Compliance Report',
      period: 'January 2024',
      generatedAt: '2024-01-25 16:30:15',
      totalDocuments: 45,
      compliantDocuments: 38,
      nonCompliantDocuments: 7,
      averageScore: 87,
      criticalIssues: 12,
    },
    {
      id: '2',
      name: 'Project Quality Assessment',
      period: 'Riyadh Metro Station',
      generatedAt: '2024-01-24 14:20:30',
      totalDocuments: 23,
      compliantDocuments: 20,
      nonCompliantDocuments: 3,
      averageScore: 91,
      criticalIssues: 2,
    },
    {
      id: '3',
      name: 'Standards Compliance Overview',
      period: 'Q4 2023',
      generatedAt: '2024-01-20 10:15:45',
      totalDocuments: 156,
      compliantDocuments: 134,
      nonCompliantDocuments: 22,
      averageScore: 89,
      criticalIssues: 18,
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

  const StatusButton = ({ status }: { status: any }) => (
    <TouchableOpacity
      style={[
        styles.statusButton,
        selectedStatus === status.id && styles.statusButtonSelected
      ]}
      onPress={() => setSelectedStatus(status.id)}
    >
      <Text style={[
        styles.statusButtonText,
        selectedStatus === status.id && styles.statusButtonTextSelected
      ]}>
        {status.name}
      </Text>
    </TouchableOpacity>
  );

  const DocumentItem = ({ document }: { document: any }) => (
    <View style={styles.documentItem}>
      <View style={styles.documentHeader}>
        <View style={styles.documentInfo}>
          <Text style={styles.documentName}>{document.name}</Text>
          <Text style={styles.documentType}>{document.type}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: document.status === 'Compliant' ? '#28a745' : 
                           document.status === 'Non-Compliant' ? '#dc3545' : '#ffc107'
          }
        ]}>
          <Text style={styles.statusText}>{document.status}</Text>
        </View>
      </View>
      
      <View style={styles.documentStats}>
        <View style={styles.documentStat}>
          <Text style={styles.documentStatValue}>{document.size}</Text>
          <Text style={styles.documentStatLabel}>Size</Text>
        </View>
        <View style={styles.documentStat}>
          <Text style={styles.documentStatValue}>{document.pages}</Text>
          <Text style={styles.documentStatLabel}>Pages</Text>
        </View>
        <View style={styles.documentStat}>
          <Text style={styles.documentStatValue}>
            {document.complianceScore ? `${document.complianceScore}%` : 'N/A'}
          </Text>
          <Text style={styles.documentStatLabel}>Score</Text>
        </View>
        <View style={styles.documentStat}>
          <Text style={styles.documentStatValue}>
            {document.issues ? document.issues : 'N/A'}
          </Text>
          <Text style={styles.documentStatLabel}>Issues</Text>
        </View>
      </View>

      <View style={styles.documentMeta}>
        <Text style={styles.documentMetaText}>
          Uploaded: {document.uploadedAt}
        </Text>
        <Text style={styles.documentMetaText}>
          Analyzed: {document.analyzedAt || 'Pending'}
        </Text>
      </View>

      {document.criticalIssues > 0 && (
        <View style={styles.criticalIssuesWarning}>
          <Ionicons name="warning" size={16} color="#dc3545" />
          <Text style={styles.criticalIssuesText}>
            {document.criticalIssues} critical issues found
          </Text>
        </View>
      )}
    </View>
  );

  const AnalysisItem = ({ analysis }: { analysis: any }) => (
    <View style={styles.analysisItem}>
      <View style={styles.analysisHeader}>
        <Text style={styles.analysisCategory}>{analysis.category}</Text>
        <View style={styles.analysisScore}>
          <Text style={styles.scoreText}>{analysis.score}%</Text>
          <View style={[
            styles.scoreBar,
            { 
              backgroundColor: analysis.score >= 90 ? '#28a745' : 
                             analysis.score >= 70 ? '#ffc107' : '#dc3545'
            }
          ]} />
        </View>
      </View>
      
      <View style={styles.issuesList}>
        {analysis.issues.map((issue: any) => (
          <View key={issue.id} style={styles.issueItem}>
            <View style={styles.issueHeader}>
              <Text style={styles.issueDescription}>{issue.description}</Text>
              <View style={[
                styles.severityBadge,
                { 
                  backgroundColor: issue.severity === 'Critical' ? '#dc3545' : 
                                 issue.severity === 'High' ? '#ffc107' : '#007bff'
                }
              ]}>
                <Text style={styles.severityText}>{issue.severity}</Text>
              </View>
            </View>
            <Text style={styles.issueLocation}>Location: {issue.location}</Text>
            <Text style={styles.issueSuggestion}>Suggestion: {issue.suggestion}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const ComplianceItem = ({ standard }: { standard: any }) => (
    <View style={styles.complianceItem}>
      <View style={styles.complianceHeader}>
        <Text style={styles.standardName}>{standard.name}</Text>
        <Text style={styles.standardVersion}>v{standard.version}</Text>
      </View>
      
      <View style={styles.complianceStats}>
        <View style={styles.complianceStat}>
          <Text style={styles.complianceStatValue}>{standard.compliance}%</Text>
          <Text style={styles.complianceStatLabel}>Compliance</Text>
        </View>
        <View style={styles.complianceStat}>
          <Text style={styles.complianceStatValue}>{standard.documents}</Text>
          <Text style={styles.complianceStatLabel}>Documents</Text>
        </View>
        <View style={styles.complianceStat}>
          <Text style={styles.complianceStatValue}>{standard.lastUpdated}</Text>
          <Text style={styles.complianceStatLabel}>Updated</Text>
        </View>
      </View>
    </View>
  );

  const ReportItem = ({ report }: { report: any }) => (
    <View style={styles.reportItem}>
      <View style={styles.reportHeader}>
        <Text style={styles.reportName}>{report.name}</Text>
        <Text style={styles.reportPeriod}>{report.period}</Text>
      </View>
      
      <View style={styles.reportStats}>
        <View style={styles.reportStat}>
          <Text style={styles.reportStatValue}>{report.totalDocuments}</Text>
          <Text style={styles.reportStatLabel}>Total Docs</Text>
        </View>
        <View style={styles.reportStat}>
          <Text style={styles.reportStatValue}>{report.compliantDocuments}</Text>
          <Text style={styles.reportStatLabel}>Compliant</Text>
        </View>
        <View style={styles.reportStat}>
          <Text style={styles.reportStatValue}>{report.nonCompliantDocuments}</Text>
          <Text style={styles.reportStatLabel}>Non-Compliant</Text>
        </View>
        <View style={styles.reportStat}>
          <Text style={styles.reportStatValue}>{report.averageScore}%</Text>
          <Text style={styles.reportStatLabel}>Avg Score</Text>
        </View>
      </View>
      
      <View style={styles.reportMeta}>
        <Text style={styles.reportGenerated}>
          Generated: {report.generatedAt}
        </Text>
        <Text style={styles.reportCritical}>
          Critical Issues: {report.criticalIssues}
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>AI Document Analysis</Text>
      <Text style={styles.subtitle}>
        AI to check compliance of documents and drawings
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

      {selectedTab === 'analysis' && (
        <View style={styles.analysisCard}>
          <Text style={styles.cardTitle}>Analysis Results</Text>
          {analysisResults.map((analysis) => (
            <AnalysisItem key={analysis.id} analysis={analysis} />
          ))}
        </View>
      )}

      {selectedTab === 'documents' && (
        <View style={styles.documentsCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Document Library</Text>
            <View style={styles.statusFilter}>
              {statuses.map((status) => (
                <StatusButton key={status.id} status={status} />
              ))}
            </View>
          </View>
          {documents.map((document) => (
            <DocumentItem key={document.id} document={document} />
          ))}
        </View>
      )}

      {selectedTab === 'compliance' && (
        <View style={styles.complianceCard}>
          <Text style={styles.cardTitle}>Compliance Standards</Text>
          {complianceStandards.map((standard) => (
            <ComplianceItem key={standard.id} standard={standard} />
          ))}
        </View>
      )}

      {selectedTab === 'reports' && (
        <View style={styles.reportsCard}>
          <Text style={styles.cardTitle}>Analysis Reports</Text>
          {reports.map((report) => (
            <ReportItem key={report.id} report={report} />
          ))}
        </View>
      )}

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="cloud-upload" size={24} color="#007bff" />
            <Text style={styles.actionText}>Upload Document</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="analytics" size={24} color="#28a745" />
            <Text style={styles.actionText}>Run Analysis</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="document-text" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Generate Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Configure AI</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          AI document analysis automatically checks engineering documents and drawings 
          for compliance with local and international standards, identifying issues and 
          providing improvement suggestions.
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
  analysisCard: {
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
  analysisItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  analysisHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  analysisCategory: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  analysisScore: {
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  scoreBar: {
    width: 60,
    height: 6,
    borderRadius: 3,
  },
  issuesList: {
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 15,
  },
  issueItem: {
    backgroundColor: '#4a4a4a',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  issueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  issueDescription: {
    fontSize: 14,
    color: '#ffffff',
    flex: 1,
    marginRight: 10,
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
  issueLocation: {
    fontSize: 12,
    color: '#007bff',
    marginBottom: 2,
  },
  issueSuggestion: {
    fontSize: 12,
    color: '#cccccc',
  },
  documentsCard: {
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
  statusFilter: {
    flexDirection: 'row',
  },
  statusButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 6,
    padding: 6,
    marginLeft: 5,
  },
  statusButtonSelected: {
    backgroundColor: '#007bff',
  },
  statusButtonText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  statusButtonTextSelected: {
    color: '#ffffff',
  },
  documentItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  documentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  documentType: {
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
  documentStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  documentStat: {
    alignItems: 'center',
  },
  documentStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 2,
  },
  documentStatLabel: {
    fontSize: 10,
    color: '#cccccc',
  },
  documentMeta: {
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  documentMetaText: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 2,
  },
  criticalIssuesWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc354520',
    borderRadius: 6,
    padding: 8,
    marginTop: 10,
  },
  criticalIssuesText: {
    color: '#dc3545',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
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
  standardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  standardVersion: {
    fontSize: 14,
    color: '#007bff',
  },
  complianceStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  complianceStat: {
    alignItems: 'center',
  },
  complianceStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 2,
  },
  complianceStatLabel: {
    fontSize: 10,
    color: '#cccccc',
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
    marginBottom: 10,
  },
  reportName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  reportPeriod: {
    fontSize: 14,
    color: '#007bff',
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
  reportMeta: {
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  reportGenerated: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 2,
  },
  reportCritical: {
    fontSize: 12,
    color: '#dc3545',
    fontWeight: 'bold',
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

export default AIDocumentAnalysisScreen;

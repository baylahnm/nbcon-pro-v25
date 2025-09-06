import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';

interface QAProject {
  id: string;
  name: string;
  description: string;
  engineer: string;
  client: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'approved';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  createdDate: string;
  lastUpdated: string;
  qaInspector?: string;
  checklist: QAChecklistItem[];
  issues: QAIssue[];
  score: number;
}

interface QAChecklistItem {
  id: string;
  category: string;
  item: string;
  description: string;
  status: 'pending' | 'passed' | 'failed' | 'not_applicable';
  notes?: string;
  required: boolean;
  weight: number;
}

interface QAIssue {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  createdDate: string;
  resolvedDate?: string;
  assignedTo?: string;
}

const QAChecklistConsole: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedPriority, setSelectedPriority] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [checklistNotes, setChecklistNotes] = useState('');

  const [qaProjects, setQaProjects] = useState<QAProject[]>([
    {
      id: '1',
      name: 'Structural Analysis - Office Building',
      description: 'QA review of structural analysis for 10-story office building',
      engineer: 'John Smith, PE',
      client: 'ABC Construction Ltd.',
      status: 'in_progress',
      priority: 'high',
      dueDate: '2024-12-20',
      createdDate: '2024-12-10T09:00:00Z',
      lastUpdated: '2024-12-15T14:30:00Z',
      qaInspector: 'Sarah Johnson',
      score: 75,
      checklist: [
        {
          id: '1',
          category: 'Design Calculations',
          item: 'Load calculations',
          description: 'Verify all load calculations are correct and properly documented',
          status: 'passed',
          notes: 'All calculations verified and correct',
          required: true,
          weight: 20
        },
        {
          id: '2',
          category: 'Design Calculations',
          item: 'Structural analysis',
          description: 'Check structural analysis methodology and results',
          status: 'passed',
          notes: 'Analysis methodology is sound',
          required: true,
          weight: 25
        },
        {
          id: '3',
          category: 'Code Compliance',
          item: 'Saudi Building Code compliance',
          description: 'Ensure compliance with Saudi Building Code requirements',
          status: 'in_progress',
          required: true,
          weight: 30
        },
        {
          id: '4',
          category: 'Drawings',
          item: 'Structural drawings',
          description: 'Review structural drawings for accuracy and completeness',
          status: 'pending',
          required: true,
          weight: 15
        },
        {
          id: '5',
          category: 'Documentation',
          item: 'Report completeness',
          description: 'Verify all required sections are included in the report',
          status: 'pending',
          required: true,
          weight: 10
        }
      ],
      issues: [
        {
          id: '1',
          title: 'Missing wind load calculations',
          description: 'Wind load calculations are not included in the analysis',
          severity: 'high',
          status: 'open',
          createdDate: '2024-12-12T10:30:00Z',
          assignedTo: 'John Smith'
        },
        {
          id: '2',
          title: 'Incomplete foundation design',
          description: 'Foundation design details are missing from the drawings',
          severity: 'medium',
          status: 'in_progress',
          createdDate: '2024-12-13T14:20:00Z',
          assignedTo: 'John Smith'
        }
      ]
    },
    {
      id: '2',
      name: 'MEP Design - Hospital Project',
      description: 'QA review of MEP design for new hospital facility',
      engineer: 'Mike Wilson, MEP',
      client: 'XYZ Healthcare',
      status: 'completed',
      priority: 'medium',
      dueDate: '2024-12-15',
      createdDate: '2024-12-05T11:00:00Z',
      lastUpdated: '2024-12-15T16:45:00Z',
      qaInspector: 'David Brown',
      score: 92,
      checklist: [
        {
          id: '1',
          category: 'Electrical Design',
          item: 'Load calculations',
          description: 'Verify electrical load calculations',
          status: 'passed',
          notes: 'All calculations verified',
          required: true,
          weight: 20
        },
        {
          id: '2',
          category: 'Mechanical Design',
          item: 'HVAC calculations',
          description: 'Check HVAC load calculations and system design',
          status: 'passed',
          notes: 'HVAC design is adequate',
          required: true,
          weight: 25
        },
        {
          id: '3',
          category: 'Plumbing Design',
          item: 'Water supply design',
          description: 'Review water supply and distribution design',
          status: 'passed',
          notes: 'Design meets requirements',
          required: true,
          weight: 20
        },
        {
          id: '4',
          category: 'Code Compliance',
          item: 'SBC compliance',
          description: 'Ensure compliance with Saudi Building Code',
          status: 'passed',
          notes: 'Fully compliant',
          required: true,
          weight: 25
        },
        {
          id: '5',
          category: 'Documentation',
          item: 'As-built drawings',
          description: 'Verify as-built drawings are complete',
          status: 'passed',
          notes: 'All drawings complete',
          required: true,
          weight: 10
        }
      ],
      issues: []
    },
    {
      id: '3',
      name: 'Survey Work - Residential Complex',
      description: 'QA review of land survey for residential development',
      engineer: 'Lisa Chen, Surveyor',
      client: 'DEF Properties',
      status: 'failed',
      priority: 'high',
      dueDate: '2024-12-18',
      createdDate: '2024-12-08T13:30:00Z',
      lastUpdated: '2024-12-14T09:15:00Z',
      qaInspector: 'Sarah Johnson',
      score: 45,
      checklist: [
        {
          id: '1',
          category: 'Survey Accuracy',
          item: 'Measurement accuracy',
          description: 'Verify survey measurements meet accuracy requirements',
          status: 'failed',
          notes: 'Measurements do not meet required accuracy',
          required: true,
          weight: 30
        },
        {
          id: '2',
          category: 'Survey Accuracy',
          item: 'Control points',
          description: 'Check control point establishment and accuracy',
          status: 'failed',
          notes: 'Control points are insufficient',
          required: true,
          weight: 25
        },
        {
          id: '3',
          category: 'Documentation',
          item: 'Survey report',
          description: 'Review survey report for completeness',
          status: 'pending',
          required: true,
          weight: 20
        },
        {
          id: '4',
          category: 'Compliance',
          item: 'Regulatory compliance',
          description: 'Ensure compliance with survey regulations',
          status: 'pending',
          required: true,
          weight: 25
        }
      ],
      issues: [
        {
          id: '1',
          title: 'Inaccurate measurements',
          description: 'Survey measurements do not meet required accuracy standards',
          severity: 'critical',
          status: 'open',
          createdDate: '2024-12-12T11:00:00Z',
          assignedTo: 'Lisa Chen'
        },
        {
          id: '2',
          title: 'Insufficient control points',
          description: 'Number of control points is inadequate for the survey area',
          severity: 'high',
          status: 'open',
          createdDate: '2024-12-13T15:30:00Z',
          assignedTo: 'Lisa Chen'
        }
      ]
    }
  ]);

  const statuses = [
    { id: 'all', name: 'All Status', color: '#6b7280' },
    { id: 'pending', name: 'Pending', color: '#d97706' },
    { id: 'in_progress', name: 'In Progress', color: '#1e3a8a' },
    { id: 'completed', name: 'Completed', color: '#059669' },
    { id: 'failed', name: 'Failed', color: '#dc2626' },
    { id: 'approved', name: 'Approved', color: '#059669' },
  ];

  const priorities = [
    { id: 'all', name: 'All Priorities', color: '#6b7280' },
    { id: 'low', name: 'Low', color: '#059669' },
    { id: 'medium', name: 'Medium', color: '#d97706' },
    { id: 'high', name: 'High', color: '#dc2626' },
    { id: 'urgent', name: 'Urgent', color: '#991b1b' },
  ];

  const handleProjectSelect = (projectId: string) => {
    setSelectedProject(projectId);
  };

  const handleStatusSelect = (statusId: string) => {
    setSelectedStatus(statusId);
  };

  const handlePrioritySelect = (priorityId: string) => {
    setSelectedPriority(priorityId);
  };

  const handleChecklistItemUpdate = (projectId: string, itemId: string, newStatus: string) => {
    setQaProjects(prev =>
      prev.map(project =>
        project.id === projectId
          ? {
              ...project,
              checklist: project.checklist.map(item =>
                item.id === itemId
                  ? { ...item, status: newStatus as any }
                  : item
              ),
              lastUpdated: new Date().toISOString()
            }
          : project
      )
    );
  };

  const handleAddIssue = (projectId: string) => {
    Alert.alert(
      'Add Issue',
      'Issue creation functionality will be implemented here.',
      [{ text: 'OK' }]
    );
  };

  const handleUpdateProjectStatus = (projectId: string, newStatus: string) => {
    setQaProjects(prev =>
      prev.map(project =>
        project.id === projectId
          ? { ...project, status: newStatus as any, lastUpdated: new Date().toISOString() }
          : project
      )
    );
    Alert.alert('Status Updated', `Project status updated to ${newStatus}.`);
  };

  const handleAddChecklistNotes = () => {
    if (!checklistNotes.trim()) {
      Alert.alert('Error', 'Please enter checklist notes.');
      return;
    }

    if (!selectedProject) {
      Alert.alert('Error', 'Please select a project first.');
      return;
    }

    Alert.alert('Notes Added', 'Checklist notes have been added successfully.');
    setChecklistNotes('');
  };

  const getStatusColor = (status: string) => {
    const statusObj = statuses.find(s => s.id === status);
    return statusObj?.color || '#6b7280';
  };

  const getPriorityColor = (priority: string) => {
    const priorityObj = priorities.find(p => p.id === priority);
    return priorityObj?.color || '#6b7280';
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#059669';
    if (score >= 70) return '#d97706';
    if (score >= 50) return '#dc2626';
    return '#991b1b';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return '#059669';
      case 'medium': return '#d97706';
      case 'high': return '#dc2626';
      case 'critical': return '#991b1b';
      default: return '#6b7280';
    }
  };

  const filteredProjects = qaProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || selectedStatus === 'all' || project.status === selectedStatus;
    const matchesPriority = !selectedPriority || selectedPriority === 'all' || project.priority === selectedPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const selectedProjectData = qaProjects.find(p => p.id === selectedProject);

  const renderProject = (project: QAProject) => (
    <TouchableOpacity
      key={project.id}
      style={[
        styles.projectCard,
        selectedProject === project.id && styles.selectedProjectCard
      ]}
      onPress={() => handleProjectSelect(project.id)}
    >
      <View style={styles.projectHeader}>
        <View style={styles.projectInfo}>
          <Text style={styles.projectName}>{project.name}</Text>
          <Text style={styles.projectDescription}>{project.description}</Text>
        </View>
        <View style={styles.projectBadges}>
          <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(project.priority) }]}>
            <Text style={styles.priorityText}>{project.priority.toUpperCase()}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(project.status) }]}>
            <Text style={styles.statusText}>{project.status.toUpperCase()}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.projectDetails}>
        <Text style={styles.projectDetail}>Engineer: {project.engineer}</Text>
        <Text style={styles.projectDetail}>Client: {project.client}</Text>
        <Text style={styles.projectDetail}>Due: {new Date(project.dueDate).toLocaleDateString()}</Text>
        {project.qaInspector && (
          <Text style={styles.projectDetail}>Inspector: {project.qaInspector}</Text>
        )}
      </View>
      
      <View style={styles.projectScore}>
        <Text style={styles.scoreLabel}>QA Score:</Text>
        <Text style={[styles.scoreValue, { color: getScoreColor(project.score) }]}>
          {project.score}%
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderStatus = (status: any) => (
    <TouchableOpacity
      key={status.id}
      style={[
        styles.statusCard,
        selectedStatus === status.id && styles.selectedStatusCard
      ]}
      onPress={() => handleStatusSelect(status.id)}
    >
      <View style={[styles.statusIndicator, { backgroundColor: status.color }]} />
      <Text style={styles.statusName}>{status.name}</Text>
    </TouchableOpacity>
  );

  const renderPriority = (priority: any) => (
    <TouchableOpacity
      key={priority.id}
      style={[
        styles.priorityCard,
        selectedPriority === priority.id && styles.selectedPriorityCard
      ]}
      onPress={() => handlePrioritySelect(priority.id)}
    >
      <View style={[styles.priorityIndicator, { backgroundColor: priority.color }]} />
      <Text style={styles.priorityName}>{priority.name}</Text>
    </TouchableOpacity>
  );

  const renderChecklistItem = (item: QAChecklistItem) => (
    <View key={item.id} style={styles.checklistItemCard}>
      <View style={styles.checklistItemHeader}>
        <Text style={styles.checklistItemTitle}>{item.item}</Text>
        <View style={styles.checklistItemActions}>
          <TouchableOpacity
            style={[styles.statusButton, { backgroundColor: '#059669' }]}
            onPress={() => handleChecklistItemUpdate(selectedProject, item.id, 'passed')}
          >
            <Text style={styles.statusButtonText}>Pass</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.statusButton, { backgroundColor: '#dc2626' }]}
            onPress={() => handleChecklistItemUpdate(selectedProject, item.id, 'failed')}
          >
            <Text style={styles.statusButtonText}>Fail</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.statusButton, { backgroundColor: '#6b7280' }]}
            onPress={() => handleChecklistItemUpdate(selectedProject, item.id, 'not_applicable')}
          >
            <Text style={styles.statusButtonText}>N/A</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <Text style={styles.checklistItemDescription}>{item.description}</Text>
      
      <View style={styles.checklistItemDetails}>
        <Text style={styles.checklistItemDetail}>Category: {item.category}</Text>
        <Text style={styles.checklistItemDetail}>Weight: {item.weight}%</Text>
        <Text style={styles.checklistItemDetail}>
          Status: <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status.toUpperCase()}
          </Text>
        </Text>
      </View>
      
      {item.notes && (
        <Text style={styles.checklistItemNotes}>Notes: {item.notes}</Text>
      )}
    </View>
  );

  const renderIssue = (issue: QAIssue) => (
    <View key={issue.id} style={styles.issueCard}>
      <View style={styles.issueHeader}>
        <Text style={styles.issueTitle}>{issue.title}</Text>
        <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(issue.severity) }]}>
          <Text style={styles.severityText}>{issue.severity.toUpperCase()}</Text>
        </View>
      </View>
      
      <Text style={styles.issueDescription}>{issue.description}</Text>
      
      <View style={styles.issueDetails}>
        <Text style={styles.issueDetail}>Status: {issue.status}</Text>
        <Text style={styles.issueDetail}>
          Created: {new Date(issue.createdDate).toLocaleDateString()}
        </Text>
        {issue.assignedTo && (
          <Text style={styles.issueDetail}>Assigned to: {issue.assignedTo}</Text>
        )}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>QA Checklist Console</Text>
        <Text style={styles.headerSubtitle}>
          Manage quality assurance reviews and project checklists
        </Text>
      </View>

      {/* Filters */}
      <View style={styles.filtersSection}>
        <Text style={styles.sectionTitle}>Filters</Text>
        
        <View style={styles.searchSection}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search projects..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
        </View>
        
        <View style={styles.statusesSection}>
          <Text style={styles.filterTitle}>Status</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {statuses.map(renderStatus)}
          </ScrollView>
        </View>
        
        <View style={styles.prioritiesSection}>
          <Text style={styles.filterTitle}>Priority</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {priorities.map(renderPriority)}
          </ScrollView>
        </View>
      </View>

      {/* Projects List */}
      <View style={styles.projectsSection}>
        <Text style={styles.sectionTitle}>QA Projects ({filteredProjects.length})</Text>
        
        {filteredProjects.map(renderProject)}
      </View>

      {/* Project Details */}
      {selectedProjectData && (
        <View style={styles.projectDetailsSection}>
          <Text style={styles.sectionTitle}>Project Details</Text>
          
          <View style={styles.projectDetailsCard}>
            <View style={styles.projectDetailsHeader}>
              <Text style={styles.projectDetailsTitle}>{selectedProjectData.name}</Text>
              <View style={styles.projectDetailsBadges}>
                <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(selectedProjectData.priority) }]}>
                  <Text style={styles.priorityText}>{selectedProjectData.priority.toUpperCase()}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(selectedProjectData.status) }]}>
                  <Text style={styles.statusText}>{selectedProjectData.status.toUpperCase()}</Text>
                </View>
              </View>
            </View>
            
            <Text style={styles.projectDetailsDescription}>{selectedProjectData.description}</Text>
            
            <View style={styles.projectDetailsInfo}>
              <Text style={styles.projectDetailsInfoItem}>Engineer: {selectedProjectData.engineer}</Text>
              <Text style={styles.projectDetailsInfoItem}>Client: {selectedProjectData.client}</Text>
              <Text style={styles.projectDetailsInfoItem}>Due: {new Date(selectedProjectData.dueDate).toLocaleDateString()}</Text>
              {selectedProjectData.qaInspector && (
                <Text style={styles.projectDetailsInfoItem}>Inspector: {selectedProjectData.qaInspector}</Text>
              )}
              <Text style={styles.projectDetailsInfoItem}>
                Score: <Text style={[styles.scoreValue, { color: getScoreColor(selectedProjectData.score) }]}>
                  {selectedProjectData.score}%
                </Text>
              </Text>
            </View>
            
            <View style={styles.projectActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleUpdateProjectStatus(selectedProjectData.id, 'in_progress')}
              >
                <Text style={styles.actionButtonText}>Start Review</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleUpdateProjectStatus(selectedProjectData.id, 'completed')}
              >
                <Text style={styles.actionButtonText}>Complete</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleUpdateProjectStatus(selectedProjectData.id, 'approved')}
              >
                <Text style={styles.actionButtonText}>Approve</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Checklist */}
      {selectedProjectData && (
        <View style={styles.checklistSection}>
          <Text style={styles.sectionTitle}>QA Checklist</Text>
          
          {selectedProjectData.checklist.map(renderChecklistItem)}
        </View>
      )}

      {/* Issues */}
      {selectedProjectData && selectedProjectData.issues.length > 0 && (
        <View style={styles.issuesSection}>
          <Text style={styles.sectionTitle}>Issues</Text>
          
          {selectedProjectData.issues.map(renderIssue)}
          
          <TouchableOpacity
            style={styles.addIssueButton}
            onPress={() => handleAddIssue(selectedProjectData.id)}
          >
            <Text style={styles.addIssueButtonText}>Add Issue</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Checklist Notes */}
      {selectedProjectData && (
        <View style={styles.notesSection}>
          <Text style={styles.sectionTitle}>Checklist Notes</Text>
          
          <View style={styles.notesCard}>
            <TextInput
              style={styles.notesInput}
              placeholder="Add checklist notes..."
              value={checklistNotes}
              onChangeText={setChecklistNotes}
              multiline
              numberOfLines={4}
              placeholderTextColor="#9ca3af"
            />
            
            <TouchableOpacity
              style={styles.addNotesButton}
              onPress={handleAddChecklistNotes}
            >
              <Text style={styles.addNotesButtonText}>Add Notes</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Statistics */}
      <View style={styles.statisticsSection}>
        <Text style={styles.sectionTitle}>QA Statistics</Text>
        
        <View style={styles.statisticsGrid}>
          <View style={styles.statisticCard}>
            <Text style={styles.statisticValue}>{qaProjects.length}</Text>
            <Text style={styles.statisticLabel}>Total Projects</Text>
          </View>
          
          <View style={styles.statisticCard}>
            <Text style={styles.statisticValue}>
              {qaProjects.filter(p => p.status === 'in_progress').length}
            </Text>
            <Text style={styles.statisticLabel}>In Progress</Text>
          </View>
          
          <View style={styles.statisticCard}>
            <Text style={styles.statisticValue}>
              {qaProjects.filter(p => p.status === 'completed').length}
            </Text>
            <Text style={styles.statisticLabel}>Completed</Text>
          </View>
          
          <View style={styles.statisticCard}>
            <Text style={styles.statisticValue}>
              {Math.round(qaProjects.reduce((sum, p) => sum + p.score, 0) / qaProjects.length)}
            </Text>
            <Text style={styles.statisticLabel}>Avg Score</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#1e3a8a',
    padding: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e0e7ff',
    textAlign: 'center',
    lineHeight: 24,
  },
  filtersSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 15,
  },
  searchSection: {
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#374151',
  },
  statusesSection: {
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  statusCard: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minWidth: 80,
  },
  selectedStatusCard: {
    borderColor: '#1e3a8a',
    borderWidth: 2,
    backgroundColor: '#f0f9ff',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 5,
  },
  statusName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
  },
  prioritiesSection: {
    marginBottom: 10,
  },
  priorityCard: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minWidth: 80,
  },
  selectedPriorityCard: {
    borderColor: '#1e3a8a',
    borderWidth: 2,
    backgroundColor: '#f0f9ff',
  },
  priorityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 5,
  },
  priorityName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
  },
  projectsSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  projectCard: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  selectedProjectCard: {
    borderColor: '#1e3a8a',
    borderWidth: 2,
    backgroundColor: '#f0f9ff',
  },
  projectHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  projectInfo: {
    flex: 1,
    marginRight: 10,
  },
  projectName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  projectDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  projectBadges: {
    alignItems: 'flex-end',
  },
  priorityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  priorityText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  projectDetails: {
    marginBottom: 10,
  },
  projectDetail: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  projectScore: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scoreLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  scoreValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  projectDetailsSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  projectDetailsCard: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  projectDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  projectDetailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
    marginRight: 10,
  },
  projectDetailsBadges: {
    alignItems: 'flex-end',
  },
  projectDetailsDescription: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 15,
    lineHeight: 24,
  },
  projectDetailsInfo: {
    marginBottom: 20,
  },
  projectDetailsInfoItem: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 5,
  },
  projectActions: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  actionButton: {
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  checklistSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  checklistItemCard: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  checklistItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  checklistItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
    marginRight: 10,
  },
  checklistItemActions: {
    flexDirection: 'row',
    gap: 5,
  },
  statusButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusButtonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  checklistItemDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 10,
    lineHeight: 20,
  },
  checklistItemDetails: {
    marginBottom: 8,
  },
  checklistItemDetail: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  checklistItemNotes: {
    fontSize: 12,
    color: '#374151',
    fontStyle: 'italic',
  },
  issuesSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  issueCard: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  issueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  issueTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },
  severityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  severityText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  issueDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
    lineHeight: 20,
  },
  issueDetails: {
    gap: 4,
  },
  issueDetail: {
    fontSize: 12,
    color: '#6b7280',
  },
  addIssueButton: {
    backgroundColor: '#dc2626',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addIssueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  notesSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  notesCard: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  notesInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#374151',
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  addNotesButton: {
    backgroundColor: '#059669',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addNotesButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  statisticsSection: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
  },
  statisticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statisticCard: {
    width: '48%',
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  statisticValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 4,
  },
  statisticLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default QAChecklistConsole;

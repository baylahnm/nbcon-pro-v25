import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BIMIntegrationScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('projects');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const tabs = [
    { id: 'projects', name: 'Projects', icon: 'folder' },
    { id: 'models', name: 'Models', icon: 'cube' },
    { id: 'collaboration', name: 'Collaboration', icon: 'people' },
    { id: 'workflows', name: 'Workflows', icon: 'git-network' },
  ];

  const statuses = [
    { id: 'all', name: 'All' },
    { id: 'active', name: 'Active' },
    { id: 'completed', name: 'Completed' },
    { id: 'archived', name: 'Archived' },
  ];

  const projects = [
    {
      id: '1',
      name: 'Riyadh Metro Station - BIM Model',
      type: 'Transportation',
      status: 'Active',
      version: 'v3.2.1',
      lastUpdate: '2024-01-25 14:30:15',
      fileSize: '2.4 GB',
      elements: 156789,
      collaborators: 8,
      software: 'Revit 2024',
      compliance: 'SBC 2018',
      progress: 75,
    },
    {
      id: '2',
      name: 'NEOM Smart City - Master Plan',
      type: 'Urban Planning',
      status: 'Active',
      version: 'v2.5.3',
      lastUpdate: '2024-01-24 16:45:22',
      fileSize: '5.7 GB',
      elements: 234567,
      collaborators: 12,
      software: 'Revit 2024',
      compliance: 'IBC 2021',
      progress: 60,
    },
    {
      id: '3',
      name: 'Jeddah Port - Structural Model',
      type: 'Marine Engineering',
      status: 'Completed',
      version: 'v1.8.9',
      lastUpdate: '2024-01-20 10:15:30',
      fileSize: '1.8 GB',
      elements: 89456,
      collaborators: 6,
      software: 'AutoCAD 2024',
      compliance: 'SBC 2018',
      progress: 100,
    },
    {
      id: '4',
      name: 'Solar Farm - MEP Model',
      type: 'Renewable Energy',
      status: 'Archived',
      version: 'v1.2.4',
      lastUpdate: '2024-01-15 14:20:45',
      fileSize: '890 MB',
      elements: 45678,
      collaborators: 4,
      software: 'Revit 2023',
      compliance: 'ASHRAE 2022',
      progress: 100,
    },
  ];

  const models = [
    {
      id: '1',
      name: 'Architectural Model',
      projectId: '1',
      type: 'Architecture',
      software: 'Revit 2024',
      version: 'v3.2.1',
      status: 'Active',
      fileSize: '1.2 GB',
      elements: 78945,
      lastSync: '2024-01-25 14:30:15',
      conflicts: 0,
      issues: 2,
      quality: 95,
    },
    {
      id: '2',
      name: 'Structural Model',
      projectId: '1',
      type: 'Structure',
      software: 'Revit 2024',
      version: 'v3.2.1',
      status: 'Active',
      fileSize: '890 MB',
      elements: 45678,
      lastSync: '2024-01-25 14:25:30',
      conflicts: 1,
      issues: 0,
      quality: 98,
    },
    {
      id: '3',
      name: 'MEP Model',
      projectId: '1',
      type: 'MEP',
      software: 'Revit 2024',
      version: 'v3.2.1',
      status: 'Active',
      fileSize: '1.1 GB',
      elements: 67890,
      lastSync: '2024-01-25 14:20:15',
      conflicts: 0,
      issues: 1,
      quality: 92,
    },
    {
      id: '4',
      name: 'Site Model',
      projectId: '2',
      type: 'Site',
      software: 'Civil 3D 2024',
      version: 'v2.5.3',
      status: 'Active',
      fileSize: '2.3 GB',
      elements: 123456,
      lastSync: '2024-01-24 16:45:22',
      conflicts: 2,
      issues: 3,
      quality: 88,
    },
  ];

  const collaborationData = [
    {
      id: '1',
      user: 'Ahmed Al-Rashid',
      role: 'Lead Architect',
      project: 'Riyadh Metro Station',
      lastActivity: '2024-01-25 14:30:15',
      changes: 15,
      comments: 8,
      status: 'Online',
      software: 'Revit 2024',
    },
    {
      id: '2',
      user: 'Sarah Al-Mansouri',
      role: 'Structural Engineer',
      project: 'Riyadh Metro Station',
      lastActivity: '2024-01-25 14:25:30',
      changes: 12,
      comments: 5,
      status: 'Online',
      software: 'Revit 2024',
    },
    {
      id: '3',
      user: 'Omar Al-Zahrani',
      role: 'MEP Engineer',
      project: 'NEOM Smart City',
      lastActivity: '2024-01-24 16:45:22',
      changes: 8,
      comments: 3,
      status: 'Away',
      software: 'Revit 2024',
    },
    {
      id: '4',
      user: 'Fatima Al-Sheikh',
      role: 'Project Manager',
      project: 'Jeddah Port',
      lastActivity: '2024-01-20 10:15:30',
      changes: 5,
      comments: 12,
      status: 'Offline',
      software: 'AutoCAD 2024',
    },
  ];

  const workflows = [
    {
      id: '1',
      name: 'Design Review Workflow',
      type: 'Review Process',
      status: 'Active',
      steps: 5,
      participants: 8,
      avgDuration: '2.5 days',
      lastRun: '2024-01-25 14:30:15',
      successRate: 95,
      description: 'Automated design review process with clash detection and approval workflow',
    },
    {
      id: '2',
      name: 'Model Coordination',
      type: 'Coordination',
      status: 'Active',
      steps: 3,
      participants: 6,
      avgDuration: '1.2 days',
      lastRun: '2024-01-25 14:25:30',
      successRate: 92,
      description: 'Coordinate between architectural, structural, and MEP models',
    },
    {
      id: '3',
      name: 'Quality Assurance',
      type: 'Quality Control',
      status: 'Active',
      steps: 4,
      participants: 4,
      avgDuration: '3.0 days',
      lastRun: '2024-01-24 16:45:22',
      successRate: 88,
      description: 'Automated quality checks and compliance validation',
    },
    {
      id: '4',
      name: 'Document Generation',
      type: 'Documentation',
      status: 'Inactive',
      steps: 6,
      participants: 3,
      avgDuration: '4.5 days',
      lastRun: '2024-01-20 10:15:30',
      successRate: 85,
      description: 'Generate construction documents from BIM models',
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

  const ProjectItem = ({ project }: { project: any }) => (
    <View style={styles.projectItem}>
      <View style={styles.projectHeader}>
        <View style={styles.projectInfo}>
          <Text style={styles.projectName}>{project.name}</Text>
          <Text style={styles.projectType}>{project.type}</Text>
          <Text style={styles.projectVersion}>Version: {project.version}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: project.status === 'Active' ? '#28a745' : 
                           project.status === 'Completed' ? '#007bff' : '#ffc107'
          }
        ]}>
          <Text style={styles.statusText}>{project.status}</Text>
        </View>
      </View>
      
      <View style={styles.projectStats}>
        <View style={styles.projectStat}>
          <Text style={styles.projectStatValue}>{project.fileSize}</Text>
          <Text style={styles.projectStatLabel}>File Size</Text>
        </View>
        <View style={styles.projectStat}>
          <Text style={styles.projectStatValue}>{project.elements.toLocaleString()}</Text>
          <Text style={styles.projectStatLabel}>Elements</Text>
        </View>
        <View style={styles.projectStat}>
          <Text style={styles.projectStatValue}>{project.collaborators}</Text>
          <Text style={styles.projectStatLabel}>Collaborators</Text>
        </View>
        <View style={styles.projectStat}>
          <Text style={styles.projectStatValue}>{project.progress}%</Text>
          <Text style={styles.projectStatLabel}>Progress</Text>
        </View>
      </View>

      <View style={styles.projectSpecs}>
        <View style={styles.projectSpec}>
          <Text style={styles.projectSpecLabel}>Software:</Text>
          <Text style={styles.projectSpecValue}>{project.software}</Text>
        </View>
        <View style={styles.projectSpec}>
          <Text style={styles.projectSpecLabel}>Compliance:</Text>
          <Text style={styles.projectSpecValue}>{project.compliance}</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${project.progress}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>{project.progress}% Complete</Text>
      </View>

      <Text style={styles.projectLastUpdate}>
        Last Update: {project.lastUpdate}
      </Text>
    </View>
  );

  const ModelItem = ({ model }: { model: any }) => (
    <View style={styles.modelItem}>
      <View style={styles.modelHeader}>
        <View style={styles.modelInfo}>
          <Text style={styles.modelName}>{model.name}</Text>
          <Text style={styles.modelType}>{model.type}</Text>
          <Text style={styles.modelSoftware}>{model.software}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: model.status === 'Active' ? '#28a745' : '#ffc107'
          }
        ]}>
          <Text style={styles.statusText}>{model.status}</Text>
        </View>
      </View>
      
      <View style={styles.modelStats}>
        <View style={styles.modelStat}>
          <Text style={styles.modelStatValue}>{model.fileSize}</Text>
          <Text style={styles.modelStatLabel}>File Size</Text>
        </View>
        <View style={styles.modelStat}>
          <Text style={styles.modelStatValue}>{model.elements.toLocaleString()}</Text>
          <Text style={styles.modelStatLabel}>Elements</Text>
        </View>
        <View style={styles.modelStat}>
          <Text style={styles.modelStatValue}>{model.conflicts}</Text>
          <Text style={styles.modelStatLabel}>Conflicts</Text>
        </View>
        <View style={styles.modelStat}>
          <Text style={styles.modelStatValue}>{model.quality}%</Text>
          <Text style={styles.modelStatLabel}>Quality</Text>
        </View>
      </View>

      <View style={styles.modelMeta}>
        <Text style={styles.modelMetaText}>
          Version: {model.version}
        </Text>
        <Text style={styles.modelMetaText}>
          Last Sync: {model.lastSync}
        </Text>
        <Text style={styles.modelMetaText}>
          Issues: {model.issues}
        </Text>
      </View>
    </View>
  );

  const CollaborationItem = ({ user }: { user: any }) => (
    <View style={styles.collaborationItem}>
      <View style={styles.collaborationHeader}>
        <View style={styles.collaborationInfo}>
          <Text style={styles.collaborationUser}>{user.user}</Text>
          <Text style={styles.collaborationRole}>{user.role}</Text>
          <Text style={styles.collaborationProject}>{user.project}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: user.status === 'Online' ? '#28a745' : 
                           user.status === 'Away' ? '#ffc107' : '#dc3545'
          }
        ]}>
          <Text style={styles.statusText}>{user.status}</Text>
        </View>
      </View>
      
      <View style={styles.collaborationStats}>
        <View style={styles.collaborationStat}>
          <Text style={styles.collaborationStatValue}>{user.changes}</Text>
          <Text style={styles.collaborationStatLabel}>Changes</Text>
        </View>
        <View style={styles.collaborationStat}>
          <Text style={styles.collaborationStatValue}>{user.comments}</Text>
          <Text style={styles.collaborationStatLabel}>Comments</Text>
        </View>
        <View style={styles.collaborationStat}>
          <Text style={styles.collaborationStatValue}>{user.software}</Text>
          <Text style={styles.collaborationStatLabel}>Software</Text>
        </View>
      </View>

      <Text style={styles.collaborationLastActivity}>
        Last Activity: {user.lastActivity}
      </Text>
    </View>
  );

  const WorkflowItem = ({ workflow }: { workflow: any }) => (
    <View style={styles.workflowItem}>
      <View style={styles.workflowHeader}>
        <Text style={styles.workflowName}>{workflow.name}</Text>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: workflow.status === 'Active' ? '#28a745' : '#ffc107'
          }
        ]}>
          <Text style={styles.statusText}>{workflow.status}</Text>
        </View>
      </View>
      
      <Text style={styles.workflowType}>{workflow.type}</Text>
      <Text style={styles.workflowDescription}>{workflow.description}</Text>
      
      <View style={styles.workflowStats}>
        <View style={styles.workflowStat}>
          <Text style={styles.workflowStatValue}>{workflow.steps}</Text>
          <Text style={styles.workflowStatLabel}>Steps</Text>
        </View>
        <View style={styles.workflowStat}>
          <Text style={styles.workflowStatValue}>{workflow.participants}</Text>
          <Text style={styles.workflowStatLabel}>Participants</Text>
        </View>
        <View style={styles.workflowStat}>
          <Text style={styles.workflowStatValue}>{workflow.avgDuration}</Text>
          <Text style={styles.workflowStatLabel}>Avg Duration</Text>
        </View>
        <View style={styles.workflowStat}>
          <Text style={styles.workflowStatValue}>{workflow.successRate}%</Text>
          <Text style={styles.workflowStatLabel}>Success Rate</Text>
        </View>
      </View>

      <Text style={styles.workflowLastRun}>
        Last Run: {workflow.lastRun}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>BIM Integration</Text>
      <Text style={styles.subtitle}>
        BIM workflows with Revit, AutoCAD
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

      {selectedTab === 'projects' && (
        <View style={styles.projectsCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>BIM Projects</Text>
            <View style={styles.statusFilter}>
              {statuses.map((status) => (
                <StatusButton key={status.id} status={status} />
              ))}
            </View>
          </View>
          {projects.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </View>
      )}

      {selectedTab === 'models' && (
        <View style={styles.modelsCard}>
          <Text style={styles.cardTitle}>BIM Models</Text>
          {models.map((model) => (
            <ModelItem key={model.id} model={model} />
          ))}
        </View>
      )}

      {selectedTab === 'collaboration' && (
        <View style={styles.collaborationCard}>
          <Text style={styles.cardTitle}>Team Collaboration</Text>
          {collaborationData.map((user) => (
            <CollaborationItem key={user.id} user={user} />
          ))}
        </View>
      )}

      {selectedTab === 'workflows' && (
        <View style={styles.workflowsCard}>
          <Text style={styles.cardTitle}>BIM Workflows</Text>
          {workflows.map((workflow) => (
            <WorkflowItem key={workflow.id} workflow={workflow} />
          ))}
        </View>
      )}

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add" size={24} color="#007bff" />
            <Text style={styles.actionText}>New Project</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="cube" size={24} color="#28a745" />
            <Text style={styles.actionText}>Import Model</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="people" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Invite Team</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="git-network" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Create Workflow</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          BIM integration provides seamless workflows with Revit, AutoCAD, and other 
          BIM software, enabling collaborative design and construction management.
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
  projectsCard: {
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
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
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
  projectItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  projectType: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 2,
  },
  projectVersion: {
    fontSize: 12,
    color: '#007bff',
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
  projectStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  projectStat: {
    alignItems: 'center',
  },
  projectStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 2,
  },
  projectStatLabel: {
    fontSize: 10,
    color: '#cccccc',
  },
  projectSpecs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  projectSpec: {
    alignItems: 'center',
  },
  projectSpecLabel: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 2,
  },
  projectSpecValue: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  progressContainer: {
    marginBottom: 10,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#555555',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: 3,
  },
  progressText: {
    color: '#ffffff',
    fontSize: 12,
    textAlign: 'center',
  },
  projectLastUpdate: {
    fontSize: 12,
    color: '#cccccc',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  modelsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  modelItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  modelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  modelInfo: {
    flex: 1,
  },
  modelName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  modelType: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 2,
  },
  modelSoftware: {
    fontSize: 12,
    color: '#007bff',
  },
  modelStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  modelStat: {
    alignItems: 'center',
  },
  modelStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 2,
  },
  modelStatLabel: {
    fontSize: 10,
    color: '#cccccc',
  },
  modelMeta: {
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  modelMetaText: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 2,
  },
  collaborationCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  collaborationItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  collaborationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  collaborationInfo: {
    flex: 1,
  },
  collaborationUser: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  collaborationRole: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 2,
  },
  collaborationProject: {
    fontSize: 12,
    color: '#007bff',
  },
  collaborationStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  collaborationStat: {
    alignItems: 'center',
  },
  collaborationStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 2,
  },
  collaborationStatLabel: {
    fontSize: 10,
    color: '#cccccc',
  },
  collaborationLastActivity: {
    fontSize: 12,
    color: '#cccccc',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  workflowsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  workflowItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  workflowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  workflowName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  workflowType: {
    fontSize: 14,
    color: '#007bff',
    marginBottom: 5,
  },
  workflowDescription: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 10,
    lineHeight: 18,
  },
  workflowStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  workflowStat: {
    alignItems: 'center',
  },
  workflowStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 2,
  },
  workflowStatLabel: {
    fontSize: 10,
    color: '#cccccc',
  },
  workflowLastRun: {
    fontSize: 12,
    color: '#cccccc',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
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

export default BIMIntegrationScreen;

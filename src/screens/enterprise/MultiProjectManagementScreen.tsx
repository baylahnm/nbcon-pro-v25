import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MultiProjectManagementScreen: React.FC = () => {
  const [selectedView, setSelectedView] = useState('gantt');

  const projects = [
    {
      id: '1',
      name: 'NEOM Smart City Phase 1',
      status: 'In Progress',
      progress: 75,
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      budget: 5000000,
      spent: 3750000,
      department: 'Civil Engineering',
      priority: 'High',
      health: 'Good',
    },
    {
      id: '2',
      name: 'Red Sea Resort Infrastructure',
      status: 'Planning',
      progress: 25,
      startDate: '2024-02-01',
      endDate: '2024-08-31',
      budget: 3000000,
      spent: 750000,
      department: 'MEP Systems',
      priority: 'Medium',
      health: 'At Risk',
    },
    {
      id: '3',
      name: 'Qiddiya Entertainment Complex',
      status: 'In Progress',
      progress: 60,
      startDate: '2023-11-01',
      endDate: '2024-05-31',
      budget: 4000000,
      spent: 2400000,
      department: 'BIM Services',
      priority: 'High',
      health: 'Good',
    },
    {
      id: '4',
      name: 'Riyadh Metro Extension',
      status: 'Completed',
      progress: 100,
      startDate: '2023-06-01',
      endDate: '2024-01-31',
      budget: 8000000,
      spent: 8000000,
      department: 'Surveying',
      priority: 'High',
      health: 'Completed',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return '#28a745';
      case 'In Progress': return '#007bff';
      case 'Planning': return '#ffc107';
      case 'On Hold': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'Good': return '#28a745';
      case 'At Risk': return '#ffc107';
      case 'Critical': return '#dc3545';
      case 'Completed': return '#6c757d';
      default: return '#6c757d';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return '#dc3545';
      case 'Medium': return '#ffc107';
      case 'Low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const ViewButton = ({ view, label, icon }: { view: string; label: string; icon: string }) => (
    <TouchableOpacity
      style={[
        styles.viewButton,
        selectedView === view && styles.viewButtonActive
      ]}
      onPress={() => setSelectedView(view)}
    >
      <Ionicons 
        name={icon as any} 
        size={20} 
        color={selectedView === view ? '#ffffff' : '#cccccc'} 
      />
      <Text style={[
        styles.viewButtonText,
        selectedView === view && styles.viewButtonTextActive
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const ProjectCard = ({ project }: { project: any }) => (
    <View style={styles.projectCard}>
      <View style={styles.projectHeader}>
        <View style={styles.projectInfo}>
          <Text style={styles.projectName}>{project.name}</Text>
          <Text style={styles.projectDepartment}>{project.department}</Text>
        </View>
        <View style={styles.projectStatus}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(project.status) }]}>
            <Text style={styles.statusText}>{project.status}</Text>
          </View>
          <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(project.priority) }]}>
            <Text style={styles.priorityText}>{project.priority}</Text>
          </View>
        </View>
      </View>

      <View style={styles.projectProgress}>
        <View style={styles.progressInfo}>
          <Text style={styles.progressLabel}>Progress</Text>
          <Text style={styles.progressValue}>{project.progress}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${project.progress}%` }
            ]} 
          />
        </View>
      </View>

      <View style={styles.projectDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Budget:</Text>
          <Text style={styles.detailValue}>
            {project.spent.toLocaleString()} / {project.budget.toLocaleString()} SAR
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Timeline:</Text>
          <Text style={styles.detailValue}>
            {project.startDate} - {project.endDate}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Health:</Text>
          <View style={[styles.healthBadge, { backgroundColor: getHealthColor(project.health) }]}>
            <Text style={styles.healthText}>{project.health}</Text>
          </View>
        </View>
      </View>

      <View style={styles.projectActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="eye" size={16} color="#007bff" />
          <Text style={styles.actionText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="create" size={16} color="#28a745" />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="analytics" size={16} color="#ffc107" />
          <Text style={styles.actionText}>Analytics</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const GanttView = () => (
    <View style={styles.ganttView}>
      <Text style={styles.viewTitle}>Gantt Chart View</Text>
      <View style={styles.ganttContainer}>
        <View style={styles.ganttHeader}>
          <Text style={styles.ganttHeaderText}>Project</Text>
          <Text style={styles.ganttHeaderText}>Timeline</Text>
        </View>
        {projects.map((project) => (
          <View key={project.id} style={styles.ganttRow}>
            <View style={styles.ganttProjectName}>
              <Text style={styles.ganttProjectText}>{project.name}</Text>
            </View>
            <View style={styles.ganttTimeline}>
              <View style={styles.ganttBar}>
                <View 
                  style={[
                    styles.ganttProgress, 
                    { 
                      width: `${project.progress}%`,
                      backgroundColor: getStatusColor(project.status)
                    }
                  ]} 
                />
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const ListView = () => (
    <View style={styles.listView}>
      <Text style={styles.viewTitle}>List View</Text>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Multi-Project Management</Text>
      <Text style={styles.subtitle}>
        Manage multiple projects with Gantt charts and health monitoring
      </Text>

      <View style={styles.viewSelector}>
        <ViewButton view="gantt" label="Gantt Chart" icon="grid" />
        <ViewButton view="list" label="List View" icon="list" />
        <ViewButton view="kanban" label="Kanban" icon="apps" />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{projects.length}</Text>
          <Text style={styles.statLabel}>Total Projects</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {projects.filter(p => p.status === 'In Progress').length}
          </Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {projects.filter(p => p.health === 'At Risk' || p.health === 'Critical').length}
          </Text>
          <Text style={styles.statLabel}>At Risk</Text>
        </View>
      </View>

      {selectedView === 'gantt' && <GanttView />}
      {selectedView === 'list' && <ListView />}
      {selectedView === 'kanban' && (
        <View style={styles.kanbanView}>
          <Text style={styles.viewTitle}>Kanban View</Text>
          <Text style={styles.placeholderText}>Kanban board implementation</Text>
        </View>
      )}

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add-circle" size={24} color="#007bff" />
            <Text style={styles.actionText}>New Project</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="people" size={24} color="#28a745" />
            <Text style={styles.actionText}>Assign Team</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="analytics" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Reports</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
        </View>
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
  viewSelector: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  viewButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 6,
  },
  viewButtonActive: {
    backgroundColor: '#007bff',
  },
  viewButtonText: {
    color: '#cccccc',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 5,
  },
  viewButtonTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#cccccc',
    textAlign: 'center',
  },
  ganttView: {
    marginBottom: 20,
  },
  viewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  ganttContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 15,
  },
  ganttHeader: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  ganttHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
  },
  ganttRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ganttProjectName: {
    flex: 1,
    marginRight: 15,
  },
  ganttProjectText: {
    fontSize: 14,
    color: '#ffffff',
  },
  ganttTimeline: {
    flex: 2,
  },
  ganttBar: {
    height: 20,
    backgroundColor: '#3a3a3a',
    borderRadius: 10,
    overflow: 'hidden',
  },
  ganttProgress: {
    height: '100%',
    borderRadius: 10,
  },
  listView: {
    marginBottom: 20,
  },
  projectCard: {
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
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  projectDepartment: {
    fontSize: 14,
    color: '#cccccc',
  },
  projectStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 5,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  projectProgress: {
    marginBottom: 15,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#cccccc',
  },
  progressValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#3a3a3a',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: 4,
  },
  projectDetails: {
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#cccccc',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  healthBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  healthText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  projectActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#3a3a3a',
  },
  actionText: {
    color: '#ffffff',
    fontSize: 12,
    marginLeft: 4,
  },
  kanbanView: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
  },
  quickActionsCard: {
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
});

export default MultiProjectManagementScreen;

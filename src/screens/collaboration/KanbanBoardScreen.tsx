import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const KanbanBoardScreen: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const columns = [
    {
      id: 'backlog',
      title: 'Backlog',
      color: '#6c757d',
      tasks: [
        {
          id: 't1',
          title: 'Site Survey - Riyadh Tower',
          description: 'Conduct comprehensive site survey for foundation design',
          priority: 'high',
          assignee: 'Ahmed Al-Rashid',
          dueDate: '2024-02-15',
          tags: ['survey', 'foundation'],
          estimatedHours: 8,
          actualHours: 0,
        },
        {
          id: 't2',
          title: 'MEP Calculations - Jeddah Office',
          description: 'Calculate HVAC load requirements for office building',
          priority: 'medium',
          assignee: 'Sarah Al-Mansouri',
          dueDate: '2024-02-20',
          tags: ['mep', 'calculations'],
          estimatedHours: 12,
          actualHours: 0,
        },
      ],
    },
    {
      id: 'todo',
      title: 'To Do',
      color: '#007bff',
      tasks: [
        {
          id: 't3',
          title: 'Foundation Design Review',
          description: 'Review and approve foundation design drawings',
          priority: 'high',
          assignee: 'Ahmed Al-Rashid',
          dueDate: '2024-02-10',
          tags: ['design', 'review'],
          estimatedHours: 6,
          actualHours: 2,
        },
        {
          id: 't4',
          title: 'Safety Protocol Update',
          description: 'Update safety protocols for construction site',
          priority: 'medium',
          assignee: 'Omar Al-Zahrani',
          dueDate: '2024-02-12',
          tags: ['safety', 'protocol'],
          estimatedHours: 4,
          actualHours: 0,
        },
      ],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      color: '#ffc107',
      tasks: [
        {
          id: 't5',
          title: 'Structural Analysis - NEOM Project',
          description: 'Perform structural analysis for futuristic city design',
          priority: 'high',
          assignee: 'Khalid Al-Mutairi',
          dueDate: '2024-02-18',
          tags: ['structural', 'analysis'],
          estimatedHours: 16,
          actualHours: 8,
        },
        {
          id: 't6',
          title: 'BIM Model Creation',
          description: 'Create 3D BIM model for office building',
          priority: 'medium',
          assignee: 'Sarah Al-Mansouri',
          dueDate: '2024-02-25',
          tags: ['bim', 'modeling'],
          estimatedHours: 20,
          actualHours: 12,
        },
      ],
    },
    {
      id: 'review',
      title: 'Review',
      color: '#6f42c1',
      tasks: [
        {
          id: 't7',
          title: 'Safety Audit Report',
          description: 'Final review of safety audit report for Dammam plant',
          priority: 'high',
          assignee: 'Omar Al-Zahrani',
          dueDate: '2024-02-08',
          tags: ['safety', 'audit'],
          estimatedHours: 4,
          actualHours: 4,
        },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      color: '#28a745',
      tasks: [
        {
          id: 't8',
          title: 'Initial Site Inspection',
          description: 'Complete initial site inspection for Riyadh project',
          priority: 'medium',
          assignee: 'Ahmed Al-Rashid',
          dueDate: '2024-01-30',
          tags: ['inspection', 'site'],
          estimatedHours: 6,
          actualHours: 6,
        },
        {
          id: 't9',
          title: 'Client Meeting - MEP Design',
          description: 'Present MEP design to client for approval',
          priority: 'high',
          assignee: 'Sarah Al-Mansouri',
          dueDate: '2024-02-05',
          tags: ['meeting', 'presentation'],
          estimatedHours: 2,
          actualHours: 2,
        },
      ],
    },
  ];

  const projects = [
    {
      id: '1',
      title: 'Riyadh Tower Construction',
      client: 'Saudi Construction Co.',
      status: 'In Progress',
      progress: 45,
      color: '#007bff',
    },
    {
      id: '2',
      title: 'Jeddah Office MEP Design',
      client: 'Office Solutions Ltd.',
      status: 'Planning',
      progress: 15,
      color: '#28a745',
    },
    {
      id: '3',
      title: 'NEOM BIM Integration',
      client: 'NEOM Development',
      status: 'In Progress',
      progress: 30,
      color: '#ffc107',
    },
  ];

  const PriorityButton = ({ priority }: { priority: string }) => {
    const priorityColors = {
      low: '#28a745',
      medium: '#ffc107',
      high: '#dc3545',
      critical: '#6f42c1',
    };

    return (
      <View style={[styles.priorityBadge, { backgroundColor: priorityColors[priority as keyof typeof priorityColors] }]}>
        <Text style={styles.priorityText}>{priority.toUpperCase()}</Text>
      </View>
    );
  };

  const TaskCard = ({ task, columnId }: { task: any, columnId: string }) => (
    <TouchableOpacity
      style={[
        styles.taskCard,
        selectedTask === task.id && styles.taskCardSelected
      ]}
      onPress={() => setSelectedTask(task.id)}
    >
      <View style={styles.taskHeader}>
        <Text style={styles.taskTitle}>{task.title}</Text>
        <PriorityButton priority={task.priority} />
      </View>
      
      <Text style={styles.taskDescription}>{task.description}</Text>
      
      <View style={styles.taskDetails}>
        <View style={styles.taskDetail}>
          <Ionicons name="person" size={14} color="#cccccc" />
          <Text style={styles.taskDetailText}>{task.assignee}</Text>
        </View>
        <View style={styles.taskDetail}>
          <Ionicons name="calendar" size={14} color="#cccccc" />
          <Text style={styles.taskDetailText}>{task.dueDate}</Text>
        </View>
      </View>

      <View style={styles.taskProgress}>
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>
            {task.actualHours}h / {task.estimatedHours}h
          </Text>
          <Text style={styles.progressPercentage}>
            {Math.round((task.actualHours / task.estimatedHours) * 100)}%
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[
            styles.progressFill,
            { 
              width: `${Math.min((task.actualHours / task.estimatedHours) * 100, 100)}%`,
              backgroundColor: columnId === 'done' ? '#28a745' : '#007bff'
            }
          ]} />
        </View>
      </View>

      <View style={styles.taskTags}>
        {task.tags.map((tag: string, index: number) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>#{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.taskActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="create" size={14} color="#007bff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="copy" size={14} color="#28a745" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="trash" size={14} color="#dc3545" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const Column = ({ column }: { column: any }) => (
    <View style={styles.column}>
      <View style={styles.columnHeader}>
        <View style={styles.columnTitleContainer}>
          <View style={[styles.columnColorIndicator, { backgroundColor: column.color }]} />
          <Text style={styles.columnTitle}>{column.title}</Text>
        </View>
        <Text style={styles.taskCount}>{column.tasks.length}</Text>
      </View>
      
      <ScrollView style={styles.columnContent} showsVerticalScrollIndicator={false}>
        {column.tasks.map((task: any) => (
          <TaskCard key={task.id} task={task} columnId={column.id} />
        ))}
        
        <TouchableOpacity style={styles.addTaskButton}>
          <Ionicons name="add" size={20} color="#cccccc" />
          <Text style={styles.addTaskText}>Add Task</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  const ProjectCard = ({ project }: { project: any }) => (
    <TouchableOpacity
      style={[
        styles.projectCard,
        selectedProject === project.id && styles.projectCardSelected
      ]}
      onPress={() => setSelectedProject(project.id)}
    >
      <View style={styles.projectHeader}>
        <Text style={styles.projectTitle}>{project.title}</Text>
        <View style={[styles.statusBadge, { backgroundColor: project.color }]}>
          <Text style={styles.statusText}>{project.status}</Text>
        </View>
      </View>
      <Text style={styles.projectClient}>{project.client}</Text>
      <View style={styles.projectProgress}>
        <Text style={styles.progressText}>Progress: {project.progress}%</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${project.progress}%`, backgroundColor: project.color }]} />
        </View>
      </View>
    </TouchableOpacity>
  );

  const selectedTaskData = columns
    .flatMap(col => col.tasks)
    .find(task => task.id === selectedTask);

  const handleMoveTask = (taskId: string, newColumnId: string) => {
    Alert.alert('Success', `Task moved to ${columns.find(c => c.id === newColumnId)?.title}`);
  };

  const handleAddTask = () => {
    Alert.alert('Success', 'New task added successfully');
  };

  const totalTasks = columns.reduce((sum, col) => sum + col.tasks.length, 0);
  const completedTasks = columns.find(col => col.id === 'done')?.tasks.length || 0;
  const inProgressTasks = columns.find(col => col.id === 'in-progress')?.tasks.length || 0;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Kanban Board</Text>
      <Text style={styles.subtitle}>
        Kanban-style workflow
      </Text>

      <View style={styles.statsCard}>
        <Text style={styles.cardTitle}>Board Statistics</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{totalTasks}</Text>
            <Text style={styles.statLabel}>Total Tasks</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#28a745' }]}>{completedTasks}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#ffc107' }]}>{inProgressTasks}</Text>
            <Text style={styles.statLabel}>In Progress</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#007bff' }]}>
              {Math.round((completedTasks / totalTasks) * 100)}%
            </Text>
            <Text style={styles.statLabel}>Completion</Text>
          </View>
        </View>
      </View>

      <View style={styles.projectsCard}>
        <Text style={styles.cardTitle}>Select Project</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.projectsContainer}>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.boardCard}>
        <Text style={styles.cardTitle}>Kanban Board</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.boardContainer}>
            {columns.map((column) => (
              <Column key={column.id} column={column} />
            ))}
          </View>
        </ScrollView>
      </View>

      {selectedTask && (
        <View style={styles.taskDetailsCard}>
          <Text style={styles.cardTitle}>Task Details</Text>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Title:</Text>
            <Text style={styles.detailValue}>{selectedTaskData?.title}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Description:</Text>
            <Text style={styles.detailValue}>{selectedTaskData?.description}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Assignee:</Text>
            <Text style={styles.detailValue}>{selectedTaskData?.assignee}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Due Date:</Text>
            <Text style={styles.detailValue}>{selectedTaskData?.dueDate}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Priority:</Text>
            <Text style={styles.detailValue}>{selectedTaskData?.priority}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Progress:</Text>
            <Text style={styles.detailValue}>
              {selectedTaskData?.actualHours}h / {selectedTaskData?.estimatedHours}h
            </Text>
          </View>
          
          <View style={styles.taskActions}>
            <TouchableOpacity style={styles.moveTaskButton}>
              <Ionicons name="arrow-forward" size={20} color="#ffffff" />
              <Text style={styles.moveTaskButtonText}>Move Task</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editTaskButton}>
              <Ionicons name="create" size={20} color="#007bff" />
              <Text style={styles.editTaskButtonText}>Edit Task</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add" size={24} color="#007bff" />
            <Text style={styles.actionText}>Add Task</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="copy" size={24} color="#28a745" />
            <Text style={styles.actionText}>Copy Board</Text>
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
          Visualize your project workflow with Kanban boards. Drag and drop tasks 
          between columns to track progress and manage team workload.
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
  statsCard: {
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
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#cccccc',
  },
  projectsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  projectsContainer: {
    flexDirection: 'row',
  },
  projectCard: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginRight: 10,
    minWidth: 200,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  projectCardSelected: {
    borderColor: '#007bff',
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
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
  projectClient: {
    fontSize: 14,
    color: '#28a745',
    marginBottom: 10,
  },
  projectProgress: {
    marginTop: 10,
  },
  progressText: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 5,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#4a4a4a',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  boardCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  boardContainer: {
    flexDirection: 'row',
  },
  column: {
    width: 280,
    marginRight: 15,
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
  },
  columnHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  columnTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  columnColorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  columnTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  taskCount: {
    fontSize: 14,
    color: '#cccccc',
    backgroundColor: '#4a4a4a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  columnContent: {
    maxHeight: 500,
  },
  taskCard: {
    backgroundColor: '#4a4a4a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  taskCardSelected: {
    borderColor: '#007bff',
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  priorityText: {
    color: '#ffffff',
    fontSize: 8,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 8,
    lineHeight: 16,
  },
  taskDetails: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  taskDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  taskDetailText: {
    fontSize: 10,
    color: '#cccccc',
    marginLeft: 4,
  },
  taskProgress: {
    marginBottom: 8,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressText: {
    fontSize: 10,
    color: '#cccccc',
  },
  progressPercentage: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#555555',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  taskTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#555555',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
    marginBottom: 4,
  },
  tagText: {
    color: '#007bff',
    fontSize: 8,
    fontWeight: 'bold',
  },
  taskActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#555555',
    borderRadius: 4,
    padding: 6,
    flex: 1,
    marginHorizontal: 2,
    alignItems: 'center',
  },
  addTaskButton: {
    backgroundColor: '#4a4a4a',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#555555',
    borderStyle: 'dashed',
  },
  addTaskText: {
    color: '#cccccc',
    fontSize: 12,
    marginTop: 5,
  },
  taskDetailsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: '#cccccc',
    fontWeight: 'bold',
    width: '30%',
  },
  detailValue: {
    fontSize: 14,
    color: '#ffffff',
    flex: 1,
    textAlign: 'right',
  },
  taskActions: {
    flexDirection: 'row',
    marginTop: 15,
  },
  moveTaskButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginRight: 10,
    justifyContent: 'center',
  },
  moveTaskButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  editTaskButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    justifyContent: 'center',
  },
  editTaskButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
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

export default KanbanBoardScreen;

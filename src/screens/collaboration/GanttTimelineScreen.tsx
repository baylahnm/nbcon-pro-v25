import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GanttTimelineScreen: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [viewMode, setViewMode] = useState('month');
  const [selectedDate, setSelectedDate] = useState('2024-01-01');

  const viewModes = [
    { id: 'day', name: 'Day', icon: 'calendar-outline' },
    { id: 'week', name: 'Week', icon: 'calendar-outline' },
    { id: 'month', name: 'Month', icon: 'calendar-outline' },
    { id: 'quarter', name: 'Quarter', icon: 'calendar-outline' },
  ];

  const projects = [
    {
      id: '1',
      title: 'Riyadh Tower Construction',
      client: 'Saudi Construction Co.',
      status: 'In Progress',
      progress: 45,
      color: '#007bff',
      startDate: '2024-01-15',
      endDate: '2024-06-15',
      tasks: [
        {
          id: 't1',
          name: 'Foundation Design',
          startDate: '2024-01-15',
          endDate: '2024-02-15',
          progress: 80,
          assignee: 'Ahmed Al-Rashid',
          priority: 'high',
          dependencies: [],
          status: 'in-progress',
        },
        {
          id: 't2',
          name: 'Structural Framework',
          startDate: '2024-02-01',
          endDate: '2024-04-01',
          progress: 30,
          assignee: 'Sarah Al-Mansouri',
          priority: 'high',
          dependencies: ['t1'],
          status: 'in-progress',
        },
        {
          id: 't3',
          name: 'MEP Installation',
          startDate: '2024-03-15',
          endDate: '2024-05-15',
          progress: 10,
          assignee: 'Omar Al-Zahrani',
          priority: 'medium',
          dependencies: ['t2'],
          status: 'pending',
        },
        {
          id: 't4',
          name: 'Final Inspection',
          startDate: '2024-05-15',
          endDate: '2024-06-15',
          progress: 0,
          assignee: 'Khalid Al-Mutairi',
          priority: 'high',
          dependencies: ['t3'],
          status: 'pending',
        },
      ],
    },
    {
      id: '2',
      title: 'Jeddah Office MEP Design',
      client: 'Office Solutions Ltd.',
      status: 'Planning',
      progress: 15,
      color: '#28a745',
      startDate: '2024-02-01',
      endDate: '2024-04-01',
      tasks: [
        {
          id: 't5',
          name: 'HVAC Design',
          startDate: '2024-02-01',
          endDate: '2024-02-28',
          progress: 40,
          assignee: 'Sarah Al-Mansouri',
          priority: 'high',
          dependencies: [],
          status: 'in-progress',
        },
        {
          id: 't6',
          name: 'Electrical Design',
          startDate: '2024-02-15',
          endDate: '2024-03-15',
          progress: 20,
          assignee: 'Omar Al-Zahrani',
          priority: 'medium',
          dependencies: [],
          status: 'in-progress',
        },
        {
          id: 't7',
          name: 'Plumbing Design',
          startDate: '2024-03-01',
          endDate: '2024-03-31',
          progress: 0,
          assignee: 'Khalid Al-Mutairi',
          priority: 'medium',
          dependencies: ['t5', 't6'],
          status: 'pending',
        },
      ],
    },
    {
      id: '3',
      title: 'NEOM BIM Integration',
      client: 'NEOM Development',
      status: 'In Progress',
      progress: 30,
      color: '#ffc107',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      tasks: [
        {
          id: 't8',
          name: 'BIM Model Creation',
          startDate: '2024-01-01',
          endDate: '2024-06-30',
          progress: 25,
          assignee: 'Khalid Al-Mutairi',
          priority: 'high',
          dependencies: [],
          status: 'in-progress',
        },
        {
          id: 't9',
          name: 'AR/VR Integration',
          startDate: '2024-04-01',
          endDate: '2024-08-31',
          progress: 5,
          assignee: 'Ahmed Al-Rashid',
          priority: 'medium',
          dependencies: ['t8'],
          status: 'pending',
        },
        {
          id: 't10',
          name: 'IoT Integration',
          startDate: '2024-07-01',
          endDate: '2024-12-31',
          progress: 0,
          assignee: 'Sarah Al-Mansouri',
          priority: 'low',
          dependencies: ['t8', 't9'],
          status: 'pending',
        },
      ],
    },
  ];

  const ViewModeButton = ({ mode }: { mode: any }) => (
    <TouchableOpacity
      style={[
        styles.viewModeButton,
        viewMode === mode.id && styles.viewModeButtonSelected
      ]}
      onPress={() => setViewMode(mode.id)}
    >
      <Ionicons 
        name={mode.icon as any} 
        size={20} 
        color={viewMode === mode.id ? '#ffffff' : '#007bff'} 
      />
      <Text style={[
        styles.viewModeText,
        viewMode === mode.id && styles.viewModeTextSelected
      ]}>
        {mode.name}
      </Text>
    </TouchableOpacity>
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
        <View style={styles.projectInfo}>
          <Text style={styles.projectTitle}>{project.title}</Text>
          <Text style={styles.projectClient}>{project.client}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: project.color }]}>
          <Text style={styles.statusText}>{project.status}</Text>
        </View>
      </View>
      
      <View style={styles.projectTimeline}>
        <View style={styles.timelineItem}>
          <Text style={styles.timelineLabel}>Start:</Text>
          <Text style={styles.timelineValue}>{project.startDate}</Text>
        </View>
        <View style={styles.timelineItem}>
          <Text style={styles.timelineLabel}>End:</Text>
          <Text style={styles.timelineValue}>{project.endDate}</Text>
        </View>
        <View style={styles.timelineItem}>
          <Text style={styles.timelineLabel}>Progress:</Text>
          <Text style={styles.timelineValue}>{project.progress}%</Text>
        </View>
      </View>

      <View style={styles.projectProgress}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${project.progress}%`, backgroundColor: project.color }]} />
        </View>
      </View>
    </TouchableOpacity>
  );

  const TaskRow = ({ task, project }: { task: any, project: any }) => (
    <TouchableOpacity
      style={[
        styles.taskRow,
        selectedTask === task.id && styles.taskRowSelected
      ]}
      onPress={() => setSelectedTask(task.id)}
    >
      <View style={styles.taskInfo}>
        <Text style={styles.taskName}>{task.name}</Text>
        <Text style={styles.taskAssignee}>{task.assignee}</Text>
      </View>
      
      <View style={styles.taskTimeline}>
        <View style={styles.timelineBar}>
          <View style={[
            styles.timelineFill,
            { 
              width: `${task.progress}%`,
              backgroundColor: project.color
            }
          ]} />
        </View>
        <Text style={styles.taskDates}>{task.startDate} - {task.endDate}</Text>
      </View>

      <View style={styles.taskStatus}>
        <View style={[
          styles.priorityBadge,
          { 
            backgroundColor: task.priority === 'high' ? '#dc3545' : 
                           task.priority === 'medium' ? '#ffc107' : '#28a745'
          }
        ]}>
          <Text style={styles.priorityText}>{task.priority}</Text>
        </View>
        <Text style={styles.progressText}>{task.progress}%</Text>
      </View>
    </TouchableOpacity>
  );

  const GanttChart = ({ project }: { project: any }) => {
    const startDate = new Date(project.startDate);
    const endDate = new Date(project.endDate);
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    return (
      <View style={styles.ganttChart}>
        <View style={styles.ganttHeader}>
          <Text style={styles.ganttTitle}>Gantt Chart - {project.title}</Text>
          <View style={styles.ganttControls}>
            <TouchableOpacity style={styles.controlButton}>
              <Ionicons name="chevron-back" size={20} color="#007bff" />
            </TouchableOpacity>
            <Text style={styles.dateRange}>
              {project.startDate} - {project.endDate}
            </Text>
            <TouchableOpacity style={styles.controlButton}>
              <Ionicons name="chevron-forward" size={20} color="#007bff" />
            </TouchableOpacity>
          </View>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.ganttContent}>
            <View style={styles.ganttTimeline}>
              {project.tasks.map((task: any) => (
                <View key={task.id} style={styles.ganttTaskRow}>
                  <View style={styles.taskLabel}>
                    <Text style={styles.taskLabelText}>{task.name}</Text>
                    <Text style={styles.taskLabelAssignee}>{task.assignee}</Text>
                  </View>
                  
                  <View style={styles.ganttBar}>
                    <View style={[
                      styles.ganttBarFill,
                      { 
                        width: `${(new Date(task.endDate).getTime() - new Date(task.startDate).getTime()) / (1000 * 60 * 60 * 24) / totalDays * 100}%`,
                        backgroundColor: project.color,
                        opacity: task.status === 'completed' ? 1 : task.status === 'in-progress' ? 0.8 : 0.5
                      }
                    ]} />
                    <View style={[
                      styles.ganttProgress,
                      { 
                        width: `${task.progress}%`,
                        backgroundColor: task.status === 'completed' ? '#28a745' : '#ffffff'
                      }
                    ]} />
                  </View>
                  
                  <View style={styles.taskProgress}>
                    <Text style={styles.taskProgressText}>{task.progress}%</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };

  const selectedProjectData = projects.find(p => p.id === selectedProject);
  const selectedTaskData = selectedProjectData?.tasks.find(t => t.id === selectedTask);

  const handleAddTask = () => {
    if (!selectedProject) {
      Alert.alert('Error', 'Please select a project first');
      return;
    }
    Alert.alert('Success', 'New task added successfully');
  };

  const handleEditTask = () => {
    if (!selectedTask) {
      Alert.alert('Error', 'Please select a task first');
      return;
    }
    Alert.alert('Success', 'Task updated successfully');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Gantt Timeline</Text>
      <Text style={styles.subtitle}>
        Gantt chart for projects
      </Text>

      <View style={styles.viewModesCard}>
        <Text style={styles.cardTitle}>View Mode</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.viewModesContainer}>
            {viewModes.map((mode) => (
              <ViewModeButton key={mode.id} mode={mode} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.projectsCard}>
        <Text style={styles.cardTitle}>Select Project</Text>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </View>

      {selectedProject && (
        <>
          <View style={styles.ganttCard}>
            <GanttChart project={selectedProjectData} />
          </View>

          <View style={styles.tasksCard}>
            <Text style={styles.cardTitle}>Project Tasks</Text>
            {selectedProjectData?.tasks.map((task) => (
              <TaskRow key={task.id} task={task} project={selectedProjectData} />
            ))}
          </View>

          {selectedTask && (
            <View style={styles.taskDetailsCard}>
              <Text style={styles.cardTitle}>Task Details</Text>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Name:</Text>
                <Text style={styles.detailValue}>{selectedTaskData?.name}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Assignee:</Text>
                <Text style={styles.detailValue}>{selectedTaskData?.assignee}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Start Date:</Text>
                <Text style={styles.detailValue}>{selectedTaskData?.startDate}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>End Date:</Text>
                <Text style={styles.detailValue}>{selectedTaskData?.endDate}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Progress:</Text>
                <Text style={styles.detailValue}>{selectedTaskData?.progress}%</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Priority:</Text>
                <Text style={styles.detailValue}>{selectedTaskData?.priority}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Status:</Text>
                <Text style={styles.detailValue}>{selectedTaskData?.status}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Dependencies:</Text>
                <Text style={styles.detailValue}>
                  {selectedTaskData?.dependencies.length > 0 
                    ? selectedTaskData.dependencies.join(', ') 
                    : 'None'
                  }
                </Text>
              </View>
              
              <View style={styles.taskActions}>
                <TouchableOpacity style={styles.editTaskButton} onPress={handleEditTask}>
                  <Ionicons name="create" size={20} color="#ffffff" />
                  <Text style={styles.editTaskButtonText}>Edit Task</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addTaskButton} onPress={handleAddTask}>
                  <Ionicons name="add" size={20} color="#ffffff" />
                  <Text style={styles.addTaskButtonText}>Add Task</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      )}

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add" size={24} color="#007bff" />
            <Text style={styles.actionText}>Add Project</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download" size={24} color="#28a745" />
            <Text style={styles.actionText}>Export Chart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="print" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Print</Text>
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
          Visualize project timelines with Gantt charts. Track task dependencies, 
          progress, and deadlines for better project management.
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
  viewModesCard: {
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
  viewModesContainer: {
    flexDirection: 'row',
  },
  viewModeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
  },
  viewModeButtonSelected: {
    backgroundColor: '#007bff',
  },
  viewModeText: {
    color: '#007bff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  viewModeTextSelected: {
    color: '#ffffff',
  },
  projectsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  projectCard: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  projectCardSelected: {
    borderColor: '#007bff',
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
  projectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  projectClient: {
    fontSize: 14,
    color: '#28a745',
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
  projectTimeline: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  timelineItem: {
    marginRight: 15,
  },
  timelineLabel: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 2,
  },
  timelineValue: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  projectProgress: {
    marginTop: 10,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#4a4a4a',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  ganttCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  ganttChart: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
  },
  ganttHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  ganttTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  ganttControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    backgroundColor: '#4a4a4a',
    borderRadius: 6,
    padding: 8,
    marginHorizontal: 5,
  },
  dateRange: {
    color: '#cccccc',
    fontSize: 12,
    marginHorizontal: 10,
  },
  ganttContent: {
    minWidth: 800,
  },
  ganttTimeline: {
    flexDirection: 'column',
  },
  ganttTaskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 5,
  },
  taskLabel: {
    width: 150,
    marginRight: 10,
  },
  taskLabelText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  taskLabelAssignee: {
    fontSize: 10,
    color: '#cccccc',
  },
  ganttBar: {
    flex: 1,
    height: 20,
    backgroundColor: '#4a4a4a',
    borderRadius: 10,
    marginRight: 10,
    position: 'relative',
  },
  ganttBarFill: {
    height: '100%',
    borderRadius: 10,
  },
  ganttProgress: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    borderRadius: 10,
  },
  taskProgress: {
    width: 50,
    alignItems: 'center',
  },
  taskProgressText: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  tasksCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  taskRow: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  taskRowSelected: {
    borderColor: '#007bff',
  },
  taskInfo: {
    marginBottom: 10,
  },
  taskName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  taskAssignee: {
    fontSize: 14,
    color: '#28a745',
  },
  taskTimeline: {
    marginBottom: 10,
  },
  timelineBar: {
    height: 8,
    backgroundColor: '#4a4a4a',
    borderRadius: 4,
    marginBottom: 5,
  },
  timelineFill: {
    height: '100%',
    borderRadius: 4,
  },
  taskDates: {
    fontSize: 12,
    color: '#cccccc',
  },
  taskStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  progressText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
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
  editTaskButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginRight: 10,
    justifyContent: 'center',
  },
  editTaskButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  addTaskButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    justifyContent: 'center',
  },
  addTaskButtonText: {
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

export default GanttTimelineScreen;

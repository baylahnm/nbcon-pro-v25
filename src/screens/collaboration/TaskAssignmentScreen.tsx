import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TaskAssignmentScreen: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedEngineer, setSelectedEngineer] = useState(null);
  const [taskPriority, setTaskPriority] = useState('medium');
  const [taskStatus, setTaskStatus] = useState('pending');

  const priorities = [
    { id: 'low', name: 'Low', color: '#28a745', description: 'Can be completed when convenient' },
    { id: 'medium', name: 'Medium', color: '#ffc107', description: 'Should be completed within timeline' },
    { id: 'high', name: 'High', color: '#dc3545', description: 'Urgent - needs immediate attention' },
    { id: 'critical', name: 'Critical', color: '#6f42c1', description: 'Emergency - drop everything else' },
  ];

  const statuses = [
    { id: 'pending', name: 'Pending', color: '#6c757d', description: 'Not yet started' },
    { id: 'in-progress', name: 'In Progress', color: '#007bff', description: 'Currently being worked on' },
    { id: 'review', name: 'Under Review', color: '#ffc107', description: 'Completed, awaiting review' },
    { id: 'completed', name: 'Completed', color: '#28a745', description: 'Fully completed and approved' },
    { id: 'blocked', name: 'Blocked', color: '#dc3545', description: 'Cannot proceed due to dependencies' },
  ];

  const projects = [
    {
      id: '1',
      title: 'Riyadh Tower Construction',
      client: 'Saudi Construction Co.',
      status: 'In Progress',
      progress: 45,
      color: '#007bff',
      tasks: [
        {
          id: 't1',
          title: 'Foundation Inspection',
          description: 'Conduct comprehensive foundation inspection and report',
          assignedTo: 'Ahmed Al-Rashid',
          priority: 'high',
          status: 'in-progress',
          dueDate: '2024-02-15',
          estimatedHours: 8,
          actualHours: 4,
          progress: 50,
        },
        {
          id: 't2',
          title: 'Structural Analysis',
          description: 'Perform structural analysis of the building framework',
          assignedTo: 'Sarah Al-Mansouri',
          priority: 'medium',
          status: 'pending',
          dueDate: '2024-02-20',
          estimatedHours: 16,
          actualHours: 0,
          progress: 0,
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
      tasks: [
        {
          id: 't3',
          title: 'Electrical System Design',
          description: 'Design complete electrical system for office building',
          assignedTo: 'Omar Al-Zahrani',
          priority: 'high',
          status: 'in-progress',
          dueDate: '2024-02-10',
          estimatedHours: 24,
          actualHours: 8,
          progress: 33,
        },
        {
          id: 't4',
          title: 'HVAC Calculations',
          description: 'Calculate heating, ventilation, and air conditioning requirements',
          assignedTo: 'Khalid Al-Mutairi',
          priority: 'medium',
          status: 'pending',
          dueDate: '2024-02-18',
          estimatedHours: 12,
          actualHours: 0,
          progress: 0,
        },
      ],
    },
  ];

  const engineers = [
    {
      id: '1',
      name: 'Ahmed Al-Rashid',
      specialization: 'Civil Engineering',
      rating: 4.8,
      location: 'Riyadh, Saudi Arabia',
      availability: 'Available',
      currentTasks: 3,
      maxTasks: 5,
      hourlyRate: 150,
      avatar: '👨‍💼',
    },
    {
      id: '2',
      name: 'Sarah Al-Mansouri',
      specialization: 'Structural Engineering',
      rating: 4.9,
      location: 'Jeddah, Saudi Arabia',
      availability: 'Busy',
      currentTasks: 4,
      maxTasks: 5,
      hourlyRate: 180,
      avatar: '👩‍💼',
    },
    {
      id: '3',
      name: 'Omar Al-Zahrani',
      specialization: 'MEP Engineering',
      rating: 4.7,
      location: 'Dammam, Saudi Arabia',
      availability: 'Available',
      currentTasks: 2,
      maxTasks: 5,
      hourlyRate: 160,
      avatar: '👨‍🔧',
    },
    {
      id: '4',
      name: 'Khalid Al-Mutairi',
      specialization: 'BIM Engineering',
      rating: 4.6,
      location: 'NEOM, Saudi Arabia',
      availability: 'Available',
      currentTasks: 1,
      maxTasks: 5,
      hourlyRate: 170,
      avatar: '👨‍💻',
    },
  ];

  const PriorityButton = ({ priority }: { priority: any }) => (
    <TouchableOpacity
      style={[
        styles.priorityButton,
        taskPriority === priority.id && styles.priorityButtonSelected
      ]}
      onPress={() => setTaskPriority(priority.id)}
    >
      <View style={[styles.priorityIndicator, { backgroundColor: priority.color }]} />
      <Text style={[
        styles.priorityText,
        taskPriority === priority.id && styles.priorityTextSelected
      ]}>
        {priority.name}
      </Text>
    </TouchableOpacity>
  );

  const StatusButton = ({ status }: { status: any }) => (
    <TouchableOpacity
      style={[
        styles.statusButton,
        taskStatus === status.id && styles.statusButtonSelected
      ]}
      onPress={() => setTaskStatus(status.id)}
    >
      <View style={[styles.statusIndicator, { backgroundColor: status.color }]} />
      <Text style={[
        styles.statusText,
        taskStatus === status.id && styles.statusTextSelected
      ]}>
        {status.name}
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
          <Text style={styles.projectClient}>Client: {project.client}</Text>
        </View>
        <View style={styles.projectStatus}>
          <View style={[styles.statusBadge, { backgroundColor: project.color }]}>
            <Text style={styles.statusText}>{project.status}</Text>
          </View>
          <Text style={styles.progressText}>{project.progress}%</Text>
        </View>
      </View>
      
      <View style={styles.tasksList}>
        <Text style={styles.tasksTitle}>Tasks ({project.tasks.length})</Text>
        {project.tasks.map((task: any) => (
          <View key={task.id} style={styles.taskItem}>
            <View style={styles.taskHeader}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <View style={[
                styles.taskPriorityBadge,
                { backgroundColor: priorities.find(p => p.id === task.priority)?.color }
              ]}>
                <Text style={styles.taskPriorityText}>
                  {priorities.find(p => p.id === task.priority)?.name}
                </Text>
              </View>
            </View>
            <Text style={styles.taskDescription}>{task.description}</Text>
            <View style={styles.taskDetails}>
              <View style={styles.taskDetail}>
                <Text style={styles.taskDetailLabel}>Assigned to:</Text>
                <Text style={styles.taskDetailValue}>{task.assignedTo}</Text>
              </View>
              <View style={styles.taskDetail}>
                <Text style={styles.taskDetailLabel}>Due:</Text>
                <Text style={styles.taskDetailValue}>{task.dueDate}</Text>
              </View>
              <View style={styles.taskDetail}>
                <Text style={styles.taskDetailLabel}>Progress:</Text>
                <Text style={styles.taskDetailValue}>{task.progress}%</Text>
              </View>
            </View>
            <View style={styles.taskProgress}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${task.progress}%` }]} />
              </View>
            </View>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  const EngineerCard = ({ engineer }: { engineer: any }) => (
    <TouchableOpacity
      style={[
        styles.engineerCard,
        selectedEngineer === engineer.id && styles.engineerCardSelected
      ]}
      onPress={() => setSelectedEngineer(engineer.id)}
    >
      <View style={styles.engineerHeader}>
        <View style={styles.engineerAvatar}>
          <Text style={styles.avatarText}>{engineer.avatar}</Text>
        </View>
        <View style={styles.engineerInfo}>
          <Text style={styles.engineerName}>{engineer.name}</Text>
          <Text style={styles.engineerSpecialization}>{engineer.specialization}</Text>
          <Text style={styles.engineerLocation}>{engineer.location}</Text>
        </View>
        <View style={styles.engineerRating}>
          <Ionicons name="star" size={16} color="#ffc107" />
          <Text style={styles.ratingText}>{engineer.rating}</Text>
        </View>
      </View>
      
      <View style={styles.engineerDetails}>
        <View style={styles.engineerDetail}>
          <Text style={styles.engineerDetailLabel}>Availability:</Text>
          <Text style={[
            styles.engineerDetailValue,
            { color: engineer.availability === 'Available' ? '#28a745' : '#dc3545' }
          ]}>
            {engineer.availability}
          </Text>
        </View>
        <View style={styles.engineerDetail}>
          <Text style={styles.engineerDetailLabel}>Tasks:</Text>
          <Text style={styles.engineerDetailValue}>
            {engineer.currentTasks}/{engineer.maxTasks}
          </Text>
        </View>
        <View style={styles.engineerDetail}>
          <Text style={styles.engineerDetailLabel}>Rate:</Text>
          <Text style={styles.engineerDetailValue}>{engineer.hourlyRate} SAR/hr</Text>
        </View>
      </View>

      <View style={styles.engineerActions}>
        <TouchableOpacity style={styles.assignButton}>
          <Ionicons name="person-add" size={16} color="#007bff" />
          <Text style={styles.assignButtonText}>Assign Task</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewButton}>
          <Ionicons name="eye" size={16} color="#28a745" />
          <Text style={styles.viewButtonText}>View Profile</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const handleAssignTask = () => {
    if (!selectedProject || !selectedEngineer) {
      Alert.alert('Error', 'Please select a project and engineer');
      return;
    }

    Alert.alert(
      'Assign Task',
      `Assign task to ${engineers.find(e => e.id === selectedEngineer)?.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Assign', 
          style: 'default',
          onPress: () => {
            Alert.alert('Success', 'Task assigned successfully');
            setSelectedProject(null);
            setSelectedEngineer(null);
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Task Assignment</Text>
      <Text style={styles.subtitle}>
        Assign sub-tasks to engineers
      </Text>

      <View style={styles.priorityCard}>
        <Text style={styles.cardTitle}>Task Priority</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.priorityContainer}>
            {priorities.map((priority) => (
              <PriorityButton key={priority.id} priority={priority} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.statusCard}>
        <Text style={styles.cardTitle}>Task Status</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.statusContainer}>
            {statuses.map((status) => (
              <StatusButton key={status.id} status={status} />
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

      <View style={styles.engineersCard}>
        <Text style={styles.cardTitle}>Available Engineers</Text>
        {engineers.map((engineer) => (
          <EngineerCard key={engineer.id} engineer={engineer} />
        ))}
      </View>

      {selectedProject && selectedEngineer && (
        <View style={styles.assignmentCard}>
          <Text style={styles.cardTitle}>Assignment Summary</Text>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Project:</Text>
            <Text style={styles.summaryValue}>
              {projects.find(p => p.id === selectedProject)?.title}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Engineer:</Text>
            <Text style={styles.summaryValue}>
              {engineers.find(e => e.id === selectedEngineer)?.name}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Priority:</Text>
            <Text style={styles.summaryValue}>
              {priorities.find(p => p.id === taskPriority)?.name}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Status:</Text>
            <Text style={styles.summaryValue}>
              {statuses.find(s => s.id === taskStatus)?.name}
            </Text>
          </View>
          
          <TouchableOpacity 
            style={styles.assignTaskButton}
            onPress={handleAssignTask}
          >
            <Ionicons name="checkmark-circle" size={20} color="#ffffff" />
            <Text style={styles.assignTaskButtonText}>Assign Task</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add" size={24} color="#007bff" />
            <Text style={styles.actionText}>Create Task</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="list" size={24} color="#28a745" />
            <Text style={styles.actionText}>View All Tasks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="people" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Team Overview</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="analytics" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Task Analytics</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          Assign tasks to engineers based on their availability, specialization, and current workload. 
          Monitor progress and ensure timely completion.
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
  priorityCard: {
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
  priorityContainer: {
    flexDirection: 'row',
  },
  priorityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
  },
  priorityButtonSelected: {
    backgroundColor: '#007bff',
  },
  priorityIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  priorityText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  priorityTextSelected: {
    color: '#ffffff',
  },
  statusCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  statusContainer: {
    flexDirection: 'row',
  },
  statusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
  },
  statusButtonSelected: {
    backgroundColor: '#007bff',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusTextSelected: {
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
    fontSize: 10,
    fontWeight: 'bold',
  },
  progressText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tasksList: {
    marginTop: 10,
  },
  tasksTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  taskItem: {
    backgroundColor: '#4a4a4a',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
  },
  taskPriorityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  taskPriorityText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 8,
  },
  taskDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  taskDetail: {
    width: '50%',
    marginBottom: 4,
  },
  taskDetailLabel: {
    fontSize: 10,
    color: '#cccccc',
  },
  taskDetailValue: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  taskProgress: {
    marginTop: 5,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#555555',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: 2,
  },
  engineersCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  engineerCard: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  engineerCardSelected: {
    borderColor: '#007bff',
  },
  engineerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  engineerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4a4a4a',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 24,
  },
  engineerInfo: {
    flex: 1,
  },
  engineerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  engineerSpecialization: {
    fontSize: 14,
    color: '#007bff',
    marginBottom: 2,
  },
  engineerLocation: {
    fontSize: 12,
    color: '#cccccc',
  },
  engineerRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  engineerDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  engineerDetail: {
    width: '50%',
    marginBottom: 5,
  },
  engineerDetailLabel: {
    fontSize: 12,
    color: '#cccccc',
  },
  engineerDetailValue: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  engineerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  assignButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 6,
    padding: 8,
    flex: 1,
    marginRight: 5,
    justifyContent: 'center',
  },
  assignButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    borderRadius: 6,
    padding: 8,
    flex: 1,
    marginLeft: 5,
    justifyContent: 'center',
  },
  viewButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  assignmentCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#cccccc',
  },
  summaryValue: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  assignTaskButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    borderRadius: 8,
    padding: 15,
    marginTop: 15,
    justifyContent: 'center',
  },
  assignTaskButtonText: {
    color: '#ffffff',
    fontSize: 16,
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

export default TaskAssignmentScreen;

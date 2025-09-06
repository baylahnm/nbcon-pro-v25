import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ToDoListScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [newTaskText, setNewTaskText] = useState('');

  const categories = [
    { id: 'all', name: 'All Tasks', icon: 'list', color: '#007bff' },
    { id: 'work', name: 'Work', icon: 'briefcase', color: '#28a745' },
    { id: 'personal', name: 'Personal', icon: 'person', color: '#ffc107' },
    { id: 'urgent', name: 'Urgent', icon: 'warning', color: '#dc3545' },
    { id: 'meetings', name: 'Meetings', icon: 'calendar', color: '#6f42c1' },
  ];

  const priorities = [
    { id: 'all', name: 'All', color: '#6c757d' },
    { id: 'low', name: 'Low', color: '#28a745' },
    { id: 'medium', name: 'Medium', color: '#ffc107' },
    { id: 'high', name: 'High', color: '#dc3545' },
    { id: 'critical', name: 'Critical', color: '#6f42c1' },
  ];

  const statuses = [
    { id: 'all', name: 'All', color: '#6c757d' },
    { id: 'pending', name: 'Pending', color: '#6c757d' },
    { id: 'in-progress', name: 'In Progress', color: '#007bff' },
    { id: 'completed', name: 'Completed', color: '#28a745' },
    { id: 'cancelled', name: 'Cancelled', color: '#dc3545' },
  ];

  const todoItems = [
    {
      id: '1',
      title: 'Review Riyadh Tower Foundation Report',
      description: 'Review and approve the foundation inspection report from Ahmed Al-Rashid',
      category: 'work',
      priority: 'high',
      status: 'in-progress',
      dueDate: '2024-01-25',
      createdDate: '2024-01-20',
      completedDate: null,
      estimatedTime: '2 hours',
      actualTime: '1 hour',
      tags: ['construction', 'review', 'foundation'],
      project: 'Riyadh Tower Construction',
      assignedBy: 'Saudi Construction Co.',
    },
    {
      id: '2',
      title: 'Prepare MEP Design Presentation',
      description: 'Create presentation slides for MEP design review meeting',
      category: 'work',
      priority: 'medium',
      status: 'pending',
      dueDate: '2024-01-26',
      createdDate: '2024-01-22',
      completedDate: null,
      estimatedTime: '3 hours',
      actualTime: '0 hours',
      tags: ['presentation', 'mep', 'design'],
      project: 'Jeddah Office MEP Design',
      assignedBy: 'Office Solutions Ltd.',
    },
    {
      id: '3',
      title: 'Update Professional Portfolio',
      description: 'Add recent projects and certifications to professional portfolio',
      category: 'personal',
      priority: 'low',
      status: 'pending',
      dueDate: '2024-02-01',
      createdDate: '2024-01-15',
      completedDate: null,
      estimatedTime: '4 hours',
      actualTime: '0 hours',
      tags: ['portfolio', 'career', 'update'],
      project: 'Personal Development',
      assignedBy: 'Self',
    },
    {
      id: '4',
      title: 'Client Meeting - Safety Audit Results',
      description: 'Present safety audit findings to Industrial Solutions Inc.',
      category: 'meetings',
      priority: 'high',
      status: 'completed',
      dueDate: '2024-01-24',
      createdDate: '2024-01-20',
      completedDate: '2024-01-24',
      estimatedTime: '1 hour',
      actualTime: '1.5 hours',
      tags: ['meeting', 'safety', 'audit'],
      project: 'Dammam Plant Safety Audit',
      assignedBy: 'Industrial Solutions Inc.',
    },
    {
      id: '5',
      title: 'Renew SCE License',
      description: 'Submit renewal application for Saudi Council of Engineers license',
      category: 'urgent',
      priority: 'critical',
      status: 'pending',
      dueDate: '2024-01-30',
      createdDate: '2024-01-10',
      completedDate: null,
      estimatedTime: '2 hours',
      actualTime: '0 hours',
      tags: ['license', 'renewal', 'sce'],
      project: 'Professional Compliance',
      assignedBy: 'Self',
    },
    {
      id: '6',
      title: 'Site Visit - NEOM Project',
      description: 'Conduct on-site inspection for BIM modeling project',
      category: 'work',
      priority: 'medium',
      status: 'in-progress',
      dueDate: '2024-01-28',
      createdDate: '2024-01-18',
      completedDate: null,
      estimatedTime: '6 hours',
      actualTime: '3 hours',
      tags: ['site-visit', 'bim', 'inspection'],
      project: 'NEOM BIM Integration',
      assignedBy: 'NEOM Development',
    },
  ];

  const CategoryButton = ({ category }: { category: any }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === category.id && styles.categoryButtonSelected
      ]}
      onPress={() => setSelectedCategory(category.id)}
    >
      <Ionicons 
        name={category.icon as any} 
        size={20} 
        color={selectedCategory === category.id ? '#ffffff' : category.color} 
      />
      <Text style={[
        styles.categoryText,
        selectedCategory === category.id && styles.categoryTextSelected
      ]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  const PriorityButton = ({ priority }: { priority: any }) => (
    <TouchableOpacity
      style={[
        styles.priorityButton,
        selectedPriority === priority.id && styles.priorityButtonSelected
      ]}
      onPress={() => setSelectedPriority(priority.id)}
    >
      <View style={[styles.priorityIndicator, { backgroundColor: priority.color }]} />
      <Text style={[
        styles.priorityText,
        selectedPriority === priority.id && styles.priorityTextSelected
      ]}>
        {priority.name}
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
      <View style={[styles.statusIndicator, { backgroundColor: status.color }]} />
      <Text style={[
        styles.statusText,
        selectedStatus === status.id && styles.statusTextSelected
      ]}>
        {status.name}
      </Text>
    </TouchableOpacity>
  );

  const TodoItem = ({ item }: { item: any }) => (
    <View style={styles.todoItem}>
      <View style={styles.todoHeader}>
        <View style={styles.todoInfo}>
          <Text style={styles.todoTitle}>{item.title}</Text>
          <Text style={styles.todoDescription}>{item.description}</Text>
        </View>
        <View style={styles.todoStatus}>
          <View style={[
            styles.statusBadge,
            { backgroundColor: statuses.find(s => s.id === item.status)?.color }
          ]}>
            <Text style={styles.statusBadgeText}>
              {statuses.find(s => s.id === item.status)?.name}
            </Text>
          </View>
          <View style={[
            styles.priorityBadge,
            { backgroundColor: priorities.find(p => p.id === item.priority)?.color }
          ]}>
            <Text style={styles.priorityBadgeText}>
              {priorities.find(p => p.id === item.priority)?.name}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.todoDetails}>
        <View style={styles.todoDetail}>
          <Ionicons name="calendar-outline" size={16} color="#cccccc" />
          <Text style={styles.todoDetailText}>Due: {item.dueDate}</Text>
        </View>
        <View style={styles.todoDetail}>
          <Ionicons name="time-outline" size={16} color="#cccccc" />
          <Text style={styles.todoDetailText}>{item.estimatedTime}</Text>
        </View>
        <View style={styles.todoDetail}>
          <Ionicons name="folder-outline" size={16} color="#cccccc" />
          <Text style={styles.todoDetailText}>{item.project}</Text>
        </View>
      </View>

      <View style={styles.todoTags}>
        {item.tags.map((tag: string, index: number) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>#{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.todoProgress}>
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>
            {item.actualTime} / {item.estimatedTime}
          </Text>
          <Text style={styles.progressPercentage}>
            {Math.round((parseInt(item.actualTime) / parseInt(item.estimatedTime)) * 100)}%
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[
            styles.progressFill,
            { 
              width: `${Math.min((parseInt(item.actualTime) / parseInt(item.estimatedTime)) * 100, 100)}%`,
              backgroundColor: item.status === 'completed' ? '#28a745' : '#007bff'
            }
          ]} />
        </View>
      </View>

      <View style={styles.todoActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="checkmark-circle" size={16} color="#28a745" />
          <Text style={styles.actionButtonText}>Complete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="create" size={16} color="#007bff" />
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="trash" size={16} color="#dc3545" />
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const filteredTodos = todoItems.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (selectedPriority !== 'all' && item.priority !== selectedPriority) return false;
    if (selectedStatus !== 'all' && item.status !== selectedStatus) return false;
    return true;
  });

  const handleAddTask = () => {
    if (!newTaskText.trim()) {
      Alert.alert('Error', 'Please enter a task description');
      return;
    }

    Alert.alert('Success', 'Task added successfully');
    setNewTaskText('');
  };

  const stats = {
    total: todoItems.length,
    completed: todoItems.filter(item => item.status === 'completed').length,
    inProgress: todoItems.filter(item => item.status === 'in-progress').length,
    pending: todoItems.filter(item => item.status === 'pending').length,
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Personal To-Do Lists</Text>
      <Text style={styles.subtitle}>
        Manage your personal tasks and deadlines
      </Text>

      <View style={styles.statsCard}>
        <Text style={styles.cardTitle}>Task Statistics</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#28a745' }]}>{stats.completed}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#007bff' }]}>{stats.inProgress}</Text>
            <Text style={styles.statLabel}>In Progress</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#ffc107' }]}>{stats.pending}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>
      </View>

      <View style={styles.categoriesCard}>
        <Text style={styles.cardTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoriesContainer}>
            {categories.map((category) => (
              <CategoryButton key={category.id} category={category} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.filtersCard}>
        <View style={styles.filterRow}>
          <Text style={styles.filterTitle}>Priority</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filterContainer}>
              {priorities.map((priority) => (
                <PriorityButton key={priority.id} priority={priority} />
              ))}
            </View>
          </ScrollView>
        </View>
        
        <View style={styles.filterRow}>
          <Text style={styles.filterTitle}>Status</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filterContainer}>
              {statuses.map((status) => (
                <StatusButton key={status.id} status={status} />
              ))}
            </View>
          </ScrollView>
        </View>
      </View>

      <View style={styles.addTaskCard}>
        <Text style={styles.cardTitle}>Add New Task</Text>
        <View style={styles.addTaskInput}>
          <Text style={styles.addTaskPlaceholder}>
            Enter new task description...
          </Text>
        </View>
        <TouchableOpacity style={styles.addTaskButton} onPress={handleAddTask}>
          <Ionicons name="add" size={20} color="#ffffff" />
          <Text style={styles.addTaskButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.todosCard}>
        <Text style={styles.cardTitle}>Tasks ({filteredTodos.length})</Text>
        {filteredTodos.map((item) => (
          <TodoItem key={item.id} item={item} />
        ))}
      </View>

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="checkmark-done" size={24} color="#28a745" />
            <Text style={styles.actionText}>Mark All Done</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="archive" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Archive</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download" size={24} color="#007bff" />
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
          Keep track of your personal tasks and deadlines. Organize by category, 
          priority, and status for better productivity.
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
  categoriesCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  categoriesContainer: {
    flexDirection: 'row',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
  },
  categoryButtonSelected: {
    backgroundColor: '#007bff',
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  categoryTextSelected: {
    color: '#ffffff',
  },
  filtersCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  filterRow: {
    marginBottom: 15,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: 'row',
  },
  priorityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  priorityButtonSelected: {
    backgroundColor: '#007bff',
  },
  priorityIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  priorityText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  priorityTextSelected: {
    color: '#ffffff',
  },
  statusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  statusButtonSelected: {
    backgroundColor: '#007bff',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusTextSelected: {
    color: '#ffffff',
  },
  addTaskCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  addTaskInput: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    minHeight: 50,
    justifyContent: 'center',
  },
  addTaskPlaceholder: {
    color: '#cccccc',
    fontSize: 16,
  },
  addTaskButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    borderRadius: 8,
    padding: 15,
    justifyContent: 'center',
  },
  addTaskButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  todosCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  todoItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  todoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  todoInfo: {
    flex: 1,
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  todoDescription: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
  },
  todoStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 5,
  },
  statusBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  todoDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  todoDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 5,
  },
  todoDetailText: {
    fontSize: 12,
    color: '#cccccc',
    marginLeft: 5,
  },
  todoTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tag: {
    backgroundColor: '#4a4a4a',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 5,
    marginBottom: 5,
  },
  tagText: {
    color: '#007bff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  todoProgress: {
    marginBottom: 10,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  progressText: {
    fontSize: 12,
    color: '#cccccc',
  },
  progressPercentage: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
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
  todoActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4a4a4a',
    borderRadius: 6,
    padding: 8,
    flex: 1,
    marginHorizontal: 2,
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
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

export default ToDoListScreen;

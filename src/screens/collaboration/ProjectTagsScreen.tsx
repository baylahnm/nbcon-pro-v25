import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProjectTagsScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState(null);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#007bff');

  const categories = [
    { id: 'all', name: 'All Tags', icon: 'pricetag', color: '#6c757d' },
    { id: 'project', name: 'Project', icon: 'folder', color: '#007bff' },
    { id: 'priority', name: 'Priority', icon: 'flag', color: '#dc3545' },
    { id: 'status', name: 'Status', icon: 'checkmark-circle', color: '#28a745' },
    { id: 'type', name: 'Type', icon: 'layers', color: '#ffc107' },
    { id: 'location', name: 'Location', icon: 'location', color: '#6f42c1' },
    { id: 'custom', name: 'Custom', icon: 'create', color: '#17a2b8' },
  ];

  const colors = [
    '#007bff', '#28a745', '#dc3545', '#ffc107', '#6f42c1', '#17a2b8', '#6c757d',
    '#fd7e14', '#e83e8c', '#20c997', '#6610f2', '#6f42c1', '#e74c3c', '#f39c12'
  ];

  const tags = [
    {
      id: '1',
      name: 'High Priority',
      category: 'priority',
      color: '#dc3545',
      usage: 15,
      projects: ['Riyadh Tower Construction', 'Emergency Safety Audit'],
      createdDate: '2024-01-15',
      description: 'Urgent projects requiring immediate attention',
    },
    {
      id: '2',
      name: 'Civil Engineering',
      category: 'type',
      color: '#007bff',
      usage: 8,
      projects: ['Riyadh Tower Construction', 'Bridge Inspection'],
      createdDate: '2024-01-10',
      description: 'Civil engineering related projects',
    },
    {
      id: '3',
      name: 'Riyadh',
      category: 'location',
      color: '#28a745',
      usage: 12,
      projects: ['Riyadh Tower Construction', 'Riyadh Metro Project'],
      createdDate: '2024-01-08',
      description: 'Projects located in Riyadh',
    },
    {
      id: '4',
      name: 'In Progress',
      category: 'status',
      color: '#ffc107',
      usage: 20,
      projects: ['Riyadh Tower Construction', 'Jeddah Office MEP Design'],
      createdDate: '2024-01-05',
      description: 'Projects currently in progress',
    },
    {
      id: '5',
      name: 'MEP Design',
      category: 'type',
      color: '#6f42c1',
      usage: 6,
      projects: ['Jeddah Office MEP Design', 'Hospital MEP System'],
      createdDate: '2024-01-12',
      description: 'Mechanical, Electrical, and Plumbing design projects',
    },
    {
      id: '6',
      name: 'Safety Audit',
      category: 'type',
      color: '#17a2b8',
      usage: 4,
      projects: ['Dammam Plant Safety Audit', 'Factory Safety Inspection'],
      createdDate: '2024-01-18',
      description: 'Safety audit and inspection projects',
    },
    {
      id: '7',
      name: 'Completed',
      category: 'status',
      color: '#28a745',
      usage: 25,
      projects: ['Dammam Plant Safety Audit', 'Office Renovation'],
      createdDate: '2024-01-01',
      description: 'Successfully completed projects',
    },
    {
      id: '8',
      name: 'Jeddah',
      category: 'location',
      color: '#fd7e14',
      usage: 7,
      projects: ['Jeddah Office MEP Design', 'Jeddah Port Expansion'],
      createdDate: '2024-01-14',
      description: 'Projects located in Jeddah',
    },
    {
      id: '9',
      name: 'BIM Project',
      category: 'type',
      color: '#e83e8c',
      usage: 3,
      projects: ['NEOM BIM Integration', 'Smart City BIM'],
      createdDate: '2024-01-20',
      description: 'Building Information Modeling projects',
    },
    {
      id: '10',
      name: 'Emergency',
      category: 'priority',
      color: '#e74c3c',
      usage: 2,
      projects: ['Emergency Safety Audit', 'Urgent Repair Work'],
      createdDate: '2024-01-22',
      description: 'Emergency response projects',
    },
  ];

  const projects = [
    {
      id: '1',
      title: 'Riyadh Tower Construction',
      client: 'Saudi Construction Co.',
      status: 'In Progress',
      progress: 45,
      tags: ['High Priority', 'Civil Engineering', 'Riyadh', 'In Progress'],
    },
    {
      id: '2',
      title: 'Jeddah Office MEP Design',
      client: 'Office Solutions Ltd.',
      status: 'Planning',
      progress: 15,
      tags: ['MEP Design', 'Jeddah', 'In Progress'],
    },
    {
      id: '3',
      title: 'Dammam Plant Safety Audit',
      client: 'Industrial Solutions Inc.',
      status: 'Completed',
      progress: 100,
      tags: ['Safety Audit', 'Completed'],
    },
    {
      id: '4',
      title: 'NEOM BIM Integration',
      client: 'NEOM Development',
      status: 'In Progress',
      progress: 30,
      tags: ['BIM Project', 'In Progress'],
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

  const ColorButton = ({ color }: { color: string }) => (
    <TouchableOpacity
      style={[
        styles.colorButton,
        newTagColor === color && styles.colorButtonSelected
      ]}
      onPress={() => setNewTagColor(color)}
    >
      <View style={[styles.colorIndicator, { backgroundColor: color }]} />
    </TouchableOpacity>
  );

  const TagItem = ({ tag }: { tag: any }) => (
    <TouchableOpacity
      style={[
        styles.tagItem,
        selectedTag === tag.id && styles.tagItemSelected
      ]}
      onPress={() => setSelectedTag(tag.id)}
    >
      <View style={styles.tagHeader}>
        <View style={styles.tagInfo}>
          <View style={[styles.tagColorIndicator, { backgroundColor: tag.color }]} />
          <Text style={styles.tagName}>{tag.name}</Text>
        </View>
        <View style={styles.tagUsage}>
          <Text style={styles.usageText}>{tag.usage} uses</Text>
        </View>
      </View>
      
      <Text style={styles.tagDescription}>{tag.description}</Text>
      
      <View style={styles.tagDetails}>
        <View style={styles.tagDetail}>
          <Ionicons name="folder" size={16} color="#cccccc" />
          <Text style={styles.tagDetailText}>
            {categories.find(c => c.id === tag.category)?.name}
          </Text>
        </View>
        <View style={styles.tagDetail}>
          <Ionicons name="calendar" size={16} color="#cccccc" />
          <Text style={styles.tagDetailText}>{tag.createdDate}</Text>
        </View>
        <View style={styles.tagDetail}>
          <Ionicons name="link" size={16} color="#cccccc" />
          <Text style={styles.tagDetailText}>{tag.projects.length} projects</Text>
        </View>
      </View>

      <View style={styles.tagProjects}>
        <Text style={styles.projectsTitle}>Used in:</Text>
        {tag.projects.slice(0, 3).map((project: string, index: number) => (
          <Text key={index} style={styles.projectName}>• {project}</Text>
        ))}
        {tag.projects.length > 3 && (
          <Text style={styles.moreProjects}>+{tag.projects.length - 3} more</Text>
        )}
      </View>

      <View style={styles.tagActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="create" size={16} color="#007bff" />
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="copy" size={16} color="#28a745" />
          <Text style={styles.actionButtonText}>Copy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="trash" size={16} color="#dc3545" />
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const ProjectItem = ({ project }: { project: any }) => (
    <View style={styles.projectItem}>
      <View style={styles.projectHeader}>
        <Text style={styles.projectTitle}>{project.title}</Text>
        <Text style={styles.projectClient}>{project.client}</Text>
      </View>
      
      <View style={styles.projectTags}>
        {project.tags.map((tag: string, index: number) => {
          const tagData = tags.find(t => t.name === tag);
          return (
            <View key={index} style={[styles.projectTag, { backgroundColor: tagData?.color || '#6c757d' }]}>
              <Text style={styles.projectTagText}>{tag}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );

  const filteredTags = tags.filter(tag => {
    if (selectedCategory !== 'all' && tag.category !== selectedCategory) return false;
    return true;
  });

  const handleCreateTag = () => {
    if (!newTagName.trim()) {
      Alert.alert('Error', 'Please enter a tag name');
      return;
    }

    Alert.alert('Success', 'Tag created successfully');
    setNewTagName('');
  };

  const stats = {
    total: tags.length,
    byCategory: categories.reduce((acc, cat) => {
      acc[cat.id] = tags.filter(tag => tag.category === cat.id).length;
      return acc;
    }, {} as any),
    mostUsed: tags.reduce((max, tag) => tag.usage > max.usage ? tag : max, tags[0]),
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Project Tags</Text>
      <Text style={styles.subtitle}>
        Tags for organization
      </Text>

      <View style={styles.statsCard}>
        <Text style={styles.cardTitle}>Tag Statistics</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total Tags</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.mostUsed.usage}</Text>
            <Text style={styles.statLabel}>Most Used</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{projects.length}</Text>
            <Text style={styles.statLabel}>Projects</Text>
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

      <View style={styles.createTagCard}>
        <Text style={styles.cardTitle}>Create New Tag</Text>
        <View style={styles.createTagInput}>
          <Text style={styles.createTagPlaceholder}>
            Enter tag name...
          </Text>
        </View>
        
        <View style={styles.colorSelection}>
          <Text style={styles.colorTitle}>Choose Color:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.colorsContainer}>
              {colors.map((color) => (
                <ColorButton key={color} color={color} />
              ))}
            </View>
          </ScrollView>
        </View>
        
        <TouchableOpacity style={styles.createTagButton} onPress={handleCreateTag}>
          <Ionicons name="add" size={20} color="#ffffff" />
          <Text style={styles.createTagButtonText}>Create Tag</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tagsCard}>
        <Text style={styles.cardTitle}>
          Tags ({filteredTags.length})
        </Text>
        {filteredTags.map((tag) => (
          <TagItem key={tag.id} tag={tag} />
        ))}
      </View>

      <View style={styles.projectsCard}>
        <Text style={styles.cardTitle}>Tagged Projects</Text>
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </View>

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="search" size={24} color="#007bff" />
            <Text style={styles.actionText}>Search Tags</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download" size={24} color="#28a745" />
            <Text style={styles.actionText}>Export Tags</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="copy" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Bulk Copy</Text>
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
          Organize your projects with custom tags. Create categories, assign colors, 
          and track usage across all your projects for better organization.
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
  createTagCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  createTagInput: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    minHeight: 50,
    justifyContent: 'center',
  },
  createTagPlaceholder: {
    color: '#cccccc',
    fontSize: 16,
  },
  colorSelection: {
    marginBottom: 15,
  },
  colorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  colorsContainer: {
    flexDirection: 'row',
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 3,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorButtonSelected: {
    borderColor: '#ffffff',
  },
  colorIndicator: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  createTagButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    borderRadius: 8,
    padding: 15,
    justifyContent: 'center',
  },
  createTagButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  tagsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  tagItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  tagItemSelected: {
    borderColor: '#007bff',
  },
  tagHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tagInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tagColorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  tagName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  tagUsage: {
    alignItems: 'flex-end',
  },
  usageText: {
    color: '#cccccc',
    fontSize: 12,
  },
  tagDescription: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 10,
    lineHeight: 20,
  },
  tagDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tagDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 5,
  },
  tagDetailText: {
    fontSize: 12,
    color: '#cccccc',
    marginLeft: 5,
  },
  tagProjects: {
    marginBottom: 10,
  },
  projectsTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  projectName: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 2,
  },
  moreProjects: {
    fontSize: 12,
    color: '#007bff',
    fontStyle: 'italic',
  },
  tagActions: {
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
  projectsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  projectItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  projectHeader: {
    marginBottom: 10,
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
  projectTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  projectTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 5,
    marginBottom: 5,
  },
  projectTagText: {
    color: '#ffffff',
    fontSize: 10,
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

export default ProjectTagsScreen;

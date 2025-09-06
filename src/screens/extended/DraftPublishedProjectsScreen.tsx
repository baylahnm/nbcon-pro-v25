import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DraftPublishedProjectsScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('drafts');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSort, setSelectedSort] = useState('recent');

  const tabs = [
    { id: 'drafts', name: 'Drafts', count: 5 },
    { id: 'published', name: 'Published', count: 12 },
    { id: 'archived', name: 'Archived', count: 3 },
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'civil', name: 'Civil Engineering' },
    { id: 'mep', name: 'MEP Engineering' },
    { id: 'structural', name: 'Structural Engineering' },
    { id: 'safety', name: 'Safety Engineering' },
    { id: 'environmental', name: 'Environmental Engineering' },
    { id: 'bim', name: 'BIM Engineering' },
    { id: 'surveying', name: 'Surveying' },
  ];

  const statuses = [
    { id: 'all', name: 'All Statuses' },
    { id: 'active', name: 'Active' },
    { id: 'completed', name: 'Completed' },
    { id: 'cancelled', name: 'Cancelled' },
    { id: 'pending', name: 'Pending' },
  ];

  const sortOptions = [
    { id: 'recent', name: 'Most Recent' },
    { id: 'title', name: 'Title A-Z' },
    { id: 'budget', name: 'Budget High-Low' },
    { id: 'deadline', name: 'Deadline' },
  ];

  const draftProjects = [
    {
      id: '1',
      title: 'Site Inspection - Riyadh Project',
      category: 'Civil Engineering',
      status: 'Draft',
      budget: '5,000 - 8,000 SAR',
      location: 'Riyadh, Saudi Arabia',
      duration: '3-5 days',
      created: '2024-01-25',
      modified: '2024-01-25 14:30:15',
      progress: 75,
      description: 'Comprehensive site inspection for new construction project',
      requirements: ['SCE License', '5+ years experience', 'Site safety certification'],
      deliverables: ['Inspection report', 'Photos', 'Recommendations'],
      timeline: '3-5 days',
      specialInstructions: 'Access required during business hours only',
      attachments: ['Site plans', 'Previous reports', 'Safety guidelines'],
      tags: ['inspection', 'construction', 'safety'],
      isUrgent: false,
      isEmergency: false,
      clientNotes: 'Priority on safety compliance',
      engineerNotes: 'Site access provided by client',
      completionNotes: null,
    },
    {
      id: '2',
      title: 'MEP Design - Jeddah Office',
      category: 'MEP Engineering',
      status: 'Draft',
      budget: '15,000 - 25,000 SAR',
      location: 'Jeddah, Saudi Arabia',
      duration: '2-3 weeks',
      created: '2024-01-24',
      modified: '2024-01-24 16:45:22',
      progress: 60,
      description: 'MEP design for new office building',
      requirements: ['SCE License', 'MEP specialization', 'AutoCAD proficiency'],
      deliverables: ['MEP drawings', 'Calculations', 'Specifications'],
      timeline: '2-3 weeks',
      specialInstructions: 'Coordination with architect required',
      attachments: ['Architectural plans', 'Client requirements', 'Code references'],
      tags: ['mep', 'design', 'office'],
      isUrgent: false,
      isEmergency: false,
      clientNotes: 'Focus on energy efficiency',
      engineerNotes: 'Regular updates required',
      completionNotes: null,
    },
    {
      id: '3',
      title: 'Safety Audit - Dammam Plant',
      category: 'Safety Engineering',
      status: 'Draft',
      budget: '8,000 - 12,000 SAR',
      location: 'Dammam, Saudi Arabia',
      duration: '1-2 weeks',
      created: '2024-01-23',
      modified: '2024-01-23 12:20:10',
      progress: 40,
      description: 'Comprehensive safety audit for industrial plant',
      requirements: ['SCE License', 'Safety certification', 'Industrial experience'],
      deliverables: ['Safety report', 'Recommendations', 'Action plan'],
      timeline: '1-2 weeks',
      specialInstructions: 'Full PPE required, restricted areas',
      attachments: ['Plant layout', 'Safety procedures', 'Incident reports'],
      tags: ['safety', 'audit', 'industrial'],
      isUrgent: true,
      isEmergency: false,
      clientNotes: 'Critical for compliance',
      engineerNotes: 'High priority project',
      completionNotes: null,
    },
    {
      id: '4',
      title: 'BIM Modeling - NEOM Project',
      category: 'BIM Engineering',
      status: 'Draft',
      budget: '20,000 - 30,000 SAR',
      location: 'NEOM, Saudi Arabia',
      duration: '3-4 weeks',
      created: '2024-01-22',
      modified: '2024-01-22 18:30:45',
      progress: 25,
      description: '3D BIM modeling for futuristic city project',
      requirements: ['SCE License', 'BIM certification', 'Revit proficiency'],
      deliverables: ['3D model', 'Clash detection', '4D simulation'],
      timeline: '3-4 weeks',
      specialInstructions: 'Cutting-edge technology focus',
      attachments: ['Concept designs', 'Technical specs', 'Innovation guidelines'],
      tags: ['bim', 'modeling', 'neom'],
      isUrgent: false,
      isEmergency: false,
      clientNotes: 'Innovation and sustainability focus',
      engineerNotes: 'Complex project, detailed planning needed',
      completionNotes: null,
    },
    {
      id: '5',
      title: 'Environmental Impact Assessment',
      category: 'Environmental Engineering',
      status: 'Draft',
      budget: '12,000 - 18,000 SAR',
      location: 'Riyadh, Saudi Arabia',
      duration: '2-3 weeks',
      created: '2024-01-21',
      modified: '2024-01-21 10:15:30',
      progress: 50,
      description: 'Environmental impact assessment for new development',
      requirements: ['SCE License', 'Environmental certification', 'Assessment experience'],
      deliverables: ['EIA report', 'Mitigation plan', 'Monitoring program'],
      timeline: '2-3 weeks',
      specialInstructions: 'Strict environmental compliance required',
      attachments: ['Site plans', 'Environmental data', 'Regulatory requirements'],
      tags: ['environmental', 'assessment', 'compliance'],
      isUrgent: false,
      isEmergency: false,
      clientNotes: 'Focus on sustainability',
      engineerNotes: 'Detailed environmental analysis needed',
      completionNotes: null,
    },
  ];

  const publishedProjects = [
    {
      id: '6',
      title: 'Structural Analysis - Riyadh Tower',
      category: 'Structural Engineering',
      status: 'Active',
      budget: '25,000 - 35,000 SAR',
      location: 'Riyadh, Saudi Arabia',
      duration: '4-6 weeks',
      created: '2024-01-20',
      modified: '2024-01-20 09:30:15',
      progress: 80,
      description: 'Structural analysis for high-rise tower',
      requirements: ['SCE License', 'Structural specialization', 'ETABS proficiency'],
      deliverables: ['Structural drawings', 'Calculations', 'Analysis report'],
      timeline: '4-6 weeks',
      specialInstructions: 'Coordination with architect and MEP required',
      attachments: ['Architectural plans', 'Load calculations', 'Code references'],
      tags: ['structural', 'analysis', 'tower'],
      isUrgent: false,
      isEmergency: false,
      clientNotes: 'Focus on seismic design',
      engineerNotes: 'Complex structural system',
      completionNotes: null,
    },
    {
      id: '7',
      title: 'Land Survey - Jeddah Development',
      category: 'Surveying',
      status: 'Completed',
      budget: '8,000 - 12,000 SAR',
      location: 'Jeddah, Saudi Arabia',
      duration: '1-2 weeks',
      created: '2024-01-15',
      modified: '2024-01-15 14:20:10',
      progress: 100,
      description: 'Land surveying for new development project',
      requirements: ['SCE License', 'Surveying certification', 'GPS proficiency'],
      deliverables: ['Survey drawings', 'Topographic map', 'Boundary survey'],
      timeline: '1-2 weeks',
      specialInstructions: 'High accuracy required',
      attachments: ['Site plans', 'Previous surveys', 'GPS data'],
      tags: ['surveying', 'land', 'development'],
      isUrgent: false,
      isEmergency: false,
      clientNotes: 'Accurate measurements critical',
      engineerNotes: 'High precision work',
      completionNotes: 'All requirements met, excellent work',
    },
    {
      id: '8',
      title: 'HSE Management - Dammam Refinery',
      category: 'Safety Engineering',
      status: 'Active',
      budget: '18,000 - 25,000 SAR',
      location: 'Dammam, Saudi Arabia',
      duration: '3-4 weeks',
      created: '2024-01-18',
      modified: '2024-01-18 16:45:22',
      progress: 65,
      description: 'HSE management system for refinery operations',
      requirements: ['SCE License', 'HSE certification', 'Refinery experience'],
      deliverables: ['HSE manual', 'Procedures', 'Training program'],
      timeline: '3-4 weeks',
      specialInstructions: 'Strict safety protocols required',
      attachments: ['Refinery plans', 'Safety procedures', 'Incident reports'],
      tags: ['hse', 'management', 'refinery'],
      isUrgent: true,
      isEmergency: false,
      clientNotes: 'Critical for operations',
      engineerNotes: 'High safety standards required',
      completionNotes: null,
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
      <Text style={[
        styles.tabButtonText,
        selectedTab === tab.id && styles.tabButtonTextSelected
      ]}>
        {tab.name}
      </Text>
      <View style={[
        styles.tabCount,
        selectedTab === tab.id && styles.tabCountSelected
      ]}>
        <Text style={[
          styles.tabCountText,
          selectedTab === tab.id && styles.tabCountTextSelected
        ]}>
          {tab.count}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const CategoryButton = ({ category }: { category: any }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === category.id && styles.categoryButtonSelected
      ]}
      onPress={() => setSelectedCategory(category.id)}
    >
      <Text style={[
        styles.categoryButtonText,
        selectedCategory === category.id && styles.categoryButtonTextSelected
      ]}>
        {category.name}
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

  const SortButton = ({ sort }: { sort: any }) => (
    <TouchableOpacity
      style={[
        styles.sortButton,
        selectedSort === sort.id && styles.sortButtonSelected
      ]}
      onPress={() => setSelectedSort(sort.id)}
    >
      <Text style={[
        styles.sortButtonText,
        selectedSort === sort.id && styles.sortButtonTextSelected
      ]}>
        {sort.name}
      </Text>
    </TouchableOpacity>
  );

  const ProjectItem = ({ project }: { project: any }) => (
    <View style={styles.projectItem}>
      <View style={styles.projectHeader}>
        <View style={styles.projectInfo}>
          <Text style={styles.projectTitle}>{project.title}</Text>
          <Text style={styles.projectCategory}>{project.category}</Text>
          <Text style={styles.projectLocation}>{project.location}</Text>
        </View>
        <View style={styles.projectStatus}>
          <View style={[
            styles.statusBadge,
            { 
              backgroundColor: project.status === 'Draft' ? '#ffc107' : 
                             project.status === 'Active' ? '#007bff' : 
                             project.status === 'Completed' ? '#28a745' : '#dc3545'
            }
          ]}>
            <Text style={styles.statusText}>{project.status}</Text>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="ellipsis-vertical" size={20} color="#cccccc" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.projectDetails}>
        <View style={styles.projectDetail}>
          <Text style={styles.projectDetailLabel}>Budget:</Text>
          <Text style={styles.projectDetailValue}>{project.budget}</Text>
        </View>
        <View style={styles.projectDetail}>
          <Text style={styles.projectDetailLabel}>Duration:</Text>
          <Text style={styles.projectDetailValue}>{project.duration}</Text>
        </View>
        <View style={styles.projectDetail}>
          <Text style={styles.projectDetailLabel}>Progress:</Text>
          <Text style={styles.projectDetailValue}>{project.progress}%</Text>
        </View>
        <View style={styles.projectDetail}>
          <Text style={styles.projectDetailLabel}>Modified:</Text>
          <Text style={styles.projectDetailValue}>{project.modified}</Text>
        </View>
      </View>

      <View style={styles.projectProgress}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${project.progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{project.progress}% Complete</Text>
      </View>

      <View style={styles.projectTags}>
        {project.tags.map((tag: string, index: number) => (
          <View key={index} style={styles.projectTag}>
            <Text style={styles.projectTagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.projectActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="eye" size={16} color="#007bff" />
          <Text style={styles.actionButtonText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="create" size={16} color="#28a745" />
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="copy" size={16} color="#ffc107" />
          <Text style={styles.actionButtonText}>Clone</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="trash" size={16} color="#dc3545" />
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const currentProjects = selectedTab === 'drafts' ? draftProjects : 
                         selectedTab === 'published' ? publishedProjects : 
                         selectedTab === 'archived' ? [] : [];

  const filteredProjects = currentProjects.filter(project => {
    if (selectedCategory !== 'all' && project.category !== categories.find(c => c.id === selectedCategory)?.name) return false;
    if (selectedStatus !== 'all' && project.status !== statuses.find(s => s.id === selectedStatus)?.name) return false;
    return true;
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Draft & Published Projects</Text>
      <Text style={styles.subtitle}>
        Separate draft and live projects
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

      <View style={styles.filtersCard}>
        <Text style={styles.cardTitle}>Filters</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filtersContainer}>
            {categories.map((category) => (
              <CategoryButton key={category.id} category={category} />
            ))}
          </View>
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filtersContainer}>
            {statuses.map((status) => (
              <StatusButton key={status.id} status={status} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.sortCard}>
        <Text style={styles.cardTitle}>Sort By</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.sortContainer}>
            {sortOptions.map((sort) => (
              <SortButton key={sort.id} sort={sort} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.projectsCard}>
        <View style={styles.projectsHeader}>
          <Text style={styles.cardTitle}>
            {filteredProjects.length} Project{filteredProjects.length !== 1 ? 's' : ''}
          </Text>
          <TouchableOpacity style={styles.addProjectButton}>
            <Ionicons name="add" size={20} color="#ffffff" />
            <Text style={styles.addProjectButtonText}>New Project</Text>
          </TouchableOpacity>
        </View>
        {filteredProjects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </View>

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add" size={24} color="#007bff" />
            <Text style={styles.actionText}>Create Draft</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="send" size={24} color="#28a745" />
            <Text style={styles.actionText}>Publish All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="archive" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Archive</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Export</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          Manage your project drafts and published projects separately. 
          Drafts allow you to work on projects before publishing them live.
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    minWidth: 120,
  },
  tabButtonSelected: {
    backgroundColor: '#007bff',
  },
  tabButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 8,
  },
  tabButtonTextSelected: {
    color: '#ffffff',
  },
  tabCount: {
    backgroundColor: '#4a4a4a',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  tabCountSelected: {
    backgroundColor: '#ffffff',
  },
  tabCountText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tabCountTextSelected: {
    color: '#007bff',
  },
  filtersCard: {
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
  filtersContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  categoryButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    minWidth: 120,
    alignItems: 'center',
  },
  categoryButtonSelected: {
    backgroundColor: '#007bff',
  },
  categoryButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  categoryButtonTextSelected: {
    color: '#ffffff',
  },
  statusButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    minWidth: 120,
    alignItems: 'center',
  },
  statusButtonSelected: {
    backgroundColor: '#007bff',
  },
  statusButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusButtonTextSelected: {
    color: '#ffffff',
  },
  sortCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  sortContainer: {
    flexDirection: 'row',
  },
  sortButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    minWidth: 120,
    alignItems: 'center',
  },
  sortButtonSelected: {
    backgroundColor: '#007bff',
  },
  sortButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sortButtonTextSelected: {
    color: '#ffffff',
  },
  projectsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  projectsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  addProjectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 10,
  },
  addProjectButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
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
  projectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  projectCategory: {
    fontSize: 14,
    color: '#007bff',
    marginBottom: 2,
  },
  projectLocation: {
    fontSize: 12,
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
    fontSize: 10,
    fontWeight: 'bold',
  },
  moreButton: {
    backgroundColor: '#4a4a4a',
    borderRadius: 6,
    padding: 8,
  },
  projectDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  projectDetail: {
    width: '50%',
    marginBottom: 5,
  },
  projectDetailLabel: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 2,
  },
  projectDetailValue: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  projectProgress: {
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#4a4a4a',
    borderRadius: 4,
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#cccccc',
    textAlign: 'right',
  },
  projectTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  projectTag: {
    backgroundColor: '#007bff',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 5,
    marginBottom: 5,
  },
  projectTagText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  projectActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
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

export default DraftPublishedProjectsScreen;

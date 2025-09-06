import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const JobCloningScreen: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('exact');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const templates = [
    { id: 'exact', name: 'Exact Copy', description: 'Copy all details exactly' },
    { id: 'template', name: 'Template Copy', description: 'Use as template, modify details' },
    { id: 'partial', name: 'Partial Copy', description: 'Copy specific sections only' },
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
    { id: 'completed', name: 'Completed' },
    { id: 'in-progress', name: 'In Progress' },
    { id: 'cancelled', name: 'Cancelled' },
    { id: 'draft', name: 'Draft' },
  ];

  const previousJobs = [
    {
      id: '1',
      title: 'Site Inspection - Riyadh Project',
      category: 'Civil Engineering',
      status: 'Completed',
      budget: '5,000 SAR',
      location: 'Riyadh, Saudi Arabia',
      duration: '3 days',
      created: '2024-01-20',
      completed: '2024-01-23',
      engineer: 'Ahmed Al-Rashid',
      rating: 4.9,
      description: 'Comprehensive site inspection for new construction project',
      requirements: ['SCE License', '5+ years experience', 'Site safety certification'],
      deliverables: ['Inspection report', 'Photos', 'Recommendations'],
      timeline: '3-5 days',
      budget: '5,000 - 8,000 SAR',
      location: 'Riyadh, Saudi Arabia',
      specialInstructions: 'Access required during business hours only',
      attachments: ['Site plans', 'Previous reports', 'Safety guidelines'],
      tags: ['inspection', 'construction', 'safety'],
      isUrgent: false,
      isEmergency: false,
      clientNotes: 'Priority on safety compliance',
      engineerNotes: 'Site access provided by client',
      completionNotes: 'All requirements met, excellent work',
    },
    {
      id: '2',
      title: 'MEP Design - Jeddah Office',
      category: 'MEP Engineering',
      status: 'In Progress',
      budget: '15,000 SAR',
      location: 'Jeddah, Saudi Arabia',
      duration: '2 weeks',
      created: '2024-01-15',
      completed: null,
      engineer: 'Sarah Al-Mansouri',
      rating: 4.8,
      description: 'MEP design for new office building',
      requirements: ['SCE License', 'MEP specialization', 'AutoCAD proficiency'],
      deliverables: ['MEP drawings', 'Calculations', 'Specifications'],
      timeline: '2-3 weeks',
      budget: '15,000 - 25,000 SAR',
      location: 'Jeddah, Saudi Arabia',
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
      status: 'Completed',
      budget: '8,000 SAR',
      location: 'Dammam, Saudi Arabia',
      duration: '1 week',
      created: '2024-01-10',
      completed: '2024-01-17',
      engineer: 'Omar Al-Zahrani',
      rating: 4.7,
      description: 'Comprehensive safety audit for industrial plant',
      requirements: ['SCE License', 'Safety certification', 'Industrial experience'],
      deliverables: ['Safety report', 'Recommendations', 'Action plan'],
      timeline: '1-2 weeks',
      budget: '8,000 - 12,000 SAR',
      location: 'Dammam, Saudi Arabia',
      specialInstructions: 'Full PPE required, restricted areas',
      attachments: ['Plant layout', 'Safety procedures', 'Incident reports'],
      tags: ['safety', 'audit', 'industrial'],
      isUrgent: true,
      isEmergency: false,
      clientNotes: 'Critical for compliance',
      engineerNotes: 'High priority project',
      completionNotes: 'All safety issues identified and addressed',
    },
    {
      id: '4',
      title: 'BIM Modeling - NEOM Project',
      category: 'BIM Engineering',
      status: 'Draft',
      budget: '20,000 SAR',
      location: 'NEOM, Saudi Arabia',
      duration: '3 weeks',
      created: '2024-01-25',
      completed: null,
      engineer: 'Khalid Al-Mutairi',
      rating: 4.6,
      description: '3D BIM modeling for futuristic city project',
      requirements: ['SCE License', 'BIM certification', 'Revit proficiency'],
      deliverables: ['3D model', 'Clash detection', '4D simulation'],
      timeline: '3-4 weeks',
      budget: '20,000 - 30,000 SAR',
      location: 'NEOM, Saudi Arabia',
      specialInstructions: 'Cutting-edge technology focus',
      attachments: ['Concept designs', 'Technical specs', 'Innovation guidelines'],
      tags: ['bim', 'modeling', 'neom'],
      isUrgent: false,
      isEmergency: false,
      clientNotes: 'Innovation and sustainability focus',
      engineerNotes: 'Complex project, detailed planning needed',
      completionNotes: null,
    },
  ];

  const TemplateCard = ({ template }: { template: any }) => (
    <TouchableOpacity
      style={[
        styles.templateCard,
        selectedTemplate === template.id && styles.templateCardSelected
      ]}
      onPress={() => setSelectedTemplate(template.id)}
    >
      <View style={styles.templateHeader}>
        <Text style={styles.templateName}>{template.name}</Text>
        {selectedTemplate === template.id && (
          <Ionicons name="checkmark-circle" size={20} color="#007bff" />
        )}
      </View>
      <Text style={styles.templateDescription}>{template.description}</Text>
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

  const JobItem = ({ job }: { job: any }) => (
    <TouchableOpacity
      style={[
        styles.jobItem,
        selectedJob === job.id && styles.jobItemSelected
      ]}
      onPress={() => setSelectedJob(job.id)}
    >
      <View style={styles.jobHeader}>
        <View style={styles.jobInfo}>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.jobCategory}>{job.category}</Text>
          <Text style={styles.jobLocation}>{job.location}</Text>
        </View>
        <View style={styles.jobStatus}>
          <View style={[
            styles.statusBadge,
            { 
              backgroundColor: job.status === 'Completed' ? '#28a745' : 
                             job.status === 'In Progress' ? '#007bff' : 
                             job.status === 'Cancelled' ? '#dc3545' : '#ffc107'
            }
          ]}>
            <Text style={styles.statusText}>{job.status}</Text>
          </View>
          {selectedJob === job.id && (
            <Ionicons name="checkmark-circle" size={20} color="#007bff" />
          )}
        </View>
      </View>
      
      <View style={styles.jobDetails}>
        <View style={styles.jobDetail}>
          <Text style={styles.jobDetailLabel}>Budget:</Text>
          <Text style={styles.jobDetailValue}>{job.budget}</Text>
        </View>
        <View style={styles.jobDetail}>
          <Text style={styles.jobDetailLabel}>Duration:</Text>
          <Text style={styles.jobDetailValue}>{job.duration}</Text>
        </View>
        <View style={styles.jobDetail}>
          <Text style={styles.jobDetailLabel}>Engineer:</Text>
          <Text style={styles.jobDetailValue}>{job.engineer}</Text>
        </View>
        <View style={styles.jobDetail}>
          <Text style={styles.jobDetailLabel}>Rating:</Text>
          <Text style={styles.jobDetailValue}>{job.rating}/5</Text>
        </View>
      </View>

      <View style={styles.jobTimeline}>
        <View style={styles.jobTimelineItem}>
          <Text style={styles.jobTimelineLabel}>Created:</Text>
          <Text style={styles.jobTimelineValue}>{job.created}</Text>
        </View>
        {job.completed && (
          <View style={styles.jobTimelineItem}>
            <Text style={styles.jobTimelineLabel}>Completed:</Text>
            <Text style={styles.jobTimelineValue}>{job.completed}</Text>
          </View>
        )}
      </View>

      <View style={styles.jobTags}>
        {job.tags.map((tag: string, index: number) => (
          <View key={index} style={styles.jobTag}>
            <Text style={styles.jobTagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.jobActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="eye" size={16} color="#007bff" />
          <Text style={styles.actionButtonText}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="copy" size={16} color="#28a745" />
          <Text style={styles.actionButtonText}>Clone</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="star" size={16} color="#ffc107" />
          <Text style={styles.actionButtonText}>Rate</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const filteredJobs = previousJobs.filter(job => {
    if (selectedCategory !== 'all' && job.category !== categories.find(c => c.id === selectedCategory)?.name) return false;
    if (selectedStatus !== 'all' && job.status !== statuses.find(s => s.id === selectedStatus)?.name) return false;
    return true;
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Job Cloning</Text>
      <Text style={styles.subtitle}>
        Copy previous job setup into a new post
      </Text>

      <View style={styles.templatesCard}>
        <Text style={styles.cardTitle}>Clone Template</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.templatesContainer}>
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.filtersCard}>
        <Text style={styles.cardTitle}>Filter Jobs</Text>
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

      <View style={styles.jobsCard}>
        <View style={styles.jobsHeader}>
          <Text style={styles.cardTitle}>
            {filteredJobs.length} Previous Job{filteredJobs.length !== 1 ? 's' : ''}
          </Text>
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={20} color="#007bff" />
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
        {filteredJobs.map((job) => (
          <JobItem key={job.id} job={job} />
        ))}
      </View>

      <View style={styles.cloneActionsCard}>
        <Text style={styles.cardTitle}>Clone Actions</Text>
        <View style={styles.cloneActionsGrid}>
          <TouchableOpacity style={styles.cloneActionButton}>
            <Ionicons name="copy" size={24} color="#007bff" />
            <Text style={styles.cloneActionText}>Clone Selected</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cloneActionButton}>
            <Ionicons name="add" size={24} color="#28a745" />
            <Text style={styles.cloneActionText}>Create New</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cloneActionButton}>
            <Ionicons name="star" size={24} color="#ffc107" />
            <Text style={styles.cloneActionText}>Save Template</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cloneActionButton}>
            <Ionicons name="share" size={24} color="#dc3545" />
            <Text style={styles.cloneActionText}>Share Job</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          Clone successful jobs to save time and maintain consistency. 
          You can copy all details or use as a template for new projects.
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
  templatesCard: {
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
  templatesContainer: {
    flexDirection: 'row',
  },
  templateCard: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginRight: 10,
    minWidth: 150,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  templateCardSelected: {
    borderColor: '#007bff',
  },
  templateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  templateName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  templateDescription: {
    fontSize: 12,
    color: '#cccccc',
    lineHeight: 16,
  },
  filtersCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
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
  jobsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  jobsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 10,
  },
  searchButtonText: {
    color: '#007bff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  jobItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  jobItemSelected: {
    borderColor: '#007bff',
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  jobCategory: {
    fontSize: 14,
    color: '#007bff',
    marginBottom: 2,
  },
  jobLocation: {
    fontSize: 12,
    color: '#cccccc',
  },
  jobStatus: {
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
  jobDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  jobDetail: {
    width: '50%',
    marginBottom: 5,
  },
  jobDetailLabel: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 2,
  },
  jobDetailValue: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  jobTimeline: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  jobTimelineItem: {
    marginRight: 20,
  },
  jobTimelineLabel: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 2,
  },
  jobTimelineValue: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  jobTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  jobTag: {
    backgroundColor: '#007bff',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 5,
    marginBottom: 5,
  },
  jobTagText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  jobActions: {
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
  cloneActionsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  cloneActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cloneActionButton: {
    width: '48%',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  cloneActionText: {
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

export default JobCloningScreen;

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BulkJobPostingScreen: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('custom');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('normal');
  const [selectedBudget, setSelectedBudget] = useState('flexible');

  const templates = [
    { id: 'custom', name: 'Custom Template', description: 'Create your own job template' },
    { id: 'inspection', name: 'Site Inspection', description: 'Standard site inspection template' },
    { id: 'mep', name: 'MEP Design', description: 'MEP engineering design template' },
    { id: 'survey', name: 'Land Survey', description: 'Land surveying template' },
    { id: 'safety', name: 'Safety Audit', description: 'Safety compliance audit template' },
    { id: 'bim', name: 'BIM Modeling', description: 'BIM 3D modeling template' },
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

  const priorities = [
    { id: 'low', name: 'Low Priority', color: '#28a745' },
    { id: 'normal', name: 'Normal Priority', color: '#007bff' },
    { id: 'high', name: 'High Priority', color: '#ffc107' },
    { id: 'urgent', name: 'Urgent', color: '#dc3545' },
  ];

  const budgetRanges = [
    { id: 'flexible', name: 'Flexible Budget', description: 'Let engineers propose' },
    { id: 'fixed', name: 'Fixed Budget', description: 'Set specific amount' },
    { id: 'range', name: 'Budget Range', description: 'Set min-max range' },
  ];

  const jobDrafts = [
    {
      id: '1',
      title: 'Site Inspection - Riyadh Project',
      category: 'Civil Engineering',
      priority: 'High',
      budget: '5,000 - 8,000 SAR',
      location: 'Riyadh, Saudi Arabia',
      duration: '3-5 days',
      status: 'Draft',
      created: '2024-01-25',
      engineers: 0,
      applications: 0,
    },
    {
      id: '2',
      title: 'MEP Design - Jeddah Office',
      category: 'MEP Engineering',
      priority: 'Normal',
      budget: '15,000 - 25,000 SAR',
      location: 'Jeddah, Saudi Arabia',
      duration: '2-3 weeks',
      status: 'Draft',
      created: '2024-01-24',
      engineers: 0,
      applications: 0,
    },
    {
      id: '3',
      title: 'Safety Audit - Dammam Plant',
      category: 'Safety Engineering',
      priority: 'Urgent',
      budget: '8,000 - 12,000 SAR',
      location: 'Dammam, Saudi Arabia',
      duration: '1-2 weeks',
      status: 'Draft',
      created: '2024-01-23',
      engineers: 0,
      applications: 0,
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
        styles.priorityButtonText,
        selectedPriority === priority.id && styles.priorityButtonTextSelected
      ]}>
        {priority.name}
      </Text>
    </TouchableOpacity>
  );

  const BudgetButton = ({ budget }: { budget: any }) => (
    <TouchableOpacity
      style={[
        styles.budgetButton,
        selectedBudget === budget.id && styles.budgetButtonSelected
      ]}
      onPress={() => setSelectedBudget(budget.id)}
    >
      <Text style={[
        styles.budgetButtonText,
        selectedBudget === budget.id && styles.budgetButtonTextSelected
      ]}>
        {budget.name}
      </Text>
      <Text style={styles.budgetDescription}>{budget.description}</Text>
    </TouchableOpacity>
  );

  const JobDraftItem = ({ job }: { job: any }) => (
    <View style={styles.jobDraftItem}>
      <View style={styles.jobDraftHeader}>
        <View style={styles.jobDraftInfo}>
          <Text style={styles.jobDraftTitle}>{job.title}</Text>
          <Text style={styles.jobDraftCategory}>{job.category}</Text>
          <Text style={styles.jobDraftLocation}>{job.location}</Text>
        </View>
        <View style={styles.jobDraftStatus}>
          <View style={[styles.statusBadge, { backgroundColor: '#ffc107' }]}>
            <Text style={styles.statusText}>{job.status}</Text>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="ellipsis-vertical" size={20} color="#cccccc" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.jobDraftDetails}>
        <View style={styles.jobDraftDetail}>
          <Text style={styles.jobDraftDetailLabel}>Priority:</Text>
          <Text style={styles.jobDraftDetailValue}>{job.priority}</Text>
        </View>
        <View style={styles.jobDraftDetail}>
          <Text style={styles.jobDraftDetailLabel}>Budget:</Text>
          <Text style={styles.jobDraftDetailValue}>{job.budget}</Text>
        </View>
        <View style={styles.jobDraftDetail}>
          <Text style={styles.jobDraftDetailLabel}>Duration:</Text>
          <Text style={styles.jobDraftDetailValue}>{job.duration}</Text>
        </View>
        <View style={styles.jobDraftDetail}>
          <Text style={styles.jobDraftDetailLabel}>Created:</Text>
          <Text style={styles.jobDraftDetailValue}>{job.created}</Text>
        </View>
      </View>

      <View style={styles.jobDraftStats}>
        <View style={styles.jobDraftStat}>
          <Text style={styles.jobDraftStatValue}>{job.engineers}</Text>
          <Text style={styles.jobDraftStatLabel}>Engineers</Text>
        </View>
        <View style={styles.jobDraftStat}>
          <Text style={styles.jobDraftStatValue}>{job.applications}</Text>
          <Text style={styles.jobDraftStatLabel}>Applications</Text>
        </View>
      </View>

      <View style={styles.jobDraftActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="create" size={16} color="#007bff" />
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="copy" size={16} color="#28a745" />
          <Text style={styles.actionButtonText}>Duplicate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="send" size={16} color="#ffc107" />
          <Text style={styles.actionButtonText}>Publish</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="trash" size={16} color="#dc3545" />
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Bulk Job Posting</Text>
      <Text style={styles.subtitle}>
        Enterprise clients post multiple jobs at once
      </Text>

      <View style={styles.templatesCard}>
        <Text style={styles.cardTitle}>Job Templates</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.templatesContainer}>
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.categoriesCard}>
        <Text style={styles.cardTitle}>Service Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoriesContainer}>
            {categories.map((category) => (
              <CategoryButton key={category.id} category={category} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.priorityCard}>
        <Text style={styles.cardTitle}>Priority Level</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.priorityContainer}>
            {priorities.map((priority) => (
              <PriorityButton key={priority.id} priority={priority} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.budgetCard}>
        <Text style={styles.cardTitle}>Budget Type</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.budgetContainer}>
            {budgetRanges.map((budget) => (
              <BudgetButton key={budget.id} budget={budget} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.draftsCard}>
        <View style={styles.draftsHeader}>
          <Text style={styles.cardTitle}>Job Drafts</Text>
          <TouchableOpacity style={styles.addDraftButton}>
            <Ionicons name="add" size={20} color="#ffffff" />
            <Text style={styles.addDraftButtonText}>New Draft</Text>
          </TouchableOpacity>
        </View>
        {jobDrafts.map((job) => (
          <JobDraftItem key={job.id} job={job} />
        ))}
      </View>

      <View style={styles.bulkActionsCard}>
        <Text style={styles.cardTitle}>Bulk Actions</Text>
        <View style={styles.bulkActionsGrid}>
          <TouchableOpacity style={styles.bulkActionButton}>
            <Ionicons name="add-circle" size={24} color="#007bff" />
            <Text style={styles.bulkActionText}>Add Multiple Jobs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bulkActionButton}>
            <Ionicons name="copy" size={24} color="#28a745" />
            <Text style={styles.bulkActionText}>Duplicate Selected</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bulkActionButton}>
            <Ionicons name="send" size={24} color="#ffc107" />
            <Text style={styles.bulkActionText}>Publish All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bulkActionButton}>
            <Ionicons name="download" size={24} color="#dc3545" />
            <Text style={styles.bulkActionText}>Export Template</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          Create multiple job postings efficiently using templates and bulk actions. 
          Perfect for enterprise clients managing multiple projects.
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
  priorityCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
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
    minWidth: 120,
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
  priorityButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  priorityButtonTextSelected: {
    color: '#ffffff',
  },
  budgetCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  budgetContainer: {
    flexDirection: 'row',
  },
  budgetButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    minWidth: 120,
    alignItems: 'center',
  },
  budgetButtonSelected: {
    backgroundColor: '#007bff',
  },
  budgetButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  budgetButtonTextSelected: {
    color: '#ffffff',
  },
  budgetDescription: {
    color: '#cccccc',
    fontSize: 10,
    textAlign: 'center',
  },
  draftsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  draftsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  addDraftButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 10,
  },
  addDraftButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  jobDraftItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  jobDraftHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  jobDraftInfo: {
    flex: 1,
  },
  jobDraftTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  jobDraftCategory: {
    fontSize: 14,
    color: '#007bff',
    marginBottom: 2,
  },
  jobDraftLocation: {
    fontSize: 12,
    color: '#cccccc',
  },
  jobDraftStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 5,
  },
  statusText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: 'bold',
  },
  moreButton: {
    backgroundColor: '#4a4a4a',
    borderRadius: 6,
    padding: 8,
  },
  jobDraftDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  jobDraftDetail: {
    width: '50%',
    marginBottom: 5,
  },
  jobDraftDetailLabel: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 2,
  },
  jobDraftDetailValue: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  jobDraftStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  jobDraftStat: {
    alignItems: 'center',
  },
  jobDraftStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 2,
  },
  jobDraftStatLabel: {
    fontSize: 10,
    color: '#cccccc',
  },
  jobDraftActions: {
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
  bulkActionsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  bulkActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  bulkActionButton: {
    width: '48%',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  bulkActionText: {
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

export default BulkJobPostingScreen;

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ContentModerationScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  const categories = [
    { id: 'all', name: 'All Content', count: 45 },
    { id: 'profiles', name: 'Profiles', count: 12 },
    { id: 'jobs', name: 'Jobs', count: 18 },
    { id: 'reviews', name: 'Reviews', count: 8 },
    { id: 'messages', name: 'Messages', count: 5 },
    { id: 'forums', name: 'Forums', count: 2 },
  ];

  const priorities = [
    { id: 'all', name: 'All Priorities' },
    { id: 'high', name: 'High Priority' },
    { id: 'medium', name: 'Medium Priority' },
    { id: 'low', name: 'Low Priority' },
  ];

  const flaggedContent = [
    {
      id: '1',
      type: 'Profile',
      title: 'Inappropriate Profile Photo',
      user: 'Ahmed Al-Rashid',
      reason: 'Contains inappropriate content',
      priority: 'High',
      status: 'Pending',
      reportedBy: 'Sarah Al-Mansouri',
      reportedAt: '2 hours ago',
      content: 'Profile photo contains inappropriate imagery',
      category: 'profiles',
    },
    {
      id: '2',
      type: 'Job Post',
      title: 'Suspicious Job Description',
      user: 'Mohammed Al-Zahrani',
      reason: 'Potential scam or misleading information',
      priority: 'High',
      status: 'Under Review',
      reportedBy: 'System Auto-Detection',
      reportedAt: '4 hours ago',
      content: 'Job post contains suspicious payment terms',
      category: 'jobs',
    },
    {
      id: '3',
      type: 'Review',
      title: 'Fake Review',
      user: 'Fatima Al-Shehri',
      reason: 'Suspected fake or paid review',
      priority: 'Medium',
      status: 'Pending',
      reportedBy: 'Khalid Al-Shehri',
      reportedAt: '1 day ago',
      content: 'Review appears to be fake or paid',
      category: 'reviews',
    },
    {
      id: '4',
      type: 'Message',
      title: 'Harassment Report',
      user: 'Omar Al-Mahmoud',
      reason: 'Inappropriate language and harassment',
      priority: 'High',
      status: 'Resolved',
      reportedBy: 'Layla Al-Ahmad',
      reportedAt: '2 days ago',
      content: 'Messages contain inappropriate language',
      category: 'messages',
    },
    {
      id: '5',
      type: 'Forum Post',
      title: 'Spam Content',
      user: 'Hassan Al-Rashid',
      reason: 'Spam or promotional content',
      priority: 'Low',
      status: 'Pending',
      reportedBy: 'Community Report',
      reportedAt: '3 days ago',
      content: 'Forum post is promotional spam',
      category: 'forums',
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
      <Text style={[
        styles.categoryButtonText,
        selectedCategory === category.id && styles.categoryButtonTextSelected
      ]}>
        {category.name}
      </Text>
      <Text style={[
        styles.categoryCount,
        selectedCategory === category.id && styles.categoryCountSelected
      ]}>
        {category.count}
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
      <Text style={[
        styles.priorityButtonText,
        selectedPriority === priority.id && styles.priorityButtonTextSelected
      ]}>
        {priority.name}
      </Text>
    </TouchableOpacity>
  );

  const ContentItem = ({ content }: { content: any }) => (
    <View style={styles.contentItem}>
      <View style={styles.contentHeader}>
        <View style={styles.contentInfo}>
          <Text style={styles.contentTitle}>{content.title}</Text>
          <Text style={styles.contentUser}>by {content.user}</Text>
        </View>
        <View style={styles.contentStatus}>
          <View style={[
            styles.priorityBadge,
            { 
              backgroundColor: content.priority === 'High' ? '#dc3545' : 
                             content.priority === 'Medium' ? '#ffc107' : '#28a745'
            }
          ]}>
            <Text style={styles.priorityText}>{content.priority}</Text>
          </View>
          <View style={[
            styles.statusBadge,
            { 
              backgroundColor: content.status === 'Resolved' ? '#28a745' : 
                             content.status === 'Under Review' ? '#ffc107' : '#dc3545'
            }
          ]}>
            <Text style={styles.statusText}>{content.status}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.contentDetails}>
        <Text style={styles.contentReason}>Reason: {content.reason}</Text>
        <Text style={styles.contentDescription}>{content.content}</Text>
        <View style={styles.contentMeta}>
          <Text style={styles.contentReporter}>Reported by: {content.reportedBy}</Text>
          <Text style={styles.contentTime}>{content.reportedAt}</Text>
        </View>
      </View>

      <View style={styles.contentActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="eye" size={16} color="#007bff" />
          <Text style={styles.actionText}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="checkmark-circle" size={16} color="#28a745" />
          <Text style={styles.actionText}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="close-circle" size={16} color="#dc3545" />
          <Text style={styles.actionText}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="ban" size={16} color="#ffc107" />
          <Text style={styles.actionText}>Suspend User</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const filteredContent = flaggedContent.filter(content => {
    if (selectedCategory !== 'all' && content.category !== selectedCategory) return false;
    if (selectedPriority !== 'all' && content.priority.toLowerCase() !== selectedPriority) return false;
    return true;
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Content Moderation</Text>
      <Text style={styles.subtitle}>
        Queue for flagged profiles, jobs, and reviews
      </Text>

      <View style={styles.statsCard}>
        <Text style={styles.cardTitle}>Moderation Statistics</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>45</Text>
            <Text style={styles.statLabel}>Pending Review</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>23</Text>
            <Text style={styles.statLabel}>Resolved Today</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>High Priority</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>2.3h</Text>
            <Text style={styles.statLabel}>Avg Response</Text>
          </View>
        </View>
      </View>

      <View style={styles.categorySelector}>
        <Text style={styles.selectorTitle}>Content Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoryButtons}>
            {categories.map((category) => (
              <CategoryButton key={category.id} category={category} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.prioritySelector}>
        <Text style={styles.selectorTitle}>Priority Level</Text>
        <View style={styles.priorityButtons}>
          {priorities.map((priority) => (
            <PriorityButton key={priority.id} priority={priority} />
          ))}
        </View>
      </View>

      <View style={styles.contentCard}>
        <Text style={styles.cardTitle}>
          Flagged Content ({filteredContent.length})
        </Text>
        {filteredContent.map((content) => (
          <ContentItem key={content.id} content={content} />
        ))}
      </View>

      <View style={styles.bulkActionsCard}>
        <Text style={styles.cardTitle}>Bulk Actions</Text>
        <View style={styles.bulkActionsGrid}>
          <TouchableOpacity style={styles.bulkActionButton}>
            <Ionicons name="checkmark-circle" size={24} color="#28a745" />
            <Text style={styles.bulkActionText}>Approve Selected</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bulkActionButton}>
            <Ionicons name="close-circle" size={24} color="#dc3545" />
            <Text style={styles.bulkActionText}>Reject Selected</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bulkActionButton}>
            <Ionicons name="ban" size={24} color="#ffc107" />
            <Text style={styles.bulkActionText}>Suspend Users</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bulkActionButton}>
            <Ionicons name="archive" size={24} color="#007bff" />
            <Text style={styles.bulkActionText}>Archive</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings" size={24} color="#007bff" />
            <Text style={styles.actionText}>Moderation Rules</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="analytics" size={24} color="#28a745" />
            <Text style={styles.actionText}>Reports</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="people" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Moderators</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="help-circle" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Help</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          Content moderation helps maintain platform quality and safety. 
          Review flagged content carefully and take appropriate action based on community guidelines.
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
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#cccccc',
    textAlign: 'center',
  },
  categorySelector: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  selectorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  categoryButtons: {
    flexDirection: 'row',
  },
  categoryButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  categoryButtonSelected: {
    backgroundColor: '#007bff',
  },
  categoryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  categoryButtonTextSelected: {
    color: '#ffffff',
  },
  categoryCount: {
    fontSize: 12,
    color: '#cccccc',
  },
  categoryCountSelected: {
    color: '#ffffff',
  },
  prioritySelector: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  priorityButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  priorityButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    width: '48%',
    alignItems: 'center',
  },
  priorityButtonSelected: {
    backgroundColor: '#28a745',
  },
  priorityButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  priorityButtonTextSelected: {
    color: '#ffffff',
  },
  contentCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  contentItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  contentInfo: {
    flex: 1,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  contentUser: {
    fontSize: 14,
    color: '#cccccc',
  },
  contentStatus: {
    alignItems: 'flex-end',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 5,
  },
  priorityText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
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
  contentDetails: {
    marginBottom: 15,
  },
  contentReason: {
    fontSize: 14,
    color: '#ffc107',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contentDescription: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 10,
    lineHeight: 20,
  },
  contentMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentReporter: {
    fontSize: 12,
    color: '#cccccc',
  },
  contentTime: {
    fontSize: 12,
    color: '#cccccc',
  },
  contentActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#555555',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 8,
    width: '48%',
  },
  actionText: {
    color: '#ffffff',
    fontSize: 12,
    marginLeft: 5,
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

export default ContentModerationScreen;

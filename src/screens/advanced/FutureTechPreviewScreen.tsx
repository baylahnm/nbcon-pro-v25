import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FutureTechPreviewScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('features');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const tabs = [
    { id: 'features', name: 'Features', icon: 'star' },
    { id: 'roadmap', name: 'Roadmap', icon: 'map' },
    { id: 'beta', name: 'Beta', icon: 'flask' },
    { id: 'feedback', name: 'Feedback', icon: 'chatbubble' },
  ];

  const statuses = [
    { id: 'all', name: 'All' },
    { id: 'planned', name: 'Planned' },
    { id: 'development', name: 'Development' },
    { id: 'beta', name: 'Beta' },
  ];

  const features = [
    {
      id: '1',
      name: 'AI-Powered Project Optimization',
      description: 'Advanced AI algorithms that automatically optimize project timelines, resource allocation, and cost estimates based on historical data and real-time conditions.',
      category: 'Artificial Intelligence',
      status: 'Development',
      priority: 'High',
      progress: 65,
      estimatedRelease: '2024-06-01',
      betaUsers: 25,
      feedback: 4.2,
      complexity: 'High',
      impact: 'High',
    },
    {
      id: '2',
      name: 'Quantum-Safe Encryption',
      description: 'Next-generation encryption protocols designed to protect against quantum computing threats, ensuring data security for the next decade.',
      category: 'Security',
      status: 'Planned',
      priority: 'Medium',
      progress: 15,
      estimatedRelease: '2024-09-01',
      betaUsers: 0,
      feedback: 0,
      complexity: 'Very High',
      impact: 'Medium',
    },
    {
      id: '3',
      name: 'Holographic Project Visualization',
      description: 'Immersive holographic displays for 3D project visualization, allowing engineers to interact with models in mid-air using gesture controls.',
      category: 'Visualization',
      status: 'Beta',
      priority: 'High',
      progress: 85,
      estimatedRelease: '2024-04-01',
      betaUsers: 12,
      feedback: 4.7,
      complexity: 'Very High',
      impact: 'High',
    },
    {
      id: '4',
      name: 'Autonomous Drone Swarms',
      description: 'Coordinated drone swarms for large-scale site surveys, with AI-powered flight planning and real-time data processing capabilities.',
      category: 'Automation',
      status: 'Development',
      priority: 'Medium',
      progress: 45,
      estimatedRelease: '2024-08-01',
      betaUsers: 8,
      feedback: 4.1,
      complexity: 'High',
      impact: 'Medium',
    },
    {
      id: '5',
      name: 'Neural Interface Controls',
      description: 'Direct brain-computer interface for hands-free operation of complex engineering software, enabling faster and more intuitive design workflows.',
      category: 'Interface',
      status: 'Planned',
      priority: 'Low',
      progress: 5,
      estimatedRelease: '2025-03-01',
      betaUsers: 0,
      feedback: 0,
      complexity: 'Very High',
      impact: 'High',
    },
  ];

  const roadmap = [
    {
      id: '1',
      quarter: 'Q2 2024',
      theme: 'AI Integration',
      features: [
        'AI-Powered Project Optimization',
        'Smart Contract Automation',
        'Predictive Maintenance AI',
      ],
      status: 'In Progress',
      completion: 40,
    },
    {
      id: '2',
      quarter: 'Q3 2024',
      theme: 'Advanced Visualization',
      features: [
        'Holographic Project Visualization',
        'AR/VR Collaboration Tools',
        'Real-time 3D Rendering',
      ],
      status: 'Planned',
      completion: 0,
    },
    {
      id: '3',
      quarter: 'Q4 2024',
      theme: 'Automation & Robotics',
      features: [
        'Autonomous Drone Swarms',
        'Robotic Site Inspection',
        'Automated Quality Control',
      ],
      status: 'Planned',
      completion: 0,
    },
    {
      id: '4',
      quarter: 'Q1 2025',
      theme: 'Next-Gen Security',
      features: [
        'Quantum-Safe Encryption',
        'Zero-Trust Architecture',
        'Advanced Threat Detection',
      ],
      status: 'Planned',
      completion: 0,
    },
  ];

  const betaFeatures = [
    {
      id: '1',
      name: 'Holographic Project Visualization',
      description: 'Test the future of project visualization with immersive holographic displays.',
      version: 'v0.8.2',
      participants: 12,
      feedback: 4.7,
      bugs: 3,
      lastUpdate: '2024-01-25',
      status: 'Active',
    },
    {
      id: '2',
      name: 'AI-Powered Project Optimization',
      description: 'Experience AI-driven project optimization in real-time.',
      version: 'v0.6.1',
      participants: 25,
      feedback: 4.2,
      bugs: 8,
      lastUpdate: '2024-01-24',
      status: 'Active',
    },
    {
      id: '3',
      name: 'Autonomous Drone Swarms',
      description: 'Test coordinated drone operations for site surveys.',
      version: 'v0.4.3',
      participants: 8,
      feedback: 4.1,
      bugs: 12,
      lastUpdate: '2024-01-23',
      status: 'Active',
    },
    {
      id: '4',
      name: 'Neural Interface Controls',
      description: 'Early testing of brain-computer interface controls.',
      version: 'v0.1.0',
      participants: 3,
      feedback: 3.8,
      bugs: 25,
      lastUpdate: '2024-01-20',
      status: 'Limited',
    },
  ];

  const feedback = [
    {
      id: '1',
      feature: 'Holographic Project Visualization',
      user: 'Ahmed Al-Rashid',
      rating: 5,
      comment: 'Absolutely revolutionary! The holographic display makes complex 3D models so much easier to understand and manipulate.',
      date: '2024-01-25',
      status: 'New',
    },
    {
      id: '2',
      feature: 'AI-Powered Project Optimization',
      user: 'Sarah Al-Mansouri',
      rating: 4,
      comment: 'The AI suggestions are very helpful, but sometimes the recommendations seem too aggressive. Great potential though!',
      date: '2024-01-24',
      status: 'Reviewed',
    },
    {
      id: '3',
      feature: 'Autonomous Drone Swarms',
      user: 'Omar Al-Zahrani',
      rating: 4,
      comment: 'The drone coordination is impressive, but we need better weather handling and obstacle avoidance.',
      date: '2024-01-23',
      status: 'In Progress',
    },
    {
      id: '4',
      feature: 'Neural Interface Controls',
      user: 'Fatima Al-Sheikh',
      rating: 3,
      comment: 'Fascinating technology, but very difficult to use. The learning curve is steep and accuracy needs improvement.',
      date: '2024-01-20',
      status: 'Resolved',
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
      <Ionicons 
        name={tab.icon as any} 
        size={20} 
        color={selectedTab === tab.id ? '#ffffff' : '#007bff'} 
      />
      <Text style={[
        styles.tabButtonText,
        selectedTab === tab.id && styles.tabButtonTextSelected
      ]}>
        {tab.name}
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

  const FeatureItem = ({ feature }: { feature: any }) => (
    <View style={styles.featureItem}>
      <View style={styles.featureHeader}>
        <View style={styles.featureInfo}>
          <Text style={styles.featureName}>{feature.name}</Text>
          <Text style={styles.featureCategory}>{feature.category}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: feature.status === 'Beta' ? '#28a745' : 
                           feature.status === 'Development' ? '#007bff' : '#ffc107'
          }
        ]}>
          <Text style={styles.statusText}>{feature.status}</Text>
        </View>
      </View>
      
      <Text style={styles.featureDescription}>{feature.description}</Text>
      
      <View style={styles.featureStats}>
        <View style={styles.featureStat}>
          <Text style={styles.featureStatValue}>{feature.progress}%</Text>
          <Text style={styles.featureStatLabel}>Progress</Text>
        </View>
        <View style={styles.featureStat}>
          <Text style={styles.featureStatValue}>{feature.betaUsers}</Text>
          <Text style={styles.featureStatLabel}>Beta Users</Text>
        </View>
        <View style={styles.featureStat}>
          <Text style={styles.featureStatValue}>
            {feature.feedback > 0 ? feature.feedback.toFixed(1) : 'N/A'}
          </Text>
          <Text style={styles.featureStatLabel}>Rating</Text>
        </View>
        <View style={styles.featureStat}>
          <Text style={styles.featureStatValue}>{feature.priority}</Text>
          <Text style={styles.featureStatLabel}>Priority</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${feature.progress}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>{feature.progress}% Complete</Text>
      </View>

      <View style={styles.featureMeta}>
        <Text style={styles.featureMetaText}>
          Release: {feature.estimatedRelease}
        </Text>
        <Text style={styles.featureMetaText}>
          Complexity: {feature.complexity}
        </Text>
        <Text style={styles.featureMetaText}>
          Impact: {feature.impact}
        </Text>
      </View>
    </View>
  );

  const RoadmapItem = ({ roadmap }: { roadmap: any }) => (
    <View style={styles.roadmapItem}>
      <View style={styles.roadmapHeader}>
        <Text style={styles.roadmapQuarter}>{roadmap.quarter}</Text>
        <Text style={styles.roadmapTheme}>{roadmap.theme}</Text>
      </View>
      
      <View style={styles.roadmapFeatures}>
        {roadmap.features.map((feature: string, index: number) => (
          <View key={index} style={styles.roadmapFeature}>
            <Ionicons name="checkmark-circle" size={16} color="#28a745" />
            <Text style={styles.roadmapFeatureText}>{feature}</Text>
          </View>
        ))}
      </View>

      <View style={styles.roadmapStats}>
        <View style={styles.roadmapStat}>
          <Text style={styles.roadmapStatValue}>{roadmap.completion}%</Text>
          <Text style={styles.roadmapStatLabel}>Complete</Text>
        </View>
        <View style={styles.roadmapStat}>
          <Text style={styles.roadmapStatValue}>{roadmap.features.length}</Text>
          <Text style={styles.roadmapStatLabel}>Features</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: roadmap.status === 'In Progress' ? '#007bff' : '#ffc107'
          }
        ]}>
          <Text style={styles.statusText}>{roadmap.status}</Text>
        </View>
      </View>
    </View>
  );

  const BetaItem = ({ beta }: { beta: any }) => (
    <View style={styles.betaItem}>
      <View style={styles.betaHeader}>
        <Text style={styles.betaName}>{beta.name}</Text>
        <Text style={styles.betaVersion}>{beta.version}</Text>
      </View>
      
      <Text style={styles.betaDescription}>{beta.description}</Text>
      
      <View style={styles.betaStats}>
        <View style={styles.betaStat}>
          <Text style={styles.betaStatValue}>{beta.participants}</Text>
          <Text style={styles.betaStatLabel}>Participants</Text>
        </View>
        <View style={styles.betaStat}>
          <Text style={styles.betaStatValue}>{beta.feedback.toFixed(1)}</Text>
          <Text style={styles.betaStatLabel}>Rating</Text>
        </View>
        <View style={styles.betaStat}>
          <Text style={styles.betaStatValue}>{beta.bugs}</Text>
          <Text style={styles.betaStatLabel}>Bugs</Text>
        </View>
        <View style={styles.betaStat}>
          <Text style={styles.betaStatValue}>{beta.status}</Text>
          <Text style={styles.betaStatLabel}>Status</Text>
        </View>
      </View>

      <Text style={styles.betaLastUpdate}>
        Last Update: {beta.lastUpdate}
      </Text>
    </View>
  );

  const FeedbackItem = ({ feedback }: { feedback: any }) => (
    <View style={styles.feedbackItem}>
      <View style={styles.feedbackHeader}>
        <Text style={styles.feedbackFeature}>{feedback.feature}</Text>
        <View style={[
          styles.statusBadge,
          { 
            backgroundColor: feedback.status === 'New' ? '#007bff' : 
                           feedback.status === 'In Progress' ? '#ffc107' : '#28a745'
          }
        ]}>
          <Text style={styles.statusText}>{feedback.status}</Text>
        </View>
      </View>
      
      <Text style={styles.feedbackUser}>By: {feedback.user}</Text>
      
      <View style={styles.feedbackRating}>
        {[...Array(5)].map((_, index) => (
          <Ionicons
            key={index}
            name={index < feedback.rating ? 'star' : 'star-outline'}
            size={16}
            color="#ffc107"
          />
        ))}
        <Text style={styles.feedbackRatingText}>{feedback.rating}/5</Text>
      </View>
      
      <Text style={styles.feedbackComment}>{feedback.comment}</Text>
      
      <Text style={styles.feedbackDate}>
        {feedback.date}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Future Tech Preview</Text>
      <Text style={styles.subtitle}>
        Preview beta features and roadmap
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

      {selectedTab === 'features' && (
        <View style={styles.featuresCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Future Features</Text>
            <View style={styles.statusFilter}>
              {statuses.map((status) => (
                <StatusButton key={status.id} status={status} />
              ))}
            </View>
          </View>
          {features.map((feature) => (
            <FeatureItem key={feature.id} feature={feature} />
          ))}
        </View>
      )}

      {selectedTab === 'roadmap' && (
        <View style={styles.roadmapCard}>
          <Text style={styles.cardTitle}>Product Roadmap</Text>
          {roadmap.map((roadmap) => (
            <RoadmapItem key={roadmap.id} roadmap={roadmap} />
          ))}
        </View>
      )}

      {selectedTab === 'beta' && (
        <View style={styles.betaCard}>
          <Text style={styles.cardTitle}>Beta Features</Text>
          {betaFeatures.map((beta) => (
            <BetaItem key={beta.id} beta={beta} />
          ))}
        </View>
      )}

      {selectedTab === 'feedback' && (
        <View style={styles.feedbackCard}>
          <Text style={styles.cardTitle}>User Feedback</Text>
          {feedback.map((feedback) => (
            <FeedbackItem key={feedback.id} feedback={feedback} />
          ))}
        </View>
      )}

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="star" size={24} color="#007bff" />
            <Text style={styles.actionText}>Request Feature</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="flask" size={24} color="#28a745" />
            <Text style={styles.actionText}>Join Beta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Give Feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="map" size={24} color="#dc3545" />
            <Text style={styles.actionText}>View Roadmap</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          Future Tech Preview showcases upcoming features, beta testing opportunities, 
          and the product roadmap to keep users informed about the platform's evolution.
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
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    minWidth: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonSelected: {
    backgroundColor: '#007bff',
  },
  tabButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  tabButtonTextSelected: {
    color: '#ffffff',
  },
  featuresCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statusFilter: {
    flexDirection: 'row',
  },
  statusButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 6,
    padding: 6,
    marginLeft: 5,
  },
  statusButtonSelected: {
    backgroundColor: '#007bff',
  },
  statusButtonText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  statusButtonTextSelected: {
    color: '#ffffff',
  },
  featureItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  featureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  featureInfo: {
    flex: 1,
  },
  featureName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  featureCategory: {
    fontSize: 14,
    color: '#007bff',
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
  featureDescription: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 10,
    lineHeight: 20,
  },
  featureStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  featureStat: {
    alignItems: 'center',
  },
  featureStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 2,
  },
  featureStatLabel: {
    fontSize: 10,
    color: '#cccccc',
  },
  progressContainer: {
    marginBottom: 10,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#555555',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: 3,
  },
  progressText: {
    color: '#ffffff',
    fontSize: 12,
    textAlign: 'center',
  },
  featureMeta: {
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  featureMetaText: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 2,
  },
  roadmapCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  roadmapItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  roadmapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  roadmapQuarter: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  roadmapTheme: {
    fontSize: 14,
    color: '#007bff',
  },
  roadmapFeatures: {
    marginBottom: 10,
  },
  roadmapFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  roadmapFeatureText: {
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 8,
  },
  roadmapStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  roadmapStat: {
    alignItems: 'center',
  },
  roadmapStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 2,
  },
  roadmapStatLabel: {
    fontSize: 10,
    color: '#cccccc',
  },
  betaCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  betaItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  betaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  betaName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  betaVersion: {
    fontSize: 14,
    color: '#007bff',
  },
  betaDescription: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 10,
    lineHeight: 20,
  },
  betaStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  betaStat: {
    alignItems: 'center',
  },
  betaStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 2,
  },
  betaStatLabel: {
    fontSize: 10,
    color: '#cccccc',
  },
  betaLastUpdate: {
    fontSize: 12,
    color: '#cccccc',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  feedbackCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  feedbackItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  feedbackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  feedbackFeature: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  feedbackUser: {
    fontSize: 14,
    color: '#007bff',
    marginBottom: 5,
  },
  feedbackRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  feedbackRatingText: {
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 8,
  },
  feedbackComment: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 10,
    lineHeight: 20,
  },
  feedbackDate: {
    fontSize: 12,
    color: '#cccccc',
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
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

export default FutureTechPreviewScreen;

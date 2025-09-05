import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  Animated,
} from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface JobStatus {
  id: string;
  title: string;
  engineer: {
    name: string;
    avatar: string;
    phone: string;
  };
  status: 'pending' | 'accepted' | 'in_progress' | 'review' | 'completed' | 'cancelled';
  progress: number;
  timeline: {
    step: string;
    status: 'completed' | 'active' | 'pending';
    time?: string;
    description: string;
  }[];
  location: string;
  estimatedCompletion: string;
  lastUpdate: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  budget: number;
  category: string;
}

const JobStatusTrackingScreen = () => {
  const [jobs, setJobs] = useState<JobStatus[]>([
    {
      id: '1',
      title: 'Building Survey - NEOM Project',
      engineer: {
        name: 'Ahmed Al-Rashid',
        avatar: '👨‍🔧',
        phone: '+966501234567'
      },
      status: 'in_progress',
      progress: 65,
      timeline: [
        { step: 'Job Posted', status: 'completed', time: '10:00 AM', description: 'Project requirements submitted' },
        { step: 'Engineer Matched', status: 'completed', time: '10:15 AM', description: 'Ahmed Al-Rashid accepted the job' },
        { step: 'On-Site Arrival', status: 'completed', time: '2:30 PM', description: 'Engineer checked in at location' },
        { step: 'Survey in Progress', status: 'active', description: 'Currently conducting site measurements' },
        { step: 'Report Submission', status: 'pending', description: 'Detailed report will be submitted' },
        { step: 'Client Review', status: 'pending', description: 'Final review and approval' },
      ],
      location: 'NEOM, Tabuk Province',
      estimatedCompletion: '6:00 PM Today',
      lastUpdate: '5 minutes ago',
      priority: 'high',
      budget: 2500,
      category: 'Surveying'
    },
    {
      id: '2',
      title: 'MEP System Inspection',
      engineer: {
        name: 'Sara Al-Zahra',
        avatar: '👩‍🔧',
        phone: '+966502345678'
      },
      status: 'review',
      progress: 90,
      timeline: [
        { step: 'Job Posted', status: 'completed', time: 'Yesterday 2:00 PM', description: 'MEP inspection requested' },
        { step: 'Engineer Matched', status: 'completed', time: 'Yesterday 2:20 PM', description: 'Sara Al-Zahra assigned' },
        { step: 'Inspection Complete', status: 'completed', time: 'Today 11:30 AM', description: 'Full MEP system inspected' },
        { step: 'Report Submitted', status: 'completed', time: 'Today 1:15 PM', description: 'Detailed inspection report uploaded' },
        { step: 'Client Review', status: 'active', description: 'Awaiting your approval' },
        { step: 'Payment Release', status: 'pending', description: 'Final payment processing' },
      ],
      location: 'Riyadh Business District',
      estimatedCompletion: 'Completed',
      lastUpdate: '2 hours ago',
      priority: 'medium',
      budget: 1800,
      category: 'MEP'
    }
  ]);

  const [refreshing, setRefreshing] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string>('1');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#FFA500';
      case 'accepted': return '#4CAF50';
      case 'in_progress': return '#2196F3';
      case 'review': return '#FF9800';
      case 'completed': return '#8BC34A';
      case 'cancelled': return '#F44336';
      default: return '#757575';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return '#F44336';
      case 'high': return '#FF9800';
      case 'medium': return '#FFC107';
      case 'low': return '#4CAF50';
      default: return '#757575';
    }
  };

  const selectedJob = jobs.find(job => job.id === selectedJobId);

  const renderJobCard = (job: JobStatus) => (
    <TouchableOpacity
      key={job.id}
      style={[
        styles.jobCard,
        selectedJobId === job.id && styles.selectedJobCard
      ]}
      onPress={() => setSelectedJobId(job.id)}
    >
      <View style={styles.jobCardHeader}>
        <View style={styles.jobTitleRow}>
          <Text style={styles.jobTitle} numberOfLines={1}>{job.title}</Text>
          <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(job.priority) }]}>
            <Text style={styles.priorityText}>{job.priority.toUpperCase()}</Text>
          </View>
        </View>
        <Text style={styles.jobCategory}>{job.category}</Text>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Progress</Text>
          <Text style={styles.progressPercent}>{job.progress}%</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${job.progress}%` }]} />
        </View>
      </View>

      <View style={styles.statusRow}>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(job.status) }]}>
          <Text style={styles.statusText}>{job.status.replace('_', ' ').toUpperCase()}</Text>
        </View>
        <Text style={styles.lastUpdate}>{job.lastUpdate}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderTimelineStep = (step: any, index: number) => {
    const isCompleted = step.status === 'completed';
    const isActive = step.status === 'active';

    return (
      <View key={index} style={styles.timelineStep}>
        <View style={styles.timelineLeft}>
          <View style={[
            styles.timelineIcon,
            isCompleted && styles.timelineIconCompleted,
            isActive && styles.timelineIconActive
          ]}>
            {isCompleted ? (
              <MaterialIcons name="check" size={16} color="#fff" />
            ) : isActive ? (
              <MaterialIcons name="radio-button-checked" size={16} color="#fff" />
            ) : (
              <MaterialIcons name="radio-button-unchecked" size={16} color="#757575" />
            )}
          </View>
          {index < selectedJob!.timeline.length - 1 && (
            <View style={[
              styles.timelineLine,
              isCompleted && styles.timelineLineCompleted
            ]} />
          )}
        </View>
        
        <View style={styles.timelineContent}>
          <View style={styles.timelineHeader}>
            <Text style={[
              styles.timelineStepTitle,
              isActive && styles.activeStepTitle
            ]}>
              {step.step}
            </Text>
            {step.time && (
              <Text style={styles.timelineTime}>{step.time}</Text>
            )}
          </View>
          <Text style={styles.timelineDescription}>{step.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1a1a2e', '#16213e']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Job Tracking</Text>
          <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
            <MaterialIcons name="refresh" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Jobs List */}
        <View style={styles.jobsList}>
          <Text style={styles.sectionTitle}>Active Jobs ({jobs.length})</Text>
          {jobs.map(renderJobCard)}
        </View>

        {/* Selected Job Details */}
        {selectedJob && (
          <View style={styles.jobDetails}>
            <View style={styles.detailsHeader}>
              <Text style={styles.detailsTitle}>{selectedJob.title}</Text>
              <View style={styles.engineerInfo}>
                <Text style={styles.engineerAvatar}>{selectedJob.engineer.avatar}</Text>
                <View style={styles.engineerDetails}>
                  <Text style={styles.engineerName}>{selectedJob.engineer.name}</Text>
                  <Text style={styles.engineerPhone}>{selectedJob.engineer.phone}</Text>
                </View>
                <TouchableOpacity style={styles.callButton}>
                  <MaterialIcons name="call" size={20} color="#4CAF50" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Job Info Cards */}
            <View style={styles.infoCards}>
              <View style={styles.infoCard}>
                <MaterialIcons name="location-on" size={20} color="#2196F3" />
                <Text style={styles.infoLabel}>Location</Text>
                <Text style={styles.infoValue}>{selectedJob.location}</Text>
              </View>
              <View style={styles.infoCard}>
                <MaterialIcons name="schedule" size={20} color="#FF9800" />
                <Text style={styles.infoLabel}>Est. Completion</Text>
                <Text style={styles.infoValue}>{selectedJob.estimatedCompletion}</Text>
              </View>
              <View style={styles.infoCard}>
                <MaterialIcons name="attach-money" size={20} color="#4CAF50" />
                <Text style={styles.infoLabel}>Budget</Text>
                <Text style={styles.infoValue}>{selectedJob.budget} SAR</Text>
              </View>
            </View>

            {/* Timeline */}
            <View style={styles.timelineSection}>
              <Text style={styles.timelineTitle}>Project Timeline</Text>
              <View style={styles.timeline}>
                {selectedJob.timeline.map(renderTimelineStep)}
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.messageButton}>
                <MaterialIcons name="message" size={20} color="#2196F3" />
                <Text style={styles.buttonText}>Message</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.viewReportButton}>
                <MaterialIcons name="description" size={20} color="#fff" />
                <Text style={styles.viewReportButtonText}>View Report</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  header: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  refreshButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  jobsList: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 15,
  },
  jobCard: {
    backgroundColor: '#1e1e3f',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedJobCard: {
    borderColor: '#4CAF50',
    backgroundColor: '#1e2a1e',
  },
  jobCardHeader: {
    marginBottom: 12,
  },
  jobTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
    marginRight: 10,
  },
  jobCategory: {
    fontSize: 12,
    color: '#888',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  progressSection: {
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#ccc',
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  lastUpdate: {
    fontSize: 12,
    color: '#888',
  },
  jobDetails: {
    backgroundColor: '#1e1e3f',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  detailsHeader: {
    marginBottom: 20,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 15,
  },
  engineerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  engineerAvatar: {
    fontSize: 24,
    marginRight: 12,
  },
  engineerDetails: {
    flex: 1,
  },
  engineerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  engineerPhone: {
    fontSize: 14,
    color: '#888',
  },
  callButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#2a2a4a',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 12,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },
  timelineSection: {
    marginBottom: 20,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 15,
  },
  timeline: {
    paddingLeft: 10,
  },
  timelineStep: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 15,
  },
  timelineIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineIconCompleted: {
    backgroundColor: '#4CAF50',
  },
  timelineIconActive: {
    backgroundColor: '#2196F3',
  },
  timelineLine: {
    width: 2,
    height: 30,
    backgroundColor: '#333',
    marginTop: 8,
  },
  timelineLineCompleted: {
    backgroundColor: '#4CAF50',
  },
  timelineContent: {
    flex: 1,
    paddingTop: 4,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  timelineStepTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  activeStepTitle: {
    color: '#2196F3',
  },
  timelineTime: {
    fontSize: 12,
    color: '#888',
  },
  timelineDescription: {
    fontSize: 13,
    color: '#aaa',
    lineHeight: 18,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
    borderRadius: 8,
    paddingVertical: 12,
    marginRight: 10,
  },
  viewReportButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2196F3',
    marginLeft: 8,
  },
  viewReportButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    marginLeft: 8,
  },
});

export default JobStatusTrackingScreen;
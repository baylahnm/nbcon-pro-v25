import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const JobCancellationScreen: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [cancellationType, setCancellationType] = useState('client');

  const cancellationReasons = [
    { id: 'budget', name: 'Budget Constraints', description: 'Project exceeds allocated budget' },
    { id: 'timeline', name: 'Timeline Issues', description: 'Project timeline no longer feasible' },
    { id: 'requirements', name: 'Requirements Changed', description: 'Project requirements have changed' },
    { id: 'engineer', name: 'Engineer Unavailable', description: 'Selected engineer is no longer available' },
    { id: 'client', name: 'Client Decision', description: 'Client decided to cancel the project' },
    { id: 'technical', name: 'Technical Issues', description: 'Technical problems with project scope' },
    { id: 'emergency', name: 'Emergency Situation', description: 'Unexpected emergency requiring cancellation' },
    { id: 'other', name: 'Other', description: 'Other reason not listed above' },
  ];

  const cancellationTypes = [
    { id: 'client', name: 'Client Cancellation', description: 'Cancelled by client' },
    { id: 'engineer', name: 'Engineer Cancellation', description: 'Cancelled by engineer' },
    { id: 'mutual', name: 'Mutual Agreement', description: 'Cancelled by mutual agreement' },
    { id: 'system', name: 'System Cancellation', description: 'Cancelled by system due to policy violation' },
  ];

  const activeJobs = [
    {
      id: '1',
      title: 'Site Inspection - Riyadh Project',
      category: 'Civil Engineering',
      status: 'In Progress',
      budget: '5,000 SAR',
      location: 'Riyadh, Saudi Arabia',
      duration: '3-5 days',
      startDate: '2024-01-20',
      endDate: '2024-01-25',
      engineer: 'Ahmed Al-Rashid',
      client: 'Saudi Construction Co.',
      progress: 60,
      description: 'Comprehensive site inspection for new construction project',
      canCancel: true,
      cancellationFee: 500,
      refundAmount: 4500,
    },
    {
      id: '2',
      title: 'MEP Design - Jeddah Office',
      category: 'MEP Engineering',
      status: 'Confirmed',
      budget: '15,000 SAR',
      location: 'Jeddah, Saudi Arabia',
      duration: '2-3 weeks',
      startDate: '2024-01-25',
      endDate: '2024-02-15',
      engineer: 'Sarah Al-Mansouri',
      client: 'Office Solutions Ltd.',
      progress: 20,
      description: 'MEP design for new office building',
      canCancel: true,
      cancellationFee: 1500,
      refundAmount: 13500,
    },
    {
      id: '3',
      title: 'Safety Audit - Dammam Plant',
      category: 'Safety Engineering',
      status: 'Scheduled',
      budget: '8,000 SAR',
      location: 'Dammam, Saudi Arabia',
      duration: '1-2 weeks',
      startDate: '2024-01-30',
      endDate: '2024-02-10',
      engineer: 'Omar Al-Zahrani',
      client: 'Industrial Solutions Inc.',
      progress: 0,
      description: 'Comprehensive safety audit for industrial plant',
      canCancel: true,
      cancellationFee: 0,
      refundAmount: 8000,
    },
    {
      id: '4',
      title: 'BIM Modeling - NEOM Project',
      category: 'BIM Engineering',
      status: 'In Progress',
      budget: '20,000 SAR',
      location: 'NEOM, Saudi Arabia',
      duration: '3-4 weeks',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      engineer: 'Khalid Al-Mutairi',
      client: 'NEOM Development',
      progress: 40,
      description: '3D BIM modeling for futuristic city project',
      canCancel: false,
      cancellationFee: 0,
      refundAmount: 0,
    },
  ];

  const ReasonButton = ({ reason }: { reason: any }) => (
    <TouchableOpacity
      style={[
        styles.reasonButton,
        selectedReason === reason.id && styles.reasonButtonSelected
      ]}
      onPress={() => setSelectedReason(reason.id)}
    >
      <View style={styles.reasonHeader}>
        <Text style={styles.reasonName}>{reason.name}</Text>
        {selectedReason === reason.id && (
          <Ionicons name="checkmark-circle" size={20} color="#007bff" />
        )}
      </View>
      <Text style={styles.reasonDescription}>{reason.description}</Text>
    </TouchableOpacity>
  );

  const TypeButton = ({ type }: { type: any }) => (
    <TouchableOpacity
      style={[
        styles.typeButton,
        cancellationType === type.id && styles.typeButtonSelected
      ]}
      onPress={() => setCancellationType(type.id)}
    >
      <Text style={[
        styles.typeButtonText,
        cancellationType === type.id && styles.typeButtonTextSelected
      ]}>
        {type.name}
      </Text>
      <Text style={styles.typeDescription}>{type.description}</Text>
    </TouchableOpacity>
  );

  const JobItem = ({ job }: { job: any }) => (
    <TouchableOpacity
      style={[
        styles.jobItem,
        selectedJob === job.id && styles.jobItemSelected,
        !job.canCancel && styles.jobItemDisabled
      ]}
      onPress={() => job.canCancel && setSelectedJob(job.id)}
      disabled={!job.canCancel}
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
              backgroundColor: job.status === 'In Progress' ? '#007bff' : 
                             job.status === 'Confirmed' ? '#28a745' : 
                             job.status === 'Scheduled' ? '#ffc107' : '#6c757d'
            }
          ]}>
            <Text style={styles.statusText}>{job.status}</Text>
          </View>
          {!job.canCancel && (
            <View style={styles.cannotCancelBadge}>
              <Text style={styles.cannotCancelText}>Cannot Cancel</Text>
            </View>
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
          <Text style={styles.jobDetailLabel}>Progress:</Text>
          <Text style={styles.jobDetailValue}>{job.progress}%</Text>
        </View>
      </View>

      <View style={styles.jobTimeline}>
        <View style={styles.jobTimelineItem}>
          <Text style={styles.jobTimelineLabel}>Start Date:</Text>
          <Text style={styles.jobTimelineValue}>{job.startDate}</Text>
        </View>
        <View style={styles.jobTimelineItem}>
          <Text style={styles.jobTimelineLabel}>End Date:</Text>
          <Text style={styles.jobTimelineValue}>{job.endDate}</Text>
        </View>
      </View>

      {job.canCancel && (
        <View style={styles.cancellationInfo}>
          <View style={styles.cancellationInfoItem}>
            <Text style={styles.cancellationInfoLabel}>Cancellation Fee:</Text>
            <Text style={styles.cancellationInfoValue}>{job.cancellationFee} SAR</Text>
          </View>
          <View style={styles.cancellationInfoItem}>
            <Text style={styles.cancellationInfoLabel}>Refund Amount:</Text>
            <Text style={styles.cancellationInfoValue}>{job.refundAmount} SAR</Text>
          </View>
        </View>
      )}

      <View style={styles.jobActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="eye" size={16} color="#007bff" />
          <Text style={styles.actionButtonText}>View Details</Text>
        </TouchableOpacity>
        {job.canCancel && (
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="close-circle" size={16} color="#dc3545" />
            <Text style={styles.actionButtonText}>Cancel Job</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble" size={16} color="#ffc107" />
          <Text style={styles.actionButtonText}>Contact</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const handleCancelJob = () => {
    if (!selectedJob || !selectedReason) {
      Alert.alert('Error', 'Please select a job and cancellation reason');
      return;
    }

    const job = activeJobs.find(j => j.id === selectedJob);
    if (!job) return;

    Alert.alert(
      'Confirm Cancellation',
      `Are you sure you want to cancel "${job.title}"?\n\nThis action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Confirm', 
          style: 'destructive',
          onPress: () => {
            // Handle job cancellation logic here
            Alert.alert('Success', 'Job has been cancelled successfully');
            setSelectedJob(null);
            setSelectedReason('');
            setCustomReason('');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Job Cancellation</Text>
      <Text style={styles.subtitle}>
        Cancel active jobs with reasons
      </Text>

      <View style={styles.jobsCard}>
        <Text style={styles.cardTitle}>Active Jobs</Text>
        {activeJobs.map((job) => (
          <JobItem key={job.id} job={job} />
        ))}
      </View>

      {selectedJob && (
        <>
          <View style={styles.cancellationTypeCard}>
            <Text style={styles.cardTitle}>Cancellation Type</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.typeContainer}>
                {cancellationTypes.map((type) => (
                  <TypeButton key={type.id} type={type} />
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={styles.reasonsCard}>
            <Text style={styles.cardTitle}>Cancellation Reason</Text>
            {cancellationReasons.map((reason) => (
              <ReasonButton key={reason.id} reason={reason} />
            ))}
            
            {selectedReason === 'other' && (
              <View style={styles.customReasonContainer}>
                <Text style={styles.customReasonLabel}>Please specify:</Text>
                <View style={styles.customReasonInput}>
                  <Text style={styles.customReasonPlaceholder}>
                    Enter your cancellation reason...
                  </Text>
                </View>
              </View>
            )}
          </View>

          <View style={styles.cancellationSummaryCard}>
            <Text style={styles.cardTitle}>Cancellation Summary</Text>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Selected Job:</Text>
              <Text style={styles.summaryValue}>
                {activeJobs.find(j => j.id === selectedJob)?.title}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Cancellation Type:</Text>
              <Text style={styles.summaryValue}>
                {cancellationTypes.find(t => t.id === cancellationType)?.name}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Reason:</Text>
              <Text style={styles.summaryValue}>
                {cancellationReasons.find(r => r.id === selectedReason)?.name}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Cancellation Fee:</Text>
              <Text style={styles.summaryValue}>
                {activeJobs.find(j => j.id === selectedJob)?.cancellationFee} SAR
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Refund Amount:</Text>
              <Text style={styles.summaryValue}>
                {activeJobs.find(j => j.id === selectedJob)?.refundAmount} SAR
              </Text>
            </View>
          </View>

          <View style={styles.actionsCard}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={handleCancelJob}
            >
              <Ionicons name="close-circle" size={20} color="#ffffff" />
              <Text style={styles.cancelButtonText}>Cancel Job</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => setSelectedJob(null)}
            >
              <Ionicons name="arrow-back" size={20} color="#007bff" />
              <Text style={styles.backButtonText}>Back to Jobs</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          Job cancellations may incur fees based on project progress and terms. 
          Refunds will be processed according to the cancellation policy.
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
  jobsCard: {
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
  jobItemDisabled: {
    opacity: 0.5,
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
  cannotCancelBadge: {
    backgroundColor: '#dc3545',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  cannotCancelText: {
    color: '#ffffff',
    fontSize: 8,
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
  cancellationInfo: {
    backgroundColor: '#4a4a4a',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  cancellationInfoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  cancellationInfoLabel: {
    fontSize: 12,
    color: '#cccccc',
  },
  cancellationInfoValue: {
    fontSize: 12,
    color: '#ffffff',
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
  cancellationTypeCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  typeContainer: {
    flexDirection: 'row',
  },
  typeButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    minWidth: 120,
    alignItems: 'center',
  },
  typeButtonSelected: {
    backgroundColor: '#007bff',
  },
  typeButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  typeButtonTextSelected: {
    color: '#ffffff',
  },
  typeDescription: {
    color: '#cccccc',
    fontSize: 10,
    textAlign: 'center',
  },
  reasonsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  reasonButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  reasonButtonSelected: {
    borderColor: '#007bff',
  },
  reasonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  reasonName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  reasonDescription: {
    fontSize: 12,
    color: '#cccccc',
    lineHeight: 16,
  },
  customReasonContainer: {
    marginTop: 10,
  },
  customReasonLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  customReasonInput: {
    backgroundColor: '#4a4a4a',
    borderRadius: 8,
    padding: 12,
    minHeight: 80,
    justifyContent: 'center',
  },
  customReasonPlaceholder: {
    color: '#cccccc',
    fontSize: 14,
  },
  cancellationSummaryCard: {
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
  actionsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc3545',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4a4a4a',
    borderRadius: 8,
    padding: 15,
    justifyContent: 'center',
  },
  backButtonText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
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

export default JobCancellationScreen;
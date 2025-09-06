import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const JobReschedulingScreen: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [rescheduleReason, setRescheduleReason] = useState('');
  const [rescheduleType, setRescheduleType] = useState('client');

  const rescheduleReasons = [
    { id: 'weather', name: 'Weather Conditions', description: 'Adverse weather affecting work' },
    { id: 'emergency', name: 'Emergency Situation', description: 'Unexpected emergency requiring reschedule' },
    { id: 'availability', name: 'Availability Change', description: 'Engineer or client availability changed' },
    { id: 'requirements', name: 'Requirements Change', description: 'Project requirements have been modified' },
    { id: 'logistics', name: 'Logistics Issues', description: 'Transportation or equipment issues' },
    { id: 'permit', name: 'Permit Delays', description: 'Required permits not yet approved' },
    { id: 'budget', name: 'Budget Review', description: 'Budget review requiring timeline adjustment' },
    { id: 'other', name: 'Other', description: 'Other reason not listed above' },
  ];

  const rescheduleTypes = [
    { id: 'client', name: 'Client Request', description: 'Reschedule requested by client' },
    { id: 'engineer', name: 'Engineer Request', description: 'Reschedule requested by engineer' },
    { id: 'mutual', name: 'Mutual Agreement', description: 'Reschedule by mutual agreement' },
    { id: 'system', name: 'System Reschedule', description: 'Automatic reschedule due to conflicts' },
  ];

  const timeSlots = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
    '06:00 PM', '07:00 PM', '08:00 PM'
  ];

  const confirmedJobs = [
    {
      id: '1',
      title: 'Site Inspection - Riyadh Project',
      category: 'Civil Engineering',
      status: 'Confirmed',
      budget: '5,000 SAR',
      location: 'Riyadh, Saudi Arabia',
      duration: '3-5 days',
      currentStartDate: '2024-01-25',
      currentEndDate: '2024-01-30',
      currentTime: '09:00 AM',
      engineer: 'Ahmed Al-Rashid',
      client: 'Saudi Construction Co.',
      progress: 0,
      description: 'Comprehensive site inspection for new construction project',
      canReschedule: true,
      rescheduleFee: 200,
      availableDates: ['2024-01-26', '2024-01-27', '2024-01-28', '2024-01-29', '2024-01-30'],
    },
    {
      id: '2',
      title: 'MEP Design - Jeddah Office',
      category: 'MEP Engineering',
      status: 'Confirmed',
      budget: '15,000 SAR',
      location: 'Jeddah, Saudi Arabia',
      duration: '2-3 weeks',
      currentStartDate: '2024-01-30',
      currentEndDate: '2024-02-15',
      currentTime: '10:00 AM',
      engineer: 'Sarah Al-Mansouri',
      client: 'Office Solutions Ltd.',
      progress: 5,
      description: 'MEP design for new office building',
      canReschedule: true,
      rescheduleFee: 500,
      availableDates: ['2024-02-01', '2024-02-02', '2024-02-05', '2024-02-06', '2024-02-07'],
    },
    {
      id: '3',
      title: 'Safety Audit - Dammam Plant',
      category: 'Safety Engineering',
      status: 'Confirmed',
      budget: '8,000 SAR',
      location: 'Dammam, Saudi Arabia',
      duration: '1-2 weeks',
      currentStartDate: '2024-02-01',
      currentEndDate: '2024-02-10',
      currentTime: '08:00 AM',
      engineer: 'Omar Al-Zahrani',
      client: 'Industrial Solutions Inc.',
      progress: 0,
      description: 'Comprehensive safety audit for industrial plant',
      canReschedule: true,
      rescheduleFee: 300,
      availableDates: ['2024-02-02', '2024-02-03', '2024-02-04', '2024-02-05', '2024-02-06'],
    },
    {
      id: '4',
      title: 'BIM Modeling - NEOM Project',
      category: 'BIM Engineering',
      status: 'Confirmed',
      budget: '20,000 SAR',
      location: 'NEOM, Saudi Arabia',
      duration: '3-4 weeks',
      currentStartDate: '2024-02-05',
      currentEndDate: '2024-02-25',
      currentTime: '09:00 AM',
      engineer: 'Khalid Al-Mutairi',
      client: 'NEOM Development',
      progress: 0,
      description: '3D BIM modeling for futuristic city project',
      canReschedule: false,
      rescheduleFee: 0,
      availableDates: [],
    },
  ];

  const ReasonButton = ({ reason }: { reason: any }) => (
    <TouchableOpacity
      style={[
        styles.reasonButton,
        rescheduleReason === reason.id && styles.reasonButtonSelected
      ]}
      onPress={() => setRescheduleReason(reason.id)}
    >
      <View style={styles.reasonHeader}>
        <Text style={styles.reasonName}>{reason.name}</Text>
        {rescheduleReason === reason.id && (
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
        rescheduleType === type.id && styles.typeButtonSelected
      ]}
      onPress={() => setRescheduleType(type.id)}
    >
      <Text style={[
        styles.typeButtonText,
        rescheduleType === type.id && styles.typeButtonTextSelected
      ]}>
        {type.name}
      </Text>
      <Text style={styles.typeDescription}>{type.description}</Text>
    </TouchableOpacity>
  );

  const DateButton = ({ date }: { date: string }) => (
    <TouchableOpacity
      style={[
        styles.dateButton,
        selectedDate === date && styles.dateButtonSelected
      ]}
      onPress={() => setSelectedDate(date)}
    >
      <Text style={[
        styles.dateButtonText,
        selectedDate === date && styles.dateButtonTextSelected
      ]}>
        {new Date(date).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric',
          weekday: 'short'
        })}
      </Text>
    </TouchableOpacity>
  );

  const TimeButton = ({ time }: { time: string }) => (
    <TouchableOpacity
      style={[
        styles.timeButton,
        selectedTime === time && styles.timeButtonSelected
      ]}
      onPress={() => setSelectedTime(time)}
    >
      <Text style={[
        styles.timeButtonText,
        selectedTime === time && styles.timeButtonTextSelected
      ]}>
        {time}
      </Text>
    </TouchableOpacity>
  );

  const JobItem = ({ job }: { job: any }) => (
    <TouchableOpacity
      style={[
        styles.jobItem,
        selectedJob === job.id && styles.jobItemSelected,
        !job.canReschedule && styles.jobItemDisabled
      ]}
      onPress={() => job.canReschedule && setSelectedJob(job.id)}
      disabled={!job.canReschedule}
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
            { backgroundColor: '#28a745' }
          ]}>
            <Text style={styles.statusText}>{job.status}</Text>
          </View>
          {!job.canReschedule && (
            <View style={styles.cannotRescheduleBadge}>
              <Text style={styles.cannotRescheduleText}>Cannot Reschedule</Text>
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
          <Text style={styles.jobTimelineLabel}>Current Start:</Text>
          <Text style={styles.jobTimelineValue}>{job.currentStartDate}</Text>
        </View>
        <View style={styles.jobTimelineItem}>
          <Text style={styles.jobTimelineLabel}>Current End:</Text>
          <Text style={styles.jobTimelineValue}>{job.currentEndDate}</Text>
        </View>
        <View style={styles.jobTimelineItem}>
          <Text style={styles.jobTimelineLabel}>Time:</Text>
          <Text style={styles.jobTimelineValue}>{job.currentTime}</Text>
        </View>
      </View>

      {job.canReschedule && (
        <View style={styles.rescheduleInfo}>
          <View style={styles.rescheduleInfoItem}>
            <Text style={styles.rescheduleInfoLabel}>Reschedule Fee:</Text>
            <Text style={styles.rescheduleInfoValue}>{job.rescheduleFee} SAR</Text>
          </View>
          <View style={styles.rescheduleInfoItem}>
            <Text style={styles.rescheduleInfoLabel}>Available Dates:</Text>
            <Text style={styles.rescheduleInfoValue}>{job.availableDates.length} options</Text>
          </View>
        </View>
      )}

      <View style={styles.jobActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="eye" size={16} color="#007bff" />
          <Text style={styles.actionButtonText}>View Details</Text>
        </TouchableOpacity>
        {job.canReschedule && (
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="calendar" size={16} color="#ffc107" />
            <Text style={styles.actionButtonText}>Reschedule</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble" size={16} color="#28a745" />
          <Text style={styles.actionButtonText}>Contact</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const handleRescheduleJob = () => {
    if (!selectedJob || !selectedDate || !selectedTime || !rescheduleReason) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const job = confirmedJobs.find(j => j.id === selectedJob);
    if (!job) return;

    Alert.alert(
      'Confirm Reschedule',
      `Are you sure you want to reschedule "${job.title}" to ${selectedDate} at ${selectedTime}?\n\nReschedule fee: ${job.rescheduleFee} SAR`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Confirm', 
          style: 'default',
          onPress: () => {
            // Handle job reschedule logic here
            Alert.alert('Success', 'Job has been rescheduled successfully');
            setSelectedJob(null);
            setSelectedDate('');
            setSelectedTime('');
            setRescheduleReason('');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Job Rescheduling</Text>
      <Text style={styles.subtitle}>
        Move confirmed jobs to a new time slot
      </Text>

      <View style={styles.jobsCard}>
        <Text style={styles.cardTitle}>Confirmed Jobs</Text>
        {confirmedJobs.map((job) => (
          <JobItem key={job.id} job={job} />
        ))}
      </View>

      {selectedJob && (
        <>
          <View style={styles.rescheduleTypeCard}>
            <Text style={styles.cardTitle}>Reschedule Type</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.typeContainer}>
                {rescheduleTypes.map((type) => (
                  <TypeButton key={type.id} type={type} />
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={styles.reasonsCard}>
            <Text style={styles.cardTitle}>Reschedule Reason</Text>
            {rescheduleReasons.map((reason) => (
              <ReasonButton key={reason.id} reason={reason} />
            ))}
          </View>

          <View style={styles.dateSelectionCard}>
            <Text style={styles.cardTitle}>Select New Date</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.dateContainer}>
                {confirmedJobs.find(j => j.id === selectedJob)?.availableDates.map((date) => (
                  <DateButton key={date} date={date} />
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={styles.timeSelectionCard}>
            <Text style={styles.cardTitle}>Select New Time</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.timeContainer}>
                {timeSlots.map((time) => (
                  <TimeButton key={time} time={time} />
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={styles.rescheduleSummaryCard}>
            <Text style={styles.cardTitle}>Reschedule Summary</Text>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Selected Job:</Text>
              <Text style={styles.summaryValue}>
                {confirmedJobs.find(j => j.id === selectedJob)?.title}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Current Schedule:</Text>
              <Text style={styles.summaryValue}>
                {confirmedJobs.find(j => j.id === selectedJob)?.currentStartDate} at {confirmedJobs.find(j => j.id === selectedJob)?.currentTime}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>New Schedule:</Text>
              <Text style={styles.summaryValue}>
                {selectedDate} at {selectedTime}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Reschedule Type:</Text>
              <Text style={styles.summaryValue}>
                {rescheduleTypes.find(t => t.id === rescheduleType)?.name}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Reason:</Text>
              <Text style={styles.summaryValue}>
                {rescheduleReasons.find(r => r.id === rescheduleReason)?.name}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Reschedule Fee:</Text>
              <Text style={styles.summaryValue}>
                {confirmedJobs.find(j => j.id === selectedJob)?.rescheduleFee} SAR
              </Text>
            </View>
          </View>

          <View style={styles.actionsCard}>
            <TouchableOpacity 
              style={styles.rescheduleButton}
              onPress={handleRescheduleJob}
            >
              <Ionicons name="calendar" size={20} color="#ffffff" />
              <Text style={styles.rescheduleButtonText}>Reschedule Job</Text>
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
          Job rescheduling may incur fees based on timing and availability. 
          All parties will be notified of the new schedule.
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
  cannotRescheduleBadge: {
    backgroundColor: '#dc3545',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  cannotRescheduleText: {
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
    marginRight: 15,
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
  rescheduleInfo: {
    backgroundColor: '#4a4a4a',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  rescheduleInfoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  rescheduleInfoLabel: {
    fontSize: 12,
    color: '#cccccc',
  },
  rescheduleInfoValue: {
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
  rescheduleTypeCard: {
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
  dateSelectionCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  dateContainer: {
    flexDirection: 'row',
  },
  dateButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    minWidth: 80,
    alignItems: 'center',
  },
  dateButtonSelected: {
    backgroundColor: '#007bff',
  },
  dateButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dateButtonTextSelected: {
    color: '#ffffff',
  },
  timeSelectionCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  timeContainer: {
    flexDirection: 'row',
  },
  timeButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    minWidth: 80,
    alignItems: 'center',
  },
  timeButtonSelected: {
    backgroundColor: '#007bff',
  },
  timeButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  timeButtonTextSelected: {
    color: '#ffffff',
  },
  rescheduleSummaryCard: {
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
  rescheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffc107',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    justifyContent: 'center',
  },
  rescheduleButtonText: {
    color: '#000000',
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

export default JobReschedulingScreen;
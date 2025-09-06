import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, TYPOGRAPHY } from '../../constants';

interface TimeEntry {
  id: string;
  jobId: string;
  jobTitle: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // in minutes
  description: string;
  isActive: boolean;
  isOvertime: boolean;
}

interface TimeTrackingScreenProps {
  onTimeEntry: (entry: TimeEntry) => void;
  onClose: () => void;
}

const TimeTrackingScreen: React.FC<TimeTrackingScreenProps> = ({
  onTimeEntry,
  onClose,
}) => {
  const [currentEntry, setCurrentEntry] = useState<TimeEntry | null>(null);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [selectedJob, setSelectedJob] = useState('');
  const [description, setDescription] = useState('');
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const jobs = [
    { id: '1', title: 'Office Building Design', client: 'ABC Construction' },
    { id: '2', title: 'Residential Complex', client: 'XYZ Developers' },
    { id: '3', title: 'Shopping Mall Renovation', client: 'DEF Properties' },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = () => {
    if (!selectedJob) {
      Alert.alert('Error', 'Please select a job');
      return;
    }

    const job = jobs.find(j => j.id === selectedJob);
    if (!job) return;

    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      jobId: selectedJob,
      jobTitle: job.title,
      startTime: new Date(),
      duration: 0,
      description: description,
      isActive: true,
      isOvertime: false,
    };

    setCurrentEntry(newEntry);
    setIsRunning(true);
    setTimer(0);
  };

  const stopTimer = () => {
    if (!currentEntry) return;

    const endTime = new Date();
    const duration = Math.floor(timer / 60); // Convert to minutes
    const isOvertime = duration > 480; // 8 hours = 480 minutes

    const completedEntry: TimeEntry = {
      ...currentEntry,
      endTime,
      duration,
      isActive: false,
      isOvertime,
    };

    setTimeEntries(prev => [completedEntry, ...prev]);
    onTimeEntry(completedEntry);
    
    setCurrentEntry(null);
    setIsRunning(false);
    setTimer(0);
    setDescription('');
    setSelectedJob('');

    Alert.alert('Success', `Time entry saved: ${formatDuration(duration)}`);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resumeTimer = () => {
    setIsRunning(true);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTotalHoursToday = () => {
    const today = new Date().toDateString();
    const todayEntries = timeEntries.filter(entry => 
      entry.startTime.toDateString() === today && !entry.isActive
    );
    return todayEntries.reduce((total, entry) => total + entry.duration, 0);
  };

  const renderJobOption = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.jobOption,
        selectedJob === item.id && styles.selectedJobOption,
      ]}
      onPress={() => setSelectedJob(item.id)}
    >
      <View style={styles.jobInfo}>
        <Text style={[styles.jobTitle, selectedJob === item.id && styles.selectedJobText]}>
          {item.title}
        </Text>
        <Text style={[styles.jobClient, selectedJob === item.id && styles.selectedJobText]}>
          {item.client}
        </Text>
      </View>
      {selectedJob === item.id && (
        <Ionicons name="checkmark-circle" size={24} color={COLORS.success} />
      )}
    </TouchableOpacity>
  );

  const renderTimeEntry = ({ item }: { item: TimeEntry }) => (
    <View style={styles.timeEntryCard}>
      <View style={styles.entryHeader}>
        <Text style={styles.entryJobTitle}>{item.jobTitle}</Text>
        <Text style={styles.entryDuration}>{formatDuration(item.duration)}</Text>
      </View>
      
      <Text style={styles.entryDescription}>{item.description}</Text>
      
      <View style={styles.entryDetails}>
        <View style={styles.entryDetailRow}>
          <Ionicons name="time" size={16} color={COLORS.textSecondary} />
          <Text style={styles.entryDetailText}>
            {item.startTime.toLocaleTimeString()} - {item.endTime?.toLocaleTimeString()}
          </Text>
        </View>
        
        <View style={styles.entryDetailRow}>
          <Ionicons name="calendar" size={16} color={COLORS.textSecondary} />
          <Text style={styles.entryDetailText}>
            {item.startTime.toLocaleDateString()}
          </Text>
        </View>
        
        {item.isOvertime && (
          <View style={styles.overtimeBadge}>
            <Ionicons name="warning" size={16} color={COLORS.warning} />
            <Text style={styles.overtimeText}>Overtime</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Time Tracking</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Today's Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Today's Summary</Text>
          <View style={styles.summaryStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{formatDuration(getTotalHoursToday())}</Text>
              <Text style={styles.statLabel}>Total Hours</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{timeEntries.filter(e => !e.isActive).length}</Text>
              <Text style={styles.statLabel}>Entries</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {timeEntries.filter(e => e.isOvertime).length}
              </Text>
              <Text style={styles.statLabel}>Overtime</Text>
            </View>
          </View>
        </View>

        {/* Current Timer */}
        {currentEntry && (
          <View style={styles.timerCard}>
            <Text style={styles.timerTitle}>Currently Tracking</Text>
            <Text style={styles.timerDisplay}>{formatTime(timer)}</Text>
            <Text style={styles.timerJob}>{currentEntry.jobTitle}</Text>
            
            <View style={styles.timerControls}>
              {isRunning ? (
                <TouchableOpacity onPress={pauseTimer} style={styles.pauseButton}>
                  <Ionicons name="pause" size={24} color={COLORS.white} />
                  <Text style={styles.controlButtonText}>Pause</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={resumeTimer} style={styles.resumeButton}>
                  <Ionicons name="play" size={24} color={COLORS.white} />
                  <Text style={styles.controlButtonText}>Resume</Text>
                </TouchableOpacity>
              )}
              
              <TouchableOpacity onPress={stopTimer} style={styles.stopButton}>
                <Ionicons name="stop" size={24} color={COLORS.white} />
                <Text style={styles.controlButtonText}>Stop</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Start New Timer */}
        {!currentEntry && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Start New Timer</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Select Job *</Text>
              <FlatList
                data={jobs}
                renderItem={renderJobOption}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="What are you working on?"
                multiline
                numberOfLines={2}
              />
            </View>

            <TouchableOpacity onPress={startTimer} style={styles.startButton}>
              <Ionicons name="play-circle" size={24} color={COLORS.white} />
              <Text style={styles.startButtonText}>Start Timer</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Time Entries History */}
        {timeEntries.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Entries</Text>
            <FlatList
              data={timeEntries.slice(0, 10)} // Show last 10 entries
              renderItem={renderTimeEntry}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  closeButton: {
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  headerSpacer: {
    width: 34, // Same width as close button for centering
  },
  content: {
    flex: 1,
    padding: 20,
  },
  summaryCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 15,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.white,
    opacity: 0.8,
  },
  timerCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  timerTitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 10,
  },
  timerDisplay: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
  },
  timerJob: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 20,
  },
  timerControls: {
    flexDirection: 'row',
    gap: 15,
  },
  pauseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.warning,
    borderRadius: 8,
    gap: 8,
  },
  resumeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.success,
    borderRadius: 8,
    gap: 8,
  },
  stopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.error,
    borderRadius: 8,
    gap: 8,
  },
  controlButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: COLORS.text,
    backgroundColor: COLORS.surface,
  },
  textArea: {
    height: 60,
    textAlignVertical: 'top',
  },
  jobOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedJobOption: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 2,
  },
  jobClient: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  selectedJobText: {
    color: COLORS.primary,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    gap: 10,
  },
  startButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeEntryCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  entryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  entryJobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },
  entryDuration: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  entryDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 10,
  },
  entryDetails: {
    gap: 5,
  },
  entryDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  entryDetailText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  overtimeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.warningLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 4,
  },
  overtimeText: {
    fontSize: 12,
    color: COLORS.warning,
    fontWeight: '500',
  },
});

export default TimeTrackingScreen;
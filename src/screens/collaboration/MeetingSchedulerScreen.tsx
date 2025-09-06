import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, TYPOGRAPHY } from '../../constants';

interface Meeting {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  participants: string[];
  location: string;
  meetingType: 'video' | 'phone' | 'in-person';
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface MeetingSchedulerScreenProps {
  onScheduleMeeting: (meeting: Meeting) => void;
  onClose: () => void;
}

const MeetingSchedulerScreen: React.FC<MeetingSchedulerScreenProps> = ({
  onScheduleMeeting,
  onClose,
}) => {
  const [meetingData, setMeetingData] = useState({
    title: '',
    description: '',
    startTime: new Date(),
    endTime: new Date(Date.now() + 60 * 60 * 1000), // 1 hour later
    participants: [] as string[],
    location: '',
    meetingType: 'video' as 'video' | 'phone' | 'in-person',
  });

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [newParticipant, setNewParticipant] = useState('');
  const [scheduledMeetings, setScheduledMeetings] = useState<Meeting[]>([]);

  const meetingTypes = [
    { id: 'video', name: 'Video Call', icon: 'videocam' },
    { id: 'phone', name: 'Phone Call', icon: 'call' },
    { id: 'in-person', name: 'In-Person', icon: 'location' },
  ];

  const addParticipant = () => {
    if (newParticipant.trim()) {
      setMeetingData(prev => ({
        ...prev,
        participants: [...prev.participants, newParticipant.trim()],
      }));
      setNewParticipant('');
    }
  };

  const removeParticipant = (index: number) => {
    setMeetingData(prev => ({
      ...prev,
      participants: prev.participants.filter((_, i) => i !== index),
    }));
  };

  const handleScheduleMeeting = () => {
    if (!meetingData.title.trim()) {
      Alert.alert('Error', 'Please enter a meeting title');
      return;
    }

    if (meetingData.startTime >= meetingData.endTime) {
      Alert.alert('Error', 'End time must be after start time');
      return;
    }

    if (meetingData.participants.length === 0) {
      Alert.alert('Error', 'Please add at least one participant');
      return;
    }

    const meeting: Meeting = {
      id: Date.now().toString(),
      ...meetingData,
      status: 'scheduled',
    };

    setScheduledMeetings(prev => [...prev, meeting]);
    onScheduleMeeting(meeting);
    Alert.alert('Success', 'Meeting scheduled successfully');
    
    // Reset form
    setMeetingData({
      title: '',
      description: '',
      startTime: new Date(),
      endTime: new Date(Date.now() + 60 * 60 * 1000),
      participants: [],
      location: '',
      meetingType: 'video',
    });
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderMeetingType = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.meetingTypeCard,
        meetingData.meetingType === item.id && styles.activeMeetingType,
      ]}
      onPress={() => setMeetingData(prev => ({ ...prev, meetingType: item.id }))}
    >
      <Ionicons
        name={item.icon as any}
        size={24}
        color={meetingData.meetingType === item.id ? COLORS.white : COLORS.primary}
      />
      <Text
        style={[
          styles.meetingTypeText,
          meetingData.meetingType === item.id && styles.activeMeetingTypeText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderScheduledMeeting = ({ item }: { item: Meeting }) => (
    <View style={styles.scheduledMeetingCard}>
      <View style={styles.meetingHeader}>
        <Text style={styles.meetingTitle}>{item.title}</Text>
        <View style={[styles.statusBadge, styles[`status${item.status}`]]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.meetingDetails}>
        <View style={styles.meetingDetailRow}>
          <Ionicons name="time" size={16} color={COLORS.textSecondary} />
          <Text style={styles.meetingDetailText}>
            {formatDateTime(item.startTime)} - {formatDateTime(item.endTime)}
          </Text>
        </View>
        
        {item.location && (
          <View style={styles.meetingDetailRow}>
            <Ionicons name="location" size={16} color={COLORS.textSecondary} />
            <Text style={styles.meetingDetailText}>{item.location}</Text>
          </View>
        )}
        
        <View style={styles.meetingDetailRow}>
          <Ionicons name="people" size={16} color={COLORS.textSecondary} />
          <Text style={styles.meetingDetailText}>
            {item.participants.length} participant(s)
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Schedule Meeting</Text>
        <TouchableOpacity onPress={handleScheduleMeeting} style={styles.scheduleButton}>
          <Text style={styles.scheduleButtonText}>Schedule</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Meeting Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meeting Details</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Meeting Title *</Text>
            <TextInput
              style={styles.input}
              value={meetingData.title}
              onChangeText={(text) => setMeetingData(prev => ({ ...prev, title: text }))}
              placeholder="Enter meeting title"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={meetingData.description}
              onChangeText={(text) => setMeetingData(prev => ({ ...prev, description: text }))}
              placeholder="Meeting description"
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        {/* Meeting Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meeting Type</Text>
          <FlatList
            data={meetingTypes}
            renderItem={renderMeetingType}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.meetingTypesList}
          />
        </View>

        {/* Date & Time */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Date & Time</Text>
          
          <View style={styles.dateTimeRow}>
            <View style={styles.dateTimeInput}>
              <Text style={styles.label}>Start Time *</Text>
              <TouchableOpacity
                style={styles.dateTimeButton}
                onPress={() => setShowStartDatePicker(true)}
              >
                <Ionicons name="calendar" size={20} color={COLORS.primary} />
                <Text style={styles.dateTimeText}>
                  {formatDateTime(meetingData.startTime)}
                </Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.dateTimeInput}>
              <Text style={styles.label}>End Time *</Text>
              <TouchableOpacity
                style={styles.dateTimeButton}
                onPress={() => setShowEndDatePicker(true)}
              >
                <Ionicons name="calendar" size={20} color={COLORS.primary} />
                <Text style={styles.dateTimeText}>
                  {formatDateTime(meetingData.endTime)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <TextInput
            style={styles.input}
            value={meetingData.location}
            onChangeText={(text) => setMeetingData(prev => ({ ...prev, location: text }))}
            placeholder="Meeting location or video call link"
          />
        </View>

        {/* Participants */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Participants</Text>
          
          <View style={styles.participantInput}>
            <TextInput
              style={[styles.input, styles.participantTextInput]}
              value={newParticipant}
              onChangeText={setNewParticipant}
              placeholder="Enter participant email"
              keyboardType="email-address"
            />
            <TouchableOpacity onPress={addParticipant} style={styles.addParticipantButton}>
              <Ionicons name="add" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          {meetingData.participants.length > 0 && (
            <View style={styles.participantsList}>
              {meetingData.participants.map((participant, index) => (
                <View key={index} style={styles.participantItem}>
                  <Text style={styles.participantText}>{participant}</Text>
                  <TouchableOpacity onPress={() => removeParticipant(index)}>
                    <Ionicons name="close-circle" size={20} color={COLORS.error} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Scheduled Meetings */}
        {scheduledMeetings.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Scheduled Meetings</Text>
            <FlatList
              data={scheduledMeetings}
              renderItem={renderScheduledMeeting}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* Date/Time Pickers */}
        {showStartDatePicker && (
          <DateTimePicker
            value={meetingData.startTime}
            mode="datetime"
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => {
              setShowStartDatePicker(false);
              if (selectedDate) {
                setMeetingData(prev => ({ ...prev, startTime: selectedDate }));
              }
            }}
          />
        )}

        {showEndDatePicker && (
          <DateTimePicker
            value={meetingData.endTime}
            mode="datetime"
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => {
              setShowEndDatePicker(false);
              if (selectedDate) {
                setMeetingData(prev => ({ ...prev, endTime: selectedDate }));
              }
            }}
          />
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
  scheduleButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },
  scheduleButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
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
    marginBottom: 5,
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
    height: 80,
    textAlignVertical: 'top',
  },
  meetingTypesList: {
    gap: 10,
  },
  meetingTypeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 10,
    minWidth: 120,
  },
  activeMeetingType: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  meetingTypeText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.primary,
  },
  activeMeetingTypeText: {
    color: COLORS.white,
  },
  dateTimeRow: {
    flexDirection: 'row',
    gap: 15,
  },
  dateTimeInput: {
    flex: 1,
  },
  dateTimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 10,
  },
  dateTimeText: {
    fontSize: 16,
    color: COLORS.text,
    flex: 1,
  },
  participantInput: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  participantTextInput: {
    flex: 1,
  },
  addParticipantButton: {
    padding: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  participantsList: {
    gap: 10,
  },
  participantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  participantText: {
    fontSize: 14,
    color: COLORS.text,
    flex: 1,
  },
  scheduledMeetingCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  meetingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  meetingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusscheduled: {
    backgroundColor: COLORS.warningLight,
  },
  statuscompleted: {
    backgroundColor: COLORS.successLight,
  },
  statuscancelled: {
    backgroundColor: COLORS.errorLight,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.text,
  },
  meetingDetails: {
    gap: 5,
  },
  meetingDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  meetingDetailText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    flex: 1,
  },
});

export default MeetingSchedulerScreen;

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EngineerAvailabilityCalendarScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [availabilityType, setAvailabilityType] = useState('available');
  const [selectedWeek, setSelectedWeek] = useState(0);

  const availabilityTypes = [
    { id: 'available', name: 'Available', color: '#28a745', description: 'Open for new jobs' },
    { id: 'busy', name: 'Busy', color: '#ffc107', description: 'Working on existing project' },
    { id: 'unavailable', name: 'Unavailable', color: '#dc3545', description: 'Not accepting new work' },
    { id: 'break', name: 'Break', color: '#6c757d', description: 'Personal time off' },
  ];

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Generate calendar data for current week + 3 weeks ahead
  const generateCalendarData = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + (selectedWeek * 7));
    
    const calendarData = [];
    for (let week = 0; week < 4; week++) {
      const weekData = [];
      for (let day = 0; day < 7; day++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + (week * 7) + day);
        weekData.push({
          date: date.toISOString().split('T')[0],
          day: weekDays[day],
          dayNumber: date.getDate(),
          month: months[date.getMonth()],
          isToday: date.toDateString() === today.toDateString(),
          isPast: date < today,
        });
      }
      calendarData.push(weekData);
    }
    return calendarData;
  };

  const calendarData = generateCalendarData();

  const availabilityData = {
    '2024-01-25': {
      '08:00': 'available',
      '09:00': 'available',
      '10:00': 'busy',
      '11:00': 'busy',
      '12:00': 'break',
      '13:00': 'break',
      '14:00': 'available',
      '15:00': 'available',
      '16:00': 'busy',
      '17:00': 'busy',
      '18:00': 'unavailable',
      '19:00': 'unavailable',
      '20:00': 'unavailable',
    },
    '2024-01-26': {
      '08:00': 'available',
      '09:00': 'available',
      '10:00': 'available',
      '11:00': 'available',
      '12:00': 'break',
      '13:00': 'break',
      '14:00': 'available',
      '15:00': 'available',
      '16:00': 'available',
      '17:00': 'available',
      '18:00': 'available',
      '19:00': 'available',
      '20:00': 'unavailable',
    },
    '2024-01-27': {
      '08:00': 'unavailable',
      '09:00': 'unavailable',
      '10:00': 'unavailable',
      '11:00': 'unavailable',
      '12:00': 'unavailable',
      '13:00': 'unavailable',
      '14:00': 'unavailable',
      '15:00': 'unavailable',
      '16:00': 'unavailable',
      '17:00': 'unavailable',
      '18:00': 'unavailable',
      '19:00': 'unavailable',
      '20:00': 'unavailable',
    },
  };

  const TypeButton = ({ type }: { type: any }) => (
    <TouchableOpacity
      style={[
        styles.typeButton,
        availabilityType === type.id && styles.typeButtonSelected
      ]}
      onPress={() => setAvailabilityType(type.id)}
    >
      <View style={[styles.typeIndicator, { backgroundColor: type.color }]} />
      <Text style={[
        styles.typeButtonText,
        availabilityType === type.id && styles.typeButtonTextSelected
      ]}>
        {type.name}
      </Text>
    </TouchableOpacity>
  );

  const TimeSlotButton = ({ time }: { time: string }) => {
    const currentAvailability = selectedDate ? availabilityData[selectedDate]?.[time] : null;
    const isSelected = selectedTimeSlot === time;
    
    return (
      <TouchableOpacity
        style={[
          styles.timeSlotButton,
          isSelected && styles.timeSlotButtonSelected,
          currentAvailability && styles[`timeSlot${currentAvailability.charAt(0).toUpperCase() + currentAvailability.slice(1)}`]
        ]}
        onPress={() => setSelectedTimeSlot(time)}
      >
        <Text style={[
          styles.timeSlotText,
          isSelected && styles.timeSlotTextSelected
        ]}>
          {time}
        </Text>
        {currentAvailability && (
          <View style={[
            styles.availabilityIndicator,
            { backgroundColor: availabilityTypes.find(t => t.id === currentAvailability)?.color }
          ]} />
        )}
      </TouchableOpacity>
    );
  };

  const CalendarDay = ({ day }: { day: any }) => (
    <TouchableOpacity
      style={[
        styles.calendarDay,
        day.isToday && styles.calendarDayToday,
        day.isPast && styles.calendarDayPast,
        selectedDate === day.date && styles.calendarDaySelected
      ]}
      onPress={() => !day.isPast && setSelectedDate(day.date)}
      disabled={day.isPast}
    >
      <Text style={[
        styles.calendarDayText,
        day.isToday && styles.calendarDayTextToday,
        day.isPast && styles.calendarDayTextPast,
        selectedDate === day.date && styles.calendarDayTextSelected
      ]}>
        {day.day}
      </Text>
      <Text style={[
        styles.calendarDayNumber,
        day.isToday && styles.calendarDayNumberToday,
        day.isPast && styles.calendarDayNumberPast,
        selectedDate === day.date && styles.calendarDayNumberSelected
      ]}>
        {day.dayNumber}
      </Text>
      {day.date in availabilityData && (
        <View style={styles.availabilityDots}>
          {Object.values(availabilityData[day.date]).slice(0, 3).map((status, index) => (
            <View
              key={index}
              style={[
                styles.availabilityDot,
                { backgroundColor: availabilityTypes.find(t => t.id === status)?.color }
              ]}
            />
          ))}
        </View>
      )}
    </TouchableOpacity>
  );

  const handleSetAvailability = () => {
    if (!selectedDate || !selectedTimeSlot) {
      Alert.alert('Error', 'Please select a date and time slot');
      return;
    }

    Alert.alert(
      'Set Availability',
      `Set ${selectedDate} at ${selectedTimeSlot} as ${availabilityTypes.find(t => t.id === availabilityType)?.name.toLowerCase()}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Confirm', 
          style: 'default',
          onPress: () => {
            // Handle availability setting logic here
            Alert.alert('Success', 'Availability updated successfully');
            setSelectedTimeSlot('');
          }
        }
      ]
    );
  };

  const handleBulkSetAvailability = () => {
    if (!selectedDate) {
      Alert.alert('Error', 'Please select a date first');
      return;
    }

    Alert.alert(
      'Bulk Set Availability',
      `Set entire day ${selectedDate} as ${availabilityTypes.find(t => t.id === availabilityType)?.name.toLowerCase()}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Confirm', 
          style: 'default',
          onPress: () => {
            // Handle bulk availability setting logic here
            Alert.alert('Success', 'Day availability updated successfully');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Engineer Availability Calendar</Text>
      <Text style={styles.subtitle}>
        Engineers set availability blocks
      </Text>

      <View style={styles.availabilityTypesCard}>
        <Text style={styles.cardTitle}>Availability Types</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.typesContainer}>
            {availabilityTypes.map((type) => (
              <TypeButton key={type.id} type={type} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.calendarCard}>
        <View style={styles.calendarHeader}>
          <Text style={styles.cardTitle}>Calendar View</Text>
          <View style={styles.weekNavigation}>
            <TouchableOpacity 
              style={styles.navButton}
              onPress={() => setSelectedWeek(Math.max(0, selectedWeek - 1))}
            >
              <Ionicons name="chevron-back" size={20} color="#007bff" />
            </TouchableOpacity>
            <Text style={styles.weekText}>Week {selectedWeek + 1}</Text>
            <TouchableOpacity 
              style={styles.navButton}
              onPress={() => setSelectedWeek(Math.min(3, selectedWeek + 1))}
            >
              <Ionicons name="chevron-forward" size={20} color="#007bff" />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.calendarGrid}>
          {calendarData[selectedWeek].map((day, index) => (
            <CalendarDay key={index} day={day} />
          ))}
        </View>
      </View>

      {selectedDate && (
        <>
          <View style={styles.timeSlotsCard}>
            <Text style={styles.cardTitle}>Time Slots - {new Date(selectedDate).toLocaleDateString()}</Text>
            <View style={styles.timeSlotsGrid}>
              {timeSlots.map((time) => (
                <TimeSlotButton key={time} time={time} />
              ))}
            </View>
          </View>

          <View style={styles.availabilityActionsCard}>
            <Text style={styles.cardTitle}>Availability Actions</Text>
            <TouchableOpacity 
              style={styles.setAvailabilityButton}
              onPress={handleSetAvailability}
            >
              <Ionicons name="time" size={20} color="#ffffff" />
              <Text style={styles.setAvailabilityButtonText}>Set Time Slot</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.bulkSetButton}
              onPress={handleBulkSetAvailability}
            >
              <Ionicons name="calendar" size={20} color="#007bff" />
              <Text style={styles.bulkSetButtonText}>Set Entire Day</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.availabilitySummaryCard}>
            <Text style={styles.cardTitle}>Availability Summary</Text>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Selected Date:</Text>
              <Text style={styles.summaryValue}>
                {new Date(selectedDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Selected Time:</Text>
              <Text style={styles.summaryValue}>
                {selectedTimeSlot || 'Not selected'}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Availability Type:</Text>
              <Text style={styles.summaryValue}>
                {availabilityTypes.find(t => t.id === availabilityType)?.name}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Description:</Text>
              <Text style={styles.summaryValue}>
                {availabilityTypes.find(t => t.id === availabilityType)?.description}
              </Text>
            </View>
          </View>
        </>
      )}

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="copy" size={24} color="#007bff" />
            <Text style={styles.actionText}>Copy Week</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download" size={24} color="#28a745" />
            <Text style={styles.actionText}>Export</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="refresh" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          Set your availability to help clients find you for jobs. 
          Update your calendar regularly to ensure accurate job matching.
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
  availabilityTypesCard: {
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
  typesContainer: {
    flexDirection: 'row',
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    minWidth: 120,
  },
  typeButtonSelected: {
    backgroundColor: '#007bff',
  },
  typeIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  typeButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  typeButtonTextSelected: {
    color: '#ffffff',
  },
  calendarCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  weekNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 6,
    padding: 8,
    marginHorizontal: 5,
  },
  weekText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  calendarGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calendarDay: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    minWidth: 40,
    marginHorizontal: 2,
  },
  calendarDayToday: {
    backgroundColor: '#007bff',
  },
  calendarDayPast: {
    opacity: 0.5,
  },
  calendarDaySelected: {
    backgroundColor: '#ffc107',
  },
  calendarDayText: {
    color: '#cccccc',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  calendarDayTextToday: {
    color: '#ffffff',
  },
  calendarDayTextPast: {
    color: '#666666',
  },
  calendarDayTextSelected: {
    color: '#000000',
  },
  calendarDayNumber: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  calendarDayNumberToday: {
    color: '#ffffff',
  },
  calendarDayNumberPast: {
    color: '#666666',
  },
  calendarDayNumberSelected: {
    color: '#000000',
  },
  availabilityDots: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  availabilityDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 1,
  },
  timeSlotsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  timeSlotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeSlotButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    width: '18%',
    alignItems: 'center',
    position: 'relative',
  },
  timeSlotButtonSelected: {
    backgroundColor: '#007bff',
  },
  timeSlotAvailable: {
    backgroundColor: '#28a745',
  },
  timeSlotBusy: {
    backgroundColor: '#ffc107',
  },
  timeSlotUnavailable: {
    backgroundColor: '#dc3545',
  },
  timeSlotBreak: {
    backgroundColor: '#6c757d',
  },
  timeSlotText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  timeSlotTextSelected: {
    color: '#ffffff',
  },
  availabilityIndicator: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  availabilityActionsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  setAvailabilityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    justifyContent: 'center',
  },
  setAvailabilityButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  bulkSetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4a4a4a',
    borderRadius: 8,
    padding: 15,
    justifyContent: 'center',
  },
  bulkSetButtonText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  availabilitySummaryCard: {
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

export default EngineerAvailabilityCalendarScreen;
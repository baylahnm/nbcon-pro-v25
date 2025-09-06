import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SharedProjectCalendarScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState('month');
  const [selectedUser, setSelectedUser] = useState('all');

  const viewModes = [
    { id: 'day', name: 'Day', icon: 'calendar-outline' },
    { id: 'week', name: 'Week', icon: 'calendar-outline' },
    { id: 'month', name: 'Month', icon: 'calendar-outline' },
  ];

  const users = [
    { id: 'all', name: 'All Users', role: 'All', color: '#007bff' },
    { id: 'client', name: 'Client Team', role: 'Client', color: '#28a745' },
    { id: 'engineer', name: 'Engineer Team', role: 'Engineer', color: '#ffc107' },
    { id: 'admin', name: 'Admin Team', role: 'Admin', color: '#dc3545' },
  ];

  const projects = [
    {
      id: '1',
      title: 'Riyadh Tower Construction',
      client: 'Saudi Construction Co.',
      engineer: 'Ahmed Al-Rashid',
      status: 'In Progress',
      startDate: '2024-01-15',
      endDate: '2024-06-15',
      progress: 45,
      color: '#007bff',
      milestones: [
        { id: 'm1', title: 'Foundation Complete', date: '2024-02-15', status: 'completed' },
        { id: 'm2', title: 'Structure 50%', date: '2024-03-15', status: 'in-progress' },
        { id: 'm3', title: 'MEP Installation', date: '2024-04-15', status: 'pending' },
        { id: 'm4', title: 'Final Inspection', date: '2024-06-15', status: 'pending' },
      ],
    },
    {
      id: '2',
      title: 'Jeddah Office MEP Design',
      client: 'Office Solutions Ltd.',
      engineer: 'Sarah Al-Mansouri',
      status: 'Planning',
      startDate: '2024-02-01',
      endDate: '2024-04-01',
      progress: 15,
      color: '#28a745',
      milestones: [
        { id: 'm5', title: 'Design Phase 1', date: '2024-02-15', status: 'in-progress' },
        { id: 'm6', title: 'Design Phase 2', date: '2024-03-01', status: 'pending' },
        { id: 'm7', title: 'Client Review', date: '2024-03-15', status: 'pending' },
        { id: 'm8', title: 'Final Delivery', date: '2024-04-01', status: 'pending' },
      ],
    },
    {
      id: '3',
      title: 'Dammam Plant Safety Audit',
      client: 'Industrial Solutions Inc.',
      engineer: 'Omar Al-Zahrani',
      status: 'Completed',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      progress: 100,
      color: '#ffc107',
      milestones: [
        { id: 'm9', title: 'Initial Assessment', date: '2024-01-10', status: 'completed' },
        { id: 'm10', title: 'Safety Review', date: '2024-01-20', status: 'completed' },
        { id: 'm11', title: 'Report Generation', date: '2024-01-25', status: 'completed' },
        { id: 'm12', title: 'Final Presentation', date: '2024-01-31', status: 'completed' },
      ],
    },
  ];

  const calendarEvents = [
    {
      id: 'e1',
      title: 'Site Inspection - Riyadh Tower',
      date: '2024-01-25',
      time: '09:00',
      duration: '4 hours',
      project: 'Riyadh Tower Construction',
      user: 'Ahmed Al-Rashid',
      userRole: 'Engineer',
      type: 'site-visit',
      priority: 'high',
      location: 'Riyadh, Saudi Arabia',
    },
    {
      id: 'e2',
      title: 'Client Meeting - MEP Design',
      date: '2024-01-25',
      time: '14:00',
      duration: '2 hours',
      project: 'Jeddah Office MEP Design',
      user: 'Sarah Al-Mansouri',
      userRole: 'Engineer',
      type: 'meeting',
      priority: 'medium',
      location: 'Jeddah, Saudi Arabia',
    },
    {
      id: 'e3',
      title: 'Safety Report Review',
      date: '2024-01-26',
      time: '10:00',
      duration: '3 hours',
      project: 'Dammam Plant Safety Audit',
      user: 'Omar Al-Zahrani',
      userRole: 'Engineer',
      type: 'review',
      priority: 'high',
      location: 'Dammam, Saudi Arabia',
    },
    {
      id: 'e4',
      title: 'Project Status Update',
      date: '2024-01-26',
      time: '16:00',
      duration: '1 hour',
      project: 'Riyadh Tower Construction',
      user: 'Saudi Construction Co.',
      userRole: 'Client',
      type: 'meeting',
      priority: 'medium',
      location: 'Riyadh, Saudi Arabia',
    },
  ];

  const ViewModeButton = ({ mode }: { mode: any }) => (
    <TouchableOpacity
      style={[
        styles.viewModeButton,
        viewMode === mode.id && styles.viewModeButtonSelected
      ]}
      onPress={() => setViewMode(mode.id)}
    >
      <Ionicons 
        name={mode.icon as any} 
        size={20} 
        color={viewMode === mode.id ? '#ffffff' : '#007bff'} 
      />
      <Text style={[
        styles.viewModeText,
        viewMode === mode.id && styles.viewModeTextSelected
      ]}>
        {mode.name}
      </Text>
    </TouchableOpacity>
  );

  const UserFilterButton = ({ user }: { user: any }) => (
    <TouchableOpacity
      style={[
        styles.userFilterButton,
        selectedUser === user.id && styles.userFilterButtonSelected
      ]}
      onPress={() => setSelectedUser(user.id)}
    >
      <View style={[styles.userIndicator, { backgroundColor: user.color }]} />
      <Text style={[
        styles.userFilterText,
        selectedUser === user.id && styles.userFilterTextSelected
      ]}>
        {user.name}
      </Text>
    </TouchableOpacity>
  );

  const ProjectCard = ({ project }: { project: any }) => (
    <TouchableOpacity
      style={[
        styles.projectCard,
        selectedProject === project.id && styles.projectCardSelected
      ]}
      onPress={() => setSelectedProject(project.id)}
    >
      <View style={styles.projectHeader}>
        <View style={styles.projectInfo}>
          <Text style={styles.projectTitle}>{project.title}</Text>
          <Text style={styles.projectClient}>Client: {project.client}</Text>
          <Text style={styles.projectEngineer}>Engineer: {project.engineer}</Text>
        </View>
        <View style={styles.projectStatus}>
          <View style={[styles.statusBadge, { backgroundColor: project.color }]}>
            <Text style={styles.statusText}>{project.status}</Text>
          </View>
          <Text style={styles.progressText}>{project.progress}%</Text>
        </View>
      </View>
      
      <View style={styles.projectTimeline}>
        <View style={styles.timelineItem}>
          <Text style={styles.timelineLabel}>Start:</Text>
          <Text style={styles.timelineValue}>{project.startDate}</Text>
        </View>
        <View style={styles.timelineItem}>
          <Text style={styles.timelineLabel}>End:</Text>
          <Text style={styles.timelineValue}>{project.endDate}</Text>
        </View>
      </View>

      <View style={styles.projectProgress}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${project.progress}%`, backgroundColor: project.color }]} />
        </View>
      </View>

      <View style={styles.milestonesList}>
        <Text style={styles.milestonesTitle}>Milestones:</Text>
        {project.milestones.map((milestone: any) => (
          <View key={milestone.id} style={styles.milestoneItem}>
            <View style={[
              styles.milestoneStatus,
              { 
                backgroundColor: milestone.status === 'completed' ? '#28a745' : 
                               milestone.status === 'in-progress' ? '#ffc107' : '#6c757d'
              }
            ]} />
            <Text style={styles.milestoneText}>{milestone.title}</Text>
            <Text style={styles.milestoneDate}>{milestone.date}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  const EventItem = ({ event }: { event: any }) => (
    <View style={styles.eventItem}>
      <View style={styles.eventHeader}>
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventProject}>{event.project}</Text>
          <Text style={styles.eventUser}>{event.user} ({event.userRole})</Text>
        </View>
        <View style={styles.eventTime}>
          <Text style={styles.eventTimeText}>{event.time}</Text>
          <Text style={styles.eventDurationText}>{event.duration}</Text>
        </View>
      </View>
      
      <View style={styles.eventDetails}>
        <View style={styles.eventDetail}>
          <Ionicons name="location-outline" size={16} color="#cccccc" />
          <Text style={styles.eventDetailText}>{event.location}</Text>
        </View>
        <View style={styles.eventDetail}>
          <Ionicons name="flag-outline" size={16} color="#cccccc" />
          <Text style={styles.eventDetailText}>{event.priority} priority</Text>
        </View>
        <View style={styles.eventDetail}>
          <Ionicons name="time-outline" size={16} color="#cccccc" />
          <Text style={styles.eventDetailText}>{event.type}</Text>
        </View>
      </View>
    </View>
  );

  const CalendarDay = ({ date, events }: { date: string, events: any[] }) => {
    const dayNumber = new Date(date).getDate();
    const isToday = date === new Date().toISOString().split('T')[0];
    const isSelected = selectedDate === date;
    
    return (
      <TouchableOpacity
        style={[
          styles.calendarDay,
          isToday && styles.calendarDayToday,
          isSelected && styles.calendarDaySelected
        ]}
        onPress={() => setSelectedDate(date)}
      >
        <Text style={[
          styles.calendarDayNumber,
          isToday && styles.calendarDayNumberToday,
          isSelected && styles.calendarDayNumberSelected
        ]}>
          {dayNumber}
        </Text>
        {events.length > 0 && (
          <View style={styles.eventIndicators}>
            {events.slice(0, 3).map((event, index) => (
              <View
                key={index}
                style={[
                  styles.eventIndicator,
                  { backgroundColor: event.priority === 'high' ? '#dc3545' : 
                                   event.priority === 'medium' ? '#ffc107' : '#28a745' }
                ]}
              />
            ))}
            {events.length > 3 && (
              <Text style={styles.moreEventsText}>+{events.length - 3}</Text>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const filteredEvents = calendarEvents.filter(event => {
    if (selectedUser !== 'all' && event.userRole.toLowerCase() !== users.find(u => u.id === selectedUser)?.role.toLowerCase()) {
      return false;
    }
    return true;
  });

  const eventsForDate = (date: string) => {
    return filteredEvents.filter(event => event.date === date);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Shared Project Calendar</Text>
      <Text style={styles.subtitle}>
        Unified calendar for engineers + clients
      </Text>

      <View style={styles.controlsCard}>
        <View style={styles.viewModesContainer}>
          <Text style={styles.controlsTitle}>View Mode</Text>
          <View style={styles.viewModesRow}>
            {viewModes.map((mode) => (
              <ViewModeButton key={mode.id} mode={mode} />
            ))}
          </View>
        </View>
        
        <View style={styles.userFiltersContainer}>
          <Text style={styles.controlsTitle}>Filter by User</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.userFiltersRow}>
              {users.map((user) => (
                <UserFilterButton key={user.id} user={user} />
              ))}
            </View>
          </ScrollView>
        </View>
      </View>

      <View style={styles.projectsCard}>
        <Text style={styles.cardTitle}>Active Projects</Text>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </View>

      <View style={styles.calendarCard}>
        <Text style={styles.cardTitle}>Calendar View</Text>
        <View style={styles.calendarGrid}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <View key={day} style={styles.calendarDayHeader}>
              <Text style={styles.calendarDayHeaderText}>{day}</Text>
            </View>
          ))}
          {Array.from({ length: 35 }, (_, i) => {
            const date = new Date(2024, 0, 1 + i);
            const dateString = date.toISOString().split('T')[0];
            const events = eventsForDate(dateString);
            return (
              <CalendarDay key={i} date={dateString} events={events} />
            );
          })}
        </View>
      </View>

      {selectedDate && (
        <View style={styles.eventsCard}>
          <Text style={styles.cardTitle}>
            Events - {new Date(selectedDate).toLocaleDateString()}
          </Text>
          {eventsForDate(selectedDate).map((event) => (
            <EventItem key={event.id} event={event} />
          ))}
        </View>
      )}

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add" size={24} color="#007bff" />
            <Text style={styles.actionText}>Add Event</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="calendar" size={24} color="#28a745" />
            <Text style={styles.actionText}>Schedule Meeting</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Export Calendar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          Shared calendar for project coordination between clients and engineers. 
          View all project milestones, meetings, and deadlines in one place.
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
  controlsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  controlsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  viewModesContainer: {
    marginBottom: 20,
  },
  viewModesRow: {
    flexDirection: 'row',
  },
  viewModeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
  },
  viewModeButtonSelected: {
    backgroundColor: '#007bff',
  },
  viewModeText: {
    color: '#007bff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  viewModeTextSelected: {
    color: '#ffffff',
  },
  userFiltersContainer: {
    marginBottom: 10,
  },
  userFiltersRow: {
    flexDirection: 'row',
  },
  userFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
  },
  userFilterButtonSelected: {
    backgroundColor: '#007bff',
  },
  userIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  userFilterText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  userFilterTextSelected: {
    color: '#ffffff',
  },
  projectsCard: {
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
  projectCard: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  projectCardSelected: {
    borderColor: '#007bff',
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  projectInfo: {
    flex: 1,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  projectClient: {
    fontSize: 14,
    color: '#28a745',
    marginBottom: 2,
  },
  projectEngineer: {
    fontSize: 14,
    color: '#ffc107',
  },
  projectStatus: {
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
  progressText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  projectTimeline: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  timelineItem: {
    marginRight: 20,
  },
  timelineLabel: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 2,
  },
  timelineValue: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  projectProgress: {
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#4a4a4a',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  milestonesList: {
    marginTop: 10,
  },
  milestonesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  milestoneStatus: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  milestoneText: {
    flex: 1,
    fontSize: 12,
    color: '#ffffff',
  },
  milestoneDate: {
    fontSize: 12,
    color: '#cccccc',
  },
  calendarCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDayHeader: {
    width: '14.28%',
    padding: 10,
    alignItems: 'center',
  },
  calendarDayHeaderText: {
    color: '#cccccc',
    fontSize: 12,
    fontWeight: 'bold',
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1,
  },
  calendarDayToday: {
    backgroundColor: '#007bff',
  },
  calendarDaySelected: {
    backgroundColor: '#ffc107',
  },
  calendarDayNumber: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  calendarDayNumberToday: {
    color: '#ffffff',
  },
  calendarDayNumberSelected: {
    color: '#000000',
  },
  eventIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 1,
  },
  moreEventsText: {
    color: '#cccccc',
    fontSize: 8,
    marginLeft: 2,
  },
  eventsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  eventItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  eventProject: {
    fontSize: 14,
    color: '#007bff',
    marginBottom: 2,
  },
  eventUser: {
    fontSize: 12,
    color: '#cccccc',
  },
  eventTime: {
    alignItems: 'flex-end',
  },
  eventTimeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  eventDurationText: {
    fontSize: 12,
    color: '#cccccc',
  },
  eventDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 5,
  },
  eventDetailText: {
    fontSize: 12,
    color: '#cccccc',
    marginLeft: 5,
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

export default SharedProjectCalendarScreen;

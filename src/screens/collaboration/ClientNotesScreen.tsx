import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ClientNotesScreen: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteType, setNoteType] = useState('general');
  const [notePriority, setNotePriority] = useState('medium');

  const noteTypes = [
    { id: 'general', name: 'General', icon: 'document-text', color: '#6c757d' },
    { id: 'issue', name: 'Issue', icon: 'warning', color: '#dc3545' },
    { id: 'feedback', name: 'Feedback', icon: 'chatbubble', color: '#007bff' },
    { id: 'requirement', name: 'Requirement', icon: 'list', color: '#28a745' },
    { id: 'change', name: 'Change Request', icon: 'refresh', color: '#ffc107' },
    { id: 'approval', name: 'Approval', icon: 'checkmark-circle', color: '#6f42c1' },
  ];

  const priorities = [
    { id: 'low', name: 'Low', color: '#28a745' },
    { id: 'medium', name: 'Medium', color: '#ffc107' },
    { id: 'high', name: 'High', color: '#dc3545' },
    { id: 'urgent', name: 'Urgent', color: '#6f42c1' },
  ];

  const jobs = [
    {
      id: '1',
      title: 'Riyadh Tower Construction',
      client: 'Saudi Construction Co.',
      engineer: 'Ahmed Al-Rashid',
      status: 'In Progress',
      progress: 45,
      color: '#007bff',
      notes: [
        {
          id: 'n1',
          title: 'Foundation Inspection Concerns',
          content: 'The foundation inspection report shows some minor cracks that need attention. Please ensure proper waterproofing is applied before proceeding.',
          type: 'issue',
          priority: 'high',
          createdDate: '2024-01-20',
          lastModified: '2024-01-22',
          author: 'Saudi Construction Co.',
          isPrivate: true,
          tags: ['foundation', 'inspection', 'cracks'],
        },
        {
          id: 'n2',
          title: 'Budget Approval for Additional Work',
          content: 'Approved additional budget of 50,000 SAR for enhanced safety measures as discussed in the meeting.',
          type: 'approval',
          priority: 'medium',
          createdDate: '2024-01-18',
          lastModified: '2024-01-18',
          author: 'Saudi Construction Co.',
          isPrivate: true,
          tags: ['budget', 'approval', 'safety'],
        },
      ],
    },
    {
      id: '2',
      title: 'Jeddah Office MEP Design',
      client: 'Office Solutions Ltd.',
      engineer: 'Sarah Al-Mansouri',
      status: 'Planning',
      progress: 15,
      color: '#28a745',
      notes: [
        {
          id: 'n3',
          title: 'Energy Efficiency Requirements',
          content: 'Please ensure all MEP systems meet LEED certification standards for energy efficiency.',
          type: 'requirement',
          priority: 'high',
          createdDate: '2024-01-22',
          lastModified: '2024-01-22',
          author: 'Office Solutions Ltd.',
          isPrivate: true,
          tags: ['energy', 'efficiency', 'leed'],
        },
        {
          id: 'n4',
          title: 'Client Feedback on Initial Design',
          content: 'The initial MEP layout looks good. We would like to see more detailed specifications for the HVAC system.',
          type: 'feedback',
          priority: 'medium',
          createdDate: '2024-01-21',
          lastModified: '2024-01-21',
          author: 'Office Solutions Ltd.',
          isPrivate: true,
          tags: ['feedback', 'hvac', 'specifications'],
        },
      ],
    },
    {
      id: '3',
      title: 'Dammam Plant Safety Audit',
      client: 'Industrial Solutions Inc.',
      engineer: 'Omar Al-Zahrani',
      status: 'Completed',
      progress: 100,
      color: '#ffc107',
      notes: [
        {
          id: 'n5',
          title: 'Safety Compliance Certificate',
          content: 'All safety requirements have been met. Certificate will be issued within 5 business days.',
          type: 'approval',
          priority: 'medium',
          createdDate: '2024-01-25',
          lastModified: '2024-01-25',
          author: 'Industrial Solutions Inc.',
          isPrivate: true,
          tags: ['safety', 'compliance', 'certificate'],
        },
      ],
    },
  ];

  const TypeButton = ({ type }: { type: any }) => (
    <TouchableOpacity
      style={[
        styles.typeButton,
        noteType === type.id && styles.typeButtonSelected
      ]}
      onPress={() => setNoteType(type.id)}
    >
      <Ionicons 
        name={type.icon as any} 
        size={20} 
        color={noteType === type.id ? '#ffffff' : type.color} 
      />
      <Text style={[
        styles.typeText,
        noteType === type.id && styles.typeTextSelected
      ]}>
        {type.name}
      </Text>
    </TouchableOpacity>
  );

  const PriorityButton = ({ priority }: { priority: any }) => (
    <TouchableOpacity
      style={[
        styles.priorityButton,
        notePriority === priority.id && styles.priorityButtonSelected
      ]}
      onPress={() => setNotePriority(priority.id)}
    >
      <View style={[styles.priorityIndicator, { backgroundColor: priority.color }]} />
      <Text style={[
        styles.priorityText,
        notePriority === priority.id && styles.priorityTextSelected
      ]}>
        {priority.name}
      </Text>
    </TouchableOpacity>
  );

  const JobCard = ({ job }: { job: any }) => (
    <TouchableOpacity
      style={[
        styles.jobCard,
        selectedJob === job.id && styles.jobCardSelected
      ]}
      onPress={() => setSelectedJob(job.id)}
    >
      <View style={styles.jobHeader}>
        <View style={styles.jobInfo}>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.jobClient}>Client: {job.client}</Text>
          <Text style={styles.jobEngineer}>Engineer: {job.engineer}</Text>
        </View>
        <View style={styles.jobStatus}>
          <View style={[styles.statusBadge, { backgroundColor: job.color }]}>
            <Text style={styles.statusText}>{job.status}</Text>
          </View>
          <Text style={styles.progressText}>{job.progress}%</Text>
        </View>
      </View>
      
      <View style={styles.notesCount}>
        <Ionicons name="document-text" size={16} color="#007bff" />
        <Text style={styles.notesCountText}>{job.notes.length} notes</Text>
      </View>
    </TouchableOpacity>
  );

  const NoteItem = ({ note }: { note: any }) => (
    <TouchableOpacity
      style={[
        styles.noteItem,
        selectedNote === note.id && styles.noteItemSelected
      ]}
      onPress={() => setSelectedNote(note.id)}
    >
      <View style={styles.noteHeader}>
        <View style={styles.noteInfo}>
          <Text style={styles.noteTitle}>{note.title}</Text>
          <Text style={styles.noteContent}>{note.content}</Text>
        </View>
        <View style={styles.noteStatus}>
          <View style={[
            styles.typeBadge,
            { backgroundColor: noteTypes.find(t => t.id === note.type)?.color }
          ]}>
            <Text style={styles.typeBadgeText}>
              {noteTypes.find(t => t.id === note.type)?.name}
            </Text>
          </View>
          <View style={[
            styles.priorityBadge,
            { backgroundColor: priorities.find(p => p.id === note.priority)?.color }
          ]}>
            <Text style={styles.priorityBadgeText}>
              {priorities.find(p => p.id === note.priority)?.name}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.noteDetails}>
        <View style={styles.noteDetail}>
          <Ionicons name="person" size={16} color="#cccccc" />
          <Text style={styles.noteDetailText}>{note.author}</Text>
        </View>
        <View style={styles.noteDetail}>
          <Ionicons name="calendar" size={16} color="#cccccc" />
          <Text style={styles.noteDetailText}>{note.createdDate}</Text>
        </View>
        <View style={styles.noteDetail}>
          <Ionicons name="lock-closed" size={16} color="#cccccc" />
          <Text style={styles.noteDetailText}>Private</Text>
        </View>
      </View>

      <View style={styles.noteTags}>
        {note.tags.map((tag: string, index: number) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>#{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.noteActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="create" size={16} color="#007bff" />
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share" size={16} color="#28a745" />
          <Text style={styles.actionButtonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="trash" size={16} color="#dc3545" />
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const selectedJobData = jobs.find(job => job.id === selectedJob);
  const selectedNoteData = selectedJobData?.notes.find(note => note.id === selectedNote);

  const handleAddNote = () => {
    if (!selectedJob) {
      Alert.alert('Error', 'Please select a job first');
      return;
    }

    Alert.alert('Success', 'Note added successfully');
  };

  const handleEditNote = () => {
    if (!selectedNote) {
      Alert.alert('Error', 'Please select a note first');
      return;
    }

    Alert.alert('Success', 'Note updated successfully');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Client Notes</Text>
      <Text style={styles.subtitle}>
        Clients add private notes to jobs
      </Text>

      <View style={styles.jobsCard}>
        <Text style={styles.cardTitle}>Select Job</Text>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </View>

      {selectedJob && (
        <>
          <View style={styles.noteTypesCard}>
            <Text style={styles.cardTitle}>Note Type</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.typesContainer}>
                {noteTypes.map((type) => (
                  <TypeButton key={type.id} type={type} />
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={styles.prioritiesCard}>
            <Text style={styles.cardTitle}>Priority</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.prioritiesContainer}>
                {priorities.map((priority) => (
                  <PriorityButton key={priority.id} priority={priority} />
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={styles.addNoteCard}>
            <Text style={styles.cardTitle}>Add New Note</Text>
            <View style={styles.addNoteInput}>
              <Text style={styles.addNotePlaceholder}>
                Enter your note content...
              </Text>
            </View>
            <TouchableOpacity style={styles.addNoteButton} onPress={handleAddNote}>
              <Ionicons name="add" size={20} color="#ffffff" />
              <Text style={styles.addNoteButtonText}>Add Note</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.notesCard}>
            <Text style={styles.cardTitle}>
              Notes for {selectedJobData?.title} ({selectedJobData?.notes.length})
            </Text>
            {selectedJobData?.notes.map((note) => (
              <NoteItem key={note.id} note={note} />
            ))}
          </View>

          {selectedNote && (
            <View style={styles.noteDetailsCard}>
              <Text style={styles.cardTitle}>Note Details</Text>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Title:</Text>
                <Text style={styles.detailValue}>{selectedNoteData?.title}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Content:</Text>
                <Text style={styles.detailValue}>{selectedNoteData?.content}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Type:</Text>
                <Text style={styles.detailValue}>
                  {noteTypes.find(t => t.id === selectedNoteData?.type)?.name}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Priority:</Text>
                <Text style={styles.detailValue}>
                  {priorities.find(p => p.id === selectedNoteData?.priority)?.name}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Author:</Text>
                <Text style={styles.detailValue}>{selectedNoteData?.author}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Created:</Text>
                <Text style={styles.detailValue}>{selectedNoteData?.createdDate}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Last Modified:</Text>
                <Text style={styles.detailValue}>{selectedNoteData?.lastModified}</Text>
              </View>
              
              <TouchableOpacity style={styles.editNoteButton} onPress={handleEditNote}>
                <Ionicons name="create" size={20} color="#ffffff" />
                <Text style={styles.editNoteButtonText}>Edit Note</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="search" size={24} color="#007bff" />
            <Text style={styles.actionText}>Search Notes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download" size={24} color="#28a745" />
            <Text style={styles.actionText}>Export Notes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="archive" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Archive</Text>
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
          Add private notes to jobs for your reference. These notes are only visible to you 
          and help you track important information about each project.
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
  jobCard: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  jobCardSelected: {
    borderColor: '#007bff',
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
  jobClient: {
    fontSize: 14,
    color: '#28a745',
    marginBottom: 2,
  },
  jobEngineer: {
    fontSize: 14,
    color: '#ffc107',
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
  progressText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  notesCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notesCountText: {
    color: '#007bff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  noteTypesCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
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
  },
  typeButtonSelected: {
    backgroundColor: '#007bff',
  },
  typeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  typeTextSelected: {
    color: '#ffffff',
  },
  prioritiesCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  prioritiesContainer: {
    flexDirection: 'row',
  },
  priorityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
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
  priorityText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  priorityTextSelected: {
    color: '#ffffff',
  },
  addNoteCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  addNoteInput: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    minHeight: 80,
    justifyContent: 'center',
  },
  addNotePlaceholder: {
    color: '#cccccc',
    fontSize: 16,
  },
  addNoteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    borderRadius: 8,
    padding: 15,
    justifyContent: 'center',
  },
  addNoteButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  notesCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  noteItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  noteItemSelected: {
    borderColor: '#007bff',
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  noteInfo: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  noteContent: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
  },
  noteStatus: {
    alignItems: 'flex-end',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 5,
  },
  typeBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  noteDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  noteDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 5,
  },
  noteDetailText: {
    fontSize: 12,
    color: '#cccccc',
    marginLeft: 5,
  },
  noteTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tag: {
    backgroundColor: '#4a4a4a',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 5,
    marginBottom: 5,
  },
  tagText: {
    color: '#007bff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  noteActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  noteDetailsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: '#cccccc',
    fontWeight: 'bold',
    width: '30%',
  },
  detailValue: {
    fontSize: 14,
    color: '#ffffff',
    flex: 1,
    textAlign: 'right',
  },
  editNoteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 15,
    marginTop: 15,
    justifyContent: 'center',
  },
  editNoteButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
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

export default ClientNotesScreen;

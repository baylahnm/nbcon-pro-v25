import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SavedJobDraftsScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedSort, setSelectedSort] = useState('recent');

  const tabs = [
    { id: 'all', name: 'All Drafts' },
    { id: 'incomplete', name: 'Incomplete' },
    { id: 'ready', name: 'Ready to Post' },
    { id: 'archived', name: 'Archived' },
  ];

  const sortOptions = [
    { id: 'recent', name: 'Most Recent' },
    { id: 'oldest', name: 'Oldest First' },
    { id: 'title', name: 'Title A-Z' },
    { id: 'type', name: 'Service Type' },
  ];

  const drafts = [
    {
      id: '1',
      title: 'Riyadh Metro Station - Structural Inspection',
      type: 'Structural Engineering',
      status: 'Incomplete',
      progress: 65,
      createdDate: '2024-01-25 14:30:15',
      lastModified: '2024-01-25 16:45:22',
      budget: 15000,
      duration: '5 days',
      location: 'Riyadh, Saudi Arabia',
      description: 'Comprehensive structural inspection of the new metro station...',
      requirements: [
        'SCE Licensed Engineer',
        '5+ years experience',
        'Structural inspection certification',
      ],
      attachments: 3,
      isUrgent: false,
    },
    {
      id: '2',
      title: 'NEOM Smart City - MEP Design Review',
      type: 'MEP Engineering',
      status: 'Ready to Post',
      progress: 100,
      createdDate: '2024-01-24 10:15:30',
      lastModified: '2024-01-25 09:20:15',
      budget: 25000,
      duration: '10 days',
      location: 'NEOM, Saudi Arabia',
      description: 'Review and optimize MEP systems for smart city infrastructure...',
      requirements: [
        'MEP Engineering degree',
        '10+ years experience',
        'Smart city project experience',
      ],
      attachments: 8,
      isUrgent: true,
    },
    {
      id: '3',
      title: 'Jeddah Port - Safety Assessment',
      type: 'Safety Engineering',
      status: 'Incomplete',
      progress: 40,
      createdDate: '2024-01-23 16:20:45',
      lastModified: '2024-01-24 11:30:10',
      budget: 8000,
      duration: '3 days',
      location: 'Jeddah, Saudi Arabia',
      description: 'Safety assessment and risk analysis for port operations...',
      requirements: [
        'HSE certification',
        'Port industry experience',
        'Risk assessment expertise',
      ],
      attachments: 1,
      isUrgent: false,
    },
    {
      id: '4',
      title: 'Solar Farm - Environmental Impact Study',
      type: 'Environmental Engineering',
      status: 'Archived',
      progress: 80,
      createdDate: '2024-01-20 14:45:33',
      lastModified: '2024-01-22 16:15:20',
      budget: 12000,
      duration: '7 days',
      location: 'Eastern Province, Saudi Arabia',
      description: 'Environmental impact assessment for solar farm project...',
      requirements: [
        'Environmental engineering degree',
        'Solar project experience',
        'Environmental impact assessment certification',
      ],
      attachments: 5,
      isUrgent: false,
    },
    {
      id: '5',
      title: 'BIM Modeling - Residential Complex',
      type: 'BIM Engineering',
      status: 'Ready to Post',
      progress: 100,
      createdDate: '2024-01-22 09:30:15',
      lastModified: '2024-01-25 13:45:30',
      budget: 18000,
      duration: '14 days',
      location: 'Dammam, Saudi Arabia',
      description: 'Complete BIM modeling for residential complex project...',
      requirements: [
        'BIM certification',
        'Revit expertise',
        'Residential project experience',
      ],
      attachments: 12,
      isUrgent: false,
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
      <Text style={[
        styles.tabButtonText,
        selectedTab === tab.id && styles.tabButtonTextSelected
      ]}>
        {tab.name}
      </Text>
    </TouchableOpacity>
  );

  const SortButton = ({ sort }: { sort: any }) => (
    <TouchableOpacity
      style={[
        styles.sortButton,
        selectedSort === sort.id && styles.sortButtonSelected
      ]}
      onPress={() => setSelectedSort(sort.id)}
    >
      <Text style={[
        styles.sortButtonText,
        selectedSort === sort.id && styles.sortButtonTextSelected
      ]}>
        {sort.name}
      </Text>
    </TouchableOpacity>
  );

  const DraftItem = ({ draft }: { draft: any }) => (
    <View style={styles.draftItem}>
      <View style={styles.draftHeader}>
        <View style={styles.draftInfo}>
          <Text style={styles.draftTitle}>{draft.title}</Text>
          <Text style={styles.draftType}>{draft.type}</Text>
          <Text style={styles.draftLocation}>{draft.location}</Text>
        </View>
        <View style={styles.draftActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="create" size={20} color="#007bff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="trash" size={20} color="#dc3545" />
          </TouchableOpacity>
        </View>
      </View>
      
      <Text style={styles.draftDescription}>{draft.description}</Text>
      
      <View style={styles.draftStats}>
        <View style={styles.draftStat}>
          <Text style={styles.draftStatValue}>{draft.budget.toLocaleString()}</Text>
          <Text style={styles.draftStatLabel}>SAR Budget</Text>
        </View>
        <View style={styles.draftStat}>
          <Text style={styles.draftStatValue}>{draft.duration}</Text>
          <Text style={styles.draftStatLabel}>Duration</Text>
        </View>
        <View style={styles.draftStat}>
          <Text style={styles.draftStatValue}>{draft.attachments}</Text>
          <Text style={styles.draftStatLabel}>Attachments</Text>
        </View>
        <View style={styles.draftStat}>
          <Text style={styles.draftStatValue}>{draft.progress}%</Text>
          <Text style={styles.draftStatLabel}>Complete</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${draft.progress}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>{draft.progress}% Complete</Text>
      </View>

      <View style={styles.draftMeta}>
        <Text style={styles.draftMetaText}>
          Created: {draft.createdDate}
        </Text>
        <Text style={styles.draftMetaText}>
          Modified: {draft.lastModified}
        </Text>
        {draft.isUrgent && (
          <View style={styles.urgentBadge}>
            <Ionicons name="flash" size={12} color="#ffc107" />
            <Text style={styles.urgentText}>Urgent</Text>
          </View>
        )}
      </View>

      <View style={styles.requirementsList}>
        <Text style={styles.requirementsTitle}>Requirements:</Text>
        {draft.requirements.map((req: string, index: number) => (
          <View key={index} style={styles.requirementItem}>
            <Ionicons name="checkmark-circle" size={14} color="#28a745" />
            <Text style={styles.requirementText}>{req}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const filteredDrafts = drafts.filter(draft => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'incomplete') return draft.status === 'Incomplete';
    if (selectedTab === 'ready') return draft.status === 'Ready to Post';
    if (selectedTab === 'archived') return draft.status === 'Archived';
    return true;
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Saved Job Drafts</Text>
      <Text style={styles.subtitle}>
        Drafted but not published jobs with edit/delete functionality
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

      <View style={styles.controlsCard}>
        <View style={styles.controlsHeader}>
          <Text style={styles.controlsTitle}>Sort & Filter</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={20} color="#007bff" />
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.sortContainer}>
            {sortOptions.map((sort) => (
              <SortButton key={sort.id} sort={sort} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.draftsCard}>
        <View style={styles.draftsHeader}>
          <Text style={styles.draftsTitle}>
            {filteredDrafts.length} Draft{filteredDrafts.length !== 1 ? 's' : ''} Found
          </Text>
          <TouchableOpacity style={styles.newDraftButton}>
            <Ionicons name="add" size={20} color="#ffffff" />
            <Text style={styles.newDraftButtonText}>New Draft</Text>
          </TouchableOpacity>
        </View>
        {filteredDrafts.map((draft) => (
          <DraftItem key={draft.id} draft={draft} />
        ))}
      </View>

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add" size={24} color="#007bff" />
            <Text style={styles.actionText}>Create Draft</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="copy" size={24} color="#28a745" />
            <Text style={styles.actionText}>Duplicate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="archive" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Archive</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="trash" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Delete All</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          Save job drafts to work on them later, edit details, and publish when ready. 
          Drafts are automatically saved as you work on them.
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
    alignItems: 'center',
  },
  tabButtonSelected: {
    backgroundColor: '#007bff',
  },
  tabButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tabButtonTextSelected: {
    color: '#ffffff',
  },
  controlsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  controlsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  controlsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 8,
  },
  filterButtonText: {
    color: '#007bff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  sortContainer: {
    flexDirection: 'row',
  },
  sortButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 6,
    padding: 8,
    marginRight: 8,
  },
  sortButtonSelected: {
    backgroundColor: '#007bff',
  },
  sortButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sortButtonTextSelected: {
    color: '#ffffff',
  },
  draftsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  draftsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  draftsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  newDraftButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 10,
  },
  newDraftButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  draftItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  draftHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  draftInfo: {
    flex: 1,
  },
  draftTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  draftType: {
    fontSize: 14,
    color: '#007bff',
    marginBottom: 2,
  },
  draftLocation: {
    fontSize: 12,
    color: '#cccccc',
  },
  draftActions: {
    flexDirection: 'row',
  },
  actionButton: {
    backgroundColor: '#4a4a4a',
    borderRadius: 6,
    padding: 8,
    marginLeft: 5,
  },
  draftDescription: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 10,
    lineHeight: 20,
  },
  draftStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  draftStat: {
    alignItems: 'center',
  },
  draftStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 2,
  },
  draftStatLabel: {
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
  draftMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  draftMetaText: {
    fontSize: 12,
    color: '#cccccc',
  },
  urgentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffc10720',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  urgentText: {
    color: '#ffc107',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  requirementsList: {
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  requirementsTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  requirementText: {
    fontSize: 12,
    color: '#cccccc',
    marginLeft: 8,
  },
  quickActionsCard: {
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
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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

export default SavedJobDraftsScreen;

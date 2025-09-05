import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface ArchivedJob {
  id: string;
  title: string;
  engineer: {
    name: string;
    avatar: string;
    rating: number;
  };
  category: string;
  status: 'completed' | 'cancelled' | 'dispute_resolved';
  completedDate: string;
  duration: string;
  cost: number;
  rating?: number;
  description: string;
  tags: string[];
  hasReport: boolean;
  hasInvoice: boolean;
  location: string;
}

const JobArchiveScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'completed' | 'cancelled' | 'disputed'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'cost' | 'rating' | 'duration'>('date');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const archivedJobs: ArchivedJob[] = [
    {
      id: '1',
      title: 'Building Survey - NEOM Project',
      engineer: {
        name: 'Ahmed Al-Rashid',
        avatar: '👨‍🔧',
        rating: 4.9
      },
      category: 'Surveying',
      status: 'completed',
      completedDate: '2024-03-15',
      duration: '6 hours',
      cost: 2500,
      rating: 5,
      description: 'Comprehensive structural survey of commercial building including foundation assessment',
      tags: ['Survey', 'Commercial', 'NEOM', 'Foundation'],
      hasReport: true,
      hasInvoice: true,
      location: 'NEOM, Tabuk Province'
    },
    {
      id: '2',
      title: 'MEP System Inspection',
      engineer: {
        name: 'Sara Al-Zahra',
        avatar: '👩‍🔧',
        rating: 4.8
      },
      category: 'MEP',
      status: 'completed',
      completedDate: '2024-03-10',
      duration: '4 hours',
      cost: 1800,
      rating: 5,
      description: 'Complete MEP system inspection for office building renovation',
      tags: ['MEP', 'Inspection', 'Renovation', 'Office'],
      hasReport: true,
      hasInvoice: true,
      location: 'Riyadh Business District'
    },
    {
      id: '3',
      title: 'HSE Compliance Audit',
      engineer: {
        name: 'Mohammad Al-Farisi',
        avatar: '👨‍💼',
        rating: 4.7
      },
      category: 'HSE',
      status: 'completed',
      completedDate: '2024-03-08',
      duration: '8 hours',
      cost: 3200,
      rating: 4,
      description: 'Health, Safety & Environment compliance audit for manufacturing facility',
      tags: ['HSE', 'Audit', 'Manufacturing', 'Compliance'],
      hasReport: true,
      hasInvoice: true,
      location: 'Industrial City, Dammam'
    },
    {
      id: '4',
      title: 'Electrical System Design',
      engineer: {
        name: 'Fatima Al-Qahtani',
        avatar: '👩‍💻',
        rating: 4.9
      },
      category: 'Electrical',
      status: 'cancelled',
      completedDate: '2024-03-05',
      duration: '0 hours',
      cost: 0,
      description: 'Electrical system design for residential complex - cancelled due to scope changes',
      tags: ['Electrical', 'Design', 'Residential', 'Cancelled'],
      hasReport: false,
      hasInvoice: false,
      location: 'Jeddah Waterfront'
    },
    {
      id: '5',
      title: 'BIM Modeling Services',
      engineer: {
        name: 'Omar Al-Saud',
        avatar: '👨‍🎨',
        rating: 4.6
      },
      category: 'BIM',
      status: 'dispute_resolved',
      completedDate: '2024-02-28',
      duration: '12 hours',
      cost: 4500,
      rating: 3,
      description: 'BIM modeling for shopping mall construction - resolved payment dispute',
      tags: ['BIM', 'Modeling', 'Shopping Mall', 'Dispute'],
      hasReport: true,
      hasInvoice: true,
      location: 'Makkah Province'
    }
  ];

  const filterOptions = [
    { id: 'all', label: 'All Jobs', count: archivedJobs.length },
    { id: 'completed', label: 'Completed', count: archivedJobs.filter(j => j.status === 'completed').length },
    { id: 'cancelled', label: 'Cancelled', count: archivedJobs.filter(j => j.status === 'cancelled').length },
    { id: 'disputed', label: 'Disputed', count: archivedJobs.filter(j => j.status === 'dispute_resolved').length }
  ];

  const sortOptions = [
    { id: 'date', label: 'Date', icon: 'date-range' },
    { id: 'cost', label: 'Cost', icon: 'attach-money' },
    { id: 'rating', label: 'Rating', icon: 'star' },
    { id: 'duration', label: 'Duration', icon: 'schedule' }
  ];

  const filteredAndSortedJobs = useMemo(() => {
    let filtered = archivedJobs.filter(job => {
      // Filter by search query
      const matchesSearch = searchQuery === '' || 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.engineer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      // Filter by status
      const matchesFilter = selectedFilter === 'all' || 
        (selectedFilter === 'completed' && job.status === 'completed') ||
        (selectedFilter === 'cancelled' && job.status === 'cancelled') ||
        (selectedFilter === 'disputed' && job.status === 'dispute_resolved');

      return matchesSearch && matchesFilter;
    });

    // Sort jobs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime();
        case 'cost':
          return b.cost - a.cost;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'duration':
          const aDuration = parseInt(a.duration.split(' ')[0]) || 0;
          const bDuration = parseInt(b.duration.split(' ')[0]) || 0;
          return bDuration - aDuration;
        default:
          return 0;
      }
    });

    return filtered;
  }, [archivedJobs, searchQuery, selectedFilter, sortBy]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#4CAF50';
      case 'cancelled': return '#FF9800';
      case 'dispute_resolved': return '#2196F3';
      default: return '#757575';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      case 'dispute_resolved': return 'Dispute Resolved';
      default: return 'Unknown';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const renderJobCard = ({ item: job }: { item: ArchivedJob }) => (
    <TouchableOpacity style={styles.jobCard}>
      <View style={styles.jobHeader}>
        <View style={styles.jobTitleRow}>
          <Text style={styles.jobTitle} numberOfLines={1}>{job.title}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(job.status) }]}>
            <Text style={styles.statusText}>{getStatusLabel(job.status)}</Text>
          </View>
        </View>
        <Text style={styles.jobCategory}>{job.category} • {job.location}</Text>
      </View>

      <View style={styles.engineerSection}>
        <Text style={styles.engineerAvatar}>{job.engineer.avatar}</Text>
        <View style={styles.engineerInfo}>
          <Text style={styles.engineerName}>{job.engineer.name}</Text>
          <View style={styles.ratingRow}>
            <MaterialIcons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{job.engineer.rating}</Text>
          </View>
        </View>
        {job.rating && (
          <View style={styles.jobRating}>
            <Text style={styles.jobRatingLabel}>Your Rating:</Text>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map(star => (
                <MaterialIcons
                  key={star}
                  name="star"
                  size={12}
                  color={star <= job.rating! ? '#FFD700' : '#333'}
                />
              ))}
            </View>
          </View>
        )}
      </View>

      <View style={styles.jobDetails}>
        <View style={styles.detailItem}>
          <MaterialIcons name="schedule" size={16} color="#888" />
          <Text style={styles.detailText}>{job.duration}</Text>
        </View>
        <View style={styles.detailItem}>
          <MaterialIcons name="attach-money" size={16} color="#888" />
          <Text style={styles.detailText}>{job.cost} SAR</Text>
        </View>
        <View style={styles.detailItem}>
          <MaterialIcons name="date-range" size={16} color="#888" />
          <Text style={styles.detailText}>{formatDate(job.completedDate)}</Text>
        </View>
      </View>

      <Text style={styles.jobDescription} numberOfLines={2}>
        {job.description}
      </Text>

      <View style={styles.tagsContainer}>
        {job.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.jobActions}>
        {job.hasReport && (
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="description" size={16} color="#2196F3" />
            <Text style={styles.actionText}>Report</Text>
          </TouchableOpacity>
        )}
        {job.hasInvoice && (
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="receipt" size={16} color="#4CAF50" />
            <Text style={styles.actionText}>Invoice</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.actionButton}>
          <MaterialIcons name="refresh" size={16} color="#FF9800" />
          <Text style={styles.actionText}>Rehire</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

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
          <Text style={styles.headerTitle}>Job Archive</Text>
          <TouchableOpacity style={styles.exportButton}>
            <MaterialIcons name="file-download" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={20} color="#888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search jobs, engineers, categories..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity 
            style={styles.viewToggle}
            onPress={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
          >
            <MaterialIcons 
              name={viewMode === 'list' ? 'grid-view' : 'view-list'} 
              size={20} 
              color="#888" 
            />
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {filterOptions.map(option => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.filterChip,
                selectedFilter === option.id && styles.activeFilterChip
              ]}
              onPress={() => setSelectedFilter(option.id as any)}
            >
              <Text style={[
                styles.filterText,
                selectedFilter === option.id && styles.activeFilterText
              ]}>
                {option.label} ({option.count})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Sort Options */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.sortContainer}
          contentContainerStyle={styles.sortContent}
        >
          <Text style={styles.sortLabel}>Sort by:</Text>
          {sortOptions.map(option => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.sortChip,
                sortBy === option.id && styles.activeSortChip
              ]}
              onPress={() => setSortBy(option.id as any)}
            >
              <MaterialIcons 
                name={option.icon as any} 
                size={16} 
                color={sortBy === option.id ? '#fff' : '#888'} 
              />
              <Text style={[
                styles.sortText,
                sortBy === option.id && styles.activeSortText
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Results Count */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {filteredAndSortedJobs.length} job{filteredAndSortedJobs.length !== 1 ? 's' : ''} found
          </Text>
          {filteredAndSortedJobs.length > 0 && (
            <TouchableOpacity style={styles.selectAllButton}>
              <Text style={styles.selectAllText}>Select All</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Jobs List */}
        <FlatList
          data={filteredAndSortedJobs}
          renderItem={renderJobCard}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.jobsList}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <MaterialIcons name="work-off" size={64} color="#333" />
              <Text style={styles.emptyTitle}>No jobs found</Text>
              <Text style={styles.emptySubtitle}>
                Try adjusting your search or filter criteria
              </Text>
            </View>
          }
        />
      </View>
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
  exportButton: {
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a4a',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 20,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    marginLeft: 8,
  },
  viewToggle: {
    padding: 8,
  },
  filtersContainer: {
    marginBottom: 10,
  },
  filtersContent: {
    paddingRight: 20,
  },
  filterChip: {
    backgroundColor: '#2a2a4a',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
  },
  activeFilterChip: {
    backgroundColor: '#4CAF50',
  },
  filterText: {
    fontSize: 14,
    color: '#aaa',
  },
  activeFilterText: {
    color: '#fff',
    fontWeight: '500',
  },
  sortContainer: {
    marginBottom: 15,
  },
  sortContent: {
    paddingRight: 20,
    alignItems: 'center',
  },
  sortLabel: {
    fontSize: 14,
    color: '#aaa',
    marginRight: 10,
  },
  sortChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a4a',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  activeSortChip: {
    backgroundColor: '#2196F3',
  },
  sortText: {
    fontSize: 12,
    color: '#888',
    marginLeft: 4,
  },
  activeSortText: {
    color: '#fff',
    fontWeight: '500',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  resultsCount: {
    fontSize: 14,
    color: '#aaa',
  },
  selectAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  selectAllText: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '500',
  },
  jobsList: {
    paddingBottom: 20,
  },
  jobCard: {
    backgroundColor: '#1e1e3f',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  jobHeader: {
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
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  engineerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  engineerAvatar: {
    fontSize: 20,
    marginRight: 10,
  },
  engineerInfo: {
    flex: 1,
  },
  engineerName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#aaa',
    marginLeft: 4,
  },
  jobRating: {
    alignItems: 'flex-end',
  },
  jobRatingLabel: {
    fontSize: 10,
    color: '#888',
    marginBottom: 2,
  },
  stars: {
    flexDirection: 'row',
  },
  jobDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#aaa',
    marginLeft: 4,
  },
  jobDescription: {
    fontSize: 13,
    color: '#ccc',
    lineHeight: 18,
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#333',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 10,
    color: '#aaa',
  },
  jobActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  actionText: {
    fontSize: 12,
    color: '#aaa',
    marginLeft: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default JobArchiveScreen;
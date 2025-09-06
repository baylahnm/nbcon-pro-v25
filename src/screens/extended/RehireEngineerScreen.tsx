import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RehireEngineerScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [selectedSort, setSelectedSort] = useState('recent');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'civil', name: 'Civil Engineering' },
    { id: 'mep', name: 'MEP Engineering' },
    { id: 'structural', name: 'Structural Engineering' },
    { id: 'safety', name: 'Safety Engineering' },
    { id: 'environmental', name: 'Environmental Engineering' },
    { id: 'bim', name: 'BIM Engineering' },
    { id: 'surveying', name: 'Surveying' },
  ];

  const ratings = [
    { id: 'all', name: 'All Ratings' },
    { id: '5', name: '5 Stars' },
    { id: '4', name: '4+ Stars' },
    { id: '3', name: '3+ Stars' },
  ];

  const availability = [
    { id: 'all', name: 'All Availability' },
    { id: 'available', name: 'Available Now' },
    { id: 'busy', name: 'Currently Busy' },
    { id: 'offline', name: 'Offline' },
  ];

  const sortOptions = [
    { id: 'recent', name: 'Most Recent' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'price', name: 'Price Low-High' },
    { id: 'name', name: 'Name A-Z' },
  ];

  const pastEngineers = [
    {
      id: '1',
      name: 'Ahmed Al-Rashid',
      specialization: 'Structural Engineering',
      rating: 4.9,
      totalJobs: 3,
      lastHired: '2024-01-20',
      totalEarnings: 25000,
      currency: 'SAR',
      completionRate: 100,
      avgResponseTime: '2 hours',
      location: 'Riyadh, Saudi Arabia',
      experience: '12 years',
      languages: ['Arabic', 'English'],
      certifications: ['SCE License', 'PMP', 'PE'],
      hourlyRate: 450,
      status: 'Available',
      lastActive: '2024-01-25 14:30:15',
      profileImage: null,
      isVerified: true,
      isPremium: true,
      projectHistory: [
        {
          id: 'p1',
          title: 'Site Inspection - Riyadh Project',
          completed: '2024-01-20',
          rating: 5,
          budget: '5,000 SAR',
          duration: '3 days',
        },
        {
          id: 'p2',
          title: 'Structural Analysis - Tower',
          completed: '2024-01-15',
          rating: 5,
          budget: '15,000 SAR',
          duration: '2 weeks',
        },
        {
          id: 'p3',
          title: 'Foundation Design',
          completed: '2024-01-10',
          rating: 4,
          budget: '8,000 SAR',
          duration: '1 week',
        },
      ],
    },
    {
      id: '2',
      name: 'Sarah Al-Mansouri',
      specialization: 'MEP Engineering',
      rating: 4.8,
      totalJobs: 2,
      lastHired: '2024-01-18',
      totalEarnings: 18000,
      currency: 'SAR',
      completionRate: 100,
      avgResponseTime: '1.5 hours',
      location: 'Jeddah, Saudi Arabia',
      experience: '8 years',
      languages: ['Arabic', 'English', 'French'],
      certifications: ['SCE License', 'LEED AP'],
      hourlyRate: 380,
      status: 'Available',
      lastActive: '2024-01-25 16:45:22',
      profileImage: null,
      isVerified: true,
      isPremium: false,
      projectHistory: [
        {
          id: 'p4',
          title: 'MEP Design - Office Building',
          completed: '2024-01-18',
          rating: 5,
          budget: '12,000 SAR',
          duration: '2 weeks',
        },
        {
          id: 'p5',
          title: 'HVAC System Design',
          completed: '2024-01-12',
          rating: 4,
          budget: '6,000 SAR',
          duration: '1 week',
        },
      ],
    },
    {
      id: '3',
      name: 'Omar Al-Zahrani',
      specialization: 'Safety Engineering',
      rating: 4.7,
      totalJobs: 1,
      lastHired: '2024-01-15',
      totalEarnings: 8000,
      currency: 'SAR',
      completionRate: 100,
      avgResponseTime: '3 hours',
      location: 'Dammam, Saudi Arabia',
      experience: '6 years',
      languages: ['Arabic', 'English'],
      certifications: ['SCE License', 'NEBOSH'],
      hourlyRate: 320,
      status: 'Busy',
      lastActive: '2024-01-25 12:20:10',
      profileImage: null,
      isVerified: true,
      isPremium: false,
      projectHistory: [
        {
          id: 'p6',
          title: 'Safety Audit - Plant',
          completed: '2024-01-15',
          rating: 5,
          budget: '8,000 SAR',
          duration: '1 week',
        },
      ],
    },
    {
      id: '4',
      name: 'Fatima Al-Sheikh',
      specialization: 'Environmental Engineering',
      rating: 4.9,
      totalJobs: 2,
      lastHired: '2024-01-10',
      totalEarnings: 16000,
      currency: 'SAR',
      completionRate: 100,
      avgResponseTime: '1 hour',
      location: 'Riyadh, Saudi Arabia',
      experience: '10 years',
      languages: ['Arabic', 'English', 'German'],
      certifications: ['SCE License', 'ISO 14001'],
      hourlyRate: 420,
      status: 'Offline',
      lastActive: '2024-01-24 18:30:45',
      profileImage: null,
      isVerified: true,
      isPremium: true,
      projectHistory: [
        {
          id: 'p7',
          title: 'Environmental Impact Assessment',
          completed: '2024-01-10',
          rating: 5,
          budget: '10,000 SAR',
          duration: '2 weeks',
        },
        {
          id: 'p8',
          title: 'Sustainability Report',
          completed: '2024-01-05',
          rating: 4,
          budget: '6,000 SAR',
          duration: '1 week',
        },
      ],
    },
    {
      id: '5',
      name: 'Khalid Al-Mutairi',
      specialization: 'BIM Engineering',
      rating: 4.6,
      totalJobs: 1,
      lastHired: '2024-01-08',
      totalEarnings: 12000,
      currency: 'SAR',
      completionRate: 100,
      avgResponseTime: '4 hours',
      location: 'NEOM, Saudi Arabia',
      experience: '5 years',
      languages: ['Arabic', 'English'],
      certifications: ['SCE License', 'Autodesk Certified'],
      hourlyRate: 350,
      status: 'Available',
      lastActive: '2024-01-25 10:15:30',
      profileImage: null,
      isVerified: false,
      isPremium: false,
      projectHistory: [
        {
          id: 'p9',
          title: 'BIM Modeling - NEOM Project',
          completed: '2024-01-08',
          rating: 4,
          budget: '12,000 SAR',
          duration: '3 weeks',
        },
      ],
    },
  ];

  const CategoryButton = ({ category }: { category: any }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === category.id && styles.categoryButtonSelected
      ]}
      onPress={() => setSelectedCategory(category.id)}
    >
      <Text style={[
        styles.categoryButtonText,
        selectedCategory === category.id && styles.categoryButtonTextSelected
      ]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  const RatingButton = ({ rating }: { rating: any }) => (
    <TouchableOpacity
      style={[
        styles.ratingButton,
        selectedRating === rating.id && styles.ratingButtonSelected
      ]}
      onPress={() => setSelectedRating(rating.id)}
    >
      <Text style={[
        styles.ratingButtonText,
        selectedRating === rating.id && styles.ratingButtonTextSelected
      ]}>
        {rating.name}
      </Text>
    </TouchableOpacity>
  );

  const AvailabilityButton = ({ availability }: { availability: any }) => (
    <TouchableOpacity
      style={[
        styles.availabilityButton,
        selectedAvailability === availability.id && styles.availabilityButtonSelected
      ]}
      onPress={() => setSelectedAvailability(availability.id)}
    >
      <Text style={[
        styles.availabilityButtonText,
        selectedAvailability === availability.id && styles.availabilityButtonTextSelected
      ]}>
        {availability.name}
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

  const EngineerItem = ({ engineer }: { engineer: any }) => (
    <View style={styles.engineerItem}>
      <View style={styles.engineerHeader}>
        <View style={styles.engineerInfo}>
          <View style={styles.engineerNameRow}>
            <Text style={styles.engineerName}>{engineer.name}</Text>
            {engineer.isVerified && (
              <Ionicons name="checkmark-circle" size={16} color="#28a745" />
            )}
            {engineer.isPremium && (
              <View style={styles.premiumBadge}>
                <Text style={styles.premiumText}>PRO</Text>
              </View>
            )}
          </View>
          <Text style={styles.engineerSpecialization}>{engineer.specialization}</Text>
          <Text style={styles.engineerLocation}>{engineer.location}</Text>
        </View>
        <View style={styles.engineerStatus}>
          <View style={[
            styles.statusBadge,
            { 
              backgroundColor: engineer.status === 'Available' ? '#28a745' : 
                             engineer.status === 'Busy' ? '#ffc107' : '#6c757d'
            }
          ]}>
            <Text style={styles.statusText}>{engineer.status}</Text>
          </View>
          <TouchableOpacity style={styles.favoriteButton}>
            <Ionicons name="heart" size={20} color="#dc3545" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.engineerStats}>
        <View style={styles.engineerStat}>
          <Text style={styles.engineerStatValue}>{engineer.rating}</Text>
          <Text style={styles.engineerStatLabel}>Rating</Text>
        </View>
        <View style={styles.engineerStat}>
          <Text style={styles.engineerStatValue}>{engineer.totalJobs}</Text>
          <Text style={styles.engineerStatLabel}>Jobs</Text>
        </View>
        <View style={styles.engineerStat}>
          <Text style={styles.engineerStatValue}>{engineer.completionRate}%</Text>
          <Text style={styles.engineerStatLabel}>Complete</Text>
        </View>
        <View style={styles.engineerStat}>
          <Text style={styles.engineerStatValue}>{engineer.hourlyRate}</Text>
          <Text style={styles.engineerStatLabel}>SAR/hr</Text>
        </View>
      </View>

      <View style={styles.engineerDetails}>
        <View style={styles.engineerDetail}>
          <Text style={styles.engineerDetailLabel}>Last Hired:</Text>
          <Text style={styles.engineerDetailValue}>{engineer.lastHired}</Text>
        </View>
        <View style={styles.engineerDetail}>
          <Text style={styles.engineerDetailLabel}>Total Earnings:</Text>
          <Text style={styles.engineerDetailValue}>SAR {engineer.totalEarnings.toLocaleString()}</Text>
        </View>
        <View style={styles.engineerDetail}>
          <Text style={styles.engineerDetailLabel}>Response Time:</Text>
          <Text style={styles.engineerDetailValue}>{engineer.avgResponseTime}</Text>
        </View>
        <View style={styles.engineerDetail}>
          <Text style={styles.engineerDetailLabel}>Experience:</Text>
          <Text style={styles.engineerDetailValue}>{engineer.experience}</Text>
        </View>
      </View>

      <View style={styles.projectHistory}>
        <Text style={styles.projectHistoryTitle}>Project History</Text>
        {engineer.projectHistory.map((project: any) => (
          <View key={project.id} style={styles.projectItem}>
            <View style={styles.projectInfo}>
              <Text style={styles.projectTitle}>{project.title}</Text>
              <Text style={styles.projectDetails}>
                {project.completed} • {project.budget} • {project.duration}
              </Text>
            </View>
            <View style={styles.projectRating}>
              <Ionicons name="star" size={14} color="#ffc107" />
              <Text style={styles.projectRatingText}>{project.rating}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.engineerActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble" size={16} color="#007bff" />
          <Text style={styles.actionButtonText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="add" size={16} color="#28a745" />
          <Text style={styles.actionButtonText}>Rehire</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="eye" size={16} color="#ffc107" />
          <Text style={styles.actionButtonText}>View Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="star" size={16} color="#ffc107" />
          <Text style={styles.actionButtonText}>Rate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const filteredEngineers = pastEngineers.filter(engineer => {
    if (selectedCategory !== 'all' && engineer.specialization !== categories.find(c => c.id === selectedCategory)?.name) return false;
    if (selectedRating !== 'all' && engineer.rating < parseFloat(selectedRating)) return false;
    if (selectedAvailability !== 'all' && engineer.status !== availability.find(a => a.id === selectedAvailability)?.name) return false;
    return true;
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Rehire Engineer</Text>
      <Text style={styles.subtitle}>
        Clients can rehire past engineers
      </Text>

      <View style={styles.filtersCard}>
        <Text style={styles.cardTitle}>Filters</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filtersContainer}>
            {categories.map((category) => (
              <CategoryButton key={category.id} category={category} />
            ))}
          </View>
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filtersContainer}>
            {ratings.map((rating) => (
              <RatingButton key={rating.id} rating={rating} />
            ))}
          </View>
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filtersContainer}>
            {availability.map((availability) => (
              <AvailabilityButton key={availability.id} availability={availability} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.sortCard}>
        <Text style={styles.cardTitle}>Sort By</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.sortContainer}>
            {sortOptions.map((sort) => (
              <SortButton key={sort.id} sort={sort} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.engineersCard}>
        <View style={styles.engineersHeader}>
          <Text style={styles.cardTitle}>
            {filteredEngineers.length} Past Engineer{filteredEngineers.length !== 1 ? 's' : ''}
          </Text>
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={20} color="#007bff" />
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
        {filteredEngineers.map((engineer) => (
          <EngineerItem key={engineer.id} engineer={engineer} />
        ))}
      </View>

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="search" size={24} color="#007bff" />
            <Text style={styles.actionText}>Find New Engineers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="star" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Rate Engineers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="heart" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Add to Favorites</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share" size={24} color="#28a745" />
            <Text style={styles.actionText}>Share Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          Rehire engineers you've worked with before for faster project setup. 
          View their past performance and project history to make informed decisions.
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
  filtersCard: {
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
  filtersContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  categoryButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    minWidth: 120,
    alignItems: 'center',
  },
  categoryButtonSelected: {
    backgroundColor: '#007bff',
  },
  categoryButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  categoryButtonTextSelected: {
    color: '#ffffff',
  },
  ratingButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    minWidth: 120,
    alignItems: 'center',
  },
  ratingButtonSelected: {
    backgroundColor: '#007bff',
  },
  ratingButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  ratingButtonTextSelected: {
    color: '#ffffff',
  },
  availabilityButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    minWidth: 120,
    alignItems: 'center',
  },
  availabilityButtonSelected: {
    backgroundColor: '#007bff',
  },
  availabilityButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  availabilityButtonTextSelected: {
    color: '#ffffff',
  },
  sortCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  sortContainer: {
    flexDirection: 'row',
  },
  sortButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    minWidth: 120,
    alignItems: 'center',
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
  engineersCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  engineersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 10,
  },
  searchButtonText: {
    color: '#007bff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  engineerItem: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  engineerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  engineerInfo: {
    flex: 1,
  },
  engineerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  engineerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginRight: 5,
  },
  premiumBadge: {
    backgroundColor: '#ffc107',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginLeft: 5,
  },
  premiumText: {
    color: '#000000',
    fontSize: 8,
    fontWeight: 'bold',
  },
  engineerSpecialization: {
    fontSize: 14,
    color: '#007bff',
    marginBottom: 2,
  },
  engineerLocation: {
    fontSize: 12,
    color: '#cccccc',
  },
  engineerStatus: {
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
  favoriteButton: {
    backgroundColor: '#4a4a4a',
    borderRadius: 6,
    padding: 8,
  },
  engineerStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#555555',
    paddingTop: 10,
  },
  engineerStat: {
    alignItems: 'center',
  },
  engineerStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 2,
  },
  engineerStatLabel: {
    fontSize: 10,
    color: '#cccccc',
  },
  engineerDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  engineerDetail: {
    width: '50%',
    marginBottom: 5,
  },
  engineerDetailLabel: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 2,
  },
  engineerDetailValue: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  projectHistory: {
    marginBottom: 10,
  },
  projectHistoryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  projectItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4a4a4a',
    borderRadius: 6,
    padding: 8,
    marginBottom: 5,
  },
  projectInfo: {
    flex: 1,
  },
  projectTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  projectDetails: {
    fontSize: 10,
    color: '#cccccc',
  },
  projectRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  projectRatingText: {
    color: '#ffc107',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  engineerActions: {
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

export default RehireEngineerScreen;

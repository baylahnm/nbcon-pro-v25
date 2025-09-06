import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ClientFavoritesScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedSort, setSelectedSort] = useState('recent');

  const tabs = [
    { id: 'all', name: 'All Favorites' },
    { id: 'available', name: 'Available' },
    { id: 'busy', name: 'Busy' },
    { id: 'offline', name: 'Offline' },
  ];

  const sortOptions = [
    { id: 'recent', name: 'Recently Added' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'price', name: 'Price Low to High' },
    { id: 'name', name: 'Name A-Z' },
  ];

  const favoriteEngineers = [
    {
      id: '1',
      name: 'Ahmed Al-Rashid',
      specialization: 'Structural Engineering',
      rating: 4.9,
      totalJobs: 156,
      completionRate: 98,
      avgResponseTime: '2 hours',
      hourlyRate: 450,
      currency: 'SAR',
      status: 'Available',
      lastActive: '2024-01-25 14:30:15',
      location: 'Riyadh, Saudi Arabia',
      experience: '12 years',
      languages: ['Arabic', 'English'],
      certifications: ['SCE License', 'PMP', 'PE'],
      lastHired: '2024-01-20',
      totalEarnings: 125000,
      profileImage: null,
      isVerified: true,
      isPremium: true,
    },
    {
      id: '2',
      name: 'Sarah Al-Mansouri',
      specialization: 'MEP Engineering',
      rating: 4.8,
      totalJobs: 89,
      completionRate: 96,
      avgResponseTime: '1.5 hours',
      hourlyRate: 380,
      currency: 'SAR',
      status: 'Available',
      lastActive: '2024-01-25 16:45:22',
      location: 'Jeddah, Saudi Arabia',
      experience: '8 years',
      languages: ['Arabic', 'English', 'French'],
      certifications: ['SCE License', 'LEED AP'],
      lastHired: '2024-01-18',
      totalEarnings: 89000,
      profileImage: null,
      isVerified: true,
      isPremium: false,
    },
    {
      id: '3',
      name: 'Omar Al-Zahrani',
      specialization: 'Safety Engineering',
      rating: 4.7,
      totalJobs: 67,
      completionRate: 94,
      avgResponseTime: '3 hours',
      hourlyRate: 320,
      currency: 'SAR',
      status: 'Busy',
      lastActive: '2024-01-25 12:20:10',
      location: 'Dammam, Saudi Arabia',
      experience: '6 years',
      languages: ['Arabic', 'English'],
      certifications: ['SCE License', 'NEBOSH'],
      lastHired: '2024-01-15',
      totalEarnings: 67000,
      profileImage: null,
      isVerified: true,
      isPremium: false,
    },
    {
      id: '4',
      name: 'Fatima Al-Sheikh',
      specialization: 'Environmental Engineering',
      rating: 4.9,
      totalJobs: 45,
      completionRate: 100,
      avgResponseTime: '1 hour',
      hourlyRate: 420,
      currency: 'SAR',
      status: 'Offline',
      lastActive: '2024-01-24 18:30:45',
      location: 'Riyadh, Saudi Arabia',
      experience: '10 years',
      languages: ['Arabic', 'English', 'German'],
      certifications: ['SCE License', 'ISO 14001'],
      lastHired: '2024-01-10',
      totalEarnings: 78000,
      profileImage: null,
      isVerified: true,
      isPremium: true,
    },
    {
      id: '5',
      name: 'Khalid Al-Mutairi',
      specialization: 'BIM Engineering',
      rating: 4.6,
      totalJobs: 34,
      completionRate: 92,
      avgResponseTime: '4 hours',
      hourlyRate: 350,
      currency: 'SAR',
      status: 'Available',
      lastActive: '2024-01-25 10:15:30',
      location: 'NEOM, Saudi Arabia',
      experience: '5 years',
      languages: ['Arabic', 'English'],
      certifications: ['SCE License', 'Autodesk Certified'],
      lastHired: '2024-01-08',
      totalEarnings: 45000,
      profileImage: null,
      isVerified: false,
      isPremium: false,
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
          <Text style={styles.engineerDetailLabel}>Experience:</Text>
          <Text style={styles.engineerDetailValue}>{engineer.experience}</Text>
        </View>
        <View style={styles.engineerDetail}>
          <Text style={styles.engineerDetailLabel}>Response Time:</Text>
          <Text style={styles.engineerDetailValue}>{engineer.avgResponseTime}</Text>
        </View>
        <View style={styles.engineerDetail}>
          <Text style={styles.engineerDetailLabel}>Last Hired:</Text>
          <Text style={styles.engineerDetailValue}>{engineer.lastHired}</Text>
        </View>
        <View style={styles.engineerDetail}>
          <Text style={styles.engineerDetailLabel}>Total Earnings:</Text>
          <Text style={styles.engineerDetailValue}>SAR {engineer.totalEarnings.toLocaleString()}</Text>
        </View>
      </View>

      <View style={styles.engineerLanguages}>
        <Text style={styles.languagesTitle}>Languages:</Text>
        <View style={styles.languagesList}>
          {engineer.languages.map((lang: string, index: number) => (
            <View key={index} style={styles.languageTag}>
              <Text style={styles.languageText}>{lang}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.engineerCertifications}>
        <Text style={styles.certificationsTitle}>Certifications:</Text>
        <View style={styles.certificationsList}>
          {engineer.certifications.map((cert: string, index: number) => (
            <View key={index} style={styles.certificationTag}>
              <Text style={styles.certificationText}>{cert}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.engineerActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble" size={16} color="#007bff" />
          <Text style={styles.actionButtonText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="add" size={16} color="#28a745" />
          <Text style={styles.actionButtonText}>Hire</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="eye" size={16} color="#ffc107" />
          <Text style={styles.actionButtonText}>View Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="trash" size={16} color="#dc3545" />
          <Text style={styles.actionButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const filteredEngineers = favoriteEngineers.filter(engineer => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'available') return engineer.status === 'Available';
    if (selectedTab === 'busy') return engineer.status === 'Busy';
    if (selectedTab === 'offline') return engineer.status === 'Offline';
    return true;
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Client Favorites</Text>
      <Text style={styles.subtitle}>
        Clients save engineers for quick rehiring
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

      <View style={styles.engineersCard}>
        <View style={styles.engineersHeader}>
          <Text style={styles.engineersTitle}>
            {filteredEngineers.length} Favorite Engineer{filteredEngineers.length !== 1 ? 's' : ''}
          </Text>
          <TouchableOpacity style={styles.addFavoriteButton}>
            <Ionicons name="add" size={20} color="#ffffff" />
            <Text style={styles.addFavoriteButtonText}>Add Favorite</Text>
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
            <Text style={styles.actionText}>Find Engineers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="star" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Rate Engineers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share" size={24} color="#28a745" />
            <Text style={styles.actionText}>Share List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Export List</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          Save your favorite engineers for quick access and easy rehiring. 
          You can organize them by status, rating, or specialization.
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
  engineersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  addFavoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 10,
  },
  addFavoriteButtonText: {
    color: '#ffffff',
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
  engineerLanguages: {
    marginBottom: 10,
  },
  languagesTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  languagesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  languageTag: {
    backgroundColor: '#007bff',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 5,
    marginBottom: 5,
  },
  languageText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  engineerCertifications: {
    marginBottom: 10,
  },
  certificationsTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  certificationsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  certificationTag: {
    backgroundColor: '#28a745',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 5,
    marginBottom: 5,
  },
  certificationText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
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

export default ClientFavoritesScreen;

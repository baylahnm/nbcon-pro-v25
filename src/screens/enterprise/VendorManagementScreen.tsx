import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const VendorManagementScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('all');

  const vendors = [
    {
      id: '1',
      name: 'Al-Rashid Engineering Group',
      category: 'Civil Engineering',
      rating: 4.8,
      projects: 25,
      totalValue: 15000000,
      status: 'Preferred',
      location: 'Riyadh',
      specialties: ['Infrastructure', 'Highways', 'Bridges'],
      contact: '+966501234567',
      email: 'info@alrashid-eng.com',
    },
    {
      id: '2',
      name: 'MEP Solutions Ltd',
      category: 'MEP Systems',
      rating: 4.6,
      projects: 18,
      totalValue: 12000000,
      status: 'Approved',
      location: 'Jeddah',
      specialties: ['HVAC', 'Electrical', 'Plumbing'],
      contact: '+966502345678',
      email: 'contact@mepsolutions.com',
    },
    {
      id: '3',
      name: 'BIM Technologies',
      category: 'BIM Services',
      rating: 4.9,
      projects: 32,
      totalValue: 20000000,
      status: 'Preferred',
      location: 'Dammam',
      specialties: ['3D Modeling', 'Clash Detection', '4D Scheduling'],
      contact: '+966503456789',
      email: 'hello@bimtech.com',
    },
    {
      id: '4',
      name: 'Survey Pro Services',
      category: 'Surveying',
      rating: 4.7,
      projects: 15,
      totalValue: 8000000,
      status: 'Approved',
      location: 'Medina',
      specialties: ['Land Surveying', 'Topographic', 'GPS'],
      contact: '+966504567890',
      email: 'info@surveypro.com',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Preferred': return '#28a745';
      case 'Approved': return '#007bff';
      case 'Pending': return '#ffc107';
      case 'Suspended': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const TabButton = ({ tab, label }: { tab: string; label: string }) => (
    <TouchableOpacity
      style={[
        styles.tabButton,
        selectedTab === tab && styles.tabButtonActive
      ]}
      onPress={() => setSelectedTab(tab)}
    >
      <Text style={[
        styles.tabButtonText,
        selectedTab === tab && styles.tabButtonTextActive
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const VendorCard = ({ vendor }: { vendor: any }) => (
    <View style={styles.vendorCard}>
      <View style={styles.vendorHeader}>
        <View style={styles.vendorInfo}>
          <Text style={styles.vendorName}>{vendor.name}</Text>
          <Text style={styles.vendorCategory}>{vendor.category}</Text>
          <Text style={styles.vendorLocation}>{vendor.location}</Text>
        </View>
        <View style={styles.vendorStatus}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(vendor.status) }]}>
            <Text style={styles.statusText}>{vendor.status}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#ffc107" />
            <Text style={styles.ratingText}>{vendor.rating}</Text>
          </View>
        </View>
      </View>

      <View style={styles.vendorStats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{vendor.projects}</Text>
          <Text style={styles.statLabel}>Projects</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {vendor.totalValue.toLocaleString()}
          </Text>
          <Text style={styles.statLabel}>SAR</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {Math.round(vendor.totalValue / vendor.projects).toLocaleString()}
          </Text>
          <Text style={styles.statLabel}>Avg/Project</Text>
        </View>
      </View>

      <View style={styles.specialtiesContainer}>
        <Text style={styles.specialtiesTitle}>Specialties:</Text>
        <View style={styles.specialtiesList}>
          {vendor.specialties.map((specialty: string, index: number) => (
            <View key={index} style={styles.specialtyTag}>
              <Text style={styles.specialtyText}>{specialty}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.contactInfo}>
        <View style={styles.contactItem}>
          <Ionicons name="call" size={16} color="#28a745" />
          <Text style={styles.contactText}>{vendor.contact}</Text>
        </View>
        <View style={styles.contactItem}>
          <Ionicons name="mail" size={16} color="#007bff" />
          <Text style={styles.contactText}>{vendor.email}</Text>
        </View>
      </View>

      <View style={styles.vendorActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="eye" size={16} color="#007bff" />
          <Text style={styles.actionText}>View Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble" size={16} color="#28a745" />
          <Text style={styles.actionText}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="star" size={16} color="#ffc107" />
          <Text style={styles.actionText}>Rate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const filteredVendors = vendors.filter(vendor => {
    switch (selectedTab) {
      case 'preferred':
        return vendor.status === 'Preferred';
      case 'approved':
        return vendor.status === 'Approved';
      case 'pending':
        return vendor.status === 'Pending';
      case 'all':
        return true;
      default:
        return true;
    }
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Vendor Management</Text>
      <Text style={styles.subtitle}>
        Manage preferred vendor and engineer network
      </Text>

      <View style={styles.tabContainer}>
        <TabButton tab="all" label="All" />
        <TabButton tab="preferred" label="Preferred" />
        <TabButton tab="approved" label="Approved" />
        <TabButton tab="pending" label="Pending" />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{vendors.length}</Text>
          <Text style={styles.statLabel}>Total Vendors</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {vendors.filter(v => v.status === 'Preferred').length}
          </Text>
          <Text style={styles.statLabel}>Preferred</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {vendors.reduce((sum, v) => sum + v.projects, 0)}
          </Text>
          <Text style={styles.statLabel}>Total Projects</Text>
        </View>
      </View>

      <View style={styles.vendorsContainer}>
        {filteredVendors.length > 0 ? (
          filteredVendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="people" size={60} color="#6c757d" />
            <Text style={styles.emptyStateTitle}>No Vendors Found</Text>
            <Text style={styles.emptyStateText}>
              No vendors match the selected criteria
            </Text>
          </View>
        )}
      </View>

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="person-add" size={24} color="#007bff" />
            <Text style={styles.actionText}>Add Vendor</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="search" size={24} color="#28a745" />
            <Text style={styles.actionText}>Search Vendors</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="analytics" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Performance</Text>
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
          Manage your preferred vendor network to ensure quality and reliability. 
          Preferred vendors get priority in project assignments and notifications.
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  tabButtonActive: {
    backgroundColor: '#007bff',
  },
  tabButtonText: {
    color: '#cccccc',
    fontSize: 14,
    fontWeight: '500',
  },
  tabButtonTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#cccccc',
    textAlign: 'center',
  },
  vendorsContainer: {
    marginBottom: 20,
  },
  vendorCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  vendorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  vendorInfo: {
    flex: 1,
  },
  vendorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  vendorCategory: {
    fontSize: 14,
    color: '#007bff',
    marginBottom: 2,
  },
  vendorLocation: {
    fontSize: 14,
    color: '#cccccc',
  },
  vendorStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 4,
  },
  vendorStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#cccccc',
    textAlign: 'center',
  },
  specialtiesContainer: {
    marginBottom: 15,
  },
  specialtiesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  specialtiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specialtyTag: {
    backgroundColor: '#3a3a3a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  specialtyText: {
    fontSize: 12,
    color: '#ffffff',
  },
  contactInfo: {
    marginBottom: 15,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 10,
  },
  vendorActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#3a3a3a',
  },
  actionText: {
    color: '#ffffff',
    fontSize: 12,
    marginLeft: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 15,
    marginBottom: 10,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    lineHeight: 24,
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

export default VendorManagementScreen;

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UserManagementScreen: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const filters = [
    { id: 'all', name: 'All Users', count: 8934 },
    { id: 'engineers', name: 'Engineers', count: 4567 },
    { id: 'clients', name: 'Clients', count: 3456 },
    { id: 'enterprises', name: 'Enterprises', count: 89 },
    { id: 'pending', name: 'Pending', count: 156 },
    { id: 'verified', name: 'Verified', count: 8234 },
    { id: 'suspended', name: 'Suspended', count: 23 },
  ];

  const users = [
    {
      id: '1',
      name: 'Ahmed Al-Rashid',
      email: 'ahmed.rashid@email.com',
      type: 'Engineer',
      status: 'Verified',
      joinDate: '2024-01-15',
      lastActive: '2 hours ago',
      projects: 12,
      rating: 4.8,
      verification: 'Complete',
      location: 'Riyadh',
    },
    {
      id: '2',
      name: 'Sarah Al-Mansouri',
      email: 'sarah.mansouri@company.com',
      type: 'Client',
      status: 'Verified',
      joinDate: '2024-01-10',
      lastActive: '1 day ago',
      projects: 8,
      rating: 4.9,
      verification: 'Complete',
      location: 'Jeddah',
    },
    {
      id: '3',
      name: 'Mohammed Al-Zahrani',
      email: 'm.zahrani@email.com',
      type: 'Engineer',
      status: 'Pending',
      joinDate: '2024-01-20',
      lastActive: '3 hours ago',
      projects: 0,
      rating: 0,
      verification: 'In Progress',
      location: 'Dammam',
    },
    {
      id: '4',
      name: 'Fatima Al-Shehri',
      email: 'fatima.shehri@enterprise.com',
      type: 'Enterprise',
      status: 'Verified',
      joinDate: '2023-12-01',
      lastActive: '30 minutes ago',
      projects: 45,
      rating: 4.7,
      verification: 'Complete',
      location: 'Riyadh',
    },
    {
      id: '5',
      name: 'Khalid Al-Shehri',
      email: 'k.shehri@email.com',
      type: 'Engineer',
      status: 'Suspended',
      joinDate: '2024-01-05',
      lastActive: '1 week ago',
      projects: 3,
      rating: 2.1,
      verification: 'Failed',
      location: 'Mecca',
    },
  ];

  const FilterButton = ({ filter }: { filter: any }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        selectedFilter === filter.id && styles.filterButtonSelected
      ]}
      onPress={() => setSelectedFilter(filter.id)}
    >
      <Text style={[
        styles.filterButtonText,
        selectedFilter === filter.id && styles.filterButtonTextSelected
      ]}>
        {filter.name}
      </Text>
      <Text style={[
        styles.filterCount,
        selectedFilter === filter.id && styles.filterCountSelected
      ]}>
        {filter.count}
      </Text>
    </TouchableOpacity>
  );

  const UserCard = ({ user }: { user: any }) => (
    <TouchableOpacity 
      style={styles.userCard}
      onPress={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
    >
      <View style={styles.userHeader}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
        <View style={styles.userStatus}>
          <View style={[
            styles.statusBadge,
            { 
              backgroundColor: user.status === 'Verified' ? '#28a745' : 
                             user.status === 'Pending' ? '#ffc107' : '#dc3545'
            }
          ]}>
            <Text style={styles.statusText}>{user.status}</Text>
          </View>
          <Ionicons 
            name={selectedUser === user.id ? 'chevron-up' : 'chevron-down'} 
            size={20} 
            color="#cccccc" 
          />
        </View>
      </View>
      
      {selectedUser === user.id && (
        <View style={styles.userDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Type:</Text>
            <Text style={styles.detailValue}>{user.type}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Location:</Text>
            <Text style={styles.detailValue}>{user.location}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Join Date:</Text>
            <Text style={styles.detailValue}>{user.joinDate}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Last Active:</Text>
            <Text style={styles.detailValue}>{user.lastActive}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Projects:</Text>
            <Text style={styles.detailValue}>{user.projects}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Rating:</Text>
            <Text style={styles.detailValue}>
              {user.rating > 0 ? `${user.rating}/5.0` : 'N/A'}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Verification:</Text>
            <Text style={[
              styles.detailValue,
              { color: user.verification === 'Complete' ? '#28a745' : 
                     user.verification === 'In Progress' ? '#ffc107' : '#dc3545' }
            ]}>
              {user.verification}
            </Text>
          </View>
          
          <View style={styles.userActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="eye" size={16} color="#007bff" />
              <Text style={styles.actionText}>View Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="create" size={16} color="#28a745" />
              <Text style={styles.actionText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="shield-checkmark" size={16} color="#ffc107" />
              <Text style={styles.actionText}>Verify</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="ban" size={16} color="#dc3545" />
              <Text style={styles.actionText}>Suspend</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  const filteredUsers = users.filter(user => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'engineers') return user.type === 'Engineer';
    if (selectedFilter === 'clients') return user.type === 'Client';
    if (selectedFilter === 'enterprises') return user.type === 'Enterprise';
    if (selectedFilter === 'pending') return user.status === 'Pending';
    if (selectedFilter === 'verified') return user.status === 'Verified';
    if (selectedFilter === 'suspended') return user.status === 'Suspended';
    return true;
  }).filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>User Management</Text>
      <Text style={styles.subtitle}>
        Admin directory for accounts with verification and status
      </Text>

      <View style={styles.searchCard}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#cccccc" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search users by name or email..."
            placeholderTextColor="#cccccc"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.filtersCard}>
        <Text style={styles.selectorTitle}>Filter Users</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filterButtons}>
            {filters.map((filter) => (
              <FilterButton key={filter.id} filter={filter} />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.statsCard}>
        <Text style={styles.cardTitle}>User Statistics</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>8,934</Text>
            <Text style={styles.statLabel}>Total Users</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>1,247</Text>
            <Text style={styles.statLabel}>Active Today</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>156</Text>
            <Text style={styles.statLabel}>New This Week</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>92%</Text>
            <Text style={styles.statLabel}>Verified Rate</Text>
          </View>
        </View>
      </View>

      <View style={styles.usersCard}>
        <Text style={styles.cardTitle}>
          Users ({filteredUsers.length})
        </Text>
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </View>

      <View style={styles.bulkActionsCard}>
        <Text style={styles.cardTitle}>Bulk Actions</Text>
        <View style={styles.bulkActionsGrid}>
          <TouchableOpacity style={styles.bulkActionButton}>
            <Ionicons name="checkmark-circle" size={24} color="#28a745" />
            <Text style={styles.bulkActionText}>Verify Selected</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bulkActionButton}>
            <Ionicons name="ban" size={24} color="#dc3545" />
            <Text style={styles.bulkActionText}>Suspend Selected</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bulkActionButton}>
            <Ionicons name="mail" size={24} color="#007bff" />
            <Text style={styles.bulkActionText}>Send Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bulkActionButton}>
            <Ionicons name="download" size={24} color="#ffc107" />
            <Text style={styles.bulkActionText}>Export List</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="person-add" size={24} color="#007bff" />
            <Text style={styles.actionText}>Add User</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings" size={24} color="#28a745" />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="analytics" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Analytics</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="help-circle" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Help</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle" size={20} color="#007bff" />
        <Text style={styles.infoText}>
          User management allows you to view, verify, and manage all platform users. 
          Use filters to find specific users and bulk actions for efficient management.
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
  searchCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 10,
  },
  filtersCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  selectorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
  },
  filterButtons: {
    flexDirection: 'row',
  },
  filterButton: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  filterButtonSelected: {
    backgroundColor: '#007bff',
  },
  filterButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  filterButtonTextSelected: {
    color: '#ffffff',
  },
  filterCount: {
    fontSize: 12,
    color: '#cccccc',
  },
  filterCountSelected: {
    color: '#ffffff',
  },
  statsCard: {
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#cccccc',
    textAlign: 'center',
  },
  usersCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  userCard: {
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: '#cccccc',
  },
  userStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  userDetails: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#555555',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#cccccc',
  },
  detailValue: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  userActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#555555',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 8,
    width: '48%',
  },
  actionText: {
    color: '#ffffff',
    fontSize: 12,
    marginLeft: 5,
  },
  bulkActionsCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  bulkActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  bulkActionButton: {
    width: '48%',
    backgroundColor: '#3a3a3a',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  bulkActionText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
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

export default UserManagementScreen;

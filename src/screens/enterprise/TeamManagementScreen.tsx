import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TeamManagementScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('members');

  const teamMembers = [
    {
      id: '1',
      name: 'Ahmed Al-Rashid',
      role: 'Project Manager',
      department: 'Civil Engineering',
      email: 'ahmed.rashid@company.com',
      phone: '+966501234567',
      status: 'Active',
      permissions: ['Admin', 'Project Management', 'Financial Access'],
      lastActive: '2 hours ago',
      avatar: 'A',
    },
    {
      id: '2',
      name: 'Sarah Al-Mansouri',
      role: 'Senior Engineer',
      department: 'MEP Systems',
      email: 'sarah.mansouri@company.com',
      phone: '+966502345678',
      status: 'Active',
      permissions: ['Project Management', 'Technical Access'],
      lastActive: '1 hour ago',
      avatar: 'S',
    },
    {
      id: '3',
      name: 'Mohammed Al-Zahrani',
      role: 'BIM Specialist',
      department: 'BIM Services',
      email: 'mohammed.zahrani@company.com',
      phone: '+966503456789',
      status: 'Away',
      permissions: ['Technical Access', 'File Management'],
      lastActive: '1 day ago',
      avatar: 'M',
    },
    {
      id: '4',
      name: 'Fatima Al-Shehri',
      role: 'Financial Analyst',
      department: 'Finance',
      email: 'fatima.shehri@company.com',
      phone: '+966504567890',
      status: 'Active',
      permissions: ['Financial Access', 'Reporting'],
      lastActive: '30 minutes ago',
      avatar: 'F',
    },
  ];

  const roles = [
    {
      id: '1',
      name: 'Admin',
      description: 'Full system access and management',
      permissions: ['All Permissions'],
      memberCount: 2,
    },
    {
      id: '2',
      name: 'Project Manager',
      description: 'Manage projects and team assignments',
      permissions: ['Project Management', 'Team Management', 'Reporting'],
      memberCount: 5,
    },
    {
      id: '3',
      name: 'Senior Engineer',
      description: 'Technical project execution and oversight',
      permissions: ['Technical Access', 'Project Management'],
      memberCount: 8,
    },
    {
      id: '4',
      name: 'Financial Analyst',
      description: 'Financial reporting and budget management',
      permissions: ['Financial Access', 'Reporting'],
      memberCount: 3,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return '#28a745';
      case 'Away': return '#ffc107';
      case 'Offline': return '#6c757d';
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

  const MemberCard = ({ member }: { member: any }) => (
    <View style={styles.memberCard}>
      <View style={styles.memberHeader}>
        <View style={styles.memberAvatar}>
          <Text style={styles.avatarText}>{member.avatar}</Text>
        </View>
        <View style={styles.memberInfo}>
          <Text style={styles.memberName}>{member.name}</Text>
          <Text style={styles.memberRole}>{member.role}</Text>
          <Text style={styles.memberDepartment}>{member.department}</Text>
        </View>
        <View style={styles.memberStatus}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(member.status) }]}>
            <Text style={styles.statusText}>{member.status}</Text>
          </View>
          <Text style={styles.lastActive}>{member.lastActive}</Text>
        </View>
      </View>

      <View style={styles.memberDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="mail" size={16} color="#007bff" />
          <Text style={styles.detailText}>{member.email}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="call" size={16} color="#28a745" />
          <Text style={styles.detailText}>{member.phone}</Text>
        </View>
      </View>

      <View style={styles.permissionsContainer}>
        <Text style={styles.permissionsTitle}>Permissions:</Text>
        <View style={styles.permissionsList}>
          {member.permissions.map((permission: string, index: number) => (
            <View key={index} style={styles.permissionTag}>
              <Text style={styles.permissionText}>{permission}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.memberActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="create" size={16} color="#007bff" />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="key" size={16} color="#ffc107" />
          <Text style={styles.actionText}>Permissions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble" size={16} color="#28a745" />
          <Text style={styles.actionText}>Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const RoleCard = ({ role }: { role: any }) => (
    <View style={styles.roleCard}>
      <View style={styles.roleHeader}>
        <View style={styles.roleInfo}>
          <Text style={styles.roleName}>{role.name}</Text>
          <Text style={styles.roleDescription}>{role.description}</Text>
        </View>
        <View style={styles.roleStats}>
          <Text style={styles.memberCount}>{role.memberCount} members</Text>
        </View>
      </View>

      <View style={styles.permissionsContainer}>
        <Text style={styles.permissionsTitle}>Permissions:</Text>
        <View style={styles.permissionsList}>
          {role.permissions.map((permission: string, index: number) => (
            <View key={index} style={styles.permissionTag}>
              <Text style={styles.permissionText}>{permission}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.roleActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="create" size={16} color="#007bff" />
          <Text style={styles.actionText}>Edit Role</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="people" size={16} color="#28a745" />
          <Text style={styles.actionText}>View Members</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Team Management</Text>
      <Text style={styles.subtitle}>
        Manage team members, roles, and access permissions
      </Text>

      <View style={styles.tabContainer}>
        <TabButton tab="members" label="Team Members" />
        <TabButton tab="roles" label="Roles & Permissions" />
        <TabButton tab="departments" label="Departments" />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{teamMembers.length}</Text>
          <Text style={styles.statLabel}>Total Members</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {teamMembers.filter(m => m.status === 'Active').length}
          </Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{roles.length}</Text>
          <Text style={styles.statLabel}>Roles</Text>
        </View>
      </View>

      {selectedTab === 'members' && (
        <View style={styles.membersContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Team Members</Text>
            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add" size={16} color="#ffffff" />
              <Text style={styles.addButtonText}>Add Member</Text>
            </TouchableOpacity>
          </View>
          {teamMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </View>
      )}

      {selectedTab === 'roles' && (
        <View style={styles.rolesContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Roles & Permissions</Text>
            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add" size={16} color="#ffffff" />
              <Text style={styles.addButtonText}>Create Role</Text>
            </TouchableOpacity>
          </View>
          {roles.map((role) => (
            <RoleCard key={role.id} role={role} />
          ))}
        </View>
      )}

      {selectedTab === 'departments' && (
        <View style={styles.departmentsContainer}>
          <Text style={styles.sectionTitle}>Departments</Text>
          <View style={styles.departmentList}>
            <View style={styles.departmentItem}>
              <Text style={styles.departmentName}>Civil Engineering</Text>
              <Text style={styles.departmentMembers}>5 members</Text>
            </View>
            <View style={styles.departmentItem}>
              <Text style={styles.departmentName}>MEP Systems</Text>
              <Text style={styles.departmentMembers}>3 members</Text>
            </View>
            <View style={styles.departmentItem}>
              <Text style={styles.departmentName}>BIM Services</Text>
              <Text style={styles.departmentMembers}>4 members</Text>
            </View>
            <View style={styles.departmentItem}>
              <Text style={styles.departmentName}>Finance</Text>
              <Text style={styles.departmentMembers}>2 members</Text>
            </View>
          </View>
        </View>
      )}

      <View style={styles.quickActionsCard}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="person-add" size={24} color="#007bff" />
            <Text style={styles.actionText}>Invite Member</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="shield" size={24} color="#28a745" />
            <Text style={styles.actionText}>Security Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="analytics" size={24} color="#ffc107" />
            <Text style={styles.actionText}>Activity Log</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings" size={24} color="#dc3545" />
            <Text style={styles.actionText}>Team Settings</Text>
          </TouchableOpacity>
        </View>
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
  membersContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  memberCard: {
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
  memberHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  memberAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  memberRole: {
    fontSize: 14,
    color: '#007bff',
    marginBottom: 2,
  },
  memberDepartment: {
    fontSize: 14,
    color: '#cccccc',
  },
  memberStatus: {
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
    fontSize: 12,
    fontWeight: 'bold',
  },
  lastActive: {
    fontSize: 12,
    color: '#cccccc',
  },
  memberDetails: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 10,
  },
  permissionsContainer: {
    marginBottom: 15,
  },
  permissionsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  permissionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  permissionTag: {
    backgroundColor: '#3a3a3a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  permissionText: {
    fontSize: 12,
    color: '#ffffff',
  },
  memberActions: {
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
  rolesContainer: {
    marginBottom: 20,
  },
  roleCard: {
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
  roleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  roleInfo: {
    flex: 1,
  },
  roleName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  roleDescription: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
  },
  roleStats: {
    alignItems: 'flex-end',
  },
  memberCount: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: 'bold',
  },
  roleActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  departmentsContainer: {
    marginBottom: 20,
  },
  departmentList: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
  },
  departmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  departmentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  departmentMembers: {
    fontSize: 14,
    color: '#cccccc',
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
});

export default TeamManagementScreen;

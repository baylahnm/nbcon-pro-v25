import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import CustomButton from '../../../components/CustomButton';

interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'engineer' | 'admin';
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  joinDate: string;
  lastActive: string;
  profileCompleteness: number;
  verificationStatus: 'verified' | 'pending' | 'rejected';
  avatar: string;
  location: string;
}

interface UserAction {
  id: string;
  label: string;
  icon: string;
  color: string;
  action: (user: UserAccount) => void;
}

const UserManagementScreen = ({ navigation }: any) => {
  const { isDarkMode } = useTheme();
  const { language, getText } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'suspended'>('all');
  const [filterRole, setFilterRole] = useState<'all' | 'client' | 'engineer' | 'admin'>('all');

  const users: UserAccount[] = [
    {
      id: '1',
      name: 'Ahmed Al-Mahmoud',
      email: 'ahmed@company.com',
      role: 'engineer',
      status: 'active',
      joinDate: '2023-01-15',
      lastActive: '2 hours ago',
      profileCompleteness: 95,
      verificationStatus: 'verified',
      avatar: '👨‍💼',
      location: 'Riyadh, SA',
    },
    {
      id: '2',
      name: 'Fatima Al-Zahra',
      email: 'fatima@client.com',
      role: 'client',
      status: 'active',
      joinDate: '2023-02-20',
      lastActive: '1 day ago',
      profileCompleteness: 87,
      verificationStatus: 'verified',
      avatar: '👩‍💼',
      location: 'Jeddah, SA',
    },
    {
      id: '3',
      name: 'Omar bin Rashid',
      email: 'omar@engineer.com',
      role: 'engineer',
      status: 'inactive',
      joinDate: '2023-03-10',
      lastActive: '1 week ago',
      profileCompleteness: 62,
      verificationStatus: 'pending',
      avatar: '👨‍🔧',
      location: 'Dammam, SA',
    },
    {
      id: '4',
      name: 'Sarah Al-Qasimi',
      email: 'sarah@admin.com',
      role: 'admin',
      status: 'active',
      joinDate: '2022-12-01',
      lastActive: '5 minutes ago',
      profileCompleteness: 100,
      verificationStatus: 'verified',
      avatar: '👩‍💻',
      location: 'Riyadh, SA',
    },
    {
      id: '5',
      name: 'Khalid Al-Mansouri',
      email: 'khalid@suspended.com',
      role: 'client',
      status: 'suspended',
      joinDate: '2023-04-05',
      lastActive: '2 weeks ago',
      profileCompleteness: 45,
      verificationStatus: 'rejected',
      avatar: '👨‍💻',
      location: 'Mecca, SA',
    },
  ];

  const userActions: UserAction[] = [
    {
      id: 'view',
      label: getText('viewProfile', 'View Profile'),
      icon: 'person-outline',
      color: '#6366F1',
      action: (user) => navigation.navigate('UserProfile', { userId: user.id }),
    },
    {
      id: 'message',
      label: getText('sendMessage', 'Send Message'),
      icon: 'chatbubble-outline',
      color: '#10B981',
      action: (user) => navigation.navigate('ChatScreen', { userId: user.id }),
    },
    {
      id: 'suspend',
      label: getText('suspendUser', 'Suspend User'),
      icon: 'ban-outline',
      color: '#F59E0B',
      action: (user) => handleUserAction('suspend', user),
    },
    {
      id: 'delete',
      label: getText('deleteUser', 'Delete User'),
      icon: 'trash-outline',
      color: '#EF4444',
      action: (user) => handleUserAction('delete', user),
    },
  ];

  const getFilteredUsers = () => {
    let filtered = users;

    if (filterStatus !== 'all') {
      filtered = filtered.filter(user => user.status === filterStatus);
    }

    if (filterRole !== 'all') {
      filtered = filtered.filter(user => user.role === filterRole);
    }

    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const handleUserAction = (action: string, user: UserAccount) => {
    switch (action) {
      case 'suspend':
        Alert.alert(
          getText('suspendUser', 'Suspend User'),
          getText('suspendConfirmation', `Are you sure you want to suspend ${user.name}?`),
          [
            { text: getText('cancel', 'Cancel'), style: 'cancel' },
            {
              text: getText('suspend', 'Suspend'),
              style: 'destructive',
              onPress: () => {
                Alert.alert(getText('userSuspended', 'User Suspended'), `${user.name} has been suspended.`);
              }
            }
          ]
        );
        break;
      case 'delete':
        Alert.alert(
          getText('deleteUser', 'Delete User'),
          getText('deleteConfirmation', `Are you sure you want to permanently delete ${user.name}? This action cannot be undone.`),
          [
            { text: getText('cancel', 'Cancel'), style: 'cancel' },
            {
              text: getText('delete', 'Delete'),
              style: 'destructive',
              onPress: () => {
                Alert.alert(getText('userDeleted', 'User Deleted'), `${user.name} has been deleted.`);
              }
            }
          ]
        );
        break;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return '#8B5CF6';
      case 'engineer': return '#10B981';
      case 'client': return '#6366F1';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'inactive': return '#6B7280';
      case 'suspended': return '#EF4444';
      case 'pending': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getVerificationColor = (status: string) => {
    switch (status) {
      case 'verified': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'rejected': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#111827' : '#F9FAFB',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      paddingTop: 10,
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton: {
      marginRight: language === 'ar' ? 0 : 12,
      marginLeft: language === 'ar' ? 12 : 0,
      padding: 8,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
    },
    headerActions: {
      flexDirection: 'row',
      gap: 12,
    },
    headerButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: isDarkMode ? '#374151' : '#F3F4F6',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      flex: 1,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#374151' : '#F3F4F6',
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      margin: 20,
      marginBottom: 10,
    },
    searchIcon: {
      marginRight: language === 'ar' ? 0 : 12,
      marginLeft: language === 'ar' ? 12 : 0,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: isDarkMode ? '#FFFFFF' : '#111827',
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    filtersContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginBottom: 20,
      gap: 12,
    },
    filterSection: {
      flex: 1,
    },
    filterLabel: {
      fontSize: 12,
      fontWeight: '600',
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      marginBottom: 6,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    filterButtons: {
      flexDirection: 'row',
      gap: 4,
    },
    filterButton: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      backgroundColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    activeFilter: {
      backgroundColor: '#6366F1',
    },
    filterText: {
      fontSize: 11,
      fontWeight: '600',
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
    },
    activeFilterText: {
      color: '#FFFFFF',
    },
    statsContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginBottom: 20,
      gap: 12,
    },
    statCard: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderRadius: 12,
      padding: 12,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    statValue: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 10,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: 'center',
    },
    usersList: {
      paddingHorizontal: 20,
    },
    userCard: {
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    userHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: isDarkMode ? '#4B5563' : '#E5E7EB',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: language === 'ar' ? 0 : 12,
      marginLeft: language === 'ar' ? 12 : 0,
    },
    avatarText: {
      fontSize: 20,
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 2,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    userEmail: {
      fontSize: 14,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      marginBottom: 4,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    userLocation: {
      fontSize: 12,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    userBadges: {
      flexDirection: 'row',
      gap: 6,
    },
    badge: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 12,
    },
    badgeText: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    userDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    detailItem: {
      flex: 1,
      alignItems: 'center',
    },
    detailValue: {
      fontSize: 14,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 2,
    },
    detailLabel: {
      fontSize: 10,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: 'center',
    },
    progressBar: {
      height: 4,
      backgroundColor: isDarkMode ? '#374151' : '#E5E7EB',
      borderRadius: 2,
      marginTop: 4,
    },
    progressFill: {
      height: 4,
      backgroundColor: '#6366F1',
      borderRadius: 2,
    },
    userActions: {
      flexDirection: 'row',
      gap: 8,
    },
    actionButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 8,
      gap: 4,
    },
    actionButtonText: {
      fontSize: 12,
      fontWeight: '600',
      color: '#FFFFFF',
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 60,
    },
    emptyStateIcon: {
      marginBottom: 16,
    },
    emptyStateTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 8,
      textAlign: 'center',
    },
    emptyStateDescription: {
      fontSize: 14,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: 'center',
      lineHeight: 20,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons
              name={language === 'ar' ? 'chevron-forward' : 'chevron-back'}
              size={24}
              color={isDarkMode ? '#FFFFFF' : '#111827'}
            />
          </Pressable>
          <Text style={styles.headerTitle}>
            {getText('userManagement', 'User Management')}
          </Text>
        </View>
        <View style={styles.headerActions}>
          <Pressable style={styles.headerButton} onPress={() => navigation.navigate('AddUser')}>
            <Ionicons
              name="add"
              size={20}
              color={isDarkMode ? '#9CA3AF' : '#6B7280'}
            />
          </Pressable>
          <Pressable style={styles.headerButton} onPress={() => navigation.navigate('UserAnalytics')}>
            <Ionicons
              name="analytics-outline"
              size={20}
              color={isDarkMode ? '#9CA3AF' : '#6B7280'}
            />
          </Pressable>
        </View>
      </Animated.View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={SlideInUp.delay(100)} style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color={isDarkMode ? '#9CA3AF' : '#6B7280'}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder={getText('searchUsers', 'Search users by name or email...')}
            placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </Animated.View>

        <Animated.View entering={SlideInUp.delay(200)} style={styles.filtersContainer}>
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>{getText('status', 'Status')}</Text>
            <View style={styles.filterButtons}>
              {['all', 'active', 'inactive', 'suspended'].map((status) => (
                <Pressable
                  key={status}
                  style={[
                    styles.filterButton,
                    filterStatus === status && styles.activeFilter
                  ]}
                  onPress={() => setFilterStatus(status as any)}
                >
                  <Text style={[
                    styles.filterText,
                    filterStatus === status && styles.activeFilterText
                  ]}>
                    {getText(status, status)}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>{getText('role', 'Role')}</Text>
            <View style={styles.filterButtons}>
              {['all', 'client', 'engineer', 'admin'].map((role) => (
                <Pressable
                  key={role}
                  style={[
                    styles.filterButton,
                    filterRole === role && styles.activeFilter
                  ]}
                  onPress={() => setFilterRole(role as any)}
                >
                  <Text style={[
                    styles.filterText,
                    filterRole === role && styles.activeFilterText
                  ]}>
                    {getText(role, role)}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={SlideInUp.delay(300)} style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{users.length}</Text>
            <Text style={styles.statLabel}>{getText('totalUsers', 'Total Users')}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{users.filter(u => u.status === 'active').length}</Text>
            <Text style={styles.statLabel}>{getText('activeUsers', 'Active Users')}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{users.filter(u => u.verificationStatus === 'verified').length}</Text>
            <Text style={styles.statLabel}>{getText('verifiedUsers', 'Verified')}</Text>
          </View>
        </Animated.View>

        <View style={styles.usersList}>
          {getFilteredUsers().map((user, index) => (
            <Animated.View
              key={user.id}
              entering={SlideInUp.delay(400 + index * 100)}
              style={styles.userCard}
            >
              <View style={styles.userHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{user.avatar}</Text>
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.userEmail}>{user.email}</Text>
                  <Text style={styles.userLocation}>{user.location}</Text>
                </View>
                <View style={styles.userBadges}>
                  <View style={[styles.badge, { backgroundColor: getRoleColor(user.role) }]}>
                    <Text style={styles.badgeText}>{getText(user.role, user.role)}</Text>
                  </View>
                  <View style={[styles.badge, { backgroundColor: getStatusColor(user.status) }]}>
                    <Text style={styles.badgeText}>{getText(user.status, user.status)}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.userDetails}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailValue}>{user.joinDate}</Text>
                  <Text style={styles.detailLabel}>{getText('joinDate', 'Join Date')}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailValue}>{user.lastActive}</Text>
                  <Text style={styles.detailLabel}>{getText('lastActive', 'Last Active')}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailValue}>{user.profileCompleteness}%</Text>
                  <Text style={styles.detailLabel}>{getText('profileComplete', 'Profile Complete')}</Text>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${user.profileCompleteness}%` }]} />
                  </View>
                </View>
                <View style={styles.detailItem}>
                  <View style={[styles.badge, { backgroundColor: getVerificationColor(user.verificationStatus) }]}>
                    <Text style={styles.badgeText}>{getText(user.verificationStatus, user.verificationStatus)}</Text>
                  </View>
                  <Text style={styles.detailLabel}>{getText('verification', 'Verification')}</Text>
                </View>
              </View>

              <View style={styles.userActions}>
                {userActions.slice(0, 2).map((action) => (
                  <Pressable
                    key={action.id}
                    style={[styles.actionButton, { backgroundColor: action.color }]}
                    onPress={() => action.action(user)}
                  >
                    <Ionicons name={action.icon as any} size={14} color="#FFFFFF" />
                    <Text style={styles.actionButtonText}>{action.label}</Text>
                  </Pressable>
                ))}
              </View>
            </Animated.View>
          ))}

          {getFilteredUsers().length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons
                name="people-outline"
                size={64}
                color={isDarkMode ? '#4B5563' : '#D1D5DB'}
                style={styles.emptyStateIcon}
              />
              <Text style={styles.emptyStateTitle}>
                {getText('noUsersFound', 'No Users Found')}
              </Text>
              <Text style={styles.emptyStateDescription}>
                {searchQuery
                  ? getText('tryDifferentSearch', 'Try adjusting your search criteria')
                  : getText('noUsersDesc', 'No users match the current filters')
                }
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserManagementScreen;
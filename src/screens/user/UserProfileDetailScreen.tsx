import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import CustomButton from '../../../components/CustomButton';

interface UserDetailInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'client' | 'engineer' | 'admin';
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  avatar: string;
  location: string;
  joinDate: string;
  lastActive: string;
  profileCompleteness: number;
  verificationStatus: 'verified' | 'pending' | 'rejected';
  bio: string;
  skills: string[];
  certifications: string[];
  experience: number;
  rating: number;
  reviewsCount: number;
  projectsCount: number;
  totalEarnings: number;
  successRate: number;
  responseTime: string;
  languages: string[];
  timezone: string;
  socialLinks: {
    linkedin?: string;
    website?: string;
    github?: string;
  };
}

interface ActivityLog {
  id: string;
  type: 'login' | 'project' | 'payment' | 'profile' | 'message';
  description: string;
  timestamp: string;
  metadata?: any;
}

const UserProfileDetailScreen = ({ route, navigation }: any) => {
  const { isDarkMode } = useTheme();
  const { language, getText } = useLanguage();
  const { userId } = route.params;
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'security'>('overview');

  const userInfo: UserDetailInfo = {
    id: userId || '1',
    name: 'Ahmed Al-Mahmoud',
    email: 'ahmed.mahmoud@email.com',
    phone: '+966 50 123 4567',
    role: 'engineer',
    status: 'active',
    avatar: '👨‍💼',
    location: 'Riyadh, Saudi Arabia',
    joinDate: '2023-01-15',
    lastActive: '2 hours ago',
    profileCompleteness: 95,
    verificationStatus: 'verified',
    bio: 'Senior Structural Engineer with 12+ years of experience in large-scale infrastructure projects. Specialized in seismic design and high-rise buildings.',
    skills: ['Structural Engineering', 'AutoCAD', 'Revit', 'STAAD Pro', 'Project Management'],
    certifications: ['PE License', 'SCE Certified', 'PMP', 'LEED AP'],
    experience: 12,
    rating: 4.9,
    reviewsCount: 127,
    projectsCount: 89,
    totalEarnings: 450000,
    successRate: 98,
    responseTime: '< 2 hours',
    languages: ['Arabic', 'English', 'French'],
    timezone: 'Asia/Riyadh',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/ahmadmahmoud',
      website: 'https://ahmadmahmod.com',
      github: 'https://github.com/ahmadmahmod',
    },
  };

  const activityLogs: ActivityLog[] = [
    {
      id: '1',
      type: 'login',
      description: 'User logged in from Riyadh, SA',
      timestamp: '2024-01-15 14:30:00',
    },
    {
      id: '2',
      type: 'project',
      description: 'Completed project: Riyadh Tower Complex',
      timestamp: '2024-01-14 09:15:00',
    },
    {
      id: '3',
      type: 'payment',
      description: 'Received payment: 15,000 SAR',
      timestamp: '2024-01-13 16:45:00',
    },
    {
      id: '4',
      type: 'profile',
      description: 'Updated professional portfolio',
      timestamp: '2024-01-12 11:20:00',
    },
    {
      id: '5',
      type: 'message',
      description: 'Sent message to client: Sarah Al-Qasimi',
      timestamp: '2024-01-11 08:30:00',
    },
  ];

  const handleUserAction = (action: string) => {
    switch (action) {
      case 'suspend':
        Alert.alert(
          getText('suspendUser', 'Suspend User'),
          getText('suspendConfirmation', `Are you sure you want to suspend ${userInfo.name}?`),
          [
            { text: getText('cancel', 'Cancel'), style: 'cancel' },
            {
              text: getText('suspend', 'Suspend'),
              style: 'destructive',
              onPress: () => Alert.alert(getText('userSuspended', 'User Suspended'))
            }
          ]
        );
        break;
      case 'message':
        navigation.navigate('ChatScreen', { userId: userInfo.id });
        break;
      case 'edit':
        navigation.navigate('EditUser', { userId: userInfo.id });
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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login': return 'log-in-outline';
      case 'project': return 'briefcase-outline';
      case 'payment': return 'card-outline';
      case 'profile': return 'person-outline';
      case 'message': return 'chatbubble-outline';
      default: return 'time-outline';
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
    profileCard: {
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      margin: 20,
      borderRadius: 16,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    profileHeader: {
      alignItems: 'center',
      marginBottom: 20,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: isDarkMode ? '#4B5563' : '#E5E7EB',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    avatarText: {
      fontSize: 32,
    },
    userName: {
      fontSize: 22,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 4,
      textAlign: 'center',
    },
    userEmail: {
      fontSize: 16,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      marginBottom: 8,
      textAlign: 'center',
    },
    userBadges: {
      flexDirection: 'row',
      gap: 8,
      marginBottom: 12,
    },
    badge: {
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 20,
    },
    badgeText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    quickStats: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    statItem: {
      alignItems: 'center',
    },
    statValue: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: 'center',
    },
    tabsContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    tab: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: isDarkMode ? '#374151' : '#E5E7EB',
      marginRight: language === 'ar' ? 0 : 8,
      marginLeft: language === 'ar' ? 8 : 0,
      borderRadius: 12,
      alignItems: 'center',
    },
    activeTab: {
      backgroundColor: '#6366F1',
    },
    tabText: {
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
    },
    activeTabText: {
      color: '#FFFFFF',
    },
    tabContent: {
      paddingHorizontal: 20,
    },
    sectionCard: {
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 12,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    bio: {
      fontSize: 14,
      color: isDarkMode ? '#D1D5DB' : '#4B5563',
      lineHeight: 20,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    tagsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    tag: {
      backgroundColor: isDarkMode ? '#374151' : '#F3F4F6',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
    },
    tagText: {
      fontSize: 12,
      color: isDarkMode ? '#D1D5DB' : '#4B5563',
      fontWeight: '500',
    },
    detailsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 16,
    },
    detailItem: {
      width: '47%',
    },
    detailLabel: {
      fontSize: 12,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      marginBottom: 4,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    detailValue: {
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    socialLinks: {
      flexDirection: 'row',
      gap: 12,
    },
    socialLink: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#374151' : '#F3F4F6',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      gap: 6,
    },
    socialLinkText: {
      fontSize: 12,
      color: isDarkMode ? '#D1D5DB' : '#4B5563',
      fontWeight: '500',
    },
    activityList: {
      gap: 12,
    },
    activityItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      backgroundColor: isDarkMode ? '#374151' : '#F9FAFB',
      borderRadius: 8,
    },
    activityIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: isDarkMode ? '#4B5563' : '#E5E7EB',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: language === 'ar' ? 0 : 12,
      marginLeft: language === 'ar' ? 12 : 0,
    },
    activityInfo: {
      flex: 1,
    },
    activityDescription: {
      fontSize: 14,
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 2,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    activityTimestamp: {
      fontSize: 12,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    securityItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    securityItemLast: {
      borderBottomWidth: 0,
    },
    securityLabel: {
      fontSize: 14,
      color: isDarkMode ? '#FFFFFF' : '#111827',
      fontWeight: '500',
    },
    securityValue: {
      fontSize: 14,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
    },
    actionButtons: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingBottom: 20,
      gap: 12,
    },
    actionButton: {
      flex: 1,
    },
  });

  const renderOverviewTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>{getText('about', 'About')}</Text>
        <Text style={styles.bio}>{userInfo.bio}</Text>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>{getText('skills', 'Skills')}</Text>
        <View style={styles.tagsContainer}>
          {userInfo.skills.map((skill, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>{getText('certifications', 'Certifications')}</Text>
        <View style={styles.tagsContainer}>
          {userInfo.certifications.map((cert, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{cert}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>{getText('personalInfo', 'Personal Information')}</Text>
        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>{getText('phone', 'Phone')}</Text>
            <Text style={styles.detailValue}>{userInfo.phone}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>{getText('location', 'Location')}</Text>
            <Text style={styles.detailValue}>{userInfo.location}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>{getText('timezone', 'Timezone')}</Text>
            <Text style={styles.detailValue}>{userInfo.timezone}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>{getText('responseTime', 'Response Time')}</Text>
            <Text style={styles.detailValue}>{userInfo.responseTime}</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>{getText('socialLinks', 'Social Links')}</Text>
        <View style={styles.socialLinks}>
          {userInfo.socialLinks.linkedin && (
            <Pressable style={styles.socialLink}>
              <Ionicons name="logo-linkedin" size={16} color="#0077B5" />
              <Text style={styles.socialLinkText}>LinkedIn</Text>
            </Pressable>
          )}
          {userInfo.socialLinks.website && (
            <Pressable style={styles.socialLink}>
              <Ionicons name="globe-outline" size={16} color={isDarkMode ? '#9CA3AF' : '#6B7280'} />
              <Text style={styles.socialLinkText}>Website</Text>
            </Pressable>
          )}
          {userInfo.socialLinks.github && (
            <Pressable style={styles.socialLink}>
              <Ionicons name="logo-github" size={16} color={isDarkMode ? '#FFFFFF' : '#000000'} />
              <Text style={styles.socialLinkText}>GitHub</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );

  const renderActivityTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>{getText('recentActivity', 'Recent Activity')}</Text>
        <View style={styles.activityList}>
          {activityLogs.map((activity) => (
            <View key={activity.id} style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Ionicons
                  name={getActivityIcon(activity.type) as any}
                  size={16}
                  color={isDarkMode ? '#9CA3AF' : '#6B7280'}
                />
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityDescription}>{activity.description}</Text>
                <Text style={styles.activityTimestamp}>{activity.timestamp}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderSecurityTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>{getText('accountSecurity', 'Account Security')}</Text>
        <View style={styles.securityItem}>
          <Text style={styles.securityLabel}>{getText('twoFactorAuth', 'Two-Factor Authentication')}</Text>
          <Text style={styles.securityValue}>{getText('enabled', 'Enabled')}</Text>
        </View>
        <View style={styles.securityItem}>
          <Text style={styles.securityLabel}>{getText('lastPasswordChange', 'Last Password Change')}</Text>
          <Text style={styles.securityValue}>30 days ago</Text>
        </View>
        <View style={styles.securityItem}>
          <Text style={styles.securityLabel}>{getText('loginSessions', 'Active Login Sessions')}</Text>
          <Text style={styles.securityValue}>2 active</Text>
        </View>
        <View style={[styles.securityItem, styles.securityItemLast]}>
          <Text style={styles.securityLabel}>{getText('accountStatus', 'Account Status')}</Text>
          <Text style={[styles.securityValue, { color: getStatusColor(userInfo.status) }]}>
            {getText(userInfo.status, userInfo.status)}
          </Text>
        </View>
      </View>
    </View>
  );

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
            {getText('userProfile', 'User Profile')}
          </Text>
        </View>
        <View style={styles.headerActions}>
          <Pressable style={styles.headerButton} onPress={() => handleUserAction('edit')}>
            <Ionicons
              name="create-outline"
              size={20}
              color={isDarkMode ? '#9CA3AF' : '#6B7280'}
            />
          </Pressable>
          <Pressable style={styles.headerButton} onPress={() => handleUserAction('message')}>
            <Ionicons
              name="chatbubble-outline"
              size={20}
              color={isDarkMode ? '#9CA3AF' : '#6B7280'}
            />
          </Pressable>
        </View>
      </Animated.View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={SlideInUp.delay(100)} style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{userInfo.avatar}</Text>
            </View>
            <Text style={styles.userName}>{userInfo.name}</Text>
            <Text style={styles.userEmail}>{userInfo.email}</Text>
            
            <View style={styles.userBadges}>
              <View style={[styles.badge, { backgroundColor: getRoleColor(userInfo.role) }]}>
                <Text style={styles.badgeText}>{getText(userInfo.role, userInfo.role)}</Text>
              </View>
              <View style={[styles.badge, { backgroundColor: getStatusColor(userInfo.status) }]}>
                <Text style={styles.badgeText}>{getText(userInfo.status, userInfo.status)}</Text>
              </View>
            </View>

            <View style={styles.quickStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{userInfo.rating}</Text>
                <Text style={styles.statLabel}>{getText('rating', 'Rating')}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{userInfo.projectsCount}</Text>
                <Text style={styles.statLabel}>{getText('projects', 'Projects')}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{userInfo.successRate}%</Text>
                <Text style={styles.statLabel}>{getText('successRate', 'Success Rate')}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{userInfo.experience}y</Text>
                <Text style={styles.statLabel}>{getText('experience', 'Experience')}</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        <View style={styles.tabsContainer}>
          <Pressable
            style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
            onPress={() => setActiveTab('overview')}
          >
            <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
              {getText('overview', 'Overview')}
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === 'activity' && styles.activeTab]}
            onPress={() => setActiveTab('activity')}
          >
            <Text style={[styles.tabText, activeTab === 'activity' && styles.activeTabText]}>
              {getText('activity', 'Activity')}
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === 'security' && styles.activeTab]}
            onPress={() => setActiveTab('security')}
          >
            <Text style={[styles.tabText, activeTab === 'security' && styles.activeTabText]}>
              {getText('security', 'Security')}
            </Text>
          </Pressable>
        </View>

        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'activity' && renderActivityTab()}
        {activeTab === 'security' && renderSecurityTab()}
      </ScrollView>

      <View style={styles.actionButtons}>
        <View style={styles.actionButton}>
          <CustomButton
            title={getText('sendMessage', 'Send Message')}
            onPress={() => handleUserAction('message')}
            variant="primary"
            fullWidth
          />
        </View>
        <View style={styles.actionButton}>
          <CustomButton
            title={getText('suspendUser', 'Suspend User')}
            onPress={() => handleUserAction('suspend')}
            variant="secondary"
            fullWidth
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserProfileDetailScreen;
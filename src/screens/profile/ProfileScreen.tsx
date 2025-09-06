import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import CustomButton from '../../components/CustomButton';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  title: string;
  company: string;
  location: string;
  bio: string;
  rating: number;
  reviewsCount: number;
  projectsCompleted: number;
  yearsExperience: number;
  specializations: string[];
  languages: string[];
  certifications: string[];
  isVerified: boolean;
  isProfessional: boolean;
  joinDate: string;
  lastActive: string;
}

interface ProfileStats {
  title: string;
  value: string;
  icon: string;
  color: string;
}

const ProfileScreen = ({ navigation }: any) => {
  const { isDarkMode } = useTheme();
  const { language, getText } = useLanguage();

  const [userProfile] = useState<UserProfile>({
    id: 'user123',
    name: 'Ahmed Al-Mahmoud',
    email: 'ahmed.mahmoud@email.com',
    phone: '+966 50 123 4567',
    avatar: '👨‍💼',
    title: 'Senior Structural Engineer',
    company: 'Al-Rajhi Engineering Consultants',
    location: 'Riyadh, Saudi Arabia',
    bio: 'Experienced structural engineer with 12+ years in large-scale infrastructure projects across the Gulf region. Specialized in high-rise buildings and bridge construction with a focus on sustainable design practices.',
    rating: 4.9,
    reviewsCount: 127,
    projectsCompleted: 89,
    yearsExperience: 12,
    specializations: ['Structural Engineering', 'Bridge Design', 'High-Rise Buildings', 'Seismic Analysis'],
    languages: ['Arabic', 'English', 'French'],
    certifications: ['PE License', 'SCE Certified', 'PMP Certified', 'LEED AP'],
    isVerified: true,
    isProfessional: true,
    joinDate: '2020-03-15',
    lastActive: '2 hours ago',
  });

  const profileStats: ProfileStats[] = [
    {
      title: getText('projectsCompleted', 'Projects Completed'),
      value: userProfile.projectsCompleted.toString(),
      icon: 'briefcase',
      color: '#10B981',
    },
    {
      title: getText('clientRating', 'Client Rating'),
      value: `${userProfile.rating}/5`,
      icon: 'star',
      color: '#F59E0B',
    },
    {
      title: getText('yearsExperience', 'Years Experience'),
      value: userProfile.yearsExperience.toString(),
      icon: 'trophy',
      color: '#6366F1',
    },
    {
      title: getText('totalReviews', 'Total Reviews'),
      value: userProfile.reviewsCount.toString(),
      icon: 'chatbubble',
      color: '#EF4444',
    },
  ];

  const quickActions = [
    {
      id: 'edit',
      title: getText('editProfile', 'Edit Profile'),
      icon: 'create-outline',
      color: '#6366F1',
      onPress: () => navigation.navigate('EditProfile'),
    },
    {
      id: 'settings',
      title: getText('settings', 'Settings'),
      icon: 'settings-outline',
      color: '#8B5CF6',
      onPress: () => navigation.navigate('Settings'),
    },
    {
      id: 'verification',
      title: getText('verification', 'Verification'),
      icon: 'shield-checkmark-outline',
      color: '#10B981',
      onPress: () => navigation.navigate('ProfileVerification'),
    },
    {
      id: 'portfolio',
      title: getText('portfolio', 'Portfolio'),
      icon: 'folder-outline',
      color: '#F59E0B',
      onPress: () => navigation.navigate('Portfolio'),
    },
  ];

  const handleShare = () => {
    Alert.alert(
      getText('shareProfile', 'Share Profile'),
      getText('shareProfileDesc', 'Share your professional profile with others'),
      [
        { text: getText('cancel', 'Cancel'), style: 'cancel' },
        { text: getText('share', 'Share'), onPress: () => console.log('Share profile') },
      ]
    );
  };

  const handleMessage = () => {
    navigation.navigate('ChatScreen', { userId: userProfile.id });
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
      position: 'relative',
    },
    avatarText: {
      fontSize: 32,
    },
    verificationBadge: {
      position: 'absolute',
      bottom: -2,
      right: -2,
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: '#10B981',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: isDarkMode ? '#1F2937' : '#FFFFFF',
    },
    professionalBadge: {
      position: 'absolute',
      top: -2,
      right: -2,
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: '#6366F1',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: isDarkMode ? '#1F2937' : '#FFFFFF',
    },
    profileName: {
      fontSize: 22,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      textAlign: 'center',
      marginBottom: 4,
    },
    profileTitle: {
      fontSize: 16,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: 'center',
      marginBottom: 2,
    },
    profileCompany: {
      fontSize: 14,
      color: '#6366F1',
      textAlign: 'center',
      fontWeight: '600',
      marginBottom: 8,
    },
    profileLocation: {
      fontSize: 14,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: 'center',
      flexDirection: 'row',
      alignItems: 'center',
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 12,
    },
    rating: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginRight: language === 'ar' ? 0 : 8,
      marginLeft: language === 'ar' ? 8 : 0,
    },
    reviewsText: {
      fontSize: 14,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
    },
    profileActions: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 16,
    },
    actionButton: {
      flex: 1,
    },
    statsGrid: {
      marginHorizontal: 20,
      marginBottom: 20,
    },
    statsRow: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 12,
    },
    statCard: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    statIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
    },
    statValue: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 4,
    },
    statTitle: {
      fontSize: 12,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: 'center',
    },
    quickActionsCard: {
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      marginHorizontal: 20,
      marginBottom: 20,
      borderRadius: 16,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 16,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    quickActionsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    quickActionCard: {
      width: '47%',
      backgroundColor: isDarkMode ? '#374151' : '#F9FAFB',
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
    },
    quickActionIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
    },
    quickActionTitle: {
      fontSize: 12,
      fontWeight: '600',
      color: isDarkMode ? '#D1D5DB' : '#4B5563',
      textAlign: 'center',
    },
    detailsCard: {
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      marginHorizontal: 20,
      marginBottom: 20,
      borderRadius: 16,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    bio: {
      fontSize: 14,
      color: isDarkMode ? '#D1D5DB' : '#4B5563',
      lineHeight: 20,
      marginBottom: 16,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    detailSection: {
      marginBottom: 16,
    },
    detailSectionTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 8,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    tagContainer: {
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
    metaInfo: {
      marginTop: 16,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    metaRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    metaLabel: {
      fontSize: 12,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
    },
    metaValue: {
      fontSize: 12,
      color: isDarkMode ? '#D1D5DB' : '#4B5563',
      fontWeight: '500',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
        <Text style={styles.headerTitle}>
          {getText('profile', 'Profile')}
        </Text>
        <View style={styles.headerActions}>
          <Pressable style={styles.headerButton} onPress={handleShare}>
            <Ionicons
              name="share-outline"
              size={20}
              color={isDarkMode ? '#9CA3AF' : '#6B7280'}
            />
          </Pressable>
          <Pressable style={styles.headerButton} onPress={() => navigation.navigate('Settings')}>
            <Ionicons
              name="settings-outline"
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
              <Text style={styles.avatarText}>{userProfile.avatar}</Text>
              {userProfile.isVerified && (
                <View style={styles.verificationBadge}>
                  <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                </View>
              )}
              {userProfile.isProfessional && (
                <View style={styles.professionalBadge}>
                  <Ionicons name="star" size={12} color="#FFFFFF" />
                </View>
              )}
            </View>

            <Text style={styles.profileName}>{userProfile.name}</Text>
            <Text style={styles.profileTitle}>{userProfile.title}</Text>
            <Text style={styles.profileCompany}>{userProfile.company}</Text>
            <View style={styles.profileLocation}>
              <Ionicons
                name="location-outline"
                size={16}
                color={isDarkMode ? '#9CA3AF' : '#6B7280'}
                style={{ marginRight: language === 'ar' ? 0 : 4, marginLeft: language === 'ar' ? 4 : 0 }}
              />
              <Text style={styles.profileLocation}>{userProfile.location}</Text>
            </View>

            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#F59E0B" />
              <Text style={styles.rating}>{userProfile.rating}</Text>
              <Text style={styles.reviewsText}>
                ({userProfile.reviewsCount} {getText('reviews', 'reviews')})
              </Text>
            </View>

            <View style={styles.profileActions}>
              <View style={styles.actionButton}>
                <CustomButton
                  title={getText('message', 'Message')}
                  onPress={handleMessage}
                  variant="primary"
                  fullWidth
                />
              </View>
              <View style={styles.actionButton}>
                <CustomButton
                  title={getText('viewPortfolio', 'View Portfolio')}
                  onPress={() => navigation.navigate('Portfolio')}
                  variant="secondary"
                  fullWidth
                />
              </View>
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={SlideInUp.delay(200)} style={styles.statsGrid}>
          <View style={styles.statsRow}>
            {profileStats.slice(0, 2).map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                  <Ionicons
                    name={stat.icon as any}
                    size={20}
                    color={stat.color}
                  />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statTitle}>{stat.title}</Text>
              </View>
            ))}
          </View>
          <View style={styles.statsRow}>
            {profileStats.slice(2, 4).map((stat, index) => (
              <View key={index + 2} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                  <Ionicons
                    name={stat.icon as any}
                    size={20}
                    color={stat.color}
                  />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statTitle}>{stat.title}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View entering={SlideInUp.delay(300)} style={styles.quickActionsCard}>
          <Text style={styles.sectionTitle}>
            {getText('quickActions', 'Quick Actions')}
          </Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <Pressable
                key={action.id}
                style={styles.quickActionCard}
                onPress={action.onPress}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: action.color + '20' }]}>
                  <Ionicons
                    name={action.icon as any}
                    size={20}
                    color={action.color}
                  />
                </View>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
              </Pressable>
            ))}
          </View>
        </Animated.View>

        <Animated.View entering={SlideInUp.delay(400)} style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>
            {getText('about', 'About')}
          </Text>
          
          <Text style={styles.bio}>{userProfile.bio}</Text>

          <View style={styles.detailSection}>
            <Text style={styles.detailSectionTitle}>
              {getText('specializations', 'Specializations')}
            </Text>
            <View style={styles.tagContainer}>
              {userProfile.specializations.map((spec, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{spec}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.detailSection}>
            <Text style={styles.detailSectionTitle}>
              {getText('languages', 'Languages')}
            </Text>
            <View style={styles.tagContainer}>
              {userProfile.languages.map((lang, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{lang}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.detailSection}>
            <Text style={styles.detailSectionTitle}>
              {getText('certifications', 'Certifications')}
            </Text>
            <View style={styles.tagContainer}>
              {userProfile.certifications.map((cert, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{cert}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.metaInfo}>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>{getText('memberSince', 'Member since')}</Text>
              <Text style={styles.metaValue}>{userProfile.joinDate}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>{getText('lastActive', 'Last active')}</Text>
              <Text style={styles.metaValue}>{userProfile.lastActive}</Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
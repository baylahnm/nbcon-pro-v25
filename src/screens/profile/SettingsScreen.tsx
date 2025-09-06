import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import CustomButton from '../../components/CustomButton';

interface SettingsSection {
  id: string;
  title: string;
  items: SettingsItem[];
}

interface SettingsItem {
  id: string;
  title: string;
  description?: string;
  type: 'toggle' | 'navigation' | 'action' | 'selection';
  icon: string;
  value?: boolean;
  options?: string[];
  selectedOption?: string;
  onPress?: () => void;
  color?: string;
  destructive?: boolean;
}

const SettingsScreen = ({ navigation }: any) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    locationServices: true,
    biometricAuth: true,
    autoBackup: true,
    dataSync: true,
    offlineMode: false,
    analyticsSharing: false,
  });

  const handleToggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleLogout = () => {
    Alert.alert(
      getText('logout', 'Logout'),
      getText('logoutConfirmation', 'Are you sure you want to logout?'),
      [
        { text: getText('cancel', 'Cancel'), style: 'cancel' },
        {
          text: getText('logout', 'Logout'),
          style: 'destructive',
          onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Auth' }] })
        }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      getText('deleteAccount', 'Delete Account'),
      getText('deleteAccountWarning', 'This action cannot be undone. All your data will be permanently deleted.'),
      [
        { text: getText('cancel', 'Cancel'), style: 'cancel' },
        {
          text: getText('delete', 'Delete'),
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              getText('accountDeleted', 'Account Deleted'),
              getText('accountDeletedMessage', 'Your account has been deleted successfully.')
            );
          }
        }
      ]
    );
  };

  const settingsSections: SettingsSection[] = [
    {
      id: 'account',
      title: getText('accountSettings', 'Account Settings'),
      items: [
        {
          id: 'profile',
          title: getText('editProfile', 'Edit Profile'),
          description: getText('editProfileDesc', 'Update your personal information'),
          type: 'navigation',
          icon: 'person-outline',
          onPress: () => navigation.navigate('EditProfile'),
        },
        {
          id: 'verification',
          title: getText('profileVerification', 'Profile Verification'),
          description: getText('verificationDesc', 'Verify your professional credentials'),
          type: 'navigation',
          icon: 'shield-checkmark-outline',
          color: '#10B981',
          onPress: () => navigation.navigate('ProfileVerification'),
        },
        {
          id: 'privacy',
          title: getText('privacySettings', 'Privacy Settings'),
          description: getText('privacyDesc', 'Control your privacy and data sharing'),
          type: 'navigation',
          icon: 'lock-closed-outline',
          onPress: () => navigation.navigate('PrivacySettings'),
        },
        {
          id: 'security',
          title: getText('securitySettings', 'Security Settings'),
          description: getText('securityDesc', 'Manage passwords and authentication'),
          type: 'navigation',
          icon: 'key-outline',
          onPress: () => navigation.navigate('SecuritySettings'),
        },
      ],
    },
    {
      id: 'notifications',
      title: getText('notifications', 'Notifications'),
      items: [
        {
          id: 'pushNotifications',
          title: getText('pushNotifications', 'Push Notifications'),
          description: getText('pushNotificationsDesc', 'Receive notifications on your device'),
          type: 'toggle',
          icon: 'notifications-outline',
          value: settings.pushNotifications,
          onPress: () => handleToggleSetting('pushNotifications'),
        },
        {
          id: 'emailNotifications',
          title: getText('emailNotifications', 'Email Notifications'),
          description: getText('emailNotificationsDesc', 'Receive notifications via email'),
          type: 'toggle',
          icon: 'mail-outline',
          value: settings.emailNotifications,
          onPress: () => handleToggleSetting('emailNotifications'),
        },
        {
          id: 'smsNotifications',
          title: getText('smsNotifications', 'SMS Notifications'),
          description: getText('smsNotificationsDesc', 'Receive notifications via SMS'),
          type: 'toggle',
          icon: 'chatbubble-outline',
          value: settings.smsNotifications,
          onPress: () => handleToggleSetting('smsNotifications'),
        },
        {
          id: 'marketingEmails',
          title: getText('marketingEmails', 'Marketing Emails'),
          description: getText('marketingEmailsDesc', 'Receive promotional content and updates'),
          type: 'toggle',
          icon: 'megaphone-outline',
          value: settings.marketingEmails,
          onPress: () => handleToggleSetting('marketingEmails'),
        },
      ],
    },
    {
      id: 'preferences',
      title: getText('preferences', 'Preferences'),
      items: [
        {
          id: 'darkMode',
          title: getText('darkMode', 'Dark Mode'),
          description: getText('darkModeDesc', 'Use dark theme for better visibility'),
          type: 'toggle',
          icon: 'moon-outline',
          value: isDarkMode,
          onPress: toggleTheme,
        },
        {
          id: 'language',
          title: getText('language', 'Language'),
          description: getText('languageDesc', 'Choose your preferred language'),
          type: 'selection',
          icon: 'language-outline',
          options: ['English', 'العربية'],
          selectedOption: language === 'en' ? 'English' : 'العربية',
          onPress: toggleLanguage,
        },
        {
          id: 'locationServices',
          title: getText('locationServices', 'Location Services'),
          description: getText('locationDesc', 'Allow location access for better experience'),
          type: 'toggle',
          icon: 'location-outline',
          value: settings.locationServices,
          onPress: () => handleToggleSetting('locationServices'),
        },
        {
          id: 'biometricAuth',
          title: getText('biometricAuth', 'Biometric Authentication'),
          description: getText('biometricDesc', 'Use fingerprint or face ID to login'),
          type: 'toggle',
          icon: 'finger-print-outline',
          value: settings.biometricAuth,
          onPress: () => handleToggleSetting('biometricAuth'),
        },
      ],
    },
    {
      id: 'data',
      title: getText('dataSync', 'Data & Sync'),
      items: [
        {
          id: 'autoBackup',
          title: getText('autoBackup', 'Auto Backup'),
          description: getText('autoBackupDesc', 'Automatically backup your data'),
          type: 'toggle',
          icon: 'cloud-upload-outline',
          value: settings.autoBackup,
          onPress: () => handleToggleSetting('autoBackup'),
        },
        {
          id: 'dataSync',
          title: getText('dataSync', 'Data Sync'),
          description: getText('dataSyncDesc', 'Sync data across all your devices'),
          type: 'toggle',
          icon: 'sync-outline',
          value: settings.dataSync,
          onPress: () => handleToggleSetting('dataSync'),
        },
        {
          id: 'offlineMode',
          title: getText('offlineMode', 'Offline Mode'),
          description: getText('offlineModeDesc', 'Enable offline functionality'),
          type: 'toggle',
          icon: 'cloud-offline-outline',
          value: settings.offlineMode,
          onPress: () => handleToggleSetting('offlineMode'),
        },
        {
          id: 'analyticsSharing',
          title: getText('analyticsSharing', 'Analytics Sharing'),
          description: getText('analyticsDesc', 'Help improve the app by sharing usage data'),
          type: 'toggle',
          icon: 'analytics-outline',
          value: settings.analyticsSharing,
          onPress: () => handleToggleSetting('analyticsSharing'),
        },
      ],
    },
    {
      id: 'support',
      title: getText('supportHelp', 'Support & Help'),
      items: [
        {
          id: 'help',
          title: getText('helpCenter', 'Help Center'),
          description: getText('helpCenterDesc', 'Find answers to common questions'),
          type: 'navigation',
          icon: 'help-circle-outline',
          onPress: () => navigation.navigate('HelpCenter'),
        },
        {
          id: 'contact',
          title: getText('contactSupport', 'Contact Support'),
          description: getText('contactSupportDesc', 'Get help from our support team'),
          type: 'navigation',
          icon: 'headset-outline',
          onPress: () => navigation.navigate('ContactSupport'),
        },
        {
          id: 'feedback',
          title: getText('sendFeedback', 'Send Feedback'),
          description: getText('feedbackDesc', 'Share your thoughts and suggestions'),
          type: 'navigation',
          icon: 'chatbubble-ellipses-outline',
          onPress: () => navigation.navigate('Feedback'),
        },
        {
          id: 'terms',
          title: getText('termsOfService', 'Terms of Service'),
          type: 'navigation',
          icon: 'document-text-outline',
          onPress: () => navigation.navigate('TermsOfService'),
        },
        {
          id: 'privacy',
          title: getText('privacyPolicy', 'Privacy Policy'),
          type: 'navigation',
          icon: 'shield-outline',
          onPress: () => navigation.navigate('PrivacyPolicy'),
        },
      ],
    },
    {
      id: 'account-actions',
      title: getText('accountActions', 'Account Actions'),
      items: [
        {
          id: 'logout',
          title: getText('logout', 'Logout'),
          type: 'action',
          icon: 'log-out-outline',
          color: '#F59E0B',
          onPress: handleLogout,
        },
        {
          id: 'deleteAccount',
          title: getText('deleteAccount', 'Delete Account'),
          type: 'action',
          icon: 'trash-outline',
          color: '#EF4444',
          destructive: true,
          onPress: handleDeleteAccount,
        },
      ],
    },
  ];

  const { getText } = useLanguage();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#111827' : '#F9FAFB',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      paddingTop: 10,
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#374151' : '#E5E7EB',
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
    content: {
      flex: 1,
    },
    section: {
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      marginHorizontal: 20,
      marginVertical: 8,
      borderRadius: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    sectionHeader: {
      padding: 20,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#374151' : '#F3F4F6',
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#374151' : '#F3F4F6',
    },
    lastItem: {
      borderBottomWidth: 0,
    },
    settingIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: isDarkMode ? '#374151' : '#F3F4F6',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: language === 'ar' ? 0 : 12,
      marginLeft: language === 'ar' ? 12 : 0,
    },
    settingInfo: {
      flex: 1,
    },
    settingTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 2,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    destructiveTitle: {
      color: '#EF4444',
    },
    settingDescription: {
      fontSize: 13,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    settingControl: {
      marginLeft: language === 'ar' ? 0 : 12,
      marginRight: language === 'ar' ? 12 : 0,
    },
    switch: {
      transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
    },
    selectionValue: {
      fontSize: 14,
      color: '#6366F1',
      fontWeight: '600',
    },
    chevron: {
      marginLeft: language === 'ar' ? 0 : 8,
      marginRight: language === 'ar' ? 8 : 0,
    },
    versionInfo: {
      padding: 20,
      alignItems: 'center',
    },
    versionText: {
      fontSize: 12,
      color: isDarkMode ? '#9CA3AF' : '#6B7280',
      marginBottom: 4,
    },
    buildText: {
      fontSize: 10,
      color: isDarkMode ? '#6B7280' : '#9CA3AF',
    },
  });

  const renderSettingItem = (item: SettingsItem, isLast: boolean) => (
    <Pressable
      key={item.id}
      style={[styles.settingItem, isLast && styles.lastItem]}
      onPress={item.onPress}
    >
      <View style={[
        styles.settingIcon,
        item.color && { backgroundColor: item.color + '20' }
      ]}>
        <Ionicons
          name={item.icon as any}
          size={20}
          color={item.color || (isDarkMode ? '#9CA3AF' : '#6B7280')}
        />
      </View>

      <View style={styles.settingInfo}>
        <Text style={[
          styles.settingTitle,
          item.destructive && styles.destructiveTitle
        ]}>
          {item.title}
        </Text>
        {item.description && (
          <Text style={styles.settingDescription}>{item.description}</Text>
        )}
      </View>

      <View style={styles.settingControl}>
        {item.type === 'toggle' && (
          <Switch
            style={styles.switch}
            value={item.value}
            onValueChange={item.onPress}
            trackColor={{ 
              false: isDarkMode ? '#374151' : '#E5E7EB', 
              true: '#6366F1' 
            }}
            thumbColor={item.value ? '#FFFFFF' : (isDarkMode ? '#9CA3AF' : '#FFFFFF')}
          />
        )}
        {item.type === 'selection' && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.selectionValue}>{item.selectedOption}</Text>
            <Ionicons
              name={language === 'ar' ? 'chevron-back' : 'chevron-forward'}
              size={16}
              color={isDarkMode ? '#9CA3AF' : '#6B7280'}
              style={styles.chevron}
            />
          </View>
        )}
        {item.type === 'navigation' && (
          <Ionicons
            name={language === 'ar' ? 'chevron-back' : 'chevron-forward'}
            size={16}
            color={isDarkMode ? '#9CA3AF' : '#6B7280'}
          />
        )}
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons
            name={language === 'ar' ? 'chevron-forward' : 'chevron-back'}
            size={24}
            color={isDarkMode ? '#FFFFFF' : '#111827'}
          />
        </Pressable>
        <Text style={styles.headerTitle}>
          {getText('settings', 'Settings')}
        </Text>
      </Animated.View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {settingsSections.map((section, sectionIndex) => (
          <Animated.View
            key={section.id}
            entering={SlideInUp.delay(sectionIndex * 100)}
            style={styles.section}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            {section.items.map((item, itemIndex) =>
              renderSettingItem(item, itemIndex === section.items.length - 1)
            )}
          </Animated.View>
        ))}

        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>NBCON Pro v1.0.0</Text>
          <Text style={styles.buildText}>Build 2024.01.15.001</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
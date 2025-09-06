import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import CustomButton from '../../components/CustomButton';

interface EditableProfile {
  name: string;
  email: string;
  phone: string;
  title: string;
  company: string;
  location: string;
  bio: string;
  hourlyRate: string;
  availability: string;
  website: string;
  linkedin: string;
  specializations: string[];
  languages: string[];
  yearsExperience: string;
}

const EditProfileScreen = ({ navigation }: any) => {
  const { isDarkMode } = useTheme();
  const { language, getText } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [profile, setProfile] = useState<EditableProfile>({
    name: 'Ahmed Al-Mahmoud',
    email: 'ahmed.mahmoud@email.com',
    phone: '+966 50 123 4567',
    title: 'Senior Structural Engineer',
    company: 'Al-Rajhi Engineering Consultants',
    location: 'Riyadh, Saudi Arabia',
    bio: 'Experienced structural engineer with 12+ years in large-scale infrastructure projects across the Gulf region. Specialized in high-rise buildings and bridge construction with a focus on sustainable design practices.',
    hourlyRate: '250',
    availability: 'Available for new projects',
    website: 'https://ahmadmahmod.com',
    linkedin: 'https://linkedin.com/in/ahmadmahmoud',
    specializations: ['Structural Engineering', 'Bridge Design', 'High-Rise Buildings', 'Seismic Analysis'],
    languages: ['Arabic', 'English', 'French'],
    yearsExperience: '12',
  });

  const [newSpecialization, setNewSpecialization] = useState('');
  const [newLanguage, setNewLanguage] = useState('');

  const handleInputChange = (field: keyof EditableProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const addSpecialization = () => {
    if (newSpecialization.trim() && !profile.specializations.includes(newSpecialization.trim())) {
      setProfile(prev => ({
        ...prev,
        specializations: [...prev.specializations, newSpecialization.trim()]
      }));
      setNewSpecialization('');
      setHasUnsavedChanges(true);
    }
  };

  const removeSpecialization = (index: number) => {
    setProfile(prev => ({
      ...prev,
      specializations: prev.specializations.filter((_, i) => i !== index)
    }));
    setHasUnsavedChanges(true);
  };

  const addLanguage = () => {
    if (newLanguage.trim() && !profile.languages.includes(newLanguage.trim())) {
      setProfile(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()]
      }));
      setNewLanguage('');
      setHasUnsavedChanges(true);
    }
  };

  const removeLanguage = (index: number) => {
    setProfile(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }));
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        getText('profileUpdated', 'Profile Updated'),
        getText('profileUpdateSuccess', 'Your profile has been successfully updated.'),
        [
          { text: getText('ok', 'OK'), onPress: () => {
            setHasUnsavedChanges(false);
            navigation.goBack();
          }}
        ]
      );
    } catch (error) {
      Alert.alert(
        getText('error', 'Error'),
        getText('profileUpdateError', 'Failed to update profile. Please try again.')
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      Alert.alert(
        getText('unsavedChanges', 'Unsaved Changes'),
        getText('unsavedChangesDesc', 'You have unsaved changes. Are you sure you want to leave?'),
        [
          { text: getText('keepEditing', 'Keep Editing'), style: 'cancel' },
          { text: getText('discard', 'Discard'), style: 'destructive', onPress: () => navigation.goBack() }
        ]
      );
    } else {
      navigation.goBack();
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
    content: {
      flex: 1,
    },
    formCard: {
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
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#111827',
      marginBottom: 16,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    formGroup: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? '#D1D5DB' : '#374151',
      marginBottom: 6,
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    textInput: {
      backgroundColor: isDarkMode ? '#374151' : '#F9FAFB',
      borderWidth: 1,
      borderColor: isDarkMode ? '#4B5563' : '#D1D5DB',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
      color: isDarkMode ? '#FFFFFF' : '#111827',
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    textInputFocused: {
      borderColor: '#6366F1',
    },
    textArea: {
      minHeight: 80,
      textAlignVertical: 'top',
    },
    row: {
      flexDirection: 'row',
      gap: 12,
    },
    halfWidth: {
      flex: 1,
    },
    tagSection: {
      marginBottom: 16,
    },
    addTagContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 12,
    },
    addTagInput: {
      flex: 1,
      backgroundColor: isDarkMode ? '#374151' : '#F9FAFB',
      borderWidth: 1,
      borderColor: isDarkMode ? '#4B5563' : '#D1D5DB',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 8,
      fontSize: 14,
      color: isDarkMode ? '#FFFFFF' : '#111827',
      textAlign: language === 'ar' ? 'right' : 'left',
    },
    addButton: {
      backgroundColor: '#6366F1',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
    addButtonText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '600',
    },
    tagsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    tag: {
      backgroundColor: isDarkMode ? '#4B5563' : '#E5E7EB',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    tagText: {
      fontSize: 12,
      color: isDarkMode ? '#D1D5DB' : '#4B5563',
      fontWeight: '500',
    },
    removeTagButton: {
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: isDarkMode ? '#6B7280' : '#9CA3AF',
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarSection: {
      alignItems: 'center',
      marginBottom: 20,
      paddingBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#374151' : '#E5E7EB',
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
    changePhotoButton: {
      backgroundColor: '#6366F1',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
    changePhotoText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '600',
    },
    footer: {
      padding: 20,
      backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? '#374151' : '#E5E7EB',
    },
    footerButtons: {
      flexDirection: 'row',
      gap: 12,
    },
    footerButton: {
      flex: 1,
    },
    unsavedIndicator: {
      position: 'absolute',
      top: -4,
      right: -4,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#EF4444',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable style={styles.backButton} onPress={handleCancel}>
            <Ionicons
              name={language === 'ar' ? 'chevron-forward' : 'chevron-back'}
              size={24}
              color={isDarkMode ? '#FFFFFF' : '#111827'}
            />
          </Pressable>
          <Text style={styles.headerTitle}>
            {getText('editProfile', 'Edit Profile')}
            {hasUnsavedChanges && <View style={styles.unsavedIndicator} />}
          </Text>
        </View>
      </Animated.View>

      <KeyboardAvoidingView 
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Animated.View entering={SlideInUp.delay(100)} style={styles.formCard}>
            <View style={styles.avatarSection}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>👨‍💼</Text>
              </View>
              <Pressable style={styles.changePhotoButton}>
                <Text style={styles.changePhotoText}>
                  {getText('changePhoto', 'Change Photo')}
                </Text>
              </Pressable>
            </View>

            <Text style={styles.sectionTitle}>
              {getText('basicInformation', 'Basic Information')}
            </Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>{getText('fullName', 'Full Name')}</Text>
              <TextInput
                style={styles.textInput}
                value={profile.name}
                onChangeText={(value) => handleInputChange('name', value)}
                placeholder={getText('enterFullName', 'Enter your full name')}
                placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.formGroup, styles.halfWidth]}>
                <Text style={styles.label}>{getText('email', 'Email')}</Text>
                <TextInput
                  style={styles.textInput}
                  value={profile.email}
                  onChangeText={(value) => handleInputChange('email', value)}
                  placeholder={getText('enterEmail', 'Enter your email')}
                  placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
                  keyboardType="email-address"
                />
              </View>
              <View style={[styles.formGroup, styles.halfWidth]}>
                <Text style={styles.label}>{getText('phone', 'Phone')}</Text>
                <TextInput
                  style={styles.textInput}
                  value={profile.phone}
                  onChangeText={(value) => handleInputChange('phone', value)}
                  placeholder={getText('enterPhone', 'Enter your phone')}
                  placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>{getText('professionalTitle', 'Professional Title')}</Text>
              <TextInput
                style={styles.textInput}
                value={profile.title}
                onChangeText={(value) => handleInputChange('title', value)}
                placeholder={getText('enterTitle', 'Enter your professional title')}
                placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.formGroup, styles.halfWidth]}>
                <Text style={styles.label}>{getText('company', 'Company')}</Text>
                <TextInput
                  style={styles.textInput}
                  value={profile.company}
                  onChangeText={(value) => handleInputChange('company', value)}
                  placeholder={getText('enterCompany', 'Enter your company')}
                  placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
                />
              </View>
              <View style={[styles.formGroup, styles.halfWidth]}>
                <Text style={styles.label}>{getText('location', 'Location')}</Text>
                <TextInput
                  style={styles.textInput}
                  value={profile.location}
                  onChangeText={(value) => handleInputChange('location', value)}
                  placeholder={getText('enterLocation', 'Enter your location')}
                  placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>{getText('bio', 'Bio')}</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={profile.bio}
                onChangeText={(value) => handleInputChange('bio', value)}
                placeholder={getText('enterBio', 'Tell us about yourself and your experience')}
                placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.formGroup, styles.halfWidth]}>
                <Text style={styles.label}>{getText('hourlyRate', 'Hourly Rate (SAR)')}</Text>
                <TextInput
                  style={styles.textInput}
                  value={profile.hourlyRate}
                  onChangeText={(value) => handleInputChange('hourlyRate', value)}
                  placeholder={getText('enterHourlyRate', 'Enter hourly rate')}
                  placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.formGroup, styles.halfWidth]}>
                <Text style={styles.label}>{getText('yearsExperience', 'Years of Experience')}</Text>
                <TextInput
                  style={styles.textInput}
                  value={profile.yearsExperience}
                  onChangeText={(value) => handleInputChange('yearsExperience', value)}
                  placeholder={getText('enterYearsExp', 'Enter years')}
                  placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>{getText('availability', 'Availability')}</Text>
              <TextInput
                style={styles.textInput}
                value={profile.availability}
                onChangeText={(value) => handleInputChange('availability', value)}
                placeholder={getText('enterAvailability', 'Enter your current availability')}
                placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.formGroup, styles.halfWidth]}>
                <Text style={styles.label}>{getText('website', 'Website')}</Text>
                <TextInput
                  style={styles.textInput}
                  value={profile.website}
                  onChangeText={(value) => handleInputChange('website', value)}
                  placeholder={getText('enterWebsite', 'Enter your website')}
                  placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
                  keyboardType="url"
                />
              </View>
              <View style={[styles.formGroup, styles.halfWidth]}>
                <Text style={styles.label}>{getText('linkedin', 'LinkedIn')}</Text>
                <TextInput
                  style={styles.textInput}
                  value={profile.linkedin}
                  onChangeText={(value) => handleInputChange('linkedin', value)}
                  placeholder={getText('enterLinkedIn', 'Enter LinkedIn URL')}
                  placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
                  keyboardType="url"
                />
              </View>
            </View>
          </Animated.View>

          <Animated.View entering={SlideInUp.delay(200)} style={styles.formCard}>
            <Text style={styles.sectionTitle}>
              {getText('specializations', 'Specializations')}
            </Text>

            <View style={styles.tagSection}>
              <View style={styles.addTagContainer}>
                <TextInput
                  style={styles.addTagInput}
                  value={newSpecialization}
                  onChangeText={setNewSpecialization}
                  placeholder={getText('addSpecialization', 'Add specialization')}
                  placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
                />
                <Pressable style={styles.addButton} onPress={addSpecialization}>
                  <Text style={styles.addButtonText}>{getText('add', 'Add')}</Text>
                </Pressable>
              </View>

              <View style={styles.tagsContainer}>
                {profile.specializations.map((spec, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{spec}</Text>
                    <Pressable
                      style={styles.removeTagButton}
                      onPress={() => removeSpecialization(index)}
                    >
                      <Ionicons name="close" size={10} color="#FFFFFF" />
                    </Pressable>
                  </View>
                ))}
              </View>
            </View>

            <Text style={styles.sectionTitle}>
              {getText('languages', 'Languages')}
            </Text>

            <View style={styles.tagSection}>
              <View style={styles.addTagContainer}>
                <TextInput
                  style={styles.addTagInput}
                  value={newLanguage}
                  onChangeText={setNewLanguage}
                  placeholder={getText('addLanguage', 'Add language')}
                  placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
                />
                <Pressable style={styles.addButton} onPress={addLanguage}>
                  <Text style={styles.addButtonText}>{getText('add', 'Add')}</Text>
                </Pressable>
              </View>

              <View style={styles.tagsContainer}>
                {profile.languages.map((lang, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{lang}</Text>
                    <Pressable
                      style={styles.removeTagButton}
                      onPress={() => removeLanguage(index)}
                    >
                      <Ionicons name="close" size={10} color="#FFFFFF" />
                    </Pressable>
                  </View>
                ))}
              </View>
            </View>
          </Animated.View>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.footerButtons}>
            <View style={styles.footerButton}>
              <CustomButton
                title={getText('cancel', 'Cancel')}
                onPress={handleCancel}
                variant="secondary"
                fullWidth
              />
            </View>
            <View style={styles.footerButton}>
              <CustomButton
                title={getText('saveChanges', 'Save Changes')}
                onPress={handleSave}
                variant="primary"
                fullWidth
                loading={isLoading}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
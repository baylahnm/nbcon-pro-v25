import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { Camera } from 'expo-camera';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

interface Permission {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  icon: string;
  color: string;
  required: boolean;
  granted: boolean;
}

const PermissionRequestsScreen = () => {
  const navigation = useNavigation();
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: 'location',
      title: { en: 'Location Access', ar: 'الوصول للموقع' },
      description: {
        en: 'Required for geofencing, engineer matching, and project site verification',
        ar: 'مطلوب للتتبع الجغرافي ومطابقة المهندسين والتحقق من مواقع المشاريع'
      },
      icon: 'location',
      color: '#FF9800',
      required: true,
      granted: false,
    },
    {
      id: 'notifications',
      title: { en: 'Push Notifications', ar: 'الإشعارات الفورية' },
      description: {
        en: 'Stay updated with job invitations, messages, and project updates',
        ar: 'ابق على اطلاع بدعوات العمل والرسائل وتحديثات المشاريع'
      },
      icon: 'notifications',
      color: '#2196F3',
      required: true,
      granted: false,
    },
    {
      id: 'camera',
      title: { en: 'Camera Access', ar: 'الوصول للكاميرا' },
      description: {
        en: 'Upload project photos, scan documents, and capture site progress',
        ar: 'رفع صور المشاريع ومسح المستندات وتوثيق تقدم الموقع'
      },
      icon: 'camera',
      color: '#4CAF50',
      required: false,
      granted: false,
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.log('Location permission error:', error);
      return false;
    }
  };

  const requestNotificationPermission = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.log('Notification permission error:', error);
      return false;
    }
  };

  const requestCameraPermission = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.log('Camera permission error:', error);
      return false;
    }
  };

  const handlePermissionRequest = async (permissionId: string) => {
    let granted = false;

    switch (permissionId) {
      case 'location':
        granted = await requestLocationPermission();
        break;
      case 'notifications':
        granted = await requestNotificationPermission();
        break;
      case 'camera':
        granted = await requestCameraPermission();
        break;
    }

    setPermissions(prev =>
      prev.map(permission =>
        permission.id === permissionId
          ? { ...permission, granted }
          : permission
      )
    );

    if (!granted) {
      const permission = permissions.find(p => p.id === permissionId);
      if (permission?.required) {
        Alert.alert(
          isArabic ? 'إذن مطلوب' : 'Permission Required',
          isArabic
            ? `${getText(permission.title)} مطلوب لاستخدام التطبيق. يرجى تفعيله من الإعدادات.`
            : `${getText(permission.title)} is required for the app to function properly. Please enable it in Settings.`,
          [
            { text: isArabic ? 'إلغاء' : 'Cancel', style: 'cancel' },
            { text: isArabic ? 'الإعدادات' : 'Settings', onPress: () => {
              // Note: In a real app, you would open system settings
              Alert.alert(
                isArabic ? 'افتح الإعدادات' : 'Open Settings',
                isArabic
                  ? 'يرجى الانتقال إلى إعدادات التطبيق وتفعيل الأذونات المطلوبة'
                  : 'Please go to App Settings and enable the required permissions'
              );
            }},
          ]
        );
      }
    }
  };

  const handleContinue = async () => {
    const requiredPermissions = permissions.filter(p => p.required);
    const grantedRequired = requiredPermissions.filter(p => p.granted);

    if (grantedRequired.length < requiredPermissions.length) {
      Alert.alert(
        isArabic ? 'أذونات مطلوبة' : 'Permissions Required',
        isArabic
          ? 'يرجى منح جميع الأذونات المطلوبة للمتابعة'
          : 'Please grant all required permissions to continue',
        [{ text: isArabic ? 'موافق' : 'OK' }]
      );
      return;
    }

    setIsLoading(true);

    try {
      // Simulate saving permissions
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Navigate to Account Type Confirmation screen (Page 20)
      navigation.navigate('AccountTypeConfirmation' as never);
    } catch (error) {
      Alert.alert(
        isArabic ? 'خطأ' : 'Error',
        isArabic
          ? 'حدث خطأ أثناء حفظ الأذونات. يرجى المحاولة مرة أخرى.'
          : 'Failed to save permissions. Please try again.',
        [{ text: isArabic ? 'موافق' : 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    Alert.alert(
      isArabic ? 'تخطي الأذونات؟' : 'Skip Permissions?',
      isArabic
        ? 'تخطي الأذونات قد يحد من وظائف التطبيق. هل تريد المتابعة؟'
        : 'Skipping permissions may limit app functionality. Do you want to continue?',
      [
        { text: isArabic ? 'إلغاء' : 'Cancel', style: 'cancel' },
        {
          text: isArabic ? 'تخطي' : 'Skip',
          style: 'destructive',
          onPress: () => navigation.navigate('AccountTypeConfirmation' as never),
        },
      ]
    );
  };

  const allRequiredGranted = permissions
    .filter(p => p.required)
    .every(p => p.granted);

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1a1a1a', '#2d2d2d'] : ['#f8f9fa', '#ffffff']}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: COLORS.primary }]}>
            <Ionicons name="shield-checkmark" size={50} color={COLORS.white} />
          </View>
          
          <Text style={[styles.title, { color: theme.text }]}>
            {isArabic ? 'أذونات التطبيق' : 'App Permissions'}
          </Text>
          
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {isArabic
              ? 'نحتاج بعض الأذونات لتقديم أفضل تجربة ممكنة'
              : 'We need a few permissions to provide the best possible experience'
            }
          </Text>
        </View>

        {/* Permissions List */}
        <View style={styles.permissionsContainer}>
          {permissions.map((permission) => (
            <View key={permission.id} style={[styles.permissionCard, { backgroundColor: theme.surface }]}>
              <View style={styles.permissionHeader}>
                <View style={[styles.permissionIcon, { backgroundColor: permission.color + '15' }]}>
                  <Ionicons name={permission.icon as any} size={30} color={permission.color} />
                </View>
                
                <View style={styles.permissionInfo}>
                  <View style={styles.titleRow}>
                    <Text style={[styles.permissionTitle, { color: theme.text }]}>
                      {getText(permission.title)}
                    </Text>
                    {permission.required && (
                      <View style={[styles.requiredBadge, { backgroundColor: COLORS.error + '15' }]}>
                        <Text style={[styles.requiredText, { color: COLORS.error }]}>
                          {isArabic ? 'مطلوب' : 'Required'}
                        </Text>
                      </View>
                    )}
                  </View>
                  
                  <Text style={[styles.permissionDescription, { color: theme.textSecondary }]}>
                    {getText(permission.description)}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.permissionButton,
                  {
                    backgroundColor: permission.granted
                      ? COLORS.success + '15'
                      : permission.color + '15',
                    borderColor: permission.granted ? COLORS.success : permission.color,
                  },
                ]}
                onPress={() => handlePermissionRequest(permission.id)}
                disabled={permission.granted}
              >
                <Ionicons
                  name={permission.granted ? 'checkmark-circle' : 'add-circle-outline'}
                  size={24}
                  color={permission.granted ? COLORS.success : permission.color}
                />
                <Text
                  style={[
                    styles.permissionButtonText,
                    { color: permission.granted ? COLORS.success : permission.color },
                  ]}
                >
                  {permission.granted
                    ? (isArabic ? 'مُفعَّل' : 'Granted')
                    : (isArabic ? 'تفعيل' : 'Grant')
                  }
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Privacy Notice */}
        <View style={[styles.privacyNotice, { backgroundColor: theme.surface }]}>
          <Ionicons name="lock-closed" size={24} color={COLORS.primary} />
          <Text style={[styles.privacyText, { color: theme.textSecondary }]}>
            {isArabic
              ? 'نحن نحترم خصوصيتك. تُستخدم هذه الأذونات فقط لتحسين تجربتك وتقديم الخدمات.'
              : 'We respect your privacy. These permissions are only used to enhance your experience and provide services.'
            }
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <CustomButton
            title={isArabic ? 'متابعة' : 'Continue'}
            onPress={handleContinue}
            loading={isLoading}
            disabled={!allRequiredGranted}
            icon="checkmark"
            fullWidth
            size="large"
          />

          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={[styles.skipText, { color: theme.textSecondary }]}>
              {isArabic ? 'تخطي الآن' : 'Skip for now'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '90%', backgroundColor: COLORS.primary }]} />
          </View>
          <Text style={[styles.progressText, { color: theme.textSecondary }]}>
            {isArabic ? 'تقريباً انتهيت!' : 'Almost done!'}
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
    marginTop: SPACING.lg,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.h1,
    fontWeight: TYPOGRAPHY.weights.bold,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: SPACING.md,
  },
  permissionsContainer: {
    marginBottom: SPACING.xl,
  },
  permissionCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  permissionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  permissionIcon: {
    width: 60,
    height: 60,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  permissionInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  permissionTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    flex: 1,
  },
  requiredBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    marginLeft: SPACING.sm,
  },
  requiredText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  permissionDescription: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 20,
  },
  permissionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 2,
    gap: SPACING.sm,
  },
  permissionButtonText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  privacyNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.xl,
    gap: SPACING.md,
  },
  privacyText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    flex: 1,
    lineHeight: 20,
  },
  buttonContainer: {
    marginBottom: SPACING.lg,
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
    marginTop: SPACING.md,
  },
  skipText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: COLORS.light.border,
    borderRadius: 3,
    marginBottom: SPACING.sm,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
});

export default PermissionRequestsScreen;
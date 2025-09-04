import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { RootState } from '../../store';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { UserRole, Language } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';

type RoleSelectionNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'RoleSelection'>;

interface Props {
  navigation: RoleSelectionNavigationProp;
}

interface RoleOption {
  id: UserRole;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  features: { en: string[]; ar: string[] };
}

const roleOptions: RoleOption[] = [
  {
    id: UserRole.CLIENT,
    title: { en: 'Client', ar: 'عميل' },
    description: { en: 'Post jobs and hire engineers', ar: 'انشر وظائف واستأجر مهندسين' },
    icon: 'business',
    color: COLORS.secondary,
    features: {
      en: ['Post engineering projects', 'Browse certified engineers', 'Track project progress', 'Secure payments'],
      ar: ['انشر مشاريع هندسية', 'تصفح المهندسين المعتمدين', 'تتبع تقدم المشروع', 'دفعات آمنة'],
    },
  },
  {
    id: UserRole.ENGINEER,
    title: { en: 'Engineer', ar: 'مهندس' },
    description: { en: 'Find work and showcase expertise', ar: 'اعثر على عمل واعرض خبرتك' },
    icon: 'construct',
    color: COLORS.primary,
    features: {
      en: ['Find engineering jobs', 'Set your rates', 'Build your reputation', 'Get paid securely'],
      ar: ['اعثر على وظائف هندسية', 'حدد أسعارك', 'اصنع سمعتك', 'احصل على أموالك بأمان'],
    },
  },
  {
    id: UserRole.ENTERPRISE,
    title: { en: 'Enterprise', ar: 'مؤسسة' },
    description: { en: 'Manage teams and large projects', ar: 'إدارة الفرق والمشاريع الكبيرة' },
    icon: 'business-outline',
    color: COLORS.accent,
    features: {
      en: ['Bulk project management', 'Team coordination', 'Advanced analytics', 'Priority support'],
      ar: ['إدارة المشاريع بالجملة', 'تنسيق الفريق', 'تحليلات متقدمة', 'دعم أولوية'],
    },
  },
];

const { width } = Dimensions.get('window');

const RoleSelectionScreen: React.FC<Props> = ({ navigation }) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      navigation.navigate('PhoneVerification', { role: selectedRole });
    }
  };

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const getArray = (arrayObj: { en: string[]; ar: string[] }) => {
    return isArabic ? arrayObj.ar : arrayObj.en;
  };

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
          <Text style={[styles.title, { color: theme.text }]}>
            {isArabic ? 'اختر نوع حسابك' : 'Choose Your Account Type'}
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {isArabic 
              ? 'اختر النوع الذي يناسب احتياجاتك'
              : 'Select the type that best fits your needs'
            }
          </Text>
        </View>

        {/* Role Cards */}
        <View style={styles.roleCards}>
          {roleOptions.map((role) => (
            <TouchableOpacity
              key={role.id}
              style={[
                styles.roleCard,
                { backgroundColor: theme.card },
                selectedRole === role.id && { borderColor: role.color, borderWidth: 2 },
              ]}
              onPress={() => handleRoleSelect(role.id)}
              activeOpacity={0.7}
            >
              {/* Card Header */}
              <View style={styles.cardHeader}>
                <View style={[styles.iconContainer, { backgroundColor: role.color }]}>
                  <Ionicons name={role.icon} size={32} color={COLORS.white} />
                </View>
                <View style={styles.cardTitleContainer}>
                  <Text style={[styles.cardTitle, { color: theme.text }]}>
                    {getText(role.title)}
                  </Text>
                  <Text style={[styles.cardDescription, { color: theme.textSecondary }]}>
                    {getText(role.description)}
                  </Text>
                </View>
                {selectedRole === role.id && (
                  <Ionicons name="checkmark-circle" size={24} color={role.color} />
                )}
              </View>

              {/* Features List */}
              <View style={styles.featuresContainer}>
                {getArray(role.features).map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Ionicons 
                      name="checkmark" 
                      size={16} 
                      color={role.color} 
                      style={styles.featureIcon}
                    />
                    <Text style={[styles.featureText, { color: theme.textSecondary }]}>
                      {feature}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Selection Indicator */}
              {selectedRole === role.id && (
                <View style={[styles.selectedIndicator, { backgroundColor: role.color }]} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Continue Button */}
        {selectedRole && (
          <TouchableOpacity
            style={[
              styles.continueButton,
              { 
                backgroundColor: roleOptions.find(r => r.id === selectedRole)?.color || COLORS.primary 
              }
            ]}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>
              {isArabic ? 'متابعة' : 'Continue'}
            </Text>
            <Ionicons 
              name={isArabic ? "arrow-back" : "arrow-forward"} 
              size={20} 
              color={COLORS.white} 
            />
          </TouchableOpacity>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            {isArabic 
              ? 'يمكنك تغيير نوع حسابك لاحقاً في الإعدادات'
              : 'You can change your account type later in settings'
            }
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
    paddingVertical: SPACING.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
    marginTop: SPACING.lg,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.h5,
    fontWeight: TYPOGRAPHY.weights.bold,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.regular,
    textAlign: 'center',
    lineHeight: 24,
  },
  roleCards: {
    gap: SPACING.lg,
  },
  roleCard: {
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    position: 'relative',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: TYPOGRAPHY.sizes.h6,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  cardDescription: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.regular,
    lineHeight: 20,
  },
  featuresContainer: {
    gap: SPACING.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    marginRight: SPACING.sm,
  },
  featureText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.regular,
    flex: 1,
    lineHeight: 20,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    borderTopLeftRadius: BORDER_RADIUS.lg,
    borderTopRightRadius: BORDER_RADIUS.lg,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginTop: SPACING.xl,
    gap: SPACING.sm,
  },
  continueButtonText: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.white,
  },
  footer: {
    alignItems: 'center',
    marginTop: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  footerText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.regular,
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default RoleSelectionScreen;
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { RootState } from '../../store';
import { Language, UserRole } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

interface Feature {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  icon: string;
  color: string;
}

const CLIENT_FEATURES: Feature[] = [
  {
    id: 'post_jobs',
    title: { en: 'Post Engineering Jobs', ar: 'نشر وظائف هندسية' },
    description: {
      en: 'Create job requests for various engineering services',
      ar: 'إنشاء طلبات عمل لخدمات هندسية متنوعة'
    },
    icon: 'briefcase',
    color: COLORS.primary,
  },
  {
    id: 'browse_engineers',
    title: { en: 'Browse Certified Engineers', ar: 'تصفح المهندسين المعتمدين' },
    description: {
      en: 'Find qualified engineers verified by Saudi Council of Engineers',
      ar: 'العثور على مهندسين مؤهلين معتمدين من هيئة المهندسين السعوديين'
    },
    icon: 'people',
    color: COLORS.secondary,
  },
  {
    id: 'escrow_payments',
    title: { en: 'Secure Escrow Payments', ar: 'مدفوعات آمنة مضمونة' },
    description: {
      en: 'Protected payments released after milestone completion',
      ar: 'مدفوعات محمية تُفرج بعد إنجاز المراحل'
    },
    icon: 'shield-checkmark',
    color: COLORS.success,
  },
  {
    id: 'project_tracking',
    title: { en: 'Real-time Project Tracking', ar: 'تتبع المشاريع في الوقت الفعلي' },
    description: {
      en: 'Monitor progress with GPS verification and milestones',
      ar: 'مراقبة التقدم مع التحقق من GPS والمراحل'
    },
    icon: 'location',
    color: COLORS.warning,
  },
];

const ENGINEER_FEATURES: Feature[] = [
  {
    id: 'receive_jobs',
    title: { en: 'Receive Job Invitations', ar: 'استقبال دعوات العمل' },
    description: {
      en: 'Get matched with clients based on your skills and location',
      ar: 'الحصول على مطابقة مع العملاء بناءً على مهاراتك وموقعك'
    },
    icon: 'mail',
    color: COLORS.primary,
  },
  {
    id: 'build_profile',
    title: { en: 'Professional Profile', ar: 'الملف المهني' },
    description: {
      en: 'Showcase credentials, portfolio, and client reviews',
      ar: 'عرض الشهادات والأعمال وتقييمات العملاء'
    },
    icon: 'person-circle',
    color: COLORS.secondary,
  },
  {
    id: 'earn_money',
    title: { en: 'Earn Competitive Rates', ar: 'كسب أسعار تنافسية' },
    description: {
      en: 'Set your rates and receive instant payouts',
      ar: 'حدد أسعارك واحصل على مدفوعات فورية'
    },
    icon: 'wallet',
    color: COLORS.success,
  },
  {
    id: 'flexible_schedule',
    title: { en: 'Flexible Scheduling', ar: 'جدولة مرنة' },
    description: {
      en: 'Work when you want with availability controls',
      ar: 'اعمل متى شئت مع إعدادات التوفر'
    },
    icon: 'calendar',
    color: COLORS.warning,
  },
];

const ENTERPRISE_FEATURES: Feature[] = [
  {
    id: 'bulk_hiring',
    title: { en: 'Bulk Engineer Hiring', ar: 'التوظيف الجماعي للمهندسين' },
    description: {
      en: 'Hire multiple engineers for large-scale projects',
      ar: 'توظيف عدة مهندسين للمشاريع الكبيرة'
    },
    icon: 'business',
    color: COLORS.primary,
  },
  {
    id: 'team_management',
    title: { en: 'Team Management', ar: 'إدارة الفرق' },
    description: {
      en: 'Manage multiple projects and team members',
      ar: 'إدارة عدة مشاريع وأعضاء الفريق'
    },
    icon: 'people-circle',
    color: COLORS.secondary,
  },
  {
    id: 'analytics',
    title: { en: 'Advanced Analytics', ar: 'تحليلات متقدمة' },
    description: {
      en: 'Comprehensive reports and performance metrics',
      ar: 'تقارير شاملة ومقاييس الأداء'
    },
    icon: 'analytics',
    color: COLORS.success,
  },
  {
    id: 'compliance',
    title: { en: 'Vision 2030 Compliance', ar: 'امتثال رؤية 2030' },
    description: {
      en: 'Built-in compliance tracking and reporting',
      ar: 'تتبع وإبلاغ الامتثال المدمج'
    },
    icon: 'checkmark-done-circle',
    color: COLORS.warning,
  },
];

const AccountTypeConfirmationScreen = () => {
  const navigation = useNavigation();
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const { userRole } = useSelector((state: RootState) => state.auth);
  
  const [isLoading, setIsLoading] = useState(false);
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const getRoleInfo = () => {
    switch (userRole) {
      case UserRole.CLIENT:
        return {
          title: { en: 'Client Account', ar: 'حساب عميل' },
          description: { en: 'Hire certified engineers for your projects', ar: 'وظف مهندسين معتمدين لمشاريعك' },
          icon: 'business',
          color: COLORS.primary,
          features: CLIENT_FEATURES,
        };
      case UserRole.ENGINEER:
        return {
          title: { en: 'Engineer Account', ar: 'حساب مهندس' },
          description: { en: 'Offer your engineering services to clients', ar: 'قدم خدماتك الهندسية للعملاء' },
          icon: 'construct',
          color: COLORS.secondary,
          features: ENGINEER_FEATURES,
        };
      case UserRole.ENTERPRISE:
        return {
          title: { en: 'Enterprise Account', ar: 'حساب مؤسسة' },
          description: { en: 'Manage large-scale engineering operations', ar: 'إدارة العمليات الهندسية الكبيرة' },
          icon: 'business',
          color: COLORS.accent,
          features: ENTERPRISE_FEATURES,
        };
      default:
        return null;
    }
  };

  const roleInfo = getRoleInfo();

  if (!roleInfo) {
    return null;
  }

  const handleCompleteSetup = async () => {
    setIsLoading(true);

    try {
      // Simulate account setup completion
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Navigate to appropriate dashboard based on role
      switch (userRole) {
        case UserRole.CLIENT:
          navigation.navigate('ClientDashboard' as never);
          break;
        case UserRole.ENGINEER:
          navigation.navigate('EngineerDashboard' as never);
          break;
        case UserRole.ENTERPRISE:
          navigation.navigate('EnterpriseDashboard' as never);
          break;
      }
    } catch (error) {
      Alert.alert(
        isArabic ? 'خطأ' : 'Error',
        isArabic
          ? 'حدث خطأ أثناء إكمال الإعداد. يرجى المحاولة مرة أخرى.'
          : 'Failed to complete setup. Please try again.',
        [{ text: isArabic ? 'موافق' : 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeAccountType = () => {
    Alert.alert(
      isArabic ? 'تغيير نوع الحساب؟' : 'Change Account Type?',
      isArabic
        ? 'هل تريد العودة لاختيار نوع حساب مختلف؟'
        : 'Do you want to go back and select a different account type?',
      [
        { text: isArabic ? 'إلغاء' : 'Cancel', style: 'cancel' },
        {
          text: isArabic ? 'نعم' : 'Yes',
          onPress: () => navigation.navigate('RoleSelection' as never),
        },
      ]
    );
  };

  return (
    <LinearGradient
      colors={[roleInfo.color + '15', theme.background]}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: roleInfo.color }]}>
            <Ionicons name={roleInfo.icon as any} size={60} color={COLORS.white} />
          </View>
          
          <Text style={[styles.title, { color: theme.text }]}>
            {getText(roleInfo.title)}
          </Text>
          
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {getText(roleInfo.description)}
          </Text>
        </View>

        {/* Account Summary */}
        <View style={[styles.summaryCard, { backgroundColor: theme.surface }]}>
          <View style={styles.summaryHeader}>
            <Ionicons name="checkmark-circle" size={32} color={COLORS.success} />
            <Text style={[styles.summaryTitle, { color: theme.text }]}>
              {isArabic ? 'الإعداد مكتمل!' : 'Setup Complete!'}
            </Text>
          </View>
          
          <Text style={[styles.summaryText, { color: theme.textSecondary }]}>
            {isArabic
              ? 'تم إعداد حسابك بنجاح. أنت الآن جاهز لاستخدام منصة NBCON.'
              : 'Your account has been successfully configured. You are now ready to use the NBCON platform.'
            }
          </Text>
        </View>

        {/* Features List */}
        <View style={styles.featuresContainer}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {isArabic ? 'ما يمكنك فعله الآن:' : 'What you can do now:'}
          </Text>

          {roleInfo.features.map((feature) => (
            <View key={feature.id} style={[styles.featureCard, { backgroundColor: theme.surface }]}>
              <View style={[styles.featureIcon, { backgroundColor: feature.color + '15' }]}>
                <Ionicons name={feature.icon as any} size={24} color={feature.color} />
              </View>
              
              <View style={styles.featureContent}>
                <Text style={[styles.featureTitle, { color: theme.text }]}>
                  {getText(feature.title)}
                </Text>
                <Text style={[styles.featureDescription, { color: theme.textSecondary }]}>
                  {getText(feature.description)}
                </Text>
              </View>

              <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
            </View>
          ))}
        </View>

        {/* Vision 2030 Badge */}
        <View style={[styles.visionBadge, { backgroundColor: COLORS.primary + '15' }]}>
          <View style={styles.visionContent}>
            <Ionicons name="flag" size={24} color={COLORS.primary} />
            <View style={styles.visionText}>
              <Text style={[styles.visionTitle, { color: COLORS.primary }]}>
                {isArabic ? 'متوافق مع رؤية 2030' : 'Vision 2030 Compliant'}
              </Text>
              <Text style={[styles.visionDescription, { color: theme.textSecondary }]}>
                {isArabic
                  ? 'منصة NBCON تدعم أهداف التحول الرقمي للمملكة'
                  : 'NBCON platform supports Kingdom\'s digital transformation goals'
                }
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <CustomButton
            title={isArabic ? 'ابدأ استخدام المنصة' : 'Start Using Platform'}
            onPress={handleCompleteSetup}
            loading={isLoading}
            icon="rocket"
            fullWidth
            size="large"
            customStyle={[styles.primaryButton, { backgroundColor: roleInfo.color }]}
          />

          <TouchableOpacity style={styles.secondaryButton} onPress={handleChangeAccountType}>
            <Text style={[styles.secondaryButtonText, { color: theme.textSecondary }]}>
              {isArabic ? 'تغيير نوع الحساب' : 'Change Account Type'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Welcome Message */}
        <View style={styles.welcomeMessage}>
          <Text style={[styles.welcomeText, { color: theme.textSecondary }]}>
            {isArabic
              ? 'مرحباً بك في منصة NBCON - مستقبل الخدمات الهندسية في المملكة'
              : 'Welcome to NBCON Platform - The future of engineering services in the Kingdom'
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
    paddingVertical: SPACING.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
    marginTop: SPACING.lg,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
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
  summaryCard: {
    padding: SPACING.xl,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.xl,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  summaryTitle: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginLeft: SPACING.md,
  },
  summaryText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    lineHeight: 22,
  },
  featuresContainer: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.lg,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  featureDescription: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 18,
  },
  visionBadge: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.xl,
  },
  visionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  visionText: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  visionTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  visionDescription: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 18,
  },
  buttonContainer: {
    marginBottom: SPACING.lg,
  },
  primaryButton: {
    marginBottom: SPACING.md,
  },
  secondaryButton: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  secondaryButtonText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  welcomeMessage: {
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
  },
  welcomeText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    textAlign: 'center',
    lineHeight: 20,
    fontStyle: 'italic',
  },
});

export default AccountTypeConfirmationScreen;
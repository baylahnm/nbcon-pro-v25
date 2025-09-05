import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

interface Props {
  onCreateJob?: () => void;
}

const EmptyClientDashboardScreen: React.FC<Props> = ({ onCreateJob }) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const pulseAnimation = new Animated.Value(1);

  React.useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };
    pulse();
  }, []);

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
          <Text style={[styles.greeting, { color: theme.text }]}>
            {getText({
              en: 'Welcome to NBCON!',
              ar: 'مرحباً بك في منصة NBCON!'
            })}
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {getText({
              en: 'Ready to find certified engineers for your projects?',
              ar: 'هل أنت مستعد للعثور على مهندسين معتمدين لمشاريعك؟'
            })}
          </Text>
        </View>

        {/* Main Illustration */}
        <View style={styles.illustrationContainer}>
          <Animated.View 
            style={[
              styles.illustrationWrapper,
              { transform: [{ scale: pulseAnimation }] }
            ]}
          >
            <LinearGradient
              colors={[COLORS.primary + '20', COLORS.primary + '10']}
              style={styles.illustrationBackground}
            >
              <Ionicons 
                name="document-text" 
                size={120} 
                color={COLORS.primary} 
              />
            </LinearGradient>
          </Animated.View>
          
          <View style={styles.floatingElements}>
            {/* Floating Icons */}
            <Animated.View style={[styles.floatingIcon, styles.floatingIcon1]}>
              <Ionicons name="construct" size={24} color={COLORS.secondary} />
            </Animated.View>
            <Animated.View style={[styles.floatingIcon, styles.floatingIcon2]}>
              <Ionicons name="location" size={20} color={COLORS.accent} />
            </Animated.View>
            <Animated.View style={[styles.floatingIcon, styles.floatingIcon3]}>
              <Ionicons name="people" size={18} color={COLORS.warning} />
            </Animated.View>
          </View>
        </View>

        {/* Empty State Message */}
        <View style={styles.messageContainer}>
          <Text style={[styles.emptyTitle, { color: theme.text }]}>
            {getText({
              en: 'No active projects yet',
              ar: 'لا توجد مشاريع نشطة بعد'
            })}
          </Text>
          
          <Text style={[styles.emptyDescription, { color: theme.textSecondary }]}>
            {getText({
              en: 'Start by creating your first engineering service request. Our AI will match you with qualified engineers in your area.',
              ar: 'ابدأ بإنشاء طلب الخدمة الهندسية الأول. سيقوم نظامنا الذكي بمطابقتك مع مهندسين مؤهلين في منطقتك.'
            })}
          </Text>
        </View>

        {/* Quick Start Tips */}
        <View style={[styles.tipsContainer, { backgroundColor: theme.surface }]}>
          <Text style={[styles.tipsTitle, { color: theme.text }]}>
            {getText({
              en: 'Quick Start Tips:',
              ar: 'نصائح للبدء السريع:'
            })}
          </Text>
          
          <View style={styles.tipsList}>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
              <Text style={[styles.tipText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Define your project scope clearly',
                  ar: 'حدد نطاق مشروعك بوضوح'
                })}
              </Text>
            </View>
            
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
              <Text style={[styles.tipText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Set your location and budget',
                  ar: 'حدد موقعك والميزانية'
                })}
              </Text>
            </View>
            
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
              <Text style={[styles.tipText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Review engineer profiles and ratings',
                  ar: 'راجع ملفات وتقييمات المهندسين'
                })}
              </Text>
            </View>
          </View>
        </View>

        {/* CTA Button */}
        <CustomButton
          title={getText({
            en: '+ Create Job',
            ar: '+ إنشاء وظيفة'
          })}
          onPress={onCreateJob}
          icon="add-circle"
          size="large"
          fullWidth
          customStyle={styles.ctaButton}
        />

        {/* Support Section */}
        <View style={styles.supportSection}>
          <Text style={[styles.supportText, { color: theme.textSecondary }]}>
            {getText({
              en: 'Need help getting started?',
              ar: 'تحتاج مساعدة للبدء؟'
            })}
          </Text>
          
          <CustomButton
            title={getText({
              en: 'Contact Support',
              ar: 'اتصل بالدعم'
            })}
            onPress={() => {}}
            variant="outline"
            icon="headset"
            size="medium"
            customStyle={styles.supportButton}
          />
        </View>

        {/* Stats Preview */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
            <Ionicons name="people" size={32} color={COLORS.primary} />
            <Text style={[styles.statNumber, { color: theme.text }]}>2,547+</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              {getText({
                en: 'Certified Engineers',
                ar: 'مهندس معتمد'
              })}
            </Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
            <Ionicons name="checkmark-done-circle" size={32} color={COLORS.success} />
            <Text style={[styles.statNumber, { color: theme.text }]}>15,832+</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              {getText({
                en: 'Completed Projects',
                ar: 'مشروع مكتمل'
              })}
            </Text>
          </View>
          
          <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
            <Ionicons name="star" size={32} color={COLORS.warning} />
            <Text style={[styles.statNumber, { color: theme.text }]}>4.9</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              {getText({
                en: 'Average Rating',
                ar: 'التقييم المتوسط'
              })}
            </Text>
          </View>
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
    marginBottom: SPACING.xxl,
    marginTop: SPACING.lg,
  },
  greeting: {
    fontSize: TYPOGRAPHY.sizes.h2,
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
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
    position: 'relative',
    height: 200,
  },
  illustrationWrapper: {
    position: 'relative',
  },
  illustrationBackground: {
    width: 160,
    height: 160,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  floatingElements: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  floatingIcon: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  floatingIcon1: {
    top: 20,
    right: 10,
  },
  floatingIcon2: {
    bottom: 30,
    left: 20,
  },
  floatingIcon3: {
    top: 60,
    left: 0,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
    paddingHorizontal: SPACING.md,
  },
  emptyTitle: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  emptyDescription: {
    fontSize: TYPOGRAPHY.sizes.body1,
    textAlign: 'center',
    lineHeight: 24,
  },
  tipsContainer: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.xl,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tipsTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.md,
  },
  tipsList: {
    gap: SPACING.md,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  tipText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    flex: 1,
  },
  ctaButton: {
    marginBottom: SPACING.xl,
    elevation: 4,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  supportSection: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
    gap: SPACING.md,
  },
  supportText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    textAlign: 'center',
  },
  supportButton: {
    minWidth: 150,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.sm,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statNumber: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginVertical: SPACING.xs,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.sizes.caption,
    textAlign: 'center',
  },
});

export default EmptyClientDashboardScreen;
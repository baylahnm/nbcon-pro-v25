import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

interface Props {
  onRetry?: () => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  cachedData?: {
    jobs?: any[];
    files?: any[];
    lastSyncTime?: string;
  };
}

const CACHED_JOBS = [
  {
    id: '1',
    title: 'MEP System Inspection',
    client: 'Al Rajhi Construction',
    location: 'Riyadh',
    date: '2025-01-15',
    status: 'pending',
  },
  {
    id: '2',
    title: 'Structural Analysis',
    client: 'NEOM Development',
    location: 'NEOM',
    date: '2025-01-18',
    status: 'in_progress',
  },
  {
    id: '3',
    title: 'Safety Audit',
    client: 'Saudi Aramco',
    location: 'Dhahran',
    date: '2025-01-20',
    status: 'completed',
  },
];

const OfflineModeScreen: React.FC<Props> = ({
  onRetry,
  onRefresh,
  isRefreshing = false,
  cachedData,
}) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [pulseAnimation] = useState(new Animated.Value(1));
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  // Pulse animation for offline indicator
  useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };
    pulse();
  }, []);

  const jobs = cachedData?.jobs || CACHED_JOBS;
  const lastSync = cachedData?.lastSyncTime || '10:30 AM';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return COLORS.warning;
      case 'in_progress': return COLORS.primary;
      case 'completed': return COLORS.success;
      default: return theme.textSecondary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return 'time';
      case 'in_progress': return 'build';
      case 'completed': return 'checkmark-circle';
      default: return 'help-circle';
    }
  };

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1a1a1a', '#2d2d2d'] : ['#f8f9fa', '#ffffff']}
      style={styles.container}
    >
      {/* Offline Banner */}
      <View style={[styles.offlineBanner, { backgroundColor: COLORS.warning + '15' }]}>
        <Animated.View style={{ transform: [{ scale: pulseAnimation }] }}>
          <Ionicons name="wifi-off" size={24} color={COLORS.warning} />
        </Animated.View>
        
        <View style={styles.bannerContent}>
          <Text style={[styles.bannerTitle, { color: COLORS.warning }]}>
            {getText({
              en: 'You\'re offline',
              ar: 'أنت غير متصل'
            })}
          </Text>
          <Text style={[styles.bannerSubtitle, { color: theme.textSecondary }]}>
            {getText({
              en: 'Some features are unavailable',
              ar: 'بعض الميزات غير متاحة'
            })}
          </Text>
        </View>

        <CustomButton
          title={getText({ en: 'Retry', ar: 'إعادة المحاولة' })}
          onPress={onRetry}
          size="small"
          variant="outline"
          customStyle={styles.retryButton}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
      >
        {/* Offline Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={[styles.illustrationBackground, { backgroundColor: theme.surface }]}>
            <Ionicons name="cloud-offline" size={80} color={theme.textSecondary} />
            <View style={[styles.wifiLines, { borderColor: COLORS.error }]}>
              <View style={[styles.wifiLine, styles.wifiLine1, { backgroundColor: COLORS.error }]} />
              <View style={[styles.wifiLine, styles.wifiLine2, { backgroundColor: COLORS.error + '70' }]} />
              <View style={[styles.wifiLine, styles.wifiLine3, { backgroundColor: COLORS.error + '40' }]} />
            </View>
          </View>
        </View>

        {/* Last Sync Info */}
        <View style={[styles.syncInfoCard, { backgroundColor: theme.surface }]}>
          <View style={styles.syncHeader}>
            <Ionicons name="sync" size={20} color={COLORS.primary} />
            <Text style={[styles.syncTitle, { color: theme.text }]}>
              {getText({
                en: 'Last synchronized',
                ar: 'آخر مزامنة'
              })}
            </Text>
            <Text style={[styles.syncTime, { color: COLORS.primary }]}>
              {lastSync}
            </Text>
          </View>
          
          <Text style={[styles.syncDescription, { color: theme.textSecondary }]}>
            {getText({
              en: 'Viewing cached data. Pull down to refresh when connected.',
              ar: 'عرض البيانات المحفوظة. اسحب للأسفل للتحديث عند الاتصال.'
            })}
          </Text>
        </View>

        {/* Cached Jobs */}
        <View style={styles.cachedJobsContainer}>
          <View style={styles.sectionHeader}>
            <Ionicons name="briefcase" size={24} color={theme.text} />
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {getText({
                en: 'Cached Jobs',
                ar: 'المهام المحفوظة'
              })} ({jobs.length})
            </Text>
          </View>

          {jobs.map((job) => (
            <View key={job.id} style={[styles.jobCard, { backgroundColor: theme.surface }]}>
              <View style={styles.jobHeader}>
                <View style={styles.jobInfo}>
                  <Text style={[styles.jobTitle, { color: theme.text }]}>
                    {job.title}
                  </Text>
                  <Text style={[styles.jobClient, { color: theme.textSecondary }]}>
                    {job.client}
                  </Text>
                </View>
                
                <View style={styles.jobStatus}>
                  <Ionicons 
                    name={getStatusIcon(job.status) as any} 
                    size={20} 
                    color={getStatusColor(job.status)} 
                  />
                </View>
              </View>

              <View style={styles.jobDetails}>
                <View style={styles.jobDetailItem}>
                  <Ionicons name="location" size={16} color={theme.textSecondary} />
                  <Text style={[styles.jobDetailText, { color: theme.textSecondary }]}>
                    {job.location}
                  </Text>
                </View>
                
                <View style={styles.jobDetailItem}>
                  <Ionicons name="calendar" size={16} color={theme.textSecondary} />
                  <Text style={[styles.jobDetailText, { color: theme.textSecondary }]}>
                    {job.date}
                  </Text>
                </View>
              </View>

              {/* Offline indicator for job */}
              <View style={[styles.offlineIndicator, { backgroundColor: COLORS.warning + '15' }]}>
                <Text style={[styles.offlineText, { color: COLORS.warning }]}>
                  {getText({
                    en: 'View only - Go online to interact',
                    ar: 'عرض فقط - اتصل بالإنترنت للتفاعل'
                  })}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Offline Features */}
        <View style={[styles.featuresCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.featuresTitle, { color: theme.text }]}>
            {getText({
              en: 'Available Offline:',
              ar: 'متاح دون اتصال:'
            })}
          </Text>
          
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
              <Text style={[styles.featureText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'View cached job details',
                  ar: 'عرض تفاصيل المهام المحفوظة'
                })}
              </Text>
            </View>
            
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
              <Text style={[styles.featureText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Access downloaded files',
                  ar: 'الوصول للملفات المحملة'
                })}
              </Text>
            </View>
            
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
              <Text style={[styles.featureText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Review project history',
                  ar: 'مراجعة تاريخ المشاريع'
                })}
              </Text>
            </View>
          </View>
        </View>

        {/* Unavailable Features */}
        <View style={[styles.unavailableCard, { backgroundColor: COLORS.error + '10' }]}>
          <Text style={[styles.unavailableTitle, { color: COLORS.error }]}>
            {getText({
              en: 'Requires Connection:',
              ar: 'يتطلب اتصال:'
            })}
          </Text>
          
          <View style={styles.unavailableList}>
            <View style={styles.unavailableItem}>
              <Ionicons name="close-circle" size={20} color={COLORS.error} />
              <Text style={[styles.unavailableText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Submit new job requests',
                  ar: 'إرسال طلبات عمل جديدة'
                })}
              </Text>
            </View>
            
            <View style={styles.unavailableItem}>
              <Ionicons name="close-circle" size={20} color={COLORS.error} />
              <Text style={[styles.unavailableText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Real-time messaging',
                  ar: 'المراسلة الفورية'
                })}
              </Text>
            </View>
            
            <View style={styles.unavailableItem}>
              <Ionicons name="close-circle" size={20} color={COLORS.error} />
              <Text style={[styles.unavailableText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Live location tracking',
                  ar: 'تتبع الموقع المباشر'
                })}
              </Text>
            </View>
          </View>
        </View>

        {/* Connection Help */}
        <View style={styles.helpSection}>
          <Text style={[styles.helpTitle, { color: theme.text }]}>
            {getText({
              en: 'Trouble connecting?',
              ar: 'مشاكل في الاتصال؟'
            })}
          </Text>
          
          <Text style={[styles.helpText, { color: theme.textSecondary }]}>
            {getText({
              en: '• Check your WiFi or mobile data connection\n• Move to an area with better signal\n• Restart the app if connection issues persist',
              ar: '• تحقق من اتصال WiFi أو البيانات الخلوية\n• انتقل لمنطقة بإشارة أفضل\n• أعد تشغيل التطبيق إذا استمرت مشاكل الاتصال'
            })}
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
  offlineBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    gap: SPACING.md,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  bannerSubtitle: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  retryButton: {
    minWidth: 80,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  illustrationBackground: {
    width: 160,
    height: 160,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  wifiLines: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 30,
    height: 20,
    borderTopRightRadius: BORDER_RADIUS.sm,
  },
  wifiLine: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  wifiLine1: {
    width: 4,
    height: 6,
  },
  wifiLine2: {
    width: 4,
    height: 12,
    right: 8,
  },
  wifiLine3: {
    width: 4,
    height: 18,
    right: 16,
  },
  syncInfoCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  syncHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  syncTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.medium,
    flex: 1,
  },
  syncTime: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  syncDescription: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 20,
  },
  cachedJobsContainer: {
    marginBottom: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  jobCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    opacity: 0.85,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  jobClient: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  jobStatus: {
    marginLeft: SPACING.md,
  },
  jobDetails: {
    flexDirection: 'row',
    gap: SPACING.lg,
    marginBottom: SPACING.md,
  },
  jobDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  jobDetailText: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  offlineIndicator: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.sm,
    alignItems: 'center',
  },
  offlineText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  featuresCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  featuresTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.md,
  },
  featuresList: {
    gap: SPACING.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  featureText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    flex: 1,
  },
  unavailableCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.xl,
  },
  unavailableTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.md,
  },
  unavailableList: {
    gap: SPACING.sm,
  },
  unavailableItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  unavailableText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    flex: 1,
  },
  helpSection: {
    paddingHorizontal: SPACING.sm,
  },
  helpTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.md,
  },
  helpText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 22,
  },
});

export default OfflineModeScreen;
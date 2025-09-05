import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

const { width } = Dimensions.get('window');

interface JobInvitation {
  id: string;
  title: string;
  client: string;
  location: string;
  budget: string;
  urgency: 'standard' | 'priority' | 'emergency';
  postedTime: string;
  deadline: string;
  description: string;
}

interface EarningsData {
  today: number;
  thisWeek: number;
  thisMonth: number;
  pendingPayout: number;
}

const MOCK_JOB_INVITATIONS: JobInvitation[] = [
  {
    id: '1',
    title: 'MEP System Inspection',
    client: 'Al Rajhi Construction',
    location: 'Riyadh',
    budget: '1,500 SAR',
    urgency: 'priority',
    postedTime: '2 hours ago',
    deadline: '2025-01-20',
    description: 'Comprehensive MEP system inspection for new commercial building',
  },
  {
    id: '2',
    title: 'Structural Analysis Review',
    client: 'NEOM Development',
    location: 'NEOM',
    budget: '3,200 SAR',
    urgency: 'standard',
    postedTime: '5 hours ago',
    deadline: '2025-01-25',
    description: 'Review structural calculations for residential complex',
  },
  {
    id: '3',
    title: 'Emergency Safety Audit',
    client: 'Saudi Aramco',
    location: 'Dhahran',
    budget: '2,800 SAR',
    urgency: 'emergency',
    postedTime: '30 min ago',
    deadline: '2025-01-18',
    description: 'Urgent safety audit for industrial facility',
  },
];

const EngineerDashboardScreen: React.FC = () => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [isAvailable, setIsAvailable] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [jobInvitations, setJobInvitations] = useState(MOCK_JOB_INVITATIONS);
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const earnings: EarningsData = {
    today: 450,
    thisWeek: 2340,
    thisMonth: 8750,
    pendingPayout: 1250,
  };

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return COLORS.error;
      case 'priority': return COLORS.warning;
      default: return COLORS.primary;
    }
  };

  const getUrgencyText = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return getText({ en: 'Emergency', ar: 'طارئ' });
      case 'priority': return getText({ en: 'Priority', ar: 'أولوية' });
      default: return getText({ en: 'Standard', ar: 'عادي' });
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const handleAcceptJob = (jobId: string) => {
    // Handle job acceptance
    console.log('Accepting job:', jobId);
  };

  const handleViewJobDetails = (jobId: string) => {
    // Navigate to job details
    console.log('Viewing job details:', jobId);
  };

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1a1a1a', '#2d2d2d'] : ['#f8f9fa', '#ffffff']}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.greetingContainer}>
            <Text style={[styles.greeting, { color: theme.text }]}>
              {getText({
                en: 'Good morning, Engineer!',
                ar: 'صباح الخير، مهندس!'
              })}
            </Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              {getText({
                en: 'Ready to take on new challenges?',
                ar: 'مستعد لمواجهة تحديات جديدة؟'
              })}
            </Text>
          </View>
          
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle" size={40} color={theme.text} />
          </TouchableOpacity>
        </View>

        {/* Availability Toggle */}
        <View style={[styles.availabilityCard, { backgroundColor: theme.surface }]}>
          <View style={styles.availabilityHeader}>
            <View style={styles.availabilityInfo}>
              <Text style={[styles.availabilityTitle, { color: theme.text }]}>
                {getText({
                  en: 'Availability Status',
                  ar: 'حالة التوفر'
                })}
              </Text>
              <Text style={[styles.availabilitySubtitle, { color: theme.textSecondary }]}>
                {isAvailable 
                  ? getText({
                      en: 'You are visible to clients',
                      ar: 'أنت مرئي للعملاء'
                    })
                  : getText({
                      en: 'You are offline to clients',
                      ar: 'أنت غير متاح للعملاء'
                    })
                }
              </Text>
            </View>
            
            <View style={styles.availabilityToggle}>
              <Switch
                value={isAvailable}
                onValueChange={setIsAvailable}
                trackColor={{ 
                  false: theme.border, 
                  true: COLORS.success + '40' 
                }}
                thumbColor={isAvailable ? COLORS.success : theme.textSecondary}
                style={{ transform: [{ scale: 1.2 }] }}
              />
              <View style={[
                styles.statusIndicator, 
                { backgroundColor: isAvailable ? COLORS.success : theme.textSecondary }
              ]} />
            </View>
          </View>

          {isAvailable && (
            <View style={[styles.availabilityBanner, { backgroundColor: COLORS.success + '15' }]}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
              <Text style={[styles.bannerText, { color: COLORS.success }]}>
                {getText({
                  en: 'You\'re now receiving job invitations',
                  ar: 'أنت الآن تستقبل دعوات العمل'
                })}
              </Text>
            </View>
          )}
        </View>

        {/* Earnings Summary */}
        <View style={[styles.earningsCard, { backgroundColor: theme.surface }]}>
          <View style={styles.earningsHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {getText({
                en: 'Earnings Summary',
                ar: 'ملخص الأرباح'
              })}
            </Text>
            <TouchableOpacity>
              <Ionicons name="analytics" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.earningsGrid}>
            <View style={styles.earningsItem}>
              <Text style={[styles.earningsLabel, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Today',
                  ar: 'اليوم'
                })}
              </Text>
              <Text style={[styles.earningsAmount, { color: theme.text }]}>
                {earnings.today.toLocaleString()} SAR
              </Text>
            </View>
            
            <View style={styles.earningsItem}>
              <Text style={[styles.earningsLabel, { color: theme.textSecondary }]}>
                {getText({
                  en: 'This Week',
                  ar: 'هذا الأسبوع'
                })}
              </Text>
              <Text style={[styles.earningsAmount, { color: theme.text }]}>
                {earnings.thisWeek.toLocaleString()} SAR
              </Text>
            </View>
            
            <View style={styles.earningsItem}>
              <Text style={[styles.earningsLabel, { color: theme.textSecondary }]}>
                {getText({
                  en: 'This Month',
                  ar: 'هذا الشهر'
                })}
              </Text>
              <Text style={[styles.earningsAmount, { color: theme.text }]}>
                {earnings.thisMonth.toLocaleString()} SAR
              </Text>
            </View>
            
            <View style={styles.earningsItem}>
              <Text style={[styles.earningsLabel, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Pending',
                  ar: 'في الانتظار'
                })}
              </Text>
              <Text style={[styles.earningsAmount, { color: COLORS.warning }]}>
                {earnings.pendingPayout.toLocaleString()} SAR
              </Text>
            </View>
          </View>

          <CustomButton
            title={getText({
              en: 'Request Payout',
              ar: 'طلب الصرف'
            })}
            onPress={() => {}}
            icon="wallet"
            size="medium"
            customStyle={styles.payoutButton}
          />
        </View>

        {/* Today's Schedule */}
        <View style={[styles.scheduleCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {getText({
              en: 'Today\'s Schedule',
              ar: 'جدول اليوم'
            })}
          </Text>
          
          <View style={styles.scheduleEmpty}>
            <Ionicons name="calendar-clear" size={48} color={theme.textSecondary} />
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              {getText({
                en: 'No scheduled appointments today',
                ar: 'لا توجد مواعيد مجدولة اليوم'
              })}
            </Text>
          </View>
        </View>

        {/* New Job Invitations */}
        <View style={styles.jobInvitationsSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {getText({
                en: 'New Job Invitations',
                ar: 'دعوات عمل جديدة'
              })} ({jobInvitations.length})
            </Text>
            <TouchableOpacity>
              <Text style={[styles.viewAllText, { color: COLORS.primary }]}>
                {getText({
                  en: 'View All',
                  ar: 'عرض الكل'
                })}
              </Text>
            </TouchableOpacity>
          </View>

          {jobInvitations.length === 0 ? (
            <View style={[styles.emptyInvitations, { backgroundColor: theme.surface }]}>
              <Ionicons name="mail-outline" size={48} color={theme.textSecondary} />
              <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'No new job invitations',
                  ar: 'لا توجد دعوات عمل جديدة'
                })}
              </Text>
            </View>
          ) : (
            jobInvitations.map((job) => (
              <TouchableOpacity
                key={job.id}
                style={[styles.jobCard, { backgroundColor: theme.surface }]}
                onPress={() => handleViewJobDetails(job.id)}
              >
                <View style={styles.jobHeader}>
                  <View style={styles.jobInfo}>
                    <Text style={[styles.jobTitle, { color: theme.text }]}>
                      {job.title}
                    </Text>
                    <Text style={[styles.jobClient, { color: theme.textSecondary }]}>
                      {job.client}
                    </Text>
                  </View>
                  
                  <View style={[
                    styles.urgencyBadge, 
                    { backgroundColor: getUrgencyColor(job.urgency) + '15' }
                  ]}>
                    <Text style={[
                      styles.urgencyText, 
                      { color: getUrgencyColor(job.urgency) }
                    ]}>
                      {getUrgencyText(job.urgency)}
                    </Text>
                  </View>
                </View>

                <Text style={[styles.jobDescription, { color: theme.textSecondary }]}>
                  {job.description}
                </Text>

                <View style={styles.jobDetails}>
                  <View style={styles.jobDetailItem}>
                    <Ionicons name="location" size={16} color={theme.textSecondary} />
                    <Text style={[styles.jobDetailText, { color: theme.textSecondary }]}>
                      {job.location}
                    </Text>
                  </View>
                  
                  <View style={styles.jobDetailItem}>
                    <Ionicons name="cash" size={16} color={theme.textSecondary} />
                    <Text style={[styles.jobDetailText, { color: theme.textSecondary }]}>
                      {job.budget}
                    </Text>
                  </View>
                  
                  <View style={styles.jobDetailItem}>
                    <Ionicons name="time" size={16} color={theme.textSecondary} />
                    <Text style={[styles.jobDetailText, { color: theme.textSecondary }]}>
                      {job.postedTime}
                    </Text>
                  </View>
                </View>

                <View style={styles.jobActions}>
                  <CustomButton
                    title={getText({
                      en: 'Accept',
                      ar: 'قبول'
                    })}
                    onPress={() => handleAcceptJob(job.id)}
                    size="small"
                    customStyle={styles.acceptButton}
                  />
                  
                  <CustomButton
                    title={getText({
                      en: 'View Details',
                      ar: 'عرض التفاصيل'
                    })}
                    onPress={() => handleViewJobDetails(job.id)}
                    variant="outline"
                    size="small"
                    customStyle={styles.detailsButton}
                  />
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, { backgroundColor: theme.surface }]}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color={COLORS.primary} />
          <Text style={[styles.navLabel, { color: COLORS.primary }]}>
            {getText({ en: 'Home', ar: 'الرئيسية' })}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="briefcase" size={24} color={theme.textSecondary} />
          <Text style={[styles.navLabel, { color: theme.textSecondary }]}>
            {getText({ en: 'Jobs', ar: 'الوظائف' })}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="chatbubbles" size={24} color={theme.textSecondary} />
          <Text style={[styles.navLabel, { color: theme.textSecondary }]}>
            {getText({ en: 'Messages', ar: 'الرسائل' })}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="wallet" size={24} color={theme.textSecondary} />
          <Text style={[styles.navLabel, { color: theme.textSecondary }]}>
            {getText({ en: 'Earnings', ar: 'الأرباح' })}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={24} color={theme.textSecondary} />
          <Text style={[styles.navLabel, { color: theme.textSecondary }]}>
            {getText({ en: 'Profile', ar: 'الملف' })}
          </Text>
        </TouchableOpacity>
      </View>
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
    paddingTop: SPACING.xl,
    paddingBottom: 100, // Account for bottom nav
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: TYPOGRAPHY.sizes.h2,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
  },
  profileButton: {
    padding: SPACING.xs,
  },
  availabilityCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  availabilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  availabilityInfo: {
    flex: 1,
  },
  availabilityTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  availabilitySubtitle: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  availabilityToggle: {
    alignItems: 'center',
    position: 'relative',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: SPACING.xs,
  },
  availabilityBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.sm,
  },
  bannerText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    flex: 1,
  },
  earningsCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  earningsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  earningsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  earningsItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  earningsLabel: {
    fontSize: TYPOGRAPHY.sizes.body2,
    marginBottom: SPACING.xs,
  },
  earningsAmount: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  payoutButton: {
    alignSelf: 'center',
  },
  scheduleCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  scheduleEmpty: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    marginTop: SPACING.md,
    textAlign: 'center',
  },
  jobInvitationsSection: {
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  viewAllText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  emptyInvitations: {
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
    borderRadius: BORDER_RADIUS.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  jobCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  urgencyBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
    marginLeft: SPACING.md,
  },
  urgencyText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  jobDescription: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  jobDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.md,
    gap: SPACING.md,
  },
  jobDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  jobDetailText: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  jobActions: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  acceptButton: {
    flex: 1,
  },
  detailsButton: {
    flex: 1,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navItem: {
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  navLabel: {
    fontSize: TYPOGRAPHY.sizes.caption,
    marginTop: SPACING.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
});

export default EngineerDashboardScreen;
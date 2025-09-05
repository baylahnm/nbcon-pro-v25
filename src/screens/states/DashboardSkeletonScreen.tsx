import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import LoadingSkeleton from '../../components/skeletons/LoadingSkeleton';

interface Props {
  userRole?: 'client' | 'engineer' | 'enterprise';
}

const DashboardSkeletonScreen: React.FC<Props> = ({ userRole = 'client' }) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
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
        {/* Header Skeleton */}
        <View style={styles.headerSection}>
          <View style={styles.headerTop}>
            <View style={styles.greetingSection}>
              <LoadingSkeleton width={120} height={24} />
              <LoadingSkeleton width={200} height={16} style={styles.subtitleSkeleton} />
            </View>
            <LoadingSkeleton width={40} height={40} borderRadius={BORDER_RADIUS.full} />
          </View>
        </View>

        {/* Quick Stats Cards */}
        <View style={styles.statsSection}>
          <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
              <LoadingSkeleton width={32} height={32} borderRadius={BORDER_RADIUS.sm} />
              <LoadingSkeleton width={60} height={20} style={styles.statNumberSkeleton} />
              <LoadingSkeleton width={80} height={14} />
            </View>
            
            <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
              <LoadingSkeleton width={32} height={32} borderRadius={BORDER_RADIUS.sm} />
              <LoadingSkeleton width={60} height={20} style={styles.statNumberSkeleton} />
              <LoadingSkeleton width={80} height={14} />
            </View>
          </View>
          
          <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
              <LoadingSkeleton width={32} height={32} borderRadius={BORDER_RADIUS.sm} />
              <LoadingSkeleton width={60} height={20} style={styles.statNumberSkeleton} />
              <LoadingSkeleton width={80} height={14} />
            </View>
            
            <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
              <LoadingSkeleton width={32} height={32} borderRadius={BORDER_RADIUS.sm} />
              <LoadingSkeleton width={60} height={20} style={styles.statNumberSkeleton} />
              <LoadingSkeleton width={80} height={14} />
            </View>
          </View>
        </View>

        {/* Chart Section */}
        <View style={[styles.chartSection, { backgroundColor: theme.surface }]}>
          <View style={styles.chartHeader}>
            <LoadingSkeleton width={150} height={18} />
            <LoadingSkeleton width={60} height={14} />
          </View>
          
          <View style={styles.chartContainer}>
            <LoadingSkeleton width="100%" height={200} borderRadius={BORDER_RADIUS.lg} />
          </View>
          
          <View style={styles.chartLegend}>
            <View style={styles.legendItem}>
              <LoadingSkeleton width={12} height={12} borderRadius={BORDER_RADIUS.sm} />
              <LoadingSkeleton width={80} height={14} />
            </View>
            <View style={styles.legendItem}>
              <LoadingSkeleton width={12} height={12} borderRadius={BORDER_RADIUS.sm} />
              <LoadingSkeleton width={80} height={14} />
            </View>
          </View>
        </View>

        {/* Project Cards Section */}
        <View style={styles.projectsSection}>
          <View style={styles.sectionHeader}>
            <LoadingSkeleton width={120} height={18} />
            <LoadingSkeleton width={60} height={14} />
          </View>
          
          {/* Project Card 1 */}
          <View style={[styles.projectCard, { backgroundColor: theme.surface }]}>
            <View style={styles.projectHeader}>
              <View style={styles.projectInfo}>
                <LoadingSkeleton width={180} height={16} />
                <LoadingSkeleton width={120} height={14} style={styles.projectClientSkeleton} />
              </View>
              <LoadingSkeleton width={60} height={24} borderRadius={BORDER_RADIUS.full} />
            </View>
            
            <View style={styles.projectDetails}>
              <View style={styles.projectDetailRow}>
                <LoadingSkeleton width={20} height={14} borderRadius={BORDER_RADIUS.sm} />
                <LoadingSkeleton width={100} height={14} />
              </View>
              <View style={styles.projectDetailRow}>
                <LoadingSkeleton width={20} height={14} borderRadius={BORDER_RADIUS.sm} />
                <LoadingSkeleton width={80} height={14} />
              </View>
            </View>
            
            <LoadingSkeleton width="100%" height={8} borderRadius={BORDER_RADIUS.sm} />
          </View>
          
          {/* Project Card 2 */}
          <View style={[styles.projectCard, { backgroundColor: theme.surface }]}>
            <View style={styles.projectHeader}>
              <View style={styles.projectInfo}>
                <LoadingSkeleton width={200} height={16} />
                <LoadingSkeleton width={140} height={14} style={styles.projectClientSkeleton} />
              </View>
              <LoadingSkeleton width={60} height={24} borderRadius={BORDER_RADIUS.full} />
            </View>
            
            <View style={styles.projectDetails}>
              <View style={styles.projectDetailRow}>
                <LoadingSkeleton width={20} height={14} borderRadius={BORDER_RADIUS.sm} />
                <LoadingSkeleton width={100} height={14} />
              </View>
              <View style={styles.projectDetailRow}>
                <LoadingSkeleton width={20} height={14} borderRadius={BORDER_RADIUS.sm} />
                <LoadingSkeleton width={80} height={14} />
              </View>
            </View>
            
            <LoadingSkeleton width="100%" height={8} borderRadius={BORDER_RADIUS.sm} />
          </View>
          
          {/* Project Card 3 */}
          <View style={[styles.projectCard, { backgroundColor: theme.surface }]}>
            <View style={styles.projectHeader}>
              <View style={styles.projectInfo}>
                <LoadingSkeleton width={160} height={16} />
                <LoadingSkeleton width={110} height={14} style={styles.projectClientSkeleton} />
              </View>
              <LoadingSkeleton width={60} height={24} borderRadius={BORDER_RADIUS.full} />
            </View>
            
            <View style={styles.projectDetails}>
              <View style={styles.projectDetailRow}>
                <LoadingSkeleton width={20} height={14} borderRadius={BORDER_RADIUS.sm} />
                <LoadingSkeleton width={100} height={14} />
              </View>
              <View style={styles.projectDetailRow}>
                <LoadingSkeleton width={20} height={14} borderRadius={BORDER_RADIUS.sm} />
                <LoadingSkeleton width={80} height={14} />
              </View>
            </View>
            
            <LoadingSkeleton width="100%" height={8} borderRadius={BORDER_RADIUS.sm} />
          </View>
        </View>

        {/* Bottom Navigation Skeleton */}
        <View style={[styles.bottomNavSection, { backgroundColor: theme.surface }]}>
          <View style={styles.navItem}>
            <LoadingSkeleton width={24} height={24} borderRadius={BORDER_RADIUS.sm} />
            <LoadingSkeleton width={40} height={12} style={styles.navLabelSkeleton} />
          </View>
          <View style={styles.navItem}>
            <LoadingSkeleton width={24} height={24} borderRadius={BORDER_RADIUS.sm} />
            <LoadingSkeleton width={40} height={12} style={styles.navLabelSkeleton} />
          </View>
          <View style={styles.navItem}>
            <LoadingSkeleton width={24} height={24} borderRadius={BORDER_RADIUS.sm} />
            <LoadingSkeleton width={40} height={12} style={styles.navLabelSkeleton} />
          </View>
          <View style={styles.navItem}>
            <LoadingSkeleton width={24} height={24} borderRadius={BORDER_RADIUS.sm} />
            <LoadingSkeleton width={40} height={12} style={styles.navLabelSkeleton} />
          </View>
          <View style={styles.navItem}>
            <LoadingSkeleton width={24} height={24} borderRadius={BORDER_RADIUS.sm} />
            <LoadingSkeleton width={40} height={12} style={styles.navLabelSkeleton} />
          </View>
        </View>

        {/* Loading Text */}
        <View style={styles.loadingTextContainer}>
          <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
            {getText({
              en: 'Loading your dashboard...',
              ar: 'جاري تحميل لوحة التحكم...'
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
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  headerSection: {
    marginBottom: SPACING.xl,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingSection: {
    flex: 1,
  },
  subtitleSkeleton: {
    marginTop: SPACING.sm,
  },
  statsSection: {
    marginBottom: SPACING.xl,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
    gap: SPACING.md,
  },
  statCard: {
    flex: 1,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statNumberSkeleton: {
    marginVertical: SPACING.sm,
  },
  chartSection: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.xl,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  chartContainer: {
    marginBottom: SPACING.md,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  projectsSection: {
    marginBottom: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  projectCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  projectInfo: {
    flex: 1,
  },
  projectClientSkeleton: {
    marginTop: SPACING.sm,
  },
  projectDetails: {
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  projectDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  bottomNavSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navItem: {
    alignItems: 'center',
    gap: SPACING.xs,
  },
  navLabelSkeleton: {
    marginTop: SPACING.xs,
  },
  loadingTextContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  loadingText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontStyle: 'italic',
  },
});

export default DashboardSkeletonScreen;
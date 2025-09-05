import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
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
  onExpandArea?: () => void;
  onNotifyWhenAvailable?: () => void;
  serviceType?: string;
  location?: string;
}

const NoEngineersFoundScreen: React.FC<Props> = ({
  onRetry,
  onExpandArea,
  onNotifyWhenAvailable,
  serviceType = '',
  location = '',
}) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const suggestions = [
    {
      id: 'expand_area',
      icon: 'expand',
      title: { en: 'Expand Search Area', ar: 'توسيع منطقة البحث' },
      description: { en: 'Increase radius to find more engineers', ar: 'زيادة النطاق للعثور على مزيد من المهندسين' },
      color: COLORS.primary,
      action: onExpandArea,
    },
    {
      id: 'adjust_timing',
      icon: 'time',
      title: { en: 'Try Different Times', ar: 'جرب أوقاتاً مختلفة' },
      description: { en: 'Check weekdays or different hours', ar: 'تحقق من أيام الأسبوع أو ساعات مختلفة' },
      color: COLORS.secondary,
    },
    {
      id: 'similar_services',
      icon: 'git-branch',
      title: { en: 'Related Services', ar: 'خدمات ذات صلة' },
      description: { en: 'Browse similar engineering categories', ar: 'تصفح فئات هندسية مشابهة' },
      color: COLORS.accent,
    },
    {
      id: 'notify_me',
      icon: 'notifications',
      title: { en: 'Get Notified', ar: 'احصل على إشعار' },
      description: { en: 'We\'ll alert you when engineers are available', ar: 'سننبهك عندما يتوفر مهندسون' },
      color: COLORS.warning,
      action: onNotifyWhenAvailable,
    },
  ];

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1a1a1a', '#2d2d2d'] : ['#f8f9fa', '#ffffff']}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Map Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={[styles.mapBackground, { backgroundColor: theme.surface }]}>
            {/* Map outline */}
            <View style={[styles.mapOutline, { borderColor: theme.border }]}>
              <View style={[styles.searchPin, { backgroundColor: COLORS.primary }]}>
                <Ionicons name="location" size={20} color={COLORS.white} />
              </View>
              
              {/* Empty circles representing no engineers */}
              <View style={[styles.emptyPin, styles.emptyPin1, { borderColor: theme.textSecondary }]} />
              <View style={[styles.emptyPin, styles.emptyPin2, { borderColor: theme.textSecondary }]} />
              <View style={[styles.emptyPin, styles.emptyPin3, { borderColor: theme.textSecondary }]} />
            </View>
            
            {/* Radar animation */}
            <View style={[styles.radarCircle, styles.radarCircle1, { borderColor: COLORS.primary + '40' }]} />
            <View style={[styles.radarCircle, styles.radarCircle2, { borderColor: COLORS.primary + '20' }]} />
          </View>
        </View>

        {/* No Engineers Message */}
        <View style={styles.messageContainer}>
          <Text style={[styles.noEngineersTitle, { color: theme.text }]}>
            {getText({
              en: 'No engineers available nearby',
              ar: 'لا يوجد مهندسون متاحون في المنطقة'
            })}
          </Text>
          
          {(serviceType || location) && (
            <View style={[styles.searchDetails, { backgroundColor: theme.surface }]}>
              {serviceType && (
                <View style={styles.detailItem}>
                  <Ionicons name="construct" size={16} color={COLORS.primary} />
                  <Text style={[styles.detailText, { color: theme.textSecondary }]}>
                    {serviceType}
                  </Text>
                </View>
              )}
              {location && (
                <View style={styles.detailItem}>
                  <Ionicons name="location" size={16} color={COLORS.secondary} />
                  <Text style={[styles.detailText, { color: theme.textSecondary }]}>
                    {location}
                  </Text>
                </View>
              )}
            </View>
          )}
          
          <Text style={[styles.noEngineersDescription, { color: theme.textSecondary }]}>
            {getText({
              en: 'No engineers are currently available in your area for this service. Try the suggestions below or we can notify you when someone becomes available.',
              ar: 'لا يتوفر أي مهندس حالياً في منطقتك لهذه الخدمة. جرب الاقتراحات أدناه أو يمكننا إشعارك عندما يصبح أحدهم متاحاً.'
            })}
          </Text>
        </View>

        {/* Suggestions */}
        <View style={styles.suggestionsContainer}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {getText({
              en: 'What would you like to do?',
              ar: 'ماذا تريد أن تفعل؟'
            })}
          </Text>
          
          <View style={styles.suggestionsList}>
            {suggestions.map((suggestion) => (
              <TouchableOpacity
                key={suggestion.id}
                style={[styles.suggestionCard, { backgroundColor: theme.surface }]}
                onPress={suggestion.action}
              >
                <View style={[styles.suggestionIcon, { backgroundColor: suggestion.color + '15' }]}>
                  <Ionicons name={suggestion.icon as any} size={24} color={suggestion.color} />
                </View>
                
                <View style={styles.suggestionContent}>
                  <Text style={[styles.suggestionTitle, { color: theme.text }]}>
                    {getText(suggestion.title)}
                  </Text>
                  <Text style={[styles.suggestionDescription, { color: theme.textSecondary }]}>
                    {getText(suggestion.description)}
                  </Text>
                </View>

                <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Stats Card */}
        <View style={[styles.statsCard, { backgroundColor: theme.surface }]}>
          <View style={styles.statsHeader}>
            <Ionicons name="analytics" size={24} color={COLORS.primary} />
            <Text style={[styles.statsTitle, { color: theme.text }]}>
              {getText({
                en: 'Engineer Availability Stats',
                ar: 'إحصائيات توفر المهندسين'
              })}
            </Text>
          </View>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: COLORS.primary }]}>2,547+</Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Total Engineers',
                  ar: 'إجمالي المهندسين'
                })}
              </Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: COLORS.success }]}>1,832</Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Currently Active',
                  ar: 'نشط حالياً'
                })}
              </Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: COLORS.warning }]}>15 min</Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Avg Response',
                  ar: 'متوسط الرد'
                })}
              </Text>
            </View>
          </View>
          
          <Text style={[styles.statsNote, { color: theme.textSecondary }]}>
            {getText({
              en: 'Peak availability is typically between 8 AM - 6 PM',
              ar: 'ذروة التوفر عادة بين الساعة 8 صباحاً - 6 مساءً'
            })}
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <CustomButton
            title={getText({
              en: 'Try Again',
              ar: 'جرب مرة أخرى'
            })}
            onPress={onRetry}
            icon="refresh"
            fullWidth
            size="large"
            customStyle={styles.retryButton}
          />

          <View style={styles.secondaryActions}>
            <CustomButton
              title={getText({
                en: 'Expand Area',
                ar: 'توسيع المنطقة'
              })}
              onPress={onExpandArea}
              variant="outline"
              icon="expand"
              size="medium"
              customStyle={styles.expandButton}
            />

            <CustomButton
              title={getText({
                en: 'Notify Me',
                ar: 'أشعرني'
              })}
              onPress={onNotifyWhenAvailable}
              variant="outline"
              icon="notifications"
              size="medium"
              customStyle={styles.notifyButton}
            />
          </View>
        </View>

        {/* Help Text */}
        <View style={styles.helpSection}>
          <Ionicons name="information-circle" size={20} color={theme.textSecondary} />
          <Text style={[styles.helpText, { color: theme.textSecondary }]}>
            {getText({
              en: 'Engineer availability varies by location and time. Consider adjusting your search criteria or scheduling for later.',
              ar: 'توفر المهندسين يختلف حسب الموقع والوقت. فكر في تعديل معايير البحث أو الجدولة لوقت لاحق.'
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
    paddingVertical: SPACING.xl,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
    height: 200,
  },
  mapBackground: {
    width: 180,
    height: 180,
    borderRadius: BORDER_RADIUS.xl,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  mapOutline: {
    width: 120,
    height: 120,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 2,
    borderStyle: 'dashed',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchPin: {
    width: 30,
    height: 30,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -15,
    marginTop: -15,
    elevation: 3,
  },
  emptyPin: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  emptyPin1: {
    top: 10,
    left: 20,
  },
  emptyPin2: {
    bottom: 15,
    right: 10,
  },
  emptyPin3: {
    top: 30,
    right: 25,
  },
  radarCircle: {
    position: 'absolute',
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.full,
    borderStyle: 'dashed',
  },
  radarCircle1: {
    width: 140,
    height: 140,
    top: 20,
    left: 20,
  },
  radarCircle2: {
    width: 160,
    height: 160,
    top: 10,
    left: 10,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
    paddingHorizontal: SPACING.md,
  },
  noEngineersTitle: {
    fontSize: TYPOGRAPHY.sizes.h2,
    fontWeight: TYPOGRAPHY.weights.bold,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  searchDetails: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  detailText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  noEngineersDescription: {
    fontSize: TYPOGRAPHY.sizes.body1,
    textAlign: 'center',
    lineHeight: 24,
  },
  suggestionsContainer: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.lg,
  },
  suggestionsList: {
    gap: SPACING.md,
  },
  suggestionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  suggestionIcon: {
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  suggestionDescription: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 18,
  },
  statsCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.xl,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  statsTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: TYPOGRAPHY.sizes.h3,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.sizes.caption,
    textAlign: 'center',
  },
  statsNote: {
    fontSize: TYPOGRAPHY.sizes.body2,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  actionContainer: {
    marginBottom: SPACING.lg,
  },
  retryButton: {
    marginBottom: SPACING.md,
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  secondaryActions: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  expandButton: {
    flex: 1,
  },
  notifyButton: {
    flex: 1,
  },
  helpSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.sm,
  },
  helpText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 20,
    flex: 1,
  },
});

export default NoEngineersFoundScreen;
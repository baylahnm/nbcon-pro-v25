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
  searchQuery?: string;
  onRetry?: () => void;
  onContactSupport?: () => void;
  onClearSearch?: () => void;
}

const SUGGESTED_CATEGORIES = [
  { id: 'civil', name: { en: 'Civil Engineering', ar: 'الهندسة المدنية' }, icon: 'business', color: COLORS.primary },
  { id: 'electrical', name: { en: 'Electrical', ar: 'الهندسة الكهربائية' }, icon: 'flash', color: COLORS.warning },
  { id: 'mechanical', name: { en: 'Mechanical', ar: 'الهندسة الميكانيكية' }, icon: 'cog', color: COLORS.secondary },
  { id: 'structural', name: { en: 'Structural', ar: 'الهندسة الإنشائية' }, icon: 'construct', color: COLORS.accent },
  { id: 'surveying', name: { en: 'Surveying', ar: 'المساحة' }, icon: 'map', color: COLORS.success },
  { id: 'hse', name: { en: 'Health & Safety', ar: 'الصحة والسلامة' }, icon: 'shield-checkmark', color: COLORS.error },
];

const POPULAR_SERVICES = [
  { id: 'inspection', name: { en: 'Site Inspection', ar: 'معاينة الموقع' } },
  { id: 'consultation', name: { en: 'Technical Consultation', ar: 'استشارة تقنية' } },
  { id: 'design', name: { en: 'Design Review', ar: 'مراجعة التصميم' } },
  { id: 'supervision', name: { en: 'Project Supervision', ar: 'إشراف مشاريع' } },
];

const NoSearchResultsScreen: React.FC<Props> = ({
  searchQuery = '',
  onRetry,
  onContactSupport,
  onClearSearch,
}) => {
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
        {/* Main Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={[styles.illustrationBackground, { backgroundColor: theme.surface }]}>
            <Ionicons name="search" size={80} color={theme.textSecondary} />
            <View style={[styles.noResultsOverlay, { backgroundColor: COLORS.error + '15' }]}>
              <Ionicons name="close-circle" size={32} color={COLORS.error} />
            </View>
          </View>
          
          {/* Floating Question Marks */}
          <View style={styles.floatingElements}>
            <View style={[styles.floatingIcon, styles.floatingIcon1]}>
              <Text style={[styles.questionMark, { color: theme.textSecondary }]}>?</Text>
            </View>
            <View style={[styles.floatingIcon, styles.floatingIcon2]}>
              <Text style={[styles.questionMark, { color: theme.textSecondary }]}>?</Text>
            </View>
            <View style={[styles.floatingIcon, styles.floatingIcon3]}>
              <Text style={[styles.questionMark, { color: theme.textSecondary }]}>?</Text>
            </View>
          </View>
        </View>

        {/* No Results Message */}
        <View style={styles.messageContainer}>
          <Text style={[styles.noResultsTitle, { color: theme.text }]}>
            {getText({
              en: 'No services found',
              ar: 'لم نجد خدمات'
            })}
          </Text>
          
          {searchQuery && (
            <View style={[styles.searchQueryContainer, { backgroundColor: theme.surface }]}>
              <Text style={[styles.searchQueryText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'No results for:',
                  ar: 'لا توجد نتائج لـ:'
                })} "{searchQuery}"
              </Text>
              <TouchableOpacity onPress={onClearSearch} style={styles.clearButton}>
                <Ionicons name="close" size={16} color={theme.textSecondary} />
              </TouchableOpacity>
            </View>
          )}
          
          <Text style={[styles.noResultsDescription, { color: theme.textSecondary }]}>
            {getText({
              en: 'We couldn\'t find any engineering services matching your search. Try different keywords or browse our suggested categories below.',
              ar: 'لم نتمكن من العثور على خدمات هندسية تطابق بحثك. جرب كلمات مفتاحية مختلفة أو تصفح الفئات المقترحة أدناه.'
            })}
          </Text>
        </View>

        {/* Search Suggestions */}
        <View style={styles.suggestionsContainer}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {getText({
              en: 'Try searching for:',
              ar: 'جرب البحث عن:'
            })}
          </Text>
          
          <View style={styles.suggestionsGrid}>
            {POPULAR_SERVICES.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={[styles.suggestionChip, { backgroundColor: theme.surface }]}
                onPress={() => {}}
              >
                <Text style={[styles.suggestionText, { color: theme.text }]}>
                  {getText(service.name)}
                </Text>
                <Ionicons name="search" size={16} color={theme.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Browse Categories */}
        <View style={styles.categoriesContainer}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {getText({
              en: 'Browse Categories:',
              ar: 'تصفح الفئات:'
            })}
          </Text>
          
          <View style={styles.categoriesGrid}>
            {SUGGESTED_CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryCard, { backgroundColor: theme.surface }]}
                onPress={() => {}}
              >
                <View style={[styles.categoryIcon, { backgroundColor: category.color + '15' }]}>
                  <Ionicons name={category.icon as any} size={24} color={category.color} />
                </View>
                <Text style={[styles.categoryName, { color: theme.text }]}>
                  {getText(category.name)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Search Tips */}
        <View style={[styles.tipsContainer, { backgroundColor: theme.surface }]}>
          <View style={styles.tipsHeader}>
            <Ionicons name="bulb" size={24} color={COLORS.warning} />
            <Text style={[styles.tipsTitle, { color: theme.text }]}>
              {getText({
                en: 'Search Tips:',
                ar: 'نصائح البحث:'
              })}
            </Text>
          </View>
          
          <View style={styles.tipsList}>
            <View style={styles.tipItem}>
              <Text style={[styles.tipBullet, { color: COLORS.primary }]}>•</Text>
              <Text style={[styles.tipText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Use broader terms (e.g., "civil" instead of "concrete inspection")',
                  ar: 'استخدم مصطلحات أوسع (مثل "مدني" بدلاً من "فحص خرسانة")'
                })}
              </Text>
            </View>
            
            <View style={styles.tipItem}>
              <Text style={[styles.tipBullet, { color: COLORS.primary }]}>•</Text>
              <Text style={[styles.tipText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Check your spelling and try different variations',
                  ar: 'تحقق من الإملاء وجرب تنويعات مختلفة'
                })}
              </Text>
            </View>
            
            <View style={styles.tipItem}>
              <Text style={[styles.tipBullet, { color: COLORS.primary }]}>•</Text>
              <Text style={[styles.tipText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Try searching in both English and Arabic',
                  ar: 'جرب البحث باللغتين الإنجليزية والعربية'
                })}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <CustomButton
            title={getText({
              en: 'Try Different Search',
              ar: 'جرب بحث مختلف'
            })}
            onPress={onRetry}
            icon="search"
            fullWidth
            size="large"
            customStyle={styles.retryButton}
          />

          <CustomButton
            title={getText({
              en: 'Contact Support',
              ar: 'اتصل بالدعم'
            })}
            onPress={onContactSupport}
            variant="outline"
            icon="headset"
            fullWidth
            size="medium"
            customStyle={styles.supportButton}
          />
        </View>

        {/* Help Section */}
        <View style={styles.helpSection}>
          <Ionicons name="information-circle" size={20} color={theme.textSecondary} />
          <Text style={[styles.helpText, { color: theme.textSecondary }]}>
            {getText({
              en: 'Can\'t find what you\'re looking for? Our support team can help you find the right engineering services.',
              ar: 'لا تجد ما تبحث عنه؟ فريق الدعم لدينا يمكن أن يساعدك في العثور على الخدمات الهندسية المناسبة.'
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
    position: 'relative',
    height: 200,
  },
  illustrationBackground: {
    width: 160,
    height: 160,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  noResultsOverlay: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  floatingElements: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  floatingIcon: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  floatingIcon1: {
    top: 10,
    left: 20,
  },
  floatingIcon2: {
    bottom: 40,
    right: 15,
  },
  floatingIcon3: {
    top: 80,
    right: 30,
  },
  questionMark: {
    fontSize: 18,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
    paddingHorizontal: SPACING.md,
  },
  noResultsTitle: {
    fontSize: TYPOGRAPHY.sizes.h2,
    fontWeight: TYPOGRAPHY.weights.bold,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  searchQueryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  searchQueryText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontStyle: 'italic',
    flex: 1,
  },
  clearButton: {
    padding: SPACING.xs,
  },
  noResultsDescription: {
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
    marginBottom: SPACING.md,
  },
  suggestionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  suggestionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    gap: SPACING.xs,
  },
  suggestionText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  categoriesContainer: {
    marginBottom: SPACING.xl,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  categoryCard: {
    width: '48%',
    alignItems: 'center',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  categoryName: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    textAlign: 'center',
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
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  tipsTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  tipsList: {
    gap: SPACING.sm,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
  },
  tipBullet: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginTop: 2,
  },
  tipText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    flex: 1,
    lineHeight: 20,
  },
  actionContainer: {
    marginBottom: SPACING.lg,
    gap: SPACING.md,
  },
  retryButton: {
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  supportButton: {},
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

export default NoSearchResultsScreen;
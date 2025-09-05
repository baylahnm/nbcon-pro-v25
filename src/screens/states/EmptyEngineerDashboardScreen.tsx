import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
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
  onToggleAvailability?: (available: boolean) => void;
  onCompleteProfile?: () => void;
  isAvailable?: boolean;
}

const EmptyEngineerDashboardScreen: React.FC<Props> = ({ 
  onToggleAvailability, 
  onCompleteProfile,
  isAvailable = false 
}) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [available, setAvailable] = useState(isAvailable);
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const glowAnimation = new Animated.Value(0);

  React.useEffect(() => {
    const glow = () => {
      Animated.sequence([
        Animated.timing(glowAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]).start(() => glow());
    };
    if (available) {
      glow();
    }
  }, [available]);

  const handleToggleAvailability = (value: boolean) => {
    setAvailable(value);
    onToggleAvailability?.(value);
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
          <Text style={[styles.greeting, { color: theme.text }]}>
            {getText({
              en: 'Ready to work?',
              ar: 'مستعد للعمل؟'
            })}
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {getText({
              en: 'Turn on your availability to start receiving job invitations',
              ar: 'فعل حالة التوفر لبدء استقبال دعوات العمل'
            })}
          </Text>
        </View>

        {/* Availability Toggle */}
        <View style={[styles.availabilityCard, { backgroundColor: theme.surface }]}>
          <View style={styles.availabilityHeader}>
            <View style={styles.availabilityIcon}>
              <Animated.View
                style={[
                  styles.glowEffect,
                  {
                    opacity: available ? glowAnimation : 0,
                    backgroundColor: COLORS.success + '30',
                  },
                ]}
              />
              <Ionicons 
                name={available ? "radio-button-on" : "radio-button-off"} 
                size={40} 
                color={available ? COLORS.success : theme.textSecondary} 
              />
            </View>
            
            <View style={styles.availabilityInfo}>
              <Text style={[styles.availabilityTitle, { color: theme.text }]}>
                {getText({
                  en: 'Availability Status',
                  ar: 'حالة التوفر'
                })}
              </Text>
              <Text style={[styles.availabilityDescription, { color: theme.textSecondary }]}>
                {available 
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

            <Switch
              value={available}
              onValueChange={handleToggleAvailability}
              trackColor={{ 
                false: theme.border, 
                true: COLORS.success + '40' 
              }}
              thumbColor={available ? COLORS.success : theme.textSecondary}
              style={styles.availabilitySwitch}
            />
          </View>

          {available && (
            <View style={[styles.statusBanner, { backgroundColor: COLORS.success + '15' }]}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
              <Text style={[styles.statusText, { color: COLORS.success }]}>
                {getText({
                  en: 'Great! You\'re now available for job invitations',
                  ar: 'ممتاز! أنت الآن متاح لاستقبال دعوات العمل'
                })}
              </Text>
            </View>
          )}

          {!available && (
            <View style={[styles.statusBanner, { backgroundColor: COLORS.warning + '15' }]}>
              <Ionicons name="information-circle" size={20} color={COLORS.warning} />
              <Text style={[styles.statusText, { color: COLORS.warning }]}>
                {getText({
                  en: 'Turn on availability to receive job invitations',
                  ar: 'فعل حالة التوفر لاستقبال دعوات العمل'
                })}
              </Text>
            </View>
          )}
        </View>

        {/* Main Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={[styles.illustrationWrapper, { backgroundColor: theme.surface }]}>
            <Ionicons 
              name="construct" 
              size={100} 
              color={available ? COLORS.primary : theme.textSecondary} 
            />
            <View style={styles.sparkles}>
              {available && (
                <>
                  <Animated.View style={[styles.sparkle, styles.sparkle1, {
                    opacity: glowAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                    })
                  }]}>
                    <Ionicons name="star" size={16} color={COLORS.accent} />
                  </Animated.View>
                  <Animated.View style={[styles.sparkle, styles.sparkle2, {
                    opacity: glowAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 0.7],
                    })
                  }]}>
                    <Ionicons name="star" size={12} color={COLORS.secondary} />
                  </Animated.View>
                  <Animated.View style={[styles.sparkle, styles.sparkle3, {
                    opacity: glowAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 0.9],
                    })
                  }]}>
                    <Ionicons name="star" size={14} color={COLORS.success} />
                  </Animated.View>
                </>
              )}
            </View>
          </View>
        </View>

        {/* Empty State Message */}
        <View style={styles.messageContainer}>
          <Text style={[styles.emptyTitle, { color: theme.text }]}>
            {getText({
              en: 'No job invitations yet',
              ar: 'لا توجد دعوات عمل بعد'
            })}
          </Text>
          
          <Text style={[styles.emptyDescription, { color: theme.textSecondary }]}>
            {getText({
              en: 'Keep your availability ON to get matched with clients looking for your engineering expertise.',
              ar: 'حافظ على تفعيل حالة التوفر للحصول على مطابقة مع العملاء الذين يبحثون عن خبرتك الهندسية.'
            })}
          </Text>
        </View>

        {/* Profile Completion */}
        <View style={[styles.profileCard, { backgroundColor: theme.surface }]}>
          <View style={styles.profileHeader}>
            <Ionicons name="person-circle" size={32} color={COLORS.primary} />
            <Text style={[styles.profileTitle, { color: theme.text }]}>
              {getText({
                en: 'Complete Your Profile',
                ar: 'أكمل ملفك الشخصي'
              })}
            </Text>
          </View>
          
          <Text style={[styles.profileDescription, { color: theme.textSecondary }]}>
            {getText({
              en: 'A complete profile increases your chances of getting hired by 85%',
              ar: 'الملف الشخصي المكتمل يزيد فرصك في الحصول على عمل بنسبة 85%'
            })}
          </Text>

          <View style={styles.profileProgress}>
            <View style={[styles.progressBar, { backgroundColor: theme.border }]}>
              <View style={[styles.progressFill, { width: '65%', backgroundColor: COLORS.warning }]} />
            </View>
            <Text style={[styles.progressText, { color: theme.text }]}>65% {getText({ en: 'Complete', ar: 'مكتمل' })}</Text>
          </View>

          <CustomButton
            title={getText({
              en: 'Complete Profile',
              ar: 'أكمل الملف الشخصي'
            })}
            onPress={onCompleteProfile}
            icon="person-add"
            variant="outline"
            size="medium"
            customStyle={styles.profileButton}
          />
        </View>

        {/* Tips Section */}
        <View style={[styles.tipsContainer, { backgroundColor: theme.surface }]}>
          <Text style={[styles.tipsTitle, { color: theme.text }]}>
            {getText({
              en: 'While you wait:',
              ar: 'بينما تنتظر:'
            })}
          </Text>
          
          <View style={styles.tipsList}>
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
              <Text style={[styles.tipText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Upload your portfolio and certifications',
                  ar: 'ارفع أعمالك وشهاداتك'
                })}
              </Text>
            </View>
            
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
              <Text style={[styles.tipText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Set competitive rates for your services',
                  ar: 'حدد أسعاراً تنافسية لخدماتك'
                })}
              </Text>
            </View>
            
            <View style={styles.tipItem}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
              <Text style={[styles.tipText, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Expand your service areas',
                  ar: 'وسع مناطق خدماتك'
                })}
              </Text>
            </View>
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.supportSection}>
          <Text style={[styles.supportText, { color: theme.textSecondary }]}>
            {getText({
              en: 'Questions about getting started?',
              ar: 'أسئلة حول كيفية البدء؟'
            })}
          </Text>
          
          <CustomButton
            title={getText({
              en: 'Help Center',
              ar: 'مركز المساعدة'
            })}
            onPress={() => {}}
            variant="outline"
            icon="help-circle"
            size="medium"
            customStyle={styles.supportButton}
          />
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
  availabilityCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.xl,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  availabilityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  availabilityIcon: {
    position: 'relative',
    marginRight: SPACING.md,
  },
  glowEffect: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    top: -10,
    left: -10,
  },
  availabilityInfo: {
    flex: 1,
  },
  availabilityTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.xs,
  },
  availabilityDescription: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  availabilitySwitch: {
    transform: [{ scale: 1.2 }],
  },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.sm,
  },
  statusText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    flex: 1,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  illustrationWrapper: {
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
  sparkles: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  sparkle: {
    position: 'absolute',
  },
  sparkle1: {
    top: 20,
    right: 20,
  },
  sparkle2: {
    bottom: 30,
    left: 25,
  },
  sparkle3: {
    top: 50,
    left: 15,
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
  profileCard: {
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.xl,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  profileTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  profileDescription: {
    fontSize: TYPOGRAPHY.sizes.body2,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  profileProgress: {
    marginBottom: SPACING.lg,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: SPACING.sm,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    textAlign: 'center',
  },
  profileButton: {
    alignSelf: 'center',
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
  supportSection: {
    alignItems: 'center',
    gap: SPACING.md,
  },
  supportText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    textAlign: 'center',
  },
  supportButton: {
    minWidth: 150,
  },
});

export default EmptyEngineerDashboardScreen;
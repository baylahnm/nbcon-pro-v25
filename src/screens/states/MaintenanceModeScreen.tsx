import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

interface Props {
  onCheckStatus?: () => void;
  onContactSupport?: () => void;
  estimatedDuration?: string;
  maintenanceType?: string;
  startTime?: string;
  improvements?: string[];
}

const MaintenanceModeScreen: React.FC<Props> = ({
  onCheckStatus,
  onContactSupport,
  estimatedDuration = '2-3 hours',
  maintenanceType = 'Scheduled System Upgrade',
  startTime = '2:00 AM SAT',
  improvements = [
    'Enhanced security features',
    'Improved performance',
    'New messaging system',
    'Better search functionality'
  ],
}) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [progress, setProgress] = useState(0);
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const gearAnimation = new Animated.Value(0);
  const progressAnimation = new Animated.Value(0);
  const sparkAnimation = new Animated.Value(0);

  useEffect(() => {
    const animateGears = () => {
      Animated.timing(gearAnimation, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      }).start(() => {
        gearAnimation.setValue(0);
        animateGears();
      });
    };

    const animateProgress = () => {
      Animated.timing(progressAnimation, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: false,
      }).start(() => {
        progressAnimation.setValue(0);
        animateProgress();
      });
    };

    const animateSparks = () => {
      Animated.sequence([
        Animated.timing(sparkAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(sparkAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => animateSparks());
    };

    animateGears();
    animateProgress();
    animateSparks();

    // Simulate progress updates
    const progressTimer = setInterval(() => {
      setProgress(prev => (prev + 0.5) % 100);
    }, 100);

    return () => clearInterval(progressTimer);
  }, []);

  const gearRotation = gearAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const progressWidth = progressAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const sparkScale = sparkAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5],
  });

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1a1a1a', '#2d2d2d'] : ['#f8f9fa', '#ffffff']}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
      >
        {/* Maintenance Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={[styles.workspaceBackground, { backgroundColor: theme.surface }]}>
            {/* Main gear */}
            <Animated.View 
              style={[
                styles.mainGear,
                { transform: [{ rotate: gearRotation }] }
              ]}
            >
              <Ionicons name="settings" size={80} color={COLORS.primary} />
            </Animated.View>
            
            {/* Secondary gears */}
            <Animated.View 
              style={[
                styles.secondaryGear,
                styles.gear1,
                { transform: [{ rotate: gearRotation }] }
              ]}
            >
              <Ionicons name="cog" size={40} color={COLORS.secondary} />
            </Animated.View>
            
            <Animated.View 
              style={[
                styles.secondaryGear,
                styles.gear2,
                { 
                  transform: [{ 
                    rotate: gearAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '-360deg'],
                    })
                  }] 
                }
              ]}
            >
              <Ionicons name="cog" size={32} color={COLORS.warning} />
            </Animated.View>
            
            {/* Work sparks */}
            <Animated.View 
              style={[
                styles.spark,
                styles.spark1,
                { transform: [{ scale: sparkScale }] }
              ]}
            />
            <Animated.View 
              style={[
                styles.spark,
                styles.spark2,
                { transform: [{ scale: sparkScale }] }
              ]}
            />
            <Animated.View 
              style={[
                styles.spark,
                styles.spark3,
                { transform: [{ scale: sparkScale }] }
              ]}
            />
            
            {/* Tools */}
            <View style={[styles.tool, styles.hammer]}>
              <Ionicons name="hammer" size={24} color={COLORS.info} />
            </View>
            <View style={[styles.tool, styles.wrench]}>
              <Ionicons name="construct" size={20} color={COLORS.success} />
            </View>
          </View>
        </View>

        {/* Maintenance Message */}
        <View style={styles.messageContainer}>
          <Text style={[styles.maintenanceTitle, { color: theme.text }]}>
            {getText({
              en: 'Under Maintenance',
              ar: 'قيد الصيانة'
            })}
          </Text>
          
          <Text style={[styles.maintenanceDescription, { color: theme.textSecondary }]}>
            {getText({
              en: 'We\'re currently performing scheduled maintenance to improve your experience. We\'ll be back soon!',
              ar: 'نحن نقوم حالياً بصيانة مجدولة لتحسين تجربتك. سنعود قريباً!'
            })}
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={[styles.progressCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.progressTitle, { color: theme.text }]}>
            {getText({
              en: 'Maintenance Progress',
              ar: 'تقدم الصيانة'
            })}
          </Text>
          
          <View style={[styles.progressBarContainer, { backgroundColor: theme.inputBackground }]}>
            <Animated.View 
              style={[
                styles.progressBar,
                { 
                  backgroundColor: COLORS.primary,
                  width: progressWidth
                }
              ]}
            />
          </View>
          
          <Text style={[styles.progressText, { color: theme.textSecondary }]}>
            {Math.round(progress)}% {getText({ en: 'Complete', ar: 'مكتمل' })}
          </Text>
        </View>

        {/* Maintenance Details */}
        <View style={[styles.detailsCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            {getText({
              en: 'Maintenance Information',
              ar: 'معلومات الصيانة'
            })}
          </Text>
          
          <View style={styles.detailsInfo}>
            <View style={styles.detailRow}>
              <Ionicons name="construct" size={16} color={COLORS.primary} />
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Type:',
                  ar: 'النوع:'
                })}
              </Text>
              <Text style={[styles.detailValue, { color: theme.text }]}>
                {maintenanceType}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Ionicons name="time" size={16} color={COLORS.warning} />
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Started:',
                  ar: 'بدأت:'
                })}
              </Text>
              <Text style={[styles.detailValue, { color: theme.text }]}>
                {startTime}
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Ionicons name="hourglass" size={16} color={COLORS.info} />
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                {getText({
                  en: 'Duration:',
                  ar: 'المدة:'
                })}
              </Text>
              <Text style={[styles.detailValue, { color: theme.text }]}>
                {estimatedDuration}
              </Text>
            </View>
          </View>
        </View>

        {/* What's Being Improved */}
        <View style={[styles.improvementsCard, { backgroundColor: theme.surface }]}>
          <View style={styles.improvementsHeader}>
            <Ionicons name="rocket" size={24} color={COLORS.success} />
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              {getText({
                en: 'What\'s Being Improved',
                ar: 'ما يتم تحسينه'
              })}
            </Text>
          </View>
          
          <View style={styles.improvementsList}>
            {improvements.map((improvement, index) => (
              <View key={index} style={styles.improvementItem}>
                <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
                <Text style={[styles.improvementText, { color: theme.textSecondary }]}>
                  {improvement}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Status Updates */}
        <View style={[styles.statusCard, { backgroundColor: COLORS.info + '10' }]}>
          <View style={styles.statusHeader}>
            <Ionicons name="information-circle" size={20} color={COLORS.info} />
            <Text style={[styles.statusTitle, { color: theme.text }]}>
              {getText({
                en: 'Live Status Updates',
                ar: 'تحديثات الحالة المباشرة'
              })}
            </Text>
          </View>
          
          <View style={styles.statusList}>
            <View style={styles.statusItem}>
              <View style={[styles.statusDot, { backgroundColor: COLORS.success }]} />
              <Text style={[styles.statusText, { color: theme.textSecondary }]}>
                {getText({
                  en: '✓ Database optimization complete',
                  ar: '✓ تحسين قاعدة البيانات مكتمل'
                })}
              </Text>
            </View>
            
            <View style={styles.statusItem}>
              <View style={[styles.statusDot, { backgroundColor: COLORS.warning }]} />
              <Text style={[styles.statusText, { color: theme.textSecondary }]}>
                {getText({
                  en: '⚡ Security updates in progress',
                  ar: '⚡ تحديثات الأمان قيد التنفيذ'
                })}
              </Text>
            </View>
            
            <View style={styles.statusItem}>
              <View style={[styles.statusDot, { backgroundColor: theme.textSecondary }]} />
              <Text style={[styles.statusText, { color: theme.textSecondary }]}>
                {getText({
                  en: '⏳ Performance enhancements pending',
                  ar: '⏳ تحسينات الأداء معلقة'
                })}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <CustomButton
            title={getText({
              en: 'Check Status',
              ar: 'تحقق من الحالة'
            })}
            onPress={onCheckStatus}
            icon="refresh"
            size="large"
            fullWidth
            customStyle={styles.statusButton}
          />

          <CustomButton
            title={getText({
              en: 'Contact Support',
              ar: 'اتصل بالدعم'
            })}
            onPress={onContactSupport}
            variant="outline"
            icon="headset"
            size="medium"
            fullWidth
            customStyle={styles.supportButton}
          />
        </View>

        {/* Estimated Completion */}
        <View style={[styles.completionContainer, { backgroundColor: theme.surface }]}>
          <Ionicons name="calendar" size={20} color={COLORS.primary} />
          <View style={styles.completionText}>
            <Text style={[styles.completionTitle, { color: theme.text }]}>
              {getText({
                en: 'Estimated Completion',
                ar: 'الإنجاز المتوقع'
              })}
            </Text>
            <Text style={[styles.completionTime, { color: COLORS.primary }]}>
              {getText({
                en: 'Today at 5:00 PM SAT',
                ar: 'اليوم الساعة 5:00 مساءً ت.س'
              })}
            </Text>
          </View>
        </View>

        {/* Thank You Message */}
        <View style={styles.thankYouContainer}>
          <Text style={[styles.thankYouText, { color: theme.textSecondary }]}>
            {getText({
              en: 'Thank you for your patience while we make NBCON Pro even better!',
              ar: 'شكراً لصبركم بينما نجعل NBCON Pro أفضل!'
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
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xxl,
    maxWidth: 400,
    alignSelf: 'center',
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  workspaceBackground: {
    width: 200,
    height: 200,
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
  mainGear: {
    position: 'absolute',
  },
  secondaryGear: {
    position: 'absolute',
  },
  gear1: {
    top: 30,
    right: 20,
  },
  gear2: {
    bottom: 40,
    left: 30,
  },
  spark: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.warning,
  },
  spark1: {
    top: 50,
    left: 40,
  },
  spark2: {
    bottom: 60,
    right: 50,
  },
  spark3: {
    top: 80,
    right: 30,
  },
  tool: {
    position: 'absolute',
  },
  hammer: {
    top: 20,
    left: 20,
  },
  wrench: {
    bottom: 20,
    right: 20,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  maintenanceTitle: {
    fontSize: TYPOGRAPHY.sizes.h1,
    fontWeight: TYPOGRAPHY.weights.bold,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  maintenanceDescription: {
    fontSize: TYPOGRAPHY.sizes.body1,
    textAlign: 'center',
    lineHeight: 24,
  },
  progressCard: {
    width: '100%',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  progressTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  progressBarContainer: {
    height: 8,
    borderRadius: BORDER_RADIUS.sm,
    marginBottom: SPACING.sm,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: BORDER_RADIUS.sm,
  },
  progressText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    textAlign: 'center',
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  detailsCard: {
    width: '100%',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: SPACING.md,
  },
  detailsInfo: {
    gap: SPACING.sm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  detailLabel: {
    fontSize: TYPOGRAPHY.sizes.body2,
    flex: 1,
  },
  detailValue: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  improvementsCard: {
    width: '100%',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  improvementsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  improvementsList: {
    gap: SPACING.sm,
  },
  improvementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  improvementText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    flex: 1,
  },
  statusCard: {
    width: '100%',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.xl,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  statusTitle: {
    fontSize: TYPOGRAPHY.sizes.subtitle2,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  statusList: {
    gap: SPACING.sm,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    flex: 1,
  },
  actionContainer: {
    width: '100%',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  statusButton: {
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  supportButton: {},
  completionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  completionText: {
    flex: 1,
  },
  completionTitle: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginBottom: SPACING.xs,
  },
  completionTime: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  thankYouContainer: {
    alignItems: 'center',
  },
  thankYouText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    textAlign: 'center',
    lineHeight: 20,
    fontStyle: 'italic',
  },
});

export default MaintenanceModeScreen;
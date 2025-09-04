import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  PanResponder,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import CustomButton from '../../components/forms/CustomButton';

const { width } = Dimensions.get('window');

interface TutorialStep {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  icon: string;
  color: string;
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: '1',
    title: { en: 'Smart Matching', ar: 'المطابقة الذكية' },
    description: {
      en: 'Our AI connects you with certified engineers based on skills, location, and availability',
      ar: 'يربطك نظامنا الذكي بالمهندسين المعتمدين حسب المهارات والموقع والتوفر'
    },
    icon: 'people-circle',
    color: '#1B7A3E',
  },
  {
    id: '2',
    title: { en: 'Secure Geofencing', ar: 'التتبع الآمن' },
    description: {
      en: 'Engineers check-in at your project site with GPS verification for complete transparency',
      ar: 'يسجل المهندسون حضورهم في موقع المشروع مع التحقق من الـ GPS للشفافية الكاملة'
    },
    icon: 'location-sharp',
    color: '#FF9800',
  },
  {
    id: '3',
    title: { en: 'Escrow Protection', ar: 'الحماية المضمونة' },
    description: {
      en: 'Your payments are safely held until project milestones are completed to your satisfaction',
      ar: 'يتم حفظ مدفوعاتك بأمان حتى إكمال مراحل المشروع بما يرضيك'
    },
    icon: 'shield-checkmark',
    color: '#2196F3',
  },
  {
    id: '4',
    title: { en: 'Saudi Compliance', ar: 'الامتثال السعودي' },
    description: {
      en: 'All engineers are verified through Saudi Council of Engineers and comply with Vision 2030',
      ar: 'جميع المهندسين معتمدون من هيئة المهندسين السعوديين ويتماشون مع رؤية 2030'
    },
    icon: 'checkmark-done-circle',
    color: '#4CAF50',
  },
];

const WelcomeTutorialScreen = () => {
  const navigation = useNavigation();
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  
  const [currentStep, setCurrentStep] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },
      onPanResponderMove: Animated.event(
        [null, { dx: scrollX }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gestureState) => {
        const threshold = width * 0.3;
        
        if (gestureState.dx > threshold && currentStep > 0) {
          // Swipe right - go to previous
          goToPrevious();
        } else if (gestureState.dx < -threshold && currentStep < TUTORIAL_STEPS.length - 1) {
          // Swipe left - go to next
          goToNext();
        } else {
          // Snap back
          Animated.spring(scrollX, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const goToNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      Animated.spring(scrollX, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
  };

  const goToPrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      Animated.spring(scrollX, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleGetStarted = () => {
    // Navigate to Permission Requests screen (Page 19)
    navigation.navigate('PermissionRequests' as never);
  };

  const handleSkip = () => {
    // Skip directly to Permission Requests
    navigation.navigate('PermissionRequests' as never);
  };

  const currentStepData = TUTORIAL_STEPS[currentStep];
  const isLastStep = currentStep === TUTORIAL_STEPS.length - 1;

  return (
    <LinearGradient
      colors={[currentStepData.color + '15', theme.background]}
      style={styles.container}
    >
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={[styles.skipText, { color: theme.textSecondary }]}>
          {isArabic ? 'تخطي' : 'Skip'}
        </Text>
      </TouchableOpacity>

      {/* Tutorial Content */}
      <View style={styles.contentContainer}>
        {/* Icon */}
        <Animated.View
          style={[
            styles.iconContainer,
            {
              backgroundColor: currentStepData.color,
              transform: [
                {
                  translateX: scrollX.interpolate({
                    inputRange: [-width, 0, width],
                    outputRange: [width * 0.5, 0, -width * 0.5],
                    extrapolate: 'clamp',
                  }),
                },
                {
                  scale: scrollX.interpolate({
                    inputRange: [-width, 0, width],
                    outputRange: [0.8, 1, 0.8],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
          {...panResponder.panHandlers}
        >
          <Ionicons name={currentStepData.icon as any} size={80} color={COLORS.white} />
        </Animated.View>

        {/* Title */}
        <Animated.View
          style={[
            styles.textContainer,
            {
              transform: [
                {
                  translateX: scrollX.interpolate({
                    inputRange: [-width, 0, width],
                    outputRange: [width * 0.3, 0, -width * 0.3],
                    extrapolate: 'clamp',
                  }),
                },
              ],
              opacity: scrollX.interpolate({
                inputRange: [-width, 0, width],
                outputRange: [0.5, 1, 0.5],
                extrapolate: 'clamp',
              }),
            },
          ]}
        >
          <Text style={[styles.title, { color: theme.text }]}>
            {getText(currentStepData.title)}
          </Text>

          <Text style={[styles.description, { color: theme.textSecondary }]}>
            {getText(currentStepData.description)}
          </Text>
        </Animated.View>

        {/* Progress Indicators */}
        <View style={styles.progressContainer}>
          {TUTORIAL_STEPS.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.progressDot,
                {
                  backgroundColor: index === currentStep 
                    ? currentStepData.color 
                    : theme.border,
                  transform: [{ scale: index === currentStep ? 1.2 : 1 }],
                },
              ]}
              onPress={() => setCurrentStep(index)}
            />
          ))}
        </View>

        {/* Navigation */}
        <View style={styles.navigationContainer}>
          {currentStep > 0 && (
            <TouchableOpacity
              style={[styles.navButton, { backgroundColor: theme.surface }]}
              onPress={goToPrevious}
            >
              <Ionicons 
                name={isArabic ? 'chevron-forward' : 'chevron-back'} 
                size={24} 
                color={theme.text} 
              />
            </TouchableOpacity>
          )}

          <View style={styles.spacer} />

          {!isLastStep ? (
            <TouchableOpacity
              style={[styles.navButton, { backgroundColor: currentStepData.color }]}
              onPress={goToNext}
            >
              <Ionicons 
                name={isArabic ? 'chevron-back' : 'chevron-forward'} 
                size={24} 
                color={COLORS.white} 
              />
            </TouchableOpacity>
          ) : (
            <CustomButton
              title={isArabic ? 'ابدأ الآن' : 'Get Started'}
              onPress={handleGetStarted}
              style={[styles.getStartedButton, { backgroundColor: currentStepData.color }]}
              icon="rocket"
              size="large"
            />
          )}
        </View>
      </View>

      {/* Bottom Wave */}
      <View style={[styles.waveContainer, { backgroundColor: currentStepData.color + '10' }]} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipButton: {
    position: 'absolute',
    top: SPACING.xl + 20,
    right: SPACING.lg,
    zIndex: 10,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  skipText: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.h1,
    fontWeight: TYPOGRAPHY.weights.bold,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  description: {
    fontSize: TYPOGRAPHY.sizes.body1,
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: SPACING.lg,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xxl,
    gap: SPACING.sm,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: SPACING.lg,
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  spacer: {
    flex: 1,
  },
  getStartedButton: {
    minWidth: 140,
  },
  waveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    borderTopLeftRadius: BORDER_RADIUS.xxl,
    borderTopRightRadius: BORDER_RADIUS.xxl,
  },
});

export default WelcomeTutorialScreen;
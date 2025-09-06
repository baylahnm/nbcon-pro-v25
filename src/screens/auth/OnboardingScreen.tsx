import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import { ANIMATIONS } from '../../constants/animations';
import { createFadeIn, createStaggeredAnimation, NBCONEasing } from '../../utils/animations';
import { CustomButton } from '../../components/CustomButton';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  image?: string;
}

const onboardingSlides: OnboardingSlide[] = [
  {
    id: 'welcome',
    title: { 
      en: 'Welcome to NBCON Pro', 
      ar: 'مرحباً بك في NBCON Pro' 
    },
    description: { 
      en: 'Saudi Arabia\'s first engineering marketplace connecting certified engineers with clients',
      ar: 'أول منصة هندسية في المملكة العربية السعودية تربط المهندسين المعتمدين بالعملاء'
    },
    icon: 'rocket',
    color: COLORS.primary,
  },
  {
    id: 'matching',
    title: { 
      en: 'AI-Powered Matching', 
      ar: 'مطابقة بالذكاء الاصطناعي' 
    },
    description: { 
      en: 'Our advanced AI matches you with the right engineers based on skills, location, and ratings',
      ar: 'يقوم الذكاء الاصطناعي المتطور لدينا بمطابقتك مع المهندسين المناسبين بناءً على المهارات والموقع والتقييمات'
    },
    icon: 'brain',
    color: COLORS.secondary,
  },
  {
    id: 'verification',
    title: { 
      en: 'Verified Professionals', 
      ar: 'محترفون معتمدون' 
    },
    description: { 
      en: 'All engineers are verified through Saudi Council of Engineers for your peace of mind',
      ar: 'جميع المهندسين معتمدون من خلال هيئة المهندسين السعودية لراحة بالك'
    },
    icon: 'shield-checkmark',
    color: COLORS.success,
  },
  {
    id: 'payment',
    title: { 
      en: 'Secure Payments', 
      ar: 'دفعات آمنة' 
    },
    description: { 
      en: 'Milestone-based escrow payments with support for mada, STC Pay, and international cards',
      ar: 'مدفوعات ضمان قائمة على المعالم مع دعم مدى و STC Pay والبطاقات الدولية'
    },
    icon: 'card',
    color: COLORS.accent,
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  // Animation values
  const slideAnimations = useRef(
    onboardingSlides.map(() => ({
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(30),
      scale: new Animated.Value(0.9),
    }))
  ).current;
  const indicatorAnimations = useRef(
    onboardingSlides.map(() => new Animated.Value(0))
  ).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate in the first slide
    animateSlide(0);
  }, []);

  const animateSlide = (index: number) => {
    // Reset all slides
    slideAnimations.forEach((anim, i) => {
      if (i !== index) {
        anim.opacity.setValue(0);
        anim.translateY.setValue(30);
        anim.scale.setValue(0.9);
      }
    });

    // Animate current slide
    const currentAnim = slideAnimations[index];
    Animated.parallel([
      createFadeIn(currentAnim.opacity, ANIMATIONS.DURATION.slow),
      Animated.timing(currentAnim.translateY, {
        toValue: 0,
        duration: ANIMATIONS.DURATION.slow,
        easing: NBCONEasing.elegant,
        useNativeDriver: true,
      }),
      Animated.spring(currentAnim.scale, {
        toValue: 1,
        tension: 120,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Update indicators
    indicatorAnimations.forEach((anim, i) => {
      Animated.timing(anim, {
        toValue: i === index ? 1 : 0,
        duration: ANIMATIONS.DURATION.normal,
        easing: NBCONEasing.smooth,
        useNativeDriver: false,
      }).start();
    });

    // Show button on last slide
    if (index === onboardingSlides.length - 1) {
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: ANIMATIONS.DURATION.normal,
        easing: NBCONEasing.elegant,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(buttonOpacity, {
        toValue: 0,
        duration: ANIMATIONS.DURATION.fast,
        easing: NBCONEasing.sharp,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      const nextSlide = currentSlide + 1;
      setCurrentSlide(nextSlide);
      scrollViewRef.current?.scrollTo({ x: nextSlide * screenWidth, animated: true });
      animateSlide(nextSlide);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      const prevSlide = currentSlide - 1;
      setCurrentSlide(prevSlide);
      scrollViewRef.current?.scrollTo({ x: prevSlide * screenWidth, animated: true });
      animateSlide(prevSlide);
    }
  };

  const getText = (textObj: { en: string; ar: string }) => {
    return isArabic ? textObj.ar : textObj.en;
  };

  const renderSlide = (slide: OnboardingSlide, index: number) => {
    const anim = slideAnimations[index];
    const isActive = index === currentSlide;

    return (
      <View key={slide.id} style={styles.slide}>
        <Animated.View
          style={[
            styles.slideContent,
            {
              opacity: anim.opacity,
              transform: [
                { translateY: anim.translateY },
                { scale: anim.scale },
              ],
            },
          ]}
        >
          {/* Icon */}
          <View style={[styles.iconContainer, { backgroundColor: slide.color + '20' }]}>
            <Ionicons name={slide.icon} size={80} color={slide.color} />
          </View>

          {/* Title */}
          <Text style={[styles.title, { color: theme.text }]}>
            {getText(slide.title)}
          </Text>

          {/* Description */}
          <Text style={[styles.description, { color: theme.textSecondary }]}>
            {getText(slide.description)}
          </Text>
        </Animated.View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={isDarkMode ? ['#1a1a1a', '#2d2d2d'] : ['#f8f9fa', '#ffffff']}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: theme.text }]}>
          {isArabic ? `${currentSlide + 1} من ${onboardingSlides.length}` : `${currentSlide + 1} of ${onboardingSlides.length}`}
        </Text>
      </View>

      {/* Slides */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        style={styles.scrollView}
      >
        {onboardingSlides.map((slide, index) => renderSlide(slide, index))}
      </ScrollView>

      {/* Indicators */}
      <View style={styles.indicators}>
        {onboardingSlides.map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.indicator,
              {
                backgroundColor: indicatorAnimations[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [theme.border, COLORS.primary],
                }),
                width: indicatorAnimations[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [8, 24],
                }),
              },
            ]}
          />
        ))}
      </View>

      {/* Navigation */}
      <View style={styles.navigation}>
        <CustomButton
          title={isArabic ? 'السابق' : 'Previous'}
          onPress={handlePrevious}
          variant="outline"
          style={[styles.navButton, { opacity: currentSlide === 0 ? 0.5 : 1 }]}
          disabled={currentSlide === 0}
        />
        
        {currentSlide < onboardingSlides.length - 1 ? (
          <CustomButton
            title={isArabic ? 'التالي' : 'Next'}
            onPress={handleNext}
            style={styles.navButton}
          />
        ) : (
          <Animated.View style={{ opacity: buttonOpacity }}>
            <CustomButton
              title={isArabic ? 'ابدأ الآن' : 'Get Started'}
              onPress={onComplete}
              style={styles.navButton}
              animationType="bounce"
            />
          </Animated.View>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
  },
  headerText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width: screenWidth,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  slideContent: {
    alignItems: 'center',
    maxWidth: 300,
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.h4,
    fontWeight: TYPOGRAPHY.weights.bold,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  description: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.regular,
    textAlign: 'center',
    lineHeight: 24,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    gap: SPACING.sm,
  },
  indicator: {
    height: 8,
    borderRadius: 4,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    gap: SPACING.md,
  },
  navButton: {
    flex: 1,
  },
});

export default OnboardingScreen;
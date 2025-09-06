// Animation Utilities for NBCON Pro
// Utility functions for creating smooth, professional animations

import { Animated, Easing, Platform, AccessibilityInfo } from 'react-native';
import { ANIMATIONS, ANIMATION_PRESETS, PLATFORM_ADJUSTMENTS, ACCESSIBILITY_ANIMATIONS } from '../constants/animations';

/**
 * Creates a smooth fade in animation
 */
export const createFadeIn = (
  animatedValue: Animated.Value,
  duration: number = ANIMATIONS.DURATION.normal,
  easing: any = Easing.out(Easing.cubic),
  delay: number = 0
): Animated.CompositeAnimation => {
  return Animated.timing(animatedValue, {
    toValue: 1,
    duration: getPlatformDuration(duration),
    easing,
    delay,
    useNativeDriver: true,
  });
};

/**
 * Creates a smooth fade out animation
 */
export const createFadeOut = (
  animatedValue: Animated.Value,
  duration: number = ANIMATIONS.DURATION.normal,
  easing: any = Easing.in(Easing.cubic),
  delay: number = 0
): Animated.CompositeAnimation => {
  return Animated.timing(animatedValue, {
    toValue: 0,
    duration: getPlatformDuration(duration),
    easing,
    delay,
    useNativeDriver: true,
  });
};

/**
 * Creates a slide in animation from any direction
 */
export const createSlideIn = (
  animatedValue: Animated.Value,
  direction: 'left' | 'right' | 'top' | 'bottom' = 'right',
  duration: number = ANIMATIONS.DURATION.slow,
  easing: any = Easing.out(Easing.cubic)
): Animated.CompositeAnimation => {
  return Animated.timing(animatedValue, {
    toValue: 0,
    duration: getPlatformDuration(duration),
    easing,
    useNativeDriver: true,
  });
};

/**
 * Creates a scale animation with bounce effect
 */
export const createScaleAnimation = (
  animatedValue: Animated.Value,
  toValue: number = 1,
  duration: number = ANIMATIONS.DURATION.normal,
  bouncy: boolean = false
): Animated.CompositeAnimation => {
  const easing = bouncy ? Easing.elastic(1.3) : Easing.out(Easing.cubic);
  
  return Animated.timing(animatedValue, {
    toValue,
    duration: getPlatformDuration(duration),
    easing,
    useNativeDriver: true,
  });
};

/**
 * Creates a spring animation for natural movement
 */
export const createSpringAnimation = (
  animatedValue: Animated.Value,
  toValue: number,
  config: {
    tension?: number;
    friction?: number;
    speed?: number;
    bounciness?: number;
  } = {}
): Animated.CompositeAnimation => {
  return Animated.spring(animatedValue, {
    toValue,
    tension: config.tension || 120,
    friction: config.friction || 8,
    speed: config.speed || 12,
    bounciness: config.bounciness || 8,
    useNativeDriver: true,
  });
};

/**
 * Creates a pulse animation for loading states
 */
export const createPulseAnimation = (
  animatedValue: Animated.Value,
  duration: number = ANIMATIONS.PULSE.duration,
  minOpacity: number = ANIMATIONS.PULSE.minOpacity,
  maxOpacity: number = ANIMATIONS.PULSE.maxOpacity
): Animated.CompositeAnimation => {
  return Animated.loop(
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: maxOpacity,
        duration: getPlatformDuration(duration / 2),
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: minOpacity,
        duration: getPlatformDuration(duration / 2),
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ])
  );
};

/**
 * Creates a shimmer animation for loading skeletons
 */
export const createShimmerAnimation = (
  animatedValue: Animated.Value,
  duration: number = ANIMATIONS.SHIMMER.duration
): Animated.CompositeAnimation => {
  return Animated.loop(
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: getPlatformDuration(duration),
      easing: Easing.linear,
      useNativeDriver: true,
    })
  );
};

/**
 * Creates a shake animation for error feedback
 */
export const createShakeAnimation = (
  animatedValue: Animated.Value,
  intensity: number = 10,
  duration: number = ANIMATIONS.DURATION.slower
): Animated.CompositeAnimation => {
  return Animated.sequence([
    Animated.timing(animatedValue, {
      toValue: intensity,
      duration: getPlatformDuration(duration / 8),
      easing: Easing.linear,
      useNativeDriver: true,
    }),
    Animated.timing(animatedValue, {
      toValue: -intensity,
      duration: getPlatformDuration(duration / 4),
      easing: Easing.linear,
      useNativeDriver: true,
    }),
    Animated.timing(animatedValue, {
      toValue: intensity * 0.8,
      duration: getPlatformDuration(duration / 4),
      easing: Easing.linear,
      useNativeDriver: true,
    }),
    Animated.timing(animatedValue, {
      toValue: -intensity * 0.8,
      duration: getPlatformDuration(duration / 4),
      easing: Easing.linear,
      useNativeDriver: true,
    }),
    Animated.timing(animatedValue, {
      toValue: intensity * 0.4,
      duration: getPlatformDuration(duration / 8),
      easing: Easing.linear,
      useNativeDriver: true,
    }),
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: getPlatformDuration(duration / 8),
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ]);
};

/**
 * Creates a rotation animation
 */
export const createRotationAnimation = (
  animatedValue: Animated.Value,
  rotations: number = 1,
  duration: number = ANIMATIONS.DURATION.slowest,
  loop: boolean = false
): Animated.CompositeAnimation => {
  const animation = Animated.timing(animatedValue, {
    toValue: rotations,
    duration: getPlatformDuration(duration),
    easing: Easing.linear,
    useNativeDriver: true,
  });

  return loop ? Animated.loop(animation) : animation;
};

/**
 * Creates a staggered animation for multiple elements
 */
export const createStaggeredAnimation = (
  animations: Animated.CompositeAnimation[],
  staggerDelay: number = 100,
  maxDelay: number = 500
): Animated.CompositeAnimation => {
  const staggeredAnimations = animations.map((animation, index) => {
    const delay = Math.min(index * staggerDelay, maxDelay);
    return Animated.delay(delay).start ? Animated.sequence([Animated.delay(delay), animation]) : animation;
  });

  return Animated.parallel(staggeredAnimations);
};

/**
 * Creates a sequential animation chain
 */
export const createSequentialAnimation = (
  animations: Animated.CompositeAnimation[]
): Animated.CompositeAnimation => {
  return Animated.sequence(animations);
};

/**
 * Creates a parallel animation group
 */
export const createParallelAnimation = (
  animations: Animated.CompositeAnimation[]
): Animated.CompositeAnimation => {
  return Animated.parallel(animations);
};

/**
 * Creates a button press animation with feedback
 */
export const createButtonPressAnimation = (
  scaleValue: Animated.Value,
  onPressIn?: () => void,
  onPressOut?: () => void
) => {
  const pressIn = () => {
    Animated.timing(scaleValue, {
      toValue: ANIMATIONS.SCALE.pressed,
      duration: getPlatformDuration(ANIMATIONS.DURATION.fast),
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
    onPressIn?.();
  };

  const pressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      tension: 150,
      friction: 6,
      useNativeDriver: true,
    }).start();
    onPressOut?.();
  };

  return { pressIn, pressOut };
};

/**
 * Creates a card selection animation
 */
export const createCardSelectAnimation = (
  scaleValue: Animated.Value,
  elevationValue: Animated.Value,
  selected: boolean
): Animated.CompositeAnimation => {
  return Animated.parallel([
    Animated.spring(scaleValue, {
      toValue: selected ? ANIMATIONS.SCALE.tiny : 1,
      tension: 120,
      friction: 8,
      useNativeDriver: true,
    }),
    Animated.timing(elevationValue, {
      toValue: selected ? 8 : 2,
      duration: getPlatformDuration(ANIMATIONS.DURATION.normal),
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false, // Elevation doesn't support native driver
    }),
  ]);
};

/**
 * Creates a progress bar animation
 */
export const createProgressAnimation = (
  animatedValue: Animated.Value,
  progress: number,
  duration: number = ANIMATIONS.DURATION.slow
): Animated.CompositeAnimation => {
  return Animated.timing(animatedValue, {
    toValue: progress,
    duration: getPlatformDuration(duration),
    easing: Easing.out(Easing.cubic),
    useNativeDriver: false, // Width animations don't support native driver
  });
};

/**
 * Interpolates animated values for smooth transitions
 */
export const interpolateValue = (
  animatedValue: Animated.Value,
  inputRange: number[],
  outputRange: number[] | string[]
) => {
  return animatedValue.interpolate({
    inputRange,
    outputRange,
    extrapolate: 'clamp',
  });
};

/**
 * Gets platform-adjusted animation duration
 */
export const getPlatformDuration = (duration: number): number => {
  const adjustment = PLATFORM_ADJUSTMENTS[Platform.OS as keyof typeof PLATFORM_ADJUSTMENTS];
  return Math.round(duration * (adjustment?.durationMultiplier || 1));
};

/**
 * Checks if user prefers reduced motion and adjusts animations accordingly
 */
export const getAccessibilityAdjustedAnimation = async (
  animation: Animated.CompositeAnimation,
  fallback?: any
): Promise<Animated.CompositeAnimation> => {
  try {
    const isReducedMotionEnabled = await AccessibilityInfo.isReducedMotionEnabled();
    
    if (isReducedMotionEnabled && fallback) {
      return fallback;
    }
    
    return animation;
  } catch (error) {
    console.warn('Could not determine accessibility preferences:', error);
    return animation;
  }
};

/**
 * Creates a custom easing curve for NBCON brand feel
 */
export const NBCONEasing = {
  professional: Easing.bezier(0.4, 0.0, 0.2, 1),
  elegant: Easing.bezier(0.25, 0.46, 0.45, 0.94),
  smooth: Easing.bezier(0.23, 1, 0.32, 1),
  bounce: Easing.bezier(0.68, -0.55, 0.265, 1.55),
};

/**
 * Animation timing functions optimized for Saudi/RTL layouts
 */
export const RTLAnimations = {
  slideInRight: (animatedValue: Animated.Value, isRTL: boolean) => {
    const direction = isRTL ? -1 : 1;
    return Animated.timing(animatedValue, {
      toValue: 0,
      duration: getPlatformDuration(ANIMATIONS.DURATION.slow),
      easing: NBCONEasing.elegant,
      useNativeDriver: true,
    });
  },
  
  slideInLeft: (animatedValue: Animated.Value, isRTL: boolean) => {
    const direction = isRTL ? 1 : -1;
    return Animated.timing(animatedValue, {
      toValue: 0,
      duration: getPlatformDuration(ANIMATIONS.DURATION.slow),
      easing: NBCONEasing.elegant,
      useNativeDriver: true,
    });
  },
};

/**
 * Creates smooth loading state transitions
 */
export const createLoadingStateAnimation = (
  opacityValue: Animated.Value,
  scaleValue: Animated.Value,
  isLoading: boolean
): Animated.CompositeAnimation => {
  if (isLoading) {
    return Animated.parallel([
      Animated.timing(opacityValue, {
        toValue: 0.6,
        duration: getPlatformDuration(ANIMATIONS.DURATION.fast),
        easing: NBCONEasing.smooth,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: getPlatformDuration(ANIMATIONS.DURATION.fast),
        easing: NBCONEasing.smooth,
        useNativeDriver: true,
      }),
    ]);
  } else {
    return Animated.parallel([
      Animated.spring(opacityValue, {
        toValue: 1,
        tension: 120,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        tension: 120,
        friction: 8,
        useNativeDriver: true,
      }),
    ]);
  }
};
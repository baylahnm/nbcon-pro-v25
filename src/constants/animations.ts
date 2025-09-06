// Animation Constants and Utilities for NBCON Pro
// Professional, smooth animations that align with Saudi Vision 2030 brand

export const ANIMATIONS = {
  // Durations (in milliseconds)
  DURATION: {
    instant: 0,
    fast: 150,
    normal: 300,
    slow: 500,
    slower: 750,
    slowest: 1000,
  },

  // Easing curves for professional feel
  EASING: {
    // Material Design inspired curves
    standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0.0, 0.6, 1)',
    
    // Custom NBCON curves for premium feel
    elegant: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    smooth: 'cubic-bezier(0.23, 1, 0.32, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    professional: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  },

  // Transform scales for micro-interactions
  SCALE: {
    none: 1,
    tiny: 1.02,
    small: 1.05,
    medium: 1.1,
    large: 1.15,
    pressed: 0.95,
    tap: 0.98,
  },

  // Opacity values
  OPACITY: {
    hidden: 0,
    faint: 0.1,
    light: 0.3,
    medium: 0.5,
    strong: 0.7,
    visible: 1,
  },

  // Spring configurations
  SPRING: {
    gentle: {
      damping: 25,
      stiffness: 120,
      mass: 1,
    },
    snappy: {
      damping: 20,
      stiffness: 150,
      mass: 1,
    },
    bouncy: {
      damping: 15,
      stiffness: 200,
      mass: 1,
    },
    professional: {
      damping: 30,
      stiffness: 100,
      mass: 1,
    },
  },

  // Slide distances
  SLIDE: {
    small: 10,
    medium: 20,
    large: 30,
    full: 50,
  },

  // Rotation angles
  ROTATION: {
    slight: '2deg',
    small: '5deg',
    medium: '15deg',
    large: '45deg',
    quarter: '90deg',
    half: '180deg',
    full: '360deg',
  },

  // Loading and shimmer effects
  SHIMMER: {
    duration: 1500,
    colors: ['transparent', 'rgba(255,255,255,0.1)', 'transparent'],
    locations: [0, 0.5, 1],
  },

  // Pulse animation
  PULSE: {
    duration: 2000,
    minOpacity: 0.3,
    maxOpacity: 1,
  },
};

// Pre-defined animation configurations for common UI patterns
export const ANIMATION_PRESETS = {
  // Button interactions
  BUTTON_PRESS: {
    scale: ANIMATIONS.SCALE.pressed,
    duration: ANIMATIONS.DURATION.fast,
    easing: ANIMATIONS.EASING.sharp,
  },
  
  BUTTON_RELEASE: {
    scale: ANIMATIONS.SCALE.none,
    duration: ANIMATIONS.DURATION.normal,
    easing: ANIMATIONS.EASING.elegant,
  },

  BUTTON_HOVER: {
    scale: ANIMATIONS.SCALE.tiny,
    duration: ANIMATIONS.DURATION.fast,
    easing: ANIMATIONS.EASING.smooth,
  },

  // Card animations
  CARD_ENTRANCE: {
    opacity: ANIMATIONS.OPACITY.visible,
    translateY: 0,
    scale: ANIMATIONS.SCALE.none,
    duration: ANIMATIONS.DURATION.slow,
    easing: ANIMATIONS.EASING.elegant,
  },

  CARD_EXIT: {
    opacity: ANIMATIONS.OPACITY.hidden,
    translateY: -ANIMATIONS.SLIDE.large,
    scale: ANIMATIONS.SCALE.small,
    duration: ANIMATIONS.DURATION.normal,
    easing: ANIMATIONS.EASING.accelerate,
  },

  CARD_SELECT: {
    scale: ANIMATIONS.SCALE.tiny,
    duration: ANIMATIONS.DURATION.fast,
    easing: ANIMATIONS.EASING.bounce,
  },

  // Screen transitions
  SCREEN_SLIDE_IN: {
    translateX: 0,
    opacity: ANIMATIONS.OPACITY.visible,
    duration: ANIMATIONS.DURATION.slow,
    easing: ANIMATIONS.EASING.decelerate,
  },

  SCREEN_SLIDE_OUT: {
    translateX: -ANIMATIONS.SLIDE.full,
    opacity: ANIMATIONS.OPACITY.hidden,
    duration: ANIMATIONS.DURATION.normal,
    easing: ANIMATIONS.EASING.accelerate,
  },

  // Modal animations
  MODAL_SLIDE_UP: {
    translateY: 0,
    opacity: ANIMATIONS.OPACITY.visible,
    duration: ANIMATIONS.DURATION.slow,
    easing: ANIMATIONS.EASING.elegant,
  },

  MODAL_SLIDE_DOWN: {
    translateY: ANIMATIONS.SLIDE.full,
    opacity: ANIMATIONS.OPACITY.hidden,
    duration: ANIMATIONS.DURATION.normal,
    easing: ANIMATIONS.EASING.sharp,
  },

  // Success/Error feedback
  SUCCESS_PULSE: {
    scale: ANIMATIONS.SCALE.medium,
    duration: ANIMATIONS.DURATION.normal,
    easing: ANIMATIONS.EASING.bounce,
  },

  ERROR_SHAKE: {
    translateX: [-10, 10, -8, 8, -6, 6, -4, 4, -2, 2, 0],
    duration: ANIMATIONS.DURATION.slower,
    easing: ANIMATIONS.EASING.sharp,
  },

  // Loading states
  SKELETON_SHIMMER: {
    opacity: [0.3, 0.7, 0.3],
    duration: ANIMATIONS.DURATION.slowest,
    repeat: -1,
    easing: ANIMATIONS.EASING.smooth,
  },

  SPINNER_ROTATION: {
    rotate: ANIMATIONS.ROTATION.full,
    duration: ANIMATIONS.DURATION.slower,
    repeat: -1,
    easing: 'linear',
  },

  // List item animations
  LIST_ITEM_ENTRANCE: {
    opacity: ANIMATIONS.OPACITY.visible,
    translateY: 0,
    duration: ANIMATIONS.DURATION.normal,
    easing: ANIMATIONS.EASING.decelerate,
  },

  LIST_ITEM_SWIPE: {
    translateX: 0,
    duration: ANIMATIONS.DURATION.normal,
    easing: ANIMATIONS.EASING.professional,
  },

  // Progress indicators
  PROGRESS_FILL: {
    width: '100%',
    duration: ANIMATIONS.DURATION.slow,
    easing: ANIMATIONS.EASING.decelerate,
  },

  // Toggle switches
  TOGGLE_ON: {
    translateX: 20,
    backgroundColor: '#1B7A3E', // Saudi Green
    duration: ANIMATIONS.DURATION.normal,
    easing: ANIMATIONS.EASING.smooth,
  },

  TOGGLE_OFF: {
    translateX: 0,
    backgroundColor: '#B0B0B0',
    duration: ANIMATIONS.DURATION.normal,
    easing: ANIMATIONS.EASING.smooth,
  },

  // Tab transitions
  TAB_INDICATOR: {
    translateX: 0, // This will be calculated dynamically
    duration: ANIMATIONS.DURATION.normal,
    easing: ANIMATIONS.EASING.professional,
  },

  // Floating Action Button
  FAB_SCALE_IN: {
    scale: ANIMATIONS.SCALE.none,
    opacity: ANIMATIONS.OPACITY.visible,
    duration: ANIMATIONS.DURATION.normal,
    easing: ANIMATIONS.EASING.bounce,
  },

  FAB_SCALE_OUT: {
    scale: ANIMATIONS.SCALE.none,
    opacity: ANIMATIONS.OPACITY.hidden,
    duration: ANIMATIONS.DURATION.fast,
    easing: ANIMATIONS.EASING.sharp,
  },
};

// Stagger configurations for sequential animations
export const STAGGER_CONFIGS = {
  // List items appearing one by one
  LIST_STAGGER: {
    delay: 50, // milliseconds between each item
    maxDelay: 300, // maximum delay to prevent long waits
  },

  // Cards in a grid
  GRID_STAGGER: {
    delay: 75,
    maxDelay: 500,
  },

  // Navigation items
  NAV_STAGGER: {
    delay: 25,
    maxDelay: 150,
  },

  // Feature highlights
  FEATURE_STAGGER: {
    delay: 100,
    maxDelay: 600,
  },
};

// Gesture-based animation thresholds
export const GESTURE_THRESHOLDS = {
  // Swipe gestures
  SWIPE_VELOCITY: 1000,
  SWIPE_DISTANCE: 50,
  
  // Pan gestures
  PAN_RESISTANCE: 2,
  PAN_THRESHOLD: 100,
  
  // Pinch gestures
  PINCH_MIN_SCALE: 0.5,
  PINCH_MAX_SCALE: 3,
  
  // Long press
  LONG_PRESS_DURATION: 500,
};

// Platform-specific animation adjustments
export const PLATFORM_ADJUSTMENTS = {
  ios: {
    durationMultiplier: 1,
    useNativeDriver: true,
  },
  android: {
    durationMultiplier: 0.8, // Slightly faster for Android
    useNativeDriver: true,
  },
  web: {
    durationMultiplier: 1.2, // Slightly slower for web
    useNativeDriver: false,
  },
};

// Accessibility considerations
export const ACCESSIBILITY_ANIMATIONS = {
  // Reduced motion preferences
  REDUCED_MOTION: {
    duration: ANIMATIONS.DURATION.fast,
    easing: 'linear',
    scale: ANIMATIONS.SCALE.none,
    translateX: 0,
    translateY: 0,
    opacity: ANIMATIONS.OPACITY.visible,
  },

  // High contrast mode adjustments
  HIGH_CONTRAST: {
    shadowOpacity: 0.8,
    borderWidth: 2,
    borderColor: '#000000',
  },
};
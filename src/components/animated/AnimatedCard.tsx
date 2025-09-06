// AnimatedCard.tsx - Professional animated card component for NBCON Pro
// Provides consistent card animations across the app

import React, { useRef, useEffect, ReactNode } from 'react';
import {
  Animated,
  View,
  ViewStyle,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants';
import { ANIMATIONS } from '../../constants/animations';
import { createFadeIn, createCardSelectAnimation, NBCONEasing } from '../../utils/animations';

interface AnimatedCardProps {
  children: ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  onLongPress?: () => void;
  selected?: boolean;
  selectable?: boolean;
  disabled?: boolean;
  elevation?: number;
  animationDelay?: number;
  animationType?: 'fade' | 'slide' | 'scale' | 'none';
  rippleColor?: string;
  pressAnimation?: boolean;
  hoverAnimation?: boolean;
  isDarkMode?: boolean;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  style,
  onPress,
  onLongPress,
  selected = false,
  selectable = false,
  disabled = false,
  elevation = 2,
  animationDelay = 0,
  animationType = 'fade',
  rippleColor,
  pressAnimation = true,
  hoverAnimation = false,
  isDarkMode = false,
}) => {
  // Animation values
  const opacity = useRef(new Animated.Value(animationType === 'none' ? 1 : 0)).current;
  const translateY = useRef(new Animated.Value(animationType === 'slide' ? 30 : 0)).current;
  const scale = useRef(new Animated.Value(animationType === 'scale' ? 0.8 : 1)).current;
  const elevationValue = useRef(new Animated.Value(elevation)).current;
  const pressScale = useRef(new Animated.Value(1)).current;

  // Initialize entrance animation
  useEffect(() => {
    if (animationType === 'none') return;

    const animations: Animated.CompositeAnimation[] = [];

    if (animationType === 'fade' || animationType === 'slide' || animationType === 'scale') {
      animations.push(createFadeIn(opacity, ANIMATIONS.DURATION.normal));
    }

    if (animationType === 'slide') {
      animations.push(
        Animated.timing(translateY, {
          toValue: 0,
          duration: ANIMATIONS.DURATION.normal,
          easing: NBCONEasing.elegant,
          useNativeDriver: true,
        })
      );
    }

    if (animationType === 'scale') {
      animations.push(
        Animated.spring(scale, {
          toValue: 1,
          tension: 120,
          friction: 8,
          useNativeDriver: true,
        })
      );
    }

    const entranceAnimation = Animated.parallel(animations);

    if (animationDelay > 0) {
      Animated.sequence([
        Animated.delay(animationDelay),
        entranceAnimation,
      ]).start();
    } else {
      entranceAnimation.start();
    }
  }, [animationType, animationDelay]);

  // Handle selection animation
  useEffect(() => {
    if (!selectable) return;

    createCardSelectAnimation(scale, elevationValue, selected).start();
  }, [selected, selectable]);

  // Press handlers with animation
  const handlePressIn = () => {
    if (disabled || !pressAnimation) return;

    Animated.timing(pressScale, {
      toValue: ANIMATIONS.SCALE.pressed,
      duration: ANIMATIONS.DURATION.fast,
      easing: NBCONEasing.sharp,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    if (disabled || !pressAnimation) return;

    Animated.spring(pressScale, {
      toValue: 1,
      tension: 150,
      friction: 6,
      useNativeDriver: true,
    }).start();
  };

  // Get combined animated styles
  const getAnimatedStyle = (): ViewStyle => ({
    opacity,
    transform: [
      { translateY },
      { scale: Animated.multiply(scale, pressScale) },
    ],
    elevation: Platform.OS === 'android' ? elevationValue : undefined,
    shadowOpacity: Platform.OS === 'ios' ? elevationValue.interpolate({\n      inputRange: [0, 10],\n      outputRange: [0, 0.3],\n      extrapolate: 'clamp',\n    }) : undefined,\n  });\n\n  const theme = isDarkMode ? COLORS.dark : COLORS.light;\n\n  const cardStyle = [\n    styles.card,\n    {\n      backgroundColor: theme.card,\n      borderColor: selected ? COLORS.primary : theme.border,\n      borderWidth: selected ? 2 : 1,\n    },\n    style,\n  ];\n\n  if (!onPress && !onLongPress) {\n    return (\n      <Animated.View style={[cardStyle, getAnimatedStyle()]}>\n        {children}\n      </Animated.View>\n    );\n  }\n\n  return (\n    <Animated.View style={getAnimatedStyle()}>\n      <Pressable\n        style={({ pressed }) => [\n          cardStyle,\n          pressed && Platform.OS === 'ios' && styles.pressed,\n          disabled && styles.disabled,\n        ]}\n        onPress={onPress}\n        onLongPress={onLongPress}\n        onPressIn={handlePressIn}\n        onPressOut={handlePressOut}\n        disabled={disabled}\n        android_ripple={{\n          color: rippleColor || COLORS.primary + '20',\n          borderless: false,\n          radius: 200,\n        }}\n      >\n        {children}\n      </Pressable>\n    </Animated.View>\n  );\n};\n\nconst styles = StyleSheet.create({\n  card: {\n    borderRadius: BORDER_RADIUS.md,\n    padding: SPACING.md,\n    marginVertical: SPACING.sm,\n    ...Platform.select({\n      ios: {\n        shadowColor: '#000',\n        shadowOffset: { width: 0, height: 2 },\n        shadowRadius: 4,\n      },\n      android: {\n        elevation: 2,\n      },\n    }),\n  },\n  pressed: {\n    opacity: 0.8,\n  },\n  disabled: {\n    opacity: 0.6,\n  },\n});\n\nexport default AnimatedCard;"}, {"new_string": "// AnimatedCard.tsx - Professional animated card component for NBCON Pro\n// Provides consistent card animations across the app\n\nimport React, { useRef, useEffect, ReactNode } from 'react';\nimport {\n  Animated,\n  View,\n  ViewStyle,\n  StyleSheet,\n  Pressable,\n  Platform,\n} from 'react-native';\nimport { COLORS, SPACING, BORDER_RADIUS } from '../../constants';\nimport { ANIMATIONS } from '../../constants/animations';\nimport { createFadeIn, createCardSelectAnimation, NBCONEasing } from '../../utils/animations';\n\ninterface AnimatedCardProps {\n  children: ReactNode;\n  style?: ViewStyle;\n  onPress?: () => void;\n  onLongPress?: () => void;\n  selected?: boolean;\n  selectable?: boolean;\n  disabled?: boolean;\n  elevation?: number;\n  animationDelay?: number;\n  animationType?: 'fade' | 'slide' | 'scale' | 'none';\n  rippleColor?: string;\n  pressAnimation?: boolean;\n  hoverAnimation?: boolean;\n  isDarkMode?: boolean;\n}\n\nexport const AnimatedCard: React.FC<AnimatedCardProps> = ({\n  children,\n  style,\n  onPress,\n  onLongPress,\n  selected = false,\n  selectable = false,\n  disabled = false,\n  elevation = 2,\n  animationDelay = 0,\n  animationType = 'fade',\n  rippleColor,\n  pressAnimation = true,\n  hoverAnimation = false,\n  isDarkMode = false,\n}) => {\n  // Animation values\n  const opacity = useRef(new Animated.Value(animationType === 'none' ? 1 : 0)).current;\n  const translateY = useRef(new Animated.Value(animationType === 'slide' ? 30 : 0)).current;\n  const scale = useRef(new Animated.Value(animationType === 'scale' ? 0.8 : 1)).current;\n  const elevationValue = useRef(new Animated.Value(elevation)).current;\n  const pressScale = useRef(new Animated.Value(1)).current;\n\n  // Initialize entrance animation\n  useEffect(() => {\n    if (animationType === 'none') return;\n\n    const animations: Animated.CompositeAnimation[] = [];\n\n    if (animationType === 'fade' || animationType === 'slide' || animationType === 'scale') {\n      animations.push(createFadeIn(opacity, ANIMATIONS.DURATION.normal));\n    }\n\n    if (animationType === 'slide') {\n      animations.push(\n        Animated.timing(translateY, {\n          toValue: 0,\n          duration: ANIMATIONS.DURATION.normal,\n          easing: NBCONEasing.elegant,\n          useNativeDriver: true,\n        })\n      );\n    }\n\n    if (animationType === 'scale') {\n      animations.push(\n        Animated.spring(scale, {\n          toValue: 1,\n          tension: 120,\n          friction: 8,\n          useNativeDriver: true,\n        })\n      );\n    }\n\n    const entranceAnimation = Animated.parallel(animations);\n\n    if (animationDelay > 0) {\n      Animated.sequence([\n        Animated.delay(animationDelay),\n        entranceAnimation,\n      ]).start();\n    } else {\n      entranceAnimation.start();\n    }\n  }, [animationType, animationDelay]);\n\n  // Handle selection animation\n  useEffect(() => {\n    if (!selectable) return;\n\n    createCardSelectAnimation(scale, elevationValue, selected).start();\n  }, [selected, selectable]);\n\n  // Press handlers with animation\n  const handlePressIn = () => {\n    if (disabled || !pressAnimation) return;\n\n    Animated.timing(pressScale, {\n      toValue: ANIMATIONS.SCALE.pressed,\n      duration: ANIMATIONS.DURATION.fast,\n      easing: NBCONEasing.sharp,\n      useNativeDriver: true,\n    }).start();\n  };\n\n  const handlePressOut = () => {\n    if (disabled || !pressAnimation) return;\n\n    Animated.spring(pressScale, {\n      toValue: 1,\n      tension: 150,\n      friction: 6,\n      useNativeDriver: true,\n    }).start();\n  };\n\n  // Get combined animated styles\n  const getAnimatedStyle = (): ViewStyle => ({\n    opacity,\n    transform: [\n      { translateY },\n      { scale: Animated.multiply(scale, pressScale) },\n    ],\n    elevation: Platform.OS === 'android' ? elevationValue : undefined,\n    shadowOpacity: Platform.OS === 'ios' ? elevationValue.interpolate({\n      inputRange: [0, 10],\n      outputRange: [0, 0.3],\n      extrapolate: 'clamp',\n    }) : undefined,\n  });\n\n  const theme = isDarkMode ? COLORS.dark : COLORS.light;\n\n  const cardStyle = [\n    styles.card,\n    {\n      backgroundColor: theme.card,\n      borderColor: selected ? COLORS.primary : theme.border,\n      borderWidth: selected ? 2 : 1,\n    },\n    style,\n  ];\n\n  if (!onPress && !onLongPress) {\n    return (\n      <Animated.View style={[cardStyle, getAnimatedStyle()]}>\n        {children}\n      </Animated.View>\n    );\n  }\n\n  return (\n    <Animated.View style={getAnimatedStyle()}>\n      <Pressable\n        style={({ pressed }) => [\n          cardStyle,\n          pressed && Platform.OS === 'ios' && styles.pressed,\n          disabled && styles.disabled,\n        ]}\n        onPress={onPress}\n        onLongPress={onLongPress}\n        onPressIn={handlePressIn}\n        onPressOut={handlePressOut}\n        disabled={disabled}\n        android_ripple={{\n          color: rippleColor || COLORS.primary + '20',\n          borderless: false,\n          radius: 200,\n        }}\n      >\n        {children}\n      </Pressable>\n    </Animated.View>\n  );\n};\n\nconst styles = StyleSheet.create({\n  card: {\n    borderRadius: BORDER_RADIUS.md,\n    padding: SPACING.md,\n    marginVertical: SPACING.sm,\n    ...Platform.select({\n      ios: {\n        shadowColor: '#000',\n        shadowOffset: { width: 0, height: 2 },\n        shadowRadius: 4,\n      },\n      android: {\n        elevation: 2,\n      },\n    }),\n  },\n  pressed: {\n    opacity: 0.8,\n  },\n  disabled: {\n    opacity: 0.6,\n  },\n});\n\nexport default AnimatedCard;"}]
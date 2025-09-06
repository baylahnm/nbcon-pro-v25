import React, { useRef, useEffect } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  Animated,
  Platform,
  Pressable,
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../constants';
import { ANIMATIONS } from '../constants/animations';
import { createButtonPressAnimation, createLoadingStateAnimation, NBCONEasing } from '../utils/animations';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  hapticFeedback?: boolean;
  animationType?: 'scale' | 'opacity' | 'subtle' | 'bounce';
  rippleColor?: string;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
  hapticFeedback = true,
  animationType = 'scale',
  rippleColor,
}) => {
  // Animation values
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;
  const elevationValue = useRef(new Animated.Value(2)).current;
  const loadingOpacity = useRef(new Animated.Value(1)).current;
  const loadingScale = useRef(new Animated.Value(1)).current;

  // Setup button press animations
  const { pressIn, pressOut } = createButtonPressAnimation(scaleValue);

  // Handle loading state animations
  useEffect(() => {
    const loadingAnimation = createLoadingStateAnimation(
      loadingOpacity,
      loadingScale,
      loading
    );
    loadingAnimation.start();
  }, [loading]);
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.baseText,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  // Handle press with haptic feedback
  const handlePressIn = () => {
    if (disabled || loading) return;
    
    // Trigger haptic feedback on iOS
    if (hapticFeedback && Platform.OS === 'ios') {
      // Note: You would import { HapticFeedback } from 'expo-haptics' for this
      // HapticFeedback.impactAsync(HapticFeedback.ImpactFeedbackStyle.Light);
    }

    // Animate based on type
    switch (animationType) {
      case 'scale':
        pressIn();
        break;
      case 'opacity':
        Animated.timing(opacityValue, {
          toValue: 0.7,
          duration: ANIMATIONS.DURATION.fast,
          easing: NBCONEasing.professional,
          useNativeDriver: true,
        }).start();
        break;
      case 'subtle':
        Animated.parallel([
          Animated.timing(scaleValue, {
            toValue: ANIMATIONS.SCALE.tap,
            duration: ANIMATIONS.DURATION.fast,
            easing: NBCONEasing.smooth,
            useNativeDriver: true,
          }),
          Animated.timing(elevationValue, {
            toValue: 1,
            duration: ANIMATIONS.DURATION.fast,
            easing: NBCONEasing.smooth,
            useNativeDriver: false,
          }),
        ]).start();
        break;
      case 'bounce':
        Animated.spring(scaleValue, {
          toValue: ANIMATIONS.SCALE.pressed,
          tension: 200,
          friction: 3,
          useNativeDriver: true,
        }).start();
        break;
    }
  };

  const handlePressOut = () => {
    if (disabled || loading) return;
    
    switch (animationType) {
      case 'scale':
        pressOut();
        break;
      case 'opacity':
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: ANIMATIONS.DURATION.normal,
          easing: NBCONEasing.elegant,
          useNativeDriver: true,
        }).start();
        break;
      case 'subtle':
        Animated.parallel([
          Animated.spring(scaleValue, {
            toValue: 1,
            tension: 150,
            friction: 6,
            useNativeDriver: true,
          }),
          Animated.timing(elevationValue, {
            toValue: 2,
            duration: ANIMATIONS.DURATION.normal,
            easing: NBCONEasing.elegant,
            useNativeDriver: false,
          }),
        ]).start();
        break;
      case 'bounce':
        Animated.spring(scaleValue, {
          toValue: 1,
          tension: 120,
          friction: 8,
          useNativeDriver: true,
        }).start();
        break;
    }
  };

  // Get animation transforms
  const getAnimatedStyle = () => {
    const baseTransform = {
      transform: [{ scale: scaleValue }],
      opacity: opacityValue,
    };

    if (loading) {
      return {
        ...baseTransform,
        opacity: Animated.multiply(opacityValue, loadingOpacity),
        transform: [
          { scale: Animated.multiply(scaleValue, loadingScale) },
        ],
      };
    }

    return baseTransform;
  };

  // Use Pressable for better cross-platform support and ripple effects
  return (
    <Pressable
      style={({ pressed }) => [
        buttonStyle,
        pressed && Platform.OS === 'ios' && styles.pressed,
      ]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      android_ripple={{
        color: rippleColor || (variant === 'outline' ? COLORS.primary + '20' : COLORS.white + '30'),
        borderless: false,
        radius: size === 'large' ? 120 : size === 'medium' ? 100 : 80,
      }}
    >
      <Animated.View style={[styles.contentContainer, getAnimatedStyle()]}>
        {loading ? (
          <>
            <ActivityIndicator
              color={variant === 'primary' || variant === 'secondary' ? COLORS.white : COLORS.primary}
              size="small"
              style={styles.loadingIndicator}
            />
            <Animated.Text 
              style={[textStyles, styles.loadingText, { opacity: loadingOpacity }]}
            >
              {title}
            </Animated.Text>
          </>
        ) : (
          <>
            {icon && <Animated.View style={styles.iconContainer}>{icon}</Animated.View>}
            <Animated.Text style={textStyles}>{title}</Animated.Text>
          </>
        )}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  pressed: {
    opacity: 0.8,
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  text: {
    backgroundColor: 'transparent',
  },
  small: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  medium: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  large: {
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
  },
  disabled: {
    opacity: 0.6,
    elevation: 0,
    shadowOpacity: 0,
  },
  loadingIndicator: {
    marginRight: SPACING.sm,
  },
  loadingText: {
    marginLeft: SPACING.sm,
  },
  iconContainer: {
    marginRight: SPACING.sm,
  },
  baseText: {
    fontFamily: 'System',
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.sizes.body1,
  },
  secondaryText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.sizes.body1,
  },
  outlineText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.sizes.body1,
  },
  textText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.sizes.body1,
  },
  smallText: {
    fontSize: TYPOGRAPHY.sizes.body2,
  },
  mediumText: {
    fontSize: TYPOGRAPHY.sizes.body1,
  },
  largeText: {
    fontSize: TYPOGRAPHY.sizes.h6,
  },
  disabledText: {
    opacity: 0.6,
  },
});

export default CustomButton;
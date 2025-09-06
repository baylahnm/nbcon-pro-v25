// FloatingActionButton.tsx - Animated FAB component for NBCON Pro
// Smooth floating action button with professional animations

import React, { useRef, useEffect, ReactNode } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  ViewStyle,
  Pressable,
  Platform,
  Dimensions,
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants';
import { ANIMATIONS } from '../../constants/animations';
import { NBCONEasing } from '../../utils/animations';

const { width: screenWidth } = Dimensions.get('window');

interface FloatingActionButtonProps {
  onPress: () => void;
  icon: ReactNode;
  style?: ViewStyle;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  visible?: boolean;
  disabled?: boolean;
  rippleColor?: string;
  shadowColor?: string;
  animationType?: 'scale' | 'slide' | 'rotate' | 'bounce';
  isDarkMode?: boolean;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  icon,
  style,
  size = 'medium',
  color = COLORS.primary,
  position = 'bottom-right',
  visible = true,
  disabled = false,
  rippleColor,
  shadowColor,
  animationType = 'scale',
  isDarkMode = false,
}) => {
  // Animation values
  const scaleValue = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const rotateValue = useRef(new Animated.Value(0)).current;
  const slideValue = useRef(new Animated.Value(visible ? 0 : 100)).current;
  const pressScale = useRef(new Animated.Value(1)).current;
  const elevationValue = useRef(new Animated.Value(6)).current;

  const getSizeDimensions = () => {
    switch (size) {
      case 'small':
        return { width: 40, height: 40 };
      case 'large':
        return { width: 64, height: 64 };
      default:
        return { width: 56, height: 56 };
    }
  };

  const getPositionStyle = () => {
    const bottomOffset = Platform.OS === 'ios' ? 100 : 80;\n    \n    switch (position) {\n      case 'bottom-left':\n        return {\n          position: 'absolute',\n          bottom: bottomOffset,\n          left: SPACING.lg,\n        };\n      case 'bottom-center':\n        return {\n          position: 'absolute',\n          bottom: bottomOffset,\n          left: screenWidth / 2 - dimensions.width / 2,\n        };\n      default:\n        return {\n          position: 'absolute',\n          bottom: bottomOffset,\n          right: SPACING.lg,\n        };\n    }\n  };\n\n  const dimensions = getSizeDimensions();\n  const positionStyle = getPositionStyle();\n\n  // Handle visibility animations\n  useEffect(() => {\n    const animations: Animated.CompositeAnimation[] = [];\n\n    switch (animationType) {\n      case 'scale':\n        animations.push(\n          Animated.spring(scaleValue, {\n            toValue: visible ? 1 : 0,\n            tension: 120,\n            friction: 8,\n            useNativeDriver: true,\n          })\n        );\n        break;\n        \n      case 'slide':\n        animations.push(\n          Animated.timing(slideValue, {\n            toValue: visible ? 0 : 100,\n            duration: ANIMATIONS.DURATION.normal,\n            easing: NBCONEasing.elegant,\n            useNativeDriver: true,\n          })\n        );\n        break;\n        \n      case 'rotate':\n        animations.push(\n          Animated.parallel([\n            Animated.spring(scaleValue, {\n              toValue: visible ? 1 : 0,\n              tension: 120,\n              friction: 8,\n              useNativeDriver: true,\n            }),\n            Animated.timing(rotateValue, {\n              toValue: visible ? 0 : 1,\n              duration: ANIMATIONS.DURATION.normal,\n              easing: NBCONEasing.smooth,\n              useNativeDriver: true,\n            }),\n          ])\n        );\n        break;\n        \n      case 'bounce':\n        animations.push(\n          Animated.spring(scaleValue, {\n            toValue: visible ? 1 : 0,\n            tension: 200,\n            friction: 4,\n            useNativeDriver: true,\n          })\n        );\n        break;\n    }\n\n    if (animations.length > 0) {\n      Animated.parallel(animations).start();\n    }\n  }, [visible, animationType]);\n\n  // Press handlers\n  const handlePressIn = () => {\n    if (disabled) return;\n\n    Animated.parallel([\n      Animated.timing(pressScale, {\n        toValue: ANIMATIONS.SCALE.pressed,\n        duration: ANIMATIONS.DURATION.fast,\n        easing: NBCONEasing.sharp,\n        useNativeDriver: true,\n      }),\n      Animated.timing(elevationValue, {\n        toValue: 12,\n        duration: ANIMATIONS.DURATION.fast,\n        easing: NBCONEasing.sharp,\n        useNativeDriver: false,\n      }),\n    ]).start();\n  };\n\n  const handlePressOut = () => {\n    if (disabled) return;\n\n    Animated.parallel([\n      Animated.spring(pressScale, {\n        toValue: 1,\n        tension: 150,\n        friction: 6,\n        useNativeDriver: true,\n      }),\n      Animated.timing(elevationValue, {\n        toValue: 6,\n        duration: ANIMATIONS.DURATION.normal,\n        easing: NBCONEasing.elegant,\n        useNativeDriver: false,\n      }),\n    ]).start();\n  };\n\n  // Get animated transforms\n  const getAnimatedStyle = (): ViewStyle => {\n    const baseTransform = [];\n\n    switch (animationType) {\n      case 'slide':\n        baseTransform.push({ translateY: slideValue });\n        baseTransform.push({ scale: pressScale });\n        break;\n        \n      case 'rotate':\n        baseTransform.push({ scale: Animated.multiply(scaleValue, pressScale) });\n        baseTransform.push({\n          rotate: rotateValue.interpolate({\n            inputRange: [0, 1],\n            outputRange: ['0deg', '180deg'],\n          }),\n        });\n        break;\n        \n      default:\n        baseTransform.push({ scale: Animated.multiply(scaleValue, pressScale) });\n    }\n\n    return {\n      transform: baseTransform,\n      elevation: Platform.OS === 'android' ? elevationValue : undefined,\n      shadowOpacity: Platform.OS === 'ios' ? elevationValue.interpolate({\n        inputRange: [0, 12],\n        outputRange: [0, 0.4],\n        extrapolate: 'clamp',\n      }) : undefined,\n    };\n  };\n\n  if (!visible && animationType !== 'slide') {\n    return null;\n  }\n\n  return (\n    <Animated.View\n      style={[\n        positionStyle,\n        getAnimatedStyle(),\n        style,\n      ]}\n    >\n      <Pressable\n        style={[\n          styles.fab,\n          {\n            width: dimensions.width,\n            height: dimensions.height,\n            borderRadius: dimensions.width / 2,\n            backgroundColor: color,\n          },\n          disabled && styles.disabled,\n        ]}\n        onPress={onPress}\n        onPressIn={handlePressIn}\n        onPressOut={handlePressOut}\n        disabled={disabled}\n        android_ripple={{\n          color: rippleColor || COLORS.white + '30',\n          borderless: true,\n          radius: dimensions.width / 2,\n        }}\n      >\n        <Animated.View\n          style={[\n            styles.iconContainer,\n            {\n              opacity: scaleValue,\n            },\n          ]}\n        >\n          {icon}\n        </Animated.View>\n      </Pressable>\n    </Animated.View>\n  );\n};\n\nconst styles = StyleSheet.create({\n  fab: {\n    alignItems: 'center',\n    justifyContent: 'center',\n    ...Platform.select({\n      ios: {\n        shadowColor: '#000',\n        shadowOffset: { width: 0, height: 3 },\n        shadowRadius: 6,\n      },\n      android: {\n        elevation: 6,\n      },\n    }),\n  },\n  iconContainer: {\n    alignItems: 'center',\n    justifyContent: 'center',\n  },\n  disabled: {\n    opacity: 0.6,\n  },\n});\n\nexport default FloatingActionButton;"}
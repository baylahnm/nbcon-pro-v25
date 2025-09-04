import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';

interface CustomButtonProps extends TouchableOpacityProps {
  title: { en: string; ar: string } | string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  customStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  customStyle,
  textStyle,
  disabled,
  ...props
}) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (text: { en: string; ar: string } | string) => {
    if (typeof text === 'string') return text;
    return isArabic ? text.ar : text.en;
  };

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: BORDER_RADIUS.md,
      borderWidth: 1,
    };

    // Size styles
    switch (size) {
      case 'small':
        baseStyle.paddingHorizontal = SPACING.md;
        baseStyle.paddingVertical = SPACING.sm;
        baseStyle.minHeight = 36;
        break;
      case 'large':
        baseStyle.paddingHorizontal = SPACING.xl;
        baseStyle.paddingVertical = SPACING.lg;
        baseStyle.minHeight = 56;
        break;
      default: // medium
        baseStyle.paddingHorizontal = SPACING.lg;
        baseStyle.paddingVertical = SPACING.md;
        baseStyle.minHeight = 48;
    }

    // Variant styles
    switch (variant) {
      case 'secondary':
        baseStyle.backgroundColor = COLORS.secondary;
        baseStyle.borderColor = COLORS.secondary;
        break;
      case 'outline':
        baseStyle.backgroundColor = 'transparent';
        baseStyle.borderColor = COLORS.primary;
        break;
      case 'ghost':
        baseStyle.backgroundColor = 'transparent';
        baseStyle.borderColor = 'transparent';
        break;
      default: // primary
        baseStyle.backgroundColor = COLORS.primary;
        baseStyle.borderColor = COLORS.primary;
    }

    // Disabled state
    if (disabled || loading) {
      baseStyle.opacity = 0.6;
    }

    // Full width
    if (fullWidth) {
      baseStyle.width = '100%';
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontWeight: TYPOGRAPHY.weights.medium,
      textAlign: 'center',
    };

    // Size styles
    switch (size) {
      case 'small':
        baseTextStyle.fontSize = TYPOGRAPHY.sizes.body2;
        break;
      case 'large':
        baseTextStyle.fontSize = TYPOGRAPHY.sizes.subtitle1;
        baseTextStyle.fontWeight = TYPOGRAPHY.weights.bold;
        break;
      default: // medium
        baseTextStyle.fontSize = TYPOGRAPHY.sizes.body1;
    }

    // Variant styles
    switch (variant) {
      case 'outline':
        baseTextStyle.color = COLORS.primary;
        break;
      case 'ghost':
        baseTextStyle.color = COLORS.primary;
        break;
      default: // primary, secondary
        baseTextStyle.color = COLORS.white;
    }

    return baseTextStyle;
  };

  const iconSize = size === 'small' ? 16 : size === 'large' ? 24 : 20;
  const iconColor = variant === 'outline' || variant === 'ghost' ? COLORS.primary : COLORS.white;

  return (
    <TouchableOpacity
      style={[getButtonStyle(), customStyle]}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size={iconSize}
          color={iconColor}
          style={{ marginRight: SPACING.xs }}
        />
      ) : (
        icon &&
        iconPosition === 'left' && (
          <Ionicons
            name={icon}
            size={iconSize}
            color={iconColor}
            style={{ 
              marginRight: SPACING.xs,
              marginLeft: isArabic ? SPACING.xs : 0,
            }}
          />
        )
      )}
      
      <Text style={[getTextStyle(), textStyle]}>
        {getText(title)}
      </Text>
      
      {!loading && icon && iconPosition === 'right' && (
        <Ionicons
          name={icon}
          size={iconSize}
          color={iconColor}
          style={{ 
            marginLeft: SPACING.xs,
            marginRight: isArabic ? SPACING.xs : 0,
          }}
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
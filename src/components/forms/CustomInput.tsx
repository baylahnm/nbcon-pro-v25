import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Language } from '../../types';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';

interface CustomInputProps extends TextInputProps {
  label?: { en: string; ar: string };
  error?: string;
  required?: boolean;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  isPassword?: boolean;
  helpText?: { en: string; ar: string };
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  required,
  leftIcon,
  rightIcon,
  onRightIconPress,
  isPassword = false,
  helpText,
  style,
  ...props
}) => {
  const { language, isDarkMode } = useSelector((state: RootState) => state.app);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isArabic = language === Language.ARABIC;
  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  const getText = (textObj?: { en: string; ar: string }) => {
    if (!textObj) return '';
    return isArabic ? textObj.ar : textObj.en;
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      {/* Label */}
      {label && (
        <View style={styles.labelContainer}>
          <Text style={[styles.label, { color: theme.text }]}>
            {getText(label)}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        </View>
      )}

      {/* Input Container */}
      <View
        style={[
          styles.inputContainer,
          { 
            backgroundColor: theme.surface,
            borderColor: error 
              ? COLORS.error 
              : isFocused 
                ? COLORS.primary 
                : theme.border,
          },
          style,
        ]}
      >
        {/* Left Icon */}
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color={isFocused ? COLORS.primary : theme.textSecondary}
            style={styles.leftIcon}
          />
        )}

        {/* Text Input */}
        <TextInput
          {...props}
          style={[
            styles.textInput,
            { 
              color: theme.text,
              textAlign: isArabic ? 'right' : 'left',
            },
          ]}
          placeholderTextColor={theme.textSecondary}
          secureTextEntry={isPassword && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {/* Right Icon or Password Toggle */}
        {isPassword ? (
          <TouchableOpacity onPress={handlePasswordToggle} style={styles.rightIcon}>
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color={theme.textSecondary}
            />
          </TouchableOpacity>
        ) : rightIcon ? (
          <TouchableOpacity onPress={onRightIconPress} style={styles.rightIcon}>
            <Ionicons name={rightIcon} size={20} color={theme.textSecondary} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Error Message */}
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      {/* Help Text */}
      {helpText && !error && (
        <Text style={[styles.helpText, { color: theme.textSecondary }]}>
          {getText(helpText)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  labelContainer: {
    marginBottom: SPACING.xs,
  },
  label: {
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  required: {
    color: COLORS.error,
    fontSize: TYPOGRAPHY.sizes.body1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    minHeight: 48,
  },
  leftIcon: {
    marginRight: SPACING.sm,
  },
  textInput: {
    flex: 1,
    fontSize: TYPOGRAPHY.sizes.body1,
    fontWeight: TYPOGRAPHY.weights.regular,
    paddingVertical: SPACING.sm,
  },
  rightIcon: {
    marginLeft: SPACING.sm,
    padding: SPACING.xs,
  },
  errorText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    color: COLORS.error,
    marginTop: SPACING.xs,
    marginLeft: SPACING.xs,
  },
  helpText: {
    fontSize: TYPOGRAPHY.sizes.caption,
    marginTop: SPACING.xs,
    marginLeft: SPACING.xs,
    lineHeight: 16,
  },
});

export default CustomInput;
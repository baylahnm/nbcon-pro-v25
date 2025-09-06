// ProgressIndicator.tsx - Animated progress indicators for NBCON Pro
// Professional progress animations for various states

import React, { useRef, useEffect } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  ViewStyle,
  Text,
  Dimensions,
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../../constants';
import { ANIMATIONS } from '../../constants/animations';
import { NBCONEasing } from '../../utils/animations';

const { width: screenWidth } = Dimensions.get('window');

interface ProgressIndicatorProps {
  progress: number; // 0 to 100
  style?: ViewStyle;
  color?: string;
  backgroundColor?: string;
  height?: number;
  showPercentage?: boolean;
  animated?: boolean;
  type?: 'linear' | 'circular' | 'step';
  steps?: number;
  currentStep?: number;
  isDarkMode?: boolean;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  progress,
  style,
  color = COLORS.primary,
  backgroundColor,
  height = 8,
  showPercentage = false,
  animated = true,
  type = 'linear',
  steps = 4,
  currentStep = 0,
  isDarkMode = false,
}) => {
  const progressValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  
  const theme = isDarkMode ? COLORS.dark : COLORS.light;
  const bgColor = backgroundColor || theme.border;

  useEffect(() => {
    if (animated) {
      Animated.timing(progressValue, {
        toValue: progress,
        duration: ANIMATIONS.DURATION.slow,
        easing: NBCONEasing.elegant,
        useNativeDriver: false,
      }).start();

      // Add a subtle bounce when progress completes
      if (progress === 100) {
        Animated.sequence([
          Animated.timing(scaleValue, {
            toValue: 1.05,
            duration: ANIMATIONS.DURATION.fast,
            easing: NBCONEasing.bounce,
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 1,
            duration: ANIMATIONS.DURATION.normal,
            easing: NBCONEasing.smooth,
            useNativeDriver: true,
          }),
        ]).start();
      }
    } else {
      progressValue.setValue(progress);
    }
  }, [progress, animated]);

  const renderLinearProgress = () => {
    const progressWidth = progressValue.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%'],
      extrapolate: 'clamp',
    });

    return (
      <View style={[styles.container, style]}>
        <View style={[styles.progressTrack, { backgroundColor: bgColor, height }]}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                backgroundColor: color,
                width: progressWidth,
                height,
                transform: [{ scaleY: scaleValue }],
              },
            ]}
          />
        </View>
        {showPercentage && (
          <Animated.Text
            style={[
              styles.percentageText,
              { color: theme.text },
              { opacity: progressValue.interpolate({
                inputRange: [0, 10],
                outputRange: [0, 1],
                extrapolate: 'clamp',
              })},
            ]}
          >
            {Math.round(progress)}%
          </Animated.Text>
        )}
      </View>
    );
  };

  const renderCircularProgress = () => {
    const size = 80;
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    
    const strokeDashoffset = progressValue.interpolate({
      inputRange: [0, 100],
      outputRange: [circumference, 0],
      extrapolate: 'clamp',
    });

    // Note: For SVG circular progress, you would typically use react-native-svg
    // This is a simplified version using View components
    return (
      <View style={[styles.circularContainer, style]}>
        <View
          style={[
            styles.circularTrack,
            {
              width: size,
              height: size,
              borderWidth: strokeWidth,
              borderColor: bgColor,
              borderRadius: size / 2,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.circularProgress,
              {
                width: size - strokeWidth * 2,
                height: size - strokeWidth * 2,
                borderRadius: (size - strokeWidth * 2) / 2,
                borderWidth: strokeWidth,
                borderColor: color,
                transform: [
                  { scale: scaleValue },
                  {
                    rotate: progressValue.interpolate({
                      inputRange: [0, 100],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
        {showPercentage && (
          <Text style={[styles.circularPercentage, { color: theme.text }]}>
            {Math.round(progress)}%
          </Text>
        )}
      </View>
    );
  };

  const renderStepProgress = () => {
    return (
      <View style={[styles.stepContainer, style]}>
        {Array.from({ length: steps }, (_, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          
          return (
            <React.Fragment key={index}>
              <Animated.View
                style={[
                  styles.stepCircle,
                  {
                    backgroundColor: isCompleted || isActive ? color : bgColor,
                    transform: [
                      {
                        scale: isActive ? scaleValue : 1,
                      },
                    ],
                  },
                ]}
              >
                {isCompleted && (
                  <Text style={styles.stepCheckmark}>✓</Text>
                )}
                {isActive && !isCompleted && (
                  <View style={[styles.activeStepIndicator, { backgroundColor: COLORS.white }]} />
                )}
              </Animated.View>
              {index < steps - 1 && (
                <Animated.View
                  style={[
                    styles.stepConnector,
                    {
                      backgroundColor: index < currentStep - 1 ? color : bgColor,
                      transform: [
                        {
                          scaleX: progressValue.interpolate({
                            inputRange: [0, 100],
                            outputRange: [0, 1],
                            extrapolate: 'clamp',
                          }),
                        },
                      ],
                    },
                  ]}
                />
              )}
            </React.Fragment>
          );
        })}
      </View>
    );
  };

  const renderProgress = () => {
    switch (type) {
      case 'circular':
        return renderCircularProgress();
      case 'step':
        return renderStepProgress();
      default:
        return renderLinearProgress();
    }
  };

  return renderProgress();
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.sm,
  },
  progressTrack: {
    flex: 1,
    borderRadius: BORDER_RADIUS.xs,
    overflow: 'hidden',
  },
  progressFill: {
    borderRadius: BORDER_RADIUS.xs,
    minWidth: 2, // Ensure visibility even at 0%
  },
  percentageText: {
    fontSize: TYPOGRAPHY.sizes.body2,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginLeft: SPACING.sm,
    minWidth: 40,
    textAlign: 'right',
  },
  circularContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  circularTrack: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularProgress: {
    position: 'absolute',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  circularPercentage: {
    position: 'absolute',
    fontSize: TYPOGRAPHY.sizes.subtitle1,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  stepCheckmark: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeStepIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  stepConnector: {
    height: 3,
    flex: 1,
    marginHorizontal: SPACING.xs,
    borderRadius: BORDER_RADIUS.xs,
  },
});

export default ProgressIndicator;
// LoadingSpinner.tsx - Professional loading spinner for NBCON Pro
// Smooth, brand-consistent loading animations

import React, { useRef, useEffect } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  ViewStyle,
  Easing,
} from 'react-native';
import { COLORS, SPACING } from '../../constants';
import { ANIMATIONS } from '../../constants/animations';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  style?: ViewStyle;
  type?: 'circular' | 'dots' | 'bars' | 'pulse';
  speed?: 'slow' | 'normal' | 'fast';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = COLORS.primary,
  style,
  type = 'circular',
  speed = 'normal',
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const pulseValue = useRef(new Animated.Value(1)).current;
  const dotValues = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  const getSizeDimensions = () => {
    switch (size) {
      case 'small':
        return { width: 20, height: 20, borderWidth: 2 };
      case 'large':
        return { width: 60, height: 60, borderWidth: 4 };
      default:
        return { width: 40, height: 40, borderWidth: 3 };
    }
  };

  const getAnimationDuration = () => {
    switch (speed) {
      case 'slow':
        return ANIMATIONS.DURATION.slowest;
      case 'fast':
        return ANIMATIONS.DURATION.slower;
      default:
        return ANIMATIONS.DURATION.slower;
    }
  };

  const dimensions = getSizeDimensions();
  const duration = getAnimationDuration();

  useEffect(() => {
    let animation: Animated.CompositeAnimation;

    switch (type) {
      case 'circular':
        animation = Animated.loop(
          Animated.timing(spinValue, {
            toValue: 1,
            duration,
            easing: Easing.linear,
            useNativeDriver: true,
          })
        );
        break;

      case 'pulse':
        animation = Animated.loop(
          Animated.sequence([
            Animated.timing(pulseValue, {
              toValue: 1.3,
              duration: duration / 2,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(pulseValue, {
              toValue: 1,
              duration: duration / 2,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ])
        );
        break;

      case 'dots':
        const dotAnimations = dotValues.map((dotValue, index) =>
          Animated.loop(
            Animated.sequence([
              Animated.delay(index * 200),
              Animated.timing(dotValue, {
                toValue: 1,
                duration: 600,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
              }),
              Animated.timing(dotValue, {
                toValue: 0.3,
                duration: 600,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
              }),
            ])
          )
        );
        animation = Animated.parallel(dotAnimations);
        break;

      case 'bars':
        const barAnimations = dotValues.map((barValue, index) =>
          Animated.loop(
            Animated.sequence([
              Animated.delay(index * 150),
              Animated.timing(barValue, {
                toValue: 1,
                duration: 500,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
              }),
              Animated.timing(barValue, {
                toValue: 0.2,
                duration: 500,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
              }),
            ])
          )
        );
        animation = Animated.parallel(barAnimations);
        break;

      default:
        animation = Animated.loop(
          Animated.timing(spinValue, {
            toValue: 1,
            duration,
            easing: Easing.linear,
            useNativeDriver: true,
          })
        );
    }

    animation.start();

    return () => {
      animation.stop();
    };
  }, [type, duration]);

  const renderCircularSpinner = () => {
    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <Animated.View
        style={[
          styles.circularSpinner,
          {
            width: dimensions.width,
            height: dimensions.height,
            borderWidth: dimensions.borderWidth,
            borderColor: color + '30',
            borderTopColor: color,
            transform: [{ rotate: spin }],
          },
        ]}
      />
    );
  };

  const renderPulseSpinner = () => {
    return (
      <Animated.View
        style={[
          styles.pulseSpinner,
          {
            width: dimensions.width,
            height: dimensions.height,
            backgroundColor: color,
            transform: [{ scale: pulseValue }],
          },
        ]}
      />
    );
  };

  const renderDotsSpinner = () => {
    const dotSize = dimensions.width / 4;
    
    return (
      <View style={styles.dotsContainer}>
        {dotValues.map((dotValue, index) => (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                width: dotSize,
                height: dotSize,
                backgroundColor: color,
                opacity: dotValue,
                transform: [
                  {
                    scale: dotValue.interpolate({
                      inputRange: [0.3, 1],
                      outputRange: [0.8, 1.2],
                    }),
                  },
                ],
              },
            ]}
          />
        ))}\n      </View>\n    );\n  };\n\n  const renderBarsSpinner = () => {\n    const barWidth = dimensions.width / 6;\n    const barMaxHeight = dimensions.height;\n\n    return (\n      <View style={styles.barsContainer}>\n        {dotValues.map((barValue, index) => (\n          <Animated.View\n            key={index}\n            style={[\n              styles.bar,\n              {\n                width: barWidth,\n                backgroundColor: color,\n                height: barValue.interpolate({\n                  inputRange: [0.2, 1],\n                  outputRange: [barMaxHeight * 0.3, barMaxHeight],\n                }),\n              },\n            ]}\n          />\n        ))}\n      </View>\n    );\n  };\n\n  const renderSpinner = () => {\n    switch (type) {\n      case 'pulse':\n        return renderPulseSpinner();\n      case 'dots':\n        return renderDotsSpinner();\n      case 'bars':\n        return renderBarsSpinner();\n      default:\n        return renderCircularSpinner();\n    }\n  };\n\n  return (\n    <View style={[styles.container, style]}>\n      {renderSpinner()}\n    </View>\n  );\n};\n\nconst styles = StyleSheet.create({\n  container: {\n    alignItems: 'center',\n    justifyContent: 'center',\n  },\n  circularSpinner: {\n    borderRadius: 100,\n  },\n  pulseSpinner: {\n    borderRadius: 100,\n  },\n  dotsContainer: {\n    flexDirection: 'row',\n    alignItems: 'center',\n    justifyContent: 'space-between',\n    width: 60,\n  },\n  dot: {\n    borderRadius: 100,\n  },\n  barsContainer: {\n    flexDirection: 'row',\n    alignItems: 'flex-end',\n    justifyContent: 'space-between',\n    width: 40,\n    height: 40,\n  },\n  bar: {\n    borderRadius: 2,\n  },\n});\n\nexport default LoadingSpinner;"}
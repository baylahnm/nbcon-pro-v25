import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants';

interface Props {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
  children?: React.ReactNode;
}

const LoadingSkeleton: React.FC<Props> = ({
  width = '100%',
  height = 20,
  borderRadius = BORDER_RADIUS.sm,
  style,
  children,
}) => {
  const { isDarkMode } = useSelector((state: RootState) => state.app);
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  const theme = isDarkMode ? COLORS.dark : COLORS.light;

  useEffect(() => {
    const shimmer = () => {
      Animated.sequence([
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(shimmerAnimation, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
        }),
      ]).start(() => shimmer());
    };
    shimmer();
  }, [shimmerAnimation]);

  const translateX = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 100],
  });

  const shimmerColors = isDarkMode
    ? ['#2d2d2d', '#3d3d3d', '#2d2d2d']
    : ['#f0f0f0', '#e0e0e0', '#f0f0f0'];

  if (children) {
    return (
      <View style={[style, { overflow: 'hidden' }]}>
        <View style={styles.childrenContainer}>
          {children}
        </View>
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            {
              transform: [{ translateX }],
            },
          ]}
        >
          <LinearGradient
            colors={shimmerColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFillObject}
          />
        </Animated.View>
      </View>
    );
  }

  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: theme.border,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            transform: [{ translateX }],
          },
        ]}
      >
        <LinearGradient
          colors={shimmerColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFillObject}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  childrenContainer: {
    opacity: 0,
  },
});

export default LoadingSkeleton;
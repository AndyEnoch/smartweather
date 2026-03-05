/**
 * ScreenTransition — Animated wrapper for tab screen content.
 *
 * Triggers a fade-in + upward slide every time the tab gains focus,
 * giving a smooth, polished feel on tab switches.
 */

import React, { useCallback } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useFocusEffect } from 'expo-router';

interface ScreenTransitionProps {
  children: React.ReactNode;
  duration?: number;
}

export function ScreenTransition({ children, duration = 300 }: ScreenTransitionProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(18);

  useFocusEffect(
    useCallback(() => {
      // Reset to initial values instantly
      opacity.value = 0;
      translateY.value = 18;

      // Animate in
      const timingConfig = {
        duration,
        easing: Easing.out(Easing.cubic),
      };
      opacity.value = withTiming(1, timingConfig);
      translateY.value = withTiming(0, timingConfig);
    }, [duration, opacity, translateY])
  );

  const animatedStyle = useAnimatedStyle(() => ({
    flex: 1,
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}

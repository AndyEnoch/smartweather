import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, BorderRadius } from '../../constants/theme';

interface TempRangeBarProps {
  min: number;
  max: number;
  globalMin: number;
  globalMax: number;
}

/**
 * Renders a temperature range bar spanning a global min–max scale.
 * The bar position & width are relative to the global temperature range
 * across all displayed days.
 */
export function TempRangeBar({ min, max, globalMin, globalMax }: TempRangeBarProps) {
  const range = globalMax - globalMin || 1;
  const leftPercent = ((min - globalMin) / range) * 100;
  const widthPercent = ((max - min) / range) * 100;

  return (
    <View style={styles.track}>
      <View style={[styles.barWrapper, { left: `${leftPercent}%`, width: `${Math.max(widthPercent, 5)}%` }]}>
        <LinearGradient
          colors={[Colors.tempBarCool, Colors.tempBarWarm, Colors.tempBarHot]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.bar}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 3,
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  barWrapper: {
    position: 'absolute',
    height: '100%',
  },
  bar: {
    flex: 1,
    borderRadius: 3,
  },
});

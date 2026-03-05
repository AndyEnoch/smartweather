import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, Spacing } from '../../constants/theme';
import { useRefreshTimer } from '../../hooks/useRefreshTimer';

interface RefreshTimerProps {
  fetchedAt: number | undefined;
  onRefresh: () => void;
  isRefetching: boolean;
}

const SIZE = 36;
const STROKE_WIDTH = 2.5;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function RefreshTimer({ fetchedAt, onRefresh, isRefetching }: RefreshTimerProps) {
  const { remaining, progress } = useRefreshTimer(fetchedAt);
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const timeDisplay = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return (
    <View style={styles.container}>
      <View style={styles.timerCircle}>
        <Svg width={SIZE} height={SIZE} style={styles.svg}>
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={STROKE_WIDTH}
            fill="transparent"
          />
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke={Colors.primary}
            strokeWidth={STROKE_WIDTH}
            fill="transparent"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
          />
        </Svg>
        <Text style={styles.timerText}>{timeDisplay}</Text>
      </View>

      <TouchableOpacity onPress={onRefresh} disabled={isRefetching} style={styles.refreshButton}>
        <Ionicons
          name="refresh"
          size={16}
          color={isRefetching ? Colors.foregroundMuted : Colors.foreground}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  timerCircle: {
    width: SIZE,
    height: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    position: 'absolute',
  },
  timerText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.foreground,
  },
  refreshButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

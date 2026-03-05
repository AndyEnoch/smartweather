import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSize, FontWeight, Spacing } from '../../constants/theme';
import { getUVLabel, getUVColor } from '../../utils/weather';

interface UVIndexScaleProps {
  uvIndex: number;
}

const UV_COLORS = ['#22c55e', '#22c55e', '#22c55e', '#eab308', '#eab308', '#eab308', '#f97316', '#f97316', '#ef4444', '#ef4444', '#ef4444', '#9333ea'];

export function UVIndexScale({ uvIndex }: UVIndexScaleProps) {
  const label = getUVLabel(uvIndex);
  const color = getUVColor(uvIndex);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>UV Index</Text>
        <View style={styles.valueRow}>
          <Text style={styles.value}>{Math.round(uvIndex)}</Text>
          <Text style={[styles.status, { color }]}>{label}</Text>
        </View>
      </View>

      {/* Color-coded scale */}
      <View style={styles.scaleRow}>
        {UV_COLORS.map((c, i) => (
          <View
            key={i}
            style={[
              styles.scaleDot,
              { backgroundColor: i <= Math.round(uvIndex) ? c : 'rgba(255,255,255,0.1)' },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: Spacing.sm,
  },
  label: {
    fontSize: FontSize.xs,
    color: Colors.foregroundMuted,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  value: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.foreground,
  },
  status: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
  },
  scaleRow: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  scaleDot: {
    flex: 1,
    height: 6,
    borderRadius: 3,
  },
});

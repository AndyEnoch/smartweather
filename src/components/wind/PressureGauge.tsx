import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, BorderRadius, FontSize, FontWeight, Spacing } from '../../constants/theme';
import { getPressureLabel } from '../../utils/weather';

interface PressureGaugeProps {
  pressure: number;
}

// Pressure range: 950 - 1050 hPa (typical range)
const MIN_PRESSURE = 950;
const MAX_PRESSURE = 1050;
const STANDARD_PRESSURE = 1013.25;

export function PressureGauge({ pressure }: PressureGaugeProps) {
  const normalizedPressure = Math.max(0, Math.min(1, (pressure - MIN_PRESSURE) / (MAX_PRESSURE - MIN_PRESSURE)));
  const standardPosition = (STANDARD_PRESSURE - MIN_PRESSURE) / (MAX_PRESSURE - MIN_PRESSURE);
  const label = getPressureLabel(pressure);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Pressure</Text>
        <Text style={styles.value}>{Math.round(pressure)} hPa</Text>
      </View>

      {/* Linear gauge */}
      <View style={styles.gaugeTrack}>
        {/* Gradient bar */}
        <View style={[styles.gaugeFill, { width: `${normalizedPressure * 100}%` }]} />

        {/* Standard atmosphere marker */}
        <View style={[styles.stdMarker, { left: `${standardPosition * 100}%` }]}>
          <View style={styles.stdLine} />
        </View>
      </View>

      <View style={styles.rangeRow}>
        <Text style={styles.rangeLabel}>Low</Text>
        <Text style={styles.statusLabel}>{label}</Text>
        <Text style={styles.rangeLabel}>High</Text>
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
  value: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.foreground,
  },
  gaugeTrack: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 4,
    overflow: 'visible',
    position: 'relative',
  },
  gaugeFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: Colors.chartRed,
  },
  stdMarker: {
    position: 'absolute',
    top: -4,
    width: 2,
    alignItems: 'center',
  },
  stdLine: {
    width: 2,
    height: 16,
    backgroundColor: Colors.foregroundMuted,
    borderRadius: 1,
  },
  rangeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  rangeLabel: {
    fontSize: FontSize.xs,
    color: Colors.foregroundMuted,
  },
  statusLabel: {
    fontSize: FontSize.xs,
    color: Colors.foregroundSecondary,
    fontWeight: FontWeight.medium,
  },
});

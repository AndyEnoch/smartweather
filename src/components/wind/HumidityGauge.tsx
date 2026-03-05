import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import { Colors, FontSize, FontWeight, Spacing } from '../../constants/theme';
import { getHumidityLabel } from '../../utils/weather';

interface HumidityGaugeProps {
  humidity: number;
}

const SIZE = 140;
const STROKE_WIDTH = 10;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function HumidityGauge({ humidity }: HumidityGaugeProps) {
  // Arc covers 270° (3/4 of circle), starting from bottom-left
  const arcLength = CIRCUMFERENCE * 0.75;
  const filledLength = arcLength * (humidity / 100);
  const gapLength = CIRCUMFERENCE - arcLength;

  const label = getHumidityLabel(humidity);
  const color = humidity > 70 ? Colors.chartBlue : humidity > 40 ? Colors.chartGreen : Colors.chartOrange;

  return (
    <View style={styles.container}>
      <View style={styles.gaugeWrapper}>
        <Svg width={SIZE} height={SIZE}>
          {/* Background arc */}
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={STROKE_WIDTH}
            fill="none"
            strokeDasharray={`${arcLength} ${gapLength}`}
            transform={`rotate(135 ${SIZE / 2} ${SIZE / 2})`}
            strokeLinecap="round"
          />
          {/* Filled arc */}
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke={color}
            strokeWidth={STROKE_WIDTH}
            fill="none"
            strokeDasharray={`${filledLength} ${CIRCUMFERENCE - filledLength}`}
            transform={`rotate(135 ${SIZE / 2} ${SIZE / 2})`}
            strokeLinecap="round"
          />
        </Svg>
        <View style={styles.centerText}>
          <Text style={styles.value}>{Math.round(humidity)}</Text>
          <Text style={styles.unit}>%</Text>
        </View>
      </View>
      <Text style={styles.label}>Humidity</Text>
      <Text style={[styles.sublabel, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  gaugeWrapper: {
    width: SIZE,
    height: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    position: 'absolute',
    alignItems: 'center',
  },
  value: {
    fontSize: 36,
    fontWeight: FontWeight.bold,
    color: Colors.foreground,
  },
  unit: {
    fontSize: FontSize.sm,
    color: Colors.foregroundMuted,
    marginTop: -4,
  },
  label: {
    fontSize: FontSize.md,
    color: Colors.foreground,
    fontWeight: FontWeight.semibold,
    marginTop: Spacing.sm,
  },
  sublabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    marginTop: 2,
  },
});

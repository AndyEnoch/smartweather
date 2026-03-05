import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, BorderRadius, FontSize, FontWeight, Spacing } from '../../constants/theme';
import {
  getWindDirectionLabel,
  getHumidityLabel,
  getPressureLabel,
  getVisibilityLabel,
  getUVLabel,
} from '../../utils/weather';
import {
  formatSpeed,
  formatPercent,
  formatPressure,
  formatVisibility,
} from '../../utils/format';
import type { CurrentWeather } from '../../types/weather';

interface WeatherStatGridProps {
  data: CurrentWeather;
}

interface StatItemData {
  iconComponent: React.ReactNode;
  label: string;
  value: string;
  subtitle: string;
}

export function WeatherStatGrid({ data }: WeatherStatGridProps) {
  const stats: StatItemData[] = [
    {
      iconComponent: <Ionicons name="speedometer-outline" size={14} color={Colors.chartBlue} />,
      label: 'Wind Speed',
      value: formatSpeed(data.windSpeed),
      subtitle: `Gusts ${formatSpeed(data.windGusts)}`,
    },
    {
      iconComponent: <Ionicons name="compass-outline" size={14} color={Colors.chartGreen} />,
      label: 'Wind Direction',
      value: getWindDirectionLabel(data.windDirection),
      subtitle: `${Math.round(data.windDirection)}°`,
    },
    {
      iconComponent: <Ionicons name="water-outline" size={14} color={Colors.chartBlue} />,
      label: 'Humidity',
      value: formatPercent(data.humidity),
      subtitle: getHumidityLabel(data.humidity),
    },
    {
      iconComponent: <MaterialCommunityIcons name="gauge" size={14} color={Colors.chartRed} />,
      label: 'Pressure',
      value: formatPressure(data.pressure),
      subtitle: getPressureLabel(data.pressure),
    },
    {
      iconComponent: <Ionicons name="eye-outline" size={14} color={Colors.foregroundSecondary} />,
      label: 'Visibility',
      value: formatVisibility(data.visibility),
      subtitle: getVisibilityLabel(data.visibility),
    },
    {
      iconComponent: <Ionicons name="sunny-outline" size={14} color={Colors.chartOrange} />,
      label: 'UV Index',
      value: `${data.uvIndex}`,
      subtitle: getUVLabel(data.uvIndex),
    },
  ];

  return (
    <View style={styles.grid}>
      {stats.map((stat) => (
        <View key={stat.label} style={styles.item}>
          <View style={styles.iconLabelRow}>
            {stat.iconComponent}
            <Text style={styles.label}>{stat.label}</Text>
          </View>
          <Text style={styles.value}>{stat.value}</Text>
          <Text style={styles.subtitle}>{stat.subtitle}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  item: {
    width: '48%',
    flexGrow: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  iconLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: Spacing.xs,
  },
  label: {
    fontSize: FontSize.xs,
    color: Colors.foregroundMuted,
    fontWeight: FontWeight.medium,
  },
  value: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.foreground,
  },
  subtitle: {
    fontSize: FontSize.xs,
    color: Colors.foregroundMuted,
    marginTop: 2,
  },
});

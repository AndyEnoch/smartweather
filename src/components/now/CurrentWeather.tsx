import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, Spacing } from '../../constants/theme';
import { WeatherIcon } from '../common/WeatherIcon';
import { getWeatherLabel, getWeatherIcon } from '../../utils/weather';
import { formatTemperature } from '../../utils/format';
import type { CurrentWeather as CurrentWeatherType } from '../../types/weather';

interface CurrentWeatherProps {
  data: CurrentWeatherType;
  locationName: string;
}

export function CurrentWeather({ data, locationName }: CurrentWeatherProps) {
  return (
    <View style={styles.container}>
      <View style={styles.locationPill}>
        <Ionicons name="location" size={14} color={Colors.primary} />
        <Text style={styles.locationText}>{locationName}</Text>
      </View>

      <Text style={styles.temperature}>{formatTemperature(data.temperature, 1)}</Text>

      <View style={styles.conditionRow}>
        <WeatherIcon icon={getWeatherIcon(data.weatherCode)} size={24} />
        <Text style={styles.conditionText}>{getWeatherLabel(data.weatherCode)}</Text>
      </View>

      <Text style={styles.feelsLike}>
        Feels like {formatTemperature(data.feelsLike, 1)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    gap: 6,
    marginBottom: Spacing.lg,
  },
  locationText: {
    fontSize: FontSize.sm,
    color: Colors.foreground,
    fontWeight: FontWeight.medium,
  },
  temperature: {
    fontSize: 72,
    fontWeight: FontWeight.bold,
    color: Colors.foreground,
    lineHeight: 80,
  },
  conditionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: Spacing.sm,
  },
  conditionText: {
    fontSize: FontSize.lg,
    color: Colors.foregroundSecondary,
    fontWeight: FontWeight.medium,
  },
  feelsLike: {
    fontSize: FontSize.md,
    color: Colors.foregroundMuted,
    marginTop: Spacing.xs,
  },
});

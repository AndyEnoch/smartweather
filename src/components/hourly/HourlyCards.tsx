import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, FontSize, FontWeight, Spacing } from '../../constants/theme';
import { WeatherIcon } from '../common/WeatherIcon';
import { getWeatherIcon } from '../../utils/weather';
import { formatTemperature, formatHour } from '../../utils/format';
import type { HourlyForecast } from '../../types/weather';

interface HourlyCardsProps {
  hours: HourlyForecast[];
}

export function HourlyCards({ hours }: HourlyCardsProps) {
  const next13 = hours.slice(0, 13);

  return (
    <FlatList
      data={next13}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.time}
      contentContainerStyle={styles.list}
      renderItem={({ item, index }) => (
        <View style={styles.card}>
          <Text style={styles.hour}>{index === 0 ? 'Now' : formatHour(item.time)}</Text>
          <WeatherIcon icon={getWeatherIcon(item.weatherCode)} size={24} />
          <Text style={styles.temp}>{formatTemperature(item.temperature)}</Text>
          <View style={styles.windRow}>
            <Ionicons name="speedometer-outline" size={10} color={Colors.foregroundMuted} />
            <Text style={styles.wind}>{Math.round(item.windSpeed)}</Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'center',
    minWidth: 76,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    gap: 6,
  },
  hour: {
    fontSize: FontSize.sm,
    color: Colors.foregroundSecondary,
    fontWeight: FontWeight.medium,
  },
  temp: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.foreground,
  },
  windRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  wind: {
    fontSize: FontSize.xs,
    color: Colors.foregroundMuted,
  },
});

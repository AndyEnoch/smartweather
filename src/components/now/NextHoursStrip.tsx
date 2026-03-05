import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, FontSize, FontWeight, Spacing } from '../../constants/theme';
import { WeatherIcon } from '../common/WeatherIcon';
import { getWeatherIcon } from '../../utils/weather';
import { formatTemperature, formatHour } from '../../utils/format';
import type { HourlyForecast } from '../../types/weather';

interface NextHoursStripProps {
  hours: HourlyForecast[];
}

export function NextHoursStrip({ hours }: NextHoursStripProps) {
  const next13 = hours.slice(0, 13);

  return (
    <View style={styles.container}>
      <FlatList
        data={next13}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.time}
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => (
          <View style={[styles.card, index === 0 && styles.cardActive]}>
            <Text style={styles.hour}>{index === 0 ? 'Now' : formatHour(item.time)}</Text>
            <WeatherIcon icon={getWeatherIcon(item.weatherCode)} size={22} />
            <Text style={styles.temp}>{formatTemperature(item.temperature)}</Text>
            <View style={styles.windRow}>
              <Ionicons name="speedometer-outline" size={10} color={Colors.foregroundMuted} />
              <Text style={styles.wind}>{Math.round(item.windSpeed)}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.sm,
  },
  list: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'center',
    minWidth: 72,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    gap: 4,
  },
  cardActive: {
    backgroundColor: 'rgba(74, 108, 247, 0.2)',
    borderColor: Colors.primary,
  },
  hour: {
    fontSize: FontSize.xs,
    color: Colors.foregroundMuted,
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

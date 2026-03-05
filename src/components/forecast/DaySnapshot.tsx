import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, Spacing } from '../../constants/theme';
import { WeatherIcon } from '../common/WeatherIcon';
import { getWeatherIcon } from '../../utils/weather';
import { formatTemperature, formatDayLabel, formatPercent } from '../../utils/format';
import { TempRangeBar } from './TempRangeBar';
import type { DailyForecast } from '../../types/weather';

interface DaySnapshotProps {
  days: DailyForecast[];
}

export function DaySnapshot({ days }: DaySnapshotProps) {
  const first5 = days.slice(0, 5);
  const globalMin = Math.min(...first5.map((d) => d.temperatureMin));
  const globalMax = Math.max(...first5.map((d) => d.temperatureMax));

  return (
    <View>
      {first5.map((day) => (
        <View key={day.date} style={styles.row}>
          <Text style={styles.dayLabel}>{formatDayLabel(day.date)}</Text>
          <WeatherIcon icon={getWeatherIcon(day.weatherCode)} size={20} />
          <Text style={styles.tempMin}>{formatTemperature(day.temperatureMin)}</Text>
          <View style={styles.barContainer}>
            <TempRangeBar
              min={day.temperatureMin}
              max={day.temperatureMax}
              globalMin={globalMin}
              globalMax={globalMax}
            />
          </View>
          <Text style={styles.tempMax}>{formatTemperature(day.temperatureMax)}</Text>
          <View style={styles.humidityRow}>
            <Ionicons name="water-outline" size={10} color={Colors.foregroundMuted} />
            <Text style={styles.humidity}>{formatPercent(day.precipitationProbability)}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  dayLabel: {
    fontSize: FontSize.md,
    color: Colors.foreground,
    fontWeight: FontWeight.medium,
    width: 42,
  },
  tempMin: {
    fontSize: FontSize.sm,
    color: Colors.foregroundMuted,
    width: 32,
    textAlign: 'right',
  },
  barContainer: {
    flex: 1,
  },
  tempMax: {
    fontSize: FontSize.sm,
    color: Colors.foreground,
    fontWeight: FontWeight.semibold,
    width: 32,
    textAlign: 'right',
  },
  humidityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    width: 48,
    justifyContent: 'flex-end',
  },
  humidity: {
    fontSize: FontSize.xs,
    color: Colors.foregroundMuted,
  },
});

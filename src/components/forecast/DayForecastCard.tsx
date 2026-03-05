import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, FontSize, FontWeight, Spacing } from '../../constants/theme';
import { WeatherIcon } from '../common/WeatherIcon';
import { getWeatherIcon } from '../../utils/weather';
import { formatTemperature, formatDayLabelLong, formatDateShort, formatPercent } from '../../utils/format';
import { TempRangeBar } from './TempRangeBar';
import type { DailyForecast } from '../../types/weather';

interface DayForecastCardProps {
  day: DailyForecast;
  globalMin: number;
  globalMax: number;
  isToday?: boolean;
}

export function DayForecastCard({ day, globalMin, globalMax, isToday }: DayForecastCardProps) {
  return (
    <View style={[styles.card, isToday && styles.cardToday]}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.dayName}>{formatDayLabelLong(day.date)}</Text>
          <Text style={styles.date}>{formatDateShort(day.date)}</Text>
        </View>
        <WeatherIcon icon={getWeatherIcon(day.weatherCode)} size={24} />
      </View>

      <View style={styles.bottomRow}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  cardToday: {
    backgroundColor: 'rgba(74, 108, 247, 0.12)',
    borderColor: Colors.primary,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  dayName: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.foreground,
  },
  date: {
    fontSize: FontSize.xs,
    color: Colors.foregroundMuted,
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
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

/**
 * Forecast Screen — 5-day snapshot and 7-day detailed forecast.
 *
 * Shows a compact snapshot with animated temp range bars,
 * then a full card-based 7-day view.
 */

import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientBackground } from '../../src/components/common/GradientBackground';
import { ScreenTransition } from '../../src/components/common/ScreenTransition';
import { Header } from '../../src/components/common/Header';
import { Card } from '../../src/components/common/Card';
import { LoadingOverlay } from '../../src/components/common/LoadingOverlay';
import { ErrorView } from '../../src/components/common/ErrorView';
import { DaySnapshot } from '../../src/components/forecast/DaySnapshot';
import { DayForecastCard } from '../../src/components/forecast/DayForecastCard';
import { useWeatherData } from '../../src/hooks/useWeatherData';
import { Colors, FontSize, FontWeight, Spacing } from '../../src/constants/theme';
import { isToday as checkIsToday } from 'date-fns';

export default function ForecastScreen() {
  const { data, isLoading, isError, error, refetch, isRefetching } = useWeatherData();

  if (isLoading && !data) {
    return (
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          <LoadingOverlay visible />
        </SafeAreaView>
      </GradientBackground>
    );
  }

  if (isError && !data) {
    return (
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          <ErrorView message={error?.message ?? 'Failed to load weather'} onRetry={refetch} />
        </SafeAreaView>
      </GradientBackground>
    );
  }

  if (!data) return null;

  const { daily } = data;
  const globalMin = Math.min(...daily.map((d) => d.temperatureMin));
  const globalMax = Math.max(...daily.map((d) => d.temperatureMax));

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScreenTransition>
        <Header
          fetchedAt={data.fetchedAt}
          onRefresh={refetch}
          isRefetching={isRefetching}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* 5-Day Snapshot */}
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>5-Day Snapshot</Text>
            <Text style={styles.cardSubtitle}>Quick overview</Text>
            <DaySnapshot days={daily} />
          </Card>

          {/* 7-Day Forecast */}
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>7-Day Forecast</Text>
            <Text style={styles.cardSubtitle}>Day-by-day overview</Text>
            <View style={styles.dayCards}>
              {daily.map((day) => (
                <DayForecastCard
                  key={day.date}
                  day={day}
                  globalMin={globalMin}
                  globalMax={globalMax}
                  isToday={checkIsToday(new Date(day.date))}
                />
              ))}
            </View>
          </Card>
        </ScrollView>
        <LoadingOverlay visible={isRefetching} />
        </ScreenTransition>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxxl,
    gap: Spacing.lg,
  },
  card: {
    gap: Spacing.sm,
  },
  cardTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.foreground,
  },
  cardSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.foregroundMuted,
    marginTop: -4,
  },
  dayCards: {
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
});

/**
 * Hourly Screen — 24-hour forecast with switchable chart.
 *
 * Features an area chart (Temperature/Wind Speed/Humidity)
 * and a scrollable hourly card strip below.
 */

import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientBackground } from '../../src/components/common/GradientBackground';
import { ScreenTransition } from '../../src/components/common/ScreenTransition';
import { Header } from '../../src/components/common/Header';
import { Card } from '../../src/components/common/Card';
import { TabSelector } from '../../src/components/common/TabSelector';
import { LoadingOverlay } from '../../src/components/common/LoadingOverlay';
import { ErrorView } from '../../src/components/common/ErrorView';
import { ForecastChart } from '../../src/components/hourly/ForecastChart';
import { HourlyCards } from '../../src/components/hourly/HourlyCards';
import { useWeatherData } from '../../src/hooks/useWeatherData';
import { Colors, FontSize, FontWeight, Spacing } from '../../src/constants/theme';
import type { ForecastMetric } from '../../src/types/weather';

const METRIC_TABS: { key: string; label: string; icon: React.ComponentProps<typeof import('@expo/vector-icons').Ionicons>['name'] }[] = [
  { key: 'temperature', label: 'Temperature', icon: 'thermometer-outline' },
  { key: 'windSpeed', label: 'Wind Speed', icon: 'speedometer-outline' },
  { key: 'humidity', label: 'Humidity', icon: 'water-outline' },
];

export default function HourlyScreen() {
  const { data, isLoading, isError, error, refetch, isRefetching } = useWeatherData();
  const [metric, setMetric] = useState<ForecastMetric>('temperature');

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

  const now = new Date();
  const upcomingHours = data.hourly.filter((h) => new Date(h.time) >= now);

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
          <Card style={styles.chartCard}>
            <Text style={styles.title}>24-Hour Forecast</Text>
            <Text style={styles.subtitle}>Hourly breakdown</Text>

            <TabSelector
              tabs={METRIC_TABS}
              activeTab={metric}
              onTabChange={(key) => setMetric(key as ForecastMetric)}
            />

            <ForecastChart hours={upcomingHours} metric={metric} />
          </Card>

          <HourlyCards hours={upcomingHours} />

          <Text style={styles.autoRefreshText}>
            Auto-refreshes every 3 minutes
          </Text>
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
  chartCard: {
    gap: Spacing.md,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.foreground,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.foregroundMuted,
    marginTop: -8,
  },
  autoRefreshText: {
    fontSize: FontSize.xs,
    color: Colors.foregroundMuted,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});

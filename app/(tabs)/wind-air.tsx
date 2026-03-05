/**
 * Wind & Air Screen — Wind compass and atmospheric gauges.
 *
 * Displays an animated wind compass with direction/speed/gusts,
 * Beaufort scale, humidity arc gauge, pressure linear gauge,
 * and UV index color scale.
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
import { WindCompass } from '../../src/components/wind/WindCompass';
import { HumidityGauge } from '../../src/components/wind/HumidityGauge';
import { PressureGauge } from '../../src/components/wind/PressureGauge';
import { UVIndexScale } from '../../src/components/wind/UVIndexScale';
import { useWeatherData } from '../../src/hooks/useWeatherData';
import { Colors, FontSize, FontWeight, Spacing } from '../../src/constants/theme';

export default function WindAirScreen() {
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

  const { current } = data;

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
          {/* Wind Compass Card */}
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Wind Compass</Text>
            <Text style={styles.cardSubtitle}>Direction & intensity</Text>
            <WindCompass
              direction={current.windDirection}
              speed={current.windSpeed}
              gusts={current.windGusts}
            />
          </Card>

          {/* Atmosphere Card */}
          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Atmosphere</Text>
            <Text style={styles.cardSubtitle}>Key atmospheric readings</Text>

            <HumidityGauge humidity={current.humidity} />

            <View style={styles.gaugeRow}>
              <PressureGauge pressure={current.pressure} />
              <UVIndexScale uvIndex={current.uvIndex} />
            </View>
          </Card>

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
  gaugeRow: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginTop: Spacing.md,
  },
  autoRefreshText: {
    fontSize: FontSize.xs,
    color: Colors.foregroundMuted,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});

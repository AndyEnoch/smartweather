/**
 * Now Screen — Current weather display.
 *
 * Clearly communicates two core questions:
 * "What's the weather now?" — hero temperature + condition + stat grid
 * "What's coming next?" — next hours horizontal strip
 */

import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { GradientBackground } from '../../src/components/common/GradientBackground';
import { ScreenTransition } from '../../src/components/common/ScreenTransition';
import { Header } from '../../src/components/common/Header';
import { LoadingOverlay } from '../../src/components/common/LoadingOverlay';
import { ErrorView } from '../../src/components/common/ErrorView';
import { CurrentWeather } from '../../src/components/now/CurrentWeather';
import { WeatherStatGrid } from '../../src/components/now/WeatherStatGrid';
import { NextHoursStrip } from '../../src/components/now/NextHoursStrip';
import { useWeatherData } from '../../src/hooks/useWeatherData';
import { Colors, FontSize, FontWeight, Spacing } from '../../src/constants/theme';
import { formatLastUpdated } from '../../src/utils/format';

export default function NowScreen() {
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
          {/* Section: What's the weather now? */}
          <View style={styles.sectionHeader}>
            <Ionicons name="sunny" size={16} color={Colors.chartOrange} />
            <Text style={styles.sectionTitle}>What's the weather now?</Text>
          </View>

          <CurrentWeather data={data.current} locationName={data.location.name} />
          <WeatherStatGrid data={data.current} />

          {/* Last updated timestamp */}
          <Text style={styles.lastUpdated}>
            Last updated: {formatLastUpdated(data.fetchedAt)}
          </Text>

          {/* Section: What's coming next? */}
          <View style={[styles.sectionHeader, styles.sectionSpacing]}>
            <Ionicons name="time-outline" size={16} color={Colors.primaryLight} />
            <Text style={styles.sectionTitle}>What's coming next?</Text>
          </View>

          <NextHoursStrip hours={upcomingHours} />

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
    paddingBottom: Spacing.xxxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xs,
  },
  sectionSpacing: {
    marginTop: Spacing.xxl,
  },
  sectionTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.foregroundSecondary,
  },
  lastUpdated: {
    fontSize: FontSize.xs,
    color: Colors.foregroundMuted,
    textAlign: 'center',
    marginTop: Spacing.lg,
  },
  autoRefreshText: {
    fontSize: FontSize.xs,
    color: Colors.foregroundMuted,
    textAlign: 'center',
    marginTop: Spacing.xxl,
  },
});

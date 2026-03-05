/**
 * Root layout — sets up providers: React Query + Location context.
 *
 * The QueryClientProvider and LocationProvider wrap the entire app
 * so all screens share the same cached weather data and selected location.
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import { LocationProvider } from '../src/context/LocationContext';

SystemUI.setBackgroundColorAsync('#0a0a1a');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 10 * 60 * 1000,
    },
  },
});

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocationProvider>
        <StatusBar style="light" />
        <Slot />
      </LocationProvider>
    </QueryClientProvider>
  );
}

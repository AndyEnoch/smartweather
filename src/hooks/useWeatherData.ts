/**
 * React Query hook for weather data fetching with auto-refresh.
 *
 * Reads the active location from LocationContext and passes it
 * to the API layer. React Query handles:
 * - Automatic background refetching every 3 minutes
 * - Stale-while-revalidate (no flicker on refresh)
 * - Retry with exponential backoff
 * - Shared cache across tabs via queryKey
 */

import { useQuery } from '@tanstack/react-query';
import { fetchWeather } from '../api/weather';
import { AUTO_REFRESH_INTERVAL_MS } from '../constants/weather';
import { useLocation } from '../context/LocationContext';
import type { WeatherData } from '../types/weather';

export function useWeatherData() {
  const { location } = useLocation();

  return useQuery<WeatherData>({
    queryKey: ['weather', location.latitude, location.longitude],
    queryFn: () =>
      fetchWeather(
        location.latitude,
        location.longitude,
        `${location.name}, ${location.country}`,
      ),
    refetchInterval: AUTO_REFRESH_INTERVAL_MS,
    staleTime: AUTO_REFRESH_INTERVAL_MS,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
  });
}

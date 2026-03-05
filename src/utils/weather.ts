/**
 * Weather utility functions for derived data, labels, and scale lookups.
 */

import { BEAUFORT_SCALE, WMO_CODES } from '../constants/weather';

export function getWeatherLabel(code: number): string {
  return WMO_CODES[code]?.label ?? 'Unknown';
}

export function getWeatherIcon(code: number): string {
  return WMO_CODES[code]?.icon ?? 'clear';
}

export function getBeaufortLevel(windSpeedKmh: number) {
  const entry = BEAUFORT_SCALE.find((b) => windSpeedKmh <= b.maxSpeed);
  return entry ?? BEAUFORT_SCALE[BEAUFORT_SCALE.length - 1];
}

export function getWindDirectionLabel(degrees: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

export function getUVLabel(uvIndex: number): string {
  if (uvIndex <= 2) return 'Low';
  if (uvIndex <= 5) return 'Moderate';
  if (uvIndex <= 7) return 'High';
  if (uvIndex <= 10) return 'Very High';
  return 'Extreme';
}

export function getUVColor(uvIndex: number): string {
  if (uvIndex <= 2) return '#22c55e';
  if (uvIndex <= 5) return '#eab308';
  if (uvIndex <= 7) return '#f97316';
  if (uvIndex <= 10) return '#ef4444';
  return '#9333ea';
}

export function getHumidityLabel(humidity: number): string {
  if (humidity < 30) return 'Dry';
  if (humidity < 50) return 'Comfortable';
  if (humidity < 70) return 'Humid';
  return 'Very Humid';
}

export function getPressureLabel(hPa: number): string {
  if (hPa < 1000) return 'Low';
  if (hPa < 1020) return 'Normal';
  return 'High';
}

export function getVisibilityLabel(meters: number): string {
  const km = meters / 1000;
  if (km < 1) return 'Very Poor';
  if (km < 4) return 'Poor';
  if (km < 10) return 'Moderate';
  return 'Good';
}

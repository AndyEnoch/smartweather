/**
 * Formatting utilities for dates, numbers, and units.
 */

import { format, isToday, isTomorrow, parseISO } from 'date-fns';

export function formatTemperature(temp: number, decimals = 0): string {
  return `${temp.toFixed(decimals)}°`;
}

export function formatSpeed(speed: number): string {
  return `${Math.round(speed)} km/h`;
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

export function formatPressure(hPa: number): string {
  return `${Math.round(hPa)} hPa`;
}

export function formatVisibility(meters: number): string {
  const km = meters / 1000;
  return km >= 1 ? `${Math.round(km)} km` : `${Math.round(meters)} m`;
}

export function formatHour(isoString: string): string {
  return format(parseISO(isoString), 'h a');
}

export function formatHourShort(isoString: string): string {
  return format(parseISO(isoString), 'ha');
}

export function formatTime(isoString: string): string {
  return format(parseISO(isoString), 'h:mm a');
}

export function formatDayLabel(isoString: string): string {
  const date = parseISO(isoString);
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  return format(date, 'EEE');
}

export function formatDayLabelLong(isoString: string): string {
  const date = parseISO(isoString);
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  return format(date, 'EEEE');
}

export function formatDateShort(isoString: string): string {
  return format(parseISO(isoString), 'MMM d');
}

export function formatLastUpdated(timestamp: number): string {
  return format(new Date(timestamp), 'h:mm:ss a');
}

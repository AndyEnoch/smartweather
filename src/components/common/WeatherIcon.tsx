/**
 * Weather icon component using @expo/vector-icons (Ionicons).
 *
 * Maps WMO weather icon identifiers to Ionicons names,
 * replacing emoji with proper scalable vector icons.
 */

import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/theme';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

const ICON_MAP: Record<string, { name: IoniconsName; color: string }> = {
  'clear':          { name: 'sunny', color: '#FBBF24' },
  'mainly-clear':   { name: 'sunny', color: '#FBBF24' },
  'partly-cloudy':  { name: 'partly-sunny', color: '#FCD34D' },
  'overcast':       { name: 'cloud', color: '#94A3B8' },
  'fog':            { name: 'cloud-outline', color: '#94A3B8' },
  'drizzle':        { name: 'rainy-outline', color: '#60A5FA' },
  'rain':           { name: 'rainy', color: '#3B82F6' },
  'heavy-rain':     { name: 'thunderstorm', color: '#2563EB' },
  'snow':           { name: 'snow', color: '#E0F2FE' },
  'heavy-snow':     { name: 'snow', color: '#BAE6FD' },
  'rain-showers':   { name: 'rainy', color: '#60A5FA' },
  'thunderstorm':   { name: 'thunderstorm', color: '#A78BFA' },
};

const DEFAULT_ICON = { name: 'thermometer-outline' as IoniconsName, color: Colors.foregroundSecondary };

interface WeatherIconProps {
  icon: string;
  size?: number;
  color?: string;
}

export function WeatherIcon({ icon, size = 28, color }: WeatherIconProps) {
  const mapping = ICON_MAP[icon] ?? DEFAULT_ICON;
  return (
    <Ionicons
      name={mapping.name}
      size={size}
      color={color ?? mapping.color}
    />
  );
}

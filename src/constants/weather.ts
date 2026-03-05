/**
 * Weather-related constants: WMO codes, Beaufort scale, preset locations.
 */

export interface Location {
  latitude: number;
  longitude: number;
  name: string;
  country: string;
}

export const LOCATIONS: Location[] = [
  { latitude: 5.6037, longitude: -0.187, name: 'Accra', country: 'Ghana' },
  { latitude: 51.5074, longitude: -0.1278, name: 'London', country: 'United Kingdom' },
  { latitude: 52.52, longitude: 13.405, name: 'Berlin', country: 'Germany' },
  { latitude: -34.6037, longitude: -58.3816, name: 'Buenos Aires', country: 'Argentina' },
  { latitude: 37.7749, longitude: -122.4194, name: 'San Francisco', country: 'United States' },
];

export const DEFAULT_LOCATION = LOCATIONS[0]; // Accra

export const AUTO_REFRESH_INTERVAL_MS = 3 * 60 * 1000; // 3 minutes

/** WMO Weather interpretation codes mapped to human labels + icon identifiers */
export const WMO_CODES: Record<number, { label: string; icon: string }> = {
  0: { label: 'Clear sky', icon: 'clear' },
  1: { label: 'Mainly clear', icon: 'mainly-clear' },
  2: { label: 'Partly cloudy', icon: 'partly-cloudy' },
  3: { label: 'Overcast', icon: 'overcast' },
  45: { label: 'Foggy', icon: 'fog' },
  48: { label: 'Depositing rime fog', icon: 'fog' },
  51: { label: 'Light drizzle', icon: 'drizzle' },
  53: { label: 'Moderate drizzle', icon: 'drizzle' },
  55: { label: 'Dense drizzle', icon: 'drizzle' },
  61: { label: 'Slight rain', icon: 'rain' },
  63: { label: 'Moderate rain', icon: 'rain' },
  65: { label: 'Heavy rain', icon: 'heavy-rain' },
  71: { label: 'Slight snow', icon: 'snow' },
  73: { label: 'Moderate snow', icon: 'snow' },
  75: { label: 'Heavy snow', icon: 'heavy-snow' },
  80: { label: 'Slight rain showers', icon: 'rain-showers' },
  81: { label: 'Moderate rain showers', icon: 'rain-showers' },
  82: { label: 'Violent rain showers', icon: 'heavy-rain' },
  85: { label: 'Slight snow showers', icon: 'snow' },
  86: { label: 'Heavy snow showers', icon: 'heavy-snow' },
  95: { label: 'Thunderstorm', icon: 'thunderstorm' },
  96: { label: 'Thunderstorm with slight hail', icon: 'thunderstorm' },
  99: { label: 'Thunderstorm with heavy hail', icon: 'thunderstorm' },
};

/** Beaufort wind scale — max speed in km/h for each level */
export const BEAUFORT_SCALE = [
  { level: 0, maxSpeed: 1, label: 'Calm' },
  { level: 1, maxSpeed: 5, label: 'Light air' },
  { level: 2, maxSpeed: 11, label: 'Light breeze' },
  { level: 3, maxSpeed: 19, label: 'Gentle breeze' },
  { level: 4, maxSpeed: 28, label: 'Moderate breeze' },
  { level: 5, maxSpeed: 38, label: 'Fresh breeze' },
  { level: 6, maxSpeed: 49, label: 'Strong breeze' },
  { level: 7, maxSpeed: 61, label: 'Near gale' },
  { level: 8, maxSpeed: 74, label: 'Gale' },
  { level: 9, maxSpeed: 88, label: 'Strong gale' },
  { level: 10, maxSpeed: 102, label: 'Storm' },
  { level: 11, maxSpeed: 117, label: 'Violent storm' },
  { level: 12, maxSpeed: Infinity, label: 'Hurricane' },
] as const;

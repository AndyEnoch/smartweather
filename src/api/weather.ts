/**
 * Open-Meteo API client.
 *
 * Fetches current, hourly, and daily forecast data and transforms
 * raw API responses into app-level WeatherData types.
 */

import type { OpenMeteoResponse } from './types';
import type {
  WeatherData,
  CurrentWeather,
  HourlyForecast,
  DailyForecast,
} from '../types/weather';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

const CURRENT_PARAMS = [
  'temperature_2m',
  'apparent_temperature',
  'wind_speed_10m',
  'wind_gusts_10m',
  'wind_direction_10m',
  'relative_humidity_2m',
  'surface_pressure',
  'visibility',
  'uv_index',
  'weather_code',
  'is_day',
].join(',');

const HOURLY_PARAMS = [
  'temperature_2m',
  'relative_humidity_2m',
  'wind_speed_10m',
  'wind_direction_10m',
  'weather_code',
  'precipitation_probability',
  'is_day',
].join(',');

const DAILY_PARAMS = [
  'temperature_2m_min',
  'temperature_2m_max',
  'weather_code',
  'wind_speed_10m_max',
  'relative_humidity_2m_mean',
  'precipitation_probability_max',
  'sunrise',
  'sunset',
  'uv_index_max',
].join(',');

export async function fetchWeather(
  latitude: number,
  longitude: number,
  locationName: string,
): Promise<WeatherData> {
  const url = `${BASE_URL}?latitude=${latitude}&longitude=${longitude}&current=${CURRENT_PARAMS}&hourly=${HOURLY_PARAMS}&daily=${DAILY_PARAMS}&timezone=auto&forecast_days=7`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
  }

  const data: OpenMeteoResponse = await response.json();
  return transformResponse(data, locationName);
}

function transformResponse(raw: OpenMeteoResponse, locationName: string): WeatherData {
  const current = transformCurrent(raw.current);
  const hourly = transformHourly(raw.hourly);
  const daily = transformDaily(raw.daily);

  return {
    current,
    hourly,
    daily,
    location: {
      latitude: raw.latitude,
      longitude: raw.longitude,
      name: locationName,
    },
    fetchedAt: Date.now(),
  };
}

function transformCurrent(raw: OpenMeteoResponse['current']): CurrentWeather {
  return {
    temperature: raw.temperature_2m,
    feelsLike: raw.apparent_temperature,
    windSpeed: raw.wind_speed_10m,
    windGusts: raw.wind_gusts_10m,
    windDirection: raw.wind_direction_10m,
    humidity: raw.relative_humidity_2m,
    pressure: raw.surface_pressure,
    visibility: raw.visibility,
    uvIndex: raw.uv_index,
    weatherCode: raw.weather_code,
    isDay: raw.is_day === 1,
    time: raw.time,
  };
}

function transformHourly(raw: OpenMeteoResponse['hourly']): HourlyForecast[] {
  return raw.time.map((time, i) => ({
    time,
    temperature: raw.temperature_2m[i],
    humidity: raw.relative_humidity_2m[i],
    windSpeed: raw.wind_speed_10m[i],
    windDirection: raw.wind_direction_10m[i],
    weatherCode: raw.weather_code[i],
    precipitationProbability: raw.precipitation_probability[i],
    isDay: raw.is_day[i] === 1,
  }));
}

function transformDaily(raw: OpenMeteoResponse['daily']): DailyForecast[] {
  return raw.time.map((date, i) => ({
    date,
    temperatureMin: raw.temperature_2m_min[i],
    temperatureMax: raw.temperature_2m_max[i],
    weatherCode: raw.weather_code[i],
    windSpeedMax: raw.wind_speed_10m_max[i],
    humidity: raw.relative_humidity_2m_mean[i],
    precipitationProbability: raw.precipitation_probability_max[i],
    sunrise: raw.sunrise[i],
    sunset: raw.sunset[i],
    uvIndexMax: raw.uv_index_max[i],
  }));
}

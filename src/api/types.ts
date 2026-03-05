/** Raw Open-Meteo API response types. */

export interface OpenMeteoCurrentResponse {
  time: string;
  interval: number;
  temperature_2m: number;
  apparent_temperature: number;
  wind_speed_10m: number;
  wind_gusts_10m: number;
  wind_direction_10m: number;
  relative_humidity_2m: number;
  surface_pressure: number;
  visibility: number;
  uv_index: number;
  weather_code: number;
  is_day: number;
}

export interface OpenMeteoHourlyResponse {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  wind_speed_10m: number[];
  wind_direction_10m: number[];
  weather_code: number[];
  precipitation_probability: number[];
  is_day: number[];
}

export interface OpenMeteoDailyResponse {
  time: string[];
  temperature_2m_min: number[];
  temperature_2m_max: number[];
  weather_code: number[];
  wind_speed_10m_max: number[];
  relative_humidity_2m_mean: number[];
  precipitation_probability_max: number[];
  sunrise: string[];
  sunset: string[];
  uv_index_max: number[];
}

export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current: OpenMeteoCurrentResponse;
  hourly: OpenMeteoHourlyResponse;
  daily: OpenMeteoDailyResponse;
}

/** App-level weather types, derived from API responses. */

export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  windSpeed: number;
  windGusts: number;
  windDirection: number;
  humidity: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  weatherCode: number;
  isDay: boolean;
  time: string;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  weatherCode: number;
  precipitationProbability: number;
  isDay: boolean;
}

export interface DailyForecast {
  date: string;
  temperatureMin: number;
  temperatureMax: number;
  weatherCode: number;
  windSpeedMax: number;
  humidity: number;
  precipitationProbability: number;
  sunrise: string;
  sunset: string;
  uvIndexMax: number;
}

export interface WeatherData {
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  location: {
    latitude: number;
    longitude: number;
    name: string;
  };
  fetchedAt: number; // Unix timestamp ms
}

export type ForecastMetric = 'temperature' | 'windSpeed' | 'humidity';

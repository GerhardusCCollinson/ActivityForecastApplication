export const REQUIRED_WEATHER_FIELDS = [
  'temperature_2m_max',
  'precipitation_sum',
  'rain_sum',
  'showers_sum',
  'snowfall_sum',
  'precipitation_probability_mean',
  'sunshine_duration',
  'daylight_duration',
  'wind_speed_10m_max',
  'weather_code',
] as const;

export interface WeatherServiceResponse {
  daily: DailyWeatherValues;
  daily_units: DailyWeatherUnits;
  elevation: number;
  generationtime_ms: number;
  longitude: number;
  latitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}

type DailyWeatherValues = {
  [X in typeof REQUIRED_WEATHER_FIELDS[number]]: number[];
} & {
  time: string[]
}

type DailyWeatherUnits = {
  [X in typeof REQUIRED_WEATHER_FIELDS[number]]: string;
} & {
  time: string
}

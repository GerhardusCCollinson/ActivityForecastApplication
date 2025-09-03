export const REQUIRED_MARINE_FIELDS = [
  'wave_height_max',
  'wave_period_max',
] as const;

export interface MarineForecastResponse {
  daily: DailyForecastValues;
  daily_units: DailyForecastUnits;
  elevation: number;
  generationtime_ms: number;
  longitude: number;
  latitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}

type DailyForecastValues = {
  [X in typeof REQUIRED_MARINE_FIELDS[number]]: (number | null)[]
} & {
  time: string[]
}

type DailyForecastUnits = {
  [X in typeof REQUIRED_MARINE_FIELDS[number]]: string
} & {
  time: string
}

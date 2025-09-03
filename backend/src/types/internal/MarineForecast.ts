export const MARINE_PROPERTIES = [
  'waveHeightMax',
  'wavePeriodMax',
] as const;

export interface MarineForecast {
  daily: DailyForecastValues;
  dailyUnits: DailyForecastUnits;
  isCoastal: boolean;
}

type DailyForecastValues = {
  [X in typeof MARINE_PROPERTIES[number]]: number[]
} & {
  time: string[]
}

type DailyForecastUnits = {
  [X in typeof MARINE_PROPERTIES[number]]: string
} & {
  time: string
}

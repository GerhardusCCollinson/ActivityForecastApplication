export const WEATHER_PROPERTIES = [
	'temperature',
	'precipitation',
	'rain',
	'showers',
	'snowfall',
	'precipitationProbability',
	'sunshineDuration',
	'daylightDuration',
	'windSpeedMax',
] as const;

export interface WeatherForecast {
	daily: DailyValues;
	dailyUnits: DailyUnits;
}

type DailyValues = {
	[X in typeof WEATHER_PROPERTIES[number]]: number[];
} & {
	time: string[];
	weatherCode: string[];
}

type DailyUnits = {
	[X in typeof WEATHER_PROPERTIES[number]]: string;
} & {
	time: string;
}


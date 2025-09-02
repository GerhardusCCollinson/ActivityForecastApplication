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

export const ACTIVITIES = [
	'ski',
	'surf',
	'indoorActivities',
	'outdoorActivities',
] as const;

export interface WeatherForecast {
	daily: DailyWeatherValues;
	dailyUnits: DailyWeatherUnits;
	elevation: number;
	generationtimeMs: number;
	longitude: number;
	latitude: number;
	timezone: string;
	timezoneAbbreviation: string;
	utcOffsetSeconds: number;
}

type DailyWeatherValues = {
	[X in typeof WEATHER_PROPERTIES[number]]: number[];
} & {
	time: string[];
	weatherCode: string[];
	activityRankings: ActivityRankings[];
}

type DailyWeatherUnits = {
	[X in typeof WEATHER_PROPERTIES[number]]: string;
} & {
	time: string;
}

export type ActivityRankings = {
	[X in typeof ACTIVITIES[number]]: ActivityRanking;
}

export type ActivityRanking = {
	score: number;
	isPossible: boolean;
}

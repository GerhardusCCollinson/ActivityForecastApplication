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

export const MARINE_PROPERTIES = [
  'waveHeightMax',
  'wavePeriodMax',
] as const;

export const ACTIVITY_PROPERTIES = [
	...MARINE_PROPERTIES,
	...WEATHER_PROPERTIES,
] as const;

export const ACTIVITIES = [
	'ski',
	'surf',
	'indoorSightseeing',
	'outdoorSightseeing',
] as const;

export interface ActivityForecast {
	daily: DailyValues;
	dailyUnits: DailyUnits;
	isCoastal: boolean;
	elevation: number;
}

export type ActivityRankings = {
	[X in typeof ACTIVITIES[number]]: ActivityRanking;
}

export type ActivityRanking = {
	score: number;
	isPossible: boolean;
	reason: string;
}

type DailyValues = {
  [X in typeof WEATHER_PROPERTIES[number]]: number[];
} & {
  [X in typeof MARINE_PROPERTIES[number]]: (number | null)[]
} & {
	weatherCode: string[];
	time: string[];
	activityRankings: ActivityRankings[];
}

type DailyUnits = {
  [X in typeof ACTIVITY_PROPERTIES[number]]: string;
} & {
	time: string
}

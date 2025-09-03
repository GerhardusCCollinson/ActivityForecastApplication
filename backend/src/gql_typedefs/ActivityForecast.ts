import { gql } from 'graphql-request';

export const ActivityForecast = gql`
	input ActivityForecastInput {
		longitude: Float!
		latitude: Float!
	}

	type ActivityRanking {
		score: Float
		isPossible: Boolean
	}

	type ActivitiesRanking {
		ski: ActivityRanking
		surf: ActivityRanking
		indoorActivities: ActivityRanking
		outdoorActivities: ActivityRanking
	}

	type DailyUnits {
		waveHeightMax: String
		wavePeriodMax: String
		temperature: String
		precipitation: String
		rain: String
		showers: String
		snowfall: String
		precipitationProbability: String
		sunshineDuration: String
		daylightDuration: String
		windSpeedMax: String
		time: String
	}

	type DailyValues {
		waveHeightMax: [Float]
		wavePeriodMax: [Float]
		temperature: [Float]
		precipitation: [Float]
		rain: [Float]
		showers: [Float]
		snowfall: [Float]
		precipitationProbability: [Float]
		sunshineDuration: [Float]
		daylightDuration: [Float]
		windSpeedMax: [Float]
		weatherCode: [String]
		time: [String]
		activityRankings: [ActivitiesRanking]
	}

	type ActivityForecast {
		daily: DailyValues
		dailyUnits: DailyUnits
		isCoastal: Boolean
		elevation: Float
	}
`;

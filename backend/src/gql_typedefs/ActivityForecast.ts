import { gql } from 'graphql-request';

export const ActivityForecast = gql`
	"Coordinates for the forecast request"
	input ActivityForecastInput {
		"Longitude in decimal degrees"
		longitude: Float!
		"Latitude in decimal degrees"
		latitude: Float!
	}

	"Suitability assessment for an activity on a given day"
	type ActivityRanking {
		"Relative suitability score (higher is better)"
		score: Float
		"Whether the activity is considered possible"
		isPossible: Boolean
		"Short explanation for the rating"
		reason: String
	}

	"Daily rankings for supported activities"
	type ActivitiesRanking {
		"Ranking for skiing"
		ski: ActivityRanking
		"Ranking for surfing"
		surf: ActivityRanking
		"Ranking for indoor sightseeing"
		indoorSightseeing: ActivityRanking
		"Ranking for outdoor sightseeing"
		outdoorSightseeing: ActivityRanking
	}

	"Units for each daily field"
	type DailyUnits {
		"Unit label for waveHeightMax values"
		waveHeightMax: String
		"Unit label for wavePeriodMax values"
		wavePeriodMax: String
		"Unit label for temperature values"
		temperature: String
		"Unit label for precipitation values"
		precipitation: String
		"Unit label for rain values"
		rain: String
		"Unit label for showers values"
		showers: String
		"Unit label for snowfall values"
		snowfall: String
		"Unit label for precipitationProbability values"
		precipitationProbability: String
		"Unit label for sunshineDuration values"
		sunshineDuration: String
		"Unit label for daylightDuration values"
		daylightDuration: String
		"Unit label for windSpeedMax values"
		windSpeedMax: String
		"Unit label for time values"
		time: String
	}

	"Forecast values per day"
	type DailyValues {
		"Max significant wave height per day"
		waveHeightMax: [Float]
		"Max wave period per day"
		wavePeriodMax: [Float]
		"Daily max air temperature"
		temperature: [Float]
		"Total precipitation per day"
		precipitation: [Float]
		"Total rain per day"
		rain: [Float]
		"Total showers per day"
		showers: [Float]
		"Total snowfall per day"
		snowfall: [Float]
		"Mean probability of precipitation"
		precipitationProbability: [Float]
		"Total sunshine duration per day"
		sunshineDuration: [Float]
		"Total daylight duration per day"
		daylightDuration: [Float]
		"Max wind speed at 10m per day"
		windSpeedMax: [Float]
		"Weather condition symbol"
		weatherCode: [String]
		"ISO 8601 date for the day"
		time: [String]
		"Computed activity suitability per day"
		activityRankings: [ActivitiesRanking]
	}

	"Combined weather and marine information to inform the activity forecast for the location"
	type ActivityForecast {
		"Daily forecast values"
		daily: DailyValues
		"Units for daily fields"
		dailyUnits: DailyUnits
		"Whether the location is coastal"
		isCoastal: Boolean
		"Elevation of current city used in forecast (meters)"
		elevation: Float
	}
`;

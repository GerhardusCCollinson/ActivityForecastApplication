import type { ActivityForecast, ActivityRanking, ActivityRankings, MARINE_PROPERTIES, MarineForecast, WEATHER_PROPERTIES, WeatherForecast } from "../types";
import { MarineForecastService } from "./MarineForecastService";
import { WeatherForecastService } from "./WeatherForecastService";

export class ActivityForecastService {
	private weatherForecastService: WeatherForecastService;
	private marineForecastService: MarineForecastService;

	constructor(
		weatherForecastService = new WeatherForecastService(),
		marineForecastService = new MarineForecastService(),
	) {
		this.weatherForecastService = weatherForecastService;
		this.marineForecastService = marineForecastService;
	}
	
	async getDailyForecast(forecastArgs: ActivityForecastArgs): Promise<ActivityForecast> {
		const forecastData = await this.getRequiredForecastData(forecastArgs);
		
		const dailyRankings = this.computeDailyRankings(
			forecastData.weatherForecast,
			forecastData.marineForecast
		);

		return {
			elevation: forecastData.weatherForecast.elevation,
			dailyUnits: {
				...forecastData.marineForecast.dailyUnits,
				...forecastData.weatherForecast.dailyUnits,
			},
			daily: {
				...forecastData.marineForecast.daily,
				...forecastData.weatherForecast.daily,
				activityRankings: dailyRankings,
			},
			isCoastal: forecastData.marineForecast.isCoastal,
		}
	}

	computeDailyRankings(
		weatherForecast: WeatherForecast,
		marineForecst: MarineForecast,
	): ActivityRankings[] {
		// return dailyForecast.time.map();
		return []
	}

	private async getRequiredForecastData (forecastArgs: ActivityForecastArgs): Promise<ForecastRequiredData> {
		const forecasts = await Promise.all([
			this.marineForecastService.getDailyForecast(forecastArgs),
			this.weatherForecastService.getDailyForecast(forecastArgs),
		]);


		return {
			marineForecast: forecasts[0],
			weatherForecast: forecasts[1],
		}
	}

	private computeActivityScore(
		kind: keyof ActivityRankings,
		conditions: RelevantConditions,
	): ActivityRanking {
		switch (kind) {
			case 'ski':
				return this.computeSkiScore(conditions);
			case 'surf':
				return this.computeSurfScore(conditions);
			case 'indoorActivities':
				return this.computeIndoorActivityScore(conditions);
			case 'outdoorActivities':
				return this.computeOutdoorActivityScore(conditions);
			default:
				return { isPossible: false, score: 0 };
		}
	}

	private computeSkiScore(conditions: RelevantConditions): ActivityRanking {
		const { rain, elevation, temperature, windSpeedMax } = conditions;

		// Check if skiing is possible:
		if(
			// Can't ski if its not cold enough for snow.
			temperature > -1 || 
			// -21 celcius is too uncomfortably cold to ski.
			temperature < -21 ||
			// Can't ski in wind speeds greater than 60 kmph
			windSpeedMax >= 60 ||
			// You can't really ski if there is too much rain
			rain > 15 ||
			// If the city is located at a really low elevation it is also unlikely skiing is available
			elevation < 500
		) {
			return {
				score: 0,
				isPossible: false,
			}
		}

		// Assign a score to skiing based on temperature and wind speed:
		let score = 0;

		// Ideal temperature for skiing
		if(temperature >= -6 && temperature <= -1) {
			score += 5;
		} else if (temperature < -6) {
			// If its getting colder than ideal, make score smaller in increments of 5 deg
			// For each three degrees we penalise the rating by one (temperature = 3 * rating - 21)
			// rearranged: rating = (temperature + 21) / 3
			const temperatureRating = (temperature + 21) / 3;

			if(temperatureRating >= 0) {
				score += Math.round(temperatureRating);
			}
		}

		// The stronger the wind, the more dangerous the ski. The score is modified with
		// penalties for each 10 kmph wind speed, with the first penalty at 10 kmph
		const windRating = (60 - windSpeedMax) / 10;
		if (windRating > 5) {
			score += 5;
		} else {
			score += windRating;
		}

		return { score, isPossible: true }
	}

	private computeSurfScore(conditions: RelevantConditions): ActivityRanking {
		const { rain, elevation, temperature, windSpeedMax } = conditions;

		// Check if surfing is possible
		if(
			// Can't surf if it is too cold (This is more subjective than the others)
			temperature < 10 ||
			// Can't surf if area is too elevated, i.e. this is a rough check to see if the area is coastal
			elevation > 50 ||
			// Can't surf if it rains too much
			rain > 15 ||
			// High wind speeds makes surfing unconfortable
			windSpeedMax > 30
		) {
			return {
				score: 0,
				isPossible: false,
			}
		}

		// Assign a score to skiing based on temperature and wind speed:
		let score = 0;

		// TODO:
	}

	private computeIndoorActivityScore(conditions: RelevantConditions): ActivityRanking {
		
	}

	private computeOutdoorActivityScore(conditions: RelevantConditions): ActivityRanking {
		
	}


}


type RelevantConditions = {
	[X in typeof WEATHER_PROPERTIES[number]]: number;
} & {
	[X in typeof MARINE_PROPERTIES[number]]: number;
} & {
	elevation: number;	
	isCoastal: boolean;
};

interface ForecastRequiredData {
	weatherForecast: WeatherForecast;
	marineForecast: MarineForecast;
}

interface ActivityForecastArgs {
	latitude: number
	longitude: number
}

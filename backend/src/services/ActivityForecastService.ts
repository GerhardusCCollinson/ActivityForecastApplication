import type {
	ActivityForecast,
	ActivityRanking,
	ActivityRankings,
	MarineForecast,
	WeatherForecast
} from "../types";
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
	
	async getDailyForecast(forecastArgs: ForecastArgs): Promise<ActivityForecast> {
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

	private computeDailyRankings(
		weatherForecast: WeatherForecast,
		marineForecst: MarineForecast,
	): ActivityRankings[] {
		return weatherForecast.daily.time.map((item, index) => {
			const relevantConditions: RelevantConditions = {
				time: item,
				windSpeedMax: weatherForecast.daily.windSpeedMax[index] ?? 0,
				weatherCode: weatherForecast.daily.weatherCode[index] ?? '',
				temperature: weatherForecast.daily.temperature[index] ?? 0,
				sunshineDuration: weatherForecast.daily.sunshineDuration[index] ?? 0,
				rain: weatherForecast.daily.rain[index] ?? 0,
				isCoastal: marineForecst.isCoastal,
				elevation: weatherForecast.elevation,
				showers: weatherForecast.daily.showers[index] ?? 0,
				daylightDuration: weatherForecast.daily.daylightDuration[index] ?? 0,
				precipitation: weatherForecast.daily.precipitation[index] ?? 0,
				precipitationProbability: weatherForecast.daily.precipitationProbability[index] ?? 0,
				snowfall: weatherForecast.daily.snowfall[index] ?? 0,
				// Relevant for surfing.
				wavePeriodMax: marineForecst.daily.wavePeriodMax[index] ?? 0,
				waveHeightMax: marineForecst.daily.waveHeightMax[index] ?? 0,
			}
			return {
				indoorSightseeing: this.computeIndoorSightseeingScore(),
				outdoorSightseeing: this.computeOutdoorSightseeingScore(relevantConditions),
				ski: this.computeSkiScore(relevantConditions),
				surf: this.computeSurfScore(relevantConditions),
			}
		});;
	}

	private async getRequiredForecastData (
		forecastArgs: ForecastArgs
	): Promise<ForecastRequiredData> {
		const forecasts = await Promise.all([
			this.marineForecastService.getDailyForecast(forecastArgs),
			this.weatherForecastService.getDailyForecast(forecastArgs),
		]);


		return {
			marineForecast: forecasts[0],
			weatherForecast: forecasts[1],
		}
	}

	private computeSkiScore(conditions: RelevantConditions): ActivityRanking {
		const { rain, temperature, windSpeedMax, isCoastal } = conditions;

		// Check if skiing is possible:

		const impossibleScore = { isPossible: false, score: 0 };
		// Can't ski if its not cold enough for snow.
		if( temperature > -1) {
			return { ...impossibleScore, reason: `Temperature too high for snow at ${temperature}°C`, }
		}

		// -21 celcius is too uncomfortably cold to ski.
		if (temperature < -21) {
			return { ...impossibleScore, reason: `Temperature too low for skiing at ${temperature}°C` };
		}
		// Can't ski in wind speeds greater than 60 kmph
		if (windSpeedMax >= 60) {
			return { ...impossibleScore, reason: `Wind speed too high for skiing at ${windSpeedMax} km/h` };
		}
		// You can't really ski if there is too much rain
		if (rain > 15) {
			return { ...impossibleScore, reason: `Too much rain for skiing: ${rain} mm` };
		}
		// If the city is located at the coast it is unlikely skiing is available
		if (isCoastal) {
			return { ...impossibleScore, reason: `Location is coastal; skiing unlikely` };
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

		return { score, isPossible: true, reason: 'Conditions suitable for skiing' }
	}

	private computeSurfScore(conditions: RelevantConditions): ActivityRanking {
		const {
			rain,
			temperature,
			windSpeedMax,
			isCoastal,
			waveHeightMax,
			wavePeriodMax
		} = conditions;

		// Check if surfing is possible
		const impossibleScore = { isPossible: false, score: 0 };
		// Can't surf if it is too cold (This is more subjective than the others)
		if (temperature < 5) {
			return { ...impossibleScore, reason: `Too cold to surf at ${temperature}°C` };
		}
		// Can't surf if area is not coastal
		if (!isCoastal) {
			return { ...impossibleScore, reason: 'Location is not coastal; cannot surf' };
		}
		// Can't surf if it rains too much
		if (rain > 15) {
			return { ...impossibleScore, reason: `Too much rain for surfing: ${rain} mm` };
		}
		// High wind speeds makes surfing unconfortable
		if (windSpeedMax > 30) {
			return { ...impossibleScore, reason: `Wind speed too high for surfing at ${windSpeedMax} km/h` };
		}
		// Can't surf if the waves are too small, unless you have a boat.
		if (waveHeightMax && waveHeightMax < 1) {
			return { ...impossibleScore, reason: `Wave height too small for surfing: ${waveHeightMax} m` };
		}
		// Can't surf if there is no space between the waves
		if (wavePeriodMax && wavePeriodMax < 6) {
			return { ...impossibleScore, reason: `Wave period too short for surfing: ${wavePeriodMax} s` };
		}

		// Assign a score to skiing based on temperature and wind speed:
		let score = 0;

		// For surfing above the minimum temp, we go up by 5 degs with max score at 25+
		if(temperature > 25) {
			score += 5;
		} else {
			// score = temp / 5
			const tempScore = Math.round(temperature/5);
			score += tempScore;
		}

		// Ideally there is low wind, remove a point for each 4 kmph of wind over ideal.
		if(windSpeedMax < 10) {
			score += 5;
		} else {
			// score = (-temp + 30) / 4
			const windScore = Math.round((-temperature + 30)/4);
			score += windScore;
		}

		return {
			isPossible: true,
			score,
			reason: 'Conditions suitable for surfing',
		}
	}

	private computeOutdoorSightseeingScore(conditions: RelevantConditions): ActivityRanking {
		const {
			rain,
			temperature,
			windSpeedMax,
			// NOTE: Weather codes are emojis at this point, which are a bit easier to read.
			weatherCode,
		} = conditions;

		// Check if outdoor sightseeing is possible
		// If there is too much rain, outdoor sighseeing is impossible
		if(rain > 10) {
			return { score: 0, isPossible: false, reason: `Too much rain for outdoor sightseeing: ${rain} mm` }
		}
		// If it is too hot out, outdoor sightseeing is too unconfortable
		if(temperature > 40) {
			return { score: 0, isPossible: false, reason: `Too hot for outdoor sightseeing at ${temperature}°C` }
		}
		// If there is too much wind, outdoor sightseeing is uncomfortable
		if(windSpeedMax > 40) {
			return { score: 0, isPossible: false, reason: `Too windy for outdoor sightseeing at ${windSpeedMax} km/h` }
		}
		// If the skies aren't clear we probably want to avoid outside sightseeing
		if(weatherCode !== '☀️' && weatherCode !== '🌤️' && weatherCode !== '⛅') {
			return { score: 0, isPossible: false, reason: `Skies not clear (${weatherCode}); avoid outdoor sightseeing` }
		}
		
		// Assign a score to outdoor sightseeing based on temp and wind speed
		let score = 0;
		
		// Assign a score based on temperature

		// A perfect day for me to go sightseeing is between 22 and 28 degrees
		if(temperature >= 22 && temperature <= 28) {
			score += 5;
		} else {
			// The colder it gets the more uncomfortable, but it doesn't scale the same as
			// the temp increases. Outdoor sightseeing is penalised by 1 score every 7 degrees
			// below the right temp, and 1 score every 3 degrees over ideal temp.

			// Colder than comfortable
			if(temperature < 22) {
				// score = (temperature - 11)/7
				const tempScore = Math.round((temperature - 11)/7);
				// Dont subtract points if it is too cold.
				if(tempScore >= 0) {
					score += tempScore;
				}
			// Warmer than comfortable
			} else {
				// score = (-temperature + 43)/3
				const tempScore = Math.round((-temperature + 43)/3);
				score += tempScore;
			}
		}

		// Assign a score based on wind speed
		// 15 kmph is pleasant, going down every 4kmph
		if(windSpeedMax < 15) {
			score += 5;
		// Score is penalised for every 5 kmph faster than ideal.
		} else {
			// score = (-windspeed + 40)/5
			const windScore = Math.round((-windSpeedMax + 40)/5);
			score += windScore;
		}

		return {
			isPossible: true,
			score,
			reason: 'Conditions suitable for outdoor sightseeing',
		}
	}

	private computeIndoorSightseeingScore(): ActivityRanking {
		// Indoor sightseeing is always possible. Scores will just be 3 for each condition
		// to ensure it is just average.
		return {
			isPossible: true,
			// Score is 6, 3 for temperature and 3 for windspeed.
			score: 6,
			reason: 'Indoor sightseeing is always possible',
		}
	}
}


type RelevantConditions = {
	[X in keyof WeatherForecast['daily']]: WeatherForecast['daily'][X][number];
} & {
	[X in keyof MarineForecast['daily']]: MarineForecast['daily'][X][number];
} & {
	elevation: number;	
	isCoastal: boolean;
};

interface ForecastRequiredData {
	weatherForecast: WeatherForecast;
	marineForecast: MarineForecast;
}

interface ForecastArgs {
	latitude: number
	longitude: number
}

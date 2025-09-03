import { REQUIRED_WEATHER_FIELDS, type WeatherServiceResponse, type WeatherForecast } from '../types';
import { interpretWeatherCode } from '../utils';

export class WeatherForecastService {
	private requiredWeatherFields: string

	constructor(){
		this.requiredWeatherFields = REQUIRED_WEATHER_FIELDS.join(',');
	}

	async getDailyForecast(forecastArgs: WeatherForecastArgs): Promise<WeatherForecast> {
		const weatherURLObj = this.createForecastURL(forecastArgs);

		const res = await fetch(weatherURLObj);

		if(res.ok){
			const result = (await res.json()) as WeatherServiceResponse;
			return this.transformWeatherForecast(result);
		}

		throw Error('WEATHER_API_ERROR: Failed to fetch forecast data from external api');
	}

	private transformWeatherForecast(
		weather: WeatherServiceResponse,
	): WeatherForecast {
		const {
			daily,
			daily_units: dailyUnits,
			elevation,
		} = weather;

		return {
			daily: {
				daylightDuration: daily.daylight_duration,
				time: daily.time,
				precipitation: daily.precipitation_sum,
				precipitationProbability: daily.precipitation_probability_mean,
				windSpeedMax: daily.wind_speed_10m_max,
				temperature: daily.temperature_2m_max,
				rain: daily.rain_sum,
				showers: daily.showers_sum,
				snowfall: daily.snowfall_sum,
				sunshineDuration: daily.sunshine_duration,
				weatherCode: daily.weather_code.map(code => interpretWeatherCode(code)),
			},
			dailyUnits: {
				temperature: dailyUnits.temperature_2m_max,
				sunshineDuration: dailyUnits.sunshine_duration,
				snowfall: dailyUnits.snowfall_sum,
				showers: dailyUnits.showers_sum,
				rain: dailyUnits.rain_sum,
				windSpeedMax: dailyUnits.wind_speed_10m_max,
				precipitationProbability: dailyUnits.precipitation_probability_mean,
				precipitation: dailyUnits.precipitation_sum,
				time: dailyUnits.time,
				daylightDuration: dailyUnits.daylight_duration
			},
			elevation,
		}
	}

	private createForecastURL(forecastArgs: WeatherForecastArgs): URL {
		const { longitude, latitude } = forecastArgs;

		const weatherBaseUri = 'https://api.open-meteo.com/v1/forecast';
		const weatherURLObj = new URL(weatherBaseUri);
		weatherURLObj.searchParams.set('longitude', longitude.toString());
		weatherURLObj.searchParams.set('latitude', latitude.toString());

		weatherURLObj.searchParams.set(
			'daily',
			this.requiredWeatherFields
		);

		return weatherURLObj;
	}
}

interface WeatherForecastArgs {
	latitude: number
	longitude: number
}

import { REQUIRED_WEATHER_FIELDS, type WeatherServiceResponse } from "../types";

export class WeatherForecastService {
	private requiredWeatherFields: string

	constructor(){
		this.requiredWeatherFields = REQUIRED_WEATHER_FIELDS.join(',');
	}

	async getDailyForecast(forecastArgs: ForecastArgs): Promise<WeatherServiceResponse> {
		const weatherURLObj = this.createForecastURL(forecastArgs);

		const res = await fetch(weatherURLObj);

		if(res.ok){
			const result = await res.json();
			return result as WeatherServiceResponse;
		}

		throw Error('WEATHER_API_ERROR: Failed to fetch forecast data from external api');
	}

	private createForecastURL(forecastArgs: ForecastArgs): URL {
		const { longitude, latitude } = forecastArgs;

		const weatherBaseUri = 'https://api.open-meteo.com/v1/forecast';
		const weatherURLObj = new URL(weatherBaseUri);
		weatherURLObj.searchParams.set('longitude', longitude.toFixed(2));
		weatherURLObj.searchParams.set('latitude', latitude.toFixed(2));

		weatherURLObj.searchParams.set(
			'daily',
			this.requiredWeatherFields
		);

		return weatherURLObj;
	}
}

interface ForecastArgs {
	latitude: number
	longitude: number
}

import { REQUIRED_MARINE_FIELDS, type MarineForecast, type MarineForecastResponse } from "../types";

export class MarineForecastService {
	private requiredMarineFields: string;
	constructor() {
		this.requiredMarineFields = REQUIRED_MARINE_FIELDS.join(',');
	}

	async getDailyForecast(forecastArgs: MarineForecastArgs): Promise<MarineForecast> {
		const weatherURLObj = this.createForecastURL(forecastArgs);

		const res = await fetch(weatherURLObj);

		if(res.ok){
			const result = (await res.json()) as MarineForecastResponse;
			return this.transformResponse(result);
		}

		throw Error('WEATHER_API_ERROR: Failed to fetch marine forecast data from external api');
	}

	private transformResponse(marineForecastResponse: MarineForecastResponse): MarineForecast {
		const {
			wave_period_max: wavePeriodMax,
			wave_height_max: waveHeightMax,
			time
		} = marineForecastResponse.daily;

		const {
			wave_period_max: wavePeriodMaxUnit,
			wave_height_max: waveHeightMaxUnit,
			time: timeUnit,
		} = marineForecastResponse.daily_units;
		return {
			daily: {
				time,
				waveHeightMax,
				wavePeriodMax,
			},
			dailyUnits: {
				time: timeUnit,
				wavePeriodMax: wavePeriodMaxUnit,
				waveHeightMax: waveHeightMaxUnit,
			},
			isCoastal: (marineForecastResponse.daily.wave_height_max[0] !== null), 
		}
	}

	private createForecastURL(forecastArgs: MarineForecastArgs): URL {
		const { longitude, latitude } = forecastArgs;

		const weatherBaseUri = 'https://marine-api.open-meteo.com/v1/marine';
		const weatherURLObj = new URL(weatherBaseUri);
		weatherURLObj.searchParams.set('longitude', longitude.toString());
		weatherURLObj.searchParams.set('latitude', latitude.toString());

		weatherURLObj.searchParams.set(
			'daily',
			this.requiredMarineFields
		);

		return weatherURLObj;
	}
}

interface MarineForecastArgs {
	latitude: number
	longitude: number
}

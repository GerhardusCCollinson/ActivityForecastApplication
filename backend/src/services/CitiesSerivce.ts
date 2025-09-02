import type { CityDetails, GeocodingApiSearchResponse } from "../types";

export class CitiesService {
	constructor(){};

	async getCitiesByName(name: string): Promise<CityDetails[]> {
		const weatherBaseUri = 'https://geocoding-api.open-meteo.com/v1/search';
		const weatherURLObj = new URL(weatherBaseUri);
		weatherURLObj.searchParams.set('name', name);

		const res = await fetch(weatherURLObj);

		if(res.ok) {
			const apiResponse = await res.json() as GeocodingApiSearchResponse;
			return this.formatApiResponse(apiResponse);
		}

		throw Error('WEATHER_API_ERROR: Failed to fetch countries data from external api');
	};

	private formatApiResponse(apiResponse: GeocodingApiSearchResponse): CityDetails[] {
		return apiResponse.results?.map(result => {
			const {
				name,
				longitude,
				latitude,
				elevation,
				population,
				country,
				country_code: countryCode,
			} = result;
			return { name, longitude, latitude, elevation, population, country, countryCode }
		}) ?? [];
	}
}

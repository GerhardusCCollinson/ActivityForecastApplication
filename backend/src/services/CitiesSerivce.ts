import type { CityDetails, GeocodingApiSearchResults } from "../types";

export class CitiesService {
	constructor(){};

	async getCitiesByName(name: string): Promise<CityDetails[]> {
		const weatherBaseUri = 'https://geocoding-api.open-meteo.com/v1/search?name=Berlin';
		const weatherURLObj = new URL(weatherBaseUri);
		weatherURLObj.searchParams.set('name', name);

		const res = await fetch(weatherURLObj);

		if(res.ok) {
			const apiResponse = await res.json() as GeocodingApiSearchResults;
			return this.formatApiResponse(apiResponse);
		}

		throw Error('WEATHER_API_ERROR: Failed to fetch countries data from external api');
	};

	private formatApiResponse(apiResponse: GeocodingApiSearchResults): CityDetails[] {
		return apiResponse.results?.map(result => {
			const { name, longitude, latitude, elevation } = result;
			return { name, longitude, latitude, elevation }
		}) ?? [];
	}
}

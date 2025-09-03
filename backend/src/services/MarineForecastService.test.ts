import { MARINE_PROPERTIES, type CityDetails } from "../types";
import { CitiesService } from "./CitiesSerivce";
import { MarineForecastService } from "./MarineForecastService";

describe('MarineForecastService', () => {
	const citiesService = new CitiesService();

	const forecastService = new MarineForecastService();

	let coastalCity: CityDetails;
	let inlandCity: CityDetails;

	beforeAll(async () => {
		coastalCity = (await citiesService.getCitiesByName('Cape Town'))[0]!;
		inlandCity = (await citiesService.getCitiesByName('Pretoria'))[0]!;
	});

	it('should retrieve marine api data for coastal city', async () => {
		const res = await forecastService.getDailyForecast({latitude: coastalCity.latitude, longitude: coastalCity.longitude});

		for(let i = 0; i < MARINE_PROPERTIES.length; i++) {
			const key = MARINE_PROPERTIES[i] as keyof typeof res.daily;
			expect(res.daily[key]).toBeDefined();
			expect(res.dailyUnits[key]).toBeDefined();
			expect(res.daily[key][0]).not.toBeNull();
		}
		expect(res.isCoastal).toEqual(true);
	});

	it('should return non-coastal for pretoria', async () => {
		const res = await forecastService.getDailyForecast({latitude: inlandCity.latitude, longitude: inlandCity.longitude});

		for(let i = 0; i < MARINE_PROPERTIES.length; i++) {
			const key = MARINE_PROPERTIES[i] as keyof typeof res.daily;
			expect(res.daily[key]).toBeDefined();
			expect(res.dailyUnits[key]).toBeDefined();
			if(key === 'waveHeightMax' || key === 'wavePeriodMax') {
				expect(res.daily[key][0]).toBeNull();
			};
		}
		expect(res.isCoastal).toEqual(false);
	});
});

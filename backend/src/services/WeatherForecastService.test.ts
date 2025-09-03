import { REQUIRED_WEATHER_FIELDS, WEATHER_PROPERTIES, type CityDetails } from "../types";
import { CitiesService } from "./CitiesSerivce";
import { WeatherForecastService } from "./WeatherForecastService";

describe('WeatherForecastService', () => {
	const weatherForecastService = new WeatherForecastService();
	const citiesService = new CitiesService();

	let city: CityDetails;

	beforeAll(async () => {
		city = (await citiesService.getCitiesByName('Berlin'))[0]!;
	});

	it('should get weather for city', async () => {
		const { longitude, latitude } = city;
		const res = await weatherForecastService.getDailyForecast({longitude, latitude});

		expect(res.daily).toBeDefined();
		expect(res.dailyUnits).toBeDefined();

		for(let i = 0; i < WEATHER_PROPERTIES.length; i++) {
			const dailyKey = WEATHER_PROPERTIES[i] as keyof typeof res.daily;
			const unitsKey = WEATHER_PROPERTIES[i] as keyof typeof res.dailyUnits;
			expect(res.daily[dailyKey]).toBeDefined();
			expect(res.dailyUnits[unitsKey]).toBeDefined();
		}
	});
});

import { REQUIRED_WEATHER_FIELDS, type CityDetails } from "../types";
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

		expect(res.latitude).toBeDefined();
		for(let i = 0; i < REQUIRED_WEATHER_FIELDS.length; i++) {
			const key = REQUIRED_WEATHER_FIELDS[i] as keyof typeof res.daily;
			expect(res.daily[key]).toBeDefined();
			expect(res.daily_units[key]).toBeDefined();
		}
	});
});

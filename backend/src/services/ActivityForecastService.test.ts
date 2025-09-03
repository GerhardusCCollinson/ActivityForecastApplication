import { ACTIVITY_PROPERTIES, type CityDetails } from "../types";
import { ActivityForecastService } from "./ActivityForecastService";
import { CitiesService } from "./CitiesSerivce";

describe('ActivityForecastService', () => {
	const citiesService = new CitiesService();

	const activityForecastService = new ActivityForecastService();

	let coastalCity: CityDetails;

	beforeAll(async () => {
		coastalCity = (await citiesService.getCitiesByName('Cape Town'))[0]!;
	});

	it('should retrieve activity data for coastal city', async () => {
		const res = await activityForecastService.getDailyForecast({latitude: coastalCity.latitude, longitude: coastalCity.longitude});

		for(let i = 0; i < ACTIVITY_PROPERTIES.length; i++) {
			const dailyKey = ACTIVITY_PROPERTIES[i] as keyof typeof res.daily;
			const dailyUnitKey = ACTIVITY_PROPERTIES[i] as keyof typeof res.dailyUnits;
			expect(res.daily[dailyKey]).toBeDefined();
			expect(res.dailyUnits[dailyUnitKey]).toBeDefined();

			expect(res.daily[dailyKey][0]).not.toBeNull();
		}

		expect(res.daily.activityRankings[0]).not.toBeNull();
		expect(res.isCoastal).toEqual(true);
	});
});

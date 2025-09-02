import { CitiesService } from './CitiesSerivce';

describe('CitiesService', () => {
	const citiesService = new CitiesService();

	it('should fetch cities when name match is found', async () => {
		const res = await citiesService.getCitiesByName('Berlin');
		expect(res[0]).toHaveProperty('latitude');
		expect(res[0]).toHaveProperty('elevation');
		expect(res.length).toBeGreaterThan(0);
	});

	it('should return empty array when search term is too short', async () => {
		const res = await citiesService.getCitiesByName('');
		expect(res).toEqual([]);
	});
});

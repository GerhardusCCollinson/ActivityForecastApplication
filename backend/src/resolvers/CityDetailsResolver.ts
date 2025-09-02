import { CitiesService } from "../services/CitiesSerivce";
import type { CityDetails } from "../types";

export async function cityDetailsResolver (_parent: unknown, args: getCitiesByNameArgs): Promise<CityDetails[]> {
	const citiesService = new CitiesService();

	const cities = await citiesService.getCitiesByName(args.cityName);
	return cities;
}

interface getCitiesByNameArgs {
	cityName: string;
}

import { CitiesService } from "../services/citiesSerivce";
import type { CityDetails } from "../types";

export async function cityDetailsResolver (_parent: unknown, args: GetCitiesByNameArgs): Promise<CityDetails[]> {
	const citiesService = new CitiesService();
	return await citiesService.getCitiesByName(args.cityName);
}

interface GetCitiesByNameArgs {
	cityName: string;
}

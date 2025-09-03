import { CitiesService } from "../services/CitiesSerivce";
import type { CityDetails } from "../types";

export async function CityDetailsResolver (_parent: unknown, args: GetCitiesByNameArgs): Promise<CityDetails[]> {
	const citiesService = new CitiesService();
	return await citiesService.getCitiesByName(args.cityName);
}

interface GetCitiesByNameArgs {
	cityName: string;
}

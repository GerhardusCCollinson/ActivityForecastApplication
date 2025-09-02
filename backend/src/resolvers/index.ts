import type { CityDetails } from "../types";

export const resolvers = {
	Query: {
		cityDetails: (cityName: string): CityDetails[] => {
			return [{
				elevation: 0,
				latitude: 0,
				longitude: 0,
				name: 'City',
			}]
		},
	}
}

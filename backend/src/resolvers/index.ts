import { cityDetailsResolver } from "./CityDetailsResolver";

export const resolvers = {
	Query: {
		cityDetails: cityDetailsResolver,
	}
}

import type { CityDetails } from "../types";

import { cityDetailsResolver } from "./CityDetailsResolver";

export const resolvers = {
	Query: {
		cityDetails: cityDetailsResolver,
	}
}

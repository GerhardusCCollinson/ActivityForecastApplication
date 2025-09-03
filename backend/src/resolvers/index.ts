import { ActivityForecastResolver } from "./ActivityForecastResolver";
import { CityDetailsResolver } from "./CityDetailsResolver";

export const resolvers = {
	Query: {
		cityDetails: CityDetailsResolver,
		activityForecast: ActivityForecastResolver,
	}
}

import { activityForecastResolver } from "./ActivityForecastResolver";
import { cityDetailsResolver } from "./CityDetailsResolver";

export const resolvers = {
	Query: {
		cityDetails: cityDetailsResolver,
		activityForecast: activityForecastResolver,
	}
}
